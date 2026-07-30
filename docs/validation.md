# Validation — what the gate checks

`npm run validate` is the only way data enters the instrument. `npm run build` runs it
first, so an invalid repository cannot compile and cannot deploy (CLAUDE.md, data rule 1).

Three passes, in order. Any **error** fails the run with exit 1. **Warnings** are reported
and do not block, because each one describes work outstanding in research rather than a
broken repository; `--strict` promotes them to errors.

## Pass 1 — readable

Every `.json` file under `data/` is parsed and assigned to a layer by path:

| Path | Layer |
|---|---|
| `data/series/**.json` | series |
| `data/ledger/**.json` | ledger |
| `data/provenance.json`, `data/provenance/**.json` | provenance |
| `data/incoming/<same shape>` | same layer, only with `--incoming` |

A file may hold one record object or an array of records. Files outside these paths are
skipped, not guessed at.

## Pass 2 — schema

Each record is validated against its schema in `/schemas` (JSON Schema 2020-12, Ajv). The
schemas are closed (`additionalProperties: false`), so an unrecognised property is an
error, not a silent pass — new fields are agreed in chat and added to the schema first,
because research sessions author against it.

## Pass 3 — cross-reference and instrument rules

Errors:

| Rule | Check |
|---|---|
| `id-unique` | no duplicate id within a layer, across all files |
| `ref-resolves` | `ledger.seriesRefs`, `ledger.provenanceRefs`, `series.provenanceRefs` and `series.breaks[].provenanceRef` all resolve to a loaded record |
| `back-link` | a series named in `provenance.affectsSeries` carries that `P-xx` in its own `provenanceRefs`, so the dispute travels with every rendered number (rule 6) |
| `point-unique` | one value per country-period within a series |
| `calendar-discipline` | periods match the series calendar — `FYyyyy-yy` for FY (with consecutive years), `yyyy` for CY. Never mixed within one series |
| `paired-series` | neither GDP base exists without its counterpart, so neither can be presented alone as "GDP growth" (rule 5) |
| `t5-dispute-link` | a T5 contested index carries `P-08` (rule 6) |
| `panel-vintage` | a peer-panel series with any `verified` point records `source.vintage` (rule 7 / P-09) |
| `baseline-context` | the `baseline-context` assessment appears only on `term: baseline` |
| `date-order` | `dateEnd` does not precede `date` |

Warnings:

| Rule | Why it is not an error |
|---|---|
| `affects-series-pending` | a dispute names a series not yet ingested — research sessions legitimately record the dispute before the series |
| `panel-vintage` (approx/pending only) | vintage is required to *verify* a panel value, not to draft one |
| `term-window` | a record dated outside its term window may be deliberate (e.g. a Sept 2014 record carried as Kashmir baseline context) — a research judgment, not a schema fact |
| `break-span` | a break documented ahead of the data it will cut (the PLFS transition) is correct |
| `pending-note` | a placeholder without a note is untidy, not invalid |
| `bridge-note` | `bridgeExists: true` with no note describing the reconciliation |
| `future-date` | `asOf` or `source.vintage` after today |

The two lists of paired series — `tools/lib/integrity.mjs` and `lib/rules.ts` — must stay
in step: one enforces the rule, the other renders it.

## Proving the gate is closed

`npm run validate:selftest` runs the validator twice: once over `/data`, which must pass,
and once over `tools/fixtures/broken/`, which seeds one violation per error rule and must
fail with every rule firing. If a rule is ever weakened, the selftest fails rather than the
weakening going unnoticed.

```
selftest OK — /data valid (6 warning(s)); 12/12 rules fire on broken fixtures (19 errors caught)
```

## Current warnings on `/data`

As of the 2026-07-30 cycle, six — all tracked in `verification-log.md`:

- `gdp-per-capita-usd` has no `source.vintage`; the whole panel is to be pulled at one
  vintage (open queue, high priority).
- `lfpr-overall` carries the PLFS break at FY2017-18, ahead of its observed span.
- `L-0010` (J&K floods, Sept 2014) sits in `baseline` by research judgment.
- `P-02`, `P-05`, `P-06` name `lfpr-female-urban`, `cpi-inflation` and `fiscal-deficit`,
  none of which are ingested yet.
