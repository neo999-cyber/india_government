# Design phase — scope and direction

**Revision 2.** Supersedes revision 1 (kept as `DESIGN-PHASE-SCOPE-rev1.md`). Changes are
marked ⟳ with the wording they replaced, per the corpus's own correction convention.

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
| **Platform** | ⟳ **Mobile is the acceptance constraint.** Build desktop-first if preferred, but no core idea is approved until it works at ~360–390 px without hover, without WebGL, without tiny annotations, and without provenance hidden behind a pointer. *(Replaces: "Desktop first, mobile later — pick directions that degrade rather than requiring a rebuild." Insufficient: distribution is WhatsApp, which in India is overwhelmingly phones, and mobile changes chart density, annotation placement, interaction discovery, source disclosure, scroll pacing and performance budget — not just width.)* |
| **Authorship** | Anonymous. No byline. |
| **Verdict tally** | Never on a public surface. No "1 of 223." No scoreboard, no composite score. |
| **Vocabulary** | ⟳ **These are records, not promises.** Most of the 223 are episodes, institutional practice or statutory duties — AFSPA sanction refusals are not a pledge. Calling them promises re-enters the tracker genre by vocabulary alone, whatever the layout does. |

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

So the structure inverts: **lead with what IS well measured.** Electricity capacity, road
length, rail electrification, renewables capacity, coal production, support prices — real,
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

### ⟳ 3a. Homepage order — this rule governs §4c
Revision 1 said "coverage as the opening image" in §4c while §3 said lead with what is well
measured. **Those contradicted each other, and §3 wins.** The order is:

1. The positioning line.
2. One strongly measured change, told well.
3. Several more recognisable, well-measured changes.
4. A deliberate transition into a series that breaks or stops.
5. The reason attached to that break, printed.
6. Only then, the cross-record evaluability view — with the framing in §4c.

The evaluability view belongs *in* the argument, not above it.

---

## 4. The three design ideas

### 4a. The broken line is the signature visual
Every chart renders its gaps as gaps, its basis seams as visible breaks, and **each break
carries its reason inline — printed, not in a tooltip.** A wall of honest charts where the
interesting part is where they stop.

Nobody else does this. It is also unfakeable: a competitor can copy the layout, not the 374
reasons.

The shareable unit writes itself — a chart that runs from 2014 and simply ends, with one
line naming what was searched and what came back. Wording rule in §5a.

### 4b. "How do we know?" as a control, not a page
Every number on the site — headline figure, chart point, verdict — opens **in place** to
reveal the layer beneath it: source, tier, whether anyone independent measured it, what was
corrected and what the correction withdrew.

The same control everywhere, from homepage to deepest record. Better than a mode toggle
because it **teaches the site's thesis through repetition**: after three uses a reader
understands that every number here has something underneath, and that some numbers have
nothing underneath — which is the entire point.

