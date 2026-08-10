# Design phase — scope and direction

**Status:** written before the phase opens. Operator decisions recorded, research findings
recorded, direction recommended. Not yet written into the repo.

**Prerequisite:** the architecture stopping condition is NOT met. Six walks, five found
something off-queue. Three findings are open and unfixed (see §9). Design opens against a
stable surface set, not on a schedule.

---

## 1. Operator decisions (settled)

| Decision | Value |
|---|---|
| **Positioning** | *"Here's what we can actually know about how India changed."* Not "here's how India changed." |
| **Audience** | Indian general public. Naive users. Young. Shared on WhatsApp and social. Not journalists, not researchers. |
| **Language** | English only. |
| **Platform** | Desktop first. Mobile later — but only pick directions that degrade to mobile rather than requiring a rebuild. |
| **Authorship** | Anonymous. No byline. |
| **Verdict tally** | Never on a public surface. No "1 of 223." No scoreboard, no composite score. |

### Consequences of anonymity
Credibility must come entirely from the evidence chain, because it cannot come from a name.
Every chart carries its source visibly. The method page keeps its existing statements —
including that gates enforce consistency and not correctness, and that nothing has been
checked by anyone who did not write it. The provenance work must be *visible*, not merely
*available*.

---

## 2. Research findings that shape the direction

### 2a. The promise-tracker genre is a trap — do not enter it

Every existing promise tracker takes the same form: a meter with a tally.
PolitiFact's Trump-O-Meter and Biden promise tracker; the UK Institute for Government's
progress analyses; Nepal's Pratikapaksha (launched with a countdown of days left in the
government's term, plus planned upvoting/downvoting); Kenya's Mzalendo; Slovenia's
"Promise Made = Debt Unpaid"; dozens more in the civic-tech directory.

**This corpus refuses that form.** One `worked` record in 223, no composite score, and a
standing ruling that verdicts do not aggregate. Building the standard shape would make the
instrument look like a broken version of a familiar thing. It is not a scorecard. It is a
record of what can and cannot be known.

### 2b. The gap nobody has filled — and it is this corpus's exact material

