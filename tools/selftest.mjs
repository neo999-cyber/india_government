#!/usr/bin/env node
/**
 * Proves the build gate works. Three parts:
 *
 *   1. /data must validate.
 *   2. tests/fixtures/invalid — each named fixture must be rejected for its own stated
 *      reason, so a rule that stops discriminating is caught by name rather than by a
 *      drop in the total error count.
 *   3. tests/fixtures/broken — every error rule must fire at least once.
 *   4. Schema strictness must be live: a misspelled keyword has to fail compilation
 *      rather than being silently ignored.
 *
 * Run with `npm run validate:selftest`.
 */
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import { AJV_OPTIONS } from './lib/schema.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const VALIDATOR = join(ROOT, 'tools', 'validate.mjs');

/**
 * One fixture, one reason. `expect` substrings must all appear in the errors reported
 * against that file; `conditional` marks the cases that depend on JSON Schema if/then
 * actually being applied, where a silent no-op would let the record through.
 */
const INVALID_FIXTURES = [
  {
    file: 'ledger/failed-without-case-against.json',
    why: 'scored assessment with caseAgainst missing',
    conditional: true,
    expect: ['missing required property "caseAgainst"', 'must match "then" schema'],
  },
  {
    file: 'ledger/baseline-scored-as-worked.json',
    why: 'baseline term carrying a scored assessment',
    conditional: true,
    expect: ['/assessment must be equal to constant', 'must match "then" schema'],
  },
  {
    file: 'series/point-missing-status.json',
    why: 'observation with no measurement status',
    conditional: false,
    expect: ['/points/1 missing required property "status"'],
  },
  // The subject-value-in-lenses case is caught by the enum, not by a rule, so in `broken` it
  // lands under `schema:series` alongside a dozen unrelated violations and proves nothing about
  // itself: that root asserts which RULES fired, and schema:series fires either way. It is here
  // as well because `invalid` is the root that pins a rejection to its own reason, and this is
  // the half of the lens axis that has no rule of its own to go dead quietly.
  {
    file: 'series/subject-in-lenses.json',
    why: 'a subject value asserted in lenses[], which the lens enum does not admit',
    conditional: false,
    expect: ['/lenses/0', 'must be equal to one of the allowed values'],
  },
];

/** Rules the broken fixtures must trigger, each as an error. */
const MUST_FIRE = [
  'schema:series',
  'schema:ledger',
  'ref-resolves',
  'calendar-discipline',
  'point-unique',
  'id-unique',
  't5-dispute-link',
  'panel-vintage',
  'regime-group',
  'baseline-context',
  'date-order',
  'back-link',
  'ref-relevant',
  // From 2026-08-02 every reference field declares its target layer's id pattern, so ajv
  // rejects both of these too — but a pattern-mismatch message does not tell an author
  // whether they pointed at the wrong layer or fat-fingered an id. These name the difference.
  'ref-layer',
  'ref-malformed',
  // Character sweep: schema validation cannot see any of these.
  'charset-script',
  'charset-invisible',
  'charset-url',
  'charset-symbol',
  'charset-homoglyph',
  // The lens axis, added 2026-08-03. Two names for two mistakes: a lens value standing in for a
  // subject, and a value asserted on both axes of one record. Folded into one rule the message
  // could not tell an author which they had made — and only one of the two is unconditional.
  'lens-as-subject',
  'lens-duplicated',
  // The objective axis, added 2026-08-03. Four of the eight assessment values are defined against
  // "the objective stated at announcement"; nothing checked that the record had one, and fourteen
  // records took a scored value with nothing claimed to score against.
  'objective-required',
];

/**
 * Rules needing their own fixture root because they contradict one in `broken`:
 * a regime group cannot be both incomplete and gapped at the same time.
 *
 * The two P-22 rules are here for a different reason. Both fire only where part of the
 * thing they guard is present — a half pair, a caveated record — so they cannot be seeded
 * into `broken` without also firing on every other fixture root that happens to omit the
 * welfare data. Each gets a root carrying exactly the half it needs.
 */
