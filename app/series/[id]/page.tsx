import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { seriesCard } from '@/lib/share-card';
import { SeriesLd } from '@/components/StructuredData';
import {
  getProvenance,
  getSeries,
  ledgerCitingSeries,
  pairsWithSeriesAsSide,
  provenanceForSeries,
  resolvePairSide,
  series as allSeries,
} from '@/lib/data';
import { DIRECTION_OF_BIAS_LABELS, DOMAIN_LABELS, LENS_LABELS, TERM_SHORT } from '@/lib/format';
import { denominatorBreaksFor, regimeFor, regimeNeighbours, roleInProvenance } from '@/lib/rules';
import { PairSection, caveatsShownByPair, contestedPairRendersBothSeries, pooledByPair } from '@/components/PairSection';
import {
  ADVANCES_SERIES,
  NPA_AMOUNT_SERIES,
  WRITE_OFFS_SERIES,
  hasWriteOffAdjustment,
} from '@/lib/npa';
import { SeriesTable } from '@/components/SeriesTable';
import { SeriesChart } from '@/components/SeriesChart';
import { SERIES_FINDINGS } from '@/lib/series-copy';
import { SeriesKeyFigures } from '@/components/SeriesKeyFigures';
import { NpaView } from '@/components/NpaView';
import { RegimeOverlap } from '@/components/RegimeOverlap';
import { Absences, CaveatFlag, DirectionMark, RecordMarks, SourceLine, StatusKey, TierTag } from '@/components/marks';
import { NextSteps } from '@/components/NextSteps';
import { citedByOverflow, stepsForSeries } from '@/lib/next-steps';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return allSeries.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const s = getSeries(id);
  return s ? seriesCard(s) : { title: 'Series' };
}

