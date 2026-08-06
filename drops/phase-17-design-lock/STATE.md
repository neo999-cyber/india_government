# Phase 17 — design lock. State. OPEN.

Opened 2026-08-06 from `f0eecc4`. **This batch builds nothing.** It measures the gap between what the
corpus holds and what a reader can see. Phase 16 closed at [`../phase-16-shocks/CLOSE.md`](../phase-16-shocks/CLOSE.md).

**A NAME COLLISION, RECORDED AND NOT RESOLVED.** This phase was opened by the operator as **design
lock**. `CLAUDE.md`'s table says **17 is independence and 18 is design lock**. The work in this batch
is design-lock work; the field ordering it recommends (§4) is independence work. **A phase name is
the operator's to set and the table is the authority until they change it**, so the collision is
written into `CLAUDE.md` beside the table and the directory keeps the name it was given. Either the
table is amended or this belongs to 18.

**`phase-name` did not fire on it, and that is a measured gap in the gate.** It binds *phase N **is**
&lt;name&gt;* and the collision arrived as a heading — *"Phase 17 — design lock"* — with no assertion
verb. The gate's header says it does not bind a phase named without its number; **it does not say it
also misses a number named without a verb, which is the form every heading takes.** Widening the
predicate is a gate contract change and is not done here.

---

# 0. THE LARGEST GAP IS NOT A DESIGN PROBLEM — the deployed site is nine commits behind

**Measured against the live deployment, not against the local build.** `https://india-government.vercel.app`
serves the corpus as at **`fa518f4`**. Confirmed on the records themselves rather than inferred:
L-0216 renders `shock` and L-0027 renders `shock` — both retyped in phase 16 — and L-0044 still
renders *"Shock exposure"* as a single prose string.

**So a reader today cannot see any of:** Ruling 5 (an objective may be imposed), Rulings 6–9, the
point-of-change rule, the three retypes, L-0020's new `assessmentNote`, L-0209's two-limb correction,
the structured exposure field, or either migration. **Nine commits, and the whole of phase 16.**

**This is not a design finding and it must not be solved by design.** `CLAUDE.md`: *push is not
autonomous while the deployment is public and unauthenticated.* **The gap between the corpus and the
site is currently one operator action wide, and every finding below is measured against a site that
predates the phase that produced most of them.** Where a surface below is judged adequate, it is
adequate at `fa518f4` and may need revisiting once nine commits land.

---

# 1. WHAT A READER SEES TODAY

Walked as a first-time reader with no context: the index, `/method`, `/derivations`,
`/counterfactual`, `/unmeasured`, a domain page, and ledger records across verdict classes.

## The index

Leads with **counts, not conclusions**: 269 series · 1,759 observations · 223 ledger records · 127
disputes · 182 series breaks · 14/14 domains. Then the status key, then a per-term breakdown, then
the domain grid.

**A reader takes away: this is an instrument, not an argument.** That is the right first impression
and the page earns it.

## The one `worked` record — the framing is already there, and it is good

**The premise of this task is that the small `worked` class might make the instrument look empty. On
the evidence, it does not, and the site says so before a reader can misread it.** The index carries,
above the fold:

> *One record of 223 says a measure worked, and that number is about the evidence rather than about
> the government… raising that standard lowers the count of established successes whatever the
> policies actually did. So read this tally as a measure of how much of Indian policy is
> independently checked.*

And `/method` gives it a section of its own — *"Why one of 223 is not a finding about the
government"* — which states that the count measures two things at once and that the instrument
cannot separate them.

**Judgment: this is the best-handled thing on the site.** It does not need design work. **It needs
one addition, from phase 16:** the same page can now say *why* the count is what it is on a second
axis — 57 of 223 records are evaluative at all, and the evaluative rate is very nearly a restatement
of how much of a domain is a deliberate measure (§2).

## A ledger record

L-0154 (`no-objective`), L-0020 (`contested`), L-0044 (`partly`) read in full. Each page carries:
the verdict as a chip near the title; term, type, confidence and domains; the summary; **what
happened**; **case for** and **case against** as equal blocks; **"WHY THIS VERDICT"** carrying the
`assessmentNote`; the absences block; sources with tiers. `contestedGround` renders as a tag —
*"would settle it: Which criterion governs"*. Caveats render in full, inline, in every listing.

**A reader takes away: this record has been argued, not asserted.** The two-case structure is the
strongest thing on the site and it is doing exactly what it was built to do.

**The one structural weakness is order.** The verdict chip is at the top; *why this verdict* is near
the bottom, below two long argument blocks. **A scanner reads the label and leaves.**

