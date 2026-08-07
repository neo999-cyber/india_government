#!/usr/bin/env node
/**
 * INDEPENDENCE — a judgement was made about the relationship between the evidence and the claim, and
 * the citations do not contradict it.
 *
 * WHY IT EXISTS. Independence is the axis five rulings turned on and the pass of 6 August 2026 moved
 * nine verdicts on it. IT WAS RECORDED NOWHERE: nine records state a finding in `assessmentNote`, in
 * five distinguishable forms, and 212 state nothing of any kind. **A pass that cannot be reproduced
 * from the data is a pass that will drift** — a later cycle wanting to know which records rest on
 * the announcing body had to re-derive it by hand, from citations, for every record.
 *
 * WHAT IT BINDS:
 *   1. Every evaluative record carries `independence`, or is UNVALUED and counted. Unvalued is a
 *      legitimate state and is reported rather than failed — where a record's own evidence does not
 *      settle the question, forcing a value would assert a judgement nobody made.
 *   2. The value is not CONTRADICTED by the citations. `external` requires at least one citation
 *      outside the Indian official ladder; `none` requires that none exists.
 *
 * **WHAT IT CANNOT CHECK, AND THIS IS THE IMPORTANT LIMIT.** It cannot check the JUDGEMENT. Whether
 * a source bears on the limb in dispute, whether the document is actually held, and above all
 * whether an intra-state publication exists TO REPORT OR TO PERSUADE — the whole of Ruling 1a — are
 * readings of the document and no gate reaches them. **TIER GRADES THE ARTEFACT AND INDEPENDENCE
 * GRADES THE RELATIONSHIP**, so a T1 CAG performance audit is independent of the ministry it audits
 * and a T4 press relay of that ministry's own release is not. The check below uses tier because it
 * is the only mechanical signal available, and it therefore catches CONTRADICTIONS and nothing else.
 * A record can pass it and be wrong.
 *
 * Usage:
 *   node tools/independence.mjs
 *   node tools/independence.mjs --verbose
 *   node tools/independence.mjs --control
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

const EVALUATIVE = new Set(['worked', 'partly', 'failed', 'reversed']);
/**
 * Tiers that are, BY CONSTRUCTION, not the Indian state: a foreign government primary, a
 * multilateral, peer-reviewed research, a contested composite index.
 *
 * **T4 IS DELIBERATELY NOT HERE AND THE OMISSION IS THE WHOLE PRECISION OF THIS CHECK.** T4 is
 * reported journalism and NGO datasets, and it holds both ASER — an independent survey outside the
 * state — and a press relay of a ministry's own release. It therefore establishes NOTHING in either
 * direction, and including it would have produced false failures on both: `external` refused where
 * ASER carries the claim, `none` refused where the only citation is a newspaper repeating a PIB
 * note.
 */
const OUTSIDE = new Set(['T1F', 'T2', 'T3', 'T5']);

function ledger() {
  const dir = join(ROOT, 'data/ledger');
  const out = [];
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    for (const r of JSON.parse(readFileSync(join(dir, f), 'utf8'))) out.push(r);
  }
  return out;
}

export function check(recs) {
  const bad = [];
  const scope = recs.filter((r) => EVALUATIVE.has(r.assessment));
  for (const r of scope) {
    if (!r.independence) continue; // unvalued: counted below, never failed
    const outside = (r.sources ?? []).filter((s) => OUTSIDE.has(s.tier));
    // `external` is refuted only where EVERY citation is T1, the one tier that is definitionally
    // the Indian state. A T4 citation may be ASER or may be a PIB relay, so it cannot refute.
    const allT1 = (r.sources ?? []).length > 0 && (r.sources ?? []).every((s) => s.tier === 'T1');
    if (r.independence === 'external' && allT1)
      bad.push(`${r.id}: graded \`external\` and every citation is T1 — Indian official by definition. The grade is contradicted by the record's own sources. (Tier cannot PROVE independence; it can refute this.)`);
    if (r.independence === 'none' && outside.length > 0)
      bad.push(`${r.id}: graded \`none\` and carries ${outside.length} citation(s) outside the Indian official ladder (${[...new Set(outside.map((s) => s.tier))].join(', ')}). Either one of them bears on the claim, or the grade is wrong.`);
  }
  // A value outside the evaluative class is a schema error, not ours — but assert it, because the
  // conditional was added in the same commit as the field and a guard that trusts its sibling is
  // the shape this instrument has been burned by.
  for (const r of recs) {
    if (r.independence && !EVALUATIVE.has(r.assessment))
      bad.push(`${r.id}: carries \`independence\` on a \`${r.assessment}\` record. The grade is a property of evidence for a claim about an outcome, and this record asserts none.`);
  }
  return { bad, scope };
}

