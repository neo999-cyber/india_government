import { test, expect } from '@playwright/test';

/**
 * NO PAGE SCROLLS SIDEWAYS AT 375px.
 *
 * A phone is a narrower layout, not an exemption. The mobile pass fixed the question-route tables,
 * which ran 229px wider than the viewport; this holds that closed and catches the next one.
 *
 * **The document must not scroll horizontally. A designated region inside it may** — `.table-wrap`
 * exists precisely so a wide table can scroll within its own box instead of dragging the page with
 * it, and `keyboard-scroll.spec.ts` asserts those regions are reachable. So the assertion is on the
 * BODY, not on every element.
 *
 * One representative route per template family. Not every route: 754 pages through a browser is a
 * different kind of tool, and the families are where a layout defect lives.
 */
const ROUTES = [
  ['/', 'landing'],
  ['/series/', 'a large index'],
  ['/ledger/', 'a second index, different table shape'],
  ['/search/', 'the heaviest document'],
  ['/directory/', 'the new contents page'],
  ['/domains/macro/', 'a topic overview'],
  ['/domains/macro/records/', 'a topic tab'],
  ['/series/coal-production/', 'a record page'],
  ['/stories/did-jobs-grow/', 'a story with a scroller'],
  ['/questions/', 'a question index'],
  ['/method/', 'long prose with tables'],
  // ADDED AFTER BOTH WERE FOUND OVERFLOWING ON PRODUCTION, by sweeping the routes this list did not
  // cover. `/derivations/` was **641px** over — a formula block with no break opportunity — and the
  // external audit never found it either. **A representative list is only representative of what
  // someone thought to put in it**, which is why the sweep ran over every index route rather than
  // trusting these eleven.
  ['/derivations/', 'formula blocks with no break opportunity'],
  ['/series/res-capacity-share/', 'a record page with a long token in prose'],
] as const;

test.describe('no horizontal overflow at 375px', () => {
  // Width is set by the `mobile` project in `playwright.config.ts`.

  for (const [route, why] of ROUTES) {
    test(`${route} — ${why}`, async ({ page }) => {
      await page.goto(route);

      const { scrollWidth, clientWidth, offenders } = await page.evaluate(() => {
        const doc = document.documentElement;
        const over: { tag: string; cls: string; right: number }[] = [];
        if (document.body.scrollWidth > doc.clientWidth) {
          for (const el of document.querySelectorAll('body *')) {
            const r = el.getBoundingClientRect();
            // Report only elements that push PAST the viewport and are not inside a region that is
            // allowed to scroll on its own.
            if (r.right > doc.clientWidth + 1 && !el.closest('.table-wrap, .dtabs, [data-scroll-x]')) {
              over.push({ tag: el.tagName.toLowerCase(), cls: (el.className || '').toString().slice(0, 50), right: Math.round(r.right) });
            }
          }
        }
        return { scrollWidth: document.body.scrollWidth, clientWidth: doc.clientWidth, offenders: over.slice(0, 6) };
      });

      expect(
        scrollWidth,
        `body scrolls ${scrollWidth - clientWidth}px past the viewport. First offenders: ${JSON.stringify(offenders, null, 1)}`,
      ).toBeLessThanOrEqual(clientWidth);
    });
  }
});
