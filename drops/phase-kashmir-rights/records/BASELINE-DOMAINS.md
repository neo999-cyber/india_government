# The three baseline records — substantive domains decided

**L-0003, L-0005, L-0010 carry `kashmir` as their sole domain.** On the domain enum's own text
that is a lens over an unrecorded subject: *"kashmir: a cross-cutting lens, applied to records whose
primary subject sits elsewhere."* A record filing it alone files no subject at all.

**This is a `/data` edit at source (phase 4b). Decided and reported here; NOT applied.**

The `lens-as-subject` rule in `tools/lib/integrity.mjs` deliberately does not reach the ledger —
its own comment says so, and names these three as *"a different defect and not this one"*. So the
gate is green and stays green either way. Nothing forces this; it is correct on the enum's text.

---

## L-0003 — 2010 Kashmir summer unrest → `["governance", "kashmir"]`

~112 civilian deaths June–September 2010 in protest policing, triggered by the Machil fake encounter
and the killing of Tufail Ahmad Mattoo; pellet guns introduced as crowd control.

**Reasoning.** The subject is the state's handling of civilians during unrest. The domain enum's
`defence` line settles it explicitly and in the opposite direction from the obvious guess:
*"defence: armed conflict and counter-insurgency operations, external or internal. The state's
treatment of civilians in those operations files governance, not defence."* The Machil encounter is
the trigger, not the subject.

**This applies a precedent, it does not set one.** Sibling L-0004 (SHRC unmarked graves, same
baseline file, same period) already carries `["kashmir", "governance"]`. Phase 11's L-0114
(pellet-firing shotguns — the record for which L-0003 is the stated baseline) carries
`["governance", "kashmir"]`. Same subject shape, same pair of values, twice already.

## L-0005 — Afzal Guru execution and aftermath → `["governance", "kashmir"]`

Execution at Tihar 9 February 2013; Valley-wide curfew and communications blackout; at least three
protester deaths. The record's own summary calls it *"baseline instance of collective
punishment-adjacent curbs predating 2014."*

**Reasoning.** Curfew, communications blackout and protest policing are `governance` on its written
line — *"institutions of state, enforcement, transparency and rights."* Same route as L-0003.

**Note for this phase's own arc:** L-0005 is the pre-2014 precedent for a Valley-wide communications
blackout, which makes it load-bearing for the phase-12 shutdown records rather than incidental.
A baseline record is exactly what it is for. It should be referenced, not restated.

## L-0010 — J&K floods and assembly election → `["governance", "kashmir"]`, with a flag

Two unrelated events under one date range: September 2014 floods (~277 dead, much of Srinagar
submerged) and the December 2014 assembly election (65.91% turnout, highest in ~25 years, producing
the PDP–BJP coalition).

**Reasoning for `governance`.** The election is `governance` on the written line (institutions of
state), and the election is what the record is cited for — its own summary calls it *"the hinge
between the baseline and Term 1 Kashmir arcs."* It is also the direct baseline comparator for the
2024 assembly poll in this phase.

**The flood half has no clean domain value, and that is the honest finding rather than something to
paper over.** Tested against each candidate's own text:

| Candidate | Written line | Verdict |
|---|---|---|
| `environment` | "land, water, air and the resource base" | **No.** A flood disaster is not the resource base. Filing it here stretches the value past its own text — that is trigger D's application limb. |
| `infrastructure` | "physical networks and their capacity or service" | **No** on this record. L-0001 (2012 grid collapse) files a disaster to the system it broke, which is a real precedent — but L-0010 contains no infrastructure content to hang it on. Applying it would mean adding content, i.e. re-authoring, not re-filing. |
| `human-development` | "outcomes in health, nutrition and survival — what delivery produced" | **No.** 277 deaths is survival, but the value's own clause ties it to what delivery produced. |

**Recommendation: `["governance", "kashmir"]`.** The flood stays in the summary as context, with no
domain asserted for it, because no value fits without being stretched.

**The alternative, flagged not taken: split L-0010 into two baseline records.** That would give the
flood its own record and a fair shot at a domain. It is rejected here because it is a new record and
a precedent about splitting bundled baseline records, not a domain fix — and precedent-setting is an
operator decision under Rule 3, not one to take inside a phase that is not about baselines.

---

## What is NOT proposed

**Do not move `kashmir` out of `domains[]` into a `lenses[]` field on these records.** The ledger has
no `lenses[]` field and should not acquire one: `domains[]` is already multi-valued, so subject and
lens coexist there without either displacing the other. That is the stated design, and the same
comment in `integrity.mjs` that names these three records says so.
