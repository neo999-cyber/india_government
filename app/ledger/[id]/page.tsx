import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLedger, getProvenance, getSeries, ledger as allLedger } from '@/lib/data';
import { ASSESSMENT_LABELS, DOMAIN_LABELS, TERM_LABELS, TERM_SHORT, formatDateRange } from '@/lib/format';
import { CaveatFlag, SourceList } from '@/components/marks';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return allLedger.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const l = getLedger(id);
  return { title: l ? l.title : 'Ledger record' };
}

export default async function LedgerDetail({ params }: Props) {
  const { id } = await params;
  const l = getLedger(id);
  if (!l) notFound();

  const refSeries = (l.seriesRefs ?? []).map(getSeries).filter((s): s is NonNullable<typeof s> => !!s);
  const refDisputes = (l.provenanceRefs ?? [])
    .map(getProvenance)
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/ledger/">ledger</Link> /{' '}
        <Link href={`/terms/${l.term}/`}>{TERM_SHORT[l.term]}</Link>
      </p>
      <h1>{l.title}</h1>
      <p className="tag-row">
        <span className="tag">{l.id}</span>
        <span className="tag">{formatDateRange(l.date, l.dateEnd)}</span>
        <span className="tag">{l.type}</span>
        <span className="tag">{ASSESSMENT_LABELS[l.assessment]}</span>
        <span className="tag">confidence {l.confidence}</span>
        {l.domains.map((d) => (
          <Link key={d} className="tag" href={`/domains/${d}/`}>
            {DOMAIN_LABELS[d]}
          </Link>
        ))}
      </p>
      <p className="source-line">
        {TERM_LABELS[l.term]} · researched as of {l.asOf}
      </p>

      {/* The caveat sits above the summary, not below it: it qualifies the claim the
          summary makes, and a reader who stops after one paragraph must still have it. */}
      {l.caveat ? <CaveatFlag caveat={l.caveat} /> : null}

      <p>{l.summary}</p>

      <dl className="dl">
        {l.claimAtLaunch ? (
          <>
            <dt>Claim at launch</dt>
            <dd>{l.claimAtLaunch}</dd>
          </>
        ) : null}
        {l.whatHappened ? (
          <>
            <dt>What happened</dt>
            <dd>{l.whatHappened}</dd>
          </>
        ) : null}
        {l.caseFor ? (
          <>
            <dt>Case for</dt>
            <dd>{l.caseFor}</dd>
          </>
        ) : null}
        {l.caseAgainst ? (
          <>
            <dt>Case against</dt>
            <dd>{l.caseAgainst}</dd>
          </>
        ) : null}
        {l.shockExposure ? (
          <>
            <dt>Shock exposure</dt>
            <dd>{l.shockExposure}</dd>
          </>
        ) : null}
      </dl>

      {l.assessment === 'baseline-context' ? (
        <p className="prose-note">
          Carried as pre-2014 context. Baseline records are not scored: they exist so that
          post-2014 records are read against a stated starting condition rather than a blank page.
        </p>
      ) : null}

      <h2>Sources</h2>
      <SourceList sources={l.sources} />

      {refSeries.length > 0 ? (
        <>
          <h2>Series cited</h2>
          <div className="grid">
            {refSeries.map((s) => (
              <Link key={s.id} href={`/series/${s.id}/`}>
                <span className="label">
                  {s.id} · tier {s.tier}
                </span>
                <span className="grid-title">{s.title}</span>
                <span className="grid-meta">
                  {s.unit} · {s.points.length} points
                  {s.breaks?.length ? ` · ${s.breaks.length} break(s)` : ''}
                </span>
                {s.caveat ? <CaveatFlag caveat={s.caveat} variant="inline" linkify={false} /> : null}
              </Link>
            ))}
          </div>
        </>
      ) : null}

      {refDisputes.length > 0 ? (
        <>
          <h2>Measurement disputes bearing on this record</h2>
          <div className="grid">
            {refDisputes.map((p) => (
              <Link key={p.id} href={`/provenance/${p.id}/`}>
                <span className="label">{p.id}</span>
                <span className="grid-title">{p.title}</span>
                <span className="grid-meta">{p.directionOfBias}</span>
              </Link>
            ))}
          </div>
        </>
      ) : null}

      <div className="stub">
        <span className="label">Scaffold</span>
        Phase 0 renders the record as authored. Timeline placement, term comparison and
        shock-attribution views come later.
      </div>
    </>
  );
}
