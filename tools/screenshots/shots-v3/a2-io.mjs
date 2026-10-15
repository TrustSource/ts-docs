// v3 (SaaS, develop.dev) shots for Inbound, Outbound, Knowledge, Component manager and
// Legal manager pages (agent a2-io). TrainCo Ltd. data, no seed: ids were looked up on DEV.
import fs from 'node:fs/promises';
import path from 'node:path';
import { HERE } from '../lib.mjs';
import { cyclonedx } from '../fixtures.mjs';

const IN = '02-inbound';
const OUT = '04-outbound';
const K = '05-knowledge';
const LM = '15-legal-manager';

const BOOSTME = 'QcJprNstGvbQX7ccY';
const AUTH_SERVICE = 'bYAbTbEhZsmyuQYoW';

const HIDE_CSS = '.chat-mascot, .launcher_placeholder { display: none !important; }';
const hide = (page) => page.addStyleTag({ content: HIDE_CSS });

const routeTo = async (page, url, h, wait = 2500) => {
  await page.evaluate((u) => (window.Router || window.Package['vlasky:galvanized-iron-router'].Router).go(u), url);
  await h.settle(page, wait);
};
const select2 = async (page, selector, value, h, wait = 1200) => {
  await page.evaluate(([s, v]) => window.jQuery(s).val(v).trigger('change'), [selector, value]);
  await h.settle(page, wait);
};
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
const clickRow = async (page, text, h, wait = 2500) => {
  await page.locator('tbody tr').filter({ hasText: text }).first().click();
  await h.settle(page, wait);
};

// A CycloneDX file as a supplier would send it, for the Import Scans form (never imported).
const SUPPLIER_SBOM = path.join(HERE, '.cache', 'example-payment-sdk-bom.json');
const writeSupplierSbom = async () => {
  const c = (purl, license, children = []) => ({ purl, license, children });
  const doc = cyclonedx({ name: 'example-payment-sdk', root: c('pkg:npm/example-payment-sdk@4.2.0', 'UNLICENSED', [
    c('pkg:npm/axios@1.7.7', 'MIT', [c('pkg:npm/follow-redirects@1.15.9', 'MIT')]),
    c('pkg:npm/uuid@9.0.1', 'MIT'),
  ]) });
  await fs.mkdir(path.dirname(SUPPLIER_SBOM), { recursive: true });
  await fs.writeFile(SUPPLIER_SBOM, JSON.stringify(doc, null, 2));
};

