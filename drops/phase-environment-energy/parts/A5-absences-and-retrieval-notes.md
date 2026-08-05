# A5-absences-and-retrieval-notes

_Stage 2 research, phase 15 (environment and energy), Arc A. Started 2026-08-05T11:48:35Z._

## A5.1 The correction the instrument owes on L-0052 — stated plainly

**L-0052 is wrong on a checkable point and the correction is not marginal.**

Its `unmeasured[]` entry reads, in relevant part:
> what: "Renewables' share of energy actually generated, against their share of installed capacity"
> why: "… Generation data are published by the grid operator and the electricity authority; the two shares are simply not set side by side in anything retrieved."
> wouldFill: "Central Electricity Authority or Grid-India generation-mix data by source and year, set against installed capacity for the same years."
> **reasonKind: "not-published"**

The datum is published. Four separate retrievals in this run, all T1, all from the Central Electricity Authority, the body the record names:

1. **CEA *General Review 2025*** — Tables 1.2 and 1.3, on consecutive pages, give installed capacity by mode and gross generation by mode, on the same "Utilities Only" universe, for every year from 1950 to 2023-24. The two shares are literally set side by side, which is the exact thing the record says is not done. `https://cea.nic.in/wp-content/uploads/general/2025/Updated_GR_2025_merged_new.pdf` (see A1.0).
2. **CEA *Broad Overview of RE Generation*, monthly** — Table 6 is titled *"Monthly Renewable Energy as % of Total Electricity Generated"* and Table 7 *"Cumulative Renewable Energy as % of Total Electricity Generated"*. CEA computes the ratio itself, prints it as a percentage, for every State and UT and for All India, every month. `https://cea.nic.in/wp-content/uploads/resd/2026/07/Broad_Overview_of_RE_Generation_June_2026.pdf` (see A1.8).
3. **CEA *Executive Summary on Power Sector*, monthly** — section 1.1 gives full-financial-year generation by fuel; the page-1A pair gives conventional/renewable splits on both hydro bases. `https://cea.nic.in/wp-content/uploads/executive/2026/03/Executive_Summary_March_2026_Actual.pdf` (see A1.5).
4. **CEA RE Generation Portal** — `https://gen-re.cea.gov.in/reports`, retrieved HTTP 200, 675,041 bytes, 22,366 characters of text, listing a *daily* All-India renewable generation report going back day by day (the index visible in the retrieved page runs from DailyRE04082026 backwards through DailyRE25052026 and beyond).

**The correct `reasonKind` is not "not-published". On the evidence of this run it is "not-retrieved" — the record's own `why` says as much in its last four words, "in anything retrieved", while the `reasonKind` asserts something about the world.** This is exactly the failure mode standard 5 names: a claim about what EXISTS rather than about what the sources contain, and it was falsified by four documents turning up with no figure changing.

Beyond the reasonKind, the record's `unmeasured[]` entry should be closed outright, not re-graded: A1.1 supplies the year-by-year series the entry asks for, and A1.5/A1.8 bring it to FY2025-26.

**A second, smaller correction.** L-0052's sole source block is `{"name": "MNRE / CEA", "url": "https://mnre.gov.in/", "tier": "T1"}` — a bare domain root, graded T1. Under standard 2 that is a citation that asserts a publisher and retrieves nothing, and under standard 3 the tier grades the institution rather than a document. Every figure in the record is available from a deep-linked CEA or MNRE document listed in these parts.

## A5.2 Where two sources disagree, and where their agreement is not corroboration

Enumerated. For each I state whether the two are measuring the same quantity.

