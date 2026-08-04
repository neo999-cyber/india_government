# Phase Federalism — Part 08: Parliamentary answers, re-retrieved WITH URLs

Retrieval pass run 2026-08-04. Purpose: the prior pass read ~15 parliamentary answers
verbatim but recorded no per-question URLs, so four series could not be authored.
This pass re-retrieves the documents and records the exact URL fetched, HTTP code and
byte count for each.

## Method / M1 modes available

- System resolver on this machine is broken. All fetches use
  `dig +short @1.1.1.1 <host>` then `curl --resolve <host>:443:<ip> -A 'Mozilla/5.0'`.
- **M1 mode 3 (Playwright / WebFetch) is UNAVAILABLE** — both inherit the broken system
  resolver and cannot reach any host. Any unreachability claim below rests on mode 1
  (system resolver) and mode 2 (curl with explicit `--resolve`) only.
- Resolutions obtained this session:
  - `sansad.in` → 164.100.252.170 (resolves on 1.1.1.1; reachable)
  - `rsdoc.nic.in` → 164.100.192.59 (resolver-mode-1: fails on system resolver, resolves on 1.1.1.1)

## Working endpoints confirmed this session

- Lok Sabha question search:
  `https://sansad.in/api_ls/question/qetFilteredQuestionsAns?loksabhaNo=<N>&ministryCode=<C>&pageNo=<P>&size=<S>&locale=en&keyWord=<K>`
  — matches on question SUBJECT only. Returns `questionsFilePath` = the exact answer PDF URL.
  Positive control: `loksabhaNo=18&ministryCode=39&keyWord=cess` → HTTP 200, 5,713 bytes,
  first hit `quesNo:137, "Cess & Surcharges Collected", 20.07.2026, Shri S Venkatesan` —
  which is exactly Task A item 2. Corpus confirmed live and correctly indexed.

---

_(sections appended below as each block completes)_


## Task A — item 2: LS Unstarred Q. 137 — RETRIEVED (T1)

**Verified identity:** Lok Sabha, 18th LS, Session 8, **UNSTARRED QUESTION NO. 137**,
"CESS & SURCHARGES COLLECTED", **TO BE ANSWERED ON MONDAY, JULY 20, 2026 / ASHADHA 29, 1948 (SAKA)**.
Asked by **SHRI S VENKATESAN**. Ministry of Finance, Department of Revenue.
Answered by **SHRI PANKAJ CHAUDHARY, Minister of State in the Ministry of Finance**.
Prior pass's "LS Unstarred Q. 137, answered 20.07.2026" is **CORRECT — no correction needed**.

**Discovery URL fetched:**
`https://sansad.in/api_ls/question/qetFilteredQuestionsAns?loksabhaNo=18&ministryCode=39&pageNo=1&size=5&locale=en&keyWord=cess`
→ HTTP **200**, **5,713 bytes**. (ministryCode=39 = Finance.)

**Answer PDF URL fetched:**
`https://sansad.in/getFile/lsapps/loksabhaquestions/annex/188/AU137_1GENno.pdf?source=lsapps`
→ HTTP **200**, **885,365 bytes**. Hindi counterpart at
`https://sansad.in/getFile/lsapps/loksabhaquestions/qhindi/188/AU137_1GENno.pdf?source=lsapps`.

**Confirmation of the prior pass's part (d) figures — all four match exactly:**
cess+surcharge as % of GTR — 2014-15 **9.6**, 2019-20 **17.5**, 2024-25 **17.9**, 2025-26 **16.4**.
Note the question asked for the proportion to *total direct tax collections*; the Government
answered against **Gross Tax Revenue (GTR)** instead. That substitution is in the document.

