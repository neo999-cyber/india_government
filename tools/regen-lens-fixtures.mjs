#!/usr/bin/env node
/**
 * Runner for the lens-fixture regeneration. The generator itself lives in tools/lib/lens-fixtures.mjs
 * and has no side effects, so the selftest can import `liveEnums` without rebuilding the fixtures it
 * is about to check — see that file for why that separation is not cosmetic.
 *
 * Usage:  node tools/regen-lens-fixtures.mjs
 */
import { build } from './lib/lens-fixtures.mjs';

const results = [
  build('lens-coverage-empty', { lensesOnSeries: false }),
  build('lens-coverage-no-page', { lensesOnSeries: true, missingLens: 'russia' }),
];
for (const r of results) console.log(`regenerated ${r.name} — ${r.domains} domains, ${r.lenses} lenses`);