const shots = [
  // ---------------------------------------------------------------- Inbound
  {
    id: `${IN}/01-check-1`,
    doc: `${IN}/01-check.md`,
    alt: 'The Check page in Component mode for the project boostME, the module auth-service and minimist 1.2.5 (MIT): two vulnerabilities with score 9.8, then the obligations for an unmodified and a modified component.',
    url: '/check/component',
    prepare: async (page, seed, h) => {
      await select2(page, '#currentProject', BOOSTME, h, 2000);
      await select2(page, '#currentModule', AUTH_SERVICE, h, 2000);
      const input = page.locator('input[name=currentComponent].tt-input, input[name=currentComponent]').first();
      await input.click();
      await input.pressSequentially('minimist', { delay: 80 });
      await page.locator('.tt-suggestion').first().waitFor({ timeout: 20000 });
      console.log(await page.evaluate(() => [...document.querySelectorAll('.tt-suggestion')].map((e) => e.textContent.trim()).slice(0, 8).join(' | ')));
      await page.locator('.tt-suggestion').filter({ hasText: /^\s*minimist\s*$/ }).first().click();
      await h.settle(page, 2500);
      console.log(await page.evaluate(() => [...document.querySelectorAll('#currentVersion option')].map((o) => o.value).slice(0, 30).join(',')));
      const v = await page.evaluate(() => { const o = [...document.querySelectorAll('#currentVersion option')].map((o) => o.value).filter(Boolean); return o.includes('1.2.5') ? '1.2.5' : o[o.length - 1]; });
      await select2(page, '#currentVersion', v, h, 1000);
      await page.locator('form button[type=submit]').filter({ visible: true }).first().click();
      await h.settle(page, 6000);
      await hide(page);
    },
    target: content(),
  },
  {
    id: `${IN}/02-import-scans-1`,
    doc: `${IN}/02-import-scans.md`,
    alt: 'The Import Scans form with the project boostME selected, the switch set to CycloneDX, the file example-payment-sdk-bom.json chosen and the module name changed to example-payment-sdk.',
    url: '/scan-import',
    prepare: async (page, seed, h) => {
      await writeSupplierSbom();
      await select2(page, '#currentProject', BOOSTME, h, 800);
      await page.setInputFiles('#file', SUPPLIER_SBOM);
      await h.settle(page, 800);
      await page.locator('#moduleName').fill('example-payment-sdk');
      await page.locator('#moduleName').dispatchEvent('input');
      // capture.mjs masks input values and cannot write to a file input: take the (hidden)
      // file input out once the chosen file name is shown next to Browse.
      await page.evaluate(() => { const f = document.querySelector('#file'); f.type = 'text'; f.value = ''; f.style.display = 'none'; });
      await hide(page);
    },
    target: content(),
  },
  {
    id: `${IN}/03-cicd-scan-1`,
    doc: `${IN}/03-cicd-scan.md`,
    alt: 'The CI/CD Integrations page with the groups Package managers, Continuous development tools, Containers, Development languages and IDE Plugins, each integration with its Github, Wiki or plugin links.',
    url: '/scanners',
    prepare: async (page) => hide(page),
    target: 'viewport',
  },
  {
    id: `${IN}/03-cicd-scan-2`,
    doc: `${IN}/03-cicd-scan.md`,
    alt: 'The scan of boostME - auth-service with the Binary links, Analysis and Re-Process buttons, the dependency tree in list view on the left and the Reported properties of the selected dependency @aws-sdk/core on the right.',
    url: '/scans',
    prepare: async (page, seed, h) => {
      await clickRow(page, 'boostME - auth-service', h, 4000);
      await page.locator('li.node-tree').filter({ hasText: /^\s*@aws-sdk\/core - npm:@aws-sdk\/core/ }).first().click();
      await h.settle(page, 2500);
      await hide(page);
    },
    target: 'viewport',
  },
  {
    id: `${IN}/04-sw-quality-scans-1`,
    doc: `${IN}/04-sw-quality-scans.md`,
    alt: 'The Import test dialog opened from the Quality tab of the module auth-service, with the Browse button for the SARIF file and the Import button.',
    url: `/projects/${BOOSTME}/modules/${AUTH_SERVICE}`,
    prepare: async (page, seed, h) => {
      // The module tour opens on the first visit; cancel it.
      const cancel = page.locator('.ts-tour-cancel, button:has-text("Cancel"), a:has-text("Cancel")').filter({ visible: true }).first();
      if (await cancel.isVisible().catch(() => false)) { await cancel.click(); await h.settle(page, 800); }
      await page.locator('a:has-text("Quality")').filter({ visible: true }).first().click();
      await h.settle(page, 2500);
      await page.locator('[data-target="#TestImportModal"]').filter({ visible: true }).first().click();
      await h.settle(page, 1200);
    },
    target: '#TestImportModal .modal-content',
  },
  {
    id: `${IN}/05-repository-scans-1`,
    doc: `${IN}/05-repository-scans.md`,
    alt: 'The Schedule DeepScan dialog with a repository Url and a tag filled in, the switch Points to set to Repository, Yes or No for the scorecard, crypto and copyright analysis and for Urls is password protected, and the deny list selection.',
    url: '/deep_scan',
    prepare: async (page, seed, h) => {
      await page.locator('[data-target="#createDeepScan"]').filter({ visible: true }).first().click();
      await h.settle(page, 1200);
      await page.locator('#urlField').fill('https://github.com/example/example-library');
      await page.locator('#tagField').fill('v1.4.0');
    },
    target: '#createDeepScan .modal-content',
  },
  {
    id: `${IN}/06-mass-scans-1`,
    doc: `${IN}/06-mass-scans.md`,
    alt: 'The Schedule bulk scan dialog with the Module selection, Yes or No for the scorecard, crypto and copyright analysis and for Scan is private, and the Close and Schedule DeepScan List buttons.',
    url: '/bulk_repo',
    prepare: async (page, seed, h) => {
      await page.locator('[data-target="#createDeepScanList"]').filter({ visible: true }).first().click();
      await h.settle(page, 1200);
      await select2(page, '#moduleField', `${BOOSTME}_m_${AUTH_SERVICE}`, h, 2500);
      const v = await page.evaluate(() => [...document.querySelectorAll('#analysisField option')].map((o) => o.value).filter(Boolean)[0]);
      if (v) await select2(page, '#analysisField', v, h, 1000);
    },
    target: '#createDeepScanList .modal-content',
  },

  // ---------------------------------------------------------------- Outbound
  {
    id: `${OUT}/01-sbom-cbom-1`,
    doc: `${OUT}/01-sbom-cbom.md`,
    alt: 'The SBOM files list with the Create SBOM file button and the columns Created, Frozen, Project/Module, Components, Version, Edited, By and Complete; the files of mAIfit and boostME, version 1.0.0, 0 percent complete, each with a Remove button.',
    url: '/reports/sbom',
    prepare: async (page) => hide(page),
    target: content(),
  },
  {
    id: `${OUT}/01-sbom-cbom-2`,
    doc: `${OUT}/01-sbom-cbom.md`,
    alt: 'The SBOM file of boostME, version 1.0.0, with the PDF, CycloneDX, SPDX, Version and Freeze buttons, one component opened for editing on the left and the TODOs Navigator on the right with the component count, the remaining ToDos and the completion.',
    url: '/reports/sbom/ZaoD7D24qN44zsCPH/details',
    prepare: async (page, seed, h) => {
      await page.locator('.expand_table').filter({ visible: true }).first().click();
      await h.settle(page, 1500);
      await hide(page);
    },
    target: 'viewport',
  },
  {
    id: `${OUT}/02-notice-files-1`,
    doc: `${OUT}/02-notice-files.md`,
    alt: 'The Notice files list below the Written Offer warning with its Configure now link, with the columns Created, Frozen, Project/Module, Components, Version, Edited, By and Complete, showing the files of mAIfit, boostME and boostME / admin-service between 12 and 26 percent complete.',
    url: '/reports/notice',
    prepare: async (page) => hide(page),
    target: content(),
  },
  {
    id: `${OUT}/06-cvd-cases-1`,
    doc: `${OUT}/06-cvd-cases.md`,
    alt: 'The CVD cases list with the New case button, the filter and the columns Case, Advisory ids, Status, CS state, Embargo, Origin, Created and Updated; one active case from external intake with a CVE and a GHSA id and embargo None.',
    url: '/cases',
    prepare: async (page) => hide(page),
    target: content(),
  },
  {
    id: `${OUT}/06-cvd-cases-2`,
    doc: `${OUT}/06-cvd-cases.md`,
    alt: 'The New CVD case form further down, with the vulnerability details and the estimated CVSS vector CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H entered and its computed score.',
    url: '/cases/new',
    prepare: async (page, seed, h) => {
      await page.locator('#caseCvssVector').fill('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H');
      await page.locator('#caseCvssVector').dispatchEvent('input');
      await h.settle(page, 1000);
      await page.locator('#caseCvssVector').scrollIntoViewIfNeeded();
      await page.evaluate(() => document.querySelector('#caseCvssVector').scrollIntoView({ block: 'center' }));
      await h.settle(page, 600);
      await hide(page);
    },
    target: 'viewport',
  },

  {
    id: `${OUT}/04-csaf-3`,
    doc: `${OUT}/04-csaf.md`,
    alt: 'The Create CSAF feed key dialog with the Name field, the TLP levels to select, the Products selection for AMBER+STRICT advisories, the Include drafts option and the Create button.',
    url: '/settings/company/api/csaf',
    prepare: async (page, seed, h) => {
      await page.locator('[data-target="#createCsafKey"]').filter({ visible: true }).first().click();
      await h.settle(page, 1200);
    },
    target: '#createCsafKey .modal-content',
  },

  // ---------------------------------------------------------------- Knowledge
  {
    id: `${K}/05-algorithms-1`,
    doc: `${K}/05-algorithms.md`,
    alt: 'The Algorithms list filtered by the PQC Status Vulnerable, with the PQC label, algorithm key and name, strength, year invented, category and substitutes of each algorithm.',
    url: '/algorithms',
    prepare: async (page, seed, h) => {
      await page.selectOption('select.pqc-status-filter', 'Vulnerable');
      await page.locator('select.pqc-status-filter').dispatchEvent('change');
      await h.settle(page, 2500);
      await hide(page);
    },
    target: 'viewport',
  },
  {
    id: `${K}/01-component-lake-1`,
    doc: `${K}/01-component-lake.md`,
    alt: 'A Registry search for lodash in the Components lake: the results with name, description, package icon, license and links to homepage and repository.',
    url: '/components',
    prepare: async (page, seed, h) => {
      await page.getByText('Registry search', { exact: true }).first().click();
      await h.settle(page, 1500);
      const input = page.locator('.content-area input[type=text], .content-area input[type=search]').filter({ visible: true }).first();
      await input.fill('lodash');
      await page.locator('.content-area button:has-text("Search")').filter({ visible: true }).first().click();
      await h.settle(page, 5000);
      await hide(page);
    },
    target: 'viewport',
  },
  {
    id: `${K}/02-infrastructure-elements-1`,
    doc: `${K}/02-infrastructure-elements.md`,
    alt: 'The Infrastructure components list, 1196 components, with the search criteria Name, Key, Language and Description, the sort order, and the components with their categories, description, OSSF score and links.',
    url: '/infrastructure_components',
    prepare: async (page) => hide(page),
    target: 'viewport',
  },
  {
    id: `${K}/04-vulnerability-lake-1`,
    doc: `${K}/04-vulnerability-lake.md`,
    alt: 'Find CVE with CVE-2021-44228: the weakness CWE-917, the CVSS 3.1 and 2.0 attack vectors, the base score 10 with impact and exploit scores, the description and the CISA Exploit alert with the date added and the required action.',
    url: '/vulnerability_lake/cve_by_name?filter=' + encodeURIComponent(JSON.stringify({ cve: 'CVE-2021-44228' })),
    prepare: async (page, seed, h) => { await h.settle(page, 4000); await hide(page); },
    target: async (page) => {
      const cpes = await page.evaluate(() => {
        const el = [...document.querySelectorAll('.content-area *')].find((e) => e.children.length === 0 && e.textContent.trim() === 'Currently assigned CPEs');
        return el ? el.getBoundingClientRect().top : null;
      });
      const { clip } = await content()(page);
      return { clip: { ...clip, height: (cpes ? cpes - 8 : clip.y + clip.height) - clip.y } };
    },
  },
  {
    id: `${K}/06-licenses-1`,
    doc: `${K}/06-licenses.md`,
    alt: 'The Licenses page, 417 licenses known, with the tabs All and Top List; the All tab lists the licenses alphabetically.',
    url: '/licenses',
    prepare: async (page, seed, h) => { await h.settle(page, 3000); await hide(page); },
    target: 'viewport',
  },
  {
    id: `${K}/08-trainings-1`,
    doc: `${K}/08-trainings.md`,
    alt: 'The Trainings page with the Level and Tags filters, 9 courses, and the first course cards with price or Free, title, summary, level, duration, languages and authors.',
    url: '/trainings',
    prepare: async (page, seed, h) => {
      await h.settle(page, 3000);
      await hide(page);
      // The course list is rendered in a frame, which the framework's masking does not reach:
      // apply this agent's mask rules to every frame.
      const rules = JSON.parse(await fs.readFile(path.join(HERE, '.mask-v3-a2-io.json'), 'utf8'));
      for (const f of page.frames()) {
        await f.evaluate((rules) => {
          const res = rules.map(([p, r]) => [new RegExp(p, 'gi'), r]);
          const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          for (let n = w.nextNode(); n; n = w.nextNode()) n.nodeValue = res.reduce((a, [re, r]) => a.replace(re, r), n.nodeValue);
          // Shadow roots too.
          for (const el of document.querySelectorAll('*')) if (el.shadowRoot) {
            const w2 = document.createTreeWalker(el.shadowRoot, NodeFilter.SHOW_TEXT);
            for (let n = w2.nextNode(); n; n = w2.nextNode()) n.nodeValue = res.reduce((a, [re, r]) => a.replace(re, r), n.nodeValue);
          }
        }, rules).catch(() => {});
      }
    },
    target: 'viewport',
  },

  // ---------------------------------------------------------------- Legal manager
  {
    // The list itself; the Create copyright/trademark button in the header is legal_manager only.
    id: `${LM}/03-copyright-trademarks-1`,
    doc: `${LM}/03-copyright-trademarks.md`,
    alt: 'The Copyrights / Trademarks list with the filter and the columns Name, Type, Description, Usage and Link; the entry OpenSSF Scorecard of type trademark with a Remove button.',
    url: '/trademarks',
    prepare: async (page) => hide(page),
    target: content(),
  },
];

export default shots;
