#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unused-vars -- A ONE-OFF SCRIPT FROM THE 2026-08-06 PASS, KEPT AS A RECORD OF WHAT IT COMPUTED.
   Some values it derives are no longer read by its output. Deleting them would make the script
   tidier and would erase what that run actually measured, which is the reason it is still here.
   Not maintained; not in any gate. */
/**
 * THE PASS — the single operation in which the four rulings, the intra-state test and the tier
 * corrections are applied to the corpus. Kept as a tool rather than run as a shell one-liner
 * because it is the largest change since the phase opened and a reader is entitled to see exactly
 * what moved and on what rule.
 *
 * THE SINGLE-SNAPSHOT RULE IS THE POINT OF THIS FILE. Every rule below reads `snap`, which is the
 * corpus as it stood before anything moved, and writes into `edits`. Nothing reads a value another
 * rule in this pass has changed. The reason is concrete: the qualifying intra-state sources for
 * L-0023, L-0026 and L-0029 are the four `abclive.in` citations that band A re-tiers T1 -> T4 in
 * this same pass. Applied serially, the order decides three verdicts — re-tier first and all three
 * fail the independence test on a tier the pass is about to withdraw; test first and all three pass
 * on a tier that is about to be wrong. Neither answer is about the evidence.
 *
 * Usage:
 *   node tools/pass-2026-08-06.mjs --dry     print the plan, write nothing
 *   node tools/pass-2026-08-06.mjs --apply   write /data once
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const APPLY = process.argv.includes('--apply');
const DATA = join(ROOT, 'data');

/* ------------------------------------------------------------------ the snapshot */

const files = [
  ...readdirSync(join(DATA, 'ledger')).map((f) => `ledger/${f}`),
  ...readdirSync(join(DATA, 'series')).map((f) => `series/${f}`),
  'provenance.json',
];
/** file -> parsed array. Read ONCE. Every rule below reads from here and never from disk. */
const snap = new Map(files.map((f) => [f, JSON.parse(readFileSync(join(DATA, f), 'utf8'))]));
const layerOf = (f) => (f.startsWith('ledger/') ? 'ledger' : f.startsWith('series/') ? 'series' : 'provenance');
const recordsOf = (layer) => [...snap].filter(([f]) => layerOf(f) === layer).flatMap(([, rs]) => rs);
const findRecord = (id) => {
  for (const [f, rs] of snap) {
    const r = rs.find((x) => x.id === id);
    if (r) return { file: f, rec: r };
  }
  return null;
};

const log = [];
const note = (kind, id, what) => log.push({ kind, id, what });

/* ------------------------------------------------------------------ 1. departures */

/**
 * A self-audit does not belong in the scored ledger. The ladder grades external documents by their
 * distance from the event and a derivation over `/data` is at no distance. Their findings stay
 * published at /derivations, which is generated from the same data and prints its rules.
 */
const DEPART = ['L-0218', 'L-0219', 'L-0220'];

/* ------------------------------------------------------------------ 2. verdicts */

/**
 * Every entry states the ruling that moves it and the evidence. `to === from` is recorded too,
 * because a record that survives the pass survives it FOR A REASON and the reason belongs on the
 * record rather than in the absence of a diff.
 */
