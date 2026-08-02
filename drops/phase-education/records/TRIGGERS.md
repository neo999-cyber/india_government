# THE TWO OPEN TRIGGERS — worked up, 2026-08-02

Both were carried out of stage 3 undecided. Neither is a research question; both are calls on the
vocabulary. This file states the case each way and recommends. **Neither has been applied — no record
was edited.**

---

# TRIGGER A — `L-0096`

**The question as raised:** does `assessment` need a value for a measure that ran to completion and
whose outcome was never measured?

## What the record is

The RTE untrained-teacher deadline. Section 23(2) gave in-service teachers five years to qualify,
expiring 31 March 2015 unmet; the 2017 Amendment inserted a *second* proviso with a fresh window to
31 March 2019, deemed in force from 1 April 2015. 13,78,979 teachers registered on an 18-month NIOS
diploma. The window closed and was never extended again.

No enrolled-appeared-passed-certified breakdown was ever published. No count exists of teachers
dismissed or still untrained on 1 April 2019. The Ministry declared the backlog cleared using a
**registration** number.

Authored `contested`, with the stop flagged in `assessmentNote`.

## The constraint that decides the shape of the answer

**`assessment` is a required field** (`ledger.schema.json`, `required`). "Score nothing" is not
available without a schema change. Whatever the record concludes, it must say something.

## Testing the existing values against their own text

| value | why it does or does not fit |
|---|---|
| `worked` / `partly` / `failed` | All three turn on *what share of the objective was achieved*. That share is precisely what was never published. `partly` would launder a registration count into a completion rate — the record's own caveat says so |
| `reversed` | The enacting authority withdrew nothing. Not engaged |
| `too-early` | *"in force but has not run long enough for its stated objective to be testable."* Wrong mechanism. This one ran, ended, and the window closed. It was testable and was not tested |
| `baseline-context` | Tied by schema to term `baseline`. Not available |
| `contested` | *"the evidence supports more than one defensible reading and the record does not choose between them."* — see below |

## The case for a new value

`contested` normally means the evidence points two ways. Here the outcome evidence does not point at
all — it is absent. A reader filtering `contested` gets records where sources conflict, plus this one,
where nothing was published. That is a different state wearing the same label, and it is exactly the
failure the enum rule exists to catch: `reversed` covered two mechanisms for months and nothing
complained.

## The case against, which I think is stronger

**1. Read what the record's two cases actually turn on.** Neither depends on knowing the pass rate.
`caseFor` argues scale, the absence of any replacement supply, that the deadline genuinely was not
extended a third time, and that the Supreme Court held the diploma valid at par. `caseAgainst` argues
a statutory duty missed and retrospectively regularised, a qualification whose duration the Court's
own recital says was reverse-engineered to the residual window, an input reported as an output, and a
credential later adjudicated conditional. **Both are complete arguments about the documented act.**
Neither needs the completion funnel. On its written definition `contested` fits — it is scoring the
measure as documented, not the outcome.

**2. The outcome's absence already has a first-class home, and it is rendering.** L-0096 carries four
`unmeasured[]` entries. The first is *"Whether the 31 March 2019 statutory deadline was met"*. Under
CLAUDE.md rule 4a an absence renders unlike a finding, named, on the record's own page. Asking
`assessment` to carry it as well duplicates a channel the instrument already built for it.

**3. It is the same objection that killed the fifth `reasonKind` this session.** That refusal:
"Discontinued describes the history of the publication where the other four describe the status of the
quantity — that is the `directionOfBias` two-axes defect and a fifth value would build it a second
home." A value meaning *we cannot conclude* describes the state of the evidence where the other six
describe a conclusion about the measure. Same shape, same enum, same session.

The disanalogy worth checking: the `reasonKind` refusal worked because `not-published` was an honest
home. Is `contested` an honest home here? **On reading (1), yes — but only if `assessmentNote` stops
saying it is not.** As authored the note asserts the value is used faute de mieux and is "provisional",
which invites exactly the misreading the value would otherwise avoid.

**4. One member.** Nothing else in this drop would take the new value. The enum rule already records
`never-defined` reaching "one legitimate member in eight" as a defect it *found*, not a design.

## The larger thing this surfaces, which should not be resolved here

