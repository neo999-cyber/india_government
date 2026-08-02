/**
 * Stage 4 self-check for a drop directory, per docs/phase-command-spec-v2.md.
 *
 * Usage:  node tools/stage4-selfcheck.mjs <drop-records-dir> [--data <dir>]
 *
 * WHY THIS FILE EXISTS RATHER THAN A CHECKLIST.
 *
 * The 2026-08-02 education run ran stage 4 from a hand-written check that enumerated the
 * cross-reference forms from memory. It got six of nine. The three it missed —
 * `series.breaks[].provenanceRef` (67 live instances in that drop),
 * `pairs.{a,b}.absenceFrom` and `pairs.{a,b}.competingAccountsFrom` — every one of them a
 * reference that resolves to nothing if the target is renamed, and none of them visible to
 * JSON Schema, which type-checks a string and cannot know what it points at.
 *
 * Enumerating from memory is the defect. So REF_FORMS below is the enumeration, and
 * `auditRefFormCoverage` reads the schemas and FAILS if it finds a reference-shaped field
 * that REF_FORMS does not mention. A tenth form added to a schema breaks this check on the
 * next run instead of being silently unvalidated. That is the fix; the instance fix alone
 * would not have found the other two.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sweepRecord } from './lib/charset.mjs';
import { compileSchemas } from './lib/schema.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const DROP = args[0] ? join(process.cwd(), args[0]) : null;
const DATA = args.includes('--data') ? args[args.indexOf('--data') + 1] : join(ROOT, 'data');
if (!DROP) {
  console.error('usage: node tools/stage4-selfcheck.mjs <drop-records-dir> [--data <dir>]');
  process.exit(2);
}

const LAYERS = ['series', 'ledger', 'provenance', 'pairs'];

/**
 * Every way one record points at another.
 *
 * `at` is where the id lives, `to` is the layer(s) it must resolve into. `via` marks forms
 * that carry an index alongside the id, which is checked for range as well as existence —
 * a resolving id with an out-of-range index is a dangling reference that looks fine.
 */
const REF_FORMS = [
  { layer: 'ledger',     at: 'seriesRefs[]',                    to: ['series'] },
  { layer: 'ledger',     at: 'provenanceRefs[]',                to: ['provenance'] },
  { layer: 'series',     at: 'provenanceRefs[]',                to: ['provenance'] },
  { layer: 'series',     at: 'breaks[].provenanceRef',          to: ['provenance'] },
  { layer: 'provenance', at: 'affectsSeries[]',                 to: ['series'] },
  { layer: 'provenance', at: 'correctiveSeries[]',              to: ['series'] },
  { layer: 'pairs',      at: 'provenanceRefs[]',                to: ['provenance'] },
  { layer: 'pairs',      at: 'ledgerRefs[]',                    to: ['ledger'] },
  { layer: 'pairs',      at: '{a,b}.series',                    to: ['series'] },
  { layer: 'pairs',      at: '{a,b}.absenceFrom',               to: ['series', 'ledger'], via: 'absenceIndex', into: 'unmeasured' },
  { layer: 'pairs',      at: '{a,b}.competingAccountsFrom',     to: ['provenance'], requires: 'competingAccounts' },
];

/** Leaf field names REF_FORMS accounts for; the audit compares the schemas against this. */
const KNOWN_FIELDS = new Set([
  'seriesRefs', 'provenanceRefs', 'provenanceRef', 'affectsSeries', 'correctiveSeries',
  'ledgerRefs', 'series', 'absenceFrom', 'absenceIndex', 'competingAccountsFrom',
]);
/** Reference-shaped by name but not a record pointer. Each exclusion states its reason. */
const NOT_A_REFERENCE = new Map([
  ['id', 'the record\'s own identifier, not a pointer'],
  ['affectsDomains', 'an enum of domains, not record ids'],
  ['bridgeExists', 'a boolean'],
  ['bridgeNote', 'prose'],
  ['confidence', 'an enum'],
  ['seriesRef', 'not a field in any schema — kept here because an earlier check invented it'],
]);

const findings = [];
const add = (level, rule, where, message) => findings.push({ level, rule, where, message });
const read = (p) => JSON.parse(readFileSync(p, 'utf8'));
const arr = (x) => (Array.isArray(x) ? x : [x]);

// ---------------------------------------------------------------- schema audit
/**
 * Read the schemas and flag any reference-shaped leaf REF_FORMS does not cover.
 * This is the part that survives a schema change; the enumeration above is not.
 */
