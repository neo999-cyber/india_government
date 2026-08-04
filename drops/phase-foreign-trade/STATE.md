# Phase 14 — foreign policy and trade. State.

**B1 `23caebe` arcs A+F, lens axis · B2 `23cc1cf` arc B China mirror · B3 `95950e3`/`4df4cc8`
rounding basis, url-check spacing, arc C trade · B4 `7d6c4ec`/`18728fa`/`588f978` L-0021, build
freshness, arc D partial · B5 `6e30c2d`/`c071418` fixture soundness, arc E opened ·
B6 `391b16d`/`e36f6b3` idempotence controls, the SIPRI category record ·
B7 `60e4bde` the indigenisation metric and CAATSA's three states ·
B8 `2d384b6` emergency procurement and Rafale-M ·
B9 rule 5d, the append-only log rule, and the S-400 schedule.**

## Measurement categories established by this phase — use these, do not re-derive

Three shapes, and a record must say which it is:

1. **differentFacts pair** — two instruments measuring the SAME quantity and disagreeing. Both
   sides retrieved, same period and basis, methodological reason stated where known, neither
   averaged nor picked. P-119 (India/China trade), P-120 (neighbourhood).
2. **Single-sided** — one side publishes and the other does not. NOT a pair; the absence is the
   finding, localised by relaxing one restriction at a time before it is recorded. L-0191, L-0193.
3. **Incommensurable** — two instruments measuring DIFFERENT quantities, where the divergence
   carries no information about either. NOT a pair and NOT an absence. L-0197 (MoD rupees against
   SIPRI TIV). Reading agreement as corroboration is the same error as reading divergence as
   refutation.

## Standing rule 5c — derived quantities inherit their inputs' contests

Added to CLAUDE.md on 2026-08-04. A ratio, percentage, share or per-unit figure whose numerator or
denominator appears in a `differentFacts` pair must carry the divergence forward as an attributed
range, or not be stated. **No gate catches this class** — both computations are correct in isolation.

**IN SCOPE FOR THE ASSESSMENT AUDIT as a corpus-wide sweep.** L-0200 was the first identified
instance and was corrected in cycle 2026-08-04o; the corpus has not been swept for others, and that
sweep is deliberately left to the audit so its finding rate is not contaminated by a partial pass
done here.

## Open items logged against arc E, not acted on

- **L-0200's `partly` score has a retrievable test.** The DAC delegation undertook order placement
  within six months. Thirteen contracts exist under it, and **contract signature dates may be
  retrievable** — they would bear directly on that limb. Not attempted; the score stands.
- **The S-400 file's arc ownership is undecided.** Its content is an absence of published schedule
  and delivered count, which may make it retrieval-capability material rather than an arc E file.
  **Pending an owner decision** — do not assume arc E owns it.

## NOT DONE — the live backlog

Every item states WHAT it is, WHY it is deferred, and WHAT IT DEPENDS ON, so it can be started cold
without this conversation. Carried rules are in CLAUDE.md, not here.

### 1. Arc E — CLOSED at three of four files. One remains.

**Closed:** Rafale tranches (L-0201 the April 2025 Navy IGA, L-0203 the September 2016 Air Force
IGA) · the S-400 delivery schedule (L-0202) · emergency-procurement powers and their use (L-0200).
With L-0196 exports-vs-target, L-0197 measurement categories, L-0198 indigenisation and L-0199
CAATSA, the arc holds eight records. `defence-sector` is at nineteen.

**Still open — DAP domestic-content rules beyond the IC minimums.** *What:* offsets, positive
indigenisation lists, and what those lists actually bind. *Why deferred:* a record on what is
currently retrievable would be thin. *Depends on:* the offsets FRAGMENT is already retrieved and does
not need re-fetching — the DAP 2020 PIB release (PRID 1659746) says "The Offset guidelines have been
revised, wherein preference will be given to manufacture of complete defence products over components
and various multipliers have been added to give incentivisation in discharge of Offsets", with **no
multiplier values and no thresholds**. The positive indigenisation lists are not in that document.
The DAP chapter text is on `mod.gov.in`, which is unreachable. Try: PIB releases announcing each
indigenisation list, and a Parliamentary answer on offsets discharged.

