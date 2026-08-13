import Link from 'next/link';
import type { Metadata } from 'next';
import { assessmentCounts, ledger } from '@/lib/data';
import { ASSESSMENT_LABELS, DOMAIN_LABELS, TERM_SHORT, formatDateRange } from '@/lib/format';
import { CaveatRow, RecordMarks, TallyGloss } from '@/components/marks';
import { ListingFacets } from '@/components/ListingFacets';

export const metadata: Metadata = { title: 'Ledger' };

/**
 * Facet options are derived from the records in the table, never from the enum.
 *
 * Two reasons, and the second is the one that matters. A control offering a value no row carries
 * is a control that returns nothing and tells the reader nothing about why — the filter equivalent
 * of a lens over zero records, which `lens-empty` already refuses. And deriving them here means
 * this page declares no second copy of an enum: the values come from `/data` and the words come
 * from the label maps `enum-parity` already binds, so a new member cannot arrive here unlabelled.
 */
function opts<T extends string>(values: T[], label: (v: T) => string) {
  return [...new Set(values)].sort().map((v) => ({ value: v, label: label(v) }));
}

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
<TallyGloss />

      {/* The facets filter the rows below rather than replacing them: every record stays in the
          built HTML, so rule 4b's declarations and rule 3a's caveats are present whether or not a
          filter is applied and whether or not JavaScript runs. See the component header. */}
      <ListingFacets
        target="ledger-table"
        noun="records"
        initialTotal={ordered.length}
        facets={[
          { key: 'term', label: 'Term', options: opts(ordered.map((l) => l.term), (t) => TERM_SHORT[t]) },
          { key: 'domain', label: 'Area', options: opts(ordered.flatMap((l) => l.domains), (d) => DOMAIN_LABELS[d]) },
          { key: 'assessment', label: 'Assessment', options: opts(ordered.map((l) => l.assessment), (a) => ASSESSMENT_LABELS[a]) },
          { key: 'type', label: 'Type', options: opts(ordered.map((l) => l.type), (t) => t) },
        ]}
      />

      <div className="table-wrap">
        <table id="ledger-table">
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
            {ordered.map((l) => (
              <tbody
                key={l.id}
                data-row
                data-f-term={l.term}
                data-f-domain={l.domains.join('|')}
                data-f-assessment={l.assessment}
                data-f-type={l.type}
                data-text={`${l.id} ${l.title} ${l.summary}`}
              >
                <tr>
                  <td className="mono">
                    <Link href={`/ledger/${l.id}/`}>{l.id}</Link>
                  </td>
                  <td className="mono t-note">{formatDateRange(l.date, l.dateEnd)}</td>
                  <td className="mono">{TERM_SHORT[l.term]}</td>
                  <td>
                    <Link href={`/ledger/${l.id}/`}>{l.title}</Link>
                    <RecordMarks record={l} deferCaveat />
                  </td>
                  <td className="t-note">{l.type}</td>
                  <td className="t-note">{l.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}</td>
                  <td className="t-note">{ASSESSMENT_LABELS[l.assessment]}</td>
                  <td className="mono t-note">{l.confidence}</td>
                </tr>
                <CaveatRow record={l} colSpan={9} />
              </tbody>
            ))}
        </table>
      </div>

      <p className="prose-note">
        {/* The scaffold this replaces read: "Filtering by term, domain and assessment lands with
            the ledger view proper." It has landed; the note is withdrawn and quoted here so the
            change is checkable rather than silent. The second sentence of it was never a scaffold
            and still binds, so it is kept. */}
        <span className="label">On the counts above</span>{' '}They are counts of assessments. They are
        never combined into a score, and no filter combination produces one.
      </p>
    </>
  );
}