⟳ **It must be an explicit, labelled, keyboard-operable control** carrying `aria-expanded` —
not a hover, not a drag, not a gesture a reader has to discover. *(Revision 1 called it "a
gesture, not a page" and described pulling a number open.)* On a phone there is no hover and
no drag affordance, and a disclosure nobody finds is the §8.2 defect exactly: a thing that
renders correctly and reaches nobody.

This subsumes the "X-ray mode" concept from the earlier research, in a better form.

### 4c. ⟳ Evaluability — framed narrowly, and NOT the opening image
*(Replaces: "Coverage as the opening image, not verdicts." Two corrections — position, and
what the chart is permitted to claim.)*

Domains shown by how much of each **within this record set** carries a stated, quantified
objective that outcomes can be checked against.

**Position:** late in the page, per §3a.

**The denominator problem, which is more serious than a label fix.** The denominator is this
corpus's own selection, and **selection bias is a logged open item that no internal audit can
reach** — nobody has established which government claims were never entered. A chart implying
*"this is how much of Indian policy is measurable"* makes a claim about the world from a
sample of unknown construction.

Permitted wording is strictly about the record set:
*"Where outcome evaluation was possible"* · *"Records with evaluable outcomes"* ·
*"What this record set can establish"*.

**Forbidden wording:** *"how much is measurable"*, *"some parts of Indian policy can be
measured"*, or anything else asserting a property of Indian policy rather than of these
records. **If a framing satisfying this cannot be found, the view does not ship.**

**Framing constraint that still applies:** `reform` share predicts the evaluable rate at
ρ = 0.91, so the low bars are largely a fact about what those areas *contain* — announced
programmes vs. institutional episodes and constitutional duty — not about reticence in
scoring them. Employment and human development are the measured exceptions and should be
named as such.

**If 4c cannot ship,** the homepage loses one of three ideas and needs a replacement in that
slot. The strongest candidate is the **corrections surface** — a record that shows what it
used to say, with the withdrawn wording visible. Nothing else about Indian policy does this,
it is unfakeable, and it carries no denominator problem at all.

---

## 5. ⟳ Share cards are part of the content model, not a later feature

*(Replaces: listed under §10 "Undecided".)* Distribution via WhatsApp and social is already
an operator decision, so the shareable unit **is** a unit of content. Design it before
finalising charts. It ships inside the homepage and record-page prototypes — not as a fourth
prototype.

Every card carries: one claim or finding · enough visual context to prevent misreading ·
the time period · the source name · a stable URL or record identifier · a **visible
distinction between an absence and a measured outcome.**

### 5a. Card wording inherits the corpus's absence vocabulary
Source presence alone does not prevent weaponisation. *"No data after 2019"* implies blame.
The wording must distinguish, using distinctions the corpus already holds and has corrected
itself on three separate times:

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

The tension: visual energy for a young audience vs. credibility for the subject. Dark neon
dashboards read as crypto product; warm editorial reads as static.

**The rule: energy from motion and scale; credibility from palette and typography.**

- Warm off-white paper base, serif display, one restrained accent. One dark section for
  contrast, not a dark site.
- **Avoid the default AI look**: cream + high-contrast serif + terracotta/clay accent is
  what any brief produces. The accent should come from the subject — the violet of an Indian
  government stamp pad is one defensible choice, used only where a mark is made: seams,
  stops, corrections, disclosures.
- Type should read institutional rather than editorial-magazine. Display serif + a technical
  sans + a mono for figures, labels and sources.
- Energy comes from scroll choreography, charts that draw themselves, a year control that
  moves things together, and transitions that *explain relationships* rather than decorate.
- No gradient cards, no glassmorphism, no avatars, no KPI tiles.
- ⟳ **Never symbol or colour alone.** ✓ / △ / ✕ / ? always carry a word. A red ✕ asserts a
  verdict the corpus frequently is not making, and colour-only encoding fails accessibility.
- 3D/WebGL only where an extra spatial dimension genuinely represents something. It does not
  here.

---

## 7. Surface set

| Surface | Role |
|---|---|
| **Home** | Per the §3a order. One line stating what the site is; five to seven recognisable, strongly measured changes; one deliberate transition into a broken or non-comparable series with its reason printed; search and topic entry; a restrained timeline preview; then §4c late in the page. One generated share card. **No verdict aggregates, no database counts, no evaluability scoreboard above the fold.** |
| **Explore / domain** | Visual chapters, not dataset lists: the big picture in five charts, then what changed by period, then the events, then "view everything." |
| **Time** | ⟳ Rules in §7a. Postponed as a full surface until the three prototypes prove the grammar; a preview appears on the homepage. |
| **Stories** | Scroll-driven, one idea per screen. Four or five flagship subjects only — not the default page structure. |
| **Record** | *What changed → expected → observed → limits.* ✓ / △ / ✕ / ? **with words**. Full caveats, untruncated. Confounds visibly separated from causal findings. The §4b control. Corrections with their withdrawn wording. Stable URL states. Share-card preview. **The most important prototype** — it tests whether the corpus can become understandable without becoming reductive. |
| **Evidence layer** | Reached by the §4b control from anywhere. |

### 7a. ⟳ The year control needs missing-period rules before prototyping
A control that silently substitutes the nearest available year is the *misleading display*
from §2b — users do not notice missing data replaced by a default. Series differ in
frequency, fiscal vs. calendar basis, span and declared seams; some are one-point series.

Each component must visibly enter **one of three labelled states**:

1. a value exists for the selected period;
2. nearest applicable period, **labelled as such**;
3. no comparable value, **with its reason** (§5a wording).

**Every selected state produces a stable URL.** Revision 1 rejected infinite zoom because a
public instrument making claims about a government must be citable, then failed to apply the
same rule to the year control. An un-citable state is not forwardable, which defeats the
reason for having it.

---

## 8. Constraints carried from the corpus (non-negotiable)

Earned across fifteen phases and a structural cycle. A narrative surface that buries them
turns the instrument into advocacy, and credibility is the whole product.

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
8. **Model output may not be cited by a scored record** and must render visibly unlike
   measured data.
9. ⟳ **An absence claim states which kind it is** (§5a). "Not published" and "not located"
   are different claims, and the corpus has corrected itself on this three times.

---

## 9. Open before design opens

**Architecture stopping condition: NOT met.** Six walks, five found something off-queue.
Fix and re-walk first. These are not cosmetic — a polished evidence interface built on
broken navigation and an audit that overstates its own coverage undermines the exact
credibility the design exists to establish.

1. `resolvePairSide` returns `hostId` with no layer; `CoverageUsageView.tsx:58` hardcodes
   `/series/${hostId}/`. 22 pair sides declare a ledger host, 16 emit the anchor, **all 16
   404 live.** `/unmeasured` solves the same either-layer problem correctly.
2. Three `awaiting-adjudication` notes open with the verdict they withdraw (L-0086, L-0127,
   L-0134) — the correction convention foregrounding the withdrawn claim. 3 of 17; 14 lead
   with the correction; L-0151 is the control. `withdrawn-wording` binds presence, not
   position, and passes correctly.
3. **Eleven of sixty pairs render nowhere and `lib/data.ts` says two.** `field-render-audit`
   reports three layers; **pairs are the fourth and outside its scope by construction** —
   the sixth instance of a guard whose scope and its claim's scope differ, and the first
   found on a whole layer rather than a field.

**Also open (design queue):** thirteen nav destinations (accretion — a design problem, not an
architecture one); caveats rendering in full inside table cells across six surfaces.

**Required prerequisite batch:** report the 269 series by domain with their spans, so
homepage subjects and the story subject are chosen from real corpus strength rather than an
aspirational list of popular topics. The test: *would a normal person notice this in their
life?*

---

## 10. Undecided

- **The site's name.** "India, Explained" promises explanation; this promises something
  narrower and more honest — closer to *what the record shows*. Decide before design; it
  shapes the homepage's first line. ("On the Record" is a placeholder used in the mock.)
- **Story subject.** Selection criteria in §11.

*(Share cards moved out of this section — see §5.)*

---

## 11. Three prototypes

1. **Homepage** — proves positioning and the visual language. Contents per §7.
2. **Record page** — proves the *what changed → expected → observed → limits* structure plus
   the §4b control. **The most important of the three.**
3. **One scroll story** — one subject, one genuinely necessary scroll-controlled passage,
   ordinary readable HTML around it, a reduced-motion version, inline sources and gaps, a
   mobile performance budget, timeline state in the URL.

**Postponed until these prove the grammar:** the full atlas and the full Time surface.

### Story subject selection
Choose after the series-by-domain inventory, on evidence of: continuous or meaningfully
interrupted data · clearly documented basis changes · recognisable public relevance ·
usable annotations · acceptable mobile chart performance.

⟳ **The subject must genuinely exercise the uncertainty system**, not merely be politically
low-temperature. These are not in tension for renewables, which carries the March 2019
reclassification, the imputed-versus-metered seam at FY2014-15, the capacity-versus-generation
trap and the Bhutan-import population mismatch — the richest uncertainty material in the
corpus, and low-temperature. Rail electrification is the alternative and now carries an
independent CAG finding of annual shortfalls in every year of 2017–22.

Do not design all fourteen domains. Three surfaces validate almost the entire interaction
system.
