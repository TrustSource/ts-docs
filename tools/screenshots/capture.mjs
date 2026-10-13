// Captures the screenshots defined in shots/*.mjs from a seeded TrustSource CE instance.
//
//   node capture.mjs                 every shot
//   node capture.mjs 10-projects      only the shots of shots/10-projects.mjs
//   node capture.mjs 10-projects cia  only those of its shots whose id contains "cia"
//   node capture.mjs cia              shots of any file whose id contains "cia"
//
// A shot definition:
//   {
//     id: '03-internal/01-projects/index-1',   // file under docs/assets/images/ce, without .webp
//     doc: '03-internal/01-projects/index.md', // page that embeds it (for review)
//     user: 'alex.morgan@example.com',         // default SHOT_USER; null = logged out
//     url: '/projects' or (seed) => `/projects/${seed.projects.Webshop}`,
//     viewport: { width: 1440, height: 900 },  // optional
//     prepare: async (page, seed, h) => {},    // clicks, dialogs, scrolling (h = helpers below)
//     target: 'viewport' | 'fullPage' | '<css selector>' | { clip: {x, y, width, height} }
//             or async (page, seed, h) => one of these,
//     padding: 12,                             // around a selector target
//     alt: 'The Projects list with ...',      // alt text, written into the page by embed.mjs
//     keepFocus: true,                         // keep focus and hover (default: blurred, mouse parked)
//     annotate: [{ selector, label, position, outline }], // numbered markers; position: inside-top-left (default),
//                                              // inside-top-right, inside-bottom-left/right, left, right
//   }
import fs from 'node:fs/promises';
import path from 'node:path';
import { BASE_URL, HERE, SHOT_USER, launch, newContext, settle, shoot, CONTEXT_OPTIONS } from './lib.mjs';

const filters = process.argv.slice(2);

async function loadShots() {
  const dir = path.join(HERE, 'shots');
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.mjs')).sort();
  const all = [];
  for (const f of files) {
    const mod = await import(path.join(dir, f));
    for (const s of mod.default) all.push({ ...s, file: f });
  }
  const ids = new Set();
  for (const s of all) {
    if (ids.has(s.id)) throw new Error(`Duplicate shot id ${s.id} (${s.file})`);
    ids.add(s.id);
  }
  // Words that name a shots file select that file; other words select shots by id. With a
  // file word present, id words only pick within those files.
  const fileWords = filters.filter((f) => files.some((name) => name.includes(f)));
  const idWords = filters.filter((f) => !fileWords.includes(f));
  return all.filter((s) => {
    if (fileWords.length && !fileWords.some((f) => s.file.includes(f))) return false;
    return !idWords.length || idWords.some((f) => s.id.includes(f));
  });
}

// Styles applied to every page before a shot: no blinking caret, no animations, no toasts.
const STABLE_CSS = `
  *, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; }
  .notifyjs-corner, .toast-container, #toast-container { display: none !important; }
  /* Keep dialogs clear of the coloured bar that the app draws over the top of the page. */
  .modal-dialog { margin-top: 72px !important; }
  /* CE 1.0.0 bug: tables in dialogs float, and their container collapses, so the dialog's
     white body ends above the table. Contain the float, as the app intends to look. */
  .modal .reactive-table-body { display: flow-root !important; }
`;

