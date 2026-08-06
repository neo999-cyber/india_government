# Phase 16 — scoping. Authors nothing. Written 2026-08-06 at `26927f4`.

---

## 1. What the repository actually says about phase 16

**The name "shocks calibration" appears nowhere in this repository.** Not in `CLAUDE.md`, not in any
`STATE.md`, not in `README.md`, not in `docs/`, not in `.claude/skills/phase/SKILL.md`. The string
`calibrat` occurs eleven times outside `out/` and `review/` and every one is substantive prose about
excise rates, a miscalibrated ceiling, or reviewer calibration — none is a phase name. **The word
`shock` does not occur in `CLAUDE.md` at all.**

**There is also no canonical phase list.** Phases are referred to by number in prose across
`CLAUDE.md`, the verification log and the drop files, but no file enumerates them. The `drops/`
directories are named by subject, not by number.

**Everything the repository says about phase 16 is this, and it is one paragraph** — `docs/verification-log.md`, lines 1009–1013, inside a section headed *Timing*:

> - **Phase 16 is the exception.** The counterfactual engine produces model output that
>   *resembles measurement*. It needs its own statistical review of the method **as it is
>   built**, not a general pass afterwards. And its rendering must be visually distinguishable
>   from measured data — **decide that before building, not after.**

Two adjacent statements bear on it and are the only others:

> **THE NEXT SESSION IS THE STRUCTURAL CYCLE. It is not phase 16 and it is not phase-15 leftovers.**
> — `drops/phase-environment-energy/STATE.md`, line 2099

> shock-attribution views come later.
> — `app/ledger/[id]/page.tsx`, line 203 (rendered on every ledger record page)

**So, plainly: the repository names phase 16 the counterfactual engine, and does not name it shocks
calibration.** I am not going to reconcile the two, and I am not going to infer a scope from the
name in the instruction. An inferred scope is the premise class that has cost this project the most
— it produced the 752-versus-965 sourcing claim, the reconstructed thirteen in the derivation
generator, and the finding that a `worked` verdict "rests on one T4 source" when the record also
resolved four T1 series. **The operator has to say which phase 16 is, or say that it is both.**

If it is the counterfactual engine, the repository already binds three things before any work
starts, and they are quoted above: a statistical review of the method *as it is built*; a rendering
decision made *before* building; and `CLAUDE.md` rule 8 — *"Counterfactual views show both methods
(UPA-trend extrapolation AND peer-index normalisation, 2014=100) and show endpoint sensitivity for
trend fits. No composite score of any kind, ever."* `/counterfactual/` currently states both methods
and computes nothing.

If it is shocks calibration, **there is nothing written to start from.** The corpus carries a
`shockExposure` prose field and a `type: shock` value with 8 members; neither has a stated method,
and `type`'s own definition is on the deferred-inconsistency list — *"`shock` covering both external
disruptions and domestic failures"* (`docs/phase-command-spec-v2.md`, and repeated in the phase
skill as one of three known-inconsistent axes that must not be resolved mid-phase).

---

## 2. What in the stated scope depends on the pre-pass corpus

**Nothing, because there is no stated scope.** That is the honest answer and it is worth stating
before the qualified one: a design that does not exist cannot have been calibrated against a corpus
that no longer exists.

For the one paragraph that does exist — the counterfactual engine — **none of it depends on the
pre-pass state.** It constrains method (two methods, endpoint sensitivity, no composite), review
timing, and rendering. Verdict distribution, tier distribution and ledger membership do not enter it.

**But three changes from the pass bear on a counterfactual engine and would be missed by anyone
resuming from a pre-pass note:**

1. **A counterfactual is a claim about what would have happened, and the pass just raised what a
   claim has to rest on.** The governing principle — *no record stands on a source not credibly
   independent of what it establishes* — and the verification log's warning that the engine produces
   *output resembling measurement* point at the same hazard from opposite sides. **Model output is
   not independent of the model.** Whether an engine output may be cited by a scored record is
   unanswered, and it is the same question the self-audit ruling answered for derivations.
2. **`type: shock` has 8 members out of 223 (3.6 per cent), and its definition is known-inconsistent.**
   Any shock-calibration work meets that inconsistency in its first hour, and the standing rule is
   that a deferred taxonomy is not resolved mid-phase — `differentFacts` reached seventeen records
   because one was.
3. **The evaluative base is much smaller than it was.** 57 of 223 records now carry an evaluative
   verdict (`worked`/`partly`/`failed`/`reversed`); before the pass the same set was larger and one
   in nine of the evaluative records said `worked`. **A counterfactual computed against a
   distribution this sparse will produce comparisons across very few anchor points**, and anyone
   sizing the work from a pre-pass memory of "nine worked records" is sizing it against a corpus
   that no longer exists.

---

## 3. The corpus as it now stands

Gate-emitted lines are marked; everything else is a measurement with its method stated.