**Note — this document CARRIES Annexure-A in full** (the same "Statement showing details of
Cesses & surcharges levied and collected as part of principal taxes" sought as item 1), with the
same as-%-of-GTR footings the prior pass recorded for the RS answer: cesses 11.5 / 10.5 / 10.0 /
8.2 / 6.2 and surcharges 8.9 / 8.0 / 7.9 / 8.2 / 8.1. **It also carries Annexure B**, the
cess-utilisation-to-Reserve-Funds table, which independently corroborates the item-3 finding:
**Agriculture Infrastructure and Development Fund shows "..." (nil) for 2022-23 and 120714.39 for
2023-24.**

### Verbatim text of the answer (pdftotext -layout, complete)

```
                                             Government of India
                                          Ministry of Finance
                                         Department of Revenue

                                 LOK SABHA
                          UNSTARRED QUESTION NO. 137
          TO BE ANSWERED ON MONDAY, JULY 20, 2026/ASHADHA 29, 1948 (SAKA)

                                CESS & SURCHARGES COLLECTED

137. SHRI S VENKATESAN:

Will the Minister of FINANCE be please to state:


(a) the total amount of surcharge collected by the Union Government during each of the last five financial
years;

(b) the total amount of cess collected during each of the last five financial years, category-wise;

(c) the amount spent for earmarked purpose from the Cess concerned; and

(d) the proportion of collections from cess and surcharges, taken together, as a percentage of the total
direct tax collections in the years 2014-15, 2019-20, 2024-25, and 2025-26?



                                     ANSWER
                  MINISTER OF STATE IN THE MINISTRY OF FINANCE
                            (SHRI PANKAJ CHAUDHARY)


(a) & (b) : the year-wise details of total amount collected under Surcharge and the year-wise details of the
major cesses collected during the last five years is enclosed as Annexure ‘A’.

(c): Details of the amount spent (amount transferred to the dedicated Reserve Fund) to meet intended
expenditure is enclosed as Annexure ‘B’.

(d): The proportion of collections from cess and surcharges, taken together, as a percentage of the Gross
tax revenue (GTR) is as follows:

         Year             Total Cess         Total               Cess+              GTR        % (Cess+
                            (₹ Cr)         Surcharge           Surcharge           (₹ Cr)     Surcharge) to
                                             (₹ Cr)              (₹ Cr)                           GTR

        2014-15            89117.1           30792.5            119909.6        1245135.8             9.6
        2019-20           279579.9           71273.7            350853.6        2010059.3             17.5
        2024-25           381323.4          299254.5            680577.9        3796381.7             17.9
        2025-26           333650.0          335970.0            669620.0        4077772.0             16.4


                                                  ******
                                                                              Annexure-A
                                 Statement showing details of Cesses & surcharges levied and collected as part of principal taxes
                                                                                                                                                   ( ₹ crore )
Sl.
      Name of the levy and tax receipt                                                                                       RE                  BE
No                                                 2022-23                 2023-24                 2024-25
                   heads                                                                                                   2025-26             2026-27
 .
      CESSES IN OPERATION:


      Agriculture Infrastructure &
1                                                        74142.03                80923.60                75455.06                   81580.00        85440.00
      Development Cess

2     Cess on Crude oil                                  21497.14                18803.41                17931.29                   15810.00        16210.00

3     Cesses on Exports                                      852.44                  -3.19                    9.05                     10.00             10.00

      Goods & Services Tax
4                                                       125862.41               141436.16               150569.84                   88000.00              0.00
      Compensation Cess

5     Health Cess                                             24.01                  22.90                    0.14                      0.00              0.00

6     Health & Education Cess                            61809.29                71156.96                84337.16                   90000.00       100000.00

      National Calamity Contingent
7                                                         7168.30                 7812.25                 8341.22                   10140.00        10910.00
      Duty

8     Road and Infrastructure Cess*                      59234.95                44552.49                44679.82                   45780.00        46930.00

      Health Security se National
9                                                              0.00                   0.00                    0.00                   2330.00        14000.00
      Security Cess

A.              Total (1 to 9)                          350590.57               364704.58               381323.58               333650.00         273500.00
     CESSES NOT IN OPERATION:



10   Primary Education Cess                     3.18        1.11        1.54        0.00        0.00

     Secondary & Higher Education
11                                              1.45        0.53        0.41        0.00        0.00
     Cess

12   Clean Energy Cess                         19.75        0.00        0.00        0.00        0.00

13   Krishi Kalyan Cess                         6.02        2.36        0.94        0.00        0.00

14   Swachh Bharat Cess                         7.98        5.16        1.58        0.00        0.00

15   Infrastructure Cess                        0.00        0.00        0.00        0.00        0.00


     Other Cesses Collected Under
     Union Excise Duties(Cess on Jute,
16   Cess on Salt, Cess on Bidi, Cess on        0.41      -21.78       -4.69        0.00        0.00
     Tobacco, Cess on Sugar, Cess on
     Automobiles, others)

     Cesses Under Other Taxes and
     Duties on Commodities and
17   services                                -141.83       -4.32        0.00        0.00        0.00
     (Water Cess, Research &
     Development Cess, Other Cess)

B.            Total (10 to 17)               -103.04      -16.94       -0.22        0.00        0.00

             Grand Total (A+B)             350487.53   364687.64   381323.36   333650.00   273500.00
       As % of gross tax revenue                  11.5                 10.5                  10.0                  8.2                  6.2

    * Includes additional duty of excise on petrol and diesel, which were known as 'road cess' before introduction of 'road and
    infrastrucure cess'.

    SURCHARGES LEVIED ON –



1   Corporation Tax                           55103.79             60373.34             72118.36             81000.00              90000.00

    Taxes on Income other than
2                                             53914.24             54793.80             66778.28             71000.00              79000.00
    Corporation Tax

3   Fringe Benefit Tax                            0.00                 0.00                  0.00                 0.00                 0.00

    Social Welfare Surcharge under
4                                             16178.79             16273.41             17477.86             18040.00              18130.00
    Customs

5   Special Additional Excise Duties         147163.79            146619.61            142880.01            165930.00             169720.00

           Grand Total (1 to 5)              272360.61            278060.16            299254.51            335970.00             356850.00

       As % of gross tax revenue                   8.9                  8.0                   7.9                  8.2                  8.1
                                                               Annexure B

                                    Utilization of Cess proceeds (transferd to the Reserve Funds)
                                                                                                                                    ( ₹ crore )

Sl. No.                                                                                                                 RE                BE
                          Name of the Fund                         2022-23          2023-24          2024-25          2025-26           2026-27

  1       Agriculture Infrastructure and Development Fund                    ...     120714.39        139768.32        104749.93           111853.07

  2       Prarambik Shiksha Kosh                                     38000.00         28400.00         40900.00         48600.00            54850.00
  3       Madhyamik & Uchhatar Shiksha Kosh#                         14250.00         37833.33         30681.09         31271.26            37450.00
  4       GST Compensation Fund                                     163506.29        143109.49        150376.93         54469.49                0.02
  5       Central Road and Infrastructure Fund                      239646.25         47777.66         39594.59         40000.00            41000.00
          National Disaster Response Fund/ National Calamity
  6                                                                   8000.49          8801.21          9610.00         10140.00            10910.00
          Contingency Fund**
  7       Clean Energy Fund                                                  …                …                …                …                  …
  8       Sugar Development Fund                                             …                …                …                …                  …
  9       Cine Workers Welfare Fund                                          …                …                …                …                  …
  10      Mines Welfare Funds                                                …                …                …                …                  …
  11      Beedi Workers Welfare Funds                                        …                …                …                …                  …
  12      Other Development & Welfare Fund                                6.04             6.04                …                …                  …
  13      Krishi Kalyan Kosh                                                 …                …                …                …                  …
  14      Bharat Infrastructure Kosh                                         …                …                …                …                  …
  15      Rashtriya Swachhata Kosh                                           …                …           159.42                …                  …

  16      Prevention and Control of Water Pollution^                         …                …                …                …                  …

  17      Pradhan Mantri Swasthya Suraksha Nidhi#                    18339.27         13776.63         14438.54         28400.62            30725.00
  18      Oil Industry Development Fund                                    ...              ...        17730.00         15810.00            16210.00

  19      Health Security se National Security Cess Fund                     ...              ...              ...        2330.00           14000.00

  20      Technology in National Security Fund                                ...               ...                ...    30000.00               0.00
                                Grand Total                          481748.34         400418.75         443258.89       365771.30         316998.09
          ^ No physical fund has been constituted. However, expenditure provision has been netted against receipts in Statement of Budget Estimates.
          # Reserve Funds viz Madhyamik & Uchhatar Shiksha Kosh and Pradhan Mantri Swastya Surakashi Nidhi has been operationalised from 2022-
          23. The utilisation from 2019-20 to 2021-22 are as per Revised Estimate (RE) for the respective year(s).
          ** Amount for both the funds has been taken together

```

---

## Task A — item 1: RS Starred Q. *18 — RETRIEVED (T1)

**Verified identity:** Rajya Sabha, **STARRED QUESTION NO. *18**, "SHARE OF CESSES AND
SURCHARGES IN THE GROSS TAX REVENUE", **ANSWERED ON 21/07/2026**, Session 271.
Asked by **SHRI AJAY MAKAN**. Government of India, Ministry of Finance, Department of Revenue.
Answered by **SMT. NIRMALA SITHARAMAN, THE MINISTER OF FINANCE** (note: the Finance Minister
herself, not the MoS — a Starred question).
Prior pass's "RS Starred Q. 18, answered 21.07.2026, Ministry of Finance" is **CORRECT**.

**Discovery URL fetched:** `https://rsdoc.nic.in/Question/Search_Questions?whereclause=qno=18`
→ HTTP **200**, **411,346 bytes**, 175 records across all sessions; the 21.07.2026 record is the match.
(Host `rsdoc.nic.in` is resolver-mode-1: 164.100.192.59 via 1.1.1.1 only.)

**Answer PDF URL fetched:**
`https://sansad.in/getFile/annex/271/AS18_7lp2Vc.pdf?source=pqars`
→ HTTP **200**, **927,358 bytes**.

**All five prior-pass footings confirmed exactly.** Cesses as % of gross tax revenue:
**11.5 / 10.5 / 10.0 / 8.2 / 6.2** (2022-23, 2023-24, 2024-25, RE 2025-26, BE 2026-27).
Surcharges as % of gross tax revenue: **8.9 / 8.0 / 7.9 / 8.2 / 8.1**.

**The Article 270 statement, verbatim, in reply to part (b):**

> "Taxes levied and distributed between the Union and the States are governed by Article 270(1)
> of the Constitution of India. This Article exempts cesses and surcharges from distribution
> between the Union and the States and hence do not form part of the divisible pool."

**Additional finding not in the prior pass — bears on Task B item 4.** Reply to parts (c) and (d)
confirms the **16th Finance Commission report EXISTS AND IS PUBLISHED** as of July 2026, and
gives exact citations for the States' own representations on vertical devolution:

> "During the consultations of the 16th Finance Commission with States, the States shared their
> views on vertical devolution, which are presented in Paragraphs 7.36 to 7.41 of Chapter 7,
> Volume I of the Finance Commission Report. The detailed record of these consultations is
> available at Annexure 1.7 of Volume II of the Report. The Commission has recommended retaining
> the States' share in the divisible pool at its current level, and the Government has no proposal
> to amend the existing Constitutional provisions relating to taxation."

The reply then makes the Union's counter-argument that cesses return to States through CSS:

> "Further, cesses are primarily utilized to finance Centrally Sponsored Schemes (CSS), which are
> implemented by State Governments. For instance, schemes such as Samagra Shiksha, National Health
> Mission, and Pradhan Mantri Uchchtar Shiksha Abhiyan are funded through the proceeds of the
> Health and Education Cess. Similarly, schemes like Pradhan Mantri Gram Sadak Yojana and
> Rashtriya Krishi Vikas Yojana are financed through the Central Road and Infrastructure Cess and
> the Agriculture Infrastructure and Development Cess, respectively."

### Verbatim text of the answer (pdftotext -layout, complete)

```
                                          Government of India
                                          Ministry of Finance
                                         Department of Revenue
                                      RAJYA SABHA
                                STARRED QUESTION NO. *18
                                  ANSWERED ON-21/07/2026

              SHARE OF CESSES AND SURCHARGES IN THE GROSS TAX REVENUE


*18 SHRI AJAY MAKAN:

Will the Minister of Finance be pleased to state:

(a) the amount collected through cesses and surcharges in each of the last three financial
years and their share in the gross tax revenue of the Union;

(b) whether such cesses and surcharges do not form part of the divisible pool of taxes
shared with the States;

(c) whether Government has received representations from State Governments regarding
the rising share of cesses and surcharges; and

(d) the response of Government thereto?



                                            ANSWER

                                THE MINISTER OF FINANCE

                              (SMT. NIRMALA SITHARAMAN)



(a) to (d):    A statement is laid on the Table of the House.




                                               ****
Statement referred to in reply to RAJYA SABHA Starred Question No. *18 for answer on
21st July 2026 raised by Shri Ajay Makan regarding “Share of cesses and surcharges in the
gross tax revenue”.



(a) Year-wise detail of collections from Surcharges and Cesses and their share in the gross tax
revenue of the Union during the last three financial year(s) is enclosed as Annexure ‘A’.

(b) Taxes levied and distributed between the Union and the States are governed by Article
270(1) of the Constitution of India. This Article exempts cesses and surcharges from
distribution between the Union and the States and hence do not form part of the divisible pool.

(c) and (d): During the consultations of the 16th Finance Commission with States, the States
shared their views on vertical devolution, which are presented in Paragraphs 7.36 to 7.41 of
Chapter 7, Volume I of the Finance Commission Report. The detailed record of these
consultations is available at Annexure 1.7 of Volume II of the Report. The Commission has
recommended retaining the States’ share in the divisible pool at its current level, and the
Government has no proposal to amend the existing Constitutional provisions relating to
taxation. Further, cesses are primarily utilized to finance Centrally Sponsored Schemes (CSS),
which are implemented by State Governments. For instance, schemes such as Samagra Shiksha,
National Health Mission, and Pradhan Mantri Uchchtar Shiksha Abhiyan are funded through the
proceeds of the Health and Education Cess. Similarly, schemes like Pradhan Mantri Gram
Sadak Yojana and Rashtriya Krishi Vikas Yojana are financed through the Central Road and
Infrastructure Cess and the Agriculture Infrastructure and Development Cess, respectively.

                                              *****
                                             Annexure-A
Statement showing details of Cesses & surcharges levied and collected as part of principal taxes
                                                                                            ( ₹ crore )
 Sl.   Name of the levy and                                                      RE             BE
                                   2022-23        2023-24       2024-25
No.       tax receipt heads                                                   2025-26        2026-27

       CESSES IN OPERATION:
       Agriculture
 1     Infrastructure &               74142.03      80923.60      75455.06      81580.00     85440.00
       Development Cess

 2     Cess on Crude oil              21497.14      18803.41      17931.29      15810.00     16210.00

 3     Cesses on Exports                 852.44         -3.19          9.05        10.00         10.00

       Goods & Services Tax
 4                                   125862.41     141436.16     150569.84      88000.00          0.00
       Compensation Cess

 5     Health Cess                        24.01         22.90          0.14          0.00         0.00

       Health & Education
 6                                    61809.29      71156.96      84337.16      90000.00    100000.00
       Cess
       National Calamity
 7                                     7168.30       7812.25       8341.22      10140.00     10910.00
       Contingent Duty
       Road and Infrastructure
 8                                    59234.95      44552.49      44679.82      45780.00     46930.00
       Cess*
       Health Security se
 9                                         0.00          0.00          0.00      2330.00     14000.00
       National Security Cess

 A.          Total (1 to 9)          350590.57     364704.58     381323.58    333650.00     273500.00

       CESSES NOT IN OPERATION:

10     Primary Education Cess              3.18          1.11          1.54          0.00         0.00

       Secondary & Higher
11                                         1.45          0.53          0.41          0.00         0.00
       Education Cess

12     Clean Energy Cess                  19.75          0.00          0.00          0.00         0.00

13     Krishi Kalyan Cess                  6.02          2.36          0.94          0.00         0.00

14     Swachh Bharat Cess                  7.98          5.16          1.58          0.00         0.00

15     Infrastructure Cess                 0.00          0.00          0.00          0.00         0.00

       Other Cesses Collected
       Under Union Excise
       Duties(Cess on Jute,
16     Cess on Salt, Cess on               0.41        -21.78         -4.69          0.00         0.00
       Bidi, Cess on Tobacco,
       Cess on Sugar, Cess on
       Automobiles, others)
     Cesses Under Other
     Taxes and Duties on
     Commodities and
17   services                   -141.83       -4.32        0.00        0.00        0.00
     (Water Cess, Research
     & Development Cess,
     Other Cess)
B.       Total (10 to 17)       -103.04      -16.94       -0.22        0.00        0.00

        Grand Total (A+B)     350487.53   364687.64   381323.36   333650.00   273500.00

        As % of gross tax
                                   11.5        10.5        10.0         8.2           6.2
            revenue
     * Includes additional duty of excise on petrol and diesel, which were known as
     'road cess' before introduction of 'road and infrastrucure cess'.


     SURCHARGES LEVIED ON –



1    Corporation Tax           55103.79    60373.34    72118.36    81000.00    90000.00

     Taxes on Income other
2                              53914.24    54793.80    66778.28    71000.00    79000.00
     than Corporation Tax

3    Fringe Benefit Tax            0.00        0.00        0.00        0.00        0.00

     Social Welfare
4    Surcharge under           16178.79    16273.41    17477.86    18040.00    18130.00
     Customs
     Special Additional
5                             147163.79   146619.61   142880.01   165930.00   169720.00
     Excise Duties

       Grand Total (1 to 5)   272360.61   278060.16   299254.51   335970.00   356850.00

        As % of gross tax
                                    8.9         8.0         7.9         8.2           8.1
            revenue

```

---

## Task A — item 7: RS Unstarred Q. 240 — RETRIEVED (T1)

**Verified identity:** Rajya Sabha, **UNSTARRED QUESTION NO. 240**, "Non-utilisation of Health and
Education Cess", **ANSWERED ON Tuesday, THE 21st JULY, 2026 / 30 Ashadha, 1948 (Saka)**, Session 271.
Asked by **SHRI S NIRANJAN REDDY**. Government of India, Ministry of Finance, **Department of
Economic Affairs** (note: DEA, not Department of Revenue — differs from item 1).
Answered by **SHRI PANKAJ CHAUDHARY, Minister of State in the Ministry of Finance**.
Prior pass's "RS Unstarred Q. 240, 21.07.2026" is **CORRECT**.

**Discovery URL fetched:** `https://rsdoc.nic.in/Question/Search_Questions?whereclause=qno=240`
→ HTTP **200**, **382,613 bytes**, 161 records; the 21.07.2026 FINANCE record is the match.

**Answer PDF URL fetched:**
`https://sansad.in/getFile/annex/271/AU240_i4p811.pdf?source=pqars`
→ HTTP **200**, **271,537 bytes**. Hindi: `https://sansad.in/getFile/qhindi/271/AU240_i4p811.pdf?source=pqars`

**The Union-versus-CAG contradiction, verbatim.** The question puts the CAG's finding; the answer
denies it outright and produces a different arithmetic.

Question (a), verbatim:
> "whether Government has taken note of the CAG's 2024-25 observation that ₹ 50,072 crore
> collected as Health and Education Cess during 2022-23 was not transferred to the designated
> reserve fund meant to support schemes such as AB-PMJAY and Samagra Shiksha;"

Answer (a), verbatim — **the denial**:
> "During 2022-23, there was no shortfall in transfer of Health and Education Cess collections to
> the designated Reserve Fund(s). An amount of ₹ 61,814 crore was collected under Health and
> Education Cess during FY 2022-23, against which an amount of ₹ 70,589 crore was transferred to
> various designated Reserve Funds namely, Pradhan Mantri Swasthya Suraksha Nidhi (PMSSN)
> (₹ 18,339 crore), Prarambhik Shiksha Kosh (PSK) (₹ 38,000 crore) and Madhyamik and Uchchatar
> Shiksha Kosh (MUSK) (₹ 14,250 crore). The combined amount transferred to the designated Reserve
> Fund(s) was ₹ 8,775 crore more than the amount collected from Health and Education cess during
> FY 2022-23."

Answer (b): **"Does not arise in view of (a) above."**

Answer (c):
> "Transparency in utilization of cess proceeds for their intended purposes is ensured by seeking
> due appropriation from the Parliament before expenditure under defined schemes is met from the
> designated Reserve Fund (s)."

**Cross-check against item 1 / item 2 (same session, same Ministry).** The ₹61,814 crore figure
here does not equal the ₹61,809.29 crore for Health & Education Cess 2022-23 in Annexure-A of
both RS *18 and LS 137 (a ₹4.71 crore discrepancy — rounding or a later revision). The three
transfer figures DO reconcile exactly with Annexure B of LS Q.137: PMSSN 18339.27, PSK 38000.00,
MUSK 14250.00 → 70,589.27. So the Union's arithmetic is internally consistent across its own
answers; the disagreement with the CAG is about **whether transfers to the three Koshas count as
transfer of the cess**, not about the transfer amounts.

### Verbatim text of the answer (pdftotext -layout, complete)

```
                             GOVERNMENT OF INDIA
                              MINISTRY OF FINANCE
                        DEPARTMENT OF ECONOMIC AFFAIRS

                                 RAJYA SABHA
                           UNSTARRED QUESTION NO. 240
         ANSWERED ON Tuesday, THE 21st JULY, 2026/ 30 Ashadha, 1948 (Saka)
                       Non-utilisation of Health and Education Cess


240.SHRI S NIRANJAN REDDY:
Will the Minister of Finance be pleased to state:

       a) whether Government has taken note of the CAG’s 2024-25 observation that ₹ 50,072
          crore collected as Health and Education Cess during 2022-23 was not transferred to
          the designated reserve fund meant to support schemes such as AB-PMJAY and
          Samagra Shiksha;
       b) the reasons for not operationalising the designated fund; and
       c) the corrective measures taken to ensure transparent utilisation of cess proceeds for
          their intended purposes?

                                         ANSWER

                   THE MINISTER OF STATE IN THE MINISTRY OF FINANCE
                              (SHRI PANKAJ CHAUDHARY)
                                     *****

      a) During 2022-23, there was no shortfall in transfer of Health and Education Cess
         collections to the designated Reserve Fund(s). An amount of ₹ 61,814 crore was
         collected under Health and Education Cess during FY 2022-23, against which an
         amount of ₹ 70,589 crore was transferred to various designated Reserve Funds
         namely, Pradhan Mantri Swasthya Suraksha Nidhi (PMSSN) (₹ 18,339 crore),
         Prarambhik Shiksha Kosh (PSK) (₹ 38,000 crore) and Madhyamik and Uchchatar
         Shiksha Kosh (MUSK) (₹ 14,250 crore). The combined amount transferred to the
         designated Reserve Fund(s) was ₹ 8,775 crore more than the amount collected from
         Health and Education cess during FY 2022-23.
      b) Does not arise in view of (a) above.
      c) Transparency in utilization of cess proceeds for their intended purposes is ensured by
         seeking due appropriation from the Parliament before expenditure under defined
         schemes is met from the designated Reserve Fund (s).



                                           ******

```

---

## Task A — item 3: RS Unstarred Q. 385 — RETRIEVED (T1) — the highest-value item

**Verified identity:** Rajya Sabha, **UN-STARRED QUESTION NO-385**, "ALLOCATION OF FUNDS COLLECTED
FROM SURCHARGE AND CESS FOR THE INTENDED PURPOSES", **ANSWERED ON-03/02/2026**, Session 270.
Asked by **SHRI RANDEEP SINGH SURJEWALA**. Ministry of Finance, Department of Revenue.
Answered by **SHRI PANKAJ CHAUDHARY, Minister of State in the Ministry of Finance**.
Prior pass's "RS Unstarred Q. 385, answered 03.02.2026" is **CORRECT**.

**Discovery URL fetched:** `https://rsdoc.nic.in/Question/Search_Questions?whereclause=qno=385`
→ HTTP **200**, **325,117 bytes**, 128 records; the 03.02.2026 FINANCE record is the match.

**Answer PDF URL fetched:**
`https://sansad.in/getFile/annex/270/AU385_noP7w0.pdf?source=pqars`
→ HTTP **200**, **455,678 bytes**.

### Annexure B, item 4 — AGRICULTURE INFRASTRUCTURE & DEVELOPMENT FUND (verbatim)

Every figure the prior pass recorded is confirmed **exactly**, and the series extends one year
further (BE 2025-26) than the prior pass had it.

```
4.  AGRICULTURE INFRASTRUCTURE & DEVELOPMENT FUND                                  (₹crore)

                     Collection
                  (Agriculture and     (Transfer/Utilisation)      Balance
      Year      Infrastructure Cess)            (B)               (A) - (B)
                        (A)

    2021-22              76950.68                    ...            76950.68
    2022-23              74142.03                    ...            74142.03
    2023-24              80923.60              120714.39           -39790.79
  2024-25 (RE)           75180.00              138822.37           -63642.37
  2025-26 (BE)           80030.00              117676.85           -37646.85

 * The Cess is being levied in pursuance of Finance Act, 2021.
```

**The finding stands and is stronger than stated.** The AIDC was imposed by the **Finance Act,
2021** — so FY2021-22 is the cess's **first year of levy**. The Government's own table shows
**"..." (nil) transfer to the Agriculture Infrastructure and Development Fund in BOTH FY2021-22 and
FY2022-23** — the cess's first two full years — against ₹76,950.68 crore and ₹74,142.03 crore
collected. ₹1,51,092.71 crore collected under an earmarked cess with nothing transferred to the
fund it was earmarked for. The money sat in the Consolidated Fund, which the answer to part (b)
states outright.

**A second nil-transfer series the prior pass did not flag — Oil Industry Development Fund shows
FOUR consecutive nil years, not two:**

```
5.  OIL INDUSTRY DEVELOPMENT FUND                                                  (₹crore)

                        Collection*
      Year          (Cess on Crude Oil#)   (Transfer/Utilisation)     Balance
                            (A)                     (B)              (A)-(B)

     2020-21                 11474.15                    ...          11474.15
     2021-22                 19324.29                    ...          19324.29
     2022-23                 21629.22                    ...          21629.22
     2023-24                 18803.41                    ...          18803.41
  2024-25 (RE)^              17810.00                17730.00             80.00
  2025-26 (BE)^              19330.00                19376.03            -46.03

 # The Cess is being levied under Oil Industry (Development) Act, 1974
 ^ The Reserve Fund in the Public Account of India has, however, been operationalized,
   going forward, from FY 2024-25.
 * Collection data till FY 2022-23 is taken from Annual report 2022-23 of Oil Industry
   Development Board.
```

The footnote is the admission: a cess levied since **1974** had **no Reserve Fund in the Public
Account at all** until it "has been operationalized, going forward, from FY 2024-25." Four years
of nil transfer here are not an accounting lag — there was no fund to transfer into.

**CENTRAL ROAD AND INFRASTRUCTURE FUND (requested, verbatim):**

```
2.  CENTRAL ROAD AND INFRASTRUCTURE FUND                                           (₹crore)

                        Collection*
                         (Road and     (Transfer/Utilisation)     Balance
      Year         Infrastructure Cess)         (B)               (A)-(B)
                            (A)

     2020-21               235782.55           182363.47          53419.08
     2021-22               195986.96           251738.18         -55751.22
     2022-23                59234.95           239646.25        -180411.30
     2023-24                44552.49            47777.66          -3225.17
  2024-25 (RE)              45250.00            39777.90           5472.10
  2025-26 (BE)              47420.00            41000.00           6420.00
```

Note the collection collapse: ₹2,35,782.55 cr (2020-21) → ₹59,234.95 cr (2022-23), a 75% fall,
reflecting the excise-duty cuts on petrol and diesel.

**Also carried (bearing on items 6 and 7) — Health & Education Cess, item 1 of Annexure B:**

```
1.  PSK, MUSK and PMSSN                                                            (₹crore)

                      Collection
                   (Health and       (Transfer/Utilisation)     Balance
      Year        Education Cess)             (B)               (A) – (B)
                        (A)

     2020-21             35894.82             70735.46         -34840.64
     2021-22             52750.27             78286.97         -25536.70
     2022-23             61813.92             70589.27          -8775.35
     2023-24             71158.60             80009.96          -8851.36
  2024-25 (RE)           85300.00             87198.73          -1898.73
  2025-26 (BE)           94000.00            103000.00          -9000.00
```

This is the Government's own table backing the item-7 denial: 2022-23 collection **61,813.92** and
transfer **70,589.27**, difference **−8,775.35** — the "₹8,775 crore more than the amount collected"
in RS Q.240. The footnote states MUSK and PMSSN "have been operationalized from FY 2022-23 **after
obtaining approval of C&AG in December, 2022**", and that earlier transfers are only Revised
Estimates. That footnote is the seam the CAG's ₹50,072 crore finding sits in.

**Answer part (b), verbatim — the Consolidated Fund admission:**
> "Proceeds from the cesses and surcharges are collected and deposited in Consolidated Fund of
> India in terms of Articles 266 of the Constitution of India. The data in Annexure 'B' shows the
> utilization/transfer information regarding various cesses. Cess is utilized towards financing
> the development/welfare measures in the States through various Central Government schemes and
> initiatives."

**Answer part (c), verbatim — the same Article 270 formula as item 1, given 5½ months earlier:**
> "Taxes levied and distributed between the Union and the States are governed by Article 270(1) of
> the Constitution of India. This Article exempts cesses and surcharges from distribution between
> the Union and the States and hence do not form part of the divisible Pool."

### Verbatim text of the answer (pdftotext -layout, complete)

```
                                   Government of India
                                   Ministry of Finance
                                  Department of Revenue

                                  RAJYA SABHA
                           UN-STARRED QUESTION NO-385
                              ANSWERED ON-03/02/2026

 ALLOCATION OF FUNDS COLLECTED FROM SURCHARGE AND CESS FOR THE
                       INTENDED PURPOSES

385. SHRI RANDEEP SINGH SURJEWALA:
Will the Minister of FINANCE be pleased to state:

(a) the total Government collection from Surcharges and Cesses, year-wise and specific
Surcharge/ Cess wise for the years 2020 -21 to 2024 -25, including utilisation thereof and
the details of unspent funds, year-wise and head-wise;

(b) the reasons as to why a substantial portion of these funds have not been allocated for
the intended purposes such as health, education and infrastructure; and

(c) whether Government plans to share the funds collected from Surcharges/Cesses with the
States, if so, the methodology thereof?


                                         ANSWER

MINISTER OF STATE IN THE MINISTRY OF FINANCE
(SHRI PANKAJ CHAUDHARY)

(a): Year-wise detail of Collections of major cesses and surcharges (in operation) during FY
2020-21 to FY 2025-26 is enclosed as Annexure ‘A’.

The details of the collections and utilizations under major cesses since FY 2020-21 is
enclosed as Annexure ‘B’.

(b) Proceeds from the cesses and surcharges are collected and deposited in Consolidated
Fund of India in terms of Articles 266 of the Constitution of India. The data in Annexure ‘B’
shows the utilization/transfer information regarding various cesses. Cess is utilized towards
financing the development/welfare measures in the States through various Central
Government schemes and initiatives.

(c) Taxes levied and distributed between the Union and the States are governed by Article
270(1) of the Constitution of India. This Article exempts cesses and surcharges from
distribution between the Union and the States and hence do not form part of the divisible
Pool.


                                           ******
                                                                                                                                                                                             Annexure A

                                                     Statement showing details of Cesses & Surcharges levied and collected as part of principal taxes ( ₹ crore )

        Name of the levy and tax receipt                                                                                                                      RE                     BE
Sr No                                                    2020-21                 2021-22                   2022-23                   2023-24
        heads                                                                                                                                               2024-25                2025-26

CESSES
        AGRICULTURE
 1      INFRASTRUCTURE &                                              ...             76950.68                     74142.03               80923.60                     75180.00               80030.00
        DEVELOPMENT CESS
 2      CESS ON CRUDE OIL                                      10894.44                19353.84                    21497.14               18803.41                     17810.00               19330.00
 3      CESSES ON EXPORTS                                       9214.64                 1457.10                       852.44                   -3.19                      10.00                  11.00
 4      HEALTH CESS                                               -13.52                   31.02                       24.01                   22.90                      30.00                  35.00
        HEALTH & EDUCATION
 5                                                             35821.55                52732.33                    61809.29               71156.96                     85300.00               94000.00
        CESS
 6      NATIONAL CALAMITY                                       5098.81                 6138.30                      7168.30                7812.25                     9610.00               10380.00
        CONTINGENT DUTY
 7      ROAD AND                                             235782.55               195986.96                     59234.95                44552.49                    45250.00               47420.00
        INFRASTRUCTURE CESS*
 8   GOODS & SERVICES TAX                                      85191.91              104768.66                   125862.41               141436.16                    153440.00              167110.00
     COMPENSATION CESS
SURCHARGES
 1      Corporation Tax                                        14078.57                15890.00                    55103.79               60373.34                     60000.00               70000.00
        Taxes on Income other than
 2                                                              5537.78                 7922.88                    53914.24               54793.80                     76000.00               85000.00
        Corporation Tax
 3      Fringe Benefit Tax                                          0.37                      ...                         ...                      ...                       ...                    ...
        Social Welfare Surcharge
 4                                                             13447.39                16945.06                    16178.79               16273.41                     17250.00               17500.00
        under Customs
*Includes additional duty of excise on petrol and diesel, which were known as 'road cess' before introduction of 'road and infrastructure cess'.
                                                                                                   Annexure B

                               Collections and Utilizations under major Cesses’

1.       Prarambhik Shiksha Kosh (PSK), Madhyamik and Uchchatar Shiksha Kosh (MUSK) and Pradhan
         Mantri Swasthya Suraksha Nidhi (PMSSN)

                                                                                                          (₹crore)

                                     Collection
                                    (Health and               (Transfer/ Utilisation)             Balance
             Year
                                   Education Cess)                     (B)                        (A) – (B)
                                        (A)

           2020-21                            35894.82                            70735.46             -34840.64
           2021-22                            52750.27                            78286.97             -25536.70
           2022-23                            61813.92                            70589.27               -8775.35
           2023-24                            71158.60                            80009.96               -8851.36
         2024-25 (RE)                         85300.00                            87198.73               -1898.73
         2025-26 (BE)                         94000.00                             103000.00      -9000.00
 #Reserve Funds viz Madhyamik & Uchhatar Shiksha Kosh (MUSK) and Pradhan Mantri Swastya Surakashi Nidhi
 (PMSSN) have been operationalized from FY 2022-23 after obtaining approval of C&AG in December, 2022.
 Amount transferred under MUSK during the FY 2018-19 to FY 2021-22; and under PMSSN during the FY 2020-21
 to FY 2021-22 are as per Revised Estimate (RE) related to the respective year(s).

 2.      CENTRAL ROAD AND INFRASTRUCTURE FUND

                                                                                                            (₹crore)
                                     Collection*
                                      (Road and                (Transfer/ Utilisation)             Balance
            Year
                                 Infrastructure Cess)                   (B)                        (A)-(B)
                                         (A)
           2020-21                           235782.55                          182363.47                  53419.08
           2021-22                           195986.96                          251738.18                 -55751.22
           2022-23                             59234.95                         239646.25                -180411.30
          2023-24                              44552.49                           47777.66                 -3225.17
        2024-25 (RE)                           45250.00                           39777.90                    5472.10
         2025-26 (BE)                           47420.00                          41000.00                  6420.00
 *Includes additional duty of excise on petrol and diesel, which were known as 'road cess' before introduction of
 'road and infrastructure cess'.

3.       NATIONAL DISASTER RESPONSE FUND

                                                                                                       (₹crore)
                                      Collection
                                  [National Calamity        (Transfer/ Utilisation)            Balance
            Year
                                   Contingent Duty]                  (B)                       (A)-(B)
                                         (A)
           2020-21                              5098.81                       5820.00                    -721.19
           2021-22                              6138.30                       6134.60                       3.70
           2022-23                              7168.30                       8000.49                    -832.19
          2023-24                               7812.25                       8801.21                    -988.96
        2024-25 (RE)                            9610.00                       9610.00                       0.00
        2025-26 (BE)                           10380.00                     10380.00                        0.00
4.       AGRICULTURE INFRASTRUCTURE & DEVELOPMENT FUND

                                                                                                               (₹crore)
                                        Collection
                                     (Agriculture and            (Transfer/Utilisation)           Balance
            Year
                                   Infrastructure Cess)                   (B)                     (A) - (B)
                                           (A)

           2021-22                                76950.68                            ...                     76950.68
           2022-23                                74142.03                            ...                     74142.03
          2023-24                                 80923.60                   120714.39                        -39790.79
        2024-25 (RE)                              75180.00                   138822.37                        -63642.37
        2025-26 (BE)                              80030.00                   117676.85                        -37646.85
 * The Cess is being levied in pursuance of Finance Act, 2021.


5.       OIL INDUSTRY DEVELOPMENT FUND
                                                                                                              (₹crore)
                                          Collection*
                                                                    (Transfer/ Utilisation)        Balance
             Year                     (Cess on Crude Oil#)
                                                                             (B)                   (A)-(B)
                                              (A)

            2020-21                                   11474.15                              ...           11474.15
            2021-22                                   19324.29                              ...           19324.29
            2022-23                                   21629.22                              ...           21629.22
           2023-24                                    18803.41                           ...              18803.41
        2024-25 (RE)^                                 17810.00                    17730.00                      80.00
        2025-26 (BE)^                                 19330.00                   19376.03                 -46.03
 # The Cess is being levied under Oil Industry (Development) Act, 1974
 ^ The Reserve Fund in the Public Account of India has, however, been operationalized, going forward, from FY
 2024-25.
 *Collection data till FY 2022-23 is taken from Annual report 2022-23 of Oil Industry Development Board.

6.       GOODS & SERVICES TAX COMPENSATION FUND




                                                                                                       (₹crore)
                                       Collection
                                   (GST Compensation              (Transfer/ Utilisation)         Balance
             Year
                                         Cess)                             (B)                    (A)-(B)
                                          (A)
            2020-21                              85191.91                        106317.00               -21125.09

            2021-22                             104768.66                        110795.47                -6026.81

            2022-23                             125862.41                        163506.29               -37643.88

           2023-24                              141436.16                        143109.49                -1673.33
         2024-25 (RE)                           153440.00                        153440.00                         ...
         2025-26 (BE)                           167110.00                        167110.00                         ...

```

---

## Task A — item 6: RS Unstarred Q. 1324 — RETRIEVED (T1)

**Verified identity:** Rajya Sabha, **UNSTARRED QUESTION NO.1324**, "Funds collected from cesses
and surcharges", **ANSWERED ON TUESDAY, THE 1st August, 2023 / Sravana 10, 1945 (Saka)**, Session 260.
Asked by **Dr. JOHN BRITTAS**. Ministry of Finance, **Department of Economic Affairs**.
Answered by **SHRI PANKAJ CHAUDHARY, Minister of State in the Ministry of Finance**.
Prior pass's "RS Unstarred Q. 1324, 01.08.2023" is **CORRECT**.

**Discovery URL fetched:** `https://rsdoc.nic.in/Question/Search_Questions?whereclause=qno=1324`
→ HTTP **200**, **198,592 bytes**, 84 records; the 01.08.2023 FINANCE record is the match.

**Answer PDF URL fetched:**
`https://sansad.in/getFile/annex/260/AU1324.pdf?source=pqars`
→ HTTP **200**, **179,331 bytes**.
(Note this older file has no random suffix in its name — the `AU<qno>_<hash>.pdf` convention appears
only in later sessions. Session-260 files are plain `AU1324.pdf`.)

### The confirmation, verbatim — all four CAG citations match the prior pass exactly

Question (a): *"whether C&AG observed about instances of retaining the revenue collected through
cesses in consolidated fund instead of crediting to dedicated funds;"*

Answer **(a): "Yes, Sir;"**

Answer (b), the table verbatim:

```
   F.Y.     C&AG Report No.   Name of Report                              Para No.
 2016-17    20 of 2018        Report of C&AG on Compliance of FRBM        4.3.2
                              Act, 2003
 2017-18    6 of 2021         Report of C&AG on Compliance of FRBM        2.5.3
 2018-19                      Act, 2003
 2019-20    7 of 2021         Report of C&AG (Financial Audit)            1.9.1.1
 2020-21    31 of 2022        Report of C&AG (Financial Audit)            2.5.1
```

All four prior-pass citations confirmed: **Report 20 of 2018 para 4.3.2; Report 6 of 2021 para
2.5.3; Report 7 of 2021 para 1.9.1.1; Report 31 of 2022 para 2.5.1.** The document additionally
supplies the **financial years each report covers** (2016-17; 2017-18 & 2018-19; 2019-20; 2020-21)
and the **report titles**, which the prior pass did not have. Note report 6 of 2021 covers **two**
financial years, so the four reports cover five FYs.

### Annexure 'A' verbatim — surcharge and cess as % of GTR, FY2016-17 to FY2021-22

```
Name of the      2016-17    %GTR   2017-18    %GTR   2018-19    %GTR
levy
SURCHARGE       22408.71    1.31  25873.13    1.35  38611.48    1.86
CESSES         177522.71   10.35 154392.00    8.04 173899.29    8.36

                 2019-20    %GTR   2020-21    %GTR   2021-22    %GTR
SURCHARGE       33086.96    1.65  33064.07    1.63  40758.25    1.50
CESSES         184026.79    9.16 296923.67   14.65 353664.46   13.05
```

This back-fills the series ahead of the 2022-23 start point of items 1/2/3, giving an unbroken
official run FY2016-17 → BE2026-27 across three retrieved answers.

### FINDING NOT IN THE PRIOR PASS — a dated request for the devolution ratio, deflected

This matters for Task B. The MP asked, in terms, for the very ratio Task B is about:

> "(d) whether 15th Finance Commission's recommendation for 41 percent share in Central taxes to
> States have effectively come down on account of growth in indivisible cess and surcharges; and
> (e) If so, details along with exact percentage devolved to states from total central revenue;"

The Government's entire reply to both parts:

> "(d) &(e)  Distribution/Assignment of Cesses and Surcharges levied by the Central Government is
> governed by Articles of 270 and 271 of the Constitution of India."

That is a **non-answer to a specific, dated, on-the-record request for a computed figure** — the
"exact percentage devolved to states from total central revenue". The Government neither supplied
the percentage, nor said the data was unavailable, nor said the concept was undefined. It answered
a constitutional question that was not asked. Recorded here as directly bearing on the Task B
reasonKind determination (see Task B below).

### Verbatim text of the answer (pdftotext -layout, complete)

```
                            GOVERNMENT OF INDIA
                             MINISTRY OF FINANCE
                       DEPARTMENT OF ECONOMIC AFFAIRS
                                RAJYA SABHA

                         UNSTARRED QUESTION NO.1324

      ANSWERED ON TUESDAY, THE 1st August, 2023/Sravana 10, 1945 (Saka)

                    Funds collected from cesses and surcharges

1324 Dr. JOHN BRITTAS:

Will the Minister of Finance be pleased to state:

     a)            whether C&AG observed about instances of retaining the revenue
                   collected through cesses in consolidated fund instead of crediting
                   to dedicated funds;
     b)            if so, details of such instances during last five years;
     c)            the amount collected by cess and surcharge during last five years
                   and their share vis-à-vis gross tax revenue of centre, the details
                   thereof, year-wise and category-wise;
     d)            whether 15th Finance Commission’s recommendation for 41
                   percent share in Central taxes to States have effectively come
                   down on account of growth in indivisible cess and surcharges; and
     e)            If so, details along with exact percentage devolved to states from
                   total central revenue;

                                            ANSWER

                   THE MINISTER OF STATE IN THE MINISTRY OF FINANCE
                            (SHRI PANKAJ CHAUDHARY)

     (a)           Yes, Sir;
     (b)           The details of such instances during last 5 years are given below:
                       F.Y.     C&AG Report No.      Name of Report              Para No.
                     2016-17    20 of 2018           Report of C&AG on           4.3.2
                                                     Compliance of FRBM Act,
                                                     2003
                     2017-18    6 of 2021            Report of C&AG on           2.5.3
                     2018-19                         Compliance of FRBM Act,
                                                     2003
                     2019-20    7 of 2021            Report of C&AG (Financial   1.9.1.1
                                                     Audit)
                     2020-21    31 of 2022           Report of C&AG (Financial   2.5.1
                                                     Audit)

     (c)           Total amount collected on account of Cess and Surcharge during
                   the last 6 years including financial year 2021-22 and their share vis-
                   à-vis gross tax revenue of centre is enclosed at Annexure ‘A’;
     (d) &(e)      Distribution/Assignment of Cesses and Surcharges levied by the
                   Central Government is governed by Articles of 270 and 271 of the
                   Constitution of India.

                                             *****
                                                                                                                                       Annexure 'A'
                               Statement showing collection under Surcharge and Cesses as percentage of Gross Tax Revenue
                                                                                                                                             (₹ crore)
                               % of                   % of                  % of                    % of                  % of                  % of
                             Actuals                Actuals               Actuals                 Actuals               Actuals               Actuals
                    Actuals                Actuals               Actuals               Actuals               Actuals                Actuals
Name of the levy             2016-17                2017-18               2018-19                 2019-20               2020-21                2021-
                    2016-17                2017-18               2018-19               2019-20               2020-21                2021-22
                              w.r.t                  w.r.t                 w.r.t                   w.r.t                 w.r.t                22 w.r.t
                               GTR                    GTR                   GTR                     GTR                   GTR                   GTR
  SURCHARGE         22408.71    1.31       25873.13    1.35      38611.48    1.86      33086.96       1.65   33064.07       1.63    40758.25      1.50

    CESSES         177522.71      10.35 154392.00        8.04 173899.29        8.36 184026.79         9.16 296923.67        14.65   353664.46   13.05

```

---

## Task A — item 4: LS Unstarred Q. 142 — RETRIEVED (T1)

**Verified identity:** Lok Sabha, 18th LS, Session 6, **UNSTARRED QUESTION No. 142**, "RELEASE OF
FUNDS UNDER VARIOUS CENTRALLY SPONSORED SCHEMES", **TO BE ANSWERED ON MONDAY, December 01, 2025 /
AGRAHAYANA 10, 1947 (SAKA)**. Asked by **Shri Murasoli S**. Government of India, Ministry of
Finance, **DEPARTMENT OF EXPENDITURE**.
Answered by **SHRI PANKAJ CHAUDHARY, Minister of State for Finance**.
Prior pass's "LS Unstarred Q. 142, Dept of Expenditure, answered 01.12.2025" is **CORRECT**.

**Discovery URL fetched:**
`https://sansad.in/api_ls/question/qetFilteredQuestionsAns?loksabhaNo=18&ministryCode=39&pageNo=1&size=100&locale=en&keyWord=Centrally%20Sponsored`
→ HTTP **200**, **2,876 bytes**, 5 hits.

**Answer PDF URL fetched:**
`https://sansad.in/getFile/lsapps/loksabhaquestions/annex/186/AU142_6FgksB.pdf?source=lsapps`
→ HTTP **200**, **206,338 bytes**.

**Source stated by the document:** *"Source: Public Financial Management System (PFMS)."*

### Annexure-I — CSS releases, State-wise, ₹ crore (verbatim, complete)

The prior pass's West Bengal row is confirmed **exactly**: 27,406.79 / 18,545.33 / 13,137.87 /
11,386.61 / 9,081.21. Requested rows and totals:

```
                     2020-21       2021-22       2022-23       2023-24       2024-25
Grand Total:     3,86,048.16   4,23,616.63   4,17,283.21   4,19,894.88   3,63,718.78
BIHAR               22,346.15     21,893.52     25,174.75     22,991.59     27,123.16
TAMIL NADU          19,838.22     24,397.21     24,164.13     28,018.59     17,674.73
WEST BENGAL         27,406.79     18,545.33     13,137.87     11,386.61      9,081.21
```

**What the three rows do against a falling denominator.** The all-India total fell 5.8% over the
five years (3,86,048.16 → 3,63,718.78). Against that, **Bihar rose 21.4%**, **Tamil Nadu fell
10.9%** (after peaking at 28,018.59 in 2023-24), and **West Bengal fell 66.9%** — 27,406.79 to
9,081.21, a monotonic decline in every single year with no reversal. West Bengal goes from the
**second-largest CSS recipient in 2020-21** (behind only Maharashtra) to smaller than Punjab,
Himachal Pradesh and Tripura by 2024-25. As a share of the all-India total, WB falls from 7.10%
to 2.50%.

The answer offers no explanation for any state's trajectory. Part (a) asked whether the Government
is *aware* that delayed release had adversely affected States; the reply does not answer yes or no,
it restates the release conditions:

> "The funds to State Governments under the Centrally Sponsored Schemes (CSS) are released by the
> concerned Ministries/Departments as per the scheme guidelines, demand from State, submission of
> Utilization Certificates of the funds released earlier and contribution of commensurate State
> Share."

Those four conditions — guidelines, demand, UCs, matching State share — are the Union's stated
levers. The answer names them without saying which, if any, applied to any State.

### Annexure-II — Central Sector Scheme releases, State-wise (also in the document)

Not requested by the prior pass but carried in the same answer, and it materially changes the
picture, so recorded here:

```
                     2020-21       2021-22       2022-23       2023-24       2024-25
Grand Total:     6,70,729.25   8,43,775.05   9,65,591.28   9,11,271.45   9,38,984.28
BIHAR               11,268.47     15,289.13     18,002.26     13,020.61     15,843.24
TAMIL NADU          19,655.69     16,829.74     18,915.89     16,782.23     21,319.63
WEST BENGAL         15,898.10     18,843.01     22,565.67     15,508.57     25,035.43
DELHI            3,14,235.91   4,39,186.21   5,47,278.42   5,50,020.86   5,56,168.15
```

Two cautions this table forces. First, **West Bengal's Central Sector releases ROSE 57.5%** over
the same window in which its CSS releases fell 66.9% — so a CSS-only reading overstates the
squeeze. Second, the **DELHI row is an artefact, not a transfer to Delhi**: at ₹5.56 lakh crore in
2024-25 it is 59% of the national Central Sector total, because releases to central
Ministries/Implementing Agencies headquartered in Delhi are booked against Delhi. The document's
own footnote is the warning: *"The figures include release to State Treasury as well as
Implementing Agencies."* **Annexure-II is therefore NOT a state-wise geographic allocation and must
not be used as one.** (Annexure-I, CSS, does not show this pathology — Delhi is 18,677.47 in
2024-25, plausible for a UT with legislature.)

This Delhi artefact is worth holding onto: it is the *expenditure-side* mirror of exactly the
attribution problem Task B is about — money booked where the office is, not where the activity is.

### Verbatim text of the answer (pdftotext -layout, complete)

```
                              GOVERNMENT OF INDIA
                               MINISTRY OF FINANCE
                           DEPARTMENT OF EXPENDITURE

                          LOK SABHA
                   UNSTARRED QUESTION No. 142
   TO BE ANSWERED ON MONDAY, December 01, 2025/ AGRAHAYANA 10, 1947
                             (SAKA)

 RELEASE OF FUNDS UNDER VARIOUS CENTRALLY SPONSORED SCHEMES

142.   Shri Murasoli S:

Will the Minister of FINANCE be pleased to state:

   a) whether the Government is aware that inadequate and delayed release of funds under
      various Centrally Sponsored and Central Sector Schemes have adversely affected
      development works and social-welfare initiatives in several States, across the country;

   b) if so, the details thereof; state-wise including Tamil Nadu; and

   c) the total amount of funds released and pending under major Centrally Sponsored and
      Central Sector Schemes during the last five years, State-wise including Tamil Nadu?


                                         ANSWER

THE MINISTER OF STATE FOR FINANCE
(SHRI PANKAJ CHAUDHARY)

   (a), (b) & (c): The funds to State Governments under the Centrally Sponsored Schemes
   (CSS) are released by the concerned Ministries/Departments as per the scheme
   guidelines, demand from State, submission of Utilization Certificates of the funds
   released earlier and contribution of commensurate State Share.

   The total amount of funds released under Centrally Sponsored Schemes and Central
   Sector Schemes during the last five years, State-wise, including funds released to the
   State of Tamil Nadu is given in Annexure-I & II respectively.


                                           ******
Annexure-I referred to in reply of Lok Sabha Unstarred Question no. 142 to be answered on
Monday, December 01, 2025
   State/UT with legislature-wise Releases by Government of India under Centrally Sponsored
                                             Schemes
                                                                                  (Rs. in Crore)
                                                          Year
      State Name             2020-21        2021-22     2022-23        2023-24       2024-25
          Grand Total:
                          3,86,048.16   4,23,616.63    4,17,283.21   4,19,894.88    3,63,718.78
ANDHRA PRADESH
                         12,982.79      10,624.13     16,776.19      14,669.69     11,263.95
ARUNACHAL
PRADESH                  3,177.90       4,878.69      4,353.27       4,467.09      3,589.46
ASSAM
                         15,370.50      23,147.27     24,803.89      23,072.35     20,360.24
BIHAR
                         22,346.15      21,893.52     25,174.75      22,991.59     27,123.16
CHHATTISGARH
                         10,691.27      9,335.47      13,530.07      13,525.26     15,021.81
DELHI
                         24,752.97      66,030.73     26,349.21      16,331.33     18,677.47
GOA
                         186.56         173.43        341.20         381.99        331.82
GUJARAT
                         9,430.04       12,701.03     14,472.82      14,063.07     10,478.10
HARYANA
                         3,878.82       4,014.29      4,405.83       4,023.88      3,495.14
HIMACHAL PRADESH
                         4,390.69       6,902.81      5,861.33       5,047.68      5,750.31
JAMMU AND
KASHMIR                  7,452.78       8,166.19      8,404.45       12,151.38     8,907.59
JHARKHAND
                         9,361.34       9,626.25      11,172.22      11,755.00     9,703.34
KARNATAKA
                         13,577.16      18,297.56     19,191.78      19,421.43     14,807.36
KERALA
                         8,641.49       8,299.85      10,249.13      8,061.49      7,794.77
MADHYA PRADESH
                         25,984.34      30,383.61     30,145.75      26,250.28     27,316.84
MAHARASHTRA
                         47,606.49      16,785.18     24,443.00      30,293.96     27,968.44
MANIPUR
                         3,772.63       3,537.43      3,634.16       1,898.82      2,844.01
MEGHALAYA
                         3,264.12       4,423.31      4,467.45       6,207.04      3,549.10
MIZORAM
                         1,853.71       1,872.91      2,470.16       2,538.77      1,756.20
NAGALAND
                         2,266.71       2,403.95      2,880.78       3,466.93      2,069.18
ODISHA
                         17,276.87      17,940.66     17,287.90      21,804.57     14,497.91
PUDUCHERRY
                               190.55            269.78      269.99      294.60      421.33
PUNJAB
                               3,953.65          4,963.20    5,023.71    4,349.73    5,541.53
RAJASTHAN
                               20,972.79         25,423.81   26,912.36   21,732.16   23,069.67
SIKKIM
                               998.98            1,095.25    1,318.13    1,445.03    1,081.36
TAMIL NADU
                               19,838.22         24,397.21   24,164.13   28,018.59   17,674.73
TELANGANA
                               14,540.60         12,753.72   13,093.87   13,890.81   14,928.02
TRIPURA
                               3,181.37          4,709.48    4,705.62    5,347.58    3,643.09
UTTAR PRADESH
                               40,756.45         44,286.02   51,422.67   63,923.25   45,506.11
UTTARAKHAND
                               5,943.46          5,734.52    6,819.49    7,082.93    5,465.52
WEST BENGAL
                               27,406.79         18,545.33   13,137.87   11,386.61   9,081.21


*Source: Public Financial Management System (PFMS).
Annexure-II referred to in reply of Lok Sabha Unstarred Question no. 142 to be answered on
Monday, December 01, 2025

State/UT with legislature-wise Releases by Government of India under Central Sector Schemes
                                                                               (Rs. in Crore)
                                                       Year
    State Name            2020-21        2021-22     2022-23        2023-24        2024-25
        Grand Total:
                       6,70,729.25   8,43,775.05    9,65,591.28   9,11,271.45    9,38,984.28
ANDHRA PRADESH
                       13,166.21     13,840.97     11,279.84      11,218.13     13,279.45
ARUNACHAL
PRADESH                467.74        666.64        319.15         372.75        415.07
ASSAM
                       5,216.04      5,907.59      4,711.93       7,118.26      7,861.53
BIHAR
                       11,268.47     15,289.13     18,002.26      13,020.61     15,843.24
CHHATTISGARH
                       10,475.46     13,252.70     10,695.63      8,103.89      8,446.95
DELHI
                       3,14,235.91   4,39,186.21   5,47,278.42    5,50,020.86   5,56,168.15
GOA
                       1,865.34      1,924.64      2,918.14       3,454.74      3,079.90
GUJARAT
                       12,271.70     17,124.57     19,567.52      15,937.95     16,840.23
HARYANA
                       8,679.94      12,856.47     13,683.57      15,258.51     22,970.05
HIMACHAL
PRADESH                871.74        1,335.56      1,170.13       1,019.05      987.59
JAMMU AND
KASHMIR                1,524.04      1,426.09      1,119.52       1,511.29      2,160.80
JHARKHAND
                       2,365.75      2,189.87      1,987.80       2,000.48      3,819.77
KARNATAKA
                       11,103.49     14,423.98     15,274.51      13,692.40     14,379.62
KERALA
                       5,967.37      6,896.26      7,262.03       6,039.77      6,106.34
MADHYA PRADESH
                       20,752.80     24,714.54     18,115.45      27,251.69     19,846.20
MAHARASHTRA
                       1,05,914.57   1,22,780.30   1,12,496.94    75,006.00     76,787.38
MANIPUR
                       700.18        681.33        412.19         339.24        690.92
MEGHALAYA
                       1,163.35      2,858.40      2,309.50       2,175.06      1,735.08
MIZORAM
                       584.63        536.39        154.25         205.84        264.30
NAGALAND
                       497.44        626.17        238.59         259.52        277.21
ODISHA
                       14,518.54     16,798.86     15,383.36      21,790.80     17,408.66
PUDUCHERRY
                       197.59        243.05        202.95         221.28        193.96
PUNJAB
                               4,149.25           4,631.25           2,791.38        4,317.48    4,985.18
RAJASTHAN
                               17,432.61          18,748.40          27,821.87       20,998.25   20,595.58
SIKKIM
                               206.60             313.54             117.79          91.87       95.97
TAMIL NADU
                               19,655.69          16,829.74          18,915.89       16,782.23   21,319.63
TELANGANA
                               20,778.65          21,086.50          25,830.61       22,811.45   17,595.39
TRIPURA
                               592.88             628.95             444.34          405.49      326.65
UTTAR PRADESH
                               44,821.45          43,479.52          59,618.40       52,503.18   56,990.94
UTTARAKHAND
                               3,385.75           3,654.43           2,901.65        1,834.82    2,477.11
WEST BENGAL
                               15,898.10          18,843.01          22,565.67       15,508.57   25,035.43


*Source: Public Financial Management System (PFMS)

** The figures include release to State Treasury as well as Implementing Agencies.

```

---

## Task A — item 5: LS Unstarred Q. 5783 — RETRIEVED (T1), with one correction

**Verified identity:** Lok Sabha, 18th LS, Session 7, **UNSTARRED QUESTION NO-5783**, "FUNDS UNDER
SAMAGRA SHIKSHA SCHEME", **ANSWERED ON – 30/03/2026**. Asked by **Smt. June Maliah**.
Government of India, Ministry of Education, **DEPARTMENT OF SCHOOL EDUCATION AND LITERACY**.
Answered by **SHRI JAYANT CHAUDHARY, Minister of State in the Ministry of Education**.
Prior pass's "LS Unstarred Q. 5783, Ministry of Education, answered 30.03.2026" is **CORRECT**.

**CORRECTION to the prior pass.** The prior pass recorded the table as covering
"FY2023-24 / FY2024-25 / FY2025-26" — three years. **The Annexure actually carries FIVE years:
2021-22, 2022-23, 2023-24, 2024-25, 2025-26.** Two additional years are available.

**Discovery URL fetched:**
`https://sansad.in/api_ls/question/qetFilteredQuestionsAns?loksabhaNo=18&ministryCode=12&pageNo=8&size=100&locale=en&keyWord=Samagra%20Shiksha`
→ HTTP **200**. **M3 note: this required paging to page 8 of 8** — see the M3 section below; the
API silently caps results at 10 per page whatever `size` is set to.

**Answer PDF URL fetched:**
`https://sansad.in/getFile/lsapps/loksabhaquestions/annex/187/AU5783_XBHvUl.pdf?source=lsapps`
→ HTTP **200**, **174,587 bytes**.

**Source footnote, verbatim (confirms the prior pass):**
> "Source: PAB Minutes / PFMS / PRABANDH Portal, as on 27.03.2026"

The prior pass had "PAB Minutes / PFMS / PRABANDH Portal"; the document adds the as-on date
**27.03.2026** — three days before the answer.

### Annexure — Central Allocation vs Central Share Released, ₹ lakh (requested rows, verbatim)

Every prior-pass figure confirmed **exactly**.

```
                  2021-22              2022-23              2023-24              2024-25              2025-26
State         Alloc     Released   Alloc     Released   Alloc     Released   Alloc     Released   Alloc     Released
BIHAR       382755.00  340608.45  501887.29 355459.46  502132.66 424173.08  499123.47 421781.44  589656.73 553372.53
KERALA       25221.99   22512.79   34847.00  17815.99   34334.47  14165.74   42889.42      0.00   45204.68   9241.16
TAMIL NADU  164996.07  159882.18  211759.90 210723.33  212764.72 187615.54  215315.01      0.00  184722.37  62619.52*
WEST BENGAL 133877.32  130974.48  177338.04 152204.21  176747.91  31129.41  174579.86      0.00  199839.46      0.00
Total      3467173.25 2487318.45 4449394.26 3215194.42 4564755.29 3238278.58 4747566.76 3445820.90 4701725.80 2999682.58

* includes funds amounting to Rs. 36281.00 lakh for FY 2024-25
```

**Confirmed exactly:** Tamil Nadu FY2024-25 **215,315.01 allocated / 0.00 released**; West Bengal
FY2024-25 **174,579.86 / 0.00** and FY2025-26 **199,839.46 / 0.00**; Kerala FY2024-25
**42,889.42 / 0.00**; Bihar all years.

**Three things the extra years reveal that the three-year view did not:**

1. **West Bengal's collapse starts a year earlier than 2024-25.** WB was paid essentially in full in
   2021-22 (130,974.48 of 133,877.32 = 97.8%) and 2022-23 (85.8%). **FY2023-24 is the break:
   31,129.41 released against 176,747.91 allocated = 17.6%.** Then 0.00 in 2024-25 and 0.00 in
   2025-26. **Two consecutive years of literally nil release against ₹3,74,419.32 lakh allocated**,
   preceded by an 82% cut. That is a three-year sequence, not a single zero.
2. **Tamil Nadu's zero was partly reversed in arrears.** The asterisk on TN's 2025-26 figure —
   *"includes funds amounting to Rs. 36281.00 lakh for FY 2024-25"* — means TN's 2024-25 nil was
   later part-paid: ₹36,281.00 lakh against ₹2,15,315.01 lakh allocated, about 16.9%. **No such
   asterisk appears against West Bengal.** TN's zero is a delay; WB's is not.
3. **The zeros are not a general funding shortfall.** The all-India total released stayed between
   ₹29.99 lakh crore and ₹34.46 lakh crore across the five years, and Bihar was paid 93.8% of
   allocation in 2025-26 in the same year WB received nil.

### THE KEY FINDING — the Government links Samagra Shiksha release to the PM-SHRI MoU, on the record

Part (c) of the question asked directly *"whether it is a fact that the funds under the said scheme
have not been given to some States because these States are not implementing PM Shri scheme."*
The reply never says "yes". But it does not say no either, and it supplies the linkage itself:

> "States and UTs are required to sign a Memorandum of Understanding (MoU) with the Department of
> School Education and Literacy (DoSE&L), Ministry of Education, Government of India, for
> implementation of PM SHRI scheme. **However, West Bengal has not signed the PM SHRI MoU.** The
> issue of PM SHRI MoU has been followed up with requests and repeated reminders at the level of
> Secretary and Union Minister. However, the State has not responded."

> "Since, the State is implementing Samagra Shiksha Scheme which has been aligned with NEP 2020, it
> would be appropriate that the State comes forward to implement and showcase all the initiatives
> of NEP 2020 including under PM SHRI Scheme… In fact, implementation of Samagra Shiksha Scheme is
> implementation of NEP 2020 and PM SHRI Schools are exemplar schools of NEP 2020."

Read against parts (b) and (c) — *"the reasons for not releasing the said funds to the State of West
Bengal"* — the Government's answer to a question about **why Samagra Shiksha money was not
released** consists of (i) the general Ministry-of-Finance release conditions and (ii) **the fact
that West Bengal has not signed the PM-SHRI MoU**. The two schemes are legally distinct; the answer
supplies no other State-specific reason. The final sentence collapses the distinction outright
("implementation of Samagra Shiksha Scheme is implementation of NEP 2020").

The stated general conditions, verbatim, for completeness:
> "The funds are released based on the fulfilment of conditions prescribed by Ministry of Finance
> such as pace of expenditure, receipt of commensurate State share, audited accounts, statement
> cumulative State share, statement on outstanding advances, up-to date expenditure statement,
> furnishing of information as prescribed."

Note also the framing the reply opens with — *"Education is in the concurrent list of the
Constitution"* — which concedes the subject is shared while the funding lever is not.

### Verbatim text of the answer (pdftotext -layout, complete)

```
                         GOVERNMENT OF INDIA
                         MINISTRY OF EDUCATION
              DEPARTMENT OF SCHOOL EDUCATION AND LITERACY

                                  LOK SABHA
                           UNSTARRED QUESTION NO-5783
                             ANSWERED ON –30/03/2026

                    FUNDS UNDER SAMAGRA SHIKSHA SCHEME

5783. Smt. June Maliah:

Will the Minister of EDUCATION be pleased to state:

(a) the details of the amount of funds (in Rs.) allocated and released by the Union
Government under Samagra Shiksha Abhiyaan during the last five years, year and State/UT-
wise;

(b) the reasons for not releasing the said funds to the State of West Bengal; and

(c) whether it is a fact that the funds under the said scheme have not been given to some
States because these States are not implementing PM Shri scheme and if so, the details thereof?

                                             ANSWER

MINISTER OF STATE IN THE MINISTRY OF EDUCATION

(SHRI JAYANT CHAUDHARY)


(a): The details of the amount of funds allocated and released by the Union Government under
Samagra Shiksha Abhiyaan during the last five years, year and State/UT- wise is at Annexure.

(b) & (c): Education is in the concurrent list of the Constitution and majority of the schools
are under the domain of respective State and UT Governments. The Centrally Sponsored
Scheme of Samagra Shiksha is implemented in partnership with all the States and UTs.
Financial assistance is provided to all States and UTs for various components for
implementation of the interventions under Samagra Shiksha as per norms. Accordingly, the
annual plans under Samagra Shiksha are prepared by the States and UTs based on their
requirements and priority and this is reflected in their respective Annual Work Plan and Budget
(AWP&B). These plans are then appraised and approved by Project Approval Board (PAB) in
consultation with the States and UTs as per the programmatic and financial norms of the
scheme. The funds are released based on the fulfilment of conditions prescribed by Ministry of
Finance such as pace of expenditure, receipt of commensurate State share, audited accounts,
statement cumulative State share, statement on outstanding advances, up-to date expenditure
statement, furnishing of information as prescribed.

      The scheme of Samagra Shiksha has been aligned with the National Education Policy
(NEP) 2020. The Centrally Sponsored Scheme of PM-SHRI envisages to showcase the
implementation of the National Education Policy 2020 and emerge as exemplar schools over a
period of time, and also offer leadership to other schools in the neighbourhood.

        States and UTs are required to sign a Memorandum of Understanding (MoU) with the
Department of School Education and Literacy (DoSE&L), Ministry of Education, Government
of India, for implementation of PM SHRI scheme. However, West Bengal has not signed the
PM SHRI MoU. The issue of PM SHRI MoU has been followed up with requests and repeated
reminders at the level of Secretary and Union Minister. However, the State has not responded.

         Since, the State is implementing Samagra Shiksha Scheme which has been aligned with
NEP 2020, it would be appropriate that the State comes forward to implement and showcase all
the initiatives of NEP 2020 including under PM SHRI Scheme in order to develop government
schools of the State as exemplar schools to facilitate best school education services. In fact,
implementation of Samagra Shiksha Scheme is implementation of NEP 2020 and PM SHRI
Schools are exemplar schools of NEP 2020.

                                             ***
                                                                                                                                           ANNEXURE


 ANNEXURE REFERRED TO IN REPLY TO PART (a) OF LOK SABHA UNSTARRED QUESTION NO. 5783 ANSWERED ON
 30.03.2026 ASKED BY SMT. JUNE MALIAH HON’BLE MEMBER OF PARLIAMENT REGARDING FUNDS UNDER SAMAGRA
 SHIKSHA SCHEME


 State/UT-wise details of the amount of funds allocated and released by the Union Government under Samagra Shiksha during the last five years

                                                                                                                                    (Rs. in lakh)
                               2021-22                    2022-23                    2023-24                    2024-25                       2025-26
         Name of the                 Central                    Central                    Central                    Central                       Central
Sl.No.                   Central                    Central                    Central                    Central                    Central
           State                      Share                      Share                      Share                      Share                         Share
                        Allocation                 Allocation                 Allocation                 Allocation                 Allocation
                                     Released                   Released                   Released                   Released                      Released
         A&N                                                                                                                            8939.32
  1                        5637.45       3152.32      7402.10       5651.44      9532.55       5527.59      8484.17       6052.36                       3067.72
         Islands
         Andhra                                                                                                                      140772.43
  2                     134853.54     68301.36     171258.59    150359.02     179657.61 128940.788       173293.31    124010.57                     101269.35
         Pradesh
         Arunachal                                                                                                                    78323.47
  3                      44215.86     27996.24      53369.59     25229.47      59601.03     47503.49      64447.49     57585.11                      46027.72
         Pradesh
  4      Assam          197702.88    156156.40     251460.08    208086.22     260407.29    181046.93     288347.22    202677.34      368806.99      282303.77
  5      Bihar          382755.00    340608.45     501887.29    355459.46     502132.66    424173.08     499123.47    421781.44      589656.73      553372.53
  6      Chandigarh      10024.09     10804.09      12422.81     10979.21      13213.99     11636.31      13720.64     11858.35       14810.08       12005.58
  7      Chhattisgarh    88790.33     33236.78     113833.06     82800.00     120045.11     77659.06     126779.26     83065.84      118482.35       54421.99
         D&D and                                                                                                                      10972.68
  8                        6740.66       2092.45      8793.65       6466.66      9537.23       4130.25      9802.68       5462.64                       6464.84
         DNH
  9      Delhi           31521.05     14588.04      37727.38     22193.92      37783.60     14608.83      56633.22     38539.03       55245.42       36574.97
 10      Goa              1861.00      1102.19       2985.77      2985.77       3077.84      1875.43       2426.79      1633.61        2770.98        2038.88
 11      Gujarat        100974.38     89375.71     137120.75    132125.03     133473.51    113253.16     160173.72    124554.05      143519.86      126776.81
 12      Haryana         82538.73     51709.18      96350.03     67021.33     101502.76     57880.24     107632.86     53643.94       84604.25       28230.86
         Himachal                                                                                                                     71073.55
 13                      58166.16     31910.05      73808.17     55160.13      68685.12     48596.96      76494.93     52619.99                      52015.39
         Pradesh
         Jammu &                                                                                                                     143599.16
 14                     132021.74     87398.83     165059.67     36497.18     173649.67     86543.88     172160.13     82349.31                      51692.10
         Kashmir
 15      Jharkhand          90018     85897.13     116768.12    115451.63     125218.51    110493.28     117386.04    107444.41      115690.18       77742.52
                                     2021-22                           2022-23                2023-24                 2024-25                 2025-26
         Name of the                         Central                        Central                 Central                 Central                 Central
Sl.No.                      Central                           Central                   Central                 Central                 Central
           State                              Share                          Share                   Share                   Share                   Share
                           Allocation                        Allocation                Allocation              Allocation              Allocation
                                             Released                       Released                Released                Released                Released
 16      Karnataka       70761.11   47451.63 100494.06    86152.48   95443.12   82808.79   93654.51   86830.33 110332.70    79054.19
 17      Kerala          25221.99   22512.79   34847.00   17815.99   34334.47   14165.74   42889.42       0.00   45204.68    9241.16
 18      Ladakh           9999.72    5717.55   12349.12    1489.36   19159.03    5222.63   20099.43   13999.80   22630.62   13940.53
 19      Lakshadweep       573.33     216.15     786.86     432.99     575.47     100.05     741.78     306.12     881.10     310.70
         Madhya                                                                                                 375084.65
 20                     294630.92 229279.75    372787.9 193928.88 389333.20 298151.13 412209.15 343471.12                  303907.55
         Pradesh
 21      Maharashtra    101370.47   69302.88 159289.59       90000 134800.53    100119.1 143859.39 112624.52 143182.77      96815.32
 22      Manipur         37042.52   18250.19   49418.88    40475.7   49677.82   25721.89   53200.51   46559.15   59620.04   21813.90
 23      Meghalaya       30584.23   27171.38   37515.29   37515.29   40496.07   39418.22   39882.71   36282.56   40658.74   24638.62
 24      Mizoram         22559.99   17968.14   32308.05   14268.09   36087.44   27414.06   29798.67   21651.76   33224.04   10029.98
 25      Nagaland        21808.76   13734.16    28104.5   28104.49   33362.73   23125.34   28439.24   21140.50   36020.06   24766.61
 26      Odisha         145334.43 123807.39 184107.55 183666.84 196376.54 123660.69 193480.26 167239.29 213955.90 132364.59
 27      Puducherry         1514     1397.54     1987.3    1527.52    2256.40    1247.37    1974.29    1246.03    2126.35     873.36
 28      Punjab          54353.29   50127.01   71906.33   60504.93   71866.49   33111.65   70878.25   67813.14   86111.96   58620.27
 29      Rajasthan      273019.53 240582.13 345219.75 213861.12 359233.85 320289.45 386553.20 309065.25 361870.80 201551.91
 30      Sikkim          12249.29   10012.46   15176.05   10718.96   16891.64   13260.51   15661.00   12273.95   16641.54    7887.77
 31      Tamil Nadu     164996.07 159882.18    211759.9 210723.33 212764.72 187615.54 215315.01           0.00 184722.37 62619.52*
 32      Telangana       88061.36   55327.91 114385.92 114251.02 116557.40      92012.79 116271.55    98878.94 108827.22    98858.92
 33      Tripura         31820.19   22692.81   38741.08   28672.54   44074.73   34132.90   45179.94   42002.98   50742.20   35865.63
 34      Uttar Pradesh 512311.24 204497.10 626179.97 381975.27 664429.01 427645.13 697621.18 626479.22 589243.27 350868.06
 35      Uttarakhand     67262.62   32083.60   84444.06   70438.94   72768.26   44056.91   88371.48   64678.27   73537.88   31648.97
 36      West Bengal    133877.32 130974.48 177338.04 152204.21 176747.91       31129.41 174579.86        0.00 199839.46        0.00
             Total     3467173.25 2487318.45 4449394.26 3215194.42 4564755.29 3238278.58 4747566.76 3445820.90 4701725.80 2999682.58
          Source: PAB Minutes / PFMS / PRABANDH Portal, as on 27.03.2026
          * includes funds amounting to Rs. 36281.00 lakh for FY 2024-25



                                                                                        ***

```

---

## Task A — not retrieved

**None. All seven items in Task A were retrieved directly (T1), each with its exact URL, HTTP code
and byte count recorded above.** No M1 fallback modes were needed beyond mode 2 (curl with explicit
`--resolve`); mode 3 (Playwright / WebFetch) was unavailable throughout and was not required.

Question numbers and dates supplied by the prior pass were **all correct**. One substantive
correction was needed, to the *coverage* of item 5's table (five years, not three), not to its
identity.

---
## Task A — M3 note: a silent truncation in the Lok Sabha API

**Recording this because it is the same failure shape as the earlier phase's `href="…"` bug — HTTP
200 throughout, well-formed output, and a silent, complete loss of records.**

`https://sansad.in/api_ls/question/qetFilteredQuestionsAns?...&size=100&...` **caps results at 10
per page regardless of the `size` parameter.** Nothing in the response signals truncation: no total
count, no `hasMore` flag, no non-200. Setting `size=100` and reading the first page returns exactly
10 records and looks complete.

Demonstrated on the item-5 lookup. `loksabhaNo=18&ministryCode=12&keyWord=Samagra%20Shiksha`:

```
 page 1 -> 10   cum 10
 page 2 -> 10   cum 20
 page 3 -> 10   cum 30
 page 4 -> 10   cum 40
 page 5 -> 10   cum 50
 page 6 -> 10   cum 60
 page 7 -> 10   cum 70
 page 8 ->  5   cum 75
```

**Q. 5783 — the item this task required — was on page 8 of 8.** Results are ordered by date
descending, so the first page holds only the most recent ten questions on the subject. A
single-page search would have returned HTTP 200, ten plausible Samagra Shiksha questions, and no
Q.5783, and would have supported a confident and false "not found".

**Rule for any future pass:** page until a page returns an empty `listOfQuestions`, and report the
cumulative count. Treat any single-page LS API result as unverified.

The Rajya Sabha `rsdoc.nic.in` endpoint does **not** have this defect — it returns the full result
set in one response (`qno=18` → 175 records / 411,346 bytes; `qtitle like '%Cess%'` → 3,202 records
/ 7,493,249 bytes).

## Task A — positive controls established (M3)

Every one of the seven items was retrieved, so the corpus is demonstrated present rather than
merely assumed. The controls, stated explicitly:

| Control | Query | Result | Proves |
|---|---|---|---|
| LS API live and correctly indexed | `loksabhaNo=18&ministryCode=39&keyWord=cess` | HTTP 200, 5,713 B, first hit = Q.137 / 20.07.2026 / S Venkatesan | LS Finance corpus present for Session 8 (July 2026) |
| LS API reaches older sessions | `loksabhaNo=18&ministryCode=39&keyWord=Centrally Sponsored` | HTTP 200, 2,876 B, 5 hits spanning 22.07.2024 → 02.02.2026 | LS corpus covers Sessions 1–8 of the 18th LS |
| LS API deep pagination | `ministryCode=12&keyWord=Samagra Shiksha`, pages 1–8 | 75 records, Q.5783 found on page 8 | truncation identified, not inferred |
| RS endpoint live | `whereclause=qno=240` | HTTP 200, 382,613 B, 161 records | RS corpus present |
| RS endpoint reaches 2023 | `whereclause=qno=1324` → 01.08.2023 record retrieved | HTTP 200, 198,592 B, 84 records | RS corpus covers at least Session 260 (Aug 2023) → Session 271 (Jul 2026) |
| RS free-text subject search | `whereclause=qtitle like '%Cess%'` | HTTP 200, 7,493,249 B, **3,202 records** | subject-wide sweep is possible on RS |
| PDF host reachable, both houses | 7 PDFs fetched | all HTTP 200, 174 KB – 927 KB, all parsed to text | `sansad.in/getFile/...` serves both `?source=lsapps` and `?source=pqars` |

Filename convention note: session-260 RS files are plain `AU1324.pdf`; later sessions carry a
random suffix, `AU240_i4p811.pdf`. A URL pattern assuming the suffix would 404 on older sessions.

## Schema constraint governing the Task B recommendation

Read directly from `schemas/ledger.schema.json` (read-only; nothing under `/data` or `/schemas` was
modified). The enum is exactly four values, and the governing sentence is narrower than the brief
implied:

> reasonKind — "The STATED reason no figure exists — **what the responsible body says, not what is
> true**. Where the stated reason is contradicted, set reasonDisputed and carry the contradiction in
> `why`."
>
> THE TEST IS WHETHER THE DATA EXISTS, asked in this order:
> - `not-collected`: never gathered. No record exists to release. If the holder were compelled
>   tomorrow they would have nothing to produce.
> - `not-published`: exists in a holder's hands, not released. The test is producibility under
>   compulsion, not whether anyone has asked.
> - `withheld`: exists, release was specifically requested or legally required, and was refused.
>   Narrower than not-published — requires an identifiable refusal, not merely absence of release.
> - `never-defined`: no agreed definition exists for the quantity, so it could not be collected even
>   in principle. NOT "nobody has studied it" — an unstudied but definable quantity is not-collected.

Two further constraints found in `tools/lib/integrity.mjs` that bear on the choice:

1. **`not-published` and `withheld` ENTAIL A ROUTE.** `ENTAILS_A_ROUTE = new Set(['not-published',
   'withheld'])` — using either without naming a `wouldFill` (a holder and an instrument, not a
   placeholder) is a hard **error**, on the reasoning that those values "assert the data exists and
   is producible… so a route exists by the value's own definition". `not-collected` and
   `never-defined` stay warnings, because for those "no route may exist, and demanding one invites
   a placeholder."
2. **`reasonDisputed` is not a fifth value.** It is a boolean with `disputeKind` ∈
   {`evidentiary`, `normative`} — evidentiary where evidence contradicts that the data does not
   exist; normative where the facts are agreed and only the characterisation of the non-release is
   contested.

**Consequence for Task B:** the deciding evidence is a sentence in which the *responsible body
itself* characterises the absence. Our own reasoning about destination-based GST or registered-office
attribution establishes what is *true*, which sets `reasonDisputed`/`why` — it does not by itself set
`reasonKind`. And any recommendation of `not-published` or `withheld` must come with a named holder
and instrument or it will fail the integrity gate.

---

## Task B — what the two prior sweeps already established (read from this phase's own parts)

Read-only, so the recommendation below builds on the prior sweeps rather than repeating them.
Part `06-tamil-nadu.md` already carries two findings that bound the question — **but note they
answer an adjacent question, not this one, and the distinction matters.**

**Prior finding A-8** concerns the **ratio as quoted** ("for every rupee TN contributes it gets back
X paise") and settled at `not-published`, on two independent negative corpora with positive controls:
the FC-commissioned *Tamil Nadu State Government Finances* study never computes it and never uses
"paise" / "for every rupee" / "per rupee" while carrying every adjacent figure of the same genus
(F-23); and across the five machine-readable CAG State Finances Audit Reports FY2019-20 → FY2023-24
those three phrases return **zero hits against a positive control of "devolution" returning 3–13 hits
in every edition** (F-33).

**Prior finding D4** takes apart the sentence into four constructions and concludes, of construction 1
(tax collected in TN → transfers received):

> "Union tax collection is attributed to the place of **assessment or registration**, not of economic
> incidence… **Under GST the problem is definitional rather than empirical** — IGST is settled to the
> **destination** State by statute, so 'GST collected in Tamil Nadu' is not a quantity that means what
> the sentence needs it to mean."

**Why this does not by itself settle the present question.** Three reasons, and they set the bar for
what this pass has to find:

1. **Different quantity.** A-8 is about the **ratio** — a numerator over a denominator. Task B is
   about the **numerator alone**: whether any body computes a State's contribution to the Union
   exchequer. A ratio can be unpublished because nobody divided, while both inputs are published.
   A-8's `not-published` therefore does not transfer.
2. **Different scope.** A-8's two corpora are both **Tamil Nadu-specific** (an FC-commissioned TN
   study, and TN's own CAG State Finances Audit Reports). Neither is an instrument one would expect
   to compute a *national* state-wise contribution table even if one existed. The negative is real
   but narrow; it does not reach CBDT, GSTN, the Receipt Budget or the Finance Commission.
3. **Wrong kind of authority for `reasonKind`.** D4's destination-based-GST argument is the
   instrument's **own reasoning about what is true**. Under the schema, reasonKind records **what the
   responsible body says**. D4 is therefore material for `why` and for `reasonDisputed`, and is
   **not** on its own evidence for `never-defined`. To reach `never-defined` this pass needs a
   *body* to say it — which is precisely what the two agent sweeps were sent to find.

**So the open question this pass must close is narrower and sharper than the prior sweeps':
does any official Indian instrument publish a state-wise attribution of Union revenue, and has any
official body ever characterised such an attribution as impossible, unmaintained, or undefined?**

---

## Task A — bonus item found in the sweep: RS Unstarred Q. 1840 — RETRIEVED (T1)

Not on the task list. Surfaced by the `qtitle like '%Cess%'` sweep and retrieved because it is
**newer than all seven listed items** (04.08.2026 — the most recent cess answer in the corpus) and
because it carries a Government aggregate that none of the seven states.

**Verified identity:** Rajya Sabha, **UNSTARRED QUESTION No. 1840**, "Total collection of Cess and
Surcharge", **ANSWERED ON Tuesday, THE 4th August, 2026 / 13 Shravana, 1948 (Saka)**, Session 271.
Asked by **Shri R. Girirajan**. Ministry of Finance, Department of Economic Affairs.
Answered by **SHRI PANKAJ CHAUDHARY, Minister of State in the Ministry of Finance**.

**Answer PDF URL fetched:** `https://sansad.in/getFile/annex/271/AU1840_LOhn2Q.pdf?source=pqars`
→ HTTP **200**, **113,760 bytes**.

**Answer (a), verbatim — the five-year aggregate:**
> "An amount of about **₹32.05 lakh crore** was collected as cesses and surcharges during the last
> five financial years. **Out of these, only cesses are collected for designated purposes.** An
> amount of about **₹21.38 lakh crore** was transferred (Actuals/RE) to the designated Cess/ Reserve
> Funds to enable utilisation of collections for designated purposes, against the cess collections
> of about **₹18.88 lakh crore** during the last five years."

**Two things in that sentence.**

First, **the Government states in terms that surcharges have no designated purpose.** ₹32.05 lakh
crore total less ₹18.88 lakh crore of cesses leaves **about ₹13.17 lakh crore of surcharges collected
over five years for no designated purpose at all** — while, per items 1 and 3, being excluded from
the divisible pool under Article 270. Cesses at least carry an earmark the Government can be held to;
surcharges carry neither an earmark nor a share to the States. This is the Union's own
characterisation, not an inference.

Second, the ₹21.38 lakh crore transferred against ₹18.88 lakh crore collected is the same
transferred-more-than-collected framing as item 7 — and it is subject to the same qualification, since
per item 3 the excess arises from Health & Education Cess transfers that exceed collections in every
year shown, while the AIDF and OIDF lines show years of nil transfer. **An aggregate net of ₹2.50
lakh crore conceals two funds that received nothing for two and four years respectively.**

**Answer (b) & (c), verbatim — the concession by omission:**
> "In respect of Health and Education Cess, the designated Reserve Funds, namely, Pradhan Mantri
> Swasthya Suraksha Nidhi (PMSSN), Prarambhik Shiksha Kosh (PSK) and Madhyamik and Uchchatar Shiksha
> Kosh (MUSK) **have been in operation since FY 2022-23**."

The MP asked "the reasons for **not** operationalising the designated fund". The reply gives the date
from which the funds *were* operationalised and no reason for the period before it — which concedes
that before FY2022-23 two of the three were not in operation (item 3's footnote dates the C&AG
approval to **December 2022**) without addressing why.

### Verbatim text of the answer (pdftotext -layout, complete)

```
                                GOVERNMENT OF INDIA
                                 MINISTRY OF FINANCE
                           DEPARTMENT OF ECONOMIC AFFAIRS

                                 RAJYA SABHA
                       UNSTARRED QUESTION No. 1840
           ANSWERED ON Tuesday, THE 4th August, 2026/ 13 Shravana, 1948 (Saka)
                             Total collection of Cess and Surcharge
1840 Shri R. Girirajan:
Will the Minister of Finance be pleased to state:


     a)     the total Cess and Surcharge collected in the last 5 years and its utilisation for the
            designated purpose for the same period;
     b)     whether Government has taken a serious note that various cess like the Health and
            Education Cess was not transferred to the designated reserve fund meant to support
            schemes such as AB-PMJAY and Samagra Shiksha;
     c)     the reasons for not operationalising the designated fund; and
     d)     the corrective measures taken to ensure transparent utilisation of cess proceeds for their
            intended purposes?

                                             ANSWER

                      THE MINISTER OF STATE IN THE MINISTRY OF FINANCE
                                 (SHRI PANKAJ CHAUDHARY)
                                        *****

a)           An amount of about ₹32.05 lakh crore was collected as cesses and surcharges during
             the last five financial years. Out of these, only cesses are collected for designated
             purposes. An amount of about ₹21.38 lakh crore was transferred (Actuals/RE) to the
             designated Cess/ Reserve Funds to enable utilisation of collections for designated
             purposes, against the cess collections of about ₹18.88 lakh crore during the last five
             years.

 b) & c)     In respect of Health and Education Cess, the designated Reserve Funds, namely,
             Pradhan Mantri Swasthya Suraksha Nidhi (PMSSN), Prarambhik Shiksha Kosh
             (PSK) and Madhyamik and Uchchatar Shiksha Kosh (MUSK) have been in
             operation since FY 2022-23.

     d)      Transparency in utilization of cess proceeds for their intended purposes is ensured
             by seeking due appropriation from the Parliament before expenditure under defined
             schemes is met from the designated Reserve Fund(s).

                                              ******

```

---

# Task B — does any body compute a state's contribution to the Union exchequer?

**Short answer: no body computes it — but the reason is not the one that was expected, and the
question turns out to be answerable from the Government's own repeated words rather than from
inference.** The Union publishes a State-wise table for **direct** tax and a State-wise table for
**domestic GST**, and states on the record, three times across sixteen years, that State-wise
**indirect** tax collection **"is not maintained"**. The composite has never been assembled by
anyone, and the Finance Commission — the one body constitutionally placed to want it — used a
contribution-to-tax criterion for its first nine incarnations and then abandoned it.

## What IS published

### Direct tax, State-wise — PUBLISHED ANNUALLY BY CBDT (T1)

`https://www.incometaxindia.gov.in/documents/d/guest/final-time-series-data-pdf`
→ HTTP **200**, **986,796 bytes**, PDF v1.7, 15 pp. *"Income Tax Department / Time Series Data /
Financial Year 2000-01 to 2024-25"*, **"Issued by CENTRAL BOARD OF DIRECT TAXES"**.

**Section 1.2, "State And U.T. Wise Break-Up of Collection"** (tables pp. 3-4) gives collection by
**named State and UT** — not by CCIT charge — for FY2018-19 → FY2024-25 in ₹ crore. FY2024-25 rows:

```
 Maharashtra       8,97,425.86        Tamil Nadu        1,32,368.09
 Karnataka         2,61,528.83        Uttar Pradesh        69,011.21
 Delhi             2,29,250.33        Bihar                 6,904.99
 State Sub-total  21,39,245.55        UT Sub-total          9,842.69
 C.T.D.S.             41,723.25       Foreign              35,715.47
 Unapportioned          -152.02       Grand Total       22,26,374.94
```

**The attribution basis is stated — and it is a postal attribute.** The notes beneath the table,
verbatim:

> "Note-1 : The interpretation of 'Foreign' is the state-code mentioned in **communication address**
> is '99' as Outside India."
> "Note-2:- The interpretation of 'unapportioned' is the state-code mentioned in **communication
> address** is either blank / null or it holds an incorrect value."

The notes exist only to explain the residual buckets, but in doing so they disclose the key for the
whole table: **a rupee is assigned to the State in the assessee's communication address on the
filing record.** Not where the activity occurred, not where the workforce is, not where the value
was added. The internal evidence that this is a registered-office artefact is on the face of the
table — **Maharashtra alone is 40.3% of the national total**, and Maharashtra + Delhi + Karnataka
are about 62% of all direct tax in India.

Three further classes sit **outside the State partition by construction**: `C.T.D.S.` (Central TDS,
₹41,723.25 cr) is assigned to no State at all; `Foreign` (₹35,715.47 cr); `Unapportioned`
(−₹152.02 cr).

**No disclaimer.** A full-text search of the document for
`disclaim|caution|should not|may not|does not represent|not be construed|construed|caveat|limitation|head office|registered office|jurisdiction`
returned **zero matches**. CBDT publishes a State-wise rupee total with **no warning that it must
not be read as a State's contribution**, and never uses the words "head office" or "registered
office" to explain the concentration.

### GST, State-wise — PUBLISHED MONTHLY (T1)

`https://tutorial.gst.gov.in/downloads/news/final_monthly_gst_data_for_may_2026_for_publishing.pdf`
→ HTTP **200**, **1,074,430 bytes**, PDF v1.3, 5 pp. Header: *"GST Gross and Net Collections as on
5/31/2026"*. This is the sheet the monthly PIB release links to.

Four State-wise tables, of which **Table 2, "State-wise growth of GST Revenues during May, 2026"**
is the closest to "GST collected in each State" (Maharashtra 29,141; Karnataka 13,130; Tamil Nadu
9,834; Bihar 1,588; Grand Total 1,34,530 ₹ cr).

**Two structural facts in the sheet defeat any origin reading, and both are the Union's own:**

1. **About 30.7% of gross GST is attributed to no State at all.** The footnote to Table 2 reads
   simply *"Does not include GST on import of goods"* — and import IGST for May 2026 was **₹59,654
   crore against total gross GST of ₹1,94,184 crore**. Nearly a third of the tax has no State line
   because it is collected at the port of entry.
2. **The settlement column is the destination principle made arithmetic.** Comparing pre- and
   post-settlement SGST cumulative for 2026-27 (₹ cr):

```
   State              Pre-Settlement   Post-Settlement   ratio
   Bihar                    1,662            5,543       3.34x
   Uttar Pradesh            7,469           17,755       2.38x
   Rajasthan                3,686            8,839       2.40x
   Haryana                  4,754           10,370       2.18x
   Tamil Nadu               8,501           15,316       1.80x
   Karnataka               10,025           17,786       1.77x
   Maharashtra             23,898           39,587       1.66x
   Grand Total          1,06,474         2,05,684        1.93x
```

   **Consuming States gain most (Bihar 3.34x); the largest collector gains least (Maharashtra
   1.66x).** The settlement machinery exists precisely to undo origin-of-collection. "Collected in a
   State" and "accrues to that State" are different quantities and the Government publishes both,
   side by side, in the same table.

Named non-State residues appear in the tables themselves: `Center Jurisdiction`, `Other Territory`,
and `99 OIDAR` (online services supplied from abroad).

### Indirect tax other than GST, State-wise — THE GOVERNMENT STATES IT IS NOT MAINTAINED

This is the load-bearing finding of the whole task and it is stated three times over sixteen years,
by three different Ministers, in three unrelated answers. All three retrieved T1.

## What was asked in Parliament, and answered

### B-1. RS Unstarred Q. 1976, 10.03.2026 — "Gross Tax Revenue from Tamil Nadu" (T1)

Ministry of Finance (Dept of Revenue), **SHRI R. DHARMAR**, Session 270.
PDF: `https://sansad.in/getFile/annex/270/AU1976_VmDCsG.pdf?source=pqars` → HTTP **200**,
**253,695 bytes**.

Asked, verbatim: *"(a) the total amount of Gross Tax Revenue collected from Tamil Nadu during the
last three years, year-wise; (b) the total devolution of Central taxes and grants-in-aid released to
the State during the said period… (d) the steps taken by Government to ensure equitable distribution
of Central funds to the State?"*

Answered (MoS Finance, Shri Pankaj Chaudhary): direct-tax collection from Tamil Nadu **supplied** —
2022-23 ₹1,23,225.2 cr; 2023-24 ₹1,48,558.84 cr; 2024-25 ₹1,65,899.23 cr (footnoted as Pr. CCIT
Tamil Nadu **& Puducherry**, i.e. the charge is not the State); devolution supplied (TN 38,731 /
46,072 / 52,492 / 51,655 ₹ cr). And then:

> **"However, in case of Indirect Taxes State-Wise data is not maintained."**

**This is the single most important sentence in the sweep.** Asked for a State's *gross tax revenue*
contribution, the Government supplies the direct-tax half and declares the indirect-tax half not
maintained. The numerator of the famous ratio cannot be assembled from official inputs, on the
Government's own account, as of March 2026.

### B-2. RS Unstarred Q. 231, 05.12.2023 — "Revenue collected from Kerala" (T1)

Ministry of Finance (Dept of Revenue), **DR. JOHN BRITTAS**, Session 262.
PDF: `https://sansad.in/getFile/annex/262/AU231.pdf?source=pqars` → HTTP **200**, **252,606 bytes**.

This is the purest possible statement of the question — every central tax head, enumerated, asked of
one named State:

> "(a) the corporation Tax, Income Tax, Wealth Tax, Central GST, Customs Duty, Union Excise Duty,
> Service Tax as well as Other Taxes and Duties **collected from Kerala by the Union Government**
> from 2017-18 to 2022-23; and (b) the details thereof, year-wise, sector-wise and category-wise?"

Answered:

> "The total amount of Direct Tax collection and GST collection from Kerala… are enclosed as
> Annexure A and Annexure B respectively. **Further, State-wise, sector-wise and category wise
> Indirect Tax revenue (i.e. custom, union excise duty, service tax as well as other taxes and
> duties) collection is not maintained Centrally.** However, year-wise collection with respect to
> GST, Custom Duty, Union Excise Duty and Service Tax by the Union Government for F.Y 2017-18 to
> 2022-23 is enclosed as Annexure C."

**The substitution is explicit and visible in the document.** Annexure A is Kerala's direct tax by
head (2022-23: Corporation Tax 10,708.51 + Income Tax 17,767.77 + Other 2.10 = **28,478.39 ₹ cr**),
with the note *"Prior to FY. 2022-23, such data of taxes collection was maintained by Pr. CCA
(CBDT)."* Annexure B is Kerala GST by head (2022-23 total 27,371.36 ₹ cr), with the note *"The above
data pertains to GST collection on domestic supplies and **this does not include IGST paid on
imports**."* **Annexure C is all-India, not Kerala** — asked for customs, excise and service tax
*from Kerala*, the Government returned the *national* figure.

Note that Annexure B's footnote independently confirms the import-IGST hole found in the GST monthly
sheet, from a second and unrelated document.

### B-3. RS Unstarred Q. 802, 16.11.2010 — "Collection of cess on diesel petrol from Kerala" (T1)

Ministry of Finance, **SHRI P. RAJEEVE**, Session 221.
PDF: `https://sansad.in/getFile/annex/221/Au802.pdf?source=pqars` → HTTP **200**, **2,120 bytes**.

> Q: "(a) the amount collected from Kerala under petrol and diesel cess; … (d) the percentage
> distribution of the fund collected from under the same Head to the other States?"
> A (MoS Finance, Shri S.S. Palanimanickam): "**The State-wise details of the said amount are not
> being maintained.** However the amount collected towards additional duty of excise on petrol and
> high speed diesel oil is Rs. 13,265 crore, Rs. 15,198 crore and Rs. 16,591 crore during 2007-08,
> 2008-09 and 2009-10 respectively. … the above mentioned additional duty of excise is levied for
> the purpose of Union and the proceeds there of shall not be distributed among the states.
> (c) & (d) : **Does not arise in view of (b) above.**"

**Same words, same substitution, fifteen years earlier.** The position is long-standing, not a
recent posture, and it predates GST entirely.

### B-4. RS Unstarred Q. 730, 24.07.2018 — the evidence that CUTS AGAINST `never-defined` (T1)

Ministry of Finance (Dept of Revenue), **SHRI MAHESH PODDAR**, Session 246.
PDF: `https://sansad.in/getFile/annex/246/Au730.pdf?source=pqars` → HTTP **200**, **180,091 bytes**.

> Q: "(a) whether … the income tax being collected from Jharkhand is not calculated independently,
> rather the same is clubbed with the State of Bihar for calculation purposes…"
> A (MoS Finance, Shri Shiv Pratap Shukla): "(a) **No Sir. The collections of income-tax from the
> State of Jharkhand are compiled and reported independently and the same are not clubbed with the
> State of Bihar.** (b) Does not arise… (c) Does not arise…"

**The Government affirms, on the record and unprompted by any need to, that direct tax IS attributed
and compiled State-wise, and defends the integrity of that attribution.** A quantity whose
State-wise compilation the Government defends in these terms is not a quantity with "no agreed
definition".

### B-5. RS Unstarred Q. 1020, 29.07.2025 — the "paise per rupee" question asked on the floor (T1)

Ministry of Finance (Dept of Economic Affairs), **DR. KANIMOZHI NVN SOMU**, Session 268.
PDF: `https://sansad.in/getFile/annex/268/AU1020_qyYY6a.pdf?source=pqars` → HTTP **200**,
**178,674 bytes**.

The exact question this whole task is about, put to the Government verbatim:

> "(a) Whether it is a fact that, **Tamil Nadu is receiving less than 29 paisa per Rupee in tax
> devolution**, while other States receive significantly higher amounts;
> (b) If so, **the details of tax devolution per one Rupee received, State-wise**;
> (c) How Government justifies this disparity… particularly when **Tamil Nadu contributes
> significantly to the national economy**; and
> (d) What immediate steps Government will take to rectify this imbalance…?"

The entire answer:

> "(a): The share of Tamil Nadu in the net proceeds of shareable taxes and duties (divisible pool),
> as recommended by 15th Finance Commission is **4.079%**.
> (b): The details pertaining to share of all the States, as recommended by the 15th Finance
> Commission… is given in Annexure A.
> (c) & (d): The methodology and criteria for, inter-se, distribution of net proceeds of taxes among
> the States is decided by the Finance Commission for its award period."

**The Government did not answer (a) or (b).** Asked whether Tamil Nadu receives *less than 29 paise
per rupee*, and for *devolution per one rupee, State-wise*, it returned the **inter-se percentage
share of the divisible pool** — a share of a pool, not a return per rupee contributed. It neither
confirmed nor denied the 29-paise figure. It neither supplied the per-rupee ratio nor said it does
not exist nor refused to give it. **It substituted an adjacent published number for the unpublished
one without saying it had done so.**

This is the same shape as item 6 above (RS Q.1324, 01.08.2023), where a request for the "exact
percentage devolved to states from total central revenue" was met with a recital of Articles 270 and
271. **Two dated, specific, on-the-record requests for a computed federal ratio; two substitutions;
zero refusals; zero statements that the quantity does not exist.**

### B-6. The 2014 trio — asked in terms, and the ANSWERS ARE MISSING FROM THE OFFICIAL ARCHIVE

Three Rajya Sabha questions from Session 232 (2014) ask for exactly the Task B quantity, by name:

- **RS Unstarred Q. 2833, 05.08.2014**, FINANCE, **SHRI ANIL DESAI** — *"Revenue contribution from
  Maharashtra to Central Government"*: *"(b) the revenue contribution of Mumbai and Maharashtra to
  the Central exchequer during the last three years and central contribution to Maharashtra during
  the same period; (c) whether the revenue allocated to Maharashtra from the Central Government is
  just and reasonable **to its contribution to Central exchequer**…"*
  `status` = "Answered". `files` = `https://sansad.in/getFile/annex/232/?source=pqars` — **the
  filename component is EMPTY.**
- **RS Starred Q. 211, 22.07.2014**, FINANCE, **DR. V. MAITREYAN** — *"Revenue contribution from
  Tamil Nadu"*: *"(a) the total revenue contribution from Tamil Nadu to central exchequer during
  the financial years 2010-11, 2011-12, 2012-13 and 2013-14; (b) the total amount received by Tamil
  Nadu from the Centre during the period…"*
  `files` = `.../annex/232/As211.html?source=pqars` → **HTTP 500, 19 bytes.**
- **RS Unstarred Q. 192, 08.07.2014**, FINANCE, **DR. V. MAITREYAN** — same title, same text.
  `files` filename **EMPTY**.

**M3 discipline on this negative — the retrieval path was proved before the files were called
missing.** Sibling files in the same directory download fine: `Au2838.docx` HTTP 200 / 21,315 B;
`Au2851.docx` HTTP 200 / 24,881 B; `Au2808.docx` HTTP 200 / 32,173 B. Eleven filename variants were
tried for Q.2833 (`AU2833.pdf`, `Au2833.pdf`, `au2833.pdf`, `AU2833_1.pdf`, `Au2833.docx`,
`AU2833.docx`, `Au2833.doc`, `AU2833_ii.pdf`, and three alternate path forms) — **all HTTP 500 or
404**.

**This is an archive defect, not suppression, and the distinction was established rather than
assumed.** Session 232 carries a filename for only **1,375 of 4,477 records (31%)**; for FINANCE
alone, 46 of 248 (19%). By contrast Session 246 is 3,146 of 3,149 (99.9%). The hole is systemic
across the session. **But the practical consequence stands: the three 2014 answers that would show
what the Government said when asked point-blank for a State's contribution to the central exchequer
are not retrievable from the official repository today.**

## Why the quantity may be undefinable in principle — what official documents actually say

### The CBEC/CBIC GST FAQ — the strongest `never-defined` evidence found (T1)

`https://cbic-gst.gov.in/aces/Documents/faq-on-gst.pdf` → HTTP **200**, **2,380,678 bytes**, PDF
v1.5, 223 pp. **"CENTRAL BOARD OF EXCISE & CUSTOMS, NEW DELHI — FREQUENTLY ASKED QUESTIONS (FAQs) ON
GOODS AND SERVICES TAX (GST), 2nd Edition, 31st March 2017"**; the Foreword records it was released
on 21 September 2016 by the Finance Minister.

**(a) Destination basis, stated as doctrine.** Chapter 1, Q1-Q2, verbatim:
> "Q 1. What is Goods and Services Tax (GST)? Ans. It is a **destination based tax on consumption**
> of goods and services… **burden of tax is to be borne by the final consumer.**"
> "Q 2. What exactly is the concept of destination based tax on consumption? Ans. **The tax would
> accrue to the taxing authority which has jurisdiction over the place of consumption** which is
> also termed as place of supply."

The Union's own doctrine separates the entity that **remits** from the entity that **bears**. A
State-wise collection table measures remittance.

**(b) Imports — collection point and incidence explicitly detached.** Verbatim:
> "Q 21. How will imports be taxed under GST? Ans. …**The incidence of tax will follow the
> destination principle and the tax revenue in case of SGST will accrue to the State where the
> imported goods and services are consumed.**"
> "…The IGST on imports is leviable under the provisions of the **Customs Tariff Act and shall be
> levied at the time of imports** along with the levy of the Customs Act."

Levied at the port under the Customs Act; incidence accrues to the consuming State. And per the
monthly sheet, the published State-wise GST table **excludes import IGST entirely**.

**(c) The strongest sentence — attribution rests on "proxies or assumptions".** Place-of-supply
chapter, Q3, verbatim:
> "**Q 3. What proxies or assumptions in a transaction can be used to determine the place of
> supply?** Ans. The various element involved in a transaction in services can be used as proxies to
> determine the place of supply. **An assumption or proxy which gives more appropriate result than
> others** for determining the place of supply, could be used… (a) location of service provider;
> (b) the location of service receiver; (c) the place where the activity takes place/ place of
> performance; (d) the place where it is consumed; and (e) the place/person to which actual benefit
> flows"

**Five candidate answers to "which State?", selected by which "gives more appropriate result".** The
Union states that location is *assigned by rule*, not *observed*.

Q2 of the same chapter enumerates why the question has no stable answer, verbatim (excerpts):
> "(i) The manner of delivery of service could be altered easily… billing address could be changed…
> (iii) …The location of billing could be changed overnight; **(iv) Sometime the same element may
> flow to more than one location**, for example, construction or other services in respect of a
> railway line, a national highway or a bridge on a river which originate in one state and end in
> the other state. …The card issued by Delhi metro could be used by a person located in Noida, or
> Delhi or Faridabad, without the Delhi metro being able to distinguish the location…"

**(iv) is the sharpest thing in the corpus for `never-defined`: "the same element may flow to more
than one location."** A single rupee of tax can carry several equally valid State attributions at
once. That is not a measurement gap.

And Q5, verbatim: *"…invoices of value more than Rs.2.5 lacs in inter-state B2C supplies will have
to be uploaded. For inter-state invoices below Rs. 2.5 lacs and all intra-state invoices, state wise
summary will be sufficient."* — below ₹2.5 lakh, per-State destination is **not captured
transaction-wise at all**.

### Negative result, honestly reported: the Receipt Budget carries no such caveat (T1)

`https://www.indiabudget.gov.in/doc/rec/allrec.pdf` → HTTP **200**, **7,116,276 bytes**, extracted to
6,053 lines (positive control: extraction succeeded on the real Receipt Budget). Searched for
`destination.based|consumption.based|origin.based|place of supply|port of (entry|import)|head
office|registered office` — **zero matches**. The Receipt Budget also carries **no State-wise
break-up of Union tax collection** and no statement about where corporation tax is paid.

**So the "paid at head office" caveat that would explain CBDT's Maharashtra concentration is stated
in neither the CBDT Time Series Data nor the Receipt Budget.** Reported as *not found in the two
documents retrieved*, not as *nonexistent*.

## Has the Finance Commission addressed it? — YES, and the answer is decisive

### FC-XVI Volume I, Main Report (T1)

`https://fincomindia.nic.in/asset/doc/commission-reports/16th-FC/reports/Vol1-Main-Report.pdf`
→ HTTP **200**, **7,429,766 bytes**, extracted to 16,884 lines. **"SIXTEENTH FINANCE COMMISSION —
Report for 2026-31 — Volume I - Main Report"**. FC-XVI has reported and the report is published.

**(A) "Tax Contribution" WAS a devolution criterion for forty years — then abandoned.** Para 8.45,
verbatim:
> "**The first seven FCs relied on only two criteria** for horizontal devolution of the States' share
> in the Union income tax: i) population and ii) **contribution to tax revenues**. FC-1, FC-3 and
> FC-4 assigned 80 per cent weight to population, and FC-2, FC-5, FC-6 and FC-7 assigned 90 per
> cent. **Tax contribution got the remainder of the weight in each case.** In this scheme, the
> population served the cause of equity, while the tax revenue rewarded efficiency."

