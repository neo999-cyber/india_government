import Link from 'next/link';
import type { Metadata } from 'next';
import { assessmentCounts, ledger } from '@/lib/data';
import { ASSESSMENT_LABELS, DOMAIN_LABELS, TERM_SHORT, formatDateRange } from '@/lib/format';
import { AbsenceCount, CaveatFlag, DifferentFactsMark } from '@/components/marks';

export const metadata: Metadata = { title: 'Ledger' };

export default function LedgerIndex() {
  const counts = assessmentCounts(ledger);
  const ordered = [...ledger].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / ledger
      </p>
      <h1>Ledger of reforms, events and episodes</h1>
      <p className="lede">
        {ledger.length} records. Each carries its own assessment, its sources with tiers, and —
        where scored — the strongest good-faith case on both sides.
      </p>
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
              <th>Type</th>
              <th>Domains</th>
              <th>Assessment</th>
              <th>Conf.</th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((l) => (
              <tr key={l.id}>
                <td className="mono">
                  <Link href={`/ledger/${l.id}/`}>{l.id}</Link>
                </td>
                <td className="mono t-note">{formatDateRange(l.date, l.dateEnd)}</td>
                <td className="mono">{TERM_SHORT[l.term]}</td>
                <td>
                  <Link href={`/ledger/${l.id}/`}>{l.title}</Link>
                  {l.caveat ? <CaveatFlag caveat={l.caveat} variant="inline" /> : null}
                  <AbsenceCount items={l.unmeasured} />
                  {l.differentFacts ? <DifferentFactsMark variant="inline" /> : null}
                </td>
                <td className="t-note">{l.type}</td>
                <td className="t-note">{l.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}</td>
                <td className="t-note">{ASSESSMENT_LABELS[l.assessment]}</td>
                <td className="mono t-note">{l.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stub">
        <span className="label">Scaffold</span>
        Filtering by term, domain and assessment lands with the ledger view proper. Counts here
        are counts of assessments — they are never combined into a score.
      </div>
    </>
  );
}
