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
 * The LENSES — read alongside a record's subject rather than as it.
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
 *
 * THIS WAS "the subset of DOMAINS that are LENSES" UNTIL PHASE 14, AND IT IS NOT ONE ANY MORE.
 * The first two values were read off the domain enum, which had written both as lenses, so the
 * subset relation held by construction and looked like a rule. The three added in phase 14 batch 1
 * are not domain values: a counterparty answers WHO a record is about, not WHAT, and the subject of
 * every one of them is `foreign`. The relation was an accident of the axis's first population.
 *
 * `china`, `neighbourhood` and `europe` are named in the phase-14 plan and are deliberately absent
 * until the batch that populates them. A lens is admitted when its records land: a value with
 * nothing behind it is a filter that returns nothing, and `lens-empty` in `domain-coverage` fails
 * the build rather than leaving an author to notice.
 *
 * The consequence is structural and was the reason to notice: lens surfaces used to be domain
 * pages, and `generateStaticParams` over DOMAINS emitted them for free. A lens that is not a
 * domain has no page unless one is built — which is exactly the "declared filter returns nothing"
 * failure — so the lens axis now has its own route at /lenses, and `domain-coverage` asserts a
 * page per lens value and a reachable record on it.
 */
export const LENSES = [
  'kashmir',
  'federalism',
  'defence-sector',
  'united-states',
  'china',
  'russia',
  'neighbourhood',
  'europe',
] as const;
export type Lens = (typeof LENSES)[number];

/**
 * The lenses that may NEVER be a subject. Mirrors SUBJECT_FORBIDDEN in tools/lib/integrity.mjs,
 * which is the enforcing copy — this one only decides what a domain page says about itself.
 *
 * The phase-14 values are absent for a reason that is not the same as `federalism`'s. They are not
 * "allowed as a subject"; they are not in the domain enum at all, so the subject axis rejects them
 * without help and there is nothing here to forbid. This list only governs values that COULD be
 * filed as a subject and must not be.
 */
export const LENS_ONLY: readonly Lens[] = ['kashmir'];

/**
 * Lenses that are ALSO domain values, and therefore have a domain page as well as a lens page.
 *
 * Derived rather than restated: the domain page's "this is a cross-cutting lens" block and the
 * lens page's back-link both key off it, and a hand-kept list would drift the moment a value
 * moved. Empty of the phase-14 six by construction.
 */
export const LENSES_THAT_ARE_DOMAINS: readonly Lens[] = LENSES.filter((l): l is Lens =>
  (DOMAINS as readonly string[]).includes(l),
);

export const TERMS = ['baseline', 'T1', 'T2', 'T3'] as const;
export type Term = (typeof TERMS)[number];

/**
 * THE RELATIONSHIP BETWEEN THE EVIDENCE AND THE CLAIM — not the tier, which grades the artefact.
 * Both questions are asked of the same citation and they have different answers.
 *
 * Ordered evidentially and not morally: `external` > `intra-state` > `none`. **`none` is a
 * description, not a demerit** — L-0030's single authoritative statement that no bank was
 * privatised is the right evidence, not weak evidence.
 *
 * NO VALUE FOR "not assessed": that is what the field's absence means, and a fourth would let a
 * record assert that it declined to look.
 */
export const INDEPENDENCE_GRADES = ['none', 'intra-state', 'external'] as const;
export type Independence = (typeof INDEPENDENCE_GRADES)[number];

export const CONTESTED_GROUNDS = [
  'criterion', 'interpretation', 'evidence-withheld', 'measure', 'evidence-unobservable', 'time',
] as const;
export type ContestedGround = (typeof CONTESTED_GROUNDS)[number];

export const TIERS = ['T1', 'T1F', 'T2', 'T3', 'T4', 'T5'] as const;
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

/**
 * WHAT THE SHOCK DID to a record. Two roles that point OPPOSITE WAYS at a verdict, which is why
 * one prose field could not carry both: `partly` on L-0017 (the shock may have caused the win)
 * and `partly` on L-0090 (the shock degraded the measurement) meant different things and rendered
 * identically for the whole life of the field.
 *
 * `none-stated` is a STATED ABSENCE and not an empty field — nine records wrote one unprompted
 * before any rule asked them to, which is the opposite of `claimAtLaunch`.
 */
