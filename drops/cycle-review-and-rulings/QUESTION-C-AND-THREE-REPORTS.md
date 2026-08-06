# Question (c) verbatim, three reports, and one gate

Written 2026-08-06 against `0dc9d5b`. **One gate built and in the build; three reports; one verbatim
print. No record authored or edited, no schema or enum change, no phase opened, 0 verdicts moved.**

---

# 1. Question (c), verbatim — and what the file does not contain

**Here is the whole of (c), quoted from `PHASE-16-CALIBRATION-SCOPE.md` §*WHAT MUST BE SETTLED BEFORE
THE PHASE OPENS*:**

> **(c) Does a shock become a record, a provenance entry, or neither?** The corpus does all three
> today — L-0020 is a ledger record, P-10 and P-21 are provenance, and the 2022 heat shock is prose
> in six records and nothing else. **A first-class shock object presupposes an answer**, and this one
> is the gating question: it decides whether the phase is a new layer, a use of provenance, or a
> field.

**That is four lines and it is all of it.** The instruction asks for the file's account of *what each
of the three would mean in practice, what each costs, and what the corpus could answer under each*.
**The file does not contain that.** It states the three options, names one instance of each, and
says the question is gating. It never develops them.

**This is the report-versus-record rule applied to my own report**, and it is the fourth time this
cycle: the summary that reached the operator implied a three-way analysis the source has no trace
of. What the file *does* develop — in §4 under *What a shock would be as a first-class object*, *How
a record's exposure to one would be recorded*, *What a gate would check* and *What the corpus could
then answer* — is a single design (a shock object referenced from records), costed and argued once.
**Those sections presuppose an answer to (c) rather than comparing the three.**

So the three-way comparison the operator needs to rule does not exist and is supplied below, marked
as new work rather than as a quotation. **Everything in it is derived from measurements already
emitted in this cycle; nothing new was retrieved.**

## The three options, developed

| | **(i) shock as a LEDGER RECORD** | **(ii) shock as a PROVENANCE entry** | **(iii) shock as NEITHER — a field on the record** |
|---|---|---|---|
| **what it is** | one record per shock, as today's eight | one `P-xx` per shock, as P-10 and P-21 | no shock object; each record names its own shock in prose, as today's 66 |
| **the existing instance** | L-0020, L-0027, L-0064… | **P-10** (the GDP rebasing, referenced by L-0022) and **P-21** (the asset-quality break, by L-0033) | the 2022 heat shock — named in L-0069, L-0070, L-0073 and carried nowhere |
| **what it costs** | a shock inherits the ledger's whole apparatus: `assessment`, `caseFor`/`caseAgainst`, `claimAtLaunch`, `confidence`. **Six of the eight take `no-objective` and one takes `baseline-context`** because a shock announces nothing — the corpus is already paying for fields a shock cannot use | a schema, a view and a render assertion **already exist**; provenance is a first-class layer with its own obligations. Cost is one field for the shock's own properties and the migration of 66 prose references | **zero build cost and it is what is failing.** 66 prose fields nothing validates, counts or reaches; the inventory is unknowable; three records restate the same nettability judgement in their own words |
| **what the corpus could answer** | "which shocks have their own record" — which is what it answers today, and the question nobody asked | **"which records are exposed to COVID", "which shocks break a series", "is this shock netted against the peer panel"** — because a provenance record is already the thing a break is declared against, and `provenanceRefs[]` is already the reference | nothing more than today |
| **what it gets wrong** | **it forces a shock to hold a verdict.** L-0216 is the proof running the other way: the only `type: shock` record with an evaluative verdict, and report 3 below shows it is not a shock | a shock that breaks no series still needs a home, and `P-xx` is defined as a **measurement-dispute** record — admitting shocks widens that definition | it cannot answer question (b) either: confound and cause stay unmarked |
| **the standing rule it meets or breaks** | rule 8 governs modelled quantities; a shock record is not one, so no conflict — but the self-audit ruling's test applies: *would anything outside this corpus have to change for the finding to change?* For a shock, **yes** — it is an external event, so it is evidence, not method | same, and provenance is where the corpus already puts *facts about the measurement*. **A shock that breaks a series IS a fact about the measurement**, which is why P-10 and P-21 exist | — |

**The evidence in the corpus points at (ii), and the two existing instances are the argument: L-0022
→ P-10 and L-0033 → P-21 were authored without any rule telling anyone to do it.** Both are records
whose `shockExposure` says the record is a confound *for others*, and both reached for provenance
unprompted. That is the corpus finding the shape before the phase does.

