// Projects: list, create, project page, project settings tabs, and the project-related
// shots of the roles pages and recipes. Legacy Portal and the company tags come from
// seeds/10-projects.mjs (seed.extra['10-projects']).
const DIR = '03-internal/01-projects';
const SET = `${DIR}/settings`;
const CHRIS = 'chris.taylor@example.com';

const webshop = (seed) => `/projects/${seed.projects.Webshop}`;
const legacy = (seed) => `/projects/${seed.extra['10-projects'].legacyId}`;

// jQuery of the app, for select2 fields.
const jq = (page, fn, arg) => page.evaluate(([src, a]) => {
  const $ = window.jQuery || (window.Package && window.Package.jquery && window.Package.jquery.$);
  return new Function('$', 'a', src)($, a);
}, [fn, arg]);

// Bounding box of the union of the elements, grown by pad (targets get no helpers).
const clipOf = (page, selectors, pad = 12) => page.evaluate(([sels, pad]) => {
  const rs = sels.flatMap((s) => [...document.querySelectorAll(s)]).map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.height);
  if (!rs.length) throw new Error('clipOf: nothing matches ' + sels.join(', '));
  const x = Math.max(0, Math.min(...rs.map((r) => r.left)) - pad);
  const y = Math.max(0, Math.min(...rs.map((r) => r.top)) - pad);
  const right = Math.min(window.innerWidth, Math.max(...rs.map((r) => r.right)) + pad);
  const bottom = Math.min(window.innerHeight, Math.max(...rs.map((r) => r.bottom)) + pad);
  return { clip: { x, y, width: right - x, height: bottom - y } };
}, [selectors, pad]);

// Opens a project settings tab by its pane id.
const openTab = async (page, h, id, wait = 1200) => {
  await page.waitForSelector(`.nav-tabs a[href="#${id}"]`, { state: 'attached', timeout: 30000 });
  await page.$eval(`.nav-tabs a[href="#${id}"]`, (a) => a.click());
  await h.settle(page, wait);
  await page.evaluate(() => {
    const area = document.querySelector('.content-area');
    if (area) area.scrollTop = 0;
  });
};

// From the top of the tab bar (or of `fromSel`) to the bottom of the active pane's content.
const paneClip = (pane, { fromSel = '.nav-tabs-scrollable', pad = 12, bottomSel } = {}) => async (page) => {
  const box = await page.evaluate(([pane, fromSel, bottomSel]) => {
    const from = document.querySelector(fromSel).getBoundingClientRect();
    const p = document.querySelector(`#${pane}`);
    const panel = document.querySelector('.content .ts-panel').getBoundingClientRect();
    let bottom;
    if (bottomSel) bottom = document.querySelector(bottomSel).getBoundingClientRect().bottom;
    else {
      const kids = [...p.querySelectorAll('*')].filter((e) => !e.closest('select') && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden')
        .map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.height);
      bottom = Math.max(...kids.map((r) => r.bottom));
    }
    return { x: panel.left, y: from.top, width: panel.width, height: bottom - from.top, vh: window.innerHeight };
  }, [pane, fromSel, bottomSel || null]);
  // The tab bar sits right under the dark page header: start at its top edge.
  const top = fromSel === '.nav-tabs-scrollable' ? 0 : pad;
  return { clip: { x: box.x - pad, y: box.y - top, width: box.width + 2 * pad, height: Math.min(box.height + top + pad, box.vh - box.y + top) } };
};

const settingsShot = (page, n, pane, alt, extra = {}) => ({
  id: `${SET}/${page}-${n}`,
  doc: `${SET}/${page}.md`,
  url: (seed) => `${webshop(seed)}/settings`,
  prepare: async (p, seed, h) => openTab(p, h, pane),
  target: paneClip(pane),
  alt,
  ...extra,
});

