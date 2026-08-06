import Link from 'next/link';
import { assessmentCounts, ledger, provenance, series, statusCounts } from '@/lib/data';
import { ASSESSMENT_LABELS, DOMAIN_LABELS, TERM_SHORT } from '@/lib/format';
import { DOMAINS, TERMS } from '@/lib/types';
import { StatusKey, TallyGloss } from '@/components/marks';

export default function HomePage() {
  // Counted, never typed. It fell from 9 to 1 on 6 August 2026 and the paragraph reporting it
  // must move with the data rather than with whoever last edited the prose.
  const worked = ledger.filter((l) => l.assessment === 'worked').length;
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
      <p className="prose-note">
        <strong>
          {worked === 1 ? 'One record of' : `${worked} records of`} {ledger.length} says a measure
          worked, and that number is about the evidence rather than about the government.
        </strong>{' '}
        From 6 August 2026 a success verdict needs a source independent of the body that announced
        the measure, and a promise with several parts is not delivered while any part goes
        unmeasured. Where the Indian state is the only body that measures a thing — which, on most
        of these subjects, it is — raising that standard lowers the count of established successes
        whatever the policies actually did. So read this tally as a measure of how much of Indian
        policy is independently checked, and read it as a measure of the policy only where you can
        also see the independent evidence on the record.{' '}
        <Link href="/method/">How that standard works, and what it cannot separate</Link>.
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
      <TallyGloss />

      <h2>Domains</h2>
      <div className="grid">
        {DOMAINS.map((d) => {
          const s = series.filter((x) => x.domain === d).length;
          const rows = ledger.filter((x) => x.domains.includes(d));
          const l = rows.length;
          // The scored share, on the card. A grid that gave only how many records exist invited the
          // reading that a domain with few of them had been examined less — and the corpus's answer
          // is that a domain with few SCORED records contains few announced measures. The number is
          // here so the card carries the fact rather than the impression.
          const scored = rows.filter((x) =>
            ['worked', 'partly', 'failed', 'reversed'].includes(x.assessment),
          ).length;
          return (
            <Link key={d} href={`/domains/${d}/`}>
              <span className="grid-title">{DOMAIN_LABELS[d]}</span>
              <span className="grid-meta">
                {s} series · {l} ledger
                {l > 0 ? ` · ${scored} scored` : ''}
                {s + l === 0 ? ' · empty' : ''}
              </span>
            </Link>
          );
        })}
      </div>
      <p className="t-note">
        &ldquo;Scored&rdquo; counts the records reaching a verdict on an outcome. A domain with few
        of them contains few measures the state announced against a target — not less examination.{' '}
        <Link href="/method/">What the distribution measures</Link>.
      </p>
    </>
  );
}
