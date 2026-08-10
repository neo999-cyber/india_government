#!/usr/bin/env node
/**
 * VIEW PARITY — where two components render the same record type, which fields does each read?
 *
 * THE CLASS THIS NAMES. `ContestedPairView` and `CoverageUsageView` both render a `Pair`. One read
 * `pair.notes` and the other did not, so seventeen pairs' notes reached no reader — eleven of them
 * on pairs that rendered perfectly in every other respect. Nothing could see it: the data was
 * valid, `reachability` passed, and `field-render-audit` asks whether a field reaches SOME page,
 * which it did, on the pairs the other view happened to render.
 *
 * **It recurred immediately at a second site.** Six hand-rolled grid cards rendered a series or a
 * ledger record, and their mark sets had drifted apart — the provenance page's cited-by grid
 * carried no caveat while the series page's grid of the same records did, which rule 3a names in
 * terms. Two instances is what makes it a class rather than a bug, and CLAUDE.md's ad-hoc
 * normaliser is the same shape: corrected four separate times before anyone wrote it down.
 *
 * WHAT THIS IS AND IS NOT. **A REPORT, not a gate, and deliberately.** A divergence between two
 * views is very often correct: a compact card SHOULD show less than a detail page, and
 * `ContestedPairView` legitimately renders no `gapComputable` because a contested pair states no
 * wedge. Only a reading decides which divergences are defects, so a gate here would fire on right
 * answers — the same argument that keeps the prose-shadow check out of the build. It is run and
 * read, and what it finds is fixed by hand.
 *
 * METHOD, AND ITS LIMITS, STATED BECAUSE THE OUTPUT IS A CANDIDATE LIST AND NOT A FINDING.
 * For each `.tsx` under `app/` and `components/`, every `<ident>.<field>` access is collected where
 * `<field>` is a leaf field of a layer's schema, and the file is attributed to that layer when it
 * touches three or more of its fields. So:
 *   - it measures what a file READS, which is a superset of what it RENDERS — a field read to
 *     compute something else counts here and reaches no reader;
 *   - fields shared between layers (`id`, `title`, `notes`, `caveat`) are attributed to every layer
 *     whose schema carries them, so a file may appear under two;
 *   - a field reached through a helper rather than directly is invisible to it.
 * Every difference it prints is a question, not an answer.
 *
 * Usage:
 *   node tools/view-parity.mjs            # layers rendered by 2+ files, with the differences
 *   node tools/view-parity.mjs --all      # every file's field set, including single-renderer layers
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { leafFields } from './lib/schema-fields.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ALL = process.argv.includes('--all');
const LAYERS = ['series', 'ledger', 'provenance', 'pairs'];

/** Leaf field NAMES per layer — the last segment, since that is what an access spells. */
const fieldsOf = new Map(
  LAYERS.map((l) => [l, new Set(leafFields(l).map((f) => f.path.split('.').pop()))]),
);

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.isFile() && e.name.endsWith('.tsx')) files.push(full);
  }
})(join(ROOT, 'app'));
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.isFile() && e.name.endsWith('.tsx')) files.push(full);
  }
})(join(ROOT, 'components'));

/** layer -> file -> Set(fields) */
const touched = new Map(LAYERS.map((l) => [l, new Map()]));
for (const file of files) {
  const src = readFileSync(file, 'utf8');
  // Comments stripped: this file's own headers name fields in prose and would inflate every set.
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const rel = relative(ROOT, file);
  const accessed = new Set([...code.matchAll(/\b[a-zA-Z_$][\w$]*\??\.([a-zA-Z_$][\w$]*)/g)].map((m) => m[1]));
  for (const layer of LAYERS) {
    const hits = [...accessed].filter((f) => fieldsOf.get(layer).has(f));
    if (hits.length >= 3) touched.get(layer).set(rel, new Set(hits));
  }
}

let reported = 0;
for (const layer of LAYERS) {
  const m = touched.get(layer);
  if (m.size < 2 && !ALL) continue;
  console.log(`\n=== ${layer.toUpperCase()} — rendered by ${m.size} file(s) ===`);
  const entries = [...m].sort((a, b) => b[1].size - a[1].size);
  for (const [f, s] of entries) console.log(`  ${String(s.size).padStart(2)} fields  ${f}`);
  if (m.size < 2) continue;

  /**
   * NEAR-TWINS, not every pair of files. Comparing `SeriesTable`, which renders points, against
   * the series index row, which renders one line, produces a long list of differences that are
   * all correct — the first version of this tool did exactly that and its output was dominated by
   * `id` and `title`, which some components take as separate props and never touch as fields.
   *
   * Two components in the SAME ROLE share most of their field set. So: Jaccard over the two sets,
   * and only pairs above the threshold are compared. A high overlap with a non-empty difference is
   * the shape that produced both known instances — `ContestedPairView` and `CoverageUsageView`
   * agree on almost every `Pair` field and disagreed on `notes`.
   */
  const THRESHOLD = 0.5;
  for (let i = 0; i < entries.length; i += 1) {
    for (let j = i + 1; j < entries.length; j += 1) {
      const [na, sa] = entries[i];
      const [nb, sb] = entries[j];
      const inter = [...sa].filter((f) => sb.has(f));
      const uni = new Set([...sa, ...sb]);
      const jac = inter.length / uni.size;
      if (jac < THRESHOLD) continue;
      const onlyA = [...sa].filter((f) => !sb.has(f)).sort();
      const onlyB = [...sb].filter((f) => !sa.has(f)).sort();
      if (!onlyA.length && !onlyB.length) continue;
      console.log(`\n  NEAR-TWINS (overlap ${(jac * 100).toFixed(0)}%, ${inter.length} shared)`);
      console.log(`    ${na}`);
      console.log(`    ${nb}`);
      if (onlyA.length) console.log(`      only ${na.split('/').pop()}: ${onlyA.join(', ')}`);
      if (onlyB.length) console.log(`      only ${nb.split('/').pop()}: ${onlyB.join(', ')}`);
      reported += 1;
    }
  }
}

console.log(
  `\nview-parity — ${reported} lopsided divergence(s) across ${LAYERS.length} layers. ` +
    'REPORT ONLY: a divergence is a question, not a defect. Read each before acting.',
);
