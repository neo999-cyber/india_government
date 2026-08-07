#!/usr/bin/env node
/**
 * OBJECTIVES — Ruling 2 and Ruling 9 become checkable, and the `claimAtLaunch` pairing holds.
 *
 * WHY THE RULES COULD NOT BE ENFORCED BEFORE. Ruling 2 (an unmeasured limb prevents `worked`) and
 * Ruling 9 (a verdict resting on fewer objectives than were announced must say which ground it)
 * both operate on a fact the corpus did not hold: THAT A RECORD ANNOUNCED SEVERAL OBJECTIVES. The
 * phase-15 sweep that produced Ruling 2 counted eight records stating multiple objectives IN THEIR
 * OWN NOTES; reading the 86 `claimAtLaunch` values found 43. A rule whose population is measured by
 * self-narration cannot reach the records that did not narrate, so both rules sat in three files
 * with nothing able to apply them.
 *
 * WHAT IT BINDS:
 *   1. RULING 2 — a record with more than one objective, any of them unmeasured, may not be `worked`.
 *   2. RULING 9 — where any objective does not ground the verdict, the record carries an
 *      `assessmentNote`. The disclosure lives in prose; this asserts the prose EXISTS, not that it
 *      says the right thing.
 *   3. `unmeasuredRef` resolves, and is present only where the measurement is `unmeasured` or
 *      `unmeasurable-no-event`.
 *   4. THE PAIRING the two fields were designed together to prevent: a record whose `claimAtLaunch`
 *      opens `NONE ANNOUNCED` may not carry objectives, and a record carrying objectives has a
 *      `claimAtLaunch` unless it is a Ruling 5 imposed duty, exempted by name.
 *
 * WHAT IT DOES NOT BIND, in its own header rather than implied by a green line:
 *   - WHETHER `grounds` IS RIGHT. That the verdict rests on limb two and not limb four is a reading
 *     of the record's own reasoning and no gate reaches it. This checks that a judgement was made.
 *   - WHETHER THE OBJECTIVES ARE COMPLETE. A record that announced four and lists two passes. The
 *     list is authored from `claimAtLaunch` and nothing can verify it against the announcement.
 *   - RECORDS WITH NO `objectives[]` AT ALL. 180 of 223 carry none, and the field is not required —
 *     making it so would break them in one commit. **So Ruling 2 is enforced on the records that
 *     have the field and is silent on the rest**, which is a smaller claim than "Ruling 2 is
 *     enforced" and is the honest one until the backfill is complete.
 *
 * Usage:
 *   node tools/objectives.mjs
 *   node tools/objectives.mjs --verbose
 *   node tools/objectives.mjs --control
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

/**
 * RULING 5 IMPOSED DUTIES — objectives with no `claimAtLaunch`, because nobody announced them.
 *
 * A duty in a statute, a constitutional provision or a court direction is an objective; it is not a
 * claim. Exempted BY NAME rather than by a heuristic, because "has objectives and no claim" is
 * exactly the shape of a record whose claim someone forgot to fill in.
 */
const IMPOSED_DUTY = {
  'L-0095': 'RTE Act 2009 section 26 — a ten per cent vacancy ceiling owed by the appointing authority, which for KVS and NVS is the Union.',
  'L-0106': "RTE Act 2009 section 25 and the Schedule — the staffing norm maintained 'in each school' by 31 March 2013.",
  'L-0108': "The recruitment process's own object, appointing teachers on merit, as established by the Court's adopted findings.",
};

const NO_CLAIM_TOKEN = /^\s*NONE ANNOUNCED\b/;

function ledger() {
  const dir = join(ROOT, 'data/ledger');
  const out = [];
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    for (const r of JSON.parse(readFileSync(join(dir, f), 'utf8'))) out.push(r);
  }
  return out;
}

