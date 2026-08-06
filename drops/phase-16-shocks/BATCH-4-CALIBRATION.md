# Phase 16, batch 4 — the calibration. What the axis can now answer, and what it still cannot see

Written 2026-08-06 against `7e21886`. **Three reports and one proposal. No record touched, no schema
or enum change, 0 verdicts moved.** Every figure below is a field test over `data/ledger/*.json`,
N=223, exact — the axis is countable for the first time, which is what the phase existed to do.

---

# 1. REPORT — the cross-tabs, and the one that says something

**SCOPE: 223 ledger records, 66 declaring an exposure, 66 entries. Field tests, exact.**

## ROLE × VERDICT

| role | contested | failed | no-objective | partly | reversed | too-early | total |
|---|---:|---:|---:|---:|---:|---:|---:|
| cause | 8 | **0** | 4 | 6 | 1 | 0 | 19 |
| confound | 7 | 4 | 4 | 14 | 0 | 1 | 30 |
| is-the-shock | 1 | 0 | 3 | 0 | 0 | 0 | 4 |
| none-stated | 0 | 2 | 4 | 3 | 0 | 0 | 9 |
| exempt | 1 | 1 | 1 | 1 | 0 | 0 | 4 |
| **total** | 17 | 7 | 16 | 24 | 1 | 1 | **66** |

## ADJUDICATION × VERDICT — this is the one

| adjudication | contested | failed | no-objective | partly | reversed | too-early | total |
|---|---:|---:|---:|---:|---:|---:|---:|
| **accepted** | 12 | **0** | 4 | 15 | 1 | 0 | **32** |
| limited | 3 | 1 | 2 | 5 | 0 | 0 | 11 |
| **refused** | 0 | **3** | 1 | 0 | 0 | 0 | **4** |
| unstated | 0 | 0 | 1 | 0 | 1 | 0 | 2 |
| (none — role has nothing to adjudicate) | 2 | 3 | 8 | 4 | 0 | 0 | 17 |

**ACCEPTANCE AND FAILURE ARE DISJOINT.** Thirty-two records accept an exogenous explanation and
**not one is `failed`.** Four refuse one and **three are `failed`.** Every `failed` record that names
a shock either refuses it (3) or limits it (1); none accepts one.

**Two readings, and the second is the one that governs.** Substantively it is what method requires: a
record that accepts the shock as producing the outcome cannot then score the government as having
failed, because the shock did it. **But the adjudication is derived from the same prose the verdict
rests on, and it was assigned by the same reading.** So the table is not evidence about the world. It
is **evidence about the corpus's own reasoning being internally consistent**, which is worth knowing
and is a smaller claim. The instrument's own independence principle applies to its own new axis:
nothing outside this corpus would have to change for the cross-tab to change, so it is method, not
finding.

**The same caution kills the role × verdict table as a finding**: `cause` never appearing on a
`failed` record is the identical circularity one level out.

## COVERAGE BY DOMAIN — and this one is a finding, because it is about absence

| | declaring an exposure | of records in the domain | |
|---|---:|---:|---:|
| banking | 13 | 13 | **100%** |
| poverty | 3 | 3 | **100%** |
| human-development | 7 | 8 | 88% |
| welfare | 17 | 21 | 81% |
| employment | 9 | 12 | 75% |
| infrastructure | 16 | 24 | 67% |
| environment | 5 | 14 | 36% |
| macro | 20 | 57 | 35% |
| foreign | 8 | 42 | 19% |
| federalism | 7 | 52 | 13% |
| education | 2 | 21 | 10% |
| **governance** | 7 | 110 | **6%** |
| **defence** | 0 | 10 | **0%** |
| **kashmir** | 0 | 46 | **0%** |

**The axis covers the delivery domains and does not reach the institutional and rights domains at
all.** Part of that is correct — a record about AFSPA section 7 sanction disposal is not exposed to
COVID the way a construction programme is. **Part of it is not, and §3 proves it: the sharpest
refusal in the corpus is a kashmir record, and kashmir is 0 of 46.**

## COVERAGE BY TERM — and it measures the wrong thing, which is the cost of a blocked property

T1 44 of 74 (59%) · T2 16 of 74 (22%) · T3 6 of 64 (9%) · baseline 0 of 11.

**This looks like a claim about when shocks happened and is not one.** `term` is when the MEASURE
was launched; **50 of the 66 events are COVID, which falls in T2.** A reform launched in 2016 and
confounded by COVID counts as T1. **The exposure has no date of its own, because the event's window
is precisely the property Ruling 8 blocked** — so any time-series question about shocks is
unanswerable, and this table demonstrates the cost concretely rather than in the abstract.

