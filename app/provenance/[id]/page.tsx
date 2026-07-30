import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getProvenance,
  ledgerCitingProvenance,
  provenance as allProvenance,
  seriesCitingProvenance,
} from '@/lib/data';
import { DOMAIN_LABELS, TERM_SHORT } from '@/lib/format';
import { SourceList } from '@/components/marks';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return allProvenance.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = getProvenance(id);
  return { title: p ? `${p.id} · ${p.title}` : 'Provenance record' };
}

export default async function ProvenanceDetail({ params }: Props) {
  const { id } = await params;
  const p = getProvenance(id);
  if (!p) notFound();

  const affected = seriesCitingProvenance(p.id);
  const namedButAbsent = (p.affectsSeries ?? []).filter(
    (sid) => !affected.some((s) => s.id === sid),
  );
  const citedBy = ledgerCitingProvenance(p.id);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/provenance/">provenance</Link> / {p.id}
      </p>
      <h1>{p.title}</h1>
      <p className="tag-row">
        <span className="tag">{p.id}</span>
        <span className="tag">{p.when}</span>
        <span className="tag">{p.directionOfBias}</span>
        <span className={p.bridgeExists ? 'tag' : 'tag tag-t5'}>
          {p.bridgeExists ? 'bridge exists' : 'no bridge'}
        </span>
        {p.affectsDomains.map((d) =>
          d === 'all' ? (
            <span key="all" className="tag">
              all domains
            </span>
          ) : (
            <Link key={d} className="tag" href={`/domains/${d}/`}>
              {DOMAIN_LABELS[d]}
            </Link>
          ),
        )}
      </p>

      <h2>What changed</h2>
      <p>{p.whatChanged}</p>

      <h2>Reconciliation</h2>
      <p className="prose-note">
        {p.bridgeExists
          ? (p.bridgeNote ?? 'A reconciliation exists; the note is outstanding.')
          : (p.bridgeNote ??
            'No accepted reconciliation exists across this break. Values on either side are not spliced, and no trend is fitted through it.')}
      </p>

      {p.competingAccounts && p.competingAccounts.length > 0 ? (
        <>
          <h2>Competing accounts</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Holder</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {p.competingAccounts.map((a) => (
                  <tr key={a.holder}>
                    <td>{a.holder}</td>
                    <td className="t-note">{a.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      <h2>Series carrying this dispute</h2>
      {affected.length === 0 ? (
        <p className="prose-note">No loaded series carries this record yet.</p>
      ) : (
        <div className="grid">
          {affected.map((s) => (
            <Link key={s.id} href={`/series/${s.id}/`}>
              <span className="label">
                {s.id} · tier {s.tier}
              </span>
              <span className="grid-title">{s.title}</span>
              <span className="grid-meta">
                {s.unit}
                {s.breaks?.some((b) => b.provenanceRef === p.id) ? ' · seam here' : ''}
              </span>
            </Link>
          ))}
        </div>
      )}

      {namedButAbsent.length > 0 ? (
        <p className="source-line">
          Also named in <code>affectsSeries</code> but not yet ingested:{' '}
          {namedButAbsent.join(', ')}. Research queue, not an error.
        </p>
      ) : null}

      {citedBy.length > 0 ? (
        <>
          <h2>Ledger records citing this dispute</h2>
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
        </>
      ) : null}

      <h2>Sources</h2>
      <SourceList sources={p.sources} />
      {p.notes ? <p className="prose-note">{p.notes}</p> : null}
    </>
  );
}
