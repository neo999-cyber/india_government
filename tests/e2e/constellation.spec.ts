import { test, expect } from '@playwright/test';

/**
 * THE RECORD CONSTELLATION — the landing artwork, and the defects in it that were invisible.
 *
 * **WHY THIS FILE EXISTS RATHER THAN A LINE IN `overflow.spec.ts`.** The area name was first a
 * per-button tooltip: absolutely positioned, `left: 50%`, `white-space: nowrap`, `visibility:
 * hidden` until hover. **A `visibility: hidden` element still occupies layout**, so at 320px the
 * tooltips on the outermost controls extended past the viewport and pushed the document sideways —
 * 343px of scrollWidth in a 320px window — *while invisible*. Nothing on screen looked wrong and the
 * element causing it could not be seen.
 *
 * So this asserts at **320px, the narrowest width the design brief names**, and it asserts with the
 * name REVEALED as well as hidden — a check that only ever measures the resting state passes over
 * the bug in one direction and over its fix in the other.
 *
 * **THE SECOND CLASS IS OVERLAP**, which bit twice: the status caption sat inside the source line at
 * desktop width (the source wraps to two lines) and again at 320px (where it wraps to four). Both
 * were found by measuring, and both are held here, because spacing set from one width is a guess
 * about every other one.
 *
 * The rest holds the interaction contract: eight controls, real buttons, `aria-pressed`, selecting
 * toggles back off, and the unselected constellations stay PRESENT rather than removed — they are
 * context, and `display: none` would be the easy wrong fix.
 */

/**
 * THE CONSTELLATION LEFT THE LANDING PAGE ON 2026-09-01 and is now one of the Atlas's four views,
 * where it always also lived. **WITHDRAWN: `page.goto('/')` in all five places.** Nothing about the
 * artwork changed — this file's assertions are about its own layout and interaction contract, which
 * is why repointing the route was the whole of the change.
 */
const ROUTE = '/overview/?view=constellation';

const boxes = async (page: import('@playwright/test').Page) =>
  page.evaluate(() => {
    const rc = document.querySelector('.rc')!;
    const r = (s: string) => {
      const b = rc.querySelector(s)!.getBoundingClientRect();
      return { l: b.left, r: b.right, t: b.top, b: b.bottom };
    };
    return {
      art: r('.rc-art'),
      stage: r('.rc-stage'),
      status: r('.rc-status'),
      source: r('.rc-source'),
      badges: [...rc.querySelectorAll('.rc-node-btn')].map((el) => {
        const b = el.getBoundingClientRect();
        return {
          area: (el as HTMLElement).dataset.area!,
          l: b.left,
          r: b.right,
          t: b.top,
          b: b.bottom,
          w: b.width,
          h: b.height,
        };
      }),
    };
  });

type Box = { l: number; r: number; t: number; b: number };
const overlaps = (a: Box, z: Box) => !(a.r <= z.l || z.r <= a.l || a.b <= z.t || z.b <= a.t);

