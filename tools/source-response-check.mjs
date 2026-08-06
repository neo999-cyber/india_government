#!/usr/bin/env node
/**
 * SOURCE RESPONSE CHECK — does a cited URL return something that could BE the cited document?
 *
 * WHY THIS IS NOT `url-check`. That gate asserts a URL RESOLVES. It has never asserted what comes
 * back, so a citation now serving an 18-byte body, a WAF interstitial or an HTML error page for a
 * `.pdf` path passes it cleanly. A 40-URL sample turned up three such citations on the first look,
 * and this instrument is public: a reader clicking through gets the interstitial, not the evidence.
 *
 * REPORT ONLY, AND DELIBERATELY SO. Everything here is a CANDIDATE. A response is a fact about this
 * machine, this moment and this user-agent — the corpus has already logged four estates that changed
 * behaviour mid-project, a resolver that SERVFAILs on hosts 1.1.1.1 answers, and a host that serves
 * a 212-byte Incapsula stub at HTTP 200 which `pdftotext` accepts. **A failure here is not evidence
 * that the citation was wrong when it was made**, and correcting a citation can move a verdict, so
 * nothing is corrected from this output without a human read of the record.
 *
 * METHOD. A ranged GET of the first 16 KB with a 2 MB ceiling: anything the ceiling stops is by
 * definition not a stub, and the small responses are the whole question. Resolver fallback follows
 * `url-check`'s pattern — this environment's system resolver fails on government hosts that answer
 * fine through 1.1.1.1, and a tool without the fallback reports live hosts dead. That was measured
 * once at ten hosts including one the same session had retrieved dozens of documents from.
 *
 * Usage:
 *   node tools/source-response-check.mjs                 # every distinct URL in /data
 *   node tools/source-response-check.mjs --limit 40
 *   node tools/source-response-check.mjs --json out.json
 */
