# 06b — CASO counts, the "Encounters" column, and who actually produces the MHA series

**PROVENANCE OF THIS PART.** Recovered verbatim from a stage-2 fan-out subagent (`a5e0c13e26c5d7d0b`) whose report returned *after* the stage-2 orchestrator died on a session limit. It was therefore never folded into the parts the orchestrator wrote. Preserved here unedited in substance so it is not lost. Its core finding — that MHA AR 2021-22's "Incidents" column was TII+encounters merged, and AR 2022-23 un-merged it — **is** independently present in parts 00, 01, 02, 03 and 09 (all carry the 417 arithmetic). What is unique to this part and appears nowhere else: the `Source: CID, J&K` attribution, the two-upload 2022-23 report, the publication-lag table, and SATP's architectural separation of its own count from MHA's.

---

## 1. Cordon and Search Operations (CASO) — no official count exists

**RETRIEVED (negative result).** Full-text search of every MHA Annual Report 2018-19 through 2024-25 (7 reports, 2,300+ pages): the string "cordon" appears **zero times** in all of them. Zero hits also for "stone pelting", "hartal", "search operation", "operations conducted".

CASO is named as a *strategy* in PIB but never counted. PIB PRID 1988275, MHA, 19 Dec 2023:

> "The strategies adopted and actions taken in this regard include round-the-clock nakas at strategic points, group security in the form of static guards, **intensified Cordon and Search Operations (CASO)** to effectively deal with the challenges posed by terrorist organizations…"

That release then gives a table of incidents/encounters/fatalities — **with no CASO number**.

**RETRIEVED (negative).** The J&K Police website publishes no statistical report at all. Full link inventory pulled via Wayback (jkpolice.gov.in blocks direct curl): no "Annual Report", "Year End Review", "Statistics", "Publications" or "Crime in J&K" section exists anywhere in the navigation.

**COULD NOT ESTABLISH:** any year-wise CASO count from MHA, J&K Police or the Army, in any year, in any format. Assessment: **no such official series is published.** Two non-official figures surfaced in search snippets and were **not verifiable at primary source** — treat both as unverified: "4,815 cordon and search operations" attributed to a UK Parliament Hansard Kashmir debate (2021-01-13), and "at least 177 CASOs" attributed to a JKCCS/APDP report. Neither is a Government of India source.

## 2. The "Encounters" series — its source is CID, J&K, and MHA's Annual Reports never say so

**RETRIEVED.** PIB PRID 2003497, "SECURITY SITUATION IN JAMMU AND KASHMIR AND LADAKH", MHA, 07 Feb 2024:

| Description | 2019 | 2020 | 2021 | 2022 | 2023 |
|---|---|---|---|---|---|
| Terrorist initiated incidents | 153 | 126 | 129 | 125 | 46 |
| Encounters/ Counter Terrorism Operations | 102 | 118 | 100 | 117 | 48 |
| Civilians killed in terrorist initiated incidents and in encounters | 44 | 38 | 41 | 31 | 14 |
| Security personnel killed | 80 | 63 | 42 | 32 | 30 |
| Terrorist killed | 157 | 221 | 180 | 187 | 73 |

> "**(Source: CID, J&K**" — the closing parenthesis is genuinely missing in the PIB HTML; the 19 Dec 2023 release has it correctly.

> "This was stated by the Minister of State for Home Affairs, Shri Nityanand Rai in a written reply to a question in the Rajya Sabha."

Note the row label **is** the definition: "Civilians killed in terrorist initiated incidents and in encounters".

**The attribution matters.** The series MHA presents as its own national accounting of the J&K conflict is produced by the **Criminal Investigation Department of the J&K Police** — a party to the operations being counted. PIB states this; the MHA Annual Reports carrying the same table state no source at all.

## 3. The redefinition: the encounters column split an existing number, and civilians were revised upward

| MHA Annual Report | Column structure | 2018 | 2019 | 2020 | 2021 |
|---|---|---|---|---|---|
| 2018-19 (para 2.35) | `Incidents` | 614 | — | — | — |
| 2019-20 (para 15.10) | `Incidents` | 614 | 594 | — | — |
| 2020-21 (para 14.7) | `Incidents` | 614 | 594 | 244 | — |
| 2021-22 (para 14.3) | `Incidents` **(revised)** | **417** | **255** | 244 | 229 |
| 2022-23 (para 14.10) | `Terrorist Initiated Incidents` + **`Encounters/CT operations`** | 228+189 | 153+102 | 126+118 | 129+100 |

