# Part 09 — AIDC offsetting instruments (with per-document URLs) and the BE-to-Actual devolution series

Retrieval pass for `/phase federalism`. Run date 2026-08-04.

**Environment note (M1):** the system resolver on this machine is broken. All retrievals below were
performed with `dig +short @1.1.1.1 <host>` followed by
`curl --resolve <host>:443:<ip> -A 'Mozilla/5.0'`. Playwright and WebFetch both inherit the broken
resolver and cannot reach anything, so **M1 mode 3 (a different client) is unavailable in this
environment** — any unreachability claim in this file rests on the resolver mode plus a fresh-process
retry only, and is labelled as such.

Resolutions used:
- `www.indiabudget.gov.in` → `164.100.85.252` (the address recorded by a prior pass; still live) and
  also `94.202.207.51` / `94.202.207.57` via the Akamai CNAME chain
  (`www.indiabudget.gov.in-v1.akamaized.net` → `a1881.dscb.akamai.net`). Both addresses returned
  byte-identical responses on a control fetch.
- `web.archive.org` → `207.241.237.3`
- `www.ppac.gov.in` → `164.100.198.160`

Source grades: **T1** = official Indian source retrieved directly. **T4** = anything relayed.

---

## Task A — AIDC instruments

### A1. Budget Speech 2021-22 — T1

- **URL fetched:** `https://www.indiabudget.gov.in/budget2021-22/doc/Budget_Speech.pdf`
- **HTTP:** 200 · **Bytes:** 768,448 · **Pages:** 65
- Retrieved 2026-08-04 via `curl --resolve www.indiabudget.gov.in:443:164.100.85.252`.
- Path in the prior pass **verified correct**, no correction needed.

**(i) Para 188, printed p.36 (PDF page 39) — verbatim:**

> 188. There is an immediate need to improve agricultural infrastructure so that we produce
> more, while also conserving and processing agricultural output efficiently. This will ensure
> enhanced remuneration for our farmers. To earmark resources for this purpose, I propose an
> Agriculture Infrastructure and Development Cess (AIDC) on a small number of items. However,
> while applying this cess, we have taken care not to put additional burden on consumers on
> most items.

Note the speech paragraph itself does **not** name petrol and diesel, does not state a rate, and
does not mention the offsetting cuts. It says only "a small number of items" and "not to put
additional burden on consumers on most items." The mechanism is in the Annexures, not the speech
body. That matters for the record: the offsetting design is disclosed, but not from the floor of
the House.

**(ii) Annexure Part B para 5, printed p.58 (PDF page 61) — verbatim. This is the key passage:**

> 5. Consequent to imposition of Agriculture Infrastructure and Development Cess (AIDC) on
> petrol and diesel, the Basic excise duty (BED) and Special Additional Excise Duty (SAED)
> rates have been reduced on them so that overall consumer does not bear any additional
> burden. Consequently, unbranded petrol and diesel will attract basic excise duty of Rs 1.4,
> and Rs 1.8 per litre respectively. The SAED on unbranded petrol and diesel shall be Rs 11 and
> Rs 8 per litre respectively. Similar changes have also been made for branded petrol and
> diesel. Refer to part C for Agriculture Infrastructure and Development Cess rates on these
> items

The quoted phrase in the task brief — BED and SAED "have been reduced on them **so that overall
consumer does not bear any additional burden**" — **reproduces exactly**, word for word, including
the article-less "overall consumer". Confirmed present at p.58.

This paragraph is also the government's own statement of the **post-change** BED and SAED rates:
petrol BED ₹1.40 / SAED ₹11; diesel BED ₹1.80 / SAED ₹8.

**(iii) Annexure Part C (A), printed p.60, and (B), printed p.61 (PDF pages 63-64) — verbatim:**

Part C header:

> C. Imposition of Agriculture Infrastructure and Development Cess on specified goods
> [w.e.f. 2.2.2021]

Part C (A), customs side, is a twelve-row table (gold/silver/dore bars 2.5%, alcoholic beverages
100%, crude palm oil 17.5%, crude soyabean and sunflower oil 20%, apples 35%, coal/lignite/peat
1.5%, specified fertilizers 5%, peas 40%, kabuli chana 30%, Bengal gram 50%, lentil 20%, cotton
5%), closing:

> For basic customs duty rates on these items refer to part B. Overall there would be no
> additional burden on the consumer on most of these items.

Part C (B), excise side — verbatim:

> (B) On excise side:
> An agriculture Infrastructure and Development Cess (AIDC) of ` 2.5 per litre has been imposed
> on petrol and ` 4 per litre on diesel. For other duties and cess, as revised, consequent to
> imposition of AIDC) on these items refer to part B. Overall there would be no additional
> burden on the consumer.

(The stray `)` after "AIDC" and the backtick-rendered rupee sign are in the source PDF; reproduced
as printed.)

**What the speech document establishes:** the ₹2.50/₹4.00 rates, the effective date 2 Feb 2021, the
post-change BED/SAED rates, and the Union's own statement that the cuts were calibrated to zero
consumer impact. It does **not** state the pre-change rates — those come from A4/A7 below.

---

### A2. Finance Bill 2021 — T1

- **URL fetched:** `https://www.indiabudget.gov.in/budget2021-22/doc/Finance_Bill.pdf`
- **HTTP:** 200 · **Bytes:** 2,292,725 · **Pages:** 318
- Path **verified correct**.

**Clause 115 (customs AIDC), p.82, opening — verbatim:**

> **115.** (1) There shall be levied and collected, in accordance with the provisions of this
> section, **for the purposes of the Union**, a duty of customs, to be called Agriculture
> Infrastructure and Development Cess, on the goods specified in the First Schedule to the
> Customs Tariff Act, 1975 (hereinafter referred to as the Customs Tariff Act), being the goods
> imported into India, at the rate not exceeding the rate of customs duty as specified in the
> said Schedule, for the purposes of financing the agriculture infrastructure and other
> development expenditure.

Marginal note: "Agriculture Infrastructure and Development Cess on imported goods."

**Clause 116 (excise AIDC), pp.82-83, opening — verbatim:**

> **116.** (1) There shall be levied and collected, in accordance with the provisions of this
> section, **for the purposes of the Union**, an additional duty of excise, to be called
> Agriculture Infrastructure and Development Cess, on the goods specified in the Seventh
> Schedule (hereinafter referred to as scheduled goods), being the goods manufactured or
> produced, at the rates specified in column (3) of the said Schedule, for the purposes of
> financing the agriculture infrastructure and other development expenditure.

Marginal note: "Agriculture Infrastructure and Development Cess on excisable goods."

**The phrase requested is confirmed present verbatim in both clauses: "for the purposes of the
Union".** In both it sits in the same syntactic slot — between "in accordance with the provisions
of this section" and the naming of the duty. Both clauses sit under a dedicated chapter heading,
**CHAPTER V — AGRICULTURE INFRASTRUCTURE AND DEVELOPMENT CESS**.

The Notes on Clauses (p.~292) repeat the formula for both, which is a useful second in-document
attestation:

> Clause 116 of the Bill seeks to provide for levy and collection of Agriculture Infrastructure
> and Development Cess as an additional duty of excise, on excisable goods specified in the
> Seventh Schedule, at the rate specified in the said Schedule, **for the purposes of the Union**
> for financing the agriculture infrastructure and other development expenditure.

**Why the phrase is load-bearing.** Article 270(1) puts all Union taxes and duties in the divisible
pool *except* the duties and cesses named in its proviso — Article 271 surcharges, and "any cess
levied for specific purposes under any law made by Parliament". A levy expressed as being "for the
purposes of the Union" and earmarked to a named purpose is the drafting formula that engages that
carve-out. BED, by contrast, is a plain Central Excise duty under the Central Excise Act 1944 and
falls inside the divisible pool. So the two clauses are not merely a new tax; read against the
simultaneous BED cut, they are the transfer mechanism.

**THE SEVENTH SCHEDULE, p.250 — verbatim, as printed:**

> **THE SEVENTH SCHEDULE**
> [See section 116 (1)]
>
> | Item No (1) | Description of goods (2) | Rate (3) |
> |---|---|---|
> | 1. | Motor spirit commonly known as petrol | Rs. 2.50 per litre |
> | 2. | High speed diesel | Rs. 4.00 per litre |

That is the entire Schedule — two rows. **₹2.50/litre petrol and ₹4.00/litre diesel confirmed at
the statutory source**, not at second hand.

---
### A3. Memorandum Explaining the Provisions in the Finance Bill 2021 — T1

- **URL fetched:** `https://www.indiabudget.gov.in/budget2021-22/doc/memo.pdf`
- **HTTP:** 200 · **Bytes:** 1,390,991 · **Pages:** 106
- Path **verified correct**.

**Section IV, printed p.98 (PDF page 100) — verbatim:**

> **IV. IMPOSITION OF AGRICULTURE INFRASTRUCTURE AND DEVELOPMENT CESS (AIDC)
> ON PETROL AND DIESEL**
>
> An Agriculture Infrastructure and Development Cess (AIDC) as an additional duty of excise has
> been proposed on Petrol and High speed diesel vide Clause [116] of the Finance Bill, 2021. This
> cess shall be used to finance the improvement of agriculture infrastructure and other
> development expenditure. The details of the cess are as under:
>
> | S. No. | Commodity | Rate of AIDC [Clause [116] of the Finance Bill, 2021]* |
> |---|---|---|
> | 1 | Motor spirit commonly known as petrol | Rs. 2.5 per litre |
> | 2 | High speed diesel | Rs. 4 per litre |
>
> *Will come into effect immediately owing to a declaration under the Provisional Collection of
> Taxes Act, 1931.

The footnote matters procedurally: the cess bit **immediately on 2 Feb 2021** under the Provisional
Collection of Taxes Act 1931 — before Parliament passed the Finance Act. The BED and SAED cuts,
being notification-driven, took effect the same day. So the two halves of the swap landed together
by design; there was no window in which consumers paid the cess without the offset.

**Section V, heading and opening on printed p.98, rate table on printed p.99 (PDF pages 100-101) — verbatim:**

