# Adversarial triage, cycle 1 — corpus defect or rendering defect

**Read-only against `/data`. Nothing in `/data` was amended.** Two generator defects were fixed,
because `tools/gen-review-extract.mjs` is not corpus. Every reviewer claim below was treated as an
unverified premise and checked against the corpus first; three of the eight did not survive.

---

## Verdict table

| # | Reviewer claim | Verdict | Where the defect lives |
|---|---|---|---|
| a | Extract flattens `reasonKind` into one label | **False** | — |
| b | Universal absence language is generator-manufactured | **False — it is in `/data`** | corpus |
| c | Tier gloss reads as provenance-equals-strength | **True, and worse** | generator (fixed) |
| d | Declared count 34 ≠ 38 sections | **True** | generator (fixed) |
| e | Pellet record contradicts itself | **True** | corpus |
| e2 | Union MHA and J&K govt called "the same government" | **False** | — |
| f | L-0195's central claim fails on "since the signing" | **Partly — against the note, not the body** | corpus |
| g | Demonetisation concludes on objectives it does not measure | **True, and worse** | corpus |

---

## PART 1 — corpus or rendering

### (a) `reasonKind` flattening — FALSE

The generator maps all four values to distinct sentences, and all four appear in the output:
never gathered by anyone **13** · exists but has not been released **39** · specifically requested
and refused **10** · no agreed definition exists **6**. The distinction the corpus built is intact
and the reviewer attacked nothing.

**One concession the claim half-earns.** The *heading* is uniform — every entry renders as
"**Not measured.**" — so the distinction is carried in the sentence, not in the label. A reviewer
skimming headings would see one category where the corpus has four. That is a salience defect, not
a flattening, and it is in the generator.

### (b) Universal absence language — IN `/data`, NOT MANUFACTURED

Eight instances, all in one cluster: L-0114 (×4), L-0124, PR-32, P-87, `jk-pellet-deaths`,
`jkccs-civilians-killed-by-armed-forces`. The generator introduces none of them. **So this is a live
5d question in shipped records** — but the eight do not resolve the same way, and four of them
discharge the claim in the same breath.

**Four are enumerated and largely discharge themselves.** PR-32: *"After 2019 no instrument of any
provenance publishes the perpetrator split — not MHA, which has never had a column for it; not GTD,
which covers non-state perpetrators only by construction; not UCDP, which records
Government-of-India one-sided violence in three country-years ever and none after 2002."* The claim
is bounded by a named set with a stated reason per member. That is what 5d asks for.
**Residual overreach in phrasing, real but narrow:** the enumeration bounds four instruments while
the phrase "of any provenance" claims the world. `no instrument located publishes this` would say
exactly what was established.

**Two are genuine unhedged 5d violations.** L-0114's `differentFactsNote`: *"No instrument of any
provenance **has ever measured** it"* — of deaths avoided by substituting shotgun for rifle — and
`caseAgainst`: *"nobody has ever measured that"*. No enumeration, no bound. The quantity is a
counterfactual and the claim is probably true, which is exactly why 5d exists: probably-true is not
retrievable.

**Two are both 5d violations and factually contradicted** — see (e).

**The sharpest detail is internal to L-0114's summary.** One sentence reads *"the only official
Indian document **located in this phase**"* — correctly hedged. The very next reads *"It is also
the only pellet quantity any government has ever published"* — unhedged. The author had the correct
form in hand and dropped it in the following clause.

### (c) Tier gloss — GENERATOR DEFECT, worse than claimed. Fixed.

The schema's operative rule is explicit: *"Evidence grade of the DOCUMENT ACTUALLY RETRIEVED, not of
the institution the subject belongs to… Grade what you hold, not what it is about."* The extract's
gloss omitted that sentence entirely and presented an institution ladder — responsible body,
international body, academic, press, index — which reads as provenance-equals-strength exactly as
the reviewer says.

**And it misdescribed T2.** The gloss said *"an international or **statutory** body's own
publication"*. Under the schema a domestic statutory body — the national auditor, the central bank —
is **T1**; T2 is multilateral and international sources only. A reviewer using the gloss would have
mis-graded every audit-report citation in the extract.

Corrected: the gloss now leads with the operative rule, states that a tier moves only when the
evidence moves, and states that a domestic statutory body is T1 and not T2.

### (d) Declared count — GENERATOR DEFECT. Fixed, with a check that fires.

The opening line hard-coded "Thirty-four" while the sample had grown to 38. The count is now derived
from the sample, and a validation refuses to write the file unless the declared total equals the
numbered headings actually emitted. Proven by forcing the old value:

```
gen-review-extract FAILED — declares 34 records but emitted 38 numbered headings
```

---

## PART 2 — internal checks

### (e) The pellet record contradicts itself — CONFIRMED

L-0114 `summary`: *"It is also the only pellet quantity any government has ever published."*

L-0114 `whatHappened`, the next field: *"The J&K Chief Minister told the Legislative Assembly, in a
written reply reported on 12 January 2018 — twenty-six days before MHA's refusal — that between
8 July 2016 and 27 February 2017 in the Kashmir division 51 people were killed, 9,042 injured,
**6,221 injured by pellets**, 782 with eye injuries and 510 hospitalised."*

