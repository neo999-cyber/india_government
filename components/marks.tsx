import Link from 'next/link';
import type { ReactNode } from 'react';
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

/**
 * Provenance ids named inside prose, made reachable.
 *
 * A caveat that ends "See P-26" should get the reader there in one click, the same as the
 * tag row does. Split rather than replace, so the text is never parsed as markup.
 */
function withProvenanceLinks(text: string): ReactNode[] {
  return text.split(/(P-\d{2})/g).map((part, i) =>
    /^P-\d{2}$/.test(part) ? (
      <Link key={`${part}-${i}`} href={`/provenance/${part}/`}>
        {part}
      </Link>
    ) : (
      <span key={`t-${i}`}>{part}</span>
    ),
  );
}

/**
 * The caveat a record may not render without — read from the record's own `caveat` field.
 *
 * A record carrying one would mislead without it, so a list row showing the title and the
 * word "contested" transmits the claim while dropping the thing that qualifies it. The flag
 * therefore travels into every rendering, compact ones included: index tables, domain and
 * term pages, cited-by grids, not only the detail page.
 *
 * Both variants show the full text. `inline` is the compact form, and it does not truncate
 * — a caveat abbreviated to fit a table cell is a caveat that can be misread, which is the
 * failure it exists to prevent.
 */
export function CaveatFlag({
  caveat,
  variant = 'block',
  /**
   * False inside a link — the grid cards are anchors, and an anchor inside an anchor is
   * invalid markup. The caveat still renders in full; only the P-xx shortcuts drop out,
   * and the card already leads to the record where they are live.
   */
  linkify = true,
}: {
  caveat: string;
  variant?: 'inline' | 'block';
  linkify?: boolean;
}) {
  const body = linkify ? withProvenanceLinks(caveat) : caveat;
  if (variant === 'inline') {
    return <span className="caveat-inline">Caveat: {body}</span>;
  }
  return (
    <div className="caveat-block">
      <span className="label">Blocking caveat</span>
      <p>{body}</p>
    </div>
  );
}
