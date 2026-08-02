# KASHMIR-AS-PRIMARY FLAGS — phase 11, kashmir-security, stage 3 (`--dry`)

**Date:** 2026-08-02. **Records authored:** 15 ledger · 15 series · 17 provenance · 7 pairs.

Every record in this drop was filed **provisionally per the written definition** of the `kashmir` domain
value, which reads verbatim:

> "kashmir: a cross-cutting lens, applied to records whose primary subject sits elsewhere."

That means `kashmir` stands alone on nothing authored here. Every ledger record carries a substantive
primary domain plus `kashmir`; every provenance record carries `kashmir` in `affectsDomains` alongside
`defence` or `governance` or both.

**This file does not amend the definition and proposes no amended wording.** The tension between the
written definition and the material is the output, not a problem to be closed in the same pass that
found it.

---

## The test applied

For each record: **can the record's subject be stated without naming Kashmir, and still be the same
record?**

- **Yes → a true lens use.** The subject is a general one, instantiated here in J&K. Not flagged.
- **No → Kashmir is the primary subject.** The substantive domain attached is the one that fits least
  badly rather than the one that is actually primary. Flagged.

This is the operator's own distinction rendered operable. The worked examples given were: a record about
the machinery of parliamentary answerability which happens to be set in Kashmir is a lens use; a record
about civilians killed in Kashmir encounters, filed under `governance` because nothing better exists, is
not.

---

## FLAGGED — LEDGER (7 of 15)

### L-0110 — Has militancy in Jammu and Kashmir declined since 2019, and on which measure
- **Domains assigned:** `defence`, `kashmir`
- **What it is actually about:** the trajectory of an insurgency in Jammu and Kashmir, and whether the
  measures that report it can bear the claim made on them.
- **Why the assigned primary fits badly:** `defence` ("military and security") is accurate as far as it
  goes and is not a bad fit for the *quantities*. But strip Kashmir out and there is no record left —
  the subject is not military and security in general, it is the condition of one territory. Kashmir is
  not a lens on this record; it is the whole of it.

### L-0114 — Pellet-firing shotguns in Kashmir: the deaths counted, the injuries refused
- **Domains assigned:** `governance`, `kashmir`
- **What it is actually about:** thousands of people injured and an unknown number blinded by a
  crowd-control weapon fired at Kashmiri crowds, and the state's arrangement of the accounting so that
  the harm is unavailable.