const VERDICTS = {
  'L-0151': {
    to: 'worked',
    rule: 'R1a — passes; R2 — no unmeasured limb',
    why:
      'INDEPENDENCE, RESTATED AFTER THE 2026-08-06 PASS: this is the one record in the class that survives every test. ' +
      'The evidence is intra-state — a later Finance Commission reporting on an earlier one — and it QUALIFIES under the ' +
      'intra-state test because a Commission report is that Commission’s own constitutional function, not a document ' +
      'produced in support of the claim; Table 7.5 and Annexure 7.1 are the Sixteenth Commission’s own computation and ' +
      'Figure 7.4 states CAG certificates as its source on the face of the figure. No limb of the recommendation is ' +
      'unmeasured. A reader should still know what kind of evidence this is: one arm of the state measuring another, ' +
      'which is better than a body scoring itself and is not the same as a source outside the state.',
  },
  'L-0052': {
    to: 'partly',
    rule: 'R2 — an unmeasured limb prevents worked',
    why:
      'RESCORED FROM worked TO partly, 2026-08-06. The independence test PASSES and passes cleanly: the CEA monthly ' +
      'Installed Capacity return is a statutory routine publication of a body other than the announcing ministry, and it ' +
      'is held here as a deep-linked document rather than through anyone’s account of it — the only clean pass in the ' +
      'class. What bars worked is the second condition. The commitment was capacity AND the energy it was meant to ' +
      'supply, and renewables’ share of energy actually GENERATED against their share of installed capacity is not ' +
      'measured here. Installed megawatts are not delivered electricity, and a target stated in capacity is met in ' +
      'capacity only.',
  },
  'L-0023': {
    to: 'partly',
    rule: 'R1a — fails: no qualifying source bears on the claim',
    why:
      'RESCORED FROM worked TO partly, 2026-08-06, and this record fails the independence test outright rather than on a ' +
      'technicality. The announcing body is the RBI. Every citation bearing on the claim is a Press Information Bureau ' +
      'release — a document produced in support of the claim, which the intra-state test excludes whoever computed the ' +
      'number inside it. The one routine-function source in the record, the RBI Financial Stability Report reached ' +
      'through credit-growth, does not bear on whether recognition was honest, and it is not held: it is cited through a ' +
      'news site’s account of the report, which the mirror rule grades T4. THE VERDICT IS NOT failed. Honest ' +
      'recognition may well have happened; on the evidence here it is UNESTABLISHED, and unestablished is not negative. ' +
      'What is independently established is narrower than the claim, which is what partly records.',
  },
  'L-0026': {
    to: 'partly',
    rule: 'R2 — consolidation efficiencies unmeasured; R1a passes on one limb only',
    why:
      'RESCORED FROM worked TO partly, 2026-08-06, on the ground two adversarial reviews reached independently and this ' +
      'instrument then confirmed: two objectives were announced and one is not established. Recapitalisation is ' +
      'evidenced; efficiency gains from consolidation, as distinct from the credit cycle and the rate environment, are ' +
      'not measured. There is no centrepiece exception and the note that explained the earlier choice documented a ' +
      'departure from the definition rather than authorising one. ON INDEPENDENCE: the qualifying source would be the ' +
      'RBI Financial Stability Report, whose CRAR series is the RBI’s own statutory publication and does bear on ' +
      'recapitalisation — but it is NOT HELD. Retrieval was attempted on 2026-08-06 through six named routes and failed ' +
      'at every one; see the crar series for the routes. The test is not passed on a document the instrument does not ' +
      'have.',
  },
  'L-0029': {
    to: 'partly',
    rule: 'R2 — two limbs unmeasured',
    why:
      'RESCORED FROM worked TO partly, 2026-08-06. Three objectives were announced: universal account access, ' +
      'elimination of ghost and duplicate beneficiaries through biometric authentication, and a public payments rail. ' +
      'Two are evidenced. The third is not measured at all, and neither is its counterpart — eligible people excluded by ' +
      'authentication failure — so the record cannot say whether the deduplication removed ghosts, claimants, or both. ' +
      'ON INDEPENDENCE: UPI volumes are published by NPCI as a routine function and would qualify, but this record ' +
      'reaches them through a news account of the Financial Stability Report rather than through NPCI, and the account ' +
      'is T4. Account counts come from the scheme’s own portal, which is the announcing body.',
  },
  'L-0047': {
    to: 'partly',
    rule: 'R1a — independent evidence FOUND, and it shows shortfall; R2 — emissions unmeasured',
    why:
      'RESCORED FROM worked TO partly, 2026-08-06, ON EVIDENCE RATHER THAN ON ITS ABSENCE. Independent evidence was ' +
      'searched for and found: the Comptroller and Auditor General’s Performance Audit Report No. 6 of 2024, Union ' +
      'Government (Railways), on energy management in train operations, for the year ended March 2022. A constitutional ' +
      'auditor reporting to Parliament on its own initiative is the clearest qualifying case the intra-state test has. ' +
      'IT FINDS THE ANNUAL ELECTRIFICATION TARGET MISSED IN EVERY YEAR OF 2017-18 TO 2021-22 — by 16.60, 46.94, 59.11, ' +
      '21.65 and 24.75 per cent — with eight zones short by over 1,000 route kilometres and delays at every stage from ' +
      'planning to execution. That does not refute the endpoint, which was reached after the audit period; it refutes ' +
      '"delivered close to fully" as a description of the SCHEDULE, on the government’s own target, measured by the ' +
      'government’s own auditor. AND THE EMISSIONS FIGURES ARE A PROJECTION, NOT A MEASUREMENT: the 2.8 billion ' +
      'litres of diesel and 342 million tonnes of CO2 per annum that appear in this area are what Indian Railways ' +
      'ENVISAGED would follow from full electrification, quoted by the CAG as the premise of the target it was auditing. ' +
      'No measured net-emissions figure exists here, because traction drawn from a coal-heavy grid substitutes one ' +
      'emission source for another and the net depends on the marginal generation mix. Electrification was delivered ' +
      'and the fuel saving is real; the announced object included emissions, and that limb is unmeasured.',
  },
  'L-0053': {
    to: 'partly',
    rule: 'R1a — independent evidence FOUND and it supports the record; R2 — waterways unmeasured',
    why:
      'RESCORED FROM worked TO partly, 2026-08-06, and the independent evidence found in the same pass runs the OTHER ' +
      'way — it is recorded here because the standard is about what the evidence can carry, not about which direction a ' +
      'finding runs. The World Bank and S&P Global Container Port Performance Index 2025 measures total vessel time in ' +
      'port, including waiting and berth, across more than 400 ports, and ranks twelve Indian ports. Jawaharlal Nehru ' +
      'Port stands 22nd globally on 1,307 sampled calls and appears in the report’s most-improved table with a ' +
      'thirty-two place gain; Chennai stands 123rd. That is external corroboration of the DIRECTION on a basis ' +
      'independent of the ministry — though not of the specific figure, since the index measures container vessels and ' +
      'the turnaround figures here are all-cargo. WHAT BARS worked IS THE SECOND LIMB: national waterways actually ' +
      'navigable against those declared is not measured, the record states the two diverge, and the modernisation ' +
      'commitment covered both.',
  },
  'L-0207': {
    to: 'partly',
    rule: 'R1a — independent evidence FOUND (foreign primary); R2 — commercial terms unmeasured',
    why:
      'RESCORED FROM worked TO partly, 2026-08-06. Independent evidence was searched for and found where the earlier ' +
      'note assumed none existed: BHUTAN IS A COUNTERPARTY, NOT A BYSTANDER. The Ministry of Energy and Natural ' +
      'Resources of the Royal Government of Bhutan recorded the synchronisation of the final unit on 27 August 2025 and ' +
      'more than 2,160 million units generated — a foreign national government primary, independent of the Indian ' +
      'ministry whose claim is under test, and it establishes the delivery the earlier verdict rested on. The record ' +
      'also gets its tariff: Bhutan Broadcasting Service reported on 11 April 2026 that the export tariff was set at Nu ' +
      '5.10 per unit, the highest for any Bhutanese hydropower project, which satisfies this record’s own ' +
      'revisit trigger. DELIVERY IS NOW INDEPENDENTLY ESTABLISHED AND THE COMMERCIAL LIMB STILL IS NOT: no figure exists ' +
      'for the interim tariff applied between 19 September 2025 and 9 April 2026, nothing states whether the Protocol ' +
      'reaches back over that period, and no project-level export volume to India has been retrieved. Power flowed for ' +
      'nearly seven months at a price that is still not on any public record.',
  },
  'L-0014': {
    to: 'contested',
    rule: 'R1 — the announced objective is unmeasured, not partly met',
    why:
      'RESCORED FROM worked TO contested, 2026-08-06, and contested rather than partly for a reason worth stating. The ' +
      'announced object of flexible inflation targeting was ANCHORING INFLATION EXPECTATIONS. What this record carries ' +
      'is lower CPI, the framework’s survival and its renewal through 2031. None of the three is a measure of ' +
      'expectations: CPI is the outcome expectations are supposed to influence, and institutional survival is evidence ' +
      'about the institution. partly would say part of the objective was achieved, which presupposes the objective was ' +
      'measured; it was not, so what the evidence supports is more than one defensible reading of the same facts — that ' +
      'the framework anchored expectations, and that disinflation arrived through commodity prices and global ' +
      'conditions with the framework alongside it. The record does not choose. THE SOURCING IS ALSO THE THINNEST IN THE ' +
      'CORPUS FOR A SCORED CLAIM: one T4 trade-press note on the renewal. The RBI’s own Inflation Expectations ' +
      'Survey of Households is the series that would settle this and it is not cited here.',
  },
};

