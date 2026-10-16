// v3 (SaaS) track, agent a4-modules: module pages, component and license details and the
// module settings tabs, photographed on develop.dev.trustsource.io (company TrainCo Ltd.).
// No seed data: the ids below are existing projects and modules of the DEV account.
const M = '03-internal/02-modules';
const S = `${M}/settings`;

// boostME / admin-service: list with red and yellow badges, Legal tab with licenses.
const BOOST = 'QcJprNstGvbQX7ccY';
const BOOST_ADMIN = '9pCK39RwqWsD8o8h5';
// mAIfit / admin-service: has components with vulnerabilities and an inherited quality tool.
const MAIFIT = '7gh7aPoBvJW4rjdYE';
const MAIFIT_ADMIN = 'uRHTQdDyRbpwyCYMf';
// mAIfit-app / scan_mAIfit_app.cdx.json: no default compliance manager, so the screenshot
// user (a compliance manager) has write access to its settings.
const APP = 'AJ6Bmg6AfhzuTDBBz';
const APP_MOD = 'uNydCv9WXmGQhKSAG';

const EXAMPLE_PROJECT = 'ZjkZwkWRRFWPhf3AR';
const EXAMPLE_REDIS = 'jeREBDkfTmkzCdDia';
const moduleUrl = (p, m, view = 'dependencies') => `/projects/${p}/modules/${m}/${view}`;

// The chat mascot floats over the header actions; the guided tour of the module page starts
// by itself after a moment on every fresh browser.
async function calm(page, h) {
  await page.addStyleTag({ content: '.chat-mascot { display: none !important; }' });
  const skip = page.locator('.introjs-skipbutton');
  await skip.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await h.settle(page, 600);
}

// Opens the settings of a module from its project page. A direct page load of the settings
// leaves the CIA tab's risk assessment scheme panel in an error state; in-app navigation works.
async function openSettings(page, h, project, mod) {
  await page.locator(`a[href="/projects/${project}/modules/${mod}/settings"]`).first().click();
  await h.settle(page, 2500);
  await calm(page, h);
}

// Opens a module settings tab such as '#legal' and scrolls the tab bar so it is visible.
async function openTab(page, h, id) {
  await page.evaluate((id) => document.querySelector(`.nav-tabs a[href="${id}"]`).click(), id);
  await h.settle(page, 1500);
  await page.evaluate((id) => {
    const tab = document.querySelector(`.nav-tabs a[href="${id}"]`).parentElement;
    let box = tab.parentElement;
    while (box && box.scrollWidth <= box.clientWidth + 2) box = box.parentElement;
    if (!box) return;
    const t = tab.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    if (t.right > b.right - 60) box.scrollLeft += t.right - (b.right - 60);
    else if (t.left < b.left + 60) box.scrollLeft -= (b.left + 60) - t.left;
  }, id);
  await h.settle(page, 600);
}

// The settings card: module header, tab bar and the active tab down to its last content.
const card = async (page) => ({
  clip: await page.evaluate(() => {
    const area = document.querySelector('.content-area').getBoundingClientRect();
    const pane = document.querySelector('.tab-pane.active');
    const els = [...pane.querySelectorAll('*')].filter((e) => e.getBoundingClientRect().height && getComputedStyle(e).visibility !== 'hidden');
    const bottom = Math.max(...els.map((e) => e.getBoundingClientRect().bottom));
    const y = Math.max(0, area.top - 4);
    return { x: area.left, y, width: area.width, height: Math.min(window.innerHeight, bottom + 24) - y };
  }),
});

// Box around an open dialog, with a little of the page around it.
const dialog = (sel, pad = 16) => async (page) => ({
  clip: await page.evaluate(([sel, pad]) => {
    const r = [...document.querySelectorAll(sel)].find((e) => e.getBoundingClientRect().height).getBoundingClientRect();
    const x = Math.max(0, r.left - pad);
    const y = Math.max(0, r.top - pad);
    return { x, y, width: Math.min(window.innerWidth, r.right + pad) - x, height: Math.min(window.innerHeight, r.bottom + pad) - y };
  }, [sel, pad]),
});

const setting = (file, tab, alt, extra = {}) => ({
  id: `${S}/${file}-1`,
  doc: `${S}/${file}.md`,
  alt,
  url: `/projects/${APP}`,
  prepare: async (page, seed, h) => {
    await openSettings(page, h, APP, APP_MOD);
    await openTab(page, h, tab);
  },
  target: card,
  ...extra,
});

