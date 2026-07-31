/**
 * Build-time data access. Every page is prerendered, so this reads /data from
 * disk once per build; nothing is fetched at runtime and there is no database.
 *
 * `data/incoming/` is deliberately ignored here: drops from research sessions
 * are validated and merged before they render (CLAUDE.md, Architecture).
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import type {
  Domain,
  LedgerRecord,
  ProvenanceRecord,
  Series,
  Term,
  Unmeasured,
} from './types';

const DATA_DIR = join(process.cwd(), 'data');

function jsonFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.json') && !e.name.startsWith('.'))
    .map((e) => join(dir, e.name))
    .sort();
}

function readRecords<T>(paths: string[]): T[] {
  const out: T[] = [];
  for (const p of paths) {
    const parsed = JSON.parse(readFileSync(p, 'utf8'));
    if (Array.isArray(parsed)) out.push(...(parsed as T[]));
    else out.push(parsed as T);
  }
  return out;
}

function loadSeries(): Series[] {
  return readRecords<Series>(jsonFiles(join(DATA_DIR, 'series'))).sort((a, b) =>
    a.id.localeCompare(b.id),
  );
}

function loadLedger(): LedgerRecord[] {
  return readRecords<LedgerRecord>(jsonFiles(join(DATA_DIR, 'ledger'))).sort((a, b) =>
    a.id.localeCompare(b.id),
  );
}

function loadProvenance(): ProvenanceRecord[] {
  const single = join(DATA_DIR, 'provenance.json');
  const paths = [
    ...(existsSync(single) ? [single] : []),
    ...jsonFiles(join(DATA_DIR, 'provenance')),
  ];
  return readRecords<ProvenanceRecord>(paths).sort((a, b) => a.id.localeCompare(b.id));
}

export const series: Series[] = loadSeries();
export const ledger: LedgerRecord[] = loadLedger();
export const provenance: ProvenanceRecord[] = loadProvenance();

const seriesById = new Map(series.map((s) => [s.id, s]));
const ledgerById = new Map(ledger.map((l) => [l.id, l]));
const provenanceById = new Map(provenance.map((p) => [p.id, p]));

export const getSeries = (id: string): Series | undefined => seriesById.get(id);
export const getLedger = (id: string): LedgerRecord | undefined => ledgerById.get(id);
export const getProvenance = (id: string): ProvenanceRecord | undefined => provenanceById.get(id);

/** Provenance records referenced by a series, plus any that name it in affectsSeries. */
export function provenanceForSeries(s: Series): ProvenanceRecord[] {
  const ids = new Set(s.provenanceRefs ?? []);
  for (const p of provenance) if (p.affectsSeries?.includes(s.id)) ids.add(p.id);
  return [...ids].map((id) => provenanceById.get(id)).filter((p): p is ProvenanceRecord => !!p);
}

export const seriesInDomain = (domain: Domain): Series[] => series.filter((s) => s.domain === domain);

export const ledgerInDomain = (domain: Domain): LedgerRecord[] =>
  ledger.filter((l) => l.domains.includes(domain));

export const provenanceInDomain = (domain: Domain): ProvenanceRecord[] =>
  provenance.filter((p) => p.affectsDomains.includes(domain) || p.affectsDomains.includes('all'));

export const ledgerInTerm = (term: Term): LedgerRecord[] => ledger.filter((l) => l.term === term);

export const ledgerCitingSeries = (id: string): LedgerRecord[] =>
  ledger.filter((l) => l.seriesRefs?.includes(id));

export const ledgerCitingProvenance = (id: string): LedgerRecord[] =>
  ledger.filter((l) => l.provenanceRefs?.includes(id));

export const seriesCitingProvenance = (id: string): Series[] =>
  series.filter(
    (s) => s.provenanceRefs?.includes(id) || s.breaks?.some((b) => b.provenanceRef === id),
  );

/** Series carrying values for more than one country — the peer panel (P-09). */
export const panelSeries = (): Series[] =>
  series.filter((s) => new Set(s.points.map((p) => p.country)).size > 1);

/** Counts of assessments. Never a grade, never a composite (CLAUDE.md rule 9). */
export function assessmentCounts(records: LedgerRecord[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const r of records) counts[r.assessment] = (counts[r.assessment] ?? 0) + 1;
  return counts;
}

export function statusCounts(items: Series[]): Record<string, number> {
  const counts: Record<string, number> = { verified: 0, approx: 0, pending: 0 };
  for (const s of items) for (const p of s.points) counts[p.status] = (counts[p.status] ?? 0) + 1;
  return counts;
}

/**
 * Every declared absence across both layers, with the record that declares it.
 *
 * `unmeasured` entries are scattered one or two to a record, which is the right place to
 * author them and the wrong place to read them as a set. Collected, they are a map of what
 * the instrument cannot show and why — and the `wouldFill` values are a verification queue
 * that nobody wrote deliberately, assembled from the individual research judgements that
 * produced each record.
 */
export type DeclaredAbsence = {
  entry: Unmeasured;
  recordId: string;
  recordTitle: string;
  layer: 'series' | 'ledger';
  href: string;
  domains: Domain[];
};

export function allUnmeasured(): DeclaredAbsence[] {
  const fromSeries = series.flatMap((s) =>
    (s.unmeasured ?? []).map((entry) => ({
      entry,
      recordId: s.id,
      recordTitle: s.title,
      layer: 'series' as const,
      href: `/series/${s.id}/`,
      domains: [s.domain],
    })),
  );
  const fromLedger = ledger.flatMap((l) =>
    (l.unmeasured ?? []).map((entry) => ({
      entry,
      recordId: l.id,
      recordTitle: l.title,
      layer: 'ledger' as const,
      href: `/ledger/${l.id}/`,
      domains: l.domains,
    })),
  );
  return [...fromSeries, ...fromLedger];
}
