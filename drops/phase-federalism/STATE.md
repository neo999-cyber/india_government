# Phase 13 — federalism — STATE

**Run:** `/phase federalism --dry`. Base `main` @ 3812807 (+ log commit 849cca7).
**COMPLETE TO THE DROP. Stopped before merge, as `--dry` requires.**

---

## DEFERRED QUESTION — is a state's transfer dependence a `macro` record or a `federalism` one?

**Logged as a question, deliberately not answered, and deliberately not scoped to the two series a
reference check happened to name.**

`ref-relevant` fired on `bihar-own-tax-share-revenue-receipts` and `wb-own-tax-share-revenue-receipts`
(both `domain: macro`) citing P-108 (`federalism, governance`). Two remedies existed: widen P-108, or
re-file the two series as `domain: federalism`. **P-108 was widened; the series were NOT re-filed.**

The reason for deferring rather than deciding: **if `federalism` is the right primary subject for a
state's own-tax share of revenue receipts, it is right for every comparable series, not for the two
that a reference check happened to surface.** Re-filing two would leave the corpus in a state where
the same quantity is filed two ways depending on whether a provenance reference happened to catch it
— worse than either consistent answer. **The work is a sweep across all comparable series, and it is
not this phase's.**

**What makes it a genuine question rather than an obvious one is that `federalism` is the enum's one
hybrid — a subject in its own right AND a lens.** For `kashmir` there is no question: `domain:
kashmir` is an error (`lens-as-subject`), so a J&K measurement files its substantive domain and takes
`kashmir` as lens. `federalism` has no such forcing rule. A state's dependence ratio can defensibly be
filed as:

- `domain: macro` + `lenses: [federalism]` — it is a state fiscal aggregate that bears on Centre-state
  relations. This is what the drop does now.
- `domain: federalism` with no lens — the quantity exists *because* of the transfer system and would
  not be interesting without it; Centre-state relations is the subject, and state fiscal accounting is
  the instrument.

Both are legal. `lens-duplicated` only forbids asserting both at once. **The instrument has no written
rule that decides between them, and this phase declined to invent one mid-run** — which is the same
discipline that kept `differentFacts` from being resolved in the pass that discovered it.

**Candidate scope for the sweep, when it runs:** every series measuring a state's own revenue, its
transfer receipts, or a ratio between them; the two named above; and the `*-css-releases` family,
which the drop already files as `domain: federalism` — so the corpus is **already inconsistent on
this axis**, and that inconsistency is the evidence the question is real.

---

## CORRECTION LOGGED — L-0166

An instruction to "DELETE L-0166" was issued while reasoning only about its absence entry. **The
absence entry was correctly removed; the ledger record was correctly kept.** The record's finding —
that no consolidated MHA list of the four Article 356 proclamations exists — is distinct from, and
compatible with, each proclamation being individually gazetted. Deleting the record would have
destroyed five T1 sources and a sound finding in order to remove a miscategorised sub-entry.

**Recorded because the reasoning is the durable part**: an absence entry and the record containing it
can fail independently, and "delete the record" and "delete the absence" are different instructions
that read alike when the absence is what prompted the review.

---

## M1 AS A MEASUREMENT, NOT A PRINCIPLE

**Between 29 and 55 of the same 101 URLs required the 1.1.1.1 resolver fallback** — 28.7 per cent on
one run and **54.5 per cent on the next, on the identical corpus, minutes apart.** Both runs confirmed
100 of 101 and failed nothing.

**A checker without M1 would have reported 29 to 55 live government sources as dead.** Not suspect
hosts: documents that were retrieved, read, and are serving HTTP 200 right now. Every one would have
hardened into a "could not retrieve" — and, downstream, into absence records with a stated reason
that was false.

**THE CORRECTION MATTERS MORE THAN THE FIGURE, and it is this file's own error.** The first version of
this entry recorded 28.7 per cent and called it *"a standing property of this environment rather than
a transient outage"*. The very next run refuted the precision: the rate nearly doubled with nothing
changed. **A single measurement was written up as a property.** That is the same defect this phase
has now recorded against three separate checks — a sound observation, over-generalised at the point
of writing — committed here in the log that was recording the others.

