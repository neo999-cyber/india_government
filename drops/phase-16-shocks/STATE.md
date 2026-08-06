# Phase 16 — shocks calibration. State. OPEN.

Opened 2026-08-06 from `c3b0710`. **Start a cold read at
[`drops/cycle-review-and-rulings/STATE.md`](../cycle-review-and-rulings/STATE.md)** — that cycle set
the rulings this phase works under. The phase list is in `CLAUDE.md` and nowhere else.

---

## Batch 1 — the retypes applied, three reports, one proposal

**Applied to `/data`:** three retypes and one `assessmentNote` written. **0 assessments moved**,
asserted on the computed content before the write and verified after against all 223 records. Logged
in `docs/verification-log.md`.

| record | from | to | ground |
|---|---|---|---|
| **L-0216** | `shock` | **`reform`** | Ruling 6 — the Cabinet Committee on Security's own decision of 23 April 2025. The Pahalgam attack is its trigger, not its subject. |
| **L-0064** | `shock` | **`episode`** | Ruling 6 — the exodus is the consequence of a lockdown notice the record's own `caseAgainst` calls a choice. |
| **L-0027** | `shock` | **`event`** | Ruling 7 — the subject is the IL&FS default itself, not the state's response to it. Ruling 6 does not reach it; Ruling 7 is what makes it answerable without a third branch. |

**TWO PROSE FIELDS WERE MADE FALSE BY THE RETYPE AND WERE CORRECTED IN THE SAME OPERATION.** L-0064
and L-0027 both carried *"This record is the shock"* in `shockExposure`. Each now quotes its
withdrawn wording and states what survives unchanged. **Had the retype touched `type` alone, both
records would have asserted a type they no longer carry, with every gate green** — `shockExposure`
is not a guarded mark and no gate reads what it says.

**Five `type: shock` records remain and they are not the five the old schema note meant:** L-0002,
L-0020, L-0021, L-0184, L-0186.

**L-0020 was deliberately not retyped and now carries the `assessmentNote` it never had.** It is the
one record of the four with two subjects — *"COVID-19 contraction and fiscal response"* — which take
different types on any answer, so no retype settles it. The note states the `contested`/`criterion`
reasoning the record had never given and records the type question as open, naming the two ways out
(a split, or a decision about which subject the record is), both more than a retype.

**Two of my own defects were caught by the gates before the commit**, both in the first draft of the
L-0216 note: a `→` outside the charset allowlist, and a false correction marker — *"previously
read"* — on a field where nothing was withdrawn. **A guard firing on a false correction marker is
the guard doing exactly what it was built for.**

---

## OPEN — what this phase carries

| # | item | state |
|---|---|---|
| **0** | **THE FIELD IS BLOCKED — two stops, batch 2.** `adjudication` needs a fourth value `unstated` (L-0061 names an offered explanation and never adjudicates it), and the three event properties need a shock object that Ruling 8 puts in provenance and cannot create. | **operator decision** |
| 1 | **L-0020's type.** Split into two records, or decide which subject it is. | **open, and it is a record change** |
| 2 | **Ruling 8 is not executable for the four remaining external shocks** — see below. | **blocked on Ruling 8's own unsettled items** |
| 3 | **`objectives[]` + measurement state + `unmeasured[]` link.** | phase 17, proposed |
| 4 | **The symmetric disclosure rule for `failed`.** | reported, changes the assessment definitions = stop |
| 5 | **A `reasonKind` for a limb unmeasurable because the measure did not happen.** | reported, enum change = stop |
| 6 | Read group E (29) and F (27); convert the last bounds to counts. | queue |
| 7 | Ruling 8's two unsettled items, before any shock moves to provenance. | standing |

Items carried unchanged from the cycle: the RBI *Financial Stability Report* is not held; L-0219's
sweep stores nothing; seam-span's frozen twelve; arc B's one capability; the source cache; selection
bias in the review extracts; the independent review has not been run.

---

## Batch 2 — the prose shadow, the multi-objective rule, one correction, one stop

Full account in [`BATCH-2.md`](BATCH-2.md). **0 verdicts moved, proven. One correction applied; two
reports; the field reported and NOT built.**

