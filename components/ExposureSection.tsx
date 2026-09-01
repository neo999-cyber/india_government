import Link from 'next/link';
import { ledger } from '@/lib/data';
import { ASSESSMENT_LABELS, DOMAIN_LABELS } from '@/lib/format';
import { EXPOSURE_ADJUDICATIONS } from '@/lib/types';
import type { ExposureAdjudication, LedgerRecord } from '@/lib/types';
import { EXPOSURE_ADJUDICATION_LABELS, EXPOSURE_ROLE_LABELS, RecordMarks } from '@/components/marks';
import { ExposureMatrix } from '@/components/ExposureMatrix';

/**
 * ONE PAGE, LED BY THE ADJUDICATION AXIS — and the refusals are not given a page of their own.
 *
 * The eleven consistent refusals were the strongest publishable finding of the shocks calibration
 * and the obvious candidate for a page. They are here instead, at the top of this one, for a reason
 * that decided the design: ELEVEN ROWS ALONE CANNOT SAY WHETHER REFUSAL IS RARE OR NORMAL. A reader
 * meeting them without the 44 acceptances beside them has no way to tell whether the instrument
 * refuses an exogenous defence routinely — which would make the refusals worthless — or seldom,
 * which is what makes them a finding. The comparison is the content.
 *
 * WHAT THIS PAGE DELIBERATELY DOES NOT SHOW, and the omission is stated on the page itself: the
 * adjudication cross-tabbed against the verdict. It is a striking table — 44 records accept an
 * exogenous explanation and none is `failed` — and it is CIRCULAR, because the adjudication was read
 * from the same prose the verdict rests on. Nothing outside this corpus would have to change for it
 * to change, so it is method rather than evidence, and putting it here would import that
 * circularity into a page that does not otherwise have it.
 *
 * AND THE GROUND OF EACH REFUSAL IS PROSE, NOT A VALUE. The corpus refuses on at least five distinct
 * grounds — the pattern predates the event, peers faced it and did better, it explains one limb and
 * not another, no other state saw it, it is being used as a comparison base rather than as a cause,
 * the governing instrument's own words do not reach it. A `basis` property was reported and not
 * built: five values across eighteen entries is a taxonomy heavier than the thing it sorts. So the
 * recurring test is described in the prose below and each row carries the record's own sentence.
 */

const REFUSING: readonly ExposureAdjudication[] = ['refused', 'limited'];

/** The cell a single entry falls in. `none` on both axes is a real state, not a missing value. */
const cellKey = (role: string | undefined, adj: string | undefined) =>
  `${role ?? 'no-role'}/${adj ?? 'none'}`;

/**
 * ONE ROW PER RECORD, NOT PER ENTRY — and the reason is a gate contract rather than a preference.
 *
 * `listing-marks` binds a listing row by its `/ledger/<id>/` href and requires the record's
 * declarations in it, while also requiring each declaration at most once per page. Nine records
 * carry two entries and three of those span two cells, two of the three declaring an absence. A row
 * per entry would therefore render the same absence twice — breaking one rule in the act of obeying
 * the other. So the record is the row, its entries are listed inside it, and the row belongs to
 * every cell its entries fall in.
 */
function RecordRow({ record }: { record: LedgerRecord }) {
  const entries = record.shockExposure ?? [];
  const cells = [...new Set(entries.map((e) => cellKey(e.role, e.adjudication)))];
  return (
    <tbody data-cells={cells.join(' ')}>
      <tr>
        <td>
          <Link href={`/ledger/${record.id}/`}>{record.title}</Link>
          <br />
          <span className="t-note mono">
            {record.id} · {record.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}
          </span>
          <RecordMarks record={record} />
        </td>
        <td className="t-note">{ASSESSMENT_LABELS[record.assessment]}</td>
        <td>
          {entries.map((e, k) => (
            <p key={k} className="xrow-entry">
              <span className="mono">{e.event}</span>
              <span className="absence-kind">
                {e.role ? EXPOSURE_ROLE_LABELS[e.role] : 'no role stated'}
                {e.adjudication ? ` · ${EXPOSURE_ADJUDICATION_LABELS[e.adjudication]}` : ''}
              </span>
              <br />
              <span className="t-note">{e.why}</span>
            </p>
          ))}
        </td>
      </tr>
    </tbody>
  );
}

