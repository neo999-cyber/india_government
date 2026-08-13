import {
  ledgerCitingSeries,
  ledgerInDomain,
  ledgerInTerm,
  pairsWithSeriesAsSide,
  provenanceForSeries,
  resolvePairSide,
  seriesInDomain,
  seriesUnderLens,
} from '@/lib/data';
import { DOMAIN_LABELS, LENS_LABELS, TERM_LABELS } from '@/lib/format';
import { hasYearPage } from '@/lib/years';
import { storiesRestingOn } from '@/lib/stories';
import type { LedgerRecord, Series } from '@/lib/types';

/**
 * NEXT STEPS — where to go from here, with the REASON stated as a fact from `/data`.
 *
 * ============================ THE CASE THIS COMES FROM ========================================
 *
 * `DESIGN-REVISION-2.md` §9, and the reader review's own words: they wanted to go from the
 * security-force series' sentence about a press-compiled register **to that register**, and had to
 * hunt down the page through ledger relationships to find it. The brief's four worked examples are
 * all series-page steps, which is why this module serves the series page as well as the record one.
 *
 * ============================ THE RULE EVERY STEP OBEYS =======================================
 *
 * **Each step's reason is a relation that exists in `/data`, named.** *Paired with this series as a
 * contested instrument*, *cites this record*, *a dispute record bears on it*, *filed under the same
 * topic*. Nothing here is a similarity score, a relevance order or a judgement about what a reader
 * will find interesting — the discovery loop from the design research survives, and the model
 * opinion it originally ran on does not.
 *
 * **The steps are not ranked.** They are emitted in a fixed order that goes from the most specific
 * relation to the least — a named counterpart, then a dispute, then the surfaces this record is
 * filed on — and that order is a property of the RELATION, not of the destination's importance.
 *
 * ============================ WHY THE LINK TEXT IS THE RECORD'S OWN TITLE =====================
 *
 * A step naming a record links it by title rather than by a phrase like *the press-derived
 * register*. Two reasons and the second is the binding one: a reader needs to know where they are
 * going, and a surface that names a record is a surface that must carry that record's declarations.
 * Every step that names one renders inside a list item with `RecordMarks`, so rule 4b holds here
 * exactly as it holds in a table.
 */
export type Step = {
  href: string;
  /** The destination, in its own words: a record title, or the name of a surface. */
  label: string;
  /** Why this is next, as a relation in the data. Never a judgement about the destination. */
  reason: string;
  /** Set where the destination is a record whose declarations must travel with the link. */
  recordId?: string;
  recordKind?: 'series' | 'ledger';
};

export function stepsForSeries(s: Series): Step[] {
  const out: Step[] = [];
  /**
   * THE RETURN ROUTE, AND IT IS THE FIRST STEP BECAUSE IT WAS THE MISSING ONE.
   *
   * Measured 2026-08-13: every story had exactly one inbound link, from `/stories/`, and no record
   * or series page pointed at one. A story is the surface that gives a reader a reason to open a
   * record, and the traffic ran one way. `rests` is a declared relation like any other here, so it
   * gets a step with its reason named.
   */
  for (const st of storiesRestingOn(s.id)) {
    out.push({
      href: `/stories/${st.slug}/`,
      label: st.title,
      reason: 'a story on this site rests on this record',
    });
  }


  // 1. THE COUNTERPART. The reader review's exact ask: the other instrument, named.
  for (const p of pairsWithSeriesAsSide(s.id)) {
    for (const side of [p.a, p.b]) {
      const r = resolvePairSide(side);
      if (r?.kind !== 'series' || r.series.id === s.id) continue;
      out.push({
        href: `/series/${r.series.id}/`,
        label: r.series.title,
        reason:
          p.kind === 'contested'
            ? `${p.id} pairs the two as contested — the same quantity, measured by two instruments that disagree`
            : `${p.id} pairs the two as coverage against usage — they measure different quantities and are not subtractable`,
        recordId: r.series.id,
        recordKind: 'series',
      });
    }
  }

  // 2. WHY THEY DISAGREE. A dispute record naming this series.
  for (const p of provenanceForSeries(s)) {
    out.push({
      href: `/provenance/${p.id}/`,
      label: p.title,
      reason: `${p.id} is a measurement dispute this series is named in`,
    });
  }

  // 3. THE RECORDS THAT USE IT.
  const cited = ledgerCitingSeries(s.id);
  for (const l of cited.slice(0, 3)) {
    out.push({
      href: `/ledger/${l.id}/`,
      label: l.title,
      reason: `${l.id} cites this series as evidence`,
      recordId: l.id,
      recordKind: 'ledger',
    });
  }

  // 4. THE SURFACES IT IS FILED ON. Counts computed here so the sentence is checkable.
  out.push({
    href: `/domains/${s.domain}/indicators/`,
    label: `All ${seriesInDomain(s.domain).length} indicators under ${DOMAIN_LABELS[s.domain]}`,
    reason: 'filed under the same topic',
  });
  for (const lens of s.lenses ?? []) {
    out.push({
      href: `/lenses/${lens}/`,
      label: `${seriesUnderLens(lens).length} indicators read through ${LENS_LABELS[lens]}`,
      reason: 'this series is read under that lens',
    });
  }
  return out;
}

