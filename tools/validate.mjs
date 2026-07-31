#!/usr/bin/env node
/**
 * Validator CLI for the India Roadmap Instrument.
 *
 *   npm run validate            canonical /data only — this is the build gate
 *   npm run validate:incoming   canonical + /data/incoming drops (the merge gate)
 *   npm run validate:strict     warnings are treated as errors
 *
 * Flags: --incoming --strict --quiet --json --data <dir>
 *
 * Exit 0 = the repo may compile. Exit 1 = it may not (CLAUDE.md, data rule 1).
 */
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadData } from './lib/load.mjs';
import { compileSchemas, formatAjvError } from './lib/schema.mjs';
import { checkIntegrity } from './lib/integrity.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const includeIncoming = argv.includes('--incoming');
const strict = argv.includes('--strict');
const quiet = argv.includes('--quiet');
const asJson = argv.includes('--json');
// --data points the validator at an alternative data root (fixtures, or a staged merge).
const dataFlag = argv.indexOf('--data');
const dataDir = dataFlag !== -1 && argv[dataFlag + 1] ? argv[dataFlag + 1] : join(ROOT, 'data');

const C = process.stdout.isTTY && !process.env.NO_COLOR
  ? { red: '\x1b[31m', yellow: '\x1b[33m', green: '\x1b[32m', dim: '\x1b[2m', bold: '\x1b[1m', off: '\x1b[0m' }
  : { red: '', yellow: '', green: '', dim: '', bold: '', off: '' };

/** @type {import('./lib/integrity.mjs').Finding[]} */
const findings = [];
const add = (level, rule, file, where, message) => findings.push({ level, rule, file, where, message });

// 1. Load ------------------------------------------------------------------
const { records, errors: loadErrors, files, skipped } = loadData({ dataDir, includeIncoming });
for (const e of loadErrors) add('error', 'readable', e.file, '', e.message);

// 2. Schema ----------------------------------------------------------------
let validators;
try {
  ({ validators } = compileSchemas(join(ROOT, 'schemas')));
} catch (err) {
  console.error(`${C.red}schema compilation failed${C.off}: ${err.message}`);
  process.exit(1);
}

for (const r of records) {
  const validate = validators[r.layer];
  if (!validate) continue;
  if (validate(r.record)) continue;
  const where = r.record?.id ? String(r.record.id) : `record${r.index === null ? '' : ` [${r.index}]`}`;
  for (const err of validate.errors ?? []) {
    add('error', `schema:${r.layer}`, r.file, where, formatAjvError(err));
  }
}

// 3. Cross-reference + instrument rules ------------------------------------
const today = new Date().toISOString().slice(0, 10);
const { findings: integrityFindings, counts } = checkIntegrity(records, { today });
findings.push(...integrityFindings);

// 4. Report ----------------------------------------------------------------
const errorList = findings.filter((f) => f.level === 'error');
const warnList = findings.filter((f) => f.level === 'warn');
const failed = errorList.length > 0 || (strict && warnList.length > 0);

if (asJson) {
  console.log(JSON.stringify({ ok: !failed, counts, files, skipped, findings }, null, 2));
  process.exit(failed ? 1 : 0);
}

const group = (list) => {
  /** @type {Map<string, typeof list>} */
  const byFile = new Map();
  for (const f of list) {
    if (!byFile.has(f.file)) byFile.set(f.file, []);
    byFile.get(f.file).push(f);
  }
  return byFile;
};

const print = (list, level) => {
  const colour = level === 'error' ? C.red : C.yellow;
  const tag = level === 'error' ? 'error' : 'warn';
  for (const [file, items] of group(list)) {
    console.log(`\n${C.bold}${file}${C.off}`);
    for (const f of items) {
      const where = f.where ? ` ${C.dim}${f.where}${C.off}` : '';
      console.log(`  ${colour}${tag}${C.off} ${C.dim}[${f.rule}]${C.off}${where} ${f.message}`);
    }
  }
};

if (!quiet) {
  console.log(
    `${C.bold}validate${C.off} ${C.dim}·${C.off} ${files.length} file(s) ${C.dim}·${C.off} ` +
      `${counts.series} series (${counts.points} points), ${counts.ledger} ledger, ${counts.provenance} provenance, ${counts.pairs} pairs` +
      `${includeIncoming ? ` ${C.dim}· incoming included${C.off}` : ''}`,
  );
}

if (errorList.length) print(errorList, 'error');
if (warnList.length) print(warnList, 'warn');

console.log('');
if (failed) {
  const because = errorList.length
    ? `${errorList.length} error(s)`
    : `${warnList.length} warning(s) under --strict`;
  console.log(`${C.red}${C.bold}INVALID${C.off} — ${because}. Nothing merges or deploys until this is clean (CLAUDE.md data rule 1).`);
  process.exit(1);
}
console.log(
  `${C.green}${C.bold}VALID${C.off} — 0 errors, ${warnList.length} warning(s)` +
    (warnList.length ? ` ${C.dim}(open research items, not blockers)${C.off}` : ''),
);
process.exit(0);