> **V. CHANGE IN EFFECTIVE RATE OF BASIC EXCISE DUTY AND SPECIAL ADDITIONAL
> EXCISE DUTY ON PETROL AND DIESEL [to be effective from 02.02.2021]**
>
> Consequent to imposition of AIDC, the Basic Excise Duty (BED) and Special Additional Excise
> Duty (SAED) on Petrol and High-speed diesel is being reduced so that consumer does not have to
> bear any additional burden on account of imposition of AIDC. The revised duty structure on
> petrol and HSD shall be as follows.
>
> | A | Item | BED (Rs/Ltr) | SAED (Rs/Ltr) | AIDC (Rs/Ltr) |
> |---|---|---|---|---|
> | 1 | Petrol (unbranded) | 1.4 | 11 | 2.5 |
> | 2 | Petrol (branded) | 2.6 | 11 | 2.5 |
> | 3 | High speed diesel (unbranded) | 1.8 | 8 | 4 |
> | 4 | High speed diesel (branded) | 4.2 | 8 | 4 |

This is the second independent in-budget statement of the "no additional burden" rationale
("so that consumer does not have to bear any additional burden on account of imposition of AIDC"),
and the first that gives all four grades.

**Note the memorandum states only the AFTER rates.** Like the Budget Speech, it does not print the
before column. No 2021-22 budget document retrieved in this pass prints a before/after comparison
for excise — the reader is left to supply the pre-2 Feb rates from elsewhere. That is itself worth
recording: the offset is asserted in prose but never demonstrated in a table anywhere in the budget
papers.

---

### A4. JS(TRU) D.O. letter, 1 February 2021 — T1

- **URL fetched:** `https://www.indiabudget.gov.in/budget2021-22/doc/cen/dojstru1.pdf`
- **HTTP:** 200 · **Bytes:** 3,389,351 · **Pages:** 35
- Path **verified correct**.
- Note: `pdftotext` emitted `Syntax Error: Expected the optional content group list…` on this file.
  The text layer extracted cleanly regardless and the Annexure C table is intact; flagging the
  warning only for reproducibility.

**Annexure C, part II "Excise", printed p.27 (PDF page 30) — verbatim:**

> **II. Excise:**
> An agriculture Infrastructure and Development Cess (AIDC) of Rs 2.5 per litre has been imposed
> on petrol and Rs 4 per litre on diesel as an additional duty of excise [Clause 116 of the
> Finance Bill, 2021 refers]. Accordingly, Basic Excise Duty and the Special Additional Excise
> Duty have been calibrated so that there would be no additional burden on the consumer. The
> table below summarizes the change in various duties applicable to Petrol and Diesel:
>
> | Commodity | BED | SAED | RIC | AIDC | Total |
> |---|---|---|---|---|---|
> | Petrol (unbranded) | 1.40 | 11 | 18 | 2.5 | **32.90** |
> | Petrol (branded) | 2.60 | 11 | 18 | 2.5 | 34.10 |
> | Diesel (unbranded) | 1.80 | 8 | 18 | 4.0 | **31.80** |
> | Diesel (branded) | 4.20 | 8 | 18 | 4.0 | 34.10 |
>
> (column head: "Duty rates applicable with effect from 02.02.2021 (Rs. per litre)")
> BED: Basic Excise Duty; SAED: Special Additional Excise Duty; RIC: Road and Infrastructure
> Cess; AIDC: Agriculture Infrastructure and Development Cess.

**The figures the task brief expected reproduce exactly**: 1.40 / 11 / 18 / 2.5 / **32.90** for
unbranded petrol and 1.80 / 8 / 18 / 4.0 / **31.80** for unbranded diesel. The two branded rows
(both totalling 34.10) were not specified in the brief and are recorded here for completeness.

The letter body, p.~24, para (2) of the Central Excise section, states the mechanism and — usefully
— names the two implementing notifications:

> (2) Agriculture Infrastructure and Development Cess (AIDC) is being imposed on Petrol and
> High-speed diesel falling under CETH 2710 at the rate of Rs. 2.5 per litre and Rs. 4 per litre
> respectively. Simultaneously, Basic Excise Duty and Special Additional Excise Duty on Petrol
> and High-speed diesel is being calibrated. The details of these changes are given in
> Annexure-C. [notification Nos. 01/2021-Central Excise and 02/2021-Central Excise, both dated
> 1st Februarys, 2021 refer]

Note the word chosen throughout the TRU letter is **"calibrated"** — not "reduced". The letter is
the closest any of these documents comes to admitting the two moves were engineered against each
other.

**A composition point that the RIC column makes visible.** Of the ₹32.90 total on unbranded petrol
after the change, only **₹1.40 — 4.3%** sits in the divisible pool as BED. RIC (₹18), SAED (₹11)
and AIDC (₹2.50) are all outside it. On unbranded diesel, ₹1.80 of ₹31.80, or **5.7%**. The AIDC
swap did not create this structure; it was the last increment of a structure already built.

---

### A5. Notification 01/2021-Central Excise (BED substitution) — T1

- **URL fetched:** `https://www.indiabudget.gov.in/budget2021-22/doc/cen/cen0121.pdf`
- **HTTP:** 200 · **Bytes:** 113,977 · **Pages:** 4
- Path **verified correct**.

Header, verbatim:

> [TO BE PUBLISHED IN THE GAZETTE OF INDIA, EXTRAORDINARY, PART II, SECTION 3,
> SUB-SECTION (i)]
> GOVERNMENT OF INDIA / MINISTRY OF FINANCE / (DEPARTMENT OF REVENUE)
> **Notification No. 01/2021-Central Excise**
> New Delhi, the 1st February, 2021

Operative words, verbatim:

> G.S.R…….(E). – In exercise of the powers conferred by sub-section (1) of section 5A of the
> Central Excise Act, 1944 (1 of 1944), the Central Government being satisfied that it is
> necessary in the public interest so to do, hereby makes the following further amendments in the
> notification of the Government of India, Ministry of Finance (Department of Revenue),
> **No. 11/2017-Central Excise, dated the 30th June, 2017**, published in the Gazette of India,
> Extraordinary, Part II, Section 3, Sub-section (i), vide number G.S.R. 793(E), dated the 30th
> June, 2017, namely:-
>
> 1. In the said notification, in the TABLE,-
> (i) against Sl. No. 2, -
>     (a) in column (4), for the entry against item (i) of column (3), the entry **"Rs. 1.40 per
>     litre"** shall be substituted;
>     (b) in column (4), for the entry against item (ii) of column (3), the entry **"Rs. 2.60 per
>     litre"** shall be substituted;
> (ii) against Sl. No. 3, -
>     (a) in column (4), for the entry against item (i) of column (3), the entry **"Rs. 1.80 per
>     litre"** shall be substituted;
>     (b) in column (4), for the entry against item (ii) of column (3), the entry **"Rs. 4.20 per
>     litre"** shall be substituted;

Sl. No. 2 is petrol (items (i) unbranded, (ii) branded); Sl. No. 3 is high speed diesel, same
ordering — confirmed by cross-reading against the Annexure C table at A4, which gives exactly
1.40 / 2.60 / 1.80 / 4.20 in that order.

Commencement and the anti-arbitrage clause, verbatim:

> 3. This notification shall come into force on the 2nd February, 2021.
> 4. Nothing contained in this notification shall apply to the goods manufactured on or before
> the 1st February, 2021 and cleared on or after the 2nd February, 2021.

Signed `(Rajeev Ranjan), Under Secretary to the Government of India`, `[F.No.334/02/2021-TRU]`.

**A crucial detail for tracing the "before" rates**: the closing Note states the principal
notification 11/2017-CE "was … last amended vide notification No.19/2018-Central Excise dated 31st
December, 2019, vide number G.S.R. 980 (E), dated the 31st December, 2019." That citation is
internally inconsistent as printed (a 2018-numbered notification bearing a 2019 date); flagged, and
pursued in A7 below.

Also worth recording: the notification's new Explanation 2(a) enumerates what counts as
"appropriate duties of excise" on petrol, and in doing so lists the whole stack —

> (a) appropriate duties of excise shall mean the duties of excise as leviable under the Fourth
> Schedule to the Central Excise Act, 1944 (1 of 1944), the additional duty of excise leviable
> under **section 112 of the Finance Act, 2018** (13 of 2018), the special additional excise duty
> leviable under **section 147 of the Finance Act, 2002** (20 of 2002) and the additional duty of
> excise (Agriculture Infrastructure and Development Cess) leviable under **clause 116 of the
> Finance Bill, 2021** (15 of 2021), which, by virtue of the declaration made in the said Finance
> Bill under the Provisional Collection of Taxes Act, 1931 (16 of 1931), has the force of law…

That single sentence is the government's own inventory of the levy stack: one Schedule duty (BED,
shareable) and three special/cess levies (RIC under FA2018 s.112, SAED under FA2002 s.147, AIDC
under FB2021 cl.116), none shareable. It also confirms, from the Union's own drafting, that **the
Road and Infrastructure Cess is the s.112 Finance Act 2018 levy** — the 2018 precedent at A8.

---

### A6. Notification 02/2021-Central Excise (SAED substitution) — T1

- **URL fetched:** `https://www.indiabudget.gov.in/budget2021-22/doc/cen/cen0221.pdf`
- **HTTP:** 200 · **Bytes:** 92,391 · **Pages:** 1
- Path **verified correct**.

Verbatim, essentially the whole operative text:

> **Notification No. 02/2021-Central Excise**
> New Delhi, the 1st February, 2021
>
> G.S.R……(E). – In exercise of the powers conferred by section 5A of the Central Excise Act, 1944
> (1 of 1944) **read with section 147 of Finance Act, 2002** (20 of 2002), the Central Government
> being satisfied that it is necessary in the public interest so to do, hereby makes the following
> further amendments in the notification of the Government of India, Ministry of Finance
> (Department of Revenue) **No. 05/2019-Central Excise, dated the 6th July, 2019**, published in
> the Gazette of India, Extraordinary, Part II, Section 3, Sub-section (i), vide number G.S.R.
> 488(E), dated the 6th July, 2019, namely:-
>
> In the said notification, in the Table, -
> (i) against Sl. No. 1, in column (4), for the entry, the entry **"Rs. 11 per litre"** shall be
> substituted;
> (ii) against Sl. No. 2, in column (4), for the entry, the entry **"Rs. 8 per litre"** shall be
> substituted;
>
> 2. This notification shall come into force on the 2nd February, 2021.

Closing Note, verbatim — the trail to the "before" SAED rates:

> Note. - The principal notification No. 05/2019-Central Excise, dated the 6th July, 2019 was
> published in the Gazette of India, Extraordinary, Part II, Section 3, Sub-section (i), vide
> number 488(E), dated the 6th July, 2019 and **last amended vide notification No. 5/2020-Central
> Excise, dated the 5th May, 2020**, vide number G.S.R. 278(E), dated the 5th May, 2020.

So the SAED rates in force immediately before 2 Feb 2021 are whatever notification 5/2020-CE of
5 May 2020 put there. Pursued in A7.

