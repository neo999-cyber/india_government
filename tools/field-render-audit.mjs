#!/usr/bin/env node
/**
 * FIELD-RENDER AUDIT — does every prose field reach the page of the record that declares it?
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
 * Usage:
 *   node tools/field-render-audit.mjs              # all layers, summary + any failures
 *   node tools/field-render-audit.mjs --verbose    # per-field counts even when clean
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const DATA = join(ROOT, 'data');
const VERBOSE = process.argv.includes('--verbose');

if (!existsSync(OUT)) {
  console.error('field-render-audit: no build at out/ — run `npm run build` first (exit 2)');
  process.exit(2);
}

/** Prose fields, DERIVED from each schema rather than listed: string, no enum/format/pattern. */
function proseFields(schemaName) {
  const s = JSON.parse(readFileSync(join(ROOT, 'schemas', `${schemaName}.schema.json`), 'utf8'));
  const out = [];
  const walk = (props, prefix) => {
    for (const [k, v] of Object.entries(props || {})) {
      if (v.type === 'string' && !v.enum && !v.format && !v.pattern) {
        out.push({ path: prefix + k, description: v.description || '' });
      }
      if (v.type === 'array' && v.items?.type === 'object') walk(v.items.properties, `${prefix}${k}[].`);
      if (v.type === 'object') walk(v.properties, `${prefix}${k}.`);
    }
  };
  walk(s.properties, '');
  return out;
}

/** Every value a record carries at a (possibly nested) field path. */
function valuesAt(record, path) {
  const parts = path.split('.');
  let cur = [record];
  for (const raw of parts) {
    const isArr = raw.endsWith('[]');
    const key = isArr ? raw.slice(0, -2) : raw;
    const next = [];
    for (const node of cur) {
      if (node == null || typeof node !== 'object') continue;
      const v = node[key];
      if (v == null) continue;
      if (isArr) { if (Array.isArray(v)) next.push(...v); }
      else next.push(v);
    }
    cur = next;
  }
  return cur.filter((v) => typeof v === 'string' && v.trim().length > 0);
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
  const stripped = raw.replace(/<[^>]+>/g, ' ');
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
let checkedFields = 0;
const rows = [];

for (const layer of LAYERS) {
  const records = loadLayer(layer);
  const fields = proseFields(layer);
  const cache = new Map();
  for (const f of fields) {
    let carried = 0, rendered = 0, noPage = 0;
    for (const r of records) {
      const vals = valuesAt(r, f.path);
      if (vals.length === 0) continue;
      carried += 1;
      if (!cache.has(r.id)) cache.set(r.id, pageText(layer, r.id));
      const text = cache.get(r.id);
      if (text === null) { noPage += 1; continue; }
      if (vals.every((v) => text.includes(norm(v)))) rendered += 1;
    }
    if (carried === 0) continue;
    checkedFields += 1;
    const missing = carried - rendered - noPage;
    rows.push({ layer, path: f.path, carried, rendered, missing, noPage });
    if (missing > 0) invisible += missing;
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
      `    ${r.path.padEnd(width)}  carried ${String(r.carried).padStart(4)}` +
      `  rendered ${String(r.rendered).padStart(4)}` +
      `  missing ${String(r.missing).padStart(4)}${flag}`,
    );
  }
  console.log('');
}

const perLayer = LAYERS.map((l) => {
  const rs = rows.filter((r) => r.layer === l);
  const m = rs.reduce((a, r) => a + r.missing, 0);
  return `${l} ${rs.length} field(s)/${m} invisible`;
}).join(' · ');

if (invisible > 0) {
  console.error(
    `field-render-audit FAILED — ${invisible} record-field(s) carry a value that never reaches ` +
    `the record's own page.\n  ${perLayer}\n\n` +
    '  A field the page does not carry is invisible to a reader while looking correct to every\n' +
    '  other gate. Either render it, or state in its schema description why it is not rendered.',
  );
  process.exit(1);
}
console.log(`field-render-audit OK — ${checkedFields} prose field(s) across ${LAYERS.length} layers, 0 invisible · ${perLayer}`);
