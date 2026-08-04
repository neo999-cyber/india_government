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
  'united-states': ['L-0184', 'L-0185', 'L-0186', 'L-0187', 'L-0188', 'L-0189'],
  russia: ['L-0184', 'L-0189'],
  china: ['L-0190', 'L-0191'],
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
