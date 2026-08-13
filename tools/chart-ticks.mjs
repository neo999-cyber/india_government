#!/usr/bin/env node
/**
 * chart-ticks — every grid line a story chart draws sits inside the frame it is drawn on.
 *
 * ============================ WHAT THIS BINDS, AND WHAT IT CANNOT =============================
 *
 * **SCOPE: `line.two-grid` elements inside `svg.two-svg`, on built story pages.** It asserts that
 * each line's `y1` lies within the SVG's own `viewBox` height, and that a chart draws at least two
 * distinct grid positions — because four lines stacked within two pixels of each other passes an
 * in-range test while being exactly as useless as three lines off-canvas.
 *
 * **IF THE CLAIM MOVED ONE LEVEL OUT, THIS WOULD NOT SEE IT.** It binds `two-grid` on `two-svg`.
 * A different chart component with its own hardcoded ticks is outside this scope by construction,
 * and `SeriesChart` is not read here at all. That is stated rather than implied, per the rule that
 * a guard binds a scope and the claim it protects has its own.
 *
 * ============================ WHY IT READS THE OUTPUT AND NOT THE SOURCE ======================
 *
 * The defect it exists for was invisible in the source: `yMax` became a prop and the tick array
 * stayed a literal, and both are numbers, so nothing in the type system had an opinion. Where a
 * property can be observed, observe it — this reads the bytes Next actually emitted.
 *
 * NEGATIVE CONTROL: `--control` builds a synthetic chart whose ticks are the pre-fix constants
 * against a yMax of 6 and requires this checker to REJECT it, then requires the same-form chart
 * with derived ticks to PASS. A checker reporting clean with no positive beside it proves the
 * needle absent, not the search working.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const verbose = process.argv.includes('--verbose');

/**
 * Pull every `two-svg` block and the `two-grid` lines inside it.
 *
 * **ATTRIBUTE ORDER IS NOT ASSUMED, AND THE FIRST VERSION OF THIS FUNCTION ASSUMED IT.** It required
 * `class` before `viewBox` on the svg and `class` before `y1` on the line. Next emits both the
 * other way round — `<svg viewBox="0 0 640 300" class="two-svg"` and `<line x1 x2 y1 y2 class>` —
 * so the gate matched nothing and reported `0 grid lines across 0 charts` as a pass, on a site with
 * seven story charts. It shipped green over the defect it was written for. Hence the `--control`
 * fixtures below are built in the ORDER NEXT ACTUALLY EMITS, and hence the floor assertion in the
 * main run: a scan that finds no charts is a broken scan, not a clean site.
 */
function charts(html) {
  const found = [];
  const re = /<svg\b([^>]*)>([\s\S]*?)<\/svg>/g;
  let m;
  while ((m = re.exec(html))) {
    if (!/class="[^"]*\btwo-svg\b[^"]*"/.test(m[1])) continue;
    const vb = (m[1].match(/viewBox="([^"]*)"/) || [])[1];
    if (!vb) continue;
    const h = Number(vb.trim().split(/\s+/)[3]);
    const ys = [...m[2].matchAll(/<line\b[^>]*>/g)]
      .filter((l) => /class="[^"]*\btwo-grid\b[^"]*"/.test(l[0]))
      .map((l) => Number((l[0].match(/y1="([-\d.]+)"/) || [])[1]))
      .filter((v) => Number.isFinite(v));
    found.push({ height: h, ys });
  }
  return found;
}

function inspect(html, where) {
  const bad = [];
  for (const c of charts(html)) {
    const off = c.ys.filter((y) => y < 0 || y > c.height);
    if (off.length) bad.push(`${where}: ${off.length}/${c.ys.length} grid line(s) outside the 0..${c.height} frame — y=${off.map((v) => Math.round(v)).join(', ')}`);
    // Collapse: every line within 2px of every other is a grid that is not a grid.
    else if (c.ys.length > 1 && Math.max(...c.ys) - Math.min(...c.ys) < 2)
      bad.push(`${where}: ${c.ys.length} grid lines collapsed into ${(Math.max(...c.ys) - Math.min(...c.ys)).toFixed(1)}px — the scale and the ticks disagree`);
  }
  return bad;
}

