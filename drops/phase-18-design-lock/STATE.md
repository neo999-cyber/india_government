# Phase 18 — design lock. STATE.

**Read this file cold at the start of a session. It holds only what is still live.** Closed material
is in `state/phase-18.md`, moved there 2026-08-11 as a pure move — byte-identical, nothing edited.
**A section moves out only when it is closed, no open item depends on it, and any open item citing
it carries that evidence inline here.**

Also read `drops/phase-17-design-lock/STATE.md` as phase 18's opening measurement, per the CLAUDE.md
phase table. **That directory is named wrong on purpose and is left wrong**, on the same principle
that leaves a withdrawn wording quoted: renaming it erases the name collision its own contents
document.

---

## RESUME HERE

**Phase 18 is open.** Governed by `DESIGN-SCOPE.md` in this directory, revision 3, which supersedes
the two pre-phase drafts kept in its `inputs/`.

The five design features and the queue that carried them are **closed and archived**, and so is
everything that was listed under OPEN ITEMS: `DESIGN-REVISION.md` items 1-4, the domain period prose
at fourteen of fourteen, and the authored series findings at 237 of 269. **§10's last undecided item
— the corpus's internal register on a public surface — was closed 2026-08-12 by measurement and a
label-map sweep.** What remains is the two standing hazards, below.

**This paragraph was itself stale until 2026-08-12** and said one writing item remained after the
last one had shipped. A file read cold at every session start is the one place staleness costs most,
which is why the pins below now carry the gate output they were measured from.

**THE LIVE BRIEF IS NOW `DESIGN-REVISION-2.md`** in this directory, and it has its own build order.
**Items 1 and 2 have shipped; items 3 to 7 carry.** See the section below.

---

## OPEN ITEMS

### DESIGN-REVISION-2 — items 1 and 2 SHIPPED, items 3 to 7 CARRY

`DESIGN-REVISION-2.md` is in this directory. Its §8 records five rejections with the rule each
breaks, and §9 restates ten constraints; neither is re-derived.

**ITEM 1, THE TWO TRACKS — DONE 2026-08-12** (`a762f62` and the commit before it). `OutcomeRow` is
the outcome track and `CaveatRow` the evidence track, and a surface declares which it draws on by
which it calls. Ratio outcome-pages-per-record **1.02 -> 5.34**, caveat unchanged at 11.81, so the
asymmetry closed by adding the outcome and not by quieting the qualification. **The ledger table was
declined with three stated grounds** and the decision stands: a ledger row already states an outcome
(its assessment), `summary` and `whatHappened` have never been through the true-alone check, and §8
rejects reinforcing the public verdict vocabulary. **What would reverse it:** ledger records gaining
an authored outcome sentence written to the three checks.

**ITEM 2, QUESTION NAVIGATION — DONE 2026-08-12.** `/questions/` plus six routes. **Two of the eight
questions did not become routes and they failed differently**, both recorded in `lib/questions.ts`
rather than dropped: *which commitments were met and which missed* is **not offered** — the ledger
index already filters by assessment, and grouping records under their verdicts is a tally whatever
the labels say; *what cannot be known* is **answered by `/unmeasured/`**, which does it better than a
filter would.

**The residual from item 1 is unchanged and is not an item-2 failure:** the 2.2x outcome-to-evidence
ratio is provenance pages, year pages and cited-by grids — surfaces where a caveat renders and no
series listing does.

**ITEMS 3 TO 7 CARRY, in the brief's own build order:** record spine + next steps (§3, §9) · topic
strips (§1, §2, §10) · matrix + year strip (§5, §7) · two-truths cards (§11) · stories (§8). The
grammar item 3 inherits now holds on every series surface, which is what item 2 was waiting on.

### CLOSED 2026-08-12 — DESIGN-REVISION.md items 1-4, and the authored series findings

`DESIGN-REVISION.md` is in this directory. **§7 records eleven rejections with the rule each breaks;
they are not re-derived and not re-proposed.**

**Item 1, the series page template, is DONE** — §3's order in place on all 269 pages, the chart added
(there had never been one), the caveat moved without being changed, id and tier demoted, and the
"total change" figure withheld on the 97 series where a declared break sits inside the span.

**Items 3 and 4 are DONE.** Topic tabs as five real routes per area (56 new pages), the
missing-data tab built as new content, nav relabelled, the three-ways cards and the reduced year
control on the landing page.

