import Link from 'next/link';
import type { Metadata } from 'next';
import { citations, ledger, provenance, series, statusCounts, tierCounts } from '@/lib/data';
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
  // Counted, never typed. This number fell from 9 to 1 on 6 August 2026 and the paragraph that
  // reports it must move with the data, not with whoever last edited the prose.
  const worked = ledger.filter((r) => r.assessment === 'worked').length;
  // Counted here for the same reason as `worked`: the paragraph below turns on these and a typed
  // figure is what this page got wrong once already. `reform` share against the evaluative rate is
  // the whole of the argument that a thin domain is a domain with few announced measures.
  const EVALUATIVE = new Set(['worked', 'partly', 'failed', 'reversed']);
  const evaluative = ledger.filter((r) => EVALUATIVE.has(r.assessment)).length;
  const inDomain = (d: string) => ledger.filter((r) => r.domains.includes(d as never));
  const rate = (rows: typeof ledger, f: (r: (typeof ledger)[number]) => boolean) =>
    rows.length === 0 ? 0 : Math.round((100 * rows.filter(f).length) / rows.length);
  const reformShare = (d: string) => rate(inDomain(d), (r) => r.type === 'reform');
  const evalShare = (d: string) => rate(inDomain(d), (r) => EVALUATIVE.has(r.assessment));
  const exposureShare = (d: string) => rate(inDomain(d), (r) => (r.shockExposure ?? []).length > 0);
  const contested = ledger.filter((r) => r.assessment === 'contested');
  const withGround = contested.filter((r) => r.contestedGround);
  const UNSETTLEABLE = new Set(['criterion', 'measure', 'evidence-unobservable']);
  const unsettleable = withGround.filter((r) => UNSETTLEABLE.has(r.contestedGround!)).length;

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
        Until 6 August 2026 nine records said a measure worked. Three rested on the announcing
        department&rsquo;s own account of its own performance and nothing else; five rested on a
        different institution of the same state; one rested on a source outside the Indian state,
        and it was a single trade-press note. On that date the standard became that no record
        stands on a source that is not credibly independent of what it establishes, and that where
        a commitment states several objectives and any one is unmeasured, <em>worked</em> is
        unavailable. Intra-state evidence meets the first test only where the measuring institution
        published the figure as part of its own statutory or routine function — a Comptroller and
        Auditor General audit does, a joint ministry-and-regulator press release does not, whoever
        computed the number in it.{' '}
        <strong>
          {worked === 1 ? 'One record now says' : `${worked} records now say`} a measure worked.
        </strong>{' '}
        The rest moved to <em>partly</em> or <em>contested</em> — not to <em>failed</em>, because an
        outcome nobody independent measured is unestablished rather than negative. One arm of
        government measuring another is better than a department scoring itself, and it is not the
        same thing as independent evidence; this page would rather say so than let the distinction
        sit unstated.
      </p>
      <p>
        <strong>
          Why {worked === 1 ? 'one' : worked} of {ledger.length} is not a finding about the
          government.
        </strong>{' '}
        The count of records saying <em>worked</em> measures two things at once: how often a policy
        achieved what was promised, and how often anybody independent of the promising body checked.
        <strong> This instrument cannot separate them, and it should not pretend to.</strong> Where
        the Indian state is the only body that measures a thing — which, on most of these subjects,
        it is — raising the evidence standard necessarily lowers the count of established successes,
        whatever the policies actually did. So read the tally as a statement about how much of
        Indian policy is independently measured. Read it as a statement about Indian policy only
        where you can also see the independent evidence cited on the record. Where a record says{' '}
        <em>partly</em> or <em>contested</em> because the outcome is unestablished, it says so in
        those words and names what would settle it — those notes are the useful part, and the tally
        is not.
      </p>
      <p className="prose-note">
        <strong>The tier figures above moved on 6 August 2026, and by a lot.</strong> T1F is new:
        primaries issued by a foreign national government had been sitting in T1 by default,
        because T1 means Indian official and T2 means multilateral and a US executive order is
        neither. {tiers.T1F} citations moved into it. In the same pass, journalism and relayed
        accounts that had been tagged T1 moved to T4, and UN and World Bank sources tagged T1 moved
        to T2. Archived copies of Indian official documents did <em>not</em> move: identical bytes
        are the document, and of 17 archived primaries tested only 2 still answered at their
        original host. <strong>T1 fell from 965 to {tiers.T1.toLocaleString()}.</strong> Every
        figure on this page is counted from the data at build time, so none of that had to be
        retyped here — which is the point, and the reason the last such correction was caught.
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

      <h2>What the verdict distribution measures, and what it does not</h2>
      <p className="prose-note">
        {evaluative} of {ledger.length} records carry a verdict that scores an outcome —{' '}
        <em>worked</em>, <em>partly</em>, <em>failed</em> or <em>reversed</em>. The rest find
        something real and have nothing to score it against, or decline between readings.{' '}
        <strong>A domain with few scored verdicts has not been examined less; it contains fewer
        announced measures.</strong> Kashmir is {reformShare('kashmir')} per cent measures the state
        deliberately introduced and {evalShare('kashmir')} per cent scored; defence is{' '}
        {reformShare('defence')} and {evalShare('defence')}; governance {reformShare('governance')}{' '}
        and {evalShare('governance')}. Against them infrastructure is {reformShare('infrastructure')}{' '}
        and {evalShare('infrastructure')}, welfare {reformShare('welfare')} and{' '}
        {evalShare('welfare')}. <strong>The two track each other across every domain</strong>, which
        is what you would expect if a scored verdict requires something to have been promised.
      </p>
      <p className="prose-note">
        The exception is the interesting part, and it runs the other way.{' '}
        <Link href="/exposure/">Exposure to an exogenous event</Link> tracks something different:
        whether a domain has series long enough for a shock to distort. Employment is{' '}
        {reformShare('employment')} per cent measures and {evalShare('employment')} per cent scored,
        and {exposureShare('employment')} per cent of its records declare an exposure; human
        development is {reformShare('human-development')} and {evalShare('human-development')}{' '}
        against {exposureShare('human-development')}.{' '}
        <strong>Those are outcome domains — much to measure and little announced</strong> — and they
        are where the two questions this instrument asks come apart.
      </p>
      <p className="prose-note">
        The same applies to the largest class. {contested.length} records are{' '}
        <em>contested</em>, and {unsettleable} of the {withGround.length} that state a ground turn on
        something <strong>no document could settle</strong>: the facts are agreed and the dispute is
        which frame governs, or several valid published measures point opposite ways.{' '}
        <Link href="/contested/">Which kind each contest is</Link> is the difference between a hedge
        and a finding.
      </p>

      <h2>What changed on 6 August 2026, beyond the tiers</h2>
      <p className="prose-note">
        Nine rulings landed that day and four are described above — the independence standard, the
        intra-state test, the unmeasured-limb rule and the foreign-primary tier.{' '}
        <strong>The other five change what a verdict on this site means, and they are recorded here
        because a reader has no other way to know them.</strong>
      </p>
      <ul>
        <li className="prose-note">
          <strong>An objective may be imposed as well as announced.</strong> A duty in a statute, a
          constitutional provision or a court direction is a legitimate thing to score against, if
          the record names the instrument and the duty. Four records score <em>failed</em> against
          one — a vacancy ceiling in the Right to Education Act, a staffing norm with a 2013
          deadline, a constitutional &ldquo;shall establish&rdquo; unhonoured for ten years — and
          they are not measured against anything the government said.
        </li>
        <li className="prose-note">
          <strong>A shock is what the state did not choose.</strong> A chain of state decisions is
          not a shock however severe its consequences, and a record is typed by what it is about
          rather than by what failed. Three records were retyped: the Indus Waters Treaty abeyance
          is a decision, the 2020 migrant exodus is the consequence of one, and the IL&amp;FS
          collapse is a private failure the state then responded to.
        </li>
        <li className="prose-note">
          <strong>Where a verdict rests on fewer objectives than were announced, the record says
          which.</strong> Forty-three records announce more than one thing; a failure verdict resting
          on two of four is sound, and a reader is entitled to know it is two of four. This is a
          disclosure requirement and it restricts only <em>worked</em>.
        </li>
        <li className="prose-note">
          <strong>A counterfactual engine was considered and declined</strong>, with the reasoning
          published at <Link href="/counterfactual/">counterfactual</Link> rather than left as an
          apparent gap.
        </li>
        <li className="prose-note">
          <strong>A structured value never moves alone.</strong> When a verdict or a type changes,
          the prose restating it is corrected in the same operation — a rule and not a check, because
          the words that carry those values are ordinary English and no scanner can find them.
        </li>
      </ul>

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
