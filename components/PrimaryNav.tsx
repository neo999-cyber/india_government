'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_NAV, navLabel, sectionForPath } from '@/lib/routes';
import { CommandPalette } from '@/components/CommandPalette';

export function PrimaryNav() {
  const here = usePathname();
  const currentSection = sectionForPath(here);
  return (
    <nav className="nav nav-primary" aria-label="Main">
      {PRIMARY_NAV.map((href) => {
        const current = currentSection?.href === href;
        return (
          <Link
            key={href}
            href={href}
            prefetch={false}
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
