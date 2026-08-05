#!/usr/bin/env node
/**
 * Paired controls for the phase-14 lens values.
 *
 * ONE NEGATIVE CONTROL PER NEW LENS, WITH A SAME-FORM POSITIVE BESIDE IT. A check reporting clean
 * with no positive beside it has now cost this project five times: it proves the needle absent,
 * not the search working. Every pair below is same-form on purpose — same layer, same file, same
 * phase, same domain set where possible — so the ONLY difference between the two members is the
 * property the lens is supposed to key on. A pair that differs in two ways proves nothing about
 * either.
 *
 * Usage: node drops/phase-foreign-trade/scope/lens-controls.mjs
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const load = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));

const find = (file, id) => {
  const recs = load(file);
  const r = recs.find((x) => x.id === id);
  if (!r) throw new Error(`control refers to ${id} in ${file} and it is not there — the control is stale, not passing`);
  return r;
};
const lensesOf = (r) => new Set([...(r.lenses ?? []), ...(r.domains ?? [])]);

const CONTROLS = [
  {
    lens: 'defence-sector',
    positive: {
      file: 'data/ledger/kashmir-security.json', id: 'L-0122',
      why: 'AFSPA s.7 sanction for prosecution of armed-forces personnel — the subject IS the force, and it files governance only because the domain enum carves the treatment of civilians out of defence',
    },
    negative: {
      file: 'data/ledger/kashmir-security.json', id: 'L-0114',
      why: 'pellet-firing shotguns: same file, same phase, same domains (governance + kashmir), and the subject is an injury count and its refusal rather than the force that fired',
    },
  },
  {
    lens: 'defence-sector',
    positive: {
      file: 'data/series/kashmir-security.json', id: 'jk-security-forces-killed',
      why: 'security-force personnel killed — a measurement of the force itself',
    },
    negative: {
      file: 'data/series/kashmir-security.json', id: 'jk-pellet-deaths',
      why: 'protesters killed by pellets: same file, same phase, and the population measured is protesters, not the force',
    },
  },
  {
    // The strongest pair in this file: same drop file, same phase, same term, same type (shock) and
    // the same two domains (foreign + macro). The ONLY thing that differs between the two records is
    // whether Russia is a party to what the record describes.
    lens: 'russia',
    positive: {
      file: 'data/ledger/foreign-trade.json', id: 'L-0184',
      why: 'the fifty per cent wall — its second tranche rests on a finding about India importing Russian oil, under an emergency declared about Russia',
    },
    negative: {
      file: 'data/ledger/foreign-trade.json', id: 'L-0186',
      why: 'the section 122 surcharge: same file, same phase, same term, same type and same domains, and Russia is nowhere in it — a balance-of-payments measure applied to all trading partners',
    },
  },
  {
    // SAME-FORM IS WEAKER HERE AND THE CONTROL SAYS SO RATHER THAN PRETENDING OTHERWISE. Arc A is the
    // United States file, so every phase-14 record written in this batch legitimately carries the
    // lens and none of them can serve as the negative. The negative is therefore a pre-existing
    // ledger record in the same layer and the same `foreign` domain — matched on the property that
    // would tempt a careless sweep, namely that it is a record about trade agreements and tariffs —
    // and it differs from the positive in phase and type, which a same-file pair would not.
    lens: 'united-states',
    positive: {
      file: 'data/ledger/foreign-trade.json', id: 'L-0186',
      why: 'the section 122 surcharge — a United States instrument, and the rate Indian exporters paid for 150 days',
    },
    negative: {
      file: 'data/ledger/macro-fiscal.json', id: 'L-0018',
      why: 'RCEP withdrawal: same layer, same `foreign` domain, and a record about trade agreements and tariffs — exactly the shape a keyword sweep would wrongly pull in — with the United States not a party to RCEP at all',
    },
  },
  {
    // THE RESTRICTION THIS NEGATIVE DEPENDS ON IS "mentions China", AND THE POSITIVE PASSES THROUGH
    // IT. A corpus scan for the word China returns 15 records; all but two are peer-panel comparisons
    // or supply-chain context ("China+1", "56% of China's yield"), not the bilateral relationship.
    // A negative drawn from a record that never mentions China would prove nothing — it would show
    // the lens absent where nothing could have put it. Both members here mention China; only one has
    // China as its counterparty.
    lens: 'china',
    positive: {
      file: 'data/ledger/foreign-trade.json', id: 'L-0190',
      why: 'the merchandise mirror — China is the counterparty and the record is two countries\' figures for one flow',
    },
    negative: {
      file: 'data/ledger/agriculture.json', id: 'L-0073',
      why: 'foodgrain production: mentions China, and mentions it as a YIELD COMPARATOR from the peer panel. The subject is Indian cereal yield; China is a benchmark, not a counterparty',
    },
  },
  {
    // THE RESTRICTION: "is about a country India trades with". Both members are ledger records in the
    // same file, same phase, same domain and the same type — and the negative is the China mirror,
    // which is a bilateral trade record about a country that is emphatically NOT in the neighbourhood
    // set this lens names. A negative drawn from a record with no trade content at all would prove
    // nothing about whether the lens keys on the region or merely on trade.
    lens: 'neighbourhood',
    positive: {
      file: 'data/ledger/foreign-trade.json', id: 'L-0192',
      why: 'the six-partner regional merchandise position — the neighbourhood as one object, which is what the value names',
    },
    negative: {
      file: 'data/ledger/foreign-trade.json', id: 'L-0190',
      why: 'the India-China mirror: same file, same phase, same domains, same type, and a bilateral trade record — but China is not in the neighbourhood set, so the lens must not reach it',
    },
  },
  {
    // The restriction: "is a trade agreement with a European counterparty". Both members are ledger
    // records in the same file and the same phase, both about in-force trade agreements concluded in
    // the same period — and the negative is the UAE/Australia doubling claim, which is the same KIND
    // of record about non-European counterparties. A negative with no trade-agreement content would
    // not show whether the lens keys on Europe or merely on trade agreements.
    lens: 'europe',
    positive: {
      file: 'data/ledger/foreign-trade.json', id: 'L-0204',
      why: 'the India-UK CETA — a European counterparty, in force, and one leg of the arc the value names',
    },
    negative: {
      file: 'data/ledger/foreign-trade.json', id: 'L-0195',
      why: 'the doubling claim: same file, same phase, same domains, and also about in-force trade agreements — but the counterparties are the UAE and Australia, so the lens must not reach it',
    },
  },
];

/**
 * Every declared lens returns a NON-EMPTY and CORRECT set.
 *
 * Non-empty is already enforced by `lens-empty` in domain-coverage. Correct is not, and cannot be:
 * a gate can tell that a lens has members, not that it has the RIGHT members. These are asserted by
 * exact membership for the two lenses this phase authored, so a record silently gaining or losing
 * the tag is caught here rather than by a reader noticing a filter looks wrong.
 */
