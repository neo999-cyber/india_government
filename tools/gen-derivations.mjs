#!/usr/bin/env node
/**
 * PUBLISH THE DERIVATIONS — turn three self-referential record claims into tables a reader can
 * reproduce from public `/data`.
 *
 * WHY. L-0219 and L-0220 cite the instrument's own private repository as evidence, at a URL that
 * returns 404 to every reader, and L-0219's headline counts cannot be reproduced from `/data` even
 * by someone who tries. A public instrument asserting counts only its author can check is asserting
 * on authority, which is the one thing this corpus says it does not do.
 *
 * THE MISSING ARTEFACT IS THE RULE, NOT THE DATA. `/data` has been public throughout. A reader
 * counting bare-domain roots gets **288**; the `no-bare-root` gate line says **277**; L-0219 says
 * **278**. Three figures, and the first two differ ONLY IN THE UNIT:
 *
 *   288  bare-root citation OCCURRENCES in /data
 *   277  DISTINCT (record, url) PAIRS — the gate keys a Map on `${id} ${url}`, so a record citing the
 *        same root twice counts once. Eleven pairs are duplicated, across ten records.
 *   278  what L-0219 asserts; one more than the pair count, and the allowlist history records
 *        citations closed after that record was written.
 *
 * **A count is not reproducible until its UNIT is stated.** That is the whole of the defect and it
 * is why this file prints the rule beside every number.
 *
 * WHAT THIS TOOL DOES NOT DO. It does not touch the records and does not re-cite them. A citation
 * change may move a verdict, and the 70-record decision is pending. It emits `docs/derivations.md`;
 * pointing the records at it is a later, authorised step.
 *
 * WHAT IT CANNOT DO, and the boundary is the point. L-0219's other half — 139 citations that return
 * no document, split 54 refused / 50 thin / 23 no-DNS / 12 forbidden — rests on REQUESTING each root
 * and measuring the response. That is a retrieval result and no retrieval is stored. No generator
 * over `/data` can produce it, and this file says so rather than producing a number that looks like
 * it. `tools/source-response-check.mjs` measures it live; the two are different objects.
 *
 * Usage:  node tools/gen-derivations.mjs   ·   npm run derivations
 */
import {readdirSync, readFileSync, writeFileSync, existsSync} from 'node:fs';
import {execSync} from 'node:child_process';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'docs', 'derivations.md');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

/**
 * The stamp is the last commit that touched /data — not HEAD — because the figures derive from
 * /data alone, and a stamp that moved on every commit would churn one line per commit forever.
 *
 * IN THE BUILD SINCE 2026-08-10 (walk 8, A-5): this generator's output is read by
 * `app/derivations/page.tsx` at build time, so it is the one generator whose staleness a reader
 * can see — and it was the one generator NOT in the build, while `gen-manifest`, whose output no
 * page reads, was. The published page claimed `/data` as of a commit four days and eight commits
 * stale; the figures all still held, so the substance was right and the claim was false.
 *
 * THE FALLBACK is for build hosts with a shallow or absent git history (Vercel clones shallow).
 * A shallow `git log -- data` DOES NOT reliably return nothing: Git treats the boundary commit as
 * a root, so a snapshot commit can appear to have introduced every data file and falsely outrank
 * the real data commit outside the clone. That is how `f284769` was written locally while full CI
 * correctly found `a244360`. A shallow history is therefore never queried. The committed file was
 * generated with full history, so its own stamp is the value a shallow build must preserve.
 */
