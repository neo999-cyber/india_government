# India Roadmap Instrument

Longitudinal research instrument: India's condition and trajectory, UPA baseline (frozen
May 2014) through the Modi-era terms. Private audience. See [CLAUDE.md](CLAUDE.md) for the
rules that govern the data and the build — they are binding, not advisory.

Next.js, static export, no server, no database, no auth.

## Commands

```bash
npm run validate           # gate: schemas + cross-references + instrument rules over /data
npm run validate:incoming  # merge gate: also checks /data/incoming drops
npm run validate:strict    # warnings become errors
npm run validate:selftest  # proves the gate is closed (broken fixtures must fail)
npm run dev                # local development
npm run build              # validate, then static export to out/
npm run typecheck          # tsc --noEmit
```

`npm run build` runs the validator first, so an invalid repository cannot compile and
therefore cannot deploy. Vercel runs the same script.

## Layout

```
data/
  series/*.json        indicator time series, India + peer panel (BGD, VNM, IDN, CHN)
  ledger/*.json        reform / event / episode records (L-xxxx)
  provenance.json      measurement-dispute records (P-xx), first-class citizens
  incoming/            drops from research sessions — validated, then merged
schemas/               the contract; research sessions author against these
tools/                 validator CLI
tests/fixtures/        deliberately invalid records proving the gate rejects them
lib/                   build-time data access and formatting
app/                   routes (static export)
components/            status marks, tier tags, series tables with break seams
docs/verification-log.md   what was pinned this cycle, and the open queue
```

A data file may hold one record or an array of records. The layer is decided by path, not
by contents.

## Routes

| Route | What it holds |
|---|---|
| `/` | what is loaded, by layer, term and domain |
| `/domains/`, `/domains/[domain]` | the fourteen fixed domains |
| `/series/`, `/series/[id]` | series with points, breaks as seams, source + tier + provenance |
| `/ledger/`, `/ledger/[id]` | records with assessment, both cases, tiered sources |
| `/provenance/`, `/provenance/[id]` | disputes, competing accounts, what they touch |
| `/terms/`, `/terms/[term]` | counts of assessments per term — never a grade |
| `/peers/` | peer panel, vintage shown with the values (P-09) |
| `/counterfactual/` | both methods stated; no counterfactual computed yet |
| `/method/` | status marks, tiers, splicing policy, the gate |

Views beyond Phase 0 (charting, timelines, filtering, the counterfactual computation) are
marked as scaffolds in place, so the gap is visible rather than implied.

## Adding data

1. Research session drops files under `data/incoming/`, mirroring the layer shape.
2. `npm run validate:incoming` — nothing merges until this is clean.
3. Move the records into the canonical layer files.
4. `npm run validate`, then log what was pinned in `docs/verification-log.md`.

`/data` is additive-only: corrections are made by editing the record and noting the change
in the verification log, never by silent deletion.
