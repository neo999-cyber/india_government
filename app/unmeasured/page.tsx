import Link from 'next/link';
import type { Metadata } from 'next';
import { allUnmeasured } from '@/lib/data';
import { DOMAIN_LABELS } from '@/lib/format';
import { REASON_KINDS } from '@/lib/types';
import { REASON_KIND_LABELS } from '@/components/marks';
import { routeLabel } from '@/lib/routes';
import { SectionNav } from '@/components/SectionNav';

// The tab title is the registry's public name, not a fourth copy of it. Was: 'Unmeasured'.
export const metadata: Metadata = { title: routeLabel('/unmeasured/') };

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
  const disputed = all.filter((a) => a.entry.reasonDisputed);
  const byKind = Object.fromEntries(
    REASON_KINDS.map((k) => [k, all.filter((a) => a.entry.reasonKind === k)]),
  ) as Record<(typeof REASON_KINDS)[number], typeof all>;

  return (
    <>
      <p className="crumb">
        <Link prefetch={false} href="/">instrument</Link> / what is not measured
      </p>
      <h1 className="page-lead">What is not measured</h1>
      <p className="lede">
        Dimensions the instrument should be able to show and cannot, declared on the records
        that need them. These are not sparse periods — a blank cell means unreported this
        period, and a <span className="mono">pending</span> point means a figure is coming.
        These are things nothing measures at all: a missing link in a chain, an intended
        outcome no study tested, a series stopping short of what it is cited to demonstrate.
      </p>
      <SectionNav section="gaps" />
      <p className="prose-note">
        {all.length} declaration{all.length === 1 ? '' : 's'} across {records.size} record
        {records.size === 1 ? '' : 's'}.{' '}
        {withoutRoute.length === 0
          ? `All ${all.length} name a source that would close them.`
          : `${withRoute.length} of ${all.length} name a source that would close them.`}{' '}
        The list is not scored and not ranked: an absence is a finding, not a defect to be
        burned down.
      </p>
      {/* THE 82 WITH NO ROUTE, NAMED AS A CLASS. The line above has always said how many DO name a
          source; the ones that do not were left as the remainder, and they are the harder finding.
          An absence nobody can close is a different object from one waiting on a request: the first
          is a statement about what can be known, the second about what has been asked. */}
      {withoutRoute.length > 0 ? (
        <p className="prose-note">
          <strong>{withoutRoute.length} name no route at all</strong>, and they are a different
          object from the {withRoute.length} that do. An absence waiting on a request is a statement
          about what has been asked for; an absence with no route is a statement about what can be
          known — no instrument exists, or the settling fact is unobservable while the practice
          stands. They are listed below with the rest and marked{' '}
          <span className="mono">no route</span> rather than pulled into a section of their own,
          because the kind is still the taxonomy that pays.
        </p>
      ) : null}

      {/* Grouping pays here rather than on a record, where there are one to three entries.
          Across the dataset the taxonomy is the point: a body declining to keep a record is
          a different finding from a quantity nobody has got round to. */}
      <p className="prose-note">
        By kind:{' '}
        {REASON_KINDS.filter((k) => byKind[k]?.length).map((k, i) => (
          <span key={k}>
            {i > 0 ? ' · ' : ''}
            <strong>{byKind[k].length}</strong> {REASON_KIND_LABELS[k]}
          </span>
        ))}
        .
        {disputed.length > 0 ? (
          <>
            {' '}
            Of those, <strong>{disputed.length}</strong>{' '}
            {disputed.length === 1 ? 'has' : 'have'} a stated reason that is contradicted — an
            overlay on the kinds above, not a further kind.
          </>
        ) : null}
      </p>

      {disputed.length > 0 ? (
        <div className="caveat-block">
          <span className="label">Stated reason contradicted</span>
          <p>
            {disputed.length === 1
              ? 'One absence records a reason'
              : `${disputed.length} absences record reasons`}{' '}
            that the same government&rsquo;s own evidence contradicts. The kind shown is what
            the responsible body stated; it is not a finding that the statement is true. Where an absence carries a consequence — a denial of compensation resting on
            a claim that no record exists — the contradiction is the finding.
          </p>
          <ul>
            {disputed.map((a) => (
              <li key={`${a.recordId}-${a.entry.what}`}>
                {a.entry.what} — <Link prefetch={false} href={a.href}>{a.recordId}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <h2 id="declared-absences">Declared absences</h2>
      <div className="table-wrap" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th scope="col">Record</th>
              <th scope="col">Kind</th>
              <th scope="col">Not measured</th>
              <th scope="col">Why</th>
            </tr>
          </thead>
          <tbody>
            {all.map((a) => (
              <tr key={`${a.recordId}-${a.entry.what}`}>
                <td>
                  <Link prefetch={false} href={a.href}>{a.recordTitle}</Link>
                  <br />
                  <span className="t-note mono">
                    {a.recordId} · {a.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}
                  </span>
                </td>
                <td className="t-note mono">
                  {a.entry.reasonKind ? REASON_KIND_LABELS[a.entry.reasonKind] : '—'}
                  {a.entry.reasonDisputed ? (
                    <span className="absence-kind" style={{ color: 'var(--alert)' }}>
                      stated reason disputed
                    </span>
                  ) : null}
                  {/* The 82 with no route, marked where a reader meets the entry rather than only
                      counted in the lede. An absence nobody can close is a different object from
                      one waiting on a request. */}
                  {a.entry.wouldFill ? null : <span className="absence-kind">no route</span>}
                </td>
                <td>{a.entry.what}</td>
                <td className="t-note">{a.entry.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="verification-queue">Verification queue</h2>
      <p className="prose-note">
        Where a source has been identified that would close the absence. This is a research
        queue rather than a backlog — several of these depend on a survey being conducted or a
        dashboard field being published, neither of which is in the instrument&rsquo;s gift.
      </p>
      {withRoute.length === 0 ? (
        <p className="prose-note">No declared absence names a source that would close it.</p>
      ) : (
        <div className="table-wrap" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">Would close</th>
                <th scope="col">The absence it closes</th>
                <th scope="col">Record</th>
              </tr>
            </thead>
            <tbody>
              {withRoute.map((a) => (
                <tr key={`fill-${a.recordId}-${a.entry.what}`}>
                  <td>{a.entry.wouldFill}</td>
                  <td className="t-note">{a.entry.what}</td>
                  <td className="mono t-note">
                    <Link prefetch={false} href={a.href}>{a.recordId}</Link>
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
                {a.entry.what} — <Link prefetch={false} href={a.href}>{a.recordId}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className="stub">
        <span className="label">How this page works</span>
        Absences are declared per record and collected here. They are deliberately not counted
        against a target or rendered as a completeness figure: a share of dimensions measured
        would be a composite score of exactly the kind the instrument refuses everywhere else.
      </div>
    </>
  );
}