**Scope** — `validate` emits: `223 ledger · 269 series · 127 provenance · 60 pairs = 679 records, 1759 points`.
`manifest` emits `679 records, 71,141 bytes`.

### By assessment — field `assessment`, ledger only, n=223

| value | n | share |
|---|---:|---:|
| `no-objective` | 69 | 30.9% |
| `contested` | 68 | 30.5% |
| `partly` | 39 | 17.5% |
| `failed` | 16 | 7.2% |
| `too-early` | 13 | 5.8% |
| `baseline-context` | 11 | 4.9% |
| `awaiting-adjudication` | 4 | 1.8% |
| `reversed` | 1 | 0.4% |
| **`worked`** | **1** | **0.4%** |
| **`undated-commitment`** | **1** | **0.4%** |

**Evaluative (`worked`/`partly`/`failed`/`reversed`): 57 of 223, 25.6 per cent.**
**Non-evaluative: 166, 74.4 per cent** — which is the single most important number for any
calibration, and it was 74 per cent before the pass too. The pass moved records *within* the
evaluative class; it did not change how much of the corpus is scoreable at all.

### By term and by type — fields `term`, `type`

`term`: T1 74 · T2 74 · T3 64 · baseline 11.
`type`: episode 75 · reform 71 · institutional 51 · event 18 · **shock 8**.

### By domain — field `domains[]`, a TAG SET not a partition, so it sums above 223

| domain | n | worked | partly | failed | evaluative |
|---|---:|---:|---:|---:|---:|
| governance | 110 | 0 | 7 | 8 | 15% |
| macro | 57 | 1 | 7 | 7 | 28% |
| federalism | 52 | 1 | 6 | 4 | 23% |
| kashmir | 46 | 0 | 2 | 0 | **4%** |
| foreign | 42 | 0 | 7 | 1 | 19% |
| infrastructure | 24 | 0 | 13 | 1 | **58%** |
| welfare | 21 | 0 | 9 | 2 | 52% |
| education | 21 | 0 | 4 | 4 | 38% |
| environment | 14 | 0 | 6 | 1 | 50% |
| banking | 13 | 0 | 5 | 2 | 54% |
| employment | 12 | 0 | 1 | 0 | **8%** |
| defence | 10 | 0 | 0 | 0 | **0%** |
| human-development | 8 | 0 | 2 | 0 | 25% |
| poverty | 3 | 0 | 1 | 1 | 67% |

**The reviewers' domain-asymmetry finding survives the pass and is now sharper, not weaker.**
Physical delivery domains are 50–58 per cent evaluative; governance is 15 per cent, kashmir 4 per
cent, employment 8 per cent, defence 0 per cent. The pass removed the `worked` verdicts that made
the asymmetry look like a positive bias; the asymmetry itself is about **which domains can be scored
at all**, and it did not move.

### By tier — tier inside `sources[]` on ledger and provenance, on the record for series; n=1,202

| tier | n | share |
|---|---:|---:|
| T1 | 928 | 77.2% |
| T4 | 135 | 11.2% |
| T2 | 84 | 7.0% |
| T3 | 28 | 2.3% |
| **T1F** | **19** | 1.6% |
| T5 | 8 | 0.7% |

By layer — ledger 637 (T1 493, T4 73, T2 39, T1F 19, T3 11, T5 2) · provenance 296 (T1 227, T4 36,
T2 15, T3 14, T5 4) · series 269 (T1 208, T2 30, T4 26, T3 3, T5 2). **All 19 T1F citations sit on
the ledger; no series or provenance record cites a foreign primary.**

`no-bare-root` emits its own split of the frozen allowlist: `277 legacy citation(s) … (T1:128 T2:13 T3:6 T4:42 T5:4 no tier:84)`.

### By commitment state — **the axis does not exist**

`commitmentState` is present on **zero** records. It was scoped and then stopped in batch 6, because
its four states cannot express a commitment that was *met*. The closest thing in the corpus is prose:
**16 records use a named state vocabulary** (`commitment state (a)–(d)`, *not-yet-due*,
*due-and-undelivered*, *unfalsifiable by construction*) — L-0061, L-0090, L-0188, L-0194, L-0196,
L-0201, L-0204, L-0205, L-0209, L-0212, L-0213, L-0216, L-0221, L-0222, L-0223, L-0225.

**A first pass at this measurement returned 156 of 223 and was wrong.** The pattern matched `state`
followed by a letter anywhere in the record, and `"this record previously carried a verdict with no
stated reasoning"` contains `stated` — so the ordinary prose of the triage sweep read as commitment
vocabulary. Reported here because the number would otherwise have gone into a scoping document as a
measurement, and 156 versus 16 is a factor of ten.

### By independence — **the axis does not exist either, and this is the finding**

Independence is the question the entire cycle turned on. **It is recorded nowhere as a field.**

