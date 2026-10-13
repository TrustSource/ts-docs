// Inbound (check, import, scans, SARIF tests), Outbound (SBOM and notice files, CSAF,
// verification), Knowledge (component, infrastructure, COTS, vulnerability and license
// catalogs, open source policy), component manager and legal reference pages.
// Extra data comes from seeds/50-inbound-outbound-knowledge.mjs (seed.extra[STEP]).
import fs from 'node:fs/promises';
import path from 'node:path';
import { HERE } from '../lib.mjs';
import { cyclonedx } from '../fixtures.mjs';

const STEP = '50-inbound-outbound-knowledge';
const IN = '02-inbound';
const OUT = '04-outbound';
const K = '05-knowledge';
const CM = '14-component-manager';
const LM = '15-legal-manager';
const extra = (seed) => seed.extra[STEP] || {};

// Client-side navigation inside a prepare step (a full reload costs a login, see the report).
const routeTo = async (page, url, h, wait = 2500) => {
  await page.evaluate((u) => (window.Router || window.Package['iron:router'].Router).go(u), url);
  await h.settle(page, wait);
};

// Sets a select2 select by value and lets the app's change handlers run.
const select2 = async (page, selector, value, h, wait = 1200) => {
  await page.evaluate(([s, v]) => window.jQuery(s).val(v).trigger('change'), [selector, value]);
  await h.settle(page, wait);
};

// The bounding box of the elements, cut at the bottom of the content area.
const box = (selectors, pad = 12, { maxBottom } = {}) => async (page) => {
  const clip = await page.evaluate(([sels, pad, maxBottom]) => {
    const rs = sels.flatMap((s) => [...document.querySelectorAll(s)]).filter((e) => !e.closest('.modal') || e.closest('.modal.in, .modal.show'))
      .map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.height);
    if (!rs.length) throw new Error('box: nothing matches ' + sels.join(', '));
    const x = Math.max(0, Math.min(...rs.map((r) => r.left)) - pad);
    const y = Math.max(0, Math.min(...rs.map((r) => r.top)) - pad);
    const right = Math.min(window.innerWidth, Math.max(...rs.map((r) => r.right)) + pad);
    let bottom = Math.min(window.innerHeight, Math.max(...rs.map((r) => r.bottom)) + pad);
    if (maxBottom) bottom = Math.min(bottom, maxBottom);
    return { x, y, width: right - x, height: bottom - y };
  }, [Array.isArray(selectors) ? selectors : [selectors], pad, maxBottom]);
  return { clip };
};

// The content area (page header and panels, without the sidebar), down to the lowest
// visible element inside it plus a margin, so empty space below short pages is cut off.
const content = (margin = 24) => async (page) => {
  const clip = await page.evaluate((margin) => {
    const area = document.querySelector('.content-area').getBoundingClientRect();
    let bottom = 0;
    for (const el of document.querySelectorAll('.content-area *')) {
      if (el.closest('.modal')) continue;
      const r = el.getBoundingClientRect();
      if (r.width && r.height && r.top < window.innerHeight && getComputedStyle(el).visibility !== 'hidden' && el.children.length === 0) bottom = Math.max(bottom, r.bottom);
    }
    const x = Math.max(0, area.left - 8);
    const y = Math.max(0, area.top - 8);
    return { x, y, width: Math.min(window.innerWidth, area.right + 8) - x, height: Math.min(window.innerHeight, bottom + margin) - y };
  }, margin);
  return { clip };
};

// Clicks the row of a list whose text contains `text`.
const clickRow = async (page, text, h, wait = 2500) => {
  await page.locator('tbody tr').filter({ hasText: text }).first().click();
  await h.settle(page, wait);
};