**Carrying forward:**
- **Authored series findings — RULED AND UNDER WAY. 28 of 269 carry one; 210 remain.**
  The ruling is printed in `lib/series-copy.ts` and is the governing text: **derivation is closed**
  (246 of the 251 already render all their authored prose on their own page; 5 hold none), and
  **reachability partitions nothing** (0 series are index-only; a domain surface reaches all 269).
  The one surviving boundary is what a series can support: **31 single-observation series render
  without the line permanently**, criterion printed. Tranche 1 landed 10.
  **TRANCHE 12 LANDED THE LAST 34. THE AUTHORED-FINDINGS WORK IS COMPLETE.**
  **237 of 269 series carry a finding; 32 render without one permanently and for a stated reason;
  237 + 32 = 269 with zero multi-observation series unaccounted for.** Verified on the built site:
  237 of 237 render exactly once, 32 of 32 render none. Composition: 5 harvested, 13 domain leads,
  219 authored across twelve tranches of 10, 11, 16, 20, 20, 20, 16, 20, 12, 20, 20, 34.
  **Check totals:** true-alone 18 catches (2,2,4,0,2,1,1,0,3,3,0,0), caveat-duplication 5, figures 4,
  enum 27 hits with 3 acted on. **Clause metric, frozen definition:** 40, 73, 63, 60, 40, 65, 44, 50,
  50, 70, 65, 53. **Family test: 93 per cent about the world.** **Six measurements had to be
  corrected and five were wrong in the alarming direction** — they are set out in the module header
  and in the forty-fourth log entry.

  **Tranche 11 landed 20, plus TWO revisions to shipped findings. Running total 203 of 269; 34
  remain; 32 render without the line permanently.** Rate: 10, 11, 16, 20, 20, 20, 16, 20, 12, 20, 20.
  **`agri-gdp-share-peer` was revised** because `agri-gdp-share` lands showing India's agriculture
  share FALLING on gross value added where the shipped peer sentence says it ROSE on GDP — both right
  on their own denominator, a contradiction to a reader with both pages. **And a tranche-10
  true-alone fix had to be reworded**: the sentence added to
  `tn-fc-projection-minus-actual-devolution` took the caveat's words with it and tripped
  caveat-duplication. **First time the two checks have pulled against each other**, and it is a
  standing tension rather than a one-off — true-alone wants the caveat's content in the finding,
  caveat-duplication forbids its exact words. **Both frozen metrics:** family test 19 of 20 (running
  190 of 203, 94 per cent); clause metric 65 per cent, series 40, 73, 63, 60, 40, 65, 44, 50, 50, 70,
  65.

  **Tranche 10 landed 20, plus ONE REVISION TO A SHIPPED FINDING. Running total 183 of 269; 54
  remain; 32 render without the line permanently.** Rate: 10, 11, 16, 20, 20, 20, 16, 20, 12, 20.
  **`edu-spend-gdp-centre-edu-depts` was revised on a live page** because `edu-union-moe-gdp` landed
  in this tranche reading 0.635 and 0.341 where the shipped sentence gives 0.64 and 0.40 for the
  same years — a near-twin on a different construction, which the record says must never be joined.
  Reported before it was made. The other completion, `tn-fc-projection-minus-actual-devolution`
  against `devolution-be-to-actual-gap`, needed **no** revision.
  **The class test was too narrow and is widened in the module header** — it asked whether carriers
  are peer panels, which missed `P-14`, whose class is the SOURCE. **Set shape absent** on its own
  signature: names 0 per cent at every size. **Both frozen metrics:** family test 20 of 20 (running
  171 of 183, 93 per cent); clause metric 70 per cent, series 40, 73, 63, 60, 40, 65, 44, 50, 50, 70.

  **Tranche 9 landed 12, AS FIVE SETS. Running total 163 of 269; 74 remain; 32 render without the
  line permanently.** Rate: 10, 11, 16, 20, 20, 20, 16, 20, 12. **The set-shaped unit has arrived**
  — reported not-arrived twice, and the corrected interlock measure is what shows it: names is the
  lowest of any tranche (7-13 per cent) while shared runs 50-82, and no dispute here is class-wide.
  Three of the five sets complete a family whose other member is already written.
  **A standing fix landed: `tools/deploy-poll.mjs`** asserts the needle absent before waiting, after
  the hand-picked needle matched pre-existing prose twice. **Both frozen metrics:** family test 11
  of 12 (running 151 of 163, 93 per cent); clause metric 50 per cent, series 40, 73, 63, 60, 40, 65,
  44, 50, 50.

  **Tranche 8 landed 20. Running total 151 of 269; 86 remain; 32 render without the line
  permanently.** Rate: 10, 11, 16, 20, 20, 20, 16, 20. **The interlock measure itself was wrong and
  is corrected in the module header** — its shared-dispute limb counted class properties (`P-09`
  panel vintage, `P-14` WDI labelling, carried by every peer panel by construction) as reading
  dependencies. Excluding them the set reads 15/45, inside the tested point, and twenty is what the
  bound supports. **The set-shaped unit did NOT arrive:** clustering the remaining pool gave 17
  groups, but only one had any member naming another in prose, and the two five-member groups had
  none — they are artefacts of `P-64` and `P-10`. **Both frozen metrics:** family test 20 of 20
  (running 140 of 151, 93 per cent); clause metric 50 per cent, series 40, 73, 63, 60, 40, 65, 44,
  50 — not trending.

  **Tranche 7 landed 16. Running total 131 of 269; 106 remain; 32 render without the line
  permanently.** Rate: 10, 11, 16, 20, 20, 20, 16. **The bound did not cover this set** — no size
  from 10 to 24 sits inside the tested (20,45) point, and sixteen was taken on a stated ground
  rather than interpolated. The cause is three allocation/release pairs in the set.
  **Both frozen metrics, reported as numbers:** family test 16 of 16 about the world (running
  120 of 131, 92 per cent); clause metric 44 per cent on the six-term definition, against
  40, 73, 63, 60, 40, 65 before it. Neither is trending.

  **Tranche 6 landed 20. Running total 115 of 269; 122 remain; 32 render without the line
  permanently.** Rate: 10, 11, 16, 20, 20, 20. Interlock 15/40, inside the bound; the 16- and
  24-sets were measured and not taken. **The tranche-5 family count of 4-of-20-about-the-world does
  NOT replicate and is corrected in the module header:** under a stated mechanical test applied to
  all 115, **104 carry a substantive statement about India, 90 per cent**, and tranche 5 is 16 of 20.
  The earlier number came from an unstated classifier — the fourth measurement in this work to be
  wrong. **The clause metric drifted the same way and is now frozen** at the six-term tranche-3
  definition; the comparable series is 40, 73, 63, 60, 40, 65, which oscillates and does not climb.

  **Tranche 5 landed 20. Running total 95 of 269; 142 remain; 32 render without the line
  permanently.** Rate: 10, 11, 16, 20, 20. Interlock over the candidate set was 10/45, at or below
  tranche 4's, and the bound's twenty was taken with no finer claim. **The negating-clause metric
  FELL — 63, 65, 50 — and negative-definition-as-shape has gone 13, 5, 0, so the tic did not form.**
  **What changed is the subject: 17 distinct shapes across 20, and only 4 of 20 are about the world
  while 16 are about how it is measured.** Recorded, not corrected; the family count is the thing to
  watch. True-alone found 2 after its zero, so it has not gone quiet.

  **Tranche 4 landed 20. Running total 75 of 269; 162 remain; 32 render without the line
  permanently.** Rate by tranche: 10, 11, 16, 20. **What bounds a tranche is INTERLOCK, computable
  from `/data` before writing** — the share of a candidate set whose prose names another series
  (60/27/19/20 per cent) and the share sharing a dispute with a set-mate (100/64/56/45). Neither
  record count nor material volume explains it. **The forecast this enabled predicted 16-18 and
  twenty landed — a third measurement-based forecast to miss, this time low**, so what interlock
  buys is a bound and a direction, not a number. Form: negative definition 1 of 20 by shape (down
  from 13 per cent), negating clause anywhere 13 of 20 against 12 of 16 — flat, not climbing.
  **True-alone found nothing for the first time**, after 2, 2 and 4.

  **Tranche 3 landed 16. Running total 55 of 269; 182 remain; 32 render without the line
  permanently.** Rate by tranche: 10, 11, 16. **Form is now counted per tranche** to stop the
  negative definition becoming a template — tranche 3 was 2 of 16 by shape (trajectory 4,
  convention-dependence 3, published-once 2, and five singletons), with 10 of 16 carrying a negating
  clause somewhere, all of them unit or basis clarifications the true-alone standard forces.

  **Tranche 2 landed 11 and settled the thin-material floor.** There is no character floor: the
  test is whether a sentence would survive the chart being deleted, applied per record and recorded
  per record. **`port-cargo` is the first recorded failure** — 39 series now carry a finding, 198
  remain to author, and 32 render without the line permanently (31 single-observation + `port-cargo`).
  **Two of my own measurements were wrong and are corrected in the module header:** no series holds
  zero material (the metric omitted `unmeasured[]` and `source.name`; the true minimum is 41), and
  the rate did NOT fall — tranche 2 landed 11 from a material median of 791 against tranche 1's
  2,377, with 7 written from below tranche 1's minimum.