- **Why the assigned primary fits badly:** `governance` ("institutions of state, enforcement,
  transparency and rights") carries the refusal half honestly — the national-security exemption, the
  unpublished Expert Committee report, the affidavits left in a case file. It does not carry the harm
  half at all. 777 patients with open-globe injuries is not a transparency finding, and no available
  domain value names bodily harm inflicted by the state.

### L-0115 — Amshipora: a staged encounter, established by the Army itself, and its disposal
- **Domains assigned:** `defence`, `governance`, `kashmir`
- **What it is actually about:** three Kashmiri-region labourers shot dead, dressed with planted
  weapons, recorded as terrorists and buried 125 km away.
- **Why the assigned primary fits badly:** `defence` picks up the military-justice machinery — Court of
  Inquiry, court martial, Armed Forces Tribunal — and `governance` picks up the prosecution-sanction
  bar. Neither names what the record is for, which is that the state's count of militants killed
  contained three civilians for eleven weeks. This is the operator's worked example almost exactly.

### L-0116 — Burial of encounter dead away from home districts, and who declares the identity of the killed
- **Domains assigned:** `governance`, `defence`, `kashmir`
- **What it is actually about:** a practice applied to hundreds of bodies in Kashmir since April 2020,
  resting on no published instrument, and what it does to the reliability of the casualty count.
- **Why the assigned primary fits badly:** `governance` reaches the rights question (burial denied
  without charge, trial or finding) and `defence` reaches the operations context, but the record's
  centre — that identification is declared by the force that killed and the body is then removed — is a
  Kashmir-specific mechanism with no general analogue in the instrument.

### L-0117 — Local recruitment into militancy: the quantity that is constantly quoted and has no instrument
- **Domains assigned:** `defence`, `kashmir`
- **What it is actually about:** how many Kashmiris joined militant organisations, and the fact that
  nobody has ever published a return.
- **Why the assigned primary fits badly:** `defence` fits the subject matter but not the record. This is
  a record about a *Kashmiri* population, counted (or not counted) by *Kashmir* police, on a question
  that exists only because of Kashmir's political condition. Remove Kashmir and there is no quantity.

### L-0118 — Organised stone-pelting to zero: consent or suppression
- **Domains assigned:** `governance`, `kashmir`
- **What it is actually about:** whether Kashmiris have stopped protesting because they consent to the
  arrangement or because the price of protest became prohibitive.
- **Why the assigned primary fits badly:** `governance` catches the published-count-and-undefined-
  category problem and nothing else. The record's actual subject is political sentiment in one
  territory, which no value in the enum names. `governance` here is a filing convenience.

### L-0124 — The only instruments that ever named a perpetrator for civilian deaths in Kashmir, and their termination
- **Domains assigned:** `governance`, `kashmir`
- **What it is actually about:** a Kashmiri civil-society body that counted Kashmiri civilian deaths by
  perpetrator, and its disappearance.
- **Why the assigned primary fits badly:** `governance` is defined as "institutions of **state**,
  enforcement, transparency and rights". JKCCS and APDP are not institutions of state; they are the
  bodies that counted what the state did not. The fit is by extension to rights documentation, and it is
  the least-bad available rather than the correct one.

---

## FLAGGED — SERIES (2 of 15)

The series schema permits **exactly one** domain, so no series can carry the lens at all (see the
structural finding below). The two flagged here are the ones where the single value assigned is a
least-bad fit rather than an actual primary.

### `jk-pellet-deaths` — Protesters killed by pellets in J&K
- **Domain assigned:** `governance`
- **What it is actually about:** seventeen people killed by a crowd-control weapon in Kashmir.
- **Why the assigned domain fits badly:** it is a body count, not an institutional quantity.
  `governance` was chosen because the series' significance is the refusal attached to it, but the series
  itself measures deaths. `defence` was considered and rejected: reading "military and security" onto
  the policing of protest crowds is a wider extension than the words comfortably bear.

### `jk-organised-stone-pelting` — Organised stone-pelting incidents in J&K
- **Domain assigned:** `governance`
- **What it is actually about:** how much protest there was in Kashmir.
- **Why the assigned domain fits badly:** a protest count is not an institution of state, an
  enforcement action, a transparency measure or a right. It is filed under `governance` because it is a
  law-and-order category published by a home ministry, which is a fact about its publisher rather than
  about the quantity.

---

## NOT FLAGGED — and why, stated so the flag is not read as blanket

**Ledger records where `kashmir` is a genuine lens (8 of 15):**

| id | domains | why the subject genuinely sits elsewhere |
|---|---|---|
| L-0111 | governance, defence, kashmir | The subject is a national ministry restating and restructuring a published series without notice. That is a transparency finding about a statistical instrument; J&K is where it happened. |
| L-0112 | governance, defence, kashmir | Same: a column that changed meaning under an unchanged heading, with the footnote arriving fourteen months later. The mechanism is general and reproducible. |
| L-0113 | governance, defence, kashmir | The subject is a bounding sentence that sits where transcription does not reach. The research's own verdict is that the finding is "the instrument's boundary, not a rival number". |
| L-0119 | defence, governance, kashmir | Three quantities published under overlapping labels and then a table deleted. A measurement-practice record. |
| L-0120 | governance, defence, kashmir | A cumulative stock discontinued, which never carried one of the three populations it purported to summarise. |
| L-0121 | governance, kashmir | The subject is NCRB's national custodial-crimes architecture and the statutory ceiling on the NHRC. Both are national; their bite in J&K is the lens. |
| L-0122 | governance, kashmir | The subject is a prosecutorial-immunity mechanism and a decision rule no holder admits to holding. A machinery-of-prosecution record. |
| L-0123 | governance, kashmir | **The operator's own example.** The subject is a legislature's power to compel an answer, and what happens to a quantity when that power is removed. Set in J&K; not about J&K. |

**Provenance (0 of 17 flagged) and pairs (0 of 7 flagged) — a stated principle, not an oversight.**
A provenance record's subject is by construction a measurement instrument, and a pair's subject is by
construction a comparison between instruments. On the test applied above, both layers describe general
objects — a composite figure, a restatement, an undefined threshold, a source attribution — instantiated
in J&K. Flagging them would make the flag mean "this record concerns Kashmir", which is not what it is
for. If the operator's test is the broader one, all 17 provenance records and all 7 pairs would flag,
and the count below would be 33.

---

## The structural finding the count cannot express

**`series.domain` and `pairs.domain` are single-valued enums.** A series carries exactly one domain; a
pair carries exactly one. So on those two layers the instruction "a substantive primary domain plus
`kashmir` as the lens" is **not expressible at all** — the lens can only be applied by displacing the
substantive value, which the instruction forbids.

The consequence, stated plainly: **all 15 series and all 7 pairs authored here are substantively about
Jammu and Kashmir, and not one of them carries the `kashmir` tag.** Anyone filtering the instrument by
`kashmir` will find 15 ledger records and 17 provenance records from this phase and no series and no
pairs, and will conclude that the domain has no measured spine. It has fifteen series; they are filed
under `defence` (13) and `governance` (2).

Before this phase, 186 series existed and none carried `kashmir`. That was consistent with the lens
reading. It is now also consistent with the lens being unrepresentable in the layer where the numbers
live. Recorded, not resolved.

---

## TOTAL

**9 records flagged** — 7 of 15 ledger, 2 of 15 series, 0 of 17 provenance, 0 of 7 pairs.

Read against the operator's framing: of the four existing records carrying `kashmir`, three carry it
alone as a primary subject, contrary to the written definition. This phase adds **zero** records
carrying it alone, and **nine** where the written definition was honoured and the honest answer is that
it should not have been.
