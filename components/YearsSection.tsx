import Link from '@/components/Link';
import { ledger, series } from '@/lib/data';
import { YEAR_NOTES } from '@/lib/year-copy';
import { YEARS } from '@/lib/years';

/**
 * THE YEAR INDEX — thirteen cards in calendar order, and nothing is sorted or ranked.
 *
 * The four counts are shown per year because the variation between years IS the reason these pages
 * exist, and a reader should be able to see it before choosing one. **No year carries a total and
 * no year is ranked against another.**
 */
const yearOfPeriod = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

export function YearsSection() {
  const rows = YEARS.map((y) => ({
    y,
    began: ledger.filter((r) => Number(String(r.date).slice(0, 4)) === y).length,
    obs: series.flatMap((s) =>
      s.points.filter((p) => p.country === 'IND' && p.value !== null && yearOfPeriod(p.period) === y),
    ).length,
    seams: series.flatMap((s) => (s.breaks ?? []).filter((b) => yearOfPeriod(b.period) === y)).length,
    exposed: ledger.filter(
      (r) => (r.shockExposure ?? []).length > 0 && Number(String(r.date).slice(0, 4)) === y,
    ).length,
  }));

  return (
    <>
      <h2 id="years">The record, one year at a time</h2>
      <p className="standfirst">
        Thirteen cross-sections, 2014 to 2026. Each shows four counts — what was announced, what was
        measured, what changed basis, and what was happening — and they are four different kinds of
        fact rather than four scores.{' '}
        <strong>No year carries a total, and no year is ranked against another.</strong>
      </p>
      <p className="prose-note">
        <span className="label">Why these pages exist</span> The four counts were measured across the
        thirteen years before anything was built, because thirteen templates with different numbers
        would not have been worth making. They vary — records beginning run 9 to 33, observations 5
        to 148, seams 3 to 25, exposures 0 to 22 — and they vary independently of one another, so no
        quadrant is another quadrant restated.{' '}
        <strong>
          The one expectation the measurement refused: 2020 does not show measurement thinning.
        </strong>{' '}
        A third of the series running through it published nothing that year, which is what 2019 and
        2021 also show. What 2020 shows is change.
      </p>

      <div className="table-wrap" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Records begin</th>
              <th scope="col">Observations</th>
              <th scope="col">Basis changes</th>
              <th scope="col">Declare an exposure</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.y}>
                <td>
                  <Link href={`/years/${r.y}/`}>{r.y}</Link>
                </td>
                <td className="mono">{r.began}</td>
                <td className="mono">{r.obs}</td>
                <td className="mono">{r.seams}</td>
                <td className="mono">{r.exposed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sec-h">
        <h3 id="what-each-year-is">What each year is</h3>
      </div>
      {YEARS.map((y) => (
        <div key={y} className="per">
          <span className="per-yrs mono">{y}</span>
          <div>
            <p>{YEAR_NOTES[y].body}</p>
            <p className="per-from mono">
              {YEAR_NOTES[y].from.map((id, k) => (
                <span key={id}>
                  {k > 0 ? ' · ' : ''}
                  <Link href={`/ledger/${id}/`}>{id}</Link>
                </span>
              ))}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