- **DESIGN-REVISION.md is now fully applied.** Items 1–4 all shipped; §7's eleven rejections stand.



### CLOSED 2026-08-11 — the domain period prose, fourteen of fourteen
*(Heading corrected 2026-08-12: it still said "7 of 14 areas remain" over a body stating the
opposite. The body was right.)*

**This is the only part of the design work that cannot be generated.** Each area takes a set of
periods, each with a heading, two or three sentences written from that area's records, and a `from`
list naming the ledger ids the period draws on. Authored in `lib/domain-copy.ts`.

**CLOSED 2026-08-11 at fourteen of fourteen.** All areas carry periods:
`macro`, `education`, `environment`, `infrastructure`, `employment`, `welfare`,
`human-development`, `banking`, `poverty`, `federalism`, `foreign`, `governance`, `defence`,
`kashmir`. The other seven render the same page without the periods block — not a stub
and not a placeholder; the section simply is not there, which is honest where a heading over
generated filler would not be. `lib/domain-copy.ts` restates this count on every change.

**Evidence carried inline, because the section it came from is archived:** period count follows the
area and is never a template. `macro` takes four, `environment` and `employment` three,
`education` four opening at 2010 because the RTE Act's own numbers are the first period's subject.
**Governance has 110 records and poverty has 3** — poverty would take one period, not four.
Roughly two areas per batch. **Governance and Kashmir go last**, per the operator.