## A domain page

Leads with a **series table**, then the ledger listing with a per-domain tally. Governance: *6
baseline · 44 contested · 37 no stated objective · 8 failed · 7 partly · 4 awaiting adjudication · 3
too early · 1 reversed.*

**A reader takes away, on governance: mostly contested and no stated objective, so mostly
unresolved.** That is the misread §3 is about, and this is the surface it happens on.

## `/method`

**The strongest page on the site.** It states authorship — *"the work of one author, written with an
AI assistant"* — that the gates enforce internal consistency and not correctness, that **the planned
independent review has not been run**, and that *"no part of this has been checked by anyone who did
not write it."* It carries the tier table by layer, the 6 August rescoring, T1F, and its own
correction history including the 752-versus-928 error.

**It stops at Ruling 4.** Rulings 5–9 and the point-of-change rule are not on it — partly because of
§0, and partly because nothing has yet been written for them.

## `/derivations`, `/unmeasured`, `/counterfactual`

- **`/derivations`** — the three departed self-audit records, recomputed with the rule printed beside
  every number. Honest and unusual. A reader takes away: *this thing audits itself and publishes the
  result where it cannot cite itself.*
- **`/unmeasured`** — *373 declarations across 199 records, 291 naming a source that would close
  them*, grouped by kind. **The single best under-used surface on the site.**
- **`/counterfactual`** — **a live page, in the nav, describing a view that has been declined.** See
  §3.

---

# 2. WHAT THE CORPUS CAN NOW SAY AND THE SITE DOES NOT SHOW

**All figures field tests over `/data` or gate-emitted, exact.**

