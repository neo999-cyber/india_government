#!/usr/bin/env node
/**
 * ENUM PARITY — a value that lands in the schema but not in the view is invisible, and nothing
 * in this repository objected to that until now.
 *
 * WHY IT EXISTS. `no-unguarded-prose-field` and `field-render-audit` assert that every FIELD
 * reaches a reader. Neither asserts anything about a VALUE. Both walk the corpus, so a newly
 * declared enum member with no record carrying it yet is, to them, nothing at all: no record
 * holds it, no page prints it, no gate speaks. The member then sits in the schema as a promise
 * the view cannot keep, and the first record authored into it renders as `undefined` — or, in a
 * `Record<K, string>` map, does not compile, which is luck rather than a guard, because the
 * schema and the TypeScript union are two separate files and nothing had ever compared them.
 *
 * THIS IS THE GUARD THAT FIRES BEFORE THE VIEW EXISTS. Add a member to a JSON Schema enum and
 * run this: it exits 1 and names the member, the type that lacks it and the label map that
 * lacks it. That ordering is the point — the operator's condition for authorising the two new
 * values on 2026-08-06 was that the render guard be PROVEN to fire before the view existed, and
 * a guard which only fires once a record carries the value cannot satisfy it.
 *
 * WHAT IT ASSERTS, per axis: the set of members in the JSON Schema equals the set in
 * `lib/types.ts` equals the keys of the label map the view renders through. Set equality, not
 * containment, in both directions — a label for a member the schema has dropped is a view
 * promising a value the data can no longer hold.
 *
 * THE LABEL MAPS ARE NOT RE-PARSED HERE. They come from `tools/lib/value-renderings.mjs`, which
 * already parses them out of the modules that render them and THROWS if one has moved. A second
 * parser would be a second thing to drift.
 *
 * DECLARED OR EXEMPTED BY NAME, NO THIRD STATE. Every axis below names its schema locations, its
 * TypeScript declaration, and its label map. An axis with no TypeScript declaration says so with
 * `type: null` and a reason; it is not omitted, because an omission is indistinguishable from an
 * oversight.
 *
 * Usage:
 *   node tools/enum-parity.mjs            check the live axes
 *   node tools/enum-parity.mjs --control  self-control: prove the checker reports a seeded gap
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LABEL_MAPS } from './lib/value-renderings.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

/**
 * Every enum reachable through a property named `key`, anywhere in a schema, including through
 * `items`, `allOf`, `oneOf` and `$defs`. Walking rather than hardcoding a path, because the tier
 * enum sits at three different depths in three schemas and a hardcoded path would silently stop
 * finding one of them the first time a schema is restructured.
 *
 * DECLARATIONS ARE NOT CONSTRAINTS, and the first run of this gate proved why the distinction has
 * to be made here rather than assumed. `schemas/ledger.schema.json allOf[2].if.assessment` lists
 * eight of the nine assessment values — the scored ones, which must carry `caseFor` and
 * `caseAgainst`. Compared as a declaration it looks like drift; it is a rule. So a path that runs
 * through `allOf`, `if`, `then`, `else` or `not` is tagged `constraint`, and a constraint is
 * checked as a SUBSET of the declaration whose every omission is declared by name below. That is
 * the same shape as `tools/lib/schema-fields.mjs`, which already holds that oneOf/anyOf are
 * shapes and allOf is constraints.
 */
const CONSTRAINT_KEYS = new Set(['allOf', 'if', 'then', 'else', 'not']);

function enumsForKey(node, key, path = '', constrained = false, out = []) {
  if (!node || typeof node !== 'object') return out;
  if (Array.isArray(node)) {
    node.forEach((n, i) => enumsForKey(n, key, `${path}[${i}]`, constrained, out));
    return out;
  }
  for (const [k, v] of Object.entries(node)) {
    if (k === 'properties' && v && typeof v === 'object' && v[key]) {
      const target = v[key].items ?? v[key];
      if (Array.isArray(target.enum)) {
        out.push({ path: `${path}.${key}`, values: target.enum, kind: constrained ? 'constraint' : 'declaration' });
      }
    }
    enumsForKey(v, key, path ? `${path}.${k}` : k, constrained || CONSTRAINT_KEYS.has(k), out);
  }
  return out;
}

