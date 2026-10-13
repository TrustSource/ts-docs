// Products (tree, tabs, dialogs), the risk register (overview, list, tasks, threat model)
// and the CRA classification recipe.
const P = '03-internal/03-products';
const R = '03-internal/05-risks';
const RECIPE = 'recipes/06-cra-classification';

// Opens the product tree and selects a product; `tab` is the tab label to open.
const openProduct = (name, tab, { showAll = false } = {}) => async (page, seed, h) => {
  await h.settle(page, 800);
  if (showAll) await h.click(page, '.show-all', 1000);
  await h.click(page, '.expand-all');
  await h.click(page, `.product-tree .open_details:text-is("${name}")`, 1500);
  if (tab) await h.click(page, `#product-tabs a:has-text("${tab}")`, 1500);
};

// The product edit panel on the right, cut below the content of the open tab.
const productPanel = async (page) => {
  const clip = await page.evaluate(() => {
    const panel = document.querySelector('.product-edit-panel').getBoundingClientRect();
    let bottom = 0;
    for (const el of document.querySelectorAll('.product-edit-panel .scrollable_middle_right *')) {
      if (el.closest('.modal')) continue;
      const r = el.getBoundingClientRect();
      if (r.width && r.height && getComputedStyle(el).visibility !== 'hidden') bottom = Math.max(bottom, r.bottom);
    }
    const pad = 12;
    return { x: panel.left - pad, y: panel.top - pad, width: panel.width + 2 * pad, height: Math.min(panel.bottom, bottom + 24) - panel.top + 2 * pad };
  });
  return { clip };
};

const productTab = (id, tab, alt, extra = {}) => ({
  id: `${P}/${id}`,
  doc: `${P}/${id.replace(/-\d+$/, '')}.md`,
  url: '/products',
  prepare: openProduct('Home Hub X1', tab),
  target: productPanel,
  alt,
  ...extra,
});

// The Overview tab reads the risks when it is created; opened directly as the first page
// it can run before the login is resumed and shows "No risks tracked yet". Open it from the list.
const openOverview = async (page, seed, h) => {
  await h.click(page, '.approves-detail-tabs a[title="Risk management overview"]', 2500);
};

// A clip of the Risk management panel from one h3 heading to just above another.
const panelBetween = (fromText, toText) => async (page) => {
  const clip = await page.evaluate(([fromText, toText]) => {
    const hs = [...document.querySelectorAll('.content h3, .content .h3')];
    const a = hs.find((h) => h.textContent.trim().startsWith(fromText)).getBoundingClientRect();
    const b = hs.find((h) => h.textContent.trim().startsWith(toText)).getBoundingClientRect();
    const panel = document.querySelector('.content .ts-panel').getBoundingClientRect();
    return { x: panel.left - 12, y: a.top - 16, width: panel.width + 24, height: b.top - 12 - (a.top - 16) };
  }, [fromText, toText]);
  return { clip };
};

const risksUrl = (route) => (seed) => `${route}?projectId=${seed.projects.Webshop}`;

