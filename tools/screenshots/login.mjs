// Opens a browser window on TS_BASE_URL and waits until you have logged in by hand, then saves the
// session for capture.mjs. Use this for installations where the screenshot user's password is not
// available to the scripts (for example the SaaS DEV stage with SSO or 2FA).
//
//   TS_BASE_URL=https://develop.dev.trustsource.io TS_EMAIL=<user email> node login.mjs
import { chromium } from 'playwright';
import { BASE_URL, CONTEXT_OPTIONS, SHOT_USER, authFile } from './lib.mjs';

const browser = await chromium.launch({ channel: process.env.TS_BROWSER_CHANNEL || undefined, headless: false });
const ctx = await browser.newContext(CONTEXT_OPTIONS);
const page = await ctx.newPage();
await page.goto(BASE_URL + '/dashboard');
console.log(`Log in as ${SHOT_USER} in the browser window. Waiting up to 30 minutes...`);
// The login may finish in another tab or after redirects, so check every open page.
const deadline = Date.now() + 30 * 60000;
let done = null;
while (!done && Date.now() < deadline) {
  for (const p of ctx.pages()) {
    if (await p.evaluate(() => !!(window.Meteor && Meteor.userId && Meteor.userId())).catch(() => false)) done = p;
  }
  if (!done) await new Promise((r) => setTimeout(r, 2000));
}
if (!done) throw new Error('No login within 30 minutes.');
await done.waitForLoadState('networkidle').catch(() => {});
await ctx.storageState({ path: authFile(SHOT_USER) });
console.log('Session saved.');
await browser.close();