**A structural point.** 02/2021 exercises s.5A of the Central Excise Act **"read with section 147
of Finance Act, 2002"** — SAED's parent provision. SAED is not a Fourth Schedule duty; it is a
Finance Act levy. That is the textual basis for the Receipt Budget's characterisation of SAED as a
surcharge (A9), which in turn is what makes the BED cut, not the BED+SAED cut, the measure of what
left the divisible pool.

---
### A7. Receipt Budget 2026-27, Tax Revenue statement — note 6.05 — T1

- **URL fetched:** `https://www.indiabudget.gov.in/doc/rec/tr.pdf`
- **HTTP:** 200 · **Bytes:** 1,091,488 · **Pages:** 5
- Path **verified correct**. This is the current (2026-27) Receipt Budget; the header line reads
  "Receipt Budget, 2026-2027".

**Note 6.05, p.5 — verbatim:**

> **6.05. Special Additional Excise Duties:** Special Additional Excise Duties (SAED) is leviable
> by the Finance Act, 2002 on Motor Spirit (Petrol) and High Speed Diesel Oil (HSD). **This is
> commonly known as surcharge.**

**Confirmed exactly as the task brief anticipated.** The Union's own Receipt Budget classifies SAED
as a surcharge.

**Why this changes the arithmetic.** Article 270(1) excludes from the divisible pool both cesses
levied for specific purposes and **surcharges on taxes and duties referred to in Article 271**. If
SAED is a surcharge, SAED revenue was *already* outside the shareable pool before 1 Feb 2021.
Cutting SAED therefore moves nothing between pools — it just reduces one non-shareable levy while
another non-shareable levy (AIDC) rises. **Only the BED cut takes money out of the divisible pool.**
So the correct measure of what left the states' shareable pool is the BED reduction alone, not
BED + SAED. This is the correction the brief asked to be recorded, and it is confirmed at source.

**Adjacent notes retrieved in the same pass**, which independently characterise every other
component of the pump-price levy stack — worth having in one place:

> **6.01. Basic Excise Duties:** Basic Excise Duty is leviable under the Central Excise Act at the
> specific rates. This duty is presently leviable on specified petroleum products and tobacco and
> tobacco products in terms of entry no. 84 of List I of Seventh Schedule to the Constitution.

> **6.07.10. Duty of Excise on Motor Spirit and High Speed Diesel Oil (Road and Infrastructure
> Cess):** Road & Infrastructure Cess (RIC) is levied as an additional duty of excise vide the
> Finance Act, 2018 for the purpose of financing infrastructure projects.

> **6.07.11. Agriculture Infrastructure and Development Cess (AIDC):** Agriculture Infrastructure
> and Development Cess is levied as an additional duty of excise vide the Finance Act, 2021 on the
> goods specified in the Seventh Schedule for the purposes of financing agriculture infrastructure
> and other development expenditure.

Note 6.01 is the one that puts BED **inside** the pool: it is a plain Entry 84 List I duty under
the Central Excise Act, with no "for the purposes of the Union" formula and no earmark. Every other
line in the stack carries one or the other.

**A magnitude finding from the same table (Union Excise Duties, head 0038, ₹ crore):**

| Line | Levy | Actual 2024-25 | BE 2025-26 | RE 2025-26 | BE 2026-27 |
|---|---|---|---|---|---|
| 6.01 | Basic Excise Duties | **32,046.69** | 39,180.00 | 45,780.00 | 90,810.00 |
| 6.05 | Special Additional Excise Duties | 142,880.01 | 144,730.00 | 165,930.00 | 169,720.00 |
| 6.07.10 | Road and Infrastructure Cess | 44,674.76 | 47,420.00 | 45,780.00 | 46,930.00 |
| 6.07.11 | Agriculture Infrastructure and Development Cess | 54,364.26 | 57,180.00 | 54,250.00 | 55,490.00 |

Verbatim needle for the two anchor rows:

> `6.01.  Basic Excise Duties  0038  32046.69  39180.00  45780.00  90810.00`
> `6.05.  Special Additional Excise Duties  0038  142880.01  144730.00  165930.00  169720.00`

In Actual 2024-25, **BED — the only shareable line in the group — was ₹32,047 crore against
₹241,919 crore in SAED + RIC + AIDC combined**: the shareable share of the excise-duty group is
about **11.7%**. AIDC alone (₹54,364 crore) is now **1.70x** the entire Basic Excise Duty head. A
levy created in 2021 as an offset now collects more than the shareable duty it partly displaced.

---

### A8. The 2018 precedent — Budget Speech 2018-19 and Finance Bill 2018 — T1

**Document 1 — Budget Speech 2018-19 (with Annexures)**

- **URL fetched:** `https://www.indiabudget.gov.in/budget2018-2019/ub2018-19/bs/bs.pdf`
- **HTTP:** 200 · **Bytes:** 1,595,861 · **Pages:** 62
- Path **verified correct**. The annexure is headed "Annexure VI to Part B of Budget Speech" in the
  document itself; the speech body refers to it as "Annexure 6". Both labels are correct; noting
  the discrepancy so a future pass does not think it missed something.

**Annexure item 4.I, "PROPOSALS INVOLVING CHANGE IN EXCISE DUTY RATES", pp.60-61 — verbatim:**

> **4. PROPOSALS INVOLVING CHANGE IN EXCISE DUTY RATES:**
>
> | | Commodity | Rate of Duty From | Rate of Duty To |
> |---|---|---|---|
> | **I** | **Motor spirit commonly known as petrol and high speed diesel oil** | | |
> | 1. | Levy of Road and Infrastructure Cess on motor spirit commonly known as petrol and high speed diesel oil | -- | Rs. 8 per litre |
> | 2. | Abolition of Additional Duty of Excise [Road Cess] on motor spirit commonly known as petrol and high speed diesel oil | Rs. 6 per litre | Nil |
> | 3. | Basic excise duty on: (i) Unbranded Petrol | Rs. 6.48 per litre | Rs. 4.48 per litre |
> | | (ii) Branded petrol | Rs. 7.66 per litre | Rs. 5.66 per litre |
> | | (iii) Unbranded diesel | Rs. 8.33 per litre | Rs. 6.33 per litre |
> | | (iv) Branded diesel | Rs. 10.69 per litre | Rs. 8.69 per litre |
>
> Note: "Basic Excise Duty" means the excise duty set forth in the First Schedule to the Central
> Excise Tariff Act, 1985.

(Items 4 and 5 of the same block exempt blended fuels and set a ₹4/litre Infrastructure Cess for
four North-East refineries; not part of the offsetting arithmetic.)

**The 2018 arithmetic, checked line by line:**

| Component | From | To | Change |
|---|---|---|---|
| Road and Infrastructure Cess (new) | nil | 8.00 | **+8.00** |
| Additional Duty of Excise [Road Cess] (abolished) | 6.00 | nil | **−6.00** |
| BED, unbranded petrol | 6.48 | 4.48 | **−2.00** |
| BED, branded petrol | 7.66 | 5.66 | **−2.00** |
| BED, unbranded diesel | 8.33 | 6.33 | **−2.00** |
| BED, branded diesel | 10.69 | 8.69 | **−2.00** |

Net change to the consumer, every grade: **+8.00 − 6.00 − 2.00 = 0.00 exactly.** The brief's claim
of "net consumer change zero" reproduces to the paisa on all four grades, and unusually the ₹2 cut
is identical across grades rather than proportional — the cut was sized to the offset, not to the
grade.

**What moved between pools in 2018.** The abolished Additional Duty of Excise [Road Cess] was
itself a cess outside the divisible pool, and the new RIC replacing it is likewise outside it — so
the 6→8 leg is cess-to-cess and moves nothing. The **₹2/litre BED cut is the whole of the
migration**: exactly ₹2 per litre on every grade moved from the shareable pool into the
non-shareable Road and Infrastructure Cess, at zero cost to the consumer. This is the identical
mechanism, three years earlier, and its magnitude is stated far more plainly than in 2021 because
the 2018 annexure prints the **from** column, which the 2021 papers do not.

**Document 2 — Finance Bill 2018, to fix the clause/section numbering**

- **URL fetched:** `https://www.indiabudget.gov.in/budget2018-2019/ub2018-19/fb/bill.pdf`
- **HTTP:** 200 · **Bytes:** 1,082,988

**Bill clause numbering, as printed in the arrangement of clauses (p.~xiv) and the body (p.33):**

> SOCIAL WELFARE SURCHARGE
> **108.** Social Welfare Surcharge on imported goods.
> ROAD AND INFRASTRUCTURE CESS
> **109.** Road and Infrastructure Cess on imported goods.
> **110.** Road and Infrastructure Cess on excisable goods.

Clause 110(1), body, verbatim — the same Article 270 formula as 2021:

> **110.** (1) There shall be levied and collected, in accordance with the provisions of this
> Chapter, **for the purposes of the Union**, an additional duty of excise, to be called the Road
> and Infrastructure Cess, on the goods specified in the Sixth Schedule (hereinafter referred to
> as scheduled goods), being the goods manufactured or produced, at the rates specified in the said
> Schedule **for the purpose of financing infrastructure projects**.

THE SIXTH SCHEDULE, p.69, verbatim:

> **THE SIXTH SCHEDULE**
> (See sections 109 and 110)
>
> | Item No. (1) | Description of goods (2) | Rate (3) |
> |---|---|---|
> | 1. | Motor spirit commonly known as petrol | Rupee 8 per litre |
> | 2. | High speed diesel oil | Rupee 8 per litre |

**The +2 offset is CONFIRMED, and confirmed from both ends.** Bill clauses 108 / 109 / 110 became
Finance Act 2018 sections **110 / 111 / 112**. The confirmation is not an assumption: notification
01/2021-Central Excise, retrieved independently at A5 above, defines "appropriate duties of excise"
on petrol to include "the additional duty of excise leviable under **section 112 of the Finance Act,
2018** (13 of 2018)" — that is the RIC on excisable goods, i.e. Bill clause **110**. 110 + 2 = 112.
The Union's own 2021 notification thus fixes the offset for the 2018 Act.

So the correct citations for the record are the **enacted** sections: **s.110 Finance Act 2018
(Social Welfare Surcharge), s.111 (Road and Infrastructure Cess on imported goods), s.112 (Road and
Infrastructure Cess on excisable goods)**. Citing the Bill clause numbers 108/109/110 as if they
were Act sections would land, respectively, on the customs SWS clause and on Chapter VIII
Miscellaneous provisions concerning the Government Savings Banks Act 1873 — a real and checkable
error, which is presumably why the brief flagged it.

