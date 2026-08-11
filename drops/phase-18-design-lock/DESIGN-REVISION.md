# Design revision — the surfaces the rebuild did not reach

**Status:** written 11 August 2026, after two external UX reviews (a ChatGPT landing-page mock and
a written UX critique) and the fourteen-of-fourteen domain prose close. Not yet in the repo.

**Prerequisite:** the year-page batch is running. Nothing here starts until it closes.

**What this is not.** Not a palette change and not a rebuild of what already works. Bone & indigo,
the type scale, the four-destination masthead, the domain-page chapter form, the overview board and
the five features are settled and are not reopened by this document.

---

## 1. The diagnosis, corrected

The critique's central claim — *everything has similar visual weight* — is **true of the surfaces the
redesign never reached and false of the ones it did.** Domain pages, the overview, the record page
and the five feature surfaces were rebuilt with a real type scale, a lead, and progressive
disclosure. Series pages, search, and topic-page internals were not.

Applying the critique globally would undo the rebuild. Applying it to the untouched surfaces is
correct and overdue.

**The single sentence that governs this whole document:** *show the finding first, then reveal the
methodology and caveats in layers.* That is what the domain page rebuild did, and it has not
propagated.

---

## 2. Build order

Not the order either review proposed. Ordered by how badly the surface currently fails a reader who
arrives cold.

| # | Surface | Why here |
|---|---|---|
| 1 | **Series page template** | Worst surface on the site, and the one a reader lands on from a share or a search. Currently opens with IDs, tiers, sources and a blocking caveat before any chart. |
| 2 | **Search results** | ID-first rows with full caveats in a table. Cramped on mobile. The caveat-in-cell problem in a surface nobody re-examined. |
| 3 | **Topic-page local tabs** | Gives a stable mental model. Replaces three disclosures at the bottom of a long page. |
| 4 | **Nav labels + landing additions** | Cheap, can ride with anything above. |

---

## 3. Series page — the rebuild

Currently: record ID, tier, sources, a large blocking caveat, then eventually a chart. Backwards
for every reader who is not the author.

**New order:**

1. Title and topic
2. **One-sentence finding** — authored, not generated
3. **Large chart**, with its seams and stops rendered as the strip renders them
4. Latest value · total change · date range · coverage
5. **What this tells us**
6. **What to be careful about** — the caveat, in full
7. Source and verification status, including independence
8. Collapsible full data table
9. Related indicators and records — the reverse index already ships

**Record ID and tier stay.** They move to secondary metadata; they do not disappear. A citable
instrument needs its identifiers visible.

**The caveat is not shortened and not collapsed.** Rule 3a is not relaxed to make a layout work —
that ruling was made once already, on the grid cards, and the answer was to change the layout. A
collapsed caveat with an expander is a truncation with a control on it. What changes is *position*:
it sits after the finding rather than before the chart, which is a reading-order fix, not a
truncation.

---

## 4. Search — cards, not a table

Rows become responsive result cards:

- **Title first, ID second**
- Topic and record-type chips
- Short matched excerpt
- **One-line caveat preview** — with the full caveat on the record's own page, where rule 3a governs
- Sort by relevance · newest · topic · record type
- Mobile filter drawer
- Collapsible technical detail

**The caveat preview needs a ruling before it is built.** A preview is a truncation unless the card
makes plain that it is a pointer rather than the caveat itself. Two options: render the caveat's
first clause with an explicit *"caveat continues on the record page"*, or render only the fact that
a caveat exists and let the mark do the work — which is what `listing-marks` already binds. **The
second is safer and probably right.**

Do not label the search "619 records". 619 is ledger + provenance + series, so the 269 series are
counted inside it, and the homepage rebuild removed database counts from the opening on the scope's
own rule.

---

## 5. Topic pages — local tabs

`Overview · Indicators · Government records · Disputes · Missing data`

Replaces the current three disclosures. Same content, addressable, and it gives every topic page the
same shape so a reader learns it once.

Each tab is a URL. A reader must be able to link someone to a topic's disputes.

---

## 6. Navigation and landing

**Labels.** *Overview* and *Explore* do not distinguish themselves. Rename:

| current | new |
|---|---|
| Overview | **What changed** |
| Explore | **Topics** |
| Stories | Stories |
| Search | Search |

The five footer groups stay where they are. The masthead stays at four.

**Two additions to the landing page, both from the external mock and both worth taking:**

**a. Three ways the record speaks.** A taxonomy of finding types, shown as three cards before any
navigation:

- **Clear trend** — something India measures well, stated plainly
- **Both are true** — *renewables grew, so did coal*
- **The record ends** — a series that stops, with the reason printed

This teaches a reader what kind of thing they are about to meet. **"Both are true" is a shape the
site does not currently have a home for** and it is the corpus's most characteristic move.

**b. The year control, simplified, on the landing page.** It is the strongest interface on the site
and only one page has it. A reduced version — scrub, no play, four or five cards — makes the landing
page a thing that moves.

**Copy worth taking verbatim from the external mocks.** Two mocks were produced externally; the
palettes of both are rejected in §7, and the writing in both is better than anything written
internally so far.

From the first (ChatGPT landing mock):

- *"India changed. What can the record prove?"*
- *"The evidence is public. So are its limits."*
- *"…without a single score telling you what to think."* — states the no-composite-score rule as a
  reader benefit rather than as method
