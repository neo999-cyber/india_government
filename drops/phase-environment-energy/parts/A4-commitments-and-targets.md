# A4-commitments-and-targets

_Stage 2 research, phase 15 (environment and energy), Arc A. Started 2026-08-05T11:48:35Z._


---

## A4.1 175 GW by 2022

### What was retrieved

**(i) The solar limb — the only Cabinet-level announcing instrument retrieved.**
PIB / Ministry of New and Renewable Energy, **17-June-2015 15:25 IST**, "Revision of cumulative targets under National Solar Mission from 20,000 MW by 2021-22 to 1,00,000 MW".
URL opened: `https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=122567` (HTTP 200, 20,108 bytes raw). **Tier: T1** (primary press release of the announcing ministry, retrieved and read in full).

> "The Union Cabinet chaired by the Prime Minister, Shri Narendra Modi, today gave its approval for stepping up of India's solar power capacity target under the Jawaharlal Nehru National Solar Mission (JNNSM) by five times, reaching 1,00,000 MW by 2022. The target will principally comprise of 40 GW Rooftop and 60 GW through Large and Medium Scale Grid Connected Solar Power Projects."

Note what this document does **not** say: the string "175" does not appear in it. The Cabinet decision of 17 June 2015 that I retrieved approves **only the solar limb** (100 GW), split 40 GW rooftop / 60 GW ground-mounted. It is not an announcement of a 175 GW aggregate.

**(ii) The aggregate 175 GW with its sectoral split — earliest primary retrieved.**
PIB / MNRE, **15-December-2015 11:13 IST**, "Year End Review – Solar Power Target Reset to One Lakh MW; …".
URL opened: `https://www.pib.gov.in/newsite/printrelease.aspx?relid=133220` (HTTP 200, 222,007 bytes raw). **Tier: T1**, but note this is a **year-end review, i.e. a recap in the perfect tense**, not the announcing act.

Under the heading "UPSCALING OF RE TARGETS":

> "The Government has up-scaled the target of renewable energy capacity to 175 GW by the year 2022 which includes 100 GW from solar, 60 GW from wind, 10 GW from bio-power and 5 GW from small hydro-power."

**The commonly quoted 100/60/10/5 split is confirmed verbatim against a 2015 government primary.** It sums to 175 exactly.

**(iii) Later official restatement, identical wording.**
PIB / MNRE, **19-July-2018 15:45 IST**, Lok Sabha written reply by Shri R. K. Singh, MoS (IC) Power and NRE: "A target of installing 175 GW of renewable energy capacity by the year 2022 has been set".
URL opened: `https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=180728` (302 → `…&reg=48&lang=2`, HTTP 200, 16,848 bytes raw; 2,844 chars of text). **Tier: T1**, labelled here explicitly as a **later official recap**, not the announcement.

> "A target of installing 175 GW of renewable energy capacity by the year 2022 has been set, which includes 100 GW from solar, 60 GW from wind, 10 GW from bio-power and 5 GW from small hydro-power."

**(iv) Interim annual phasing — exists, for the solar limb only.**
PIB / MNRE, **23-July-2015 16:21 IST**, "Jawaharlal Nehru National Solar Mission", Lok Sabha written reply (USQ 659) by Shri Piyush Goyal.
URL opened: `https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=123607` (HTTP 200, 48,649 bytes raw). **Tier: T1**.

> "The Ministry has chalked out year wise target to achieve 100000 MW by 2022 which is as under:"

| Year | Rooftop (MW) | Ground Mounted (MW) | Total (MW) |
|---|---|---|---|
| 2015-16 | 200 | 1,800 | 2,000 |
| 2016-17 | 4,800 | 7,200 | 12,000 |
| 2017-18 | 5,000 | 10,000 | 15,000 |
| 2018-19 | 6,000 | 10,000 | 16,000 |
| 2019-20 | 7,000 | 10,000 | 17,000 |
| 2020-21 | 8,000 | 9,500 | 17,500 |
| 2021-22 | 9,000 | 8,500 | 17,500 |
| **Total** | **40,000** | **57,000** | **97,000\*** |

\* footnote in the document: "3,743 MW commissioned upto 31.03.2015".

The string "175" does not appear in relid=123607 (`grep -c "175"` → 0; positive control: "100000" and "40,000" both present). **So the annual phasing I retrieved covers the 100 GW solar limb, not the 175 GW aggregate.** The documents retrieved contain no year-wise phasing table for wind, bio-power or small hydro, and none for the 175 GW total.

### Classification
- **Stated in CAPACITY**, not generation. Every retrieved formulation uses "installing … capacity" / "installed capacity". (Note the drafting slippage in relid=133220: "India is aiming to generate reaching 1,00,000 MW solar power" — "generate" used loosely of a capacity figure; the unit given is MW, i.e. capacity.)
- **Base year: none named.** No retrieved document states a base year or a starting stock against which 175 GW is an increment. It is an absolute end-state stock.
- **Interim phasing: partial.** Year-wise annual targets exist for the solar limb (relid=123607, table above). None retrieved for the aggregate or for the other three limbs.

### Commitment-state test
**State (b) — due and undelivered**, on the wording retrieved.
Working: the target names a due date ("by the year 2022" / "by 2022"), which is a trigger; that date has passed as of 2026-08-05. It therefore cannot be (a) not-yet-due. It is not (d) unfalsifiable-by-construction, because it carries both a date and (for the solar limb) explicit annual interim targets — so it can fall due and it did. Whether it is (b) rather than (c) abandoned turns on whether the government has repudiated it; **the documents retrieved in this run contain no repudiation** — the 2018 recap still states it in the present perfect ("has been set"). Delivery against 175 GW is measured in part A1/A2, not here; this section resolves only the target's state, which is *due*.

**But the ministry stopped accounting against it in the target's own terminal year.** PIB / MNRE, **20 DEC 2022 5:17PM**, "Year- End Review 2022- Ministry of New and Renewable Energy", Release ID 1885147, URL opened `https://www.pib.gov.in/PressReleasePage.aspx?PRID=1885147&reg=3&lang=1` (HTTP 200, 300,074 bytes raw, 80,550 chars of text). **Tier: T1.** This is MNRE's own comprehensive annual accounting, published in December 2022 — the month the 175 GW target fell due.