The structural parallel between the two years is exact, in the drafting as well as the arithmetic:

| | 2018 (RIC) | 2021 (AIDC) |
|---|---|---|
| Enabling clause opens | "for the purposes of the Union" | "for the purposes of the Union" |
| Earmark | "for the purpose of financing infrastructure projects" | "for … financing the agriculture infrastructure and other development expenditure" |
| Rate schedule | Sixth Schedule, 2 rows, ₹8 + ₹8 | Seventh Schedule, 2 rows, ₹2.50 + ₹4.00 |
| Offset instrument | BED cut ₹2 on all four grades | BED + SAED cut |
| Stated consumer effect | zero (verifiable from the printed From column) | "no additional burden" (From column not printed) |

---
### A8b. M3 check — the "before" rates are absent from the 2021-22 budget papers

Before treating the pre-change rates as needing an outside source, the absence was verified against
a positive control, per M3.

**Positive control.** Grepping the six retrieved 2021-22 documents for a string I had already read
with my own eyes — the post-change unbranded-petrol BED `1.40` — returns hits in exactly the two
documents where I read it (`dojstru1.pdf`, `cen0121.pdf`) and nowhere else; the composite total
`32.90` returns a hit in `dojstru1.pdf` alone. The extraction and search are therefore working.

**The absence.** Against that control, the candidate pre-change strings `2.98`, `4.83` and `6.48`
(the last being the 2018 pre-change petrol BED, included as a decoy) return **zero substantive
hits** across `Budget_Speech.pdf`, `Finance_Bill.pdf`, `memo.pdf`, `dojstru1.pdf`, `cen0121.pdf` and
`cen0221.pdf`. The two raw matches in `Budget_Speech.pdf` are both false positives on unrelated
figures, confirmed by reading them:

> "expenditure in 2021-2022, are ` 34.83 lakh crores" (total expenditure — matched on "4.83")
> "saw a dramatic increase to 6.48 crore from 3.31 crore in 2014" (income tax returns filed)

**Conclusion, M3-verified: no 2021-22 budget document prints the excise rates that were in force
before 2 February 2021.** Every one of them states only the revised structure. The reader is given
the "no additional burden" assertion and the "to" column, and must reconstruct the "from" column
from elsewhere to check it. That is not a trivial editorial choice — the 2018 annexure, doing the
identical operation, printed both columns (A8). The 2021 papers do not. Whether by design or not,
the effect is that the ₹1.58 and ₹3.03 shifts are not computable from the budget documents alone.

Hence A9 below, which goes to the amending notifications the 2021 notifications themselves name.

