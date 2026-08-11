#!/usr/bin/env node
/**
 * FIELD-RENDER AUDIT — does every field reach the page of the record that declares it?
 *
 * WHY THIS EXISTS. `reachability` guards a LIST of marks. A field absent from that list is
 * unguarded BY CONSTRUCTION — not by oversight — and nothing anywhere fails. Phase 15 found
 * `assessmentNote` rendering on 0 of the 164 ledger records carrying it and `revisitTrigger` on
 * 0 of 62: 226 marks written, validated, shipped and invisible, with every gate green throughout,
 * because the data was correct and no rule read the page for them.
 *
 * This tool is the audit CLAUDE.md now commands at stage 7 of every phase. It is DEFENCE IN DEPTH
 * behind `no-unguarded-prose-field` — that gate binds the guarded list to the schema and fires at
 * authoring time; this one observes the built output and would catch a field that is nominally
 * guarded but suppressed by a view anyway.
 *
 * IT READS BUILT OUTPUT, so it refuses to run against a stale build for the same reason
 * `reachability` does: a gate reading the previous build finds every mark it already knew about and
 * reports clean, and nothing in the output distinguishes that from a real pass.
 *
 * METHOD. Page text and normalisation live in `tools/lib/page-text.mjs` — ONE normaliser, applied
 * to both the page and the needle, imported by every check that looks for a value on a page. It was
 * extracted from this file on 2026-08-06 after four ad-hoc checks in one session reported correct
 * pages broken, each by normalising the two sides differently. Its header carries the four.
 *
 * A value is counted as rendered only if it appears WHOLE. A truncated match is a fail here, which
 * is the same standard CLAUDE.md rule 3a sets for caveats.
 *
 * NON-PROSE FIELDS ARE IN SCOPE SINCE 2026-08-06, and their absence was the largest remaining hole
 * in this instrument's rendering guarantees. Both render gates used to filter on
 * `!enum && !format && !pattern` — so every verdict, tier, stated reason, boolean and formatted
 * number in the corpus was outside every render assertion BY CONSTRUCTION. `disputeKind` is the
 * proven instance: schema-REQUIRED whenever `reasonDisputed` is true, correct in the data on all 19
 * entries, and read by no view for the whole of its life.
 *
 * A non-prose value cannot be looked for as itself — `assessment: "no-objective"` renders as
 * "No stated objective" — so each one declares HOW it renders in `tools/lib/value-renderings.mjs`,
 * and the labels there are parsed out of the modules that render them rather than retyped. A field
 * with neither a declaration nor an exemption fails `no-unguarded-prose-field`, which is where the
 * authoring-time half of this pair lives.
 *
 * Usage:
 *   node tools/field-render-audit.mjs              # all layers, summary + any failures
 *   node tools/field-render-audit.mjs --verbose    # per-field counts even when clean
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { leafFields, isProse, valuesAt } from './lib/schema-fields.mjs';
import { RENDERINGS, acceptedForms, EXEMPT_NON_PROSE } from './lib/value-renderings.mjs';
import { norm, pageTextFromHtml } from './lib/page-text.mjs';
import { assertFresh } from './lib/freshness.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const DATA = join(ROOT, 'data');
const VERBOSE = process.argv.includes('--verbose');

if (!existsSync(OUT)) {
  console.error('field-render-audit: no build at out/ — run `npm run build` first (exit 2)');
  process.exit(2);
}

/**
 * AND THE STALE-BUILD REFUSAL, WHICH THIS FILE'S OWN HEADER HAS CLAIMED SINCE PHASE 15 AND WHICH
 * WAS NEVER HERE. Added 2026-08-08.
 *
 * The header says, and said before this line existed: *"IT READS BUILT OUTPUT, so it refuses to run
 * against a stale build for the same reason `reachability` does."* It did no such thing — it checked
 * that `out/` exists and read whatever was in it. `reachability` and `domain-coverage` have both
 * called `assertFresh` since it was extracted; this gate never did.
 *
 * **The direction that matters is the false PASS**, which is the argument `freshness.mjs` is built
 * on: edit a record, forget to rebuild, run this, and it finds every value it already knew about
 * rendering and reports clean about a build nobody is shipping. Nothing in the output distinguishes
 * that from a real pass. It is only masked in normal use because the build runs it immediately
 * after `next build`; run on its own — which is exactly how CLAUDE.md instructs it to be run at
 * stage 7 of every phase — it could answer about the previous corpus.
 *
 * Found by sweeping the class rather than the instance: four tools read built output, three called
 * `assertFresh`, this one did not. A gate documenting a property it does not have is worse than one
 * that never claimed it, because the claim is what a later cycle checks against.
 */
