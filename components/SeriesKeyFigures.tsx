import type { Series } from '@/lib/types';
import { periodLabel } from '@/lib/format';

/**
 * LATEST VALUE · TOTAL CHANGE · RANGE · COVERAGE — the four figures §3 asks for under the chart.
 *
 * ============================ ONE OF THE FOUR IS A RULE-2 TRAP, AND IT IS GUARDED =============
 *
 * **"Total change" across a declared break is splicing, which rule 2 forbids outright.** Subtracting
 * a 2011-12-base figure from a 2004-05-base one produces a number that describes no quantity; doing
 * it silently, in a summary strip directly under a chart that draws the seam, would state in
 * arithmetic exactly what the chart is drawn to refuse.
 *
 * So where a series carries a break inside its own span, **the change figure is not computed and
 * not shown.** In its place the strip says which seam prevents it and how many bases the series has.
 * That is the same discipline as the adjusted NPA view, which shows nothing rather than an adjusted
 * line on an assumed denominator.
 *
 * **The brief asked for four figures and this renders three on 100 of 269 series. That is the
 * answer, not a shortfall** — a fourth figure that cannot honestly be computed is not a missing
 * feature.
 *
 * ============================ THE OTHER THREE, AND WHAT EACH IS NOT ===========================
 *
 * **Latest value** is the last India observation with a figure, and it carries that observation's
 * own status: an `approx` latest value says so, because a number presented as the current state of
 * the world without its grade is the defect the status field exists to prevent.
 *
 * **Range** is first-to-last observation, not a claim about what the series covers — a series with
 * two points twelve years apart has a twelve-year range and two observations, and the coverage
 * figure beside it is what stops that reading.
 *
 * **Coverage** is observations against the years the range spans. It is deliberately not a quality
 * score: a low figure can mean a quinquennial survey doing exactly what it is designed to do.
 */
const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

export function SeriesKeyFigures({ series }: { series: Series }) {
  const pts = series.points
    .filter((p) => p.country === 'IND' && p.value !== null)
    .slice()
    .sort((a, b) => yearOf(a.period) - yearOf(b.period));
  if (pts.length === 0) return null;

  const first = pts[0];
  const last = pts[pts.length - 1];
  const span = yearOf(last.period) - yearOf(first.period) + 1;

  // A break INSIDE the observed span is what forbids the subtraction. One outside it cannot.
  const breaksInside = (series.breaks ?? []).filter((b) => {
    const y = yearOf(b.period);
    return y >= yearOf(first.period) && y <= yearOf(last.period);
  });
  const spliceable = breaksInside.length === 0 && pts.length > 1;
  const delta = spliceable ? (last.value as number) - (first.value as number) : null;

  const fmt = (n: number) =>
    Math.abs(n) >= 1000 ? n.toLocaleString('en-IN') : String(Number(n.toFixed(2)));

  return (
    <dl className="skf">
      <div className="skf-cell">
        <dt>Latest</dt>
        <dd>
          <span className="skf-n mono">{fmt(last.value as number)}</span>{' '}
          <span className="skf-u">{series.unit}</span>
          <span className="skf-sub">
            {periodLabel(last.period, series.calendar)}
            {last.status && last.status !== 'verified' ? ` · ${last.status}` : ''}
          </span>
        </dd>
      </div>

      <div className="skf-cell">
        <dt>Change over the series</dt>
        <dd>
          {delta !== null ? (
            <>
              <span className="skf-n mono">
                {delta > 0 ? '+' : ''}
                {fmt(delta)}
              </span>{' '}
              <span className="skf-u">{series.unit}</span>
              <span className="skf-sub">
                {periodLabel(first.period, series.calendar)} to{' '}
                {periodLabel(last.period, series.calendar)}
              </span>
            </>
          ) : (
            <>
              <span className="skf-none">not computed</span>
              <span className="skf-sub">
                {breaksInside.length > 0
                  ? `${breaksInside.length === 1 ? 'A declared change of basis' : `${breaksInside.length} declared changes of basis`} sit inside this span. Subtracting across one would splice two different measurements, so no total is given.`
                  : 'One observation — there is nothing to compare it with.'}
              </span>
            </>
          )}
        </dd>
      </div>

      <div className="skf-cell">
        <dt>Range</dt>
        <dd>
          <span className="skf-n mono">
            {periodLabel(first.period, series.calendar)}–{periodLabel(last.period, series.calendar)}
          </span>
          <span className="skf-sub">
            {span} {span === 1 ? 'year' : 'years'} from first observation to last
          </span>
        </dd>
      </div>

      <div className="skf-cell">
        <dt>Coverage</dt>
        <dd>
          <span className="skf-n mono">
            {pts.length}/{span}
          </span>
          <span className="skf-sub">
            {/* CORRECTED 2026-08-12 on a reader's review, and the withdrawn wording is quoted
                because the defect is its register, not its content: it read *"A low figure is not
                a fault — a survey run every five years covers exactly as it was designed to."*
                That anticipates a judgement the reader has not made and answers it, which is the
                site talking to an imagined critic instead of stating what the number is. What the
                cell needs is the denominator's meaning, and nothing else. */}
            observations across those years, on this series&rsquo; own reporting interval.
          </span>
        </dd>
      </div>
    </dl>
  );
}
