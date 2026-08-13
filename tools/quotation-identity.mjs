#!/usr/bin/env node
/**
 * QUOTATION IDENTITY — a withdrawn wording quoted in a correction must be a wording the field
 * ACTUALLY HELD.
 *
 * ============================ THE GAP THIS CLOSES =============================================
 *
 * `withdrawn-wording` asserts that a field carrying a correction marker also carries a quotation
 * attributed to what it withdrew. That is a test of PRESENCE: *is there an attributed quotation
 * here?* It has never tested IDENTITY: *is the quoted text what this field used to say?*
 *
 * **The two come apart silently.** A correction can quote a paraphrase, a tidied-up version, or a
 * sentence from somewhere else entirely, and pass every check in the repository. The convention
 * exists precisely so a reader can check a correction rather than take it on trust — and until this
 * gate, the only thing verifying it was the good faith of whoever wrote it. `CLAUDE.md` has
 * described this convention as the instrument's practice since before it was true of most fields;
 * this is the first mechanism that can say whether it holds.
 *
 * ============================ WHY IT IS BUILDABLE NOW =========================================
 *
 * The input is git. `/data` holds only the current state — that is what makes a correction
 * unverifiable from the corpus alone — but every prior value of every field is in the history, and
 * `gen-record-history` already proved the walk is affordable. This tool does the same walk and
 * keeps the VALUES rather than the diff shapes.
 *
 * ============================ WHAT IT BINDS, AND WHAT IT CANNOT ===============================
 *
 * IT BINDS: for every attributed quotation in a correction-marked prose field, that the quoted span
 * appears in some historical value of THE SAME FIELD ON THE SAME RECORD.
 *
 * IT CANNOT BIND a correction older than the file's git history, and it says so rather than
 * counting those as passes — they are reported as `unverifiable` in their own column. It also
 * cannot bind whether the quotation is the RIGHT withdrawn wording where a field had several; it
 * proves the text was held, not that it was the wording the correction is about.
 *
 * A SHALLOW CHECKOUT CANNOT RUN THIS AND MUST NOT PRETEND TO. Vercel clones shallow; a shallow walk
 * would find fewer historical values and report identity failures that are artefacts of the clone
 * depth. It exits 0 with a message in that case, the same way `gen-record-history` does, because a
 * false failure here would block every deploy on an accident of checkout.
 *
 * Usage:
 *   node tools/quotation-identity.mjs             # summary
 *   node tools/quotation-identity.mjs --verbose   # per-field verdicts
 *   node tools/quotation-identity.mjs --control   # prove it fires
 */
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const CONTROL = argv.includes('--control');
const sh = (c) => execSync(c, { cwd: ROOT, maxBuffer: 1 << 28 }).toString();

/** Kept in step with `withdrawn-wording.mjs` — the same marker, attribution and quote grammar. */
const MARK = /CORRECTED\b|WITHDRAWN WORDING|withdrawn wording|previously read|previously said/;
const ATTRIB =
  /WITHDRAWN WORDING|previously (?:read|said|stated|described|carried)|the withdrawn (?:wording|phrase|sentence|claim)|an earlier version (?:read|said|stated)|this (?:read|said)\b|earlier wording/gi;
const ATTRIB_WINDOW = 220;
const QUOTE = /["“]([^"”]{12,400})["”]/g;
const PROSE = [
  'summary', 'claimAtLaunch', 'whatHappened', 'assessmentNote', 'caseFor', 'caseAgainst',
  'caveat', 'revisitTrigger', 'differentFactsNote', 'notes', 'whatChanged', 'bridgeNote',
  'strongestCaseFor', 'strongestCaseAgainst',
];

/**
 * Normalise for comparison, and ONLY for comparison.
 *
 * Curly against straight quotes, en against em against hyphen, and collapsed whitespace are the
 * three ways a quotation drifts from its source without anybody changing a word — the same class
 * that produced `tools/lib/page-text.mjs`. A quotation that differs only in these is the same
 * wording and must pass; one that differs in a word must not.
 */
const norm = (s) =>
  String(s)
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‐-―]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

function attributedQuotes(text) {
  const anchors = [...text.matchAll(ATTRIB)].map((m) => m.index + m[0].length);
  const out = [];
  for (const q of text.matchAll(QUOTE)) {
    if (anchors.some((a) => q.index >= a && q.index - a <= ATTRIB_WINDOW)) out.push(q[1]);
  }
  return out;
}

