import Link from 'next/link';
import type { Series } from '@/lib/types';
import { periodKey, periodLabel } from '@/lib/format';
import { Value } from './marks';

/**
 * Periods for which more than one regime reports a value.
 *
 * While no spliced back-series exists, these years genuinely have two valid figures and
 * the instrument must not choose between them (CLAUDE.md rule 5). Showing them adjacent is
 * the only honest rendering: a single number for FY2023-24 would be a claim the published
 * statistics do not support.
 */
/**
 * Column header for a regime. The base year is what distinguishes them, so it is what the
 * header says — "new base" stopped being unambiguous the moment a third arrived.
 */
function baseLabel(series: Series): string {
  const year = /(\d{4}-\d{2}) base/.exec(series.title)?.[1];
  return year ? `${year} base` : series.id;
}

export function RegimeOverlap({ regimes }: { regimes: Series[] }) {
  if (regimes.length < 2) return null;

  const periods = [...new Set(regimes.flatMap((s) => s.points.map((p) => p.period)))]
    .filter((period) => regimes.filter((s) => s.points.some((p) => p.period === period)).length > 1)
    .sort((a, b) => periodKey(a) - periodKey(b));

  if (periods.length === 0) return null;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Fiscal year</th>
            {regimes.map((s) => (
              <th key={s.id} className="num">
                {baseLabel(s)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {periods.map((period) => (
            <tr key={period}>
              <td className="mono">{periodLabel(period, regimes[0].calendar)}</td>
              {regimes.map((s) => {
                const point = s.points.find((p) => p.period === period);
                return (
                  <td key={s.id} className="num">
                    {point ? <Value point={point} /> : <span className="t-note">—</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="source-line">
        Both figures are official and current. Neither supersedes the other until MoSPI
        publishes the spliced back-series (
        <Link href="/provenance/P-10/">P-10</Link>). Blank cells are unreported, not zero.
      </p>
    </div>
  );
}
