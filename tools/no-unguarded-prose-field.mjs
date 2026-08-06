#!/usr/bin/env node
/**
 * NO UNGUARDED FIELD — bind every field of a record type to a decision about how it reaches a reader.
 *
 * The name is historical and is kept because the log, the build script and four cycles of entries
 * cite it. Its scope is no longer prose alone.
 *
 * WHY. `reachability` is ENUMERATION-SCOPED: it walks a list, so a field absent from that list is
 * unguarded BY CONSTRUCTION and nothing anywhere fails. Phase 15 found `assessmentNote` rendering
 * on 0 of the 164 ledger records carrying it and `revisitTrigger` on 0 of 62 — 226 marks written,
 * validated, shipped and invisible, with every gate green throughout. The list's SILENCE about a
 * field was doing the work of a decision, and nobody had made the decision.
 *
 * WHAT THIS ASSERTS, IN TWO HALVES.
 *
 * PROSE, on `LedgerRecord` and `ProvenanceRecord` — either
 *   (a) in the guarded-marks list for its layer, so `reachability` proves it reaches its own page; or
 *   (b) EXEMPTED BY NAME in its own schema description, with a stated reason.
 *
 * NON-PROSE, on all three layers — either
 *   (a) declared in `tools/lib/value-renderings.mjs`, saying what the value looks like once
 *       rendered, so `field-render-audit` can observe it; or
 *   (b) EXEMPTED BY NAME in its own schema description, with a stated reason.
 *
 * There is no third state in either half. A field nobody has thought about fails this gate.
 *
 * THE NON-PROSE HALF WAS ADDED 2026-08-06 AND IT CLOSED THE LARGEST REMAINING HOLE. Both render
 * gates filtered on `!enum && !format && !pattern`, so every verdict, tier, stated reason, boolean
 * and formatted number was outside every render assertion BY CONSTRUCTION — not by oversight.
 * `disputeKind` is the proven instance: schema-REQUIRED whenever `reasonDisputed` is true, correct
 * on all 19 entries, read by no view for its whole life. On the run that first turned this half on,
 * the corpus produced 75 more invisible record-fields and 2 fields nobody had decided about at all.
 *
 * The exemption is deliberately expensive to write and impossible to write by accident: it must
 * appear in the SCHEMA, which is the contract research sessions author against, and it must name
 * the field. That satisfies CLAUDE.md's "any gate asserting a property of a field cites the schema".
 *
 * WHY EXEMPTION IS LEGITIMATE AT ALL. A guarded mark is one a competing VIEW could delegate away.
 * A record's own body copy — its title, its summary — has no competing view; it is the page. Those
 * are covered observationally instead, by `tools/field-render-audit.mjs`, which reads built output
 * and asserts every prose field reaches its own record's page. The two gates are different in kind
 * and that is the point: this one fires at authoring time and needs no build; the audit needs a
 * build and catches a field that is nominally guarded but suppressed anyway.
 *
 * THE FIELDS ARE DERIVED FROM THE SCHEMA, NEVER LISTED HERE. A hand-list in this file would have
 * exactly the defect the file exists to prevent — it would go stale the first time someone added a
 * field, and its silence would look like approval.
 *
 * Usage:
 *   node tools/no-unguarded-prose-field.mjs
 *   node tools/no-unguarded-prose-field.mjs --marks-json <path>   # test seam, see below
 *
 * `--marks-json` and `--renderings-json` inject substitute lists so the selftest can prove the gate
 * FIRES when a field is dropped from either. They are seams, not skips: each can only ever make the
 * gate stricter or differently-scoped, never quieter about the real lists.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MARKS as REAL_MARKS } from './lib/guarded-marks.mjs';
import { leafFields, isProse, topLevelOf } from './lib/schema-fields.mjs';
import { RENDERINGS, EXEMPT_NON_PROSE } from './lib/value-renderings.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const marksArg = argv.indexOf('--marks-json');
const MARKS = marksArg === -1
  ? REAL_MARKS
  : JSON.parse(readFileSync(argv[marksArg + 1], 'utf8'));

/**
 * The same seam for the non-prose half: a substitute list of DECLARED KEYS, so the selftest can
 * prove the gate fires when a declaration is dropped. It injects keys only, never renderings —
 * this gate never asks what a value looks like, only whether somebody decided.
 */
const rendArg = argv.indexOf('--renderings-json');
const DECLARED_KEYS = rendArg === -1
  ? new Set(Object.keys(RENDERINGS))
  : new Set(JSON.parse(readFileSync(argv[rendArg + 1], 'utf8')));

