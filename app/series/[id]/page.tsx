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
import { pairFor } from '@/lib/rules';
import { SeriesTable } from '@/components/SeriesTable';
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

  // Rule 5: neither GDP base renders alone. A paired series always shows its counterpart.
  const pair = pairFor(s.id);
  const companions = (pair ?? [])
    .filter((pid) => pid !== s.id)
    .map((pid) => getSeries(pid))
    .filter((x): x is NonNullable<typeof x> => !!x);

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

      <SeriesTable series={s} />
      {s.notes ? <p className="prose-note">{s.notes}</p> : null}

      {companions.length > 0 ? (
        <>
          <h2>Both series, always</h2>
          <p className="prose-note">
            This indicator exists on two incompatible bases. Neither is presented alone as
            &ldquo;GDP growth&rdquo;: the counterpart is rendered here with the seam between them
            left intact.
          </p>
          {companions.map((c) => (
            <section key={c.id}>
              <h3>
                <Link href={`/series/${c.id}/`}>{c.title}</Link>
              </h3>
              <SourceLine source={c.source} tier={c.tier} />
              <SeriesTable series={c} />
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
        Phase 0 renders series as tables only. Charting comes later and must carry the seam
        rendering with it: no line may be drawn across a break, and no trend may be fitted
        through one.
      </div>
    </>
  );
}
