# 07 — PANCHAYATS, URBAN LOCAL BODIES AND THE DISTRICT DEVELOPMENT COUNCILS

Stage-2 research part, phase 12 (`kashmir-rights`), `--dry`. Model: **opus** (claude-opus-5) in this thread.
Two subagents were spawned, both instructed to run on opus; each self-reported **claude-opus-5**. Their material is
marked inline as `[SUBAGENT-ULB]` and `[SUBAGENT-FUNDS]` and carries its own retrieval marks, which I did not re-verify
except where stated. Where a subagent finding and a document I retrieved myself disagree, I say so and do not adjudicate.

**THE HEADLINE.** As of **24 February 2026**, Jammu and Kashmir has **no elected representative at any local tier**:
panchayats and Block Development Councils expired 9 January 2024, municipal bodies October–November 2023, and the
District Development Councils on 24 February 2026. Every tier's term has lapsed without a successor election. This is
the first-class finding the scope note asked me to chase, and it is established.

**THE SECOND HEADLINE, and the one that is new.** The J&K election authority's own 2018 press releases state the
turnout denominator **in the authority's own words**, and the wording **changed mid-series on 3 December 2018**. I
retrieved the documents. The 74% figure is computed over the constituencies that saw a contest, and from the same
documents I can show that subset is **under half the seats**.

---

## 0. RETRIEVAL LEDGER — every document, marked

The standing rule is applied per document. **A wayback capture of an official PDF is flagged separately below and I do
not resolve its tier unilaterally.**

### 0.1 Hosts probed by me, this session

| Host | Result | Method |
|---|---|---|
| `www.mha.gov.in` | **200** | curl, browser UA. Annual Reports downloaded and text-extracted. |
| `prsindia.org` | 200 | curl |
| `web.archive.org` | **200 to curl; BLOCKED to WebFetch** | This is the inverse of phase 11's pattern and is load-bearing: **the archive route only works through Bash/curl.** |
| `www.india.gov.in` | 200 | curl |
| `sansad.in` | 200 to curl on second probe, 000 on first | intermittent |
| `secjk.nic.in` (J&K SEC) | **DNS failure / no connection**, curl and WebFetch | unreachable live |
| `ceojk.nic.in` (CEO J&K) | **DNS failure** | unreachable live |
| `jksec.nic.in`, `jkpanchayat.nic.in`, `jkgad.nic.in` | **DNS failure** | unreachable |
| `jk.gov.in`, `rdd.jk.gov.in` | **DNS resolves (164.100.223.4 / .94) but TCP connection fails** | unreachable |
| `panchayatiraj.gov.in` (Ministry of Panchayati Raj) | **NXDOMAIN** | unreachable |
| `pib.gov.in`, `eci.gov.in`, `loksabha.nic.in`, `rajyasabha.nic.in`, `cag.gov.in`, `fincomindia.nic.in`, `indiacode.nic.in`, `secforuts.mha.gov.in`, `ladakh.gov.in`, `newsonair.gov.in`, `thc.nic.in`, `jammu.nic.in` | **DNS failure or no connection** | unreachable |

Phase 11's pattern **holds and extends**: every J&K territorial host failed; MHA succeeded. New this phase: **most Union
hosts other than MHA also failed** (PIB, ECI, Parliament, CAG, Finance Commission, India Code, and the Ministry of
Panchayati Raj). I state the pattern and decline to explain it. **Nothing in this table supports `not-collected`,
`not-published` or `withheld`** — those are claims about a holder, not about this session's network.

### 0.2 RETRIEVED — the J&K election authority's own documents, via Internet Archive captures of `secjk.nic.in` and `ceojk.nic.in`

All fetched by me with curl against `web.archive.org`, HTTP 200, and read in full.

| # | Document | Original URL (as captured) | Capture | How read |
|---|---|---|---|---|
| D1 | **"LOCAL BODIES ELECTIONS 2018 — PRESS NOTE — PANCHAYAT ELECTIONS IN JAMMU & KASHMIR"**, 16 Sept 2018, 6 pp | `https://secjk.nic.in/PanchyatResults_ms/local_body_pytEle2018_press_note.pdf` | 20230411230429 | scanned; read page-by-page as images |
| D2 | Press Release **19/11/18** (phase II), Election Authority | `.../Arc/PanEle2018/Press release 19.11.2018 - phase II.pdf` | 20230411230401 | scanned; read as image |
| D3 | Press Release **23/11/18** (phase III) | `.../Arc/PanEle2018/Press release 23.11.2018 - phase III.pdf` | 20230411230425 | scanned; read as image |
| D4 | Press Release **26/11/18** (phase IV) | `.../Arc/PanEle2018/PressRelease26.11.2018.pdf` | 20230411230436 | scanned; read as image |
| D5 | Press Release **28/11/18** (phase V) | `.../Arc/PanEle2018/PressRelease28.11.2018.pdf` | 20230411230358 | text layer, `pdftotext -layout` |
| D6 | Press Release **30/11/18** (phase VI) | `.../Arc/PanEle2018/PressRelease30.11.2018.pdf` | 20230411230318 | scanned; read as image |
| D7 | Press Release **03/12/18** (phase VII) | `.../Arc/PanEle2018/PressRelease03.12.2018.pdf` | 20230411230331 | text layer |
| D8 | Press Release **10/12/18** (phase IX) | `.../Arc/PanEle2018/PressRelease10.12.2018.pdf` | 20230411230410 | text layer |
| D9 | **"DISTRICT DEVELOPMENT COUNCILS & PANCHAYAT (VACANT SEATS) ELECTIONS 2020 — PRESS NOTE (4th November, 2020)"**, 17 pp | `https://secjk.nic.in/Old_Orders_Notifications_Circular/pdf_Old_Order_notice_circular_from_CEO/old_order_notice_ceo_29.pdf` | 20221219153646 | scanned; pp. 1–11 read as images |
| D10 | SEC homepage (index of published document classes) | `https://secjk.nic.in/` | 20250128032630 | HTML |
| D11 | SEC "Panchayat Elections 2018" archive index | `http://secjk.nic.in/Arc (2)PanEle2018.html` | 2023 | HTML |
| D12 | SEC "DDC Elections 2020" result index | `https://secjk.nic.in/DDC_Result_2020.html` | 2023 | HTML |
| D13 | SEC "Panchyat_Result_Main" index | `https://secjk.nic.in/Panchyat_Result_Main.html` | 2023 | HTML |
| D14 | CEO J&K **"Phase wise voter turnout report of DDC and Panchayat By-Election, 2020"** index | `http://ceojk.nic.in/DDC_PE_Phasewise turnout.htm` | 20230325164342 | HTML |
| D15 | CEO J&K Municipal Elections 2018 turnout and result index pages (`ME2018_PhasewiseTurnout.htm`, `ME2018_Phase1_Turnout.htm`, `ME2018_PhaseII_Turnout.htm`, `ME2018_PhaseIII_Turnout.htm`, `ME2018_PhaseIV_Turnout.htm`, `ME2018_Result.htm`, `ME2018_Result_kmrDiv.htm`, `ME2018_Result_JmuDiv.htm`) | `ceojk.nic.in` | 2018-10 captures | HTML — **index pages only, see 0.4** |
| **D20** | **THE JAMMU AND KASHMIR PANCHAYATI RAJ ACT, 1989 — Act No. IX of 1989, [11th July, 1989]**, bare text, 158 pp | `https://secjk.nic.in/PanchyatResults_ms/Panchyat_2011_Result_Main/Panchayati-Raj-Act-1989.pdf` | 20230411230209 | scanned, no text layer; **pp. 1–7 of the printed Act read as images.** See §9. |

**THE TIER QUESTION ON D1–D15, stated and not resolved by me.** These are the issuing authority's own PDFs and HTML,
byte-captured by the Internet Archive because the live host is unreachable. They are not a reproduction on a private
portal — the archive is not restating the content, it is serving the issuer's own file. My reading is that this is
**T1 with the retrieval route recorded on the source**, i.e. "retrieved from Internet Archive capture of
secjk.nic.in/ceojk.nic.in; live host unreachable from this environment, capture date given". The competing reading —
that only the live issuer host counts and everything here is T4 — is defensible and I flag it rather than assume it
away. **Stage 3 must decide once, explicitly, and apply it uniformly.** If stage 3 takes the T4 reading, the entire
quantitative spine of this part drops a tier and the definitional finding in §3 becomes T4, which would be wrong in
substance but is the honest consequence.

### 0.3 RETRIEVED — MHA, live host, direct

| # | Document | URL | Note |
|---|---|---|---|
| D16 | **MHA Annual Report 2021-22** | `https://www.mha.gov.in/sites/default/files/AnnualReport202122_24112022[1].pdf` | 17.3 MB, text-extracted. Paras 14.21, 14.22. **T1.** |
| D17 | **MHA Annual Report 2023-24** | `https://www.mha.gov.in/sites/default/files/AnnualReport_27122024.pdf` | 23.6 MB, text-extracted. **T1.** |
| D18 | **MHA Annual Report 2024-25** | `https://www.mha.gov.in/sites/default/files/AREnglish_24032026.pdf` | 22.7 MB, text-extracted. **T1.** |
| D19 | MHA Annual Reports index | `https://www.mha.gov.in/en/documents/annual-reports` | HTML, all report years present |

### 0.4 RETRIEVAL FAILURES that are findings in themselves

**The SEC's own consolidated RESULTS are linked from its own archived pages and the target files are not captured.**
I queried the wayback CDX API for each, by exact URL and by prefix. Each returns **nothing**:

- `secjk.nic.in/PanchyatResults_ms/Panchyat_2018_result_ms/Panchy_18_PhasewiseRes.html` — the link labelled
  **"Phase wise turnout Reports"** on D11. **Not captured.**
- `secjk.nic.in/ResultDDC_ms/DDC_2020_Result_final.pdf` — the link labelled **"DDC-2020-Results"** on D12.
  **Not captured.**
- `secjk.nic.in/PanchyatResults_ms/Final_SO118dt06Apr2021_compressed_panchayat_result_from_rddjk.pdf` — **S.O. 118
  dated 6 April 2021**, "Regarding Names of Sarpanchs & Panchs in Halqa Panchayats of U.T", linked from D13 and
  attributed on the link text to **RDD J&K**. **Not captured.**
- `secjk.nic.in/ResultDDC_ms/DDC_2020_content/SO 65.pdf` — **S.O. 65 dated 25 February 2021**, "Regarding Names of
  Chairpersons, Vice Chairpersons & Members" of the DDCs, linked from D12. **Not captured.** (This is the instrument
  that constituted the DDCs — see §2.7, where its date decides the term-expiry question.)
- `secjk.nic.in/MunicipalElectionsContent/mc_election_2018/Result_Notifi_Corp.pdf` — **Not captured.**
- `ceojk.nic.in/DDC_PE_Phase1.htm` … `DDC_PE_PhaseVIII.htm` — the eight DDC phase turnout reports linked from D14.
  **Only the index is captured; none of the eight.**

So: **the index pages survive and the results do not.** I state this as a retrieval fact about this session and the
archive. It does **not** establish `not-published` — the files plainly were published, since the links were live and
the archive captured the pages carrying them. What it establishes is that **the J&K local-election result series has no
surviving public copy reachable from here**, and that a reader today cannot get from the SEC's own index to the SEC's
own results. That is a real degradation of an official series and stage 3 should consider it as a provenance record
about the instrument, not as an absence record about the data.

