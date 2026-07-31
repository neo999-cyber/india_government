/**
 * Character sweep over every string in a record.
 *
 * Schema validation cannot see this: `"type": "string"` is perfectly happy with a Cyrillic
 * word sitting in an English summary, a zero-width space inside a figure, or a homoglyph
 * domain in a source URL. This pass reads every string and flags anything outside a small
 * deliberate allowlist. It is also where CLAUDE.md rule 9 (English only) becomes mechanical.
 *
 * @typedef {{ level: 'error'|'warn', rule: string, where: string, message: string }} CharFinding
 */

/** Typography the instrument uses on purpose. */
const PROSE_ALLOW = '₹—–‘’“”±×°';

/**
 * SI notation. Extends the prose allowlist because `°` already admits this class, and the
 * PM2.5 series carries the correct unit string `µg/m³` — mangling it to `ug/m3` to please a
 * linter would be the wrong trade. Note `µ` here is U+00B5 MICRO SIGN, the character that
 * belongs in a unit; U+03BC GREEK SMALL LETTER MU is visually identical and is rejected
 * below, so the two cannot drift apart in the data.
 */
const SCIENTIFIC = 'µ²³';

const ALLOW = {
  prose: new Set([...PROSE_ALLOW, ...SCIENTIFIC]),
  unit: new Set([...PROSE_ALLOW, ...SCIENTIFIC]),
  url: new Set(), // ASCII only: a homoglyph domain is indistinguishable by eye
};

/**
 * Invisible and format characters. Never legitimate here, and the whole point of them is
 * that review by eye cannot catch them.
 */
const INVISIBLE = new Map([
  [' ', 'no-break space'],
  ['­', 'soft hyphen'],
  ['​', 'zero-width space'],
  ['‌', 'zero-width non-joiner'],
  ['‍', 'zero-width joiner'],
  ['‎', 'left-to-right mark'],
  ['‏', 'right-to-left mark'],
  ['‪', 'left-to-right embedding'],
  ['‫', 'right-to-left embedding'],
  ['‬', 'pop directional formatting'],
  ['‭', 'left-to-right override'],
  ['‮', 'right-to-left override'],
  ['⁠', 'word joiner'],
  ['﻿', 'zero-width no-break space'],
]);

/** Scripts named explicitly in findings; anything else reports as "non-Latin". */
const SCRIPTS = [
  ['Cyrillic', /\p{Script=Cyrillic}/u],
  ['Greek', /\p{Script=Greek}/u],
  ['Devanagari', /\p{Script=Devanagari}/u],
  ['Bengali', /\p{Script=Bengali}/u],
  ['Tamil', /\p{Script=Tamil}/u],
  ['Arabic', /\p{Script=Arabic}/u],
  ['Han', /\p{Script=Han}/u],
  ['Hebrew', /\p{Script=Hebrew}/u],
];

const isLetter = (ch) => /\p{L}/u.test(ch);
const isLatin = (ch) => /\p{Script=Latin}/u.test(ch);
const codePoint = (ch) => `U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`;

/** Which allowlist governs a field, decided by leaf key so new prose fields are swept too. */
function classOf(key) {
  if (key === 'url') return 'url';
  if (key === 'unit') return 'unit';
  return 'prose';
}

/** A short excerpt around the first occurrence, so the string can be found by eye. */
function excerpt(value, ch) {
  const at = value.indexOf(ch);
  const start = Math.max(0, at - 28);
  const end = Math.min(value.length, at + 28);
  return `${start > 0 ? '…' : ''}${value.slice(start, end).replace(/\s+/g, ' ')}${end < value.length ? '…' : ''}`;
}

/**
 * @param {string} value
 * @param {string} path dotted field path, e.g. `summary` or `sources[0].name`
 * @param {'prose'|'unit'|'url'} cls
 * @returns {CharFinding[]}
 */
