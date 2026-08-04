#!/usr/bin/env node
/**
 * Enum-stamp check: a generated fixture must record the enums it was generated from, and they must
 * still be the live ones.
 *
 * WHY IT IS ITS OWN TOOL RATHER THAN A BLOCK INSIDE THE SELFTEST. The check has to be RUN TWICE to
 * prove it does not repair its own subject, and a check that lives inside the selftest can only be
 * run twice by running the selftest inside itself. Extracting it makes the idempotence control a
 * plain subprocess pair.
 *
 * IT IMPORTS FROM `lib/lens-fixtures.mjs`, NEVER FROM `regen-lens-fixtures.mjs`. That is the
 * structural rule this file exists to obey: a checker must not import from its own repair path.
 * The first version of the stamp check imported `liveEnums` from the runner, whose module body
 * calls `build()` — so importing it REGENERATED the fixtures, healing exactly the drift the stamp
 * detects, and reported green. It was caught because the runner printed a line, not because
 * anything asserted on it. The library defines and the runner acts, and only the library is
 * importable by a checker.
 *
 * Usage:
 *   node tools/enum-stamp.mjs
 *   node tools/enum-stamp.mjs --fixtures a,b
 */
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { liveEnums } from './lib/lens-fixtures.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const i = argv.indexOf('--fixtures');
const FIXTURES = i === -1 ? ['lens-coverage-empty', 'lens-coverage-no-page'] : argv[i + 1].split(',');

const live = liveEnums();
const failures = [];
const ok = [];

for (const dir of FIXTURES) {
  const stampPath = join(ROOT, 'tests', 'fixtures', dir, 'GENERATED-FROM.json');
  if (!existsSync(stampPath)) {
    failures.push(`${dir}: no GENERATED-FROM.json — it cannot be shown to match the live enums`);
    continue;
  }
  let stamp;
  try {
    stamp = JSON.parse(readFileSync(stampPath, 'utf8'));
  } catch (e) {
    failures.push(`${dir}: GENERATED-FROM.json is unreadable (${e.message})`);
    continue;
  }
  const drift = ['domains', 'lenses'].filter((k) => JSON.stringify(stamp[k]) !== JSON.stringify(live[k]));
  if (drift.length) {
    failures.push(
      `${dir}: generated from a stale ${drift.join(' and ')} enum — stamped lenses ` +
        `[${(stamp.lenses ?? []).join(', ')}] against live [${live.lenses.join(', ')}]. ` +
        `A fixture built from a stale enum tests the wrong branch and still exits 1`,
    );
  } else {
    ok.push(dir);
  }
}

if (failures.length) {
  console.error(`enum-stamp FAILED — ${failures.length} fixture(s) generated from a stale enum`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error('\n  Run `npm run regen:lens-fixtures` in the same commit as the enum change.');
  console.error('  THIS TOOL DOES NOT REGENERATE. A check that repaired its own subject would pass on');
  console.error('  the second run and report the corpus healthy, which is the defect it exists to find.');
  process.exit(1);
}

console.log(`enum-stamp OK — ${ok.length} fixture(s) match the live enums (${live.lenses.length} lenses, ${live.domains.length} domains)`);
