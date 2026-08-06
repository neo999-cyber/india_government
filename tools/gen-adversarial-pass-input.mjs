#!/usr/bin/env node
/**
 * Emit `review/adversarial-pass-input.md` — the single self-contained document handed to the
 * adversarial model pass.
 *
 * WHO READS IT. A model with no repository access, no CLAUDE.md, no STATE.md and no memory of this
 * project. It will not ask a question and it will not see a second turn. Everything it needs is in
 * the file or it does not exist.
 *
 * HOW THIS DIFFERS FROM `gen-review-extract.mjs`, WHICH IS A DIFFERENT OBJECT AND STAYS. That one
 * STRIPS the framework — no ids, no enum tokens, no rules — because its question is what a reader
 * objects to WITHOUT knowing what the project considers acceptable. This one does the opposite: it
 * SHIPS the framework, with ids, enum definitions, the gate contracts and the corrections, because
 * its question is whether the project followed its own rules and whether the rules support the
 * verdicts. A reviewer who cannot see the rule cannot catch a rule being broken.
 *
 * EVERY FIGURE HAS A NAMED EMITTER. Gate figures are quoted verbatim from `review/gate-scopes.txt`,
 * captured by running the gates; nothing is retyped from a report. Figures this file computes
 * itself are printed with the needle or the field that produced them, per the standing rule that a
 * count with an unstated scope is wrong by an amount nobody can see. Where a figure appears in the
 * project's own prose and disagrees with the data at HEAD, BOTH are printed and the disagreement is
 * named rather than silently resolved.
 *
 * CORRECTIONS ARE NOT SUPPRESSED. Withdrawn wording survives inside the sentence that withdraws it,
 * which is the form every correction in this corpus takes, so the corrected text and the wording it
 * replaced both reach the reviewer. A reviewer who reports a corrected error as live is telling us
 * the correction is not visible enough, and that outcome is a finding.
 *
 * Usage:  node tools/gen-adversarial-pass-input.mjs   ·   npm run adversarial-pass-input
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'review', 'adversarial-pass-input.md');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

/**
 * Stamp the commit that last touched the CORPUS, not HEAD.
 *
 * Stamping HEAD makes the extract stale the moment anything else is committed — including the
 * commit that records the extract — which is an infinite regress and exactly the stale-measurement
 * class this document exists to expose. The corpus commit changes only when /data or the schemas
 * change, which is when the extract's content can actually differ.
 */
const HEAD = execSync('git log -1 --format=%h -- data schemas', { cwd: ROOT }).toString().trim();
const HEAD_DATE = execSync('git log -1 --format=%ad --date=short -- data schemas', { cwd: ROOT }).toString().trim();

/* ------------------------------------------------------------------ inputs */

const CLAUDE = read('CLAUDE.md');
const GATES = read('review/gate-scopes.txt').trim();
const HIST = JSON.parse(read('review/record-history.json'));
const LEDGER_SCHEMA = JSON.parse(read('schemas/ledger.schema.json'));
const PROV_SCHEMA = JSON.parse(read('schemas/provenance.schema.json'));

const ledger = [];
for (const f of readdirSync(join(ROOT, 'data/ledger')).filter((x) => x.endsWith('.json'))) {
  ledger.push(...JSON.parse(read(`data/ledger/${f}`)));
}
const provenance = JSON.parse(read('data/provenance.json'));
const series = [];
for (const f of readdirSync(join(ROOT, 'data/series')).filter((x) => x.endsWith('.json'))) {
  series.push(...JSON.parse(read(`data/series/${f}`)));
}
const byId = new Map([...ledger, ...provenance].map((r) => [r.id, r]));

/**
 * Slice a passage out of CLAUDE.md by its own opening and closing text, asserting BOTH anchors are
 * present exactly once. An anchor that has drifted aborts rather than silently emitting a shorter
 * passage — the failure mode this guards is a method section that quietly stops describing the
 * method it is quoted to describe.
 */
function passage(label, startAnchor, endAnchor) {
  const nStart = CLAUDE.split(startAnchor).length - 1;
  const nEnd = CLAUDE.split(endAnchor).length - 1;
  if (nStart !== 1) throw new Error(`passage "${label}": start anchor occurs ${nStart} times, expected 1 — ${startAnchor.slice(0, 60)}`);
  if (nEnd !== 1) throw new Error(`passage "${label}": end anchor occurs ${nEnd} times, expected 1 — ${endAnchor.slice(0, 60)}`);
  const i = CLAUDE.indexOf(startAnchor);
  const j = CLAUDE.indexOf(endAnchor, i);
  if (j < i) throw new Error(`passage "${label}": end anchor precedes start anchor`);
  return CLAUDE.slice(i, j + endAnchor.length).trim();
}

/** Schema property lookup that aborts rather than returning undefined. */
function prop(schema, name) {
  const p = (schema.items?.properties ?? schema.properties)?.[name];
  if (!p) throw new Error(`schema property "${name}" not found`);
  return p;
}

/* ------------------------------------------------- measured distributions */

const tally = (rows, key) => {
  const m = new Map();
  for (const r of rows) {
    const v = typeof key === 'function' ? key(r) : r[key];
    if (v === undefined || v === null) continue;
    m.set(v, (m.get(v) ?? 0) + 1);
  }
  return m;
};

const ASSESSMENT = tally(ledger, 'assessment');
const DIRECTION = tally(provenance, 'directionOfBias');
const REASONKIND = new Map();
for (const r of [...ledger, ...series]) {
  for (const u of r.unmeasured ?? []) REASONKIND.set(u.reasonKind, (REASONKIND.get(u.reasonKind) ?? 0) + 1);
}
const DISPUTEKIND = new Map();
for (const r of [...ledger, ...series]) {
  for (const u of r.unmeasured ?? []) if (u.disputeKind) DISPUTEKIND.set(u.disputeKind, (DISPUTEKIND.get(u.disputeKind) ?? 0) + 1);
}

/** Citations, one row per graded document. Tier sits inside `sources[]` on ledger and provenance
 *  and ON THE RECORD on series — reading it in one place only is a documented recurring error in
 *  this project, so both sites are read here and the split is printed by layer. */
const citations = [];
for (const r of ledger) for (const s of r.sources ?? []) citations.push({ layer: 'ledger', id: r.id, tier: s.tier ?? null, url: s.url ?? '', name: s.name ?? '' });
for (const r of provenance) for (const s of r.sources ?? []) citations.push({ layer: 'provenance', id: r.id, tier: s.tier ?? null, url: s.url ?? '', name: s.name ?? '' });
for (const r of series) citations.push({ layer: 'series', id: r.id, tier: r.tier ?? null, url: r.source?.url ?? '', name: r.source?.name ?? '' });

const TIER_ALL = tally(citations, 'tier');
const TIER_BY_LAYER = { ledger: tally(citations.filter((c) => c.layer === 'ledger'), 'tier'), provenance: tally(citations.filter((c) => c.layer === 'provenance'), 'tier'), series: tally(citations.filter((c) => c.layer === 'series'), 'tier') };

const unwrap = (u) => u.match(/web\.archive\.org\/web\/[^/]+\/(https?:\/\/.*)/)?.[1] ?? u;
const hostOf = (u) => {
  try {
    return new URL(unwrap(u)).hostname.replace(/^www\./, '');
  } catch {
    return '(unparseable)';
  }
};
const IN_GOV_RULE = 'host ends `.gov.in` or `.nic.in`, or is under `sansad.in`, `rajyasabha.digital` or `rajyasabha.nic.in`; a `web.archive.org` URL is unwrapped to the host it archives before the test';
const isIndianGovHost = (h) => /\.(gov|nic)\.in$/.test(h) || /(^|\.)sansad\.in$/.test(h) || /(^|\.)rajyasabha\.(digital|nic\.in)$/.test(h);
const NON_GOV = citations.filter((c) => !isIndianGovHost(hostOf(c.url)));
const NON_GOV_HOSTS = [...tally(NON_GOV, (c) => hostOf(c.url))].sort((a, b) => b[1] - a[1]);

const tierStr = (m) => ['T1', 'T2', 'T3', 'T4', 'T5'].filter((t) => m.get(t)).map((t) => `${t}×${m.get(t)}`).join(' ') + (m.get(null) ? ` untiered×${m.get(null)}` : '');

/* --------------------------------------------------------- corrections */

/**
 * The self-referential correction needle. It matches a sentence in which a record says what IT
 * previously said, which is the only class of interest here — ordinary uses of "withdrawn" and
 * "superseded" describe the world (a measure withdrawn by its authority, an estimate superseded by
 * a later answer) and are excluded by construction. The needle is printed in the document beside
 * its count, because a count with an unstated scope is wrong by an amount nobody can see.
 */
const CORRECTION_NEEDLE =
  /\b(?:CORRECTED|RESCORED|VALUE-AND-NOTE RECONCILED|Bounded|CLOSED)\s+\d{4}-\d{2}-\d{2}|\bthis (?:record|sentence|note|figure) (?:previously|originally)\b|\bpreviously (?:read|carried|gave|said|stated|described|counted|attributed|dated|led on|quoted)\b|\bis WITHDRAWN\b|\bthat example is WITHDRAWN\b|\bThe earlier framing is superseded\b|\breasonKind CORRECTED\b/;

function correctionSites(rec) {
  const sites = [];
  const walk = (v, path) => {
    if (typeof v === 'string') {
      if (CORRECTION_NEEDLE.test(v)) sites.push(path);
    } else if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) walk(x, path ? `${path}.${k}` : k);
    }
  };
  walk(rec, '');
  return sites.map((p) => p.replace(/\.\d+\./g, '[].'));
}

const CORRECTED = new Map();
for (const r of [...ledger, ...provenance]) {
  const s = correctionSites(r);
  if (s.length) CORRECTED.set(r.id, [...new Set(s)]);
}
const CORRECTED_SERIES = new Map();
for (const r of series) {
  const s = correctionSites(r);
  if (s.length) CORRECTED_SERIES.set(r.id, [...new Set(s)]);
}

/* ------------------------------------------------- the deep-extract set */

/** The project's own classification of the 67 `contested` records by what would settle each,
 *  carried from its internal notes. It is NOT a field in the data and the document says so. */
