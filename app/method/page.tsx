import Link from 'next/link';
import type { Metadata } from 'next';
import { citations, provenance, series, statusCounts, tierCounts } from '@/lib/data';
import { TIER_LABELS } from '@/lib/format';
import { TIERS } from '@/lib/types';
import { StatusKey } from '@/components/marks';

export const metadata: Metadata = { title: 'Method' };

export default function MethodPage() {
  const status = statusCounts(series);
  const unbridged = provenance.filter((p) => !p.bridgeExists);
  // Counted through the one accessor that resolves the tier asymmetry. Never tallied by hand
  // here — see the note beside `citations()` in lib/data.ts for what hand-tallying cost.
  const cites = citations();
  const tiers = tierCounts(cites);
  const nonT1 = cites.length - tiers.T1;
  const seriesCites = cites.filter((c) => c.layer === 'series');
  const seriesTierT1 = seriesCites.filter((c) => c.tier === 'T1').length;
  const LAYERS = ['ledger', 'provenance', 'series'] as const;

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
        <strong>Sources are primary where possible but not exclusively governmental.</strong> Of{' '}
        {cites.length.toLocaleString()} citations, {tiers.T1.toLocaleString()} are graded T1 —
        Indian official statistical or institutional documents retrieved directly. The remaining{' '}
        {nonT1.toLocaleString()} are {tiers.T1F}{' '}
        primaries issued by a national government other than India&rsquo;s, {tiers.T2} multilateral or international statistical sources,{' '}
        {tiers.T3} peer-reviewed or working-paper studies, {tiers.T4} pieces of documentary
        journalism, NGO datasets and figures known only at second hand, and {tiers.T5} contested
        composite indices, each of which carries its own dispute record. The non-governmental
        sources are used chiefly where the state does not measure the thing at all or where its own
        account is contested, and several records depend on them for exactly that reason. Every
        citation is graded on the document actually retrieved, never on the institution the subject
        belongs to.
      </p>
      <p className="prose-note">
        These figures are counted from the data at build time and are not typed here. They were
        typed here once: this paragraph read <em>&ldquo;752 are graded T1&rdquo;</em> until 6 August
        2026, and said the rest were journalism and NGO datasets. That was wrong by{' '}
        {tiers.T1 - 752}, because the count read the tier held inside each ledger and provenance
        citation and missed the {seriesCites.length} series, which hold it on the record instead —
        so {seriesTierT1} official statistical sources were described as journalism. The corrected
        wording is above and the count now comes from one accessor that reads both places.
      </p>
      <p>
        <strong>
          Where a record says a measure worked, ask who measured it — and on most of these records
          the answer is one arm of government measuring another.
        </strong>{' '}
        Of the nine records currently scored <em>worked</em>, three rest on the announcing
        department&rsquo;s own account of its own performance and nothing else. Five rest on a
        different institution of the same state: the Reserve Bank on the Ministry of Finance, the
        Central Electricity Authority on the renewable-energy ministry, a later Finance Commission
        on an earlier one. One rests on a source outside the Indian state, and it is a single
        trade-press note. From 6 August 2026 the standard is that no record stands on a source that
        is not credibly independent of what it establishes, and intra-state evidence meets it only
        where the measuring institution published the figure as part of its own statutory or routine
        function — a Comptroller and Auditor General audit does, a joint ministry-and-regulator
        press release does not, whoever computed the number in it. That is better than a department
        scoring itself. It is not the same thing as independent evidence, and this page would rather
        say so than let the distinction sit unstated.
      </p>
      <p className="prose-note">
        <strong>T1F is new and empty.</strong> The tier for primaries issued by a foreign national
        government was created on 6 August 2026, because T1 means Indian official and T2 means
        multilateral and a US executive order or Federal Register notice is neither — so such
        citations had been sitting in T1 by default. None has been moved yet, which is why the
        count below reads {tiers.T1F}. Re-tiering a citation can move the verdict that rests on
        it, so the whole set moves in one pass rather than piecemeal; the T1 figure above is what
        the data currently says, not what it will say once that pass runs.
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
        claim rather than being stated once at the top of a page. The count is broken out by layer
        because the corpus asserts a tier in two structurally different places — inside each
        citation on a ledger or provenance record, and on the record itself for a series — and a
        total that showed only one of them is what this page got wrong.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>What it is</th>
              <th className="num">Ledger</th>
              <th className="num">Provenance</th>
              <th className="num">Series</th>
              <th className="num">All</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map((t) => (
              <tr key={t}>
                <td className="mono">{t}</td>
                <td className="t-note">{TIER_LABELS[t]}</td>
                {LAYERS.map((layer) => (
                  <td key={layer} className="num">
                    {cites.filter((c) => c.layer === layer && c.tier === t).length}
                  </td>
                ))}
                <td className="num">{tiers[t]}</td>
              </tr>
            ))}
            <tr>
              <td className="mono">all</td>
              <td className="t-note">Every graded citation in the corpus</td>
              {LAYERS.map((layer) => (
                <td key={layer} className="num">
                  {cites.filter((c) => c.layer === layer).length}
                </td>
              ))}
              <td className="num">{cites.length}</td>
            </tr>
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
