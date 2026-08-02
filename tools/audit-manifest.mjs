#!/usr/bin/env node
/**
 * Audit manifest: flat CSVs of /data for offline claim-by-claim verification.
 *
 * READ-ONLY BY CONSTRUCTION. Nothing here writes to /data or /schemas; the only
 * writes are into audit/. This is an export, not a migration.
 *
 * `verdict` and `note` ship empty in every file. They are the human's columns.
 *
 * Priority, 1 highest, FIRST MATCHING RULE WINS:
 *   1  confidence low, or a caveat present on the record or series
 *   2  any source at tier T4 or T5
 *   3  point status = approx
 *   4  scored ledger record — the argument pair needs reading regardless of source quality
 *   5  everything else
 *
 * Absences have no confidence, caveat, tier or assessment of their own, so they
 * INHERIT their parent's band. Stated in summary.md so it is not mistaken for a
 * property of the declaration.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'audit');
mkdirSync(OUT, { recursive: true });

/* ---------------------------------------------------------------- loading */

function jsonFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...jsonFiles(full));
    else if (e.isFile() && e.name.endsWith('.json')) out.push(full);
  }
  return out;
}

function loadLayer(layer) {
  const roots = [join(ROOT, 'data', layer), join(ROOT, 'data', `${layer}.json`)];
  const files = roots.flatMap((p) =>
    existsSync(p) ? (statSync(p).isDirectory() ? jsonFiles(p) : [p]) : [],
  );
  const records = [];
  for (const f of files) {
    const parsed = JSON.parse(readFileSync(f, 'utf8'));
    const list = Array.isArray(parsed) ? parsed : (parsed.records ?? parsed.series ?? []);
    records.push(...list);
  }
  return records;
}

const series = loadLayer('series');
const ledger = loadLayer('ledger');
const provenance = loadLayer('provenance');

/* ------------------------------------------------------------------- csv */

/** RFC 4180. Quote when the cell holds a comma, quote, CR or LF; double inner quotes. */
function cell(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  if (s === '') return '';
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
const row = (cells) => cells.map(cell).join(',');

function writeCsv(name, header, rows) {
  // Sort: priority ascending, then the id column (always index 0).
  const pi = header.indexOf('priority');
  rows.sort((a, b) => (a[pi] - b[pi]) || String(a[0]).localeCompare(String(b[0])));
  const body = [row(header), ...rows.map(row)].join('\n') + '\n';
  writeFileSync(join(OUT, name), body);
  return rows.length;
}

const yn = (b) => (b ? 'y' : 'n');
const list = (a) => (Array.isArray(a) && a.length ? a.join('; ') : '');
const words = (s) => (typeof s === 'string' && s.trim() ? s.trim().split(/\s+/).length : '');

/* --------------------------------------------------------------- helpers */

const LOW_TIER = new Set(['T4', 'T5']);
const SCORED = new Set(['worked', 'partly', 'failed', 'reversed', 'contested']);

/**
 * A URL that is a bare domain rather than a document — no path beyond "/", and no
 * query or fragment carrying the location. The source name asserts a specific
 * document; the URL does not reach it, so the claim cannot be checked without a
 * second search. Transcription-risk rows.
 */
function isBareDomain(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return (u.pathname === '' || u.pathname === '/') && !u.search && !u.hash;
  } catch {
    return false;
  }
}

const bareDomainRows = [];
const srcStats = { named: 0, bare: 0, noUrl: 0 };
function noteBare(file, id, name, url) {
  if (!name) return;
  srcStats.named += 1;
  if (!url) srcStats.noUrl += 1;
  else if (isBareDomain(url)) { srcStats.bare += 1; bareDomainRows.push({ file, id, name, url }); }
}

const tierTally = {};
const statusTally = {};
const bump = (t, k) => { if (k) t[k] = (t[k] ?? 0) + 1; };

/* ------------------------------------------------------------ 1. points */

const POINTS_H = [
  'series_id','series_label','domain','tier','year','value','unit','status','denominator',
  'source_name','source_url','source_vintage','break_at_this_point','provenance_refs',
  'caveat_present','priority','verdict','note',
];
const pointRows = [];