**Two disciplines that apply to every remaining area:**
- **Run `npx tsx tools/period-verdict-probe.mjs` by hand before committing.** Report-only, outside
  the build at one-in-nine. It has found four real defects in three runs, three of them shapes it
  was not built for: an id cited but never drawn on, an enum value used as ordinary English
  (`reversed` as a verb), and a hyphenated value spelled out in prose. **It detects an unused id
  only when that id's verdict token happens to be absent from the whole paragraph, which is luck
  rather than detection** — so hand-check the `from` list against the body as well.
- **The evidence note renders only where the grade is the subject and only for a stated reason.**
  `infrastructure`, `employment` and `welfare` carry one; `macro`, `education`, `environment` and
  `human-development` do not, and `human-development` was tested against the rule and failed it.
  The reason must be specific to how that area is published, never a restatement of the count.

---

## RAISED AND THEN RESOLVED, 2026-08-11 — L-0114's `assessmentNote`

**RESOLVED in the same batch that raised it.** The clause now reads *"and the Union ministry
publishes the term favourable to it while refusing the term unfavourable to it"*, with the withdrawn
wording quoted in the same field. `quotation-identity` verified the quotation against git history —
32 attributed quotations, all matching a value the same field held — and `withdrawn-wording` reports
0 withdrawn claims still asserted elsewhere. **The verdict is unchanged at `contested` and no figure
moved.** The statement below is left standing as raised, because the sequence is the point.

---
## RAISED 2026-08-11, BEFORE BEING RESOLVED — L-0114's `assessmentNote`

**The defect is stated here before the edit is made, per the narrow source-edit amendment**, so that
the statement of it cannot be reshaped to fit the answer.

`L-0114.assessmentNote` reads, in part: *"the state holds the measurements for both sides of its own
trade-off, publishes the term favourable to it and refuses the term unfavourable to it."*

**The refusal is the UNION ministry's, not "the state's", and this record's own `whatHappened`
reports the counter-example**: the Jammu and Kashmir Chief Minister gave the Legislative Assembly
bounded injury aggregates — 6,221 injured by pellets among five quantities — twenty-six days before
MHA refused them, and the state's Director of Health Services filed a district-wise injury list on
affidavit four months later.

**It is the same over-generalisation the `caveat` already corrected in the `summary` on 2026-08-05**,
and it survived in this field because that pass searched the summary. **The per-field prose shadow,
in a record whose caveat documents two earlier passes of the identical defect** — the second of which
was itself a miss, because its search string required the word *ever* that one sentence omitted.

