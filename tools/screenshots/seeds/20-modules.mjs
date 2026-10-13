// Seed step for the module screenshots (docs/ce/03-internal/02-modules and related recipes).
//
// Module settings entries on webshop-backend, made as Alex Morgan with the methods the
// settings tabs call (or the REST module update): description, architecture, default
// managers and a tag; a capability; allow/deny entries for licenses and components; an
// allowed vulnerability; resolved obligations; two custom components; an SPDX export;
// managed crypto algorithms marked as in use with comments. The company denies DES and
// SHA-1, so the All bad crypto report shows violations. payment-service gets a second,
// manually managed AI artifact. Payment Service gets an infrastructure module (NGINX
// 1.26.0 from the Infrastructure Elements catalog), created the way the Add/link dialog
// creates it, with viability, versioning and end-of-life analyses switched on. No analysis of
// the seeded modules is re-run, so their results stay as they are.
import { BASE_URL } from '../lib.mjs';

const ALEX = 'alex.morgan@example.com';

async function alexPage(browser, newContext, log) {
  for (let i = 0; i < 6; i++) {
    try {
      const { ctx, page } = await newContext(browser, { email: ALEX });
      return { ctx, page };
    } catch (e) {
      log('login retry', e.message.split('\n')[0]);
      await new Promise((r) => setTimeout(r, 8000));
    }
  }
  throw new Error('could not log in as Alex');
}

