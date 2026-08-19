/**
 * THE TOPIC CONTENTS STRIP — what the tab strip became on 2026-08-14.
 *
 * ============================ WHY THE TABS WENT ===============================================
 *
 * Each topic used to be five routes: `/domains/<d>/` plus `indicators`, `records`, `disputes` and
 * `missing`. **Seventy pages, 6.36 MB, and the overview's record list was 100% contained in its own
 * tabs** — measured on all fourteen topics, education 29 of 29, macro 65 of 65, governance 116 of
 * 116, environment 19 of 19. The overview held the links; the tab held the same records again as a
 * table with verdicts and marks.
 *
 * **The lens pages had already proved the one-page form works.** `/lenses/kashmir/` carries series,
 * records, disputes and absences on a single surface — 82 records, one document. Two axes over the
 * same corpus, answered two different ways, and only one of them cost seventy pages.
 *
 * ============================ WHAT WAS LOST, STATED RATHER THAN GLOSSED =======================
 *
 * **A tab was a URL and this is a fragment.** A reader could send someone `/domains/macro/records/`
 * and they would land on the records alone; now they land on the topic at `#records`. That is a
 * real reduction and it is the price of the merge — the section is still addressable, it is no
 * longer isolable. Nothing else was lost: every record, table, mark and absence that rendered on a
 * tab renders here, in the same components.
 *
 * ============================ IT IS NAVIGATION, NOT A LISTING =================================
 *
 * **This carries no record link**, which is why it is not in `listing-shapes.mjs` — the same
 * question the tab strip had to answer, asked again because the shape changed. It links to four
 * FRAGMENTS of the page it sits on and names no record. `unrecognised-rows` is what would catch it
 * if that ever changed.
 *
 * The order is fixed and identical on all fourteen topics. Counts belong inside the sections they
 * describe; putting them beside these four links made the rail look like a performance dashboard
 * before the reader had encountered any evidence.
 */
export const DOMAIN_SECTIONS = [
  {
    key: 'indicators',
    label: 'Indicators',
    orient:
      'Every indicator series filed under this topic, and those read under it as a lens.',
  },
  {
    key: 'records',
    label: 'Government records',
    orient:
      'Every reform, event and episode entered under this topic, with its verdict and its marks.',
  },
  {
    key: 'disputes',
    label: 'Disputes',
    orient:
      'Measurement disputes bearing on this topic — where two instruments answer the same question differently, or one changed basis.',
  },
  {
    key: 'missing',
    label: 'Declared gaps',
    orient:
      'What this topic declares it cannot measure, in the record’s own words. An absence here is a fact about the record, not an estimate of anything.',
  },
] as const;

export type DomainSectionKey = (typeof DOMAIN_SECTIONS)[number]['key'];

export function DomainSections() {
  return (
    <nav className="rail dsecnav" aria-label="Sections of this topic">
      {/* THE HEADING IS FOR THE RAIL PRESENTATION ONLY. As a horizontal strip under the standfirst
          it needs no label — it reads as a strip of links. Standing in a column beside the page it
          does, and a bare list of four words in the margin is the thing readers ignore. */}
      <span className="rail-h mono">On this page</span>
      {DOMAIN_SECTIONS.map((sct) => (
        <a key={sct.key} className="dsecnav-i" href={`#${sct.key}`}>
          {sct.label}
        </a>
      ))}
    </nav>
  );
}