Term scan on its extracted text: `175` → **0**, `1,75,000` → **0**. Positive controls run in the same form on the same file: `2022` → 135, `GW` → 91, `target` → 29, `500 GW` → 3. **In eighty thousand characters of the ministry's own year-end account for the year the target was due, the target does not appear once.** What appears instead is its successor, in the opening sentence:

> "In line with Prime Minister's announcement at COP26, Ministry of New and Renewable Energy is working towards achieving 500 GW of installed electricity capacity from non-fossil sources by 2030. So far, a total of 172.72 GW of capacity from non-fossil fuel sources has been installed in the country as on 31.10.2022. This includes 119.09 GW RE, 46.85 GW Large Hydro and 6.78 GW Nuclear Power capacity."

Note that even the 172.72 GW quoted there is *non-fossil* (RE + large hydro + nuclear), not the 175 GW target's renewable basket; RE proper stood at 119.09 GW as on 31.10.2022 on the ministry's own figure. The same silence holds three years later: MNRE, "2025 Marks Highest-Ever Renewable Energy Expansion…", 29 DEC 2025, Release ID 2209478 (`https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209478&reg=3&lang=1`, HTTP 200, 352,807 bytes raw, 94,712 chars) — `175` → **0**, `1,75,000` → **0**, positive controls `GW` → 156, `target` → 4, `500 GW` → 3.

**Resolution: (b) due and undelivered, shading toward (c).** It stays at (b) because (c) requires *evidence of abandonment* and silence is not repudiation — no retrieved document says the target was dropped. But the pattern is not neutral absence: the ministry's own terminal-year accounting substitutes a different target with a different basket and a different date, and reports progress against that. Carry both the classification and the substitution.

---

## A4.2 500 GW non-fossil by 2030

### The announcing primary

PIB / **Prime Minister's Office**, **01 NOV 2021 11:30PM by PIB Delhi**, "National Statement by Prime Minister Shri Narendra Modi at COP26 Summit in Glasgow".
URL opened: `https://www.pib.gov.in/PressReleasePage.aspx?PRID=1768712&reg=3&lang=1` (HTTP 200, 103,552 bytes raw; 22,093 chars of text). **Tier: T1** — this is the Government of India's own record of the announcing speech.

Verbatim, the Panchamrit passage as PIB publishes it:

> "In the midst of this global brainstorming on climate change, on behalf of India, I would like to present five nectar elements, Panchamrit, to deal with this challenge.
> **First** - India will reach its non-fossil energy capacity to 500 GW by 2030.
> **Second** - India will meet 50 percent of its energy requirements from renewable energy by 2030.
> **Third** - India will reduce the total projected carbon emissions by one billion tonnes from now onwards till 2030.
> **Fourth** - By 2030, India will reduce the carbon intensity of its economy by less than 45 percent.
> **And fifth**- by the year 2070, India will achieve the target of Net Zero. These panchamrits will be an unprecedented contribution of India to climate action."

**Three things in this text are load-bearing and are routinely lost in restatement:**

1. **Element 1 says "non-fossil energy capacity", not "renewable".** The brief asked which it is: on the announcing text it is **non-fossil**, and the word "renewable" does not appear in element 1. So the widely circulated "500 GW renewable by 2030" is not the announcing wording. (Element 2 *is* the renewable limb, and it is not a capacity target at all — see 2 below.)
2. **Element 2 is a share of "energy requirements", i.e. an energy/demand-side quantity, not installed capacity.** Element 1 (capacity, GW) and element 2 (share of energy requirements, %) are **two different quantities in two different units**, announced in consecutive sentences. Conflating them is the single most common error downstream, and it is also the seam that A4.4 and A4.5 turn on.
3. **Element 4 as PIB publishes it reads "reduce the carbon intensity of its economy by less than 45 percent"** — i.e. the official English text states an *upper* bound on the reduction, the opposite of a floor, and names **no base year**. The document carries its own warning at the foot:

> "DISCLAIMER: This is the approximate translation of Prime Minister's remarks. Original remarks were delivered in Hindi."

So the authoritative record of the 45 percent limb is not this document; the base year (2005) enters only with the NDC (A4.3). This is a defect in the announcing text itself, not a transcription error on my part — the string appears twice more in the same page's alternate-language blocks.

### The immediately preceding target, superseded three weeks earlier

PIB / MNRE, **11 OCT 2021 4:24PM**, "India set to achieve 450 GW renewable energy installed capacity by 2030: Ministry of New and Renewable Energy (MNRE)".
URL opened: `https://www.pib.gov.in/PressReleasePage.aspx?PRID=1762960&reg=3&lang=1` (HTTP 200, 110,068 bytes raw). **Tier: T1**.

> "…India has raised the target to 450 GW RE installed capacity by 2030." (Shri Bhagwanth Khuba, MoS NRE)

and, in the same release, the ministry's own attribution of the 175 GW target:

> "…in view of the 175 GW installed RE capacity by 2022 announced in 2015 by the Hon'ble Prime Minister Narendra Modi, India surpassed the 100 GW milestone (excluding large hydro) in 2021."

Note the pair: **450 GW *renewable*** (Oct 2021) and **500 GW *non-fossil*** (Nov 2021) are different denominators three weeks apart. The 500 GW figure is not 450 GW plus 50 GW of the same thing; it is a different basket (see the official gloss below). Note also the parenthetical "(excluding large hydro)" attached to the 100 GW milestone — the same reclassification seam A3 covers.

### The government's own later gloss of what "non-fossil" means

PIB / MNRE, **05 APR 2023 12:59PM**, "Government declares plan to add 50 GW of renewable energy capacity annually for next 5 years to achieve the target of 500 GW by 2030".
URL opened: `https://www.pib.gov.in/PressReleasePage.aspx?PRID=1913789&reg=3&lang=1` (HTTP 200, 88,319 bytes raw). **Tier: T1** — a later official recap, recorded separately and labelled as such.

> "The plan finalized by Ministry of New & Renewable Energy (MNRE) … is in accordance with Prime Minister's announcement at COP26, of achieving 500 GW of installed electricity capacity from non-fossil fuel (**Renewable Energy + Nuclear**) sources by 2030."

This is the ministry defining the denominator: **non-fossil = renewable + nuclear**. It also converts the COP26 "energy capacity" of the speech into "installed electricity capacity", which the speech did not say.

### Is there interim annual phasing?

**There is an annual *bidding* trajectory, which is not the same thing as an annual *capacity* target.** From the same 5 Apr 2023 release:

> "The Government has decided to invite bids for 50 GW of renewable energy capacity annually for the next five years i.e., from Financial Year 2023-24 till Financial Year 2027-28. These annual bids of ISTS (Inter-State Transmission) connected renewable energy capacity will also include setting up of wind power capacity of at least 10 GW per annum."

and the quarterly split for FY 2023-24: "at least 15 GW … in each of the first and second quarters … and at least 10 GW in each of the third and fourth quarters."

A bid invited is not capacity commissioned. The release itself concedes the gap and bridges it by assumption:

> "Considering the fact that Renewable Energy (RE) projects take around 18-24 months for commissioning, the bid plan will add 250 GW of renewable energy and ensure 500 GW of installed capacity by 2030."

So the phasing that exists is **phasing of tenders, running FY2023-24 to FY2027-28 only** — it stops two and a half years short of 2030, and it is denominated in *renewable* capacity bid out while the target is denominated in *non-fossil* capacity installed.

### Classification
- **Stated in CAPACITY** (GW). The announcing text says "non-fossil energy capacity"; the ministry's gloss says "installed electricity capacity from non-fossil fuel". The companion element 2 (50 percent of energy requirements) is stated in **energy**, not capacity — the two must not be merged.
- **Base year: none named** for the 500 GW figure in any document retrieved. It is an absolute end-state stock, not an increment.
- **Interim phasing: partial and of a different quantity.** Annual bid volumes FY24–FY28 (50 GW/yr, min 10 GW/yr wind); no annual installed-capacity milestone toward 500 GW appears in any document retrieved, and nothing at all covers FY2028-29 or FY2029-30.

### Commitment-state test
**State (a) — not yet due.** Trigger named: **2030** ("by 2030"), an end-state total with a date. Working: the wording carries a date, so it cannot be (d) unfalsifiable-by-construction — (d) requires no date, no phasing and no annual target, and this has a date and (partial, proxy) phasing. The date has not arrived, so it cannot yet be (b). Nothing retrieved repudiates it — the 2023 release reaffirms it — so it is not (c). It resolves to (a), trigger date 31 December 2030 (no finer date is given; the documents retrieved say only "by 2030" and do not say whether calendar year or financial year 2029-30 is meant, which is itself an unresolved ambiguity worth carrying).

---

## A4.3 Updated NDC, August 2022

### The submitted text as lodged with the UNFCCC

Document: **"India's Updated First Nationally Determined Contribution Under Paris Agreement (2021-2030)", Government of India, "August 2022 Submission to UNFCCC"**. 4 pages, 559,694 bytes.
URL opened: `https://unfccc.int/sites/default/files/NDC/2022-08/India%20Updated%20First%20Nationally%20Determined%20Contrib.pdf?download`
Registry landing page: `https://unfccc.int/node/611412`
**Tier: T1** — this is the instrument itself, as lodged, retrieved from the UNFCCC NDC registry and read in full (3,894 chars extracted by `pdftotext -layout`, all 8 goals present).

Retrieval note (see A4.7): the bare `.pdf` URL returns **212 bytes of Incapsula WAF HTML, HTTP 200**, which pdftotext will happily accept and mangle. A 200 here is not a retrieval. Two-step with a cookie jar and the `?download` suffix returns the real 559,694-byte PDF.

### Limb (ii) — the non-fossil capacity limb, verbatim, goal 4 of 8

> "4. To achieve about 50 percent cumulative electric power installed capacity from non-fossil fuel-based energy resources by 2030, with the help of transfer of technology and low-cost international finance including from Green Climate Fund (GCF) [UPDATED]."

### Limb (i) — the emissions-intensity limb, verbatim, goal 3 of 8

> "3. To reduce Emissions Intensity of its GDP by 45 percent by 2030, from 2005 level [UPDATED]."

