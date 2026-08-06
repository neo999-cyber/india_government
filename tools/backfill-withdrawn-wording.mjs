#!/usr/bin/env node
/**
 * BACKFILL THE WITHDRAWN WORDING — the convention says a correction quotes what it withdrew, in the
 * same field. On 2026-08-06 that was true of 6 fields out of 30, while being described here as the
 * instrument's practice. This closes the gap from git rather than from memory.
 *
 * THE METHOD. For every field carrying a correction marker, walk the commit history of its own data
 * file backwards and take the last value that DIFFERS from the current one. Where that prior value
 * itself carries a correction marker the field was corrected twice, so the walk continues to the
 * first pre-correction value — otherwise the backfill would quote one correction inside another.
 *
 * THE EXCEPTION, and it is not a gap: the convention does not apply where the FIELD DID NOT EXIST
 * before the correction. L-0011's `assessmentNote` is the case — the record carried a failure
 * verdict with no stated reasoning and the correction created the note. Nothing was withdrawn, so
 * nothing is quoted, and the record says which of the two it is.
 *
 * ANCHORED STRING EDITS. The recovered sentence is appended to the existing field text and the
 * field's own JSON string is rewritten in place; no file is parsed and re-serialised.
 *
 * Usage:
 *   node tools/backfill-withdrawn-wording.mjs --dry
 *   node tools/backfill-withdrawn-wording.mjs --apply
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const APPLY = process.argv.includes('--apply');
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', cwd: ROOT, maxBuffer: 1 << 28 });

const MARK = /CORRECTED \d{4}-\d{2}-\d{2}|previously (?:read|said|stated|described)|has been corrected/i;
const QUOTED = /["“][^"”]{12,240}["”]/;
/** Fields whose absence before the correction is recorded rather than backfilled. */
const CREATED_NOT_CORRECTED = { 'L-0011.assessmentNote': true };

const files = [...readdirSync(join(ROOT, 'data/ledger')).map((f) => `data/ledger/${f}`), 'data/provenance.json'];

/** First substantive sentence of the withdrawn text, trimmed to something quotable. */
function excerpt(s) {
  const flat = s.replace(/\s+/g, ' ').trim();
  const m = /^(.{40,300}?[.;])\s/.exec(flat);
  return (m ? m[1] : flat.slice(0, 240)).replace(/\s*$/, '');
}

const plan = [];

for (const file of files) {
  const current = JSON.parse(readFileSync(join(ROOT, file), 'utf8'));
  const targets = [];
  for (const r of current)
    for (const [k, v] of Object.entries(r))
      if (typeof v === 'string' && MARK.test(v)) targets.push({ id: r.id, field: k, now: v });
  if (!targets.length) continue;

  const shas = git('log', '--format=%H', '--', file).trim().split('\n').filter(Boolean);
  const snaps = [];
  for (const sha of shas) {
    try {
      snaps.push({ sha, map: new Map(JSON.parse(git('show', `${sha}:${file}`)).map((r) => [r.id, r])) });
    } catch {
      /* a revision where the file did not parse as this shape is skipped, not guessed at */
    }
  }

  for (const t of targets) {
    const key = `${t.id}.${t.field}`;
    // THE EXCEPTION IS TESTED FIRST, and the order is load-bearing. L-0011's note already carries a
    // quoted span — it quotes the verdict vocabulary it is reasoning about — so a quote test run
    // first files it as compliant and the field never gets the sentence explaining that nothing was
    // withdrawn. A proxy for "quotes the withdrawn wording" cannot tell one quotation from another.
    if (CREATED_NOT_CORRECTED[key]) {
      plan.push({ ...t, file, state: 'exception' });
      continue;
    }
    if (QUOTED.test(t.now)) {
      plan.push({ ...t, file, state: 'already-quotes' });
      continue;
    }
    // Walk back to the first value that differs AND is itself pre-correction.
    let prior = null;
    let sha = null;
    for (const s of snaps) {
      const v = s.map.get(t.id)?.[t.field];
      if (v === undefined) break;
      if (v === t.now) continue;
      if (MARK.test(v)) continue; // a corrected version is not the withdrawn wording
      prior = v;
      sha = s.sha;
      break;
    }
    plan.push({ ...t, file, state: prior ? 'recovered' : 'unrecoverable', prior, sha });
  }
}

const by = (s) => plan.filter((p) => p.state === s);
console.log(
  `backfill plan — ${plan.length} correction-marked field(s): ` +
    `${by('already-quotes').length} already quote · ${by('recovered').length} recovered from git · ` +
    `${by('exception').length} exempted by name · ${by('unrecoverable').length} unrecoverable`,
);
for (const p of plan.filter((x) => x.state !== 'already-quotes'))
  console.log(`  ${p.state.padEnd(14)} ${p.id}.${p.field}${p.sha ? ` @${p.sha.slice(0, 7)}` : ''}`);

if (by('unrecoverable').length) {
  console.error('\nbackfill FAILED — a field is neither quoted, recoverable, nor exempted by name.');
  console.error('Every correction is one of the four. An unrecoverable field means the walk is wrong.');
  process.exit(1);
}
if (!APPLY) {
  console.log('\n--dry: nothing written.');
  process.exit(0);
}

/* ------------------------------------------------------------------ write, anchored */

let written = 0;
for (const file of [...new Set(plan.filter((p) => p.state !== 'already-quotes').map((p) => p.file))]) {
  let raw = readFileSync(join(ROOT, file), 'utf8');
  for (const p of plan.filter((x) => x.file === file && x.state !== 'already-quotes')) {
    const add =
      p.state === 'exception'
        ? ' THE WITHDRAWN WORDING IS NOT QUOTED HERE BECAUSE THERE IS NONE: this field did not exist ' +
          'before the correction, which created it rather than replacing anything. A correction of an ' +
          'absence says that it is one.'
        : ` WITHDRAWN WORDING, recovered from the repository history in the backfill of 2026-08-06 and quoted so the ` +
          `correction can be checked rather than taken on trust: "${excerpt(p.prior)}"`;
    const needle = JSON.stringify(p.now);
    const i = raw.indexOf(needle);
    if (i === -1) throw new Error(`backfill: could not locate ${p.id}.${p.field} in ${file}`);
    if (raw.indexOf(needle, i + 1) !== -1) throw new Error(`backfill: ${p.id}.${p.field} value is not unique in ${file}`);
    raw = raw.slice(0, i) + JSON.stringify(p.now + add) + raw.slice(i + needle.length);
    written += 1;
  }
  JSON.parse(raw);
  writeFileSync(join(ROOT, file), raw);
}
console.log(`\nAPPLIED — ${written} field(s) rewritten.`);