**(1) MNRE vs CEA on renewable installed capacity — they do not disagree, and that is not evidence of anything.**
MNRE's year-wise series accumulated from its 31.03.2014 base gives 35,849.59 · 39,950.09 · 47,091.39 · 58,558.20 · 70,651.44 · 79,412.00 · 88,255.31 · 95,803.42 · 109,885.39 · 125,159.82 · 143,644.50 MW at successive year ends. CEA *General Review 2025* Table 1.2 "RES" gives 35,850 · 39,950 · 47,091 · 58,558 · 70,651 · 79,412 · 88,255 · 95,803 · 109,885 · 125,160 · 143,645. Every year agrees to CEA's rounding to the whole MW (A3.5). At 30.06.2026 MNRE's "Sub Total (Exc. Large Hydro)" 236,524.72 MW sits against CEA's "Wind, Solar & Other RE" 236,525 MW; MNRE's "Large Hydro" 52,064.67 against CEA's "Hydro (including PSPs)" 52,065.
**Verdict: these are the same series published twice, not two measurements that happen to agree.** MNRE is the administering ministry and CEA the statistical authority for the same reported plant. Treating their agreement as cross-corroboration would be unsound — it carries no more evidential weight than one of them alone.

**(2) CEA Executive Summary vs CEA RE Generation report on June 2026 generation — they reconcile exactly once a stated exclusion is applied.**
Executive Summary June 2026: Thermal 122.49, Nuclear 5.56, Hydro (Large) 13.36, RES incl. SHP 36.99, Bhutan Import 0.71, All India 179.12 BU.
RE overview June 2026: Thermal 120,240.13 + Gas 2,253.65 = 122.49 BU; Nuclear 5.56; Large Hydro 13.36; RE 36.99; grand total 178,411.66 MU = 178.41 BU.
179.12 − 0.71 = 178.41 ✓. The RE overview's own footnote states the exclusion: "($) Large Hydro Generation data excluding import from Bhutan. However, the import from Bhutan during June 2026 is 705.35 MUs". Same quantity, different scope, difference fully explained by the source itself.

**(3) CEA vs CEA on the definition of "RES" — a genuine, unresolved, live disagreement inside one authority.**
*General Review 2025* Table 1.2 footnote excludes large hydro from RES. *Installed Capacity as on 30.06.2026* labels a row "RES (including Hydro)". *Executive Summary March 2026* prints both bases in adjacent tables. Detail and figures in A3.3. **These are different quantities wearing the same name.** The gap is 52,065 MW of capacity, or 9.5 BU in the month of March 2026.

**(4) PIB vs CEA on the date of the instrument reclassifying large hydro — 7 March / 8 March / 8 May 2019.** Three government documents, three dates, none citing the others. Detail in A3.7. Unresolved; I did not retrieve the Ministry of Power Order itself.

**(5) MNRE vs MNRE on non-bagasse biomass at 30.06.2026 — 1048.84 MW (physical-progress) vs 1047.85 MW (year-wise).** 0.99 MW. Detail in A3.4(c). Same quantity, same date, same ministry, two pages.

**(6) MNRE vs its own arithmetic on "Total Non-Fossil"** — prints 29736.39 where its components require 297,369.39. Detail in A3.4(a).

**(7) CEA vs CEA on the June 2026 all-India generation total inside one document** — Table 4 prints 178,411.66 MU and Table 6 prints 178,412.21 MU. 0.55 MU. Detail in A1.8.

**(8) Grid-India vs CEA on generation — NOT ESTABLISHED, because I could not retrieve Grid-India.** `grid-india.in` was flagged in the retrieval environment as having returned HTTP 000 on a first attempt. I retested it (A5.4) and it failed again. **I therefore have no Grid-India figure to set against CEA's and make no claim about whether they agree.** This is an open item, not a finding.

## A5.3 Not collected, not published, withheld, or never defined

Enumerated. Each says what I looked for and what came back.

