// v3 (SaaS) projects: list, create, project page, analytics, project settings tabs and the
// Resolved obligations and Imports pages. Taken on DEV (TrainCo Ltd.) as Max Mustermann.
// mAIfit and mAIfit-app are existing projects; Example Project was created for these shots
// (Max is its default project and compliance manager, so its Danger Operations tab shows).
const DIR = '03-internal/01-projects';
const SET = `${DIR}/settings`;

const MAIFIT = '7gh7aPoBvJW4rjdYE';
const MAIFIT_APP = 'AJ6Bmg6AfhzuTDBBz';
const EXAMPLE = 'ZjkZwkWRRFWPhf3AR';

const HIDE_CSS = '.chat-mascot { display: none !important; }';

// jQuery of the app, for select2 fields.
const jq = (page, fn, arg) => page.evaluate(([src, a]) => {
  const $ = window.jQuery || (window.Package && window.Package.jquery && window.Package.jquery.$);
  return new Function('$', 'a', src)($, a);
}, [fn, arg]);

// Bounding box of the union of the elements, grown by pad.
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
const openTab = async (page, h, id, wait = 1500) => {
  await page.waitForSelector(`.nav-tabs a[href="#${id}"]`, { state: 'attached', timeout: 30000 });
  await page.$eval(`.nav-tabs a[href="#${id}"]`, (a) => a.click());
  await h.settle(page, wait);
  await page.evaluate(() => {
    const area = document.querySelector('.content-area');
    if (area) area.scrollTop = 0;
  });
};

// From the top of the tab bar to the bottom of the active pane's content.
const paneClip = (pane, { pad = 12, bottomSel } = {}) => async (page) => {
  const box = await page.evaluate(([pane, bottomSel]) => {
    const from = document.querySelector('.nav-tabs').getBoundingClientRect();
    const p = document.querySelector(`#${pane}`);
    const panel = p.closest('.tab-content') || p;
    const pr = panel.getBoundingClientRect();
    let bottom;
    if (bottomSel) bottom = document.querySelector(bottomSel).getBoundingClientRect().bottom;
    else {
      const kids = [...p.querySelectorAll('*')].filter((e) => !e.closest('select') && !e.closest('datalist') && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden')
        .map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.height);
      bottom = Math.max(...kids.map((r) => r.bottom));
    }
    return { x: Math.min(from.left, pr.left), right: Math.max(from.right, pr.right), y: from.top, bottom, vh: window.innerHeight };
  }, [pane, bottomSel || null]);
  return { clip: { x: box.x - pad, y: box.y - 4, width: box.right - box.x + 2 * pad, height: Math.min(box.bottom - box.y + 4 + pad, box.vh - box.y + 4) } };
};

// Opens the project settings from the project page, as a user does. Loaded directly by URL,
// the CIA tab's Risk assessment scheme panel says the project could not be found (app bug),
// and the Legal tab misses Propagate settings to.
const openSettings = async (page, h, project) => {
  await page.waitForSelector('a.project-settings-link', { state: 'attached', timeout: 30000 });
  await page.$eval('a.project-settings-link', (a) => a.click());
  await page.waitForURL(`**/projects/${project}/settings`);
  await h.settle(page, 2500);
};

const settingsShot = (doc, n, project, pane, alt, extra = {}) => ({
  id: `${SET}/${doc}-${n}`,
  doc: `${SET}/${doc}.md`,
  url: `/projects/${project}`,
  prepare: async (p, seed, h) => {
    await openSettings(p, h, project);
    await openTab(p, h, pane);
  },
  target: paneClip(pane),
  alt,
  ...extra,
});