- *"Start with a question, not our filing system."*

From the second (the "IOR" magazine-style mock):

- **"The numbers tell a story. The footnotes tell another."** — the thesis in eight words. Better
  than anything either review or this project has written. Carries no accusation and survives being
  screenshotted.
- **"Two truths"** as the card name for the both-are-true category. Names a category rather than
  describing one.
- **"The data system can still calculate it. The publication ended."** — the not-collected /
  not-published distinction in two sentences a normal reader understands immediately. This is §5a's
  vocabulary as plain English and it should propagate beyond the card.
- *"A transition and an expansion can occupy the same decade."*
- *"Not a ranking. Three different ways evidence can behave."* — states the selection-is-not-ranking
  rule at the point of selection, which is where rule 9 requires it.

**Not taken:** *"Read the evidence. Keep the doubt."* It invites doubt, which is advocacy's move.
The position is *here is what can be established*, not *distrust this*.

**Also worth taking from the second mock:** the three-card taxonomy with a numbered section spine
(`01`, `02`) as a structural device. It survives the palette being removed.

---

## 7. What was rejected, with the rule

Recorded so a later pass does not re-propose them.

| Proposal | Rejected because |
|---|---|
| **Amber for warnings, red for breaks, teal for verified** | A severity scale. The corpus rules against it — the absence marker is dashed `--ink-dim` and deliberately not `--alert`, because a caveat is a blocking qualification and an absence is a **finding**, and colouring them alike asserts a severity the corpus does not hold. A basis change is not a warning. One accent, one job. |
| **Five accent colours** (amber, blue, orange, red, teal) | Same. Bone & indigo is one accent meaning *a mark was made*. Five hues encode meaning by accident. |
| **Counts as a hero element** (269 / 619 / 14) | The scope's own rule: do not lead with the size of the database. The homepage rebuild removed six such counts. 619 also double-counts the 269 series inside it. |
| **`twitter:card = summary_large_image` with an `og:image`** | Reverses the share-card ruling, decided on a rule: a card is a fixed frame, a caveat may not be truncated, so a figure in an image is truncation wearing a badge. Text-only, `summary`, no image. |
| **Shorten the caveat and let readers expand** | Rule 3a. The form is wrong on a compact surface, not the caveat. Fix the layout, as the grid cards were fixed. |
| **Geist** | Reads SaaS. Spectral over IBM Plex was chosen to read institutional, which is the register the subject requires. |
| **"last comparable publication"** as wording | Conflates two claims the absence vocabulary keeps apart: *the published series ends there* is a fact about a publisher; *no comparable series was identified after it* is a fact about a search. |
| **Colour-coded finding cards** (mint = clear trend, yellow = two truths, pink = missing measure) | Colour carrying a category the corpus does not hold. A reader learns pink means *gap* within two cards and then meets the same pink on a disputes count, where it means something else. Rule 4 — rendering never asserts a distinction the corpus does not hold — and the precedent is the absence marker deliberately not using `--alert`. |
| **Count bubbles sized by value** (269 series · 619 records · 127 disputes) | Area encoding quantities that are not comparable, and **619 contains the 269** — the same series drawn twice as separate objects. Rule 7, and the same double-count already rejected in the first mock. |
| **Full-bleed vermilion section** | Register. A site assessing a sitting government, in a country where saffron and green are politically loaded, going to a full-page hot field reads as a campaign. Credibility is the whole product and this is the strongest form of the register problem. |
| **"Read the evidence. Keep the doubt."** | Invites doubt rather than establishing what can be shown. That is advocacy's move, and the positioning is the opposite. |

**The test that settles palette questions.** Every colour in bone & indigo traces to a stated reason
— deep indigo because a fill must never be black on warm paper, brass because *a mark was made*, bone
because the register is a record. Ask what mint means in the second mock and the answer is that it
looked good beside yellow. That is exactly what rule 7 forbids, and it is the difference between the
more attractive object and the one that survives a reader asking why.

---

## 8. Standing constraints, unchanged

1. No composite scores. Anywhere.
2. Absences render unlike findings **and** must reach a reader. Both; they fail independently.
3. Corrections keep their withdrawn wording, visible.
4. Rendering never asserts a distinction the corpus does not hold.
5. A caveat is never truncated.
6. Every claim carries its provenance; sources visible, not in footnotes.
7. If area, distance, colour or opacity has no defensible meaning, do not encode it.
8. An absence claim states which kind it is.
9. Selection is not ranking — print the criterion, computed from the data, no merit claim in the
   wording.
10. Mobile is the acceptance constraint: nothing is approved until it works at ~375 px without hover.

---

## 9. Checks that apply to every item here

- Each new surface checked against `unrecognised-rows` **before it commits**. Every feature that
  raised it was bound in the same commit; that is the pattern.
- `listing-marks` binds by container shape, and three guards have now been walked past by a shape
  built after them. A new card or tab layout is a new shape.
- Enum values are ordinary English words and page prose is where they collide — five instances, four
  attributing a verdict the record does not hold, all five found by hand and none by the probe. Any
  authored copy in this document's scope gets the same hand read.
- Any figure named in a brief is unverified until measured. Seven premise failures in six batches,
  all from re-using a number or a name rather than re-reading it.
