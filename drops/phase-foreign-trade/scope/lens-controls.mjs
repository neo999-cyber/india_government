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
];

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
console.log(failures === 0 ? `\nlens-controls OK — ${CONTROLS.length} paired controls, both members asserted` : `\nlens-controls FAILED — ${failures}`);
process.exit(failures === 0 ? 0 : 1);
