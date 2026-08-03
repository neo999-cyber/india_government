# 05 — ELECTIONS, THE 2024 ASSEMBLY POLL, AND DELIMITATION

Stage-2 research part, phase 12 (`kashmir-rights`), `--dry`. Model: opus (claude-opus-5). No subagents spawned.
Written incrementally. Retrieval date **3 August 2026** throughout; every "as at" claim is as at that date.

**This part does not author records.** It establishes facts, arithmetic and absences for stage 3.

**COMPANION FILE.** I delegated one cluster to a child (opus): nominated members of the J&K assembly
(s.15 of the Reorganisation Act and the Reorganisation (Amendment) Act 2023, who nominates, whether they
vote, and whether any have been nominated since October 2024); the official stated reasons for the
2014–2024 postponement; the Special Summary Revision and the August 2022 "new voters" statement; and the
date the delimitation order took effect. **Its findings are in
`drops/phase-kashmir-rights/parts/05b-nominated-members-and-poll-gap.md` and stage 3 must read that file
alongside this one.** Where this file says an item was not established, check 05b before recording an
absence. Sections 3.6 (reservation), 3.9–3.10 (order publication and effective date), 5.3 (SSR) and 5.6
(the gap) are the ones with a counterpart there.

---

## 0. RETRIEVAL STATUS — read this before using any figure below

Per the standing discipline, every document is marked **RETRIEVED** (I fetched it and read it) or
**RELAYED** (known only through another document). Tier grades the document I hold, not the institution.

### 0.1 The retrieval environment, probed this session

Phase 11's part 11 recorded that `eci.gov.in`, `pib.gov.in`, `indiacode.nic.in` and every J&K territorial
host were unreachable. **That is not the whole picture and the correction matters.** Three different
fetchers behave differently on the same machine in the same session:

| Host | `curl` + browser UA | `WebFetch` tool | Headless browser (Claude Browser pane) |
|---|---|---|---|
| `www.eci.gov.in` | **403** (Akamai "Access Denied") | **403** | **200 — fully navigable** |
| `results.eci.gov.in` | 403 | — | **200** |
| `www.pib.gov.in` | **000** (no response) | **403** | **200 — fully navigable** |
| `www.mha.gov.in` | **200** | — | — |
| `prsindia.org` | **200** | — | — |
| `censusindia.gov.in` | 200 | — | — |
| `india.gov.in` | 200 | — | — |
| `web.archive.org` — **API** (`/wayback/available`, `/cdx/`) | **200** | blocked by tool | — |
| `web.archive.org` — **playback** (`/web/<ts>/<url>`) | **498 → nginx 404 for every URL tried** | blocked by tool | — |
| `indiacode.nic.in`, `upload.indiacode.nic.in`, `jkhighcourt.nic.in`, `legislative.gov.in`, `egazette.gov.in`, `sansad.in`, `jk.gov.in`, `ceojk.nic.in`, `jkgad.nic.in`, `old.eci.gov.in`, `cdnbbsr.s3waas.gov.in`, `elections24.eci.gov.in` | **000 / DNS failure** — **⚠ THIS ROW IS SUPERSEDED. See §0.1a: most of these are alive; the failure was the DNS resolver, not the host.** | — | not tried |

**Consequence, and it is the single most important methodological fact in this part: essentially all of
the Election Commission's primary material IS retrievable from this environment, but only through a real
browser.** A 403 from `curl` and from `WebFetch` on `eci.gov.in` is an edge-WAF user-agent block, not an
absence. Phase 11's inference from a failed fetch must not be generalised. Anything below marked
RETRIEVED-BROWSER was fetched by navigating a real browser to the URL, which triggered a file download to
disk, which I then text-extracted with `pdftotext`. The bytes on disk are the ECI's own PDFs.

**Wayback playback is dead in this environment** (`/web/…` returns nginx 404 for every URL including
trivially-archived ones), while the CDX and availability APIs answer. So the archive is not a route here,
and the coordinator's suggested `web.archive.org/web/2023id_/…indiacode…` route was **tried and failed**
— see §0.2 for what I used instead.

### 0.1a **RETEST through a different DNS resolver — the phase-wide "dead host" finding is mostly wrong, and here is what survives it**

A sibling established that the system resolver and 8.8.8.8 return SERVFAIL for most Indian government
hosts while **`dig @1.1.1.1` resolves them**, so `curl --resolve <host>:443:<ip>` reaches them. **I retested
every host I had recorded as failing, that way, with a browser user-agent. Results:**

| Host | A record via 1.1.1.1 | HTTP with `curl --resolve` + browser UA | Verdict |
|---|---|---|---|
| `egazette.gov.in` | 164.100.190.144 | **302 — ALIVE** | my earlier "000" was the resolver, not the host |
| `sansad.in` | 164.100.252.170 | **302 — ALIVE** | same |
| `indiacode.nic.in` | 94.202.207.59 | **302 — ALIVE** | same |
| `legislative.gov.in` | 164.100.220.71 | **302 — ALIVE** | same |
| `pib.gov.in` / `www.pib.gov.in` | 164.100.117.99 / 94.202.207.49 | **301 / 302 — ALIVE** | same |
| **`www.eci.gov.in`** | 94.202.207.58 | **403** | **a real edge block, not DNS** |
| **`eci.gov.in`** | 164.100.229.115 | **000 — resolves, will not connect** | **a real block, not DNS** |
| `results.eci.gov.in` | 94.202.207.58 | **403** | same block |
| `old.eci.gov.in` | 164.100.59.17 | **000** | real |
| `ceojk.nic.in` | 45.127.74.180 | **000** | resolves, will not connect |
| `jk.gov.in` | 164.100.223.4 | **000** | resolves, will not connect |

**CORRECTION TO §0.1, and it must not be missed: the hosts I recorded as DNS-dead are alive. Only the ECI
and the two J&K hosts are genuinely blocked to `curl`.**

**AND THE POINT THAT MATTERS MOST FOR THIS PHASE: the ECI block does NOT bind, because the headless
browser reaches `eci.gov.in` perfectly.** Every ECI document in the register below — the four assembly
statistical reports, three Lok Sabha PC-turnout tables, the Delimitation Commission's compendium, the
final and draft Gazette orders, and the 2017 bye-election workbook — **was fetched from eci.gov.in itself,
in this session, as bytes on disk.** They are T1 primary retrievals from the Election Commission, not
relayed figures and not press summaries.

**So the phase-wide guidance that "ECI is unreachable, do not substitute" is correct about `curl` and
`WebFetch` and wrong about this environment as a whole. The route is:
`mcp__Claude_Browser__preview_start {url}` → `navigate` to the PDF URL → the browser triggers a save
dialog → the file lands in `~/Downloads` as `.Q6L2SF6YDW.com.anthropic.claudefordesktop.XXXXXX` →
`cp` it and `pdftotext -layout` it.** For `.xlsx`, navigation is refused, so fetch in-page as an
ArrayBuffer, base64 it, and reassemble byte-exact (I did this for D17 and verified the byte count).
Any sibling that recorded an ECI absence without trying the browser should retest.

### 0.2 Document register

