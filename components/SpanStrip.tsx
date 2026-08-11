import Link from 'next/link';
import type { Series } from '@/lib/types';

/**
 * THE SPAN STRIP — 269 series as spans on one shared axis, sorted by first observation.
 *
 * ============================ WHAT THE MEASUREMENT SAID BEFORE THIS WAS BUILT =================
 *
 * The instruction was to measure first and not build if the picture was a uniform block. It is not:
 * **63 of 269 series begin in 2014**, the frozen baseline, against 24 in 2018 and 21 in 2013, with
 * a tail back to one series starting 1952. Span length is bimodal — **91 run 11–15 years against 59
 * at three years or fewer, 33 of them a single point.** 100 change basis. Verified splits almost
 * exactly in half: 124 all-verified, 123 none, 22 mixed.
 *
 * **The 2014 wall is the picture and it is not smoothed.** Sorted by first observation, 63 rows
 * share a left edge, and that edge is a fact about the instrument rather than about India.
 *
 * ============================ THE FRONTIER, WHICH IS THE ONE THING TO GET RIGHT ===============
 *
 * *Ends before the latest year* is measured against the **publication frontier**, which is the year
 * the current plateau BEGINS — 2024 — and not against the maximum end year in the corpus.
 *
 * A SECOND COUNT DIFFERS FROM THE MEASUREMENT AND THE REASON IS HERE RATHER THAN LEFT TO BE
 * REDISCOVERED. 100 series declare a break; the *changes basis* filter returns **97**. The three are
 * `mgnrega-persondays`, `sedition-cases-registered` and `ugc-provision-gross`, each declaring a
 * break at a period OUTSIDE its own observed span — a break in 2023-24 on a series holding one 2020
 * observation. A seam cannot be drawn outside the bar it cuts, so the strip counts what it can draw.
 * The table below counts all 100, and the two numbers are answering different questions.
 *
 * **AGAINST THE MAXIMUM IT RETURNS 264 OF 269 — 98 PER CENT — AND THAT IS AN ARTEFACT, NOT A
 * FINDING.** The maximum is 2026 and exactly five series reach it, because 2026 has barely begun.
 * Comparing every annual series to it marks a still-current series as stopped merely for not yet
 * having a figure that does not exist anywhere. Against the frontier the answer is **93**.
 *
 * **A LATER PASS MUST NOT "FIX" THIS BACK TO THE MAXIMUM.** It looks like an off-by-one and it is
 * the difference between a filter that names 93 publishers who stopped and one that says almost
 * everything stopped, which is false. The frontier is printed in the filter's own label so a reader
 * knows what the comparison is, and derived here rather than hardcoded so it moves when the corpus
 * does.
 *
 * ============================ THE AXIS BEGINS WHERE THE DATA IS ===============================
 *
 * **Anchored to the earliest observation, ONE SERIES TOOK HALF THE STRIP.** `lok-sabha-sitting-days`
 * runs from 1952; the next earliest begins in 1996 and the median in 2014. With the origin at the
 * minimum, 51 per cent of the width carried a single row and 265 spans were crushed into the
 * right-hand third — the strip could not show the shape of the spans, which is the only thing it is
 * for.
 *
 * The origin is the **2nd-percentile start year**, derived rather than chosen, so it moves with the
 * corpus. **Four series begin earlier and none is cut short**: each is drawn to the left edge with a
 * continuation mark and its own start year in the gutter and in its accessible name. The axis is
 * narrowed; the record is not, and the difference is the whole point — a bar shortened to fit would
 * assert a later start than the data has.
 *
 * ============================ WHY THERE ARE NO PER-ROW LABELS, AND NO DE-COLLISION ============
 *
 * At 269 rows label collision is certain, and the `PeerSlope` precedent — move text, never a datum —
 * is about what to do when labels must exist. **Here they must not.** The row labels are GROUP
 * labels: one per distinct start year, 25 of them, each at the real position of the first row in its
 * group. Nothing is nudged, because nothing collides.
 *
 * That is a better answer than de-collision for this shape, and it is also what makes the 2014 wall
 * readable: the label sits on the first of 63 rows that share an edge.
 *
 * ============================ RULE 4b, AND WHY THE STRIP CARRIES NO MARKS =====================
 *
 * **The strip draws records and does not declare their marks, deliberately.** The full table on the
 * same page lists all 269 with every caveat and absence in full, and `listing-marks` binds *374
 * rendered declarations each at most once per page* — rendering 231 caveats twice would break that
 * rule in the other direction.
 *
 * So the declarations are on the page, once, below; the caption says so; and each bar's link carries
 * its accessible name in `aria-label` rather than as text, because the strip shows a SPAN and not a
 * title. A reader who wants the record's qualifications meets them in the table, which is where
 * they render exactly once.
 */

