'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * THE ALL-PAGES DISCLOSURE — still a `<details>`, now dismissible.
 *
 * ============================ WHAT WAS WRONG =================================================
 *
 * A bare `<details>` closes on one thing only: a second click on its own summary. Measured on
 * production before the fix — open the panel, then **click anywhere else on the page: still open.
 * Press Escape: still open.** And a third that is easier to miss than either: the panel holds 17
 * links, and a client-side navigation keeps this DOM alive, so following one left the panel hanging
 * open over the page it had just taken you to.
 *
 * ============================ WHY IT IS STILL A `<details>` ===================================
 *
 * `app/layout.tsx` recorded the reason this control has no script: *"an overlay built on a state
 * hook would be a control that renders correctly and reaches nobody the moment the bundle fails —
 * the defect this exists to fix, reintroduced by the fix."* **That reasoning is right and it is not
 * being overturned.**
 *
 * So the ELEMENT is unchanged and the open/close state is still the browser's, not React's. With no
 * JavaScript this behaves exactly as it did: opens on click, opens on Enter, is in the tab order,
 * announces its state. **The script only ADDS ways to close something already open** — it cannot
 * leave the control unusable if it fails, because it owns none of the control's function.
 *
 * ============================ THE THREE DISMISSALS ===========================================
 *
 * `pointerdown` rather than `click`, so a drag that starts outside also dismisses, and touch is
 * covered without a second listener. Clicks INSIDE the element are ignored, which is what lets the
 * summary keep toggling natively — the guard is containment, so no ordering trick is needed.
 *
 * Escape returns focus to the summary. Dismissing a disclosure and leaving focus in a panel that is
 * no longer visible strands a keyboard reader in nothing.
 *
 * Both listeners are removed on unmount. The brief that governs this kind of control names global
 * event leakage explicitly, and a listener on `document` from a component in the root layout would
 * outlive every navigation if it were not cleaned up.
 */
export function AllPagesDisclosure({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const close = () => {
      if (el.open) el.open = false;
    };

    // Anything outside the disclosure dismisses it. Inside is ignored so the summary keeps its
    // native toggle and a reader can select text in the panel without it vanishing.
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

    // Following a link is a dismissal too: the route changes under a panel that would otherwise
    // still be open, because client-side navigation never rebuilds this element.
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('a')) close();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    el.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      el.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <details className="allpages" ref={ref}>
      <summary aria-label="All pages">All pages</summary>
      {children}
    </details>
  );
}
