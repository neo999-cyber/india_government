import Link from 'next/link';
import type { Metadata } from 'next';
import { ledger, series, seriesUnderLens } from '@/lib/data';
import { DOMAIN_LABELS, formatDateRange } from '@/lib/format';
import { DOMAINS, LENSES } from '@/lib/types';
import type { Domain, Lens, Series } from '@/lib/types';
import { RecordMarks } from '@/components/marks';

export const metadata: Metadata = {
  title: 'Overview — the whole record, one view',
  description:
    'Every subject area against every year: where this record runs verified, where it runs approximate, where it holds nothing — and what happened, year by year.',
};

/**
 * THE OVERVIEW — the whole record in one view, for the reader who will not open a single record.
 *
 * WHAT THE MOCKS PROPOSED AND WHAT SURVIVES. The design research offered two shapes: a grid (one
 * cell per area-year, coloured by status) and lanes (one tick per observation). The grid survives
 * — it answers "what does the record hold, when" at a glance and works at phone width — and the
 * lanes' one-fact-per-mark honesty survives inside it: every cell is a computed, checkable
 * statement about this corpus's holdings, nothing more.
 *
 * FOUR THINGS THE MOCKS GOT WRONG, EACH FIXED HERE RATHER THAN COPIED:
 *
 * 1. **The headline asserted a property of India.** "What India counted, and what it didn't" /
 *    "how much of it India actually counted" — the §4c ruling exactly: this corpus's holdings are
 *    its own selection, so an empty cell is a fact about THIS RECORD, not about the Indian state's
 *    measurement of itself. Both phrasings are now in the forbidden list of
 *    `tools/evaluability-wording.mjs`.
 * 2. **The empty cell overclaimed.** The mock legend read "Nothing published for that year.
 *    Looked for; not there." That is an absence-of-publication claim, and rule 5d prices those: it
 *    needs a stated search, per quantity — not per area-year. The honest cell reads "no
 *    observation in this record for this year."
 * 3. **The Kashmir row would have been a fabrication.** Kashmir holds NO series as subject — its
 *    thirty series file under defence, governance and federalism and are read through the lens.
 *    A naive domain matrix draws Kashmir as an empty row, which asserts "nothing measured on
 *    Kashmir" — false, and the exact misreading the lens axis exists to prevent. Its row is
 *    computed through the lens and labelled as such; those series also appear under their subject
 *    rows, and the caption says so.
 * 4. **The data was invented**, including two domains this corpus does not have. Everything below
 *    is computed from `/data` at build time.
 *
 * THE BASELINE ZONE IS THE ONE PLACE THIS PAGE COULD LIBEL A GOVERNMENT BY ACCIDENT. Columns
 * before 2014 are thinner BECAUSE THIS INSTRUMENT'S BASELINE IS FROZEN AT MAY 2014 — pre-2014
 * material is held as context, not coverage. Without that sentence, thin UPA-era columns read as
 * "the previous government measured less," which would be this corpus's own selection presented
 * as a fact about the world. The zone is labelled in the header and explained in the caption.
 */

const Y0 = 2010;
const Y1 = 2026;
const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

type Cell = { total: number; verified: number; brk: boolean };

function rowFor(list: Series[]): Cell[] {
  const cells: Cell[] = [];
  for (let y = Y0; y <= Y1; y++) {
    const pts = list.flatMap((s) =>
      s.points.filter((p) => p.country === 'IND' && yearOf(p.period) === y),
    );
    const brk = list.some((s) => (s.breaks ?? []).some((b) => yearOf(b.period) === y));
    cells.push({ total: pts.length, verified: pts.filter((p) => p.status === 'verified').length, brk });
  }
  return cells;
}

function cellState(c: Cell): 'none' | 'verified' | 'mixed' {
  if (c.total === 0) return 'none';
  return c.verified === c.total ? 'verified' : 'mixed';
}

const CELL_TITLE = (label: string, y: number, c: Cell) =>
  c.total === 0
    ? `${label} · ${y}: no observation in this record for this year`
    : `${label} · ${y}: ${c.total} observation${c.total === 1 ? '' : 's'}, ${
        c.verified === c.total ? 'all verified' : `${c.verified} verified, ${c.total - c.verified} approximate or pending`
      }${c.brk ? ' · a declared basis change falls in this year' : ''}`;

