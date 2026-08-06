#!/usr/bin/env node
/**
 * PHASE-NAME CONSISTENCY — every assertion of a phase's NAME agrees with the table in CLAUDE.md,
 * or says in its own text that it is superseded, or lives in a file that is append-only by rule.
 *
 * WHY THIS ONE IS BUILDABLE WHEN THE GENERAL STATE-LINE CHECK IS NOT. Batch 14 scoped a STATE.md
 * consistency check and concluded, correctly for its two instances, that "what would catch both is a
 * convention, not a checker" — every state line dated and object-named. That conclusion does not
 * govern this case, which has the three properties phase 14's instance lacked:
 *
 *   1. THE OBJECT IS NAMED AND MACHINE-IDENTIFIABLE — a phase number.
 *   2. THE AUTHORITY IS DECLARED IN THE CORPUS ITSELF. CLAUDE.md's phase table says in terms that
 *      "a phase name asserted from memory is a premise until it is read off this table."
 *   3. THE VOCABULARY IS CLOSED — the table's names, plus a committed list of names that were used
 *      and withdrawn.
 *
 * Where there is a named object, a declared authority and a closed vocabulary, a checker is
 * possible. Where any of the three is missing it is not, and the general convention is still owed.
 *
 * THE TRAP THAT DECIDES THE FORM, and it is why this is not a token check. Of the mentions that
 * disagree with the table today, MOST ARE CORRECT: the append-only verification log recorded what
 * was true when it was written, and two files quote the withdrawn name INSIDE THE SENTENCE THAT
 * WITHDRAWS IT. A guard forbidding the token would fire on three right answers and no wrong ones —
 * the shape CLAUDE.md already documents as "a guard that forbids a token therefore fails on a
 * correctly corrected record". So this asserts a PRESENCE IN CONTEXT, exactly as
 * tools/withdrawn-wording.mjs does: a disagreeing mention must be GOVERNED BY A SUPERSESSION CLAUSE
 * within a short window before it.
 *
 * WHAT IT BINDS: an assertion-form mention — `phase <N> is|was|becomes|=` — in a tracked file,
 * whose following window contains a name from the closed vocabulary.
 *
 * WHAT IT DOES NOT BIND, stated here rather than implied by a green line:
 *   - A phase referred to by name with no number ("the shocks phase"). No object to key on.
 *   - A name that has never been in the table and has never been withdrawn — the vocabulary is
 *     closed by construction, so a wholly novel wrong name is invisible. This is the real limit.
 *   - Any state line about anything other than a phase. The general convention is still unbuilt.
 *   - Whether the table itself is right. It is the authority; this gate cannot audit it.
 *
 * Usage:
 *   node tools/phase-name-consistency.mjs
 *   node tools/phase-name-consistency.mjs --verbose   list every assertion it examined
 *   node tools/phase-name-consistency.mjs --control   two-sided control, then exit
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

/**
 * Names that were asserted for a phase and then withdrawn. Committed rather than inferred, because
 * the detector cannot recognise a name it has never seen: an assertion is only IDENTIFIED as a name
 * assertion when the window carries a vocabulary term, so "phase 16 is the counterfactual engine"
 * is invisible unless `counterfactual engine` is listed here.
 *
 * THE LIST IS THE GATE'S SCOPE AND IS PRINTED WITH ITS COUNT. Adding a name here is how a future
 * withdrawal is brought into scope, and forgetting to is how one escapes it.
 */
const SUPERSEDED_NAMES = [
  {
    name: 'counterfactual engine',
    withdrawn: '2026-08-06',
    why: 'Ran as a second name for phase 16 for one scoping batch, from a note outside the repository. Withdrawn on the operator correction that made 16 shocks calibration; the engine is recorded in CLAUDE.md as considered and declined.',
  },
];

/**
 * Files exempt because a rule forbids editing them. Not a convenience list.
 *
 * docs/verification-log.md is APPEND-ONLY by a rule whose stated reason is that a log edited
 * whenever an entry turns out to be wrong records only the errors nobody caught. An entry stating
 * the name that was current when it was written is the log working, and the later entry governs.
 */
