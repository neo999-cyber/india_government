#!/usr/bin/env node
/**
 * css-vars — every `var(--x)` names a custom property something actually declares.
 *
 * ============================ THE DEFECT THIS EXISTS FOR ======================================
 *
 * **`--mono` was never a token.** The real name is `--font-mono`, and ELEVEN rules asked for
 * `var(--mono)` — every one of them a system label the design system says must be monospace, every
 * one silently falling back to the inherited humanist sans, for as long as they had existed. Nothing
 * failed. Nothing looked broken enough to investigate. It surfaced only because an operator asked
 * why one label's type did not match another's.
 *
 * **A TWELFTH SURVIVED THE HAND SWEEP THAT FIXED THE ELEVEN**, and it is the reason this is a gate
 * and not a one-off correction: `.yr-rail a { font-family: var(--mono, monospace) }`. The fallback
 * made it invisible to a search for the broken pattern AND invisible on the page — it rendered in a
 * monospace, just not the site's. A fallback does not make an undeclared property correct; it makes
 * it quiet.
 *
 * ============================ WHAT IT BINDS ==================================================
 *
 * **SCOPE: every `var(--x)` in every stylesheet under `app/` and `components/`.** A name counts as
 * declared if any of these declares it:
 *   · a `--x:` declaration in any of those stylesheets;
 *   · a `variable:` entry in a `next/font` call — those are injected onto an element at runtime and
 *     never appear in the CSS;
 *   · an inline style in a `.tsx` file, in either spelling React accepts — `'--x':` and
 *     `['--x' as string]:`. **Both spellings are read, because the codebase uses both** and reading
 *     one would have reported `--scrub-t` and `--w` as phantoms when `OverviewBoard` sets them.
 *
 * **WHAT IT CANNOT SEE, and the honest statement of it:** a property set by a stylesheet this scan
 * does not read, or written through `element.style.setProperty` with a computed name. Neither
 * occurs today; if either starts, this gate reports a false phantom rather than missing a real one,
 * which is the safe direction.
 *
 * **IT SAYS NOTHING ABOUT UNUSED DECLARATIONS.** A token declared and never referenced is dead
 * weight, not a rendering defect, and folding the two together would make this gate's failure mean
 * two different things.
 *
 * NEGATIVE CONTROL: a fixture using `var(--nope)` must be rejected, INCLUDING when it carries a
 * fallback — that is the case the hand sweep missed. POSITIVE CONTROL beside it: a fixture using
 * only declared names, and one using a name declared solely by an inline style, must both pass.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const verbose = process.argv.includes('--verbose');

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
};

const files = ['app', 'components'].flatMap((d) => walk(join(ROOT, d)));
const cssFiles = files.filter((f) => f.endsWith('.css'));
const tsxFiles = files.filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'));

/** Names declared as `--x:` in a stylesheet. */
const declared = new Map();
for (const f of cssFiles) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/(--[a-zA-Z0-9_-]+)\s*:/g))
    if (!declared.has(m[1])) declared.set(m[1], f.slice(ROOT.length + 1));
}

/** Names injected by next/font, and names set from an inline style in either spelling. */
for (const f of tsxFiles) {
  const src = readFileSync(f, 'utf8');
  const where = f.slice(ROOT.length + 1);
  for (const m of src.matchAll(/variable:\s*['"](--[a-zA-Z0-9_-]+)['"]/g))
    if (!declared.has(m[1])) declared.set(m[1], where + ' (next/font)');
  // `'--x':` and `['--x' as string]:` — the codebase uses both.
  for (const m of src.matchAll(/\[?\s*['"](--[a-zA-Z0-9_-]+)['"](?:\s+as\s+string)?\s*\]?\s*:/g))
    if (!declared.has(m[1])) declared.set(m[1], where + ' (inline style)');
}

/** Every use, with the line it is on so a failure names somewhere to go. */
const uses = [];
for (const f of cssFiles) {
  /**
   * COMMENTS ARE BLANKED, NOT SKIPPED BY LINE, and the difference is not academic: this stylesheet
   * QUOTES `var(--mono)` inside a block comment as a withdrawn value, per the correction
   * convention. A line-start test misses that — the quote sits on a continuation line beginning
   * with neither `/*` nor `*` — and the gate reported the corpus's own record of the defect as an
   * instance of it. Blanking the comment body while keeping its newlines preserves line numbers,
   * so a real failure still names somewhere to go.
   */
  const src = readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, (m) =>
    m.replace(/[^\n]/g, ' '),
  );
  src.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)\s*(,)?/g))
      uses.push({ name: m[1], file: f.slice(ROOT.length + 1), line: i + 1, fallback: !!m[2] });
  });
}

function phantoms(declaredSet, useList) {
  return useList.filter((u) => !declaredSet.has(u.name));
}

if (process.argv.includes('--control')) {
  const d = new Map([['--ink', 'x.css'], ['--w', 'y.tsx (inline style)']]);
  const bare = [{ name: '--nope', file: 'f', line: 1, fallback: false }];
  const withFallback = [{ name: '--nope', file: 'f', line: 1, fallback: true }];
  const clean = [{ name: '--ink', file: 'f', line: 1, fallback: false }];
  const inlineOnly = [{ name: '--w', file: 'f', line: 1, fallback: false }];

  if (!phantoms(d, bare).length) throw new Error('control FAILED: a bare undeclared var was not caught');
  // THE CASE THE HAND SWEEP MISSED. A fallback hides the defect on the page; it must not hide it here.
  if (!phantoms(d, withFallback).length)
    throw new Error('control FAILED: an undeclared var WITH A FALLBACK was not caught — the twelfth --mono');
  if (phantoms(d, clean).length) throw new Error('control FAILED: a declared name was reported as a phantom');
  if (phantoms(d, inlineOnly).length)
    throw new Error('control FAILED: a name declared only by an inline style was reported as a phantom');

  console.log(
    'css-vars --control — an undeclared property is caught bare AND behind a fallback, which is the case a hand sweep missed; a declared name passes, and so does one declared only by a TSX inline style',
  );
  process.exit(0);
}

if (!cssFiles.length) {
  console.error('css-vars: found no stylesheets under app/ or components/. A zero here is a broken scan.');
  process.exit(2);
}

const bad = phantoms(declared, uses);
if (bad.length) {
  const byName = new Map();
  for (const b of bad) (byName.get(b.name) ?? byName.set(b.name, []).get(b.name)).push(b);
  console.error(`css-vars FAILED — ${bad.length} use(s) of ${byName.size} custom propert(y/ies) nothing declares:`);
  for (const [name, list] of byName) {
    console.error(`  ${name} — ${list.length} use(s), ${list.filter((l) => l.fallback).length} behind a fallback`);
    for (const l of list) console.error(`      ${l.file}:${l.line}`);
  }
  console.error('');
  console.error('  A fallback does not make this correct. `var(--mono, monospace)` rendered in a');
  console.error('  monospace — just not the site\'s — for as long as it existed.');
  console.error('  Declare the property, or use the name that is declared.');
  process.exit(1);
}

console.log(
  `css-vars OK — ${uses.length} var() use(s) across ${cssFiles.length} stylesheet(s) all name a declared property ` +
    `(${declared.size} declared: CSS, next/font and TSX inline styles)` +
    (verbose
      ? `\n  scope: every var(--x) under app/ and components/; cannot see setProperty with a computed name`
      : ''),
);
