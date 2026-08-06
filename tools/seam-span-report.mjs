#!/usr/bin/env node
/**
 * SEAM-SPAN REPORT — records whose prose compares across a break declared on a series they cite.
 *
 * IT GATES, from 2026-08-06, AS A RATCHET AND NOT AS A HEURISTIC. The distinction is the whole
 * design. The wide rule — any year anywhere in a record against any break on any series it cites —
 * produced 35 undeclared spans of 127, and 15 of the 21 that survived narrowing were not defects.
 * What separates a defect from a false positive is WHICH QUANTITY THE SENTENCE COMPARES, which is
 * semantic and no proximity rule reaches. So the population was read once, in full, and the
 * judgements were frozen: `tools/lib/seam-span-allowlist.json` carries each false positive with the
 * quantity its sentence actually compares, because an id alone is an assertion. The gate passes on
 * the frozen set and fails on anything new. Same shape as `no-bare-root`, and for the same reason.
 *
 * WHY IT EXISTS. `breaks[]` binds a SERIES: `reachability` proves the break note renders on the
 * series page, and the renderer refuses to draw a line across it. Neither reaches a DERIVED
 * COMPARISON stated in a ledger record's prose. Phase 15 stated a widening from FY2013-14 to
 * FY2023-24 while FY2013-14 sat on the imputed side of P-122's basis seam — the opening gap
 * understated, the widening overstated, and every gate green, because the guard's scope (the
 * series) and the claim's scope (a sentence about the series) are different objects.
 *
 * THE TRIAGE THAT MADE IT GATEABLE, 2026-08-06. All 35 wide candidates were read. Narrowing to
 * BOTH PERIODS INSIDE ONE SENTENCE — which this file proposed of itself — dropped 14. Of the 21
 * that remained: SIX WERE GENUINE and are now fixed, five of them in L-0150, whose summary crosses
 * the Finance Commission award boundary (P-103) and the Actuals/RE/BE splice (P-113) in a single
 * sentence carrying the flagship federalism claim, and one in L-0060, which sets NSSO
 * Employment-Unemployment Survey figures against Periodic Labour Force Survey figures across the
 * P-02 transition. TWELVE WERE FALSE POSITIVES and are frozen. THREE WERE DECLARED IN SUBSTANCE
 * AND THE CHECK COULD NOT SEE IT — L-0182 explains the discontinuity in words, "the definitional
 * gap between cash attributed to a year and cash accounted in a year", and the `declared`
 * predicate accepted only a provenanceRefs entry, the break period string or the provenance id.
 * THAT PREDICATE WAS TOO NARROW IN THE OPPOSITE DIRECTION and now accepts a discontinuity
 * explained in substance. A gate that demands a citation form the instrument does not otherwise
 * require would teach authors to cite rather than to explain.
 *
 * WHAT IT DELIBERATELY DOES NOT COVER, stated here rather than implied by a green line: the 14
 * wide-only spans are dropped, not allowlisted. A record that compares across a seam in two
 * ADJACENT SENTENCES is not caught. That is a real reduction in coverage, taken because the
 * alternative is a gate whose failures are mostly not defects.
 *
 * Usage:  node tools/seam-span-report.mjs [--verbose] [--control]
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data');
const VERBOSE = process.argv.includes('--verbose');

const load = (layer) => {
  const p = join(DATA, layer);
  if (!existsSync(p)) return [];
  return readdirSync(p).filter((f) => f.endsWith('.json'))
    .flatMap((f) => JSON.parse(readFileSync(join(p, f), 'utf8')));
};

const series = load('series');
const ledger = load('ledger');
const byId = new Map(series.map((s) => [s.id, s]));

/** A period's ordering key. Both `FY2014-15` and `2014-15` occur; the leading year orders them. */
const ord = (p) => {
  const m = /^(?:FY)?(\d{4})-(\d{2})$/.exec(String(p).trim());
  return m ? Number(m[1]) : null;
};
const PROSE = ['summary', 'claimAtLaunch', 'whatHappened', 'caseFor', 'caseAgainst', 'assessmentNote', 'caveat'];

/**
 * A discontinuity EXPLAINED IN SUBSTANCE counts as declared. Added after L-0182 was reported three
 * times for a sentence that says the differences "are the definitional gap between cash attributed
 * to a year and cash accounted in a year, already documented in this drop from the Commission's own
 * two tables". That is a declaration; the record simply does not cite an id for it.
 */
const SUBSTANCE = /definitional gap|not comparable|different bases?|basis (?:change|break|seam)|changed (?:sampling|definition|basis)|re-?bas(?:ed|ing)|award boundary|splice[ds]?|series break|do not subtract|not one series|two tables/i;

