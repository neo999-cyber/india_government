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
import {readFileSync, writeFileSync, readdirSync, statSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {} from './lib/lens-fixtures.mjs';
import {dirname, join} from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import {AJV_OPTIONS} from './lib/schema.mjs';

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
  { rule: 'schema:series', expect: 'unknown property "editorialSpin"' },
  { rule: 'schema:ledger', expect: 'missing required property "caseFor"' },
  { rule: 'ref-resolves', expect: '"P-98" does not resolve to any provenance record' },
  { rule: 'calendar-discipline', expect: 'is not fiscal-year form' },
  { rule: 'point-unique', expect: 'duplicate observation for IND FY2013-14' },
  { rule: 'id-unique', expect: 'duplicate series id "duplicate-id"' },
  { rule: 't5-dispute-link', expect: 'must carry a dispute record covering its own domain "governance"' },
  { rule: 'panel-vintage', expect: 'has no source.vintage' },
  { rule: 'regime-group', expect: '"gdp-growth-new-base", "gdp-growth-2022-base" absent' },
  { rule: 'baseline-context', expect: 'is for pre-May-2014 records only, but term is "T1"' },
  { rule: 'date-order', expect: 'dateEnd 2019-04 precedes date 2019-09' },
  { rule: 'back-link', expect: 'P-91 lists this series in affectsSeries' },
  { rule: 'ref-relevant', expect: 'P-92 covers [macro] and this record is [banking]' },
  // From 2026-08-02 every reference field declares its target layer's id pattern, so ajv
  // rejects both of these too — but a pattern-mismatch message does not tell an author
  // whether they pointed at the wrong layer or fat-fingered an id. These name the difference.
  { rule: 'ref-layer', expect: '"P-59" is a well-formed provenance id in a field that must hold a series id' },
  { rule: 'ref-malformed', expect: '"Not A Series Id" matches no layer' },
  // Character sweep: schema validation cannot see any of these.
  { rule: 'charset-script', expect: 'Cyrillic text in English prose' },
  { rule: 'charset-invisible', expect: 'invisible character U+200B (zero-width space)' },
  { rule: 'charset-url', expect: 'non-ASCII U+0456 in a URL' },
  { rule: 'charset-symbol', expect: 'character U+2192' },
  { rule: 'charset-homoglyph', expect: 'U+03BC GREEK SMALL LETTER MU' },
  // The lens axis, added 2026-08-03. Two names for two mistakes: a lens value standing in for a
  // subject, and a value asserted on both axes of one record. Folded into one rule the message
  // could not tell an author which they had made — and only one of the two is unconditional.
  { rule: 'lens-as-subject', expect: 'domain = "kashmir" is a lens, not a subject' },
  { rule: 'lens-duplicated', expect: '"federalism" is in both domain and lenses[]' },
  // The objective axis, added 2026-08-03. Four of the eight assessment values are defined against
  // "the objective stated at announcement"; nothing checked that the record had one, and fourteen
  // records took a scored value with nothing claimed to score against.
  { rule: 'objective-required', expect: 'assessment "too-early" is defined against the objective stated at announcement' },
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
  { dir: 'regime-gap', rule: 'regime-handoff', expect: 'leaving 2014–2015 on no regime at all' },
  { dir: 'caveat-orphan', rule: 'caveat-target', expect: 'caveat names "P-26"' },
  { dir: 'mirror-contradiction', rule: 'mirror-contradiction', expect: '"cannot-be-both" is in both affectsSeries and correctiveSeries' },
  // One fixture root, four branches of pair-side, told apart by `expect`. Without it a
  // fixture passes on any pair-side error — including one from a branch it is not testing —
  // and a branch could stop firing unnoticed.
  { dir: 'pairs-malformed', rule: 'pair-side', expect: 'is not in /data' },
  { dir: 'pairs-malformed', rule: 'pair-side', expect: 'Exactly one must be set' },
  { dir: 'pairs-malformed', rule: 'pair-side', expect: 'which declares 1 (valid 0-0)' },
  { dir: 'pairs-malformed', rule: 'pair-side', expect: 'carries no competingAccounts' },
  { dir: 'pair-inverted', rule: 'pair-inverted', expect: 'the wrong way round' },
  // `status` against renderability, both directions, told apart by `expect` for the reason the
  // four pair-side entries above are: one root, and a branch that stopped firing would otherwise
  // be satisfied by the other's error. PR-95 also trips a pair-side branch, which is the point —
  // pair-status states the invariant, pair-side happens to catch most of one half of it.
  { dir: 'pair-status', rule: 'pair-status', expect: 'both sides resolve, so the pair renders' },
  { dir: 'pair-status', rule: 'pair-status', expect: 'status does not say so' },
  { dir: 'reason-kind-missing', rule: 'reason-kind', expect: 'states no reasonKind' },
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
  // The LEDGER call site of the same rule, and it needs its own root rather than sharing the one
  // above. `lens-duplicated` reaches the ledger through a different function reading a different
  // field — `domains[]` against `lenses[]`, not `domain` against `lenses[]` — and it fires on a
  // WIDER set of values there, because `kashmir` in `domains[]` is legal on a ledger record and is
  // already an error on a series. Sharing the pairs fixture would let the whole ledger branch be
  // deleted with the selftest still green. Pinned on its own message so the two branches cannot be
  // told apart by accident.
  { dir: 'lens-axis-ledger', rule: 'lens-duplicated', expect: 'is in both domains[] and lenses[]' },
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
// `firedRules` was built here and never read. The MUST_FIRE loop below is strictly stronger: it
// asserts each rule fired AND that it fired for the violation the fixture seeds, which is the
// rule that every fixture asserts the specific failure it tests for.
for (const { rule, expect } of MUST_FIRE) {
  const hits = broken.report.findings.filter((f) => f.level === 'error' && f.rule === rule);
  if (hits.length === 0) {
    failures.push(`rule "${rule}" did not fire as an error on the broken fixtures`);
  } else if (!hits.some((f) => f.message.includes(expect))) {
    failures.push(
      `rule "${rule}" fired on the broken fixtures but not for "${expect}" — it is passing on a ` +
        `different violation than the one the fixture seeds. Got: ${hits.map((f) => f.message).join(' | ').slice(0, 300)}`,
    );
  }
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
      const out = execFileSync(process.execPath, [join(ROOT, 'tools', 'reachability.mjs'), ...args], {
        // stderr piped: the fixture is EXPECTED to fail, and letting its report through
        // would make a passing selftest read as a broken one.
        encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NO_COLOR: '1' },
      });
      return { code: 0, out: out ?? '' };
    } catch (err) {
      return { code: err.status ?? 1, out: `${err.stdout ?? ''}${err.stderr ?? ''}` };
    }
  };
  const fixture = join(ROOT, 'tests', 'fixtures', 'reachability-hidden');
  const fired = reach(['--data', join(fixture, 'data'), '--out', join(fixture, 'out')]);
  // The message is asserted, not only the exit code. This fixture has TWO declared marks and only
  // one is suppressed; an exit of 1 would also be returned if the gate broke and reported both, or
  // reported the wrong one, and neither of those is what this root tests.
  const REACH_NEEDLE = 'renders elsewhere but NOT on its own record page';
  if (fired.code !== 1) {
    failures.push(`reachability did not fire on tests/fixtures/reachability-hidden (exit ${fired.code}) — a declaration suppressed on its own record page must fail`);
  } else if (!fired.out.includes(REACH_NEEDLE) || !fired.out.includes('paired-series-with-absence')) {
    failures.push(`reachability fired on tests/fixtures/reachability-hidden but not for the suppressed mark on paired-series-with-absence — it is passing on a different failure`);
  } else {
    notes.push('  reachability fires on tests/fixtures/reachability-hidden (declared, not on its own record page)');
  }
  const live = reach([]);
  if (live.code === 2 && live.out.includes('REFUSING TO RUN')) {
    // Same distinction domain-coverage got: exit 2 covers "no output" and "stale output", and
    // letting the second land in the silent-skip branch is the false pass this assertion exists to
    // prevent. It was left on this gate when the other was fixed — the fix was applied to the site
    // that had been observed failing, not to the class.
    failures.push('reachability refused to run on the live corpus: the build is stale. Run `npm run build`, then the selftest');
  } else if (live.code === 2) {
    notes.push('  reachability on the live corpus skipped — no built output yet');
  } else if (live.code !== 0) {
    failures.push('reachability failed on the live corpus; run `npm run reachability` for the list');
  } else {
    notes.push('  reachability stays silent on the live corpus — every declared mark renders on its own record page');
  }
}