const APPEND_ONLY = [
  {
    file: 'docs/verification-log.md',
    why: 'Append-only by CLAUDE.md: "A closed verification-log entry is never edited." An entry carrying a superseded phase name is the log doing its job; the later entry governs.',
  },
];

/**
 * THIS FILE IS OUT OF ITS OWN SCOPE, BY NAME AND FOR A STATED REASON — not by luck.
 *
 * Its controls seed real contradictions ("Phase 16 is the counterfactual engine") on purpose, and
 * its header quotes them to explain the trap. On the run after Rulings 6-8 were written it was
 * scoring TEN assertions inside itself and exempting every one of them, because the word WITHDRAWN
 * happens to appear in the doc comment above SUPERSEDED_NAMES. **A checker passing its own fixtures
 * on a coincidence of its own prose is the shape "no checker imports from its own repair path"
 * exists to forbid**: the exemption would have survived any edit that removed the coincidence, and
 * nothing would have reported the change.
 */
const SELF = 'tools/phase-name-consistency.mjs';

/** A clause attributing a name to a superseded state. Presence in context, never absence. */
const SUPERSESSION =
  /CORRECTED\s+\d{4}-\d{2}-\d{2}|WITHDRAWN|withdrawn on|was withdrawn|this (?:paragraph|section|file|document|line) (?:read|said|stated)|previously (?:read|said|stated|carried)|SUPERSEDED|superseded by|stale|no longer (?:the|says)|OVERTAKEN|written while the question was open/i;
const LOOKBACK = 700;
const WINDOW = 240;

/**
 * A supersession clause in the head of a file governs the WHOLE file.
 *
 * ADDED AFTER THE FIRST LIVE RUN, which is what a first live run is for. Two superseded scoping
 * documents were named at lines 3, 17, 19, 37 and 204 — a header saying the file was written while
 * the question was open cannot reach line 204 through a 700-character lookback, and requiring the
 * same sentence five times inside one obsolete document would be a gate teaching noise. A document
 * that says at the top that it is superseded is self-describing at document level, which is the
 * scope the claim actually has.
 */
const DOC_HEAD = 900;

/**
 * WIDENED 2026-08-06 ON OPERATOR AUTHORISATION, AND THE GAP WAS MEASURED BEFORE IT WAS CLOSED.
 *
 * The predicate bound only `phase N is|was|becomes|= <name>`. A collision then arrived as a HEADING
 * — `# Phase 17 — design lock`, where the table read 17 independence — carrying a number and a name
 * with NO VERB BETWEEN THEM, and the gate was silent. **Every heading and every markdown table row
 * takes that form**, so the predicate was blind to the two places a phase name is most likely to be
 * written down: the title of a document about the phase, and the row of a table listing it.
 *
 * So it now admits a DASH or a COLON as the connective, and a separate pass reads markdown table
 * rows whose first cell is a bare phase number.
 *
 * WHAT IS STILL NOT ADMITTED, and it is stated here rather than left to be discovered again: a comma
 * (`phase 16, the shocks calibration`) and an appositive with no punctuation at all. Both were
 * considered and both widen into ordinary prose — `phase 15, which closed in August` would be
 * scanned for a name. The residual is the same shape as the one just closed and this comment is the
 * only thing standing between it and a third discovery.
 */
const ASSERTION = /phase\s+(\d{1,2})\s*(?:\s(?:is|was|becomes)\b|=|—|–|:|\s-\s)/gi;
/** Same pattern, non-global, for `search()` — a `g` regex carries lastIndex and would drift. */
const ASSERTION_ONCE = /phase\s+\d{1,2}\s*(?:\s(?:is|was|becomes)\b|=|—|–|:|\s-\s)/i;