const SHOTS = [
  {
    id: `${DIR}/index-1`,
    doc: `${DIR}/index.md`,
    url: '/projects',
    target: (page) => clipOf(page, ['.normalheader', '.content table']),
    alt: 'The Projects list in table view with the columns State, Name, Tags, Releases, Modules, Components, Legal, Security, Quality and Deployments for the projects boostME, Example Project, mAIfit and mAIfit-app.',
  },
  {
    id: `${DIR}/01-create-and-list-1`,
    doc: `${DIR}/01-create-and-list.md`,
    url: '/projects',
    prepare: async (page, seed, h) => {
      await h.click(page, 'a[data-target="#createProject"]', 1200);
      await page.locator('#createProject input[type=text]').first().fill('Customer Portal');
    },
    target: '#createProject .modal-content',
    alt: 'The Create new project dialog with Customer Portal entered as Project name and the Close and Create project buttons.',
  },
  {
    id: `${DIR}/01-create-and-list-2`,
    doc: `${DIR}/01-create-and-list.md`,
    url: '/projects',
    prepare: async (page, seed, h) => {
      await page.locator('.change-state-filter[data-value="violations"]').evaluate((a) => a.click());
      await h.settle(page, 1200);
    },
    target: (page) => clipOf(page, ['.content input[placeholder=Filter]', '.content table']),
    alt: 'The Projects list filtered to Violations, showing boostME, mAIfit and mAIfit-app; the Tags field reads No tags because the company has no tags yet.',
  },
  {
    id: `${DIR}/02-project-overview-1`,
    doc: `${DIR}/02-project-overview.md`,
    url: `/projects/${MAIFIT}`,
    target: 'viewport',
    alt: 'The mAIfit project page with the Reports, Follow and Settings buttons in the header, the Risks, Deployments, Releases and Analytics tiles and the first modules of the module list in table view.',
  },
  {
    id: `${DIR}/04-analytics-1`,
    doc: `${DIR}/04-analytics.md`,
    url: `/projects/${MAIFIT}/analytics`,
    prepare: async (page, seed, h) => {
      await page.getByText('Security', { exact: true }).filter({ visible: true }).first().click();
      await h.settle(page, 2000);
    },
    target: 'viewport',
    alt: 'The Analytics page of mAIfit with the Security category selected: the headline This month 16 violations and 18 warnings, the Open Vulnerability report button, the chart of violations and warnings per month and the empty Modules that got worse table.',
  },
  {
    id: `${SET}/index-1`,
    doc: `${SET}/index.md`,
    url: `/projects/${EXAMPLE}/settings`,
    target: 'viewport',
    alt: 'The project settings of Example Project with the General tab active: Name, Application goals with Upload file, Tags, Max Mustermann as default project manager and default compliance manager, each with a Propagate to modules button, and Members.',
  },
  {
    id: `${SET}/01-general-1`,
    doc: `${SET}/01-general.md`,
    url: `/projects/${EXAMPLE}/settings`,
    prepare: async (page, seed, h) => openTab(page, h, 'general'),
    target: paneClip('general', { bottomSel: '#updateProjectForm button[type=submit]' }),
    alt: 'The General tab of Example Project with Name, Application goals and Upload file, Tags, the default managers and Members with Propagate to modules, Link with LeanIX, Default confidence level Medium +, Threat model layout Keep manual layout and the Update button.',
  },
  settingsShot('02-legal', 1, MAIFIT_APP, 'legal',
    'The Legal tab of mAIfit-app with the Commercial Aspects and Operating Model options, the Inbound and Outbound IP Protection switches and the View history, Start wizard, Import settings from Template, Import settings from Project and Propagate settings to buttons.',
    { prepare: async (page, seed, h) => {
      await openSettings(page, h, MAIFIT_APP);
      await openTab(page, h, 'legal');
      const all = page.locator('#legal .view-all').filter({ visible: true });
      if (await all.count()) { await all.first().click(); await h.settle(page, 1000); }
    } }),
  settingsShot('03-cia', 1, MAIFIT, 'risk',
    'The CIA tab of mAIfit with Confidentiality requirement (CR) high, Integrity requirement (IR) medium and Availability requirement (AR) low, and below it the Risk assessment scheme panel with impact classes, value scale, ARO and thresholds.',
    { viewport: { width: 1440, height: 1200 } }),
  settingsShot('04-quality', 1, MAIFIT, 'quality',
    'The Quality tab of mAIfit as a user without write access sees it: the Define test requirements panel with the required tool Selenium and no Tool selector, and the Risk register panel with its three switches for SARIF weaknesses, vulnerabilities and OBOM findings, all off.',
    { viewport: { width: 1440, height: 1200 } }),
  settingsShot('05-encryption', 1, MAIFIT, 'encryption',
    'The Crypto management tab of mAIfit: List of Algorithms as detected without findings, List of Algorithms as managed with Add algorithm and Export as CycloneDX, and the Export controls management panel with its Import and Export columns.'),
  settingsShot('06-end-of-life', 1, MAIFIT, 'endoflife',
    'The End-of-life tab of mAIfit with Enable end-of-life analysis for all modules switched on, the Warning threshold slider at 6m and the Violation threshold slider at 1m.'),
  settingsShot('07-whitelists-blacklists', 1, MAIFIT, 'wblist',
    'The Allow/Deny tab of mAIfit with the Enforce Allow list switch, the Always allow license and Always deny license panels with No-License on the deny list, and the Always allow component and Always deny component panels.',
    { viewport: { width: 1440, height: 1100 } }),
  {
    id: `${SET}/08-obligations-1`,
    doc: `${SET}/08-obligations.md`,
    url: `/projects/${EXAMPLE}/obligations-resolved`,
    prepare: async (page) => {
      await page.selectOption('select[name=obligationKey]', 'O10');
      await page.fill('input[name=key]', 'npm:example-lib');
      await page.fill('input[name=comment]', 'Example: notice included in the NOTICE file');
    },
    target: (page) => clipOf(page, ['.normalheader', '.project-obligations-content .panel-body *'], 16),
    alt: 'The Resolved obligations page of Example Project with Propagate settings to in the header and the form with Obligation Reproduce Copyright Notice, Key npm:example-lib, a Comment and the Add button above the still empty list.',
  },
  settingsShot('09-module-classification', 1, MAIFIT_APP, 'm-classification',
    'The MDR/IVDR Classification tab of mAIfit-app with the Propagate settings to button, the MDR Classification options None, I, IIa, IIb and III and the IVDR Classification options None, A, B, C and D, both set to None, and the Update button.'),
  settingsShot('10-issue-tracker', 1, MAIFIT, 'issue',
    'The Issue Integration tab of mAIfit with Jira selected, the API and Email switch on API, and the fields Project key, Company url, User, Password and Active filled in with example values.',
    { prepare: async (page, seed, h) => {
      await openSettings(page, h, MAIFIT);
      await openTab(page, h, 'issue');
      await jq(page, `$('#issueManager').val('jira').trigger('change');`);
      await h.settle(page, 800);
      await page.fill('#jira-key', 'FIT');
      await page.fill('#jira-url', 'https://jira.example.com');
      await page.fill('#jira-user', 'alex.morgan@example.com');
      await page.check('#jira-active');
    } }),
  {
    id: `${SET}/11-module-import-1`,
    doc: `${SET}/11-module-import.md`,
    url: `/projects/${MAIFIT_APP}/imports`,
    target: (page) => clipOf(page, ['.normalheader', '.project-imports-content .panel-body *'], 16),
    alt: 'The Imports page of mAIfit-app with the Module imports table, one finished CycloneDX import with its Download link, scan and creation date, and the empty SPDX imports table.',
  },
  settingsShot('12-danger-zone', 1, EXAMPLE, 'danger',
    'The Danger Operations tab of Example Project with the Here starts the Danger Zone banner, the text Delete this project and the Delete project button.'),
];

export default SHOTS.map((shot) => ({
  ...shot,
  prepare: async (page, seed, h) => {
    await page.addStyleTag({ content: HIDE_CSS });
    if (shot.prepare) await shot.prepare(page, seed, h);
    await page.addStyleTag({ content: HIDE_CSS });
  },
}));
