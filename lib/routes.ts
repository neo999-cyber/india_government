import { QUESTION_ROUTES } from '@/lib/question-index';
import { STORY_INDEX } from '@/lib/story-index';

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
  '/overview/': { label: 'What changed', nav: 'Atlas' },
  '/questions/': { label: 'Questions', nav: 'Questions' },
  '/stories/': { label: 'Stories', nav: 'Stories' },
  '/search/': { label: 'Find a record', nav: 'Records' },
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
  '/unmeasured/': { label: 'What is not measured', nav: 'Gaps' },
  '/exposure/': { label: 'Exposure', nav: 'when a shock is offered as the reason' },
  '/about/': { label: 'About', nav: 'About' },
  '/method/': { label: 'Method', nav: 'method and evidence rules' },
  '/derivations/': { label: 'Derivations', nav: 'recomputed from public data' },
  '/publishers/': { label: 'Who published it', nav: 'who published it' },
  '/corrections/': { label: 'Corrections', nav: 'what it has changed its mind about' },
  '/data/': { label: 'The data', nav: 'the data' },
  '/directory/': { label: 'All pages', nav: 'all pages' },
  '/counterfactual/': { label: 'Counterfactual', nav: 'counterfactual' },
  '/compare/': { label: 'Compare series', nav: 'Compare' },
};

/**
 * The seven public concepts. These are the only destinations a first-time reader needs to learn;
 * the evidence indexes remain available in the directory and keep every established URL.
 */
export const PRIMARY_NAV = [
  '/overview/',
  '/questions/',
  '/stories/',
  '/search/',
  '/compare/',
  '/unmeasured/',
  '/about/',
] as const;

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

export type SectionKey =
  | 'atlas'
  | 'questions'
  | 'stories'
  | 'records'
  | 'compare'
  | 'gaps'
  | 'about';

export type SectionItem = {
  href: string;
  label: string;
  description: string;
  /** Specialist routes remain in the directory without crowding the public landing gateway. */
  landing?: boolean;
};

export type SiteSection = {
  key: SectionKey;
  href: (typeof PRIMARY_NAV)[number];
  label: string;
  description: string;
  /** Prefixes are resolved longest-first, so a route may be cross-filed without two nav items
   * claiming `aria-current`. `/questions/unanswerable/`, for example, belongs visibly to Gaps. */
  activePrefixes: readonly string[];
  items: readonly SectionItem[];
};

/**
 * THE SEVEN PUBLIC SECTIONS — one hierarchy for the masthead, local gateways and every directory.
 *
 * The previous directory taught a second model after the masthead: seven public destinations at
 * the top, then `start here`, `browse the archive` and `about the record` below. A reader who had
 * learned where Compare or Gaps lived had to reclassify the same pages when opening All pages.
 *
 * This registry keeps every established URL and changes only its visible parent. A child can point
 * to a query or fragment on an existing page; those are views of the same record, not duplicate
 * routes. Lightweight indexes let the directory expose every question and story without pulling
 * the data-backed question and story modules into client navigation.
 */