const ISOLATED = [
  { dir: 'regime-gap', rule: 'regime-handoff' },
  { dir: 'caveat-orphan', rule: 'caveat-target' },
  { dir: 'mirror-contradiction', rule: 'mirror-contradiction' },
  // One fixture root, four branches of pair-side, told apart by `expect`. Without it a
  // fixture passes on any pair-side error — including one from a branch it is not testing —
  // and a branch could stop firing unnoticed.
  { dir: 'pairs-malformed', rule: 'pair-side', expect: 'is not in /data' },
  { dir: 'pairs-malformed', rule: 'pair-side', expect: 'Exactly one must be set' },
  { dir: 'pairs-malformed', rule: 'pair-side', expect: 'which declares 1 (valid 0-0)' },
  { dir: 'pairs-malformed', rule: 'pair-side', expect: 'carries no competingAccounts' },
  { dir: 'pair-inverted', rule: 'pair-inverted', expect: 'the wrong way round' },
  { dir: 'reason-kind-missing', rule: 'reason-kind' },
  { dir: 'absence-dispute-bare', rule: 'absence-dispute', expect: 'must not be asserted bare' },
  { dir: 'denominator-unstated', rule: 'denominator-stated', expect: 'renders 1 rate value(s)' },
  // unmeasured-route became severity-derived on 2026-08-02: an error where reasonKind
  // entails a route, a warning where it does not. Both branches are pinned — the error
  // half here, the warning half in MUST_STAY_CLEAN — so a later flattening of the
  // severity back to a uniform warn fails loudly instead of quietly reopening the gap.
  { dir: 'unmeasured-route-producible', rule: 'unmeasured-route', expect: 'not-published means producible under compulsion' },
  { dir: 'unmeasured-route-producible', rule: 'unmeasured-route', expect: 'withheld requires an identifiable refusal' },
  // The pairs half of the lens axis. `broken` carries no pairs, so the entries above prove only
  // that the shared helper fires — they say nothing about whether the pairs loop ever calls it,
  // and a call site that was never added is exactly the kind of omission that passes. This root
  // is otherwise well formed so the two lens errors are the only ones the pair layer can raise.
  { dir: 'lens-axis-pairs', rule: 'lens-as-subject', expect: 'files no subject at all' },
  { dir: 'lens-axis-pairs', rule: 'lens-duplicated', expect: 'a lens over itself' },
];

/**
 * The other half of a rule: what it must NOT reject.
 *
 * Every fixture above proves a rule fires. None of them can catch a rule that fires too
 * much, and an over-firing gate is the kind that gets loosened in a hurry by whoever is
 * blocked by it. `back-link` accepts a series linked to a dispute only through the break
 * that dispute caused; this pins that, so tightening it later fails loudly here instead of
 * quietly forcing research to record the same link twice.
 */
const MUST_STAY_CLEAN = [
  { dir: 'backlink-via-break', rule: 'back-link', why: 'a break satisfies the backlink' },
  // The other half of objective-required, and the half that decides whether the rule is usable.
  // Eight live records take their objective from a statute, a court direction or a process's own
  // object rather than from a launch claim. A rule demanding claimAtLaunch alone would fire on
  // every one of them and force a rescore on records that are correct — an over-firing gate, which
  // is the kind that gets loosened in a hurry by whoever it blocks.
  { dir: 'objective-from-statute', rule: 'objective-required', why: 'an objective named in assessmentNote is a declaration, not an inference' },
  // The other half of denominator-stated. A rate whose every point is pending renders no
  // figure, so there is nothing to mislabel — and firing there would push toward inventing a
  // base for a number that is not shown. Withholding is the correct response to being caught
  // by the rule, and this pins that so a later tightening fails loudly here.
  { dir: 'denominator-withheld', rule: 'denominator-stated', why: 'a withheld rate renders no figure to mislabel' },
  // The warning half of unmeasured-route. not-collected and never-defined do not assert the
  // data exists, so no route is entailed and demanding one invites a placeholder — which is
  // worse than none, because it enters the verification queue and cannot be worked.
  { dir: 'unmeasured-route-uncollectable', rule: 'unmeasured-route', why: 'neither value asserts the data exists, so no route is entailed' },
];

/** @returns {{ code: number, report: any }} */
function run(args) {
  try {
    const stdout = execFileSync(process.execPath, [VALIDATOR, '--json', ...args], {
      encoding: 'utf8',
      env: { ...process.env, NO_COLOR: '1' },
    });
    return { code: 0, report: JSON.parse(stdout) };
  } catch (err) {
    if (err.stdout) return { code: err.status ?? 1, report: JSON.parse(err.stdout) };
    throw err;
  }
}

