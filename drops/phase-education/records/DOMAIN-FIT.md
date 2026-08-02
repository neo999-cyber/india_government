# DOMAIN FIT — phase-education, stage 3 (--dry run)

**Date:** 2026-08-02. **Records assessed:** 89 across four layers — 48 series, 20 ledger, 12 provenance, 9 pairs.

There is no `education` value in the domain enum and none was added in this pass. Every record here is filed
provisionally into an existing value. This file records where that filing is honest and where it is a forced fit,
because the count is the requested output and it is the evidence for whether an `education` value is warranted.

## The test applied

A fit is **good** where the record measures something whose *measurement base* and *subject matter* are shared with
the domain's existing members — the test the enum's own description sets ("welfare is the DELIVERY of a scheme,
human-development is the OUTCOME it was meant to produce"). A fit is **bad** where the record lands in a value on
the strength of a family resemblance rather than a shared base.

The context that decides most of it: **`human-development` currently holds only health, nutrition, sanitation and
mortality** — all 7 of its ledger records and all 7 of its series. Anaemia, stunting, wasting, sanitation, farmer
suicides, the hunger index, union health spending. A learning-outcome series landing there **shares no measurement
base with any of them**: not the instrument, not the frame, not the denominator, not the periodicity, not the
custodian. It is filed there because it is an outcome in a person rather than a scheme output, and for no other
reason.

`governance` is the opposite case and it is the pleasant surprise of the exercise. Roughly half the teacher and
data records in this drop are not really *about* teachers or schools at all — they are about a statutory duty
unenforced, a statistic collected and not published, a series discontinued, a court quashing a notification, a
ministry declining to answer a question. That is exactly what `governance` is for, and those fits are genuinely
good. **The domain problem in education is not uniform: the measurement-and-institutions half fits the existing
enum well, and the outcomes half does not fit anywhere.**

---

## Ledger — 20 records

| id | title | domain(s) | fit | why it fits badly |
|---|---|---|---|---|
| L-0090 | NIPUN Bharat and the 2024 foundational-learning recovery | human-development, welfare | **bad** | Measures whether children can read and subtract; every existing `human-development` member measures a body — anaemia, stunting, wasting, mortality, sanitation. Shares no instrument, frame or denominator with any of them. `welfare` carries the delivery half more honestly. |
| L-0091 | India's school closures, 2020-2022 | human-development, federalism | **bad** | A duration of institutional closure, measured in weeks by UNESCO from state administrative orders. `human-development` holds no comparable quantity. `federalism` is a good secondary fit — closure was state-decided and that is the record's own mechanism. |
| L-0092 | The Ministry's two framings of ASER 2024 | governance, human-development | **good** | A transparency finding about what a ministry published and deleted. `governance` covers transparency by its own definition. The `human-development` tag is the weak half and is carried only for navigation to the underlying learning series. |
| L-0093 | UDISE+ moves to individual student records | governance, human-development | **good** | A change to a national statistical system and its disclosure — squarely institutional. The `human-development` tag rides on the enrolment series it breaks. |
| L-0094 | The Union declines to maintain a teacher-vacancy statistic | governance, federalism | **good** | Institutions of state, transparency, and Centre-state division. Both values fit on their written definitions with nothing forced. |
| L-0095 | RTE section 26's ten per cent ceiling breached | governance | **good** | A statutory duty unenforced. `governance` is "institutions of state, enforcement, transparency and rights" and this is enforcement of a numeric statutory obligation. |
| L-0096 | The untrained-teacher deadline, missed and cured | governance | **good** | A statute missed and retrospectively amended; the subject is the legislative act, not the teaching. |
| L-0097 | Devesh Sharma: B.Ed. removed as a primary qualification | governance | **good** | A regulator's notification quashed by a court, and a published category ceasing to correspond to a legal status. |
| L-0098 | RTE section 12(1)(c): the 25 per cent quota | welfare, governance, federalism | **good** | A statutory entitlement with a reimbursement mechanism — `welfare` is "scheme delivery and entitlements" and this is an entitlement delivered through a scheme. The best-fitting substantive education record in the drop. |
| L-0099 | Karnataka's neighbourhood rule | welfare, governance, federalism | **good** | Same entitlement, narrowed by a state rule and upheld by a High Court. All three values are load-bearing. |
| L-0100 | NEP 2020's three-language formula and Tamil Nadu | federalism, governance | **good** | A Centre-state dispute over a Concurrent List subject, with a constitutional question at its centre. `federalism` fits on its written definition. |
| L-0101 | Samagra Shiksha funds withheld from non-adopting states | federalism, governance | **good** | Fiscal conditionality between Centre and states. `federalism` again fits cleanly. |
| L-0102 | Two official education-spending numerators | human-development, macro, governance | **bad** | Filed `human-development` to follow the `health-exp-union` precedent, which is the closest existing analogue — but a share of GDP is a fiscal quantity and shares nothing with anaemia or stunting except that the money is eventually spent on people. `macro` ("fiscal policy") is arguably the better primary and is carried second; the record is filed on precedent rather than on the definition, and that is the forced part. |
| L-0103 | AISHE ceases to be a timely series | governance | **good** | A statistical publication failing to publish. Institutional and transparency, exactly. |
| L-0104 | Higher education: enrolment growth and the shrinking denominator | human-development | **bad** | A participation ratio for 18-23 year olds against a population projection. Nothing in `human-development` measures participation in an institution; its members measure survival, nutrition and disease. Filed there because there is nowhere else for an education *outcome*. |
| L-0105 | Literacy: the last complete enumeration is 2011 | governance, human-development | **bad on the second value** | `governance` is a good fit — this is about a census not conducted and a question not yet notified. `human-development` is the forced half: literacy is a human capability with no measurement kinship to any existing member. See the stop on `demography` below. |
| L-0106 | Single-teacher schools and the ratio norm | governance, human-development | **good** | A statutory staffing duty owed school by school and answered with a national mean, plus a discontinued compliance measure. Enforcement and transparency. The `human-development` tag is the weak half. |
| L-0107 | Contract teaching: collected for every teacher, published for none | employment, governance | **good** | Employment terms of a workforce — `employment` is "work, labour force, earnings and formality" and the record is about formality of appointment, feminisation of a lower tier, and equal pay for equal work. One of the two best fits in the drop. |
| L-0108 | The WBSSC panel annulled, and the law that does not reach it | governance, federalism | **good** | Recruitment fraud, judicial remedy, and a statutory coverage gap along a federal boundary. |
| L-0109 | Private schooling plateaus while the school stock falls | human-development, governance | **bad on the first value** | A composition-of-provision series and a school stock. `governance` carries the flow-not-published finding well; `human-development` carries the share of children in private school, which is not a health, nutrition or survival outcome by any reading. |

**Ledger: 6 of 20 filed where the fit is bad** — L-0090, L-0091, L-0102, L-0104, L-0105 (second value), L-0109
(first value). Two of those six (L-0105, L-0109) are bad only on their secondary value and good on their primary.

---

## Series — 48 records

Series carry exactly one domain, so there is no secondary value to absorb a bad fit. This is where the problem
concentrates.

### Filed `human-development` — 29 series, of which **29 are bad fits**

| ids | what they measure | why the fit is bad |
|---|---|---|
| `aser-std3-reading`, `aser-std3-arithmetic`, `aser-std5-reading`, `aser-std5-arithmetic`, `aser-std3-reading-govt`, `aser-std3-reading-private`, `aser-std8-arithmetic` (7) | Share of children clearing a fixed reading or arithmetic threshold, tested one-on-one in rural households | A learning headcount from an annual NGO household survey. The domain's existing members are NFHS anthropometry, WHO/UNICEF sanitation coverage and NCRB mortality. No shared instrument, custodian, frame, denominator or periodicity. |
| `aser-out-of-school-15-16`, `aser-girls-11-14-not-enrolled`, `aser-private-share-rural` (3) | School participation and sector composition among rural children | Participation in an institution, not an outcome in a body. Closer to `welfare` in kind but not scheme delivery either. |
| `nas-parakh-grade3-language`, `nas-parakh-grade3-maths`, `parakh-grade9-maths`, `parakh-grade3-proficient-language`, `parakh-grade3-proficient-maths` (5) | Mean item-success rates and proficiency headcounts from the official school-based assessment | Same problem, opposite instrument: a paper test administered in schools. Nothing in the domain resembles it. |
| `school-closure-weeks-covid`, `school-closure-weeks-full-covid` (2) | Weeks of institutional closure, India plus the peer panel | A duration of an administrative state, not an outcome of any kind. The worst-fitting series in the drop. |
| `school-enrolment-total-udise`, `ger-primary-udise`, `ger-higher-secondary-udise`, `dropout-secondary-udise`, `private-unaided-enrolment-share-udise` (5) | Enrolment counts, gross enrolment ratios, dropout, management share | Administrative school returns. Filed here for want of anywhere else; arguably `welfare` (provision) or `governance` (the statistical system), and none is right. |
| `edu-spend-gdp-edu-depts`, `edu-spend-gdp-all-depts`, `edu-union-moe-gdp`, `edu-union-be-shortfall-pct` (4) | Public education spending as a share of GDP, and budget execution | Fiscal quantities. Filed on the `health-exp-union` precedent rather than on the definition; `macro` is defensible and was not chosen only because the precedent points the other way. |
| `higher-ed-ger`, `higher-ed-enrolment` (2) | Higher-education participation | Participation in institutions, against a population projection. |
| `literacy-rate-7plus` (1) | Self-declared literacy, ages 7 and above | The nearest thing in the drop to a classic human-development indicator — and it still measures a capability, not health, nutrition or survival. Bad, but the least bad of the 29. |

### Filed `governance` — 15 series, of which **6 are bad fits**

| ids | fit | note |
|---|---|---|
| `schools-above-rte-ptr-primary-dise`, `teacher-vacancy-rate-ssa`, `teacher-vacancy-rate-kvs`, `teacher-vacancy-rate-nvs`, `aishe-publication-lag` (5) | **good** | Statutory compliance shares, vacancy against a statutory ceiling, and a publication-lag series. All are measures *of the state's own conduct*, which is what `governance` is for. `aishe-publication-lag` is the single cleanest fit in the whole drop. |
| `teachers-professionally-qualified-primary-udise`, `teachers-trained-pre-primary-udise` (2) | **good** | Qualification-compliance measures against RTE section 23, whose records are about the category not corresponding to a legal status and about the statute not reaching pre-primary at all. |
| `govt-schools-count`, `private-schools-count` (2) | **bad** | Counts of physical institutions. Filed `governance` because the finding attached to them is the unpublished closure flow — but the series itself is a facility stock, closer to `infrastructure` ("physical networks and their capacity"). |
| `teachers-total-udise`, `ptr-primary-udise`, `ptr-elementary-dise`, `single-teacher-schools-udise`, `single-teacher-schools-share-dise` (5) | **bad** | Capacity and deployment measures — how many teachers, how thinly spread. They are inputs to service provision, not institutional conduct. Filed `governance` because their findings are all about breaks, discontinued indicators and undisclosed base changes, which is the tail wagging the dog. |
| `ugc-provision-gross` (1) | **bad** | A budget line in rupees crore. `macro` would be defensible; `governance` was chosen because the record is about a misread claim and a reclassification, which is again the finding rather than the quantity. |

### Filed `welfare` — 3 series, all **good fits**

`rte-quota-children`, `rte-quota-reimbursement-approval-rate`, `rte-quota-implementing-jurisdictions` — a statutory
entitlement, its reimbursement mechanism and its coverage. "Scheme delivery and entitlements" fits without
straining.

### Filed `employment` — 1 series, **good fit**

`contract-teachers-share-government` — the formality of a workforce's appointment terms, which is `employment` by
its written definition.

**Series: 37 of 48 filed where the fit is bad** — 29 filed `human-development` plus 8 of the 15 filed `governance`. The 7 good `governance` fits are `schools-above-rte-ptr-primary-dise`, `teacher-vacancy-rate-ssa`, `teacher-vacancy-rate-kvs`, `teacher-vacancy-rate-nvs`, `teachers-professionally-qualified-primary-udise`, `teachers-trained-pre-primary-udise` and `aishe-publication-lag`.

---

## Pairs — 9 records

Pairs inherit their domain from the series they join, so their fits track those.

| id | domain | fit | note |
|---|---|---|---|
| PR-17 | human-development | **bad** | Two learning instruments; inherits the learning-series problem. |
| PR-18 | human-development | **bad** | Two closure-duration measures — an administrative state, not an outcome. |
| PR-19 | governance | **good** | A national mean against a discontinued statutory-compliance share. |
| PR-20 | welfare | **good** | An entitlement's delivery against its missing denominator. |
| PR-21 | governance | **good** | A reported rate against an unmaintained statistic. |
| PR-22 | human-development | **bad** | Two fiscal aggregates, filed to match the series' domain. |
| PR-23 | governance | **good** | A published stock against an unpublished flow. |
| PR-24 | human-development | **bad** | Self-declared literacy against a tested reading task; inherits both series' problem. |
| PR-25 | human-development | **bad** | Higher-education entry against unmeasured completion. |

**Pairs: 5 of 9 filed where the fit is bad** — PR-17, PR-18, PR-22, PR-24, PR-25.

---

## Provenance — 12 records

`affectsDomains` is a scope declaration rather than a filing, and provenance may also carry `all`, so the fit
question is weaker here. Recorded for completeness.

| id | affectsDomains | fit | note |
|---|---|---|---|
| P-59 | human-development, governance | **bad on the first** | The dispute is between two learning instruments; the `human-development` scope is inherited from the series it affects, all of which are badly filed. |
| P-60 | human-development, governance | **bad on the first** | Same inheritance. |
| P-61 | human-development, governance | **bad on the first** | A statistical-system change; `governance` carries it, `human-development` rides on the affected series. |
| P-62 | human-development, governance | **bad on the first** | Same. |
| P-63 | governance, human-development | **good on the first** | A measurement break in a state-published indicator. |
| P-64 | governance, federalism | **good** | An unmaintained statistic and a Concurrent List boundary. Both fit. |
| P-65 | human-development, macro, governance | **bad on the first** | A fiscal-definition dispute filed `human-development` to match the series; `macro` is the honest primary. |
| P-66 | human-development, macro, governance | **bad on the first** | Same. |
| P-67 | human-development, governance | **bad on the first** | Same inheritance from the higher-education series. |
| P-68 | human-development, governance | **bad on the first** | Literacy definitions; same problem as the series. |
| P-69 | welfare, governance, federalism | **good** | An entitlement's measurement, its funding mechanism and its federal boundary. |
| P-70 | governance, human-development | **good on the first** | Retrievability of the state's own documents — institutional and transparency. |

**Provenance: 8 of 12 carry a badly-fitting value**, in every case `human-development` inherited from the series
the record affects.

---

## THE COUNT

| Layer | Records | Filed where the fit is bad | Share |
|---|---|---|---|
| Series | 48 | **37** | 77% |
| Ledger | 20 | **6** | 30% |
| Pairs | 9 | **5** | 56% |
| Provenance | 12 | **8** | 67% |
| **Total** | **89** | **56** | **63%** |

**Sixty-three per cent of the records in this drop are filed into a domain value whose written definition does not
describe them.**

### The badly-fitting records, listed

**Series (37):** `aser-std3-reading` · `aser-std3-arithmetic` · `aser-std5-reading` · `aser-std5-arithmetic` ·
`aser-std3-reading-govt` · `aser-std3-reading-private` · `aser-std8-arithmetic` · `aser-out-of-school-15-16` ·
`aser-girls-11-14-not-enrolled` · `aser-private-share-rural` · `nas-parakh-grade3-language` ·
`nas-parakh-grade3-maths` · `parakh-grade9-maths` · `parakh-grade3-proficient-language` ·
`parakh-grade3-proficient-maths` · `school-closure-weeks-covid` · `school-closure-weeks-full-covid` ·
`school-enrolment-total-udise` · `ger-primary-udise` · `ger-higher-secondary-udise` · `dropout-secondary-udise` ·
`private-unaided-enrolment-share-udise` · `edu-spend-gdp-edu-depts` · `edu-spend-gdp-all-depts` ·
`edu-union-moe-gdp` · `edu-union-be-shortfall-pct` · `higher-ed-ger` · `higher-ed-enrolment` ·
`literacy-rate-7plus` · `govt-schools-count` · `private-schools-count` · `teachers-total-udise` ·
`ptr-primary-udise` · `ptr-elementary-dise` · `single-teacher-schools-udise` · `single-teacher-schools-share-dise`
· `ugc-provision-gross`

**Ledger (6):** L-0090 · L-0091 · L-0102 · L-0104 · L-0105 (secondary value only) · L-0109 (primary value only)

**Pairs (5):** PR-17 · PR-18 · PR-22 · PR-24 · PR-25

**Provenance (8):** P-59 · P-60 · P-61 · P-62 · P-65 · P-66 · P-67 · P-68

---

## What the count says

**An `education` value is warranted, and the shape of the case is specific rather than general.**

1. **The pressure is almost entirely on the series layer (77% bad), because a series carries exactly one domain.**
   Ledger records can absorb a bad primary fit behind a good secondary one — L-0105 and L-0109 do exactly that —
   and 14 of 20 ledger records land somewhere honest. A series cannot. If nothing changes, 29 learning, enrolment,
   spending and literacy series sit permanently in `human-development` beside anaemia and stunting, sharing no
   measurement base with any of them, and a reader filtering that domain gets two unrelated instruments in one
   list.

2. **`human-development` is where the damage would land, and it is the value least able to take it.** It currently
   holds 7 series and 7 ledger records, all health, nutrition, sanitation and mortality. This drop would add **29
   series and 9 ledger tags** — quadrupling it, and changing what the value means by weight of arrivals rather than
   by decision. That is the strongest argument here: not that the fit is imperfect, but that filing this way
   silently redefines an existing value.

3. **Do not read the count as "education does not fit anywhere."** The institutional half fits the enum well and
   would keep fitting it: teacher vacancies against a statutory ceiling, a discontinued compliance measure, a
   quashed notification, a publication lag, a Concurrent List dispute, an entitlement's reimbursement mechanism,
   the formality of a teaching workforce. Those are `governance`, `federalism`, `welfare` and `employment`, and
   they are good fits by the definitions as written. **An `education` value should take the outcomes and the
   participation measures — what children learn, who is enrolled, what is spent — and leave the institutional
   records where they are**, in the same way `kashmir` and `federalism` operate as lenses over records whose
   primary subject sits elsewhere.

4. **Two specific filings should be revisited even if no `education` value is added.** The four spending series and
   L-0102 are filed `human-development` on the `health-exp-union` precedent, not on the definition; `macro`
   ("fiscal policy") describes them better and the precedent is one record deep. And `govt-schools-count` /
   `private-schools-count` are facility stocks that `infrastructure` ("physical networks and their capacity")
   describes more accurately than `governance` does.

## The `demography` question — raised, not resolved

**L-0105 (literacy and the deferred census) is the best candidate the `demography` value has ever had**, and it is
filed `governance` instead.

The enum's own description says `demography` is "NEVER USED — no record or series carries it, so its intended
boundary is unattested and this line describes the word, not observed practice." A census not conducted, a
population enumeration not notified, and every post-2011 rate in the instrument resting on projections is
population structure by any reading of the word. But filing it there would be the value's **first use**, and would
therefore establish its boundary by accident, in a phase whose subject is education rather than population.

**This is reported as a stop (trigger D) rather than decided here.** The judgement needed: does L-0105 open
`demography`, or does `demography` stay unattested and this record stay in `governance`? If it opens, `P-04`
(Census 2021 not conducted) is the record that should arguably have opened it first, and the two should be
considered together.
