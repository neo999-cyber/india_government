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

Two of the ledger rules are conditionals rather than flat constraints, and they are the
ones most worth distrusting:

| Conditional | Effect |
|---|---|
| `if term = baseline` | `then assessment` must be `baseline-context` — a pre-2014 record can never carry a score |
| `if assessment ∈ {worked, partly, failed, reversed, contested}` | `then caseFor` and `caseAgainst` are both required — nothing is scored one-sidedly |

### Ajv configuration

Set in `tools/lib/schema.mjs` as `AJV_OPTIONS`, and it matters:

```js
{ allErrors: true, strict: true, strictRequired: false, allowUnionTypes: true }
```

`strict: true` is **not** what makes the conditionals work — `if`/`then` are applicator
keywords and Ajv2020 evaluates them regardless. What it buys is that a *misspelled* keyword
fails compilation instead of being dropped in silence. Under `strict: false`, an
`allOf[].than` typo'd for `then` compiles happily and every record the conditional was
meant to catch passes. That is the failure mode to guard against, and the selftest asserts
the typo now throws.

`strictRequired` has to stay off. It requires every name in a `required` list to be
declared in `properties` at the same subschema level, which a conditional cannot satisfy:
`allOf[1].then.required` names `caseFor`/`caseAgainst`, declared at the root where they
belong. Turning it on makes the schemas fail to compile at all, and the schemas are the
contract — the validator config bends, not them.

## Pass 3 — cross-reference and instrument rules

Errors:

| Rule | Check |
|---|---|
| `id-unique` | no duplicate id within a layer, across all files |
| `ref-resolves` | `ledger.seriesRefs`, `ledger.provenanceRefs`, `series.provenanceRefs` and `series.breaks[].provenanceRef` all resolve to a loaded record |
| `back-link` | a series named in `provenance.affectsSeries` carries that `P-xx` in its own `provenanceRefs`, so the dispute travels with every rendered number (rule 6) |
| `ref-relevant` | a provenance reference names a record whose `affectsDomains` covers the referring record's domain, or `all`. Resolving is not enough: `psb-gross-npa`, a banking series, carried its AQR break against P-06 (off-budget fiscal accounting) for two phases because the id resolved and nothing asked whether it resolved to anything related. Applies to `series.provenanceRefs`, `series.breaks[].provenanceRef` and `ledger.provenanceRefs` |
| `point-unique` | one value per country-period within a series |
| `calendar-discipline` | periods match the series calendar — `FYyyyy-yy` for FY (with consecutive years), `yyyy` for CY. Never mixed within one series |
| `regime-group` | no GDP base exists without the rest of its group, so none can be presented alone as "GDP growth" (rule 5). Three regimes since P-10: 2004-05, 2011-12, 2022-23 |
| `regime-handoff` | consecutive regimes overlap or meet; a gap would leave years on no basis at all (rule 5) |
| `charset-script` | non-Latin text in prose — the case JSON Schema cannot see, since a Cyrillic word is a perfectly valid string (rule 9, English only) |
| `charset-invisible` | zero-width spaces, bidi overrides, non-breaking spaces — invisible by definition, so review by eye will never catch them |
| `charset-url` | non-ASCII anywhere in a URL: a lookalike domain is indistinguishable from the real ministry's |
| `charset-homoglyph` | U+03BC Greek mu where U+00B5 micro sign belongs, so identical-looking units cannot drift apart |
| `charset-symbol` | any other character outside the allowlist |
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
| `denominator-break` | a ratio-to-GDP series crossing a denominator revision that it does not declare — either it rests on the restated denominator and should link it, or it uses a different one and should say so. A research call, so not a blocker |
| `charset-diacritic` | a Latin letter outside ASCII (é, ñ, ā) — legitimate in a proper name, so flagged rather than blocked |
| `npa-basis` | a series carrying P-18 that states no reporting basis in its title or notes. It renders as "basis not stated" and is barred from sharing an axis, which is the safe outcome, but the basis is a research fact and should be recorded |
| `npa-adjustment` | a series carrying P-17 whose adjusted view cannot be computed because the advances denominator is not in `/data` |