Table 8.1 gives the weights (Income Tax column): FC-1 20%, FC-2 10%, FC-3 20%, FC-4 20%, FC-5 10%,
FC-6 10%, FC-7 10%. Table 8.2 records its last appearance — **FC-9 (Second Report), 10%, income tax
only**. **Table 8.3 (FC-11 → FC-15) has no "Tax Contribution" row at all.**

**This is the fact that settles the reasonKind.** A quantity that was operationalised in
constitutional practice, with numeric weights, by nine successive Finance Commissions from 1952 to
approximately 1990, **cannot be described as one for which "no agreed definition exists" such that
"it could not be collected even in principle."** It was defined, it was collected, and it was used
to move money.

**(B) FC-XVI reinstates a contribution criterion — and defines it as GDP, not tax.** Table 8.8,
verbatim:
```
   Criteria                     Weight (percentage)
   Population (2011)                   17.5
   Demographic Performance              10
   Area                                 10
   Forest                               10
   Per Capita GSDP Distance            42.5
   Contribution to GDP                  10
   Total                               100
```
Para 2.16, verbatim: *"we have included the share of a State's Gross State Domestic Product (GSDP)
in the nation's Gross Domestic Product (GDP) among the devolution criteria. This criterion captures
the effect of various forms of efficiencies, including efficient spending and fiscal rectitude."*

