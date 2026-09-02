import Link from '@/components/Link';
import { historyFor } from '@/lib/history';
import { ASSESSMENT_LABELS } from '@/lib/format';
import type { Assessment } from '@/lib/types';

/**
 * "HAS THIS CHANGED?" — the question a reader of a corrected record has, answered on the record.
 *
 * THIS INSTRUMENT CORRECTS RECORDS IN PLACE, ON PURPOSE. `/data` holds the current state and the
 * correction convention keeps the withdrawn wording inside the field that changed. What the
 * convention cannot do is tell a reader that a record was corrected at all: they would have to
 * already be reading the sentence that says so. **220 of 353 ledger and provenance records have
 * been edited since they were first published and, until this shipped, every one of them looked
 * untouched.**
 *
 * ============================ THE TWO NUMBERS, AND WHY THEY ARE WORDED DIFFERENTLY =============
 *
 * **The edit count says "commits that touched this record", in those words, because that is what
 * it counts.** It counts a whitespace reserialisation and it counts a four-field correction as
 * one. Printing it as "3 corrections" would be a number nobody could re-derive — the fabricated
 * scope defect, on a page that exists to be trustworthy about exactly this.
 *
 * **The verdict transitions are exact and are the reason the component exists.** A record whose
 * assessment moved from `worked` to `partly` is the instrument saying it got something wrong, with
 * the date and the commit. 45 records have done it. That is not an embarrassment to bury in a log.
 *
 * ============================ WHAT IT DOES NOT CLAIM ==========================================
 *
 * **It does not say what the record used to SAY.** A diff of prose belongs to the correction
 * convention, which puts the withdrawn wording in the field — visible on this same page, in
 * context, where a reader can weigh it. A rendered diff here would duplicate that in a worse form
 * and would drift from it the first time a correction was made by hand.
 *
 * **An absent history is not an empty one.** `historyFor` returns `undefined` for a record the
 * file does not know about, and this renders nothing rather than "0 edits" — the two are different
 * facts and the corpus has already paid once for a view that showed them identically.
 */
export function RecordHistory({ id }: { id: string }) {
  const h = historyFor(id);
  if (!h) return null;

  const label = (v: string | null | undefined) =>
    v ? (ASSESSMENT_LABELS[v as Assessment] ?? v) : 'not stated';
  const changes = h.values.slice(1);

  return (
    <section className="rechist">
      <h2>Has this record changed?</h2>

      <p className="rechist-line">
        First published <span className="mono">{h.firstDate}</span>.{' '}
        {h.editCount === 0 ? (
          <>Not edited since.</>
        ) : (
          <>
            <strong>
              {h.editCount} commit{h.editCount === 1 ? '' : 's'}
            </strong>{' '}
            {h.editCount === 1 ? 'has' : 'have'} touched it since — a count of commits, not of
            corrections: one commit may correct four fields, and reformatting counts too.
          </>
        )}
      </p>

      {changes.length > 0 ? (
        <>
          <p className="rechist-verdict-lead">
            <strong>
              The verdict on this record has moved {changes.length} time
              {changes.length === 1 ? '' : 's'}.
            </strong>{' '}
            Each move is an exact transition, not an inference — the withdrawn reasoning stays in
            the record itself, in the field that changed.
          </p>
          <ol className="rechist-changes">
            {changes.map((c) => (
              <li key={c.sha}>
                <span className="mono rechist-date">{c.date}</span>
                <span className="rechist-move">
                  {label(c.from)} <span aria-hidden="true">→</span>{' '}
                  <span className="sr-only">changed to</span>
                  <strong>{label(c.v)}</strong>
                </span>
                <span className="rechist-subj">{c.subj}</span>
              </li>
            ))}
          </ol>
        </>
      ) : null}

      {h.edits.length > 0 ? (
        <details className="rechist-more">
          <summary>
            Every commit that touched this record ({h.edits.length})
          </summary>
          <ol className="rechist-edits">
            {h.edits.map((e) => (
              <li key={e.sha}>
                <span className="mono rechist-date">{e.date}</span>
                <span className="mono rechist-sha">{e.sha.slice(0, 7)}</span>
                <span className="rechist-subj">{e.subj}</span>
                <span className="rechist-fields">{e.fields.join(', ')}</span>
              </li>
            ))}
          </ol>
        </details>
      ) : null}

      <p className="prose-note">
        <Link href="/method/#corrections">Every verdict this instrument has changed its mind about</Link> ·{' '}
        <Link href="/method/#data">cite the commit, not the page</Link>
      </p>
    </section>
  );
}
