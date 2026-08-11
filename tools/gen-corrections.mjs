#!/usr/bin/env node
/**
 * Emit `review/corrections.json` — for every corrected field, what it said before and what it says
 * now, reconstructed from git.
 *
 * ============================ WHY GIT AND NOT `/data` =========================================
 *
 * The correction convention keeps the withdrawn wording INSIDE the corrected field, so `/data`
 * carries the quotation. What it does not carry is **the sentence the quotation was lifted out
 * of** — the field as it actually read before anybody corrected it. A redline built from `/data`
 * alone would show the quotation against the field that quotes it, which is a circle.
 *
 * `quotation-identity` already proves every quotation matches a value the field really held; this
 * takes the same walk and keeps the whole prior value rather than a yes/no.
 *
 * ============================ WHAT `before` IS, PRECISELY =====================================
 *
 * The **latest historical value of that field that contains the quotation and is not the current
 * value.** Latest rather than earliest: a field corrected twice should show what it said immediately
 * before this correction, not what it said originally — the redline is of one edit, not of the
 * record's whole life, which is what `/corrections/`'s own history block is for.
 *
 * Where no such value exists the entry is omitted rather than guessed. That is not a failure mode
 * of this script: `quotation-identity` gates it and reports 31 of 31 matching, so an omission here
 * would mean the two disagree and is worth noticing.
 *
 * A SHALLOW CHECKOUT CANNOT PRODUCE THIS AND MUST NOT PRETEND TO — same guard, same reasoning as
 * `gen-record-history`. Vercel clones shallow; a shallow walk would find fewer prior values and
 * silently show a correction as having no before. The file is committed and this refuses to
 * overwrite it from a shallow checkout.
 *
 * Usage:  node tools/gen-corrections.mjs   ·   npm run corrections
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'review', 'corrections.json');
const sh = (c) => execSync(c, { cwd: ROOT, maxBuffer: 1 << 28 }).toString();

/** Kept in step with `withdrawn-wording` and `quotation-identity` — one grammar, three readers. */
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

const norm = (s) =>
  String(s).replace(/[‘’‛]/g, "'").replace(/[“”]/g, '"').replace(/[‐-―]/g, '-')
    .replace(/\s+/g, ' ').trim();

function attributedQuotes(text) {
  const anchors = [...text.matchAll(ATTRIB)].map((m) => m.index + m[0].length);
  const out = [];
  for (const q of text.matchAll(QUOTE)) {
    if (anchors.some((a) => q.index >= a && q.index - a <= ATTRIB_WINDOW)) out.push(q[1]);
  }
  return out;
}

let shallow = false;
try { shallow = sh('git rev-parse --is-shallow-repository').trim() === 'true'; } catch { shallow = true; }
if (shallow) {
  const kept = existsSync(OUT);
  console.log(
    `corrections — shallow checkout: history not reconstructed. ` +
      `${kept ? 'The committed review/corrections.json is used unchanged.' : 'NO committed file to fall back on.'}`,
  );
  process.exit(kept ? 0 : 1);
}

// Every historical value of every prose field, in commit order.
const commits = sh('git log --reverse --format=%H%x09%ad%x09%s --date=short -- data/ledger data/provenance.json')
  .trim().split('\n').filter(Boolean)
  .map((l) => { const [sha, date, subj] = l.split('\t'); return { sha, date, subj }; });

const seen = new Map(); // "<id>.<field>" -> [{ sha, date, subj, text }]
for (const c of commits) {
  let files;
  try {
    files = sh(`git ls-tree -r --name-only ${c.sha} -- data/ledger data/provenance.json`)
      .trim().split('\n').filter(Boolean);
  } catch { continue; }
  for (const f of files) {
    let arr;
    try { arr = JSON.parse(sh(`git show ${c.sha}:"${f}"`)); } catch { continue; }
    if (!Array.isArray(arr)) continue;
    for (const r of arr) {
      if (!r?.id) continue;
      for (const k of PROSE) {
        if (typeof r[k] !== 'string' || !r[k]) continue;
        const key = `${r.id}.${k}`;
        const list = seen.get(key) ?? [];
        if (!list.length || list[list.length - 1].text !== r[k]) {
          list.push({ sha: c.sha, date: c.date, subj: c.subj, text: r[k] });
        }
        seen.set(key, list);
      }
    }
  }
}