const stamped = (() => {
  try {
    const shallow = execSync('git rev-parse --is-shallow-repository', { cwd: ROOT }).toString().trim();
    if (shallow === 'true') throw new Error('shallow history cannot identify the last data commit');
    /* `%h` IS NOT A FIXED-LENGTH VALUE. Git extends it until it is unambiguous among every object
       present in that clone, so the full-history CI checkout can emit more characters than a local
       or Vercel checkout for the same commit. Read the stable full object id and abbreviate it
       ourselves after the full-history check above. */
    const full = execSync('git log -1 --format=%H -- data', { cwd: ROOT }).toString().trim();
    const d = execSync('git log -1 --format=%ad --date=short -- data', { cwd: ROOT }).toString().trim();
    if (/^[0-9a-f]{40}$/i.test(full) && d) return { h: full.slice(0, 7), d };
  } catch {
    /* no git, or shallow history — fall through */
  }
  const prior = existsSync(OUT) ? readFileSync(OUT, 'utf8').match(/commit `([0-9a-f]+)` \((\d{4}-\d{2}-\d{2})\)/) : null;
  if (prior) return { h: prior[1], d: prior[2] };
  return { h: 'unknown', d: 'date unknown' };
})();
const CORPUS = stamped.h;
const CORPUS_DATE = stamped.d;

/* ------------------------------------------------------------------ /data */

function jsonFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (e.name.startsWith('.') || e.name === 'incoming') continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...jsonFiles(full));
    else if (e.isFile() && e.name.endsWith('.json')) out.push(full);
  }
  return out;
}
function* sourcesOf(node) {
  if (Array.isArray(node)) for (const v of node) yield* sourcesOf(v);
  else if (node && typeof node === 'object') {
    if (typeof node.url === 'string') yield node;
    for (const v of Object.values(node)) yield* sourcesOf(v);
  }
}