export const helpers = {
  settle,
  // Bounding box of the union of the elements, grown by pad and kept inside the viewport.
  async clipOf(page, selectors, pad = 0) {
    return page.evaluate(([sels, pad]) => {
      const rs = sels.flatMap((s) => [...document.querySelectorAll(s)]).map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.height);
      if (!rs.length) throw new Error('clipOf: nothing matches ' + sels.join(', '));
      const x = Math.max(0, Math.min(...rs.map((r) => r.left)) - pad);
      const y = Math.max(0, Math.min(...rs.map((r) => r.top)) - pad);
      const right = Math.min(window.innerWidth, Math.max(...rs.map((r) => r.right)) + pad);
      const bottom = Math.min(window.innerHeight, Math.max(...rs.map((r) => r.bottom)) + pad);
      return { clip: { x, y, width: right - x, height: bottom - y } };
    }, [Array.isArray(selectors) ? selectors : [selectors], pad]);
  },
  // Clicks the first visible element with this exact text.
  async clickText(page, text, opts = {}) {
    const loc = page.getByText(text, { exact: opts.exact !== false }).filter({ visible: true }).first();
    await loc.click();
    await settle(page, opts.wait ?? 800);
  },
  async click(page, selector, wait = 800) {
    await page.locator(selector).filter({ visible: true }).first().click();
    await settle(page, wait);
  },
  // Expands sidebar groups such as '#menu_inbound'.
  async openMenu(page, ...ids) {
    for (const id of ids) {
      const link = page.locator(`a[href="${id}"]`).filter({ visible: true }).first();
      const expanded = await page.evaluate((sel) => {
        const target = document.querySelector(sel);
        return !!target && (target.classList.contains('in') || target.classList.contains('show'));
      }, id);
      if (!expanded) await link.click();
      await page.waitForTimeout(500);
    }
  },
  async fill(page, selector, value) {
    await page.locator(selector).first().fill(value);
  },
  async hover(page, selector) {
    await page.locator(selector).first().hover();
    await page.waitForTimeout(400);
  },
};

// The getting-started tour opens by itself on a user's first dashboard visit.
async function dismissTour(page) {
  const cancel = page.locator('.ts-tour .ts-tour-cancel').filter({ visible: true }).first();
  if (await cancel.isVisible().catch(() => false)) {
    await cancel.click();
    await page.waitForTimeout(400);
  }
}

// Numbered markers over elements, for shots the text explains by number. The outline is
// kept inside the viewport and the number sits inside the outlined area, so neither is cut off.
async function annotate(page, marks) {
  await page.evaluate((marks) => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    marks.forEach(({ selector, label, position, outline = true }, i) => {
      const el = document.querySelector(selector);
      if (!el) throw new Error('annotate: no element ' + selector);
      const r = el.getBoundingClientRect();
      const left = Math.max(2, r.left - 3);
      const top = Math.max(2, r.top - 3);
      const right = Math.min(W - 2, r.right + 3);
      const bottom = Math.min(H - 2, r.bottom + 3);
      if (outline) {
        const box = document.createElement('div');
        Object.assign(box.style, { position: 'fixed', left: left + 'px', top: top + 'px', width: right - left + 'px', height: bottom - top + 'px',
          border: '2px solid #e5532d', borderRadius: '6px', zIndex: 2147483646, pointerEvents: 'none', boxSizing: 'border-box' });
        document.body.append(box);
      }
      const p = position || 'inside-top-left';
      const size = 24;
      let x;
      let y;
      if (p === 'left') { x = left - size - 6; y = (top + bottom) / 2 - size / 2; }
      else if (p === 'right') { x = right + 6; y = (top + bottom) / 2 - size / 2; }
      else {
        x = p.endsWith('right') ? right - size - 6 : left + 6;
        y = p.includes('bottom') ? bottom - size - 6 : top + 6;
      }
      const dot = document.createElement('div');
      dot.textContent = label || String(i + 1);
      Object.assign(dot.style, { position: 'fixed', left: Math.max(2, Math.min(W - size - 2, x)) + 'px', top: Math.max(2, Math.min(H - size - 2, y)) + 'px',
        width: size + 'px', height: size + 'px', borderRadius: '50%', background: '#e5532d', color: '#fff',
        font: '700 13px/24px Helvetica, Arial, sans-serif', textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,.35)', zIndex: 2147483647, pointerEvents: 'none' });
      document.body.append(dot);
    });
  }, marks);
}

