#!/usr/bin/env node
/**
 * LEGACY TOPIC ROUTES — the topic merge removed duplicate pages, not their public addresses.
 *
 * Vercel owns the redirect response, so the static export cannot prove the HTTP hop locally. This
 * check binds the two things the repository can prove before deployment: every required Vercel
 * rule is present with its exact permanent destination, and every destination fragment exists in
 * the built HTML for every domain admitted by the series schema. Production still gets a real HTTP
 * check after deployment; this does not pretend to replace it.
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
const seriesSchema = JSON.parse(readFileSync(join(ROOT, 'schemas', 'series.schema.json'), 'utf8'));
const domains = seriesSchema.properties.domain.enum;

const sections = ['indicators', 'records', 'disputes', 'missing'];
const expected = [
  { source: '/domains', destination: '/overview/', permanent: true },
  ...sections.map((section) => ({
    source: `/domains/:domain/${section}`,
    destination: `/domains/:domain/#${section}`,
    permanent: true,
  })),
];

const actual = (config.redirects ?? []).filter((route) => route.source.startsWith('/domains'));
const problems = [];

for (const route of expected) {
  if (!actual.some((candidate) => JSON.stringify(candidate) === JSON.stringify(route))) {
    problems.push(`missing redirect ${route.source} -> ${route.destination} (permanent)`);
  }
}

for (const route of actual) {
  if (!expected.some((candidate) => JSON.stringify(candidate) === JSON.stringify(route))) {
    problems.push(`unexpected domain redirect ${JSON.stringify(route)}`);
  }
}

const overview = join(ROOT, 'out', 'overview', 'index.html');
if (!existsSync(overview)) problems.push('built target out/overview/index.html is absent; run npm run build first');

let targets = 1;
for (const domain of domains) {
  const file = join(ROOT, 'out', 'domains', domain, 'index.html');
  if (!existsSync(file)) {
    problems.push(`built topic target is absent: out/domains/${domain}/index.html`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  for (const section of sections) {
    targets += 1;
    if (!html.includes(`id="${section}"`)) {
      problems.push(`/domains/${domain}/#${section} has no matching fragment in the built page`);
    }
  }
}

if (problems.length) {
  console.error(`legacy-routes FAILED — ${problems.length} problem(s)\n${problems.map((p) => `  ${p}`).join('\n')}`);
  process.exit(1);
}

console.log(
  `legacy-routes OK — 5 permanent Vercel rules preserve ${targets} old URL(s): ` +
    `1 topic index + ${domains.length} topics × ${sections.length} subsection fragments`,
);