const current = [];
for (const f of sh('git ls-files data/ledger data/provenance.json').trim().split('\n')) {
  const arr = JSON.parse(readFileSync(join(ROOT, f), 'utf8'));
  if (Array.isArray(arr)) for (const r of arr) if (r?.id) current.push({ r, layer: f.includes('provenance') ? 'provenance' : 'ledger' });
}

const out = [];
let unmatched = 0;
for (const { r, layer } of current) {
  for (const k of PROSE) {
    const now = r[k];
    if (typeof now !== 'string' || !MARK.test(now)) continue;
    const quotes = attributedQuotes(now);
    if (!quotes.length) continue;
    const history = seen.get(`${r.id}.${k}`) ?? [];
    for (const q of quotes) {
      const n = norm(q);
      // The LATEST prior value carrying the quotation, excluding the current text itself.
      const prior = [...history].reverse().find((h) => h.text !== now && norm(h.text).includes(n));
      if (!prior) { unmatched += 1; continue; }
      // The commit that produced the current text, for the date shown beside the redline.
      const changedAt = [...history].reverse().find((h) => h.text === now);
      /**
       * THE CHANGED SPAN, computed here so the page does not recompute it 30 times.
       *
       * Corrections come in two shapes and one renderer has to carry both: **a pure APPEND**, where
       * the withdrawal is added and nothing in the body moves (four of these change 4-8 per cent of
       * the text), and **a full REWRITE**, where before and after share nothing (four change 100 per
       * cent). A common prefix and suffix expresses both — an append has an empty removed span, a
       * rewrite has an empty prefix.
       *
       * **Snapped to word boundaries.** A raw character diff cuts mid-word and renders a redline
       * that reads as a typo. The prefix walks back to the last space and the suffix forward to the
       * next, which costs a few characters of highlight and buys a legible one.
       */
      const diff = (() => {
        let i = 0;
        while (i < prior.text.length && i < now.length && prior.text[i] === now[i]) i += 1;
        while (i > 0 && !/\s/.test(prior.text[i - 1])) i -= 1;
        let k = 0;
        while (
          k < prior.text.length - i &&
          k < now.length - i &&
          prior.text[prior.text.length - 1 - k] === now[now.length - 1 - k]
        ) k += 1;
        while (k > 0 && !/\s/.test(now[now.length - k])) k -= 1;
        return {
          prefix: now.slice(0, i),
          removed: prior.text.slice(i, prior.text.length - k),
          added: now.slice(i, now.length - k),
          suffix: k ? now.slice(now.length - k) : '',
        };
      })();

      out.push({
        id: r.id,
        layer,
        field: k,
        title: r.title,
        quote: q,
        before: prior.text,
        after: now,
        beforeDate: prior.date,
        afterDate: changedAt?.date ?? null,
        afterSubject: changedAt?.subj ?? null,
        ...diff,
      });
    }
  }
}

out.sort((a, b) => (b.afterDate ?? '').localeCompare(a.afterDate ?? '') || a.id.localeCompare(b.id));
writeFileSync(OUT, `${JSON.stringify({ entries: out }, null, 1)}\n`);

const bytes = readFileSync(OUT).length;
console.log(
  `corrections OK — ${out.length} redline(s) across ${new Set(out.map((o) => o.id)).size} record(s), ` +
    `over ${commits.length} commit(s); ${unmatched} quotation(s) matched no prior value ` +
    `(quotation-identity gates that at 0) · ${(bytes / 1024).toFixed(0)} KB -> review/corrections.json`,
);
