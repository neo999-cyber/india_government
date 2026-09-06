import type { Calendar, Status } from '@/lib/types';

export type CompactPoint = {
  year: number;
  period: string;
  value: number | null;
  status: Status;
  note?: string;
};

export type CompactBreak = {
  year: number;
  period: string;
  note: string;
};

export interface CompactSeries {
  id: string;
  title: string;
  domain: string;
  unit: string;
  publisher?: string;
  vintage?: string;
  tier?: string;
  calendar: Calendar;
  points: CompactPoint[];
  caveat?: string;
  breaks?: CompactBreak[];
}

export interface CompactPair {
  id: string;
  domain: string;
  labelA: string;
  seriesA: string;
  labelB: string;
  seriesB: string;
  framing: string;
  gapReason?: string;
}

type CompareSource = {
  id: string;
  title: string;
  domain: string;
  unit: string;
  tier?: string;
  calendar: Calendar;
  points: { country: string; period: string; value: number | null; status: Status; note?: string }[];
  caveat?: string;
  breaks?: { period: string; note: string }[];
  publisher?: string;
  source?: { name?: string; vintage?: string };
};

const yearOf = (period: string) => Number(String(period).replace(/^FY/, '').slice(0, 4));

/**
 * One adapter for the dedicated Compare page and the Atlas Compare mode.
 * Full period labels, observation status, notes, source vintage and seam reasons cross the
 * server/client boundary together so a compact chart cannot silently look more certain than the
 * record it represents.
 */
export function toCompactSeries(series: CompareSource, minYear?: number): CompactSeries {
  const points = series.points
    .filter((point) => point.country === 'IND')
    .map((point) => ({
      year: yearOf(point.period),
      period: point.period,
      value: point.value,
      status: point.status,
      note: point.note,
    }))
    .filter((point) => !Number.isNaN(point.year) && (minYear === undefined || point.year >= minYear))
    .sort((a, b) => a.year - b.year);

  return {
    id: series.id,
    title: series.title,
    domain: series.domain,
    unit: series.unit,
    publisher: series.source?.name ?? series.publisher,
    vintage: series.source?.vintage,
    tier: series.tier,
    calendar: series.calendar,
    points,
    caveat: series.caveat,
    breaks: series.breaks
      ?.map((item) => ({ year: yearOf(item.period), period: item.period, note: item.note }))
      .filter((item) => !Number.isNaN(item.year) && (minYear === undefined || item.year >= minYear)),
  };
}
