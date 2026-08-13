import type { Metadata } from 'next';
import type { LedgerRecord, ProvenanceRecord, Series, Unmeasured } from './types';
import { periodLabel } from './format';
import { pairs } from './data';

/**
 * SHARE CARDS — text-only Open Graph tags, one composer, no images.
 *
 * ============================ WHY THERE IS NO IMAGE, WHICH IS A RULE AND NOT A COST ===========
 *
 * `next/og`'s `ImageResponse` is a runtime API and this site is `output: 'export'`; the route
 * cannot be collected and the build FAILS rather than degrading. That was tested, not assumed.
 * Static SVG is buildable and useless — WhatsApp, Slack and Twitter do not render SVG in
 * `og:image`, so the one job it has it cannot do.
 *
 * **But the binding constraint is not the mechanism, it is rule 3a.** A card is a fixed frame and a
 * caveat may not be truncated; 128 of 269 series and 103 of 223 ledger records carry one, median
 * 364 characters and the longest 1,320. Text is the only carrier that does not impose a frame.
 *
 * ============================ THE COMPOSITION RULE, AND WHY IT FORBIDS A FIGURE ===============
 *
 * > **A card states a finding that is true WITHOUT the caveat, or it states the qualification
 * > INSTEAD of the figure. Never a figure plus a badge — that is truncation wearing a badge.**
 *
 * A card reading *"Higher-education enrolment: 30% of 18–23s, up from 21%"* would be this site
 * publishing the exact defect it exists to catch: roughly half that rise is the 18–23 population
 * shrinking. Adding *"(qualified)"* does not fix it — the reader has the number and not the
 * qualification, and the badge only says a qualification exists somewhere else.
 *
 * **SO THESE CARDS CARRY NO FIGURE AT ALL, AND THAT IS A DELIBERATE FLOOR RATHER THAN THE IDEAL.**
 * The ideal is the scope's worked example — *"Roughly half the rise in India's higher-education
 * enrolment ratio is the 18–23 population shrinking, not more students"* — a sentence that needs no
 * caveat because it IS the caveat's finding. That is an AUTHORED judgement, one per record, and
 * there are ~670 records. **A mechanical composer cannot write it and must not pretend to.** What a
 * composer can do safely is say what the record is, what period it covers, who published it, and —
 * where the record declares an absence — say so in the corpus's own words.
 *
 * **The titles carry the interest, and they already do it honestly.** This corpus authors
 * finding-shaped titles — *"Two Union-origin instruments disagree by ₹67,819 crore"*, *"Half the
 * fleet, under a third of the electricity"* — each written under the same rules as the record. The
 * card's `og:title` is that title unchanged. Nothing is composed on top of it.
 *
 * ============================ WHY THE CAVEAT IS NOT PUT IN THE DESCRIPTION ====================
 *
 * It looks like the obvious honest move and it is the trap. `og:description` has no length limit in
 * the specification and every consumer of it has one in practice — WhatsApp and Slack show roughly
 * the first two lines. **A 1,320-character caveat pasted into a card is a caveat truncated by the
 * platform**, which is rule 3a's failure with the platform holding the knife instead of the layout.
 * A card that carries no figure needs no caveat; that is the whole reason the floor is where it is.
 *
 * ============================ THE ABSENCE VOCABULARY IS USED VERBATIM =========================
 *
 * §5a's distinctions are the corpus's hardest-won and a card is where they are most easily lost.
 * *"The published series ends in 2019"* is not *"no data after 2019"*, and *"not located"* is not
 * *"not published"*. The wording below is taken from `REASON_KIND_LABELS`, the same map the record
 * page renders through, so a card cannot drift from the page. A card never paraphrases an absence.
 *
 * ============================ WHAT NO GATE CAN BIND HERE ======================================
 *
 * `evaluability-wording`'s lesson applies exactly: a check can bind a literal forbidden phrasing
 * and cannot bind the CLAIM. **Whether a card's sentence is true without the caveat is a reading
 * owed to a human on every card that is ever authored by hand.** The mechanical floor below is safe
 * because it asserts nothing quantitative; the moment anyone writes a per-record card, that reading
 * comes back and this paragraph is the notice.
 */

