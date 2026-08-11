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
  PairSide,
  ProvenanceRecord,
  Series,
  Term,
  Tier,
  Unmeasured,
} from './types';
import { TIERS } from './types';

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

/**
 * REMOVED 2026-08-08, and the removal is recorded because its LAST SENTENCE was the defect.
 *
 * THE WITHDRAWN FUNCTION AND ITS DOC, QUOTED: *"Pairs a series belongs to, from either side. A
 * series can sit in more than one — nothing forbids it, and a coverage figure criticised on two
 * different grounds would legitimately appear in two. **Rendering takes the first.**"* It matched a
 * series named as a SIDE and a series named merely as an absence HOST, returned them in one
 * undifferentiated list, and every caller took `[0]`.
 *
 * Both halves were wrong together. Conflating side and host meant the slot could be won by a pair
 * the series is not the subject of; taking the first meant the loser rendered nowhere. Three pairs
 * were lost that way. `pairsWithSeriesAsSide` and `pairsHostedOn` replace it — the first keeps the
 * side/host distinction the old list dissolved, and neither truncates.
 *
 * The doc admitted the consequence in its own last sentence and no gate could read a comment.
 */

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
 * WHERE A PAIR LIVES — one source of truth, read by the views and by the listing alike.
 *
 * CORRECTED 2026-08-08. THE WITHDRAWN COMMENT, QUOTED SO THE CORRECTION CAN BE CHECKED RATHER THAN
 * TAKEN ON TRUST, is the paragraph that stood here from phase 6c: *"A pair has no page of its own:
 * it renders inside the FIRST pair listed for one of its series (`pairsForSeries(id)[0]`), so a
 * pair is reachable only if some series it names lands it in that first slot. **Two pairs currently
 * fail that.** PR-16 is `declared-pending` with no sides yet and is meant to render nowhere. PR-31
 * is fully authored and renders nowhere anyway, because both its sides are non-series — a
 * provenance record's competingAccounts against a ledger absence — so no series page will ever host
 * it."*
 *
 * **IT SAID TWO AND THE ANSWER WAS ELEVEN**, measured against the built site: PR-16, PR-31, PR-34,
 * PR-35, PR-36, PR-37, PR-39, PR-40, PR-43, PR-52, PR-55. Nine were outside anything the comment
 * reached, by three distinct mechanisms — five more pairs of PR-31's own shape, three losing the
 * `[0]` slot to another pair, and one whose side b is label-only. **A number written once into a
 * comment and never re-measured is the deferral-with-a-measured-rate failure CLAUDE.md already
 * records against `seam-span-report`**, and it decayed here in the direction that reads as
 * reassurance.
 *
 * One further correction, and it is to the queue entry that raised this rather than to the old
 * comment: the walk-6 write-up says PR-55 is *"identical in shape to PR-16 but not marked
 * `declared-pending`"*. **PR-55 carries `"status": "declared-pending"`.** Checked against the
 * record, which is what CLAUDE.md requires of a flag raised in a report.
 *
 * WHAT NOW DECIDES IT. A pair renders where a record it names can host it, in this order:
 *   1. **as a SUBJECT** — on the page of every series named as one of its two sides. A series that
 *      merely HOSTS an absence another pair cites is not that pair's subject and does not host it
 *      here; that distinction cost `jk-prison-detained-category` its own table once and the series
 *      page still enforces it.
 *   2. **as a HOST** — where no series is a side, on the page of the first side whose host record
 *      has one: a provenance record's `competingAccounts`, or an `absenceFrom` host on either
 *      layer. Six pairs live here and all six resolve to a provenance page today.
 *   3. **nowhere** — where a side does not resolve at all, which is what `declared-pending` means.
 *      PR-16 and PR-55 are the two, and their prose reaches a reader through the domain listing
 *      row, which prints the framing rather than only saying that the pair has no home.
 *
 * Returning undefined rather than a plausible link is still the honest answer for case 3.
 */
