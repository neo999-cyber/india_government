import Link from '@/components/Link';
import type { ContestedGround, LedgerRecord } from '@/lib/types';
import { CONTESTED_GROUND_LABELS, DOMAIN_LABELS } from '@/lib/format';
import { RecordMarks } from '@/components/marks';

/**
 * TWO READINGS, FACING, AT EQUAL WEIGHT — one contested record.
 *
 * ============================ WHY THIS REPLACES A TABLE ROW ===================================
 *
 * `/search/#contested` listed 68 records as title, term and domains. A reader learned that a contest
 * exists and never met it. **The two readings are the content of a contested record** — the schema
 * requires both on every scored record and calls each *the strongest good-faith case* — and a page
 * about contests that shows neither is an index of disputes rather than the disputes.
 *
 * ============================ EQUAL WEIGHT IS A MEASUREMENT, NOT A GESTURE ====================
 *
 * The two panels are the same width, the same type, the same colour, in a grid that does not order
 * them by length. **That is only honest because the corpus supports it, and it was measured before
 * it was built:** across the 68 records the median for/against length ratio is **0.89**, and exactly
 * **one** record has a side more than twice the other. Had the corpus been lopsided, equal panels
 * would have rendered a one-sided record as a balanced one, which is worse than a table.
 *
 * The left panel is not the favoured one. Reading order is a property of the language, so the
 * headings name what each panel is rather than letting position imply which the record prefers, and
 * **neither carries colour** — the palette's alert red is reserved for deaths, alerts and seams, and
 * a red panel opposite a plain one would score the dispute the page exists not to score.
 *
 * ============================ NOTHING IS TRUNCATED, AND THAT IS THE LAYOUT'S PROBLEM ==========
 *
 * The longest `caseAgainst` in the corpus is 2,736 characters. It renders whole. No clamp, no
 * line-limit, no "read more" — rule 3a's *if a caveat will not fit a layout, the layout is what
 * changes* is written about caveats and the reasoning is not specific to them: **a case cut to fit a
 * cell looks like the whole of it.** Panels grow to their content and the rows are not height-matched
 * to each other, because equalising them would pad the shorter side into looking as substantial as
 * the longer one — the inverse defect, and a quieter one.
 *
 * ============================ THE TWO GROUNDS ARE DIFFERENT OBJECTS ===========================
 *
 * `contestedGround` sits ABOVE the pair and *what would settle it* sits BENEATH, and the two are not
 * the same kind of thing as the grounds inside the panels:
 *
 *   - **The ground of the CONTEST** — one of six enum values — answers *what would have to be true
 *     for this to resolve?*, and for three of the six the answer is nothing.
 *   - **The grounds of each READING** — the two panels — are what the disputants argue.
 *
 * A reader who conflates them takes *criterion* for a weak case rather than for a statement that the
 * facts are agreed. So the ground is labelled as the contest's own, in its own row, before either
 * reading is met, and its consequence is restated after them where a reader has the argument in mind.
 */
export function TwoReadings({
  record,
  settles,
}: {
  record: LedgerRecord;
  /**
   * What the record's ground says would end the contest, in a reader's terms.
   *
   * ONE LABEL FOR BOTH HALVES, DELIBERATELY. The unsettleable half's text opens *nothing* and says
   * why, so the answer is in the sentence. A second label reading "nothing would settle it" above a
   * sentence beginning "nothing" says it twice, and — worse — makes the label itself the finding,
   * which invites a reader to skip the reason. The question is the same for all 68; the answers
   * differ.
   */
  settles: string;
}) {
  const ground = record.contestedGround as ContestedGround | undefined;

  return (
    <article className="ctwo">
      <div className="ctwo-head">
        <h3>
          <Link href={`/ledger/${record.id}/`}>{record.title}</Link>
        </h3>
        <p className="ctwo-meta t-note">
          <span className="mono">{record.id}</span> · <span className="mono">{record.term}</span> ·{' '}
          {record.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}
        </p>
        {ground ? (
          <p className="ctwo-ground">
            <span className="label">The contest turns on</span> {CONTESTED_GROUND_LABELS[ground]}
          </p>
        ) : (
          <p className="ctwo-ground">
            <span className="label">The contest turns on</span> no stated ground — the record says in
            its own prose that this vocabulary has no value for it
          </p>
        )}
      </div>

      {/* Rule 4b: the record's declarations render on this listing, in the caveat's idiom, BEFORE
          the argument rather than below it. A reader who meets the two readings first has already
          formed a view by the time the qualification arrives. */}
      <RecordMarks record={record} />

      <div className="ctwo-pair">
        <section className="ctwo-side">
          <h4>The case in favour</h4>
          <p>{record.caseFor}</p>
        </section>
        <section className="ctwo-side">
          <h4>The case against</h4>
          <p>{record.caseAgainst}</p>
        </section>
      </div>

      <p className="ctwo-settle">
        <span className="label">What would settle it</span> {settles}.
      </p>

      {record.assessmentNote ? (
        <p className="ctwo-note">
          <span className="label">Why this verdict</span> {record.assessmentNote}
        </p>
      ) : null}

      {record.revisitTrigger ? (
        <p className="ctwo-note">
          <span className="label">Revisit when</span> {record.revisitTrigger}
        </p>
      ) : null}
    </article>
  );
}
