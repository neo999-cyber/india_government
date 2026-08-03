/**
 * TypeScript view of the three data layers. The schemas in /schemas are the
 * contract — these types mirror them and are guaranteed by `npm run validate`,
 * which the build runs before Next ever compiles.
 */

/**
 * The subject area a record belongs to. A TAG SET, not a partition: a ledger record carries
 * `domains[]` and may carry several, a series carries exactly one, and a phase is not a domain
 * — phase 7 produced eight records filed across seven values.
 *
 * THE DISTINCTION THAT GETS CONFUSED is `welfare` against `human-development`: welfare is the
 * DELIVERY of a scheme, human-development is the OUTCOME it was meant to produce. Records
 * carrying both are the normal case, not an error.
 *
 * `kashmir` and `federalism` are the LENS values — see LENSES below, and note that they are the
 * lenses, `defence` is not. This comment called `defence` a lens and said all three carried no
 * series; phase 11 gave `defence` thirteen, and the schema has never described it as anything but
 * a subject. `demography` was REMOVED on 2026-08-03 after five phases with zero records; see the verification log for the reasoning and the counter-argument.
 */
export const DOMAINS = [
  'macro',
  'banking',
  'employment',
  'poverty',
  'human-development',
  'infrastructure',
  'welfare',
  'education',
  'governance',
  'kashmir',
  'federalism',
  'foreign',
  'defence',
  'environment',
] as const;
export type Domain = (typeof DOMAINS)[number];

/**
 * The subset of DOMAINS that are LENSES — read alongside a record's subject rather than as it.
 *
 * `domain` says what a record is about; `lenses[]` says what it also bears on. Two axes, and a
 * single-valued `domain` could not hold both: every phase-11 series is substantively a defence or
 * governance measurement AND is about Jammu and Kashmir, so until `lenses[]` existed a reader
 * filtering on `kashmir` reached no measured spine at all.
 *
 * `kashmir` is a lens and NOTHING else — the schema rejects it in `domain`. `federalism` is both:
 * "Centre-state relations" is a subject in its own right, so it is legal on either axis, and
 * illegal only on both at once. Mirrors `lenses.items.enum` in the schemas; the validator derives
 * its own copy from there rather than importing this.
 */
export const LENSES = ['kashmir', 'federalism'] as const;
export type Lens = (typeof LENSES)[number];

/**
 * The lenses that may NEVER be a subject. Mirrors SUBJECT_FORBIDDEN in tools/lib/integrity.mjs,
 * which is the enforcing copy — this one only decides what a domain page says about itself.
 */
export const LENS_ONLY: readonly Lens[] = ['kashmir'];

export const TERMS = ['baseline', 'T1', 'T2', 'T3'] as const;
export type Term = (typeof TERMS)[number];

export const TIERS = ['T1', 'T2', 'T3', 'T4', 'T5'] as const;
export type Tier = (typeof TIERS)[number];

/**
 * Which country the OBSERVATION measures — not where the source sits. India plus a fixed
 * four-country peer panel, held constant so comparisons stay like-for-like (P-09).
 */
export type Country = 'IND' | 'BGD' | 'VNM' | 'IDN' | 'CHN';
export type Status = 'verified' | 'approx' | 'pending';
export type Calendar = 'FY' | 'CY';

/**
 * A dimension a record should have but which nothing measures.
 *
 * Distinct from sparsity: `status: 'pending'` and blank periods already say "not reported
 * this period". This says the thing was never measured at all — a missing link in a chain,
 * an intended outcome no study ever tested, or a series that stops short of what it is cited
 * to demonstrate. An absence of this kind is a research finding (CLAUDE.md rule 4a).
 */
export const REASON_KINDS = [
  'not-collected',
  'not-published',
  'withheld',
  'never-defined',
] as const;
export type ReasonKind = (typeof REASON_KINDS)[number];

export const DISPUTE_KINDS = ['evidentiary', 'normative'] as const;
export type DisputeKind = (typeof DISPUTE_KINDS)[number];