type Row = {
  id: string;
  title: string;
  start: number;
  end: number;
  breaks: number[];
  /** 1 = every India observation verified, 0 = none. Drives fill weight, never colour. */
  verified: number;
  stopped: boolean;
  short: boolean;
};

export function SpanStrip({
  rows,
  x0,
  x1,
  frontier,
}: {
  rows: Row[];
  x0: number;
  x1: number;
  frontier: number;
}) {
  const pct = (year: number) => ((year - x0) / (x1 - x0)) * 100;
  // Tick interval follows the span the axis actually covers. At 74 years only decades fit; at 26
  // a decade tick leaves a reader counting gridlines to place a bar, so five years is the step.
  const step = x1 - x0 <= 30 ? 5 : 10;
  const decades = [];
  for (let y = Math.ceil(x0 / step) * step; y <= x1; y += step) decades.push(y);

  let lastStart: number | null = null;

  return (
    <div className="strip" id="span-strip">
      <div className="strip-axis" aria-hidden="true">
        {decades.map((y) => (
          <span key={y} className="strip-tick mono" style={{ left: `${pct(y)}%` }}>
            {y}
          </span>
        ))}
      </div>

      <div className="strip-rows">
        {rows.map((r) => {
          const newGroup = r.start !== lastStart;
          lastStart = r.start;
          return (
            <div
              key={r.id}
              className="strip-row"
              data-row
              data-f-shape={[
                r.stopped ? 'stopped' : '',
                r.breaks.length ? 'basis' : '',
                r.short ? 'short' : '',
              ]
                .filter(Boolean)
                .join('|')}
              data-text={`${r.id} ${r.title}`}
            >
              <span className="strip-year mono" aria-hidden="true">
                {newGroup ? r.start : ''}
              </span>
              <span className="strip-track">
                <Link
                  href={`/series/${r.id}/`}
                  className={`strip-bar${r.stopped ? ' is-stopped' : ''}${
                    r.start < x0 ? ' is-earlier' : ''
                  }`}
                  aria-label={`${r.title}, ${r.start} to ${r.end}${
                    r.start < x0 ? `, beginning before this axis` : ''
                  }${r.breaks.length ? `, ${r.breaks.length} basis change` : ''}${
                    r.stopped ? ', published series ends here' : ''
                  }`}
                  style={{
                    // CLAMPED, NOT CLIPPED. A span starting before the origin is drawn from the
                    // left edge and marked as continuing; its true start is in the label beside it
                    // and in the accessible name. Never shortened silently.
                    left: `${Math.max(pct(r.start), 0)}%`,
                    width: `${Math.max(pct(r.end) - Math.max(pct(r.start), 0), 0.35)}%`,
                    // Fill weight for the verified split. Opacity, not hue — direction of merit is
                    // not what this encodes and `higherIsBetter` is an unread debt besides.
                    opacity: 0.35 + r.verified * 0.65,
                  }}
                />
                {/* SEAMS SIT IN AXIS SPACE, NOT IN BAR SPACE, and that is what makes clamping
                    safe. Positioned inside the bar they would slide when a bar is clamped, moving
                    a declared basis change to a year it did not happen in — a rendering that
                    states something false about the data. In axis space a seam is at its year
                    whatever the bar does. (No series in the corpus declares a break before the
                    origin, checked; the filter is here so that stays true if one ever does.) */}
                {r.breaks
                  .filter((b) => b >= x0)
                  .map((b) => (
                    <span key={b} className="strip-seam" style={{ left: `${pct(b)}%` }} />
                  ))}
              </span>
            </div>
          );
        })}
      </div>

      <p className="strip-key">
        <span className="strip-key-item">
          <span className="strip-swatch" /> a span, first observation to last
        </span>
        <span className="strip-key-item">
          <span className="strip-swatch is-faint" /> lighter where observations are approximations
        </span>
        <span className="strip-key-item">
          <span className="strip-swatch is-seam" /> a declared change of basis
        </span>
        <span className="strip-key-item">
          <span className="strip-swatch is-stopped" /> published series ends before {frontier}
        </span>
      </p>
    </div>
  );
}
