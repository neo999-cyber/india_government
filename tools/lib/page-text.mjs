/**
 * THE ONE NORMALISER. Every check that looks for a value on a page goes through this file.
 *
 * WHY IT IS A MODULE AND NOT A HABIT. Four checks in one session reported a page broken when the
 * page was correct, and every one of them was the same mechanism: the check normalised the page one
 * way and the needle another, so the miss was an assertion about the check's own regex. The costs
 * ran in the worst direction each time — a false failure sends someone hunting a rendering bug that
 * does not exist, and three of the first audit's 55 "invisible" values were CAVEATS, where a
 * spurious truncation hit points at a clamp that CLAUDE.md rule 3a forbids and that was never there.
 *
 * The four, all against pages that were rendering perfectly:
 *   - period labels authored `FY2013-14` and rendered `FY2013–14` with an en dash;
 *   - the `P-xx` linkifier turning "See P-26." into "See P-26 ." once tags were stripped;
 *   - React's SSR comment separators, which become a space if `<!-- -->` is stripped as a tag, so
 *     `lens · Europe` reads `lens ·  Europe`;
 *   - a curly apostrophe on the page against a straight one in the needle.
 *
 * The rule that follows, and it is in CLAUDE.md: A VERIFICATION READS THE PAGE THROUGH THE GATE'S
 * OWN NORMALISER, OR IT IS NOT A CHECK. Import `norm` and `pageTextFromHtml` here. Do not
 * reimplement them, do not "just strip the tags", and do not fold entities inline at the call site.
 *
 * `norm` is applied to BOTH sides — page and needle — by every caller. A transformation applied to
 * one side only is the defect, not the transformation.
 */

/** Fold the differences an author cannot see and a renderer introduces. Applied to page AND needle. */
export const norm = (s) =>
  String(s)
    .replace(/[‐-―]/g, '-') // ‐ ‑ ‒ – — ―  → hyphen
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?)\]])/g, '$1') // "P-26 ." → "P-26."
    .replace(/([(\[])\s+/g, '$1') // "( P-101" → "(P-101"
    .trim();

/**
 * HTML → the text a reader actually receives, normalised.
 *
 * Order is load-bearing and each step is a defect that was paid for:
 *   1. SCRIPTS FIRST. The framework embeds the whole RSC payload as escaped JSON, so a field
 *      rendering nowhere in the visible DOM is still in the file. Skip this and every value matches
 *      and the audit reports a clean sweep over an entirely broken site.
 *   2. COMMENTS REMOVED, NEVER REPLACED. React separates adjacent text nodes with `<!-- -->`.
 *      Treating it as a tag and substituting a space splits `lens · Europe`.
 *   3. ATTRIBUTES KEPT. A URL reaches a reader as an href and nowhere else, so stripping tags before
 *      looking for one would report every citation invisible.
 *   4. ENTITIES FOLDED, then `norm`.
 */
export function pageTextFromHtml(html) {
  const noScripts = String(html)
    .replace(/<script[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  const attrs = [...noScripts.matchAll(/(?:href|src|datetime|title|aria-label)="([^"]*)"/g)]
    .map((m) => m[1])
    .join(' ');
  return norm(
    `${noScripts.replace(/<[^>]+>/g, ' ')} ${attrs}`
      .replace(/&#x27;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/&lsquo;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&mdash;/g, '—')
      .replace(/&ndash;/g, '–')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&#x2F;/g, '/'),
  );
}
