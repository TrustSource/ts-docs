// Seed step for the administration and personal pages (docs/ce/06-administration, 08-personal,
// 10-roles-permissions and the share-SBOM recipe).
//
//   - Two more API keys: a company key for a CI pipeline and Alex Morgan's personal access key.
//   - Two release keys of our own: one published (scopes sbom and notice) that was requested
//     once, and one not yet published (scope sbom). Approving a release already created a
//     published key without scope for each approved release; those stay untouched.
//   - Three CSAF feed keys, one of them unpublished, one requested once.
//   - Two more company tags and a company webhook with a fictional receiver.
import { BASE_URL } from '../lib.mjs';

const ALEX = 'alex.morgan@example.com';
const TAGS = [
  { name: 'team:payments', description: 'Owned by the payments team.' },
  { name: 'team:mobile', description: 'Owned by the mobile team.' },
];
const CSAF_KEYS = [
  { name: 'Customer portal', tlp: ['WHITE', 'GREEN'], request: true },
  { name: 'Security partner', tlp: ['GREEN', 'AMBER'] },
  { name: 'Former supplier', tlp: ['AMBER'], unpublish: true },
];
const WEBHOOK = { name: 'Release notifications', triggers: ['release', 'approval'], type: 'webhook', method: 'POST',
  url: 'https://hooks.example.com/trustsource/releases', headers: [] };

const company = (page) => page.evaluate(() => {
  const M = window.Meteor || window.Package.meteor.Meteor;
  return M.connection._mongo_livedata_collections.companies.findOne();
});

export default async ({ browser, page, base, state, save, meteor, log, newContext, settle }) => {
  await page.goto(BASE_URL + '/settings/company/api/keys');
  await settle(page, 2500);

  // Company API key for a CI pipeline, used once so that Last used shows a date.
  if (!state.ciKeyId) {
    const created = await meteor(page, 'apiKey.create', { name: 'GitHub Actions - Webshop', scope: ['developer'], requestId: 'docs-ci-webshop' });
    await meteor(page, 'apiKey.update', { ...created, published: true, unpublished: false });
    const plain = await meteor(page, 'apiKey.reveal', created.id);
    await fetch(BASE_URL + '/api/v2/account/authorization', { headers: { 'x-api-key': plain } });
    state.ciKeyId = created.id;
    await save();
    log('API key GitHub Actions - Webshop');
  }

  // Alex Morgan's personal access key, created and published as Alex.
  if (!state.pakId) {
    const { ctx, page: alex } = await newContext(browser, { email: ALEX });
    await alex.goto(BASE_URL + '/settings');
    await settle(alex, 2500);
    const created = await meteor(alex, 'createApiKeyByUser', { requestId: 'docs-pak-alex' });
    await meteor(alex, 'updateApiKeyByUser', { ...created, published: true, unpublished: false });
    state.pakId = created.id;
    await save();
    await ctx.close();
    log('personal access key of Alex Morgan');
  }

  // Release keys
  await page.goto(BASE_URL + '/settings/company/api/releases');
  await settle(page, 2500);
  const releaseKey = async (approval, scope, publish) => {
    const created = await meteor(page, 'publicReleaseKey.create', base.approvals[approval].id);
    await meteor(page, 'publicReleaseKey.update', { ...created, scope, published: publish, unpublished: false });
    return created.key;
  };
  if (!state.releaseKeyPublished) {
    state.releaseKeyPublished = await releaseKey('Webshop Frontend 2.4.0', ['sbom', 'notice'], true);
    await save();
    log('published release key');
  }
  if (!state.releaseKeyRequested) {
    const res = await fetch(`${BASE_URL}/api/v2/compliance/releases/${state.releaseKeyPublished}/sbom`);
    log('release key request', res.status);
    state.releaseKeyRequested = res.ok;
    await save();
  }
  if (!state.releaseKeyDraft) {
    state.releaseKeyDraft = await releaseKey('Payment Service 3.1.0', ['sbom'], false);
    await save();
    log('unpublished release key');
  }

  // CSAF feed keys
  state.csafKeys = state.csafKeys || {};
  for (const k of CSAF_KEYS) {
    if (state.csafKeys[k.name]) continue;
    const created = await meteor(page, 'publicCsafKey.create', k.name, k.tlp);
    if (k.unpublish) await meteor(page, 'publicCsafKey.setPublished', created.key, false);
    if (k.request) await fetch(`${BASE_URL}/api/v2/compliance/csaf/${created.key}/documents`);
    state.csafKeys[k.name] = true;
    await save();
    log('CSAF feed key', k.name);
  }

  // Company tags (other steps add more; nothing here renames or removes one).
  const existing = await meteor(page, 'getCompanyTags');
  state.tags = state.tags || [];
  for (const t of TAGS) {
    if (existing.find((x) => x.name === t.name)) { if (!state.tags.includes(t.name)) state.tags.push(t.name); continue; }
    await meteor(page, 'Tags.Create', t);
    state.tags.push(t.name);
    await save();
    log('tag', t.name);
  }

  // Company webhook
  if (!state.webhookId) {
    state.webhookId = await meteor(page, 'Webhook.Create', WEBHOOK);
    await save();
    log('webhook', WEBHOOK.name);
  }

  const c = await company(page);
  log('release keys', (c.publicReleaseKeys || []).length, 'csaf keys', (c.publicCsafKeys || []).length);
};
