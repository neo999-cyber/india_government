/**
 * ROUTE LABELS — one public name per destination, used by every surface that names it.
 *
 * ============================ THE DEFECT THIS EXISTS TO END ===================================
 *
 * An external audit found four names competing for one destination, and measuring the whole class
 * rather than the four it cited found **12 of 21 index routes drifting between `<title>` and `<h1>`,
 * with the breadcrumb using the URL slug on every one of them**:
 *
 * | route | nav said | `<title>` said | `<h1>` said | breadcrumb said |
 * |---|---|---|---|---|
 * | `/series/` | indicators | Series | Indicator series | series |
 * | `/provenance/` | measurement disputes | Provenance | Measurement disputes | provenance |
 * | `/ledger/` | reforms, events and episodes | Ledger | Ledger of reforms… | ledger |
 * | `/unmeasured/` | — | Unmeasured | What is not measured | unmeasured |
 *
 * **A reader was being taught a second naming system that the visible navigation never explains.**
 *
 * ============================ AND THE LAST FIX MADE IT WORSE IN ONE PLACE =====================
 *
 * `app/layout.tsx` carried the comment *"was: series — the prose pass renamed this everywhere but
 * here"* — asserting the rename was complete elsewhere. **It was not.** The prose pass renamed the
 * nav and stopped, and the comment recorded the job as done. That is the local-fix rule breached:
 * the correction is not the fix, the correction is the sweep.
 *
 * **So this is a registry rather than a fourth edit.** A future pass changing a name changes it
 * here, and the nav, the title, the breadcrumb and the share card all move together — there is no
 * longer a surface that can be forgotten, which is the only durable form of the fix.
 *
 * ============================ WHAT IT DOES NOT DO =============================================
 *
 * **It does not govern the `<h1>`.** Several are authored headlines — *"What changed, everywhere,
 * since 2014"*, *"Method, tiers and what the marks mean"* — and flattening them to the short label
 * would trade a real editorial gain for a tidier table. The rule is that `label` is the DESTINATION
 * NAME and the `<h1>` may be a headline that opens from it. Where an `<h1>` names a different thing
 * entirely, that is the defect and the label is what it is corrected to.
 *
 * **And it renames no route.** Every href is unchanged; this is what the surfaces SAY, not where
 * they go.
 */

/**
 * One entry per destination.
 *
 * `label` is the DESTINATION NAME — what `<title>` and the breadcrumb say.
 * `nav` is the reader-facing GLOSS the navigation shows, which is deliberately a phrase rather than
 * a name: *"when a shock is offered as the reason"* teaches more than *"Exposure"*. Both live here
 * so they cannot drift apart again, and so a reader meets the same name in the tab, the crumb and
 * the share card whichever phrase brought them.
 */
export const ROUTES: Record<string, { label: string; nav?: string }> = {
  '/': { label: 'instrument' },
  '/overview/': { label: 'What changed', nav: 'what changed' },
  '/domains/': { label: 'Topics', nav: 'topics' },
  '/questions/': { label: 'Questions', nav: 'questions' },
  '/stories/': { label: 'Stories', nav: 'stories' },
  '/search/': { label: 'Find a record', nav: 'search' },
  '/years/': { label: 'Years', nav: 'one year at a time' },
  '/lenses/': { label: 'Lenses', nav: 'threads across topics' },
  '/terms/': { label: 'Terms of government', nav: 'terms of government' },
  '/peers/': { label: 'Peers', nav: 'four comparator countries' },
  // `nav` and `label` name the same thing here now. They did not: the nav said "indicators", the
  // title said "Series", the h1 said "Indicator series" and the crumb said "series".
  '/series/': { label: 'Indicator series', nav: 'indicator series' },
  '/ledger/': { label: 'Reforms, events and episodes', nav: 'reforms, events and episodes' },
  '/provenance/': { label: 'Measurement disputes', nav: 'measurement disputes' },
  '/contested/': { label: 'Contested', nav: 'verdicts that stay open' },
  '/unmeasured/': { label: 'What is not measured', nav: 'what is not measured' },
  '/exposure/': { label: 'Exposure', nav: 'when a shock is offered as the reason' },
  '/method/': { label: 'Method', nav: 'method, and what the marks mean' },
  '/derivations/': { label: 'Derivations', nav: 'recomputed from public data' },
  '/publishers/': { label: 'Who published it', nav: 'who published it' },
  '/corrections/': { label: 'Corrections', nav: 'what it has changed its mind about' },
  '/data/': { label: 'The data', nav: 'the data' },
  '/counterfactual/': { label: 'Counterfactual', nav: 'counterfactual' },
};

/** The destination's public name. Throws on an unknown route rather than inventing one from the
 *  slug — a silent fallback is how the slug got onto 38 breadcrumbs in the first place. */
export function routeLabel(href: string): string {
  const r = ROUTES[href];
  if (!r) throw new Error(`routeLabel: no public label declared for ${href} — add it to ROUTES`);
  return r.label;
}

/** The navigation gloss, falling back to the destination name where no phrase is wanted. */
export function navLabel(href: string): string {
  const r = ROUTES[href];
  if (!r) throw new Error(`navLabel: no entry for ${href} — add it to ROUTES`);
  return r.nav ?? r.label;
}

/**
 * The breadcrumb form: the same label, lower-cased unless it starts with a word that is capitalised
 * in its own right. Derived so a breadcrumb can never say something the nav does not.
 */
export function crumbLabel(href: string): string {
  const l = routeLabel(href);
  return l.charAt(0).toLowerCase() + l.slice(1);
}
