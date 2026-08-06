# The adversarial-review and rulings cycle. State. CLOSED 2026-08-06.

**Start a cold read here.** This cycle sits between phase 15 (environment and energy, closed
2026-08-05) and phase 16. It authored no records. It changed what a record has to prove, applied
that to every record at once, and removed three records that could not meet it.

**If you read one thing: [`docs/the-pass-2026-08-06.md`](../../docs/the-pass-2026-08-06.md).** It is
the reader-facing account of the change and the list of every record that moved.

---

## The one-line spine

**Nine records said a measure worked. One does.** Not because the government did less than it was
credited with, but because the instrument was accepting the announcing body's own account of its own
performance as evidence that the performance happened.

---

## What the two review rounds found

Four external adversarial reviews, two rounds of two, by non-Claude frontier models given the corpus
as flat extracts with no repository, no `CLAUDE.md` and no second turn. All four are committed
verbatim in `review/returned/`. **Standing convention: external reviews land in `review/returned/`
and nowhere else, are never rebutted in the file, and are triaged against the commit they describe
(`059912b`), never against HEAD.**

### Confirmed, and acted on

| Finding | What it was | Outcome |
|---|---|---|
| **The `worked` sourcing asymmetry** | Success verdicts rested on 1–2 official releases; `worked` carried the lowest citation count in the corpus | **The governing principle, R1 and R1a.** Nine records rescored to one. |
| **`worked` awarded on a partly-met objective** | L-0026 announced two objectives and one was not established | **R2.** Appeared in all four reports, both families, both rounds — the most convergent finding in the set, and the brief had omitted it. |
| **The source ladder was not being followed** | Journalism, multilateral and foreign-primary citations tagged T1 | **R4 and the re-tiering.** T1 965 → 928. |
| **Self-citation** | Three records cited a private repository returning 404 | **The self-audit ruling.** Records removed; findings published at `/derivations`. |
| **`no-objective` meaning two things** | An undated but quotable promise filed as having no objective | **R3, `undated-commitment`.** |
| **`/method` desync** | The page said `overstates-pre-2014` was unattested; P-122 used it | Confirmed on all three instances. |

### Artefact — reviewer findings that did not survive measurement

- **`awaiting-adjudication` inconsistently assigned.** Half artefact: the records named already carry
  the value and a RESCORED marker; the reviewers were reading a pre-fix extract.
- **`too-early` on measures not in force.** Real as a definitional strain, but the extract had been
  cut such that the records' own reasoning was invisible.
- **The statutory double standard.** Named by both Gemini reports and by neither ChatGPT report — so
  **not cross-family convergent**, which the first brief had wrongly claimed. Open, not confirmed.
- **`not-published` at scale.** The reviewers' count came from an extract that stripped the search
  language; the corpus's own C.5 rule was already being applied unevenly, which is a real but
  smaller finding.

### My own errors inside the cycle, since they bear on how the reviews were read

- **Batch 7 called pass A's L-0026 finding "defeated"** because the note explains the choice.
  Overturned in batch 9: *a record that explains why it departs from the definition has documented a
  departure, not authorised one.*
- **Batch 9 triaged pass B as one review.** The second file was `.docx`, not `.doc`. Corrected in
  batch 12; the convention above exists because of it.
- **Batch 10 claimed `source-response-check` had found the MEA JavaScript shell.** It had not — MEA
  returned HTTP 200 at 78 KB, unflagged. Withdrawn in batch 11.
- **The extract generator manufactured a review finding** by cutting 87 per cent of `assessmentNote`
  and the correction marker from 49 of 173 records.

---

## The five rulings

All 2026-08-06, all in `CLAUDE.md`, the `assessment` definition in `schemas/ledger.schema.json` and
the `Assessment` doc comment in `lib/types.ts`.

> **The governing principle: no record or claim stands on a source that is not credibly independent
> of what it establishes.**