/* ------------------------------------------------------------------ 3. tiers */

const host = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

/**
 * Bands, evaluated against the SNAPSHOT. Band C disappears with its records; band E — archived
 * primaries — is deliberately absent because the mirror rule already settled it at T1 and a pass
 * that "confirms" a value by rewriting it teaches nothing.
 */
const BANDS = [
  { band: 'A', to: 'T4', why: 'journalism and relayed accounts', test: (h) => /business-standard|assettype|abclive/.test(h) },
  { band: 'B', to: 'T2', why: 'multilateral, retrieved directly', test: (h) => /(^|\.)(un\.org|worldbank\.org)$/.test(h) },
  { band: 'D', to: 'T1F', why: 'foreign national government primary', test: (h) => /(govinfo|supremecourt|ustr|whitehouse)\.gov$/.test(h) },
];

/* ------------------------------------------------------------------ evaluate against snap */

const plan = { depart: [], verdict: [], tier: [] };

for (const id of DEPART) {
  const hit = findRecord(id);
  if (!hit) throw new Error(`pass: ${id} not found — it has already left, or the id is wrong`);
  plan.depart.push({ id, file: hit.file, title: hit.rec.title });
}

for (const [id, v] of Object.entries(VERDICTS)) {
  const hit = findRecord(id);
  if (!hit) throw new Error(`pass: ${id} not found`);
  plan.verdict.push({ id, file: hit.file, from: hit.rec.assessment, to: v.to, rule: v.rule, why: v.why });
}

