#!/usr/bin/env node
/**
 * Scan a retrieved document for terms, through the corpus-search helper.
 *
 * WHY A RUNNER AND NOT A ONE-LINER. The rule is that the helper is the only sanctioned path for
 * any scan of retrieved text, and a rule that requires writing five lines of import boilerplate at
 * the moment of asking a question is a rule that gets skipped at the moment of asking a question.
 * This makes the sanctioned path the SHORTEST path.
 *
 * The counts it prints are what absence claims rest on, so the two things that could silently
 * corrupt them are printed too: the normalisation applied, and the character length scanned. A
 * count of zero over 400 characters of chrome is not the same finding as a count of zero over
 * 189,097 characters of a ministry's annual report, and the output must not let them look alike.
 *
 * Usage:
 *   node tools/scan-text.mjs <file> <term> [term...]        # --html inferred from the extension
 *   node tools/scan-text.mjs page.html 1643 fence fencing
 *   node tools/scan-text.mjs doc.txt tariff --substring     # explicit opt-out, visible in the log
 *   node tools/scan-text.mjs --selftest                     # the Fengal control
 *
 * Flags: --substring (opt out of word boundaries) · --whole (forbid trailing word chars)
 *        --case (case-sensitive) · --context N · --max N (contexts printed per term, default 3)
 *        --html / --raw (override the extension-based guess)
 */
import { readFileSync } from 'node:fs';
import { htmlToText, scanText } from './lib/corpus-search.mjs';

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const value = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? dflt : Number(argv[i + 1]);
};

/**
 * The control, kept next to the thing it controls.
 *
 * It asserts the SPECIFIC failure: `fenc` must not match inside "Fengal", and the same scan with
 * `substring: true` must match, because a control that only proved the boundary case would pass
 * just as well if the scanner matched nothing at all. Both halves, or neither proves anything.
 */
function selftest() {
  const failures = [];
  const html = '<p>Cyclone &lsquo;Fengal&rsquo; relief; fencing works approved.</p><script>var fence = 1;</script>';
  const text = htmlToText(html);

  const boundary = scanText(text, ['fenc'])[0];
  if (boundary.count !== 0) {
    failures.push(`word-boundary scan matched "fenc" ${boundary.count} time(s); "Fengal" must not match`);
  }
  const loose = scanText(text, ['fenc'], { substring: true })[0];
  if (loose.count !== 1) {
    failures.push(`substring opt-out found ${loose.count} hit(s) for "fenc", expected 1 — the control's positive half`);
  }
  const real = scanText(text, ['fencing'])[0];
  if (real.count !== 1) {
    failures.push(`"fencing" found ${real.count} time(s), expected 1 — a real term must still be found`);
  }
  if (/fence/i.test(text)) {
    failures.push('htmlToText left <script> contents in the scanned text; a scan would see code as prose');
  }

  if (failures.length) {
    console.error('scan-text selftest FAILED');
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log('scan-text OK — 4 control(s): "Fengal" refused, substring opt-out proves the scanner fires, real term found, script stripped');
}

if (flag('selftest')) {
  selftest();
} else {
  // Walk argv rather than filtering it: `--context 160` puts a bare number in the stream that is
  // NOT a search term, and a filter that only skips `--`-prefixed tokens would silently search for
  // "160". Terms are frequently numbers here — 1643 is one — so the number cannot be excluded by
  // shape, only by position.
  const TAKES_VALUE = new Set(['context', 'max']);
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a.startsWith('--')) {
      if (TAKES_VALUE.has(a.slice(2))) i += 1;
      continue;
    }
    positional.push(a);
  }
  const target = positional[0];
  const words = positional.slice(1);
  if (!target || !words.length) {
    console.error('usage: node tools/scan-text.mjs <file> <term> [term...]   |   --selftest');
    process.exit(2);
  }

  const raw = readFileSync(target, 'utf8');
  const isHtml = flag('html') || (!flag('raw') && /\.x?html?$/i.test(target));
  const text = isHtml ? htmlToText(raw) : raw;
  const opts = {
    substring: flag('substring'),
    whole: flag('whole'),
    caseSensitive: flag('case'),
    context: value('context', 160),
  };
  const max = value('max', 3);

  console.log(
    `${target} — ${isHtml ? 'html→text' : 'raw'}, ${raw.length.toLocaleString()} bytes in, ` +
      `${text.length.toLocaleString()} chars scanned, ` +
      `${opts.substring ? 'SUBSTRING (boundaries off)' : 'word boundaries'}${opts.whole ? ' +whole' : ''}` +
      `${opts.caseSensitive ? ', case-sensitive' : ''}`,
  );
  for (const { term, count, hits } of scanText(text, words, opts)) {
    console.log(`\n${term}: ${count}`);
    for (const h of hits.slice(0, max)) console.log(`  @${h.index}  …${h.context}…`);
    if (hits.length > max) console.log(`  (${hits.length - max} more)`);
  }
}
