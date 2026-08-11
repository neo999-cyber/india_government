import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DOMAINS } from '@/lib/types';
import type { Domain } from '@/lib/types';
import { DOMAIN_LABELS } from '@/lib/format';
import DomainPageDefault, { DomainSurface, DOMAIN_TABS } from '../page';

/**
 * `/domains/<area>/<tab>/` — the four non-overview tabs, each a real route.
 *
 * **Each tab is a URL, which is what §5 asked for and what a fragment would only have imitated.**
 * A reader can send someone an area's disputes. The overview keeps its own address at
 * `/domains/<area>/` so every existing link — 36,000 hrefs pass through `link-check` — still lands.
 */
const TABS = DOMAIN_TABS.filter((t) => t.key !== 'overview');

export const dynamicParams = false;

export function generateStaticParams() {
  return DOMAINS.flatMap((d) => TABS.map((t) => ({ domain: d, tab: t.key })));
}

type Props = { params: Promise<{ domain: string; tab: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain, tab } = await params;
  const t = TABS.find((x) => x.key === tab);
  const label = DOMAIN_LABELS[domain as Domain] ?? domain;
  return {
    title: t ? `${label} — ${t.label}` : label,
    description: t
      ? `${t.label} for ${label}: one section of this area's record, addressable on its own.`
      : undefined,
  };
}

export default async function DomainTabPage({ params }: Props) {
  const { domain, tab } = await params;
  if (!DOMAINS.includes(domain as Domain)) notFound();
  if (!TABS.some((t) => t.key === tab)) notFound();
  return <DomainSurface d={domain as Domain} tab={tab as (typeof TABS)[number]['key']} />;
}

// Referenced so the default export of the parent route is not tree-shaken out of the graph in a
// way that confuses the route manifest; it is the overview and is reached at its own address.
void DomainPageDefault;
