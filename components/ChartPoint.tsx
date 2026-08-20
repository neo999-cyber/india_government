'use client';

import type { KeyboardEvent } from 'react';

/**
 * Move between points in the current chart without forcing a reader to Tab through every value.
 * Tab still enters each point, so the no-JavaScript reading remains the SVG title and the text
 * beneath the chart. Arrow keys, Home and End are progressive keyboard shortcuts inside one SVG.
 */
export function moveChartPointFocus(event: KeyboardEvent<SVGCircleElement>) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
  if (!keys.includes(event.key)) return;
  const points = Array.from(
    event.currentTarget.closest('svg')?.querySelectorAll<SVGCircleElement>('[data-chart-point]') ?? [],
  );
  const current = points.indexOf(event.currentTarget);
  if (current < 0 || points.length < 2) return;
  event.preventDefault();
  const next =
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? points.length - 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? (current - 1 + points.length) % points.length
          : (current + 1) % points.length;
  points[next]?.focus();
}

export function ChartPoint({
  cx,
  cy,
  r,
  className,
  label,
  title,
  tabIndex = -1,
}: {
  cx: number;
  cy: number;
  r: number;
  className: string;
  label: string;
  title: string;
  tabIndex?: number;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      className={className}
      tabIndex={tabIndex}
      role="img"
      aria-label={label}
      data-chart-point=""
      onKeyDown={moveChartPointFocus}
    >
      <title>{title}</title>
    </circle>
  );
}
