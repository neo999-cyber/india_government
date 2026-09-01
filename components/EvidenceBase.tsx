import Link from 'next/link';
import { citations, tierCounts } from '@/lib/data';
import { publisherRollups } from '@/lib/publishers';
import { TIER_LABELS } from '@/lib/format';
import type { Tier } from '@/lib/types';

/**
 * WHAT THIS ARCHIVE RESTS ON — the landing page's second picture.
 *
 * ============================ WHAT IT REPLACED, AND WHY ======================================
 *
 * The constellation stood here: India's outline with eight symbols and a density of marks inside
 * it, positions declared conceptual. The operator's reading, 2026-09-01: "i dont see the point of
 * the constellation map — no purpose — feels like a gimmick". They were right, and the reason is
 * structural rather than a matter of execution: **there is no geography in this corpus at all.**
 * No series or record carries a state, region or district field; `country` holds only IND and the
 * four peers; 27 of 269 series name a state anywhere and only in their titles. An outline over
 * data with no places in it cannot be made to mean something, so it was never going to stop
 * looking decorative.
 *
 * **It is not deleted.** It remains one of the Atlas's four views, labelled "What the archive
 * covers", which is where a coverage picture belongs and where the Survey of India outline and its
 * attribution stay on the site.
 *
 * ============================ EVERY FIGURE COMES FROM THE SANCTIONED ACCESSOR ================
 *
 * `citations()` and `tierCounts()`, because tier lives inside `sources[]` on ledger and provenance
 * and ON THE RECORD for a series, and counting it by hand gets it wrong — a hand count while
 * drafting this said 909 citations where the accessor says 1,205.
 *
 * **AND THE PUBLISHER FIGURES COME FROM `publisherRollups()`, NOT FROM A SECOND GROUPING.** The
 * draft grouped citations on the first clause of the source name and reported 570 publishers.
 * `/publishers/` forbids exactly that in its own words — "saying two strings are one body is a
 * claim about the world; nothing is grouped on similarity" — and the four Finance Commissions are
 * its proof. The authored rollups say something better anyway: half of what this rests on names a
 * DOCUMENT rather than a body, which is what citing a constitution or a judgment looks like.
 */
export function EvidenceBase() {
  const cites = citations();
  const counts = tierCounts(cites);
  const { rows, total, resolved } = publisherRollups();
  const order: Tier[] = (Object.keys(counts) as Tier[])
    .filter((t) => counts[t] > 0)
    .sort((a, b) => counts[b] - counts[a]);
  const unresolved = total - resolved;

  return (
    <section className="evb" aria-labelledby="evb-h">
      <div className="evb-head">
        <p className="home-kicker mono">What this rests on</p>
        <h2 id="evb-h">{total.toLocaleString('en-IN')} citations, and what kind each one is</h2>
        <p>
          Every figure and every record on this site carries its sources, and every source carries a
          tier. This is all of them at once, one mark per citation — the same idiom as the landscape
          above, counting a different thing.
        </p>
      </div>

      {/* SIX BANDS, NOT SIX COLOURS. The tiers are a ladder and separating them by POSITION says so
          without asking a hue to carry an ordering it would have to be explained. The shape is the
          claim: T1 is most of the archive and the rest is a thin margin. */}
      <ol className="evb-tiers">
        {order.map((t) => (
          <li key={t} className="evb-tier">
            <p className="evb-tier-h">
              <b className="mono">{t}</b>
              <span className="mono evb-n">{counts[t]}</span>
              <span className="evb-what">{TIER_LABELS[t]}</span>
            </p>
            <span className="evb-marks" aria-hidden="true">
              {Array.from({ length: counts[t] }, (_, i) => (
                <i key={i} />
              ))}
            </span>
          </li>
        ))}
      </ol>

      <div className="evb-split">
        <p>
          <strong>
            {resolved} of these resolve to a named body. The other {unresolved} name a document.
          </strong>{' '}
          An Act, a budget volume, a court case, a parliamentary question. That is not a backlog to
          be cleared &mdash; a citation of the Constitution of India has no publishing body to find,
          and pretending otherwise would be the kind of tidying this instrument refuses.
        </p>
        <p className="evb-most">
          Most cited, by how often this instrument cites them and not by standing:{' '}
          {rows.slice(0, 6).map((r, i) => (
            <span key={r.publisher.id}>
              {i ? ' · ' : ''}
              {r.publisher.name}{' '}
              <b className="mono">{r.asBody.length + r.asCarrier.length}</b>
            </span>
          ))}
        </p>
        <p className="evb-go">
          <Link href="/publishers/">Who published it &rarr;</Link>
          <Link href="/method/#tiers">What the tiers mean &rarr;</Link>
        </p>
      </div>
    </section>
  );
}