- Ledger records whose `assessmentNote` states an independence finding in any vocabulary: **11**
  (L-0023, L-0026, L-0029, L-0035, L-0047, L-0052, L-0053, L-0076, L-0124, L-0151, L-0207).
- Records the pass rescored or restated: **10**.
- **Ledger records carrying no independence statement of any kind: 212 of 223, 95 per cent.**

The rulings are method; the classification is prose on the records that happened to be touched.
Nothing can count how many records rest on the announcing body, because nothing records it. **A
calibration that wants an independence axis has to author one, and that is a schema change and
therefore a stop.**

### Absences — field `unmeasured[]`

373 entries across 199 records: `not-published` 205 · `not-collected` 115 · `never-defined` 41 ·
`withheld` 12. **147 of 223 ledger records (66 per cent) carry at least one declared absence.**

---

## 4. The nine open items — prerequisite or simply open

**Prerequisite for phase 16 under EITHER reading of its name:**

| # | Item | Why it blocks |
|---|---|---|
| **8** | **The self-audit layer question** | A counterfactual engine emits *output resembling measurement* about the corpus's own subject matter. Whether such output may be cited by a scored record is the same question the self-audit ruling answered for derivations, and answering it twice differently would be the defect. **Decide before building, which is also what the verification log already demands of the rendering.** |
| **7** | **Selection bias** | 73 of 226 records were shown to the reviewers under criteria two of which carry a judgement threshold. Any calibration that treats the reviewed set as representative inherits it. Neither the reviewers nor the instrument can say whether it overstates or understates prevalence. |

**Prerequisite only if phase 16 is the counterfactual engine:**

| # | Item | Why |
|---|---|---|
| **4** | **Seam-span triage** — `seam-span-report` emits 127 record-by-break spans, 92 declaring the break and **35 not** | A trend fit across an undeclared basis break is the exact failure `CLAUDE.md` rule 2 exists to prevent. **35 undeclared spans is 35 places a counterfactual could splice.** This is the strongest prerequisite in the list and it is currently filed as merely open. |
| **6** | **The source cache** — three options costed, none chosen | An engine that recomputes against live sources inherits the retrieval instability the FSR failure just demonstrated. |

**A stale figure caught while writing this.** This document first carried *"125 spans / 34 undeclared"*,
taken from the cycle `STATE.md`, which had taken it from an earlier batch. Re-running the gate emits
**127 / 92 / 35**. The number was two batches old and had been copied twice without being re-derived —
the same class as the 752-versus-965 sourcing claim, caught this time because the rule is to run the
gate rather than quote the last report of it. Both files are corrected.

**Simply open — real, and not blocking:**

| # | Item | State |
|---|---|---|
| **1** | **The RBI *Financial Stability Report* is not held** | Six routes named on each dependent series. Affects what two records' notes can claim about passing the intra-state test; changes no verdict. **Not "not published" — not retrieved by this client.** |
| **2** | **L-0219's 139 and L-0218's three channels** | Findings live at `/derivations` §3. Fix is a dated stored sweep — a data change, not schema. |
| **3** | **`undated-commitment` candidates** | Tested and rejected on the definition's own words. Re-test only if one acquires a quantity. |
| **5** | **Arc B's capability** (phase-15 deferral) | Untouched. |
| **9** | **The real independent review** — domain economist, media lawyer | Standing since before phase 15. The four adversarial model passes are not those, and `/method` says so on the live page. |

**Two items should be reclassified out of "simply open" and into the phase-16 gate:** item 4
(seam-span) and item 6 (source cache) are load-bearing for a counterfactual engine and were logged
as general debt. **That reclassification is the main thing this scoping pass produces.**

---

## 5. Where a casual reader meets the `worked` count

**It was not on the page.** `/method` carried the standard and the count, and never said what the
count measures — the paragraph from `docs/rulings-2026-08-06.md` §7 that does had not been shipped.
And the index page, where a reader actually lands, rolled verdict counts per term with no
explanation at all.

Both are now shipped and verified live:

- **The index page**, immediately above the per-term verdict grid: that one record of 223 says a
  measure worked, that the number is about the evidence rather than the government, and that the
  tally should be read as how much of Indian policy is independently checked. Counts derived, never
  typed.
- **`/method`**, under a bold lead — *why one of 223 is not a finding about the government* — with
  the draft's load-bearing sentence intact: the count measures how often a policy achieved what was
  promised **and** how often anybody independent checked, **and this instrument cannot separate them
  and should not pretend to.**

---

## What phase 16 needs from the operator before it opens

1. **Which phase 16 is.** The repository says counterfactual engine; the instruction says shocks
   calibration. Not reconcilable from anything written.
2. **Whether engine output may be cited by a scored record** — the self-audit question, in its
   second form.
3. **Seam-span triage first, or accept 35 undeclared spans under a trend fit.**

No records were authored, no schema touched, no verdict moved.