**Asked in 2026 to reward States that "contribute", the Commission reaches for GSDP — a
national-accounts quantity that is defined and measured State-wise — rather than tax paid.** That is
a revealed judgement about the usability of the exchequer-contribution quantity, made by the body
best placed to use it and with the longest institutional memory of having used it.

**(C) Where FC-XVI says "tax contribution", it means the State's OWN taxes.** Section heading *"Tax
Effort and Tax Contribution"*, para 8.42, verbatim: *"An alternative to this approach is to allocate
revenue to each State in proportion to its share of the **total OTR** across all States… In this
form, the criterion may be more appropriately described as a **tax contribution** (rather than tax
effort) criterion."* OTR is **own tax revenue** — taxes the State itself levies. **The concept "what
this State contributed to the Union exchequer" has no counterpart anywhere in the Commission's
current toolkit.**

**(D) "derivation" appears ZERO times in FC-XVI Volume I.** Positive control on the search itself:
`grep -ci 'collection'` on the same extracted text returns **57**, so the extraction is sound and the
zero is real.

**(E) The Commission RECORDS the origin-versus-destination complaint and does not resolve it.**
Para 7.41, verbatim:
> "A final set of concerns by the States relates to the GST. …Tamil Nadu, Chhattisgarh, and Haryana
> contend that under GST, they have lost control over a large part of their tax base. Second, Tamil
> Nadu has complained about the lack of buoyancy of SGST, while **Himachal Pradesh, Chhattisgarh,
> Gujarat, Haryana, Uttarakhand, and Punjab have argued that GST's destination-based nature shifted
> revenue to consuming States, resulting in a permanent loss of revenues.**"