Five quantities, one of them pellet-specific, published by a government, reported by the record
itself. The universal claim is contradicted by the record's own next paragraph. The same claim is
duplicated on the series `jk-pellet-deaths`.

### (e2) "The same government" — FALSE

The record distinguishes them explicitly and makes the distinction load-bearing: *"the ministry
that publishes the deaths refused to publish the harm on national-security grounds twenty-six days
after **its own state government** had published the aggregate in a legislature."* The twenty-six-day
gap between two different governments is the point being made. This sub-claim has no support.

### (f) L-0195 — PARTLY. The note fails, the body already contains the correction.

The reviewer says the record reasons that no baseline is named, and that "since the signing" names
one. The `assessmentNote` does say *"the claim does not state its baseline"* — and on its own that
is not sustainable.

**But the record's `caseAgainst` already argues the reviewer's case, in stronger terms than the
reviewer does:** *"'since the signing' points at it only by straining. On the two baselines the
words actually indicate, the claim fails, and for Australia it fails badly: 1.08 times CY2021 is not
a doubling but noise, and 0.85 times CY2022 means two-way trade with Australia has FALLEN since ECTA
was signed."*

So the finding is narrower and more precise than the reviewer's: **the summary reason does not match
what the record's own body establishes.** The body shows the claim indicates a baseline, that the
natural reading makes it false, and that only a strained reading rescues it — which is closer to a
failure verdict with a stated minority reading than to a refusal to choose. This is the
note-versus-body mismatch this corpus has hit before, not an error in the analysis.

### (g) Demonetisation — CONFIRMED, and worse than the claim

`claimAtLaunch` names four objectives: elimination of black money held as cash; destruction of
counterfeit currency; cutting off terror financing; and, after returns approached 100 per cent, a
shifted justification of digitisation and formalisation.

`whatHappened` presents evidence bearing on **two**: the 99.3 per cent return rate (black money held
as cash) and *"Counterfeit detection was minuscule"* (counterfeit). **Terror financing is not
measured at all. Digitisation and formalisation are not measured at all.** No figure, no proxy, no
`unmeasured` entry — the record carries none.

Score: **failed**. And `assessmentNote` is **null** — the corpus's most prominent negative verdict
carries no stated reasoning whatever.

### (h) Score distribution, whole corpus — 219 ledger records

| | count | share |
|---|---|---|
| **Reach a clear verdict** | **56** | **25%** |
| — partly | 31 | |
| — failed | 15 | |
| — worked | 9 | |
| — reversed | 1 | |
| **Abstain** | **163** | **74%** |
| — unscoreable for want of a stated target | 72 | |
| — contested | 65 | |
| — too early | 11 | |
| — background only | 11 | |
| — pending an outside decision | 4 | |

**The instrument abstains in three records out of four.** That is the largest structural fact about
the corpus and it is not visible from any single record.

**92 records — 42 per cent — carry no `assessmentNote` at all**, concentrated in the earliest files
(every record from L-0001 to L-0024 inclusive). The convention postdates them; the verdicts do not.

**The obvious follow-on charge is NOT supported.** Testing whether abstaining records hide a verdict
the text would carry — `caseAgainst` more than 1.6× the length of `caseFor` — returns **9 of 163**:
L-0083, L-0100, L-0101, L-0107, L-0121, L-0102, L-0103, L-0105, L-0158. Abstention is overwhelmingly
not a lopsided case dressed as balance. Length is a crude proxy and this test should not be treated
as conclusive, but it points away from the charge rather than toward it.

---

## PART 3 — leads requiring retrieval. NOT acted on, NOT entered as sources.

| Lead | What would settle it |
|---|---|
| The FY baselines behind the doubling claim | A ministry release or PIB statement naming the base year for "trade has doubled"; would move L-0195 from a note-versus-body mismatch to a scoreable claim |
| Dassault's offset partner | A Ministry of Defence statement or Dassault filing naming the Indian offset partner and the obligation discharged |
| The CAG report on offsets | The CAG's performance audit of offset obligations; would test the indigenisation arc's central unmeasured |
| The CAG Rafale acquisition report | The record acknowledges it was tabled; retrieving it would make the Ministry's own better-pricing claim testable for the first time — the term the contested score turns on |
| The 1.31% elector-parity figure for J&K delimitation | The Delimitation Commission's own report or an ECI publication carrying elector-per-seat by constituency. **Attributed to a language model, which is not a source**; it must be retrieved from a primary or dropped |

---

## What this triage would fix first, if permitted to amend

1. **L-0114's summary sentence and the `jk-pellet-deaths` caveat** — a universal claim contradicted
   by the same record. Highest severity: it is wrong, not merely unhedged.
2. **L-0011's null `assessmentNote`** — a failure verdict with no stated reasoning, on the
   best-known measure in the corpus.
3. **L-0114's two counterfactual claims** — "no instrument of any provenance has ever measured it",
   "nobody has ever measured that". Unhedged 5d, one-clause rewrites.
4. **The four enumerated absence claims** — narrow the phrase to what the enumeration bounds.
5. **The 92 missing `assessmentNote` fields** — a sweep, not a correction; the early corpus predates
   the convention.
