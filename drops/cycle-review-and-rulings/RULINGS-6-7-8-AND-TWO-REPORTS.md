# Rulings 6, 7 and 8 written; two reports; one rule

Written 2026-08-06 against `65fd4bf`. **Three rulings and one rule written; two reports; one
proposal. No record authored or edited, nothing retyped, no enum member added or removed, no phase
opened. 0 verdicts moved**, proven by comparing `assessment` across all 223 ledger records between
HEAD and the working tree.

---

# 1. THE THREE RULINGS — written, and the stale count corrected

**Written into `CLAUDE.md`, the `type` usage note in `schemas/ledger.schema.json`, and the
`LedgerType` doc comment in `lib/types.ts`, in one commit.** `enum-parity` unchanged at *48 members
across 6 axes agree in schema, type and label map · 3 axes exempted by name*; **no enum member added
or removed.**

- **Ruling 6** — `shock` is external to the state's own decisions. **The line is whether an act of
  policy caused it** — not severity, and not whose asset failed.
- **Ruling 7** — type by what the record is about, not by what failed. **No third branch.**
- **Ruling 8** — a shock is provenance, not a ledger record. **With the two things it does not
  settle written into the ruling itself**, so they are inherited rather than rediscovered: where a
  shock that breaks no series lives, and that `ProvenanceRecord`'s own subject is a measurement
  dispute, so admitting shocks widens that definition — a schema question this ruling authorises
  nobody to answer.

## The stale count, corrected in the same edit

The `type` note read *"the external reading, which fits three of the five"*. **There are eight
`type: shock` records, not five**, and the old wording is quoted inside the correction so it can be
checked rather than taken on trust. On the external reading, measured: **four pass** (L-0002,
L-0021, L-0184, L-0186), **two fail** (L-0064, L-0216), **one is mixed** (L-0020), **one was
unreachable by the test as then stated** (L-0027) — which Ruling 7 now resolves without a branch.

---

# 2. REPORT — what would move under Rulings 6 and 7. **Reported, not applied.**

**Retyping is verdict-adjacent** — `type` is the axis `reachability`, `domain-coverage` and every
lens read through, and `L-0216` additionally holds an evaluative verdict. **The four named candidates
are reported here and the batch stops before any of them.**

**SCOPE: the 8 records with `type === "shock"` in `data/ledger/*.json`, each read in full in this
operation. Field test, exact, no keyword scan.**

| record | what the record is ABOUT (Ruling 7) | caused by an act of policy? (Ruling 6) | current | **would move to** |
|---|---|---|---|---|
| **L-0216** Indus Waters Treaty in abeyance | *"the **Cabinet Committee on Security decided** that the Treaty will be held in abeyance"* — a decision | **yes, wholly.** The Pahalgam attack is the trigger; the decision is the subject | `shock` | **`reform`** — the schema's *"a measure the state deliberately introduced"*. It is also the only one of the eight carrying a `claimAtLaunch` stated by the Indian government and the only one with an evaluative verdict (`partly`) |
| **L-0064** the 2020 migrant exodus | the migration, i.e. **the consequence of the four-hour notice** | **yes.** The record's own `caseAgainst` is quoted in the schema note for the proposition that the notice *"was a choice"* | `shock` | **`episode`** — a pattern over a span with no single act at its centre. Not `event`: the record spans 2020-03 to 2020-09 |
| **L-0020** COVID contraction **and fiscal response** | **two things.** The contraction is external; the fiscal response is a sequence of decisions | **mixed by construction.** `whatHappened`: *"India's depth was substantially policy and lockdown-driven"*; `caseAgainst`: *"points to lockdown design, not the pandemic"* | `shock` | **cannot be settled by retyping alone** — see below |
| **L-0027** IL&FS collapse | the default and the liquidity freeze — **a private company failing**, not the state's response to it | **no** — but not external either | `shock` | **`event`** under Ruling 7, because the record's subject is the failure itself and not a state response. **Ruling 7 is what makes this answerable without a third branch** |
| L-0002 taper tantrum | a US Federal Reserve signal | no | `shock` | **no move** |
| L-0021 US tariffs | a foreign executive act | no | `shock` | **no move** |
| L-0184 the fifty per cent wall | two US executive orders | no | `shock` | **no move** |
| L-0186 section 122 surcharge | a US proclamation under a US statute | no | `shock` | **no move** |