export interface Unmeasured {
  /** The thing that is not measured, stated positively. */
  what: string;
  /** Why no figure exists — not collected, not published, withheld, or never defined. */
  why: string;
  /** The source that would close it. Doubles as a verification-queue seed. */
  wouldFill?: string;
  /**
   * The STATED reason no figure exists — what the responsible body says, not what is true.
   * Where the two differ, `reasonDisputed` records that they differ.
   *
   * THE TEST IS WHETHER THE DATA EXISTS, asked in this order:
   * - `not-collected` — never gathered. No record exists to release. If the holder were
   *   compelled tomorrow they would have nothing to produce.
   * - `not-published` — exists in a holder's hands, not released. The test is producibility
   *   under compulsion, not whether anyone has asked.
   * - `withheld` — exists, release was specifically requested or legally required, and was
   *   refused. Narrower than not-published: requires an identifiable refusal, not merely
   *   absence of release.
   * - `never-defined` — no agreed definition exists for the quantity, so it could not be
   *   collected even in principle. NOT "nobody has studied it": an unstudied but definable
   *   quantity is not-collected.
   */
  reasonKind?: ReasonKind;
  /**
   * True where the stated reason is contradicted by evidence, and the contradiction is set
   * out in `why`.
   *
   * Deliberately a flag rather than a fifth `reasonKind` value. Collapsing it into the enum
   * would lose the structure of the only case: the Labour Ministry told Parliament no data
   * on migrant deaths was maintained — and therefore that compensation did not arise — while
   * the Railways confirmed 97 deaths and an RTI indicated data was held and declined. The
   * stated reason is `not-collected`; the evidence indicates withholding. The enum records
   * the claim, the flag records that the claim is contested, `why` carries both. Same
   * separation as `competingAccounts` on a provenance record.
   */
  reasonDisputed?: boolean;
  /**
   * What kind of contradiction `reasonDisputed` records. Required when it is true.
   *
   * - `evidentiary` — the stated reason is contradicted by evidence that the data exists or
   *   was held.
   * - `normative` — the factual claim is not contested; what is contested is the
   *   characterisation of the non-release, typically against a legal or judicial obligation.
   */
  disputeKind?: DisputeKind;
}

export interface SourceRef {
  name: string;
  url: string;
  vintage?: string;
}

export interface TieredSource {
  name: string;
  url: string;
  tier: Tier;
}

export interface SeriesBreak {
  period: string;
  note: string;
  provenanceRef: string;
}

export interface Point {
  country: Country;
  period: string;
  /**
   * Null only with status "pending": the period is known to exist and no figure is held.
   * A blank is unreported, never zero (CLAUDE.md rule 4).
   */
  value: number | null;
  status: Status;
  note?: string;
}

export interface Series {
  id: string;
  title: string;
  unit: string;
  domain: Domain;
  /** Cross-cutting lenses this series is also read under. See LENSES. */
  lenses?: Lens[];
  tier: Tier;
  source: SourceRef;
  calendar: Calendar;
  breaks?: SeriesBreak[];
  points: Point[];
  provenanceRefs?: string[];
  notes?: string;
  /**
   * Direction of merit. `null` is a real value, not a missing one: a conviction rate has no
   * agreed direction, and asserting one would take a side. Anything that ever renders a
   * directional cue must treat null as "no cue at all" — not a neutral shade of one.
   *
   * Nothing renders directional colour today; the instrument has never had any (CLAUDE.md:
   * red is reserved for deaths, alerts and break-seams). The field is carried so that when
   * something does, the null case is already stated in the data rather than defaulted.
   */
  /**
   * What the number is measured against, rendered on the face of the value.
   *
   * Null means the denominator is not yet established — never "not applicable". P-52 is the
   * case: 0.25% and 93% are the same enforcement record on two bases, so a rate without its
   * base is not a usable figure, and the gate rejects a null one on any rate carrying P-52.
   */
  denominator?: string | null;
  higherIsBetter?: boolean | null;
  /**
   * What the period axis counts. Absent means calendar years. `lok-sabha-term` means each
   * point is a Lok Sabha term keyed by its first year, so the spacing is electoral and the
   * points must not be read as an annual series.
   */
  xAxis?: 'calendar-year' | 'lok-sabha-term';
  /**
   * A blocking qualification that must render wherever this record appears, including
   * compact listings. Distinct from `notes`: notes carry ordinary context and uncertainty,
   * a caveat marks a record that would mislead without it.
   */
  caveat?: string;
  /** Dimensions this series should have but which nothing measures. */
  unmeasured?: Unmeasured[];
}