import { readFileSync, readdirSync, existsSync, statSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flagOf = (n, d = null) => { const i = argv.indexOf(n); return i === -1 ? d : argv[i + 1]; };
const LIMIT = Number(flagOf('--limit', '0')) || 0;
const JSON_OUT = flagOf('--json');
const CONCURRENCY = Number(flagOf('--concurrency', '6'));
const TMP = mkdtempSync(join(tmpdir(), 'srcresp-'));

/* ------------------------------------------------------------- the corpus */

function loadLayer(layer) {
  const roots = [join(ROOT, 'data', layer), join(ROOT, 'data', `${layer}.json`)];
  const files = [];
  for (const p of roots) {
    if (!existsSync(p)) continue;
    if (statSync(p).isDirectory()) files.push(...readdirSync(p).filter((f) => f.endsWith('.json')).map((f) => join(p, f)));
    else files.push(p);
  }
  return files.flatMap((f) => JSON.parse(readFileSync(f, 'utf8')));
}

/** url -> the record ids citing it. A defect is reported against the records, never the URL alone. */
const cited = new Map();
const note = (url, id) => {
  if (!url) return;
  if (!cited.has(url)) cited.set(url, new Set());
  cited.get(url).add(id);
};
for (const r of loadLayer('ledger')) for (const s of r.sources ?? []) note(s.url, r.id);
for (const r of loadLayer('provenance')) for (const s of r.sources ?? []) note(s.url, r.id);
for (const r of loadLayer('series')) note(r.source?.url, r.id);

/* ------------------------------------------------------------- fetching */

const run = (args) => {
  try {
    return { out: execFileSync('curl', args, { encoding: 'utf8', maxBuffer: 1 << 26 }), code: 0 };
  } catch (e) {
    // NEVER discard stdout on a non-zero exit: curl exits 63 on --max-filesize and 6 on a resolver
    // failure, and both carry the write-out we need. Throwing the output away is how "aborted
    // because the file is large" becomes "no response".
    return { out: `${e.stdout ?? ''}`, code: e.status ?? -1 };
  }
};

// PIPE-DELIMITED, and that is not cosmetic. Splitting on spaces put `text/html; charset=UTF-8`
// across two fields and shifted every value after it, so `size_download` parsed as NaN and 120,715
// bytes of live page read as "0 bytes returned". Fifth reader defect of this session and the same
// family as the other four: a value parsed without accounting for what it actually contains.
const W = '\\n%{http_code}|%{content_type}|%{size_download}|%{url_effective}';

function fetchHead(url, pins = []) {
  const body = join(TMP, `b${Math.abs(hashCode(url))}`);
  const args = [
    '-sL', '-o', body, '-w', W, '--max-time', '25', '-r', '0-16383',
    '--max-filesize', '2000000', '-A', 'Mozilla/5.0',
    ...pins.flatMap((p) => ['--resolve', p]), url,
  ];
  const { out, code } = run(args);
  const last = out.trim().split('\n').pop() ?? '';
  const [status, ctype, size, effective] = last.split('|');
  let head = '';
  try { head = readFileSync(body, 'latin1').slice(0, 16384); } catch { /* no body written */ }
  return {
    status: Number(status) || 0,
    ctype: (ctype ?? '').split(';')[0],
    size: Number(size) || 0,
    effective: effective ?? url,
    head,
    curlCode: code,
    // curl 63 means the ceiling stopped it: the response is at least 2 MB and cannot be a stub.
    large: code === 63,
    // A 206 means the Range was honoured and the body is CUT, so `size` is our ceiling and not the
    // document's size. Applying a size floor to it would report every large PDF as too small.
    truncated: Number(status) === 206,
  };
}
function hashCode(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return h; }

const resolveHost = (host) => {
  const { out } = run(['-s', '--max-time', '8', `https://1.1.1.1/dns-query?name=${host}&type=A`, '-H', 'accept: application/dns-json']);
  try { return (JSON.parse(out).Answer ?? []).find((a) => a.type === 1)?.data ?? null; } catch { return null; }
};

function fetchWithFallback(url) {
  const first = fetchHead(url);
  if (first.status !== 0 || first.large) return first;
  // The resolver fallback, per M1. Without it this tool reports live government hosts as dead.
  let host;
  try { host = new URL(url).hostname; } catch { return first; }
  const ip = resolveHost(host);
  if (!ip) return first;
  const port = url.startsWith('http://') ? 80 : 443;
  return { ...fetchHead(url, [`${host}:${port}:${ip}`]), viaResolver: true };
}

/* ------------------------------------------------------------- classifying */

/**
 * Size floors, by what the URL claims to be. Deliberately generous: the question is not "is this
 * document small" but "is this response too small to be ANY document of that kind".
 */
const FLOOR = { pdf: 8192, html: 1024, json: 64, other: 256 };

/** Interstitials and challenge pages seen at HTTP 200 in this corpus's own retrieval notes. */
const STUB_SIGNATURES = [
  ['incapsula', /_Incapsula_Resource|incap_ses|Incapsula/i],
  ['cloudflare-challenge', /cf-browser-verification|Just a moment\.\.\.|__cf_chl|Checking your browser/i],
  ['access-denied', /Access Denied|Request Rejected|403 Forbidden|You don't have permission/i],
  ['captcha', /captcha|are you a robot/i],
  ['error-page', /Page Not Found|404 - |Object moved|Runtime Error|Server Error in/i],
];

function classify(url, r) {
  const problems = [];
  const isPdfUrl = /\.pdf(\?|$)/i.test(url);
  const looksPdf = r.head.startsWith('%PDF');
  const kind = r.ctype.includes('pdf') ? 'pdf' : r.ctype.includes('html') ? 'html' : r.ctype.includes('json') ? 'json' : 'other';

  if (r.status === 0) return [{ kind: 'no-response', detail: `curl exit ${r.curlCode}` }];
  if (r.status >= 400) return [{ kind: 'http-error', detail: `HTTP ${r.status}` }];
  if (r.large) return [];               // ≥2 MB: cannot be a stub, and the ceiling is why we know

  // A .pdf path answering with HTML is the shape that caught indiabudget.gov.in.
  if (isPdfUrl && kind === 'html') problems.push({ kind: 'type-mismatch', detail: `.pdf path served ${r.ctype}` });
  // A body claiming to be a PDF that does not begin %PDF is not a PDF, whatever the header says.
  if ((isPdfUrl || kind === 'pdf') && r.size > 0 && !looksPdf && kind !== 'html') {
    problems.push({ kind: 'not-a-pdf', detail: `${r.size} bytes, no %PDF magic` });
  }
  // Size floors apply ONLY to a complete body. A 206 is our own truncation, not the server's.
  const floor = FLOOR[kind] ?? FLOOR.other;
  if (!r.truncated && r.size > 0 && r.size < floor) {
    problems.push({ kind: 'too-small', detail: `${r.size} bytes, floor ${floor} for ${kind || 'unknown type'}` });
  }
  if (r.size === 0) problems.push({ kind: 'empty', detail: 'zero bytes returned' });
  for (const [name, re] of STUB_SIGNATURES) {
    if (re.test(r.head)) { problems.push({ kind: `stub:${name}`, detail: `${r.size} bytes` }); break; }
  }
  // A JS shell: HTML that carries scripts and almost no text. mea.gov.in is the logged instance,
  // and its Internet Archive snapshot is the same shell.
  if (kind === 'html' && /<script/i.test(r.head)) {
    const text = r.head.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length < 400 && r.size < 60000) problems.push({ kind: 'js-shell', detail: `${text.length} chars of text in ${r.size} bytes` });
  }
  return problems;
}

/* ------------------------------------------------------------- run */

let urls = [...cited.keys()].filter(Boolean).sort();
if (LIMIT) urls = urls.slice(0, LIMIT);
console.error(`source-response-check: ${urls.length} distinct URL(s) from ${new Set([...cited.values()].flatMap((s) => [...s])).size} record(s)`);

const rows = [];
let done = 0;
async function worker(queue) {
  for (;;) {
    const url = queue.shift();
    if (!url) return;
    const r = fetchWithFallback(url);
    const problems = classify(url, r);
    rows.push({ url, records: [...cited.get(url)].sort(), status: r.status, ctype: r.ctype, size: r.size, large: r.large, truncated: r.truncated, viaResolver: !!r.viaResolver, problems });
    done += 1;
    if (done % 25 === 0) console.error(`  ${done}/${urls.length}`);
  }
}
const queue = [...urls];
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)));

