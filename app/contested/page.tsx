import Link from 'next/link';
import type { Metadata } from 'next';
import { ledger } from '@/lib/data';
import { CONTESTED_GROUND_LABELS, DOMAIN_LABELS } from '@/lib/format';
import { CONTESTED_GROUNDS } from '@/lib/types';
import type { ContestedGround, LedgerRecord } from '@/lib/types';
import { AbsenceCount, CaveatFlag } from '@/components/marks';

export const metadata: Metadata = { title: 'Contested — what would settle it' };

/**
 * THE DISTINCTION BETWEEN A HEDGE AND A FINDING, which the site could not previously show.
 *
 * `contested` is the largest verdict class in the corpus and on every listing page it renders as one
 * word. A reader meeting "44 Contested" on a domain page takes away that 44 records reached no
 * conclusion. That is the largest available misreading of this instrument, and it is wrong in a way
 * the data already refutes: 66 of the 68 contested records carry a `contestedGround`, and the six
 * values divide cleanly into contests a document could end and contests nothing could.
 *
 * THE SPLIT IS THE PAGE. Where the ground is `evidence-withheld`, `interpretation` or `time`, a
 * specific thing would settle it — a figure released, an authoritative reading given, a year
 * elapsed — and the record names what. Where it is `criterion`, `measure` or `evidence-unobservable`,
 * the field's own definitions say nothing would: the facts are agreed and the dispute is which frame
 * governs, or several valid published measures point opposite ways, or the settling fact is a
 * counterfactual. THOSE ARE FINDINGS AND NOT ABSENCES OF ONE.
 *
 * NO SCORE, NO RANK, NO BURNDOWN. The same rule that forbids a verdict number for a term forbids
 * treating the settleable half as a queue to be closed — several are settleable in principle by a
 * body that has declined to settle them, which is the finding rather than the task.
 */

/** Grounds where a specific, nameable thing would end the contest. */
const SETTLEABLE: readonly ContestedGround[] = ['evidence-withheld', 'interpretation', 'time'];
/** Grounds whose own definitions say nothing would settle it. */
const UNSETTLEABLE: readonly ContestedGround[] = ['criterion', 'measure', 'evidence-unobservable'];

/** What each ground says the contest turns on, in a reader's terms rather than the enum's. */
const WHAT_WOULD_SETTLE: Record<ContestedGround, string> = {
  'evidence-withheld': 'a figure or document that exists, or is producible, and is not published',
  interpretation: 'an authoritative reading of a document or statute — none given, or two inconsistent ones',
  time: 'elapsed time: the readings make divergent predictions',
  criterion: 'nothing. The facts are agreed and the dispute is which frame or objective governs',
  measure: 'nothing, but the rival measures are enumerable — several valid published measures of one object point opposite ways',
  'evidence-unobservable': 'nothing. The settling fact is a counterfactual, or is unbuildable while the practice stands',
};

function Group({ ground, records }: { ground: ContestedGround; records: LedgerRecord[] }) {
  if (records.length === 0) return null;
  return (
    <>
      <h3>
        {CONTESTED_GROUND_LABELS[ground]} <span className="t-note">· {records.length}</span>
      </h3>
      <p className="prose-note">{WHAT_WOULD_SETTLE[ground]}.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Record</th>
              <th>Term</th>
              <th>Domains</th>
            </tr>
          </thead>
          <tbody>
            {records.map((l) => (
              <tr key={l.id}>
                <td>
                  <Link href={`/ledger/${l.id}/`}>{l.title}</Link>
                  <br />
                  <span className="t-note mono">{l.id}</span>
                  {/* Rule 3a: a caveat travels into every rendering, in full, including this one. */}
                  {l.caveat ? (
                    <>
                      <br />
                      <CaveatFlag caveat={l.caveat} variant="inline" />
                    </>
                  ) : null}
                  {l.unmeasured?.length ? (
                    <>
                      <br />
                      <AbsenceCount items={l.unmeasured} />
                    </>
                  ) : null}
                </td>
                <td className="t-note mono">{l.term}</td>
                <td className="t-note">{l.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function ContestedIndex() {
  const contested = ledger.filter((l) => l.assessment === 'contested');
  const byGround = Object.fromEntries(
    CONTESTED_GROUNDS.map((g) => [g, contested.filter((l) => l.contestedGround === g)]),
  ) as Record<ContestedGround, LedgerRecord[]>;
  const unvalued = contested.filter((l) => !l.contestedGround);
  const settleable = SETTLEABLE.reduce((n, g) => n + byGround[g].length, 0);
  const unsettleable = UNSETTLEABLE.reduce((n, g) => n + byGround[g].length, 0);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / contested
      </p>
      <h1>Contested — and what would settle it</h1>
      <p className="lede">
        A record marked <span className="mono">contested</span> declines to choose between readings
        the evidence supports. That is a statement about the evidence and not a hedge — and the
        useful question is which kind of contest it is, because <strong>most of them can never be
        settled by anything at all.</strong>
      </p>
      <p className="prose-note">
        {contested.length} contested records, {contested.length - unvalued.length} of them carrying a
        stated ground. <strong>{unsettleable}</strong> turn on something no document could resolve —
        the facts are agreed and the dispute is which frame governs, or several valid published
        measures point opposite ways. <strong>{settleable}</strong> would be settled by a specific
        thing the record names: a figure released, an authoritative reading given, a year elapsed.
      </p>
      <p className="prose-note">
        The list is not scored, not ranked, and the settleable half is not a queue. Several are
        settleable in principle by a body that has declined to settle them, which is the finding
        rather than the task.
      </p>

      <h2>Nothing would settle these — {unsettleable} records</h2>
      <p className="prose-note">
        On the field&rsquo;s own definitions, no further evidence resolves these. They are findings
        about a disagreement, not gaps waiting on a document.
      </p>
      {UNSETTLEABLE.map((g) => (
        <Group key={g} ground={g} records={byGround[g]} />
      ))}

      <h2>Something would settle these — {settleable} records</h2>
      <p className="prose-note">
        Each names what. That the thing is nameable does not make it obtainable.
      </p>
      {SETTLEABLE.map((g) => (
        <Group key={g} ground={g} records={byGround[g]} />
      ))}

      {unvalued.length > 0 ? (
        <>
          <h2>No ground stated — {unvalued.length} records</h2>
          {/* The omission is deliberate and documented in the schema: these say in their own prose
              that `contested` is standing in for a value that does not exist, and minting a
              catch-all would absorb exactly the records that are evidence the vocabulary is short. */}
          <p className="prose-note">
            The field is optional within its scope and these two are the reason. Both say in their
            own prose that <span className="mono">contested</span> is standing in for a value this
            vocabulary does not have. Giving them a catch-all would absorb the only evidence that the
            vocabulary is short.
          </p>
          <ul>
            {unvalued.map((l) => (
              <li key={l.id}>
                <Link href={`/ledger/${l.id}/`}>{l.title}</Link>{' '}
                <span className="t-note mono">{l.id}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}