export const EXPOSURE_ROLES = ['confound', 'cause', 'is-the-shock', 'none-stated'] as const;
export type ExposureRole = (typeof EXPOSURE_ROLES)[number];

/**
 * WHETHER THE RECORD ACCEPTS THE EXPLANATION. Orthogonal to the role and a modifier rather than a
 * third role: 15 of 66 prose values limited or refused the shock and only 4 did so as the whole of
 * what the field said.
 *
 * `unstated` was authorised by the operator on 2026-08-06 and **records that NO JUDGEMENT WAS
 * MADE — not that the explanation is unresolved or pending.** L-0061 is the case: COVID "IS THE
 * STATED REASON for much of the delay" names an explanation offered by someone else and never says
 * whether the record accepts it, and each of the other three values would assert a judgement the
 * record declined. A record that HAS adjudicated and is merely tentative takes `limited`.
 */
export const EXPOSURE_ADJUDICATIONS = ['accepted', 'limited', 'refused', 'unstated'] as const;
export type ExposureAdjudication = (typeof EXPOSURE_ADJUDICATIONS)[number];

/**
 * One record's stated relationship to one exogenous event.
 *
 * WHAT THIS DOES NOT HOLD, and the condition that would unblock it: the EVENT's own properties —
 * window, shared-with-the-peer-panel, breaks-a-series. Those are facts about the event, not about
 * any record, and they need a first-class shock object. Ruling 8 puts that object in PROVENANCE,
 * where `bridgeExists` has no referent for a shock that breaks no series. **So the event stays
 * prose until a shock breaks a series** — at which point it takes a provenance record, `event`
 * becomes a reference, and the three properties land there rather than here.
 */
export interface ShockExposure {
  /** The exogenous event, in prose. NOT a reference — no shock object exists. */
  event: string;
  /** What the event did to this record. Omitted only where the record is exempted by name. */
  role?: ExposureRole;
  /** Whether the record accepts it. Omitted for `is-the-shock`, which has nothing to adjudicate. */
  adjudication?: ExposureAdjudication;
  /** The record's own reasoning, verbatim from the prose this field carried before 2026-08-06. */
  why: string;
}

/**
 * Whether an announced objective was measured, and what the measurement showed.
 *
 * `not-met` against `unmeasured` is the distinction that decided Ruling 2 — *a limb measured and
 * failed and a limb never measured are different situations* — and L-0222 turns on it: both limbs
 * dated, both fallen due, both missed, so `partly` was refused.
 *
 * `unmeasurable-no-event` lives here rather than on `Unmeasured.reasonKind` because it is a property
 * of the OBJECTIVE and not of a holder. The `reasonKind` ladder asks whether the data exists, of
 * whoever would hold it; here nobody holds anything because the event never happened. L-0030 is the
 * case. **It must not become an excuse** — that record is `failed` BECAUSE the transfer did not
 * happen, and the same fact may not be re-used to convert the finding into a measurement gap.
 */
export const OBJECTIVE_MEASUREMENTS = ['met', 'not-met', 'unmeasured', 'unmeasurable-no-event'] as const;
export type ObjectiveMeasurement = (typeof OBJECTIVE_MEASUREMENTS)[number];

/**
 * The commitment state of one objective — PER LIMB, which is the corpus's own usage: L-0221 and
 * L-0223 both file a limb as "commitment state (a)" while the record carries a verdict.
 *
 * Since Ruling 3, `unfalsifiable` no longer implies `no-objective`: L-0209 is `undated-commitment`,
 * so the state and the verdict are two axes. `abandoned` has no member — absence of news is not
 * abandonment, and what evidence of abandonment looks like is an open question.
 */
export const COMMITMENT_STATES = [
  'not-yet-due',
  'due-and-undelivered',
  'abandoned',
  'unfalsifiable',
] as const;
export type CommitmentState = (typeof COMMITMENT_STATES)[number];