for (const [file, rs] of snap) {
  const layer = layerOf(file);
  for (const r of rs) {
    if (DEPART.includes(r.id)) continue;
    const cites = layer === 'series' ? (r.source ? [{ holder: r, s: r.source }] : []) : (r.sources ?? []).map((s) => ({ holder: s, s }));
    for (const { holder, s } of cites) {
      const from = layer === 'series' ? r.tier : s.tier;
      if (from !== 'T1') continue;
      const b = BANDS.find((x) => x.test(host(s.url)));
      if (!b) continue;
      plan.tier.push({ id: r.id, file, layer, host: host(s.url), from, to: b.to, band: b.band, why: b.why, holder });
    }
  }
}

/* ------------------------------------------------------------------ report the plan */

console.log(`PASS 2026-08-06 — evaluated against ONE snapshot of ${[...snap.values()].flat().length} records\n`);
console.log(`DEPARTURES (${plan.depart.length}) — a self-audit does not belong in the scored ledger`);
for (const d of plan.depart) console.log(`  ${d.id}  ${d.file}`);
console.log(`\nVERDICTS (${plan.verdict.length})`);
for (const v of plan.verdict) console.log(`  ${v.id}  ${v.from.padEnd(10)} -> ${v.to.padEnd(10)} ${v.rule}`);
console.log(`\nTIERS (${plan.tier.length})`);
for (const b of ['A', 'B', 'D']) {
  const rows = plan.tier.filter((t) => t.band === b);
  console.log(`  band ${b} -> ${rows[0]?.to ?? '—'}  ${rows.length} citation(s): ${rows.map((t) => `${t.id}@${t.host}`).join(', ')}`);
}

if (!APPLY) {
  console.log('\n--dry: nothing written.');
  process.exit(0);
}

