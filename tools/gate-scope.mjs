#!/usr/bin/env node
/**
 * gate-scope — a gate's SCOPE is checked, not just its verdict.
 *
 * ============================ THE DEFECT THIS EXISTS FOR ======================================
 *
 * On 2026-08-13 a change to `listing-marks`' subject test took **rows checked from 4,167 to 3,041 —
 * 1,126 real listings silently dropped — and the gate reported OK.** The scope of the check moved by
 * 27% and the only reason it was caught is that the baseline had been written down by hand before
 * the edit and compared after. **That was luck about my own note-taking, not a property of the
 * system.**
 *
 * The same shape twice more the same day: `chart-ticks` reported *"0 grid lines across 0 charts"* as
 * a PASS because its matcher was broken, and `interface-invariants` reported clean while finding
 * nothing. Both were given a floor — *a zero here is never a pass* — but a floor only catches the
 * collapse to nothing. **A scope that halves still passes a floor.**
 *
 * ============================ WHAT IT DOES ====================================================
 *
 * Every figure below is a count of WHAT WAS EXAMINED, not what was found. They are recorded in
 * `docs/gate-scopes.json` and compared on every build. **Any movement fails**, and the fix is to
 * update the baseline in the SAME commit that moves it — which forces the number into a commit
 * message and a human decision.
 *
 * **A PATTERN THAT STOPS MATCHING IS ALSO A FAILURE.** If a gate's summary line is reworded, its
 * figure silently drops out of the ledger and the drift it was watching becomes invisible again —
 * the defect one level up. So a miss is an error, never a skip.
 *
 * ============================ WHAT IT DOES NOT DO =============================================
 *
 * **It does not watch findings, only scope.** `0 dead links` is a result and belongs to `link-check`;
 * `754 pages crawled` is scope and belongs here. Watching results would make every legitimate
 * correction fail the build.
 *
 * **It re-runs the gates it watches**, which costs a few seconds and buys independence: parsing a
 * log the build happened to leave behind would tie this to how the build was invoked.
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LEDGER = join(ROOT, 'docs', 'gate-scopes.json');
const UPDATE = process.argv.includes('--update');

/**
 * Each entry: the npm script to run, and the named scope figures to read out of its output.
 * **Only counts of what was EXAMINED.** Adding a gate here is how its scope becomes watched.
 */
const WATCHED = [
  { script: 'validate', figures: { recordsValidated: /over ([\d,]+) ledger/ } },
  { script: 'distinct-titles', figures: { recordsScanned: /OK — ([\d,]+) records across 3 layers/ } },
  { script: 'reachability', figures: { marksDeclared: /(?:\d+)\/([\d,]+) declared marks/, pagesScanned: /\(([\d,]+) pages scanned\)/ } },
  { script: 'listing-marks', figures: { listingRows: /OK — ([\d,]+) listing rows/, pagesScanned: /across ([\d,]+) built pages/, marksRequired: /([\d,]+) required marks/ } },
  { script: 'unrecognised-rows', figures: { pagesScanned: /across ([\d,]+) built pages/, citations: /([\d,]+) name a record by id/ } },
  { script: 'field-render-audit', figures: { proseFields: /OK — (\d+) prose/, nonProseFields: /prose \+ (\d+) non-prose/ } },
  { script: 'chart-ticks', figures: { gridLines: /OK — (\d+) grid line/, charts: /across (\d+) story chart/ } },
];

const num = (s) => Number(String(s).replace(/,/g, ''));

const observed = {};
const problems = [];

for (const { script, figures } of WATCHED) {
  let out = '';
  try {
    out = execSync(`npm run --silent ${script}`, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1 << 28 });
  } catch (e) {
    problems.push(`${script}: did not run cleanly — ${String(e.message).split('\n')[0]}`);
    continue;
  }
  observed[script] = {};
  for (const [name, re] of Object.entries(figures)) {
    const m = out.match(re);
    if (!m) {
      // NOT A SKIP. A figure that stops matching is a figure that stops being watched.
      problems.push(`${script}.${name}: its pattern no longer matches the gate's output. Either the summary line changed — update the pattern in the same commit — or the gate stopped emitting its scope.`);
      continue;
    }
    observed[script][name] = num(m[1]);
  }
}

if (problems.length) {
  console.error('gate-scope FAILED — a watched gate could not be read:');
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}

if (UPDATE || !existsSync(LEDGER)) {
  writeFileSync(LEDGER, JSON.stringify(observed, null, 2) + '\n');
  console.log(`gate-scope — baseline ${existsSync(LEDGER) ? 'updated' : 'written'} for ${Object.keys(observed).length} gate(s). Commit it with the change that moved it.`);
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(LEDGER, 'utf8'));
const drift = [];
for (const [script, figures] of Object.entries(observed)) {
  for (const [name, value] of Object.entries(figures)) {
    const was = baseline[script]?.[name];
    if (was === undefined) { drift.push(`${script}.${name}: new figure, not in the baseline (${value})`); continue; }
    if (was !== value) {
      const pct = was === 0 ? '' : ` (${(((value - was) / was) * 100).toFixed(1)}%)`;
      drift.push(`${script}.${name}: ${was} → ${value}${pct}`);
    }
  }
}
for (const script of Object.keys(baseline)) {
  if (!observed[script]) drift.push(`${script}: in the baseline and not watched any more`);
}

if (drift.length) {
  console.error(`gate-scope FAILED — ${drift.length} watched scope figure(s) moved:`);
  for (const d of drift) console.error('  ' + d);
  console.error('');
  console.error('  A gate can PASS while checking less than it did. That is how 1,126 listings stopped');
  console.error('  being checked on 2026-08-13 with every gate green.');
  console.error('  If the move is intended, run `npm run gate-scope -- --update` and commit the ledger');
  console.error('  WITH the change that moved it, so the number reaches a commit message.');
  process.exit(1);
}

const total = Object.values(observed).reduce((a, f) => a + Object.keys(f).length, 0);
console.log(`gate-scope OK — ${total} scope figure(s) across ${Object.keys(observed).length} gate(s) unchanged against docs/gate-scopes.json`);
