import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ledger, series } from '@/lib/data';
import { spanRows, spanAxis, spanFrontier } from '@/lib/spans';
import { YEAR_NOTES } from '@/lib/year-copy';
import { SpanStrip } from '@/components/SpanStrip';
import { RecordMarks } from '@/components/marks';
import { ASSESSMENT_LABELS, DOMAIN_LABELS } from '@/lib/format';
import { YEARS } from '@/lib/years';

/**
 * A YEAR PAGE — a cross-section of the record at one year, and NOT an annual scorecard.
 *
 * ============================ WHAT THE FOUR QUADRANTS ARE =====================================
 *
 * Four counts, and they are four different KINDS of fact rather than four scores: what was
 * announced, what was measured, what changed basis, what was happening. **No year carries a total,
 * because adding them would assert they are commensurable and they are not.** There is no ranking
 * of years and no year is better than another.
 *
 * **They were shown to move independently before this page was built** — Spearman ρ between every
 * pair is at most 0.61 across the thirteen years, and that one pair shares a denominator by
 * construction. A quadrant restating another quadrant would not be a second kind of fact.
 *
 * ============================ THE ONE THING A READER WILL GET WRONG ===========================
 *
 * **RECORDS BEGINNING IN A YEAR ARE NOT RECORDS ABOUT THAT YEAR.** A record's date is when the
 * thing it describes begins, so a 2015 record may be entirely about what happened by 2024. The page
 * says this where the count is, not in a footnote — and 2014 says more, because 14 of its 33 are
 * dated to the term boundary rather than to an event.
 *
 * ============================ WHY THE VISUAL IS THE SPAN STRIP ================================
 *
 * A reader has already learned that encoding on `/series/`. Reusing it sliced — running, beginning,
 * ending, receding — makes this page legible on arrival instead of carrying a second key. The rows
 * that do not touch the year recede and are not removed, because the shape of the whole is what
 * makes one year's slice mean anything.
 */

export const dynamicParams = false;
const yearOfPeriod = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

export function generateStaticParams() {
  return YEARS.map((y) => ({ year: String(y) }));
}

type Props = { params: Promise<{ year: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `${year} — the record at one year`,
    description: `What was announced, what was measured, what changed basis and what was happening, in ${year}. A cross-section of this instrument's record, not an annual scorecard.`,
  };
}

