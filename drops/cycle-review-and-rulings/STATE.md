# The adversarial-review and rulings cycle. State. CLOSED 2026-08-06.

**Start a cold read here.** This cycle sits between phase 15 (environment and energy, closed
2026-08-05) and phase 16. It authored no records. It changed what a record has to prove, applied
that to every record at once, and removed three records that could not meet it.

**If you read one thing: [`docs/the-pass-2026-08-06.md`](../../docs/the-pass-2026-08-06.md).** It is
the reader-facing account of the change and the list of every record that moved.

---

## The one-line spine

**Nine records said a measure worked. One does.** Not because the government did less than it was
credited with, but because the instrument was accepting the announcing body's own account of its own
performance as evidence that the performance happened.

---

## What the two review rounds found

Four external adversarial reviews, two rounds of two, by non-Claude frontier models given the corpus
as flat extracts with no repository, no `CLAUDE.md` and no second turn. All four are committed
verbatim in `review/returned/`. **Standing convention: external reviews land in `review/returned/`
and nowhere else, are never rebutted in the file, and are triaged against the commit they describe
(`059912b`), never against HEAD.**

### Confirmed, and acted on

| Finding | What it was | Outcome |
|---|---|---|
| **The `worked` sourcing asymmetry** | Success verdicts rested on 1–2 official releases; `worked` carried the lowest citation count in the corpus | **The governing principle, R1 and R1a.** Nine records rescored to one. |
| **`worked` awarded on a partly-met objective** | L-0026 announced two objectives and one was not established | **R2.** Appeared in all four reports, both families, both rounds — the most convergent finding in the set, and the brief had omitted it. |
| **The source ladder was not being followed** | Journalism, multilateral and foreign-primary citations tagged T1 | **R4 and the re-tiering.** T1 965 → 928. |
| **Self-citation** | Three records cited a private repository returning 404 | **The self-audit ruling.** Records removed; findings published at `/derivations`. |
| **`no-objective` meaning two things** | An undated but quotable promise filed as having no objective | **R3, `undated-commitment`.** |
| **`/method` desync** | The page said `overstates-pre-2014` was unattested; P-122 used it | Confirmed on all three instances. |

### Artefact — reviewer findings that did not survive measurement

- **`awaiting-adjudication` inconsistently assigned.** Half artefact: the records named already carry
  the value and a RESCORED marker; the reviewers were reading a pre-fix extract.
- **`too-early` on measures not in force.** Real as a definitional strain, but the extract had been
  cut such that the records' own reasoning was invisible.
- **The statutory double standard.** Named by both Gemini reports and by neither ChatGPT report — so
  **not cross-family convergent**, which the first brief had wrongly claimed. Open, not confirmed.
- **`not-published` at scale.** The reviewers' count came from an extract that stripped the search
  language; the corpus's own C.5 rule was already being applied unevenly, which is a real but
  smaller finding.

### My own errors inside the cycle, since they bear on how the reviews were read

- **Batch 7 called pass A's L-0026 finding "defeated"** because the note explains the choice.
  Overturned in batch 9: *a record that explains why it departs from the definition has documented a
  departure, not authorised one.*
- **Batch 9 triaged pass B as one review.** The second file was `.docx`, not `.doc`. Corrected in
  batch 12; the convention above exists because of it.
- **Batch 10 claimed `source-response-check` had found the MEA JavaScript shell.** It had not — MEA
  returned HTTP 200 at 78 KB, unflagged. Withdrawn in batch 11.
- **The extract generator manufactured a review finding** by cutting 87 per cent of `assessmentNote`
  and the correction marker from 49 of 173 records.

---

## The five rulings

All 2026-08-06, all in `CLAUDE.md`, the `assessment` definition in `schemas/ledger.schema.json` and
the `Assessment` doc comment in `lib/types.ts`.

> **The governing principle: no record or claim stands on a source that is not credibly independent
> of what it establishes.**

It asks a different question from the ladder. **The ladder grades the artefact; this grades the
relationship between the artefact and the claim it is made to carry.**

1. **R1** — `worked` requires evidence independent of the announcing body. **Where none exists the
   record is not `failed`** — unestablished is not negative, so `partly` or `contested`.
