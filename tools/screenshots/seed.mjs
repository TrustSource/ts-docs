// Fills a fresh TrustSource CE installation with the example data the screenshots show.
// Run once against an empty installation: TS_PASSWORD=... node seed.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { BASE_URL, HERE, launch, newContext, settle } from './lib.mjs';
import sharp from 'sharp';
import { PROJECTS, SARIF, FRONTEND_UPDATE, cyclonedx } from './fixtures.mjs';

const STATE = path.join(HERE, '.seed.json');
const ALL_SCOPES = ['developer', 'manager', 'compliance_manager', 'portfolio_manager', 'account_admin',
  'company_component_manager', 'company_security_manager'];

const log = (...a) => console.log('[seed]', ...a);

// Calls a Meteor method in the logged-in page.
export async function meteor(page, method, ...args) {
  const res = await page.evaluate(async ([m, a]) => {
    const M = window.Meteor || (window.Package && window.Package.meteor.Meteor);
    try { return { ok: await M.callAsync(m, ...a) }; } catch (e) { return { error: `${e.error || ''} ${e.reason || e.message}` }; }
  }, [method, args]);
  if (res.error) throw new Error(`${method}: ${res.error}`);
  return res.ok;
}

async function loadState() {
  try { return JSON.parse(await fs.readFile(STATE, 'utf8')); } catch { return {}; }
}
async function saveState(state) {
  await fs.writeFile(STATE, JSON.stringify(state, null, 2), { mode: 0o600 });
}

function api(key) {
  return async (method, url, body, { form } = {}) => {
    const headers = { 'x-api-key': key, 'User-Agent': 'ts-docs-screenshots/1.0' };
    let payload;
    if (form) payload = form;
    else if (body !== undefined) { headers['Content-Type'] = 'application/json'; payload = JSON.stringify(body); }
    const res = await fetch(BASE_URL + '/api/v2' + url, { method, headers, body: payload });
    const text = await res.text();
    let data; try { data = JSON.parse(text); } catch { data = text; }
    if (!res.ok) throw new Error(`${method} ${url} -> ${res.status} ${text.slice(0, 300)}`);
    return data;
  };
}

async function ensureApiKey(page, state) {
  if (state.apiKey) return state.apiKey;
  const created = await meteor(page, 'apiKey.create', { name: 'Release pipeline', scope: ALL_SCOPES, requestId: 'seed-' + Date.now() });
  await meteor(page, 'apiKey.update', { ...created, published: true, unpublished: false });
  state.apiKey = await meteor(page, 'apiKey.reveal', created.id);
  state.apiKeyId = created.id;
  await saveState(state);
  log('API key created');
  return state.apiKey;
}

async function dismissTour(page) {
  const cancel = page.locator('button:has-text("Cancel")').first();
  if (await cancel.isVisible().catch(() => false)) await cancel.click();
}

async function loadDemo(page, state) {
  if (state.demo) return;
  await page.goto(BASE_URL + '/dashboard');
  await settle(page, 1500);
  await dismissTour(page);
  const btn = page.locator('button:has-text("Load demo project"), a:has-text("Load demo project")').first();
  if (await btn.isVisible().catch(() => false)) {
    await btn.click();
    await page.waitForTimeout(5000);
    log('demo project loaded');
  }
  state.demo = true;
  await saveState(state);
}

async function seedProjects(call, state) {
  state.projects = state.projects || {};
  state.scans = state.scans || {};
  for (const p of PROJECTS) {
    if (!state.projects[p.name]) {
      const res = await call('POST', '/core/projects', { name: p.name });
      state.projects[p.name] = res._id || res.projectId || res.id;
      await call('POST', `/core/projects/${state.projects[p.name]}/architecture`, { content: p.description }).catch((e) => log('architecture:', e.message));
      log('project', p.name, state.projects[p.name]);
    }
    for (const m of p.modules) {
      if (state.scans[m.name]) continue;
      const q = new URLSearchParams({ project: p.name, module: m.name, branch: 'main', tag: 'v' + m.root.purl.split('@')[1] });
      const res = await call('POST', '/core/imports/scan/cyclonedx?' + q, cyclonedx(m));
      state.scans[m.name] = res;
      log('module', m.name, res.scanId, res.warning || '');
    }
    await saveState(state);
  }
}

