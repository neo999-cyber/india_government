# DOMAIN FIT — phase 11, kashmir-security, stage 3 (`--dry`)

**Date:** 2026-08-02. **Records assessed:** 54 across four layers — 15 ledger, 15 series, 17 provenance,
7 pairs.

Three enum values are in play: `defence`, `governance` and `kashmir`. This file records where each
filing is honest and where it is a forced fit, and works the `defence` question the operator raised as a
possible trigger D.

---

## The three definitions, verbatim

- **`defence`:** "military and security. One record; sparsely attested."
- **`governance`:** "institutions of state, enforcement, transparency and rights."
- **`kashmir`:** "a cross-cutting lens, applied to records whose primary subject sits elsewhere."

## The test applied

A fit is **good** where the record's subject matter is named by the value's own words. A fit is **bad**
where the record lands on a value by family resemblance, or because nothing else is available.

The material divides along a real seam, and that seam is what makes the two substantive values work:

- **The conflict and its casualties** — incidents, encounters, militants killed, security forces killed,
  civilians killed, infiltration, recruitment. These are military and security quantities. `defence`.
- **The instruments and the accountability machinery** — a series restated without notice, a column
  redefined, a bounding sentence that does not survive transcription, a table deleted, a chapter with no
  cell for central-force custody, a prosecution-sanction bar, a legislative route terminated, a
  crowd-control weapon whose injury count was refused. These are institutions of state, enforcement,
  transparency and rights. `governance`.

Most ledger records sit on both, because most findings in this phase are a quantity *and* a fact about
how the quantity is produced. Seven of fifteen carry both.

---

## THE `defence` QUESTION — trigger D, application limb

### What this drop does to the value

| | before | after |
|---|---|---|
| ledger carrying `defence` | 1 (`L-0009`, Depsang) | 10 |
| `defence` as the substantive centre | 0 | 3 (`L-0110`, `L-0117`, `L-0119`) |
| series carrying `defence` | 0 of 186 | 13 |
| provenance carrying `defence` | 0 | 10 |
| subject matter | one external border incident, secondary to `foreign` | seven years of internal counter-insurgency, five casualty populations |

That is a value with one attested use becoming the numerical spine of a phase. The magnitude is not in
dispute and the operator was right to flag it.

### The reading, and it is that the words cover the use

**"Military"** reaches the Army and Rashtriya Rifles conducting encounters against armed militants —
uncontroversially. **"Security"** is the wider word and it is doing work the first does not; otherwise
the definition would read "the armed forces" or "defence policy". It reaches counter-terrorism
operations, infiltration across the Line of Control, and casualties on all sides of an armed conflict.

Nothing in the definition restricts it to external threat, to inter-state relations, or to defence
policy as against defence operations. The trailing clause — "One record; sparsely attested" — is a note
on the *state of attestation*, and the enum uses that form elsewhere for exactly that purpose:
`demography` carries "NEVER USED — no record or series carries it, so its intended boundary is
unattested and this line describes the word, not observed practice." The convention is that the
descriptive clause reports usage; the substantive clause states scope.

**Verdict: assessed, NOT FIRED.** The words genuinely cover the use, and the operator's instruction was
explicit that a stop must not be manufactured where they do. But the trigger's own text names *existing
usage*, and by usage alone this fires — so the reading is stated rather than assumed, and the operator
can overturn it. Full working is in `TRIGGERS.md`.

### Where the line was drawn against `defence`, and why that matters to the answer

The extension is not unbounded, and the restraint is visible in the filings:

- **Crowd control is not `defence`.** `L-0114` (pellet shotguns), `L-0118` (stone-pelting),
  `jk-pellet-deaths` and `jk-organised-stone-pelting` all carry `governance`. Policing a protest crowd
  is enforcement, not military action, and reading "security" onto it is the extension that would
  genuinely stretch the words.
- **Custodial deaths are not `defence`.** `L-0121` carries `governance`, because the subject is NCRB's
  statistical architecture and the NHRC's statutory ceiling.
- **Prosecution sanction is not `defence`.** `L-0122` carries `governance`, because the subject is a
  legal immunity mechanism and a decision rule no ministry admits to holding — notwithstanding that its
  object is soldiers.