const CONTESTED_GROUND = {
  criterion: 'L-0015 L-0019 L-0020 L-0025 L-0040 L-0059 L-0068 L-0076 L-0084 L-0085 L-0088 L-0096 L-0099 L-0105 L-0125 L-0126 L-0152 L-0165 L-0170 L-0171 L-0173 L-0203',
  interpretation: 'L-0075 L-0100 L-0101 L-0113 L-0115 L-0128 L-0158 L-0159 L-0160 L-0163 L-0195 L-0224 L-0226',
  'evidence-withheld': 'L-0042 L-0057 L-0070 L-0110 L-0114 L-0137 L-0144 L-0148 L-0168 L-0178 L-0179',
  measure: 'L-0043 L-0058 L-0060 L-0074 L-0078 L-0083 L-0091 L-0102 L-0132 L-0141',
  'evidence-unobservable': 'L-0018 L-0056 L-0079 L-0116 L-0136',
  time: 'L-0031 L-0082 L-0118 L-0145',
  'vocabulary-residue': 'L-0092 L-0129',
};
const GROUND_OF = new Map();
for (const [g, ids] of Object.entries(CONTESTED_GROUND)) for (const id of ids.split(' ')) GROUND_OF.set(id, g);

// The classification must still describe the corpus. If a record has been rescored out of
// `contested` since it was classified, or a new one has entered, the mapping is stale and saying so
// in the document is worth more than quietly printing it.
const contestedNow = ledger.filter((r) => r.assessment === 'contested').map((r) => r.id);
const CLASSIFICATION_DRIFT = {
  contestedNotClassified: contestedNow.filter((id) => !GROUND_OF.has(id)),
  classifiedNotContested: [...GROUND_OF.keys()].filter((id) => !contestedNow.includes(id)),
};

/** The one commit that moved 25 records to `no-objective` when that value was created. Treating its
 *  members as 25 independent post-shipping reversals overstates what happened, so they are named
 *  and handled separately rather than folded into the individual set. */
const BULK_RESCORE_SUBJECT = 'Apply the rescore: 25 records to no-objective, 4 notes, 4 held red';
const inBulk = (id) => (HIST[id]?.values ?? []).slice(1).some((v) => v.subj === BULK_RESCORE_SUBJECT);

const C1_HARDEST = ['L-0221', 'L-0222', 'L-0223', 'L-0224', 'L-0225', 'L-0226', 'P-121', 'P-122', 'P-123', 'P-127'];
/**
 * "Corrected more than once" has to exclude corpus-wide sweeps, or it degenerates. Eight records
 * reached three edits purely by being caught in three project-wide passes — the bulk rescore, a
 * note-reconciliation sweep, a lens-axis migration — which is three commits for nothing that was
 * ever a correction OF THAT RECORD. So an edit counts only when its commit touched few records:
 * that is what makes it targeted rather than incidental.
 */
const SWEEP_THRESHOLD = 5;
const COMMIT_BREADTH = new Map();
for (const h of Object.values(HIST)) for (const e of h.edits) COMMIT_BREADTH.set(e.sha, (COMMIT_BREADTH.get(e.sha) ?? 0) + 1);
const targetedEdits = (id) => (HIST[id]?.edits ?? []).filter((e) => COMMIT_BREADTH.get(e.sha) <= SWEEP_THRESHOLD);
const C2_MULTI = Object.keys(HIST).filter((id) => targetedEdits(id).length >= 2);
const C2_SWEPT_ONLY = Object.entries(HIST)
  .filter(([id, h]) => h.editCount >= 3 && targetedEdits(id).length < 2)
  .map(([id]) => id);
const C3_ALL_CHANGED = Object.entries(HIST).filter(([, h]) => h.values.length > 1).map(([id]) => id);
const C3_INDIVIDUAL = C3_ALL_CHANGED.filter((id) => !inBulk(id));
const C4_CONTESTED_SPREAD = Object.values(CONTESTED_GROUND).map((s) => s.split(' ')[0]);

const REASONS = new Map();
const mark = (ids, why) => {
  for (const id of ids) {
    if (!byId.has(id)) throw new Error(`selection names ${id}, which is not a record at HEAD`);
    if (!REASONS.has(id)) REASONS.set(id, []);
    REASONS.get(id).push(why);
  }
};
mark(C1_HARDEST, 'the closing phase’s hardest calls');
mark(C2_MULTI, 'corrected more than once — two or more targeted commits reworked it after it shipped');
mark(C3_INDIVIDUAL, 'its assessment changed after it shipped, individually rather than in the bulk rescore');
mark(C4_CONTESTED_SPREAD, 'the contested spread — lowest id in one of the seven grounds');

const DEEP = [...REASONS.keys()].sort((a, b) => {
  const rank = (x) => (x.startsWith('L-') ? 0 : 1);
  return rank(a) - rank(b) || a.localeCompare(b);
});
const DROPPED_BULK = C3_ALL_CHANGED.filter((id) => !REASONS.has(id));

/* ------------------------------------------------------------- rendering */

/**
 * Sections are written into a registry rather than one flat buffer, because the same content has
 * to compose into four different documents: the combined file, and three independently runnable
 * passes that must not contaminate each other. A reviewer given the whole corpus at once anchors
 * on whatever it read first; three focused reviews with no shared context do not.
 *
 * The blocks every pass carries — the brief, the known limits, the gate scopes, the method —
 * are built ONCE here and emitted into each file. There is no second copy to drift.
 */
const SECTIONS = new Map();
let CURRENT = null;
const section = (name) => {
  CURRENT = name;
  if (!SECTIONS.has(name)) SECTIONS.set(name, []);
};
const w = (s) => {
  if (CURRENT === null) throw new Error('w() called before section()');
  SECTIONS.get(CURRENT).push(s);
};
const S = (...names) => names.map((n) => (SECTIONS.get(n) ?? []).join('')).join('');
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim();
/**
 * The first SUBSTANTIVE sentence, for the one-line-per-record structural extract.
 *
 * Assessment notes written by the verdict-reasoning sweeps open with a dated provenance clause —
 * "Written 2026-08-05 (adversarial triage 3); this record previously carried a verdict with no
 * stated reasoning." — which is identical on some sixty records and says nothing about the verdict.
 * Printing it would fill the extract with boilerplate and hide the thesis sentence that follows it.
 * The clause is skipped HERE ONLY; it is not removed from the record, the `corrected` marker on the
 * same block names the field it sits in, and the full note is in Extract B or D.
 */
const PROVENANCE_OPENER = /^(?:Written|CORRECTED|RESCORED|VALUE-AND-NOTE RECONCILED|Bounded)\s+\d{4}-\d{2}-\d{2}[^.]*\.\s*/;
const firstSentence = (s) => {
  if (!s) return '';
  let t = String(s).replace(/\s*\n\s*/g, ' ').trim();
  const stripped = t.replace(PROVENANCE_OPENER, '');
  if (stripped && stripped !== t) t = stripped;
  const m = t.match(/^.{0,240}?[.:;](?=\s|$)/);
  return (m ? m[0] : `${t.slice(0, 240)} …`).trim();
};
const field = (label, body) => (body && String(body).trim() ? `**${label}.** ${String(body).replace(/\s*\n\s*/g, ' ').trim()}\n\n` : '');

/* ============================================================ 0. BRIEF */

/**
 * Per-file opening: the title, the provenance line and the contents list.
 *
 * Only this block differs between the four documents. Everything below is built once and shared,
 * so a correction to the brief or the method reaches every pass without a second copy to forget.
 */
const CONTENTS = {
  A: `- **Extract A — Structural.** Every one of the ${ledger.length} ledger records and ${provenance.length} provenance records, one compact block each: id, verdict, the claim, the first substantive sentence of the reasoning, the source count by tier, and the stated reasons for anything the record says is unmeasured. This is the part that finds defects no single record shows — a verdict class that always rests on one kind of source, a value that clusters in one phase, a tier profile that will not carry the claims made on it.\n`,
  B: `- **Extract B — Deep.** ${DEEP.length} records in full prose, selected adversarially rather than sampled. The criteria are stated in the section header, and what the criteria excluded is stated with them.\n`,
  C: `- **Extract C — Method.** The instrument's own rules, quoted from the files that hold them, so you can check whether they were followed instead of inferring them from the output.\n`,
  D: `- **Extract D — Corrections.** Every record that carries a self-correction or withdrawn wording, with the needle that found them.\n`,
  E: `- **Extract E — Compliance surface.** The record text each rule in Extract C actually binds, so a rule can be tested against what it governs rather than against an impression of the corpus.\n`,
};

function opening({ title, subtitle, contents, focus }) {
  return (
    `# ${title}\n` +
    `${subtitle}\n\n` +
    `Generated by \`tools/gen-adversarial-pass-input.mjs\` from the corpus as it stood at commit \`${HEAD}\` (${HEAD_DATE}) — the last commit to touch the data or the schemas. ` +
    `Regenerating against the same corpus reproduces this file byte for byte.\n\n` +
    `You have no access to the repository, so this document has to be sufficient on its own. It contains:\n\n` +
    contents.map((k) => CONTENTS[k]).join('') +
    `\n${focus}\n\n`
  );
}

section('brief');
w(`## What you are reading, and what to do with it\n\n`);
w(
  `This is a longitudinal research corpus about the Indian government: what was announced, what can be established since, and what cannot be established at all. ` +
    `It covers a frozen pre-May-2014 baseline and the three terms after it. It has **one author, working with an AI assistant**, and the same pairing wrote the records, retrieved the sources and checked the result. ` +
    `Nothing in it has been reviewed by anyone who did not write it. **You are the first outside reading**, and you are being asked to attack it rather than to confirm it.\n\n`,
);

