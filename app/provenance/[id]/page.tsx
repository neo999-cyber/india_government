import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { provenanceCard } from '@/lib/share-card';
import {
  getProvenance,
  ledgerCitingProvenance,
  pairsHostedOn,
  provenance as allProvenance,
  seriesCitingProvenance,
} from '@/lib/data';
import { DIRECTION_OF_BIAS_LABELS, DOMAIN_LABELS, TERM_SHORT } from '@/lib/format';
import { lastTouched } from '@/lib/history';
import { RecordHistory } from '@/components/RecordHistory';
import { ProvenanceLd } from '@/components/StructuredData';
import { roleInProvenance } from '@/lib/rules';
import { storiesRestingOn } from '@/lib/stories';
import { RecordMarks, SourceList } from '@/components/marks';
import { PairSection } from '@/components/PairSection';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return allProvenance.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = getProvenance(id);
  return p ? provenanceCard(p) : { title: 'Provenance record' };
}

export default async function ProvenanceDetail({ params }: Props) {
  const { id } = await params;
  const p = getProvenance(id);
  if (!p) notFound();

  const carrying = seriesCitingProvenance(p.id);
  const corrective = carrying.filter((s) => roleInProvenance(s.id, p) === 'corrective');
  const distorted = carrying.filter((s) => roleInProvenance(s.id, p) !== 'corrective');
  const namedButAbsent = [...(p.affectsSeries ?? []), ...(p.correctiveSeries ?? [])].filter(
    (sid) => !carrying.some((s) => s.id === sid),
  );
  const citedBy = ledgerCitingProvenance(p.id);
  const hostedPairs = pairsHostedOn(`/provenance/${p.id}/`);

  return (
    <>
      <ProvenanceLd record={p} modified={lastTouched(p.id)} />
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/search/?layer=provenance">provenance</Link> / {p.id}
      </p>
      <h1>{p.title}</h1>
      <p className="tag-row">
        <span className="tag">{p.id}</span>
        <span className="tag">{p.when}</span>
        <span className="tag">{DIRECTION_OF_BIAS_LABELS[p.directionOfBias] ?? p.directionOfBias}</span>
        <span className={p.bridgeExists ? 'tag' : 'tag tag-t5'}>
          {p.bridgeExists ? 'bridge exists' : 'no bridge'}
        </span>
        {p.affectsDomains.map((d) =>
          d === 'all' ? (
            <span key="all" className="tag">
              all topics
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
          <div className="table-wrap" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Holder</th>
                  <th scope="col">Position</th>
                </tr>
              </thead>
              <tbody>
                {p.competingAccounts.map((a, i) =>
                  typeof a === 'string' ? (
                    // The account names its own holder inside the sentence. Rendered across
                    // both columns rather than split by guesswork.
                    <tr key={`acc-${i}`}>
                      <td className="t-note" colSpan={2}>
                        {a}
                      </td>
                    </tr>
                  ) : (
                    <tr key={a.holder}>
                      <td>{a.holder}</td>
                      <td className="t-note">{a.position}</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {/* Split, because the two groups mean opposite things. Listed together, a reader has
          no way to tell which series this record distorts from which one exists to correct
          for it — and on P-30 that is the entire finding. */}
      <h2>Series this record distorts</h2>
      {distorted.length === 0 ? (
        <p className="prose-note">
          {corrective.length > 0
            ? 'No loaded series is named as distorted by this record.'
            : 'No loaded series carries this record yet.'}
        </p>
      ) : (
        <div className="grid">
          {distorted.map((s) => (
            <Link key={s.id} href={`/series/${s.id}/`}>
              <span className="label">
                {s.id} · tier {s.tier}
              </span>
              <span className="grid-title">{s.title}</span>
              <span className="grid-meta">
                {s.unit}
                {s.breaks?.some((b) => b.provenanceRef === p.id) ? ' · seam here' : ''}
              </span>
              <RecordMarks record={s} linkify={false} />
            </Link>
          ))}
        </div>
      )}

      {corrective.length > 0 ? (
        <>
          <h2>Series that correct for it</h2>
          <p className="prose-note">
            These carry this record for navigation, not because it distorts them.{' '}
            <span className="mono">{p.directionOfBias}</span> describes what the record does to
            the series above; it does not apply here. A reader who arrives at one of these has
            reached the honest measure, and this record says why it is the honest one.
          </p>
          <div className="grid">
            {corrective.map((s) => (
            <Link key={s.id} href={`/series/${s.id}/`}>
              <span className="label">
                {s.id} · tier {s.tier}
              </span>
              <span className="grid-title">{s.title}</span>
              <span className="grid-meta">
                {s.unit}
                {s.breaks?.some((b) => b.provenanceRef === p.id) ? ' · seam here' : ''}
              </span>
              <RecordMarks record={s} linkify={false} />
            </Link>
            ))}
          </div>
        </>
      ) : null}

      {namedButAbsent.length > 0 ? (
        <p className="source-line">
          Also named in <code>affectsSeries</code> or <code>correctiveSeries</code> but not yet
          ingested: {namedButAbsent.join(', ')}. Research queue, not an error.
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
                {/* Rule 3a names "cited-by grids" in terms, and this one rendered no caveat at
                    all while the series page's grid of the same records did. */}
                <RecordMarks record={l} linkify={false} />
              </Link>
            ))}
          </div>
        </>
      ) : null}

      {/* PAIRS THIS RECORD HOSTS, BECAUSE NO SERIES CAN.
          A pair renders on the page of a series it is a side of. Six pairs name no series on
          either side — a provenance record's competing accounts set against a declared absence on
          a ledger record — so no series page will ever host them, and until 2026-08-08 they
          rendered on no page at all: their framing, their gap reason and their notes reached
          nobody, while the domain listing carried the title alone. This record's competing
          accounts ARE one of the two sides, which makes this page the pair's own home rather
          than a place to put it. */}
      {hostedPairs.length > 0 ? (
        <>
          <h2>{hostedPairs.length === 1 ? 'The pair this record holds a side of' : 'Pairs this record holds a side of'}</h2>
          <p className="prose-note">
            Neither side of {hostedPairs.length === 1 ? 'this pair' : 'these pairs'} is a series, so
            there is no series page to carry {hostedPairs.length === 1 ? 'it' : 'them'}. The
            competing accounts recorded above stand as one side; the other is a declared absence.
          </p>
          {hostedPairs.map((pair) => (
            <PairSection key={pair.id} pair={pair} />
          ))}
        </>
      ) : null}

      {/* THE RETURN ROUTE, in the one place that has no next-steps block. `stepsForSeries` and
          `stepsForLedger` carry it for the other two layers; a provenance page has never had a
          next-steps surface, and 11 of the 29 records the four stories rest on are disputes. This
          is the smallest thing that closes the gap rather than a new section for its own sake. */}
      {storiesRestingOn(p.id).length > 0 ? (
        <>
          <h2>Read in a story</h2>
          <ul className="nsteps">
            {storiesRestingOn(p.id).map((st) => (
              <li key={st.slug}>
                <Link className="nstep-to" href={`/stories/${st.slug}/`}>
                  {st.title}
                </Link>
                <span className="nstep-why"> — a story on this site rests on this dispute</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2>Sources</h2>
      <SourceList sources={p.sources} />
      {p.notes ? <p className="prose-note">{p.notes}</p> : null}

      <RecordHistory id={p.id} />
    </>
  );
}
