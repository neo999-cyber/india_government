#!/usr/bin/env node
/**
 * SEAM-SPAN REPORT — records whose prose compares across a break declared on a series they cite.
 *
 * REPORT ONLY. It does not gate, it is not in the build, and it auto-fixes nothing. It names
 * CANDIDATES for a per-record judgement, which is the same posture as the bidirectional-reference
 * and `ref-unexplained` passes and for the same reason: a sweep generates candidates, and the
 * judgement is made per record and written down per record.
 *
 * WHY IT EXISTS. `breaks[]` binds a SERIES: `reachability` proves the break note renders on the
 * series page, and the renderer refuses to draw a line across it. Neither reaches a DERIVED
 * COMPARISON stated in a ledger record's prose. Phase 15 stated a widening from FY2013-14 to
 * FY2023-24 while FY2013-14 sat on the imputed side of P-122's basis seam — the opening gap
 * understated, the widening overstated, and every gate green, because the guard's scope (the
 * series) and the claim's scope (a sentence about the series) are different objects.
 *
 * WHY IT IS NOT A GATE YET, stated so the deferral is not mistaken for an oversight. Run against
 * the live corpus on 2026-08-05 it found 117 record-by-break spans, of which 88 declare the break
 * and 29 do not. Twenty-nine is a candidate list, not a defect count: the heuristic matches ANY
 * year mentioned ANYWHERE in a record's prose against ANY break on ANY series it cites, so it
 * over-fires whenever a record cites a series for context and separately mentions years either
 * side of a seam it never crosses. L-0222 is exactly that shape — it names FY2013-14 and FY2024-25
 * for COAL quantities while citing the non-fossil generation share for context, and makes no claim
 * across P-122's seam at all. Turning this into a gate at a 25 per cent undeclared rate would
 * either block the build or invite someone to weaken it, and both are worse than the defect.
 *
 * WHAT WOULD MAKE IT GATEABLE: the 29 triaged per record into genuine spans and false positives,
 * the genuine ones fixed, and the heuristic narrowed by whatever the triage shows distinguishes
 * them — most likely proximity of the two periods to each other inside one sentence, rather than
 * anywhere in the record.
 *
 * Usage:  node tools/seam-span-report.mjs [--verbose]
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
        prose.includes(b.provenanceRef);
      spans.push({ record: r.id, series: sid, period: b.period, ref: b.provenanceRef, declared });
    }
  }
}

const undeclared = spans.filter((s) => !s.declared);
if (VERBOSE || undeclared.length) {
  console.log('\n  Records whose prose names periods either side of a break on a series they cite,');
  console.log('  WITHOUT naming the break or its provenance record. Candidates for a judgement —');
  console.log('  many will be records that mention the years for an unrelated quantity.\n');
  for (const s of (VERBOSE ? spans : undeclared)) {
    console.log(`    ${s.declared ? 'declared  ' : 'UNDECLARED'}  ${s.record}  ×  ${s.series} @ ${s.period} (${s.ref})`);
  }
  console.log('');
}
console.log(
  `seam-span-report — ${spans.length} record-by-break span(s): ${spans.length - undeclared.length} declare the break, ` +
  `${undeclared.length} do not. REPORT ONLY, nothing gated, nothing fixed.`,
);
