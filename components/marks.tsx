import Link from 'next/link';
import type { Point, Status, Tier, TieredSource, SourceRef } from '@/lib/types';
import { TIER_LABELS, formatValue } from '@/lib/format';

/**
 * A figure with its measurement status showing (CLAUDE.md rule 3):
 * verified renders plain, approx carries "≈" and a dotted rule,
 * pending never renders without its flag.
 */
export function Value({ point, unit }: { point: Point; unit?: string }) {
  const figure = formatValue(point.value);
  if (point.status === 'verified') {
    return (
      <span className="figure">
        {figure}
        {unit ? <span className="t-note"> {unit}</span> : null}
      </span>
    );
  }
  if (point.status === 'approx') {
    return (
      <span className="figure status-approx" title="Approximate — from a credible report; primary pull outstanding">
        ≈{figure}
        {unit ? <span className="t-note"> {unit}</span> : null}
      </span>
    );
  }
  return (
    <span className="figure">
      {figure}
      {unit ? <span className="t-note"> {unit}</span> : null}
      <span className="flag-pending">pending</span>
    </span>
  );
}

export function StatusKey() {
  return (
    <p className="status-key">
      <span>verified — pinned to the named source this cycle</span>
      <span className="status-approx">≈ approx — credible report, primary pull outstanding</span>
      <span>
        placeholder
        <span className="flag-pending">pending</span>
      </span>
    </p>
  );
}

export function TierTag({ tier }: { tier: Tier }) {
  return (
    <span className={tier === 'T5' ? 'tag tag-t5' : 'tag'} title={TIER_LABELS[tier]}>
      {tier}
    </span>
  );
}

export function StatusTally({ counts }: { counts: Record<string, number> }) {
  const shown = (['verified', 'approx', 'pending'] as Status[]).filter((s) => counts[s]);
  if (shown.length === 0) return null;
  return (
    <p className="status-key">
      {shown.map((s) => (
        <span key={s}>
          {counts[s]} {s}
        </span>
      ))}
    </p>
  );
}

/** Source, tier and vintage on one line — one click from any number (rule 6/7). */
export function SourceLine({ source, tier }: { source: SourceRef; tier?: Tier }) {
  return (
    <p className="source-line">
      Source:{' '}
      <a href={source.url} target="_blank" rel="noreferrer">
        {source.name}
      </a>
      {tier ? <> · tier {tier}</> : null}
      {source.vintage ? <> · vintage {source.vintage}</> : null}
    </p>
  );
}

export function SourceList({ sources }: { sources: TieredSource[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0.35rem 0 1rem' }}>
      {sources.map((s) => (
        <li key={`${s.name}-${s.url}`} className="source-line">
          <a href={s.url} target="_blank" rel="noreferrer">
            {s.name}
          </a>{' '}
          · tier {s.tier}
        </li>
      ))}
    </ul>
  );
}

export function ProvenanceTags({ ids }: { ids: string[] }) {
  if (ids.length === 0) return null;
  return (
    <span className="tag-row">
      {ids.map((id) => (
        <Link key={id} className="tag" href={`/provenance/${id}/`}>
          {id}
        </Link>
      ))}
    </span>
  );
}