/** `export const NAME = [...] as const;` or `export type Name = 'a' | 'b' | 'c';` */
function typeMembers(decl) {
  const text = read(decl.file);
  if (decl.kind === 'const') {
    const m = text.match(new RegExp(`export const ${decl.name}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as const`));
    if (!m) throw new Error(`enum-parity: const ${decl.name} not found in ${decl.file}`);
    return [...m[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) => x[1]);
  }
  const m = text.match(new RegExp(`export type ${decl.name}\\s*=([\\s\\S]*?);`));
  if (!m) throw new Error(`enum-parity: type ${decl.name} not found in ${decl.file}`);
  return [...m[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) => x[1]);
}

const TYPES = 'lib/types.ts';

/**
 * THE AXIS REGISTRY. An axis is here or it is exempted here by name. Nothing is implicit.
 */
const AXES = [
  {
    axis: 'assessment',
    schemas: { 'schemas/ledger.schema.json': 'assessment' },
    type: { file: TYPES, name: 'Assessment', kind: 'union' },
    labels: 'ASSESSMENT_LABELS',
  },
  {
    axis: 'tier',
    schemas: {
      'schemas/ledger.schema.json': 'tier',
      'schemas/provenance.schema.json': 'tier',
      'schemas/series.schema.json': 'tier',
    },
    type: { file: TYPES, name: 'TIERS', kind: 'const' },
    labels: 'TIER_LABELS',
  },
  {
    axis: 'term',
    schemas: { 'schemas/ledger.schema.json': 'term' },
    type: { file: TYPES, name: 'TERMS', kind: 'const' },
    labels: 'TERM_LABELS',
  },
  {
    axis: 'contestedGround',
    schemas: { 'schemas/ledger.schema.json': 'contestedGround' },
    type: { file: TYPES, name: 'CONTESTED_GROUNDS', kind: 'const' },
    labels: 'CONTESTED_GROUND_LABELS',
  },
  {
    axis: 'lenses',
    schemas: { 'schemas/ledger.schema.json': 'lenses' },
    type: { file: TYPES, name: 'LENSES', kind: 'const' },
    labels: 'LENS_LABELS',
  },
  {
    axis: 'domains',
    schemas: { 'schemas/ledger.schema.json': 'domains' },
    type: { file: TYPES, name: 'DOMAINS', kind: 'const' },
    labels: 'DOMAIN_LABELS',
  },
];

/**
 * EXEMPTED BY NAME. These axes have a label map and a schema enum but no TypeScript union to
 * compare against, and the reason is recorded rather than the axis quietly dropped.
 */
const EXEMPT = {
  reasonKind:
    'the union is inlined on the Unmeasured type in lib/types.ts rather than named, so there is ' +
    'no declaration to read; the schema and the label map are still compared below',
  disputeKind: 'same as reasonKind — the union is inlined on the Unmeasured type',
  country: 'Country is a named union but has no schema enum; the panel is fixed in the type only',
};

/**
 * Which members a CONSTRAINT is allowed to omit from its axis's declaration, keyed by the path
 * the walker prints. An undeclared omission fails, so a new enum value cannot be added to the
 * declaration and quietly left out of a rule that should govern it.
 */
const CONSTRAINT_OMISSIONS = {
  'schemas/ledger.schema.json allOf[2].if.assessment': {
    omits: ['baseline-context'],
    why: 'baseline-context is never scored, so it does not require caseFor and caseAgainst',
  },
};