**THE PROSE SHADOW, named in `CLAUDE.md`** — *a prose field that restates a structured value goes
stale silently when the structured value moves, and no gate can see it.* The render gates prove a
prose field is THERE; none reads what it SAYS. **Measured over 223 ledger + 127 provenance records,
14 prose fields: 73 restatements on findable tokens, 32 naming a value other than the record's own,
and 31 of the 32 are CORRECT** — boundary defences, or dated rescoring history preserved under the
correction convention (L-0086, L-0127 and L-0134 all open *"Filed too-early"* and then carry the
dated rescore in the same field). **One was stale — L-0209's `revisitTrigger`**, still naming what
would move the record *"out of no-objective"* after it was rescored to `undated-commitment` and its
`assessmentNote` rewritten. **The defect is PER-FIELD: a rescore that rewrites one prose field leaves
its siblings asserting the old value.**
**THE FINDING IS WHAT THE MEASUREMENT CANNOT REACH.** `type` and `contestedGround` return **zero**
findable restatements at any precision, because `shock`, `event`, `episode`, `reform`,
`institutional`, `criterion`, `measure` and `time` are ordinary English words — **so the axis where
the defect actually happened is the one no mechanical check can see, and a gate built on this
measurement would report clean on the failure it was built for.** With a 31 : 1 correct-to-stale
ratio, a token check is the wrong instrument. **The answer is a rule at the point of change, not a
gate over the corpus: a structured value never moves alone.**
**AND ONE AXIS THE CORPUS DOES NOT HOLD AT ALL: `commitmentState`.** `CLAUDE.md` defines states
(a)–(d), L-0209 runs the test, L-0221 and L-0223 file limbs as *"commitment state (a)"* — **and there
is no such field on any schema.** A structured axis existing only in prose; a larger defect than the
one measured.

**THE MULTI-OBJECTIVE RULE — what it would say, and it CAN be written before `objectives[]`.** A
**disclosure** requirement, uniform across the classes, with one consequence each: `worked`
unavailable (R2, unchanged) · `failed` **verdict stands, ground stated** (restricting it would
convert a demonstrated failure into a non-finding — L-0011) · `partly` disclosure only (it is where
R2 sends records, so it must not also bar them) · `too-early` disclosure only **and the rule must say
so explicitly**, or eight records are swept in where the value's own definition expects an unmeasured
limb · `contested` disclosure only. **Three things it must not do:** make an unmeasured limb an
excuse (L-0030 is `failed` BECAUSE the measure did not happen); treat an **unquantified** limb as an
unmeasured one (L-0209 — an unmeasured limb has a denominator nobody published, an unquantified limb
has none at all); sweep in `too-early`. **Writing it first is what tells `objectives[]` what to
hold** — a flag for whether an objective GROUNDS the verdict, which is invisible until the rule
exists. It will be unenforceable until the field is built, and must say so.

**L-0209 CORRECTED, verdict unchanged.** Four edits in one guarded operation: `claimAtLaunch` now
reads TWO LIMBS ARE ANNOUNCED AND ONLY ONE IS QUANTIFIED, withdrawing and quoting *"The commitment is
to a total length"*; `assessmentNote` records that **the 30 km and the 1.8 per cent are the fence
alone**; `revisitTrigger` corrected; a third `unmeasured[]` entry for the patrol track,
`never-defined`, because there is no total against which any progress could be read. **I overstated
this last batch**: the `summary` and `caseFor` carried the track throughout. The defect was narrower
— **the field that summarises the claim, and the arithmetic built on it, treated a two-limb
announcement as one.**

**THE FIELD IS NOT BUILT. Two stop conditions met.** (1) **An enum value not in the proposal**:
`adjudication` needs a fourth value, `unstated` — **L-0061** names an explanation offered by someone
else and never says whether it accepts it, and `accepted`/`limited`/`refused` each assert a
judgement the record declined. (2) **A second object**: window · shared-with-peer-panel ·
breaks-a-series are facts about the EVENT, need a shock object, and Ruling 8 puts that in provenance
where `bridgeExists` has no referent for a shock that breaks no series — **and none of the five
remaining `type: shock` records breaks one.** Smaller third item: three of the 66 (L-0049, L-0051,
**L-0091**, which carries a typing decision and not an exposure) cannot migrate without re-authoring
the record.

