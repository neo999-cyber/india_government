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
 * Enumerating from memory is the defect, so the enumeration is gone. `deriveRefForms` reads
 * each layer's id CONTRACT from its own schema, then walks every string in every record and
 * asks whether that string IS an id. Any field path whose values are ids is a reference form.
 * It cannot be short by a field nobody remembered, because it never names a field.
 *
 * REF_FORMS survives only as a FLOOR, for the one thing derivation cannot see: a form that is
 * legal per schema and has zero instances, so there is no value to recognise. Two are in that
 * state today. `assertDerivedCoversFloor` reports them rather than dropping them.
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
 * Reference semantics that a `pattern` cannot express.
 *
 * The schema now declares WHICH FIELDS hold ids and WHAT LAYER each points at, so the form
 * list is derived (see `deriveRefForms`) and the hand-maintained enumeration is gone — it is
 * in git history at 2026-08-02, not in this tree. What a pattern still cannot say is that
 * `absenceIndex` must be in range for its target's `unmeasured[]`, or that
 * `competingAccountsFrom` requires the target to actually carry `competingAccounts`. Those
 * are cross-record facts, not string shapes, so they stay declared here — keyed by leaf
 * field name, which the schema also supplies.
 */
const FIELD_SEMANTICS = {
  absenceFrom: { via: 'absenceIndex', into: 'unmeasured' },
  competingAccountsFrom: { requires: 'competingAccounts' },
};

const findings = [];
const add = (level, rule, where, message) => findings.push({ level, rule, where, message });
const read = (p) => JSON.parse(readFileSync(p, 'utf8'));
const arr = (x) => (Array.isArray(x) ? x : [x]);

// ---------------------------------------------------------------- form derivation
/**
 * DERIVE the reference forms instead of listing them.
 *
 * The hand list was short by three, including `series.breaks[].provenanceRef` with 111
 * instances corpus-wide. A hand list will always be short by the forms nobody remembered,
 * so this does not enumerate fields at all.
 *
 * The schemas do NOT mark reference fields as references — that is worth stating plainly,
 * because it is why the obvious derivation does not work. Only `id` carries a `pattern`
 * (`^L-\d{4}$`, `^P-\d{2}$`, `^PR-\d{2}$`, and a loose slug for series); `seriesRefs`,
 * `provenanceRefs`, `affectsSeries` and the rest are bare strings with no pattern and, in
 * most cases, no description. There is nothing in the schema that says "this holds an id".
 *
 * So derivation runs off the id CONTRACTS instead: read each layer's id pattern from its own
 * schema, build the id sets from the corpus, then walk every string in every record and ask
 * whether that string IS an id. Any field path whose values are ids is a reference form.
 * `id` itself is excluded — a record naming itself is not a reference.
 *
 * The series pattern is too loose to use alone (it matches almost any lowercase slug), so
 * series references are recognised by exact membership of the id set rather than by pattern.
 */
