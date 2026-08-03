# STATE — phase 12, kashmir-rights, `--dry`

Run date 2026-08-03. Posture `--dry`: run to the drop, stop before merge. `/data` is NOT touched by this run.
Base: `main` at f0e620a (phase 11 merged and closed; lenses[], domain-coverage gate, `no-objective`, `demography` removed — all closed, none re-verified).

## Scope

The rights and political arc of Jammu and Kashmir. Detentions and the Public Safety Act ·
internet and communications shutdowns · Article 370's legal mechanics and the August 2019
reorganisation AS SUBJECT · statehood restoration · elections and the 2024 assembly poll ·
delimitation · domicile and land law · panchayat and local bodies.

NOT in scope — phase 11 owns: incidents, casualties, infiltration, recruitment, encounters,
pellet and crowd-control injuries, custodial deaths. Refs across the boundary are expected.
Do not re-author a phase-11 record; amend it if new material bears on it.

## Stage status

| Stage | Model | Status | Notes |
|---|---|---|---|
| 1 Scope | haiku + main loop | COMPLETE | Enum audit CLEAN — subagent's two trigger-D findings on `lenses` were false positives, overturned in the main loop by reading the schemas. Counts re-derived from every file in each layer. |
| 2 Research | opus | **COMPLETE** — after one liveness failure and a full recovery | 15 part files, ~13,700 lines. All children observed `claude-opus-5`, self-reported. See the liveness section. |
| 3 Author | opus, no fan-out | **COMPLETE** | 25 ledger · 15 series · 12 provenance · 15 pairs. No fan-out, as the spec requires. |
| 4 Self-check + arithmetic | main loop | **COMPLETE — CLEAN** | `stage4-selfcheck`: 0 errors, 0 warnings, 171 refs across all 14 derived forms. Arithmetic hand-check run as its own stage: **one defect found and corrected in the record AND at source in `parts/`.** |
| 5 Reconcile | main loop | **COMPLETE — CLEAN** | No id collisions against live, no duplicates, contiguous L-0125..149 / P-88..99 / PR-33..47 from true live maxima derived across every file in each layer. |
| 6-8 | — | **NOT RUN — `--dry`, as instructed** | `/data` untouched. Nothing merged. No PR. |

## Final verification, run in the main loop against the drop

- **lenses**: 15/15 series and 15/15 pairs carry `lenses: ["kashmir"]`. Zero `domain: "kashmir"`.
- **ledger domains**: 25/25 carry a substantive domain **and** `kashmir`. **Zero kashmir-only** — the
  three-baseline defect is not repeated.
- **`withheld`**: 3 of 8 tested passed; all three carry a named party and a date in the record itself.
- **No seam on 2014** anywhere. 18 breaks declared across 15 series, each with a provenance ref.
- **619 authored nowhere** (trigger B carried, not rounded).
- Arithmetic recomputed independently: 146,563 · 125,082 · 21,481 · 1.1717 · 145,366 · 15+91=106 ·
  153+11=164 · 7+164+166=337 · 114−24=90 · 107−24=83 · 87−4=83 · 83+7=90 · XIV-FC sums 3463.73 /
  1857.93 / 1605.80 / 53.64%. All correct.

## Stage 2 liveness failure, 2026-08-03 ~10:00 — recorded, NOT a stop trigger

Six of seven stage-2 children plus two grandchildren died simultaneously on an API session limit
(`resets 12:20pm Asia/Dubai`). **Liveness failure, not a judgement escalation** — a dead agent has
not reached a decision, so §5 does not apply.

**What survived on disk, unharmed (~4,400 lines):** `02-detention-psa.md` (850),
`03-shutdowns.md` (1,262), `06-domicile-land.md` (1,135), `07-panchayat-local.md` (1,144).
The fan-out-writes-its-own-file design held: nothing that reached a file was lost.

**What was recovered from the orchestrator's context:** one grandchild (SFC / funds / functions /
functionaries) returned a full report AND **wrote no files** — it existed only in this session's
context, which is exactly how phase 11's first occurrence lost three reports. Preserved **verbatim**
as `parts/07b-RECOVERED-sfc-funds-devolution.md` before any resume was attempted. Same remedy as
phase 11's `06b`, and for the same reason.

**What was lost outright and must be re-run — no file, no recovered report:**

| Part | Died at | Cost |
|---|---|---|
| `04-article370-reorganisation.md` | before any retrieval | total — nothing done |
| `05-elections-delimitation.md` | mid-retrieval, "the 1996 report and the 2024 pages" | substantial retrieval lost |
| `08-rights-institutions.md` | at fan-out, "parallelise three independent strands" | near-total |

