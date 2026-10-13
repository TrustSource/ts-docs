// Approvals and reports: one dry-run approval created through the module wizard (so the
// Finalization step can be shown), and one manual vulnerability for the release
// Webshop Frontend 2.4.0 (so its New vulnerabilities tab has content).
const ALEX = 'alex.morgan@example.com';

// An internal finding in Example Corp's own package, reported after Webshop Frontend 2.4.0
// was released. Manual vulnerabilities are part of the live data a release is compared
// with, so the release shows it under New vulnerabilities. Only version 2.4.0 matches, so
// the current analyses of the modules do not change.
const FINDING = {
  key: 'EXCORP-2026-0001',
  severity: 'high',
  score: '7.5',
  link: 'https://www.example.com/security/advisories/EXCORP-2026-0001',
  description: 'The order confirmation page of webshop-frontend 2.4.0 writes the full card number into the browser console. Fixed in 2.5.0.',
  component: { name: 'webshop-frontend', key: 'npm:webshop-frontend', description: 'Storefront of the Example Corp webshop.', version: '2.4.0' },
};

export default async ({ browser, base, state, save, meteor, newContext, settle, log }) => {
  if (!state.manualVulnerability) {
    const { ctx, page } = await newContext(browser, { email: ALEX });
    state.manualVulnerability = await meteor(page, 'ManualVulnerabilities.Create', FINDING);
    await save();
    log('manual vulnerability', FINDING.key);
    await ctx.close();
  }
  if (state.dryRun) return;
  const projectId = base.projects.Webshop;
  const moduleId = base.scans['webshop-backend'].moduleId;
  const { ctx, page } = await newContext(browser, { email: ALEX });
  await page.goto(`${process.env.TS_BASE_URL || 'http://localhost:3100'}/projects/${projectId}/modules/${moduleId}/approve?draft=true`);
  await settle(page, 2500);
  if (!(await page.locator('input[name=approve_draft]').isChecked())) await page.locator('input[name=approve_draft]').check();
  await page.fill('input[name=approve_name]', 'Webshop Backend');
  await page.fill('input[name=approve_version]', '2.4.1');
  await page.fill('input[name=approve_purl]', 'pkg:maven/com.example/webshop-backend@2.4.1');
  await page.fill('textarea[name=approve_description]', 'Dry run before the next backend release.');
  for (let step = 0; step < 3; step++) {
    await page.locator('#createApproveForm button[type=submit]').filter({ visible: true }).first().click();
    await settle(page, 2500);
  }
  await page.waitForURL(/\/approve\/[^/]+\/finalize/, { timeout: 60000 });
  const approveId = page.url().match(/\/approve\/([^/]+)\/finalize/)[1];
  state.dryRun = { id: approveId, projectId, moduleId, name: 'Webshop Backend', version: '2.4.1' };
  await save();
  log('dry-run approval', approveId);
  // Let the reports finish before the shots look at them.
  await page.waitForSelector('.approve-progress-banner', { timeout: 180000 }).catch(() => log('reports still running'));
  await ctx.close();
};