function hostRouteForSide(side: PairSide): string | undefined {
  if (side.series) return getSeries(side.series) ? `/series/${side.series}/` : undefined;
  if (side.absenceFrom) {
    if (getSeries(side.absenceFrom)) return `/series/${side.absenceFrom}/`;
    if (getLedger(side.absenceFrom)) return `/ledger/${side.absenceFrom}/`;
    return undefined;
  }
  if (side.competingAccountsFrom) {
    return getProvenance(side.competingAccountsFrom)
      ? `/provenance/${side.competingAccountsFrom}/`
      : undefined;
  }
  return undefined;
}

/** Both sides resolve to something renderable. A pair with an unauthored side is not one. */
export const pairRenders = (p: Pair): boolean =>
  Boolean(resolvePairSide(p.a) && resolvePairSide(p.b));

/** Series named as an actual SIDE of this pair — its subjects, not merely its absence hosts. */
const subjectSeriesIds = (p: Pair): string[] =>
  [p.a, p.b].map((s) => s.series).filter((id): id is string => Boolean(id) && Boolean(getSeries(id!)));

/**
 * Pairs a series page renders in full, because the series is one of their two sides.
 *
 * Every one of them, not `[0]`. Taking the first silently dropped PR-35, PR-37 and PR-52: each is
 * a side of a series that already had another pair ahead of it, and nothing anywhere reported it.
 */
export const pairsWithSeriesAsSide = (id: string): Pair[] =>
  pairs.filter((p) => pairRenders(p) && subjectSeriesIds(p).includes(id));

/**
 * Pairs a non-series record hosts, because no series is a side of them.
 *
 * The host is the FIRST side with a resolvable host record, so a pair has exactly one home and
 * renders once. Rendering on both sides' hosts would put the same pair on a provenance page and a
 * ledger page with nothing to say which is its own.
 */
export const pairsHostedOn = (route: string): Pair[] =>
  pairs.filter(
    (p) =>
      pairRenders(p) &&
      subjectSeriesIds(p).length === 0 &&
      [p.a, p.b].map(hostRouteForSide).find(Boolean) === route,
  );

/**
 * Pairs that NAME this ledger record in `ledgerRefs` — the reverse of a link that only ran one way.
 *
 * WHY IT DID NOT EXIST. `ledgerRefs` is populated on 45 of 60 pairs, 68 references over 53 records,
 * zero dangling — and **no ledger record names a pair**, so the relationship was recorded in one
 * direction and read in neither. A pair with two series sides is hosted on a series page, so
 * L-0074 (Expansion of PMLA enforcement) had no way of learning that PR-14 (PMLA cases initiated
 * against persons convicted) is the measurement of exactly what it describes.
 *
 * **The pair is the measurement and the record is the policy.** That is the edge, and it was
 * already in `/data`.
 *
 * NON-RENDERING PAIRS ARE EXCLUDED. Two are `declared-pending` and render nowhere; listing them
 * here would put a link to a comparison the reader cannot reach. `pairHref` is the single source of
 * truth for where a pair lives, so the row links through it rather than guessing a route — the
 * defect that put sixteen `/series/L-` anchors on the site.
 */
export const pairsNaming = (ledgerId: string): Pair[] =>
  pairs.filter((p) => pairRenders(p) && (p.ledgerRefs ?? []).includes(ledgerId));