function auditRefFormCoverage() {
  const HINT = /(ref|refs|from|series|affects|corrective)$/i;
  const seen = new Set();
  const walk = (node, name) => {
    if (!node || typeof node !== 'object') return;
    if (node.properties) for (const [k, v] of Object.entries(node.properties)) walk(v, k);
    if (node.items) walk(node.items, name);
    if (node.$defs) for (const v of Object.values(node.$defs)) walk(v, name);
    for (const key of ['allOf', 'anyOf', 'oneOf']) for (const v of node[key] ?? []) walk(v, name);
    const leaf = !node.properties && !node.items;
    if (leaf && name && HINT.test(name)) seen.add(name);
  };
  for (const layer of LAYERS) walk(read(join(ROOT, 'schemas', `${layer}.schema.json`)), null);
  for (const name of seen) {
    if (KNOWN_FIELDS.has(name) || NOT_A_REFERENCE.has(name)) continue;
    add('error', 'ref-form-unenumerated', `schemas/*.schema.json → ${name}`,
      `a reference-shaped field the stage-4 checker does not validate. Add it to REF_FORMS (or to ` +
      `NOT_A_REFERENCE with a reason) — an unenumerated form is a cross-reference nobody checks`);
  }
  return seen;
}

// ---------------------------------------------------------------- load
const drop = {};
for (const layer of LAYERS) {
  const p = join(DROP, `${layer}.json`);
  drop[layer] = existsSync(p) ? arr(read(p)) : [];
}
const live = { series: [], ledger: [], provenance: [], pairs: [] };
(function walkData(dir) {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'incoming') continue;
    const f = join(dir, e.name);
    if (e.isDirectory()) { walkData(f); continue; }
    if (!e.name.endsWith('.json')) continue;
    const rel = f.slice(DATA.length + 1);
    const layer = LAYERS.find((l) => rel.startsWith(l));
    if (layer) live[layer].push(...arr(read(f)));
  }
})(DATA);

const universe = {};
const dropIds = {};
for (const layer of LAYERS) {
  universe[layer] = new Map();
  dropIds[layer] = new Set(drop[layer].map((r) => r.id));
  for (const r of [...live[layer], ...drop[layer]]) universe[layer].set(r.id, r);
}

// ---------------------------------------------------------------- 1. ids
for (const layer of LAYERS) {
  const seen = new Map();
  for (const [i, r] of drop[layer].entries()) {
    if (seen.has(r.id)) add('error', 'id-duplicate', `${layer} ${r.id}`, `also at ${layer}[${seen.get(r.id)}]`);
    else seen.set(r.id, i);
  }
  const liveIds = new Set(live[layer].map((r) => r.id));
  for (const r of drop[layer]) {
    if (liveIds.has(r.id)) add('error', 'id-collision', `${layer} ${r.id}`, 'id already exists in /data');
  }
}

// ---------------------------------------------------------------- 2. references
function resolve(id, to, where, formLabel, extra = {}) {
  for (const layer of to) {
    const target = universe[layer].get(id);
    if (!target) continue;
    if (extra.requires && !target[extra.requires]) {
      add('error', 'dangling-ref', where, `${formLabel} "${id}" resolves to ${layer} but that record has no \`${extra.requires}\``);
      return;
    }
    if (extra.into) {
      const list = target[extra.into] ?? [];
      const i = extra.index ?? 0;
      if (!Number.isInteger(i) || i < 0 || i >= list.length) {
        add('error', 'dangling-ref', where,
          `${formLabel} "${id}" resolves, but ${extra.indexField} ${i} is out of range for its ${list.length}-entry \`${extra.into}\``);
      }
    }
    return;
  }
  add('error', 'dangling-ref', where, `${formLabel} "${id}" resolves to nothing in ${to.join(' or ')}`);
}

let refsChecked = 0;
for (const form of REF_FORMS) {
  for (const r of drop[form.layer]) {
    const where = `${form.layer} ${r.id}`;
    if (form.at.startsWith('{a,b}')) {
      const field = form.at.split('.')[1];
      for (const side of ['a', 'b']) {
        const s = r[side];
        if (!s || typeof s !== 'object' || s[field] === undefined) continue;
        refsChecked++;
        resolve(s[field], form.to, where, `${side}.${field}`, {
          requires: form.requires,
          into: form.into,
          index: form.via ? s[form.via] ?? 0 : undefined,
          indexField: form.via,
        });
      }
    } else if (form.at.startsWith('breaks[]')) {
      const field = form.at.split('.')[1];
      for (const [i, b] of (r.breaks ?? []).entries()) {
        if (b[field] === undefined) continue;
        refsChecked++;
        resolve(b[field], form.to, where, `breaks[${i}].${field}`);
      }
    } else {
      const field = form.at.replace('[]', '');
      for (const id of r[field] ?? []) { refsChecked++; resolve(id, form.to, where, field); }
    }
  }
}

