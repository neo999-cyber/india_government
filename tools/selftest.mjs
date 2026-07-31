#!/usr/bin/env node
/**
 * Proves the build gate works. Three parts:
 *
 *   1. /data must validate.
 *   2. tests/fixtures/invalid — each named fixture must be rejected for its own stated
 *      reason, so a rule that stops discriminating is caught by name rather than by a
 *      drop in the total error count.
 *   3. tests/fixtures/broken — every error rule must fire at least once.
 *   4. Schema strictness must be live: a misspelled keyword has to fail compilation
 *      rather than being silently ignored.
 *
 * Run with `npm run validate:selftest`.
 */
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import { AJV_OPTIONS } from './lib/schema.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const VALIDATOR = join(ROOT, 'tools', 'validate.mjs');

/**
 * One fixture, one reason. `expect` substrings must all appear in the errors reported
 * against that file; `conditional` marks the cases that depend on JSON Schema if/then
 * actually being applied, where a silent no-op would let the record through.
 */
const INVALID_FIXTURES = [
  {
    file: 'ledger/failed-without-case-against.json',
    why: 'scored assessment with caseAgainst missing',
    conditional: true,
    expect: ['missing required property "caseAgainst"', 'must match "then" schema'],
  },
  {
    file: 'ledger/baseline-scored-as-worked.json',
    why: 'baseline term carrying a scored assessment',
    conditional: true,
    expect: ['/assessment must be equal to constant', 'must match "then" schema'],
  },
  {
    file: 'series/point-missing-status.json',
    why: 'observation with no measurement status',
    conditional: false,
    expect: ['/points/1 missing required property "status"'],
  },
];

/** Rules the broken fixtures must trigger, each as an error. */
const MUST_FIRE = [
  'schema:series',
  'schema:ledger',
  'ref-resolves',
  'calendar-discipline',
  'point-unique',
  'id-unique',
  't5-dispute-link',
  'panel-vintage',
  'regime-group',
  'baseline-context',
  'date-order',
  'back-link',
  'ref-relevant',
  // Character sweep: schema validation cannot see any of these.
  'charset-script',
  'charset-invisible',
  'charset-url',
  'charset-symbol',
  'charset-homoglyph',
];

/**
 * Rules needing their own fixture root because they contradict one in `broken`:
 * a regime group cannot be both incomplete and gapped at the same time.
 *
 * The two P-22 rules are here for a different reason. Both fire only where part of the
 * thing they guard is present — a half pair, a caveated record — so they cannot be seeded
 * into `broken` without also firing on every other fixture root that happens to omit the
 * welfare data. Each gets a root carrying exactly the half it needs.
 */
const ISOLATED = [
  { dir: 'regime-gap', rule: 'regime-handoff' },
  { dir: 'pair-half', rule: 'pair-incomplete' },
  { dir: 'caveat-orphan', rule: 'caveat-target' },
];

/** @returns {{ code: number, report: any }} */
function run(args) {
  try {
    const stdout = execFileSync(process.execPath, [VALIDATOR, '--json', ...args], {
      encoding: 'utf8',
      env: { ...process.env, NO_COLOR: '1' },
    });
    return { code: 0, report: JSON.parse(stdout) };
  } catch (err) {
    if (err.stdout) return { code: err.status ?? 1, report: JSON.parse(err.stdout) };
    throw err;
  }
}

const failures = [];
const notes = [];

// 1. The real repository must validate.
const good = run([]);
if (good.code !== 0 || !good.report.ok) {
  const errs = good.report.findings.filter((f) => f.level === 'error');
  failures.push(`/data did not validate (exit ${good.code}): ${JSON.stringify(errs, null, 2)}`);
}

// 2. Each invalid fixture must be rejected for its own reason.
const invalid = run(['--data', join(ROOT, 'tests', 'fixtures', 'invalid')]);
if (invalid.code === 0 || invalid.report.ok) {
  failures.push('tests/fixtures/invalid validated clean — the gate is not closed');
}
for (const fixture of INVALID_FIXTURES) {
  const errs = invalid.report.findings.filter(
    (f) => f.level === 'error' && f.file.endsWith(fixture.file),
  );
  if (errs.length === 0) {
    failures.push(
      `${fixture.file} was NOT rejected (${fixture.why})` +
        (fixture.conditional
          ? ' — this fixture depends on if/then being applied, so check the Ajv dialect and options'
          : ''),
    );
    continue;
  }
  const joined = errs.map((e) => e.message).join(' | ');
  for (const needle of fixture.expect) {
    if (!joined.includes(needle)) {
      failures.push(`${fixture.file} rejected, but not for "${needle}" — got: ${joined}`);
    }
  }
  notes.push(`  rejected ${fixture.file} — ${fixture.why}`);
}

// 3. Every seeded violation in the broken fixtures must be caught.
const broken = run(['--data', join(ROOT, 'tests', 'fixtures', 'broken')]);
if (broken.code === 0 || broken.report.ok) {
  failures.push('tests/fixtures/broken validated clean — the gate is not closed');
}
const firedRules = new Set(
  broken.report.findings.filter((f) => f.level === 'error').map((f) => f.rule),
);
for (const rule of MUST_FIRE) {
  if (!firedRules.has(rule)) failures.push(`rule "${rule}" did not fire as an error on the broken fixtures`);
}

// 3b. Rules that need a fixture root to themselves.
for (const { dir, rule } of ISOLATED) {
  const result = run(['--data', join(ROOT, 'tests', 'fixtures', dir)]);
  const fired = result.report.findings.some((f) => f.level === 'error' && f.rule === rule);
  if (!fired) failures.push(`rule "${rule}" did not fire as an error on tests/fixtures/${dir}`);
  else notes.push(`  ${rule} fires on tests/fixtures/${dir}`);
}

// 4. Strictness must be live: a misspelled keyword cannot be silently ignored.
// Under a lax config this schema compiles and lets the invalid record through.
const typoSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: { term: { type: 'string' }, assessment: { type: 'string' } },
  allOf: [
    {
      if: { properties: { term: { const: 'baseline' } } },
      than: { properties: { assessment: { const: 'baseline-context' } } },
    },
  ],
};
let typoThrew = false;
try {
  new Ajv2020({ ...AJV_OPTIONS }).compile(typoSchema);
} catch {
  typoThrew = true;
}
if (!typoThrew) {
  failures.push(
    'a misspelled schema keyword ("than" for "then") compiled without error — strict mode is off, so a typo in a conditional would silently pass every record it was meant to catch',
  );
}

// 5. --strict must promote warnings on the real repository.
const strict = run(['--strict']);
const realWarnings = good.report.findings.filter((f) => f.level === 'warn').length;
if (realWarnings > 0 && strict.code === 0) failures.push('--strict left warnings unpromoted');

if (failures.length) {
  console.error('selftest FAILED');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `selftest OK — /data valid (${realWarnings} warning(s))\n` +
    notes.join('\n') +
    `\n  ${MUST_FIRE.length}/${MUST_FIRE.length} rules fire on tests/fixtures/broken ` +
    `(${broken.report.findings.filter((f) => f.level === 'error').length} errors caught)` +
    `\n  misspelled schema keyword fails compilation`,
);
