import Link from 'next/link';
import type { Metadata } from 'next';
import { publisherRollups } from '@/lib/publishers';
import { TierTag } from '@/components/marks';
import type { Tier } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Who published it',
  description:
    'The bodies behind the citations, resolved across renames and abbreviations — with the carrier ' +
    'kept separate from the body, because the independence test turns on which is which.',
};

/**
 * `/publishers/` — THE BODIES BEHIND THE CITATIONS.
 *
 * WHY THIS IS NOT A BROWSE FEATURE. `sources[].name` is free text and the same body appears under
 * several strings: the Ministry of Human Resource Development and the Ministry of Education are one
 * renamed ministry, `MHA` and `Ministry of Home Affairs` are one body with 95 citations between
 * them. That much is an ordinary tidiness problem. **What makes it a method problem is Ruling 1a**,
 * whose independence test is a test on the publisher of a document — and which is enforced today by
 * a human reading a free-text string.
 *
 * SO THE CARRIER IS KEPT APART FROM THE BODY. A figure computed by a regulator and reprinted in a
 * government press release is not independent evidence, whoever computed it; the corpus records
 * that as `PIB / X`. Merging those into "X" would have destroyed the distinction the resolution was
 * built to serve, so `PIB` is typed as a carrier and both attributions are shown.
 *
 * ============================ WHAT THIS PAGE DOES NOT CLAIM ====================================
 *
 * **It does not grade independence.** Ruling 1a tests the PUBLICATION, not the institution: the
 * same body publishes a qualifying document and a non-qualifying one in the same month, and the
 * discriminator is whether the document exists to report or to persuade. Who published something is
 * the input to that test and never the answer, and nothing here should be read as a verdict on a
 * source.
 *
 * **It does not claim to list every publisher in the corpus.** Half the citations resolve; the rest
 * name a document rather than a body — an Act, a budget volume, a parliamentary question — and the
 * count of what did not resolve is printed beside the count of what did. A coverage figure with an
 * unstated scope is wrong by an amount nobody can see, including its author.
 *
 * **No merge is made on similarity.** The four Finance Commissions share almost all of their names
 * and are four constitutional bodies; every merge on this page is authored and states its ground.
 */