/** Absence wording, in the corpus's own terms. Sourced from the same labels the record page uses. */
const ABSENCE_PHRASE: Record<string, string> = {
  'not-collected': 'never collected',
  'not-published': 'collected but not published',
  withheld: 'withheld',
  'never-defined': 'never defined',
};

const SITE = 'India, On the Record';

function absenceClause(items: Unmeasured[] | undefined): string | null {
  if (!items?.length) return null;
  // `reasonKind` is OPTIONAL in the schema and present on all 374 entries today. The unstated case
  // is given words rather than dropped: silently omitting it would make a card claim the corpus
  // stated a reason it did not, which is the smaller version of the defect this whole file guards.
  const kinds = [
    ...new Set(items.map((u) => (u.reasonKind ? ABSENCE_PHRASE[u.reasonKind] : 'reason not stated'))),
  ].filter(Boolean);
  const n = items.length;
  const what = n === 1 ? 'One quantity this record is about is' : `${n} quantities this record is about are`;
  return `${what} not measured: ${kinds.join('; ')}.`;
}

/**
 * THE DECLARATION LEADS. Rule 4b's reading order, applied to a surface that has its own knife.
 *
 * Descriptions run to a median of 191 characters and a maximum of 369, and WhatsApp and Slack show
 * roughly the first two lines. **An absence clause placed last is an absence the platform cuts** —
 * which is the shipped-and-invisible shape the corpus has paid for repeatedly, here caused by
 * ordering rather than by a missing field. So where a record declares an absence it is the first
 * sentence of the card, before anything describing what the record is.
 */
function lead(declaration: string | null, rest: (string | null)[]): string {
  return [declaration, ...rest].filter(Boolean).join(' ');
}

function card(title: string, description: string, path: string): Metadata {
  const clean = description.replace(/\s+/g, ' ').trim();
  return {
    title,
    description: clean,
    openGraph: { title, description: clean, url: path, siteName: SITE, type: 'article' },
    // `summary`, never `summary_large_image`: the large card reserves an image slot and renders a
    // blank one when there is no image. Declaring the small card is the honest description of what
    // this page actually offers.
    twitter: { card: 'summary', title, description: clean },
  };
}

/**
 * ============================ THE TWO-TRUTHS CARD — DESIGN-REVISION-2 item 6 ==================
 *
 * The one card form that survives the text-only ruling: **a card whose subject IS the tension, so
 * there is nothing to crop away that would leave a misleading claim standing.** It is the only
 * place the no-figure floor above is lifted, and the reason it can be lifted is that the figure
 * never travels without the half that qualifies it.
 *
 * ============================ THE BRIEF'S OWN WORKED EXAMPLE FAILS THE TEST ===================
 *
 * §6 offers this as the uncroppable card:
 *
 * > *Higher-education enrolment rose from 21.2% to 30%. Roughly half of that is a shrinking
 * > 18–23 population.*
 *
 * **A text card is not cropped, it is TRUNCATED, and truncation is linear.** WhatsApp and Slack
 * show roughly the first two lines. The prefix *"Higher-education enrolment rose from 21.2% to
 * 30%."* is precisely the misleading claim this instrument exists to catch, and it is the half the
 * platform keeps. The card is croppable, at the worst possible point, by the reader's client.
 *
 * **THE MISSING CONSTRAINT IS ORDER, AND THIS FILE ALREADY HAD IT.** *THE DECLARATION LEADS* was
 * written above for absence clauses, for the same reason: *an absence clause placed last is an
 * absence the platform cuts.* The two-truths card inherits it.
 *
 * > **THE TRUNCATION TEST: a card is admissible only if NO PREFIX OF IT states a claim that
 * > standing alone would mislead.** Not *does it contain both halves* — every rejected form does
 * > that. The qualification leads, or the sentence is not a card.
 *
 * ============================ WHERE THE TEXT COMES FROM, AND WHY NOT THE FINDING ==============
 *
 * `higher-ed-ger`'s authored finding is already the two-truths sentence the brief asks for — the
 * 237-findings pass wrote it, after the header above was written. **It still cannot be a card**:
 * at 459 characters median the findings lead with the figure and qualify after an em-dash, which
 * is the failing order. Making them cards is authoring work, not plumbing, and it is not done here.
 *
 * What IS admissible today is a pair's `framing`. A pair's subject is literally the tension, the
 * sentence is authored under the corpus's rules, and it is the corpus's own statement of what the
 * disagreement is.
 *
 * ============================ ASSERTED PER PAIR, NEVER SWEPT ==================================
 *
 * All 21 contested framings were READ against the truncation test. **Eighteen pass, one fails and
 * two are marginal**, and every judgement is named here rather than expressed as a filter:
 *
 * - **PR-18 FAILS and is excluded.** Its prefix *"On one measure India ranks 58th of 210 countries
 *   and looks unremarkable"* is exactly the claim the rest of the sentence overturns.
 * - **PR-52 is excluded as marginal.** The payoff — *both statements are true because the two
 *   denominators are different* — is the last clause; a prefix ending earlier leaves the Union's
 *   reply standing unqualified.
 * - **PR-60 is INCLUDED as marginal**, and the call is recorded: its opening clause is the tension
 *   in full (*China records more Indian goods arriving than India records leaving*), which is what
 *   the test asks. Its later *the expected direction* clause is the risk, and it is preceded by the
 *   tension rather than standing before it.
 *
 * `coverage-usage` framings are NOT used. Their pairs are incommensurable rather than contested,
 * and several open on a definition rather than on a tension.
 */