- **Answerability is not `defence`.** `L-0123` carries `governance` alone.

If `defence` had been used as a bucket for "anything to do with the security forces", eight further
records would carry it. They do not. The split is 13 series `defence` / 2 `governance`, and it tracks
the seam rather than the actors.

### The alternative reading, stated fairly

There is a real argument the other way, and it should be on the record. In a national-condition
instrument whose other fourteen values are all civil-policy domains, `defence` reads naturally as the
defence-policy domain — the armed forces, procurement, the defence budget — and its only neighbour and
only co-tag is `foreign`. On that reading, the domestic policing of a civilian population by central
armed police forces is not a `defence` subject at all, and this drop would need a new value
(`internal-security` or similar). **That is trigger D's creation limb, and if the operator takes that
reading the drop must be held rather than reworded**, because a new value ships with its written
per-value definition in the same commit and that is not mine to write.

I do not take that reading, for the reason above: "security" is in the definition and is not doing
nothing.

---

## Ledger — 15 records

| id | title | domains | fit | note |
|---|---|---|---|---|
| L-0110 | Has militancy declined since 2019 | defence, kashmir | **good** on `defence` | Militancy levels are a military and security quantity. Flagged for kashmir-primary. |
| L-0111 | Three published figures for 2018 | governance, defence, kashmir | **good** on both | A national ministry restating a published series without notice is transparency; the object counted is security. |
| L-0112 | 'Civilians killed' changed meaning | governance, defence, kashmir | **good** on both | Same shape. |
| L-0113 | Six civilian deaths to 31 July 2016 | governance, defence, kashmir | **good** on both | The finding is the instrument's boundary, which is squarely transparency. |
| L-0114 | Pellet-firing shotguns | governance, kashmir | **bad** | `governance` carries the refusal and not the harm. No enum value names bodily harm inflicted by the state on civilians. Flagged. |
| L-0115 | Amshipora | defence, governance, kashmir | **partly** | `defence` fits the military-justice machinery and `governance` the sanction bar; neither names three civilians recorded as terrorists. Flagged. |
| L-0116 | Burial of encounter dead, and identity | governance, defence, kashmir | **partly** | `governance` reaches the rights question honestly. The identification mechanism has no general analogue. Flagged. |
| L-0117 | Local recruitment | defence, kashmir | **good** on `defence`, weak overall | Recruitment into an armed movement is a security quantity, but the record is about a Kashmiri population counted by Kashmir police. Flagged. |
| L-0118 | Organised stone-pelting | governance, kashmir | **bad** | Political sentiment in one territory. `governance` is a filing convenience. Flagged. |
| L-0119 | Infiltration | defence, governance, kashmir | **good** on both | A cross-border security quantity, and a measurement practice. |
| L-0120 | Cumulative conflict toll | governance, defence, kashmir | **good** on both | A discontinued stock and a population never counted. |
| L-0121 | No cell for central-force custody | governance, kashmir | **good** | Institutions of state and rights, precisely. |
| L-0122 | AFSPA section 7 | governance, kashmir | **good** | Enforcement and rights, precisely. |
| L-0123 | Two quantities lost their legislative route | governance, kashmir | **good** | Institutions of state. The operator's own worked example of a true lens use. |
| L-0124 | JKCCS/APDP termination | governance, kashmir | **bad** | `governance` is defined as institutions of **state**; these are not. Fit by extension to rights documentation. Flagged. |

**Ledger domain distribution:** `defence`+`governance`+`kashmir` 7 · `governance`+`kashmir` 6 ·
`defence`+`kashmir` 2. No record carries `kashmir` alone.

---

## Series — 15 records, and a structural problem

`series.domain` is **single-valued**. The instruction that every record carries a substantive primary
domain plus `kashmir` as the lens is therefore **not expressible on this layer at all**: applying the
lens would mean displacing the substantive value, which the instruction forbids.

So none of the fifteen carries `kashmir`, and every one of them is substantively about Jammu and
Kashmir. Thirteen are filed `defence` and two `governance`.

