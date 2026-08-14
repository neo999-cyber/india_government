import { test, expect } from '@playwright/test';

/**
 * COMMITMENT-YEAR LABELS DO NOT SIT ON TOP OF EACH OTHER.
 *
 * Every event label used to render at one height, `y = PAD.top + 4`, so two commitment years close
 * together simply overlapped: **three pairs across eight pages, worst 60px**, on the topic lead
 * charts. It read as a rendering bug because it was one.
 *
 * **WHY THIS CANNOT BE A BUILD GATE.** `chart-ticks` reads the built SVG bytes and can check that a
 * grid line sits inside its own frame, because that is arithmetic on attributes. Whether two `<text>`
 * elements overlap depends on the glyph advances of a webfont at a rendered scale — there is no
 * layout in a static file to ask. Only a browser knows.
 *
 * **AND THE FIX WAS WRONG THE FIRST TIME IN A WAY ONLY MEASUREMENT CAUGHT.** Lanes were spaced 11
 * viewBox units against a label box of 12, so labels in DIFFERENT lanes still overlapped by a pixel
 * and the count went from three to four. A lane that does not clear the glyph box is not a lane.
 * That is why this asserts on rendered boxes and not on the `y` attributes being distinct.
 */

const PAGES = [
  '/domains/education/', // two commitment years one year apart
  '/domains/banking/', // three consecutive years — the case that needs a third lane
  '/domains/environment/',
  '/domains/macro/',
  '/domains/governance/',
] as const;

test.describe('chart event labels', () => {
  for (const path of PAGES) {
    test(`${path} — no two chart labels overlap, and none leaves its chart`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(path);

      const found = await page.evaluate(() => {
        const overlaps: string[] = [];
        const escaped: string[] = [];
        let charts = 0;
        for (const svg of document.querySelectorAll('svg')) {
          charts++;
          const frame = svg.getBoundingClientRect();
          const els = [...svg.querySelectorAll('text')].filter(
            (e) => e.getBoundingClientRect().width > 0,
          );
          for (let i = 0; i < els.length; i++) {
            const a = els[i].getBoundingClientRect();
            if (a.left < frame.left - 1 || a.right > frame.right + 1)
              escaped.push(els[i].textContent!.trim());
            for (let j = i + 1; j < els.length; j++) {
              const b = els[j].getBoundingClientRect();
              if (!(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top))
                overlaps.push(
                  `"${els[i].textContent!.trim()}" over "${els[j].textContent!.trim()}"`,
                );
            }
          }
        }
        return { overlaps, escaped, charts };
      });

      // A page whose charts vanished would pass every assertion below. It is not a pass.
      expect(found.charts, 'no charts found — the scan is broken, not the page clean').toBeGreaterThan(0);
      expect(found.overlaps, 'chart labels overlap').toEqual([]);
      expect(found.escaped, 'a chart label runs outside its own frame').toEqual([]);
    });
  }
});
