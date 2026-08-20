import type { Metadata } from 'next';
import Link from 'next/link';
import { series, pairs } from '@/lib/data';
import { routeLabel } from '@/lib/routes';
import { CompareWorkbench } from '@/components/CompareWorkbench';
import { SectionNav } from '@/components/SectionNav';

export const metadata: Metadata = {
  title: routeLabel('/compare/'),
  description: 'Side-by-side indicator comparator workbench with synchronized timeline, term shading, and methodological dispute framing.',
};

export default function ComparePage() {
  const compactSeries = series.map((s) => ({
    id: s.id,
    title: s.title,
    domain: s.domain,
    unit: s.unit,
    publisher: s.source?.name,
    tier: s.tier,
    points: s.points
      .filter((p) => p.country === 'IND' && p.value !== null && typeof p.value === 'number')
      .map((p) => ({
        year: Number(String(p.period).replace(/^FY/, '').slice(0, 4)),
        value: p.value as number,
      }))
      .filter((p) => !isNaN(p.year)),
    caveat: s.caveat,
    breaks: s.breaks
      ?.map((b) => Number(String(b.period).replace(/^FY/, '').slice(0, 4)))
      .filter((y) => !isNaN(y)),
  }));

  const compactPairs = pairs.map((p) => ({
    id: p.id,
    domain: p.domain,
    labelA: p.a.label,
    seriesA: p.a.series || '',
    labelB: p.b.label,
    seriesB: p.b.series || '',
    framing: p.framing,
    gapReason: p.gapReason,
  }));

  return (
    <>
      <p className="crumb">
        <Link prefetch={false} href="/">instrument</Link> / compare series
      </p>
      <h1 className="page-lead">Side-by-side series comparator</h1>
      <p className="lede">
        Compare any two official indicator series side-by-side on an aligned timeline with Government Term shading. Direct comparisons preserve source tiers, non-interpolation rules, and explain why divergent measurements cannot be smoothed away.
      </p>
      <SectionNav section="compare" />

      <div id="series-comparison">
        <CompareWorkbench seriesList={compactSeries} pairsList={compactPairs} />
      </div>
    </>
  );
}
