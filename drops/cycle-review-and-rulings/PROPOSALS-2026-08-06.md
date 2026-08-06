# Three proposals and one triage. Written 2026-08-06 at `699f135`. Builds nothing.

Two operator answers are written into `CLAUDE.md` in the same commit. The first has since been
**WITHDRAWN**, and it is quoted here rather than edited away so the correction can be checked: this
paragraph read *"**phase 16 is the counterfactual engine**, in one place, with the note that no
canonical phase list exists — which is why two names ran in parallel unnoticed"*. **Phase 16 is
shocks calibration**, on the operator correction of the same day, and the counterfactual engine is
recorded in `CLAUDE.md` as considered and declined. The second answer stands: **engine output may
not be cited by a scored record**, recorded alongside the self-audit rule because both answer one
question. **The three proposals below are unaffected** — none of them depends on the phase's name.

---

# 1. PROPOSAL — an `independence` field

## The problem, measured

Independence is the axis five rulings turned on. **It is recorded nowhere.** 11 of 223 ledger records
state an independence finding in an `assessmentNote`, in four different vocabularies; **212 carry no
statement of any kind.** The pass of 6 August cannot be reproduced from the data: a reader who wants
to know which records rest on the announcing body has to re-derive it by hand, from citations, for
every record. **A rule that cannot be re-applied is a rule that will drift.**

## Values

Three, established by the cycle and already used in prose:

| value | meaning |
|---|---|
| `none` | every source bearing on the claim is the announcing body or its own ministry |
| `intra-state` | a different institution of the same state measures the announcing body, **and published the figure as part of its own statutory or routine function** — the R1a condition, which is part of the value's definition rather than a separate flag |
| `external` | at least one source outside the Indian state bears on the claim |

**Ordered, and the order is evidentiary, not moral.** `external` > `intra-state` > `none`.

Two conditions travel with `intra-state` and must be in its definition, because both were live
failures in the pass: **the qualifying source must bear on the limb in dispute**, and **the
qualifying document must be held** — L-0026 and L-0029 reach the RBI *Financial Stability Report*
only through a news account of it, so their intra-state claim is not passed on anything the
instrument has. A record claiming `intra-state` on a document it does not hold is asserting a test
it did not run.

**Not proposed: a fourth value for "not assessed".** That is what the absence of the field means, and
a fourth value would let a record assert that it declined to look.

## What marks a record as in scope

**Scope is the evaluative class: `worked`, `partly`, `failed`, `reversed` — 57 records of 223.**

The reasoning, and it is the part most likely to be got wrong. Independence is a property of
*evidence for a claim about an outcome*. A `no-objective` record establishes that nothing was
claimed; a `contested` record declines between readings; a `baseline-context` record is never scored.
None of them asserts an outcome, so none has an independence question to answer. **Requiring the
field everywhere would produce 166 records asserting an independence grade for a claim they do not
make**, which is worse than an absence.

**One deliberate asymmetry, and it should be argued rather than assumed:** `failed` and `reversed` are
in scope. R1 raised the bar for agreeing with the government and said nothing about disagreeing with
it, and 16 `failed` records currently rest on evidence nobody has graded for independence. **If the
principle is about what evidence can carry, it does not have a direction.** L-0030 is the case that
tests it — one authoritative statement that no public-sector bank was privatised is not weak
evidence, it is the right evidence, and an independence grade should say `none` and be *correct*
rather than damning. A grade is a description, not a demerit.

## The gate

`tools/independence.mjs`, in the build, in the shape the render gates already use:

1. **Guarded or exempted by name, no third state.** Every record in the evaluative class carries
   `independence`, or is named in an exemption file with a reason. Silent on success; emits its own
   scope — `57 evaluative records · none N · intra-state N · external N · 0 unassessed`.
2. **The value must be consistent with the record's own citations.** `external` requires at least one
   source whose tier is `T1F`, `T2`, `T3` or `T4`; `none` requires that *no* such source exists. This
   is a **weak** check and must be documented as one: tier is about the artefact and independence is
   about the relationship, so a T1 source can be independent (the CAG on a ministry) and a T4 source
   can be the announcing body's own press note relayed. It catches the contradictions, not the
   judgements.
3. **`intra-state` requires the record's prose to name the measuring institution.** Mechanical: the
   `assessmentNote` must contain a named body other than the announcing one. Without this the value
   becomes the sink `contested` was.