export default async ({ browser, call, base, state, save, meteor, log, newContext, settle }) => {
  const WB = base.scans['webshop-backend'].moduleId;
  const PS = base.scans['payment-service'].moduleId;
  const { ctx, page } = await alexPage(browser, newContext, log);
  await page.goto(`${BASE_URL}/projects/${base.projects.Webshop}/modules/${WB}/settings`);
  await settle(page, 2500);

  // General: description, architecture, default managers, tag.
  if (!state.general) {
    const ids = await page.evaluate(() => {
      const pick = (sel, text) => [...document.querySelectorAll(`${sel} option`)].find((o) => o.textContent.trim() === text)?.value;
      return {
        alex: pick('select[name="relatedUsers.defaultProjectManager"]', 'Alex Morgan'),
        maria: pick('select[name="relatedUsers.defaultComplianceManager"]', 'Maria Garcia'),
        tag: pick('select[name="tags"]', 'customer-facing'),
      };
    });
    const mod = await call('GET', `/core/modules/${WB}`);
    const body = {
      description: 'REST services of the Webshop: catalogue, cart, orders and customer accounts.',
      properties: { ...(mod.properties || {}), architectureType: 'BES' },
      relatedUsers: { defaultProjectManager: ids.alex, defaultComplianceManager: ids.maria },
    };
    if (ids.tag) body.tags = [ids.tag];
    await call('POST', `/core/modules/${WB}`, body);
    state.general = true;
    await save();
    log('general');
  }

  // Allow/Deny and allowed vulnerability (REST replaces each config as a whole).
  if (!state.lists) {
    const mod = await call('GET', `/core/modules/${WB}`);
    const cc = mod.componentConfig || {};
    await call('POST', `/core/modules/${WB}`, {
      licenseConfig: {
        whitelist: [{ key: 'LGPL-2.1-only', comment: 'Hibernate is used unmodified as a library; obligations are met by the notice file.' }],
        blacklist: [{ key: 'AGPL-3.0-only', comment: 'Not allowed in the Webshop backend.' }],
      },
      componentConfig: {
        ...cc,
        whitelist: [{ key: 'maven:mysql:mysql-connector-java', version: '8.0.*', comment: 'Covered by the commercial MySQL license of Example Corp.' }],
        blacklist: [{ key: 'maven:commons-collections:commons-collections', version: '3.2.1', comment: 'Unsafe deserialization. Use commons-collections4.' }],
      },
      cveConfig: {
        whitelist: [{ cveKey: 'CVE-2022-22965', key: 'maven:org.springframework:spring-beans', version: '5.3.17',
          comment: 'Not exploitable: the service runs as a JAR with embedded Tomcat, not as a WAR.' }],
        blacklist: [],
      },
      obligationConfig: [
        { obligationKey: 'O4', comment: 'License texts are shipped in the NOTICE file of every Webshop release.' },
        { obligationKey: 'O5', comment: 'Copyright notices are listed in the NOTICE file.' },
      ],
    });
    state.lists = true;
    await save();
    log('allow/deny, allowed vulnerability, obligations');
  }

  // Capability.
  if (!state.capability) {
    const found = await meteor(page, 'Capabilities.Find', { moduleId: WB });
    if (!(found || []).some((c) => c.name === 'Guest checkout')) {
      await meteor(page, 'Capabilities.Create', { moduleId: WB, name: 'Guest checkout', version: '2.3.0',
        description: 'Customers can place an order without creating an account.' });
    }
    state.capability = true;
    await save();
    log('capability');
  }

  // Custom components, as the Add component dialog stores them.
  if (!state.customComponents) {
    const comps = [
      { name: 'commons-text', key: 'maven:org.apache.commons:commons-text', license: 'Apache-2.0', version: '1.9',
        description: 'Apache Commons Text is a library focused on algorithms working on strings.' },
      { name: 'h2', key: 'maven:com.h2database:h2', license: 'MPL-2.0', version: '1.4.199',
        description: 'H2 Database Engine' },
    ];
    for (const c of comps) {
      await meteor(page, 'Modules.UpdateCustomComponents', WB, { $push: { customComponents: {
        name: c.name, key: c.key, description: c.description, licenses: [{ name: c.license }],
        homepageUrl: null, repoUrl: null, dependencies: [], versions: [c.version] } } });
    }
    state.customComponents = true;
    await save();
    log('custom components');
  }

  // Managed crypto algorithms: in use, with comments; company denies DES and SHA-1.
  if (!state.crypto) {
    const managed = await meteor(page, 'CryptoProperties.Find', { moduleId: WB });
    const notes = {
      DES: { used: true, comment: 'LegacyTokenService, replace with AES-GCM.' },
      'SHA-1': { used: true, comment: 'Legacy checksums of exported files.' },
      RSA: { used: true, comment: 'Signature of payment provider callbacks.' },
    };
    for (const m of managed) {
      if (notes[m.name]) await meteor(page, 'CryptoProperties.Update', { $set: notes[m.name] }, m._id);
    }
    for (const [key, comment] of [['DES', 'Broken: 56-bit key.'], ['SHA-1', 'Collisions are practical; not for signatures or integrity.']]) {
      await meteor(page, 'blacklistedAlgorithms.add', { key, strength: '', comment });
    }
    state.crypto = true;
    await save();
    log('crypto');
  }

  // SPDX export (generated in the background).
  if (!state.spdx) {
    await meteor(page, 'SPDXExports.Create', { moduleId: WB });
    state.spdx = true;
    await save();
    log('spdx export');
  }

  // payment-service: comment on the imported model, and a model added by hand.
  if (!state.ai) {
    const list = await meteor(page, 'AiProperties.Find', { moduleId: PS });
    const fraud = (list || []).find((a) => a.name === 'fraud-scoring-model');
    if (fraud) await meteor(page, 'AiProperties.Update', { $set: { comment: 'Retrained monthly on anonymised transactions.' } }, fraud._id);
    if (!(list || []).some((a) => a.name === 'chargeback-classifier')) {
      await meteor(page, 'AiProperties.Create', { moduleId: PS, created: new Date(), name: 'chargeback-classifier', version: '1.0',
        provider: 'Example Corp', task: 'text-classification', modelFamily: 'transformer', architecture: 'DistilBERT',
        purl: 'pkg:huggingface/example-corp/chargeback-classifier@1.0', comment: 'Sorts chargeback reasons for the disputes team.' });
    }
    state.ai = true;
    await save();
    log('ai');
  }

  // Infrastructure module NGINX 1.26.0 in Payment Service, as the Add/link dialog creates it.
  if (!state.nginx) {
    const projectId = base.projects['Payment Service'];
    const id = await page.evaluate(async (projectId) => {
      const [c] = await Meteor.callAsync('searchInfrastructureComponents', 'NGINX');
      let module = {
        companyId: Meteor.user().profile.companyId, name: c.name, moduleIdentifier: 'nginx', projectId,
        viabilityConfig: { warningThreshold: 1, violationThreshold: 1, minConfidence: 1, noInfoLevel: 1 },
        versioningConfig: { jump: true, warningThreshold: 3, violationThreshold: 1 },
        componentConfig: { looseCoupled: [], unchanged: [], changedStatus: [], whitelist: [], blacklist: [] },
        version: '1.26.0',
        properties: { architectureType: 'IS', privacy: 'opensource', architecture: 'infrastructureModule' },
        commercialTerms: c.commercialTerms || null,
        infrastructureComponent: { key: c.key, version: '1.26.0', public: true },
        urls: c.urls,
      };
      module = await Meteor.callAsync('setModuleRelatedUsers', Meteor.userId(), module);
      return Meteor.callAsync('Modules.Create', module);
    }, projectId);
    state.nginx = id;
    await save();
    log('nginx module', id);
  }

  // Viability, versioning and end-of-life analyses switched on for NGINX, so their tabs show
  // the sliders. (Switching them on re-analyses the module; NGINX is the module this step owns.)
  if (!state.nginxAnalyses) {
    const id = state.nginx;
    await meteor(page, 'Modules.UpdateViabilityConfig', id, { enabled: true, warningThreshold: 2, violationThreshold: 1, minConfidence: 2, noInfoLevel: 1 });
    await meteor(page, 'Modules.UpdateVersioningConfig', id, { enabled: true, jump: true, warningThreshold: 3, violationThreshold: 1 });
    await meteor(page, 'Modules.UpdateEndoflifePolicy', id, { enabled: true, warningThreshold: 12, violationThreshold: 3 });
    await meteor(page, 'Modules.AnalyzeWithoutScan', id);
    state.nginxAnalyses = true;
    await save();
    log('nginx analyses');
  }

  await ctx.close();
};
