#!/usr/bin/env node
/**
 * WITHDRAWN WORDING — a correction states what it withdrew, in quotation marks, in the same field,
 * and no sibling field on the record still asserts it.
 *
 * WHY IT COULD NOT BE BUILT BEFORE. On 2026-08-06 this convention was true of 6 fields out of 30
 * while being described in CLAUDE.md as the instrument's practice. A gate built then would have
 * tested 6 fields and passed 24 by having nothing to look at — a control that reports green because
 * it is looking at an empty set. The convention came first, the backfill second, and the gate third.
 *
 * THE DISCRIMINATOR, and it is the whole difficulty. The backfill used "does the field contain a
 * quoted span" as its proxy for "does the field quote what it withdrew", and a proxy cannot tell
 * one quotation from another. Two fields proved it: L-0011's note quotes the verdict vocabulary it
 * is reasoning about and withdrew nothing, and L-0018's note quotes a ministry's phrase while
 * PARAPHRASING the characterisation it actually withdrew. Both read as compliant to a quote test
 * and neither is. So the test here is not that a quotation exists but that a quotation is
 * GOVERNED BY A WITHDRAWAL ATTRIBUTION — a clause naming the text as previously carried and now
 * withdrawn, within a short window before the quote opens.
 *
 * THE SECOND ASSERTION is the one the convention exists for. L-0114 is the case: the summary's
 * universal claim was corrected on 5 August and the same claim survived in the `caveat`, because
 * the correction pass searched for a word that sentence omitted. So for every withdrawn span, no
 * OTHER prose field on the same record may still contain it. Matched on a 60-character contiguous
 * window through the gate's own normaliser, which is exact enough to have no false positives and
 * loose enough to catch a sentence that differs by a word.
 *
 * GUARDED OR EXEMPTED BY NAME, NO THIRD STATE. A correction-marked field either carries an
 * attributed quotation or is named in EXEMPT below with its reason. The one exemption is not a gap:
 * the convention does not apply where the FIELD DID NOT EXIST before the correction, because
 * nothing was withdrawn.
 *
 * Usage:
 *   node tools/withdrawn-wording.mjs
 *   node tools/withdrawn-wording.mjs --control   four seeded controls, then exit
 *   node tools/withdrawn-wording.mjs --refresh   regenerate the exemption file from git history
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { norm } from './lib/page-text.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * A field has been corrected. THE SUBJECT IS REQUIRED and `previously carried` alone is not
 * enough: P-112's note reads "not previously carried anywhere in this instrument", which describes
 * a finding as new and withdraws nothing. A marker that fires on the adverb rather than on a
 * self-reference puts ordinary prose into the scope of a correction gate.
 */
const MARK =
  /CORRECTED \d{4}-\d{2}-\d{2}|has been corrected|(?:record|note|field|entry|summary|caveat|version) previously (?:read|said|stated|described|carried)|previously read/i;

/**
 * A clause that attributes text to the record's own superseded state. The quotation must open
 * within ATTRIB_WINDOW characters after one of these, which is what separates a withdrawn wording
 * from any other quoted span in the same paragraph.
 */
const ATTRIB =
  /WITHDRAWN WORDING|previously (?:read|said|stated|described|carried)|the withdrawn (?:wording|phrase|sentence|claim)|an earlier version (?:read|said|stated)|this (?:read|said)\b|earlier wording/gi;
