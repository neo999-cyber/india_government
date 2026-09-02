#!/usr/bin/env node
/**
 * link-prefetch — every `<Link>` on the site goes through `components/Link.tsx`, which turns
 * viewport prefetching off. Measured 2026-09-02: one scroll of `/overview/` prefetched 120 route
 * payloads, 9.6 MB, unasked. See the header of that file.
 *
 * SCOPE: `.ts`/`.tsx` files under app/, components/ and lib/. It asserts a PRESENCE — the wrapper
 * itself must import `next/link`, or the guard is checking a rule the codebase no longer has — and
 * then that no other file does. If the claim moved one level out, to a raw `<a>` carrying a
 * `data-prefetch`, or to `router.prefetch()`, this guard would not see it and says so here.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n);
  return statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(n) ? [p] : [];
});
const files = ['app', 'components', 'lib'].flatMap(walk);
const importers = files.filter((f) => /from ['"]next\/link['"]/.test(readFileSync(f, 'utf8')));
const wrapper = 'components/Link.tsx';
if (!importers.includes(wrapper)) {
  console.error(`link-prefetch FAILED — ${wrapper} no longer imports next/link; the rule this guards has moved`);
  process.exit(1);
}
const others = importers.filter((f) => f !== wrapper);
if (others.length) {
  console.error(`link-prefetch FAILED — ${others.length} file(s) import next/link directly, bypassing the prefetch-off wrapper:`);
  for (const f of others) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`link-prefetch OK — ${files.length} source files, next/link imported only by ${wrapper}`);
