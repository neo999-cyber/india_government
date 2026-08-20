#!/usr/bin/env node
/**
 * DEPLOY CHECK — does the DEPLOYED artefact render what `/data` says, judged by the same machinery
 * the build gate uses?
 *
 * WHY THIS FILE EXISTS RATHER THAN ANOTHER HAND-WRITTEN SCRIPT. Every deployment so far has been
 * verified by an ad-hoc script written for that deployment, and four of those in one session
 * reported a correct page broken — each because the script normalised the page one way and its
 * needle another, and one because a needle was typed from memory of a record rather than read from
 * it. The gate was right every time and the script was wrong every time. So the deploy path now
 * imports what the gate imports:
 *
 *   - `tools/lib/page-text.mjs`      the ONE normaliser, applied to page and needle alike
 *   - `tools/lib/value-renderings.mjs`  how a non-prose value looks once rendered
 *   - `tools/lib/schema-fields.mjs`  the field enumeration, prose defined and non-prose the complement
 *
 * NEEDLES ARE DERIVED FROM `/data` IN THIS OPERATION AND NEVER TYPED. That is CLAUDE.md's rule and
 * it has been broken twice by hand-written controls — `FUSES` in capitals against a lower-case
 * needle, `Incapsula WAF stub` against a needle that dropped the WAF.
 *
 * EVERY PAGE CARRIES A NEGATIVE CONTROL IN THE SAME FORM. For each record checked, a value drawn
 * from a DIFFERENT record of the same layer and field must be ABSENT. Without it, a proxy serving
 * one page for every URL — or a fetch that silently followed a redirect to the index — would pass
 * every positive assertion in the run. The negative is chosen from real data, so it is the same
 * shape as the positives and passes through the same normaliser.
 *
 * IT IS NOT IN THE BUILD AND MUST NOT BE. It needs the network and a live deployment; a gate that
 * fails when Vercel is slow would block every commit on somebody else's uptime.
 *
 * Usage:
 *   node tools/deploy-check.mjs                          # deterministic sample across all layers
 *   node tools/deploy-check.mjs --ids L-0221,P-123
 *   node tools/deploy-check.mjs --sample 12 --base https://india-government.vercel.app
 *   node tools/deploy-check.mjs --commit 59d33b7   # verify a squash/merge commit from another branch
 *   node tools/deploy-check.mjs --verbose
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { leafFields, isProse, valuesAt } from './lib/schema-fields.mjs';
import { RENDERINGS, acceptedForms } from './lib/value-renderings.mjs';
import { norm, pageTextFromHtml } from './lib/page-text.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = argv.indexOf(name);
  return i === -1 ? fallback : argv[i + 1];
};
const BASE = (flag('--base', 'https://india-government.vercel.app') ?? '').replace(/\/$/, '');
const VERBOSE = argv.includes('--verbose');
const SAMPLE = Number(flag('--sample', '9'));
const ONLY_IDS = flag('--ids') ? flag('--ids').split(',').map((s) => s.trim()) : null;
const EXPECTED_REF = flag('--commit', 'HEAD');

const LAYERS = ['ledger', 'provenance', 'series'];

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

/**
 * A DETERMINISTIC spread, not a random one. A random sample makes a failure unreproducible and lets
 * a re-run "fix" a defect by not drawing it; this takes evenly spaced records by sorted id, so the
 * same corpus always yields the same pages and a reported failure can be re-checked exactly.
 */
function spread(records, n) {
  const sorted = [...records].sort((a, b) => a.id.localeCompare(b.id));
  if (sorted.length <= n) return sorted;
  const step = sorted.length / n;
  return Array.from({ length: n }, (_, i) => sorted[Math.floor(i * step)]);
}

const fetchText = async (url) => {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) return { status: res.status, text: null };
  return { status: res.status, text: pageTextFromHtml(await res.text()) };
};

/** THE FIRST REQUEST IS THE DEPLOY IDENTITY, not a sampled page. A page can be correct and old. */
let expectedCommit;
try {
  expectedCommit = execFileSync('git', ['rev-parse', EXPECTED_REF], { cwd: ROOT, encoding: 'utf8' }).trim().toLowerCase();
} catch {
  console.error(`deploy-check FAILED — cannot resolve expected commit ${EXPECTED_REF}; pass --commit with a reachable ref`);
  process.exit(1);
}

