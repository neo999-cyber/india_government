# Phase 16 — shocks calibration. CLOSED 2026-08-06.

Closed against `cd65d87`. **Two migrations applied, two reports, and the close. No schema or enum
change. 0 verdicts moved and 0 types moved**, both asserted across all 223 ledger records.

---

# 1. MIGRATION — the multi-event split. Seventeen candidates, nine splits

**SCOPE: the 17 records that named more than one event and carried one entry.** Every one read with
its own title beside it, which is what the count could not do.

| outcome | n | records |
|---|---:|---|
| **split into two entries** | **9** | L-0014 L-0023 L-0038 L-0051 L-0052 L-0053 L-0058 L-0070 L-0073 |
| **not splittable — the events share a clause or one adjudication** | 5 | L-0017 L-0034 L-0041 L-0057 L-0067 |
| **false candidates — the "second event" is the record's OWN SUBJECT** | 2 | **L-0012** (GST, in the GST record) · **L-0072** (the 2020 restructuring, of the scheme the record is about) |
| **not a split, but the `event` value was WRONG** | 1 | **L-0027**, whose entry named *the IL&FS collapse* — the record's own subject — as its exposure. Corrected to *the AQR credit squeeze* |

**Gate-emitted: 66 entries → 75.**

**THE RULE THE SPLIT FOUND, and it is the general form of the L-0012 problem.** Cardinality is the
answer only where **each event occupies its own verbatim span AND its own adjudication**. Where two
events share a clause — L-0057's *"COVID … and the 2022 commodity shock …, **both of which** inflate
delay and overrun statistics"* — or share one refusal — L-0041 and L-0067's *"**Neither** explains the
shortfall in the pre-COVID years"* — splitting orphans the judgement from half its subject, which is
rewriting the sentence by other means. **So the array covers about half of what the count suggested,
and the other half is the same shape as the exemption.**

**Every span was asserted verbatim and asserted to reconstruct the original**: each entry's `why` is
a contiguous substring, in order, and the spans rejoin to the field's previous value modulo
whitespace. The script aborts otherwise.

**One exemption narrowed.** L-0051 was exempt because *"the 2021-22 coal price shock raised power
purchase costs sharply"* is either a mitigating cause or irrelevant noise. Split by event, its COVID
clause is a determinable confound and now carries a role; **only the coal-price entry remains
role-less.** The exemption is still keyed to the record in the gate, and that is now a wider scope
than the defect — stated here rather than left to be discovered.

---

# 2. MIGRATION — the exposure-less sixteen. Ten migrated, six were never exposures

**SCOPE: the sixteen records that reason from an exogenous event in their four prose fields and
carried no exposure entry — stable across two term lists since batch 1.**

**`why` was NOT TYPED.** The script takes an anchor phrase, finds the sentence containing it in the
record's own prose, and copies that sentence verbatim; a guard asserts the result is a substring of
the record. **The guard fired on the first attempt** — a hand-typed quote used a curly apostrophe
where L-0135 has a straight one — which is why the method changed from typing to extraction.

| record | domain | role · adjudication | quoted from |
|---|---|---|---|
| **L-0116** | kashmir | confound · **refused** | `caseAgainst` — *"The COVID justification has outlived COVID by four years, and the police chief said so himself…"* |
| **L-0099** | education | confound · **refused** | `caseAgainst` — *"no other state saw anything comparable in the same years, so this was a rule change and not a demand shift, a pandemic effect, or a reporting artefact"* |
| **L-0195** | foreign | confound · **refused** | `caseAgainst` — *"Presenting a COVID-trough comparison as the effect of an agreement signed two years later…"* |
| L-0105 | governance | cause · accepted | `caseFor` — the census postponement |
| L-0109 | education | confound · accepted | `whatHappened` |
| L-0135 | kashmir | confound · accepted | `caseAgainst` |
| L-0089 | governance | confound · **unstated** | `caseFor` |
| L-0092 | education | confound · **unstated** | `whatHappened` |
| L-0159 | federalism | cause · **unstated** | `caseFor` — the legal test |
| L-0222 | environment | confound · **unstated** | `caseFor` |

**Six were never exposures** and are reported rather than forced: **L-0079** and **L-0133** use the
lockdown as a date marker; **L-0161** and **L-0171** use *"through a pandemic"* as scene-setting in a
party's argument; **L-0185** and **L-0189** refer to *"the largest India-specific external shock"* as
a **cross-reference to another record**, not as their own exposure.

**Gate-emitted after both migrations:** *223 ledger records · **76** declare an exposure · **85**
entries · roles cause 23 · confound 45 · none-stated 9 · is-the-shock 4 · adjudication accepted 44 ·
limited 11 · **refused 7** · unstated 6 · 4 exempted by name · 1 frozen.*