1. **Generation for 13.06% of installed renewable capacity is not collected.** CEA's monthly RE report prints "Monitored Capacity (MW) … for which generation data is available" of 250,894.44 MW against installed 288,589.36 MW — a gap of 37,694.92 MW, of which 34,420.90 MW is solar (A1.9). This is the single most material limitation on every generation share in these files. The source flags the column but offers no note explaining the gap beyond "(*) Solar Installed capacity including rooftop solar."
2. **How unmonitored renewable output is treated in the generation DENOMINATOR is never defined.** Needle: `node tools/scan-text.mjs reov.txt rooftop "behind the meter" estimated imputed --substring` over 115,402 characters returns `rooftop: 1` (the footnote above), `behind the meter: 0`, `estimated: 0`, `imputed: 0`. Positive control is the non-zero `rooftop` hit in the same run and same form. So within this document the treatment is undefined. It may be defined elsewhere; I did not locate such a document.
3. **FY2025-26 is absent from MNRE's own year-wise renewable capacity table** — a 50,905.28 MW hole, the largest year in the series, provable from the table's failure to reconcile to its own cumulative (A3.4(b)). The number itself is published by CEA, so this is a gap in one presentation, not a suppression.
4. **CEA's installed-capacity report index publishes only the current month.** `https://cea.nic.in/installed-capacity-report/?lang=en` (HTTP 200, 5,240 characters of text) links exactly three artefacts, all June 2026: the PDF, the XLSX, and an Office-online viewer wrapper. I probed six plausible archive URLs for March 2024, March 2025 and March 2026 under `wp-content/uploads/installed/YYYY/MM/` in both `Website_March.pdf` and `installed_capacity.pdf` forms; **all six returned HTTP 404** (each with an identical 141,761-byte 404 page, which is itself the tell that they are genuine 404s and not a resolver artefact — a positive control in the same form, `installed/2026/06/Website_June.pdf`, returned HTTP 200 and 659,068 bytes). **I did not establish that CEA withholds the archive** — the General Review carries the annual series back to 1950, so the historic data is published in a different instrument by the same authority. What is absent is a *monthly* archive at a guessable URL. Standard 5 applies: a listing page I did not find could falsify this with no figure changing.
5. **The Ministry of Power Order that gave effect to the large-hydro reclassification was not retrieved.** CEA cites it as "Ministry of Power's Order dated 8th May, 2019"; I did not locate the Order on `cea.nic.in`, `mnre.gov.in` or PIB, and `egazette.gov.in` is a known-dead channel here. Two PIB releases attest the substance and the March date, so **this is a failure to retrieve one instrument, not evidence that it is unpublished** — the phase-14 lesson applies directly.
6. **"Clean" is not defined as a statistical category in any of the four documents I retrieved** (A3.3). Statement about those four documents only.
7. **No interim annual phasing for the capacity targets** — see A4, which resolves each target's commitment state.

## A5.4 Retrieval log — every host tried, what it returned

Method throughout: `curl -sL --retry 2 --resolve <host>:443:<ip> <url>`, then tag-strip and count characters of TEXT, never bytes. PDFs downloaded then `pdftotext -layout`.

