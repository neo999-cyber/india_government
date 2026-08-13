'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * FACETED FILTERING OVER A LISTING THAT IS ALREADY FULLY RENDERED.
 *
 * WHAT THIS CLOSES. `app/ledger/page.tsx` carried a scaffold note reading *"Filtering by term,
 * domain and assessment lands with the ledger view proper"* — a declared debt. The corpus has been
 * multi-dimensional the whole time (14 domains, 8 lenses, 4 terms, 10 assessments, 173 of 223
 * records carrying two or more domains) and **no surface let a reader use any of it.** An
 * adversarial review read that as a flat data model. The data was never flat; the views were.
 *
 * ============================ WHY IT FILTERS THE DOM INSTEAD OF RENDERING RESULTS ==============
 *
 * The obvious build is a client component that holds the records and renders the matches. It is
 * wrong here, for three reasons that all point the same way:
 *
 *   1. **RULE 4b.** A listing must carry every record's declarations, and `listing-marks` proves
 *      it by reading BUILT HTML. Rows that exist only after hydration are rows the gate cannot
 *      see — the guard would pass on an empty table. A defect invisible to the gate that was
 *      written for it is the worst shape available.
 *   2. **RULE 3a.** Caveats render in full, in their own full-width row. Re-implementing that in a
 *      second renderer is the ad-hoc-normaliser class: two implementations of one rule, and the
 *      copy nobody maintains is the one that truncates.
 *   3. **JS off.** With no script the reader gets the complete listing, which is the correct
 *      degradation. The controls hide themselves rather than presenting a filter that does nothing.
 *
 * So the page renders every row, server-side, exactly as before; this toggles `hidden` on them.
 * **Filtering is a view operation over a complete document, not a query returning a subset.**
 *
 * ============================ THE URL CARRIES THE STATE ========================================
 *
 * Every filter combination is a link. That is the one property worth borrowing wholesale from the
 * Atlas of Economic Complexity, and it is what the citability ruling demands of any state a reader
 * can reach: a filtered view somebody can cite in an argument, and a reader can check.
 * `replaceState` rather than `pushState`, so the back button leaves the page instead of walking
 * back through fourteen filter states.
 *
 * ============================ WHAT IT DOES NOT DO ==============================================
 *
 * **It states no count as a finding.** The readout says how many rows of this table are showing.
 * It is not a fact about India, it is not a coverage measure, and it is worded so it cannot be
 * quoted as one — the same discipline the evaluability view's label carries.
 */

export type Facet = {
  /** Matches `data-f-<key>` on each row group. */
  key: string;
  label: string;
  options: { value: string; label: string }[];
};