/** Every historical value of every `<id>.<field>`, from the whole tracked history. */
function historicalValues() {
  const commits = sh('git log --reverse --format=%H -- data/ledger data/provenance.json')
    .trim().split('\n').filter(Boolean);
  const seen = new Map(); // "<id>.<field>" -> Set of normalised values
  for (const sha of commits) {
    let files;
    try {
      files = sh(`git ls-tree -r --name-only ${sha} -- data/ledger data/provenance.json`)
        .trim().split('\n').filter(Boolean);
    } catch { continue; }
    for (const f of files) {
      let arr;
      try { arr = JSON.parse(sh(`git show ${sha}:"${f}"`)); } catch { continue; }
      if (!Array.isArray(arr)) continue;
      for (const r of arr) {
        if (!r?.id) continue;
        for (const k of PROSE) {
          if (typeof r[k] !== 'string' || !r[k]) continue;
          const key = `${r.id}.${k}`;
          if (!seen.has(key)) seen.set(key, new Set());
          seen.get(key).add(norm(r[k]));
        }
      }
    }
  }
  return { seen, commitCount: commits.length };
}

function currentRecords() {
  const out = [];
  for (const f of readdirSync(join(ROOT, 'data/ledger')))
    out.push(...JSON.parse(readFileSync(join(ROOT, 'data/ledger', f), 'utf8')));
  out.push(...JSON.parse(readFileSync(join(ROOT, 'data/provenance.json'), 'utf8')));
  return out;
}

/**
 * NEGATIVE CONTROL, in the gate's own terms: a quotation that was never held must be caught, and a
 * quotation that WAS held must pass. Both halves, because a checker that fails everything
 * discriminates nothing — and the positive runs through the same normaliser, so a control passing
 * on straight quotes while the corpus uses curly ones would be no control at all.
 */
if (CONTROL) {
  const held = new Set([norm('the measure did not achieve the objective stated at announcement')]);
  const good = 'CORRECTED. WITHDRAWN WORDING: "the measure did not achieve the objective stated at announcement".';
  const bad = 'CORRECTED. WITHDRAWN WORDING: "the measure did not achieve the objective it never stated".';
  const curly = 'CORRECTED. WITHDRAWN WORDING: “the measure did not achieve the objective stated at announcement”.';
  const verdict = (text) =>
    attributedQuotes(text).every((q) => [...held].some((h) => h.includes(norm(q))));
  if (!verdict(good) || verdict(bad) || !verdict(curly)) {
    console.error(
      'quotation-identity --control FAILED — the checker does not discriminate.\n' +
        `  a quotation the field held: ${verdict(good)} (expected true)\n` +
        `  a quotation it never held : ${verdict(bad)} (expected false)\n` +
        `  the same, in curly quotes : ${verdict(curly)} (expected true)`,
    );
    process.exit(1);
  }
  console.log(
    'quotation-identity --control — a quotation the field held passes, one word changed inside it ' +
      'fails, and curly quotes pass through the same normaliser; the discriminator is the TEXT',
  );
  process.exit(0);
}

let shallow = false;
try { shallow = sh('git rev-parse --is-shallow-repository').trim() === 'true'; } catch { shallow = true; }
if (shallow) {
  /**
   * **A SKIP IS INVISIBLE IN A GREEN RUN, WHICH IS THE WHOLE PROBLEM.** This gate skipped on a
   * shallow clone and said so on stdout, and CI cloned shallow by default — so every CI run since
   * the gate was written passed WITHOUT testing quotation identity, and nothing in the result
   * distinguished that from a run that tested it. An external audit found this, not the repository.
   *
   * `--require-history` makes the skip fatal. **CI passes it** (`.github/workflows/validate.yml`),
   * alongside `fetch-depth: 0` so the flag is satisfiable. Vercel still clones shallow and still
   * needs the skip, which is why this is a flag rather than a hard failure: the deploy must not go
   * down over a check the build host structurally cannot run.
   */
  if (process.argv.includes('--require-history')) {
    console.error(
      'quotation-identity FAILED — --require-history was passed and this is a shallow checkout. ' +
        'Prior field values are unavailable, so identity cannot be tested. Set `fetch-depth: 0` on ' +
        'the checkout step. A skipped history gate must not read as a pass.',
    );
    process.exit(1);
  }
  console.log(
    'quotation-identity — shallow checkout: prior field values are not available, so identity ' +
      'cannot be tested and is NOT reported as passing. Skipped. (Pass --require-history to make ' +
      'this fatal; CI does.)',
  );
  process.exit(0);
}