## L-0020 is the one the rulings do not finish, and it should be reported rather than forced

Ruling 7 types a record by its subject. **L-0020's subject is two things, and its title says so** —
*"COVID-19 contraction **and fiscal response**"*. On any answer to Ruling 6 the two halves take
different types: the contraction is external and is a shock; the fiscal response is a sequence of
state decisions and is not.

**So the honest options are a split into two records, or a decision about which half the record is
about — and both are more than a retype.** A split authors a record, which this batch may not do.
**Naming it is the deliverable**, and it is the fourth record in three batches where the defect is
one record carrying two objects: L-0041 (*"THIS RECORD BUNDLES A TRANSFER SCHEME AND A DATED
PROMISE"*), L-0108 (an annulment and a coverage gap in a central Act), L-0222 (an import target and a
production limb — where the record handled it correctly by scoring both), and now L-0020.

**And L-0020 has a second problem the retype would not fix: it carries no `assessmentNote` at all.**
A record whose type is about to move on a contested ground, with no stated reasoning of any kind, is
not a record a retype should touch first. **Write the note, then decide the type.**

## What a retype would cost, so the decision is priced

- `type` is read by the lens and domain machinery and by three gates; a change is a data change and
  runs the full build.
- **L-0216 is the only candidate with an evaluative verdict.** Retyping it does not move the verdict
  — `partly` is available on `reform` — but a `reform` record carrying a `claimAtLaunch` and a
  `partly` verdict comes into scope for the proposed `independence` field and for Ruling 2, which a
  `shock` record does not. **The retype has downstream obligations the rulings do not create but do
  expose.**
- Under **Ruling 8**, the surviving four external shocks (L-0002, L-0021, L-0184, L-0186) are
  candidates to leave the ledger for provenance — **and that is exactly what Ruling 8's first
  unsettled item blocks**: none of the four is a comparability break, so none has a provenance home
  under the ruling as written. **Ruling 8 therefore moves nothing today, and saying so is the point
  of recording the gap inside the ruling.**

---

# 3. REPORT — `failed` with unmeasured limbs. The population, and what a symmetric rule would say

**SCOPE: all 16 records with `assessment === "failed"` in `data/ledger/*.json`, EVERY ONE READ IN
FULL in this operation — `claimAtLaunch`, `assessmentNote` and `unmeasured[]`. A field test over an
exact population, not a keyword scan. The multi-objective judgement is a reading and is marked per
record.**

## The population: six of sixteen

| record | announced | scored on | unmeasured limb | does the note say so? |
|---|---|---|---|---|
| **L-0011** Demonetisation | **4** — black money in cash · counterfeit · terror financing · (later) digitisation | 2, both fail | 2, both entered in `unmeasured[]` | **YES, in terms**: *"Four objectives were announced. Two are measured in this record and both fail… The other two are NOT part of the ground for this verdict"* |
| **L-0016** Make in India | **2** — 25% of GDP · 100 million jobs | 1, decisively missed | the jobs target, entered as an absence | **YES**: *"TWO TARGETS WERE ANNOUNCED AND THIS RECORD MEASURES ONE… writing this note is what surfaced that"* |
| **L-0041** PM-KISAN | **2** — a transfer scheme · a dated doubling promise | the promise only | the terminal year, entered | **YES**: *"FAILED IS SCORED ON THE PROMISE ONLY… PM-KISAN ITSELF IS NOT WHAT FAILED"* |
| **L-0030** PSB privatisation | **2** — transfer two PSBs · improve efficiency | delivery only | efficiency — **unmeasurable because nothing happened**, and **not entered in `unmeasured[]` (key absent)** | **YES in substance**: *"THE MERITS OF PRIVATISING ARE NOT SCORED"* |
| **L-0013** Corporate tax cut | **2** — private investment revival · international competitiveness | 1 | **the competitiveness limb is neither measured nor entered.** What `unmeasured[]` holds is the counterfactual | **PARTLY** — the note says *"THE STATED OBJECTIVE"*, singular, while `claimAtLaunch` names two |
| **L-0051** Discom reform | viability **via three named measures** — cut losses · restructure debt · align tariffs | losses and the cost-revenue gap | **debt restructuring is not measured and not entered** | **NO.** The note treats *"financial viability"* as a single objective |