Arithmetic exact: **228+189 = 417**; 153+102 = 255; 126+118 = 244; 129+100 = 229. The AR 2021-22 "Incidents" column was already TII+encounters merged; AR 2022-23 un-merged it. 2017 also revised: 342 → 279.

**Civilians killed revised upward at the same moment:**

| Year | AR 2018-19 → 2021-22 | AR 2022-23 onward | Δ |
|---|---|---|---|
| 2018 | 39 | **55** | +16 |
| 2019 | 39 | **44** | +5 |
| 2020 | 37 | **38** | +1 |
| 2021 | 41 | 41 | 0 |

**The revised aggregate reached Parliament before it reached the Annual Report.** PIB PRID 1776816, 01 Dec 2021 (RS written reply): "Terrorist Incidents | 417 | 255 | 244 | 200 (upto 21.11.2021)". And Rajya Sabha Unstarred Q. No. 371, answered 20.07.2022 (`mha.gov.in/MHA1/Par2017/pdfs/par2022-pdfs/RS20072022/371.pdf`), RETRIEVED verbatim, still gives the **old lower civilian figures** alongside the new merged incident totals: "Civilians killed | 39 | 39 | 37 | 41".

## 4. The definitional footnote trails the definitional change by one report

**RETRIEVED.** MHA AR **2023-24**, para 15.7, footnote verbatim:

> "**\* [Civilians killed includes civilians killed in terrorist-initiated incidents and civilians killed in encounter/counter Terrorism operations]**"

**RETRIEVED.** MHA AR **2024-25**, para 15.6, same footnote with brackets dropped. 2023: 46/48/30/14/73 and 2024: 28/**57**/31/26/67.

**MHA AR 2022-23 — the report that introduced the encounters column and the revised civilian numbers — carries no such footnote.** The definitional note trails the definitional change by one report (~14 months). PIB's 07 Feb 2024 release carried the definition inside the row label 10 months before AR 2023-24.

**A conflicting narrower wording exists.** PIB PRID 1881459, 07 Dec 2022 (RS written reply): "…civilians who lost their life **in these terrorist incidents**" — restrictive — yet the number given (31 for 2022) is the same 31 MHA later footnotes as *including* civilians killed in encounters.

Column labels for the same J&K civilian series across five years: "No. of civilians killed" (2019) → "civilians who lost their life in these terrorist incidents" (2022) → "Civilians killed", unmarked (AR 2022-23) → "Civilians killed in terrorist initiated incidents and in encounters" (PIB Feb 2024) → "\*Civilians killed" + footnote (AR 2023-24, 2024-25).

## 5. MHA Annual Report publication schedule and lag

**RETRIEVED** from the MHA annual-reports index plus HTTP `Last-Modified` headers and each PDF's internal `ModDate` via `pdfinfo`:

| Report | Filename | PDF internal date | Server Last-Modified | Pages |
|---|---|---|---|---|
| 2018-19 | `AnnualReport_18_19.pdf` | Mod 01 Oct 2019 | 13 Feb 2021 | 346 |
| 2019-20 | `AnnualReport_19_20.pdf` | **Mod 03 Feb 2021** | 13 Feb 2021 | 372 |
| 2020-21 | `MHAARE_22042022[1].pdf` | Mod 21 Apr 2022 | 28 Sep 2022 | 312 |
| 2021-22 | `AnnualReport202122_24112022[1].pdf` | Mod 24 Nov 2022 | 01 Dec 2022 | 305 |
| 2022-23 (v1) | `AnnualreportEnglish_04102023.pdf` | Mod 30 Aug 2023 | 09 Oct 2023 | 284 |
| 2022-23 (v2) | `AnnualReportEngLish_11102023.pdf` | Mod 06 Oct 2023 | 11 Oct 2023 | 284 |
| 2023-24 | `AnnualReport_27122024.pdf` | Mod 24 Dec 2024 | 27 Dec 2024 | 376 |
| 2024-25 | `AREnglish_24032026.pdf` | **Mod 16 Mar 2026** | 24 Mar 2026 | 413 |

**No year was skipped or merged** — the listing runs unbroken 2005-06 to 2024-25.

**But the 2019-20 report was severely delayed.** Its PDF was produced 3 Feb 2021 and uploaded 13 Feb 2021 — ~10-11 months after FY end, and after FY2020-21 had itself almost ended. The lag never recovered: 2019-20 → ~10 months; 2020-21 → ~12; 2021-22 → ~8; 2022-23 → ~5-6; 2023-24 → ~9; 2024-25 → ~12.