/**
 * One announced objective, and whether the verdict rests on it.
 *
 * `grounds` is Ruling 9's core requirement and was INVISIBLE UNTIL THE RULE WAS WRITTEN: a field
 * designed before it would have recorded measurement and not relevance. Four records already state
 * it in prose — L-0011, L-0016, L-0041, L-0030 — and `grounds: false` is not a criticism of the
 * record, only a fact a reader is entitled to see.
 */
export interface Objective {
  /** The objective in the announcement's own words, or the duty in the instrument's own. */
  text: string;
  /** Does it carry a number or a date? Unquantified is a defect of the announcement, not the reporting. */
  quantified: boolean;
  measurement: ObjectiveMeasurement;
  /** Does the verdict rest on this objective? */
  grounds: boolean;
  commitmentState?: CommitmentState;
  /** Index into the record's own `unmeasured[]`, where this objective's absence is declared. */
  unmeasuredRef?: number;
}

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
   * Nothing renders directional COLOUR and nothing is expected to; the instrument has never had
   * any (CLAUDE.md: red is reserved for deaths, alerts and break-seams). **The field itself does
   * render, from 2026-08-12** — as words, through `DirectionMark`, on every series page that
   * carries it, because the question routes at `/questions/` select on it. The withdrawn sentence
   * read "The field is carried so that when something does, the null case is already stated in
   * the data rather than defaulted"; the null case is stated, and what states it is a phrase.
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
 *   available, subject to two conditions ruled by the operator on 2026-08-06. (1) The evidence
 *   must include at least one source **independent of the announcing body** — a press release
 *   from the party being assessed is not credible evidence that the party succeeded. Where no
 *   independent source exists the record is NOT `failed`: the outcome is unestablished rather
 *   than negative, so it takes `partly` or `contested`. (1a) **The intra-state test**: one arm of
 *   the state measuring another satisfies the principle where the measuring institution publishes
 *   the figure as part of its own statutory or routine function, and fails where the figure
 *   appears in support of the claim. The RBI's Financial Stability Report qualifies; a joint
 *   ministry-and-regulator release does not. The test is on the publication, not the institution —
 *   and the qualifying source must bear on the limb in dispute and must actually be held, not
 *   reached through a news account of it. (2) Where a commitment states several
 *   objectives and **any one is unmeasured**, `worked` is unavailable and the verdict is
 *   `partly`. There is no centrepiece exception; a note explaining the departure documents it
 *   rather than authorising it.
 * - `partly` — it achieved part of its stated objective, or achieved it for part of the
 *   intended population.
 * - `failed` — it did not achieve the objective stated at announcement. Includes a measure
 *   struck down by a court: the outcome is the same and only the mechanism differs, so
 *   record the mechanism in `assessmentNote`. **An objective may be IMPOSED as well as
 *   announced** (Ruling 5, operator, 2026-08-06): a duty imposed by an authority other than
 *   the body being assessed — a statute, a constitutional provision, a court direction — is a
 *   legitimate objective for scoring, **provided the record names the instrument, the duty in
 *   the instrument's own words, and the duty-holder**. Four conditions: the obligation is
 *   imposed rather than volunteered, and an instrument's silence on a deadline does NOT move it
 *   to `no-objective` (L-0162 against L-0210, both stated, binary and undated); the duty must be
 *   the one the finding is about, not one merely in the vicinity (L-0154, where Article 281's
 *   duty was discharged); naming an instrument is not breaching it (L-0122, where AFSPA section
 *   7 sets no standard on the grant rate); and an absent duty is not a duty (L-0164, whose
 *   finding is that Articles 200 and 201 fix no period). It does NOT reach an objective INTERNAL
 *   to the measure — L-0108 is `failed` against the recruitment process's own object, under the
 *   ordinary definition above.
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
 * - `no-objective` — the record finds something real, and no objective was stated at
 *   announcement against which the finding could be scored. Distinct from `contested`, which is
 *   about evidence supporting more than one reading. The value asserts nothing about the
 *   finding's quality. **ADDED HERE 2026-08-06 — it had no bullet of its own for the whole of
 *   its life**, appearing only inside `undated-commitment`'s, while carrying roughly half the
 *   ledger; the omission surfaced only when Ruling 5 came to amend it. **An imposed duty is not
 *   the absence of a claim**: this value reaches what was not claimed BY the government, not an
 *   obligation imposed ON it — see `failed`. An instrument's silence on a deadline does not
 *   restore it, because Ruling 3's undated ladder governs what was volunteered. It still
 *   correctly covers a duty DISCHARGED while the finding is about something else (L-0154), an
 *   instrument named but not breached (L-0122), and a finding that IS the absence of an
 *   obligation (L-0164).
 * - `undated-commitment` — a stated and quantified commitment carrying no deadline, which
 *   therefore cannot fall due. **Progress against it is reportable even though it can never
 *   become overdue**: the value says the clock is missing, not the objective. Distinct from
 *   `no-objective`, where nothing quantified was claimed at all.
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
  | 'undated-commitment'
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
 * SETTLED 2026-08-06 by operator Rulings 6 and 7. This comment previously read, and it is quoted
 * so the correction can be checked: "UNRESOLVED: `shock` is applied both to external disruptions
 * and to domestically caused failures — the 2020 migrant exodus carries it while its own
 * caseAgainst records that the four hours' notice 'was a choice'. The external reading above fits
 * three of five users." **The count was stale in both numbers: there are EIGHT `type: shock`
 * records, not five.**
 *
 * **RULING 6 — `shock` is external to the state's own decisions.** A chain of state decisions is
 * not a shock however severe its consequences. The line is whether **an act of policy caused it** —
 * not severity, and not whose asset failed (L-0001's grid collapse was state-OWNED and no policy
 * act). The test is L-0091's, stated there before any rule existed: not a shock where the thing
 * recorded was "a sequence of state decisions rather than an external event".
 *
 * **RULING 7 — type by what the record is ABOUT, not by what failed.** A record about the state's
 * RESPONSE is typed by the response; L-0028 already does this, unprompted. This is why the domestic
 * non-state category needs no third branch — the type turns on the record's subject, not on the
 * nature of the event.
 *
 * **Ruling 8 governs where a shock belongs — provenance, not the ledger — and is in CLAUDE.md with
 * the two things it does not settle.**
 *
 * **APPLIED 2026-08-06 by operator instruction, as a separate deliberate act after the rulings were
 * written:** L-0216 → `reform`, L-0064 → `episode`, L-0027 → `event`. **No assessment moved and none
 * may — a type change that would move a verdict is a stop.**
 *
 * **Five `shock` records remain, and they are NOT the five the stale note meant**: L-0002, L-0020,
 * L-0021, L-0184, L-0186. Four pass the external reading. **L-0020 was deliberately not retyped**:
 * it carries two subjects, which its own title states — an external contraction and a domestic
 * fiscal response — and they take different types on any answer, so no retype settles it. The
 * question is written into that record's own `assessmentNote` rather than resolved.
 */