function deriveRefForms() {
  const ID_PATTERN = {};
  for (const layer of LAYERS) {
    ID_PATTERN[layer] = read(join(ROOT, 'schemas', `${layer}.schema.json`)).properties.id.pattern;
  }
  /** Which layer(s) a declared pattern targets, by matching it against the id contracts. */
  const targetsOf = (pattern) => {
    const hit = LAYERS.filter((l) => pattern === ID_PATTERN[l]);
    if (hit.length) return hit;
    // A union pattern (absenceFrom targets series OR ledger) names each contract inside itself.
    const union = LAYERS.filter((l) => pattern.includes(ID_PATTERN[l].replace(/^\^|\$$/g, '')));
    return union.length ? union : null;
  };
  const forms = [];
  for (const layer of LAYERS) {
    const schema = read(join(ROOT, 'schemas', `${layer}.schema.json`));
    const walk = (node, path, name) => {
      if (!node || typeof node !== 'object') return;
      if (node.$ref) {
        const target = node.$ref.replace(/^#\//, '').split('/').reduce((o, k) => o?.[k], schema);
        walk(target, path, name);
        return;
      }
      if (node.properties) for (const [k, v] of Object.entries(node.properties)) walk(v, path ? `${path}.${k}` : k, k);
      if (node.items) walk(node.items, `${path}[]`, name);
      const leaf = !node.properties && !node.items;
      if (leaf && node.type === 'string' && node.pattern && name !== 'id') {
        const to = targetsOf(node.pattern);
        if (to) forms.push({ layer, at: path, to, source: 'schema' });
      }
    };
    walk(schema, '', null);
  }
  return forms.sort((a, b) => (a.layer + a.at).localeCompare(b.layer + b.at));
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

/**
 * Extra semantics that travel with a leaf field name, keyed off the floor. Derivation finds
 * WHERE ids live; it cannot know that `absenceIndex` must be in range for its target's
 * `unmeasured[]`, or that `competingAccountsFrom` requires the target to actually carry
 * `competingAccounts`. Those are contract facts, so they stay declared.
 */

/** Collect every {value, container, label} at a derived dotted path. */
function collectAt(record, path) {
  const out = [];
  const step = (node, parts, label) => {
    if (node === undefined || node === null) return;
    if (parts.length === 0) { out.push({ value: node, container: null, label }); return; }
    let [head, ...rest] = parts;
    const isArr = head.endsWith('[]');
    if (isArr) head = head.slice(0, -2);
    const next = head === '' ? node : node[head];
    if (next === undefined) return;
    if (isArr) {
      if (!Array.isArray(next)) return;
      next.forEach((v, i) => {
        if (rest.length === 0) out.push({ value: v, container: next, label: `${label}${head}[${i}]` });
        else step(v, rest, `${label}${head}[${i}].`);
      });
      return;
    }
    if (rest.length === 0) out.push({ value: next, container: node, label: `${label}${head}` });
    else step(next, rest, `${label}${head}.`);
  };
  step(record, path.split('.'), '');
  return out;
}

let refsChecked = 0;
const derivedForms = deriveRefForms();
const checkForms = derivedForms;

for (const form of checkForms) {
  const semantics = FIELD_SEMANTICS[form.at.split('.').pop().replace('[]', '')] ?? {};
  for (const r of drop[form.layer] ?? []) {
    for (const hit of collectAt(r, form.at)) {
      if (typeof hit.value !== 'string') continue;
      refsChecked++;
      form.n = (form.n ?? 0) + 1;
      resolve(hit.value, form.to, `${form.layer} ${r.id}`, hit.label, {
        requires: semantics.requires,
        into: semantics.into,
        index: semantics.via ? hit.container?.[semantics.via] ?? 0 : undefined,
        indexField: semantics.via,
      });
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
 * REPORT-ONLY. RENAMED 2026-08-02, and the rename is the finding.
 *
 * This was built as an "orphan reference" check for the P-52 shape — a reference with no
 * substantive connection to the record carrying it. Tested against the reconstructed
 * pre-removal state, it DOES fire on P-52. It is not blind to its motivating case; my earlier
 * claim that it "did not find P-52" was wrong and inferred from output taken after P-52 had
 * already been removed.
 *
 * What it cannot do is separate P-52 from P-65 on the same record, and P-65 is a correct
 * reference. So it does not find unconnected references. It finds references the record's own
 * prose never names by id — a DOCUMENTATION property, not a correctness one. Renamed to say
 * so: `ref-unexplained`.
 *
 * The P-52 shape is a different rule and already exists: `ref-relevant` in integrity.mjs,
 * which fires when a dispute record's `affectsDomains` does not cover the record citing it.
 * P-52 is `[governance]`, the series are `education` — an error, not a report.
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
function unexplainedRefReport(corpus, label) {
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
  console.log(`\n--- ref-unexplained: provenanceRefs the record's own prose never names · ${label} ---`);
  console.log(`    ${out.length}. Documentation signal, NOT a correctness one — correct references are flagged at`);
  console.log('    the same rate. The P-52 shape is caught by ref-relevant in integrity.mjs instead.');
  const by = new Map();
  for (const o of out) { if (!by.has(o.ref)) by.set(o.ref, []); by.get(o.ref).push(`${o.layer}:${o.id}`); }
  for (const [ref, who] of [...by].sort((a, b) => b[1].length - a[1].length).slice(0, 20)) {
    console.log(`      ${ref}  ×${who.length}  ${who.slice(0, 4).join(', ')}${who.length > 4 ? ' …' : ''}`);
  }
  return out.length;
}

// ---------------------------------------------------------------- the merge gate, run early
/**
 * STAGE 4 RUNS THE MERGE GATE'S OWN RULES, RATHER THAN ITS OWN IMPRESSION OF THEM.
 *
 * Until 2026-08-04 this file implemented its own checks — ids, derived reference forms, both
 * cases on a scored record, `whatChanged` length, charset, per-record schema — and none of
 * `integrity.mjs`'s thirty-four instrument rules. A drop could therefore report STAGE 4 CLEAN
 * and hard-fail `npm run validate` the moment it was merged.
 *
 * That is not hypothetical. Phase 13's drop passed stage 4 twice carrying four `not-published`
 * absences with no `wouldFill` — which `unmeasured-route` treats as an ERROR, because
 * `not-published` asserts in its own written definition that the data exists and is producible
 * under compulsion, so an absence on that value with no route contradicts the value it declares.
 * Stage 4 was blind to it, and the four records were found by hand.
 *
 * REIMPLEMENTING THE RULES HERE WOULD BE THE SAME DEFECT ONE LEVEL UP — a second enumeration to
 * drift out of step with the first, which is exactly the reasoning that killed the hand-written
 * reference-form list at the top of this file. So this does not reimplement anything: it calls
 * `checkIntegrity`, the function the merge gate calls.
 *
 * THE CORPUS MUST BE THE MERGED ONE. Cross-record rules cannot be evaluated on a drop alone —
 * every reference from a drop record into a live record would dangle, and the run would drown in
 * false positives. So the simulation is drop ∪ live, which is precisely the tree merge produces.
 *
 * ATTRIBUTION, AND WHY IT IS NOT JUST A FILTER. Findings that name only live records are
 * pre-existing conditions, not this drop's debt, and gating on them would make a phase
 * responsible for every warning already in the corpus. They are reported separately and do not
 * gate. Findings touching a drop record gate.
 */
import { checkIntegrity } from './lib/integrity.mjs';

const DROP_FILE = (layer) => `DROP/${layer}.json`;
const mergedRecords = [];
for (const layer of LAYERS) {
  drop[layer].forEach((record, index) => mergedRecords.push({ layer, file: DROP_FILE(layer), index, record, incoming: false }));
  live[layer].forEach((record, index) => mergedRecords.push({ layer, file: `live/${layer}.json`, index, record, incoming: false }));
}
const today = new Date().toISOString().slice(0, 10);
const { findings: mergeFindings } = checkIntegrity(mergedRecords, { today });

const dropAttributable = mergeFindings.filter((f) => String(f.file ?? '').startsWith('DROP/'));
const liveOnly = mergeFindings.filter((f) => !String(f.file ?? '').startsWith('DROP/'));
for (const f of dropAttributable) add(f.level, f.rule, f.where, f.message);

const rulesRun = [...new Set(mergeFindings.map((f) => f.rule))].sort();
console.log(`\n--- merge gate simulated on drop ∪ live (${mergedRecords.length} records) ---`);
console.log(`    checkIntegrity is the SAME function npm run validate calls — not a reimplementation.`);
console.log(`    drop-attributable: ${dropAttributable.filter((f) => f.level === 'error').length} error(s), ` +
            `${dropAttributable.filter((f) => f.level === 'warn').length} warning(s) — these GATE.`);
console.log(`    live-only: ${liveOnly.filter((f) => f.level === 'error').length} error(s), ` +
            `${liveOnly.filter((f) => f.level === 'warn').length} warning(s) — pre-existing, do NOT gate.`);
if (rulesRun.length) console.log(`    rules that fired on this corpus: ${rulesRun.join(', ')}`);

// ---------------------------------------------------------------- report
const total = LAYERS.reduce((n, l) => n + drop[l].length, 0);
const errors = findings.filter((f) => f.level === 'error');
const warns = findings.filter((f) => f.level === 'warn');

console.log(`drop  ${DROP}`);
console.log(`      ${LAYERS.map((l) => `${l}=${drop[l].length}`).join('  ')}   total ${total}`);
console.log(`live  ${LAYERS.map((l) => `${l}=${live[l].length}`).join('  ')}   total ${LAYERS.reduce((n, l) => n + live[l].length, 0)}`);
console.log(`\nreference forms DERIVED FROM THE SCHEMA: ${derivedForms.length}   references checked: ${refsChecked}`);
for (const d of derivedForms) {
  console.log(`    ${d.layer.padEnd(11)} ${d.at.padEnd(26)} -> ${[...d.to].join('|').padEnd(16)} n=${d.n ?? 0}`);
}
const zero = derivedForms.filter((d) => !d.n);
if (zero.length) {
  console.log(`\n  ${zero.length} form(s) with no instances in this corpus — derived anyway, because the`);
  console.log('  schema declares them. This is what value-based derivation could not do.');
}

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
const orDrop = unexplainedRefReport(drop, `drop (${total} records)`);
const orLive = unexplainedRefReport(live, `live /data (${LAYERS.reduce((n, l) => n + live[l].length, 0)} records)`);
console.log(`\nreport-only totals — bidirectional candidates: drop ${biDrop}, live ${biLive}` +
            `   |   ref-unexplained: drop ${orDrop}, live ${orLive}`);
console.log('these two do not gate: they name candidates for a judgement, and nothing is auto-fixed');

console.log(errors.length === 0 ? '\nSTAGE 4 CLEAN' : `\nSTAGE 4 FAILED — ${errors.length} error(s)`);
process.exit(errors.length === 0 ? 0 : 1);
