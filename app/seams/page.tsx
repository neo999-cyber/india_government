import Link from 'next/link';
import type { Metadata } from 'next';
import { RecordMarks } from '@/components/marks';
import { DOMAIN_LABELS } from '@/lib/format';
import { seamSeries, seamSubjects, seamYears, seams } from '@/lib/seams';

export const metadata: Metadata = {
  title: 'Where the instruments changed — every break in the record',
  description:
    'Every break in the archive on one axis: the years a published figure stopped being comparable with the one before it, and the reason each series gives.',
};

/**
 * WHERE THE INSTRUMENTS CHANGED.
 *
 * ============================ WHAT THIS PAGE SAYS ============================================
 *
 * Not what India did — what became knowable, and when a figure stopped being comparable with the
 * one before it. Every mark is one series changing basis, definition, coverage or collection, read
 * off that series' own `breaks[]`. Nothing is derived and nothing is smoothed across.
 *
 * ============================ WHY IT NEEDS NO JAVASCRIPT =====================================
 *
 * The grid's cells are ANCHORS into the chronology below, so the page works with the bundle dead,
 * every cell is addressable, and a reader can send someone "education, 2020". A hover panel would
 * have been the obvious build and would have been worse on all three counts.
 *
 * ============================ AND WHY IT LISTS RATHER THAN COUNTS ============================
 *
 * The Atlas board and the landing brief both COUNT AND LINK, because listing there would drag every
 * caveat onto a surface that exists to be light. Here the listing IS the page: 182 seams, each with
 * the note its series carries, its marks beside it, measured at 53 KB of notes and 28 KB of caveats.
 * A page about breaks that would not show you the breaks would be pointless.
 */
export default function Seams() {
  const all = seams();
  const years = seamYears(all);
  const subjects = seamSubjects(all);
  const byCell = new Map<string, number>();
  const byYear = new Map<number, number>();
  for (const s of all) {
    byCell.set(`${s.domain}|${s.year}`, (byCell.get(`${s.domain}|${s.year}`) ?? 0) + 1);
    byYear.set(s.year, (byYear.get(s.year) ?? 0) + 1);
  }
  const peak = Math.max(...byYear.values());
  const seriesCount = new Set(all.map((s) => s.seriesId)).size;
  const chronology = years.filter((y) => byYear.has(y));

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / where the instruments changed
      </p>
      <h1 className="page-lead">Where the instruments changed</h1>
      <p className="lede">
        Every break in the archive on one axis. <strong>Not what India did</strong> — what became
        knowable, and when a published figure stopped being comparable with the one before it.
      </p>
      <p className="prose-note">
        <strong>{all.length} breaks, across {seriesCount} series and {subjects.length} subjects.</strong>{' '}
        Each is one series changing basis, definition, coverage or collection: a base year moved, a
        definition narrowed, a collection system replaced. Every one is read off that series&rsquo; own
        record, and rule 2 has always refused to read a change across one.
      </p>
      <p className="prose-note">
        <strong>This is a claim about Indian statistical practice, not about this archive.</strong>{' '}
        The decisions below were taken by MoSPI, ASER, the RBI, the NCRB and the ministries; the
        corpus is the evidence for them, not the subject of them. Subjects with no break do not
        appear, and that is a fact about their series rather than about the subjects.
      </p>

      <div className="seam-plate" data-scroll-x="" tabIndex={0}>
        <table className="seam-grid">
          <caption className="sr-only">
            Breaks by subject and year. Each figure is the number of series changing basis in that
            subject and year; the row above the subjects is the total across all of them.
          </caption>
          <thead>
            <tr>
              <th scope="col">Subject</th>
              {years.map((y) => (
                <th key={y} scope="col">{y % 10 === 0 || y === years[0] ? y : String(y).slice(2)}</th>
              ))}
            </tr>
            <tr className="seam-totals">
              <th scope="row">all subjects</th>
              {years.map((y) => {
                const n = byYear.get(y) ?? 0;
                return (
                  <td key={y}>
                    {n ? (
                      <>
                        <span className="seam-bar" style={{ height: `${Math.round(6 + 20 * (n / peak))}px` }} />
                        <span className="seam-n mono">{n}</span>
                      </>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {subjects.map((d) => (
              <tr key={d}>
                <th scope="row">{DOMAIN_LABELS[d]}</th>
                {years.map((y) => {
                  const n = byCell.get(`${d}|${y}`) ?? 0;
                  if (!n) return <td key={y} />;
                  return (
                    <td key={y}>
                      <Link className="seam-cell" href={`#${d}-${y}`}
                            aria-label={`${DOMAIN_LABELS[d]}, ${y}: ${n} break${n === 1 ? '' : 's'}`}>
                        {Array.from({ length: Math.min(n, 4) }, (_, i) => (
                          <span key={i} className="seam-stop" aria-hidden="true" />
                        ))}
                        {n > 4 ? <span className="seam-more mono" aria-hidden="true">+{n - 4}</span> : null}
                      </Link>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="seam-legend mono">
        <span><i className="seam-key-stop" aria-hidden="true" /> one break</span>{' '}
        <span>brass bar &mdash; breaks that year across all subjects</span>{' '}
        <span>a cell leads to that subject and year below</span>
      </p>

      <h2>The chronology</h2>
      <p className="prose-note">
        In the order the breaks fall. Each carries the note its series states, and the series&rsquo; own
        marks beside it &mdash; a caveat or a declared absence travels with the record wherever it
        appears.
      </p>
      {chronology.map((y) => (
        <section key={y} className="seam-year" aria-labelledby={`year-${y}`}>
          <h3 id={`year-${y}`} className="seam-year-h">
            {y} <span className="mono">{byYear.get(y)} break{byYear.get(y) === 1 ? '' : 's'}</span>
          </h3>
          {subjects
            .filter((d) => byCell.has(`${d}|${y}`))
            .map((d) => (
              <div key={d} className="seam-sub" id={`${d}-${y}`}>
                <h4 className="seam-sub-h mono">{DOMAIN_LABELS[d]}</h4>
                {all
                  .filter((s) => s.domain === d && s.year === y)
                  .map((s) => (
                    <article key={`${s.seriesId}-${s.period}`} className="seam-rec">
                      <p className="seam-t">
                        <Link href={`/series/${s.seriesId}/`}>{s.title}</Link>{' '}
                        <span className="seam-p mono">breaks at {s.period}</span>
                      </p>
                      {s.note ? <p className="seam-note">{s.note}</p> : (
                        <p className="absence seam-note">
                          This break is recorded without a stated reason. The seam still holds &mdash;
                          the figures either side are not comparable &mdash; but why they are not is
                          not on the record here.
                        </p>
                      )}
                      <RecordMarks record={seamSeries(s.seriesId)} />
                    </article>
                  ))}
              </div>
            ))}
        </section>
      ))}
    </>
  );
}