Wording correction only. No figure changes and the verdict stays `contested`.

---

## DECISIONS RECORDED 2026-08-11, SO THEY STOP BEING RE-PROPOSED

### `unrecognised-rows` stays report-only — decided, not deferred

Residue is 0. **Gating it changes nothing today and would fail the build the first time a
component's pooling shifts** — which is a design question about that component rather than a defect,
since the declaration would still reach the page from a different container. A red build is the
wrong instrument for a question whose answer may be *the new arrangement is correct, register it*.
**A report-only check sitting at zero has already won.** The reasoning is in the gate's own header
with the withdrawn wording quoted; it should no longer be reported as an availability.

### §4's caveat preview — RULED 2026-08-11, and NEITHER named option was taken

§4 offered two: the caveat's first clause with a *continues on the record page* label, or the mark
alone. **The operator ruled for the mark. It was not taken, and the reason is a measurement.**

**REJECTED — the first clause with a continuation label.** A truncation with a label on it. Rule 3a
settled this form once already, on the grid cards, and the answer was to change the layout.

**REJECTED — the mark alone.** The ruling's stated ground was that *the mark is already the corpus's
own convention for exactly this, readers meet it on every listing surface.* **Measured, it is not:
every listing surface renders the caveat IN FULL** — 232 of 232 on `/search/`, 103 of 103 on
`/ledger/`, 129 of 129 on `/series/`, 2 of 2 on a domain page. The mark would have made search the
only listing surface that does not, and rule 3a names index tables in terms.

**TAKEN — the caveat in full, and the card takes the whole row.** Not a third option: it is the
ruling this phase already made on the grid cards — *a caveat-bearing card takes the full grid row* —
which is rule 3a's own instruction that the layout is what changes. 232 of 619 cards take the full
row. The design problem §4 reopened was already solved.

### The pair-pooling parking — STILL HOLDS, with its reason narrowed

The parking of `unrecognised-rows` as report-only **stands**, and the two defects the last batch
produced do not touch it: they were caveat duplication on a record's OWN page, which
`unrecognised-rows` does not bind and never did.

**But its stated reason was too broad and is narrowed here.** It said a pooling shift is *a design
question rather than a defect*. **Pooling has now produced two defects**, so the distinction is:

- **Which container renders a declaration** — a design question. Registering the new arrangement is
  often the right answer, and a red build is the wrong instrument for it. The parking is for this.
- **Whether a declaration is dropped or duplicated** — a defect, every time, and no gate binds it.

**What changes: `tools/own-caveat-once.mjs`**, report-only and outside the build. It asks whether a
record's own caveat renders exactly once on its own page — a question `listing-marks`,
`field-render-audit` and `no-unguarded-prose-field` all miss for stated reasons. It found the two
defects at `ac20d3d` and now reports 232 of 232 clean.

### The next external adversarial round WAITS, and the condition is a change of object

**Not elapsed time.** The last two rounds read a corpus with nine `worked` records, no `objectives[]`,
no independence test, no `contestedGround`, no exposure axes, and a site that was an inventory. Since
then most of what such a round would find has been found internally — **five enum collisions, seven
premise failures, the guard-scope audits, the three-shape mark class, the per-field prose shadow** —
and **a review that returns the queue has spent its budget on work already done.**

**THE CONDITION: the object has changed enough that a reader of the deployed site would form a
materially different account of it than the last round did.** Candidate triggers, none sufficient
alone — a new layer or axis in `/data`; a scored-verdict methodology change; a surface that makes a
claim the corpus has not made before.

**AND WHEN IT RUNS IT READS THE DEPLOYED SITE, NOT A GENERATED EXTRACT.** The first round's headline
finding was an artefact of what the extract had removed. An extract is a projection, and this
instrument has a name for what projections do to marks.

---

## RAISED 2026-08-12 BY A READER'S REVIEW, AND NOT RESOLVED HERE

**Three carry forward, and each is blocked on something other than effort.**

**1. The internal register in `/data` prose.** Dated rescore stamps (40), repository archaeology (65),
tier letters asserted in prose (38), schema or field names in prose (21), across `caveat`,
`assessmentNote`, `notes`, `whatHappened` and `summary`. **Research-owned**: the narrow source-edit
amendment lets a run apply only a correction it raised itself, and this arrived from outside. **A
render-time move was tested and rejected** — 16 stamps lead their field, 12 sit mid-sentence inside
the argument, so a leading-stamp rule would mangle a third of them.

