import Link from 'next/link';
import type { ReactNode } from 'react';
import type {
  ExposureAdjudication,
  ExposureRole,
  Objective,
  Point,
  ReasonKind,
  ShockExposure,
  SourceRef,
  Status,
  Tier,
  TieredSource,
  Unmeasured,
} from '@/lib/types';
import {
  COMMITMENT_STATE_LABELS,
  OBJECTIVE_MEASUREMENT_LABELS,
  TIER_LABELS,
  formatValue,
} from '@/lib/format';

/**
 * A figure with its measurement status showing (CLAUDE.md rule 3):
 * verified renders plain, approx carries "≈" and a dotted rule,
 * pending never renders without its flag.
 */
export function Value({
  point,
  unit,
  denominator,
}: {
  point: Point;
  unit?: string;
  /**
   * Rendered inline, immediately after the figure — on the face of the number, not in a tag
   * row and not in a panel below. A rate whose base is a click away is a rate that gets
   * quoted without its base (P-52).
   */
  denominator?: string | null;
}) {
  // Separator only, no connective. The value is authored as a self-describing phrase
  // ("persons convicted, against 5,892 cases initiated…"); prepending "against" here would
  // both double the preposition and put the component's words into a research statement.
  const base = denominator ? <span className="denominator-inline">· {denominator}</span> : null;
  // A pending point may hold no figure at all: the period is known to exist and nothing is
  // yet pinned to it. Rendered as an em-dash carrying the pending flag, never as a zero and
  // never as a bare blank that could be mistaken for "not applicable" (rules 3 and 4).
  if (point.value === null) {
    return (
      <span className="figure">
        <span className="t-note">—</span>
        {unit ? <span className="t-note"> {unit}</span> : null}
        <span className="flag-pending">pending</span>
        {base}
      </span>
    );
  }
  const figure = formatValue(point.value);
  if (point.status === 'verified') {
    return (
      <span className="figure">
        {figure}
        {unit ? <span className="t-note"> {unit}</span> : null}
        {base}
      </span>
    );
  }
  if (point.status === 'approx') {
    return (
      <span className="figure status-approx" title="Approximate — from a credible report; primary pull outstanding">
        ≈{figure}
        {unit ? <span className="t-note"> {unit}</span> : null}
        {base}
      </span>
    );
  }
  return (
    <span className="figure">
      {figure}
      {unit ? <span className="t-note"> {unit}</span> : null}
      <span className="flag-pending">pending</span>
      {base}
    </span>
  );
}

export function StatusKey() {
  return (
    <p className="status-key">
      <span>verified — pinned to the named source this cycle</span>
      <span className="status-approx">≈ approx — credible report, primary pull outstanding</span>
      <span>
        placeholder
        <span className="flag-pending">pending</span>
      </span>
    </p>
  );
}

export function TierTag({ tier }: { tier: Tier }) {
  return (
    <span className={tier === 'T5' ? 'tag tag-t5' : 'tag'} title={TIER_LABELS[tier]}>
      {tier}
    </span>
  );
}

export function StatusTally({ counts }: { counts: Record<string, number> }) {
  const shown = (['verified', 'approx', 'pending'] as Status[]).filter((s) => counts[s]);
  if (shown.length === 0) return null;
  return (
    <p className="status-key">
      {shown.map((s) => (
        <span key={s}>
          {counts[s]} {s}
        </span>
      ))}
    </p>
  );
}

/** Source, tier and vintage on one line — one click from any number (rule 6/7). */
export function SourceLine({ source, tier }: { source: SourceRef; tier?: Tier }) {
  return (
    <p className="source-line">
      Source:{' '}
      <a href={source.url} target="_blank" rel="noreferrer">
        {source.name}
      </a>
      {tier ? <> · tier {tier}</> : null}
      {source.vintage ? <> · vintage {source.vintage}</> : null}
    </p>
  );
}

