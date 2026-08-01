import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  assessmentCounts,
  ledgerInDomain,
  provenanceInDomain,
  seriesInDomain,
  statusCounts,
} from '@/lib/data';
import { ASSESSMENT_LABELS, DOMAIN_LABELS, TERM_SHORT, formatDateRange } from '@/lib/format';
import { DOMAINS, type Domain } from '@/lib/types';
import { CaveatFlag, DifferentFactsMark, StatusKey, StatusTally, TierTag } from '@/components/marks';

type Props = { params: Promise<{ domain: string }> };

export function generateStaticParams() {
  return DOMAINS.map((domain) => ({ domain }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain } = await params;
  const label = DOMAIN_LABELS[domain as Domain];
  return { title: label ?? 'Domain' };
}

export default async function DomainPage({ params }: Props) {
  const { domain } = await params;
  if (!DOMAINS.includes(domain as Domain)) notFound();
  const d = domain as Domain;

  const s = seriesInDomain(d);
  const l = ledgerInDomain(d);
  const p = provenanceInDomain(d);
  const counts = assessmentCounts(l);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/domains/">domains</Link> / {d}
      </p>
      <h1>{DOMAIN_LABELS[d]}</h1>

      <ul className="counts">
        <li>
          <span className="figure">{s.length}</span>
          <span className="label">series</span>
        </li>
        <li>
          <span className="figure">{l.length}</span>
          <span className="label">ledger records</span>
        </li>
        <li>
          <span className="figure">{p.length}</span>
          <span className="label">disputes</span>
        </li>
      </ul>

      {s.length + l.length === 0 ? (
        <div className="stub">
          <span className="label">Unopened domain</span>
          No series and no ledger records have been researched into this domain yet. Nothing is
          inferred to fill the gap.
        </div>
      ) : null}

      <h2>Series</h2>
      {s.length === 0 ? (
        <p className="prose-note">No series loaded in this domain.</p>
      ) : (
        <>
          <StatusKey />
          <StatusTally counts={statusCounts(s)} />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Series</th>
                  <th>Unit</th>
                  <th>Cal.</th>
                  <th>Tier</th>
                  <th className="num">Points</th>
                  <th>Breaks</th>
                </tr>
              </thead>
              <tbody>
                {s.map((x) => (
                  <tr key={x.id}>
                    <td>
                      <Link href={`/series/${x.id}/`}>{x.title}</Link>
                      {x.caveat ? <CaveatFlag caveat={x.caveat} variant="inline" /> : null}
                    </td>
                    <td className="t-note">{x.unit}</td>
                    <td className="mono">{x.calendar}</td>
                    <td>
                      <TierTag tier={x.tier} />
                    </td>
                    <td className="num">{x.points.length}</td>
                    <td className="mono">
                      {x.breaks?.length ? (
                        <span style={{ color: 'var(--alert)' }}>{x.breaks.length}</span>
                      ) : (
                        <span className="t-note">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <h2>Ledger</h2>
      {l.length === 0 ? (
        <p className="prose-note">No ledger records in this domain.</p>
      ) : (
        <>
          <p className="status-key">
            {Object.entries(counts).map(([k, v]) => (
              <span key={k}>
                {v} {ASSESSMENT_LABELS[k as keyof typeof ASSESSMENT_LABELS] ?? k}
              </span>
            ))}
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Term</th>
                  <th>Record</th>
                  <th>Assessment</th>
                </tr>
              </thead>
              <tbody>
                {[...l]
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((x) => (
                    <tr key={x.id}>
                      <td className="mono">
                        <Link href={`/ledger/${x.id}/`}>{x.id}</Link>
                      </td>
                      <td className="mono t-note">{formatDateRange(x.date, x.dateEnd)}</td>
                      <td className="mono">{TERM_SHORT[x.term]}</td>
                      <td>
                        <Link href={`/ledger/${x.id}/`}>{x.title}</Link>
                        {x.caveat ? <CaveatFlag caveat={x.caveat} variant="inline" /> : null}
                        {x.differentFacts ? <DifferentFactsMark variant="inline" /> : null}
                      </td>
                      <td className="t-note">{ASSESSMENT_LABELS[x.assessment]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <h2>Measurement disputes</h2>
      {p.length === 0 ? (
        <p className="prose-note">No disputes recorded against this domain.</p>
      ) : (
        <div className="grid">
          {p.map((x) => (
            <Link key={x.id} href={`/provenance/${x.id}/`}>
              <span className="label">
                {x.id}
                {x.affectsDomains.includes('all') ? ' · all domains' : ''}
              </span>
              <span className="grid-title">{x.title}</span>
              <span className="grid-meta">
                {x.directionOfBias} · bridge {x.bridgeExists ? 'exists' : 'none'}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
