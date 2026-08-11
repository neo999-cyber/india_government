import Link from 'next/link';
import type { Metadata } from 'next';
import { ledger } from '@/lib/data';
import { CONTESTED_GROUND_LABELS, DOMAIN_LABELS } from '@/lib/format';
import { CONTESTED_GROUNDS } from '@/lib/types';
import type { ContestedGround, LedgerRecord } from '@/lib/types';
import { TwoReadings } from '@/components/TwoReadings';

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

function Group({
  ground,
  records,
  settles,
}: {
  ground: ContestedGround;
  records: LedgerRecord[];
  settles: string;
}) {
  if (records.length === 0) return null;
  return (
    <>
      <h3 className="cg-h">
        {CONTESTED_GROUND_LABELS[ground]} <span className="t-note">· {records.length}</span>
      </h3>
      <p className="prose-note">{settles.charAt(0).toUpperCase() + settles.slice(1)}.</p>
      {records.map((l) => (
        <TwoReadings key={l.id} record={l} settles={settles} />
      ))}
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
      {/* THE SPLIT IS THE ENTRY, AND IT IS TWO OBJECTS RATHER THAN ONE BAR.

          A single divided bar would be the wrong picture and it is the obvious one to reach for.
          It puts both halves on one scale and invites the reading that 38 and 28 are two positions
          on a spectrum of resolvedness — that the corpus is 58 per cent stuck and 42 per cent
          pending, and that the second number ought to fall. Neither is true. A contest nothing can
          settle is a FINDING about a disagreement; a contest something would settle is a statement
          about a document that has not been produced. **They are different kinds of thing, so they
          are drawn as two panels that do not touch and share no axis.**

          No colour separates them either. The unsettleable half is not the bad half. */}
      <div className="csplit">
        <div className="csplit-half">
          <p className="csplit-n mono">{unsettleable}</p>
          <p className="csplit-k">Nothing would settle these</p>
          <p className="csplit-w">
            On the field&rsquo;s own definitions no further evidence resolves them. The facts are
            agreed and the dispute is which frame governs, or several valid published measures of one
            object point opposite ways, or the settling fact is a counterfactual. These are findings
            about a disagreement, not gaps waiting on a document.
          </p>
        </div>
        <div className="csplit-half">
          <p className="csplit-n mono">{settleable}</p>
          <p className="csplit-k">Something would settle these</p>
          <p className="csplit-w">
            Each record names what: a figure released, an authoritative reading given, a year
            elapsed. That the thing is nameable does not make it obtainable — several are settleable
            in principle by a body that has declined to settle them.
          </p>
        </div>
      </div>
      <p className="prose-note">
        {contested.length} contested records,{' '}
        {contested.length - unvalued.length} of them carrying a stated ground.{' '}
        <strong>The two halves are not two ends of a scale and the split is not a burndown.</strong>{' '}
        Nothing here is scored or ranked, and the settleable half is not a queue: a contest a
        ministry could end by publishing a figure it has not published is a finding about the
        ministry, not an item of outstanding work for this instrument.
      </p>
      <p className="prose-note">
        <span className="label">Two different grounds, and the page keeps them apart</span> The
        ground of the <em>contest</em> — the six values below — answers{' '}
        <em>what would have to be true for this to resolve?</em> The grounds of each{' '}
        <em>reading</em> are the two cases the record sets out, in full, on every record here. A
        reader who runs them together takes a contest of criterion for a weak argument, when it is
        the opposite: the facts are agreed and it is the frame that is in dispute.
      </p>

      <h2>Nothing would settle these — {unsettleable} records</h2>
      {UNSETTLEABLE.map((g) => (
        <Group key={g} ground={g} records={byGround[g]} settles={WHAT_WOULD_SETTLE[g]} />
      ))}

      <h2>Something would settle these — {settleable} records</h2>
      {SETTLEABLE.map((g) => (
        <Group key={g} ground={g} records={byGround[g]} settles={WHAT_WOULD_SETTLE[g]} />
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
          {/* These two get the same treatment as the other 66 rather than a stub list. Their
              readings are the evidence that the vocabulary is short, so showing the contest and
              withholding the cases would make the claim unverifiable on the page that makes it. */}
          {unvalued.map((l) => (
            <TwoReadings
              key={l.id}
              record={l}
              settles="not stated — the record argues that no value in this vocabulary describes its contest"
            />
          ))}
        </>
      ) : null}
    </>
  );
}