### 2. Arc D — CLOSED

UAE CEPA and Australia ECTA (L-0195) · EFTA TEPA (L-0194) · UK CETA (L-0204, in force 15 July 2026)
· the EU agreement (L-0205, negotiations concluded 27 January 2026, NOT in force) · RCEP non-entry
tested against subsequent trade data (L-0018, corrected 2026-08-05). `europe` holds three records.

**Live triggers to watch, both state (a):** the India-EU agreement enters into force on the first day
of the second month after India and the EU exchange written notifications of completed internal
procedures — no date exists yet, and neither a signature date nor a notification date has been
published. TEPA's US$100bn investment objective runs to 1 October 2040 with the first US$50bn at ten
years.

### 3. Arc G — CLOSED 2026-08-05, three records of five subjects; two closed with NO record

**Written: L-0213** IMEC · **L-0214** WTO fisheries accession · **L-0215** Vaccine Maitri
composition.

**NOT written, and why — these are outcomes, not omissions.**

*G20 presidency deliverables against outcomes.* Testing this needs the New Delhi Leaders'
Declaration's own commitments list AND a later document reporting against it. Neither was
retrieved. What was retrieved is a PIB explainer of 18 June 2025 giving PROCESS counts — the
presidency 1 Dec 2022 to 30 Nov 2023, the 18th Leaders' Summit 9-10 Sep 2023, 20 member states
plus 9 invitees plus 14 international organisations, over 200 meetings in 60 cities, more than one
lakh delegates — and naming exactly one concrete outcome, the Global Biofuels Alliance launch.
The tempting record is "the presidency is measured by throughput, not outcome". **It was not
written, because a promotional summary's brevity is evidence about the summary, not about the
presidency.** *Depends on:* the Declaration text with its commitments, and any later report
against them.

*UNSC advocacy.* `Security Council` returns 0 in the Global Footprint explainer (38,591 chars),
and nothing retrieved states an Indian commitment with a testable shape — no date, no named
condition, no reporting obligation. By inspection it looks like commitment state (d), but writing
that from zero retrieved primaries would be **a record about the search rather than about the
world**. *Depends on:* any Indian primary stating the advocacy as a commitment with a trigger.

*WTO public stockholding.* The only retrieved statement is the Department of Commerce's, that
there was no agriculture outcome at MC13 and that India opposed attempts to divert focus from the
Permanent Solution. Carried inside L-0214's caveat rather than given a record of its own; a
standalone one needs India's own stated ask with a date and a later report against it.

**Route note.** Commerce was the right host for WTO, PMO/PIB explainers for the framing material.
MEA was not attempted — it remains the blocked channel.

**Scanning failure mode found here.** A scan for `%` returns 0 on a document whose headline reads
"30%": `\b` after a punctuation character can never match, so the boundary default is MEANINGLESS
for punctuation-only terms rather than merely strict. Search the digits. Third distinct failure
mode of that default, after "Fengal" (false positive) and "Official Creditors" (false negative).
A fourth, which no scanner can catch: DPIIT's twelve `corridor` hits are the National Industrial
Corridor Development Programme — **a term can match and mean something else**, and only reading
the context finds it.

### 4. Arc C policy dimensions — CLOSED 2026-08-05, seven records across five countries

**L-0206** Maldives currency swap · **L-0207** Punatsangchhu-II tariff sequence · **L-0208** the
neighbours power table · **L-0209** Myanmar border fencing · **L-0210** the Free Movement Regime ·
**L-0211** Bangladesh electricity exports · **L-0212** Sri Lanka debt restructuring.