/**
 * A LEDGER RECORD'S NEXT STEPS ARE SURFACES, AND THAT IS A CORRECTION MADE BY A GATE.
 *
 * The first version listed the cited series and the disputes here, and `listing-marks` failed 176:
 * **`RestsOn` already lists both, four sections up, with their marks.** Repeating them would render
 * the same absence twice on one page — the other half of the rule that demanded the marks in the
 * first place. So a record page's next steps are the surfaces it is filed on, which nothing else on
 * the page lists, and the evidence is reached where it already is.
 *
 * **This is not a thinner answer than §9 asked for.** All four of the brief's worked examples are
 * series-page steps — *compare with the press-derived register*, *see all Kashmir security
 * indicators*, *read why the two instruments disagree*, *return to Kashmir's account* — because the
 * reader who reported the problem was on a series page. `stepsForSeries` is where §9 lands.
 */
export function stepsForLedger(l: LedgerRecord): Step[] {
  const out: Step[] = [];
  /**
   * THE RETURN ROUTE, AND IT IS THE FIRST STEP BECAUSE IT WAS THE MISSING ONE.
   *
   * Measured 2026-08-13: every story had exactly one inbound link, from `/stories/`, and no record
   * or series page pointed at one. A story is the surface that gives a reader a reason to open a
   * record, and the traffic ran one way. `rests` is a declared relation like any other here, so it
   * gets a step with its reason named.
   */
  for (const st of storiesRestingOn(l.id)) {
    out.push({
      href: `/stories/${st.slug}/`,
      label: st.title,
      reason: 'a story on this site rests on this record',
    });
  }

  for (const d of l.domains ?? []) {
    out.push({
      href: `/domains/${d}/records/`,
      label: `The ${ledgerInDomain(d).length} records filed under ${DOMAIN_LABELS[d]}`,
      reason: 'the same topic',
    });
    out.push({
      href: `/domains/${d}/indicators/`,
      label: `The ${seriesInDomain(d).length} indicators under ${DOMAIN_LABELS[d]}`,
      reason: 'the same topic, measured rather than recorded',
    });
  }
  for (const lens of l.lenses ?? []) {
    out.push({
      href: `/lenses/${lens}/`,
      label: `Everything read through ${LENS_LABELS[lens]}`,
      reason: 'this record is read under that lens',
    });
  }
  out.push({
    href: `/terms/${l.term}/`,
    label: `The ${ledgerInTerm(l.term).length} records in ${TERM_LABELS[l.term]}`,
    reason: 'the same term',
  });
  /**
   * THE YEAR STEP IS GUARDED, AND THE GUARD IS A GATE FINDING.
   *
   * `link-check` failed 7 the first time this shipped: the year pages run 2014 to 2026 and the
   * baseline records are dated 2013 and earlier, so seven records linked a page that does not
   * exist. **A record outside the range gets no year step rather than a broken one**, which is
   * right on the substance too — a pre-baseline record has no year slice to return to. The range
   * now lives in `lib/years.ts`; it was duplicated across the two year pages until this call
   * needed a third copy.
   */
  if (hasYearPage(l.date)) {
    const y = l.date.slice(0, 4);
    out.push({
      href: `/years/${y}/`,
      label: `What else the instrument holds for ${y}`,
      reason: `this record is dated ${l.date}`,
    });
  }
  return out;
}

/**
 * THE CAP, AND WHY IT IS PRINTED RATHER THAN SILENT.
 *
 * A series cited by eleven records would emit eleven steps and stop being next steps. The cap is
 * three; **where it bites, the view says so and links the full list**, because a bounded list
 * presented as a whole one is the silent truncation the corpus forbids. The ledger side needs no
 * cap: after the gate correction above it emits surfaces only, and a record has at most three
 * topics.
 */
export const citedByOverflow = (s: Series) => Math.max(0, ledgerCitingSeries(s.id).length - 3);
