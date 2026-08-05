import Link from 'next/link';
import type { Metadata } from 'next';
import { provenance, series, statusCounts } from '@/lib/data';
import { TIER_LABELS } from '@/lib/format';
import { TIERS } from '@/lib/types';
import { StatusKey } from '@/components/marks';

export const metadata: Metadata = { title: 'Method' };

export default function MethodPage() {
  const status = statusCounts(series);
  const unbridged = provenance.filter((p) => !p.bridgeExists);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / method
      </p>
      <h1>Method, tiers and what the marks mean</h1>

      <h2 id="limits">What this is, who made it, and what has not been done to it</h2>
      <p>
        This is a longitudinal record of commitments made by the Government of India and what
        became of them, measured against a baseline frozen at May 2014. Each ledger record states
        what was claimed, what happened, and the strongest case on each side; series carry the
        figures; provenance records carry the definitional breaks, reporting-base shifts and
        disagreements between sources that make a figure mean less than it appears to. Absences are
        recorded as findings rather than left as blank cells.
      </p>
      <p>
        <strong>It is the work of one author, written with an AI assistant.</strong> That is not
        incidental and should bear on how it is read: the prose, the retrieval and the scoring were
        produced by that pairing, and the same pairing checked them. The gates in this repository
        enforce internal consistency, not correctness.
      </p>
      <p>
        <strong>Sources are primary where possible but not exclusively governmental.</strong> Of
        1,205 citations, 752 are graded T1 — Indian official statistical or institutional documents
        retrieved directly. The rest are multilateral statistics, peer-reviewed research,
        documentary journalism and NGO datasets, used chiefly where the state does not measure the
        thing at all or where its own account is contested. Every citation is graded on the
        document actually retrieved, never on the institution the subject belongs to.
      </p>
      <p>
        <strong>The planned independent review has not been run.</strong> Three passes were
        specified and none has happened: an adversarial pass by a model with no history of this
        project, prompted to attack rather than confirm; a domain economist per contested domain,
        for methodology that depends on Indian statistical practice; and an Indian media lawyer for
        the enforcement, electoral-bonds and press-freedom records specifically. Until those run,
        <strong> no part of this has been checked by anyone who did not write it.</strong> Records
        marked <em>contested</em> decline to choose between readings by design; that is a statement
        about the evidence, not a hedge.
      </p>

      <h2>Status of a figure</h2>
      <StatusKey />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Meaning</th>
              <th className="num">Observations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="mono">verified</td>
              <td className="t-note">
                Pinned to the named source in a logged cycle, with URL. Report-derived figures do
                not qualify.
              </td>
              <td className="num">{status.verified}</td>
            </tr>
            <tr>
              <td className="mono">approx</td>
              <td className="t-note">
                From a credible report; the exact primary pull is still outstanding. Renders with
                &ldquo;≈&rdquo; and a dotted rule.
              </td>
              <td className="num">{status.approx}</td>
            </tr>
            <tr>
              <td className="mono">pending</td>
              <td className="t-note">
                Placeholder. Never renders without its flag, anywhere.
              </td>
              <td className="num">{status.pending}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Source tiers</h2>
      <p className="prose-note">
        Every rendered number traces to a source name, a URL and a tier. The tier travels with the
        claim rather than being stated once at the top of a page.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>What it is</th>
              <th className="num">Series</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map((t) => (
              <tr key={t}>
                <td className="mono">{t}</td>
                <td className="t-note">{TIER_LABELS[t]}</td>
                <td className="num">{series.filter((s) => s.tier === t).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Breaks and splicing</h2>
      <p className="prose-note">
        A series break is a hard stop. Values either side are not spliced, no value is
        interpolated across one, and no trend is fitted through one. Breaks render as a red seam
        naming the dispute record that explains them.{' '}
        {unbridged.length} of {provenance.length} loaded disputes have no accepted reconciliation
        at all.
      </p>

      <h2>Blanks</h2>
      <p className="prose-note">
        A blank is unreported. It is never rendered as zero, and never filled by inference.
      </p>

      <h2>Roll-ups</h2>
      <p className="prose-note">
        Scorecards roll up to counts of assessments. There is no verdict number for a term, for a
        domain, or for the government — and no composite index of any kind.
      </p>

      <h2>The gate</h2>
      <p className="prose-note">
        <code>npm run validate</code> checks every file in <code>/data</code> against{' '}
        <code>/schemas</code>, then checks cross-reference integrity and the instrument rules that
        schemas cannot express. <code>npm run build</code> runs it first, so an invalid repository
        cannot compile or deploy. <code>npm run validate:selftest</code> proves the gate is closed
        by running it against deliberately broken fixtures.
      </p>
      <p className="prose-note">
        Corrections to <code>/data</code> are made by editing the record and logging the change in{' '}
        <code>docs/verification-log.md</code> — never by silent deletion.
      </p>
    </>
  );
}