**One statutory text not obtained.** I attempted to retrieve section 147 of the Finance Act 2002
(SAED's parent provision, cited in the operative words of notification 02/2021) in order to test the
"surcharge" characterisation against the statute rather than only against the Receipt Budget's
administrative note. `https://www.indiacode.nic.in/bitstream/123456789/2002/1/A2002-20.pdf`
returned **HTTP 302 → an 18,028-byte HTML page** (a site shell, not the Act), and four candidate
paths for a Finance Bill 2002 on indiabudget.gov.in
(`ub2002-03/fb/bill.pdf`, `ub2002-03/fb/fb.pdf`, `budget_archive/ub2002-03/fb/bill.pdf`,
`budget2002-2003/ub2002-03/fb/bill.pdf`) each returned **HTTP 404, 1,245 bytes**. Retried in a fresh
process with the same result. **M1 mode 3 (a different client) is unavailable in this environment**,
so this is a two-mode failure, not a three-mode one. **Section 147 of the Finance Act 2002 is
therefore UNRETRIEVED**, and the statutory framing of SAED is not directly attested here.

This should be treated as a soft edge on the A7 point. What *is* firmly attested is (a) the Receipt
Budget's own note that SAED "is commonly known as surcharge", and (b) that notification 02/2021
exercises s.5A of the Central Excise Act "read with section 147 of Finance Act, 2002" — i.e. SAED is
a Finance Act levy, not a Fourth Schedule excise duty like BED. Both point the same way. A future
pass should still close this by obtaining the s.147 text.

---
### A8c. An arithmetic error in the JS(TRU) Annexure C table (new finding)

While reconciling A4 I found that **one row of the government's own summary table does not add up.**

Summing the printed components against the printed Total:

| Commodity | BED | SAED | RIC | AIDC | Sum of components | Printed Total | |
|---|---|---|---|---|---|---|---|
| Petrol (unbranded) | 1.40 | 11 | 18 | 2.5 | 32.90 | 32.90 | OK |
| Petrol (branded) | 2.60 | 11 | 18 | 2.5 | 34.10 | 34.10 | OK |
| Diesel (unbranded) | 1.80 | 8 | 18 | 4.0 | 31.80 | 31.80 | OK |
| **Diesel (branded)** | **4.20** | **8** | **18** | **4.0** | **34.20** | **34.10** | **MISMATCH, −0.10** |

**This is not a text-extraction artefact.** I rendered the source page to an image at 150 dpi
(`pdftoppm -f 30 -l 30 dojstru1.pdf`, PDF page 30 = printed page 27) and read the table visually.
The branded-diesel row unambiguously prints `4.20  8  18  4.0  34.10`. The correct total is 34.20.
The error looks like the branded-petrol total (34.10, correct on its own row) having been carried
down into the branded-diesel row.

The **component** figure is the reliable one, not the total: BED 4.20 for branded diesel is
independently confirmed twice over — by the memorandum's section V table (A3, "High speed diesel
(branded) … 4.2") and by notification 01/2021-CE itself (A5, Sl. No. 3 item (ii), "Rs. 4.20 per
litre"). So it is the **Total column** that is wrong, by 10 paise, on one row.

**Bearing on the finding: none.** The record's claim rests on the unbranded grades, whose rows are
internally consistent and whose totals (32.90 and 31.80) are correct. The error is worth recording
because the ₹32.90 / ₹31.80 figures are load-bearing and a reader checking them may notice the
neighbouring row failing and doubt the table as a whole. It is one bad cell, not a bad table.

---
### A8d. The constitutional hinge — Article 270(1) and Article 271, retrieved at source — T1

The finding turns on the claim that a cess sits outside the divisible pool and BED does not. That
claim was previously asserted rather than cited, so I retrieved the Constitution itself.

- **URL fetched:** `https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf`
- **HTTP:** 200 · **Bytes:** 2,413,611
- **The Constitution of India**, Legislative Department / Ministry of Law and Justice, as updated to
  1 [May], 2024. Resolved `cdnbbsr.s3waas.gov.in` → 23.40.63.27.

**Article 270(1), p.155-156 — verbatim:**

> **270. Taxes levied and distributed between the Union and the States.**—(1) All taxes and duties
> referred to in the Union List, except the duties and taxes referred to in articles 268, 269 and
> 269A, respectively, **surcharge on taxes and duties referred to in article 271 and any cess levied
> for specific purposes under any law made by Parliament** shall be levied and collected by the
> Government of India and shall be distributed between the Union and the States in the manner
> provided in clause (2).

(Footnote in the source: the article was substituted by the Constitution (Eightieth Amendment) Act
2000, s.3, w.e.f. 1-4-1996; the bracketed list of articles was substituted by the 101st Amendment
w.e.f. 16-9-2016.)

**Article 271, p.156 — verbatim:**

> **271. Surcharge on certain duties and taxes for purposes of the Union.**—Notwithstanding
> anything in articles 269 and 270, Parliament may at any time increase any of the duties or taxes
> referred to in those articles [except the goods and services tax under article 246A,] **by a
> surcharge for purposes of the Union and the whole proceeds of any such surcharge shall form part
> of the Consolidated Fund of India.**

**This settles the AIDC and RIC side cleanly.** The carve-out for cesses is broad and unqualified —
"**any cess levied for specific purposes under any law made by Parliament**". AIDC is a cess levied
by the Finance Act 2021 for the specific purpose of "financing the agriculture infrastructure and
other development expenditure"; RIC is a cess levied by the Finance Act 2018 for "financing
infrastructure projects". Both fall squarely inside the exception, and neither is distributed. BED,
by contrast, is a plain Union List Entry 84 duty with no earmark (Receipt Budget note 6.01, A7) and
so falls inside the general rule and *is* distributed. **The mechanism the finding describes is
constitutionally exactly as stated.**

**One residual uncertainty, stated honestly.** The Article 270(1) exception for surcharges is
narrower than the one for cesses: it covers "surcharge on taxes and duties **referred to in article
271**" — i.e. a surcharge that Parliament has levied under the Article 271 power. It does not cover
anything merely *called* a surcharge. So SAED's exclusion depends on s.147 of the Finance Act 2002
being an Article 271 surcharge, and **I could not retrieve s.147** (see A8b). What supports the
exclusion: the Receipt Budget's own note 6.05 ("This is commonly known as surcharge"); SAED being a
Finance Act levy rather than a Fourth Schedule duty; and its Article-271 shape — Parliament
increasing an existing Union excise duty by a further levy whose proceeds are not assigned. What is
missing: the statutory text.

**Why it does not change the headline number.** The record's stated figures — ₹1.58 petrol and ₹3.03
diesel — are the **BED cut alone**. That is the *conservative* reading, correct if SAED is outside
the pool. If SAED were instead found to be inside the divisible pool, the amount leaving would be
*larger*, not smaller: ₹2.58 and ₹4.03. So the residual uncertainty can only understate the effect,
never overstate it. The figures as carried are safe in either direction, and A7's note 6.05 is the
reason to prefer them over the BED+SAED total.

---
### A9. The pre-2 February 2021 rates, retrieved — T1 (archived copies of CBIC files)

The 2021 notifications name their principal notifications; A9 follows that chain to the rates they
replaced. **Every link in the chain was read**, not inferred.

**The live CBIC notification tree is gone.** Every `htdocs-cbec` notification URL now returns
**HTTP 404 with a 166-byte JSON error body** — including `ce05-2020.pdf`, `ce11-2017.pdf`,
`ce02-2019.pdf`, and the same paths under a `/resources//` prefix (176 bytes). The two candidate
index pages, `www.cbic.gov.in/entities/cbic-content-mst/MTMy` (200, 3,372 bytes) and
`taxinformation.cbic.gov.in/` (200, 3,067 bytes), are JavaScript shells containing no hrefs. The
documents below therefore come from **web.archive.org copies of CBIC files**. An archived copy of a
government file is still the government file — but it is labelled as archived throughout, and there
is **no live primary URL to cite for any of them today**. Mode 3 (a different HTTP client) was
unavailable, so this is a two-mode finding.

**BED before — Notification No. 21/2018-Central Excise, 4 October 2018 (w.e.f. 5 Oct 2018).**
Archived: `https://web.archive.org/web/20181008172224id_/http://www.cbic.gov.in/resources//htdocs-cbec/excise/cx-act/notifications/notfns-2018/cx-tarr2018/ce21-2018.pdf`
— HTTP 200, 156,399 bytes. Verbatim:

> against serial number 2,- (a) in column (4), for the entry against item (i) of column (3), the
> entry **"Rs. 2.98 per litre"** shall be substituted; (b) in column (4), for the entry against item
> (ii) of column (3), the entry **"Rs. 4.16 per litre"** shall be substituted; (ii) against serial
> number 3,- (a) … the entry **"Rs. 4.83 per litre"** shall be substituted; (b) … the entry
> **"Rs. 7.19 per litre"** shall be substituted.
> 2. This notification shall come into force with effect from the 5th October, 2018.

Sl. No. → grade mapping, from the principal notification **11/2017-CE, 30 June 2017** (archived,
HTTP 200, 31,743 bytes):

> 2. | 2710 | Motor spirit commonly known as petrol,- (i) intended for sale without a brand name |
> … (ii) other than those specified at (i)
> 3. | 27101930 | High speed diesel (HSD),- (i) intended for sale without a brand name | … (ii)
> other than those specified at (i)

**SAED before — Notification No. 5/2020-Central Excise, 5 May 2020 (w.e.f. 6 May 2020).**
Archived: `https://web.archive.org/web/20210207213250/https://www.cbic.gov.in/resources//htdocs-cbec/excise/cx-act/notifications/notfns-2020/cx-tarr2020/ce05-2020.pdf`
— HTTP 200, 87,977 bytes. Verbatim:

> (i) against Sl. No. 1, for the entry in column (4), the entry **"Rs. 12 per litre"** shall be
> substituted; (ii) against Sl. No. 2, for the entry in column (4), the entry **"Rs. 9 per litre"**
> shall be substituted;
> 2. This notification shall come into force with effect from the 6th May, 2020.

Sl. No. mapping from **05/2019-CE, 6 July 2019** (archived, 200, 116,294 bytes): Sl. 1 = petrol,
Sl. 2 = high speed diesel. **SAED carries no branded/unbranded split** — one rate per fuel, so ₹12
and ₹9 apply to both grades.

**The chain was walked link by link**, and each intervening notification checked for rate changes:
21/2018 (sets the four BED rates) → 22/2018 (inserts an ATF entry) → 02/2019 (omits Sl.1, edits a
heading) → 07/2019 (RCS/UDAN ATF) → 09/2019, 31 Dec 2019 (**tariff-item codes in column (2) only,
no rate touched**) → nothing in 2020 amends 11/2017 → 01/2021. SAED sub-chain: 05/2019 (₹8 / ₹2) →
03/2020, 13 Mar 2020 (₹10 / ₹4) → 05/2020, 5 May 2020 (**₹12 / ₹9**) → 02/2021 (₹11 / ₹8). So the
four BED rates stood unamended from 5 Oct 2018 to 1 Feb 2021, and the SAED rates from 6 May 2020.

**The 01/2021 citation puzzle, resolved.** The internally inconsistent note flagged at A5 — "No.
19/2018-Central Excise dated 31st December, 2019 … G.S.R. 980(E)" — is a **drafting error in the
notification itself**. The real 31 Dec 2019 amendment to 11/2017-CE is **Notification No.
9/2019-Central Excise** (archived, 200, 500,894 bytes), which amends only tariff-item codes:

> (i) against Sl. No. 3, for the entry in column (2), the entry "2710 19 44, 2710 19 49" shall be
> substituted;

"19/2018-CE dated 6 April 2018, G.S.R. 340(E)" is a real notification, cited in 21/2018's own note;
the number appears to have been pasted in by mistake. **Recording this because it is a live trap:**
following 01/2021's note literally leads to a notification of the wrong year that does not touch
these rates.

**Independent corroboration — PPAC (Ministry of Petroleum) — T1, archived.** The live PPAC site no
longer holds the 2020 file: `https://www.ppac.gov.in/WriteReadData/userfiles/file/PP_2_CustomsExciseTariff_6-6-2020.xls`
returns HTTP 200 but **redirects to an HTML page, not the .xls** (38,502 bytes of HTML), and the
current tariff page carries only `…CustomsExciseTariff_PP_27.03.2026.xls` (2026 rates). The archived
copy — `https://web.archive.org/web/20210203162329id_/https://www.ppac.gov.in/WriteReadData/userfiles/file/PP_2_CustomsExciseTariff_6-6-2020.xls`,
HTTP 200, **121,856 bytes**, genuine OLE2/Excel with internal metadata `Last Saved Time/Date: Sat
Jun 6 2020` — prints, verbatim:

> Petrol | … | Rs.2.98/ltr | Rs.12.00/ltr | Rs.18.00/ltr.
> Petrol (branded) | … | Rs.4.16/ltr | Rs.12.00/ltr | Rs.18.00/ltr.
> High Speed Diesel | … | Rs.4.83/ltr | Rs.9.00/ltr | Rs.18.00/ltr.
> High Speed Diesel (branded) | … | Rs.7.19/Ltr | Rs.9.00/ltr | Rs.18.00/ltr.

Two independent government sources — the amending notification and the Petroleum Ministry's tariff
table — agree on all four BED rates and both SAED rates. **This also confirms RIC = ₹18/litre before
the change**, matching the ₹18 in the JS(TRU) table after it, which is the assumption the
before-totals rest on. (Independently, nothing in the 1 Feb 2021 package amends RIC: the JS(TRU)
letter's Chapter 27 excise items cover the tariff alignment, the AIDC/BED/SAED calibration and
blended-fuel exemptions only.)

**One prior-pass figure refuted.** Branded petrol BED was **₹4.16**, not ₹4.18 — from 21/2018-CE
verbatim, corroborated by PPAC. Branded diesel ₹7.19 is confirmed and its "uncertain" flag can be
cleared.

**Caveat on the archived CBIC texts.** They are the pre-publication "TO BE PUBLISHED IN THE GAZETTE"
versions, which leave the number blank as "G.S.R. (E)". The G.S.R. numbers in this chain are
therefore known only from the *citing* notifications' notes, not from the cited documents. Closing
that would mean going to egazette.gov.in; not done here, since the operative rate language was
already secured. No `-k` was used anywhere; TLS validated on every request.

---

## Task A — the offsetting table, reconciled

**Before (1 Feb 2021) → after (2 Feb 2021), ₹ per litre.** Before-BED and before-SAED from A9;
after-rates from A3/A4/A5/A6; RIC ₹18 unchanged throughout.

| Grade | BED before | BED after | **ΔBED** | SAED before | SAED after | ΔSAED | AIDC | RIC | Total before | Total after | **Pump change** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Petrol (unbranded)** | 2.98 | 1.40 | **−1.58** | 12 | 11 | −1 | +2.50 | 18 | 32.98 | 32.90 | **−0.08 (−8 paise)** |
| Petrol (branded) | 4.16 | 2.60 | −1.56 | 12 | 11 | −1 | +2.50 | 18 | 34.16 | 34.10 | −0.06 (−6 paise) |
| **Diesel (unbranded)** | 4.83 | 1.80 | **−3.03** | 9 | 8 | −1 | +4.00 | 18 | 31.83 | 31.80 | **−0.03 (−3 paise)** |
| Diesel (branded) | 7.19 | 4.20 | −2.99 | 9 | 8 | −1 | +4.00 | 18 | 34.19 | **34.20** | **+0.01 (+1 paisa)** |

### Does −1.58 / −3.03 reconcile exactly?

**Yes — exactly, to the paisa, with no rounding slack.**

- **Petrol (unbranded):** 2.98 − 1.40 = **1.58**. Pump: −1.58 − 1.00 + 2.50 = **−0.08**, i.e. −8
  paise. Cross-checked against the totals: 32.98 − 32.90 = 0.08. Both routes agree.
- **Diesel (unbranded):** 4.83 − 1.80 = **3.03**. Pump: −3.03 − 1.00 + 4.00 = **−0.03**, i.e. −3
  paise. Cross-checked: 31.83 − 31.80 = 0.03. Both routes agree.

The leg-sum identity (ΔBED + ΔSAED + AIDC = total change) holds on all four grades, so the table is
internally consistent as well as consistent with the JS(TRU) totals.

**And the amount that left the divisible pool is the BED cut alone**, per note 6.05 (A7) read with
Article 270(1) (A8d): **₹1.58/litre of petrol and ₹3.03/litre of diesel, unbranded** — precisely the
figures the record carries. Confirmed. (Branded grades: ₹1.56 and ₹2.99.) Were SAED instead found to
sit inside the pool, the figures would be ₹2.58 and ₹4.03 — larger, never smaller, so the carried
values are the conservative ones.

### Two things the reconciliation exposes that the record does not yet carry

**(1) "No additional burden" is not true of every grade — branded diesel went UP.** On branded
diesel the legs are −2.99 (BED) − 1.00 (SAED) + 4.00 (AIDC) = **+0.01**. Branded-diesel buyers paid
**one paisa more** per litre after 2 February 2021. The Budget Speech's "overall consumer does not
bear any additional burden", the memorandum's "so that consumer does not have to bear any additional
burden", and the TRU letter's "no additional burden on the consumer" are each true of three grades
out of four and false, marginally, of the fourth. The magnitude is trivial; the claim's universality
is not.

**(2) The erroneous cell at A8c sits on exactly that row, and conceals it.** The true after-total
for branded diesel is **34.20**; the JS(TRU) letter prints **34.10**. A reader taking the printed
total at face value would compute 34.19 → 34.10 = −0.09, a 9-paise *reduction*, and would never see
the 1-paisa increase. The one arithmetic error in the table is the one cell that would otherwise
show the "no additional burden" claim failing. I have no basis to call that anything but a
coincidence — the far likelier explanation remains a copy-down from the branded-petrol row directly
above, which carries 34.10 correctly — and it should be recorded as an error, not an inference about
intent. But it is worth recording precisely because the error is not neutral in its effect.

### What the two-step, taken together, did

| | Petrol (unbranded) | Diesel (unbranded) |
|---|---|---|
| Left the divisible pool, 2018 (RIC swap, A8) | −2.00 | −2.00 |
| Left the divisible pool, 2021 (AIDC swap) | −1.58 | −3.03 |
| **Cumulative** | **−3.58** | **−5.03** |
| BED remaining after both | 1.40 | 1.80 |
| Cost to the consumer across both operations | −8 paise | −3 paise |

BED on unbranded petrol was ₹6.48 before the 2018 operation and ₹1.40 after the 2021 one; on
unbranded diesel, ₹8.33 to ₹1.80. In both cases the shareable duty was reduced to roughly a fifth of
where it started, the displaced amount reappeared as non-shareable cess, and the pump price moved by
single-digit paise. Every figure in that sentence is sourced above.

---

## Task B — Budget Estimates for tax devolution, FY2014-15 to FY2024-25

All BE figures below were retrieved from the Union Budget's **Budget at a Glance, "Receipts"
page**, line `Less - State's share` / `Less - States' share`, **as originally presented in that
year's own budget**, and each is independently corroborated against the same year's **Receipt
Budget "I. Tax Revenue"** statement, line `Less-States' Share`, **major head 0710** (which carries
the decimals). Unit throughout: **₹ crore**; the documents print "(In crore of Rupees)" / "(In `
crore)". Grade **T1** for every row. Sign convention: the line is negative in the Receipt Budget
because devolution is subtracted from gross tax revenue; magnitudes are shown.