2. **R1a** — intra-state evidence qualifies **where the measuring institution published the figure as
   part of its own statutory or routine function**, and fails where it appears in support of the
   claim. The test is on the publication, not the institution. The source must bear on the limb in
   dispute and the document must be **held**.
3. **R2** — an unmeasured limb prevents `worked`. Governs the class. No centrepiece exception.
4. **R3** — `undated-commitment`: stated, quantified, no deadline, cannot fall due. **Progress is
   reportable even though it can never become overdue.**
5. **R4** — `T1F`: a foreign national government primary. A letter, not a number, because the
   ladder's numbers descend in strength and a foreign gazette is not weaker than a contested index.

And the rule the pass itself earned: **every rule is evaluated against one snapshot and the corpus is
written once**, because the qualifying sources for three records were the same citations another rule
was re-tiering, and serial application would have let the order decide three verdicts.

---

## The pass

`tools/pass-2026-08-06.mjs`, one read, one write. Full account in
[`docs/the-pass-2026-08-06.md`](../../docs/the-pass-2026-08-06.md).

- **Verdicts:** L-0151 survives. L-0023 fails R1a outright. L-0052 passes R1a cleanly and falls on
  R2. L-0026, L-0029, L-0047, L-0053, L-0207 → `partly`. L-0014 → `contested`. **None to `failed`.**
- **Searches ran first, so records were scored on evidence rather than its absence.** Bhutan's MoENR
  (T1F) for L-0207; CAG Report No. 6 of 2024 for L-0047, which finds the target missed every year of
  2017-22; World Bank/S&P CPPI 2025 for L-0053, which supports the record. **One search cut against
  the record and one for it.**
- **Tiers:** A 10 → T4, B 4 → T2, D 19 → T1F, E stays T1, C gone with its records. **T1 965 → 928.**
- **Ledger 226 → 223. Corpus 682 → 679.**
- **Backfill:** 23 withdrawn wordings recovered from git; 34 fields exempted because the field did
  not exist before the correction; `tools/withdrawn-wording.mjs` now gates it.

---

## OPEN — what phase 16 inherits

| # | Item | State |
|---|---|---|
| 1 | **The RBI *Financial Stability Report* is not held.** Six routes named on each dependent series; `rbidocs.rbi.org.in` refuses the TLS handshake from this environment. | Blocks R1a passing for L-0026 and L-0029 on one limb. **Not "not published" — not retrieved by this client.** |
| 2 | **L-0219's 139 unaddressable and L-0218's three channels** assert results of a live sweep that stores nothing. | Findings survive at `/derivations` §3. **Fix: have `source-response-check.mjs` write a dated result file into the corpus.** Data change, not schema. |
| 3 | **`undated-commitment` has one member.** L-0209 moved. L-0213, L-0187 and L-0210 were tested and do **not** qualify — see below. | Re-test if any of the three acquires a quantity. |
| 4 | **Seam-span triage** — `seam-span-report` emits 127 record-by-break spans, 92 declaring the break and 35 not. **Re-run 2026-08-06: the 125/34 carried in this file until then was stale.** | Untouched this cycle. |
| 5 | **Arc B's one capability** (phase 15 deferral). | Untouched. |
| 6 | **The source cache** — three costed options, none chosen. | Untouched. |
| 7 | **Selection bias in the review extracts.** 73 of 226 records were shown, chosen under criteria two of which carry a judgement threshold. | Logged. The reviewers said they could not tell whether the selection overstates or understates prevalence, and neither can the instrument. |
| 8 | **A self-audit layer.** See below. | **Open design question, not a closed decision.** |
| 9 | **The independent review has not been run** in the form `/method` specifies — domain economist, media lawyer. | Standing. The four adversarial passes are not those. |

### Why the three `undated-commitment` candidates did not move

Decided against the definition's own words — *stated and quantified, no deadline*.

- **L-0213 (IMEC)** — the record's own text: *"At signature, a description rather than a target."*
  The only quantified figures are benefit claims made nineteen months later (costs down *up to* 30
  per cent), which are not commitments and carry no floor. **Not quantified. Stays `no-objective`.**
- **L-0187 (US forced-labour tier)** — the criterion is a **United States** determination, and no
  Indian announcement of India's own prohibition has been retrieved. Scoring it would infer an
  objective from a foreign agency's account. **Not an Indian commitment. Stays `no-objective`.**
