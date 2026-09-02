'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { YearBrief } from '@/components/YearBrief';
import type { LandscapeSubject } from '@/lib/landscape';

/**
 * ONE SUBJECT, YEAR BY YEAR — a row of the landing picture, on the subject's own page.
 *
 * Operator, 2026-09-02: "a subject timeline on every topic page … each year a cell with that
 * year's filing marks, seam stops in red, and whether the lead indicator reported. Click a year →
 * the brief for that subject and year, the same component the landing page uses."
 *
 * ============================ WHAT A CELL ENCODES, AND WHAT IT DOES NOT ======================
 *
 * One square per record dated in the year (nine, then a plus); the count of series reporting; a
 * red stop where any series of the subject changes basis; a filled dot where the lead reported.
 * **Nothing in a cell is scaled to anything in another cell** — no bar heights, no colour
 * intensity — because a subject's record count is a picture of how much has been researched into
 * it, not of what happened (measured on the year page: r = 0.967 against events). The cells are
 * read one at a time, and the brief beneath is what a cell opens into.
 *
 * ============================ WITHOUT SCRIPT =================================================
 *
 * Every cell is a real link to its year page, and `id="y-<year>"` on each makes `#y-2019` a place
 * on this page — which is how the year page's strip lands here. Script turns the first press into
 * a selection that fills the brief; a keyboard activation (`detail === 0`) opens the year page at
 * once, exactly as the landing pins do, because such a reader has already selected by focusing.
 */
const subscribeHash = (cb: () => void) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};

export function SubjectTimeline({ subject, years }: { subject: LandscapeSubject; years: readonly number[] }) {
  const [choice, setChoice] = useState<number | null | undefined>(undefined);
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => '');
  const m = /^#y-(\d{4})$/.exec(hash);
  const linked = m && years.includes(Number(m[1])) ? Number(m[1]) : null;
  const year = choice === undefined ? linked : choice;
  useEffect(() => {
    if (year !== null && window.location.hash !== `#y-${year}`) history.replaceState(null, '', `#y-${year}`);
  }, [year]);

  return (
    <div className="stl">
      <p className="stl-label">
        <strong>{subject.label}, year by year</strong>
        <span className="mono">
          one cell a year · a square per filing · a red stop where a series changes basis · a dot
          where the lead reported
        </span>
      </p>
      <ol className="stl-row">
        {years.map((y, i) => {
          const c = subject.years[i];
          const leadOn = subject.lead?.points.some((p) => p[0] === y) ?? false;
          const empty = c.reporting === 0 && c.records === 0;
          const on = year === y;
          return (
            <li key={y} className={`stl-cell${on ? ' is-on' : ''}${empty ? ' is-empty' : ''}`}>
              <a
                id={`y-${y}`}
                href={`/years/${y}/`}
                aria-current={on ? 'true' : undefined}
                aria-label={`${y}: ${c.reporting} series reported, ${c.records} filings, ${c.seams} change${c.seams === 1 ? '' : 's'} of basis${leadOn ? ', lead reported' : ''}`}
                onClick={(e) => {
                  if (e.detail === 0) return;
                  e.preventDefault();
                  setChoice(on ? null : y);
                }}
              >
                <span className="stl-y mono">{y}</span>
                <span className="stl-marks" aria-hidden="true">
                  {Array.from({ length: Math.min(c.records, 9) }).map((_, k) => (
                    <i key={k} />
                  ))}
                  {c.records > 9 ? <b>+</b> : null}
                </span>
                <span className="stl-rep mono" aria-hidden="true">
                  {c.reporting ? `${c.reporting} ser.` : '—'}
                </span>
                <span className="stl-foot" aria-hidden="true">
                  {c.seams ? <span className="stl-seam" /> : null}
                  {subject.lead ? <span className={`stl-lead${leadOn ? ' is-on' : ''}`} /> : null}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
      <div className="lsc-brief stl-brief" aria-live="polite">
        <YearBrief window={year === null ? null : { from: year, to: year }} subject={subject} years={years} />
      </div>
    </div>
  );
}