**Base year: 2005**, named explicitly, and only for this limb. (Contrast A4.2: the COP26 speech's element 4 named no base year and mis-stated the direction of the bound. The NDC is where the 2005 baseline and the correct sense of the 45 percent enter the record.)

### The hedges, which are part of the operative sentence

Three hedges sit inside goal 4 itself, not in a preamble:

1. **"about"** — the target is "about 50 percent", not 50 percent. No tolerance band is defined anywhere in the document.
2. **"cumulative electric power installed capacity"** — the denominator is **installed capacity**, explicitly. Not generation, not energy supplied, not demand met. This is the pivot on which A4.4 and A4.5 turn.
3. **"with the help of transfer of technology and low-cost international finance including from Green Climate Fund (GCF)"** — a conditionality clause attached to the goal in the same sentence. Goal 7 restates the ask at the level of the whole submission: "To mobilize domestic and new & additional funds from developed countries to implement the above mitigation and adaptation actions in view of the resource required and the resource gap."

The document also reserves position: "No change in the other sections or text or otherwise of the document containing existing first NDC is proposed at this stage. India reserves the right to provide further updates by way of additional submissions on its NDC, as and when required."

### What the submitted text does NOT contain

Scanned the extracted text (`ndc2022.txt`) term by term. Result:

| term | count | | term | count |
|---|---|---|---|---|
| `500` | **0** | | `about` | 1 |
| `GW` | **0** | | `45 percent` | 1 |
| `gigawatt` | **0** | | `50 percent` | 1 |
| `renewable` | **0** | | | |
| `solar` / `wind` / `coal` | **0** | | | |
| `generation` | **0** | | | |
| `interim` / `annual` | **0** | | | |
| `2025` / `2026` | **0** | | | |

Positive control run in the same form on the same file: "about", "45 percent", "50 percent" each return 1. So the zeros are real zeros, not a broken matcher.

**Finding: the 500 GW figure is not in India's NDC.** The NDC's electricity limb is a *percentage of installed capacity*, with no GW figure attached, no technology split, no annual milestone, and no mention of the word "renewable" anywhere in the four pages. The 500 GW number lives only in the COP26 speech and in ministry releases (A4.2); it has never been lodged as a Paris Agreement obligation in the text I retrieved.

### The Cabinet approval, recorded separately as the domestic announcing act

PIB / Cabinet, **03 AUG 2022 2:33PM by PIB Delhi**, "Cabinet approves India's Updated Nationally Determined Contribution to be communicated to the United Nations Framework Convention on Climate Change".
URL opened: `https://www.pib.gov.in/PressReleasePage.aspx?PRID=1847812&reg=3&lang=1` (HTTP 200, 105,381 bytes raw; 22,262 chars of text). **Tier: T1**.

> "As per the updated NDC, India now stands committed to reduce Emissions Intensity of its GDP by 45 percent by 2030, from 2005 level and achieve about 50 percent cumulative electric power installed capacity from non-fossil fuel-based energy resources by 2030."

**The Cabinet release drops the conditionality clause.** The submitted text says "…by 2030, **with the help of transfer of technology and low-cost international finance including from Green Climate Fund (GCF)**". The Cabinet release's summary sentence ends at "by 2030." The finance ask survives elsewhere in the release, but as narrative rather than as a condition on the target: "India will also require its due share from such international financial resources and technological support."

The same release supplies the prior baseline: "The 2015 NDC comprised eight goals; three of these have quantitative targets upto 2030 namely, cumulative electric power installed capacity from non-fossil sources to reach 40%; reduce the emissions intensity of GDP by 33 to 35 percent compared to 2005 levels and creation of additional carbon sink of 2.5 to 3 billion tonnes of CO2 equivalent…" — so the electricity limb moved **40% → about 50%**, and the intensity limb **33–35% → 45%**, both against 2005 for the intensity limb.

One further sentence in the Cabinet release is worth carrying, because it pre-limits what can ever be held against the target: "India's NDC do not bind it to any sector specific mitigation obligation or action."

### Classification
- **Stated in CAPACITY.** Goal 4 is a share of "cumulative electric power installed capacity". Goal 3 is an intensity ratio (emissions per unit GDP), which is neither capacity nor generation.
- **Base year: 2005 for goal 3 only.** Goal 4 names no base year — it is a share at a point in time, not a change from a baseline.
- **Interim phasing: none.** "interim" → 0, "annual" → 0, "2025" → 0, "2026" → 0 in the submitted text. Eight goals, one end date, no intermediate milestone of any kind.

### Commitment-state test
**State (a) — not yet due**, for both limbs. Trigger named: **2030**, in both goal 3 and goal 4.
Working: both limbs carry an explicit end date, so neither is (d) — (d) requires *no* date, and a date is present. 2030 has not arrived, so neither is (b). Nothing retrieved shows repudiation, so neither is (c). Both are (a).
**But the (a) is weaker than it looks, and the weakness should be carried forward:** there is no phasing at all, so nothing about either limb can be tested before 2030 arrives; and goal 4's conditionality clause ("with the help of transfer of technology and low-cost international finance including from GCF") supplies a standing ground on which a 2030 shortfall could be attributed to unmet finance rather than to unmet effort. The clause does not make the target unfalsifiable — the date still triggers — but it makes the *attribution* of failure contestable by construction. Record it as (a) with the conditionality flagged.

---

## A4.4 The "five years early" claim (July 2025)

### The primary

PIB / **Ministry of New and Renewable Energy**, **14 JUL 2025 6:37PM by PIB Delhi**, "India's Renewable Rise: Non-Fossil Sources Now Power Half the Nation's Grid", sub-headline "Achieves 50% clean power capacity five years ahead of target, setting global benchmark for sustainable growth". Release ID 2144627.
URL opened: `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2144627&reg=3&lang=1` (HTTP 200, 175,479 bytes raw). **Tier: T1**.

Opening sentence, verbatim:

> "India has achieved a landmark in its energy transition journey by reaching 50% of its **installed electricity capacity** from non-fossil fuel sources—five years ahead of the target set under its Nationally Determined Contributions (NDCs) to the Paris Agreement."

Minister of New and Renewable Energy Shri Pralhad Joshi, quoted in the same release:

> "In a world seeking climate solutions, India is showing the way. Achieving 50% non-fossil fuel capacity five years ahead of the 2030 target is a proud moment for every Indian."

### Exactly which quantity is claimed — answered

**Installed capacity, unambiguously. Not generation.** The release says "installed electricity capacity" in its first sentence, repeats "installed capacity" in its annexure headings, and closes with "India's achievement of 50% non-fossil fuel **installed capacity** ahead of the target year". The claim is correctly matched to the NDC limb it invokes (A4.3 goal 4, "cumulative electric power installed capacity"). **On the question the brief posed, this one is clean: capacity vs capacity.**

Term scan on the extracted text of PRID 2144627: `51.5` → **0**, `283.46` → **0** (positive control in the same form on the same file: `50.08` → 3, `Release ID` → 2). So the 51.5% and 283.46 GW figures of A4.5 are **not** in this release; they come from somewhere else.

### The arithmetic the release publishes on itself

The release carries three annexure tables, all for the same date, **30.06.2025**, all summing to the same 484.82 GW total:

| Table | Sector | Capacity | Share |
|---|---|---|---|
| 1 — "RE + Large Hydro Combined" | Thermal | 242.04 GW | 49.92% |
| | Nuclear | 8.78 GW | 1.81% |
| | RE (including Large Hydro) | 234.00 GW | 48.27% |
| | **Total** | **484.82 GW** | 100% |
| 2 — "Large Hydro and RE Shown Separately" | Thermal | 242.04 GW | 49.92% |
| | Nuclear | 8.78 GW | 1.81% |
| | Large Hydro | 49.38 GW | 10.19% |
| | **RE** | **184.62 GW** | **38.08%** |
| | **Total** | **484.82 GW** | 100% |
| 3 — "Fossil vs Non-Fossil" | Thermal | 242.04 GW | 49.92% |
| | Non-Fossil Fuel (RE + LH + Nuclear) | 242.78 GW | 50.08% |
| | **Total** | **484.82 GW** | 100% |

Three observations that are in the document itself, not inferred:

1. **The margin is 0.08 percentage points, i.e. 0.74 GW on 484.82 GW** (242.78 vs 242.04). The milestone is claimed on a gap smaller than a single large thermal unit.
2. **The claim depends entirely on the composition of the denominator's complement.** Table 2, in the same annexure, shows renewable energy *proper* at **38.08%**. The 50.08% figure is reached only by counting **large hydro (49.38 GW, 10.19%) plus nuclear (8.78 GW, 1.81%)** as non-fossil. This is legitimate under MNRE's own gloss of the target (A4.2: "non-fossil fuel (Renewable Energy + Nuclear)"), and the release is transparent about it by printing both tables — but it means "half the nation's grid" is 38% renewable and 12% large-hydro-plus-nuclear.
3. **The target the claim is measured against says "about 50 percent" (A4.3), and "about" is undefined.** Nothing in the NDC or in this release states what counts as hitting an "about 50 percent" target. A 50.08% reading is treated here as satisfying it; on the same undefined wording, 49.5% could have been argued to satisfy it too, or 50.08% argued not to.

### Classification of the underlying target as this release construes it
- **CAPACITY**, on both sides. Correctly matched.
- **Base year**: none. The claim is a share at a point in time (30.06.2025).
- **Interim phasing**: none in the target (A4.3); this release is an announcement of arrival, not a milestone in a published schedule.

### Commitment-state effect
This does not change the NDC limb's state. Goal 4 remains **(a) not yet due**, trigger 2030 — a target with a 2030 date is not extinguished by an earlier reading that satisfies it, because the target is a *state at 2030*, not a *first-touch*. The release itself implicitly concedes this by immediately pointing past the milestone: "As the country moves toward the goal of 500 GW of non-fossil capacity by 2030 and net-zero emissions by 2070…". **A single monthly reading crossing 50.08% is not the same event as holding ≥50% at 2030**, and nothing retrieved commits the government to not falling back below it.

---

## A4.5 The 51.5% figure — numerator and denominator

### The originating primary

PIB / **Ministry of Power**, **29 OCT 2025 5:46PM by PIB Delhi**, "India achieved Historic milestone in power sector: Surpasses 500 GW and Renewable Generation Exceeds 50% of demand". Release ID 2183866.
URL opened: `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2183866&reg=3&lang=1` (HTTP 200, 95,945 bytes raw). **Tier: T1**.

The whole of what the release says about the figure, verbatim, under the heading "A Record Day for Renewable Energy":

> "On 29 July 2025, India reached its highest-ever renewable energy share in electricity generation.
> That day, renewables met 51.5 % of the country's total electricity demand of 203 GW.
> Solar generation: 44.50 GW
> Wind generation: 29.89 GW
> Hydro generation: 30.29 GW
> This means that, for the first time, more than half of India's power came from green sources in a single day — a remarkable sign of change."

### Which of the four quantities is it? — the answer is that the source does not resolve it, and contradicts itself

The brief listed four candidates: (i) share of installed capacity, (ii) share of energy generated over the month, (iii) peak-instantaneous share at one moment, (iv) share of demand met at one particular hour. **The release supports none of them cleanly.** Here is the evidence, in the document.

**1. Every figure given is in GW, which is a unit of power, not of energy.** Numerator components (44.50 + 29.89 + 30.29) and denominator (203) are all stated in GW. Term scan on the extracted text:

| term | count | note |
|---|---|---|
| `GWh` | **0** | |
| `MWh` | **0** | |
| `kWh` | **0** | |
| `BU` / `billion unit` / `million unit` | **0** | the one `BU` substring hit is "Press Information **Bu**reau" — false positive, checked |
| `hour` / `hrs` | **0** | |
| `IST` | 0 real | all 13 substring hits are "M**ist**ry"/"h**ist**oric" — false positives, checked |
| `instantaneous` / `moment` / `average` / `over the day` | **0** | |
| `GW` | 38 | positive control |
| `51.5` | 3 | positive control |
| `500.89` | 3 | positive control |

So the release **never states a time of day, never gives an energy unit, and never names a data source** (`POSOCO`, `Grid-India`, `NLDC`, `CEA`, `source:` → all 0).

**2. The arithmetic proves the figure is a power ratio, not an energy ratio.**
44.50 + 29.89 + 30.29 = **104.68 GW**; 104.68 / 203 = **51.567%**, which rounds to the published 51.5%. The published numerator and denominator are internally consistent **only as a ratio of simultaneous GW readings**. A day's energy share cannot be computed from these numbers, and no energy numbers are given.

**3. But the prose asserts the day-energy reading anyway.** "…more than half of India's power came from green sources **in a single day**" and "highest-ever renewable energy share in **electricity generation**". A GW-over-GW ratio at one unstated instant does not license either sentence. **The release states a power-ratio in its numbers and an energy-share in its words.**

**Conclusion on numerator and denominator: the primary does not state them in a way that identifies the quantity.** Most consistent with (iii)/(iv) — a share at a single unspecified moment on 29 July 2025 — on the arithmetic; asserted as an energy share over a day in the prose. **Per the brief's instruction, this is the finding; I am not inferring the obvious one.** What can be said with the document in hand: the figure is *not* (i), because the release gives installed capacity separately and differently (51 % of 500.89 GW as of 30 Sept 2025), and it is *not* (ii), because the stated date is a single day, 29 July 2025, not the month of July.

**4. The renewable numerator includes hydro.** 30.29 GW of the 104.68 GW numerator is "Hydro generation", with no large/small split — so roughly **29% of the "renewable" numerator is hydro**. The same release, three paragraphs earlier, lists non-fossil capacity as "(renewable energy, hydro, and nuclear)", i.e. treats hydro as *distinct from* renewable energy when counting capacity, then folds it *into* renewables when counting the 51.5%. Same document, two conventions.

### How the figure degraded in the next official restatement

PIB / MNRE, **08 APR 2026 4:17PM by PIB Delhi**, "India Ranks third globally in Renewable Energy Installed Capacity: Shri Pralhad Joshi". Release ID 2250039.
URL opened: `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2250039&reg=3&lang=1` (HTTP 200, 450,631 bytes raw). **Tier: T1**.

> "The Minister also highlighted that **in July 2025**, India reached its highest-ever renewable energy share in electricity generation. The renewables met 51.5% of the country's total electricity demand of 203 GW."

Compare the Ministry of Power original: "**On 29 July 2025**". Nine months later the same sentence has lost the day. "On 29 July 2025" has become "in July 2025", converting a single-instant reading into a month. **This is the whole distinction the brief asked about, erased inside government by restatement.** Everything else in the sentence — 51.5%, 203 GW — is carried unchanged, so the corruption is invisible to anyone reading only the later release.

### 283.46 GW — what it actually is

Same release (PRID 2250039), stated twice:

> "So far, a total of **283.46 GW** of capacity from non-fossil fuel sources has been installed in the country **as on 31.03.2026**. This includes 274.68 GW Renewable Energy (150.26 GW Solar Power, 56.09 GW Wind Power, 11.75 GW Bio Energy, 5.17 GW Small Hydro Power, 51.41 GW Large Hydro Power) and 8.78 GW Nuclear Power capacity."

**283.46 GW is a capacity stock as on 31 March 2026, not a July 2025 figure.** It is stated in the *same sentence* as the July 2025 51.5% figure — "He also said that a total of 283.46 GW … as on 31.03.2026" immediately follows "in July 2025 … 51.5%" — which is exactly how the two came to be carried together. They are eight months apart and are different kinds of quantity (a capacity stock in GW vs a share in %). **If the instrument currently attributes 283.46 GW to July 2025, that is wrong and should be corrected to 31.03.2026.**

Note also the composition: 51.41 GW of the 274.68 GW "Renewable Energy" is **large hydro**, and 8.78 GW is nuclear outside the RE total. Non-fossil 283.46 GW; renewables excluding large hydro = 223.27 GW.

### The generation share the same release publishes, for contrast

> "Shri Joshi said India's total power generation during 2025-26 (up to March 2026) reached 1,845.921 BU. The share of **non-fossil fuels in total generation reached 29.2% in 2025-26 (538.97 BU)**."

**29.2% of generation over the year, against 51.5% "of demand" on one day, against ~51% of installed capacity.** Three numbers in the fifties-and-thirties, three different quantities, two of them in the same release. This is the arc's central seam stated by the government about itself: **the capacity share is roughly 51%, the annual generation share is 29.2%.**

### One further defect in the same family

The Ministry of Power release (PRID 2183866) writes:

> "With this progress, India has already achieved one of its major **COP26 Panchamrit goals — to have 50 % of installed electric power capacity from non-fossil fuel sources by 2030** — five years early."

There is no such Panchamrit goal. On the announcing text retrieved in A4.2, Panchamrit element 1 is *500 GW non-fossil capacity* and element 2 is *"50 percent of its energy requirements from renewable energy"* — an **energy** share of a **renewable** numerator. The "50% of installed electric power capacity from non-fossil" limb comes from the **NDC** (A4.3 goal 4), not from COP26. The release has fused element 2's "50 percent" with the NDC's "installed capacity" denominator and attributed the result to COP26. It is the same energy-vs-capacity substitution as the 51.5% defect, running in the opposite direction.

### Classification
- The 51.5% figure is **neither a capacity target nor a generation target** — it is a reported observation, not a commitment, and it is not the metric of any target retrieved in A4.1–A4.3. It cannot bear on any commitment's state.
- **Base year**: not applicable; it is a point reading.
- **Interim phasing**: not applicable.

---

## A4.6 Commitment-state resolution table

Five items are resolved. Each state is argued on the wording retrieved in this run, not on general knowledge; the "why not the others" column shows the working the test requires.

| # | Commitment, as announced | Announcing primary | Capacity or generation | Base year | Interim phasing | **State** | Trigger / evidence | Why not the other states |
|---|---|---|---|---|---|---|---|---|
| 1 | "175 GW of renewable energy capacity by the year 2022 … 100 GW from solar, 60 GW from wind, 10 GW from bio-power and 5 GW from small hydro-power" | Aggregate: PIB/MNRE Year End Review, 15 Dec 2015, relid=133220. Solar limb only: Cabinet, 17 Jun 2015, relid=122567 | **Capacity** | None | **Partial** — year-wise table for the 100 GW solar limb only (relid=123607); none for wind/bio/small hydro or for the 175 GW total | **(b) due and undelivered**, shading toward (c) | Trigger date 2022, passed | Not (a): date has passed. Not (d): it has a date *and* partial phasing, so it could and did fall due. Not (c): no retrieved document repudiates it — but MNRE's own Year End Review 2022 (PRID 1885147, Dec 2022) contains the string "175" zero times and reports against the 500 GW/2030 target instead |
| 2 | "India will reach its non-fossil energy capacity to 500 GW by 2030" | PIB/PMO, COP26 National Statement, 1 Nov 2021, PRID=1768712 | **Capacity** | None | **Proxy only** — annual *bid* volumes 50 GW/yr FY2023-24 to FY2027-28 (PRID=1913789); no installed-capacity milestone; nothing covering FY2028-29 or FY2029-30 | **(a) not yet due** | Trigger: 2030 (calendar-vs-financial-year unresolved in every retrieved document) | Not (b): date has not arrived. Not (c): reaffirmed as recently as MNRE 29 Dec 2025 (PRID=2209478). Not (d): it has a date, which is what (d) requires the absence of |
| 3 | Panchamrit element 2: "India will meet 50 percent of its energy requirements from renewable energy by 2030" | Same, PRID=1768712 | **Generation / energy** — explicitly "energy requirements", not capacity | None | **None retrieved** | **(a) not yet due**, but see note | Trigger: 2030 | Not (b)/(c) for the same reasons as row 2. Not (d) — a date is present. **But this limb is the one that is never reported against**: no retrieved document states progress toward "50 percent of energy requirements from renewable energy". The nearest figure any retrieved document gives is *non-fossil share of generation = 29.2% in 2025-26* (PRID=2250039), against a *renewable* numerator target. Two officials releases (PRID=2183866, PRID=2250039) instead restate row 4's capacity limb and label it the COP26 goal |
| 4 | NDC goal 4: "To achieve about 50 percent cumulative electric power installed capacity from non-fossil fuel-based energy resources by 2030, with the help of transfer of technology and low-cost international finance including from Green Climate Fund (GCF)" | India's Updated First NDC, Aug 2022 submission, UNFCCC NDC registry | **Capacity** | None | **None** — "interim"→0, "annual"→0, "2025"→0, "2026"→0 in the submitted text | **(a) not yet due**, conditionality flagged | Trigger: 2030 | Not (b): date has not arrived. Not (c): reaffirmed repeatedly. Not (d): a date is present. The conditionality clause does not create (d) — it does not remove the trigger — but it makes the *attribution* of a 2030 shortfall contestable by construction, and "about" leaves the threshold undefined in both directions |
| 5 | NDC goal 3: "To reduce Emissions Intensity of its GDP by 45 percent by 2030, from 2005 level" | Same | Neither — an **intensity ratio** (emissions per unit GDP) | **2005**, the only base year named anywhere in this set | **None** | **(a) not yet due** | Trigger: 2030 | Not (b)/(c)/(d) for the reasons in row 4. Note the announcing speech (PRID=1768712) stated this limb as "reduce the carbon intensity of its economy **by less than 45 percent**", with no base year, under its own disclaimer that it is "the approximate translation of Prime Minister's remarks" |

### Items that are NOT commitments and therefore take no state

| Item | Why it takes no state |
|---|---|
| "50% non-fossil installed capacity achieved five years early" (PIB/MNRE 14 Jul 2025, PRID=2144627) | A claim of *arrival*, not a commitment. It does not extinguish row 4, which is a state *at* 2030, not a first-touch. Row 4 stays (a) |
| "51.5% of demand, 29 July 2025" (PIB/MoP 29 Oct 2025, PRID=2183866) | A reported observation. It is not the metric of any target in rows 1–5, and its own numerator/denominator are not resolvable from the release (A4.5) |
| "283.46 GW non-fossil as on 31.03.2026" (PIB/MNRE 8 Apr 2026, PRID=2250039) | A capacity stock reading, not a target. Relevant only as progress against row 2 (283.46 of 500 GW) |

### The one structural fact this table makes visible

**Every target in the set is stated in CAPACITY except row 3, and row 3 is the only one no retrieved document reports progress against.** The generation-denominated commitment exists (Panchamrit element 2, "50 percent of its energy requirements from renewable energy by 2030"), and it is systematically replaced in official restatement by the capacity-denominated one — twice, in PRID 2183866 and PRID 2250039, both of which announce the capacity limb as if it were the COP26 goal. **None of the five targets is stated in generation terms and tracked in generation terms.** The one generation figure the government does publish — 29.2% non-fossil share of generation in 2025-26 — has no target attached to it in any document retrieved in this run.

---

## A4.7 Retrieval log

Every document listed here was retrieved in this run. Text length is measured after stripping `<script>`/`<style>` blocks and all tags, and unescaping entities (`ext.py` in the scratchpad); it is not a byte count of the response. Verdict "READ" means the body carried the substantive text and I read it.

| # | Host | Resolver pin | URL opened | HTTP | Raw bytes | Text chars | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | `unfccc.int` | system (non-Indian host, resolves normally) | `https://unfccc.int/sites/default/files/NDC/2022-08/India%20Updated%20First%20Nationally%20Determined%20Contrib.pdf` | 200 | **212** | ~0 | **NOT A RETRIEVAL** — Incapsula WAF stub, see note below |
| 2 | `unfccc.int` | system | same path **+ `?download`**, second request on a shared cookie jar | 200 | 559,694 | 3,894 (pdftotext -layout, 4 pp) | **READ** — the NDC itself |
| 3 | `www.pib.gov.in` | 94.202.207.57 | `…/PressReleasePage.aspx?PRID=1847812&reg=3&lang=1` | 200 | 105,381 | 21,219 | READ — Cabinet approves updated NDC, 3 Aug 2022 |
| 4 | `www.pib.gov.in` | 94.202.207.57 | `…/PressReleasePage.aspx?PRID=1768712&reg=3&lang=1` | 200 | 103,552 | 22,594 | READ — COP26 National Statement, 1 Nov 2021 |
| 5 | `www.pib.gov.in` | 94.202.207.57 | `…/newsite/PrintRelease.aspx?relid=122567` | 200 | 20,108 | 5,339 | READ — Cabinet, solar 20,000→1,00,000 MW, 17 Jun 2015 |
| 6 | `www.pib.gov.in` | 94.202.207.57 | `…/newsite/PrintRelease.aspx?relid=123607` | 200 | 48,649 | 2,557 | READ — JNNSM year-wise solar phasing, 23 Jul 2015 |
| 7 | `www.pib.gov.in` | 94.202.207.57 | `…/newsite/PrintRelease.aspx?relid=180728` | **302 → 200** (redirect appends `&reg=48&lang=2`) | 16,848 | 2,858 | READ — 175 GW LS reply, 19 Jul 2018 |
| 8 | `www.pib.gov.in` | 94.202.207.57 | `…/newsite/printrelease.aspx?relid=133220` | 200 | 222,007 | 26,880 | READ — MNRE Year End Review 2015 (175 GW split) |
| 9 | `www.pib.gov.in` | 94.202.207.57 | `…/PressReleasePage.aspx?PRID=1762960&reg=3&lang=1` | 200 | 110,068 | 24,242 | READ — 450 GW RE by 2030, 11 Oct 2021 |
| 10 | `www.pib.gov.in` | 94.202.207.57 | `…/PressReleasePage.aspx?PRID=1913789&reg=3&lang=1` | 200 | 88,319 | 15,239 | READ — 50 GW/yr bid trajectory, 5 Apr 2023 |
| 11 | `www.pib.gov.in` | 94.202.207.57 | `…/PressReleasePage.aspx?PRID=1885147&reg=3&lang=1` | 200 | 300,074 | 80,550 | READ — MNRE Year End Review 2022 (the "175"→0 zero) |
| 12 | `www.pib.gov.in` | 94.202.207.57 | `…/PressReleasePage.aspx?PRID=2144627&reg=3&lang=1` | 200 | 175,479 | 35,537 | READ — "five years ahead", 14 Jul 2025 |
| 13 | `www.pib.gov.in` | 94.202.207.57 | `…/PressReleasePage.aspx?PRID=2183866&reg=3&lang=1` | 200 | 95,945 | 11,769 | READ — 51.5% / 500.89 GW, MoP, 29 Oct 2025 |
| 14 | `www.pib.gov.in` | 94.202.207.57 | `…/PressReleasePage.aspx?PRID=2209478&reg=3&lang=1` | 200 | 352,807 | 94,712 | READ — MNRE Year End Review 2025 |
| 15 | `www.pib.gov.in` | 94.202.207.57 | `…/PressReleasePage.aspx?PRID=2250039&reg=3&lang=1` | 200 | 450,631 | 113,352 | READ — 283.46 GW / 29.2% generation, 8 Apr 2026 |

### Failures and near-misses, with what actually came back

| Attempt | Result | Disposition |
|---|---|---|
| `https://unfccc.int/…Contrib.pdf` (bare, no `?download`) | **HTTP 200, 212 bytes, `Content-Type: text/html`**, body = `<html><head><META NAME="robots" CONTENT="noindex,nofollow"><script src="/_Incapsula_Resource?SWJIYLWA=…"></script><body></body></html>` | **This is standard 4-fail material.** A 200 with a PDF extension serving a WAF stub. `pdftotext` accepts it and emits ~90 "Illegal character in hex string" errors then "Couldn't read xref table" — it does not refuse, so an unchecked pipeline would carry a silent empty read. **Fix that worked: two-step on a shared cookie jar** — `curl -c cj -b cj <bare url>` to seed the Incapsula cookie, then `curl -c cj -b cj <url>?download`. Survived on a second process. |
| `archive.pib.gov.in` (resolved via `dig +short @1.1.1.1` → 164.100.88.150) | `curl --resolve` → **HTTP 000, 0 bytes** | Not pursued — the same content was reachable on `www.pib.gov.in` under `newsite/PrintRelease.aspx`, so the archive host was never needed. One observation only; not a claim that the host is down. |
| `https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=1685046` | **HTTP 404**, 686 bytes | That path form is dead; `PressReleasePage.aspx?PRID=` works for the same IDs. Not pursued further — MNRE Year End Review 2020 was not needed. |
| `grep -o -E ".{0,180}175 GW.{0,180}"` on the year-end reviews | `ugrep: error at position 84 … exceeds complexity limits` (macOS `grep` is ugrep here) | Tooling limit, not a data fact. Re-ran as plain `grep -o -i` counts with positive controls; that is the form all the zeros in this file were banked in. |

### Scanner form used for every zero in this file

`grep -o -i -- "<term>" <file> | wc -l` on tag-stripped, entity-unescaped text, with **at least one positive control run in the same form on the same file** before any zero was banked. Two substring false positives were caught and are disclosed at the point of use: `BU` matching "Press Information **Bu**reau", and `IST` matching "M**ist**ry"/"h**ist**oric" — both in PRID 2183866, both checked by printing their match context, both discounted.

---

### Handoff to A5 (absences, disagreements, unreachables)

**Absences — things the documents retrieved do not contain.**
1. **No announcing instrument for the 175 GW aggregate was found.** The 17 Jun 2015 Cabinet decision (relid=122567) covers the solar limb only and does not contain the string "175". The earliest primary I retrieved stating the aggregate with its split is a *year-end review* six months later (relid=133220, 15 Dec 2015), written in the perfect tense. A 2021 MNRE release (PRID=1762960) attributes the target to "the Hon'ble Prime Minister Narendra Modi" in 2015 without citing an instrument. **A5 should look for a Cabinet decision, a gazette notification, or an MNRE resolution announcing 175 GW as such** — my failure to find one is a failure of my search, not evidence none exists.
2. **No year-wise phasing for the 175 GW aggregate, or for the wind / bio-power / small hydro limbs.** Only the solar limb has a published annual table (relid=123607).
3. **No installed-capacity milestones between now and 2030 for the 500 GW target.** What exists is a *bid* trajectory ending FY2027-28 (PRID=1913789), which leaves FY2028-29 and FY2029-30 uncovered by any published number.
4. **No progress reporting at all against Panchamrit element 2** ("50 percent of energy requirements from renewable energy by 2030") in any document retrieved in this run. This is the phase's sharpest absence: it is the only generation-denominated commitment in the set, and it is the only one nobody reports against.
5. **No definition of "about"** in "about 50 percent" (NDC goal 4), and no statement of whether "by 2030" means calendar 2030 or FY 2029-30, anywhere in the retrieved set.
6. **No data source, no time of day, and no energy units in the 51.5% release** (PRID=2183866): `POSOCO`/`Grid-India`/`NLDC`/`CEA`/`source:` → 0; `GWh`/`MWh`/`kWh` → 0; `hour` → 0.

**Disagreements between government documents.**
1. **PRID 2183866 (MoP, Oct 2025) and PRID 2250039 (MNRE, Apr 2026) attribute to COP26 a goal COP26 did not state.** They say the Panchamrit goal was "50 % of installed electric power capacity from non-fossil fuel sources by 2030". The COP26 text (PRID=1768712) has 500 GW capacity (element 1) and 50% of *energy requirements* from *renewable* energy (element 2). The 50%-of-capacity limb is the **NDC's**, not COP26's.
2. **"On 29 July 2025" (PRID=2183866) becomes "in July 2025" (PRID=2250039)** — a single-day reading restated as a month, with the numbers unchanged. Anyone reading only the later release cannot detect this.
3. **283.46 GW is dated 31.03.2026, not July 2025**, though it appears in the same sentence as the July 2025 51.5% figure in PRID 2250039. If the instrument currently carries them as a matched pair, **that pairing is wrong and should be corrected at source.**
4. **Hydro is inside the renewable numerator for the 51.5% figure and outside it for the capacity break-up, in the same release** (PRID=2183866).
5. **The COP26 statement's element 4 reads "reduce the carbon intensity of its economy by less than 45 percent"** — direction inverted, no base year — under a disclaimer that it is an approximate translation from Hindi. The NDC (2005 base, "by 45 percent") is the authoritative form.
6. **The Cabinet release summarising the NDC (PRID=1847812) drops goal 4's conditionality clause** ("with the help of transfer of technology and low-cost international finance including from GCF") from its summary sentence. Domestic and international texts of the same commitment differ.

**Unreachables.** None material. `archive.pib.gov.in` returned HTTP 000 on one attempt but was not needed; `PressReleseDetailm.aspx` is a dead path form. **No claim in this file rests on a document I could not open.**

**Numbers A1/A2 will want, all from primaries listed above.**
- 30.06.2025: total 484.82 GW; thermal 242.04 (49.92%); non-fossil 242.78 (50.08%); RE *excluding* large hydro 184.62 (38.08%); large hydro 49.38; nuclear 8.78. [PRID=2144627]
- 30.09.2025: total 500.89 GW; non-fossil 256.09 (>51%); fossil 244.80 (~49%); solar 127.33; wind 53.12. [PRID=2183866]
- 31.10.2022: non-fossil 172.72 GW of 408.71 GW total (42.26%); RE 119.09; large hydro 46.85; nuclear 6.78. [PRID=1885147]
- 28.02.2023: RE total 168.96 GW — solar 64.38, hydro 51.79, wind 42.02, bio 10.77. [PRID=1913789]
- 31.03.2026: non-fossil 283.46 GW — RE 274.68 (solar 150.26, wind 56.09, bio 11.75, small hydro 5.17, large hydro 51.41) + nuclear 8.78. [PRID=2250039]
- FY2025-26 generation: total 1,845.921 BU; non-fossil share **29.2%** (538.97 BU). [PRID=2250039]
- 29.07.2025: solar 44.50 GW + wind 29.89 GW + hydro 30.29 GW = 104.68 GW against "demand of 203 GW" = 51.567%. [PRID=2183866]
