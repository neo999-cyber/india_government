/**
 * READING PREFERENCES — four switches a reader can set for themselves, and no more than four.
 *
 * ============================ WHAT THIS IS, AND WHAT IT DELIBERATELY IS NOT ====================
 *
 * The request that produced this was a screenshot of a commercial accessibility overlay — the
 * floating widget offering a dozen named "profiles". **This is the honest subset of that widget**,
 * and the subset is what makes it defensible: it holds only switches a website can actually
 * operate.
 *
 * **THE THINGS THOSE PANELS OFFER THAT ARE NOT HERE, AND WHY.** Recorded because the absence is a
 * decision and a later cycle should not read it as an oversight:
 *
 *   · **"Screen reader mode".** A screen reader is the reader's own software, running outside the
 *     page. No website can switch one on. A button claiming to is the most misleading control on
 *     those panels — it invites a reader to believe the site did something for them when nothing
 *     happened. What a site can do is be navigable BY one, which is asserted in the e2e suite.
 *   · **"Keyboard navigation".** Either the site is keyboard-navigable or it is not; this one is,
 *     on every surface, and all thirteen spec files assert some part of it. A toggle would imply
 *     the default is broken.
 *   · **"ADHD / seizure-safe / cognitive / vision profiles".** Each is a bundle of the four real
 *     switches under a clinical-sounding name. The bundle adds a diagnosis to a reading choice,
 *     which is not this instrument's to make.
 *
 * **NO THIRD-PARTY SCRIPT, AND THAT IS STRUCTURAL RATHER THAN AESTHETIC.** `vercel.json` sets
 * `default-src 'self'` with `script-src 'self' 'unsafe-inline'`. A hosted overlay is remote
 * JavaScript, so shipping one would mean opening the CSP to another origin — trading a security
 * property the whole site has for a feature four CSS attribute selectors provide.
 *
 * ============================ THE MECHANISM ===================================================
 *
 * Every preference is ONE ATTRIBUTE ON `<html>`, which is the mechanism the light palette already
 * used: `app/globals.css` has carried a complete, separately contrast-measured `[data-theme='light']`
 * block since 2026-08-13 with nothing in the interface able to reach it. **Half of this feature was
 * already built and had no switch on it.** The other three attributes follow the same shape, so the
 * stylesheet stays the single place that knows what a preference LOOKS like.
 *
 * `data-js` is the fourth of the five attributes and is not a preference: it is set by `BOOT` and
 * gates the control's own visibility, so **a reader whose bundle never ran is never shown switches
 * that cannot move.** An inert control is worse than no control, on the same reasoning that a
 * half-read caveat is worse than none.
 */

/** One switch: where it is stored, what it may be, and what it means when unset. */
export type Pref = {
  /** The attribute set on `<html>`. The stylesheet selects on this and nothing else. */
  readonly attr: string;
  /** The `localStorage` key. Namespaced, because this origin is shared with nothing. */
  readonly key: string;
  /** Every legal value. `BOOT` rejects anything not in here rather than trusting storage. */
  readonly values: readonly string[];
  /** The value meaning "as the site ships", i.e. what an unset preference resolves to. */
  readonly fallback: string;
};

export const PREFS = {
  /**
   * The light palette is NOT a fallback and not dead code — see its own header in `globals.css`.
   * It shipped from 2026-08-11 to 2026-08-13 with its own measured ratios, which is why this is a
   * two-value switch and not a "high contrast" filter invented on top of the dark one.
   */
  theme: { attr: 'data-theme', key: 'ior:theme', values: ['dark', 'light'], fallback: 'dark' },
  /**
   * Scales the ROOT, so the 303 rem-based sizes move and so does everything spaced in rem. Scaling
   * type without its spacing is how a "larger text" control overflows its own buttons.
   *
   * **The two px body sizes were changed to rem in the same commit** — `body { font-size: 17px }`
   * is the one that wins the cascade, and left in px it would have pinned every paragraph on the
   * site at 17px while the furniture around it grew.
   */
  text: { attr: 'data-text', key: 'ior:text', values: ['normal', 'large', 'largest'], fallback: 'normal' },
  /** 32 rules in the stylesheet set `text-decoration: none`, so this switch is not a no-op. */
  links: { attr: 'data-links', key: 'ior:links', values: ['default', 'underline'], fallback: 'default' },
  /**
   * The site already honours `prefers-reduced-motion` in twelve stylesheet blocks and two
   * components. This is the MANUAL override for a reader whose OS preference is unset or who wants
   * it only here — it never overrides the OS preference in the permissive direction.
   */
  motion: { attr: 'data-motion', key: 'ior:motion', values: ['auto', 'off'], fallback: 'auto' },
} as const satisfies Record<string, Pref>;

