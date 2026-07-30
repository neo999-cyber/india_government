import Link from 'next/link';
import type { Metadata } from 'next';
import { provenance } from '@/lib/data';
import { DOMAIN_LABELS } from '@/lib/format';

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

      <div className="table-wrap">
        <table>
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
              <tr key={p.id}>
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
                <td className="t-note">{p.directionOfBias}</td>
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