/**
 * The fourth data layer: which series pair with which, and what each side is called.
 *
 * Sides are `a` and `b`, not coverage and usage, because a contested pair has no first.
 * For `coverage-usage` the order IS the argument — a records what was delivered, b what it
 * converted into. For `contested` the order is layout only.
 */
export interface PairSide {
  /** Exactly one of these three is set. */
  series?: string;
  /** Series or ledger id whose declared absence occupies this position. */
  absenceFrom?: string;
  absenceIndex?: number;
  /** Provenance id whose competingAccounts occupy this position. */
  competingAccountsFrom?: string;
  /** What this side IS. Hand-written per pair, never generic. */
  label: string;
}

export interface Pair {
  id: string;
  kind: 'coverage-usage' | 'contested';
  domain: Domain;
  /** Cross-cutting lenses this pair is also read under. See LENSES. */
  lenses?: Lens[];
  a: PairSide;
  b: PairSide;
  framing: string;
  gapComputable?: boolean;
  gapReason?: string;
  provenanceRefs?: string[];
  notes?: string;
  // Three fields that have been in pairs.schema.json and in the data without ever reaching this
  // interface, so nothing outside a pair's own render could read them. Added 2026-08-03 with the
  // lens axis, which needed all three.
  /** Short name for the pair. The framing is the sentence; this is the handle. */
  title?: string;
  /** Ledger records this pair bears on. */
  ledgerRefs?: string[];
  /** `declared-pending` means the pair is recorded as OWED and renders nowhere; `live` is default. */
  status?: 'live' | 'declared-pending';
}

/**
 * What the record CONCLUDES — not what kind of thing it is (see `LedgerType`) and not how
 * well evidenced it is (see `confidence`).
 *
 * These values had no written definitions until 2026-08-01, which is how `reversed` came to
 * cover two different mechanisms without the type objecting.
 *
 * - `worked` — the measure achieved the objective stated at announcement, on the evidence
 *   available.
 * - `partly` — it achieved part of its stated objective, or achieved it for part of the
 *   intended population.
 * - `failed` — it did not achieve the objective stated at announcement. Includes a measure
 *   struck down by a court: the outcome is the same and only the mechanism differs, so
 *   record the mechanism in `assessmentNote`.
 * - `reversed` — the ENACTING AUTHORITY withdrew or repealed its own measure. **`measure`
 *   means an intervention that acts on the world.** Withdrawing a disclosure, a publication
 *   or a reporting practice is not reversal, even where the authority withdrawing it is the
 *   one that established it. Judicial invalidation is not reversed either — a court striking
 *   a measure down is not the enacting authority changing its mind, and collapsing the two
 *   loses what distinguishes a government retreating under pressure from one overruled.
 *   The value attracts anything that ends, which is why the definition states what a measure
 *   is and not only who withdrew it.
 * - `contested` — the evidence supports more than one defensible reading and the record does
 *   not choose between them.
 * - `too-early` — the measure is in force but has not run long enough for its stated
 *   objective to be testable. The obstacle is elapsed time and the evidence it accumulates.
 * - `awaiting-adjudication` — the measure is in force and its effect is testable in principle,
 *   but the term that would settle the assessment is a pending decision by a body outside the
 *   enacting authority. Distinct from `too-early`, where the obstacle is elapsed time.
 * - `baseline-context` — pre-2014 context, carried so post-2014 records are read against a
 *   stated starting condition. Never scored; the schema ties it to term `baseline`.
 */
export type Assessment =
  | 'worked'
  | 'partly'
  | 'failed'
  | 'reversed'
  | 'contested'
  | 'too-early'
  | 'awaiting-adjudication'
  | 'no-objective'
  | 'baseline-context';