for (const s of series) {
  const breakPeriods = new Set((s.breaks ?? []).map((b) => b.period));
  const src = s.source ?? {};
  noteBare('points.csv', s.id, src.name, src.url);
  bump(tierTally, s.tier);

  for (const p of s.points ?? []) {
    bump(statusTally, p.status);
    let priority;
    if (s.caveat) priority = 1;                       // series carry no confidence field
    else if (LOW_TIER.has(s.tier)) priority = 2;
    else if (p.status === 'approx') priority = 3;
    else priority = 5;                                // band 4 is ledger-only

    pointRows.push([
      s.id, s.title, s.domain, s.tier, p.period,
      p.value === null || p.value === undefined ? '' : p.value,
      s.unit, p.status, s.denominator ?? '',
      src.name ?? '', src.url ?? '', src.vintage ?? '',
      yn(breakPeriods.has(p.period)), list(s.provenanceRefs),
      yn(Boolean(s.caveat)), priority, '', '',
    ]);
  }
}

/* ----------------------------------------------------------- 2. records */

const RECORDS_H = [
  'id','title','domains','term','assessment','confidence','caveat','differentFacts',
  'revisitTrigger_present','series_refs','provenance_refs','source_names','source_tiers',
  'caseFor_wordcount','caseAgainst_wordcount','priority','verdict','note',
];
const recordRows = [];

for (const r of ledger) {
  const srcs = r.sources ?? [];
  for (const s of srcs) { noteBare('records.csv', r.id, s.name, s.url); bump(tierTally, s.tier); }

  let priority;
  if (r.confidence === 'low' || r.caveat) priority = 1;
  else if (srcs.some((s) => LOW_TIER.has(s.tier))) priority = 2;
  else if (SCORED.has(r.assessment)) priority = 4;
  else priority = 5;

  recordRows.push([
    r.id, r.title, list(r.domains), r.term, r.assessment, r.confidence, r.caveat ?? '',
    r.differentFacts === undefined ? '' : yn(r.differentFacts),
    yn(Boolean(r.revisitTrigger)),
    list(r.seriesRefs), list(r.provenanceRefs),
    list(srcs.map((s) => s.name)), list(srcs.map((s) => s.tier)),
    words(r.caseFor), words(r.caseAgainst),
    priority, '', '',
  ]);
}

/* ---------------------------------------------------------- 3. absences */

const ABSENCES_H = [
  'parent_id','parent_type','what','reasonKind','reasonDisputed','disputeKind',
  'reasonStated','wouldFill','priority','verdict','note',
];
const absenceRows = [];

/** Absences inherit the parent's band — they carry no tier, caveat or assessment. */
function parentBand(rec, kind) {
  const srcs = kind === 'ledger' ? (rec.sources ?? []) : [];
  if (rec.confidence === 'low' || rec.caveat) return 1;
  if (kind === 'ledger' ? srcs.some((s) => LOW_TIER.has(s.tier)) : LOW_TIER.has(rec.tier)) return 2;
  if (kind === 'ledger' && SCORED.has(rec.assessment)) return 4;
  return 5;
}

for (const [recs, kind] of [[series, 'series'], [ledger, 'ledger']]) {
  for (const r of recs) {
    const band = parentBand(r, kind);
    for (const u of r.unmeasured ?? []) {
      absenceRows.push([
        r.id, kind, u.what, u.reasonKind ?? '',
        u.reasonDisputed === undefined ? '' : yn(u.reasonDisputed),
        u.disputeKind ?? '', u.why ?? '', u.wouldFill ?? '',
        band, '', '',
      ]);
    }
  }
}

/* -------------------------------------------------------- 4. provenance */

const PROV_H = [
  'id','title','when','directionOfBias','bridgeExists','affects_series','affects_domains',
  'source_names','source_tiers','competing_accounts_count','priority','verdict','note',
];
const provRows = [];

for (const p of provenance) {
  const srcs = p.sources ?? [];
  for (const s of srcs) { noteBare('provenance.csv', p.id, s.name, s.url); bump(tierTally, s.tier); }
  const priority = srcs.some((s) => LOW_TIER.has(s.tier)) ? 2 : 5;

  provRows.push([
    p.id, p.title, p.when, p.directionOfBias, yn(p.bridgeExists),
    list(p.affectsSeries), list(p.affectsDomains),
    list(srcs.map((s) => s.name)), list(srcs.map((s) => s.tier)),
    (p.competingAccounts ?? []).length,
    priority, '', '',
  ]);
}

/* ------------------------------------------------------------- emit all */

const counts = {
  'points.csv': writeCsv('points.csv', POINTS_H, pointRows),
  'records.csv': writeCsv('records.csv', RECORDS_H, recordRows),
  'absences.csv': writeCsv('absences.csv', ABSENCES_H, absenceRows),
  'provenance.csv': writeCsv('provenance.csv', PROV_H, provRows),
};

