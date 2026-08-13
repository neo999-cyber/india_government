#!/usr/bin/env node
/**
 * distinct-titles — no two records in a layer answer to the same name.
 *
 * ============================ WHY THIS IS A GATE AND NOT A REPORT =============================
 *
 * A title is how a record is named on every surface that lists it. `unrecognised-rows` already
 * enforces that a record named by TITLE sits in a recognised listing shape; it has no opinion on
 * whether that title identifies one record or two. **Two records with one title are two rows a
 * reader cannot tell apart**, and every count over titles is silently wrong by one.
 *
 * Ids are unique by construction — `validate` sees to that — so nothing else in the chain looks.
 *
 * ============================ THE ONE KNOWN CASE, EXEMPTED BY NAME AND NOT BY SHAPE ===========
 *
 * `nh-network` and `nh-network-length` both read *"National highway network length"*. **This gate
 * does not decide which is right, because that is a claim about the record and `/data` is
 * research-owned.** It is exempted BY ID, with the reason, so that:
 *
 *   - the corpus builds while the question is open, and
 *   - **a SECOND duplicate cannot arrive unnoticed behind the first**, which is what a report-only
 *     tool or a blanket allowance would permit.
 *
 * The evidence sits in `drops/phase-18-design-lock/STATE.md`. When the research pass resolves it,
 * delete the entry below; the gate will then hold the whole corpus with no exemption at all.
 *
 * NEGATIVE CONTROL: `--control` seeds a duplicate pair and requires rejection, checks the exempted
 * pair passes, and checks a distinct pair is not reported — a checker that reports clean with no
 * positive beside it proves the needle absent rather than the search working.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const verbose = process.argv.includes('--verbose');

/**
 * Exempted BY ID PAIR, never by title text — a text exemption would also silence a genuinely new
 * record that happened to reuse the words.
 */
const KNOWN_OPEN = [
  {
    ids: ['nh-network', 'nh-network-length'],
    why:
      'nh-network entered in phase 0 as static-export scaffold: one point, no caveat, no provenanceRefs, ' +
      'cited by nothing. nh-network-length entered in phase 5 with P-30, P-31 and the caveat recording that ' +
      '~54,004 km of the ~55,000 km increase is reclassification. Which record survives is a claim about the ' +
      'record and is research-owned. `nh-network` now carries a `notes` field pointing a reader at the other one, so the reader-facing half is closed; the exemption stays until the record question is settled. See STATE.md.',
  },
];

function layers() {
  const out = { series: [], ledger: [], provenance: [] };
  const sdir = join(ROOT, 'data/series');
  for (const f of readdirSync(sdir)) if (f.endsWith('.json')) out.series.push(...JSON.parse(readFileSync(join(sdir, f), 'utf8')));
  const ldir = join(ROOT, 'data/ledger');
  for (const f of readdirSync(ldir)) if (f.endsWith('.json')) out.ledger.push(...JSON.parse(readFileSync(join(ldir, f), 'utf8')));
  out.provenance.push(...JSON.parse(readFileSync(join(ROOT, 'data/provenance.json'), 'utf8')));
  return out;
}

/** Groups of two or more records in one layer sharing a normalised title. */
function collisions(records) {
  const byTitle = new Map();
  for (const r of records) {
    if (!r.title) continue;
    const k = r.title.trim().toLowerCase().replace(/\s+/g, ' ');
    byTitle.set(k, (byTitle.get(k) ?? []).concat(r.id));
  }
  return [...byTitle.entries()].filter(([, ids]) => ids.length > 1).map(([title, ids]) => ({ title, ids: ids.sort() }));
}

const exempt = (ids) => KNOWN_OPEN.some((k) => k.ids.length === ids.length && k.ids.every((i) => ids.includes(i)));

if (process.argv.includes('--control')) {
  const seeded = collisions([
    { id: 'a', title: 'Coal production' },
    { id: 'b', title: 'coal   PRODUCTION' },
    { id: 'c', title: 'Something else' },
  ]);
  if (seeded.length !== 1) throw new Error('control FAILED: a duplicate title differing only in case and spacing was not caught');
  if (seeded[0].ids.join(',') !== 'a,b') throw new Error('control FAILED: the wrong records were named');
  if (exempt(seeded[0].ids)) throw new Error('control FAILED: an unrelated pair was treated as exempted');

  const distinct = collisions([{ id: 'a', title: 'One' }, { id: 'b', title: 'Two' }]);
  if (distinct.length !== 0) throw new Error('control FAILED: distinct titles were reported as a collision');

  if (!exempt(['nh-network-length', 'nh-network'])) throw new Error('control FAILED: the known pair is not matched regardless of order');
  console.log(
    'distinct-titles --control — a duplicate differing only in case and spacing is caught and its records named; distinct titles are not; the known pair matches in either order and an unrelated pair does not',
  );
  process.exit(0);
}

const found = [];
let checked = 0;
for (const [layer, records] of Object.entries(layers())) {
  checked += records.length;
  for (const c of collisions(records)) if (!exempt(c.ids)) found.push(`${layer}: "${c.title}" is the title of ${c.ids.join(' and ')}`);
}

if (checked < 500) {
  console.error(`distinct-titles: only ${checked} records loaded. A shrunken corpus is a broken scan, not a clean one.`);
  process.exit(2);
}

if (found.length) {
  console.error(`distinct-titles FAILED — ${found.length} title(s) name more than one record:`);
  for (const f of found) console.error('  ' + f);
  console.error('  A title is how a record is named on every surface that lists it. Two records with one title are two rows a reader cannot tell apart.');
  process.exit(1);
}
console.log(
  `distinct-titles OK — ${checked} records across 3 layers, every title names exactly one record, ${KNOWN_OPEN.length} pair exempted by id and open in STATE.md` +
    (verbose ? ` · exempted: ${KNOWN_OPEN.map((k) => k.ids.join('/')).join(', ')}` : ''),
);
