#!/usr/bin/env node
/**
 * deploy-poll — wait for a push to be live, on a needle PROVED absent first.
 *
 * ============================ WHY THIS IS A FILE AND NOT A ONE-LINER =========================
 *
 * **A hand-picked `grep` needle matched pre-existing prose twice**, in two different batches, and
 * both times the poll returned instantly, verification ran against the OLD build, and the report
 * said 0 of 20 rendering. Both needles were phrases that also appear in the record's own `notes` or
 * `caveat` — which render on the same page and were already live.
 *
 * **The failure is silent in the worst direction:** a needle that is already present makes the poll
 * succeed immediately, so the batch believes it is verifying the new deploy when it is verifying the
 * old one. Nothing errors.
 *
 * **THE FIX IS THE ONE THE VERIFICATION ITSELF HAS ALWAYS USED, and it is two things, not one:**
 *   1. the needle is the WHOLE new string, normalised through `tools/lib/page-text.mjs` — a whole
 *      finding cannot collide with a record's other prose and cannot be truncated by markup;
 *   2. **it is asserted ABSENT on the live page before the wait starts.** A needle already present
 *      is a broken poll, and this exits non-zero rather than reporting success.
 *
 * That second step is the negative control the corpus requires of every check, applied to the one
 * check that had none. It made both recurrences impossible rather than noticed.
 *
 * ============================ USAGE ===========================================================
 *
 *   node tools/deploy-poll.mjs <path> <needle-file>
 *
 * `path` is appended to the production origin. `needle-file` holds the exact new text. Exits 0 when
 * the needle appears, 1 if it was present at the start, 2 on timeout.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { norm, pageTextFromHtml } = await import(join(ROOT, 'tools/lib/page-text.mjs'));

const ORIGIN = 'https://india-government.vercel.app';
const [path, needleFile] = process.argv.slice(2);
if (!path || !needleFile) {
  console.error('usage: node tools/deploy-poll.mjs <path> <needle-file>');
  process.exit(2);
}
const needle = norm(readFileSync(needleFile, 'utf8').replace(/\s+/g, ' ').trim());
if (needle.length < 60) {
  console.error(`deploy-poll: needle is ${needle.length} chars. Use the whole new string — a short one collides.`);
  process.exit(2);
}

const live = async () => norm(pageTextFromHtml(await (await fetch(ORIGIN + path)).text()));

// THE NEGATIVE CONTROL, and the whole point of the file.
if ((await live()).includes(needle)) {
  console.error(`deploy-poll: needle ALREADY on ${path} before pushing. This poll would pass instantly `
    + `against the old build, which is the defect this tool exists to prevent. Pick a needle unique to the change.`);
  process.exit(1);
}

for (let i = 0; i < 90; i += 1) {
  if ((await live()).includes(needle)) {
    console.log(`deploy-poll — live after about ${i * 20}s; needle verified absent before the wait.`);
    process.exit(0);
  }
  await new Promise((r) => setTimeout(r, 20_000));
}
console.error('deploy-poll: timed out after 30 minutes.');
process.exit(2);
