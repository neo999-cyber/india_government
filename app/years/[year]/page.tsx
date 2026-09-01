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
import type { Domain } from '@/lib/types';

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
 * A reader has already learned that encoding on `/search/?layer=series`. Reusing it sliced — running, beginning,
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

  /**
   * §7 — THE ANNUAL STRIP AND THE TWO ABSENCE KINDS, derived here and not in the JSX.
   *
   * `indiaYears` is computed once per series and reused by all three: three passes over 269 series
   * inside a render is the kind of thing that becomes four passes on the next edit.
   */
  const indiaYears = new Map(
    series.map((sr) => [
      sr.id,
      sr.points
        .filter((p) => p.country === 'IND' && p.value !== null)
        .map((p) => yearOfPeriod(p.period)),
    ]),
  );
  const gapSeries = series
    .filter((sr) => {
      const ys = indiaYears.get(sr.id)!;
      return ys.length > 0 && !ys.includes(y) && y > Math.min(...ys) && y < Math.max(...ys);
    })
    .map((sr) => sr.id);
  // Stopped, not merely quiet: the last observation is before this year AND before the derived
  // publication frontier. Without the second test, 2026 would report 264 series as absent.
  const stoppedBy = series
    .filter((sr) => {
      const ys = indiaYears.get(sr.id)!;
      if (!ys.length) return false;
      const end = Math.max(...ys);
      return end < y && end < frontier;
    })
    .map((sr) => sr.id);

  const topicRows = (() => {
    const by = new Map<
      Domain,
      { domain: Domain; records: number; begins: string[]; ends: string[]; seams: [string, string][] }
    >();
    const at = (d: Domain) => {
      if (!by.has(d)) by.set(d, { domain: d, records: 0, begins: [], ends: [], seams: [] });
      return by.get(d)!;
    };
    for (const r of began) for (const d of r.domains ?? []) at(d).records += 1;
    for (const sr of series) {
      const ys = indiaYears.get(sr.id)!;
      if (!ys.length) continue;
      if (Math.min(...ys) === y) at(sr.domain).begins.push(sr.id);
      if (Math.max(...ys) === y) at(sr.domain).ends.push(sr.id);
      for (const b of sr.breaks ?? []) {
        if (yearOfPeriod(b.period) === y) at(sr.domain).seams.push([sr.id, b.provenanceRef]);
      }
    }
    // Alphabetical by label, deliberately: any order by size would be the magnitude encoding the
    // matrix measurement refused.
    return [...by.values()].sort((a, b) =>
      DOMAIN_LABELS[a.domain].localeCompare(DOMAIN_LABELS[b.domain]),
    );
  })();

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
      {/* TWO RAILS, TWO NAMES. The same year links repeat at the foot; both were named
          "Year", so a screen reader's landmark list offered two identical destinations with no
          way to tell which was which. */}
      <nav className="yr-rail" aria-label="Years, above">
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
          The same encoding as <Link href="/search/?layer=series">every series as a span</Link>, sliced here:{' '}
          {beginning} series begin in {y}, {ending} end in it, {running} run through it, and the rest
          recede without being removed.
        </p>
      </div>
      <SpanStrip rows={rows} x0={x0} x1={x1} frontier={frontier} atYear={y} />

      {/* ============================ §7 — THE COMMON ANNUAL STRIP ==============================

          THE SIMULTANEITY POINT, WHICH IS THE ONE THING THE YEAR PAGE COULD NOT SHOW. The spans
          above are the whole corpus at this year, ordered by span; the list below is this year's
          records, ordered by date. Neither says *a tax reform, a constitutional change in Kashmir,
          an employment movement and an education measurement break are parts of the same period*,
          because neither groups by topic.

          ============================ IT LISTS, IT DOES NOT COUNT, AND THE MATRIX IS WHY ========

          §5's matrix was measured before it was built and **refused**: a topic's event count
          correlates with its record count at **r = 0.967**, so the length of a topic's row is a
          picture of how much has been researched into it, not of what happened. That is the status
          grid's defect in another shape.

          **This is the one column of that matrix that survives, and it survives by not encoding
          magnitude.** No bar, no area, no colour intensity, no ordering by size — the topics are in
          alphabetical order and each carries the events themselves. A reader seeing eleven entries
          under Governance and one under Poverty is looking at a list, and the note says what that
          length is.

          ============================ WHY THE SERIES ARE CITED BY ID ============================

          The records beginning this year are listed below with their marks, and the series are on
          the span strip above. Naming either by title here would render the same declarations twice
          on one page. So this strip cites series by id — the corpus's citation idiom, 965 of them —
          and links the record count into the list below rather than repeating it. */}
      {topicRows.length > 0 ? (
        <>
          <div className="sec-h">
            <h2>All topics at {y}</h2>
            <p className="sec-note">
              What began, ended or changed basis in each topic in the same twelve months, in
              alphabetical order.{' '}
              <strong>
                The number of entries under a topic reflects how much of it has been researched, not
                how much happened in it
              </strong>{' '}
              — measured, the two move together almost exactly — so this is read one row at a time
              and never compared down the page.
            </p>
          </div>
          <div className="yrstrip">
            {topicRows.map((t) => (
              <div key={t.domain} className="yrstrip-r">
                <p className="yrstrip-k">
                  <Link href={`/domains/${t.domain}/`}>{DOMAIN_LABELS[t.domain]}</Link>
                </p>
                <div className="yrstrip-e">
                  {t.records > 0 ? (
                    <span className="yrstrip-i">
                      <span className="yrstrip-t">records begin</span>{' '}
                      <a href="#records-begin">
                        {t.records} {t.records === 1 ? 'record' : 'records'}
                      </a>
                    </span>
                  ) : null}
                  {t.begins.map((id) => (
                    <span key={`b${id}`} className="yrstrip-i">
                      <span className="yrstrip-t">first observation</span>{' '}
                      <Link className="mono" href={`/series/${id}/`}>
                        {id}
                      </Link>
                    </span>
                  ))}
                  {t.ends.map((id) => (
                    <span key={`e${id}`} className="yrstrip-i">
                      <span className="yrstrip-t">last observation</span>{' '}
                      <Link className="mono" href={`/series/${id}/`}>
                        {id}
                      </Link>
                    </span>
                  ))}
                  {t.seams.map(([id, ref]) => (
                    <span key={`s${id}${ref}`} className="yrstrip-i">
                      <span className="yrstrip-t">basis changes</span>{' '}
                      <Link className="mono" href={`/series/${id}/`}>
                        {id}
                      </Link>{' '}
                      <Link className="tag" href={`/provenance/${ref}/`}>
                        {ref}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {/* ============================ §7 — WHAT WAS NOT MEASURED THIS YEAR ======================

          THREE THINGS LOOK ALIKE HERE AND ONLY TWO ARE FINDINGS, which is why they are separated
          rather than summed. A series can miss a year because it has a HOLE — it observes either
          side and not this one — or because its run had already STOPPED, or because it had not
          begun. **The third is not a finding about the year**: an instrument that did not exist yet
          cannot have failed to measure, and pooling it would report 133 absences for 2014 and 264
          for 2026, which is a statement about when instruments start.

          **The stopped test uses the derived publication frontier and not the year itself.** A run
          that ends before 2026 has usually not stopped; its next figure is not out. Counting those
          as absences is the error `lib/spans.ts` was written to prevent, and it is repeated here by
          reference rather than re-derived. */}
      <div className="sec-h">
        <h2>What was not measured in {y}</h2>
        <p className="sec-note">
          Two different things, kept apart. Series that had not begun by {y} are not counted: an
          instrument that did not exist cannot have failed to measure.
        </p>
      </div>
      <div className="absence">
        <p>
          <strong>{gapSeries.length}</strong>{' '}
          {gapSeries.length === 1 ? 'series has' : 'series have'} a hole at {y} — observed before it
          and after it, and not in it.{' '}
          {gapSeries.length > 0 ? (
            <>
              {gapSeries.slice(0, 12).map((id, i) => (
                <span key={id}>
                  {i > 0 ? ' · ' : ''}
                  <Link className="mono" href={`/series/${id}/`}>
                    {id}
                  </Link>
                </span>
              ))}
              {gapSeries.length > 12 ? <> · and {gapSeries.length - 12} more</> : null}
            </>
          ) : null}
        </p>
        <p>
          <strong>{stoppedBy.length}</strong>{' '}
          {stoppedBy.length === 1 ? 'series had' : 'series had'} already stopped by {y} — the last
          observation falls before {y} and before the publication frontier of {frontier}, so this is
          a run that ended rather than one whose next figure is not out.
        </p>
      </div>

      <div className="sec-h" id="records-begin">
        <h2>The records that begin in {y}</h2>
        <p className="sec-note">
          {began.length} {began.length === 1 ? 'record' : 'records'}, in date order. Verdicts are the
          record&rsquo;s own and are not summed.
        </p>
      </div>
      <div className="table-wrap" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th scope="col">Record</th>
              <th scope="col">Verdict</th>
              <th scope="col">Areas</th>
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

      <nav className="yr-rail" aria-label="Years, below">
        {i > 0 ? <Link href={`/years/${YEARS[i - 1]}/`}>← {YEARS[i - 1]}</Link> : null}
        <Link href="/years/">all years</Link>
        {i < YEARS.length - 1 ? <Link href={`/years/${YEARS[i + 1]}/`}>{YEARS[i + 1]} →</Link> : null}
      </nav>
    </>
  );
}
