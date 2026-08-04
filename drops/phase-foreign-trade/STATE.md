# Phase 14 — foreign policy and trade. State.

**B1 `23caebe` arcs A+F, lens axis · B2 `23cc1cf` arc B China mirror · B3 `95950e3`/`4df4cc8`
rounding basis, url-check spacing, arc C trade · B4 `7d6c4ec`/`18728fa`/`588f978` L-0021, build
freshness, arc D partial · B5 `6e30c2d`/`c071418` fixture soundness, arc E opened ·
B6 `391b16d`/`e36f6b3` idempotence controls, the SIPRI category record ·
B7 `60e4bde` the indigenisation metric and CAATSA's three states ·
B8 `2d384b6` emergency procurement and Rafale-M ·
B9 rule 5d, the append-only log rule, and the S-400 schedule.**

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

## Standing rule 5c — derived quantities inherit their inputs' contests

Added to CLAUDE.md on 2026-08-04. A ratio, percentage, share or per-unit figure whose numerator or
denominator appears in a `differentFacts` pair must carry the divergence forward as an attributed
range, or not be stated. **No gate catches this class** — both computations are correct in isolation.

**IN SCOPE FOR THE ASSESSMENT AUDIT as a corpus-wide sweep.** L-0200 was the first identified
instance and was corrected in cycle 2026-08-04o; the corpus has not been swept for others, and that
sweep is deliberately left to the audit so its finding rate is not contaminated by a partial pass
done here.

## Open items logged against arc E, not acted on

- **L-0200's `partly` score has a retrievable test.** The DAC delegation undertook order placement
  within six months. Thirteen contracts exist under it, and **contract signature dates may be
  retrievable** — they would bear directly on that limb. Not attempted; the score stands.
- **The S-400 file's arc ownership is undecided.** Its content is an absence of published schedule
  and delivered count, which may make it retrieval-capability material rather than an arc E file.
  **Pending an owner decision** — do not assume arc E owns it.

## NOT DONE — the live backlog

1. **Arc E remainder — STILL OPEN, two files.** Done: exports vs target (L-0196), the
   measurement-category record (L-0197), the indigenisation metric (L-0198), CAATSA exposure
   (L-0199), emergency procurement (L-0200), Rafale-M (L-0201). **Not done:**
   - ~~The S-400 delivery schedule~~ — **DONE, L-0202.** Arc ownership settled: a publication
     choice is not a retrieval failure, so arc E owns it. The mirror check found that the apparent
     Russian-side source (TASS) traces back to Indian press sourcing, and that a genuine
     partner-government statement exists and REFUSES the quantity — so the record carries two
     absences with different reasonKinds, `withheld` on the Russian side and `not-published` on the
     Indian.
   - **Rafale's earlier tranche.** L-0201 covers the April 2025 Navy IGA only, and says so in its
     own caveat. The Air Force acquisition has no retrieved primary.
   - **DAP domestic-content rules beyond the IC minimums** — offsets, positive indigenisation lists,
     and what the lists actually bind.

   `defence-sector` is at eighteen records. Filing rule settled.

   **Retrieval note:** `www.mod.gov.in` and `www.ddpmod.gov.in` RESOLVE (164.100.252.190,
   164.100.94.167) and REFUSE on port 443 — recorded as an environment fact, do not re-derive. PIB
   is the working route; pin `www.pib.gov.in:443:94.202.207.57`. The MoD **Year End Review**
   (PRID 2210154) is a single 654k-character document covering acquisitions, exports, diplomacy and
   indigenisation — the highest-yield single retrieval found in this arc.

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
7. **The retrieval-capability cycle — WANTS ITS OWN SCOPING SESSION, not a slot at the end of a
   batch.** Five distinct failure modes are now attested:
   1. Cloudflare gating — `pca-cpa.org` (403 from two clients)
   2. JS shells answering 200 with no document — `mea.gov.in`
   3. Scans with no text layer — the Indus Waters Treaty PDF on MEA's portal
   4. A resolving host refusing 443 — `www.mod.gov.in`, `www.ddpmod.gov.in`
   5. The carried Gazette task

   Hosts needing an explicit resolver are a sixth, milder mode and are already worked around:
   `ppac.gov.in` 164.100.198.160, `mea.gov.in` 13.224.236.14, `www.pib.gov.in` 94.202.207.57.
   `federalregister.gov` CAPTCHAs its full-text endpoints while its API works.

   **Its output is TWO things, and the second is corpus material in its own right:** retrieval where
   possible, and a documented account of what the Indian government publishes that cannot be
   retrieved by ordinary means. The second is a finding about the publication regime, not a
   housekeeping note, and it belongs in the instrument rather than in a tooling log.

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