// 3d-bis. The guarded list is BOUND to the record types — no prose field is merely forgotten.
//
// `reachability` is enumeration-scoped: a field absent from its list is unguarded BY CONSTRUCTION,
// which is how 226 marks shipped invisible with every gate green. `no-unguarded-prose-field` closes
// that by requiring every prose field on LedgerRecord and ProvenanceRecord to be either guarded or
// exempted by name in the schema.
//
// BOTH DIRECTIONS, THROUGH THE SAME SEAM. The negative injects a marks list with `assessmentNote`
// removed — the exact field whose absence caused the original failure — and the positive injects
// the full list the same way. Running the positive through a DIFFERENT path would leave open that
// the negative fires for a reason unrelated to the dropped field, which is the M3a trap.
{
  const run = (args) => {
    try {
      const out = execFileSync(process.execPath, [join(ROOT, 'tools', 'no-unguarded-prose-field.mjs'), ...args], {
        encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NO_COLOR: '1' },
      });
      return { code: 0, out: out ?? '' };
    } catch (err) {
      return { code: err.status ?? 1, out: `${err.stdout ?? ''}${err.stderr ?? ''}` };
    }
  };
  const fixtureDir = join(ROOT, 'tests', 'fixtures', 'unguarded-prose-field');
  const dropped = join(fixtureDir, 'marks-without-assessmentnote.json');
  const full = join(fixtureDir, 'marks-full.json');

  const fired = run(['--marks-json', dropped]);
  if (fired.code !== 1) {
    failures.push(`no-unguarded-prose-field did not fire with assessmentNote removed from the guarded list (exit ${fired.code})`);
  } else if (!fired.out.includes('ledger.assessmentNote')) {
    failures.push('no-unguarded-prose-field fired with assessmentNote dropped but did not name ledger.assessmentNote — it is passing on a different failure');
  } else {
    notes.push('  no-unguarded-prose-field fires when a field is dropped from the guarded list (names ledger.assessmentNote)');
  }

  const quiet = run(['--marks-json', full]);
  if (quiet.code !== 0) {
    failures.push(`no-unguarded-prose-field fired on the FULL guarded list through the same seam (exit ${quiet.code}) — the negative above proves nothing if this does not pass`);
  } else {
    notes.push('  no-unguarded-prose-field stays silent on the full list, injected through the same seam');
  }

  const live = run([]);
  if (live.code !== 0) {
    failures.push('no-unguarded-prose-field failed on the live schemas; run `npm run no-unguarded-prose-field`');
  } else {
    notes.push('  no-unguarded-prose-field stays silent on the live schemas');
  }

  // THE NON-PROSE HALF, through its own seam and in the same both-directions form.
  //
  // Added 2026-08-06 with the non-prose render assertion. The dropped key is `ledger.assessment` —
  // the verdict, the single value a reader most obviously cannot do without — because a gate that
  // stays quiet about THAT is broken in the way that matters, and a modelled field would prove less.
  const rFired = run(['--renderings-json', join(fixtureDir, 'renderings-without-assessment.json')]);
  if (rFired.code !== 1) {
    failures.push(`no-unguarded-prose-field did not fire with ledger.assessment removed from the renderings table (exit ${rFired.code})`);
  } else if (!rFired.out.includes('ledger.assessment')) {
    failures.push('no-unguarded-prose-field fired with ledger.assessment dropped but did not name it — it is passing on a different failure');
  } else {
    notes.push('  no-unguarded-prose-field fires when a non-prose field loses its rendering declaration (names ledger.assessment)');
  }

  const rQuiet = run(['--renderings-json', join(fixtureDir, 'renderings-full.json')]);
  if (rQuiet.code !== 0) {
    failures.push(`no-unguarded-prose-field fired on the FULL renderings table through the same seam (exit ${rQuiet.code}) — the negative above proves nothing if this does not pass`);
  } else {
    notes.push('  no-unguarded-prose-field stays silent on the full renderings table, injected through the same seam');
  }

  // FIXTURE FRESHNESS. A positive control cut from a list the gate no longer uses reports green and
  // proves nothing, and nothing downstream can tell. Same reason the lens fixtures carry a stamp.
  try {
    const stamp = JSON.parse(readFileSync(join(fixtureDir, 'GENERATED-FROM.json'), 'utf8'));
    const liveMarks = JSON.parse(readFileSync(join(fixtureDir, 'marks-full.json'), 'utf8')).length;
    const liveKeys = JSON.parse(readFileSync(join(fixtureDir, 'renderings-full.json'), 'utf8')).length;
    const { MARKS } = await import(pathToFileURL(join(ROOT, 'tools', 'lib', 'guarded-marks.mjs')).href);
    const { RENDERINGS } = await import(pathToFileURL(join(ROOT, 'tools', 'lib', 'value-renderings.mjs')).href);
    const realKeys = Object.keys(RENDERINGS).length;
    if (stamp.markFields !== MARKS.length || stamp.renderingKeys !== realKeys || liveMarks !== MARKS.length || liveKeys !== realKeys) {
      failures.push(
        `render fixtures are STALE — stamp says ${stamp.markFields} marks / ${stamp.renderingKeys} renderings, ` +
        `fixtures hold ${liveMarks} / ${liveKeys}, live lists hold ${MARKS.length} / ${realKeys}. ` +
        'Run `npm run regen:render-fixtures`.',
      );
    } else {
      notes.push(`  render fixtures are fresh against the live lists (${MARKS.length} marks, ${realKeys} renderings)`);
    }
  } catch (err) {
    failures.push(`render fixture freshness check could not run: ${err.message}`);
  }
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
      const out = execFileSync(process.execPath, [join(ROOT, 'tools', 'domain-coverage.mjs'), ...args], {
        // stderr piped: the fixtures are EXPECTED to fail, and letting their reports through would
        // make a passing selftest read as a broken one.
        encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NO_COLOR: '1' },
      });
      return { code: 0, out: out ?? '' };
    } catch (err) {
      return { code: err.status ?? 1, out: `${err.stdout ?? ''}${err.stderr ?? ''}` };
    }
  };
  const FIXTURES = [
    { dir: 'domain-coverage-no-page', why: 'a schema domain value with no page built for it', expect: '[page]' },
    { dir: 'domain-coverage-record-adrift', why: 'a surface that exists but omits a record declaring it', expect: '[record]' },
    // The lens axis, added in phase 14, and TWO fixtures because the two branches fail differently.
    //
    // `lens-coverage-no-page` is the domain case one axis over: a lens value the schemas admit with
    // no page built for it. Derived from a real regression rather than a model of one (Rule 2) —
    // the counterparty lenses were added to the enum before the /lenses route existed, the build
    // was run, and the gate was observed to fire on every one of them.
    //
    // `lens-coverage-empty` is the branch a structural check CANNOT catch, and it is why it is
    // separate. When the /lenses route was first built, every assertion in domain-coverage went
    // green — 8/8 surfaces built, 8/8 linked, every record-to-lens reference reachable — while six
    // of the eight lenses held no records at all. A reader selecting one would have reached a
    // correctly built, correctly linked, entirely empty page. Structure passing is not content
    // passing, and this fixture pins the difference.
    { dir: 'lens-coverage-no-page', why: 'a schema lens value with no page built for it', expect: '[lens] russia' },
    { dir: 'lens-coverage-empty', why: 'a lens value with a page, linked, and no record behind it — a filter that returns nothing', expect: '[lens-empty]' },
  ];
  // 3e-quater. The enum stamp, and the control that it does not repair its own subject.
  //
  // The check itself lives in tools/enum-stamp.mjs so it can be run as a subprocess TWICE. That is
  // not fastidiousness: the first version of this check imported `liveEnums` from the regenerator's
  // runner, whose module body calls build(), so importing it REGENERATED the fixtures — healing the
  // drift the stamp exists to detect and reporting green. It was caught because the runner printed
  // a line, not because anything asserted on it.
  //
  // STANDING RULE, ENFORCED HERE: a failing check re-run WITHOUT a fix applied must still fail. A
  // second-run pass means the gate repaired what it was measuring. The control seeds the real
  // hazard — batch 1's five-lens enum — runs the check twice, and requires failure both times.
  {
    const stamp = (args = []) => {
      try {
        const out = execFileSync(process.execPath, [join(ROOT, 'tools', 'enum-stamp.mjs'), ...args], {
          encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NO_COLOR: '1' },
        });
        return { code: 0, out: out ?? '' };
      } catch (err) {
        return { code: err.status ?? 1, out: `${err.stdout ?? ''}${err.stderr ?? ''}` };
      }
    };

    const live = stamp();
    if (live.code !== 0) {
      failures.push(`enum-stamp failed on the live fixtures: ${live.out.trim().split('\n')[0]}`);
    } else {
      notes.push('  enum-stamp passes on the live fixtures — both generated from the current enums');
    }

    const stampPath = join(ROOT, 'tests', 'fixtures', 'lens-coverage-empty', 'GENERATED-FROM.json');
    const original = readFileSync(stampPath, 'utf8');
    try {
      const seeded = JSON.parse(original);
      // The real hazard, not a model of one: the enum as it stood at batch 1.
      seeded.lenses = ['kashmir', 'federalism', 'defence-sector', 'united-states', 'russia'];
      writeFileSync(stampPath, `${JSON.stringify(seeded, null, 2)}\n`);

      const first = stamp();
      const second = stamp();
      if (first.code !== 1) {
        failures.push(`enum-stamp did not fail on a seeded stale stamp (exit ${first.code})`);
      } else if (second.code !== 1) {
        failures.push(
          `enum-stamp failed once and PASSED on the second run with no fix applied (exit ${second.code}) — ` +
            `the check repaired its own subject, which is how the lens-fixture drift stayed green for two cycles`,
        );
      } else {
        notes.push('  enum-stamp still fails on the second run with no fix applied — it does not repair its own subject');
      }
    } finally {
      writeFileSync(stampPath, original);
    }
    const restored = stamp();
    if (restored.code !== 0) failures.push('enum-stamp did not return to passing after the control restored the stamp — the control has left the corpus dirty');
  }

  for (const { dir, why, expect } of FIXTURES) {
    const root = join(ROOT, 'tests', 'fixtures', dir);
    const fired = cover(['--data', join(root, 'data'), '--out', join(root, 'out')]);
    if (fired.code !== 1) {
      failures.push(`domain-coverage did not fire on tests/fixtures/${dir} (exit ${fired.code}) — ${why}`);
    } else if (expect && !fired.out.includes(expect)) {
      // PIN THE BRANCH. Without this a fixture passes on ANY failure, including one from a branch
      // it is not testing — and that is not hypothetical: both lens fixtures were generated when the
      // enum held five values, and after two more were admitted `lens-coverage-empty` began failing
      // on `[lens]` (no page built for the new values) instead of `[lens-empty]`. Exit code 1 either
      // way, selftest green, and the branch it exists to pin had gone unchecked.
      failures.push(`domain-coverage fired on tests/fixtures/${dir} but not for "${expect}" — the fixture is passing on another branch's failure`);
    } else {
      notes.push(`  domain-coverage fires on tests/fixtures/${dir}${expect ? ` (${expect})` : ''} — ${why}`);
    }
  }
  const live = cover([]);
  if (live.code === 2 && live.out.includes('REFUSING TO RUN')) {
    // A STALE BUILD IS A FAILURE HERE, NOT A SKIP. Exit 2 covers both "no output at all" and
    // "output older than its inputs", and the second used to land in the same silent-skip branch as
    // the first. A selftest that quietly declines to run its live check, and still prints OK, is the
    // false pass this whole assertion exists to prevent — one level up.
    failures.push('domain-coverage refused to run on the live corpus: the build is stale. Run `npm run build`, then the selftest');
  } else if (live.code === 2) {
    notes.push('  domain-coverage on the live corpus skipped — no built output yet');
  } else if (live.code !== 0) {
    failures.push('domain-coverage failed on the live corpus; run `npm run domain-coverage` for the list');
  } else {
    notes.push('  domain-coverage stays silent on the live corpus — every domain value has a surface and every record reaches it');
  }

  // 3e-ter. Build freshness, both controls, driven through the REAL call site.
  //
  // The two members differ in exactly one thing: which of the pair was touched last. Same fixture,
  // same gate, same flags — only the mtimes move. A control pair that differed in anything else
  // would not isolate the assertion.
  {
    const root = join(ROOT, 'tests', 'fixtures', 'lens-coverage-empty');
    const touch = (dir, when) => execFileSync('find', [dir, '-type', 'f', '-exec', 'touch', '-t', when, '{}', '+'], { stdio: 'ignore' });
    const args = ['--data', join(root, 'data'), '--out', join(root, 'out'), '--check-freshness'];
    try {
      touch(join(root, 'out'), '202601010000');
      touch(join(root, 'data'), '202606010000');
      const stale = cover(args);
      // RUN TWICE, no fix applied. domain-coverage is a pure reader and cannot rebuild anything, so
      // this is the same-form POSITIVE for the enum-stamp control above: it shows the run-twice
      // assertion passes on a gate that genuinely cannot repair its subject, which is what makes it
      // evidence when the same assertion fails somewhere else.
      const staleAgain = cover(args);
      if (stale.code === 2 && stale.out.includes('REFUSING TO RUN')) {
        if (staleAgain.code !== 2) {
          failures.push(`freshness refused once and did NOT refuse on the second run with no fix applied (exit ${staleAgain.code}) — the gate repaired its own subject`);
        } else {
          notes.push('  freshness refuses a stale build, and still refuses on a second run with no fix applied');
        }
      } else {
        failures.push(`freshness did not refuse a stale build (exit ${stale.code}) — a gate reading a stale artefact reports clean about a build nobody is shipping`);
      }
      touch(join(root, 'out'), '202607010000');
      const fresh = cover(args);
      if (fresh.code === 2 && fresh.out.includes('REFUSING TO RUN')) {
        failures.push('freshness refused a FRESH build — the same-form positive must pass through the assertion, or the negative proves nothing');
      } else {
        notes.push('  freshness passes a fresh build — same fixture, same flags, only the mtimes differ');
      }
    } finally {
      // Leave the fixture newer than any plausible input so an ordinary run is unaffected.
      touch(join(root, 'out'), '203001010000');
    }
  }
}