export default [
  {
    id: `${P}/index-1`,
    doc: `${P}/index.md`,
    alt: 'The Products page with the Tree of Products on the left and Home Hub X1 selected on the right, showing its Information tab and the tabs Solutions, Classification, Photos, Documents, Contacts, Support and Misuse.',
    url: '/products',
    prepare: openProduct('Home Hub X1'),
    target: 'viewport',
  },
  {
    id: `${P}/01-create-import-1`,
    doc: `${P}/01-create-import.md`,
    alt: 'The Products page with the expanded Tree of Products, Home Hub X1 selected, and the Stats menu open showing 4 products, 1 root entries and 1 retired entries.',
    url: '/products',
    prepare: async (page, seed, h) => {
      await openProduct('Home Hub X1')(page, seed, h);
      await h.click(page, '.products-header-actions a:has-text("Stats")', 600);
    },
    target: { clip: { x: 211, y: 62, width: 1181, height: 300 } },
    keepFocus: true,
  },
  {
    id: `${P}/02-tab-information-1`,
    doc: `${P}/02-tab-information.md`,
    alt: 'The retired product Indoor Camera C1, shown struck through in the tree after Show all. Its Information tab shows the shortened reason Replaced by Indoor Cam..., the user and the date in a red box next to the Revert button.',
    url: '/products',
    prepare: openProduct('Indoor Camera C1', null, { showAll: true }),
    target: { clip: { x: 211, y: 62, width: 1181, height: 670 } },
  },
  productTab('03-tab-solutions-1', 'Solutions',
    'The Solutions tab of Home Hub X1 with the Add solution and Generate SBOM buttons and two linked releases, Payment Service 3.1.0 and Webshop Frontend 2.4.0, in the columns Solution, Version and Capabilities.'),
  productTab('04-tab-classification-cra-1', 'Classification',
    'The Classification tab of Home Hub X1 with IMPORTANT Class 1 selected and the sample areas for this class listed below.'),
  productTab('05-tab-photos-1', 'Photos',
    'The Photos tab of Home Hub X1 with the Upload additional pictures or illustrations and Remove picture buttons and a gallery of three product pictures.'),
  productTab('06-tab-documents-1', 'Documents',
    'The Documents tab of Home Hub X1 with User Manual, Secure Setup and SBOM file uploaded, the Add new document button and the Download all and incl. Photos buttons.'),
  productTab('07-tab-contacts-1', 'Contacts',
    'The Contacts tab of Home Hub X1 with registered trade name, manufacturer name, address and website, and the product security contact and weblink filled in.'),
  productTab('08-tab-support-1', 'Support',
    'The Support tab of Home Hub X1 with the Add contract and Generate EoL info buttons and two contracts, Hardware warranty ending Jun 30, 2028 and Security updates ending Dec 31, 2031.'),
  productTab('09-tab-misuse-1', 'Misuse',
    'The Misuse tab of Home Hub X1 with the Add potential misuse case button and two cases, Using default credentials and Exposing the hub to the internet.'),
  {
    id: `${P}/10-link-with-release-1`,
    doc: `${P}/10-link-with-release.md`,
    alt: 'The Add solution dialog listing the approved releases Payment Service 3.1.0 and Webshop Frontend 2.4.0 with approval date, version and contact, each with an Add button.',
    url: '/products',
    prepare: async (page, seed, h) => {
      await openProduct('Home Hub X1', 'Solutions')(page, seed, h);
      await h.click(page, 'a[data-target="#productLinkWithReleaseModal"]', 1500);
    },
    target: '#productLinkWithReleaseModal .modal-content',
    padding: 16,
  },
  {
    id: `${RECIPE}-1`,
    doc: `${RECIPE}.md`,
    alt: 'The Add product dialog on the Products page, filled in with Parent Smart Home, Identifier SH-THERM, Type Variant, Name Thermostat T3 and a purpose, with the Draft option and the Close and Add buttons.',
    url: '/products',
    prepare: async (page, seed, h) => {
      await h.settle(page, 800);
      await h.click(page, 'a[data-target="#productAddModal"]', 1200);
      await page.locator('#productAddModal #parentId').selectOption({ label: 'Smart Home [family]' }).catch(() => {});
      await page.evaluate(() => window.jQuery && window.jQuery('#productAddModal #parentId').trigger('change'));
      await h.fill(page, '#productAddModal #identifier', 'SH-THERM');
      await page.locator('#productAddModal #type').selectOption('variant');
      await h.fill(page, '#productAddModal #name', 'Thermostat T3');
      await h.fill(page, '#productAddModal #description', 'Smart radiator thermostat controlled by the Home Hub.');
    },
    target: 'viewport',
  },
  {
    id: `${RECIPE}-2`,
    doc: `${RECIPE}.md`,
    url: '/products',
    prepare: openProduct('Home Hub X1', 'Classification'),
    target: productPanel,
    alt: 'The Classification tab of Home Hub X1 with IMPORTANT Class 1 selected under Classified as and the sample areas for this class listed below.',
  },
  {
    id: `${R}/index-1`,
    doc: `${R}/index.md`,
    alt: 'The Risk management page with the Overview, Risks and Tasks tabs and the report target set to All module of Webshop, showing the risk tiles and the risk list.',
    url: risksUrl('/risks'),
    target: 'viewport',
  },
  {
    id: `${R}/01-overview-1`,
    doc: `${R}/01-overview.md`,
    alt: 'The Overview tab of Risk management with the Portfolio overview treemap of projects and modules, and below it the New risks (added in last 14 days) tiles and list.',
    url: risksUrl('/risks'),
    viewport: { width: 1440, height: 1500 },
    prepare: openOverview,
    target: async (page) => {
      const clip = await page.evaluate(() => {
        // From the page banner to the third row of the New risks table.
        const title = [...document.querySelectorAll('h2')].find((h) => h.textContent.trim() === 'Risk management overview').getBoundingClientRect();
        const rows = document.querySelectorAll('.content .ts-panel table tbody tr');
        const end = rows[Math.min(2, rows.length - 1)].getBoundingClientRect();
        const panel = document.querySelector('.content .ts-panel').getBoundingClientRect();
        const y = title.top - 20;
        return { x: panel.left - 12, y, width: panel.width + 24, height: end.bottom + 12 - y };
      });
      return { clip };
    },
  },
  {
    id: `${R}/02-risks-list-1`,
    doc: `${R}/02-risks-list.md`,
    alt: 'The Risks tab for All module of Webshop, with the report target selector at the upper right, the total, added last 7 days, in progress and resolved tiles, and the risk table with four Webshop risks.',
    url: risksUrl('/risks'),
    target: 'viewport',
  },
  {
    id: `${R}/03-risks-tasks-1`,
    doc: `${R}/03-risks-tasks.md`,
    alt: 'The Tasks tab for All module of Webshop with the total, upcoming, opened and resolved tiles, the Backlog, In progress and Completed buttons, All tasks selected and the task list with due dates, status and responsible people.',
    url: risksUrl('/risks/tasks'),
    prepare: async (page, seed, h) => {
      await page.locator('select.view_type').selectOption({ label: 'All tasks' });
      await h.settle(page, 1200);
    },
    target: 'viewport',
  },
  {
    id: `${R}/04-portfolio-views-1`,
    doc: `${R}/04-portfolio-views.md`,
    alt: 'The Portfolio overview treemap with Risks - State selected: the projects Webshop, Mobile App and Payment Service, each with its project risks and, for Webshop, the webshop-frontend module.',
    url: risksUrl('/risks'),
    prepare: openOverview,
    target: panelBetween('Portfolio overview', 'New risks'),
  },
  {
    id: `${R}/10-threat-model-fields-1`,
    doc: `${R}/10-threat-model-fields.md`,
    alt: 'The Threat model tab of the risk Customer data exposed through SQL injection, with the STRIDE categories Information Disclosure and Tampering, the CWEs CWE-89 and CWE-20, the affected element type process and Trust boundary crossing ticked.',
    url: (seed) => `/risks?projectId=${seed.projects.Webshop}&riskId=${seed.risks['Customer data exposed through SQL injection']}`,
    prepare: async (page, seed, h) => h.click(page, '#risk-edit-tab-threatmodel', 1200),
    target: 'viewport',
  },
];
