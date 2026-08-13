'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

/**
 * THE MASTHEAD NAV, EXTRACTED SO IT CAN MARK WHERE THE READER IS.
 *
 * ============================ WHY THIS IS A CLIENT COMPONENT AND THE LAYOUT IS NOT ============
 *
 * An external audit: *"the primary/global navigation does not mark the current page. Topic tabs do,
 * but the masthead does not, so I lose location when moving between similarly named index
 * surfaces."* Confirmed — `aria-current` appeared **zero times** in the layout.
 *
 * Marking it needs the current path, and a root layout in a static export cannot read one: Next
 * gives `usePathname` to client components only. So the five links become a client island and
 * everything else in the masthead stays server-rendered.
 *
 * **WHAT THAT COSTS, STATED RATHER THAN GLOSSED: a reader whose script never runs gets no
 * `aria-current`.** The links still render, still work and still read correctly — the marking is an
 * enhancement on top of a page that is complete without it, which is the same bargain the rest of
 * the site makes. It is not the same bargain as the `All pages` panel, which is deliberately
 * script-free because it is a *destination list* and losing it would lose reach; losing a location
 * marker loses orientation, not access.
 *
 * ============================ LABELS COME FROM THE REGISTRY ===================================
 *
 * `lib/routes.ts`, not from a literal here. The whole reason that file exists is that four surfaces
 * each held their own copy of a destination's name and three of them went stale.
 */

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
    </nav>
  );
}
