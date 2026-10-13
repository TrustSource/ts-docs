// Approvals (list, wizard, detail tabs, reject, binary links, release keys), releases,
// the reports hub with the vulnerability, licenses, CVE impact and components reports,
// and the recipes "first module to SBOM" and "react to a 0-day".
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { BASE_URL, HERE } from '../lib.mjs';

const A = '03-internal/06-approvals';
const I = '03-internal';
const R1 = 'recipes/01-first-module-to-sbom';
const R4 = 'recipes/04-react-to-0day';

// Many parallel captures resume their login at the same time and hit the login rate limit
// of CE (20 per minute and IP); the page then shows the sign-in form. Log in again (waiting
// out the limit) and reload the shot's page before preparing it.
async function ensureLogin(page, seed) {
  // The resumed login may fail a moment after the page loaded, so wait until either the
  // app menu or the sign-in form is there.
  await page.waitForFunction(() => {
    const vis = (s) => { const e = document.querySelector(s); return e && e.getBoundingClientRect().height > 0; };
    return vis('#username') || vis('#side-menu');
  }, null, { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1500);
  if (!(await page.locator('#username').isVisible().catch(() => false))) return;
  const url = page.url();
  const email = 'alex.morgan@example.com';
  const stored = JSON.parse(await fs.readFile(path.join(HERE, '.seed.json'), 'utf8'));
  for (let i = 0; i < 8; i++) {
    await page.fill('#username', email);
    await page.fill('#password', stored.team[email].password);
    await page.click('button[type=submit]');
    const ok = await page.waitForFunction(() => !document.querySelector('#username'), null, { timeout: 8000 }).then(() => true, () => false);
    if (ok) break;
    await page.waitForTimeout(15000);
  }
  await page.goto(url);
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(2500);
}

const loggedOut = (page) => page.locator('#username').isVisible().catch(() => false);
const prep = (fn) => async (page, seed, h) => {
  const url = page.url();
  for (let attempt = 0; ; attempt++) {
    await ensureLogin(page, seed);
    await h.settle(page, 800);
    try {
      if (fn) await fn(page, seed, h);
      await page.waitForTimeout(500);
      if (!(await loggedOut(page))) return;
      if (attempt >= 3) throw new Error('logged out while preparing');
    } catch (e) {
      if (attempt >= 3 || !(await loggedOut(page))) throw e;
    }
    await page.goto(url);
    await h.settle(page, 1500);
  }
};

// From the top of the page header down to the bottom of `bottomSel`, across the content area.
const headerTo = (bottomSel, pad = 12) => async (page) => {
  const clip = await page.evaluate(([sel, pad]) => {
    const head = document.querySelector('.ts-page-header');
    const content = document.querySelector('.content-area') || document.body;
    const els = [...document.querySelectorAll(sel)].filter((e) => e.getBoundingClientRect().height);
    const bottom = Math.max(...els.map((e) => e.getBoundingClientRect().bottom));
    const c = content.getBoundingClientRect();
    const top = Math.max(0, head.getBoundingClientRect().top - pad);
    return { x: Math.max(0, c.left), y: top, width: c.width, height: Math.min(window.innerHeight, bottom + pad) - top };
  }, [bottomSel, pad]);
  return { clip };
};

// A modal with a little of the page behind it.
const modal = (sel = '.modal.in .modal-content, .modal.show .modal-content', pad = 24) => async (page, seed) => {
  const clip = await page.evaluate(([sel, pad]) => {
    const r = [...document.querySelectorAll(sel)].find((e) => e.getBoundingClientRect().height).getBoundingClientRect();
    const x = Math.max(0, r.left - pad);
    const y = Math.max(0, r.top - pad);
    return { x, y, width: Math.min(window.innerWidth, r.right + pad) - x, height: Math.min(window.innerHeight, r.bottom + pad) - y };
  }, [sel, pad]);
  return { clip };
};

// Report target selector (select2 over a plain select).
const pickTarget = async (page, value, h) => {
  await page.evaluate((v) => window.jQuery('select.current-project').val(v).trigger('change'), value);
  await h.settle(page, 5000);
};

// Fills step 1 of the module approval wizard.
const fillWizard = async (page, h, { draft, name, version, purl, description }) => {
  const box = page.locator('input[name=approve_draft]');
  if ((await box.isChecked()) !== draft) await box.click();
  await page.fill('input[name=approve_name]', name);
  await page.fill('input[name=approve_version]', version);
  await page.fill('input[name=approve_purl]', purl);
  await page.fill('textarea[name=approve_description]', description);
  await h.settle(page, 500);
};

const checkCve = (cve) => prep(async (page, seed, h) => {
  await page.fill('input[name=currentCve]', cve);
  await page.click('button.check_for');
  await h.settle(page, 5000);
});

const dry = (seed) => seed.extra['40-approvals-reports'].dryRun;
const frontend240 = (seed) => seed.approvals['Webshop Frontend 2.4.0'].id;
const frontend250 = (seed) => seed.approvals['Webshop Frontend 2.5.0'].id;
const backend240 = (seed) => seed.approvals['Webshop Backend 2.4.0'].id;
const webshopModule = (seed, name) => `/projects/${seed.projects.Webshop}/modules/${seed.scans[name].moduleId}`;

export default [
  {
    id: `${A}/index-1`,
    doc: `${A}/index.md`,
    alt: 'The Your approvals list with All requests selected: a dry run of Webshop Backend 2.4.1 assigned to Alex Morgan with Remove DRAFT, the open requests Webshop Backend 2.4.0 and Webshop Frontend 2.5.0 with Approve and Reject and assign to me, and the results by Maria Garcia for Mobile App 1.8.2 (rejected), Payment Service 3.1.0 and Webshop Frontend 2.4.0 (approved). Create and the four status buttons are in the header.',
    url: '/approves',
    prepare: prep(async (page, seed, h) => {
      await page.selectOption('select.view_type', '');
      await h.settle(page, 1500);
    }),
    target: headerTo('.approves-list table'),
  },
  {
    id: `${A}/01-request-approval-1`,
    doc: `${A}/01-request-approval.md`,
    alt: 'The Create approval request dialog over the approvals list, with Webshop selected as Project and the buttons Close, Dry-run and Create approval request.',
    url: '/approves',
    prepare: prep(async (page, seed, h) => {
      await h.click(page, '.approves-header-actions button:has-text("Create"), .approves-header-actions a:has-text("Create")', 1500);
      await page.evaluate((id) => {
        const s = [...document.querySelectorAll('.modal.in select, .modal.show select')][0];
        window.jQuery(s).val(id).trigger('change');
      }, seed.projects.Webshop);
      await h.settle(page, 800);
    }),
    target: modal(),
  },
  {
    id: `${A}/01-request-approval-2`,
    doc: `${A}/01-request-approval.md`,
    alt: 'Step 1 Settings of the module wizard for mobile-app: Dry run ticked, Approve name or product name Mobile App, Semantic version 1.9.0, a Packageurl and an Approve description, with Return to module and Next below.',
    url: (seed) => `/projects/${seed.projects['Mobile App']}/modules/${seed.scans['mobile-app'].moduleId}/approve`,
    prepare: prep(async (page, seed, h) => fillWizard(page, h, {
      draft: true, name: 'Mobile App', version: '1.9.0', purl: 'pkg:npm/example-mobile-app@1.9.0',
      description: 'New request after the rejection of 1.8.2.',
    })),
    target: headerTo('#createApproveForm'),
  },
  {
    id: `${A}/01-request-approval-3`,
    doc: `${A}/01-request-approval.md`,
    alt: 'Step 4 Finalization of the module wizard for webshop-backend: Finalizing your approval request with 3 of 3 done, the rows Compliance Report, Notice and SBOM with full progress bars and their links, the dry run message under Great! You made it!, and the buttons Return to module and Jump to Compliance Report.',
    url: (seed) => `/projects/${dry(seed).projectId}/modules/${dry(seed).moduleId}/approve/${dry(seed).id}/finalize`,
    prepare: prep(async (page, seed, h) => h.settle(page, 2500)),
    target: headerTo('#createApproveForm'),
  },
  {
    id: `${A}/02-approval-detail-tabs-1`,
    doc: `${A}/02-approval-detail-tabs.md`,
    alt: 'The Overview tab of the dry run Webshop Backend: the header with the Packageurl and the description, the buttons Manage binary links, Create approval request and Remove DRAFT, the review tabs, and the Modules table with webshop-backend, its analysis of v2.4.0 and the legal, security and quality bars.',
    url: (seed) => `/approves/${dry(seed).id}/overview`,
    prepare: prep(async (page, seed, h) => h.settle(page, 3000)),
    target: headerTo('.reactive-table-navigation, .reactive-table-options, table'),
  },
  {
    id: `${A}/02-approval-detail-tabs-2`,
    doc: `${A}/02-approval-detail-tabs.md`,
    alt: 'The Licenses tab of the open request Webshop Backend 2.4.0 with Approve and Reject in the header: the license distribution chart with Apache License 2.0, GPL-2.0 only, LGPL-2.1 only, MIT and Unknown, the counters 5 licenses and 17 unique obligations, the legal requirements, the counters License Ok, With obligations/warnings and Causing violations, and the Causing obligations group.',
    url: (seed) => `/approves/${backend240(seed)}/licenses`,
    prepare: prep(async (page, seed, h) => h.settle(page, 4000)),
    target: headerTo('.content-area .panel, .content-area .ts-panel, .content-area h3, .content-area h4'),
  },
  {
    id: `${A}/03-approve-reject-workflow-1`,
    doc: `${A}/03-approve-reject-workflow.md`,
    alt: 'The reject dialog for the approval Webshop Frontend with a reason typed into the text field and the buttons Cancel and Yes, reject it!',
    url: (seed) => `/approves/${frontend250(seed)}/overview`,
    prepare: prep(async (page, seed, h) => {
      await h.click(page, '.approves-header button:has-text("Reject"), button.reject:has-text("Reject")', 1500);
      await page.fill('#confirmationText', 'marked 0.3.6 still has open vulnerabilities. Upgrade marked and request the approval again.');
      await h.settle(page, 500);
    }),
    target: modal('.sweet-alert', 24),
  },
  {
    id: `${A}/04-binary-linking-1`,
    doc: `${A}/04-binary-linking.md`,
    alt: 'The Binary links dialog of the webshop-frontend 2.5.0 scan: the Link and Comment fields with Add link, and a table with two links from the Release pipeline, an npm package and a container image, each with Remove.',
    url: (seed) => `/scans/${seed.scans['webshop-frontend@2.5.0'].scanId}`,
    prepare: prep(async (page, seed, h) => h.click(page, 'button:has-text("Binary links"), a:has-text("Binary links")', 1500)),
    target: modal(),
  },
  {
    id: `${A}/05-public-approves-1`,
    doc: `${A}/05-public-approves.md`,
    alt: 'The Published keys dialog of the release Webshop Frontend 2.4.0 with two published keys: one used once, with the copy button and Unpublish, and one never used, with the copy button and Delete. Create new key and Close are below.',
    url: (seed) => `/releases/${frontend240(seed)}/overview`,
    prepare: prep(async (page, seed, h) => h.click(page, 'button:has-text("Published keys"), a:has-text("Published keys")', 1500)),
    target: modal(),
  },
  {
    id: `${A}/06-post-release-vulnerabilities-1`,
    doc: `${A}/06-post-release-vulnerabilities.md`,
    alt: 'The New vulnerabilities tab of the release Webshop Frontend 2.4.0 with Export as CSAF, the counters 1 new vulnerabilities, 0 resolved vulnerabilities and 1 vulnerable components, and the finding EXCORP-2026-0001 with score 7.5 in npm:webshop-frontend 2.4.0.',
    url: (seed) => `/releases/${frontend240(seed)}/new_vulnerabilities`,
    prepare: prep(async (page, seed, h) => h.settle(page, 5000)),
    target: headerTo('.obligation-list'),
  },
  {
    id: `${I}/07-releases-1`,
    doc: `${I}/07-releases.md`,
    alt: 'The Releases list with All company projects selected: Payment Service 3.1.0 and Webshop Frontend 2.4.0, both approved on Oct 13, 2026 with Maria Garcia as contact and a Link button.',
    url: '/releases',
    prepare: prep(),
    target: headerTo('table'),
  },
  {
    id: `${I}/07-releases-2`,
    doc: `${I}/07-releases.md`,
    alt: 'The release Webshop Frontend with the buttons SBOM, Binary links, Published keys and Approved in the header, and the New vulnerabilities tab open with one new vulnerability in npm:webshop-frontend 2.4.0.',
    url: (seed) => `/releases/${frontend240(seed)}/new_vulnerabilities`,
    prepare: prep(async (page, seed, h) => h.settle(page, 5000)),
    target: 'viewport',
  },
  {
    id: `${I}/04-reports-1`,
    doc: `${I}/04-reports.md`,
    alt: 'The Reports hub, titled Analyse Reports, with its report tiles, from Licenses overview, Vulnerability report, Versioning report and End-of-life report to Dependent projects and Components.',
    url: '/reports',
    // A taller window, so all tiles fit (the content area scrolls by itself).
    viewport: { width: 1440, height: 1500 },
    prepare: prep(),
    target: headerTo('.content-area a, .content-area .panel', 16),
  },
  {
    id: `${I}/04a-vulnerability-report-1`,
    doc: `${I}/04a-vulnerability-report.md`,
    alt: 'The Vulnerabilities report for All module of Webshop: the Risk overview CVSS vs EPSS scatter chart with points coloured by severity, the counters components, modules, resolved vulnerabilities and vulnerable components, and the toolbar One by one, by CVE ID, Medium +, sort and Treatments above the first finding.',
    url: '/reports/vulnerability',
    prepare: prep(async (page, seed, h) => pickTarget(page, seed.projects.Webshop, h)),
    target: 'viewport',
  },
  {
    id: `${I}/04b-analysis-reports-1`,
    doc: `${I}/04b-analysis-reports.md`,
    alt: 'The Licenses overview for Webshop: the counters 5 licenses, 23 components and 17 obligations, the Project Goals panel with the project description, the Used modules with their analyses, the Legal requirements, and the first license MIT with its warnings and obligations.',
    url: '/reports/licenses',
    prepare: prep(async (page, seed, h) => pickTarget(page, seed.projects.Webshop, h)),
    target: 'viewport',
  },
  {
    id: `${I}/04c-impact-and-portfolio-reports-1`,
    doc: `${I}/04c-impact-and-portfolio-reports.md`,
    alt: 'The CVE impact report for CVE-2022-24785: the CVE description with score 7.5, CWE-22 and the CVSS vector, Send alert and Export as PDF, and the two impacted projects Demo project with its project and compliance manager and Webshop with the module webshop-frontend.',
    url: '/reports/impact/cve',
    prepare: checkCve('CVE-2022-24785'),
    target: 'viewport',
  },
  {
    id: '14-component-manager/03-critical-components-1',
    doc: '14-component-manager/03-critical-components.md',
    alt: 'The Components report for Webshop with the counters modules and critical components, and the numbered list of critical components such as axios, bcprov-jdk15on, commons-collections and log4j-core, each opening its edit page.',
    url: '/reports/critical_components',
    prepare: prep(async (page, seed, h) => pickTarget(page, seed.projects.Webshop, h)),
    target: 'viewport',
  },
  {
    id: `${R1}-1`,
    doc: `${R1}.md`,
    alt: 'The Projects page with the Create new project dialog open and Smart Home Hub entered as Project name, with Close and Create project below.',
    url: '/projects',
    prepare: prep(async (page, seed, h) => {
      await h.click(page, 'button:has-text("Create"), a:has-text("Create")', 1500);
      await page.locator('.modal.in input[type=text], .modal.show input[type=text]').first().fill('Smart Home Hub');
      await h.settle(page, 500);
    }),
    target: 'viewport',
  },
  {
    id: `${R1}-2`,
    doc: `${R1}.md`,
    alt: 'The Import Scans page with Webshop selected as Project, the toggle set to CycloneDX, the file webshop-backend.cdx.json chosen, webshop-backend as Module name and the Import button.',
    url: '/scan-import',
    prepare: prep(async (page, seed, h) => {
      await page.evaluate((id) => {
        const s = document.querySelector('#currentProject');
        window.jQuery(s).val(id).trigger('change');
      }, seed.projects.Webshop);
      const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ts-shot-'));
      const file = path.join(dir, 'webshop-backend.cdx.json');
      await fs.writeFile(file, '{"bomFormat":"CycloneDX","specVersion":"1.6","version":1}');
      await page.locator('input[type=file]').setInputFiles(file);
      await h.settle(page, 800);
      await page.locator('#moduleName').first().fill('webshop-backend');
      await h.settle(page, 500);
    }),
    target: headerTo('.content-area button.btn-primary[type=submit]', 20),
  },
  {
    id: `${R1}-3`,
    doc: `${R1}.md`,
    alt: 'The webshop-backend module page with the List tab active and the Analysis from line under the module name: the components with their versions, licenses and red, orange or green legal and security markers, and the details of the selected component on the right.',
    url: (seed) => webshopModule(seed, 'webshop-backend'),
    prepare: prep(async (page, seed, h) => h.settle(page, 2500)),
    target: 'viewport',
  },
  {
    id: `${R1}-4`,
    doc: `${R1}.md`,
    alt: 'Step 1 Settings of the approval wizard for webshop-backend with Dry run unticked, Webshop Backend as Approve name or product name, version 2.4.0, a Packageurl and an Approve description.',
    url: (seed) => `${webshopModule(seed, 'webshop-backend')}/approve`,
    prepare: prep(async (page, seed, h) => fillWizard(page, h, {
      draft: false, name: 'Webshop Backend', version: '2.4.0', purl: 'pkg:maven/com.example/webshop-backend@2.4.0',
      description: 'Release 2.4.0 of the order back office.',
    })),
    target: headerTo('#createApproveForm'),
  },
  {
    id: `${R1}-5`,
    doc: `${R1}.md`,
    alt: 'The open approval Webshop Frontend 2.5.0 with Manage binary links, Approve and Reject in the header, the tabs Overview, Vulnerabilities, Licenses, Versioning, Viability, Status changes, Export control, Capabilities and SW-Quality, and the Modules table.',
    url: (seed) => `/approves/${frontend250(seed)}/overview`,
    prepare: prep(async (page, seed, h) => h.settle(page, 3000)),
    target: headerTo('.reactive-table-navigation, .reactive-table-options, table'),
  },
  {
    id: `${R1}-6`,
    doc: `${R1}.md`,
    alt: 'The SBOM file page of the release Webshop Frontend 2.4.0 with the buttons PDF, CycloneDX, SPDX, Version and Freeze in the header, the components of the release and the TODOs Navigator.',
    url: (seed) => `/releases/${frontend240(seed)}/overview`,
    prepare: prep(async (page, seed, h) => {
      const href = await page.evaluate(() => [...document.querySelectorAll('a')].find((a) => /\/reports\/sbom\/[^/]+\/details/.test(a.href)).href);
      await page.goto(href);
      await h.settle(page, 3000);
      await ensureLogin(page, seed);
      await h.settle(page, 1500);
    }),
    target: 'viewport',
  },
  {
    id: `${R4}-1`,
    doc: `${R4}.md`,
    alt: 'The CVE impact report for CVE-2021-44228: the CVE description with score 10, CWE-20 and the CVSS vector, and the impacted project Webshop with the module webshop-backend and its analysis of v2.4.0.',
    url: '/reports/impact/cve',
    prepare: checkCve('CVE-2021-44228'),
    target: 'viewport',
  },
];
