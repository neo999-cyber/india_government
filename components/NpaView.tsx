import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Series } from '@/lib/types';
import {
  BASIS_DISPUTE,
  BASIS_LABEL,
  WRITE_OFF_DISPUTE,
  adjustedSeries,
  basisOf,
  writeOffAdjustment,
} from '@/lib/npa';
import { SeriesTable } from './SeriesTable';

/**
 * An NPA ratio with the write-off adjustment available alongside it (P-17), and its
 * reporting basis stated wherever it appears (P-18).
 *
 * The toggle is the point. The reported ratio's fall from the 2018 peak mixes genuine
 * recovery with write-offs and with a denominator inflated by credit growth, so the
 * instrument may show it, but never alone and never as the cleanup on its own terms.
 *
 * Both panels are rendered server-side and swapped with CSS, so the toggle costs no
 * JavaScript and works without it — the radios carry the semantics and the keyboard
 * behaviour for free. Both panels go through SeriesTable, so seams and status marks are
 * the same code in both views rather than a second implementation that can drift.
 *
 * When an input for the adjustment is missing, the adjusted panel says so and shows no
 * numbers. A partial adjustment presented as the adjustment would be the same overstatement
 * in the other direction.
 */
export function NpaView({
  series,
  writeOffs,
  advances,
  amount,
  reported,
}: {
  series: Series;
  writeOffs?: Series;
  advances?: Series;
  amount?: Series;
  /** The reported view, built by the page so it keeps its handoff context. */
  reported: ReactNode;
}) {
  const adjustment = writeOffAdjustment(series, writeOffs, advances, amount);
  const derived = adjustedSeries(series, adjustment);
  const basis = basisOf(series);
  const name = `npa-view-${series.id}`;

  return (
    <section className="npa-view">
      <div className="npa-controls">
        <span className="label">NPA view</span>
        <div className="toggle">
          <input
            type="radio"
            className="npa-radio npa-radio-reported"
            id={`${name}-reported`}
            name={name}
            defaultChecked
          />
          <label htmlFor={`${name}-reported`}>reported</label>
          <input
            type="radio"
            className="npa-radio npa-radio-adjusted"
            id={`${name}-adjusted`}
            name={name}
          />
          <label htmlFor={`${name}-adjusted`}>write-off adjusted</label>
        </div>
      </div>

      {/* P-18: the basis travels with the figure, in both views. */}
      <p className={basis ? 'npa-basis' : 'npa-basis npa-basis-missing'}>
        {basis ? (
          <>
            Basis: <strong>{BASIS_LABEL[basis]}</strong>. Not comparable with a figure on the
            other basis without conversion (
            <Link href={`/provenance/${BASIS_DISPUTE}/`}>{BASIS_DISPUTE}</Link>) — the 2018 peak
            reads 14.58% on global operations and 11.46% on domestic.
          </>
        ) : (
          <>
            Basis not stated in this series. Under{' '}
            <Link href={`/provenance/${BASIS_DISPUTE}/`}>{BASIS_DISPUTE}</Link> an unlabelled NPA
            figure cannot be placed on a shared axis with any other: the unlabelled case is the
            trap, worth two to three percentage points of spurious movement.
          </>
        )}
      </p>

      <div className="npa-panel npa-panel-reported">
        {reported}
        <p className="source-line">
          Reported ratio only. Its fall from the 2018 peak mixes genuine recovery with
          write-offs and with a denominator expanded by credit growth —{' '}
          <Link href={`/provenance/${WRITE_OFF_DISPUTE}/`}>{WRITE_OFF_DISPUTE}</Link>.
        </p>
      </div>

      <div className="npa-panel npa-panel-adjusted">
        {derived ? (
          <>
            <SeriesTable series={derived} />
            <p className="source-line">
              Adjusted = (gross NPAs + cumulative write-offs) ÷ gross advances (
              <Link href={`/provenance/${WRITE_OFF_DISPUTE}/`}>{WRITE_OFF_DISPUTE}</Link>), all
              three on the {basis ? BASIS_LABEL[basis] : 'unstated'} basis and one bank
              population. Derived for display: it is not a record in /data, and each point
              carries the weakest status of its inputs.
            </p>
            {adjustment.caveats.length > 0 ? (
              <ul className="npa-caveats">
                {adjustment.caveats.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            ) : null}
          </>
        ) : (
          <div className="npa-blocked">
            <span className="label">Adjusted view unavailable</span>
            <p>
              P-17 defines the adjusted series as gross NPAs plus cumulative write-offs over the
              same denominator. It cannot be computed from the data as loaded:
            </p>
            <ul>
              {adjustment.blockers.map((b) => (
                <li key={b.detail}>{b.detail}</li>
              ))}
            </ul>
            <p>
              Nothing is estimated in its place. An adjusted line drawn on an assumed
              denominator would overstate the cleanup the same way the reported ratio does,
              which is the error{' '}
              <Link href={`/provenance/${WRITE_OFF_DISPUTE}/`}>{WRITE_OFF_DISPUTE}</Link> exists
              to correct.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
