'use client';
import Link from '@/components/Link';
import { useEffect, useRef, useState } from 'react';
import { formatValue, periodLabel } from '@/lib/format';
import type { CarouselSubject } from '@/lib/carousel';

/**
 * A COVER-FLOW OF THE FOURTEEN SUBJECTS, at the top of the Atlas.
 *
 * Built 2026-09-02 from a reference the operator supplied — a streaming app's row: one poster
 * centred, sharp and forward; its neighbours receding, dimmed and desaturated; a glow behind the
 * active one; arrow keys, dots, a click on a neighbour or a drag bringing the next to the middle.
 * The brief was "a normal website with premium design and animation, not a government portal".
 *
 * ============================ WHAT IT DOES WITHOUT SCRIPT ====================================
 *
 * The server renders all fourteen cards with the middle one active and every position as a data
 * attribute; the stylesheet lays the flow out from those. With the bundle dead the picture is the
 * same, nothing animates, and every card is a real link. Script adds the choosing.
 *
 * ============================ WHERE A CARD GOES ==============================================
 *
 * Not off the page. The active card links to its own board on this page — `#topic-<key>` — so
 * choosing a subject scrolls the Atlas to it; the topic page is the board's own link, one click
 * further. A neighbour's first click brings it to the middle rather than leaving.
 *
 * ============================ WHAT IT DOES NOT CLAIM =========================================
 *
 * The order is the board's own and encodes nothing; the readout says so. The lead indicator's
 * title is a caption inside a link to the BOARD, not a link to the series, and its caveat and marks
 * are on the board directly below, in full — this card is the pointer, not a second listing.
 */
export function SubjectCarousel({ subjects }: { subjects: readonly CarouselSubject[] }) {
  const n = subjects.length;
  const [cur, setCur] = useState(Math.floor(n / 2));
  const x0 = useRef<number | null>(null);
  const go = (i: number) => setCur(((i % n) + n) % n);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight') go(cur + 1);
      if (e.key === 'ArrowLeft') go(cur - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  /**
   * WHEEL OVER THE STAGE MOVES THE FLOW, NOT THE PAGE — operator, 2026-09-02: "when the mouse is
   * over the flow the scroll should move to the next; to scroll the page you come out of it."
   *
   * A NATIVE, NON-PASSIVE LISTENER, because React registers `onWheel` passively and a passive
   * handler cannot `preventDefault`: the page would scroll AND the flow would move. Bound to the
   * stage only — leave it and the page scrolls as ever. A trackpad fires dozens of small deltas per
   * gesture, so deltas accumulate to a threshold and then LOCK until the 650ms flow has landed;
   * otherwise one flick would run through six subjects.
   */
  const stage = useRef<HTMLDivElement>(null);
  const wheel = useRef({ acc: 0, until: 0 });
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now < wheel.current.until) return;
      wheel.current.acc += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(wheel.current.acc) < 60) return;
      const dir = wheel.current.acc > 0 ? 1 : -1;
      wheel.current = { acc: 0, until: now + 700 };
      setCur((c) => (((c + dir) % n) + n) % n);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [n]);

  const active = subjects[cur];
  return (
    <section className="sc" aria-labelledby="sc-h" style={{ ['--hue' as string]: `var(--area-${active.area})` }}>
      <div className="sc-head">
        <h2 id="sc-h" className="sc-title">Choose a subject</h2>
        <p className="sc-sub">
          Each card leads with one real series. Below, one year control moves every topic at once.
          <span className="mono"> {n} subjects &middot; the board&rsquo;s own order</span>
        </p>
      </div>
      <div className="sc-stage" ref={stage}
           onPointerDown={(e) => { x0.current = e.clientX; }}
           onPointerUp={(e) => {
             if (x0.current === null) return;
             const dx = e.clientX - x0.current; x0.current = null;
             if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
           }}>
        <div className="sc-glow" aria-hidden="true" />
        <div className="sc-track" role="listbox" aria-label="The fourteen subjects" aria-activedescendant={`sc-${active.key}`}>
          {subjects.map((s, i) => {
            let off = i - cur; if (off > n / 2) off -= n; if (off < -n / 2) off += n;
            const d = Math.min(Math.abs(off), 3);
            const isActive = i === cur;
            return (
              <Link key={s.key} id={`sc-${s.key}`} href={`#topic-${s.key}`} role="option" aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    className={`sc-card${isActive ? ' is-active' : ''}${s.lead ? '' : ' is-absence'}${s.sober ? ' is-sober' : ''}`}
                    style={{ ['--i' as string]: off, ['--d' as string]: d, ['--hue' as string]: `var(--area-${s.area})`,
                             visibility: Math.abs(off) > 3 ? 'hidden' : undefined }}
                    onClick={(e) => { if (!isActive) { e.preventDefault(); go(i); } }}>
                <span className="sc-art" aria-hidden="true">
                  {/* INTRINSIC SIZE AND ASYNC DECODE. Without width/height the card reflows when the
                      art lands; without `decoding="async"` a decode can land on the main thread in
                      the middle of the 650ms flow. The neighbours the reader is about to reach are
                      `eager` too — a lazy image on a hidden card fetches anyway, only later. */}
                  <img src={`/landscape/${s.art}.webp`} alt="" width={s.artW} height={s.artH}
                       decoding="async" loading={d < 2 ? 'eager' : 'lazy'} />
                </span>
                <span className="sc-body">
                  <span className="sc-area mono">{s.area}</span>
                  <span className="sc-name">{s.label}</span>
                  {s.lead === null ? (
                    <span className="sc-absence">No series measures this subject &mdash; {s.records} records, and nothing to draw. The absence is the finding.</span>
                  ) : s.sober ? (
                    <span className="sc-sober">{formatValue(s.lead.value)} {s.lead.unit} in {periodLabel(s.lead.period, 'CY')} &mdash; {s.lead.title}</span>
                  ) : (
                    <>
                      <span className="sc-fig"><b className="mono">{formatValue(s.lead.value)}</b><span className="mono">{s.lead.unit.slice(0, 24)} &middot; {periodLabel(s.lead.period, 'CY')}</span></span>
                      <span className="sc-lead">{s.lead.title}</span>
                    </>
                  )}
                  <span className="sc-chips mono">
                    <span>{s.span ? `${s.span[0]}–${s.span[1]}` : '—'}</span>
                    <span>{s.series} series</span>
                    <span>{s.records} records</span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="sc-bar">
        <div className="sc-dots" role="tablist" aria-label="Subjects">
          {subjects.map((s, i) => (
            <button key={s.key} type="button" role="tab" aria-label={s.label} aria-selected={i === cur}
                    className={i === cur ? 'is-on' : undefined} onClick={() => go(i)} />
          ))}
        </div>
        <p className="sc-read mono" aria-live="polite">
          {cur + 1} of {n} &middot; {active.label} &middot;{' '}
          <Link href={`/domains/${active.key}/`}>open {active.label.toLowerCase()} &rarr;</Link>
        </p>
        <div className="sc-nav">
          <button type="button" onClick={() => go(cur - 1)} aria-label="Previous subject">&larr;</button>
          <button type="button" onClick={() => go(cur + 1)} aria-label="Next subject">&rarr;</button>
        </div>
      </div>
    </section>
  );
}