export function ListingFacets({
  facets,
  target,
  noun = 'records',
  initialTotal,
}: {
  facets: Facet[];
  /** id of the element whose `[data-row]` descendants are filtered. */
  target: string;
  noun?: string;
  /**
   * The row count as the server already knows it. **Added because deleting a duplicate count
   * elsewhere would otherwise have deleted the only one a no-JS reader ever sees.** `SearchSort`
   * used to print `619 shown` from an immutable prop beside this component's live readout — two
   * `aria-live` regions on one page, one of them permanently wrong the moment a filter was
   * applied. The wrong one is gone; this makes the surviving one render before hydration too, so
   * nothing was lost with scripting off.
   */
  initialTotal?: number;
}) {
  /**
   * THE URL IS READ IN THE STATE INITIALISER, NOT IN AN EFFECT.
   *
   * This was a `useEffect` calling `setQ` and `setSel` on mount, which `react-hooks` flags as
   * *"calling setState synchronously within an effect can trigger cascading renders"* — and it did
   * exactly that: mount, then an immediate second render to apply values that were knowable before
   * the first. A lazy initialiser is the shape React wants for state derived from outside React, and
   * it is one render instead of two.
   *
   * **It must be safe on the SERVER**, where `window` does not exist and this component is
   * pre-rendered before hydration. It returns the empty case there, which is the correct
   * server-rendered state: nothing is filtered until the reader's URL is readable.
   */
  const fromUrl = (): { sel: Record<string, string>; q: string } => {
    if (typeof window === 'undefined') return { sel: {}, q: '' };
    const p = new URLSearchParams(window.location.search);
    const sel: Record<string, string> = {};
    for (const f of facets) {
      const v = p.get(f.key);
      if (v) sel[f.key] = v;
    }
    return { sel, q: p.get('q') ?? '' };
  };
  const [initial] = useState(fromUrl);
  const [sel, setSel] = useState<Record<string, string>>(initial.sel);
  const [q, setQ] = useState(initial.q);
  const [shown, setShown] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(initialTotal ?? null);
  /** False until the first filter pass has run, so arriving at a filtered link does not immediately
   *  rewrite the URL it arrived on. Set at the end of that pass, not during render. */
  const ready = useRef(false);

  const active = useMemo(
    () => Object.entries(sel).filter(([, v]) => v) as [string, string][],
    [sel],
  );

  useEffect(() => {
    const root = document.getElementById(target);
    if (!root) return;
    const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-row]'));
    const needle = q.trim().toLowerCase();
    let visible = 0;

    for (const row of rows) {
      const okFacets = active.every(([k, v]) =>
        (row.dataset[`f${k[0].toUpperCase()}${k.slice(1)}`] ?? '').split('|').includes(v),
      );
      const okText = !needle || (row.dataset.text ?? '').toLowerCase().includes(needle);
      const show = okFacets && okText;
      row.hidden = !show;
      if (show) visible += 1;
    }
    /**
     * THE ONE `react-hooks/set-state-in-effect` SUPPRESSION IN THIS REPOSITORY, and it is the rule's
     * own exception rather than a way around it.
     *
     * The rule says an effect should *"update external systems with the latest state from React"* or
     * *"subscribe for updates from some external system, calling setState in a callback"*. This does
     * the first and then reports what it observed. **The count cannot be computed from React state
     * because this component holds no records** — that is the whole design, argued at length in the
     * header: rows are server-rendered so `listing-marks` can see them, and this toggles `hidden`.
     * The DOM is the external system, and the number of rows left showing is only knowable after the
     * pass that hides them.
     *
     * **Restructuring to satisfy the rule would mean holding the records in the client**, which
     * breaks rule 4b's gate and re-implements rule 3a in a second renderer. The rule is right in
     * general and wrong here, so it is disabled at the line with the reason rather than repo-wide.
     */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShown(visible);
    setTotal(rows.length);

    if (!ready.current) {
      ready.current = true;
      return;
    }
    const p = new URLSearchParams();
    for (const [k, v] of active) p.set(k, v);
    if (needle) p.set('q', q.trim());
    const qs = p.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  }, [active, q, target]);

  const clear = () => {
    setSel({});
    setQ('');
  };
  const any = active.length > 0 || q.trim() !== '';

  return (
    <div className="facets">
      <div className="facets-row">
        <label className="facets-find">
          <span className="label">Find</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="title, id or summary"
            aria-label={`Filter these ${noun} by text`}
          />
        </label>

        {facets.map((f) => (
          <label key={f.key} className="facets-sel">
            <span className="label">{f.label}</span>
            <select
              value={sel[f.key] ?? ''}
              onChange={(e) => setSel((s) => ({ ...s, [f.key]: e.target.value }))}
            >
              <option value="">any</option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        ))}

        <button type="button" className="facets-clear" onClick={clear} disabled={!any}>
          Clear
        </button>
      </div>

      {/* THE ONLY LIVE COUNT ON THE PAGE. There were two: this one, correct, and a static
          `{count} shown` in `SearchSort` that could never change because filtering hides rows with
          CSS and the DOM never moves. A screen reader met both. `shown` is null until the first
          filter pass runs, so the unfiltered branch tests `total` alone — that is what lets the
          server render a true count for a reader with no scripting. */}
      <p className="facets-count" aria-live="polite">
        {total === null ? null : any && shown !== null ? (
          <>
            Showing <strong>{shown}</strong> of {total} {noun} in this table.{' '}
            {shown === 0 ? (
              <span className="facets-none">
                Nothing here matches that combination — which is a fact about this filter, not about
                the record.
              </span>
            ) : (
              <span className="t-note">
                This is a count of rows on this page, not a measure of anything.
              </span>
            )}
          </>
        ) : (
          <span className="t-note">
            All {total} {noun}. Filters change what is shown and never what is counted elsewhere;
            the URL carries the combination, so a filtered view can be linked to.
          </span>
        )}
      </p>
    </div>
  );
}