/** @returns {{bad: string[], withObjectives: number, entries: number}} */
export function check(recs, imposed = IMPOSED_DUTY) {
  const bad = [];
  let withObjectives = 0;
  let entries = 0;
  for (const r of recs) {
    const objs = r.objectives;
    if (r.claimAtLaunch && NO_CLAIM_TOKEN.test(r.claimAtLaunch) && objs?.length)
      bad.push(`${r.id}: claimAtLaunch opens \`NONE ANNOUNCED\` and the record carries ${objs.length} objective(s). One of the two is wrong.`);
    if (!objs?.length) continue;
    withObjectives++;
    entries += objs.length;

    if (!r.claimAtLaunch && !imposed[r.id])
      bad.push(`${r.id}: carries objectives and no \`claimAtLaunch\`. If these are an imposed duty under Ruling 5, name the record in IMPOSED_DUTY in tools/objectives.mjs with the instrument; otherwise the claim is missing.`);

    const unmeasured = objs.filter((o) => o.measurement === 'unmeasured' || o.measurement === 'unmeasurable-no-event');
    // RULING 2 — governs the class, and only where more than one objective was announced.
    if (objs.length > 1 && unmeasured.length > 0 && r.assessment === 'worked')
      bad.push(`${r.id}: \`worked\` with ${unmeasured.length} unmeasured objective(s) of ${objs.length}. Ruling 2: an unmeasured limb prevents \`worked\`; the verdict is \`partly\`.`);

    // RULING 9 — the disclosure must exist somewhere a reader can find it.
    if (objs.some((o) => !o.grounds) && !r.assessmentNote)
      bad.push(`${r.id}: the verdict rests on fewer than all its objectives and the record carries no \`assessmentNote\`. Ruling 9: name which ground it, which do not, and why.`);

    for (const [i, o] of objs.entries()) {
      if (o.unmeasuredRef === undefined) continue;
      const abs = r.unmeasured ?? [];
      if (o.unmeasuredRef >= abs.length)
        bad.push(`${r.id}.objectives[${i}]: unmeasuredRef ${o.unmeasuredRef} does not resolve — the record declares ${abs.length} absence(s).`);
      if (o.measurement === 'met' || o.measurement === 'not-met')
        bad.push(`${r.id}.objectives[${i}]: measurement \`${o.measurement}\` carries an unmeasuredRef. A measured objective has no absence to point at.`);
    }
  }
  return { bad, withObjectives, entries };
}

function run() {
  const recs = ledger();
  const { bad, withObjectives, entries } = check(recs);
  const multi = recs.filter((r) => (r.objectives ?? []).length > 1);
  const ungrounded = recs.flatMap((r) => (r.objectives ?? []).filter((o) => !o.grounds));
  const byM = {};
  for (const r of recs) for (const o of r.objectives ?? []) byM[o.measurement] = (byM[o.measurement] ?? 0) + 1;
  if (VERBOSE) {
    console.log('  measurement ' + JSON.stringify(byM));
    for (const [id, why] of Object.entries(IMPOSED_DUTY)) console.log(`  IMPOSED DUTY ${id} — ${why.slice(0, 92)}…`);
  }
  if (bad.length) {
    console.error(`objectives FAILED — ${bad.length} finding(s)\n`);
    for (const b of bad) console.error('  - ' + b);
    process.exit(1);
  }
  console.log(
    `objectives: ${recs.length} ledger records · ${withObjectives} carry objectives · ${entries} entries · ` +
      `${multi.length} multi-objective · ${ungrounded.length} objective(s) the verdict does not rest on · ` +
      `measurement ${Object.entries(byM).map(([k, v]) => `${k} ${v}`).join(' · ')} · ` +
      `${Object.keys(IMPOSED_DUTY).length} imposed duties exempt from claimAtLaunch`,
  );
}

