'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { YearBrief } from '@/components/YearBrief';
// PLATE and the pin layout from the pure module; the subject TYPE only, so no data module reaches the browser.
import { PLATE, pinLayout } from '@/lib/landscape-plate';
import { windowMask } from '@/lib/landscape-window';
import { motionReduced, subscribeMotion } from '@/lib/reading-prefs';
import type { LandscapeSubject, SubjectYear } from '@/lib/landscape';

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
 *
 * ============================ A WINDOW, NOT ONLY A YEAR — 2026-09-02 ========================
 *
 * Operator: "a range on the scrubber — 'from this year to this'. Two handles instead of one." The
 * year control is one thumb until the reader asks for a span; then a second, FROM, appears above
 * it and the two bound a window. **The single-year control is unchanged by the addition**, which
 * is why the span is opt-in rather than a second thumb that a reader reaching for the one control
 * might grab: two thumbs parked on the same year are indistinguishable, and dragging the wrong one
 * would open a window nobody asked for.
 *
 * Within a span, the marks light for every filing active in any year of it, the brief counts across
 * it, and the lead indicator's two ends are read — or refused where its instrument changed inside
 * the window, which is the more useful half of the feature. The brief's arithmetic is in
 * `lib/landscape-window.ts`, shared with the topic page's timeline; the prose is `YearBrief`.
 *
 * Play runs the TO thumb. With a span open, the window grows from FROM as the years advance, which
 * is "from this time to this" being operated rather than decoration.
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
  /**
   * THE YEARS, AND THE ARCHIVE'S OWN PER-YEAR COUNTS — corpus totals, never a sum of the fourteen.
   * A record declaring three subjects is one filing in its year and three marks on the picture, and
   * those two facts are counted by different code for that reason.
   */
  years: readonly number[];
  yearTotals: readonly SubjectYear[];
  /** One year mask per series of the corpus, so a window counts DISTINCT series reporting. */
  archiveMasks: readonly number[];
  children: React.ReactNode;
};

/**
 * THE ADDRESS BAR AS AN EXTERNAL STORE.
 *
 * **WITHDRAWN: reading `location.hash` once in a `useEffect` and calling `setPinned`/`setYear`.**
 * `react-hooks/set-state-in-effect` refused it, and the rule is right here for the reason the
 * Reading panel already paid for: state seeded from an effect is a second copy of a fact that lives
 * somewhere else, kept in step by hand. Subscribed properly the hash is a FALLBACK the reader's own
 * choices override, which also makes back and forward work.
 *
 * `history.replaceState` does not fire `hashchange`, so writing the hash cannot feed itself.
 *
 * `#<subject>-<year>` names a year; `#<subject>-<from>-<to>` names a window.
 */
const subscribeHash = (cb: () => void) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};

/** `from` null is a single year at `to`; a number is a window's start, never above `to`. */
type Choice = { readonly to: number; readonly from: number | null };

