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
**Items 1 to 6 have shipped. Item 7's measured list is exhausted at seven stories**, and share cards
are closed for the landing page, the seven stories and all 122 qualifying series. See below.

---

## OPEN ITEMS

### DESIGN-REVISION-2 — items 1 to 6 SHIPPED, item 7 EXHAUSTED AT SEVEN STORIES

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

**ITEM 3, THE RECORD SPINE WITH NEXT STEPS — DONE 2026-08-12.** `RecordChronology` on **76 of 223**
records — those whose cited series declare a change of basis; 92 hold only a start and an end date
and a two-dot line is not a chronology. **The axis is the DATA YEAR, never interleaved with
publication dates.** `NextSteps` on 492 pages, every step's reason a relation in `/data`.

**RAISED BY ITEM 3, NOT RESOLVED — a real weakness in `unrecognised-rows`.** The gate decides
containment with `span.includes(anchorHTML)`, **a string test rather than a positional one**, so a
page rendering one record link twice — once inside a listing row, once outside — silently exempts
the outside copy. Found because next-step anchors are byte-identical to pair-side anchors: the
pooled-pair count fell 36 -> 0 and attributions 724 -> 708, 52 links, gate still green. Worked
around by naming the anchor `nstep-to`, which restored both counts exactly. **The weakness is
pre-existing and untouched.** A fix is a gate contract change and needs its own decision.

**RAISED BY ITEM 3, MEASURED AND DEFERRED — series ids in prose are not links.** 15 caveats and 8
break notes name another series by id; a `P-xx` in the same sentence has been clickable for months
and these 23 are not. **Attempted and reverted:** `components/marks.tsx` is imported by a client
component, so importing the id set from `lib/data` pulls `node:fs` into the browser bundle and the
build fails at `OverviewBoard`. Needs a generated id module; 23 mentions did not justify one inside
item 3.

**NOT DERIVABLE, AND STATED SO RATHER THAN FAKED.** The reader review's own case — going from
`jk-security-forces-killed` to the press-derived register — has no relation behind it:
the two are not a declared pair, they share no dispute (P-86 against P-75), and the only link is
that L-0110 cites both alongside eight other defence series. Nothing in `/data` picks the register
out of the ten.

**ITEM 4, TOPIC STRIPS — DONE 2026-08-12.** **§1's premise was wrong**: the page already rendered
five series, and the renewables-against-coal case it offers as the argument was already satisfied on
`/domains/environment/`. What was missing is §1's next sentence — *three layers on one strip*. The
four cards now carry the commitment layer (ticks drawn, years printed in words) and the evidence
layer (28 seam ticks across 10 topics, 31 reasons printed in full; the gap of 3 is breaks at periods
the series does not observe). **§10's figures held exactly** — 30 through the lens, Governance 15,
Defence 13, Federalism 2 — and the decomposition is computed for any lensed topic, not typed in for
Kashmir. **§2 had regressed**: the tab split three batches ago stopped the overview closing on what
the evidence cannot establish; restored on 14 of 14, as a statement and a route rather than a second
listing.

**ITEM 5, THE MATRIX AND THE ANNUAL STRIP — DONE 2026-08-13, AND THE MATRIX IS REFUSED.**
Measured before building, as §5 and the instruction required. **A topic's event count correlates
with its record count at r = 0.967**, so a row's length is a picture of research coverage, not of
what happened — the status grid's defect in another shape. The third proposed mark, *major
observations*, has no field behind it. **What survived is one column read as a list:** §7's common
annual strip, all topics at one year, alphabetical, no magnitude encoding of any kind (13 rows at
one width, measured). Plus *what was not measured this year*, splitting a HOLE from a run that had
STOPPED and refusing to count instruments that had not BEGUN.

**Why the matrix is not merely unbuilt:** within a row the years do carry a finding — 9 of 12
profilable topics peak in a different year from the corpus peak of 2020, and those peaks are
recognisable history. **The grid fails across rows, not along them.** A later cycle proposing it
again should read this rather than rediscover it.

**RAISED BY ITEM 5, AND CLOSED 2026-08-13 AFTER IT KILLED A SECOND DEPLOY.** `6d7ec5c` deployed to
state ERROR: `next/font/google` fetches `fonts.gstatic.com` at build time and a 404 there fails the
build. This entry then said *"the durable fix is self-hosting both families via `next/font/local`;
that is a build-config change with visual consequences and is not taken here."*

**It was not taken, and `de1c3ff` died the same way** — all 29 gates green, then `next build` failing
on `module-not-found` for the IBM Plex Sans CSS module. **A recorded hazard that is not fixed is a
hazard with a second turn**, and the deferral above is what gave it one.

**DONE NOW.** Six latin woff2 files in `app/fonts/`, loaded through `next/font/local`, from the same
gstatic URLs the helper resolved; `plex-sans-var.woff2` checked byte-for-byte in size against the
file the last successful build produced. IBM Plex Sans is variable, so one file covers 400–600. **A
cold build emits 6 woff2 against 31**, because the helper fetched every subset and weight variant and
six were ever used. **The deployed site still makes no font request** — it never did; the BUILD did.

**The fast check on a deploy is unchanged and still one request:** `/data/v1/manifest.json`'s
`commit` against `git rev-parse HEAD`.

**ITEM 6, TWO-TRUTHS CARDS — DONE 2026-08-13.** **The brief's own worked example fails its own
test**: a text card is truncated linearly, so *"Higher-education enrolment rose from 21.2% to 30%."*
is the half the platform keeps. The missing constraint is ORDER, and `lib/share-card.ts` already
held it for absences. **THE TRUNCATION TEST — a card is admissible only if no prefix of it states a
claim that standing alone would mislead** — is written where cards are composed.

All 21 contested framings read one at a time: 18 pass, **PR-18 fails and is excluded** (its prefix
is the claim its own rest overturns), PR-52 excluded as marginal, PR-60 included as marginal with
the call recorded. **23 distinct series carry a card, 23 of 23 exact.** The no-figure floor lifts
here and only here, because in these sentences the figures arrive already in tension.

**OWED, SIZED, NOT STARTED — 122 two-truths sentences.** 122 series carry both an authored finding
and a caveat and none has a card: the findings lead with the figure and qualify after an em-dash,
which is the failing order, at a median 459 characters. Each needs one short qualification-first
sentence written to the three checks the 237 findings went through. Same shape of work as those
tranches. **The rule it must obey is in `lib/share-card.ts`, where the author will meet it.**

**ITEM 7, STORIES — STARTED 2026-08-13. ONE STORY WRITTEN, THE SEQUENCE IS OPEN.**
*Did jobs grow after 2014?* at `/stories/did-jobs-grow/`, the second story on the site.

**THE NINE CANDIDATES ARE NOT EQUALLY ANSWERABLE and the brief's first is the least.** Measured
against what the form needs — one measure, a conflicting measure, absences, records:

| question | writable in this form? |
|---|---|
| Are Indian children learning more? | **built** |
| **Did jobs grow after 2014?** | **written 2026-08-13** — PR-12, PR-13 |
| Is militancy in Kashmir lower? | yes — 6 contested pairs, 116 absences, richest material |
| Did India become more federal or more centralised? | yes — 5 contested pairs |
| Did renewable energy replace coal? | **a different form** — 9 series, **0 pairs**; the tension is capacity share against generation share, both official |
| Did farmers' incomes double? | no — 0 pairs; it is a commitment-with-a-deadline shape |
| Did highways expand faster? | no — 0 contested pairs |
| Did sanitation improve, and which measure says so? | **no** — PR-11's other side is *what independent survey found*, an absence. The question presupposes two measures and there is one |
| **Did demonetisation achieve what was announced?** | **NO — zero series.** One record, L-0011, nothing measured over time. Relaxed to `currency`/`cash`/`note` and to the Nov 2016 date: still zero |

**THE STORY-WRITING RULE THIS RUN ESTABLISHED, and it is item 6's rule in another carrier:**
**step one of a scroller is met alone by a reader who stops.** The first draft's opening step stated
the naive reading of a falling unemployment rate approvingly, one scroll from its own correction —
the truncation problem in a different shape. **A story's first step carries its own qualification or
the story is a headline with a disclaimer below the fold.**

**ITEM 7 CONTINUED 2026-08-13.** *Who counts the dead in Kashmir?* written, at
`/stories/who-counts-the-dead/`. **Federalism DECLINED** — it duplicates the domain period, which
already carries the 42-of-a-smaller-thing finding on all five federalism surfaces.

**FOUND WHILE DECLINING IT, AND CORRECTED:** that paragraph closed *"and no document sets the two
numbers side by side"* — a negative existential contradicted by **L-0150, which the paragraph itself
cites**, whose `whatHappened` quotes the Sixteenth Finance Commission putting both ends in one
sentence at para 7.67. Rule 5d. Corrected on all five surfaces with the withdrawn wording quoted;
the finding survives, narrower: no retrieved source states a figure for the states' share beside the
pool's, or computes the joint effect.

**FOUND BEFORE WRITING, AND FIXED — a live defect in the jobs story.** `TwoInstruments` hardcoded
both its `aria-label` and its y-window to the reading story. **The jobs page was telling screen
readers it showed Grade 3 reading**, and its lines sat in the bottom eighth of a 0–75 plot. Both are
now props set per story. **No gate can see an `aria-label`** — `field-render-audit` reads page text.

**THE KASHMIR PAIR-TYPE FINDING, which a later story must not re-derive:** every Kashmir contested
pair is **same-unit, different-quantity** — the opposite of jobs. PR-26 and PR-32 are both `deaths`
and explicitly not one quantity; PR-27 is a component against its own composite; PR-35 is `detenus`
against `prisoners`. `gapComputable` is false on all of them. **Same unit is not same quantity and
the two look identical on a page.**

**PREMISE CORRECTED:** the counts bearing against the state are not *hospitals, courts and
commissions*. Measured: **27 of 30 state-published, 3 not** — a press-compiled register (two series)
and a human-rights coalition (one). No hospital series, no court series. All three count deaths, all
three T4.

**ITEM 7 CONTINUED 2026-08-13, second pass.** *How much of India's electricity is renewable?* at
`/stories/how-renewable/` — a **third story form**: one publisher, four true answers for one year
(53.21 / 41.91 / 28.96 / 16.88 per cent), and a word whose official boundary moved. Neither existing
form applied: environment's series layer carries **0 caveats and 0 absences across all 15 series**,
re-tested, and there is no contested pair in the domain.

**AND THE ABSENCE PAGE HOLDS** — `/questions/unanswerable/`, four questions this cannot answer.
It passed the matrix's own test: every reason is a **declared absence in `/data`**, not this corpus
reporting its coverage. **The finding is that only one of the four is a limit** — demonetisation's
two absences name no `wouldFill` at all because the quantities are counterfactual; the other three
name exactly what would close them. **Three are unanswered rather than unanswerable.**