## The events named

COVID-19 **50** · (none material) 4 · the 2022 commodity shock 2 · the 2022 heat shock 2 · the IL&FS
collapse 2 · and one each for GST, the 2014-16 oil collapse, the fifty per cent US tariff wall, the
section 122 surcharge, US tariffs on Indian goods, and the COVID-19 contraction.

**76 per cent of the axis is one event.** And the tail is an artefact of the migration, not of the
corpus: **17 records name more than one event and carry one entry** (§2). Demonetisation is named in
three records' prose and appears zero times as an `event`.

## What a reader would actually want, and only one of these is available today

1. **"Which verdicts are exposed to COVID?"** — **available now**, 50 records, one query. It was 66
   prose fields and no index.
2. **"Where does the corpus refuse an exogenous defence?"** — **available in the field** (§3) and
   **incomplete outside it**.
3. **"Which shocks affect which domains, and when?"** — **not available.** Needs the event's window
   and identity, both blocked.
4. **"Does accepting a shock predict a softer verdict?"** — **countable and not answerable**, for the
   circularity above. **Naming it as unanswerable is worth more than the table.**

---

# 2. REPORT — the two-value sentence, and what the array's cardinality already covers

**The operator's pairing does not hold, and the two records are different shapes.** L-0012 is a
sentence carrying two values. **L-0002 carries no exposure sentence at all** — it is `type: shock`
with the field absent, frozen because its exposure would be reflexive and it is scored against
nothing. One is a field problem; the other is an authoring gap in a record written before the field
existed. **The conclusion drawn from the pair is right about L-0012 and does not need L-0002.**

## The shape, sorted

**SCOPE: the 66 records declaring an exposure; distinct known events named in `why`, per record.
Word-boundary scan, term list stated, every hit read.**

| shape | n | does the array's cardinality cover it? |
|---|---:|---|
| **more than one EVENT, one entry** | **17** | **YES — this is exactly what an array is for.** The migration deliberately wrote one entry per record; splitting is a second pass, mostly at clause boundaries, and it changes no words |
| **one event, two ROLES, one clause** | **1** (L-0012) | **NO.** *"severely distorts the revenue trajectory AND precipitated the compensation dispute"* — splitting requires rewriting the sentence |
| **one event, role undetermined by the sentence** | **2** (L-0049, L-0051) | **NO.** Cardinality is not the problem; the sentence does not say which role |
| **not an exposure at all** | **1** (L-0091) | **NO.** It carries a typing decision |

**The seventeen:** L-0012 L-0014 L-0017 L-0023 L-0027 L-0034 L-0038 L-0041 L-0051 L-0052 L-0053
L-0057 L-0058 L-0067 L-0070 L-0072 L-0073.

**So the operator is right and the correction is mine again: two entries ARE the answer for 17
records, and for one of the four exemptions it is not.** L-0012 and L-0051 appear on both lists —
they are multi-event *and* their COVID clause is undetermined, so splitting them by event fixes the
cardinality and leaves the role question exactly where it was.

## Three things the split would surface that the single entry hides

- **L-0023** names four events in one sentence — IL&FS, the AQR squeeze, demonetisation and GST — and
  carries one. **Three of the four are invisible to the axis today.**
- **L-0014** gives the same role opposite DIRECTIONS: *"The 2014-16 oil collapse is a large positive
  confound at the start; COVID and the 2022 commodity shock are negative confounds mid-period."*
  Splitting by event exposes that `direction` — measured in batch 1 and deliberately not built — is
  a per-entry property and not a per-record one.
- **L-0052** carries a `cause` and a `confound` on two different events in one sentence — *"an
  external tailwind not attributable to policy; the 2022 commodity shock temporarily reversed some of
  it"* — so it is L-0012's problem solved by cardinality, which is the proof that the two shapes are
  genuinely different.

**Recommendation: split the seventeen as a mechanical pass; leave L-0012, L-0049 and L-0051's role
question exactly where the exemption puts it.** Not done here — it is record authoring across
seventeen records and the batch is sized at three reports and one proposal.

---

# 3. REPORT — the refusal set, and the test the corpus actually uses

**SCOPE: every exposure entry whose `adjudication` is `refused` or `limited`. N=15, field test,
exact. Every `why` read verbatim in this operation.**

**All fifteen name COVID-19. Every one.**

