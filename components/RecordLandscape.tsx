'use client';
import { useRef, useState } from 'react';
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

/**
 * PINS, IN PERCENT OF THE PLATE — because the labels are HTML over the picture, not SVG inside it.
 *
 * **WITHDRAWN: pills drawn inside the `<svg>`.** Text in an SVG scales with the viewBox, so the
 * label rendered at 9.6px on a 1280px desktop, 6.5px at 884, and 4.9px on a Fold's inner screen —
 * and was hidden outright below 768px, which left that screen a still picture with no labels and no
 * interaction at all. Measured across ten widths before this was rewritten.
 *
 * As HTML the pin takes CSS pixels: one size at every viewport, a real tap target, and a real link.
 */
function pinLayout(subjects: LandscapeSubject[]) {
  const out = subjects.map((s) => ({
    key: s.key, label: s.label,
    // the landmark's own base, and the pin's resting place just below it
    ax: s.cx, ay: s.baseY + 2, x: s.cx, y: s.baseY + 16,
    w: s.label.length * 7.6 + 30,
  }));
  out.sort((a, b) => a.y - b.y);
  for (let i = 0; i < out.length; i++)
    for (let j = 0; j < i; j++) {
      const A = out[i], B = out[j];
      if (Math.abs(A.x - B.x) < (A.w + B.w) / 2 + 8 && Math.abs(A.y - B.y) < 34) A.y = B.y + 36;
    }
  return out.map((o) => ({
    key: o.key, label: o.label,
    left: (o.x / PLATE.w) * 100, top: (o.y / PLATE.h) * 100,
    dotLeft: (o.ax / PLATE.w) * 100, dotTop: (o.ay / PLATE.h) * 100,
  }));
}

export function RecordLandscape({ subjects, totals, children }: Props) {
  const [hot, setHot] = useState<string | null>(null);
  /* A click event is not necessarily a PointerEvent, so the pointer TYPE is recorded on pointerdown
     and read on click. Reading it off the click's own native event does not typecheck, and would be
     undefined for a keyboard-activated click in any case. */
  const lastPointer = useRef<string>('mouse');
  /**
   * THE TWO-STEP NEEDS ITS OWN STATE, AND THIS IS THE SECOND TIME THAT LESSON HAS BEEN PAID FOR.
   * **WITHDRAWN: a click test of `hot !== P.key`.** Tapping a link FOCUSES it, and `onFocus` runs
   * before `onClick` — so the tap set `hot` to its own subject, the click then read itself as
   * already-selected, and the first tap navigated. Exactly the bug the two-step exists to prevent.
   * `tapped` is written by a tap and by nothing else.
   */
  const tapped = useRef<string | null>(null);
  const current = hot ? subjects.find((s) => s.key === hot) ?? null : null;
  const pins = pinLayout(subjects);
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
           /* ON TOUCH, `pointerleave` FIRES THE MOMENT THE FINGER LIFTS. Clearing the tap state
              there disarmed the two-step between the first tap and the second, so the second tap
              behaved as another first and the subject never opened. A mouse leaving really has
              left, so it still clears. A touch selection is cleared by tapping elsewhere. */
           onPointerLeave={(e) => {
             if (e.pointerType === 'touch') return;
             tapped.current = null;
             setHot(null);
           }}
           onBlur={() => { tapped.current = null; setHot(null); }}>
        <p className="lsc-label">
          <strong>Choose a subject</strong>
          <span className="mono">
            {subjects.length} subjects · one mark per filing · invented terrain, not a map
          </span>
        </p>
        {/* The pins are positioned in percent of the PLATE, so they must overlay exactly the
            picture's box and nothing else — hence a frame around the two of them. */}
        <div className="lsc-frame">
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
        </svg>

        {/* THE PINS. Fixed-size HTML over the picture, so the label is the same size on a phone,
            a folding tablet and a desktop. Below 900px only the dot shows and the name arrives in
            the readout instead — fourteen full labels do not fit a narrow picture at a legible
            size, and shrinking them to fit is what this rewrite exists to stop. */}
        <div className="lsc-pins">
          {pins.map((P) => (
            <a
              key={P.key}
              className={`lsc-pin${hot === P.key ? ' is-hot' : ''}`}
              data-k={P.key}
              href={`/domains/${P.key}/`}
              style={{ left: `${P.left}%`, top: `${P.top}%` }}
              aria-label={`${P.label} — ${subjects.find((s) => s.key === P.key)!.series} series, ${subjects.find((s) => s.key === P.key)!.records} records`}
              onPointerEnter={(e) => { if (e.pointerType !== 'touch') setHot(P.key); }}
              onFocus={() => setHot(P.key)}
              // Both: some touch environments deliver touchstart without a pointerdown, and the
              // two-step then never arms — the first tap navigates and the readout is never seen.
              onPointerDown={(e) => { lastPointer.current = e.pointerType; }}
              onTouchStart={() => { lastPointer.current = 'touch'; }}
              onClick={(e) => {
                /* TOUCH HAS NO HOVER, so a tap went straight to the subject and a phone reader
                   never saw the readout at all. First tap selects, second opens. A mouse is
                   unaffected: it has already selected on hover by the time it clicks. */
                if (lastPointer.current === 'touch' && tapped.current !== P.key) {
                  e.preventDefault();
                  tapped.current = P.key;
                  setHot(P.key);
                }
              }}
            >
              <span className="lsc-pin-dot" aria-hidden="true" />
              <span className="lsc-pin-t">{P.label}</span>
            </a>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}
