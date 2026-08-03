import type { Assessment, Calendar, Country, Domain, Term, Tier } from './types';

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
