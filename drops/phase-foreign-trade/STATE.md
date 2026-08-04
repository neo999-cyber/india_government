# Phase 14 — foreign policy and trade. State.

**Batch 1 (`23caebe`) arcs A+F, the lens axis: merged, deployed.
Batch 2 (`23cc1cf`) arc B, the India-China mirror: merged, deployed.
Batch 3 head (`95950e3`) rounding basis + url-check spacing · arc C trade dimension (`4df4cc8`).
Batch 4 head: L-0021 corrected (`7d6c4ec`) · build-freshness gate (`18728fa`).
Batch 4 arc D PARTIAL (`588f978`) — TEPA commitment and the doubling claim.**

## NOT DONE — the live backlog

1. **Arc E — procurement. NOT STARTED.** Nothing attempted, nothing failed, no room. Rafale
   tranches, S-400 and CAATSA, indigenisation and export figures against target,
   emergency-procurement powers. Filing rule settled: cost → macro; indigenisation, offsets,
   exports, DAP domestic content → foreign; G2G-as-diplomacy → foreign; `defence-sector` on all.
   Export and indigenisation targets are commitment records — same three states. Agnipath stays out.
2. **Arc D remainder.** UK FTA (in force July 2026), the EU negotiation, RCEP non-entry against
   subsequent trade data. **`europe` is NOT in the lens enum** and must enter with these — one
   Europe record does not earn a lens. L-0018 still describes four agreements' status with T4
   sources and is arc D's business.
3. **Arc G — multilateral.** G20 deliverables against outcomes, IMEC announced against built, WTO
   fisheries and public stockholding, UNSC advocacy. Nothing authored.
4. **Arc C's POLICY dimensions.** Only the trade dimension exists. Owed: Bangladesh transit, energy
   and the Adani PPA; Sri Lankan debt, energy and ports; the Maldives reversal, swap and
   infrastructure; Nepal-Bhutan hydropower; Myanmar's border fencing and the Free Movement Regime.
5. **Pakistan, deferred alone**, blocked on retrieval. Exclusion is stated in L-0192 and L-0193's
   titles rather than left silent.
6. **The retrieval-capability cycle.** One cycle. Class members: Cloudflare gates (`pca-cpa.org`),
   JS shells answering 200 with no document (`mea.gov.in`), scans with no text layer (the Indus
   Waters Treaty PDF), hosts needing an explicit resolver (`ppac.gov.in` 164.100.198.160,
   `mea.gov.in` 13.224.236.14, `www.pib.gov.in` 94.202.207.57), CAPTCHA'd full-text endpoints
   (`federalregister.gov`), and the Gazette task.

## Standing hazard: fixtures derived from a live enum

`lens-coverage-empty` and `lens-coverage-no-page` are generated FROM the schemas. When `europe` is
admitted they will begin failing on the wrong branch, exactly as they did after `china` and
`neighbourhood` were added — exit 1 either way, selftest green, branch unchecked. **Re-run the
regeneration in the same commit as any enum change.** The branch assertions added in `18728fa` turn
that from a silent pass into a failure, but they do not regenerate the fixture.

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
