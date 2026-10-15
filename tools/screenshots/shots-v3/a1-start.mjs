// v3 shots of agent a1-start: getting started, personal, roles and permissions, capabilities.
// DEV company TrainCo Ltd., user Max Mustermann (all public roles except legal manager).
const GS = '00-getting-started';
const RP = '10-roles-permissions';
const CAP = '13-capabilities';

const MAIFIT = '7gh7aPoBvJW4rjdYE';
const AUTH_SERVICE = 'AowET9wDPWZyonktu';
const TM_RUN = 'e6jAB4YarTumfx8Dt';

// The chat mascot overlaps the page header; the welcome tour (intro.js) starts by itself.
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
  await page.waitForFunction((ts) => ts.every((t) => document.body.innerText.includes(t)), texts, { timeout: 45000 });
  await page.waitForTimeout(800);
}

// The .hpanel whose heading starts with the text.
const panelSel = (heading) => async (page, seed, h) => {
  const box = await page.evaluate((t) => {
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
  return box;
};

async function scrollToText(page, text) {
  await page.getByText(text, { exact: true }).first().evaluate((e) => e.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(800);
}

// Sidebar crop from the top of the menu to just below the last expanded group.
const sidebarWith = (group) => async (page) => {
  const box = await page.evaluate((g) => {
    const menu = document.querySelector('#side-menu').getBoundingClientRect();
    const sub = document.querySelector(g).getBoundingClientRect();
    return { x: 0, y: menu.top - 6, width: menu.width, height: Math.min(window.innerHeight, sub.bottom + 7) - menu.top + 6 };
  }, group);
  return { clip: box };
};

const submenu = (n, label, menuId) => ({
  id: `${GS}/04-quick-tour-${n}`,
  alt: `The left sidebar with the ${label} group expanded.`,
  doc: `${GS}/04-quick-tour.md`,
  url: '/projects',
  prepare: async (page, seed, h) => { await clean(page); await h.openMenu(page, `#${menuId}`); },
  target: sidebarWith(`#${menuId}`),
});

const rightBar = [
  { selector: '#right-bar li.intro-chat', position: 'left' },
  { selector: '#right-bar li.intro-support', position: 'left' },
  { selector: '#right-bar li.intro-documentation', position: 'left' },
  { selector: '#right-bar li.intro-updates', position: 'left' },
  { selector: '#right-bar li.intro-messages', position: 'left' },
  { selector: '#right-bar a[href^="mailto:"]', position: 'left' },
  { selector: '#right-bar a[href*="status."]', position: 'left' },
  { selector: '#right-bar li.intro-signout', position: 'left' },
];

// Products tree expanded; optionally the Classification tab of the selected product.
const products = (classification) => async (page, seed, h) => {
  await clean(page);
  await waitText(page, 'Tree of Products', 'Example Home Appliances');
  await h.click(page, '.expand-all', 1500);
  await waitText(page, 'Example Fridge FR-100 v2');
  if (classification) {
    await page.locator('a').filter({ hasText: /^\s*Classification\s*$/ }).filter({ visible: true }).first().click();
    await waitText(page, 'Classified as');
  }
};

export default [
  {
    id: `${GS}/02-account-types-1`,
    alt: 'The Account type panel of Account & Billing with the selector Free, Professional, Corporate, Enterprise and Medical, Enterprise selected, and the See pricing plan details button.',
    doc: `${GS}/02-account-types.md`,
    url: '/settings/company',
    prepare: async (page) => { await clean(page); await waitText(page, 'See pricing plan details'); },
    target: panelSel('Account type'),
  },
  {
    id: `${GS}/03-first-login-1`,
    alt: 'The Sign in page with the Username and Password fields, the Login button, the GitHub and LinkedIn buttons and the Your company name field under or use Corporate login.',
    doc: `${GS}/03-first-login.md`,
    user: null,
    url: '/',
    prepare: async (page) => { await page.waitForSelector('#account'); await page.waitForTimeout(1500); },
    target: { clip: { x: 428, y: 88, width: 584, height: 552 } },
  },
  {
    id: `${GS}/03-first-login-3`,
    alt: 'The main layout with four numbered areas: 1 the header, 2 the left sidebar, 3 the content area showing the Projects list, 4 the right bar.',
    doc: `${GS}/03-first-login.md`,
    url: '/projects',
    prepare: async (page) => { await clean(page); await waitText(page, 'boostME', 'mAIfit'); },
    annotate: [
      { selector: '#header', position: 'inside-top-right' },
      { selector: '#menu', position: 'inside-bottom-right' },
      { selector: '.content-area', position: 'inside-bottom-right' },
      { selector: '#right-bar', position: 'inside-bottom-left' },
    ],
    target: 'viewport',
  },
  {
    id: `${GS}/04-quick-tour-1`,
    alt: 'The dashboard with the Focussed projects and Incoming approval requests panels, and below them Current modules compliance, Our latest videos, Δ since last month and History for last 12 months.',
    doc: `${GS}/04-quick-tour.md`,
    url: '/dashboard',
    prepare: async (page) => {
      await clean(page);
      await waitText(page, 'Current modules compliance', 'UNIQUE COMPONENTS');
      await scrollToText(page, 'Focussed projects');
      await page.mouse.move(2, 898);
    },
    target: 'viewport',
  },
  submenu(2, 'Inbound (Scans)', 'menu_inbound'),
  submenu(3, 'Internal', 'menu_processing'),
  submenu(4, 'Outbound', 'menu_outbound'),
  submenu(5, 'Knowledge', 'menu_knowledge'),
  submenu(6, 'Administration', 'menu_administration'),
  {
    id: `${GS}/04-quick-tour-7`,
    alt: 'The Projects page with the right bar icons numbered from top to bottom: 1 AI Assistant, 2 Help, 3 API documentation, 4 Updates, 5 Messages, 6 Contact Account Admin, 7 Monitor system health, 8 Logout.',
    doc: `${GS}/04-quick-tour.md`,
    url: '/projects',
    prepare: async (page) => { await clean(page); await waitText(page, 'boostME'); },
    annotate: rightBar,
    target: 'viewport',
  },
  {
    id: `${GS}/05-mental-model-1`,
    alt: 'The mAIfit project page with the Risks, Deployments, Releases and Analytics tiles above its list of 16 modules with their state, components and legal and security bars.',
    doc: `${GS}/05-mental-model.md`,
    url: `/projects/${MAIFIT}`,
    prepare: async (page) => { await clean(page); await waitText(page, 'DEPLOYMENTS', 'auth-service', 'Last analysis'); },
    target: 'viewport',
  },
  {
    id: `${GS}/05-mental-model-2`,
    alt: 'The auth-service module page with the views List, Tree, Graph, Legal, DeepScans, Quality and OBOM, the Settings, Analyse, Reports and Stats buttons, the component list and the details of the selected component.',
    doc: `${GS}/05-mental-model.md`,
    url: `/projects/${MAIFIT}/modules/${AUTH_SERVICE}/dependencies`,
    prepare: async (page) => { await clean(page); await waitText(page, 'npm:auth-service', 'Apache-2.0'); },
    target: 'viewport',
  },
  {
    id: `${GS}/07-dashboard-1`,
    alt: 'The Company portfolio view: a treemap with one rectangle per project and module, coloured by status, and the view type selector set to Components - Summary.',
    doc: `${GS}/07-dashboard.md`,
    url: '/dashboard',
    prepare: async (page) => { await clean(page); await waitText(page, 'Company portfolio view'); await page.waitForTimeout(4000); },
    target: panelSel('Company portfolio view'),
  },
  {
    id: '08-personal/03-profile-1',
    alt: 'The Manage Profile page with the Enable Two-Factor Authentication and Change your Password buttons, the User panel with login e-mail, roles, name, correspondence e-mail, theme and language, and the Personal access keys and Connected applications panels.',
    doc: '08-personal/03-profile.md',
    url: '/settings',
    prepare: async (page) => { await clean(page); await waitText(page, 'Personal access keys', 'Company security manager'); },
    target: 'viewport',
  },
  {
    id: '08-personal/04-support-1',
    alt: 'The right bar with two outlined icons: 1 Help, the question mark, and 2 Contact Account Admin, the paper plane.',
    doc: '08-personal/04-support.md',
    url: '/projects',
    prepare: async (page) => { await clean(page); await waitText(page, 'boostME'); },
    annotate: [
      { selector: '#right-bar li.intro-support', position: 'left' },
      { selector: '#right-bar a[href^="mailto:"]', position: 'left' },
    ],
    target: { clip: { x: 1180, y: 60, width: 260, height: 840 } },
  },
  {
    id: `${RP}/01-roles-overview-1`,
    alt: 'User Management with the Roles field of each user: the assigned roles appear as tags, for example Developer, Manager and Account admin, and your own roles are greyed out.',
    doc: `${RP}/01-roles-overview.md`,
    url: '/settings/company/users',
    prepare: async (page) => { await clean(page); await waitText(page, 'Your companie users', 'Company security manager'); },
    target: { clip: { x: 221, y: 170, width: 1153, height: 300 } },
  },
  {
    id: `${RP}/03-permission-model-1`,
    alt: 'The General tab of the mAIfit project settings: Name, Application goals, Members and the lower fields are read-only, while Default project manager and Default compliance manager can be changed.',
    doc: `${RP}/03-permission-model.md`,
    url: `/projects/${MAIFIT}/settings`,
    prepare: async (page) => { await clean(page); await waitText(page, 'Application goals', 'Threat model layout'); },
    target: 'viewport',
  },
  {
    id: `${RP}/05-functions-by-role-1`,
    alt: 'The user list in User Management: each user has a Roles field with several roles, for example Developer, Compliance manager, Portfolio manager and Account admin.',
    doc: `${RP}/05-functions-by-role.md`,
    url: '/settings/company/users',
    prepare: async (page) => { await clean(page); await waitText(page, 'Your companie users', 'Company security manager'); },
    target: panelSel('Your companie users'),
  },
  {
    id: `${RP}/06-settings-permission-matrix-1`,
    alt: 'The project settings tabs General, Legal, Quality, Crypto management, CIA, End-of-life, Allow/Deny, Issue Integration and Webhooks and Channels, with the read-only Name field and the editable Default project manager field.',
    doc: `${RP}/06-settings-permission-matrix.md`,
    url: `/projects/${MAIFIT}/settings`,
    prepare: async (page) => { await clean(page); await waitText(page, 'Application goals', 'Threat model layout'); },
    target: { clip: { x: 211, y: 70, width: 1173, height: 420 } },
  },
  {
    id: `${RP}/06a-module-settings-matrix-1`,
    alt: 'The module settings of auth-service with the tabs General, Legal, Quality, Crypto management, AI / ML, Allow/Deny, Capabilities, End-of-life, CIA, Resolved obligations, OSSF, Viability and more, and the first General fields.',
    doc: `${RP}/06a-module-settings-matrix.md`,
    url: `/projects/${MAIFIT}/modules/${AUTH_SERVICE}/settings`,
    prepare: async (page) => { await clean(page); await waitText(page, 'Module Identifier', 'Resolved obligations'); },
    target: { clip: { x: 211, y: 70, width: 1173, height: 400 } },
  },
  {
    id: `${RP}/08-account-types-1`,
    alt: 'The Account type panel with the pricing plan details opened: cards for Free, Team, Corporate and Enterprise/Medical with their monthly price and limits for projects, modules, components and users.',
    doc: `${RP}/08-account-types.md`,
    url: '/settings/company',
    prepare: async (page, seed, h) => {
      await clean(page);
      await waitText(page, 'See pricing plan details');
      await h.clickText(page, 'See pricing plan details', { wait: 1500 });
      await scrollToText(page, 'Account type');
    },
    target: 'viewport',
  },
  {
    id: `${CAP}/02-risk-1`,
    alt: 'The Risk management overview with the Risk development chart for the last six months and the Risk inventory cards Risks, By state, By impact class and By origin.',
    doc: `${CAP}/02-risk.md`,
    url: '/risks/overview',
    prepare: async (page) => { await clean(page); await waitText(page, 'Risk inventory', 'risks in total'); await page.waitForTimeout(1500); },
    target: 'viewport',
  },
  {
    id: `${CAP}/06-csaf-trusted-provider-2`,
    alt: 'The CSAF feed keys page under Scanners & API with the Create CSAF feed key dialog open: Name, the TLP levels WHITE, GREEN, AMBER and RED, Products and Include drafts.',
    doc: `${CAP}/06-csaf-trusted-provider.md`,
    url: '/settings/company/api/csaf',
    prepare: async (page, seed, h) => {
      await clean(page);
      await waitText(page, 'CSAF feed keys');
      await h.clickText(page, 'Create key', { wait: 1500 });
      await page.waitForSelector('.modal.in, .modal.show');
    },
    target: 'viewport',
  },
  {
    id: `${CAP}/index-1`,
    alt: 'The left sidebar with the Internal group expanded, showing Products, Risks and Threat Models next to the core entries, and the Outbound group expanded, showing SOUP Lists, CSAF and CVD cases.',
    doc: `${CAP}/index.md`,
    url: '/projects',
    prepare: async (page, seed, h) => { await clean(page); await h.openMenu(page, '#menu_processing', '#menu_outbound'); },
    target: sidebarWith('#menu_outbound'),
  },
  {
    id: `${CAP}/07-threat-model-agent-1`,
    alt: 'The details of a boostME threat model run in OTM format: the Status, Lifecycle and Download buttons and the data flow diagram with trust zones, services and their open threat counts.',
    doc: `${CAP}/07-threat-model-agent.md`,
    url: `/threat-modelling/${TM_RUN}/details`,
    prepare: async (page) => { await clean(page); await waitText(page, 'trust zones', 'auth-service'); await page.waitForTimeout(2000); },
    target: 'viewport',
  },
  {
    id: `${CAP}/07-threat-model-agent-2`,
    alt: 'The Threat Modelling page with the Import and Generate buttons and the Generate threat model dialog open, with the Project selector and the Stage selector set to Run all.',
    doc: `${CAP}/07-threat-model-agent.md`,
    url: '/threat-modelling',
    prepare: async (page, seed, h) => {
      await clean(page);
      await waitText(page, 'tm-run-');
      await h.clickText(page, 'Generate', { wait: 1500 });
      await page.waitForSelector('.modal.in, .modal.show');
    },
    target: 'viewport',
  },
  {
    id: `${GS}/05-mental-model-4`,
    alt: 'The Products page with the product tree on the left and Example Fridge FR-100 selected, showing the tabs Information, Solutions, Classification, Photos and Documents, with more tabs behind the arrow.',
    doc: `${GS}/05-mental-model.md`,
    url: '/products?identifier=EX-FR-100',
    prepare: products(false),
    target: 'viewport',
  },
  {
    id: `${CAP}/03-product-1`,
    alt: 'The Products page with the expanded Tree of Products: the class Example Home Appliances with the families Example Fridges and Example Ovens and their variants and versions.',
    doc: `${CAP}/03-product.md`,
    url: '/products',
    prepare: products(false),
    target: 'viewport',
  },
  {
    id: `${CAP}/03-product-2`,
    alt: 'Example Fridge FR-100 open on the Classification tab: Classified as IMPORTANT Class 1, with sample areas for this class listed below.',
    doc: `${CAP}/03-product.md`,
    url: '/products?identifier=EX-FR-100',
    prepare: products(true),
    target: 'viewport',
  },
  {
    id: `${CAP}/04-medical-1`,
    alt: 'The MDR/IVDR Classification tab of the auth-service module settings with the MDR Classification options None, I, IIa, IIb and III, the IVDR Classification options None, A, B, C and D, both set to None, and the Update button.',
    doc: `${CAP}/04-medical.md`,
    url: `/projects/${MAIFIT}/modules/${AUTH_SERVICE}/settings`,
    prepare: async (page, seed, h) => {
      await clean(page);
      await waitText(page, 'Module Identifier');
      await h.click(page, 'a[href="#m-classification"]', 1500);
      await waitText(page, 'IVDR Classification');
    },
    target: { clip: { x: 211, y: 70, width: 1173, height: 452 } },
  },
  {
    id: `${CAP}/04-medical-2`,
    alt: 'The SOUP files page with the Create soup file button and the list of SOUP files with the columns Created, Frozen, Project/Module, Components, Version, Edited, By and Complete, showing one SOUP file for mAIfit 1.0.0 with 406 components, by Max Mustermann, 0% complete.',
    doc: `${CAP}/04-medical.md`,
    url: '/reports/soup',
    prepare: async (page) => { await clean(page); await waitText(page, '406', 'Max Mustermann'); },
    target: { clip: { x: 211, y: 70, width: 1173, height: 220 } },
  },
];
