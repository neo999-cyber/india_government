import Link from 'next/link';
import type { LedgerRecord, ProvenanceRecord, Series } from '@/lib/types';
import { INDEPENDENCE_LABELS, TIER_LABELS } from '@/lib/format';
import { RecordMarks } from './marks';

/**
 * PHASE 18 §4b — "How do we know?" as an explicit control.
 *
 * WHY A CONTROL AND NOT A GESTURE. The design research proposed pulling a number open. On a phone
 * there is no hover and no drag affordance, and a disclosure nobody finds is this instrument's
 * oldest defect wearing a new coat: a thing that renders correctly and reaches no reader. So it is
 * a labelled control with a visible name.
 *
 * WHY `<details>` AND NOT A BUTTON WITH STATE. The site is a static export with no client runtime
 * on most pages. `<details>`/`<summary>` is keyboard-operable, exposes `aria-expanded` through the
 * platform, is screen-reader-announced as a disclosure, and — the deciding property — **works with
 * JavaScript disabled**. A hand-rolled button would need JS to do worse.
 *
 * WHAT IT MAY CONTAIN. Only what the record declares: sources with their tiers, the independence
 * grade, and the counts of what bears on it. **It states no verdict and adds no interpretation** —
 * it is the layer beneath a number, not a second opinion about it.
 */
export function HowDoWeKnow({
  record,
  disputes,
}: {
  record: LedgerRecord;
  disputes: ProvenanceRecord[];
}) {
  const tiers = record.sources.reduce<Record<string, number>>((m, s) => {
    m[s.tier] = (m[s.tier] ?? 0) + 1;
    return m;
  }, {});

  return (
    <details className="hdwk">
      <summary className="hdwk-summary">How do we know?</summary>
      <div className="hdwk-body">
        <p className="hdwk-line">
          <span className="label">Rests on</span> {record.sources.length}{' '}
          {record.sources.length === 1 ? 'source' : 'sources'} —{' '}
          {Object.entries(tiers)
            .sort()
            .map(([t, n], i) => (
              <span key={t}>
                {i > 0 ? ' · ' : ''}
                {n} {t} <span className="t-note">({TIER_LABELS[t as keyof typeof TIER_LABELS]})</span>
              </span>
            ))}
          .
        </p>

        {/* The grade, in the disclosure as well as beside the sources. It answers exactly the
            question the control's label asks, and a reader who opens this and does not meet it
            has been shown the artefacts and not the relationship. */}
        {record.independence ? (
          <p className="hdwk-line">
            <span className="label">Independence</span>{' '}
            {INDEPENDENCE_LABELS[record.independence]}
            {record.independence === 'intra-state'
              ? ' — one arm of the state measuring another. Better than a body scoring itself, and not the same as a source outside the state.'
              : ''}{' '}
            <Link href="/method/#independence">what this grades</Link>
          </p>
        ) : (
          <p className="hdwk-line">
            <span className="label">Independence</span> Not graded on this record.{' '}
            <Link href="/method/#independence">what this grades</Link>
          </p>
        )}

        {/* Rule 4b in the control: a record that declares an absence says so HERE too, because
            this is where a reader comes to ask what the number rests on, and for some of them the
            answer is that part of it rests on nothing. Never a count without the declarations —
            those are on the page above, in full. */}
        {(record.unmeasured ?? []).length > 0 ? (
          <p className="hdwk-line">
            <span className="label">Not measured</span> This record declares{' '}
            {record.unmeasured!.length}{' '}
            {record.unmeasured!.length === 1 ? 'thing' : 'things'} nothing measures. Each is stated
            in full above, with its reason.
          </p>
        ) : null}

        {disputes.length > 0 ? (
          <p className="hdwk-line">
            <span className="label">Disputed measurement</span>{' '}
            {disputes.map((p, i) => (
              <span key={p.id}>
                {i > 0 ? ' · ' : ''}
                <Link href={`/provenance/${p.id}/`}>{p.id}</Link>
              </span>
            ))}
          </p>
        ) : null}

        {record.assessmentNote ? (
          <p className="hdwk-line">
            <a href="#why-this-verdict">Read the reasoning behind this verdict →</a>
          </p>
        ) : (
          <p className="hdwk-line t-note">
            This record carries no stated reasoning for its verdict.
          </p>
        )}
      </div>
    </details>
  );
}

/**
 * PHASE 18 §4d.1 — the connections diagram, and it is the honest form of the rejected policy graph.
 *
 * WHAT THE REJECTED DESIGN GOT WRONG AND THIS DOES NOT. The research mock drew policy → outcome
 * edges. **The corpus holds none**: `affectsSeries` is deliberately scoped to the series a record
 * is *specifically about*, NOT everything it bears on, and inventing the rest would assert causal
 * claims — the thing declined twice, once for the counterfactual engine and once for the
 * self-audit records. Every edge below is a field that exists in `/data`.
 *
 * AND POSITION MEANS SOMETHING HERE, WHICH IS WHY IT IS COLUMNS AND NOT A FORCE LAYOUT. In a
 * force-directed graph the distance between two nodes is an artefact of a simulation, and
 * CLAUDE.md forbids encoding what has no defensible meaning. Here the column IS the relation type
 * — what the record rests on, what it is, what it reaches — and nothing else is encoded. No
 * distance, no area, no opacity.
 *
 * It is HTML and links, not SVG: every node is a real anchor, reachable by keyboard and readable
 * by a screen reader in document order. On a phone the three columns stack.
 */
export function RestsOn({
  record,
  series,
  disputes,
}: {
  record: LedgerRecord;
  series: Series[];
  disputes: ProvenanceRecord[];
}) {
  const bySeam = disputes.filter((p) =>
    series.some((s) => s.breaks?.some((b) => b.provenanceRef === p.id)),
  );

  return (
    <div className="rests-on">
      <div className="rests-col">
        <span className="label">Rests on</span>
        <ul className="rests-list">
          {record.sources.map((s) => (
            <li key={`${s.name}-${s.url}`}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.name}
              </a>
              <span className="rests-edge">tier {s.tier}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rests-col rests-centre">
        <span className="label">This record</span>
        <p className="rests-node">{record.title}</p>
        <span className="rests-edge">
          {record.id} · {record.type}
        </span>
      </div>

      <div className="rests-col">
        <span className="label">Reaches</span>
        {series.length === 0 && disputes.length === 0 ? (
          <p className="t-note">
            This record cites no series and no measurement dispute bears on it.
          </p>
        ) : null}
        <ul className="rests-list">
          {series.map((s) => (
            <li key={s.id}>
              <Link href={`/series/${s.id}/`}>{s.title}</Link>
              {/* THIS IS A LISTING, SO RULE 4b BINDS IT — and `listing-marks` said so before a
                  reader ever saw it. The first build of this diagram linked 265 series rows and
                  carried the caveat and absence marks on none of them: a new surface reproducing
                  the exact defect A-4 was opened to fix, caught by the gate written for A-4. */}
              <RecordMarks record={s} />
              <span className="rests-edge">
                cites this series
                {s.breaks?.length ? ` · ${s.breaks.length} declared seam${s.breaks.length > 1 ? 's' : ''}` : ''}
              </span>
            </li>
          ))}
          {disputes.map((p) => (
            <li key={p.id}>
              <Link href={`/provenance/${p.id}/`}>{p.title}</Link>
              <span className="rests-edge">
                measurement dispute
                {bySeam.some((x) => x.id === p.id) ? ' · marks a seam in a series above' : ''}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