### 0.5 RELAYED — press and secondary, retrieved by me but relaying figures I did not see at source

| # | Document | Retrieval | Grade |
|---|---|---|---|
| R1 | Scroll.in, **Safwat Zargar, 16 December 2018**, "J&K panchayat elections saw 74% voter turnout – but that figure hides the full story" — `https://scroll.in/article/905364/a-closer-look-voter-turnout-numbers-do-not-tell-the-whole-story-of-kashmirs-panchayat-elections` | **RETRIEVED by curl (HTTP 200), full text read.** WebFetch got 403; curl with a browser UA got 200. | **T4.** Its figures are attributed to "data released by the chief electoral officer" and I did not see that data. |
| R2 | The Wire, **Mudasir Ahmad, 30 September 2019**, "After 'Successful' Panchayat Polls in Kashmir Last Year, 61% of Seats Lie Empty" — `https://m.thewire.in/article/government/kashmir-panchayat-elections-participation` | **RETRIEVED (WebFetch).** | **T4.** Figures attributed to a press conference by J&K Chief Electoral Officer **Shailendra Kumar**, 29 September 2019. Official figure known only through a press account = T4 by the standing rule. |
| R3 | The Wire, **Jehangir Ali, 10 January 2024**, "As Panchayat Terms End, J&K's Only Elected Institution is the District Development Council" — `https://m.thewire.in/article/government/jammu-and-kashmir-elected-representatives-panchayat` | **RETRIEVED (WebFetch).** | **T4.** |
| R4 | Daily Excelsior, **Sanjeev Pargal, 25 February 2026**, "DDCs term ends, all three tiers of PRIs cease to exist now" — `https://www.dailyexcelsior.com/ddcs-term-ends-all-three-tiers-of-pris-cease-to-exist-now/` | **RETRIEVED (WebFetch).** | **T4.** |
| R5 | Kashmir Observer, **13 December 2025**, "When Does DDC Tenure End? J&K Govt Seeks Legal Opinion" — `https://kashmirobserver.net/2025/12/13/when-does-ddc-tenure-end-jk-govt-seeks-legal-opinion/` | **RETRIEVED (WebFetch).** Byline "Agencies". | **T4.** |
| R6 | Kashmir Observer, **9 February 2026**, "ULB, Panchayat Polls Planned At Earliest, SEC Post Vacant: CM Omar" — `https://kashmirobserver.net/2026/02/09/ulb-panchayat-polls-planned-at-earliest-sec-post-vacant-cm-omar/` | **RETRIEVED (WebFetch).** | **T4**, and note what it is: a press account of a **written reply by the Chief Minister in the J&K Legislative Assembly** to Congress MLA Tariq Hameed Karra. The assembly answer itself was not retrieved. |
| R7 | Wikipedia, J&K State Election Commission | **RETRIEVED.** | **T4**, used only to locate `secjk.nic.in` and the name B.R. Sharma. No figure taken from it. |

**Documents I did NOT retrieve and must not be cited as though I had:** the J&K Reorganisation Act 2019
bare text (three routes tried, all failed); C.O. 272 of 5 August 2019; the Constitution (Application to Jammu and
Kashmir) Order 1954; the "Union Territory of Jammu and Kashmir Reorganization (Adaptation of State Laws) Fourth Order,
2020"; S.O. 304 of 1 October 2020; S.O. 336 of 29 October 2020; S.O. 53 of 10 February 2020; S.O. 65 of 25 February
2021; S.O. 118 of 6 April 2021; Notification EA/Pyt/2020/02 of 26 October 2020; Notification EA/Pyt/2020/03 of
3 November 2020; the J&K Panchayati Raj (Amendment) Act 2018 of 17 March 2018; SRO 405 of 16 September 2018; S.O. 35
of 27 January 2020; the J&K Local Bodies Laws (Amendment) Act 2024. **Every one of these is named to me by a document
I did retrieve** (see §2), which is why I can identify them by number and date without having read them. **Naming an
instrument on another document's authority is not retrieving it, and stage 3 must carry them as identified-not-read.**

---

## 1. PERIODISATION — and the break bites exactly where the scope note said it would

**5 August 2019 — constitutional break.** Not directly a counting break for this subject.

**31 October 2019 — administrative-unit break.** This bites on this part harder than on any other, and I can show it
arithmetically from two documents both issued by the same authority.

