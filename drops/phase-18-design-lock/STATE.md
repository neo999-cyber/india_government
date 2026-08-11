# Phase 18 — design lock. STATE.

**Read this file cold at the start of a session. It holds only what is still live.** Closed material
is in `state/phase-18.md`, moved there 2026-08-11 as a pure move — byte-identical, nothing edited.
**A section moves out only when it is closed, no open item depends on it, and any open item citing
it carries that evidence inline here.**

Also read `drops/phase-17-design-lock/STATE.md` as phase 18's opening measurement, per the CLAUDE.md
phase table. **That directory is named wrong on purpose and is left wrong**, on the same principle
that leaves a withdrawn wording quoted: renaming it erases the name collision its own contents
document.

---

## RESUME HERE

**Phase 18 is open.** Governed by `DESIGN-SCOPE.md` in this directory, revision 3, which supersedes
the two pre-phase drafts kept in its `inputs/`.

The five design features and the queue that carried them are **closed and archived**. What remains
open is one writing item and two standing hazards, below.

---

## OPEN ITEMS

### The domain period prose — 7 of 14 areas remain

**This is the only part of the design work that cannot be generated.** Each area takes a set of
periods, each with a heading, two or three sentences written from that area's records, and a `from`
list naming the ledger ids the period draws on. Authored in `lib/domain-copy.ts`.

**Written: `macro`, `education`, `environment`, `infrastructure`, `employment`, `welfare`,
`human-development`. Remaining: `banking`, `poverty`, `governance`, `kashmir`, `federalism`,
`foreign`, `defence`.** The other seven render the same page without the periods block — not a stub
and not a placeholder; the section simply is not there, which is honest where a heading over
generated filler would not be. `lib/domain-copy.ts` restates this count on every change.

**Evidence carried inline, because the section it came from is archived:** period count follows the
area and is never a template. `macro` takes four, `environment` and `employment` three,
`education` four opening at 2010 because the RTE Act's own numbers are the first period's subject.
**Governance has 110 records and poverty has 3** — poverty would take one period, not four.
Roughly two areas per batch. **Governance and Kashmir go last**, per the operator.

**Two disciplines that apply to every remaining area:**
- **Run `npx tsx tools/period-verdict-probe.mjs` by hand before committing.** Report-only, outside
  the build at one-in-nine. It has found four real defects in three runs, three of them shapes it
  was not built for: an id cited but never drawn on, an enum value used as ordinary English
  (`reversed` as a verb), and a hyphenated value spelled out in prose. **It detects an unused id
  only when that id's verdict token happens to be absent from the whole paragraph, which is luck
  rather than detection** — so hand-check the `from` list against the body as well.
- **The evidence note renders only where the grade is the subject and only for a stated reason.**
  `infrastructure`, `employment` and `welfare` carry one; `macro`, `education`, `environment` and
  `human-development` do not, and `human-development` was tested against the rule and failed it.
  The reason must be specific to how that area is published, never a restatement of the count.

---

## STANDING HAZARDS

**Phase 13's completeness is an open question**, per the CLAUDE.md phase table: delimitation was
partly covered in phase 12 and neither phase closed on the overlap explicitly. Nothing in phase 18
touches it, and it is restated here so a cold read does not treat 13 as closed.

**`drops/phase-17-design-lock/` is named wrong on purpose** and is left wrong, for the reason in the
header above.

---

## PINS

| pin | value |
|---|---|
| gate chain | **27 steps**, `npm run build`; `npm run commit` is the only sanctioned commit path |
| `unrecognised-rows` | **0**, report-only. Zero makes flipping it to a gate *available*, not decided |
| `listing-marks` | 3,552 listing rows · 5,008 marks |
| `field-render-audit` | 0 invisible, 17 exempted by name |
| deploy | `vercel.json` calls `npm run build`; `tools/deploy-chain.mjs` fails if the chain is ever restated instead of called |
| verify after push | `node tools/deploy-check.mjs` — needs the network, deliberately not in the build |

---

## ARCHIVE INDEX

`state/phase-18.md` — closed material, moved 2026-08-11, verbatim.

| section | what it holds |
|---|---|
| THE QUEUE, WHOLE, at `ae0dcaa` | the five-feature queue as it stood mid-phase. **Stale when archived** — it described F2 to F5 as unstarted after all five had shipped, which is the reason the split happened |
| Why the batch stopped here | the stop reasoning for the batch that measured F3 and did not build it |
| The standing design item, unchanged | the domain-page item as first stated, at 13 owed. Superseded by the live item above |
| Found and fixed inside this batch, not inherited | in-batch finds from the same batch |
| The two debts the pairs extension exposed | `pairs.ledgerRefs` and `pairs.status`. **Both since closed** — the reverse index shipped as `pairsNaming()`, and `status: "live"` was deleted from 12 records |
| COLD-START BRIEF — environment's caveat rate | answered 2026-08-11; kept for the reasoning, which is that a 0% rate was correct |
| THE NAV REGRESSION, STATED AGAINST MYSELF | closed |
| WHAT LANDED IN PHASE 18 SO FAR | the phase's landing log to that point |
