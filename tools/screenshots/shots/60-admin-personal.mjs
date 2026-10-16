// Administration, personal pages, roles and two recipes (share an SBOM, onboard a team member).
// Extra data (API keys, release and CSAF feed keys, tags, a webhook) comes from seeds/60-admin-personal.mjs.
import { settle } from '../lib.mjs';

const A = '06-administration';
const P = '08-personal';
const R = '10-roles-permissions';
const RC = 'recipes';

// Other agents share the instance and the Alex Morgan session, which is sometimes ended while
// a run is going on. If the sign-in form shows, sign in again and reload the page.
async function relogin(page, seed) {
  if (!(await page.locator('#username').isVisible().catch(() => false))) return;
  const url = page.url();
  await page.fill('#username', SHOT_EMAIL);
  await page.fill('#password', seed.team[SHOT_EMAIL].password);
  await page.click('button[type=submit]');
  await page.waitForFunction(() => !document.querySelector('#username'), null, { timeout: 30000 });
  await page.goto(url);
  await settle(page, 2000);
}
const SHOT_EMAIL = 'alex.morgan@example.com';

// Grows the viewport so the scrolling content area fits without a scrollbar.
async function fitHeight(page, extra = 0) {
  const d = await page.evaluate(() => {
    const c = document.querySelector('.content-area');
    return c ? c.scrollHeight - c.clientHeight : 0;
  });
  if (d > 0) {
    await page.setViewportSize({ width: 1440, height: 900 + d + extra });
    await settle(page, 800);
  }
}

// Page header and content panels, without the sidebar and the right bar.
const content = async (page) => {
  const box = await page.evaluate(() => {
    const area = document.querySelector('.content-area').getBoundingClientRect();
    const bottom = document.querySelector('.content-area > .content').getBoundingClientRect().bottom;
    return { x: area.left, y: area.top, width: area.width, height: Math.min(area.bottom, bottom + 4) - area.top };
  });
  return { clip: box };
};

// Orange outlines without numbers, for shots that point at something.
async function outline(page, selectors) {
  await page.evaluate((sels) => {
    for (const sel of sels) {
      const el = document.querySelector(sel);
      if (!el) throw new Error('outline: no element ' + sel);
      const r = el.getBoundingClientRect();
      const box = document.createElement('div');
      Object.assign(box.style, { position: 'fixed', left: r.left - 4 + 'px', top: r.top - 4 + 'px', width: r.width + 8 + 'px', height: r.height + 8 + 'px',
        border: '2px solid #e5532d', borderRadius: '6px', zIndex: 2147483646, pointerEvents: 'none', boxSizing: 'border-box' });
      document.body.append(box);
    }
  }, selectors);
}

// Sidebar crop from the top of the menu to just below the last expanded group.
const sidebarTo = (sel) => async (page) => {
  const box = await page.evaluate((s) => {
    const menu = document.querySelector('#side-menu').getBoundingClientRect();
    const sub = document.querySelector(s).getBoundingClientRect();
    return { x: 0, y: menu.top - 6, width: menu.width, height: sub.bottom - menu.top + 16 };
  }, sel);
  return { clip: box };
};


// Bounding box of an element (found by a function run in the page), grown by pad.
const boxOf = (page, fn, arg, pad = 12) => page.evaluate(([src, arg, pad]) => {
  const el = new Function('arg', src)(arg);
  if (!el) throw new Error('boxOf: nothing found');
  const r = el.getBoundingClientRect();
  const x = Math.max(0, r.left - pad);
  const y = Math.max(0, r.top - pad);
  return { clip: { x, y, width: Math.min(window.innerWidth, r.right + pad) - x, height: Math.min(window.innerHeight, r.bottom + pad) - y } };
}, [fn, arg, pad]);

// Opens the Roles drop-down of one user row without changing anything (select2 'open').
const openRoles = (email) => async (page) => {
  await fitHeight(page, 200);
  await page.evaluate((email) => {
    const row = [...document.querySelectorAll('form.user')].find((f) => f.textContent.includes(email));
    window.jQuery(row.querySelector('select[name=roles]')).select2('open');
  }, email);
  await page.waitForTimeout(800);
};
const rolesTarget = (email) => async (page) => ({ clip: await page.evaluate((email) => {
  // The whole user list, down to the open drop-down.
  const form = [...document.querySelectorAll('form.user')].find((f) => f.textContent.includes(email));
  const panel = form.closest('.ts-panel').getBoundingClientRect();
  const area = document.querySelector('.content-area').getBoundingClientRect();
  const dd = document.querySelector('.select2-container--open .select2-dropdown').getBoundingClientRect();
  const bottom = Math.max(panel.bottom, dd.bottom + 12);
  return { x: area.left, y: panel.top - 10, width: area.width, height: bottom - panel.top + 10 };
}, email) });

