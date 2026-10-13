// Products and risks:
// - an SBOM file on Home Hub X1, generated from its solutions by Alex Morgan with the
//   same method as the Generate SBOM button on the Solutions tab;
// - two more Webshop risks (one on the webshop-frontend module, so the project list
//   shows the "in Module" label);
// - Webshop tasks in every task state with responsible people and due dates;
// - the STRIDE value "Information Disclosure" on the SQL injection risk (the base seed
//   wrote "Information disclosure", which the Threat model tab does not recognise).
const ALEX = 'alex.morgan@example.com';
const SQLI = 'Customer data exposed through SQL injection';
const LOG4J = 'Remote code execution through Log4Shell';

const day = (offset) => new Date(Date.now() + offset * 864e5).toISOString().slice(0, 10);

const RISKS = [
  { key: 'xss', module: 'webshop-frontend', name: 'Stored cross-site scripting in product reviews', properties: {
    origin: ['SDLC'], state: 'planned', impactClass: 'moderate', impactDescription: 'Script code in a review runs in the browser of every visitor of the product page.',
    confidentiality: 'M', integrity: 'M', availability: 'L' },
    countermeasures: [{ countermeasure: 'Encode user content on output', status: 'planned', riskReduction: 90 }] },
  { key: 'tls', project: 'Webshop', name: 'Weak TLS configuration on the checkout endpoint', properties: {
    origin: ['TMA Assessment'], state: 'assessed', impactClass: 'moderate', impactDescription: 'TLS 1.0 is still accepted by the load balancer.',
    confidentiality: 'M', integrity: 'L', availability: 'L' },
    countermeasures: [{ countermeasure: 'Allow only TLS 1.2 and 1.3', status: 'identified', riskReduction: 70 }] },
];

export default async ({ browser, page, call, base, state, save, meteor, log, newContext, settle }) => {
  // SBOM file, generated as Alex so the Documents tab shows a person, not the admin account.
  if (state.sbomBy !== ALEX) {
    const { ctx, page: alex } = await newContext(browser, { email: ALEX });
    await settle(alex, 1500);
    await meteor(alex, 'Products.SBOMGenerate', { product: { _id: base.products['SH-HUB'] } });
    await ctx.close();
    state.sbomBy = ALEX;
    await save();
    log('SBOM generated for Home Hub X1');
  }

  if (!state.strideFixed) {
    const id = base.risks[SQLI];
    await call('POST', `/core/risks/${id}`, { riskProperties: { threatModelContext: {
      strideCategories: ['Information Disclosure', 'Tampering'], cwes: ['CWE-89', 'CWE-20'], affectedElementType: 'process', trustBoundaryCrossing: true } } });
    state.strideFixed = true;
    await save();
    log('STRIDE categories of the SQL injection risk');
  }

  state.risks = state.risks || {};
  for (const r of RISKS) {
    if (state.risks[r.key]) continue;
    const target = r.module ? { moduleId: base.scans[r.module].moduleId } : { projectId: base.projects[r.project] };
    const { riskId } = await call('POST', '/core/risks', { name: r.name, ...target, riskProperties: r.properties });
    for (const cm of r.countermeasures) await call('POST', `/core/risks/${riskId}/countermeasures`, cm);
    state.risks[r.key] = riskId;
    await save();
    log('risk', r.name);
  }

  if (!state.tasks) {
    const users = await page.evaluate(async () => {
      const M = window.Meteor;
      const list = await M.callAsync('getUsers', M.user());
      return Object.fromEntries(list.map((u) => [u.profile.name, u._id]));
    });
    const who = (...names) => names.map((n) => users[n]).filter(Boolean);
    const TASKS = [
      { risk: base.risks[SQLI], countermeasure: 'Use prepared statements in all repositories', task: 'Add SQL injection tests to the CI pipeline',
        status: 'in_progress', due: day(4), responsible: who('Sam Lee') },
      { risk: base.risks[SQLI], countermeasure: 'Use prepared statements in all repositories', task: 'Review raw queries in the search module',
        status: 'in_review', due: day(17), responsible: who('Chris Taylor'), comment: 'Two queries left in SearchService' },
      { risk: state.risks.xss, countermeasure: 'Encode user content on output', task: 'Switch review rendering to the template engine escaping',
        status: 'planned', due: day(24), responsible: who('Alex Morgan') },
      { risk: state.risks.tls, countermeasure: 'Allow only TLS 1.2 and 1.3', task: 'Update the load balancer TLS policy',
        status: 'backlog', responsible: [] },
      { risk: base.risks[LOG4J], countermeasure: 'Upgrade log4j-core to 2.17.1', task: 'Upgrade log4j-core in webshop-backend',
        status: 'completed', due: day(-7), responsible: who('Alex Morgan') },
      { risk: base.risks[LOG4J], countermeasure: 'Upgrade log4j-core to 2.17.1', task: 'Re-scan all modules for log4j-core',
        status: 'completed', frequency: 'quarterly', due: day(-5), responsible: who('Sam Lee') },
    ];
    for (const t of TASKS) {
      const { risk, ...body } = t;
      await call('POST', `/core/risks/${risk}/tasks`, { ...body, riskId: risk });
    }
    state.tasks = TASKS.length;
    await save();
    log('tasks', TASKS.length);
  }
};