// 3e-bis. figure-consistency: a record's own arithmetic agrees with itself, or says why not.
//
// A FOURTH COUNTER, and separate for the reason the others are. This reads /data and a claims file
// and no built output, so it is not an output gate; and it is not a validator rule because the
// claim it checks is not a property of a record in isolation but a relation between a record's
// prose and the source values behind it, which the validator has no access to.
//
// The fires-correctly fixture is DISTILLED FROM THE REAL STATE (Rule 2), not written from a model
// of one: it is P-119 exactly as it stood at commit 23cc1cf, after the mirror shipped and before
// the rounding basis was declared. The gate was observed to fire on it.
{
  const fig = (args) => {
    try {
      const out = execFileSync(process.execPath, [join(ROOT, 'tools', 'figure-consistency.mjs'), ...args], {
        encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NO_COLOR: '1' },
      });
      return { code: 0, out: out ?? '' };
    } catch (err) { return { code: err.status ?? 1, out: `${err.stdout ?? ''}${err.stderr ?? ''}` }; }
  };
  const root = join(ROOT, 'tests', 'fixtures', 'figure-consistency-undeclared');
  const fired = fig(['--data', join(root, 'data'), '--claims', join(root, 'claims.json')]);
  // Message asserted: this gate has four failure kinds — source, missing, absent, undeclared — and
  // all four exit 1. A fixture pinned to the exit code alone would pass if the claim went stale and
  // failed as `[missing]`, which is the opposite of what it exists to prove.
  if (fired.code !== 1) {
    failures.push(`figure-consistency did not fire on tests/fixtures/figure-consistency-undeclared (exit ${fired.code}) — a non-reconstructing difference with no stated basis must fail`);
  } else if (!fired.out.includes('[undeclared] P-119')) {
    failures.push(`figure-consistency fired on tests/fixtures/figure-consistency-undeclared but not as [undeclared] — it is passing on a different branch. Got: ${fired.out.slice(0, 300)}`);
  } else {
    notes.push('  figure-consistency fires on tests/fixtures/figure-consistency-undeclared ([undeclared] P-119) — a difference the printed operands do not reproduce, with no basis stated');
  }
  const live = fig([]);
  if (live.code !== 0) failures.push('figure-consistency failed on the live corpus; run `npm run figure-consistency` for the list');
  else notes.push('  figure-consistency stays silent on the live corpus — every declared claim agrees with source, and every rounding artefact is declared');
}