**Locating the right page**, for reuse: the Receipts page of Budget at a Glance is `bag2.pdf` for
2014-15 through 2016-17 and `bag5.pdf` from 2017-18 onward; from 2019-20 to 2021-22 it is inside the
single `Budget_at_Glance/budget_at_a_glance.pdf`.

### B0. The FY2024-25 Actual, and a clawback the series does not show

Retrieved directly by me from the same Receipt Budget as A7 (`https://www.indiabudget.gov.in/doc/rec/tr.pdf`,
HTTP 200, 1,091,488 bytes), Tax Revenue statement, lines 12 and 13. Grade **T1**.

**Verbatim needle (₹ crore; columns are Actual 2024-2025 / BE 2025-2026 / RE 2025-2026 / BE 2026-2027):**

> `12. Less-States' Share            0710   -1286885.44   -1422444.11   -1402054.90   -1526254.58`
> `13. Less-States' share adjustment as per Actual   0710   ...   ...   9084.02   ...`

**So the Actual tax devolution for FY2024-25 is ₹12,86,885.44 crore.** The established
`fc-devolution-rupees` series stops at FY2023-24, so this fills the missing input the gap series
needs for its final year. (Sign convention: the line is negative because in this statement
devolution is *subtracted* from gross tax revenue to reach the Centre's net; the magnitude is the
devolution.)

**A finding the gap series cannot show, from note 13 — verbatim:**

> **13. Less-States' share adjustment as per Actual:** `9,084.02 crore is recoverable from States on
> account of prior period adjustment of tax devolution to be made in this fiscal. This includes
> `8,460.55 crore to be recovered on account of difference between RE 2024-25 and Actuals 2024-25
> and `623.47 crore on account of difference between amount devolved as per Actuals 2023-24 and
> **C&AG certified actuals** for FY 2023-24. The figures are provisional and may change in view of
> any outstanding dues payable to or recoverable from the Union or State Governments.

Two things follow that bear directly on how the `devolution-be-to-actual-gap` series should be read.

**(1) The "Actuals" are not final.** There is a distinction, made by the Union itself, between "the
amount devolved as per Actuals" and the **C&AG certified actuals**, and for FY2023-24 those differ
by ₹623.47 crore. The established value `fc-devolution-rupees` FY2023-24 = 1,129,494 is therefore
subject to a correction of that order depending on which of the two it is. The note also says the
figures "are provisional and may change."

**(2) Over-devolution is recovered from the states in a later year.** ₹8,460.55 crore is being
clawed back in FY2025-26 because FY2024-25 Actuals came in below the RE against which money had
already been released. A gap series measured as (Actual − BE) treats a positive gap as money the
states received above budget; it does not show that some of that money is later reversed. The
₹9,084.02 crore recoverable in FY2025-26 is invisible in an eleven-point BE-to-Actual series.
Neither point invalidates the series — but a reader checking it should know the underlying "Actual"
is a revisable number with a settlement tail, not a closed one.

**Cross-check on the final year.** If Actual FY2024-25 = 1,286,885.44 and the stated gap is +3.2%,
the implied Budget Estimate is 1,286,885.44 / 1.032 = **₹12,47,000 crore**, which the retrieval of
the FY2024-25 BE should land on within rounding. Recorded here so the check is falsifiable, not
retrofitted.

For reference, the BE implied by each stated gap and the established Actual — computed as
BE = Actual / (1 + gap/100) — giving a target for the retrieval to hit or miss:

| FY | Actual (₹ cr) | stated gap % | **implied BE (₹ cr)** |
|---|---|---|---|
| 2014-15 | 337,835 | −11.6 | 382,166 |
| 2015-16 | 506,191 | −3.4 | 524,007 |
| 2016-17 | 607,861 | +6.6 | 570,226 |
| 2017-18 | 605,186 | −0.2 | 606,399 |
| 2018-19 | 746,894 | −3.4 | 773,182 |
| 2019-20 | 650,687 | −19.6 | 809,312 |
| 2020-21 | 595,227 | −24.1 | 784,225 |
| 2021-22 | 883,100 | +35.0 | 654,148 |
| 2022-23 | 948,982 | +16.1 | 817,383 |
| 2023-24 | 1,129,494 | +10.6 | 1,021,242 |
| 2024-25 | 1,286,885 (retrieved above) | +3.2 | 1,247,000 |

---

### B1. The retrieved inputs

| FY | **BE (₹ cr)** | BE source document | HTTP / bytes | Verbatim needle (BE is the last column) |
|---|---|---|---|---|
| 2014-15 | **382,216** | `budget2014-2015/ub2014-15/bag/bag2.pdf` | 200 / 69,417 | `Less - States' share  291547  346992  318230  382216` |
| 2015-16 | **523,958** | `budget2015-2016/ub2015-16/bag/bag2.pdf` | 200 / 69,502 | `Less - States' share  318230  382216  337808  523958` |
| 2016-17 | **570,336.59** | `budget2016-2017/ub2016-17/bag/bag2.pdf` | 200 / 54,187 | `Less - States' share  337808  523958  506193  570337` |
| 2017-18 | **674,565.45** | `budget2017-2018/ub2017-18/bag/bag5.pdf` | 200 / 413,656 | `Less - State's share  506193  570337  608000  674565` |
| 2018-19 | **788,093** | `budget2018-2019/ub2018-19/bag/bag5.pdf` | 200 / 354,049 | `Less - State's share  608000  674565  673005  788093` |
| 2019-20 | **809,133.02** | `budget2019-20/doc/Budget_at_Glance/budget_at_a_glance.pdf` | 200 / 1,341,498 | `Less - State's share  673006  788093  761454  809133` |
| 2020-21 | **784,180.87** | `budget2020-21/doc/Budget_at_Glance/budget_at_a_glance.pdf` | 200 / 1,190,380 | `Less - State's share  761454  809133  656046  784181` |
| 2021-22 | **665,562.74** | `budget2021-22/doc/Budget_at_Glance/budget_at_a_glance.pdf` | 200 / 1,483,268 | `Less - State's share  650678  784181  549959  665563` |
| 2022-23 | **816,649.47** | `budget2022-23/doc/Budget_at_Glance/bag5.pdf` | 200 / 366,401 | `Less - State's share  594997  665563  744785  816649` |
| 2023-24 | **1,021,447.91** | `budget2023-24/doc/Budget_at_Glance/bag5.pdf` | 200 / 1,093,914 | `Less- States' share  898392  816649  915798  1021448` |
| 2024-25 | **1,247,211.28** | `budget2024-25/doc/Budget_at_Glance/bag5.pdf` | 200 / 939,827 | `Less - State's share  948407  1021448  1097342  1129494  1247211` |

(all prefixed `https://www.indiabudget.gov.in/`)

**Three of these years had two budgets**, and the interim BE differs from the full-budget BE. Both
were retrieved:

| FY | Interim BE | Interim source | Full BE | Which the series uses |
|---|---|---|---|---|
| 2014-15 | 387,732 | `budget2014-2015(I)/ub2014-15/bag/bag2.pdf` (200 / 217,800) | 382,216 | **full** |
| 2019-20 | 844,605 | `budget2019-20(I)/ub2019-20/bag/allbag.pdf` (200 / 905,595), p.11 | 809,133 | **full** |
| 2024-25 | 1,219,783 | `budget2024-25(I)/doc/Budget_at_Glance/bag5.pdf` (200 / 806,103) | 1,247,211 | **full** |

This ambiguity is resolved empirically rather than assumed — see B3.

### B2. The Actuals, re-retrieved and checked against `fc-devolution-rupees`

Actuals come from the Receipt Budget two budgets later (`.../rec/tr.pdf`, line `Less-States' Share`,
head 0710), except FY2021-22, whose source Receipt Budget is unusable (see Discrepancies).

| FY | **Actual as retrieved (₹ cr)** | Source | Established `fc-devolution-rupees` | Δ |
|---|---|---|---|---|
| 2014-15 | 337,808.45 | `budget2016-2017/ub2016-17/rec/tr.pdf` (200 / 367,303) | 337,835 | −26.55 |
| 2015-16 | 506,192.96 | `budget2017-2018/ub2017-18/rec/tr.pdf` (200 / 248,357) | 506,191 | +1.96 |
| 2016-17 | 608,000.31 | `budget2018-2019/ub2018-19/rec/tr.pdf` (200 / 326,489) | 607,861 | +139.31 |
| 2017-18 | **673,005.29** | `budget2019-20/doc/rec/tr.pdf` (200 / 472,810) | **605,186** | **+67,819.29 (+11.2%)** |
| 2018-19 | **761,454.15** | `budget2020-21/doc/rec/tr.pdf` (200 / 714,016) | **746,894** | **+14,560.15 (+1.9%)** |
| 2019-20 | 650,677.05 | `budget2021-22/doc/rec/tr.pdf` (200 / 485,935) | 650,687 | −9.95 |
| 2020-21 | 594,996.76 | `budget2022-23/doc/rec/tr.pdf` (200 / 440,209) | 595,227 | −230.24 |
| 2021-22 | **898,392** | `budget2023-24/doc/Budget_at_Glance/bag5.pdf` (200 / 1,093,914) | **883,100** | **+15,292 (+1.7%)** |
| 2022-23 | 948,405.82 | `budget2024-25/doc/rec/tr.pdf` (200 / 607,344) | **948,982** | **−576.18** |
| 2023-24 | 1,129,493.71 | `budget2025-26/doc/rec/tr.pdf` (200 / 899,829) | 1,129,494 | exact |
| 2024-25 | 1,286,885.44 | `doc/rec/tr.pdf` (200 / 1,091,488) — retrieved by me, A7/Task B preliminary | (series ends at 2023-24) | n/a |

