// Shared helpers for seed.mjs and capture.mjs.
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const REPO = path.resolve(HERE, '../..');
// TS_TRACK=v3 captures the SaaS track (docs/v3, shots-v3/); the default is the CE track.
export const TRACK = process.env.TS_TRACK || 'ce';
export const DOCS_ROOT = path.join(REPO, 'docs', TRACK);
export const IMAGE_ROOT = path.join(REPO, 'docs/assets/images', TRACK);
export const SHOTS_DIR = path.join(HERE, TRACK === 'ce' ? 'shots' : `shots-${TRACK}`);

export const BASE_URL = (process.env.TS_BASE_URL || 'http://localhost:3100').replace(/\/$/, '');
export const VIEWPORT = { width: 1440, height: 900 };
export const SCALE = 2;
// Published width of a full-viewport shot; every shot is scaled by the same factor.
export const OUTPUT_WIDTH = 1600;

// The screenshot user. seed.mjs creates Alex Morgan and stores the passwords in .seed.json.
export const SHOT_USER = process.env.TS_EMAIL || 'alex.morgan@example.com';

async function credentials(email) {
  if (email === (process.env.TS_ADMIN_EMAIL || 'admin@example.com') && process.env.TS_PASSWORD) {
    return process.env.TS_PASSWORD;
  }
  try {
    const seed = JSON.parse(await fs.readFile(path.join(HERE, '.seed.json'), 'utf8'));
    const pw = seed.team && seed.team[email] && seed.team[email].password;
    if (pw) return pw;
  } catch { /* not seeded yet */ }
  if (process.env.TS_PASSWORD) return process.env.TS_PASSWORD;
  throw new Error(`No password for ${email}. Run seed.mjs first or set TS_PASSWORD.`);
}

export async function launch() {
  // TS_BROWSER_CHANNEL=chrome uses the installed Chrome instead of Playwright's Chromium.
  const channel = process.env.TS_BROWSER_CHANNEL || undefined;
  return chromium.launch({ channel, headless: !process.env.HEADED });
}

export const CONTEXT_OPTIONS = { viewport: VIEWPORT, deviceScaleFactor: SCALE, colorScheme: 'light', locale: 'en-US', timezoneId: 'Europe/Berlin' };

// A logged-in context for `email`. The Meteor login token lives in localStorage, so
// storageState keeps the session between runs.
export const authFile = (email) => path.join(HERE, `.auth-${email.replace(/[^a-z0-9]+/gi, '_')}.json`);

export async function newContext(browser, { email = SHOT_USER } = {}) {
  const stateFile = authFile(email);
  try {
    await fs.access(stateFile);
    const ctx = await browser.newContext({ ...CONTEXT_OPTIONS, storageState: stateFile });
    const page = await ctx.newPage();
    await page.goto(BASE_URL + '/dashboard');
    await page.waitForLoadState('networkidle');
    const loggedIn = await page.waitForFunction(() => window.Meteor && Meteor.userId(), null, { timeout: 15000 }).then(() => true, () => false);
    if (loggedIn && !(await page.locator('#username').count())) return { ctx, page };
    await ctx.close();
  } catch { /* no saved session */ }
  if (TRACK !== 'ce') throw new Error(`No valid session for ${email}. Run login.mjs and log in by hand.`);
  const password = await credentials(email);
  const ctx = await browser.newContext(CONTEXT_OPTIONS);
  const page = await ctx.newPage();
  await page.goto(BASE_URL + '/');
  await page.fill('#username', email);
  await page.fill('#password', password);
  await page.click('button[type=submit]');
  await page.waitForFunction(() => !document.querySelector('#username'), null, { timeout: 30000 });
  await page.waitForLoadState('networkidle');
  await ctx.storageState({ path: stateFile });
  return { ctx, page };
}

// Waits until the page has settled: no network, no loading spinners, fonts loaded.
export async function settle(page, extra = 600) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
  await page.waitForFunction(() => !document.querySelector('.spinner, .loading, [class*="Spinner"], .fa-spin'), null, { timeout: 15000 }).catch(() => {});
  // Lists that load in the background show a text such as "Loading licenses, please wait...".
  await page.waitForFunction(() => !/Loading[^\n]{0,60}please wait/i.test(document.body.innerText), null, { timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(extra);
}

// Captures the page or one element and writes an optimised WebP.
export async function shoot(page, file, { selector, clip, fullPage = false, padding = 0 } = {}) {
  const out = path.join(IMAGE_ROOT, file);
  await fs.mkdir(path.dirname(out), { recursive: true });
  let buf;
  if (selector) {
    const el = page.locator(selector).first();
    await el.scrollIntoViewIfNeeded().catch(() => {});
    if (padding) {
      const box = await el.boundingBox();
      buf = await page.screenshot({ clip: { x: Math.max(0, box.x - padding), y: Math.max(0, box.y - padding), width: box.width + 2 * padding, height: box.height + 2 * padding }, animations: 'disabled' });
    } else {
      buf = await el.screenshot({ animations: 'disabled' });
    }
  } else {
    buf = await page.screenshot({ clip, fullPage, animations: 'disabled' });
  }
  // Same factor for every shot, so UI elements have the same size on every page:
  // a full-width shot becomes OUTPUT_WIDTH pixels wide, a crop proportionally less.
  const meta = await sharp(buf).metadata();
  const width = Math.round(meta.width * OUTPUT_WIDTH / (VIEWPORT.width * SCALE));
  await sharp(buf).resize({ width })
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toFile(out);
  return out;
}
