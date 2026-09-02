import Link from '@/components/Link';
import { PLATE, pinLayout } from '@/lib/landscape-plate';
import type { LandscapeSubject } from '@/lib/landscape';

/**
 * THE LANDING PICTURE, LIT FOR ONE YEAR AND STANDING STILL — the year page's picture.
 *
 * Operator, 2026-09-02: "the year page gets the picture. /years/2019/ lists 21 filings in text.
 * Put the landscape on it lit for that year, plus a fourteen-cell strip."
 *
 * A server component with no state: the marks lit are exactly the filings active in this year,
 * by the same per-filing masks the landing picture uses, and every pin is a link into the
 * subject's own timeline at this year (`/domains/<key>/#y-<year>`). Nothing here is a claim the
 * landing picture does not already make; the caption repeats its settlement — density is real,
 * position is invented.
 */
export function LandscapeStill({
  subjects,
  year,
  years,
}: {
  subjects: readonly LandscapeSubject[];
  year: number;
  years: readonly number[];
}) {
  const bit = 1 << years.indexOf(year);
  const drawn = [...subjects].sort((a, b) => a.baseY - b.baseY);
  const pins = pinLayout(subjects);
  const lit = subjects.reduce((n, s) => n + s.marks.filter((m) => m.m & bit).length, 0);
  return (
    <div className="lsc lsc-still">
      <p className="lsc-label">
        <strong>The landscape at {year}</strong>
        <span className="mono">
          {lit} marks lit of {subjects.reduce((n, s) => n + s.marks.length, 0)} · one mark per
          filing, lit where the filing is active in {year} · invented terrain, not a map
        </span>
      </p>
      <div className="lsc-frame">
        <svg viewBox={`0 0 ${PLATE.w} ${PLATE.h}`} className="lsc-svg" role="img"
             aria-label={`An invented landscape with one landmark for each subject, its filing marks lit for ${year}`}>
          <image href={PLATE.src} x="0" y="0" width={PLATE.w} height={PLATE.h} />
          {drawn.map((s) => {
            const sw = s.w * 0.26;
            return (
              <g key={s.key} className="lsc-lm" data-k={s.key}>
                <ellipse className="lsc-shadow" cx={s.cx} cy={s.baseY - 3} rx={sw} ry={sw * 0.34} />
                {s.marks.map((m, i) => (
                  <circle key={i} className={`lsc-fm${m.m & bit ? '' : ' is-off'}`} cx={m.x} cy={m.y} r={1.9} />
                ))}
                <image className="lsc-art" href={`/landscape/${s.art}.webp`}
                       x={s.cx - s.w / 2} y={s.baseY - s.h} width={s.w} height={s.h} />
              </g>
            );
          })}
        </svg>
        <div className="lsc-pins">
          {pins.map((P) => {
            const s = subjects.find((x) => x.key === P.key)!;
            const c = s.years[years.indexOf(year)];
            return (
              <Link key={P.key} className="lsc-pin" data-k={P.key} href={`/domains/${P.key}/#y-${year}`}
                    style={{ left: `${P.left}%`, top: `${P.top}%` }}
                    aria-label={`${P.label} in ${year} — ${c.reporting} series reported, ${c.records} filings`}>
                <span className="lsc-pin-dot" aria-hidden="true" />
                <span className="lsc-pin-t">{P.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * FOURTEEN CELLS, ONE PER SUBJECT, THE YEAR'S SHAPE AT A GLANCE. Counts only, in the subjects'
 * own order, each a door into that subject's timeline at this year. An empty cell is drawn in the
 * absence idiom, because a subject with nothing filed in a year is the most truthful thing this
 * strip can show about it and must not look like a small finding.
 */
export function YearSubjectStrip({
  subjects,
  year,
  years,
}: {
  subjects: readonly LandscapeSubject[];
  year: number;
  years: readonly number[];
}) {
  const i = years.indexOf(year);
  return (
    <ol className="yss" aria-label={`Every subject at ${year}`}>
      {subjects.map((s) => {
        const c = s.years[i];
        const empty = c.reporting === 0 && c.records === 0;
        const leadOn = s.lead?.points.some((p) => p[0] === year) ?? false;
        return (
          <li key={s.key} className={`yss-cell${empty ? ' is-empty' : ''}`}>
            <Link href={`/domains/${s.key}/#y-${year}`}>
              <span className="yss-k">{s.label}</span>
              {empty ? (
                <span className="yss-n mono">nothing filed</span>
              ) : (
                <span className="yss-n mono">
                  {c.reporting} series · {c.records} {c.records === 1 ? 'filing' : 'filings'}
                </span>
              )}
              <span className="yss-foot" aria-hidden="true">
                {c.seams ? <span className="stl-seam" title="a series changes basis" /> : null}
                {s.lead ? <span className={`stl-lead${leadOn ? ' is-on' : ''}`} /> : null}
              </span>
              {c.seams ? <span className="sr-only">{c.seams} series change basis</span> : null}
              {leadOn ? <span className="sr-only">lead reported</span> : null}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
