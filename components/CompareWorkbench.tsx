'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ShareCardExporter } from './ShareCardExporter';

export interface CompactSeries {
  id: string;
  title: string;
  domain: string;
  unit: string;
  publisher?: string;
  tier?: string;
  points: { year: number; value: number }[];
  caveat?: string;
  breaks?: number[];
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

export function CompareWorkbench({
  seriesList,
  pairsList,
}: {
  seriesList: CompactSeries[];
  pairsList: CompactPair[];
}) {
  const [selectedPairId, setSelectedPairId] = useState<string>(pairsList[0]?.id || '');
  const [seriesAId, setSeriesAId] = useState<string>(pairsList[0]?.seriesA || seriesList[0]?.id || '');
  const [seriesBId, setSeriesBId] = useState<string>(pairsList[0]?.seriesB || seriesList[1]?.id || '');
  const [showAllPairs, setShowAllPairs] = useState(false);
  const [pairQuery, setPairQuery] = useState('');

  const activePair = useMemo(() => {
    return pairsList.find((p) => p.id === selectedPairId);
  }, [pairsList, selectedPairId]);

  const seriesA = useMemo(() => {
    return seriesList.find((s) => s.id === seriesAId);
  }, [seriesList, seriesAId]);

  const seriesB = useMemo(() => {
    return seriesList.find((s) => s.id === seriesBId);
  }, [seriesList, seriesBId]);

  const handleSelectPair = (pair: CompactPair) => {
    setSelectedPairId(pair.id);
    setSeriesAId(pair.seriesA);
    setSeriesBId(pair.seriesB);
  };

  const handleCustomA = (id: string) => {
    setSeriesAId(id);
    setSelectedPairId('');
  };

  const handleCustomB = (id: string) => {
    setSeriesBId(id);
    setSelectedPairId('');
  };

  // Year range 2010 -> 2026
  const X0 = 2010;
  const X1 = 2026;
  const W = 520;
  const H = 160;
  const padX = 24;
  const padY = 20;

  const renderSpark = (s: CompactSeries, color: string) => {
    if (!s.points || s.points.length === 0) return null;
    const pts = [...s.points].sort((a, b) => a.year - b.year);
    const vMin = Math.min(...pts.map((p) => p.value));
    const vMax = Math.max(...pts.map((p) => p.value));
    const vRange = vMax - vMin || 1;

    const getX = (yr: number) => padX + ((yr - X0) / (X1 - X0)) * (W - padX * 2);
    const getY = (v: number) => H - padY - ((v - vMin) / vRange) * (H - padY * 2);

    const breakYears = new Set(s.breaks ?? []);
    const segments: typeof pts[] = [];
    let current: typeof pts = [];
    pts.forEach((p, index) => {
      const previous = pts[index - 1];
      const cut = breakYears.has(p.year) || (previous && p.year - previous.year > 1);
      if (cut && current.length) {
        segments.push(current);
        current = [];
      }
      current.push(p);
    });
    if (current.length) segments.push(current);

    const pathFor = (segment: typeof pts) =>
      segment
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(p.year).toFixed(1)} ${getY(p.value).toFixed(1)}`)
        .join(' ');

    const t1X = getX(2014);
    const t1W = getX(2019) - t1X;
    const t2X = getX(2019);
    const t2W = getX(2024) - t2X;
    const t3X = getX(2024);
    const t3W = getX(2026) - t3X;

    return (
      <svg viewBox={'0 0 ' + W + ' ' + H} className="compare-svg" role="img" aria-label={s.title}>
        {/* Term Bands */}
        <rect x={t1X} y={0} width={t1W} height={H} fill="var(--band-term-1)" />
        <rect x={t2X} y={0} width={t2W} height={H} fill="var(--band-term-2)" />
        <rect x={t3X} y={0} width={t3W} height={H} fill="var(--band-term-3)" />

        {/* Baseline */}
        <line x1={padX} y1={H - padY} x2={W - padX} y2={H - padY} stroke="var(--rule)" strokeWidth="1" />

        {/* Series Line */}
        {segments.map((segment, index) => (
          <path
            key={index}
            d={pathFor(segment)}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}

        {(s.breaks ?? []).map((year) => (
          <g key={year}>
            <line
              x1={getX(year)}
              x2={getX(year)}
              y1={padY}
              y2={H - padY}
              stroke="var(--alert)"
              strokeWidth="1.5"
            />
            <text x={getX(year) + 4} y={padY + 10} className="compare-seam-label">
              basis changed
            </text>
          </g>
        ))}

        {/* Points */}
        {pts.map((p) => (
          <circle
            key={p.year}
            cx={getX(p.year)}
            cy={getY(p.value)}
            r={3.5}
            fill={color}
            stroke="var(--bg)"
            strokeWidth="1.5"
            tabIndex={0}
            role="img"
            aria-label={`${p.year}: ${p.value} ${s.unit}`}
          >
            <title>{p.year + ': ' + p.value + ' ' + s.unit}</title>
          </circle>
        ))}
      </svg>
    );
  };

  // Overlapping timeline table data
  const years = useMemo(() => {
    const set = new Set<number>();
    seriesA?.points.forEach((p) => set.add(p.year));
    seriesB?.points.forEach((p) => set.add(p.year));
    return Array.from(set).sort((a, b) => a - b);
  }, [seriesA, seriesB]);

  const exportData = useMemo(() => {
    return {
      title: (seriesA?.title || 'Series A') + ' vs ' + (seriesB?.title || 'Series B'),
      domain: seriesA?.domain,
      tier: seriesA?.tier,
      publisher: seriesA?.publisher,
      unit: seriesA?.unit,
      caveat: activePair?.framing || seriesA?.caveat || seriesB?.caveat,
      points: seriesA?.points || [],
      seriesBTitle: seriesB?.title,
      seriesBPoints: seriesB?.points || [],
      seriesBUnit: seriesB?.unit,
    };
  }, [seriesA, seriesB, activePair]);

  const shownPairs = useMemo(() => {
    const needle = pairQuery.trim().toLowerCase();
    const filtered = needle
      ? pairsList.filter((pair) =>
          `${pair.id} ${pair.domain} ${pair.labelA} ${pair.labelB}`.toLowerCase().includes(needle),
        )
      : pairsList;
    return showAllPairs || needle ? filtered : filtered.slice(0, 8);
  }, [pairQuery, pairsList, showAllPairs]);

  return (
    <div className="compare-workbench">
      {/* Curated Presets Carousel / Tabs */}
      <div className="compare-presets-section">
        <div className="compare-presets-head">
          <span className="compare-section-label">
            {showAllPairs || pairQuery ? 'ALL' : 'FEATURED'} COMPARISON PRESETS ({shownPairs.length} OF {pairsList.length})
          </span>
          <label className="compare-preset-find">
            <span className="sr-only">Find a comparison preset</span>
            <input
              type="search"
              value={pairQuery}
              onChange={(event) => setPairQuery(event.target.value)}
              placeholder="Find a comparison"
            />
          </label>
        </div>
        <div className="compare-presets-grid">
          {shownPairs.map((pair) => (
            <button
              key={pair.id}
              type="button"
              className={'compare-preset-btn' + (selectedPairId === pair.id ? ' is-active' : '')}
              onClick={() => handleSelectPair(pair)}
            >
              <span className="compare-preset-domain">{pair.domain}</span>
              <span className="compare-preset-title">
                {pair.labelA} <span className="compare-vs">vs</span> {pair.labelB}
              </span>
            </button>
          ))}
        </div>
        {!pairQuery && pairsList.length > 8 ? (
          <button type="button" className="compare-preset-more" onClick={() => setShowAllPairs((value) => !value)}>
            {showAllPairs ? 'Show the featured eight' : `Show all ${pairsList.length} comparisons`}
          </button>
        ) : null}
      </div>

      {/* Selectors Bar */}
      <div className="compare-selectors-bar">
        <div className="compare-selector-group">
          <label htmlFor="sel-a" className="compare-label compare-label-a">
            ● SERIES A (BLUE)
          </label>
          <select
            id="sel-a"
            className="compare-select"
            value={seriesAId}
            onChange={(e) => handleCustomA(e.target.value)}
          >
            {seriesList.map((s) => (
              <option key={s.id} value={s.id}>
                [{s.domain}] {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="compare-selector-group">
          <label htmlFor="sel-b" className="compare-label compare-label-b">
            ● SERIES B (CORAL)
          </label>
          <select
            id="sel-b"
            className="compare-select"
            value={seriesBId}
            onChange={(e) => handleCustomB(e.target.value)}
          >
            {seriesList.map((s) => (
              <option key={s.id} value={s.id}>
                [{s.domain}] {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="compare-export-wrap">
          <ShareCardExporter data={exportData} label="Export Comparison Card" />
        </div>
      </div>

      {/* Methodological Framing / Dispute Callout */}
      {activePair ? (
        <div className="compare-framing-box">
          <p className="compare-framing-title">Methodological Divergence & Context</p>
          <p className="compare-framing-text">{activePair.framing}</p>
          {activePair.gapReason ? (
            <p className="compare-gap-reason">
              <strong>Why direct subtraction fails:</strong> {activePair.gapReason}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Side by Side Dual Visual Cards */}
      <div className="compare-dual-grid">
        {/* Series A Card */}
        <div className="compare-card compare-card-a">
          <div className="compare-card-top">
            <div className="compare-badges">
              <span className="badge badge-verified">{seriesA?.domain.toUpperCase()}</span>
              {seriesA?.tier ? <span className="badge badge-tier">{seriesA.tier}</span> : null}
            </div>
            {seriesA ? <Link href={'/series/' + seriesA.id + '/'} className="compare-link">View Record →</Link> : null}
          </div>
          <h3 className="compare-card-h">{seriesA?.title}</h3>
          <p className="compare-unit">Unit: {seriesA?.unit} · Source: {seriesA?.publisher || 'Official'}</p>
          {seriesA ? renderSpark(seriesA, 'var(--fill)') : null}
          {seriesA?.caveat ? <p className="compare-caveat">⚠ {seriesA.caveat}</p> : null}
        </div>

        {/* Series B Card */}
        <div className="compare-card compare-card-b">
          <div className="compare-card-top">
            <div className="compare-badges">
              <span className="badge badge-dispute">{seriesB?.domain.toUpperCase()}</span>
              {seriesB?.tier ? <span className="badge badge-tier">{seriesB.tier}</span> : null}
            </div>
            {seriesB ? <Link href={'/series/' + seriesB.id + '/'} className="compare-link">View Record →</Link> : null}
          </div>
          <h3 className="compare-card-h">{seriesB?.title}</h3>
          <p className="compare-unit">Unit: {seriesB?.unit} · Source: {seriesB?.publisher || 'Official'}</p>
          {seriesB ? renderSpark(seriesB, 'var(--alert)') : null}
          {seriesB?.caveat ? <p className="compare-caveat">⚠ {seriesB.caveat}</p> : null}
        </div>
      </div>

      {/* Synchronized Year-by-Year Observation Table */}
      <div className="compare-table-wrap">
        <h4 className="compare-table-h">Synchronized Yearly Observations (2010–2026)</h4>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Term</th>
              <th>{seriesA?.title || 'Series A'}</th>
              <th>{seriesB?.title || 'Series B'}</th>
              <th>Notes / Divergence</th>
            </tr>
          </thead>
          <tbody>
            {years.map((yr) => {
              const ptA = seriesA?.points.find((p) => p.year === yr);
              const ptB = seriesB?.points.find((p) => p.year === yr);
              const term = yr < 2014 ? 'Pre-2014' : yr < 2019 ? 'Term 1' : yr < 2024 ? 'Term 2' : 'Term 3';
              return (
                <tr key={yr}>
                  <td className="mono">{yr}</td>
                  <td><span className="term-tag">{term}</span></td>
                  <td className="mono val-a">{ptA ? ptA.value + ' ' + seriesA?.unit : '— (unreported)'}</td>
                  <td className="mono val-b">{ptB ? ptB.value + ' ' + seriesB?.unit : '— (unreported)'}</td>
                  <td className="cell-note">
                    {ptA && ptB
                      ? activePair?.gapReason
                        ? 'Not subtracted: the two measurements are not directly interchangeable.'
                        : 'Shown in parallel. No arithmetic comparison is inferred.'
                      : 'Partial observation'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