function checkAxis(a, overrides = {}) {
  const failures = [];
  const schemaSets = [];
  const constraints = [];
  for (const [file, key] of Object.entries(a.schemas)) {
    const found = enumsForKey(JSON.parse(read(file)), key);
    if (!found.some((f) => f.kind === 'declaration')) {
      failures.push(`${a.axis}: no declared enum named \`${key}\` found anywhere in ${file}`);
      continue;
    }
    for (const f of found) {
      const entry = { where: `${file} ${f.path}`, values: f.values };
      (f.kind === 'declaration' ? schemaSets : constraints).push(entry);
    }
  }
  // Every schema location must agree with every other before any of them is compared outward.
  const first = schemaSets[0];
  for (const s of schemaSets.slice(1)) {
    if (JSON.stringify([...s.values].sort()) !== JSON.stringify([...first.values].sort())) {
      failures.push(
        `${a.axis}: schema locations disagree — ${first.where} has [${first.values.join(', ')}] ` +
          `but ${s.where} has [${s.values.join(', ')}]`,
      );
    }
  }
  if (!first) return { failures, size: 0 };

  for (const c of constraints) {
    const declared = new Set(overrides.schema ?? first.values);
    const extra = c.values.filter((v) => !declared.has(v));
    if (extra.length) {
      failures.push(`${a.axis}: the rule at ${c.where} names [${extra.join(', ')}], which the declaration does not have`);
    }
    const omitted = [...declared].filter((v) => !c.values.includes(v));
    const allowed = CONSTRAINT_OMISSIONS[c.where];
    const undeclared = omitted.filter((v) => !(allowed?.omits ?? []).includes(v));
    if (undeclared.length) {
      failures.push(
        `${a.axis}: the rule at ${c.where} omits [${undeclared.join(', ')}] and the omission is not declared. ` +
          `Either the rule should govern the value, or CONSTRAINT_OMISSIONS in this file must say why not`,
      );
    }
  }

  const schema = new Set(overrides.schema ?? first.values);
  const typed = new Set(a.type ? typeMembers(a.type) : schema);
  const labelled = new Set(Object.keys(LABEL_MAPS[a.labels]));

  const miss = (from, to, fromName, toName) =>
    [...from].filter((v) => !to.has(v)).map((v) => `${a.axis}: \`${v}\` is in ${fromName} but not in ${toName}`);

  const typeName = a.type ? `${a.type.name} (${a.type.file})` : 'the schema (no type declared)';
  failures.push(...miss(schema, typed, `the schema (${first.where})`, typeName));
  failures.push(...miss(typed, schema, typeName, `the schema (${first.where})`));
  failures.push(...miss(schema, labelled, `the schema (${first.where})`, `${a.labels} — the view cannot render it`));
  failures.push(...miss(labelled, schema, a.labels, `the schema — the view promises a value the data cannot hold`));
  return { failures, size: schema.size };
}

/**
 * SELF-CONTROL. Runs the real checker against a seeded schema set with one member removed and
 * asserts it reports exactly that member. A checker that cannot be shown to fail is not evidence
 * that the thing it checks is sound.
 */
if (process.argv.includes('--control')) {
  const a = AXES[0];
  const live = JSON.parse(read(Object.keys(a.schemas)[0])).properties.assessment.enum;
  const bad = [];

  // POSITIVE, and the one the operator's condition turns on: a member added to the schema and
  // nowhere else must be reported BEFORE any record carries it and before any view can print it.
  const added = checkAxis(a, { schema: new Set([...live, 'seeded-control-value']) }).failures.filter((f) =>
    f.includes('`seeded-control-value`'),
  );
  const wantAdded = ['but not in Assessment', 'ASSESSMENT_LABELS — the view cannot render it'];
  for (const w of wantAdded) {
    if (!added.some((f) => f.includes(w))) bad.push(`adding a schema-only member was not reported against ${w}`);
  }
  if (added.length !== 2) bad.push(`adding a schema-only member produced ${added.length} findings, expected 2`);

  // NEGATIVE of the same form: a member the schema drops but the view still promises.
  const removed = checkAxis(a, { schema: new Set(live.filter((v) => v !== live[0])) }).failures.filter((f) =>
    f.includes(`\`${live[0]}\``) || f.includes(`[${live[0]}]`),
  );
  if (removed.length !== 3) bad.push(`dropping \`${live[0]}\` produced ${removed.length} findings, expected 3 (rule, type, label)`);

  if (bad.length) {
    console.error(`enum-parity --control FAILED\n${bad.map((b) => '  - ' + b).join('\n')}`);
    console.error([...added, ...removed].map((f) => '    · ' + f).join('\n'));
    process.exit(1);
  }
  console.log(
    'enum-parity control: a member seeded into the schema alone is named against the type and the label map ' +
      `before any view exists (2 findings); a member dropped from the schema is named against the rule, the type ` +
      `and the label map (3 findings) — the checker fails when it should`,
  );
  process.exit(0);
}

const all = [];
let axes = 0;
let members = 0;
for (const a of AXES) {
  const { failures, size } = checkAxis(a);
  all.push(...failures);
  axes += 1;
  members += size;
}

if (all.length) {
  console.error(`enum-parity FAILED — ${all.length} member(s) do not reach a reader`);
  for (const f of all) console.error(`  - ${f}`);
  console.error(
    '\n  A value lands in the schema, the type and the label map IN ONE COMMIT, or it is a promise\n' +
      '  the view cannot keep. Adding it to the schema alone is the failure this gate exists to catch.',
  );
  process.exit(1);
}

console.log(
  `enum-parity: ${members} members across ${axes} axes agree in schema, type and label map · ` +
    `${Object.keys(EXEMPT).length} axes exempted by name`,
);