w(`### What a useful finding looks like\n\n`);
w(
  `Ranked by what this corpus can act on:\n\n` +
    `1. **A verdict the evidence in its own record does not support.** The record states a case for and a case against; if the verdict does not follow from them, say which one it should have been and why.\n` +
    `2. **A claim stronger than its source.** The tier of every citation is given. A T4 document is journalism or a relayed figure; a claim that needs a primary and cites only a T4 is a defect even if the claim is true.\n` +
    `3. **An absence asserted without a search.** This corpus treats absences as findings and records a stated reason for each. An absence claim that rests on nothing but not having found the thing is the failure mode the method section calls out most often — which means finding one is worth more, not less.\n` +
    `4. **A pattern across records that no single record reveals.** Examples of the shape: a verdict value used inconsistently between two records with the same structure; a domain whose sources are systematically one tier weaker than the rest; a stated reason (\`not-published\`, \`withheld\`) applied to one kind of subject and never to another.\n` +
    `5. **A rule the corpus states and did not follow.** The rules are in Extract C, quoted from the files that hold them. A rule broken is worth more than a figure wrong, because a figure is one record and a rule is a class.\n\n`,
);
w(
  `**Tie every finding to a record id.** A finding with no id cannot be checked and will not be acted on. Where a finding is a pattern, name the ids it rests on — at least three, or say why fewer suffice.\n\n` +
    `**End with a statement of what you could not check from this file alone.** That list is as valuable as the findings: it tells us what the next version of this document has to carry. Do not guess at what you could not see; name it.\n\n`,
);
w(
  `**Two things not to spend budget on.** The arithmetic is gated mechanically and has been recomputed repeatedly; the last full pass found one error of 0.01 in 34 claims. And the limits listed in the next section are already known and logged — reporting one back is not a finding. Everything else is open.\n\n`,
);
w(
  `**Corrections are included on purpose.** This corpus corrects records in place and keeps the withdrawn wording inside the sentence that withdraws it, so a corrected record reads *"X — CORRECTED, this previously said Y"*. That means the wrong figure is still on the page, by design. If you read one of those as a live error, say so: that tells us the correction is not visible enough, which is itself the finding.\n\n`,
);

/* ================================================== 1. KNOWN LIMITS */

section('limits');
w(`---\n\n## Known limits — already logged, do not spend budget rediscovering these\n\n`);
w(
  `**1. The corpus is not built entirely from government primaries, and the public method page understates by how much.** ` +
    `Of ${citations.length.toLocaleString()} graded citations, ${NON_GOV.length} are not on an Indian government or parliamentary host (${NON_GOV_HOSTS.length} distinct hosts). ` +
    `The rule used to compute that is printed here because the number depends on it entirely: ${IN_GOV_RULE}. ` +
    `The largest non-government sources are ${NON_GOV_HOSTS.slice(0, 8).map(([h, n]) => `${h} (${n})`).join(', ')}. ` +
    `They exist because they are concentrated where the state does not measure the thing or is itself the disputed party — injuries recorded by hospital clinicians in peer-reviewed journals, civilian-death counts in Jammu and Kashmir, internet-shutdown durations. ` +
    `Those records depend on non-government evidence **because** the government does not publish it, and that dependence is the finding rather than a weakness of it. ` +
    `**What is open for you:** whether any individual record leans on a non-government source where a government one exists, and whether the T4 records in that set carry claims that need a primary.\n\n`,
);
w(
  `**1a. Two figures the project publishes about its own sourcing do not reconcile with the data, and both are printed here rather than resolved.** ` +
    `Its public method page states that ${752} of ${citations.length.toLocaleString()} citations are graded T1. **Measured over all three layers at \`${HEAD}\`, the figure is ${TIER_ALL.get('T1')}** ` +
    `— the published count reads \`tier\` inside each \`sources[]\` entry, which is where it lives on ledger and provenance records, and misses the ${series.length} series, ` +
    `every one of which carries a tier ON THE RECORD (${tierStr(TIER_BY_LAYER.series)}). The published figure therefore UNDERSTATES the primary-source share, and the sentence after it — ` +
    `that the remainder is multilateral statistics, research, journalism and NGO datasets — is wrong about ${TIER_BY_LAYER.series.get('T1') ?? 0} of them, which are Indian official statistical sources. ` +
    `Separately, the project's internal note records ${287} non-government citations against the ${NON_GOV.length} computed above; the earlier figure's host rule was not written down, so the two are not strictly comparable and the gap is not evidence of a change in the data. ` +
    `**Both discrepancies were found while generating this document and neither is a defect in a record** — the citations and their tiers are correct in \`/data\`. They are here so you do not spend budget rediscovering them, and so that a claim you meet elsewhere about this corpus's sourcing can be checked against the table in A.3.\n\n`,
);
w(
  `**2. One capability has never been tested, and a claim was withdrawn over it.** An air-quality arc was left open because a single publisher's site is client-rendered and was not retrieved. ` +
    `A first attempt recorded "no rendering client is available"; that was **withdrawn** — the observed failure was DNS resolution, not rendering, and no attempt has yet addressed the actual error. ` +
    `The arc is recorded as blocked rather than as complete, and no record was written from the unretrieved material.\n\n`,
);
w(
  `**3. Series breaks are declared per series, and a derived comparison stated in a record's prose is outside that guard.** ` +
    `A reporting tool measures the gap: see the \`seam-span-report\` line in the gate block below. It is report-only, nothing is gated on it, and the undeclared spans are a candidate list rather than a defect count — they have not been triaged. ` +
    `**What is open for you:** a record whose prose states a comparison across a basis change without saying so. One such case has already been found and corrected (in Extract B).\n\n`,
);
w(
  `**4. The arithmetic gate checks only DECLARED claims and never mines for undeclared ones.** An author who states a derived figure without declaring it is outside the gate entirely. ` +
    `Four such figures were found by hand in the last phase and none by the gate. The gate's claim format is also subtraction-only and cannot express a ratio at all. This is logged as a gate contract change and has not been made.\n\n`,
);
w(
  `**5. There is no assertion that a NON-PROSE field reaches a reader.** The rendering audit covers prose fields and excludes enum, boolean, format and pattern fields by construction. ` +
    `Two consequences are already proven: a dispute-kind enum shipped invisible on 19 entries until it was found by hand, and ${ASSESSMENT.get('no-objective') ?? 0} records carrying the \`no-objective\` verdict render no verdict at all, with no written decision either way. ` +
    `**A field being correct in the data and absent from the page passes every gate in this repository.**\n\n`,
);

/* ============================================ 2. GATE-EMITTED SCOPES */

section('gates');
w(`### The gates, and their own emitted scopes\n\n`);
w(
  `Every figure in this document that a gate emits is quoted from the block below, captured by running each gate at \`${HEAD}\`. ` +
    `Figures the document computes itself are printed with the field or needle that produced them. ` +
    `**The gates enforce internal consistency, not correctness** — they can prove a mark reaches a page and cannot prove the mark is true.\n\n`,
);
w('```\n' + GATES + '\n```\n\n');

/* ================================================= 3. EXTRACT A */

section('A');
w(`---\n\n# EXTRACT A — STRUCTURAL\n\n`);
w(
  `All ${ledger.length} ledger records and all ${provenance.length} provenance records, in id order. ` +
    `Nothing is sampled and nothing is omitted from this extract.\n\n` +
    `**Read the field names first.**\n\n` +
    `- \`verdict\` — the ledger's \`assessment\` enum. Definitions are in Extract C; the measured distribution is printed there beside each value.\n` +
    `- \`bias\` — the provenance layer's \`directionOfBias\` enum. Provenance records carry no verdict; this is the closest thing they have to one.\n` +
    `- \`claim\` — \`claimAtLaunch\`, what the government said the thing would achieve. Empty where nothing was claimed, which is itself a finding the corpus scores (\`no-objective\`).\n` +
    `- \`reasoning\` — **the first SUBSTANTIVE sentence of the record's assessment note**, not the whole note. Where a note opens with a dated clause recording when it was written or corrected, that clause is skipped here so the thesis sentence shows; the clause is still in the record and the \`corrected\` marker below names its field. The full note is present for the ${DEEP.length} records in Extract B and the ${DROPPED_BULK.length} in its appendix, and is not in this file for the rest. That omission is listed at the end.\n` +
    `- \`sources\` — count by tier. **The tier grades the DOCUMENT HELD, not the institution the subject belongs to**: an official finding known only through a newspaper is T4. Ladder in Extract C.\n` +
    `- \`unmeasured\` — the stated reasons the record gives for things it says have no measurement, with the count of each. Definitions in Extract C.\n` +
    `- \`corrected\` — the fields carrying a self-correction or withdrawn wording. Full text in Extract D or B.\n\n`,
);

w(`## A.1 — Ledger, ${ledger.length} records\n\n`);
for (const r of ledger.slice().sort((a, b) => a.id.localeCompare(b.id))) {
  const t = tally(r.sources ?? [], 'tier');
  const rk = tally(r.unmeasured ?? [], 'reasonKind');
  const h = HIST[r.id];
  const bits = [];
  bits.push(`**${r.id}** · ${esc(r.title)}`);
  bits.push(
    `\`${r.assessment}\` · ${r.term} · ${(r.domains ?? []).join('/')}${r.lenses?.length ? ` · lens ${r.lenses.join('/')}` : ''} · ${r.type} · ${r.date}${r.dateEnd ? `–${r.dateEnd}` : ''} · confidence ${r.confidence ?? '—'}`,
  );
  if (r.claimAtLaunch) bits.push(`claim — ${esc(r.claimAtLaunch)}`);
  else bits.push(`claim — *none stated at announcement*`);
  if (r.assessmentNote) bits.push(`reasoning — ${esc(firstSentence(r.assessmentNote))}`);
  else bits.push(`reasoning — *no assessment note*`);
  bits.push(
    `sources ${(r.sources ?? []).length} [${tierStr(t) || 'none'}]` +
      (rk.size ? ` · unmeasured ${(r.unmeasured ?? []).length} [${[...rk].map(([k, n]) => `${k}×${n}`).join(' ')}]` : ' · unmeasured 0') +
      (r.differentFacts ? ' · differentFacts TRUE' : '') +
      (r.caveat ? ' · CAVEAT' : '') +
      (r.revisitTrigger ? ' · revisit trigger set' : ''),
  );
  if (GROUND_OF.has(r.id)) bits.push(`contested ground (project's own classification, not a data field) — ${GROUND_OF.get(r.id)}`);
  if (h && h.values.length > 1) bits.push(`verdict changed after shipping — ${h.values.map((v) => (v.from ? `${v.from}→${v.v}` : v.v)).join(' , ')} (${h.values.length - 1} change)`);
  if (h && h.editCount) bits.push(`${h.editCount} commit(s) touched this record after it was created`);
  if (CORRECTED.has(r.id)) bits.push(`corrected — ${CORRECTED.get(r.id).join(', ')}`);
  w(bits.join('  \n') + '\n\n');
}

