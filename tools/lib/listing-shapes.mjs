/**
 * THE LISTING SHAPES, HELD ONCE.
 *
 * Two gates ask what counts as a listing row: `listing-marks`, which requires each row to carry its
 * record's declarations, and `unrecognised-rows`, which reports a record link sitting in no row at
 * all. **Two copies of this would be the ad-hoc-normaliser class** — a second implementation of one
 * rule, where the copy nobody maintains drifts — and the divergence would be silent in the worst
 * direction: the reporter would call a shape unrecognised that the binder recognises, or the
 * reverse, and neither would fail.
 *
 * Extracted 2026-08-11 when the second reader was written. The shape list has been widened five
 * times (tbody unit, tr, li, anchor card by title class, container by class) and each widening is
 * argued at its own site below.
 */
/**
 * A PAIR ROW: the row is about the PAIR, and the record it links is where the pair lives.
 *
 * The exemption is narrow and it has to be. A pair row names a `PR-xx` as its own identifier and
 * links a series or ledger page because that is the pair's home — the linked record is the ADDRESS,
 * not the subject, so requiring that record's marks here would demand a caveat about a series the
 * row is not making a claim about.
 *
 * WIDENED 2026-08-11 FROM `<td>PR-xx</td>` TO ANY LEADING CELL. The predicate was written against
 * the one shape that existed and the reverse index on the ledger page uses `<li>` with a `<span>`,
 * so the gate demanded series marks on 75 rows that are about pairs. **Third time a guard has bound
 * one shape of a thing that has several** — the card class, the listing row, and now this — so it
 * matches the ELEMENT-WRAPPED id generally rather than a tag by name.
 *
 * It still requires the id to be wrapped in its own element: a `PR-xx` mentioned inside prose does
 * not exempt a row, which is what stops this becoming a way to opt out of rule 4b by citation.
 */
export const isPairRow = (blk) => /<(td|span|dt|strong)[^>]*>\s*PR-\d+\s*<\/\1>/.test(blk);

/**
 * Listing rows on a page, each counted ONCE.
 *
 * Table rows are taken first and REMOVED before grid cards and list items are taken: a `<tr>`
 * contains two anchors to the same record (the id cell and the title cell), so scanning all three
 * shapes over the same text counts every table row three times. That produced an exact 1:2
 * marked-to-missing ratio in the sweep that found this defect — pure arithmetic, not evidence.
 */
