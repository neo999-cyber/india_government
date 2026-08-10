#!/usr/bin/env node
/**
 * EVALUABILITY WORDING — the forbidden phrasings do not reach a built page.
 *
 * WHY THIS EXISTS. The evaluability view (phase 18 §4c) shows, per subject area, the share of THIS
 * CORPUS'S records that reached a verdict on an outcome. **The denominator is the corpus's own
 * selection and selection bias is permanently open** — nobody has established which government
 * claims were never entered, and no quantity of further research makes the sample a known one. So
 * the view may state a property of these records and may not state a property of Indian policy,
 * and the difference between those two claims lives entirely in the label.
 *
 * A LABEL CARRYING A RULING NEEDS THE SAME PROTECTION AS ANY OTHER RULE THIS CORPUS ENFORCES. That
 * is the whole argument for this file. Everything else in §4c — the position, the denominator, the
 * ρ framing — is visible in a diff. The wording is one line that a well-meaning edit improves into
 * a claim nobody authorised.
 *
 * ---------------------------------------------------------------------------------------------
 * WHAT THIS GATE BINDS, AND — MORE IMPORTANTLY — WHAT IT CANNOT
 *
 * IT BINDS: the LITERAL forbidden strings, normalised, against the text of every built page.
 *
 * IT CANNOT BIND THE CLAIM, AND THIS IS NOT A GAP TO BE CLOSED LATER — IT IS UNCLOSEABLE BY ANY
 * LEXICAL CHECK. A rewrite asserting a property of Indian policy in words that appear on no list
 * passes this gate completely. "How much of the country's policy can be assessed", "the measurable
 * share of Indian governance", "what India lets itself be judged on" — every one of them breaks
 * the ruling and none of them is findable. **This is the prose-shadow class CLAUDE.md already
 * names**: the defect is semantic, the guard is lexical, and the axes most at risk are exactly the
 * ones a mechanical check cannot reach.
 *
 * So the rule lives in three places that must agree, and only one of them is enforceable:
 *   1. the heading and the limit paragraph in `components/Evaluability.tsx`;
 *   2. §4c of `drops/phase-18-design-lock/DESIGN-SCOPE.md`, which carries the ruling in full;
 *   3. this gate, which catches only a literal relapse.
 *
 * A green run here means **no listed phrase was rendered**. It does not mean the view says what it
 * is allowed to say. That reading is owed to a human, every time the label changes.
 *
 * IT ALSO DOES NOT BIND `drops/` OR `docs/`. The scope document and the verification log MUST quote
 * the forbidden wording verbatim — that is the operator's instruction and the corpus's correction
 * convention — so a gate scanning them would fire on the two files most responsible for preserving
 * the rule. Built output only, which is where a reader meets a claim.
 *
 * Usage:
 *   node tools/evaluability-wording.mjs             # summary
 *   node tools/evaluability-wording.mjs --verbose   # per-phrase counts even when clean
 *   node tools/evaluability-wording.mjs --control   # prove it fires
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertFresh } from './lib/freshness.mjs';
import { norm, pageTextFromHtml } from './lib/page-text.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const OUT = join(ROOT, 'out');
const VERBOSE = argv.includes('--verbose');
const CONTROL = argv.includes('--control');

/**
 * The forbidden phrasings, verbatim from the operator's ruling of 2026-08-10.
 *
 * Matched after `norm`, so curly quotes, dash variants and collapsed whitespace cannot smuggle one
 * past — the four false failures that produced `page-text.mjs` were every one of them a needle and
 * a page normalised differently.
 */
const FORBIDDEN = [
  'how much is measurable',
  'some parts of Indian policy can be measured',
  // The generalisations the two above are instances of. Still literal, still incomplete — see the
  // header: the claim itself is not reachable by any list.
  'how much of Indian policy is measurable',
  'how much of Indian policy can be measured',
  // From the overview design mocks of 2026-08-10, verbatim — the same claim wearing a headline.
  // Both assert what INDIA counted from a record set whose selection is unknown; the permitted
  // form is about the record's holdings. These are the likely relapse vector because they are
  // punchier than the honest wording, which is exactly why they are pinned here.
  'What India counted, and what it didn\'t',
  'how much of it India actually counted',
];