**2. The vocabulary — CLOSED 2026-08-12 as prose only, on the operator's ruling.** Nothing renamed;
routes, hrefs and identifiers untouched. *area* → *topic*, *subjects* → *topics*, *all domains* →
*all topics* in reader-facing text; the lens explanation rewritten in ordinary words; Kashmir's two
true numbers now say which question each answers. **Superseded description follows.**

**2. (superseded) The vocabulary.** Seven words for three concepts, breaking visibly on `/domains/kashmir/` where
*0 series* and *Indicators 30* sit two lines apart and both are correct against different queries.
Costed in the forty-sixth log entry: 3,384 internal hrefs and one gate assert the `/domains/` route.
**Report-only by instruction.**

**3. Seventeen ordering-defect candidates — READ 2026-08-12, and 2 held.** `agri-credit` and
`aser-out-of-school-15-16` rewritten; the other fifteen already carried their epistemic point.
**Superseded description follows.**

**3. (superseded) Seventeen ordering-defect candidates** — trajectory-only findings on records that carry a caveat,
where the stronger sentence may be below the weaker one. **Not banked as defects**: the classifier that
produced them failed its own control against two of the reviewer's three named cases.

**And one thing this review settled about method:** a measured 93 per cent of findings being about the
world, and a reader's impression that the site is an audit of statistical behaviour, are **different
objects**. The second is not reachable by measuring the first.

---

## STANDING HAZARDS

**Phase 13's completeness is an open question**, per the CLAUDE.md phase table: delimitation was
partly covered in phase 12 and neither phase closed on the overlap explicitly. Nothing in phase 18
touches it, and it is restated here so a cold read does not treat 13 as closed.

**`drops/phase-17-design-lock/` is named wrong on purpose** and is left wrong, for the reason in the
header above.

---

## PINS

| pin | value |
|---|---|
| gate chain | **27 steps**, `npm run build`; `npm run commit` is the only sanctioned commit path |
| `unrecognised-rows` | **0**, report-only. Zero makes flipping it to a gate *available*, not decided |
| `listing-marks` | **5,390 listing rows · 7,674 marks** across 745 pages — re-measured 2026-08-12 from the gate's own output after the question routes (from 5,277 · 7,524 / 738) |
| `link-check` | 42,902 internal hrefs across 746 built pages, 22 route prefixes, 0 dead |
| authored series findings | **237 of 269**; 32 render without one, permanently and for a stated reason |
| raw enum tokens on a public surface | `directionOfBias` 6 pages, all the one deliberate site; `pairs.kind` 0 |
| `field-render-audit` | 0 invisible, **15** exempted by name (was 17; `higherIsBetter`'s exemption was discharged 2026-08-12 and it is now declared) |
| `higherIsBetter` | **renders from 2026-08-12**, as words, via `DirectionMark`. 70 declare a direction · 76 declare none · 123 are silent, and the third renders nothing |
| caveat strings are NOT identifiers | **4 groups of series share a caveat verbatim, covering 15 series** — nine ASER siblings are one group. Any check that identifies a record by its caveat text is unsound for those 15; use the id |
| deploy | `vercel.json` calls `npm run build`; `tools/deploy-chain.mjs` fails if the chain is ever restated instead of called |
| verify after push | `node tools/deploy-check.mjs` — needs the network, deliberately not in the build |

---

## ARCHIVE INDEX

`state/phase-18.md` — closed material, moved 2026-08-11, verbatim.

| section | what it holds |
|---|---|
| THE QUEUE, WHOLE, at `ae0dcaa` | the five-feature queue as it stood mid-phase. **Stale when archived** — it described F2 to F5 as unstarted after all five had shipped, which is the reason the split happened |
| Why the batch stopped here | the stop reasoning for the batch that measured F3 and did not build it |
| The standing design item, unchanged | the domain-page item as first stated, at 13 owed. Superseded by the live item above |
| Found and fixed inside this batch, not inherited | in-batch finds from the same batch |
| The two debts the pairs extension exposed | `pairs.ledgerRefs` and `pairs.status`. **Both since closed** — the reverse index shipped as `pairsNaming()`, and `status: "live"` was deleted from 12 records |
| COLD-START BRIEF — environment's caveat rate | answered 2026-08-11; kept for the reasoning, which is that a 0% rate was correct |
| THE NAV REGRESSION, STATED AGAINST MYSELF | closed |
| WHAT LANDED IN PHASE 18 SO FAR | the phase's landing log to that point |