/**
 * The gates that read BUILT OUTPUT rather than /data, each proven to fire on its own fixtures.
 *
 * Named here so they have a count of their own. Neither can be a validator rule — `npm run build`
 * runs validate before next build, so `out/` does not exist yet — and neither has ever been in the
 * "N/N rules fire" figure, which has therefore always undercounted what the selftest proves.
 */
const OUTPUT_GATES = ['reachability', 'domain-coverage'];

const failures = [];
const notes = [];

// 1. The real repository must validate.
const good = run([]);
if (good.code !== 0 || !good.report.ok) {
  const errs = good.report.findings.filter((f) => f.level === 'error');
  failures.push(`/data did not validate (exit ${good.code}): ${JSON.stringify(errs, null, 2)}`);
}

// 2. Each invalid fixture must be rejected for its own reason.
const invalid = run(['--data', join(ROOT, 'tests', 'fixtures', 'invalid')]);
if (invalid.code === 0 || invalid.report.ok) {
  failures.push('tests/fixtures/invalid validated clean — the gate is not closed');
}
for (const fixture of INVALID_FIXTURES) {
  const errs = invalid.report.findings.filter(
    (f) => f.level === 'error' && f.file.endsWith(fixture.file),
  );
  if (errs.length === 0) {
    failures.push(
      `${fixture.file} was NOT rejected (${fixture.why})` +
        (fixture.conditional
          ? ' — this fixture depends on if/then being applied, so check the Ajv dialect and options'
          : ''),
    );
    continue;
  }
  const joined = errs.map((e) => e.message).join(' | ');
  for (const needle of fixture.expect) {
    if (!joined.includes(needle)) {
      failures.push(`${fixture.file} rejected, but not for "${needle}" — got: ${joined}`);
    }
  }
  notes.push(`  rejected ${fixture.file} — ${fixture.why}`);
}

// 3. Every seeded violation in the broken fixtures must be caught.
const broken = run(['--data', join(ROOT, 'tests', 'fixtures', 'broken')]);
if (broken.code === 0 || broken.report.ok) {
  failures.push('tests/fixtures/broken validated clean — the gate is not closed');
}
const firedRules = new Set(
  broken.report.findings.filter((f) => f.level === 'error').map((f) => f.rule),
);
for (const rule of MUST_FIRE) {
  if (!firedRules.has(rule)) failures.push(`rule "${rule}" did not fire as an error on the broken fixtures`);
}

// 3b. Rules that need a fixture root to themselves.
for (const { dir, rule, expect } of ISOLATED) {
  const result = run(['--data', join(ROOT, 'tests', 'fixtures', dir)]);
  const hits = result.report.findings.filter((f) => f.level === 'error' && f.rule === rule);
  if (hits.length === 0) {
    failures.push(`rule "${rule}" did not fire as an error on tests/fixtures/${dir}`);
  } else if (expect && !hits.some((f) => f.message.includes(expect))) {
    failures.push(
      `rule "${rule}" fired on tests/fixtures/${dir} but not for "${expect}" — got: ` +
        hits.map((f) => f.message).join(' | '),
    );
  } else {
    notes.push(`  ${rule} fires on tests/fixtures/${dir}${expect ? ` (${expect})` : ''}`);
  }
}

// 3c. Rules that must stay silent on a legitimate shape.
for (const { dir, rule, why } of MUST_STAY_CLEAN) {
  const result = run(['--data', join(ROOT, 'tests', 'fixtures', dir)]);
  const fired = result.report.findings.filter((f) => f.level === 'error' && f.rule === rule);
  if (fired.length > 0) {
    failures.push(
      `rule "${rule}" fired on tests/fixtures/${dir}, which is a legitimate shape (${why}): ` +
        fired.map((f) => f.message).join(' | '),
    );
  } else {
    notes.push(`  ${rule} stays silent on tests/fixtures/${dir} — ${why}`);
  }
}

