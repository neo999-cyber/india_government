# Design revision 2 — the public layer

**Status:** written 12 August 2026, from a third external review (a reader's read of the deployed
site) and a fourth document (twelve visual concepts). Supersedes nothing in `DESIGN-REVISION.md`;
that file is fully applied and its §7 rejections stand.

**The diagnosis, in the fourth document's words:** *visitors encounter the archive's machinery —
series, records, disputes, lenses, tiers — before they get a simple visual account of what happened.*

**The reader review's finding, which is the same thing measured from the other end:** it read the
intended claim correctly and then said *"by the bottom of the landing page, I expected an audit of
the state's statistical behaviour at least as much as a record of India's substantive change,"* and
*"the words I would naturally use are audit, evidence and measurement, not commitments."*

A measured 93% of findings are substantively about India. A reader still landed there. **Those are
different objects and the second is not reachable by measuring the first.** This file is the response.

---

## Build order

Ordered so that each item defines the grammar the next one inherits. Item 4 first is not a
preference — build it later and it gets built four times.

| # | Item | Why here |
|---|---|---|
| 1 | **Two tracks** (§4) | Smallest, fixes the reader review's central finding, and defines the outcome/evidence grammar every later item draws on. |
| 2 | **Question navigation** (§6) | Filters over existing data, no new content. The translation layer the audience needs. |
| 3 | **Record spine + next steps** (§3, §9) | One surface. Navigation off a page a reader hasn't finished understanding is worse than none. |
| 4 | **Topic strips** (§1, §2, §10) | All three are the topic page. §10 is a special case of §1. |
| 5 | **Matrix + year strip** (§5, §7) | The matrix goes through the measurement the status grid failed. |
| 6 | **Two-truths cards** (§11) | Needs the two tracks to exist first. |
| 7 | **Stories** (§8) | Highest value, slowest by an order of magnitude. Its own sequence. |

---

## 1. Two tracks — outcome and evidence, visually separate

**The problem, stated by the fourth document:** *a visitor can currently mistake a heavily caveated
result for a poor government outcome. These are different things.*

The worked example is exact:

> **Outcome:** higher-education enrolment rose from 21.2% to 30%.
> **Evidence:** the population denominator was restated, and a shrinking 18–23 population
> contributed to the rise.

Currently those stack as though the second undermines the first's truth. **They are two tracks.**

- **Outcome track** — what the measured result did.
- **Evidence track** — verified · approximate · discontinued · changed basis · contested.

This is the grammar the rest of this file assumes. Every later surface draws on one track or the
other and says which.

**It also answers the positioning drift directly:** keeping them separate reinforces *here is what
can be known about change* rather than *here is why the statistic is defective.*

---

## 2. Question navigation

A visible route offering the questions a visitor actually arrives with:

- What clearly improved?
- What clearly worsened?
- Which commitments were met, and which missed? *(see the naming constraint below)*
- What is still too early?
- Where did official publication stop?
- Where do official sources disagree?
- What can India measure well?
- What cannot be known?

**Every one is a filter over data already held.** These produce filtered collections of records and
series — **not new editorial scores.**

**The distinction this surfaces is the point.** These five blur for a non-specialist and mean
radically different things:

`no result` · `no objective to score` · `no measurement` · `too early` · `conflicting measurements`

That is the corpus's own taxonomy surfaced as a question rather than as an enum value, which is the
translation the audience needs.

---

## 3. The record spine

Records are research dossiers before they are accounts. The structure is mostly built — *what was
announced → what happened → why this reading → what this cannot tell you* — and what is missing is
the **chronological** rendering, before the sources, disputes and correction history.

**L-0111 is the case that proves it.** 2018 incidents as first published: 614. Restated: 417. Later
decomposed: 228 terrorist-initiated + 189 operations. **No explanatory note at either transition.**
One diagram communicates that faster than several pages of prose.

**Paired with next steps (§9).** The reader review found this precisely: it wanted to go from the
security-force series sentence about a press-compiled register *to that register*, and had to hunt
down the page through ledger relationships. Contextual next steps beat a return to a directory:

> Compare with the press-derived register · See all Kashmir security indicators ·
> Read why the two instruments disagree · Return to Kashmir's 2014–2026 account

---

## 4. Topic strips

**Small multiples, not one lead series.** The current pages select the longest unbroken run —
*methodologically defensible but not necessarily the question a visitor came to answer.* Four or five
directly labelled charts per topic.

**The renewables case is the argument:** renewables' capacity share 12.33% → 41.91% *and* coal
production roughly two-thirds higher, side by side. That shows the two-truths finding immediately.
One lead series shows neither.

Three layers on one strip: measured outcomes · commitments along the same timeline · evidence limits
where an indicator changed definition or stopped.

**One-screen summary per topic** (§2 of the source document), capable of being understood as a single
image, closing on *what the evidence cannot establish* — which is already how topic pages end.

**Kashmir's 0 and 30** (§10) is a special case and building §1 properly nearly solves it. Both
numbers are correct against different queries two lines apart — `series.domain` is 0,
`series.lenses` is 30. The decomposition is the fix:

```
30 indicators through this lens
  Governance & institutions ── 15
  Defence ──────────────────── 13
  Federalism ─────────────────  2
```

Show *"30 indicators through this lens"* where the page currently shows *"0 series"*; the technical
fact that none is filed with Kashmir as its formal subject goes underneath.

