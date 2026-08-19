'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_NAV, navLabel } from '@/lib/routes';
import { CommandPalette } from '@/components/CommandPalette';

const SECTION_PREFIXES: Partial<Record<(typeof PRIMARY_NAV)[number], readonly string[]>> = {
  '/overview/': ['/domains/', '/years/', '/lenses/', '/terms/', '/peers/'],
  '/search/': ['/series/', '/ledger/', '/provenance/', '/contested/', '/exposure/'],
  '/method/': ['/derivations/', '/publishers/', '/corrections/', '/counterfactual/', '/data/', '/directory/'],
};

export function PrimaryNav() {
  const here = usePathname();
  return (
    <nav className="nav nav-primary" aria-label="Main">
      {PRIMARY_NAV.map((href) => {
        const current =
          here === href.slice(0, -1) ||
          here === href ||
          here.startsWith(href) ||
          Boolean(SECTION_PREFIXES[href]?.some((prefix) => here.startsWith(prefix)));
        return (
          <Link
            key={href}
            href={href}
            aria-current={current ? 'page' : undefined}
            className={current ? 'is-here' : undefined}
          >
            {navLabel(href)}
          </Link>
        );
      })}
      <CommandPalette />
    </nav>
  );
}