const TWO_TRUTHS_PAIRS: readonly string[] = [
  'PR-12', 'PR-13', 'PR-17', 'PR-22', 'PR-26', 'PR-27', 'PR-31', 'PR-32', 'PR-34', 'PR-35',
  'PR-36', 'PR-39', 'PR-40', 'PR-43', 'PR-49', 'PR-53', 'PR-55', 'PR-59', 'PR-60',
];

/** Read and rejected, held so a later pass re-argues rather than rediscovers. */
const TWO_TRUTHS_REJECTED: readonly string[] = ['PR-18', 'PR-52'];

/**
 * The admissible pair for a series, if any. **Lowest pair id wins where a series is a side of two**
 * — deterministic, and stated because "the first one" is otherwise an accident of array order.
 */
function twoTruths(id: string): string | null {
  const hit = pairs
    .filter((p) => p.kind === 'contested' && TWO_TRUTHS_PAIRS.includes(p.id))
    .filter((p) => p.a.series === id || p.b.series === id)
    .sort((a, b) => a.id.localeCompare(b.id))[0];
  return hit ? hit.framing.replace(/\s+/g, ' ').trim() : null;
}

/**
 * ============================ THE STORY CARD, AND THE DEFECT IT FIXES =========================
 *
 * **All seven stories were unfurling the root fallback.** Each story file exports
 * `metadata = { title, description }`, and each page's `<meta name="description">` carried its own
 * sentence — but `og:title` read *India, On the Record* and `og:description` read the site blurb on
 * every one of them.
 *
 * **The mechanism: a page that sets only `description` does not override the root layout's
 * `openGraph`.** Next merges `openGraph` as an object, not field-by-field against `description`, so
 * the layout's default won on every story. `seriesCard` and `ledgerCard` were unaffected because
 * they build `openGraph` explicitly — which is exactly why this composer exists rather than each
 * story hand-rolling its tags.
 *
 * Distribution here is a pasted link with no search discovery, so this line does the whole job of
 * deciding whether a stranger opens the page. Seven stories were spending it on a generic blurb.
 *
 * ============================ THE RULE, WHICH IS ORDER AND NOT CONTENT ========================
 *
 * > **A card is admissible only if NO PREFIX of it states a claim that standing alone would
 * > mislead.** The qualification leads, or the sentence is not a card.
 *
 * A platform keeps the prefix and drops the tail, so a sentence that states a figure and qualifies
 * it afterwards ships the figure alone. **The 237 authored findings all fail this** at a median 459
 * characters, leading with the figure and qualifying after an em-dash — which is why a story's card
 * is a fresh sentence written to the rule and never a compression of its finding.
 *
 * **The no-figure floor lifts only where the figures arrive already in tension**, as it does for the
 * two-truths cards: a spread of four official answers cannot be truncated into one standing claim.
 * It does not lift for a single figure with a qualification after it, and where a story's card
 * carries figures at all they sit AFTER the qualification, so a cut can only remove them.
 */
