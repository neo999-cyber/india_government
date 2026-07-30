import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root: there are lockfiles above this directory.
  turbopack: { root: projectRoot },
  // Static export: no server, no database, no auth (see CLAUDE.md).
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // The data layers are read from /data at build time; nothing is fetched at runtime.
  outputFileTracingIncludes: {
    '/**': ['./data/**/*.json'],
  },
};

export default nextConfig;
