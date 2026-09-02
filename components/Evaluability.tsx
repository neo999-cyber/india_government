import Link from '@/components/Link';
import { ledger } from '@/lib/data';
import { DOMAIN_LABELS } from '@/lib/format';
import { DOMAINS } from '@/lib/types';

/**
 * PHASE 18 §4c — EVALUABILITY, AND THE LABEL CARRIES THE ENTIRE RULING.
 *
 * ============================ THE WORDING RULE =================================================
 *
 * PERMITTED, and the heading below is exactly this:
 *     "Where outcome evaluation was possible — in these records"
 * Also permitted: "Records with evaluable outcomes" · "What this record set can establish".
 *
 * FORBIDDEN, recorded verbatim so a later edit cannot drift back into it:
 *     "how much is measurable"
 *     "some parts of Indian policy can be measured"
 *     — or ANY phrasing asserting a property of Indian policy rather than of this record set.
 *
 * WHY, AND IT IS NOT A LABEL FIX. **The denominator is this corpus's own selection, and selection
 * bias is permanently open.** Nobody has established which government claims were never entered,
 * and — the part that makes it permanent — **no quantity of additional records makes the sample a
 * known one.** A chart implying *"this is how much of Indian policy is measurable"* would make a
 * claim about the world from a sample of unknown construction. The bars are a fact about 223
 * records. They are not a fact about India.
 *
 * ============================ WHAT A GATE CAN AND CANNOT BIND ==================================
 *
 * `tools/evaluability-wording.mjs` binds the LITERAL forbidden strings against built output, and
 * that is the whole of what any gate can reach here. **It cannot bind the claim.** A rewrite that
 * asserts a property of Indian policy without using one of the listed phrases passes every check
 * there is — the prose-shadow class exactly, where the defect is semantic and the guard is lexical.
 * So the rule lives in three places that must agree and only one of which is enforceable: this
 * comment, §4c of the scope, and the gate. The gate's own header says the same thing about itself.
 *
 * ============================ THE ENCODING =====================================================
 *
 * Bar length is the share of a domain's records that reached a verdict on an outcome. That is a
 * defensible quantity computed from the corpus (rule 7). Nothing else is encoded — no colour by
 * performance, no area, no ordering by anything but the value itself.
 */

/** A record "reached a verdict on an outcome" iff its assessment is one of these four. */
const EVALUATED = new Set(['worked', 'partly', 'failed', 'reversed']);

export function Evaluability() {
  const rows = DOMAINS.map((d) => {
    const rs = ledger.filter((l) => l.domains.includes(d));
    const ev = rs.filter((l) => EVALUATED.has(l.assessment)).length;
    const reform = rs.filter((l) => l.type === 'reform').length;
    return {
      d,
      n: rs.length,
      ev,
      pct: rs.length ? (100 * ev) / rs.length : 0,
      reformPct: rs.length ? (100 * reform) / rs.length : 0,
    };
  })
    .filter((r) => r.n > 0)
    .sort((a, b) => b.pct - a.pct);

  // Spearman, computed here rather than carried. The scope recorded 0.91 when it was written; a
  // rate quoted from memory is the deferral defect this corpus has paid for more than once.
  const rank = (xs: number[]) => {
    const sorted = [...xs].sort((a, b) => a - b);
    return xs.map((x) => sorted.indexOf(x) + 1);
  };
  const rr = rank(rows.map((r) => r.reformPct));
  const re = rank(rows.map((r) => r.pct));
  const n = rows.length;
  const d2 = rr.reduce((t, x, i) => t + (x - re[i]) ** 2, 0);
  const rho = 1 - (6 * d2) / (n * (n * n - 1));

  return (
    <section className="evalview">
      {/* THE HEADING IS THE RULING. Changing it is changing what the chart claims. */}
      <h2>Where outcome evaluation was possible — in these records</h2>

      <p>
        Not every record can be checked against an outcome. Some announce a target that later
        evidence can be held against; many are institutional practice, a statutory duty or a
        one-off episode, where there is no stated objective to score. The bars show, for each
        topic, <strong>the share of the records held here that reached a verdict on an
        outcome</strong>.
      </p>

      <p className="evalview-limit">
        <strong>This is a fact about these records, not about Indian policy.</strong> Which
        government claims were never entered into this corpus has not been established, and no
        amount of further research makes that sample a known one. The bars cannot tell you how much
        of what the Indian state does is measurable; they can tell you how much of what is written
        down here could be scored.
      </p>

      <div className="evalbars">
        {rows.map((r) => (
          <div key={r.d} className="evalbar">
            <span className="evalbar-name">
              <Link href={`/domains/${r.d}/`}>{DOMAIN_LABELS[r.d]}</Link>
            </span>
            <span className="evalbar-track">
              <span className="evalbar-fill" style={{ width: `${r.pct}%` }} />
            </span>
            <span className="evalbar-value">
              {r.ev}
              <span className="t-note">/{r.n}</span>
            </span>
          </div>
        ))}
      </div>

      <p className="prose-note">
        <span className="label">What the low bars are mostly about</span> Across the{' '}
        {rows.length} subject areas, the share of records that are announced <em>reforms</em> and
        the share that could be scored move together almost exactly — Spearman&rsquo;s ρ ={' '}
        {rho.toFixed(2)}. So a short bar is largely a fact about what that area{' '}
        <strong>contains</strong> — institutional practice and constitutional duty rather than
        announced programmes — and not about reticence in scoring it. Defence has ten records here
        and none of them announces a target.
      </p>

      <p className="prose-note">
        The clearest departures from that pattern run in both directions: education is scored more
        than its composition predicts, and external-sector and macroeconomic records less.{' '}
        <Link href="/questions/">Browse the questions these records can and cannot answer</Link>.
      </p>
    </section>
  );
}