w(`## A.2 — Provenance, ${provenance.length} records\n\n`);
w(
  `Provenance records are measurement-dispute records: a definitional change, a rebasing, a discontinued series, two publishers disagreeing. ` +
    `They carry no verdict on a government action. They are first-class records here rather than footnotes, and a ledger verdict that rests on a series governed by one of these is only as strong as the provenance record allows.\n\n`,
);
for (const r of provenance.slice().sort((a, b) => Number(a.id.slice(2)) - Number(b.id.slice(2)))) {
  const t = tally(r.sources ?? [], 'tier');
  const h = HIST[r.id];
  const bits = [];
  bits.push(`**${r.id}** · ${esc(r.title)}`);
  bits.push(`bias \`${r.directionOfBias}\` · ${esc(r.when)} · ${(r.affectsDomains ?? []).join('/')} · bridge ${r.bridgeExists === true ? 'exists' : r.bridgeExists === false ? 'NONE' : '—'}`);
  bits.push(`what changed — ${esc(firstSentence(r.whatChanged))}`);
  bits.push(
    `sources ${(r.sources ?? []).length} [${tierStr(t) || 'none'}]` +
      (r.affectsSeries?.length ? ` · affects ${r.affectsSeries.length} series` : '') +
      (r.correctiveSeries?.length ? ` · corrective ${r.correctiveSeries.length}` : '') +
      (r.competingAccounts?.length ? ` · ${r.competingAccounts.length} competing account(s)` : ''),
  );
  if (h && h.values.length > 1) bits.push(`bias changed after shipping — ${h.values.map((v) => (v.from ? `${v.from}→${v.v}` : v.v)).join(' , ')}`);
  if (h && h.editCount) bits.push(`${h.editCount} commit(s) touched this record after it was created`);
  if (CORRECTED.has(r.id)) bits.push(`corrected — ${CORRECTED.get(r.id).join(', ')}`);
  w(bits.join('  \n') + '\n\n');
}

/* ------------------------------------------- A.3 distributions to attack */

w(`## A.3 — The distributions, so you do not have to count\n\n`);
w(`Emitted by this generator from \`/data\` at \`${HEAD}\`. The field read is named in each line.\n\n`);

w(`**Verdicts** — field \`assessment\`, over ${ledger.length} ledger records:\n\n`);
w('| verdict | n | share |\n|---|---:|---:|\n');
for (const [k, n] of [...ASSESSMENT].sort((a, b) => b[1] - a[1])) w(`| \`${k}\` | ${n} | ${((100 * n) / ledger.length).toFixed(1)}% |\n`);
w('\n');

w(`**Measurement bias** — field \`directionOfBias\`, over ${provenance.length} provenance records:\n\n`);
w('| value | n |\n|---|---:|\n');
for (const [k, n] of [...DIRECTION].sort((a, b) => b[1] - a[1])) w(`| \`${k}\` | ${n} |\n`);
w('\n');

const unmeasuredLedger = ledger.reduce((n, r) => n + (r.unmeasured ?? []).length, 0);
const unmeasuredSeries = series.reduce((n, r) => n + (r.unmeasured ?? []).length, 0);
w(
  `**Stated reasons for an absence** — field \`unmeasured[].reasonKind\`, ${unmeasuredLedger} entries on ledger records and ${unmeasuredSeries} on series, ` +
    `${unmeasuredLedger + unmeasuredSeries} in total:\n\n`,
);
w('| reason | n |\n|---|---:|\n');
for (const [k, n] of [...REASONKIND].sort((a, b) => b[1] - a[1])) w(`| \`${k}\` | ${n} |\n`);
w(`\nOf those, ${[...DISPUTEKIND.values()].reduce((a, b) => a + b, 0)} carry \`reasonDisputed\` — the holder's stated reason is contradicted — split \`${[...DISPUTEKIND].map(([k, n]) => `${k}×${n}`).join('\` \`')}\`.\n\n`);

w(`**Source tiers** — ${citations.length.toLocaleString()} graded citations. **Tier is asserted in two different places**: inside each \`sources[]\` entry on ledger and provenance records, and ON THE RECORD for a series. Reading only the first is a documented recurring error in this project, so the split is printed by layer:\n\n`);
w('| layer | citations | ' + ['T1', 'T2', 'T3', 'T4', 'T5'].join(' | ') + ' |\n|---|---:|---:|---:|---:|---:|---:|\n');
for (const [layer, m] of Object.entries(TIER_BY_LAYER)) {
  const n = citations.filter((c) => c.layer === layer).length;
  w(`| ${layer} | ${n} | ${['T1', 'T2', 'T3', 'T4', 'T5'].map((t) => m.get(t) ?? 0).join(' | ')} |\n`);
}
w(`| **all** | **${citations.length}** | ${['T1', 'T2', 'T3', 'T4', 'T5'].map((t) => `**${TIER_ALL.get(t) ?? 0}**`).join(' | ')} |\n\n`);
w(`Untiered citations at HEAD: ${TIER_ALL.get(null) ?? 0}.\n\n`);

w(`**Verdict against source profile** — the cross-tabulation, because a verdict class that always rests on one kind of document is exactly the pattern Extract A exists to expose:\n\n`);
w('| verdict | records | citations | T1 | T2 | T3 | T4 | T5 | mean cites/record |\n|---|---:|---:|---:|---:|---:|---:|---:|---:|\n');
for (const [v] of [...ASSESSMENT].sort((a, b) => b[1] - a[1])) {
  const rs = ledger.filter((r) => r.assessment === v);
  const cs = rs.flatMap((r) => r.sources ?? []);
  const m = tally(cs, 'tier');
  w(`| \`${v}\` | ${rs.length} | ${cs.length} | ${['T1', 'T2', 'T3', 'T4', 'T5'].map((t) => m.get(t) ?? 0).join(' | ')} | ${(cs.length / rs.length).toFixed(1)} |\n`);
}
w('\n');

w(`**Verdict by term** — \`baseline\` is pre-May-2014, then the three terms:\n\n`);
const TERMS = ['baseline', 'T1', 'T2', 'T3'];
w('| verdict | ' + TERMS.join(' | ') + ' |\n|---|---:|---:|---:|---:|\n');
for (const [v] of [...ASSESSMENT].sort((a, b) => b[1] - a[1])) {
  w(`| \`${v}\` | ${TERMS.map((t) => ledger.filter((r) => r.assessment === v && r.term === t).length).join(' | ')} |\n`);
}
w('\n');

w(`**Verdict by domain**, ledger only:\n\n`);
const domains = [...new Set(ledger.flatMap((r) => r.domains ?? []))].sort();
w('| domain | records | ' + [...ASSESSMENT.keys()].sort().map((k) => `\`${k}\``).join(' | ') + ' |\n');
w('|---|---:|' + [...ASSESSMENT.keys()].map(() => '---:').join('|') + '|\n');
for (const d of domains) {
  const rs = ledger.filter((r) => (r.domains ?? []).includes(d));
  w(`| ${d} | ${rs.length} | ${[...ASSESSMENT.keys()].sort().map((k) => rs.filter((r) => r.assessment === k).length).join(' | ')} |\n`);
}
w('\n');

w(
  `**The verdict-change history.** ${C3_ALL_CHANGED.length} records changed their \`assessment\` or \`directionOfBias\` after they first shipped. ` +
    `Emitted by \`tools/gen-record-history.mjs\`, which walks every commit touching \`data/ledger/\` and \`data/provenance.json\` and diffs each record against its own previous state. ` +
    `**${C3_ALL_CHANGED.length - C3_INDIVIDUAL.length} of the ${C3_ALL_CHANGED.length} moved in a single commit** — the one that created the \`no-objective\` value and moved records that had been forced into \`contested\`, \`failed\`, \`partly\` or \`worked\` for want of it. ` +
    `That commit is named in the table so you can judge the bulk move as one decision rather than as ${C3_ALL_CHANGED.length - C3_INDIVIDUAL.length} of them.\n\n`,
);
w('| record | change | date | commit subject |\n|---|---|---|---|\n');
for (const id of C3_ALL_CHANGED.sort()) {
  for (const v of HIST[id].values.slice(1)) w(`| ${id} | \`${v.from}\` → \`${v.v}\` | ${v.date} | ${esc(v.subj)} |\n`);
}
w('\n');

/* ================================================= 4. EXTRACT B */