---

## Report — the real multi-objective population: **43, not 8**

**SCOPE: the 86 of 223 ledger records carrying `claimAtLaunch` (field test, exact). Every value read
verbatim in this operation; the multi-objective judgement is a reading, the tally is mechanical.**

**43 of 86 announce more than one distinguishable objective — 50 per cent of records carrying a
claim, 19 per cent of the ledger.**

| verdict | n | records |
|---|---:|---|
| `partly` | 20 | L-0012 L-0017 L-0026 L-0029 L-0034 L-0038 L-0044 L-0047 L-0048 L-0053 L-0054 L-0055 L-0062 L-0093 L-0146 L-0198 L-0200 L-0212 L-0214 L-0221 |
| `too-early` | 8 | L-0061 L-0139 L-0153 L-0188 L-0194 L-0201 L-0204 L-0205 |
| `failed` | 7 | L-0011 L-0013 L-0016 L-0030 L-0041 L-0051 L-0222 |
| `contested` | 5 | L-0057 L-0110 L-0203 L-0224 L-0226 |
| `reversed` | 1 | L-0066 |
| `undated-commitment` | 1 | L-0209 |
| `awaiting-adjudication` | 1 | L-0143 |

**All 8 of the phase-15 sweep's members are confirmed. 35 more were found.** The sweep stated its
scope honestly — *"eight records state multiple announced objectives **in their own notes**"* — and
measured self-narration exactly right. **Every downstream use read it as a census, and the census is
5.4 times larger.**

### Does Ruling 2's reasoning survive the corrected base? Yes, and its live population is zero, not one

**R2 constrains `worked` alone. The corpus has one `worked` record and L-0151 is SINGLE-objective** —
FC-XIV's four "stated considerations" are considerations, not limbs, which is exactly what its own
note asserts (*"No limb of the recommendation is unmeasured"*). **So R2 today constrains no record at
all.** Last batch reported its live population as one; on the corrected base it is **zero**.

**The reasoning survives and the corrected base strengthens it.** R2 was never an argument about how
many records were affected; it was an argument that an unmeasured limb cannot support a definitive
positive verdict. What changes:

- **It is not an edge case.** Half of all claim-carrying records are multi-objective, so any future
  `worked` is more likely than not to be one.
- **It was calibrated on a population that no longer exists in the state that motivated it.** The
  sweep's two `worked` members, L-0026 and L-0029, both moved to `partly` in the 6 August pass.
- **The asymmetry is larger than reported.** 20 `partly`, 8 `too-early`, 7 `failed`, 5 `contested`,
  and R2 speaks to none of them. **`too-early` deserves naming: an unmeasured limb there is expected
  by the value's own definition, so a rule for `failed` must not sweep it in.**
- **One live defect surfaced by the read: L-0209.** Its `claimAtLaunch` announces the fence **and**
  *"a patrol track along the border will also be paved"*, while the record's own note says *"The
  commitment is to a total length."* **A second limb nobody has noticed, in the corpus's only
  `undated-commitment` record.** Reported, not acted on.
- **The `NONE ANNOUNCED` vocabulary already exists in the wild**: L-0208, L-0211, L-0215 and L-0217
  write *"No objective is announced"*, *"None stated"*, *"No target, quantity or date is announced"*
  into the field itself. Four records, unprompted — the same shape as `shockExposure`'s stated
  absences, and it strengthens the `claimAtLaunch` proposal.

---

## Report — a `reasonKind` for a limb unmeasurable because the measure did not happen

**The four current values, and why none fits.** `not-collected` (never gathered) · `not-published`
(exists, unreleased) · `withheld` (refused) · `never-defined` (no agreed definition). **The ladder's
own test is *whether the data exists*, asked of a holder.** L-0030's efficiency limb is not a fact
about any holder: no public sector bank was transferred, so there is no event whose efficiency could
be measured. `not-collected` is the least-false available value and **it makes a false assertion** —
it reads as a failure to gather, when the state's failure was elsewhere. `never-defined` is simply
false: the efficiency of a privatised bank is definable.