**Two things (ii) does not settle, and they are why this is a ruling and not an inference.** A shock
that breaks no series has no natural provenance home, and the `ProvenanceRecord` schema's own subject
is a measurement dispute. **A ruling for (ii) is a ruling to widen that definition, and this batch
does not make it.**

---

# 2. REPORT — the group-C prediction, tested. Partly confirmed, and my own count was inflated

**The prediction, from `RULING-5-AND-FOUR-REPORTS.md`:** *"Group C — Ruling 2 is written and
UNENFORCEABLE. This is the strongest prediction… its 27 candidates are split across six values."*

## The 27 and the six-way split, as emitted

**SCOPE: the 170 of 223 ledger records carrying a non-empty `assessmentNote`; word-boundary
`scanText` of that field ALONE for `unmeasured`, `limb`, `not established`, `never measured`, `one of
the two`, `of the three objectives`. Emitted by `scratchpad/notegov.mjs`. No gate emits it.**

| value | n | ids (matched term) |
|---|---:|---|
| partly | 10 | L-0026 L-0047 L-0050 L-0053 L-0054 L-0072 L-0093 L-0200 L-0207 L-0221 |
| contested | 8 | L-0025 L-0076 L-0096 L-0113 L-0152 L-0171 L-0224 L-0226 |
| too-early | 4 | L-0139 L-0201 L-0223 L-0225 |
| failed | 3 | L-0011 L-0067 L-0222 |
| worked | 1 | L-0151 |
| no-objective | 1 | L-0210 |

## Read individually, ~12 of the 27 are doing limb reasoning. **My count was inflated and I am correcting it.**

**Twelve genuinely reason about announced objectives and whether each is measured:**
L-0011 L-0026 L-0047 L-0050 L-0053 L-0054 L-0067 L-0151 L-0200 L-0207 L-0221 L-0222.
The clearest are quoted from the records in this operation — L-0026: *"two objectives were announced
and one is not established"*; L-0053: *"WHAT BARS worked IS THE SECOND LIMB"*; L-0047: *"the announced
object included emissions, and that limb is unmeasured"*; L-0221: *"the two limbs are scored
separately because they are different quantities."*

**Fifteen matched on other uses of the same words**, and three groups account for them:
- **The `contested`-versus-`no-objective` boundary (L-0096, L-0152, L-0224, L-0226)** — these cite a
  **written** rule, the `no-objective` schema definition's *"Use where nothing was claimed, not where
  a claim exists and its outcome is unmeasured — that remains contested (see L-0096)."* **They are
  the opposite of a per-record defence: they quote the rule.**
- **`limb` meaning the two halves of a DISPUTE, not an objective** — L-0076: *"scoring either limb
  alone would decide the other silently"*; L-0171: *"Both caseFor and caseAgainst carry a State limb
  and a Union limb."*
- **`unmeasured` meaning an absence entry** — L-0072, L-0093, L-0210, L-0201, L-0225, L-0139,
  L-0223 — and **L-0025 says the opposite in terms**: *"THE RECORD DECLINES BECAUSE THE DISAGREEMENT
  IS NORMATIVE, NOT BECAUSE ANYTHING IS UNMEASURED."*

**THIRD INFLATED COUNT OF MY OWN IN THREE BATCHES, all from a keyword scan and all caught only by
reading:** the "38 records reasoning from an exogenous event" (re-derived 39/40/48/52 depending on an
unrecorded term list); group G's "22 documented departures" (`departure` appears in exactly one
note); and now 27 for 12. **The scans were labelled candidates each time and the prediction still
used the raw number** — labelling a count as candidates does not stop it being spent as a finding.

## The prediction stands, and the reason is sharper than the count

**Ruling 2 constrains `worked` alone.** The corpus has exactly **one** `worked` record. So R2's live
population is one — and **L-0151 asserts its own compliance in prose**: *"No limb of the
recommendation is unmeasured."*

**Nothing can check that sentence.** No field records what the recommendation's limbs were, or which
are measured. A reader must take it on trust, and so must every future cycle. **That is a rule
written into three files whose single instance of compliance is an unverifiable assertion in a
fourth.**

And the exposure an external reviewer would find is not the 27. It is:

1. **R2 is prospective and the corpus cannot execute it.** Any future `worked` requires knowing every
   announced objective and its measurement state. Nothing holds that.