function sweepString(value, path, cls) {
  /** @type {CharFinding[]} */
  const out = [];
  const allowed = ALLOW[cls];
  /** @type {Map<string, number>} one finding per distinct character, with a count */
  const offenders = new Map();

  for (const ch of value) {
    if (ch.codePointAt(0) < 128) continue;
    if (allowed.has(ch)) continue;
    offenders.set(ch, (offenders.get(ch) ?? 0) + 1);
  }

  /**
   * Non-Latin letters are reported as whole runs, not character by character: a stray
   * Cyrillic word is one problem, and listing its eight letters separately buries it.
   */
  for (const [script, re] of SCRIPTS) {
    // Not in URLs: there the homoglyph-domain warning is the one that matters.
    if (cls === 'url') break;
    const present = [...offenders.keys()].filter((ch) => ch !== 'μ' && isLetter(ch) && re.test(ch));
    if (present.length === 0) continue;
    for (const ch of present) offenders.delete(ch);
    const runs = [...value.matchAll(new RegExp(`\\p{Script=${script}}+`, 'gu'))]
      .map((m) => m[0])
      .filter((run) => run !== 'μ');
    out.push({
      level: 'error',
      rule: 'charset-script',
      where: path,
      message:
        `${script} text in English prose (CLAUDE.md rule 9): ` +
        runs.map((r) => `"${r}" (${[...r].map(codePoint).join(' ')})`).join(', ') +
        ` — in "${excerpt(value, runs[0][0])}"`,
    });
  }

  for (const [ch, count] of offenders) {
    const times = count > 1 ? ` ×${count}` : '';
    const at = `${path}${times}`;
    const context = ` — in "${excerpt(value, ch)}"`;

    const invisible = INVISIBLE.get(ch);
    if (invisible) {
      out.push({
        level: 'error',
        rule: 'charset-invisible',
        where: at,
        message: `invisible character ${codePoint(ch)} (${invisible})${context}`,
      });
      continue;
    }

    if (cls === 'url') {
      out.push({
        level: 'error',
        rule: 'charset-url',
        where: at,
        message: `non-ASCII ${codePoint(ch)} in a URL — a lookalike domain cannot be told from the real one by eye${context}`,
      });
      continue;
    }

    if (ch === 'μ') {
      out.push({
        level: 'error',
        rule: 'charset-homoglyph',
        where: at,
        message: `U+03BC GREEK SMALL LETTER MU is visually identical to U+00B5 MICRO SIGN — use U+00B5 in units${context}`,
      });
      continue;
    }

    if (isLetter(ch)) {
      if (isLatin(ch)) {
        out.push({
          level: 'warn',
          rule: 'charset-diacritic',
          where: at,
          message: `Latin letter outside ASCII: ${codePoint(ch)} "${ch}" — fine for a proper name, otherwise normalise${context}`,
        });
      } else {
        // A script not named in SCRIPTS, so it was not grouped into runs above.
        out.push({
          level: 'error',
          rule: 'charset-script',
          where: at,
          message: `non-Latin character ${codePoint(ch)} "${ch}" in English prose (CLAUDE.md rule 9)${context}`,
        });
      }
      continue;
    }

    out.push({
      level: 'error',
      rule: 'charset-symbol',
      where: at,
      message: `character ${codePoint(ch)} "${ch}" is outside the allowlist (${[...PROSE_ALLOW].join(' ')} ${[...SCIENTIFIC].join(' ')})${context}`,
    });
  }

  return out;
}

/**
 * Sweep every string in a record.
 * @param {unknown} record
 * @returns {CharFinding[]}
 */
export function sweepRecord(record) {
  /** @type {CharFinding[]} */
  const findings = [];

  const walk = (node, path, key) => {
    if (typeof node === 'string') {
      findings.push(...sweepString(node, path || key || '(root)', classOf(key)));
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((item, i) => walk(item, `${path}[${i}]`, key));
      return;
    }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        walk(v, path ? `${path}.${k}` : k, k);
      }
    }
  };

  walk(record, '', '');
  return findings;
}