**The population cannot be measured by scanning `unmeasured[]`, and the reason is the finding.** A
scan of all 287 entries for did-not-happen language returned candidates that on reading are ordinary
data absences. **The clean instances carry no `unmeasured[]` entry at all** — L-0030 and L-0162 both
have the key absent. **The value's absence suppresses the entries rather than mislabelling them**,
which is a selection effect the search cannot see past. The honest statement is a floor:

| record | the limb | current |
|---|---|---|
| **L-0030** | *"improve efficiency"* — no PSB was transferred | **no `unmeasured[]` at all** |
| **L-0162** | whether an Art. 279A(11) mechanism would have resolved disputes — none was established | **no `unmeasured[]` at all** |
| **L-0143** | whether the Lieutenant Governor formed the s.15 opinion — *"either exists or the power has never been considered"* | `not-published`, **and the record names the ambiguity the missing value would resolve** |
| **L-0066** | farm-gate prices under the three Acts — stayed after four months | `not-collected`; a partial instance, the Acts did operate |

**At least four, and the search cannot find the ones that were never written.**

**What the value would say.** *The quantity is well defined and would be collectable, and the event
whose measurement it presupposes did not occur. The absence is a consequence of the measure's
non-delivery, not of any holder's collection or publication practice.* Three lines it must draw, each
against a value that already exists:

- **Not a counterfactual.** L-0013's *"private investment that would have occurred absent the rate
  cut"* is `never-defined` and correctly so — no agreed construction exists. **The new value is the
  opposite case: the construction is agreed and the event is missing.**
- **Not elapsed time.** `too-early` covers a measure in force whose evidence is accruing. Here the
  measure is not in force.
- **Not `not-collected`.** That value points at a holder. This one points at the measure.

**And it must not become an excuse.** The value records why a limb is unscored; it does not soften
the verdict. L-0030 is `failed` **because** the transfer did not happen, and the unmeasurable
efficiency limb is a consequence of the same fact — **a record must not use the new value to convert
its own central finding into a measurement gap.** That sentence belongs in the value's definition.

**Report only. An enum change is a stop.**

---

## Report — `PROPOSALS`'s "four different vocabularies", enumerated. The claim survives; both its numbers were wrong

**SCOPE: the 11 records whose `assessmentNote` matched the independence scan, each read in this
operation.**

**Two are false candidates.** L-0076's *"the agency-independence argument"* is the institutional
independence of a regulator — subject matter, not a source judgement. L-0124's *"what ended was an
independent instrument"* is a measuring instrument that ceased. **The population is 9, not 11.**

**The nine use five distinguishable forms, not four, and they were never enumerated anywhere:**

| form | records | example |
|---|---|---|
| **verdict on a named test** | L-0023, L-0052 | *"The independence test PASSES and passes cleanly"* |
| **a labelled clause** | L-0026, L-0029 | *"ON INDEPENDENCE: the qualifying source would be…"* |
| **search narration** | L-0047, L-0053, L-0207 | *"Independent evidence was searched for and found"* |
| **degree statement** | L-0151, L-0047 | *"one arm of the state measuring another, which is better than a body scoring itself"* |
| **implicit, the word never used** | L-0035 | *"documented by the most critical independent source, not by the government"* |

**The claim is NOT withdrawn — it is corrected and it comes out stronger.** *"11 of 223 in four
different vocabularies"* becomes **9 of 223 in five distinguishable forms**, and the argument the
proposal rests on — that the axis is stated inconsistently and cannot be re-applied — is what the
enumeration demonstrates. **Fifth over-count of mine caught by reading**, and the first found in
somebody else's document rather than my own.

---

## PROPOSAL — exposure as a property. The provenance side first

### What the provenance side actually carries, before anything is proposed for the ledger

**SCOPE: `schemas/provenance.schema.json` and `data/provenance.json`, N=127, read in this
operation.**

A `ProvenanceRecord` **requires** `id`, `title`, `whatChanged`, `when`, `affectsDomains`,
`directionOfBias`, `bridgeExists`, `sources`. **Two of those required fields presuppose a
comparability break:**