/**
 * A markdown table row whose FIRST cell is a phase number: `| **16** | **shocks calibration** — … |`.
 *
 * Scanned separately because the number and the name are in different cells and no connective
 * pattern reaches across a `|`. CLAUDE.md's own table self-validates under this — each row's name is
 * the name the row declares — which is the correct behaviour and not an exemption.
 */
const TABLE_ROW = /^\|\s*\**\s*(\d{1,2})\s*\**\s*\|([^|]*)\|/gim;

const normSpace = (s) => s.replace(/\s+/g, ' ');

/**
 * Parse the phase table out of CLAUDE.md.
 *
 * A TABLE THAT HAS MOVED OR CHANGED SHAPE ABORTS THE GATE; it never falls back to a default. Same
 * call as tools/lib/value-renderings.mjs — a checker that quietly proceeds on a source it could not
 * read reports green about nothing.
 */
export function phaseTable(claudeMd) {
  const start = claudeMd.indexOf('### THE PHASE LIST');
  if (start === -1) throw new Error('phase-name-consistency: the "### THE PHASE LIST" heading is not in CLAUDE.md — the authority has moved, aborting rather than falling back');
  const section = claudeMd.slice(start, start + 4000);
  const rows = section.split('\n').filter((l) => l.trim().startsWith('|'));
  if (rows.length < 6) throw new Error(`phase-name-consistency: the phase table has ${rows.length} rows, expected at least 6 — shape changed, aborting`);
  const names = new Map();
  for (const row of rows) {
    const cells = row.split('|').map((c) => c.trim());
    if (cells.length < 4) continue;
    const numCell = cells[1].replace(/\*/g, '').trim();
    const body = cells[2];
    // `N = name` anywhere in the body, e.g. the 14–15 row's "15 = environment and energy".
    for (const m of body.matchAll(/(\d{1,2})\s*=\s*([^.|*]+)/g)) {
      names.set(Number(m[1]), m[2].trim().toLowerCase());
    }
    if (!/^\d{1,2}$/.test(numCell)) continue;
    // Otherwise the first bold span in the body is the name.
    const bold = body.match(/\*\*([^*]+)\*\*/);
    if (bold) {
      const nm = bold[1].replace(/[—–-].*$/, '').trim().toLowerCase();
      if (nm && !/^inserted\b/i.test(nm) && !/^not safe\b/i.test(nm)) names.set(Number(numCell), nm);
    }
  }
  if (!names.has(16)) throw new Error('phase-name-consistency: no name parsed for phase 16 — the canary row is unreadable, aborting');
  return names;
}

function trackedTextFiles() {
  const out = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' }).trim().split('\n');
  return out.filter((f) => /\.(md|txt|json|ts|tsx|mjs|js)$/.test(f));
}

