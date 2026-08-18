'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { CommandPalette } from '@/components/CommandPalette';

const PRIMARY = ['/overview/', '/questions/', '/stories/', '/search/'];

export function PrimaryNav() {
  const here = usePathname();
  return (
    <nav className="nav nav-primary" aria-label="Main">
      {PRIMARY.map((href) => {
        // Exact match only. `/domains/macro/` is a topic page, not the topics index, and marking the
        // index as current there would tell a reader they are somewhere they are not.
        const current = here === href || `${here}/` === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={current ? 'page' : undefined}
            className={current ? 'is-here' : undefined}
          >
            {ROUTES[href].label}
          </Link>
        );
      })}
      <CommandPalette />
    </nav>
  );
}
