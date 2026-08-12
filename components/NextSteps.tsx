import Link from 'next/link';
import { getLedger, getSeries } from '@/lib/data';
import type { Step } from '@/lib/next-steps';
import { RecordMarks } from '@/components/marks';

/**
 * NEXT STEPS, RENDERED — a list item per step, each carrying its destination's declarations.
 *
 * **`<li>` is not a decorative choice.** A step that names a record by its title is a surface that
 * lists that record, so rule 4b applies: the declaration travels with the link. `<li>` is already
 * one of the shapes `listing-marks` and `unrecognised-rows` recognise, so the marks are required
 * here by the same gate that requires them in a table, and binding a new class would have been the
 * weaker of the two options.
 *
 * **Steps that name a SURFACE rather than a record carry no marks and need none** — *all 47
 * indicators under Governance* declares nothing of its own, and the surface it leads to carries the
 * declarations of everything on it.
 *
 * No ordering claim. The steps come out most-specific relation first, which is a property of the
 * RELATION and not of the destination; nothing here is ranked, scored or called most relevant.
 */
export function NextSteps({
  steps,
  overflow,
}: {
  steps: Step[];
  /** Printed where a cap bit, so a bounded list is never presented as a whole one. */
  overflow?: { n: number; href: string; label: string };
}) {
  if (!steps.length) return null;
  return (
    <>
      <h2>Where to go from here</h2>
      <p className="prose-note">
        Each of these is a relation this record declares, named beside the link. Nothing here is a
        similarity score or an order of interest.
      </p>
      <ul className="nsteps">
        {steps.map((s) => {
          const record =
            s.recordKind === 'series'
              ? getSeries(s.recordId!)
              : s.recordKind === 'ledger'
                ? getLedger(s.recordId!)
                : undefined;
          return (
            <li key={`${s.href}-${s.label}`}>
              {/* THE CLASS IS LOAD-BEARING, AND IT IS HERE BECAUSE OF A GATE MEASUREMENT.

                  `unrecognised-rows` decides whether a link sits inside a recognised listing row by
                  asking `span.includes(anchorHTML)` — **a STRING test, not a positional one.** A
                  next-step anchor to a paired series renders byte-identical markup to that series'
                  anchor inside the pair section higher up the page, so the pair-side occurrence
                  started testing as contained by a row it is nowhere near: the gate's pooled-pair
                  exemption fell from 36 to 0 and its source-line attributions from 724 to 708, 52
                  links in all, with the gate still reporting OK.

                  Naming the anchor makes the two strings differ and restores the accounting exactly.
                  **The underlying weakness is not fixed by this and is not mine to fix mid-item:**
                  any page rendering one record link twice, once inside a row and once outside, has
                  always been able to exempt the outside copy. Reported rather than patched. */}
              <Link className="nstep-to" href={s.href}>
                {s.label}
              </Link>
              <span className="nstep-why"> — {s.reason}</span>
              {record ? <RecordMarks record={record} /> : null}
            </li>
          );
        })}
      </ul>
      {overflow && overflow.n > 0 ? (
        <p className="prose-note">
          {overflow.n} more not listed here.{' '}
          <Link href={overflow.href}>{overflow.label}</Link>
        </p>
      ) : null}
    </>
  );
}
