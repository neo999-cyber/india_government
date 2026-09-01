'use client';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
// PLATE from the pure module; the subject TYPE only, so no data module reaches the browser.
import { PLATE } from '@/lib/landscape-plate';
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
  children: React.ReactNode;
};

/**
 * WHAT THE RECORD HOLDS FOR ONE SUBJECT IN ONE YEAR — and it COUNTS AND LINKS rather than listing.
 *
 * **That is a rule decision, not a space one, and the Atlas board already made it**: a panel that
 * named the records would be a LISTING SURFACE, and rules 3a and 4b would then require every caveat
 * and every declared absence to render inside it in full — 97 of the 212 dated records carry a
 * caveat averaging 450 characters, and Governance 2019 alone holds 16 filings. Measured, listing
 * them here would have added roughly 200 KB to the one page that exists to feel light, and would
 * have built a second listing to keep in step with `/years/`, which is already bound by
 * `listing-marks` and already lists exactly this.
 *
 * So the brief states the SHAPE of the year and hands the reader the surface that holds it.
 *
 * **AND IT SAYS "THE RECORD HOLDS", NEVER "WHAT HAPPENED".** A thin year means nobody filed, not
 * that nothing occurred, and rule 5d is exactly the distinction between a claim about the world and
 * a claim about what the sources contain. An empty cell is rendered in the absence idiom for the
 * same reason — Poverty is empty in 10 of the 13 years, and that emptiness is the most truthful
 * thing this picture can say about it.
 */
function Brief({
  year,
  subject,
  cell,
  archive,
}: {
  year: number | null;
  subject: LandscapeSubject | null;
  cell: SubjectYear | null;
  archive: SubjectYear | null;
}) {
  if (year === null)
    return (
      <p className="lsc-brief-idle">
        Move the year control to read what the record holds for a single year
        {subject ? ` of ${subject.label.toLowerCase()}` : ''}.
      </p>
    );
  const c = subject ? cell : archive;
  const name = subject ? subject.label : 'The archive';
  const empty = c !== null && c.reporting === 0 && c.records === 0;
  return (
    <>
      <p className="lsc-brief-h">
        <strong>{name}</strong> <span className="mono">in {year}</span>
      </p>
      {empty ? (
        <p className="absence lsc-brief-none">
          Nothing is filed here. No series of this subject carries an observation dated {year}, and
          no record is dated in it. That is a fact about this archive, not about the year.
        </p>
      ) : (
        <p className="lsc-brief-n">
          <span>
            <b>{c ? c.reporting : 0}</b>
            <i>series reported</i>
          </span>
          <span>
            <b>{c ? c.records : 0}</b>
            <i>{c && c.records === 1 ? 'filing dated here' : 'filings dated here'}</i>
          </span>
        </p>
      )}
      <p className="lsc-brief-go">
        <Link href={`/years/${year}/`}>The {year} record in full →</Link>
        {subject ? <Link href={`/domains/${subject.key}/`}>{subject.label} in full →</Link> : null}
      </p>
    </>
  );
}

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
 */
const subscribeHash = (cb: () => void) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};

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

export function RecordLandscape({ subjects, totals, years, yearTotals, children }: Props) {
  const [hot, setHot] = useState<string | null>(null);
  /** null is "all years": every mark lit, the brief idle. The slider cannot express it, so the
      button beside it does, and the slider's `aria-valuetext` says which state it is in. */
  /** `undefined` is "the reader has not chosen"; `null` is "they chose all years". The two are
      different, because only the first should fall back to what the address bar names. */
  const [yearChoice, setYear] = useState<number | null | undefined>(undefined);
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
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => '');
  const m = /^#([a-z-]+)-(\d{4})$/.exec(hash);
  const linked =
    m && subjects.some((s) => s.key === m[1]) && years.includes(Number(m[2]))
      ? { key: m[1], year: Number(m[2]) }
      : null;
  const pinned = pinnedChoice === undefined ? linked?.key ?? null : pinnedChoice;
  const year = yearChoice === undefined ? linked?.year ?? null : yearChoice;
  const shown = hot ?? pinned;
  const current = shown ? subjects.find((s) => s.key === shown) ?? null : null;
  /** `#<subject>-<year>`, written on every change with `replaceState`, so scrubbing a decade does
      not leave thirteen entries in the reader's back button. */
  useEffect(() => {
    const want = current && year !== null ? `#${current.key}-${year}` : '';
    if (want && window.location.hash !== want) history.replaceState(null, '', want);
  }, [current, year]);

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
      const next = (year ?? years[0] - 1) + 1;
      if (next >= last) {
        setPlaying(false);
        setYear(last);
      } else setYear(next);
    }, 900);
    return () => clearTimeout(t);
  }, [playing, year, years]);

  const yi = year === null ? -1 : years.indexOf(year);
  const bit = yi < 0 ? 0 : 1 << yi;
  const cell = current && yi >= 0 ? current.years[yi] ?? null : null;
  const archive = yi >= 0 ? yearTotals[yi] ?? null : null;
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
                {/* A MARK IS LIT IN A YEAR ITS OWN FILING IS ACTIVE IN — a series in a year it
                    carries an India observation, a record in the year it is dated. WHICH mark dims
                    is as meaningless as where it sits, which is the picture's settled claim already:
                    density is real, position is not. What is exact is the COUNT, per filing,
                    checkable against /data. */}
                {s.marks.map((m, i) => (
                  <circle key={i} className={`lsc-fm${bit && !(m.m & bit) ? ' is-off' : ''}`}
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
              className={`lsc-pin${hot === P.key ? ' is-hot' : ''}`}
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
                  setPinned(P.key);
                }
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
            <label className="scrub-label" htmlFor="lsc-yr">Move through the years</label>
            <div className="scrub-track">
              <input
                id="lsc-yr"
                type="range"
                min={years[0]}
                max={years[years.length - 1]}
                step={1}
                value={year ?? years[0]}
                onChange={(e) => setYear(Number(e.target.value))}
                aria-valuetext={
                  year === null ? 'all years; every filing on the picture is lit' : String(year)
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
                if (year === null) setYear(Number((e.target as HTMLInputElement).value));
              }}
              onKeyUp={(e) => {
                if (year === null) setYear(Number((e.target as HTMLInputElement).value));
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
            <button type="button" className="lsc-allyears"
                    onClick={() => { setPlaying(false); setYear(null); }}
                    disabled={year === null}>
              All years
            </button>
          </div>
          <div className="lsc-brief" aria-live="polite">
            <Brief year={year} subject={current} cell={cell} archive={archive} />
          </div>
        </div>
      </div>
    </>
  );
}
