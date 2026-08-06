#!/usr/bin/env node
/**
 * EXPOSURE — every declared exposure carries a role, or its record is exempted BY NAME with the
 * reason; the adjudication is present exactly where there is something to adjudicate; and a record
 * typed `shock` states its own exposure.
 *
 * WHY THE FIELD WAS STRUCTURED AND THEREFORE WHY THIS EXISTS. `shockExposure` was a prose string on
 * 66 records carrying TWO AXES at once — what the event did, and whether the record accepted it —
 * and read by nothing but its own detail page. The two roles point OPPOSITE WAYS at a verdict:
 * `partly` on L-0017 (the shock may have caused the win) and `partly` on L-0090 (the shock degraded
 * the measurement) meant different things and rendered identically for the whole life of the field.
 *
 * WHAT IT BINDS: the presence and the internal consistency of the structured half.
 *
 * WHAT IT DOES NOT BIND, in its own header rather than implied by a green line:
 *   - WHETHER THE ROLE IS RIGHT. `confound` against `cause` is a reading of the record's own prose
 *     and no gate can reach it. This checks that a judgement was made, not that it was correct —
 *     the same limit `independence` was proposed with, and it is the important one.
 *   - WHETHER THE EVENT NAMED IS THE RIGHT EVENT, or spelled as another record spells it. There is
 *     no shock object to resolve against: Ruling 8 puts one in provenance, where `bridgeExists` has
 *     no referent for a shock that breaks no series, and none of the `type: shock` records breaks
 *     one. The event stays prose until that changes.
 *   - THE EVENT'S OWN PROPERTIES — window, shared-with-the-peer-panel, breaks-a-series. Facts about
 *     the event, not about any record; not built this phase, and the field's schema description
 *     carries the condition that would unblock them.
 *   - A RECORD THAT SHOULD DECLARE AN EXPOSURE AND DECLARES NONE. That is the heuristic half, it is
 *     semantic in its residual, and it is deliberately NOT here — it would be a ratchet like
 *     `seam-span`, and a ratchet asserted before its candidate list is triaged reports a number
 *     rather than a defect.
 *
 * Usage:
 *   node tools/exposure.mjs
 *   node tools/exposure.mjs --verbose
 *   node tools/exposure.mjs --control   four seeded controls, then exit
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

/**
 * EXEMPTED BY NAME, NO THIRD STATE — a record whose exposure prose cannot take a role without
 * RE-AUTHORING the record. Each reason is a property of the sentence, not a convenience.
 *
 * These four are the residue of structuring 66 prose values, and the residue is the point: forcing
 * a value here would have converted a reading that found the sentence undetermined into a
 * determination, which is the defect this cycle has spent itself correcting.
 */
const NO_ROLE = {
  'L-0012':
    'confound and cause are joined in one clause — "severely distorts the revenue trajectory AND precipitated the compensation dispute" — so splitting them rewrites the sentence and choosing one resolves a judgement the reading found undetermined.',
  'L-0049':
    '"suppressed traffic and therefore exposure … flattering those years" — whether a shock producing a favourable reading is noise on the measurement or a cause of the outcome depends on what is being measured, and the sentence does not say.',
  'L-0051':
    'the same shape inside a `failed` verdict — "the 2021-22 coal price shock raised power purchase costs sharply" is either a mitigating cause or irrelevant noise, and the record does not say which.',
  'L-0091':
    'the field carries a TYPING DECISION and not an exposure: it is the sentence that stated Ruling 6’s external test before Ruling 6 existed. Assigning it a role would file a taxonomy judgement as a shock exposure.',
};

/**
 * A RATCHET, and the frozen member is named with its judgement rather than merely counted.
 *
 * `type: shock` records that state no exposure of their own. L-0002 is the standing member: a
 * baseline-context record from 2013 whose subject IS the event and which was authored before the
 * field existed. Freezing it is not forgiveness — it is the seam-span call: fix what is genuine,
 * freeze what is judged, and fail on anything new.
 */
const NO_SELF_EXPOSURE = {
  'L-0002':
    'the taper tantrum, `baseline-context`, authored before `shockExposure` existed and never backfilled. Its own exposure would be reflexive and it is scored against nothing, so the entry would carry no judgement. Frozen, not fixed.',
};

function ledger() {
  const dir = join(ROOT, 'data/ledger');
  const out = [];
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const j = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    for (const r of Array.isArray(j) ? j : j.records ?? j.ledger ?? []) out.push(r);
  }
  return out;
}

/** @returns {string[]} findings */
export function check(recs, noRole = NO_ROLE, noSelf = NO_SELF_EXPOSURE) {
  const bad = [];
  let entries = 0;
  for (const r of recs) {
    const ex = r.shockExposure;
    if (Array.isArray(ex)) {
      for (const [i, e] of ex.entries()) {
        entries++;
        const at = `${r.id}.shockExposure[${i}]`;
        if (!e.role) {
          if (!noRole[r.id])
            bad.push(`${at}: no \`role\`, and ${r.id} is not exempted by name in tools/exposure.mjs. Assign a role, or exempt the record with the reason its prose cannot take one.`);
          continue;
        }
        const wants = e.role === 'confound' || e.role === 'cause';
        if (wants && !e.adjudication)
          bad.push(`${at}: role \`${e.role}\` offers an explanation, so the record must say whether it accepts it — \`adjudication\` is required here. Use \`unstated\` where the record made no judgement.`);
        if (!wants && e.adjudication)
          bad.push(`${at}: role \`${e.role}\` has nothing to adjudicate, so \`adjudication\` must be absent (got \`${e.adjudication}\`).`);
      }
    }
    if (r.type === 'shock' && !(Array.isArray(ex) && ex.length) && !noSelf[r.id])
      bad.push(`${r.id}: typed \`shock\` and states no exposure of its own. A record whose subject is an event should say so, or be frozen by name in tools/exposure.mjs with its judgement.`);
  }
  return { bad, entries };
}