// Marks the row of release key n by its label.
const keyRow = `const l = [...document.querySelectorAll('label')].find((e) => e.textContent.replace(/\\s+/g, ' ').trim() === 'Key ' + arg + ':'); return l && l.closest('.form-group');`;

const SHOTS = [
  // ---------------------------------------------------------------- Administration
  {
    id: `${A}/index-1`,
    doc: `${A}/index.md`,
    alt: 'The left sidebar with the Administration group expanded: Integrations, Settings, User Management, API keys, Policies and Audit logs.',
    url: '/dashboard',
    prepare: async (page, seed, h) => h.openMenu(page, '#menu_administration'),
    target: sidebarTo('#menu_administration'),
  },
  {
    id: `${A}/02-settings-1`,
    doc: `${A}/02-settings.md`,
    alt: 'The General settings page with one card per settings group.',
    url: '/settings/company/general',
    prepare: async (page) => fitHeight(page),
    target: content,
  },
  {
    id: `${A}/02-settings-2`,
    doc: `${A}/02-settings.md`,
    alt: 'The License allow/deny page with the Enforce allow switch turned off and the Always allow license and Always deny license panels, each with License, Comment and Add.',
    url: '/settings/company/general/license-lists',
    target: content,
  },
  {
    id: `${A}/02-settings-3`,
    doc: `${A}/02-settings.md`,
    alt: 'The Add manual vulnerability dialog with lodash 4.17.21 selected as the component version, and the Vulnerability key, Vulnerability link, Severity, Score and Vulnerability description fields filled in.',
    url: '/settings/company/vulnerabilities',
    prepare: async (page, seed, h) => {
      await page.setViewportSize({ width: 1440, height: 1250 });
      await h.clickText(page, 'Add vuln.', { wait: 1200 });
      const m = '#createManualVulnerability';
      await page.locator(`${m} .component_filter`).pressSequentially('lodash', { delay: 80 });
      await page.waitForTimeout(3000);
      await settle(page, 800);
      // The row of lodash, then its version 4.17.21.
      const row = page.locator(`${m} .component-list > .row`).filter({ has: page.locator('strong', { hasText: /^lodash$/ }) }).first();
      await row.locator('.col-xs-5 .col-md-12').filter({ hasText: '4.17.21' }).locator('.select_component').click();
      await page.waitForTimeout(1200);
      await page.fill(`${m} #vulnerabilityKey`, 'EXAMPLE-2026-0001');
      await page.fill(`${m} #vulnerabilityLink`, 'https://security.example.com/advisories/EXAMPLE-2026-0001');
      await page.selectOption(`${m} #vulnerabilitySeverity`, 'high');
      await page.fill(`${m} #vulnerabilityScore`, '7');
      await page.fill(`${m} textarea`, 'Prototype pollution in a helper used by the Webshop checkout, found in an internal review. Upgrade once a fixed release is available.');
    },
    target: async (page, seed) => {
      return { clip: await page.evaluate(() => {
        const r = document.querySelector('#createManualVulnerability .modal-content').getBoundingClientRect();
        return { x: r.left - 12, y: Math.max(0, r.top - 12), width: r.width + 24, height: Math.min(window.innerHeight, r.bottom + 12) - Math.max(0, r.top - 12) };
      }) };
    },
  },
  {
    id: `${A}/08a-issue-trackers-1`,
    doc: `${A}/08a-issue-trackers.md`,
    alt: 'The Create new Jira issue dialog for the crypto-js component of the webshop-frontend module, with the Title and Description filled in from the finding, and the Close and Create issue buttons.',
    url: (seed) => `/projects/${seed.projects.Webshop}/modules/${seed.scans['webshop-frontend'].moduleId}`,
    prepare: async (page) => {
      await page.locator('.ecs-dependency:has-text("npm:crypto-js")').first().click();
      await settle(page, 2500);
      // Jira is not configured on this instance. Switching the client-side flag on shows the
      // Create issue link exactly as with an active integration; nothing is saved.
      await page.evaluate(() => { const S = window.Package.session.Session; S.set('jiraKey', 'WEB'); S.set('jira', true); });
      await page.waitForTimeout(800);
      await page.locator('.show-jira-modal').filter({ visible: true }).first().click();
      await page.waitForTimeout(1200);
    },
    target: async (page) => ({ clip: await page.evaluate(() => {
      const r = [...document.querySelectorAll('.createIssue .modal-content')].find((e) => e.getBoundingClientRect().height).getBoundingClientRect();
      return { x: r.left - 12, y: Math.max(0, r.top - 12), width: r.width + 24, height: r.height + 24 };
    }) }),
  },
  {
    id: `${A}/02a-company-details-1`,
    doc: `${A}/02a-company-details.md`,
    alt: 'The General info page with the Company details panel (Company logo url, Company name, Company email) and the General settings panel (Distribution email, Currency code), each with an Update button.',
    url: '/settings/company/general/info',
    target: content,
  },
  {
    id: `${A}/02b-company-tags-1`,
    doc: `${A}/02b-company-tags.md`,
    alt: 'The Company tags page with the Add new tag and View removed tags buttons, the Import tags from CSV panel and the tag list with Created, Name, Description, Creator and a Remove button per tag.',
    url: '/settings/company/tags',
    target: content,
  },
  {
    id: `${A}/03-user-management-1`,
    doc: `${A}/03-user-management.md`,
    alt: 'The User management page: the user list with user name, name, roles and the Remove and RTBF buttons, the Import users from CSV panel and the Invite your colleagues form.',
    url: '/settings/company/users',
    prepare: async (page) => fitHeight(page),
    target: content,
  },
  {
    id: `${A}/04-api-keys-1`,
    doc: `${A}/04-api-keys.md`,
    alt: 'The API keys list with three keys: the personal access key of Alex Morgan with PAK ticked, GitHub Actions - Webshop with the developer scope, and Release pipeline with all scopes. Each row has the copy and Unpublish buttons.',
    url: '/settings/company/api/keys',
    target: content,
  },
  {
    id: `${A}/04b-release-keys-1`,
    doc: `${A}/04b-release-keys.md`,
    alt: 'The Release keys page with four keys. Keys 0 to 2 are published and show part of the key, the locked release and scope, and a Requested badge; key 2 was requested once and offers Unpublish. Key 3 is not published yet and offers Publish and Delete.',
    url: '/settings/company/api/releases',
    target: content,
  },
  {
    id: `${A}/04c-csaf-feed-keys-1`,
    doc: `${A}/04c-csaf-feed-keys.md`,
    alt: 'The Create CSAF feed key dialog with a Name and the TLP levels WHITE, GREEN, AMBER and RED, open over the CSAF feed keys table.',
    url: '/settings/company/api/csaf',
    prepare: async (page, seed, h) => {
      await h.clickText(page, 'Create key', { wait: 1200 });
      await page.fill('#csafKeyName', 'Partner ACME');
      await page.locator('.new-csaf-tlp[value="GREEN"]').check();
      await page.locator('.new-csaf-tlp[value="AMBER"]').check();
    },
    target: 'viewport',
  },
  {
    id: `${A}/05-policies-1`,
    doc: `${A}/05-policies.md`,
    alt: 'The Policies page with the cards Opensource policy, Crypto algorithms and Component end-of-life.',
    url: '/settings/company/policies',
    target: content,
  },
  {
    id: `${A}/07-audit-logs-1`,
    doc: `${A}/07-audit-logs.md`,
    alt: 'The Audit logs page with the Logins history, Export as CSV and Copy to clipboard buttons, the filter bar with Advanced and Sorting, and the log table with Date, Name, Type and Action.',
    url: '/settings/company/logs',
    target: 'viewport',
  },
  {
    id: `${A}/08-integrations-1`,
    doc: `${A}/08-integrations.md`,
    alt: 'The Integrations page with the tiles GitHub, Jira, TFS, SCANOSS, Webhooks and Channels, and LeanIX.',
    url: '/settings/company/integrations',
    target: content,
  },
  {
    id: `${A}/08b-leanix-scanoss-1`,
    doc: `${A}/08b-leanix-scanoss.md`,
    alt: 'The LeanIX settings page with a workspace name and a hidden API-Token typed in, and the Update button.',
    url: '/settings/company/leanix',
    prepare: async (page) => {
      // Typed for the picture only, never saved.
      const inputs = page.locator('.content input').filter({ visible: true });
      await inputs.nth(0).fill('example-corp');
      await inputs.nth(1).fill('example-token-not-real');
    },
    target: content,
  },
  {
    id: `${A}/08c-webhooks-channels-1`,
    doc: `${A}/08c-webhooks-channels.md`,
    alt: 'The Company webhooks and channels page with the Add webhook/channel button and one webhook, Release notifications, sending POST requests on the Release and Approval triggers.',
    url: '/settings/company/webhooks',
    target: content,
  },
  {
    id: `${A}/09-login-history-1`,
    doc: `${A}/09-login-history.md`,
    alt: 'The Logins history page with the Audit logs, Users with no logins for 60 days, Export as CSV and Copy to clipboard buttons, and the table with Allowed, Created, Method, Type, Email and Name.',
    url: '/settings/company/loginsHistory',
    target: 'viewport',
  },

  // ---------------------------------------------------------------- Personal
  {
    id: `${P}/01-updates-1`,
    doc: `${P}/01-updates.md`,
    alt: 'The Updates page with the release note 1.0, labelled New, Initial release.',
    url: '/updates',
    target: content,
  },
  {
    id: `${P}/02-inbox-messages-1`,
    doc: `${P}/02-inbox-messages.md`,
    alt: 'The Messages page with the Inbox, Marked and Trash buttons, the Filter box and the message table with From, Message and Date, listing unread approval notifications.',
    url: '/messages/inbox',
    target: async (page) => ({ clip: await page.evaluate(() => {
      const area = document.querySelector('.content-area').getBoundingClientRect();
      const t = document.querySelector('.reactive-table').getBoundingClientRect();
      return { x: area.left, y: area.top, width: area.width, height: t.bottom + 24 - area.top };
    }) }),
  },
  {
    id: `${P}/03-profile-1`,
    doc: `${P}/03-profile.md`,
    alt: 'The Manage Profile page with the Enable Two-Factor Authentication and Change your Password buttons, and the User, Personal access keys and Communication preferences panels.',
    url: '/settings',
    prepare: async (page) => fitHeight(page),
    target: content,
  },
  {
    id: `${P}/05-api-documentation-1`,
    doc: `${P}/05-api-documentation.md`,
    alt: 'The API documentation page: the TrustSource Rest API header, the Servers selector and the collapsed operation groups from Account to CSAF.',
    url: '/apidoc-latest',
    prepare: async (page) => {
      // Collapse every operation group, so the list of groups fits.
      // Swagger UI runs in an iframe.
      const frame = page.frames().find((f) => f !== page.mainFrame());
      await frame.waitForSelector('.opblock-tag', { timeout: 20000 });
      await frame.evaluate(() => document.querySelectorAll('.opblock-tag-section.is-open .opblock-tag').forEach((e) => e.click()));
      await page.waitForTimeout(1500);
      const h = await frame.evaluate(() => document.documentElement.scrollHeight);
      await page.evaluate((h) => { const f = document.querySelector('iframe'); f.style.height = h + 'px'; f.setAttribute('scrolling', 'no'); }, h);
      await page.waitForTimeout(500);
      await fitHeight(page);
    },
    target: async (page) => {
      const frame = page.frames().find((f) => f !== page.mainFrame());
      const groupsBottom = await frame.evaluate(() => Math.max(...[...document.querySelectorAll('.opblock-tag-section')].map((e) => e.getBoundingClientRect().bottom)));
      return page.evaluate((gb) => {
        const area = document.querySelector('.content-area').getBoundingClientRect();
        const f = document.querySelector('iframe').getBoundingClientRect();
        return { clip: { x: area.left, y: area.top, width: area.width, height: f.top + gb + 16 - area.top } };
      }, groupsBottom);
    },
  },
// ---------------------------------------------------------------- Right bar
  {
    id: `${P}/index-1`,
    doc: `${P}/index.md`,
    alt: 'The dashboard with the right bar outlined: Guide, Help, API documentation, Updates and Messages at the top, Contact Account Admin and Logout at the bottom.',
    url: '/dashboard',
    prepare: async (page) => outline(page, ['#right-bar']),
    target: 'viewport',
  },
  {
    id: `${P}/04-support-1`,
    doc: `${P}/04-support.md`,
    alt: 'The right bar with the Help icon at the top and the Contact Account Admin icon at the bottom outlined.',
    url: '/dashboard',
    prepare: async (page) => outline(page, ['#right-bar li.intro-support a', '#right-bar li:nth-last-child(2) a']),
    target: 'viewport',
  },

  // ---------------------------------------------------------------- Roles
  {
    id: `${R}/01-roles-overview-1`,
    doc: `${R}/01-roles-overview.md`,
    alt: 'User Management with the Roles drop-down of Sam Lee open: Developer is assigned, the list offers Compliance manager, Portfolio manager, Manager, Account admin, Company component manager and Company security manager.',
    url: '/settings/company/users',
    prepare: openRoles('sam.lee@example.com'),
    target: rolesTarget('sam.lee@example.com'),
  },
  {
    id: `${R}/04-functions-by-area-1`,
    doc: `${R}/04-functions-by-area.md`,
    alt: 'The left navigation with all sections expanded: Overview, Inbound (Scans), Internal, Outbound, Knowledge and Administration with their entries.',
    url: '/dashboard',
    viewport: { width: 1440, height: 1500 },
    prepare: async (page, seed, h) => h.openMenu(page, '#menu_inbound', '#menu_processing', '#menu_outbound', '#menu_knowledge', '#menu_administration'),
    target: sidebarTo('#menu_administration'),
  },
  {
    id: `${R}/05-functions-by-role-1`,
    doc: `${R}/05-functions-by-role.md`,
    alt: 'The Roles drop-down of Chris Taylor in User Management, with Portfolio manager and Manager assigned and the other roles offered in the list.',
    url: '/settings/company/users',
    prepare: openRoles('chris.taylor@example.com'),
    target: rolesTarget('chris.taylor@example.com'),
  },

  // ---------------------------------------------------------------- Recipes
  {
    id: `${RC}/08-share-sbom-publicly-1`,
    doc: `${RC}/08-share-sbom-publicly.md`,
    alt: 'The Release keys page with the new key 3 outlined: release Payment Service 3.1.0 and scope sbom selected, the key shown as Key available after publish, and the Publish and Delete buttons.',
    url: '/settings/company/api/releases',
    prepare: async (page) => {
      await page.evaluate((src) => { new Function('arg', src)(3).id = 'docs-key-3'; }, keyRow);
      await outline(page, ['#docs-key-3']);
    },
    target: content,
  },
  {
    id: `${RC}/08-share-sbom-publicly-2`,
    doc: `${RC}/08-share-sbom-publicly.md`,
    alt: 'The Url and QR code dialog of a published release key, with the SBOM address of the key and its QR code.',
    url: '/settings/company/api/releases',
    prepare: async (page) => {
      await page.evaluate((src) => { new Function('arg', src)(2).id = 'docs-key-2'; }, keyRow);
      await page.click('#docs-key-2 [title="View url and QR code"] button');
      await page.waitForTimeout(500);
      await page.click('#docs-key-2 a.qr-public-sbom');
      await page.waitForTimeout(2000);
    },
    target: async (page) => boxOf(page, "return document.querySelector('#qrPreview .modal-content');"),
  },
  {
    id: `${RC}/09-onboard-team-member-1`,
    doc: `${RC}/09-onboard-team-member.md`,
    alt: 'The Invite your colleagues panel of User Management with a Name and an E-Mail entered and the Invite button.',
    url: '/settings/company/users',
    prepare: async (page) => {
      await fitHeight(page);
      await page.fill('input[name=name]', 'Jamie Park');
      await page.fill('input[name=email]', 'jamie.park@example.com');
    },
    target: async (page) => boxOf(page, "const i = document.querySelector('input[name=email]'); let e = i; while (e && !(e.textContent || '').includes('Invite your colleagues')) e = e.parentElement; return e;", null, 10),
  },
];

// Every shot signs in again first when the session was ended meanwhile, and refuses to
// photograph the sign-in form if the session ends during the preparation.
const signedOut = (page) => page.locator('#username').isVisible().catch(() => false);
export default SHOTS.map((s) => ({
  ...s,
  prepare: async (page, seed, h) => {
    if (s.user !== null) await relogin(page, seed);
    if (s.prepare) await s.prepare(page, seed, h);
  },
  target: async (page, seed) => {
    if (await signedOut(page)) throw new Error('signed out during the shot, run it again');
    const t = s.target || 'viewport';
    return typeof t === 'function' ? t(page, seed) : t;
  },
}));
