import Link from '@/components/Link';
import { COUNTRY_LABELS } from '@/lib/format';
import { CaveatFlag } from '@/components/marks';
import type { Country, Series } from '@/lib/types';

/**
 * A PEER SLOPE — five countries, two dates, one indicator, one shared scale.
 *
 * ============================ WHY THIS SHAPE AND NOT A MAP OR AN ANIMATION ====================
 *
 * The idea came from a geospatial mock: a fixed set of entities, coloured on a shared scale,
 * scrubbed through time. **Two measurements decided the form it could honestly take here.**
 *
 * There is no state dimension in any schema — the only geographic axis is `points[].country` with
 * five members — so a choropleth of India would render 29 of 36 states grey, which is a map of what
 * was researched presented as a map of the country.
 *
 * And the panel is **not a time series**: it holds two dates per country, 2014 and 2024. An
 * animation has nothing to run on. What five entities at two dates support is a SLOPE, where the
 * comparison a reader wants — who moved, who did not, and who passed whom — is the line's angle
 * rather than a colour.
 *
 * **The shared scale is the whole point and it is defensible HERE and almost nowhere else in this
 * corpus.** One indicator, one source, one definition, five countries: a value on Vietnam means the
 * same thing as a value on India. The overview board refuses a shared value scale for exactly the
 * opposite reason — per cent against rupees against kilometres — and that refusal is correct there.
 *
 * ============================ WHAT IT REFUSES TO ENCODE =======================================
 *
 * **NO MERIT COLOURING.** The mock ran saffron-to-green, low-to-high, which makes high good. This
 * corpus leaves `higherIsBetter` null wherever direction is contested. India is distinguished by
 * WEIGHT — a heavier line and a filled point — and never by hue, so the chart says *where India
 * is*, not *how India is doing*.
 *
 * **The withdrawn half of that sentence read “and the field is a known unread debt besides”, and
 * it stopped being true on 2026-08-12**, when the question routes made the field render. It never
 * carried the argument: the refusal here is that a slope chart has no defensible hue to spend, and
 * a rendered direction of merit is a WORD on a record, not a licence to colour a line.
 *
 * **NO RANK NUMBER.** Position on the axis is the value, and reading a rank off it is the reader's
 * inference from a stated quantity. Printing "4th of 5" would convert a measurement into a
 * standing, which is the composite rule 9 refuses.
 *
 * **NO LINE ACROSS A MISSING ENDPOINT.** A country lacking either date is drawn as the single point
 * it has, labelled, with no slope — rule 4, at slope scale. Nothing is interpolated to make a line.
 */

const W = 300;
const H = 190;
const PAD = { top: 16, bottom: 26, left: 8, right: 8 };
const ORDER: Country[] = ['IND', 'BGD', 'VNM', 'IDN', 'CHN'];

const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

/**
 * One decimal below 100, none above.
 *
 * The first cut rounded everything at 10 and up to an integer, which printed India's agriculture
 * employment share as 45 → 42 while the page's own lead sentence said the fall was **2.9 points**.
 * A chart that rounds away the quantity the prose is about is a chart contradicting its caption.
 * Panel values run 1.1 to 13,293, so the split at 100 keeps a decimal exactly where it carries
 * meaning and drops it where four significant figures would be noise.
 */
const fmt = (v: number) =>
  Math.abs(v) >= 100
    ? v.toLocaleString('en-IN', { maximumFractionDigits: 0 })
    : String(Number(v.toFixed(1)));

