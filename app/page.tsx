import Link from 'next/link';
import { assessmentCounts, ledger, provenance, series, statusCounts } from '@/lib/data';
import { ASSESSMENT_LABELS, DOMAIN_LABELS, TERM_SHORT } from '@/lib/format';
import { DOMAINS, TERMS } from '@/lib/types';
import { StatusKey } from '@/components/marks';

export default function HomePage() {
  const status = statusCounts(series);
  const points = series.reduce((n, s) => n + s.points.length, 0);
  const breaks = series.reduce((n, s) => n + (s.breaks?.length ?? 0), 0);
  const domainsWithData = DOMAINS.filter(
    (d) => series.some((s) => s.domain === d) || ledger.some((l) => l.domains.includes(d)),
  );

  return (
    <>
      <h1>The instrument, as currently loaded</h1>
      <p className="lede">
        Three data layers govern everything rendered here: indicator series, a ledger of
        reforms and events, and provenance — the measurement disputes, which are first-class
        records rather than footnotes. Nothing renders that has not passed{' '}
        <code>npm run validate</code> first.
      </p>

      <h2>Loaded</h2>
      <ul className="counts">
        <li>
          <span className="figure">{series.length}</span>
          <span className="label">series</span>
        </li>
        <li>
          <span className="figure">{points}</span>
          <span className="label">observations</span>
        </li>
        <li>
          <span className="figure">{ledger.length}</span>
          <span className="label">ledger records</span>
        </li>
        <li>
          <span className="figure">{provenance.length}</span>
          <span className="label">disputes</span>
        </li>
        <li>
          <span className="figure">{breaks}</span>
          <span className="label">series breaks</span>
        </li>
        <li>
          <span className="figure">{domainsWithData.length}/{DOMAINS.length}</span>
          <span className="label">domains opened</span>
        </li>
      </ul>
      <StatusKey />
      <p className="prose-note">
        {status.verified} observations verified against a named source this cycle,{' '}
        {status.approx} approximate, {status.pending} pending. The open verification queue lives
        in <code>docs/verification-log.md</code>.
      </p>

      <h2>Terms</h2>
      <p className="prose-note">
        Records roll up to counts of assessments, never to a grade. The baseline term is carried
        for context and is not scored.
      </p>
      <div className="grid">
        {TERMS.map((term) => {
          const records = ledger.filter((l) => l.term === term);
          const counts = assessmentCounts(records);
          return (
            <Link key={term} href={`/terms/${term}/`}>
              <span className="label">{TERM_SHORT[term]}</span>
              <span className="grid-title">{records.length} records</span>
              <span className="grid-meta">
                {Object.entries(counts).length === 0
                  ? 'not yet opened'
                  : Object.entries(counts)
                      .map(([k, v]) => `${v} ${ASSESSMENT_LABELS[k as keyof typeof ASSESSMENT_LABELS] ?? k}`)
                      .join(' · ')}
              </span>
            </Link>
          );
        })}
      </div>

      <h2>Domains</h2>
      <div className="grid">
        {DOMAINS.map((d) => {
          const s = series.filter((x) => x.domain === d).length;
          const l = ledger.filter((x) => x.domains.includes(d)).length;
          return (
            <Link key={d} href={`/domains/${d}/`}>
              <span className="grid-title">{DOMAIN_LABELS[d]}</span>
              <span className="grid-meta">
                {s} series · {l} ledger
                {s + l === 0 ? ' · empty' : ''}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
