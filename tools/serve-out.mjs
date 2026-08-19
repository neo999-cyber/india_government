#!/usr/bin/env node
/**
 * A static server for `out/`, used only by the end-to-end tests.
 *
 * **NO NEW DEPENDENCY, DELIBERATELY.** `serve`, `http-server` and friends each pull a tree of their
 * own, and this repository has to install cleanly on CI and on a laptop; the whole point of the e2e
 * suite is to catch defects, not to add surface. Node's own `http` and `fs` are enough to serve a
 * static export.
 *
 * **IT SERVES THE BUILD, NOT A DEV SERVER**, and that matters: the four properties these tests bind
 * — a live count, target sizes, keyboard reach, horizontal overflow — are properties of what the
 * reader actually receives. A dev server with its own overlays and hot-reload wrapper is a different
 * document.
 *
 * Trailing-slash routes map to `index.html`, which is how the static export is laid out and how
 * Vercel serves it.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'out');
const PORT = Number(process.env.PORT ?? 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

async function resolve(urlPath) {
  // Never let a request escape `out/`. `normalize` collapses `..` before it is joined.
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  const base = join(ROOT, clean);
  for (const candidate of [base, join(base, 'index.html'), `${base}.html`]) {
    if (!candidate.startsWith(ROOT)) continue;
    try {
      const s = await stat(candidate);
      if (s.isFile()) return candidate;
    } catch {
      /* try the next shape */
    }
  }
  return null;
}

createServer(async (req, res) => {
  const file = await resolve(req.url ?? '/');
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
    return;
  }
  const body = await readFile(file);
  res.writeHead(200, {
    'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
    'content-length': body.byteLength,
  });
  res.end(body);
}).listen(PORT, () => console.log(`serving out/ on http://localhost:${PORT}`));
