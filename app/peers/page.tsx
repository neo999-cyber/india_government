import Link from 'next/link';
import type { Metadata } from 'next';
import { panelSeries } from '@/lib/data';
import { SeriesTable } from '@/components/SeriesTable';
import { SourceLine, StatusKey, TierTag } from '@/components/marks';

export const metadata: Metadata = { title: 'Peer panel' };

/** Peer views must show the vintage date (CLAUDE.md rule 7 / P-09). */
export default function PeersPage() {
  const panels = panelSeries();

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / peers
      </p>
      <h1>Peer panel — BGD, VNM, IDN, CHN</h1>
      <p className="lede">
        Peer values are pulled as a whole panel at one vintage and never refreshed a country at a
        time. The vintage date is shown with every panel because the peers rebase too — a panel
        assembled from mixed vintages produces spurious convergence and divergence (P-09).
      </p>
      <StatusKey />

      {panels.length === 0 ? (
        <div className="stub">
          <span className="label">No panel series yet</span>
          No loaded series carries values for more than one country.
        </div>
      ) : (
        panels.map((s) => (
          <section key={s.id}>
            <h2>
              <Link href={`/series/${s.id}/`}>{s.title}</Link>
            </h2>
            <p className="tag-row">
              <span className="tag">{s.unit}</span>
              <span className="tag">{s.calendar === 'FY' ? 'fiscal year' : 'calendar year'}</span>
              <TierTag tier={s.tier} />
              {s.source.vintage ? (
                <span className="tag">vintage {s.source.vintage}</span>
              ) : (
                <span className="tag tag-t5">vintage not recorded</span>
              )}
            </p>
            <SourceLine source={s.source} tier={s.tier} />
            {!s.source.vintage ? (
              <p className="source-line" style={{ color: 'var(--alert)' }}>
                No vintage recorded. Values on this panel cannot be marked verified until the pull
                date is logged (P-09).
              </p>
            ) : null}
            <SeriesTable series={s} />
          </section>
        ))
      )}

      <div className="stub">
        <span className="label">Scaffold</span>
        The peer-index normalisation view (2014 = 100) lands with the counterfactual work. It will
        state its vintage on the same line as its values.
      </div>
    </>
  );
}
