'use client';

import { useEffect, useState } from 'react';

/**
 * SORT FOR THE SEARCH CARDS — three orders, and the fourth that §4 asks for is not among them.
 *
 * ============================ WHY THERE IS NO "RELEVANCE" ORDER ===============================
 *
 * §4 lists *relevance · newest · topic · record type*. **Relevance requires a query and this surface
 * has none.** `/search/` is a FILTER OVER A COMPLETE DOCUMENT, not a query: every record is
 * server-rendered and the control hides rows. There is no scored match to rank by, and inventing
 * one — say, title hits before id hits — would be a ranking with no stated criterion behind it,
 * which rule 9 forbids and which the selection-is-not-ranking ruling settles.
 *
 * A real relevance order needs a scoring function over a query string, which needs the record prose
 * in the client, which is the 313 KB this page deliberately does not carry. **Named here as not
 * built rather than approximated**, because an order labelled *relevance* that is really
 * *title-first* teaches a reader something false about what the site knows.
 *
 * ============================ WHY CSS `order` AND NOT DOM REORDERING ==========================
 *
 * The existing facet control hides cards with CSS. A sort that reorders DOM nodes would fight it and
 * would have to re-run on every filter change. Instead each card carries its three ranks as custom
 * properties and this control sets one attribute on the container; CSS picks the property. **The
 * DOM never moves**, so filtering and sorting compose, and with scripting off the document order —
 * newest — is what a reader gets.
 */
const SORTS = [
  { key: 'newest', label: 'Newest' },
  { key: 'topic', label: 'Topic' },
  { key: 'type', label: 'Record type' },
] as const;

export function SearchSort() {
  const [active, setActive] = useState<string>('newest');

  useEffect(() => {
    const el = document.getElementById('search-cards');
    if (el) el.setAttribute('data-sort', active);
  }, [active]);

  return (
    <div className="srt" role="group" aria-label="Sort results">
      <span className="srt-label">Sort</span>
      {SORTS.map((s) => (
        <button
          key={s.key}
          type="button"
          className={`srt-btn${active === s.key ? ' is-on' : ''}`}
          aria-pressed={active === s.key}
          onClick={() => setActive(s.key)}
        >
          {s.label}
        </button>
      ))}
      {/* THE COUNT THAT USED TO SIT HERE IS GONE, AND THE COMMENT THAT DESCRIBED IT WAS FALSE.
          It read: *"Not a count of the corpus — a count of what the current filter leaves
          showing."* This component receives `count` as an immutable prop and filtering is done by
          `ListingFacets` toggling `hidden` on rows, so the number was structurally incapable of
          ever being a count of what was showing. It sat in an `aria-live` region, which made it a
          second announcement contradicting the correct one four elements away.

          A sort control is not a place a count belongs. `ListingFacets` already owns the readout,
          already tracks `shown` against `total`, and now renders its total on the server as well,
          so nothing is lost with scripting off. */}
    </div>
  );
}