Six producing States asserted an origin claim in terms. The Commission records the submission and
answers it with a **GDP-share** criterion rather than with any measure of tax originating in a
State. Para 7.39 records the same move for non-tax revenues: *"The argument made is that some of
these resources **originate from States** or were deployed on State lands."*

Para 7.36 is worth noting for what it shows about how the States themselves argue: the vertical-share
demand is grounded in **expenditure responsibility, not contribution** — *"the Constitution has
assigned a proportionately larger expenditure responsibility to States… To discharge these
responsibilities, they need more resources."*

### FC-XVI Volume II, Annexures (T1) — and the decisive negative

`https://fincomindia.nic.in/asset/doc/commission-reports/16th-FC/reports/Vol2-Annexures.pdf`
→ HTTP **200**, **5,773,379 bytes**, extracted to 8,867 lines.

**Annexure 8.1, "Criteria and Weights (percentage) as Suggested by States to FC-16"**, tabulates
every criterion proposed by all **28 States** across 19 columns:

```
 (1) Area 2011 (with 2% floor)      (8) Income Distance          (14) GST Disadvantage Index
 (2) International Border Area      (9) MPCE-based Distance      (15) Multidimensional Poverty
 (3) Population (Census 2011)      (10) Forest Cover (Dense)     (16) Sustainable Development Indicators
 (4) Population density            (11) Forest and Ecology Index (17) Share of GSDP in GDP
 (5) Vulnerable Population         (12) Tax Effort (Tax-to-GSDP) (18) Index of Infrastructure
 (6) Rural/Urban Population        (13) Fiscal Indicators        (19) Cost of Essential Commodities Index
 (7) Demographic Performance
```