/**
 * What KIND of thing a record is — not its domain and not how it turned out.
 *
 * - `reform` — a measure the state deliberately introduced.
 * - `event` — a discrete dated occurrence, over in days or weeks.
 * - `episode` — a pattern or contested question over a span, with no single act at its centre.
 * - `shock` — a disruption arriving from outside the government's control.
 * - `institutional` — a change to the rules of the game or a standing body.
 *
 * UNRESOLVED: `shock` is applied both to external disruptions and to domestically caused
 * failures — the 2020 migrant exodus carries it while its own caseAgainst records that the
 * four hours' notice "was a choice". The external reading above fits three of five users.
 */
export type LedgerType = 'reform' | 'event' | 'episode' | 'shock' | 'institutional';

export interface LedgerRecord {
  id: string;
  title: string;
  date: string;
  dateEnd?: string;
  term: Term;
  domains: Domain[];
  type: LedgerType;
  summary: string;
  claimAtLaunch?: string;
  whatHappened?: string;
  assessment: Assessment;
  caseFor?: string;
  caseAgainst?: string;
  shockExposure?: string;
  seriesRefs?: string[];
  provenanceRefs?: string[];
  sources: TieredSource[];
  /**
   * How firmly the record's FINDING is established — distinct from `tier`, which grades the
   * evidence retrieved. UNRESOLVED: usage is ambiguous between confidence in the finding and
   * how well retrieved the record is, and the distribution is skewed (63 high, 24 medium,
   * 2 low), leaving `low` close to unattested.
   */
  confidence: 'high' | 'medium' | 'low';
  asOf: string;
  /** See `Series.caveat` — same contract, same rendering obligation. */
  caveat?: string;
  /** See `Series.unmeasured`. */
  unmeasured?: Unmeasured[];
  /**
   * True where the two sides are not weighting the same numbers differently but working from
   * different quantities entirely, so both can be arithmetically correct at once. Distinct
   * from an ordinary contested assessment, where both sides accept the same figures.
   */
  differentFacts?: boolean;
  /** What each side is counting or resting on, and why both hold. */
  differentFactsNote?: string;
  /**
   * A note on the assessment VALUE itself — typically that the existing vocabulary does not
   * cleanly fit and the value may change on review.
   */
  assessmentNote?: string;
}

/**
 * What a measurement problem does to the record it bears on.
 *
 * STRUCTURAL, UNRESOLVED: the name asserts a DIRECTION but only four of seven values state one.
 * `disputed`, `obscures` and `degrades-precision` state a KIND of defect with no direction, and
 * carry 35 of 58 records. `overstates-pre-2014` has no users at all.
 */
export type BiasDirection =
  | 'understates-pre-2014'
  | 'overstates-pre-2014'
  | 'understates-post-2014'
  | 'overstates-post-2014'
  | 'disputed'
  | 'obscures'
  | 'degrades-precision';

export interface CompetingAccount {
  holder: string;
  position: string;
}

export interface ProvenanceRecord {
  id: string;
  title: string;
  whatChanged: string;
  when: string;
  affectsDomains: (Domain | 'all')[];
  affectsSeries?: string[];
  /**
   * Series that reference this record as the CORRECTIVE rather than the affected party.
   * Mirror of `affectsSeries`; a series must not appear in both, and `directionOfBias`
   * does not apply to anything listed here.
   */
  correctiveSeries?: string[];
  directionOfBias: BiasDirection;
  bridgeExists: boolean;
  bridgeNote?: string;
  /**
   * Rival readings of the same measurement.
   *
   * Two authored forms. `{holder, position}` where the holder separates cleanly; a plain
   * string where the account names its own holder inside the prose. The second is not a
   * lesser form — splitting those sentences by pattern would be guesswork, and only 12 of
   * the 21 authored in phase 9 have a clause that could be split at all.
   */
  competingAccounts?: (CompetingAccount | string)[];
  sources: TieredSource[];
  notes?: string;
}