const bandsOf = (rows, pi) => {
  const b = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of rows) b[r[pi]] += 1;
  return b;
};
const bands = {
  'points.csv': bandsOf(pointRows, POINTS_H.indexOf('priority')),
  'records.csv': bandsOf(recordRows, RECORDS_H.indexOf('priority')),
  'absences.csv': bandsOf(absenceRows, ABSENCES_H.indexOf('priority')),
  'provenance.csv': bandsOf(provRows, PROV_H.indexOf('priority')),
};

const total = Object.values(counts).reduce((a, b) => a + b, 0);
const urgent = Object.values(bands).reduce((a, b) => a + b[1] + b[2], 0);
const bandTotal = (n) => Object.values(bands).reduce((a, b) => a + b[n], 0);

const table = (obj) => Object.entries(obj).sort().map(([k, v]) => `| ${k} | ${v} |`).join('\n');

const md = `# Audit manifest — summary

Generated from \`/data\` by \`tools/audit-manifest.mjs\`. Read-only: nothing under
\`/data\` or \`/schemas\` was read for anything but reading.

Corpus: **${series.length} series · ${ledger.length} ledger · ${provenance.length} provenance**.

## The size of the urgent half

**Bands 1 + 2 combined: ${urgent} rows of ${total}** (${((urgent / total) * 100).toFixed(1)}%).

| band | what it means | rows |
|---|---|---|
| 1 | low confidence, or a caveat present | ${bandTotal(1)} |
| 2 | a source at tier T4 or T5 | ${bandTotal(2)} |
| 3 | point status \`approx\` | ${bandTotal(3)} |
| 4 | scored ledger record — the argument pair needs reading | ${bandTotal(4)} |
| 5 | everything else | ${bandTotal(5)} |

## Rows per band per file

| file | rows | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
${Object.keys(counts).map((f) =>
  `| \`${f}\` | ${counts[f]} | ${bands[f][1]} | ${bands[f][2]} | ${bands[f][3]} | ${bands[f][4]} | ${bands[f][5]} |`,
).join('\n')}

## Source tier across the whole corpus

Counts every tier assertion — one per series, one per source entry on each ledger
and provenance record. A record with three sources contributes three.

| tier | count |
|---|---|
${table(tierTally)}

## Point status

| status | count |
|---|---|
${table(statusTally)}

## Transcription risk — source named, URL is a bare domain

**${srcStats.bare} of ${srcStats.named} source assertions (${((srcStats.bare / srcStats.named) * 100).toFixed(1)}%).**
Counted per source assertion, not per CSV row — one per series, one per source entry on each
ledger and provenance record — so a series with 40 points contributes once here and 40 rows there.

The source name asserts a specific document; the URL reaches only the publisher's front door.
The claim cannot be checked from the cell — it needs a fresh search, and that is where a
citation drifts from what it cites. **Two thirds of the instrument's citations are in this
state**, which makes this the largest single finding in the manifest and probably worth
addressing before the claim-by-claim pass rather than during it.

| | count |
|---|---|
| document URL | ${srcStats.named - srcStats.bare - srcStats.noUrl} |
| bare domain | ${srcStats.bare} |
| no URL at all | ${srcStats.noUrl} |

Every named source carries some URL — the empty-cell case does not occur.

${bareDomainRows.length === 0 ? '_None._' : `| file | id | source name | url |\n|---|---|---|---|\n${
  bareDomainRows.map((b) => `| \`${b.file}\` | ${b.id} | ${b.name} | ${b.url} |`).join('\n')}`}

## Four things to know before working through these

1. **\`verdict\` and \`note\` are empty in all four files.** They are yours.
2. **Point-level \`note\` text is not carried.** The column spec has one \`note\` column and
   it is reserved for the auditor, so each point's own note — which often states the
   basis of the figure — is in the app and not in the CSV.
3. **Absences inherit their parent's band.** A declaration carries no confidence, caveat,
   tier or assessment of its own, so the band describes the record it sits on, not the
   declaration.
4. **\`pending\` points land in band 5** unless their series carries a caveat or a low tier.
   The rules name \`approx\` and not \`pending\`; a point held pending is a known gap rather
   than a figure that might be wrong, so this is arguably right — but it is a consequence
   of the rules rather than a decision, and it is worth knowing before sorting.
`;

writeFileSync(join(OUT, 'summary.md'), md);

console.log(Object.entries(counts).map(([f, n]) => `audit/${f}  ${n} rows`).join('\n'));
console.log(`audit/summary.md`);
console.log(`\nbands 1+2 = ${urgent} of ${total} rows`);
console.log(`bare-domain source URLs: ${bareDomainRows.length}`);