export default function Publishers() {
  const { rows, total, resolved, unresolvedSegments } = publisherRollups();
  const carriers = rows.filter((r) => r.publisher.kind === 'carrier');
  const bodies = rows.filter((r) => r.publisher.kind !== 'carrier');

  const tierSpread = (tiers: Tier[]) => {
    const c = new Map<Tier, number>();
    for (const t of tiers) c.set(t, (c.get(t) ?? 0) + 1);
    return [...c].sort((a, b) => b[1] - a[1]);
  };

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / who published it
      </p>
      <h1>Who published it</h1>
      <p className="lede">
        The bodies behind the citations, resolved across renames and abbreviations. This exists
        because <strong>whether a source is independent of what it establishes is a question about
        who published it</strong> — and until now that lived only inside a free-text string.
      </p>

      {/* RULE 9 BINDS SELECTION AND ORDERING, and this page had checked only the first. The
          groupings carry their reasons; the ORDER did not carry anything, and it is by citation
          count descending — so the body at the top reads as the most important publisher when what
          it is, is the most cited one. Stated, with the difference named. */}
      <p className="prose-note">
        <span className="label">How this is ordered</span> By the number of citations that resolve to
        each body, largest first. <strong>That is a count of how often this instrument cites them,
        not a judgement of standing</strong> — a body cited once may be the only source for the thing
        it establishes.
      </p>

      <p className="prose-note">
        <span className="label">Coverage, with its scope</span> {resolved} of {total} citations
        resolve to a body or a carrier named below. The remaining{' '}
        {total - resolved} sit across {unresolvedSegments.length} distinct strings that name{' '}
        <em>a document rather than a publisher</em> — an Act, a budget volume, a court case, a
        parliamentary question. That is not a backlog to be cleared: a citation of{' '}
        <span className="mono">The Constitution of India</span> has no publishing body to find.
      </p>

      <h2>Bodies</h2>
      <p>
        Every grouping below is authored and carries its reason, because saying two strings are one
        body is a claim about the world. <strong>Nothing is grouped on similarity.</strong> The four
        Finance Commissions are the proof: they share almost all of their names, they are four
        separate constitutional bodies, and any rule that matched on resemblance would have merged
        them.
      </p>

      <div className="table-wrap" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th>Body</th>
              <th className="num">Cited</th>
              <th>Kind</th>
              <th>Tiers of its documents</th>
              <th>Grouped because</th>
            </tr>
          </thead>
          <tbody>
            {bodies.map((r) => (
              <tr key={r.publisher.id}>
                <td>
                  <strong>{r.publisher.name}</strong>
                  {r.publisher.aka.length > 1 ? (
                    <span className="pub-aka">
                      cited as {r.publisher.aka.join(' · ')}
                    </span>
                  ) : null}
                </td>
                <td className="num">{r.asBody.length}</td>
                <td className="t-note">{r.publisher.kind.replace(/-/g, ' ')}</td>
                <td>
                  {tierSpread(r.asBody.map((x) => x.citation.tier)).map(([t, n]) => (
                    <span key={t} className="pub-tier">
                      <TierTag tier={t} />
                      <span className="mono t-note">×{n}</span>
                    </span>
                  ))}
                </td>
                <td className="t-note pub-why">{r.publisher.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Carriers, which are not sources</h2>
      <p>
        A carrier serves a document it did not produce. It is listed separately and never merged into
        the body, because <strong>the document a carrier serves is a document written to make a
        case</strong> — and that is what decides whether it counts as independent evidence, however
        official the figure inside it and whoever computed it.
      </p>
      {carriers.map((r) => (
        <div key={r.publisher.id} className="pub-carrier">
          <p>
            <strong>{r.publisher.name}</strong> carries{' '}
            <strong>{r.asCarrier.length}</strong> citations.{' '}
            {r.asCarrier.filter((x) => !x.body).length} of them name{' '}
            <em>no originating body at all</em> — the string is the carrier and nothing else, so the
            body that produced the figure cannot be identified from the citation.
          </p>
          <p className="t-note">{r.publisher.why}</p>
        </div>
      ))}

      <h2>What did not resolve, and why that is mostly correct</h2>
      <p>
        The strings below name documents. Most have no publishing body to resolve to, and two
        classes are worth naming because they look like failures and are not the same thing:
      </p>
      <ul>
        <li>
          <strong>Statutes, judgments and constitutional provisions.</strong> An Act is cited by its
          own name because that is what identifies it. There is no body to attach.
        </li>
        <li>
          <strong>Parliamentary answers.</strong> A starred or unstarred question is cited by its
          number, and <strong>the answering ministry is not in the string</strong> — so the body
          cannot be resolved from the citation even though one exists. That is a fact about how these
          are cited here, and it is the one group in this list where something is genuinely missing.
        </li>
      </ul>

      <details className="pub-unresolved">
        <summary>
          Every string that resolved to no body ({unresolvedSegments.length} distinct)
        </summary>
        <div className="table-wrap" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th>Cited as</th>
                <th className="num">Times</th>
              </tr>
            </thead>
            <tbody>
              {unresolvedSegments.map((u) => (
                <tr key={u.segment}>
                  <td className="t-note">{u.segment}</td>
                  <td className="num mono">{u.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="prose-note">
        <span className="label">What this is not</span>{' '}Not a ranking of sources, and not an
        independence grade. The tier beside a body grades <em>the documents retrieved from it</em>,
        and independence is a separate question asked of each publication —{' '}
        <Link href="/method/#independence">how the two differ, and why one cannot substitute for
        the other</Link>.
      </p>
    </>
  );
}