**The 2022-23 report was published twice.** Two distinct PDFs, both still live, uploaded 2 days apart, 284 pages each, extracted text differing (943,709 vs 946,777 chars). **The J&K security table is byte-identical between the two versions** (diffed). Only the second is linked from the index; the first remains fetchable but orphaned.

## 6. SATP — methodology, and its architectural separation from MHA

SATP's live site blocks automated access both ways (curl times out at the Cloudflare edge; WebFetch gets 403). All SATP content below is RETRIEVED via Internet Archive snapshots of SATP's own pages.

**The entire methodology statement**, from the J&K fatalities datasheet footer (snapshot 10 Nov 2022):

> "\*Data since March 6, 2000, \*\* Data till , November 06, 2022
> **Source: Compiled from news reports and are provisional.**"

That is all of it. **SATP publishes no definition of "civilian"** — no note on whether civilians killed in encounters/CASOs are included, none on over-ground workers, political workers or informers.

Columns: `Year | Incidents of Killing | Civilians | Security Forces | Terrorists/Insurgents/Extremists | Not Specified | Total`. SATP counts **"Incidents of Killing"** — only incidents producing a fatality — structurally a different universe from MHA's "terrorist initiated incidents". J&K figures: 2014: 91/28/47/114; 2016: 112/14/88/165; 2017: 163/54/83/220; 2018: 206/**86**/95/271; 2019: 135/42/78/163; 2020: 140/33/56/232; 2021: 153/36/45/193; 2022: 143/28/30/182.

**SATP does not state in prose that it differs from MHA — but it separates the two architecturally.** It maintains a distinct "Official Data" section: `satp.org/official-data/jammukashmir/fatalities-jammu-kashmir-mha-data`, titled "MHA Data on Fatalities in Jammu and Kashmir", footer "NA=Not Available / **Source: MHA**". That page is **frozen at 2018** and reproduces the *old* MHA series. The datasheet navigation carries tabs "Yearly Fatalities" / **"Official Data"** / "Archive Data", so a user is shown SATP's count and MHA's count as two separate objects.

(SATP renders MHA's 2018 civilian figure as 38; MHA's own AR 2018-19 and PIB PRID 1575578 both say 39 — a 1-unit discrepancy in SATP's transcription of MHA.)

**The divergence on the headline number is large. For 2018: SATP civilians = 86; MHA old series = 39; MHA post-2023 revised series, explicitly encounter-inclusive = 55.** SATP's count exceeds even MHA's revised encounter-inclusive figure by 31.

**ICM's own hedge**, SATP Disclaimer, RETRIEVED:

> "The ICM has taken due care and caution in compilation of data for its website… The views expressed herewith are solely based on the perceptions and analysis done at www.satp.org. on the basis of publicly available information, **internally developed data** and other sources believed to be reliable."

> "www.satp.org does not guarantee the accuracy, adequacy or completeness of any information…"

Note "internally developed data" — SATP concedes its dataset is not purely a compilation of the news reports its datasheet footer cites. Its About page states its purpose as "to counter the progressive distortions regarding, and the international community's neglect of, the wide range of terrorist movements within South Asia, and particularly in India."

**COULD NOT ESTABLISH:** any SATP or ICM text acknowledging, comparing or explaining the gap between its own J&K civilian count and MHA's. The separation is architectural and never discussed in prose on any reachable page.

## 7. Historical baseline document

**RETRIEVED.** PIB PRID 1575578, "Terrorist Activities", MHA, 25 Jun 2019 — annexure to **Lok Sabha Unstarred Question No. 466 for 25.06.2019**. J&K table headed "No. of incidents | No. of civilians killed | No. Security personnel killed": 2014: 222/28/47; 2015: 208/17/39; 2016: 322/15/82; 2017: 342/40/80; 2018: 614/39/91. Old series, no encounters column, no definition of "civilian".

## What this part could not establish

1. Any official CASO count, any year, any source.
2. The Lok Sabha question number for the 30 Jul 2024 reply carrying the encounters series (only an ANI/Business-Standard relay).
3. Any appearance of a separate encounters count before MHA AR 2022-23.
4. Any Standing Committee on Home Affairs criticism of MHA annual-report delays or data practice. WebSearch budget exhausted; eparlib.nic.in unreachable; the one committee PDF on mha.gov.in is a scanned image with no text layer.
5. Parliamentary tabling dates for the annual reports (web-publication and PDF-production dates only).
6. **Whether MHA anywhere explains the 2021-22/2022-23 redefinition or the upward revision of civilian deaths. No such note appears in any of the seven reports — the numbers simply change between editions.**