// A CycloneDX file as a supplier would send it, for the Import Scans form.
const SUPPLIER_SBOM = path.join(HERE, '.cache', 'acme-payment-sdk-bom.json');
const writeSupplierSbom = async () => {
  const c = (purl, license, children = []) => ({ purl, license, children });
  const doc = cyclonedx({ name: 'acme-payment-sdk', root: c('pkg:npm/acme-payment-sdk@4.2.0', 'UNLICENSED', [
    c('pkg:npm/axios@1.7.7', 'MIT', [c('pkg:npm/follow-redirects@1.15.9', 'MIT')]),
    c('pkg:npm/uuid@9.0.1', 'MIT'),
    c('pkg:npm/jose@4.15.9', 'MIT'),
  ]) });
  await fs.mkdir(path.dirname(SUPPLIER_SBOM), { recursive: true });
  await fs.writeFile(SUPPLIER_SBOM, JSON.stringify(doc, null, 2));
};


// The server allows 20 logins per minute and IP; every page load resumes the login, so
// with several capture runs in parallel a resume can be refused and the context is
// logged out. Then sign in again on the page and route to the shot's address.
const SHOT_EMAIL = process.env.TS_EMAIL || 'alex.morgan@example.com';
async function ensureLogin(page, url, h) {
  for (let i = 0; i < 6; i++) {
    const out = await page.locator('#username').isVisible().catch(() => false);
    if (!out) return;
    const seedFile = JSON.parse(await fs.readFile(path.join(HERE, '.seed.json'), 'utf8'));
    await page.fill('#username', SHOT_EMAIL);
    await page.fill('#password', seedFile.team[SHOT_EMAIL].password);
    await page.click('button[type=submit]');
    const ok = await page.waitForFunction(() => !document.querySelector('#username'), null, { timeout: 15000 }).then(() => true, () => false);
    if (ok) {
      await h.settle(page, 1500);
      await page.goto(page.url().replace(/^(https?:\/\/[^/]+).*$/, '$1') + url);
      await h.settle(page, 2500);
      continue;
    }
    await page.waitForTimeout(20000);
    await page.reload();
    await h.settle(page, 1500);
  }
  throw new Error('still logged out');
}
const withLogin = (shots) => shots.map((s) => ({ ...s, prepare: async (page, seed, h) => {
  const url = typeof s.url === 'function' ? s.url(seed) : s.url;
  await ensureLogin(page, url, h);
  if (s.prepare) await s.prepare(page, seed, h);
} }));

