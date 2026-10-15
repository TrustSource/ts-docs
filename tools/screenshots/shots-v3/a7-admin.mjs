// v3 shots of agent a7-admin: administration, identity integration and recipes.
// DEV company TrainCo Ltd., user Max Mustermann. Admin screens show real users and addresses:
// .mask-v3-a7-admin.json replaces them. The Identity Integration list and form pages
// (07-auth-sso, except index-1) are taken on production instead: on DEV every call to the
// identity service fails with 503 and the pages show "Loading ..." for ever. Capture them only
// with the production environment and the filter "07-auth-sso". Nothing in this file submits a form.
const ADM = '06-administration';
const SSO = '07-auth-sso';
const REC = 'recipes';
const MAIFIT = '7gh7aPoBvJW4rjdYE';
const AUTH_SERVICE = 'AowET9wDPWZyonktu';
const RELEASE = 'tTRNSjhNc3cYAmH3e'; // approved "Example dry run" 1.0.0 on mAIfit
const OPEN_REQUEST = 'PzHWrraDiRogcpufK'; // open approval "Example release" 1.0.0 on mAIfit (view only)

const CLEAN_CSS = `
  .chat-mascot { display: none !important; }
  .introjs-overlay, .introjs-helperLayer, .introjs-tooltipReferenceLayer,
  .introjs-disableInteraction, .introjsFloatingElement { display: none !important; }
  .introjs-showElement { z-index: auto !important; }
`;

async function clean(page) {
  await page.addStyleTag({ content: CLEAN_CSS });
  await page.evaluate(() => document.body.classList.remove('introjs-open'));
}

// Waits until the visible text contains every string (data arrives after the first render).
async function waitText(page, ...texts) {
  await page.waitForFunction((ts) => ts.every((t) => document.body.innerText.includes(t)), texts, { timeout: 60000 });
  await page.waitForTimeout(800);
}

// The company switcher in the sidebar fills in late; wait for it so the shot does not show it empty.
async function ready(page, ...texts) {
  await clean(page);
  await waitText(page, 'TrainCo', ...texts);
}

// Identity Integration pages (taken on production): no company name to wait for, and the
// version footer of the sidebar is hidden in case a crop ever reaches it.
async function ssoReady(page, ...texts) {
  await clean(page);
  await page.addStyleTag({ content: '.nav-footer { visibility: hidden !important; }' });
  await waitText(page, ...texts);
}

const $ = (page, fn, arg) => page.evaluate(fn, arg);

// From the top of the page header down to the bottom of the given element(s), content width.
const headerTo = (...selectors) => async (page) => page.evaluate((sels) => {
  const head = document.querySelector('.normalheader').getBoundingClientRect();
  const rs = sels.flatMap((s) => [...document.querySelectorAll(s)]).map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.height);
  if (!rs.length) throw new Error('headerTo: nothing matches ' + sels.join(', '));
  const pad = 12;
  const x = Math.max(0, head.left - pad);
  const y = Math.max(0, head.top - pad);
  const right = Math.min(window.innerWidth, head.right + pad);
  const bottom = Math.min(window.innerHeight, Math.max(...rs.map((r) => r.bottom)) + pad);
  return { clip: { x, y, width: right - x, height: bottom - y } };
}, selectors);

// From the page header down to the bottom of the card whose title is the given text.
const headerToCard = (title) => async (page) => page.evaluate((t) => {
  const head = document.querySelector('.normalheader').getBoundingClientRect();
  const el = [...document.querySelectorAll('.content *')].find((e) => e.children.length === 0 && e.textContent.trim() === t);
  if (!el) throw new Error('no card ' + t);
  let card = el;
  while (card.parentElement && card.getBoundingClientRect().width < 250) card = card.parentElement;
  const r = card.getBoundingClientRect();
  const pad = 12;
  const x = Math.max(0, head.left - pad);
  const y = Math.max(0, head.top - pad);
  return { clip: { x, y, width: Math.min(window.innerWidth, head.right + pad) - x, height: Math.min(window.innerHeight, r.bottom + pad) - y } };
}, title);