- **L-0210 (Free Movement Regime)** — stated and undated, and **binary rather than quantified**;
  there is no total to measure progress against. **Stays `no-objective`.**

**L-0209 moved and carries progress**, which is what the value exists to make possible: 30 km of the
stated 1,643 km, given in Parliament on 12 March 2026 — 1.8 per cent, twenty-five months after the
announcement, and the commitment still cannot fall due. The figure is **relayed and T4**, because the
Ministry publishes no kilometres-fenced series, which is this record's standing finding.

---

## The self-audit departure — a cold read needs this, and it is not settled

**Three records left the ledger on a rule about independence, not on their merits.** L-0218, L-0219
and L-0220 were not found wrong. Nothing in the pass disputes what they established. They were
removed because a derivation over the corpus's own `/data` is at no distance from the event it
reports, and a source is not independent of what it establishes when it **is** what it establishes.

**Their findings are published where the corpus's own structure cannot reach them.** `/derivations`
carries the arithmetic and prints the rule beside every number — which is *more* checkable than the
records were, since those cited a private repository returning 404. But the page is not a record: it
has no verdict, no `caseFor` and `caseAgainst`, no declared absences, no caveat, no revisit trigger,
and no place in any cross-tab. Section 5 of that page states this explicitly rather than leaving it
to be noticed. **A reader comparing the corpus over time sees three ledger records disappear and
none of them was withdrawn on its merits.**

**The open question: is a self-audit layer, distinct from the scored ledger, worth building?** The
instrument already has four layers with different obligations. A fifth — findings about the corpus,
carrying reasoning and absences and triggers but no verdict and no tier — would let a self-audit keep
the structure that makes a finding auditable without pretending to an independence it cannot have.
**Against it:** a layer with one occupant class is over-engineering, `/derivations` may be enough,
and every layer added is a schema, a view, a set of gate obligations and a render assertion. **The
test proposed for any future record, and the thing to decide the layer question against: would
anything outside this corpus have to change for the finding to change?** If nothing would, it is
method. Whether method deserves the apparatus of a record is undecided.

---

## Phase 16 opens against

- **The corpus as it stands:** 679 records — 223 ledger, 127 provenance, 269 series, 60 pairs. One
  `worked`. 1,201 citations, T1 928, T1F 19, T2 84, T3 28, T4 134, T5 8.
- **The rulings as method,** not as a pending decision. The five above govern authoring from now on:
  a new `worked` verdict must name its independent source and say which of the three degrees of
  independence it has; a multi-objective commitment with any unmeasured limb is `partly` on sight;
  a quantified undated promise takes `undated-commitment` and reports progress.
- **The guards as they exist,** ten in the build: `validate`, `enum-parity`, `no-bare-root`,
  `no-unguarded-prose-field`, **`withdrawn-wording`** (new this batch), `figure-consistency`,
  `manifest`, `reachability`, `field-render-audit`, `domain-coverage` — plus `validate:selftest` and
  `typecheck` in `npm run commit`. Every one is silent on success, emits its own scope, and refuses a
  stale build.

**No open items beyond the nine listed.** Phase 15 closed with none of its own; this cycle adds items
1, 2, 3 and 8, and carries 4, 5, 6, 7 and 9 forward unchanged.


---

## AFTER THE CLOSE — 2026-08-06, `699f135` and the batch that follows it

**CORRECTED 2026-08-06 at `fa518f4`, and the correction is quoted rather than made silently.** This
paragraph read: *"**Phase 16 is the COUNTERFACTUAL ENGINE**, fixed in `CLAUDE.md`. The name *shocks
calibration* came from a note outside the repository and was withdrawn on checking."* **That was
withdrawn on the operator's correction.** The phase list now lives in `CLAUDE.md` — **16 shocks
calibration · 17 independence · 18 design lock · 19 polish** — and the counterfactual engine is
recorded there as **considered and declined**, with the reasoning, rather than as unbuilt.

**The sentence above stood in this file for one commit after `CLAUDE.md` said the opposite** — and
this is the cold-read entry point. The defect the phase list was written to prevent had reappeared in
the file that points at it, pointing the other way. **There is no canonical phase list anywhere in
this repository except `CLAUDE.md`'s table; read it there and treat any phase name asserted from
memory, including from this file, as a premise.**