| # | what the corpus holds | on the site? | judgment |
|---|---|---|---|
| 1 | **The eleven consistent refusals** — one test (*does the pattern predate the shock?*) applied eleven times, each row being the defence, the refusal and the evidence, all verbatim | **no** | **A PAGE.** The strongest publishable finding phase 16 produced. It needs no new data — the entries carry `adjudication` — and it is checkable sentence by sentence |
| 2 | **The outcome-versus-policy split** — exposure tracks measurable series, the evaluative rate tracks announced measures, and they come apart in employment (17% reform, **8% evaluative, 75% exposure**) and human-development (25/25/**88**) | **no** | **A SENTENCE IN `/method`**, and a line on the two domain pages where it happens. Not a page: it is an explanation of a distribution, not a finding about India |
| 3 | **`reform` share predicts the evaluative rate at ρ = 0.91** — better than exposure and the evaluative rate predict each other (0.75) | **no** | **A SENTENCE IN `/method`, and the most load-bearing one available.** It converts *"this domain is thinly examined"* into *"this domain contains few announced measures"*, which is the misread in §3.3 |
| 4 | **The tier distribution and what T1F means** | **YES, fully** — table by layer, with the correction history | **nothing to do.** The best-rendered structural fact on the site |
| 5 | **The independence categories the rescoring turned on** — `none` / `intra-state` / `external`, with the R1a publication test | **partly.** `/method` explains the standard in prose; **9 of 223 records state an independence finding, in five different forms, and no record renders one as a value** | **A MARKER ON A RECORD**, once the field exists. Until then `/method`'s prose is the whole of it and is adequate |
| 6 | **`contestedGround` on 66 of 68 contested records** — criterion 22 · interpretation 13 · evidence-withheld 11 · measure 10 · evidence-unobservable 6 · time 4 | **partly** — renders as a tag on the record, *"would settle it: …"*. **No index, no filter, no count anywhere** | **A FILTER, and the highest-value one on the site.** *"Show me the contested records that a document would settle"* is 11 records; *"…that nothing would settle"* is 38. **That distinction is the difference between a hedge and a finding** |
| 7 | **Seam and basis-break declarations** — 100 of 269 series carry breaks, 182 breaks; **94 of 127 disputes have no accepted reconciliation** | **YES** — red seams on series, the 94 figure on `/method`, `/counterfactual` states what it will not fit through | **nothing to do.** Rule 2 and rule 5a are the best-served rules in the instrument |
| 8 | **`shockExposure`'s two axes** — 76 records, 85 entries, `role` (confound 45 · cause 23 · none-stated 9 · is-the-shock 4) and `adjudication` (accepted 44 · limited 11 · refused 7 · unstated 6) | **no** (§0; and the view renders the entries but nothing aggregates them) | **A FILTER plus the §1 page.** The record-level view is built; what is missing is any surface that reads across records |
| 9 | **373 absence declarations across 199 records, 291 with a route to closing them** | **YES**, `/unmeasured` | **nothing to build — but it is unlinked from the records that declare them.** A cross-link, not a page |
| 10 | **Rulings 5–9 and the point-of-change rule** | **no** | **SENTENCES IN `/method`.** Ruling 5 in particular changes what a reader should expect a `failed` verdict to mean |

---

# 3. WHAT A READER WOULD CURRENTLY MISREAD

**This is the important section and each item names the surface.**

### 3.1 `contested` and `no-objective` read as "no result" — on the domain pages and the ledger index

**The surface:** a domain tally reading *"44 Contested · 37 No stated objective"* out of 110, with no
gloss. **The misread:** 81 of 110 records reached no conclusion.

**What the corpus actually holds.** `no-objective` means *the record finds something real and nothing
was claimed against which to score it* — L-0154 establishes that five constitutional action verbs
have no definitions and that one of them was construed as refusal four and a half years later. That
is a finding. And `contested` **is not one thing**: 66 of 68 carry a `contestedGround`, and the six
values split into *nothing would settle this* (criterion 22, measure 10, evidence-unobservable 6 = 38)
against *a specific document or ruling would* (evidence-withheld 11, interpretation 13, time 4 = 28).

**The fix is not a rename.** It is the §2.6 filter plus one sentence per tally. **The record pages
already say it; the listing pages do not.**

### 3.2 The small `worked` class reads as a verdict on the government — on the index and the term tallies

**Already handled, and handled well** (§1). **The residual risk is the term tallies**, which render
as *"8 Failed · 22 Partly · 23 Contested · 19 No stated objective · 1 Awaiting adjudication · 1
Worked"* with no framing attached to the tally itself. **A reader who scrolls past the paragraph
meets the number without it.** A one-line gloss on each tally, not a new page.

### 3.3 A domain with few evaluative records reads as unexamined — on the domain grid and the domain pages

**The surface:** kashmir shows 46 ledger records and 0 series; defence shows 10 records and 0
evaluative verdicts. **The misread:** *the instrument looked away.*

**The corpus refutes it and can now prove the refutation.** Kashmir is **11 per cent `reform`** and
defence **0 per cent** — they contain almost no deliberate measures with announced objectives, so
there is almost nothing that *can* take an evaluative verdict. **`reform` share predicts the
evaluative rate at ρ = 0.91.** The low rate is a fact about what the domain contains.

**This is the misread the corpus is best equipped to fix and the site does nothing about.** One
sentence and one column.

### 3.4 An absence renders like a finding — the risk is inverted, and the real defect is the reverse

**Rule 4a is well served**: the absence block is dashed, unfilled, no figure, no table, and
`/unmeasured` frames the whole class. **The misread runs the other way: 373 declared absences are
findings that read as housekeeping**, because they sit below the argument on the record page and on
a page reachable only from the top nav. **A cross-link from the declaring record's absence block to
`/unmeasured`, and from `/unmeasured` back, is the whole fix.**

### 3.5 `/counterfactual` promises a view that has been declined — on the page and in the top nav

**The surface:** a nav item and a page reading *"Two methods run side by side… Method A — UPA-trend
extrapolation… Method B — peer-index normalisation."*

**The corpus declined the counterfactual engine on 2026-08-06**, with the reasoning recorded in
`CLAUDE.md` so a later cycle would not rediscover it as an obvious gap. **The page describes it in
the future tense and the nav offers it as a destination.** A reader takes away that the engine is
forthcoming.

**This is the clearest live contradiction between the corpus and the site**, and it is the same class
as the prose shadow: a surface restating a decision that has since moved. **It is a rewrite, not a
deletion** — rule 8 still governs the modelled quantities the corpus already carries, and the page
should say what was declined and why.

### 3.6 The verdict chip precedes its reasoning — on every ledger record page

*"WHY THIS VERDICT"* is below `caseFor` and `caseAgainst`. **The verdict was invisible for the whole
life of `assessmentNote` and that was fixed; what remains is ordering.** A reader who reads the chip
and stops has read the conclusion without the ground — which is the failure the two-case structure
exists to prevent.

---

# 4. WHAT PHASE 17 MUST BUILD — order, dependency, and what each unlocks on the surface

| order | field | depends on | what it unlocks for a READER |
|---|---|---|---|
| **1** | **`objectives[]`** — `text` · `quantified` · `measurement` (incl. `unmeasurable-no-event`) · **`grounds`** · `commitmentState` per limb · `unmeasuredRef` | nothing | **A rendered distinction on 43 records**: which limbs a verdict rests on and which it does not. Today L-0011's `failed` looks like a verdict on four objectives and rests on two |
| **2** | **`claimAtLaunch` vocabulary** — `NONE ANNOUNCED` / `NONE LOCATED` / `BENCHMARK` | **must be designed WITH (1)** — a record with `NONE ANNOUNCED` must have an empty `objectives[]` | **A count that is currently unanswerable**: 137 of 223 records have no claim, and nothing distinguishes *nothing was announced* from *nobody looked* |
| **3** | **`independence`** — `none` / `intra-state` / `external` | independent of 1 and 2 | **A marker on 57 evaluative records.** `/method` explains the standard; no record shows which grade it holds |
| **4** | **`commitmentState`** | **absorbed by (1)** — it attaches to the limb on the corpus's own usage | **Nothing on its own.** See below |

## The dependency, stated plainly

**`commitmentState` is not a fourth field.** L-0221 and L-0223 file *limbs* as *"commitment state
(a)"*, so it is a property of `objectives[]`. **Building it separately would create a record-level
axis the corpus does not use.** It drops out of the list as a field and survives as a column.

## Which of these change what a reader can see, and which only satisfy a rule

**This is the question that reorders the list.**

- **`objectives[]` — changes what a reader sees.** It is the only one of the four that alters a
  record page directly: a verdict that names its grounds, limb by limb.
- **`claimAtLaunch` vocabulary — changes what a reader sees, and by more than it looks.** It turns
  137 blank fields into a stated fact. **An empty field is the one thing rule 4a forbids anywhere
  else in the instrument**, and this is the largest remaining instance of it.
- **`independence` — changes what a reader sees, but marginally.** `/method` already explains the
  standard in prose better than a per-record chip would. Its real value is **enforceability**: it
  makes the 6 August pass reproducible from the data, which is a rule benefit and not a reader
  benefit. **Ranked third for that reason, and it should be understood as a rule field.**
- **`commitmentState` — changes nothing on its own** and is absorbed by (1).

**So the honest order is: `objectives[]` and the `claimAtLaunch` vocabulary together, then
`independence` as a rule field, and `commitmentState` never as a field.**

---

# 5. WHAT I WOULD NOT BUILD

**A design phase that adds everything measured buries the findings under the apparatus.** Six things
are measured, real, and should not become surfaces.

1. **The accept-versus-verdict cross-tab.** 44 records accept an exogenous explanation and none is
   `failed`. **It is circular** — the adjudication was read from the same prose the verdict rests on
   — and putting it on the site would import that circularity into a page that does not have it.
   **Publish the eleven refusals instead**: same subject, checkable rows.
2. **A `basis` property for refusals** (predates · peer · legal · baseline · partitions). Real, and
   **five values across fifteen records is a taxonomy heavier than the thing it sorts.** The eleven
   are legible as prose. Revisit if the set doubles.
3. **`direction` on exposure entries.** Measured in phase 16 and correctly not built. One record
   (L-0014) needs it.
4. **Any composite, index or score.** Rule 9 forbids it and it is the single most requested thing a
   reader would want. **The refusal is the product.**
5. **A shock object, until a shock breaks a series.** Ruling 8's condition, already written into the
   field's own schema description. **Building it now would create a layer with no member that
   satisfies its own required fields.**
6. **A per-record `independence` chip in a prominent position.** The grade is a description, not a
   demerit — L-0030's `none` is *correct* evidence, not weak evidence — and a chip reads as a
   demerit. If it renders, it renders in the sources block beside the tier, not beside the verdict.

**And one thing I would not do to the surfaces that work.** `/method`, `/derivations`, `/unmeasured`
and the two-case record structure are the instrument's argument. **The gap is not that they are
missing; it is that four of the ten items in §2 have no surface at all and two surfaces now
contradict the corpus.** Fix those; leave the rest.

---

## Queue

1. **Push.** Nine commits, the whole of phase 16, and every judgment above is against a stale site.
2. `/counterfactual` — rewrite as *considered and declined*, with the reasoning.
3. The eleven-refusal page.
4. `contestedGround` as a filter, plus the *would settle / nothing would settle* split.
5. Three sentences in `/method`: the ρ = 0.91 finding, the outcome-versus-policy split, Rulings 5–9.
6. A gloss on every verdict tally; a cross-link between absence blocks and `/unmeasured`.
7. `objectives[]` + the `claimAtLaunch` vocabulary, designed together.
8. `independence` as a rule field.
