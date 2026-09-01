#!/usr/bin/env node
/**
 * Domain-surface gate: every domain value the schemas admit must have a rendered page, and
 * every record must reach the domain surface it declares.
 *
 * WHY THIS EXISTS, stated as the finding rather than the bug. `education` had no domain page
 * for a month behind a green gate. It was added to the schemas in phase 10 and never to
 * `lib/types.ts`, so `generateStaticParams` never emitted it: 48 series and 20 ledger records
 * — the whole phase-10 corpus — had no domain surface. Nothing failed. `validate` passed,
 * `typecheck` passed, `reachability` reported 492/492 every single run.
 *
 * All three were RIGHT. Reachability asks whether a declared mark renders on the page of the
 * record that declares it, and it did, on all 492. The question it does not ask is whether the
 * record is reachable from anywhere a reader would start. **A check can be sound, complete and
 * green while the question it asks is not the one that would have caught the defect** — and the
 * green number is actively reassuring while the dimension goes unexamined.
 *
 * This is the same class as the phase-6c view-suppression regression, one level up. There, a
 * component suppressed a mark because another component was expected to render it. Here, an
 * entire axis of navigation was absent and no check enumerated the axis.
 *
 * REGENERATING SPECS FROM /data DOES NOT ADDRESS THIS. That discipline — which this gate also
 * follows — guards against a stale needle: a check that looks for what the data used to say.
 * Every needle here is derived from /data and the schemas at run time, and it would have been
 * just as green, because the needle was never stale. The gap was a dimension nobody checked,
 * and freshness is orthogonal to coverage.
 *
 * THE EXPECTED SET IS DERIVED FROM THE SCHEMAS, NEVER FROM lib/types.ts. `types.ts` is the thing
 * that drifted; asking it what domains exist would be asking the defect to report itself, and
 * the gate would have been green through the whole month. The schemas are the contract
 * (CLAUDE.md, Roles) and the union across all four is taken, so a value present in one schema
 * and missing from another is also caught.
 *
 * Reads built output, per Rule 1 — page emission is decided by `generateStaticParams`, and a
 * validator rule about it would have to model the render path it is meant to police. It runs
 * after `next build` for the same reason `reachability` does: `validate` runs before `out/`
 * exists and cannot see any of this.
 *
 * Usage:
 *   node tools/domain-coverage.mjs                     # data/ + schemas/ against out/
 *   node tools/domain-coverage.mjs --data D --out O    # fixtures
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertFresh } from './lib/freshness.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(name);
  return i === -1 ? fallback : argv[i + 1];
};
const VERBOSE = process.argv.includes('--verbose');
const DATA_DIR = arg('--data', join(ROOT, 'data'));
const OUT_DIR = arg('--out', join(ROOT, 'out'));
const SCHEMAS_DIR = join(ROOT, 'schemas');

// See tools/lib/freshness.mjs. Same call shape as reachability's, same exemption for fixture pairs.
if (argv.indexOf('--data') === -1 && argv.indexOf('--out') === -1) {
  assertFresh('domain-coverage', OUT_DIR, ['data', 'app', 'components', 'lib'].map((d) => join(ROOT, d)));
} else if (argv.includes('--check-freshness')) {
  assertFresh('domain-coverage', OUT_DIR, [DATA_DIR]);
}

const readSchema = (name) => JSON.parse(readFileSync(join(SCHEMAS_DIR, `${name}.schema.json`), 'utf8'));

/**
 * Where each schema states its domain values. Four declarations of one enum, and the union is
 * taken rather than any single one, so divergence between them is itself caught.
 *
 * `all` is provenance-only and is not a domain: it means the record bears on every domain, so
 * it is stripped from the expected page set and handled as a fan-out in the reach check below.
 */
