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
  /**
   * ONE ORIENTATION SENTENCE PER TAB, ADDED 2026-08-13 WITH THE ISOLATION.
   *
   * Until now every tab opened with the OVERVIEW's lead chart and narrative, so no tab needed to
   * say what it was — the reader had just read the topic's introduction again. With the overview
   * body confined to its own tab, a selected tab opens cold, and a table with no sentence in front
   * of it is the other half of the same defect. Each says what it contains and nothing more; none
   * of them ranks, summarises or scores what follows.
   */
  const ORIENT: Record<string, string> = {
    indicators: 'Every indicator series filed under this topic, and those read under it as a lens. The overview tab carries the topic\u2019s charts and narrative.',
    records: 'Every reform, event and episode entered under this topic, with its verdict and its marks. The overview tab carries the topic\u2019s charts and narrative.',
    disputes: 'Measurement disputes bearing on this topic \u2014 where two instruments answer the same question differently, or one changed basis.',
    missing: 'What this topic declares it cannot measure, in the record\u2019s own words. An absence here is a fact about the record, not an estimate of anything.',
  };

  return (
    <>
    <nav className="dtabs" aria-label="Sections of this topic">
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
    {ORIENT[active] ? <p className="dtab-orient prose-note">{ORIENT[active]}</p> : null}
    </>
  );
}