export type LedgerType = 'reform' | 'event' | 'episode' | 'shock' | 'institutional';

export interface LedgerRecord {
  id: string;
  title: string;
  date: string;
  dateEnd?: string;
  term: Term;
  domains: Domain[];
  /**
   * Cross-cutting lenses this record is also read under. See LENSES.
   *
   * Added in phase 14, a phase after series and pairs got it. `domains[]` being multi-valued was
   * why the ledger did not need it: `kashmir` and `federalism` are domain values, so a record
   * could already carry a lens beside its subject. That stopped being true the moment a lens
   * existed that the domain enum does not admit.
   */
  lenses?: Lens[];
  type: LedgerType;
  summary: string;
  claimAtLaunch?: string;
  objectives?: Objective[];
  whatHappened?: string;
  assessment: Assessment;
  caseFor?: string;
  caseAgainst?: string;
  shockExposure?: ShockExposure[];
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
  /**
   * The condition under which the record should be re-read — a date reached, a document
   * published, a series crossing a level. Present in the schema and on 62 records since long
   * before it was declared here; it was missing from this type, which is part of why no view
   * ever rendered it. A field the type does not know about cannot be rendered by mistake.
   */
  revisitTrigger?: string;
  /**
   * On a `contested` record, what would settle the contest. Optional WITHIN scope: two records say
   * in their own prose that `contested` is standing in for a value that does not exist, and they
   * are left unvalued rather than given a catch-all that would absorb the evidence.
   */
  contestedGround?: ContestedGround;
  independence?: Independence;
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