// mAIfit / admin-service filtered to the components with vulnerability findings, with
// fast-xml-builder selected.
async function vulnerableComponent(page, h) {
  await calm(page, h);
  await page.locator('.content-area').getByText('Overall', { exact: false }).filter({ visible: true }).first().click();
  await h.settle(page, 600);
  await page.locator('.dropdown-menu a', { hasText: 'Vulnerability' }).filter({ visible: true }).first().click();
  await h.settle(page, 1500);
  // Switch the OK filter off: only components with warnings or violations remain.
  await page.evaluate(() => [...document.querySelectorAll('.content-area *')]
    .filter((e) => e.children.length <= 1 && e.textContent.trim() === 'OK' && e.offsetParent)
    .forEach((e) => e.click()));
  await h.settle(page, 2000);
  await page.locator('.dep-name-text', { hasText: 'fast-xml-builder' }).first().click();
  await h.settle(page, 3000);
}

export default [
  // Redis 6.2.6 was added to Example Project for this shot as an infrastructure module.
  {
    id: `${M}/03-infrastructure-modules-1`,
    doc: `${M}/03-infrastructure-modules.md`,
    alt: 'The page of the infrastructure module Redis (6.2.6) with the labels Infrastructure Service and Infrastructure Module, the Settings, Analyse and Follow buttons, and the Component Details panel of the catalog entry im:redis with Details, Select license, Viability, OSSF, End-of-life, Versioning, Export control and the vulnerabilities of version 6.2.6.',
    url: moduleUrl(EXAMPLE_PROJECT, EXAMPLE_REDIS),
    prepare: async (page, seed, h) => { await calm(page, h); await page.getByText('im:redis').first().waitFor(); await h.settle(page, 1200); },
    target: 'viewport',
  },
  {
    id: `${M}/index-1`,
    doc: `${M}/index.md`,
    alt: 'The List tab of the module admin-service in the project boostME: each dependency with its version, its license and the status badges for licenses and vulnerabilities, the filters above the list, and the Component Details panel of the root component on the right.',
    url: moduleUrl(BOOST, BOOST_ADMIN),
    prepare: async (page, seed, h) => calm(page, h),
    target: 'viewport',
  },
  {
    id: `${M}/01-create-and-list-1`,
    doc: `${M}/01-create-and-list.md`,
    alt: 'The Add/link module dialog with Module type set to Create custom module, a Module name entered, and the Close and Create module buttons.',
    url: `/projects/${APP}`,
    prepare: async (page, seed, h) => {
      await calm(page, h);
      await page.locator('a[data-target="#createModule"]').filter({ visible: true }).first().click();
      await h.settle(page, 1200);
      await page.selectOption('#moduleType', 'custom');
      await h.settle(page, 800);
      await page.fill('#moduleCustomName', 'example-reporting-service');
    },
    target: dialog('#createModule .modal-content'),
  },
  {
    id: `${M}/02-module-detail-tabs-1`,
    doc: `${M}/02-module-detail-tabs.md`,
    alt: 'The List tab of admin-service filtered by Vulnerability to the components with findings, fast-xml-builder 1.1.4 selected, and the Component Details side panel next to the list with Details, Viability, OSSF, End-of-life, Versioning and Export control.',
    url: moduleUrl(MAIFIT, MAIFIT_ADMIN),
    prepare: async (page, seed, h) => vulnerableComponent(page, h),
    target: 'viewport',
  },
  {
    id: `${M}/04-component-detail-1`,
    doc: `${M}/04-component-detail.md`,
    alt: 'The Component Details side panel of fast-xml-builder 1.1.4: the Vulnerabilities section with the advisory GHSA-5wm8-gmm8-39j9 and its dependency path, then the license MIT with its two obligations, the Settings used for this analysis and the path Settings.',
    url: moduleUrl(MAIFIT, MAIFIT_ADMIN),
    prepare: async (page, seed, h) => {
      await vulnerableComponent(page, h);
      await page.evaluate(() => {
        const box = document.querySelector('.ecs-aside-content') || document.querySelector('.ecs-dependencies-aside');
        const head = [...box.querySelectorAll('*')].find((e) => e.children.length === 0 && e.textContent.trim() === 'Vulnerabilities');
        let scroller = head.parentElement;
        while (scroller && scroller.scrollHeight <= scroller.clientHeight + 2) scroller = scroller.parentElement;
        scroller.scrollTop += head.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 40;
      });
      await h.settle(page, 800);
    },
    target: '.ecs-dependencies-aside',
    padding: 8,
  },
  {
    id: `${M}/05-license-detail-1`,
    doc: `${M}/05-license-detail.md`,
    alt: 'The license details page of Apache License 2.0 with the key Apache-2.0, the Search in license text box at the top right and the beginning of the license text.',
    url: moduleUrl(BOOST, BOOST_ADMIN),
    prepare: async (page, seed, h) => {
      await calm(page, h);
      await page.locator('.nav-tabs a', { hasText: 'Legal' }).first().click();
      await h.settle(page, 2500);
      await page.locator('.licenseName a', { hasText: /^\s*Apache-2\.0\s*$/ }).first().click();
      await h.settle(page, 2500);
      await calm(page, h);
    },
    target: async (page) => ({
      clip: await page.evaluate(() => {
        const area = document.querySelector('.content-area').getBoundingClientRect();
        return { x: area.left, y: area.top - 4, width: area.width, height: 560 };
      }),
    }),
  },

  // Module settings, on scan_mAIfit_app.cdx.json unless noted.
  {
    id: `${S}/index-1`,
    doc: `${S}/index.md`,
    alt: 'The settings of the module scan_mAIfit_app.cdx.json with the General tab active: the tab bar General, Legal, Quality, Crypto management, AI / ML, Allow/Deny, Capabilities, End-of-life, CIA, Resolved obligations, OSSF, Viability and more, and the General form below.',
    url: `/projects/${APP}`,
    prepare: async (page, seed, h) => openSettings(page, h, APP, APP_MOD),
    target: 'viewport',
  },
  setting('01-general', '#general',
    'The General tab: Name, Description, Assigned Project mAIfit-app, Type of architecture, Tags with the link to the company tags, Default project manager, Default compliance manager, Members, Link with LeanIX, Module Identifier, Default confidence level and Repository, with the Update and View/execute deepScan buttons.',
    { viewport: { width: 1440, height: 1300 } }),
  setting('02-legal', '#legal',
    'The Legal tab in the View all mode: the Legal requirements panel with the note that the project legal settings still need completion, the sections Trade Secret Aspects, Licensing Strategy and Distribution of the module, and the buttons View history, Start wizard, Import settings from Template, Import settings from Module and Propagate settings to in the upper right.',
    {
      viewport: { width: 1440, height: 1500 },
      prepare: async (page, seed, h) => {
        await openSettings(page, h, APP, APP_MOD);
        await openTab(page, h, '#legal');
        const all = page.locator('#legal a.view-all').filter({ visible: true });
        if (await all.count()) { await all.first().click(); await h.settle(page, 1200); }
      },
    }),
  setting('03-obligations', '#obligations',
    'The Resolved obligations tab: the Project obligations panel with the note that the obligation settings of the project are empty, the form with Obligation, Key and Comment and the Add button, and the empty list, with Import settings from Module and Propagate settings to in the upper right.'),
  setting('07-module-classification-mdr-ivdr', '#m-classification',
    'The MDR/IVDR Classification tab with the radio groups MDR Classification and IVDR Classification, each from None up to the highest class with a short description, and the Update button.'),
  setting('04-viability', '#viability',
    'The Viability tab with the switch Enable viability analysis for module turned on, the Warning threshold and Violation threshold sliders from no monitoring to very active, the Minimum confidence level slider and Status shown, if minimum confidence level not reached.'),
  setting('05-ossf', '#ossf',
    'The OSSF tab with the switch Enable OSSF analysis for module turned on and the Warning threshold and Violation threshold sliders on the scale 0 to 9, and Status shown, if score is not available.'),
  setting('06-versioning', '#versioning',
    'The Versioning tab with the switch Enable versioning analysis for module turned on, Versioning jump detection switched on, and the Warning threshold and Violation threshold sliders from no monitoring to less than 3 behind.'),
  setting('11-end-of-life', '#endoflife',
    'The End-of-life tab with the switch Enable end-of-life analysis for module turned on and the two threshold sliders from no monitoring to 24 months, both at no monitoring, with the Update button.'),
  setting('08-cia', '#risk',
    'The CIA tab: the note that the project risk settings still need completion, the fields Confidentiality requirement (CR), Integrity requirement (IR) and Availability requirement (AR) with the Update button, and the Risk assessment scheme panel with the inherited impact classes, value scale and annual rate of occurrence, each with an Override switch, the thresholds and Save scheme.',
    { viewport: { width: 1440, height: 1900 } }),
  {
    id: `${S}/09-capabilities-1`,
    doc: `${S}/09-capabilities.md`,
    alt: 'The Add capability dialog over the Capabilities tab, filled in with the Name Single sign-on, Introduced at version 3.2.0 and a Description, with the Close and Add buttons.',
    url: `/projects/${APP}`,
    prepare: async (page, seed, h) => {
      await openSettings(page, h, APP, APP_MOD);
      await openTab(page, h, '#capabilities');
      await page.locator('#capabilities').getByText('Add capability', { exact: false }).filter({ visible: true }).first().click();
      await h.settle(page, 1000);
      const modal = page.locator('.modal').filter({ visible: true }).first();
      await modal.locator('[name=name]').fill('Single sign-on');
      await modal.locator('[name=version]').fill('3.2.0');
      await modal.locator('[name=description]').fill('Sign in with the Example Corp identity provider.');
    },
    target: 'viewport',
  },
  setting('10-encryption', '#encryption',
    'The Crypto management tab: List of Algorithms as detected, which says that no crypto algorithms were identified, and List of Algorithms as managed with the Add algorithm and Export as CycloneDX buttons.'),
  {
    id: `${S}/12-quality-1`,
    doc: `${S}/12-quality.md`,
    alt: 'The Quality tab of the module admin-service: Define test requirements with the note on SARIF test results, the Tool selector with the Add button, and the required tool Selenium inherited from the project, labelled in Project.',
    url: `/projects/${MAIFIT}`,
    prepare: async (page, seed, h) => {
      await openSettings(page, h, MAIFIT, MAIFIT_ADMIN);
      await openTab(page, h, '#quality');
    },
    target: card,
  },
  setting('13-releases', '#releases',
    'The History tab: the Module analysis table with two analyses, their license and component overview and a Remove button each, and the Module scans table below with one scan of mAIfit-app, its uploader and its dependency count.',
    { viewport: { width: 1440, height: 1100 } }),
  setting('14-whitelists-blacklists', '#wblist',
    'The Allow/Deny tab: under Licenses the panels Always allow license and Always deny license with License, Comment and Add; under Components the panels Always allow component and Always deny component with Key, Version, Comment and Add.'),
  {
    id: `${S}/15-cve-whitelist-1`,
    doc: `${S}/15-cve-whitelist.md`,
    alt: 'The Allowed vulnerability tab with the form CVE key, Key, Version and Comment filled in for a vulnerability of fast-xml-builder, the Add button, and the list of muted vulnerabilities below, still empty.',
    url: `/projects/${APP}`,
    prepare: async (page, seed, h) => {
      await openSettings(page, h, APP, APP_MOD);
      await openTab(page, h, '#cveWhitelist');
      const pane = page.locator('#cveWhitelist');
      const inputs = pane.locator('input[type=text], input:not([type])').filter({ visible: true });
      await inputs.nth(0).fill('GHSA-5wm8-gmm8-39j9');
      await inputs.nth(1).fill('npm:fast-xml-builder');
      await inputs.nth(2).fill('1.1.4');
      await inputs.nth(3).fill('Not reachable, XML building is not used in this module.');
    },
    target: card,
  },
  {
    id: `${S}/16-custom-components-1`,
    doc: `${S}/16-custom-components.md`,
    alt: 'The Custom components tab with the Add component button and the panel Module custom components, which has no entries yet.',
    url: `/projects/${APP}`,
    prepare: async (page, seed, h) => {
      await openSettings(page, h, APP, APP_MOD);
      await openTab(page, h, '#customComponents');
    },
    target: card,
  },
  setting('17-spdx-export', '#SPDXExportTab',
    'The Export SPDX tab with the Generate button, the Filter box and one export in the table with its ID, the status generating rdf file and the creation date.'),
  setting('18-danger-zone', '#danger',
    'The Danger Operations tab, Here starts the Danger Zone, with the three operations Archive module, Delete history and Delete module.'),
  setting('19-ai-ml', '#aibom',
    'The AI / ML tab: List of AI artifacts as detected, which says that no machine-learning-model components or AI artifacts were identified, and List of AI artifacts as managed with the Add AI artifact and Export as CycloneDX buttons.'),
];