**THE ROUTE FINDING, now confirmed across three ministries.** MEA is the blocked channel, NOT
policy primaries as a class. `mea.gov.in` returns HTTP 200 serving a JavaScript shell on both the
media-briefings and press-releases paths. Everything else retrieved first try: RBI press releases
(`www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=NNNNN`), and PIB with the pinned resolver
(94.202.207.57) for Power, Home Affairs and the **Prime Minister's Office** — the PMO route is what
finally opened Sri Lanka after both MEA and Power gave nothing. Three hosts tried before any claim
about the class, per the rule this phase wrote.

**Sri Lanka took three routes to crack.** MEA: shell. Power: the ministry's public-facing documents
carry NO neighbourhood content at all — Year End Review 2025, "India's Power Sector" (85,545 chars)
and "Initiatives to achieve uninterrupted power supply" (97,051 chars) all return zero for Sri
Lanka, Bangladesh, Nepal and Bhutan against passing positive controls. PMO joint statements and
press remarks on PIB carried it. **Where a bilateral relationship is not in the line ministry's
output, try the PMO before concluding it is unpublished.**

**Godda: still open after two cycles, and deliberately.** `Godda` and `Adani` are zero across every
document scanned in both cycles — but the measured export series ENDS at January 2023, before the
period in which the arrangement could appear. A zero from a document that predates the question is
not an absence. *Depends on:* any Million Units series covering 2023-24 or later, which would make
the question answerable for the first time; or a company primary (Adani Power annual report, BSE/NSE
filing) establishing the arrangement so that its absence elsewhere could be claimed.

**Environment facts from the two chains.** `rbidocs.rbi.org.in` unreachable (HTTP 000), resolvers
disagree — 1.1.1.1 → 14.140.169.71, 8.8.8.8 → 1.6.75.39; the RBI PAGE host works, the DOCUMENT host
does not. PIB `PressReleasePage.aspx?PRID=N` without `&reg=&lang=` 302s to a Hindi variant; append
`&reg=3&lang=1` or follow with `-L`. `cea.nic.in` needs an explicit resolver (45.127.74.41) and its
cross-border-electricity path 404s. `www.mea.gov.in/Portal/ForeignRelation/India_Bangladesh_bilateral_brief.pdf`
is a soft-404 serving HTML.

**Tooling this arc added.** `node tools/scan-text.mjs <file> <term>...` is now the only sanctioned
way to scan retrieved text, with `htmlToText` normalising in one place. **Run a positive control
before banking any zero** — the Power Year End Review returned zero for `export`, which is
implausible enough to check, and it took 19/86/39/42 control hits to establish the document had
actually loaded.

### 5. Pakistan — deferred on retrieval, and the blockage is specific

The Indus Waters Treaty abeyance, the trade suspension and transit closure. *Why deferred:* **its
central record's primaries fail across three clients** — the Permanent Court of Arbitration
(`pca-cpa.org`) is Cloudflare-gated and returned 403 to two independent clients; the MEA special
briefing of 23 April 2025 at which the abeyance was announced returns HTTP 200 with 82KB of page
chrome and no transcript body, because it loads by JavaScript; and the Indus Waters Treaty PDF on
MEA's own legal-treaties portal is a 5MB scan with no text layer, 113 bytes of extractable text. So
the treaty instrument is citable and NOT quotable. *Depends on:* the retrieval-capability cycle
(item 7), or a route to any of those three documents. Pakistan's exclusion is stated in the titles of
L-0192 and L-0193 rather than left as a silent gap in a set called "the neighbourhood".

### 6. L-0195's baseline question

The Prime Minister's claim that merchandise trade with Australia and the UAE "has doubled since the
signing" is scored `contested` because it holds on a CY2020 base (x2.26, x2.21) and fails on both
years nearest the signings (x1.38/x1.08 against CY2021, x1.11/x0.85 against CY2022). *Why deferred:*
the claim names no baseline and none was found. *Depends on:* checking whether the 10 March 2026 PIB
release (PRID 2237451) or the underlying speech names a base year anywhere. **If one exists the claim
becomes testable and the score changes** — this is a small, bounded, high-value check.

