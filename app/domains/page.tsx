import Link from 'next/link';
import type { Metadata } from 'next';
import { ledger, provenance, series } from '@/lib/data';
import { DOMAIN_LABELS } from '@/lib/format';
import { DOMAINS } from '@/lib/types';

export const metadata: Metadata = { title: 'Domains' };

export default function DomainsIndex() {
  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / domains
      </p>
      <h1>Domains</h1>
      <p className="lede">
        The fourteen domains are fixed by the schemas. An empty domain is an unopened one — a
        blank here means unreported, not zero.
      </p>
      <div className="grid">
        {DOMAINS.map((d) => {
          const s = series.filter((x) => x.domain === d);
          const l = ledger.filter((x) => x.domains.includes(d));
          const p = provenance.filter(
            (x) => x.affectsDomains.includes(d) || x.affectsDomains.includes('all'),
          );
          return (
            <Link key={d} href={`/domains/${d}/`}>
              <span className="label">{d}</span>
              <span className="grid-title">{DOMAIN_LABELS[d]}</span>
              <span className="grid-meta">
                {s.length} series · {l.length} ledger · {p.length} disputes
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