// Sidebar crop from the top of the menu to just below the expanded group.
const sidebarWith = (group) => async (page) => {
  const box = await page.evaluate((g) => {
    const menu = document.querySelector('#side-menu').getBoundingClientRect();
    const sub = document.querySelector(g).getBoundingClientRect();
    return { x: 0, y: menu.top - 6, width: menu.width, height: Math.min(window.innerHeight, sub.bottom + 16) - menu.top + 6 };
  }, group);
  return { clip: box };
};

// The .hpanel whose heading starts with the text.
const panelSel = (heading) => async (page) => page.evaluate((t) => {
  const p = [...document.querySelectorAll('.hpanel')].find((x) => {
    const head = x.querySelector('.panel-heading');
    return head && head.innerText.trim().startsWith(t);
  });
  if (!p) throw new Error('no panel ' + t);
  const r = p.getBoundingClientRect();
  const pad = 12;
  const x = Math.max(0, r.left - pad);
  const y = Math.max(0, r.top - pad);
  return { clip: { x, y, width: Math.min(window.innerWidth, r.right + pad) - x, height: Math.min(window.innerHeight, r.bottom + pad) - y } };
}, heading);

// Opens a Bootstrap modal through its trigger and waits until it is shown.
async function openModal(page, trigger, modal) {
  await page.locator(trigger).filter({ visible: true }).first().click();
  await page.waitForSelector(`${modal}.in, ${modal}.show`, { timeout: 15000 });
  await page.waitForTimeout(1000);
}

const select2 = (page, selector, value) => $(page, ([s, v]) => {
  const jq = window.jQuery || (window.Package && window.Package.jquery && window.Package.jquery.$);
  jq(s).val(v).trigger('change');
}, [selector, value]);

