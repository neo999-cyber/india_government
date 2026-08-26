'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { TwoInstruments } from './TwoInstruments';
import type { Point } from '@/lib/types';
import { motionReduced, subscribeMotion } from '@/lib/reading-prefs';

/**
 * PHASE 18 §11.3 — the ONE scroll-controlled passage, and the discipline around it.
 *
 * WHEN SCROLL IS EARNED. §2c: use it where the SEQUENCE itself helps the reader understand
 * causality, chronology or scale — never as the default page structure. It is earned here for one
 * reason: the divergence between two instruments only lands if the reader meets the first line,
 * forms an impression from it, and THEN meets the second. Showing both at once shows a
 * disagreement; showing them in order shows *why anyone believed either*.
 *
 * THE PROGRESSIVE-ENHANCEMENT DECISION, AND IT IS THE WHOLE DESIGN. **Everything is visible by
 * default and JavaScript only DIMS.** Not the other way round. So:
 *   - with JS disabled, the reader gets the entire passage as ordinary prose and both lines;
 *   - with reduced motion — the system preference OR this site's own Reading switch — the
 *     observer is never attached and nothing dims;
 *   - on a slow phone, the content is readable before any script runs;
 *   - a scraped, printed or forwarded copy is complete.
 *
 * Reveal-on-scroll — the usual implementation — inverts every one of those. It makes the text
 * conditional on a script, which for a public instrument making claims about a government is the
 * same defect as the tooltip: content that renders correctly and reaches nobody.
 *
 * EVERY STEP CARRIES A STABLE ID so a reader can link to `#step-3` and land on it. Rev1 rejected
 * infinite zoom because a public instrument must be citable and then failed to apply the rule to
 * its own year control; the same rule applies here.
 */
export function StoryScroller({
  steps,
  lines,
  yMax,
  figureLabel,
}: {
  steps: { id: string; body: ReactNode }[];
  /**
   * SERIALIZABLE DATA, NOT A RENDER FUNCTION. The first version took `figure: (active) => ReactNode`
   * and the build refused it: *"Functions cannot be passed directly to Client Components."* A
   * server component may hand a client component elements and plain data, never a callback — so
   * the scroller owns the figure and receives the lines to draw.
   *
   * `steps[].body` crosses the boundary fine: those are already-rendered elements, not functions.
   */
  /**
   * PASSED THROUGH, NOT DEFAULTED HERE. Both belong to the story, not to the scroller: the window
   * is fixed once per story so the emphasis step cannot change the geometry, and the accessible
   * name has to say what THIS figure shows. Shipping without the second put a reading-assessment
   * label on an employment chart. See `TwoInstruments`.
   */
  yMax?: number;
  figureLabel?: string;
  lines: {
    key: string;
    label: string;
    unit: string;
    points: Point[];
    breaks: number[];
  }[];
}) {
  // -1 means "no step is privileged" — the state a no-JS or reduced-motion reader stays in, and
  // the state the figure must render completely.
  const [active, setActive] = useState(-1);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * REDUCED MOTION IS NOW REACTIVE, AND IT WAS NOT BEFORE. The check used to be a bare `matchMedia`
   * read inside the observer effect with `[]` deps, so it was decided once at mount. That was
   * correct while the only source was a system preference — which does not change mid-read — and is
   * wrong now that a reader can throw the Reading switch on the page they are on. The subscription
   * listens to both sources; the OR can only ever ADD suppression, never remove it.
   */
  const reduced = useSyncExternalStore(subscribeMotion, motionReduced, () => false);

  /**
   * -1 IS DERIVED, NOT ASSIGNED. **WITHDRAWN: a `setActive(-1)` call in the observer effect below**,
   * which was a cascading render and unnecessary — "no step is privileged" is a FUNCTION of
   * `reduced`, not a second fact to store. Deriving it also means switching motion back on restores
   * the step the reader was at, instead of having destroyed it on the way out.
   */
  const shown = reduced ? -1 : active;

  useEffect(() => {
    if (reduced) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = refs.current.indexOf(e.target as HTMLDivElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      // A narrow band across the middle of the viewport: a step becomes active as it passes the
      // reader's eye, not as it enters from the bottom.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    for (const el of refs.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div className="scroller">
      <div className="scroller-figure">
        <div className="scroller-sticky">
          <TwoInstruments lines={lines} active={shown} yMax={yMax} label={figureLabel} />
        </div>
      </div>
      <div className="scroller-steps">
        {steps.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`scroller-step${shown === i ? ' is-active' : ''}`}
          >
            {s.body}
          </div>
        ))}
      </div>
    </div>
  );
}