export function pairHref(p: Pair): string | undefined {
  if (!pairRenders(p)) return undefined;
  const subjects = subjectSeriesIds(p);
  if (subjects.length) return `/series/${subjects[0]}/`;
  return [p.a, p.b].map(hostRouteForSide).find(Boolean);
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
 * Every graded citation in the corpus, from all three layers, in one shape.
 *
 * WHY THIS EXISTS, AND IT IS NOT CONVENIENCE. `tier` is asserted in two structurally different
 * places: INSIDE each entry of `sources[]` on a ledger or provenance record, and ON THE RECORD
 * for a series, whose `source` is a bare `SourceRef` that carries no tier at all. Any count that
 * reads one site sees a corpus missing the other, and the failure is silent in the worst
 * direction — a series citation read as `source.tier` returns `undefined`, which tallies as
 * "untiered" rather than as an error.
 *
 * That is not hypothetical. The published sourcing claim on /method said 752 of 1,205 citations
 * were T1; the true figure is the number this function returns, and 752 is exactly
 * ledger + provenance with all 269 series dropped. It is the fifth recorded instance of the same
 * read in this project.
 *
 * So the rule is: NOTHING COUNTS CITATIONS BY HAND. Read them here, where the asymmetry is
 * resolved once and the resolution is visible. If `tier` ever moves — into the series `source`
 * object, or out of the ledger `sources[]` entries — this function is the only place that has to
 * know, and every caller keeps working.
 *
 * `vintage` is the mirror asymmetry and is preserved rather than flattened away: only a series
 * `SourceRef` can carry one, so it is undefined on every ledger and provenance citation by
 * construction, not by omission.
 */
export type Citation = {
  layer: 'ledger' | 'provenance' | 'series';
  recordId: string;
  recordTitle: string;
  href: string;
  name: string;
  url: string;
  tier: Tier;
  vintage?: string;
};

export function citations(): Citation[] {
  const fromLedger: Citation[] = ledger.flatMap((l) =>
    (l.sources ?? []).map((s) => ({
      layer: 'ledger' as const,
      recordId: l.id,
      recordTitle: l.title,
      href: `/ledger/${l.id}/`,
      name: s.name,
      url: s.url,
      tier: s.tier,
    })),
  );
  const fromProvenance: Citation[] = provenance.flatMap((p) =>
    (p.sources ?? []).map((s) => ({
      layer: 'provenance' as const,
      recordId: p.id,
      recordTitle: p.title,
      href: `/provenance/${p.id}/`,
      name: s.name,
      url: s.url,
      tier: s.tier,
    })),
  );
  // The asymmetry, handled in the one place that is allowed to know about it.
  const fromSeries: Citation[] = series.map((s) => ({
    layer: 'series' as const,
    recordId: s.id,
    recordTitle: s.title,
    href: `/series/${s.id}/`,
    name: s.source.name,
    url: s.source.url,
    tier: s.tier,
    vintage: s.source.vintage,
  }));
  return [...fromLedger, ...fromProvenance, ...fromSeries];
}

/** Tier tally over any citation set. Every tier key is present, including zeroes: a tier that
 *  renders only when non-empty makes an absent row indistinguishable from an unread layer. */
export function tierCounts(cites: Citation[] = citations()): Record<Tier, number> {
  const counts = Object.fromEntries(TIERS.map((t) => [t, 0])) as Record<Tier, number>;
  for (const c of cites) counts[c.tier] = (counts[c.tier] ?? 0) + 1;
  return counts;
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
  | {
      kind: 'absence';
      label: string;
      entry: Unmeasured;
      hostId: string;
      hostTitle: string;
      /**
       * The host's own route, carried rather than re-derived.
       *
       * WHY IT IS AN href AND NOT AN id. An `absenceFrom` host resolves against EITHER layer,
       * so its id alone does not say which route serves it. Between phase 6c and 2026-08-08
       * `CoverageUsageView` guessed `/series/${hostId}/` and every ledger-hosted side named a
       * route that is not built for any ledger id: 22 sides declare a ledger host, 16 rendered
       * the anchor, and all 16 returned 404 on the live site.
       *
       * `allUnmeasured` already solved the identical either-layer problem by carrying `href` on
       * the resolved object (`DeclaredAbsence.href`), and `/unmeasured` has never emitted a
       * `/series/L-` anchor. This field makes the pairs layer use that same mechanism rather
       * than a second one — the local-fix rule: the correction is the sweep, not the instance.
       */
      hostHref: string;
    }
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
    // The accessor that answered is the only place the layer is known for free. Capture the
    // route here; every caller downstream would otherwise have to guess it, and one did.
    const asSeries = getSeries(side.absenceFrom);
    const host = asSeries ?? getLedger(side.absenceFrom);
    const hostHref = asSeries ? `/series/${side.absenceFrom}/` : `/ledger/${side.absenceFrom}/`;
    const entry = host?.unmeasured?.[side.absenceIndex ?? 0];
    return host && entry
      ? {
          kind: 'absence',
          label: side.label,
          entry,
          hostId: host.id,
          hostTitle: host.title,
          hostHref,
        }
      : null;
  }
  if (side.competingAccountsFrom) {
    const p = getProvenance(side.competingAccountsFrom);
    return p?.competingAccounts?.length ? { kind: 'accounts', label: side.label, record: p } : null;
  }
  return null;
}