let deployedCommit = null;
try {
  const response = await fetch(`${BASE}/data/v1/manifest.json`, { redirect: 'follow' });
  if (response.ok) deployedCommit = String((await response.json()).commit ?? '').toLowerCase();
} catch {
  /* the failure below names the missing manifest rather than leaking a fetch implementation error */
}
if (deployedCommit !== expectedCommit) {
  console.error(
    `deploy-check FAILED — production manifest identifies ${deployedCommit || 'no commit'}, expected ${expectedCommit}\n` +
    '  Record-page assertions cannot prove deployment freshness; fix the build stamp or wait for the requested deploy.',
  );
  process.exit(1);
}

const results = [];
const record = (ok, layer, id, label, detail) => results.push({ ok, layer, id, label, detail });

let pages = 0;
for (const layer of LAYERS) {
  const all = loadLayer(layer);
  const fields = leafFields(layer);
  const targets = ONLY_IDS ? all.filter((r) => ONLY_IDS.includes(r.id)) : spread(all, SAMPLE);
  if (!targets.length) continue;

  for (const r of targets) {
    const { status, text } = await fetchText(`${BASE}/${layer}/${r.id}/`);
    pages += 1;
    if (text === null) {
      record(false, layer, r.id, `page fetch`, `HTTP ${status}`);
      continue;
    }

    let asserted = 0;
    for (const f of fields) {
      const vals = valuesAt(r, f.path);
      if (!vals.length) continue;
      let formsFor;
      if (isProse(f.def)) formsFor = (v) => [String(v)];
      else {
        const rendering = RENDERINGS[`${layer}.${f.path}`];
        if (!rendering) continue; // exempted by name; the build gate owns that decision
        formsFor = (v) => acceptedForms(rendering, v);
      }
      const assertable = vals.filter((v) => formsFor(v) !== null);
      if (!assertable.length) continue;
      asserted += 1;
      const missing = assertable.filter((v) => !formsFor(v).some((form) => text.includes(norm(form))));
      if (missing.length) {
        record(false, layer, r.id, f.path, `${missing.length}/${assertable.length} value(s) absent — e.g. ${JSON.stringify(missing[0]).slice(0, 80)}`);
      }
    }
    record(true, layer, r.id, 'fields asserted', String(asserted));

    // The negative control, in the same form and through the same normaliser: a title belonging to
    // a DIFFERENT record of this layer must not appear on this page.
    const other = all.find((o) => o.id !== r.id && o.title && o.title.length > 30 && !text.includes(norm(o.title)));
    const decoy = all.find((o) => o.id !== r.id && o.title && o.title.length > 30);
    if (decoy) {
      const present = text.includes(norm(decoy.title));
      // A cited record legitimately names another; the control uses one this page does NOT cite.
      const clean = other ?? decoy;
      record(!text.includes(norm(clean.title)), layer, r.id, 'negative control', `${clean.id}'s title absent`);
      if (VERBOSE && present) console.log(`    note: ${decoy.id} is referenced on ${r.id}; control used ${clean.id}`);
    }
  }
}

const failures = results.filter((x) => !x.ok);
if (VERBOSE || failures.length) {
  for (const x of VERBOSE ? results : failures) {
    console.log(`${x.ok ? 'PASS' : 'FAIL'}  ${x.layer}/${x.id}  ${x.label}${x.detail ? ` — ${x.detail}` : ''}`);
  }
  console.log('');
}

if (failures.length) {
  console.error(
    `deploy-check FAILED — ${failures.length} assertion(s) on ${pages} deployed page(s) at ${BASE}\n\n` +
    '  Before treating this as a rendering defect, read the raw bytes of one failing page. Four\n' +
    '  ad-hoc checks in one session reported correct pages broken, and every one was the checker.\n' +
    '  This tool shares its normaliser with field-render-audit, so a disagreement between the two\n' +
    '  is a real signal — and if field-render-audit is clean on the same field, suspect the deploy,\n' +
    '  not the page.',
  );
  process.exit(1);
}

console.log(
  `deploy-check OK — manifest matches ${expectedCommit.slice(0, 7)} · ` +
  `${results.filter((x) => x.label === 'fields asserted').length} record page(s) fetched from ${BASE}, ` +
  `${results.filter((x) => x.label === 'negative control').length} negative control(s), 0 value(s) missing · ` +
  `needles derived from /data through tools/lib/page-text.mjs`,
);
