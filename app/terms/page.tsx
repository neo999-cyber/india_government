import Link from 'next/link';
import type { Metadata } from 'next';
import { TallyGloss } from '@/components/marks';
import { assessmentCounts, ledgerInTerm } from '@/lib/data';
import { ASSESSMENT_LABELS, TERM_LABELS } from '@/lib/format';
import { TERMS } from '@/lib/types';

export const metadata: Metadata = { title: 'Terms' };

export default function TermsIndex() {
  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / terms of government
      </p>
      <h1 className="page-lead">Terms</h1>
      <p className="lede">
        The baseline is frozen at May 2014 and carried as context, not scored. T3 is living:
        records in it are provisional by construction.
      </p>
      <div className="grid">
        {TERMS.map((term) => {
          const records = ledgerInTerm(term);
          const counts = assessmentCounts(records);
          return (
            <Link key={term} href={`/terms/${term}/`}>
              <span className="label">{term}</span>
              <span className="grid-title">{TERM_LABELS[term]}</span>
              <span className="grid-meta">
                {records.length} records
                {Object.keys(counts).length
                  ? ` · ${Object.entries(counts)
                      .map(([k, v]) => `${v} ${ASSESSMENT_LABELS[k as keyof typeof ASSESSMENT_LABELS] ?? k}`)
                      .join(' · ')}`
                  : ''}
              </span>
            </Link>
          );
        })}
      </div>
      <p className="prose-note">
        No term carries a grade. Roll-ups are counts of assessments and nothing else.
      </p>
                  ? ` ·<TallyGloss />
    </>
  );
}