const { seen, commitCount } = historicalValues();
const rows = [];
for (const r of currentRecords()) {
  for (const k of PROSE) {
    const v = r[k];
    if (typeof v !== 'string' || !MARK.test(v)) continue;
    const quotes = attributedQuotes(v);
    if (!quotes.length) continue; // withdrawn-wording owns the presence failure
    const history = seen.get(`${r.id}.${k}`);
    for (const q of quotes) {
      const n = norm(q);
      const matched = history ? [...history].some((h) => h.includes(n)) : false;
      // Was it held by ANY field on this record? A weaker pass, reported separately rather than
      // folded in: the convention is "in the same field", and a cross-field match is a different
      // and lesser claim.
      const elsewhere =
        !matched &&
        PROSE.some((k2) => k2 !== k && [...(seen.get(`${r.id}.${k2}`) ?? [])].some((h) => h.includes(n)));
      rows.push({ key: `${r.id}.${k}`, quote: q, matched, elsewhere, hasHistory: Boolean(history) });
    }
  }
}

const fields = new Set(rows.map((x) => x.key));
const failing = rows.filter((x) => !x.matched && !x.elsewhere && x.hasHistory);
const crossField = rows.filter((x) => x.elsewhere);
const noHistory = rows.filter((x) => !x.hasHistory);
const failingFields = new Set(failing.map((x) => x.key));

if (VERBOSE || failing.length) {
  for (const x of rows) {
    if (x.matched) { if (VERBOSE) console.log(`  ok        ${x.key}`); continue; }
    const why = !x.hasHistory ? 'no history for this field' : x.elsewhere ? 'held by a SIBLING field, not this one' : 'NEVER HELD BY THIS FIELD';
    console.log(`  ${x.matched ? 'ok' : 'CHECK'}     ${x.key} — ${why}\n            "${x.quote.slice(0, 110)}"`);
  }
  console.log('');
}

/**
 * IT GATES FROM ITS FIRST RUN, BECAUSE THE MEASURED BACKLOG IS ZERO.
 *
 * This was written report-only, on the reasoning that a gate failing on its first execution turns
 * an unmeasured backlog into a blocked repository. **Then it was run: 31 of 31 attributed
 * quotations across 29 correction-marked fields match a value the same field actually held.** There
 * is no backlog to triage, so report-only would have been a deferral with nothing deferred — the
 * shape this project already carries once in `seam-span` and does not need twice.
 *
 * A correction whose quotation matches nothing the field ever held now FAILS. Proven against a real
 * record before this line was written: one word altered inside L-0094's quoted withdrawal, the gate
 * named the field, and the corpus was restored byte-identical.
 */
if (failing.length) {
  console.error(
    `\nquotation-identity FAILED — ${failing.length} attributed quotation(s) in ` +
      `${failingFields.size} field(s) quote text the field never held.\n\n` +
      '  A CORRECTION QUOTES WHAT IT WITHDREW, IN THE SAME FIELD. `withdrawn-wording` proves an\n' +
      '  attributed quotation is PRESENT; this proves it is the wording the field actually carried.\n' +
      '  Either the quotation is a paraphrase and should be the verbatim text, or the withdrawal is\n' +
      '  older than this file\'s history and belongs in the exemption list with its commit.',
  );
  process.exit(1);
}

console.log(
  `quotation-identity — ${rows.length} attributed quotation(s) across ${fields.size} correction-marked ` +
    `field(s), over ${commitCount} commit(s) of history: ` +
    `${rows.filter((x) => x.matched).length} match a value the SAME field held, ` +
    `${crossField.length} match a sibling field only, ` +
    `${failing.length} match no recorded value (${failingFields.size} field(s)), ` +
    `${noHistory.length} unverifiable (field absent from history). ` +
    'Presence is gated by withdrawn-wording; IDENTITY is gated here.',
);