// ---------------------------------------------------------------- 3-5. content
const SCORED = new Set(['worked', 'partly', 'failed', 'reversed', 'contested', 'too-early']);
for (const r of drop.ledger) {
  if (!SCORED.has(r.assessment)) continue;
  for (const f of ['caseFor', 'caseAgainst']) {
    const n = (r[f] ?? '').trim().length;
    if (n === 0) add('error', 'missing-case', `ledger ${r.id}`, `${r.assessment} but no ${f}`);
    else if (n < 200) add('warn', 'thin-case', `ledger ${r.id}`, `${f} is ${n} chars`);
  }
}
const WC_FLOOR = 200;
for (const r of drop.provenance) {
  const n = (r.whatChanged ?? '').length;
  if (n < WC_FLOOR) add(n < 120 ? 'error' : 'warn', 'whatChanged-short', `provenance ${r.id}`, `${n} chars, floor ${WC_FLOOR}`);
}
for (const layer of LAYERS) {
  for (const r of drop[layer]) {
    for (const f of sweepRecord(r)) add(f.level, f.rule, `${layer} ${r.id} · ${f.where}`, f.message);
  }
}

// ---------------------------------------------------------------- 6. schema validity
const { validators } = compileSchemas(join(ROOT, 'schemas'));
for (const layer of LAYERS) {
  for (const r of drop[layer]) {
    if (validators[layer](r)) continue;
    for (const e of validators[layer].errors) {
      add('error', 'schema', `${layer} ${r.id}`, `${e.instancePath || '(root)'} ${e.message}`);
    }
  }
}

// ---------------------------------------------------------------- 7. bidirectional references
/**
 * REPORT-ONLY. Three one-way links were found by hand in two cycles — P-64 missing
 * `teacher-vacancy-rate-elementary`, P-64 missing `employment`, P-68 unreciprocated by the two
 * ASER reading series. Author-side memory is not a control.
 *
 * `integrity.mjs` already checks provenance → series. It does NOT check series → provenance, which
 * is the direction all three misses were in. Only series ↔ provenance is genuinely bidirectional:
 * nothing on a series points back at a ledger record, and provenance has no `affectsLedger`, so
 * `ledger.seriesRefs`, `ledger.provenanceRefs`, `pairs.ledgerRefs` and `pairs.provenanceRefs` have
 * no reverse to assert and are out of scope by construction, not by omission.
 *
 * ASYMMETRY IS SOMETIMES CORRECT. A dispute record legitimately need not reach every series that
 * cites it. So this REPORTS CANDIDATES and never mirrors: the judgement is whether the dispute
 * actually reaches the series, and that is a research call, not a mechanical one.
 */
function bidirectionalReport(corpus, label) {
  const series = new Map(corpus.series.map((r) => [r.id, r]));
  const prov = new Map(corpus.provenance.map((r) => [r.id, r]));
  const out = [];
  const declares = (s, pid) =>
    (s.provenanceRefs ?? []).includes(pid) || (s.breaks ?? []).some((b) => b.provenanceRef === pid);
  const covers = (p, sid) =>
    (p.affectsSeries ?? []).includes(sid) || (p.correctiveSeries ?? []).includes(sid);

  for (const s of corpus.series) {
    const cited = new Set([...(s.provenanceRefs ?? []), ...(s.breaks ?? []).map((b) => b.provenanceRef)].filter(Boolean));
    for (const pid of cited) {
      const p = prov.get(pid);
      if (!p) continue; // resolution is the resolver's job
      if (!covers(p, s.id)) out.push({ dir: 'series→provenance', from: s.id, to: pid, missing: `${pid}.affectsSeries` });
    }
  }
  for (const p of corpus.provenance) {
    for (const sid of [...(p.affectsSeries ?? []), ...(p.correctiveSeries ?? [])]) {
      const s = series.get(sid);
      if (!s) continue;
      if (!declares(s, p.id)) out.push({ dir: 'provenance→series', from: p.id, to: sid, missing: `${sid}.provenanceRefs` });
    }
  }
  console.log(`\n--- bidirectional reference candidates · ${label} ---`);
  console.log(`    ${out.length} unreciprocated link(s). Asymmetry may be correct — these are candidates, not defects.`);
  for (const o of out.slice(0, 40)) console.log(`      ${o.dir}  ${o.from} → ${o.to}   not declared in ${o.missing}`);
  if (out.length > 40) console.log(`      … ${out.length - 40} more`);
  return out.length;
}

