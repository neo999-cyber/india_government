import Link from 'next/link';
import type { Metadata } from 'next';
import { provenance } from '@/lib/data';
import { DOMAIN_LABELS, DIRECTION_OF_BIAS_LABELS } from '@/lib/format';
import { ListingFacets } from '@/components/ListingFacets';

/** See the same helper on the ledger index for why options come from the data, not the enum. */
function opts<T extends string>(values: T[], label: (v: T) => string) {
  return [...new Set(values)].sort().map((v) => ({ value: v, label: label(v) }));
}

export const metadata: Metadata = { title: 'Provenance' };

export default function ProvenanceIndex() {
  const unbridged = provenance.filter((p) => !p.bridgeExists).length;

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / provenance
      </p>
      <h1>Measurement disputes</h1>
      <p className="lede">
        {provenance.length} records, {unbridged} of them with no accepted reconciliation across
        the break. These are first-class citizens of the instrument: where a dispute exists, it
        travels with every number it touches rather than sitting in a footnote.
      </p>

      <ListingFacets
        target="provenance-table"
        noun="disputes"
        facets={[
          { key: 'domain', label: 'Area', options: opts(provenance.flatMap((p) => p.affectsDomains), (d) => (d === 'all' ? 'all domains' : DOMAIN_LABELS[d])) },
          { key: 'bias', label: 'Direction of bias', options: opts(provenance.map((p) => p.directionOfBias), (b) => DIRECTION_OF_BIAS_LABELS[b] ?? b) },
          { key: 'bridge', label: 'Bridge', options: [
            { value: 'yes', label: 'a reconciliation exists' },
            { value: 'no', label: 'none across the break' },
          ] },
        ]}
      />

      <div className="table-wrap">
        <table id="provenance-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Dispute</th>
              <th>When</th>
              <th>Domains</th>
              <th>Direction of bias</th>
              <th>Bridge</th>
              <th className="num">Accounts</th>
            </tr>
          </thead>
          <tbody>
            {provenance.map((p) => (
              <tr
                key={p.id}
                data-row
                data-f-domain={p.affectsDomains.join('|')}
                data-f-bias={p.directionOfBias}
                data-f-bridge={p.bridgeExists ? 'yes' : 'no'}
                data-text={`${p.id} ${p.title} ${p.whatChanged}`}
              >
                <td className="mono">
                  <Link href={`/provenance/${p.id}/`}>{p.id}</Link>
                </td>
                <td>
                  <Link href={`/provenance/${p.id}/`}>{p.title}</Link>
                </td>
                <td className="mono t-note">{p.when}</td>
                <td className="t-note">
                  {p.affectsDomains
                    .map((d) => (d === 'all' ? 'all domains' : DOMAIN_LABELS[d]))
                    .join(', ')}
                </td>
                <td className="t-note">{DIRECTION_OF_BIAS_LABELS[p.directionOfBias] ?? p.directionOfBias}</td>
                <td className="mono">
                  {p.bridgeExists ? (
                    'exists'
                  ) : (
                    <span style={{ color: 'var(--alert)' }}>none</span>
                  )}
                </td>
                <td className="num">{p.competingAccounts?.length ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