if (process.argv.includes('--control')) {
  // ATTRIBUTE ORDER COPIED FROM THE BUILT OUTPUT, NOT FROM AN IDEA OF IT: viewBox before class on
  // the svg, y1 before class on the line. A control written in a different order than the thing it
  // controls for does not pass through the restriction the real scan depends on, which is how the
  // first version of this gate came to report clean on zero charts.
  const frame = (ys) =>
    `<svg viewBox="0 0 640 300" class="two-svg" role="img" aria-label="control">${ys
      .map((y) => `<line x1="20" x2="492" y1="${y}" y2="${y}" class="two-grid"></line>`)
      .join('')}</svg>`;
  // The pre-fix constants [0,25,50,75] against yMax=6, computed with the component's own geometry.
  const y = (v) => 24 + 242 - (v / 6) * 242;
  const broken = inspect(frame([0, 25, 50, 75].map(y)), 'control');
  const collapsed = inspect(frame([266, 265.4, 265.1, 264.8]), 'control');
  const good = inspect(frame([0, 2, 4, 6].map(y)), 'control');
  if (!broken.length) throw new Error('control FAILED: off-canvas ticks were not rejected');
  if (!collapsed.length) throw new Error('control FAILED: collapsed ticks were not rejected');
  if (good.length) throw new Error(`control FAILED: correct ticks were rejected — ${good.join('; ')}`);
  console.log(
    'chart-ticks --control — the pre-fix constants at yMax 6 are rejected as off-canvas, four lines inside 1.2px are rejected as collapsed, and the same-form chart with derived ticks passes',
  );
  process.exit(0);
}

if (!existsSync(OUT)) {
  console.error('chart-ticks: no build at out/ — run `npm run build` first');
  process.exit(2);
}

const pages = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(OUT);

// Stale-build guard: a gate reading the previous build finds every chart it already knew about and
// reports clean, which is the false PASS that matters.
const newest = Math.max(...['components', 'lib', 'app'].map((d) => {
  let t = 0;
  (function w(x) {
    for (const e of readdirSync(x, { withFileTypes: true })) {
      const p = join(x, e.name);
      if (e.isDirectory()) w(p);
      else t = Math.max(t, statSync(p).mtimeMs);
    }
  })(join(ROOT, d));
  return t;
}));
if (statSync(join(OUT, 'index.html')).mtimeMs < newest) {
  console.error('chart-ticks: the build at out/ is older than components/, lib/ or app/ — rebuild before asserting on it');
  process.exit(2);
}

const problems = [];
let charted = 0;
let lines = 0;
for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  if (!html.includes('two-svg')) continue;
  const rel = p.slice(OUT.length + 1);
  const cs = charts(html);
  charted += cs.length;
  lines += cs.reduce((a, c) => a + c.ys.length, 0);
  problems.push(...inspect(html, rel));
}

// THE FLOOR. Seven story pages carry a chart; a run that finds none has a broken matcher, and the
// only way that reads as a pass is if nobody stated the expected scope. Exit 2 — the same code the
// stale-build guard uses — because this is "the check did not run", not "the check found nothing".
if (charted === 0) {
  console.error('chart-ticks: found 0 charts to check. The matcher is broken or the build is empty — a zero here is never a pass.');
  process.exit(2);
}

if (problems.length) {
  console.error(`chart-ticks FAILED — ${problems.length} chart(s) draw a grid off their own scale:`);
  for (const b of problems) console.error('  ' + b);
  process.exit(1);
}
console.log(
  `chart-ticks OK — ${lines} grid line(s) across ${charted} story chart(s) all inside their own viewBox and spread over more than 2px` +
    (verbose ? ` · scope: line.two-grid inside svg.two-svg, ${pages.length} built pages scanned` : ''),
);
