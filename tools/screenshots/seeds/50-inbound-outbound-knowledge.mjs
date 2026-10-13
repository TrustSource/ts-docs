// Seed step for the Inbound, Outbound and Knowledge screenshots (docs/ce/02-inbound,
// 04-outbound, 05-knowledge, 14-component-manager, 15-legal-manager).
//
//   - A CWE assignment for the CodeQL rule java/unused-local-variable (CWE-563), so a test
//     page shows one badge in the assigned style. The Semgrep rule without a CWE stays
//     unassigned for the "Assign CWEs" state.
//   - A COTS component "Example Analytics Suite" by the fictional Acme Software Ltd., with
//     versions, descriptions, a license model and commercial terms.
//   - An SBOM file of the module webshop-backend with a few components cleared, so the
//     list and the TODOs Navigator show a completion between 0 and 100 percent.
//   - Two CSAF drafts: a security advisory and a VEX document.
//   - A project legal settings template with its requirements.
//   - An active open source policy that notifies no role, so nobody gets the
//     "New policy updates" dialog in other screenshots.
import fs from 'node:fs/promises';
import path from 'node:path';
import { BASE_URL, HERE } from '../lib.mjs';

const COTS = {
  name: 'Example Analytics Suite',
  key: 'cots:example-analytics-suite',
  versions: '7.2, 7.3, 8.0',
  homepage: 'https://www.example.com/analytics-suite',
  repository: 'https://downloads.example.com/analytics-suite',
  provider: 'Acme Software Ltd.',
  providerUrl: 'https://www.example.com/acme',
  providerAddress: '1 Example Street, London, United Kingdom',
  shortDescription: 'Commercial reporting and dashboard engine embedded in the order back office.',
  description: 'Licensed from Acme Software Ltd. under an annual subscription. Used for sales dashboards and scheduled PDF reports in the Webshop back office.',
  comment: 'Contract EX-2026-014, renewal every January. Redistribution to customers is not covered.',
  licenseModel: 'SEAT_BASED',
  terms: { RS: 'no', D: 'limited', SA: 'unlimited', M: 'no' },
};

const TEMPLATE = { name: 'SaaS product (default)', type: 'project', order: '1',
  requirements: { CA: 'CA_usage', OM: 'OM_SaaS', IP_protect: 'IP_protect_y', IP_enforce: 'IP_enforce_2' } };

const POLICY = { name: 'Open Source Policy 2026',
  description: 'Rules for selecting, using and distributing open source software at Example Corp. Applies to all projects from 1 November 2026.' };

const now = '2026-10-13T08:00:00.000Z';
const vendor = { category: 'vendor', name: 'Example Corp', namespace: 'https://www.example.com' };
const tracking = (id) => ({ id, status: 'draft', version: '0.1.0', initial_release_date: now, current_release_date: now,
  revision_history: [{ date: now, number: '0.1.0', summary: 'Initial draft.' }] });
const productTree = (pid, name, version) => ({ branches: [{ category: 'vendor', name: 'Example Corp', branches: [
  { category: 'product_name', name, branches: [{ category: 'product_version', name: version, product: { product_id: pid, name: `${name} ${version}` } }] }] }] });
const CSAF_DOCS = [
  { document: { category: 'csaf_security_advisory', csaf_version: '2.0', lang: 'en', title: 'Webshop Backend: remote code execution in log4j-core',
    publisher: vendor, distribution: { tlp: { label: 'WHITE' } }, tracking: tracking('EXC-SA-2026-001'),
    notes: [{ category: 'summary', text: 'Webshop Backend 2.4.0 ships log4j-core 2.14.1, which is affected by CVE-2021-44228 (Log4Shell). Version 2.4.1 upgrades log4j-core to 2.17.1.' }] },
    product_tree: productTree('EXC-WEBSHOP-BACKEND-2.4.0', 'Webshop Backend', '2.4.0'),
    vulnerabilities: [{ cve: 'CVE-2021-44228', product_status: { known_affected: ['EXC-WEBSHOP-BACKEND-2.4.0'] },
      remediations: [{ category: 'vendor_fix', details: 'Upgrade to Webshop Backend 2.4.1.', product_ids: ['EXC-WEBSHOP-BACKEND-2.4.0'] }] }] },
  { document: { category: 'csaf_vex', csaf_version: '2.0', lang: 'en', title: 'Payment Service 3.1.0: status of PyYAML and Jinja2 vulnerabilities',
    publisher: vendor, distribution: { tlp: { label: 'GREEN' } }, tracking: tracking('EXC-VEX-2026-002'),
    notes: [{ category: 'summary', text: 'Exploitability of known vulnerabilities in the dependencies of Payment Service 3.1.0.' }] },
    product_tree: productTree('EXC-PAYMENT-SERVICE-3.1.0', 'Payment Service', '3.1.0'),
    vulnerabilities: [
      { cve: 'CVE-2020-14343', product_status: { known_not_affected: ['EXC-PAYMENT-SERVICE-3.1.0'] },
        flags: [{ label: 'vulnerable_code_not_in_execute_path', product_ids: ['EXC-PAYMENT-SERVICE-3.1.0'] }] },
      { cve: 'CVE-2024-22195', product_status: { under_investigation: ['EXC-PAYMENT-SERVICE-3.1.0'] } },
    ] },
];

