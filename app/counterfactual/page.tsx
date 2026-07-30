import Link from 'next/link';
import type { Metadata } from 'next';
import { panelSeries, series } from '@/lib/data';

export const metadata: Metadata = { title: 'Counterfactual' };

export default function CounterfactualPage() {
  const panels = panelSeries();
  const withBreaks = series.filter((s) => (s.breaks?.length ?? 0) > 0);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / counterfactual
      </p>
      <h1>Counterfactual — both methods, or neither</h1>
      <p className="lede">
        &ldquo;What would have happened anyway?&rdquo; has no single answer, so this view will
        never present one. Two methods run side by side, each with its sensitivity shown, and the
        reader is left with the disagreement rather than an average of it.
      </p>

      <h2>Method A — UPA-trend extrapolation</h2>
      <p className="prose-note">
        Fit the pre-2014 trend and extend it. The fit is acutely sensitive to the window chosen:
        starting in 2004 (early boom), 2007 (pre-crisis peak) or 2009 (post-crisis trough) gives
        materially different counterfactual paths. Endpoint sensitivity is rendered with the
        result, never suppressed.
      </p>

      <h2>Method B — peer-index normalisation, 2014 = 100</h2>
      <p className="prose-note">
        Index India and the peer panel to 2014 = 100 and read the divergence. This substitutes a
        global-conditions control for a trend assumption, at the cost of assuming the peers are
        comparable. Peer values carry a single shared vintage (
        <Link href="/peers/">peer panel</Link>, P-09).
      </p>

      <h2>What this view will not do</h2>
      <ul>
        <li className="prose-note">
          Fit any trend through a series break. {withBreaks.length} loaded series carry breaks; on
          those, each segment is fitted alone or not at all.
        </li>
        <li className="prose-note">
          Splice the two GDP bases into one path to extrapolate from. Both bases render, with the
          seam.
        </li>
        <li className="prose-note">
          Combine the two methods into one number. There is no composite score in this instrument,
          of any kind, ever.
        </li>
      </ul>

      <div className="stub">
        <span className="label">Scaffold</span>
        Phase 0 states the method and its constraints only — no counterfactual is computed yet.
        Inputs currently available: {panels.length} peer-panel series,{' '}
        {series.length - panels.length} India-only series.
      </div>
    </>
  );
}