2. **Twelve records reason about limbs across five values, and R2 speaks to one of them.** `failed`
   with unmeasured limbs (L-0011: three objectives, one grounds the verdict, two unmeasured) is
   governed by nothing. **Ruling 1 says missing evidence must not become a negative finding — and a
   `failed` verdict resting on one measured limb of three is the same question pointed the other
   way.** That is the finding the reviewer would reach, and it is bigger than R2.
3. **L-0222 is the clean control that shows the corpus knows the difference**: *"Both limbs were
   dated, both fell due, and both were missed… PARTLY was rejected because neither limb was
   partially met."* No unmeasured limb, so R2 is not engaged, and the record says why. **Correct, and
   stated in the note, and checkable by nobody.**

## What would have to be recorded for R2 to be re-applicable in the aggregate

Three things, and the first two are the whole of it:

1. **The announced objectives, as a list rather than as prose.** `claimAtLaunch` is a single string
   and 137 records leave it absent. R2 operates on *"a commitment states several objectives"* — a
   fact the corpus does not hold in any form a query can reach.
2. **A measurement state per objective** — measured-and-met / measured-and-not-met / unmeasured.
   **The distinction is already load-bearing and already written down**: *"A limb measured and failed
   and a limb never measured are different situations."* L-0222 turns on it.
3. **Where an unmeasured limb is recorded as an absence, the link between the two.** Several records
   already enter the limb in `unmeasured[]` — L-0047, L-0050, L-0054 — but nothing says *this absence
   is the limb that bars `worked`*, so the absence and the verdict are two facts a reader has to join
   by hand.

**With those, R2 becomes a gate of exactly the shape `enum-parity` already has**: for every record
with more than one objective, if any objective is `unmeasured` then `assessment !== 'worked'` —
mechanical, silent on success, emitting its own scope. **Without them R2 is a sentence in three
files that nothing can apply and nothing can audit.** Reported only; the field is a schema change.

---

# 3. REPORT — L-0020 and L-0091, the same pandemic typed two ways

**SCOPE: both records read in full, every field, in this operation.**

## Does either state why it chose its type?

| | **L-0091** | **L-0020** |
|---|---|---|
| type | `episode` | `shock` |
| **states a reason for the type?** | **YES** — in `shockExposure`: *"the record is typed as an episode rather than a shock **precisely because closure duration in India was a sequence of state decisions rather than an external event**."* | **NO.** The record carries **no `assessmentNote` at all** (19 keys, and that is not among them). Its `shockExposure` reads *"This record IS the shock"* — **an assertion of the type, not a reason for it.** |
| subject | the response to the pandemic and its measurement | *"COVID-19 contraction **and fiscal response**"* — two objects in one title |
| assessment | `contested`, ground `measure` | `contested`, ground `criterion` |

**One record states a test and applies it. The other states a conclusion.** That asymmetry is the
answer to the question asked, and it is the per-record defence again — **the only reasoned
application of the shock boundary in the corpus lives in a field named for something else, on the
record that declined the type.**

## It is not a boundary case: L-0020's own reasoning applies L-0091's test and reaches L-0091's answer

L-0020 is typed as *"a disruption arriving from outside the government's control"* while its own
prose argues the opposite, twice:

> `whatHappened`: *"China grew in 2020; Vietnam and Bangladesh stayed positive; Indonesia contracted
> mildly — **indicating India's depth was substantially policy and lockdown-driven rather than purely
> pandemic-driven**."*

> `caseAgainst`: *"The contraction's depth relative to peers facing the same virus **points to
> lockdown design, not the pandemic**, and the four-hour notice period produced a migrant-worker
> crisis with severe human cost."*

**A record whose case against says the outcome was policy rather than the virus is typed as an event
outside the government's control.** Its `shockExposure` then says the shared exposure is what makes
peer comparison clean — which is true of the virus and is the argument its own `whatHappened` uses to
show the *contraction* was not shared.

## The four-hour notice appears in three records and is typed two ways

| record | the same causal chain | type |
|---|---|---|
| **L-0020** | *"the four-hour notice period produced a migrant-worker crisis"* — in its `caseAgainst` | **`shock`** |
| **L-0064** | *"The March 2020 lockdown, announced with four hours' notice, triggered the largest internal migration…"* — it IS that crisis | **`shock`** |
| **L-0091** | the same lockdown's school closures, *"a sequence of state decisions rather than an external event"* | **`episode`** |

