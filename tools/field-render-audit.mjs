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
 * METHOD, and the two details that decide whether it works at all:
 *   1. STRIP <script> BLOCKS FIRST. The framework embeds the entire RSC payload as escaped JSON, so
 *      a field rendering NOWHERE in the visible DOM is still present in the file. Every value would
 *      match and the audit would report a clean sweep over an entirely broken site.
 *   2. NORMALISE BOTH SIDES. Entity-unescape the page and collapse whitespace on page and value
 *      alike, or a rendered value fails to match itself over an `&#x27;` or a line wrap.
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

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const DATA = join(ROOT, 'data');
const VERBOSE = process.argv.includes('--verbose');

if (!existsSync(OUT)) {
  console.error('field-render-audit: no build at out/ — run `npm run build` first (exit 2)');
  process.exit(2);
}

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
const norm = (s) =>
  s
    .replace(/[‐-―]/g, '-')       // ‐ ‑ ‒ – — ―  → hyphen
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?)\]])/g, '$1')     // "P-26 ." → "P-26."
    .replace(/([(\[])\s+/g, '$1')           // "( P-101" → "(P-101"
    .trim();

function pageText(layer, id) {
  const p = join(OUT, layer, id, 'index.html');
  if (!existsSync(p)) return null;
  let raw = readFileSync(p, 'utf8');
  raw = raw.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');   // detail 1 — scripts FIRST
  raw = raw.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
  // Attribute values a reader can act on. A URL reaches a reader as an href and nowhere else, so
  // stripping tags before looking for it would report every citation invisible.
  const attrs = [...raw.matchAll(/(?:href|src|datetime|title|aria-label)="([^"]*)"/g)].map((m) => m[1]).join(' ');
  const stripped = `${raw.replace(/<[^>]+>/g, ' ')} ${attrs}`;
  const unescaped = stripped                                    // detail 2 — normalise
    .replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ').replace(/&#x2F;/g, '/');
  return norm(unescaped);
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

const LAYERS = ['ledger', 'provenance', 'series'];
let invisible = 0;
let proseFieldCount = 0;
let nonProseFieldCount = 0;
let exemptCount = 0;
const undeclared = [];
const rows = [];

for (const layer of LAYERS) {
  const records = loadLayer(layer);
  const { prose, nonProse } = fieldsOf(layer);
  const cache = new Map();
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
      const text = textFor(r.id);
      if (text === null) { noPage += 1; continue; }
      if (assertable.every((v) => formsFor(v).some((form) => text.includes(norm(form))))) rendered += 1;
      else if (examples.length < 4) examples.push(`${r.id} -> ${JSON.stringify(assertable).slice(0, 70)}`);
    }
    if (carried === 0) return;
    if (group === 'prose') proseFieldCount += 1; else nonProseFieldCount += 1;
    const missing = carried - rendered - noPage;
    rows.push({ layer, path: f.path, group, carried, rendered, missing, noPage, examples });
    if (missing > 0) invisible += missing;
  };

  for (const f of prose) audit(f, (v) => [String(v)], 'prose');

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
  return `${l} ${pr} prose + ${rs.length - pr} non-prose/${m} invisible`;
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
    `the record's own page.\n  ${perLayer}\n\n` +
    '  A field the page does not carry is invisible to a reader while looking correct to every\n' +
    '  other gate. Either render it, or state in its schema description why it is not rendered.',
  );
  process.exit(1);
}
console.log(
  `field-render-audit OK — ${proseFieldCount} prose + ${nonProseFieldCount} non-prose field(s) across ` +
  `${LAYERS.length} layers, 0 invisible, ${exemptCount} exempted by name · ${perLayer}`,
);