---

## 5. The matrix, and the annual strip

**The matrix is added, not substituted.** Rows: topics. Columns: years. Marks: commitments,
measurement breaks, major observations. Selecting a topic expands its charts; selecting a year shows
what began, ended, changed basis or reached a deadline.

**It goes through the measurement the status grid failed** — that grid encoded whether an observation
was verified, approximate or absent, and was refused because it showed *the corpus's confidence in
its own holdings, a question only the author asks.* This matrix marks events rather than states,
which is a different object and may survive. **Measure before building and report the shape.**

**Year pages gain two things** (§7): *what was not measured this year*, and **all topics on one
common annual strip** — the simultaneity point. A tax reform, a constitutional change in Kashmir, an
employment movement and an education measurement break as parts of the same period.

---

## 6. Two-truths cards

Share cards are text-only OG tags and that ruling stands, on its stated ground: a card is a fixed
frame and a caveat may not be truncated.

**One card form survives the ruling, and it is the reason it survives:** a card whose subject *is*
the tension has nothing to crop away that would leave a misleading claim standing.

> Higher-education enrolment rose from 21.2% to 30%. Roughly half of that is a shrinking
> 18–23 population.

One statement, both halves, uncroppable. That is §1's two tracks compressed into a shareable unit.

**Rejected card types and why:** trend card, promise card, measurement-change card and topic poster
are each a figure that survives cropping — which is the exact failure the text-only rule prevents.
The known/unknown card is borderline and probably works in the same single-statement form.

---

## 7. Stories

*"Can Indian children read?"* was named the best page on the site by **both** external readers,
independently, and there is one of it. Its form: a human question · one measure · the conflicting
measure · why they cannot simply be subtracted · what remains unknown · links to the full records.

Candidate questions from the source document, most answerable from the corpus:

Did demonetisation achieve what was announced? · Did jobs grow after 2014? · Did India become more
federal or more centralised? · Did sanitation improve, and which measure says so? · Is militancy in
Kashmir lower? · Did highways expand faster? · Did farmers' incomes double? · Did renewable energy
replace coal? · Are Indian children learning more?

**This is the highest-value item and the slowest.** Each is a piece of writing. It runs as its own
sequence after the structural work, the way the domain periods and the 237 findings did.

---

## 8. Rejected, with the rule

| Proposal | Rejected because |
|---|---|
| **"Target met" / "target missed" as public labels** | Nine records were `worked`; one survived the independence ruling. A public label reading *target met* rebuilds the scorecard vocabulary that pass removed, and it is the first thing that gets screenshotted. The rest of that item stands — *increased · decreased · changed basis · no comparable measurement* are factual descriptions of individual evidence. |
| **Replacing the year slider with the matrix** | The slider is the only interaction shared across landing, overview and year pages — it is the site's spine. The matrix is added beside it. |
| **Trend, promise, measurement-change and poster cards** | Each is a figure that survives cropping. Unfurled cards render at a fixed size and get screenshotted and re-shared; a caveat panel beside a figure is cropped away and the figure travels alone. That is the failure the text-only ruling prevents. |
| **The word "sector"** | A fourth word for a thing that already has three, and renaming was ruled against — routes, hrefs and identifiers stay. The public concepts are **topics · lens · indicators**. |
| **The framing "how did the government do, topic by topic"** | One sentence from the promise-tracker genre. The source document accepts that no aggregate verdict is available and then drifts in its phrasing. *How did the government do* is not the same question as *what can be shown*. |

---

## 9. Constraints carried, unchanged

From `DESIGN-REVISION.md` §8 and the corpus's standing rules. Restated because this file adds
surfaces and every one of them is a place these can be lost.

1. No composite scores. Anywhere.
2. Absences render unlike findings **and** must reach a reader. Both; they fail independently.
3. Corrections keep their withdrawn wording, visible.
4. Rendering never asserts a distinction the corpus does not hold.
5. A caveat is never truncated. Fix the layout, not the caveat.
6. Every claim carries its provenance; sources visible, not in footnotes.
7. If area, distance, colour or opacity has no defensible meaning, do not encode it.
8. An absence claim states which kind it is.
9. Selection is not ranking — print the criterion, computed from the data, no merit claim in the
   wording.
10. Mobile is the acceptance constraint: nothing is approved until it works at ~375 px without hover.

---

## 10. Checks that apply to every item here

- Each new surface checked against `unrecognised-rows` **before it commits**. Nine container shapes
  have now walked past `listing-marks`; a card, a strip, a matrix cell and a tab are all shapes.
- Any figure or name in this brief is unverified until measured. **Eleven premise corrections in ten
  batches**, and the pattern is stated: *a measurement that flatters gets questioned; one that alarms
  gets believed.* Five of six corrected metrics were wrong in the alarming direction.
- Enum values are ordinary English words and page prose is where they collide. The rule as settled:
  an assessment word is never asserted in the corpus's voice; a quotation attributes it to its
  speaker, which is a different act.
- Any authored sentence gets the three checks the 237 findings got — figures traced to their own
  record, enum words read in context, and the sentence read against its own caveat for the
  true-alone standard. That third check caught 18 things nothing else did.
- A finding can be true alone and still mislead alone. Three live pages have been revised by records
  written after them. Where a new surface completes something already shipped, check the shipped one.