// 3e-quinquies. No checker's imports write to disk.
//
// The structural half of the same rule. `enum-stamp` importing the regenerator was not caught by
// any assertion — it was caught because the runner happened to print a line. So the property is
// asserted directly: import each module a checker depends on, in a child process that does nothing
// else, and require the fixture tree to be byte-identical afterwards.
//
// OBSERVED, NOT MODELLED. A rule that grepped for top-level `build(` calls would encode a belief
// about how a side effect looks; this imports the module and looks at the disk. The audit that
// produced this list found `selftest` itself mutates state (it shells out to `touch` for the
// freshness controls) and that a static write-count scan missed it — which is the same lesson.
{
  const FIXTURE_TREE = join(ROOT, 'tests', 'fixtures', 'lens-coverage-empty');
  const snapshot = () => {
    const out = [];
    const walk = (d) => {
      for (const e of readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
        const p = join(d, e.name);
        if (e.isDirectory()) walk(p);
        else out.push(`${p}:${readFileSync(p, 'utf8').length}:${statSync(p).mtimeMs}`);
      }
    };
    walk(FIXTURE_TREE);
    return out.join('\n');
  };
  const IMPORTED_BY_CHECKERS = ['lib/lens-fixtures.mjs', 'lib/freshness.mjs', 'lib/corpus-search.mjs', 'lib/integrity.mjs'];
  for (const mod of IMPORTED_BY_CHECKERS) {
    const before = snapshot();
    try {
      execFileSync(process.execPath, ['--input-type=module', '-e', `import ${JSON.stringify(join(ROOT, 'tools', mod))};`], {
        encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
      });
    } catch (err) {
      failures.push(`importing tools/${mod} threw: ${(err.stderr ?? '').toString().split('\n')[0]}`);
      continue;
    }
    if (snapshot() !== before) {
      failures.push(
        `importing tools/${mod} CHANGED tests/fixtures — a checker that imports it would repair its ` +
          `own subject. Move the side effect into a runner and keep the library declarative`,
      );
    } else {
      notes.push(`  importing tools/${mod} leaves the fixture tree untouched`);
    }
  }
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
      const out = execFileSync(process.execPath, [join(ROOT, 'tools', 'url-check.mjs'), ...args], {
        // stderr piped: the fixture is EXPECTED to fail, and letting its report through would make
        // a passing selftest read as a broken one.
        encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NO_COLOR: '1' },
      });
      // RETURN THE OUTPUT ON SUCCESS TOO. This previously returned `out: ''` whenever the command
      // passed, so no assertion about a PASSING run's output could ever be true — a stays-quiet
      // fixture could only ever be tested on its exit code, never on what it actually reported.
      // Found 2026-08-04 when the both-spreadsheet-branches assertion silently could not fire.
      return { code: 0, out: out ?? '' };
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
    // THE 403 BRANCH IS DELIBERATELY NOT HERE, AND ITS ABSENCE IS THE HONEST RESULT.
    // One of the two URLs actually guessed in 2026-08-03f — the Amnesty document path — returns
    // 403, and a 403 means the host answered and refused an automated client. The tool CANNOT
    // distinguish a wrongly-guessed URL from a correct one behind a bot-block, so it classifies
    // both as unverifiable and does not fail. That is the right call for the corpus (17 such URLs
    // against 4 genuine 404s, one of them cited by live records) and it means this gate would have
    // caught ONE of the two URLs that motivated it, not both. Asserted below as unverifiable so
    // the limitation is pinned rather than forgotten.
    const BRANCHES = [
      ['HTTP no response', 'a plausible path that resolves to nothing'],
      ['where the path states application/pdf', 'a soft-404: 200 serving HTML for a .pdf path'],
      // Both recorded as HTTP 200 in the fixture, deliberately. They ARE reachable; reachability is
      // not the test. This branch was added after two live records were found citing a wildcard
      // listing while naming specific Government Orders — it had no path extension, so no
      // content-type was asserted, so a 200 passed. The wildcard .pdf variants were caught only
      // because their extension happened to trigger the content-type branch: an accident, not the
      // rule working. Rejected on shape, before any fetch.
      ["wildcard LISTING interface", 'an archive wildcard that answers 200 and is not a document'],
      ['bare CDX endpoint with no query', 'a search API cited as though it were a source'],
    ];
    for (const [needle, why] of BRANCHES) {
      if (fired.out.includes(needle)) notes.push(`  url-check fires on ${why}`);
      else failures.push(`url-check did not report the branch "${needle}" (${why}) — the fixture would pass on another branch's failure`);
    }
    // The other half of the same fixture: the 403 must be REPORTED and must NOT be a failure.
    if (fired.out.includes('UNVERIFIABLE') && fired.out.includes('HTTP 403')) {
      notes.push('  url-check classifies a 403 as unverifiable, not failed — a refusal is not evidence the document is absent');
    } else {
      failures.push('url-check did not classify the 403 as unverifiable — failing on a bot-block would push authors to delete good citations');
    }
  }
  // --verbose: this block asserts on the content-type strings of a PASSING run, which the gate
  // no longer prints by default.
  const clean = check(['--all', '--verbose', '--data', root('url-check-clean'), '--responses', join(root('url-check-clean'), 'responses.json')]);
  if (clean.code !== 0) failures.push(`url-check fired on tests/fixtures/url-check-clean (exit ${clean.code}) — URLs that do serve their document must pass, including one with no path extension`);
  else notes.push('  url-check stays silent on URLs that serve their document, and asserts no content-type where the path states no extension');

  /**
   * BOTH SPREADSHEET BRANCHES, PINNED SEPARATELY — the fourth surprise to this fixture set.
   *
   * `.xls` and `.xlsx` are different registered types and one sentinel cannot match both. The
   * clean fixture now carries one of each, so a future edit that "simplifies" EXPECTED back to a
   * single spreadsheet sentinel fails here instead of silently reporting a live legacy workbook
   * as a soft-404 — which is what it did to three phase-13 records on 2026-08-04.
   */
  if (clean.code === 0 && clean.out.includes('vnd.ms-excel') && clean.out.includes('spreadsheetml')) {
    notes.push('  url-check accepts BOTH spreadsheet types — legacy .xls as vnd.ms-excel and .xlsx as OOXML; one sentinel cannot match both');
  } else if (clean.code === 0) {
    failures.push('url-check clean fixture no longer exercises both spreadsheet branches — a legacy .xls and a modern .xlsx must each be present, or the .xls regression can recur unseen');
  }
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

