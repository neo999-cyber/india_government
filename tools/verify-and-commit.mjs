#!/usr/bin/env node
/**
 * One entry point that verifies and then commits — and cannot be talked out of the order.
 *
 * WHY THIS EXISTS. CLAUDE.md has said since correction cycle 9 that record edits and their
 * verification are ONE operation. The rule was then broken by its own author four cycles later: a
 * `;` where an `&&` belonged let `git commit` run after the build had printed INVALID, and the
 * corpus was pushed in a state the gate had already refused. Vercel refused it too — that
 * deployment sits in the history at state ERROR.
 *
 * A rule that is right and keeps not being followed is a mechanism problem, not a discipline
 * problem. The shell offers `;` and `&&` as equally easy keystrokes and gives no sign which was
 * meant. So the ordering moves out of the shell: this script runs the gates and reaches `git
 * commit` only on green, and there is no argument that skips the gates.
 *
 * The commit message comes from a FILE, not from argv. Multi-line messages through shell quoting
 * are how backticks got command-substituted out of a log entry earlier in this same sweep.
 *
 * Usage:
 *   node tools/verify-and-commit.mjs --message-file /path/to/msg.txt [--push] [--fast]
 *   npm run commit -- --message-file /tmp/msg.txt --push
 *
 * --fast skips `next build`, which also skips reachability and domain-coverage. Use it only for
 * changes that cannot affect rendering; the default is the full gate the deploy runs.
 */
import { execFileSync, execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const val = (f) => {
  const i = argv.indexOf(f);
  return i === -1 ? null : argv[i + 1];
};

const msgFile = val('--message-file');
if (!msgFile || !existsSync(msgFile)) {
  console.error('verify-and-commit: --message-file <path> is required and must exist');
  process.exit(2);
}
const message = readFileSync(msgFile, 'utf8').trim();
if (message.length < 20) {
  console.error('verify-and-commit: refusing a commit message under 20 characters');
  process.exit(2);
}

/** Every gate that must be green. Order is cheapest-first so a failure reports fast. */
const GATES = has('--fast')
  ? [['typecheck'], ['validate'], ['no-bare-root'], ['figure-consistency'], ['validate:selftest']]
  : [['typecheck'], ['build'], ['validate:selftest']];

/**
 * Show the FAILURE, not the tail.
 *
 * The first version printed the last 25 lines, which on a validator run are warnings — so the
 * refusal message displayed everything except the reason for it. A gate whose failure output hides
 * the failure is half a gate.
 */
const salient = (out) => {
  const lines = out.trim().split('\n');
  const hits = lines.filter((l) => /\berror\b|INVALID|FAILED|REFUSING/i.test(l));
  return (hits.length ? hits.slice(0, 15) : lines.slice(-15)).join('\n');
};

const run = (script) => {
  try {
    const out = execFileSync('npm', ['run', script], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { ok: true, out };
  } catch (e) {
    return { ok: false, out: `${e.stdout ?? ''}${e.stderr ?? ''}` };
  }
};

console.log(`verify-and-commit: ${GATES.length} gate(s)${has('--fast') ? ' (FAST — no next build, no reachability, no domain-coverage)' : ''}`);
for (const [script] of GATES) {
  process.stdout.write(`  ${script} … `);
  const r = run(script);
  if (!r.ok) {
    console.log('FAILED');
    console.error(`\nverify-and-commit: REFUSING TO COMMIT — \`npm run ${script}\` failed.\n`);
    console.error(salient(r.out));
    console.error('\nNothing was committed. Fix the corpus, do not relax the gate.');
    process.exit(1);
  }
  // Belt and braces: a gate that exits 0 while printing INVALID would otherwise pass silently.
  if (/\bINVALID\b|\bFAILED\b/.test(r.out)) {
    console.log('FAILED (exit 0 but output says INVALID/FAILED)');
    console.error(`\nverify-and-commit: REFUSING TO COMMIT — \`npm run ${script}\` exited 0 but reported failure.\n`);
    console.error(salient(r.out));
    process.exit(1);
  }
  console.log('ok');
}

const staged = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf8' }).trim();
if (!staged) {
  console.error('verify-and-commit: nothing to commit');
  process.exit(2);
}

execFileSync('git', ['add', '-A'], { cwd: ROOT, stdio: 'inherit' });
execFileSync('git', ['commit', '-q', '-F', msgFile], { cwd: ROOT, stdio: 'inherit' });
const sha = execSync('git rev-parse --short HEAD', { cwd: ROOT, encoding: 'utf8' }).trim();
console.log(`committed ${sha}`);

if (has('--push')) {
  execFileSync('git', ['push', '-q', 'origin', 'HEAD'], { cwd: ROOT, stdio: 'inherit' });
  console.log('pushed');
}