// 3d. Rendered-reachability: the mark must render on the page of the record declaring it.
//
// Both directions, per the standing rule. The fixture captures a paired series whose own page
// omits its declared absence while /unmeasured still lists it — which is why the check is
// per-record and not corpus-wide, and the fixture proves that distinction rather than
// asserting it. The live corpus is checked only when a build exists; exit 2 means no output.
{
  const reach = (args) => {
    try {
      execFileSync(process.execPath, [join(ROOT, 'tools', 'reachability.mjs'), ...args], {
        // stderr piped: the fixture is EXPECTED to fail, and letting its report through
        // would make a passing selftest read as a broken one.
        encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NO_COLOR: '1' },
      });
      return 0;
    } catch (err) {
      return err.status ?? 1;
    }
  };
  const fixture = join(ROOT, 'tests', 'fixtures', 'reachability-hidden');
  const fired = reach(['--data', join(fixture, 'data'), '--out', join(fixture, 'out')]);
  if (fired !== 1) {
    failures.push(`reachability did not fire on tests/fixtures/reachability-hidden (exit ${fired}) — a declaration suppressed on its own record page must fail`);
  } else {
    notes.push('  reachability fires on tests/fixtures/reachability-hidden (declared, not on its own record page)');
  }
  const live = reach([]);
  if (live === 2) notes.push('  reachability on the live corpus skipped — no built output yet');
  else if (live !== 0) failures.push('reachability failed on the live corpus; run `npm run reachability` for the list');
  else notes.push('  reachability stays silent on the live corpus — every declared mark renders on its own record page');
}

// 3e. Domain-surface coverage: every schema domain value has a page, every record reaches it.
//
// A SEPARATE COUNTER FROM THE 22, AND DELIBERATELY SO. The "N/N rules fire" line counts VALIDATOR
// rules firing on a data fixture root, and this gate cannot be one: `npm run build` runs validate
// BEFORE next build, so at validator time there is no `out/` to read, and a validator rule about
// what renders would have to model the render path it exists to police (Rule 1). Folding it into
// that number would have meant either a rule that cannot see the defect or a number that no longer
// means what the log says it means. Counted here instead, in its own line.
//
// Both fires-correctly fixtures are DISTILLED FROM REAL REGRESSED BUILDS, not written from a model
// of one (Rule 2). `domain-coverage-no-page` reproduces the actual `education` defect — removed
// from DOMAINS and DOMAIN_LABELS, rebuilt, gate observed to fire. `domain-coverage-record-adrift`
// reproduces `seriesUnderLens` returning empty — rebuilt, gate observed to fire on 9 of the 15
// lens-carrying series. Both regressions left `validate`, `typecheck` and `reachability` green.
{
  const cover = (args) => {
    try {
      execFileSync(process.execPath, [join(ROOT, 'tools', 'domain-coverage.mjs'), ...args], {
        // stderr piped: the fixtures are EXPECTED to fail, and letting their reports through would
        // make a passing selftest read as a broken one.
        encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NO_COLOR: '1' },
      });
      return 0;
    } catch (err) {
      return err.status ?? 1;
    }
  };
  const FIXTURES = [
    { dir: 'domain-coverage-no-page', why: 'a schema domain value with no page built for it' },
    { dir: 'domain-coverage-record-adrift', why: 'a surface that exists but omits a record declaring it' },
  ];
  for (const { dir, why } of FIXTURES) {
    const root = join(ROOT, 'tests', 'fixtures', dir);
    const fired = cover(['--data', join(root, 'data'), '--out', join(root, 'out')]);
    if (fired !== 1) {
      failures.push(`domain-coverage did not fire on tests/fixtures/${dir} (exit ${fired}) — ${why}`);
    } else {
      notes.push(`  domain-coverage fires on tests/fixtures/${dir} — ${why}`);
    }
  }
  const live = cover([]);
  if (live === 2) notes.push('  domain-coverage on the live corpus skipped — no built output yet');
  else if (live !== 0) failures.push('domain-coverage failed on the live corpus; run `npm run domain-coverage` for the list');
  else notes.push('  domain-coverage stays silent on the live corpus — every domain value has a surface and every record reaches it');
}

