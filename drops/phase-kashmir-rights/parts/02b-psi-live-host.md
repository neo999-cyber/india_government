# PSI via the LIVE HOST (ncrb.gov.in) — retrieval log and findings

Agent: live-host + non-archive-mirror track. Model serving: **claude-opus-5**.
Date of retrieval: 2026-08-03.

---

## 0. REACHABILITY REPORT — ncrb.gov.in IS REACHABLE (with a workaround)

Everything below is what I actually ran, with exact results.

| # | Attempt | Result |
|---|---|---|
| 1 | `curl -sIL -m 30 -A "Mozilla/5.0 ... Chrome/120.0 Safari/537.36" https://www.ncrb.gov.in/en/prison-statistics-india` | **CURL_EXIT=6** (could not resolve host), http=000 |
| 2 | `curl -sIL ... https://www.ncrb.gov.in/uploads/nationalcrimerecordsbureau/custom/psiyearwise2022/1701613297PSI2022ason01122023.pdf` | **CURL_EXIT=6**, http=000 |
| 3 | `curl -sIL ... https://ncrb.gov.in/` | **CURL_EXIT=6**, http=000 |
| 4 | `curl -sI https://www.mha.gov.in/` (control) | **http=301**, exit 0 — network is fine |
| 5 | `curl -sI https://www.google.com/` (control) | **http=200**, exit 0 |
| 6 | `dig +short www.ncrb.gov.in` (system resolver) | `;; connection timed out; no servers could be reached` |
| 7 | `dig +short @8.8.8.8 www.ncrb.gov.in` | `;; connection timed out; no servers could be reached` |
| 8 | `dig +short @1.1.1.1 ncrb.gov.in` | **`45.127.74.245`** ← BREAKTHROUGH |
| 9 | `dig +short @1.1.1.1 www.ncrb.gov.in` | **`45.127.74.245`** |
| 10 | `curl -sIL --resolve ncrb.gov.in:443:45.127.74.245 --resolve www.ncrb.gov.in:443:45.127.74.245 https://ncrb.gov.in/` | **http=200** |

### THE WORKAROUND (reusable by any agent on this machine)

The failure is **DNS-only, not network and not blocking**. The system resolver and 8.8.8.8
both time out for `ncrb.gov.in`; **1.1.1.1 resolves it to `45.127.74.245`**. Forcing that
address with `--resolve` gives full HTTP 200 access to the whole site.

```
curl -sL -m 300 \
  --resolve www.ncrb.gov.in:443:45.127.74.245 \
  --resolve ncrb.gov.in:443:45.127.74.245 \
  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" \
  -o OUT.pdf "<ncrb url>"
```

The browser User-Agent is *not* what fixes it — the `--resolve` is. Archive.org is therefore
**not required** for the live volumes.

### What I RETRIEVED off the live host with this method

- `https://www.ncrb.gov.in/uploads/nationalcrimerecordsbureau/custom/psiyearwise2022/1701613297PSI2022ason01122023.pdf`
  → **http=200, application/pdf, 25,747,066 bytes, 352 pages.** This is the **full English
  PSI-2022 volume** ("Prison Statistics India 2022", as on 01/12/2023). Text extracted with
  `/opt/homebrew/bin/pdftotext -layout` → 16,518 lines. **RETRIEVED and read.**
- `https://www.ncrb.gov.in/prison-statistics-india-year-wise.html?year=2018|2019|2020|2021|2022|2023`
  → all **http=200**. **RETRIEVED.** (Note: `https://www.ncrb.gov.in/en/prison-statistics-india`
  returns **http=404** — that path is dead; the working path is the `.html?year=` one.)

---

## Q1 — DETENUS AS A CATEGORY, AND ANY LAW-WISE SPLIT

### Q1a. Yes — detenus are a distinct inmate category. RETRIEVED (PSI-2022).

PSI-2022 Chapter 2 is titled **"Prisoners – Types and Demography"**. Verbatim from its
opening text (RETRIEVED, PSI-2022 p.~43):

> "Prison inmates lodged in various jails are categorised as Convicts, Undertrials and
> Detenues. A convict is a person found guilty of a crime and sentenced by a court of law
> and person serving a sentence in prison. An Undertrial is a person who is currently on
> trial in a court of law. A detenue is any person held lawfully in custody. However,
> 'Other' category refers to any person other than above mentioned categories."

All-India 2022 figures, verbatim from the same chapter (RETRIEVED):

> "The number of Convicts, Undertrial inmates and Detenues were reported as 1,33,415,
> 4,34,302 and 4,324 respectively accounting for 23.3%, 75.8% and 0.8% respectively at the
> end of 2022."

