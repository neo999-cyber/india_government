'use client';

import { useEffect, useState } from 'react';
import type { Redline } from '@/lib/corrections';

/**
 * THE REDLINE — what a corrected field said, and what it says now, with the change marked.
 *
 * ============================ WHY THIS IS THE SITE'S STRONGEST SURFACE ========================
 *
 * Every publication claims to correct its errors. This one can show them: 30 redlines across 23
 * records, each one a field whose prior text is in the history and whose withdrawn wording is
 * quoted inside the correction itself — and `quotation-identity` proves the quotation matches what
 * that field actually held, 31 of 31. **It is the method as a gesture rather than as a claim**, and
 * it is the thing nothing else about Indian policy does.
 *
 * ============================ NOTHING IS TRUNCATED ON EITHER SIDE =============================
 *
 * Both texts are in the DOM in full, always. **The control changes emphasis, never presence** — it
 * does not fetch, collapse or clip, and with scripting off both sides are readable exactly as they
 * are with it on. That is rule 3a's discipline applied to a surface rule 3a does not reach: a
 * correction cut to fit would be the failure this whole page exists to disprove.
 *
 * The generator asserts `prefix + removed + suffix === before` and `prefix + added + suffix ===
 * after`, exactly, for all 30 — so the marked-up render is the two texts and not a summary of them.
 *
 * ============================ THE TWO SHAPES ONE RENDERER HAS TO CARRY ========================
 *
 * **8 of 30 are full rewrites** — before and after share nothing, so the removed span is the whole
 * old text and the added span the whole new one. **22 are partial**, where a sentence was withdrawn
 * inside a paragraph that otherwise stands. A common prefix and suffix expresses both, and the
 * boundaries are snapped to whole words in the generator, because a character diff cuts mid-word
 * and renders a correction as a typo.
 *
 * ============================ WHAT THE CONTROL DOES NOT CLAIM =================================
 *
 * Default is AFTER, because the current text is what the record says. The wipe reveals the prior
 * state; it does not present the two as equally live. **Brass marks both spans and neither is
 * coloured for merit** — a withdrawn sentence is not a wrong one being punished, it is a sentence
 * this instrument stopped standing behind, and several of these are tightenings rather than
 * repairs.
 */
export function Redline({ item, marks }: { item: Redline; marks?: React.ReactNode }) {
  const [showBefore, setShowBefore] = useState(false);

  // The master control publishes an event rather than lifting state through 30 items.
  useEffect(() => {
    const onAll = (e: Event) => setShowBefore((e as CustomEvent<boolean>).detail);
    window.addEventListener('redline:all', onAll as EventListener);
    return () => window.removeEventListener('redline:all', onAll as EventListener);
  }, []);

  const rewrite = !item.prefix.trim() && !item.suffix.trim();

  return (
    <article className={`redline${showBefore ? ' is-before' : ''}`}>
      <div className="redline-head">
        <p className="redline-meta mono">
          <a href={`/${item.layer}/${item.id}/`}>{item.id}</a> · {item.field} ·{' '}
          {item.beforeDate} → {item.afterDate ?? 'unknown'}
          {rewrite ? ' · rewritten whole' : ' · partial'}
        </p>
        <h3 className="redline-title">
          <a href={`/${item.layer}/${item.id}/`}>{item.title}</a>
        </h3>
        {/* RULE 4b. This names a record by its title, so it LISTS it and owes its declarations.
            `unrecognised-rows` reported 9 of these the moment the surface landed — 18 of the 23
            records with a redline declare a mark — which is the whole reason that check was built
            before this feature rather than after it. The marks are rendered by the server page and
            passed in: `RecordMarks` reads the record, and this component holds only the redline. */}
        {marks}
        <button
          type="button"
          className="redline-toggle"
          onClick={() => setShowBefore((v) => !v)}
          aria-pressed={showBefore}
        >
          {showBefore ? 'Show what it says now' : 'Show what it said before'}
        </button>
      </div>

      <p className="redline-text">
        {item.prefix}
        {item.removed ? (
          <span className="redline-removed">
            <span className="sr-only">Withdrawn: </span>
            {item.removed}
          </span>
        ) : null}
        {item.added ? (
          <span className="redline-added">
            <span className="sr-only">Replaced with: </span>
            {item.added}
          </span>
        ) : null}
        {item.suffix}
      </p>
    </article>
  );
}

/**
 * One control for the page. It drives every redline through an event rather than through props,
 * so a single item toggled by hand is not silently reset by the master's state — the master says
 * *set them all to this*, and an item may then differ from it. That is the behaviour a reader
 * expects of a "show all" and the one that lifted state would have got wrong.
 */
export function RedlineMaster({ count }: { count: number }) {
  const [all, setAll] = useState(false);
  const set = (v: boolean) => {
    setAll(v);
    window.dispatchEvent(new CustomEvent('redline:all', { detail: v }));
  };
  return (
    <p className="redline-master">
      <button type="button" onClick={() => set(!all)} aria-pressed={all}>
        {all ? `Show all ${count} as they now read` : `Show all ${count} as they read before`}
      </button>
      <span className="t-note">
        Both texts are on the page either way — the control changes emphasis, never presence.
      </span>
    </p>
  );
}