export type PrefName = keyof typeof PREFS;

/**
 * Fired on `window` when a switch moves. **CSS needs no notification** — the attribute change is
 * the whole mechanism. This exists for the two components that decide in JavaScript whether to
 * animate, which would otherwise keep whatever they read at mount.
 */
export const PREFS_EVENT = 'reading-prefs-change';

/**
 * TRUE WHEN MOTION SHOULD BE SUPPRESSED — the OS preference OR this site's own switch.
 *
 * **The OR is the whole contract and it only runs one way.** A reader who has asked their operating
 * system for reduced motion gets it here whatever this panel says; the panel can only ADD
 * suppression. A switch able to turn motion back ON against a system preference would be a site
 * overriding an accessibility setting, which is the failure mode of the widgets this replaces.
 */
export function motionReduced(): boolean {
  if (typeof document === 'undefined') return false;
  if (document.documentElement.getAttribute(PREFS.motion.attr) === 'off') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Subscribe to both sources of truth. Returns its own unsubscribe. */
export function subscribeMotion(onChange: () => void): () => void {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', onChange);
  window.addEventListener(PREFS_EVENT, onChange);
  return () => {
    mq.removeEventListener('change', onChange);
    window.removeEventListener(PREFS_EVENT, onChange);
  };
}

/**
 * Subscribe to preference changes for the panel's own use. Motion has `subscribeMotion` because it
 * has a SECOND source — the OS media query. Everything else changes only when this panel writes it.
 */
export function subscribePrefs(onChange: () => void): () => void {
  window.addEventListener(PREFS_EVENT, onChange);
  return () => window.removeEventListener(PREFS_EVENT, onChange);
}

/**
 * The four current values as one `|`-joined string, which is the shape `useSyncExternalStore` needs.
 * **It must return a stable primitive, not a fresh object** — a new object each call compares
 * unequal on every render and spins. The panel splits it back apart at the call site.
 */
export function prefsSnapshot(): string {
  return (Object.keys(PREFS) as PrefName[]).map((n) => readPref(n)).join('|');
}

/** The server has no document, so every switch renders at its fallback and BOOT corrects it. */
export const PREFS_SERVER_SNAPSHOT = (Object.keys(PREFS) as PrefName[])
  .map((n) => PREFS[n].fallback)
  .join('|');

/** Read one preference off the live document. The DOM is the state; storage only seeds it. */
export function readPref(name: PrefName): string {
  if (typeof document === 'undefined') return PREFS[name].fallback;
  const v = document.documentElement.getAttribute(PREFS[name].attr);
  return v && (PREFS[name].values as readonly string[]).includes(v) ? v : PREFS[name].fallback;
}

/** Set one preference: attribute first (so CSS applies), then storage, then notify. */
export function writePref(name: PrefName, value: string): void {
  const pref = PREFS[name];
  const next = (pref.values as readonly string[]).includes(value) ? value : pref.fallback;
  document.documentElement.setAttribute(pref.attr, next);
  try {
    window.localStorage.setItem(pref.key, next);
  } catch {
    // Private browsing, or storage disabled. The preference still applies for this page view;
    // it simply will not survive a navigation. Silently degrading beats not applying it at all.
  }
  window.dispatchEvent(new Event(PREFS_EVENT));
}

/**
 * THE BOOT SCRIPT, INLINED IN `<body>` BEFORE ANYTHING ELSE — and it has to be a string.
 *
 * **A React effect is too late by exactly one paint.** The attributes must be on `<html>` before
 * the browser paints, or a reader who chose the light palette gets a full-page flash of the dark
 * one on every navigation. That is the one thing this cannot do from a component, so it is a
 * synchronous inline script and nothing else in the codebase is.
 *
 * **IT IS GENERATED FROM `PREFS`, NOT HAND-WRITTEN.** A hand-written copy is a second declaration
 * of the same four keys that goes stale the first time one is renamed — and it would go stale
 * silently, because a boot script that reads the wrong key does not throw, it just restores
 * nothing. The values are `JSON.stringify`d so the generated source cannot be malformed by a name.
 *
 * `data-js` is set here rather than in a component for the same paint reason: the control is hidden
 * by default in the stylesheet and revealed by this attribute, so it never appears on a page whose
 * bundle failed.
 */
export const BOOT = `(function(){try{var d=document.documentElement;d.setAttribute('data-js','on');${Object.values(
  PREFS,
)
  .map(
    (p) =>
      `var v=localStorage.getItem(${JSON.stringify(p.key)});if(v&&${JSON.stringify(
        p.values,
      )}.indexOf(v)>-1)d.setAttribute(${JSON.stringify(p.attr)},v);`,
  )
  .join('')}}catch(e){}})();`;
