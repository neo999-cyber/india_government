/**
 * Corpus search with word boundaries BY DEFAULT.
 *
 * WHY THIS EXISTS AS A MODULE RATHER THAN A HABIT. Ad-hoc substring enumeration produced a false
 * candidate set three times in one phase, twice on the same token:
 *
 *   - phase 13 ran a keyword sweep for "states" and discarded it — 30+ education and employment
 *     series matched it in ordinary prose;
 *   - the first `figure-consistency` draft mined figure triples and reported 197 failures on a
 *     corpus with two real cases;
 *   - the US-tariff sweep matched `duty` inside "duty-bearing" and `USTR` inside "infra**stru**cture",
 *     returning 59 candidates; tightened, it returned 6; relaxed again with a case-insensitive
 *     regex it matched `ustr` in "industry" and "industrialised" and added 7 more, all spurious.
 *
 * Every one was caught, and being caught every time is not the same as being prevented. It is a
 * known defect of the method, so the method gets a default rather than each author getting a
 * reminder — the same call as M2 replacing "remember to check the diff" and the fixture stamp
 * replacing "remember to regenerate".
 *
 * Word boundaries are the default and `substring: true` is the explicit opt-out, so a search that
 * wants loose matching says so in the call and is visible in review. `\b` is not sufficient on its
 * own for every case — it will not stop `tariff` matching inside `tariffs`, which is usually wanted
 * — so `whole: true` additionally forbids trailing word characters where an exact token is meant.
 *
 * SEARCH FINDS CANDIDATES. It does not find records. Every use in this project is followed by a
 * per-record judgement, and the module says so here because the count it returns reads like an
 * answer and is not one.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

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

/**
 * Strip a retrieved HTML page to readable text.
 *
 * HERE RATHER THAN IN EACH CALLER because every cycle that fetches a page was re-writing this
 * three-line pipeline inline, and the variants differed — one dropped `<style>` and another did
 * not, one unescaped entities before stripping tags and another after, which changes what a
 * scan can see. A normalisation that differs between two scans makes their counts
 * incomparable, and the counts are the evidence.
 */
export function htmlToText(html) {
  let t = html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ');
  t = t.replace(/<[^>]+>/g, ' ');
  t = t.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => {
    const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '\u2019', lsquo: '\u2018', ldquo: '\u201c', rdquo: '\u201d', ndash: '\u2013', mdash: '\u2014' };
    if (e[0] === '#') return String.fromCodePoint(parseInt(e[1] === 'x' || e[1] === 'X' ? e.slice(2) : e.slice(1), e[1] === 'x' || e[1] === 'X' ? 16 : 10));
    return Object.prototype.hasOwnProperty.call(named, e.toLowerCase()) ? named[e.toLowerCase()] : m;
  });
  return t.replace(/[ \t\u00a0]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
}

/**
 * Scan RETRIEVED TEXT — a fetched page, extracted PDF text, anything that is not yet in `/data`.
 *
 * WHY THIS EXISTS SEPARATELY FROM `search`. The boundary default above only ever protected scans
 * that went through this module, and until now this module could only read `/data`. Every scan of
 * a retrieved page was therefore ad-hoc by construction, and one of them matched `fenc` inside
 * **"Fengal"** — the cyclone — while checking whether a ministry's year-end review reported any
 * fencing progress. That was the fourth substring false positive of phase 14 and the first that
 * would have produced a POSITIVE finding rather than a nuisance: a spurious hit in the document
 * being checked for an absence turns an established absence into a fabricated presence.
 *
 * Returns every occurrence, not the first, because the question asked of a retrieved page is
 * usually "how many times and where" — an absence claim rests on the count being zero, and a
 * restatement count (the same sentence served three times by one page) has to be distinguishable
 * from three distinct placements. `first()` is left to the caller.
 *
 * SCAN FINDS CANDIDATES, same as `search`. A count is not a finding.
 *
 * @param {string} text
 * @param {string[]} terms
 * @param {{substring?: boolean, whole?: boolean, caseSensitive?: boolean, context?: number}} opts
 * @returns {{term: string, count: number, hits: {index: number, match: string, context: string}[]}[]}
 */
export function scanText(text, terms, opts = {}) {
  const { context = 160 } = opts;
  return terms.map((term) => {
    const re = matcher(term, opts);
    const hits = [];
    for (let m; (m = re.exec(text)) !== null; ) {
      hits.push({
        index: m.index,
        match: m[0],
        context: text.slice(Math.max(0, m.index - context), m.index + m[0].length + context).replace(/\s+/g, ' '),
      });
      if (m.index === re.lastIndex) re.lastIndex += 1;
    }
    return { term, count: hits.length, hits };
  });
}

/** Every record in /data as {file, record}. */
export function loadCorpus(dataDir = join(ROOT, 'data')) {
  const out = [];
  for (const f of jsonFiles(dataDir)) {
    let parsed;
    try { parsed = JSON.parse(readFileSync(f, 'utf8')); } catch { continue; }
    const list = Array.isArray(parsed) ? parsed : (parsed.records ?? parsed.series ?? []);
    for (const r of list) if (r && typeof r === 'object' && r.id) out.push({ file: f.replace(`${ROOT}/`, ''), record: r });
  }
  return out;
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Build the matcher for one term.
 *
 * @param {string} term
 * @param {{substring?: boolean, whole?: boolean, caseSensitive?: boolean}} opts
 */
export function matcher(term, opts = {}) {
  const { substring = false, whole = false, caseSensitive = false } = opts;
  const flags = caseSensitive ? 'g' : 'gi';
  if (substring) return new RegExp(escape(term), flags);
  // Leading boundary always. Trailing: `\b` normally, or an explicit "no more word characters"
  // where an exact token is wanted — `\btariff\b` already refuses `tariffs`, but `\bUSTR\b` with a
  // case-insensitive flag still refuses `industry` only because of the LEADING boundary, and it is
  // the leading one that the three failures above all needed.
  const tail = whole ? '(?![\\w])' : '\\b';
  return new RegExp(`\\b${escape(term)}${tail}`, flags);
}

/**
 * @returns {{id: string, file: string, terms: string[], contexts: string[]}[]}
 */
export function search(terms, opts = {}) {
  const corpus = opts.corpus ?? loadCorpus(opts.dataDir);
  const res = [];
  for (const { file, record } of corpus) {
    const blob = JSON.stringify(record);
    const hit = [];
    const contexts = [];
    for (const term of terms) {
      const re = matcher(term, opts);
      const m = re.exec(blob);
      if (m) {
        hit.push(term);
        contexts.push(`${term}: …${blob.slice(Math.max(0, m.index - 60), m.index + 60)}…`);
      }
    }
    if (hit.length) res.push({ id: record.id, file, terms: hit, contexts });
  }
  return res;
}