4. **Two-sided control**, as `enum-parity` and `withdrawn-wording` have: seed a record with
   `external` and no non-T1 source and assert it is named; seed a valid record and assert silence.

**The gate cannot check the judgement and must say so in its own header.** It checks that a judgement
was made, recorded, and not contradicted by the citations. Whether the CEA is genuinely independent
of the MNRE is not a thing a gate can know.

## Backfill across 223 records

**Only 57 need a value, and 10 of those are already judged** — the pass wrote them in prose.

The derivation for the remaining 47, and it is deliberately conservative:

1. **Mechanical first pass.** For each record, take every source bearing on the claim. Classify by
   host and issuer: Indian official = candidate `none` or `intra-state`; `T1F`, `T2`, `T3`, `T4`
   non-relayed = candidate `external`. **This produces a candidate, never a value.**
2. **The announcing body has to be named to make the `none`/`intra-state` split**, and it is not a
   field either. It is derivable from `claimAtLaunch` and the first source for most records and from
   neither for some. **Where it cannot be derived, the record is exempted by name with the reason,
   not guessed.**
3. **Every candidate is confirmed by reading the record.** 47 records is a batch, not a sweep. The
   pass demonstrated the cost of the alternative: a mechanical classification of nine records
   produced three answers that had to be corrected by reading.
4. **Where the pass did not state a value and reading does not settle it, the record is exempted by
   name.** An exemption list that starts long and shortens is the honest shape; a field that starts
   fully populated by inference is the shape that produced the 156-versus-16 measurement error in the
   scoping batch.

**Cost:** one schema change (a value on the ledger schema plus a type, label map and render
declaration — the `contestedGround` template exactly), one gate with controls, and one authoring
batch over 47 records. **This is a schema change and therefore a stop. Proposed, not built.**

---

# 2. TRIAGE — seam-span, all 35, and whether it can gate

## The narrowing

`seam-span-report` proposed its own fix: *"proximity of the two periods to each other inside one
sentence, rather than anywhere in the record."* Applied:

| | spans |
|---|---:|
| record-by-break spans, gate-emitted | **127** |
| declare the break | 92 |
| **undeclared, wide heuristic** | **35** |
| **undeclared, narrow — both periods in ONE sentence** | **21** |
| dropped by the narrowing | 14 |

**The narrowing removes 40 per cent of the candidates and is not enough on its own.** All 21 were
then read.

## The judgement, per record

**GENUINE — the sentence compares the broken series across its own seam: 6 spans, 2 records.**

| record | series × break | the comparison |
|---|---|---|
| **L-0060** | `lfpr-female` @ FY2017-18 (P-02) | *"rose from 23.3% (2017-18) to 41.7% (2023-24) … reversing a long decline that had taken rural female participation from 49.4% in 2004-05 to 35.8% in 2011-12"* — NSS-era figures set against PLFS-era figures in one sentence, which is exactly the seam P-02 declares. The record cites P-40 and P-41 and **not** P-02. |
| **L-0150** | `divisible-pool-share-gtr` @ FY2015-16 (P-103) · `cess-surcharge-share-gtr` @ FY2019-20 (P-113) · `cess-surcharge-share-gtr-excl-compcess` @ FY2019-20 (P-113) · `fc-vertical-devolution-share` @ FY2015-16 (P-103) · `fc-devolution-share-of-gtr` @ FY2015-16 (P-103) | *"the divisible pool fell from 89.1 per cent of gross tax revenue in FY2014-15 to a 74.0-79.9 per cent band across FY2020-21 to FY2023-24"* — crosses both seams, in the record's own summary sentence, and it is the flagship federalism claim. Cites P-100, P-101, P-102, P-104; **neither P-103 nor P-113.** |

**FALSE POSITIVE — the sentence's periods belong to a different quantity than the broken series: 12.**
L-0026 (PSB profit, not CRAR) · L-0095 ×2 (KVS contract engagements, not PTR) · L-0104 ×2 (higher-ed
GER and debt service, not the UGC gross provision) · L-0222 ×1 (coal production, not the non-fossil
generation share — the exact case the tool's own header names) · L-0156 ×4 (a range of *audit
reports*, FY2015-16 to FY2024-25, not a series comparison) · L-0175 ×2 (the cess share, not the
divisible pool; and the record independently discloses that its figures are *"a third convention"*).