export function SourceList({ sources }: { sources: TieredSource[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0.35rem 0 1rem' }}>
      {sources.map((s) => (
        <li key={`${s.name}-${s.url}`} className="source-line">
          <a href={s.url} target="_blank" rel="noreferrer">
            {s.name}
          </a>{' '}
          · tier {s.tier}
        </li>
      ))}
    </ul>
  );
}


/**
 * THE CAVEAT'S OWN ROW — the design-queue item, closed 2026-08-10, and rule 3a decided the shape.
 *
 * THE PROBLEM WAS NEVER TRUNCATION. Rule 3a was already satisfied on all six table surfaces: the
 * caveat rendered in full, no clamp, no ellipsis. What was wrong was the FORM. Measured on
 * `/series/` before this change: the caveat sat in a **140px cell inside a 610px table**, and the
 * rows carrying one ran to **1,080px — nine times the median row of 122px.** 128 of 269 rows.
 *
 * AND RULE 3a ALSO NAMES THE FIX: *"if a caveat will not fit a layout, the LAYOUT is what
 * changes."* Not the caveat, not a disclosure, not a clamp. So the caveat leaves the narrow cell
 * and takes a full-width row of its own, directly beneath the record it qualifies — same table,
 * same reading order, four times the measure, nothing hidden and nothing shortened.
 *
 * WHY NOT A DISCLOSURE, WHICH IS THE OBVIOUS ANSWER. Because rule 4b already settled it one level
 * up: a declaration a reader must find is a declaration that reaches nobody. A caveat marks a
 * record that **would mislead without it** — putting it behind a click means the misleading
 * version is the default view.
 *
 * THE ROW MUST BE GROUPED WITH ITS RECORD IN A `<tbody>`. Two loose `<tr>`s are two rows; a
 * `<tbody>` per record says they are one listing, which is what `listing-marks` then binds.
 */
/**
 * OUTCOME ROW — the first half of the two-track grammar, and the half the site did not have.
 *
 * ============================ THE MEASUREMENT THAT PRODUCED IT ================================
 *
 * DESIGN-REVISION-2 §1 says the two tracks "stack as though the second undermines the first's
 * truth". **Measured on the built site, they do not stack — the outcome track is very nearly
 * absent.** Across the 122 series carrying both an authored finding and a caveat:
 *
 *     mean pages carrying the CAVEAT   11.81
 *     mean pages carrying the FINDING   1.02        <- its own page, and nothing else
 *     findings reaching any second page    3 of 122
 *
 * **The evidence track reaches 11.5x as many pages as the outcome track.** On a listing surface a
 * reader meets a title, a status mark and a full-width caveat row, and no statement of what the
 * measured result did. That is not two tracks stacked; it is one track shipped. It is also exactly
 * the reader review's finding arrived at from the other end, and it is the twelfth premise
 * correction in eleven batches.
 *
 * ============================ WHAT EACH TRACK CARRIES =========================================
 *
 *   OUTCOME   what the measured result did — the authored finding, one or two sentences.
 *   EVIDENCE  what is known about the measurement — `CaveatRow` beneath, plus the inline marks
 *             a row already carries: status, declared absences, differing facts, tier.
 *
 * **A surface declares which track it is drawing on by which component it calls.** There is no flag
 * and no mode: `OutcomeRow` is the outcome track and `CaveatRow` is the evidence track, and a
 * surface that renders one and not the other is making a visible choice rather than an accidental
 * one.
 *
 * ============================ THE TWO EMPTY CASES, WHICH ARE NOT SYMMETRICAL ==================
 *
 * **Outcome and no qualification** — render the outcome alone. **Nothing is emitted for the absent
 * evidence track**, because a rendered "no qualifications" would assert that the measurement is
 * clean, and the corpus holds only that this record declared none. Silence is the honest form.
 *
 * **Qualification and no outcome** — this is the dangerous one and it is the current state of the
 * whole site. 32 series carry no authored finding: 31 because one observation shows no trajectory
 * and one because it failed the survive-the-chart test. For those the outcome track is **absent by
 * a stated rule, not empty by accident**, and this component renders nothing rather than a
 * placeholder. A row showing only an evidence track is the defect this file exists to name, so
 * where it happens it should be because the record genuinely supports no outcome sentence.
 *
 * ============================ WHAT THIS IS NOT ================================================
 *
 * **Not a severity scale.** `DESIGN-REVISION.md` §7 rejected amber-for-warnings and red-for-breaks
 * because a caveat is a blocking qualification and an absence is a finding, and colouring them
 * alike asserts a severity the corpus does not hold. **Two tracks is a separation of KIND.** The
 * outcome row takes no colour the caveat row does not, carries no icon, and no ordering between
 * records is implied or computed.
 *
 * **Not a quieter caveat.** Rule 3a is untouched: `CaveatRow` renders the caveat in full, at full
 * width, unclamped, exactly as before. Putting the outcome above it does not shrink it — it stops
 * the caveat being the only thing a listing says about the record.
 */
export function OutcomeRow({
  finding,
  colSpan,
}: {
  finding?: string;
  colSpan: number;
}) {
  if (!finding) return null;
  return (
    <tr className="outcome-row">
      <td colSpan={colSpan}>
        <span className="outcome-inline">
          <span className="outcome-label">Outcome</span> {finding}
        </span>
      </td>
    </tr>
  );
}

export function CaveatRow({
  record,
  colSpan,
}: {
  record: { caveat?: string };
  colSpan: number;
}) {
  if (!record.caveat) return null;
  return (
    <tr className="caveat-row">
      <td colSpan={colSpan}>
        <CaveatFlag caveat={record.caveat} variant="inline" />
      </td>
    </tr>
  );
}

/**
 * Provenance ids named inside prose, made reachable.
 *
 * A caveat that ends "See P-26" should get the reader there in one click, the same as the
 * tag row does. Split rather than replace, so the text is never parsed as markup.
 */
function withProvenanceLinks(text: string): ReactNode[] {
  // {2,3} tracks the provenance id contract, widened 2026-08-03 when P-99 was reached.
  // Greedy and in step with the schema: /P-\d{2}/ against "P-100" would link "P-10" — a live
  // record that is not the one cited — and leave a stray "0" as text.
  return text.split(/(P-\d{2,3})/g).map((part, i) =>
    /^P-\d{2,3}$/.test(part) ? (
      <Link key={`${part}-${i}`} href={`/provenance/${part}/`}>
        {part}
      </Link>
    ) : (
      <span key={`t-${i}`}>{part}</span>
    ),
  );
}

/**
 * The caveat a record may not render without — read from the record's own `caveat` field.
 *
 * A record carrying one would mislead without it, so a list row showing the title and the
 * word "contested" transmits the claim while dropping the thing that qualifies it. The flag
 * therefore travels into every rendering, compact ones included: index tables, domain and
 * term pages, cited-by grids, not only the detail page.
 *
 * Both variants show the full text. `inline` is the compact form, and it does not truncate
 * — a caveat abbreviated to fit a table cell is a caveat that can be misread, which is the
 * failure it exists to prevent.
 */
export function CaveatFlag({
  caveat,
  variant = 'block',
  /**
   * False inside a link — the grid cards are anchors, and an anchor inside an anchor is
   * invalid markup. The caveat still renders in full; only the P-xx shortcuts drop out,
   * and the card already leads to the record where they are live.
   */
  linkify = true,
}: {
  caveat: string;
  variant?: 'inline' | 'block';
  linkify?: boolean;
}) {
  const body = linkify ? withProvenanceLinks(caveat) : caveat;
  if (variant === 'inline') {
    return <span className="caveat-inline">Caveat: {body}</span>;
  }
  return (
    <div className="caveat-block">
      <span className="label">Blocking caveat</span>
      <p>{body}</p>
    </div>
  );
}

/**
 * What each reason kind says, in the terms a reader needs.
 *
 * These are claims about the responsible body's position, not about the world — "the holder
 * says no record is kept" is what `not-collected` records, and it may be contested.
 */
export const REASON_KIND_LABELS: Record<ReasonKind, string> = {
  'not-collected': 'never collected',
  'not-published': 'collected, not published',
  withheld: 'withheld',
  'never-defined': 'never defined',
};

/**
 * WHAT THE SHOCK DID. Two roles that point opposite ways at a verdict — a confound debits nobody
 * and a cause moves the finding — which is why one prose field could not carry both.
 */
export const EXPOSURE_ROLE_LABELS: Record<ExposureRole, string> = {
  confound: 'degrades the measurement',
  cause: 'produced part of the outcome',
  'is-the-shock': 'this record is the event',
  'none-stated': 'none material',
};

/**
 * WHETHER THE RECORD ACCEPTS IT.
 *
 * `unstated` is the one that needed authorising and the one whose label has to be exact: it says
 * the record made NO judgement, not that the question is open or pending. "not adjudicated here"
 * carries that; "unresolved" would not, and would file an unmade judgement under a made one.
 */
export const EXPOSURE_ADJUDICATION_LABELS: Record<ExposureAdjudication, string> = {
  accepted: 'accepted',
  limited: 'accepted in part',
  refused: 'refused',
  unstated: 'not adjudicated here',
};

/**
 * A record's stated relationship to the exogenous events around it.
 *
 * ONE BLOCK PER RECORD, one line per entry, on the same call as `Absences`: two or three
 * exposures are facts about one record, and framing each separately would double the furniture
 * around the same amount of prose.
 *
 * The role and the adjudication render on the face of every entry rather than being grouped,
 * because the whole point of structuring this field was that a reader could not previously tell a
 * confound from a cause — and a reader who has to infer it from the prose is back where the field
 * started.
 */
/**
 * WHAT WAS ANNOUNCED, LIMB BY LIMB, AND WHICH LIMBS THE VERDICT RESTS ON.
 *
 * `claimAtLaunch` is one paragraph and a verdict is one word, and between them a reader could not
 * see that L-0011 announced four objectives and its `failed` rests on two. Ruling 9 requires the
 * record to say which; this is where a reader reads it.
 *
 * THE GROUNDS FLAG IS THE POINT and it renders on every row, not only where it is false: a list
 * that marked only the exceptions would leave a reader to infer the rule.
 */
export function Objectives({ items }: { items: Objective[] | undefined }) {
  if (!items || items.length === 0) return null;
  const resting = items.filter((o) => o.grounds).length;
  return (
    <div className="objectives">
      <span className="label">
        Announced{items.length > 1 ? ` · ${items.length} objectives` : ''}
        {items.length > 1 ? ` · the verdict rests on ${resting}` : ''}
      </span>
      <ul className="objectives-list">
        {items.map((o, i) => (
          <li key={`${o.text.slice(0, 32)}-${i}`} className={o.grounds ? undefined : 'objective-aside'}>
            <p>{o.text}</p>
            <p className="objective-meta">
              <span className="mono">{OBJECTIVE_MEASUREMENT_LABELS[o.measurement]}</span>
              <span className="mono">{o.quantified ? 'quantified' : 'not quantified'}</span>
              {o.commitmentState ? (
                <span className="mono">{COMMITMENT_STATE_LABELS[o.commitmentState]}</span>
              ) : null}
              <span className="mono">
                {o.grounds ? 'the verdict rests on this' : 'the verdict does not rest on this'}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ShockExposures({ items }: { items: ShockExposure[] | undefined }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="exposure">
      <span className="label">Exposure{items.length > 1 ? ` · ${items.length} declared` : ''}</span>
      <ul className="exposure-list">
        {items.map((e, i) => (
          <li key={`${e.event}-${i}`}>
            <span className="exposure-event">{e.event}</span>
            {e.role ? <span className="exposure-role">{EXPOSURE_ROLE_LABELS[e.role]}</span> : null}
            {e.adjudication ? (
              <span className="exposure-adj">{EXPOSURE_ADJUDICATION_LABELS[e.adjudication]}</span>
            ) : null}
            <p>{e.why}</p>
          </li>
        ))}
      </ul>
      {/* The cross-link, from the fourth walk and on the pattern the absence block already carries:
          `/exposure` has linked back to the declaring record since it was built and nothing pointed
          the other way, so the page showing how often an exposure was refused or left unadjudicated
          was reachable only from the top nav. */}
      <p className="absence-fill">
        <Link href="/exposure/">Every declared exposure, by role and by what was adjudicated</Link>
      </p>
    </div>
  );
}

/**
 * WHICH KIND OF DISPUTE, and why the bare word "disputed" was not enough.
 *
 * The schema REQUIRES `disputeKind` whenever `reasonDisputed` is true, and this component read
 * `reasonDisputed` and never read `disputeKind` — so 19 entries across 15 ledger records and 4
 * series declared a kind that reached no reader, while every gate stayed green. Same shape as the
 * 226 marks: no rule read the page for a field, and the silence looked like a decision.
 *
 * The two are materially different findings and must not collapse into one word. `evidentiary`
 * says the holder's stated reason is contradicted by evidence the data exists — the government's
 * account is falsified. `normative` says nobody disputes the facts and what is contested is the
 * characterisation, typically against a legal obligation. A reader told only "disputed" cannot
 * tell a caught misstatement from a legal argument.
 */
export const DISPUTE_KIND_LABELS: Record<'evidentiary' | 'normative', string> = {
  evidentiary: 'on the evidence',
  normative: 'on the characterisation',
};

/**
 * Measurements that do not exist, rendered as findings rather than empty space.
 *
 * The distinction drawn is between a gap in the data and a gap in the world. A blank cell
 * says "not reported this period"; this says nothing measures the thing at all, which is a
 * finding about the record and often the most important thing on the page. PMAY-G is the
 * plainest case — sanctioned and completed are published, occupancy is not, and a reader
 * shown only the first two would reasonably take completion for the end of the chain.
 *
 * Deliberately unlike every panel that carries findings: dashed and unfilled, no figure, no
 * table (CLAUDE.md rule 4a). An absence that looks like a result is worse than one left out,
 * because it invites a reader to treat the frame as the content.
 *
 * Reads from the record's own `unmeasured` field as of phase 4d, so a declaration travels
 * with the record into every view instead of depending on a component to supply it.
 *
 * One block regardless of how many declarations a record carries. Two absences on
 * ujjwala-refills — no health-outcome study, and no refill data after Dec 2018 — are two
 * facts about one series, and framing each separately would read as two unrelated warnings
 * and double the furniture around the same amount of prose.
 */
/**
 * AN ABSENCE ON A LISTING ROW, in the caveat's idiom and for the caveat's reason.
 *
 * 374 declarations sat on 199 records and appeared on NO listing surface at all: not the index, not
 * a term page, not a domain page. A reader browsing could not learn that 147 of 223 ledger records
 * declare something nothing measures — they met it only by opening a record and scrolling past two
 * argument blocks.
 *
 * Rule 4a was written against an absence rendering LIKE A FINDING, and the site never had that
 * problem: the block is dashed, unfilled, carries no figure and no table. The live defect was the
 * inverse — an absence that reaches no browsing reader reads as housekeeping, when the corpus's
 * position is that it is often the most important thing on the page.
 *
 * A COUNT AND NOT A SCORE. It says how many declarations a record carries and nothing about whether
 * that is many or few; there is no corpus-wide total on the index, deliberately, because one would
 * read as a completeness score and the rule that forbids a verdict number for a term forbids one for
 * the instrument's own coverage.
 */
/**
 * THE ONE-LINE GLOSS UNDER A VERDICT TALLY, and it exists because a tally is where the largest
 * misreading of this instrument happens.
 *
 * A reader meeting "44 Contested · 37 No stated objective" out of 110 takes away that 81 records
 * reached no conclusion. The corpus's position is the opposite: `no-objective` means the record
 * found something real and nothing was claimed against which to score it, and two thirds of the
 * contested records turn on a question no document could settle. BOTH ARE FINDINGS.
 *
 * ONE SENTENCE AND TWO LINKS, not a paragraph: a tally is a scanning surface and a reader who
 * wanted the argument would be on the record page. It says the least that stops the misreading.
 */
export function TallyGloss() {
  return (
    <p className="t-note">
      <Link href="/contested/">Contested</Link> and <em>no stated objective</em> are findings, not
      the absence of one — the first declines between readings the evidence supports, the second
      records that nothing was claimed to score against.{' '}
      <Link href="/method/">What the distribution measures</Link>.
    </p>
  );
}

export function AbsenceCount({ items }: { items: Unmeasured[] | undefined }) {
  if (!items || items.length === 0) return null;
  return <span className="absence-inline">{items.length} not measured</span>;
}

/**
 * THE MARK SET A LISTED RECORD CARRIES. Decided here, once, for every surface that lists one.
 *
 * WHY IT IS A COMPONENT AND NOT A CONVENTION. Eleven surfaces listed records and each assembled
 * its own marks by hand, so the sets drifted apart with nothing able to see it. Measured
 * 2026-08-08 over built output: **1,587 listing rows linked a record that declares an absence and
 * 843 carried no absence mark** — `AbsenceCount` was wired into the ledger TABLE of five surfaces
 * and into no series row anywhere and no cross-reference grid at all.
 *
 * **AND THE CAVEAT HAD DRIFTED TOO, WHICH IS THE MORE SERIOUS HALF.** The provenance page's
 * *Ledger records citing this dispute* grid rendered no `CaveatFlag`, while the series page's grid
 * of the same records did. **CLAUDE.md rule 3a names that surface in terms** — a caveat renders on
 * "detail pages, index tables, domain and term pages, cited-by grids" — so a cited-by grid without
 * one is the rule's own example going unmet.
 *
 * The asymmetry was visible in a single table cell and nobody could see it: on
 * `/domains/[domain]/` the ledger row rendered `CaveatFlag` AND `AbsenceCount`, and the series row
 * beside it rendered `CaveatFlag` and stopped — while rule 4b's words are *"in the caveat's
 * idiom"*.
 *
 * **THIS IS RULE 4b'S OWN PRIOR INSTANCE REPEATING.** 4b exists because 374 declarations complied
 * with 4a and reached no listing surface; the fix that followed was applied to the surface where
 * the defect was noticed and nowhere else. A shared component is what stops the third occurrence,
 * and `tools/listing-marks.mjs` is what reports it if the component stops being used.
 *
 * ORDER IS FIXED AND NOT COSMETIC: caveat, then absence, then differing facts — qualification
 * before gap before dispute, the same order these take on a record's own page.
 */
export function RecordMarks({
  record,
  linkify = true,
  deferCaveat = false,
}: {
  /** A series or a ledger record. Both carry `caveat` and `unmeasured`; only ledger has the rest. */
  record: {
    caveat?: string;
    unmeasured?: Unmeasured[];
    differentFacts?: boolean;
  };
  /** Cards suppress P-xx linkification because the whole card is already one link. */
  linkify?: boolean;
  /**
   * TABLE ROWS SET THIS AND RENDER `<CaveatRow>` BENEATH INSTEAD. See that component for why:
   * the caveat is not dropped, it is moved out of a 140px cell into a full-width one. A caller
   * that sets this and does NOT render the row has hidden a caveat, which rule 3a forbids and
   * `listing-marks` fails.
   */
  deferCaveat?: boolean;
}) {
  return (
    <>
      {record.caveat && !deferCaveat ? (
        <CaveatFlag caveat={record.caveat} variant="inline" linkify={linkify} />
      ) : null}
      <AbsenceCount items={record.unmeasured} />
      {record.differentFacts ? <DifferentFactsMark variant="inline" /> : null}
    </>
  );
}

export function Absences({
  items,
  heading = 'Not measured',
}: {
  items: Unmeasured[] | undefined;
  heading?: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className="absence">
      <span className="label">
        {heading}
        {items.length > 1 ? ` · ${items.length} declared` : ''}
      </span>
      <ul className="absence-list">
        {items.map((u) => (
          <li key={u.what} className={u.reasonDisputed ? 'absence-disputed' : undefined}>
            {/* The kind is shown on every entry rather than grouping the list by it. With one
                to three absences on a record, grouping adds a level of hierarchy to sort two
                items; the label carries the same information without it. The /unmeasured page
                groups by kind, which is where the taxonomy actually pays. */}
            {u.reasonKind ? (
              <span className="absence-kind">
                {REASON_KIND_LABELS[u.reasonKind]}
                {u.reasonDisputed
                  ? ` — stated reason disputed${
                      u.disputeKind ? ` ${DISPUTE_KIND_LABELS[u.disputeKind]}` : ''
                    }`
                  : ''}
              </span>
            ) : null}
            <p>
              No public measurement exists for <strong>{u.what}</strong>. {u.why}
            </p>
            {u.wouldFill ? (
              <p className="absence-fill">
                <span className="label">Would close it</span> {u.wouldFill}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      {/* The cross-link both ways. `/unmeasured` has linked back to the declaring record since it
          was built; nothing pointed the other way, so the page where the taxonomy actually pays was
          reachable only from the top nav. */}
      <p className="absence-fill">
        <Link href="/unmeasured/">Every declared absence in the corpus, grouped by kind</Link>
      </p>
    </div>
  );
}

/**
 * A record whose two sides are not weighing the same numbers.
 *
 * Distinct from an ordinary contested assessment, where both sides accept the same figures
 * and disagree about what they mean. Here each side's case rests on a different quantity, and
 * both can be arithmetically correct at once: the PMLA record is 15 convictions against 5,892
 * cases initiated, or 93% of trials concluded, from the same Parliamentary replies.
 *
 * Styled in the dashed-umber family used for denominator breaks, NOT in red. Red is reserved
 * for deaths, alerts and break-seams; a basis mismatch is none of those and must not read as
 * an alarm. The umber says the same thing here as it does on a restated denominator: the two
 * figures either side are divided by different things.
 *
 * The label says "common measure" rather than "different facts" because the operative test is
 * condition (c): whether any single ledger could carry both sides. Different facts is too
 * weak — two economic cases cite different facts constantly and still share a ledger in
 * principle, and calling that a basis mismatch mistakes a gap in the instrument for a
 * property of the argument. What the mark now records is that the two cases cannot be put
 * in the same currency at all: a quantity against a court's ruling, a constitutional
 * process, or a stated absence.
 */
export function DifferentFactsMark({
  note,
  variant = 'block',
}: {
  note?: string;
  variant?: 'inline' | 'block';
}) {
  if (variant === 'inline') {
    return <span className="different-facts-inline">These cases don&rsquo;t share a common measure</span>;
  }
  return (
    <div className="different-facts">
      <span className="label">These cases don&rsquo;t share a common measure</span>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

/**
 * The same test, recorded negative.
 *
 * A `differentFactsNote` on a record where `differentFacts` is FALSE has nowhere to render
 * otherwise, because the mark above is gated on the boolean — which is how L-0118's note
 * reached the reachability gate unreachable. Ungating that mark was not the fix: its label
 * asserts the cases don't share a common measure, so rendering it here would state the
 * opposite of what the record says.
 *
 * The label says the test was APPLIED AND CAME OUT NEGATIVE, and stops there. It deliberately
 * does not say the two cases share a common measure — that asserts more than a false reading
 * supports. L-0118's claim is narrower: no additional fact decides between the two readings,
 * because both accounts predict the identical observation. A shared ledger might still not
 * exist; what is established is only that the different-facts criterion was not met.
 *
 * Styled neutral, NOT in the umber family. Umber means the two sides are divided by different
 * things, which is precisely what a false reading denies — carrying the mismatch colour onto
 * a negative result would say at a glance the opposite of what the words say.
 *
 * No inline variant. The listing views mark a positive finding; a recorded negative is not a
 * qualification a reader needs in a table cell, and adding one would put a mark on ten records
 * that never ran the test.
 */
/**
 * The FALSE branch of the different-facts test.
 *
 * The note is optional and that is the whole point of the change made on 2026-08-06. This mark used
 * to render only when a note existed, so 10 records that had been tested and recorded false with no
 * note rendered NOTHING — indistinguishable, to a reader, from a record where the question was
 * never asked. The schema's own line calls the false judgement "the judgement most at risk of being
 * made silently", and gating its mark on the presence of prose was making it silently.
 */
export function DifferentFactsNegativeMark({ note }: { note?: string }) {
  return (
    <div className="different-facts-negative">
      <span className="label">These cases were tested for different facts and recorded false</span>
      {note ? <p>{note}</p> : null}
    </div>
  );
}