export function storyCard(title: string, share: string, slug: string): Metadata {
  return card(title, share, `/stories/${slug}/`);
}

export function seriesCard(s: Series): Metadata {
  const pts = s.points.filter((p) => p.country === 'IND' && p.value !== null);
  const first = pts[0]?.period;
  const last = pts[pts.length - 1]?.period;
  // Through the shared formatter with the series' own calendar, never hand-formatted — the same
  // reason `field-render-audit` derives its needles: a second formatter is a second answer.
  const span =
    first && last ? `${periodLabel(first, s.calendar)} to ${periodLabel(last, s.calendar)}` : null;
  const bits = [
    `A published series in this instrument's record of India, ${s.domain}.`,
    span ? `The published series runs ${span}.` : null,
    // NO SOURCE NAME, AND THE SCOPE ASKED FOR ONE. Measured before removing it: `source.name` in
    // this corpus is not a publisher, it is a full provenance sentence — median 100 characters,
    // p90 372, longest 1,540, and 162 of 269 contain a digit. `agri-value-per-worker-peer` reads
    // *"…matching this record's own India 2014 value against the World Bank API (…), which returns
    // 1,641.90 — retrieved and matched, not inferred"*. That sentence carries A DATA VALUE, so
    // putting it on a card breaches the no-figure rule, and at 372 characters the platform would
    // cut it mid-identification — a provenance sentence truncated reads as the whole source.
    //
    // The scope's element table assumed a short publisher string and this corpus has a different
    // field. Dropped rather than trimmed to a first clause, because a guessed publisher prefix is
    // an assertion about attribution that nothing checks.
    null,
    (s.breaks ?? []).length
      ? `${s.breaks!.length === 1 ? 'One declared change of basis' : `${s.breaks!.length} declared changes of basis`} — figures either side are not the same measurement.`
      : null,
    s.caveat ? 'The record carries a qualification that is read in full on the page.' : null,
  ].filter(Boolean);
  // THE TWO-TRUTHS CARD REPLACES THE FLOOR, and it replaces the absence clause too. Both cannot
  // lead, and the pair's framing is the stronger of the two: it is the record's tension in the
  // corpus's own words, where the absence clause is a composed sentence about a field. The absence
  // still renders in full on the page, which is where rule 4b binds it.
  const tension = twoTruths(s.id);
  if (tension) return card(s.title, tension, `/series/${s.id}/`);
  return card(s.title, lead(absenceClause(s.unmeasured), bits), `/series/${s.id}/`);
}

export function ledgerCard(l: LedgerRecord): Metadata {
  const bits = [
    `A ledger record in this instrument's account of India.`,
    `Both the case for and the case against are set out in full on the page, at equal weight.`,
    l.caveat ? 'The record carries a qualification that is read in full on the page.' : null,
  ].filter(Boolean);
  return card(l.title, lead(absenceClause(l.unmeasured), bits), `/ledger/${l.id}/`);
}

export function provenanceCard(p: ProvenanceRecord): Metadata {
  // NO CAVEAT CLAUSE, AND IT IS NOT AN OVERSIGHT: `ProvenanceRecord` carries no `caveat` field.
  // The type caught this here for the third time in one session — the corrections table and the
  // redline both reached for it too. Written down rather than fixed silently a fourth time: the
  // three layers do not carry the same marks, and a component generalised across them will keep
  // assuming they do.
  const bits = [
    `A measurement dispute, recorded as ${p.id}.`,
    `What is contested, who says what, and what would settle it are on the page.`,
  ].filter(Boolean);
  return card(`${p.id} · ${p.title}`, bits.join(' '), `/provenance/${p.id}/`);
}