// 3f. url-check: a URL added or amended in a cycle is fetched before it lands.
//
// A THIRD COUNTER, and separate from the output gates for a structural reason. `reachability` and
// `domain-coverage` read BUILT OUTPUT; this one reads `/data` and the NETWORK. It cannot join the
// validator count either — validate must stay deterministic and offline, and a rule that reaches
// the network in the build path would make every build hostage to a remote host being up.
//
// BOTH FIXTURES RUN IN RECORDED MODE, so the selftest itself needs no network. The fires-correctly
// root is DERIVED FROM A REAL REGRESSION (Rule 2), not written from a model of one: it carries the
// two URLs actually written into a working tree during cycle 2026-08-03f — a plausible Amnesty
// document path and a plausible Lok Sabha Secretariat path — together with the responses actually
// observed from them, plus the soft-404 branch a status-only check would pass.
//
// The three branches are pinned separately on purpose. A 403, a no-response and a 200-serving-HTML
// fail for different reasons, and the last is the one that reads as success.
{
  const check = (args) => {
    try {
      execFileSync(process.execPath, [join(ROOT, 'tools', 'url-check.mjs'), ...args], {
        // stderr piped: the fixture is EXPECTED to fail, and letting its report through would make
        // a passing selftest read as a broken one.
        encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NO_COLOR: '1' },
      });
      return { code: 0, out: '' };
    } catch (err) {
      return { code: err.status ?? 1, out: `${err.stdout ?? ''}${err.stderr ?? ''}` };
    }
  };
  const root = (d) => join(ROOT, 'tests', 'fixtures', d);
  const guessed = root('url-check-guessed');
  const fired = check(['--all', '--data', guessed, '--responses', join(guessed, 'responses.json')]);
  if (fired.code !== 1) {
    failures.push(`url-check did not fire on tests/fixtures/url-check-guessed (exit ${fired.code}) — a guessed URL that does not serve its document must fail`);
  } else {
    // Assert each branch by its own message. Without this the fixture passes on any failure,
    // including one from a branch it is not testing, and a branch could stop firing unnoticed.
    const BRANCHES = [
      ['HTTP 403', 'a plausible path the host refuses'],
      ['HTTP no response', 'a plausible path that resolves to nothing'],
      ['where the path states application/pdf', 'a soft-404: 200 serving HTML for a .pdf path'],
    ];
    for (const [needle, why] of BRANCHES) {
      if (fired.out.includes(needle)) notes.push(`  url-check fires on ${why}`);
      else failures.push(`url-check did not report the branch "${needle}" (${why}) — the fixture would pass on another branch's failure`);
    }
  }
  const clean = check(['--all', '--data', root('url-check-clean'), '--responses', join(root('url-check-clean'), 'responses.json')]);
  if (clean.code !== 0) failures.push(`url-check fired on tests/fixtures/url-check-clean (exit ${clean.code}) — URLs that do serve their document must pass, including one with no path extension`);
  else notes.push('  url-check stays silent on URLs that serve their document, and asserts no content-type where the path states no extension');
}

// 4. Strictness must be live: a misspelled keyword cannot be silently ignored.
// Under a lax config this schema compiles and lets the invalid record through.
const typoSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: { term: { type: 'string' }, assessment: { type: 'string' } },
  allOf: [
    {
      if: { properties: { term: { const: 'baseline' } } },
      than: { properties: { assessment: { const: 'baseline-context' } } },
    },
  ],
};
let typoThrew = false;
try {
  new Ajv2020({ ...AJV_OPTIONS }).compile(typoSchema);
} catch {
  typoThrew = true;
}
if (!typoThrew) {
  failures.push(
    'a misspelled schema keyword ("than" for "then") compiled without error — strict mode is off, so a typo in a conditional would silently pass every record it was meant to catch',
  );
}

// 5. --strict must promote warnings on the real repository.
const strict = run(['--strict']);
const realWarnings = good.report.findings.filter((f) => f.level === 'warn').length;
if (realWarnings > 0 && strict.code === 0) failures.push('--strict left warnings unpromoted');

if (failures.length) {
  console.error('selftest FAILED');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `selftest OK — /data valid (${realWarnings} warning(s))\n` +
    notes.join('\n') +
    `\n  ${MUST_FIRE.length}/${MUST_FIRE.length} validator rules fire on tests/fixtures/broken ` +
    `(${broken.report.findings.filter((f) => f.level === 'error').length} errors caught)` +
    // Counted apart from the validator rules because they are a different kind of check, not a
    // smaller one: these read built output, run after next build, and cannot appear in the line
    // above. Kept visible so the output-reading half of the gate has a number of its own rather
    // than living only in the notes.
    `\n  ${OUTPUT_GATES.length}/${OUTPUT_GATES.length} output gates proven to fire on their own fixtures ` +
    `(${OUTPUT_GATES.join(', ')})` +
    `\n  misspelled schema keyword fails compilation`,
);
