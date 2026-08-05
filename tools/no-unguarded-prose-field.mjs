#!/usr/bin/env node
/**
 * NO UNGUARDED PROSE FIELD — bind the guarded-marks list to the record types.
 *
 * WHY. `reachability` is ENUMERATION-SCOPED: it walks a list, so a field absent from that list is
 * unguarded BY CONSTRUCTION and nothing anywhere fails. Phase 15 found `assessmentNote` rendering
 * on 0 of the 164 ledger records carrying it and `revisitTrigger` on 0 of 62 — 226 marks written,
 * validated, shipped and invisible, with every gate green throughout. The list's SILENCE about a
 * field was doing the work of a decision, and nobody had made the decision.
 *
 * WHAT THIS ASSERTS. Every prose-carrying field on `LedgerRecord` and `ProvenanceRecord` is either
 *   (a) in the guarded-marks list for its layer, so `reachability` proves it reaches its own page; or
 *   (b) EXEMPTED BY NAME in its own schema description, with a stated reason.
 * There is no third state. A field nobody has thought about fails this gate.
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
 * `--marks-json` injects a substitute guarded list so the selftest can prove the gate FIRES when a
 * field is dropped from it. It is a seam, not a skip: it can only ever make the gate stricter or
 * differently-scoped, never quieter about the real list.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MARKS as REAL_MARKS } from './lib/guarded-marks.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const marksArg = argv.indexOf('--marks-json');
const MARKS = marksArg === -1
  ? REAL_MARKS
  : JSON.parse(readFileSync(argv[marksArg + 1], 'utf8'));

/** The layers whose record types this gate binds. */
const LAYERS = ['ledger', 'provenance'];

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
  const found = new Map();
  const walk = (props, top) => {
    for (const [k, v] of Object.entries(props || {})) {
      const key = top ?? k;
      if (v.type === 'string' && !v.enum && !v.format && !v.pattern) {
        if (!found.has(key)) found.set(key, s.properties[key]?.description ?? '');
      }
      if (v.type === 'array' && v.items?.type === 'object') walk(v.items.properties, key);
      if (v.type === 'object') walk(v.properties, key);
    }
  };
  walk(s.properties, null);
  return found;
}

const failures = [];
let guarded = 0;
let exempted = 0;

for (const layer of LAYERS) {
  const fields = proseTopLevelFields(layer);
  const guardedHere = new Set(MARKS.filter((m) => m.layers.includes(layer)).map((m) => m.field));
  for (const [field, description] of fields) {
    if (guardedHere.has(field)) { guarded += 1; continue; }
    if (description.includes(EXEMPT)) { exempted += 1; continue; }
    failures.push({ layer, field });
  }
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
  `no-unguarded-prose-field OK — ${guarded + exempted} prose field(s) across ${LAYERS.join(' + ')}: ` +
  `${guarded} guarded by reachability, ${exempted} exempted by name in the schema`,
);
