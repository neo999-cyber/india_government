import Link from 'next/link';
import { series } from '@/lib/data';

/**
 * THIS PAGE USED TO DESCRIBE A VIEW IN THE FUTURE TENSE. The view was declined on 2026-08-06 and the
 * page said so nowhere — the prose-shadow defect on a surface rather than in a record: a decision
 * moved and the thing that restated it did not.
 *
 * Rewritten rather than deleted, for the same reason the decision was recorded rather than left as a
 * gap — so a later cycle does not rediscover a counterfactual engine as an obvious omission and
 * build it.
 */
export function CounterfactualSection() {
  const withBreaks = series.filter((s) => (s.breaks?.length ?? 0) > 0);
  const approx = series.reduce(
    (n, s) => n + (s.points ?? []).filter((p) => p.status === 'approx').length,
    0,
  );

  return (
    <>
      <h2 id="counterfactual">Counterfactual — considered, and declined</h2>
      <p className="lede">
        This instrument does not compute counterfactuals. That is a decision taken on 6 August 2026,
        not a gap waiting to be filled, and the reasoning is set out here so it can be argued with
        rather than rediscovered.
      </p>

      <h2>What was proposed</h2>
      <p className="prose-note">
        Two methods, run side by side and never combined. <strong>Method A</strong> fits the pre-2014
        trend and extends it, with the fit&rsquo;s acute sensitivity to the start year — 2004 in the
        early boom, 2007 at the pre-crisis peak, 2009 in the post-crisis trough — rendered alongside
        the result rather than suppressed. <strong>Method B</strong> indexes India and the peer panel
        to 2014 = 100 and reads the divergence, substituting a global-conditions control for a trend
        assumption at the cost of assuming the peers are comparable.
      </p>

      <h2>Why it was declined</h2>
      <p className="prose-note">
        <strong>Because the output would resemble measurement without being it.</strong> A hatched
        band on a chart is still a line on a chart, and a reader who arrives at one has been given a
        number for something nobody observed. The whole of the 6 August work removed things with that
        shape from this corpus — three records left the scored ledger the same day because a
        derivation over the instrument&rsquo;s own data is at no distance from what it reports, and
        their findings moved to <Link href="/method/#derivations">derivations</Link>, where the rule is
        printed beside every number.
      </p>
      <p className="prose-note">
        <strong>Because the check it needs cannot be obtained.</strong> The method was specified with
        a condition: a statistical review, by someone who did not write it, of the method as built.
        This project has never been able to commission the independent review it has promised since
        before phase 15 — as <Link href="/method/">the method page</Link> states in its own terms, no
        part of this has been checked by anyone who did not write it.{' '}
        <strong>Building a method whose required check cannot be obtained is building an unchecked
        method</strong>, and the counterfactual is the one part of this instrument where an unchecked
        method would produce numbers rather than prose.
      </p>
      <p className="prose-note">
        <strong>And because, applied honestly to Indian data of this quality, the answer is usually
        that the two methods disagree and the fit is endpoint-sensitive.</strong> That is a true
        statement, and the corpus can make it in words on the records where it matters without an
        engine to produce it.
      </p>

      <h2>What did not survive, and what did</h2>
      <p className="prose-note">
        <strong>A ruling travelled with the decision:</strong> model output may not be cited by a
        scored record. A counterfactual is method, not evidence — if nothing outside this corpus would
        have to change for a finding to change, it is method — so a record may reason about one in
        prose and say that it is one, and may not rest on it.
      </p>
      <p className="prose-note">
        <strong>What survived is the rendering discipline, and it governs quantities the corpus
        already carries.</strong> Modelled, imputed, projected and estimated figures are here now:{' '}
        {approx.toLocaleString('en-IN')} observations carry the <em>approx</em> status and render with
        a dotted rule and a &ldquo;≈&rdquo;, and a keyword scan of every series title, note, caveat and
        point note finds 43 of {series.length} series mentioning a modelled or estimated quantity — a
        candidate count rather than a finding, stated with its scope because a count whose scope is
        unstated is wrong by an amount nobody can see.
      </p>
      <ul>
        <li className="prose-note">
          <strong>A modelled quantity never renders as a solid line, and a band never renders as a
          point.</strong>
        </li>
        <li className="prose-note">
          <strong>No trend is fitted through a series break, ever.</strong> {withBreaks.length}{' '}
          loaded series carry one; on those, each segment stands alone or is not fitted at all.
        </li>
        <li className="prose-note">
          <strong>The two GDP bases are never spliced into one path.</strong> Both render, with the
          seam, and neither is picked.
        </li>
        <li className="prose-note">
          <strong>No composite score of any kind, ever.</strong> Not of the two methods, not of a
          domain, not of a term, not of the government. This is the most requested thing a reader
          could want from an instrument like this, and the refusal is the product.
        </li>
      </ul>

      <div className="stub">
        <span className="label">Status</span>
        Declined 6 August 2026 on the operator&rsquo;s ruling, with the reasoning recorded in the
        repository so a later cycle does not read the absence as an oversight. What would reopen it:
        an independent statistical review this project can actually commission. Nothing else about the
        decision is contingent.
      </div>
    </>
  );
}
