'use client';
import Link from '@/components/Link';
import { ASSESSMENT_LABELS, formatValue, periodLabel } from '@/lib/format';
import type { LandscapeSubject, SubjectYear } from '@/lib/landscape';
import { leadMove, windowCell, type Window } from '@/lib/landscape-window';

/**
 * WHAT THE RECORD HOLDS FOR ONE SUBJECT ACROSS A WINDOW OF YEARS — and it COUNTS AND LINKS rather
 * than listing. Extracted from `RecordLandscape` 2026-09-02 so the topic page's timeline and the
 * landing picture read the same brief from the same arithmetic.
 *
 * ============================ WHY IT COUNTS AND DOES NOT LIST ================================
 *
 * A panel that named the records would be a LISTING SURFACE, and rules 3a and 4b would then
 * require every caveat and every declared absence to render inside it in full — 97 of the 212
 * dated records carry a caveat averaging 450 characters. So the brief states the SHAPE of the
 * window and hands the reader the surfaces that hold it: the year page, the subject page, the seam
 * grid and the declared-absence index.
 *
 * ============================ "THE RECORD HOLDS", NEVER "WHAT HAPPENED" =====================
 *
 * A thin window means nobody filed, not that nothing occurred; rule 5d is exactly the distinction
 * between a claim about the world and a claim about what the sources contain. An empty window
 * renders in the absence idiom for the same reason.
 *
 * ============================ THE LEAD ACROSS A WINDOW ======================================
 *
 * The one thing a window can say that a year cannot: where the subject's lead indicator stood at
 * either end. **Both values are printed and no verb is attached** — "moved from X to Y" states two
 * observations and leaves the reading to the reader; rose, fell, improved are all verdicts. And
 * where a seam of the lead falls inside the window the brief REFUSES the comparison and names the
 * year, because a sentence joining two bases is the line rule 2 forbids, in words.
 */
type Props = {
  window: Window | null;
  subject: LandscapeSubject | null;
  years: readonly number[];
  /** The archive's own per-year counts and per-series masks; needed only where `subject` is null. */
  archive?: readonly SubjectYear[];
  archiveMasks?: readonly number[];
};

const label = (k: string) => ASSESSMENT_LABELS[k as keyof typeof ASSESSMENT_LABELS]?.toLowerCase() ?? k;