section('B');
w(`---\n\n# EXTRACT B — DEEP\n\n`);
w(`## How these ${DEEP.length} records were selected\n\n`);
w(
  `Chosen adversarially, not sampled. Four criteria, each aimed at a place where a defect is more likely than average, ` +
    `and every record meeting any of them is here. The criteria are mechanical except the first, which is a judgement and is stated as one.\n\n`,
);
w(
  `**(i) The closing phase's hardest calls — ${C1_HARDEST.length} records.** The last phase closed on environment and energy. Named by hand: the two records the phase could not score and filed \`contested\`; ` +
    `the \`partly\` that four correction passes reworked; the \`failed\` that turned on which column of a coal table was the right one; the two \`too-early\` verdicts on 2030 and 2070 commitments; ` +
    `and the four provenance records carrying the definitional break and the basis seam that those verdicts rest on. ` +
    `**This criterion is a judgement about which calls were hardest and you should treat it as contestable** — the other three are reproducible from git and this one is not.\n\n`,
);
w(
  `**(ii) Corrected more than once — ${C2_MULTI.length} records.** At least two TARGETED commits reworked the record after it shipped, where targeted means the commit touched ` +
    `${SWEEP_THRESHOLD} records or fewer. Counted by \`tools/gen-record-history.mjs\`; the count is a count of COMMITS, so one correction touching four fields counts once. ` +
    `The threshold is not cosmetic: ${C2_SWEPT_ONLY.length} records reached three or more edits purely by being caught in three corpus-wide passes — a bulk rescore, a note-reconciliation sweep, a lens-axis migration — ` +
    `which is three commits and no correction of that record at all. Those ${C2_SWEPT_ONLY.length} are ${C2_SWEPT_ONLY.sort().join(', ')}, named here because the threshold is a judgement and you may think it is the wrong one. ` +
    `The premise behind the criterion is that a record reworked repeatedly is one whose author kept finding it wrong, and the last pass is not guaranteed to have been the one that fixed it.\n\n`,
);
w(
  `**(iii) Assessment changed after shipping, individually — ${C3_INDIVIDUAL.length} records.** Every record whose verdict moved after it was published, EXCLUDING the ${C3_ALL_CHANGED.length - C3_INDIVIDUAL.length} moved in the single bulk commit that created the \`no-objective\` value. ` +
    `Those ${C3_ALL_CHANGED.length - C3_INDIVIDUAL.length} are not full-prose here unless they also meet criterion (ii); the complete change table for all ${C3_ALL_CHANGED.length} is in Extract A.3 and the full assessment note of each is in the appendix at the end of this extract. ` +
    `**Say if you think that exclusion was wrong.** The argument for it is that one decision applied to ${C3_ALL_CHANGED.length - C3_INDIVIDUAL.length} records is one decision; the argument against is that each of the ${C3_ALL_CHANGED.length - C3_INDIVIDUAL.length} was individually rescored under it and each rescoring could be wrong.\n\n`,
);
w(
  `**(iv) A spread of \`contested\` — ${C4_CONTESTED_SPREAD.length} records.** \`contested\` is the verdict that declines to choose, and it carries ${ASSESSMENT.get('contested')} of ${ledger.length} records — the value most open to the charge that refusing to score is a way of avoiding a conclusion the evidence supports. ` +
    `The project classified all ${ASSESSMENT.get('contested')} by what would settle each; the seven grounds are listed below. One record is taken from each — the lowest id, so the choice is not the author's — giving a spread across grounds rather than across domains.\n\n`,
);
w('| ground | n | what would settle it | taken here |\n|---|---:|---|---|\n');
const GROUND_SETTLES = {
  criterion: 'Nothing. The facts are agreed; the dispute is which frame or objective governs',
  interpretation: 'An authoritative reading of a document or statute. None has been given, or two inconsistent ones have',
  'evidence-withheld': 'A specific figure or document that exists or is producible, and is not published',
  measure: 'Nothing, but the rival measures are enumerable — several valid published measures of one object point opposite ways and none was committed to in advance',
  'evidence-unobservable': 'Nothing. The settling fact is a counterfactual, or is unbuildable while the practice stands',
  time: 'Elapsed time. The readings make divergent predictions',
  'vocabulary-residue': 'Not a ground — the record says `contested` is standing in for a value that does not exist',
};
for (const [g, ids] of Object.entries(CONTESTED_GROUND)) {
  const list = ids.split(' ');
  w(`| ${g} | ${list.length} | ${GROUND_SETTLES[g]} | ${list[0]} |\n`);
}
w('\n');
w(
  `**That classification is the project's own and is not a field in the data.** It was made by reading each record's case-for, case-against and different-facts note and asking what would settle the contest. ` +
    `It is carried here so you can test it against the records, and it is the kind of thing worth testing: a classification made by the same party that made the verdicts.\n\n`,
);
if (CLASSIFICATION_DRIFT.contestedNotClassified.length || CLASSIFICATION_DRIFT.classifiedNotContested.length) {
  w(
    `**The classification has drifted from the corpus and this document does not hide it.** ` +
      `Records now \`contested\` and not classified: ${CLASSIFICATION_DRIFT.contestedNotClassified.join(', ') || 'none'}. ` +
      `Records classified and no longer \`contested\`: ${CLASSIFICATION_DRIFT.classifiedNotContested.join(', ') || 'none'}.\n\n`,
  );
} else {
  w(`Checked at generation time: the classification's ${GROUND_OF.size} ids are exactly the ${contestedNow.length} records carrying \`contested\` at \`${HEAD}\`. No drift.\n\n`);
}

w(
  `**What these criteria deliberately exclude.** Records that shipped once, were never corrected, never rescored and are not \`contested\` — the ordinary majority — appear only in Extract A. ` +
    `The selection is therefore **biased towards trouble by construction**, and you should not read the density of problems in Extract B as the density in the corpus. ` +
    `If you want to test the ordinary case, pick ids out of Extract A and say what you would have needed to judge them.\n\n`,
);

w(`## The records\n\n`);
let n = 0;
for (const id of DEEP) {
  const r = byId.get(id);
  const h = HIST[id];
  n += 1;
  w(`### B.${n} · ${id} — ${esc(r.title)}\n\n`);
  const why = [...new Set(REASONS.get(id))];
  w(`*Selected because: ${why.join('; ')}.*\n\n`);

  if (r.assessment !== undefined) {
    w(
      `\`${r.assessment}\` · ${r.term} · ${(r.domains ?? []).join('/')}${r.lenses?.length ? ` · lens ${r.lenses.join('/')}` : ''} · ${r.type} · ${r.date}${r.dateEnd ? `–${r.dateEnd}` : ''} · confidence ${r.confidence ?? '—'} · last researched ${r.asOf ?? '—'}` +
        (GROUND_OF.has(id) ? ` · contested ground: ${GROUND_OF.get(id)}` : '') +
        '\n\n',
    );
  } else {
    w(`bias \`${r.directionOfBias}\` · ${esc(r.when)} · ${(r.affectsDomains ?? []).join('/')} · bridge ${r.bridgeExists === true ? 'exists' : r.bridgeExists === false ? 'NONE' : '—'}\n\n`);
  }

  if (h) {
    const editLine = h.editCount
      ? `Created ${h.firstDate}. ${h.editCount} commit(s) touched it afterwards: ${h.edits.map((e) => `${e.date} (${e.fields.join(', ')})`).join(' · ')}.`
      : `Created ${h.firstDate}. Never edited since.`;
    w(`**History.** ${editLine}`);
    if (h.values.length > 1) w(` **Verdict moved:** ${h.values.map((v) => (v.from ? `${v.from}→${v.v} on ${v.date} — "${esc(v.subj)}"` : `first filed ${v.v}`)).join(' ; ')}.`);
    w('\n\n');
  }

  if (r.caveat) w(`> **CAVEAT — this renders wherever the record appears and is never truncated.** ${r.caveat.replace(/\s*\n\s*/g, ' ').trim()}\n\n`);

  w(field('What this is', r.summary));
  w(field('The measurement problem', r.whatChanged));
  w(field('What was claimed at announcement', r.claimAtLaunch));
  w(field('What can be established since', r.whatHappened));
  w(field('Strongest case for', r.caseFor));
  w(field('Strongest case against', r.caseAgainst));
  if (r.differentFacts !== undefined) {
    w(field(`Different facts — flag is ${r.differentFacts ? 'TRUE' : 'FALSE'}`, r.differentFactsNote));
  }
  w(field('Note on the verdict itself', r.assessmentNote));
  w(field('Re-test when', r.revisitTrigger));
  w(field('Confounding shocks', r.shockExposure));
  w(field('Bridge across the break', r.bridgeNote));
  w(field('Notes', r.notes));

  for (const c of r.competingAccounts ?? []) {
    w(field(`Competing account — ${esc(c.party ?? c.source ?? 'party')}`, c.position ?? JSON.stringify(c)));
  }

  for (const u of r.unmeasured ?? []) {
    w(
      field(
        `Not measured — stated reason \`${u.reasonKind}\`${u.reasonDisputed ? ` (stated reason DISPUTED, ${u.disputeKind ?? 'kind not given'})` : ''}`,
        `${u.what} — ${u.why}${u.wouldFill ? ` **What would close it:** ${u.wouldFill}` : ''}`,
      ),
    );
  }

  if (r.seriesRefs?.length) w(`**Series this rests on.** ${r.seriesRefs.join(', ')}\n\n`);
  if (r.provenanceRefs?.length) w(`**Measurement disputes this record declares.** ${r.provenanceRefs.join(', ')}\n\n`);
  if (r.affectsSeries?.length) w(`**Series this record is about.** ${r.affectsSeries.join(', ')}\n\n`);

  if (r.sources?.length) {
    w(`**Sources** (${r.sources.length}, ${tierStr(tally(r.sources, 'tier')) || 'untiered'}):\n\n`);
    for (const s of r.sources) w(`- \`${s.tier ?? 'no tier'}\` ${esc(s.name)} — ${s.url ?? '(no url)'}\n`);
    w('\n');
  }
  w('---\n\n');
}

w(`## B — Appendix: the bulk rescore, verdict notes in full\n\n`);
w(
  `The ${DROPPED_BULK.length} records moved to \`no-objective\` in the single bulk commit and not selected in full above. ` +
    `The field printed is \`assessmentNote\` — the note on the verdict VALUE, which is the field that has to carry the change. ` +
    `The rest of each record's prose is not in this file; that omission is listed at the end.\n\n`,
);
for (const id of DROPPED_BULK.sort()) {
  const r = byId.get(id);
  w(`**${id}** — ${esc(r.title)} · \`${r.assessment}\` (was \`${HIST[id].values[0].v}\`)\n\n`);
  w(`${(r.assessmentNote ?? '*no assessment note*').replace(/\s*\n\s*/g, ' ').trim()}\n\n`);
}

/* ================================================= 5. EXTRACT C */

section('C');
w(`---\n\n# EXTRACT C — METHOD\n\n`);
w(
  `The instrument's rules, quoted from the files that hold them rather than paraphrased, so you can check whether they were followed. ` +
    `Passages are sliced out of the project's instruction file and its JSON schemas at generation time and the generator aborts if an anchor has moved, so this section cannot silently stop describing the method it is quoted to describe.\n\n` +
    `**Where a rule states a distribution, the measured value at \`${HEAD}\` is printed beside it. They do not always agree, and where they do not, both stand.**\n\n`,
);

w(`## C.1 — The verdict vocabulary\n\n`);
const aProp = prop(LEDGER_SCHEMA, 'assessment');
w(`Enum, from \`schemas/ledger.schema.json\`: \`${aProp.enum.join('` · `')}\`\n\n`);
w(`${aProp.description.trim()}\n\n`);
w(`**Measured at \`${HEAD}\`**, over ${ledger.length} ledger records: ${[...ASSESSMENT].sort((a, b) => b[1] - a[1]).map(([k, v]) => `\`${k}\` ${v}`).join(' · ')}.\n\n`);

w(`## C.1b — The provenance layer's own value\n\n`);
const dProp = prop(PROV_SCHEMA, 'directionOfBias');
w(`Enum, from \`schemas/provenance.schema.json\`: \`${dProp.enum.join('` · `')}\`\n\n`);
w(`${dProp.description.trim()}\n\n`);
w(`**Measured at \`${HEAD}\`**, over ${provenance.length} provenance records: ${[...DIRECTION].sort((a, b) => b[1] - a[1]).map(([k, v]) => `\`${k}\` ${v}`).join(' · ')}.\n\n`);
w(
  `**Read that description against that line.** The field's own schema text is a good example of what this document asks you to do: it states a distribution, and the distribution it states is not the one measured above. ` +
    `Which of the two is out of date, and what follows for the records filed under the values it describes, is a question for you rather than a settled point.\n\n`,
);

