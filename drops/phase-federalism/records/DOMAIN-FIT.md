# Phase 13 — federalism — DOMAIN / LENS report

`federalism` is the one hybrid value in the enum: a subject in its own right ("Centre-state
relations") and a cross-cutting lens. Both uses are legal. What is not legal is asserting it on both
axes of one record — `domain: "federalism"` together with `lenses: ["federalism"]` says the record's
subject is a lens over itself (`lens-duplicated`).

**No record in this drop asserts both.** Verified mechanically: no `series` or `pairs` record carries
`domain: "federalism"` and `federalism` in `lenses[]`.

---

## The rule this drop used, stated once

The schema's own exemplar draws the line by example (GST as a macro record that moves fiscal
authority; groundwater as an environment record on a state subject) and not by test. A phase
authoring twenty-five series and twenty-five ledger records needs a test, so one was derived from
those examples and applied throughout:

> **Would the quantity exist if the federal question did not?**
> If **no** — the quantity is constituted by Centre-state relations and has no other subject — then
> `domain: "federalism"`.
> If **yes** — the quantity has a subject of its own and the Centre-state dimension is something it
> *also bears on* — then the subject goes in `domain` and `federalism` goes in `lenses[]`.

Worked both ways on the two cases that forced it:

- **GST compensation released to a state** would not exist but for a Centre-state settlement. It has
  no other subject. → `domain: federalism`.
- **MGNREGA funds released to a state** would exist under any constitutional arrangement: the
  quantity's subject is rural employment guarantee delivery, and the federal question is how it is
  routed and by whom it can be stopped. → `domain: welfare`, `lenses: ["federalism"]`.

That is the same shape of distinction the schema draws when it puts GST at `macro` + lens rather than
at `federalism`, and it survives the twenty-five-record test without producing a single record that
reads oddly.

---

## Where the line was HARD to draw — every case, with the decision

### 1. The cess and surcharge series — `macro` + lens, not `federalism`

`cess-surcharge-share-gtr` and `cess-surcharge-share-gtr-excl-compcess`.

**Why it was hard.** These series exist in this drop *only* because of the federalism question: what
they measure is the money the Union does not share. A reader filtering the instrument on `federalism`
and not reaching them would miss the phase's most-cited number.

**Decision: `domain: "macro"`, `lenses: ["federalism"]`.** The test decides it. The composition of
Union taxation between base duties, cesses and surcharges would exist, and would be measured, under
any distribution arrangement — it is a fact about how the Union raises revenue. Its bearing on
Centre-state relations is a consequence of Article 270(1), not the subject of the measurement. The
lens makes it reachable from a federalism filter, which is precisely what `lenses[]` is for.

**The counter-argument, stated because it is strong.** One could say that a levy defined by its
*exclusion from the divisible pool* is constituted by the federal question — that the only thing
making a cess a distinct category at all is Article 270(1). If a reviewer takes that view the two
series move to `domain: federalism` and the lens comes off. Recorded rather than settled silently.

### 2. `divisible-pool-share-gtr` — `federalism`, and it is the reason case 1 could go the other way

**Why it was hard.** This is the same underlying fact as case 1 seen from the other side: the pool is
gross tax revenue minus the cesses and surcharges. Two series measuring complements of one quantity
sitting under different `domain` values looks, at first glance, like an inconsistency.

**Decision: `domain: "federalism"`, no lens.** It is not an inconsistency, and the test says why. The
*divisible pool* is a constitutional object with no existence outside Centre-state distribution:
Article 270 defines it, Article 279 has the auditor certify it, and the Finance Commission's entire
remit is a percentage of it. Cesses would exist without it; the pool would not exist without
federalism. The complement relation is real and is carried by `P-100`, which names
`divisible-pool-share-gtr` as the **corrective** series for the cess dispute — measure the residual
rather than summing the components — which is the strongest possible statement that the two are
tracking one thing from two sides.

### 3. `union-gross-tax-revenue` — `macro`, and NO lens

**Why it was hard.** It is carried in this drop solely as the denominator of four federalism series,
so an argument exists for tagging it with the lens.

**Decision: `domain: "macro"`, no lens.** Applying the lens here would say that any general
macroeconomic aggregate bears on Centre-state relations because a federalism series divides by it.
That reading makes `lenses[]` unfalsifiable — every denominator in the instrument would qualify. The
lens is reserved for records whose *content* bears on the federal question, not for records that
happen to be arithmetic inputs to one. A reader filtering on `federalism` reaches the four ratio
series, which is the right place to reach.

### 4. `gst-compensation-cess-collected` — `macro` + lens, while `tn-gst-compensation-received` is `federalism`

**Why it was hard.** These are the two ends of the same money and they sit under different domains.

**Decision, and the reasoning.** The **cess** is a Union levy on demerit and luxury goods; it is a tax
instrument, measured on the Union's receipt head, and after 30 June 2022 it services debt rather than
funding any transfer at all. Its subject is Union taxation. → `macro` + lens. The **compensation
released to a state** is a payment under a Centre-state settlement statute, computed as protected
revenue minus actual revenue for a named state. It has no subject but the settlement. → `federalism`.
The split is not an artefact: the two objects genuinely diverged in law on 1 July 2022, which is the
same fact the periodisation rule captures when it insists they are two series and not one with a seam.