| record | verdict | adj. | what it refuses, and on what evidence |
|---|---|---|---|
| **L-0016** Make in India | failed | refused | *"the trajectory was already flat before 2020 and peers recovered faster. The 2025-26 US tariffs are a genuine late headwind but postdate the failure"* — **three tests in one sentence: predates, peer comparison, postdates** |
| **L-0041** PM-KISAN | failed | refused | *"Neither explains the shortfall in the pre-COVID years the survey data cover"* |
| **L-0067** Doubling farmers' income | failed | refused | *"Neither explains the shortfall in the pre-2020 years"* |
| **L-0063** Educated youth unemployment | no-objective | refused | *"the educated-unemployment pattern predates it and the ILO report's baseline runs from 2000"* |
| **L-0013** Corporate tax cut | failed | limited | *"the pre-COVID slowdown was already underway (FY20 growth 3.9%)… the pandemic cannot carry the whole explanation"* |
| **L-0042** Anaemia reversal | contested | limited | *"the anaemia increase is too large to be attributed to the pandemic alone, and the pre-pandemic phase of fieldwork already showed the trend"* |
| **L-0055** Metro rail | partly | limited | *"the underperformance against DPR predates the pandemic in most systems"* |
| **L-0059** Falling unemployment rate | contested | limited | *"the agricultural share had already turned upward in 2019-20, before the pandemic"* |
| **L-0060** Female LFPR reversal | contested | limited | *"The pre-2020 rise from 23.3% to 30.0% predates it"* |
| **L-0065** Structural transformation | no-objective | limited | *"the divergence from peers is a decade-long trend that predates it"* |
| **L-0046** Road safety | no-objective | limited | *"the 2024 record is above pre-pandemic levels on any reading"* |
| **L-0029** Digital public infrastructure | partly | limited | *"India's starting infrastructure is what allowed it to capitalise"* — **the only one that limits a shock in the government's FAVOUR** |
| **L-0036** Jal Jeevan Mission | partly | limited | *"accounts for part of the deadline slippage but not the functionality gap"* — **partitions by limb** |
| **L-0037** PMAY | partly | limited | *"explains part but not all of the slippage"* — partitions |
| **L-0044** Highways | partly | limited | *"though that year still recorded the peak pace"* |

## The pattern holds, and it is one test applied eleven times

**DOES THE PATTERN PREDATE THE SHOCK?** Eleven of the fifteen refute or bound an exogenous defence by
showing the trend was already there — *predates*, *already underway*, *already flat*, *pre-COVID
years*, *pre-2020*, *before the pandemic*, *a decade-long trend*. Two more partition by limb (L-0036,
L-0037). One inverts the direction (L-0029). One is a peer comparison (L-0016).

**That is a method, applied consistently, and it is publishable as one.** A government defence that
an outcome was caused by an exogenous event is tested against the pre-event trend, and the corpus
records the answer. **It belongs on the site, not in a cross-tab** — the cross-tab in §1 is
circular; this is a statement about how the instrument reasons, and it is checkable sentence by
sentence.

## And the sharpest instance is NOT in the set, which sizes the gap

**L-0116 carries no `shockExposure` at all**, and it is where the corpus does its best work on this
question:

> *"The COVID justification has outlived COVID by four years, and the police chief said so himself
> when he listed stopping glamorisation alongside stopping infection."*

**It is a kashmir record, and kashmir is 0 of 46 on the exposure axis.**

**SCOPE: the sixteen records that reason from an exogenous event in their four prose fields and
carry no exposure entry — the set is stable across two term lists, batch 1. Each read in this
operation.** Of the sixteen, **four are refusals** and **four are acceptances used as a defence**:

- **L-0116** — the justification has outlived the event.
- **L-0159** — *"The Compensation Act compensates loss 'arising on account of implementation of' GST,
  and a once-in-a-century pandemic is not implementation."* **A LEGAL test, not a trend test** — the
  shock is refused because the instrument's own words do not reach it. Stronger than anything in the
  fifteen.
- **L-0099** — *"no other state saw anything comparable in the same years, so this was a rule change
  and not a demand shift, a pandemic effect, or a reporting artefact."* **A DISCRIMINANT test**: a
  shared shock cannot explain a state-specific outcome.
- **L-0195** — *"Presenting a COVID-trough comparison as the effect of an agreement signed two years
  later."* **A BASELINE test**: the shock refused as a comparison base rather than as a cause.