**The clean control is L-0222**: *"Both limbs were dated, both fell due, and both were missed…
PARTLY was rejected because neither limb was partially met."* **Two limbs, no unmeasured limb, and
the note says why `partly` was refused.** A `failed` record can be complete on this axis, and one is.

**A distinct seventh shape, named so it is not folded in:** **L-0067** announces one objective and
the *endpoint* was never measured — *"THE VERDICT RESTS ON THE TRAJECTORY, NOT ON THE TERMINAL YEAR,
AND THE TERMINAL YEAR DOES NOT EXIST."* That is an unmeasured **terminus**, not an unmeasured limb,
and a symmetric rule has to say whether it reaches it.

## The asymmetry, stated

**Ruling 2 says: any unmeasured limb prevents `worked`.** Its live population is **one record** — the
corpus has exactly one `worked` — and that record asserts its own compliance in prose.

**The `failed` side has six**, and **nothing governs it.** A verdict of failure resting on one of four
announced objectives is the same evidentiary question as a verdict of success resting on two of
three, and Ruling 1 already answers it in the other direction: *"a standard that converts missing
evidence into a negative finding is as unsound as one that converts it into a positive one."*
**Ruling 2 was written for the direction where the corpus had a problem and is silent on the
direction where it has six.**

## What a symmetric rule would say

Not "an unmeasured limb prevents `failed`" — that would be wrong, and L-0011 shows why: two measured
limbs failing on the government's own sources is a sufficient ground, and refusing the verdict
because a third limb is unmeasured would convert a demonstrated failure into a non-finding. **The
symmetry is not in the outcome; it is in the disclosure.**

> **Where a commitment states several objectives and the verdict rests on fewer than all of them,
> the record names which objectives ground the verdict, which do not, and why — and every ungrounded
> limb is entered as an absence.** The verdict is not restricted; the ground of it is stated. This
> applies to `failed` exactly as Ruling 2's disclosure applies to `worked`, and it is what four of
> the six records already do unprompted.

**Three consequences, and each is a live case:**

1. **L-0011, L-0016 and L-0041 already satisfy it** and are the model. L-0016's note records that
   writing the note is what surfaced the gap — **the discipline found the defect, not a gate.**
2. **L-0051 and L-0013 would move**, not in verdict but in note and in `unmeasured[]`: L-0051's debt
   limb and L-0013's competitiveness limb are announced, unscored and unrecorded anywhere.
3. **L-0030 shows a case the rule must handle explicitly** — a limb that is unmeasurable *because*
   the measure did not happen. *"Improve efficiency"* cannot be measured when no bank was
   transferred. **That is not a data absence and `reasonKind` has no value for it**; the honest form
   is a stated absence saying the limb was never reachable, which is a different fact from
   `not-published` and from `not-collected`.

**Report only. This changes the `failed` definition and therefore the `assessment` definitions, which
is a stop.** What it would take is one paragraph in the same three files Ruling 5 landed in, plus the
two note edits and the `L-0030` question above.

---

# 4. PROPOSAL — objectives as a list, for phase 17

**Proposal only. Nothing built, no schema written. This is the structure that makes Ruling 2 and its
`failed` counterpart auditable, and it is phase 17 work — it belongs with `independence`, not with
the shocks calibration.**

## Why it is needed, in one measurement

**The corpus has one `worked` record and it asserts its own Ruling 2 compliance in a sentence nothing
can check** — L-0151: *"No limb of the recommendation is unmeasured."* True, and unverifiable: no
field holds what the recommendation's limbs were.

**And the origin count for Ruling 2 was a count of self-narration.** The phase-15 sweep said, with
its scope stated honestly, *"eight records state multiple announced objectives **in their own
notes**"* — 5 `partly`, 1 `failed`, 2 `worked`. **Reading all 16 `failed` records finds six, against
that sweep's one.** The sweep measured what records say about themselves; every downstream use read
it as a census. **A rule whose population is measured by narration cannot be applied to the records
that did not narrate.**

## The three pieces, and what each takes