## Pass 4 — character sweep

Every string in every record, whatever the layer, checked character by character. Schema
validation is structurally blind here: `"type": "string"` is satisfied by a Cyrillic word in
an English summary, a zero-width space inside a figure, or a homoglyph domain in a source
URL.

Allowed in prose and units:

| | |
|---|---|
| Typography | `₹ — – ' ' " " ± × °` |
| SI notation | `µ ² ³` |

The SI set extends the specified allowlist. `°` already admits this class, and the PM2.5
series carries the correct unit `µg/m³` — mangling it to `ug/m3` to satisfy a linter would
be the wrong trade. The `µ` allowed is U+00B5 MICRO SIGN; U+03BC GREEK SMALL LETTER MU is
visually identical and rejected, so the two cannot drift apart across the data.

URLs allow nothing outside ASCII, with no exceptions.

Severity splits on what the character actually risks. Non-Latin scripts, invisibles,
non-ASCII URLs and stray symbols are **errors** — they are either rule 9 violations or
things no reviewer can catch by eye. Latin letters with diacritics are **warnings**, since
research prose will legitimately need them for proper names, and erroring would force a
researcher to misspell a name to get a build through.

Non-Latin text is reported as whole runs rather than per character, so a stray word reads
as one finding:

```
error [charset-script] L-9005 summary Cyrillic text in English prose (CLAUDE.md rule 9):
  "прогресс" (U+043F U+0440 U+043E U+0433 U+0440 U+0435 U+0441 U+0441)
  — in "…f the right shape. The word прогресс sits in the middle …"
```

The two lists of paired series — `tools/lib/integrity.mjs` and `lib/rules.ts` — must stay
in step: one enforces the rule, the other renders it.

## Proving the gate is closed

`npm run validate:selftest` is the regression test for the gate itself. It asserts:

1. `/data` validates.
2. `tests/fixtures/invalid/` — three records, each rejected **for its own stated reason**,
   matched on the error text. Named rather than counted, so a rule that stops
   discriminating is caught by name instead of hiding behind a smaller total:
   - `ledger/failed-without-case-against.json` — `failed` with no `caseAgainst`
   - `ledger/baseline-scored-as-worked.json` — `baseline` term assessed `worked`
   - `series/point-missing-status.json` — an observation with no `status`
3. `tests/fixtures/broken/` — one violation per error rule; every rule must fire.
4. A misspelled schema keyword must fail compilation (see the Ajv notes above).
5. `--strict` promotes the real repository's warnings.

```
selftest OK — /data valid (6 warning(s))
  rejected ledger/failed-without-case-against.json — scored assessment with caseAgainst missing
  rejected ledger/baseline-scored-as-worked.json — baseline term carrying a scored assessment
  rejected series/point-missing-status.json — observation with no measurement status
  12/12 rules fire on tests/fixtures/broken (19 errors caught)
  misspelled schema keyword fails compilation
```

Fixtures live under `tests/`, never under `/data`, so the site never renders them and the
default `npm run validate` never sees them. To reject one by hand:

```bash
node tools/validate.mjs --data tests/fixtures/invalid
```

### The gate stops the build, not just the validator

With any one of those records copied into `/data`, from a clean tree:

```
npm run build exit code: 1
occurrences of 'Compiled successfully': 0
out/ exists?   NO
.next/ exists? NO
```

`next build` is never reached, so no artifact exists to deploy. Vercel runs the same
`npm run validate && next build`, so a bad record fails the deploy the same way.

## Current warnings on `/data`

After the phase-2 drop, five — all tracked in `verification-log.md`:

- `cad-gdp` is `% of GDP` and spans 27 Feb 2026 but carries no `P-10`. Open question for
  chat: the BoP ratio may rest on a different denominator from the budget ratios.
- `lfpr-overall` carries the PLFS break at FY2017-18, ahead of its observed span.
- `fiscal-deficit` carries the P-13 anchor change at FY2026-27, ahead of its observed span.
- `L-0010` (J&K floods, Sept 2014) sits in `baseline` by research judgment.
- `P-02` names `lfpr-female-urban`, not ingested yet.