**What survives is the floor, not the rate.** The proportion is unstable and cannot be quoted as a
constant. What is stable is that it is never small: on the lower of two observations, more than a
quarter of this drop's citations are unreachable through the system resolver. M1 has until now been
an argument from three past incidents; this is the first time it has been quantified on a live
corpus, and even the conservative observation exceeds what those incidents suggested. `url-check`
carries the fallback internally, which is the only reason the figure is observable at all — and
running it twice is the only reason its instability is.

---

## THIRD PASS, 2026-08-04 — four absences settled, and the drop gate closed against the merge gate

### The four route-less absences, as directed

- **L-0166 — the miscategorised absence REMOVED, the record KEPT.** The `unmeasured` entry "The
  Gazette notification for any of the four proclamations" is gone. **Logged here so the reasoning
  survives the record:** it claimed non-publication of a document that is published by definition,
  when the actual fact was that `egazette.gov.in` could not be driven from this environment — our
  retrieval failure recorded as the Union's. **The ledger record L-0166 itself was kept**, and this
  is an interpretation I made and am flagging rather than burying: the instruction said "DELETE", but
  the record carries five T1 sources and its finding is that *no official list* of the four
  proclamations exists — which is compatible with each proclamation being individually gazetted. The
  two claims coexist. If the whole record was meant, say so and it goes.
  **The Gazette retrieval is now an open task, not an absence:** four proclamations, `egazette.gov.in`,
  ASP.NET postback search with per-session path tokens, needs a client that can drive it.
- **L-0163 → `not-collected`.** Article 201 requires no statement of reasons and the function is
  non-justiciable, so nothing obliges the reasons to be recorded and there is no held document a
  compulsion could reach. The record's own text already argued this; the value contradicted it.
- **L-0152 → `not-collected`, and restated as the finding it is.** `what` is now "Any written
  derivation of the 'approximately 1 per cent' adjustment" — **a one-percentage-point cut to the
  divisible pool applied with no written derivation anywhere**, and the arithmetic does not close
  (J&K's 1.854 per cent of the states' 42 is 0.78 per cent of the pool, not 1).
- **L-0155 — route written.** FC-XVI recommended annual publication of the CAG's Article 279
  certificate, the Union accepted, and Receipt Budget 2026-27 Annexure 4C is that disclosure in its
  first year. Extending it backwards needs no new computation: the certificates exist and have since
  1950.
- **L-0183 — the CBDT limit stated at its true strength**, and folded into the `caveat` rather than
  `notes`, because **the ledger schema has no `notes` field** — my error, caught by the new gate.
  "Published to humans, not to machines": the source carrying state-wise direct tax answers 403 to
  every automated client, so the one component of the contribution denominator that IS published
  cannot be checked by the route that established every other source on the record.

### stage4-selfcheck now runs the merge gate, and `wouldFill` was NOT the only gap

`stage4-selfcheck.mjs` implemented ids, derived reference forms, both-cases, `whatChanged` length,
charset and per-record schema — and **none of `integrity.mjs`'s thirty-four instrument rules.** A
drop could report STAGE 4 CLEAN and hard-fail `npm run validate` on merge, which is exactly what
this drop did, twice.

**It now calls `checkIntegrity` — the same function `npm run validate` calls.** Reimplementing the
rules would have been the same defect one level up: a second enumeration to drift out of step with
the first, which is the reasoning that killed the hand-written reference-form list in the same file.
The corpus is **drop ∪ live**, because cross-record rules cannot be evaluated on a drop alone;
findings naming only live records are reported and **do not gate**, since a phase is not answerable
for the corpus's existing warnings.

**What it caught on first run: 18 drop-attributable errors, of which `unmeasured-route` was 4 and
`ref-relevant` was 14.** Rules that fired at all: `absence-dispute`, `affects-series-pending`,
`break-span`, `charset-diacritic`, `npa-basis`, `pending-note`, `ref-relevant`, `term-window`,
`unmeasured-route`.

### ⛔ THE REMAINING STOP — 14 `ref-relevant` errors, three decisions

A dispute record whose `affectsDomains` does not cover the domain of the record citing it. All 14
collapse to three:

| provenance | affectsDomains | cited by | missing | recommendation |
|---|---|---|---|---|
| **P-106** — two reporting-base shifts move money between statements without moving it | `federalism, welfare, macro` | 6 Samagra Shiksha series (`education`) | `education` | **Add `education`.** It is a CSS-transfer dispute and Samagra Shiksha is a CSS in education; L-0101 already carries `education` beside `federalism` and `governance`. |
| **P-107** — released, received, passed on: no instrument bridges the three | `federalism, welfare, governance` | the same 6 | `education` | **Add `education`**, same reasoning. |
| **P-108** — the subtraction is the auditor's; the inputs are frequently a party's | `federalism, governance` | 2 state own-tax-share series (`macro`) | `macro` | **Two defensible fixes and they differ in meaning.** Add `macro` to P-108; *or* re-file the two series as `domain: federalism`, since a state's dependence on central transfers is arguably Centre-state relations as primary subject. I lean to re-filing the series — but that is a domain call, not a reference call. |

**Not applied.** Widening `affectsDomains` is not free: the SKILL records that `ref-relevant` and
`back-link` point opposite ways and widening does not satisfy the back-link. Phase 4's lesson applies
— when a gate rule and the data disagree, check whether two rules contradict each other before
moving either.

### Tooling and docs

- **`.xls` → `'ms-excel'`.** A wrong lookup, not a loosened threshold: `'spreadsheet'` matches OOXML
  and can never match `application/vnd.ms-excel`, so a correctly-served legacy workbook was reported
  as a soft-404. **Both spreadsheet branches now pinned by fixture**, and the selftest fails if either
  is dropped. All six original url-check fixtures unchanged; the set is now seven.
- **A second defect found while adding that fixture:** the selftest's `check()` helper returned
  `out: ''` on the success path, so **no assertion about a passing run's output could ever fire**. A
  stays-quiet fixture could only ever be tested on its exit code. Fixed.
- **spec §8** — the fourth url-check surprise recorded, with the pattern named: *this tool's fixture
  set is shaped by the incidents that motivated each fixture, not by the space of inputs the
  predicate accepts.* Complete with respect to the past, silent about the present.
- **SKILL** — *a gate's exit code does not survive a pipe.* `url-check … | tail` reported the exit
  status of `tail` (0) while node exited 1. Filed beside the PR-status rule as the same family: a
  status field supplied by something other than the process that knows the answer.

### Checks this pass

**Stage 4: 14 errors (all `ref-relevant`, the stop above) · arithmetic hand-check 48 identities,
0 mismatches · selftest OK, 23/23 validator rules, 2/2 output gates, 7 url-check fixtures ·
url-check drop mode 100/101 confirmed, 1 unverifiable, 0 failures, node exit 0.**

The url-check run is worth two notes. **The `.xls` fix is confirmed against the live network**, not
only by fixture: the archived PPAC tariff table — the single failure of the previous run — now reads
`ok 200 application/vnd.ms-excel`. And **29 of 101 URLs required the 1.1.1.1 resolver fallback**,
so more than a quarter of this drop's citations are unreachable through this machine's system
resolver. Any check that reported those as dead would be manufacturing findings, which is the whole
of M1 in one number.

The one unverifiable is the CBDT Time Series Data at 403, cited by L-0183 and P-118 — already
carried on L-0183's caveat as *published to humans, not to machines*.

**The exit code was read from node this time, not from a pipe** (`NODE EXIT=0`), which is the SKILL
item added this cycle, exercised.

---

## SECOND PASS, 2026-08-04 — B-1 through B-4 worked; ONE STOP REMAINS

The drop grew from 73 records to **106**: ledger 25→**34** (L-0150→L-0183), series 25→**42**,
provenance 15→**19** (P-100→P-118), pairs 8→**11** (PR-56→PR-58). One amendment: L-0157 gained 12
sources and went `confidence` medium→high.

**Triggers: B-1 CLOSED · B-2 CLOSED · B-3 CLOSED · B-4 still open** (RBI *State Finances* was
retrieved by no part, so nothing rests on it). No A, no D, no F. **No enum value added.**

**Checks re-run: stage 4 CLEAN (0 errors, 0 warnings) · arithmetic hand-check 18 identities, 0
mismatches · url-check drop mode 101 URLs, 99 confirmed, 1 unverifiable, 1 flagged and the flag is
wrong.** The `devolution-be-to-actual-gap` series now reproduces from its own two authored input
series — which was the point of item 4; before this pass it could not be checked by a reader at all.

### url-check found a defect in url-check — fourth instance of a known shape