| host / URL | pin used | HTTP | bytes | TEXT chars | verdict |
|---|---|---|---|---|---|
| `cea.nic.in/` | 45.127.74.41 | 200 | 248,558 | 9,897 | live, real body |
| `cea.nic.in/dashboard/?lang=en` | 45.127.74.41 | 200 | — | 166,905 | live; source of all CEA report-page links |
| `cea.nic.in/general-review-report/?lang=en` | 45.127.74.41 | 301→200 | — | 5,195 | live (301 without `-L`) |
| `cea.nic.in/executive-summary-report/?lang=en` | 45.127.74.41 | 200 | — | ~5,200 | live |
| `cea.nic.in/installed-capacity-report/?lang=en` | 45.127.74.41 | 200 | — | 5,240 | live; current month only |
| `cea.nic.in/renewable-generation-report/?lang=en` | 45.127.74.41 | 200 | 124,069 | 5,301 | live |
| `cea.nic.in/annual-generation-report/?lang=en` | 45.127.74.41 | 200 | — | — | live |
| `…/general/2025/Updated_GR_2025_merged_new.pdf` | 45.127.74.41 | 200 | 12,151,904 | 984,398 | **T1, General Review 2025** — failed twice (truncated at 1.99 MB and 2.05 MB) before completing with `--retry 5 --retry-all-errors` |
| `…/executive/2026/06/Executive_Summary_June_2026_Actual.pdf` | 45.127.74.41 | 200 | 3,688,595 | 429,720 | T1 |
| `…/executive/2026/03/Executive_Summary_March_2026_Actual.pdf` | 45.127.74.41 | 200 | 3,714,899 | 445,079 | T1 |
| `…/installed/2026/06/Website_June.pdf` | 45.127.74.41 | 200 | 659,068 | 54,648 | T1 |
| `…/resd/2026/07/Broad_Overview_of_RE_Generation_June_2026.pdf` | 45.127.74.41 | 200 | 2,926,962 | 117,290 | T1; first attempt truncated (xref error), succeeded on retry |
| `…/2021/03/publications_12.07.2021.pdf` | 45.127.74.41 | 200 | 341,347 | 100,556 | T1 (CEA publications catalogue; lists General Review back to 2007) |
| `…/executive/2025/{03,04,07,08}/Executive_Summary_*.pdf` (4 URLs) | 45.127.74.41 | **404** | 141,782–3 | — | filename pattern differs pre-2026; not pursued (A4 agent covered July 2025 via PIB) |
| `…/installed/{2024,2025,2026}/…` (6 URLs) | 45.127.74.41 | **404** | 141,760–1 | — | no guessable monthly archive |
| `gen-re.cea.gov.in/reports` | 164.100.114.49 | 200 | 675,041 | 22,366 | live; daily RE generation report index |
| `www.pib.gov.in/PressReleasePage.aspx?PRID=1567817&reg=3&lang=1` | 94.202.207.57 | 200 | 98,363 | 17,103 | **T1, Cabinet 07.03.2019** |
| `www.pib.gov.in/PressReleasePage.aspx?PRID=1744435&reg=3&lang=1` | 94.202.207.57 | 200 | 68,432 | 7,162 | **T1, MoP Rajya Sabha reply 10.08.2021** |
| `mnre.gov.in/en/` | 164.100.51.103 | 200 | 156,475 | 8,204 | live |
| `mnre.gov.in/en/physical-progress/` | 164.100.51.103 | 200 | 107,415 | 4,002 | **T1** |
| `mnre.gov.in/en/year-wise-achievement/` | 164.100.51.103 | 200 | 111,403 | 4,667 | **T1** |
| `npp.gov.in/publishedReports` | 45.127.74.236 | 200 | 140,958 | 15,819 | live, real body (daily generation report index) |

**Environment notes confirmed rather than re-derived:**
- The `--resolve` workaround was necessary and sufficient for every `.nic.in` / `.gov.in` host above; none was reachable without it.
- The PIB `&reg=3&lang=1` suffix behaved as documented.
- **A new failure mode not in the environment brief: large PDFs on `cea.nic.in` truncate silently.** Two of the three biggest downloads completed with HTTP 200 at partial size and produced a file that `file(1)` still identifies as a PDF; only `pdftotext` revealed it (`Couldn't find trailer dictionary`). Anyone repeating this must check the extracted text length, not the HTTP code and not `file`. This is standard 4's "measure text, not bytes" showing up in a new place.
- **`grid-india.in` (220.158.184.230): retested and still not retrieved.** Per standard 9 I varied resolver, process and client — see A5.5 for the exact attempts before this is recorded as anything.

## A5.5 Grid-India / POSOCO — a retrieval failure hardened per standard 9, and NOT converted into a claim about publication