const SHOTS = [
  {
    id: `${DIR}/index-1`,
    doc: `${DIR}/index.md`,
    url: '/projects',
    alt: 'The Projects list in table view with the columns State, Name, Tags, Releases, Modules, Components, Legal, Security and Quality for Demo project, Legacy Portal, Mobile App, Payment Service and Webshop.',
    target: (page) => clipOf(page, ['.ts-page-header', '.content .ts-panel table']),
  },
  {
    id: `${DIR}/01-create-and-list-1`,
    doc: `${DIR}/01-create-and-list.md`,
    url: '/projects',
    prepare: async (page, seed, h) => {
      await h.click(page, 'a[data-target="#createProject"]', 1000);
      await page.locator('#createProject input[type=text]').first().fill('Customer Portal');
    },
    target: '#createProject .modal-content',
    padding: 12,
    alt: 'The Create new project dialog with Customer Portal entered as Project name and the Close and Create project buttons.',
  },
  {
    id: `${DIR}/01-create-and-list-2`,
    doc: `${DIR}/01-create-and-list.md`,
    url: '/projects',
    prepare: async (page, seed, h) => {
      await page.locator('.change-state-filter[data-value="violations"]').evaluate((a) => a.click());
      await h.settle(page, 800);
      const tag = seed.extra['10-projects'].tags['customer-facing'];
      await jq(page, `$('[name=tags]').val([a]).trigger('change');`, tag);
      await h.settle(page, 1200);
    },
    target: (page) => clipOf(page, ['.content .ts-panel table', '.content .ts-panel .select2-container']),
    alt: 'The Projects list filtered to Violations and the tag customer-facing, showing Mobile App and Webshop with their tags.',
  },
  {
    id: `${DIR}/02-project-overview-1`,
    doc: `${DIR}/02-project-overview.md`,
    url: webshop,
    prepare: async (page, seed, h) => h.click(page, '.change-presentation-grid', 1500),
    target: async (page) => {
      const bottom = await page.evaluate(() => Math.max(...[...document.querySelectorAll('.content .ts-panel *')]
        .filter((e) => e.offsetParent !== null).map((e) => e.getBoundingClientRect().bottom).filter((b) => b < window.innerHeight - 60)));
      const c = (await clipOf(page, ['.ts-page-header', '.content .ts-panel'])).clip;
      return { clip: { ...c, height: bottom + 16 - c.y } };
    },
    alt: 'The Webshop project page with the Import, Settings, Add/link, Analyze all, Reports, Approve and Follow buttons in the header and the modules webshop-backend and webshop-frontend as cards in grid view.',
  },
  {
    id: `${SET}/index-1`,
    doc: `${SET}/index.md`,
    url: (seed) => `${legacy(seed)}/settings`,
    target: 'viewport',
    alt: 'The project settings of Legacy Portal with the General tab active: Name, Application goals, Tags, Default project manager Alex Morgan, Default compliance manager Maria Garcia and Members, each manager field with a Propagate to modules button.',
  },
  {
    id: `${SET}/01-general-1`,
    doc: `${SET}/01-general.md`,
    url: (seed) => `${legacy(seed)}/settings`,
    prepare: async (page, seed, h) => openTab(page, h, 'general'),
    target: paneClip('general', { bottomSel: '#updateProjectForm button[type=submit]' }),
    alt: 'The General tab of Legacy Portal with Name, Application goals and Upload file, the tag internal, Alex Morgan and Maria Garcia as default managers, Members, Link with LeanIX, Default confidence level and the Update button.',
  },
  settingsShot('02-legal', 1, 'legal',
    'The Legal tab of Webshop with Commercial Aspects set to license fee, Operating Model set to traditional software distribution, Inbound IP Protection on and Outbound IP Protection off, and the View history, Start wizard, Import settings from Project and Propagate settings to buttons.'),
  settingsShot('03-cia', 1, 'risk',
    'The CIA tab of Webshop with the Confidentiality requirement (CR) and Integrity requirement (IR) set to high and the Availability requirement (AR) set to medium.'),
  settingsShot('04-quality', 1, 'quality',
    'The Quality tab of Webshop with the Define test requirements panel, its Tool selector and Add button, and the Risk register panel with Enable risk creation from SARIF weaknesses (CWE) switched on.'),
  settingsShot('05-encryption', 1, 'encryption',
    'The Crypto management tab of Webshop: the detected algorithms with DES and SHA-1 marked B as denied by company policy, the managed list with Add algorithm, Export as CycloneDX and DES, SHA-1 and RSA marked In use with comments, and the Export controls management panel.',
    { viewport: { width: 1440, height: 1500 }, target: paneClip('encryption') }),
  settingsShot('06-end-of-life', 1, 'endoflife',
    'The End-of-life tab of Webshop with Enable end-of-life analysis for all modules switched on, the Warning threshold slider at 6m and the Violation threshold slider at no monitoring.'),
  settingsShot('07-whitelists-blacklists', 1, 'wblist',
    'The Allow/Deny tab of Webshop with the Enforce Allow list switch, the Always allow license and Always deny license panels and the Always allow component and Always deny component panels.'),
  {
    id: `${SET}/08-obligations-1`,
    doc: `${SET}/08-obligations.md`,
    url: (seed) => `${legacy(seed)}/settings`,
    prepare: async (page, seed, h) => openTab(page, h, 'obligations'),
    target: paneClip('obligations'),
    alt: 'The Resolved obligations tab of Legacy Portal with the Obligation, Key and Comment form and three resolved obligations, for example Reproduce copyright notice for npm:jquery.',
  },
  settingsShot('10-issue-tracker', 1, 'issue',
    'The Issue Integration tab of Webshop with Jira selected, the API and Email switch on API, and the fields Project key, Company url, User, Password and Active filled in with example values.',
    { prepare: async (page, seed, h) => {
      await openTab(page, h, 'issue');
      await jq(page, `$('#issueManager').val('jira').trigger('change');`);
      await h.settle(page, 800);
      await page.fill('#jira-key', 'WEB');
      await page.fill('#jira-url', 'https://jira.example.com');
      await page.fill('#jira-user', 'alex.morgan@example.com');
      await page.check('#jira-active');
    } }),
  {
    id: `${SET}/11-module-import-1`,
    doc: `${SET}/11-module-import.md`,
    url: (seed) => `${legacy(seed)}/settings`,
    prepare: async (page, seed, h) => openTab(page, h, 'ModuleImportTab'),
    target: paneClip('ModuleImportTab'),
    alt: 'The Imports tab of Legacy Portal with the Import button and the import history: three CycloneDX imports with Download links, their scans, the status FINISHED and the creation date.',
  },
  settingsShot('12-danger-zone', 1, 'danger',
    'The Danger Operations tab of Webshop with the Here starts the Danger Zone banner, the disabled Delete project button and the info box asking to unassign all modules first or to click here to remove them.'),
  settingsShot('13-webhooks-channels', 1, 'webhooks',
    'The Add webhook/channel dialog with the name Security alerts, the triggers Vulnerabilities by module and Approval, the type Webhook, the method POST, a target URL on example.com and one header.',
    { prepare: async (page, seed, h) => {
      await openTab(page, h, 'webhooks');
      await h.click(page, '#webhooks a[data-target="#createWebhook"]', 1000);
      await page.fill('#webhookName', 'Security alerts');
      await jq(page, `
        const vals = [...document.querySelectorAll('#webhookTrigger option')]
          .filter((o) => a.includes(o.textContent.trim())).map((o) => o.value);
        $('#webhookTrigger').val(vals).trigger('change');`, ['Vulnerabilities by module', 'Approval']);
      await h.settle(page, 500);
      await page.fill('#webhookUrl', 'https://hooks.example.com/trustsource/webshop');
      await page.fill('#webhookHeaders', 'X-Source: trustsource');
    },
    target: '#createWebhook .modal-content',
    padding: 12 }),
  {
    id: '10-roles-permissions/03-permission-model-1',
    doc: '10-roles-permissions/03-permission-model.md',
    user: CHRIS,
    url: (seed) => `${legacy(seed)}/settings`,
    prepare: async (page, seed, h) => openTab(page, h, 'general'),
    target: async (page) => {
      const box = await page.evaluate(() => {
        const panel = document.querySelector('.content .ts-panel').getBoundingClientRect();
        const top = document.querySelector('#general [name=name]').closest('.form-group').getBoundingClientRect().top;
        const bottom = document.querySelector('#general [name="relatedUsers.members"]').closest('.form-group').getBoundingClientRect().bottom;
        return { x: panel.left, y: top, width: panel.width, height: bottom - top };
      });
      return { clip: { x: box.x, y: box.y - 12, width: box.width, height: box.height + 24 } };
    },
    alt: 'The General tab of Legacy Portal as seen by Chris Taylor, Manager and Portfolio manager but not the project owner: Name, Application goals, Tags and Members are greyed out and read-only, while Default project manager and Default compliance manager can be changed.',
  },
  {
    id: '10-roles-permissions/06-settings-permission-matrix-1',
    doc: '10-roles-permissions/06-settings-permission-matrix.md',
    user: CHRIS,
    url: (seed) => `${legacy(seed)}/settings`,
    prepare: async (page, seed, h) => openTab(page, h, 'general'),
    target: paneClip('general', { fromSel: '.projects-header', bottomSel: '#updateProjectForm button[type=submit]' }),
    alt: 'The project settings of Legacy Portal for Chris Taylor, who is not an owner: read-only Name, Application goals, Tags and Members fields, and editable Default project manager and Default compliance manager fields.',
  },
  {
    id: 'recipes/12-legal-questionnaire-1',
    doc: 'recipes/12-legal-questionnaire.md',
    url: (seed) => `${webshop(seed)}/settings`,
    prepare: async (page, seed, h) => {
      await openTab(page, h, 'legal');
      await h.click(page, '#legal .view-wizard', 1200);
    },
    target: paneClip('legal'),
    alt: 'The Legal tab of Webshop with the Legal settings wizard on Question 1, Commercial Aspects, listing the commercialisation options and the Next button.',
  },
  {
    id: 'recipes/11-migrate-from-another-sca-1',
    doc: 'recipes/11-migrate-from-another-sca.md',
    url: legacy,
    target: (page) => clipOf(page, ['.ts-page-header', '.content .ts-panel table']),
    alt: 'The Legacy Portal project page with the three imported modules portal-api, portal-reports and portal-web, each with its state, components and legal and security bars.',
  },
];

// The shared instance sometimes ends a saved session while a long run is going on. When the
// page shows the sign-in form, log in again and reopen the shot's page.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE_URL, SHOT_USER, settle } from '../lib.mjs';

async function relogin(page, email, url) {
  if (!(await page.locator('#username').isVisible().catch(() => false))) return;
  const seedFile = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.seed.json');
  const team = JSON.parse(fs.readFileSync(seedFile, 'utf8')).team || {};
  await page.fill('#username', email);
  await page.fill('#password', team[email].password);
  await page.click('button[type=submit]');
  await page.waitForFunction(() => !document.querySelector('#username'), null, { timeout: 60000 });
  await page.context().storageState({ path: path.join(path.dirname(seedFile), `.auth-${email.replace(/[^a-z0-9]+/gi, '_')}.json`) });
  await page.goto(BASE_URL + url);
  await settle(page, 1500);
}

export default SHOTS.map((shot) => ({
  ...shot,
  prepare: async (page, seed, h) => {
    const url = typeof shot.url === 'function' ? shot.url(seed) : shot.url;
    await relogin(page, shot.user || SHOT_USER, url);
    if (shot.prepare) await shot.prepare(page, seed, h);
  },
}));
