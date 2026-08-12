import { getSeries } from '@/lib/data';
import type { LedgerRecord } from '@/lib/types';

/**
 * THE EVIDENCE CHRONOLOGY — when the instruments a record rests on began, changed and ended.
 *
 * ============================ THE CASE THE BRIEF NAMES, AND WHAT IT ACTUALLY NEEDS ============
 *
 * `DESIGN-REVISION-2.md` §3: L-0111 publishes 614 incidents for 2018, restates to 417, then
 * decomposes into 228 + 189, **with no explanatory note at either transition**, and one diagram
 * communicates that faster than several pages of prose.
 *
 * Measured, the corpus holds the transitions structurally and holds the publication dates only in
 * prose. Its four cited series carry **five `breaks[]`**, each with a period, a note that explains
 * the transition in the instrument's own words, and a `provenanceRef`. The 614/417/228/189 figures
 * are quoted inside those notes, by the notes' authors.
 *
 * ============================ TWO AXES, KEPT APART, AND THAT IS THE WHOLE DESIGN DECISION =====
 *
 * **A break's `period` is a DATA YEAR. A record's `date` is a PUBLICATION DATE.** L-0111's origin
 * seam sits at data year 2018 and was published in the Annual Report 2022-23, posted 11 October
 * 2023. Interleaving the two on one ordered axis would put a 2018 mark five years before the event
 * that created it — a rendering asserting a sequence that did not happen.
 *
 * So this function returns the DATA axis only, ordered by period. The record's own span renders
 * where it already renders, in the header, and the view says which axis it is showing.
 *
 * ============================ WHAT IS DELIBERATELY NOT HERE ===================================
 *
 * **No side-by-side of competing values.** It is tempting: 87 ledger records cite two or more series
 * that report different values for a shared period, and L-0111 is one of them. **That count is a
 * candidate list and not a finding.** Most of the 87 are series measuring different things — three
 * states' allocations, a peer panel — and putting their values side by side under one period would
 * assert a comparison the corpus files as incommensurable, where agreement is as unsound as
 * disagreement. The break notes already carry the figures, attributed to whoever published them.
 *
 * **No parsed successor chain.** The notes say *supersedes jk-terrorist-incidents-legacy* in prose
 * and nothing structural records it. Reading a relation out of prose is the defect refused when the
 * publication-stopped question was built; the periods order themselves without it.
 */
export type EvidenceEvent = {
  /** Sort key. Both period forms reduce to their first year; see `lib/spans.ts` for the same rule. */
  year: number;
  period: string;
  seriesId: string;
  seriesTitle: string;
  /** The break's own note, rendered in full. It is the explanation, not a label for one. */
  note: string;
  provenanceRef: string;
};

const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

export function evidenceChronology(l: LedgerRecord): EvidenceEvent[] {
  const out: EvidenceEvent[] = [];
  for (const id of l.seriesRefs ?? []) {
    const s = getSeries(id);
    if (!s) continue;
    for (const b of s.breaks ?? []) {
      out.push({
        year: yearOf(b.period),
        period: b.period,
        seriesId: s.id,
        seriesTitle: s.title,
        note: b.note,
        provenanceRef: b.provenanceRef,
      });
    }
  }
  return out.sort((a, b) => a.year - b.year || a.seriesId.localeCompare(b.seriesId));
}

/**
 * Periods where more than one cited instrument changed at once.
 *
 * **This is the decomposition, and it is a count of events rather than a comparison of values.**
 * At L-0111's data year 2018 two instruments begin in the same report; at 2020 and 2021 two end.
 * Saying *two instruments changed here* is a statement about the breaks; saying *228 and 189 versus
 * 614* would be a statement about the figures, which is the one this file will not make.
 */
export const clusteredYears = (events: EvidenceEvent[]): Set<number> => {
  const n = new Map<number, number>();
  for (const e of events) n.set(e.year, (n.get(e.year) ?? 0) + 1);
  return new Set([...n].filter(([, c]) => c > 1).map(([y]) => y));
};