const DOMAIN_PATHS = [
  ['series', (s) => s.properties.domain.enum],
  ['ledger', (s) => s.properties.domains.items.enum],
  ['pairs', (s) => s.properties.domain.enum],
  ['provenance', (s) => s.properties.affectsDomains.items.enum],
];
const ALL = 'all';
const declaredDomains = new Map();
for (const [name, pick] of DOMAIN_PATHS) declaredDomains.set(name, pick(readSchema(name)));
const DOMAINS = [...new Set([...declaredDomains.values()].flat())].filter((d) => d !== ALL).sort();

/**
 * The lens values, as the union across every schema that declares them.
 *
 * Union, not `series`, for the reason DOMAIN_PATHS takes a union: three schemas now declare this
 * enum — series, pairs and ledger, the last since phase 14 — and a value present in one and
 * missing from another is itself the defect. Reading one schema would have called that agreement.
 *
 * THIS WAS "a subset of DOMAINS today, asserted rather than assumed", AND THE ASSERTION WAS RIGHT
 * TO EXIST AND HAS NOW FIRED. It held while both values had been read off the domain enum. Phase
 * 14 added six counterparty lenses that are not subject areas — a counterparty answers who a
 * record is about, not what — so the subset relation is gone and the check that policed it would
 * now fail every build for values that are behaving correctly. Replaced below with the claim it
 * was standing in for: a lens must have a SURFACE, not a domain value.
 */
const LENS_PATHS = ['series', 'pairs', 'ledger'];
const declaredLenses = new Map(
  LENS_PATHS.map((n) => [n, readSchema(n).properties.lenses.items.enum]),
);
const LENSES = [...new Set([...declaredLenses.values()].flat())].sort();
for (const [name, vals] of declaredLenses) {
  const missing = LENSES.filter((l) => !vals.includes(l));
  if (missing.length) {
    console.error(
      `domain-coverage: ${name}.schema.json declares lenses[] without ${missing.join(', ')} — ` +
        `the three declarations of one enum have diverged`,
    );
    process.exit(2);
  }
}

// ---------------------------------------------------------------- data

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
  const roots = [join(DATA_DIR, layer), join(DATA_DIR, `${layer}.json`)];
  const files = roots.flatMap((p) =>
    existsSync(p) ? (statSync(p).isDirectory() ? jsonFiles(p) : [p]) : [],
  );
  const records = [];
  for (const f of files) {
    const parsed = JSON.parse(readFileSync(f, 'utf8'));
    const list = Array.isArray(parsed) ? parsed : (parsed.records ?? parsed.series ?? []);
    for (const r of list) records.push(r);
  }
  return records;
}

// ---------------------------------------------------------------- output

/**
 * Script blocks are stripped BEFORE anything else is read off a page, and that is not a detail.
 * Next embeds the entire rendered payload as escaped JSON in a hydration script, so every href
 * and every string is present in the file whether or not it renders. A gate that searched raw
 * HTML would report total coverage on a site with no domain pages at all.
 */
const strip = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');