export default withLogin([
  // ---------------------------------------------------------------- Inbound
  {
    id: `${IN}/01-check-1`,
    doc: `${IN}/01-check.md`,
    alt: 'The Check page in Component mode for the Demo project, Demo module and log4j-core 2.14.1: the known vulnerabilities coloured by score, followed by the legal assessment for an unmodified and a modified component.',
    url: '/check/component',
    prepare: async (page, seed, h) => {
      // The seeded modules have no module legal settings; the demo module has them.
      const byText = (sel, text) => page.evaluate(([sel, text]) => [...document.querySelectorAll(sel + ' option')].find((o) => o.textContent.trim() === text).value, [sel, text]);
      await select2(page, '#currentProject', await byText('#currentProject', 'Demo project'), h, 1500);
      await select2(page, '#currentModule', await byText('#currentModule', 'Demo module'), h, 1500);
      const input = page.locator('input[name=currentComponent].tt-input, input[name=currentComponent]').first();
      await input.click();
      await input.pressSequentially('log4j-core', { delay: 60 });
      await page.locator('.tt-suggestion').filter({ hasText: 'log4j-core' }).first().click({ timeout: 15000 });
      await h.settle(page, 2000);
      await select2(page, '#currentVersion', '2.14.1', h, 1000);
      await page.locator('#checkComponents button[type=submit], form button[type=submit]').filter({ visible: true }).first().click();
      await h.settle(page, 5000);
    },
    target: 'viewport',
  },
  {
    id: `${IN}/02-import-scans-1`,
    doc: `${IN}/02-import-scans.md`,
    alt: 'The Import Scans form with the project Payment Service selected, the switch set to CycloneDX, the file acme-payment-sdk-bom.json chosen and the module name changed to acme-payment-sdk.',
    url: '/scan-import',
    prepare: async (page, seed, h) => {
      await writeSupplierSbom();
      await select2(page, '#currentProject', seed.projects['Payment Service'], h, 800);
      await page.setInputFiles('#file', SUPPLIER_SBOM);
      await h.settle(page, 800);
      await page.locator('#moduleName').fill('acme-payment-sdk');
      await page.locator('#moduleName').dispatchEvent('input');
    },
    target: box(['.content-area .page-header, .content-area .ts-page-header', '.content-area form'], 12),
  },
  {
    id: `${IN}/03-cicd-scan-1`,
    doc: `${IN}/03-cicd-scan.md`,
    alt: 'The CI/CD Integrations page with the Package managers group: Bower, Composer, Gradle, Grunt, Gulp, Maven, npm and Yarn, each with links to its repository, and the start of the Continuous development tools group.',
    url: '/scanners',
    target: 'viewport',
  },
  {
    id: `${IN}/03-cicd-scan-2`,
    doc: `${IN}/03-cicd-scan.md`,
    alt: 'The Scans list with the columns When, Project - Module, Upload by, Dependencies and Meta, showing the scans of Legacy Portal, Webshop, Payment Service, Mobile App and the demo project, with branch, tag and binary links where the scan has them.',
    url: '/scans',
    target: content(),
  },
  {
    id: `${IN}/03-cicd-scan-3`,
    doc: `${IN}/03-cicd-scan.md`,
    alt: 'The scan of Webshop - webshop-backend on branch main with tag v2.4.0: the dependency tree on the left with log4j-core selected, and the Reported properties of log4j-core on the right.',
    url: (seed) => `/scans/${seed.scans['webshop-backend'].scanId}`,
    prepare: async (page, seed, h) => {
      await page.getByText('log4j-core - maven:org.apache.logging.log4j:log4j-core', { exact: false }).first().click();
      await h.settle(page, 1500);
    },
    target: 'viewport',
  },
  {
    id: `${IN}/04-sw-quality-scans-1`,
    doc: `${IN}/04-sw-quality-scans.md`,
    alt: 'The Import test dialog opened from the Quality tab of a module, with the Browse button for the SARIF file and the Import button.',
    url: (seed) => `/projects/${seed.projects.Webshop}/modules/${seed.scans['webshop-backend'].moduleId}`,
    prepare: async (page, seed, h) => {
      await page.locator('a:has-text("Quality")').filter({ visible: true }).first().click();
      await h.settle(page, 2000);
      await page.locator('[data-target="#TestImportModal"]').filter({ visible: true }).first().click();
      await h.settle(page, 1200);
    },
    target: box('#TestImportModal .modal-content', 16),
  },
  {
    id: `${IN}/04-sw-quality-scans-2`,
    doc: `${IN}/04-sw-quality-scans.md`,
    alt: 'The Tests list with three SARIF imports from ESLint, Semgrep OSS and CodeQL, all Failed, with their findings per severity, the CWEs badges and the project and module links.',
    url: '/tests',
    target: 'viewport',
  },
  {
    id: `${IN}/04-sw-quality-scans-3`,
    doc: `${IN}/04-sw-quality-scans.md`,
    alt: 'The Test details page of the Semgrep OSS run grouped By Rule: three rule groups with their findings, CWE badges, and the Create issue and Create risk actions; the rule without a CWE also offers Assign CWEs.',
    url: '/tests',
    prepare: async (page, seed, h) => clickRow(page, 'Semgrep OSS', h),
    target: content(),
  },
  {
    id: `${IN}/04a-sarif-weaknesses-1`,
    doc: `${IN}/04a-sarif-weaknesses.md`,
    alt: 'The CodeQL test page with the CWEs strip listing CWE-89, CWE-327, CWE-563 and CWE-79 with their finding counts, and the collapsed rule groups with their CWEs; CWE-563 of java/unused-local-variable is shown in the assigned style with Edit assigned CWEs.',
    url: '/tests',
    prepare: async (page, seed, h) => {
      await clickRow(page, 'CodeQL', h);
      // Collapse every rule group so all group headers fit.
      const heads = page.locator('.panel-heading.collapse-action');
      for (let i = 0; i < await heads.count(); i++) {
        await heads.nth(i).locator('.collapse-chevron').click();
        await page.waitForTimeout(300);
      }
      await h.settle(page, 800);
    },
    target: content(28),
  },

  // ---------------------------------------------------------------- Outbound
  {
    id: `${OUT}/01-sbom-cbom-1`,
    doc: `${OUT}/01-sbom-cbom.md`,
    alt: 'The SBOM files list with the columns Created, Frozen, Project/Module, Components, Version, Edited, By and Complete, and a Remove button per row; the module file Webshop / webshop-backend is 36 percent complete.',
    url: '/reports/sbom',
    target: content(),
  },
  {
    id: `${OUT}/01-sbom-cbom-2`,
    doc: `${OUT}/01-sbom-cbom.md`,
    alt: 'The SBOM file of Webshop / webshop-backend with log4j-core opened for editing on the left and the TODOs Navigator on the right with the component count, the remaining ToDos and the completion.',
    url: (seed) => `/reports/sbom/${extra(seed).sbomFileId}/details`,
    prepare: async (page, seed, h) => {
      await page.locator('.panel_with_component').filter({ has: page.locator('h4', { hasText: 'log4j-core (' }) })
        .locator('.expand_table').first().click();
      await h.settle(page, 1500);
    },
    target: 'viewport',
  },
  {
    id: `${OUT}/02-notice-files-1`,
    doc: `${OUT}/02-notice-files.md`,
    alt: 'The Notice files list below the Written Offer warning, with the columns Created, Frozen, Project/Module, Components, Version, Edited, By and Complete, showing completions between 29 and 100 percent.',
    url: '/reports/notice',
    target: content(),
  },
  {
    id: `${OUT}/02-notice-files-2`,
    doc: `${OUT}/02-notice-files.md`,
    alt: 'The notice file of the Webshop Backend 2.4.0 release with the license Apache-2.0 opened, showing its components with cleared checkboxes, and the TODOs Navigator with components, obligations, remaining ToDos and the Written Offer entry.',
    url: '/reports/notice',
    prepare: async (page, seed, h) => {
      const approveId = seed.approvals['Webshop Backend 2.4.0'].id;
      const id = await page.evaluate((a) => {
        const M = window.Meteor || window.Package.meteor.Meteor;
        const d = M.connection._mongo_livedata_collections.noticeFiles.findOne({ approveId: a });
        return d && d._id;
      }, approveId);
      await routeTo(page, `/reports/notice/${id}/details`, h, 3000);
      await page.locator('.expand_table').filter({ hasText: 'Apache-2.0' }).first().click();
      await h.settle(page, 1500);
    },
    target: 'viewport',
  },
  {
    id: `${OUT}/04-csaf-1`,
    doc: `${OUT}/04-csaf.md`,
    alt: 'The CSAF list with the Published, Draft and Failed status filter buttons and two drafts, a security advisory for Webshop Backend and a VEX document for Payment Service, each with the publish, edit and delete actions.',
    url: '/csaf',
    target: content(),
  },
  {
    id: `${OUT}/04-csaf-2`,
    doc: `${OUT}/04-csaf.md`,
    alt: 'Step 1 Type of the Create CSAF wizard with the four choices Informational Advisory, Security Advisory, VEX and Security Incident.',
    url: '/csaf-create',
    target: content(40),
  },
  {
    // The signed SBOM of a release, as the Release keys page previews it, pasted into Verify.
    id: `${OUT}/05-verify-1`,
    doc: `${OUT}/05-verify.md`,
    alt: 'The Verification page with the signed SBOM of the Webshop Frontend 2.4.0 release pasted into the text field and the result Verified successfully, Verified and found in server.',
    url: '/settings/company/api/releases',
    prepare: async (page, seed, h) => {
      // The preview entry sits in the eye menu of the first release key (Webshop Frontend 2.4.0).
      await page.evaluate(() => document.querySelector('.preview-public-sbom').click());
      await page.waitForFunction(() => window.Package.session.Session.get('previewData'), null, { timeout: 15000 });
      const json = await page.evaluate(() => JSON.stringify(window.Package.session.Session.get('previewData'), null, 2));
      await page.keyboard.press('Escape');
      await routeTo(page, '/verify/json', h, 1500);
      await page.evaluate(() => { document.querySelector('textarea[name=inputBody]').spellcheck = false; });
      await page.locator('textarea[name=inputBody]').fill(json);
      await page.locator('#verifyForm button[type=submit]').click();
      await h.settle(page, 3000);
      await page.evaluate(() => { document.querySelector('textarea[name=inputBody]').scrollTop = 0; });
    },
    target: content(),
  },

  // ---------------------------------------------------------------- Knowledge
  {
    id: `${K}/01-component-lake-1`,
    doc: `${K}/01-component-lake.md`,
    alt: 'The Components lake with the criteria Name lo, Any language and Active, sorted by Name ascending, and the nine matching components, among them lodash, log4j-api and log4j-core, with description and package icon.',
    url: '/components',
    prepare: async (page, seed, h) => {
      await page.locator('#componentLakeManagerName').fill('lo');
      await page.locator('button:has-text("Search")').filter({ visible: true }).first().click();
      await h.settle(page, 2500);
    },
    target: box(['.ts-page-header', '.content-area table'], 12),
  },
  {
    id: `${K}/01-component-lake-2`,
    doc: `${K}/01-component-lake.md`,
    alt: 'The component page of log4j-core with the Information panel and the Versions list, showing version 2.14.1 with its license and reported vulnerabilities.',
    url: '/components',
    prepare: async (page, seed, h) => {
      await page.locator('#componentLakeManagerName').fill('log4j-core');
      await page.locator('button:has-text("Search")').filter({ visible: true }).first().click();
      await h.settle(page, 2500);
      await clickRow(page, 'log4j-core', h, 3000);
    },
    target: 'viewport',
  },
  {
    id: `${K}/02-infrastructure-elements-1`,
    doc: `${K}/02-infrastructure-elements.md`,
    alt: 'The Infrastructure components list with six components, among them Apache HTTP Server, MariaDB, MongoDB and NGINX, each with its categories, description and homepage and repository links.',
    url: '/infrastructure_components',
    target: content(),
  },
  {
    id: `${K}/03-cots-1`,
    doc: `${K}/03-cots.md`,
    alt: 'The COTS component Example Analytics Suite with its Information, Comment and the commercial terms: Right to re-sell no, Right to distribute limited, Right to host/operate as SaaS unlimited and Right to modify no.',
    url: (seed) => `/cots_components/${extra(seed).cotsId}`,
    target: 'viewport',
  },
  {
    id: `${K}/04-vulnerability-lake-1`,
    doc: `${K}/04-vulnerability-lake.md`,
    alt: 'Find vuln with CVE-2021-23337: the HIGH severity label, the other ids it is known by, the dates, the weakness CWE-77, the CVSS 3.1 attack vector and base score 7.2 with impact and exploit scores, the description and the affected packages with their version ranges.',
    url: '/vulnerability_lake/cve_by_name?filter=' + encodeURIComponent(JSON.stringify({ cve: 'CVE-2021-23337' })),
    target: async (page) => {
      const refs = await page.evaluate(() => {
        const el = [...document.querySelectorAll('.content-area *')].find((e) => e.children.length === 0 && e.textContent.trim() === 'References');
        return el ? el.getBoundingClientRect().top : null;
      });
      return content()(page).then(({ clip }) => ({ clip: { ...clip, height: (refs ? refs - 8 : clip.y + clip.height) - clip.y } }));
    },
  },
  {
    id: `${K}/06-licenses-1`,
    doc: `${K}/06-licenses.md`,
    alt: 'The Licenses page, 24 licenses known, with the Search licenses field and the tabs All and Top List; the All tab lists the licenses alphabetically, each with a link to its homepage.',
    // Loaded directly, the list stays empty (CE 1.0.0); opened from inside the app it loads.
    url: '/dashboard',
    prepare: async (page, seed, h) => {
      await page.evaluate(() => window.Package['vlasky:galvanized-iron-router'].Router.go('/licenses'));
      await page.waitForFunction(() => document.querySelectorAll('.license-row').length > 5 && !/Loading licenses/i.test(document.body.innerText), null, { timeout: 60000 });
      await h.settle(page, 800);
    },
    target: 'viewport',
  },
  {
    id: `${K}/07-open-source-policy-1`,
    doc: `${K}/07-open-source-policy.md`,
    alt: 'The Open source policy page with the active policy Open Source Policy 2026, its Active from date, the description, the View policy file link and the Updated date.',
    url: '/open_source_policy',
    target: content(),
  },

  // ---------------------------------------------------------------- Component manager
  {
    id: `${CM}/01-manage-infrastructure-1`,
    doc: `${CM}/01-manage-infrastructure.md`,
    alt: 'The Add infrastructure component dialog filled in with the name PostgreSQL, the key im:postgresql, the versions 15.8, 16.4 and the homepage and repository, with the Create component button.',
    url: '/infrastructure_components',
    prepare: async (page, seed, h) => {
      await page.locator('[data-target="#createInfrastructureModule"]').first().click();
      await h.settle(page, 1000);
      const f = (s, v) => page.locator(`#createInfrastructureModule ${s}`).fill(v);
      await f('#componentName', 'PostgreSQL');
      await f('#componentKey', 'im:postgresql');
      await f('#componentVersions', '15.8, 16.4');
      await f('#componentHomepage', 'https://www.postgresql.org');
      await f('#componentRepository', 'https://git.postgresql.org/gitweb/?p=postgresql.git');
    },
    target: box('#createInfrastructureModule .modal-content', 16),
  },
  {
    id: `${CM}/02-manage-cots-1`,
    doc: `${CM}/02-manage-cots.md`,
    alt: 'The Commercial terms panel on the edit page of Example Analytics Suite: Right to re-sell no, Right to distribute limited, Right to host/operate as SaaS unlimited and Right to modify no.',
    url: (seed) => `/management/cots_components/${extra(seed).cotsId}/edit`,
    prepare: async (page, seed, h) => {
      await page.locator('h5:has-text("Commercial terms")').first().scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollBy(0, 0));
      await h.settle(page, 800);
    },
    target: async (page) => {
      const handle = await page.locator('.panel').filter({ has: page.locator('h5:has-text("Commercial terms")') }).first();
      await handle.scrollIntoViewIfNeeded();
      const r = await handle.boundingBox();
      return { clip: { x: r.x - 12, y: r.y - 12, width: r.width + 24, height: r.height + 24 } };
    },
  },

  // ---------------------------------------------------------------- Legal manager
  {
    id: `${LM}/02-legal-templates-1`,
    doc: `${LM}/02-legal-templates.md`,
    alt: 'The project template SaaS product (default) with Update template information and the Legal settings wizard started: Question 1 of 3 asks for the intended commercial use, with the View all button and Next.',
    url: (seed) => `/settings/company/legal_templates/${extra(seed).templateId}`,
    prepare: async (page, seed, h) => {
      await page.locator('.view-wizard').first().click();
      await h.settle(page, 1500);
    },
    target: 'viewport',
  },
  {
    id: `${LM}/03-copyright-trademarks-1`,
    doc: `${LM}/03-copyright-trademarks.md`,
    alt: 'The Copyright & Trademarks page with the statement about the tools and trademarks used and the entry ScanOSS cpe2purl with its description, its use in TrustSource CE and the View link.',
    url: '/copyright_trademarks',
    target: content(),
  },
]);