**Deliberately not on `/stories/`** (four questions have no sequence, and that index's criterion is
sequence), **not a ninth among the eight** (that list is the brief's order and says so), and **not a
second door onto `/unmeasured/`** (which lists by record and kind; this lists by public question).

**STORY SCOPING DONE 2026-08-13 — the candidate list, the criterion, and a blocker measured before
any of it. No story written that batch.**

**THE BLOCKER IS CLOSED 2026-08-13 — the route runs both ways.** Inbound links to stories **4 → 33**;
record pages linking a story **0 → 29**. `lib/stories.ts` declares `rests` once, `StorySources`
renders the grid from it and `storiesRestingOn` reads it from the other end — two lists would have
drifted. Provenance pages gained a **Read in a story** block, being the one layer with no next-steps
surface and 11 of the 29 targets. **The criterion is printed on the index**, each card naming its
qualifying pair or dispute, and **the ordering is stated too** — publication order, a fact, not a
ranking. Distinct records linked: 29 before, 29 after.

**NAVIGATION DONE 2026-08-13.** Seventeen footer destinations now open from the masthead through a
**`<details>` with no JavaScript** — native, keyboard-operable, works on a page whose bundle never
ran, and verified as markup rather than payload. Labels are reader-facing and taken from each page's
own h1; **21 distinct routes before and after, 0 dead**. The three leaf types that ended with nothing
— question route, lens, term — now end with a route. **`counterfactual` is filed under *about the
record*, not *limits*:** it is the record of a declined feature, not a limit of the evidence.

**PINNED — the masthead is at FIVE**, not four: *What changed · Topics · Questions · Stories ·
Search*. And **`/contested/` is not the where-measures-disagree route**: 68 contested VERDICTS
against 21 contested PAIRS, seven records in both.

**RULE 9's ORDERING HALF IS NOW SWEPT.** 23 criterion-printing surfaces checked; three stated a
selection and no ordering — `/publishers/` (citation count descending), `/corrections/` (newest
first), `/questions/unanswerable/` (the limit first, then the decisions). All three now print it.
`/years/` flagged and cleared on reading: it already says *no year is ranked against another*.

**STORY FIVE WRITTEN 2026-08-13** — *Is India spending more on education, or less?* at
`/stories/what-counts-as-education-spending/`, on PR-22. **Chosen first on the material**: 22
observations a side against 6 for PR-35 and one state's table for P-114. Filed as a `contested` pair
and **structurally the renewables form** — one publisher, one table, two definitional scopes.

**PR-35 IS A FOURTH FORM, ESTABLISHED AND NOT WRITTEN — read this before starting it.** Different
units (`detenus`/`prisoners`), the SAME quantity, two publishers, and **the discrepancy is explained
to the unit**: in three of six overlapping years the difference is exactly NCRB's foreign-detenu
count. **What the form requires:** separate the three years where the explanation is PROVEN from the
two where it is only CONSISTENT (the domicile decomposition was not retrieved for 2016-17) and the
one where it CANNOT be computed (2019 sets a November figure against a 31 December one) — and draw
no difference anywhere, because where the subtraction can be done **it produces zero, not a gap**.

**P-114 unstarted.** Its control is Bihar's row in the same table: no stoppage, releases continuing.

**STORY SIX WRITTEN 2026-08-13 — the fourth form is built.** *Two counts of Kashmir's detainees, and
the boundary between them* at `/stories/two-counts-one-boundary/`, on PR-35. Three states kept
apart — proven (2014, 2015, 2018), consistent-but-unproven (2016, 2017), not computable (2019) — and
**no difference drawn anywhere**, because where the subtraction can be done it produces zero. The
decomposition is not a series, so no third line was available and none was faked.

**A RULE CLARIFIED BY A GATE REFUSAL, and it binds every story from here.** Three stories were
measured rendering one caveat twice — hoisted above the argument and again on its sources card — and
a `refusal` field was added to defer the card copy. **`listing-marks` failed 5 immediately.** Rule 3a
says a caveat renders wherever the record appears, *in full, every time*; the series-page
anti-duplication logic applies on a record's OWN page, **where neither copy is a listing row**, and a
sources card IS one. **Both copies are required.** Reverted in full; the reasoning is in
`StorySources` so it is not re-derived.

**WITHDRAWN 2026-08-13 — THERE IS NO WELD CLASS.** This entry read: *"A WELD CLASS
`rendered-space` CANNOT SEE — third instance. `<br />` between lines welds in extracted text
(`Parliament: 72015`), as a flex `gap` did on the topic decomposition."* **Both alleged instances
were tested through the sanctioned normaliser and neither welds** — `pageTextFromHtml` replaces
every tag with a space, so `Governance & institutions 15` and `Parliament: 7 2015` are what any gate,
browser, `innerText` or screen reader gets. **What welded was `textContent`, which is what the probes
used and what nothing reads through.** The rule that was broken already exists: *a verification reads
the page through the gate's own normaliser, or it is not a check.* **The probe is the defect, not
the markup.**

**STORY SEVEN WRITTEN 2026-08-13 — a FIFTH form.** *A zero that is not a zero* at
`/stories/a-zero-that-is-not-a-zero/`, on P-114. **The fifth form: one instrument, a cell it cannot
explain, and a sibling row that makes the reading possible.** Not form 3 — P-114's own first sentence
rules it out: *nothing in the construction of the table changed; the change is in the world it
measures.* The control is **drawn, not described**, and the page states in terms that Bihar is not a
counterfactual, because this instrument declined that engine.

**THE MEASURED LIST IS EXHAUSTED, AND THE MATERIAL SAYS SO.** 25 signatures qualify under the printed
criterion; **9 are carried by a story; 16 remain** — of which 2 were already dropped as duplicates of
their own topic prose, 1 is depth 1, and 6 are already inside another story's sources. **Seven have
no mechanical disqualifier, and reading them dissolves five:** PR-27 and P-71 are L-0111's spine,
inside the Kashmir story; P-78 and P-97 are who-produces-the-J&K-figures, which is that story's
subject; P-102 and P-109 are the divisible pool, and federalism was declined because the domain
period carries it.

> **The criterion permits sixteen more. The material is asking for about one** — PR-49, the cess
> whose definitional choice inverts the sign of a decade, and even its adjacent material is well
> covered in two domain periods.

**So a next story should be commissioned by a subject rather than drawn from this list**, or the list
should wait for the corpus to grow. The rate of one a batch with one declined was the material's
rate, and it has been worked through rather than slowed. **SEVEN STORIES SHIPPED.**

**SHARE CARDS FIXED 2026-08-13, AND SEVEN WERE BROKEN.** Every story unfurled `og:title` = *India,
On the Record* and `og:description` = the site blurb, because **a page that sets only `description`
does not override the root layout's `openGraph`** — Next merges that object, not field-by-field.
`storyCard` in `lib/share-card.ts` sets both; the seven sentences live in `lib/stories.ts` as
`share`, distinct from the index `card` because a share card arrives alone. All seven read at 60,
100, 140 and 180 characters and safe at every cut. **The landing card is the root fallback by
design and stays** — it carries the positioning item 1 corrected.

**THE 122 SERIES CARDS ARE ANSWERED, NOT OWED — closed 2026-08-13, and the answer is three.**
The tranche criterion above said *the 14 a story rests on, being the ones a reader reaches from a
shared link*. **The first half selected correctly; the second half was wrong and the measurement
retired it.** Inbound links to each of the 122, counted from every built page: 122 of 122 are linked
from a landing, story, question or overview page and **none is index-only**, so reach does not
discriminate and no set of series is "the shared ones".

**Of the fourteen, eleven already carried a two-truths card** written as a pair framing two batches
ago — the stronger sentence, and overwriting them to satisfy a count is the defect the count exists
to prevent. **Three were authored**, all P-114's material: `wb-mgnrega-funds-released`,
`bihar-mgnrega-funds-released`, `wb-mgnrega-new-jobcards`. All three safe at 60, 100, 140 and 180
characters — safe at the *first* cut, because a sentence that opens on its qualification has no
misleading prefix. No figure on any of them; the floor did not have to lift.

**Of the other 108: 7 carry a two-truths card and 101 carry the mechanical floor, and the floor is
the right permanent answer.** It asserts nothing quantitative, so no cut can mislead. 87 distinct
descriptions across the 108 and 37 share theirs with a sibling (seven ASER series read identically)
— but **`og:title` is distinct 108 of 108**, and this corpus authors finding-shaped titles, so the
card a reader sees is distinct where the composed half is not.

**THE STANDING CONDITION FOR AUTHORING THE NEXT ONE**, computed rather than judged: *a series gets an
authored card when a story rests on it and no pair has already written its tension.* Derived from
`lib/stories.ts` and `pairs`; a later cycle re-derives it. **Authored cards outrank two-truths cards**
in `seriesCard`, set now so that authoring a card for a pair side later does the expected thing.

**MOBILE PASS DONE.** Nav **3 lines → 2**, **132 px → 88**, **40 of 40 under-44 px targets → 0**,
and **317 px → 260** before the page's own h1. Cause of the third line was `display: block` on the
`All pages` disclosure — my own CSS from the navigation batch. **Question-route tables stack at
≤767 px via `data-label`, DOM unchanged**, so `listing-marks` reads 5,727 / 8,190 identically before
and after — the check that it was layout, not structure.

**DELIBERATELY NOT FIXED:** `/ledger/` and `/series/` stay tables (223- and 269-row catalogues
scanned by column, with `ListingFacets` as the phone path); inline prose links stay at 15 px (WCAG
2.5.8 exempts them); 260 px still precede the headline because title, coverage subtitle and crumb
are each load-bearing; charts stay small but **no label is under 9 px, measured**. PR-22 (education, depth 22), PR-35 (a form the site has not
published) and P-114 (welfare) are strongest on material. Each is a piece of writing.

**THE BLOCKER AS IT WAS MEASURED, kept because the fix is only checkable against it.** Measured across all 750 built pages: **each story has exactly
one inbound link, from `/stories/`. No record, series, topic, year or question page links any story,
and no story links another.** The four carry 30 outbound links to 29 distinct records — the route
runs one way through a single door. **A reader on `/series/aser-std3-reading/` is never told the
reading story exists.** The fix is the §9 relation already built (`lib/next-steps.ts`): *this story
rests on this record*, 29 pages gaining an inbound route. **Do this before a fifth story.**

**THE CRITERION, for the stories index** — computable, selects all four written stories, no merit
claim: *a subject qualifies where the corpus holds more than one official figure for one question —
either a `contested` pair with a series on both sides, or a provenance record graded `obscures`
affecting two or more series.* **25 signatures; 9 carried by a story; 16 unwritten.**

**THE UNIT IS NOT A PROXY FOR THE QUANTITY, and here is the number.** 13 of 26 two-series pairs
share a unit; **only 4 of those 13 are the same quantity**, and PR-35 is the same quantity with
DIFFERENT units. Assign the form by reading each `gapReason`, never by comparing units.

**LIVE CANDIDATES after the duplication test** — PR-22 (education, depth 22), PR-24, PR-27, PR-33,
PR-35, PR-56; partial PR-49, PR-57; boundary arm P-66, P-102, P-109, P-114.
**DROPPED as already stated well in their own topic prose:** PR-05, PR-30, PR-47, PR-48, **PR-59 and
PR-60** — the last two were the strongest-looking candidates in the set, and the foreign domain
period already carries them under the heading *One trade flow, two official values*.

**PR-35 IS A FOURTH SHAPE.** Its record resolves the disagreement: the two counts differ in all six
overlapping years and in three the difference is exactly NCRB's foreign-detenu count, so the
parliamentary series silently excludes foreigners. Not the jobs form and not the Kashmir form.

**A METHOD NOTE THAT COST TWO WRONG PASSES:** the duplication probe must be **scoped to the
candidate's own topic block**. Unscoped, `reclassified` matched large hydro in environment while
testing an infrastructure candidate and `mirror` matched the tier rule while testing India–China
trade — three false positives in six.

**STORIES NOW: four.** reading · jobs · Kashmir · renewables. Federalism declined as a duplicate.
Remaining candidates from §7 that are writable in the two-instrument form: **militancy in Kashmir is
written; federalism declined; the four unwritable ones now have their own page.** What is left of §7
is new subjects, not the original nine.

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

## INDEX PARTITIONING — MEASURED AND DECLINED 2026-08-13, WITH THE REASONING

Not unbuilt. **Declined, with the measurement recorded**, so a later cycle does not rediscover it as
an obvious gap and build it — the same treatment the counterfactual engine got.

### MY OWN PROPOSED LEVER WAS WRONG, AND THE MEASUREMENT IS WHAT SHOWED IT

I reported that ~60% of these documents is Next's RSC flight payload rather than visible DOM, and
suggested **"the bigger lever is hoisting the client islands, since Next serialises the whole tree"**.

**That is false.** The share is a CONSTANT, not a function of the tree:

| route | size | flight | share |
|---|---|---|---|
| `/search/` | 1,960 KB | 1,182 KB | **60%** |
| `/series/` | 1,372 KB | 838 KB | **61%** |
| `/unmeasured/` | 1,142 KB | 701 KB | **61%** |
| `/method/` | 56 KB | 34 KB | **61%** |
| `/directory/` | **24 KB** | 16 KB | **67%** |
| a record page | 50 KB | 32 KB | 64% |

**A 24 KB page carries the same proportion as a 1,960 KB one.** Every page ships its RSC
representation beside its HTML at roughly 1.5× the HTML, and moving client boundaries cannot change
that. So there is no structural saving to find — **the only lever is rendering less.**

### AND RENDERING LESS ON `/search/` COSTS MORE THAN IT SAVES

Of the 768 KB of visible cards, **118 KB is caveat text that rule 3a forbids shortening on any
surface where the record appears**. The remaining weight is 619 cards at a mean of 1,271 bytes.

Partitioning would break the premise argued at length in `components/ListingFacets.tsx`: rows are
server-rendered so **`listing-marks` can read them from built HTML**, filtering is a view operation
over a complete document, and with scripting off a reader gets the whole listing. A paginated
`/search/` is a query returning a subset, which is the shape that ruled itself out on rule 4b.

**What was taken instead, and it is the cheap real win:** `prefetch={false}` on 27 links across the
nine densest surfaces, so the speculative fetch is no longer spent on catalogue rows nobody opens.

### WHAT WOULD REVERSE THIS

A measured reader cost — a field or lab figure showing the weight actually loses people — or a
decision that `/search/` need not carry full cards at all, since **every record it lists already
appears on `/series/`, `/ledger/` or `/provenance/`**. That second one is a product question about
what the surface is for, not an optimisation, and it is not a code session's to make.

---

## THE 163 VALIDATE WARNINGS, TRIAGED 2026-08-13 — ASSIGNED, NOT REDUCED

An external audit: *"these are not all software bugs; many are honest research/data-quality debt.
They should nonetheless be triaged, assigned and reduced rather than accepted indefinitely."* The
triage is here. **Nothing was edited to silence a warning**, which would be the wrong move on every
one of them.

| rule | n | owner | reading |
|---|---|---|---|
| `unmeasured-route` | **82** | research | an absence naming no `wouldFill`. **The rule's own text says "fine when no instrument for it exists — worth saying so if that is the case."** So the fix is usually a sentence, not a route |
| `term-window` | **51** | **contract — see below** | a record's `date` outside its `term` window |
| `break-span` | 12 | research | a break at a period outside the observed span. "Fine for a documented-ahead transition" |
| `pending-note` | 6 | research | a pending placeholder with no note saying what it stands in for |
| `charset-diacritic` | 6 | **none — correct as written** | all six are `é` in *précis*, a normal English loanword. The rule says "fine for a proper name, otherwise normalise"; this is neither, and normalising it would misspell the word |
| `npa-basis` | 3 | research | a P-18 series stating no reporting basis |
| `absence-dispute` | 2 | research | `reasonDisputed` set with no `wouldFill` — and here the route IS the point |
| `affects-series-pending` | 1 | research | `lfpr-female-urban` not yet ingested; expected |

### `term-window` HAS ONE EXPLANATION AND IT IS A RULING, NOT A DEFECT

**All 50 measurable cases fall BEFORE their term starts. None falls after.** A one-directional
pattern is not a scatter of typos.

- `L-0070` *Farmer suicides*, dated 2014-01, term T1
- `L-0095` *RTE section 26's ten per cent vacancy ceiling, breached*, dated **2010-04-01**, term T3

**`date` is when the thing being assessed originates; `term` is which government is being held to
it.** The validator assumes they coincide, and **for an imposed duty they systematically cannot** —
which is RULING 5 exactly: *an objective may be imposed as well as announced*. A statutory duty from
2010 assessed against T3 has an instrument date fifteen years outside the window by construction.

**So these 50 are the structural consequence of a ruling this instrument made deliberately.**
Resolving them means either teaching the rule which records carry an imposed objective — which needs
a field it cannot currently read — or settling what `date` means. **Both are contract changes and
therefore stop-and-agree items.** Not taken here; recorded so the count stops reading as 51 unexamined
defects.

---

## `nh-network` — THE READER-FACING HALF CLOSED 2026-08-13; THE RECORD QUESTION STILL OPEN

**WHAT WAS DONE, AND ON WHOSE AUTHORITY.** The code session raised this and declined to edit
`/data`, on the ground that the narrow source-edit amendment reaches only corrections whose evidence
is a document retrieved in that run — and here the evidence is the corpus and its own git history.
**The operator then directed twice that it be finished.** A `notes` field was added to `nh-network`;
nothing else in `/data` moved.

**The note asserts nothing about Indian highways.** Every clause is an observation about this
corpus, checkable from it and falsifiable by it — rule 5d's test applied deliberately, because the
one thing a code session cannot establish here is which record is right. All nine clauses were
verified against the corpus after the write: same title, same FY2013-14 value, one observation
against five, the other's P-30/P-31 and its own 54,004-of-~55,000 figures, and zero records citing
this id.

**So the reader-facing defect is closed and the record question is not.** Someone landing on
`/series/nh-network/` is now pointed at the qualified series instead of meeting an unqualified
figure. **Whether this record should be withdrawn remains a research decision**, and the note says so
in those words rather than implying it has been made.

What follows is the raise, in full, so a research pass does not have to re-derive it.

### THE EVIDENCE

Two series answer to the identical title **"National highway network length"**, and they are the
only duplicate title anywhere in the corpus — 269 series, 223 ledger, 127 provenance, **one
collision**.

| | `nh-network` | `nh-network-length` |
|---|---|---|
| introduced | **`ddfead7` — "Phase 0: validation gate and static-export scaffold"** | `5c6909f` — "Phase 5 infrastructure: four pairs…" |
| points | **1** (FY2013-14 = 91,287) | **5** (FY2013-14 = 91,287 → FY2025-26 = 146,342) |
| caveat | **none** | present |
| `provenanceRefs` | **none** | P-30, P-31 |
| `source` | `MoRTH`, bare root, no vintage | `MoRTH / Lok Sabha replies`, vintage 2026-07-31 |
| cited by other records | **0** | **4** |
| named in `docs/verification-log.md` | **never** | repeatedly |

**Its single point is the first point of the other series**, and its point note reads
*"April 2014; construction pace 11.6 km/day"* against the other's *"Phase-1 baseline"*.

### WHY IT MATTERS MORE THAN A DUPLICATE NAME

**`nh-network` renders a page carrying no caveat.** Its researched counterpart's caveat states that
*roughly 54,004 km of the ~55,000 km increase since April 2014 is reclassification of existing state
roads as national highways* — and the verification log cites that caveat as **rule 3a's hardest
test**. So the corpus publishes one page where the headline network figure appears qualified and
another where the same figure appears bare.

### WHAT A RESEARCH PASS HAS TO DECIDE, AND WHAT IT MUST NOT DO

The question is whether `nh-network` is superseded or is a distinct measurement that coincides. **The
code session cannot tell**, and every signal above is consistent with either a scaffold left behind
or a record nobody finished.

- **Additive only.** A correction edits the record and notes the change in the log; it never deletes.
- **The series schema has NO supersession field** — `id title unit domain lenses tier source calendar
  breaks points provenanceRefs notes caveat unmeasured higherIsBetter xAxis denominator`. Adding one
  is a schema change and therefore a stop-and-agree item. **`notes` carries this case without one.**
- **`points[]` and any assessment are out of bounds** for a correction of this kind.

### WHAT THE CODE SESSION DID INSTEAD

**`tools/distinct-titles.mjs`, in the build.** No two records in a layer may share a title. This pair
is exempted **by id, with the reason, and by id rather than by title text** — a text exemption would
also silence a genuinely new record that reused the words. **The exemption exists so a SECOND
duplicate cannot arrive unnoticed behind the first.** When the research pass resolves this, delete
the entry and the gate holds the whole corpus with no exemption at all.

---

## DECIDED 2026-08-13 — SEARCH INDEXING STAYS OFF, AND THE DIRECTORY BECAME A PAGE

**`noindex, nofollow` IS THE INTENDED SETTING AND IS NOT AN OVERSIGHT.** An external audit raised it
as a P2 — *"the entire site deliberately blocks indexing… incompatible with broad organic discovery
of a public-record resource"* — which is a fair reading of the header and the wrong reading of the
project. **CLAUDE.md's first paragraph says "Private audience"**, and the share-card work was scoped
by the operator as *"distribution is by pasted link with no search discovery"*; the entire card
design follows from that premise. The setting matches the brief.

**Recorded here so a later pass stops re-raising it**, which is exactly how it surfaced this time.

**WHAT FOLLOWS FROM IT, so nobody builds the wrong thing:** `/robots.txt` and `/sitemap.xml` are 404
and **should stay that way while this holds** — a sitemap under `noindex` is work that does nothing.
Per-route canonical URLs are the same. **If the intent ever changes the ORDER matters:** remove
`noindex` first, confirm index coverage, and only then build sitemap, robots and canonical.

**`/directory/` IS NOT THAT, and the name was chosen to keep them apart.** It is a reader's contents
page carrying the same 17 destinations the masthead disclosure carries, not a machine document for
crawlers.

**AND THE MOBILE PANEL IS CLOSED BY IT.** The `All pages` disclosure opened to **941px inside an
812px viewport** at 375px, with no backdrop, no Escape and no scroll lock. **It could not have them**
— it is deliberately script-free, and making it a scripted modal would make the one control designed
to survive a failed bundle depend on one. So below 768px the disclosure is replaced by a link to
`/directory/`, **swapped in CSS with `display: none` so exactly one is in the accessibility tree**,
and both render `DIRECTORY` from `lib/routes.ts`. The panel is kept above 768px, where it was
measured to work.

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

## SERIES-ID LINKS — LANDED 2026-08-13 ON THE THIRD ATTEMPT, AFTER THE DESIGN QUESTION WAS SETTLED

**225 links across 54 pages.** A caveat naming another series is now clickable, as `P-26` has been
for months.

**IT TOOK A DESIGN CHANGE, NOT A PATCH, AND THE FIRST TWO ATTEMPTS FAILED BECAUSE I TRIED PATCHES.**
The settled rule, applied in two places that had disagreed:

> **A row LISTS a record when an anchor's text carries that record's title. Any other link to a
> record — an id, a phrase inside a sentence — CITES it.**

`unrecognised-rows` had drawn exactly that line for months and counts 941 citations. `listing-marks`
had no notion of link text at all: it took the FIRST record href in a block as the row's subject, so
a caveat citing another series made its own row a listing of that series. **Both gates now share one
`linkText` in `lib/listing-shapes.mjs`**, and the same distinction governs the `<tbody>` unit test —
a record cited inside a caveat no longer makes a one-record block look like a multi-record one.

**THE MEASUREMENT THAT MADE IT SAFE, AND IT CAUGHT A SILENT WEAKENING.** The first form of the rule
tested `linkText === title`. That is right for a table row, where the anchor wraps the title alone,
and **wrong for a grid card, which wraps the WHOLE CARD in one anchor** — so its text is the id, the
tier, the title and the caveat together. Rows checked fell **4,167 → 3,041**, 1,126 real listings
quietly dropped, and the gate still reported OK. `includes` rather than `===` restored them:
**4,166 / 5,913, one row and one mark below the baseline, and that one is the caveat row that was
never a listing.** A citation still fails the test, because a citation links by id and an id does not
contain the title.

**The two gate fixes it needed stand on their own** and are recorded where they were made:
`reachability`'s probe, which was passing by luck; and this.

**Three attempts, and what changed between them was not effort.** The first two moved the
disagreement between the linkifier and the listing model from one place to another. The third asked
what a row IS.


**The operator authorised the gate change. It was made, and the feature still does not fit.**

`reachability`'s probe was the FIRST blocker and it is now fixed and kept — see below. Past it, four
more interactions appeared, each one real and each one revealing the next:

1. **`listing-marks` failed 46 marks.** A caveat citing another series made a one-record `<tbody>`
   look like a multi-record block, so it stopped being a listing unit and the full-width caveat row
   rule 3a created stopped being grouped with its record.
2. **Excluding caveat rows from that count fixed 45 of 46.** The last was a caveat rendering INLINE
   in a cell rather than in its own row.
3. **Excluding both shapes fixed that**, and promoted one `<tbody>` to a unit that had not been one —
   which silently removed the PAIR-ROW SKIP, so a PR-22 comparison row was asked for the absence mark
   of a record it merely compares.
4. **Excluding pair rows from units fixed that**, and left the real one: **the caveat row itself now
   "lists" every record its text cites**, so `listing-marks` demands those records' marks from a row
   that is not a listing of them.

**THAT LAST ONE IS NOT A BUG TO PATCH.** The listing model identifies a row by the record hrefs it
contains. Linkifying an id inside a caveat puts a record's href in a row that is not about that
record. **Two designs disagree**, and each patch moves the disagreement rather than settling it.

**Proved rather than assumed:** with the id set emptied and everything else unchanged,
`listing-marks` returns to 4,167 / 5,914 clean. The failures were the feature's, not a coincidence.

**WHAT WOULD ACTUALLY SETTLE IT** — and it is a design question, not a fix: the listing model needs a
notion of *a row cites a record* distinct from *a row lists a record*. `unrecognised-rows` already
has exactly that distinction (941 citations at the last count). Until `listing-marks` has it too,
this feature cannot land, and **I was wrong twice to call it cheap.**

### WHAT WAS KEPT, BECAUSE IT STANDS WITHOUT THE FEATURE

**`reachability`'s probe is fixed.** It compared a mark's first 60 characters against a page where
every tag becomes a space, so any inline link inside those characters broke the match. It had never
fired only because zero P-ids fall inside any caveat's opening 60 characters — **the check passed by
luck.** Both sides now remove the space a tag boundary leaves beside punctuation, through one
function. **The shared normaliser `tools/lib/page-text.mjs` has done this since it was written**;
`reachability` carries its own extractor and had not. That duplication is now a recorded fact rather
than an unnoticed one.


**Attempted 2026-08-13 and reverted.** I had said this was mislabelled as blocked and was really a
size judgement. **That was right about the client-boundary problem and wrong about the conclusion.**

**The client boundary is genuinely solvable.** `components/marks.tsx` cannot import `lib/data`
because `OverviewBoard` is a client component and pulls it into the browser bundle, and `lib/data`
reads `node:fs`. A generated id module solves it: 267 linkable ids, longest-first (11 are a strict
prefix of another — `nh-network` against `nh-network-length`), with `crar` and `remittances` excluded
because they are an ordinary acronym and an ordinary word and **a false link asserts a citation
nobody made**. That part worked.

### WHAT STOPPED IT

**`reachability` FAILED — 3 of 1788 marks.** Its probe is the first **60 characters** of a mark,
compared against the page through its own `visibleText`, which replaces every tag with a space. So
`<a>ptr-primary-udise</a>,` extracts as `ptr-primary-udise ,` and the needle
`A SEPARATE SERIES FROM ptr-primary-udise, on a different uni` no longer matches. **Three caveats
open by naming another series inside the first 60 characters.**

**THE CONFLICT IS PRE-EXISTING AND LATENT, AND P-LINKIFICATION HAS ONLY EVER PASSED BY LUCK.**
Measured: **zero P-ids appear in the first 60 characters of any caveat.** The gate's stated premise —
*"marks never truncate, so a prefix is a sound test of presence"* — assumes rendered text is
character-identical to stored text, and **linkification has always broken that assumption**. Adding
267 linkable tokens where a pattern previously matched a handful is what made it fire.

### WHY IT WAS NOT FIXED HERE

Making the probe tolerate an element boundary is **a change to a gate's matching contract**, and the
code-session stop rule names exactly that: *a schema, enum or gate contract changes* — commit the
work and the finding, then stop.

**Two diagnostic errors on the way, both worth keeping.** I first tested the needle at 90 characters
when `PROBE` is 60, and then tested it through `pageTextFromHtml` when **`reachability` has its own
`visibleText`** — so my check said "found: true" three times against a gate that was failing. The
rule that a verification must read the page through the gate's own normaliser assumes there is one
shared normaliser; **this gate predates that and has its own**, which is the gap that let a wrong
check look right.

### WHAT A LATER PASS SHOULD DO FIRST

Decide the probe, not the linkifier. Either compare with a normalisation that collapses a space
before punctuation, or anchor the probe on a window that no element boundary can fall inside. **Until
then the 23 mentions stay unlinked, and the reason is the gate rather than the bundle.**

---

## RAISED 2026-08-12 BY A READER'S REVIEW — WORKED 2026-08-13 ON THE OPERATOR'S DIRECTION

**The counts below did not survive re-derivation, and that is the first finding.** Asked to work
these, I re-derived them rather than trusting the recorded 40 / 65 / 38 / 21, and my own classifier
produced **demonstrably false categories** — it read *"PARAKH 2024, which publishes no methodology
section, grades T1"* as a GOVERNMENT TERM because of the year, when it is plainly a source tier. On
206 "repository archaeology" hits the regex was matching *"this record"*, which is ordinary
self-reference inside a record.

**So the 164 is not a work list. It is four keyword scans whose members were never read**, and the
count rule says exactly this: a count from a keyword scan is not a finding until the members are
read, and labelling it as candidates does not stop it being spent as one.

**CLOSED 2026-08-13 — ALL 86 T-TOKENS AND ALL 49 DATED STAMPS READ, AND THE FILED FINDING INVERTS
ON BOTH.**

**Tier letters (filed as 38) are correct usage and load-bearing.** Read in full: *"the only figure in
circulation is a T4 relay"*, *"ASER is graded T4 as the tier definition requires"*, *"Tiered T2 and
not T1 deliberately"*. **The tier IS the subject of the sentence** — strip the letter and the claim
goes with it. `/method/` defines the ladder, so it is defined vocabulary, not jargon.

**The real defect was the TERM letters, which nobody had separated out** — `T1` meaning *the first
term* rather than *a primary source*. **11 found by reading, 11 reworded**: *"the first year of T1"*
→ *"the first year of the first term (2014-19)"*, *"opened in T2 and reached its maximum in T3"* →
*"opened in the second term and reached its maximum in the third"*. **Term-shorthand uses now: 0.**
A crude residual test reported 7 left; all 7 are tier uses it failed to recognise, which is the third
time in this item that automated classification of T-tokens produced a false category.

**Rescore stamps (filed as 40, actually 49) ARE THE CORRECTION CONVENTION AND MUST NOT BE TOUCHED.**
`withdrawn-wording` gates 30 of them as corrections that quote what they withdrew; `quotation-identity`
holds 32 quotations against history. **And they render verbatim on `/corrections/`** — checked:
*"CORRECTED 2026-08-05"* and *"2026-08-03: this record was rescored"* are on that page. **They are
the corrections surface's source data.** Removing them would break two gates, destroy the record of
what changed, and contradict the append-only rule directly.

**So this item is closed with two of its four classes reversed.** Schema names: 3 reworded, 7 correct
where they are. Tier letters: correct. Rescore stamps: protected. Term letters: the actual defect,
found by reading, and fixed.

**WHAT WAS READ, AND WHAT WAS DONE.** The one class small enough to read in full — schema and field
names in prose — is **10 instances**, and reading them changed the judgement:

- **Seven are in `assessmentNote`, which renders under the heading "Why this verdict"** — the field a
  reader reaches by asking why. In most, the field name IS the subject: *"the `reasonKind` becomes
  withheld"*, *"`differentFacts` is false"*. **Rewriting those into plain words would make them
  vaguer, not clearer**, because the sentence is about which value a specific field takes.
- **Three reword with nothing lost, and one of them was in a `caveat`** — the field every reader
  meets on every surface the record appears. `L-0183` now reads *"the stated reason becomes
  'withheld'"*; `P-63` and `P-68` say *direction of bias* in words. **Schema names in caveats
  corpus-wide: 0.**

**Tier letters and rescore stamps are NOT taken**, and not for effort: tier letters are defined
vocabulary with `/method/` explaining them, and **an unknown number of the dated stamps are the
correction convention working as designed** — `quotation-identity` holds 32 quotations across 30
correction-marked fields, and deleting one would destroy a record and fail a gate. Separating those
from genuine archaeology needs the members read, per record, which is research.

---

## THE 82 `unmeasured-route` WARNINGS, TRIAGED 2026-08-13 — AND THE SHAPE IS A DIFFICULTY GRADIENT

**CLOSED 2026-08-13 — THESE ARE NOT WORK OWED.** All 82 read. **The shortest `why` is 177 characters
and the median is 376; there is no empty entry in the set.** Every one already states, at length,
why nothing measures the thing — and several are stronger than a route would be: *"The holder has
spoken, and says there are none. The J&K Home Department confirmed under the Right to Information"*;
*"Both responsible Union bodies told a parliamentary committee they hold none, and each named the
other"*; *"Ten Ministry parliamentary answers and two press releases were checked and none contains
such a list"*; *"Neither judgment records any reason, because Article 200 imposes no duty to give
one."*

**The rule warns because it tests for a FIELD, not for the substance in `why`.** `wouldFill`'s own
schema description says *"the source that would close it, **if one is identifiable**"* — the schema
already allows for none — and the rule's message says *"fine when no instrument for it exists —
worth saying so if that is the case."* **They have said so. There is no canonical way to say it, so
compliance is structurally undetectable.**

**FOUR CLASSIFIERS FAILED ON THIS SET BEFORE IT WAS READ.** A regex for *no instrument | no source*
scored 15 of 82 as compliant and marked *"no decomposition exists in anything retrieved"* and *"No
field ASER and no government assessment"* as silent. **Reading is what settled it**, as it settled
the register item on the same day.

**What would close the warning rather than the work:** a `noRouteExists` boolean, or the rule reading
`reasonKind` plus a non-trivial `why` instead of the presence of a field. **Both are contract
changes** and are therefore stops, not tasks.


Not neglect. Measured across every absence in the corpus:

| `reasonKind` | with a `wouldFill` | without |
|---|---|---|
| `not-published` | **205** | **0** |
| `withheld` | **12** | **0** |
| `not-collected` | 66 | **49** |
| `never-defined` | 9 | **33** |

**Where a document exists and is merely unpublished, a route is always named — 217 of 217.** The 82
sit entirely where naming one is hard: nothing was collected, or nothing was ever defined.

**A hypothesis was tested and refuted:** that `never-defined` cannot carry a route by construction.
**Nine do** — *"A UDISE+-based count of section 12(1)(c) seats notified per school"* is a route to
measuring a thing nobody defined. So the 33 are genuinely open, not structurally impossible.

By topic: governance 52 · education 29 · kashmir 26 · federalism 20 · macro 11. **Two carry
`reasonDisputed` and are the sharpest** — `L-0104` faculty vacancies and `L-0074` party affiliation
in ED cases — because the stated reason is contested precisely on the ground that the data exists, so
the route is exactly what is missing.

**Naming a route is research**: it asserts that a particular instrument would close the absence, which
is a claim about the world under rule 5d. The work list above is what a research pass needs.

---

## NATIONAL DELIMITATION — PRIMARIES RETRIEVED 2026-08-13, ONE FACT SHORT OF A RECORD

**The scope question is closed, and so is the premise I wrote it on.** This entry argued a record was
in scope *even though nothing had happened yet*. **Something has happened, and one retrieval showed
it**: three Bills were introduced in Lok Sabha on **16 April 2026**, two of them on this subject.

**HELD, retrieved in this run and quoted in full in `DELIMITATION-BRIEF.md`:**
- **Bill No. 107 of 2026**, the Constitution (131st Amendment) Bill — *"In article 82 … the third
  proviso shall be omitted"*, the House raised to *"not more than eight hundred and fifteen"* elected
  from States plus 35 for Union territories, and a Statement of Objects and Reasons whose stated
  objective is **operationalising women's reservation**, with delimitation as the vehicle.
- **Bill No. 108 of 2026**, the Delimitation Bill.

**OWED: exactly one document.** A think-tank tracker states the 131st Amendment Bill was
**negatived on 17 April 2026**, the day after introduction. **That is an account, and an account is
T4.** The primary was sought and not retrieved: `sansad.in` serves a JavaScript shell with an empty
bill table (rule 3 — not a retrieval), `loksabha.nic.in` returns HTTP 000 and does not resolve, and
a negatived Bill is never gazetted so `egazette.gov.in` cannot confirm a defeat.

**Retried 2026-08-13 with the variables varied: the outcome is now multiply attested — 298 for, 230 against, threshold 352 — and the companion Delimitation Bill was WITHDRAWN, a second event. Every one of those sources is an account and the best of them is paywalled and does not cite the House record. Independence holds; the tier does not.** **The verdict turns on that one fact entirely** — a failed attempt and a pending change are different
records with different assessments — and **a verdict resting on a single uncorroborated T4 account is
what this instrument refuses.** Retrieve the Lok Sabha record of 17 April 2026 and the record is
writable immediately; everything else is held.

**Environment fact, established per M1 by retesting from a second client:** `legislative.gov.in`
returns **403 to WebFetch and 200 to curl with a browser user-agent.** Not unreachable — it refuses
one client.


**Scope settled 2026-08-13 by precedent, not by opinion.** The objection was that nothing has
happened yet, so there is no event to score. **The corpus already carries 19 unresolved records** —
`too-early` 13, `awaiting-adjudication` 4, `undated-commitment` 2 — and the governing precedent is
`L-0225`, *"Net zero by 2070 is one sentence: a year, and no statement of what is being zeroed"*:
`too-early`, two T1 sources, a quoted `claimAtLaunch`, **a target 44 years out.** A constitutional
trigger due after the next census is nearer and more concrete. **A pending trigger is not a new kind
of object here.**

**Not written, and the reason is a rule.** Authoring a ledger record asserts a verdict; the roles
rule reserves that for research, and the narrow source-edit amendment reaches *a citation, a reason,
a scope or a wording* — **never an `assessment`**. And every source would have to be retrieved in the
authoring run.

**The specification is written so a research pass does not re-derive it:**
`drops/phase-18-design-lock/DELIMITATION-BRIEF.md` — structure after `L-0225`, the assessment values
the rulings leave available (`too-early` yes; `undated-commitment` almost certainly not, Ruling 3;
`no-objective` no, Ruling 5), and **two live traps**: `date` against `term` — the validator now warns
only on the late side, which was narrowed for exactly this class, so do not back-date a record to
silence a warning — and rule 5d on the southern-states claim, which is a projection and must be
attributed with its method or not stated.

---

## PHASE 13's COMPLETENESS — ANSWERED 2026-08-13, AND THERE IS A NAMEABLE GAP

The CLAUDE.md phase table carries phase 13 as **"NOT SAFE TO TREAT AS COMPLETE until the delimitation
overlap with phase 12 is checked."** Checked:

**15 records use delimitation vocabulary and every one of them is Jammu and Kashmir** — `L-0141` is
the substantive record, *"Delimitation of Jammu and Kashmir: one Commission table…"*, filed
`governance,kashmir`.

**Of 82 federalism records, exactly one mentions delimitation at all**, and that one is `L-0146`, the
J&K third-tier record.

**So the corpus contains no record on NATIONAL delimitation** — the constitutional freeze on Lok
Sabha seat reallocation, due to lift after the first census following 2026, and the reason southern
states argue they will lose seats to northern ones. Stated as rule 5d requires: *the corpus contains
no such record*, which is checkable, rather than *nothing exists*.

**Whether that is a gap or a scope decision is research's to settle, and there is a real argument for
either.** Nothing has happened yet — the freeze has not lifted — so there is no event to record; but
an instrument carrying 82 federalism records and a commitment vocabulary (`undated-commitment`,
`no-objective`) has the means to carry a pending constitutional trigger, and does not.

**The phase-13 question is now answered rather than open**: the overlap with phase 12 is J&K
delimitation, both covered it, and what neither covered is the national question.

---


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

**Phase 13's completeness was an open question and is CLOSED 2026-08-13.** The CLAUDE.md phase
table asked for one thing — that the delimitation overlap with phase 12 be checked — and it has
been: **15 records use delimitation vocabulary and every one is Jammu and Kashmir**, so both phases
covered the same object and neither left the other's ground uncovered. The table row now records
this. **What the check surfaced is a separate, newly-raised item and not a phase-13 residual**: the
corpus holds no record on NATIONAL delimitation, raised in full above.

**`drops/phase-17-design-lock/` is named wrong on purpose** and is left wrong, for the reason in the
header above.

---

## PINS

| pin | value |
|---|---|
| gate chain | **30 steps**, `npm run build`; `npm run commit` is the only sanctioned commit path. **`lint` and `e2e` are NOT in it** — CI steps, because Vercel has no browser binaries and the build is paid for on every deploy |
| `npm run e2e` | **17 Playwright tests** — the four properties `interface-invariants` says it cannot bind: a count updating on a click, rendered target size, keyboard reach into a scroller, 375px overflow across 13 routes |
| `npm run lint` | **0 errors, 0 warnings.** ESLint 9 — pinned, because `eslint-plugin-react` declares peers only to `^9.7` and `eslint-config-next`'s `>=9.0.0` is too loose |
| `distinct-titles` | **619 records, every title naming exactly one record, 1 pair exempted by id** — `nh-network`/`nh-network-length`. Delete the exemption when the record question is settled and the gate holds the whole corpus |
| `unrecognised-rows` | **0**, report-only. Zero makes flipping it to a gate *available*, not decided |
| `listing-marks` | **4,167 listing rows · 5,914 marks** across 753 pages — re-measured 2026-08-13 after the topic tabs stopped duplicating the overview body (from 5,727 · 8,190). **The fall is the expected direction**: a readable list stopped rendering on four tabs where it was a duplicate |
| `link-check` | **59,070 internal hrefs across 754 built pages**, 24 route prefixes, 0 dead — re-measured 2026-08-13 (from 60,433 across 753; the page and two prefixes are `/directory/` and `/icon.svg`) |
| series share cards | **3 authored** in `SERIES_CARDS` · **18 two-truths** · the rest the mechanical floor. Authored outranks two-truths. Condition for the next: a story rests on it and no pair has written its tension |
| series reach | **122 of 122** qualifying series are linked from a landing, story, question or overview page; **0 are index-only.** Reach does not discriminate — do not re-propose it as a selection criterion |
| authored series findings | **237 of 269**; 32 render without one, permanently and for a stated reason |
| raw enum tokens on a public surface | `directionOfBias` 6 pages, all the one deliberate site; `pairs.kind` 0 |
| `field-render-audit` | 0 invisible, **15** exempted by name (was 17; `higherIsBetter`'s exemption was discharged 2026-08-12 and it is now declared) |
| `higherIsBetter` | **renders from 2026-08-12**, as words, via `DirectionMark`. 70 declare a direction · 76 declare none · 123 are silent, and the third renders nothing |
| caveat strings are NOT identifiers | **4 groups of series share a caveat verbatim, covering 15 series** — nine ASER siblings are one group. Any check that identifies a record by its caveat text is unsound for those 15; use the id |
| search indexing | **`noindex, nofollow`, decided and recorded 2026-08-13.** Do not build sitemap/robots/canonical while it holds; if it changes, remove the header FIRST |
| security headers | CSP, `X-Frame-Options`, COOP, `Permissions-Policy` set 2026-08-13 · `docs/security-headers.md` · **`script-src` carries `'unsafe-inline'` and cannot not, on a static export** |
| deploy | `vercel.json` calls `npm run build`; `tools/deploy-chain.mjs` fails if the chain is ever restated instead of called |
| verify after push | `node tools/deploy-check.mjs` — needs the network, deliberately not in the build. **First check is one request:** `/data/v1/manifest.json`'s `commit` against `git rev-parse HEAD`. A deploy CAN fail after a clean local build. **The font-fetch cause is closed 2026-08-13** — fonts are vendored in `app/fonts/`; it had killed two |
| DOM viewport probes | **`resize_window` at the `desktop` preset gives `clientWidth === 0`** in this hidden pane, so every element tests as overflowing. Set an explicit width (1280) or use the mobile preset |

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
