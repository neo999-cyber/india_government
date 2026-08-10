#!/usr/bin/env node
/**
 * THE DEPLOY RUNS THE BUILD — `vercel.json`'s build command is `npm run build`, and nothing else.
 *
 * ============================ WHAT THIS IS FOR, AND IT ALREADY HAPPENED =======================
 *
 * `vercel.json` carried its own copy of the gate chain:
 *
 *     "npm run validate && next build && npm run reachability && npm run domain-coverage"
 *
 * Four steps. `package.json`'s `build` had **twenty-two**. The practice, visible in the git log,
 * was to add each new gate to BOTH files — `reachability` and `domain-coverage` each landed in
 * `vercel.json` in the commit that created them — and the practice stopped. **Eighteen steps had
 * never once run against the deployed artefact**, among them `link-check`, `listing-marks`,
 * `field-render-audit`, `withdrawn-wording`, `enum-parity` and every gate written since.
 *
 * **AND NOTHING COULD REPORT IT, BECAUSE BOTH SIDES PASSED.** `npm run commit` runs the full chain
 * and goes green; Vercel runs its four and goes green; the deploy is a different artefact from the
 * one the gates cleared and every signal says fine. This is the *two places that must agree* shape
 * this corpus has now paid for at least three times — the ledger/series tier split, the domain axis
 * with three shapes, the drop that reverted a fix — and it is the worst instance so far, because
 * the thing that diverged was **the gate chain itself**.
 *
 * It surfaced only because a generated artefact was missing from the deploy: `/data/v1/` 404'd
 * while every page around it rendered. **A missing FILE was visible; eighteen missing GATES were
 * not.**
 *
 * ============================ WHY THE FIX IS ONE CHAIN, NOT SEVENTEEN ADDITIONS ================
 *
 * Adding the eighteen to `vercel.json` restores parity today and re-arms exactly the same trap for
 * the nineteenth gate. `vercel.json` now calls `npm run build`, so there is one chain and no
 * second copy to forget. **A rule that is right and keeps not being followed is a mechanism
 * problem** — the same reasoning that produced `verify-and-commit`.
 *
 * ============================ WHAT THIS GATE BINDS, AND WHAT IT CANNOT ========================
 *
 * IT BINDS: that `vercel.json` invokes `npm run build`, and that it does not instead enumerate
 * steps. That is the whole defect and it is exactly checkable.
 *
 * IT CANNOT BIND what Vercel actually executes. A build command set in the Vercel dashboard
 * overrides the file, and no gate in this repository can see the dashboard. If the deployed site
 * ever lacks something the local build produces, **check that first** — this gate proves the file
 * is right, not that the file is obeyed.
 *
 * Usage:
 *   node tools/deploy-chain.mjs            # summary
 *   node tools/deploy-chain.mjs --control  # prove it fires on the configuration it was built for
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTROL = process.argv.slice(2).includes('--control');

const steps = (cmd) =>
  String(cmd)
    .split('&&')
    .map((s) => s.trim().replace(/^npm run /, ''))
    .filter(Boolean);

/** The command is acceptable iff it delegates to the one chain rather than restating it. */
const delegates = (cmd) => steps(cmd).length === 1 && steps(cmd)[0] === 'build';

/**
 * NEGATIVE CONTROL, against the exact string that was live.
 *
 * Not an invented bad value: the command below is what `vercel.json` carried at `4bcfcb3`, read
 * from the git history at the time this was written. A control built from a made-up string proves
 * the checker rejects made-up strings.
 */
if (CONTROL) {
  const wasLive = 'npm run validate && next build && npm run reachability && npm run domain-coverage';
  const good = 'npm run build';
  if (delegates(wasLive) || !delegates(good)) {
    console.error(
      'deploy-chain --control FAILED — the checker does not discriminate.\n' +
        `  the command that was live accepted: ${delegates(wasLive)} (expected false)\n` +
        `  "npm run build" accepted: ${delegates(good)} (expected true)`,
    );
    process.exit(1);
  }
  const lost = steps(
    JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).scripts.build,
  ).filter((s) => !steps(wasLive).includes(s));
  console.log(
    `deploy-chain --control — the four-step command that shipped is rejected and "npm run build" ` +
      `is accepted; against today's chain that command would skip ${lost.length} step(s)`,
  );
  process.exit(0);
}

const vercelPath = join(ROOT, 'vercel.json');
if (!existsSync(vercelPath)) {
  console.log('deploy-chain — no vercel.json; nothing to bind');
  process.exit(0);
}

const vercel = JSON.parse(readFileSync(vercelPath, 'utf8'));
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const cmd = vercel.buildCommand;

if (!cmd) {
  console.error(
    'deploy-chain FAILED — vercel.json sets no buildCommand, so the deploy runs the framework\n' +
      '  default (`next build`) and NONE of the gates. Set it to "npm run build".',
  );
  process.exit(1);
}

if (!delegates(cmd)) {
  const mine = steps(cmd);
  const full = steps(pkg.scripts.build);
  const missing = full.filter((s) => !mine.includes(s));
  console.error(
    'deploy-chain FAILED — vercel.json restates the build chain instead of calling it.\n\n' +
      `  vercel.json : ${cmd}\n` +
      `  package.json: ${full.length} step(s)\n\n` +
      (missing.length
        ? `  ${missing.length} step(s) would never run against the deployed artefact:\n` +
          missing.map((s) => `    · ${s}`).join('\n') +
          '\n\n'
        : '  It happens to list the same steps today, which is the trap: the next gate added to\n' +
          '  package.json will not be here, and both sides will still report green.\n\n') +
      '  Set "buildCommand": "npm run build". One chain, no second copy to forget.',
  );
  process.exit(1);
}

console.log(
  `deploy-chain OK — vercel.json delegates to npm run build; the deploy runs the same ` +
    `${steps(pkg.scripts.build).length}-step chain as the commit gate, not a copy of it`,
);
