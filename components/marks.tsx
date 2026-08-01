import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Point, ReasonKind, Status, Tier, TieredSource, SourceRef, Unmeasured } from '@/lib/types';
import { TIER_LABELS, formatValue } from '@/lib/format';

/**
 * A figure with its measurement status showing (CLAUDE.md rule 3):
 * verified renders plain, approx carries "≈" and a dotted rule,
 * pending never renders without its flag.
 */
export function Value({
  point,
  unit,
  denominator,
}: {
  point: Point;
  unit?: string;
  /**
   * Rendered inline, immediately after the figure — on the face of the number, not in a tag
   * row and not in a panel below. A rate whose base is a click away is a rate that gets
   * quoted without its base (P-52).
   */
  denominator?: string | null;
}) {
  // Separator only, no connective. The value is authored as a self-describing phrase
  // ("persons convicted, against 5,892 cases initiated…"); prepending "against" here would
  // both double the preposition and put the component's words into a research statement.
  const base = denominator ? <span className="denominator-inline">· {denominator}</span> : null;
  // A pending point may hold no figure at all: the period is known to exist and nothing is
  // yet pinned to it. Rendered as an em-dash carrying the pending flag, never as a zero and
  // never as a bare blank that could be mistaken for "not applicable" (rules 3 and 4).
  if (point.value === null) {
    return (
      <span className="figure">
        <span className="t-note">—</span>
        {unit ? <span className="t-note"> {unit}</span> : null}
        <span className="flag-pending">pending</span>
        {base}
      </span>
    );
  }
  const figure = formatValue(point.value);
  if (point.status === 'verified') {
    return (
      <span className="figure">
        {figure}
        {unit ? <span className="t-note"> {unit}</span> : null}
        {base}
      </span>
    );
  }
  if (point.status === 'approx') {
    return (
      <span className="figure status-approx" title="Approximate — from a credible report; primary pull outstanding">
        ≈{figure}
        {unit ? <span className="t-note"> {unit}</span> : null}
        {base}
      </span>
    );
  }
  return (
    <span className="figure">
      {figure}
      {unit ? <span className="t-note"> {unit}</span> : null}
      <span className="flag-pending">pending</span>
      {base}
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

/**
 * What each reason kind says, in the terms a reader needs.
 *
 * These are claims about the responsible body's position, not about the world — "the holder
 * says no record is kept" is what `not-collected` records, and it may be contested.
 */
export const REASON_KIND_LABELS: Record<ReasonKind, string> = {
  'not-collected': 'never collected',
  'not-published': 'collected, not published',
  withheld: 'withheld',
  'never-defined': 'never defined',
};

/**
 * Measurements that do not exist, rendered as findings rather than empty space.
 *
 * The distinction drawn is between a gap in the data and a gap in the world. A blank cell
 * says "not reported this period"; this says nothing measures the thing at all, which is a
 * finding about the record and often the most important thing on the page. PMAY-G is the
 * plainest case — sanctioned and completed are published, occupancy is not, and a reader
 * shown only the first two would reasonably take completion for the end of the chain.
 *
 * Deliberately unlike every panel that carries findings: dashed and unfilled, no figure, no
 * table (CLAUDE.md rule 4a). An absence that looks like a result is worse than one left out,
 * because it invites a reader to treat the frame as the content.
 *
 * Reads from the record's own `unmeasured` field as of phase 4d, so a declaration travels
 * with the record into every view instead of depending on a component to supply it.
 *
 * One block regardless of how many declarations a record carries. Two absences on
 * ujjwala-refills — no health-outcome study, and no refill data after Dec 2018 — are two
 * facts about one series, and framing each separately would read as two unrelated warnings
 * and double the furniture around the same amount of prose.
 */
export function Absences({
  items,
  heading = 'Not measured',
}: {
  items: Unmeasured[] | undefined;
  heading?: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className="absence">
      <span className="label">
        {heading}
        {items.length > 1 ? ` · ${items.length} declared` : ''}
      </span>
      <ul className="absence-list">
        {items.map((u) => (
          <li key={u.what} className={u.reasonDisputed ? 'absence-disputed' : undefined}>
            {/* The kind is shown on every entry rather than grouping the list by it. With one
                to three absences on a record, grouping adds a level of hierarchy to sort two
                items; the label carries the same information without it. The /unmeasured page
                groups by kind, which is where the taxonomy actually pays. */}
            {u.reasonKind ? (
              <span className="absence-kind">
                {REASON_KIND_LABELS[u.reasonKind]}
                {u.reasonDisputed ? ' — stated reason disputed' : ''}
              </span>
            ) : null}
            <p>
              No public measurement exists for <strong>{u.what}</strong>. {u.why}
            </p>
            {u.wouldFill ? (
              <p className="absence-fill">
                <span className="label">Would close it</span> {u.wouldFill}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A record whose two sides are not weighing the same numbers.
 *
 * Distinct from an ordinary contested assessment, where both sides accept the same figures
 * and disagree about what they mean. Here each side's case rests on a different quantity, and
 * both can be arithmetically correct at once: the PMLA record is 15 convictions against 5,892
 * cases initiated, or 93% of trials concluded, from the same Parliamentary replies.
 *
 * Styled in the dashed-umber family used for denominator breaks, NOT in red. Red is reserved
 * for deaths, alerts and break-seams; a basis mismatch is none of those and must not read as
 * an alarm. The umber says the same thing here as it does on a restated denominator: the two
 * figures either side are divided by different things.
 *
 * The label avoids "counting" on purpose. It fits the conviction-rate and shutdown cases and
 * not electoral bonds, where nobody is counting — one side's strongest fact is cash
 * displacement, the other's are the RBI and ECI objections on record before notification.
 */
export function DifferentFactsMark({
  note,
  variant = 'block',
}: {
  note?: string;
  variant?: 'inline' | 'block';
}) {
  if (variant === 'inline') {
    return <span className="different-facts-inline">Each side rests on different facts</span>;
  }
  return (
    <div className="different-facts">
      <span className="label">Each side rests on different facts</span>
      {note ? <p>{note}</p> : null}
    </div>
  );
}
