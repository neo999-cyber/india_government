import Link from 'next/link';
import type { Metadata } from 'next';
import { getLedger, getProvenance } from '@/lib/data';
import { history, verdictChanges } from '@/lib/history';
import { ASSESSMENT_LABELS, DOMAIN_LABELS } from '@/lib/format';
import type { Assessment } from '@/lib/types';
import { CaveatRow, RecordMarks } from '@/components/marks';
import { Redline, RedlineMaster } from '@/components/Redline';
import { redlines } from '@/lib/corrections';

export const metadata: Metadata = {
  title: 'Corrections',
  description:
    'Every record whose verdict this instrument has changed since publishing it, with the date, ' +
    'the move and the commit. Reconstructed from git, not from a hand-kept list.',
};

/**
 * `/corrections/` — WHERE THE INSTRUMENT SAYS OUT LOUD THAT IT CHANGED ITS MIND.
 *
 * WHY IT IS A SURFACE AND NOT A LOG ENTRY. The verification log is append-only and 684 KB; it is
 * the right home for the reasoning and the wrong home for the question *"has anything I read here
 * been revised?"* A reader cannot grep a log they do not know exists. **45 verdicts have moved
 * since publication and there was no page that said so.**
 *
 * IT IS DERIVED FROM GIT, WHICH IS THE POINT. A hand-kept changelog records the corrections
 * somebody remembered to write down — which, in a corpus whose own append-only log exists to stop
 * exactly that filtering, would be the same defect one level up. This list cannot be curated: it
 * is every observed transition of `assessment` or `directionOfBias`, and a record leaves it only
 * by never having changed.
 *
 * ============================ TWO THINGS IT REFUSES TO DO =====================================
 *
 * **No total, and no rate.** "45 of 353 records corrected" invites reading as an error rate for
 * the instrument, and rule 4b already refuses a corpus-wide absence count for the same reason: a
 * number in that position reads as a score for the corpus's own reliability, computed over a
 * denominator that is this corpus's own selection. The list is complete; it is not summed into a
 * verdict on itself. The count of ROWS is unavoidable and is stated as what it is — the length of
 * this list.
 *
 * **No ranking by how wrong a change was.** `worked → failed` is not "worse" than `too-early →
 * partly`; both are the method working. Ordering is by date, most recent first, because recency is
 * the only defensible order and the reader's real question is *what changed lately*.
 *
 * RULE 4b: this LISTS records, so every declaration and caveat renders here in full, exactly as on
 * any other listing surface. `listing-marks` binds it.
 */
