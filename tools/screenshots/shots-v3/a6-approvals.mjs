// v3 (SaaS) reports hub, vulnerability report and approvals. Taken on DEV (TrainCo Ltd.) as
// Max Mustermann. "Example dry run" is a dry run of mAIfit (4 modules) created for these shots,
// with one example binary link. DEV has no approved release, so the release shots (releases
// list, New vulnerabilities tab, release key of an approval) and the reject dialog (needs an
// open, non-draft request) are not taken.
const MAIFIT = '7gh7aPoBvJW4rjdYE';
const EXAMPLE_DRY_RUN = 'QTQTMev8bboJZcyWc';
const DIR = '03-internal';
const APP = `${DIR}/06-approvals`;

const HIDE_CSS = '.chat-mascot { display: none !important; }';

const hide = (page) => page.addStyleTag({ content: HIDE_CSS });

// Selects a value of a select2 field through the app's jQuery.
const select2 = (page, selector, value) => page.evaluate(([s, v]) => {
  const $ = window.jQuery || (window.Package && window.Package.jquery && window.Package.jquery.$);
  $(s).val(v).trigger('change');
}, [selector, value]);

// Bounding box from the top of one element to the bottom of another, grown by pad.
const spanClip = (fromSel, toSel, pad = 12) => async (page) => page.evaluate(([f, t, pad]) => {
  const a = document.querySelector(f).getBoundingClientRect();
  const b = document.querySelector(t).getBoundingClientRect();
  const x = Math.max(0, Math.min(a.left, b.left) - pad);
  const y = Math.max(0, a.top - pad);
  const right = Math.min(window.innerWidth, Math.max(a.right, b.right) + pad);
  const bottom = Math.min(window.innerHeight, b.bottom + pad);
  return { clip: { x, y, width: right - x, height: bottom - y } };
}, [fromSel, toSel, pad]);

export default [
  {
    id: `${DIR}/04-reports-1`,
    doc: `${DIR}/04-reports.md`,
    url: '/reports',
    prepare: async (page) => { await hide(page); },
    target: 'viewport',
    alt: 'The Analyse Reports hub with report tiles such as Licenses overview, Vulnerability report, Viability report, OpenSSF Scorecard report, Versioning report, End-of-life report, Algorithm report and All bad crypto.',
  },
  {
    id: `${DIR}/04a-vulnerability-report-1`,
    doc: `${DIR}/04a-vulnerability-report.md`,
    url: '/reports/vulnerability',
    prepare: async (page, seed, h) => {
      await hide(page);
      await select2(page, 'select.current-project', MAIFIT);
      await h.settle(page, 5000);
      await page.waitForSelector('canvas', { timeout: 30000 });
      await page.waitForTimeout(1500);
    },
    target: async (page) => page.evaluate(() => {
      const chart = [...document.querySelectorAll('h1,h2,h3,h4,h5,div,span')].find((e) => e.children.length === 0 && /Risk overview: CVSS vs EPSS/.test(e.textContent));
      const toolbar = [...document.querySelectorAll('button, a')].find((e) => /Show included modules/.test(e.textContent));
      const a = chart.getBoundingClientRect();
      const b = toolbar.getBoundingClientRect();
      const x = 211;
      const y = a.top - 10;
      return { clip: { x, y, width: 1384 - x, height: b.bottom + 12 - y } };
    }),
    alt: 'The Risk overview CVSS vs EPSS scatter chart of the mAIfit project, with the hint on EPSS scores, the counters 1794 components, 16 modules, 0/5 resolved vulnerabilities and 4 vulnerable components, and the One by one, by CVE ID, High only and Treatments controls.',
  },
  {
    id: `${APP}/index-1`,
    doc: `${APP}/index.md`,
    url: '/approves',
    prepare: async (page, seed, h) => {
      await hide(page);
      await page.selectOption('select.view_type', '');
      await h.settle(page, 1500);
    },
    target: spanClip('.approves-header', '.reactive-table'),
    alt: 'The Your approvals list showing All requests, with the Create button and the four status buttons in the header and two dry runs in the table, one assigned to Max Mustermann and one with the assign to me link.',
  },
  {
    id: `${APP}/01-request-approval-1`,
    doc: `${APP}/01-request-approval.md`,
    url: '/approves',
    prepare: async (page, seed, h) => {
      await hide(page);
      await page.locator('[data-target="#createApproveModal"]').first().click();
      // The Project list offers only projects without assigned users or where the user is
      // the default project manager; on DEV that is none for Max, so it stays empty.
      await h.settle(page, 1200);
    },
    target: '#createApproveModal .modal-content',
    alt: 'The Create approval request dialog with the Project field and the Close, Dry-run and Create approval request buttons.',
  },
  {
    id: `${APP}/02-approval-detail-tabs-1`,
    doc: `${APP}/02-approval-detail-tabs.md`,
    url: `/approves/${EXAMPLE_DRY_RUN}/vulnerabilities`,
    prepare: async (page, seed, h) => {
      await hide(page);
      await h.settle(page, 2500);
    },
    target: 'viewport',
    alt: 'The approval Example dry run with Manage binary links, Create approval request and Remove DRAFT in the header, the Vulnerabilities tab active, the counters 4 unique vulnerabilities, 0 resolved vulnerabilities and 4 vulnerable components, and the vulnerable components with their appearances and advisories.',
  },
  {
    id: `${APP}/04-binary-linking-1`,
    doc: `${APP}/04-binary-linking.md`,
    url: `/approves/${EXAMPLE_DRY_RUN}/overview`,
    prepare: async (page, seed, h) => {
      await hide(page);
      await page.getByText('Manage binary links').first().click();
      await h.settle(page, 1500);
    },
    target: '#binaryLinks .modal-content',
    alt: 'The Binary links dialog with the Link and Comment fields, the Add link button and one link with its creation date, comment, creator Max Mustermann and a Remove button.',
  },
];
