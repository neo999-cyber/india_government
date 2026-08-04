# Phase 13 — federalism — stage 1 scope note

Run: `/phase federalism --dry`. Base: `main` at 3812807 (+ log commit 849cca7).
Live corpus at stage 1: **216 series · 149 ledger · 99 provenance · 47 pairs**.
Max ids in use, read from every file in every layer: **L-0149 · P-99 · PR-47**. No gaps in
either sequence. Phase 13 authors from L-0150, P-100, PR-48.

## 1. Enum precondition (§6) — PASSES, no trigger D

Eighteen enums across the four schemas, every one carrying per-value written definitions that
meet the threshold (a reader could assign a value from the text alone). Audited: `term`,
`domains`/`domain`, `type`, `assessment` (9 values incl. `awaiting-adjudication`), `tier`,
`confidence`, `reasonKind`, `disputeKind`, `lenses`, `calendar`, `country`, `status` (series
points), `status` (pairs), `xAxis`, `affectsDomains` (+`all`), `directionOfBias`, `kind` (pairs).

Two notes carried forward, neither blocking:

- **`status` names two unrelated enums.** `series.points[].status` is `verified|approx|pending`
  (retrieval state); `pairs.status` is `live|declared-pending` (publication state). No shared
  description text. Not a defect — but a rule written against "status" would hit both.
- **`withheld` is enforced in prose, not in structure.** The definition requires "an identifiable
  refusal", and there is no `requester`/`requestDate` field. The named-requester/specific-request/
  date requirement therefore has to be carried in `why` on the record itself, and is a hand check.

The three known-inconsistent enums (`directionOfBias`, `type`, `confidence`) are read as written.
**Not resolved in this phase.**

## 2. Domain vs lens — the rule this phase runs on

`federalism` is the one hybrid value in the enum. From the schema, verbatim:

> `domain`: `- federalism: Centre-state relations. Also a lens: GST and groundwater carry it
> alongside their own subject.`

> `lenses`: `- federalism: Centre-state relations bearing on a record whose subject is elsewhere
> — GST as a macro record that moves fiscal authority between Centre and states, groundwater as an
> environment record on a state subject. UNLIKE kashmir this value is ALSO a subject in its own
> right ("Centre-state relations"), so `domain: "federalism"` is legal. What is not legal is
> asserting it on both axes of one record: either alone is correct, both at once says the record's
> subject is a lens over itself (rule `lens-duplicated`).`

Operative consequences for authoring:

- **series and pairs**: single-valued `domain` + optional `lenses[]`. `domain: federalism` is legal
  and already used (2 series, 1 pair). `domain: federalism` **and** `lenses: [federalism]` on one
  record is an error (`lens-duplicated`).
- **ledger**: no `lenses` field exists. `domains[]` is a tag set and carries both uses. The
  domain/lens line **cannot be drawn on the ledger layer at all** — it is not expressible there.
  That is the third instance of the two-axes-in-one-field defect and it is logged, not fixed here.

## 3. What already exists — read before stage 2 spends on it

### 3a. The thirteen federalism-lens ledger records (pre-phase-12)

Eighteen ledger records carry `federalism` in `domains[]`. Five are phase-12 J&K records
(L-0125, L-0127, L-0138, L-0146, L-0147). The other **thirteen** are the standing lens set:

| id | domains | subject | what it already settles | phase 13 relation |
|---|---|---|---|---|
| L-0012 | macro, federalism | Goods and Services Tax | GST's enactment and structure; mentions cess | **AMEND** — the compensation arc, the Council, and every GST series hang off it |
| L-0013 | macro | Corporate tax rate cut | surcharge + cess mechanics on a Union tax | **AMEND** — the cesses/surcharges question collides here |
| L-0040 | welfare, employment, federalism | MGNREGA under an inheriting government | scheme delivery, Centre-funded, state-implemented | **AMEND** — WB stoppage is the CSS-conditionality case |
| L-0051 | infrastructure, macro, federalism | Discom reform: UDAY | Union scheme conditional on state fiscal behaviour | reference only |
| L-0066 | macro, federalism, governance | The three farm laws | Union legislating on a State List subject | reference only (first `reversed`) |
| L-0069 | welfare, federalism | MSP, procurement, legal guarantee | procurement as a Centre-state cost split | reference only |
| L-0071 | environment, federalism | Groundwater depletion | State subject, Union scheme | reference only — the schema's own lens exemplar |
| L-0091 | education, federalism | School closures 2020-22 | state discretion under a national emergency | reference only |
| L-0094 | governance, federalism, education | Teacher-vacancy statistic withdrawn | a Union statistic assembled from state returns | reference only |
| L-0098 | education, governance, federalism | RTE s.12(1)(c) | Union statute, state execution, Union reimbursement | reference only |
| L-0099 | education, governance, federalism | Karnataka's neighbourhood rule | a state rule defeating a Union entitlement | reference only |
| L-0100 | federalism, governance, education | NEP three-language, Tamil Nadu's refusal | a state refusing a Union policy | **AMEND** — TN case state |
| L-0101 | federalism, governance, education | Samagra Shiksha withheld over NEP | **CSS money withheld as leverage** | **AMEND** — the single closest existing record to this phase's scope |
| L-0108 | governance, federalism, education | WB recruitment panel annulled | state recruitment, Union law's reach | reference only |