export function listingRows(html) {
  const clean = html.replace(/<script[\s\S]*?<\/script>/g, '');

  /**
   * A `<tbody>` HOLDING EXACTLY ONE RECORD IS THE LISTING UNIT, AND IT IS TAKEN BEFORE `<tr>`.
   *
   * WHY THE UNIT HAD TO WIDEN. Rule 3a says that where a caveat will not fit a layout, the LAYOUT
   * changes — and on 2026-08-10 it did: a caveat crammed into a 140px cell (rows to 1,080px
   * against a 122px median) moved into a full-width row of its own directly beneath its record.
   * The two rows are one listing, grouped in a `<tbody>`, so a check whose unit was the `<tr>`
   * reported 334 marks missing from listings that render them perfectly.
   *
   * **THE WIDENING IS FAITHFUL, NOT A LOOSENING, AND THE ONE-RECORD TEST IS WHAT MAKES IT SO.** A
   * `<tbody>` wrapping a whole table would let ANY row's mark satisfy EVERY record in it — the
   * gate would pass on a table where one caveat covered for two hundred missing ones. So a
   * `<tbody>` is only a unit when it links exactly one record; otherwise its `<tr>`s are taken
   * individually, exactly as before.
   */
  const REC = /href="\/(?:ledger|series)\/[^"/]+\//g;
  const bodies = [...clean.matchAll(/<tbody[\s>][\s\S]*?<\/tbody>/g)].map((m) => m[0]);
  const units = bodies.filter((b) => {
    const ids = new Set([...b.matchAll(/href="\/(?:ledger|series)\/([^"/]+)\//g)].map((m) => m[1]));
    return ids.size === 1;
  });

  let scoped = clean;
  for (const u of units) scoped = scoped.replace(u, '');

  const trs = [...scoped.matchAll(/<tr[\s>][\s\S]*?<\/tr>/g)].map((m) => m[0]);
  let rest = scoped;
  for (const t of trs) rest = rest.replace(t, '');
  /**
   * CARD CLASSES ARE ENUMERATED BY NAME, AND THE LIST IS THE GATE'S SCOPE.
   *
   * A card is distinguished from an incidental link to a record by the class its title carries.
   * That filter read `grid-title` alone until 2026-08-11, and **the overview board's 250 mini cards
   * carry `mini-t`** — so a surface listing 250 series, 141 of them with a caveat and 58 declaring
   * an absence, was outside this gate BY CONSTRUCTION from the day it was built. 199 declarations
   * reached no reader and the gate reported clean throughout, because it was never looking.
   *
   * **A NEW LISTING SHAPE BUILT PAST AN EXISTING GUARD** — the same class as the three A-4 finds,
   * running the other way. The list is named here rather than inferred so a third shape has to be
   * added deliberately; widening it to "any anchor to a record" would sweep in every cross-link in
   * the corpus and make the gate useless.
   */
  const CARD_TITLE_CLASSES = ['grid-title', 'mini-t'];
  const cards = [...rest.matchAll(/<a [^>]*href="\/(?:ledger|series)\/[^"]*"[\s\S]*?<\/a>/g)]
    .map((m) => m[0])
    .filter((b) => CARD_TITLE_CLASSES.some((c) => b.includes(c)));

  /**
   * CONTAINER-SHAPED LISTINGS — added 2026-08-11, and they are a different shape from the anchor
   * cards above.
   *
   * A `grid-title` card IS the anchor: the whole row is one `<a>` and the marks are inside it. The
   * domain rebuild introduced listings where the anchor is only the TITLE and the marks are siblings
   * of it inside a container — `.drec` record items, `.cw` chart cards, `.pslope` peer figures,
   * `.peer-one` blocks. The anchor regex cannot see those, so **462 record links with a declared
   * mark sat outside every recognised shape**, all of them rendering their marks correctly and none
   * of them bound by anything.
   *
   * SIXTH POSITION OF THE SAME CLASS. Card class, listing row, `<td>` against `<li>`, the projection,
   * the embedded feature, and now the container. `tools/unrecognised-rows.mjs` exists so the seventh
   * is loud instead of silent.
   */
  /**
   * Widened 2026-08-11 to the four container shapes the domain and peers rebuilds introduced.
   *
   * **TWO MORE WERE TRIED AND WITHDRAWN IN THE SAME PASS, and the reason is a finding rather than a
   * failure.** `chart` (the embedded feature) and `cu-view` (a pair) both LOOK like listings and
   * both were rejected by `listing-marks` the moment they were added — 17 marks reported missing on
   * pages whose declarations are plainly present. The cause is that a pair POOLS its sides'
   * absences and renders them once at pair width, and a pair whose absence side is a LEDGER record
   * pools nothing from it at all.
   *
   * **The unit is whatever renders the declarations once, and for those two components that is a
   * question about the component rather than about markup.** Adding them without answering it would
   * demand a declaration twice in one place and zero times in another. They are left out, and
   * `unrecognised-rows` reports them so the decision is visible rather than lost.
   */
  // `redline` added 2026-08-11 in the commit that created it, because `unrecognised-rows` reported
  // it the moment it landed. One record per container and its declarations render once inside —
  // unlike the pair views, whose unit is still open.
  // `ctwo` is F4's contested record: one <article> holding the title, the ground, the marks and the
  // two facing readings. Registered when the shape landed rather than after a gate reported it
  // missing — the third-shape class this list exists for.
  const CONTAINER_CLASSES = ['drec', 'cw', 'pslope', 'peer-one', 'redline', 'ctwo'];
  const containers = [];
  for (const cls of CONTAINER_CLASSES) {
    // WHOLE CLASS TOKEN, NOT `\b`. A hyphen is not a word boundary, so `\bctwo\b` matched
    // `class="ctwo-head"` and the gate then demanded a record's marks inside the record's own
    // TITLE block — 76 spurious failures on a page rendering every mark correctly. This is the
    // boundary defect the corpus-search helper exists to prevent, in the one place that had
    // hand-rolled its own matcher. Class attributes are space-separated, so the token is bounded
    // by a space or by the quote.
    const open = new RegExp(`<(article|div|figure|section)[^>]*class="(?:[^"]*\\s)?${cls}(?:\\s[^"]*)?"`, 'g');
    for (const m of rest.matchAll(open)) {
      // Balanced scan to the matching close tag, so a nested element cannot truncate the unit.
      const tag = m[1];
      const re = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, 'g');
      re.lastIndex = m.index;
      let depth = 0;
      let t;
      while ((t = re.exec(rest))) {
        depth += t[0][1] === '/' ? -1 : 1;
        if (depth === 0) {
          containers.push(rest.slice(m.index, t.index + t[0].length));
          break;
        }
      }
    }
  }
  const lis = [...rest.matchAll(/<li[\s>][\s\S]*?<\/li>/g)].map((m) => m[0]);
  return [
    ...units.map((b) => ['tbody', b]),
    ...trs.map((b) => ['tr', b]),
    ...cards.map((b) => ['card', b]),
    ...containers.map((b) => ['container', b]),
    ...lis.map((b) => ['li', b]),
  ];
}