Sample needle, FY2017-18 (Receipt Budget 2019-20, p.3):

> `11. Less-States' Share   0710   -673005.29   -768412.57   -736879.65   -809133.02`

### B3. Recomputation — (Actual − BE) / BE × 100

| FY | BE (₹ cr) | Actual (₹ cr) | **computed gap %** | stated gap % | reproduces? |
|---|---|---|---|---|---|
| 2014-15 | 382,216 | 337,808.45 | −11.618 | −11.6 | **yes** |
| 2015-16 | 523,958 | 506,192.96 | −3.391 | −3.4 | **yes** |
| 2016-17 | 570,336.59 | 608,000.31 | +6.604 | +6.6 | **yes** |
| 2017-18 | 674,565.45 | 673,005.29 | −0.231 | −0.2 | **yes** |
| 2018-19 | 788,093 | 761,454.15 | −3.380 | −3.4 | **yes** |
| 2019-20 | 809,133.02 | 650,677.05 | −19.583 | −19.6 | **yes** |
| 2020-21 | 784,180.87 | 594,996.76 | −24.125 | −24.1 | **yes** |
| 2021-22 | 665,562.74 | 898,392 | +34.982 | +35.0 | **yes** |
| 2022-23 | 816,649.47 | 948,405.82 | +16.134 | +16.1 | **yes** |
| 2023-24 | 1,021,447.91 | 1,129,493.71 | +10.578 | +10.6 | **yes** |
| 2024-25 | 1,247,211.28 | 1,286,885.44 | +3.181 | +3.2 | **yes** |

**All eleven stated values reproduce, every one to the stated decimal place. The
`devolution-be-to-actual-gap` series is correct and is now fully authored from primary inputs.**

**The two-budget years are settled by the arithmetic, not by assumption.** Using the *interim*
budget BE instead of the full budget BE breaks all three:

| FY | interim BE | gap with interim BE | stated | |
|---|---|---|---|---|
| 2014-15 | 387,732 | −12.88 | −11.6 | no match |
| 2019-20 | 844,605 | −22.96 | −19.6 | no match |
| 2024-25 | 1,219,783 | +5.50 | +3.2 | no match |

So the series consistently uses the **full budget** — the later of the two — in every year where two
exist. That is a genuine, previously undocumented methodological choice, and it is now pinned by
evidence. It should be recorded as the series' rule, because it is not the only defensible one: for
FY2019-20 the interim BE would have shown the shortfall as −23.0% rather than −19.6%.

### B4. The finding this produced — the gap series is right; the rupee series is not

The recomputation reproduces every stated gap **only when the Union's own Actuals are used**. Run
the same arithmetic against the established `fc-devolution-rupees` values and four years break:

| FY | gap using `fc-devolution-rupees` | gap using Union Actual | stated | |
|---|---|---|---|---|
| 2017-18 | **−10.285** | −0.231 | −0.2 | `fc-devolution-rupees` fails by 10 points |
| 2018-19 | **−5.228** | −3.380 | −3.4 | fails |
| 2021-22 | **+32.685** | +34.982 | +35.0 | fails |
| 2022-23 | **+16.204** | +16.134 | +16.1 | fails on rounding (16.2 vs 16.1) |

The other seven agree either way. **This is decisive about which series carries the error.** The
gap series was evidently computed from the correct Union figures; `fc-devolution-rupees` has since
drifted from them in four years. The largest, FY2017-18, is not a rounding matter — **605,186
against the Union's 673,005.29, a gap of ₹67,819.29 crore, or 11.2%**. Notably 673,005.29 − 605,186
= 67,819.29 exactly, which suggests the stored figure is the Union line net of one specific
component (an IGST-apportionment or prior-year adjustment) rather than a different vintage of the
same number.

FY2018-19 and FY2021-22 look like the same class of problem: the Receipt Budget splits the
devolution line into a base and a separate `Less-States' share adjustment as per Actual`, and the
stored figures appear to be the base without the adjustment. FY2022-23's 576-crore difference is
small but still flips the rounded gap from 16.1 to 16.2.

**Recommended correction (raise at source — code does not edit `/data`):** `fc-devolution-rupees`
FY2017-18 → **673,005**, FY2018-19 → **761,454**, FY2021-22 → **898,392**, FY2022-23 → **948,406**;
and the series can now be extended with FY2024-25 → **1,286,885** (A7/Task B preliminary). The gap
series needs no change.

**A caution on FY2018-19's BE.** Budget at a Glance prints 788,093, but the Receipt Budget 2018-19
splits it as `Less-States' Share −768,412.57` plus `Less-States' share adjustment as per Actual
−19,679.95`, summing to 788,092.52. The BAG headline 788,093 is the correct "as presented" BE and is
what reproduces the stated −3.4; the base tax-devolution line alone (768,413) would give −0.9. Worth
recording, because a future pass reading the Receipt Budget rather than BAG would pick the wrong one.

---
## Discrepancies found

Ordered by consequence.

**D1. `fc-devolution-rupees` FY2017-18 is wrong by ₹67,819.29 crore (11.2%).** Stored value
605,186; the Union's Receipt Budget 2019-20 (p.3, `11. Less-States' Share  0710  -673005.29 …`,
column header "Actual 2017-2018") gives **673,005.29**. I retrieved this document myself, a second
time and independently of the sub-pass that first found it (HTTP 200, 472,810 bytes), and read the
column headers to confirm the first column is Actuals FY2017-18. The stated gap of −0.2% reproduces
only with 673,005.29 (−0.231); the stored value yields −10.285. **Recommend FY2017-18 →
673,005.**

**D2. Three further `fc-devolution-rupees` values disagree with the Union's own Actuals**, each in
the same direction (stored value lower, i.e. apparently the base devolution line without the
Receipt Budget's separate "States' share adjustment as per Actual" component):
FY2018-19 stored 746,894 vs **761,454.15** (−14,560); FY2021-22 stored 883,100 vs **898,392**
(−15,292); FY2022-23 stored 948,982 vs **948,405.82** (+576). All three flip the rounded gap away
from the stated value. **Recommend FY2018-19 → 761,454, FY2021-22 → 898,392, FY2022-23 → 948,406.**
The remaining six years agree within rounding (largest residual: FY2020-21, −230 crore).

**D3. The `devolution-be-to-actual-gap` series itself has no errors.** All eleven values reproduce
to the stated decimal from primary inputs. This is the opposite of what the task anticipated, and
worth stating plainly: the prior hand-check failed for want of inputs, not because the series was
wrong. It can move off `confidence: medium` on the strength of B1-B3.

**D4. Branded petrol BED before the change was ₹4.16, not ₹4.18** (prior pass's uncertain figure).
Refuted by notification 21/2018-CE verbatim and independently by the PPAC tariff table. Branded
diesel ₹7.19 confirmed; its uncertain flag can be cleared.

**D5. A ₹0.10 arithmetic error in the JS(TRU) D.O. letter's Annexure C excise table.** Branded
diesel prints `4.20 | 8 | 18 | 4.0 | Total 34.10`; the components sum to **34.20**. Verified against
a 150-dpi render of the source page, not merely text extraction. The component figures are
corroborated by the memorandum and by notification 01/2021-CE, so the Total cell is the wrong one.
See A8c and the reconciliation section for why this particular cell matters.

**D6. Branded diesel became 1 paisa/litre dearer**, so the "no additional burden on the consumer"
statements in the Budget Speech, the memorandum and the TRU letter hold for three grades of four,
not all four. Trivial in magnitude, but the claim as worded is universal.

**D7. Notification 01/2021-CE misdescribes its own principal notification's amendment history**,
citing "No. 19/2018-Central Excise dated 31st December, 2019, G.S.R. 980(E)" — a 2018 number against
a 2019 date. The actual 31 Dec 2019 amendment to 11/2017-CE is **9/2019-CE**, which changes tariff
codes only. Following the citation literally is a dead end.

**D8. Page-number corrections to the task brief's citations** (all verified against printed folios,
with the folio's position on the page checked by rendering, since the Budget Speech and memorandum
number at the *top* of the page while the TRU letter numbers at the *bottom*):

| Document | Brief said | Actual printed page | PDF page |
|---|---|---|---|
| Budget Speech 2021-22, para 188 | p.37 | **p.36** | 39 |
| Budget Speech 2021-22, Annexure Part B para 5 | p.58 | **p.58** (correct) | 61 |
| Budget Speech 2021-22, Annexure Part C (A) | p.61 | **p.60** | 63 |
| Budget Speech 2021-22, Annexure Part C (B) | p.61 | **p.61** (correct) | 64 |
| Memorandum, section IV | p.99 | **p.98** | 100 |
| Memorandum, section V (heading + opening) | p.99 | **p.98**; rate table on **p.99** | 100-101 |
| JS(TRU) letter, Annexure C part II "Excise" | p.26 | **p.27** | 30 |
| Finance Bill 2021, clauses 115/116 | pp.82-83 | pp.82-83 (correct) | — |
| Finance Bill 2021, Seventh Schedule | p.250 | p.250 (correct) | — |

**D9. The Actuals are revisable, and over-devolution is clawed back.** Receipt Budget 2026-27 note
13 distinguishes "the amount devolved as per Actuals" from **C&AG certified actuals** (₹623.47 crore
apart for FY2023-24) and records ₹8,460.55 crore recoverable from the states because FY2024-25
Actuals fell below the RE already released — ₹9,084.02 crore in total, "provisional and may change".
A BE-to-Actual gap series cannot show a positive gap later being reversed.

**D10. Two documentary hazards for reuse.** (i) `budget2023-24/doc/rec/tr.pdf` (HTTP 200, 3,947,735
bytes) is an **image-only scan** with zero extractable text — the FY2021-22 Actual has to come from
that budget's Budget at a Glance instead. (ii) The **live CBIC notification tree is entirely 404**;
every pre-2021 excise notification in this file exists only as a web.archive.org copy, and those
copies are pre-Gazette texts with the G.S.R. number left blank.

**D11. Two-budget years.** FY2014-15, FY2019-20 and FY2024-25 each have an interim and a full
budget with different BEs. The gap series uses the **full** budget in all three; the interim BE
breaks all three. Previously undocumented, now pinned by arithmetic (B3). Worth writing into the
series' method note, because for FY2019-20 the choice moves the stated shortfall from −23.0% to
−19.6%.

## Sources retrieved

All via `dig +short @1.1.1.1` then `curl --resolve`. HTTP code and byte count as observed.

**Union Budget documents — T1, live, `www.indiabudget.gov.in` → 164.100.85.252**

| # | Document | Path (prefix `https://www.indiabudget.gov.in/`) | HTTP | Bytes |
|---|---|---|---|---|
| 1 | Budget Speech 2021-22 | `budget2021-22/doc/Budget_Speech.pdf` | 200 | 768,448 |
| 2 | Finance Bill 2021 | `budget2021-22/doc/Finance_Bill.pdf` | 200 | 2,292,725 |
| 3 | Memorandum, Finance Bill 2021 | `budget2021-22/doc/memo.pdf` | 200 | 1,390,991 |
| 4 | JS(TRU) D.O. letter, 1 Feb 2021 | `budget2021-22/doc/cen/dojstru1.pdf` | 200 | 3,389,351 |
| 5 | Notification 01/2021-Central Excise | `budget2021-22/doc/cen/cen0121.pdf` | 200 | 113,977 |
| 6 | Notification 02/2021-Central Excise | `budget2021-22/doc/cen/cen0221.pdf` | 200 | 92,391 |
| 7 | Receipt Budget 2026-27, Tax Revenue | `doc/rec/tr.pdf` | 200 | 1,091,488 |
| 8 | Budget Speech 2018-19 (with Annexures) | `budget2018-2019/ub2018-19/bs/bs.pdf` | 200 | 1,595,861 |
| 9 | Finance Bill 2018 | `budget2018-2019/ub2018-19/fb/bill.pdf` | 200 | 1,082,988 |
| 10 | Budget at a Glance 2014-15 (full, Jul 2014) | `budget2014-2015/ub2014-15/bag/bag2.pdf` | 200 | 69,417 |
| 11 | Budget at a Glance 2014-15 (interim, Feb 2014) | `budget2014-2015(I)/ub2014-15/bag/bag2.pdf` | 200 | 217,800 |
| 12 | Budget at a Glance 2015-16 | `budget2015-2016/ub2015-16/bag/bag2.pdf` | 200 | 69,502 |
| 13 | Budget at a Glance 2016-17 | `budget2016-2017/ub2016-17/bag/bag2.pdf` | 200 | 54,187 |
| 14 | Budget at a Glance 2017-18 | `budget2017-2018/ub2017-18/bag/bag5.pdf` | 200 | 413,656 |
| 15 | Budget at a Glance 2018-19 | `budget2018-2019/ub2018-19/bag/bag5.pdf` | 200 | 354,049 |
| 16 | Budget at a Glance 2019-20 (interim) | `budget2019-20(I)/ub2019-20/bag/allbag.pdf` | 200 | 905,595 |
| 17 | Budget at a Glance 2019-20 (full) | `budget2019-20/doc/Budget_at_Glance/budget_at_a_glance.pdf` | 200 | 1,341,498 |
| 18 | Budget at a Glance 2020-21 | `budget2020-21/doc/Budget_at_Glance/budget_at_a_glance.pdf` | 200 | 1,190,380 |
| 19 | Budget at a Glance 2021-22 | `budget2021-22/doc/Budget_at_Glance/budget_at_a_glance.pdf` | 200 | 1,483,268 |
| 20 | Budget at a Glance 2022-23 | `budget2022-23/doc/Budget_at_Glance/bag5.pdf` | 200 | 366,401 |
| 21 | Budget at a Glance 2023-24 | `budget2023-24/doc/Budget_at_Glance/bag5.pdf` | 200 | 1,093,914 |
| 22 | Budget at a Glance 2024-25 (interim) | `budget2024-25(I)/doc/Budget_at_Glance/bag5.pdf` | 200 | 806,103 |
| 23 | Budget at a Glance 2024-25 (full) | `budget2024-25/doc/Budget_at_Glance/bag5.pdf` | 200 | 939,827 |
| 24 | Receipt Budget 2016-17 | `budget2016-2017/ub2016-17/rec/tr.pdf` | 200 | 367,303 |
| 25 | Receipt Budget 2017-18 | `budget2017-2018/ub2017-18/rec/tr.pdf` | 200 | 248,357 |
| 26 | Receipt Budget 2018-19 | `budget2018-2019/ub2018-19/rec/tr.pdf` | 200 | 326,489 |
| 27 | Receipt Budget 2019-20 | `budget2019-20/doc/rec/tr.pdf` | 200 | 472,810 |
| 28 | Receipt Budget 2020-21 | `budget2020-21/doc/rec/tr.pdf` | 200 | 714,016 |
| 29 | Receipt Budget 2021-22 | `budget2021-22/doc/rec/tr.pdf` | 200 | 485,935 |
| 30 | Receipt Budget 2022-23 | `budget2022-23/doc/rec/tr.pdf` | 200 | 440,209 |
| 31 | Receipt Budget 2024-25 | `budget2024-25/doc/rec/tr.pdf` | 200 | 607,344 |
| 32 | Receipt Budget 2025-26 | `budget2025-26/doc/rec/tr.pdf` | 200 | 899,829 |

