# Phase 16 — shocks calibration. Scope, and two reports. Written 2026-08-06 at `a5935a7`.

The phase list is now in `CLAUDE.md`, which had nothing enumerating the phases before today — the
finding that produced it. **Phase 16 is shocks calibration; the counterfactual engine is declined
and recorded as considered-and-declined, not as unbuilt; phase 17 becomes independence.**

---

# 1. The seam-span fix — done, and the gate is a ratchet

| | spans |
|---|---:|
| record-by-break spans, gate-emitted | 127 |
| declared **before** the fix | 92 |
| **declared after** | **101** |
| undeclared, wide | 35 → **26** |
| undeclared **and narrow** (both periods in one sentence) | 21 → **12** |
| unjudged | **0** |

**Six genuine comparisons fixed, no verdict moved.**

- **L-0060** (`contested`, unchanged) — its summary set NSSO Employment-Unemployment Survey figures
  for 2004-05 and 2011-12 against Periodic Labour Force Survey figures for 2017-18 and 2023-24 in one
  sentence. P-02 is now cited and the sentence says so: *"a decline measured on one instrument and a
  rise measured on another do not subtract."*
- **L-0150** (`no-objective`, unchanged) — five spans, the flagship federalism claim, crossing the
  Finance Commission award boundary (P-103) and the Actuals/RE/BE splice (P-113) in its own summary.
  Both are now cited and the sentence states that **the direction is robust to both and the size of
  the fall is a comparison across two seams.**

**Three were declared in substance and the check could not see it.** The `declared` predicate
accepted only a `provenanceRefs` entry, the break period string or the provenance id. L-0182 explains
its discontinuity in words — *"the definitional gap between cash attributed to a year and cash
accounted in a year"* — and was reported three times for it. **The predicate now accepts a
discontinuity explained in substance.** A gate that demands a citation form the instrument does not
otherwise require would teach authors to cite instead of to explain.

**Twelve are frozen with their judgements**, in `tools/lib/seam-span-allowlist.json`. Each entry
carries *the quantity its sentence actually compares* rather than only an id — L-0026 compares bank
profit and not the capital ratio; L-0156 ×4 compares a **range of audit reports** and not a series;
L-0222 compares coal production while citing the non-fossil generation share for context, which is
the case the tool's own header always named.

**The gate is in the build** with a two-sided control: withdrawing one frozen judgement names exactly
that span and no other; the frozen set passes; and removing the substance clause returns L-0182,
proving the widening is load-bearing rather than decorative. **What it deliberately does not cover is
in its header, not implied by a green line:** the 14 wide-only spans are dropped, so a record that
compares across a seam in two *adjacent* sentences is not caught.

---

# 2. The ten records — and a correction to what I reported last batch

**I reported these as "scored against a benchmark the record does not state." That was wrong, and the
error was mine.** I measured `claimAtLaunch` and reported the result as though it were a measurement
of the whole record. **Every one of the ten names its benchmark — in `assessmentNote`.**

| record | verdict | measured against | stated where |
|---|---|---|---|
| **L-0077** | `failed` | struck down by a five-judge Supreme Court bench, February 2024 | note |
| **L-0080** | `failed` | struck down by the Bombay High Court, September 2024 | note |
| **L-0081** | `partly` | *Anuradha Bhasin* — a court direction, and the note says so: *"a stated objective that is a court direction, not a launch claim"* | note |
| **L-0095** | `failed` | RTE section 26's ten per cent vacancy ceiling — *"the objective being a number in the statute rather than a policy claim"* | note |
| **L-0097** | `failed` | *Devesh Sharma*, on the definition's own rule that a measure struck down by a court is `failed` | note |
| **L-0098** | `partly` | RTE section 12(1)(c), the 25 per cent quota — *"a statutory objective rather than a policy claim"* | note |
| **L-0104** | `partly` | NEP 2020's 50 per cent GER by 2035 — *"not a launch claim on this record and is declared here rather than left to be inferred"* | note |
| **L-0106** | `failed` | the RTE Schedule's staffing norm, to be maintained in each school by 31 March 2013 | note |
| **L-0108** | `failed` | the recruitment process's own object, appointing teachers on merit, per the Court's adopted findings | note |
| **L-0176** | `partly` | the earmark that is the levy's own justification for sitting outside the divisible pool | note |

**So the finding is much narrower than I made it, and it is not a double standard.** The benchmark is
declared in nine of ten cases in near-identical language — several records say explicitly that they
are declaring it rather than leaving it to be inferred, which is the opposite of concealment. **The
real defect is one of placement: the benchmark lives in the reasoning field and not in the field a
reader consults to learn what was claimed.**