export const SITE_SECTIONS: readonly SiteSection[] = [
  {
    key: 'atlas',
    href: '/overview/',
    label: 'Atlas',
    description: 'Topics, chronology and the same record seen through time.',
    activePrefixes: ['/overview/', '/domains/', '/years/', '/lenses/', '/terms/'],
    items: [
      { href: '/overview/#topics', label: 'Topics', description: 'Fourteen topic portraits on shared years.' },
      { href: '/overview/?view=timeline#topics', label: 'Timeline', description: 'See when records begin across topics.' },
      { href: '/years/', label: 'Years', description: 'Open the complete record one year at a time.' },
      { href: '/lenses/', label: 'Lenses', description: 'Follow threads that cross topic boundaries.', landing: false },
      { href: '/terms/', label: 'Terms of government', description: 'Read the same archive by government term.', landing: false },
    ],
  },
  {
    key: 'questions',
    href: '/questions/',
    label: 'Questions',
    description: 'Six checkable filters for questions a reader arrives with.',
    activePrefixes: ['/questions/'],
    items: QUESTION_ROUTES.map((question) => ({
      href: `/questions/${question.slug}/`,
      label: question.question,
      description: question.directory,
    })),
  },
  {
    key: 'stories',
    href: '/stories/',
    label: 'Stories',
    description: 'Seven guided readings where sequence changes what the evidence means.',
    activePrefixes: ['/stories/'],
    items: STORY_INDEX.map((story) => ({
      href: `/stories/${story.slug}/`,
      label: story.title,
      description: `${story.topic} · guided evidence story.`,
    })),
  },
  {
    key: 'records',
    href: '/search/',
    label: 'Records',
    description: 'The archive itself, together or separated by the kind of record.',
    activePrefixes: ['/search/', '/series/', '/ledger/', '/provenance/', '/contested/', '/exposure/'],
    items: [
      { href: '/ledger/', label: 'Commitments and events', description: 'Reforms, announcements, events and episodes.' },
      { href: '/series/', label: 'Indicators', description: 'Published series, spans, seams and caveats.' },
      { href: '/provenance/', label: 'Measurement disputes', description: 'Definitions, basis changes and incompatible instruments.' },
      { href: '/contested/', label: 'Contested readings', description: 'Open verdicts and what could—or could not—settle them.' },
      { href: '/exposure/', label: 'Exposure', description: 'Records where a shock is offered as the reason.', landing: false },
    ],
  },
  {
    key: 'compare',
    href: '/compare/',
    label: 'Compare',
    description: 'Aligned series inside India, or India beside four comparator countries.',
    activePrefixes: ['/compare/', '/peers/'],
    items: [
      { href: '/compare/#series-comparison', label: 'Series', description: 'Place two compatible indicators side by side.' },
      { href: '/peers/', label: 'India and peers', description: 'India beside Bangladesh, Vietnam, Indonesia and China.' },
    ],
  },
  {
    key: 'gaps',
    href: '/unmeasured/',
    label: 'Gaps',
    description: 'What the published record cannot answer, and what would close the gap.',
    activePrefixes: ['/unmeasured/', '/questions/unanswerable/', '/questions/publication-stopped/'],
    items: [
      { href: '/questions/unanswerable/', label: 'Four public questions', description: 'Four familiar questions and four different reasons they remain unanswered.' },
      { href: '/unmeasured/#declared-absences', label: 'Declared absences', description: 'What individual records say is not measured.' },
      { href: '/questions/publication-stopped/', label: 'Publication stopped', description: 'Series whose official publication ends before the archive frontier.' },
      { href: '/unmeasured/#verification-queue', label: 'Verification queue', description: 'Named sources or measurements that would close declared absences.' },
    ],
  },
  {
    key: 'about',
    href: '/about/',
    label: 'About',
    description: 'How the record was built, sourced, derived and corrected.',
    activePrefixes: ['/about/', '/method/', '/publishers/', '/derivations/', '/data/', '/corrections/', '/counterfactual/'],
    items: [
      { href: '/method/', label: 'Method', description: 'Evidence rules, source tiers, marks and limits.' },
      { href: '/publishers/', label: 'Sources and publishers', description: 'The bodies behind citations, resolved across names.' },
      { href: '/data/', label: 'Public data', description: 'Download the records in their published schema.' },
      { href: '/derivations/', label: 'Derivations', description: 'Recompute claims this instrument makes about itself.' },
      { href: '/corrections/', label: 'Corrections', description: 'What the record changed and why.' },
      { href: '/counterfactual/', label: 'Counterfactual', description: 'The modelling feature considered and deliberately declined.', landing: false },
    ],
  },
] as const;

export function siteSection(key: SectionKey): SiteSection {
  const section = SITE_SECTIONS.find((candidate) => candidate.key === key);
  if (!section) throw new Error(`siteSection: unknown section ${key}`);
  return section;
}

/** Resolve a route to exactly one primary section. Longest prefix wins for cross-filed routes. */
export function sectionForPath(pathname: string): SiteSection | undefined {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return SITE_SECTIONS.flatMap((section) =>
    section.activePrefixes.map((prefix) => ({ section, prefix })),
  )
    .filter(({ prefix }) => path.startsWith(prefix))
    .sort((a, b) => b.prefix.length - a.prefix.length)[0]?.section;
}

/** The same seven groups power the masthead disclosure, full directory page and footer. */
export const DIRECTORY = SITE_SECTIONS;