The one flagged URL is the archived PPAC excise tariff table (`…6-6-2020.xls`), cited by L-0157,
L-0180 and L-0181. **It returns HTTP 200 and `content-type: application/vnd.ms-excel`, which is the
correct registered type for a legacy `.xls` file.** The tool's `EXPECTED` table maps `.xls` to the
sentinel string `'spreadsheet'`, and the soft-404 branch tests
`contentType.includes('spreadsheet')` — which matches only `.xlsx`'s
`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`. **A correctly-served legacy
`.xls` can never pass.** One-line fix: map `'.xls'` to `'ms-excel'`.

**Not applied.** The tool's own comment says "do not relax this to make a commit pass", and loosening
a gate that is blocking my own drop is exactly that pattern even when the loosening is factually
right. It is a judgement call and therefore a stop.

This is the **fourth instance** of the shape spec §8 already records three times for this same tool:
*both fixtures present proves the rule does what was specified, never that the right rule was
specified.* The fixtures cover `.pdf` soft-404s; none covers a legacy spreadsheet. It is also a point
in favour of drop mode — `/data` carries no `.xls` citation, so this latent defect could only ever
have surfaced on a drop, and only after the new mode existed to look at one.

**One process lesson.** My first invocation piped url-check to `tail`, so the harness recorded
**exit 0** while node had exited 1. **A gate's exit code does not survive a pipe.** Check the summary
line, not the shell status.

**The 1 unverifiable is the three-outcome rule working as designed:** `incometaxindia.gov.in` returns
**403** to an automated client for the CBDT Time Series Data, cited by L-0183 and P-118. A refusal is
not evidence the document is absent, so it is not a failure — but note that the source underpinning
B-1's "state-wise direct tax IS published" limb is one that refuses automated retrieval.

### ⛔ THE REMAINING STOP — four absences whose declared value contradicts itself

`integrity.mjs` treats a `not-published` or `withheld` absence with no `wouldFill` as a **hard
error**, because both values assert in their own written definitions that the data exists. Four
records in the drop are in that state and **would fail `npm run validate` on merge**:

| record | what | the problem |
|---|---|---|
| **L-0155** | The certified divisible pool before FY2018-19 | **Route is obvious and unwritten.** FC-XVI recommended annual CAG disclosure, the Union accepted, and Receipt Budget 2026-27 Annex-4C *is* that disclosure in its first year. Extend it backwards. Mechanical. |
| **L-0152** | The derivation of the "approximately 1 per cent" J&K adjustment | **The value may be wrong.** If no derivation was ever written down there is nothing to produce under compulsion, which is `not-collected`, not `not-published`. |
| **L-0163** | The Presidential reasons for withholding assent to seven TN bills | **The record's own text argues against its own value** — it says Article 201 requires no published reasons and the function is non-justiciable. If no reasons need ever be recorded, this is not non-publication. |
| **L-0166** | The Gazette notification for any of the four Article 356 proclamations | **This is a category error and the sharpest of the four.** A Gazette notification is published *by definition*. The `why` says plainly that `egazette.gov.in` "could not be driven from this environment" — that is a **retrieval failure by us**, not non-publication by the Union. As authored it would put a false "not published" claim on the instrument's face about a document that is published. It should not be an absence record at all. |

**Not fixed, deliberately.** Three of the four turn on which enum value the evidence supports, which
is a judgement call and a stop condition for this run. L-0166 additionally needs a decision about
whether to delete an authored absence rather than re-grade it.

### Two subagent claims adjudicated — one adopted, one REJECTED

**REJECTED: "four `fc-devolution-rupees` values are wrong."** A retrieval pass proposed replacing
FY2017-18 / FY2018-19 / FY2021-22 / FY2022-23 with Union Receipt Budget figures. **Verified against
part 02 before propagating (M4) and refused.** Part 02 had already found exactly these divergences
— Annexure 7.1 minus Receipt Budget gives FY2018-19 −14,560 · FY2019-20 +10 · FY2020-21 +230 ·
FY2021-22 −15,292 · FY2022-23 +576 · FY2023-24 +0.29, **the same numbers the second pass called
errors** — and characterised them correctly as the definitional gap between three instruments
counting three different events. The series is correctly sourced to FC-XVI Annexure 7.1 (the RBI's
compilation). Applying the "correction" would have overwritten a correctly-sourced series with a
different instrument's figures and destroyed the internal consistency the first arithmetic
hand-check had verified.