**RULED: engine output may not be cited by a scored record.** Own layer, rendered visibly unlike
measured data, never in a record's `sources[]`. Written beside the self-audit rule because both
answer one question.

**Three proposals and one triage: [`PROPOSALS-2026-08-06.md`](PROPOSALS-2026-08-06.md).**

- **Seam-span triaged, all 35.** Narrowing to one-sentence co-occurrence gives 21; reading all 21
  gives **6 GENUINE cross-seam comparisons in 2 records** — L-0060 (`lfpr-female` @ FY2017-18, an
  NSS-era figure set against PLFS-era figures) and **L-0150, which carries five of the six** and is
  the flagship federalism claim. **Corrected rate 6 of 127 = 4.7 per cent**, against a raw 27.6.
  12 are false positives; **3 (L-0182) are DECLARED IN SUBSTANCE and missed because the `declared`
  predicate accepts only a provenance id or the period string, not an explanation in prose.**
  **It can gate as a RATCHET** — fix the 6, widen the predicate, freeze the 12 with their judgements,
  fail on anything new. It cannot gate on the heuristic alone: the residual is semantic.
- **Domain asymmetry: THE DATA CANNOT ANSWER IT.** `claimAtLaunch` is optional and **empty on 137 of
  223 records**, and in every low-evaluative domain **not one record STATES that no claim was made** —
  the field is simply unfilled. An empty field and a stated absence are different facts. The `type`
  distribution points at *no announced measure* (kashmir: 27 of 33 `episode`/`institutional`,
  `reform` 2; defence: `reform` 0), offered as an inference, not a measurement.
  **THE ONE FINDING THAT IS ABOUT THE INSTRUMENT: 10 records carry an evaluative verdict with NO
  claim recorded at all** — L-0077, L-0080, L-0081, L-0095, L-0097, L-0098, L-0104, L-0106, L-0108,
  L-0176 — scored against a statutory, constitutional or judicial benchmark **the record does not
  state**. That is the reviewers' statutory double standard, located and counted. Fix is prose.
- **An `independence` field is proposed and NOT built** (schema change = stop): values `none` /
  `intra-state` / `external`, scope = the 57 evaluative records, a gate that checks a judgement was
  made and is not contradicted by the citations while saying plainly it cannot check the judgement,
  and a backfill of 47 records confirmed by reading rather than inferred.
- **Engine rendering proposed:** hatched band never a solid line, a band never a point, both methods
  always in one frame, a permanent in-plot label *"Modelled — not measured"*, a different verb in
  captions, and no shared axis with a scored verdict.

---

## THE STATUTORY-BENCHMARK TRIAGE, THE 38/66 RECONCILIATION, AND THE CALIBRATION SCOPE — 2026-08-06

Full account in [`PHASE-16-CALIBRATION-SCOPE.md`](PHASE-16-CALIBRATION-SCOPE.md). No records
authored, none edited, no schema touched, no verdict moved.

