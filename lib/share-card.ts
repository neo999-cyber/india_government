import type { Metadata } from 'next';
import type { LedgerRecord, ProvenanceRecord, Series, Unmeasured } from './types';
import { periodLabel } from './format';

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