/* ------------------------------------------------------------------ write ONCE, anchored

   ANCHORED STRING EDITS, NEVER PARSE-AND-SERIALISE. Measured before choosing: re-serialising the
   corpus with `JSON.stringify(rs, null, 4)` reproduces NONE of the 23 files byte-for-byte — it
   expands compact arrays and grows the tree by 187 KB. Every one of those bytes would sit in the
   diff of the largest change since the phase opened, hiding the changes a reader needs to see. So
   the plan above is computed from the parsed snapshot and applied to the RAW TEXT.                */

/** Byte spans of the top-level array elements, found by brace matching outside strings. */
function elementSpans(raw) {
  const spans = [];
  let depth = 0;
  let start = -1;
  let inStr = false;
  let esc = false;
  for (let i = 0; i < raw.length; i += 1) {
    const c = raw[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === '{' || c === '[') {
      depth += 1;
      if (depth === 2 && c === '{') start = i;
    } else if (c === '}' || c === ']') {
      if (depth === 2 && c === '}' && start !== -1) {
        spans.push([start, i + 1]);
        start = -1;
      }
      depth -= 1;
    }
  }
  return spans;
}

/**
 * Object spans one level inside a slice whose FIRST character is the array's own `[`.
 *
 * The depth test is 2 and not 1, and getting that wrong is why the first run of this pass moved
 * every series tier and no `sources[]` tier at all: the opening bracket takes depth to 1, so an
 * element object opens at depth 2. It failed SILENTLY — the loop found no objects, changed
 * nothing, and the pass reported all 33 tier moves as applied. Nothing asserted that a queued edit
 * had actually altered the text, so the count came from the plan rather than from the result.
 * There is now an assertion below that every queued rewrite differs from what it replaces.
 */
function innerObjects(slice) {
  const out = [];
  let depth = 0;
  let start = -1;
  let inStr = false;
  let esc = false;
  for (let i = 0; i < slice.length; i += 1) {
    const c = slice[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === '{' || c === '[') {
      depth += 1;
      if (depth === 2 && c === '{') start = i;
    } else if (c === '}' || c === ']') {
      if (depth === 2 && c === '}' && start !== -1) {
        out.push([start, i + 1]);
        start = -1;
      }
      depth -= 1;
    }
  }
  return out;
}

/** Replace one `"key": <json value>` inside a slice, detecting nothing about indentation. */
function setKey(slice, key, value) {
  const re = new RegExp(`("${key}"\\s*:\\s*)(?:"(?:[^"\\\\]|\\\\.)*"|true|false|null|-?\\d+(?:\\.\\d+)?)`);
  if (!re.test(slice)) throw new Error(`pass: key "${key}" not found in slice`);
  return slice.replace(re, (_m, lead) => lead + JSON.stringify(value));
}

const rawFiles = new Map(files.map((f) => [f, readFileSync(join(DATA, f), 'utf8')]));
const editsByFile = new Map(); // file -> [{from,to,text}] applied right-to-left

const queue = (file, from, to, text) => {
  const raw = rawFiles.get(file);
  if (text === raw.slice(from, to)) throw new Error(`pass: a queued edit in ${file} at ${from} changes nothing — the rewrite did not apply`);
  for (const e of editsByFile.get(file) ?? []) {
    if (from < e.to && e.from < to) throw new Error(`pass: overlapping edits in ${file} at ${from}-${to} and ${e.from}-${e.to}`);
  }
  if (!editsByFile.has(file)) editsByFile.set(file, []);
  editsByFile.get(file).push({ from, to, text });
};

/** Locate a record's span in raw text, by id. */
function spanOf(file, id) {
  const raw = rawFiles.get(file);
  for (const [a, b] of elementSpans(raw)) {
    const s = raw.slice(a, b);
    if (new RegExp(`"id"\\s*:\\s*"${id}"`).test(s.slice(0, 400))) return { raw, a, b, s };
  }
  throw new Error(`pass: no span for ${id} in ${file}`);
}