## The shape the field does not hold, reported and not built

**Three of the corpus's refusal tests are not distinguishable in `adjudication`, and the field
records all three as `refused` or `unstated`.**

- **THE LEGAL TEST (L-0159).** *"The Compensation Act compensates loss 'arising on account of
  implementation of' GST, and a once-in-a-century pandemic is not implementation."* The shock is
  refused because **the governing instrument's own words do not reach it** — not because the trend
  predates it. **It is filed `unstated`, and that is correct rather than a gap**: the sentence is a
  party's argument inside a `contested` record, and the record declines between readings. **The field
  working as designed, and the test itself invisible.**
- **THE DISCRIMINANT TEST (L-0099).** A shared shock cannot explain a state-specific outcome, because
  *"no other state saw anything comparable in the same years."* Filed `refused`.
- **THE BASELINE TEST (L-0195).** The shock is refused **as a comparison base**, not as a cause. Filed
  `refused` — and the field cannot say that what was refused is the *use* of the event rather than
  the event's effect.

**What is missing is not an `adjudication` value.** It is a `basis` for the refusal — *predates ·
peer · legal · baseline · partitions* — and it is a fifth property, not a fourth enum member.
**Reported, not proposed as a build**: the phase's authorisation covered the field itself, and a new
property is a new field.

---

# 3. REPORT — the coverage asymmetry, and the controlling variable

**SCOPE: all 223 ledger records, 14 domains. Two rates per domain: the evaluative-verdict rate
(`assessment` in worked/partly/failed/reversed) and the exposure-declaration rate. Field tests,
exact. The rank statistics below are computed here, emitted by no gate, and descriptive only — 14
points.**

| domain | n | `reform` % | evaluative % | exposure % |
|---|---:|---:|---:|---:|
| infrastructure | 24 | 67 | 58 | 67 |
| poverty | 3 | 67 | 67 | 100 |
| welfare | 21 | 62 | 52 | 81 |
| banking | 13 | 46 | 54 | 100 |
| macro | 57 | 44 | 28 | 40 |
| environment | 14 | 43 | 50 | 43 |
| foreign | 42 | 43 | 19 | 21 |
| human-development | 8 | 25 | 25 | **88** |
| federalism | 52 | 23 | 23 | 17 |
| education | 21 | 19 | **38** | 29 |
| governance | 110 | 17 | 15 | 14 |
| employment | 12 | 17 | **8** | **75** |
| kashmir | 46 | 11 | 4 | 4 |
| defence | 10 | 0 | 0 | 10 |

**The two rates agree: ρ = 0.75.** Both are lowest in kashmir, defence and governance; both are
highest in poverty, infrastructure, banking and welfare.

## Their agreement is NOT evidence of two properties with a common cause. It is one property measured twice

**`reform` share predicts the evaluative rate at ρ = 0.91 — better than the two axes predict each
other (0.75), and better than it predicts exposure (0.69).**

That is the controlling variable and it is not subtle: **a domain's evaluative rate is very nearly a
restatement of what share of it is a deliberate measure.** A `reform` has an announced objective, so
it can be scored; an `episode` or an `institutional` record has none, so it cannot. Kashmir is 11 per
cent `reform` and defence is 0 — **so the low evaluative rate there is a fact about what those
domains contain, not a reticence about scoring them**, and reporting the two rates as independent
would have asserted a common cause where there is a common *ancestor*.

## The residual is the real finding, and it runs the other way

**Two domains break the pattern hard, and both break it in the same direction:**

- **employment** — 17 % `reform`, **8 % evaluative**, **75 % exposure**
- **human-development** — 25 % `reform`, 25 % evaluative, **88 % exposure**

**These are outcome domains.** They carry series and patterns that COVID confounds heavily and almost
no measures to score. **So exposure tracks whether a domain has measurable time series; the
evaluative rate tracks whether it has announced measures. Those genuinely are two properties, and
they come apart exactly where the corpus is about outcomes rather than about policy.**

**And the counter-residual: education is 19 per cent `reform` and 38 per cent evaluative** — twice
its reform share — because Ruling 5's imposed duties are scored there without any announcement to
score against.

## What this does and does not license on the site

**It licenses**: *the instrument scores where the state announced something, and records exposure
where something was measured over time; those are different questions and the corpus can now show
which domains have one without the other.* Employment is the illustration — nine of twelve records
carry an exposure and one carries a verdict.

**It does not license**: *the instrument covers Kashmir and defence thinly.* That reading is
available from the table and the controlling variable refutes it. **The one thing that IS a defect
was found and fixed in §2**: two kashmir records adjudicated a shock and had no entry, L-0116 among
them — so the axis missed real adjudications in a domain whose low base rate is otherwise genuine.

---

