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
 *   node tools/scan-text.mjs page.html "Official Creditor" --variants   # retry a zero before banking it
 *   node tools/scan-text.mjs --selftest                     # the Fengal control
 *
 * Flags: --variants (also scan plural/singular/hyphenation forms — ALWAYS do this before
 *          recording a zero as an absence; a boundary scan is a false-negative risk by design)
 *        --substring (opt out of word boundaries) · --whole (forbid trailing word chars)
 *        --case (case-sensitive) · --context N · --max N (contexts printed per term, default 3)
 *        --html / --raw (override the extension-based guess)
 */
import { readFileSync } from 'node:fs';
import { htmlToText, scanText, variants } from './lib/corpus-search.mjs';

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

  // The false-NEGATIVE half. The Fengal case above proves boundaries refuse a spurious hit; this
  // proves the retry recovers the genuine one they also refuse. A scanner with only the first
  // control is a scanner that is safe and silently lossy.
  const possessive = 'the Official Creditors\u2019 Committee (OCC) met';
  if (scanText(possessive, ['Official Creditor'])[0].count !== 0) {
    failures.push('"Official Creditor" matched a possessive plural without --variants; the boundary default is not applying');
  }
  const recovered = variants('Official Creditor').reduce((n, v) => n + scanText(possessive, [v])[0].count, 0);
  if (recovered !== 1) {
    failures.push(`--variants recovered ${recovered} hit(s) for "Official Creditor" against "Official Creditors\u2019", expected 1`);
  }

  // Punctuation. A boundary beside a non-word character is unsatisfiable, not strict, and the scan
  // reports an absence that could never have been a presence — the most dangerous shape a scanner
  // has, because a zero is exactly what an absence claim is built on.
  const punct = 'logistics costs down by up to 30% and time by 40%; see R&D annexe.';
  for (const [term, want] of [['%', 2], ['30%', 1], ['R&D', 1]]) {
    const got = scanText(punct, [term])[0].count;
    if (got !== want) failures.push(`"${term}" scored ${got} against a text containing it ${want} time(s); boundaries must not be applied beside punctuation`);
  }

  // `whole` must mean whole. Plain \b does not stop a term matching the first element of a
  // hyphenated compound, which is correct for the default and wrong for an exact-token search.
  const hyphen = 'duty-bearing obligations and duty free imports';
  if (scanText(hyphen, ['duty'])[0].count !== 2) {
    failures.push('default scan should find "duty" twice in "duty-bearing ... duty free"; \\b treats the hyphen as a boundary by design');
  }
  if (scanText(hyphen, ['duty'], { whole: true })[0].count !== 1) {
    failures.push('whole:true must refuse "duty-bearing" and keep "duty free"');
  }

  if (failures.length) {
    console.error('scan-text selftest FAILED');
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(
    'scan-text OK — 11 control(s): "Fengal" refused, substring opt-out proves the scanner fires, ' +
      'real term found, script stripped, possessive plural refused by boundaries, --variants recovers it, ' +
      'punctuation terms (%, 30%, R&D) found not zeroed, whole:true refuses a hyphenated compound',
  );
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
  const useVariants = flag('variants');
  for (const word of words) {
    const forms = useVariants ? variants(word) : [word];
    const results = scanText(text, forms, opts);
    const total = results.reduce((n, r) => n + r.count, 0);
    const base = results[0];

    console.log(`\n${word}: ${base.count}${useVariants && forms.length > 1 ? ` (${total} across ${forms.length} forms)` : ''}`);
    // The whole point of the flag: say loudly when the base term's zero was wrong. A line that
    // reads the same whether or not a variant rescued the term would leave the author to notice,
    // which is what failed the first time.
    if (useVariants && base.count === 0 && total > 0) {
      console.log('  !! BASE TERM SCORED ZERO BUT A VARIANT DID NOT — do not record this as an absence');
    }
    for (const r of results) {
      if (r.term !== word && r.count === 0) continue;
      if (r.term !== word) console.log(`  [${r.term}: ${r.count}]`);
      for (const h of r.hits.slice(0, max)) console.log(`  @${h.index}  …${h.context}…`);
      if (r.hits.length > max) console.log(`  (${r.hits.length - max} more)`);
    }
  }
}