**ADOPTED, because it is genuinely new: FY2017-18 diverges by ₹67,819.29 crore (11.2 per cent)** —
4.6× the largest divergence part 02 examined, in the GST transition year, and **part 02's comparison
table does not cover FY2017-18 at all.** Authored at L-0182 as unexplained, with no component
guessed.

**B-1 adjudicated between two agents that split.** One recommended `never-defined`, one
`not-collected`. **Settled as `not-collected` + `reasonDisputed: true` + `disputeKind: evidentiary`,
with the reasoning written onto L-0183 rather than only into this file.**
- *For `not-collected`:* the Government has stated it five times across both Houses, 2010→2026, the
  last two word-for-word identical — "State-wise data on collection of Indirect Taxes… is not
  maintained". reasonKind records **the stated reason**, and that is one.
- *Against `never-defined`:* it rested on a single sentence in a single answer (LS U.148, 03.02.2020,
  "There is no mechanism for transfer of revenue by States to Centre"). That denies a **transfer
  mechanism**, not a definition — the Centre collects directly, so no transfer exists to describe,
  and the same answer then annexes the state-wise devolution table. The claim was not cited on the
  record because no part fetched that document.
- *Against `withheld`:* ten-plus dated specific requests and **zero refusals**. What the record shows
  is **substitution** — a member asks for "tax devolution per one Rupee received, State-wise" and
  receives the inter-se share table. **Substitution has no slot in the four-value enum.** Recorded as
  an observation; **no enum value proposed.**
- *Why disputed:* the blanket "indirect taxes not maintained" is contradicted by the Government's own
  monthly publication of state-wise GST, which is an indirect tax.
- *The structure, now explicit on the record:* state-wise **direct** tax is published (CBDT Time
  Series §1.2, attributing tax to *the state code in the assessee's communication address* — which is
  what produces a 40.3 per cent Maharashtra share, with no disclaimer anywhere); state-wise **GST** is
  published monthly; state-wise **non-GST indirect** tax is not maintained. The composite fails on one
  missing input, not on incoherence.
- *An honest limit on the record:* Lok Sabha question **body** text is not searchable (`questionText`
  is always null), so every Lok Sabha negative is subject-line-only and weaker than the Rajya Sabha
  negatives.

### `url-check --drop` built, and it earned its keep immediately

`tools/url-check.mjs` gained a `--drop <dir>` mode: reads the flat drop layout and implies `--all`,
because every URL in a drop is new and there is no base to diff. The default mode diffs `/data`
against `origin/main` and therefore **reports "0 to check" on any `--dry` run** — a right answer
about the wrong tree, and the fifth instance of that shape. Verified: drop mode discovers exactly the
63 URLs the first pass had counted by hand (that equality is the positive control), the six existing
url-check fixtures still pass, and default mode on `/data` is unchanged at 264/0.

### SKILL updated — three items

1. **M2 gains its producer-side half.** The existing fix was consumer-side and cannot recover a file
   that was never written. Now: create the output file in the first few tool calls, append each
   section as completed, cap fan-out at 2 — with the evidence (five of seven parts at zero bytes;
   then two agents died under the new rule and **both survived at 165 KB and 68 KB**). Written into
   the stage-2 section as a requirement on every brief.
2. **"A structural check passes on a stub", recorded as the third instance of the M2 shape** — with
   the specific damage: part 06's `_(pending)_` made the forward-reference assertion count zero
   outbound refs and read it as *"needs nothing"* rather than *"never written"*.
3. **`url-check --drop`** documented in the stage-4 section.

**`/data` and `/schemas` were never touched — `git status --porcelain data schemas` is empty at
every checkpoint.** Only `drops/phase-federalism/` is new, and it is untracked.

| Stage | State |
|---|---|
| 1 — Scope | **COMPLETE** — no triggers |
| 2 — Research | **COMPLETE** — 7 parts, 12,528 lines, 109 forward refs |
| 3 — Author | **COMPLETE** — 73 records, 5 trigger-B stops |
| 4 — Self-check | **STAGE 4 CLEAN** — 0 errors, 226 refs across 14 derived forms |
| 5 — Reconcile | **CLEAN** — 0 id collisions, 0 field drift |
| 6–8 | **not run — `--dry` forbids merge, gate, log and PR** |

