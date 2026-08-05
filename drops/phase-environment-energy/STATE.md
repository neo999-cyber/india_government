# Phase 15 — environment and energy. State.

**B1 `<this commit>` arc A: renewables against coal, plus the 226-invisible-marks fix.**

## BATCH 1 CLOSED — 2026-08-05. Arc A only.

**11 records: L-0221, L-0222 in `data/ledger/environment.json` (NEW FILE); P-121, P-122 appended to
`data/provenance.json`; seven series in `data/series/environment.json` (NEW FILE). Corpus 662 → 673.**

Both new files are 1-space, matching `provenance.json`, `pairs.json` and the plurality of ledger
files. **`data/ledger/foreign-trade.json`, `education.json`, `baseline.json`, `kashmir-*.json` and
`rights-institutions.json` are 2-space** — indentation is NOT uniform in this repo and a wrong-indent
write reformats the whole file. Measure the file you are writing.

## The arc's spine, in one line

**Non-fossil plant is 54.18 per cent of installed capacity and supplies 29.2 per cent of the
electricity.** Every Indian renewable target is written in capacity; the one commitment written in
energy is the one nobody reports against.

## What is authored

| id | subject | assessment |
|---|---|---|
| **L-0221** | the capacity/generation gap; the 50 per cent milestone; the 51.5 per cent figure | `partly` |
| **L-0222** | thermal-coal-import stop missed in its own year; production +85pc; new-coal build doubled | `failed` |
| **P-121** | four concurrent official boundaries for "renewable"; large hydro reclassified Mar 2019 | `obscures` |
| **P-122** | RES generation imputed not metered up to FY2013-14 — break at the UPA baseline | `overstates-pre-2014` |

Series: `res-capacity-share` · `res-generation-share` · `non-fossil-capacity-share` ·
`non-fossil-generation-share` · `coal-production` · `coal-plf` · `coal-imports-total`.

## NOT DONE — the live backlog

### 1. Arc A remainder — grid absorption, curtailment, storage

*What:* whether renewable output is being curtailed, and what storage exists against it. *Why
deferred:* room; the arc's spine was the capacity/generation distinction and it is complete without
this. *Depends on:* CEA RE Generation Portal daily reports (`gen-re.cea.gov.in/reports`, retrieved,
live) and the NEP's BESS scenarios (already retrieved in `nep.pdf`, Exhibit 5.5a carries
38.71–67.04 GW / 193.55–335.2 GWh across scenarios).

### 2. Arc B — air quality. NOT STARTED.

NCAP (launched Jan 2019, target and base year to be retrieved), CPCB monitoring network, `delhi-pm25`
is a ONE-POINT series (2014, 153 µg/m³, T2 WHO) and needs a spine. **`cpcb.nic.in` (45.127.74.241)
shows the same TLS-reset fingerprint as Grid-India: TCP OPEN, handshake reset, zero bytes read.**
Vary the host before concluding anything — CPCB data is also carried by state boards and by the
National Clean Air Programme portal.

### 3. Arc C — forest clearances. NOT STARTED.

ISFR's definition of "forest cover" (plantations, orchards and tea gardens are the known trap),
the Van (Sanrakshan Evam Samvardhan) Adhiniyam 2023 amendment, FCA diversion figures, CAMPA.
`fsi.nic.in` resolves to 14.139.254.74 and returned 302; `moef.gov.in` (164.100.221.70) is live and
carries 126 KB of text.

### 4. Arc D — the wider climate-commitment set. PARTLY PRE-EMPTED.

The electricity limbs are done in L-0221. What remains: the emissions-intensity limb (45 per cent by
2030 from 2005, the only base year named anywhere in the set), the 1-billion-tonne carbon reduction,
the 2.5–3 billion tonne carbon sink, and **net-zero-by-2070**. Expect the user's flagged shape:
**net-zero 2070 with no interim phasing is likely state (d), unfalsifiable by construction — do NOT
force it to (a) because a year is named.** A year with no phasing and no interim target cannot fall
due before it arrives. A total WITH a date is (a); this one needs its wording retrieved before the
test is applied.

### 5. L-0052 and `re-capacity` — CORRECTIONS OWED, RAISED NOT APPLIED

`/data` edits at source are an operator decision. Four items, all evidenced in the log entry:
- `unmeasured[0].reasonKind` is `not-published`; **the datum is published** — CEA's monthly RE report
  carries tables literally titled "Monthly Renewable Energy as % of Total Electricity Generated".
  The record's own `why` says "in anything retrieved", which was right; the `reasonKind` overclaimed.
- The `unmeasured[0]` entry can be **closed outright**, not re-graded — `res-generation-share` and
  `non-fossil-generation-share` now supply exactly what it asks for.
- `caseFor` rests on "renewables meeting over half of demand in a peak month". That is the 51.5 per
  cent figure, which is a single-instant power ratio on 29 July 2025. See L-0221's caveat.
- Sole source is a bare root, `https://mnre.gov.in/`, graded T1.
- **`re-capacity`'s notes and L-0052 both attach 283.46 GW to July 2025.** It is a capacity stock as
  on 31.03.2026.

### 6. The rendering audit, only half run

Phase 15 swept the LEDGER layer for fields that render nowhere and found two (`assessmentNote` 164,
`revisitTrigger` 62). **The series and provenance layers have not been swept.** The audit is one
loop: for each schema field, count records carrying it against records whose own built page contains
it. Anything at zero is invisible.

## Retrieval notes — pins and traps, verified this run

**Pins (all returned real text bodies):** `cea.nic.in` 45.127.74.41 · `gen-re.cea.gov.in`
164.100.114.49 · `mnre.gov.in` 164.100.51.103 · `coal.nic.in` / `coal.gov.in` 164.100.166.94 ·
`moef.gov.in` 164.100.221.70 · `fsi.nic.in` 14.139.254.74 · `npp.gov.in` 45.127.74.236 ·
`www.pib.gov.in` 94.202.207.57.

**Traps, each paid for this run:**
- **Large PDFs on `cea.nic.in` truncate silently at HTTP 200** and still pass `file(1)` as a PDF.
  The General Review failed twice at ~2 MB of 12.15 MB; the NEP returned 1.19 MB of 19.54 MB. `HEAD`
  for `Content-Length`, then `curl -C -` or `--retry 5 --retry-all-errors`, and check extracted TEXT
  length. **Measure text, never bytes and never the status code.**
- **`unfccc.int` serves a 212-byte Incapsula stub at HTTP 200** for a `.pdf` URL, and `pdftotext`
  accepts it rather than refusing. A cookie-jar two-step plus `?download` worked for the stage-2
  agent and did NOT reproduce in the main loop or through `WebFetch`. Treat as client-dependent.
- **`pib.gov.in` without `www.`** returns HTTP 301 with a 0-byte body. Use `www.`, and append
  `&reg=3&lang=1` or the request 302s to a Hindi variant. Older releases live at
  `/newsite/PrintRelease.aspx?relid=NNNNN`.
- **`grid-india.in`, `posoco.in`, `cpcb.nic.in`:** TCP OPEN, TLS handshake reset, zero bytes read,
  identical across three clients, four IPs and three resolvers. **Not a claim that they are down** —
  one estate, one observation.

## Method this batch added, in CLAUDE.md

**A schema field with no view renders nowhere and every gate stays green.** `reachability` guards a
LIST; a field absent from it is unguarded by construction. When a field is added to a schema, it is
added to the type, to a view, and to the guarded-marks list in the same commit. TypeScript does not
save you — `revisitTrigger` was absent from `LedgerRecord` for its whole life and `typecheck` was
green throughout.