/** Two-sided: proved to fail before it is trusted to pass. */
function control() {
  let f = 0;
  const chk = (label, ok, d) => { if (!ok) { f++; console.error(`  control FAILED: ${label}${d ? ` — ${d}` : ''}`); } };
  const base = { id: 'L-9000', assessment: 'partly', claimAtLaunch: 'x', assessmentNote: 'n' };

  // 1. RULING 2, both directions.
  let r = check([{ ...base, assessment: 'worked', objectives: [
    { text: 'a', quantified: true, measurement: 'met', grounds: true },
    { text: 'b', quantified: true, measurement: 'unmeasured', grounds: true }] }], {});
  chk('worked with an unmeasured limb is named', r.bad.length === 1 && /Ruling 2/.test(r.bad[0]), JSON.stringify(r.bad));
  r = check([{ ...base, assessment: 'worked', objectives: [
    { text: 'a', quantified: true, measurement: 'met', grounds: true },
    { text: 'b', quantified: true, measurement: 'met', grounds: true }] }], {});
  chk('worked with every limb measured passes', r.bad.length === 0, JSON.stringify(r.bad));

  // 2. RULING 9 — an ungrounded objective demands the disclosure exist.
  r = check([{ id: 'L-9001', assessment: 'failed', claimAtLaunch: 'x', objectives: [
    { text: 'a', quantified: true, measurement: 'not-met', grounds: true },
    { text: 'b', quantified: true, measurement: 'unmeasured', grounds: false }] }], {});
  chk('an ungrounded objective with no note is named', r.bad.length === 1 && /Ruling 9/.test(r.bad[0]), JSON.stringify(r.bad));
  r = check([{ ...base, assessment: 'failed', objectives: [
    { text: 'a', quantified: true, measurement: 'not-met', grounds: true },
    { text: 'b', quantified: true, measurement: 'unmeasured', grounds: false }] }], {});
  chk('the same record with a note passes', r.bad.length === 0, JSON.stringify(r.bad));

  // 3. unmeasuredRef, both directions.
  r = check([{ ...base, unmeasured: [{ what: 'w', why: 'y' }], objectives: [
    { text: 'a', quantified: true, measurement: 'unmeasured', grounds: true, unmeasuredRef: 3 }] }], {});
  chk('a dangling unmeasuredRef is named', r.bad.length === 1 && /does not resolve/.test(r.bad[0]), JSON.stringify(r.bad));
  r = check([{ ...base, unmeasured: [{ what: 'w', why: 'y' }], objectives: [
    { text: 'a', quantified: true, measurement: 'met', grounds: true, unmeasuredRef: 0 }] }], {});
  chk('a measured objective pointing at an absence is named', r.bad.length === 1 && /no absence to point at/.test(r.bad[0]), JSON.stringify(r.bad));

  // 4. THE PAIRING, both directions — the contradiction the two fields were designed to prevent.
  r = check([{ ...base, claimAtLaunch: 'NONE ANNOUNCED — a condition, not a measure.', objectives: [
    { text: 'a', quantified: true, measurement: 'met', grounds: true }] }], {});
  chk('NONE ANNOUNCED with objectives is named', r.bad.length === 1 && /One of the two is wrong/.test(r.bad[0]), JSON.stringify(r.bad));
  r = check([{ id: 'L-9002', assessment: 'failed', assessmentNote: 'n', objectives: [
    { text: 'a', quantified: true, measurement: 'not-met', grounds: true }] }], {});
  chk('objectives with no claim and no exemption is named', r.bad.length === 1 && /IMPOSED_DUTY/.test(r.bad[0]), JSON.stringify(r.bad));
  r = check([{ id: 'L-9002', assessment: 'failed', assessmentNote: 'n', objectives: [
    { text: 'a', quantified: true, measurement: 'not-met', grounds: true }] }], { 'L-9002': 'a statute' });
  chk('the same record exempted BY NAME passes', r.bad.length === 0, JSON.stringify(r.bad));

  if (f) { console.error(`objectives control: ${f} control(s) failed`); process.exit(1); }
  console.log('objectives control: Ruling 2 on an unmeasured limb, Ruling 9 on an ungrounded objective, a dangling and a spurious unmeasuredRef, and both halves of the claimAtLaunch pairing are each named; every one of them passes when it should — the checker fails when it should');
}

if (argv.includes('--control')) control();
else run();