**THE STATUTORY DOUBLE STANDARD IS TRIAGED — the charge is not confirmed, and it finds a real defect
it mislocates.** All nine records Gemini named read in full. **Seven of nine are correctly
distinguished**: L-0095, L-0106 and L-0162 score `failed` against an instrument imposing an
obligation on an identified duty-holder with measured non-performance; L-0108 is different in kind
(its benchmark is the process's own object and the failure is adjudicated); and L-0094, L-0154 and
L-0164 have no breached obligation at all — Art. 281 was *complied with*, and L-0164's whole finding
is that Arts. 200–201 impose no period.

**THE FINDING IS THAT THE RULE DISTINGUISHING THEM IS NOWHERE WRITTEN.** `failed` and `no-objective`
are both defined around *the government's own announcement*, and neither reaches a duty imposed by a
statute, the Constitution or a court. Four records score `failed` against exactly such a duty, on a
discriminator that exists only in each record's own `assessmentNote`. **The sharpest instance:
L-0209 (quantified, undated) is `undated-commitment` by written rule; L-0210 (binary, undated) is
`no-objective` by written rule; L-0162 (binary, undated, constitutional "shall") is `failed` by no
written rule at all.** On the corpus's own text an adversary reading L-0210 beside L-0162 gets
Gemini's finding and there is nothing to answer them with. **Writing the rule is a change to the
`assessment` enum's governing definitions and therefore A STOP. Reported, not acted on.**

**Two records carry unfinished business and neither is a rescore:**
- **L-0167** — if the Presidential Order of 28 May 1990 constituting the Inter-State Council under
  Art. 263 prescribes a minimum meeting frequency, the record acquires the L-0095 shape exactly
  (quantified duty, identified body, zero meetings in ten years) and is `no-objective`. **The Order
  was NOT RETRIEVED in this run** — `interstatecouncil.gov.in` pinned to 164.100.252.222 refused 443
  and redirected 80 to it; two Internet Archive captures 404; `www.mha.gov.in` pinned to 94.206.5.97
  on three paths, all 404. Secondary summaries located and **not adopted** (coaching sites, and they
  disagree between "may meet" and "shall meet"). **Not retrieved by this client, not "not published".**
- **L-0122** — the record establishes on both custodians' attestations that no written criteria for
  the AFSPA s.7 power exist. AFSPA s.7 itself imposes no standard on the grant rate, so this is not a
  s.7 breach. Whether another instrument requires such norms to exist and be published is unasked;
  **RTI s.4(1)(b)(iv) is named as a candidate only and was not retrieved.** A retrieval, not a rescore.

**Class bound (candidates, not findings): 57 of the 170 records carrying a non-empty
`assessmentNote` match a benchmark-language scan of that field alone — 8 `failed`, 12 `no-objective`,
18 `contested`, 9 `partly`.** Half of every `failed` verdict in the corpus reasons from benchmark
language. Three of Gemini's five `no-objective` records (L-0094, L-0122, L-0154) do not appear at
all, because their notes name no instrument.

**38 AGAINST 66 — different fields, different populations, different KINDS of measurement. Neither
is wrong; one is not reproducible as it was stated.** **66** is `'shockExposure' in record` over all
223 ledger records — exact, deterministic, and it re-derives to 66 with zero present-but-empty.
**38** was a word-boundary keyword scan of `assessmentNote`/`caseFor`/`caseAgainst`/`whatHappened`
**whose term list was never recorded**, and the count moves with it: **39** at a 5-term core, 40 with
morphological variants, 48 at 11 terms, 52 at 19. **The load-bearing sub-claim survives intact**: the
sixteen records carrying neither field are byte-identical at the two defensible lists, and **L-0222
is the only evaluative one in both**. Every record the wider lists add is a false positive on reading
the context — `sanctions` matching disciplinary sanctions and CAATSA, `tariff` matching Bhutanese
electricity tariffs eleven times in L-0207. **Carry the sixteen ids and the term list forward, not
the number.** Also: 45 of the 68 records carrying an exposure field use no exogenous-event language in
those four prose fields, which is the normal case — the field is where a shock is *named*, the four
fields are where it is *argued*.

**PHASE 16 SCOPE — exposure as a property. Proposal only.** `shockExposure` is prose on 66 records,
rendered at `app/ledger/[id]/page.tsx:124` and read by nothing else in the repository — no index, no
filter, no cross-tab, no gate. It is already doing three unmarked jobs with opposite consequences for
a verdict (**confound** / **cause** / **counter-explanation refused**), plus a reflexive fourth. A
shock as a first-class object = **window · shared-with-the-peer-panel or India-specific · breaks a
series (and which provenance record)** — the three properties the prose already restates per record,
and where restating them is what lets them drift (L-0021, L-0184 and L-0186 assert nettability three
times, two one way and one the other). Four gate assertions proposed, the fourth being the only one
no reading would catch. **The eight `type: shock` records are not the corpus's shock inventory** —
the events actually reasoned from include GST, demonetisation, the 2014-16 oil collapse, the 2022
commodity and heat shocks and the AQR squeeze, most with no record of their own.

**MUST BE SETTLED BEFORE PHASE 16 OPENS — stated, not settled, on the standing rule against resolving
a taxonomy inside the phase that uses it:**
1. **Is `shock` external-only?** The schema's usage note states the external reading and admits it
   does not hold. **The note is stale in both its numbers — it reads "fits three of the five" against
   EIGHT `type: shock` records at `fa518f4`.** Members against the external reading: **L-0027**
   (IL&FS, named in the note), **L-0064** (migrant exodus, named), and **L-0216** — the Indus Waters
   Treaty abeyance, **not named because it postdates the note**, and it is the Cabinet Committee on
   Security's own decision, i.e. the schema's definition of `reform`. **And L-0091 applies the
   external test explicitly and declines shock typing for it.** The inconsistency has four members,
   not one, and L-0091 is where the test is already written.
2. **Is being a shock and being exposed to one one axis or two?**
3. **Does a shock become a record, a provenance entry, or neither?** The corpus does all three today.
   This is the gating question — it decides whether the phase is a layer, a use of provenance, or a
   field.
4. **Are window / shared / breaks-a-series the right three properties?** Cheaper to decide now than
   after 66 records migrate.

**Until 1 and 3 are settled the phase can measure and cannot record**, and the measurement half
presupposes neither: the sixteen unnamed records, **L-0002 and L-0216 typed `shock` with the exposure
key absent**, the 66 read for role and direction, and the inventory of events actually reasoned from.

---

## RULING 5 AND FOUR REPORTS — 2026-08-06, after `004fd5f`

Full account in [`RULING-5-AND-FOUR-REPORTS.md`](RULING-5-AND-FOUR-REPORTS.md). **0 verdicts moved,
proven by comparing `assessment` across all 223 ledger records between HEAD and the working tree, not
asserted.** No record authored or edited; no enum value added or removed; no gate built; no phase
opened; questions (a) and (c) still open and still the operator's.

**RULING 5 IS WRITTEN — an objective may be IMPOSED as well as announced.** In `CLAUDE.md`, the
`assessment` definition in `schemas/ledger.schema.json`, and the `Assessment` doc comment in
`lib/types.ts`, one commit, per the convention Rulings 1 and 2 set. `enum-parity` unchanged at *48
members across 6 axes · 3 axes exempted by name*; the schema edit is 1 insertion / 1 deletion on a
description line.

> **A duty imposed by an external authority is a legitimate objective for scoring, provided the
> record names the instrument and the duty.**

**Four conditions, each earned by one of the nine:** the obligation is **imposed, not volunteered**,
and an instrument's silence on a deadline does not move it to `no-objective` (L-0162/L-0210); the
duty must be **the one the finding is about** (L-0154 — Article 281's duty was DISCHARGED); **naming
an instrument is not breaching it** (L-0122); **an absent duty is not a duty** (L-0164). It does
**not** reach an objective **internal** to the measure — L-0108 is named in the rule so it is not
cited as an instance and used to widen it.

**All nine tested and nine hold.** L-0167 stays `no-objective` **on the record**, and the rule now
states exactly what a retrieval of the 1990 ISC Order would have to show to change that — an open
question converted into a specified one.

**FOUND WHILE WRITING IT: `no-objective` had NO BULLET OF ITS OWN in `lib/types.ts` for the whole of
its life** — nine of ten members defined, the missing one carrying roughly half the ledger, appearing
only inside `undated-commitment`'s bullet. **`enum-parity` compares enum SETS and cannot see this: a
missing DEFINITION is not a missing MEMBER.** Written in this commit, saying it was missing.

**THE PATTERN, NAMED: THE PER-RECORD DEFENCE** — *a rule the corpus applies correctly, states only in
the record that applies it, and therefore cannot be checked, re-applied, or defended in the
aggregate.* Three instances this cycle: **the unmeasured limb** (8 records, 5 treat it as
disqualifying and 3 do not → R2), **independence** (11 of 223 in four vocabularies, 212 silent →
proposed, phase 17), **the external duty** (→ R5). Five properties, and the first explains why no
gate ever fires: **the practice is correct**, so nothing downstream fails. The three render gates all
prove the note is THERE and none reads what it SAYS. **The charge is one sentence; the defence is N
records, and that asymmetry gets worse with corpus size.**

**INVENTORY — what else is governed only by `assessmentNote`.** Scope: the 170 records with a
non-empty note; word-boundary scan of that field alone; **candidates, not findings; no gate emits
these.** D external duty **33** · E "no objective was stated" **29** · C unmeasured limb **27** ·
F correction history **27** · A argues against another enum value **17** · B independence **11** ·
G appeals to the written definition **16**.

**WHERE THE NEXT REVIEW LANDS, predicted:**
1. **Group C — RULING 2 IS WRITTEN AND UNENFORCEABLE.** Nothing records that a record announced
   multiple objectives or which are measured, so R2 cannot be re-applied or audited, and its 27
   candidates split across six values. **Writing a rule does not close a per-record defence.**
2. **Group A — 17 records defending a value boundary one record at a time** (*"Not failed either"*,
   *"Not contested"*). Two of those boundaries have been ruled on; the rest have not.
3. Group B (scheduled, phase 17) and Group E (the `claimAtLaunch` proposal).
**Groups D and F are now closed** — D by this rule, F by `withdrawn-wording.mjs`, which is the proof
the class is closable. **My own first reading of group G was wrong and is corrected in the report:** a
loose term list returned 22 apparent "documented departures"; `departure` appears in **exactly one**
note (L-0026, the known R2 case) and the 16 are records *appealing to* the written definition, which
is the practice working.

**`shockExposure` CARRIES TWO JOBS, NOT THREE — all 66 read, assignment exhaustive and disjoint
(universe 66, assigned 66, duplicates 0).** CONFOUND **23** · CAUSE **19** · NONE STATED **9** ·
IS-THE-SHOCK **6** (exactly the six `type: shock` records carrying the field) · REFUSED-as-the-whole
**4** · AMBIGUOUS **4** · NOT AN EXPOSURE **1**. **Refusal is an ADJUDICATION MODIFIER, not a third
job: 11 further records carry it as a clause inside a confound or cause statement, so 15 of 66 refuse
or limit the shock and only 4 do so as the whole of the field.** Two axes — what the shock did, and
whether the record accepts it (*accepted / limited / refused*). **This is a partial answer to
question (b), as measurement rather than as a ruling.** Three further undecided jobs found: OUTBOUND
(3 — the record is a confound for others), a substantive FINDING (L-0034), and a TYPING DECISION
(L-0091). The four ambiguous are L-0012, L-0049, L-0051, L-0061; **L-0061 is the clearest case — the
shock "is the stated reason" and the record never says whether it accepts it.**

**THE EIGHT `type: shock` AGAINST L-0091'S TEST — 4 pass, 2 fail, 1 mixed, 1 the test cannot reach.**
Pass: L-0002 L-0021 L-0184 L-0186. **Fail: L-0064** (on its own words — the lockdown notice *"was a
choice"*) and **L-0216** (the Cabinet Committee on Security deciding). **Mixed: L-0020**, and it
contradicts L-0091 directly — one pandemic, two "response" records, `episode` for school closures and
`shock` for the fiscal response. **Unreachable: L-0027**, which is neither a state decision nor
external, so **the test is binary and the corpus has a third case.**
**And a cross-tab settles L-0216 without settling the taxonomy: it is the ONLY one of the eight
carrying a `claimAtLaunch`, the only one with an evaluative verdict, and one of two with no
`shockExposure`.** All three are what a *measure* looks like. (L-0184's `claimAtLaunch` quotes a US
executive order and is not the same thing.) **What L-0091's test would need to be written into the
schema:** a third term for domestic non-state events · the locus of the CAUSING ACT not the effect ·
a bundling rule for a record covering an event and the state's response · and a test on the record's
SUBJECT, not its domain or its trigger. **Report only; the phase has not opened.**

**THE STATE-LINE CONTRADICTION IS MECHANICALLY REACHABLE — and this is the first of the four that
is.** Batch 14's answer (*"a convention, not a checker"*) was right for its two instances and does not
govern this one, which has three properties phase 14's lacked: **a named machine-identifiable object**
(a phase number), **a declared authority** (`CLAUDE.md`'s table says so in terms), and **a closed
vocabulary** (four names). Surface: 904 bare mentions across 91 files, but only **25 in assertion
form** (`phase 1[0-9] (is|was|becomes|=)`) — small enough to enumerate. **The trap is decisive for the
design: of the four hits asserting a name against the current table, THREE ARE CORRECT** — the
append-only verification log, and two that quote the withdrawn wording inside the sentence withdrawing
it. **A token-forbidding guard would fire on three correct instances and zero incorrect ones**, the
shape `CLAUDE.md` already documents. **Design stated, not built** (a gate is a contract change): reuse
`withdrawn-wording.mjs`'s presence-in-context form, parse the table as the single source and abort if
it has moved, exempt the append-only log by name, two-sided control. **The general convention — every
state line dated and object-named — remains unbuilt and remains right for the general case.**