const ATTRIB_WINDOW = 220;
const QUOTE = /["“]([^"”]{12,400})["”]/g;

/**
 * EXEMPTIONS, held in a committed file rather than inline, because there are 34 of them and they
 * are not judgements — each records that the field DID NOT EXIST before the correction created it,
 * with the commit at which it was absent. `--refresh` regenerates the file by walking each data
 * file's history; the gate reads it and requires every entry to carry a reason and a commit, so an
 * exemption can be audited rather than taken on trust.
 *
 * THE SIZE OF THIS LIST IS ITSELF A FINDING. Thirty-three of the entries come from one sweep on
 * 2026-08-05 that wrote assessment notes for records carrying a verdict with no stated reasoning.
 * Those notes corrected an ABSENCE, and a correction of an absence has no withdrawn wording — the
 * same case as L-0011, thirty-three times over. It was invisible until this gate existed because
 * the backfill's marker did not recognise "this record previously carried".
 */
const EXEMPT_FILE = join(ROOT, 'tools/lib/withdrawn-wording-exemptions.json');
const EXEMPT = Object.fromEntries(
  JSON.parse(readFileSync(EXEMPT_FILE, 'utf8')).entries.map((e) => [`${e.id}.${e.field}`, e]),
);

/** Prose fields, per layer — the same set the render gates treat as prose. */
const PROSE = [
  'summary', 'claimAtLaunch', 'whatHappened', 'assessmentNote', 'caseFor', 'caseAgainst',
  'caveat', 'revisitTrigger', 'differentFactsNote', 'notes', 'whatChanged', 'bridgeNote',
  'strongestCaseFor', 'strongestCaseAgainst',
];

function load() {
  const out = [];
  for (const f of readdirSync(join(ROOT, 'data/ledger')))
    out.push(...JSON.parse(readFileSync(join(ROOT, 'data/ledger', f), 'utf8')).map((r) => ({ layer: 'ledger', r })));
  for (const r of JSON.parse(readFileSync(join(ROOT, 'data/provenance.json'), 'utf8')))
    out.push({ layer: 'provenance', r });
  return out;
}

/** Every quotation in `text` that an attribution clause governs. */
function attributedQuotes(text) {
  const anchors = [...text.matchAll(ATTRIB)].map((m) => m.index + m[0].length);
  const out = [];
  for (const q of text.matchAll(QUOTE)) {
    if (anchors.some((a) => q.index >= a && q.index - a <= ATTRIB_WINDOW)) out.push(q[1]);
  }
  return out;
}

/**
 * Text in a sibling that is itself marked as superseded — a preserved previous note, or a
 * quotation the sibling attributes to what IT withdrew — is not the sibling asserting it. Without
 * this, the pass of 2026-08-06 makes every rescored record fail its own gate, because each
 * rescored note ends with the previous note preserved verbatim.
 */
function liveText(s) {
  return s
    .replace(/PREVIOUS NOTE, PRESERVED VERBATIM:[\s\S]*$/, '')
    .replace(/WITHDRAWN WORDING[\s\S]*?["“][^"”]*["”]/g, '')
    .replace(/(?:record|note|field|entry|summary|caveat|version) previously (?:read|said|stated|described|carried)[\s\S]{0,220}?["“][^"”]*["”]/gi, '');
}

/** Does `hay` still contain any 60-character window of `needle`? */
function stillAsserts(hay, needle) {
  const h = norm(liveText(hay)).replace(/\s+/g, ' ');
  const n = norm(needle).replace(/\s+/g, ' ');
  if (n.length < 60) return h.includes(n) && n.length >= 25;
  for (let i = 0; i + 60 <= n.length; i += 10) if (h.includes(n.slice(i, i + 60))) return true;
  return false;
}

/** The whole check, over a supplied corpus so the controls can seed one. */
function check(records) {
  const failures = [];
  let attributed = 0;
  let exempted = 0;
  let siblingsChecked = 0;

  for (const { r } of records) {
    for (const field of PROSE) {
      const v = r[field];
      if (typeof v !== 'string' || !MARK.test(v)) continue;
      const key = `${r.id}.${field}`;

      if (EXEMPT[key]) {
        const e = EXEMPT[key];
        if (!e.reason || !/^[0-9a-f]{7,40}$/.test(e.fieldAbsentAt ?? '')) {
          failures.push(`${key}: exempted without a reason or without the commit at which the field was absent`);
        }
        exempted += 1;
        continue;
      }
      const quotes = attributedQuotes(v);
      if (!quotes.length) {
        failures.push(
          `${key}: carries a correction and no quotation attributed to what it withdrew. ` +
            (QUOTE.test(v)
              ? 'It DOES contain a quoted span — that is not the same thing, and is the exact confusion this gate exists to refuse.'
              : 'Quote the withdrawn wording, or exempt the field by name in tools/withdrawn-wording.mjs with the reason.'),
        );
        QUOTE.lastIndex = 0;
        continue;
      }
      attributed += 1;

      for (const q of quotes) {
        for (const sib of PROSE) {
          if (sib === field || typeof r[sib] !== 'string') continue;
          siblingsChecked += 1;
          if (stillAsserts(r[sib], q)) {
            failures.push(
              `${key}: the wording it withdrew is still asserted in \`${r.id}.${sib}\` — ` +
                `"${q.slice(0, 90)}…". A correction that fixes one field and leaves the withdrawn claim ` +
                `standing in a sibling has published two incompatible sentences and marked the wrong one authoritative.`,
            );
          }
        }
      }
    }
  }
  return { failures, attributed, exempted, siblingsChecked };
}

/* ------------------------------------------------------------------ refresh */

if (process.argv.includes('--refresh')) {
  const { execFileSync } = await import('node:child_process');
  const { writeFileSync } = await import('node:fs');
  const git = (...a) => execFileSync('git', a, { encoding: 'utf8', cwd: ROOT, maxBuffer: 1 << 28 });
  const dataFiles = [...readdirSync(join(ROOT, 'data/ledger')).map((x) => `data/ledger/${x}`), 'data/provenance.json'];
  const entries = [];
  for (const file of dataFiles) {
    const cur = JSON.parse(readFileSync(join(ROOT, file), 'utf8'));
    const targets = [];
    for (const r of cur)
      for (const k of PROSE)
        if (typeof r[k] === 'string' && MARK.test(r[k]) && !attributedQuotes(r[k]).length)
          targets.push({ id: r.id, field: k, now: r[k] });
    if (!targets.length) continue;
    const snaps = [];
    for (const sha of git('log', '--format=%H', '--', file).trim().split('\n').filter(Boolean)) {
      try { snaps.push({ sha, map: new Map(JSON.parse(git('show', `${sha}:${file}`)).map((r) => [r.id, r])) }); } catch { /* unparseable revision */ }
    }
    for (const t2 of targets) {
      for (const s of snaps) {
        const rec = s.map.get(t2.id);
        if (!rec) break;
        if (rec[t2.field] === undefined) {
          entries.push({
            id: t2.id, field: t2.field, fieldAbsentAt: s.sha,
            reason: 'THE FIELD DID NOT EXIST before the correction, which created it rather than replacing anything. Nothing was withdrawn, so nothing is quoted.',
          });
          break;
        }
        if (rec[t2.field] !== t2.now && !MARK.test(rec[t2.field])) break; // has a prior — backfill, do not exempt
      }
    }
  }
  writeFileSync(
    EXEMPT_FILE,
    `${JSON.stringify({ _comment: 'Generated by tools/withdrawn-wording.mjs --refresh. Each entry records that the field did not exist at the named commit, so its correction withdrew nothing. NOT a judgement — re-derivable from git.', refreshed: '2026-08-06', entries }, null, 2)}\n`,
  );
  console.log(`withdrawn-wording --refresh — ${entries.length} exemption(s) written to ${EXEMPT_FILE.replace(`${ROOT}/`, '')}`);
  process.exit(0);
}

/* ------------------------------------------------------------------ controls */

if (process.argv.includes('--control')) {
  const bad = [];
  const live = load();
  const clone = () => JSON.parse(JSON.stringify(live));

  // (1) FIRES ON A REAL FIELD WITH THE WORDING REMOVED. L-0122 was backfilled from git; strip the
  //     attributed quotation and the gate must name it.
  const a = clone();
  const t1 = a.find((x) => x.r.id === 'L-0122');
  t1.r.assessmentNote = t1.r.assessmentNote.replace(/ WITHDRAWN WORDING,[\s\S]*$/, '');
  const r1 = check(a).failures.filter((f) => f.startsWith('L-0122.assessmentNote'));
  if (r1.length !== 1) bad.push(`stripping L-0122's withdrawn wording produced ${r1.length} findings, expected 1`);

  // (2) THE DISCRIMINATOR. Put back a quotation that no attribution governs. A quote test passes
  //     this; this gate must not.
  const b = clone();
  const t2 = b.find((x) => x.r.id === 'L-0122');
  t2.r.assessmentNote =
    `${t2.r.assessmentNote.replace(/ WITHDRAWN WORDING,[\s\S]*$/, '')} The ministry called it "an institutional record rather than a measure".`;
  const r2 = check(b).failures.filter((f) => f.startsWith('L-0122.assessmentNote'));
  if (r2.length !== 1) bad.push(`an UNATTRIBUTED quotation produced ${r2.length} findings, expected 1 — the quote test is being used as the discriminator`);
  else if (!r2[0].includes('not the same thing')) bad.push('the unattributed-quotation failure does not say why a quoted span is insufficient');

  // (3) THE EXEMPTION HOLDS, AND IT IS THE EXEMPTION THAT CARRIES IT. L-0011 passes; with the
  //     exemption withdrawn the same field must fail, or the exemption is decorative and the field
  //     is passing on the quoted span it happens to contain.
  const withExempt = check(live).failures.filter((f) => f.startsWith('L-0011.assessmentNote'));
  if (withExempt.length) bad.push('L-0011 fails while exempted by name — the exemption is not being honoured');
  const saved = EXEMPT['L-0011.assessmentNote'];
  delete EXEMPT['L-0011.assessmentNote'];
  const without = check(live).failures.filter((f) => f.startsWith('L-0011.assessmentNote'));
  EXEMPT['L-0011.assessmentNote'] = saved;
  if (without.length !== 1) bad.push(`with the exemption removed L-0011 produced ${without.length} findings, expected 1 — it is passing on something other than the exemption`);

  // (4) THE SIBLING ASSERTION. Seed a sibling with the withdrawn span and it must be named.
  const d = clone();
  const t4 = d.find((x) => x.r.id === 'L-0114');
  const q = attributedQuotes(t4.r.caveat)[0];
  t4.r.revisitTrigger = `${t4.r.revisitTrigger} ${q}`;
  const r4 = check(d).failures.filter((f) => f.includes('L-0114.revisitTrigger'));
  if (r4.length < 1) bad.push('a sibling seeded with the withdrawn wording was not named');

  if (bad.length) {
    console.error(`withdrawn-wording --control FAILED\n${bad.map((x) => `  - ${x}`).join('\n')}`);
    process.exit(1);
  }
  console.log(
    'withdrawn-wording control: a stripped field is named; an UNATTRIBUTED quotation is still named, so the ' +
      'discriminator is attribution and not the presence of quote marks; the one exemption holds and fails when ' +
      'withdrawn; a sibling seeded with the withdrawn span is named',
  );
  process.exit(0);
}

/* ------------------------------------------------------------------ live */

const { failures, attributed, exempted, siblingsChecked } = check(load());

if (failures.length) {
  console.error(`withdrawn-wording FAILED — ${failures.length} finding(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error(
    '\n  A CORRECTION QUOTES WHAT IT WITHDREW, IN THE SAME FIELD, and no sibling field still asserts it.\n' +
      '  The withdrawn wording is usually recoverable — `node tools/backfill-withdrawn-wording.mjs --dry`\n' +
      '  walks the file history and prints the prior value for each correction-marked field.',
  );
  process.exit(1);
}

console.log(
  `withdrawn-wording OK — ${attributed} correction(s) quote what they withdrew, ${exempted} exempted by name, ` +
    `${siblingsChecked} sibling-field comparison(s), 0 withdrawn claims still asserted elsewhere`,
);
