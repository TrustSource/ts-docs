// v3 (SaaS) products, risks and threat models. Taken on DEV (TrainCo Ltd.) as Max Mustermann.
// The product tree (Example Home Appliances and below) was imported for these shots, and
// Example Fridge FR-100 got its classification, contacts, support contracts and misuse cases;
// Example Fridge FR-050 was retired. The risk "Example: session token readable from browser
// storage" (boostME) was created with a state change, a countermeasure and an overdue task.
// Threat models are the existing boostME runs (no agent run is started).
const P = '03-internal/03-products';
const R = '03-internal/05-risks';
const T = '03-internal/08-threat-models';

const BOOSTME = 'QcJprNstGvbQX7ccY';
const EXAMPLE_RISK = 'SwgrpHnahAx8ZaZFu';
// boostME run of Jun 17, 2026: 12 components in four trust zones, 56 threats.
const TM_MODEL = 'Qn5jctHgc5WQncNPx';

const HIDE_CSS = '.chat-mascot, .launcher_placeholder { display: none !important; }';
const hide = (page) => page.addStyleTag({ content: HIDE_CSS });

const jq = (page, sel, val) => page.evaluate(([s, v]) => window.jQuery(s).val(v).trigger('change'), [sel, val]);

// Bounding box of the union of the elements, grown by pad and kept inside the viewport.
const clipOf = (selectors, pad = 12) => async (page) => page.evaluate(([sels, pad]) => {
  const rs = sels.flatMap((s) => [...document.querySelectorAll(s)]).filter((e) => e.offsetParent !== null || e.tagName === 'svg')
    .map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.height);
  if (!rs.length) throw new Error('clipOf: nothing matches ' + sels.join(', '));
  const x = Math.max(0, Math.min(...rs.map((r) => r.left)) - pad);
  const y = Math.max(0, Math.min(...rs.map((r) => r.top)) - pad);
  const right = Math.min(window.innerWidth, Math.max(...rs.map((r) => r.right)) + pad);
  const bottom = Math.min(window.innerHeight, Math.max(...rs.map((r) => r.bottom)) + pad);
  return { clip: { x, y, width: right - x, height: bottom - y } };
}, [Array.isArray(selectors) ? selectors : [selectors], pad]);

// ---- Products ----

