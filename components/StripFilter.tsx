'use client';

import { useEffect, useState } from 'react';

/**
 * The strip's four filters — one of four, not independent facets.
 *
 * WHY NOT `ListingFacets`. That component writes its state into the query string, and the series
 * table on this same page already uses it. Two instances would each rebuild the URL from their own
 * facets alone and silently wipe the other's — a conflict that is invisible until a reader filters
 * both and loses one.
 *
 * WHY A CLASS AND NOT PER-ROW JAVASCRIPT. The filter sets one attribute on the strip and CSS hides
 * the rows that do not match, so 269 rows are filtered by a single attribute write. Every row stays
 * in the DOM: the strip is a picture of the whole corpus, and a filter that removed rows would make
 * the 2014 wall disappear when a reader asked to see the stopped series, which is the opposite of
 * what they asked.
 */
const FILTERS = [
  { key: '', label: 'All' },
  { key: 'stopped', label: 'Ends before the frontier' },
  { key: 'basis', label: 'Changes basis' },
  { key: 'short', label: 'Short span' },
] as const;

export function StripFilter({
  counts,
  frontier,
}: {
  counts: Record<string, number>;
  frontier: number;
}) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const el = document.getElementById('span-strip');
    if (!el) return;
    if (active) el.setAttribute('data-filter', active);
    else el.removeAttribute('data-filter');
  }, [active]);

  return (
    <div className="strip-filter" role="group" aria-label="Filter the strip">
      {FILTERS.map((f) => (
        <button
          key={f.key || 'all'}
          type="button"
          className={`strip-filter-btn${active === f.key ? ' is-on' : ''}`}
          onClick={() => setActive(f.key)}
          aria-pressed={active === f.key}
        >
          {/* THE FRONTIER IS IN THE LABEL, not just in the prose above it. A reader has to know what
              "ends before" is being measured against, because measured against the maximum end year
              in the corpus the same filter returns 264 of 269 and means nothing. */}
          {f.key === 'stopped' ? `Ends before ${frontier}` : f.label}
          <span className="strip-filter-n mono">{counts[f.key] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