### 7. The retrieval-capability cycle — wants its own scoping session

*Why deferred:* it is not a slot at the end of a batch. Five distinct failure modes are attested:
(1) Cloudflare gating — `pca-cpa.org`; (2) JS shells answering 200 with no document — `mea.gov.in`;
(3) scans with no text layer — the Indus Waters Treaty PDF; (4) a resolving host refusing 443 —
`mod.gov.in`, `ddpmod.gov.in`; (5) the carried Gazette task. A sixth, milder mode is already worked
around: hosts needing an explicit resolver (pins in CLAUDE.md).

**Its output is TWO things and the second is corpus material in its own right:** retrieval where
possible, and a documented account of what the Indian government publishes that cannot be retrieved
by ordinary means. The second is a finding about the publication regime, not a housekeeping note.

### 8. Rule 5c's corpus-wide sweep — belongs to the assessment audit

*What:* every derived quantity whose numerator or denominator appears in a `differentFacts` pair
must carry the divergence as an attributed range. *Why deferred here:* L-0200 was the first
identified instance and was corrected in cycle 2026-08-04o; the sweep was deliberately NOT run in
that cycle so the audit's finding rate is not contaminated by a partial pass. *Depends on:* the
assessment audit being scheduled.

### 9. Per-rule isolated fixture roots

*What:* the 23 `MUST_FIRE` validator rules share one `broken` fixture root, so message pinning stops
a rule passing on a phrase it never emits but does NOT isolate records — a rule can still fire on a
neighbour's seeded violation. *Why deferred:* tedium, not hazard; the needles are distinctive enough
that it is unlikely rather than impossible. *Depends on:* nothing.

### 10. L-0200's `partly` score has a retrievable test

*What:* the DAC delegation undertook order placement within six months of a case being progressed.
Thirteen contracts exist under it. **Contract signature dates may be retrievable** and would bear
directly on that limb, which is currently unmeasured. *Why deferred:* not attempted. *Depends on:*
a source giving per-contract signature dates — MoD contract announcements or a Parliamentary answer.

## Harness state after B5 — what is now mechanical rather than remembered

- **Every fixture assertion names its own failure.** 33 sites; zero assert a bare exit code.
- **Enum drift fails loudly.** Generated fixtures carry `GENERATED-FROM.json`; the selftest compares
  it to the live schemas. When `europe` is admitted, run `npm run regen:lens-fixtures` in the same
  commit — the selftest will say so if you forget.
- **Gates reading `out/` refuse on a stale build** (exit 2, distinguished from no-build).
- **Word boundaries by default** in `tools/lib/corpus-search.mjs`; `substring: true` is the visible
  opt-out.
- **figure-consistency** checks declared claims against source AND printed operands; separators are
  normalised, and its own claims' source values are checked rather than typed.
- **A failing check re-run without a fix must still fail** — enforced on `enum-stamp` and on
  freshness, with the B5 self-repair bug reintroduced as the negative control. Only `selftest`
  touches state at all; every other gate is a pure reader.
- **No checker imports from its own repair path** — asserted by importing each library in a child
  process and requiring the fixture tree to be byte-identical after.
- **Logged, not built:** the 23 `MUST_FIRE` rules share one `broken` root, so message pinning does
  not isolate records. Per-rule roots is the fix. Tedium, not hazard.

## What is done

- **Enum work.** No new domain: `foreign` already covers every arc. No amendment record is owed.
  Reasoning and the procurement filing table are in `scope/SCOPE.md`.
- **Lens axis.** `defence-sector`, `united-states`, `russia` admitted with definitions. New `/lenses`
  route. `domain-coverage` retargeted at lens surfaces; new `lens-empty` rule; `lens-duplicated`
  extended to the ledger; four new fixtures. `lenses[]` added to the ledger schema.