// Opens the product tree, expands it and selects a product; `tab` is the tab label to open.
const openProduct = (name, tab, { showAll = false } = {}) => async (page, seed, h) => {
  await hide(page);
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

const productTab = (id, tab, alt) => ({
  id: `${P}/${id}`,
  doc: `${P}/${id.replace(/-\d+$/, '')}.md`,
  url: '/products',
  prepare: openProduct('Example Fridge FR-100', tab),
  target: productPanel,
  alt,
});

// ---- Risks ----

// The Overview reads the risks when it is created; open it from the Risks tab.
const openOverview = async (page, seed, h) => {
  await hide(page);
  await h.click(page, '.approves-detail-tabs a[title="Risk management overview"]', 3000);
};

// ---- Threat models ----

const openGenerate = async (page, seed, h) => {
  await hide(page);
  await h.click(page, 'a[data-target="#createThreatModel"]', 1500);
  await jq(page, '#createThreatModel #projectSelector', BOOSTME);
  await h.settle(page, 800);
};

export default [
  {
    id: `${P}/index-1`,
    doc: `${P}/index.md`,
    alt: 'The Products page with the Tree of Products on the left, from the class Example Home Appliances down to its families, variants and a version, and Example Fridge FR-100 selected on the right with its Information tab.',
    url: '/products',
    prepare: openProduct('Example Fridge FR-100'),
    target: 'viewport',
  },
  {
    id: `${P}/01-create-import-1`,
    doc: `${P}/01-create-import.md`,
    alt: 'The Products page with the expanded Tree of Products, Example Fridge FR-100 selected, and the Stats menu open showing 6 products, 1 root entries and 1 retired entries.',
    url: '/products',
    prepare: async (page, seed, h) => {
      await openProduct('Example Fridge FR-100')(page, seed, h);
      await h.click(page, '.products-header-actions a:has-text("Stats")', 600);
    },
    target: { clip: { x: 211, y: 62, width: 1181, height: 380 } },
    keepFocus: true,
  },
  {
    id: `${P}/02-tab-information-1`,
    doc: `${P}/02-tab-information.md`,
    alt: 'The retired product Example Fridge FR-050, shown after Show all. Its Information tab shows the shortened reason, the user Max Mustermann and the date in a red box next to the Revert button.',
    url: '/products',
    prepare: openProduct('Example Fridge FR-050', null, { showAll: true }),
    target: { clip: { x: 211, y: 62, width: 1181, height: 670 } },
  },
  productTab('04-tab-classification-cra-1', 'Classification',
    'The Classification tab of Example Fridge FR-100 with IMPORTANT Class 1 saved under Classified as and the sample areas for this class listed below the form.'),
  productTab('07-tab-contacts-1', 'Contacts',
    'The Contacts tab of Example Fridge FR-100 with registered trade name, manufacturer name, address and website, the product security contact psirt@example.com and the weblink filled in.'),
  productTab('08-tab-support-1', 'Support',
    'The Support tab of Example Fridge FR-100 with the Add contract and Generate EoL info buttons and two contracts, Example hardware warranty ending Jun 30, 2028 and Example security updates ending Dec 31, 2031.'),
  productTab('09-tab-misuse-1', 'Misuse',
    'The Misuse tab of Example Fridge FR-100 with the Add potential misuse case button and two cases, Default admin password left unchanged and Device used as a relay in a botnet.'),
  {
    id: `${R}/index-1`,
    doc: `${R}/index.md`,
    alt: 'The Risk management page with the Overview, Risks and Tasks tabs and the report target set to All modules of boostME, showing the risk tiles, the Add risk and treatment group buttons and the top of the risk list.',
    url: `/risks?projectId=${BOOSTME}`,
    prepare: hide,
    target: 'viewport',
  },
  {
    id: `${R}/01-overview-1`,
    doc: `${R}/01-overview.md`,
    alt: 'The Risk development chart of the Overview tab with the Last 3 months, Last 6 months and Last 12 months buttons and the By month and By week buttons, showing the risks opened per month and the open stock at the end of each month, and below it the Risk inventory cards Risks, By state, By impact class and By origin.',
    url: `/risks?projectId=${BOOSTME}`,
    prepare: openOverview,
    target: clipOf('.risk-overview-trends'),
  },
  {
    id: `${R}/02-risks-list-1`,
    doc: `${R}/02-risks-list.md`,
    alt: 'The Risks tab for All modules of boostME, with the project selector at the upper right, the tiles total, added last 7 days, untreated, in treatment, done, overdue tasks and exceptions ending in 30 days, and the risk table below.',
    url: `/risks?projectId=${BOOSTME}`,
    prepare: hide,
    target: 'viewport',
  },
  {
    id: `${R}/03-risks-tasks-1`,
    doc: `${R}/03-risks-tasks.md`,
    alt: 'The Tasks tab for All module of boostME with the tiles total, upcoming, overdue, opened, resolved and exceptions ending in 30 days, the Backlog, In progress and Completed buttons, All tasks selected, and one task due Oct 1, 2026 marked as overdue.',
    url: `/risks/tasks?projectId=${BOOSTME}`,
    prepare: async (page, seed, h) => {
      await hide(page);
      await page.locator('select.view_type').selectOption({ label: 'All tasks' });
      await h.settle(page, 1500);
    },
    target: 'viewport',
  },
  {
    id: `${R}/04-portfolio-views-1`,
    doc: `${R}/04-portfolio-views.md`,
    viewport: { width: 1440, height: 1300 },
    alt: 'The Portfolio overview treemap with the view type Risks - Treatment: the project boostME with one red rectangle per module and one for the project risks, all with at least one untreated risk, and the colour legend below the chart.',
    url: `/risks?projectId=${BOOSTME}`,
    prepare: async (page, seed, h) => {
      await openOverview(page, seed, h);
      await page.evaluate(() => {
        const h3 = [...document.querySelectorAll('.content h3')].find((e) => e.textContent.trim() === 'Portfolio overview');
        h3.scrollIntoView({ block: 'center' });
      });
      await h.settle(page, 1200);
    },
    target: async (page) => {
      const clip = await page.evaluate(() => {
        const h3 = [...document.querySelectorAll('.content h3')].find((e) => e.textContent.trim() === 'Portfolio overview');
        const a = h3.getBoundingClientRect();
        const legend = document.querySelector('.risk-portfolio-legend') || document.querySelector('.portfolio-chart');
        const b = legend.getBoundingClientRect();
        if (a.top < 130) throw new Error('portfolio heading hidden behind header: ' + a.top);
        const panel = h3.closest('.col-md-12').getBoundingClientRect();
        return { x: panel.left - 12, y: a.top - 12, width: panel.width + 24, height: Math.min(window.innerHeight, b.bottom + 12) - (a.top - 12) };
      });
      return { clip };
    },
  },
  {
    // Customise is switched on for the impact classes only to show the table; nothing is saved.
    id: `${R}/07-risk-assessment-scheme-1`,
    doc: `${R}/07-risk-assessment-scheme.md`,
    alt: 'The company Risk assessment page with Customise switched on for the impact classes, showing the table of values, labels and ranks from low to existential with Add entry, the value scale and ARO entries, and the three threshold selectors set to Default (off).',
    url: '/settings/company/risk_assessment',
    viewport: { width: 1440, height: 1300 },
    prepare: async (page, seed, h) => {
      await hide(page);
      await page.locator('.risk-scheme-override').first().check({ force: true });
      await h.settle(page, 1000);
    },
    target: async (page) => {
      const clip = await page.evaluate(() => {
        const head = document.querySelector('.content').getBoundingClientRect();
        const save = [...document.querySelectorAll('.content button')].find((b) => /Save scheme/.test(b.textContent)).getBoundingClientRect();
        return { x: head.left, y: head.top, width: head.width, height: save.bottom + 16 - head.top };
      });
      return { clip };
    },
  },
  {
    id: `${R}/09-risk-history-1`,
    doc: `${R}/09-risk-history.md`,
    alt: 'The History tab of the risk Example: session token readable from browser storage, newest first: an update by Max Mustermann via UI that added a countermeasure, an update changing the state from assessed to approved and the treatment strategy from none to mitigate, an update from identified to assessed, and the start of the Created entry.',
    url: `/risks?projectId=${BOOSTME}&riskId=${EXAMPLE_RISK}`,
    prepare: async (page, seed, h) => {
      await hide(page);
      await h.click(page, '#risk-edit-tab-history', 2000);
    },
    target: 'viewport',
  },
  {
    id: `${T}/index-1`,
    doc: `${T}/index.md`,
    alt: 'The Threat Modelling list with the Import and Generate buttons and the columns Created, Project, Run, Format, Threats and Status, listing several boostME and mAIfit models, each with a Remove button.',
    url: '/threat-modelling',
    prepare: hide,
    target: 'viewport',
  },
  {
    id: `${T}/01-create-threat-model-1`,
    doc: `${T}/01-create-threat-model.md`,
    alt: 'The Generate threat model dialog with boostME selected as Project, the Stage selector set to Run all with its explanation, and the Close and Generate buttons.',
    url: '/threat-modelling',
    prepare: openGenerate,
    target: '#createThreatModel .modal-content',
  },
  {
    id: `${T}/02-threat-detail-stride-linddun-1`,
    doc: `${T}/02-threat-detail-stride-linddun.md`,
    alt: 'The Data Flow Diagram of a boostME threat model with the component auth-service selected: the rest of the diagram is faded, the two connected flows are labelled, and the side panel shows its type, trust zone, connections and the first of its 30 threats.',
    url: `/threat-modelling/${TM_MODEL}/details`,
    prepare: async (page, seed, h) => {
      await hide(page);
      await h.settle(page, 2000);
      await page.locator('svg text', { hasText: 'auth-service' }).first().click();
      await h.settle(page, 1500);
    },
    target: 'viewport',
  },
  {
    id: `${T}/03-mitigations-status-1`,
    doc: `${T}/03-mitigations-status.md`,
    alt: 'A threat card in the side panel: the threat title and description, STRIDE Denial of Service, the ENISA category Nefarious activity / Abuse, the CWEs CWE-770 and CWE-799, the state exposed, the risk rating, and three countermeasure rows with their status icon.',
    url: `/threat-modelling/${TM_MODEL}/details`,
    viewport: { width: 1440, height: 1300 },
    prepare: async (page, seed, h) => {
      await hide(page);
      await h.settle(page, 2000);
      await page.locator('svg text', { hasText: 'auth-service' }).first().click();
      await h.settle(page, 1500);
      await page.evaluate(() => document.querySelector('.tm-side-panel .tm-threat-card').scrollIntoView({ block: 'start' }));
      await h.settle(page, 500);
    },
    target: '.tm-side-panel .tm-threat-card',
    padding: 8,
  },
  {
    id: `${T}/04-run-modes-1`,
    doc: `${T}/04-run-modes.md`,
    alt: 'The Stage field of the Generate threat model dialog with Run all selected and the explanation of what the run does.',
    url: '/threat-modelling',
    prepare: openGenerate,
    target: clipOf(['#createThreatModel label[for="tmStepSelector"]', '#createThreatModel #tmStepSelector', '#createThreatModel #tmStepSelectorHelp']),
  },
  {
    id: `${T}/04-run-modes-2`,
    doc: `${T}/04-run-modes.md`,
    alt: 'The Lifecycle menu of a threat model with the three stages Build model, Generate risks and Develop countermeasures, each with a check mark, its count and a Re-run button.',
    url: `/threat-modelling/${TM_MODEL}/details`,
    prepare: async (page, seed, h) => {
      await hide(page);
      await h.settle(page, 2000);
      await h.click(page, '.tm-lifecycle-toggle', 1000);
    },
    target: clipOf(['.tm-lifecycle-toggle', '.tm-lifecycle-menu']),
    keepFocus: true,
  },
];