w(`## C.2 — The four commitment states\n\n`);
w(
  `A commitment record has to resolve into one of four states. This vocabulary is **stated in prose in the records and is not yet a field**, which means nothing validates it and nothing renders it as a value. ` +
    `Whether that is acceptable is open.\n\n`,
);
w(passage('commitment states', '**Commitment states.** Every commitment record resolves into one', "as in L-0205's exchange of notifications.") + '\n\n');

w(`## C.3 — The filing rule\n\n`);
w(`Which domain a record files under, for the case where the answer is genuinely contestable. Quoted whole:\n\n`);
w(passage('filing rule', '**Procurement filing rule, settled.**', 'as a DOMAIN remains armed conflict and counter-insurgency, per phase 11.') + '\n\n');
w(
  `And the rule for admitting a cross-cutting lens at all, from the schema: *"A LENS IS ADMITTED WHEN ITS RECORDS LAND, NOT WHEN IT IS PLANNED"* — a declared value with nothing behind it is a filter that returns nothing, ` +
    `and a lens over one record is a filter that returns what the reader already had.\n\n`,
);

w(`## C.4 — The withheld standard, and the four stated reasons for an absence\n\n`);
w(
  `This corpus records absences as findings. Each carries a STATED REASON — what the responsible body says, not what is true — drawn from a four-value enum. ` +
    `\`withheld\` is the narrowest and the one most likely to be over-claimed, so read its test carefully.\n\n`,
);
const rkProp = prop(LEDGER_SCHEMA, 'unmeasured').items.properties.reasonKind;
w(`Enum: \`${rkProp.enum.join('` · `')}\`\n\n`);
w(`${rkProp.description.trim()}\n\n`);
const rdProp = prop(LEDGER_SCHEMA, 'unmeasured').items.properties.reasonDisputed;
const dkProp = prop(LEDGER_SCHEMA, 'unmeasured').items.properties.disputeKind;
w(`**\`reasonDisputed\`** — ${rdProp.description.trim()}\n\n`);
w(`**\`disputeKind\`** (\`${dkProp.enum.join('` · `')}\`) — ${dkProp.description.trim()}\n\n`);
w(`**Measured at \`${HEAD}\`**: ${[...REASONKIND].sort((a, b) => b[1] - a[1]).map(([k, v]) => `\`${k}\` ${v}`).join(' · ')}; disputed ${[...DISPUTEKIND.values()].reduce((a, b) => a + b, 0)} (${[...DISPUTEKIND].map(([k, v]) => `\`${k}\` ${v}`).join(' · ')}).\n\n`);

w(`## C.5 — The stated-search rule: what may be claimed about an absence\n\n`);
w(
  `Two rules, and they are the ones this project breaks most often. The first governs any claim about what EXISTS; the second governs any claim that something was not published.\n\n`,
);
w(passage('rule 5d', '5d. **A claim about what EXISTS is not a claim about what the SOURCES CONTAIN', 'the record must say which it means.**') + '\n\n');
w(passage('stated search', '**AN ABSENCE-OF-PUBLICATION CLAIM REQUIRES A STATED SEARCH', 'takes the weaker of the available kinds.**') + '\n\n');

w(`## C.6 — The four measurement categories\n\n`);
w(
  `Where two bodies produce different numbers, the record has to say which of four situations it is in. Getting this wrong is invisible downstream, ` +
    `and category 3 is the one that reviews clean while being wrong.\n\n`,
);
w(passage('measurement categories', '**The four measurement categories.** A record must say which it is:', "`withheld` on the Russian side, `not-published` on the Indian.)") + '\n\n');
w(
  `And the derived-quantity rule that follows from it:\n\n` +
    passage('derived quantities', '5c. **A derived quantity inherits its inputs\' contests.**', 'where the range is too wide to support the argument being made, the argument is what changes.') +
    '\n\n',
);

w(`## C.7 — The withdrawn-wording convention\n\n`);
w(
  `**This is why wrong figures are still on the page.** A correction is made in the record itself, and the withdrawn wording survives inside the sentence that withdraws it. ` +
    `A record reads *"the figure is X — CORRECTED on this date, this previously said Y, and here is why Y was wrong"*. The verification log is separately append-only: an entry that turns out to be wrong is superseded by a later entry, never edited.\n\n`,
);
w(passage('correction guard', '**A correction guard asserts a presence, never an absence.**', 'correctly withdrawn the word and said so.') + '\n\n');
w(passage('append-only log', '- **A closed verification-log entry is never edited.**', 'rather than making it silently.') + '\n\n');

w(`## C.8 — The source ladder\n\n`);
const tierProp = prop(LEDGER_SCHEMA, 'sources').items.properties.tier;
w(`${tierProp.description.trim()}\n\n`);
w(passage('tier tags', '6. **Tier tags travel with claims.**', 'would require a reference the relevance check forbids.') + '\n\n');
w(passage('tier movement', '**A tier moves only when the EVIDENCE moved, and the merge asserts which direction.**', 'chosen deliberately in each case.**') + '\n\n');

w(`## C.9 — Two rendering rules that bear on what you can see\n\n`);
w(passage('caveat rule', '3a. **A caveat never truncates, anywhere, at any density.**', 'Ordinary uncertainty is not a caveat and belongs in `notes`.') + '\n\n');
w(passage('absence rendering', '4a. **An absence renders unlike a finding.**', 'Expect several in infrastructure.') + '\n\n');

w(`## C.10 — What the gates do, and what they do not check\n\n`);
w(
  `**The single most important thing to understand about this instrument: the gates enforce internal consistency, not correctness.** ` +
    `They prove that a declared mark reaches its own page, that every URL resolves, that no citation is a bare domain, that declared arithmetic reconstructs. ` +
    `**None of them can tell whether a verdict is right, whether a source supports the claim made on it, or whether an absence was really searched for.** That is the whole of what you are being asked to do.\n\n`,
);
w(passage('gate list', '**The gate list, run in full every cycle:**', 'zero forward references between `parts/`') + '\n\n');
w(`### The three rendering gates, and why none subsumes another\n\n`);
w(passage('rendering gates', '**The three rendering gates are different in kind and none subsumes another.**', 'catches a field that is nominally guarded and suppressed anyway.') + '\n\n');
w(`### The scope a guard binds, and the gap it leaves\n\n`);
w(
  `The failure mode that produces most of this project's defects. A guard passes because it is checking the thing it binds, ` +
    `and the claim one level outside its scope is unprotected with nothing to report it:\n\n`,
);
w(passage('guard scope', '**A GUARD BINDS A SCOPE, AND THE CLAIM IT PROTECTS HAS ITS OWN.', 'report-only until the triage narrows it.') + '\n\n');
w(
  `**And the specific, proven consequence:** two fields — the note on a verdict and the re-test trigger — were written, validated and shipped on 226 records, and rendered on **none** of them, ` +
    `across every phase since each field was added, with every gate green throughout **precisely because the data was correct**. ` +
    `One prior cycle had just written reasoning into 33 verdicts so that no verdict stood without stated ground, and **not one of those 33 had ever reached a reader.**\n\n`,
);

w(`## C.11 — What the instrument refuses to do\n\n`);
w(
  `Stated so you can attack the refusals rather than assume they are hedges:\n\n` +
    `- **No composite score, ever, and no aggregate verdict for a term or for the government.** Scorecards roll up to counts of verdicts, not to a grade.\n` +
    `- **No splicing across a measurement break.** Where a series changes basis the seam renders and no line is drawn across it. No interpolation, no trend fitted through a break.\n` +
    `- **A blank is unreported, not zero.** Where nothing measures a thing at all, that is rendered as a named absence rather than left off the page.\n` +
    `- **Where two instruments measure the same quantity and disagree, neither figure is adopted and no midpoint is taken.** The disagreement is the finding.\n` +
    `- **Every scored record carries a case for and a case against**, and the schema requires both, so a record presenting one is a validation failure rather than an editorial choice.\n\n`,
);

/* ================================================= 6. EXTRACT D */

section('D');
w(`---\n\n# EXTRACT D — CORRECTIONS AND WITHDRAWN WORDING\n\n`);
w(
  `**These are included deliberately and are not hidden anywhere in this document.** ` +
    `The convention in C.7 means a corrected record still contains the wording it withdrew, inside the sentence that withdraws it. ` +
    `If you read one of these as a live error, report it — that is evidence the correction is not visible enough, and it is a finding rather than noise.\n\n`,
);
w(
  `**The needle, printed so the count has a scope.** A field is listed here when it matches:\n\n` +
    '```\n' +
    String(CORRECTION_NEEDLE) +
    '\n```\n\n' +
    `It matches only **self-referential** corrections — a record saying what IT previously said. Ordinary uses of "withdrawn" and "superseded" that describe the world ` +
    `(a measure withdrawn by its enacting authority, an estimate superseded by a later answer) are excluded by construction, and there are many of them. ` +
    `**A needle bounds what it finds and never what there is**: a correction phrased in some other way is not in this list.\n\n`,
);
w(
  `**Found: ${CORRECTED.size} ledger and provenance records, and ${CORRECTED_SERIES.size} series, at \`${HEAD}\`.** ` +
    `Full text is in the record itself — in Extract B for the ${DEEP.filter((id) => CORRECTED.has(id)).length} of these that are there, and in the field named below for the rest.\n\n`,
);
w('| record | verdict / bias | fields carrying a correction |\n|---|---|---|\n');
for (const id of [...CORRECTED.keys()].sort()) {
  const r = byId.get(id);
  w(`| ${id} | \`${r.assessment ?? r.directionOfBias}\` | ${CORRECTED.get(id).join(', ')} |\n`);
}
w('\n');
w(`Series carrying one: ${[...CORRECTED_SERIES.keys()].sort().map((id) => `\`${id}\` (${CORRECTED_SERIES.get(id).join(', ')})`).join(' · ')}.\n\n`);

/* ================================================= 7. OMISSIONS */

section('omissions');
w(`---\n\n# What this document leaves out\n\n`);
w(
  `Stated so you can weigh a finding against what you were not shown, and so that "I could not check X" is a claim about this file rather than about the corpus.\n\n` +
    `1. **The ${series.length} series and ${60} paired records.** The corpus has four layers; this document carries two. Series hold the time series a ledger verdict rests on — the actual figures, their breaks, their per-point status flags — and pairs hold constructed comparisons. ` +
    `A verdict here can be read for whether it follows from its own prose, but **not for whether the underlying numbers say what the prose says they say.** That is the single largest thing you cannot check.\n` +
    `2. **The full assessment note for the ${ledger.filter((r) => r.assessmentNote).length - DEEP.filter((id) => byId.get(id).assessmentNote).length - DROPPED_BULK.length} ledger records outside Extract B and its appendix.** Extract A gives the first substantive sentence only.\n` +
    `3. **The full prose of the ${ledger.length - DEEP.filter((id) => id.startsWith('L-')).length} ledger and ${provenance.length - DEEP.filter((id) => id.startsWith('P-')).length} provenance records outside Extract B.** Their claim, verdict, first line of reasoning, tier profile and stated absences are in Extract A; their case-for, case-against and evidence are not.\n` +
    `4. **The rendered site.** These records are published as web pages, and some of this project's defects were rendering defects — correct data that reached no reader. You are reading the data, not the pages, so a rendering defect is invisible to you.\n` +
    `5. **The verification log**, ${Math.round(read('docs/verification-log.md').length / 1024)} KB of cycle-by-cycle working notes. Where a decision's reasoning lives only there, it is not here.\n` +
    `6. **Everything the corpus never opened.** A subject nobody researched leaves no trace in any of these extracts. If a domain looks thin, it may be thin, and the record count per domain in Extract A.3 is the only evidence you have either way.\n\n`,
);
w(
  `**One asymmetry to hold on to.** Extract B is selected for trouble and Extract A is complete. ` +
    `A pattern you find in A is a pattern in the corpus; a density you observe in B is a density in the selection. Do not generalise from B.\n\n`,
);
w(
  `**And one about this file specifically.** The contents list at the top is authoritative: this document is one of several cuts of the same corpus, and any extract not listed there is absent from it. ` +
    `That is deliberate — the passes are run separately so they cannot anchor on each other — but it means "the corpus does not contain X" is a claim you cannot make from here. "This file does not let me check X" is the claim to make, and it is a useful one.\n\n`,
);