// Fictional team. The screenshots are taken as Alex Morgan, who holds every role except
// Developer, so the header does not carry the all-roles warning of the initial admin.
export const TEAM = [
  { name: 'Alex Morgan', email: 'alex.morgan@example.com', enroll: true,
    roles: ['account_admin', 'manager', 'compliance_manager', 'portfolio_manager', 'company_component_manager', 'company_security_manager'] },
  { name: 'Sam Lee', email: 'sam.lee@example.com', enroll: true, roles: ['developer'] },
  { name: 'Maria Garcia', email: 'maria.garcia@example.com', enroll: true, roles: ['compliance_manager'] },
  { name: 'Chris Taylor', email: 'chris.taylor@example.com', enroll: true, roles: ['manager', 'portfolio_manager'] },
  { name: 'Jordan Kim', email: 'jordan.kim@example.com', roles: ['developer'] },
  // Removed from Example Corp again: without a company, the first login creates a new,
  // empty one. The "first login" and "new company" screenshots are taken as Robin.
  { name: 'Robin Fischer', email: 'robin.fischer@example.com', enroll: true, detach: true, roles: ['developer'] },
];
const MAILPIT = process.env.TS_MAILPIT_URL || 'http://localhost:8125';

async function enrollmentLink(email) {
  for (let i = 0; i < 20; i++) {
    const res = await fetch(`${MAILPIT}/api/v1/search?query=${encodeURIComponent('to:' + email)}`).then((r) => r.json());
    const msg = res.messages && res.messages[0];
    if (msg) {
      const full = await fetch(`${MAILPIT}/api/v1/message/${msg.ID}`).then((r) => r.json());
      const m = (full.Text || full.HTML || '').match(/https?:\/\/[^\s"'<>]*enroll[^\s"'<>]*/i);
      if (m) return m[0];
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error('No enrollment mail for ' + email);
}

async function seedTeam(browser, page, state) {
  state.team = state.team || {};
  for (const u of TEAM) {
    if (state.team[u.email]) continue;
    await meteor(page, 'inviteUser', u.name, u.email, u.roles).catch((e) => log('invite', u.email, e.message));
    let password = null;
    if (u.enroll) {
      const link = (await enrollmentLink(u.email)).replace(/^https?:\/\/[^/]+/, BASE_URL);
      password = 'Docs-' + Math.random().toString(36).slice(2) + '-' + Math.random().toString(36).slice(2);
      const ctx = await browser.newContext();
      const p = await ctx.newPage();
      await p.goto(link);
      await settle(p, 1500);
      await p.locator('#password').fill(password);
      await p.locator('#password_repeat').fill(password);
      await p.getByRole('button', { name: 'Create Account' }).click();
      await p.waitForTimeout(3000);
      await ctx.close();
    }
    if (u.detach) {
      await page.goto(BASE_URL + '/settings/company/users');
      await settle(page, 2000);
      const ids = await page.evaluate((email) => {
        const M = window.Meteor || window.Package.meteor.Meteor;
        const user = M.users.findOne({ $or: [{ 'emails.address': email }, { 'profile.email': email }] });
        return { userId: user && user._id, companyId: M.user().profile.companyId };
      }, u.email);
      await meteor(page, 'Users.Remove', ids.userId, ids.companyId);
    }
    state.team[u.email] = { name: u.name, password };
    await saveState(state);
    log('user', u.email, u.enroll ? 'enrolled' : 'invited');
  }
}

const PROJECT_SETTINGS = {
  Webshop: { requirements: { CA: 'CA_license', OM: 'OM_sw', IP_protect: 'IP_protect_y', IP_enforce: 'IP_enforce_2' },
    ciaRequirements: { CR: 'H', IR: 'H', AR: 'M' }, autoCreateCweRisks: true,
    endoflifePolicy: { enabled: true, warningThreshold: 6, violationThreshold: 0 } },
  'Mobile App': { requirements: { CA: 'CA_license', OM: 'OM_dis', IP_protect: 'IP_protect_n', IP_enforce: 'IP_enforce_1' },
    ciaRequirements: { CR: 'M', IR: 'M', AR: 'L' } },
  'Payment Service': { requirements: { CA: 'CA_usage', OM: 'OM_SaaS', IP_protect: 'IP_protect_n', IP_enforce: 'IP_enforce_1' },
    ciaRequirements: { CR: 'H', IR: 'H', AR: 'H' } },
};

async function seedSettings(call, state) {
  if (state.settings) return;
  for (const [name, body] of Object.entries(PROJECT_SETTINGS)) {
    await call('POST', `/core/projects/${state.projects[name]}`, body).catch((e) => log('settings', name, e.message));
  }
  // Analyses that ran before the settings existed are repeated with them.
  for (const scan of Object.values(state.scans)) await call('POST', `/core/scans/${scan.scanId}/reprocess`);
  state.settings = true;
  await saveState(state);
  log('project settings');
}

async function seedTests(call, state) {
  if (state.tests) return;
  for (const t of SARIF) {
    const q = new URLSearchParams({ projectName: t.project, moduleName: t.module, branch: 'main' });
    await call('POST', '/core/tests/sarif?' + q, t.doc);
  }
  state.tests = true;
  await saveState(state);
  log('SARIF tests');
}

async function seedUpdateScan(call, state) {
  if (state.scans['webshop-frontend@2.5.0']) return;
  const q = new URLSearchParams({ project: 'Webshop', module: FRONTEND_UPDATE.name, branch: 'main', tag: 'v2.5.0' });
  state.scans['webshop-frontend@2.5.0'] = await call('POST', '/core/imports/scan/cyclonedx?' + q, cyclonedx(FRONTEND_UPDATE));
  await call('POST', `/core/scans/${state.scans['webshop-frontend@2.5.0'].scanId}/binaryLinks`, { binaryLinks: [
    { name: 'https://artifacts.example.com/webshop/webshop-frontend-2.5.0.tgz', comment: 'npm package' },
    { name: 'https://registry.example.com/webshop/frontend:2.5.0', comment: 'Container image' },
  ] });
  await saveState(state);
  log('update scan');
}

async function waitForAnalysis(call, scanId) {
  for (let i = 0; i < 60; i++) {
    const s = await call('GET', `/core/scans/${scanId}`);
    if (s.analysisStatus === 'Finished') return s;
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error('analysis did not finish for ' + scanId);
}

// Approval requests as a release pipeline would send them; a compliance manager decides
// on them in the app afterwards (see decideApprovals).
const APPROVALS = [
  { scan: 'webshop-frontend', name: 'Webshop Frontend', version: '2.4.0', decision: 'approve' },
  { scan: 'payment-service', name: 'Payment Service', version: '3.1.0', decision: 'approve' },
  { scan: 'mobile-app', name: 'Mobile App', version: '1.8.2', decision: 'reject',
    reason: 'node-forge 0.10.0 has open critical vulnerabilities. Upgrade to 1.3.0 or later and request again.' },
  { scan: 'webshop-frontend@2.5.0', name: 'Webshop Frontend', version: '2.5.0' },
  { scan: 'webshop-backend', name: 'Webshop Backend', version: '2.4.0' },
];

async function seedApprovals(call, state) {
  state.approvals = state.approvals || {};
  for (const a of APPROVALS) {
    const key = a.name + ' ' + a.version;
    if (state.approvals[key]) continue;
    const scanId = state.scans[a.scan].scanId;
    await waitForAnalysis(call, scanId);
    const res = await call('POST', '/compliance/approvals', { scanId, name: a.name, version: a.version });
    state.approvals[key] = { id: res.approveId, ...a };
    await saveState(state);
    log('approval', key, JSON.stringify(res).slice(0, 80));
  }
}

async function decideApprovals(browser, state) {
  const todo = Object.entries(state.approvals).filter(([, a]) => a.decision && !a.decided);
  if (!todo.length) return;
  const { ctx, page } = await newContext(browser, { email: 'maria.garcia@example.com' });
  await settle(page, 1500);
  for (const [key, a] of todo) {
    // Approval documents are generated in the background after the request.
    await new Promise((r) => setTimeout(r, 5000));
    if (a.decision === 'approve') await meteor(page, 'Approves.Approve', a.id);
    else await meteor(page, 'Approves.Reject', a.id, a.reason);
    a.decided = true;
    await saveState(state);
    log(a.decision, key);
  }
  await ctx.close();
}

// Simple product pictures, drawn here so no third-party images end up in the docs.
async function productPhoto(file, { label, body, accent }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6f8"/><stop offset="1" stop-color="#dfe5ea"/></linearGradient></defs>
    <rect width="1200" height="900" fill="url(#g)"/>
    <ellipse cx="600" cy="700" rx="330" ry="40" fill="#c5cdd4"/>
    ${body}
    <circle cx="600" cy="560" r="14" fill="${accent}"/>
    <text x="600" y="830" font-family="Helvetica, Arial, sans-serif" font-size="40" fill="#5a6772" text-anchor="middle">${label}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(file);
}

function tinyPdf(title, lines) {
  const text = [title, '', ...lines].map((l, i) => `BT /F1 ${i ? 12 : 20} Tf 72 ${760 - i * 22} Td (${l.replace(/[()\\]/g, '')}) Tj ET`).join('\n');
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${text.length} >>\nstream\n${text}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];
  let out = '%PDF-1.4\n';
  const offsets = [];
  objs.forEach((o, i) => { offsets.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offsets.map((o) => String(o).padStart(10, '0') + ' 00000 n \n').join('');
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(out, 'latin1');
}

const PRODUCTS = [
  { identifier: 'SH', type: 'family', name: 'Smart Home', description: 'Connected home products of Example Corp.' },
  { identifier: 'SH-HUB', type: 'variant', name: 'Home Hub X1', parentId: 'SH', classification: 'IMPORTANT_1',
    description: 'Central hub that connects lights, sensors and thermostats and is controlled by the mobile app.',
    features: 'Zigbee and Wi-Fi gateway, local automation rules, remote access through the mobile app, over-the-air updates.',
    contacts: { registeredTradeName: 'Example Corp', manufacturerName: 'Example Corp GmbH', manufacturerAddress: 'Musterstrasse 1, 10115 Berlin, Germany',
      manufacturerWebsite: 'https://www.example.com', productSecurityContact: 'security@example.com', productSecurityWeblink: 'https://www.example.com/security' },
    support: [
      { name: 'Security updates', description: 'Security updates for firmware and companion app.', endDate: '2031-12-31' },
      { name: 'Hardware warranty', description: 'Repair or replacement of defective devices.', endDate: '2028-06-30' },
    ],
    misuse: [
      { name: 'Exposing the hub to the internet', description: 'Port forwarding the local web interface to the internet bypasses the cloud access controls.' },
      { name: 'Using default credentials', description: 'Keeping the initial setup PIN allows anyone on the local network to pair new devices.' },
    ],
    solutions: ['Webshop Frontend 2.4.0', 'Payment Service 3.1.0'],
    photos: [
      { label: 'Home Hub X1 - front', accent: '#1aa29b', body: '<rect x="380" y="300" width="440" height="380" rx="60" fill="#ffffff" stroke="#9aa7b1" stroke-width="6"/>' },
      { label: 'Home Hub X1 - side', accent: '#1aa29b', body: '<rect x="520" y="300" width="160" height="380" rx="40" fill="#ffffff" stroke="#9aa7b1" stroke-width="6"/>' },
      { label: 'Home Hub X1 - with sensor', accent: '#f0a330', body: '<rect x="300" y="320" width="380" height="340" rx="56" fill="#ffffff" stroke="#9aa7b1" stroke-width="6"/><circle cx="820" cy="560" r="90" fill="#ffffff" stroke="#9aa7b1" stroke-width="6"/>' },
    ],
    documents: { userManual: 'home-hub-x1-user-manual.pdf', secureSetup: 'home-hub-x1-secure-setup.pdf' } },
  { identifier: 'SH-SENSOR', type: 'variant', name: 'Window Sensor S2', parentId: 'SH', classification: 'STANDARD',
    description: 'Battery powered door and window contact sensor.' },
  { identifier: 'SH-CAM', type: 'variant', name: 'Indoor Camera C1', parentId: 'SH', classification: 'IMPORTANT_1',
    description: 'Indoor security camera, discontinued.', retire: 'Replaced by Indoor Camera C2. Security updates ended.' },
  { identifier: 'SH-APP', type: 'variant', name: 'Smart Home App', parentId: 'SH', classification: 'STANDARD',
    description: 'Mobile app for iOS and Android.' },
];

async function seedProducts(call, state) {
  state.products = state.products || {};
  const dir = path.join(HERE, '.cache');
  await fs.mkdir(dir, { recursive: true });
  for (const p of PRODUCTS) {
    if (state.products[p.identifier]) continue;
    const created = await call('POST', '/core/products', { type: p.type, identifier: p.identifier, name: p.name, description: p.description, parentId: p.parentId });
    const id = created._id;
    const update = {};
    for (const f of ['classification', 'contacts', 'features']) if (p[f]) update[f] = p[f];
    if (Object.keys(update).length) await call('POST', `/core/products/${id}`, update);
    for (const s of p.support || []) await call('POST', `/core/products/${id}/support`, s);
    for (const m of p.misuse || []) await call('POST', `/core/products/${id}/misuse`, m);
    for (const key of p.solutions || []) {
      const a = state.approvals[key];
      await call('POST', `/core/products/${id}/solution`, { approvalId: a.id, name: a.name, version: a.version, closedByName: 'Maria Garcia' })
        .catch((e) => log('solution', key, e.message));
    }
    for (const [i, photo] of (p.photos || []).entries()) {
      const file = path.join(dir, `${p.identifier}-${i + 1}.jpg`);
      await productPhoto(file, photo);
      const form = new FormData();
      form.append('file', new Blob([await fs.readFile(file)], { type: 'image/jpeg' }), path.basename(file));
      await call('POST', `/core/products/${id}/photo`, undefined, { form });
    }
    for (const [type, name] of Object.entries(p.documents || {})) {
      const form = new FormData();
      form.append('documentType', type);
      form.append('file', new Blob([tinyPdf(p.name, [type === 'userManual' ? 'User manual' : 'Secure setup guide', 'Example document for the TrustSource CE documentation.'])], { type: 'application/pdf' }), name);
      await call('POST', `/core/products/${id}/document`, undefined, { form });
    }
    if (p.retire) await call('POST', `/core/products/${id}/retire`, { retiredReason: p.retire });
    state.products[p.identifier] = id;
    await saveState(state);
    log('product', p.name);
  }
}

const RISKS = [
  { project: 'Webshop', name: 'Customer data exposed through SQL injection', properties: {
    origin: ['SDLC', 'CWE'], state: 'implementing', impactClass: 'high', impactDescription: 'Order and address data of all customers could be read.',
    confidentiality: true, integrity: true,
    threatModelContext: { strideCategories: ['Information Disclosure', 'Tampering'], cwes: ['CWE-89', 'CWE-20'], affectedElementType: 'process', trustBoundaryCrossing: true } },
    countermeasures: [{ countermeasure: 'Use prepared statements in all repositories', status: 'planned', riskReduction: 80 }],
    tasks: [{ task: 'Refactor OrderRepository to prepared statements', countermeasure: 'Use prepared statements in all repositories', status: 'in_progress', due: '2026-11-15' }] },
  { project: 'Webshop', name: 'Remote code execution through Log4Shell', properties: {
    origin: ['CVE'], state: 'closed', impactClass: 'critical', impactDescription: 'CVE-2021-44228 in log4j-core 2.14.1.',
    confidentiality: true, integrity: true, availability: true },
    countermeasures: [{ countermeasure: 'Upgrade log4j-core to 2.17.1', status: 'completed', riskReduction: 100 }] },
  { project: 'Payment Service', name: 'Fraud model drift', properties: {
    origin: ['SDLC'], state: 'monitored', impactClass: 'medium', impactDescription: 'Scoring quality drops when buying patterns change.',
    integrity: true },
    countermeasures: [{ countermeasure: 'Monthly model evaluation', status: 'ok', riskReduction: 60 }],
    tasks: [{ task: 'Evaluate model on last month\'s transactions', countermeasure: 'Monthly model evaluation', status: 'planned', frequency: 'monthly', due: '2026-11-01' }] },
  { project: 'Mobile App', name: 'Weak crypto in node-forge', properties: {
    origin: ['CVE', 'SSC'], state: 'assessed', impactClass: 'high', impactDescription: 'Signature verification can be bypassed (CVE-2022-24771).',
    confidentiality: true, integrity: true } },
  { project: 'Mobile App', name: 'Third-party SDK collects analytics data', properties: {
    origin: ['SSC'], state: 'identified', impactClass: 'low', impactDescription: 'Possible GDPR issue if consent is missing.',
    confidentiality: true } },
];

async function seedRisks(call, state) {
  state.risks = state.risks || {};
  for (const r of RISKS) {
    if (state.risks[r.name]) continue;
    const { riskId } = await call('POST', '/core/risks', { name: r.name, projectId: state.projects[r.project], riskProperties: r.properties });
    for (const cm of r.countermeasures || []) await call('POST', `/core/risks/${riskId}/countermeasures`, cm).catch((e) => log('cm', e.message));
    for (const t of r.tasks || []) await call('POST', `/core/risks/${riskId}/tasks`, { ...t, riskId }).catch((e) => log('task', e.message));
    state.risks[r.name] = riskId;
    await saveState(state);
    log('risk', r.name);
  }
}

async function baseSteps(browser, page, call, state) {
  await loadDemo(page, state);
  await seedProjects(call, state);
  await seedTeam(browser, page, state);
  await seedSettings(call, state);
  await seedTests(call, state);
  await seedUpdateScan(call, state);
  await seedApprovals(call, state);
  await decideApprovals(browser, state);
  await seedProducts(call, state);
  await seedRisks(call, state);
}

async function main() {
  const state = await loadState();
  const browser = await launch();
  const { page } = await newContext(browser, { email: process.env.TS_ADMIN_EMAIL || 'admin@example.com' });
  await settle(page, 1500);
  await dismissTour(page);
  const key = await ensureApiKey(page, state);
  const call = api(key);
  // --steps a,b runs only the matching files in seeds/ (the base data must exist already).
  const i = process.argv.indexOf('--steps');
  const only = i > 0 ? process.argv[i + 1].split(',') : [];
  if (!only.length) await baseSteps(browser, page, call, state);
  // Extra steps, one file per area:
  //   export default async ({ browser, page, call, base, state, save, meteor, log, newContext, settle }) => {}
  // `base` is the main state above (read only); `state` is the step's own state, kept in
  // .seed-<name>.json and passed to the shots as seed.extra[<name>]. Steps must be idempotent.
  const dir = path.join(HERE, 'seeds');
  for (const f of (await fs.readdir(dir)).filter((x) => x.endsWith('.mjs')).sort()) {
    const name = f.replace(/\.mjs$/, '');
    if (only.length && !only.some((o) => name.includes(o))) continue;
    const file = path.join(HERE, `.seed-${name}.json`);
    let own = {};
    try { own = JSON.parse(await fs.readFile(file, 'utf8')); } catch { /* first run */ }
    const step = (await import(path.join(dir, f))).default;
    await step({ browser, page, call, base: state, state: own, meteor, newContext, settle,
      save: () => fs.writeFile(file, JSON.stringify(own, null, 2), { mode: 0o600 }),
      log: (...a) => log(name, ...a) });
    await fs.writeFile(file, JSON.stringify(own, null, 2), { mode: 0o600 });
  }
  await browser.close();
  log('done');
}

main().catch((e) => { console.error(e); process.exit(1); });