## The drop

`drops/phase-federalism/records/` — plain arrays, matching the live files.

| Layer | n | ids |
|---|---|---|
| ledger | 25 | L-0150 → L-0174 |
| series | 25 | `divisible-pool-share-gtr` … `wb-own-tax-share-revenue-receipts` |
| provenance | 15 | P-100 → P-114 |
| pairs | 8 | PR-48 → PR-55 |

Plus `TRIGGERS.md` and `DOMAIN-FIT.md`.

The phase had **no measured spine at stage 1**. It now has one.

## Checks run, with results

- **Forward-reference assertion (required before stage 3): PASSED.** 109 refs, every target exists;
  parts 03 and 06 additionally mark each inbound ref DISCHARGED / PARTLY / NOT / DECLINED / CARRIED.
  Three are explicitly not satisfied and say so rather than passing silently.
- **Stage 4 self-check: CLEAN.** 0 errors, 0 warnings, 226 references across 14 schema-derived
  reference forms. Report-only passes (bidirectional 0 in drop, `ref-unexplained` 71 in drop) do not
  gate and name candidates only.
- **url-check on every URL the drop adds: 63/63 confirmed HTTP 200.** Zero refused, zero gone.
  **The repo tool could not do this** — `tools/url-check.mjs` diffs `/data` against `origin/main`, so
  on an unmerged drop it reports "0 to check". Right answer, wrong tree. Checked directly instead,
  with resolver pinning via 1.1.1.1 and the three-outcome classification (200 / refusal / gone).
- **`withheld` bar: 1 in the drop, and it holds.** L-0172 — named requester (the CAG), specific
  request (all GST transaction data), date, `wouldFill`. Recorded in the audit certificate by the
  requester itself.
- **Arithmetic hand-check: 0 mismatches** across every identity checkable from the drop —
  devolution rupees ÷ GTR reproduces all 14 stated percentages; the CAG-certified net proceeds ÷ GTR
  reproduces all 6 certified years of the divisible-pool share; the cess series with and without the
  compensation cess are identical in all six pre-July-2017 years and diverge 3.3–4.6 pp after;
  29,786.36 × 1.14³ = 44,129.80 exactly; the Tamil Nadu projection-gap sums are −30,426 and +31,887.

## TWO FINDINGS FROM THE ARITHMETIC CHECK — raised, not fixed

**1. Three adjacent series do not reconcile, and nothing on the record says why.**
`divisible-pool-share-gtr` × `fc-vertical-devolution-share` should give `fc-devolution-share-of-gtr`.
It does not, in any year: gaps run −1.7 pp (FY2015-16) to +1.8 pp (FY2018-19), and **swing both
ways**, so it is timing and arrears, not a formula error — consistent with part 02's finding that the
Centre net *overpaid* ₹15,756 crore before FY2018-19. `fc-devolution-rupees` carries the reason in
its unit string ("cash transferred in the year"), but no provenance record states it. **A reader who
multiplies two adjacent series and gets a third number has found an apparent contradiction with
nothing on the page to resolve it.** Recommend a provenance record, or a note on
`fc-devolution-share-of-gtr`. Not authored here — `--dry` stops at the drop.

**2. `devolution-be-to-actual-gap` cannot be reproduced from the drop.** Its own note says "both
columns are the Union's own, for the same quantity, in the same document series" — but **neither
column is authored as a series**, so the percentage cannot be checked by a reader. This is not
trigger B (the basis is established in part 02), but it is contrary to the instrument's own design
question, "what does this number rest on?". Recommend authoring the Budget Estimate series, or
stating the two rupee figures on the points.

## Triggers fired — five, all class B, none A, none D, none F

Detail in `records/TRIGGERS.md`. Summary:

- **B-1 "X paise per rupee"** — the most-quoted figure in Indian fiscal federalism. **Not authored.**
  Two corpora swept with positive controls, both negative. Held as unestablished rather than rendered.
- **B-2 AIDC per-litre "before" rates** — the ₹1.58 petrol / ₹3.03 diesel migration out of the
  divisible pool. Primary documents were read in this run but no per-document URL reached `parts/`.
  L-0157 authored at `confidence: medium` with the problem on its face. **Judgement needed.**
