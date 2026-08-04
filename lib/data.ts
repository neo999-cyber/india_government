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
  Lens,
  Pair,
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

function loadPairs(): Pair[] {
  const single = join(DATA_DIR, 'pairs.json');
  const paths = [...(existsSync(single) ? [single] : []), ...jsonFiles(join(DATA_DIR, 'pairs'))];
  return readRecords<Pair>(paths).sort((a, b) => a.id.localeCompare(b.id));
}

export const series: Series[] = loadSeries();
export const ledger: LedgerRecord[] = loadLedger();
export const provenance: ProvenanceRecord[] = loadProvenance();
export const pairs: Pair[] = loadPairs();

const seriesById = new Map(series.map((s) => [s.id, s]));
const ledgerById = new Map(ledger.map((l) => [l.id, l]));
const provenanceById = new Map(provenance.map((p) => [p.id, p]));
const pairById = new Map(pairs.map((p) => [p.id, p]));

export const getPair = (id: string): Pair | undefined => pairById.get(id);

/**
 * Pairs a series belongs to, from either side.
 *
 * A series can sit in more than one — nothing forbids it, and a coverage figure criticised
 * on two different grounds would legitimately appear in two. Rendering takes the first.
 */
export function pairsForSeries(id: string): Pair[] {
  return pairs.filter(
    (p) =>
      p.a.series === id ||
      p.b.series === id ||
      p.a.absenceFrom === id ||
      p.b.absenceFrom === id,
  );
}

export const getSeries = (id: string): Series | undefined => seriesById.get(id);
export const getLedger = (id: string): LedgerRecord | undefined => ledgerById.get(id);
export const getProvenance = (id: string): ProvenanceRecord | undefined => provenanceById.get(id);

/** Provenance records referenced by a series, plus any that name it in affectsSeries. */
export function provenanceForSeries(s: Series): ProvenanceRecord[] {
  const ids = new Set(s.provenanceRefs ?? []);
  for (const p of provenance) if (p.affectsSeries?.includes(s.id)) ids.add(p.id);
  return [...ids].map((id) => provenanceById.get(id)).filter((p): p is ProvenanceRecord => !!p);
}

/** Series whose SUBJECT is this domain. The lens axis is a separate query — see below. */
export const seriesInDomain = (domain: Domain): Series[] => series.filter((s) => s.domain === domain);

/**
 * Series read under this domain as a LENS — their subject is elsewhere.
 *
 * Kept as its own function rather than widened into `seriesInDomain`, because the whole point of
 * `lenses[]` is that subject and lens are different claims: a J&K militancy count is a defence
 * measurement read under the Kashmir lens, and pooling the two axes into one list would put back
 * the conflation the field was added to remove. The domain page renders them as separate blocks
 * for the same reason.
 */
export const seriesUnderLens = (lens: Lens): Series[] =>
  series.filter((s) => (s.lenses as string[] | undefined)?.includes(lens) ?? false);

export const pairsInDomain = (domain: Domain): Pair[] => pairs.filter((p) => p.domain === domain);

export const pairsUnderLens = (lens: Lens): Pair[] =>
  pairs.filter((p) => (p.lenses as string[] | undefined)?.includes(lens) ?? false);

/**
 * Ledger records read under this lens.
 *
 * The ledger's lens axis arrived in phase 14 with `lenses[]` on the record; before that a ledger
 * lens lived in `domains[]`, which worked only while every lens value was also a domain value.
 * Both are read here, and the union is deliberate rather than sloppy: nineteen shipped records
 * carry `kashmir` in `domains[]` and thirteen carry `federalism` there, and a lens page that
 * showed only the new field would report those two lenses as nearly empty while the records sit
 * on the domain page as before. Values that are not domain values can only ever match the first
 * branch, so the second costs them nothing.
 */
export const ledgerUnderLens = (lens: Lens): LedgerRecord[] =>
  ledger.filter(
    (l) =>
      ((l.lenses as string[] | undefined)?.includes(lens) ?? false) ||
      (l.domains as string[]).includes(lens),
  );

/**
 * Where a pair actually renders, or undefined if it renders nowhere.
 *
 * A pair has no page of its own: it renders inside the FIRST pair listed for one of its series
 * (`pairsForSeries(id)[0]`), so a pair is reachable only if some series it names lands it in that
 * first slot. Two pairs currently fail that. PR-16 is `declared-pending` with no sides yet and is
 * meant to render nowhere. PR-31 is fully authored and renders nowhere anyway, because both its
 * sides are non-series — a provenance record's competingAccounts against a ledger absence — so no
 * series page will ever host it. Returning undefined rather than a plausible link is the honest
 * answer; the domain listing says so in the row.
 */
export function pairHref(p: Pair): string | undefined {
  for (const side of [p.a, p.b]) {
    const id = side.series;
    if (id && pairsForSeries(id)[0]?.id === p.id) return `/series/${id}/`;
  }
  return undefined;
}

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

/**
 * A pair side resolved to the thing it renders.
 *
 * Three shapes, because a counterpart is not always a series: it may be a declared absence
 * (the counterpart does not exist, and that is the finding) or a dispute between sources
 * held in a provenance record's competingAccounts.
 */
export type ResolvedSide =
  | { kind: 'series'; label: string; series: Series }
  | { kind: 'absence'; label: string; entry: Unmeasured; hostId: string; hostTitle: string }
  | { kind: 'accounts'; label: string; record: ProvenanceRecord };

export function resolvePairSide(side: {
  series?: string;
  absenceFrom?: string;
  absenceIndex?: number;
  competingAccountsFrom?: string;
  label: string;
}): ResolvedSide | null {
  if (side.series) {
    const s = getSeries(side.series);
    return s ? { kind: 'series', label: side.label, series: s } : null;
  }
  if (side.absenceFrom) {
    const host = getSeries(side.absenceFrom) ?? getLedger(side.absenceFrom);
    const entry = host?.unmeasured?.[side.absenceIndex ?? 0];
    return host && entry
      ? { kind: 'absence', label: side.label, entry, hostId: host.id, hostTitle: host.title }
      : null;
  }
  if (side.competingAccountsFrom) {
    const p = getProvenance(side.competingAccountsFrom);
    return p?.competingAccounts?.length ? { kind: 'accounts', label: side.label, record: p } : null;
  }
  return null;
}
