# National delimitation — scope settled, record specified, authoring owed to research

**Raised 2026-08-13 by the phase-13 completeness check. Scope question answered here. The record
itself is not written, and the reason is a rule rather than effort.**

---

## 1. THE GAP, MEASURED

**Of 82 federalism records, exactly one mentions delimitation at all — and it is a Jammu and Kashmir
record.** Across the whole corpus, **15 records use delimitation vocabulary and every one is J&K**:
`L-0141` is the substantive one, *"Delimitation of Jammu and Kashmir: one Commission table…"*.

**The corpus holds no record on national delimitation** — the freeze on reallocating Lok Sabha seats
between states. Stated as rule 5d requires: *the corpus contains no such record*, which is checkable
from the corpus, not *nothing exists in the world*.

---

## 2. SCOPE — SETTLED BY THE CORPUS'S OWN PRACTICE, NOT BY OPINION

The objection to opening a record is that **nothing has happened yet**: the freeze has not lifted, so
there is no event to score. That objection does not survive contact with what the corpus already
carries.

**19 ledger records score something unresolved:**

| assessment | n |
|---|---|
| `too-early` | 13 |
| `awaiting-adjudication` | 4 |
| `undated-commitment` | 2 |

**The governing precedent is `L-0225`**, read rather than assumed:

- title: *"Net zero by 2070 is one sentence: a year, and no statement of what is being zeroed"*
- `assessment: too-early` · `term: T2` · `date: 2021-11-01` · 2 sources, both T1 · `objectives: 0`

**A target 44 years out, scored `too-early`, on two primary sources and a quoted claim at launch.** A
constitutional trigger due after the next census is nearer than that and far more concrete.

**So a pending national-delimitation record is in scope.** The instrument already carries pending
triggers; this one is not a new kind of object.

---

## 3. WHY IT IS NOT WRITTEN HERE

**Authoring a ledger record means asserting a verdict about the Indian state.** That is the
instrument's core work product, and the roles rule reserves it: *chat sessions own research and the
truth of `/data` records, drafted to schema and delivered to `/data/incoming/`.*

**The narrow source-edit amendment does not reach it either.** That permits a run to apply a
correction it raised, to *a citation, a reason, a scope or a wording* — **never an `assessment`**. A
new record is an assessment plus everything under it.

**And the evidence is not held.** Every source would have to be retrieved in the authoring run — rule
3: *a document is a source only if it was retrieved in this run.* Nothing in this corpus can stand in
for that.

---

## 4. WHAT THE RECORD HAS TO CONTAIN — the specification, so a research pass does not re-derive it

**Structure**, following `L-0225` as the nearest precedent:

- **`claimAtLaunch`** — the constitutional text creating the freeze, quoted, with the instrument
  named and the article number. Not a paraphrase: Ruling 5 requires the duty **in the instrument's
  own words** where an objective is imposed rather than announced.
- **`sources[]`** — the amendment text and any census-timing instrument, each retrieved in the run and
  tiered. **A bare domain root is not a citation** (`no-bare-root` is in the build); deep-link each.
- **`date`** — see the trap below.
- **`domains`** — `federalism` at minimum. `governance` if the record is about the mechanism rather
  than the distribution.
- **`assessment`** — the available values, given the rulings:
  - **`too-early`** if the record is about the trigger and its consequences, which is `L-0225`'s shape.
  - **`undated-commitment`** is likely WRONG: Ruling 3 covers *a stated, quantified commitment with no
    deadline*, and this has a deadline in the instrument.
  - **`no-objective`** is wrong: an objective exists and is imposed. Ruling 5.

**Two traps, both live:**

1. **`date` against `term`.** The validator warns only on the LATE side from 2026-08-13, so an
   instrument date decades before the term is fine and expected — that narrowing was made for exactly
   this class. Do not back-date the record to make a warning go away.
2. **Rule 5d on the southern-states claim.** *"Southern states will lose seats"* is a projection, not
   a measurement. It must be attributed to whoever projected it, with their method, or stated as a
   range with each bound attributed — **or not stated at all.** The record is about a mechanism and
   its timing; the distributional consequence is a modelled quantity and inherits every constraint on
   one.

**What would make the record `worked`, `failed` or `partly` is a later question.** Nothing has
happened; `too-early` is the honest value today, and the record's job is to make the trigger visible
before it fires rather than to score it.

---

## 5. WHAT IS CLOSED AND WHAT IS NOT

**Closed:** the phase-13 completeness question, and the scope question — a pending constitutional
trigger is in scope, on precedent.

**Open, and research's:** the record. This brief is what it needs; it is not a substitute for it.