const text = (html) => strip(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

/** Hrefs that a reader can actually click — from stripped HTML, for the reason above. */
function hrefs(html) {
  const out = new Set();
  for (const m of strip(html).matchAll(/href="([^"]+)"/g)) out.add(m[1]);
  return out;
}

const pagePath = (d) => join(OUT_DIR, 'domains', d, 'index.html');
const readPage = (d) => (existsSync(pagePath(d)) ? readFileSync(pagePath(d), 'utf8') : null);

/**
 * THE TOPIC INDEX IS `/overview/`, NOT `/domains/` — changed 2026-08-14 when the two were merged.
 *
 * `/domains/` was fourteen cards linking to the same fourteen topic pages `/overview/`'s board
 * already links to, carrying the same counts and the same derived lead figure. It was folded in and
 * removed, so the surface that must link every topic is the board.
 */
const indexPath = join(OUT_DIR, 'overview', 'index.html');
if (!existsSync(indexPath)) {
  console.error(`domain-coverage: no topic index at ${indexPath} — run the build first`);
  process.exit(2);
}
const indexHrefs = hrefs(readFileSync(indexPath, 'utf8'));

const lensPagePath = (l) => join(OUT_DIR, 'lenses', l, 'index.html');
const readLensPage = (l) => (existsSync(lensPagePath(l)) ? readFileSync(lensPagePath(l), 'utf8') : null);
/* THE LENS INDEX IS A SECTION OF `/overview/` FROM 2026-09-01, not a page of its own.
   **WITHDRAWN: `join(OUT_DIR, 'lenses', 'index.html')`.** What this gate binds is unchanged and is
   the point of it — every declared lens value must have somewhere that navigates to it — so it
   follows the index to wherever the index is rather than asserting a route. The lens PAGES at
   `/lenses/<lens>/` never moved. */
const lensIndexPath = join(OUT_DIR, 'overview', 'index.html');
const lensIndexHrefs = existsSync(lensIndexPath) ? hrefs(readFileSync(lensIndexPath, 'utf8')) : null;

// ---------------------------------------------------------------- assertions

const failures = [];
const counts = {
  pages: { want: 0, got: 0 },
  indexed: { want: 0, got: 0 },
  records: { want: 0, got: 0 },
  lenses: { want: 0, got: 0 },
  lensRecords: { want: 0, got: 0 },
};

/** A. Every schema domain value emits a page, and the index links to it. */
const surfaces = new Map();
for (const d of DOMAINS) {
  counts.pages.want += 1;
  counts.indexed.want += 1;
  const html = readPage(d);
  if (html === null) {
    const where = declaredDomains.entries();
    const inSchemas = [...where].filter(([, vals]) => vals.includes(d)).map(([n]) => n);
    failures.push({
      kind: 'page',
      what: d,
      why:
        `the schemas admit "${d}" (declared in ${inSchemas.join(', ')}) and no page was built for it. ` +
        `Any record filing this domain is unreachable from /domains/ — check that the value is in ` +
        `DOMAINS in lib/types.ts, which generateStaticParams reads`,
    });
    continue;
  }
  counts.pages.got += 1;
  /**
   * THE TOPIC SURFACE IS ONE PAGE AGAIN — 2026-08-14.
   *
   * WITHDRAWN, so the change is checkable. This read a UNION over five pages, and its own note said
   * why: *"THE DOMAIN SURFACE IS FIVE PAGES SINCE 2026-08-11, NOT ONE — the topic tabs … on the day
   * the tabs landed it reported 632 coverage failures"*. It also asserted that the overview LINKED
   * all four tabs, because a union over pages nothing navigates to would have been a weakening.
   *
   * **Both were correct for the tabs and neither has anything to bind now.** The four sections are
   * on the page this reads, so the union is the page, and there is no separate route to navigate
   * to. The check goes back to what it asserted before the split, which is the stronger form: every
   * record declaring this topic is reachable from the one surface a reader lands on.
   */
  const union = { text: text(html), hrefs: hrefs(html) };
  surfaces.set(d, union);
  if (indexHrefs.has(`/domains/${d}/`)) counts.indexed.got += 1;
  else failures.push({ kind: 'index', what: d, why: `a page exists at /domains/${d}/ and /overview/ does not link to it, so nothing navigates there` });
}

/**
 * A. bis — every lens value emits a page, and the lens index links to it.
 *
 * The claim being made is the one the old subset check was standing in for: a declared filter
 * must have somewhere to land. Stated directly it survives the axis growing past the domain enum,
 * where the old form would have failed six correct values and told the author to add six domains.
 */
const lensSurfaces = new Map();
if (lensIndexHrefs === null) {
  failures.push({
    kind: 'lens-index',
    what: '/lenses/',
    why: `no lens index at ${lensIndexPath}. Every lens value is a declared filter and nothing navigates to any of them`,
  });
}
for (const l of LENSES) {
  counts.lenses.want += 1;
  const html = readLensPage(l);
  if (html === null) {
    const inSchemas = [...declaredLenses.entries()].filter(([, v]) => v.includes(l)).map(([n]) => n);
    failures.push({
      kind: 'lens',
      what: l,
      why:
        `the schemas admit "${l}" as a lens (declared in ${inSchemas.join(', ')}) and no page was ` +
        `built at /lenses/${l}/. A lens with no surface is a filter that returns nothing to a reader ` +
        `who selects it — check that the value is in LENSES in lib/types.ts, which generateStaticParams reads`,
    });
    continue;
  }
  counts.lenses.got += 1;
  lensSurfaces.set(l, { text: text(html), hrefs: hrefs(html) });
  if (lensIndexHrefs && !lensIndexHrefs.has(`/lenses/${l}/`)) {
    failures.push({ kind: 'lens-index', what: l, why: `a page exists at /lenses/${l}/ but the lens index does not link to it, so nothing navigates there` });
  }
}

/**
 * A. ter — a declared lens must have records behind it.
 *
 * THE PAGE EXISTING IS NOT THE FILTER WORKING, and the gap between those two is the whole reason
 * this rule is separate from the one above. Phase 14 added the lens route, rebuilt, and every
 * assertion in this file went green — 8/8 surfaces built, 8/8 linked, every record-to-lens
 * reference reachable — while six of the eight lenses held nothing at all. A structural check
 * passes on a stub. A reader selecting `china` would have reached a correctly built, correctly
 * linked, entirely empty page, and nothing in the build would have said so.
 *
 * The rule this encodes is a phase-14 authoring rule made mechanical: a lens is admitted when its
 * records land, not when it is planned. Declaring the vocabulary early is right; merging a value
 * with nothing behind it is what is not. Counted against /data rather than the built page, because
 * the question is whether the instrument HOLDS anything under the lens — a page listing zero rows
 * is the symptom, and asserting on the symptom would pass the moment the page gained a heading.
 */
const lensPopulation = new Map(LENSES.map((l) => [l, 0]));
const bumpLens = (l) => { if (lensPopulation.has(l)) lensPopulation.set(l, lensPopulation.get(l) + 1); };
for (const s of loadLayer('series')) for (const l of s.lenses ?? []) bumpLens(l);
for (const p of loadLayer('pairs')) for (const l of p.lenses ?? []) bumpLens(l);
for (const r of loadLayer('ledger')) {
  // Both axes, deduplicated — a ledger record may declare a lens in `lenses[]` or, for the two
  // values that are also domain values, in `domains[]`, and either counts as population.
  for (const l of new Set([...(r.lenses ?? []), ...(r.domains ?? []).filter((d) => LENSES.includes(d))])) bumpLens(l);
}
for (const [l, n] of lensPopulation) {
  if (n > 0) continue;
  failures.push({
    kind: 'lens-empty',
    what: l,
    why:
      `"${l}" is in the lenses enum and no record in /data carries it, so selecting it returns ` +
      `nothing. Either author the records that populate it, or take the value out of the enum ` +
      `until they exist — a lens is admitted when its records land, not when it is planned`,
  });
}

/**
 * B. Every record reaches the surface of every domain it declares.
 *
 * The page existing is not the same claim as the record being on it — the phase-6c shape says
 * a surface can render and still omit what it was supposed to carry. Both are asserted.
 */
const reach = (domain, probe, subject) => {
  counts.records.want += 1;
  const s = surfaces.get(domain);
  if (!s) return; // the missing-page failure above already names it; do not report it twice
  const hit = probe.href ? s.hrefs.has(probe.href) : s.text.includes(probe.text);
  if (hit) counts.records.got += 1;
  else failures.push({ kind: 'record', what: subject, why: `declares domain "${domain}" but does not appear on /domains/${domain}/` });
};

/**
 * B. bis — a record declaring a lens must appear on that lens's page.
 *
 * Where a value is BOTH a lens and a domain, both surfaces are asserted rather than one. The
 * domain page has rendered a lens block since phase 13 and dropping the assertion on it while
 * adding one for the new route would leave the older surface unguarded — the same shape as the
 * regression this file exists to catch, and it would have been introduced by the fix for it.
 */
const reachLens = (lens, probe, subject) => {
  counts.lensRecords.want += 1;
  const s = lensSurfaces.get(lens);
  if (!s) return; // the missing-page failure above already names it
  const hit = probe.href ? s.hrefs.has(probe.href) : s.text.includes(probe.text);
  if (hit) counts.lensRecords.got += 1;
  else failures.push({ kind: 'lens-record', what: subject, why: `declares lens "${lens}" but does not appear on /lenses/${lens}/` });
};

for (const s of loadLayer('series')) {
  if (s.domain) reach(s.domain, { href: `/series/${s.id}/` }, `series ${s.id}`);
  for (const l of s.lenses ?? []) {
    reachLens(l, { href: `/series/${s.id}/` }, `series ${s.id}`);
    if (DOMAINS.includes(l)) reach(l, { href: `/series/${s.id}/` }, `series ${s.id} (lens)`);
  }
}
for (const l of loadLayer('ledger')) {
  for (const d of l.domains ?? []) reach(d, { href: `/ledger/${l.id}/` }, `ledger ${l.id}`);
  // A ledger lens can be declared on either axis: in `lenses[]` since phase 14, or — for the two
  // values that are also domain values — in `domains[]`, where nineteen shipped records still
  // carry it. Both must reach the lens page, and the union is deduplicated so a record declaring
  // one value on both axes is counted once rather than reported twice for the same absence.
  const declared = new Set([...(l.lenses ?? []), ...(l.domains ?? []).filter((d) => LENSES.includes(d))]);
  for (const lens of declared) reachLens(lens, { href: `/ledger/${l.id}/` }, `ledger ${l.id}`);
}
for (const p of loadLayer('pairs')) {
  if (p.domain) reach(p.domain, { text: p.id }, `pair ${p.id}`);
  for (const l of p.lenses ?? []) {
    reachLens(l, { text: p.id }, `pair ${p.id}`);
    if (DOMAINS.includes(l)) reach(l, { text: p.id }, `pair ${p.id} (lens)`);
  }
}
for (const p of loadLayer('provenance')) {
  // `all` fans out: the record bears on every domain, so it must appear on every surface.
  const targets = (p.affectsDomains ?? []).includes(ALL) ? DOMAINS : (p.affectsDomains ?? []);
  for (const d of targets) reach(d, { href: `/provenance/${p.id}/` }, `provenance ${p.id}`);
}

// ---------------------------------------------------------------- report

if (failures.length > 0) {
  console.error(`domain-coverage FAILED — ${failures.length} coverage failure(s)`);
  for (const f of failures) console.error(`  - [${f.kind}] ${f.what}: ${f.why}`);
  console.error(
    '\n  The schemas are the expected set, never lib/types.ts — types.ts is the layer that drifts,\n' +
      '  and asking it what domains exist is asking the defect to report itself.',
  );
  process.exit(1);
}

console.log(
  `domain-coverage OK — ${counts.pages.got}/${counts.pages.want} domain surfaces built, ` +
    `${counts.indexed.got}/${counts.indexed.want} linked from the index, ` +
    `${counts.records.got}/${counts.records.want} record-to-surface references reachable`,
);
if (VERBOSE) console.log(
  `  lens surfaces ${counts.lenses.got}/${counts.lenses.want} built and linked, ` +
    `${counts.lensRecords.got}/${counts.lensRecords.want} record-to-lens references reachable`,
);
if (VERBOSE) console.log(`  domains ${DOMAINS.length} (union of 4 schemas) · lenses ${LENSES.length} (union of 3): ${LENSES.join(', ')}`);