### 5. The MGNREGA series and `L-0168` — `welfare` + lens on the series, `federalism` first on the ledger

**Why it was hard.** `wb-mgnrega-funds-released` ends at a published 0.00 because a Union minister
exercised a statutory power against one state. On the day the zero was created the quantity was, in
substance, about nothing but Centre-state relations.

**Decision: `domain: "welfare"`, `lenses: ["federalism"]` on all four MGNREGA series.** The test is
about the quantity, not about the event that moved it. Funds released for a rural employment
guarantee are a welfare-delivery quantity in every year of the series including the zero year; what
the federal question supplies is the *reason* for one value. A series whose domain changed because of
one point's cause would be unstable by construction.

**The ledger goes the other way and that is not an inconsistency**, because the ledger layer cannot
express the distinction at all (see below). `L-0168` carries `domains: ["federalism", "welfare",
"employment", "governance"]` with federalism first, because the record's subject *is* the exercise of
a Union power against a state — an event, not a quantity.

### 6. `bihar-own-tax-share-revenue-receipts` and `wb-own-tax-share-revenue-receipts` — `macro` + lens

**Why it was hard.** These carry the Union's case: a state raising a fifth of its own revenue is the
state for which a matching share is designed. Their whole purpose in the drop is federal.

**Decision: `domain: "macro"`, `lenses: ["federalism"]`.** A state's own-tax effort is a fiscal fact
about that state and would be measured under any distribution arrangement. Compare the paired
`bihar-devolution-population-ratio`, which is `domain: federalism` with no lens, because a ratio of a
state's share in *devolution* to its share in population has no existence outside the horizontal
formula.

### 7. `PR-49` and `PR-53` — the only two pairs that take `domain: macro` + lens

Every other pair is `domain: federalism` with no lens. `PR-49` is the cess convention dispute and
`PR-53` is collected-against-credited; both inherit the domain of their `a` side, which is the rule
this drop applied to pairs (a pair's domain follows its subject, and its subject is what side `a`
measures). `PR-51` takes `domain: welfare` + lens for the same reason — its `a` side is the MGNREGA
release series.

### 8. `L-0152` and the `kashmir` tag

**Why it was hard.** The record's subject is the divisible pool moving from 42 to 41 per cent. The
cause is Jammu and Kashmir ceasing to be a state. On the ledger layer there is no lens field, so
`kashmir` in `domains[]` reads as a *subject* claim, and the phase is bounded away from J&K.

**Decision: `kashmir` IS included, with a blocking caveat.** The tag is factually correct — J&K is
the territory whose exit changed the denominator — and omitting it would hide the record from a
reader filtering on `kashmir` who has every reason to want it. The caveat states on the face of the
record that it takes no position on the reorganisation and that its subject is the divisible pool.
This is flagged in TRIGGERS.md as the one place a reviewer might read a trigger-E collision; if so,
the fix is to drop the tag, not the record.

---

## The defect this phase re-confirms: the ledger layer cannot express the distinction at all

`ledger` has **no `lenses` field**. `domains[]` is a single tag set carrying both the subject use and
the lens use, so on that layer the domain/lens line **is not expressible**. This drop did not try to
express it. Every ledger record was filed on the written definition of each domain value it carries,
with the record's primary subject placed first by convention — a convention, not a rule, since the
array is unordered by schema.

The concrete cost is visible in this drop and is worth stating because it is measurable rather than
theoretical. **All twenty-five** new ledger records carry `federalism` in `domains[]`. Of those, on
the series-layer test:

- **seventeen** would be `domain: federalism` — L-0150, L-0151, L-0152, L-0153, L-0154, L-0155,
  L-0161, L-0162, L-0163, L-0164, L-0165, L-0166, L-0167, L-0170, L-0171, L-0172, L-0174;
- **eight** would be `domain: <something else>` + `lenses: ["federalism"]` — L-0156 and L-0157
  (macro: Union tax composition), L-0158, L-0159 and L-0160 (macro: the GST compensation instrument),
  L-0168 and L-0169 (welfare: scheme delivery), L-0173 (macro: a state's own fiscal management);
- and on the ledger those two groups are **indistinguishable**, because both are just `federalism`
  somewhere in an array.

A reader filtering the live ledger on `federalism` after this phase merges will get twenty-five new
records with no way to tell which are about Centre-state relations and which are macro-fiscal or
welfare records that merely bear on them. **That is the third recorded instance of the
two-axes-in-one-field defect and it is logged, not fixed here** — fixing it means adding a field to
`ledger.schema.json`, which is out of scope for a `--dry` authoring stage and is properly a schema
cycle of its own.

---

## Mechanical check

```
series with domain=federalism  : 15   (none carries a federalism lens)
series with lenses=[federalism]:  9   (domains: macro 5, welfare 4)
series with neither            :  1   (union-gross-tax-revenue, macro — case 3 above)
pairs  with domain=federalism  :  5   (none carries a federalism lens)
pairs  with lenses=[federalism]:  3   (domains: macro 2, welfare 1)
lens-duplicated violations     :  0
ledger records carrying federalism in domains[] : 25 of 25
```

Run against the drop on 2026-08-04. `tools/stage4-selfcheck.mjs` reports 0 errors, 0 warnings and
0 unreciprocated references over the same 73 records.
