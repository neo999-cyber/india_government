#!/usr/bin/env node
/**
 * Internal-figure-consistency gate: a record's own arithmetic must agree with itself, or say why not.
 *
 * WHY THIS IS A SEPARATE ASSERTION FROM THE HAND-CHECK. Phase 14 batch 2 hand-checked sixteen
 * derived figures against source and reported clean, and it was clean: every figure agreed with the
 * submission it came from. What it did not ask is whether the figures agree with EACH OTHER on the
 * page. Three did not. P-119 printed 17.999 and 14.899 and a difference of 3.099, because the
 * difference was computed on the unrounded submissions and rounded afterwards while the operands
 * were rounded first. Both are correct and the two operations do not commute.
 *
 * **Agreement with source and internal consistency are different claims, and passing the first says
 * nothing about the second.** A reader checking the subtraction on the page finds a discrepancy and
 * has no way to tell a rounding artefact from an error. That is the gap this closes.
 *
 * IT DOES NOT DEMAND THAT THE ARITHMETIC RECONSTRUCT. Rounding artefacts are unavoidable when
 * operands are published to fewer places than the computation used. What it demands is that a
 * non-reconstructing figure be DECLARED in the record, so the artefact is stated rather than latent.
 *
 * CLAIMS ARE DECLARED, NEVER MINED, and the first version of this file is why. It searched every
 * record for figure triples where a - b sat one unit in the last place from a third printed figure,
 * and reported 197 failures on a corpus with two real cases: "22.9 and 11.5, difference 11.4, also
 * prints 11.5" is a coincidence, not a claim. A gate with a hundred-to-one false-positive rate does
 * not get read, and an author who adds a boilerplate declaration to silence it has made the corpus
 * worse. Same call as phase 13 discarding its keyword sweep for a reference-graph scan: an
 * assertion someone made beats a pattern something matched.
 *
 * Reads /data and a claims file. Asserts nothing about rendering, so it runs before `next build`.
 *
 * Usage:
 *   node tools/figure-consistency.mjs
 *   node tools/figure-consistency.mjs --data DIR --claims FILE     # fixtures
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i === -1 ? d : argv[i + 1]; };
const DATA_DIR = arg('--data', join(ROOT, 'data'));
const CLAIMS = arg('--claims', join(ROOT, 'tools', 'lib', 'figure-claims.json'));

/**
 * Phrases that count as declaring a rounding artefact.
 *
 * A phrase list rather than a boolean field, deliberately: the requirement is that the record TELLS
 * THE READER, and a flag would satisfy a gate while telling nobody anything.
 */
const DECLARATIONS = [
  'rounding artefact',
  'computed on the unrounded',
  'unrounded submissions',
  'unrounded national submissions',
];

function jsonFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...jsonFiles(full));
    else if (e.isFile() && e.name.endsWith('.json')) out.push(full);
  }
  return out;
}

const byId = new Map();
for (const f of jsonFiles(DATA_DIR)) {
  let parsed;
  try { parsed = JSON.parse(readFileSync(f, 'utf8')); } catch { continue; }
  const list = Array.isArray(parsed) ? parsed : (parsed.records ?? parsed.series ?? []);
  for (const r of list) if (r && typeof r === 'object' && r.id) byId.set(r.id, { record: r, file: f });
}

if (!existsSync(CLAIMS)) {
  console.error(`figure-consistency: no claims file at ${CLAIMS}`);
  process.exit(2);
}
const claims = JSON.parse(readFileSync(CLAIMS, 'utf8'));

const failures = [];
let checked = 0;
let artefacts = 0;

for (const c of claims) {
  const dp = c.decimals;
  const fmt = (v) => v.toFixed(dp);

  // 1. The claim must be true of the SOURCE values the author recorded.
  //
  // `sourceScale` is required and is not defaulted. Source values are in the unit the publisher
  // used (US dollars) and printed values in the unit the record uses (US$ billion); dividing
  // silently would let a claim whose units disagree pass by accident on a factor nobody stated.
  if (typeof c.sourceScale !== 'number' || c.sourceScale <= 0) {
    failures.push({ id: c.record, kind: 'scale', why: 'the claim states no sourceScale, so the source and printed units cannot be compared' });
    continue;
  }
  const fromSource = Number(((c.sourceA - c.sourceB) / c.sourceScale).toFixed(dp));
  if (fmt(fromSource) !== c.printedDifference) {
    failures.push({
      id: c.record, kind: 'source',
      why: `claims a difference of ${c.printedDifference}, but the source values it names (${c.sourceA} minus ${c.sourceB}) give ${fmt(fromSource)}`,
    });
    continue;
  }

  // 2. Every figure the claim names must actually appear in the record, at that precision.
  const entry = byId.get(c.record);
  if (!entry) { failures.push({ id: c.record, kind: 'missing', why: 'the claim names a record that is not in /data — the claim is stale, not passing' }); continue; }
  // Thousands separators are stripped before the presence test. A record writes "38,424 crore"
  // because that is how the figure is read; a claim naming 38424 is naming the same figure, and
  // making the claim match the typography would be a rule about commas rather than about numbers.
  // Indian grouping is irregular — 1,78,000 as well as 178,000 — so every digit-comma-digit run is
  // closed rather than assuming groups of three.
  const blob = JSON.stringify(entry.record).replace(/(\d),(?=\d)/g, '$1');
  const present = (s) => new RegExp(`(?<![\\d.])${s.replace(/,/g, '').replace('.', '\\.')}(?![\\d])`).test(blob);
  for (const s of [c.printedA, c.printedB, c.printedDifference]) {
    if (!present(s)) {
      failures.push({ id: c.record, kind: 'absent', why: `the claim names ${s} and no such figure appears in the record — the claim is describing something else` });
    }
  }

  // 3. Does the PRINTED subtraction reconstruct the PRINTED difference?
  checked += 1;
  const fromPrinted = Number((Number(c.printedA) - Number(c.printedB)).toFixed(dp));
  if (fmt(fromPrinted) === c.printedDifference) continue;

  // It does not. That is legitimate only if the record says so.
  artefacts += 1;
  const declared = DECLARATIONS.some((d) => blob.toLowerCase().includes(d.toLowerCase()));
  if (!declared) {
    failures.push({
      id: c.record, kind: 'undeclared',
      why:
        `prints ${c.printedA} and ${c.printedB} and a difference of ${c.printedDifference}, but the ` +
        `printed operands give ${fmt(fromPrinted)}. The difference is right and comes from the ` +
        `unrounded values; the reconstruction is what is lossy. The record does not say so, so a ` +
        `reader checking the subtraction cannot tell a rounding artefact from an error. State the basis`,
    });
  }
}

if (failures.length > 0) {
  console.error(`figure-consistency FAILED — ${failures.length} problem(s)`);
  for (const f of failures) console.error(`  - [${f.kind}] ${f.id}: ${f.why}`);
  console.error('\n  Agreement with source and internal consistency are different claims. Passing the\n  first says nothing about the second.');
  process.exit(1);
}

console.log(
  `figure-consistency OK — ${claims.length} declared arithmetic claim(s), ${checked} checked against ` +
    `both source and printed operands, ${artefacts} rounding artefact(s) found and declared`,
);
