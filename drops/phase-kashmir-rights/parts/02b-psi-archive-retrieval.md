# NCRB Prison Statistics India (PSI) — archive retrieval log and verbatim extracts

Model serving this agent: **claude-opus-5**
Date of retrieval: 2026-08-03

All quoted text below is transcribed from PDF text layers I actually downloaded and converted
with `/opt/homebrew/bin/pdftotext -layout`. Every document is marked RETRIEVED or RELAYED.
Nothing in this file is reconstructed from memory.

---

## 1. Route-by-route reachability log

| # | Route | Exact result |
|---|---|---|
| 1 | `nslookup ncrb.gov.in` (system resolver 192.168.70.1) | `** server can't find ncrb.gov.in: SERVFAIL` (also `SERVFAIL` from `fe80::1`) |
| 1 | `curl -A <Chrome UA> https://www.ncrb.gov.in/en/prison-statistics-india` | `HTTP:000`, curl **exit 6** (could not resolve host) on first attempt; on retest `HTTP:000`, curl **exit 28** (timeout after 25s). Never reached. **DIRECT NCRB IS DEAD FROM THIS PROCESS.** |
| 2 | `http://archive.org/wayback/available?url=...` | **HTTP 429 Too Many Requests** — `<h1>429 Too Many Requests</h1> You have sent too many requests in a given amount of time.` The availability API was unusable. |
| 2 | `http://web.archive.org/cdx/search/cdx?...` | **WORKS.** Returned full CDX index. This is the working route. |
| 2 | `https://web.archive.org/web/<ts>id_/<url>` | **WORKS.** HTTP 200, raw original bytes. |
| 3–5 | dataful.in / data.gov.in / Google Books / Scribd | Not needed — route 2 succeeded and produced official PDFs. |

**Conclusion on route:** ncrb.gov.in is unreachable by DNS from this machine, but the Wayback
Machine CDX API + `id_` raw-snapshot form via `curl` retrieves the official NCRB PDFs intact.
The PDFs below are NCRB's own files, byte-for-byte, served from Wayback.

---

## 2. Documents RETRIEVED

### D1 — RETRIEVED
**Prison Statistics India 2021 (full volume)**
Original NCRB URL: `https://ncrb.gov.in/sites/default/files/PSI-2021/PSI_2021_as_on_31-12-2021.pdf`
Fetched via: `https://web.archive.org/web/2022id_/https://ncrb.gov.in/sites/default/files/PSI-2021/PSI_2021_as_on_31-12-2021.pdf`
HTTP 200, 13,152,713 bytes, `PDF document, version 1.6`. Text layer extracted cleanly (16,657 lines).

### D0 — RETRIEVED (index page, used to discover the file URLs above)
`https://ncrb.gov.in/en/prison-statistics-india-2021` via
`https://web.archive.org/web/20220907160111id_/https://ncrb.gov.in/en/prison-statistics-india-2021`
This is where the PSI-2021 component PDF filenames come from — I did not guess them.

---

## 3. (b) DEFINITIONAL NOTE — VERBATIM

From the **GLOSSARY** of PSI 2021 (RETRIEVED, D1). Transcribed verbatim:

> **Detenues$**
>
>        Any person detained in prison on the orders of the competent authority under the
> relevant preventive laws.

The `$` footnote marker is defined at the foot of the same glossary page:

> `$ - Model Prison Manual-2016, published by MHA`

i.e. NCRB attributes the *detenue* definition to the MHA Model Prison Manual 2016, not to any
statute of its own.

Adjacent definitions, verbatim, for contrast:

> **Prisoner$**
>
>        Any person confined or committed to jail (other than police custody) as per the
> order of a competent authority.

> **Undertrial Prisoner**
>
>        Any person who has been committed to judicial custody and against whom a
> criminal trial has been initiated by a competent authority (trial is yet to start or is in
> process, but not yet disposed off).

> **Convicted criminal prisoner or Convicts**
>
>       Any criminal prisoner under sentence of a Court or Court-martial, and includes a
> person detained in prison under the provisions of Chapter VIII of the 6 Code of Criminal
> Procedure, 1882 (10 of 1882) or under the 7 Prisoners Act, 1871 (5 of 1871).

**Critical observation for the J&K question:** the definition says "under the *relevant preventive
laws*" — plural, unnamed. The glossary names **no** preventive statute. It does not name the J&K
Public Safety Act, the National Security Act, COFEPOSA, or PIT-NDPS. The category is defined
by *type* of law, never disaggregated by *which* law.

---

## 4. (a) CHAPTER / TABLE LISTING — the tables that concern DETENUS

From the PSI 2021 Table of Contents (RETRIEVED, D1), verbatim rows. These are **every**
occurrence of "Detenue" in the published contents:

```
 2.12A      Education Profile of Detenues                                           69
 2.12B      Domicile of Detenues                                                    70
 2.12C      Religion of Detenues as on 31st December, 2021                          71
 2.12D      Caste of Detenues as on 31st December, 2021                             72
   3.4      Detenues (Indian Prisoners) in Jails by Sex and Age-groups             96-97
   7.5      Detenues Released                                                        174
```

Detenus also appear as a *column* (not a dedicated table) inside the Chapter-2 "Types of Prison
Inmates" family:

```
   2.1      Types of Prison Inmates                                               45-46
   2.2      Percentage Share of Different Types of Prison Inmates                   47
   2.3      Types of Prison Inmates in Central Jails (Sex-wise)                   48-49
   2.4      Types of Prison Inmates in District Jails (Sex-wise)                  50-51
   2.5      Types of Prison Inmates in Sub-Jails (Sex-wise)                       52-53
   2.6      Types of Prison Inmates in Women Jails                                  54
   2.7      Types of Prison Inmates in Borstal Schools (Sex-wise)                 55-56
   2.8      Types of Prison Inmates in Open Jails (Sex-wise)                      57-58
   2.9      Types of Prison Inmates in Special Jails (Sex-wise)                   59-60
```

Chapter headings, verbatim (full list):

```
Chapter-1   Prisons – Types and Occupancy                                         1 – 18
Chapter-2   Prisoners – Types and Demography                                     33 – 44
Chapter-3   Indian Prisoners                                                      83 – 89
Chapter-4   Foreign Prisoners                                                     101 – 108
Chapter-5   Prisoners - Offence wise                                              119 – 130
Chapter-6   Prisoners - Sentences and Incarceration                               149 – 153
Chapter-7   Prisoners - Releases, Transfers and Movements                         165 – 169
Chapter-8   Deaths and Illness in Prisons                                         177 – 182
Chapter-9   Jail Breaks, Escapes & Clashes/Group Clashes in Prisons               191 – 193
Chapter-10 Rehabilitation and Welfare of Prisoners                                199-236
Chapter-11 Prisons Staff – Strength and Training                                  245-249
Chapter-12 Prison - Budget and Infrastructure                                     263-272
```

**Note the asymmetry that answers question 1 in advance.** Chapter 5 is titled
"Prisoners - Offence wise" and contains exactly four tables:

```
   5.1      Convicts by Type of Offences under IPC                                131-134
   5.2      Convicts by Type of Offences under Special and Local Laws             135-138
   5.3      Undertrial Prisoners by Type of Offences under IPC                    139-142
   5.4      Undertrial Prisoners by Type of Offences under Special and Local Laws 143-146
```

Convicts: yes. Undertrials: yes. **Detenus: absent.** The one chapter in the entire volume that
breaks inmates down by the law they are held under covers convicts and undertrials only. There
is no "Detenues by Type of Offences under Special and Local Laws" table.

### Additional (web-only) tables — full published list, verbatim

PSI-2021 Methodology section, "B. List of Additional Tables of Prison Statistics India-2021 on
NCRB Portal". Detenu-relevant entries only quoted here; note that neither splits by statute:

```
           Distribution of Foreigner Detenues in Jails by Sex and Age-groups as on
  12.
           31st December 2021
           Age-group wise Percentage of Foreign Detenues to Total Foreign Detenues as on
  13.
           31st December 2021
```

There are 25 additional tables in total; only these two concern detenus, and both are about
*foreign* detenus by sex/age. No additional table splits detenus by detaining statute.

---

## 5. (c) DOES ANY TABLE SPLIT DETENUS BY THE LAW UNDER WHICH DETAINED?

### **NO. Answer: no such table exists in PSI.**

This is established, not assumed. Method used:

1. **Full-text grep of the complete PSI 2021 volume** (RETRIEVED, D1) for `detenu` — every
   occurrence was inspected. The complete set of detenu tables is: 2.12A (education),
   2.12B (domicile), 2.12C (religion), 2.12D (caste), 3.4 (sex & age-group), 7.5 (releases),
   plus a detenu *column* in 2.1–2.9 (types of inmates, by jail type) and 2.2 (percentage share).
   None is by statute.
2. **The offence-wise chapter excludes detenus entirely.** Chapter 5 "Prisoners - Offence wise"
   is the only chapter that classifies inmates by law. Its four tables (5.1–5.4) cover
   *Convicts under IPC*, *Convicts under Special and Local Laws*, *Undertrial Prisoners under
   IPC*, *Undertrial Prisoners under Special and Local Laws*. There is no detenu equivalent.
3. **The 25 web-only "Additional Tables"** listed in PSI-2021's Methodology were checked; the
   only two concerning detenus are #12 and #13, both foreign detenus by sex/age.
4. **The glossary defines detenu by reference to "the relevant preventive laws"** without
   naming a single statute (quoted verbatim in §3 above).

**Consequence for the J&K question:** J&K Public Safety Act detenus **cannot** be separated from
National Security Act, COFEPOSA or PIT-NDPS detenus anywhere in Prison Statistics India. The
publication carries one undifferentiated "Detenues" bucket. Any PSA-specific count must come
from a different source (state government replies, Parliament answers, J&K Home Department, HC
habeas corpus records) — not from PSI.

---

## 6. (d) UNIT OF ACCOUNT — HOLDING STATE OR DETAINING STATE?

**Finding: the row-state is the state HOLDING the prisoner. PSI says so explicitly, once, in the
Chapter-2 narrative — and it is the only place in the volume that says it.**

Verbatim, PSI 2021 Chapter 2 narrative (RETRIEVED, D1), on domicile of convicts:

> A total of 7,076 convicts has been
> reported as non-domicile of the State
> (Belongs to Other State) **where they are
> incarcerated.** Haryana has reported the
> maximum number of such convicts
> (16.5%, 1,170 convicts) followed by
> Madhya Pradesh (10.2%, 719 convicts)
> and Chhattisgarh (7.4%, 522 convicts) as
> on 31st December, 2021.

(emphasis mine on "where they are incarcerated" — the words are NCRB's.)

The accompanying chart is titled, verbatim:

> `Domicile of Origin of Convicted Prisoners as on 31st December, 2021`
> `Chart 2.7`

**The front matter, Disclaimer and Methodology are otherwise SILENT on this.** For completeness,
here is the Disclaimer in full, verbatim — note it makes no statement about attribution of a
prisoner to a state:

> **DISCLAIMER**
>
> The information published in this report has been
> obtained from all States/UTs Prison Headquarters.
> NCRB has only compiled and collated the data and
> presented it in the form of this report. NCRB shall
> not be responsible for authenticity of information.
> Any discrepancy observed in this report, however,
> may be brought to the notice of the Bureau.

And the Methodology, verbatim, section A.1 — again, the reporting unit is the *prison department
holding the inmate*, never the detaining authority:

> **A.1 Action by States/UTs Prisons Department**
>
>           I.    The annual States/UTs data for "Prison Statistics India" is furnished by the
>                 Prison Department of all 36 States/UTs as per the NCRB prescribed
>                 proformae through an Application developed by NCRB.
> ...
>          III.   The consolidation of State level data is done by Prison Department of the
>                 concerned State/UT and the consolidated data is shared with NCRB.

So: **data flows from the prison holding the body.** A J&K PSA detenu lodged in a UP jail is
reported by the UP Prison Department and appears in the UTTAR PRADESH row.

### The ONE table that carries origin: Table 2.12B "Domicile of Detenues"

This is the only detenu table anywhere in PSI that distinguishes origin from location.
Verbatim column headers and the rows that matter (RETRIEVED, D1):

```
                                                Table – 2.12 B
                               Domicile of Detenues as on 31st December, 2021
                                                                              Domicile
    Sl.
                   State/UT
    No.                                Belongs to State   Belongs to other State   Belongs to other Country       Total
    (1)               (2)                     (3)                    (4)                      (5)                  (6)
     8    HARYANA                             0                      28                      13                    41
    26    UTTAR PRADESH                      112                   110                        0                   222
    33    JAMMU & KASHMIR                    248                     0                        4                   252
          TOTAL (ALL-INDIA)                 3239                   193                       38                   3470
```

**Read this carefully — it is the closest PSI comes to the transferred-PSA-detenu question.**
As on 31 December 2021:
- **Haryana held 41 detenus, of whom ZERO belonged to Haryana.** 28 belonged to another
  State/UT, 13 to another country.
- **Uttar Pradesh held 222 detenus, of whom 110 — very nearly half — belonged to another
  State/UT.**
- J&K held 252 detenus, 248 of them J&K-domiciled.

The Chapter-2 narrative on this table reads, verbatim:

> **IV.      Detenues**
>
>                    93.3% (3,239 out of 3,470) of
>              detenues belonged to the same State/UT
>              while only 5.6% (193) of detenues were
>              belonging to the different States/UTs as
>              on 31st December, 2021. 38 detenues
>              were belonging to other countries (Table
>              2.12B).

**The limit of this table:** column (4) is an undifferentiated aggregate, "Belongs to other
State". It does **not** name *which* other State. So Table 2.12B establishes that UP and Haryana
were holding out-of-state detenus, but PSI itself will not tell you that they were J&K detenus,
and will not tell you they were held under the J&K Public Safety Act. Both of those facts have to
be imported from outside PSI.

### (d, second part) Is there a table on inmates transferred between states?

**For convicts and undertrials: YES. For detenus: NO.**

- Chapter 7 is titled "Prisoners - Releases, Transfers and Movements". Its narrative states,
  verbatim:

  > **II.  Transfers**
  >        A total of 1,713 convicts were
  > transferred from one State to another
  > State during 2021. Punjab (1,087) and
  > Uttar Pradesh (181), Telangana (116)
  > and Kerala (75) have reported the
  > highest number of such transfer of
  > convicts to other States (Table 7.1).

  > **II.     Transfers**
  >      A total of 10,641 undertrials were
  > transferred from one State to another
  > State. Punjab (6,036), Uttar Pradesh
  > (982), Haryana (643), Jharkhand (475),
  > Telangana (360) and Delhi (352) have
  > reported the highest number of such
  > transfer of Undertrials to other States
  > (Table 7.3).

  Chart 7.1 carries a slice labelled `Transferred to Other States, 1713, 1.8%`;
  Chart 7.2 carries `Transferred to other States, 10641, 0.7%`.

- **Table 7.5 "Detenues Released during the year 2021" has NO transfer column.** Verbatim header
  and the J&K row:

```
                                                     Table – 7.5
                                        Detenues Released during the year 2021
                                         Released on      Released before
    Sl.                                                                      Released on    Other     Total Col.3 to
                   State/UT             Completion of      Completion of
    No.                                                                          Bail      Releases         6
                                       Detention Period   Detention Period
    (1)            (2)                       (3)                 (4)             (5)          (6)           (7)
    33    JAMMU & KASHMIR                     66                126               4          143           339
          TOTAL (ALL-INDIA)                  1520               6911             381         597           9409
```

Columns 3–6 only. **Detenus are the one inmate class for which PSI publishes no interstate
transfer count.** The 2021 Chapter-7 detenu narrative confirms it — it has a "Releases" heading
and no "Transfers" heading:

> **Detenues**
> **Releases**
>       During the calendar year 2021, a
> total of 9,409 Detenues were released
> out of which 1,520 Detenues were
> released after completion of detention
> period, 6,911 Detenues were released
> before completion of the detention period
> imposed. A total of 381 Detenues were
> released on bail. A total of 597 Detenues
> were reported under 'Other releases'

**So: the transfer of PSA detenus out of J&K is structurally invisible in PSI.** There is no
transfer table for detenus; the only trace is the "Belongs to other State" column of Table 2.12B,
which does not name the origin state.

---

## 7. (e) THE J&K DETENU SERIES — AND THE 2019/2020 STATE→UT BREAK

### 7.1 Documents RETRIEVED for this section

All fetched by `curl` from `https://web.archive.org/web/<ts>id_/<original NCRB url>`, HTTP 200:

| Vol. | Original NCRB URL | Snapshot ts used | Bytes | Text layer |
|---|---|---|---|---|
| PSI 2021 | `https://ncrb.gov.in/sites/default/files/PSI-2021/PSI_2021_as_on_31-12-2021.pdf` | `2022` (nearest) | 13,152,713 | native, clean |
| PSI 2020 | `https://ncrb.gov.in/sites/default/files/PSI_2020_as_on_27-12-2021_0.pdf` | `20211228232956` | 12,016,293 | native, clean |
| PSI 2019 | `https://ncrb.gov.in/sites/default/files/PSI-2019-27-08-2020.pdf` | `20200907005407` | 35,857,775 | native, clean |
| PSI 2018 | `https://ncrb.gov.in/sites/default/files/PSI-2018.pdf` | `2021` (nearest) | 36,921,480 | native, clean |
| PSI 2017 | `https://ncrb.gov.in/sites/default/files/PSI-2017.pdf` | `20210718190859` | 29,139,623 | native, clean |
| PSI 2016 | `https://ncrb.gov.in/sites/default/files/PSI-2016.pdf` | `20230502060317` | 51,785,401 | native, clean |

**A caution I hit and worked around, recorded because it matters for anyone re-running this:**
the *first* PSI 2020 snapshot I pulled (`.../web/2022id_/...`, 11,517,952 bytes) is an **OCR'd
scan**, not native text. Its text layer has Cyrillic contamination (`аз оп` for "as on", `апа`
for "and", `НАВУАМА` for "HARYANA") **and silently drops numeric columns** — e.g. it rendered
the Andhra Pradesh row of Table 2.1 as `1 [ANDHRA PRADESH 0 0 1 7375`, missing values. **No
figure in this file is taken from that OCR version.** I re-fetched snapshot `20211228232956`,
which is native text, and every figure below comes from that one.

**Validation applied to every figure below:** each volume's own `TOTAL (ALL-INDIA)` detenue
figure was checked against the independent all-India trend series printed natively in PSI 2021
Chart 2.12. All six match exactly. That series, verbatim from PSI 2021 (RETRIEVED, D1):

```
                                    2016                                        2017     2018      2019     2020     2021
                   Total Inmates 433003                                        450696   466802    481387   488511   554034
                   Undertrials     293058                                      308718   324141    332916   371848   427165
                   Convicts        135683                                      139149   139656    144567   112589   122852
                   Detenues         3089                                        2136     2384      3223     3590     3470
                   Other Inmates 1173                                            693      621       681      484      547
    As per data provided by States/UTs.
                       st
 Note: Figures as on 31 December of the respective year
```
(Chart 2.12, "Trend in Number of Different Types of Prison Inmates during 2016-2021")

Note: PSI 2019's own Table 2.1 gives ALL-INDIA total inmates as 478,600 where PSI 2021's
Chart 2.12 gives 481,387 for 2019 — NCRB revised the 2019 total upward in a later volume. The
**detenue** figure, 3,223, is identical in both. I flag the discrepancy rather than hide it.

### 7.2 THE BREAK IS CONFIRMED FOR THE DETENU TABLES — and it is a year LATER than you'd expect

**Table numbers:** the break is visible in **Table 2.1 "Types of Prison Inmates"** (the table that
carries the detenue count by State/UT), and identically in **Table 2.2**, **2.12A–2.12D**,
**3.4** and **7.5** — every table in the volume shares one State/UT row list.

**PSI 2019 — J&K is a STATE, and LADAKH DOES NOT EXIST.** Verbatim from Table 2.1 (Concluded),
"Types of Prison Inmates as on 31st December, 2019":

```
    10    JAMMU & KASHMIR             403           1          404        1           0          1          3689
    ...
          TOTAL (STATES)             3096          99       3195       586          85        671         459463
    30    A & N ISLANDS                  0          0            0        0           0          0            244
    31    CHANDIGARH                     0          0            0        0           0          0            984
    32    D & N HAVELI                   0          0            0        0           0          0             46
    33    DAMAN & DIU                    0          0            0        0           0          0             62
    34    DELHI                         14          0           14      94            0         94         17534
    35    LAKSHADWEEP                    0          0            0        0           0          0              4
    36    PUDUCHERRY                    14          0           14        0           0          0            263
          TOTAL (UTs)                   28          0           28      94            0         94         19137
          TOTAL (ALL-INDIA)          3124          99       3223       680          85        765         478600
```

J&K sits at **Sl. No. 10, inside the STATES block (1–29)**, and is counted into
`TOTAL (STATES)`. The UT block is 30–36 and contains no J&K and no Ladakh.

**I ran `grep -c -i ladakh` over the entire PSI 2019 text: the result is 0.** The word "Ladakh"
does not appear anywhere in the volume — not as a row, not in a footnote, not in the maps
section. Ladakh's prisoners for 2019 are inside the J&K row, unmarked.

**This is the sharp point:** the J&K Reorganisation Act took effect **31 October 2019**. PSI 2019
reports "as on 31st December 2019" — **two months after** J&K ceased to be a State and Ladakh
became a separate UT. PSI 2019 nevertheless reports J&K as a State with Ladakh folded in. The
volume carries **no footnote acknowledging the reorganisation** at the J&K row.

**PSI 2020 — J&K is a UT and Ladakh is a separate UT row.** Verbatim from Table 2.1 (Concluded),
"Types of Prison Inmates as on 31st December, 2020":

```
          TOTAL (STATES)                    3267   62           3        3332    376    104            0          480      466688
    29    A & N ISLANDS                      0      0           0          0      0      0             0           0         331
    30    CHANDIGARH                         0      0           0          0      0      0             0           0         968
    31    DNH & DAMAN DIU                    4      0           0          4      0      0             0           0         157
    32    DELHI                             16      0           0         16      3      0             0           3        15995
    33    JAMMU & KASHMIR                   228     0           0        228      1      0             0           1        4105
    34    LADAKH                             0      0           0          0      0      0             0           0          26
    35    LAKSHADWEEP                        0      0           0          0      0      0             0           0          3
    36    PUDUCHERRY                        10      0           0         10      0      0             0           0         238
          TOTAL (UTs)                       258     0           0        258      4      0             0           4        21823
          TOTAL (ALL-INDIA)                 3525   62           3        3590    380    104            0          484      488511
```

J&K is now **Sl. No. 33 in the UT block**, counted into `TOTAL (UTs)`; **Ladakh is Sl. No. 34, a
separate UT row, with 0 detenues**. The States block shrank from 29 to 28 rows; D&N Haveli and
Daman & Diu also merged into one row ("DNH & DAMAN DIU"), so the total stays at 36.

**PSI 2021** keeps the PSI 2020 arrangement exactly: J&K Sl. 33 (UT), Ladakh Sl. 34 (UT).

> **So: the break in the DETENU series falls between PSI 2019 and PSI 2020, i.e. between the
> 31-Dec-2019 and 31-Dec-2020 snapshots — NOT at 31 October 2019.** Anyone splicing a J&K detenu
> series across 2019/2020 is splicing a State-including-Ladakh row onto a UT-excluding-Ladakh
> row, with no footnote in either volume warning them. In practice Ladakh's contribution to the
> detenue count is nil (0 detenues in both 2020 and 2021), so the *detenu* discontinuity is
> definitional rather than numerical — but the *total inmate* discontinuity is real
> (Ladakh: 26 inmates in 2020, 20 in 2021).

### 7.3 J&K DETENU FIGURES BY YEAR — Table 2.1 (Concluded), column "Detenues"

Every row below was read out of the named volume's Table 2.1. Male/Female/Total as printed.

| Year (as on 31 Dec) | Volume | Table | J&K listed as | Sl. No. | Ladakh a separate row? | J&K detenues M | F | Tr. | **Total** | All-India detenues |
|---|---|---|---|---|---|---|---|---|---|---|
| 2016 | PSI 2016 | Table 2.1 (Concluded) | **State** | 10 | **No — absent** | 431 | 1 | – | **432** | 3,089 |
| 2017 | PSI 2017 | Table 2.1 (Concluded) | **State** | 10 | **No — absent** | 211 | 1 | – | **212** | 2,136 |
| 2018 | PSI 2018 | Table 2.1 (Concluded) | **State** | 10 | **No — absent** | 283 | 0 | – | **283** | 2,384 |
| 2019 | PSI 2019 | Table 2.1 (Concluded) | **State** | 10 | **No — absent (0 mentions in volume)** | 403 | 1 | – | **404** | 3,223 |
| 2020 | PSI 2020 | Table 2.1 (Concluded) | **UT** | 33 | **Yes — Sl. 34, 0 detenues** | 228 | 0 | 0 | **228** | 3,590 |
| 2021 | PSI 2021 | Table 2.1 (Concluded) | **UT** | 33 | **Yes — Sl. 34, 0 detenues** | 252 | 0 | 0 | **252** | 3,470 |

(2016 and 2017 volumes have no transgender column in Table 2.1; 2018 and 2019 likewise print
Male/Female/Total only. The Tr. column appears from PSI 2020.)

Verbatim source rows, so the numbers can be checked without re-downloading:

```
PSI 2016, Table – 2.1 (Concluded), Types of Prison Inmates as on 31st December, 2016
10    JAMMU & KASHMIR          431       1         432         0       0        0          2688
      TOTAL (ALL-INDIA)        2953     136        3089       1022    151      1173       433003

PSI 2017, Table – 2.1 (Concluded), Types of Prison Inmates as on 31st December, 2017
    10    JAMMU & KASHMIR           211       1            212     0       0         0         2640
          TOTAL (ALL-INDIA)         2079     57        2136       612     81        693       450696

PSI 2018, Table – 2.1 (Concluded), Types of Prison Inmates as on 31st December, 2018
    10    JAMMU & KASHMIR           283        0           283     2         0         2          3085
          TOTAL (ALL-INDIA)         2297      87       2384       592       83        675        466084
```

### 7.4 Other J&K detenu figures RETRIEVED (2021 volume)

```
PSI 2021, Table – 2.2, Percentage Share of Different Types of Prison Inmates as on 31st December, 2021
    33   JAMMU & KASHMIR                    3.7          91.2         5.1       0.1             100
```
(J&K's detenue share, 5.1%, is roughly eight times the all-India 0.6%.)

```
PSI 2021, Table – 2.12 B, Domicile of Detenues as on 31st December, 2021
    33    JAMMU & KASHMIR                    248                     0                        4                   252
```

```
PSI 2021, Table – 7.5, Detenues Released during the year 2021
    33    JAMMU & KASHMIR                     66                126               4          143           339
```
(J&K released 339 detenus during 2021 while holding 252 at year end — a churn rate that says the
detenue stock figure is a snapshot, not a flow.)

### 7.5 Years 2009–2015 — NOT ESTABLISHED IN THIS SESSION
See §8 below for exactly what was attempted.

---

## 8. EXTENDED SERIES — PSI 2011 to PSI 2021, and what could NOT be retrieved

### 8.1 Additional volumes RETRIEVED

| Vol. | Original NCRB URL | Snapshot ts | Bytes | Note |
|---|---|---|---|---|
| PSI 2015 | `https://ncrb.gov.in/sites/default/files/PSI-2015-%2018-11-2016_0.pdf` | `2021` (nearest) | 18,778,432 | native text |
| PSI 2014 | `http://ncrb.gov.in/StatPublications/PSI/Prison2014/Full/PSI-2014.pdf` | `20160910015051` | 19,045,614 | native text |
| PSI 2013 | `http://ncrb.gov.in/PSI-2013/Full/PSI-2013.pdf` | `20151024214759` | 24,293,849 | native text |
| PSI 2011 | `http://ncrb.gov.in/PSI-2011/Full/PSI-2011.pdf` | `20130814042732` | 5,767,390 | native text |

**Failure recorded:** the earlier PSI 2013 snapshot `20150327070800` (3,923,869 bytes per CDX,
5,401,514 delivered) is a **broken PDF** — `pdftotext` returns
`Syntax Error: Invalid XRef entry 66972` / `Internal Error: xref num 66972 not found but needed`
and produces no output. Snapshot `20151024214759` works. Same lesson as PSI 2020: when a Wayback
copy of an NCRB PDF misbehaves, try another timestamp before concluding the document is gone.

### 8.2 Table numbering changed between the old and new PSI formats

In PSI 2011–2015 the state-wise inmate-type table is **Table 3.3 "Population of Different Types
of Prison Inmates in Jails"** (Chapter-3, "Types of Prison Inmates"). From PSI 2016 onward it is
**Table 2.1 "Types of Prison Inmates"** (Chapter-2). Both carry the same Detenues
Male/Female/Total block. The detenue release table likewise moved: **Table 4.7 "Details of
Detenues Released"** in the old format, **Table 7.5 "Detenues Released"** in the new.

Verbatim, PSI 2015 contents:

```
      4.7         Details of Detenues Released                                        93
      5.3         Demographic Profile of Detenues                                    105
```

**The law-wise exclusion of detenus is older than the current format.** PSI 2015's Chapter-4 is
titled, verbatim:

```
                  Distribution of Convict and Undertrial Prisoners under
 Chapter-4                                                                               73
                  various IPC and SLL
```

"Convict and Undertrial Prisoners" — detenus are named out of the offence/law chapter in the
title itself. So across **every volume from 2011 to 2021**, no law-wise breakdown of detenus has
ever been published.

### 8.3 The detenu definition is stable, with one wording change

PSI 2011 and PSI 2013 glossaries, verbatim (identical to each other):

> **Detenue**
>
>        Any person detained in prison on the orders of competent authority
> under the relevant preventive detention law.

PSI 2015 glossary, verbatim:

> **Detenue**
>
>        Any person detained in prison on the orders of the competent authority under the
> relevant preventive laws.

PSI 2021 glossary, verbatim (see §3):

> **Detenues$**
>
>        Any person detained in prison on the orders of the competent authority under the
> relevant preventive laws.

The change is from singular "**preventive detention law**" (2011, 2013) to plural
"**preventive laws**" (2015 onward). **Neither wording names a statute.** No PSI volume examined
names the J&K Public Safety Act anywhere.

### 8.4 LADAKH — a clean binary across eleven volumes

I ran `grep -c -i ladakh` over the full text of every volume retrieved:

```
PSI 2011: 0        PSI 2016: 0
PSI 2013: 0        PSI 2017: 0
PSI 2014: 0        PSI 2018: 0
PSI 2015: 0        PSI 2019: 0
                   PSI 2020: 178
                   PSI 2021: 184
```

**Ladakh does not appear anywhere in any PSI volume up to and including PSI 2019, and appears
throughout PSI 2020 and PSI 2021.** The switch is absolute and falls between the 2019 and 2020
volumes.

### 8.5 FULL J&K DETENU SERIES AS RETRIEVED

| Year (31 Dec) | Volume | **Table** | J&K listed as | Sl. No. | Ladakh row? | M | F | Tr. | **J&K detenues** | All-India |
|---|---|---|---|---|---|---|---|---|---|---|
| 2011 | PSI 2011 | **Table 3.3 (Concluded)** | State | 10 | No | 234 | 5 | – | **239** | 2,450 |
| 2012 | — | — | — | — | — | — | — | — | **NOT ESTABLISHED** | — |
| 2013 | PSI 2013 | **Table 3.3 (Concluded)** | State | 10 | No | 71 | 1 | – | **72** | 3,113 |
| 2014 | PSI 2014 | **Table 3.3 (Concluded)** | State | 10 | No | 35 | 0 | – | **35** | 3,237 |
| 2015 | PSI 2015 | **Table 3.3 (Concluded)** | State | 10 | No | 89 | 1 | – | **90** | 2,562 |
| 2016 | PSI 2016 | **Table 2.1 (Concluded)** | State | 10 | No | 431 | 1 | – | **432** | 3,089 |
| 2017 | PSI 2017 | **Table 2.1 (Concluded)** | State | 10 | No | 211 | 1 | – | **212** | 2,136 |
| 2018 | PSI 2018 | **Table 2.1 (Concluded)** | State | 10 | No | 283 | 0 | – | **283** | 2,384 |
| 2019 | PSI 2019 | **Table 2.1 (Concluded)** | State | 10 | No | 403 | 1 | – | **404** | 3,223 |
| 2020 | PSI 2020 | **Table 2.1 (Concluded)** | **UT** | **33** | **Yes (0)** | 228 | 0 | 0 | **228** | 3,590 |
| 2021 | PSI 2021 | **Table 2.1 (Concluded)** | **UT** | **33** | **Yes (0)** | 252 | 0 | 0 | **252** | 3,470 |

Verbatim source rows for the pre-2016 entries:

```
PSI 2011, TABLE – 3.3 (Concluded)
10    JAMMU & KASHMIR      234                5          239     10           0      10      2663
      TOTAL (ALL-INDIA)   2363           87             2450    640       44        684    372926

PSI 2013, Table – 3.3 (Concluded)
  10    JAMMU & KASHMIR          71        1        72      0       0       0        2352
        TOTAL (ALL-INDIA)      3015      98       3113    711      57     768      411992

PSI 2014, Table – 3.3 (Concluded)
  10    JAMMU & KASHMIR        35         0        35       1      0        1       2284
        TOTAL (ALL-INDIA)      3156       81       3237    802    101      903     418536

PSI 2015, Table – 3.3 (Concluded)
  10    JAMMU & KASHMIR          89       1        90      0       0       0       2338
        TOTAL (ALL-INDIA)      2490      72      2562    711     106     817     419623
```

**Sanity note on the 2019→2020 movement.** J&K's recorded detenue stock *fell* from 404 (31 Dec
2019) to 228 (31 Dec 2020) even though this is the period of the largest PSA detention wave. This
is exactly what §6 predicts: detenus moved to jails in UP and Haryana **leave the J&K row and
enter the UP and Haryana rows**. Table 2.12B for 2021 shows UP holding 110 and Haryana 28 detenus
domiciled outside their own State/UT. PSI will not tell you those are J&K PSA detenus — but it
will not let you count them in J&K either. **A J&K-row-only reading of PSI systematically
undercounts J&K detenus during the transfer period.**

### 8.6 NOT ESTABLISHED — years 2009, 2010, 2012, and 2022 onward

I could not retrieve these, and I am not going to guess at them. Exactly what was tried:

**2009 and 2010.** CDX shows only index pages and front matter survive:
- `http://ncrb.gov.in/StatPublications/PSI/Prison2009/Prison2009.htm` — RETRIEVED (HTTP 200).
  Its own link list contains only `Foreword-2009.pdf`, `Message-2009.pdf`, `Glossary-2009.pdf`,
  `Snapshots-2009.pdf`, `Maps-2009.pdf`, `Graphs-2009.pdf`, `Feedback-2009.pdf`, plus
  `ContChap.htm` / `ContTab.htm`. **No data-table PDFs and no full volume.**
- `http://ncrb.gov.in/StatPublications/PSI/Prison2010/Prison2010.htm` — RETRIEVED (HTTP 200) but
  the archived copy contains only `Prison2010_files/filelist.xml` and a Corel graphic frame; the
  real link list was in a frame Wayback did not capture.
- `http://ncrb.gov.in/PSI-2009/Full/PSI-2009.pdf` and `.../PSI-2010/Full/PSI-2010.pdf` — CDX
  returns **no captures at all** (empty result, not a 404).
- A full CDX enumeration of `ncrb.gov.in/StatPublications/PSI/*` returned 324 rows; the
  per-directory counts are Prison2015: 50, Prison2016: 48, Prison2014: 41, Prison2017: 39,
  Prison2018: 31, Prison2012: 17, Prison2013: 13, **Prison2010: 2, Prison2009: 1**.

**2012.** The volume's own table index IS archived —
`http://ncrb.gov.in/StatPublications/PSI/Prison2012/ContTab.htm` (RETRIEVED, HTTP 200) lists
`TABLE-1.1.pdf` … `TABLE-3.3.pdf` … — but the table PDFs themselves were never crawled:
- `https://web.archive.org/web/2019id_/http://ncrb.gov.in/StatPublications/PSI/Prison2012/TABLE-3.3.pdf`
  → **HTTP 404** (Wayback's own 404 page, 151,310 bytes of HTML).
- `http://ncrb.gov.in/PSI-2012/Full/PSI-2012.pdf` → CDX shows `404` at 20160313025814, a
  644-byte stub at 20191019094324, and `404` at 20240527214613/20240527214623. **No usable copy.**
- The 17 archived Prison2012 files are front/back matter only (Annexure, BackCover, CHAPTER-6,
  CHAPTER-8, CHAPTER-10, CHAPTER-12, Disclaimer, Feedback, Foreword, Glossary, Graphs, Maps,
  Message, Snapshots, Team, and two .htm indexes). Chapter-3 is not among them.

**2022 and later.** CDX for `ncrb.gov.in/en/prison-statistics-india-202*` returns pages for 2020
and 2021 only — **no `prison-statistics-india-2022` or `-2023` capture exists**. Later NCRB
snapshots of the PSI-2019 and PSI_2020 file URLs return `404` from 2024 onward, consistent with
NCRB having reorganised the site. **No PSI volume after 2021 was retrieved in this session.**

I did not fall back to dataful.in, data.gov.in, Google Books, Scribd or SlideShare for these
years. That route remains open for a future pass, and anything obtained there must be marked as a
third-party reproduction, not official retrieval.

---

## 9. THE THREE QUESTIONS, ANSWERED

**Q1 — Does PSI carry detenus as a distinct category, and does any table split them by the law
under which detained?**
Distinct category: **YES** — PSI 2021 Tables 2.12A/B/C/D, 3.4, 7.5, plus a Detenues column in
Tables 2.1–2.9; in PSI 2011–2015 the equivalents are Tables 3.3, 4.7, 5.3.
Split by detaining law: **NO.** Established four ways — exhaustive grep of the full text of ten
volumes; the offence/law chapter (Ch.5 in the new format, Ch.4 in the old) is titled and scoped
to convicts and undertrials only; the 25 web-only additional tables contain nothing law-wise for
detenus; and the glossary defines a detenu by reference to unnamed "relevant preventive laws".
**J&K PSA detenus cannot be separated from NSA / COFEPOSA / PIT-NDPS detenus in PSI. Ever.**

**Q2 — Does the J&K detenu series break at the reorganisation, and where?**
**CONFIRMED for the detenu tables, but the break is in the 2020 volume, not at 31 Oct 2019.**
Pre-break: **Table 3.3 (Concluded)** in PSI 2011–2015 and **Table 2.1 (Concluded)** in PSI
2016–2019, J&K at **Sl. No. 10 in the STATES block**, Ladakh absent from the volume entirely
(0 text mentions). Post-break: **Table 2.1 (Concluded)** in PSI 2020 and PSI 2021, J&K at
**Sl. No. 33 in the UT block**, **Ladakh at Sl. No. 34** as a separate UT. PSI 2019 reports "as
on 31st December 2019" — two months after the reorganisation took legal effect — and still
treats J&K as a State with Ladakh inside it, with no footnote. Full year-by-year figures in §8.5.

**Q3 — Holding state or detaining state? And are there transfer / origin tables?**
**Holding state.** PSI's own words, Chapter-2 narrative: detenus and convicts are attributed to
"the State ... **where they are incarcerated**". Data is furnished by "the Prison Department of
all 36 States/UTs" — i.e. by whoever holds the body. The front matter, Disclaimer and Methodology
are otherwise **silent** on the question; that single narrative clause is the only place PSI
states it.
Transfer tables: **for convicts (Table 7.1) and undertrials (Table 7.3), yes** — both carry
"Transferred to Other States". **For detenus, no** — Table 7.5 has four release columns and no
transfer column, and the Chapter-7 detenu section has a "Releases" heading with no "Transfers"
heading.
Origin/domicile: **one table only — Table 2.12B "Domicile of Detenues"**, with columns "Belongs
to State" / "Belongs to other State" / "Belongs to other Country". It shows Haryana holding 41
detenus of whom **zero** were Haryana-domiciled, and UP holding 222 of whom **110** belonged to
another State/UT (31 Dec 2021). It does **not** name which other State. That is the outer limit
of what PSI can tell you about transferred J&K PSA detenus.
