import Link from 'next/link';
import { clusteredYears, evidenceChronology } from '@/lib/chronology';
import type { LedgerRecord } from '@/lib/types';

/**
 * THE RECORD SPINE — how the evidence under a record moved, in period order.
 *
 * `DESIGN-REVISION-2.md` §3: the structure *what was announced → what happened → why this reading →
 * what this cannot tell you* is built, and the **chronological** rendering is what is missing. This
 * is it, and it sits before the sources, the disputes and the correction history, which is where §3
 * puts it.
 *
 * ============================ WHERE IT RENDERS, AND WHERE IT DOES NOT =========================
 *
 * **76 of 223 records**, measured: those citing at least one series that declares a `breaks[]`.
 * A record whose instruments never changed basis has no chronology to draw, and 92 records hold
 * only their own start and end date — **a two-dot line is not a chronology, and drawing one would
 * assert a sequence where there is a span.** Those render nothing here; their span is in the header
 * where it already was.
 *
 * ============================ THE AXIS IS THE DATA YEAR, AND IT SAYS SO =======================
 *
 * Every mark is a break's `period` — the year of the data, not the day the change was published.
 * L-0111's decomposition sits at data year 2018 and was published in October 2023. The two are not
 * interleaved, because a single axis carrying both would place a mark five years before the event
 * that created it. The heading names the axis rather than leaving a reader to infer it.
 *
 * ============================ WHAT A CLUSTER MEANS, AND WHAT IT DOES NOT ======================
 *
 * Where more than one instrument changes at the same period the year is marked. **That is a count
 * of breaks, not a comparison of figures.** L-0111 is the case: two columns begin at 2018 in the
 * same report, which is the decomposition the brief asks for one diagram to show. The figures
 * themselves — 614, 417, 228, 189 — are inside the notes below, quoted by whoever published them,
 * and this component computes no arithmetic over them.
 */
export function RecordChronology({ record }: { record: LedgerRecord }) {
  const events = evidenceChronology(record);
  if (!events.length) return null;
  const clusters = clusteredYears(events);
  const years = [...new Set(events.map((e) => e.year))].sort((a, b) => a - b);

  return (
    <>
      <h2>How the evidence changed</h2>
      <p className="prose-note">
        Every instrument this record rests on that declared a change of basis, in order of the{' '}
        <strong>year of the data</strong> — not the date the change was published, which is often
        years later and is stated in each note. {events.length}{' '}
        {events.length === 1 ? 'change' : 'changes'} across{' '}
        {new Set(events.map((e) => e.seriesId)).size} of the{' '}
        {(record.seriesRefs ?? []).length} instruments cited.
        {clusters.size > 0 ? (
          <>
            {' '}
            At {clusters.size === 1 ? 'one period' : `${clusters.size} periods`} more than one
            instrument changed at once.
          </>
        ) : null}
      </p>
      <div className="chrono">
        {years.map((y) => (
          <div key={y} className={clusters.has(y) ? 'chrono-y chrono-cluster' : 'chrono-y'}>
            <p className="chrono-year mono">
              {events.find((e) => e.year === y)!.period}
              {clusters.has(y) ? (
                <span className="chrono-n">
                  {events.filter((e) => e.year === y).length} instruments changed
                </span>
              ) : null}
            </p>
            {events
              .filter((e) => e.year === y)
              .map((e) => (
                <div key={`${e.seriesId}-${e.period}`} className="chrono-e">
                  {/* A CITATION SURFACE, NOT A LISTING — and the two render gates disagree about
                      where that line falls, which is the finding worth keeping.

                      This panel first shipped as an ordered list whose items named each series by
                      title, and `listing-marks` failed **176**: a list item is a bound listing shape
                      and rule 4b makes a listed record's declarations travel with it. Carrying them
                      here was not the fix, because every one of these series is already listed with
                      its marks in *What this rests on* below, and the same gate holds each
                      declaration to at most once per page.

                      **Citing by id alone did not fix it either, and that is the distinction.**
                      `unrecognised-rows` separates a title link (a listing) from an id link (a
                      citation) and recognises 728 of the second. `listing-marks` does not: it binds
                      ANY record link inside a bound shape. So the id change satisfied one gate and
                      left the other at exactly 176, unmoved.

                      The row's subject is the BREAK. The series is its address, which is the same
                      relation the pair-row exemption was written for. So the container is a div
                      rather than a list item and the series is cited by id in the corpus's own
                      idiom — no gate weakened, no exemption added, and the declarations render
                      once, below. */}
                  <p className="chrono-s">
                    <Link prefetch={false} className="mono" href={`/series/${e.seriesId}/`}>
                      {e.seriesId}
                    </Link>{' '}
                    <Link prefetch={false} className="tag" href={`/provenance/${e.provenanceRef}/`}>
                      {e.provenanceRef}
                    </Link>
                  </p>
                  {/* The note in full. It is the explanation the publisher did not give, written by
                      the instrument, and it is the only thing on this panel that carries the
                      figures — so it is never abbreviated to fit the row. */}
                  <p className="chrono-note">{e.note}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}