**Not one of the nineteen is "contribution to Union tax revenue", "Union taxes collected in the
State", or any derivation measure.** Twenty-eight States, each free to propose any criterion it
wished, in a formal memorandum to the body that decides the money — **and none proposed measuring
what it contributes to the Union exchequer.** Including Tamil Nadu, Karnataka and Maharashtra, the
three States whose public politics most rests on the claim.

Where States do use the word "contribution", the referent is always **output, never tax** —
footnotes to Annexure 8.1, verbatim:
> "58) Andhra Pradesh suggested including State's **contribution of agriculture gross value added
> (GVA)** to total GVA of agriculture sector as a criterion."
> "59) Chhattisgarh suggested including State's **contribution of mining GVA** to total GVA of mining
> sector."
> "60) Maharashtra suggested to introduce **incremental increase in GSDP** as a share of incremental
> increase in India's GDP in last 10 years as a criterion."

The nearest thing to an origin claim is framed as a **loss**, not a contribution measure:
> "49) Haryana suggested to include a criterion that captures **revenue loss due to introduction of
> GST**."

**Volume II's full annexure list contains no annexure giving Union tax collected by State.** The
State-wise annexures are 5.1-5.7 (fiscal deficit, revenue deficit, outstanding liabilities,
capital-investment assistance, **own tax revenue**, revenue receipts, revenue expenditure — all as %
of GSDP), 10.3-10.5, 11.2-11.4, 15.1-15.3. Annexure 7.1 is *"Time Series of Devolution, FC Grants and
Non-FC Grants Transferred"* — the **Union-to-State direction only**.

**The Commission tabulates what flows TO States exhaustively, and what flows FROM States not at
all.**

### A T1-versus-T1 discrepancy worth recording

Item 1 above (RS Starred Q. *18, 21.07.2026, answered by the Finance Minister — retrieved T1 in this
pass) states that *"The detailed record of these consultations is available at **Annexure 1.7 of
Volume II** of the Report."* **In the Volume II actually retrieved (also T1), Annexure 1.7 is titled
"Schedule of all State Visits Undertaken by the Commission"** — a four-column table of State /
from-date / to-date / date of meeting with the Chief Minister for 28 States, plus an appendix listing
participants. **It contains no substantive record of what any State argued.**

The Union's answer to Parliament points at an annexure that does not hold the content ascribed to it.
The States' substantive submissions are in fact summarised in **Volume I, Chapter 7** (paras 7.36-7.41,
which the same answer also cites correctly) and tabulated in **Volume II Annexure 8.1**. Recorded as a
citation defect in a parliamentary answer, established by holding both documents.

## More of the same shape, retrieved (T1) — the pattern is thirty years deep

**RS Unstarred Q. 677, 13.12.2022** — "Tax revenue collected from Tamil Nadu", Ministry of Finance
(Dept of Revenue), SHRI K.R.N. RAJESHKUMAR, Session 258.
PDF `https://sansad.in/getFile/annex/258/AU677.pdf?source=pqars` → HTTP **200**, **126,542 bytes**.

**This question asks for the ratio itself — numerator, denominator, and the gap between them:**
> "(a) the details of the tax revenue collected from the State of Tamil Nadu during the last three
> years…; (b) the details of the Capital and Revenue expenditure allocated from the Union Budget to
> the State of Tamil Nadu…; and **(c) the details of imbalance between tax revenue collected and
> Capital and Revenue expenditure allocated to the State and the reasons therefor?**"

**Both halves are declined in one document, with two different stated reasons.** For the numerator,
in place of a figure in the table:
> **"State-wise data on collection of Indirect Taxes (Customs/Central Excise/Service Tax) is not
> maintained"**

For the denominator:
> **"State wise allocation of all Capital and Revenue Expenditure is not maintained and in many case
> is not possible."**

**"in many case is not possible" is the closest thing in the entire corpus to a `never-defined`
claim by a responsible body — and it attaches to the EXPENDITURE side, not the tax side.** On the
tax side the word is always "not maintained".

