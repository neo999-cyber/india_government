import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getSeries,
  ledgerCitingSeries,
  provenanceForSeries,
  series as allSeries,
} from '@/lib/data';
import { DOMAIN_LABELS, TERM_SHORT } from '@/lib/format';
import { denominatorBreaksFor, regimeFor, regimeNeighbours } from '@/lib/rules';
import {
  ADVANCES_SERIES,
  NPA_AMOUNT_SERIES,
  WRITE_OFFS_SERIES,
  hasWriteOffAdjustment,
} from '@/lib/npa';
import { SeriesTable } from '@/components/SeriesTable';
import { NpaView } from '@/components/NpaView';
import { RegimeOverlap } from '@/components/RegimeOverlap';
import { SourceLine, StatusKey, TierTag } from '@/components/marks';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return allSeries.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const s = getSeries(id);
  return { title: s ? s.title : 'Series' };
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

  const denominatorBreaks = denominatorBreaksFor(s);
  const disputes = provenanceForSeries(s);
  const citedBy = ledgerCitingSeries(s.id);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/series/">series</Link> /{' '}
        <Link href={`/domains/${s.domain}/`}>{DOMAIN_LABELS[s.domain]}</Link>
      </p>
      <h1>{s.title}</h1>
      <p className="tag-row">
        <span className="tag">{s.id}</span>
        <span className="tag">{s.unit}</span>
        <span className="tag">{s.calendar === 'FY' ? 'fiscal year' : 'calendar year'}</span>
        <TierTag tier={s.tier} />
        {disputes.map((p) => (
          <Link key={p.id} className="tag" href={`/provenance/${p.id}/`}>
            {p.id}
          </Link>
        ))}
      </p>
      <SourceLine source={s.source} tier={s.tier} />
      <StatusKey />

      {/* P-17: an NPA ratio never renders without the adjusted view offered beside it. */}
      {hasWriteOffAdjustment(s) ? (
        <NpaView
          series={s}
          writeOffs={getSeries(WRITE_OFFS_SERIES)}
          advances={getSeries(ADVANCES_SERIES)}
          amount={getSeries(NPA_AMOUNT_SERIES)}
          reported={<SeriesTable series={s} handoff={handoffFor(s.id)} />}
        />
      ) : (
        <SeriesTable series={s} handoff={handoffFor(s.id)} />
      )}
      {s.notes ? <p className="prose-note">{s.notes}</p> : null}

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
              <span className="grid-meta">
                {p.directionOfBias} · bridge {p.bridgeExists ? 'exists' : 'none'}
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
            </Link>
          ))}
        </div>
      )}

      <div className="stub">
        <span className="label">Scaffold</span>
        Phase 0 renders series as tables only. Charting comes later and must carry both marks
        with it: no line may be drawn across a seam and no trend fitted through one, and any
        chart of a ratio to GDP spanning 27 Feb 2026 must show the denominator break — the
        step is arithmetic, and a chart that hides it asserts activity that did not happen.
      </div>
    </>
  );
}