export default async function YearPage({ params }: Props) {
  const { year } = await params;
  const y = Number(year);
  if (!YEARS.includes(y)) notFound();

  const note = YEAR_NOTES[y];
  const began = ledger
    .filter((r) => Number(String(r.date).slice(0, 4)) === y)
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const obs = series.flatMap((s) =>
    s.points.filter((p) => p.country === 'IND' && p.value !== null && yearOfPeriod(p.period) === y),
  ).length;
  const seams = series.flatMap((s) => (s.breaks ?? []).filter((b) => yearOfPeriod(b.period) === y));
  const exposed = began.filter((r) => (r.shockExposure ?? []).length > 0);
  const termDated = y === 2014 ? began.filter((r) => String(r.date).slice(0, 7) === '2014-05').length : 0;

  const rows = spanRows();
  const { x0, x1 } = spanAxis(rows);
  const frontier = spanFrontier(rows);
  const running = rows.filter((r) => r.start < y && r.end > y).length;
  const beginning = rows.filter((r) => r.start === y).length;
  const ending = rows.filter((r) => r.end === y).length;

  const i = YEARS.indexOf(y);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/years/">years</Link> / {y}
      </p>
      <h1 className="page-lead">{y}</h1>
      <p className="standfirst">{note.body}</p>
      <p className="per-from mono">
        {note.from.map((id, k) => (
          <span key={id}>
            {k > 0 ? ' · ' : ''}
            <Link href={`/ledger/${id}/`}>{id}</Link>
          </span>
        ))}
      </p>

      {/* EVERY YEAR IS A URL. Links rather than a slider: a state a reader cannot paste is a state
          this instrument does not consider to exist, and the year control is the spine of these
          pages rather than one page's widget. */}
      <nav className="yr-rail" aria-label="Year">
        {YEARS.map((yy) =>
          yy === y ? (
            <span key={yy} aria-current="page">
              {yy}
            </span>
          ) : (
            <Link key={yy} href={`/years/${yy}/`}>
              {yy}
            </Link>
          ),
        )}
      </nav>

      <div className="yr-quads">
        <div className="yr-quad">
          <span className="n mono">{began.length}</span>
          <span className="k">records begin</span>
          <p className="d">
            What was announced, enacted or entered as beginning here.{' '}
            <strong>A record beginning in {y} is not a record about {y}</strong> — its date is when
            the thing it describes starts, and the finding may rest on evidence from years later.
            {termDated > 0 ? (
              <>
                {' '}
                <strong>{termDated} of these are dated to May {y}</strong>, the start of the term,
                which is a boundary marker rather than {termDated} things happening in one month.
              </>
            ) : null}
          </p>
        </div>
        <div className="yr-quad">
          <span className="n mono">{obs}</span>
          <span className="k">observations published</span>
          <p className="d">
            India observations across every series whose period falls in {y}. A count of what the
            record holds for the year, not of what was measured in it — publishing catches up with
            years already past.
          </p>
        </div>
        <div className="yr-quad">
          <span className="n mono">{seams.length}</span>
          <span className="k">
            {seams.length === 1 ? 'declared change of basis' : 'declared changes of basis'}
          </span>
          <p className="d">
            Seams falling in {y}. Figures either side of one are not the same measurement, and no
            line is drawn across it. A high count is a year in which definitions moved, which is
            independent of whether much happened.
          </p>
        </div>
        <div className="yr-quad">
          <span className="n mono">{exposed.length}</span>
          <span className="k">
            {exposed.length === 1 ? 'record declares an exposure' : 'records declare an exposure'}
          </span>
          <p className="d">
            Of the records beginning here, those naming an exogenous event bearing on them.{' '}
            <strong>This shares its denominator with the first quadrant</strong> and is the one pair
            of the four that does; the others are independent of each other.
          </p>
        </div>
      </div>

      <div className="sec-h">
        <h2>The corpus, read at {y}</h2>
        <p className="sec-note">
          The same encoding as <Link href="/series/">every series as a span</Link>, sliced here:{' '}
          {beginning} series begin in {y}, {ending} end in it, {running} run through it, and the rest
          recede without being removed.
        </p>
      </div>
      <SpanStrip rows={rows} x0={x0} x1={x1} frontier={frontier} atYear={y} />

      <div className="sec-h">
        <h2>The records that begin in {y}</h2>
        <p className="sec-note">
          {began.length} {began.length === 1 ? 'record' : 'records'}, in date order. Verdicts are the
          record&rsquo;s own and are not summed.
        </p>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Record</th>
              <th>Verdict</th>
              <th>Areas</th>
            </tr>
          </thead>
          {began.map((r) => (
            <tbody key={r.id}>
              <tr>
                <td>
                  <Link href={`/ledger/${r.id}/`}>{r.title}</Link>
                  <br />
                  <span className="t-note mono">{r.id}</span>
                  <RecordMarks record={r} />
                </td>
                <td className="t-note">{ASSESSMENT_LABELS[r.assessment]}</td>
                <td className="t-note">{r.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <nav className="yr-rail" aria-label="Year">
        {i > 0 ? <Link href={`/years/${YEARS[i - 1]}/`}>← {YEARS[i - 1]}</Link> : null}
        <Link href="/years/">all years</Link>
        {i < YEARS.length - 1 ? <Link href={`/years/${YEARS[i + 1]}/`}>{YEARS[i + 1]} →</Link> : null}
      </nav>
    </>
  );
}