/** Both periods inside ONE sentence — the narrow rule the gate acts on. */
const sentencesOf = (t) => t.split(/(?<=[.;:])\s+(?=[A-Z0-9"“(])/);
const ALLOW = JSON.parse(readFileSync(join(ROOT, 'tools/lib/seam-span-allowlist.json'), 'utf8'));
const allowKey = (x) => `${x.record}|${x.series}|${x.period}`;
const ALLOWED = new Map(ALLOW.entries.map((e) => [allowKey(e), e]));

const spans = [];
for (const r of ledger) {
  const prose = PROSE.map((f) => r[f]).filter(Boolean).join(' ');
  if (!prose) continue;
  const years = [...prose.matchAll(/\b(?:FY)?(\d{4})-\d{2}\b/g)].map((m) => Number(m[1]));
  if (!years.length) continue;
  for (const sid of r.seriesRefs ?? []) {
    const s = byId.get(sid);
    for (const b of s?.breaks ?? []) {
      const bo = ord(b.period);
      if (bo === null) continue;
      if (!(years.some((y) => y < bo) && years.some((y) => y >= bo))) continue;
      const declared =
        (r.provenanceRefs ?? []).includes(b.provenanceRef) ||
        prose.includes(b.period) ||
        prose.includes(b.provenanceRef) ||
        SUBSTANCE.test(prose);
      let narrow = null;
      for (const f of PROSE) {
        if (!r[f]) continue;
        for (const sent of sentencesOf(r[f])) {
          const ys = [...sent.matchAll(/\b(?:FY)?(\d{4})-\d{2}\b/g)].map((m) => Number(m[1]));
          if (ys.some((y) => y < bo) && ys.some((y) => y >= bo)) { narrow = { field: f, sent: sent.replace(/\s+/g, ' ').trim() }; break; }
        }
        if (narrow) break;
      }
      spans.push({ record: r.id, series: sid, period: b.period, ref: b.provenanceRef, declared, narrow });
    }
  }
}

const undeclared = spans.filter((s) => !s.declared);
const narrowUndeclared = undeclared.filter((s) => s.narrow);
const unfrozen = narrowUndeclared.filter((s) => !ALLOWED.has(allowKey(s)));
const stale = ALLOW.entries.filter((e) => !narrowUndeclared.some((s) => allowKey(s) === allowKey(e)));

/* ------------------------------------------------------------------ control */

if (process.argv.includes('--control')) {
  const bad = [];
  // POSITIVE: an allowlisted span, with its allowlist entry withdrawn, must be named.
  const victim = ALLOW.entries[0];
  ALLOWED.delete(allowKey(victim));
  const seeded = narrowUndeclared.filter((s) => !ALLOWED.has(allowKey(s)));
  ALLOWED.set(allowKey(victim), victim);
  if (seeded.length !== 1 || allowKey(seeded[0]) !== allowKey(victim)) {
    bad.push(`withdrawing the allowlist entry for ${allowKey(victim)} produced ${seeded.length} finding(s), expected exactly 1 naming it`);
  }
  // NEGATIVE of the same form: with every entry present, nothing is named.
  if (unfrozen.length) bad.push(`the frozen set does not pass: ${unfrozen.length} unfrozen span(s)`);
  // The widening is load-bearing and must be shown to be: without SUBSTANCE, L-0182 returns.
  const without = [];
  for (const r of ledger) {
    const prose = PROSE.map((f2) => r[f2]).filter(Boolean).join(' ');
    for (const sid of r.seriesRefs ?? []) for (const b of byId.get(sid)?.breaks ?? []) {
      const bo2 = ord(b.period); if (bo2 === null) continue;
      const years = [...prose.matchAll(/\b(?:FY)?(\d{4})-\d{2}\b/g)].map((m) => Number(m[1]));
      if (!(years.some((y) => y < bo2) && years.some((y) => y >= bo2))) continue;
      if ((r.provenanceRefs ?? []).includes(b.provenanceRef) || prose.includes(b.period) || prose.includes(b.provenanceRef)) continue;
      if (SUBSTANCE.test(prose)) without.push(r.id);
    }
  }
  if (!without.includes('L-0182')) bad.push('removing the substance clause does not bring L-0182 back — the widening is not doing the work it was added for');

  if (bad.length) { console.error(`seam-span --control FAILED\n${bad.map((b) => '  - ' + b).join('\n')}`); process.exit(1); }
  console.log(
    `seam-span control: withdrawing one frozen judgement names exactly that span and no other; the frozen set passes; ` +
      `and removing the substance clause returns ${[...new Set(without)].length} record(s) including L-0182, so the widening is load-bearing`,
  );
  process.exit(0);
}

/* ------------------------------------------------------------------ gate */

if (VERBOSE) {
  for (const s of spans) console.log(`    ${s.declared ? 'declared  ' : s.narrow ? 'NARROW    ' : 'wide-only '}  ${s.record}  ×  ${s.series} @ ${s.period} (${s.ref})`);
}

if (unfrozen.length || stale.length) {
  console.error(`seam-span FAILED — ${unfrozen.length} unjudged narrow span(s), ${stale.length} stale allowlist entr(y/ies)`);
  for (const s of unfrozen) {
    console.error(`  - ${s.record} × ${s.series} @ ${s.period} (${s.ref})\n      ${s.narrow.field}: ${s.narrow.sent.slice(0, 190)}`);
  }
  for (const e of stale) console.error(`  - STALE: ${allowKey(e)} is frozen but no longer fires — remove it`);
  console.error(
    '\n  A record comparing across a declared break either DECLARES it — a provenanceRefs entry, the\n' +
      '  break period, the provenance id, or the discontinuity explained in substance — or its span is\n' +
      '  judged once and frozen in tools/lib/seam-span-allowlist.json WITH the quantity its sentence\n' +
      '  actually compares. There is no third state.',
  );
  process.exit(1);
}

console.log(
  `seam-span OK — ${spans.length} record-by-break span(s): ${spans.length - undeclared.length} declare the break, ` +
    `${undeclared.length} do not, of which ${narrowUndeclared.length} put both periods in one sentence and all ${narrowUndeclared.length} are judged and frozen. ` +
    `${undeclared.length - narrowUndeclared.length} wide-only span(s) are OUT OF SCOPE by design.`,
);
