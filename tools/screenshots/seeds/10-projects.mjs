// Seed step for the project screenshots (docs/ce/03-internal/01-projects and related pages).
//
//   - Company tags, assigned to the seeded projects, for the project list tag filter.
//   - "Legacy Portal": a project whose three modules come from SBOM files imported with the
//     Import dialog of the project settings (so the Imports tab has a history), with
//     default managers (for the read-only/editable permission shots), tags, a description
//     and resolved obligations. Kept apart from the seeded projects that other shots use.
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { BASE_URL } from '../lib.mjs';
import { cyclonedx } from '../fixtures.mjs';

const TAGS = [
  { name: 'customer-facing', description: 'Used directly by Example Corp customers.' },
  { name: 'payments', description: 'Handles payment or card data.' },
  { name: 'internal', description: 'Used by Example Corp staff only.' },
];

const PROJECT_TAGS = {
  Webshop: ['customer-facing', 'payments'],
  'Mobile App': ['customer-facing'],
  'Payment Service': ['payments'],
};

const LEGACY = 'Legacy Portal';
const c = (purl, license, children = []) => ({ purl, license, children });
const LEGACY_MODULES = [
  { name: 'portal-web', root: c('pkg:npm/portal-web@3.2.0', 'UNLICENSED', [
    c('pkg:npm/jquery@3.4.1', 'MIT'),
    c('pkg:npm/bootstrap@3.4.1', 'MIT'),
    c('pkg:npm/handlebars@4.5.3', 'MIT', [c('pkg:npm/minimist@1.2.0', 'MIT')]),
    c('pkg:npm/underscore@1.12.0', 'MIT'),
  ]) },
  { name: 'portal-api', root: c('pkg:maven/com.example/portal-api@3.2.0', 'UNLICENSED', [
    c('pkg:maven/org.apache.struts/struts2-core@2.5.26', 'Apache-2.0', [c('pkg:maven/ognl/ognl@3.1.28', 'Apache-2.0')]),
    c('pkg:maven/org.apache.commons/commons-text@1.9', 'Apache-2.0'),
    c('pkg:maven/com.thoughtworks.xstream/xstream@1.4.17', 'BSD-3-Clause'),
    c('pkg:maven/com.h2database/h2@1.4.199', '(MPL-2.0 OR EPL-1.0)'),
  ]) },
  { name: 'portal-reports', root: c('pkg:pypi/portal-reports@3.2.0', 'UNLICENSED', [
    c('pkg:pypi/pyyaml@5.3.1', 'MIT'),
    c('pkg:pypi/jinja2@2.10.1', 'BSD-3-Clause', [c('pkg:pypi/markupsafe@1.1.1', 'BSD-3-Clause')]),
    c('pkg:pypi/requests@2.25.1', 'Apache-2.0', [c('pkg:pypi/urllib3@1.26.4', 'MIT')]),
  ]) },
];

const OBLIGATIONS = [
  { obligationKey: 'O5', key: 'npm:jquery', comment: 'Copyright notice shown in the About dialog of the portal.' },
  { obligationKey: 'O4', key: 'mvn:org.apache.struts:struts2-core', comment: 'License text shipped in /licenses of the WAR file.' },
  { obligationKey: 'O1', key: 'pypi:jinja2', comment: 'Notices kept in the report templates.' },
];

export default async ({ browser, page, call, base, state, save, meteor, log, settle }) => {
  // Company tags
  const existing = await meteor(page, 'getCompanyTags');
  state.tags = state.tags || {};
  for (const t of TAGS) {
    const found = existing.find((x) => x.name === t.name && !x.deleted);
    if (found) { state.tags[t.name] = found._id; continue; }
    await meteor(page, 'Tags.Create', t);
    const after = await meteor(page, 'getCompanyTags');
    state.tags[t.name] = after.find((x) => x.name === t.name)._id;
    log('tag', t.name);
  }
  await save();
  if (!state.projectTags) {
    for (const [name, tags] of Object.entries(PROJECT_TAGS)) {
      await call('POST', `/core/projects/${base.projects[name]}`, { tags: tags.map((t) => state.tags[t]) });
    }
    state.projectTags = true;
    await save();
    log('project tags');
  }

  // Legacy Portal project
  if (!state.legacyId) {
    const res = await call('POST', '/core/projects', { name: LEGACY });
    state.legacyId = res.projectId || res._id;
    await call('POST', `/core/projects/${state.legacyId}/architecture`,
      { content: 'Customer self-service portal of Example Corp, replaced step by step by the Webshop.' });
    await call('POST', `/core/projects/${state.legacyId}`, { tags: [state.tags.internal] });
    await save();
    log('project', LEGACY, state.legacyId);
  }
  const settingsUrl = `${BASE_URL}/projects/${state.legacyId}/settings`;

  // Modules through the Import dialog, so that the Imports tab lists them.
  state.imported = state.imported || [];
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ts-legacy-'));
  for (const m of LEGACY_MODULES) {
    if (state.imported.includes(m.name)) continue;
    const file = path.join(dir, `${m.name}.cdx.json`);
    await fs.writeFile(file, JSON.stringify(cyclonedx(m), null, 2));
    await page.goto(settingsUrl);
    await settle(page, 2500);
    await page.waitForSelector('.nav-tabs a[href="#ModuleImportTab"]', { state: 'attached', timeout: 60000 });
    await page.$eval('.nav-tabs a[href="#ModuleImportTab"]', (a) => a.click());
    await page.waitForTimeout(600);
    await page.click('#ModuleImportTab a[data-target="#ModuleImportModal"]');
    await page.waitForSelector('#ModuleImportModal', { state: 'visible' });
    await page.waitForTimeout(600);
    await page.setInputFiles('#ModuleImportModal input[type=file]', file);
    await page.fill('#ModuleImportModal #moduleName', m.name);
    await page.click('#ModuleImportModal button[type=submit]');
    await page.waitForSelector('#ModuleImportModal', { state: 'hidden', timeout: 60000 });
    state.imported.push(m.name);
    await save();
    log('imported', m.name);
    await page.waitForTimeout(3000);
  }
  await fs.rm(dir, { recursive: true, force: true });

  // Resolved obligations
  if (!state.obligations) {
    await call('POST', `/core/projects/${state.legacyId}`, { obligationConfig: OBLIGATIONS });
    state.obligations = true;
    await save();
    log('obligations');
  }

  // Default managers: Alex Morgan and Maria Garcia. Chris Taylor (manager and portfolio
  // manager) is then not an owner and sees most General fields read-only, but the
  // manager fields editable.
  if (!state.managers) {
    await page.goto(settingsUrl);
    await settle(page, 3000);
    const pick = async (name, label) => {
      const value = await page.$eval(`select[name="${name}"]`, (s, l) =>
        [...s.options].find((o) => o.textContent.trim() === l).value, label);
      await page.selectOption(`select[name="${name}"]`, value);
    };
    await pick('relatedUsers.defaultProjectManager', 'Alex Morgan');
    await pick('relatedUsers.defaultComplianceManager', 'Maria Garcia');
    await page.click('#updateProjectForm button[type=submit]');
    await settle(page, 1500);
    state.managers = true;
    await save();
    log('default managers');
  }
};