| series | domain | fit |
|---|---|---|
| jk-terrorist-incidents-legacy · -merged · -initiated · jk-encounters-ct-ops | defence | good — incident and operation counts in an armed conflict |
| jk-civilians-killed-terror-basis · -composite · -satp | defence | good — conflict casualty counts |
| jk-security-forces-killed · -satp | defence | good |
| jk-militants-killed | defence | good |
| jk-infiltration-attempts · jk-net-estimated-infiltration | defence | good — cross-border security quantities |
| jkccs-civilians-killed-by-armed-forces | defence | good — a conflict casualty count, notwithstanding its non-official publisher |
| jk-pellet-deaths | governance | **bad** — a body count filed under an institutional value. Flagged. |
| jk-organised-stone-pelting | governance | **bad** — a protest count filed under its publisher's ministry. Flagged. |

**The consequence for navigation, and it is severe.** A reader filtering the instrument by `kashmir`
after this merge sees 15 ledger records and 17 provenance records and **no series and no pairs**, and
will reasonably conclude the domain has no measured spine. It has fifteen series. They are invisible to
the filter by construction, not by oversight.

---

## Provenance — 17 records

`affectsDomains` is an array, so the lens is expressible here and every record carries it. Ten carry
`defence`, fifteen carry `governance`, and eight carry both.

| ids | domains | fit |
|---|---|---|
| P-71, P-72, P-73, P-78, P-85, P-86 | defence, governance, kashmir | good — a measurement dispute about a security quantity is both |
| P-74 | defence, governance, kashmir | good |
| P-75 | defence, kashmir | good — a divergence between two counting instruments for one security quantity |
| P-76 | defence, governance, kashmir | good |
| P-77 | defence, governance, kashmir | good |
| P-79, P-80, P-81 | governance, kashmir | acceptable — definitional and disclosure disputes about crowd-control harm; the same `governance` reservation as `L-0114` applies but bites less, because a provenance record's subject genuinely is the definition |
| P-82, P-83 | governance, kashmir | good |
| P-84 | defence, kashmir | good |
| P-87 | defence, governance, kashmir | good |

**`directionOfBias` distribution:** `obscures` 9 · `degrades-precision` 4 · `disputed` 1 ·
`understates-post-2014` 2 · `bridgeExists: true` 1 (P-71 only). The heavy concentration in `obscures` is
a property of the material — most disputes here are about a figure that is missing, merged or withheld
rather than about a figure pushed in a direction — and it is consistent with the field's own structural
note that `disputed`, `obscures` and `degrades-precision` carry the majority of records instrument-wide.

---

## Pairs — 7 records

`pairs.domain` is also single-valued, so the same structural problem applies: no pair carries `kashmir`.
Six are `defence`, one (`PR-29`, pellets) is `governance`.

**One pair that was designed and deliberately not authored.** The convergence between MHA and the
press-derived register on security-force deaths — 91/95, 80/78, 63/56, 42/45 — is the phase's fairness
finding and the government's strongest number, and it belongs beside its counterpart. But the `kind`
enum offers only `coverage-usage` ("a records what was delivered, b what it converted into") and
`contested` ("two instruments measuring the same thing that **disagree**"). These two agree, which is the
whole point, and filing agreement under `contested` would use the value against its own text. **The
finding is carried instead in `jk-security-forces-killed`'s `notes`, in
`jk-security-forces-killed-satp`'s `notes`, and in `L-0110`'s `caseFor`.** Recorded here because a
missing pair is otherwise invisible: the pairs layer can express two instruments that disagree and two
instruments where one side is absent, and cannot express two instruments that corroborate.

---

## What this exercise establishes about the enum

1. **`defence` works, on its words, for the conflict half.** It has never been tested and this phase
   tests it hard. My reading is that it holds; the operator's confirmation is worth having before merge.
2. **`governance` works well for the instruments-and-accountability half** and badly for bodily harm.
   Four of the five bad ledger fits are records where the substance is people injured, killed or buried
   and `governance` was the least-bad available.
3. **`kashmir` cannot do what its definition says it does, on this material** — nine records were filed
   per the definition where Kashmir is honestly the primary subject — **and cannot be applied at all on
   two of the four layers.** Both findings are recorded and neither is resolved here.