const EXPECTED_MEMBERS = {
  // The backfilled lens, and the one most likely to drift silently: twelve records gained it by a
  // criterion applied per record in batch 1, and a thirteenth was added by arc E. Pinned so a
  // record quietly losing or gaining it fails here rather than changing a filter nobody re-reads.
  'defence-sector': [
    'L-0009', 'L-0110', 'L-0111', 'L-0112', 'L-0113', 'L-0115', 'L-0116', 'L-0117',
    'L-0119', 'L-0120', 'L-0121', 'L-0122', 'L-0196', 'L-0197', 'L-0198', 'L-0199', 'L-0200', 'L-0201', 'L-0202', 'L-0203',
  ],
  'united-states': ['L-0184', 'L-0185', 'L-0186', 'L-0187', 'L-0188', 'L-0189', 'L-0199'],
  russia: ['L-0184', 'L-0189', 'L-0199', 'L-0202'],
  china: ['L-0190', 'L-0191'],
  neighbourhood: ['L-0192', 'L-0193', 'L-0206', 'L-0207', 'L-0208', 'L-0209', 'L-0210', 'L-0211', 'L-0212', 'L-0216'],
  europe: ['L-0194', 'L-0204', 'L-0205', 'L-0213'],
};

let failures = 0;
for (const c of CONTROLS) {
  for (const [side, expect] of [['positive', true], ['negative', false]]) {
    const spec = c[side];
    let r;
    try {
      r = find(spec.file, spec.id);
    } catch (e) {
      console.error(`  FAIL [${c.lens}] ${side} ${spec.id}: ${e.message}`);
      failures += 1;
      continue;
    }
    const has = lensesOf(r).has(c.lens);
    if (has === expect) {
      console.log(`  ok   [${c.lens}] ${side} ${spec.id} ${has ? 'carries' : 'does not carry'} it — ${spec.why}`);
    } else {
      console.error(`  FAIL [${c.lens}] ${side} ${spec.id}: expected ${expect ? 'to carry' : 'NOT to carry'} "${c.lens}", it does ${has ? '' : 'not '}— ${spec.why}`);
      failures += 1;
    }
  }
}
// Exact-membership assertions, ledger layer.
{
  const LEDGER_FILES = ['baseline','macro-fiscal','banking','employment','agriculture','welfare','infrastructure','education','federalism','rights-institutions','kashmir-security','kashmir-rights','foreign-trade'];
  const all = LEDGER_FILES.flatMap((n) => {
    try { return load(`data/ledger/${n}.json`); } catch { return []; }
  });
  for (const [lens, want] of Object.entries(EXPECTED_MEMBERS)) {
    const got = all.filter((r) => lensesOf(r).has(lens)).map((r) => r.id).sort();
    const expected = [...want].sort();
    if (JSON.stringify(got) === JSON.stringify(expected)) {
      console.log(`  ok   [${lens}] ledger membership is exactly ${expected.join(', ')}`);
    } else {
      console.error(`  FAIL [${lens}] ledger membership drifted: got ${got.join(', ') || '(none)'}, expected ${expected.join(', ')}`);
      failures += 1;
    }
  }
}

console.log(failures === 0 ? `\nlens-controls OK — ${CONTROLS.length} paired controls, both members asserted` : `\nlens-controls FAILED — ${failures}`);
process.exit(failures === 0 ? 0 : 1);
