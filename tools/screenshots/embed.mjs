// Writes the captured screenshots into docs/ce: the n-th "📸 *Screenshot: ...*" placeholder of
// a page becomes the image of shot "<page>-<n>". On later runs it keeps the alt text of
// already embedded images in sync with the shot definitions.
//
//   node embed.mjs                    embed every shot whose image exists
//   node embed.mjs 03-internal-a ...  only shots from these shots/ files (by name part)
//   node embed.mjs --check            only report, write nothing
// A page is written only when its content changed.
import fs from 'node:fs/promises';
import path from 'node:path';
import { DOCS_ROOT, IMAGE_ROOT, SHOTS_DIR, TRACK } from './lib.mjs';

const DOCS = DOCS_ROOT;
const IMAGES = IMAGE_ROOT;
const check = process.argv.includes('--check');
const filters = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const PLACEHOLDER = /^📸 \*Screenshot:.*\*\s*$/;

const shots = [];
for (const f of (await fs.readdir(SHOTS_DIR)).filter((x) => x.endsWith('.mjs')).sort()) {
  if (filters.length && !filters.some((x) => f.includes(x))) continue;
  shots.push(...(await import(path.join(SHOTS_DIR, f))).default);
}

const byDoc = new Map();
for (const s of shots) {
  const m = s.id.match(/-(\d+)$/);
  if (!m || !s.doc) throw new Error(`Shot ${s.id} needs a doc and an id ending in -<n>`);
  if (!s.alt) throw new Error(`Shot ${s.id} has no alt text`);
  if (/[\[\]]/.test(s.alt)) throw new Error(`Alt text of ${s.id} must not contain brackets`);
  if (!byDoc.has(s.doc)) byDoc.set(s.doc, []);
  byDoc.get(s.doc).push({ ...s, n: Number(m[1]) });
}

let embedded = 0;
let open = 0;
for (const [doc, list] of byDoc) {
  const file = path.join(DOCS, doc);
  const before = await fs.readFile(file, 'utf8');
  const lines = before.split('\n');
  // Slots in page order: placeholders and images this tool wrote earlier.
  const slots = [];
  lines.forEach((l, i) => {
    if (PLACEHOLDER.test(l) || new RegExp(`^!\\[[^\\]]*\\]\\([^)]*assets/images/${TRACK}/[^)]*\\.webp\\)`).test(l)) slots.push(i);
  });
  for (const shot of list) {
    const img = path.join(IMAGES, shot.id + '.webp');
    const exists = await fs.access(img).then(() => true, () => false);
    const line = slots[shot.n - 1];
    if (line === undefined) { console.log(`${doc}: no slot ${shot.n} for ${shot.id}`); continue; }
    if (!exists) { console.log(`${doc}: image missing for ${shot.id}`); continue; }
    const rel = path.relative(path.dirname(file), img).split(path.sep).join('/');
    const md = `![${shot.alt}](${rel})`;
    if (lines[line] !== md && !check) { lines[line] = md; embedded++; }
  }
  if (!check && lines.join('\n') !== before) await fs.writeFile(file, lines.join('\n'));
}

// Placeholders that no shot covers yet.
const walk = async (d) => (await Promise.all((await fs.readdir(d, { withFileTypes: true })).map((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))).flat();
for (const f of (await walk(DOCS)).filter((x) => x.endsWith('.md'))) {
  const lines = (await fs.readFile(f, 'utf8')).split('\n');
  lines.forEach((l, i) => { if (PLACEHOLDER.test(l)) { open++; if (check) console.log(`open: ${path.relative(DOCS, f)}:${i + 1}`); } });
}
console.log(`${embedded} images written, ${open} placeholders left`);
