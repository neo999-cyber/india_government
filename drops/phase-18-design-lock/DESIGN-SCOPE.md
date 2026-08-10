# PHASE 18 — DESIGN LOCK. The governing scope.

**The phase name is read off the table in `CLAUDE.md`, not chosen here.** The table says 18 is
*design lock*; this file and its directory use that name and no other. A second name for a phase is
the collision that ran for a scoping batch between phases 17 and 18, and `tools/phase-name-consistency.mjs`
exists because of it.

**Revision 3. Supersedes revision 2** (`inputs/DESIGN-PHASE-SCOPE.md`), which superseded revision 1
(`inputs/DESIGN-PHASE-SCOPE-rev1.md`). Both are kept in `inputs/` unedited, because the corrections
below are only checkable against what they replaced.

**Changes from rev2 are marked ⟳ with the wording they replace**, per the corpus's own correction
convention. **Rev2's own ⟳ marks are retained where its wording stands** — they record the
ChatGPT critique's seven changes, all of which were correctly adopted and none of which is
reopened here.

**Status: the phase is OPEN.** ⟳ *(Replaces rev2's "Prerequisite: the architecture stopping
condition is NOT met. Six walks, five found something off-queue. Three findings are open and
unfixed (see §9). Design opens against a stable surface set, not on a schedule." **All three are
fixed and the condition has been met** — see §9.)*

---

## 0. ⟳ What the research produced, and what it was worth

*(New section. Rev2 recorded its own conclusions but not its inputs' disposition, so a later cycle
could not tell which ideas were considered and rejected from which were never seen.)*

Seven HTML mocks, four PDFs, one external critique and two reference sites were read in full on
2026-08-10. **The strategic direction rev2 reached is right, and every rejection in §7 traces to a
rule this corpus earned rather than to taste.** The per-artifact disposition is in
`RESEARCH-ASSESSMENT.md` beside this file. Three findings from that reading change this document:

1. **§9 was stale.** Architecture closed 2026-08-10.
2. **The story subject was wrong on the evidence.** §11, corrected below.
3. **Two decisions the docs never made** — the relationship to the existing site, and the form of
   the prototypes — are now settled by the operator and recorded in §1.

**And the largest single correction to how the research should be read:** the ideas rev2 rejected
were rejected for *what they would assert*, not for *how they look*. Most of the visual experience
can return once the assertion is removed — a graph built from declared edges rather than inferred
ones, zoom transitions between real URLs rather than instead of them, a discovery loop whose
"related" is a stated fact rather than a similarity score. §4d records the three that come back.

---

## 1. Operator decisions (settled)

| Decision | Value |
|---|---|
| **Positioning** | *"Here's what we can actually know about how India changed."* Not "here's how India changed." |
| **Audience** | Indian general public. Naive users. Young. Shared on WhatsApp and social. Not journalists, not researchers. |
| **Language** | English only. |
| **Platform** | **Mobile is the acceptance constraint.** Build desktop-first if preferred, but no core idea is approved until it works at ~360–390 px without hover, without WebGL, without tiny annotations, and without provenance hidden behind a pointer. |
| **Authorship** | Anonymous. No byline. |
| **Verdict tally** | Never on a public surface. No "1 of 223." No scoreboard, no composite score. |
| **Vocabulary** | **These are records, not promises.** Most of the 223 are episodes, institutional practice or statutory duties — AFSPA sanction refusals are not a pledge. Calling them promises re-enters the tracker genre by vocabulary alone, whatever the layout does. |
| ⟳ **Site model** | **One site, redesigned in place.** The public surfaces and the archival instrument are the same deployment and the same URL space; the existing dense surfaces BECOME the evidence layer the §4b control opens into. *(New. Neither rev answered what happens to the 14 existing surfaces, which left the §4b control opening into an undefined place.)* |
| ⟳ **Prototype form** | **Built in the real Next.js app against real `/data`**, on a branch, not as standalone mocks. *(New. The hard problems ARE the corpus constraints — a 1,312-character caveat, 374 absences, 182 seams — and a mock with invented data dodges exactly what has to be solved.)* |
| ⟳ **AI / query layer** | **Out of scope.** *(New — an idea present throughout the research inputs and ruled on nowhere.)* See §7. |