**Two files are complete-looking but are NOT complete**, and this is the stale-assembly trap one
stage on — a consumer reading them has no signal:
- `02-detention-psa.md` — the NCRB / *Prison Statistics India* detenu question was dispatched and
  never returned. **The file does not say so.**
- `03-shutdowns.md` — its MHA/DoT parliamentary-answer grandchild died; the parent's own last words
  were "then append the remaining subagent findings", and that append never happened.

**Both are marked in-file before stage 3 reads them.** A stage may not run against partial input, and
the gap is invisible in the output if it is not written down where the consumer will see it.

## THE RETRIEVAL FINDING — root cause found, and it is a resolver artefact

Every "host is dead" line written in this phase, and an unknown number in phase 11, came from **a DNS
resolver failure, not from an unreachable host.**

**Measured in the main loop, not relayed** — `dig` against the system resolver and against 1.1.1.1,
then `curl --resolve` with a browser user-agent, 2026-08-03:

| Host | system | `dig @1.1.1.1` | HTTP |
|---|---|---|---|
| `nhrc.nic.in` | SERVFAIL | 164.100.229.84 | **200** |
| `indiacode.nic.in` | SERVFAIL | 94.202.207.59 | 302 |
| `sansad.in` | SERVFAIL | 164.100.252.170 | 302 |
| `egazette.gov.in` | SERVFAIL | 164.100.190.144 | 302 |
| `ncrb.gov.in` | SERVFAIL | 45.127.74.245 | 307 |
| `eci.gov.in` | SERVFAIL | 164.100.229.115 | **000 — resolves, will not connect** |
| `jkhome.nic.in` | SERVFAIL | **SERVFAIL** | — |
| `jklegislativeassembly.nic.in` | SERVFAIL | **SERVFAIL** | — |

**The finding is real but NARROWER than the child that found it claimed**, and the narrowing is the
important part. The child reported that every host recorded as dead resolves. Two do not:

- **`jklegislativeassembly.nic.in` fails on the good resolver too.** So **L-0123's caveat stands** —
  phase 11 was right, and no amendment is owed.
- **`jkhome.nic.in` likewise.** So **part 12's absence B7 stands**, "addressee could not be verified"
  included.
- **`eci.gov.in` is a third, different failure** — it resolves and will not complete a connection,
  consistent with a block rather than a name problem.

**A substantive finding falls out of the correction, and it is not a retrieval note.** The Union
government's hosts resolve and answer; **the J&K administration's own hosts do not resolve at all**,
on either resolver. That asymmetry belongs in the rights-institutions part as an observation about
what a citizen can reach — stated at its honest strength: one network position, one date, not evidence
of intent, and an unresolvable host is not a destroyed record.

**Two method rules follow, and they are for the SKILL, not just this phase:**
1. A reachability failure is retested **from a second process AND a second resolver** before it is
   recorded as an environment fact.
2. **A correction propagated from a subagent is verified before it is propagated onward.** The main
   loop pushed this child's finding to three siblings and had to issue a narrowing correction minutes
   later — the over-claim would otherwise have produced a false "route now verified" amendment against
   a phase-11 absence.

`07b`'s host-failure table is single-process AND single-resolver and is to be read as unreliable.

## ⚠ THE DESIGN FAULT THIS RUN FOUND — asynchronous grandchildren versus a downstream stage

**It bit three times in one run. That makes it a fault, not bad luck, and it belongs in the SKILL.**

The fan-out-writes-its-own-file rule saved this phase from the session-limit death. But it has a
consequence nobody had written down: **a grandchild outlives its parent, keeps writing after the
parent reports "completed", and its file therefore keeps growing after the orchestrator believes
stage 2 is finished.** Stage 3 was launched at 13:01 against files that looked complete. Four of them
were not:

| File | at launch | final | written at |
|---|---|---|---|
| `03-shutdowns.md` | 1,944 | 2,152 | 13:01 |
| `03b-parliamentary-answers.md` | 642 | 778 | 13:05 |
| `05b-nominated-members-and-poll-gap.md` | 499 | 706 | 13:09 |
| `02b-psi-live-host.md` | 125 | 378 | 13:10 |
| `08b-state-information-commission.md` | **181** | **751** | 13:13 |

The last is the sharp case: **stage 3 may have read under a quarter of the only file in the drop
covering the State Information Commission**, and nothing in the output would have shown it. This is
the stale-assembly trap the spec already names, displaced one level: not a stale *assembly*, but a
stale *read of a live file*.

