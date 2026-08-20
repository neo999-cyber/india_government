import Link from 'next/link';
import { siteSection, type SectionKey } from '@/lib/routes';

/** A compact gateway on section landing pages. It links existing views; it never duplicates data. */
export function SectionNav({ section: key }: { section: SectionKey }) {
  const section = siteSection(key);
  const items = section.items.filter((item) => item.landing !== false);

  return (
    <nav className="section-nav" aria-label={`${section.label} sections`}>
      <div className="section-nav-head">
        <span className="label">In this section</span>
        <p>{section.description}</p>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link prefetch={false} href={item.href}>
              <strong>{item.label}</strong>
              <span>{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
