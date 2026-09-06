'use client';

import { useEffect, useMemo, useState } from 'react';
import { CompareWorkbench } from '@/components/CompareWorkbench';
import { toCompactSeries, type CompactPair, type CompactSeries } from '@/lib/compare';

type PublicSeries = {
  id: string;
  title: string;
  domain: string;
  lenses?: string[];
  unit: string;
  publisher?: string;
  tier?: string;
  source?: { name?: string };
  calendar: 'FY' | 'CY';
  caveat?: string;
  points: { country: 'IND' | 'BGD' | 'CHN' | 'IDN' | 'VNM'; period: string; value: number | null; status: 'verified' | 'approx' | 'pending'; note?: string }[];
  breaks?: { period: string; note: string; provenanceRef: string }[];
};

type PublicPair = {
  id: string;
  domain: string;
  lenses?: string[];
  a: { series?: string; label: string };
  b: { series?: string; label: string };
  framing: string;
  gapReason?: string;
};

type CompareData = { series: PublicSeries[]; pairs: PublicPair[] };

let compareDataRequest: Promise<CompareData> | null = null;

function loadCompareData() {
  if (!compareDataRequest) {
    compareDataRequest = Promise.all([
      fetch('/data/v1/series.json'),
      fetch('/data/v1/pairs.json'),
    ]).then(async ([seriesResponse, pairsResponse]) => {
      if (!seriesResponse.ok || !pairsResponse.ok) {
        throw new Error('The comparison records could not be loaded.');
      }
      return {
        series: (await seriesResponse.json()) as PublicSeries[],
        pairs: (await pairsResponse.json()) as PublicPair[],
      };
    });
  }
  return compareDataRequest;
}

export function AtlasCompareMode({ focused }: { focused: string[] }) {
  const [data, setData] = useState<CompareData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    loadCompareData().then(
      (result) => {
        if (live) setData(result);
      },
      () => {
        if (live) setFailed(true);
      },
    );
    return () => {
      live = false;
    };
  }, []);

  const focus = useMemo(() => new Set(focused), [focused]);
  const seriesList = useMemo<CompactSeries[]>(() => {
    if (!data) return [];
    return data.series.flatMap((series) => {
      if (
        focus.size &&
        !focus.has(series.domain) &&
        !(series.lenses ?? []).some((lens) => focus.has(lens))
      ) {
        return [];
      }
      const compact = toCompactSeries(series, 2010);
      if (compact.points.filter((point) => typeof point.value === 'number').length < 2) return [];
      return [compact];
    });
  }, [data, focus]);

  const pairsList = useMemo<CompactPair[]>(() => {
    if (!data) return [];
    const ids = new Set(seriesList.map((series) => series.id));
    return data.pairs.flatMap((pair) => {
      if (!pair.a.series || !pair.b.series || !ids.has(pair.a.series) || !ids.has(pair.b.series)) {
        return [];
      }
      if (
        focus.size &&
        !focus.has(pair.domain) &&
        !(pair.lenses ?? []).some((lens) => focus.has(lens))
      ) {
        return [];
      }
      return [{
        id: pair.id,
        domain: pair.domain,
        labelA: pair.a.label,
        seriesA: pair.a.series,
        labelB: pair.b.label,
        seriesB: pair.b.series,
        framing: pair.framing,
        gapReason: pair.gapReason,
      }];
    });
  }, [data, focus, seriesList]);

  if (failed) {
    return (
      <div className="atlas-empty" role="alert">
        <h2>Comparison records did not load</h2>
        <p>Reload this view or open the dedicated comparison page.</p>
      </div>
    );
  }
  if (!data) {
    return <p className="atlas-compare-loading" role="status">Loading comparison records…</p>;
  }
  if (seriesList.length < 2) {
    return (
      <div className="atlas-empty" role="status">
        <h2>Choose a wider topic scope to compare</h2>
        <p>This topic does not expose two chartable series in the Atlas.</p>
      </div>
    );
  }
  return <CompareWorkbench seriesList={seriesList} pairsList={pairsList} />;
}