**One decision, three records, two types, and the only record that states the test is the one that
came out the other way.** L-0064's own `caseAgainst` is quoted in the schema's usage note for the
proposition that the notice *"was a choice"* — so the corpus holds, in three places, the material
that decides all three, and applies it in one.

**This bears on (a) and is offered as material for the ruling, not as a resolution.** What the
ruling has to reach: **whether a record about the STATE'S RESPONSE to an external event is typed by
the event or by the response.** L-0091 answers *by the response*; L-0020 answers *by the event*; and
L-0020 additionally bundles both into one record, so on any answer its title names two things that
would take different types.

---

# 4. REPORT — the domestic non-state category has at least four members, so the test needs a branch

**The question:** L-0027 (IL&FS) is unreachable by L-0091's test because a private financial
company's default is neither a state decision nor external to India. **Does the corpus carry other
members of that category, typed anything?**

**SCOPE: all 223 ledger records; word-boundary scan of `title`, `summary`, `whatHappened`,
`shockExposure` for financial-failure, natural-event and epidemic vocabulary; candidates then read.**

**It does — and they carry four different treatments.**

| the event | what it is | how the corpus holds it |
|---|---|---|
| **IL&FS default**, ₹99,355 crore, triggering an NBFC liquidity freeze | a private company failing | **L-0027, `type: shock`** |
| **Bank frauds** — PNB/Nirav Modi ₹14,357 crore, ABG Shipyard ₹22,842 crore, DHFL ₹34,615 crore, Kingfisher ~₹9,000 crore | private frauds against banks | **L-0032, `type: episode`** — and its `shockExposure` reads **"None material"**, so the record does not regard itself as shock-adjacent at all |
| **The July 2012 grid collapse** — *"the world's largest blackout"*, 620 million people, ~32 GW offline | a physical failure of state-**owned** infrastructure that was nobody's decision | **L-0001, `type: event`**, `baseline-context` |
| **The 2022 heat shock** — collapsed wheat procurement 43.3 MT → 18.8 MT in one year | a domestic natural event | **no record of any type.** Prose in L-0069, L-0070 and L-0073's `shockExposure` |

**Four members, four treatments: `shock`, `episode`, `event`, and nothing.**

**So the test needs a third branch and not an exception.** An exception for IL&FS would leave L-0032
typed `episode` with *"None material"* against it, L-0001 typed `event`, and the heat shock with no
record — **exactly where they are now, and unreached by any rule.** A branch reaches all four.

**And the branch cannot be drawn on ownership, which L-0001 proves.** The grid is state-owned and the
collapse was not a policy act: an event can be *inside the state's estate* and still not be a state
decision. **The line the third branch needs is whether an act of policy caused it, not whose asset
failed** — which is the same distinction L-0091 draws (*"a sequence of state decisions"*), just
without the assumption that everything non-decisional is foreign.

**One boundary case where the corpus already does it right, and it should be the model.** **L-0028**,
Yes Bank: the *failure* is a domestic non-state event, and the record is `episode` because its
subject is the RBI moratorium and the reconstruction scheme — the state's response. **A record about
the response is typed by the response.** That is L-0091's answer, applied in a second record without
either citing the other, and it is the strongest evidence that the rule is real and unwritten.

**Report only. The standing rule forbids resolving the taxonomy inside the phase that uses it, and
the phase has not opened.**

---

# 5. THE GATE — `phase-name`, built, controlled, and in the build

`tools/phase-name-consistency.mjs`. **`npm run phase-name`**, wired into `npm run build` between
`seam-span` and `figure-consistency`, and added to the gate list in `CLAUDE.md`.

**Live run, its own emitted scope:**

```
phase-name-consistency: 326 tracked text files · 6 phases named in the table ·
1 superseded name(s) in scope · 6 disagreeing assertion(s), 6 exempted by name
```

**What it binds.** An assertion of the form `phase <N> is|was|becomes|=` in a tracked text file,
whose span carries a name from the closed vocabulary — the table's own names, plus a committed list
of names that were used and withdrawn. The name must agree with `CLAUDE.md`'s table, or be governed
by a supersession clause, or sit in a file that is append-only by rule.

**Presence in context, never absence** — the form `withdrawn-wording.mjs` uses, for the reason this
batch measured: **all six disagreeing assertions in the repository are correct.**