**What each would say if the benchmark were stated in `claimAtLaunch`:** the same sentence, moved. For
L-0095, *"RTE section 26: no more than ten per cent of sanctioned teaching posts vacant in any
school"*; for L-0104, *"NEP 2020: 50 per cent gross enrolment ratio in higher education by 2035"*;
for L-0081, *"Anuradha Bhasin: shutdown orders to be published, reasoned, proportionate and
periodically reviewed"*. **No record needs new research and no verdict moves.** It is a transcription
of nine sentences and one judgement call on L-0108, whose benchmark is a process's own object rather
than an external instrument.

**Why it still matters, and it is the link to item 3:** a reader scanning `claimAtLaunch` sees an
empty field on all ten and concludes nothing was claimed. The corpus cannot distinguish *the record
declares a statutory benchmark in its note* from *nothing was claimed and none is recorded*, because
both render as an absent field.

---

# 3. PROPOSAL — `claimAtLaunch`

## The problem

`claimAtLaunch` is **optional and empty on 137 of 223 records — 61 per cent.** In the four
low-evaluative domains, every record in the "no claim" class has an **empty field and not one states
that no claim was made**. So four different situations are indistinguishable:

1. nothing was announced, because the record is a condition or a pattern (most of the 137);
2. something was announced and the record did not capture it;
3. a statutory, constitutional or judicial benchmark applies and is declared in the note (the ten);
4. the field was simply not filled.

**This is what blocks the domain-asymmetry question.** Whether defence's 0 per cent evaluative rate
comes from *no commitment was made* or *no measurement exists* or *the commitments are qualitative*
is unanswerable while (1), (2) and (4) render identically.

## The proposal

**Make the field required, with an explicit vocabulary for the absence.** The shape already exists in
this instrument: `unmeasured[].reasonKind` distinguishes `not-published` from `not-collected` from
`never-defined` — the same move, one level up.

- `claimAtLaunch` becomes **required** on the ledger schema.
- A record with no claim writes one of a small closed set as the first token, then prose:
  **`NONE ANNOUNCED`** — the record is a condition, trend or pattern with no announcing act;
  **`NONE LOCATED`** — an announcing act exists and no statement of objective has been retrieved,
  which is a search finding and carries the same stated-search obligation as `not-published`;
  **`BENCHMARK`** — the record is scored against a statute, a constitutional provision or a court
  direction, named on the spot.
- **The third value is what the ten need**, and it makes the reader's first field agree with the
  record's reasoning instead of contradicting it.

**This is a schema change and therefore a stop. Proposed, not built.**

## What the backfill takes

137 records. **86 already carry a claim and are untouched.** Of the 137:

- **~10 are `BENCHMARK`** and their text already exists in the note — transcription.
- **The bulk are `NONE ANNOUNCED`**, and the `type` field is a strong prior but not an answer: 27 of
  kashmir's 33 and 61 of governance's 76 are `episode` or `institutional`, which the schema defines as
  patterns and rule-changes rather than announced measures. **A prior is not a value** — the scoping
  batch's own 156-versus-16 error came from treating a pattern as a measurement — so each is
  confirmed by reading.
- **`NONE LOCATED` is the one that costs**, because it asserts a search. Any record taking it must
  carry a stated search in the form rule C.5 requires, or take `NONE ANNOUNCED` and be wrong in the
  safer direction.

Realistically one authoring batch of ~40 records at a time, three or four batches, **and no verdict
moves** — the field records what was claimed, not what happened.

## What it would let the corpus measure that it cannot today

1. **The domain-asymmetry question, directly.** Split each domain's non-evaluative population by
   `NONE ANNOUNCED` / `NONE LOCATED` / `BENCHMARK` and the three candidate causes separate. Only
   `NONE LOCATED` is about the instrument.
2. **Whether the benchmark class is applied consistently** — the reviewers' statutory double-standard
   finding becomes a query rather than a reading of 223 records.
3. **The size of the `undated-commitment` and `no-objective` populations on evidence** rather than on
   the current inability to tell an unfilled field from a stated absence.
4. **It would have prevented the error at the top of this section.** A required field with a
   vocabulary makes "the record states no claim was made" a fact the corpus holds, instead of
   something I inferred from an empty string and reported as measured.

---

# 4. Phase 16 scope — shocks calibration

## The inventory

**Eight `type: shock` records, 3.6 per cent of the ledger:**

