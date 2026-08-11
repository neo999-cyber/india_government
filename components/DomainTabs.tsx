import Link from 'next/link';
import type { Domain } from '@/lib/types';

/**
 * THE TOPIC TAB STRIP — §5, and the same five on every area so a reader learns the shape once.
 *
 * ============================ IT IS NAVIGATION, NOT A LISTING =================================
 *
 * **A tab strip is a new container shape and this one carries no record link**, which is why it is
 * not added to `listing-shapes.mjs`. Seven shapes have walked past `listing-marks` and the last
 * removed 619 records from its scope while the gate reported OK — so the question was asked
 * explicitly here rather than assumed: the strip links to five ROUTES, names no record, and
 * therefore lists nothing. `unrecognised-rows` is the check that would catch it if that ever
 * changed, because a record link with a title in an unrecognised container is exactly what it
 * reports.
 *
 * ============================ WHY A COUNT IS SHOWN AND WHAT IT IS NOT =========================
 *
 * Each tab carries the number of things behind it, so a reader can see an empty tab without opening
 * it. **It is a count of what this area holds, not a score and not a ranking** — the areas are in
 * schema order everywhere they are listed together, and nothing here compares one tab to another.
 */
export function DomainTabs({
  d,
  active,
  counts,
}: {
  d: Domain;
  active: string;
  counts: { indicators: number; records: number; disputes: number; missing: number };
}) {
  const tabs = [
    { key: 'overview', label: 'Overview', href: `/domains/${d}/`, n: null as number | null },
    { key: 'indicators', label: 'Indicators', href: `/domains/${d}/indicators/`, n: counts.indicators },
    { key: 'records', label: 'Government records', href: `/domains/${d}/records/`, n: counts.records },
    { key: 'disputes', label: 'Disputes', href: `/domains/${d}/disputes/`, n: counts.disputes },
    { key: 'missing', label: 'Missing data', href: `/domains/${d}/missing/`, n: counts.missing },
  ];
  return (
    <nav className="dtabs" aria-label="Sections of this area">
      {tabs.map((t) =>
        t.key === active ? (
          <span key={t.key} className="dtab is-on" aria-current="page">
            {t.label}
            {t.n !== null ? <span className="dtab-n mono">{t.n}</span> : null}
          </span>
        ) : (
          <Link key={t.key} className="dtab" href={t.href}>
            {t.label}
            {t.n !== null ? <span className="dtab-n mono">{t.n}</span> : null}
          </Link>
        ),
      )}
    </nav>
  );
}
