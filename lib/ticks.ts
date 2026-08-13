/**
 * GRID TICKS DERIVED FROM THE SCALE THEY ARE DRAWN ON.
 *
 * ============================ WHY THIS EXISTS =================================================
 *
 * `TwoInstruments` took its y-window as a prop on 2026-08-13 and **left its grid lines hardcoded at
 * `[0, 25, 50, 75]`**. The scale moved and the reference marks did not. Read from the built bytes,
 * the damage was not subtle:
 *
 * | story | `yMax` | grid `y1` as shipped | off-canvas |
 * |---|---|---|---|
 * | `what-counts-as-education-spending` | 6 | 266, −742, −1751, −2759 | **3 of 4** |
 * | `did-jobs-grow` | 10 | 266, −339, −944, −1549 | **3 of 4** |
 * | `how-renewable` | 60 | 266, 165, 64, −36 | 1 of 4 |
 * | `a-zero-that-is-not-a-zero` | 12000 | 266, 265, 265, 264 | 0, but collapsed onto the baseline |
 * | `two-counts-one-boundary` | 600 | 266, 256, 245, 235 | 0, collapsed into 31px |
 *
 * **Two of seven stories drew one grid line and hid three; two more drew four lines on top of each
 * other. Only two were correct** — the two whose `yMax` happened to be near the original 75.
 *
 * **This is the shape of defect a parameterisation makes and a gate catches.** Nothing in the type
 * system objects: `yMax` is a number and `[0, 25, 50, 75]` is an array of numbers, and they are
 * only related by an assumption nobody wrote down. `tools/chart-ticks.mjs` now observes the
 * rendered effect rather than the source, per the rule that where a property can be observed, it is
 * observed.
 *
 * ============================ WHAT IT DOES NOT DO =============================================
 *
 * **It returns no labels, and that is deliberate rather than unfinished.** `TwoInstruments` draws
 * two series in DIFFERENT units on one set of axes — ASER's share of children against PARAKH's mean
 * item-success rate — and its header records that the axis is left unlabelled for exactly that
 * reason. A numbered y-axis would assert a shared value scale that the corpus refuses. The lines
 * are spacing references, so they are derived, in range, and mute.
 */

/** Steps that read as round numbers at any magnitude. 2.5 earns its place: without it a `yMax` of
 *  10 falls to a step of 5 and the chart gets three lines where five is the readable count. */
const NICE = [1, 2, 2.5, 5, 10];

/**
 * Ticks from 0 up to and including `max` where the step divides it, otherwise up to the last step
 * below it. Aims at five intervals and lands between four and six ticks for every scale this
 * instrument uses.
 *
 * Every returned value satisfies `0 <= t <= max`, which is the property the gate asserts.
 */
export function ticksForMax(max: number, target = 5): number[] {
  if (!Number.isFinite(max) || max <= 0) return [0];
  const raw = max / target;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const step = (NICE.find((n) => norm <= n) ?? 10) * mag;
  const out: number[] = [];
  // The epsilon admits a final tick that lands exactly on `max` after floating-point division;
  // without it a yMax of 6 with a step of 2 drops its top line about half the time.
  for (let v = 0; v <= max + step * 1e-9; v += step) out.push(Number(v.toPrecision(12)));
  return out;
}
