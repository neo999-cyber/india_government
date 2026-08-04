# Phase 13 — federalism — stage 3 TRIGGERS

Model recorded by this transcript: **claude-opus-5**. Authored 2026-08-04.
`/data` and `/schemas` untouched — `git status --porcelain data schemas` is empty. `--dry` holds.

**Counts on disk:** series 25 · ledger 25 (L-0150…L-0174) · provenance 15 (P-100…P-114) · pairs 8
(PR-48…PR-55). `tools/stage4-selfcheck.mjs` on the drop: **0 errors, 0 warnings, 0 unreciprocated
references.**

---

## Triggers FIRED

### B-1 — "for every rupee Tamil Nadu contributes it gets back X paise" — UNESTABLISHED, NOT RENDERED

**Record affected:** none. No series, no ledger record and no pair in this drop carries the figure.

**State of the evidence.** Two independent corpora were swept in stage 2 with positive controls and
both returned nothing. The Sixteenth Finance Commission's own commissioned study *Tamil Nadu State
Government Finances* never computes the ratio and never uses the words "paise", "for every rupee" or
"per rupee", while carrying every adjacent figure of the same genus. Across the five machine-readable
CAG Tamil Nadu State Finances Audit Reports FY2019-20 → FY2023-24 the same three strings return zero
hits, against a positive control of "devolution" returning 3–13 hits in every edition.

**Judgement needed.** Whether to leave the figure out of the instrument entirely (what this drop
does), or to author it as a declared absence with `reasonKind: not-published` against a named
holder. This drop did not author the absence either, because the holder cannot be named: the figure
circulates without an author. **No later stage may treat it as established on this phase's record.**
What would close it is a retrieved Tamil Nadu Government document, Assembly speech or Finance
Department release stating numerator, denominator and year — at which point it becomes a party's
computation with a stated basis, which is a different and lesser thing from a measurement.

### B-2 — the pre-2 February 2021 per-litre excise rates behind L-0157's ₹1.58 and ₹3.03

**Record affected:** `L-0157` (Agriculture Infrastructure and Development Cess). Authored, at
`confidence: medium`, with a caveat that states the problem on the face of the record.

**What is solid.** The AIDC rates (₹2.50 and ₹4.00 a litre), the *new* basic-excise and special
additional excise rates, and the Union's four verbatim statements of consumer-neutrality all come
from the Budget Speech 2021-22 annexure, retrieved with a URL that is cited on the record. Part 03's
own absence A-7 says exactly this: the offset and its stated purpose may be asserted, the size of
the per-litre cut may not.

**What is not.** The "before" column — and therefore the ₹1.58 petrol and ₹3.03 diesel migration out
of the divisible pool — was established in this run from the Finance Bill 2021 Seventh Schedule, the
Tax Research Unit covering letter, notifications 01/2021-CE and 02/2021-CE, and a PPAC/MoPNG rate
table. **None of those four documents has a URL anywhere in `parts/`.** They were read; the citations
were not carried forward.

**Judgement needed.** Either re-retrieve the four documents and add them to L-0157's `sources[]`, or
strip the two per-litre figures from `whatHappened` and rest the record on composition alone. The
direction and the mechanism are not in doubt either way; only the magnitude is.

### B-3 — the parliamentary corpus of RECOVERED section B and section C: read, quotable, uncitable

**Records affected:** none authored. This is a trigger about material deliberately LEFT OUT.