export function ExposureSection() {
  const declaring = ledger.filter((l) => (l.shockExposure ?? []).length > 0);
  const entries = declaring.flatMap((l) => l.shockExposure ?? []);
  const refusingEntries = entries.filter((e) => e.adjudication && REFUSING.includes(e.adjudication));

  // THE MATRIX. Roles down, adjudications across. `applicable` comes from the schema's own rule —
  // `cause` and `confound` must carry an adjudication, `is-the-shock` and `none-stated` must not —
  // so an inapplicable cell is a fact about the vocabulary and never a zero.
  const MROWS = [
    { key: 'cause', label: EXPOSURE_ROLE_LABELS.cause },
    { key: 'confound', label: EXPOSURE_ROLE_LABELS.confound },
    { key: 'none-stated', label: EXPOSURE_ROLE_LABELS['none-stated'] },
    { key: 'is-the-shock', label: EXPOSURE_ROLE_LABELS['is-the-shock'] },
    { key: 'no-role', label: 'No role stated' },
  ];
  const MCOLS = [
    ...EXPOSURE_ADJUDICATIONS.map((a) => ({ key: a, label: EXPOSURE_ADJUDICATION_LABELS[a] })),
    // LABEL COLLISION, CAUGHT ON THE RENDERED PAGE. `unstated` renders as "not adjudicated here"
    // and means THE RECORD MADE NO JUDGEMENT — a real adjudication value with 6 entries. This
    // column means THE CELL CANNOT HOLD ONE. Two different facts one word apart is the shape rule
    // 4a exists to prevent, so this column is "Not adjudicable".
    { key: 'none', label: 'Not adjudicable' },
  ];
  const ADJUDICATING = new Set(['cause', 'confound']);
  const applicable: Record<string, boolean> = {};
  for (const r of MROWS)
    for (const c of MCOLS)
      applicable[`${r.key}/${c.key}`] = ADJUDICATING.has(r.key) ? c.key !== 'none' : c.key === 'none';
  const cellCounts = entries.reduce<Record<string, number>>((m, e) => {
    const k = cellKey(e.role, e.adjudication);
    m[k] = (m[k] ?? 0) + 1;
    return m;
  }, {});
  // Distinct RECORDS per cell — not the entry count. Two records declare both a cause and a
  // confound for one event, so `confound × accepted` is 28 entries on 23 records.
  const cellRecords: Record<string, number> = {};
  for (const l of declaring)
    for (const k of new Set((l.shockExposure ?? []).map((e) => cellKey(e.role, e.adjudication))))
      cellRecords[k] = (cellRecords[k] ?? 0) + 1;
  const impossible = Object.values(applicable).filter((x) => !x).length;
  const countedZeros = Object.entries(applicable).filter(([k, ok]) => ok && !cellCounts[k]).length;
  const byAdj = Object.fromEntries(
    EXPOSURE_ADJUDICATIONS.map((a) => [a, entries.filter((e) => e.adjudication === a).length]),
  ) as Record<ExposureAdjudication, number>;
  const roleCounts = entries.reduce<Record<string, number>>((m, e) => {
    if (e.role) m[e.role] = (m[e.role] ?? 0) + 1;
    return m;
  }, {});
  const events = new Set(entries.map((e) => e.event));
  const covid = entries.filter((e) => e.event === 'COVID-19').length;

  return (
    <>
      <h2 id="exposure">Exposure — what the corpus does with an exogenous defence</h2>
      <p className="lede">
        When an outcome is bad and a pandemic, a commodity shock or a foreign tariff can be pointed
        at, the defence writes itself. <strong>These are the records where this instrument was
        offered that defence and said what it did with it.</strong>
      </p>
      <p className="prose-note">
        {declaring.length} records declare an exposure, carrying {entries.length} entries across{' '}
        {events.size} distinct events — {covid} of them COVID-19, which is what a corpus measuring
        2014 to 2026 would be expected to show. Each entry records two things: <strong>what the
        event did</strong> ({Object.entries(roleCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([k, v], i) => (
            <span key={k}>
              {i > 0 ? ', ' : ''}
              {v} {EXPOSURE_ROLE_LABELS[k as keyof typeof EXPOSURE_ROLE_LABELS]}
            </span>
          ))}
        ), and <strong>whether the record accepts it</strong>.
      </p>

      <h2>Refused, or accepted only in part — {refusingEntries.length} entries</h2>
      <p className="prose-note">
        <strong>Eleven of these refute on the same ground: the pattern predates the event.</strong>{' '}
        The trajectory was already flat before 2020; the shortfall is in the pre-COVID years the
        survey covers; the divergence from peers is a decade-long trend. Four more work differently —
        two partition the claim, saying the event explains the deadline and not the functionality
        gap; one is a peer comparison, that others faced the same virus and recovered faster; and one
        limits a shock <em>in the government&rsquo;s favour</em>, that India&rsquo;s own
        infrastructure is what let it capitalise on a global shift.
      </p>
      <p className="prose-note">
        Three refuse on grounds nothing else in the corpus shares: that no other state saw anything
        comparable in the same years, so a shared shock cannot explain a state-specific outcome; that
        a COVID trough is being used as a comparison base rather than as a cause; and that the
        governing Act compensates loss arising from implementation, and a pandemic is not
        implementation. <strong>Each row below carries the record&rsquo;s own sentence, so the
        judgement can be read rather than taken.</strong>
      </p>
      <p className="prose-note">
        <span className="label">Where to read them</span> They are not listed separately. The matrix
        below has them in the <em>confound</em> row under <em>refused</em> and{' '}
        <em>accepted in part</em>, and pressing either count narrows the full list to it — with the
        acceptances still in the grid above. <strong>Eleven rows alone cannot say whether refusal is
        rare or normal</strong>, and the comparison is the content, so the refusals live inside the
        distribution rather than beside it.
      </p>

      <h2>The rest of the distribution</h2>
      <p className="prose-note">
        {byAdj.accepted} entries accept the event as stated, {byAdj.limited} accept it in part,{' '}
        {byAdj.refused} refuse it outright, and {byAdj.unstated}{' '}
        {byAdj.unstated === 1 ? 'names an explanation offered by someone else and never says whether the record accepts it' : 'name an explanation offered by someone else and never say whether the record accepts it'}
        . <strong>Acceptance is the norm and that is what makes the refusals worth reading:</strong>{' '}
        an instrument that refused every exogenous defence would be asserting a prior, not testing
        one.
      </p>
      <p className="prose-note">
        A further {roleCounts['none-stated'] ?? 0} records state that no material exposure applies —
        a stated absence rather than an empty field — and {roleCounts['is-the-shock'] ?? 0} are
        records whose own subject <em>is</em> the event.
      </p>

      <h2>The matrix — what the event did, against whether the record accepted it</h2>
      <p className="prose-note">
        <strong>
          {impossible} of the {MROWS.length * MCOLS.length} cells cannot hold an entry at all,
        </strong>{' '}
        and drawing the grid without saying so would show {impossible + countedZeros} gaps where
        there {countedZeros === 1 ? 'is' : 'are'} {countedZeros}. A reflexive record — one whose own
        subject <em>is</em> the event — has no explanation to adjudicate, and a stated absence of
        exposure has nothing to accept or refuse; the schema omits the adjudication in both cases and
        the gate names an <span className="mono">is-the-shock</span> that carries one as a defect.
        Those cells are drawn in the absence idiom rather than as zeros.
      </p>
      <p className="prose-note">
        <strong>
          The one real gap is a causal exposure the corpus refused, and there has never been one.
        </strong>{' '}
        Every refusal in this instrument lands on a <em>confound</em> — an event said to degrade the
        measurement — and none on an event said to have produced part of the outcome. That is a
        counted zero over all {entries.length} entries, printed as{' '}
        <span className="mono">0</span> rather than left blank, because a blank in this instrument
        means unreported and this one is reported.
      </p>
      <ExposureMatrix
        rows={MROWS}
        cols={MCOLS}
        counts={cellCounts}
        recordCounts={cellRecords}
        applicable={applicable}
      />

      <h2>The records — {declaring.length}</h2>
      <p className="prose-note">
        One row per record, listing every exposure it declares. A record whose entries fall in two
        cells appears once and belongs to both.
      </p>
      <div className="table-wrap" id="exposure-list" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th scope="col">Record</th>
              <th scope="col">Verdict</th>
              <th scope="col">The exposure, and what the record says about it</th>
            </tr>
          </thead>
          {declaring.map((l) => (
            <RecordRow key={l.id} record={l} />
          ))}
        </table>
      </div>

      {/* RULE 4b AND RULE 5d TOGETHER. The absence is named on the page that would otherwise imply
          the field is complete, and it is worded as a claim about the SEARCH rather than about the
          world — a scan finds what it was given terms for and can never establish that nothing
          else is there. Named, not filled: adding an exposure to a record on the strength of a
          keyword hit would be the instrument coding its own prose, which is the reading these
          records exist to make checkable. */}
      <div className="absence-block">
        <span className="label">Not measured — records that reason from an event without declaring one</span>
        <p>
          A scan of five prose fields on the {223 - declaring.length} records carrying no exposure,
          over 21 exogenous-event nouns through the corpus-search helper, returns{' '}
          <strong>four</strong>. Read rather than counted: two are not exposures at all — L-0079
          names the second COVID wave as the <em>subject</em> of the reporting that drew a raid, and
          L-0133 uses &ldquo;the year of the lockdown&rdquo; as a date marker. Two argue from the
          pandemic without declaring it: L-0161 and L-0171 both weigh GST compensation paid{' '}
          &ldquo;through a pandemic&rdquo; on the Union&rsquo;s side.
        </p>
        <p>
          <strong>They are named here and not filled.</strong> Coding an exposure from a keyword hit
          would be this instrument reading its own prose into its own structure, which is the one
          move the exposure field exists to make checkable. And the four are what the scan found:
          the terms are listed in the verification log, and a term nobody thought of would return a
          fifth.
        </p>
        <p>
          <strong>The sixteen this was inherited as is a pre-migration figure and is withdrawn.</strong>{' '}
          Sixteen were found before the field was structured; ten were migrated into it and six were
          judged never to have been exposures. Re-derived at this commit the residual is four.
        </p>
      </div>

      <div className="caveat-block">
        <span className="label">What this page will not show</span>
        <p>
          The obvious table is adjudication against verdict, and it is striking: no record that
          accepts an exogenous explanation is scored <span className="mono">failed</span>.{' '}
          <strong>It is also circular.</strong> The adjudication was read from the same prose the
          verdict rests on, by the same reading — so nothing outside this corpus would have to change
          for the table to change, which makes it a statement about the corpus&rsquo;s internal
          consistency and not about India. It is left off deliberately. The rows above are checkable
          sentence by sentence against the record; a distribution the corpus produced about itself is
          not.
        </p>
      </div>
    </>
  );
}