**DECLARED IN SUBSTANCE, MISSED BY THE `declared` PREDICATE: 3.** L-0182 ×3. Its sentence says the
year-on-year differences *"are the definitional gap between cash attributed to a year and cash
accounted in a year, already documented in this drop from the Commission's own two tables."* **That
is a declaration of the discontinuity in words.** The predicate accepts only a `provenanceRefs`
entry, the break period string, or the provenance id — so a record that explains the break in prose
reads as undeclared. **The predicate is too narrow in the opposite direction, and that is a finding
about the check, not about the record.**

## The corrected rate

**6 genuine of 127 spans — 4.7 per cent, against a raw undeclared rate of 27.6 per cent.**
Concentrated in **two records**, one of which (L-0150) carries five of the six.

## Can it gate?

**Not on the narrow heuristic alone.** 15 of 21 narrow hits are not defects, and what separates them
is *which quantity the sentence compares* — semantic, not positional. No proximity rule reaches it,
and a gate failing 15 times out of 21 either blocks the build or gets weakened.

**Yes as a ratchet, and that is the recommendation.** The shape already exists in this repository:
`no-bare-root` freezes a judged population in `tools/lib/bare-root-allowlist.json` with a `history`
array, passes on the frozen set, and fails on anything new. For seam-span:

1. **Fix the 6.** L-0060 adds P-02 to `provenanceRefs` or names the basis change in the sentence;
   L-0150 adds P-103 and P-113 or states the discontinuity. **Authoring work — not this batch, and it
   moves no verdict.**
2. **Widen the `declared` predicate** to accept an in-prose explanation of the discontinuity, so
   L-0182's three stop being counted. Without this the gate demands a citation form the instrument
   does not otherwise require.
3. **Freeze the remaining 12 as judged false positives**, each entry carrying the record, the series,
   the break, and *the quantity the sentence actually compares* — the judgement, not just the id.
4. **Gate on: any narrow span not in the frozen set.** Expected steady state: 0.

**The 14 wide-only spans are not allowlisted and not fixed — they are dropped**, because the narrow
rule is the gate's rule and they do not meet it. That is a deliberate reduction in coverage and it
belongs in the gate's header: a record that compares across a seam in two adjacent sentences will not
be caught.

---

# 3. THE DOMAIN ASYMMETRY — the mechanism, against the data

The question was which of three causes produces defence 0 per cent evaluative, kashmir 4, employment
8, governance 15, against infrastructure 58 and welfare 52: **no quantified commitment was made**, **no
independent measurement exists**, or **the commitments are qualitative by nature**.

## The data cannot answer it, and the reason is itself the finding

The field that would answer it is `claimAtLaunch`. **It is optional in the schema and empty on 137 of
223 records — 61 per cent of the corpus.** In the four low-evaluative domains, *every* non-evaluative
record in the "no claim" class has an **empty field**, and **not one says a claim was absent**:

| domain | non-evaluative | claim field empty | record states no claim was made |
|---|---:|---:|---:|
| defence | 9 | 8 | **0** |
| kashmir | 39 | 33 | **0** |
| employment | 11 | 9 | **0** |
| governance | 88 | 76 | **0** |

**An empty field and a stated absence are different facts and the corpus does not distinguish them.**
So the honest answer is that the mechanism is **not measurable from the data as it stands** — and any
of the three answers offered would have been an inference presented as a measurement.

## What can be measured, and it points one way

The `type` distribution of those records:

- **defence** — of 8: institutional 4, event 2, episode 2.
- **kashmir** — of 33: institutional 17, episode 10, event 4, reform 2.
- **employment** — of 9: episode 8, shock 1.
- **governance** — of 76: episode 35, institutional 26, event 8, reform 6, shock 1.

`episode` is defined as *"a pattern or contested question over a span, with no single act at its
centre"* and `institutional` as *"a change to the rules of the game or a standing body"*. **Neither
is an announced measure with an objective**, and together they are 6 of 8 in defence, 27 of 33 in
kashmir, 8 of 9 in employment, 61 of 76 in governance. **`reform` — the type that names an announced
measure — is 2 of 33 in kashmir and 0 of 8 in defence.**

**So the likely mechanism is the first one: no quantified commitment was made, because these records
are mostly not about announced measures at all.** That is a finding about *what the state announces
in these domains*, not about the instrument — and it is an inference from `type`, offered as one.

## The one finding that IS about the instrument

**10 records carry an evaluative verdict with no claim recorded at all:**