`RECOVERED-grandchild-findings.md` sections B and C carry a large and high-value body of Lok Sabha
and Rajya Sabha answers that were retrieved and quoted verbatim in this run — RS Starred Q. *18 of
21.07.2026 with its Annexure-A (the definitive cess-and-surcharge series FY2022-23 → BE2026-27, and
the Government's own statement that cesses sit outside the pool); RS U.385 of 03.02.2026 Annexure B
item 4 (the Agriculture Infrastructure and Development Fund receiving **nil** in FY2021-22 and
FY2022-23); RS U.1324, RS U.240, LS U.137, LS U.2013, LS U.403, LS U.525, LS S.39, LS U.2608,
LS U.142 and LS U.5783 (Samagra Shiksha allocation against release, by state and year, with Tamil
Nadu FY2024-25 at 2,15,315.01 lakh allocated and **0.00** released, and West Bengal at nil for two
consecutive years). **Not one of them has a per-question URL in `parts/`.** The parts record only the
endpoint *shapes* — `sansad.in/api_ls/question/qetFilteredQuestionsAns` and
`rsdoc.nic.in/Question/Search_Questions` — and part 07 separately establishes that
`sansad.in/getFile/...` PDF paths serve 200 to `curl` with a `Referer: https://sansad.in/` header, so
**the obstacle is finding the path, not fetching it.**

**What this cost the drop, precisely.** Four series that would otherwise have been authored are not:
the Union's own statement to Parliament of total cesses and total surcharges as a share of gross tax
revenue; the AIDC collected against AIDC transferred to its fund, which would have been the cleanest
coverage-usage pair in the phase; centrally sponsored scheme releases to West Bengal FY2020-21 →
FY2024-25 (a 67 per cent fall); and Samagra Shiksha allocated against released by state, which is
the generalisation of **L-0101** the brief asked for. The AIDF nil-transfer finding survives in
`L-0157` only because the CAG's FY2022-23 report independently records "Fund not created as yet"
with ₹1,51,092.71 crore accumulated — a different instrument reaching the same fact.

**Judgement needed.** Whether stage 4 or a later cycle re-retrieves these question PDFs. The hard
rule was applied as written: **no source was entered that this drop cannot trace to a URL a part
actually fetched.** Nothing here rests on the uncited material.

### B-4 — RBI *State Finances: A Study of Budgets* — the trap the brief named, established but not citable

**Records affected:** `PR-55` (declared-pending), whose `notes` carry the point explicitly as
something this drop does NOT rest on.

RECOVERED section C quotes the Reserve Bank's own Explanatory Note verbatim: the report is based on
"the budget documents of 31 State governments... The analysis conforms to the data presented in State
budgets and the accounting classification thereof", and Statement 17's footer reads "Source: Budget
documents of the State governments." That settles the brief's own warning — RBI *State Finances* is
the states' own numbers restated on a common basis, a common BASIS rather than independent EVIDENCE,
and it cannot audit what the Union actually released. Part 07's PR-β states the same proposition and
marks it **NOT ESTABLISHED IN THAT PART**; RECOVERED section C establishes it. But the retrieval used
the HTML mirrors at `www.rbi.org.in/Scripts/PublicationsView.aspx?id=` and **the `id` was not carried
forward**, so there is no citable URL.

**Judgement needed.** Whether to re-retrieve and author this as a provenance record in its own right.
It is the single cleanest statement of the phase's central methodological trap, and it currently
exists in this drop only as a sentence in a pending pair's notes, flagged as unrelied-on.

### B-5 — two reconstructed PIB URLs

**Records affected:** `L-0169` (MGNREGA repeal / VB-G RAM G Act 2025).

`https://www.pib.gov.in/PressReleasePage.aspx?PRID=2204496` and `...PRID=2207187` are reconstructed
from press-release identifiers recorded at the time of reading in RECOVERED section C; the URL shape
is proven live in part 07, which fetched five PIB pages on it. The documents were read — the Act's
section numbers, ratios and commencement are quoted from them — so this is not a fabricated citation.
It is a citation whose exact string was rebuilt. **Flagged for the drop's standing `url-check`**, and
stated on L-0169's own caveat. The same applies to `https://www.indiacode.nic.in/handle/123456789/4649`
for MGNREGA sections 22(1)(a) and 27(2), where RECOVERED section C names the handle and the host
shape is proven by part 05's two India Code retrievals.

---

## Triggers NOT fired, and why — recorded so silence is not read as absence

**Trigger A (assessment value against mechanism): none fired.** Every scored record carries an
`assessmentNote` stating which definitional mechanism it was matched against. The four hardest calls,
recorded because a reviewer should be able to overturn them:

- **`L-0151` = `worked`** for the Fourteenth Finance Commission's 32→42. The value scores the
  objective stated at announcement — raise the share to 42 per cent — which was recommended, accepted
  and paid. It does **not** score the states' net position, which depends on the size of the pool and
  belongs to `L-0150`. If a reviewer thinks the pool effect belongs inside this record, the value
  should move to `partly`; the pairing of L-0150 with L-0151 exists so that it need not.
- **Seven records take `no-objective`** (L-0150, L-0154, L-0161, L-0164, L-0166, L-0172, L-0174).
  In every case the test applied was the schema's own: *nothing was claimed*, as against a claim
  whose outcome is unmeasured. The one record where a claim DOES exist and its outcome is unmeasured
  — the Union's statement that the retained one per cent finances the two Union Territories — takes
  `contested` instead, per the schema's L-0096 note. That line is the sharpest judgement in the drop.
- **`L-0156` = `failed`.** The objective is the one stated in each levy's own enacting provision, and
  it is also the constitutional ground for the levy sitting outside the divisible pool. A reviewer
  could argue for `partly` on the strength of the FY2019-20 correction and the FY2024-25 creation of
  the Oil Industry Development Fund; both are in `caseFor`.
- **`L-0169` = `too-early`** on a repeal five weeks old, and **`L-0153` = `too-early`** on an award
  four months old. Both were checked against `awaiting-adjudication` and both fail it: nothing is
  pending before any body outside the enacting authority. The obstacle in each is elapsed time.

**Trigger D (enum value needed that does not exist): none fired.** Three near-misses, recorded:

- Part 07 proposed `type: condition`, `type: finding` and `assessment: not-assessed / analytical`.
  None exists. All were filed on written definitions instead — `episode` or `institutional`, and
  `no-objective`. **`no-objective`, added 2026-08-01, absorbed every one of them.** Without it this
  phase would have fired D four times, which is worth recording as evidence that the value was the
  right addition.
- `term` is single-valued and several records span T2 into T3 (L-0163 runs 2020→2025, L-0166 runs
  2016→2026). The convention applied is **the term in which the record concludes**, stated here
  because it is a convention and not a rule in the schema.
- The `withheld` bar on `L-0172` was applied with one element short of the letter. Named requester:
  the Comptroller and Auditor General. Specific request: access to the data pertaining to all GST
  transactions. Date: **of the recorded refusal** — the audit certificate for the year ended 31 March
  2019 — **not of the request**, which is not established. That limit is written into the record's
  own `why` rather than hidden by it. A reviewer who reads the bar strictly should downgrade it to
  `not-published`; this drop grades it `withheld` and says exactly what is missing.

**Trigger E (collision with an existing record's frame): none fired, because the phase was bounded
away as instructed.** National delimitation is **not authored** and is handed to phase 14 as the
strongest candidate. The Jammu and Kashmir Lieutenant Governor and J&K's President's rule are **not
authored**; `L-0166` counts Article 356 proclamations *excluding* J&K and says so on its face, and
`L-0165`'s caveat states the boundary against the phase-12 records that own that office. `L-0152`
carries `kashmir` in `domains[]` because its subject — the divisible pool — was changed by J&K's
reorganisation; it takes no position on the reorganisation itself and its caveat says so. If a
reviewer reads that as an E collision with L-0125/L-0141, the fix is to drop the `kashmir` tag, not
to drop the record.

---

## The three open items from STATE.md — all three RESOLVED, none inherited

**1a. `tn-fc-interse-share`: 5.385/5.305 vs 5.39/5.31 — RESOLVED in favour of 5.39/5.31, and both
are outside the authored window anyway.** Part 06 retrieved FC-XVI Volume I and read Table 8.4
directly; it prints **5.39 and 5.31** at two decimals for FC-XI and FC-XII. No retrieved document
carries the three-decimal versions, so they are not adopted. Both values are pre-FY2010-11 and the
authored series starts at FY2010-11, so nothing in the drop turns on it. Recorded in `P-112.notes`.

**1b. FC-XV is not constant — FY2020-21 is 4.189 per cent — ADOPTED, and it is a real correction to
the instrument.** Verified from a retrieved T1 document that part 06 fetched and read: the CAG's
Tamil Nadu State Finances Audit Report FY2023-24, Table 2.7, prints the projection basis for each
year — 4.023 per cent plus 4.104 per cent on shareable service tax under FC-XIV, **4.189 per cent for
FY2020-21**, 4.079 per cent thereafter. This is independently consistent with part 02's finding that
FC-XV issued a separate one-year report for FY2020-21. `tn-fc-interse-share` carries 4.189 at
FY2020-21 with a break and a per-point note; `P-112` carries the finding. **An award-level reading of
FC-XV is wrong for that year and this drop says so.**

**1c. "fell 24 per cent" → **minus 19.5 per cent** with the Andhra Pradesh carve-out — ADOPTED.**
Verified at source by part 06 against FC-XVI Table 8.5: Tamil Nadu's devolution-to-population ratio
falls 0.82 → 0.66, which is −19.5 per cent. Andhra Pradesh falls further (1.67 → 1.04) but that is
the 2014 bifurcation, not a formula effect, so excluding it the −19.5 per cent **is** the largest
fall of any non-NEH state at that step. The claim survives, the number is corrected, and the caveat
naming the carve-out is on the break note of `tn-devolution-population-ratio` and in `P-112.notes`.
**24 per cent is not carried anywhere in this drop.**

**2. RECOVERED sections B and C — RECONCILED before authoring.** Section B's substance is authored:
the AIDC mechanism and the revenue-neutrality statements are `L-0157`; the correction that the
Special Additional Excise Duty is itself a surcharge (Receipt Budget note 6.05) is carried on
`L-0157` and in `P-100`; the AIDF nil-transfer finding is carried through the CAG's independent
record of it. Section C's substance is authored: MGNREGA section 27's text and the West Bengal
stoppage are `L-0168`, the repeal and the 60:40 change are `L-0169`, the Single Nodal Agency
withholding architecture is `P-106` and `P-107`, and the PFMS unreachability is stated on the face of
`P-107` and `L-0174`. **What could not be carried is the parliamentary citation layer — see B-3.**

**3. MGNREGA is repealed — authored as `L-0169`**, and `L-0040` is proposed for amendment rather than
restatement (below).

**4. `pfms.nic.in` unverified, not dead — honoured.** No claim in this drop rests on it. `P-107` and
`L-0174` state the failure mode, the four-resolver agreement and the `cga.nic.in` positive control on
their own faces.

**5. M1 mode 3 unavailable — honoured.** `L-0167`'s `unmeasured` entry on the Sarkaria and Punchhi
reports states that the classification rests on unreachability from this environment and is not proof
of non-publication. Same treatment on the Article 356 Gazette absence in `L-0166`.

---

## Existing records this drop proposes to AMEND, and how

Amendments are proposals only. This is `--dry`; nothing in `/data` was touched.

| Record | Proposed amendment |
|---|---|
| **L-0012** Goods and Services Tax | Add `provenanceRefs: [P-111]` and `seriesRefs: [gst-compensation-cess-collected]`. Extend the text to note that the compensation arc is now carried by L-0158 → L-0161 and that the Article 279A(11) adjudication mechanism has never been established (L-0162). **Do not restate the compensation arc inside L-0012** — the four new records exist so it need not be. |
| **L-0013** Corporate tax rate cut | Add `provenanceRefs: [P-100]`. The surcharge-and-cess mechanics on a Union tax collide with the divisible-pool question, and P-100 is the record that says the aggregate has four defensible values. No text change proposed. |
| **L-0040** MGNREGA under an inheriting government | **Three amendments.** (i) Add a note that the Act stands **repealed w.e.f. 1 July 2026** by the VB-G RAM G Act 2025 (Act 36 of 2025), pointing at L-0169; the unskilled wage moves from 100 per cent Central under s.22(1)(a) to 60:40, and the fund-stopping power survives near-verbatim as s.29. (ii) Point at L-0168 for the West Bengal section 27 stoppage rather than restating it. (iii) Add `seriesRefs: [wb-mgnrega-funds-released, bihar-mgnrega-funds-released]` and `provenanceRefs: [P-114]`. **A `revisitTrigger` is owed on L-0040 for the first full VB-G RAM G year.** |
| **L-0100** NEP three-language, Tamil Nadu's refusal | Optional cross-reference to L-0163 (the assent episode arises from the same Governor-and-universities conflict). No substantive amendment proposed. |
| **L-0101** Samagra Shiksha withheld over NEP | **Generalise, do not restate.** Add the finding that the analogue is **contractual, not statutory** — a memorandum-of-understanding precondition, against MGNREGA s.27's statutory stoppage power — which is the distinction the phase needs and which L-0168 and L-0169 now carry on the statutory side. Add `provenanceRefs: [P-107]`. **The by-state Samagra Shiksha allocation-against-release series that would complete this amendment is NOT authored — see trigger B-3.** Also add, at T4 and marked as such, that Tamil Nadu filed an Article 131 suit claiming ₹2,291 crore on 20 May 2025 (diary no. 28793/2025) and that urgent listing was refused on 9 June 2025 — a **third, differently defined** figure alongside L-0101's ₹2,151.59 crore allocated and ₹362.81 crore released. |
| **L-0108** WB recruitment panel annulled | No amendment beyond an optional cross-reference to L-0168. |

The ten reference-only records (L-0051, L-0066, L-0069, L-0071, L-0091, L-0094, L-0098, L-0099,
L-0100, L-0108) were **not re-authored**.

---

## Decisions that reverse an instruction in the stage-3 brief

**One.** The brief specifies the four output files as "an object keyed by the layer name, matching the
live files". **The live files are plain JSON arrays, and so are all four files of each of the three
prior drops** (`phase-education`, `phase-kashmir-security`, `phase-kashmir-rights`, verified in git).
This drop writes **plain arrays**, which is what "matching the live files" requires and what
`tools/stage4-selfcheck.mjs` reads. The two halves of that instruction contradict each other; the
half naming the live files won.

**One further departure, smaller.** The brief lists L-0100 among the amendment targets by implication
(it is in stage 1's AMEND column). This drop proposes no substantive amendment to it, because nothing
the phase found bears on the three-language formula itself. The assent conflict that surfaces in the
same universities is authored separately as L-0163.

---

# Trigger dispositions — authoring pass of 2026-08-04

Model recorded by this transcript: **claude-opus-5**. `/data` and `/schemas` untouched; `--dry` holds.
This pass extends the drop only. **No existing record was deleted or rewritten**; one, L-0157, was
amended on instruction (sources appended, confidence raised, caveat replaced, two clauses corrected).

**Counts after this pass:** ledger 34 (L-0150…L-0183) · series 42 · provenance 19 (P-100…P-118) ·
pairs 11 (PR-48…PR-58). Schema validation against the live `schemas/` is clean for all four layers;
reference integrity is clean, including the record-to-series backlink for every `affectsSeries`.

## B-1 — "for every rupee X contributes it gets back Y paise" — **CLOSED. Authored as a declared absence.**

Authored at **L-0183**, with **P-118** carrying the measurement structure and **PR-58** carrying the
substitution. The disposition adjudicated to this pass was applied: `reasonKind: not-collected`,
`reasonDisputed: true`, `disputeKind: evidentiary`, and the reasoning is written onto the record
rather than merely implied by the value.

- **not-collected** because the schema records the STATED reason, and the holder has stated it five
  times in sixteen years across both Houses, the last two word for word identical: state-wise data on
  collection of indirect taxes "is not maintained".
- **not never-defined**, and the record says so: nine Finance Commissions used contribution to tax
  revenues as a weighted devolution criterion for roughly forty years, so the quantity was collectable
  in principle and in practice. The transfer-mechanism sentence advanced for `never-defined` comes
  from an answer of 3 February 2020 that **this drop does not hold** — no part fetched it — so it is
  recorded as an argument raised and rejected and **nothing rests on it**.
- **not withheld**: more than ten dated, specific requests, **zero refusals**.
- The dispute flag is evidentiary because the blanket sentence is false of part of its own scope —
  the goods and services tax is an indirect tax and the Ministry publishes it state-wise every month,
  including inside annexures to two of the five answers that deny keeping it.
- **Substitution is recorded as an observation and NO enum value is proposed.** Four instances are
  named on L-0183 and PR-58 exists to make the move visible.
- The two open threads are carried as `wouldFill` and not as findings: the laid paper that would
  fulfil the 2005 undertaking, and five directly on-point answers unretrievable through a **systemic**
  archive defect (the retrieval path was proved first on downloadable siblings in the same directory).
- **The Lok Sabha limit is on the record's `caveat`**: LS question body text is never populated, so
  every LS negative here is subject-line-only and materially weaker than its RS counterpart.

## B-2 — the pre-2 February 2021 excise rates — **CLOSED. L-0157 raised to `confidence: high`.**

Twelve sources appended, each traceable to part 09's per-document retrieval: the Finance Bill,
Memorandum, JS(TRU) letter, both 2021 notifications, notifications 21/2018-CE and 5/2020-CE (archived
CBIC copies — the live tree is 404 throughout), the PPAC tariff table, the Constitution, and the two
2018 precedent documents. The arithmetic reconciles to the paisa and was re-derived here. The
remaining soft edge — section 147 of the Finance Act 2002 unretrieved — is stated on the new caveat,
with the note that it can only understate the figures carried, never overstate them.

Three findings authored from the same retrieval, **all as arithmetic, none imputing intent**:
**L-0180** (branded diesel one paisa dearer; "no additional burden" holds for three grades of four,
with the M3-verified absence of any before-column in the 2021-22 budget papers as an `unmeasured`),
and **L-0181** (the ₹0.10 error in the JS(TRU) table sits on exactly that row; the other three rows
are correct; notification 01/2021-CE misdescribes its own amendment history; branded petrol BED was
₹4.16, not ₹4.18).

## B-3 — the parliamentary corpus — **CLOSED. All four held-back series authored, and eleven more.**

Seventeen series in total, every URL traceable to part 08 or part 09.

1. **The Union's own cess/surcharge statement** — `cess-share-gtr-parliamentary`,
   `surcharge-share-gtr-parliamentary`, `cess-surcharge-share-gtr-parliamentary`, with **L-0175** and
   **P-115**. Held as a THIRD convention and never merged with the drop's other two. P-115 records
   that the Union's own two answers are mutually irreconcilable and that neither defines its set.
2. **AIDC collected against transferred** — `aidc-collected`, `aidf-transferred`, **PR-56** (the
   pair, and `gapComputable: true`, because the Union strikes the balance itself), **L-0176**, and
   **L-0177** for the Oil Industry Development Fund's four nil years and the footnote conceding a
   1974 cess had no Reserve Fund until FY2024-25.
3. **CSS releases by state** — `wb-css-releases`, `bihar-css-releases`, `tn-css-releases` and
   `css-releases-all-states` (the denominator), with **L-0178**. The Central Sector counter-evidence
   is carried on the record's face, and the Delhi implementing-agency artefact is flagged.
4. **Samagra Shiksha** — six series across three states, **PR-57**, and **L-0179**. Part 08's
   correction is applied: the table carries **five** years, not three. The asymmetry is the finding —
   Tamil Nadu's zero was part-paid in arrears on the Union's own footnote and West Bengal's was not.
   This also **explains** the two figures already carried at L-0101: ₹362.81 crore is the arrears
   payment, made in FY2025-26 against the FY2024-25 allocation.

## B-4 — RBI *State Finances* — **STILL OPEN. Not authored, deliberately.**

Neither part 08 nor part 09 retrieved it, so no citable URL exists and the hard rule applies
unchanged. PR-55 continues to carry the point as flagged and non-relied-on. Unchanged by this pass.

## Additional dispositions from this pass

- **The three-series divergence** (raised in STATE.md, not a trigger) — **CLOSED** at **P-116**,
  referenced from all three series, with all fourteen residuals printed and the direction of
  subtraction stated on the face of the record. Every one reproduces.
- **The BE-to-Actual inputs** — **CLOSED**. `devolution-budget-estimate` and
  `devolution-actual-receipt-budget` authored; all eleven stated gap values reproduce from them to
  the stated decimal. The full-budget-not-interim rule is now written into the gap series' notes.
- **The two-instrument problem** — **CLOSED** at **P-117**, cross-referencing **P-105** (which is the
  record carrying part 02's three-instrument finding — not P-101, which is the cess-fund record), and
  **L-0182** for the unexplained ₹67,819.29 crore FY2017-18 divergence.

## ⚠️ ONE CORRECTION DELIBERATELY NOT APPLIED

Part 09 recommends replacing four `fc-devolution-rupees` values (FY2017-18, FY2018-19, FY2021-22,
FY2022-23) with Receipt Budget figures. **REJECTED, on instruction and on the evidence.** Three of
the four are the definitional gap between instruments that part 02 already documented and
characterised correctly; they are not errors. Replacing them would overwrite a correctly sourced
Commission compilation with a different instrument's figures and break the internal consistency by
which every row of the Commission's Table 7.5 reproduces from its own Annexure 7.1. `fc-devolution-rupees`
is **unchanged in value**; only its `notes` and `provenanceRefs` were extended, to say what instrument
it is. What part 09 contributed that IS new and material — FY2017-18 diverging by 11.2 per cent,
4.7 times the next largest, in a year part 02's comparison table does not cover — is authored at
L-0182 as unexplained, and **no component is guessed at**.

## Triggers fired by this pass

**None of class A, D or F. No enum value was added or proposed.** The `withheld` bar was not
approached: the one candidate, B-1, was adjudicated to `not-collected` precisely because no refusal
exists. One pre-existing condition is noted and NOT fixed, because it is not this pass's to touch:
four ledger records already in the drop (L-0152, L-0155, L-0163, L-0166) carry an `unmeasured` entry
with `reasonKind: not-published` and no `wouldFill`, which `tools/lib/integrity.mjs` treats as a hard
error under its ENTAILS_A_ROUTE rule. Every `unmeasured` entry authored by this pass supplies one.