export default function Corrections() {
  const changes = verdictChanges();
  const known = Object.keys(history).length;

  const rows = changes.map(({ id, h }) => {
    const l = getLedger(id);
    const p = l ? undefined : getProvenance(id);
    const last = h.values[h.values.length - 1];
    return { id, h, l, p, last, title: l?.title ?? p?.title ?? id };
  });

  const label = (v: string | null | undefined) =>
    v ? (ASSESSMENT_LABELS[v as Assessment] ?? v) : 'not stated';

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / corrections
      </p>
      <h1>What this instrument has changed its mind about</h1>
      <p className="lede">
        Records are corrected in place — that is what <span className="mono">/data</span> is — and
        the withdrawn wording stays inside the field that changed. This page is the other half:
        every record whose <em>verdict</em> moved after it was published, reconstructed from the
        commit history rather than from a list anybody maintains.
      </p>

      <p className="prose-note">
        <span className="label">How to read it</span>{' '}A move is an exact transition of the
        record&rsquo;s assessment, with the commit that made it. It is not a measure of how wrong
        the record was: <span className="mono">too-early</span> becoming{' '}
        <span className="mono">partly</span> is evidence accruing, and{' '}
        <span className="mono">worked</span> becoming <span className="mono">partly</span> is
        usually a standard tightening rather than a fact changing. The reasoning is on each
        record, in the field it belongs to.
      </p>

      <p className="prose-note">
        <span className="label">What is not here</span>{' '}No error rate, and no total presented as
        one. A share of records corrected would read as a reliability score for this corpus,
        computed over a sample this corpus selected — the same reason no absence total appears
        anywhere on the site. The list below is complete over the {known} ledger and provenance
        records the history file knows about; its length is the length of a list, not a grade.
      </p>

      {/* ---- THE REDLINE. What the field said, and what it says now. ------------------------- */}
      {redlines.length > 0 ? (
        <section className="redlines">
          <div className="sec-h">
            <h2>{redlines.length} corrections, shown</h2>
            <p className="sec-note">
              Every field whose withdrawn wording is quoted inside the correction, with the text it
              replaced. Reconstructed from the commit history, not from a list.
            </p>
          </div>
          <p>
            <strong>This is the method rather than a claim about it.</strong>{' '}
            <span className="mono">quotation-identity</span> proves each quoted withdrawal matches
            what that field actually held — 31 of 31 — so what follows is the record&rsquo;s own prior
            text, not a description of it. Brass marks both spans and neither is coloured for merit:
            a withdrawn sentence is one this instrument stopped standing behind, and several of
            these are tightenings rather than repairs.
          </p>
          <RedlineMaster count={redlines.length} />
          {redlines.map((r) => {
            // Ledger only. `ProvenanceRecord` carries no `caveat`, `unmeasured` or
            // `differentFacts` — it declares no marks at all — so a mark slot for one would be a
            // promise the layer cannot keep. The same narrowing the table below already makes.
            const rec = getLedger(r.id);
            return (
              <Redline
                key={`${r.id}.${r.field}.${r.beforeDate}`}
                item={r}
                marks={rec ? <RecordMarks record={rec} /> : null}
              />
            );
          })}
        </section>
      ) : (
        <p className="prose-note">
          <span className="label">No redlines available</span> The commit history was not read on
          this build, so the before-and-after texts are not shown. That is a fact about the build,
          not about the corpus — the corrections themselves are listed below.
        </p>
      )}

      <div className="sec-h">
        <h2>Every verdict that moved</h2>
        <p className="sec-note">
          The table below is the other half: records whose ASSESSMENT changed, which is a different
          event from a field being rewritten.{' '}
          {/* Rule 9's ordering half, which this page had not stated. */}
          <strong>Ordered by the date of the most recent change, newest first</strong> — a fact about
          when the commit landed, and not a measure of how much any record moved.
        </p>
      </div>

      <div className="table-wrap" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Record</th>
              <th>Moved</th>
              <th>Date</th>
              <th>In</th>
            </tr>
          </thead>
          {rows.map((r) => (
            <tbody key={r.id}>
              <tr>
                <td className="mono">
                  <Link href={`/${r.l ? 'ledger' : 'provenance'}/${r.id}/`}>{r.id}</Link>
                </td>
                <td>
                  <Link href={`/${r.l ? 'ledger' : 'provenance'}/${r.id}/`}>{r.title}</Link>
                  {/* Ledger rows only. `ProvenanceRecord` carries no `caveat`, `unmeasured` or
                      `differentFacts` — it declares no marks at all — so a mark slot here would be
                      a promise the layer cannot keep, which is what `enum-parity` refuses one
                      level down. The provenance index renders none for the same reason. */}
                  {r.l ? <RecordMarks record={r.l} deferCaveat /> : null}
                </td>
                <td className="t-note">
                  {r.h.values.length > 2 ? (
                    <span className="corr-multi">{r.h.values.length - 1} moves · </span>
                  ) : null}
                  {label(r.last.from)} <span aria-hidden="true">→</span>{' '}
                  <span className="sr-only">changed to</span>
                  <strong>{label(r.last.v)}</strong>
                </td>
                <td className="mono t-note">{r.last.date}</td>
                <td className="t-note">
                  {r.l ? r.l.domains.map((d) => DOMAIN_LABELS[d]).join(', ') : 'provenance'}
                </td>
              </tr>
              {r.l ? <CaveatRow record={r.l} colSpan={5} /> : null}
            </tbody>
          ))}
        </table>
      </div>

      <p className="prose-note">
        Every commit that has ever touched a given record is listed on that record&rsquo;s own page,
        under <em>Has this record changed?</em> — including the ones that moved no verdict.{' '}
        <Link href="/data/">Cite the commit</Link>, not the page: it is what makes a figure you
        quote today re-findable after the record is corrected.
      </p>
    </>
  );
}
