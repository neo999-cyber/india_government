'use client';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import {
  PREFS_SERVER_SNAPSHOT,
  prefsSnapshot,
  subscribePrefs,
  writePref,
  type PrefName,
} from '@/lib/reading-prefs';

/**
 * THE READING PREFERENCES CONTROL — four switches, in the masthead, on every page.
 *
 * ============================ WHY THE MASTHEAD, AGAINST THE STANDING RULE =====================
 *
 * `app/layout.tsx` argues at length that the masthead is deliberately short, because a long one is
 * "the single strongest signal that a site is a government portal". That reasoning is not withdrawn
 * and this control is a genuine exception to it, on one argument:
 *
 * **A reader who needs larger text cannot read their way down to the footer to ask for it.** Every
 * other site-level affordance here — the directory, the method link, the source link — is something
 * a reader looks for after reading. This is the one a reader needs BEFORE reading, so it is the one
 * that cannot be filed at the bottom of the page. The cost is one short mono control beside
 * "All pages"; the alternative costs the feature its entire audience.
 *
 * ============================ WHAT IT BORROWS FROM `AllPagesDisclosure` =======================
 *
 * The same `<details>`, and the same three dismissals for the same reason: the element survives
 * client-side navigation, so a panel left open hangs over the next page. **What it does NOT borrow
 * is the link dismissal**, because this panel contains no links — closing on any click inside would
 * shut the panel the moment a reader pressed one of its own switches, which is the one interaction
 * it exists for.
 *
 * ============================ IT IS NOT RENDERED WITHOUT JAVASCRIPT ===========================
 *
 * `.prefs` is `display: none` until `BOOT` puts `data-js="on"` on `<html>`. The `<details>` would
 * open perfectly well without a bundle — and every switch inside it would be inert, which is a
 * control that lies about what it does. **The rest of the site works with the bundle dead and this
 * one thing cannot**, so it removes itself rather than pretending.
 *
 * Hydration note: the server cannot know a reader's stored preference, so every switch renders at
 * its fallback and corrects in the effect below. That is a deliberate one-frame correction of
 * `aria-pressed` ONLY — the attributes that decide appearance are already on `<html>` by then,
 * written by `BOOT` before the first paint.
 */

/** The reader-facing wording. Kept beside the values so a label cannot drift from what it sets. */
const SWITCHES: {
  name: PrefName;
  legend: string;
  note: string;
  options: { value: string; label: string }[];
}[] = [
  {
    name: 'text',
    legend: 'Text size',
    note: 'Scales the whole page, spacing included.',
    options: [
      { value: 'normal', label: 'Default' },
      { value: 'large', label: 'Large' },
      { value: 'largest', label: 'Largest' },
    ],
  },
  {
    name: 'theme',
    legend: 'Canvas',
    note: 'Both palettes are contrast-measured; neither is a filter over the other.',
    options: [
      { value: 'dark', label: 'Dark' },
      { value: 'light', label: 'Light' },
    ],
  },
  {
    name: 'links',
    legend: 'Links',
    note: 'Underline every link, not only the ones in prose.',
    options: [
      { value: 'default', label: 'Default' },
      { value: 'underline', label: 'Always underlined' },
    ],
  },
  {
    name: 'motion',
    legend: 'Motion',
    note: 'Your system setting still applies on its own; this only adds to it.',
    options: [
      { value: 'auto', label: 'Default' },
      { value: 'off', label: 'Stop animation' },
    ],
  },
];

export function ReadingPreferences() {
  const ref = useRef<HTMLDetailsElement>(null);

  /**
   * THE DOCUMENT IS THE STATE, AND THIS COMPONENT ONLY READS IT.
   *
   * **The first version held a `useState` seeded from an effect, which is a cascading render and
   * the linter said so.** It was also the wrong shape: `<html>`'s attributes are the truth — `BOOT`
   * writes them before React exists, and `writePref` writes them before it notifies anyone. A local
   * copy would be a second version of the same fact, kept in step by hand.
   *
   * `useSyncExternalStore` subscribes to that source properly, so `aria-pressed` is DERIVED rather
   * than mirrored and cannot drift from what the stylesheet is already acting on.
   */
  const snapshot = useSyncExternalStore(subscribePrefs, prefsSnapshot, () => PREFS_SERVER_SNAPSHOT);
  const values = snapshot.split('|');
  const current = Object.fromEntries(SWITCHES.map((s, i) => [s.name, values[i]]));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const close = () => {
      if (el.open) el.open = false;
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!el.open) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !el.open) return;
      close();
      el.querySelector('summary')?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // No local setState: `writePref` sets the attribute and dispatches; the store re-reads.
  const choose = (name: PrefName, value: string) => writePref(name, value);

  return (
    <details className="prefs" ref={ref}>
      {/* LABELLED "Accessibility", operator's choice 2026-08-26. **WITHDRAWN: `Reading`** — accurate,
          and not the word anyone scans for. This site is being shared with institutions that ask
          about accessibility by name, and a control they cannot see is a control they will report
          as absent.

          It does name a broader promise than four switches can keep, which is why the panel's
          closing note is not optional: it says plainly that a website cannot switch on a screen
          reader or a magnifier, and that everything here changes this page only. **The label may
          overclaim; the panel must not.** */}
      <summary aria-label="Accessibility and reading preferences">
        <span className="prefs-mark" aria-hidden="true">Aa</span>
        <span>Accessibility</span>
      </summary>
      <div className="prefs-panel">
        <p className="prefs-intro">
          Saved in this browser only. Nothing is sent anywhere, and no account is involved.
        </p>
        {SWITCHES.map((s) => (
          <div key={s.name} className="prefs-group" role="group" aria-label={s.legend}>
            <span className="prefs-legend">{s.legend}</span>
            <span className="prefs-options">
              {s.options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  className="prefs-opt"
                  aria-pressed={current[s.name] === o.value}
                  onClick={() => choose(s.name, o.value)}
                >
                  {o.label}
                </button>
              ))}
            </span>
            <span className="prefs-note">{s.note}</span>
          </div>
        ))}
        {/* THE HONEST FOOTNOTE, and it is the reason this panel is four switches rather than
            fourteen. A reader arriving from a commercial overlay expects a "screen reader" button;
            saying plainly that no site can provide one is more use to them than a button that
            does nothing. */}
        <p className="prefs-foot">
          A website cannot switch on a screen reader or a magnifier — those are your own software,
          and this site is built to work with them. Everything above is a change to this page only.
        </p>
      </div>
    </details>
  );
}