const bad = rows.filter((r) => r.problems.length);
const byKind = {};
for (const r of bad) for (const p of r.problems) byKind[p.kind] = (byKind[p.kind] ?? 0) + 1;

console.log('');
console.log(`source-response-check — ${rows.length} distinct URL(s) checked, ${bad.length} returned something that may not be the cited document`);
console.log(`  by shape: ${Object.entries(byKind).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(' · ') || 'none'}`);
console.log(`  reached through the 1.1.1.1 fallback: ${rows.filter((r) => r.viaResolver).length}`);
console.log(`  over the 2 MB ceiling and therefore not a stub: ${rows.filter((r) => r.large).length}`);
console.log('');
for (const r of bad.sort((a, b) => a.url.localeCompare(b.url))) {
  console.log(`  ${r.problems.map((p) => p.kind).join(' + ')}  [${r.records.join(' ')}]`);
  console.log(`    ${r.url}`);
  console.log(`    HTTP ${r.status} · ${r.ctype || 'no content-type'} · ${r.size} bytes — ${r.problems.map((p) => p.detail).join('; ')}`);
}
if (JSON_OUT) writeFileSync(JSON_OUT, `${JSON.stringify(rows, null, 1)}\n`);
console.log('\nREPORT ONLY. Every line above is a CANDIDATE: a response is a fact about this machine,');
console.log('this moment and this user-agent, not evidence the citation was wrong when it was made.');