/* ============================== EXTRACT E — THE COMPLIANCE SURFACE ============================ */

/**
 * A rule is only testable against the text it binds. Extract C states the rules; this extract is
 * the corpus material each one governs, so the method pass can check rule-following instead of
 * forming an impression.
 *
 * It is selected, not complete, and the exclusions are stated in the section — the whole absence
 * population is 379 entries and printing every one in full would crowd out the rules themselves.
 * What is here in full is the material where a rule is strongest and most over-claimable.
 */
section('E');

const unmeasuredAll = [];
for (const r of [...ledger, ...series]) {
  for (const [i, u] of (r.unmeasured ?? []).entries()) {
    unmeasuredAll.push({ id: r.id, title: r.title, layer: r.assessment !== undefined ? 'ledger' : 'series', i, u });
  }
}
const STRONG = unmeasuredAll.filter((a) => a.u.reasonKind === 'withheld' || a.u.reasonKind === 'never-defined' || a.u.reasonDisputed);
const REST = unmeasuredAll.filter((a) => !STRONG.includes(a));

/**
 * Rule 5d's surface: sentences making a claim about what EXISTS rather than about what the
 * retrieved documents contain. The needle is printed with the count, and it is deliberately
 * OVER-INCLUSIVE — a candidate list, not a finding, per the standing rule that a non-zero count
 * is read in context before it is banked. Many of these will be correctly grounded.
 */
const EXISTENCE_NEEDLE =
  /\b(?:no (?:other|body|instrument|publisher|source|explanation|figure|record|agreed|equivalent)|nobody|never been published|the only|unprecedented|unexplained|not published anywhere|any government)\b/i;
const PROSE_FIELDS = [
  'summary', 'claimAtLaunch', 'whatHappened', 'caseFor', 'caseAgainst', 'assessmentNote',
  'caveat', 'differentFactsNote', 'revisitTrigger', 'shockExposure', 'whatChanged', 'bridgeNote', 'notes',
];
const existenceHits = [];
for (const r of [...ledger, ...provenance, ...series]) {
  for (const f of PROSE_FIELDS) {
    const v = r[f];
    if (!v) continue;
    for (const sent of String(v).replace(/\s*\n\s*/g, ' ').split(/(?<=[.!?])\s+/)) {
      if (EXISTENCE_NEEDLE.test(sent)) existenceHits.push({ id: r.id, field: f, sent: sent.trim() });
    }
  }
}

/** The commitment-state vocabulary is prose-only, so its surface is the sentences carrying a bare
 *  (a)-(d) token. The statutory-citation form — 12(1)(c), 370(1)(d) — is excluded by requiring the
 *  '(' not to follow a word character or a closing bracket. */
const STATE_NEEDLE = /(?<![0-9A-Za-z)])\([a-d]\)/;
const stateHits = [];
for (const r of ledger) {
  for (const f of PROSE_FIELDS) {
    const v = r[f];
    if (!v) continue;
    for (const sent of String(v).replace(/\s*\n\s*/g, ' ').split(/(?<=[.!?])\s+/)) {
      if (STATE_NEEDLE.test(sent)) stateHits.push({ id: r.id, field: f, sent: sent.trim() });
    }
  }
}

/** Corrections in FULL FIELD TEXT — the withdrawn-wording convention's own surface. Extract D
 *  indexes them; this prints them, because the convention can only be judged on the sentence. */
const correctionFields = [];
for (const r of [...ledger, ...provenance, ...series]) {
  const walk = (v, path) => {
    if (typeof v === 'string') {
      if (CORRECTION_NEEDLE.test(v)) correctionFields.push({ id: r.id, path, text: v.replace(/\s*\n\s*/g, ' ').trim() });
    } else if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) walk(x, path ? `${path}.${k}` : k);
    }
  };
  walk(r, '');
}

const defenceLens = ledger.filter((r) => (r.lenses ?? []).includes('defence-sector'));

w(`---\n\n# EXTRACT E — THE COMPLIANCE SURFACE\n\n`);
w(
  `Extract C states the rules. This extract is the corpus text those rules bind, so you can test whether a rule was followed rather than whether the corpus feels rigorous. ` +
    `**It is selected and the exclusions are named in each subsection.** Every needle is printed beside its count: a count with an unstated scope is wrong by an amount nobody can see, and that includes the counts in this document.\n\n`,
);

w(`## E.0 — What a data-only reviewer CANNOT test, and should not try\n\n`);
w(
  `Four of the rules in Extract C are about **rendering**, and you are reading data. Nothing here can settle them, and a finding that assumes it can will be wrong:\n\n` +
    `- **the caveat non-truncation rule** — whether a qualification survives into a dense table is a property of the page, not the record. The ${[...ledger, ...series].filter((r) => r.caveat).length} caveats are correct in the data and that is not the question the rule asks.\n` +
    `- **the absence-renders-unlike-a-finding rule** — same reason.\n` +
    `- **the guarded-marks and render-audit gates** — they assert about built HTML.\n` +
    `- **the seam rendering rules** — a seam is a visual object.\n\n` +
    `What you CAN test from here is everything that lives in the text: whether an absence claim states its search, whether a stated reason matches its own definition, whether a correction says what it withdrew, whether a claim about existence was rewritten as a claim about the documents.\n\n`,
);