# 4. REPORT — the eleven consistent refusals, in a form the design phase can use

**SCOPE: the exposure entries whose adjudication is `refused` or `limited` and whose stated ground is
that the pattern predates the event. Eleven records; every `why` read verbatim.** This is the set
that is publishable where the accept-versus-verdict cross-tab is not, because each row is checkable
against the record's own sentence rather than against a distribution the corpus produced about
itself.

**One test, applied eleven times: DOES THE PATTERN PREDATE THE SHOCK?**

| record | verdict | what is refused | the evidence in the record's own words |
|---|---|---|---|
| **L-0016** Make in India | failed | that COVID explains the 25 % target being missed | *"the trajectory was already flat before 2020 and peers recovered faster"* |
| **L-0041** PM-KISAN | failed | that COVID explains the income shortfall | *"Neither explains the shortfall in the pre-COVID years the survey data cover"* |
| **L-0067** Doubling farmers' income | failed | the same, on the same instrument | *"Neither explains the shortfall in the pre-2020 years"* |
| **L-0063** Educated youth unemployment | no-objective | that COVID explains educated unemployment | *"the educated-unemployment pattern predates it and the ILO report's baseline runs from 2000"* |
| **L-0013** Corporate tax cut | failed | that COVID explains the absent capex revival | *"the pre-COVID slowdown was already underway (FY20 growth 3.9 %) and capex was already weak"* |
| **L-0042** Anaemia reversal | contested | that COVID explains the anaemia increase | *"too large to be attributed to the pandemic alone, and the pre-pandemic phase of fieldwork already showed the trend"* |
| **L-0055** Metro rail | partly | that COVID explains ridership underperformance | *"the underperformance against DPR predates the pandemic in most systems"* |
| **L-0059** Falling unemployment rate | contested | that COVID explains the agricultural shift | *"the agricultural share had already turned upward in 2019-20, before the pandemic"* |
| **L-0060** Female LFPR reversal | contested | that COVID explains the participation rise | *"The pre-2020 rise from 23.3 % to 30.0 % predates it"* |
| **L-0065** Structural transformation | no-objective | that COVID explains the reabsorption | *"the divergence from peers is a decade-long trend that predates it"* |
| **L-0046** Road safety | no-objective | that COVID explains the deterioration | *"the 2024 record is above pre-pandemic levels on any reading"* |