It asks a different question from the ladder. **The ladder grades the artefact; this grades the
relationship between the artefact and the claim it is made to carry.**

1. **R1** — `worked` requires evidence independent of the announcing body. **Where none exists the
   record is not `failed`** — unestablished is not negative, so `partly` or `contested`.
2. **R1a** — intra-state evidence qualifies **where the measuring institution published the figure as
   part of its own statutory or routine function**, and fails where it appears in support of the
   claim. The test is on the publication, not the institution. The source must bear on the limb in
   dispute and the document must be **held**.
3. **R2** — an unmeasured limb prevents `worked`. Governs the class. No centrepiece exception.
4. **R3** — `undated-commitment`: stated, quantified, no deadline, cannot fall due. **Progress is
   reportable even though it can never become overdue.**
5. **R4** — `T1F`: a foreign national government primary. A letter, not a number, because the
   ladder's numbers descend in strength and a foreign gazette is not weaker than a contested index.

And the rule the pass itself earned: **every rule is evaluated against one snapshot and the corpus is
written once**, because the qualifying sources for three records were the same citations another rule
was re-tiering, and serial application would have let the order decide three verdicts.

---

## The pass

`tools/pass-2026-08-06.mjs`, one read, one write. Full account in
[`docs/the-pass-2026-08-06.md`](../../docs/the-pass-2026-08-06.md).

- **Verdicts:** L-0151 survives. L-0023 fails R1a outright. L-0052 passes R1a cleanly and falls on
  R2. L-0026, L-0029, L-0047, L-0053, L-0207 → `partly`. L-0014 → `contested`. **None to `failed`.**
- **Searches ran first, so records were scored on evidence rather than its absence.** Bhutan's MoENR
  (T1F) for L-0207; CAG Report No. 6 of 2024 for L-0047, which finds the target missed every year of
  2017-22; World Bank/S&P CPPI 2025 for L-0053, which supports the record. **One search cut against
  the record and one for it.**
- **Tiers:** A 10 → T4, B 4 → T2, D 19 → T1F, E stays T1, C gone with its records. **T1 965 → 928.**
- **Ledger 226 → 223. Corpus 682 → 679.**
- **Backfill:** 23 withdrawn wordings recovered from git; 34 fields exempted because the field did
  not exist before the correction; `tools/withdrawn-wording.mjs` now gates it.

---

## OPEN — what phase 16 inherits

| # | Item | State |
|---|---|---|
| 1 | **The RBI *Financial Stability Report* is not held.** Six routes named on each dependent series; `rbidocs.rbi.org.in` refuses the TLS handshake from this environment. | Blocks R1a passing for L-0026 and L-0029 on one limb. **Not "not published" — not retrieved by this client.** |
| 2 | **L-0219's 139 unaddressable and L-0218's three channels** assert results of a live sweep that stores nothing. | Findings survive at `/derivations` §3. **Fix: have `source-response-check.mjs` write a dated result file into the corpus.** Data change, not schema. |
| 3 | **`undated-commitment` has one member.** L-0209 moved. L-0213, L-0187 and L-0210 were tested and do **not** qualify — see below. | Re-test if any of the three acquires a quantity. |
| 4 | **Seam-span triage** — `seam-span-report` emits 125 spans / 34 undeclared. | Untouched this cycle. |
| 5 | **Arc B's one capability** (phase 15 deferral). | Untouched. |
| 6 | **The source cache** — three costed options, none chosen. | Untouched. |
| 7 | **Selection bias in the review extracts.** 73 of 226 records were shown, chosen under criteria two of which carry a judgement threshold. | Logged. The reviewers said they could not tell whether the selection overstates or understates prevalence, and neither can the instrument. |
| 8 | **A self-audit layer.** See below. | **Open design question, not a closed decision.** |
| 9 | **The independent review has not been run** in the form `/method` specifies — domain economist, media lawyer. | Standing. The four adversarial passes are not those. |

