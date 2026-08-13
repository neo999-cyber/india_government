import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { assessmentCounts, ledgerInTerm } from '@/lib/data';
import { ASSESSMENT_LABELS, DOMAIN_LABELS, TERM_LABELS, formatDateRange } from '@/lib/format';
import { CaveatRow, RecordMarks, TallyGloss } from '@/components/marks';
import { TERMS, type Term } from '@/lib/types';
import { NextSteps } from '@/components/NextSteps';
import { stepsForTerm } from '@/lib/next-steps';

type Props = { params: Promise<{ term: string }> };

export function generateStaticParams() {
  return TERMS.map((term) => ({ term }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term } = await params;
  return { title: TERM_LABELS[term as Term] ?? 'Term' };
}

export default async function TermPage({ params }: Props) {
  const { term } = await params;
  if (!TERMS.includes(term as Term)) notFound();
  const t = term as Term;

  const records = ledgerInTerm(t);
  const counts = assessmentCounts(records);
  const domains = [...new Set(records.flatMap((r) => r.domains))].sort();

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/terms/">terms</Link> / {t}
      </p>
      <h1>{TERM_LABELS[t]}</h1>

      {t === 'baseline' ? (
        <p className="lede">
          The starting condition, frozen at May 2014. These records are context: they are never
          scored, and they exist so that later terms are read against a stated baseline rather
          than an implied one.
        </p>
      ) : null}
      {t === 'T3' ? (
        <p className="lede">
          Living term. Assessments here are provisional and many records will sit at
          &ldquo;too early&rdquo; by design.
        </p>
      ) : null}

      <h2>Assessments</h2>
      <ul className="counts">
        {Object.entries(counts).length === 0 ? (
          <li>
            <span className="figure">0</span>
            <span className="label">records</span>
          </li>
        ) : (
          Object.entries(counts).map(([k, v]) => (
            <li key={k}>
              <span className="figure">{v}</span>
              <span className="label">
                {ASSESSMENT_LABELS[k as keyof typeof ASSESSMENT_LABELS] ?? k}
              </span>
            </li>
          ))
        )}
      </ul>
      <p className="prose-note">
        Counts only. These never combine into a score for the term or for the government.
      </p>
<TallyGloss />

      {domains.length > 0 ? (
        <p className="tag-row">
          {domains.map((d) => (
            <Link key={d} className="tag" href={`/domains/${d}/`}>
              {DOMAIN_LABELS[d]}
            </Link>
          ))}
        </p>
      ) : null}

      <h2>Records</h2>
      {records.length === 0 ? (
        <div className="stub">
          <span className="label">Unopened term</span>
          No records researched into this term yet.
        </div>
      ) : (
        <div className="table-wrap" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Record</th>
                <th>Type</th>
                <th>Domains</th>
                <th>Assessment</th>
                <th>Conf.</th>
              </tr>
            </thead>
              {[...records]
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((r) => (
                  <tbody key={r.id}>
                    <tr>
                      <td className="mono">
                        <Link href={`/ledger/${r.id}/`}>{r.id}</Link>
                      </td>
                      <td className="mono t-note">{formatDateRange(r.date, r.dateEnd)}</td>
                      <td>
                        <Link href={`/ledger/${r.id}/`}>{r.title}</Link>
                        <RecordMarks record={r} deferCaveat />
                      </td>
                      <td className="t-note">{r.type}</td>
                      <td className="t-note">{r.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}</td>
                      <td className="t-note">{ASSESSMENT_LABELS[r.assessment]}</td>
                      <td className="mono t-note">{r.confidence}</td>
                    </tr>
                    <CaveatRow record={r} colSpan={8} />
                  </tbody>
                ))}
          </table>
        </div>
      )}

      {/* The adjoining terms and the year cross-sections — a term page ended on its last table row
          with no route on. Surfaces, not records: no marks and no listing rows. */}
      <NextSteps
        steps={stepsForTerm(
          t,
          (Object.keys(TERM_LABELS) as Term[]).map((x) => ({ term: x, label: TERM_LABELS[x] })),
        )}
      />
    </>
  );
}
