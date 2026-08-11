import Link from 'next/link';
import type { Metadata } from 'next';
import { getLedger, ledgerCitingSeries, panelSeries } from '@/lib/data';
import { PeerSlope } from '@/components/PeerSlope';
import { SeriesTable } from '@/components/SeriesTable';
import { AbsenceCount, Absences, CaveatFlag, SourceLine, StatusKey, TierTag } from '@/components/marks';

export const metadata: Metadata = {
  title: 'Peers',
  description:
    'India against Bangladesh, Vietnam, Indonesia and China on sixteen indicators, 2014 against ' +
    '2024. One indicator, one source, one definition — the only place in this record where a value ' +
    'on one country means the same thing as a value on another.',
};

const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

/**
 * `/peers/` — REBUILT 2026-08-11 from eighteen stacked whole-series blocks.
 *
 * WHAT WAS WRONG. The page rendered each panel series in full, one after another: title, tags,
 * source, a five-row table, absences, repeat. Every fact was there and **the comparison the panel
 * exists to make was not** — a reader had to hold five numbers in their head across eighteen
 * tables to see anything.
 *
 * ============================ WHY A SLOPE, AND WHY HERE ONLY ==================================
 *
 * A shared scale across entities is defensible where the entities are measured the same way, and
 * **the peer panel is the only place in this corpus where that holds**: one indicator, one source,
 * one definition, five countries. The overview board refuses a shared value scale for the opposite
 * reason — per cent against rupees against kilometres — and is right to.
 *
 * The form follows a measurement rather than a preference: **the panel holds two dates per country,
 * not a series.** Sixteen of the eighteen carry both; the two COVID school-closure series carry one
 * date and are excluded from the grid rather than drawn as a point pretending to be a trend.
 *
 * P-09 governs the whole surface and always did: values are pulled as a panel at one vintage, and
 * the vintage prints on every slope.
 */
