'use client';

import { useEffect, useState } from 'react';

/**
 * THE EXPOSURE MATRIX — role down, adjudication across, counts in cells, click to read.
 *
 * ============================ MOST OF THIS GRID CANNOT EXIST, AND THAT IS THE PICTURE =========
 *
 * Five rows against five columns is 25 cells, of which 10 hold a count. A reader meeting that
 * grid reads fifteen gaps. **THERE IS ONE.** The other fourteen are structurally impossible,
 * because the schema says so:
 *
 *   - `is-the-shock` is reflexive — the record's own subject IS the event, so there is no
 *     explanation to adjudicate and `adjudication` is omitted. The gate names an `is-the-shock`
 *     that carries one as a defect.
 *   - `none-stated` is a stated absence of exposure. There is nothing to accept or refuse.
 *   - `cause` and `confound` must carry an adjudication; a confound without one is a gate failure.
 *
 * So the grid is block-diagonal and the three renderings are three different facts, which is the
 * whole reason this is a matrix rather than two lists:
 *
 *   **A COUNT** — entries are here.
 *   **A COUNTED ZERO** — this cell is possible, the cross-tabulation is complete over all 85
 *     entries, and nothing is in it. `cause × refused` is the only one: the corpus has never refused
 *     an exposure it called causal. That is a real zero, not an unreported blank, and it is printed
 *     as `0` for exactly that reason — rule 4 says a blank is unreported, so a blank here would
 *     say the opposite of what is true.
 *   **NOT ADJUDICABLE** — the cell cannot hold anything. Drawn in the absence idiom: dashed,
 *     unfilled, no figure, because rule 4a's *an absence renders unlike a finding* is about telling
 *     a gap in the world from a gap in the data, and this is a third thing again — a gap in the
 *     grid's own construction. Nothing is ever estimated into it and it is never styled as a zero.
 *
 * ============================ WHY THIS FILTERS ONE LIST RATHER THAN BUILDING CELL PAGES =======
 *
 * *Click to read* could have been a section per cell. It cannot be: `listing-marks` binds a listing
 * row **by its `/ledger/<id>/` href, whatever the link text**, and three records — L-0038, L-0051,
 * L-0052 — hold entries in two different cells. Two of those three declare an absence, so a
 * cell-sectioned page would render the same declaration twice and break the *each at most once per
 * page* rule while trying to satisfy rule 4b.
 *
 * So there is ONE listing, one row per record, marks rendered once, and the matrix filters it —
 * the same attribute-and-CSS mechanic as the series span strip, deliberately, because a second
 * filtering idiom for the same job is the ad-hoc-normaliser class this instrument keeps paying for.
 *
 * ============================ WHAT THIS MATRIX IS AND IS NOT A CLAIM ABOUT ====================
 *
 * Both axes were read from the same prose by the same reading, so **this is a description of how
 * the corpus coded itself and not a finding about India.** That is a weaker thing than it looks and
 * the page says so. It is nonetheless publishable where the adjudication-against-verdict table is
 * not, and the difference is worth stating: that table crosses the coding against a VERDICT the
 * same prose produced, which would let an artefact of the coding read as a result. This one crosses
 * the coding against itself and claims only to show its shape.
 */
export type CellKey = string;

export function ExposureMatrix({
  rows,
  cols,
  counts,
  recordCounts,
  applicable,
}: {
  rows: { key: string; label: string }[];
  cols: { key: string; label: string }[];
  /** Entry count per `${role}/${adjudication}` cell. */
  counts: Record<CellKey, number>;
  /**
   * DISTINCT RECORDS per cell, which is NOT the entry count and must be shown beside it.
   *
   * `confound × accepted` holds 28 entries on 23 records, because two records declare both a cause
   * and a confound for the same event. A reader who presses 28 and is shown 23 rows has been told
   * something false by the interface unless it says which number is which.
   */
  recordCounts: Record<CellKey, number>;
  /** Cells the schema permits. Everything else is structurally impossible. */
  applicable: Record<CellKey, boolean>;
}) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const el = document.getElementById('exposure-list');
    if (!el) return;
    if (active) el.setAttribute('data-cell', active);
    else el.removeAttribute('data-cell');
  }, [active]);

  return (
    <div className="xmat-wrap">
      <div className="table-wrap">
        <table className="xmat">
          <caption className="t-note">
            85 entries on 76 records. Rows are what the event did; columns are whether the record
            accepted the explanation. A cell drawn <span className="xmat-na-inline" /> cannot hold an
            entry — the schema omits an adjudication for those roles — and is not a zero.
          </caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="t-note">what the event did ↓ / accepted? →</span>
              </th>
              {cols.map((c) => (
                <th key={c.key} scope="col">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <th scope="row">{r.label}</th>
                {cols.map((c) => {
                  const key = `${r.key}/${c.key}`;
                  if (!applicable[key]) {
                    return (
                      <td key={c.key} className="xmat-na">
                        <span className="xmat-na-mark" aria-hidden="true" />
                        <span className="vh">not adjudicable — the schema omits an adjudication for this role</span>
                      </td>
                    );
                  }
                  const n = counts[key] ?? 0;
                  if (n === 0) {
                    return (
                      <td key={c.key} className="xmat-zero">
                        <span className="mono">0</span>
                        <span className="vh">
                          a counted zero over all 85 entries, not an unreported blank
                        </span>
                      </td>
                    );
                  }
                  return (
                    <td key={c.key} className={`xmat-n${active === key ? ' is-on' : ''}`}>
                      <button
                        type="button"
                        className="xmat-btn mono"
                        aria-pressed={active === key}
                        onClick={() => setActive(active === key ? '' : key)}
                      >
                        {n}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="xmat-state t-note">
        {active ? (
          <>
            Showing {recordCounts[active] ?? 0}{' '}
            {(recordCounts[active] ?? 0) === 1 ? 'record' : 'records'} carrying the{' '}
            {counts[active] ?? 0} {(counts[active] ?? 0) === 1 ? 'entry' : 'entries'} in that cell.{' '}
            {(recordCounts[active] ?? 0) !== (counts[active] ?? 0)
              ? 'Fewer records than entries: a record can declare two exposures for one event. '
              : ''}
            <button type="button" className="xmat-clear" onClick={() => setActive('')}>
              Show all 76
            </button>
          </>
        ) : (
          <>All 76 records shown. Press a count to narrow the list below to that cell.</>
        )}
      </p>
    </div>
  );
}