export default [
  // ---------------------------------------------------------------- 06-administration
  {
    id: `${ADM}/index-1`,
    alt: 'The left sidebar with the Administration group expanded: Account & Billing, Identity Integration, Integrations, Settings, User Management, API keys, Policies, Enterprise Companies and Audit logs.',
    doc: `${ADM}/index.md`,
    url: '/settings/company/general',
    prepare: async (page, seed, h) => { await ready(page, 'General info'); await h.openMenu(page, '#menu_administration'); },
    target: sidebarWith('#menu_administration'),
  },
  {
    id: `${ADM}/01-account-billing-1`,
    alt: 'The Account & Billing page with the Company details form, the Account type buttons Free, Professional, Corporate, Enterprise and Medical with Enterprise selected, See pricing plan details, and the start of the Terms and Conditions panel.',
    doc: `${ADM}/01-account-billing.md`,
    url: '/settings/company',
    prepare: async (page) => { await ready(page, 'Company details', 'Account type', 'See pricing plan details'); },
    target: 'viewport',
  },
  {
    id: `${ADM}/02-settings-1`,
    alt: 'The General settings page with one card per settings group: General info, FOSS liaison, PSIRT contacts, Written offer, License allow/deny, Component allow/deny, Encryption, Quality, Company tags, Private licenses, Legal templates and Private algorithms.',
    doc: `${ADM}/02-settings.md`,
    url: '/settings/company/general',
    prepare: async (page) => { await ready(page, 'Private algorithms'); },
    target: 'viewport',
  },
  {
    id: `${ADM}/02a-company-details-1`,
    alt: 'The General Info form with the fields Distribution email, Trainings url, Currency code and Default vulnerability confidence level set to Not set, and the Update button.',
    doc: `${ADM}/02a-company-details.md`,
    url: '/settings/company/general/info',
    prepare: async (page) => { await ready(page, 'Default vulnerability'); },
    target: headerTo('.content .hpanel'),
  },
  {
    id: `${ADM}/03-user-management-1`,
    alt: 'The User management page: the user list with login, name, roles and the remove and RTBF buttons per user, the Import users from CSV panel with its rules, and the start of the Invite your colleagues form.',
    doc: `${ADM}/03-user-management.md`,
    url: '/settings/company/users',
    prepare: async (page) => { await ready(page, 'Max Mustermann', 'Import users from CSV', 'Invite your colleagues'); },
    target: 'viewport',
  },
  {
    id: `${ADM}/05-policies-1`,
    alt: 'The Policies page with four cards: Opensource policy, Crypto algorithms, Component end-of-life and Risk assessment.',
    doc: `${ADM}/05-policies.md`,
    url: '/settings/company/policies',
    prepare: async (page) => { await ready(page, 'Risk assessment'); },
    target: headerToCard('Risk assessment'),
  },
  {
    id: `${ADM}/06-enterprise-companies-1`,
    alt: 'The Enterprise companies page with a filter field and a table with the columns Created, Name, Email and Account type, listing TrainCo Ltd. with the account type enterprise.',
    doc: `${ADM}/06-enterprise-companies.md`,
    url: '/enterprise/companies',
    prepare: async (page) => { await ready(page, 'ACCOUNT TYPE', 'enterprise'); },
    target: headerTo('.content table'),
  },
  {
    id: `${ADM}/07-audit-logs-1`,
    alt: 'The Audit logs page with the Logins history, Export as CSV and Copy to clipboard buttons, the Filter field with the Advanced button, the sorting selector, and the log table with the columns Date, Company, Name, Type and Action.',
    doc: `${ADM}/07-audit-logs.md`,
    url: '/settings/company/logs',
    prepare: async (page) => { await ready(page, 'Logins history', 'items'); },
    target: 'viewport',
  },
  {
    id: `${ADM}/08-integrations-1`,
    alt: 'The Integrations page with six tiles: Github, Jira, TFS, SCANOSS, Webhooks and Channels, and LeanIX.',
    doc: `${ADM}/08-integrations.md`,
    url: '/settings/company/integrations',
    prepare: async (page) => { await ready(page, 'LeanIX'); },
    target: headerToCard('LeanIX'),
  },
  {
    id: `${ADM}/02b-company-tags-1`,
    alt: 'The Company tags page with the Add new tag and View removed tags buttons, the Import tags from CSV panel with its rules, and the tag list with the tags example-team:payments and example-customer-facing, their descriptions, creator and Remove buttons.',
    doc: `${ADM}/02b-company-tags.md`,
    url: '/settings/company/tags',
    prepare: async (page) => { await ready(page, 'Import tags from CSV', 'example-customer-facing'); },
    target: 'viewport',
  },
  {
    id: `${ADM}/08c-webhooks-channels-1`,
    alt: 'The Company webhooks and channels page with the Add webhook/channel button and the list with one receiver: Example security channel, type Webhook, triggers Release and Approval, an example.com URL and the method POST.',
    doc: `${ADM}/08c-webhooks-channels.md`,
    url: '/settings/company/webhooks',
    prepare: async (page) => { await ready(page, 'Add webhook/channel', 'Example security channel'); },
    target: headerTo('.content table'),
  },
  {
    id: `${ADM}/09-login-history-1`,
    alt: 'The Logins history page with the Audit logs, Users with no logins for 60 days, Export as CSV and Copy to clipboard buttons, and the table with the columns Allowed, Created, Method, Type, Email and Name.',
    doc: `${ADM}/09-login-history.md`,
    url: '/settings/company/loginsHistory',
    prepare: async (page) => { await ready(page, 'Users with no logins', 'items'); },
    target: 'viewport',
  },
  // ---------------------------------------------------------------- 07-auth-sso
  {
    id: `${SSO}/index-1`,
    alt: 'The Account admin page with six cards: User storage, Identity providers, Stored users, Login settings, Authentication settings and SMTP settings.',
    doc: `${SSO}/index.md`,
    url: '/settings/company/auth',
    prepare: async (page) => { await ready(page, 'SMTP settings'); },
    target: headerToCard('SMTP settings'),
  },
  // The six pages below are taken on PRODUCTION (TS_BASE_URL=https://app.trustsource.io,
  // TS_EMAIL=prod-sso), because the identity service on DEV answers 503. They are view only:
  // nothing is typed or submitted. Each crop starts at the page title bar, so the header (user
  // name), the sidebar (company name) and the version footer stay out of the image;
  // .mask-v3-a8-sso.json masks people, addresses and identity provider data on top of that.
  {
    id: `${SSO}/01-user-storage-1`,
    alt: 'The Create user storage form with the provider LDAP and its pre-filled required fields, from Name and Vendor down to Bind DN and Bind Credential, and the Create button.',
    doc: `${SSO}/01-user-storage.md`,
    url: '/settings/company/auth/user_storage/create',
    viewport: { width: 1440, height: 1300 },
    prepare: async (page) => { await ssoReady(page, 'Bind Credential'); },
    target: headerTo('.content .hpanel'),
  },
  {
    id: `${SSO}/02-identity-providers-1`,
    alt: 'The Identity providers list with the Create new identity provider button and one enabled OpenID Connect provider with the alias example-sso and the display name Example SSO.',
    doc: `${SSO}/02-identity-providers.md`,
    url: '/settings/company/auth/identity_provider',
    prepare: async (page) => { await ssoReady(page, 'Create new identity provider', 'oidc'); },
    target: headerTo('.content .hpanel'),
  },
  {
    id: `${SSO}/03-stored-users-1`,
    alt: 'The Stored users list with the Create new user button and the columns Created, Name and Email, one Edit button per user.',
    doc: `${SSO}/03-stored-users.md`,
    url: '/settings/company/auth/user',
    prepare: async (page) => {
      await ssoReady(page, 'Create new user', 'Edit');
      // A user whose name is its e-mail address: the text masks cannot tell the Name cell from
      // the Email cell (same text), so give that Name cell a fictional name here.
      await page.evaluate(() => {
        for (const td of document.querySelectorAll('td.firstName')) if (td.textContent.includes('@')) td.textContent = 'Jordan Kim';
      });
    },
    target: headerTo('.content .hpanel'),
  },
  {
    id: `${SSO}/04-login-settings-1`,
    alt: 'The Login settings form with switches for User registration, Email as username, Edit username, Forgot password, Remember Me, Verify email and Login with email, the Require SSL drop-down set to external requests, and the Update button.',
    doc: `${SSO}/04-login-settings.md`,
    url: '/settings/company/auth/login_settings',
    prepare: async (page) => { await ssoReady(page, 'Require SSL'); },
    target: headerTo('.content .hpanel'),
  },
  {
    id: `${SSO}/05-authentication-settings-1`,
    alt: 'The Authentication settings page with one drop-down per step of the browser flow: Cookie, Kerberos, Identity Provider Redirector and forms, with the indented sub-steps Username Password Form, Browser - Conditional OTP, Condition - user configured and OTP Form.',
    doc: `${SSO}/05-authentication-settings.md`,
    url: '/settings/company/auth/authentication_settings',
    prepare: async (page) => { await ssoReady(page, 'OTP Form'); },
    target: headerTo('.content .hpanel'),
  },
  {
    id: `${SSO}/06-smtp-settings-1`,
    alt: 'The SMTP settings form with the fields Host, Port, From display name, From, Reply to display name, Reply to and EnvelopeFrom, the switches SSL enabled, STARTTLS enabled and Auth enabled, the User and Password fields, and the Update button.',
    doc: `${SSO}/06-smtp-settings.md`,
    url: '/settings/company/auth/smtp_settings',
    viewport: { width: 1440, height: 1300 },
    prepare: async (page) => { await ssoReady(page, 'EnvelopeFrom', 'Password'); },
    target: headerTo('.content .hpanel'),
  },
  // ---------------------------------------------------------------- recipes
  {
    id: `${REC}/01-first-module-to-sbom-1`,
    alt: 'The Projects page with the Create new project dialog open, a Project name field and the Create project button.',
    doc: `${REC}/01-first-module-to-sbom.md`,
    url: '/projects',
    prepare: async (page) => {
      await ready(page, 'mAIfit', 'boostME');
      await openModal(page, '[data-target="#createProject"]', '#createProject');
      await page.locator('#createProject input').first().fill('Example product');
    },
    target: 'viewport',
  },
  {
    id: `${REC}/01-first-module-to-sbom-2`,
    alt: 'The Create key dialog with the name first-scan and the scope developer selected, and the Close and Create buttons.',
    doc: `${REC}/01-first-module-to-sbom.md`,
    url: '/settings/company/api/keys',
    prepare: async (page) => {
      await ready(page, 'Create key');
      await openModal(page, '[data-target="#createModal"]', '#createModal');
      await page.fill('#nameModal', 'first-scan');
      await select2(page, '#createModal select[name=scopeModal]', ['developer']);
      await page.waitForTimeout(600);
    },
    target: '#createModal .modal-content',
  },
  {
    id: `${REC}/01-first-module-to-sbom-3`,
    alt: 'The auth-service module page on the List view with the component list, the status markers for legal, security and quality, and the details of the selected component.',
    doc: `${REC}/01-first-module-to-sbom.md`,
    url: `/projects/${MAIFIT}/modules/${AUTH_SERVICE}/dependencies`,
    prepare: async (page) => { await ready(page, 'npm:auth-service', 'Apache-2.0'); },
    target: 'viewport',
  },
  {
    id: `${REC}/01-first-module-to-sbom-4`,
    alt: 'Step 1 Settings of the Initiate Approval wizard with Dry run unticked, the name Example first release and the version 1.0.0 entered, and empty Packageurl and Approve description fields.',
    doc: `${REC}/01-first-module-to-sbom.md`,
    url: `/projects/${MAIFIT}/modules/${AUTH_SERVICE}/approve`,
    prepare: async (page) => {
      await ready(page, 'Prepare Approval');
      await $(page, () => {
        const jq = window.jQuery || window.Package.jquery.$;
        const cb = jq('#approve_draft');
        if (cb.prop('checked')) { if (cb.iCheck) cb.iCheck('uncheck'); else cb.prop('checked', false).trigger('change'); }
      });
      await page.fill('input[name=approve_name]', 'Example first release');
      await page.fill('input[name=approve_version]', '1.0.0');
      await page.waitForTimeout(600);
    },
    target: 'viewport',
  },
  {
    id: `${REC}/01-first-module-to-sbom-6`,
    alt: 'The release page of Example dry run with the SBOM, Binary links and Published keys buttons and the Approved state in the header, the tabs Overview, New vulnerabilities, Vulnerabilities and Export control, and the four modules of the release.',
    doc: `${REC}/01-first-module-to-sbom.md`,
    url: `/releases/${RELEASE}/overview`,
    prepare: async (page) => { await ready(page, 'Example dry run', 'SBOM', 'Export control'); await page.waitForTimeout(1500); },
    target: 'viewport',
  },
  {
    id: `${REC}/01-first-module-to-sbom-7`,
    alt: 'The SBOM page of the mAIfit release, version 1.0.0, with the PDF, CycloneDX, SPDX, Version and Freeze buttons, the component list with a cleared checkbox per component, and the TODOs Navigator.',
    doc: `${REC}/01-first-module-to-sbom.md`,
    url: `/releases/${RELEASE}/overview`,
    prepare: async (page) => {
      await ready(page, 'Example dry run', 'SBOM');
      const href = await page.locator('a[title="View SBOM"]').first().getAttribute('href');
      await page.goto(new URL(href, page.url()).href);
      await page.addStyleTag({ content: '.chat-mascot { display: none !important; }' });
      await waitText(page, 'CycloneDX', 'SPDX');
      await page.waitForTimeout(2500);
    },
    target: 'viewport',
  },
  {
    id: `${REC}/01-first-module-to-sbom-5`,
    alt: 'The open approval Example release with the Manage binary links, Approve and Reject buttons in the header, the tabs Overview, Vulnerabilities, Licenses, Versioning, Viability, Status changes, Export control, Capabilities and SW-Quality, and the four modules of the approval.',
    doc: `${REC}/01-first-module-to-sbom.md`,
    url: `/approves/${OPEN_REQUEST}/overview`,
    prepare: async (page) => { await ready(page, 'Example release', 'Approve', 'Reject'); await page.waitForTimeout(1500); },
    target: 'viewport',
  },
];
