import type { Assessment, Calendar, Country, Domain, Lens, Term, Tier } from './types';

/**
 * Display names for the lens axis, and a one-line statement of what each lens means.
 *
 * The blurb is not decoration. A lens page is a filter, and a filter whose criterion is unstated
 * invites the reader to infer it from whatever happens to be listed — which is how `defence` came
 * to be described as a lens in a doc comment when the schema had never said so. Each line here
 * restates the schema's own definition for that value; the schema is the contract, this is what a
 * reader sees.
 */
export const LENS_LABELS: Record<Lens, string> = {
  kashmir: 'Kashmir',
  federalism: 'Federalism',
  'defence-sector': 'Defence sector',
  'united-states': 'United States',
  russia: 'Russia',
};

export const LENS_BLURBS: Record<Lens, string> = {
  kashmir:
    'Jammu and Kashmir as place and question. The record’s subject sits elsewhere — defence, governance, welfare — and J&K is the territory, population or conflict it is measured over. Never a subject value.',
  federalism:
    'Centre-state relations bearing on a record whose subject is elsewhere. Unlike the others this is also a subject in its own right, so it is legal on either axis and illegal only on both at once.',
  'defence-sector':
    'The armed forces, the defence industry, or defence procurement — whatever domain the record files. Deliberately not named “defence”: the domain of that name is narrower, covering armed conflict and counter-insurgency, and an acquisition cost or an indigenisation share is neither.',
  'united-states':
    'The United States as counterparty — tariff actions, the negotiation track, visa and services measures, defence and technology frameworks.',
  russia:
    'The Russian Federation as counterparty — crude and refined-product flows, payment mechanisms, defence supply, and the linkage of any of them into a third country’s measures.',
};

export const DOMAIN_LABELS: Record<Domain, string> = {
  macro: 'Macroeconomy',
  banking: 'Banking & credit',
  employment: 'Employment',
  poverty: 'Poverty',
  'human-development': 'Human development',
  infrastructure: 'Infrastructure',
  welfare: 'Welfare delivery',
  education: 'Education',
  governance: 'Governance & institutions',
  kashmir: 'Kashmir',
  federalism: 'Federalism',
  foreign: 'External sector & foreign policy',
  defence: 'Defence',
  environment: 'Environment & energy',
};

export const TERM_LABELS: Record<Term, string> = {
  baseline: 'Baseline — UPA era, frozen May 2014',
  T1: 'Term 1 — 2014–19',
  T2: 'Term 2 — 2019–24',
  T3: 'Term 3 — 2024– (living)',
};

export const TERM_SHORT: Record<Term, string> = {
  baseline: 'Baseline',
  T1: 'T1',
  T2: 'T2',
  T3: 'T3',
};

export const TIER_LABELS: Record<Tier, string> = {
  T1: 'Official Indian statistical / institutional source',
  T2: 'Multilateral or international statistical source',
  T3: 'Peer-reviewed or working-paper research',
  T4: 'Reported / documentary journalism, NGO datasets',
  T5: 'Contested composite index — always carries its dispute',
};

export const ASSESSMENT_LABELS: Record<Assessment, string> = {
  worked: 'Worked',
  partly: 'Partly',
  failed: 'Failed',
  reversed: 'Reversed',
  contested: 'Contested',
  'too-early': 'Too early',
  'awaiting-adjudication': 'Awaiting adjudication',
  'no-objective': 'No stated objective',
  'baseline-context': 'Baseline context (not scored)',
};

export const COUNTRY_LABELS: Record<Country, string> = {
  IND: 'India',
  BGD: 'Bangladesh',
  VNM: 'Vietnam',
  IDN: 'Indonesia',
  CHN: 'China',
};

const FY_RE = /^FY(\d{4})-(\d{2})$/;

/** Sort key shared with the validator: FY2013-14 -> 2013, "2014" -> 2014. */
export function periodKey(period: string): number {
  const fy = FY_RE.exec(period);
  if (fy) return Number(fy[1]);
  const cy = Number(period);
  return Number.isFinite(cy) ? cy : 0;
}

export function periodLabel(period: string, calendar: Calendar): string {
  const fy = FY_RE.exec(period);
  if (fy) return `FY${fy[1]}–${fy[2]}`;
  return calendar === 'CY' ? period : period;
}

/** Figures render with tabular digits; keep the source's own precision. */
export function formatValue(value: number): string {
  const abs = Math.abs(value);
  const decimals = Number.isInteger(value) ? 0 : abs < 100 ? 2 : 1;
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function formatDateRange(date: string, dateEnd?: string): string {
  if (!dateEnd || dateEnd === date) return date;
  return `${date} → ${dateEnd}`;
}