const docs = (page, collection) => page.evaluate((c) => {
  const M = window.Meteor || window.Package.meteor.Meteor;
  const col = M.connection._mongo_livedata_collections[c];
  return col ? col.find().fetch().map((d) => ({ ...d, _id: d._id && d._id._str ? d._id._str : d._id })) : [];
}, collection);

// Client-side navigation: a full page load resumes the login, and the server allows only
// 20 logins per minute and IP, which parallel capture runs use up quickly.
async function go(page, settle, url, wait = 2500) {
  const routed = await page.evaluate((u) => {
    const R = window.Router || (window.Package && window.Package['iron:router'] && window.Package['iron:router'].Router);
    if (!R || !(window.Meteor && window.Meteor.userId())) return false;
    R.go(u);
    return true;
  }, url).catch(() => false);
  if (!routed) await page.goto(BASE_URL + url);
  await settle(page, wait);
}

// A one-page PDF for the policy document.
function policyPdf() {
  const lines = ['Open Source Policy 2026', '', 'Example Corp', '', '1. Every open source component is recorded in TrustSource CE.',
    '2. Strong copyleft licenses need approval by the compliance manager.', '3. Components with known critical vulnerabilities are not released.',
    '', 'Example document for the TrustSource CE documentation.'];
  const text = lines.map((l, i) => `BT /F1 ${i ? 12 : 20} Tf 72 ${760 - i * 22} Td (${l}) Tj ET`).join('\n');
  const objs = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${text.length} >>\nstream\n${text}\nendstream`, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
  let out = '%PDF-1.4\n';
  const offsets = [];
  objs.forEach((o, i) => { offsets.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offsets.map((o) => String(o).padStart(10, '0') + ' 00000 n \n').join('');
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(out, 'latin1');
}

export default async ({ page, base, state, save, meteor, log, settle }) => {
  // CWE assignment for a CodeQL rule without a CWE.
  if (!state.cweMapping) {
    await go(page, settle, '/tests');
    await meteor(page, 'CweMappings.Set', { tool: 'CodeQL', ruleId: 'java/unused-local-variable', cwes: ['CWE-563'] });
    state.cweMapping = true;
    await save();
    log('CWE-563 assigned to CodeQL java/unused-local-variable');
  }

  // COTS component, created and edited through the UI as a component manager would.
  if (!state.cotsId) {
    // The list is a server-side table: the id is read from the address of the component page.
    const findCots = async () => {
      await go(page, settle, '/cots_components');
      const row = page.locator('tbody tr').filter({ hasText: COTS.name }).first();
      if (!(await row.count())) return null;
      await row.click();
      await settle(page, 1500);
      const m = page.url().match(/\/cots_components\/([^/?#]+)/);
      return m ? { _id: m[1] } : null;
    };
    let found = await findCots();
    if (!found) {
      await go(page, settle, '/cots_components');
      await page.locator('[data-target="#createCOTSModule"]').first().click();
      await page.waitForTimeout(800);
      await page.fill('#componentName', COTS.name);
      await page.fill('#componentKey', COTS.key);
      await page.fill('#componentVersions', COTS.versions);
      await page.fill('#componentHomepage', COTS.homepage);
      await page.fill('#componentRepository', COTS.repository);
      await page.locator('#createCOTSModuleForm button[type=submit]').click();
      await page.waitForTimeout(2500);
      found = await findCots();
    }
    if (!found) throw new Error('COTS component was not created');
    await go(page, settle, `/management/cots_components/${found._id}/edit`, 3000);
    for (const f of ['provider', 'providerUrl', 'providerAddress', 'shortDescription', 'description', 'comment']) {
      const el = page.locator('#' + f).first();
      await el.fill(COTS[f]);
      await el.blur();
      await page.waitForTimeout(400);
    }
    await page.locator(`[name="licenseModel"][value="${COTS.licenseModel}"]`).first().check();
    await page.waitForTimeout(500);
    for (const [k, v] of Object.entries(COTS.terms)) {
      await page.locator(`[name="commercialTerms.${k}"][value="${v}"]`).first().check();
      await page.waitForTimeout(500);
    }
    state.cotsId = found._id;
    await save();
    log('COTS component', COTS.name, found._id);
  }

  // The license model is set on a freshly loaded page: right after the text fields its
  // store can be overwritten by the pending ones.
  if (!state.cotsModel) {
    await go(page, settle, `/management/cots_components/${state.cotsId}/edit`, 3000);
    await page.locator(`[name="licenseModel"][value="${COTS.licenseModel}"]`).first().click();
    await page.waitForTimeout(1500);
    await go(page, settle, `/management/cots_components/${state.cotsId}/edit`, 3000);
    state.cotsModel = await page.locator(`[name="licenseModel"][value="${COTS.licenseModel}"]`).first().isChecked();
    await save();
    log('COTS license model', state.cotsModel);
  }

  // SBOM file of one module, partly cleared.
  if (!state.sbomFileId) {
    await go(page, settle, '/reports/sbom');
    const before = new Set((await docs(page, 'sbomFiles')).map((d) => d._id));
    await meteor(page, 'SbomFiles.Create', { projectId: base.projects.Webshop, moduleId: base.scans['webshop-backend'].moduleId });
    await page.waitForTimeout(2500);
    const created = (await docs(page, 'sbomFiles')).find((d) => !before.has(d._id));
    if (!created) throw new Error('SBOM file was not created');
    state.sbomFileId = created._id;
    await save();
    log('SBOM file', created._id);
  }
  if (!state.sbomCleared) {
    await go(page, settle, `/reports/sbom/${state.sbomFileId}/details`, 3000);
    // Clear four components with the "cleared" checkbox of the component list.
    let cleared = 0;
    for (const n of ['commons-collections', 'hibernate-core', 'jackson-databind', 'log4j-api']) {
      const box = page.locator('.panel_with_component').filter({ has: page.locator('h4', { hasText: n + ' (' }) })
        .locator('.on_update_complete').first();
      if (await box.count()) { await box.check(); cleared++; await page.waitForTimeout(1000); }
    }
    state.sbomCleared = cleared;
    await save();
    log('SBOM components cleared');
  }

  // CSAF drafts.
  state.csaf = state.csaf || {};
  if (Object.keys(state.csaf).length < CSAF_DOCS.length) await go(page, settle, '/csaf');
  for (const doc of CSAF_DOCS) {
    const title = doc.document.title;
    if (state.csaf[title]) continue;
    const file = JSON.stringify(doc);
    await meteor(page, 'CSAF.Validate', { file });
    const res = await meteor(page, 'CSAF.CreateOrUpdate', { $set: { data: file } });
    state.csaf[title] = (res && (res._id || res.id || res)) || true;
    await save();
    log('CSAF draft', title);
  }

  // Project legal settings template.
  if (!state.templateId) {
    await go(page, settle, '/settings/company/legal_templates');
    let t = (await docs(page, 'legalSettingsTemplates')).find((d) => d.name === TEMPLATE.name);
    if (!t) {
      await page.locator('.showCreateTemplate').first().click();
      await page.waitForTimeout(800);
      await page.fill('#templateName', TEMPLATE.name);
      await page.selectOption('#templateType', TEMPLATE.type);
      await page.fill('#templateOrder', TEMPLATE.order);
      await page.locator('#createTemplateForm button[type=submit]').click();
      await page.waitForTimeout(2500);
      t = (await docs(page, 'legalSettingsTemplates')).find((d) => d.name === TEMPLATE.name);
    }
    if (!t) throw new Error('legal template was not created');
    await meteor(page, '_updateCompanyLegalSettingsTemplate', { $set: { requirements: TEMPLATE.requirements } }, t._id);
    state.templateId = t._id;
    await save();
    log('legal template', t._id);
  }

  // Active open source policy without notifications.
  if (!state.policyId) {
    await go(page, settle, '/policy', 4000);
    let p = (await docs(page, 'policy')).find((d) => d.name === POLICY.name);
    if (!p) {
      const file = path.join(HERE, '.cache', 'open-source-policy-2026.pdf');
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, policyPdf());
      await page.locator('.showCreatePolicy').first().click();
      await page.waitForTimeout(1000);
      await page.fill('#policyName', POLICY.name);
      await page.setInputFiles('#policyDocument', file);
      await page.fill('#policyDescription', POLICY.description);
      await page.locator('#createPolicyForm button[type=submit]').click();
      await page.waitForTimeout(4000);
      p = (await docs(page, 'policy')).find((d) => d.name === POLICY.name);
    }
    if (!p) throw new Error('policy was not created');
    await meteor(page, '_updatePolicy', { _id: p._id, modifier: { $set: { name: POLICY.name, description: POLICY.description, notify: [], active: true } } });
    state.policyId = p._id;
    await save();
    log('policy', p._id);
  }
};