- **`bridgeExists`** — *"Is there any accepted reconciliation across the break?"* **For a shock that
  breaks no series the question has no referent**, and a boolean with no referent is not an absence,
  it is a false assertion in whichever direction it is set.
- **`directionOfBias`** — required, and it is one of the **three known-inconsistent enums** the
  instrument has recorded as deferred, *"a direction axis conflated with a defect-kind axis"*.
  Admitting shocks to provenance would populate a deferred axis with a new class of member.

**So Ruling 8 is executable today for a shock that breaks a series and for no other.** P-10 and P-21
are exactly that and already exist. **None of the four remaining external shocks — L-0002, L-0021,
L-0184, L-0186 — breaks a series**, so Ruling 8's first unsettled item is not a theoretical gap: it
means **Ruling 8 moves nothing in this phase**, and the phase's work is entirely on the ledger side.
Recording that plainly is the point of the ruling having carried its own unsettled items.

### The ledger side: two axes, not one

**SCOPE: the 66 records carrying `shockExposure`, classified by reading at `c3b0710`; exhaustive and
disjoint, 66 of 66, verified mechanically.** This batch's retype changed exactly two of them —
L-0027 now reads as a confound and L-0064 as an outbound confound, both of them having previously
been `is-the-shock`.

**AXIS 1 — ROLE. What the shock did.** `confound` 23 · `cause` 19 · `is-the-shock` 6 ·
`none-stated` 9 · ambiguous 4 · not-an-exposure 1 (L-0091 carries a typing decision) ·
sole-refusal 4.

**AXIS 2 — ADJUDICATION. Whether the record accepts it.** `accepted` / `limited` / `refused`. **15 of
66 limit or refuse the shock and only 4 do so as the whole of the field**, so refusal is a modifier
on a role and not a third role. The three states are already written in the prose: L-0054
*"accounts for a substantial share"* (accepted) · L-0037 *"explains part but not all"* (limited) ·
L-0067 *"Neither explains the shortfall in the pre-2020 years"* (refused).

**Why two axes and not one:** `partly` on L-0017 (*"the shock may have caused the win rather than
obscured it"*) and `partly` on L-0090 (*"attribution rests on two points either side of a shock whose
depth is unmeasured"*) mean opposite things and render identically today.

### The shock object: three properties, and where it lives is undecided by design

**window · shared-with-the-peer-panel or India-specific · breaks-a-series (and which provenance
record).** All three are facts about the event, and all three are currently restated per record —
which is what lets them drift. L-0021, L-0184 and L-0186 assert nettability three times, two one way
and one the other. **Where the object lives is Ruling 8's question and it is blocked**, so the
proposal is deliberately written so the reference resolves to *either* a provenance record *or* a
shock entry, and nothing downstream depends on which.

### The gate assertions, each with what it does not bind

1. **Every shock reference resolves.** Binds the reference; **does not bind whether the right shock
   was named.**
2. **A `type: shock` record states its own exposure.** **Fires today on L-0002** — one record, down
   from two, because L-0216 left the class. Binds presence; **does not bind content.**
3. **A record reasoning from an exogenous event in its four prose fields has an exposure entry or a
   stated absence.** **A ratchet, exactly as `seam-span` is** — the current candidate list is the
   sixteen, stable across two term lists; freeze the judged set, fail on anything new. **It cannot
   gate on the heuristic alone: the residual is semantic.**
4. **A shock's properties are asserted once.** Where a record's prose contradicts the shock object on
   nettability or window, name both. **The only one of the four that catches something no reading
   would**, because each sentence is correct in isolation and only their provenance differs — the
   shape of rule 5c.

**What none of them checks, and it goes in the header rather than being implied by a green line:
whether the exposure a record states is the right one.**

### What the corpus could then answer

*"Which verdicts are exposed to COVID"* — unanswerable today. The confound/cause separation, which
points opposite ways at a verdict. Whether a shock is netted or carried, consistently, which rule 8's
peer-index method depends on. And *"which records are downstream of this shock"*, which L-0022 and
L-0033 say in words and nothing can query.

**Proposal only. No schema written, no field added, no record touched by it.**
