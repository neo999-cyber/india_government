#!/usr/bin/env node
/**
 * Proves the build gate works: the validator must accept /data and must reject
 * every rule violation in tools/fixtures/broken. Run with `npm run validate:selftest`.
 */
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const VALIDATOR = join(ROOT, 'tools', 'validate.mjs');

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
  'paired-series',
  'baseline-context',
  'date-order',
  'back-link',
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

// 1. The real repository must validate.
const good = run([]);
if (good.code !== 0 || !good.report.ok) {
  failures.push(`/data did not validate (exit ${good.code}): ${JSON.stringify(good.report.findings.filter((f) => f.level === 'error'), null, 2)}`);
}

// 2. Every seeded violation must be caught, and the run must exit non-zero.
const bad = run(['--data', join(ROOT, 'tools', 'fixtures', 'broken')]);
if (bad.code === 0 || bad.report.ok) failures.push('broken fixtures validated clean — the gate is not closed');
const firedRules = new Set(bad.report.findings.filter((f) => f.level === 'error').map((f) => f.rule));
for (const rule of MUST_FIRE) {
  if (!firedRules.has(rule)) failures.push(`rule "${rule}" did not fire as an error on the broken fixtures`);
}

// 3. --strict must promote warnings on the real repository.
const strict = run(['--strict']);
const realWarnings = good.report.findings.filter((f) => f.level === 'warn').length;
if (realWarnings > 0 && strict.code === 0) failures.push('--strict left warnings unpromoted');

if (failures.length) {
  console.error('selftest FAILED');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `selftest OK — /data valid (${realWarnings} warning(s)); ` +
    `${MUST_FIRE.length}/${MUST_FIRE.length} rules fire on broken fixtures ` +
    `(${bad.report.findings.filter((f) => f.level === 'error').length} errors caught)`,
);
