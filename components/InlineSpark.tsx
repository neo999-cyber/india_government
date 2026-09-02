import type { Point } from '@/lib/types';

/**
 * AN INLINE SLOPE FOR A SERIES — the whole run, not two endpoints, seams drawn where they fall.
 *
 * /in-short/ ended every subject card with a two-point figure in words: "49.8% in FY2017-18 to
 * 59.3 in FY2025-26". That IS a slope, said slowly. This draws the series the card already holds —
 * every India observation of its lead indicator — as one small line beside the sentence, so the
 * page scans at a glance and the sentence stays as the claim.
 *
 * WHAT IT ENCODES, AND WHAT IT REFUSES. Height is the series' own range and means nothing between
 * cards, exactly as the Atlas states of its fourteen charts. A break is a solid red stop and the
 * line is SPLIT there: no segment crosses a seam (rule 2). Direction is not coloured, because 199 of
 * 269 series decline to say which way is better and this component will not decide for them.
 */
export function InlineSpark({
  points,
  breaks = [],
  yearOf,
}: {
  points: readonly Point[];
  breaks?: readonly { period: string }[];
  yearOf: (period: string) => number;
}) {
  const pts = points
    .filter((p) => p.value !== null)
    .map((p) => ({ x: yearOf(String(p.period)), v: p.value as number }))
    .sort((a, b) => a.x - b.x);
  if (pts.length < 2) return null;
  const W = 120, H = 28, PAD = 2;
  const x0 = pts[0].x, x1 = pts[pts.length - 1].x, span = Math.max(1, x1 - x0);
  const vmin = Math.min(...pts.map((p) => p.v)), vmax = Math.max(...pts.map((p) => p.v));
  const vspan = vmax - vmin || 1;
  const X = (x: number) => PAD + ((W - 2 * PAD) * (x - x0)) / span;
  const Y = (v: number) => H - PAD - ((H - 2 * PAD) * (v - vmin)) / vspan;
  const stops = breaks.map((b) => yearOf(String(b.period))).filter((y) => y > x0 && y <= x1);
  // segments split at every seam so no line is drawn through one
  const segs: { x: number; v: number }[][] = [[]];
  for (const p of pts) {
    if (stops.includes(p.x) && segs[segs.length - 1].length) segs.push([]);
    segs[segs.length - 1].push(p);
  }
  return (
    <svg className="ins-spark" viewBox={`0 0 ${W} ${H}`} role="img"
         aria-label={`${pts.length} observations from ${x0} to ${x1}${stops.length ? `, with a break at ${stops.join(', ')}` : ''}`}>
      {segs.map((seg, i) =>
        seg.length > 1 ? (
          <polyline key={i} points={seg.map((p) => `${X(p.x).toFixed(1)},${Y(p.v).toFixed(1)}`).join(' ')} />
        ) : seg.length === 1 ? (
          <circle key={i} cx={X(seg[0].x)} cy={Y(seg[0].v)} r="1.4" />
        ) : null,
      )}
      {stops.map((y) => (
        <line key={y} className="ins-spark-stop" x1={X(y)} y1="1" x2={X(y)} y2={H - 1} />
      ))}
      <circle className="ins-spark-end" cx={X(x1)} cy={Y(pts[pts.length - 1].v)} r="1.8" />
    </svg>
  );
}
