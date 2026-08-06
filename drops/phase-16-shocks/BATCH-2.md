# Phase 16, batch 2 — the prose shadow, the multi-objective rule, one correction, and a stop

Written 2026-08-06 against `903fe1e`. **One correction applied; two reports; and the field is NOT
built — the design requires an enum value the proposal does not contain, which is a stop.**

**0 verdicts moved**, proven across all 223 ledger records. No retype. No schema or enum change.

---

# 1. REPORT — THE PROSE SHADOW, named and measured

**The class, written into `CLAUDE.md`:** *a prose field that restates a structured value goes stale
silently when the structured value moves, and no gate can see it.* The three render gates prove a
prose field is **there**; none reads what it **says**.

## The population

**SCOPE: 223 ledger + 127 provenance records; the 14 prose fields `summary`, `whatHappened`,
`caseFor`, `caseAgainst`, `assessmentNote`, `caveat`, `revisitTrigger`, `shockExposure`,
`differentFactsNote`, `claimAtLaunch`, `whatChanged`, `bridgeNote`, `notes`, `title`; word-boundary
`scanText`. Emitted by `scratchpad/restate.mjs`. No gate emits this.**

**A hit is only countable where the value's spelling cannot occur in ordinary prose.** That
restriction is not a convenience — it is the finding.

| axis | findable tokens | restatements | naming the record's own value | naming a different one |
|---|---|---:|---:|---:|
| `assessment` | `no-objective` `undated-commitment` `too-early` `awaiting-adjudication` `baseline-context` | 68 | 38 | **30** |
| `directionOfBias` | `understates-/overstates-pre-/post-2014` `degrades-precision` `obscures` | 5 | 3 | **2** |
| **`type`** | **none — every value is an ordinary English word** | **0** | 0 | 0 |
| **`contestedGround`** | `evidence-withheld` `evidence-unobservable` only | **0** | 0 | 0 |
| `tier`, `reasonKind`, `disputeKind` | not restated in prose in any hit | 0 | 0 | 0 |

**73 restatements. 32 name a value other than the record's own. All 32 read individually:**

- **31 are correct.** Value-boundary defences — L-0153 *"Not awaiting-adjudication: nothing is
  pending before any body outside the enacting authority"*, L-0200 *"Not too-early: five years is
  long enough…"*, L-0141 *"no-objective is wrong because an objective was stated in the statute"* —
  or **dated rescoring history preserved under the correction convention**: L-0086, L-0127 and
  L-0134 all open *"Filed too-early…"* and then carry *"RESCORED too-early -> awaiting-adjudication
  on 2026-08-03"* in the same field, which is the convention working exactly as written. P-63 and
  P-93 likewise record `degrades-precision` as considered and rejected.
- **1 IS STALE: L-0209's `revisitTrigger`**, which still said what would move the record *"out of
  no-objective and make the commitment scoreable for the first time"* — after the record had been
  rescored to `undated-commitment` on 2026-08-06 and its `assessmentNote` rewritten to say so.
  **The note was corrected in the rescore and the trigger beside it was not.** Corrected in this
  batch; see §3.

## The finding is what the measurement cannot reach

**`type` and `contestedGround` return zero findable restatements at any precision**, because `shock`,
`event`, `episode`, `reform`, `institutional`, `criterion`, `measure`, `time` and `interpretation`
are ordinary words. **The axis on which the defect actually occurred — `type`, in L-0064 and L-0027 —
is the axis no mechanical check can see.** A gate built on this measurement would report clean on
the failure it was built for.

**And the correct-to-stale ratio is 31 : 1**, which is why a token check is the wrong instrument: it
would fire on thirty-one right answers. **The same shape as the phase-name gate**, and the same
resolution — presence in context, never absence — except that here the context that distinguishes a
defence from a shadow is semantic, not lexical. *"Not too-early"* and *"Filed too-early"* differ by
one word and by everything.

## So the answer is a rule at the point of change, not a gate over the corpus

**A structured value never moves alone.** In the same operation that changes it, search the prose for
restatements and correct or withdraw each one. **This is a discipline written into `CLAUDE.md`
because no gate can carry it**, and it is the honest form: the batch that moved L-0064 and L-0027
found their shadows by looking, not by being told.

**The nearest mechanism that exists is `withdrawn-wording`'s sibling check** — for a withdrawn span,
no other prose field may still assert it. It binds only fields already carrying a correction marker,
so it reaches the *second* half of the defect and not the first. **Extending it to fire when a
STRUCTURED field changes between commits is buildable and is not proposed here**: it would need the
previous commit's value, which is a different contract from every gate in the build.

**Reported only. A correction may move a verdict** — L-0209's did not, and that was asserted before
the write rather than after.

