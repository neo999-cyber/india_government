/**
 * TypeScript view of the three data layers. The schemas in /schemas are the
 * contract — these types mirror them and are guaranteed by `npm run validate`,
 * which the build runs before Next ever compiles.
 */

export const DOMAINS = [
  'macro',
  'banking',
  'employment',
  'poverty',
  'human-development',
  'infrastructure',
  'welfare',
  'governance',
  'kashmir',
  'federalism',
  'foreign',
  'defence',
  'environment',
  'demography',
] as const;
export type Domain = (typeof DOMAINS)[number];

export const TERMS = ['baseline', 'T1', 'T2', 'T3'] as const;
export type Term = (typeof TERMS)[number];

export const TIERS = ['T1', 'T2', 'T3', 'T4', 'T5'] as const;
export type Tier = (typeof TIERS)[number];

export type Country = 'IND' | 'BGD' | 'VNM' | 'IDN' | 'CHN';
export type Status = 'verified' | 'approx' | 'pending';
export type Calendar = 'FY' | 'CY';

/**
 * A dimension a record should have but which nothing measures.
 *
 * Distinct from sparsity: `status: 'pending'` and blank periods already say "not reported
 * this period". This says the thing was never measured at all — a missing link in a chain,
 * an intended outcome no study ever tested, or a series that stops short of what it is cited
 * to demonstrate. An absence of this kind is a research finding (CLAUDE.md rule 4a).
 */
export interface Unmeasured {
  /** The thing that is not measured, stated positively. */
  what: string;
  /** Why no figure exists — not collected, not published, withheld, or never defined. */
  why: string;
  /** The source that would close it. Doubles as a verification-queue seed. */
  wouldFill?: string;
}

export interface SourceRef {
  name: string;
  url: string;
  vintage?: string;
}

export interface TieredSource {
  name: string;
  url: string;
  tier: Tier;
}

export interface SeriesBreak {
  period: string;
  note: string;
  provenanceRef: string;
}

export interface Point {
  country: Country;
  period: string;
  value: number;
  status: Status;
  note?: string;
}

export interface Series {
  id: string;
  title: string;
  unit: string;
  domain: Domain;
  tier: Tier;
  source: SourceRef;
  calendar: Calendar;
  breaks?: SeriesBreak[];
  points: Point[];
  provenanceRefs?: string[];
  notes?: string;
  /**
   * A blocking qualification that must render wherever this record appears, including
   * compact listings. Distinct from `notes`: notes carry ordinary context and uncertainty,
   * a caveat marks a record that would mislead without it.
   */
  caveat?: string;
  /** Dimensions this series should have but which nothing measures. */
  unmeasured?: Unmeasured[];
}

export type Assessment =
  | 'worked'
  | 'partly'
  | 'failed'
  | 'reversed'
  | 'contested'
  | 'too-early'
  | 'baseline-context';

export type LedgerType = 'reform' | 'event' | 'episode' | 'shock' | 'institutional';

export interface LedgerRecord {
  id: string;
  title: string;
  date: string;
  dateEnd?: string;
  term: Term;
  domains: Domain[];
  type: LedgerType;
  summary: string;
  claimAtLaunch?: string;
  whatHappened?: string;
  assessment: Assessment;
  caseFor?: string;
  caseAgainst?: string;
  shockExposure?: string;
  seriesRefs?: string[];
  provenanceRefs?: string[];
  sources: TieredSource[];
  confidence: 'high' | 'medium' | 'low';
  asOf: string;
  /** See `Series.caveat` — same contract, same rendering obligation. */
  caveat?: string;
  /** See `Series.unmeasured`. */
  unmeasured?: Unmeasured[];
}

export type BiasDirection =
  | 'understates-pre-2014'
  | 'overstates-pre-2014'
  | 'understates-post-2014'
  | 'overstates-post-2014'
  | 'disputed'
  | 'obscures'
  | 'degrades-precision';

export interface ProvenanceRecord {
  id: string;
  title: string;
  whatChanged: string;
  when: string;
  affectsDomains: (Domain | 'all')[];
  affectsSeries?: string[];
  directionOfBias: BiasDirection;
  bridgeExists: boolean;
  bridgeNote?: string;
  competingAccounts?: { holder: string; position: string }[];
  sources: TieredSource[];
  notes?: string;
}