// ---- tiers, grouped per record so one rewrite carries every citation move on it
const tierByRecord = new Map();
for (const t of plan.tier) {
  const k = `${t.file}|${t.id}`;
  if (!tierByRecord.has(k)) tierByRecord.set(k, []);
  tierByRecord.get(k).push(t);
}
for (const [k, ts] of tierByRecord) {
  const [file, id] = k.split('|');
  const { a, b, s } = spanOf(file, id);
  let next = s;
  if (ts[0].layer === 'series') {
    // tier sits on the record; `source` is a closed SourceRef that carries none.
    next = setKey(next, 'tier', ts[0].to);
  } else {
    // rewrite each `sources[]` element whose own url matches, so a record citing one host twice
    // moves both and a record citing two different bands moves each to its own value.
    const sm = /"sources"\s*:\s*\[/.exec(next);
    if (!sm) throw new Error(`pass: no sources array on ${id}`);
    const arrStart = sm.index + sm[0].length - 1;
    const objs = innerObjects(next.slice(arrStart));
    for (let x = objs.length - 1; x >= 0; x -= 1) {
      const [oa, ob] = objs[x];
      const obj = next.slice(arrStart + oa, arrStart + ob);
      const m = /"url"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(obj);
      if (!m) continue;
      const hit = ts.find((t) => t.host === host(JSON.parse(`"${m[1]}"`)));
      if (!hit || !/"tier"\s*:\s*"T1"/.test(obj)) continue;
      next = next.slice(0, arrStart + oa) + setKey(obj, 'tier', hit.to) + next.slice(arrStart + ob);
    }
  }
  queue(file, a, b, next);
  for (const t of ts) note('tier', t.id, `${t.from} -> ${t.to} (band ${t.band}, ${t.host})`);
}

// ---- verdicts
for (const v of plan.verdict) {
  const { a, b, s } = spanOf(v.file, v.id);
  const rec = snap.get(v.file).find((x) => x.id === v.id);
  let next = setKey(s, 'assessment', v.to);
  next = setKey(next, 'assessmentNote', `${v.why}\n\nPREVIOUS NOTE, PRESERVED VERBATIM: ${rec.assessmentNote ?? '(none)'}`);
  next = setKey(next, 'asOf', '2026-08-06');
  // `contestedGround` is permitted only where the verdict is contested. A contested record with no
  // ground stated is the sink this instrument spent a batch draining, so one is named here.
  if (v.to === 'contested' && !rec.contestedGround) {
    next = next.replace(/(\n(\s+)"assessment"\s*:)/, `\n$2"contestedGround": "evidence-unobservable",$1`);
  }
  queue(v.file, a, b, next);
  note('verdict', v.id, `${v.from} -> ${v.to}`);
}

// ---- departures: cut the element and the comma that joins it to its neighbour
for (const d of plan.depart) {
  const { raw, a, b } = spanOf(d.file, d.id);
  // CONSUME THE PRECEDING COMMA BY PREFERENCE. Taking the FOLLOWING one looks equivalent and is
  // not: the three departures are the last three elements of the same array, and each record's
  // following comma is the next record's preceding comma, so two cuts claimed the same byte and
  // the result was a trailing comma before `]`. The JSON.parse before writeFileSync caught it and
  // nothing reached disk — assert before write, not after.
  let from = a;
  let to = b;
  const before = raw.slice(0, from).match(/,\s*$/);
  if (before) from -= before[0].length;
  else if (raw.slice(to).match(/^\s*,/)) to += raw.slice(to).match(/^\s*,/)[0].length;
  queue(d.file, from, to, '');
  note('depart', d.id, d.file);
}

for (const [file, edits] of editsByFile) {
  let raw = rawFiles.get(file);
  for (const e of edits.sort((x, y) => y.from - x.from)) raw = raw.slice(0, e.from) + e.text + raw.slice(e.to);
  JSON.parse(raw); // an edit that produces invalid JSON never reaches disk
  writeFileSync(join(DATA, file), raw);
}

console.log(`\nAPPLIED — ${log.length} change(s) across ${editsByFile.size} file(s), written once.`);
for (const l of log) console.log(`  ${l.kind.padEnd(8)} ${l.id.padEnd(18)} ${l.what}`);
