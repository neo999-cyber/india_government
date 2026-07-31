import Link from 'next/link';
import type { Metadata } from 'next';
import { allUnmeasured } from '@/lib/data';
import { DOMAIN_LABELS } from '@/lib/format';

export const metadata: Metadata = { title: 'Unmeasured' };

/**
 * Every declared absence in one place, and the verification queue that falls out of them.
 *
 * Each `unmeasured` entry is authored on the record it belongs to, which is right — the
 * judgement that something was never measured is part of researching that record. But read
 * one at a time they are footnotes, and read together they are a map of what the instrument
 * cannot show and why. The `wouldFill` values are the useful accident: nobody sat down to
 * write a verification queue, and yet one exists, assembled from individual research calls.
 *
 * This page states absences and does not rank them. There is no count of "gaps closed", no
 * completeness percentage, nothing that could be read as a score — the same rule that forbids
 * a verdict number for a term forbids one for the instrument's own coverage.
 */
export default function UnmeasuredIndex() {
  const all = allUnmeasured();
  const records = new Set(all.map((a) => a.recordId));
  const withRoute = all.filter((a) => a.entry.wouldFill);
  const withoutRoute = all.filter((a) => !a.entry.wouldFill);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / unmeasured
      </p>
      <h1>What is not measured</h1>
      <p className="lede">
        Dimensions the instrument should be able to show and cannot, declared on the records
        that need them. These are not sparse periods — a blank cell means unreported this
        period, and a <span className="mono">pending</span> point means a figure is coming.
        These are things nothing measures at all: a missing link in a chain, an intended
        outcome no study tested, a series stopping short of what it is cited to demonstrate.
      </p>
      <p className="prose-note">
        {all.length} declaration{all.length === 1 ? '' : 's'} across {records.size} record
        {records.size === 1 ? '' : 's'}.{' '}
        {withoutRoute.length === 0
          ? `All ${all.length} name a source that would close them.`
          : `${withRoute.length} of ${all.length} name a source that would close them.`}{' '}
        The list is not scored and not ranked: an absence is a finding, not a defect to be
        burned down.
      </p>

      <h2>Declared absences</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Record</th>
              <th>Not measured</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            {all.map((a) => (
              <tr key={`${a.recordId}-${a.entry.what}`}>
                <td>
                  <Link href={a.href}>{a.recordTitle}</Link>
                  <br />
                  <span className="t-note mono">
                    {a.recordId} · {a.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}
                  </span>
                </td>
                <td>{a.entry.what}</td>
                <td className="t-note">{a.entry.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Verification queue</h2>
      <p className="prose-note">
        Where a source has been identified that would close the absence. This is a research
        queue rather than a backlog — several of these depend on a survey being conducted or a
        dashboard field being published, neither of which is in the instrument&rsquo;s gift.
      </p>
      {withRoute.length === 0 ? (
        <p className="prose-note">No declared absence names a source that would close it.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Would close</th>
                <th>The absence it closes</th>
                <th>Record</th>
              </tr>
            </thead>
            <tbody>
              {withRoute.map((a) => (
                <tr key={`fill-${a.recordId}-${a.entry.what}`}>
                  <td>{a.entry.wouldFill}</td>
                  <td className="t-note">{a.entry.what}</td>
                  <td className="mono t-note">
                    <Link href={a.href}>{a.recordId}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {withoutRoute.length > 0 ? (
        <>
          <h2>No identified route</h2>
          <p className="prose-note">
            Declared absences with no source named that would close them. Not an oversight
            necessarily — some things are unmeasured because no instrument for them exists —
            but worth revisiting when a domain is next researched.
          </p>
          <ul>
            {withoutRoute.map((a) => (
              <li key={`none-${a.recordId}-${a.entry.what}`}>
                {a.entry.what} — <Link href={a.href}>{a.recordId}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className="stub">
        <span className="label">Scaffold</span>
        Absences are declared per record and collected here. They are deliberately not counted
        against a target or rendered as a completeness figure: a share of dimensions measured
        would be a composite score of exactly the kind the instrument refuses everywhere else.
      </div>
    </>
  );
}