**The finding that matters: L-0101 already holds the conditionality mechanism this phase is about,
on one scheme.** Phase 13 must generalise it, not restate it. Same for L-0040 on MGNREGA.

### 3b. Delimitation — J&K only. National delimitation is absent.

Authored in phase 12: **L-0141** (J&K delimitation: one Commission table, three denominators),
L-0142 (turnout, four values), L-0143 (five nominated seats), L-0146 (third tier), plus **P-98**
(the J&K electoral instrument) and the series `jk-assembly-seats`.

L-0141 is complete and dense: the 83→90 seat chain read from the Gazette entry by entry, the
47/43 allocation, three denominators (2011 population → 17.17% gap; area → inverts; 2024 roll →
1.31%), `contested`, `differentFacts: false` with a note explaining why the surface deceives.

**Nothing in the corpus touches national delimitation** — no Article 82 freeze, no 1976/2001
extensions, no post-2026-census reallocation of Lok Sabha seats between states, no southern-state
objection. Verified by scanning every ledger and provenance record for `delimitation` and
`Article 82`: five hits, all J&K.

**Decision (Rule 3): phase 13 does not author national delimitation.** It is absent from the
SCOPE the run was given, which named it only under "check what exists". Authoring it would also
run at trigger E against L-0141's frame. Recorded as the strongest single candidate for phase 14.

### 3c. Governors, LG, Article 356 — present, but J&K-only

Stage 1b reported "ZERO ledger records, ZERO provenance records" on this. **That is wrong and was
corrected before it was propagated (M4).** The corpus carries: `Lieutenant Governor` in L-0116,
L-0118, L-0123, L-0138, L-0143 and P-78, P-86; `Governor` in L-0125, L-0126; `President's rule` in
L-0110, L-0118, L-0123, L-0127, L-0128, L-0141 and P-98; `assent` in L-0125, L-0147; `Article 356`
in L-0125. (Plus L-0023, which is the RBI Governor and irrelevant.)

Every one is J&K. What is genuinely absent: Article 200/201 assent by a Governor of a **State**;
the Punjab (2023), Tamil Nadu (2025) and Kerala assent litigation; Article 239AA and the Delhi
arc; any national Article 356 record. **Phase 13 authors these new — but bounded against
L-0125/L-0138/L-0143, which own the J&K LG.**

### 3d. The measured spine — thin to the point of absence

Every existing series matching `gst|tax|cess|surcharg|revenue|devolut|transfer|divisible|fiscal|
debt|grant|deficit|state`:

| id | domain / lens | unit | period | n | breaks |
|---|---|---|---|---|---|
| `fiscal-deficit` | macro | % of GDP | FY2014-15→FY2025-26 | 12 | 2 |
| `genl-govt-debt` | macro | % of GDP | FY2014-15→FY2025-26 | 12 | 0 |
| `genl-govt-debt-peer` | macro | % of GDP | 2014→2024 | 10 | 0 |
| `edu-spend-gdp-{edu-depts, all-depts, centre-edu-depts}` | education | % of GDP | FY2000-01→FY2025-26 | 26 | 4 |
| `jk-xiv-fc-panchayat-grants-{allocated, released}` | **federalism** / kashmir | ₹ crore | FY2015-16→FY2019-20 | 5 | 1 |

**There is no measured spine for this phase at all.** No tax devolution, no divisible pool, no
cess or surcharge collection, no GST revenue or compensation, no CSS outlay, no state own-tax
revenue, no state fiscal deficit, no Finance Commission grant. The two `domain: federalism` series
are J&K panchayat grants. `edu-spend-gdp-centre-edu-depts` against `edu-spend-gdp-all-depts` is
the only existing Centre-against-total split and is the house-style precedent for one.