**The 2018 basis, from D1 (the Election Authority's own press note of 16 September 2018).** The table of "Blocks /
Panchayat Halqas / Panch Constituencies / Electors in 2018 (as per draft Roll)" covers **22 districts, including Leh
and Kargil**, and totals:

| | Blocks | Panchayat Halqas | Panch Constituencies | Electors |
|---|---|---|---|---|
| Kashmir division (10 districts) | 137 | 2,176 | 17,348 | 2,822,649 |
| **Ladakh (Leh 95/687; Kargil 98/750)** | **31** | **193** | **1,437** | **146,773** |
| Jammu division (10 districts) | 148 | 2,121 | 16,311 | 2,843,007 |
| **Total as printed** | **316** | **4,490** | **35,096** | **5,812,429** |

**Arithmetic check, mine.** Blocks 137+31+148 = 316 ✓. Halqas 2,176+193+2,121 = 4,490 ✓. Panch 17,348+1,437+16,311 =
35,096 ✓. Electors 2,822,649+146,773+2,843,007 = **5,812,429 ✓ exact.** The document is internally consistent to the
unit. This is a solid anchor.

**The 2020 basis, from D9 (the same authority's press note of 4 November 2020).** In the body:

> "The last General Elections to the Panchayats were held in the months of November-December, 2018 and 22214 Panches
> and 3459 Sarpanches were returned elected by the respective Returning Officers **out of 33592 Panch and 4290 Sarpanch
> constituencies in the UT of Jammu and Kashmir.**"

And in the statistics table: Kashmir 2,182 halqas, Jammu 2,109 halqas, **Grand Total 4,291**, blocks 285.

**The break does not net.** Subtract Ladakh from the 2018 figures:

- Halqas: 4,490 − 193 = **4,297**. The 2020 document says **4,290** in its text and **4,291** in its table.
  **Residual: 6 or 7 halqas, unexplained.**
- Panch constituencies: 35,096 − 1,437 = **33,659**. The 2020 document says **33,592**.
  **Residual: 67 panch constituencies, unexplained.**
- Blocks: 316 − 31 = **285**. The 2020 document says **285**. ✓ **This one nets exactly.**

So the block count crosses the 31 October 2019 break cleanly and the halqa and panch counts do not. **Neither document
explains the residual, and neither acknowledges a change.** Two further facts make it worse: (a) the 2020 table's own
column sums to **4,291** while the same document's text says **4,290** — a one-unit internal inconsistency inside a
single press note; (b) the Kashmir halqa count **rose** from 2,176 to 2,182 while Jammu's **fell** from 2,121 to 2,109,
so the movement is not a single re-delimitation in one direction.

**Consequence for the instrument.** Any series `jk-panchayat-halqas`, `jk-sarpanch-seats`, `jk-panch-seats` or
`jk-panchayat-seats-vacant` **must break at 31 October 2019**, and the break is **not** a clean subtraction of Ladakh —
it is a subtraction plus an undocumented residual. Splicing 4,490 to 4,290 as though the difference were Ladakh
(1,630 seats: 193 halqas + 1,437 panch) would be wrong by 6–7 halqas and 67 panch constituencies, and would silently
adopt a restatement the issuer never announced. **Ladakh's exact departing quantity is 193 halqas + 1,437 panch
constituencies = 1,630 seats, 31 blocks, 146,773 electors, all from D1.**

Note also that the **SEC's own remit did not follow the territorial break**: D10, captured January 2025, describes
itself as "State Election Commission, J&K **and Ladakh** (secjk.nic.in)". The commission spans both UTs while the
Panchayati Raj Act denominators do not. Do not assume an SEC document's geographic scope from its issuer.

**A third break, on the reporting basis rather than the territory: 3 December 2018.** See §3.

**May 2014 is not a break here** and I did not treat it as one.

**The August 2019 blackout.** It degraded media-derived series while leaving official series formally intact — and this
part is a clean demonstration. The official 2018 seat and turnout tables (D1–D8) were all published before the
blackout and are unaffected. The **vacancy** figures that describe the same seats after it (R2, September 2019) exist
only as a press account of a press conference. The two families break at the same moment in opposite ways: the official
series stops being published, the media series stops being independent.

---

## 2. THE SEQUENCE — dated, instrument-identified

### 2.1 Why the 73rd and 74th Amendments did not apply before 2019

**NOT ESTABLISHED FROM A RETRIEVED PRIMARY DOCUMENT, and I say so plainly.** The mechanism as I understand it —
Article 370 meant only those provisions of the Constitution extended by Presidential Order under the Constitution
(Application to Jammu and Kashmir) Order 1954 applied to J&K, and Parts IX and IXA, inserted by the 73rd and 74th
Amendment Acts of 1992, were never so extended — is **RELAYED** and I could not retrieve C.O. 1954, C.O. 272 of
5 August 2019, or the Reorganisation Act. `indiacode.nic.in`, `ladakh.gov.in`, `thc.nic.in` and `secforuts.mha.gov.in`
all failed; the archive has no capture of the Act PDF.

**What I CAN establish, from a retrieved T1 document, is the consequence — and it is stronger than the mechanism.**
MHA Annual Report 2023-24 (D17), reporting on the J&K Local Bodies Laws (Amendment) Bill 2024:

> "The Jammu and Kashmir Local Bodies Laws (Amendment) Bill, 2024 has been passed by the Parliament, which provide
> reservation to the 'Other Backward Classes' in the Panchayats and Municipalities in the Union territory of Jammu and
> Kashmir **so as to bring consistency in the local bodies laws such as Jammu and Kashmir Panchayati Raj Act, 1989, the
> Jammu and Kashmir Municipal Act, 2000 and the Jammu and Kashmir Municipal Corporation Act, 2000 of the Union
> territory of Jammu and Kashmir with the provisions of the Constitution of India.** The Bill also provides the
> procedure for removal of State Election Commissioner on the like grounds and…"

**Read that as MHA's own admission.** In 2024 — five years after August 2019 — the Union home ministry states in its
annual report that J&K's three local-bodies statutes still needed amendment "to bring consistency … with the provisions
of the Constitution of India", and that the **procedure for removal of the State Election Commissioner** was being
supplied by that Bill. Article 243K(2) makes the State Election Commissioner removable only in like manner and on like
grounds as a High Court judge; that protection was therefore **not statutorily implemented in J&K until 2024**. This is
T1, retrieved directly, and it is the single best-evidenced statement in this part about the gap between extending the
Amendments and giving effect to them.

### 2.2 The pre-2019 institutional architecture: there was no State Election Commission

**Established from D1 and D5–D8, retrieved.** Every 2018 press release carries the letterhead:

> **"OFFICE OF THE ELECTION AUTHORITY / UNDER PANCHAYATI RAJ ACT, 1989 / (CHIEF ELECTORAL OFFICER, JAMMU AND KASHMIR)"**

and D1 states the vesting instrument:

> "The powers to determine and delimit Halqa Panchayat, Preparation of Panchayat Electoral Rolls and conduct of
> elections are vested with the **Chief Electoral Officer, J&K as Election Authority under J&K Panchayati Raj Act, 1989
> through the Jammu & Kashmir Panchayati Raj (Amendment) Act, 2018 dated 17th March, 2018.**"

**So the 2018 panchayat elections were conducted by the Chief Electoral Officer of J&K wearing a second hat as
"Election Authority" under a state statute — not by a constitutional State Election Commission under Article 243K,
because Article 243K did not apply.** The CEO is an officer appointed in consultation with the Election Commission of
India for *parliamentary and assembly* rolls; the same person ran the panchayat poll under a different statutory
capacity.

**The rename is documented.** D9 (4 November 2020), section 1, first line:

> "**STATE ELECTION COMMISSION:** In terms of Section 36 of the Jammu and Kashmir Panchayati Raj Act 1989, the
> superintendence, direction and control of the preparation of Electoral Rolls for, and the conduct of, all elections
> under the Act are vested in the **Election Authority to be known as State Election Commission**."

The first J&K State Election Commissioner, **Kewal Kumar Sharma**, was appointed **30 October 2020** — RELAYED, via
search result only; I did not retrieve the appointment order (`jkgad.nic.in` unreachable). Later holders: **B.R. Sharma**
(named on D10, the January 2025 SEC homepage capture, as "State Election Commissioner, UT Of Jammu & Kashmir");
**Shantmanu**, appointed 17 February 2026, took over 21 February 2026 `[SUBAGENT-ULB, T4]`.

**THIS IS THE ANSWER TO THE SCOPE NOTE'S CENTRAL QUESTION, and it reframes it.** The scope note asks "what was the
State Election Commission's published turnout denominator". **In 2018 there was no State Election Commission.** The
publisher was the Election Authority under the J&K Panchayati Raj Act 1989, i.e. the CEO J&K. Its published denominator
is in §3 and is stated in its own words.

### 2.3 The 2018 panchayat elections — schedule and instruments, all from D1

- Previous general panchayat elections: **2011, after a gap of 10 years**. "The Panchayats elected in the year 2011
  **completed their tenure in July, 2016**." → a **28-month vacancy, July 2016 to November 2018**, before the one that
  followed 2024. The 2018 poll was itself already two and a half years late.
- Draft Panchayat Electoral Rolls published **18 August 2018**, qualifying date **1 January 2018**.
- RDD notification calling upon halqas to elect: **SRO No. 405 dated 16 September 2018**, under the J&K Panchayati Raj
  Rules 1996.
- Reservation of Sarpanch/Panch constituencies for SC, ST and Women notified by the **Directors of Rural Development
  Department, J&K** — i.e. by the executive department, not by the election authority.
- "In view of the recent amendments making **direct elections to Sarpanch**, the electors shall cast their votes for
  the Panch as well as Sarpanch" — two ballot-paper colours. Direct sarpanch election was new in 2018.
- Expenditure ceilings: **Sarpanch ₹20,000; Panch ₹5,000.**
- **Nine phases**, gazette notifications 23 Oct – 14 Nov 2018, polls **17, 20, 24, 27, 29 November and 1, 4, 8,
  11 December 2018**; elections to be completed before **17 December 2018**. Ballot boxes, not EVMs.

**The boycott.** National Conference and PDP announced they would not participate, over Article 35A — **RELAYED** via
R1, which also records the Hurriyat boycott call and a video message of 28 August 2018 by Hizbul Mujahideen commander
Riyaz Naikoo warning nominees to "bring along shrouds". `[SUBAGENT-ULB]` adds CPI(M) to the boycotting parties for the
ULB poll, T4. **No official document I retrieved mentions the boycott.** That asymmetry is worth recording: the
official series records seats without candidates and never records why.

### 2.4 The October 2018 urban local body elections — `[SUBAGENT-ULB]`, all T4

Four phases 8–16 October 2018, counting 20 October. **1,145 wards** across the municipal bodies; **16.97 lakh**
electors; reservation 90 SC, 38 ST, 322 women. First use of EVMs; previous ULB poll **January–February 2005**, whose
bodies' five-year terms **expired in March 2010** — so an **eight-year vacancy and a thirteen-year gap between polls**,
the same pattern as the panchayat tier.

Turnout as stated by CEO **Shaleen Kabra**: "**the cumulative poll percentage in all the four phases is 35.1%**";
phase 4 (Srinagar + Ganderbal) **4.2%**, Srinagar **4%**, Ganderbal **11.3%**. Kashmir division across all four phases
**~5%** (phases: 8.2%, 3.4%, 3.5%, 4.2%); Jammu region **~68%**.

**Two premise corrections the subagent makes and I pass through unadjudicated:** the "Kashmir division 4.2%" figure is
the *phase-4* aggregate, not the divisional figure (which is ~5%); and the Jammu figure it retrieved is ~68%, not
78–80%.

**The ULB denominator, same shape as the panchayat one.** Of **624** Kashmir-division wards, **177 had no candidate at
all** and **215 were uncontested**, leaving **232** polled. (232+215+177 = 624 ✓.) So **62.8% of Kashmir wards never
went to a poll** and their electors are absent from the turnout denominator by construction. The subagent flags a
competing set (598/231/181/186, also internally consistent) and could not resolve the two. **It could not retrieve the
SEC's own ULB turnout definition** — that page is one of the uncaptured files in §0.4. **The 35.1% cannot be read as
"35.1% of J&K's urban electorate voted", and no retrieved official document says what it can be read as.**

**Unresolved counts:** 77 vs 79 municipal bodies (the CM's 2026 assembly reply says **77**; a 2018 press account says
79); no J&K-wide no-candidate ward total exists in anything retrieved.

Independently corroborating the low urban figure from a document I retrieved myself: R1 (Scroll, Dec 2018) — "For the
municipal elections held in October, the average turnout was **4.27%**" — but note that is Scroll giving the
*Kashmir-valley* figure in a Kashmir-valley context, and it does not match the 5% or the 4.2% above. **Three numbers,
4.2 / 4.27 / ~5, for what may be three different objects.** Do not merge them.

### 2.5 The 2019 extension, and the BDC election of October 2019

The extension of Parts IX and IXA is **not established from a retrieved instrument** (§2.1). What is established from
D9 is that by November 2020 the **J&K Panchayati Raj Act 1989** had been amended to carry a third tier, and that the
**BDC chairperson elections of October 2019** happened and had a measurable side-effect: "as a result of elections of
Chairpersons of BDCs in October, 2019 **another 307 seats** of Panches/Sarpanches fell vacant." BDC chairpersons are
elected indirectly by sitting panches and sarpanches, so each such election vacates a panchayat seat.
`[SUBAGENT-ULB, T4]` dates the BDC poll to **24 October 2019** and records the statutory rule that "the tenure of a
BDC shall be co-extensive with the term of Panchayats of that block".

### 2.6 The DDC — the genuinely new tier, October 2020

**The amendment instrument.** MHA amended the J&K Panchayati Raj Act 1989 and the J&K Panchayati Raj Rules 1996 on
**16/17 October 2020**, by order under **section 96 of the J&K Reorganisation Act 2019**, styled the **"Union Territory
of Jammu and Kashmir Reorganization (Adaptation of State Laws) Fourth Order, 2020"** `[SUBAGENT-ULB, T4]`.
**I did not retrieve this order and neither did the subagent.** The S.O. number is **NOT ESTABLISHED**. This is a
material gap: the instrument that created the DDC is identified by name and date on press authority only.

**What the DDC is, from D9 (retrieved):**

- **Section 45** of the J&K Panchayati Raj Act 1989 "envisages a District Development Council, for each District having
  jurisdiction over the entire district **excluding, such portions of the district as are included in a Municipality or
  Municipal Corporation**". So the DDC is a *rural* district body; urban areas are carved out.
- Delimitation under **Rule 108-A(4)**, draft published by all Deputy Commissioners **19 October 2020**, objections to
  **23 October 2020**, decided by District Level Committees and the **Directors, Rural Development Department**, final
  delimitation notified **vide Notification No. EA/Pyt/2020/02 dated 26.10.2020**.
- **Section 45-A** provides reservation of DDC seats for **SC, ST and Women**; final reservation notified **vide
  Notification No. EA/Pyt/2020/03 dated 03-11-2020**.
- **"In terms of Section 45-A of the Jammu and Kashmir Panchayati Raj Act 1989, the term of DDC shall be five years."**
- **20 districts × 14 constituencies = 280 DDC seats** (140 Kashmir, 140 Jammu). Verified against D9's table: every
  district row reads 14, and the divisional totals read 140 and 140 ✓.
- Expenditure ceiling for a DDC member **₹5,00,000** — against ₹1,00,000 for Sarpanch and ₹30,000 for Panch in the same
  2020 poll, and against ₹20,000 / ₹5,000 in 2018. The sarpanch ceiling rose **five-fold in two years**.

**The election.** Eight phases, gazette notifications 5–23 November 2020, polls **28 November, 1, 4, 7, 10, 13, 16 and
19 December 2020**; **DDC counting 22 December 2020** (D9, retrieved). Polling hours 7 a.m.–2 p.m.

**The result.** **NOT RETRIEVED.** `DDC_2020_Result_final.pdf` is one of the uncaptured files (§0.4). What I have is
**RELAYED via search-result summaries only, and I did not fetch the underlying articles**: turnout around **51%**;
BJP the single largest party with **75** seats, National Conference **67**, independents **50**; the PAGD alliance
variously reported at 110–112 including NC. **I did not retrieve any of these and stage 3 must not carry a DDC result
or turnout figure on my authority.** The DDC phase-wise turnout index page exists (D14, retrieved) and every one of its
eight linked reports is uncaptured — so the DDC turnout is, from here, an official series whose index survives and
whose values do not.

### 2.7 What happened after 2024 — the tier that outlived its own elections

| Tier | Elected | Term expired | Successor election |
|---|---|---|---|
| Municipal Councils/Committees | Oct 2018 | **October–November 2023** | none |
| Srinagar Municipal Corporation | Oct 2018 | **5 November 2023** `[SUBAGENT-ULB, T4]` | none |
| Jammu Municipal Corporation | Oct 2018 | **14 November 2023** `[SUBAGENT-ULB, T4]` | none |
| Halqa Panchayats | Nov–Dec 2018, constituted **10 January 2019** | **9 January 2024** | none |
| Block Development Councils | 24 Oct 2019 | **9 January 2024** (co-extensive with panchayats) | none |
| District Development Councils | Nov–Dec 2020, oath **28 December 2020**, constituted **25 February 2021** | **24 February 2026** | none |

Sources: R3 (The Wire, 10 Jan 2024) for the panchayat/BDC date; R4 (Daily Excelsior, 25 Feb 2026) and R6 (Kashmir
Observer, 9 Feb 2026, reporting the Chief Minister's written assembly reply) for the municipal and DDC dates; R5
(Kashmir Observer, 13 Dec 2025) for the oath/constitution dates. All **T4**.

**The DDC term-start ambiguity is a definitional finding and it was resolved by the executive.** R5, 13 December 2025:
the Department of Rural Development and Panchayati Raj **sought a legal opinion from the Department of Law, Justice and
Parliamentary Affairs** on whether the five-year term ran from the members' oath (**28 December 2020**) or from the
councils' constitution (**25 February 2021**) — i.e. whether the DDCs expired **27 December 2025** or **24 February
2026**. R5's own framing: "the Act clearly stipulates that the term of Panchayats begins from the date of their
constitution" but "**no such clarity exists for DDCs**". The government then notified the **later** date.
`[SUBAGENT-ULB, T4]` adds that in "ending January this year [2026]" the government "notified that the Councils (DDCs)
would cease to exist with effect from February 24, 2026" and communicated this to Additional District Development
Commissioners in their capacity as CEOs of the DDCs. **The notification itself was not retrieved and its number is not
established.** Net effect: an executive reading of an ambiguous term-start bought the councils roughly two months. That
is the closest thing in the record to a term extension, and it was done by resolving a date, not by extending a term.

**A premise correction from `[SUBAGENT-ULB]` that I flag and pass through.** The scope note's expectation that the
administration **extended** local body terms is, on the subagent's retrieval, **wrong**. It found no instrument
extending any elected local body's term. The "extension to 28 February" reported in some accounts is an extension of
the **J&K Local Bodies Dedicated Backward Classes Commission**, not of any elected body — the Commission's term expired
31 December 2024 and was extended to 28 February 2025 (Kashmir Reader, 15 February 2025, T4). I could not check this
myself because `newsonair.gov.in` is unreachable from here. **Terms lapsed; administrators were installed.**

**The administrator instruments, `[SUBAGENT-ULB]`, T4, and I did not verify them:**

- **Panchayats, 10 January 2024** — Block Development Officers appointed administrators of the halqa panchayats in
  their jurisdiction "for a period of six months … or till further orders". Known through a Greater Kashmir opinion
  piece by Dr Raja Muzaffar Bhat; **the order number and text were not retrieved.**
- **Municipal Corporations** — **S.O. 134, "The Jammu and Kashmir Municipal Corporation (Removal of Difficulties)
  Order, 2026"**, File No. HUD-LSG0JMC/21/2026, under **section 427** of the J&K Municipal Corporation Act 2000,
  appointing the Commissioners of JMC and SMC as Administrators for two years, **deemed in force from 30 November
  2025**. Retrieved by the subagent only as reproduced in a news portal, **which is a reproduction on a private portal
  and therefore not retrieval of the order** — mark it RELAYED however verbatim it looks. If it is genuine it is the
  sharpest document in this part, because its own recitals quote the statutory mirror of Article 243U requiring that
  an election "shall be completed … before the expiry of its duration", and then invoke a removal-of-difficulties
  clause to install officials instead. **Stage 3 must not quote S.O. 134 as primary.**
- **DDCs — no administrators.** Minister for Rural Development and Panchayati Raj **Javed Ahmad Dar** stated that DDC
  functions will not be delegated to officers "as no such provision exists in the law" (T4). R4 corroborates:
  "Government has already announced that powers of the DDCs are not being given to any one."

**Stated reasons for the delay, from R6 — a written reply by the Chief Minister in the J&K Legislative Assembly,
9 February 2026, known to me through a press account:** the SEC "is making necessary arrangements for holding panchayat
and urban local bodies elections at the earliest"; **"the position of state election commissioner is lying vacant at
present"**; the OBC Commission report "is under examination"; of **77 ULBs, delimitation is complete for 72 and pending
for 5**; municipal roll revision awaits delimitation. `[SUBAGENT-ULB]` adds from the same reply that panchayat halqa
delimitation is **not** a live reason — halqas were delimited before the 2018 poll on 2011 census figures and "there is
no proposal of fresh delimitation of Panchayat Halqas at present" — and that the OBC Commission **submitted its final
recommendations on 27 February 2025** and they were still unapproved a year later.

**The DDCs and the restored assembly.** `[SUBAGENT-ULB]`, T4: after the October 2024 assembly election, DDC
chairpersons publicly complained of being sidelined — DDC Chairperson Baramulla **Safeena Baig** arguing that "they
can't disempower us because the amendment to the Panchayat Act was carried out by the parliament not by the assembly.
Now, the Jammu and Kashmir assembly is not empowered to amend the Act"; DDC Tral chairperson **Harbaksh Singh**
observing "the MLA is a non-voting member of the DDC who has no role in the District Capex Budget". **This is a
direct structural echo of L-0123**: the tier created by a central order under s.96 of the Reorganisation Act cannot be
altered by the restored legislature, exactly as police and public order cannot be legislated on by it. Not an
amendment to L-0123, but a cross-reference stage 3 should make.

---

## 3. THE TURNOUT DENOMINATOR — the central definitional finding, in the issuer's own words

### 3.1 What the issuer published, verbatim, and when the wording changed

Every 2018 phase press release reports the previous phase's turnout. I retrieved seven of the nine releases and read
each. The wording is not constant.

| Release | Reports | Verbatim | Qualifier? |
|---|---|---|---|
| **19/11/18** (D2) | phase 1 | "In the 1st phase, **the State has witnessed a polling % of 74.1%** - in the Kashmir Division 64.5% and in the Jammu Division 79.4%." | **no** |
| **23/11/18** (D3) | phase 2 | "In the 2nd phase, **the State has witnessed a polling % of 71.1%** - in the Kashmir Division 52.2% and in the Jammu Division 80.4%." | **no** |
| **26/11/18** (D4) | phase 3 | "In the 3rd phase, **the State has witnessed a polling percentage of 75.2%** - in the Kashmir Division 55.7% and in the Jammu Division 83.0%." | **no** |
| **28/11/18** (D5) | phase 4 | "In the 4th phase, **the State has witnessed a polling percentage of 71.3%** - in the Kashmir Division 32.3% and in the Jammu Division 82.4%." | **no** |
| **30/11/18** (D6) | phase 5 | "In the 5th phase, **the State has witnessed a polling percentage of 71.1%** - in the Kashmir Division 33.7% and in the Jammu Division 85.2%." | **no** |
| **03/12/18** (D7) | phases 1–6 cumulative | "At the end of 6 phases, **in respect of the Sarpanch and Panch constituencies that have seen contests**, the overall voter turnout has been **73.6%** for the State, with a poll percentage of 46.1% in the Kashmir Division and 82.8% in the Jammu Division." | **YES** |
| **10/12/18** (D8) | phase 8 | "In the 8th phase, **in respect of the Sarpanch and Panch constituencies that have seen contests**, the overall voter turnout has been **79.9%** for the State, with a poll percentage of 49.6% in the Kashmir Division and 85.1% in the Jammu Division." | **YES** |

**THE ANSWER TO THE SCOPE NOTE'S QUESTION.** The election authority's published denominator is
**"the Sarpanch and Panch constituencies that have seen contests"**. It is stated in the authority's own words, in a
document I retrieved, and it means what it says: **the percentage is computed over the electorate of the seats where a
poll actually took place, not over the panchayat electorate.**

**AND THE DISCLOSURE CHANGED ON 3 DECEMBER 2018.** Through phase 5 the releases said "the State has witnessed a polling
percentage of X%" with no qualifier. From the release of 3 December the qualifier appears and stays. Two things changed
at once: the qualifier was added, **and** the reporting basis switched from per-phase to cumulative-to-date, then
switched back to per-phase on 10 December while keeping the qualifier.

**I make a narrow claim about this and refuse a wider one.** I have no evidence that the *computation* changed — the
denominator was almost certainly the same throughout, because it is the only denominator the underlying data supports
(see §3.2). What changed is the **disclosure**. The first five releases state a percentage the reader will naturally
read as a turnout for the State; the last releases state the same kind of percentage and tell the reader it is not.
**This is a reporting-basis change without a counting-basis change, dated to the day, on an official series.** It is a
provenance record, not a break in the numbers, and stage 3 should file it that way. The `degrades-precision` value
does not fit (nothing about comparability changed); `obscures` fits the first five releases and stops fitting on
3 December, which is itself awkward for the vocabulary and worth an `assessmentNote`.

### 3.2 The size of the excluded subset, computed from the issuer's own tables

Each release states, for the phase it announces: the number of halqas, the number of panch constituencies, how many
sarpanch and panch seats were **elected unopposed**, and how many seats **polling will take place for**. The residual
is seats with **no candidate at all**. I did that subtraction for the seven phases whose releases I retrieved.

| Phase | Halqas | Sarp. unopposed | Sarp. going to poll | **Sarp. no candidate** | Panch consts. | Panch unopposed | Panch going to poll | **Panch no candidate** |
|---|---|---|---|---|---|---|---|---|
| 2 | 468 | 90 | 281 | **97** | 3,610 | 1,069 | 1,286 | **1,255** |
| 3 | 505 | 96 | 358 | **51** | 3,933 | 1,437 | 1,652 | **844** |
| 4 | 531 | 99 | 339 | **93** | 4,140 | 969 | 1,749 | **1,422** |
| 5 | 541 | 118 | 309 | **114** | 4,297 | 1,046 | 1,534 | **1,717** |
| 6 | 590 | 111 | 406 | **73** | 4,546 | 1,052 | 2,312 | **1,182** |
| 7 | 545 | 85 | 341 | **119** | 4,345 | 912 | 1,798 | **1,635** |
| 9 | 236 | 68 | 55 | **113** | 1,904 | 433 | 138 | **1,333** |
| **Total (7 of 9 phases)** | **3,416** | **667** | **2,089** | **660** | **26,775** | **6,918** | **10,469** | **9,388** |

**Arithmetic, shown.** Halqas 468+505+531+541+590+545+236 = 3,416. Sarpanch unopposed 90+96+99+118+111+85+68 = 667.
Sarpanch polled 281+358+339+309+406+341+55 = 2,089. 3,416 − 667 − 2,089 = **660** halqas with no candidate.
Panch constituencies 3,610+3,933+4,140+4,297+4,546+4,345+1,904 = 26,775. Panch unopposed
1,069+1,437+969+1,046+1,052+912+433 = 6,918. Panch polled 1,286+1,652+1,749+1,534+2,312+1,798+138 = 10,469.
26,775 − 6,918 − 10,469 = **9,388** panch constituencies with no candidate.

**Coverage of this table.** 3,416 of 4,490 halqas = **76.1%**; 26,775 of 35,096 panch constituencies = **76.3%**.
Missing: phases 1 and 8, whose releases (16 November and 7 December 2018) are indexed on D11 but not captured.

**The result.** Over these seven phases, of **30,191** seats (3,416 sarpanch + 26,775 panch):

- **12,558 seats (41.6%) went to a poll** — 2,089 sarpanch + 10,469 panch. **This is the turnout denominator.**
- **7,585 seats (25.1%) were filled unopposed** — no poll, no turnout, but a representative.
- **10,048 seats (33.3%) had no candidate at all** — 660 sarpanch + 9,388 panch. Empty from the start.

**So the "74% turnout" describes the electorate attached to about two seats in five.** And the disaggregation matters:
for **sarpanch** seats 2,089 of 3,416 = **61.2%** were polled, but for **panch** seats only 10,469 of 26,775 = **39.1%**.
The headline figure is dominated by the sarpanch electorate in the phases where the divisional split is widest.

**A cleaner demonstration from a single phase, entirely inside one document.** D5, phase 5: the phase covered
**541 halqas and 4,297 panch constituencies**, and the release states "An electorate of **404283** will be voting for
sarpanch constituencies while it is **270295** for panch constituencies". Those electorates attach to the
**309 sarpanch and 1,534 panch seats** going to poll — 57.1% of that phase's halqas and 35.7% of its panch
constituencies. The remaining seats have electors too, and they are simply not in the fraction.

**Caveats I will not omit.** (a) These are counts published at the nomination stage, before each poll; re-polls,
rescissions and court-ordered changes moved some — every release mentions them. (b) Two phases are missing. (c) A
"halqa with no candidate" here means no sarpanch candidate; a halqa could have panch candidates and no sarpanch or the
reverse, and the two columns are not nested. (d) The final overall **74%** figure itself I did **not** retrieve from
any official document; it comes from R1, attributed there to "data released by the chief electoral officer". The
percentages I did retrieve are per-phase and cumulative-to-six; **74% for all nine phases is RELAYED and must be
carried as T4 even if the rest of this section is T1.**

### 3.3 The valley disaggregation — and where my documents and R1 disagree

R1 (Scroll, 16 December 2018, T4) gives for the Kashmir valley: **2,135 halqas**, of which **708 had no candidate** and
**699 had a single candidate who won unopposed**, so **1,407 halqas saw no contest**; and **17,059 panch wards**, of
which only **1,656 saw a contest**, **4,537** were unopposed, and "nearly 64%" had no candidate. It also states "only
30% of the panchayat halqas in Kashmir saw polling", and that of South Kashmir's **5,847 panch wards only 95 saw any
polling**, with **Shopian and Pulwama seeing no polling at all**.

**Arithmetic check on R1, mine.** 708 + 699 = 1,407 ✓ consistent with its own text. 2,135 − 1,407 = 728 contested,
which is **34.1%**, not the 30% the article states — a 4-point internal discrepancy I cannot resolve. On panch:
17,059 − 1,656 − 4,537 = 10,866 with no candidate = **63.7%**, which does match "nearly 64%" ✓.

**Where it disagrees with D1.** D1's draft-roll table gives the ten valley districts **2,176 halqas** and **17,348
panch constituencies**. R1 gives **2,135** and **17,059**. Differences of **41 halqas** and **289 panch
constituencies**. Both are the same authority's data at different moments — D1 is the draft roll of August 2018, R1 is
"electoral data" in December — so a draft-to-final movement is the obvious explanation, and **it is not stated
anywhere I retrieved.**

**And a third figure for the same object.** R2 (The Wire, September 2019, quoting CEO Shailendra Kumar) gives the ten
Kashmir districts **19,582** total panch and sarpanch seats. D1 gives 2,176 + 17,348 = **19,524**. R1 gives 2,135 +
17,059 = **19,194**. **Three counts of the valley's panchayat seats: 19,194, 19,524, 19,582.** One of these is a
first-class finding on its own; three is a statement about the instrument.

**One thing does reconcile exactly, and it is worth noting because it validates R2's basis.** R2 gives Ladakh
**1,630** total seats. D1 gives Leh 95 halqas + 687 panch and Kargil 98 + 750 = **193 + 1,437 = 1,630 ✓ exact.** So
R2's totals are halqas-plus-panch on the draft-roll basis, which tells us its **19,582** for Kashmir is not a different
kind of object — it is the same kind of object with a different value.

**R2's Jammu figures do not reconcile internally.** It gives Jammu 18,182 total, 18,089 filled, 103 vacant.
18,089 + 103 = **18,192 ≠ 18,182** — off by 10. (D1's Jammu total is 2,121 + 16,311 = **18,432**, a fourth number.)
**Do not carry R2's Jammu row without recording that it does not add up.**

---

## 4. VACANCY — the load-bearing quantity, and what causes it

### 4.1 What the 2018 election left empty, on the official post-2019 basis

From D9 (retrieved): **22,214 panches and 3,459 sarpanches elected**, out of **33,592 panch and 4,290 sarpanch
constituencies in the UT**.

- Sarpanch seats unfilled at the election: 4,290 − 3,459 = **831** (19.4%).
- Panch seats unfilled at the election: 33,592 − 22,214 = **11,378** (33.9%).
- Total unfilled at the election: **12,209 of 37,882 = 32.2%.**

**Cross-check against §3.2.** My phase-table residual over 76% of the pre-break state was 10,048 seats with no
candidate. Scaling naively to 100% would give ~13,200 on the 39,586-seat basis; the official 12,209 is on the smaller
37,882-seat UT basis and excludes Ladakh, where almost nothing was empty. The two are the same order and I do not
claim more than that — **the phase counts are nomination-stage and the official figure is post-result, and they are not
the same object.**

### 4.2 The vacancy figure moves three times, and the movement is the finding

| Date | Source | Vacant sarpanch | Vacant panch | Total |
|---|---|---|---|---|
| Dec 2018, at the election | D9 (derived) | 831 | 11,378 | **12,209** |
| Feb 2020, by-poll notification | `[SUBAGENT-ULB]`, CEO Shailendra Kumar via The Tribune, T4 | 1,011 | 11,639 | **12,650** |
| Nov 2020, D9 statistics table | **D9, retrieved** | 1,088 | 12,153 | **13,241** |

**Arithmetic on D9's table, mine.** Vacant halqas where election being held: Kashmir 32+149+50+42+9+157+152+75+132+137
= **935**; Jammu 23+18+13+17+10+22+6+17+16+11 = **153**; total **1,088** ✓ matches the printed Grand Total. Vacant panch
constituencies: Kashmir 782+2165+668+689+156+1948+1440+745+1222+1999 = **11,814** ✓; Jammu
90+26+37+17+17+26+22+34+36+34 = **339** ✓; total **12,153** ✓. Both divisional and grand totals as printed.

**The accretion.** 13,241 − 12,209 = **1,032 seats fell vacant between December 2018 and November 2020**, after the
election. D9 names the causes and quantifies exactly one of them:

> "Further, vacancies have accrued on account of **death, resignation, etc** of the elected Sarpanches and Panches.
> Also, as a result of elections of Chairpersons of BDCs in October, 2019 **another 307 seats** of Panches/Sarpanches
> fell vacant."

**1,032 − 307 = 725 seats vacated by death, resignation and "etc", unquantified by cause, in the issuing authority's
own document.** Split by the intermediate point: 12,650 − 12,209 = 441 by February 2020, of which 307 is the BDC
effect, leaving **134** from death/resignation/other in the first fourteen months; then 13,241 − 12,650 = **591** more
between February and November 2020.

**Assumptions in that arithmetic, stated.** (a) The Feb-2020 and Nov-2020 figures are counts of seats *for which
by-elections were being held*, which may be narrower than all vacant seats — D9 says "vacant Panchayat Halqas **where
Election are being held**". (b) No seat was filled and re-vacated. (c) The three counts share the 4,290/33,592 basis;
the Feb-2020 source explicitly cites the same 33,592 and 4,290, which supports (c). (d) The Nov-2020 figure uses the
table's 1,088/12,153, not the text. **If any of (a)–(c) fails the 725 changes; the structure of the finding does not.**

### 4.3 Cause of vacancy: named, never counted

**This is the answer to the scope note's question and it is precise.** The categories exist in the issuing authority's
own prose — "death, resignation, etc", plus BDC chairperson elections — and **only the BDC category is given a number.**
No published series I retrieved, and none the subagent retrieved, disaggregates vacancy by cause. D10, the SEC's own
homepage listing its document classes, has exactly one vacancy-related item: "Press Note - District Development
Councils and **Panchayat (Vacant Seats)** Elections 2020". A bare category.

**The one cause-disaggregated official statement anywhere in the record is spoken, approximate, and not a series.**
R2, quoting CEO Shailendra Kumar's press conference of 29 September 2019: "Around five people have resigned on security
reasons. And there have been deaths of around 33 representatives due to natural causes, except for one in Kashmir."
Note the shape — "around five", "around 33", "except for one" — and note that the natural/not-natural distinction is
drawn as an aside. **That is the entire official cause-disaggregation of J&K panchayat vacancy that I can find.**

**The counting gap is visible in the numbers.** Against the CEO's "around five" resignations, `[SUBAGENT-ULB]` reports
— **RELAYED, not retrieved even by the subagent, and I flag it as the weakest material in this part** — press accounts
of a resignation wave announced through paid newspaper advertisements, with figures of "nearly 800" and "about 900"
panchayat leaders resigning, and officials of the Panchayati Raj Department saying that of ~900 who stepped down only
**50 had resigned officially**. Neither the subagent nor I could date-separate the 2011–12 cohort's resignation wave
from the 2018–20 one. **Three numbers for one phenomenon — ~5, 50, ~900 — and the spread is not error, it is the
definition: a resignation counts only when formally accepted.** Stage 3 may use the *structure* of this; it must not
use the 800/900 figures, which nobody in this phase retrieved.

**PHASE-11 BOUNDARY, observed.** Killings of panchayat members are a phase-11 casualty quantity. I have authored no
casualty count and no incident count. What I have done is establish that **death is a named but unquantified cause of a
phase-12 vacancy series**, which is a statement about the vacancy instrument, not about casualties. Two items sit on
the boundary and I name them rather than author them:

1. **MHA Annual Report 2021-22 (D16, T1, retrieved), para 14.21:** "Elected Sarpanch/ Panch/ BDC Chairperson **who die
   due to a militancy incident are covered for an amount of ₹25.00 lakh**." This establishes that the Union home
   ministry operates a compensation scheme keyed to exactly that event. **A compensation scheme implies a determination
   per case, and therefore a count exists somewhere.** MHA publishes no such count in any of the three Annual Reports I
   read. **Proposed amendment to a phase-11 record, for stage 3 to decide:** if phase 11 carries a record on ex-gratia
   or on casualty counting, this scheme is a named, dated, T1-evidenced instrument that produces a countable quantity
   MHA does not publish. I do not author it.
2. **L-0123 cross-reference.** L-0123 records a `withheld` instance on 28–29 October 2025 — a question on delay in
   ex-gratia under SRO-43 to families of victims of violence, deleted by the Speaker. The ₹25 lakh PRI cover in D16 is
   a **different** scheme and I do not merge them. But the two sit on the same subject and the same refused route.
   **No amendment to L-0123 is required by anything in this part.** The DDC-versus-assembly material in §2.7 is a
   structural echo worth a cross-reference and nothing more.

---

## 5. FUNCTIONS, FUNDS, FUNCTIONARIES

**Retrieval status of this section is weaker than the rest and I say so up front.** The `[SUBAGENT-FUNDS]` thread was
still running when I closed this file; **whatever it returns is not in here and stage 3 must read its output alongside
this section.** `panchayatiraj.gov.in`, `fincomindia.nic.in` and `cag.gov.in` were all unreachable from this
environment, so the Ministry of Panchayati Raj's Devolution Index, the Fifteenth Finance Commission report and any CAG
local-bodies audit were not retrieved by me at all.

### 5.1 The only published devolution measure I could retrieve — and it appears once

**MHA Annual Report 2021-22 (D16), T1, retrieved directly, paragraphs 14.21 and 14.22:**

> **"14.21 A total of 27 functions have been transferred to PRIs, and approximately ₹1727.00 crore devolved to them.**
> Elected representatives of PRIs have been given honorarium and formal position in the Warrant of Precedence. Elected
> Sarpanch/ Panch/ BDC Chairperson who die due to a militancy incident are covered for an amount of ₹25.00 lakh. To
> strengthen the Panchayats, a regular system of interaction of district officers with Panchayat representatives has
> been institutionalized."

and, for the urban tier, in the bulleted list under 14.22:

> "Devolution of Functions, Functionaries and Funds to the ULBs as per the **Mandate of the 74th CAA — 17 of the 18
> functions listed in the Twelfth Schedule devolved with funds and functionaries.**"
> "Delegation of powers of AA to 76 ULBs up to ₹5 crore."
> "Powers to enter into contracts increased to ₹20.00 crore in case of Corporations and ₹2 crore in case of other ULBs."
> "13 Municipal Committees have been upgraded as Municipal Councils."
> "₹25 lakh ex-gratia cover to the family members of elected members. **₹2300 crore devolved to Urban Local Bodies in
> the last two years.** About 3160 works completed and 3200 are ongoing; all photographed, geo-tagged and available
> online."

**Four findings sit inside those two paragraphs.**

**(a) The asymmetry between the two tiers, in one document, one page apart.** For the **urban** tier MHA states the
denominator: "**17 of the 18** functions listed in the **Twelfth Schedule**". For the **rural** tier it states
"**a total of 27 functions**" — **no denominator, no schedule named.** The Eleventh Schedule has 29 subjects. Whether
27 means 27 of 29 is **not stated**, and I will not assume it. The instrument doing the transferring is not named for
either tier: no government order, no S.O. number, no date. **A devolution measure whose numerator is given and whose
denominator is withheld is a worse object than no measure at all, and it is the rural tier that gets the worse
treatment.**

**(b) The figures have no stated basis.** ₹1,727.00 crore "devolved" — over what period? Cumulative since 2019? A
single year? The ULB figure carries "in the last two years"; the PRI figure carries nothing. Devolved *by whom* — the
Union, the UT, a Finance Commission grant? Not stated.

**(c) TRAP 2 APPLIES AND I APPLY IT: who produces this?** MHA does not administer panchayats. Local government is a
State/UT subject; the Union nodal ministry is the Ministry of Panchayati Raj, and for a Union Territory the figures are
produced by the UT administration — here the Rural Development & Panchayati Raj Department, J&K, which is the same
department that issued the reservation notifications (D1) and the S.O.s calling the elections (D9). **MHA presents this
figure as its own and the Annual Report carries no source attribution on the paragraph.** I checked: there is no
"(Source: UT of J&K)" or equivalent on 14.21 or 14.22, unlike the practice phase 11 found on the security tables.
**So the two-sidedness of format does not survive the one-sidedness of production: this is a J&K administration figure
presented in a Union ministry's report with no producer named, and the Union ministry cannot be treated as an
independent check on the UT that produced it.** I state this as a structural inference from the constitutional
allocation, not as something the document says, and I could not close it because the Ministry of Panchayati Raj's own
site is unreachable from here.

**(d) THE MEASURE WAS PUBLISHED ONCE AND DISCONTINUED.** I grepped all three Annual Reports I downloaded. The string
"EMPOWERING PANCHAYATI RAJ" appears **once in AR 2021-22, zero times in AR 2023-24, zero times in AR 2024-25.** So do
"27 functions", "1727" and "2300 crore". The J&K chapter of AR 2024-25 (D18) has a "Rural Development & Panchayati Raj
Department" paragraph (15.67) which lists housing and employment scheme outputs and **says nothing about devolution,
functions, or funds transferred to the tier.** **The only published J&K panchayat devolution measure in the MHA series
appears in one report year and stops.** That is a clean, dated reporting discontinuation on a T1 series and it is a
first-class finding.

### 5.2 Funds at the unit level — one figure, relayed

R3 (The Wire, 10 January 2024, T4): the government allocated "**₹23 lakh for each Panchayat, ₹25 [lakh] for BDC and
₹75 lakh for DDC**" but "**only 18-22% funds have been utilised**". **RELAYED; no source given in the article; I did
not retrieve any document behind it.** If true it is the sharpest funds-and-functions finding available — a tier with
an allocation and a fifth of it spent — and it is exactly the kind of figure that ought to exist as a published series
and does not. **Stage 3 must not carry the 18–22% as anything but T4 with an explicit "source not identified in the
reporting" flag.**

### 5.3 State Finance Commission — NOT ESTABLISHED

I could not establish whether J&K has constituted a State Finance Commission under Article 243-I, whether any such
commission reported, or whether any report was tabled. `fincomindia.nic.in` and `panchayatiraj.gov.in` are unreachable
from here and I found no retrievable document either way. **This is a retrieval failure of this session, not an
absence, and it must not be written up as one until `[SUBAGENT-FUNDS]`'s output is read.** What §2.1 does establish is
adjacent and suggestive: MHA's own 2024 statement that the local-bodies laws still needed amendment to be consistent
with the Constitution, and that the SEC removal procedure was supplied only in 2024, is evidence that the Part IX/IXA
institutional machinery was implemented late and piecemeal. It is not evidence about the SFC specifically.

### 5.4 Functionaries — nothing retrieved

No sanctioned-versus-filled figure for Panchayat Secretaries or Village Level Workers was retrieved. MHA AR 2021-22
mentions Panchayat Ghar construction for Ladakh (193 panchayats) and AR 2024-25 mentions Panchayat Ghar construction
generically. **Not established.**

---

## 6. ABSENCES — classified strictly, in the schema's order

I read the live enum text in `schemas/series.schema.json` and `schemas/ledger.schema.json` before classifying. The test
is **whether the data exists**, asked in order.

**A1 — Cause-of-vacancy breakdown for panchayat and sarpanch seats (death / resignation / disqualification / no
candidate / indirect election to BDC).**
→ **`not-published`, and after retrieving the Act this is the best-evidenced absence in the part.** Not
`not-collected`, and now not merely because the records probably exist: **section 8(1) of the J&K Panchayati Raj Act
1989 (D20, retrieved) makes cause-of-vacancy a statutory element** — "Whenever a vacancy occurs by the **death or
resignation** of Panch or Sarpanch, the vacancy shall be filled by election or nomination as the case may be: Provided
that the vacancy is for a period of more than six months." The holder cannot act on a vacancy without determining
which limb of section 8 it falls under and how long it has run. So **the information is not merely producible under
compulsion, it is statutorily required to exist** before the by-election that D9 describes can be called. D9 also
shows the RDD annexing halqa-wise and constituency-wise lists of vacant seats to S.O. 304 of 1 October 2020. Not
`withheld`: **I have no named requester, no specific request and no refusal.** The 725-seat residual derived in §4.2
is the size of what is unpublished.
**Route:** an RTI to the Rural Development & Panchayati Raj Department, J&K, for the cause recorded against each
vacancy notified in the annexures to S.O. 304 of 1 October 2020 and S.O. 53 of 10 February 2020. This is a real route
to a real, named document, not a placeholder.

**A2 — Consolidated results of the 2018 panchayat election, the 2018 municipal election and the 2020 DDC election.**
→ **NOT AN ABSENCE. Do not author one.** These were published; the SEC's own index pages that link to them survive in
the archive (§0.4). What is true is that the files are not reachable from this environment and are not in the archive.
That is a **provenance** fact about the instrument's durability, not a fact about a holder. Stage 3 should consider a
provenance record — an official election-result series whose index survives and whose values do not, on a host that is
unreachable — and should **not** file it against any of the four absence values.

**A3 — Turnout computed on the full panchayat electorate for the 2018 election.**
→ **`not-published`.** The election authority published turnout only on the contested-constituencies denominator
(§3.1). But the components of the other denominator are in its own documents: elector counts per phase, seats going to
poll, seats unopposed, seats with no candidate. A turnout over all seats is **constructible from published data** and
merely was not constructed or released. The holder could produce it. **Not `never-defined`** — the quantity is
perfectly definable, and note the trap: it is tempting to file the two-denominators problem as `never-defined` because
it is a definitional dispute. It is not. Both denominators are well defined; one was published and one was not.
**Route:** the underlying per-phase elector counts by constituency, held by the CEO J&K / SEC — request the phase-wise
turnout report `Panchy_18_PhasewiseRes.html` and the final consolidated result from the State Election Commission, J&K.

**A4 — A published measure of funds actually transferred to and spent by the J&K panchayat tier.**
→ **`not-published`**, provisionally, and stage 3 must re-test this against `[SUBAGENT-FUNDS]`. A one-off figure exists
(₹1,727.00 crore, MHA AR 2021-22) and stopped being published; treasury and PRIAsoft/eGramSwaraj records would exist
under compulsion. **Not `not-collected`** — money that moved was accounted for. The absence is of a *series*, not of
the underlying records.
**Route:** the Rural Development & Panchayati Raj Department, J&K, and the Finance Department, J&K, for year-wise
releases to and expenditure by halqa panchayats, BDCs and DDCs, 2019-20 onward; and the Ministry of Panchayati Raj for
J&K's entries in whatever devolution reporting it maintains.

**A5 — The denominator of MHA's "27 functions transferred to PRIs".**
→ **`not-published`.** The number exists; the base it is a number *of* is not stated (§5.1a). Whoever produced 27 knew
what they were counting. **Not `never-defined`**: the Eleventh Schedule's 29 subjects are a defined list.
**Route:** MHA, or the Rural Development & Panchayati Raj Department J&K, for the government order(s) transferring
functions to PRIs, with the list of functions transferred.

**A6 — Reason for the deferral of the panchayat by-elections notified in February 2020.**
→ **`not-published`.** D9 says only that by-elections "were earlier notified in the month of February, 2020 **but had
to be deferred due to unavoidable circumstances**." A decision to defer a notified election is a recorded
administrative act with a file behind it. **Not `withheld`** — no named requester, no refusal.
**Route:** the file noting behind the deferral of the by-elections notified under S.O. 53 of 10 February 2020, held by
the Election Authority / SEC and the RDD.

**A7 — Reconciliation of the 4,490/35,096 (2018, state incl. Ladakh) and 4,290/33,592 (2020, UT) counts.**
→ **`not-published`.** The residual of 6–7 halqas and 67 panch constituencies beyond Ladakh's departure (§1) has a
cause — halqa creation, merger, bifurcation — and each such change is made by a gazette notification. D10 itself lists
a "Public Notice dated 30.01.2020 - **Bifurcation of Panchayat Ganote**", which is precisely the kind of instrument
that generates the residual. So the records exist, one per change, and no reconciliation is published.
**Route:** the Rural Development & Panchayati Raj Department, J&K, for the gazette notifications creating, merging or
bifurcating panchayat halqas and panch constituencies between 16 September 2018 and 4 November 2020.

**A8 — Whether the panchayat/ULB/DDC term-expiry has been challenged in court.**
→ **NOT AN ABSENCE.** `[SUBAGENT-ULB]` searched hard and found no J&K High Court or Supreme Court proceeding, while
finding such proceedings for Maharashtra, Rajasthan, Telangana, Jharkhand, Himachal, Manipur, Punjab & Haryana and
Karnataka. **Absence of evidence in a search is not an absence in the world**, `indiankanoon.org` was never retrieved,
and J&K High Court listings are poorly indexed. **Record as "not found", never as "no case exists".** The asymmetry —
the longest local-body vacancy of the set and apparently the only one without litigation — is a real observation and
stage 3 may note it as such, with the caveat attached, but must not build an absence record on it.

**A9 — The S.O. number of the order creating the DDCs, and the notification ending their term.**
→ **NOT AN ABSENCE.** Both are gazette instruments; they exist and are public. This is a **retrieval failure of this
session** (§0.5). Do not classify.

**Nothing in this part warrants `withheld`.** I tested every candidate against the three-part rule — named requester,
specific request, date — and none of them has all three. The nearest miss is A3: Chief Minister Omar Abdullah gave a
written reply on local body elections in the assembly on 9 February 2026 to a named MLA (Tariq Hameed Karra), which
supplies a requester and a date — but the request was about *when elections will be held*, not about the turnout
denominator or any withheld figure, and the reply was **given**, not refused. **That is an answered question, not a
refusal, and treating it as `withheld` would repeat exactly the error phase 11 demoted and phase 10 demoted twice.**

**Nothing warrants `not-collected` either.** Every quantity above is one the administration necessarily generated in
the course of running the elections.

---

## 7. BOTH CASES, EACH AT ITS STRONGEST

### FOR

For seventy years Jammu and Kashmir had no constitutionally grounded third tier, because Parts IX and IXA of the
Constitution — the 73rd and 74th Amendments — did not apply to it. Its panchayats ran on a state statute of 1989 whose
elections were conducted not by an independent State Election Commission but by the state's own Chief Electoral Officer
acting as an "Election Authority", and even that machinery was used so intermittently that the panchayats elected in
2011 were the first in a decade and their successors were not elected until 2018. The urban tier was worse: elected in
2005, lapsed in 2010, and left vacant for eight years.

Since 2019 that has been rebuilt from the ground up. Elections have been held at all three rural tiers and at the
urban tier. A **District Development Council** now exists in every one of the twenty districts — a directly elected
district government with 14 constituencies each, 280 seats in all, with statutory reservation for Scheduled Castes,
Scheduled Tribes and **women** under section 45-A. **Most Indian states do not have a directly elected district tier at
all**; J&K's DDC is a genuine institutional advance over the district planning boards it replaced, and it was created
in a single year — amendment on 16–17 October 2020, delimitation notified 26 October, reservation notified 3 November,
polls from 28 November, results 22 December. Turnout in those polls was substantial, and substantially better than the
2018 panchayat polls in the valley: around 51% overall, with Srinagar district recording about 35% against 14.5% in the
panchayat poll and 7.9% in the 2019 parliamentary poll.

The tier is not empty. The Union home ministry's Annual Report for 2021-22 records **27 functions transferred to the
Panchayati Raj Institutions and approximately ₹1,727 crore devolved to them**, elected representatives given honorarium
and a place in the Warrant of Precedence, and a ₹25 lakh cover for any sarpanch, panch or BDC chairperson killed in a
militancy incident. For the urban tier it records **17 of the 18 functions in the Twelfth Schedule devolved with funds
and functionaries**, ₹2,300 crore devolved over two years, and 3,160 works completed with 3,200 ongoing, geo-tagged and
published. Parliament has since legislated OBC reservation into all three J&K local-bodies statutes and supplied a
statutory removal procedure for the State Election Commissioner. The present interval without elected local bodies is
an interval, being worked through: the OBC Commission reported in February 2025, delimitation is complete for 72 of 77
urban bodies, the panchayat electoral roll has been revised, and a new State Election Commissioner took office in
February 2026.

### AGAINST

The 2018 panchayat election's headline turnout describes a minority of the seats. The election authority said so
itself, from 3 December 2018 onward, in words it had not used in its first five press releases: the figure is computed
"**in respect of the Sarpanch and Panch constituencies that have seen contests**". From its own phase tables, over the
seven phases whose releases survive — 76% of the state — **41.6% of seats went to a poll, 25.1% were filled unopposed,
and 33.3% had no candidate at all.** In the Kashmir valley the position was worse still: of 2,135 halqas, 708 had no
candidate and 699 had exactly one; Shopian and Pulwama saw no polling whatever. A number computed over two seats in
five, presented without its denominator for five of nine phases, is not a measure of participation; it is a measure of
the places that participated.

The tier those elections created was never full. On the administration's own figures, 12,209 of 37,882 seats — nearly a
third — were empty on the day the results were declared, and by November 2020 the figure had risen to 13,241. The
administration's own press note names the causes of the increase as "death, resignation, etc" and quantifies exactly
one of them; **725 seats emptied by death and resignation and something else, and no published series says which.** The
one official disaggregation that exists anywhere is a spoken remark at a 2019 press conference — "around five" have
resigned, "around 33" have died — set against departmental accounts of hundreds of resignations announced in newspaper
advertisements of which fifty were formally accepted. A vacancy series that cannot distinguish a seat nobody stood for
from a seat whose holder was killed is not a vacancy series.

And the tier has now stopped existing. Panchayats and Block Development Councils expired **9 January 2024**; the
municipal corporations and councils in **October–November 2023**; the District Development Councils on **24 February
2026**. **Not one successor election has been held.** Article 243E and Article 243U require elections to be completed
*before* the expiry of a body's duration; J&K's response was to let each tier lapse and install officials — Block
Development Officers over the panchayats "for six months or till further orders", Commissioners over the corporations
under a removal-of-difficulties clause. When the DDCs' term-start proved ambiguous the executive asked its own law
department which of two dates to use and chose the later one. The stated reasons have rotated for two and a half years:
delimitation, then OBC reservation, then a commission whose report has sat unapproved for a year, then a vacant State
Election Commissioner's post, then a fresh revision of the rolls. The tier holds no measure of itself either: the only
published devolution figure appeared in a single annual report and has not been repeated, its rural half was given
without a denominator while its urban half was given with one, and the one unit-level funds figure in the record says
allocations of ₹23 lakh per panchayat and ₹75 lakh per DDC of which 18–22% was spent. A third tier that exists on paper,
holds no funds it can show, publishes no measure of its own devolution, and has now had every one of its elected terms
lapse without an election, is a tier that was elected once.

### DIFFERENT FACTS, OR DIFFERENT WEIGHTINGS?

**Different weightings of the same facts. `differentFacts` is FALSE, and I answer that explicitly having read the
criterion text in `schemas/ledger.schema.json` first.**

The criterion has three parts, of which **(c) is operative**: it is satisfied only where **no single measure exists or
could be constructed from available data** that places both sides' facts on one ledger, and an **unbuilt** comparison
**fails** (c) — a gap in the instrument is not a property of the argument.

Test it. The two sides here do not cite different quantities; they cite **the same tables and divide them differently**.
The FOR case's turnout figure and the AGAINST case's excluded-seats figure come out of the *same* seven press releases,
and I built the common measure in §3.2 in about a dozen subtractions. Seats going to poll, seats unopposed, seats with
no candidate, and the electorate attached to each: that is one ledger, it is constructible from published data, and
constructing it is what §3.2 is. Likewise on vacancy — both sides accept 22,214 panches and 3,459 sarpanches elected of
33,592 and 4,290; they differ on whether one calls that an election held or a third of a tier left empty. Likewise on
the DDC — nobody disputes that 280 seats were filled in December 2020 or that the term expired on 24 February 2026.

Precondition (b) also fails, which is the cleaner test. Granting the FOR case's strongest fact in full — a directly
elected district tier with women's and ST reservation, more than most states have — does **not** leave the AGAINST case
intact: the AGAINST case's core claim is that this tier's term has expired with no election held, and that claim is
about the same tier and directly contradicts the implication that it is functioning. These are not parallel facts;
they are successive states of one object.

**The one place a category boundary is genuinely crossed, and where I would still not set the flag.** The devolution
argument — "27 functions transferred and ₹1,727 crore devolved" against "no published measure of devolution" — pits a
quantity against a stated absence, which is the shape (c) admits. But it fails (c) for a different reason: the
comparison is **unbuilt, not unbuildable**. A funds-released-and-spent series for the J&K panchayat tier is exactly the
kind of thing the Fifteenth Finance Commission's local-body grant conditionality contemplates, and treasury records
exist. That is a gap in the instrument, which the criterion text names as a fail.

**`differentFactsNote`, for stage 3, drafted:** *Both sides accept the election authority's own seat counts and the
administration's own vacancy figures. What they divide over is the denominator — whether turnout is read over the seats
that saw a contest or over all seats — and that division is performed on one set of published tables, not on two sets
of facts. A common ledger exists and is built in this part: seats polled, seats unopposed, seats with no candidate, and
the electorate attached to each. The temptation to mark this true comes from the definitional sharpness of the turnout
dispute, and a definitional dispute over a shared measure is the paradigm case of a weighting record, not a
different-facts one.*

---

## 8. WHAT I COULD NOT ESTABLISH — stated plainly

1. **The constitutional mechanism** by which Parts IX and IXA did not apply before 2019, and the instrument extending
   them. No primary text retrieved. C.O. 272, C.O. 1954 and the Reorganisation Act are all unretrieved.
2. **The S.O. number of the October 2020 order creating the DDCs.** Identified by name and date only, on press
   authority.
3. **The DDC 2020 result and turnout.** The SEC's own result file and all eight CEO phase-turnout reports are
   uncaptured; I retrieved only the index. The ~51% figure is search-summary level and I did not fetch the articles
   behind it. **Do not carry a DDC turnout on my authority.**
4. **The final overall 2018 panchayat turnout (74%).** Retrieved only from R1, attributed there to CEO data I did not
   see. The per-phase and cumulative-to-six figures in §3.1 are retrieved from official releases; the 74% is not.
5. **Phases 1 and 8 of the 2018 press-release series.** Indexed on D11, not captured. §3.2 therefore covers 76% of the
   state, not all of it.
6. **The J&K State Finance Commission** — whether constituted, whether it reported, whether tabled. Not established
   either way. Retrieval failure, not absence. Read `[SUBAGENT-FUNDS]`.
7. **Whether "27 functions" means 27 of the Eleventh Schedule's 29.** Not stated in the source.
8. **Who produced the ₹1,727 crore and 27-functions figures.** Structurally it must be the J&K administration; the
   Annual Report attributes nothing. The Ministry of Panchayati Raj was unreachable, so I could not close the loop.
9. **Any Devolution Index / Panchayat Devolution Index ranking for J&K**, and who produces it. Not retrieved.
10. **Any CAG audit of J&K local bodies.** `cag.gov.in` unreachable.
11. **The residual of 6–7 halqas and 67 panch constituencies** across the 31 October 2019 break. Its cause is not
    stated in either document.
12. **Which of 19,194 / 19,524 / 19,582** is the right count of valley panchayat seats, and on what basis each was
    computed.
13. **Whether J&K has ever been litigated over local-body term expiry.** Searched, not found, not established as
    absent.
14. **The panchayat count 4,290/4,291 versus 4,892**, and the block count 285 versus 316. The Wire's January 2024
    figures (4,892 panchayats, 316 BDCs) sit against the November 2020 official figures (4,290/4,291 halqas, 285
    blocks) and I could not establish whether a re-delimitation occurred between them or whether one figure is wrong.
    `[SUBAGENT-ULB]` judges 4,892 an outlier; **I do not adopt that judgement, because a rise from 4,291 to 4,892 is
    exactly what a re-delimitation would look like and nobody retrieved a document either way.**
15. **The 2018 municipal election's own denominator**, and any J&K-wide count of urban wards with no candidate.
16. **Sections 27, 36, 45 and 45-A of the J&K Panchayati Raj Act 1989 as bare text.** I retrieved the Act (D20) and
    read only its first seven printed pages — enough for §9, not enough for the BDC, the Election Authority's powers,
    or the District Planning and Development Board. The PDF has 158 pages, no text layer, and must be read as images.
    **This is the cheapest outstanding retrieval in the part**: the file is already on disk at
    `/private/tmp/claude-501/-Users-anoop-Documents/722f64f7-8201-43a3-be94-293bbdf84e0b/scratchpad/sec/PR_Act_1989.pdf`
    for the life of this session, and re-fetchable from the archive capture recorded at D20. Note also that the copy
    filed under `Panchyat_2011_Result_Main` is a **pre-2020 print** — its long title names the District Planning and
    Development Boards and not the District Development Councils, so **it cannot answer the section 45/45-A questions
    at all** and a post-October-2020 print is needed for those.

---

## 9. THE STATUTE ITSELF — retrieved late, and it changes several things above

**D20, retrieved: the bare text of the Jammu and Kashmir Panchayati Raj Act, 1989, Act No. IX of 1989, dated
[11th July, 1989]**, from an Internet Archive capture of the SEC's own copy. I read the first seven printed pages —
the long title, Chapter I (sections 1–3) and Chapter II sections 4 to 9. Everything in this section is **primary
statutory text that I read**, and it should be graded on whatever tier stage 3 settles for the archive route (§0.2).
The copy is filed under `Panchyat_2011_Result_Main` and is a **pre-2020 print** — see the caution at the end.

### 9.1 The long title: there was no third elected tier, and the DDC replaced a Board

> "An act to provide for the Constitution of Halqa Panchayats, **Block Development Councils and the District Planning
> and Development Boards** and matters connected therewith."

Section 2(1)(g) defines "District Planning and Development Board", and 2(1)(e) makes its Chairman one of the three
"Chairman" offices under the Act. So the pre-2020 district body was a **Board**, not an elected council. This
independently confirms, from the statute, what `[SUBAGENT-ULB]` reported on press authority — that the DDCs **replaced
the District Planning and Development Boards** — and it supports the FOR case's strongest claim in §7 on primary
evidence: the district tier that existed before October 2020 was appointed, not elected.

### 9.2 The Act was enacted in 1989 and not brought into force until 1997

Section 1(3), with its footnote:

> "It shall come into force on such date as the Government may, by notification in the Government Gazette, appoint in
> this behalf."
> *footnote 1:* "**Enforced vide SRO 220 dated : 30-6-1997 w.e.f from 1-7-1997**"

**An eight-year gap between enactment and commencement**, on the face of the Act. Add the dates already established:
first elections under it 2001; next 2011 "after a gap of 10 years" (D1); those panchayats' tenure completed July 2016;
next elections November–December 2018; those terms expired 9 January 2024; no election since. **The J&K panchayat tier
has been vacant or unconstituted for a large majority of the Act's life, and the pattern predates 2019 by decades.**
This is the single most important thing the Act adds, because it cuts across both cases in §7: it strengthens the FOR
case's account of the pre-2019 baseline and it undercuts any reading of the post-2024 vacancy as a novelty.

### 9.3 "Election authority" means the Chief Electoral Officer — in the definition clause

Section 2(1)(h):

> "'**Election authority**' means **Chief Electoral Officer of the State**;"

This is the primary-text confirmation of §2.2, which I had established from the press releases' letterhead and from
D1's narrative. It was not an administrative arrangement adopted for 2018; **it is the Act's own definition, from
1989**. There was no State Election Commission in the statute until the 2020 amendment renamed the office, which is
what D9 records ("the Election Authority **to be known as** State Election Commission").

### 9.4 Constitution by notification — and why the DDC term ambiguity arose

Section 4(7):

> "There shall be notified the name of the Sarpanch and the names of the Panches duly elected in accordance with the
> provisions of this Act and rules framed thereunder. **Upon the issue of such notification, the Halqa Panchayat shall
> be deemed to be duly constituted.**"

Section 5:

> "*Term of office.*— The Sarpanch, the Naib-Sarpanch and every panch of the Halqa Panchayat shall hold the office for
> a period of **five years from the date of its constitution**."

Together these fix the panchayat term start unambiguously at the date of the constituting notification, and confirm
from primary text the chain relied on in §2.7: constituted 10 January 2019 → expired 9 January 2024. They also confirm
R5's characterisation of the DDC problem: the Act supplies sections 4(7) and 5 for Halqa Panchayats and — on the
December 2025 reporting — **no equivalent constitution-trigger for the DDC**, which is exactly why the executive had to
ask its own law department whether the DDC clock started at the oath (28 December 2020) or at constitution
(25 February 2021). **A term-start rule that exists for one tier and not for the tier created thirty-one years later is
a definitional gap in the statute, not merely an administrative muddle**, and it was resolved by the executive choosing
the reading that gave its own councils two more months.

### 9.5 Women: NOMINATION up to a cap, not RESERVATION of seats

Section 4(3), with the provisos inserted by Act XXIII of 1997 and Act III of 1999:

> "Every Halqa Panchayat shall consist of such number of Panches **not less than seven and not more than eleven**
> including the Sarpanch, as the prescribed authority may … fix …
> Provided that if the prescribed authority is of the opinion that **women are not adequately represented** in the
> Halqa Panchayat, it **may nominate** such number of women to be members thereof, as it may deem fit.
> Provided further that the number of women members to be **nominated** as such **shall not exceed 33%** of the total
> number of elected Panches.
> Provided also that while making nominations the composition of the Halqa Panchayat with reference to representation
> of Scheduled Caste, Scheduled Tribe and other weaker sections shall be given due consideration."

**Read the direction of that cap.** Article 243D of the Constitution *reserves* not less than one-third of seats for
women. The J&K Act, pre-2019, gave a **discretionary power to nominate** women, and used one-third as a **ceiling on
nominations**, not a floor on seats. Scheduled Castes and Scheduled Tribes get "due consideration" and no number at
all. **This is the sharpest single illustration in the part of what "the 73rd Amendment did not apply" meant in
practice**, and it materially strengthens the FOR case in §7: the reservation for women and STs that the DDC carries
under section 45-A is a real change from this, not a restatement of it. It should be recorded that this is a
**pre-2020 print** and that I have not read the current section 4(3).

### 9.6 The Secretary is a Village Level Worker — the functionaries question, partly answered

Section 4(8), substituted by Act IV of 2000:

> "The **Village Level Worker or Multipurpose worker or Gram-sevika shall be the Secretary of the Halqa Panchayat**."

So the tier's only statutory functionary is a line-department field worker doubling as panchayat secretary. §5.4
recorded that no sanctioned-versus-filled figure was retrieved; that remains true, but the **post** is now identified
from the statute, which makes the missing figure a sharper absence: the quantity that is not published is
"Village Level Workers / Multipurpose workers / Gram-sevikas in position against halqa panchayats", and the holder is
the Rural Development & Panchayati Raj Department.

### 9.7 Vacancy: the Act names the causes, and sets a quorum floor that the 2018 result breached

Section 8:

> "(1) *Filling vacancies in Halqa panchayat.*— Whenever a vacancy occurs by the **death or resignation** of Panch or
> Sarpanch, the vacancy shall be filled by election or nomination as the case may be: Provided that the vacancy is for
> a period of more than six months.
> (2) **No vacancy in the Halqa Panchayat shall render its proceedings illegal so long as the number of Panches is not
> reduced below 50% of the total number of members of such Halqa Panchayat.**"

**Two consequences, and the second is a new derived finding.**

**(a) On absence A1.** Section 8(1) is why A1 is `not-published` rather than `not-collected`, and it is now argued from
the statute rather than from plausibility. The department cannot fill a vacancy without classifying it. See §6, A1, as
revised.

**(b) The quorum floor, and what the 2018 result did to it.** Section 8(2) sets 50% of panch seats as the threshold
below which a Halqa Panchayat's proceedings are not protected. Now put the §3.3 and §4.1 numbers against it. In the
Kashmir valley, on R1's figures, **63.7% of panch wards had no candidate at all** — so in the valley the *average*
halqa emerged from the 2018 election below the section 8(2) floor. Statewide on the official UT basis (D9),
**33.9% of panch seats were unfilled**, so the average halqa was above the floor but not by much, and the distribution
was extremely uneven: Shopian and Pulwama saw no polling at all.

**This converts a press observation into a statutory one.** R2 quotes CEO Shailendra Kumar in September 2019: "At many
places we haven't been able to constitute the panchayats **owing to a lack of quorum**, because some of the seats …
have remained unfilled", and adds that there was "no word from the government on the fate of such non-functional
panchayats". Section 8(2) is the provision he is describing. **So there is a fourth quantity, and nobody publishes it:
the number of Halqa Panchayats that could not be constituted, or could not lawfully transact, because panch seats
filled fell below 50%.** I flag it as a candidate absence for stage 3 rather than authoring it here, because I cannot
establish that anyone computed it:

> **A10 (candidate) — Number of Halqa Panchayats below the section 8(2) fifty-per-cent floor after the 2018 election.**
> → likely **`not-published`**: the department holds the halqa-wise filled/total counts (they are the annexures to
> S.O. 304), so the count is derivable by the holder under compulsion. But **it is possible nobody ever computed it**,
> in which case the honest value is `not-collected` — an unstudied but definable quantity. **I could not distinguish
> the two and stage 3 must not guess.** The CEO's own statement that "at many places we haven't been able to
> constitute the panchayats" is evidence the department knew which places, which leans to `not-published`.
> **Route:** the Rural Development & Panchayati Raj Department, J&K, for the halqa-wise count of Panches elected
> against Panches sanctioned, as at the constitution of the Halqa Panchayats on 10 January 2019.

### 9.8 Two further provisions worth carrying

- **Section 6(1)(a)** disqualifies a person who "is **not a permanent resident of the State**". The permanent-resident
  category was abolished after 5 August 2019. **What replaced this disqualification, and when, is not established** —
  it is one of the "consistency with the provisions of the Constitution of India" problems MHA's 2024 Annual Report
  refers to (§2.1), and it is a concrete instance of it.
- **Section 9** permits the Government to **supersede** a Halqa Panchayat by notification if in its opinion the
  panchayat "is incompetent to perform or persistently makes default", subject to a show-cause. Article 243E(3)
  requires an election to constitute a superseded panchayat before six months elapse. **Whether section 9 was ever
  used, and whether the post-2024 administrator arrangement was made under it or outside it, is not established** —
  and it matters, because a supersession carries a six-month election clock and an expiry does not obviously carry
  anything. `[SUBAGENT-ULB]`'s report that Block Development Officers were made administrators "for a period of six
  months … or till further orders" is suggestive of section 9 machinery, but the order was not retrieved and I will
  not infer the power from the period.

### 9.9 Caution on this copy

The print I read is **pre-2020**: it carries the District Planning and Development Boards in its long title, defines
"Election authority" as the CEO without the State Election Commission rename, and disqualifies non-permanent-residents.
Its visible amendment history runs to **Act XXII of 1997, Act XXIII of 1997, Act III of 1999 (16-4-99) and Act IV of
2000**, and it does not incorporate the J&K Panchayati Raj (Amendment) Act 2018 of 17 March 2018 in any way I could
see on the pages I read, nor the October 2020 central adaptation order. **Nothing in §9 may be quoted as the law in
force today.** Every provision above is the law as it stood before 2019 — which is precisely what makes it useful for
the baseline, and precisely why sections 45 and 45-A, on which the whole DDC arm of this part turns, **cannot be
answered from this document at all.**