**L-0092 carries a near-identical note for a completely different reason:**

> "The assessment vocabulary is built for measures with stated objectives and this record is a
> presentational act… The value may change on review if a value for presentational findings is added."

Two of twenty records use `contested` while stating in their own notes that the vocabulary does not
describe them — for two unrelated reasons. That is not evidence for two new values. It is evidence
that a **required** `assessment` is being demanded of record types it was not built for: a
presentational act, and a measure whose outcome was never published.

That is a question about the field's shape, not its enum. It is bigger than a value and the spec is
explicit: *"Do not resolve one mid-phase; `differentFacts` reached seventeen records because a taxonomy
was resolved in the pass that discovered it."*

## Recommendation

**No new `assessment` value. Keep `contested`.**

1. Rewrite L-0096's `assessmentNote` to say what is being scored — the documented act, on two
   defensible readings neither of which depends on the unpublished outcome — and to point at
   `unmeasured[0]` for what is deliberately not scored.
2. Log L-0092 and L-0096 together as the standing evidence for a later, separate audit of whether
   `assessment` should be scopeable at all. Not this phase.

---

# TRIGGER D — `L-0105`

**The question as raised:** does this record open `demography`?

## The state of the value

`demography` is in the live enum with a written definition:

> "population structure. **NEVER USED** — no record or series carries it, so its intended boundary is
> unattested and this line describes the word, not observed practice."

**Verified against the data, not the comment: 0 records in live `/data` carry it, and 0 in the drop.**

The creation limb of trigger D is therefore not engaged — the value has a definition. The application
limb is, and unavoidably: a value whose existing usage is empty cannot be used *within* its existing
usage.

## What L-0105 is actually about

Two things. Census 2021 never fielded, the 2019 notification superseded, Census 2027 set for a 1 March
2027 reference date with Population Enumeration not yet notified — **an instrument not run and a
question not yet defined.** And literacy's currency: the last complete enumeration is 2011, at 72.98.

`DOMAIN-FIT.md` grades `governance` a **good** fit for the first and `human-development` a **bad** fit
for the second.

## Why `demography` does not fix the bad half

Literacy is not population structure. It is a capability. Substituting `demography` for
`human-development` trades one bad fit for a different bad fit and buys nothing.

**And it would cost something specific: the first use of a never-used value defines it.** Opening
`demography` on a literacy record sets its attested boundary at *"things a census produces"* — which
also covers housing, religion, occupation and disability, and is far wider than "population structure".
That is the failure mode the enum rule exists to catch, in its exact form: `tier` graded the subject
rather than the evidence; `reversed` covered two mechanisms. A value's first member is its precedent,
and this would be a bad one.

## The P-04 premise does not hold

The open item read: *"If so, `P-04` arguably should have opened it first and the two go together."*

**P-04's `affectsDomains` on the live record is `["all"]`.** Opening `demography` on it would *narrow*
its scope. P-04 needs nothing, and the two do not go together.

## The reason this should not be decided now

**The demography question is downstream of the education question.** If an `education` value is created
— which is this drop's requested output and the operator's call at stage 6 — L-0105's second value becomes
`education`, because literacy is an education outcome, and the bad fit resolves without `demography`
being touched at all.

Deciding `demography` first means deciding it for a reason that may cease to exist a week later, and
the decision is not reversible in the way that matters: the first use is the precedent whether or not
the record is later re-filed.

## Recommendation

**Do not open `demography`. Leave L-0105 as `governance` + `human-development`.**

Its bad second value stays in the 56, where it belongs, as evidence for the `education` value rather
than as a problem `demography` was conscripted to solve.

Record for whoever opens it: `demography`'s first use belongs to a record whose subject *is* population
structure — age structure, fertility, sex ratio, dependency, migration. Whichever phase authors those
should open it, and should amend the definition in the same commit to drop "NEVER USED … this line
describes the word, not observed practice", per the enum rule's preventive half.

---

## Both recommendations are "no change"

Stated plainly because that is a claim, not a default. In both cases the existing vocabulary can carry
the record honestly, and in both cases the change on offer would set a precedent wider than the record
that prompted it. What each needs instead is a note rewritten (A) and a bad fit left standing as
evidence (D).