### Why the three `undated-commitment` candidates did not move

Decided against the definition's own words — *stated and quantified, no deadline*.

- **L-0213 (IMEC)** — the record's own text: *"At signature, a description rather than a target."*
  The only quantified figures are benefit claims made nineteen months later (costs down *up to* 30
  per cent), which are not commitments and carry no floor. **Not quantified. Stays `no-objective`.**
- **L-0187 (US forced-labour tier)** — the criterion is a **United States** determination, and no
  Indian announcement of India's own prohibition has been retrieved. Scoring it would infer an
  objective from a foreign agency's account. **Not an Indian commitment. Stays `no-objective`.**
- **L-0210 (Free Movement Regime)** — stated and undated, and **binary rather than quantified**;
  there is no total to measure progress against. **Stays `no-objective`.**

**L-0209 moved and carries progress**, which is what the value exists to make possible: 30 km of the
stated 1,643 km, given in Parliament on 12 March 2026 — 1.8 per cent, twenty-five months after the
announcement, and the commitment still cannot fall due. The figure is **relayed and T4**, because the
Ministry publishes no kilometres-fenced series, which is this record's standing finding.

---

## The self-audit departure — a cold read needs this, and it is not settled

**Three records left the ledger on a rule about independence, not on their merits.** L-0218, L-0219
and L-0220 were not found wrong. Nothing in the pass disputes what they established. They were
removed because a derivation over the corpus's own `/data` is at no distance from the event it
reports, and a source is not independent of what it establishes when it **is** what it establishes.

**Their findings are published where the corpus's own structure cannot reach them.** `/derivations`
carries the arithmetic and prints the rule beside every number — which is *more* checkable than the
records were, since those cited a private repository returning 404. But the page is not a record: it
has no verdict, no `caseFor` and `caseAgainst`, no declared absences, no caveat, no revisit trigger,
and no place in any cross-tab. Section 5 of that page states this explicitly rather than leaving it
to be noticed. **A reader comparing the corpus over time sees three ledger records disappear and
none of them was withdrawn on its merits.**

**The open question: is a self-audit layer, distinct from the scored ledger, worth building?** The
instrument already has four layers with different obligations. A fifth — findings about the corpus,
carrying reasoning and absences and triggers but no verdict and no tier — would let a self-audit keep
the structure that makes a finding auditable without pretending to an independence it cannot have.
**Against it:** a layer with one occupant class is over-engineering, `/derivations` may be enough,
and every layer added is a schema, a view, a set of gate obligations and a render assertion. **The
test proposed for any future record, and the thing to decide the layer question against: would
anything outside this corpus have to change for the finding to change?** If nothing would, it is
method. Whether method deserves the apparatus of a record is undecided.

---

## Phase 16 opens against

- **The corpus as it stands:** 679 records — 223 ledger, 127 provenance, 269 series, 60 pairs. One
  `worked`. 1,201 citations, T1 928, T1F 19, T2 84, T3 28, T4 134, T5 8.
- **The rulings as method,** not as a pending decision. The five above govern authoring from now on:
  a new `worked` verdict must name its independent source and say which of the three degrees of
  independence it has; a multi-objective commitment with any unmeasured limb is `partly` on sight;
  a quantified undated promise takes `undated-commitment` and reports progress.
- **The guards as they exist,** ten in the build: `validate`, `enum-parity`, `no-bare-root`,
  `no-unguarded-prose-field`, **`withdrawn-wording`** (new this batch), `figure-consistency`,
  `manifest`, `reachability`, `field-render-audit`, `domain-coverage` — plus `validate:selftest` and
  `typecheck` in `npm run commit`. Every one is silent on success, emits its own scope, and refuses a
  stale build.

**No open items beyond the nine listed.** Phase 15 closed with none of its own; this cycle adds items
1, 2, 3 and 8, and carries 4, 5, 6, 7 and 9 forward unchanged.