**RS Unstarred Q. 62, 01.03.2005** — "Revenue collected from Gujarat", FINANCE, PROF. ALKA BALRAM
KSHATRIYA, Session 204. PDF `https://sansad.in/getFile/annex/204/Au62.pdf?source=pqars` → HTTP
**200**, **1,675 bytes**.
> Q: "(a) the details of revenue collected from the State of Gujarat **directly and indirectly**
> during the last two years; (b) the share of Gujarat out of this revenue collected…; (c) the
> allocation made by the Central Government to Gujarat…?"
> A (MoS Finance, Shri S.S. Palanimanickam), **in full**: "(a) to (c): **The information is being
> collected and will be laid on the Table Of the House.**"

**A 2005 undertaking to produce the exact quantity — no claim of impossibility, no claim of
non-maintenance, a promise to supply.** No laid statement fulfilling it was found (laid papers are
outside this endpoint's reach). **Flagged as an open thread: this is the one document in the corpus
in which the Government accepted that the quantity could be produced.**

**Also retrieved (T1), same family:**
- **RS Starred Q. 55, 25.07.2023** — tobacco taxes; asked "(c) the States/UTs from which maximum
  taxes have been collected"; answered *"In FY 2022-23, the States from which maximum taxes have
  been collected from the said products includes Uttar Pradesh, Karnataka and Maharashtra."*
  `https://sansad.in/getFile/annex/260/AS55.pdf?source=pqars`, 120,621 B. **A ranked but
  unquantified State attribution of an indirect tax — the Government attributes qualitatively while
  declining the figures elsewhere.**
- **RS Unstarred Q. 1329, 01.08.2023** — asked "(b) the total amount of taxes collected from the
  sale of luxury goods, State-wise"; the answer never addresses (b), replying only that the statutes
  *"do not prescribe any list of goods as luxury or sin goods"*.
  `https://sansad.in/getFile/annex/260/AU1329.pdf?source=pqars`, 115,275 B.
- **RS Starred Q. 8, 22.11.2011** — "Collection of Central taxes from Punjab", asking for central
  taxes collected "directly or indirectly" and the allocations made in return. **`files` filename
  EMPTY — answer not retrievable**, same archive defect as the 2014 trio.
- **RS Unstarred Q. 1010, 31.07.2001** — cess on petrol collected from Karnataka and "(f) the amount
  released to Karnataka towards the collection".
  `https://sansad.in/getFile/annex/193/Au1010.pdf?source=pqars`.

**The question has been asked, by members of at least eight parties, about at least eight States
(Tamil Nadu, Kerala, Maharashtra, Gujarat, Punjab, Karnataka, Jharkhand, Odisha), across at least
2001, 2005, 2010, 2011, 2014, 2018, 2022, 2023, 2025 and 2026. It has never once been answered in
the form asked.**

## Positive controls used (M3)

The earlier phase's failure — a sweep matching only double-quoted `href="…"` that silently dropped
1,862 URLs, returned HTTP 200 throughout, and nearly hardened a false "never asked" into a permanent
absence record — is the reason for this section. Every negative below is backed by a stated control.

| # | Control | Result | What it licenses |
|---|---|---|---|
| PC-1 | RS `qno=240 and ans_date='21.07.2026'` | HTTP 200, 1,167 B, **1 record**, = the known item exactly | the RS query path returns real hits |
| PC-2 | RS `qn_text like '%Health and Education Cess%' and ans_date='21.07.2026'` | HTTP 200, 1,167 B, **1 record**, same item | **`qn_text` (full body text) IS searchable** — a null on a body-text needle is informative, not an artefact |
| PC-3 | Same needle in UPPER CASE | 1 record, same item | matching is **case-insensitive**; needles need not be case-matched |
| PC-4 | RS `qno=1` | HTTP 200, 445,410 B, **174 records** | corpus spans **adate 1995-07-31 → 2026-07-20**, sessions 174-271 |
| PC-5 | RS `ses_no='175'` | **2,433 records** | **corrects PC-4**: sessions "missing" from the `qno=1` sweep are not absent — Q.1 simply is not in the table. Genuinely empty: 183, 201, 231, 261, 264 |
| PC-6 | `qn_text` population by session (175/185/200/215/230/245/255/265/271) | 72% populated in 1999, **100% from session 185 (Dec 1999) onward** | **full-text search is effectively complete for RS Dec-1999 → Aug-2026**; a null is genuine evidence for that window and only weak evidence before it |
| PC-7 | Directory-sibling fetch in session 232 (`Au2838.docx` 21,315 B; `Au2851.docx` 24,881 B; `Au2808.docx` 32,173 B) | all HTTP 200 | the missing 2014 answer files are **a real archive hole, not a broken fetch path** |
| PC-8 | Session 232 filename coverage: 1,375 / 4,477 (31%); FINANCE 46 / 248 (19%); vs session 246 3,146 / 3,149 (99.9%) | — | the 2014 hole is **systemic across the session, not targeted suppression** |
| PC-9 | `grep -ci 'derivation'` on FC-XVI Vol I = **0**; `grep -ci 'collection'` on the same text = **57** | — | the zero for "derivation" is real, not an extraction failure |
| PC-10 | Receipt Budget `allrec.pdf` HTTP 200, 7,116,276 B → 6,053 lines extracted | — | the zero matches for `head office|registered office|place of supply` are from a genuinely parsed document |
| PC-11 | `incometaxindia.gov.in` with UA only → **HTTP 403, 409 bytes**; with full Chrome header set → HTTP 200, 986,796 B | — | **a bare `-A 'Mozilla/5.0'` gets Akamai-blocked on this host**; a 403 here would have read as "not published" |

**Two traps this section caught that would otherwise have produced false negatives:**

- **PC-11 is the sharpest.** The CBDT Time Series Data — the document that settles the whole
  question — returns **HTTP 403 / 409 bytes** to the standard `curl -A 'Mozilla/5.0'` used everywhere
  else in this pass. A sweep that treated that as unreachable would have concluded that state-wise
  direct tax collection is not published, which is the opposite of the truth. `Accept`,
  `Accept-Language` and `Sec-Fetch-*` headers are required on that host.
- **A raw `%` in the `whereclause` query string yields HTTP 000 / 0 bytes** — curl aborts on the
  malformed escape. **That is a silent zero indistinguishable from an empty result set.** `%` must be
  sent as `%25`. Any RS sweep must treat HTTP 000 or a non-JSON body as INVALID and never as
  "no records".

**Coverage gap declared:** the **Lok Sabha** side of the Task B needle sweep was still running when
this was written. The RS corpus (1995-2026, full-text-searchable from Dec 1999) is swept; **the LS
corpus is NOT, and no negative in this section should be read as covering the Lok Sabha.** Per M3,
the LS half is reported as **unanswered**, not answered "no". Note also that any future LS sweep must
page — see the size-cap trap recorded under Task A.

## Needles searched (M5)

Stated as propositions — entity, predicate and figure — not bare words. All against the RS corpus,
all HTTP 200; `BYTES=2` is the literal empty array `[]`.

**Proposition sought: "an MP asked the Union for the quantum of central tax collected from / contributed by a named State."**

`qn_text` hits that mattered: `%contributed by the State%` **9** (all State matching-share in
centrally sponsored schemes — SC/ST scholarships, Odisha UMPP, Konkan Railway, judicial IT — none
contribution-to-Union); `%tax collected from the State%` **1**; `%contribution to the national
exchequer%` **1** (the 2014 Maharashtra question); `%contribution to central%` **3**;
`%share of taxes collected%` **1** (tobacco); `%revenue collected from%` **38**;
`%taxes collected from%` **11**; `%collected from the State of%` **4**; `%revenue contribution%` **5**;
`%contribution of the State%` **11**; `%tax collection from%` **7**.

**Proposition sought: "an MP asked for, or the Government stated, a per-rupee return ratio."**
`%for every rupee%` **0** · `%rupee contributed%` **0** · `%gets back%` **1** (air traffic,
irrelevant) · `%every rupee%` **2** · `%one rupee%` **20** · `%paise%` **71** · `%ratio of
contribution%` **5** · `%net devolution%` **0** · `%inter-se share%` **0**.
**The phrase itself is essentially absent from thirty-one years of Rajya Sabha questions — yet the
substance was asked directly at least twice (Q.1020/2025 "less than 29 paisa per Rupee", Q.677/2022
"the imbalance between tax revenue collected and expenditure allocated").** The idea is put in
plain words, not in the slogan.

**Proposition sought: "the Government stated that state-wise tax attribution is not maintained, not
compiled, or impossible."**
`%not maintained%` **38** · `%data is not maintained%` **5** · `%not centrally maintained%` **0** ·
`%no such data is compiled%` **0** · `%cannot be attributed%` **0** · `%attributed to the State%`
**0** · `%origin State%` **0**.
**"Not maintained" is the Government's phrase of art. The phrases that would signal impossibility —
"cannot be attributed", "no such data is compiled" — return zero.**

**Proposition sought: "an official reason attribution is impossible in principle (destination basis,
registered office, port of entry)."**
`%destination based%` **1** · `%place of supply%` **2** · `%port of entry%` **1** ·
`%consuming State%` **5** · `%producing State%` **169** · `%registered office%` **19** ·
`%apportion%` **36** · `%accrue to the State%` **3** · `%IGST settlement%` **1** ·
`%revenue neutral%` **4**.
**None of these produced a Government statement that a State's contribution cannot be computed.**
The destination-basis reasoning exists in official print (the CBIC FAQ), but **not as an answer to
this question in Parliament.**

**Proposition sought: "the question was asked about a specific State."**
`%collected from Tamil Nadu%` **1** · `%collected from Kerala%` **2** · `%collected from Karnataka%`
**1** · `%collected from Maharashtra%` **0** · `%contribution of West Bengal%` **0** ·
`%devolution to Tamil Nadu%` **1** · `%devolution to Karnataka%` **0** · `%tax devolution%` **16** ·
`%contribution of Tamil Nadu%` **1** (marine exports) · `%contribution of Maharashtra%` **4**
(textiles, exports, sugar).

`qtitle`-column needles returning **0**: `%contribution to the Union%`, `%contributed by the State%`,
`%tax collected from the State%`, `%tax collected in the State%`, `%State-wise collection%`,
`%State wise collection%`, `%State-wise tax%`, `%share of taxes collected%`, `%return from the
Centre%`, `%rupee contributed%`, `%for every rupee%`, `%net devolution%`, `%inter-se share%`,
`%contribution to the exchequer%`, `%contribution to the national exchequer%`, `%GST collected in%`,
`%place of supply%`.

## Lok Sabha — swept, and the same sentence appears there too (T1)

The LS coverage gap declared above is now closed. LS 14, 15, 16, 17 and 18 all respond; every needle
was paged to exhaustion using the API's `totalRecordSize` field (which, unlike the page contents,
does tell you the true count — the fix for the Task A truncation trap). 60 unique LS records across
all needles.

**LS Unstarred Q. 3754, 24.03.2025** — "Tax Revenue Collected from Tamil Nadu", Ministry of Finance
(Dept of Revenue), **Ms. S JOTHIMANI**, LS18 Session 4.
PDF `https://sansad.in/getFile/lsapps/loksabhaquestions/annex/184/AU3754_FZEgoi.pdf?source=lsapps`
→ HTTP **200**, **417,289 bytes**.
> Q: "(a) the total tax revenue collected from Tamil Nadu since 2019, **including direct and indirect
> taxes**; (b) the contribution of Tamil Nadu to the total GST collection in the country…; (d) the
> measures taken… regarding GST revenue shortfall and **fiscal federalism**?"
> A: direct tax supplied (2019-20 69,809.31 … 2023-24 1,27,067.17 … 2024-25 to 28.02.2025
> 1,07,938.07 ₹ cr), then:
> **"However, in case of Indirect Taxes State-wise data is not maintained."**

**CROSS-HOUSE CONFIRMATION.** The identical sentence appears in the Lok Sabha on **24.03.2025** and
in the Rajya Sabha on **10.03.2026**. This is a settled, repeated, formulaic Government position —
not an off-hand remark by one Minister on one day.

**LS Unstarred Q. 113, 01.12.2025** — "GST and Cess/Surcharges Revenue Collected from Karnataka",
FINANCE (Dept of Revenue), **SHRI E TUKARAM**, LS18 Session 6.
PDF `https://sansad.in/getFile/lsapps/loksabhaquestions/annex/186/AU113_q5pjBr.pdf?source=lsapps`
→ HTTP **200**, **308,230 bytes**.
Asked for *"the details of **central taxes, GST and cess/surcharge revenues** collected from the
State of Karnataka"* alongside *"the corresponding accounts transferred to the State"* — the
contribution-and-return pair in one document. The reply supplies **gross GST only** (95,926 /
1,22,821 / 1,45,265 / 1,59,563 ₹ cr) and tax devolution (33,284 / 34,596 / 41,193 / 46,933 ₹ cr).
**Central taxes and cess/surcharge are never mentioned — not even to say they are not maintained.**
Part (d), on compensating "producing States like Karnataka" post-GST: *"No such proposal is under
consideration."*

**LS Unstarred Q. 59, 20.07.2026** — "Declining Share of Tax Devolution to Tamil Nadu", FINANCE
(Dept of Economic Affairs), **SHRI K E PRAKASH & SMT. KANIMOZHI KARUNANIDHI**, LS18 Session 8. The
most recent instance in either House.
PDF `https://sansad.in/getFile/lsapps/loksabhaquestions/annex/188/AU59_RBV1tq.pdf?source=lsapps`
→ HTTP **200**, **211,751 bytes**.
> Q: "(a) whether the Government has taken note of concerns regarding the declining share of tax
> devolution and comparatively lower per capita Central transfers to Tamil Nadu, **despite the State
> being among the highest contributors to the national economy and direct tax collections**…"
> A: "**Does not arise**, as share of tax devolution and per capita central transfers to Tamil Nadu
> has increased. Share of tax devolution to Tamil Nadu increased to **4.097%** in 16th Finance
> Commission's award period… as compared to **4.079%** during… the 15th… Also, the per capita central
> transfers… have increased from about **₹9,500** in FY2021-22 to about **₹11,600** in FY2025-26."

**The premise — that Tamil Nadu is among the highest contributors — is neither confirmed nor denied.
The answer changes the measure, from contribution-relative-return to share-and-per-capita.** The same
substitution as RS Q.1020.

**LS Unstarred Q. 243, 23.11.2012** — subject *"REVENUE COLLECTED FROM STATES"*.
`https://sansad.in/getFile/Annexture_New/lsq15/12/au243.htm?source=loksabhadocs` → HTTP **200**,
**147,837 bytes**. **The annexure actually laid is titled "Statement showing the releases of States'
Share of Union Taxes and Duties made to the State Governments during the 11th Plan"** — devolution
**TO** States, the opposite direction from the subject. A full 28-State × 5-year table is supplied
(Tamil Nadu 8,065.27 → 12,714.95 ₹ cr). **The outbound leg is published in full; the inbound leg was
not supplied.** That asymmetry — exhaustive on what flows to States, silent on what flows from them
— is the same one found in FC-XVI Volume II.

Also retrieved: **LS Q.5367, 29.04.2005** "REVENUE COLLECTED FROM GUJARAT" (the LS twin of RS Q.62 in
the same month); **LS Q.4030 and Q.3934, 18.08.2025** on Karnataka and inequitable devolution;
**LS Starred Q.161, 13.03.2023** "Collection of Taxes and Devolution of Tax Revenues".
**LS Q.1801, 24.08.2007 "REVENUE FROM STATES"** — record present but `questionsFilePath` **EMPTY**,
answer not retrievable (same archive defect as the RS 2011/2014 items).

## RECOMMENDED reasonKind

### Recommendation: `not-collected`, with `reasonDisputed: true` and `disputeKind: evidentiary`

**Not `never-defined`.** The two sweeps disagreed on this and the disagreement is set out in full
below, because it is close and the reader should be able to overturn my choice.

### The evidence for `not-collected`

**1. The Government states the reason, in terms, and has done so consistently for sixteen years.**
The schema is explicit that reasonKind is *"the STATED reason no figure exists — what the responsible
body says, not what is true."* The responsible body has said it, repeatedly, in both Houses:

| Date | House | Words |
|---|---|---|
| 16.11.2010 | RS Q.802 | "The State-wise details of the said amount are **not being maintained**." |
| 13.12.2022 | RS Q.677 | "State-wise data on collection of Indirect Taxes (Customs/Central Excise/Service Tax) **is not maintained**" |
| 05.12.2023 | RS Q.231 | "State-wise, sector-wise and category wise Indirect Tax revenue… collection **is not maintained Centrally**" |
| 24.03.2025 | **LS** Q.3754 | "However, in case of Indirect Taxes State-wise data **is not maintained**." |
| 10.03.2026 | RS Q.1976 | "However, in case of Indirect Taxes State-Wise data **is not maintained**." |

Five instances, two Houses, three Ministers, spanning 2010 to 2026, the last two word-for-word
identical. **"Not maintained" is a `not-collected` statement**: nothing was gathered, so there is
nothing to release. It maps directly onto the schema's test — *"If the holder were compelled tomorrow
they would have nothing to produce."*

**2. The phrases that would signal `never-defined` return ZERO across thirty-one years of Rajya Sabha
question text.** `%cannot be attributed%` **0**, `%attributed to the State%` **0**, `%origin State%`
**0**, `%no such data is compiled%` **0**. Against positive control PC-2/PC-6, which establish that
`qn_text` is fully searchable from December 1999. **No Indian body has ever told Parliament that a
State's contribution cannot be defined.**

**3. The one "not possible" statement in the corpus attaches to the wrong side of the ratio.**
RS Q.677 (13.12.2022): *"State wise allocation of all Capital and Revenue Expenditure is not
maintained **and in many case is not possible**."* That is the closest thing to a `never-defined`
claim anywhere in either House — and the Government attaches it to **expenditure**, the denominator.
On the **tax** side, in the very same document, the word is "not maintained". **The Government
distinguishes the two, and puts the tax side on the not-collected side of its own line.**

**4. Decisive against "could not be collected even in principle": nine Finance Commissions collected
it.** FC-XVI's own para 8.45 records that *"The first seven FCs relied on only two criteria… i)
population and ii) **contribution to tax revenues**"*, with tax contribution weighted **20% (FC-1,
FC-3, FC-4)** or **10% (FC-2, FC-5, FC-6, FC-7)**, last used by **FC-9**. **A quantity that was
defined, measured and given a numeric weight in constitutional revenue-sharing for roughly forty
years, from 1952 to about 1990, cannot be one for which "no agreed definition exists" such that "it
could not be collected even in principle."** The schema's own warning applies: `never-defined` is
*NOT* "nobody has studied it". Here it is not even that — it is "somebody used to".

**5. The Government's conduct contradicts undefinability at four separate points.**
- It **publishes** a State-wise direct tax table annually (CBDT Time Series Data §1.2) with a stated
  attribution rule, and no disclaimer.
- It **defends** the integrity of that attribution when challenged — RS Q.730 (24.07.2018): *"No Sir.
  The collections of income-tax from the State of Jharkhand are compiled and reported independently."*
- It **ranked States** by indirect-tax collection when asked — RS Starred Q.55 (25.07.2023): *"the
  States from which maximum taxes have been collected… includes Uttar Pradesh, Karnataka and
  Maharashtra."* You cannot rank what is not defined.
- It **promised to produce the whole quantity** — RS Q.62 (01.03.2005), asked for revenue collected
  from Gujarat *"directly and indirectly"*, answered in full: *"The information is being collected and
  will be laid on the Table Of the House."* **No claim of impossibility; an undertaking to supply.**

**6. `not-published` fails its own test, and would fail the integrity gate.** `not-published` means
the data "exists in a holder's hands, not released", and `tools/lib/integrity.mjs` raises a hard
**error** for `not-published` or `withheld` without a named holder and instrument. Nothing retrieved
shows any body has ever computed a State's contribution to the Union exchequer. The Finance
Commission — the natural holder, with subpoena-like powers of inquiry and every incentive — **did not
compute it**: "derivation" appears **0 times** in FC-XVI Volume I (against a positive control of 57
for "collection"), and Volume II contains no annexure giving Union tax collected by State. There is
no holder to name.

**7. `withheld` fails for want of a refusal.** `withheld` requires "an identifiable refusal, not
merely absence of release". Across ten-plus dated, specific requests in both Houses, **there is not
one refusal**. There are substitutions (RS Q.1020 answered with the inter-se share; LS Q.59 answered
with per-capita transfers), deflections (RS Q.1324 answered with Articles 270 and 271), a silent
omission (LS Q.113), and one undertaking to supply (RS Q.62). **A substitution is not a refusal**, and
the distinction matters: the Government has never asserted a right to withhold this.