**1. The objectives, as a list.** `claimAtLaunch` is one string, absent on 137 of 223 records.
Ruling 2 operates on *"a commitment states several objectives"* — a fact held in no queryable form.

- **Shape:** `objectives[]`, each with the objective in the announcement's own words, and its source.
- **Cost:** it is a schema addition on the same axis as the proposed `claimAtLaunch` vocabulary
  (`NONE ANNOUNCED` / `NONE LOCATED` / `BENCHMARK`) and **the two should be designed together or
  they will contradict each other** — a record with `claimAtLaunch: NONE ANNOUNCED` must have an
  empty `objectives[]` and nothing yet says so.
- **Scope:** the 86 records carrying a claim today, plus whatever the `claimAtLaunch` backfill
  produces. **Not all 223** — Ruling 5's imposed duties also belong here, and a duty is an objective.

**2. A measurement state per objective.** Three values, and the distinction is already load-bearing:
`measured-and-met` · `measured-and-not-met` · `unmeasured`. **L-0222 turns on it** — *"A limb
measured and failed and a limb never measured are different situations"* is already written into the
phase-15 record and into Ruling 2's reasoning. **A fourth may be needed for L-0030's case**, a limb
unmeasurable because the measure did not occur.

**3. The link to `unmeasured[]`.** Several records already enter the limb as an absence — L-0011,
L-0016, L-0041, L-0047, L-0050, L-0054 — but **nothing says *this absence is the limb that bars the
verdict***, so the absence and the verdict are two facts a reader joins by hand. A reference from the
objective to its `unmeasured[]` entry closes it, and it is the cheapest of the three.

## What it would then make possible

- **Ruling 2 becomes a gate of the shape `enum-parity` already has**: for any record with more than
  one objective, if any objective is `unmeasured` then `assessment !== 'worked'`. Mechanical, silent
  on success, emitting its own scope. **Today R2 is a sentence in three files that nothing can apply
  and nothing can audit.**
- **The `failed` counterpart becomes checkable in the same pass** — every ungrounded limb has an
  absence entry, asserted rather than trusted.
- **L-0151's sentence becomes a fact the corpus holds** instead of a claim a reader must accept.
- **And the per-record defence closes on this axis.** Ruling 2 is written and still unenforceable;
  this is what writing a rule *and* holding its inputs looks like, and it is the difference between
  Ruling 2's state and `withdrawn-wording`'s.

---

# 5. THE RULE — a keyword count is not a finding until the members are read

**Written into `CLAUDE.md`, above *Assert per record, never sweep*, which it extends from candidate
LISTS to candidate COUNTS.**

> **A count derived from a keyword scan is not a finding until the members are read, and the term
> list is reported with the count or the count is not reported.**

**It was earned four times in three batches, all mine, and the fourth was found while writing this
batch:**

| the claim | on reading |
|---|---|
| *"38 records reason from an exogenous event"* | 39 / 40 / 48 / 52 depending on a term list never written down |
| *"22 records document a departure from the written definition"* | `departure` appears in **one** note; the other 21 *appeal to* the definition — the practice working |
| *"27 candidates split across six values"*, used to predict the next external finding | **~12** on reading |
| *"17 records defending a value boundary one record at a time"*, ranked second in the same prediction | **all 17 real, and 15 governed by a written definition or by `contestedGround`** — see below |

**Labelling a count as candidates does not stop it being spent as a finding.** In every one of the
four the label was there and the number was used one paragraph later to rank a risk or size a
population. So the rule is not *say it is a candidate* — it is **read the members, or state a bound
with the reading owed named.**

## The re-check — every count still standing, traced

**SCOPE: `STATE.md` in `drops/cycle-review-and-rulings/` and the four cycle documents. Each figure
traced to what emitted it.**

### Re-derived exactly, field tests, no term list needed — these stand