// 4b. The retrieved-text scanner must refuse its own historical false positive.
//
// Run as a SUBPROCESS rather than imported, for the same reason enum-stamp is: a control that
// lives inside the process it validates can be satisfied by the process, and this one guards the
// path every absence claim in the corpus now rests on. The specific message is asserted, not the
// exit code alone — a scanner that crashed before scanning would also exit non-zero, and one that
// matched nothing at all would pass a boundary-only assertion.
{
  const SCAN = join(ROOT, 'tools', 'scan-text.mjs');
  let out = '';
  let code = 0;
  try {
    out = execFileSync(process.execPath, [SCAN, '--selftest'], { encoding: 'utf8', cwd: ROOT });
  } catch (e) {
    code = e.status ?? 1;
    out = `${e.stdout ?? ''}${e.stderr ?? ''}`;
  }
  if (code !== 0) {
    failures.push(`scan-text --selftest exited ${code}: ${out.trim().split('\n').join(' | ')}`);
  } else if (!out.includes('"Fengal" refused')) {
    failures.push(`scan-text --selftest passed without asserting the Fengal control; got: ${out.trim()}`);
  } else {
    notes.push(`  scan-text control: ${out.trim()}`);
  }
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
    (process.argv.includes('--verbose') ? notes.join('\n') + '\n' : '') +
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
