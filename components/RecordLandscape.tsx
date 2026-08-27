'use client';
import { useState } from 'react';
// PLATE from the pure module; the subject TYPE only, so no data module reaches the browser.
import { PLATE } from '@/lib/landscape-plate';
import type { LandscapeSubject } from '@/lib/landscape';

/**
 * THE LANDING PICTURE A READER ENTERS THROUGH.
 *
 * ============================ WHY THIS OWNS THE HEADLINE ROW TOO =============================
 *
 * It renders the intro column AND the readout beside it, because the readout is not decoration: it
 * is where a hovered landmark says what it is. Splitting them would put the state in one component
 * and the panel in another for no gain.
 *
 * **The readout is also what lets the fourteen labels stay to a single word.** An earlier version
 * carried "54 series · 21 records" under every pill — fourteen two-line captions competing with the
 * picture. The counts moved here, where there is room for them and only one is ever shown.
 *
 * ============================ WHAT IS A CLAIM AND WHAT IS NOT ================================
 *
 * The plate is invented terrain. **It is not a map and the caption says so**, in the same breath as
 * the thing it does encode: one mark per filing, in a patch of fixed size, so density is real and
 * position is not. That is the constellation's own settlement, reused.
 *
 * `<a>` inside SVG is a real link: every landmark and every label opens its subject, with or
 * without script. The hover state is an enhancement on top and nothing depends on it.
 */

type Props = {
  subjects: LandscapeSubject[];
  /**
   * THE CORPUS'S OWN TOTALS, PASSED IN — NOT SUMMED FROM THE SUBJECTS.
   * **WITHDRAWN: a `total.records` accumulated across the fourteen**, which read 433 against a
   * corpus of 223, because a record filed under three subjects was counted three times. The
   * per-subject figure is correct per subject and is not a total; adding them up is the defect
   * rule 4b forbids one level down. The filing marks have the same shape and are never summed here
   * or anywhere else.
   */
  totals: { series: number; records: number };
  children: React.ReactNode;
};

/** Pills, laid out under their landmark and pushed clear of each other. Pure, so it is stable. */
function labelLayout(subjects: LandscapeSubject[]) {
  const out = subjects.map((s) => ({
    key: s.key, label: s.label, ax: s.cx, ay: s.baseY + 2,
    x: s.cx, y: s.baseY + 16, w: s.label.length * 7.6 + 30, h: 26,
  }));
  out.sort((a, b) => a.y - b.y);
  for (let i = 0; i < out.length; i++)
    for (let j = 0; j < i; j++) {
      const A = out[i], B = out[j];
      if (Math.abs(A.x - B.x) < (A.w + B.w) / 2 + 8 && Math.abs(A.y - B.y) < 34) A.y = B.y + 36;
    }
  return out;
}

export function RecordLandscape({ subjects, totals, children }: Props) {
  const [hot, setHot] = useState<string | null>(null);
  const current = hot ? subjects.find((s) => s.key === hot) ?? null : null;
  const labels = labelLayout(subjects);
  const drawn = [...subjects].sort((a, b) => a.baseY - b.baseY);

  return (
    <>
      <div className="lsc-head">
        <div>{children}</div>
        <div className="lsc-read" aria-live="polite">
          <p className="lsc-read-eyebrow mono">{current ? 'Subject' : 'The archive'}</p>
          <p className="lsc-read-name">{current ? current.label : `${subjects.length} subjects, one landscape`}</p>
          <div className={`lsc-read-stats${current ? ' is-two' : ''}`}>
            {current ? (
              <>
                <span><b>{current.series}</b><i>series</i></span>
                <span><b>{current.records}</b><i>records</i></span>
              </>
            ) : (
              <>
                <span><b>{totals.series}</b><i>series</i></span>
                <span><b>{totals.records}</b><i>records</i></span>
              </>
            )}
          </div>
          <p className="lsc-read-foot mono">
            {current
              ? `${current.filings} filings marked${current.from ? ` · record begins ${current.from}` : ''}`
              : 'Point at a landmark to read its subject here'}
          </p>
        </div>
      </div>

      <div className={`lsc${hot ? ' is-dimmed' : ''}`}
           onPointerLeave={() => setHot(null)} onBlur={() => setHot(null)}>
        <p className="lsc-label">
          <strong>Choose a subject</strong>
          <span className="mono">
            {subjects.length} subjects · one mark per filing · invented terrain, not a map
          </span>
        </p>
        <svg viewBox={`0 0 ${PLATE.w} ${PLATE.h}`} className="lsc-svg"
             role="img" aria-label="An invented landscape with one landmark for each subject of the archive">
          <defs>
            <filter id="lsc-soft" x="-70%" y="-70%" width="240%" height="240%">
              <feGaussianBlur stdDeviation="4.5" />
            </filter>
          </defs>
          <image href={PLATE.src} x="0" y="0" width={PLATE.w} height={PLATE.h} />
          {drawn.map((s) => {
            const sw = s.w * 0.26;
            return (
              <g key={s.key} className={`lsc-lm${hot === s.key ? ' is-hot' : ''}`} data-k={s.key}>
                <ellipse className="lsc-shadow" cx={s.cx} cy={s.baseY - 3} rx={sw} ry={sw * 0.34}
                         filter="url(#lsc-soft)" />
                {s.marks.map((m, i) => (
                  <circle key={i} className="lsc-fm" cx={m.x} cy={m.y} r={1.9} />
                ))}
                <image className="lsc-art" href={`/landscape/${s.art}.webp`}
                       x={s.cx - s.w / 2} y={s.baseY - s.h} width={s.w} height={s.h} />
              </g>
            );
          })}
          {labels.map((L) => {
            const s = subjects.find((x) => x.key === L.key)!;
            return (
              <a key={L.key} className={`lsc-mk${hot === L.key ? ' is-hot' : ''}`} data-k={L.key}
                 href={`/domains/${L.key}/`}
                 aria-label={`${L.label} — ${s.series} series, ${s.records} records`}
                 onPointerEnter={() => setHot(L.key)} onFocus={() => setHot(L.key)}>
                <rect className="lsc-hit" x={L.x - L.w / 2 - 5} y={L.y - 5} width={L.w + 10} height={L.h + 10} rx={18} />
                {Math.abs(L.y - L.ay) > 10 ? (
                  <line className="lsc-stem" x1={L.ax} y1={L.ay} x2={L.x} y2={L.y + 2} />
                ) : null}
                <circle className="lsc-dot" cx={L.ax} cy={L.ay} r={3} />
                <g className="lsc-pill" transform={`translate(${L.x - L.w / 2},${L.y})`}>
                  <rect className="lsc-bg" width={L.w} height={L.h} rx={13} />
                  <text className="lsc-t" x={L.w / 2} y={17} textAnchor="middle">{L.label}</text>
                </g>
              </a>
            );
          })}
        </svg>
      </div>
    </>
  );
}