/** @returns {{file:string,line:number,phase:number,found:string[],expected:string,exempt:string|null,context:string}[]} */
export function findAssertions(names, files, readFile) {
  const vocab = [
    ...[...names.values()].map((n) => ({ name: n, superseded: false })),
    ...SUPERSEDED_NAMES.map((s) => ({ name: s.name.toLowerCase(), superseded: true })),
  ];
  const hits = [];
  for (const file of files) {
    if (file === SELF) continue; // out of scope by name — see the SELF comment
    let text;
    try { text = readFile(file); } catch { continue; }
    if (!text.includes('hase')) continue;
    for (const m of text.matchAll(ASSERTION)) {
      const phase = Number(m[1]);
      const expected = names.get(phase);
      if (!expected) continue; // the table names no phase there; nothing to check against
      // THE WINDOW STOPS AT A PARAGRAPH OR TABLE-ROW BOUNDARY. A fixed character window is a
      // silent-miss generator in the other direction too: the first live run read past the end of
      // one table row into the next and reported "phase 12 is checked" as asserting the name
      // "environment and energy", which is the row below it. A name assertion lives in its own
      // sentence, and a sentence may wrap a line but never crosses a blank line or a table row.
      //
      // IT ALSO STOPS AT THE NEXT ASSERTION. Without that, a paragraph reading "phase 16 is X …
      // phase 16 is Y" passes on the second name being inside the first one's window, so a wrong
      // name escapes whenever a right one happens to sit near it — a hole that widens silently with
      // the window. Each assertion is scored against its own span.
      let raw = text.slice(m.index, m.index + WINDOW);
      const nextAssertion = raw.slice(1).search(ASSERTION_ONCE);
      const stops = ['\n\n', '\n|'].map((d) => { const i = raw.indexOf(d); return i === -1 ? raw.length : i; });
      if (nextAssertion !== -1) stops.push(nextAssertion + 1);
      const after = normSpace(raw.slice(0, Math.min(...stops))).toLowerCase();
      const found = vocab.filter((v) => after.includes(v.name)).map((v) => v.name);
      if (found.length === 0) continue; // asserts something other than a name ("phase 12 is checked")
      if (found.includes(expected)) continue; // agrees with the table
      const before = text.slice(Math.max(0, m.index - LOOKBACK), m.index);
      let exempt = null;
      const ao = APPEND_ONLY.find((a) => a.file === file);
      // Most specific reason first, so the report says which rule actually governs: a local
      // withdrawal clause is a narrower claim than "this whole file is superseded", and a file
      // exempted at document level when one paragraph would do reads as more obsolete than it is.
      if (ao) exempt = `append-only: ${ao.why}`;
      else if (SUPERSESSION.test(before)) exempt = 'governed by a supersession clause within the preceding window';
      else if (SUPERSESSION.test(text.slice(0, DOC_HEAD))) exempt = 'the file declares itself superseded in its own head';
      hits.push({
        file,
        line: text.slice(0, m.index).split('\n').length,
        phase,
        found,
        expected,
        exempt,
        context: normSpace(text.slice(m.index, m.index + 120)),
      });
    }
    // TABLE ROWS — the number and the name live in different cells, so no connective reaches them.
    for (const m of text.matchAll(TABLE_ROW)) {
      const phase = Number(m[1]);
      const expected = names.get(phase);
      if (!expected) continue;
      const cell = normSpace(m[2]).toLowerCase();
      const found = vocab.filter((v) => cell.includes(v.name)).map((v) => v.name);
      if (found.length === 0 || found.includes(expected)) continue;
      const before = text.slice(Math.max(0, m.index - LOOKBACK), m.index);
      const ao = APPEND_ONLY.find((a) => a.file === file);
      const exempt = ao
        ? `append-only: ${ao.why}`
        : SUPERSESSION.test(before)
          ? 'governed by a supersession clause within the preceding window'
          : SUPERSESSION.test(text.slice(0, DOC_HEAD))
            ? 'the file declares itself superseded in its own head'
            : null;
      hits.push({
        file,
        line: text.slice(0, m.index).split('\n').length,
        phase,
        found,
        expected,
        exempt,
        context: normSpace(m[0]).slice(0, 120),
      });
    }
  }
  return hits;
}

function run() {
  const claudeMd = readFileSync(join(ROOT, 'CLAUDE.md'), 'utf8');
  const names = phaseTable(claudeMd);
  const files = trackedTextFiles();
  const hits = findAssertions(names, files, (f) => readFileSync(join(ROOT, f), 'utf8'));
  const bad = hits.filter((h) => !h.exempt);

  if (VERBOSE) {
    for (const h of hits) {
      console.log(`  ${h.exempt ? 'EXEMPT' : 'FAIL  '} ${h.file}:${h.line}  phase ${h.phase} → found "${h.found.join('", "')}" · table says "${h.expected}"`);
      if (h.exempt) console.log(`         ${h.exempt}`);
    }
  }
  if (bad.length) {
    console.error(`phase-name-consistency: ${bad.length} assertion(s) name a phase against CLAUDE.md's table, with nothing in the preceding ${LOOKBACK} characters saying the name is superseded:\n`);
    for (const h of bad) {
      console.error(`  ${h.file}:${h.line}`);
      console.error(`    asserts : "${h.found.join('", "')}"  for phase ${h.phase}`);
      console.error(`    table   : "${h.expected}"`);
      console.error(`    context : ${h.context}`);
      console.error(`    fix     : correct it, or state in the surrounding text that the name was withdrawn and when.\n`);
    }
    process.exit(1);
  }
  console.log(
    `phase-name-consistency: ${files.length} tracked text files · ${names.size} phases named in the table · ` +
      `${SUPERSEDED_NAMES.length} superseded name(s) in scope · ${hits.length} disagreeing assertion(s), ` +
      `${hits.filter((h) => h.exempt).length} exempted by name`,
  );
}

