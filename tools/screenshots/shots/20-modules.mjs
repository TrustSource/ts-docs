// Modules: module pages, component and license details, module settings tabs, the module
// settings matrix, and the recipes on license conflicts, crypto inventory and infrastructure
// modules. Data from seeds/20-modules.mjs (settings entries on webshop-backend, NGINX module).
const M = '03-internal/02-modules';
const S = `${M}/settings`;
const MOD = '20-modules';

const webshop = (seed) => seed.projects.Webshop;
const backend = (seed) => seed.scans['webshop-backend'].moduleId;
const payment = (seed) => seed.projects['Payment Service'];
const nginx = (seed) => seed.extra[MOD].nginx;
const backendUrl = (seed, view = 'dependencies') => `/projects/${webshop(seed)}/modules/${backend(seed)}/${view}`;
const settingsUrl = (seed) => `/projects/${webshop(seed)}/modules/${backend(seed)}/settings`;
const nginxSettingsUrl = (seed) => `/projects/${payment(seed)}/modules/${nginx(seed)}/settings`;

// Opens a module settings tab such as '#legal'.
async function openTab(page, h, id) {
  await page.evaluate((id) => document.querySelector(`.nav-tabs a[href="${id}"]`).click(), id);
  await h.settle(page, 1500);
  // The tab bar scrolls sideways; bring the whole active tab into view, clear of the arrows.
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
const card = (bottomSel) => async (page) => ({
  clip: await page.evaluate((bottomSel) => {
    const pane = document.querySelector('.tab-pane.active');
    const els = bottomSel ? [...pane.querySelectorAll(bottomSel)] : [...pane.querySelectorAll('*')];
    const bottom = Math.max(...els.filter((e) => e.getBoundingClientRect().height).map((e) => e.getBoundingClientRect().bottom));
    const y = 62;
    return { x: 211, y, width: 1181, height: Math.min(window.innerHeight, bottom + 20) - y };
  }, bottomSel),
});

// Box around the open Bootstrap dialog, with some backdrop.
const dialog = (sel, pad = 16) => async (page) => ({
  clip: await page.evaluate(([sel, pad]) => {
    const r = document.querySelector(sel).getBoundingClientRect();
    const x = Math.max(0, r.left - pad);
    const y = Math.max(0, r.top - pad);
    return { x, y, width: Math.min(window.innerWidth, r.right + pad) - x, height: Math.min(window.innerHeight, r.bottom + pad) - y };
  }, [sel, pad]),
});

// The grid view of a project, cropped below the module cards (one row of cards).
const gridCards = async (page) => {
  await page.waitForFunction(() => document.querySelectorAll('.change-presentation-grid.active').length > 0);
  return { clip: { x: 211, y: 62, width: 1181, height: 440 } };
};

async function openAddLink(page, h) {
  await page.locator('a[data-target="#createModule"]').filter({ visible: true }).first().click();
  await h.settle(page, 1200);
}

// Clicks a component row of the List view.
async function openComponent(page, h, name) {
  await page.locator('.dep-name-text', { hasText: name }).first().click();
  await h.settle(page, 2500);
}

const setting = (n, file, tab, alt, extra = {}) => ({
  id: `${S}/${file}-${n}`,
  doc: `${S}/${file}.md`,
  alt,
  url: settingsUrl,
  prepare: async (page, seed, h) => openTab(page, h, tab),
  target: card(),
  ...extra,
});

export default [
  // Overview
  {
    id: `${M}/index-1`,
    doc: `${M}/index.md`,
    alt: 'The webshop-backend module page in the List view: each dependency with its license and with red or yellow status badges, the OK, Warnings and Violations filters, and the Component Details panel of the module root on the right.',
    url: (seed) => backendUrl(seed),
    target: 'viewport',
  },
  {
    id: `${M}/01-create-and-list-1`,
    doc: `${M}/01-create-and-list.md`,
    alt: 'The Add/link module dialog with Module type set to Create custom module and a Module name entered, and the Close and Create module buttons.',
    url: (seed) => `/projects/${webshop(seed)}`,
    prepare: async (page, seed, h) => {
      await openAddLink(page, h);
      await page.selectOption('#moduleType', 'custom');
      await h.settle(page, 800);
      await page.fill('#moduleCustomName', 'webshop-search');
    },
    target: dialog('#createModule .modal-content'),
  },
  {
    id: `${M}/02-module-detail-tabs-1`,
    doc: `${M}/02-module-detail-tabs.md`,
    alt: 'The List view of webshop-backend with log4j-core selected and the Component Details side panel open next to the list, showing Details, End-of-life, Versioning, Export control and the vulnerabilities of version 2.14.1.',
    url: (seed) => backendUrl(seed),
    prepare: async (page, seed, h) => openComponent(page, h, 'log4j-core'),
    target: 'viewport',
  },
  {
    id: `${M}/03-infrastructure-modules-1`,
    doc: `${M}/03-infrastructure-modules.md`,
    alt: 'The page of the infrastructure module NGINX (1.26.0), labelled Infrastructure Service and Infrastructure Module, with the Component Details panel of the catalog entry im:nginx: Details, Select license, End-of-life, Versioning, Export control and the vulnerability section of version 1.26.0, which shows none.',
    url: (seed) => `/projects/${payment(seed)}/modules/${nginx(seed)}`,
    target: 'viewport',
  },
  {
    id: `${M}/04-component-detail-1`,
    doc: `${M}/04-component-detail.md`,
    alt: 'The Component Details side panel of spring-beans 5.3.17: the Vulnerabilities section with CVE-2022-22965, shown as muted with the reason from the allowed vulnerability list, and CVE-2022-22970, the dependency path, and the license Apache-2.0 with its warnings, violation and obligations.',
    url: (seed) => backendUrl(seed),
    prepare: async (page, seed, h) => {
      await openComponent(page, h, 'spring-beans');
      await page.evaluate(() => {
        const box = document.querySelector('.ecs-aside-content');
        const head = [...box.querySelectorAll('*')].find((e) => e.children.length === 0 && e.textContent.trim() === '5.3.17');
        box.scrollTop += head.getBoundingClientRect().top - box.getBoundingClientRect().top - 8;
      });
      await h.settle(page, 600);
    },
    target: '.ecs-dependencies-aside',
    padding: 8,
  },
  {
    id: `${M}/05-license-detail-1`,
    doc: `${M}/05-license-detail.md`,
    alt: 'The license details page Apache License 2.0 Apache-2.0 with the subtitle License Details, the Search in license text box and the Edit button in the header, and the license text below.',
    url: (seed) => backendUrl(seed, 'legal'),
    prepare: async (page, seed, h) => {
      await page.locator('.licenseName a', { hasText: /^\s*Apache-2\.0\s*$/ }).first().click();
      await h.settle(page, 2000);
    },
    target: async () => ({ clip: { x: 211, y: 62, width: 1181, height: 560 } }),
  },

  // Module settings
  {
    id: `${S}/index-1`,
    doc: `${S}/index.md`,
    alt: 'The settings of the module webshop-backend with the General tab active: the tab bar General, Legal, Quality, Crypto management, AI / ML, Allow/Deny, Capabilities, End-of-life, CIA, Resolved obligations, Viability, Versioning and more, and the General form below.',
    url: settingsUrl,
    target: 'viewport',
  },
  setting(1, '01-general', '#general',
    'The General tab of webshop-backend: Name, Description, Assigned Project Webshop, Type of architecture Backend-Service, the tag customer-facing, Default project manager Alex Morgan, Default compliance manager Maria Garcia, Members, Link with LeanIX, Module Identifier, Default confidence level and Repository, with the Update button.',
    { viewport: { width: 1440, height: 1240 } }),
  setting(1, '02-legal', '#legal',
    'The Legal tab of a module in the View all mode: the Legal requirements summary of the project, the sections Trade Secret Aspects, Licensing Strategy and Distribution of the module, and the buttons View history, Start wizard, Import settings from Module and Propagate settings to.',
    { viewport: { width: 1440, height: 1700 },
      prepare: async (page, seed, h) => {
        await openTab(page, h, '#legal');
        await page.locator('#legal').getByText('View all', { exact: true }).first().click();
        await h.settle(page, 1200);
      } }),
  setting(1, '03-obligations', '#obligations',
    'The Resolved obligations tab: the Project obligations panel saying that the project has no obligation settings yet, the form with Obligation, Key and Comment, and the list with Provide copy of license text and Reproduce copyright notice and their comments.'),
  {
    id: `${S}/04-viability-1`,
    doc: `${S}/04-viability.md`,
    alt: 'The Viability tab with the switch Enable viability analysis for module turned on, the Warning threshold and Violation threshold sliders, the Minimum confidence level and the status shown if the minimum confidence level is not reached.',
    url: nginxSettingsUrl,
    prepare: async (page, seed, h) => openTab(page, h, '#viability'),
    target: card(),
  },
  {
    id: `${S}/06-versioning-1`,
    doc: `${S}/06-versioning.md`,
    alt: 'The Versioning tab with the switch Enable versioning analysis for module turned on, the jump detection option and the Warning threshold and Violation threshold sliders.',
    url: nginxSettingsUrl,
    prepare: async (page, seed, h) => openTab(page, h, '#versioning'),
    target: card(),
  },
  setting(1, '08-cia', '#risk',
    'The CIA tab: the Project CIA requirements panel with confidentiality high, integrity high and availability medium, and the module fields Confidentiality requirement (CR), Integrity requirement (IR) and Availability requirement (AR) with the Update button.'),
  {
    id: `${S}/09-capabilities-1`,
    doc: `${S}/09-capabilities.md`,
    alt: 'The Add capability dialog over the Capabilities tab, filled in with the Name Single sign-on, Introduced at version 3.2.0 and a Description, with the Add button.',
    url: settingsUrl,
    prepare: async (page, seed, h) => {
      await openTab(page, h, '#capabilities');
      await page.locator('#capabilities [data-target="#CapabilitiesAddModal"], #capabilities a:has-text("Add capability"), #capabilities button:has-text("Add capability")').filter({ visible: true }).first().click();
      await h.settle(page, 1000);
      await page.fill('#CapabilitiesAddModal [name=name]', 'Single sign-on');
      await page.fill('#CapabilitiesAddModal [name=version]', '3.2.0');
      await page.fill('#CapabilitiesAddModal [name=description]', 'Sign in with the Example Corp identity provider.');
    },
    target: 'viewport',
  },
  setting(1, '10-encryption', '#encryption',
    'The Crypto management tab of webshop-backend: the detected algorithms DES, ECDSA, RSA and SHA-1, with DES and SHA-1 marked B for denied, and the List of Algorithms as managed with Add algorithm, Export as CycloneDX and the columns Added, B, Name, Asset type, Details, Comment and In use.'),
  {
    id: `${S}/11-end-of-life-1`,
    doc: `${S}/11-end-of-life.md`,
    alt: 'The End-of-life tab with the switch Enable end-of-life analysis for module turned on and the Warning threshold and Violation threshold sliders in months.',
    url: nginxSettingsUrl,
    prepare: async (page, seed, h) => openTab(page, h, '#endoflife'),
    target: card(),
  },
  setting(1, '12-quality', '#quality',
    'The Quality tab with Define test requirements, the note on SARIF test results, and the Tool selector with the Add button.'),
  setting(1, '13-releases', '#releases',
    'The History tab of webshop-backend: the Module analysis table with two analyses, their license and component overview and a Remove button each, and the Module scans table below with the scan of webshop-backend 2.4.0.',
    { viewport: { width: 1440, height: 1250 } }),
  setting(1, '14-whitelists-blacklists', '#wblist',
    'The Allow/Deny tab: under Licenses the Always allow license list with GNU Lesser General Public License v2.1 only and the Always deny license list with GNU Affero General Public License v3.0 only; under Components the Always allow component and Always deny component lists with key, version and comment.',
    { viewport: { width: 1440, height: 1150 } }),
  setting(1, '15-cve-whitelist', '#cveWhitelist',
    'The Allowed vulnerability tab with the form CVE key, Key, Version and Comment, and the entry CVE-2022-22965 for maven:org.springframework:spring-beans 5.3.17 with its reason.'),
  setting(1, '16-custom-components', '#customComponents',
    'The Custom components tab with the Add component button and the Module custom components table: commons-text 1.9 Apache-2.0 and h2 1.4.199 MPL-2.0, each with a Remove button.'),
  setting(1, '17-spdx-export', '#SPDXExportTab',
    'The Export SPDX tab with the Generate button and one export in the table, with Download RDF and the status finished.'),
  setting(1, '18-danger-zone', '#danger',
    'The Danger Operations tab, Here starts the Danger Zone, with the three operations Archive module, Delete history and Delete module.'),
  {
    id: `${S}/19-ai-ml-1`,
    doc: `${S}/19-ai-ml.md`,
    alt: 'The AI / ML tab of payment-service: List of AI artifacts as detected, and List of AI artifacts as managed with Add AI artifact, Export as CycloneDX and the models fraud-scoring-model 2.1 and chargeback-classifier 1.0 with provider, task, family, architecture and comment.',
    url: (seed) => `/projects/${payment(seed)}/modules/${seed.scans['payment-service'].moduleId}/settings`,
    prepare: async (page, seed, h) => openTab(page, h, '#aibom'),
    target: card(),
  },

  // Module settings matrix: the settings header with the tab bar at the normal window width.
  {
    id: '10-roles-permissions/06a-module-settings-matrix-1',
    doc: '10-roles-permissions/06a-module-settings-matrix.md',
    alt: 'The module settings of webshop-backend with the tab bar General, Legal, Quality, Crypto management, AI / ML, Allow/Deny, Capabilities and more, an arrow to scroll to the remaining tabs, and the top of the General tab.',
    url: settingsUrl,
    target: async (page) => ({
      clip: await page.evaluate(() => {
        const area = document.querySelector('.content-area').getBoundingClientRect();
        const tabs = document.querySelector('.nav-tabs').getBoundingClientRect();
        return { x: area.left, y: area.top, width: area.width, height: Math.min(window.innerHeight - area.top, tabs.bottom - area.top + 260) };
      }),
    }),
  },

  // Recipes
  {
    id: 'recipes/03-handle-license-conflict-1',
    doc: 'recipes/03-handle-license-conflict.md',
    alt: 'The Legal view of webshop-backend with the license GPL-2.0-only expanded, status Violations, showing its component mysql-connector-java 8.0.27; Apache-2.0 also has Violations, LGPL-2.1-only is Allowed in module, and MIT and License not detected have Warnings.',
    url: (seed) => backendUrl(seed, 'legal'),
    prepare: async (page, seed, h) => {
      await page.locator('.context-license', { has: page.locator('.licenseName a', { hasText: /^\s*GPL-2\.0-only\s*$/ }) }).locator('.expand-table').first().click();
      await h.settle(page, 2500);
    },
    target: 'viewport',
  },
  {
    id: 'recipes/03-handle-license-conflict-2',
    doc: 'recipes/03-handle-license-conflict.md',
    alt: 'The Licenses part of the Allow/Deny tab of a module: the Always allow license list with GNU Lesser General Public License v2.1 only and its comment, and the Always deny license list with GNU Affero General Public License v3.0 only.',
    url: settingsUrl,
    prepare: async (page, seed, h) => openTab(page, h, '#wblist'),
    target: async (page) => ({
      clip: await page.evaluate(() => {
        const pane = document.querySelector('#wblist').getBoundingClientRect();
        const comp = [...document.querySelectorAll('#wblist *')].find((e) => e.children.length === 0 && e.textContent.trim() === 'Components').getBoundingClientRect();
        return { x: pane.left, y: pane.top, width: pane.width, height: comp.top - 12 - pane.top };
      }),
    }),
  },
  {
    id: 'recipes/07-crypto-inventory-pqc-1',
    doc: 'recipes/07-crypto-inventory-pqc.md',
    alt: 'The Crypto management tab of the module webshop-backend with the algorithms found in the imported data, DES, ECDSA, RSA and SHA-1, and the List of Algorithms as managed with comments and the In use column.',
    url: settingsUrl,
    prepare: async (page, seed, h) => openTab(page, h, '#encryption'),
    target: card(),
  },
  {
    id: 'recipes/07-crypto-inventory-pqc-2',
    doc: 'recipes/07-crypto-inventory-pqc.md',
    alt: 'The All bad crypto overview for the project Webshop: the counts of modules, components with algorithms, detected, managed and in-use algorithms and the coverage, and the Webshop row with the algorithms in use RSA, SHA-1 and DES, the last two marked B as denied by company policy.',
    url: '/reports/bad-algorithms',
    prepare: async (page, seed, h) => {
      await page.evaluate((id) => window.$('.current-project').val(id).trigger('change'), webshop(seed));
      await h.settle(page, 4000);
    },
    target: async (page) => ({
      clip: await page.evaluate(() => {
        const rows = [...document.querySelectorAll('.content-area .panel, .content-area .ts-panel, .content-area table')].filter((e) => e.getBoundingClientRect().height);
        const bottom = Math.max(...rows.map((e) => e.getBoundingClientRect().bottom));
        return { x: 211, y: 62, width: 1181, height: Math.min(window.innerHeight, bottom + 20) - 62 };
      }),
    }),
  },
  {
    id: 'recipes/10-add-infrastructure-module-1',
    doc: 'recipes/10-add-infrastructure-module.md',
    alt: 'The Add/link module dialog with Module type COTS or Infrastructure component, NGINX in Select pre-defined module, 1.26.0 in Module version, Type of architecture Infrastructure Service and Is open source module ticked.',
    url: (seed) => `/projects/${payment(seed)}`,
    prepare: async (page, seed, h) => {
      await openAddLink(page, h);
      await page.selectOption('#moduleType', 'custom');
      await h.settle(page, 500);
      await page.selectOption('#moduleType', 'external');
      await h.settle(page, 800);
      await page.fill('#createModule input[name=searchComponents]', 'NGINX');
      await page.fill('#createModule input[name=searchVersions]', '1.26.0');
      await page.evaluate(() => window.$('#moduleArchitectureType').val('IS').trigger('change'));
      await page.check('#moduleOpenSource');
    },
    target: dialog('#createModule .modal-content'),
  },
  {
    id: 'recipes/10-add-infrastructure-module-2',
    doc: 'recipes/10-add-infrastructure-module.md',
    alt: 'The Payment Service project in the grid view: the new module NGINX labelled Infrastructure Service and Infrastructure Module next to the module payment-service.',
    url: (seed) => `/projects/${payment(seed)}`,
    prepare: async (page, seed, h) => h.click(page, '.change-presentation-grid', 1500),
    target: gridCards,
  },
  {
    id: '00-getting-started/05-mental-model-3',
    doc: '00-getting-started/05-mental-model.md',
    alt: 'The Payment Service project in the grid view: the infrastructure module NGINX, created from the catalog entry NGINX 1.26.0 and labelled Infrastructure Service and Infrastructure Module, next to the module payment-service.',
    url: (seed) => `/projects/${payment(seed)}`,
    prepare: async (page, seed, h) => h.click(page, '.change-presentation-grid', 1500),
    target: gridCards,
  },
];