export default function Overview() {
  const years = Array.from({ length: Y1 - Y0 + 1 }, (_, i) => Y0 + i);

  const rows = DOMAINS.map((d) => {
    const own = series.filter((s) => s.domain === d);
    // The lens rule (header note 3). Kashmir is the live case; the test is general so a future
    // lens-only domain inherits the treatment instead of the fabrication. The narrowing is the
    // same guard the domain page uses: only a domain value that is also a lens value may be asked
    // a lens question at all.
    const asLens = (LENSES as readonly string[]).includes(d) ? (d as unknown as Lens) : null;
    const viaLens = own.length === 0 && asLens ? seriesUnderLens(asLens) : [];
    const list = own.length > 0 ? own : viaLens;
    return {
      d: d as Domain,
      lens: own.length === 0 && viaLens.length > 0,
      nSeries: list.length,
      records: ledger.filter((l) => l.domains.includes(d)).length,
      cells: rowFor(list),
    };
  }).filter((r) => r.nSeries > 0 || r.records > 0);

  const early = series
    .flatMap((s) => s.points.filter((p) => p.country === 'IND'))
    .filter((p) => yearOf(p.period) < Y0).length;

  // What happened, year by year — the ledger, grouped by start year, complete and uncurated.
  // Choosing "the important ones" would be an editorial ranking the corpus refuses; the reader
  // gets every record or none.
  const byYear = new Map<number, typeof ledger>();
  for (const l of ledger) {
    const y = yearOf(l.date);
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(l);
  }
  const baselineRecords = [...byYear.entries()]
    .filter(([y]) => y < 2014)
    .flatMap(([, ls]) => ls)
    .sort((a, b) => a.date.localeCompare(b.date));
  const termYears = [...byYear.keys()].filter((y) => y >= 2014).sort((a, b) => a - b);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / overview
      </p>
      <h1 className="home-lead">The whole record, one view</h1>
      <p className="lede">
        Every subject area against every year since 2010: where this record runs verified, where it
        runs approximate, and where it holds nothing for a year — which is a fact about this record,
        stated as one. Below the grid, what happened: every record, year by year.
      </p>

      <div className="matrix-wrap">
        <table className="matrix">
          <thead>
            <tr>
              <th className="matrix-name">Area</th>
              {years.map((y) => (
                <th key={y} className={`matrix-year${y < 2014 ? ' matrix-base' : ''}`}>
                  {y % 2 === 0 ? String(y).slice(2) : ''}
                </th>
              ))}
            </tr>
            <tr aria-hidden="true">
              <th className="matrix-name"></th>
              <th className="matrix-zone matrix-base" colSpan={4}>
                baseline
              </th>
              <th className="matrix-zone" colSpan={years.length - 4}>
                the covered period · May 2014 onward
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.d}>
                <td className="matrix-name">
                  <Link href={`/domains/${r.d}/`}>{DOMAIN_LABELS[r.d]}</Link>
                  <span className="matrix-meta">
                    {r.lens ? `lens · ${r.nSeries} series` : `${r.nSeries} series`} · {r.records} records
                  </span>
                </td>
                {r.cells.map((c, i) => (
                  <td key={i} className={y_cls(c, years[i])}>
                    <span
                      className={`mcell mcell-${cellState(c)}${c.brk ? ' mcell-brk' : ''}`}
                      title={CELL_TITLE(DOMAIN_LABELS[r.d], years[i], c)}
                      aria-label={CELL_TITLE(DOMAIN_LABELS[r.d], years[i], c)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="matrix-legend">
        <span>
          <i className="mcell mcell-verified" /> every observation that year verified
        </span>
        <span>
          <i className="mcell mcell-mixed" /> observations held, some approximate or pending
        </span>
        <span>
          <i className="mcell mcell-none" /> no observation in this record for that year
        </span>
        <span>
          <i className="mcell mcell-verified mcell-brk" /> a declared basis change falls here — figures
          either side are not the same measurement
        </span>
      </div>

      <p className="prose-note matrix-caption">
        <strong>Thin columns before 2014 are a fact about this record, not about those years.</strong>{' '}
        This instrument&rsquo;s baseline is frozen at May 2014; earlier material is held as context
        for comparison, so the baseline zone is sparse by design — it does not mean less was
        measured then. {early} observations before 2010 are held but not drawn.{' '}
        <strong>The Kashmir row reads through its lens</strong>: those series file under defence,
        governance and federalism as subjects, appear in those rows too, and are gathered here so an
        empty row cannot misstate the record. And an empty cell anywhere means this record holds no
        observation for that year — <em>not</em> that nothing was published; that claim would need a
        stated search, and per-year-per-area none was made.
      </p>

      <h2>What happened, year by year</h2>
      <p className="prose-note">
        Every record in the ledger, grouped by the year it begins. All of them — choosing
        &ldquo;the important ones&rdquo; would be a ranking this instrument refuses to make. Each
        carries its verdict on its own page, with the reasoning beside it.
      </p>

      {baselineRecords.length > 0 ? (
        <details className="yeargroup">
          <summary>
            <span className="yeargroup-year">Before May 2014</span>
            <span className="yeargroup-count">
              {baselineRecords.length} records · baseline context, not scored
            </span>
          </summary>
          <ul className="yeargroup-list">
            {baselineRecords.map((l) => (
              <li key={l.id}>
                <Link href={`/ledger/${l.id}/`}>{l.title}</Link>
                <span className="yeargroup-meta">
                  {formatDateRange(l.date, l.dateEnd)} ·{' '}
                  {l.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}
                </span>
                <RecordMarks record={l} />
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      {termYears.map((y) => {
        const ls = byYear.get(y)!.sort((a, b) => a.date.localeCompare(b.date));
        return (
          <details key={y} className="yeargroup" id={`y${y}`}>
            <summary>
              <span className="yeargroup-year">{y}</span>
              <span className="yeargroup-count">
                {ls.length} record{ls.length === 1 ? '' : 's'} begin{ls.length === 1 ? 's' : ''}
              </span>
            </summary>
            <ul className="yeargroup-list">
              {ls.map((l) => (
                <li key={l.id}>
                  <Link href={`/ledger/${l.id}/`}>{l.title}</Link>
                  <span className="yeargroup-meta">
                    {formatDateRange(l.date, l.dateEnd)} ·{' '}
                    {l.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}
                  </span>
                  <RecordMarks record={l} />
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </>
  );
}

/** Baseline-zone class on the cell's own td, so the zone reads in the body as well as the header. */
function y_cls(_c: Cell, y: number) {
  return y < 2014 ? 'matrix-cell matrix-base' : 'matrix-cell';
}