assertFresh('field-render-audit', OUT, [
  join(ROOT, 'data'),
  join(ROOT, 'app'),
  join(ROOT, 'components'),
  join(ROOT, 'lib'),
]);

/** Fields of a layer, split by the shared enumeration so both gates cannot drift apart. */
function fieldsOf(schemaName) {
  const all = leafFields(schemaName);
  return {
    prose: all.filter((f) => isProse(f.def)).map((f) => ({ path: f.path, def: f.def })),
    nonProse: all.filter((f) => !isProse(f.def)).map((f) => ({ path: f.path, def: f.def })),
  };
}

/**
 * ONE normaliser, applied to BOTH the page and the value (M3a). Where the two sides differ in any
 * transformation, a miss is an assertion about this regex and not about the artefact — and the
 * first version of this file proved it: 53 of its 55 "invisible" values were its own artefacts.
 *
 *  - Dash folding. Period labels are authored `FY2013-14` and RENDERED `FY2013–14` with an en dash,
 *    so 50 of 100 `breaks[].period` values reported as unreachable were rendering perfectly. Same
 *    shape as phase 13's Indian digit grouping: a needle taken from the JSON matches nothing.
 *  - Space-around-punctuation. `withProvenanceLinks` wraps `P-26` in an anchor, so tag-stripping
 *    turns "See P-26." into "See P-26 ." and "(P-101)" into "( P-101 )". Three caveats were
 *    reported truncated when they render in full — the worst possible false positive, because
 *    caveat truncation is exactly what CLAUDE.md rule 3a forbids and a spurious hit there would
 *    have sent someone hunting a clamp that does not exist.
 */
function pageText(layer, id) {
  const p = join(OUT, layer, id, 'index.html');
  if (!existsSync(p)) return null;
  return pageTextFromHtml(readFileSync(p, 'utf8'));
}

function loadLayer(layer) {
  const roots = [join(DATA, layer), join(DATA, `${layer}.json`)];
  const files = [];
  for (const p of roots) {
    if (!existsSync(p)) continue;
    if (statSync(p).isDirectory()) files.push(...readdirSync(p).filter((f) => f.endsWith('.json')).map((f) => join(p, f)));
    else files.push(p);
  }
  return files.flatMap((f) => JSON.parse(readFileSync(f, 'utf8')));
}

/**
 * THE PAIRS LAYER HAS NO PAGE OF ITS OWN, AND THAT IS WHY IT WAS OUTSIDE THIS GATE.
 *
 * Until 2026-08-08 this tool ran over three layers and emitted its own scope saying so — *38 prose
 * + 51 non-prose fields across 3 layers, 0 invisible*. **Pairs are the FOURTH layer**, added in
 * phase 6c, and were outside that scope BY CONSTRUCTION rather than by oversight. So a pairs field
 * reaching no reader was invisible to the one gate built to catch a field reaching no reader. That
 * is the sixth instance of a guard whose scope and its claim's scope differ, and the first found on
 * a whole layer rather than a field.
 *
 * WHY THE TEST IS "ANY BUILT PAGE" AND NOT "THE PAIR'S OWN PAGE". Every other layer has
 * `out/<layer>/<id>/index.html`, and the per-record test is load-bearing there: a corpus-wide check
 * passes even when every record page suppresses its own mark. A pair has no such page — it renders
 * inside a host, and WHICH host is exactly the logic under suspicion. Deriving the page to read
 * from `pairHref` would make the gate agree with the code it is auditing: it would read the page
 * the view says it renders on, find the value, and report clean on any pair the view drops.
 *
 * So a pageless layer is audited against the WHOLE built site: a field is visible if some page a
 * reader can reach carries it. That is the weakest honest claim available for a layer with no page,
 * and it is strong enough — the eleven pairs whose `framing` reached nobody failed it.
 */