export default async function SeriesDetail({ params }: Props) {
  const { id } = await params;
  const s = getSeries(id);
  if (!s) notFound();

  // Rule 5: no GDP base renders alone. Every regime in the group renders, in base order.
  const group = regimeFor(s.id);
  const regimes = (group ?? [])
    .map((rid) => getSeries(rid))
    .filter((x): x is NonNullable<typeof x> => !!x);
  const companions = regimes.filter((c) => c.id !== s.id);

  /** Titles either side, so a seam at a handoff names what it hands off to. */
  const handoffFor = (id: string) => {
    const { previous, next } = regimeNeighbours(id);
    const lookup = (pid: string | null) => {
      if (!pid) return undefined;
      const found = getSeries(pid);
      return found ? { id: found.id, title: found.title } : undefined;
    };
    return { previous: lookup(previous), next: lookup(next) };
  };

  // Pairs come from data/pairs.json. A series never renders alone where a pair declares it:
  // for coverage-usage the coverage figure alone says the opposite of what the pair shows,
  // and for contested a single instrument states a direction the evidence does not establish.
  //
  // EVERY pair this series is a SIDE of, not the first one. `pairsForSeries(id)[0]` used to decide
  // this, and it dropped three pairs entirely — PR-35, PR-37 and PR-52 each lost the slot to
  // another pair of the same series and rendered on no page in the instrument. The subject/host
  // distinction the old `isPairSide` test enforced is kept and now lives in `pairsWithSeriesAsSide`:
  // a series that merely HOSTS an absence another pair cites is not that pair's subject — PR-34
  // cites jk-prison-detained-category's unmeasured[0] while its own numbers are the thing the
  // reader came for. Treating the two cases alike cost that series its table, its caveat and its
  // notes on its own page; reachability caught the two marks and the table was going with them.
  const sidePairs = pairsWithSeriesAsSide(s.id);
  const pair = sidePairs[0];
  const sideA = pair ? resolvePairSide(pair.a) : null;
  const sideB = pair ? resolvePairSide(pair.b) : null;
  const paired = Boolean(pair && sideA && sideB);
  // What every EARLIER pair on this page has already pooled, one entry per later pair.
  // A series that is a side of two pairs would otherwise have its declarations pooled by both,
  // and a reader would meet the same absence twice on one page — three of them on
  // `jk-detenus-psi`, measured on the first build after the second pair started rendering.
  const pooledBefore = sidePairs.slice(1).map(
    (_, i) => new Set(sidePairs.slice(0, i + 1).flatMap(pooledByPair)),
  );
  // The same, for caveats. Added 2026-08-11: the absence half of this had existed since the
  // multi-pair case was found and the caveat half had not, so a series that is a side of two
  // contested pairs rendered its caveat twice on its own page.
  const caveatsBefore = sidePairs.slice(1).map(
    (_, i) => new Set(sidePairs.slice(0, i + 1).flatMap(caveatsShownByPair)),
  );
  // Suppress the caveat only where ContestedPairView ACTUALLY renders it, not merely because the
  // pair is contested. A contested pair with a non-series side falls through to CoverageUsageView,
  // which renders no caveat — so `!contested` alone suppressed a mark nothing then rendered.
  // CLAUDE.md rule 3a is absolute: a caveat renders wherever the record appears, every time.
  // The test is the one PairSection dispatches on, imported rather than restated: two copies of
  // it would drift, and this copy is the one that decides whether a caveat is hidden.
  //
  // WIDENED 2026-08-11 FROM `sidePairs[0]` TO EVERY PAIR ON THE PAGE. WITHDRAWN CODE, so the change
  // can be checked: it read `Boolean(pair) && contestedPairRendersBothSeries(pair)`.
  //
  // **A series that is a side of TWO pairs, where the SECOND is the contested one, rendered its own
  // caveat twice** — once from this page and once from that pair's `Instrument`. Three series did:
  // `jk-detenus-psi`, `jk-civilians-killed-composite`, `jk-organised-stone-pelting`.
  //
  // **The guard was bound to the first pair while `pooledBefore` two lines above already iterates
  // all of them** — the same page, the same multi-pair case, one loop widened and its neighbour
  // left behind. That is the guard-binds-a-scope shape at its shortest range, and no gate reaches
  // it: `listing-marks` binds *each declaration at most once per page* to listing ROWS, and on a
  // record's own page neither copy is a row.
  //
  // **AND THE WIDENING HAD TO BE NARROWED IN THE SAME OPERATION.** `sidePairs.some(rendersBoth)`
  // asks *does any pair on this page render both its series* — not *does any pair render THIS
  // series' caveat*. Four series were sides of a pair that renders both while their OWN caveat sat
  // in a different pair, and the page suppressed a caveat nothing then rendered: `missing` is a
  // rule 3a breach and strictly worse than the duplicate it replaced. The test names the series.
  const contestedPairRendersCaveat = sidePairs.some(
    (p) =>
      contestedPairRendersBothSeries(p) &&
      [p.a, p.b].some((side) => {
        const r = resolvePairSide(side);
        return r?.kind === 'series' && r.series.id === s.id;
      }),
  );

  const denominatorBreaks = denominatorBreaksFor(s);
  const disputes = provenanceForSeries(s);
  const citedBy = ledgerCitingSeries(s.id);

  const finding = SERIES_FINDINGS[s.id];

  return (
    <>
      <SeriesLd series={s} />
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/series/">series</Link> /{' '}
        <Link href={`/domains/${s.domain}/`}>{DOMAIN_LABELS[s.domain]}</Link>
      </p>
      <h1>{s.title}</h1>

      {/* ============================ THE FINDING, WHERE THE READER LANDS =====================
          §3's new order, and the governing sentence of the revision: show the finding first, then
          reveal the methodology and caveats in layers. The old page opened with the record id, the
          tier, the source line, the status key and a full blocking caveat — five blocks of
          apparatus — and reached no chart at all. **There was never a chart here**: `SeriesChart`
          shipped on the homepage, the domain pages and a story, and on none of the 269 pages about
          the series themselves.

          A series with no authored finding renders without the line, as a domain without periods
          renders without the block. Nothing is generated into the gap. */}
      {finding ? <p className="standfirst">{finding.finding}</p> : null}

      {/* `marksHostedByPage` — this page renders the caveat and the absences as their own
          sections below, so the chart must not also carry them. Without it the caveat appeared
          twice on 130 of 269 pages and no gate could see it; see the flag's own note. */}
      {/* Directly under this page's h1, so the chart title is the first section: h2, not h3.
          Hardcoded h3 here put every one of the 269 series pages into an h1 -> h3 skip. */}
      <SeriesChart series={s} highlightLast={false} marksHostedByPage headingLevel={2} />

      <SeriesKeyFigures series={s} />

      {/* WHAT THIS TELLS US — the record's own notes, moved above the caveat rather than left
          below the table. The pair view renders each side's notes beside its own table. */}
      {s.notes && !paired ? (
        <p className="prose-note">{s.notes}</p>
      ) : null}

      {/* WHAT TO BE CAREFUL ABOUT. **Not shortened and not collapsed — rule 3a, and the ruling
          was made once already on the grid cards: the layout changes, the caveat does not.** A
          collapsed caveat with an expander is a truncation with a control on it.

          What changed here is POSITION ONLY. It used to sit above everything, before any rendering
          of the numbers; it now sits after the finding and the chart. That is a reading-order fix
          of the same kind rule 4b made for absences, and it moves no words. */}
      {s.caveat && !contestedPairRendersCaveat ? <CaveatFlag caveat={s.caveat} /> : null}

      {/* Rule 4a. Suppressed only when the pair view already pooled them, which it does at
          the pair's width so a chain-level absence is not squeezed into one column. */}
      {paired ? null : <Absences items={s.unmeasured} />}

      {/* THE DIRECTION OF MERIT, RENDERED FOR THE FIRST TIME on 2026-08-12, above the identifiers
          rather than among them: it is not an identifier but a statement about how to read the
          figures above it — and on the 76 series that declare no agreed direction, a statement that
          the instrument will not tell a reader which way is the good way. The question routes
          select on this field, and a criterion a reader cannot check is not a criterion. */}
      <DirectionMark value={s.higherIsBetter} />

      {/* ============================ SECONDARY METADATA ======================================
          **The record id and the tier stay.** A citable instrument needs its identifiers visible,
          and this is a demotion in position rather than a removal. They sit under the finding, the
          chart and the qualification instead of above them. */}
      <p className="tag-row">
        <span className="tag">{s.id}</span>
        <span className="tag">{s.unit}</span>
        <span className="tag">{s.calendar === 'FY' ? 'fiscal year' : 'calendar year'}</span>
        <TierTag tier={s.tier} />
        {/*
          The lens axis, on the series' own page — see the note on the ledger detail page. 33 of the
          54 series carrying a lens showed it nowhere on themselves.
        */}
        {(s.lenses ?? []).map((x) => (
          <Link key={x} className="tag tag-lens" href={`/lenses/${x}/`}>
            lens · {LENS_LABELS[x]}
          </Link>
        ))}
        {disputes.map((p) => (
          <Link key={p.id} className="tag" href={`/provenance/${p.id}/`}>
            {p.id}
          </Link>
        ))}
      </p>
      <SourceLine source={s.source} tier={s.tier} />
      <StatusKey />




      {/* P-17: an NPA ratio never renders without the adjusted view offered beside it.
          P-22: neither side of a coverage/usage pair renders without the other — a coverage
          figure alone states the opposite of what the pair was assembled to show. */}
      {hasWriteOffAdjustment(s) ? (
        <NpaView
          series={s}
          writeOffs={getSeries(WRITE_OFFS_SERIES)}
          advances={getSeries(ADVANCES_SERIES)}
          amount={getSeries(NPA_AMOUNT_SERIES)}
          reported={<SeriesTable series={s} handoff={handoffFor(s.id)} />}
        />
      ) : paired ? (
        <PairSection pair={pair} />
      ) : (
        <SeriesTable series={s} handoff={handoffFor(s.id)} />
      )}

      {/* THE SECOND AND LATER PAIRS THIS SERIES IS A SIDE OF.
          The first displaces the bare table, because a coverage figure alone states the opposite
          of what its pair was assembled to show. The rest cannot displace anything — there is only
          one table — so they render after it. Taking only the first is what hid PR-35, PR-37 and
          PR-52: each is a second pair of a series whose first slot another pair already held, and
          all three rendered on no page in the instrument. */}
      {sidePairs.slice(1).map((extra, i) => (
        <PairSection
          key={extra.id}
          pair={extra}
          alreadyPooled={pooledBefore[i]}
          caveatsAlreadyShown={caveatsBefore[i]}
        />
      ))}





      {denominatorBreaks.length > 0 ? (
        <div className="denominator-callout">
          <span className="label">Denominator break</span>
          <p>
            This is a ratio to GDP, and the level of GDP was restated beneath it. The step at{' '}
            {denominatorBreaks.map((d) => d.date).join(', ')} is arithmetic, not activity: the
            numerator did not move. It is marked differently from a series break because the
            series itself did not change basis — what it is divided by did.
          </p>
        </div>
      ) : null}

      {companions.length > 0 ? (
        <>
          <h2>All {regimes.length} regimes, always</h2>
          <p className="prose-note">
            This indicator exists on {regimes.length}{' '}
            incompatible bases and none is presented alone as &ldquo;GDP growth&rdquo;. The others
            are rendered here with every seam left intact. Where one base ends and the next
            begins, both sides carry the handoff.
          </p>

          <h3>Years reported on more than one base</h3>
          <RegimeOverlap regimes={regimes} />

          {companions.map((c) => (
            <section key={c.id}>
              <h3>
                <Link href={`/series/${c.id}/`}>{c.title}</Link>
              </h3>
              <SourceLine source={c.source} tier={c.tier} />
              <SeriesTable series={c} handoff={handoffFor(c.id)} />
            </section>
          ))}
        </>
      ) : null}

      <h2>What this number rests on</h2>
      {disputes.length === 0 ? (
        <p className="prose-note">
          No measurement dispute is recorded against this series. That is a claim about the
          provenance layer as loaded, not a guarantee the series is uncontested.
        </p>
      ) : (
        <div className="grid">
          {disputes.map((p) => (
            <Link key={p.id} href={`/provenance/${p.id}/`}>
              <span className="label">{p.id}</span>
              <span className="grid-title">{p.title}</span>
              {/* directionOfBias describes what the record does to the series it distorts,
                  so it is withheld from a corrective. Printing "overstates-post-2014" beside
                  nh-construction-pace would tell a reader the one series that does not
                  overstate that it does. */}
              <span className="grid-meta">
                {roleInProvenance(s.id, p) === 'corrective'
                  ? 'this series is the corrective, not the affected party'
                  : DIRECTION_OF_BIAS_LABELS[p.directionOfBias] ?? p.directionOfBias}{' '}
                · bridge {p.bridgeExists ? 'exists' : 'none'}
              </span>
            </Link>
          ))}
        </div>
      )}

      <h2>Cited by the ledger</h2>
      {citedBy.length === 0 ? (
        <p className="prose-note">No ledger record cites this series yet.</p>
      ) : (
        <div className="grid">
          {citedBy.map((l) => (
            <Link key={l.id} href={`/ledger/${l.id}/`}>
              <span className="label">
                {l.id} · {TERM_SHORT[l.term]}
              </span>
              <span className="grid-title">{l.title}</span>
              <span className="grid-meta">{l.date}</span>
              <RecordMarks record={l} linkify={false} />
            </Link>
          ))}
        </div>
      )}

      {/* §9 — the reader review's own case. They wanted to go from this page's sentence about a
          press-compiled register TO that register and had to hunt for it through ledger
          relationships. The first step below is that link, named, with the pair that declares the
          relation printed beside it. */}
      <NextSteps
        steps={stepsForSeries(s)}
        overflow={{ n: citedByOverflow(s), href: '/ledger/', label: 'The full ledger' }}
      />
    </>
  );
}