function run() {
  const recs = ledger();
  const { bad, entries } = check(recs);
  const withEx = recs.filter((r) => Array.isArray(r.shockExposure) && r.shockExposure.length);
  const roles = {};
  const adjs = {};
  for (const r of withEx) for (const e of r.shockExposure) {
    if (e.role) roles[e.role] = (roles[e.role] ?? 0) + 1;
    if (e.adjudication) adjs[e.adjudication] = (adjs[e.adjudication] ?? 0) + 1;
  }
  if (VERBOSE) {
    console.log('  roles       ' + JSON.stringify(roles));
    console.log('  adjudication ' + JSON.stringify(adjs));
    for (const [id, why] of Object.entries(NO_ROLE)) console.log(`  EXEMPT ${id} — ${why.slice(0, 96)}…`);
    for (const [id, why] of Object.entries(NO_SELF_EXPOSURE)) console.log(`  FROZEN ${id} — ${why.slice(0, 96)}…`);
  }
  if (bad.length) {
    console.error(`exposure FAILED — ${bad.length} finding(s)\n`);
    for (const b of bad) console.error('  - ' + b);
    console.error('\n  The role and the adjudication are two axes and one prose string used to carry both.');
    process.exit(1);
  }
  console.log(
    `exposure: ${recs.length} ledger records · ${withEx.length} declare an exposure · ${entries} entries · ` +
      `roles ${Object.entries(roles).map(([k, v]) => `${k} ${v}`).join(' · ')} · ` +
      `adjudication ${Object.entries(adjs).map(([k, v]) => `${k} ${v}`).join(' · ')} · ` +
      `${Object.keys(NO_ROLE).length} exempted by name · ${Object.keys(NO_SELF_EXPOSURE).length} frozen`,
  );
}

/** Two-sided: the checker is proved to fail before it is trusted to pass. */
function control() {
  let f = 0;
  const chk = (label, ok, d) => { if (!ok) { f++; console.error(`  control FAILED: ${label}${d ? ` — ${d}` : ''}`); } };

  // 1. POSITIVE — a role missing on a record nobody exempted.
  let r = check([{ id: 'L-9001', shockExposure: [{ event: 'x', why: 'y' }] }], {}, {});
  chk('a missing role is named', r.bad.length === 1 && /not exempted by name/.test(r.bad[0]), JSON.stringify(r.bad));

  // 2. NEGATIVE through the same restriction — the SAME entry, exempted by name.
  r = check([{ id: 'L-9001', shockExposure: [{ event: 'x', why: 'y' }] }], { 'L-9001': 'because' }, {});
  chk('the same entry exempted by name passes', r.bad.length === 0, JSON.stringify(r.bad));

  // 3. POSITIVE — a confound with no adjudication, and an is-the-shock carrying one. Both directions,
  //    because a one-sided check would pass whichever way the omission ran.
  r = check([{ id: 'L-9002', shockExposure: [{ event: 'x', why: 'y', role: 'confound' }] }], {}, {});
  chk('confound without adjudication is named', r.bad.length === 1 && /adjudication` is required/.test(r.bad[0]), JSON.stringify(r.bad));
  r = check([{ id: 'L-9003', shockExposure: [{ event: 'x', why: 'y', role: 'is-the-shock', adjudication: 'accepted' }] }], {}, {});
  chk('is-the-shock WITH adjudication is named', r.bad.length === 1 && /must be absent/.test(r.bad[0]), JSON.stringify(r.bad));

  // 4. POSITIVE then NEGATIVE — a `shock` record with no exposure, then the same record frozen.
  r = check([{ id: 'L-9004', type: 'shock' }], {}, {});
  chk('a shock record with no exposure is named', r.bad.length === 1 && /states no exposure/.test(r.bad[0]), JSON.stringify(r.bad));
  r = check([{ id: 'L-9004', type: 'shock' }], {}, { 'L-9004': 'frozen' });
  chk('the same record frozen by name passes', r.bad.length === 0, JSON.stringify(r.bad));

  // 5. NEGATIVE — a fully-formed entry passes.
  r = check([{ id: 'L-9005', shockExposure: [{ event: 'COVID-19', why: 'y', role: 'cause', adjudication: 'unstated' }] }], {}, {});
  chk('a complete entry passes', r.bad.length === 0, JSON.stringify(r.bad));

  if (f) { console.error(`exposure control: ${f} control(s) failed`); process.exit(1); }
  console.log('exposure control: a missing role, a confound with no adjudication, an is-the-shock carrying one, and a `shock` record with no exposure are each named; the same entries exempted or frozen BY NAME pass, and a complete entry passes — the checker fails when it should');
}

if (argv.includes('--control')) control();
else run();