| record | verdict | domains | window |
|---|---|---|---|
| L-0002 | `baseline-context` | macro | 2013-05 – 2013-09 — taper tantrum and rupee crisis |
| L-0020 | `contested` | macro/welfare | 2020-03 – 2022-03 — COVID contraction and fiscal response |
| L-0021 | `no-objective` | foreign/macro | 2025-08 – 2026-02 — US tariffs on Indian goods |
| L-0027 | `no-objective` | banking/macro | 2018-09 — IL&FS collapse |
| L-0064 | `no-objective` | employment/welfare/governance | 2020-03 – 2020-09 — the migrant exodus and its missing record |
| L-0184 | `no-objective` | foreign/macro | 2025-04 – 2026-02 — the fifty per cent wall |
| L-0186 | `no-objective` | foreign/macro | 2026-02 – 2026-07 — the section 122 surcharge |
| L-0216 | `partly` | foreign/environment | 2025-04-23 — the Indus Waters Treaty put in abeyance |

**Six of the eight are `no-objective` or `baseline-context`.** A shock has no announced objective by
construction, so the value that describes it best is the one that says nothing was claimed — which is
worth stating before any calibration treats a low evaluative rate here as a defect.

**`shockExposure` — a prose field — is on 66 of 223 records**, and **two `type: shock` records do not
carry it: L-0002 and L-0216.** A record typed as a shock that does not state its exposure is the
first thing the phase should look at.

## The recorded inconsistency, verbatim from the schema

> - shock: a disruption arriving from outside the government's control.
>
> USAGE NOTE, unresolved: `shock` is currently a …

The inconsistency is recorded in three places in identical terms — *"`shock` covering both external
disruptions and domestic failures"* (`docs/phase-command-spec-v2.md`, twice) and as one of three
known-inconsistent axes in `.claude/skills/phase/SKILL.md`, which adds the binding instruction:

> **Do not resolve one mid-phase**; `differentFacts` reached seventeen records because a taxonomy was
> resolved in the pass that discovered it.

**So the phase's first constraint is that it may not fix the definition of the thing it is
calibrating** — the taxonomy resolution is a separate, deliberate act. Note also that the IL&FS
collapse (L-0027) is a *domestic* failure typed as a shock, which is the inconsistency with a member.

## Forward references to shock attribution

Two, and both are promises rather than designs:

- `app/ledger/[id]/page.tsx` line 203, rendered on **every** ledger record page: *"shock-attribution
  views come later."*
- `tools/gen-adversarial-pass-input.mjs` line 720 labels the field **"Confounding shocks"** in the
  reviewer extract — a different framing from *exposure*, and the difference is the phase's subject.

## The phase's real subject, measured

**38 ledger records reason from an exogenous event in `assessmentNote`, `caseFor`, `caseAgainst` or
`whatHappened`.** Of those, **22 name one** — either `type: shock` or a populated `shockExposure`.
**Sixteen name none.**

**Only one of the sixteen is evaluative: L-0222** (`failed`), whose reasoning invokes *"the COVID
year"* as the single year-on-year fall in an eleven-year series while carrying neither the type nor
the exposure field. **That is the whole set where a verdict currently turns on an unnamed shock**, and
it is one record, not a class.

The other fifteen are `contested` (7) or `no-objective` (8), and their pattern is more interesting
than a defect count: they use a shock as **an explanation offered by someone else and then tested** —
L-0116's *"the COVID justification has outlived COVID by four years"*; L-0099's *"this was a rule
change and not a demand shift, a pandemic effect, or a reporting artefact"*; L-0105's census
enumeration halted in April 2020; L-0159's *"a once-in-a-century pandemic is not implementation"*.
**In each, the shock is the counter-explanation the record is refusing, not a confounder the record is
carrying.**

**So the phase has two subjects and they are different work:**

1. **Attribution as a defence.** Fifteen records where an exogenous event is offered as an
   explanation — by a ministry, a court, or the record's own case-against — and the record must say
   whether it accepts it. This is prose and reasoning, not a field, and it is where the corpus is
   already strong.
2. **Exposure as a property.** One evaluative record with an unnamed shock, two shock-typed records
   with no exposure stated, and 66 records carrying `shockExposure` as free prose that nothing
   validates, nothing counts, and no gate reaches. **This is the calibration.**

**What the phase must not do**, on the standing rule: resolve `type`'s inconsistency while working
inside it. And what it should be measured against: **not the number of shocks found, but whether a
reader can tell, for any record, which exogenous events the verdict is exposed to and which it
refuses.**

---

**No schema work, no engine, no verdict moved. One gate added, one predicate widened, twelve
judgements frozen, two reports and one scope.**