Across 612 visualizations from 121 articles by leading data-journalism outlets, 449
presented data intended for inference and **only 14 — three per cent — showed uncertainty
visually at all.** (Hullman, *Why Authors Don't Visualize Uncertainty*.)

Research on *how* to show missing data is unusually clear. A study comparing three
treatments — missing encoded as zero, missing simply omitted, and missing omitted with an
icon supplying the reason — found that **users often do not notice missing data when it is
replaced by a default value**, and that **participants preferred the version that supplied a
reason.** (Eaton et al., the "coded display"; see also Andreasson & Riveiro,
"emptiness plus explanation".)

The corpus holds **374 declared absences, each with a stated reason**, 127 provenance
records, and declared basis seams. That is the material 97% of data journalism does not
have, and the empirically preferred treatment is the one this corpus was built for.

**This is the site.** Not "did they keep their promises." *Here is what India's own numbers
say, and here is exactly where they stop saying anything.*

### 2c. Scrollytelling discipline

Use scrollytelling where the sequence itself helps the reader understand causality,
chronology or scale — not as the default page structure. Identify the one moment in a
narrative that genuinely deserves the treatment and do that rigorously; the rest goes in a
conventional reading flow. Heavy scroll pages harm load time and lock readers into a tunnel
with no exit points. Respect `prefers-reduced-motion`. Serve text as readable HTML, not
JS-generated content.

---

## 3. The failure mode to design against

**Nihilism.** If every chart breaks and every verdict is contested, a naive reader concludes
the site knows nothing and leaves. **A gap is only interesting against a background of
things that are solidly known.**

So the structure inverts: **lead with what IS well measured.** Electricity access, road
length, rail electrification, renewables capacity, coal production, enrolment — real,
government-published, whole-period, and they chart beautifully. Show them plainly and
confidently.

Then the gaps land as findings rather than as a posture. A reader who has just seen six
clean series and then meets one that stops in 2019 understands instantly that the stop
*means something*.

**Rough rule:** the majority of what a reader sees is things India does measure. The
minority — but the memorable minority — is where it does not.

### Tone
Counterintuitive but important: **a site about uncertainty must not sound uncertain.**
State plainly what is known, plainly what is not, and never sound apologetic about either.
Hedged prose plus visible gaps reads as weakness. Flat declarative prose plus visible gaps
reads as rigour.

---

## 4. The three design ideas

### 4a. The broken line is the signature visual
Every chart renders its gaps as gaps, its basis seams as visible breaks, and **each break
carries its reason inline — printed, not in a tooltip.** A wall of honest charts where the
interesting part is where they stop.

Nobody else does this. It is also unfakeable: a competitor can copy the layout, not the 374
reasons.

The shareable unit writes itself — a chart that runs from 2014 and simply ends, with one
line of text: *nobody published this after 2019.*

### 4b. "How do we know?" as a gesture, not a page
Every number on the site — headline figure, chart point, verdict — can be pulled open **in
place** to reveal the layer beneath it: source, tier, whether anyone independent measured it,
what was corrected and what the correction withdrew.

Same gesture everywhere, from homepage to deepest record. Better than a mode toggle because
it **teaches the site's thesis through muscle memory**: after three pulls a reader
understands that every number here has something underneath, and that some numbers have
nothing underneath — which is the entire point.

This subsumes the "X-ray mode" concept from the earlier research, in a better form.

### 4c. Coverage as the opening image, not verdicts
Fourteen domains sized by **how much of each is actually measurable.** Defence 0 of 10
scored. Kashmir 2 of 46. Governance 6% of 110 declaring an exposure. Infrastructure ~58%.

Coverage is a **defensible quantity** — unlike "importance," which must never be encoded as
area. It is visually striking and it is the corpus's most original finding.

**Framing constraint:** `reform` share predicts the evaluative rate at ρ=0.91, so this is
largely a fact about what those domains *contain* (announced measures vs. institutional
episodes), not about reticence in scoring them. The framing must say so, or the image reads
as a political accusation it does not support.

---

## 5. Visual language

The tension: visual energy for a young audience vs. credibility for the subject. Dark neon
dashboards read as crypto product; warm editorial reads as static.

**The rule: energy from motion and scale; credibility from palette and typography.**

- Warm off-white paper base (reference: justus-john.com, `#faf9f7`), serif headlines, one
  restrained accent. One dark section for contrast, not a dark site.
- Energy comes from scroll choreography, charts that draw themselves, numbers that count up,
  a year control that moves everything at once, transitions that *explain relationships*
  rather than decorate.
- Generous whitespace, strong section rhythm, deliberately limited density above the fold.
- No gradient cards, no glassmorphism, no avatars, no KPI tiles. Those say *product*; this
  must say *record*.
- 3D/WebGL only where an extra spatial dimension genuinely represents something. It does not
  here.

---

## 6. Surface set

| Surface | Role |
|---|---|
| **Home** | One line stating what the site is. The coverage image. Six to eight large clean charts of well-measured things, each with a plain takeaway and a visible source. Then one that stops, with its reason printed. Entry points by topic and by year. **No counts, no scoreboard.** |
| **Explore / domain** | Visual chapters, not dataset lists: the big picture in five charts, then what changed by period, then the events, then "view everything." |
| **Time** | A persistent year control that updates charts, events and annotations together. The single most forwardable interaction available, and honest. |
| **Stories** | Scroll-driven, one idea per screen. Four or five flagship subjects only — not the default page structure. |
| **Record** | The Policy Debugger layout: promised → what happened → what could not be checked. ✓ / △ / ✕ / **?** vocabulary. Software metaphor and the word "debug" stripped out. Maps directly onto `objectives[]` with `grounds` and `measurement`, `unmeasured[]`, and `shockExposure` with role=confound. **No summary score at the bottom.** |
| **Evidence layer** | Reached by the pull gesture (§4b) from anywhere. |

---

## 7. Rejected, with reasons

| Direction | Why not |
|---|---|
| **Knowledge graph / Causal Explorer** | Requires policy→outcome edges the corpus does not hold. `affectsSeries` is deliberately narrow ("series this record is *specifically about*, NOT everything it bears on"). Creating causal edges = asserting causal claims = the thing declined twice (counterfactual engine; "a source is not independent of what it establishes when it *is* what it establishes"). |
| **Nodal / semantic galaxy (embeddings + UMAP)** | Position would be a model's opinion about relatedness, rendered as primary navigation. Same ruling. The concept's own demand for a "Why related?" panel is the tell — if every position needs an explanation, position is the wrong primary encoding. |
| **Infinite semantic zoom** | No URLs, no back button, unlinkable, inaccessible. A public instrument making claims about a government must be citable. Keep the drill-down *sequence*; implement as ordinary pages. |
| **Data cube / analyst lab** | Wrong audience. Pivoting rows/columns/colour is one step from the composite score refused three times. |
| **Fintech dashboard aesthetic** | Wrong register entirely. |
| **Any verdict tally on a public surface** | Collapses the positioning into the promise-tracker genre. |
| **Treemap sized by importance/performance** | Area must represent a defensible quantity. Coverage qualifies; importance does not. |

---

## 8. Constraints carried from the corpus (non-negotiable)

These were earned across fifteen phases and a structural cycle. A narrative surface that
buries them turns the instrument into advocacy, and credibility is the whole product.

1. **No composite scores.** Anywhere.
2. **Absences render unlike findings** (rule 4a) **and must reach a reader** (rule 4b).
   Both. They fail independently.
3. **Corrections keep their withdrawn wording**, visible.
4. **Rendering must never assert a distinction the corpus does not hold.** Precedents: the
   absence marker is dashed `--ink-dim` not `--alert` (a caveat is a blocking qualification,
   an absence is a finding); no index-level absence count (it would read as a completeness
   score); the verdict chip gained a link but not a colour change (records with and without a
   note must not look different in kind).
5. **A caveat is never truncated** (rule 3a). The design queue item about caveats rendering
   in full inside table cells must be solved without relaxing this.
6. **Every claim carries its provenance.** Sources visible on charts, not in footnotes.
7. **If area, distance, colour or opacity has no defensible meaning, do not encode it.**
8. **Model/engine output may not be cited by a scored record** and must render visibly
   unlike measured data.

---

## 9. Open before design opens

**Architecture stopping condition: NOT met.** Six walks, five found something off-queue.
Fix and re-walk first. Open findings at last check:

1. `resolvePairSide` returns `hostId` with no layer; `CoverageUsageView.tsx:58` hardcodes
   `/series/${hostId}/`. 22 pair sides declare a ledger host, 16 emit the anchor, **all 16
   404 live.** `/unmeasured` solves the same either-layer problem correctly.
2. Three `awaiting-adjudication` notes open with the verdict they withdraw (L-0086, L-0127,
   L-0134). 3 of 17; 14 lead with the correction; L-0151 is the control.
   `withdrawn-wording` binds presence, not position, and passes correctly.
3. **Eleven of sixty pairs render nowhere and `lib/data.ts` says two.** `field-render-audit`
   reports three layers; **pairs are the fourth and outside its scope by construction** —
   sixth instance of a guard whose scope and its claim's scope differ, and the first found on
   a whole layer rather than a field.

**Also open (design queue):** thirteen nav destinations (accretion — a design problem, not an
architecture one); caveats rendering in full inside table cells across six surfaces.

**Cheap prerequisite batch:** report the 269 series by domain with their spans, so the
homepage's charts are chosen from what exists rather than from what would be nice. The test:
*would a normal person notice this in their life?*

---

## 10. Undecided

- **The site's name.** "India, Explained" promises explanation; this promises something
  narrower and more honest — closer to *what the record shows*. Decide before design; it
  shapes the homepage's first line.
- **Share cards.** If distribution is WhatsApp and social, every chart and finding may need
  to be a shareable image with number, source and URL burned in. That is the growth mechanic
  *and* a defence, since a card carrying its own source is harder to strip of context.
  Not scoped. Decide whether it is in this phase.
- **Story subjects.** Pick visually strong, politically low-temperature material for the
  first scroll story — rail electrification or renewables, not demonetisation.

---

## 11. Three prototypes

Per the earlier UX foundation, and unchanged by the research:

1. **Homepage** — proves positioning and the visual language.
2. **One scroll story** — proves the chart / annotation / scroll format.
3. **One record page** — proves the debugger layout plus the pull gesture.

Do not design all fourteen domains. Three surfaces validate almost the entire interaction
system.
