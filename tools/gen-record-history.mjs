#!/usr/bin/env node
/**
 * Emit `review/record-history.json` — the per-record edit history of the ledger and provenance
 * layers, reconstructed from git.
 *
 * WHY THIS EXISTS. Two of the adversarial pass's selection criteria are historical rather than
 * textual — "records corrected more than once" and "records whose assessment changed after
 * shipping" — and neither is expressible from `/data`, which holds only the current state. The
 * corpus is additive-only and corrections are made in place, so the record that was corrected
 * three times looks exactly like the record that was written once. Only the history distinguishes
 * them.
 *
 * WHAT IT ASSERTS AND WHAT IT DOES NOT. A record is "edited" when its serialised JSON differs from
 * the previous commit that touched its file. That counts a whitespace-only reserialisation as an
 * edit and it counts a correction that touched four fields as one edit, so the count is a count of
 * COMMITS TOUCHING THE RECORD and is labelled as such wherever it is printed. The `values` list is
 * narrower and is exact: it records every observed transition of `assessment` (ledger) or
 * `directionOfBias` (provenance), with the commit that made it.
 *
 * SCOPE. `data/ledger/*.json` and `data/provenance.json` only. Series and pairs are excluded
 * because neither carries a scored verdict, which is what the historical criteria are about.
 *
 * Usage:  node tools/gen-record-history.mjs   ·   npm run record-history
 */
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'review', 'record-history.json');
const sh = (c) => execSync(c, { cwd: ROOT, maxBuffer: 1 << 28 }).toString();

const commits = sh('git log --reverse --format=%H%x09%ad%x09%s --date=short -- data/ledger data/provenance.json')
  .trim()
  .split('\n')
  .map((l) => {
    const [sha, date, subj] = l.split('\t');
    return { sha, date, subj };
  });

const hist = new Map();
const prev = new Map();

for (const c of commits) {
  let files;
  try {
    files = sh(`git ls-tree -r --name-only ${c.sha} -- data/ledger data/provenance.json`).trim().split('\n').filter(Boolean);
  } catch {
    continue;
  }
  const cur = new Map();
  for (const f of files) {
    let arr;
    try {
      arr = JSON.parse(sh(`git show ${c.sha}:"${f}"`));
    } catch {
      continue;
    }
    if (!Array.isArray(arr)) continue;
    for (const r of arr) if (r && r.id) cur.set(r.id, r);
  }
  for (const [id, rec] of cur) {
    const s = JSON.stringify(rec);
    const p = prev.get(id);
    const val = (r) => r.assessment ?? r.directionOfBias ?? null;
    if (p === undefined) {
      hist.set(id, {
        first: c.sha,
        firstDate: c.date,
        firstSubj: c.subj,
        edits: [],
        values: [{ sha: c.sha, date: c.date, subj: c.subj, v: val(rec) }],
      });
    } else if (p !== s) {
      const h = hist.get(id);
      const before = JSON.parse(p);
      const changed = [...new Set([...Object.keys(before), ...Object.keys(rec)])].filter(
        (k) => JSON.stringify(before[k]) !== JSON.stringify(rec[k]),
      );
      h.edits.push({ sha: c.sha, date: c.date, subj: c.subj, fields: changed });
      if (val(rec) !== val(before)) {
        h.values.push({ sha: c.sha, date: c.date, subj: c.subj, v: val(rec), from: val(before) });
      }
    }
    prev.set(id, s);
  }
}

const out = {};
for (const [id, h] of hist) {
  out[id] = { firstDate: h.firstDate, firstSubj: h.firstSubj, editCount: h.edits.length, edits: h.edits, values: h.values };
}
writeFileSync(OUT, `${JSON.stringify(out, null, 1)}\n`);

const n = Object.keys(out).length;
const e1 = Object.values(out).filter((h) => h.editCount >= 1).length;
const e2 = Object.values(out).filter((h) => h.editCount >= 2).length;
const e3 = Object.values(out).filter((h) => h.editCount >= 3).length;
const v = Object.values(out).filter((h) => h.values.length > 1).length;
console.log(
  `record-history OK — ${n} ledger + provenance record(s) over ${commits.length} commit(s) touching those files: ` +
    `${e1} edited at least once, ${e2} at least twice, ${e3} at least three times, ${v} with a changed assessment or directionOfBias`,
);