### Consequences of anonymity
Credibility must come entirely from the evidence chain, because it cannot come from a name.
Every chart carries its source visibly. The method page keeps its existing statements — including
that gates enforce consistency and not correctness, and that nothing has been checked by anyone who
did not write it. The provenance work must be *visible*, not merely *available*.

---

## 2. Research findings that shape the direction

*(Unchanged from rev2. Reproduced because this file governs.)*

### 2a. The promise-tracker genre is a trap — do not enter it
Every existing promise tracker takes the same form: a meter with a tally. PolitiFact's
Trump-O-Meter; the UK Institute for Government's progress analyses; Nepal's Pratikapaksha; Kenya's
Mzalendo; Slovenia's "Promise Made = Debt Unpaid"; dozens more.

**This corpus refuses that form.** One `worked` record in 223, no composite score, and a standing
ruling that verdicts do not aggregate. Building the standard shape would make the instrument look
like a broken version of a familiar thing. It is not a scorecard. It is a record of what can and
cannot be known.

### 2b. The gap nobody has filled — and it is this corpus's exact material
Across 612 visualizations from 121 articles by leading data-journalism outlets, 449 presented data
intended for inference and **only 14 — three per cent — showed uncertainty visually at all.**
(Hullman, *Why Authors Don't Visualize Uncertainty*.)

A study comparing three treatments — missing encoded as zero, missing omitted, and missing omitted
with an icon supplying the reason — found that **users often do not notice missing data when it is
replaced by a default value**, and that **participants preferred the version that supplied a
reason.** (Eaton et al.; see also Andreasson & Riveiro.)

The corpus holds **374 declared absences, each with a stated reason**, 127 provenance records, and
182 declared seams. That is the material 97% of data journalism does not have, and the empirically
preferred treatment is the one this corpus was built for.

**This is the site.** *Here is what India's own numbers say, and here is exactly where they stop
saying anything.*

### 2c. Scrollytelling discipline
Use scrollytelling where the sequence itself helps the reader understand causality, chronology or
scale — not as the default page structure. Identify the one moment that genuinely deserves it and
do that rigorously. Heavy scroll pages harm load time and lock readers into a tunnel with no exit.
Respect `prefers-reduced-motion`. Serve text as readable HTML, not JS-generated content.

---

## 3. The failure mode to design against

**Nihilism.** If every chart breaks and every verdict is contested, a naive reader concludes the
site knows nothing and leaves. **A gap is only interesting against a background of things that are
solidly known.**

So the structure inverts: **lead with what IS well measured.** Then the gaps land as findings
rather than as a posture. A reader who has just seen six clean series and then meets one that stops
in 2019 understands instantly that the stop *means something*.

**Rough rule:** the majority of what a reader sees is things India does measure. The minority — but
the memorable minority — is where it does not.

### Tone
**A site about uncertainty must not sound uncertain.** State plainly what is known, plainly what is
not, and never sound apologetic about either. Hedged prose plus visible gaps reads as weakness.
Flat declarative prose plus visible gaps reads as rigour.

### 3a. Homepage order — this rule governs §4c
1. The positioning line.
2. One strongly measured change, told well.
3. Several more recognisable, well-measured changes.
4. A deliberate transition into a series that breaks or stops.
5. The reason attached to that break, printed.
6. Only then, the cross-record evaluability view — with the framing in §4c.

The evaluability view belongs *in* the argument, not above it.

### 3b. ⟳ The charts are chosen from the inventory, not from a list of popular subjects
*(New, and it is the reason the inventory was commissioned. Rev1 named "electricity access, road
length, rail electrification" and rev2 named "electricity capacity, road length, rail
electrification, renewables capacity, coal production, support prices." **Rail electrification and
road length are not in the corpus's clean set at all**, and rev2's own §9 called the inventory a
"required prerequisite" while §3 went on naming subjects it had not yet read.)*

`drops/phase-17-design-lock/SERIES-INVENTORY-2026-08-08.md` is the source of truth. Twenty-six
series carry ≥10 verified India observations with no pending point; **fifteen are fiscal**
(`federalism` 12, `macro` 3) and are not homepage material. The eleven non-fiscal resolve to
**five subjects**:

| subject | series | span |
|---|---|---|
| Electricity mix | `res-capacity-share` · `res-generation-share` · `non-fossil-capacity-share` · `non-fossil-generation-share` | FY2012-13 → FY2025-26, 14 pts each |
| Coal | `coal-production` · `coal-plf` · `coal-imports-total` | FY2013-14 → FY2024-25 |
| Higher education | `higher-ed-ger` | FY2011-12 → FY2023-24, 13 pts, 1 seam |
| J&K security | `jk-sf-killed` · `jk-terrorist-incidents-legacy` | 2011 → 2024 |
| Sanitation | `sanitation-basic` | 2014 → 2023, 10 pts, seamless |

**Any homepage chart outside this set must state why it qualifies.** The test remains: *would a
normal person notice this in their life?*

---

## 4. The design ideas

### 4a. The broken line is the signature visual
Every chart renders its gaps as gaps, its basis seams as visible breaks, and **each break carries
its reason inline — printed, not in a tooltip.** A wall of honest charts where the interesting part
is where they stop.

Nobody else does this. It is also unfakeable: a competitor can copy the layout, not the 374
reasons. The shareable unit writes itself — a chart that runs from 2014 and simply ends, with one
line naming what was searched and what came back. Wording rule in §5a.

### 4b. "How do we know?" as a control, not a page
Every number on the site opens **in place** to reveal the layer beneath it: source, tier, whether
anyone independent measured it, what was corrected and what the correction withdrew.

The same control everywhere, from homepage to deepest record. It **teaches the site's thesis
through repetition**: after three uses a reader understands that every number here has something
underneath, and that some numbers have nothing underneath — which is the entire point.

**It must be an explicit, labelled, keyboard-operable control** carrying `aria-expanded` — not a
hover, not a drag, not a gesture a reader has to discover. On a phone there is no hover and no drag
affordance, and a disclosure nobody finds is the §8.2 defect exactly.

⟳ **And it opens into the existing archival surfaces**, which is what the site-model decision in §1
settles: the control's deepest link is the record's own page, `/provenance/P-xx/`, `/method/`. The
dense instrument is not replaced; it is what the control is a door to.

### 4c. Evaluability — framed narrowly, and NOT the opening image
Domains shown by how much of each **within this record set** carries a stated, quantified objective
that outcomes can be checked against. **Position:** late in the page, per §3a.

**The denominator problem.** The denominator is this corpus's own selection, and **selection bias
is a logged open item that no internal audit can reach**. A chart implying *"this is how much of
Indian policy is measurable"* makes a claim about the world from a sample of unknown construction.

Permitted wording, strictly about the record set: *"Where outcome evaluation was possible"* ·
*"Records with evaluable outcomes"* · *"What this record set can establish"*.

**Forbidden:** *"how much is measurable"*, or anything asserting a property of Indian policy rather
than of these records. **If a framing satisfying this cannot be found, the view does not ship.**

**Framing constraint:** `reform` share predicts the evaluable rate at ρ = 0.91, so the low bars are
largely a fact about what those areas *contain* — announced programmes vs. institutional episodes
and constitutional duty — not about reticence in scoring them.

**If 4c cannot ship,** the strongest replacement is the **corrections surface** — a record that
shows what it used to say, with the withdrawn wording visible. Nothing else about Indian policy
does this, it is unfakeable, and it carries no denominator problem at all.

### 4d. ⟳ Three rejected experiences return, with the assertion removed
*(New. Rev2 rejected these outright in §7. The rejections were right about what those designs
would ASSERT; they over-reached in discarding the experience along with the assertion.)*

1. **The connections diagram** — *what this record rests on.* A structured diagram on the record
   page, drawn **only from edges the corpus declares**: `sources[]` (typed by tier), `seriesRefs`,
   `provenanceRefs`, pair sides, `breaks[].provenanceRef`, `unmeasuredRef`. **Fixed columns by
   relation type, never a force layout** — so position encodes the relation kind, which is a fact,
   and distance encodes nothing. Every edge carries its type as a word. **No policy→outcome edge
   is ever drawn**, because the corpus does not hold one: `affectsSeries` is deliberately narrow.
   This is the honest form of mock 01.
2. **Zoom transitions between real pages** — the drill hierarchy already exists as URLs. View
   Transitions between levels plus a persistent breadcrumb give infinite-zoom's *feel* while
   keeping every state citable, back-button-correct and accessible. This is the honest form of
   mock 04.
3. **"Related records", with stated reasons** — the Nodal discovery loop (seed → related →
   inspect → jump) as a list whose relatedness is a **fact**: shares a series, cites the same
   dispute, paired with, same domain and period. **Not a similarity score, not an embedding
   distance.** The Nodal deck's own demand for a "Why related?" panel on every position is the
   tell that position was the wrong encoding; a stated reason needs no explainer.

---

## 5. Share cards are part of the content model, not a later feature

Distribution via WhatsApp and social is an operator decision, so the shareable unit **is** a unit of
content. Design it before finalising charts. It ships inside the homepage and record-page
prototypes — not as a fourth prototype.

Every card carries: one claim or finding · enough visual context to prevent misreading · the time
period · the source name · a stable URL or record identifier · a **visible distinction between an
absence and a measured outcome.**

### 5a. Card wording inherits the corpus's absence vocabulary
Source presence alone does not prevent weaponisation. *"No data after 2019"* implies blame.

| Situation | Permitted wording |
|---|---|
| The publisher stopped | "The published series ends in 2019." |
| Nothing comparable exists after | "No comparable series was identified after 2019." |
| Retrieval failed, existence unknown | "Not located." — never "not published" |
| Held but not released | "Not published." — only with a stated search behind it |
| Never gathered | "Not collected." |
| Corrected | "This figure replaced an earlier one. Both are shown." |
| No independent check | "Measured only by the body that announced it." |

This is the `reasonKind` and stated-search rule reaching the surface. It is the corpus's
hardest-won distinction and the place it is most likely to be lost.

---

## 6. Visual language

**The rule: energy from motion and scale; credibility from palette and typography.**

- Warm off-white paper base, serif display, one restrained accent. One dark section for contrast,
  not a dark site.
- **Avoid the default AI look**: cream + high-contrast serif + terracotta/clay accent is what any
  brief produces. The accent should come from the subject — the violet of an Indian government
  stamp pad is one defensible choice, used only where a mark is made: seams, stops, corrections,
  disclosures.
- Type reads institutional rather than editorial-magazine. Display serif + a technical sans + a
  mono for figures, labels and sources.
- Energy comes from scroll choreography, charts that draw themselves, a year control that moves
  things together, and transitions that *explain relationships* rather than decorate.
- No gradient cards, no glassmorphism, no avatars, no KPI tiles.
- **Never symbol or colour alone.** ✓ / △ / ✕ / ? always carry a word.
- 3D/WebGL only where an extra spatial dimension genuinely represents something. It does not here.
- ⟳ **The palette reference is not settled by citation.** Rev1 cites `justus-john.com` as the warm
  off-white `#faf9f7` source; retrieved 2026-08-10 it reads as a dark portfolio. What transfers
  regardless is the **smoothness** the operator named — restrained scroll choreography, charts that
  draw themselves — which is a motion property, not a theme. Verify the palette visually before
  adopting a hex from memory; the instrument's existing light archival canvas plus the stamp-violet
  accent is the safer register either way.

---

## 7. Rejected, with reasons

| Direction | Why not |
|---|---|
| **Knowledge graph with causal edges** | Requires policy→outcome edges the corpus does not hold. Creating them = asserting causal claims = the thing declined twice. **The declared-edge diagram in §4d is the part that survives.** |
| **Nodal / semantic galaxy (embeddings + UMAP)** | Position would be a model's opinion about relatedness, rendered as primary navigation — a source that is not independent of what it establishes. **The discovery loop survives in §4d.3.** |
| **Infinite semantic zoom** | No URLs, no back button, unlinkable, inaccessible. A public instrument making claims about a government must be citable. **The transitions survive in §4d.2.** |
| **Data cube / analyst lab** | Wrong audience. Pivoting rows/columns/colour is one step from the composite score refused three times. |
| **Fintech / dashboard aesthetic** | Wrong register entirely. Every sample in `Dashboard style ideas.pdf` says *product*; this must say *record*. KPI tiles, gauges, avatars and gradient cards are named exclusions in §6. |
| **Any verdict tally on a public surface** | Collapses the positioning into the promise-tracker genre. |
| **Treemap sized by importance/performance** | Area must represent a defensible quantity. Coverage qualifies; importance does not. |
| ⟳ **AI query layer / natural-language answers** | *(New — present in mock 01 and in `Website Layout Recommendations.pdf` §6, and ruled on in neither rev.)* Two independent grounds. **Architecture:** the site is a static export with no server (CLAUDE.md), and a query compiler needs one — adding it is an architecture change, not a design decision. **Method:** free-prose answers over the corpus are the corpus restating itself, which the self-audit ruling refuses. **What is buildable and honest is ordinary structured search** — a build-time index over titles, ids, domains, lenses and terms, resolving to records. That ships; the model does not. |

---

## 8. Constraints carried from the corpus (non-negotiable)

1. **No composite scores.** Anywhere.
2. **Absences render unlike findings** (rule 4a) **and must reach a reader** (rule 4b). Both. They
   fail independently.
3. **Corrections keep their withdrawn wording**, visible.
4. **Rendering must never assert a distinction the corpus does not hold.** Precedents: the absence
   marker is dashed `--ink-dim` not `--alert`; no index-level absence count; the verdict chip
   gained a link but not a colour change.
5. **A caveat is never truncated** (rule 3a).
6. **Every claim carries its provenance.** Sources visible on charts, not in footnotes.
7. **If area, distance, colour or opacity has no defensible meaning, do not encode it.**
8. **Model output may not be cited by a scored record** and must render visibly unlike measured data.
9. **An absence claim states which kind it is** (§5a).
10. ⟳ **The gates bind the redesign.** *(New.)* `reachability`, `field-render-audit`,
    `listing-marks`, `link-check`, `domain-coverage` and the rest run on every commit and do not
    get relaxed for a visual change. A design that cannot keep a mark reachable is the wrong design.

---

## 9. ⟳ Prerequisites — MET

*(Replaces rev2's entire §9, which read **"Architecture stopping condition: NOT met. Six walks, five
found something off-queue. Fix and re-walk first."** and listed three open findings. All three are
closed; the wording is quoted here because a later reader must be able to check the change.)*

| rev2 finding | state |
|---|---|
| `resolvePairSide` returns `hostId` with no layer; 16 anchors 404 live | **CLOSED** `69cd1b1`. Route carried on the resolved side; `tools/link-check.mjs` added to the build — 21,522 hrefs, 0 dead. |
| Three `awaiting-adjudication` notes open with the verdict they withdraw | **CLOSED** `69cd1b1`. Reordered onto L-0151's pattern; no verdict moved. |
| Eleven of sixty pairs render nowhere; `field-render-audit` covers three layers, pairs are the fourth | **CLOSED** `69cd1b1`. All eleven render; the audit covers four layers, 0 invisible. |

**Two further items were found and closed after rev2 was written:** A-4 (rule 4b implemented on
ledger rows and no series row — closed by `RecordMarks` + `tools/listing-marks.mjs`, 2,217 rows /
3,149 marks) and A-5 (`gen-derivations` outside the build). **Walk 9 ran on 2026-08-10, found one
phase-0 defect, fixed it, and architecture was closed** (`d7c79c2`), with the reopening condition
stated: any future off-queue walk find reopens it.

**The required prerequisite batch is done:** `drops/phase-17-design-lock/SERIES-INVENTORY-2026-08-08.md`.

**Still open, and none blocks design:** seam-span's measured deferral · the pairs non-prose debt in
`field-render-audit` · the quotation-identity gap in `withdrawn-wording` · environment's 0%
series-caveat rate, which is **research, not design**.

**Design-queue items this phase inherits:** thirteen nav destinations (§10a) · caveats rendering in
full inside table cells across six surfaces, now also measured on grid cards at 746 cards / 466 over
300 characters (§11.1 solves it).

---

## 10. Undecided

- **The site's name.** "India, Explained" promises explanation; this promises something narrower and
  more honest — closer to *what the record shows*. Decide before the homepage's first line ships.
- ⟳ **The `worked`/`failed` vocabulary on a public surface.** *(New.)* The corpus's enum labels are
  internal register. A naive reader meeting "No stated objective" needs a plain-language equivalent
  that asserts no more than the value does. Solve on the record prototype; do not invent a new axis.

### 10a. ⟳ Navigation — thirteen destinations resolve into four plus a utility group
*(New. Rev2 listed this as an open design-queue item without a proposal.)* Per the UX Foundation
deck's model, and enabled by the one-site decision:

**Primary:** Overview · Explore · Stories · Search.
**Utility group "Evidence":** series · ledger · provenance · unmeasured · contested · exposure ·
peers · terms · lenses · domains · method · derivations · counterfactual.

Nothing is removed. The register splits: the public path is four doors wide, and the instrument
remains one click behind a named group — which is also where the §4b control lands.

---

## 11. Three prototypes

Built in the app, on a branch, against real `/data` (§1).

1. **Record page** — *what changed → expected → observed → limits*, plus the §4b control and the
   §4d.1 connections diagram. **The most important of the three**: it tests whether the corpus can
   become understandable without becoming reductive. Range-tested on L-0011 (multi-objective
   `failed`), L-0151 (`worked`), L-0224 (`contested`), L-0001 (`baseline-context`, no note).
2. **Homepage** — per §3a order, charts from §3b only, one generated share card.
3. **One scroll story** — one subject, one genuinely necessary scroll-controlled passage, ordinary
   readable HTML around it, a reduced-motion version, inline sources and gaps, a mobile performance
   budget, timeline state in the URL.

**Postponed until these prove the grammar:** the full atlas and the full Time surface.

### 11a. ⟳ Story subject: EDUCATION
*(Replaces rev2's selection. **The withdrawn wording, quoted:** *"These are not in tension for
renewables, which carries the March 2019 reclassification, the imputed-versus-metered seam at
FY2014-15, the capacity-versus-generation trap and the Bhutan-import population mismatch — **the
richest uncertainty material in the corpus**, and low-temperature."*)*

**The claim was measured and does not hold.** From the series inventory and a domain measurement
taken 2026-08-08:

| | education | environment |
|---|---|---|
| series caveats | **49 of 54 (91%)** | **0 of 15 (0%)** |
| series absence declarations | 45 | **0** |
| declared seams | 67 | 4 |
| provenance records affecting | 14, of which 12 unbridged, 12 with competing accounts | 7, of which 5 unbridged, 3 with competing accounts |
| contested verdicts | 9 of 21 | 2 of 14 |
| India points / verified | 366 / 309 (84%) | 115 / 92 (80%) |

**Environment is the only domain in the corpus at a 0% series-caveat rate**, against a corpus rate
of 128 of 269. Its four traps are real and they live in seven provenance records, not in the series
a story would chart. **Education is richest by every count available**, and it is the one domain
strong on both evidence and lived salience — a parent meets it directly.

Rev2's own criterion selects it: *"the subject must genuinely exercise the uncertainty system."*

**The story:** the divergence between ASER (household survey, T4) and NAS/PARAKH (government
school-based assessment) on whether children can read — two instruments, different populations,
different directions, a 2021 gap in one of them, and a ministry that framed the same ASER round two
ways six months apart. Data: `aser-std3-reading` (3 seams, 601-char caveat), `nas-parakh-grade3-*`,
`parakh-grade3-proficient-language`, P-59 / P-60 / P-61, L-0092.

**Renewables is not discarded** — it is the second story, and its four documented traps make it a
strong one. It is not the first.

---

## 12. ⟳ Acceptance

*(New. Neither rev said how a prototype is judged done.)*

A prototype is accepted when **all** hold:

1. Every gate green through `npm run commit`.
2. At 360–390 px: no horizontal overflow outside a scroll wrapper; no hover-only disclosure; every
   provenance path reachable by tap; the §4b control operable by keyboard with `aria-expanded`.
3. Every caveat renders in full — no clamp, no ellipsis, no max-height (rule 3a).
4. Every absence on the surface uses §5a wording and is visually unlike a finding (rules 4a/4b).
5. No composite, no tally, no count presented as a score.
6. Every figure traceable to source and tier in one control.
7. `prefers-reduced-motion` honoured on every animation.
8. Verified on the production deploy, not only locally.