w(`## E.1 — The strongest absence claims, in full — ${STRONG.length} entries\n\n`);
w(
  `The absence vocabulary has four values and they are not equally strong. \`withheld\` requires an identifiable refusal to a specific request. \`never-defined\` asserts that **no agreed definition exists anywhere**, which is the widest claim about the world in the whole schema. And \`reasonDisputed\` asserts that the holder's own stated reason is contradicted by evidence. ` +
    `All ${STRONG.length} entries carrying one of those three are printed here in full — ${unmeasuredAll.filter((a) => a.u.reasonKind === 'withheld').length} \`withheld\`, ${unmeasuredAll.filter((a) => a.u.reasonKind === 'never-defined').length} \`never-defined\`, ${unmeasuredAll.filter((a) => a.u.reasonDisputed).length} disputed, deduplicated. ` +
    `**Test each against its own definition in Extract C**, and against the stated-search rule: does the \`why\` state a search that was run, or does it state that nothing was found?\n\n`,
);
for (const a of STRONG) {
  w(`**${a.id}** (${a.layer}) · \`${a.u.reasonKind}\`${a.u.reasonDisputed ? ` · **reasonDisputed**, \`${a.u.disputeKind ?? 'kind not given'}\`` : ''} — ${esc(a.title)}\n\n`);
  w(`- *What is not measured:* ${String(a.u.what).replace(/\s*\n\s*/g, ' ').trim()}\n`);
  w(`- *Why no figure exists:* ${String(a.u.why).replace(/\s*\n\s*/g, ' ').trim()}\n`);
  if (a.u.wouldFill) w(`- *What would close it:* ${String(a.u.wouldFill).replace(/\s*\n\s*/g, ' ').trim()}\n`);
  w('\n');
}

w(`## E.2 — The rest of the absence population — ${REST.length} entries, ids only\n\n`);
w(
  `**Ids only, and that is a deliberate cut you should hold against this document.** These ${REST.length} entries carry \`not-published\` or \`not-collected\` without a dispute flag. ` +
    `Both are claims about the world and both inherit the stated-search rule in full — but the \`why\` is where a search is stated, and printing ${REST.length} of them would have crowded out the rules this pass exists to test. ` +
    `**So the stated-search rule cannot be tested against these from this file.** They are listed so the population is visible: a reviewer shown only the ${STRONG.length} strongest claims would judge the vocabulary on its narrowest cases and conclude it is applied more carefully than it is. ` +
    `If the sample in E.1 makes you suspect a pattern here, say so and name what you would need.\n\n`,
);
for (const k of ['not-published', 'not-collected', 'withheld', 'never-defined']) {
  const g = REST.filter((a) => a.u.reasonKind === k);
  if (!g.length) continue;
  w(`**\`${k}\`** — ${g.length}: ${g.map((a) => a.id).join(' · ')}\n\n`);
}

w(`## E.3 — Claims about what EXISTS — ${existenceHits.length} candidate sentences across ${new Set(existenceHits.map((h) => h.id)).size} records\n\n`);
w(
  `The rule: a claim about what exists is not a claim about what the sources contain, and only the second is checkable. *"No other body publishes this"* asserts something no retrieval can establish; *"no other publisher was located"* states the observation actually made. ` +
    `The mechanical test is in Extract C and it is worth restating: **could a single document, if it turned up tomorrow, falsify the sentence without any figure in the record changing?** If yes, it is a claim about existence and has to rest on what was searched.\n\n`,
);
w('```\nNEEDLE  ' + String(EXISTENCE_NEEDLE) + `\nFIELDS  ${PROSE_FIELDS.join(' ')}\nSCOPE   ledger + provenance + series, sentence-split on [.!?]\n\`\`\`\n\n`);
w(
  `**This is a CANDIDATE LIST and most of it will be correctly grounded.** The needle matches the phrasing, not the defect; the corpus has already rewritten several of these onto what was searched, and those rewrites match too. ` +
    `What is wanted is the ones where the surrounding text does not carry a search.\n\n`,
);
for (const h of existenceHits) w(`- **${h.id}** \`${h.field}\` — ${esc(h.sent)}\n`);
w('\n');

w(`## E.4 — Commitment states asserted in prose — ${stateHits.length} sentences across ${new Set(stateHits.map((h) => h.id)).size} records\n\n`);
w(
  `The four commitment states are **prose only**: there is no field, nothing validates them, and no gate can see them. That makes this the least-guarded vocabulary in the instrument and the easiest place for a state to be asserted where its own definition does not fit. ` +
    `The needle excludes the statutory-citation form by requiring the bracket not to follow a word character or a closing bracket.\n\n`,
);
w('```\nNEEDLE  ' + String(STATE_NEEDLE) + '\nEXCLUDES  12(1)(c), 239AA(7)(b), 370(1)(d) and the like\n```\n\n');
w(
  `**Note before you read them: the corpus runs THREE different \`(a)\`–\`(d)\` vocabularies in these same fields** — the commitment states, a three-part different-facts criterion, and ordinary list markers. Distinguishing them is part of the test. ` +
    `And a token can MENTION a state rather than assert one: *"cannot reach (c) abandoned"* rules a state out.\n\n`,
);
for (const h of stateHits) w(`- **${h.id}** \`${h.field}\` — ${esc(h.sent)}\n`);
w('\n');

w(`## E.5 — Corrections in full field text — ${correctionFields.length} fields\n\n`);
w(
  `Extract D indexes these; this prints them, because the convention can only be judged on the sentence. The rule is that a correction is made in the record itself and **the withdrawn wording survives inside the sentence that withdraws it** — so the wrong figure is still on the page by design. ` +
    `Test: does each one name what it withdrew, why the old form was wrong, and in which direction the error ran? A correction that says only *"corrected"* fails the convention it claims to follow.\n\n`,
);
for (const c of correctionFields) {
  w(`**${c.id}** \`${c.path.replace(/\.\d+\./g, '[].')}\`\n\n${c.text}\n\n`);
}

w(`## E.6 — The filing rule's surface — ${defenceLens.length} records under the \`defence-sector\` lens\n\n`);
w(
  `The filing rule in Extract C is settled and specific: acquisition cost and payment schedule file one domain, indigenisation share and offsets file another, and the lens goes on all of them. It exists because the same procurement generates records that belong in different places. ` +
    `The domain each record actually took is printed beside it.\n\n`,
);
w('| record | domains | lenses | verdict |\n|---|---|---|---|\n');
for (const r of defenceLens) w(`| ${r.id} | ${(r.domains ?? []).join(', ')} | ${(r.lenses ?? []).join(', ')} | \`${r.assessment}\` |\n`);
w('\n');

/* --------------------------------------------------------------- compose and emit */

const SHARED = ['brief', 'limits', 'gates'];

const FILES = [
  {
    file: 'adversarial-pass-input.md',
    title: 'Adversarial review pass — input document',
    subtitle: '*The combined document. Three independently runnable passes are cut from it; see the note at the end.*',
    contents: ['A', 'B', 'C', 'D', 'E'],
    focus: '**All five extracts are here.** If you are running this as one review, read Extract A first: it is the only complete one, and a pattern found there is a pattern in the corpus.',
    body: [...SHARED, 'A', 'B', 'C', 'D', 'E', 'omissions'],
  },
  {
    file: 'pass-a-structural.md',
    title: 'Adversarial review — PASS A, structural',
    subtitle: '*One of three independent passes. The other two are not in this file and you are not expected to have read them.*',
    contents: ['A', 'C'],
    focus:
      '**This pass exists for finding type 4 — a pattern across records that no single record reveals.** Extract A is COMPLETE: every ledger and provenance record is here, none sampled. ' +
      'So a distribution you find is the corpus’s distribution, not a selection effect. Look at the cross-tabulations before the individual blocks.',
    body: [...SHARED, 'A', 'C', 'omissions'],
  },
  {
    file: 'pass-b-deep.md',
    title: 'Adversarial review — PASS B, deep reading',
    subtitle: '*One of three independent passes. The other two are not in this file and you are not expected to have read them.*',
    contents: ['B', 'C', 'D'],
    focus:
      '**This pass exists for finding types 1 and 2 — a verdict its own record does not support, and a claim stronger than its source.** ' +
      'Every record here is given in full, with its sources and their tiers. ' +
      '**These records are selected for trouble and the criteria say how**, so do not read the density of problems here as the density in the corpus; Pass A holds the complete population.',
    body: [...SHARED, 'B', 'C', 'D', 'omissions'],
  },
  {
    file: 'pass-c-method.md',
    title: 'Adversarial review — PASS C, method compliance',
    subtitle: '*One of three independent passes. The other two are not in this file and you are not expected to have read them.*',
    contents: ['C', 'E', 'D'],
    focus:
      '**This pass exists for finding types 3 and 5 — an absence asserted without a search, and a rule the corpus states but did not follow.** ' +
      'Extract C is the rulebook and Extract E is the text each rule binds. Read the rule, then read what it governs, and report the gap. ' +
      '**Start with E.0**, which says which rules cannot be tested from data at all.',
    body: [...SHARED, 'C', 'E', 'D', 'omissions'],
  },
];

const CUT_NOTE =
  `---\n\n## How this document is cut into three passes\n\n` +
  `The same content is emitted as one combined file and as three independently runnable passes, from one generator, with no second copy of any shared block. ` +
  `Each pass carries the brief, the known limits, the gate scopes and Extract C — the method — because a reviewer who cannot see the rule cannot catch the rule being broken, and a reviewer who does not know the limits spends budget rediscovering them.\n\n` +
  `| file | carries | for |\n|---|---|---|\n` +
  `| \`pass-a-structural.md\` | A + C | patterns across the complete population |\n` +
  `| \`pass-b-deep.md\` | B + C + D | verdicts against their own evidence, claims against their sources |\n` +
  `| \`pass-c-method.md\` | C + E + D | rule-following, and absences asserted without a search |\n` +
  `| \`adversarial-pass-input.md\` | A + B + C + D + E | the combined document |\n\n` +
  `**Why three and not one.** A reviewer given 500 KB anchors on whatever it read first, and one review produces one set of priors applied to everything. Three reviews with no shared context cannot contaminate each other, and where two of them independently reach the same finding, that agreement is evidence in a way one reviewer's confidence is not.\n\n`;

const emitted = [];
for (const f of FILES) {
  const body = opening(f) + S(...f.body) + (f.file === 'adversarial-pass-input.md' ? CUT_NOTE : '');

  // Self-description checks, per file. A document that misstates its own contents invites a
  // reviewer to discount everything in it, and these have caught real drift before.
  if (f.body.includes('B')) {
    const headings = (body.match(/^### B\.\d+ · /gm) ?? []).length;
    if (headings !== DEEP.length) {
      console.error(`FAILED ${f.file} — declares ${DEEP.length} deep records, emitted ${headings} headings`);
      process.exit(1);
    }
  }
  if (f.body.includes('A')) {
    for (const r of [...ledger, ...provenance]) {
      if (!body.includes(`**${r.id}**`)) {
        console.error(`FAILED ${f.file} — Extract A is declared complete but ${r.id} does not appear`);
        process.exit(1);
      }
    }
  }
  // Every pass must carry the shared blocks. Asserted by content, not by the composition list,
  // because the list is what a mistake would be made in.
  for (const needle of [GATES.split('\n')[3] ?? 'VALID', 'Known limits', 'EXTRACT C — METHOD', 'Tie every finding to a record id']) {
    if (!body.includes(needle)) {
      console.error(`FAILED ${f.file} — shared block missing, needle not found: ${needle.slice(0, 50)}`);
      process.exit(1);
    }
  }

  writeFileSync(join(ROOT, 'review', f.file), body);
  emitted.push({ file: f.file, bytes: Buffer.byteLength(body), lines: body.split('\n').length });
}

/**
 * The section table, emitted by the generator rather than measured by hand afterwards.
 *
 * Earned: a hand-built table of these sizes was reported once and missed a whole row, carried one
 * stale figure, rounded two by hand and compared a character count against a byte count — a
 * 13,163-byte discrepancy across five causes, in a report about a document whose subject is
 * unreliable self-description. A table the tool prints cannot omit a row that exists.
 */
const sectionTable = [...SECTIONS.keys()].map((k) => ({ section: k, bytes: Buffer.byteLength(S(k)) }));
const sectionSum = sectionTable.reduce((n, r) => n + r.bytes, 0);

writeFileSync(
  join(ROOT, 'review', 'pass-sizes.txt'),
  `Emitted by tools/gen-adversarial-pass-input.mjs at ${HEAD}. ALL FIGURES ARE BYTES, never characters.\n\n` +
    `SECTIONS (built once, shared between files)\n` +
    sectionTable.map((r) => `  ${r.section.padEnd(12)} ${r.bytes.toLocaleString().padStart(9)}`).join('\n') +
    `\n  ${'sum'.padEnd(12)} ${sectionSum.toLocaleString().padStart(9)}\n\n` +
    `FILES (opening block differs per file; shared sections are byte-identical across them)\n` +
    emitted.map((e) => `  ${e.file.padEnd(28)} ${e.bytes.toLocaleString().padStart(9)} bytes  ${e.lines.toLocaleString().padStart(6)} lines`).join('\n') +
    '\n',
);

console.log(
  `adversarial-pass-input OK — ${ledger.length} ledger + ${provenance.length} provenance in A · ${DEEP.length} in B (+${DROPPED_BULK.length} appendix) · ` +
    `${STRONG.length} strong absences, ${existenceHits.length} existence claims, ${correctionFields.length} correction fields in E\n` +
    emitted.map((e) => `  ${e.file.padEnd(28)} ${e.bytes.toLocaleString().padStart(9)} bytes  ${e.lines.toLocaleString().padStart(6)} lines`).join('\n') +
    `\n  section byte sum ${sectionSum.toLocaleString()} -> review/pass-sizes.txt`,
);