**Three mitigations were tried and only the third works.**
1. ❌ *Checksum stability.* Polled twelve consecutive five-second reads and concluded the author was
   dead. It was between writes. **Quiescence is not completion**, and acting on it caused an append to
   race a live writer and produce a note asserting two false things about that writer.
2. ❌ *Trusting the parent's "completed" notification.* Parents report completion while their
   grandchildren are still writing. Two did exactly that.
3. ✅ **Require the consuming stage to re-stat and re-read its inputs immediately before finalising**,
   and give it mtimes rather than assurances. Cheap, and correct regardless of timing.

**The rule for the SKILL: a stage is not launchable on "the parts look complete". Either every
descendant is confirmed terminated, or the consuming stage re-reads its inputs at the point of use.**
Preferably both. The spec's "a stage may not run against partial input" is right and has no mechanism
behind it; this is the mechanism.

## Forward-reference assertion over phase-12's own parts — PASS

Run before stage 3, as required. Every cross-file filename reference resolves; every `part NN`
reference resolves to a phase-12 or phase-11 part; labelled refs `R1`–`R23`, `D1`–`D25`, `L1`–`L6`
all defined. Four apparent orphans (`B1`, `B3`, `B5`, `B7`) resolve into **phase 11's**
`12-rights-instruments.md` §8 table and are labelled "phase 11's B1" in situ. `A10` is defined in a
blockquote; `Q6` was a temp-filename fragment, not a reference.

**No repeat of the hole phase 11 nearly authored.**

## A third retrieval route, distinct from the resolver fix

`eci.gov.in` refuses `curl` and the fetch tool with **403**, and **a headless browser reaches it
fully** — nine ECI primary documents came down that way, including the Delimitation Commission's
32 MB compendium. So the phase now has three distinct failure modes with three distinct fixes:
resolver (use 1.1.1.1), process (retry from a second one), and **client (use a browser)**. A "could
not retrieve" is not established until all three are tried.

## Arithmetic

`records/ARITHMETIC-QUEUE.md` holds the stage-4 queue, opened during stage 2 rather than after it.
**Nine items. One is already a probable trigger B**: a J&K detenu total of ~619 that adds correctly
(404 + 188 + 27) but rests on attributing all 188 of Uttar Pradesh's *"belongs to other State"*
detenus to J&K, which no retrieved source states. Haryana's 27 is corroborated to the unit by an MHA
Rajya Sabha answer; UP's 188 is not corroborated at all.

## Inherited from the phase-11 drop

`../phase-kashmir-security/parts/12-rights-instruments.md` was collected in phase 11.
It is **not unauthored** — see the stage-1 finding: sections 1, 4, 5, 6, 7 and absences B1-B5,
B8 were consumed into L-0121, L-0122, L-0124, P-83 and P-87. What remains unauthored is its
**institutional** half, which is phase-12 subject matter and is not re-retrieved:

- PHRA s.1(2) proviso and the pre-2019 jurisdictional pincer; its omission on 31 Oct 2019 by
  J&K Reorganisation Act Fifth Schedule Table-1 entry 86.
- The abolition of the J&K State Human Rights Commission (Fifth Schedule Table-3 entry 117)
  and of the J&K Accountability Commission (same Table). "Accountability Commission" returns
  **zero** hits corpus-wide.
- The ~630 abated complaints as a subject, not only as an `unmeasured` hanging off L-0121.

Forward-reference assertion over the phase-11 parts: **PASS**. Parts 00-head, 00-sources, 01-12
all exist on disk; labels A1-A18, B1-B8 and PC-1..PC-20 all resolve to a defining section.
No hole of the kind phase 11 nearly authored.

## Periodisation, fixed before research

- **5 August 2019** — constitutional break.
- **31 October 2019** — administrative-unit break. J&K ceases to be a state including Ladakh
  and becomes a UT excluding it. **Any series whose geographic denominator is "Jammu and
  Kashmir" changes referent here and must break.**
- **May 2014 is NOT a counting-basis break.** It is a government change. Do not declare a seam.
- The **communications blackout from August 2019 degraded media-derived series specifically
  while leaving official series formally intact.** The two source families break differently at
  the same moment. Record that; do not work around it.

## Resume order if this run dies

1. Read every file in `parts/`. Do not reconstruct from any summary, including this one.
2. Read `records/` — if non-empty, stage 3 partially completed; reconcile against the parts.
3. Stage 3 authors against the LIVE schemas in `/schemas`, read at authoring time.
4. `--dry` means: never run stage 6. Do not merge to `/data`. Do not open a PR.