### Why `reasonDisputed: true`, `disputeKind: evidentiary`

The stated reason is **contradicted for part of its own scope**, and the contradiction is exactly the
schema's illustrative case — *"a body saying data was never maintained while another arm of the same
government publishes some of it."*

The Government says **"State-wise data on collection of Indirect Taxes… is not maintained"**. But
**GST is an indirect tax, and the Ministry of Finance publishes State-wise GST collection every
month** — Table 2 of the GSTN monthly sheet, plus pre- and post-settlement SGST by State. Two of the
five "not maintained" answers (RS Q.231, RS Q.677) in fact supply GST State-wise in an annexure while
the sentence beside it says indirect-tax State-wise data is not maintained. **The claim is true of
customs, Union excise and service tax; it is false of GST as stated.**

A second, weaker evidentiary strand: RS Q.62 (2005) records the Government accepting that the
information *"is being collected"* — an assertion that it was, at least once, in the process of being
gathered. **Open thread: no laid statement fulfilling that undertaking was found, and laid papers are
outside the reach of the endpoints available here. That is a real gap, not a closed negative.**

### The case for `never-defined`, at full strength — and why I do not adopt it

The published-data sweep recommended `never-defined`. Its case is genuine and rests on official
documents actually retrieved, so it is set out here without discount:

- **CBIC FAQ on GST, place-of-supply chapter, Q3**: place of supply is determined by *"proxies or
  assumptions"*, listing **five** rival candidates (location of provider; location of receiver; place
  of performance; place of consumption; place to which benefit flows), choosing whichever *"gives more
  appropriate result than others"*. Location is assigned by rule, not observed.
- **Same chapter, Q2(iv)**: *"the same element may flow to more than one location"* — a railway line,
  a highway, a bridge originating in one State and ending in another; a Delhi Metro card used in
  Noida, Delhi or Faridabad. **The rupee→State map is not a function.**
- **CBDT's own attribution key** is a postal artefact — the state-code in the assessee's
  *communication address* — producing a 40.3% Maharashtra share, with Central TDS, `Foreign` and
  `Unapportioned` outside the State partition entirely.
- **~30.7% of gross GST (import IGST) has no State line at all**, being collected at the port.
- **FC-XVI reached for GSDP instead**, weighting *"Contribution to GDP"* at 10% — output, not tax
  paid — which is a revealed judgement by the best-placed body that the tax-contribution quantity is
  not usable.
- **All 28 States, proposing 19 criteria to FC-XVI in formal memoranda, proposed none based on Union
  tax contributed** — the parties with maximum incentive did not ask for it.

**Why it does not carry, on this schema.** Three reasons, in order of weight:

1. **The schema asks for the STATED reason, and no body has stated this one.** The published-data
   sweep concedes the point in terms: *"no body has declared the quantity undefinable."* The CBIC FAQ
   passages are about determining **place of supply within GST** — a question the Union then *settles*
   by statute in the IGST Act. A stipulated definition is still an agreed definition. The FAQ
   describes the difficulty of **choosing** the rule; it does not say no rule can be chosen, and the
   law chose one.
2. **Nine Finance Commissions operationalised the quantity.** See point 4 above. This is not a matter
   of interpretation — FC-XVI's own report tabulates the weights. `never-defined` requires that the
   quantity "could not be collected **even in principle**". It was collected, in practice, for forty
   years.
3. **`never-defined` would misdescribe what is actually missing.** The missing thing is not a concept.
   It is a *series*: State-wise collection of customs, Union excise and service tax, which the
   Government says it does not keep. Those are administratively locatable quantities — customs is
   collected at identifiable ports, excise at identifiable factories — and if CBIC were compelled
   tomorrow it could produce *a* State-wise table on a stated basis, as CBDT already does for direct
   tax. What it could not produce is a table whose meaning survives the objections in the FAQ. **That
   is a defect in the quantity's *interpretation*, not in its *definition* — and the instrument has a
   place for exactly that, in `why` and in the four-construction analysis already at D4 of part 06.**

**Where the two sweeps agree, and it is the important part:** whichever value is chosen, the finding
is the same and it is strong. **Nobody computes it. Nobody has ever been refused it. Everybody who
has asked has been given something else instead.**

### What would change the recommendation

- **A laid paper fulfilling the 2005 undertaking (RS Q.62)** — if the Government did lay a statement
  of revenue collected from Gujarat "directly and indirectly", the quantity was produced once, and
  the value moves toward `not-published`. Laid papers were outside reach here; this is the single
  most valuable open thread.
- **Any of the four unretrievable answers** — RS Q.2833 (Maharashtra, 2014), RS Q.211 and Q.192
  (Tamil Nadu, 2014), RS Starred Q.8 (Punjab, 2011), LS Q.1801 (2007). All ask point-blank for a
  State's contribution to the central exchequer; all have empty or broken file links. **If any one of
  them contains a refusal, the value becomes `withheld`; if it contains a table, the value collapses
  entirely.** These are recoverable from the printed Rajya Sabha and Lok Sabha debates, which no
  endpoint reachable from this machine serves.
- **An explicit official statement that a State's contribution cannot be defined or attributed** —
  would move it to `never-defined` immediately. Zero hits for `%cannot be attributed%` in the RS
  corpus, but the LS corpus is subject-searchable only, so its **question bodies were never
  full-text swept**. That is a declared limit, not a closed negative.

### Note on record structure

The evidence supports **splitting this into two ledger entries**, because they have different reasons:

1. **State-wise Union tax collection (the composite numerator)** — `not-collected`,
   `reasonDisputed: true`, `disputeKind: evidentiary`. Direct tax **is** published; domestic GST **is**
   published; customs/excise/service tax are stated "not maintained"; import IGST (~30.7% of GST) is
   excluded by construction.
2. **The contribution-to-return ratio itself** — this is the existing A-8 record in part 06, currently
   `not-published`. **On this pass's evidence that value should be revisited**: A-8's `not-published`
   was reached on two Tamil Nadu-specific corpora, and this sweep now establishes across both Houses,
   the CBDT, GSTN, the Receipt Budget and both volumes of FC-XVI that **no holder of the ratio exists
   anywhere** — which is precisely what `not-published` asserts and cannot support. **Flagged for the
   authoring stage; not changed here.**

## Sources retrieved

Graded on the document held, not the institution it is about. **T1** = official Indian source
retrieved directly this session (HTTP code and byte count recorded). **T4** = official figure known
only through a relayed account. **Every source below is T1 — nothing in this part rests on a relayed
figure.** Two items are recorded as NOT RETRIEVED and are marked as such rather than graded.

### Task A — parliamentary answers (all T1)

| Source | URL | HTTP / bytes | What was read in it |
|---|---|---|---|
| RS Starred Q.*18, 21.07.2026, Finance (Revenue), FM Sitharaman | `https://sansad.in/getFile/annex/271/AS18_7lp2Vc.pdf?source=pqars` | 200 / 927,358 | Annexure-A cess & surcharge by head FY2022-23→BE2026-27; cesses 11.5/10.5/10.0/8.2/6.2 and surcharges 8.9/8.0/7.9/8.2/8.1 as % GTR; the Article 270(1) divisible-pool statement; FC-XVI citation (Vol I ch.7 paras 7.36-7.41, Vol II Annexure 1.7) |
| LS Unstarred Q.137, 20.07.2026, Finance (Revenue) | `https://sansad.in/getFile/lsapps/loksabhaquestions/annex/188/AU137_1GENno.pdf?source=lsapps` | 200 / 885,365 | same Annexure-A; cess+surcharge as % GTR 9.6/17.5/17.9/16.4 for 2014-15, 2019-20, 2024-25, 2025-26; Annexure B fund-transfer table |
| RS Unstarred Q.385, 03.02.2026, Finance (Revenue) | `https://sansad.in/getFile/annex/270/AU385_noP7w0.pdf?source=pqars` | 200 / 455,678 | Annexure B collection/transfer/balance by fund: AIDF nil transfer FY2021-22 & FY2022-23; OIDF nil FY2020-21→FY2023-24; CRIF; PSK/MUSK/PMSSN; the Consolidated Fund (Art. 266) statement |
| RS Unstarred Q.240, 21.07.2026, Finance (DEA) | `https://sansad.in/getFile/annex/271/AU240_i4p811.pdf?source=pqars` | 200 / 271,537 | the Union's denial of the CAG's ₹50,072 cr finding: "During 2022-23, there was no shortfall…"; ₹61,814 cr collected vs ₹70,589 cr transferred |
| RS Unstarred Q.1324, 01.08.2023, Finance (DEA) | `https://sansad.in/getFile/annex/260/AU1324.pdf?source=pqars` | 200 / 179,331 | "Yes, Sir;" + the four CAG citations (20/2018 ¶4.3.2; 6/2021 ¶2.5.3; 7/2021 ¶1.9.1.1; 31/2022 ¶2.5.1) with FYs and report titles; Annexure A FY2016-17→FY2021-22; the unanswered parts (d) & (e) |
| LS Unstarred Q.142, 01.12.2025, Finance (Expenditure) | `https://sansad.in/getFile/lsapps/loksabhaquestions/annex/186/AU142_6FgksB.pdf?source=lsapps` | 200 / 206,338 | Annexure-I CSS releases by State FY2020-21→FY2024-25 (WB 27,406.79→9,081.21); Annexure-II Central Sector releases incl. the Delhi implementing-agency artefact; PFMS as source |
| LS Unstarred Q.5783, 30.03.2026, Education (School Ed. & Literacy) | `https://sansad.in/getFile/lsapps/loksabhaquestions/annex/187/AU5783_XBHvUl.pdf?source=lsapps` | 200 / 174,587 | Samagra Shiksha allocation vs central share released by State, **five** years FY2021-22→FY2025-26; TN/WB/Kerala zeros; the PM-SHRI MoU passage; "PAB Minutes / PFMS / PRABANDH Portal, as on 27.03.2026" |
| RS Unstarred Q.1840, 04.08.2026, Finance (DEA) — bonus | `https://sansad.in/getFile/annex/271/AU1840_LOhn2Q.pdf?source=pqars` | 200 / 113,760 | five-year aggregate ₹32.05 lakh cr cess+surcharge, cesses ₹18.88 lakh cr, transfers ₹21.38 lakh cr; "only cesses are collected for designated purposes" |

### Task B — parliamentary answers (all T1)

| Source | URL | HTTP / bytes | What was read in it |
|---|---|---|---|
| RS Unstarred Q.1976, 10.03.2026, Finance (Revenue) | `https://sansad.in/getFile/annex/270/AU1976_VmDCsG.pdf?source=pqars` | 200 / 253,695 | TN direct tax 2022-23→2024-25; **"However, in case of Indirect Taxes State-Wise data is not maintained."**; TN devolution 38,731→51,655 ₹ cr |
| RS Unstarred Q.231, 05.12.2023, Finance (Revenue) | `https://sansad.in/getFile/annex/262/AU231.pdf?source=pqars` | 200 / 252,606 | every central tax head asked of Kerala; **"…is not maintained Centrally"**; Annexures A & B (Kerala direct tax, Kerala GST) vs Annexure C (all-India substitution); "does not include IGST paid on imports" |
| RS Unstarred Q.677, 13.12.2022, Finance (Revenue) | `https://sansad.in/getFile/annex/258/AU677.pdf?source=pqars` | 200 / 126,542 | both halves of the ratio declined in one document; **"not maintained"** (tax) vs **"not maintained and in many case is not possible"** (expenditure) |
| RS Unstarred Q.802, 16.11.2010, Finance | `https://sansad.in/getFile/annex/221/Au802.pdf?source=pqars` | 200 / 2,120 | **"The State-wise details of the said amount are not being maintained."** — the 2010 instance |
| RS Unstarred Q.730, 24.07.2018, Finance (Revenue) | `https://sansad.in/getFile/annex/246/Au730.pdf?source=pqars` | 200 / 180,091 | **"No Sir. The collections of income-tax from the State of Jharkhand are compiled and reported independently."** — the anti-`never-defined` evidence |
| RS Unstarred Q.1020, 29.07.2025, Finance (DEA) | `https://sansad.in/getFile/annex/268/AU1020_qyYY6a.pdf?source=pqars` | 200 / 178,674 | the "less than 29 paisa per Rupee" question; answered with the 4.079% inter-se share + Annexure A of all States' shares |
| RS Unstarred Q.62, 01.03.2005, Finance | `https://sansad.in/getFile/annex/204/Au62.pdf?source=pqars` | 200 / 1,675 | **"The information is being collected and will be laid on the Table Of the House."** — the undertaking |
| RS Starred Q.55, 25.07.2023, Finance | `https://sansad.in/getFile/annex/260/AS55.pdf?source=pqars` | 200 / 120,621 | States ranked by tobacco-tax collection — qualitative indirect-tax attribution |
| RS Unstarred Q.1329, 01.08.2023, Finance | `https://sansad.in/getFile/annex/260/AU1329.pdf?source=pqars` | 200 / 115,275 | State-wise luxury-goods tax request answered only with a definitional non-answer |
| RS Unstarred Q.3922, 27.03.2026, Railways | `https://sansad.in/getFile/annex/270/AU3922_BcCohS.pdf?source=pqars` | 200 / 444,966 | the contribution-vs-allocation shape applied to Railways in Odisha |
| LS Unstarred Q.3754, 24.03.2025, Finance (Revenue) | `https://sansad.in/getFile/lsapps/loksabhaquestions/annex/184/AU3754_FZEgoi.pdf?source=lsapps` | 200 / 417,289 | **the cross-house confirmation** — identical "not maintained" sentence in the Lok Sabha |
| LS Unstarred Q.113, 01.12.2025, Finance (Revenue) | `https://sansad.in/getFile/lsapps/loksabhaquestions/annex/186/AU113_q5pjBr.pdf?source=lsapps` | 200 / 308,230 | Karnataka GST + devolution supplied; central taxes and cess/surcharge silently omitted; "No such proposal is under consideration" |
| LS Unstarred Q.59, 20.07.2026, Finance (DEA) | `https://sansad.in/getFile/lsapps/loksabhaquestions/annex/188/AU59_RBV1tq.pdf?source=lsapps` | 200 / 211,751 | "Does not arise"; TN devolution share 4.079%→4.097%; per-capita transfers ₹9,500→₹11,600; southern States 15.800%→17.001% |
| LS Unstarred Q.243, 23.11.2012, Finance | `https://sansad.in/getFile/Annexture_New/lsq15/12/au243.htm?source=loksabhadocs` | 200 / 147,837 | subject "REVENUE COLLECTED FROM STATES"; annexure supplied is releases **to** States, 28 States × 5 years |
| LS Unstarred Q.5367, 29.04.2005, Finance | `https://sansad.in/getFile/Annexture_New/lsq14/4/au5367.htm?source=loksabhadocs` | 200 / 324,245 | LS twin of RS Q.62 on Gujarat |
| LS Unstarred Q.4030, 18.08.2025 | `https://sansad.in/getFile/lsapps/loksabhaquestions/annex/185/AU4030_bEJCFm.pdf?source=lsapps` | 200 / 334,969 | Karnataka tax-devolution concerns |
| LS Starred Q.161, 13.03.2023 | `https://sansad.in/getFile/lsapps/loksabhaquestions/annex/1711/AS161.pdf?source=lsapps` | 200 / 577,814 | collection of taxes and devolution of tax revenues |

### Task B — published statistical and institutional sources (all T1)

| Source | URL | HTTP / bytes | What was read in it |
|---|---|---|---|
| **CBDT, Income Tax Department Time Series Data FY2000-01 to FY2024-25** | `https://www.incometaxindia.gov.in/documents/d/guest/final-time-series-data-pdf` | 200 / 986,796 | **§1.2 "State And U.T. Wise Break-Up of Collection"** — State-wise direct tax FY2018-19→FY2024-25; Notes 1-2 disclosing the **communication-address state-code** attribution key; C.T.D.S./Foreign/Unapportioned residues; **no disclaimer anywhere in the document** |
| **GSTN / MoF monthly GST collections, May 2026** | `https://tutorial.gst.gov.in/downloads/news/final_monthly_gst_data_for_may_2026_for_publishing.pdf` | 200 / 1,074,430 | Table 2 State-wise gross GST; pre-/post-settlement SGST by State (Bihar 3.34x, Maharashtra 1.66x); footnote "Does not include GST on import of goods"; import IGST ₹59,654 cr of ₹1,94,184 cr gross |
| **CBEC/CBIC, FAQs on GST, 2nd Edition, 31 March 2017** | `https://cbic-gst.gov.in/aces/Documents/faq-on-gst.pdf` | 200 / 2,380,678 | Ch.1 Q1-Q2 destination basis and "burden… borne by the final consumer"; Q21 imports levied at port but incidence accrues to consuming State; place-of-supply Q3 "**proxies or assumptions**" (five candidates); Q2(iv) "**the same element may flow to more than one location**"; Q5 ₹2.5 lakh invoice threshold |
| **Sixteenth Finance Commission, Report for 2026-31, Volume I — Main Report** | `https://fincomindia.nic.in/asset/doc/commission-reports/16th-FC/reports/Vol1-Main-Report.pdf` | 200 / 7,429,766 | ¶8.45 + Table 8.1 (tax contribution as a criterion, FC-1→FC-7); Table 8.2 (last used FC-9); Table 8.3 (absent FC-11→FC-15); **Table 8.8** final formula with "Contribution to GDP" 10%; ¶2.16; ¶¶8.40-8.42 "tax contribution" = own tax revenue; ¶¶7.36, 7.39, 7.41 States' submissions; **"derivation" 0 occurrences** |
| **Sixteenth Finance Commission, Volume II — Annexures** | `https://fincomindia.nic.in/asset/doc/commission-reports/16th-FC/reports/Vol2-Annexures.pdf` | 200 / 5,773,379 | **Annexure 8.1** — all 28 States' proposed criteria, 19 columns, **none based on Union tax contributed**; footnotes 49, 58, 59, 60; Annexure 1.7 is a **schedule of State visits**, not a record of submissions; no annexure of Union tax collected by State |
| **Union Budget, Receipts Budget** | `https://www.indiabudget.gov.in/doc/rec/allrec.pdf` | 200 / 7,116,276 | negative result, honestly reported: **zero matches** for `destination.based|origin.based|place of supply|port of entry|head office|registered office`; **no State-wise break-up of Union tax collection** |
| Rajya Sabha question search endpoint | `https://rsdoc.nic.in/Question/Search_Questions?whereclause=<SQL>` | 200 (various) | the corpus itself — 1995-07-31 → 2026-08-04, sessions 174-271, `qn_text` full-text-searchable from Dec 1999 |
| Lok Sabha question search endpoint | `https://sansad.in/api_ls/question/qetFilteredQuestionsAns?...` | 200 (various) | the corpus itself — LS 14-18, subject-only, `totalRecordSize` gives the true count |

### NOT RETRIEVED — recorded as such, not graded

| Item | Modes tried | Status |
|---|---|---|
| RS Q.2833 (Maharashtra, 05.08.2014), RS Q.211 & Q.192 (Tamil Nadu, 22.07 & 08.07.2014), RS Starred Q.8 (Punjab, 22.11.2011), LS Q.1801 (24.08.2007) — **all ask point-blank for a State's contribution to the central exchequer** | M1 mode 2 (curl `--resolve`) against 11 filename/path variants; sibling files in the same directory confirmed downloadable (PC-7); session-wide filename coverage measured (PC-8). **M1 mode 3 unavailable — Playwright and WebFetch inherit the broken system resolver and cannot reach any host.** | **NOT RETRIEVED.** Empty or broken `files` links; a systemic archive defect (session 232 carries filenames for only 31% of records). Recoverable only from the printed debates, which no endpoint reachable from this machine serves. |
| Any laid paper fulfilling the 2005 undertaking in RS Q.62 | Question-corpus endpoints only | **NOT RETRIEVED — and not searched.** Laid papers are outside the reach of the question-search endpoints. Declared as an open thread, not a negative. |
| FC-XV full report | `fincomindia.nic.in/commission-reports-fifteenth` index retrieved (200 / 13,413) but report PDFs not isolated | **NOT RETRIEVED.** FC-XV's criteria are nonetheless captured T1 via FC-XVI's Table 8.3, which has no Tax Contribution row. |

---

*End of part 08. All Task A items retrieved with URLs; Task B settled on primary sources with the
Lok Sabha and Rajya Sabha corpora both swept and positive controls stated throughout.*