/** The layers whose PROSE this gate binds to the guarded-marks list. */
const LAYERS = ['ledger', 'provenance'];

/** The layers whose NON-PROSE it binds to a rendering declaration. Series is in scope here and not
 *  above because `reachability`'s marks list covers records that carry a competing view; a series
 *  value has no competing view but is just as capable of reaching no reader. */
const VALUE_LAYERS = ['ledger', 'provenance', 'series'];

/** The token a schema description must carry to exempt a field, followed by a reason. */
const EXEMPT = 'NOT A GUARDED MARK:';

/**
 * Prose fields, DERIVED: a string with no enum, no format and no pattern is free text.
 * Nested paths collapse to their top-level field, because the guarded list is keyed that way —
 * `unmeasured` guards `unmeasured[].what`, and splitting them would demand an exemption for a
 * field the list already covers.
 */
function proseTopLevelFields(schemaName) {
  const s = JSON.parse(readFileSync(join(ROOT, 'schemas', `${schemaName}.schema.json`), 'utf8'));
  const props = s.items?.properties ?? s.properties;
  const found = new Map();
  for (const f of leafFields(schemaName)) {
    if (!isProse(f.def)) continue;
    const key = topLevelOf(f.path);
    if (!found.has(key)) found.set(key, props[key]?.description ?? '');
  }
  return found;
}

const failures = [];
const valueFailures = [];
let guarded = 0;
let exempted = 0;
let declared = 0;
let valueExempted = 0;

for (const layer of LAYERS) {
  const fields = proseTopLevelFields(layer);
  const guardedHere = new Set(MARKS.filter((m) => m.layers.includes(layer)).map((m) => m.field));
  for (const [field, description] of fields) {
    if (guardedHere.has(field)) { guarded += 1; continue; }
    if (description.includes(EXEMPT)) { exempted += 1; continue; }
    failures.push({ layer, field });
  }
}

// The non-prose half. Keyed on the FULL path, not the top-level field: `sources[].tier` and
// `sources[].url` render in completely different ways and collapsing them to `sources` would let
// one decision stand in for two.
for (const layer of VALUE_LAYERS) {
  for (const f of leafFields(layer)) {
    if (isProse(f.def)) continue;
    const key = `${layer}.${f.path}`;
    if (DECLARED_KEYS.has(key)) { declared += 1; continue; }
    if ((f.def.description ?? '').includes(EXEMPT_NON_PROSE)) { valueExempted += 1; continue; }
    valueFailures.push(key);
  }
}

if (valueFailures.length) {
  console.error(
    `no-unguarded-prose-field FAILED — ${valueFailures.length} non-prose field(s) with no decision:\n`,
  );
  for (const k of valueFailures) console.error(`  ${k}`);
  console.error(
    '\n  Each must be EITHER declared in tools/lib/value-renderings.mjs, saying what its value' +
    '\n  looks like on the page, OR carry' +
    `\n  "${EXEMPT_NON_PROSE} <reason>" in its own description in schemas/<layer>.schema.json.` +
    '\n\n  There is no third state. A non-prose field with no declaration is outside every render' +
    '\n  assertion by construction — which is how disputeKind reached no reader on any of its 19' +
    '\n  entries while being schema-required and correct in the data throughout.',
  );
  process.exit(1);
}

if (failures.length) {
  console.error(`no-unguarded-prose-field FAILED — ${failures.length} prose field(s) neither guarded nor exempted:\n`);
  for (const f of failures) {
    console.error(`  ${f.layer}.${f.field}`);
  }
  console.error(
    `\n  Each must be EITHER in tools/lib/guarded-marks.mjs for the "${failures[0].layer}" layer,` +
    `\n  OR carry "${EXEMPT} <reason>" in its own description in schemas/<layer>.schema.json.` +
    '\n\n  There is no third state. `reachability` walks a list, so a field missing from it is' +
    '\n  unguarded by construction — which is how 226 marks shipped invisible with every gate green.',
  );
  process.exit(1);
}

console.log(
  `no-unguarded-prose-field OK — ${guarded + exempted} prose field(s) across ${LAYERS.join(' + ')} ` +
  `(${guarded} guarded by reachability, ${exempted} exempted by name) · ` +
  `${declared + valueExempted} non-prose field(s) across ${VALUE_LAYERS.join(' + ')} ` +
  `(${declared} with a declared rendering, ${valueExempted} exempted by name)`,
);