/** The heading that carries the ruling. Its ABSENCE is as much a defect as a forbidden phrase. */
const REQUIRED = 'Where outcome evaluation was possible - in these records';

if (!existsSync(OUT)) {
  console.error(`evaluability-wording: no build at ${OUT} — run \`npm run build\` first (exit 2)`);
  process.exit(2);
}

/**
 * NEGATIVE CONTROL, through the same normaliser the live pass uses.
 *
 * A synthetic page carrying a forbidden phrase must be caught; the permitted heading must not be.
 * The second half matters as much as the first: a check that flagged the permitted wording would
 * make the rule unfollowable, which is the failure mode CLAUDE.md warns about when a guard fires on
 * right answers.
 */
if (CONTROL) {
  const bad = pageTextFromHtml('<p>This shows how much is measurable across the country.</p>');
  const good = pageTextFromHtml(`<h2>${REQUIRED}</h2><p>A fact about these records.</p>`);
  const hits = (t) => FORBIDDEN.filter((f) => t.includes(norm(f)));
  const onBad = hits(bad);
  const onGood = hits(good);
  const requiredFound = good.includes(norm(REQUIRED));
  if (onBad.length !== 1 || onGood.length !== 0 || !requiredFound) {
    console.error(
      'evaluability-wording --control FAILED — the checker does not discriminate.\n' +
        `  forbidden page matched: [${onBad}] (expected exactly one)\n` +
        `  permitted page matched: [${onGood}] (expected none)\n` +
        `  permitted heading found: ${requiredFound} (expected true)`,
    );
    process.exit(1);
  }
  console.log(
    'evaluability-wording --control — a page saying "how much is measurable" is caught, the ' +
      'permitted heading passes and is recognised; the discriminator is the phrase, not the topic',
  );
  process.exit(0);
}

assertFresh('evaluability-wording', OUT, ['data', 'app', 'components', 'lib'].map((d) => join(ROOT, d)));

const pages = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === '_next') continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.isFile() && e.name === 'index.html') pages.push(full);
  }
})(OUT);

const found = [];
let carrying = 0;
for (const file of pages) {
  const route = '/' + file.slice(OUT.length + 1).replace(/index\.html$/, '');
  const text = pageTextFromHtml(readFileSync(file, 'utf8'));
  if (text.includes(norm(REQUIRED))) carrying += 1;
  for (const f of FORBIDDEN) if (text.includes(norm(f))) found.push({ route, phrase: f });
}

if (found.length) {
  console.error(
    `evaluability-wording FAILED — ${found.length} forbidden phrasing(s) reached a built page:\n`,
  );
  for (const f of found) console.error(`  ${f.route}  "${f.phrase}"`);
  console.error(
    '\n  The evaluability view may state a property of THESE RECORDS and may not state a property\n' +
      '  of Indian policy. The denominator is this corpus\'s own selection and selection bias is\n' +
      '  permanently open. Permitted: "Where outcome evaluation was possible — in these records".',
  );
  process.exit(1);
}

if (carrying === 0) {
  console.error(
    'evaluability-wording FAILED — the permitted heading appears on no built page.\n' +
      `  Expected: "${REQUIRED}"\n\n` +
      '  This gate asserts a PRESENCE as well as an absence, because a view that quietly loses its\n' +
      '  own ruling is the defect, not the fix. If the view was removed deliberately, remove this\n' +
      '  assertion in the same commit and say why.',
  );
  process.exit(1);
}

if (VERBOSE) {
  console.log(`\n  ${FORBIDDEN.length} forbidden phrasings checked against ${pages.length} pages`);
  for (const f of FORBIDDEN) console.log(`    0  "${f}"`);
  console.log('');
}

console.log(
  `evaluability-wording OK — ${FORBIDDEN.length} forbidden phrasings absent from ${pages.length} ` +
    `built pages; the permitted heading carries the ruling on ${carrying} page(s). ` +
    'LEXICAL ONLY: this cannot bind the claim, only the listed words.',
);