| # | Document | Status | Tier | Note |
|---|---|---|---|---|
| D1 | **Jammu and Kashmir Reorganisation Act, 2019 (No. 34 of 2019)** — *The Gazette of India, Extraordinary, Part II Section 1, No. 53, New Delhi, Friday, August 9, 2019 / Shravana 18, 1941 (Saka)*, 61 pp. incl. all five Schedules | **RETRIEVED TWICE AND HASH-VERIFIED.** (i) by curl from `https://prsindia.org/files/bills_acts/bills_parliament/2019/Jammu%20and%20Kashmir%20Reorganisation%20Act,%202019.pdf` (HTTP 200, 1,324,210 bytes); (ii) **from the official Gazette file store** at `https://egazette.gov.in/WriteReadData/2019/210407.pdf` (HTTP 200, 1,324,210 bytes) via `curl --resolve egazette.gov.in:443:164.100.190.144` with a browser UA | **T1 — no caveat** | **The two files are byte-identical: MD5 `0e16a53f5e362636f3d65294e562259f` for both.** I ran the comparison myself. So the tier question raised in my first draft is closed — this is the Government of India's own Gazette PDF, retrieved from the Government of India's own Gazette host, and the PRS copy is a bit-exact mirror of it. Cite it to `egazette.gov.in`. |
| D2 | **Delimitation Commission (J&K), *Delimited Landscape of Union Territory of Jammu & Kashmir*** — the Commission's own compendium, Adobe InDesign, created 5 May 2022, 33,563,204 bytes. Contains: Introduction; Notification constituting the Commission; verbatim extracts of Constitution Arts 81/82/170/329/330/332, the Delimitation Act 2002 and the J&K Reorganisation Act 2019; Delimitation Statistics; Guidelines & Methodology; **Working Papers I–VI** (the district-wise 2011 population and seat entitlement table); the Notified Delimitation Order; and the Commission's Recommendation | **RETRIEVED-BROWSER** from `https://www.eci.gov.in/Documents/Delimitation/DelimitedLandscapeOfUnionTerritoryOfJammuKashmir.pdf` | **T1** | This is the primary source for almost all of §3. It is an ECI publication retrieved directly from ECI. |
| D3 | **Delimitation Commission final order, Gazette notification, 5 May 2022** — Gazette of India Extraordinary Part II §3(iii), Order No. 2, dated 5.5.2022 / 15 Vaisakha 1944 (Saka), 20 pp., 13,281,500 bytes | **RETRIEVED-BROWSER** from `https://www.eci.gov.in/eci-backend/public/uploads/monthly_2022_05/2097327645_FinalNotification5.5.2022.pdf` | T1 | **The file is in Hindi only and its embedded text layer does not extract to legible Devanagari** (`pdftotext` yields transliteration garbage). I can read the Latin numerals in it — `(e0)` = 90, `Hrd (7)` = seven, `il (e)` = nine, `24` — and they agree with D2 and D5, but **I cannot quote a single word of this document verbatim and stage 3 must not attempt to.** An **English text of the final order is not published on the ECI delimitation page at all**; the draft order (D4) is likewise Hindi-only. |
| D4 | Delimitation Commission **draft** order / proposals, 14 March 2022, 3,679,721 bytes | **RETRIEVED-BROWSER** from `https://www.eci.gov.in/Documents/Delimitation/DelimitationofConstituenciesinUnionTerritoryofJammuKashmir.pdf` | T1 | Hindi only, same extraction problem. |
| D5 | **PIB press release, Election Commission, 5 May 2022 3:23 PM, "DELIMITATION COMMISSION FINALISES THE DELIMITATION ORDER TODAY"**, Release ID 1822939 | **RETRIEVED-BROWSER** from `https://www.pib.gov.in/PressReleasePage.aspx?PRID=1822939`, full text read | T1 | The only **English** official statement of the final order's contents I could retrieve. |
| D6 | **PIB press release, Election Commission, 3 Oct 2024 6:23 PM, "Overall, 63.88 % turnout recorded in J&K Assembly Elections"**, Release ID 2061605 | **RETRIEVED-BROWSER** from `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2061605` | T1 | The **only official source located for the 2024 J&K assembly turnout.** |
| D7 | **PIB press release, Election Commission, 27 May 2024 2:59 PM, "J&K makes an indelible mark on India's electoral history with highest voter turnout in a General Election in last 35 years"**, Release ID 2021787 | **RETRIEVED-BROWSER** from `https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2021787` | T1 | Carries the ECI's own PC-wise **gross** turnout series 1989–2019 and its own basis-break footnotes. |
| D8 | **ECI, *Statistical Report on General Election, 2014 to the Legislative Assembly of Jammu & Kashmir*** (file `2014.pdf`, 850,471 bytes) | **RETRIEVED-BROWSER** via the ECI backend download endpoint reached from `https://www.eci.gov.in/statistical-report/ae/2014/3797` | T1 | |
| D9 | ECI, same series, **2008** (`2008.pdf`, 757,903 bytes), via `https://www.eci.gov.in/statistical-report/ae/2008/3796` | **RETRIEVED-BROWSER** | T1 | |
| D10 | ECI, same series, **2002** (`2002.pdf`, 440 KB), via `https://www.eci.gov.in/statistical-report/ae/2002/3795` | **RETRIEVED-BROWSER** | T1 | |
| D11 | ECI, same series, **1996** (`1996.pdf`, 393 KB), via `https://www.eci.gov.in/statistical-report/ae/1996/3794` | **RETRIEVED-BROWSER** | T1 | |
| D12 | **ECI, GE 2024 (18th Lok Sabha) Statistical Report, table 13 "PC WISE VOTERS TURN OUT"** | **RETRIEVED-BROWSER** from `https://www.eci.gov.in/eci-backend/public/all_files/GE-2024-statistical-report/13-PC-Wise-Voters-Turn-Out.pdf` | T1 | |
| D13 | **ECI, GE 2019 (17th Lok Sabha) Statistical Report, table 13 "PC WISE VOTERS TURN OUT"**, via `https://www.eci.gov.in/statistical-report/ge/2019/1551` | **RETRIEVED-BROWSER** | T1 | |
| D14 | **ECI, GE 2014 (16th Lok Sabha) Statistical Report, "PC wise Voters Turn Out"**, via `https://www.eci.gov.in/statistical-report/ge/2014/97` | **RETRIEVED-BROWSER** | T1 | |
| D15 | **Delimitation Act, 2002 (33 of 2002)**, ss. 2, 3, 4, 5, 8, 9 — including the amendment footnotes | **RETRIEVED as reproduced verbatim inside D2** | T1 (via D2) | I did **not** retrieve the bare Act from a government host. The reproduction is inside an ECI publication and carries its own statutory footnotes ("Subs. by Act 3 of 2004, s. 4, for '1991'"), so it is a good reproduction — but it is a reproduction. |
| D16 | **Constitution of India, Articles 81(3), 82, 170, 329** | **RETRIEVED as reproduced verbatim inside D2** | T1 (via D2) | Same caveat. `legislative.gov.in` fails DNS from here; I could not retrieve the bare constitutional text. |
| D18 | PIB/ECI, 20 Sep 2024, Release ID **2057183**, phase-1 turnout 61.38 %, with AC-wise registered electors for 24 ACs | **RETRIEVED-BROWSER** `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2057183` | T1 | §2.6a |
| D19 | PIB/ECI, 27 Sep 2024, Release ID **2059395**, phase-2 turnout 57.31 %, AC-wise electors for 26 ACs | **RETRIEVED-BROWSER** `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2059395` | T1 | §2.6a |
| D20 | PIB/ECI, 1 Oct 2024, Release ID **2060906**, "Polling concludes for J&K assembly…" | **RETRIEVED-BROWSER** `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2060906` | T1 | §2.6c, §2.6d |
| D21 | PIB/ECI, 16 Aug 2024, Release ID **2046014**, the election announcement | **RETRIEVED-BROWSER** `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2046014` | T1 | §2.6e |
| D22 | PIB/ECI, 31 Aug 2024, Release ID **2050506**, revised schedule | **RETRIEVED-BROWSER** `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2050506` | T1 | §2.6e |
| D23 | ECI, "Terms of the Houses" standing reference page | **RETRIEVED-BROWSER** `https://www.eci.gov.in/term-of-the-houses` | T1 | §2.6e(iv), §2.7 |
| D24 | PIB, Ministry of Law and Justice, 23 Mar 2023, Release ID **1910038** — written reply of the Union Minister of Law & Justice in the Rajya Sabha on delimitation | **RETRIEVED-BROWSER** `https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2050506` **— NOTE: this URL served Release ID 1910038, not 2050506.** The PIB iframe endpoint returned a different release from the one requested. I read what it served and register it under what it actually is. **Anyone re-fetching should use the release id, not that URL.** | T1 | §2.6e(vi) |
| D17 | **ECI, *Bye-Election 2017* workbook** `ByeElectionJan-Dec2017.xlsx`, 117,576 bytes, 27 sheets — one per by-election held in India in 2017 | **RETRIEVED-BROWSER** from `https://www.eci.gov.in/ByeElection/2017/ByeElectionJan-Dec2017.xlsx` (fetched in-page as ArrayBuffer, base64'd, reassembled byte-exact on disk, read with `openpyxl`) | **T1** | Sheet "2-Srinagar PC" is the whole of §4.2a. The **absence** of an Anantnag sheet is §4.3. |

**NOT RETRIEVED, and named as such:**
- ~~The bare text of the J&K Reorganisation Act from any **government** host.~~ **CLOSED. Retrieved from the official Gazette file store at `https://egazette.gov.in/WriteReadData/2019/210407.pdf` and verified byte-identical (MD5 `0e16a53f5e362636f3d65294e562259f`) to the PRS copy. D1 is T1 without caveat.** For the record: the archive route `web.archive.org/web/2023id_/…indiacode…pdf` was tried with curl and a browser UA and returned the nginx 404 that every Wayback playback URL returns here; the Gazette file store, reached via `curl --resolve egazette.gov.in:443:164.100.190.144`, is the working route.
- **Any ECI full statistical report for the 2024 J&K assembly election.** It does not exist on the ECI site — see §2.4, which is a first-class finding.
- The **English text of the delimitation final order**. Not published (§3.9).
- The **associate members' dissenting notes**. Not reproduced in the Commission's own compendium (§3.8).
- The J&K Chief Electoral Officer's site (`ceojk.nic.in`), which D5 and D2 both name as a place the order was hosted. Unreachable.

---

## 1. PERIODISATION APPLIED TO THIS SUBJECT — reasoned per series, not mechanically

The fixed rule: **31 October 2019** is the administrative-unit break; any series whose geographic
denominator is "Jammu and Kashmir" changes referent there. **May 2014 is not a counting-basis break.**
Below, each series I propose is tested individually. Two of the four break at 31 October 2019; one does
not break there but breaks somewhere else; one breaks in **two** places.

### Series A — `jk-assembly-seats` (number of seats in the legislature)
**BREAKS AT 31 OCTOBER 2019, AND AGAIN AT THE DELIMITATION ORDER.** Two breaks, not one.
87 filled seats (State, incl. Ladakh) → 83 (UT, excl. Ladakh) → 90 (UT, post-delimitation). See §3.1.

### Series B — `jk-electors` (size of the electorate)
**BREAKS AT 31 OCTOBER 2019.** Ladakh's electors leave the frame. The ECI's own tables show this
directly: the GE 2019 statistical report (D13) lists Ladakh as PC 4 **inside** the "Jammu & Kashmir"
block and inside its State Total; the GE 2024 report (D12) lists "Ladakh" as its **own separate block**
after the "Jammu and Kashmir" State Total. The break is on the face of the instrument.

### Series C — `jk-assembly-turnout-percent` and `jk-lok-sabha-turnout-percent`
**THE RATIO DOES NOT MECHANICALLY BREAK AT 31 OCTOBER 2019** — each election's percentage is computed
within its own frame, so no arithmetic discontinuity is introduced by the territorial change. **But the
series is still not comparable across the date**, because the population it is a ratio *of* changed. The
correct treatment is not a seam but a **stated denominator on every point** plus, where a like-for-like
comparison is wanted, an explicitly recomputed Ladakh-excluded back-value. **I have computed those and
they are in §2.3.** This is the case where the rule does not bite the way it looks like it should, and
saying so is the finding.
- **Two further breaks bite this series harder than 31 October 2019 does, and both are established from
  primary documents:** (i) the ECI's **headline turnout basis is not constant** — see §2.5, a
  four-value-for-one-quantity finding; (ii) **PC-level** turnout breaks at the delimitation order, and
  the ECI says so itself (§3.10).

### Series D — `jk-population-per-assembly-seat-by-division`
Derived, and computable only from 2011 onward on a consistent basis. Not a time series in the ordinary
sense: it is a two-point comparison (pre- and post-delimitation seat frame, same 2011 population). §3.5.

### The 2002 election introduces its own denominator problem, unrelated to 2019
See §2.2: in 2002 the ECI computed turnout over **85** constituencies, not 87, because two were
uncontested. Its own report states both denominators. Any 1996–2014 assembly turnout line that does not
say which of the two 2002 denominators it used is unsourced.

### Corroboration from a second official instrument
A sibling part establishes that **CAG's audit-report database splits the entity into "Jammu and Kashmir
State (Upto 30-Oct-2019)" and "Jammu and Kashmir UT (31-Oct-2019 Onwards)"**. RELAYED to me through the
sibling; I did not retrieve CAG. It is a second, independent official body treating 31 October 2019 as an
entity change rather than a continuation, which supports Series A and B breaking there.

---

## 2. THE ELECTORAL SERIES

### 2.1 J&K assembly elections — ECI's own statistical reports, figures as printed

**All four figures below are from the ECI's own "HIGHLIGHTS" and "ELECTORS DATA SUMMARY" pages, retrieved
directly (D8–D11). Denominator stated on the face of every row.**

| Election | Denominator (territory) | Constituencies (GEN / SC / ST) | Electors incl. service | Voted **at polling stations** | Voted **incl. postal** | ECI's printed headline % | Postal-inclusive % (computed) | Valid votes |
|---|---|---|---|---|---|---|---|---|
| **1996** | State of J&K **incl. Ladakh** | 87 (80 / 7 / **0**) | 4,761,095 | 2,567,038 | *not disclosed* | **53.92 %** | *cannot compute* | 2,482,922 |
| **2002** | State of J&K **incl. Ladakh**, but see below | 87 (80 / 7 / **0**) | 6,165,285 (all 87) — **6,078,570 (the 85 that polled)** | 2,656,627 | *not disclosed* | **43.70 %** *(over the 85-AC denominator)* | *cannot compute* | 2,655,570 |
| **2008** | State of J&K **incl. Ladakh** | 87 (80 / 7 / **0**) | 6,461,757 | 3,952,094 | 3,968,669 (postal 16,575) | **61.16 %** | **61.4178 %** | 3,965,644 |
| **2014** | State of J&K **incl. Ladakh** | 87 (80 / 7 / **0**) | 7,316,946 | 4,794,374 | 4,822,776 (postal 28,402) | **65.52 %** | **65.9124 %** | 4,768,852 |
| **2024** | **UT of J&K, excl. Ladakh** | **90 (74 / 7 / 9)** | **8,823,899 — DERIVED, not published; see §2.6a** | **≈5,636,539 — derived** | **not published** | **63.88 %** *(at polling stations — D6)* | **NOT COMPUTABLE — see §2.4** | not published |

Arithmetic checks I ran on the retrieved figures (all exact):
- 2014: 4,794,374 + 28,402 = 4,822,776 ✓ (matches ECI's own "ELECTORS WHO VOTED … e. TOTAL")
- 2014: 4,794,374 / 7,316,946 = **65.5243 %** → ECI's printed 65.52 %
- 2014: 4,822,776 / 7,316,946 = **65.9124 %** → **65.91 %**
- 2008: 3,952,094 / 6,461,757 = **61.1613 %** → ECI's printed 61.16 %
- 2008: 3,968,669 / 6,461,757 = **61.4178 %**
- 2002: 2,656,627 / 6,078,570 = **43.7048 %** → ECI's printed 43.70 %
- 2002: 2,656,627 / 6,165,285 = **43.0901 %** ← the number you get if you use the 87-AC electorate
- 1996: 2,567,038 / 4,761,095 = **53.9174 %** → ECI's printed 53.92 %

### 2.1a **L-0010 IS NOT WRONG, AND THE REASON IT LOOKS WRONG IS THE FINDING**

Live record **L-0010** (`data/ledger/baseline.json`) states the 2014 J&K assembly election recorded
**65.91 %** turnout. Widely-circulated accounts, and the ECI's own report, say **65.52 %**. I did not have
to choose: **both numbers are printed in the same ECI document, seven pages apart.**

- p. 6, "HIGHLIGHTS", item 3(ii)/(iii): "NO. OF ELECTORS WHO VOTED **AT POLLING STATIONS** … 4794374 …
  POLLING PERCENTAGE … **65.52 %**"
- p. 13, "ELECTORS DATA SUMMARY", item 3: electors who voted, Male 2,499,904 + Female 2,294,469 + Third
  Gender 1 + **Postal 28,402** = **TOTAL 4,822,776** → **65.91 %**

**L-0010's 65.91 % is the postal-inclusive turnout. The ECI's headline 65.52 % excludes postal ballots.**
Stage 3 must not "correct" L-0010. What it must do is put the basis on the face of the figure. My
recommendation: leave L-0010's value alone and add the basis to it, or record the pair.

### 2.2 The 2002 denominator, on the face of the ECI's own report

D10 prints two electorates for one election, under two headings:
- "3. TOTAL ELECTORS … 6165285"
- "3a. **ELECTORS OF 85 CONSTITUENCIES WHERE POLLING TOOK PLACE** … 6078570 … ii. NO. OF ELECTORS WHO
  VOTED 2656627 … iii. POLLING PERCENTAGE **43.70 %**"

The two constituencies that did not poll are identifiable from the same report's HIGHLIGHTS: "MINIMUM
CONTESTANTS IN A CONSTITUENCY : **1** IN **47 - NOBRA** And **48 - LEH**". Both are **Ladakh** seats, both
returned unopposed. So the 2002 turnout percentage is computed over a denominator that already excludes
two of the four Ladakh constituencies — seventeen years before Ladakh left the frame. Anyone building an
assembly turnout line from ECI reports and reading only the headline gets 43.70 % for 2002 without any
indication that its denominator differs in kind from every other year's.

### 2.3 J&K Lok Sabha turnout — the Ladakh break, done properly

**Figures as printed in the ECI statistical reports (D12, D13, D14). The ECI's headline "Voter Turn Out
(%)" column in the Lok Sabha reports is GROSS — it includes postal ballots.** I verified this against the
data: 2014 J&K total voters 3,571,537 / electors 7,183,129 = 49.7212 % = ECI's printed 49.72 %; and D7
independently labels the 2019 values "Gross Voter Turnout".

| GE | Denominator as printed by ECI | Electors | Total voters (incl. postal) | ECI headline turnout |
|---|---|---|---|---|
| **2014 (16th LS)** | "Jammu & Kashmir" State Total — **6 PCs including Ladakh** | 7,183,129 | 3,571,537 | **49.72 %** |
| **2019 (17th LS)** | "Jammu & Kashmir" State Total — **6 PCs including Ladakh** | 7,922,538 | 3,562,744 | **44.97 %** |
| **2024 (18th LS)** | "Jammu and Kashmir" State Total — **5 PCs, Ladakh listed separately** | 8,802,348 | 5,162,866 | **58.65 %** |

Ladakh PC alone, from the same tables: 2014 electors 166,763, voters 119,068 → **71.40 %**; 2019 electors
179,232, voters 127,350 → **71.05 %**; 2024 electors 190,576, voters 135,662 → **71.19 %**.

**Recomputed on the post-2019 territory (Ladakh removed from 2014 and 2019), which is the only
like-for-like comparison:**

| GE | Electors (excl. Ladakh) | Voters (excl. Ladakh) | Turnout, UT-comparable |
|---|---|---|---|
| 2014 | 7,183,129 − 166,763 = **7,016,366** | 3,571,537 − 119,068 = **3,452,469** | **49.2059 %** |
| 2019 | 7,922,538 − 179,232 = **7,743,306** | 3,562,744 − 127,350 = **3,435,394** | **44.3660 %** |
| 2024 | **8,802,348** | **5,162,866** | **58.6533 %** |

So on a constant territory, 2019 → 2024 is **+14.29 percentage points**, not the +13.68 pp you get from
the naive "44.97 → 58.65" splice. **The naive splice understates the rise**, because Ladakh's ~71 %
turnout was propping up the 2019 State figure. This is the exact case where failing to break the
denominator biases the answer *against* the government, which is worth stating plainly: denominator
discipline is not a one-directional instrument.

Note also the electorate: **7,743,306 (2019, excl. Ladakh) → 8,802,348 (2024) = +1,059,042, +13.68 %** in
five years. That figure is the anchor for §5.3.

**The ECI does the Ladakh removal itself.** D7, footnote to its own comparison chart, verbatim:
> "* PC of Ladakh has been removed which was part of erstwhile state of J&K for comparison."

### 2.4 **THE 2024 ASSEMBLY STATISTICAL REPORT DOES NOT EXIST — and it is not a J&K-specific fact**

The ECI's statistical-reports index (`https://www.eci.gov.in/statistical-reports`, tab "General Election
To State Legislative Assembly") lists Jammu & Kashmir with year links **2024, 2014, 2008, 2002, 1996,
1987, 1983, 1977, 1972, 1967, 1962**. The 2024 link resolves to `/statistical-report/ae/2024/7`.

Reached both by direct navigation and by clicking through the SPA, that page renders, verbatim:
> **"Error: No data found for year 2024."**

and its backing API call (`/eci-backend/public/api/get-statistical?categories=wj1TfIxi5cuPx2cB3WLUoQ%3D%3D`)
returns `{"code":204,"status":10,"success":false,"error":"Internal Server Error"}`.

**I tested the trap and it is a trap.** The 2024 entries for the other seven states polled that year are
`/statistical-report/ae/2024/2` (Andhra Pradesh), `/3` (Arunachal), `/4` (Odisha), `/5` (Sikkim), `/6`
(Haryana), `/8` (Maharashtra), `/9` (Jharkhand). I loaded Haryana's: it serves a completely unrelated
category ("My Vote Matters — Vol III Issue 2", the ECI's quarterly magazine). By contrast
`/statistical-report/ae/2019/11697` resolves correctly to "Haryana Legislative Assembly Election, 2019",
and every J&K year from 2014 back resolves correctly.

**Conclusion, stated exactly: as at 3 August 2026 — twenty-two months after the poll — the ECI has not
published a full statistical report for ANY of the eight state assembly elections held in 2024, including
Jammu & Kashmir. The small integers 2–9 in the 2024 URLs are not document identifiers; they are
placeholders standing where a document id would be.** This is **`not-published`**, not `withheld`: no
named requester, no specific request, no refusal. It is not evidence of anything J&K-specific and must not
be authored as such.

**What this costs, concretely.** For the 2024 J&K assembly election there is **no published figure** for:
electors, votes polled including postal, valid votes, NOTA, rejected votes, constituency-wise electors or
turnout on the final basis, or party-wise vote share on the final basis. **The postal-inclusive turnout —
the basis on which L-0010's 65.91 % for 2014 stands — cannot be computed for 2024 from anything the ECI
has published.** The only 2024 assembly turnout figure in existence from an official source is the
provisional at-polling-stations 63.88 % in D6.

Also gone: the page `https://www.eci.gov.in/jk-legislative-assembly-election-2024`, which appears in
search indexes, now returns the ECI's 404 page.

### 2.5 **FOUR OFFICIAL FIGURES FOR ONE QUANTITY — the ECI's 2024 Lok Sabha J&K turnout**

All four are the Election Commission's own, all four are for the UT of J&K in GE 2024, and all four were
retrieved this session:

| Value | Basis | Source | Date |
|---|---|---|---|
| **58.46 %** | "Combined Voter Turnout (VTR) **at the polling stations** for the entire Union Territory (5 Lok Sabha seats)" | D7, PIB/ECI press release | 27 May 2024 |
| **58.58 %** | quoted as J&K's turnout "in last Lok Sabha polls" | D6, PIB/ECI press release | 3 Oct 2024 |
| **58.0739 %** | electors 8,802,348, EVM votes 5,111,867 (i.e. excluding the 50,999 postal) | D12, ECI statistical report, computed by me | 2025 |
| **58.6533 %** | electors 8,802,348, total voters 5,162,866 (postal-inclusive) — **the ECI's own printed "State Total" is 58.65** | D12, ECI statistical report | 2025 |

The same structure repeats PC by PC. Press note (D7) against statistical report (D12):
Srinagar 38.49 % / **38.68 %**; Baramulla 59.1 % / **59.31 %**; Anantnag-Rajouri 54.84 % / **55.50 %**;
Udhampur 68.27 % / **67.98 %**; Jammu 72.22 % / **72.02 %**. Note the last two move *down*, so this is not
simply "provisional plus postal".

**And the ECI states the basis break itself, in its own chart footnotes.** D7, verbatim:
> "** Graph depicts **Gross VTR for 1996-2019**; For 2024, VTR is **at polling stations**"

That is the Election Commission publishing a chart of "highest turnout in 35 years" whose final point is
on a different basis from every earlier point, and saying so in a footnote beneath it. It is the cleanest
example in this phase of a basis change disclosed but not corrected.

**A further basis inconsistency inside the ECI's own report family, which I have not seen stated
anywhere:** in the **same year, 2014**, the ECI's **assembly** statistical report headline
("POLLING PERCENTAGE", 65.52 %) **excludes** postal ballots, while its **Lok Sabha** statistical report
headline ("Voter Turn Out (%)", 49.72 %) **includes** them. Two ECI statistical reports, one election
year, one territory, two definitions of turnout, neither cross-referenced.

### 2.6 The 2024 assembly election, as established

#### 2.6a **THE 2024 ASSEMBLY ELECTORATE, RECONSTRUCTED — 8,823,899 electors across 90 ACs**

The ECI never published a total. **I derived one by summing the AC-wise "Total Registered Electors" column
of the ECI's own three phase press notes, which between them cover all ninety constituencies exactly once.**

New documents, all **RETRIEVED-BROWSER**, all **T1**:
- **D18** — PIB/ECI, 20 Sep 2024 8:06 PM, Release ID **2057183**, "Voter turnout of 61.38 % recorded in
  phase-1 of J&K Assembly Elections", `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2057183`
- **D19** — PIB/ECI, 27 Sep 2024 1:36 PM, Release ID **2059395**, "Voter turnout of 57.31 % recorded in
  Phase-2 of J&K Assembly Elections", `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2059395`
- **D20** — PIB/ECI, 1 Oct 2024 8:39 PM, Release ID **2060906**, "Polling concludes for J&K assembly,
  heralding a new dawn for the region", `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2060906`
- (D6, already registered, is the phase-3 note.)

**Coverage check, which is what makes the sum legitimate:** AC numbers **1–90, each appearing exactly
once, no gaps and no duplicates.** Phase 1 = ACs 32–55 (24). Phase 2 = ACs 17–31, 56–58, 83–90 (26).
Phase 3 = ACs 1–16, 59–82 (40). 24 + 26 + 40 = 90 ✓.

| Phase | Poll date | ACs | Registered electors | ECI's published turnout | Turnout implied by my elector-weighted sum |
|---|---|---|---|---|---|
| 1 | **18 September 2024** (D18 cites "press notes no. 134 & 135 dated 18.09.2024") | 24 | **2,327,580** | **61.38 %** | 61.38 % |
| 2 | **25 September 2024** (D19 cites "press notes no. 139 & 140 dated 25.09.2024") | 26 | **2,578,099** | **57.31 %** | 57.30 % |
| 3 | **1 October 2024** (D6 cites "press notes no. 142 & 143 dated 01.10.2024"; D20 dated 1 Oct) | 40 | **3,918,220** | **69.69 %** | 69.69 % |
| **Total** | | **90** | **8,823,899** | **63.88 %** | **63.8781 %** |

**The reconstruction validates itself.** Weighting the 90 AC turnout percentages by their own elector
counts reproduces the ECI's published overall figure to **63.8781 % against 63.88 %** — four significant
figures, from ninety independently-published rows. That is strong evidence both that my elector total is
right and that **the ECI's headline 63.88 % is the elector-weighted mean of the constituency figures, on
the at-polling-stations basis, over a denominator of 8,823,899.**

**So the denominator of the 2024 assembly turnout, which the ECI never states anywhere, is 8,823,899
registered electors across 90 constituencies. Stage 3 may author that as a derived figure with the
derivation shown.** Caveat, stated: the column is headed "Total Registered Electors" and it is not
established whether it includes service electors — the 2014 assembly report's comparable figure is
explicitly "Including Service Electors". So the two are close but not certainly identical in scope.

#### 2.6b **DIVISION-WISE 2024 TURNOUT AND ELECTORATE — computed, and it is the other half of §3.5**

The post-delimitation AC numbering runs **Kashmir division = ACs 1–47, Jammu division = ACs 48–90**. I
verified this against the constituency names in D6/D18/D19: ACs 1–16 Kupwara/Baramulla/Bandipora, 17–18
Ganderbal, 19–26 Srinagar, 27–31 Budgam, 32–35 Pulwama, 36–37 Shopian, 38–40 Kulgam, 41–47 Anantnag = 47;
48–50 Kishtwar, 51–53 Doda, 54–55 Ramban, 56–58 Reasi, 59–62 Udhampur, 63–68 Kathua, 69–71 Samba, 72–82
Jammu, 83–87 Rajouri, 88–90 Poonch = 43. Both counts match D5's 47/43 exactly.

| | Seats | Registered electors | **Electors per seat** | Turnout (at polling stations) |
|---|---|---|---|---|
| **Kashmir division** | 47 | **4,636,698** | **98,653** | **55.50 %** |
| **Jammu division** | 43 | **4,187,201** | **97,377** | **73.15 %** |
| UT total | 90 | 8,823,899 | 98,043 | 63.88 % |

**Two findings here, and they pull in opposite directions — which is exactly why both must be recorded.**

1. **On the 2024 ELECTORAL ROLL, the two divisions are almost exactly equally represented: 98,653 electors
   per Kashmir seat against 97,377 per Jammu seat — a gap of 1,276, or 1.31 %.** Compare §3.5, where on
   the **2011 Census population** the gap is 21,481, or 17.17 % of the Jammu figure. **The delimitation
   looks far more lopsided on census population than it does on registered electors, and the reason is
   that Kashmir division has a younger age structure and therefore fewer electors per head of population.**
   Anyone arguing the delimitation case on "voters per seat" and anyone arguing it on "people per seat"
   will reach different answers from the same official data. Neither is wrong; they are different
   denominators, and **the choice between them is the dispute.** *(Both are computable, so this still
   fails criterion (c) — see §6.1, which this strengthens rather than disturbs.)*
   - Arithmetic: 4,636,698 / 47 = 98,653.15; 4,187,201 / 43 = 97,376.77; difference 1,276.4;
     as a proportion of the Jammu figure, 1.311 %.
   - Against §3.5's population figures: 146,563.3 / 125,082.3 = 1.1717, i.e. **+17.17 %**;
     against 98,653.2 / 97,376.8 = 1.0131, i.e. **+1.31 %**. **A thirteen-fold difference in the measured
     disparity, purely from changing the denominator from persons to electors.**
   - Implied electors as a share of 2011 population: Kashmir 4,636,698 / 6,888,475 = **67.31 %**;
     Jammu 4,187,201 / 5,378,538 = **77.85 %**. That 10.5-point gap is the whole of the effect.
     **CAVEAT, and it is a real one: this ratio mixes a 2024 electoral roll with a 2011 population and so
     confounds age structure with thirteen years of differential population growth. It is not a
     measurement of age structure and must not be authored as one.** It is enough to establish that the
     person-denominator and the elector-denominator disagree, which is the point.
2. **The 2024 turnout gap between the divisions is 17.65 percentage points — Jammu 73.15 %, Kashmir
   55.50 %.** So the seats where the electorate is slightly smaller are also the seats where turnout is
   substantially higher. Any "seats per vote actually cast" measure would widen the disparity again.
   I have not built that measure and I am not going to, because it has no accepted standing.

Within-division extremes from the same data, worth carrying because they are the sharpest contrast in the
retrieved material: **Habbakadal (AC 21, Srinagar) 19.81 %** and **Khanyar (AC 20) 26.09 %** against
**Marh (AC 80, Jammu, SC) 81.47 %** and **Chhamb (AC 82) 80.34 %**. The six Srinagar-city ACs (19–26,
excluding Budgam-side seats) all polled between 19.81 % and 36.95 %.

#### 2.6c **THE ECI'S OWN PRESS NOTE MISSTATES THE 2014 SEAT COUNT — a retroactive relabelling, caught in the act**

D20 (PIB/ECI, 1 October 2024), verbatim:
> "Despite an increase in the number of ACs **from 83 in 2014 to 90 in 2024**, the elections were completed
> in 3 phases this time as against 5 phases in 2014."

**The 2014 J&K assembly election was held on 87 constituencies, not 83.** The authority is the Election
Commission's own statistical report for that election (D8), which prints "NO OF CONSTITUENCIES … TOTAL
**87**" on its HIGHLIGHTS page and again on its ELECTORS DATA SUMMARY page, and whose result section
records "ELECTED … **87**". The figure 83 is the **post-31-October-2019, pre-delimitation** count — a
number that never had an election held on it.

**This is the retroactive-relabelling trap, committed by the Election Commission in an official release,
and it is the same shape as the trap phase 11 recorded against MHA (P-86's closing note: tables headed "UT
of Jammu & Kashmir" carrying rows for 2018 and 2019).** Here the mechanism is visible: the 2014 election's
seat count has been silently re-cut to the post-Ladakh territory so that the delimitation appears as a
clean 83 → 90 increase, when what actually happened to the elected House was 87 → 90 across two separate
instruments. **A reader taking 83 as the 2014 baseline will compute the wrong number of added seats (7
instead of the 3 net change in the elected House, or will miss the Ladakh subtraction entirely).**

Stage 3 should record this as a live instance rather than a curiosity: **it is a case where the ECI's own
press note and the ECI's own statistical report contradict each other about a countable fact, and the
press note is the one the secondary literature quotes.** Phase-11 trap 1 applies in its own words: *a
source that looks independent and is media-derived from official reporting is not a check.* Every press
account of the 2024 J&K election that says "83 to 90" inherited it from D20.

#### 2.6d Other quantities in D20, and one internal consistency check that passes

From D20 (all ECI's own claims, retrieved):
- **"No repolls recorded so far"** as at 1 October 2024.
- Election **announced 16 August 2024**; **3 phases in 2024 against 5 phases in 2014**.
- **"a significant increase (~23%) in the size of the electorate from 2014"**, and **"an increase of
  27.90% in female electors"**. **The denominator of that ~23 % is not stated and is not recoverable from
  the document** — and given §2.6c it may well be computed against an 83-AC-equivalent 2014 roll rather
  than the 87-AC roll of 7,316,946 the ECI itself published. For the record: 8,823,899 / 7,316,946 =
  **+20.60 %** against the full 87-AC 2014 electorate including Ladakh. **The ECI's ~23 % and my +20.60 %
  are not the same computation and I am not asserting that either is wrong** — only that the ECI's
  percentage cannot be checked from anything the ECI has published, which is itself the finding.
- **"a 7% increase in the number of candidates contesting from assembly elections in 2014"** — 2014 had
  **831** contestants (D8), so this implies roughly 889 in 2024.
- **"women candidates … increasing from 28 to 43"**. **This one checks out exactly**: D8's HIGHLIGHTS
  item 9(i) prints female contestants in 2014 = **28**. An independent confirmation that D20's 2014
  comparisons are drawn from the real 2014 report where the quantity is unaffected by the seat-count
  question — which makes the 83/87 error in the same release harder to read as a typo and easier to read
  as a deliberate rebasing.
- RUPPs **138 in 2014 → 236 in 2024** (+71 %; 236/138 = 1.710 ✓).
- Webcasting at **100 %** of polling stations against **20 %** in 2014; **98** polling stations shifted at
  the eleventh hour in 2014 against none in 2024; **over 170** election-related law-and-order incidents in
  2014 including 87 on polling days, against none major in 2024. **The last is phase-11 subject matter and
  I am not authoring it — recorded here only so the boundary is visible.**
- **469 polling stations near the Line of Control and International Border** (106 in phase 2, 363 in
  phase 3).
- **Kashmiri Migrant voters: 24 special polling stations — Jammu 19, Udhampur 1, Delhi 4 — and 21,395
  migrant voters voted** across the three phases. Form-M abolished and replaced by self-certification.
  *(Note for consistency: D7 gives 21 + 1 + 4 = 26 such stations for the 2024 Lok Sabha election. Both are
  ECI; the two elections had different numbers. Not a contradiction.)*
- **Home voting**, first time in a J&K assembly election: **3,381** electors aged 85+ and **2,734** PwD
  electors voted from home.
- Seizures **₹130 crore**, of which **drugs ₹110.45 crore** — against ₹100.94 crore at the 2024 Lok Sabha
  election.
- **A within-election vintage change worth recording: D20 (1 October, 8:39 PM) gives phase-3 turnout as
  "65.58% as of 7 PM" and expressly calls it provisional; D6 (3 October) gives phase-3 as 69.69 %. A
  4.11-percentage-point revision in 48 hours, on the same basis (at polling stations), from the same
  body.** Any figure taken from a poll-day release is a different observation from the same figure taken
  two days later, and this is the measured size of that difference.

From D6 (PIB/ECI, 3 October 2024) — the only official source located:
- **Overall turnout 63.88 % at polling stations.** Male 64.68 %, female 63.04 %, third gender 38.24 %.
- Phase 3 (40 ACs) 69.69 %; female turnout exceeded male in that phase (70.02 % vs 69.37 %).
- The release refers back to "ECI's two press notes no. 142 & 143 dated 01.10.2024" for phases 1 and 2.
  **I did not retrieve press notes 142 and 143**, so I cannot give phase-1 and phase-2 turnout from a
  retrieved source and will not repeat the figures circulating for them.
- D6 states in terms: "The voter turnout given in Table 1 is at the polling stations and final votes
  polled will be available post-counting with counting of postal ballots."
- D6 gives elector counts for all 40 phase-3 ACs individually (e.g. Karnah 58,086; Gurez(ST) 22,291;
  R. S. Pura–Jammu South 130,107; Chhamb 106,035). AC numbers 1–16 and 59–82 — i.e. the phase covered
  Kupwara/Baramulla/Bandipora in the Kashmir division and Udhampur/Kathua/Samba/Jammu in the Jammu
  division. **A full 90-AC elector total for 2024 is not obtainable from this release.**
- **Phases and dates: three phases. I have 1 October 2024 (phase 3, from D6's reference to press notes of
  01.10.2024 and its phase-3 table) established from a retrieved source. The 18 and 25 September 2024
  dates for phases 1 and 2 are RELAYED and I did not retrieve them.**
- **Result: NOT ESTABLISHED FROM ANY RETRIEVED SOURCE.** I did not retrieve a party-wise result for the
  2024 J&K assembly election from ECI or PIB. Do not author one from memory.

#### 2.6e **THE SCHEDULE, THE SUPREME COURT'S DEADLINE, AND A DISCREPANCY THAT MUST NOT BE ROUNDED**

Two more documents, both **RETRIEVED-BROWSER**, both **T1**:
- **D21** — PIB/ECI, 16 Aug 2024 5:51 PM, Release ID **2046014**, "General Election to Legislative
  Assemblies of Haryana, and Jammu and Kashmir, 2024", `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2046014`
- **D22** — PIB/ECI, 31 Aug 2024 9:21 PM, Release ID **2050506**, "…Change of Date of Poll in Haryana and
  Counting of Votes in Jammu and Kashmir and Haryana", `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2050506`
- **D23** — ECI, "Terms of the Houses", `https://www.eci.gov.in/term-of-the-houses` (standing reference
  page), **RETRIEVED-BROWSER**, **T1**

**(i) The ECI states, in its own words, that the Supreme Court is why the election happened.** D21, verbatim:
> "**As per Supreme Court judgment dated 11th December 2023 in the matter of Writ Petition (Civil)
> No. 1099 of 2019, the Commission has also decided to take necessary steps to conduct election to the
> legislative assembly of UT of Jammu and Kashmir.**"

That is the closest thing to an official statement about the 2014–2024 gap that I retrieved, and it is
about the gap's **end**, not its duration. **It does not explain any of the six years and must not be
authored as if it did.** It does establish that the ECI attributes the decision to hold the election to a
judicial direction rather than to its own assessment of conditions.

**(ii) The schedule, from the ECI's own two press notes.**

| | As announced 16 Aug 2024 (Press Note **ECI/PN/128/2024**, quoted in D22) | As revised 31 Aug 2024 (D22) |
|---|---|---|
| Gazette notification (Phase-III) | — | 05.09.2024 |
| Last date for nominations | — | 12.09.2024 |
| Scrutiny | — | 13.09.2024 |
| Withdrawal | — | 17.09.2024 |
| **Poll, J&K Phase-III** | **01.10.2024** | **01.10.2024 (NO CHANGE)** |
| **Counting** | **04.10.2024** | **08.10.2024** |
| **Date before which election shall be completed** | **06.10.2024** | **10.10.2024** |

Phase polls: **18 September, 25 September, 1 October 2024** (§2.6a).

**(iii) THE DISCREPANCY, stated so it cannot be rounded either way.** A sibling establishes from the
Supreme Court's judgment of 11 December 2023 in *In Re: Article 370* (WP(C) 1099/2019) that the Court
directed elections **by 30 September 2024**. **That direction is RELAYED to me — I did not retrieve the
judgment and I am not quoting it.** Against it, the ECI's own dates:

- **The case that the direction was substantially complied with.** Two of three phases polled before
  30 September (18 and 25 September). The third polled on 1 October — **one day** after. Counting on
  8 October and completion by 10 October are administrative steps following a poll that was all but
  concluded within the period. President's Rule was revoked on 13 October 2024 (S.O. 4484(E), primary to
  MHA AR 2024-25 via L-0123), and an elected government took office. On any purposive reading of a
  direction to restore an elected assembly, it was restored, on time to within days.
- **The case that the direction was not met on its own terms.** The direction was to **hold elections by**
  a date. The ECI's own instrument does not use the poll date as the operative one: it uses "**date before
  which election shall be completed**", and **that date was 6 October in the schedule the ECI announced on
  16 August 2024 — already six days past 30 September on the day the schedule was published — and became
  10 October on 31 August.** So the ECI never at any point published a schedule that met 30 September.
  **And the four-day slip from 6 to 10 October was not made for any J&K reason at all.** D22 records the
  cause verbatim: representations "regarding mass movement of people of Bishnoi community of Haryana to
  Rajasthan to participate in centuries old Asoj Amavasya festival celebration", which moved **Haryana's**
  poll from 1 to 5 October and, because counting was common to both, moved **J&K's counting** from 4 to
  8 October. **A festival in Haryana moved the date on which Jammu and Kashmir's votes were counted.**

**DO THE TWO REST ON DIFFERENT FACTS?** **No — different weightings of the same facts, and the common
measure is a calendar.** Neither side disputes a single date. They disagree about which event in the
sequence the words "hold elections by" attach to: the poll, the count, or the ECI's own declared
completion. **That is a question about the construction of a judicial direction, not about evidence, and
it fails criterion (c) trivially — every fact sits on one timeline.** Stage 3 should record the timeline
and both readings, and should not assert either that the deadline was met or that it was missed.

**(iv) The ECI's own record of the House.** D23, the ECI's standing "Terms of the Houses" table, entry 30:
> "UT OF JAMMU & KASHMIR | **04.11.2024** | **03.11.2029** | LOKSABHA SEAT **5** | ASSEMBLY SEAT **90** |
> RAJYA SABHA SEAT **4**"

Three things follow. First, the ECI's own standing reference records the J&K assembly as a **90**-seat
House — a second, independent confirmation of the denominator (see §2.7). Second, the ECI's **"FROM" date
for the House is 4 November 2024**, later than both the count (8 October) and the revocation of
President's Rule (13 October); **I did not establish what event that date marks and I am not going to
guess.** Third, D21's own table gives J&K's "Term of Assembly" as literally "**--**" against Haryana's
"04.11.2019 to 03.11.2024" — the six-year gap showing up as an empty cell in the Commission's own
paperwork.

The 5 Lok Sabha and 4 Rajya Sabha seats match D1 ss. 10 and 8 respectively (s.8 inserts
"31. Jammu and Kashmir ……4" into the Fourth Schedule; s.10 allocates five House-of-the-People seats to
J&K and one to Ladakh).

**(v) D21 also confirms the reservation figures independently of the Commission.** Its opening table:
> "Jammu And Kashmir | Term of Assembly: -- | Total No. of AC Seats **90** | Reserved for SCs **07** |
> Reserved for STs **09**"

And it records the Kashmiri-migrant voting scheme's own history: postal ballots **since 1996**, special
polling stations at Delhi, Udhampur and Jammu **since 2002**, Form-M dispensed with for Jammu and Udhampur
migrants in 2024 and self-certification allowed elsewhere.

**(vi) A Union-government statement on the census freeze, retrieved in passing and worth carrying.**
PIB, Ministry of Law and Justice, 23 March 2023, Release ID **1910038** — a written reply by the Union
Minister of Law & Justice in the Rajya Sabha (**RETRIEVED-BROWSER**, T1):
> "As per existing law, **the next delimitation exercise may be conducted after the first census to be
> taken after the year 2026.**"
That is the Union government's own statement of the freeze described in §3.2, given to Parliament, and it
makes no exception for J&K — consistent with s.63 of D1, which applies the same terminal condition to J&K.

### 2.7 **DOES THE ECI COMPUTE TURNOUT OVER 90 OR 114? — answered**

**Over 90. Unambiguously, and it follows from the statute rather than from ECI practice.**

J&K Reorganisation Act 2019 (D1), **s. 14(4)**, verbatim:
> "Nowithstanding anything contained in sub-section (3), until the area of the Union territory of Jammu
> and Kashmir under the occupation of Pakistan ceases to be so occupied and the people residing in that
> area elect their representatives— (a) **twenty four seats in the Legislative Assembly of Union territory
> of Jammu and Kashmir shall remain vacant and shall not be taken into account for reckoning the total
> membership of the Assembly**; and (b) **the said area and seats shall be excluded in delimiting the
> territorial constituencies** as provided under PART V of this Act."

**Two further ECI confirmations, both primary and both retrieved after this section was first written:**
D21 (ECI's own election announcement, 16 August 2024) tabulates J&K as "Total No. of AC Seats **90**", and
D23 (ECI's standing "Terms of the Houses" table) records "ASSEMBLY SEAT **90**". **The Election Commission
never uses 114 anywhere I have seen.**

The 24 seats are therefore (i) excluded from the reckoned membership by express statutory words, and
(ii) excluded from delimitation altogether — no territory is drawn for them, so no elector is ever
registered in them and no polling station ever exists in them. **They cannot enter a turnout denominator
because a turnout denominator is built from electoral rolls, and there are no rolls.** The ECI's own
figures confirm the practice: D6 tabulates 40 ACs numbered 1–82 for phase 3 and gives an "Overall J&K"
percentage; the AC numbering runs 1–90 with no gap for the reserved seats.

**The 24 are a fact about the size of the House, not about the electorate.** They belong in a seat-count
series, flagged as never-filled, and nowhere near a turnout series. Any figure of "114" in a turnout
context is an error.

---

## 3. DELIMITATION

### 3.1 **THE SEAT ARITHMETIC, SHOWN, EVERY STEP FROM A PRIMARY DOCUMENT**

| Step | Value | Authority, verbatim where quoted |
|---|---|---|
| Erstwhile State of J&K, assembly as last delimited (1995, on the **1981** Census) | **111** notional | D2, Introduction: "The erstwhile Jammu and Kashmir Assembly at that time had **111 seats including 4 seats in Ladakh**. **24 seats of this was kept reserved for Pak occupied Jammu and Kashmir**." Also: "The Assembly seats in the erstwhile state of Jammu and Kashmir were **last delimited in 1995 based on 1981 Census**." |
| less the 24 never-filled PoK seats | 111 − 24 = **87** | same |
| of which Ladakh | **4** (Nobra, Leh, Kargil, Zanskar) | D2; and D8–D11 all print "NO. OF CONSTITUENCIES … TOTAL 87" for the State elections, with ACs 47-Nobra and 48-Leh named in D10 |
| **31 Oct 2019 — Ladakh leaves the frame** | 87 − 4 = **83** | D1 **s. 14(10)**: RPA 1950 Second Schedule, "II. Union Territories", new entry — `‘‘5. Jammu and Kashmir 83 6 …. 83 6 …..’’`. And D1 **Third Schedule** [see s.14(5)] lists exactly **83** assembly constituencies for the UT, numbered 1–83, which I parsed district by district: Kupwara 1–5, Baramulla 6–15, Srinagar 16–25, Budgam 26–30, Pulwama 31–36, Anantnag 37–46 (**Kashmir division = 46**); Doda 47–52, Udhampur 53–58, Kathua 59–63, Jammu 64–76, Rajouri 77–80, Poonch 81–83 (**Jammu division = 37**). 46 + 37 = 83 ✓ |
| notional total at reorganisation | 83 + 24 = **107** | D1 **s. 14(3)**, verbatim: "The total number of seats in the Legislative Assembly of the Union territory of Jammu and Kashmir to be filled by persons chosen by direct election shall be **107**." (107 − 24 = 83, consistent with s.14(10)) |
| **Delimitation Act mandate — the increase** | 107 → **114** | D1 **s. 60(1)**, verbatim: "Without prejudice to sub-sections (3) of section 14 of this Act, **the number of seats in the Legislative Assembly of Union territory of Jammu and Kashmir shall be increased from 107 to 114**, and delimitation of the constituencies may be determined by the Election Commission in the manner hereinafter provided" |
| **fillable seats after delimitation** | 114 − 24 = **90** | D5 (PIB, 5 May 2022): "Out of the **90** Assembly Constituencies in the region, **43 will be part of Jammu region and 47 for Kashmir region**"; D2 Working Paper I: "Assembly … Existing seats **83** … Revised Seats **90**" |
| **net addition** | 90 − 83 = **+7** | 114 − 107 = 7 ✓ — the same 7, arrived at two ways |
| **division-wise addition** | Kashmir 46 → **47** (+1); Jammu 37 → **43** (+6) | 47 + 43 = 90 ✓; +1 + 6 = +7 ✓ |

**Every step closes. The chain is: 111 → (−24 PoK) 87 → (−4 Ladakh) 83 → (+7) 90; notionally
111 → (−4 Ladakh) 107 → (+7) 114; and 114 − 24 = 90 throughout.**

**One correction to the brief's framing, stated because I was asked to say if any part is wrong:** the
brief describes 90 as "down from 87 with Ladakh's 4 gone and 7 added". The arithmetic is right but the
*order* matters for the denominator rule — the 87 → 83 step happens on 31 October 2019 under s.14, and the
83 → 90 step happens under s.60 in 2022. They are two separate breaks with two separate instruments and
two different dates, and a seat series must break twice, not once.

### 3.2 **THE POPULATION BASIS — the single most important thing here**

Established entirely from primary text (D1 for the Reorganisation Act; D15 and D16 as reproduced verbatim
in the Commission's own compendium D2).

**(a) What applies to J&K.** D1 **s. 62(1)**, verbatim:
> "On and from the appointed day, notwithstanding the publication of orders under sub-section (1) of
> section 10 of the Delimitation Act, 2002 or anything contained in sub-section (2) or sub-section (4) of
> the said section, the Delimitation Act, 2002 **shall be deemed to have been amended** as provided
> below: (a) in section 2(f), the words **"but does not include the State of Jammu and Kashmir" shall be
> omitted**; and (b) for the purpose of delimitation of Assembly and Parliamentary Constituencies, the
> words and figure **"census held in the year 2001", wherever occurring, shall be construed as words and
> figure "census held in the year 2011"**."

And D1 **s. 63**:
> "Notwithstanding anything contained in sections 59 to 61, until the relevant figures for the first
> census taken after the year 2026 have been published, it shall not be necessary to readjust the
> division of successor Union territory of Jammu and Kashmir into Assembly and Parliamentary
> Constituencies and any reference to the 'latest census figures' in this Part shall be construed as a
> reference to the **2011 census figures**."

And D1 **s. 14(7) Explanation, proviso** — for the SC/ST reservation arithmetic:
> "Provided that the reference in this Explanation to the last preceding census of which the relevant
> figures have been published shall, until the relevant figures for the first census taken after the year
> 2026 have been published, be construed as a reference to the **2011 census**."

**(b) What applies to every State.** Constitution **Article 170(2) Explanation, proviso** (D16):
"population" means the population at the last preceding census **"provided that … until the relevant
figures for the first census take after the years 2026 have been published, be construed as a reference to
the **2001 census**"**. Article **170(3), third proviso** (D16): until then it is not necessary to readjust
"(i) the total no. of seats in the Legislative Assembly of each State **as readjusted on the basis of 1971
census** and (ii) the division of such State into territorial constituencies as may be readjusted **on the
basis of 2001 census**". Article **82, third proviso** (D16) is the identical structure for the House of
the People: allocation of seats to States frozen on **1971**, division into constituencies on **2001**.

Delimitation Act 2002 (D15) implements exactly that: **s. 4(1)** deems the **1971**-census readjustment of
LS seat allocation and of each State's total assembly seats to be the readjustment for the Act's purposes;
**s. 4(2)** requires the Commission to readjust the division of each State into territorial constituencies
"on the basis of the census figures as ascertained at the census held in the year [**2001**]"; **s. 9(1)**
distributes seats "as readjusted on the basis of **1971** census" and delimits them "on the basis of the
census … held in the year [**2001**]"; **s. 8(a)/(b)** allocate seats on **1971** and compute SC/ST
reservation on **2001**.

The bracketed 2001s carry the Commission's own reproduced footnotes: **"1. Subs. by Act 3 of 2004, s. 4,
for '1991'"** and, at s.3, **"Subs. by Act 3 of 2004, s. 3, for '1991' (w.e.f. 31-10-2003)"**.

**(c) THE ASYMMETRY, STATED EXACTLY.**

| | Every State | UT of Jammu & Kashmir |
|---|---|---|
| **Total number of assembly seats** | Frozen on the **1971** Census (Art. 170(3) third proviso; Delimitation Act 2002 s.4(1)) until the first census after 2026 | **Increased by Parliament from 107 to 114** by J&K Reorganisation Act 2019 s.60(1) — not frozen at all |
| **Division into territorial constituencies** | **2001** Census (Art. 170(2) proviso; Delimitation Act 2002 ss.4(2), 9(1)) | **2011** Census (J&K Reorganisation Act 2019 s.62(1)(b), deeming "2001" to read "2011") |
| **SC/ST reservation basis** | **2001** Census (Delimitation Act 2002 s.8) | **2011** Census (J&K Reorg. Act s.14(7) proviso; D5 and D2 both say so in terms) |
| **Statutory route** | Delimitation Act 2002, from which J&K was **expressly excluded** by s.2(f) | The same Delimitation Act 2002, **with the J&K exclusion in s.2(f) surgically deleted for this purpose** |
| **Next readjustment** | after the first census taken after 2026 | after the first census taken after 2026 (s.63) |

**(d) THE BRIEF'S FRAMING NEEDS TWO CORRECTIONS, and I am recording both.**

1. **"frozen to the 1971 Census until 2026 by the 84th Amendment (Article 82 proviso)" is half right.**
   The freeze is **two-layered**: seat *totals* on 1971, constituency *boundaries* on **2001** — not 1971.
   The rest of India **was** re-delimited, in 2002–2008, on the 2001 Census. So the gap between J&K and
   every other state on *boundaries* is **one census (2011 vs 2001)**, not four decades; the gap on
   *totals* is **1971 vs a fresh statutory number**, which is the larger asymmetry and the one worth
   leading with. (The attribution of the 2001-boundary rule to the **87th Amendment** and of the 1971
   freeze to the **84th Amendment** is **RELAYED** — I could not retrieve constitutional amendment
   histories, only the amended text as reproduced in D2, plus the Delimitation Act footnote showing the
   statutory change was made by **Act 3 of 2004** substituting 2001 for 1991.)
2. **"by a body constituted under a special statute rather than the Delimitation Act 2002 route" is
   wrong, and the truth is more interesting.** The Commission **was constituted under s. 3 of the
   Delimitation Act, 2002**. D5 (PIB) verbatim: "the Delimitation Commission was constituted by the Govt.
   of India, **in exercise of powers conferred by Section 3 of Delimitation Act, 2002 (33 of 2002)**".
   D2's Introduction says the same. D1 s.59(b) itself defines "Delimitation Commission" as "the
   Delimitation Commission **to be constituted under section 3 of the Delimitation Act, 2002**", and
   s.62(2) requires the readjustment to "be carried by the Delimitation Commission, to be constituted
   under the Delimitation Act, 2002 **as amended by this Act**". **The bespoke element is not the body. It
   is (i) the deletion of J&K from the Act's own exclusion clause, (ii) the substitution of 2011 for 2001
   for J&K alone, and (iii) the fixing of the seat total by statute at 114.** That is a more precise and
   more defensible statement of the asymmetry, and stage 3 should use it.

### 3.3 A live internal conflict between the two statutes, resolved in favour of the Delimitation Act

D1 **s. 60(3)** provides that the Election Commission shall associate "**four persons** … being persons
who are the members of the Legislative Assembly of the Union territory of Jammu and Kashmir or **four
members of the House of the People**".

Delimitation Act 2002 **s. 5(1)** (D15) provides for **ten** associate members — five MPs and five MLAs —
with a proviso that where a State returns five or fewer members to the House of the People, **all** of them
are associate members and the total falls short of ten by the corresponding number.

**What actually happened: five.** D2 names them: Dr Farooq Abdullah, Sh. Mohammad Akbar Lone, Sh. Hasnain
Masoodi (National Conference), Sh. Jugal Kishore Sharma, Dr Jitendra Singh (BJP) — "5 members of Lok Sabha
elected from the UT … nominated by the Hon'ble Speaker of Lok Sabha". So the **Delimitation Act's** rule
governed, not s.60(3)'s "four".

**And half the statutory associate-member body could not exist.** Delimitation Act s.5(1) contemplates
five MLAs alongside the five MPs. The J&K Legislative Assembly had been dissolved on 21 November 2018 and
did not sit again until October 2024. **The constituencies of a legislature were redrawn by a body from
which the legislature's own half of the consultative membership was structurally absent, because that
legislature did not exist.** This is a first-class finding and it belongs to this phase, not phase 11.

**A correction to the brief on the "did not sign" point.** Both statutes bar it outright:
D1 s.60(3) proviso — "**none of the associate members shall have a right to vote or to sign any decision
of the Election Commission**"; Delimitation Act s.5(4) — identical. **No associate member of any
delimitation commission in India may sign. The NC members' non-signature is the statute operating, not a
protest, and must not be authored as a protest.** What the statute *does* permit is a **dissenting note**
(D1 s.60(5)(a); Delimitation Act s.9(2)(a)), and dissenting notes were in fact given — see §3.8.

### 3.4 The Commission, its dates, and its stated method

From D2 and D5, both retrieved:
- Constituted **6 March 2020** ("started functioning w.e.f. 06.03.2020" — D2).
- Chairperson **Justice (Retd.) Ranjana Prakash Desai**, former Judge of the Supreme Court. Ex-officio
  members: **Sushil Chandra** (Chief Election Commissioner) and **K. K. Sharma** (State Election
  Commissioner, UT of J&K). Secretariat headed by **Chandra Bhushan Kumar**, Sr Deputy Election
  Commissioner (Delimitation). Chief Electoral Officer of the UT: **Hirdesh Kumar** (relevant to §5.3).
- Meetings with associate members: **18 February 2021** and **20 December 2021**.
- Field visits **6–9 July 2021** (Srinagar, Pahalgam, Kishtwar, Jammu); ~242 delegations met.
- **Draft order published 14 March 2022**, "along with the dissenting notes of those Associate Members who
  gave it" (D2).
- Public sittings: **Jammu 4 April 2022**, **Srinagar 5 April 2022** (~1,600 attendees).
- **Final order signed and Gazette-notified 5 May 2022.**
- Administrative units frozen as at **15 June 2020**; the Commission wrote to the UT administration not to
  disturb them. Districts had grown from 12 to 20 and tehsils from 56 to 207 since the last delimitation.
- Working Papers I–VI; Paper I is the district-wise 2011 population and seat entitlement table used below.
- Method: all 20 districts categorised **A / B / C** (predominantly hill & difficult / hill & flat /
  predominantly flat) with a **±10 %** band around the UT average population per AC, plus discretion to
  carve an additional constituency for remoteness or international-border conditions.

**A discrepancy inside the Commission's own compendium that I could not resolve.** D2 states the band two
different ways in two different places. Its narrative (and D5's) says **±10 %**: "categorised all 20
districts in three broad categories A, B and C **giving margin of +/- 10%** of average population per
Assembly Constituency". Its own **Guidelines & Methodology**, para III(v), says **±20 %**: "a deviation to
the extent of **20 percent plus or minus** from the UT average for such districts would be acceptable to
the Commission" — and para V(iv) repeats ±20 % for the within-district split. The A/B/C thresholds
actually printed in Paper I (122,670 / 136,300 / 149,930) are the **±10 %** ones. So the operative
allocation band was 10 % and the methodology document's 20 % appears to be a wider outer tolerance, but
**the Commission never reconciles the two figures in writing and I am not going to reconcile them for it.**

### 3.5 **POPULATION PER SEAT BY DIVISION — computed, arithmetic shown**

Source: **D2, Working Paper I, "ENTITLEMENT OF SEATS"** — the Delimitation Commission's own table, printed
under its own hand. Header values as printed:

> 2011 Population = **12267013** · 2011 SC Population = **924108** · 2011 ST Population = **1274958**
> Assembly: Existing seats **83**, Revised Seats **90**
> **Average Population Per Assembly Constituency = 136300**
> A – Districts having predominantly hill & difficult areas … **122670** (−10 % of the average)
> B – Districts with Hill & Flat areas … **136300** (average)
> C – Districts with predominantly Flat areas … **149930** (+10 % of the average)

Check: 12,267,013 / 90 = **136,300.14** → the Commission's 136,300 ✓. 136,300 × 0.9 = **122,670** ✓.
136,300 × 1.1 = **149,930** ✓.

The full district table as printed (2011 Census population, area in km², density, seats):

**KASHMIR DIVISION (10 districts)**

| District | 2011 population | Area (km²) | Density | Seats |
|---|---|---|---|---|
| Kupwara | 870,354 | 2,379 | 366 | 6 |
| Baramulla | 1,008,039 | 1,977 | 510 | 7 |
| Bandipora | 392,232 | 2,571 | 153 | 3 |
| Ganderbal | 313,084 | 1,915 | 163 | 2 |
| Srinagar | 1,221,191 | 360 | 3,392 | 8 |
| Budgam | 753,745 | 1,364 | 553 | 5 |
| Pulwama | 560,440 | 895 | 626 | 4 |
| Shopian | 266,215 | 503 | 529 | 2 |
| Kulgam | 424,483 | 2,709 | 157 | 3 |
| Anantnag | 1,078,692 | 1,275 | 846 | 7 |
| **TOTAL** | **6,888,475** | **15,948** | | **47** |

**JAMMU DIVISION (10 districts)**

| District | 2011 population | Area (km²) | Density | Seats |
|---|---|---|---|---|
| Kishtwar | 230,696 | 8,054 | 29 | 3 |
| Doda | 400,877 | 2,572 | 156 | 3 |
| Ramban | 292,772 | 1,269 | 231 | 2 |
| Reasi | 314,667 | 1,972 | 160 | 3 |
| Udhampur | 557,689 | 2,332 | 239 | 4 |
| Kathua | 616,579 | 2,502 | 246 | 6 |
| Samba | 316,035 | 915 | 345 | 3 |
| Jammu | 1,529,973 | 2,373 | 645 | 11 |
| Rajouri | 642,415 | 2,630 | 244 | 5 |
| Poonch | 476,835 | 1,674 | 285 | 3 |
| **TOTAL** | **5,378,538** | **26,293** | | **43** |

Closure checks: 6,888,475 + 5,378,538 = **12,267,013** = the Commission's printed UT total ✓.
15,948 + 26,293 = **42,241** = the Commission's printed Grand Total area ✓. 47 + 43 = **90** ✓, and the
47/43 split reproduces D5's "43 will be part of Jammu region and 47 for Kashmir region" exactly, so the
conventional division assignment of districts is not in doubt.

**THE ARITHMETIC:**

```
Kashmir division:  6,888,475 / 47  =  146,563.3 persons per assembly seat
Jammu   division:  5,378,538 / 43  =  125,082.3 persons per assembly seat
UT average:       12,267,013 / 90  =  136,300.1 persons per assembly seat

Difference:       146,563.3 − 125,082.3  =  21,481.0 persons per seat
Ratio:            125,082.3 / 146,563.3  =  0.8534
```

**A Jammu-division assembly seat represents 21,481 fewer people than a Kashmir-division seat. Put the
other way, a Kashmir-division voter's share of a seat is 85.34 % of a Jammu-division voter's.**

**Strict population-proportional allocation of the 90 seats:**
```
Kashmir:  90 × 6,888,475 / 12,267,013  =  50.539  →  actual 47   (short by 3.539)
Jammu:    90 × 5,378,538 / 12,267,013  =  39.461  →  actual 43   (over  by 3.539)
```

**THE COUNTERFACTUAL THE DISPUTE USUALLY MISSES, and it cuts against the "Jammu was under-represented"
claim on population terms.** Apply the *pre-delimitation* 46/37 split to the *same* 2011 population:
```
Kashmir:  6,888,475 / 46  =  149,749.5 per seat
Jammu:    5,378,538 / 37  =  145,365.9 per seat
Ratio:    145,365.9 / 149,749.5  =  0.9707
Strict proportional on 83 seats: Kashmir 46.608, Jammu 36.392  (actual 46 / 37 — near-exact)
```
**On the 2011 Census, the pre-delimitation 83-seat frame was already almost exactly population-proportional
between the two divisions — a 2.93 % gap. Delimitation widened that gap to 14.66 %.** So the proposition
that the exercise corrected an under-representation of Jammu *measured against population* is not
supported by the Commission's own numbers; the redistribution ran the other way.

**AND THE MEASURE THAT SUPPORTS THE OTHER SIDE, from the same table:**
```
Kashmir:  15,948 km² / 47 seats  =    339.3 km² per seat
Jammu:    26,293 km² / 43 seats  =    611.5 km² per seat
Strict AREA-proportional allocation of 90 seats:  Kashmir 33.98,  Jammu 56.02
Shares — Jammu:   area 62.25 %,  seats 47.78 %,  population 43.85 %
         Kashmir: area 37.75 %,  seats 52.22 %,  population 56.15 %
```
**On area, Jammu division is entitled to 56 seats and got 43 — under-represented by 13 seats.** Both
computations come from the same printed table. This is the crux of §6.

### 3.6 Reservation of seats

- **Scheduled Tribes: 9 seats, reserved for the first time in J&K's history.** D5: "9 ACs have been
  reserved for STs, out of which **6 are in Jammu region and 3 ACs in the Valley**" and "It is worthwhile
  to mention that **the Constitution of erstwhile Jammu and Kashmir State did not provide for reservation
  of seats for the Scheduled Tribes** in the Legislative Assembly." D2 Working Paper I confirms ST
  "Existing" = 0, revised 9. The four retrieved State-era statistical reports (D8–D11) each print
  "NO OF CONSTITUENCIES … ST … **0**" for 1996, 2002, 2008 and 2014 — independent confirmation that the
  number was zero for at least five elections.
- **Scheduled Castes: 7 seats — and there is a live contradiction between two primary sources that I am
  NOT going to reconcile silently.**
  - **The Gazette says 6.** D1 s.14(10), read from the hash-verified Gazette PDF, inserts into the RPA
    1950 Second Schedule under "II. Union Territories", verbatim:
    `‘‘5. Jammu and Kashmir    83    6    ….    83    6    …..’’`
    On the RPA Second Schedule's column structure that is: **83 assembly seats, 6 reserved for SC, ST
    blank, 83 assembly constituencies, 6 SC constituencies, ST blank.**
  - **The Delimitation Commission says 7.** D2 Working Paper I: Assembly "Existing seats **83** … Revised
    Seats **90**", SC "Existing **7** … Revised **7**". D5 (PIB, 5 May 2022) and D21 (PIB, 16 Aug 2024)
    both give 7 for the post-delimitation House, which is not in doubt.
  - **The four State-era ECI statistical reports (D8–D11) all print SC = 7 of 87**, so 7 was the figure
    under the pre-2019 State.
  - **The contradiction is specific and narrow: what was the SC reservation in the 83-seat UT frame that
    existed between 31 October 2019 and the delimitation order? The Act says 6. The Commission's own
    working paper, describing that same frame as "Existing", says 7.** Both are primary. **No election was
    ever held on the 83-seat frame, so the question was never tested in practice** — which is probably why
    it has gone unnoticed, and is also why it cannot be settled by looking at a result.
  - **Stage 3 must not pick one.** If a seat-composition series is authored it should carry SC = 7 (State,
    to 30 Oct 2019), **SC = 6 or 7, unresolved** (UT, 31 Oct 2019 to the delimitation order), SC = 7 (UT,
    post-order). Per the standing rule that where the Gazette and a later document disagree the Gazette is
    the instrument, **the 6 has the better claim for the interim frame** — but the Commission is the body
    Parliament charged with working the number out, so this is not a clean application of that rule and I
    am not asserting it.
- **The reservation arithmetic checks against the 2011 shares** (my computation from D2's own header):
  ```
  SC: 924,108 / 12,267,013 = 7.5333 %  →  × 90 = 6.780  →  rounded to 7 ✓
  ST: 1,274,958 / 12,267,013 = 10.3934 % →  × 90 = 9.354 →  rounded to 9 ✓
  ```
  Both are consistent with D1 s.14(7)'s "as nearly as may be, the same proportion".
- Reserved-seat identification method (D5, D2): percentage of SC/ST population computed for each proposed
  AC and the requisite number taken "by arranging them in descending order". D2's Paper II prints the
  ranked SC list — the seven SC seats are Marh (42.55 % SC), Bishnah (41.95 %), Ramnagar (36.73 %),
  Suchetgarh (36.71 %), Akhnoor (31.29 %), Kathua (31.28 %), Ramgarh (30.48 %) — **all seven in the Jammu
  division**, which is where J&K's SC population is.
- Note the composition consequence: **9 ST + 7 SC = 16 of 90 reserved; 74 general.**

### 3.7 Parliamentary constituencies

D5: "There are five Parliamentary Constituencies in the region. The Delimitation Commission has seen the
Jammu & Kashmir region as **one single Union Territory**. Therefore, one of the Parliamentary Constituency
has been carved out combining **Anantnag** region in the Valley and **Rajouri & Poonch** of Jammu region.
By this reorganisation **each Parliamentary Constituency will have equal number of 18 Assembly
Constituencies each.**" 5 × 18 = 90 ✓.

Before delimitation, D1's Second Schedule defined the five PCs on whole districts as at 1 August 1975:
Baramulla = Baramulla district; Srinagar = Srinagar district; Anantnag = Anantnag district; Udhampur =
Udhampur + Doda + Kathua; Jammu = Jammu + Rajouri + Poonch. **So Rajouri and Poonch moved out of the
Jammu PC and into the Anantnag-Rajouri PC.** This is why PC-level series cannot cross the order (§3.10).

### 3.8 **THE DISSENT — established that it happened, NOT established what it said**

D2 states, in the Commission's own words, that the draft proposals were "sent to the Associate Members for
their consideration and offering **dissenting notes**, if any" and were published on 14 March 2022 "**along
with the dissenting notes of those Associate Members who gave it**". So dissenting notes were given.

**They are not in the Commission's own compendium.** I searched D2 for every occurrence of "dissent": all
eight are procedural — the statutory right to dissent (Delimitation Act s.9(2)(a), J&K Act s.60(5)(a)) and
the two sentences quoted above. **The 200-page volume the Commission published to memorialise its work
reproduces its own order, its own working papers, its own methodology, lists of every delegation it met,
and photographs of its public interactions — and does not reproduce the dissents it says it published.**

I could not retrieve them anywhere. The draft order (D4), where they would have been attached, is Hindi
with an unusable text layer. **`not-published`** — I have no named requester, no specific request and no
refusal, so it is not `withheld`. **Route:** the Gazette of India Extraordinary of 14 March 2022 and the
Official Gazette of the UT of J&K of the same date, which are where the Commission says they appeared;
`egazette.gov.in` fails DNS from this environment and I could not test it.

**Consequence, and stage 3 must honour it: the content of the National Conference associate members'
dissent is NOT established by this part.** The commonly-repeated characterisations of it must not be
authored. What *is* established is (a) that dissenting notes were given, (b) that no associate member could
sign the order in any event because both statutes forbid it, and (c) that the Commission's own compendium
omits them.

### 3.9 Two absences in the publication of the order itself

1. **No English text of the delimitation order is published on eci.gov.in.** The ECI's `/delimitation` page
   offers, for the J&K Commission: Draft Publication (D4), Final Publication (D3), Book (D2), Final Papers
   (XLSX). D3 and D4 are Hindi-only Gazette scans whose text layer does not extract. D2 is in English but
   is a compendium, not the operative order. For the **Assam** 2023 delimitation the same page offers
   `FinalOrderandNotification.pdf` — I did not open it, so I make no claim about its language. **The
   operative instrument redrawing the constituencies of a majority-Urdu-and-Kashmiri-speaking territory is
   published, on the Commission's website, in Hindi.** I state the fact and decline to explain it.
2. **`ceojk.nic.in` is unreachable from this environment**, and both D2 and D5 name the CEO J&K's website
   as a place the order was hosted. So the second official hosting location could not be examined.

### 3.10 The date the order took effect — NOT ESTABLISHED

D5 says the order's contents "will come into effect **from the date to be notified by the Central
Government**", and D1 s.62(2)/(3) require exactly that: readjustment "shall take effect from such date as
the Central Government may, by order, published in the Official Gazette, specify."

**I did not retrieve that notification and I do not have its date.** This matters because it is the exact
break date for every PC-level and AC-level series, and it is **not** 5 May 2022 (signature and Gazette
publication of the order) and **not** 31 October 2019. Do not use either as a proxy.

The ECI itself warns about this break. D7, verbatim:
> "Note: **Due to delimitation exercise, the voter turnout data from previous elections for the PCs, may
> not be directly comparable**"

The magnitude is easy to see: Srinagar PC electors were 1,207,230 (2014) and 1,294,671 (2019), then
1,748,803 (2024) — a 35 % jump that is a boundary change, not a registration surge, because the PC absorbed
Budgam and Ganderbal. **Any Srinagar-PC elector or turnout line that crosses the order is measuring two
different places.**

---

## 4. TURNOUT AS A CONTESTED MEASURE — the numbers, then both cases

### 4.1 What the numbers actually settle

The specific claim in the brief — *that the 2024 assembly turnout was comparable to 2014's rather than a
step change* — can be tested, but **only on the at-polling-stations basis, because that is the only basis
on which both years have a published figure.**

| | 2014 assembly | 2024 assembly |
|---|---|---|
| Basis | electors who voted **at polling stations** / electors | turnout **at polling stations** |
| Value | **65.52 %** (D8) | **63.88 %** (D6) |
| Electorate | **7,316,946** (published) | **8,823,899** (derived, §2.6a) |
| Territory | State of J&K, **87 ACs including 4 in Ladakh** | UT of J&K, **90 ACs excluding Ladakh** |
| Seat frame | delimited 1995 on the **1981** Census | delimited 2022 on the **2011** Census |

**On the only common basis available, 2024 turnout was 1.64 percentage points LOWER than 2014's.** The
"comparable, not a step change" reading is the one the numbers support **for the assembly series**.

**But the same numbers say the opposite about the Lok Sabha series**, and both are true at once:

| | 2019 LS | 2024 LS |
|---|---|---|
| Turnout, UT-comparable (Ladakh removed from 2019 by me) | **44.37 %** | **58.65 %** |
| Change | | **+14.29 pp** |
| Kashmir Valley 3 PCs (ECI's own figures, D7) | **19.16 %** | **50.86 %** |

**So the honest summary is: the Lok Sabha series shows a very large rise concentrated in the Kashmir
Valley; the assembly series shows 2024 slightly below 2014.** Anyone asserting either a step change or no
change without naming which series and which basis is comparing incomparable things. **The step change is
real and it is in the Lok Sabha series; the assembly series is flat-to-down.** That distinction is, I
think, the most useful single sentence this part produces about turnout.

#### 4.1a **2014 WITH LADAKH REMOVED — the like-for-like assembly comparison, now closed**

I said in the first draft that this computation was doable and undone. **I have now done it.** From D8's
own constituency-level tables, the four Ladakh assembly constituencies at the 2014 election:

| AC | Electors | Voted at polling stations | Postal | Total voted | ECI's printed turnout |
|---|---|---|---|---|---|
| 47 Nubra | 14,109 | 9,727 | 631 | 10,358 | 73.41 % |
| 48 Leh | 70,840 | 45,459 | 2,697 | 48,156 | 67.98 % |
| 49 Kargil | 60,094 | 44,815 | 542 | 45,357 | 75.48 % |
| 50 Zanskar | 21,143 | 15,211 | 446 | 15,657 | 74.05 % |
| **Ladakh total** | **166,186** | **115,212** | **4,316** | **119,528** | **71.92 %** |

Each of the four printed percentages reproduces exactly as total-voted ÷ electors — e.g.
10,358 / 14,109 = 73.41 %, 48,156 / 70,840 = 67.98 %. **So D8's constituency-level turnout column is
POSTAL-INCLUSIVE while D8's own HIGHLIGHTS page is not.** That is a third basis living inside the same
document, alongside the two already found in §2.1a. *(A minor discrepancy inside D8 that I am recording
rather than smoothing: Leh's "Constituency Data Summary" page gives postal 2,822 and total 48,281, while
its "Detailed Results" page gives postal 2,697 and total 48,156 — a difference of 125, presumably postal
ballots received against postal ballots counted. I have used the Detailed Results figures because they are
the ones the printed percentage is computed on.)*

**2014, Ladakh removed — i.e. on exactly the 83 constituencies that became the UT:**
```
electors                   7,316,946 − 166,186 = 7,150,760
voted at polling stations  4,794,374 − 115,212 = 4,679,162  →  65.4359 %
voted including postal     4,822,776 − 119,528 = 4,703,248  →  65.7727 %
```

**THE LIKE-FOR-LIKE ANSWER, same territory and same basis:**

| | Turnout at polling stations | Territory |
|---|---|---|
| 2014 assembly, Ladakh removed | **65.44 %** | the 83 ACs that became the UT |
| 2024 assembly | **63.88 %** | the same territory, 90 ACs |
| **Change** | **−1.56 pp** | |

Against the ECI's published 87-AC figure the change is −1.64 pp. **Removing Ladakh moves the answer by
only 0.08 pp**, because Ladakh's 2014 assembly turnout (71.92 %) was close enough to the state average and
its electorate small enough (2.27 % of the total) that it barely shifts the aggregate. **So on the
assembly series the Ladakh break is real but immaterial, and I record that it does not bite here even
though the rule says to test it.** *(Contrast the Lok Sabha series in §2.3, where removing Ladakh moves
the 2019→2024 change by 0.61 pp — because there Ladakh's ~71 % sat against a J&K figure of ~44 %.)*

**And this closes the loop on §2.6d's unexplained "~23 %".**
```
2014 electorate, Ladakh removed  7,150,760  →  2024  8,823,899  =  +1,673,139  =  +23.3981 %
2014 electorate, all 87 ACs      7,316,946  →  2024  8,823,899  =              =  +20.5954 %
```
**The ECI's "~23%" is computed on the Ladakh-removed 2014 electorate.** That is now established rather
than guessed, and it **confirms the reading in §2.6c**: the ECI is systematically rebasing 2014 onto the
post-reorganisation territory — 83 seats, 7.15 million electors — without saying so. The rebasing is
internally consistent; what is missing is any statement that it has been done. **A reader comparing the
ECI's "~23 % growth" against the ECI's own published 2014 electorate of 7,316,946 will not be able to
reproduce it, and nothing in the document explains why.**

One discipline remains on the comparison:
- The 2024 figure is provisional and the final postal-inclusive one does not exist (§2.4). On the 2014
  side the postal-inclusive Ladakh-removed figure is **65.77 %**; if the 2024 final ever appears, that is
  the number to set it against, not 65.91 % (which is the 87-AC figure) and not 65.52 % (which is the
  87-AC at-polling-stations figure).

### 4.2 The Srinagar constituency, and a correction

ECI's own **gross** VTR series for the J&K parliamentary constituencies, verbatim from D7's table:

| PC | 2019 | 2014 | 2009 | 2004 | 1999 | 1998 | 1996 | 1989 |
|---|---|---|---|---|---|---|---|---|
| Srinagar | 14.43 % | 25.86 % | 25.55 % | 18.57 % | 11.93 % | 30.06 % | 40.94 % | **Uncontested** |
| Baramulla | 34.6 % | 39.14 % | 41.84 % | 35.65 % | 27.79 % | 41.94 % | 46.65 % | **5.48 %** |
| Anantnag | 8.98 % | 28.84 % | 27.10 % | 15.04 % | 14.32 % | 28.15 % | 50.20 % | **5.07 %** |
| Udhampur | 70.15 % | 70.95 % | 44.88 % | 45.09 % | 39.65 % | 51.45 % | 53.29 % | 39.45 % |
| Jammu | 72.5 % | 67.99 % | 49.06 % | 44.49 % | 46.77 % | 54.72 % | 48.18 % | 56.89 % |

2024, from D12 (postal-inclusive, ECI statistical report): Baramulla **59.31 %**, Srinagar **38.68 %**,
Anantnag-Rajouri **55.50 %**, Udhampur **67.98 %**, Jammu **72.02 %**.

**CORRECTION TO THE BRIEF: Srinagar in 1989 was not a low-turnout seat — it was UNCONTESTED, so no poll was
held and no turnout exists.** The ~5 % figures for 1989 belong to **Baramulla (5.48 %)** and **Anantnag
(5.07 %)**. The ECI's own table prints "Uncontested" in the Srinagar/1989 cell.

Srinagar's genuine trough in this series is **1999 at 11.93 %**, and its lowest recorded contested figure
in the retrieved data is **2019 at 14.43 %**. The **Anantnag 2019 figure of 8.98 % is the lowest of any
J&K parliamentary constituency in any year in this table.**

### 4.2a **THE 2017 SRINAGAR PARLIAMENTARY BY-ELECTION — RETRIEVED, PRIMARY, EXACT**

**D17 — ECI, *Bye-Election 2017* workbook, `ByeElectionJan-Dec2017.xlsx`, sheet "2-Srinagar PC".
RETRIEVED-BROWSER** from `https://www.eci.gov.in/ByeElection/2017/ByeElectionJan-Dec2017.xlsx`
(117,576 bytes; navigation to `.xlsx` is refused by the browser tool, so I fetched it in-page as an
ArrayBuffer, base64-encoded it, reassembled it byte-exact on disk and read it with `openpyxl` — the
reconstructed file is 117,576 bytes and opens as a valid Microsoft Excel 2007+ workbook). **T1.**

The sheet, as printed by the ECI:

| Field | Value |
|---|---|
| Parliamentary Constituency | "Parliamentary Consituancy of Jammu & Kashmir" — "**2-Srinagar**" |
| **Cause of vacancy** | "**Resignation of MP**" |
| Candidates | nominated **11**, rejected 2, withdrawn 0, **contested 9**, forfeited 7 |
| **Electors** | general 1,261,395 + NRI 0 + **service 422** = **1,261,817** (M 655,924 / F 605,891 / TG 2) |
| Polling stations | **1,559**; average electors per station 809 |
| **Electors who voted** | **89,883** (M 54,166, F 35,717, TG 0). **POSTAL: 0.** NRI: 0 |
| Votes polled | total **89,883**; **valid 88,951**; rejected **0**; **NOTA 932**; not retrieved 0; tendered 0 |
| Result | **FAROOQ ABDULLAH, J&K National Conference — 48,555**; Nazir Ahmad Khan, PDP — 37,779; then 7 others, none above 630 |

**TURNOUT: 89,883 / 1,261,817 = 7.1233 %.** That is the ~7 % figure the brief asks for, now primary and
exact rather than relayed, **and its postal component is zero, so for once there is no basis ambiguity.**

Further arithmetic from the same sheet: valid 88,951 + NOTA 932 = 89,883 = total polled ✓. NOTA took
**1.04 %** of votes polled. The winner's 48,555 votes are **54.59 % of valid votes** but **3.85 % of the
electorate** — a figure worth carrying, because it is the sharpest single illustration of what a turnout
collapse does to the meaning of a mandate, and it is arithmetic, not commentary.

**A data-quality flaw in the ECI's own file, recorded because it is exactly the kind of thing this
instrument exists to catch.** The "IV. DATES" block reads: POLLING `2017-09-04`, COUNTING `15/4/2017`,
DECLARATION `15/4/2017`. **Counting cannot precede polling.** The polling cell has been stored as a
date-typed value parsed from `9/4/2017` on a month/day convention, while the counting and declaration
cells are stored as day/month strings. **The correct reading is polling 9 April 2017, counting and
declaration 15 April 2017**, but the ECI's published file, read literally, says the poll was held on
4 September 2017 — five months after the result was declared. Any automated ingestion of this workbook
will take the wrong date.

### 4.3 **THE 2017 ANANTNAG BY-ELECTION — ESTABLISHED BY ITS ABSENCE FROM THE ECI'S OWN RECORD**

D17 covers **January–December 2017** and contains **27 sheets**, one per by-election held in that year
anywhere in India. I enumerated all 27. They are: 2-Amritsar PC, **2-Srinagar PC**, 6-Malappuram PC,
113-Dhemaji(ST) AC Assam, 36-Bhoranj(SC) HP, 9-Ater MP, 89-Bandhavgarh(ST) MP, 216-Kanthi Dakshin AC WB,
79-Dholpur AC RJ, 214-Nanjangud AC KR, 224-Gundlupet AC KR, 4-Littipara(ST) AC JR, 28-Upper Burtuk SK,
27-Rajouri Garden AC DL, 10 N. Angami-I, 139-Nandyal AP, 11-Panaji Goa, 19-Valpoi Goa, 7-Bawana Delhi,
1-Gurdaspur PC Pb, 41-Vengar AC KR, 61-Chitrakoot AC MP, 207-Sikandra AC UP, 226-Sabong AC WB,
11 Dr Radhakrishnan Nagar TN, 28-Likabali AC ArP, 12-Pakke Kessang AC ArP.

**There is no Anantnag sheet.** The ECI's own compendium of every 2017 by-election contains the Srinagar
parliamentary by-election and does not contain an Anantnag one, **because no poll was held.**

This is a clean, primary-sourced negative and it is stronger than any press account of the postponement:
the seat is absent from the register of polls conducted. **Anantnag was next filled at the 2019 general
election**, where the ECI's own statistical report (D13) records it polling **8.98 %** — the lowest figure
for any J&K parliamentary constituency in any year in the ECI's published series.

**WHAT I DID NOT ESTABLISH, and stage 3 must not author:**
- The **date on which the Anantnag by-election was originally scheduled**, the **number of times it was
  deferred**, and the **ECI's stated reason** for each deferral. These would be in ECI press notes of
  April–May 2017 and after; I did not retrieve them.
- Whether a **re-poll** was ordered in any Srinagar polling station after 9 April 2017, and its turnout.
  D17 has no re-poll field (unlike the general-election statistical reports, which carry a "Details of
  Re-poll Held" table). **So the ECI's by-election workbook does not record re-polls at all** — that is a
  structural gap in the instrument, not a fact about 2017.
- How long the Anantnag seat was vacant. The cause and date of the vacancy are not in D17 (no sheet), and
  I did not retrieve them.

**Absence class for the ECI's stated reasons for deferring the Anantnag poll: `not-published` on the
evidence I have — but that is weakly held, because I did not search ECI's press-note archive at all.
Treat it as a retrieval gap of this session, not an established absence.** Route:
`https://www.eci.gov.in/issue-details-page/instructions` and the ECI press-note archive, both reachable
in a browser.

### 4.4 The three readings, each at its strongest, in its own terms

**Reading 1 — high turnout as democratic participation and endorsement.**
Its strongest case is the ECI's, and it rests on figures the ECI published and I verified: the Kashmir
Valley's three parliamentary constituencies moved from **19.16 %** to **50.86 %** between 2019 and 2024,
a rise of over 30 points, and Srinagar from 14.43 % to 38.68 % — its highest since 1996. The CEC's own
framing (D7) is that this "sits on a credible weave of 25 % increase in number of contesting candidates
since 2019, C-vigil complaints showing enhanced citizen involvement and Suvidha Portal showing 2455
requests for rallies" — i.e. participation measured on several independent margins, not turnout alone. The
2024 assembly election then produced a government, and the assembly that had been dissolved in 2018 sat
again. On its own terms this reading does not need turnout to have *risen* against 2014; it needs the
Valley's participation to have stopped being suppressed, and on the ECI's numbers it did.

**Reading 2 — turnout under boycott conditions is a poor proxy for consent.**
Its strongest case is that the series it is being read against is a series produced *by* boycott: 1989
Srinagar uncontested, Baramulla 5.48 %, Anantnag 5.07 %; Anantnag 8.98 % in 2019. **A measure whose
historical range is set by whether an armed boycott was in force is measuring the boycott, not consent.**
When the boycott call weakens, turnout rises whether or not anyone's view of the constitutional question
has changed — and the same voters who turned out in 2024 elected, in the Valley, parties whose stated
positions on 5 August 2019 are the opposite of the Union government's. Turnout is agnostic between
"endorsement of the settlement" and "contestation of the settlement through the only channel left". On
this reading the correct inference from 2024 is that the *channel* was used, and nothing about the
*settlement*.

**Reading 3 — the 2024 assembly turnout was comparable to 2014, not a step change.**
Its strongest case is the arithmetic in §4.1: 63.88 % against 65.52 %, on the same at-polling-stations
basis, from the ECI's own publications. It adds that 2014's figure was itself the highest in ~25 years, so
2024 did not restore a previously unattained level — it landed slightly below one already reached under the
pre-2019 constitutional arrangement.

**DO THESE REST ON DIFFERENT FACTS OR DIFFERENT WEIGHTINGS?**

- **Reading 1 against Reading 3: DIFFERENT FACTS, in a shallow and fixable sense.** They are about
  **different elections**. Reading 1 is about the Lok Sabha series (2019 → 2024, +14.29 pp on the
  UT-comparable basis; Valley +31.7 pp). Reading 3 is about the assembly series (2014 → 2024, −1.64 pp).
  Both are arithmetically correct and neither contradicts the other. The common measure exists and I have
  built it — it is the pair of series in §2.1 and §2.3 with bases and denominators stated. **So this is a
  gap in the instrument, not a property of the argument, and it FAILS criterion (c).**
- **Reading 1 against Reading 2: DIFFERENT WEIGHTINGS of the same facts, and no common measure could
  settle it.** Neither disputes a single number. They disagree about what a turnout percentage is evidence
  *of*. **There is no measure of "consent" against which turnout could be validated**, because none has
  ever been defined or collected for this population — which is `never-defined`, not `not-collected` (§5.4).
  This one would satisfy criterion (c) if it were ever the axis of a record, because it crosses a category
  boundary: a quantity against a proposition about legitimacy that no quantity addresses.

---

## 5. ABSENCES

Tested in the schema's order — `not-collected`, then `not-published`, then `withheld` (named requester +
specific request + date, or it is not withheld), then `never-defined`.

### 5.1 The 2024 assembly statistical report — `not-published`
**What:** electors, votes polled including postal, valid votes, NOTA, rejected votes, and constituency-wise
turnout on the final basis, for the 2024 J&K Legislative Assembly election.
**Why:** the ECI's own statistical-reports index links a 2024 entry for J&K which resolves to
"Error: No data found for year 2024"; the same is true for all seven other 2024 state assembly elections,
so this is a cohort-wide non-publication rather than anything J&K-specific. The data plainly exist — the
ECI counted the votes and declared the results — so this is producibility-under-compulsion, i.e.
**`not-published`**, not `not-collected`. There is no identifiable refusal, so it is **not `withheld`**.
**Route:** publication of the full statistical report at
`https://www.eci.gov.in/statistical-reports` → "General Election To State Legislative Assembly" → 2024;
in the meantime, Form 20 (Final Result Sheet) constituency-wise, which the CEO J&K would hold.

### 5.2 The associate members' dissenting notes — `not-published`
**What:** the text of the dissenting notes given by associate members on the draft delimitation proposals.
**Why:** the Commission states in its own compendium that dissenting notes were given and were published
with the draft order on 14 March 2022, and then does not reproduce them in that compendium. Not retrievable
from the ECI delimitation page, whose only draft-order artefact is a Hindi scan with an unusable text layer.
No identifiable refusal → **`not-published`**.
**Route:** Gazette of India Extraordinary, 14 March 2022, and the Official Gazette of the UT of J&K of the
same date. `egazette.gov.in` fails DNS from this environment and was not testable.

### 5.3 The Special Summary Revision and the "new voters" statement — **NOT ESTABLISHED, and I will not guess**
The brief asks what was actually said, by whom, and whether it was retracted or clarified. **I did not
retrieve a single document on this and I am recording that plainly rather than reconstructing it.** What I
*can* contribute is the only hard number in the vicinity, computed from retrieved ECI reports:

> **The J&K electorate on the post-2019 territory grew from 7,743,306 (GE 2019, Ladakh removed) to
> 8,802,348 (GE 2024) — an increase of 1,059,042, or 13.68 %, over five years.**

That is the elector-count fact against which any claim about additions to the rolls has to be read, and it
is from the ECI's own statistical reports. **It is not evidence for or against any characterisation of who
was added.** The person who made the reported statement was the Chief Electoral Officer, whose identity in
that period is independently confirmed by D2 as **Hirdesh Kumar** — that much is established. Nothing else
about it is.
**Route:** ECI press notes and CEO J&K press statements of August 2022; the CEO J&K's SSR final publication
for 2022 and for 2024. `ceojk.nic.in` unreachable from here.

### 5.4 "Consent", as distinct from turnout — `never-defined`
**What:** any measure of the population's acceptance of the post-2019 constitutional arrangement.
**Why:** this is the quantity all three readings in §4.4 are implicitly arguing about, and **no agreed
definition of it exists**, so it could not be collected even in principle. This is emphatically **not**
"nobody has studied it" — the point is that turnout is being pressed into service as a proxy precisely
because the thing itself has no definition. **`never-defined`.** **No route exists and I am not going to
invent one**; the schema's own instruction is that a placeholder route is worse than none.

### 5.5 The date the delimitation order took effect — `not-published` in the weak sense, or simply not retrieved by me
Honest statement: **this is a retrieval failure of my session, not an established absence.** The Central
Government's notification under s.62(2)/(3) exists — the 2024 election was held on the delimited seats. I
did not find it. It should not be authored as an absence. **Route:** MHA gazette notifications, 2022;
`mha.gov.in` is reachable by curl from this environment (phase 11 established this and I re-confirmed a
200), so this is closable in minutes by anyone resuming.

### 5.6 The 2014–2024 gap and its official justification — **PARTLY ESTABLISHED: the END is officially explained, the DURATION is not**

**What I did establish, primary (D21, ECI's own announcement of 16 August 2024), verbatim:**
> "As per Supreme Court judgment dated 11th December 2023 in the matter of Writ Petition (Civil)
> No. 1099 of 2019, the Commission has also decided to take necessary steps to conduct election to the
> legislative assembly of UT of Jammu and Kashmir."

So the Election Commission's own published reason for holding the election **when it did** is a judicial
direction. That is a real official statement and it is retrieved.

**What I did NOT establish, and it is the larger half:** any official statement of why no election was
held in **2019, 2020, 2021, 2022 or 2023** — i.e. a stated reason for each year of the postponement.
The delimitation exercise ran 6 March 2020 to 5 May 2022 and is the obvious candidate explanation, but
**I found no document in which the Union government or the ECI states that as the reason**, and the gap
extends more than two years past the delimitation order in any case. **Do not author a reason from this
part.**

**Absence class: `not-published` on what I have — but held weakly, because I did not search the
parliamentary record.** A sibling reports having text-searched **2,839 MHA parliamentary answers over
152 sitting days, January 2019 – July 2026**. That corpus is the right instrument for this question,
because it can establish a **parliamentary silence over a stated span** rather than merely a failed
search — which is the difference between an absence and a retrieval gap. **Whoever resumes should run
that corpus for questions on the timing of J&K assembly elections before recording any absence here.**
`sansad.in` is also alive from this environment via `curl --resolve sansad.in:443:164.100.252.170`
(HTTP 302), so the parliamentary route is open and untried by me.
What is already live and must not be duplicated: **L-0123** carries the sequence — assembly in suspended
animation from 20 June 2018, dissolved 21 November 2018, President's Rule, revoked by S.O. 4484(E) dated
13 October 2024 (that last date primary-sourced to MHA Annual Report 2024-25 para 15.5). **L-0123's own
`assessmentNote` says "the assembly, the elections and the restoration of statehood are outside this
record's subject and are not scored here" — so the *reasons for the postponement* are mine and I could not
establish them.**
**Route:** parliamentary questions to MHA on the timing of J&K assembly elections, 2019–2024, at
`sansad.in` (DNS-fails from here, but phase 11 reached it) — MHA has answered such questions repeatedly and
the answers are the official statement.

### 5.7 Not an absence — a retrieval failure I want on the record so it is not miscounted
**The 2017 Srinagar by-election turnout and the 2017 Anantnag by-election / abandoned re-poll are
retrievable from the ECI's bye-election statistical reports in a browser.** I ran out of session before
reaching them. Per phase 11's standing note, nothing about my network conditions supports an absence claim.

---

## 6. THE LEDGER QUESTION

I read the text of `differentFacts` in `schemas/ledger.schema.json` before answering. The three conditions:
(a) precondition — the two cases cite different underlying quantities, not the same one weighted
differently; (b) precondition — neither contradicts the other's factual claim; (c) **operative** — no
single measure exists, **or could be constructed from available data**, that places both sides' facts on
one ledger. "An **UNBUILT** comparison **FAILS** (c)."

### 6.1 The delimitation dispute: **differentFacts = FALSE.** It is a weighting case.

**Test (a): FAILS.** Both sides cite the same underlying quantities — the 2011 Census district populations,
the district areas, and the final seat allocation. They are all in one table, **Working Paper I of the
Commission's own compendium**, on one page.

**Test (b): PASSES.** Neither side contradicts the other's arithmetic. Kashmir division genuinely has
146,563 people per seat against Jammu's 125,082; Jammu division genuinely has 611.5 km² per seat against
Kashmir's 339.3.

**Test (c): FAILS DECISIVELY, and it does not merely *could be* constructed — I constructed it, in §3.5,
from published census figures and the published seat allocation, in about six lines of arithmetic.** The
common ledger is: population per seat by division, area per seat by division, and the strict-proportional
counterfactual under each. Every number needed is printed in a single official document.

**And §2.6b makes the point harder, not softer.** A *third* denominator — registered electors per seat —
is also computable, from a different set of official documents (the ECI's own phase press notes), and it
gives a *third* answer: a 1.31 % disparity where population gives 17.17 % and area gives an inversion.
**Three denominators, three answers, all from published official data, all computable by anyone.** That is
the textbook shape of a weighting dispute, and it is the opposite of a case where no common measure
exists. If anything the problem here is an embarrassment of common measures, none of which any party has
committed to in advance.

**Therefore `differentFacts` must be FALSE**, and per the schema's note the FALSE flag should carry a
`differentFactsNote` explaining why — because this is precisely the judgement most at risk of being made
silently, and the surface of the dispute (region against region, census against census) makes it *look*
like a different-facts case.

**Suggested `differentFactsNote` substance for stage 3:** *Both cases rest on the same table — Working
Paper I of the Delimitation Commission's own compendium — and disagree only about which column of it is the
right denominator. On 2011 population the Kashmir division is under-allocated by 3.54 seats (50.54
proportional against 47 actual) and a Jammu seat represents 21,481 fewer people. On area the Jammu division
is under-allocated by 13 seats (56.02 proportional against 43 actual). Both computations are exact, both use
figures the Commission itself published, and the Commission's own methodology says in terms that it
weighted terrain, remoteness and border conditions alongside population. Granting either side's strongest
fact in full leaves the other's intact — but a single ledger placing both on one page exists and has been
built, so criterion (c) fails and this is a dispute about weights, not about facts.*

**This overturns the assumption that phase 11's "none" carries.** It does not. Phase 11 found no instrument
placing both sides on one ledger for its subject matter. **For delimitation, the instrument exists, it is
official, and it is the aggressor's own publication.** That is a genuinely different situation and stage 3
should say so.

### 6.2 The turnout dispute: **it splits, and the split is the answer**

- **"Was 2024 a step change?" — `differentFacts` FALSE.** The two readings are about different elections
  (assembly vs Lok Sabha) and different bases (at-polling-stations vs gross). The common measure is a pair
  of properly-based, properly-denominated series, which I built in §2.1 and §2.3. **Unbuilt would have
  failed (c); built certainly does.**
- **"Does turnout measure consent?" — would be `differentFacts` TRUE if it were ever the axis of a
  record**, because the counterpart is `never-defined` (§5.4) and the schema states that a counterpart
  declared unmeasurable passes (c). This is the category-boundary case the schema describes: a quantity
  against a proposition about legitimacy that no quantity addresses. **But I do not recommend authoring a
  record on that axis** — it would be a record about the concept of consent, not about Jammu and Kashmir.

### 6.3 The one place a genuinely two-sided official instrument exists — and its limits
**Working Paper I is the closest thing to a two-sided ledger this phase has produced.** It prints
population *and* area *and* density *and* seats, per district, in adjacent columns — the raw material of
both cases, published by the body being criticised. That is unusual and worth recording.

**But apply the two phase-11 traps, because both bite here.**

- **Trap 1 — "a source that looks independent and is media-derived from official reporting is not a
  check."** It bites on the turnout series, hard. Almost every secondary account of J&K turnout is derived
  from ECI press notes. **A press account of a turnout percentage is not a check on the ECI's turnout
  percentage; it is the ECI's turnout percentage with a byline.** The four-value divergence in §2.5 is
  invisible to any such account, and the "63.88 % vs 65.52 %" comparison circulating in the press inherits
  whichever ECI basis its source happened to pick. **The only check on an ECI figure is another ECI
  document, which is why §2.1a and §2.5 had to be done by opening the PDFs.**
- **Trap 2 — "two-sidedness of format does not survive one-sidedness of production: check WHO PRODUCES the
  series a body presents as its own."** It bites on Working Paper I. The table is two-sided in *format* —
  population and area side by side. But **every number in it, and the category assignment that converts
  them into seats, was produced by the Commission itself.** The A/B/C district categorisation is the
  Commission's own judgement, not a measurement; the ±10 % band is the Commission's own choice (and is
  stated as ±20 % elsewhere in the same volume, §3.4); the "additional constituency for remoteness" is the
  Commission's own discretion, exercised without a published rule. **The population and area columns come
  from the Registrar General; the seat column comes from the Commission. The two-sidedness is in the
  inputs, and the one-sidedness is in the function applied to them.** And the order is, by s.60(5)(c) of
  the Act, one that "shall not be called in question in any court".
- **A third, quieter one-sidedness worth recording:** the Commission's ex-officio membership was the Chief
  Election Commissioner and the State Election Commissioner of the UT — the latter an appointee of the
  administration of a Union Territory under President's Rule — and the consultative half of its associate
  membership could not be constituted because the legislature had been dissolved (§3.3). **The body that
  drew the constituencies contained no one chosen by the population whose constituencies were drawn**,
  other than five Lok Sabha members who by statute could neither vote nor sign.

---

## 6.4 **PROVENANCE OF EVERY LOAD-BEARING COUNT — none of them inherited**

This part is almost entirely counts, so each one is traced here to the document it was counted from.
**I inherited no number from the coordinator, from a sibling, or from a press summary. The two figures
"everyone repeats and few verify" — 87 and 24 — were both counted or read directly.**

| Count | Counted/read from | How |
|---|---|---|
| **107** | **The Gazette PDF** (`egazette.gov.in/WriteReadData/2019/210407.pdf`, MD5 `0e16a53f…`), s.14(3) | read verbatim: "shall be 107" |
| **24** | **The Gazette PDF**, s.14(4)(a) | read verbatim — and note the Gazette **spells it in words**, "**twenty four** seats … shall remain vacant and shall not be taken into account for reckoning the total membership of the Assembly". Not a numeral anyone could have mis-transcribed from a digit. |
| **114** | **The Gazette PDF**, s.60(1) | read verbatim: "shall be increased from 107 to 114" |
| **83** | **The Gazette PDF**, Third Schedule — **and I counted the entries, I did not take the number on trust** | I bounded the Third Schedule between the literal strings "The Third Schedule" and "The Fourth Schedule" (chars 137,106–166,420 of the extracted text) and parsed every numbered constituency entry under every district heading. **Result: exactly 83 entries, numbered 1 to 83, no gaps and no duplicates.** Independently, s.14(10)'s RPA Second Schedule entry reads `‘‘5. Jammu and Kashmir 83 6 …. 83 6 …..’’`. |
| **46 / 37** | **The Gazette PDF**, Third Schedule, same parse | district-by-district: Kupwara 5 (ACs 1–5), Baramulla 10 (6–15), Srinagar 10 (16–25), Budgam 5 (26–30), Pulwama 6 (31–36), Anantnag 10 (37–46) = **46 Kashmir**; Doda 6 (47–52), Udhampur 6 (53–58), Kathua 5 (59–63), Jammu 13 (64–76), Rajouri 4 (77–80), Poonch 3 (81–83) = **37 Jammu**. 46 + 37 = 83. |
| **87** | **Four independent ECI statistical reports** (D8, D9, D10, D11), each printing "NO OF CONSTITUENCIES … TOTAL **87**" on two separate pages, plus D8's "ELECTED … 87" | **NOT taken from the Act — the Act does not contain it.** Four separate documents across four elections. |
| **111** | **D2**, the Commission's own Introduction | read verbatim: "had 111 seats including 4 seats in Ladakh. 24 seats of this was kept reserved for Pak occupied Jammu and Kashmir". The Act does not contain 111 either. |
| **90 / 47 / 43** | **D5** (PIB, 5 May 2022) and **D2** Working Paper I; independently confirmed by **D21** and **D23** | and cross-checked by my own district sums of Working Paper I (47 + 43 = 90) and by the AC-number ranges in D6/D18/D19 (ACs 1–47 Kashmir, 48–90 Jammu) |
| **9 ST / 7 SC** | **D5**, **D2** Working Paper I, **D21** | with the proportionality arithmetic re-derived by me from D2's own population header. **But see §3.6 — the Gazette says SC = 6 for the interim 83-seat frame and the Commission says 7. Flagged, not reconciled.** |
| **12,267,013 / district populations / areas** | **D2**, Working Paper I | typed from the printed table; my district sums close exactly against the Commission's own printed Grand Totals for both population (12,267,013) and area (42,241 km²), which is the check that the transcription is clean |
| **8,823,899** | **D6, D18, D19** | summed by me from ninety AC rows; validated because the elector-weighted mean of the ninety turnout percentages reproduces the ECI's published 63.88 % to four significant figures |
| **166,186 (Ladakh 2014)** | **D8**, constituency-level pages | four AC rows read individually; each printed turnout percentage reproduces from its own row |

**Where a figure and its source disagree, this part says so rather than reconciling:** §2.6c (ECI press
note 83 vs ECI statistical report 87 for the 2014 election), §3.6 (Gazette SC 6 vs Commission SC 7),
§3.4 (±10 % vs ±20 % inside the Commission's own volume), §2.5 (four ECI values for one 2024 LS turnout),
§4.1a (Leh postal 2,822 vs 2,697 inside D8).

---

## 6.5 ARITHMETIC VERIFICATION SHEET — for stage 4's hand-check

Every identity below was re-run at the end of this session and every one closes. Stage 4 should be able to
reproduce all of them with a calculator.

| # | Identity | Result |
|---|---|---|
| 1 | 111 − 24 = 87 | ✓ |
| 2 | 87 − 4 = 83 | ✓ |
| 3 | 107 − 24 = 83 (s.14(3) against s.14(10)) | ✓ |
| 4 | 114 − 24 = 90 (s.60(1) against the 90 of the final order) | ✓ |
| 5 | 90 − 83 = 7 **and** 114 − 107 = 7 — the same seven, two ways | ✓ |
| 6 | 46 + 37 = 83 (D1 Third Schedule, parsed district by district) | ✓ |
| 7 | 47 + 43 = 90 (D5, and my district sums) | ✓ |
| 8 | Kashmir 6,888,475 + Jammu 5,378,538 = 12,267,013 = the Commission's printed UT total | ✓ |
| 9 | 12,267,013 ÷ 90 = 136,300.14 = the Commission's printed average | ✓ |
| 10 | 136,300 × 0.9 = 122,670 (cat. A) and × 1.1 = 149,930 (cat. C) | ✓ |
| 11 | Kashmir area 15,948 + Jammu 26,293 = 42,241 = the Commission's printed grand total | ✓ |
| 12 | 6,888,475 ÷ 47 = 146,563.3 ; 5,378,538 ÷ 43 = 125,082.3 ; difference 21,481.0 ; ratio 0.8534 | ✓ |
| 13 | 15,948 ÷ 47 = 339.3 km² ; 26,293 ÷ 43 = 611.5 km² | ✓ |
| 14 | pre-delimitation: 6,888,475 ÷ 46 = 149,749.5 ; 5,378,538 ÷ 37 = 145,365.9 ; ratio 0.9707 | ✓ |
| 15 | SC 924,108 ÷ 12,267,013 × 90 = 6.7799 → 7 ; ST 1,274,958 ÷ 12,267,013 × 90 = 9.3540 → 9 | ✓ |
| 16 | 2014: 4,794,374 + 28,402 = 4,822,776 (D8's own two pages) | ✓ |
| 17 | 2014: 4,794,374 ÷ 7,316,946 = 65.5243 % (D8's printed 65.52) | ✓ |
| 18 | 2014: 4,822,776 ÷ 7,316,946 = 65.9124 % (L-0010's 65.91) | ✓ |
| 19 | 2008: 3,952,094 ÷ 6,461,757 = 61.1613 % (D9's printed 61.16) | ✓ |
| 20 | 2002: 2,656,627 ÷ 6,078,570 = 43.7048 % (D10's printed 43.70, on the 85-AC denominator) | ✓ |
| 21 | 1996: 2,567,038 ÷ 4,761,095 = 53.9174 % (D11's printed 53.92) | ✓ |
| 22 | 2024 LS: 5,162,866 ÷ 8,802,348 = 58.6533 % (D12's printed State Total 58.65) | ✓ |
| 23 | 2019 LS Ladakh-removed: 3,435,394 ÷ 7,743,306 = 44.3660 % | ✓ |
| 24 | 2014 LS Ladakh-removed: 3,452,469 ÷ 7,016,366 = 49.2059 % | ✓ |
| 25 | 2024 assembly electors: 2,327,580 + 2,578,099 + 3,918,220 = 8,823,899, covering ACs 1–90 exactly once | ✓ |
| 26 | Kashmir 4,636,698 + Jammu 4,187,201 = 8,823,899 | ✓ |
| 27 | elector-weighted mean of the 90 AC turnouts = 63.8781 % against the ECI's published 63.88 % | ✓ |
| 28 | 2014 Ladakh electors 14,109 + 70,840 + 60,094 + 21,143 = 166,186 | ✓ |
| 29 | 2014 Ladakh-removed electors: 7,316,946 − 166,186 = 7,150,760 | ✓ |
| 30 | 2014 Ladakh-removed at-polling-stations: 4,679,162 ÷ 7,150,760 = 65.4359 % | ✓ |
| 31 | electorate growth on the Ladakh-removed base: 8,823,899 ÷ 7,150,760 − 1 = +23.3981 % (= the ECI's "~23 %") | ✓ |
| 32 | 2017 Srinagar by-election: 89,883 ÷ 1,261,817 = 7.1233 % ; 88,951 + 932 = 89,883 | ✓ |

---

## 7. WHAT STAGE 3 MAY AND MAY NOT AUTHOR FROM THIS PART

**May author, all primary-sourced and arithmetic-checked:**
- The seat chain 111 → 87 → 83 → 90 with the 24 PoK seats, every step cited to D1, D2 or D5 (§3.1).
- Turnout computed over 90, never 114, with s.14(4) as authority (§2.7).
- The 1996/2002/2008/2014 assembly series with denominators and bases stated (§2.1), and the
  65.52/65.91 pair with the L-0010 reconciliation (§2.1a).
- The Lok Sabha series 2014/2019/2024 with the Ladakh-removed recomputation (§2.3).
- The population basis asymmetry as corrected in §3.2, including both corrections in §3.2(d).
- Population per seat by division, 146,563 vs 125,082, with the pre-delimitation counterfactual and the
  area computation (§3.5).
- The 9 ST / 7 SC reservation with the proportionality check (§3.6).
- `differentFacts = FALSE` on delimitation, with a note (§6.1).
- The four-values-for-one-quantity finding (§2.5) and the ECI's own basis-break footnote (D7).
- The absence of the 2024 statistical report as a **cohort-wide** `not-published` (§5.1).

- The 2017 Srinagar by-election in full — 7.1233 % turnout, 89,883 of 1,261,817, zero postal, winner on
  3.85 % of the electorate — and the ECI date defect (§4.2a).
- **The 2024 assembly electorate, 8,823,899 across 90 ACs, derived by summing the ECI's own three phase
  press notes and validated to four significant figures against the ECI's published 63.88 %** (§2.6a).
- **Division-wise 2024 electors per seat — Kashmir 98,653, Jammu 97,377 — and the finding that the
  disparity is 17.17 % on 2011 population but 1.31 % on 2024 electors** (§2.6b). This is the single most
  useful addition to the delimitation dispute and it strengthens rather than disturbs §6.1.
- **The ECI's own press note misstating the 2014 seat count as 83 against its own statistical report's 87**
  (§2.6c) — a retroactive relabelling caught in an official document.
- The schedule, the Supreme Court deadline and the Bishnoi-festival slip, with both readings (§2.6e).
- The ECI's own attribution of the election to the Supreme Court's direction (§5.6).
- **The 2014-with-Ladakh-removed assembly figures — 7,150,760 electors, 65.44 % at polling stations,
  65.77 % postal-inclusive — and the resulting like-for-like 2014→2024 change of −1.56 pp** (§4.1a).
- **That the ECI's unexplained "~23 %" electorate growth is computed on the Ladakh-removed 2014 base
  (+23.3981 %), which confirms the silent rebasing in §2.6c** (§4.1a).
- The **absence of an Anantnag by-election from the ECI's own 2017 register** (§4.3).

**MUST NOT author from this part:**
- Any deferral date, deferral count or ECI stated reason for the Anantnag by-election (§4.3).
- Any Srinagar re-poll figure (§4.3).
- Any content of the associate members' dissent (§3.8).
- The 2024 assembly election **result** (§2.6).
- Phase-1 and phase-2 2024 polling dates or turnouts (§2.6).
- Any statement about the Special Summary Revision or "new voters" (§5.3).
- Any official reason for the 2014–2024 gap (§5.6).
- Any verbatim quotation from D3 or D4 (§0.2).
- Any claim that the 2024 statistical-report absence is J&K-specific (§2.4).
- The delimitation order's effective date (§3.10).
- No new enum value is proposed. **If stage 3 authors a delimitation record it will most likely want the
  L-0092 shape — a presentational/definitional finding currently filed `contested`.** The delimitation
  record is not `contested` in the schema's sense (the evidence does not support more than one reading of
  what happened; it supports one reading of the facts and two of their weight) and it is not `no-objective`
  (an objective was stated: equal population per constituency, so far as practicable). If forced today I
  would file it `contested` and note in `assessmentNote` that the value is carrying a weighting dispute
  rather than an evidentiary one, and that it is an L-0092-shaped record awaiting the pending decision.

---

# ⚠ ARITHMETIC CORRECTION AT SOURCE — orchestrator, 2026-08-03, stage 4

**Appended, not edited. Lines 870, 872 and 1487 above are DEFECTIVE and are corrected here.**
Recorded at source because a correction applied only to the authored record re-enters on the next
run — four of phase 11's six arithmetic errors originated in `parts/` and had to be fixed here too.

**The defect, at line 872 and repeated in the line-1487 verification table:**

> `Ratio:  145,365.9 / 149,749.5  =  0.9707`

**That ratio is Jammu ÷ Kashmir. Every other ratio in this part is Kashmir ÷ Jammu.** The
post-delimitation figure the same passage compares it against is `146,563 / 125,082 = 1.1717`, which
is Kashmir ÷ Jammu. **Setting 1.1717 against 0.9707 makes a widening gap read as a reversal of
direction.**

**Correct, both the same way round (Kashmir ÷ Jammu):**

| | Kashmir/seat | Jammu/seat | ratio K÷J |
|---|---|---|---|
| pre-delimitation (46 / 37) | **149,749** | 145,366 | **1.0302** |
| post-delimitation (47 / 43) | 146,563 | 125,082 | **1.1717** |

Both exceed one. The gap widened from **3 per cent to 17 per cent**; it did not reverse.

**A second, smaller defect in the same lines: `149,749.5` is wrong at 1 dp.**
`6,888,475 ÷ 46 = 149,749.4565…`, which is **149,749.5 only if rounded to 1 dp from 149,749.46 —
but it was then carried into the authored record as 149,750.** Use the integer **149,749**.
`5,378,538 ÷ 37 = 145,365.89 → 145,366` is correct as printed.

**Line 1487's verification table marks item 14 `✓`.** It re-derived the same ratio the same wrong way
round, so the tick records internal consistency, not correctness. **A self-check that recomputes a
figure by the method that produced it cannot detect the method being wrong** — Rule 1, at the level of
a single arithmetic line.

**The authored records (L-0141 and its provenance record) are already corrected.** This note exists so
the next run does not re-import the defect from here.