**Four more refuse or bound on a different ground, and they belong beside the eleven rather than
inside them:** L-0036 and L-0037 **partition by limb** (*"accounts for part of the deadline slippage
but not the functionality gap"*); L-0029 **inverts the direction**, limiting a shock in the
government's favour (*"India's starting infrastructure is what allowed it to capitalise"*); L-0016
additionally stacks a **peer** test and a **postdates** test into one sentence.

**And three refuse on grounds the field cannot name** — L-0099 discriminant, L-0195 baseline, L-0159
legal (filed `unstated`, correctly). §2 has the shape.

## For the design phase

**The unit is the row, not the count.** Each row is: the government's defence, the record's refusal,
and the evidence — three fields, all verbatim from the record. **A surface that shows the eleven
together makes one claim: an exogenous defence is tested against the pre-event trend, and here is
every case.** It requires no new data — the entries exist and carry `adjudication` — and it must not
be shown beside the accept/verdict cross-tab, which is method rather than evidence and would import
that circularity into a page that does not have it.

---

# 5. THE CLOSE

## What was built

**`shockExposure` became a structured field.** An array of entries carrying `event` (prose) · `role`
· `adjudication` · `why`. It was a single prose string on 66 records, doing two jobs with opposite
consequences for a verdict, read by nothing but its own page.

**Landed in one commit each time:** the schema; `lib/types.ts`; the label maps and the
`ShockExposures` component; the detail view; `value-renderings`; two new `enum-parity` axes;
`guarded-marks`; and **`tools/exposure.mjs` in the build with six two-sided controls.**

**The render guard was proven to fire before the view existed, on this axis** — a fifth `role` member
seeded into the schema alone was named against both the type and the label map, with no record
carrying it.

**Final state, gate-emitted:** *223 ledger records · 76 declare an exposure · 85 entries · cause 23 ·
confound 45 · none-stated 9 · is-the-shock 4 · accepted 44 · limited 11 · refused 7 · unstated 6 · 4
exempted by name · 1 frozen.*

## What was ruled

- **Ruling 6** — `shock` is external to the state's own decisions. The line is **whether an act of
  policy caused it**: not severity, not whose asset failed.
- **Ruling 7** — type by what the record is **about**, not by what failed. **No third branch** for
  domestic non-state events, because the type turns on the record's subject.
- **Ruling 8** — a shock is **provenance**, not a ledger record, **with its two unsettled items
  written into the ruling itself.**
- **Ruling 9** — the multi-objective disclosure rule. Restricts `worked` only; **`failed` stands with
  its ground stated**; `partly`, `contested` and **`too-early` named explicitly** are disclosure
  only. **It states its own unenforceability.**
- **The point-of-change rule** — a structured value never moves alone. **A rule and not a check**,
  because `type` and `contestedGround` return zero findable restatements at any precision and 31 of
  32 mentions of another value are correct.

Applied: **L-0216 → `reform`, L-0064 → `episode`, L-0027 → `event`.** L-0020 deliberately not
retyped — two subjects, and it now carries the `assessmentNote` it never had.

## What the calibration found

1. **THE FIELD'S POPULATION WAS SELECTED BY DOMAIN, NOT BY ADJUDICATION.** Ten records that
   adjudicated a shock carried no entry, and they concentrated in governance, federalism and
   kashmir. Fixed. **The residual asymmetry is genuine and is explained by `reform` share** (§3).
2. **THE ACCEPT-VERSUS-VERDICT CROSS-TAB IS METHOD, NOT EVIDENCE.** 44 records accept an exogenous
   explanation and none is `failed`; 7 refuse and 4 are. **The adjudication was assigned from the
   same prose the verdict rests on**, so nothing outside the corpus would have to change for the
   table to change. Countable and not answerable, and saying so is worth more than the table.
3. **THE CORPUS HAS ONE CONSISTENT REFUSAL TEST AND FOUR MORE IT CANNOT NAME.** Eleven records refute
   an exogenous defence on the pre-event trend; the legal, discriminant, baseline and partition
   grounds have no field. **The missing thing is a `basis` property, not an enum value.**
4. **CARDINALITY COVERS HALF OF WHAT THE COUNT SUGGESTED.** Nine of seventeen multi-event records
   split; five share a clause or an adjudication, two named their own subject, and one had the wrong
   event entirely.
5. **`term` COVERAGE MEASURES THE WRONG THING** — 50 of the events are COVID and `term` is when the
   measure launched. Any time-series question about shocks is unanswerable, which is the cost of the
   blocked event window made concrete.

## What is unbuilt, with its unblocking condition

**THE EVENT'S OWN PROPERTIES — window, shared-with-the-peer-panel, breaks-a-series — ARE NOT BUILT.**
They are facts about the event, not about any record; restating them per record is the duplication
the field exists to remove. They need a first-class shock object, **Ruling 8 puts that object in
provenance, and `ProvenanceRecord` requires `bridgeExists` — "is there any accepted reconciliation
across the break?" — which has no referent for a shock that breaks no series.** None of the five
remaining `type: shock` records breaks one.

> **THE CONDITION: the event stays prose until a shock breaks a series.** When one arrives it takes a
> provenance record, `event` becomes a reference to it, and the three properties land there. **This
> is written into the field's own schema description**, so a later cycle reads the condition where it
> reads the field.

## What carries forward

**`objectives[]` SEQUENCES FIRST IN PHASE 17**, ahead of `commitmentState`, `independence` and
`claimAtLaunch` — structurally, not by preference: **commitment state attaches to the LIMB on the
corpus's own usage, so it is a property of that array and not a sibling of it.** It carries Ruling
9's `grounds` flag, which was invisible until the rule was written.

| # | item | state |
|---|---|---|
| 1 | **`objectives[]`** — `text` · `quantified` · `measurement` (incl. `unmeasurable-no-event`) · **`grounds`** · `commitmentState` per limb · `unmeasuredRef`. Backfill 43 records by id, two authoring batches, no verdict moves. **Must be designed WITH the `claimAtLaunch` vocabulary or the two contradict.** | phase 17, proposed |
| 2 | **A `basis` for a refusal** — predates · peer · legal · baseline · partitions. A fifth property, not a fourth enum value. | new, reported |
| 3 | **L-0020's type** — split into two records, or decide which subject it is. | open, a record change |
| 4 | **Ruling 8's two unsettled items**, before any shock moves to provenance. | standing |
| 5 | **`direction` as a per-entry property** — L-0014 is the case. Measured, not proposed. | queue |
| 6 | The five unsplittable multi-event records and the four role exemptions. | frozen, named in the gate |
| 7 | Read group E (29) and F (27); convert the last bounds to counts. | queue |
| 8 | The eleven-refusal surface. | for the design phase |

Carried unchanged from the cycle: the RBI *Financial Stability Report* is not held; L-0219's sweep
stores nothing; seam-span's frozen twelve; arc B's one capability; the source cache; selection bias
in the review extracts; the independent review has not been run.

---

**PHASE 16 IS CLOSED.** Two migrations, two reports, five rulings, one field, one gate. **0 verdicts
moved and 0 types moved across the whole phase**, asserted at every write.