export function RecordLandscape({ subjects, totals, years, yearTotals, archiveMasks, children }: Props) {
  const [hot, setHot] = useState<string | null>(null);
  /** `undefined` is "the reader has not chosen"; `null` is "they chose all years". The two are
      different, because only the first should fall back to what the address bar names. */
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);
  /**
   * THE SUBJECT THE URL NAMES, WHICH IS NOT THE SUBJECT UNDER THE POINTER.
   *
   * `hot` is hover and clears when the pointer leaves the block; a link someone was sent has to
   * survive that. So a hovered subject also PINS, `current` reads `hot ?? pinned`, and the address
   * bar carries whatever the reader last read rather than whatever the pointer is on this instant.
   * The dimming stays keyed on `hot` alone — a pinned subject must not leave the other thirteen
   * greyed out for a reader who has moved on.
   */
  const [pinnedChoice, setPinned] = useState<string | null | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const [motionOK, setMotionOK] = useState(true);
  /**
   * THE TWO-STEP IS EVERY POINTER'S, NOT ONLY TOUCH'S — operator request, 2026-09-01: "first
   * click activates it and use the scroller, then double click goes to the domain".
   *
   * **KEYBOARD ACTIVATION IS EXEMPT AND MUST BE.** `detail === 0` is a click that came from Enter
   * or Space rather than a button, and such a reader has already selected the pin by focusing it —
   * `onFocus` sets both `hot` and `pinned`. Making them press twice would be a second step that
   * buys them nothing and looks like a broken link.
   *
   * **WITHDRAWN, AND THE REASON IS WHY THIS IS STATE AND NOT A TEST OF `hot`:** a click test of
   * `hot !== P.key`. Focusing a link fires `onFocus` BEFORE `onClick`, so the first press set `hot`
   * to its own subject and the click then read itself as already-selected and navigated. `armed` is
   * written by a click and by nothing else, which is what makes it safe.
   */
  const [armed, setArmed] = useState<string | null>(null);
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => '');
  const m = /^#([a-z-]+)-(\d{4})(?:-(\d{4}))?$/.exec(hash);
  const linked = (() => {
    if (!m || !subjects.some((s) => s.key === m[1])) return null;
    const a = Number(m[2]), b = m[3] ? Number(m[3]) : null;
    if (!years.includes(a) || (b !== null && (!years.includes(b) || b < a))) return null;
    return { key: m[1], choice: b === null ? { to: a, from: null } : { to: b, from: a } };
  })();
  const pinned = pinnedChoice === undefined ? linked?.key ?? null : pinnedChoice;
  const chosen = choice === undefined ? linked?.choice ?? null : choice;
  const to = chosen?.to ?? null;
  const from = chosen ? chosen.from ?? chosen.to : null;
  const shown = hot ?? pinned;
  const current = shown ? subjects.find((s) => s.key === shown) ?? null : null;
  /** Written on every change with `replaceState`, so scrubbing a decade does not leave thirteen
      entries in the reader's back button. */
  useEffect(() => {
    // A span dragged shut — from equal to to — is written as the year it is, so the address a reader
    // copies names a year and not a one-year window.
    const want =
      current && chosen
        ? `#${current.key}-${chosen.from === null || chosen.from === chosen.to ? chosen.to : `${chosen.from}-${chosen.to}`}`
        : '';
    if (want && window.location.hash !== want) history.replaceState(null, '', want);
  }, [current, chosen]);

  useEffect(() => {
    const apply = () => {
      const off = motionReduced();
      setMotionOK(!off);
      if (off) setPlaying(false);
    };
    apply();
    return subscribeMotion(apply);
  }, []);

  /* One year a tick, stopping at the end rather than looping: a loop would restart the decade
     without anyone asking, which reads as decoration rather than as a control being operated. */
  useEffect(() => {
    if (!playing) return;
    const last = years[years.length - 1];
    const t = setTimeout(() => {
      const next = (to ?? years[0] - 1) + 1;
      const keepFrom = chosen?.from ?? null;
      if (next >= last) {
        setPlaying(false);
        setChoice({ to: last, from: keepFrom });
      } else setChoice({ to: next, from: keepFrom });
    }, 900);
    return () => clearTimeout(t);
  }, [playing, to, chosen, years]);

  const window_ = to !== null && from !== null ? { from, to } : null;
  const mask = window_ ? windowMask(years, window_) : 0;
  const pins = pinLayout(subjects);
  const drawn = [...subjects].sort((a, b) => a.baseY - b.baseY);
  const spanOn = chosen !== null && chosen.from !== null;

  /**
   * THE SETTERS READ `chosen`, NEVER A FUNCTIONAL UPDATER'S ARGUMENT. **WITHDRAWN:
   * `setChoice((c) => …)` in all three.** The updater receives the STATE, which is `undefined`
   * until the reader's first choice — while the window a link named lives in `chosen`, derived
   * from the hash. Measured on the build: arriving at `#education-2016-2020` and pressing the span
   * button OPENED a second span (2014–2026) instead of closing the linked one, and moving the TO
   * thumb collapsed a linked span silently. Every setter starts from what the reader can see.
   */
  /** The TO thumb. Moving it below an open FROM drags FROM with it: a window never inverts. */
  const setTo = (v: number) =>
    setChoice({ to: v, from: chosen?.from !== null && chosen?.from !== undefined ? Math.min(chosen.from, v) : null });
  /** The FROM thumb. Moving it above TO drags TO with it, for the same reason. */
  const setFrom = (v: number) => setChoice({ to: Math.max(chosen?.to ?? v, v), from: v });

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
          {/* A FIRST PRESS THAT DOES NOT NAVIGATE LOOKS LIKE A BROKEN LINK UNLESS THE PAGE SAYS
              OTHERWISE. This line is the only thing that distinguishes "selected, press again" from
              "nothing happened", and the pin carries `is-armed` for the same reason. */}
          <p className="lsc-read-foot mono">
            {armed && current && armed === current.key
              ? `Selected — press again to open ${current.label}`
              : current
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
             setArmed(null);
             setHot(null);
           }}
           /* REACT'S `onBlur` BUBBLES, AND THAT BROKE THE ONE WORKFLOW THIS CHANGE EXISTS FOR.
              **WITHDRAWN: `onBlur={() => { setArmed(null); setHot(null); }}`.** Clicking a pin
              focuses it; moving to the year control then blurs the pin, and because the handler is
              on the CONTAINER that blur bubbled to it and disarmed the selection — so the second
              press armed again instead of opening. Native `blur` does not bubble, which is why this
              reads as safe and is not. Focus moving WITHIN the block is not focus leaving it. */
           onBlur={(e) => {
             if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
             setArmed(null);
             setHot(null);
           }}>
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
                {/* A MARK IS LIT IN A YEAR ITS OWN FILING IS ACTIVE IN — a series in a year it
                    carries an India observation, a record in the year it is dated — and across a
                    window, in ANY year of it. WHICH mark dims is as meaningless as where it sits,
                    which is the picture's settled claim already: density is real, position is not.
                    What is exact is the COUNT, per filing, checkable against /data. */}
                {s.marks.map((m, i) => (
                  <circle key={i} className={`lsc-fm${mask && !(m.m & mask) ? ' is-off' : ''}`}
                          cx={m.x} cy={m.y} r={1.9} />
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
              className={`lsc-pin${hot === P.key ? ' is-hot' : ''}${armed === P.key ? ' is-armed' : ''}`}
              data-k={P.key}
              href={`/domains/${P.key}/`}
              style={{ left: `${P.left}%`, top: `${P.top}%` }}
              aria-label={`${P.label} — ${subjects.find((s) => s.key === P.key)!.series} series, ${subjects.find((s) => s.key === P.key)!.records} records`}
              onPointerEnter={(e) => {
                if (e.pointerType === 'touch') return;
                setHot(P.key);
                setPinned(P.key);
              }}
              onFocus={() => { setHot(P.key); setPinned(P.key); }}
              onClick={(e) => {
                /* FIRST PRESS SELECTS, SECOND OPENS — for every pointer. A reader can now hold a
                   subject in the brief while working the year control, which a hover-only selection
                   could not survive. `detail === 0` is a keyboard activation, which has already
                   selected by focusing and opens at once. */
                if (e.detail === 0 || armed === P.key) return;
                e.preventDefault();
                setArmed(P.key);
                setHot(P.key);
                setPinned(P.key);
              }}
            >
              <span className="lsc-pin-dot" aria-hidden="true" />
              <span className="lsc-pin-t">{P.label}</span>
            </a>
          ))}
        </div>
        </div>

        {/* THE YEAR CONTROL AND THE BRIEF. The range runs `YEARS` exactly — the same 2014-2026 the
            year pages are generated over — so every year the reader can reach has a page the brief
            can link to. A range that ran to 2013 would count a year and then dead-end on it, which
            is the failure `lib/years.ts` records having already been paid for once. */}
        <div className="lsc-year">
          <div className="scrub lsc-scrub">
            <label className="scrub-label" htmlFor="lsc-yr">
              {spanOn ? 'Move through the years — to' : 'Move through the years'}
            </label>
            <div className="scrub-track">
              {/* THE FROM THUMB, ONLY WHEN A SPAN IS OPEN. Absent rather than hidden: a second
                  thumb parked on the same year as the first is the one a reader grabs by mistake. */}
              {spanOn ? (
                <div className="lsc-from">
                  <label className="scrub-label" htmlFor="lsc-from">from</label>
                  <input
                    id="lsc-from"
                    type="range"
                    min={years[0]}
                    max={years[years.length - 1]}
                    step={1}
                    value={from ?? years[0]}
                    onChange={(e) => setFrom(Number(e.target.value))}
                    aria-valuetext={`from ${from}`}
                  />
                </div>
              ) : null}
              <input
                id="lsc-yr"
                type="range"
                min={years[0]}
                max={years[years.length - 1]}
                step={1}
                value={to ?? years[0]}
                onChange={(e) => setTo(Number(e.target.value))}
                aria-valuetext={
                  to === null
                    ? 'all years; every filing on the picture is lit'
                    : spanOn
                      ? `to ${to}, from ${from}`
                      : String(to)
                }
              /* THE FIRST YEAR WAS UNREACHABLE FROM THE UNSET STATE, ON BOTH SCRUBBERS.
                 While no year is chosen the thumb parks at the minimum, so asking for the minimum
                 changes nothing, fires no `change`, and the reader sees the unset readout with the
                 thumb sitting on the year they just clicked. Measured on both surfaces with a
                 positive control: the third year moved the readout, the first never did.
                 Widening the range by one step would fix it and would break the Atlas's stated
                 invariant that the slider's range IS the charts' range, so instead an interaction
                 that produces no value change is itself read as a selection. */
              onPointerUp={(e) => {
                if (to === null) setTo(Number((e.target as HTMLInputElement).value));
              }}
              onKeyUp={(e) => {
                if (to === null) setTo(Number((e.target as HTMLInputElement).value));
              }}
              />
              <span className="scrub-ends" aria-hidden="true">
                <span>{years[0]}</span>
                <span>{years[years.length - 1]}</span>
              </span>
            </div>
            {/* PLAY IS ABSENT, NOT DISABLED, WHERE MOTION IS REDUCED. A control that announces
                itself and does nothing is worse than one that was never offered, and the reader who
                asked for less motion has already said what they want. The site switch is ORed with
                the system preference and can only ADD suppression. */}
            {motionOK ? (
              <button type="button" className="lsc-allyears" onClick={() => setPlaying((p) => !p)}
                      aria-pressed={playing}>
                {playing ? '❚❚ Pause' : '▶ Play'}
              </button>
            ) : null}
            {/* SPAN: opens the FROM thumb at the first year, so the window is "from the start to
                here" until the reader moves it. Closing it returns to the single year at TO. */}
            <button type="button" className="lsc-allyears lsc-span"
                    onClick={() => {
                      setPlaying(false);
                      setChoice(
                        chosen && chosen.from !== null
                          ? { to: chosen.to, from: null }
                          : { to: chosen?.to ?? years[years.length - 1], from: years[0] },
                      );
                    }}
                    aria-pressed={spanOn}>
              {spanOn ? 'Single year' : 'Span years'}
            </button>
            <button type="button" className="lsc-allyears"
                    onClick={() => { setPlaying(false); setChoice(null); }}
                    disabled={chosen === null}>
              All years
            </button>
          </div>
          <div className="lsc-brief" aria-live="polite">
            <YearBrief window={window_} subject={current} years={years} archive={yearTotals} archiveMasks={archiveMasks} />
          </div>
        </div>
      </div>
    </>
  );
}