export default function PeersPage() {
  const panels = panelSeries();
  const slopes = panels.filter(
    (s) => new Set(s.points.filter((p) => p.value !== null).map((p) => yearOf(p.period))).size >= 2,
  );
  const single = panels.filter((s) => !slopes.includes(s));

  /**
   * THE LEAD FINDING, COMPUTED HERE RATHER THAN ASSERTED.
   *
   * Three of the panel's agriculture indicators are read together because L-0065 already reads them
   * together — `agri-employment-peer` and `industry-employment-peer` are in its own `seriesRefs`,
   * so the link is a declared edge and not an inference drawn on this page.
   *
   * **It is a statement about what the panel shows, not a verdict**, and it carries no composite:
   * three separate quantities are named with their own numbers and nothing is combined.
   */
  const delta = (id: string, c: string) => {
    const s = panels.find((x) => x.id === id);
    if (!s) return null;
    const pts = s.points.filter((p) => p.country === c && p.value !== null);
    const ys = [...new Set(pts.map((p) => yearOf(p.period)))].sort((a, b) => a - b);
    if (ys.length < 2) return null;
    const a = pts.find((p) => yearOf(p.period) === ys[0])?.value as number;
    const b = pts.find((p) => yearOf(p.period) === ys[ys.length - 1])?.value as number;
    return +(b - a).toFixed(2);
  };
  const empIND = delta('agri-employment-peer', 'IND');
  const empVNM = delta('agri-employment-peer', 'VNM');
  const gdpIND = delta('agri-gdp-share-peer', 'IND');
  const gdpPeers = ['BGD', 'VNM', 'IDN', 'CHN'].map((c) => delta('agri-gdp-share-peer', c));
  const gdpAllFell = gdpPeers.every((v) => v !== null && v < 0);
  const l0065 = getLedger('L-0065');

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / peers
      </p>
      <h1 className="page-lead">Peers</h1>
      <p className="standfirst">
        India against Bangladesh, Vietnam, Indonesia and China, 2014 against 2024.{' '}
        <b>
          This is the only place in this record where a value on one country means the same thing as
          a value on another
        </b>{' '}
        — one indicator, one source, one definition, pulled as a whole panel at a single vintage.
      </p>

      {empIND !== null && empVNM !== null && gdpIND !== null && gdpAllFell && l0065 ? (
        <section className="peer-lead">
          <h2>What the panel shows first</h2>
          <p>
            Agriculture&rsquo;s share of employment fell{' '}
            <strong>{Math.abs(empIND).toFixed(1)} points in India</strong> over the decade and{' '}
            <strong>{Math.abs(empVNM).toFixed(1)} points in Vietnam</strong>. Over the same years
            agriculture&rsquo;s share of GDP <strong>rose in India</strong>, by{' '}
            {gdpIND.toFixed(2)} points — <strong>the only country in the panel where it rose</strong>
            ; it fell in all four peers.
          </p>
          <p className="peer-lead-note">
            Three separate quantities, each stated with its own number and none combined into a
            score. The corpus already reads them together:{' '}
            <Link href="/ledger/L-0065/">{l0065.title}</Link> names two of these series in its own
            references, so the connection is recorded rather than drawn here.
          </p>
        </section>
      ) : null}

      <div className="sec-h">
        <h2>Sixteen indicators</h2>
        <p className="sec-note">
          Two dates per country, so the line is the change and its angle is the comparison. India is
          drawn heavier — never a different colour, because direction of merit is unset or contested
          on several of these.
        </p>
      </div>

      <div className="pslopes">
        {slopes.map((s) => (
          <PeerSlope key={s.id} series={s} />
        ))}
      </div>

      <p className="prose-note">
        <span className="label">On reading these</span> A country&rsquo;s position on the axis is its
        value, and nothing here ranks. Where a hollow point appears the figure was published as an
        approximation. Vintage prints on every panel because the peers rebase too, and a panel
        assembled from mixed vintages produces convergence and divergence that are artefacts of the
        pull rather than of the world (P-09).
      </p>

      {/* THE SINGLE-DATE SERIES GET A BLOCK, NOT AN ASIDE — and the first cut of this page got it
          wrong. They were named in a prose sentence, by title, with no marks: **both of them carry
          a caveat and one declares two absences**, and naming a record without its declarations is
          exactly what rule 4b forbids. `listing-marks` did not catch it because a sentence carries
          no anchor, which is the guard-scope shape again. They render as records here. */}
      {single.length > 0 ? (
        <section className="peer-single">
          <div className="sec-h">
            <h2>Two with one date</h2>
            <p className="sec-note">
              One observation each, so there is no slope to draw and none is drawn. A point is not a
              trend. These two render in full here rather than in the list below, so nothing on this
              page is declared twice.
            </p>
          </div>
          {single.map((s) => {
            const pts = s.points.filter((p) => p.value !== null);
            return (
              <article key={s.id} className="peer-one">
                <h3>
                  <Link href={`/series/${s.id}/`}>{s.title}</Link>
                </h3>
                <p className="pslope-unit mono">
                  {s.unit} · tier {s.tier}
                  {s.source.vintage ? ` · vintage ${s.source.vintage}` : ' · VINTAGE NOT RECORDED'}
                </p>
                <p className="peer-one-vals mono">
                  {pts.map((pt, i) => (
                    <span key={pt.country}>
                      {i > 0 ? ' · ' : ''}
                      {pt.country} {pt.value}
                      {pt.status !== 'verified' ? ` (${pt.status})` : ''}
                    </span>
                  ))}
                </p>
                {s.caveat ? <CaveatFlag caveat={s.caveat} variant="inline" /> : null}
                {/* The full block AND the count: `Absences` renders every declaration in full,
                    which is what this surface owes, and `AbsenceCount` is the mark `listing-marks`
                    binds. Both, because they answer different questions — how many, and which. */}
                <AbsenceCount items={s.unmeasured} />
                <Absences items={s.unmeasured} />
              </article>
            );
          })}
        </section>
      ) : null}

      <details className="more">
        <summary>
          The other {slopes.length} in full, with sources, vintages and tables
        </summary>
        <div className="more-inner">
          {/* THE SINGLE-DATE TWO ARE NOT REPEATED HERE. They render whole in the block above, and
              `listing-marks` caught the first cut showing one record's absence twice on this page —
              *"a reader met the same absence twice; the page stops being a faithful count of what is
              declared."* Each record renders once on this page, and the block above is where those
              two do it. */}
          <StatusKey />
          {slopes.map((s) => {
            const citedBy = ledgerCitingSeries(s.id);
            return (
              <section key={s.id} className="peer-full">
                <h3>
                  <Link href={`/series/${s.id}/`}>{s.title}</Link>
                </h3>
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
                {s.caveat ? <CaveatFlag caveat={s.caveat} /> : null}
                <SourceLine source={s.source} tier={s.tier} />
                {!s.source.vintage ? (
                  <p className="source-line" style={{ color: 'var(--alert)' }}>
                    No vintage recorded. Values on this panel cannot be marked verified until the
                    pull date is logged (P-09).
                  </p>
                ) : null}
                <SeriesTable series={s} />
                {/* Rule 4a. This block renders the series WHOLE, so it takes the full declaration
                    block rather than a listing count. It rendered neither until 2026-08-08. */}
                <Absences items={s.unmeasured} />
                {citedBy.length > 0 ? (
                  <p className="source-line">
                    Cited by{' '}
                    {citedBy.map((r, i) => (
                      <span key={r.id}>
                        {i > 0 ? ' · ' : ''}
                        <Link href={`/ledger/${r.id}/`}>{r.id}</Link>
                      </span>
                    ))}
                  </p>
                ) : null}
              </section>
            );
          })}
        </div>
      </details>

      <div className="stub">
        <span className="label">Scaffold</span>
        The peer-index normalisation view (2014 = 100) lands with the counterfactual work. It will
        state its vintage on the same line as its values.
      </div>
    </>
  );
}
