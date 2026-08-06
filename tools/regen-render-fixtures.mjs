#!/usr/bin/env node
/**
 * Regenerate the `no-unguarded-prose-field` fixtures FROM the live lists.
 *
 * WHY THIS IS A TOOL AND NOT A DISCIPLINE. The fixtures are a positive and a negative control
 * injected through the gate's own seams. A stale positive fixture passes against a list the gate no
 * longer uses — the control reports green while proving nothing — and nothing downstream can tell.
 * CLAUDE.md already says a discipline requirement is what build-freshness and M2 exist to replace,
 * and the lens fixtures learned this first.
 *
 * `GENERATED-FROM.json` records what the fixtures were cut from, and the selftest fails if the live
 * lists have moved past it.
 *
 * Usage:  node tools/regen-render-fixtures.mjs   ·   npm run regen:render-fixtures
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MARKS } from './lib/guarded-marks.mjs';
import { RENDERINGS } from './lib/value-renderings.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'tests', 'fixtures', 'unguarded-prose-field');
const write = (name, value) => writeFileSync(join(DIR, name), `${JSON.stringify(value, null, 2)}\n`);

/**
 * `assessmentNote` and `ledger.assessment` are the dropped fields, chosen deliberately in both
 * halves. The first is the actual defect that shipped 164 invisible marks; the second is the field
 * a reader most obviously cannot do without, so a gate that stays quiet about it is broken in the
 * way that matters. A modelled fixture would prove less.
 */
const marks = MARKS.map((m) => ({ field: m.field, layers: m.layers }));
const keys = Object.keys(RENDERINGS);

write('marks-full.json', marks);
write('marks-without-assessmentnote.json', marks.filter((m) => m.field !== 'assessmentNote'));
write('renderings-full.json', keys);
write('renderings-without-assessment.json', keys.filter((k) => k !== 'ledger.assessment'));
write('GENERATED-FROM.json', {
  generatedBy: 'tools/regen-render-fixtures.mjs',
  sources: ['tools/lib/guarded-marks.mjs', 'tools/lib/value-renderings.mjs'],
  markFields: marks.length,
  renderingKeys: keys.length,
  droppedInNegative: { marks: 'assessmentNote', renderings: 'ledger.assessment' },
  note: 'A stale fixture lets a positive control pass against a list the gate no longer uses. The selftest fails on drift; regenerate with npm run regen:render-fixtures.',
});

console.log(`regen-render-fixtures OK — ${marks.length} guarded mark(s), ${keys.length} rendering key(s) -> tests/fixtures/unguarded-prose-field/`);