async function main() {
  const shots = await loadShots();
  const seed = JSON.parse(await fs.readFile(path.join(HERE, '.seed.json'), 'utf8'));
  // State of the extra seed steps: seed.extra[<step name>].
  seed.extra = {};
  for (const f of (await fs.readdir(HERE)).filter((x) => /^\.seed-.+\.json$/.test(x))) {
    seed.extra[f.slice(6, -5)] = JSON.parse(await fs.readFile(path.join(HERE, f), 'utf8'));
  }
  const browser = await launch();
  const contexts = new Map();
  const failures = [];
  const contextFor = async (user, fresh = false) => {
    if (fresh && contexts.has(user)) { await contexts.get(user).close().catch(() => {}); contexts.delete(user); }
    if (!contexts.has(user)) {
      contexts.set(user, user ? (await newContext(browser, { email: user })).ctx : await browser.newContext(CONTEXT_OPTIONS));
    }
    return contexts.get(user);
  };
  for (const shot of shots) {
    const user = shot.user === undefined ? SHOT_USER : shot.user;
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      let page;
      try {
        // A session can end while shots run (expiry, a login elsewhere): log in again then.
        const ctx = await contextFor(user, attempt > 1);
        page = await ctx.newPage();
        if (shot.viewport) await page.setViewportSize(shot.viewport);
        const url = typeof shot.url === 'function' ? shot.url(seed) : shot.url;
        await page.goto(BASE_URL + url);
        await page.addStyleTag({ content: STABLE_CSS });
        await settle(page, 1500);
        if (user && await page.locator('#username').isVisible().catch(() => false)) throw new Error('session ended (login page shown)');
        await dismissTour(page);
        if (shot.prepare) await shot.prepare(page, seed, helpers);
        await page.addStyleTag({ content: STABLE_CSS });
        if (!shot.keepFocus) {
          await page.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur());
          await page.mouse.move(2, (shot.viewport || CONTEXT_OPTIONS.viewport).height - 2);
        }
        await settle(page, 500);
        if (user && await page.locator('#username').isVisible().catch(() => false)) throw new Error('session ended (login page shown)');
        if (shot.annotate) await annotate(page, shot.annotate);
        let t = shot.target || 'viewport';
        if (typeof t === 'function') t = await t(page, seed, helpers);
        // Dialogs are cropped to the dialog itself: a margin would show the dimmed page behind it.
        const inDialog = typeof t === 'string' && /\.modal\b|modal-content|modal-dialog/.test(t);
        const opts = t === 'viewport' ? {} : t === 'fullPage' ? { fullPage: true }
          : typeof t === 'string' ? { selector: t, padding: inDialog ? 0 : (shot.padding || 0) } : { clip: t.clip };
        const out = await shoot(page, shot.id + '.webp', opts);
        const loading = await page.evaluate(() => (document.body.innerText.match(/Loading[^\n]{0,60}(please wait|\.\.\.)/i) || [''])[0]);
        console.log(loading ? 'WARN' : 'ok  ', shot.id, `(${shot.file})`, loading ? `page still shows "${loading}"` : '');
        lastError = null;
        break;
      } catch (e) {
        lastError = e;
        if (page) await page.screenshot({ path: path.join(HERE, '.cache', 'fail-' + shot.id.replace(/\//g, '_') + '.png') }).catch(() => {});
        // CE allows 20 logins (session resumes included) per minute and client IP; wait for the window.
        if (attempt < 3) await new Promise((r) => setTimeout(r, 20000 * attempt));
      } finally {
        if (page) await page.close().catch(() => {});
      }
    }
    if (lastError) {
      failures.push(shot.id);
      console.log('FAIL', shot.id, lastError.message.split('\n')[0]);
    }
  }
  await browser.close();
  console.log(`\n${shots.length - failures.length}/${shots.length} captured`);
  if (failures.length) {
    console.log('failed:', failures.join(', '));
    process.exitCode = 1;
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