**One thing the operator's list named that the corpus does not hold: `commitmentState`.** The
instrument reasons in commitment states (a)/(b)/(c)/(d) throughout — `CLAUDE.md` defines all four,
L-0209's `whatHappened` runs the test explicitly, L-0221 and L-0223 both file limbs as *"commitment
state (a)"* — and **there is no such field on any schema.** It is a structured axis that exists only
in prose, so every instance of it is a prose shadow with nothing to shadow. That is a different and
larger defect than the one measured above.

---

# 2. REPORT — a rule reaching all four verdict classes

**The base, from `903fe1e`:** 43 of 86 claim-carrying records announce more than one objective.
Ruling 2 constrains `worked`, whose live population is **zero** — the one `worked` record is
single-objective. **The prospective population is 40: `partly` 20 · `too-early` 8 · `failed` 7 ·
`contested` 5**, plus `reversed` 1, `undated-commitment` 1, `awaiting-adjudication` 1. **Governed by
nothing.**

## What a rule reaching all four would have to say

**Not a restriction on any verdict. A disclosure requirement, uniform across the four, with one
per-value consequence.** The reasoning is Ruling 1's, applied in both directions: *a standard that
converts missing evidence into a negative finding is as unsound as one that converts it into a
positive one.*

> **Where a commitment states several objectives and the verdict rests on fewer than all of them, the
> record names which objectives ground the verdict, which do not, and why; and every ungrounded
> objective is entered as an absence.**

**Then exactly one consequence per class, and each has to be different because the four values fail
in different directions:**

| class | why an unmeasured limb bears differently | the consequence |
|---|---|---|
| **`worked`** 0 | a positive verdict on a subset asserts more than the evidence carries | **`worked` is unavailable** — Ruling 2, unchanged |
| **`failed`** 7 | a negative verdict on a subset is sound where the measured limbs fail on their own terms — L-0011 fails on two of four and the two are decisive | **the verdict stands; the ground is stated.** Restricting it would convert a demonstrated failure into a non-finding |
| **`partly`** 20 | `partly` already means *part of the objective* — an unmeasured limb is the normal case, not a defect | **disclosure only.** This is where R2 sends records, so it must not also bar them |
| **`too-early`** 8 | an unmeasured limb is expected **by the value's own definition** — the evidence has not accrued | **disclosure only, and the rule must say so explicitly**, or a `failed`-side rule sweeps in eight records where nothing is wrong |
| **`contested`** 5 | the contest is about readings, not about coverage | **disclosure only**, and where the *unmeasured limb is itself the contest*, `contestedGround` already records it |

**Three things the rule must not do**, each earned by a live record:

1. **It must not make an unmeasured limb an excuse.** L-0030 is `failed` **because** the transfer did
   not happen, and its efficiency limb is unmeasurable **for the same reason**. A record must not use
   the disclosure to convert its own central finding into a measurement gap.
2. **It must not treat an unquantified limb as an unmeasured one.** L-0209 is the live case: the
   fence is quantified and the patrol track is stated with no length. **An unmeasured limb has a
   denominator nobody published; an unquantified limb has no denominator at all**, and only the
   second is a defect of the announcement rather than of the reporting.
3. **It must not sweep in `too-early`.** Eight records, and the value's own definition already says
   the evidence is accruing.

## Can it be written before `objectives[]` exists?

**Yes — and it will be unenforceable, exactly as Ruling 2 is.** The distinction is worth stating
because it decides the sequencing:

- **The rule is a DISCLOSURE requirement on prose.** It can be written today, it applies today, and
  four `failed` records already satisfy it unprompted — L-0011, L-0016, L-0041 and L-0030 each name
  which limbs ground the verdict and which do not.
- **What it cannot do without `objectives[]` is be CHECKED.** Nothing in the corpus records that a
  record announced several objectives, so no gate can find the records the rule binds. It would join
  Ruling 2 as a rule in three files that nothing can apply — **the per-record defence with a rule
  attached, which is not the same as closed.**
- **And writing it first has one concrete benefit**: it is what tells `objectives[]` what to hold.
  The field needs a measurement state per objective **and a flag for whether the objective grounds
  the verdict** — and that second requirement is invisible until the rule is written. Designing the
  field first would have produced a field that records measurement and not relevance.

**Recommendation: write the rule now, build the field in phase 17, and state in the rule that it is
unenforceable until the field exists** — the omission `CLAUDE.md` already warns about, where a rule
naming a path requires the path to exist at the moment the rule is written. **Report only; this
changes the assessment definitions and is a stop.**

---

# 3. CORRECTION APPLIED — L-0209

**Verdict unchanged at `undated-commitment`, asserted on the computed content before the write.**
`validate` VALID · `withdrawn-wording` OK, 29 corrections quoting what they withdrew (up from 27),
165 sibling comparisons, 0 withdrawn claims still asserted elsewhere.

**Four edits, all in one guarded operation:**