/** THE RULE, stated once and used everywhere below. Identical to `tools/no-bare-root.mjs`. */
const isBareRoot = (u) => /^https?:\/\/[^/?#]+\/?$/.test(u);

/**
 * "Names no document at all" — L-0219's second partition. THE RULE: the citation's `name` carries
 * neither a four-digit year nor any multi-digit number. A citation reading "Contemporary reporting"
 * or "NCRB / MHA data" identifies a genre; one reading "Annual Report 2020-21" or "PRID 2099725"
 * identifies a document. Deliberately generous to the citation — any multi-digit token counts.
 */
const NAMES_NO_DOCUMENT = (name) => !/\b(?:19|20)\d{2}\b/.test(name) && !/\d{2,}/.test(name);

const occurrences = [];
for (const f of jsonFiles(join(ROOT, 'data'))) {
  const rel = f.replace(`${ROOT}/`, '');
  const parsed = JSON.parse(readFileSync(f, 'utf8'));
  const list = Array.isArray(parsed) ? parsed : (parsed.records ?? parsed.series ?? []);
  for (const r of list) {
    if (!r?.id) continue;
    for (const s of sourcesOf(r)) {
      occurrences.push({ id: r.id, url: s.url, tier: s.tier ?? null, name: s.name ?? '', file: rel });
    }
  }
}
const bareOcc = occurrences.filter((c) => isBareRoot(c.url));
const pairs = new Map();
for (const c of bareOcc) pairs.set(`${c.id} ${c.url}`, c);
const bareRoots = new Set(bareOcc.map((c) => c.url.replace(/\/$/, '')));
const genreOcc = occurrences.filter((c) => NAMES_NO_DOCUMENT(c.name));
const genrePairs = new Map();
for (const c of genreOcc) genrePairs.set(`${c.id} ${c.url} ${c.name}`, c);

/* ---------------------------------------------------- L-0220's thirteen */

const ledger = [];
for (const f of readdirSync(join(ROOT, 'data/ledger')).filter((x) => x.endsWith('.json')).sort()) {
  ledger.push(...JSON.parse(read(`data/ledger/${f}`)));
}
const byId = new Map(ledger.map((r) => [r.id, r]));

/**
 * The thirteen handover-counted schemes and the two controls, as L-0220's own source field names
 * them. THE DISCRIMINATOR, stated as a rule rather than a conclusion: the scheme reports a count
 * taken when the state hands something over, and its announced purpose is realised only if a second
 * party then does something further. Where the thing handed over IS the service — an electrified
 * line carries traction the day it energises — there is no further step and no gap.
 */
/**
 * TAKEN VERBATIM FROM L-0220's OWN SOURCE FIELD, not reconstructed. A first draft of this file
 * guessed the membership from the record's summary and got two of thirteen wrong — L-0057 and
 * L-0058, both `contested` — which would have printed a refutation of the record's claim built
 * entirely out of my own guess. The record names its thirteen: "L-0012, L-0034 to L-0037, L-0039,
 * L-0044, L-0048, L-0050, L-0054, L-0055, L-0062 and L-0093".
 */
const HANDOVER = 'L-0012 L-0034 L-0035 L-0036 L-0037 L-0039 L-0044 L-0048 L-0050 L-0054 L-0055 L-0062 L-0093'.split(' ');
const CONTROLS = ['L-0047', 'L-0053'];

/** The claim that the scores predate the pattern — checkable from the committed history artefact. */
let history = null;
if (existsSync(join(ROOT, 'review/record-history.json'))) history = JSON.parse(read('review/record-history.json'));

/* ------------------------------------------------------------------ emit */

const P = [];
const w = (s) => P.push(s);

w('# Derivations — what three departed records established, recomputed from public data\n\n');
w(
  `Generated by \`tools/gen-derivations.mjs\` from \`/data\` as it stood at commit \`${CORPUS}\` ` +
    `(${CORPUS_DATE}). Every figure below is reproducible by anyone with this repository: the rule is ` +
    `stated beside the number, and the number is computed here rather than quoted.\n\n`,
);
w(
  '**WHY THIS FILE EXISTS, AND WHY IT IS NOT THREE LEDGER RECORDS.** L-0218, L-0219 and L-0220 ' +
    'asserted counts about this corpus and cited the corpus as their source. On 2026-08-06 the ' +
    'operator ruled that a self-audit does not belong in the scored ledger: the tier ladder grades ' +
    'external documents by their DISTANCE FROM THE EVENT, and a derivation over `/data` is at no ' +
    'distance — it is the corpus restating itself. Under the governing principle, a source is not ' +
    'independent of what it establishes when it IS what it establishes. **The three records left the ' +
    'ledger in that pass and their findings are here instead, which is the only place they were ever ' +
    'checkable.** This file replaces the assertion with a derivation wherever `/data` can carry one, ' +
    '**and says plainly where it cannot.**\n\n',
);

w('## 1. Bare-domain-root citations — and why three different numbers are all correct\n\n');
w(
  'A bare root is a citation that names a publisher and retrieves nothing: `https://sansad.in/`. ' +
    '**THE RULE, identical to the one `tools/no-bare-root.mjs` enforces:**\n\n' +
    '```\nisBareRoot(u) = /^https?:\\/\\/[^/?#]+\\/?$/.test(u)\nscope: every object carrying a `url` at any depth, in every file under /data except incoming/\n```\n\n',
);
w('| unit | count | what it counts |\n|---|---:|---|\n');
w(`| citation OCCURRENCES | **${bareOcc.length}** | every bare-root citation as it appears |\n`);
w(`| distinct (record, url) PAIRS | **${pairs.size}** | a record citing one root twice counts once — **this is the gate's unit** |\n`);
w(`| distinct ROOTS | **${bareRoots.size}** | how many different publishers |\n`);
w(`| records affected | **${new Set(bareOcc.map((c) => c.id)).size}** | |\n\n`);
w(
  `**The gap between ${bareOcc.length} and ${pairs.size} is entirely duplication** — ${bareOcc.length - pairs.size} ` +
    'occurrences on records that cite the same root more than once:\n\n',
);
const dupes = new Map();
for (const c of bareOcc) dupes.set(`${c.id} ${c.url}`, (dupes.get(`${c.id} ${c.url}`) ?? 0) + 1);
for (const [k, n] of [...dupes].filter(([, n]) => n > 1).sort()) w(`- \`${k}\` ×${n}\n`);
w(
  `\n**L-0219 asserts 278 and 92.** The pair count here is ${pairs.size} and the root count ${bareRoots.size}. ` +
    'The record was written before citations closed since; `tools/lib/bare-root-allowlist.json` carries the ' +
    'history of what was fixed and when. **A count is not reproducible until its UNIT is stated, and that is ' +
    'the defect this file exists to close** — not the arithmetic, which was never wrong.\n\n',
);

w('## 2. Citations that name no document\n\n');
w(
  "L-0219's second partition, and the larger half: a citation that names a genre rather than a " +
    'document, so no working host would help. **THE RULE:**\n\n' +
    '```\nnamesNoDocument(name) = no four-digit year AND no multi-digit number anywhere in the citation name\n```\n\n' +
    'Deliberately generous to the citation — any multi-digit token at all counts as naming something.\n\n',
);
w(`- citation occurrences naming no document: **${genreOcc.length}**\n`);
w(`- distinct (record, url, name) triples: **${genrePairs.size}**\n`);
w(`- of those, also a bare root: **${genreOcc.filter((c) => isBareRoot(c.url)).length}**\n`);
w(`- naming no document but NOT a bare root: **${genreOcc.filter((c) => !isBareRoot(c.url)).length}**\n\n`);
w('**Examples, verbatim from `/data`:**\n\n');
for (const c of genreOcc.slice(0, 8)) w(`- \`${c.id}\` — "${c.name}"\n`);
w('\n');

w('## 3. WHAT THIS FILE CANNOT DERIVE, and no file over `/data` can\n\n');
w(
  "L-0219's other partition — **139 citations returning no document, split 54 refused / 50 under 500 " +
    'characters of text / 23 without a DNS record / 12 forbidden** — rests on requesting each root ' +
    'through an explicit resolver and measuring the response as text rather than bytes. ' +
    '**That is a retrieval result. No retrieval is stored in this repository**, so the number cannot be ' +
    'recomputed here and is not printed here.\n\n' +
    '`tools/source-response-check.mjs` measures the same property live and reports it with the ' +
    'artefacts of its own run named. **It is a different object from a derivation: it tells a reader ' +
    'what the hosts do TODAY, not what they did when the record was written.**\n\n' +
    'The same boundary applies to **L-0218**, whose three unreadable channels are a retrieval finding ' +
    'throughout.\n\n',
);

w("## 4. L-0220's thirteen handover-counted schemes\n\n");
w(
  '**THE DISCRIMINATOR, stated as a rule rather than as a conclusion:** the scheme reports a count ' +
    'taken at the moment the state hands something over, and its announced purpose is realised only if ' +
    'a second party then does something further — buys the refill, occupies the house, boards the ' +
    'flight. Where the thing handed over IS the service, there is no further step and no gap.\n\n' +
    '**The membership is taken verbatim from L-0220\'s own source field, not reconstructed.** What IS computed is ' +
    "every checkable property of the list, so a reader can test the pattern the record claims.\n\n",
);
w('| record | verdict | title |\n|---|---|---|\n');
for (const id of [...HANDOVER, ...CONTROLS]) {
  const r = byId.get(id);
  if (!r) { w(`| ${id} | **NOT IN /data** | — |\n`); continue; }
  const tag = CONTROLS.includes(id) ? ' *(control)*' : '';
  w(`| ${id}${tag} | \`${r.assessment}\` | ${String(r.title).replace(/\|/g, '\\|').slice(0, 78)} |\n`);
}
w('\n');
const hv = HANDOVER.map((id) => byId.get(id)?.assessment);
const cv = CONTROLS.map((id) => byId.get(id)?.assessment);
w(
  `**The claim: all thirteen carry \`partly\` and both controls carry \`worked\`.** Computed: ` +
    `${hv.filter((v) => v === 'partly').length} of ${HANDOVER.length} handover records are \`partly\`` +
    `${hv.some((v) => v !== 'partly') ? ` — the exceptions are ${HANDOVER.filter((id) => byId.get(id)?.assessment !== 'partly').map((id) => `${id} (\`${byId.get(id)?.assessment}\`)`).join(', ')}` : ''}; ` +
    `${cv.filter((v) => v === 'worked').length} of ${CONTROLS.length} controls are \`worked\`.\n\n`,
);
if (history) {
  const moved = [...HANDOVER, ...CONTROLS].filter((id) => (history[id]?.values?.length ?? 1) > 1);
  w(
    `**The claim that the scores predate the pattern.** \`review/record-history.json\`, generated from ` +
      `git by \`tools/gen-record-history.mjs\`, records every observed change of \`assessment\`. Of the ` +
      `${HANDOVER.length + CONTROLS.length} records above, **${moved.length} changed verdict at any point**` +
      `${moved.length ? `: ${moved.map((id) => `${id} (${history[id].values.map((v) => v.v).join('→')})`).join(', ')}` : ''}. ` +
      'A reader can re-derive this with `npm run record-history`.\n\n',
  );
}

w('---\n\n');
w('## 5. What a reader loses, stated rather than left to be noticed\n\n');
w(
  'A derivation is not a scored record and the difference is not only the verdict. Four things the ' +
    'three records carried have no home here, and pretending otherwise would repeat the fault that ' +
    'removed them:\n\n' +
    '- **The strongest case on each side.** L-0220 argued, against itself, that measuring at the ' +
    'handover is not laziness — it is the point at which the state’s own action is complete and ' +
    'attributable, counts there are auditable and timely, and several of the thirteen published the ' +
    'assessment that exposed their own gap. A table of thirteen ids does not say that.\n' +
    '- **The declared absences.** L-0220 recorded that it could not establish whether the pattern ' +
    'holds outside this corpus, or whether schemes measure at the handover by choice or because the ' +
    'use measurement does not exist. Those are findings about the limits of the finding.\n' +
    '- **The caveats.** L-0219 recorded that every figure it gave described one client on one day, ' +
    'and named three occasions when that mattered — ten live government hosts wrongly measured as ' +
    'unreachable, the e-Gazette wrongly recorded as unreachable, and two runs of its own partition ' +
    'discarded. L-0218 recorded that its channels finding was a retrieval result throughout.\n' +
    '- **The revisit triggers, and a place in the cross-tabs.** The three no longer appear in any ' +
    'verdict-by-domain or verdict-by-tier count, so a reader comparing this corpus over time will ' +
    'see the ledger fall from 226 to 223 records with no scored record having been withdrawn on its ' +
    'merits.\n\n' +
    '**What is NOT lost is the arithmetic**, which is the half a reader could never check before: ' +
    'every count above is recomputed from public `/data` with its rule printed beside it, where ' +
    'previously it rested on a private repository returning HTTP 404.\n\n',
);
w('---\n\n');
w(
  '**The records this file replaces are gone from the ledger, not overruled.** Nothing here disputes ' +
    'what they found; the change is where a finding of this kind belongs. The test for a future ' +
    'record is whether anything outside this corpus would have to change for the finding to change — ' +
    'if nothing would, it is method.\n',
);

const body = P.join('');
// Self-description check: the rule strings must reach the page, or the file asserts a reproducibility
// it does not provide.
for (const needle of ['isBareRoot(u)', 'namesNoDocument(name)', 'THE DISCRIMINATOR', 'What a reader loses']) {
  if (!body.includes(needle)) {
    console.error(`gen-derivations FAILED — the stated rule "${needle}" did not reach the output`);
    process.exit(1);
  }
}
writeFileSync(OUT, body);
console.log(
  `derivations OK — bare roots ${bareOcc.length} occurrences / ${pairs.size} pairs / ${bareRoots.size} roots · ` +
    `${genreOcc.length} citations naming no document · ${HANDOVER.length} handover records + ${CONTROLS.length} controls · ` +
    `${Buffer.byteLength(body).toLocaleString()} bytes -> ${OUT.replace(`${ROOT}/`, '')}`,
);