## 4. The three case states — chosen, with the justification

Chosen on four criteria: both sides of the transfer ledger must be represented, or the phase
carries only the aggrieved contributor's case; each thread of the scope must be live in at least
two of the three; each must already appear in the instrument so the phase amends; and each must
have retrievable primary instruments.

**1 — Tamil Nadu.** Net contributor. The assent question is *decided* there, not merely alleged:
the Supreme Court's 8 April 2025 judgment on ten reserved bills is the only Indian case in which
assent has been deemed. Already in the instrument twice (L-0100 NEP refusal, L-0101 Samagra
Shiksha withheld), so the phase amends rather than duplicates. A manufacturing state, so it sits
on the losing side of destination-based GST — which is the compensation guarantee's own rationale.

**2 — West Bengal.** The CSS-conditionality case at its sharpest: MGNREGA funds stopped under
s.27 of the Act from December 2021, the longest total stoppage of a Union scheme against a state.
Already in the instrument (L-0040, L-0108). A net *recipient*, so on devolution it sits opposite
Tamil Nadu while sitting alongside it on withholding — and that separation is the analytically
load-bearing thing, because it splits the devolution dispute from the conditionality dispute,
which the public argument runs together.

**3 — Bihar.** The largest per-capita beneficiary of the horizontal formula and the direct
counterparty to Tamil Nadu's loss under the income-distance criterion. Without it the phase
carries only the contributor states' case, and the contributor states' memoranda are exactly the
party-produced sources the run was warned about. A consuming state, so it gained where Tamil Nadu
lost under GST's destination principle — completing a clean three-way on the same reform. Lowest
own-tax base of the three, so the cesses question (which shrinks the shared pool) bites hardest.

**Reserve, named and not chosen: Kerala.** Its Article 131 original suit against the Union is the
single best instance of both sides' facts on one court ledger. Rejected because its subject is the
net borrowing ceiling under Article 293, which is adjacent to the five threads this run was scoped
on rather than inside them. If stage 2 finds a borrowing-limit thread it cannot avoid, Kerala
enters as a fourth and the reason is recorded.

**Delhi is not a case state.** The scope names "the office of the LG", and Delhi (Art. 239AA, the
2018 and 2023 Constitution Benches, the GNCTD (Amendment) Act 2023) is the canonical instance —
but it is a Union Territory, its LG is a different constitutional office from a Governor, and
treating it as a fourth "state" would blur the distinction the phase exists to draw. It is
authored as **subject matter under the governors/LG thread**, not as a case state.

## 5. Periodisation, fixed before research

- **The GST compensation guarantee is a regime, not a break.** It ran five years from 1 July 2017
  and expired 30 June 2022. A compensation series therefore **ends** at the guarantee's own life;
  it does not continue with a seam. The compensation **cess** is a separate series that continues
  past that date, because it was extended to service the back-to-back loans. Two series, not one
  series with a break — modelling it as one would assert a continuity the law does not have.
- **Finance Commission awards break at award boundaries.** 13th (FY2010-11→FY2014-15), 14th
  (FY2015-16→FY2019-20), 15th (FY2020-21 one-year report, then FY2021-22→FY2025-26). The
  devolution share moved 32% → 42% → 41%. Those are real breaks and no series splices them.
- **Rule 5 applies to every ratio-to-GDP.** Where the question permits, prefer a denominator of
  **gross tax revenue** or **the divisible pool** over GDP: it is the more meaningful denominator
  for this phase *and* it sidesteps rule 5a's denominator break at 27 Feb 2026 entirely. Where GDP
  is unavoidable, all three regimes render and the dashed umber band applies.

## 6. Triggers fired at stage 1

**None.** Enum precondition passes (no D). Delimitation and the J&K LG would have fired **E**;
both are resolved by bounding the phase away from them rather than by authoring across them, so E
does not fire. No A, B, C or F possible at this stage.

## 7. Standing constraints on this run

- **No enum value may be added.** The shape-2 presentational state is logged with no home and is
  revisited after phase 14. File on written definitions and flag.
- **The 313 bare-domain-roots cycle is not started.**
- Code does not edit `/data` at source (phase 4b). Raise; the operator applies.
- `--dry`: stop at the drop, do not merge.
