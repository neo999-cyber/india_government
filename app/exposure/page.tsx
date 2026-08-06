import Link from 'next/link';
import type { Metadata } from 'next';
import { ledger } from '@/lib/data';
import { ASSESSMENT_LABELS, DOMAIN_LABELS } from '@/lib/format';
import { EXPOSURE_ADJUDICATIONS } from '@/lib/types';
import type { ExposureAdjudication, LedgerRecord, ShockExposure } from '@/lib/types';
import { EXPOSURE_ADJUDICATION_LABELS, EXPOSURE_ROLE_LABELS } from '@/components/marks';

export const metadata: Metadata = { title: 'Exposure — what the corpus does with an exogenous defence' };

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

type Row = { record: LedgerRecord; entry: ShockExposure };

function rows(records: LedgerRecord[], want: (a: ExposureAdjudication) => boolean): Row[] {
  return records.flatMap((record) =>
    (record.shockExposure ?? [])
      .filter((entry) => entry.adjudication && want(entry.adjudication))
      .map((entry) => ({ record, entry })),
  );
}

function Table({ items }: { items: Row[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Record</th>
            <th>Verdict</th>
            <th>Event</th>
            <th>What the record says</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ record, entry }, i) => (
            <tr key={`${record.id}-${i}`}>
              <td>
                <Link href={`/ledger/${record.id}/`}>{record.title}</Link>
                <br />
                <span className="t-note mono">
                  {record.id} · {record.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}
                </span>
              </td>
              <td className="t-note">{ASSESSMENT_LABELS[record.assessment]}</td>
              <td className="t-note mono">
                {entry.event}
                <span className="absence-kind">
                  {EXPOSURE_ADJUDICATION_LABELS[entry.adjudication!]}
                </span>
              </td>
              <td className="t-note">{entry.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ExposureIndex() {
  const declaring = ledger.filter((l) => (l.shockExposure ?? []).length > 0);
  const entries = declaring.flatMap((l) => l.shockExposure ?? []);
  const refusing = rows(declaring, (a) => REFUSING.includes(a));
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
      <p className="crumb">
        <Link href="/">instrument</Link> / exposure
      </p>
      <h1>Exposure — what the corpus does with an exogenous defence</h1>
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

      <h2>Refused, or accepted only in part — {refusing.length} entries</h2>
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
      <Table items={refusing} />

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
