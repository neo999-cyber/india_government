# Phase 14 — foreign policy and trade. State.

**B1 `23caebe` arcs A+F, lens axis · B2 `23cc1cf` arc B China mirror · B3 `95950e3`/`4df4cc8`
rounding basis, url-check spacing, arc C trade · B4 `7d6c4ec`/`18728fa`/`588f978` L-0021, build
freshness, arc D partial · B5 `6e30c2d`/`c071418` fixture soundness, arc E opened ·
B6 `391b16d`/`e36f6b3` idempotence controls, the SIPRI category record.**

## Measurement categories established by this phase — use these, do not re-derive

Three shapes, and a record must say which it is:

1. **differentFacts pair** — two instruments measuring the SAME quantity and disagreeing. Both
   sides retrieved, same period and basis, methodological reason stated where known, neither
   averaged nor picked. P-119 (India/China trade), P-120 (neighbourhood).
2. **Single-sided** — one side publishes and the other does not. NOT a pair; the absence is the
   finding, localised by relaxing one restriction at a time before it is recorded. L-0191, L-0193.
3. **Incommensurable** — two instruments measuring DIFFERENT quantities, where the divergence
   carries no information about either. NOT a pair and NOT an absence. L-0197 (MoD rupees against
   SIPRI TIV). Reading agreement as corroboration is the same error as reading divergence as
   refutation.

## NOT DONE — the live backlog

1. **Arc E remainder.** Rafale tranches; S-400 delivery and CAATSA exposure; indigenisation share
   against target; DAP domestic-content rules; emergency-procurement powers and their use.
   **The SIPRI question is CLOSED** — L-0197 settles it as category 3 above, and establishes that no
   currency-basis mirror exists because HS 93 classifies by commodity rather than end use. Filing
   rule settled; `defence-sector` on all, now fourteen records.
2. **Arc D remainder.** UK FTA, EU negotiation, RCEP non-entry against trade data. **`europe` is
   NOT in the enum** and enters with them — one Europe record does not earn a lens. L-0018 still
   describes four agreements with T4 sources.
3. **Arc G — multilateral.** G20 deliverables, IMEC announced against built, WTO fisheries and
   public stockholding, UNSC advocacy. Nothing authored.
4. **Arc C policy dimensions.** Adani PPA, Sri Lankan debt, Maldives swap, hydropower, FMR.
5. **Pakistan**, deferred on retrieval; exclusion stated in L-0192/L-0193 titles.
6. **L-0195's baseline question** — check whether the 10 March 2026 release or the underlying speech
   names a base year for the doubling claim. If one exists the claim becomes testable and the
   `contested` score changes.
7. **The retrieval-capability cycle**, one cycle. Class: Cloudflare gates (`pca-cpa.org`), JS shells
   answering 200 with no document (`mea.gov.in`), scans with no text layer (the IWT PDF), hosts
   needing an explicit resolver (`ppac.gov.in` 164.100.198.160, `mea.gov.in` 13.224.236.14,
   `www.pib.gov.in` 94.202.207.57), CAPTCHA'd full-text endpoints (`federalregister.gov`), the
   Gazette task.

## Harness state after B5 — what is now mechanical rather than remembered

- **Every fixture assertion names its own failure.** 33 sites; zero assert a bare exit code.
- **Enum drift fails loudly.** Generated fixtures carry `GENERATED-FROM.json`; the selftest compares
  it to the live schemas. When `europe` is admitted, run `npm run regen:lens-fixtures` in the same
  commit — the selftest will say so if you forget.
- **Gates reading `out/` refuse on a stale build** (exit 2, distinguished from no-build).
- **Word boundaries by default** in `tools/lib/corpus-search.mjs`; `substring: true` is the visible
  opt-out.
- **figure-consistency** checks declared claims against source AND printed operands; separators are
  normalised, and its own claims' source values are checked rather than typed.
- **A failing check re-run without a fix must still fail** — enforced on `enum-stamp` and on
  freshness, with the B5 self-repair bug reintroduced as the negative control. Only `selftest`
  touches state at all; every other gate is a pure reader.
- **No checker imports from its own repair path** — asserted by importing each library in a child
  process and requiring the fixture tree to be byte-identical after.
- **Logged, not built:** the 23 `MUST_FIRE` rules share one `broken` root, so message pinning does
  not isolate records. Per-rule roots is the fix. Tedium, not hazard.

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