- Accepted as a defence and unrecorded: **L-0089** (two pandemic years suppressed tabling),
  **L-0105** (census fieldwork halted 1 April 2020), **L-0161** and **L-0171** (compensation paid
  *"through a pandemic"*, the Union's own defence).

**So the corpus uses FOUR refusal tests and the exposure field sees only the first.** Trend
(inside), legal, discriminant and baseline (all outside). **The axis captures 15 adjudications and
misses at least 8 of the same kind, and the misses concentrate exactly where coverage is thinnest —
governance 6 per cent, federalism 13 per cent, kashmir 0 per cent.**

**That is the phase's real calibration result:** the field is right in shape and its population is
selected by domain, not by whether the record adjudicates a shock.

---

# 4. PROPOSAL — `objectives[]`, designed against two rulings

**Phase 17 builds it. It sequences ahead of `commitmentState`, `independence` and `claimAtLaunch`,
and the reason is now structural rather than a preference: commitment state attaches to the LIMB on
the corpus's own usage, so it is a property of this array and not a sibling of it.**

## What it holds

| field | why, and which ruling requires it |
|---|---|
| `text` | the objective in the announcement's own words |
| `quantified` | boolean. **Ruling 9's second prohibition**: an unmeasured limb has a denominator nobody published, an **unquantified** limb has none at all. L-0209's patrol track is the case |
| `measurement` | `met` · `not-met` · `unmeasured` · `unmeasurable-no-event`. The first three are already load-bearing — *"a limb measured and failed and a limb never measured are different situations"*. **The fourth is the `reasonKind` gap reported in batch 1**, L-0030's efficiency limb, and it belongs here rather than in `reasonKind` because it is a property of the objective and not of a holder |
| **`grounds`** | boolean. **Ruling 9's core requirement, and the field's whole reason for existing.** Does this objective ground the verdict? **Invisible until Ruling 9 was written** — design the field first and you get one that records measurement and not relevance |
| `commitmentState` | `(a)` · `(b)` · `(c)` · `(d)`. **Per limb**, because L-0221 and L-0223 already file limbs and not records that way |
| `unmeasuredRef` | index into `unmeasured[]`, so *"this absence is the limb that bars the verdict"* stops being a join a reader makes by hand |

## What it makes enforceable that is a per-record defence today

1. **Ruling 2 becomes a gate.** For any record with more than one objective, if any is `unmeasured`
   then `assessment !== 'worked'`. **Today R2's live population is zero and its one historical
   instance asserts its own compliance in a sentence nothing can check** — L-0151's *"No limb of the
   recommendation is unmeasured"*.
2. **Ruling 9 becomes a gate.** Every objective with `grounds: false` has an `unmeasuredRef` or a
   stated reason; every record whose objectives are not all `grounds: true` carries the disclosure.
   **Ruling 9 states its own unenforceability precisely because this does not exist yet.**
3. **`commitmentState` becomes checkable at all** — including the open question of whether (c) is
   assertable, which no record currently answers.
4. **The multi-objective population stops being a reading.** It is 43 today because I read 86
   `claimAtLaunch` values; after the field it is a query, and the phase-15 sweep's 8 could not have
   drifted to 43 unnoticed.

## What the backfill takes

**43 multi-objective records, and the population is known by id rather than estimated** — 20
`partly`, 8 `too-early`, 7 `failed`, 5 `contested`, 1 each `reversed`, `undated-commitment`,
`awaiting-adjudication`. The other 43 claim-carrying records take a single objective; 137 carry no
claim and are out of scope until `claimAtLaunch` is settled.

- **`text` and `quantified` are transcription.** The objectives are in `claimAtLaunch` already; four
  records write a stated absence there unprompted (L-0208, L-0211, L-0215, L-0217).
- **`grounds` is a READING, and it is the expensive part.** Four `failed` records state it already —
  L-0011, L-0016, L-0041, L-0030 each name which limbs ground the verdict and which do not — and
  L-0051 and L-0013 do not, so the field would surface two records whose verdict's ground is
  currently unstated. **Reading, not inference: a prior is not a value.**
- **`measurement` is a reading, bounded by the record**: the note usually says.
- **`commitmentState` is a reading and the smallest**, since only a handful of records currently
  reason in states at all.

**Realistically two authoring batches of ~20 records. No verdict moves** — Ruling 9 is a disclosure
requirement, and every consequence it carries except `worked` is disclosure only.

**One sequencing hazard, stated so it is not discovered:** `objectives[]` and the `claimAtLaunch`
vocabulary (`NONE ANNOUNCED` / `NONE LOCATED` / `BENCHMARK`) **must be designed together or they
will contradict each other** — a record with `claimAtLaunch: NONE ANNOUNCED` must have an empty
`objectives[]`, and nothing says so today. **And Ruling 5's imposed duties belong here too**: a duty
is an objective, so L-0095's RTE section 26 ceiling is an `objectives[]` entry with `grounds: true`
and no `claimAtLaunch` at all.

---

**Three reports and one proposal. No record touched, no schema or enum change, 0 verdicts moved.**