test.describe('record constellation', () => {
  test('320px — nothing pushes the document sideways, name hidden or shown', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto(ROUTE);
    // A CLIENT-RENDERED VIEW IS NOT THERE AT `goto`. `.rc` mounts after hydration, and the subject
    // carousel above it (14 images) moved that past the moment `boxes()` used to run: `.rc` was null.
    await page.locator('.rc').waitFor();

    /**
     * THE RIGHT EDGE ONLY, and that is not laziness. An earlier version also failed anything with
     * `left < -1` and it caught `.skip-link` — the skip-to-content link, parked off-screen to the
     * left until it takes focus. That is the standard idiom and in a left-to-right document it
     * cannot scroll anything. **A check that fails on a correct accessibility affordance gets
     * deleted within a cycle, and the real assertion goes with it.**
     */
    const measure = () =>
      page.evaluate(() => {
        const de = document.documentElement;
        const offenders: string[] = [];
        for (const el of document.body.querySelectorAll('*')) {
          const b = el.getBoundingClientRect();
          // `.sc-stage` joined the named clipping containers on 2026-09-02: the subject carousel's
          // off-centre cards are translated past the stage's edges BY DESIGN and the stage clips them
          // (`overflow: hidden`), so their rects exceed the viewport while the document does not
          // scroll — the same shape as a table inside `.table-wrap`. The document-scroll assertion
          // below still binds the page; this list names what may legitimately extend.
          if (b.right > de.clientWidth + 1 && !el.closest('.table-wrap, .dtabs, [data-scroll-x], .sc-stage')) {
            const c = el.className;
            offenders.push(
              typeof c === 'string' ? c : ((c as unknown as SVGAnimatedString)?.baseVal ?? el.tagName),
            );
          }
        }
        return { scrollWidth: document.body.scrollWidth, clientWidth: de.clientWidth, offenders };
      });

    const resting = await measure();
    expect(resting.offenders, 'at rest, nothing may extend past the viewport').toEqual([]);
    expect(resting.scrollWidth).toBeLessThanOrEqual(resting.clientWidth);

    // Reveal the longest name — "Government and the states" — and measure again.
    await page.locator('.rc-node-btn[data-area="government"]').focus();
    const revealed = await measure();
    expect(revealed.offenders, 'with the name shown, still nothing past the viewport').toEqual([]);
    expect(revealed.scrollWidth).toBeLessThanOrEqual(revealed.clientWidth);
  });

  for (const width of [320, 375, 768, 1280] as const) {
    test(`${width}px — the stage, the controls and both captions keep out of each other`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(ROUTE);
    // A CLIENT-RENDERED VIEW IS NOT THERE AT `goto`. `.rc` mounts after hydration, and the subject
    // carousel above it (14 images) moved that past the moment `boxes()` used to run: `.rc` was null.
    await page.locator('.rc').waitFor();
      const b = await boxes(page);

      expect(b.badges, 'all eight areas are present').toHaveLength(8);

      for (const badge of b.badges) {
        expect(badge.w, `${badge.area} target width`).toBeGreaterThanOrEqual(44);
        expect(badge.h, `${badge.area} target height`).toBeGreaterThanOrEqual(44);
        expect(badge.l, `${badge.area} is inside the panel`).toBeGreaterThanOrEqual(b.art.l - 1);
        expect(badge.r, `${badge.area} is inside the panel`).toBeLessThanOrEqual(b.art.r + 1);
        expect(overlaps(badge, b.status), `${badge.area} clear of the status line`).toBe(false);
        expect(overlaps(badge, b.source), `${badge.area} clear of the attribution`).toBe(false);
      }

      // No two controls on the ring may touch.
      for (let i = 0; i < b.badges.length; i++)
        for (let j = i + 1; j < b.badges.length; j++)
          expect(
            overlaps(b.badges[i], b.badges[j]),
            `${b.badges[i].area} overlaps ${b.badges[j].area}`,
          ).toBe(false);

      expect(overlaps(b.status, b.source), 'status line clear of the attribution').toBe(false);
      expect(overlaps(b.status, b.stage), 'status line clear of the map').toBe(false);
      expect(b.stage.t, 'the map is not clipped at the top').toBeGreaterThanOrEqual(b.art.t - 1);
      expect(b.stage.b, 'the map is not clipped at the foot').toBeLessThanOrEqual(b.art.b + 1);
    });
  }

  /**
   * ONE PAGE EDGE — the artwork and the prose start at the same x, at every width.
   *
   * **THIS TEST PREVIOUSLY ASSERTED THE OPPOSITE and the withdrawn assertion is worth recording:**
   * it required the artwork to be WIDER than the shell, because for one commit the page ran two
   * width tracks — 84rem for surfaces, 68rem for text. The result was a left edge that moved as a
   * reader scrolled past the map, which the operator caught on sight. The page is now one 84rem
   * frame with prose held at `--measure` inside it.
   *
   * So the property to bind is ALIGNMENT, not width. A future change that re-widens one element
   * without the other reintroduces exactly the defect that was shipped and reverted.
   */
  for (const width of [768, 1100, 1280, 1440, 1710] as const) {
    test(`${width}px — the artwork and the prose share one left edge`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(ROUTE);
    // A CLIENT-RENDERED VIEW IS NOT THERE AT `goto`. `.rc` mounts after hydration, and the subject
    // carousel above it (14 images) moved that past the moment `boxes()` used to run: `.rc` was null.
    await page.locator('.rc').waitFor();

      // ANCHORED TO THE COMPONENT'S OWN PROSE, NOT THE PAGE'S `h1`. **WITHDRAWN: a comparison
      // against `page.locator('h1')`.** That worked while this artwork was the landing page's own
      // block; on the Atlas it sits inside the board, 32px in from the page heading, and the test
      // failed on a correct layout. The property being bound is that the artwork does not run on a
      // width track of its own — so the thing to compare it with is the prose beside it, `.rc-copy`,
      // which travels with the component to whatever page hosts it.
      const prose = (await page.locator('.rc-copy').boundingBox())!;
      const art = (await page.locator('.rc-window').boundingBox())!;

      expect(Math.abs(art.x - prose.x), 'the artwork and its prose start at different x').toBeLessThanOrEqual(1);
      expect(art.x, 'the artwork runs off the left edge').toBeGreaterThanOrEqual(-1);
      expect(art.x + art.width, 'the artwork runs off the right edge').toBeLessThanOrEqual(width + 1);

      const scrolls = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(scrolls, 'the page scrolls sideways').toBe(false);
    });
  }

  test('selecting focuses one constellation, selecting again returns to all eight', async ({
    page,
  }) => {
    await page.goto(ROUTE);
    // A CLIENT-RENDERED VIEW IS NOT THERE AT `goto`. `.rc` mounts after hydration, and the subject
    // carousel above it (14 images) moved that past the moment `boxes()` used to run: `.rc` was null.
    await page.locator('.rc').waitFor();

    const status = page.locator('.rc-status');
    await expect(status).toHaveText('All eight constellations');

    const gov = page.locator('.rc-node-btn[data-area="government"]');
    await expect(gov).toHaveAttribute('aria-pressed', 'false');
    await gov.click();

    await expect(gov).toHaveAttribute('aria-pressed', 'true');
    await expect(status).toContainText('Government and the states');
    await expect(page.locator('.rc-group[data-area="government"]')).toHaveAttribute(
      'data-state',
      'on',
    );

    // THE UNSELECTED ONES REMAIN. Quieter, and still on the page — they are context, and
    // `display: none` is the fix that would pass a weaker assertion.
    const edu = page.locator('.rc-group[data-area="education"]');
    await expect(edu).toHaveAttribute('data-state', 'off');
    await expect(edu).toBeVisible();
    expect(await edu.locator('.rc-node').count()).toBeGreaterThan(0);

    await gov.click();
    await expect(gov).toHaveAttribute('aria-pressed', 'false');
    await expect(status).toHaveText('All eight constellations');
    await expect(page.locator('.rc-group[data-area="government"]')).toHaveAttribute(
      'data-state',
      'all',
    );
  });

  test('the official outline, the ghost sheet and the attribution all render', async ({ page }) => {
    await page.goto(ROUTE);
    // A CLIENT-RENDERED VIEW IS NOT THERE AT `goto`. `.rc` mounts after hydration, and the subject
    // carousel above it (14 images) moved that past the moment `boxes()` used to run: `.rc` was null.
    await page.locator('.rc').waitFor();

    // The outline is the thing a reader actually sees, and it is 35KB of official geometry. A
    // truncated or missing path would leave the marks floating on nothing while every other
    // assertion here still passed.
    const d = await page.locator('.rc-outline').getAttribute('d');
    expect(d!.length, 'the India outline is the full path').toBeGreaterThan(30_000);

    const res = await page.request.get('/map/india-political-2026-soi-13th-edition.jpg');
    expect(res.status()).toBe(200);
    expect(Number(res.headers()['content-length'])).toBeGreaterThan(100_000);

    await expect(page.locator('.rc-note')).toContainText(
      'Conceptual positions — not geographic values',
    );
    await expect(page.locator('.rc-source')).toContainText('Survey of India');
    await expect(page.locator('.rc-attrib')).toContainText('Government of India copyright 2026');
  });
});