**Constitution — T1, live**

| 33 | The Constitution of India (updated to 2024), Legislative Dept | `https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf` (→ 23.40.63.27) | 200 | 2,413,611 |

**CBIC excise notifications — T1 documents, retrieved from web.archive.org (→ 207.241.237.3)**
because the live CBIC tree returns 404 throughout. All HTTP 200.

| Notification | Bytes | Role |
|---|---|---|
| 11/2017-CE, 30 Jun 2017 | 31,743 | BED principal notification; Sl. No. → grade mapping |
| 21/2018-CE, 4 Oct 2018 | 156,399 | **sets the four pre-2021 BED rates** 2.98 / 4.16 / 4.83 / 7.19 |
| 22/2018-CE | 259,496 | chain link (ATF entry; no petrol/diesel change) |
| 02/2019-CE | 290,301 | chain link |
| 03/2019-CE | 132,073 | chain link |
| 04/2019-CE | 289,590 | chain link |
| 05/2019-CE, 6 Jul 2019 | 116,294 | SAED principal notification; Sl. No. mapping |
| 06/2019-CE | 125,764 | chain link |
| 07/2019-CE | 436,292 | chain link |
| 08/2019-CE | 343,964 | chain link |
| 09/2019-CE, 31 Dec 2019 | 500,894 | the real 31 Dec 2019 amendment (tariff codes only) — resolves D7 |
| 01/2020-CE | 454,100 | chain link |
| 02/2020-CE | 418,199 | chain link |
| 03/2020-CE, 13 Mar 2020 | 87,120 | SAED ₹10 / ₹4 |
| 04/2020-CE | 86,898 | chain link |
| 05/2020-CE, 5 May 2020 | 87,977 | **sets the pre-2021 SAED rates** ₹12 / ₹9 |
| 06/2020-CE | 87,960 | chain link (amends the RIC notification) |
| 07/2020-CE | 340,984 | chain link |

**PPAC (Ministry of Petroleum) — T1 document, archived copy**

| Customs & Excise Tariff Table, posted 6 Jun 2020 | `https://web.archive.org/web/20210203162329id_/https://www.ppac.gov.in/WriteReadData/userfiles/file/PP_2_CustomsExciseTariff_6-6-2020.xls` | 200 | 121,856 | genuine OLE2/Excel, internal metadata `Last Saved Time/Date: Sat Jun 6 2020`; corroborates all four BED rates, both SAED rates and RIC ₹18 |

**T4 sources used: none.** No figure in this file comes from a news report, commentary or any
relayed account.

## Sources NOT retrieved

Each was attempted via the resolver mode and retried in a fresh process. **M1 mode 3 (a different
client) is unavailable in this environment** — Playwright and WebFetch both inherit the broken
system resolver — so every failure below is a two-mode failure, not a three-mode one, and should be
re-attempted from a machine with a working resolver before being treated as settled.

| Target | URL(s) tried | Result | Consequence |
|---|---|---|---|
| **Finance Act 2002, s.147** (SAED's parent provision) | `https://www.indiacode.nic.in/bitstream/123456789/2002/1/A2002-20.pdf` | **302 → 18,028-byte HTML site shell**, not the Act | The "SAED is a surcharge" point rests on Receipt Budget note 6.05 and on 02/2021's operative words, not on the statute. See A8d — it cannot overstate the finding, only understate it. |
| **Finance Bill 2002** (fallback for the above) | `indiabudget.gov.in/ub2002-03/fb/bill.pdf`, `…/fb/fb.pdf`, `budget_archive/ub2002-03/fb/bill.pdf`, `budget2002-2003/ub2002-03/fb/bill.pdf` | **404, 1,245 bytes** (all four) | as above |
| **Live CBIC notification tree** | `www.cbic.gov.in/htdocs-cbec/excise/…/ce05-2020.pdf`, `ce11-2017.pdf`, `ce02-2019.pdf`, `ce19-2019.pdf`, and the same under `/resources//` | **404, 166 bytes** (176 with the prefix) | Every pre-2021 notification cited here is an archive copy. No live primary URL exists to cite. |
| CBIC index pages | `www.cbic.gov.in/entities/cbic-content-mst/MTMy`; `taxinformation.cbic.gov.in/` | 200 / 3,372 and 3,067 bytes — **JavaScript shells, no hrefs** | no route to live notifications |
| **Live PPAC 2020 tariff file** | `https://www.ppac.gov.in/WriteReadData/userfiles/file/PP_2_CustomsExciseTariff_6-6-2020.xls` | 200 but **redirects to an HTML page** (38,502 bytes), not the .xls; file removed from the live site (current page carries only the 27.03.2026 file) | archive copy used, and labelled as such |
| Notifications **18/2019-CE and 19/2019-CE** | archive CDX index queries | **zero rows — these notifications do not exist**; positive control: CDX returned rows for every other notification in the chain | confirms 01/2021's note is a drafting error (D7), not a pointer to something unretrieved |
| `budget2023-24/doc/rec/tr.pdf` | as listed | HTTP 200, 3,947,735 bytes, but **image-only scan, zero extractable text** | FY2021-22 Actual taken from that budget's Budget at a Glance instead |
| **G.S.R.-stamped Gazette texts** of the 2017-2020 excise notifications | not attempted (egazette.gov.in resolves to 164.100.190.144) | — | archived CBIC copies are pre-publication texts leaving "G.S.R. (E)" blank; G.S.R. numbers known only from citing notifications' notes |

**Nothing in this file is reported as a source that was not retrieved and read.** Where a figure
could not be obtained it is named above and marked unretrieved; no figure was filled from memory or
from a secondary account.
