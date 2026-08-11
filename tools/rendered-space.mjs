#!/usr/bin/env node
/**
 * rendered-space — A SPACE LOST BETWEEN A RENDERED VALUE AND THE WORD AFTER IT.
 *
 * ============================ WHAT THIS BINDS, AND WHAT IT DOES NOT ===========================
 *
 * It binds ONE defect: a JSX expression whose following space is eaten by the compiler, so a number
 * renders welded to the next word — `2024is where`, `269series begin`. It does NOT read what a page
 * says, does not check that a field is present, and does not reach a space lost between two literal
 * words. **If the claim moved one level out — to a missing word rather than a missing space, or to a
 * value that is wrong rather than mis-spaced — this gate would not see it.**
 *
 * ============================ WHY IT EXISTS, WHICH IS A MEASUREMENT ===========================
 *
 * Written 2026-08-11 after two instances in one feature, both found by eye on a DOM probe and by
 * nothing else. **Every gate in this build was green over both.** `validate` reads `/data` and the
 * data was fine; `field-render-audit` asserts a field's value REACHES its page and both values did
 * reach it; `link-check` and `listing-marks` count structure. A welded word is valid data, correctly
 * rendered, in the wrong shape — the one class none of them is looking at.
 *
 * ============================ THE CAUSE, RECORDED SO IT IS NOT RE-DIAGNOSED ===================
 *
 * SWC trims whitespace at the START of a JSX text chunk that spans a newline. So this loses a space:
 *
 *     <p>{count} of {total} series begin
 *       there, because …</p>          →  "269series begin there"
 *
 * and this keeps it:
 *
 *     <p>{count} of {total}{' '}
 *       series begin there, because …</p>
 *
 * The trailing `{' '}` is the fix, and it is the fix every time. **Reflowing the line so the word
 * fits also works and is not durable** — the next person to wrap the paragraph re-breaks it.
 *
 * ============================ THE DETECTOR, AND WHY IT IS NARROW =============================
 *
 * React marks each expression boundary with an SSR separator comment, so the seam is literally in
 * the bytes: `269<!-- -->series`. The gate fires only where a word character sits on BOTH sides of
 * a separator and the right side opens with two or more lowercase letters.
 *
 * That narrowness is deliberate and is what makes the gate usable. `269<!-- -->%` and
 * `2024<!-- -->–<!-- -->25` are correct and must not fire, and neither must an ORDINAL SUFFIX —
 * `{n}th` renders `12<!-- -->th` and wants no space. **The negative control caught that before the
 * corpus did**, which is the whole reason it runs first: the exemption is a closed list of four
 * suffixes after a digit, and `12thousand` still fires because the run is not one of them.
 *
 * **THE FALSE-POSITIVE RATE IS MEASURED, NOT ASSUMED: over 668 built pages the detector returned
 * exactly two hits and both were defects.** A gate is only worth adding at that rate; stating the
 * rate is what lets a later cycle tell a regression from a bad detector.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertFresh } from './lib/freshness.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const SEAM = /([A-Za-z0-9’]{2,})<!-- -->([a-z]{2,})/g;

/**
 * POSITIVE CONTROL, run before the corpus and through the same matcher the corpus goes through.
 * A gate reporting clean with no positive beside it has proved the needle absent, not the search
 * working — and this gate's whole value is in its zeros.
 */
function selfTest() {
  const scan = (s) => {
    SEAM.lastIndex = 0;
    return [...s.matchAll(SEAM)].filter((m) => !(/\d$/.test(m[1]) && /^(st|nd|rd|th)$/.test(m[2])));
  };
  // POSITIVE: the two real defects this gate was written for, in their rendered form.
  if (scan('x 2024<!-- -->is y').length !== 1) throw new Error('rendered-space: missed its positive control');
  if (scan('x 269<!-- -->series y').length !== 1) throw new Error('rendered-space: missed its positive control');
  // NEGATIVE, through the same filter the positive passes through: a percent sign, an ordinal, a
  // correctly spaced value, and a word run that merely BEGINS like an ordinal.
  if (scan('a 269<!-- -->% b 12<!-- -->th c fine<!-- --> spaced').length !== 0)
    throw new Error('rendered-space: fired on its negative control');
  if (scan('d 12<!-- -->thousand').length !== 1)
    throw new Error('rendered-space: ordinal exemption swallowed a real defect');
}

function pages(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) pages(p, acc);
    else if (e.endsWith('.html')) acc.push(p);
  }
  return acc;
}

selfTest();

// A GATE READING A STALE BUILD REPORTS CLEAN ON THE DEFECT IT WAS BUILT FOR. Same refusal every
// other output-reading gate makes, and for the same reason: exit 2 is "cannot answer", not "clean".
assertFresh('rendered-space', OUT, ['data', 'app', 'components', 'lib'].map((d) => join(ROOT, d)));

const files = pages(OUT);

const hits = [];
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  SEAM.lastIndex = 0;
  for (const m of html.matchAll(SEAM)) {
    // An ordinal is not a lost space: `{n}th` is authored deliberately and renders correctly.
    if (/\d$/.test(m[1]) && /^(st|nd|rd|th)$/.test(m[2])) continue;
    hits.push({ route: f.replace(/^out/, '').replace(/index\.html$/, ''), joined: `${m[1]}${m[2]}`, want: `${m[1]} ${m[2]}` });
  }
}

if (hits.length) {
  console.error(`rendered-space FAILED — ${hits.length} place(s) render a value welded to the word after it.`);
  for (const h of hits) console.error(`   ${h.route}  "${h.joined}"  should read  "${h.want}"`);
  console.error('   Fix: put {\' \'} after the expression, before the line break. Reflowing the line');
  console.error('   also works and does not survive the next re-wrap.');
  process.exit(1);
}

console.log(`rendered-space OK — ${files.length} built pages, no value welded to a following word.`);