| record | verdict | domains |
|---|---|---|
| L-0077 | `failed` | governance — electoral bonds |
| L-0080 | `failed` | governance — IT Rules fact-check unit |
| L-0095 | `failed` | governance/education — RTE §26 vacancy ceiling |
| L-0097 | `failed` | governance/education — *Devesh Sharma* |
| L-0106 | `failed` | governance/education — single-teacher schools |
| L-0108 | `failed` | governance/federalism/education — WB recruitment panel |
| L-0081 | `partly` | governance/kashmir — internet shutdowns, *Anuradha Bhasin* |
| L-0098 | `partly` | education/governance/federalism — RTE §12(1)(c) |
| L-0104 | `partly` | education — higher-education enrolment |
| L-0176 | `partly` | macro/federalism — the AIDF |

**These are scored against a statutory, constitutional or judicial benchmark that the record does not
state.** That is the "statutory double standard" both Gemini reviews named and which the first brief
under-weighted as single-family — and it is now located, counted and reproducible rather than
asserted. The reviewers' framing was that similar records were split arbitrarily between `failed` and
`no-objective`; the measurable version is narrower and sharper: **ten records are scored against a
benchmark that appears nowhere in the record's own claim field.**

**It is not a defect on its face.** A statute is a legitimate objective and R1's logic does not
exclude one. But the benchmark has to be *stated*, and on these ten it is not — so a reader cannot
tell what the record was measured against, and the corpus cannot tell whether the same benchmark
would have been applied to a comparable record elsewhere. **The fix is prose, not schema: each of the
ten names its benchmark in `claimAtLaunch`.** Authoring work; moves no verdict.

---

# 4. PROPOSAL — rendering engine output

The verification log requires this decided **before** building. The instrument already carries two
visual grammars and model output is a third thing again.

## What exists

`app/globals.css` carries four accent-border rules — the seam, caveat, absence and dispute marks.
They exist under the standing rule that **an absence renders unlike a finding**, and under rule 3a
that a caveat never truncates. A design hook has flagged all four as a generic-UI tell in three
consecutive sessions; **they are deliberate and have not been changed**, because the alternative is a
qualification that looks like a result.

The grammar in force, stated so the third thing can be designed against it rather than beside it:

| what | how it reads |
|---|---|
| **a measured figure** | solid, filled, ordinary type |
| **an `approx` figure** | ≈ prefix, dotted rule |
| **a `pending` figure** | never renders without its flag |
| **an absence** | dashed, unfilled, **no figure at all**, visibly not a panel of results |
| **a seam** | a visible break in the line; the renderer refuses to draw across it |
| **a caveat** | an accent border, full text, never truncated, at every density |

## The proposal

**Model output is not a weaker measurement and must not read as one.** The absence mark is the right
ancestor: it is the existing device for *this is not a result*.

1. **A distinct fill, not a distinct colour.** Colour is the axis already spent on status and it does
   not survive a monochrome print or a colour-vision difference. **Counterfactual output renders as a
   hatched or stippled band**, never a solid line, with the measured series drawn solid over it. A
   reader who cannot see colour still sees which is which.
2. **A band, never a point.** The engine produces a range with endpoint sensitivity — rule 8 requires
   both. **A single counterfactual line implies a precision the method does not have**, so the
   primitive is the band and there is no single-line rendering to fall back to.
3. **Both methods, always, in the same frame.** UPA-trend extrapolation and peer-index normalisation
   render together. Where they disagree, the disagreement is the output. **No view shows one alone**,
   which is rule 8 made visual rather than merely stated.
4. **A permanent label inside the plot area, not in a legend.** *"Modelled — not measured"*, in the
   band, at every density, on the same non-truncation footing as a caveat. A legend can be cropped, a
   screenshot loses it, and a chart that reads as measurement in a screenshot has failed.
5. **A different verb in every caption.** Measured series *show*; the engine *estimates*. Prose about
   engine output says so in its first clause, never in a footnote.
6. **No shared axis with a scored verdict.** The engine never renders on a record page beside the
   record's own verdict, because adjacency is an argument. It has its own layer and its own surface.

## What a gate can enforce, and what it cannot

**Can:** that every engine-output element carries the label; that no engine element renders in the
solid style reserved for measured data; that both methods are present wherever one is; that no
`sources[]` entry anywhere resolves to an engine artefact — **which is the rendering half of the
citation ruling, and is checkable today**.

**Cannot:** whether a reader distinguishes them. That is what the required statistical review is for,
and it should be commissioned to look at the rendering as well as the method, because a method that
is sound and a rendering that misleads produce the same reader.

**Proposal only. Nothing built, and the engine is not started.**