1. **`claimAtLaunch`** — *"The commitment is to a total length"* is withdrawn and quoted. It now
   reads **TWO LIMBS ARE ANNOUNCED AND ONLY ONE IS QUANTIFIED**: the 1,643 km fence, and a paved
   patrol track whose length is stated nowhere.
2. **`assessmentNote`** — **the 30 km and the 1.8 per cent are the fence alone.** Nothing retrieved
   bears on the track and no share of it can be computed at all.
3. **`revisitTrigger`** — the prose shadow. Corrected, with the stale clause quoted.
4. **`unmeasured[]`** — a third entry: *the length of the paved patrol track, and how much of it has
   been paved*, `never-defined`, because **there is no total against which any progress figure could
   be read.** The record now distinguishes two absences that look alike: the fence has a stated total
   and an unpublished numerator; the track has neither.

**I overstated this last batch and the correction is mine.** I reported *"a second limb nobody has
noticed"*. The record's `summary` and `caseFor` both carried the patrol track throughout. **The
defect was narrower and more interesting: the field that SUMMARISES the claim, and the arithmetic
built on it, treated a two-limb announcement as one.** A record can hold a fact in three fields and
still reason as though it did not.

**And it is a live instance of §2's gap.** The value stands on the quantified limb, which is what
`undated-commitment` requires; **no definition in the enum says anything about a second, unquantified
limb of the same announcement.** The record now says that rather than resolving it.

---

# 4. THE FIELD — REPORTED, AND NOT BUILT. The design requires an enum value the proposal does not contain

**Reporting before writing, as instructed. The design does not fit inside `shockExposure` alone, and
the stop condition is met twice.**

## What fits

`shockExposure` becoming an array of entries, each carrying **role** · **adjudication** · the shock
named · the existing prose verbatim as `why`. That is one field, and the array shape resolves one of
the four ambiguous records for free: **L-0012** (*"severely distorts the revenue trajectory and
precipitated the compensation dispute"*) becomes two entries, confound and cause, rather than one
sentence doing both.

## What does not — first stop: a missing `adjudication` value

The proposal's adjudication values are `accepted` / `limited` / `refused`. **L-0061 takes none of
them**: *"COVID intervened between passage and implementation and **is the stated reason** for much
of the delay."* The record names an explanation **offered by someone else and never says whether it
accepts it.** Forcing `accepted` asserts a judgement the record declined to make; forcing `refused`
inverts it; `limited` invents a degree.

**The honest value is a fourth — `unstated` — and it is not in the proposal, so this is a stop.**
Note that the corpus has already ruled on this exact shape once: `contestedGround` is optional
*"because minting a catch-all would absorb exactly the two records that are evidence this vocabulary
is short"*. The same argument applies and points the same way — but it is an enum decision, not
mine.

## What does not — second stop: the three event properties need a second thing

**window · shared-with-the-peer-panel · breaks-a-series** are facts about the EVENT, not about the
record. Putting them on each record is the duplication the proposal exists to remove — L-0021,
L-0184 and L-0186 already assert nettability three times, two one way and one the other.

**They need a shock object, Ruling 8 puts that in provenance, and Ruling 8 is blocked** by its own
first unsettled item: `ProvenanceRecord` requires `bridgeExists` — *"is there any accepted
reconciliation across the break?"* — which has **no referent for a shock that breaks no series**, and
requires `directionOfBias`, one of the three deferred inconsistent enums. **None of the five
remaining `type: shock` records breaks a series.**

## And a third thing, smaller, which is record work rather than field work

**Three of the 66 cannot be migrated without re-reading and re-authoring the record**: L-0049
(*"suppressed traffic and therefore exposure, flattering those years"* — confound or cause depends on
what is being measured, and the sentence does not say), L-0051 (the same, inside a `failed` verdict),
and **L-0091, which carries a typing decision and not an exposure at all** — the sentence that stated
Ruling 6's test before Ruling 6 existed. Migrating it would require writing a new sentence, which is
authoring.

## What I would build if the two stops were cleared, stated so the decision is priced

- `shockExposure` becomes an array; the prose survives **verbatim** as `why` on every entry, because
  it is where the judgement is.
- **Four gate assertions, each with its non-scope in its own header**: every reference resolves
  (does not bind whether the right shock was named) · a `type: shock` record states its own exposure
  (**fires today on L-0002**, one record, down from two since L-0216 left the class) · a record
  reasoning from an exogenous event has an entry or a stated absence (**a ratchet, as `seam-span`
  is** — the residual is semantic and it cannot gate on the heuristic alone) · a shock's properties
  are asserted once (**the only one that catches what no reading would**, and the one blocked by
  Ruling 8).
- **Migration: 66 records**, of which 63 are mechanical from a classification already verified
  exhaustive and disjoint, and 3 are authoring.

**Not built. Two stop conditions met — an enum value not in the proposal, and a second object the
proposal cannot create.**

---

**One correction applied, verdict unchanged and proven. Two reports. One class named in `CLAUDE.md`.
The field reported and not built.**