| count | test | re-derived |
|---|---|---|
| 223 ledger · 66 `shockExposure` · 137 `claimAtLaunch` absent | key-in / field equality | **exact, unchanged** |
| 8 `type: shock` · 6 carrying `shockExposure` · L-0002 and L-0216 without | field test | **exact** |
| **10 evaluative records with no claim recorded** | `assessment ∈ {worked,partly,failed,reversed}` ∧ `claimAtLaunch` absent | **exact — 10**, same ids: L-0077 L-0080 L-0081 L-0095 L-0097 L-0098 L-0104 L-0106 L-0108 L-0176 |
| 57 evaluative · 16 `failed` · 68 `contested` · 1 `worked` | field test | **exact** |
| 66 of 68 `contested` carry `contestedGround` | field test | **exact** — criterion 22 · interpretation 13 · evidence-withheld 11 · measure 10 · evidence-unobservable 6 · time 4 · absent 2 |
| seam-span 127 / 101 / 26 / 12 | **gate-emitted** (`seam-span-report`) | stands |
| citations 1,201 · T1 928 · T1F 19 · T2 84 · T3 28 · T4 134 · T5 8 | `citations()` / `tierCounts()`, the sanctioned accessors | stands |

### Corrected in this batch

- **The 17 (group A) — all real, and the group is nearly closed, not open.** Read individually: six
  argue `no-objective` against `reversed` and **cite the written `reversed` definition** (*"an
  intervention that acts on the world"*); four argue `contested` against `failed` and **carry
  `contestedGround: criterion` or `evidence-withheld`, which is a structured field recording exactly
  that judgement**; two argue `too-early` against neighbours whose definitions are fully written;
  two more cite `no-objective` against `contested`; one cites Ruling 1 by name. **Only two — L-0045
  and L-0055, on the `partly`/`failed` boundary — apply a distinction nothing structured holds.**
  **My prediction ranked this group second. On reading it is 2, not 17.**
- **The 27 (group C) → ~12**, corrected last batch and restated here.
- **The 8 multi-objective records → a count of self-narration**, not a census. Six `failed` records
  alone announce more than one objective.

### Standing as bounds, members unread — named rather than left as findings

| count | term list recorded? | members read? | status |
|---|---|---|---|
| group **B**, independence, **11** | yes, in `notegov.mjs` and the report | **no** | **bound.** Corroborated: `PROPOSALS-2026-08-06.md` states 11 independently, **and states no term list of its own** — two scans agreeing at 11 is evidence, and the ids are recorded here so the count stops being bare: L-0023 L-0026 L-0029 L-0035 L-0047 L-0052 L-0053 L-0076 L-0124 L-0151 L-0207 |
| group **E**, "no objective was stated", **29** | yes | **no** | **bound** |
| group **F**, correction history, **27** | yes | **no** | **bound** — and this group is gated by `withdrawn-wording`, so its members are asserted mechanically even though unread here |
| group **D**, external duty, **33** | yes | **partly** — the nine of Ruling 5 read | **bound above 9** |

**Nothing in the corpus's own data rests on any of the four bounds.** They appear in the inventory
and in the prediction, and the prediction is corrected above. **Reading B, E and F is queue work and
is recorded in `STATE.md` as such.**

### One count I could not trace, and it is now recorded rather than repeated

`PROPOSALS-2026-08-06.md`: *"11 of 223 ledger records state an independence finding in an
`assessmentNote`, **in four different vocabularies**."* The count re-derives; **the "four
vocabularies" does not — no enumeration of the four exists anywhere.** It is a reading, made once,
and it is load-bearing for the `independence` proposal's central argument that the axis drifts. **It
is not withdrawn — it is marked as unverified pending the group-B read.**

---

# 6. And the gate found one thing about itself

After Rulings 6–8 were written, `phase-name` was scoring **ten assertions inside its own source** —
its controls seed real contradictions on purpose — **and exempting every one, because the word
`WITHDRAWN` happens to appear in the doc comment above `SUPERSEDED_NAMES`.** A checker passing its
own fixtures on a coincidence of its own prose is the shape *"no checker imports from its own repair
path"* exists to forbid: the exemption would have survived any edit that removed the coincidence, and
nothing would have reported it. **Its own source is now out of scope BY NAME with the reason stated,
and a control asserts it on the seeded sentence.** Live run: *328 tracked text files · 6 phases named
in the table · 1 superseded name in scope · 8 disagreeing assertions, 8 exempted by name.*

---

**Three rulings and one rule written into `CLAUDE.md`, the schema and the type, in one commit. Two
reports and one proposal. Nothing retyped, no record authored or edited, no enum member added or
removed, no phase opened, 0 verdicts moved.**