// ---------------------------------------------------------------- 8. orphan references
/**
 * REPORT-ONLY. The P-52 shape: a provenanceRef carried by three education-spending series,
 * mentioned in no note, caveat or bridge, pointing at the PMLA conviction-rate dispute. JSON Schema
 * sees a well-formed string; the resolver sees an id that exists; a reader sees nothing at all.
 *
 * A reference nobody explains is a reference nobody can check.
 */
const PROSE_KEYS = new Set([
  'title', 'summary', 'whatHappened', 'whatChanged', 'caseFor', 'caseAgainst', 'caveat', 'notes',
  'assessmentNote', 'claimAtLaunch', 'denominator', 'bridgeNote', 'framing', 'gapReason', 'gapUnit',
  'note', 'why', 'what', 'wouldFill', 'label', 'position', 'holder',
]);
function proseOf(record) {
  const parts = [];
  const walk = (n, key) => {
    if (typeof n === 'string') { if (PROSE_KEYS.has(key)) parts.push(n); return; }
    if (Array.isArray(n)) { for (const v of n) walk(v, key); return; }
    if (n && typeof n === 'object') for (const [k, v] of Object.entries(n)) walk(v, k);
  };
  walk(record, null);
  return parts.join('   ');
}
function orphanReport(corpus, label) {
  const out = [];
  for (const layer of ['series', 'ledger', 'pairs']) {
    for (const r of corpus[layer]) {
      const prose = proseOf(r);
      const declared = new Set(r.provenanceRefs ?? []);
      for (const b of r.breaks ?? []) if (b.provenanceRef) declared.delete(b.provenanceRef); // a break note IS the explanation
      for (const pid of declared) {
        if (!prose.includes(pid)) out.push({ layer, id: r.id, ref: pid });
      }
    }
  }
  console.log(`\n--- orphan provenanceRefs (present in no prose) · ${label} ---`);
  console.log(`    ${out.length} reference(s) a reader cannot account for.`);
  const by = new Map();
  for (const o of out) { if (!by.has(o.ref)) by.set(o.ref, []); by.get(o.ref).push(`${o.layer}:${o.id}`); }
  for (const [ref, who] of [...by].sort((a, b) => b[1].length - a[1].length).slice(0, 20)) {
    console.log(`      ${ref}  ×${who.length}  ${who.slice(0, 4).join(', ')}${who.length > 4 ? ' …' : ''}`);
  }
  return out.length;
}

// ---------------------------------------------------------------- report
const formsSeen = auditRefFormCoverage();
const total = LAYERS.reduce((n, l) => n + drop[l].length, 0);
const errors = findings.filter((f) => f.level === 'error');
const warns = findings.filter((f) => f.level === 'warn');

console.log(`drop  ${DROP}`);
console.log(`      ${LAYERS.map((l) => `${l}=${drop[l].length}`).join('  ')}   total ${total}`);
console.log(`live  ${LAYERS.map((l) => `${l}=${live[l].length}`).join('  ')}   total ${LAYERS.reduce((n, l) => n + live[l].length, 0)}`);
console.log(`\nreference forms enumerated: ${REF_FORMS.length}   individual references checked: ${refsChecked}`);
console.log(`schema fields matching the reference shape: ${[...formsSeen].sort().join(', ')}`);

for (const [label, list] of [['ERRORS', errors], ['WARNINGS', warns]]) {
  console.log(`\n===== ${label}: ${list.length} =====`);
  const by = new Map();
  for (const f of list) { if (!by.has(f.rule)) by.set(f.rule, []); by.get(f.rule).push(f); }
  for (const [rule, fs] of [...by].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${rule} (${fs.length})`);
    for (const f of fs.slice(0, 30)) console.log(`    ${f.where}: ${f.message}`);
    if (fs.length > 30) console.log(`    … ${fs.length - 30} more`);
  }
}
// Report-only passes, run separately over each corpus so the counts never merge.
const biDrop = bidirectionalReport(drop, `drop (${total} records)`);
const biLive = bidirectionalReport(live, `live /data (${LAYERS.reduce((n, l) => n + live[l].length, 0)} records)`);
const orDrop = orphanReport(drop, `drop (${total} records)`);
const orLive = orphanReport(live, `live /data (${LAYERS.reduce((n, l) => n + live[l].length, 0)} records)`);
console.log(`\nreport-only totals — bidirectional candidates: drop ${biDrop}, live ${biLive}` +
            `   |   orphan refs: drop ${orDrop}, live ${orLive}`);
console.log('these two do not gate: they name candidates for a judgement, and nothing is auto-fixed');

console.log(errors.length === 0 ? '\nSTAGE 4 CLEAN' : `\nSTAGE 4 FAILED — ${errors.length} error(s)`);
process.exit(errors.length === 0 ? 0 : 1);
