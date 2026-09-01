'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_NAV, SITE_SECTIONS, navLabel, sectionForPath } from '@/lib/routes';
import { CommandPalette } from '@/components/CommandPalette';

/**
 * THE MASTHEAD, WITH EACH SECTION'S OWN PAGES UNDER IT.
 *
 * ============================ IT IS CSS, NOT SCRIPT, AND THAT IS THE POINT ===================
 *
 * The whole site works with the bundle dead, and navigation is the last thing that should stop
 * working when it does. So the menus are `:hover` and `:focus-within` on a container the section
 * link already sits in — no state, no listeners, no `aria-expanded` to keep truthful.
 *
 * **`visibility` rather than `display`, deliberately.** `display: none` takes the items out of the
 * tab order, so `:focus-within` can never fire: there is nothing inside to focus. With visibility
 * the sequence works — focus lands on the SECTION LINK first, that makes the menu visible, and the
 * next Tab reaches the items.
 *
 * ============================ AND HOVER IS GATED TO POINTERS THAT HAVE IT ====================
 *
 * `:hover` sticks after a tap on a touchscreen, so a menu opened by hover alone would stay open
 * over the page a reader had just navigated to. The hover rule sits behind `(hover: hover)`; on
 * touch the section link goes to the section page, which lists the same children.
 *
 * The order is `PRIMARY_NAV`'s, not `SITE_SECTIONS`', because that is the order the IA test
 * asserts and the one a reader has learned.
 */
export function PrimaryNav() {
  const here = usePathname();
  const currentSection = sectionForPath(here);
  return (
    <nav className="nav nav-primary" aria-label="Main">
      {PRIMARY_NAV.map((href) => {
        const current = currentSection?.href === href;
        const section = SITE_SECTIONS.find((s) => s.href === href);
        const label = navLabel(href);
        return (
          <span key={href} className="pnav-sec">
            <Link
              href={href}
              prefetch={false}
              aria-current={current ? 'page' : undefined}
              className={current ? 'is-here' : undefined}
            >
              {label}
            </Link>
            {section && section.items.length ? (
              <span className="pnav-menu">
                <ul aria-label={`${label} pages`}>
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} prefetch={false}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </span>
            ) : null}
          </span>
        );
      })}
      <CommandPalette />
    </nav>
  );
}