**Detenu-bearing tables in PSI-2022** (from the volume's own Table of Contents, RETRIEVED):

| Table | Title | Page |
|---|---|---|
| 2.1 | Types of Prison Inmates | 45-46 |
| 2.2 | Percentage Share of Different Types of Prison Inmates | 47 |
| 2.3–2.9 | Types of Prison Inmates in Central / District / Sub- / Women / Borstal / Open / Special Jails | 48-60 |
| **2.12A** | **Education Profile of Detenues** | 69 |
| **2.12B** | **Domicile of Detenues** | 70 |
| **2.12C** | **Religion of Detenues as on 31st December, 2022** | 71 |
| **2.12D** | **Caste of Detenues as on 31st December, 2022** | 72 |
| 2.16 | Category-wise Female Inmates in Different Jails | 79 |
| 2.18 / 2.19 | Indian & Foreign Inmates / Female Inmates by Age-group | 81 |
| 2.20 | Inmates admitted during the year | 82 |
| **3.4** | **Detenues (Indian Prisoners) in Jails by Gender and Age-groups** | 96-97 |
| **7.5** | **Detenues Released** | 174 |

Plus, on the NCRB portal but **not in the printed volume**, the volume's own
"List of Additional Tables of Prison Statistics India-2022 on NCRB Portal" (RETRIEVED,
Methodology section, para B) names:
> "Distribution of Foreigner Detenues in Jails by Gender and Age-groups as on [31st December 2022]"
and
> "Age-group wise Percentage of Foreign Detenues to Total Foreign Detenues as on [...]"

### Q1b. The relayed definitional fragment is **VERIFIED**, verbatim. RETRIEVED.

Two separate texts in PSI-2022 define detenu.

**(i) The GLOSSARY entry** (RETRIEVED, PSI-2022 Glossary, at the back of the volume) — verbatim:

> **Detenues$**
>
> "Any person detained in prison on the orders of the competent authority under the
> relevant preventive laws."

(The `$` superscript is PSI's own marker on glossary terms — it also appears on
"Prisoner$", "Open Jail$", "Habitual Offenders$", "Medical Officer$".)

**(ii) The TABLE NOTE** — the fragment you were given. It is real. It appears **once** in
the whole 352-page volume (a single grep hit, line 5477 of the extracted text), printed as
a footnote on the page carrying **Table 2.18 and Table 2.19** (p.81, "Indian & Foreign
Inmates by Age-group" / "Indian & Foreign Female Inmates by Age-group"). Verbatim:

> "Note: Detenues includes inmates detained under preventive laws such as COFEPOSA, NDPS,
> NSA, PSA, PITNDPS, PBMSECA etc."

**VERDICT: VERIFIED, not refuted.** Your relayed fragment matches PSI-2022 word for word,
including the "etc." Two caveats worth carrying:
1. It is an **illustrative list, not an enumeration** — "such as ... etc." PSI never states
   the closed set of laws.
2. It is a **footnote on one page only** (2.18/2.19), not a global front-matter definition.
   The volume's authoritative Glossary entry (i, above) does **not** name any law — it says
   only "the relevant preventive laws".

### Q1c. **NO PSI TABLE, IN ANY VOLUME I READ, SPLITS DETENUS BY THE LAW OF DETENTION.**

**This is a firm negative finding, and here is exactly how I established it.**

1. I read the **complete printed Table of Contents of PSI-2022** (RETRIEVED, pp. i–v, all of
   Chapters 1–12 plus Glossary). Every table title is listed above and in the volume. The
   only detenu-specific tables are 2.12A–2.12D (education / **domicile** / religion / caste),
   3.4 (gender & age-group), and 7.5 (releases). **None is law-wise.**
2. The volume's **own list of "Additional Tables ... on NCRB Portal"** (RETRIEVED,
   Methodology para B) — i.e. the tables NCRB publishes *beyond* the printed volume —
   contains no law-wise detenu table either. The only two detenu entries there are the two
   *foreigner* detenu tables quoted above.
3. **Chapter 5 is the only law-wise chapter in PSI**, and it excludes detenus by design.
   Its full table list (RETRIEVED) is:
   - 5.1 Convicts by Type of Offences under IPC
   - 5.2 Convicts by Type of Offences under Special and Local Laws
   - 5.3 Undertrial Prisoners by Type of Offences under IPC
   - 5.4 Undertrial Prisoners by Type of Offences under Special and Local Laws
   - 5.5 Incidence of Recidivism

   **There is no 5.x table for detenues.** The offence/law breakdown in PSI exists for
   convicts and undertrials **only**. This is structural, not an omission in one year:
   a detenu is not charged with an "offence", so PSI's offence-wise machinery never
   touches them.
4. I also grepped the entire 352-page extracted text of PSI-2022 for `COFEPOSA`,
   `PITNDPS`, `PIT-NDPS`, `National Security Act`, `Public Safety Act`, `preventive`.
   **Total hits: four.** Two are the definitional texts quoted above (the 2.18/2.19
   footnote and the Glossary entry); one is an unrelated line about diabetic prisoners;
   one is the Glossary phrase "relevant preventive laws". **The strings "COFEPOSA",
   "NSA", "PSA" and "PITNDPS" appear in PSI-2022 exactly once each — inside that single
   footnote — and never as a row or column label in any table.**

**Consequence for this project:** *J&K Public Safety Act detenus cannot be separated from
NSA / COFEPOSA / PIT-NDPS / PBMSECA detenus using PSI.* PSI gives you one undifferentiated
"Detenues" count per State/UT. The law-wise split does not exist in the source. Any
"PSA detenu" series built from PSI is an inference, not a measurement, and must be
declared as such.

---

## Q2 — DOES THE J&K DETENU SERIES BREAK? YES — BUT **ONE VOLUME LATER THAN YOU EXPECT.**

All figures below are **RETRIEVED** — I downloaded and read each table PDF from
ncrb.gov.in myself via the `--resolve` route.

### The finding, stated sharply

The J&K reorganisation took legal effect on **31 October 2019**. **PSI-2019 does not
reflect it.** PSI-2019 reports J&K **as a State**, at **Sl. No. 10**, inside
**TOTAL (STATES)**, "as on 31st December, 2019" — i.e. **two months after** J&K ceased
to be a State. There is **no Ladakh row anywhere in PSI-2019** (grep for "LADAKH" over the
full extracted Table 2.1: **0 hits**). PSI-2019's UT list is the old seven:
A & N Islands, Chandigarh, D & N Haveli, Daman & Diu, Delhi, Lakshadweep, Puducherry.

**The break lands between the PSI-2019 and PSI-2020 volumes**, not at 31 Oct 2019. In
**PSI-2020** J&K moves to **Sl. No. 33 inside TOTAL (UTs)** and **Ladakh appears as a
separate UT at Sl. No. 34**. (D & N Haveli and Daman & Diu also merge into one row,
"DNH & DAMAN DIU", in the same volume — a second, simultaneous break in the UT list.)

So: **the reorganisation is absorbed into PSI at the 2020 volume. The 2019 datapoint is a
"State" datapoint that already covers a period in which J&K was a UT for two of its twelve
months.** That mixed-status year is the real discontinuity and should be flagged, not
smoothed.

### Table numbers I actually checked

| Volume | Table checked | Table title (verbatim) |
|---|---|---|
| PSI-2009 / 2010 / 2011 | **Table 3.3 (Concluded)** | "POPULATION OF DIFFERENT TYPES OF PRISON INMATES IN JAILS AT THE END OF <year>" |
| PSI-2016 / 2017 / 2018 / 2019 | **Table 2.1 (Concluded)** | "Types of Prison Inmates as on 31st December, <year>" |
| PSI-2020 / 2021 / 2022 | **Table 2.1 (Concluded)** | "Types of Prison Inmates as on 31st December, <year>" |
| PSI-2022 | **Table 2.12B** | "Domicile of Detenues as on 31st December, 2022" |
| PSI-2022 | **Table 7.5** | "Detenues Released during the year 2022" |

Note a **second, earlier break** nobody has flagged: the detenu table is **Table 3.3 in
Chapter 3 ("Types of Prison Inmates") in the 2009–2011 volumes**, and **Table 2.1 in
Chapter 2 ("Prisoners – Types and Demography") from 2016**. The chapter was renumbered
somewhere in 2012–2015 (I have not yet pinned the exact year — see gaps). Anyone citing
"PSI Table 2.1" for 2009–2011 is citing a table number that did not then exist.

### J&K DETENU SERIES — every figure RETRIEVED, with its source

| As on 31 Dec | Volume | Table | J&K listed as | Sl. No. | Male | Female | **Total detenues** | Ladakh row? |
|---|---|---|---|---|---|---|---|---|
| 2009 | PSI-2009 | 3.3 (Concluded) | **STATE** | 10 | 181 | 1 | **182** | no |
| 2010 | PSI-2010 | 3.3 (Concluded) | **STATE** | 10 | 394 | 15 | **409** | no |
| 2011 | PSI-2011 | 3.3 (Concluded) | **STATE** | 10 | 234 | 5 | **239** | no |
| 2012 | — | — | — | — | — | — | *not established (see gaps)* | — |
| 2013 | — | — | — | — | — | — | *not established* | — |
| 2014 | — | — | — | — | — | — | *not established* | — |
| 2015 | — | — | — | — | — | — | *not established* | — |
| 2016 | PSI-2016 | 2.1 (Concluded) | **STATE** | 10 | 431 | 1 | **432** | no |
| 2017 | PSI-2017 | 2.1 (Concluded) | **STATE** | 10 | 211 | 1 | **212** | no |
| 2018 | PSI-2018 | 2.1 (Concluded) | **STATE** | 10 | 283 | 0 | **283** | no |
| 2019 | PSI-2019 | 2.1 (Concluded) | **STATE** | 10 | 403 | 1 | **404** | **no** |
| 2020 | PSI-2020 | 2.1 (Concluded) | **UT** | 33 | 228 | 0 | **228** | **yes, Sl. 34 = 0** |
| 2021 | PSI-2021 | 2.1 (Concluded) | **UT** | 33 | 252 | 0 | **252** | **yes, Sl. 34 = 0** |
| 2022 | PSI-2022 | 2.1 (Concluded) | **UT** | 33 | 538 | 8 | **546** | **yes, Sl. 34 = 0** |

(From PSI-2020 onward the table gains a third gender column, "Tr."; J&K's Tr. count is 0 in
2020, 2021 and 2022.)

### Does Ladakh have prisons at all?

**Yes — Ladakh has prisons and prisoners, but has reported ZERO detenus every year since
it was split out.** RETRIEVED from Table 2.1 of each volume:

| As on 31 Dec | Ladakh convicts | Ladakh undertrials | Ladakh detenues | Ladakh total inmates |
|---|---|---|---|---|
| 2020 | 5 | 21 | **0** | 26 |
| 2021 | 4 | 16 | **0** | 20 |
| 2022 | 4 | 26 | **0** | 30 |

So Ladakh is a *real* reporting unit with its own small prison population — it is not a
placeholder. The pre-2020 J&K figures include this Ladakh territory; the post-2020 ones do
not. Given Ladakh's totals (20–30 inmates, 0 detenus), the **detenu** series is barely
affected by the Ladakh excision in level terms — but the **denominator** (total inmates) is,
and the row identity changes from State to UT.

### Does the detenu table break the same way as Table 8.1?

**The same way, yes — because it is the same State/UT list.** Table 2.1 and Table 8.1 sit in
the same volume and are generated from the same 36-unit State/UT frame (28 states +
8 UTs from PSI-2020; 29 states + 7 UTs before). The row-ordering change (J&K from Sl. 10
among States to Sl. 33 among UTs, Ladakh added at Sl. 34) is a volume-wide change, not a
per-table one. **I verified this directly on Table 2.1 for every year in the table above.**
I did **not** separately re-verify Table 8.1 — I am relying on your prior work for 8.1 and on
the structural fact that the State/UT frame is shared. *Marked as: verified for 2.1
(RETRIEVED); asserted-by-shared-frame for 8.1.*

---

## Q3 — HOLDING STATE vs DETAINING STATE. **PSI COUNTS BY HOLDING STATE. CONFIRMED.**

This is the most consequential answer, and PSI settles it in its own words and its own
column headers.

### Q3a. The unit of account is the **prison's** State/UT — the HOLDING state.

**Evidence 1 — the data-collection rule, RETRIEVED verbatim from PSI-2022's Methodology
(front matter, section A.1, "Action by States/UTs Prisons Department"):**

> "The annual States/UTs data for 'Prison Statistics India' is furnished by the Prison
> Department of all 36 States/UTs as per the NCRB prescribed proformae through an
> Application developed by NCRB."

> "The consolidation of State level data is done by Prison Department of the concerned
> State/UT and the consolidated data is shared with NCRB."

> "First level data validation is done at the **Prison(s) level** during the data capturing
> process itself..."

And from the DISCLAIMER (RETRIEVED, p. vi), verbatim:

> "The information published in this report has been obtained from all States/UTs Prison
> Headquarters. NCRB has only compiled and collated the data and presented it in the form
> of this report."

The reporting entity is the **Prison Department / Prison Headquarters** of the State/UT, and
the unit of capture is the **prison**. A Prison Department can only count the bodies inside
its own prisons. It has no visibility of, and no proforma line for, persons detained by its
authority but lodged elsewhere. **The row is the state that holds the prisoner.**

**Evidence 2 — decisive, and it is in a table header. Table 2.12B, RETRIEVED verbatim:**

> **Table – 2.12 B**
> **Domicile of Detenues as on 31st December, 2022**
> Columns: (1) Sl. No. | (2) State/UT | (3) **Belongs to State** | (4) **Belongs to other State** | (5) **Belongs to other Country** | (6) Total

A "Domicile" table with a "**Belongs to other State**" column only makes sense if the row
is the **holding** state and the columns tell you where those held people came from. If the
row were the detaining/originating state, "belongs to other State" would be incoherent.

### Q3b. Confirm or refute: "a J&K PSA detenu in Agra Central Jail appears in Uttar Pradesh's detenu row."

**CONFIRMED — and Table 2.12B shows the footprint of exactly this.** RETRIEVED, verbatim
rows from Table 2.12B (PSI-2022):

| Sl. | State/UT | Belongs to State | **Belongs to other State** | Belongs to other Country | Total |
|---|---|---|---|---|---|
| 8 | HARYANA | 3 | **226** | 6 | 235 |
| 26 | UTTAR PRADESH | 83 | **86** | 3 | 172 |
| 33 | JAMMU & KASHMIR | 526 | 10 | 10 | 546 |
| 34 | LADAKH | 0 | 0 | 0 | 0 |
| | **TOTAL (ALL-INDIA)** | **3895** | **398** | **31** | **4324** |

Read that Haryana row again. **Haryana held 235 detenus on 31 Dec 2022. Only 3 of them
were domiciled in Haryana. 226 — 96% — "Belong to other State."** Uttar Pradesh held 172
detenus, 86 of them out-of-state. Those two states alone account for **312 of the 398
out-of-state detenus in all of India (78%)**. This is precisely the shape you would expect
from the J&K Home Department figure of 1,122 J&K detenus moved to UP and Haryana between
2018 and 2023, and from MHA's 4 Dec 2019 Rajya Sabha answer.

**So yes: a J&K PSA detenu lodged in a Haryana or UP prison is counted in HARYANA's or
UTTAR PRADESH's detenu row, not in J&K's.** A J&K detenu count built by reading J&K's row
in PSI Table 2.1 **silently loses every detenu who has been moved out of the UT.** The
J&K 2022 figure of 546 is a count of *detenus held in J&K's prisons*, not a count of
*detenus held under J&K's authority*.

**Critical caveat — do NOT use 226+86 as a J&K number.** Table 2.12B's "Belongs to other
State" column **does not name the other state**. It is a single undifferentiated count. PSI
tells you Haryana held 226 out-of-state detenus; it does **not** tell you they were from
J&K. The J&K attribution is an inference from MHA/J&K Home Department documents, not from
PSI. PSI cannot close this loop by itself.

### Q3c. Does PSI have a table on inmates transferred between states, or on domicile?

**On domicile: YES, and it does carry detenus.** Table **2.12B "Domicile of Detenues"** (PSI-2022,
p. 70), plus the parallel tables **2.10B** (Domicile of Convicts), **2.11B** (Domicile of
Undertrial Prisoners) and **2.13B** (Domicile of Other Prisoners). All four use the same
three-column scheme: *Belongs to State / Belongs to other State / Belongs to other Country*.
**Granularity is the limit: origin is recorded only as "this state / some other state /
abroad", never as a named state.**

**On inter-state transfers: YES for convicts and undertrials — but NOT for detenus.** This
is a sharp asymmetry and it matters. RETRIEVED column headers, PSI-2022 Chapter 7
("Prisoners - Releases, Transfers and Movements"):

- **Table 7.1, "Convicts Released during the year 2022"** — columns (3)–(9):
  Released after Completion of Conviction Period | Released on Bail | Pre-mature Release |
  Released on Appeal | Pardons | **"Transferred to Other States"** | Other Releases.
  (All-India 2022: **711** convicts transferred to other states, 0.6% — RETRIEVED from the
  chapter's own chart.)
- **Table 7.3, "Undertrials Released / Transferred during the year 2022"** — columns (3)–(8):
  Released on Bail | Acquitted (By Lower Courts) | Released on Appeal (By Higher Courts) |
  **"Transferred to Other States"** | Extradited | Other Releases.
- **Table 7.5, "Detenues Released during the year 2022"** — columns (3)–(6):
  Released on Completion of Detention Period | Released before Completion of Detention
  Period | Released on Bail | Other Releases. **THERE IS NO "TRANSFERRED TO OTHER STATES"
  COLUMN.**

**PSI records inter-state transfer for convicts and for undertrials, and does not record it
for detenus.** The one inmate category most likely to be moved across state lines for
political reasons is the one category whose inter-state movement PSI does not capture.
That absence is itself a finding and should be stated as one.

(Worth flagging for follow-up: in Table 7.5, J&K reports **706** detenues released in 2022 —
42 on completion, 115 before completion, 9 on bail, and **540 under "Other Releases"**.
540 of 706 in an unexplained residual bucket, against a year-end stock of 546, is an
anomaly worth its own look.)

### Q3d. Is the front matter silent on the attribution rule?

**Partly silent, and the silence should be recorded.** PSI's front matter (Disclaimer,
Methodology) establishes *who reports* (State/UT Prison Headquarters) and *what is captured*
(prisons, at prison level) — which implies holding-state attribution — but **PSI nowhere
states an explicit attribution rule in words.** There is no sentence anywhere in PSI-2022
of the form "prisoners are attributed to the State/UT in which they are lodged". The
holding-state basis is established by the reporting architecture and by the Table 2.12B
column headers, **not by an express definitional statement.** Anyone relying on this should
cite the Methodology + Table 2.12B headers, not a definition, because there is no definition
to cite.

### Q3e. THE DOMICILE TIME-SERIES — the transfer footprint is visible in PSI, and it is datable

I pulled **Table 2.12B ("Domicile of Detenues")** for every year it exists in the modern
format. All RETRIEVED from ncrb.gov.in via the `--resolve` route. Source files:

- 2018 — `.../uploads/2022/July/11/custom/psi/table-psi-2.12b_0.pdf` (http=200)
- 2019 — `.../uploads/2022/July/11/custom/psi/table-psi-2.12b_2019.pdf` (http=200)
- 2020 — `.../uploads/2022/July/11/custom/psi/psi-table-2.19-2020.pdf` (http=200)
- 2021 — `.../uploads/nationalcrimerecordsbureau/custom/1670493252_TABLE 2.12B - 2021.pdf` (http=200)
- 2022 — `.../uploads/nationalcrimerecordsbureau/custom/1701951717Table212B-2022.pdf` (http=200)

**Detenues "Belonging to other State" — i.e. held in a prison outside their home state:**

| As on 31 Dec | Haryana | Uttar Pradesh | J & K | **ALL-INDIA out-of-state** |
|---|---|---|---|---|
| 2018 | 27 | **0** | 0 | 137 |
| 2019 | 27 | **188** | 0 | 359 |
| 2020 | 12 | 29 | 0 | 104 |
| 2021 | 28 | 110 | 0 | 193 |
| 2022 | **226** | 86 | 10 | 398 |

**Total detenues held (all domiciles) in the same rows:**

| As on 31 Dec | Haryana | Uttar Pradesh | J & K | Ladakh |
|---|---|---|---|---|
| 2018 | 27 | 141 | 283 | n/a (no row) |
| 2019 | 27 | 262 | 404 | n/a (no row) |
| 2020 | 20 | 101 | 228 | 0 |
| 2021 | 41 | 222 | 252 | 0 |
| 2022 | 235 | 172 | 546 | 0 |

**Three things fall out of this, and they are strong:**

1. **Uttar Pradesh's out-of-state detenu count goes 0 → 188 between 31 Dec 2018 and
   31 Dec 2019.** In 2018 UP held 141 detenus and *every one of them* was domiciled in UP.
   In 2019 UP held 262 detenus of whom **188 were domiciled in another state**. That step
   change happens in precisely the year of the August–October 2019 J&K events. PSI did not
   label it, but PSI recorded it.
2. **Haryana's detenu population is almost entirely out-of-state in every year shown:**
   27 of 27 (2018), 27 of 27 (2019), 12 of 20 (2020), 28 of 41 (2021), 226 of 235 (2022).
   Note that MHA's Rajya Sabha answer of 4 Dec 2019 — which I have only as **RELAYED** via
   your brief, I did not fetch the reply itself — states **27 J&K prisoners in Haryana**.
   **PSI-2019 Table 2.12B shows Haryana holding exactly 27 detenues, 27 of them domiciled
   outside Haryana.** That is an exact numeric match on an independently sourced figure.
   Treat it as strong corroboration that PSI's "belongs to other State" detenu column is
   capturing the J&K transfers — but note it is a coincidence of two numbers, not a linkage
   PSI itself asserts.
3. **J&K's own row shows the reciprocal:** J&K holds essentially *only* its own domiciles
   (out-of-state = 0 in 2018, 2019, 2020, 2021; 10 in 2022). J&K is a **net exporter** of
   detenus, never an importer. Its 30–31 "belongs to other Country" detenus in 2018–2019
   are foreign nationals, a separate matter.

**Bottom line for the instrument.** J&K's PSI detenu row is a *holding* count and it
undercounts J&K's *detaining* activity by an unknown but non-trivial margin. PSI gives you
the size of the out-of-state detenu pool in the receiving states (137 → 359 → 104 → 193 →
398 all-India), but **never attributes it to a sending state**. The J&K attribution has to
come from MHA / J&K Home Department documents. PSI can corroborate the shape; it cannot
close the loop.

### Q3f. THE LONG DOMICILE BASELINE (2009→2022) — and a second table-number break

The detenu domicile table **also changes number in 2016**. Pre-2016 it is
**Table 5.3 (Concluded)**, in the old Chapter 5 (educational / religious / caste / domicile
status); from 2016 it is **Table 2.12B**. Same three columns throughout:
*Belongs to State / Belongs to other State / Belongs to other Country*.

All RETRIEVED (2009/2010/2011/2014/2015 from the full-volume PDFs at
`.../uploads/2022/July/11/custom/psi/psi-full-report-<year>.pdf`, http=200; 2018–2022 from
the per-table PDFs listed in Q3e).

**Detenues by domicile — Haryana, UP, J&K, and the all-India out-of-state total:**

| As on 31 Dec | Table | Haryana total (of which out-of-state) | UP total (of which out-of-state) | J&K total (own / other State / other Country) | All-India out-of-state |
|---|---|---|---|---|---|
| 2009 | 5.3 (Concl.) | **0** (0) | 294 (5) | 182 = 124 / 2 / 56 | 49 |
| 2010 | 5.3 (Concl.) | **0** (0) | 238 (8) | 409 = 302 / 3 / 104 | 34 |
| 2011 | 5.3 (Concl.) | **0** (0) | 213 (4) | 239 = 130 / 7 / 102 | 39 |
| 2014 | 5.3 (Concl.) | **0** (0) | 132 (4) | 35 = 7 / 0 / 28 | 252 |
| 2015 | 5.3 (Concl.) | **0** (0) | 153 (3) | 90 = 54 / 0 / 36 | 221 |
| 2018 | 2.12B | **27 (27)** | 141 (**0**) | 283 = 253 / 0 / 30 | 137 |
| 2019 | 2.12B | **27 (27)** | 262 (**188**) | 404 = 373 / 0 / 31 | 359 |
| 2020 | 2.12B | 20 (12) | 101 (29) | 228 = 211 / 0 / 17 | 104 |
| 2021 | 2.12B | 41 (28) | 222 (110) | 252 = 248 / 0 / 4 | 193 |
| 2022 | 2.12B | 235 (226) | 172 (86) | 546 = 526 / 10 / 10 | 398 |

**Read the Haryana column top to bottom.** Haryana reported **zero detenus in 2009, 2010,
2011, 2014 and 2015** — five separate volumes, five zeros. It then reports **27 in 2018,
all 27 domiciled outside Haryana**, and by 2022 holds **235, of which 226 are out-of-state**.
Haryana acquires an out-of-state detenu population from nothing.

**Read the UP column.** UP's out-of-state detenus run 5, 8, 4, 4, 3, **0** — and then
**188 in 2019**. A forty-fold step in a single year, in the year of the J&K reorganisation.

PSI never says the word "Kashmir" next to any of these numbers. It does not have to for the
pattern to be legible, but it does mean **the attribution is yours to make and yours to
defend** — PSI supplies the receiving-state counts, not the sending state.

---

## WHAT I COULD **NOT** ESTABLISH, AND WHAT WOULD SETTLE EACH

1. **J&K detenu figures for 2012 and 2013 — NOT ESTABLISHED.**
   `psi-full-report-2012.pdf` and `psi-full-report-2013.pdf` return http=200 from
   ncrb.gov.in but the transfers repeatedly truncate mid-stream (no `%%EOF`; pdftotext
   fails with "Invalid XRef entry / Missing endstream"). I retried 2012 four times and 2013
   three times. 2010, 2014 and 2015 recovered on retry; 2012 and 2013 had not, as of the
   end of this session.
   *What would settle it:* another patient retry of those two URLs (they do complete —
   2010 took ~4 attempts and 35.9 MB), or the archive.org copies the sibling agent is
   working on, or dataful.in dataset #22938.

2. **PSI-2023 and PSI-2024 — ESTABLISHED AS ABSENT, not merely unretrieved.**
   `prison-statistics-india-year-wise.html?year=2023` and `?year=2024` both return
   **http=200** with the page body reading **"कोई रिकॉर्ड नहीं मिला"** ("No record found"),
   and `table-contents-of-psi-reports.html?year=2023` likewise returns no PSI table PDFs.
   **As retrieved on 2026-08-03, the most recent Prison Statistics India volume published on
   ncrb.gov.in is PSI-2022.** The J&K detenu series therefore ends at 546 (31 Dec 2022).
   *What would settle it:* a PIB release or parliamentary answer announcing PSI-2023, or
   re-checking the site later.

3. **Whether PSI Table 8.1 breaks identically to Table 2.1 — NOT INDEPENDENTLY VERIFIED BY ME.**
   I verified the State→UT break and the Ladakh row on **Table 2.1** for 2016–2022 directly.
   I did **not** download Table 8.1. My statement that it breaks the same way rests on the
   shared 36-unit State/UT frame, plus your prior work. *What would settle it:* fetch
   `psi-table-8.1` for 2019 and 2020 the same way (the per-table listing is at
   `table-contents-of-psi-reports.html?year=<YYYY>&category=Deaths+and+Illness+in+Prisons`).

4. **The exact year the chapter renumbering happened — PARTIALLY ESTABLISHED.**
   Confirmed RETRIEVED: PSI-2015 uses **Table 3.3** (Chapter 3) and **Table 5.3** for domicile;
   PSI-2016 uses **Table 2.1** (Chapter 2) and **Table 2.12B**. So the renumbering is at the
   **PSI-2016 volume**. I did not need 2012–2014 to establish this, and 2014/2015 confirm the
   old scheme.

5. **Whether the "such as COFEPOSA, NDPS, NSA, PSA, PITNDPS, PBMSECA" footnote appears in
   volumes other than PSI-2022 — NOT ESTABLISHED.** I verified it in PSI-2022 only, where it
   sits on the 2.18/2.19 page. I did not grep the 2018–2021 volumes for it.
   *What would settle it:* grep the per-table PDFs for tables 2.18/2.19 of each year.

6. **Any law-wise (PSA vs NSA vs COFEPOSA) detenu count — DOES NOT EXIST IN PSI.**
   See Q1c. This is a positive finding of absence, not a retrieval failure.
   *What would settle the underlying question:* J&K Home Department / MHA sources — e.g.
   the J&K Home Department document behind the "1,122 between 2018 and 2023" figure, and
   MHA's Rajya Sabha answer of 4 Dec 2019. **Both of those are currently RELAYED to me
   through your brief; I did not fetch either, and I make no claim about their contents
   beyond repeating what you told me.** The MHA parliamentary-reply route
   (`mha.gov.in`, which does resolve normally) is the obvious next retrieval.

7. **dataful.in / data.gov.in mirrors — REACHABLE BUT NOT MINED.**
   RETRIEVED: `https://dataful.in/` http=200; `https://indiadataportal.com/` http=200;
   `https://data.gov.in/` http=302 (needs the same 1.1.1.1 `--resolve` trick — its system
   DNS also times out; A record `164.100.61.218`).
   RETRIEVED via WebFetch: `https://dataful.in/collections/1411/` lists
   **dataset #22938 "NCRB - Prison Statistics: Year, State and Gender wise Different Types
   of Prison Inmates", stated coverage 2003–2024**, and **#22919 "…Educational Background of
   Detenues", coverage 2001–2016 and 2018–2024**. I did **not** download either dataset and
   cannot vouch for the figures, and I note their claimed 2023/2024 coverage **conflicts
   with NCRB's own site**, which publishes nothing past 2022. Treat dataful's post-2022 rows
   as unverified until reconciled.
   *What would settle it:* download #22938 and cross-check its 2009–2022 J&K detenu column
   against the RETRIEVED figures in the Q2 table above.

---

## ONE-LINE ANSWERS

- **Q1:** Yes, detenus are a distinct PSI category (Ch.2 Tables 2.1/2.12A-D, Ch.3 Table 3.4,
  Ch.7 Table 7.5). The COFEPOSA/NDPS/NSA/PSA/PITNDPS/PBMSECA note is **REAL and verbatim**,
  but is a one-page footnote with "such as … etc.", not an enumeration. **No PSI table
  anywhere splits detenus by the law of detention. PSA detenus cannot be separated.**
- **Q2:** Yes, the detenu series breaks — **but at the PSI-2020 volume, not at 31 Oct 2019.**
  PSI-2019 still lists J&K as a **State** (Sl. 10) with **no Ladakh row**, for a year in
  which J&K was a UT for its final two months. From PSI-2020: J&K is a **UT** (Sl. 33),
  **Ladakh is Sl. 34** and reports **0 detenus** every year while holding 20–30 other inmates.
- **Q3:** **HOLDING state.** Established from the Methodology (data furnished by State/UT
  Prison Headquarters, captured at prison level) and decisively from the **Table 2.12B
  column header "Belongs to other State"**. A J&K PSA detenu in a UP or Haryana jail is
  counted in **UP's or Haryana's** detenu row — **confirmed**. PSI has domicile tables that
  cover detenus (2.12B; Table 5.3 pre-2016) but they never name the other state, and PSI
  records **inter-state transfer for convicts (7.1) and undertrials (7.3) but NOT for
  detenus (7.5)**. PSI's front matter states **no explicit attribution rule in words** —
  that silence is itself a finding.

---

## PART B — NON-ARCHIVE MIRRORS AND THE PARLIAMENTARY ROUTE (reachability only)

Because the live NCRB host worked, I did not need mirrors for the volumes. Recording
reachability so the next agent doesn't re-test:

| Host | Result | Note |
|---|---|---|
| `www.ncrb.gov.in` | **http=200** | only via `--resolve …:443:45.127.74.245`; system DNS times out |
| `www.mha.gov.in` | **http=301** on `/` | normal DNS, no workaround needed |
| `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2019-pdfs/rs-11122019/2593.pdf` | **http=200, application/pdf** | **route VALIDATED** — MHA RS reply PDFs are curl-fetchable with a browser UA |
| `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2019-pdfs/rs-04122019/{1,100,500}.pdf` | **http=302** (not found) | I do not have the question number for 4 Dec 2019; guessing is not retrieval |
| `https://dataful.in/` | **http=200** | collection 1411 read; datasets not downloaded |
| `https://indiadataportal.com/` | **http=200** | not explored |
| `https://data.gov.in/` | **http=302** | needs the same `--resolve` trick; A record `164.100.61.218` via 1.1.1.1 |

**The MHA 4 Dec 2019 Rajya Sabha reply is NOT RETRIEVED.** The fetch route works, but I
could not determine the question number, and I will not report a URL I did not fetch.
Everything I have about that reply (234 J&K prisoners in UP jails, 27 in Haryana) is
**RELAYED** — from your brief, and separately from a web-search result snippet
(Tribune India / PTI) which I did **not** fetch either. A search snippet is not retrieval.
*What would settle it:* the RS question number for 4 Dec 2019, then
`https://www.mha.gov.in/MHA1/Par2017/pdfs/par2019-pdfs/rs-04122019/<QNO>.pdf`.

Note also, as a **RELAYED** search-snippet item I did not fetch and do not vouch for: a
J&K Home Department document of August 2023 reportedly putting 408 PSA detenus in jails
outside J&K. If that is a different figure from the "1,122 between 2018 and 2023" in your
brief, the two need reconciling (stock vs cumulative flow, most likely) before either is
used.
