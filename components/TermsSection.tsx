import Link from '@/components/Link';
import { TallyGloss } from '@/components/marks';
import { assessmentCounts, ledgerInTerm } from '@/lib/data';
import { ASSESSMENT_LABELS, DOMAIN_LABELS, TERM_LABELS } from '@/lib/format';
import { DOMAINS, TERMS, type Assessment, type Domain, type Term } from '@/lib/types';

/**
 * THE ASSESSMENTS IN A FIXED ORDER, WHICH IS THE SCHEMA'S AND ENCODES NOTHING. Each takes a
 * swatch — three ink tones by three textures — and **no swatch is green or red**: a verdict
 * painted good or bad is a grade, and this site publishes none. Baseline context is not scored
 * and is not a segment.
 */
const SCORED: readonly Assessment[] = [
  'worked', 'partly', 'failed', 'reversed', 'contested', 'too-early',
  'awaiting-adjudication', 'no-objective', 'undated-commitment',
];
const SCORED_TERMS: readonly Term[] = TERMS.filter((t) => t !== 'baseline');

/**
 * THREE TERMS SIDE BY SIDE, PER SUBJECT — counts of assessments, stacked, and nothing else.
 *
 * Operator, 2026-09-02: "T1 / T2 / T3 as three stacked bars per subject, counts of assessments
 * only — the one roll-up the rules permit by name, never a grade. The most politically charged view
 * on the site, which is exactly why it must stay counts."
 *
 * ============================ WHAT A BAR'S LENGTH IS ========================================
 *
 * How many records the archive files to that term under that subject. **That is a fact about
 * research effort, not about the term** — the year page measured a subject's record count against
 * its event count at r = 0.967 — so the caption says to read a bar's composition and never its
 * length against another subject's. Within one subject the three lengths are comparable only as
 * counts of filings, and the count is printed beside each bar so the picture never has to be
 * measured by eye.
 *
 * T3 is living: its bar is provisional by construction, and the row says so.
 */
function TermBars() {
  const byTerm = new Map(SCORED_TERMS.map((t) => [t, ledgerInTerm(t)] as const));
  const rows = DOMAINS.map((d: Domain) => ({
    d,
    bars: SCORED_TERMS.map((t) => {
      const recs = byTerm.get(t)!.filter((r) => r.domains.includes(d));
      const counts = assessmentCounts(recs);
      return { t, total: recs.length, segs: SCORED.map((a) => [a, counts[a] ?? 0] as const).filter(([, n]) => n > 0) };
    }),
  })).sort((a, b) => DOMAIN_LABELS[a.d].localeCompare(DOMAIN_LABELS[b.d]));
  const max = Math.max(1, ...rows.flatMap((r) => r.bars.map((b) => b.total)));
  return (
    <div className="tb">
      <p className="tb-key mono" aria-label="Key to the segments">
        {SCORED.map((a, i) => (
          <span key={a}>
            <i className={`tb-a tb-a-${i}`} aria-hidden="true" /> {ASSESSMENT_LABELS[a].toLowerCase()}
          </span>
        ))}
      </p>
      <div className="tb-rows">
        {rows.map((r) => (
          <div key={r.d} className="tb-row">
            <p className="tb-k">
              <Link href={`/domains/${r.d}/`}>{DOMAIN_LABELS[r.d]}</Link>
            </p>
            <div className="tb-bars">
              {r.bars.map((b) => (
                <div key={b.t} className={`tb-bar${b.t === 'T3' ? ' is-living' : ''}`}>
                  <span className="tb-t mono">{b.t}</span>
                  {b.total === 0 ? (
                    <span className="tb-stack is-empty" aria-hidden="true" />
                  ) : (
                    <span className="tb-stack" style={{ width: `${(b.total / max) * 100}%` }}
                          role="img"
                          aria-label={`${b.total} records: ${b.segs.map(([a, n]) => `${n} ${ASSESSMENT_LABELS[a].toLowerCase()}`).join(', ')}`}>
                      {b.segs.map(([a, n]) => (
                        <i key={a} className={`tb-a tb-a-${SCORED.indexOf(a)}`} style={{ flexGrow: n }}
                           title={`${n} ${ASSESSMENT_LABELS[a].toLowerCase()}`} />
                      ))}
                    </span>
                  )}
                  <span className="tb-n mono">{b.total === 0 ? 'none filed' : b.total}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TermsSection() {
  return (
    <>
      <h2 id="terms">Terms of government</h2>
      <p className="lede">
        The baseline is frozen at May 2014 and carried as context, not scored. T3 is living:
        records in it are provisional by construction.
      </p>
      <div className="grid">
        {TERMS.map((term) => {
          const records = ledgerInTerm(term);
          const counts = assessmentCounts(records);
          return (
            <Link key={term} href={`/terms/${term}/`}>
              <span className="label">{term}</span>
              <span className="grid-title">{TERM_LABELS[term]}</span>
              <span className="grid-meta">
                {records.length} records
                {Object.keys(counts).length
                  ? ` · ${Object.entries(counts)
                      .map(([k, v]) => `${v} ${ASSESSMENT_LABELS[k as keyof typeof ASSESSMENT_LABELS] ?? k}`)
                      .join(' · ')}`
                  : ''}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="sec-h">
        <h3 id="terms-side-by-side">The three terms side by side, subject by subject</h3>
        <p className="sec-note">
          Each bar is the records the archive files to that term under that subject, segmented by
          assessment and printed with its count.{' '}
          <strong>
            A bar&rsquo;s length is how much of that subject has been researched into that term, not
            how the term went
          </strong>{' '}
          — read the composition of a bar, never its length against another subject&rsquo;s. No
          segment is coloured good or bad; the swatches are ink and texture only. T3&rsquo;s bars are
          living and will change.
        </p>
      </div>
      <TermBars />
      <p className="prose-note">
        No term carries a grade. Roll-ups are counts of assessments and nothing else.
      </p>
      <TallyGloss />
    </>
  );
}