export function YearBrief({ window: w, subject, years, archive, archiveMasks }: Props) {
  if (w === null)
    return (
      <p className="lsc-brief-idle">
        Move the year controls to read what the record holds for one year, or for a span of years
        {subject ? ` of ${subject.label.toLowerCase()}` : ''}.
      </p>
    );
  const span = w.to > w.from;
  const cell = subject
    ? windowCell(years, subject.years, subject.marks.slice(0, subject.series).map((m) => m.m), w)
    : windowCell(years, archive ?? [], archiveMasks ?? [], w);
  const name = subject ? subject.label : 'The archive';
  const empty = cell.reporting === 0 && cell.records === 0;
  const move = subject?.lead ? leadMove(subject.lead, w) : null;
  const seamHref = subject
    ? `/seams/#${subject.key}-${cell.seamYears[0] ?? w.from}`
    : `/seams/#year-${cell.seamYears[0] ?? w.from}`;
  return (
    <>
      <p className="lsc-brief-h">
        <strong>{name}</strong>{' '}
        <span className="mono">{span ? `${w.from} to ${w.to}` : `in ${w.from}`}</span>
      </p>
      {empty ? (
        <p className="absence lsc-brief-none">
          {/* "NOTHING IS FILED HERE" IS TRUE AND USELESS ON ITS OWN. Where the subject's series
              stopped is the fact a reader can actually do something with — Poverty's last official
              headcount was for 2011-12, before this control's floor, and that sentence says more
              about poverty measurement in India than any count on this panel. */}
          Nothing is filed {span ? 'inside this window' : 'here'}.{' '}
          {subject && subject.series === 0
            ? `No series measures ${name.toLowerCase()} at all, so no year of it can report.`
            : subject && subject.lastReported !== null
              ? `${name} carries ${subject.series} series and ${subject.observations} observations in all, the most recent for ${subject.lastReported} — open the subject to see which measure that is.`
              : 'No series of this subject carries an observation dated here.'}{' '}
          That is a fact about this archive, not about the {span ? 'years' : 'year'}.
        </p>
      ) : (
        <>
          <p className="lsc-brief-n">
            <span>
              <b>{cell.reporting}</b>
              <i>series reported</i>
            </span>
            <span>
              <b>{cell.records}</b>
              <i>
                {cell.records === 1 ? 'filing dated' : 'filings dated'} {span ? 'inside' : 'here'}
              </i>
            </span>
          </p>
          {/* WHAT THE FILINGS ARE, not merely how many. Counts of assessments are the one roll-up
              the rules permit by name, and this stops there: no grade, no total, no order of
              severity — commonest first, which is a fact about the corpus. */}
          {cell.assessments.length ? (
            <p className="lsc-brief-k">
              {cell.assessments.map(([k, n], i) => (
                <span key={k}>
                  {i ? ' · ' : ''}
                  <b>{n}</b> {label(k)}
                </span>
              ))}
            </p>
          ) : null}
        </>
      )}
      {/* THE ONE THING NO COUNT CAN SAY. Where a series of this subject breaks inside the window,
          the figures either side are not comparable, and a reader reading the numbers above needs
          to know that before they read them. */}
      {cell.seams ? (
        <p className="lsc-brief-seam">
          <Link href={seamHref}>
            {/* A YEAR'S FIGURE COUNTS SERIES; A WINDOW'S COUNTS SERIES-YEARS, so the noun changes
                with the shape — a series breaking twice inside a window is two changes of basis,
                and "17 series break" would have been a count of something else. */}
            <strong>
              {span
                ? `${cell.seams} change${cell.seams === 1 ? '' : 's'} of basis inside this window (${cell.seamYears.join(', ')})`
                : `${cell.seams} series break${cell.seams === 1 ? 's' : ''} here`}
            </strong>{' '}
            — the figures either side are not comparable →
          </Link>
        </p>
      ) : null}
      {/* THE LEAD ACROSS THE WINDOW. Refused before it is read where its own instrument changed. */}
      {subject?.lead && move ? (
        move.kind === 'refused' ? (
          <p className="lsc-brief-seam lsc-brief-lead">
            <strong>Not comparable across this window</strong> — the instrument behind{' '}
            <em>{subject.lead.title}</em> changed in {move.seams.join(' and ')}.
          </p>
        ) : move.kind === 'moved' ? (
          <p className="lsc-brief-lead">
            <em>{subject.lead.title}</em>: <b className="mono">{formatValue(move.a[0])}</b> in{' '}
            {periodLabel(move.a[1], 'CY')} and <b className="mono">{formatValue(move.b[0])}</b> in{' '}
            {periodLabel(move.b[1], 'CY')}
            {subject.lead.unit ? <span className="mono"> · {subject.lead.unit.slice(0, 32)}</span> : null}
          </p>
        ) : move.kind === 'one' ? (
          <p className="lsc-brief-lead">
            <em>{subject.lead.title}</em>: <b className="mono">{formatValue(move.a[0])}</b> in{' '}
            {periodLabel(move.a[1], 'CY')}
            {span ? ', its one observation inside this window' : ''}
            {subject.lead.unit ? <span className="mono"> · {subject.lead.unit.slice(0, 32)}</span> : null}
          </p>
        ) : (
          <p className="lsc-brief-lead absence">
            <em>{subject.lead.title}</em> did not report {span ? 'inside this window' : 'in this year'}.
          </p>
        )
      ) : null}
      <p className="lsc-brief-go">
        {span ? (
          <>
            <Link href={`/years/${w.from}/`}>{w.from} in full →</Link>
            <Link href={`/years/${w.to}/`}>{w.to} in full →</Link>
          </>
        ) : (
          <Link href={`/years/${w.from}/`}>The {w.from} record in full →</Link>
        )}
        {subject ? <Link href={`/domains/${subject.key}/`}>{subject.label} in full →</Link> : null}
        {subject && subject.absences ? (
          <Link href="/unmeasured/">
            {subject.absences} declared absence{subject.absences === 1 ? '' : 's'} →
          </Link>
        ) : null}
      </p>
    </>
  );
}