The environment brief flagged `grid-india.in` (220.158.184.230) as having returned HTTP 000 on a first attempt, requiring a second resolver, a second process and a second client before recording. I ran all three and more. Every attempt below was made in this run.

**Resolvers varied — DNS resolves cleanly and consistently, so this is not a resolver problem:**
- `dig +short @1.1.1.1 grid-india.in` → `220.158.184.230`, `150.107.103.38`
- `dig +short @8.8.8.8 grid-india.in` → same two addresses
- `dig +short @9.9.9.9 www.grid-india.in` → CNAME `grid-india.in.` then the same two addresses

**Clients varied — three, in three separate processes:**
| client | target | result |
|---|---|---|
| `curl` | `https://grid-india.in/` pinned to 220.158.184.230 | `000`, 0 bytes |
| `curl` | `https://grid-india.in/` no pin | `000`, 0 bytes |
| `curl` | `http://grid-india.in/` (port 80, `-L`) | `000`, 0 bytes |
| `curl` | pinned to the **second** IP 150.107.103.38 | `000`, 0 bytes |
| `curl` | `https://www.grid-india.in/` pinned | `000`, 0 bytes |
| `python3 urllib.request` (verify off) | `https://grid-india.in/` | `URLError [Errno 54] Connection reset by peer` |
| `python3 urllib.request` | `https://www.grid-india.in/` | same |
| `python3 urllib.request` | `https://150.107.103.38/` | same |
| `openssl s_client -connect 220.158.184.230:443 -servername grid-india.in` | — | `write:errno=54`; "SSL handshake has read 0 bytes and written 309 bytes"; "no peer certificate available" |
| `WebFetch` (server-side, different network egress entirely) | `https://grid-india.in/` | `read ECONNRESET` |

**Layer isolated:** a raw `socket.connect()` to `220.158.184.230:443` and to `150.107.103.38:443` both report **TCP OPEN**. So the ports are listening and the failure is at TLS: the handshake is reset after the ClientHello, with zero bytes read back. That is an active reset, not a routing black hole, and it is identical from four different network paths.

**Alternative publisher tried, per the phase-14 lesson.** POSOCO is Grid-India's former name and `posoco.in` is a distinct estate. `dig +short @1.1.1.1 posoco.in` → `150.107.103.16`, `220.158.184.208`; `curl` pinned to each returned `000`/0 bytes, and `WebFetch` on `https://posoco.in/en/about-us/annual-reports/` returned `read ECONNRESET`. Same signature, different hostnames and different IPs — consistent with one operator's edge rejecting this environment.

**The same failure signature appears on `cpcb.nic.in`** (45.127.74.241), the other host the brief flagged: TCP OPEN, `openssl s_client` reports `read:errno=0` with "SSL handshake has read 0 bytes and written 307 bytes", `curl` returns `000`. Not needed for this arc; recorded because it is the same fingerprint and a later batch will hit it.

**What I am therefore entitled to say, and what I am not:**
- **Entitled:** *the grid operator's web estate (`grid-india.in`, `www.grid-india.in`, `posoco.in`) could not be reached from this environment across three clients, four network paths, three resolvers and four IP addresses, with the failure isolated to a TLS reset after TCP connect.*
- **NOT entitled:** any statement that Grid-India's reports are unpublished, withheld, or that its figures do or do not agree with CEA's. **Two failed retrievals from the same estate are one observation, and I have exactly one observation.** The A5.2(8) line stands as an open item.
- **And the datum is not lost.** Grid-level generation by fuel is published by CEA (four instruments, A5.1) and by the National Power Portal (`npp.gov.in/publishedReports`, retrieved HTTP 200 with a 15,819-character body listing daily All-India and region-wise generation reports). What Grid-India would have supplied is an *independent second measurement* for cross-check — and note A5.2(1): even when I obtain two Indian government sources for a quantity in this arc, they have so far turned out to be the same series published twice. The cross-check may be unavailable in principle, not just unreachable.
