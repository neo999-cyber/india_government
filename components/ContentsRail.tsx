/**
 * A CONTENTS RAIL FOR ANY LONG PAGE — the topic pages' rail, generalised.
 *
 * `DomainSections` renders `<nav className="rail dsecnav">` for the four fixed sections of a topic;
 * the stylesheet positions ANY `.rail` — a horizontal strip below 1280px, a sticky 13rem column
 * above it, scoped by `main:has(.rail)` so pages without one reserve nothing. Nothing there was
 * topic-specific except the list. This takes the list as a prop.
 *
 * WHY NOW. The surface audit of 2026-09-01 folded fifteen pages into twelve, and four of the hosts
 * became long documents with no in-page navigation at all: /method/ with 24 sections at 500 KB,
 * /search/ at 2.4 MB, /unmeasured/ at 1.2 MB, /overview/ with 20. "Extend the rail beyond topic
 * pages" had been a pending item since the rail shipped; the merges made it a defect.
 *
 * THE ANCHORS ARE HAND-WRITTEN AND MACHINE-CHECKED. Each host passes the ids of its own sections.
 * A wrong id is a dead fragment, and the fragment sweep that found `/method/#tiers` — 37,288 links
 * checked — is the check that binds this list to the page it sits on.
 */
export function ContentsRail({ items, label = 'Sections of this page' }: {
  items: readonly { id: string; label: string }[];
  label?: string;
}) {
  return (
    <nav className="rail dsecnav" aria-label={label}>
      <span className="rail-h mono">On this page</span>
      {items.map((it) => (
        <a key={it.id} className="dsecnav-i" href={`#${it.id}`}>
          {it.label}
        </a>
      ))}
    </nav>
  );
}
