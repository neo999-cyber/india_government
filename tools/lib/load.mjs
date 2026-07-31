import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/**
 * @typedef {'series' | 'ledger' | 'provenance' | 'pairs'} Layer
 * @typedef {{ layer: Layer, file: string, index: number|null, record: any, incoming: boolean }} LoadedRecord
 * @typedef {{ file: string, message: string }} LoadError
 */

/** Layer is decided by path, not by file contents. */
const LAYER_ROOTS = [
  { layer: /** @type {Layer} */ ('series'), match: (p) => p === 'series' || p.startsWith(`series${sep}`) },
  { layer: /** @type {Layer} */ ('ledger'), match: (p) => p === 'ledger' || p.startsWith(`ledger${sep}`) },
  { layer: /** @type {Layer} */ ('provenance'), match: (p) => p === 'provenance' || p.startsWith(`provenance${sep}`) },
  { layer: /** @type {Layer} */ ('pairs'), match: (p) => p === 'pairs' || p.startsWith(`pairs${sep}`) },
];

/** @returns {string[]} absolute paths of every .json file under dir */
function walkJson(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkJson(full));
    else if (entry.isFile() && entry.name.endsWith('.json')) out.push(full);
  }
  return out;
}

/**
 * Resolve a data file path to the layer that governs it.
 * `data/series/**.json` -> series, `data/ledger/**.json` -> ledger,
 * `data/provenance.json` or `data/provenance/**.json` -> provenance.
 * Incoming drops mirror the same shape under `data/incoming/`.
 * @param {string} rel path relative to the data root, e.g. `series/seed.json`
 * @returns {{ layer: Layer, incoming: boolean } | null}
 */
export function classify(rel) {
  let path = rel;
  let incoming = false;
  if (path === 'incoming' || path.startsWith(`incoming${sep}`)) {
    incoming = true;
    path = path.slice(`incoming${sep}`.length);
  }
  // `provenance.json` at the layer root is the canonical single-file case.
  const stem = path.endsWith('.json') ? path.slice(0, -'.json'.length) : path;
  for (const root of LAYER_ROOTS) {
    if (root.match(path) || root.match(stem)) return { layer: root.layer, incoming };
  }
  return null;
}

/**
 * Read every data file. A file may hold a single record object or an array of records.
 * @param {{ dataDir: string, includeIncoming: boolean }} opts
 * @returns {{ records: LoadedRecord[], errors: LoadError[], files: string[], skipped: string[] }}
 */
export function loadData({ dataDir, includeIncoming }) {
  /** @type {LoadedRecord[]} */
  const records = [];
  /** @type {LoadError[]} */
  const errors = [];
  /** @type {string[]} */
  const files = [];
  /** @type {string[]} */
  const skipped = [];

  if (!existsSync(dataDir) || !statSync(dataDir).isDirectory()) {
    errors.push({ file: dataDir, message: 'data directory not found' });
    return { records, errors, files, skipped };
  }

  for (const abs of walkJson(dataDir).sort()) {
    const rel = relative(dataDir, abs);
    const cls = classify(rel);
    const display = join('data', rel);
    if (!cls) {
      skipped.push(display);
      continue;
    }
    if (cls.incoming && !includeIncoming) {
      skipped.push(display);
      continue;
    }
    files.push(display);

    let parsed;
    try {
      parsed = JSON.parse(readFileSync(abs, 'utf8'));
    } catch (err) {
      errors.push({ file: display, message: `invalid JSON — ${err.message}` });
      continue;
    }

    if (Array.isArray(parsed)) {
      if (parsed.length === 0) {
        errors.push({ file: display, message: 'empty record array — remove the file rather than shipping an empty layer' });
        continue;
      }
      parsed.forEach((record, index) => {
        records.push({ layer: cls.layer, file: display, index, record, incoming: cls.incoming });
      });
    } else if (parsed && typeof parsed === 'object') {
      records.push({ layer: cls.layer, file: display, index: null, record: parsed, incoming: cls.incoming });
    } else {
      errors.push({ file: display, message: 'top level must be a record object or an array of record objects' });
    }
  }

  return { records, errors, files, skipped };
}