| | exempted because |
|---|---|
| `docs/verification-log.md:1009` | **append-only by name.** *"A closed verification-log entry is never edited."* The entry is the log working; the later entry governs |
| `PHASE-16-SCOPE.md:26`, `:211` | the file declares itself superseded in its own head |
| `PROPOSALS-2026-08-06.md:5` | governed by a supersession clause in the preceding window |
| `RULING-5-AND-FOUR-REPORTS.md:414`, `:454` | governed by a supersession clause in the preceding window |

**A token-forbidding guard would have fired on six right answers and no wrong ones.**

## Proof that it fires, and proof that it passes the three — the two-sided control

`--control`, run before every live run by the npm script, so the checker is proved to fail before it
is trusted to pass. **The positive passes through the restriction the negatives depend on**: it is a
real phase-16 assertion carrying a real withdrawn name, differing from the exempt cases only in that
nothing governs it.

1. **POSITIVE** — a bare contradiction (*"Phase 16 is the counterfactual engine"*, unmarked) **is
   named**.
2. **NEGATIVE** — *the same sentence* inside `CORRECTED 2026-08-06. This paragraph read: "…"` is
   **exempted**.
3. **NEGATIVE** — the same unmarked sentence in `docs/verification-log.md` is **exempted by name**.
4. **NEGATIVE** — an assertion naming no phase (*"phase 12 is checked"*) is **not examined**.
5. **NEGATIVE** — the table's own name **passes**.
6. **ABORT** — a table that has moved, or that has lost the phase-16 row, **aborts** rather than
   falling back.
7. **NEGATIVE, added after the first live run** — the window **stops at a table-row boundary**.
8. **POSITIVE through the same restriction** — a name **wrapping a line** inside one paragraph is
   still found, so the fix in (7) cannot be "stop at the first newline".
9. **POSITIVE** — **two assertions in one paragraph are scored separately**, so a wrong name is not
   rescued by a right one inside its window.
10. **NEGATIVE** — a file declaring itself superseded in its own head is exempt throughout, past any
    lookback.

## The first live run found two defects in the gate and four real instances — which is what a first live run is for

**Defect 1 — the window read across a table row.** A fixed 240-character window from *"phase 12 is
checked"* in `CLAUDE.md`'s own table ran into the row below and picked up *"15 = environment and
energy"*, reporting the authority as contradicting itself. **Same class as `t[i:i+9000]` missing
L-0110's source** — a fixed-size window over variable-length structures, silent in whichever
direction it happens to fail. Now bounded by paragraph and table-row boundaries, with control 7, and
control 8 exists so the obvious over-correction cannot pass.

**Defect 2 — a wrong name rescued by a right one.** `PROPOSALS-2026-08-06.md` initially passed
because a corrected sentence 200 characters later put *"shocks calibration"* inside the wrong
assertion's window. **A hole that widens silently with the window.** Each assertion is now scored
against its own span, up to the next assertion; control 9 asserts it.

**Four real instances, all fixed by stating the withdrawal rather than by deleting the text**, which
is the convention the gate exists to enforce:
- `PHASE-16-SCOPE.md` — a superseded-as-to-the-name header; the file's subject *is* the disagreement,
  so its occurrences stay and are marked.
- `PROPOSALS-2026-08-06.md` — the withdrawn sentence quoted inside the clause withdrawing it, and a
  line saying **the three proposals below do not depend on the phase's name**.
- `RULING-5-AND-FOUR-REPORTS.md` ×2 — my own report, reworded to say the wording was withdrawn.

## What it does not bind — in its own header, not implied by a green line

- **A phase named without its number** (*"the shocks phase"*). No object to key on.
- **A name that has never been in the table and has never been withdrawn.** The vocabulary is closed
  by construction, so a wholly novel wrong name is invisible. **This is the real limit** and it is
  why `SUPERSEDED_NAMES` is committed with a reason per entry: adding a name is how a withdrawal
  enters scope, and forgetting to is how one escapes it.
- **Any state line about anything other than a phase.** The general convention — every state line
  dated and object-named — is still owed and still unbuilt.
- **Whether the table itself is right.** It is the authority; the gate cannot audit it.

**And the general conclusion batch 14 reached is not overturned.** This form transfers only where all
three properties hold — a named machine-identifiable object, an authority declared in the corpus, and
a closed vocabulary. **Where one is missing it does not, and saying so here is the point of the
paragraph.**

---

**One gate built, controlled and in the build. Three reports. One verbatim print, with the gap in the
source named rather than papered over. No record authored or edited, no schema or enum change, no
phase opened, and neither (a) nor (c) resolved.**