- **Backfill.** `defence-sector` on 12 ledger records and 13 series, asserted per record.
- **Arcs A and F.** L-0184 to L-0189 in `data/ledger/foreign-trade.json`.
- **Controls.** `scope/lens-controls.mjs`, four paired controls, run green.

## What is NOT done, and what the next run needs to know

### Batch 2 — arcs B (China) and C (neighbourhood)

- **Admit `china` and `neighbourhood` to the lens enum in the same commit as their records.** The
  `lens-empty` gate fails the build otherwise, which is the intended behaviour, not an obstacle.
  Three places move together: `schemas/{series,pairs,ledger}.schema.json` (enum + per-value
  definition — the definitions are already drafted in the phase brief and in `scope/SCOPE.md`),
  `lib/types.ts` LENSES, and `lib/format.ts` LENS_LABELS + LENS_BLURBS. Typecheck catches the last
  two if missed; nothing catches a missing schema definition except §6.
- **Mirror statistics are the highest-value material and none is authored yet.** India–China is the
  largest documented divergence. Both sides must be retrieved: DGCIS/Ministry of Commerce on the
  Indian side, China's GACC on the other. Do not average and do not pick one — these are
  `differentFacts` pairs.
- **Do not duplicate phase 11.** Post-Galwan disengagement enters only as a diplomatic instrument.

### Batch 3 — arcs D, E, G

- `europe` is admitted here, with the UK FTA / EFTA TEPA / EU negotiation records.
- **EFTA TEPA's investment commitment is a dated, sized, testable commitment** — treat it as a
  first-class record and resolve it into one of the three commitment states.
- **L-0018 (RCEP withdrawal) is arc D's collision.** It already carries EFTA and UK in passing, with
  T4 sources. Arc D should hold them properly; decide then whether L-0018 is corrected or left.

### Owed from batch 1, deliberately not done here

- **L-0021 needs correcting.** It states "the rate was later cut to 18% under an interim arrangement"
  as the current position. On the primaries retrieved in this run that is superseded: the 18 per cent
  was promised under EO 14257, whose duties were void fourteen days later, and India has paid 10 per
  cent since 24 February 2026. Its sources are T4 where T1 now exists. This is a shipped-record edit
  and belongs in its own cycle with its own log entry, not smuggled into a phase commit.
- **Arc F has no measured spine.** No official Indian series for crude imports by country of origin
  was located. L-0189 records the absence with two routes named: PPAC's import-export tables at
  `ppac.gov.in/import-export` (not retrieved — the site needs an explicit resolver, see below) and
  DGCIS commodity-by-country data. Retrieving either converts the absence into a series.

## Retrieval notes that will save the next run time

- **`ppac.gov.in` does not resolve under the system resolver** but resolves identically on 1.1.1.1,
  8.8.8.8 and 9.9.9.9 to `164.100.198.160`. Use `curl --resolve ppac.gov.in:443:164.100.198.160`.
  `url-check` already handles this itself.
- **`uscode.house.gov` refused connection from two processes and two clients.** Use govinfo:
  `https://www.govinfo.gov/link/uscode/<title>/<section>?link-type=html` redirects to the right
  package path.
- **`federalregister.gov` serves a CAPTCHA on its full-text endpoints** to automated clients. Its
  JSON API works and is the way to find document numbers; take the TEXT from govinfo at
  `https://www.govinfo.gov/content/pkg/FR-<yyyy-mm-dd>/html/<docnum>.htm`.
- **`supremecourt.gov` 403s some clients and 200s others.** Vary the user agent before concluding.
- **Federal Register `conditions[term]` with OR is unreliable** — it returned zero presidential
  documents for June–August 2026 while the unfiltered query returned 37 including several tariff
  actions. Run the unfiltered query as the control.