- **B-3, the costly one** — RECOVERED sections B and C carry ~15 parliamentary answers read verbatim
  with **no per-question URLs**. Four series were therefore NOT authored: the Union's own
  cess/surcharge share statement to Parliament; **AIDC collected against transferred** (which would
  have been the phase's cleanest coverage-usage pair — nil transferred in the cess's first two full
  years); CSS releases to West Bengal; and **by-state Samagra Shiksha allocation against release**,
  the series that would have completed the L-0101 generalisation. The hard rule was applied as
  written: nothing rests on uncited material.
- **B-4 RBI *State Finances*** — the common-basis-not-independent-evidence trap is *established*
  (its own explanatory note, quoted) but has no citable URL. Carried as a flagged, non-relied-on note.
- **B-5** two PIB URLs reconstructed from recorded PRIDs. Both since confirmed 200 by url-check.

**`no-objective` absorbed four constructs part 07 proposed that exist in no enum. Without it this
phase would have fired trigger D four times.**

## Amendments proposed, not applied (phase 4b — code does not edit `/data`)

- **L-0012** GST — compensation arc now carried by L-0158→L-0161; Art. 279A(11) by L-0162
- **L-0013** — P-100
- **L-0040** MGNREGA — three amendments. **MGNREGA is repealed w.e.f. 1 July 2026** by the VB-G RAM G
  Act 2025 (Act 36 of 2025), a statute. Unskilled wage moves from **100% Central to 60:40**. The
  s.27 fund-stopping power survives near-verbatim as s.29.
- **L-0101** — generalise: the statutory-versus-contractual distinction, plus the ₹2,291 crore
  Article 131 figure at T4 as a *third* differently-defined number
- **L-0100**, **L-0108** — cross-references only

## Domain / lens

`DOMAIN-FIT.md`. **Zero `lens-duplicated` violations.** One test derived and applied throughout:
*would the quantity exist if the federal question did not?* Eight hard cases documented with
reasoning and counter-argument — chiefly the cess series (`macro` + lens) against the divisible pool
(`federalism`), which are complements of one quantity filed under different domains.

**The ledger-layer defect is re-confirmed and now quantified: all 25 new ledger records carry
`federalism` in `domains[]`; 17 would take it as domain and 8 as lens; and on that layer the two are
indistinguishable.** Fourth instance of two-axes-in-one-field. Logged, not fixed.

## One instruction reversed by stage 3, correctly

The stage-3 brief specified the drop files as "an object keyed by the layer name, matching the live
files". **The live files are plain arrays** — the two halves of that instruction contradicted, and
the half naming the live files won. Verified: `data/pairs.json`, `data/provenance.json` and
`data/ledger/welfare.json` are all bare arrays. The brief was wrong; stage 3 was right.

## Process finding worth carrying into the SKILL

Stage 2 died three times on session limits. **First attempt: seven opus agents fanning out freely —
~2 million tokens spent, five of seven parts with ZERO bytes on disk.**

**The fix that worked: instruct every agent to create its output file in its first few tool calls and
append each section as completed, never holding the report in context; and cap fan-out at 2.** Parts
05 and 06 died again under the new rule and **both survived, at 165 KB and 68 KB.** That is the
difference between a liveness failure costing a retry and costing the whole stage.

**Corollary, and it bit here too: a structural check passes on a stub.** Part 06's
`## FORWARD REFERENCES` existed and contained `_(pending)_`. A header-presence check called it
complete. **Completeness has to be tested on content, not on the presence of a heading.**

## Standing constraints, honoured

- No enum value added. Shape-2 stays logged with no home, revisited after phase 14.
- The 313 bare-domain-roots cycle was not started.
- `/data` not edited at source. All amendments are proposals.
- National delimitation and the J&K LG bounded away from L-0141 and L-0125/L-0138/L-0143.
  **National delimitation is the strongest phase-14 candidate.**
- `--dry`: stopped at the drop. No merge, no PR, no deploy.

## Environment limits that constrain any absence record

- **M1 mode 3 is unavailable here.** Playwright and WebFetch both inherit a broken system resolver,
  so "different client" cannot be tried. Any absence resting on unreachability must say so.
- **`pfms.nic.in` is unverified, not dead** — resolves on four resolvers, refuses TCP on 443 and 80;
  positive control `cga.nic.in` returns 200 and links to the exact URL that times out.