const PAGELESS = new Set(['pairs']);

/**
 * CLOSED 2026-08-11. **WITHDRAWN, quoted so the closure can be checked rather than taken on trust:**
 * *"The pairs layer is audited on its PROSE fields only, and this is a DEBT recorded rather than a
 * decision claimed... `RENDERINGS` is keyed `<layer>.<path>` and carries no pairs entries, so every
 * pairs non-prose field would be undeclared and this gate would abort before auditing anything. And
 * the enumeration itself is not well-formed here yet: `a` and `b` come back from `leafFields` as
 * non-prose LEAVES rather than being descended into, so `a.label` and `b.label` — prose that renders
 * on the face of every pair view — are not enumerated at all."*
 *
 * **Both halves are fixed.** `leafFields` now resolves `$ref`, which is what stopped it descending
 * into `a` and `b` — see its own header; the two `label` fields were never invisible, they were
 * never LOOKED AT. And every pairs non-prose field now carries a declared rendering or is exempted
 * by name in `value-renderings.mjs`, on the same terms as the other three layers.
 *
 * The set is empty and stays declared rather than deleted: a layer added later that cannot yet
 * declare its renderings goes here, with its reason, instead of quietly falling out of scope.
 */
const PROSE_ONLY = new Set([]);

const LAYERS = ['ledger', 'provenance', 'series', 'pairs'];
let invisible = 0;
let proseFieldCount = 0;
let nonProseFieldCount = 0;
let exemptCount = 0;
const undeclared = [];
const rows = [];

/** Every built page's text, loaded once, for the pageless layers. */
let allPagesCache = null;
function allPageTexts() {
  if (allPagesCache) return allPagesCache;
  const out = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === '_next') continue;
      const full = join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && e.name === 'index.html') out.push(pageTextFromHtml(readFileSync(full, 'utf8')));
    }
  };
  walk(OUT);
  allPagesCache = out;
  return out;
}

for (const layer of LAYERS) {
  const records = loadLayer(layer);
  const { prose, nonProse } = fieldsOf(layer);
  const cache = new Map();
  const pageless = PAGELESS.has(layer);
  const textFor = (id) => {
    if (!cache.has(id)) cache.set(id, pageText(layer, id));
    return cache.get(id);
  };

  const audit = (f, formsFor, group) => {
    let carried = 0;
    let rendered = 0;
    let noPage = 0;
    const examples = [];
    for (const r of records) {
      const vals = valuesAt(r, f.path);
      if (vals.length === 0) continue;
      // A declaration may say a value renders nothing on some branch — a false boolean with no
      // declared phrase. Those records carry no assertable value and are not counted against it.
      const assertable = vals.filter((v) => formsFor(v) !== null);
      if (assertable.length === 0) continue;
      carried += 1;
      // A pageless record is asked of the whole site; a paged one only of its own page, because
      // corpus-wide reachability is satisfied by an index and that is not the claim.
      const hit = pageless
        ? (form) => allPageTexts().some((t) => t.includes(norm(form)))
        : null;
      const text = pageless ? '' : textFor(r.id);
      if (!pageless && text === null) { noPage += 1; continue; }
      const seen = (v) => formsFor(v).some((form) => (pageless ? hit(form) : text.includes(norm(form))));
      if (assertable.every(seen)) rendered += 1;
      else if (examples.length < 4) examples.push(`${r.id} -> ${JSON.stringify(assertable).slice(0, 70)}`);
    }
    if (carried === 0) return;
    if (group === 'prose') proseFieldCount += 1; else nonProseFieldCount += 1;
    const missing = carried - rendered - noPage;
    rows.push({ layer, path: f.path, group, carried, rendered, missing, noPage, examples });
    if (missing > 0) invisible += missing;
  };

  for (const f of prose) audit(f, (v) => [String(v)], 'prose');

  if (PROSE_ONLY.has(layer)) continue;

  for (const f of nonProse) {
    const key = `${layer}.${f.path}`;
    const rendering = RENDERINGS[key];
    if (!rendering) {
      // Exempted by name in its own schema description, or it would have failed
      // no-unguarded-prose-field before this gate ever ran. Counted, not audited.
      if ((f.def.description ?? '').includes(EXEMPT_NON_PROSE)) { exemptCount += 1; continue; }
      // Collected, never thrown on sight. A gate that dies on the first undeclared field reports
      // one name where the operator needs the set — and the set is what says whether this is an
      // oversight or a class.
      undeclared.push(key);
      continue;
    }
    audit(f, (v) => acceptedForms(rendering, v), 'non-prose');
  }
}