/**
 * TWO-SIDED CONTROL. A negative alone proves the needle absent, not the search working — so the
 * positive passes THROUGH the restriction the negative depends on: it is a real phase-16 assertion
 * carrying a real superseded name, differing from the exempt cases only in that no supersession
 * clause governs it.
 */
function control() {
  const claudeMd = readFileSync(join(ROOT, 'CLAUDE.md'), 'utf8');
  const names = phaseTable(claudeMd);
  let failures = 0;
  const check = (label, ok, detail) => {
    if (!ok) { failures++; console.error(`  control FAILED: ${label}${detail ? ` — ${detail}` : ''}`); }
    return ok;
  };

  // 1. POSITIVE — a real contradiction, unmarked, must be named.
  const seeded = 'Scoping note.\n\nPhase 16 is the counterfactual engine, and the work begins there.\n';
  const p = findAssertions(names, ['SEEDED.md'], () => seeded);
  check('a bare contradiction is named', p.length === 1 && !p[0].exempt, `got ${p.length} hit(s), exempt=${p[0]?.exempt}`);

  // 2. NEGATIVE, through the same restriction — the SAME sentence, governed by a supersession clause.
  const corrected = 'CORRECTED 2026-08-06. This paragraph read: "Phase 16 is the counterfactual engine, and the work begins there." That was withdrawn on the operator correction.\n';
  const c = findAssertions(names, ['CORRECTED.md'], () => corrected);
  check('the same sentence inside a correction is exempted', c.length === 1 && !!c[0].exempt, `got ${c.length} hit(s), exempt=${c[0]?.exempt}`);

  // 3. NEGATIVE — the append-only log is exempt by name, on the same unmarked sentence.
  const a = findAssertions(names, ['docs/verification-log.md'], () => seeded);
  check('the append-only log is exempted by name', a.length === 1 && /append-only/.test(a[0].exempt ?? ''), `exempt=${a[0]?.exempt}`);

  // 4. NEGATIVE — an assertion that names no phase at all is not a name assertion.
  const n = findAssertions(names, ['OTHER.md'], () => 'the delimitation overlap with phase 12 is checked, and phase 16 is next\n');
  check('a non-name assertion is not examined', n.length === 0, `got ${n.length} hit(s)`);

  // 4a. NEGATIVE — the window must not read across a table-row boundary into the row below. This is
  // the defect the first live run exposed, and it is a control rather than a comment because a
  // window that grows by one delimiter reintroduces it silently.
  const tbl = findAssertions(names, ['TABLE.md'], () =>
    '| 13 | | **NOT SAFE** until the overlap with phase 12 is checked |\n| 14–15 | 15 = environment and energy | closed |\n');
  check('the window stops at a table-row boundary', tbl.length === 0, `got ${tbl.length} hit(s): ${JSON.stringify(tbl.map((h) => h.found))}`);

  // 4b. POSITIVE through the same restriction — a name that wraps a line, in one paragraph, is
  // still found. Without this the fix above could be "stop at the first newline" and pass.
  const wrap = findAssertions(names, ['WRAP.md'], () => 'Two operator answers: phase 16 is the\ncounterfactual engine, in one place.\n');
  check('a name wrapping a line is still found', wrap.length === 1 && !wrap[0].exempt, `got ${wrap.length} hit(s)`);

  // 4f. POSITIVE — A HEADING. The exact form that escaped the gate before 2026-08-06: a number and a
  // name with no verb between them. Asserted on the collision as it stood at `c34e83a`.
  const head = findAssertions(names, ['HEAD.md'], () => '# Phase 17 — design lock. State. OPEN.\n');
  check('a heading with a dash is named', head.length === 1 && !head[0].exempt, `got ${head.length} hit(s)`);

  // 4g. POSITIVE — a colon heading, the other punctuation a title takes.
  const colon = findAssertions(names, ['COLON.md'], () => '## Phase 16: the counterfactual engine\n');
  check('a heading with a colon is named', colon.length === 1 && !colon[0].exempt, `got ${colon.length} hit(s)`);

  // 4h. POSITIVE — A TABLE ROW. The number and the name are in different cells, so no connective
  // pattern reaches them and this needs its own pass.
  const row = findAssertions(names, ['ROW.md'], () => '| # | phase | state |\n| **17** | **design lock** — the site | next |\n');
  check('a table row is named', row.length === 1 && !row[0].exempt, `got ${row.length} hit(s): ${JSON.stringify(row.map((h) => h.found))}`);

  // 4i. NEGATIVE through the same restriction — a table row whose name AGREES with the table passes,
  // which is what makes CLAUDE.md's own table self-validating rather than exempted.
  const rowOk = findAssertions(names, ['ROWOK.md'], () => '| **16** | **shocks calibration** — the corpus | closed |\n');
  check('a table row that agrees passes', rowOk.length === 0, `got ${rowOk.length} hit(s)`);

  // 4e. NEGATIVE — the gate's own source is out of scope BY NAME, not by a coincidence of its prose.
  // Asserted on the seeded sentence, which is exactly what its own controls contain.
  const self = findAssertions(names, [SELF], () => 'Phase 16 is the counterfactual engine.\n');
  check('the gate excludes its own source by name', self.length === 0, `got ${self.length} hit(s)`);

  // 4d. POSITIVE — two assertions in one paragraph are scored separately, so a wrong name is not
  // rescued by a right one sitting inside its window.
  const two = findAssertions(names, ['TWO.md'], () =>
    'This read: phase 16 is the counterfactual engine, in one place. Phase 16 is shocks calibration.\n');
  check('two assertions in one paragraph are scored separately', two.length === 1 && !two[0].exempt, `got ${two.length} hit(s)`);

  // 4c. NEGATIVE — a file that declares itself superseded in its own head is exempt throughout,
  // including far past the lookback window.
  const doc = findAssertions(names, ['OLD.md'], () =>
    'SUPERSEDED 2026-08-06 — written while the question was open.\n' + 'filler. '.repeat(300) + '\nPhase 16 is the counterfactual engine.\n');
  check('a file superseded in its head is exempt throughout', doc.length === 1 && /own head/.test(doc[0].exempt ?? ''), `exempt=${doc[0]?.exempt}`);

  // 5. NEGATIVE — the correct name passes.
  const g = findAssertions(names, ['GOOD.md'], () => 'Phase 16 is shocks calibration; the counterfactual engine is declined.\n');
  check('the table\'s own name passes', g.length === 0, `got ${g.length} hit(s)`);

  // 6. THE AUTHORITY ABORTS RATHER THAN FALLING BACK.
  let aborted = false;
  try { phaseTable(claudeMd.replace('### THE PHASE LIST', '### THE PHASE LIST MOVED AWAY').replace(/\| \*\*16\*\*[^\n]*\n/, '')); }
  catch { aborted = true; }
  check('a table that has moved or lost phase 16 aborts', aborted);

  if (failures) { console.error(`phase-name-consistency control: ${failures} control(s) failed`); process.exit(1); }
  console.log('phase-name-consistency control: a bare contradiction is named; the same sentence inside a correction, the append-only log, a non-name assertion and the correct name all pass; a moved table aborts — the checker fails when it should');
}

if (argv.includes('--control')) control();
else run();