function run() {
  const recs = ledger();
  const { bad, scope } = check(recs);
  const valued = scope.filter((r) => r.independence);
  const counts = {};
  for (const r of valued) counts[r.independence] = (counts[r.independence] ?? 0) + 1;
  if (VERBOSE) {
    for (const r of scope.filter((x) => !x.independence))
      console.log(`  UNVALUED ${r.id} [${r.assessment}] — the record's own evidence does not settle it`);
  }
  if (bad.length) {
    console.error(`independence FAILED — ${bad.length} finding(s)\n`);
    for (const b of bad) console.error('  - ' + b);
    console.error('\n  Tier grades the ARTEFACT; this grades the RELATIONSHIP. The check catches\n  contradictions between the two and cannot check the judgement itself.');
    process.exit(1);
  }
  console.log(
    `independence: ${scope.length} evaluative records · ${valued.length} graded · ${scope.length - valued.length} unvalued · ` +
      `${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(' · ')} · ` +
      `judgement not checked, by construction`,
  );
}

function control() {
  let f = 0;
  const chk = (label, ok, d) => { if (!ok) { f++; console.error(`  control FAILED: ${label}${d ? ` — ${d}` : ''}`); } };
  const T1 = [{ name: 'a', url: 'u', tier: 'T1' }];
  const MIX = [{ name: 'a', url: 'u', tier: 'T1' }, { name: 'b', url: 'v', tier: 'T2' }];

  let r = check([{ id: 'L-9000', assessment: 'partly', independence: 'external', sources: T1 }]);
  chk('`external` with only T1 citations is named', r.bad.length === 1 && /contradicted/.test(r.bad[0]), JSON.stringify(r.bad));
  r = check([{ id: 'L-9005', assessment: 'partly', independence: 'external', sources: [{ name: 'ASER', url: 'u', tier: 'T4' }] }]);
  chk('`external` on a T4 citation passes — T4 holds ASER and holds a PIB relay, and decides neither', r.bad.length === 0, JSON.stringify(r.bad));
  r = check([{ id: 'L-9006', assessment: 'partly', independence: 'none', sources: [{ name: 'relay', url: 'u', tier: 'T4' }] }]);
  chk('`none` on a T4 citation also passes, for the same reason', r.bad.length === 0, JSON.stringify(r.bad));
  r = check([{ id: 'L-9000', assessment: 'partly', independence: 'external', sources: MIX }]);
  chk('`external` with a non-T1 citation passes', r.bad.length === 0, JSON.stringify(r.bad));

  r = check([{ id: 'L-9001', assessment: 'failed', independence: 'none', sources: MIX }]);
  chk('`none` with a non-T1 citation is named', r.bad.length === 1 && /the grade is wrong/.test(r.bad[0]), JSON.stringify(r.bad));
  r = check([{ id: 'L-9001', assessment: 'failed', independence: 'none', sources: T1 }]);
  chk('`none` with only T1 citations passes', r.bad.length === 0, JSON.stringify(r.bad));

  // `intra-state` is UNCHECKABLE by tier and must pass either way — asserted so that a later
  // tightening cannot quietly start failing it on a signal that does not bear on the question.
  r = check([{ id: 'L-9002', assessment: 'worked', independence: 'intra-state', sources: T1 }]);
  chk('`intra-state` on T1 passes — a CAG audit is T1 and independent', r.bad.length === 0, JSON.stringify(r.bad));
  r = check([{ id: 'L-9002', assessment: 'worked', independence: 'intra-state', sources: MIX }]);
  chk('`intra-state` with a non-T1 citation also passes', r.bad.length === 0, JSON.stringify(r.bad));

  r = check([{ id: 'L-9003', assessment: 'contested', independence: 'external', sources: MIX }]);
  chk('a grade on a non-evaluative record is named', r.bad.length === 1 && /asserts none/.test(r.bad[0]), JSON.stringify(r.bad));

  r = check([{ id: 'L-9004', assessment: 'partly', sources: T1 }]);
  chk('an UNVALUED evaluative record passes and is counted', r.bad.length === 0 && r.scope.length === 1, JSON.stringify(r.bad));

  if (f) { console.error(`independence control: ${f} control(s) failed`); process.exit(1); }
  console.log('independence control: `external` on T1-only and `none` with a non-T1 citation are each named; both pass when the citations agree; `intra-state` passes either way because tier cannot reach it; a grade outside the evaluative class is named; an unvalued record passes and is counted — the checker fails when it should');
}

if (argv.includes('--control')) control();
else run();