const bad = rows.filter((r) => r.missing > 0);
if (VERBOSE || bad.length) {
  const width = Math.max(...rows.map((r) => r.path.length), 10);
  let lastLayer = null;
  for (const r of (VERBOSE ? rows : bad)) {
    if (r.layer !== lastLayer) { console.log(`\n  ${r.layer}`); lastLayer = r.layer; }
    const flag = r.missing > 0 ? '  ** INVISIBLE **' : '';
    console.log(
      `    ${r.path.padEnd(width)}  ${r.group === 'prose' ? 'prose    ' : 'non-prose'}` +
      `  carried ${String(r.carried).padStart(4)}` +
      `  rendered ${String(r.rendered).padStart(4)}` +
      `  missing ${String(r.missing).padStart(4)}${flag}`,
    );
    for (const e of r.examples ?? []) console.log(`        e.g. ${e}`);
  }
  console.log('');
}

const perLayer = LAYERS.map((l) => {
  const rs = rows.filter((r) => r.layer === l);
  const m = rs.reduce((a, r) => a + r.missing, 0);
  const pr = rs.filter((r) => r.group === 'prose').length;
  const scope =
    (PAGELESS.has(l) ? ' [any page]' : '') + (PROSE_ONLY.has(l) ? ' [prose only, non-prose owed]' : '');
  return `${l} ${pr} prose + ${rs.length - pr} non-prose/${m} invisible${scope}`;
}).join(' · ');

if (undeclared.length) {
  console.error(
    `field-render-audit FAILED — ${undeclared.length} non-prose field(s) neither declared nor exempted:\n` +
    undeclared.map((u) => `  ${u}`).join('\n') +
    '\n\n  Declare how each renders in tools/lib/value-renderings.mjs, or write' +
    `\n  "${EXEMPT_NON_PROSE} <reason>" into that field\'s own description in its schema.` +
    '\n  There is no third state: a field nobody has decided about is unguarded by construction.',
  );
  process.exit(1);
}

if (invisible > 0) {
  console.error(
    `field-render-audit FAILED — ${invisible} record-field(s) carry a value that never reaches ` +
    `the record's own page — or, on a pageless layer, any page at all.\n  ${perLayer}\n\n` +
    '  A field the page does not carry is invisible to a reader while looking correct to every\n' +
    '  other gate. Either render it, or state in its schema description why it is not rendered.',
  );
  process.exit(1);
}
console.log(
  `field-render-audit OK — ${proseFieldCount} prose + ${nonProseFieldCount} non-prose field(s) across ` +
  `${LAYERS.length} layers, 0 invisible, ${exemptCount} exempted by name · ${perLayer}`,
);