export function PeerSlope({ series }: { series: Series }) {
  const pts = series.points.filter((p) => p.value !== null);
  const years = [...new Set(pts.map((p) => yearOf(p.period)))].sort((a, b) => a - b);
  if (years.length < 2) return null;
  const y0 = years[0];
  const y1 = years[years.length - 1];

  const at = (c: Country, yr: number) =>
    pts.find((p) => p.country === c && yearOf(p.period) === yr);

  const rows = ORDER.map((c) => ({ c, a: at(c, y0), b: at(c, y1) })).filter((r) => r.a || r.b);
  if (rows.length === 0) return null;

  const values = rows.flatMap((r) => [r.a?.value, r.b?.value]).filter((v): v is number => v != null);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const span = hi - lo || 1;

  const plotH = H - PAD.top - PAD.bottom;
  const xa = PAD.left + 58;
  const xb = W - PAD.right - 58;
  const y = (v: number) => PAD.top + plotH - ((v - lo) / span) * plotH;

  /**
   * LABELS ARE PUSHED APART; THE DOTS ARE NOT.
   *
   * Countries cluster — 13 of the 16 panels had labels overlapping at the first cut, and two
   * unreadable numbers are worse than one. So the TEXT is de-collided to a minimum gap while every
   * DOT stays at its true position. **The value a reader takes off the axis is the dot, and the dot
   * never moves**; the label is an annotation on it and sits within a few units of it.
   *
   * This is the one place on the page where a drawn position is not exactly the datum, so it is
   * said out loud here rather than left for someone to discover by measuring the SVG.
   */
  const GAP = 11;
  const declutter = (items: { key: string; v: number }[]) => {
    const placed = items
      .map((it) => ({ ...it, y: y(it.v) }))
      .sort((m, n2) => m.y - n2.y);
    for (let i = 1; i < placed.length; i += 1) {
      if (placed[i].y - placed[i - 1].y < GAP) placed[i].y = placed[i - 1].y + GAP;
    }
    // If the push ran past the frame, slide the whole stack back up.
    const over = placed.length ? placed[placed.length - 1].y - (H - PAD.bottom) : 0;
    if (over > 0) for (const q of placed) q.y -= over;
    return new Map(placed.map((q) => [q.key, q.y]));
  };
  const leftLabelY = declutter(
    rows.filter((r) => r.a).map((r) => ({ key: r.c, v: r.a!.value as number })),
  );
  const rightLabelY = declutter(
    rows.filter((r) => r.b).map((r) => ({ key: r.c, v: r.b!.value as number })),
  );

  return (
    <figure className="pslope">
      <figcaption>
        <h3>
          <Link href={`/series/${series.id}/`}>{series.title.replace(/\s*\(peer panel\)\s*$/, '')}</Link>
        </h3>
        <p className="pslope-unit mono">
          {series.unit} · {y0} to {y1} · tier {series.tier}
          {series.source.vintage ? ` · vintage ${series.source.vintage}` : ' · VINTAGE NOT RECORDED'}
        </p>
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="pslope-svg"
        role="img"
        aria-label={rows
          .map(
            (r) =>
              `${COUNTRY_LABELS[r.c]} ${r.a ? fmt(r.a.value as number) : 'no value'} in ${y0}, ${
                r.b ? fmt(r.b.value as number) : 'no value'
              } in ${y1}`,
          )
          .join('. ')}
      >
        <line className="pslope-axis" x1={xa} x2={xa} y1={PAD.top - 6} y2={H - PAD.bottom} />
        <line className="pslope-axis" x1={xb} x2={xb} y1={PAD.top - 6} y2={H - PAD.bottom} />

        {rows.map((r) => {
          const india = r.c === 'IND';
          const cls = india ? 'pslope-line is-india' : 'pslope-line';
          return (
            <g key={r.c}>
              {r.a && r.b ? (
                <line
                  className={cls}
                  x1={xa}
                  x2={xb}
                  y1={y(r.a.value as number)}
                  y2={y(r.b.value as number)}
                />
              ) : null}
              {r.a ? (
                <>
                  <circle
                    className={`pslope-dot${india ? ' is-india' : ''} pslope-${r.a.status}`}
                    cx={xa}
                    cy={y(r.a.value as number)}
                    r={india ? 4 : 3}
                  />
                  <text className={`pslope-lbl${india ? ' is-india' : ''}`} x={xa - 7} y={(leftLabelY.get(r.c) ?? y(r.a.value as number)) + 3} textAnchor="end">
                    {r.c} {fmt(r.a.value as number)}
                  </text>
                </>
              ) : null}
              {r.b ? (
                <>
                  <circle
                    className={`pslope-dot${india ? ' is-india' : ''} pslope-${r.b.status}`}
                    cx={xb}
                    cy={y(r.b.value as number)}
                    r={india ? 4 : 3}
                  />
                  <text className={`pslope-lbl${india ? ' is-india' : ''}`} x={xb + 7} y={(rightLabelY.get(r.c) ?? y(r.b.value as number)) + 3}>
                    {fmt(r.b.value as number)} {r.c}
                  </text>
                </>
              ) : null}
            </g>
          );
        })}

        <text className="pslope-yr" x={xa} y={H - 8} textAnchor="middle">
          {y0}
        </text>
        <text className="pslope-yr" x={xb} y={H - 8} textAnchor="middle">
          {y1}
        </text>
      </svg>

      {/* Rule 4b and 3a: this surface LISTS the record, so its declarations render here in full.
          THROUGH `CaveatFlag`, NOT A PARAGRAPH OF ITS OWN. The first cut hand-rolled
          `<p className="pslope-caveat">`, which rendered the text correctly and was invisible to
          `listing-marks` — the gate binds `caveat-inline`, the class the one sanctioned renderer
          emits. That is the ad-hoc-normaliser class: a second implementation of a rule, and the
          copy nobody maintains is the one that eventually truncates. */}
      {series.caveat ? <CaveatFlag caveat={series.caveat} variant="inline" linkify={false} /> : null}
      {rows.some((r) => !r.a || !r.b) ? (
        <p className="pslope-gap">
          {rows
            .filter((r) => !r.a || !r.b)
            .map((r) => `${COUNTRY_LABELS[r.c]} has one date, not two`)
            .join('; ')}
          . No line is drawn for those — an endpoint the panel does not hold is not estimated.
        </p>
      ) : null}
    </figure>
  );
}
