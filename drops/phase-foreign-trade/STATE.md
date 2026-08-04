# Phase 14 — foreign policy and trade. State.

**Batch 1 (`23caebe`) arcs A+F and the lens axis: merged, deployed.
Batch 2 (`23cc1cf`) arc B, the India-China mirror: merged, deployed.
Batch 3 head (`95950e3`) the rounding basis + url-check spacing: merged.
Batch 3 arc C (`4df4cc8`) the neighbourhood TRADE dimension: merged.**

## NOT DONE — the live backlog, in the order the brief put them

1. **Arc D — agreements.** UAE CEPA, Australia ECTA, EFTA TEPA, UK FTA, the EU negotiation, RCEP
   non-entry against subsequent trade data. Nothing authored. **Not blocked** — the primaries are
   retrievable and nothing about them was tried and failed. `europe` is correspondingly absent from
   the lens enum. TEPA's investment commitment is dated, sized and testable and is the first-class
   record here. Negotiating texts are UNPUBLISHED, not withheld — `withheld` needs a named
   requester, a specific request and a date.
2. **Arc E — procurement.** Rafale tranches, S-400 and CAATSA, indigenisation and export figures
   against target, emergency-procurement powers. Nothing authored. Filing rule is settled: cost →
   macro, indigenisation/offsets/exports/DAP → foreign, G2G-as-diplomacy → foreign, `defence-sector`
   lens on all. Agnipath stays out.
3. **Arc G — multilateral.** G20 deliverables against outcomes, IMEC announced against built, WTO
   fisheries and public stockholding, UNSC advocacy. Nothing authored.
4. **Arc C's POLICY dimensions.** Only the trade dimension is authored. Still owed: Bangladesh
   transit, energy and the Adani PPA; Sri Lankan debt restructuring, energy and ports; the Maldives
   reversal arc, currency swap and infrastructure; Nepal-Bhutan hydropower and power trade;
   Myanmar's border fencing and the Free Movement Regime. These need policy primaries, not trade
   returns.
5. **Pakistan, deferred alone.** The Indus abeyance, the trade suspension and transit. Blocked on
   retrieval, not on scope — see the blocker list below. Its exclusion is stated in the titles of
   L-0192 and L-0193 rather than left as a silent gap.
6. **L-0021 and the US-tariff-currency sweep.** Its own cycle, immediately after batch 3 and ahead
   of the L-0086/L-0092/L-0183 bundle. The IEEPA holding invalidates a CLASS of claim: sweep every
   record asserting a US tariff rate, a legal basis for one, or a negotiation state as current.
7. **The retrieval-capability cycle.** One cycle, not four stops. Class members found so far:
   Cloudflare gates (`pca-cpa.org`), JS shells that answer 200 with no document (`mea.gov.in`),
   scans with no text layer (the Indus Waters Treaty PDF on MEA's portal), hosts needing an explicit
   resolver (`ppac.gov.in`, `mea.gov.in`), CAPTCHA'd full-text endpoints (`federalregister.gov`),
   and the carried Gazette task.

## What is done

- **Enum work.** No new domain: `foreign` already covers every arc. No amendment record is owed.
  Reasoning and the procurement filing table are in `scope/SCOPE.md`.
- **Lens axis.** `defence-sector`, `united-states`, `russia` admitted with definitions. New `/lenses`
  route. `domain-coverage` retargeted at lens surfaces; new `lens-empty` rule; `lens-duplicated`
  extended to the ledger; four new fixtures. `lenses[]` added to the ledger schema.
- **Backfill.** `defence-sector` on 12 ledger records and 13 series, asserted per record.
- **Arcs A and F.** L-0184 to L-0189 in `data/ledger/foreign-trade.json`.
- **Controls.** `scope/lens-controls.mjs`, four paired controls, run green.

## What is NOT done, and what the next run needs to know

### Batch 2 — arcs B (China) and C (neighbourhood)

- **Admit `china` and `neighbourhood` to the lens enum in the same commit as their records.** The
  `lens-empty` gate fails the build otherwise, which is the intended behaviour, not an obstacle.
  Three places move together: `schemas/{series,pairs,ledger}.schema.json` (enum + per-value
  definition — the definitions are already drafted in the phase brief and in `scope/SCOPE.md`),
  `lib/types.ts` LENSES, and `lib/format.ts` LENS_LABELS + LENS_BLURBS. Typecheck catches the last
  two if missed; nothing catches a missing schema definition except §6.
- **Mirror statistics are the highest-value material and none is authored yet.** India–China is the
  largest documented divergence. Both sides must be retrieved: DGCIS/Ministry of Commerce on the
  Indian side, China's GACC on the other. Do not average and do not pick one — these are
  `differentFacts` pairs.
- **Do not duplicate phase 11.** Post-Galwan disengagement enters only as a diplomatic instrument.

### Batch 3 — arcs D, E, G

- `europe` is admitted here, with the UK FTA / EFTA TEPA / EU negotiation records.
- **EFTA TEPA's investment commitment is a dated, sized, testable commitment** — treat it as a
  first-class record and resolve it into one of the three commitment states.
- **L-0018 (RCEP withdrawal) is arc D's collision.** It already carries EFTA and UK in passing, with
  T4 sources. Arc D should hold them properly; decide then whether L-0018 is corrected or left.

### Owed from batch 1, deliberately not done here

- **L-0021 needs correcting.** It states "the rate was later cut to 18% under an interim arrangement"
  as the current position. On the primaries retrieved in this run that is superseded: the 18 per cent
  was promised under EO 14257, whose duties were void fourteen days later, and India has paid 10 per
  cent since 24 February 2026. Its sources are T4 where T1 now exists. This is a shipped-record edit
  and belongs in its own cycle with its own log entry, not smuggled into a phase commit.
- **Arc F has no measured spine.** No official Indian series for crude imports by country of origin
  was located. L-0189 records the absence with two routes named: PPAC's import-export tables at
  `ppac.gov.in/import-export` (not retrieved — the site needs an explicit resolver, see below) and
  DGCIS commodity-by-country data. Retrieving either converts the absence into a series.

## Retrieval notes that will save the next run time

- **`ppac.gov.in` does not resolve under the system resolver** but resolves identically on 1.1.1.1,
  8.8.8.8 and 9.9.9.9 to `164.100.198.160`. Use `curl --resolve ppac.gov.in:443:164.100.198.160`.
  `url-check` already handles this itself.
- **`uscode.house.gov` refused connection from two processes and two clients.** Use govinfo:
  `https://www.govinfo.gov/link/uscode/<title>/<section>?link-type=html` redirects to the right
  package path.
- **`federalregister.gov` serves a CAPTCHA on its full-text endpoints** to automated clients. Its
  JSON API works and is the way to find document numbers; take the TEXT from govinfo at
  `https://www.govinfo.gov/content/pkg/FR-<yyyy-mm-dd>/html/<docnum>.htm`.
- **`supremecourt.gov` 403s some clients and 200s others.** Vary the user agent before concluding.
- **Federal Register `conditions[term]` with OR is unreliable** — it returned zero presidential
  documents for June–August 2026 while the unfiltered query returned 37 including several tariff
  actions. Run the unfiltered query as the control.
