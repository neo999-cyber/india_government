/**
 * Cross-reference and instrument-rule checks that JSON Schema cannot express.
 * Every rule cites the CLAUDE.md clause it enforces.
 *
 * @typedef {{ layer: string, file: string, index: number|null, record: any, incoming: boolean }} LoadedRecord
 * @typedef {{ level: 'error'|'warn', rule: string, file: string, where: string, message: string }} Finding
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { sweepRecord } from './charset.mjs';

/**
 * The reasonKind values, read from the schema rather than restated here.
 *
 * They were hardcoded in the rule's own error message, which is how a list drifts: the
 * schema gains or loses a value and the message keeps naming the old set, so the gate tells
 * an author to pick from a menu that no longer exists. The schema is the contract; the
 * message quotes it.
 */
const SCHEMAS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'schemas');
const REASON_KINDS = JSON.parse(readFileSync(join(SCHEMAS_DIR, 'ledger.schema.json'), 'utf8'))
  .properties.unmeasured.items.properties.reasonKind.enum;

/**
 * Each layer's id contract, read from its own schema rather than restated.
 *
 * Same discipline as REASON_KINDS above and for the same reason: a list hardcoded here drifts
 * from the schema silently, and these are the patterns `ref-layer` and `ref-malformed` judge
 * references against.
 */
const ID_PATTERNS = Object.fromEntries(
  ['series', 'ledger', 'provenance', 'pairs'].map((layer) => [
    layer,
    new RegExp(JSON.parse(readFileSync(join(SCHEMAS_DIR, `${layer}.schema.json`), 'utf8')).properties.id.pattern),
  ]),
);

/**
 * The lens values, read from the schema, and the one of them that may never be a subject.
 *
 * `lenses[]` exists because `domain` is single-valued and "substantive subject plus lens" is two
 * axes. It was the fourth instance of the same defect — after the fifth reasonKind, the
 * "cannot conclude" assessment value and differentFactsNote on false — and it bit hardest here:
 * all fifteen phase-11 series and all seven pairs are substantively about Jammu and Kashmir and
 * not one could carry the tag, so a reader filtering on `kashmir` found no measured spine.
 *
 * LENS_VALUES derives, as REASON_KINDS and ID_PATTERNS above do. SUBJECT_FORBIDDEN does NOT, and
 * that is deliberate: the distinction lives in the domain enum's own prose — kashmir is "a
 * cross-cutting lens, applied to records whose primary subject sits elsewhere" while federalism is
 * "Centre-state relations. Also a lens" — and parsing an English sentence for it would be a worse
 * contract than restating it here with the sentence quoted. Same call as `absenceIndex` being
 * declared rather than derived: it is a contract fact, not an observable one.
 */
const LENS_VALUES = JSON.parse(readFileSync(join(SCHEMAS_DIR, 'series.schema.json'), 'utf8'))
  .properties.lenses.items.enum;
const SUBJECT_FORBIDDEN = new Set(['kashmir']);

// A restated list drifts; this one is restated for the reason above, so it says so out loud. If a
// forbidden value leaves the enum, `lens-as-subject` stops firing and nothing else notices — the
// rule would still be in MUST_FIRE and would still pass on a fixture that no longer validates as
// a lens at all. Fail at load instead of going quietly dead.
for (const v of SUBJECT_FORBIDDEN) {
  if (!LENS_VALUES.includes(v)) {
    throw new Error(
      `SUBJECT_FORBIDDEN names "${v}", which is no longer in the lenses enum [${LENS_VALUES.join(', ')}]. ` +
      `Either the enum changed and this list did not, or the value moved — resolve it deliberately: ` +
      `lens-as-subject is unenforceable until this agrees with the schema`,
    );
  }
}

/**
 * The assessment values that presuppose an objective, read from the schema's own definitions.
 *
 * Four of the eight say "the objective stated at announcement" in their own text — worked,
 * partly, failed — and too-early says "has not run long enough for its stated objective to be
 * testable". On a record where nothing was ever claimed, all four assert an objective the record
 * does not contain. That is the condition that produced fourteen wrong scores, and nothing checked
 * it: `worked` on a foodgrain trend whose own caseAgainst says the gains were area and weather;
 * `failed` on a groundwater record whose own caseFor says the only stated objective was ACHIEVED
 * and the depletion is its consequence; `too-early` on a foreign government's tariff.
 *
 * `reversed` is not here — it presupposes an enacting authority and a measure, not an objective,
 * and its own text already polices that. `contested`, `no-objective` and `baseline-context`
 * presuppose nothing.
 *
 * DERIVED, not restated: the set is the values whose written definition contains the phrase. If a
 * definition is reworded, the set follows it, and if the phrase disappears from all of them the
 * guard below fails loudly rather than silently policing nothing.
 */
const ASSESSMENT_DEFS = JSON.parse(readFileSync(join(SCHEMAS_DIR, 'ledger.schema.json'), 'utf8'))
  .properties.assessment;
const OBJECTIVE_PRESUPPOSED = ASSESSMENT_DEFS.enum.filter((v) => {
  const line = ASSESSMENT_DEFS.description.split('\n').find((l) => l.startsWith(`- ${v}:`)) ?? '';
  return /stated (at announcement|objective)|its stated objective/.test(line) && !line.includes('no objective was stated');
});
if (OBJECTIVE_PRESUPPOSED.length === 0) {
  throw new Error(
    'No assessment value\'s written definition mentions a stated objective any more. Either the ' +
    'definitions were reworded and this derivation no longer matches them, or the axis was removed ' +
    'deliberately — resolve it: objective-required is unenforceable until this finds something',
  );
}

const FY_RE = /^FY(\d{4})-(\d{2})$/;
const CY_RE = /^\d{4}$/;

/** Term windows, inclusive of start month. `baseline` = everything before T1. */
const TERM_WINDOWS = {
  T1: { start: '2014-05', end: '2019-05' },
  T2: { start: '2019-05', end: '2024-06' },
  T3: { start: '2024-06', end: null },
};

/**
 * Regime groups: an indicator carried on incompatible bases, where no member may be
 * presented alone (CLAUDE.md rule 5). Listed oldest base first — the order is the
 * rendering order, and lib/rules.ts carries the same list for the site.
 */
const REGIME_GROUPS = [
  ['gdp-growth-old-base', 'gdp-growth-new-base', 'gdp-growth-2022-base'],
];

/**
 * Minimum length of `why` on an absence whose stated reason is disputed.
 *
 * A proxy for substance, not a reading of it. The bare stated reason in the only real case
 * ("The Labour Ministry told Parliament that no such data is maintained.") is about 70
 * characters; a claim plus the evidence contradicting it cannot be materially shorter than
 * roughly double that. Tune it if a legitimate case lands under the floor — it exists to stop
 * the flag being set with nothing behind it, not to grade prose.
 */
const DISPUTE_WHY_FLOOR = 160;

/**
 * The contested-index dispute for *governance* indices (RSF, Freedom House, V-Dem).
 *
 * Kept for reference, but rule 6 is no longer checked by naming it. See the T5 rule below:
 * a contested index must carry a dispute record covering its own domain, and which record
 * that is depends on the index.
 */
const CONTESTED_INDEX_DISPUTE = 'P-08';

/**
 * A rebasing that restates the LEVEL of nominal GDP moves every ratio-to-GDP without any
 * change in underlying activity. Series on these units that are exposed to the revision
 * must say so; ones that look exposed but carry no such record get queried.
 */
const DENOMINATOR_REVISIONS = [{ provenance: 'P-10', date: '2026-02-27' }];
const RATIO_TO_GDP_UNITS = new Set(['% of GDP']);

/**
 * The denominator dispute, and what counts as a rate for it.
 *
 * `expressesRate` is deliberately unit-based rather than clever: a unit that is a percentage
 * or names a rate is a rate. Counts are not, which is why ed-pmla-cases-registered and
 * ed-pmla-convictions do not trip the rule even though both carry P-52 — a count carries its
 * own meaning, and the denominator on those is context rather than a base.
 */
const DENOMINATOR_DISPUTE = 'P-52';
const RATE_UNIT_RE = /^(%|per ?cent|percent|percentage)\b|\brate\b|\bper ?cent\b/i;
function expressesRate(series) {
  return typeof series.unit === 'string' && RATE_UNIT_RE.test(series.unit.trim());
}

/**
 * Banking rules, mirroring lib/npa.ts for the site. The two must stay in step.
 * P-18: every NPA series states its reporting basis, because the unlabelled case is the
 * trap. P-17: an NPA ratio carrying the write-off dispute needs a denominator series
 * before the adjusted view can be drawn at all.
 */
const BASIS_DISPUTE = 'P-18';
const WRITE_OFF_DISPUTE = 'P-17';
const ADVANCES_SERIES = 'scb-gross-advances';
const NPA_AMOUNT_SERIES = 'scb-gross-npa-amount';

/** Earliest mention wins, as in lib/npa.ts. */
function basisOf(series) {
  const find = (text) => {
    const g = text.search(/global operations/i);
    const d = text.search(/domestic operations/i);
    if (g === -1 && d === -1) return null;
    if (g === -1) return 'domestic';
    if (d === -1) return 'global';
    return g < d ? 'global' : 'domestic';
  };
  return find(series.title ?? '') ?? find(series.notes ?? '');
}

/**
 * Sortable numeric key for a period on either calendar. FY2013-14 -> 2013, "2014" -> 2014.
 * @param {string} period
 * @returns {number|null}
 */
export function periodKey(period) {
  const fy = FY_RE.exec(period);
  if (fy) return Number(fy[1]);
  if (CY_RE.test(period)) return Number(period);
  return null;
}

/**
 * @param {string} period
 * @param {'FY'|'CY'} calendar
 * @returns {string|null} error message, or null if well-formed for this calendar
 */
function checkPeriodForm(period, calendar) {
  const fy = FY_RE.exec(period);
  if (calendar === 'FY') {
    if (!fy) return `period "${period}" is not fiscal-year form (FYyyyy-yy) but the series calendar is FY — never mix calendars within one series`;
    const start = Number(fy[1]);
    const expected = String((start + 1) % 100).padStart(2, '0');
    if (fy[2] !== expected) return `period "${period}" is not a consecutive fiscal year (expected FY${start}-${expected})`;
    return null;
  }
  if (!CY_RE.test(period)) {
    return `period "${period}" is not calendar-year form (yyyy) but the series calendar is CY — never mix calendars within one series`;
  }
  return null;
}

/** @param {string} date YYYY-MM or YYYY-MM-DD @returns {string} YYYY-MM */
const yearMonth = (date) => date.slice(0, 7);

/**
 * The period containing a wall-clock date on a given calendar. Indian fiscal years run
 * April to March, so 2026-02-27 falls in FY2025-26.
 * @param {string} date YYYY-MM-DD
 * @param {'FY'|'CY'} calendar
 * @returns {string}
 */
export function periodContaining(date, calendar) {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(5, 7));
  if (calendar === 'CY') return String(year);
  const startYear = month >= 4 ? year : year - 1;
  return `FY${startYear}-${String((startYear + 1) % 100).padStart(2, '0')}`;
}

/**
 * @param {LoadedRecord[]} records
 * @param {{ today: string }} opts
 * @returns {{ findings: Finding[], counts: Record<string, number> }}
 */
export function checkIntegrity(records, { today }) {
  /** @type {Finding[]} */
  const findings = [];
  const add = (level, rule, file, where, message) => findings.push({ level, rule, file, where, message });

  const byLayer = { series: [], ledger: [], provenance: [], pairs: [] };
  for (const r of records) byLayer[r.layer]?.push(r);

  // Character sweep: every string in every record, whatever the layer.
  for (const r of records) {
    const where = r.record?.id ? String(r.record.id) : `record${r.index === null ? '' : ` [${r.index}]`}`;
    for (const f of sweepRecord(r.record)) {
      add(f.level, f.rule, r.file, `${where} ${f.where}`, f.message);
    }
  }

  const label = (r) => {
    const id = r.record?.id;
    const pos = r.index === null ? '' : `[${r.index}]`;
    return id ? `${id}${pos ? ` ${pos}` : ''}` : `record ${pos || '(single)'}`;
  };

  // --- id uniqueness within each layer -------------------------------------
  /** @type {Record<string, Map<string, LoadedRecord>>} */
  const index = { series: new Map(), ledger: new Map(), provenance: new Map(), pairs: new Map() };
  for (const layer of ['series', 'ledger', 'provenance', 'pairs']) {
    for (const r of byLayer[layer]) {
      const id = r.record?.id;
      if (typeof id !== 'string') continue; // schema already reported it
      const seen = index[layer].get(id);
      if (seen) {
        add('error', 'id-unique', r.file, label(r), `duplicate ${layer} id "${id}" — also in ${seen.file}${seen.index === null ? '' : ` [${seen.index}]`}`);
        continue;
      }
      index[layer].set(id, r);
    }
  }

  const seriesIds = index.series;
  const provenanceIds = index.provenance;

  /**
   * A reference must be relevant, not merely resolvable.
   *
   * `psb-gross-npa` — a banking series — carried its AQR break pointing at P-06, which
   * covers off-budget fiscal accounting. It validated for two phases because the id
   * resolved and nothing asked whether it resolved to anything related. A dispute record
   * that does not cover the series' own domain cannot be explaining that series' break.
   *
   * @param {LoadedRecord} r the referring record
   * @param {unknown} refs
   * @param {string[]} domains domains of the referring record
   * @param {string} field for the message, e.g. `provenanceRefs` or `breaks[0].provenanceRef`
   * @param {number|null} atIndex index within `refs`, or null when `refs` is a single ref
   */
  const checkRelevance = (r, refs, domains, field, atIndex = undefined) => {
    const list = Array.isArray(refs) ? refs : [refs];
    list.forEach((ref, i) => {
      if (typeof ref !== 'string') return;
      const target = provenanceIds.get(ref);
      if (!target) return; // ref-resolves already reported it
      const covers = Array.isArray(target.record.affectsDomains) ? target.record.affectsDomains : [];
      if (covers.includes('all')) return;
      if (domains.some((d) => covers.includes(d))) return;
      const at = atIndex === undefined && Array.isArray(refs) ? `${field}[${i}]` : field;
      add(
        'error',
        'ref-relevant',
        r.file,
        label(r),
        `${at} = "${ref}" resolves, but ${ref} covers [${covers.join(', ')}] and this record is [${domains.join(', ')}]. A dispute record that does not cover the domain cannot be the provenance for it`,
      );
    });
  };

  /**
   * @param {LoadedRecord} r
   * @param {unknown} refs
   * @param {Map<string, LoadedRecord>} target
   * @param {string} field
   * @param {string} kind
   */
  const resolveRefs = (r, refs, target, field, kind) => {
    if (!Array.isArray(refs)) return;
    refs.forEach((ref, i) => {
      if (typeof ref !== 'string') return;
      if (classifyRef(r, ref, kind, `${field}[${i}]`)) return; // wrong layer or malformed, already reported
      if (!target.has(ref)) {
        add('error', 'ref-resolves', r.file, label(r), `${field}[${i}] = "${ref}" does not resolve to any ${kind} record`);
      }
    });
  };

  /**
   * Two failures `ref-resolves` cannot tell apart, and the schema reports only as a pattern
   * mismatch. From 2026-08-02 every reference field declares its target layer's id pattern, so
   * ajv rejects both — but "must match pattern ^[a-z0-9]+(-[a-z0-9]+)*$" does not tell an author
   * what went wrong. These name it.
   *
   *   ref-layer     — the id is well-formed, for the WRONG layer. `P-59` in a seriesRefs field is
   *                   not a typo; it is a reference to the wrong kind of thing, and it would read
   *                   as merely "does not resolve" if left to ref-resolves.
   *   ref-malformed — the id matches no layer's contract at all.
   *
   * Both derive their patterns from the schemas, so they cannot drift from the contract they
   * enforce. Returns true when it has reported, so the caller stops rather than piling on.
   */
  const classifyRef = (r, ref, kind, field) => {
    const layers = Object.keys(ID_PATTERNS);
    const matches = layers.filter((l) => ID_PATTERNS[l].test(ref));
    if (matches.includes(kind)) return false;
    if (matches.length > 0) {
      add('error', 'ref-layer', r.file, label(r),
        `${field} = "${ref}" is a well-formed ${matches.join('/')} id in a field that must hold a ${kind} id. ` +
        `A reference to the wrong layer is not a dangling reference — it points at the wrong kind of thing`);
      return true;
    }
    add('error', 'ref-malformed', r.file, label(r),
      `${field} = "${ref}" matches no layer's id contract (${layers.map((l) => `${l} ${ID_PATTERNS[l].source}`).join(', ')})`);
    return true;
  };

  /**
   * The two ways an author can collapse the subject axis into the lens axis.
   *
   * Two rules and two names, not one, because they are two different mistakes and the message
   * has to say which one was made. Folding them into a single "lens misuse" error is how a gate
   * stops telling an author what to do about it.
   *
   *   lens-as-subject — a subject-forbidden lens in `domain`. Unconditional: kashmir's own
   *                     definition places the primary subject elsewhere, so a record filing it as
   *                     its subject files no subject at all. There is nothing to weigh.
   *   lens-duplicated — the same value on both axes of one record. Only federalism can reach
   *                     this, because it is the one value that is legitimately both, and either
   *                     axis alone is correct. Asserting both says the subject is a lens over
   *                     itself.
   *
   * Series and pairs only. `domains[]` on the ledger is already multi-valued, so subject and lens
   * coexist there without either being displaced — see the verification log for the three baseline
   * records that carry a lens as their SOLE domain, which is a different defect and not this one.
   *
   * @param {LoadedRecord} r
   * @param {string} where
   */
  const checkLensAxis = (r, where) => {
    const domain = r.record.domain;
    const lenses = Array.isArray(r.record.lenses) ? r.record.lenses : [];
    if (typeof domain !== 'string') return; // schema already reported it

    if (SUBJECT_FORBIDDEN.has(domain)) {
      add('error', 'lens-as-subject', r.file, where,
        `domain = "${domain}" is a lens, not a subject. The domain enum defines it as a cross-cutting lens ` +
        `"applied to records whose primary subject sits elsewhere", so a record filing it as its own subject ` +
        `files no subject at all. Put the substantive subject in domain and "${domain}" in lenses[]`);
    }

    if (lenses.includes(domain) && !SUBJECT_FORBIDDEN.has(domain)) {
      add('error', 'lens-duplicated', r.file, where,
        `"${domain}" is in both domain and lenses[]. Either alone is legal — it is the one value that is both a ` +
        `subject and a lens — but asserting it on both axes says the record's subject is a lens over itself. ` +
        `Keep it as domain if it IS the subject, as lenses[] if the subject is elsewhere`);
    }
  };

  // --- series --------------------------------------------------------------
  for (const r of byLayer.series) {
    const s = r.record;
    if (!s || typeof s !== 'object') continue;
    const where = label(r);

    resolveRefs(r, s.provenanceRefs, provenanceIds, 'provenanceRefs', 'provenance');
    // Relevance is judged on the SUBJECT alone. A lens is not a domain a dispute record can be
    // said to cover, and widening this to lenses[] would let any J&K dispute vouch for any
    // J&K-lensed series regardless of what it measures — loosening an error rule as a side
    // effect of adding a field.
    if (typeof s.domain === 'string') checkRelevance(r, s.provenanceRefs, [s.domain], 'provenanceRefs');
    checkLensAxis(r, where);

    const calendar = s.calendar === 'CY' ? 'CY' : 'FY';

    // Point-level: calendar discipline + one value per (country, period).
    /** @type {Map<string, number>} */
    const seenPoints = new Map();
    if (Array.isArray(s.points)) {
      s.points.forEach((p, i) => {
        if (!p || typeof p !== 'object') return;
        if (typeof p.period === 'string') {
          const problem = checkPeriodForm(p.period, calendar);
          if (problem) add('error', 'calendar-discipline', r.file, where, `points[${i}]: ${problem}`);
        }
        const key = `${p.country}|${p.period}`;
        if (seenPoints.has(key)) {
          add('error', 'point-unique', r.file, where, `points[${i}]: duplicate observation for ${p.country} ${p.period} (also points[${seenPoints.get(key)}]) — a series carries one value per country-period`);
        } else {
          seenPoints.set(key, i);
        }
        if (p.status === 'pending' && !p.note) {
          add('warn', 'pending-note', r.file, where, `points[${i}]: pending placeholder carries no note — say what it is standing in for`);
        }
      });
    }

    // Breaks: never splice across a break (rule 2) — each break must name its dispute record.
    const keys = Array.isArray(s.points)
      ? s.points.map((p) => periodKey(p?.period ?? '')).filter((k) => k !== null)
      : [];
    if (Array.isArray(s.breaks)) {
      s.breaks.forEach((b, i) => {
        if (!b || typeof b !== 'object') return;
        if (typeof b.provenanceRef === 'string'
            && !classifyRef(r, b.provenanceRef, 'provenance', `breaks[${i}].provenanceRef`)
            && !provenanceIds.has(b.provenanceRef)) {
          add('error', 'ref-resolves', r.file, where, `breaks[${i}].provenanceRef = "${b.provenanceRef}" does not resolve to any provenance record`);
        }
        if (typeof s.domain === 'string') {
          checkRelevance(r, b.provenanceRef, [s.domain], `breaks[${i}].provenanceRef`, i);
        }
        if (typeof b.period === 'string') {
          const problem = checkPeriodForm(b.period, calendar);
          if (problem) add('error', 'calendar-discipline', r.file, where, `breaks[${i}]: ${problem}`);
          const k = periodKey(b.period);
          if (k !== null && keys.length > 0 && (k < Math.min(...keys) || k > Math.max(...keys))) {
            add('warn', 'break-span', r.file, where, `breaks[${i}] at ${b.period} falls outside the observed span (${Math.min(...keys)}–${Math.max(...keys)}) — fine for a documented-ahead transition, otherwise check the period`);
          }
        }
      });
    }

    // Rule 6: contested indices always carry their dispute link.
    //
    // The dispute must cover the series' own domain — the same test checkRelevance applies.
    // This rule used to name P-08 specifically, which was right while every T5 series was a
    // governance index. It stopped being right the moment a contested index arrived from
    // another domain: ghi-score is human-development and carries P-29 (the GHI methodology
    // dispute), and P-08 is governance-only, so demanding P-08 demanded a reference that
    // ref-relevant forbids in the same run. No data could satisfy both rules at once, and
    // satisfying this one literally would have pointed readers of a hunger index at a record
    // about press-freedom rankings. What rule 6 protects is that a contested number never
    // renders without its dispute, not that one particular record is cited.
    if (s.tier === 'T5') {
      const refs = Array.isArray(s.provenanceRefs) ? s.provenanceRefs : [];
      const covering = refs.filter((ref) => {
        const target = provenanceIds.get(ref);
        if (!target) return false; // ref-resolves reports the dangling ref separately
        const covers = Array.isArray(target.record.affectsDomains) ? target.record.affectsDomains : [];
        return covers.includes('all') || covers.includes(s.domain);
      });
      if (covering.length === 0) {
        add('error', 't5-dispute-link', r.file, where, `tier T5 (contested index) must carry a dispute record covering its own domain "${s.domain}" in provenanceRefs, so the contested number cannot render without the dispute. Carries [${refs.join(', ') || 'none'}]`);
      }
    }

    // Rule 7 / P-09: peer-panel values carry a recorded vintage. A verified peer value
    // without one cannot be reproduced, so that is an error; approx/pending is a warning.
    const countries = new Set((Array.isArray(s.points) ? s.points : []).map((p) => p?.country).filter(Boolean));
    const isPanel = countries.size > 1 || (countries.size === 1 && !countries.has('IND'));
    if (isPanel && !s.source?.vintage) {
      const anyVerified = (Array.isArray(s.points) ? s.points : []).some((p) => p?.status === 'verified');
      add(
        anyVerified ? 'error' : 'warn',
        'panel-vintage',
        r.file,
        where,
        `peer-panel series has no source.vintage (P-09 vintage discipline)${anyVerified ? ' and carries verified points — a verified panel value must record the pull date' : ' — record the pull date before any point is marked verified'}`,
      );
    }

    if (s.source?.vintage && s.source.vintage > today) {
      add('warn', 'future-date', r.file, where, `source.vintage ${s.source.vintage} is in the future (today ${today})`);
    }

    // P-18: a series carrying the basis dispute must state which basis it is on. An
    // unlabelled NPA figure is the trap, not a minor omission.
    const seriesRefs = Array.isArray(s.provenanceRefs) ? s.provenanceRefs : [];
    if (seriesRefs.includes(BASIS_DISPUTE) && !basisOf(s)) {
      add('warn', 'npa-basis', r.file, where, `carries ${BASIS_DISPUTE} but states no reporting basis in its title or notes, so it renders as "basis not stated" and cannot share an axis with any other NPA series. Say "domestic operations" or "global operations" in the title or notes`);
    }

    // P-17: the write-off adjustment needs a denominator. Without it the adjusted view is
    // blocked in the UI rather than estimated, and this says why.
    if (seriesRefs.includes(WRITE_OFF_DISPUTE) && (s.unit ?? '').trim() === '% of advances') {
      const missing = [ADVANCES_SERIES, NPA_AMOUNT_SERIES].filter((id) => !seriesIds.has(id));
      if (missing.length > 0) {
        add('warn', 'npa-adjustment', r.file, where, `carries ${WRITE_OFF_DISPUTE}, which defines the adjusted view as (gross NPAs + cumulative write-offs) / gross advances, but ${missing.map((id) => `"${id}"`).join(' and ')} ${missing.length === 1 ? 'is' : 'are'} not in /data. The adjusted view renders as unavailable until ${missing.length === 1 ? 'it lands' : 'they land'} — nothing is estimated in its place`);
      }
    }

    // A ratio-to-GDP series whose span crosses a denominator revision either declares that
    // revision or gets queried. Silence here renders a step change as if it were activity.
    if (RATIO_TO_GDP_UNITS.has((s.unit ?? '').trim()) && keys.length > 0) {
      const refs = Array.isArray(s.provenanceRefs) ? s.provenanceRefs : [];
      for (const rev of DENOMINATOR_REVISIONS) {
        const revKey = periodKey(periodContaining(rev.date, calendar));
        const crosses = revKey !== null && revKey >= Math.min(...keys) && revKey <= Math.max(...keys);
        if (crosses && !refs.includes(rev.provenance)) {
          add('warn', 'denominator-break', r.file, where, `unit is "${s.unit}" and the span crosses the ${rev.date} denominator revision (${rev.provenance}), but the series does not carry ${rev.provenance}. Either the ratio rests on the restated denominator — in which case link it, so the step change renders — or it is computed on a different denominator, which is worth stating in notes`);
        }
      }
    }
  }

  // Rule 5: all regimes always — no base may stand alone.
  for (const group of REGIME_GROUPS) {
    const present = group.filter((id) => seriesIds.has(id));
    if (present.length > 0 && present.length < group.length) {
      const missing = group.filter((id) => !seriesIds.has(id));
      const host = seriesIds.get(present[0]);
      add('error', 'regime-group', host.file, present[0], `regime group incomplete: "${missing.join('", "')}" absent. No base may be presented alone as "GDP growth" — the group carries ${group.length} regimes`);
    }
  }

  // --- pairs (data/pairs.json, the fourth layer) ----------------------------
  //
  // Which series pair with which, which side is which, and what each side is called are
  // research judgements and live in the data now. What the gate still owns is that the
  // declarations resolve: a pair naming something absent renders half a finding, and half
  // of this finding is the wrong half — the coverage figure alone says the opposite of what
  // the pair was assembled to show.
  for (const r of byLayer.pairs) {
    const pair = r.record;
    if (!pair || typeof pair !== 'object') continue;
    const where = label(r);

    checkLensAxis(r, where);

    for (const name of ['a', 'b']) {
      const side = pair[name];
      if (!side || typeof side !== 'object') continue;

      // Exactly one source. Two would make the rendered side ambiguous; none leaves the
      // column empty with a label promising something in it.
      const sources = ['series', 'absenceFrom', 'competingAccountsFrom'].filter(
        (k) => typeof side[k] === 'string' && side[k].trim(),
      );
      // A declared-pending pair is recorded as OWED: the judgement that these two things
      // belong side by side has been made, and at least one side is not yet authored. It
      // renders nowhere, so a sideless side is the point rather than a fault. Two sources
      // is still wrong even when pending.
      const pending = pair.status === 'declared-pending';
      if (pending && sources.length === 0) continue;
      if (sources.length !== 1) {
        add('error', 'pair-side', r.file, where, `side ${name} sets ${sources.length === 0 ? 'none' : sources.length} of series / absenceFrom / competingAccountsFrom (${sources.join(', ') || 'none'}). Exactly one must be set: two make the side ambiguous, none leaves a labelled column with nothing in it`);
        continue;
      }

      if (side.series && !seriesIds.has(side.series)) {
        add('error', 'pair-side', r.file, where, `side ${name} names series "${side.series}", which is not in /data. The pair would render one side against nothing`);
      }

      if (side.absenceFrom) {
        const host = seriesIds.get(side.absenceFrom) ?? index.ledger.get(side.absenceFrom);
        if (!host) {
          add('error', 'pair-side', r.file, where, `side ${name} takes its absence from "${side.absenceFrom}", which is in neither the series nor the ledger layer`);
        } else {
          const declared = Array.isArray(host.record.unmeasured) ? host.record.unmeasured : [];
          const i = Number.isInteger(side.absenceIndex) ? side.absenceIndex : 0;
          if (declared.length === 0) {
            add('error', 'pair-side', r.file, where, `side ${name} stands on an absence declared by "${side.absenceFrom}", but that record declares no "unmeasured" entry. The column would render empty, stating neither a counterpart nor why there is none`);
          } else if (i >= declared.length) {
            add('error', 'pair-side', r.file, where, `side ${name} points at absenceIndex ${i} of "${side.absenceFrom}", which declares ${declared.length} (valid 0-${declared.length - 1}). An index out of range renders nothing where the counterpart belongs`);
          }
        }
      }

      if (side.competingAccountsFrom) {
        const host = provenanceIds.get(side.competingAccountsFrom);
        if (!host) {
          add('error', 'pair-side', r.file, where, `side ${name} takes competing accounts from "${side.competingAccountsFrom}", which is not in /data`);
        } else if (!Array.isArray(host.record.competingAccounts) || host.record.competingAccounts.length === 0) {
          add('error', 'pair-side', r.file, where, `side ${name} takes competing accounts from "${side.competingAccountsFrom}", but that record carries no competingAccounts. The column would render a heading over nothing`);
        }
      }
    }

    for (const ref of Array.isArray(pair.provenanceRefs) ? pair.provenanceRefs : []) {
      if (typeof ref === 'string' && !provenanceIds.has(ref)) {
        add('error', 'pair-side', r.file, where, `provenanceRefs names "${ref}", which is not in /data`);
      }
    }

    // Inversion, ported from the hardcoded list. The affects/corrective split cannot DERIVE
    // a pair — P-22 alone maps four affected series against five correctives with nothing
    // saying which goes with which — but where a record names both sides it can say they are
    // the right way up. A pair whose a-side a record calls the correction, and whose b-side
    // it calls distorted, is backwards: the view would present the honest metric as the
    // headline needing qualification, and the qualification as the headline.
    if (pair.kind === 'coverage-usage' && pair.a?.series && pair.b?.series) {
      for (const [pid, host] of provenanceIds) {
        const aff = Array.isArray(host.record.affectsSeries) ? host.record.affectsSeries : [];
        const cor = Array.isArray(host.record.correctiveSeries) ? host.record.correctiveSeries : [];
        if (cor.includes(pair.a.series) && aff.includes(pair.b.series)) {
          add('error', 'pair-inverted', r.file, where, `puts "${pair.a.series}" on side a and "${pair.b.series}" on side b, but ${pid} calls "${pair.a.series}" a corrective and "${pair.b.series}" affected. One of the two is the wrong way round`);
        }
      }
    }
  }

  // Rule 5, second half: where one regime ends and the next begins, both sides of the
  // handoff must be reachable. A regime that overlaps its successor is the normal case
  // while no spliced back-series exists; a gap between them is not.
  for (const group of REGIME_GROUPS) {
    const spans = group
      .map((id) => {
        const r = seriesIds.get(id);
        if (!r) return null;
        const ks = (Array.isArray(r.record.points) ? r.record.points : [])
          .map((p) => periodKey(p?.period ?? ''))
          .filter((k) => k !== null);
        return ks.length ? { id, file: r.file, first: Math.min(...ks), last: Math.max(...ks) } : null;
      })
      .filter(Boolean);

    for (let i = 0; i < spans.length - 1; i += 1) {
      const [a, b] = [spans[i], spans[i + 1]];
      if (b.first > a.last + 1) {
        add('error', 'regime-handoff', b.file, b.id, `regime gap: "${a.id}" ends at ${a.last} and "${b.id}" begins at ${b.first}, leaving ${a.last + 1}–${b.first - 1} on no regime at all`);
      }
    }
  }

  // --- ledger --------------------------------------------------------------
  for (const r of byLayer.ledger) {
    const l = r.record;
    if (!l || typeof l !== 'object') continue;
    const where = label(r);

    resolveRefs(r, l.seriesRefs, seriesIds, 'seriesRefs', 'series');
    resolveRefs(r, l.provenanceRefs, provenanceIds, 'provenanceRefs', 'provenance');
    if (Array.isArray(l.domains)) checkRelevance(r, l.provenanceRefs, l.domains, 'provenanceRefs');

    /**
     * A value that presupposes an objective needs one on the record.
     *
     * `claimAtLaunch` is the machine-readable form — its own description is "What the government
     * said this would achieve, WHERE APPLICABLE", and that "where applicable" is the concession
     * that made this possible: one field is optional because the objective may be absent while
     * `assessment` is required as though it never is.
     *
     * But an objective is not always a launch claim. Eight scored records take theirs from a
     * statute (RTE s26's ten per cent ceiling, s25's staffing norm), a court order (the Bhasin
     * directions), or a process's own object (appointment on merit). Those are real objectives and
     * no field holds them, so the rule accepts `assessmentNote` as the alternative — which is what
     * that field is FOR, per its own description: a note on the assessment VALUE itself. The effect
     * is that an objective which cannot be machine-read must be DECLARED rather than inferred by
     * whoever next reads the record.
     *
     * Deliberately not satisfied by `summary` or `caseFor` containing the word "target". Every one
     * of the fourteen wrong scores would have passed a keyword test — L-0071's caseFor names an
     * objective in terms, and it is an objective that was MET, by a policy the record is not about.
     */
    if (OBJECTIVE_PRESUPPOSED.includes(l.assessment) && !l.claimAtLaunch && !l.assessmentNote) {
      add('error', 'objective-required', r.file, where,
        `assessment "${l.assessment}" is defined against the objective stated at announcement, and this ` +
        `record states none: no claimAtLaunch, and no assessmentNote naming where the objective comes from. ` +
        `Either the record has an objective — put it in claimAtLaunch, or name its source (statute, court ` +
        `order, a process's own object) in assessmentNote — or it has none, and the value is wrong: a record ` +
        `that finds something real with nothing claimed to test it is "no-objective"`);
    }

    if (l.assessment === 'baseline-context' && l.term !== 'baseline') {
      add('error', 'baseline-context', r.file, where, `assessment "baseline-context" is for pre-May-2014 records only, but term is "${l.term}"`);
    }

    if (typeof l.date === 'string' && typeof l.term === 'string') {
      const ym = yearMonth(l.date);
      const win = TERM_WINDOWS[l.term];
      if (l.term === 'baseline') {
        if (ym >= TERM_WINDOWS.T1.start) {
          add('warn', 'term-window', r.file, where, `date ${l.date} is on or after ${TERM_WINDOWS.T1.start} but term is "baseline" — intentional only if this is carried as pre-2014 context`);
        }
      } else if (win) {
        if (ym < win.start || (win.end && ym >= win.end)) {
          add('warn', 'term-window', r.file, where, `date ${l.date} falls outside term ${l.term} (${win.start}–${win.end ?? 'open'})`);
        }
      }
    }

    if (typeof l.dateEnd === 'string' && typeof l.date === 'string' && l.dateEnd < l.date) {
      add('error', 'date-order', r.file, where, `dateEnd ${l.dateEnd} precedes date ${l.date}`);
    }

    if (typeof l.asOf === 'string' && l.asOf > today) {
      add('warn', 'future-date', r.file, where, `asOf ${l.asOf} is in the future (today ${today})`);
    }
  }

  // A rate carrying the denominator dispute must state its denominator (P-52).
  //
  // 0.25% and 93% are the same enforcement record measured two ways: cases initiated as the
  // base, or trials concluded. A rate rendered without its base is not a figure a reader can
  // use, and the two are quoted against each other in public argument precisely because the
  // base is left off. Null is not an exemption — it means the denominator is not established,
  // which is exactly the state this rule exists to surface.
  for (const r of byLayer.series) {
    const sr = r.record;
    if (!sr || typeof sr !== 'object') continue;
    const refs = Array.isArray(sr.provenanceRefs) ? sr.provenanceRefs : [];
    if (!refs.includes(DENOMINATOR_DISPUTE)) continue;
    if (!expressesRate(sr)) continue;
    if (typeof sr.denominator === 'string' && sr.denominator.trim()) continue;
    // The rule guards RENDERED rates. A series whose every point is pending with no figure
    // renders no rate at all, so there is nothing to mislabel — and firing here would push
    // toward inventing a base for a number that is not shown, which is the opposite of what
    // this exists to prevent. Withholding an undefendable figure is the correct response to
    // being caught by this rule; rendering it bare is not.
    const rendered = (Array.isArray(sr.points) ? sr.points : []).filter((pt) => pt && pt.value !== null);
    if (rendered.length === 0) continue;
    add('error', 'denominator-stated', r.file, label(r), `carries ${DENOMINATOR_DISPUTE} and renders ${rendered.length} rate value(s) (unit "${sr.unit}"), but states no denominator. A rate without its base is not usable: the same enforcement record reads 0.25% against cases initiated and 93% against trials concluded. Set "denominator" to the base this series actually uses, or establish which base the source used`);
  }

  // Blocking caveats (schema field as of phase 4b, on both series and ledger).
  //
  // Which records carry one is now the data's business, not a list in code — the schema
  // enforces the type and a minimum length. What the schema cannot see is the prose: a
  // caveat that says "See P-26" is making a reference, and the site renders those as links.
  // So every P-xx named inside a caveat must resolve, and must be one the record actually
  // claims — otherwise the caveat sends a reader to a dispute the record does not carry,
  // or to nothing at all. A dead pointer inside the one field that must never be misread.
  for (const layer of ['series', 'ledger']) {
    for (const r of byLayer[layer]) {
      const rec = r.record;
      if (!rec || typeof rec !== 'object' || typeof rec.caveat !== 'string') continue;
      const where = label(r);
      const cited = [...new Set(rec.caveat.match(/P-\d{2}/g) ?? [])];
      const refs = Array.isArray(rec.provenanceRefs) ? rec.provenanceRefs : [];
      const breakRefs = (Array.isArray(rec.breaks) ? rec.breaks : []).map((b) => b?.provenanceRef);
      for (const pid of cited) {
        if (!provenanceIds.has(pid)) {
          add('error', 'caveat-target', r.file, where, `caveat names "${pid}", which is not in /data. The caveat renders that reference as a link, and it would lead nowhere`);
        } else if (!refs.includes(pid) && !breakRefs.includes(pid)) {
          add('error', 'caveat-target', r.file, where, `caveat names "${pid}", but the record does not carry it in provenanceRefs or a break. The caveat would point a reader at a dispute the record itself does not claim`);
        }
      }
    }
  }

  // Declared absences (`unmeasured`, schema field on series and ledger as of phase 4d).
  //
  // There is deliberately NO rule here separating a real absence from ordinary sparsity.
  // The distinction is dimension-versus-period and the data model has nothing tying an
  // `unmeasured` entry to periods, so any check would have to read the prose — and the
  // obvious heuristic fails on the data that exists: two of the six declarations are
  // period-shaped ("Refill rates after December 2018", "Farmer household income after
  // 2018-19") and both are correct, because in each case no series continues at all rather
  // than merely lagging. A rule rejecting those would reject a third of the true positives.
  // Left to review, where the judgement actually lives.
  //
  // What IS clean: an absence with no identified route to closing. `wouldFill` doubles as
  // the verification queue, so an entry missing it drops out of that queue silently. Warn,
  // not error — some things are unmeasured precisely because no instrument for them exists.
  for (const layer of ['series', 'ledger']) {
    for (const r of byLayer[layer]) {
      const rec = r.record;
      if (!rec || typeof rec !== 'object' || !Array.isArray(rec.unmeasured)) continue;
      const where = label(r);
      rec.unmeasured.forEach((u, i) => {
        if (!u || typeof u !== 'object') return;
        const what = String(u.what).slice(0, 60);

        if (typeof u.wouldFill !== 'string' || !u.wouldFill.trim()) {
          /**
           * Severity is DERIVED from reasonKind, not chosen, because two of the four values
           * entail a route in their own written definitions:
           *   not-published — "exists in a holder's hands, not released. The test is
           *                    producibility under compulsion." If it is producible, something
           *                    produces it, and that something is what wouldFill names.
           *   withheld      — "requires an identifiable refusal, not merely absence of release."
           *                    A refusal has a holder and a request, both already known.
           * An absence on either value with no route contradicts the value it declares. That is
           * a defect in the record, not a property of the world, so it is an error.
           *
           * not-collected and never-defined stay warnings: for those, no route may exist, and
           * demanding one invites a placeholder. A placeholder route is worse than none — it
           * enters the verification queue and cannot be worked.
           */
          const ENTAILS_A_ROUTE = new Set(['not-published', 'withheld']);
          const entailed = ENTAILS_A_ROUTE.has(u.reasonKind);
          add(entailed ? 'error' : 'warn', 'unmeasured-route', r.file, where, entailed
            ? `unmeasured[${i}] ("${what}") is reasonKind "${u.reasonKind}" and names no wouldFill. That value asserts the data exists and is producible — ${u.reasonKind === 'withheld' ? 'withheld requires an identifiable refusal, so a holder and a request are already established' : 'not-published means producible under compulsion'} — so a route exists by the value's own definition and the record must name it: a holder and an instrument, not a placeholder`
            : `unmeasured[${i}] ("${what}") names no wouldFill, so it states an absence without a route to closing it and does not reach the verification queue. Fine when no instrument for it exists — worth saying so if that is the case`);
        }

        // Every absence says what KIND it is. The schema leaves reasonKind optional so a
        // drop is not rejected mid-authoring; this makes it mandatory at the gate, so a
        // future domain cannot file an absence without classifying it. "Not measured" alone
        // flattens a body declining to collect into a quantity nobody has got round to.
        if (!u.reasonKind) {
          add('error', 'reason-kind', r.file, where, `unmeasured[${i}] ("${what}") states no reasonKind. Every absence must say which kind it is — ${REASON_KINDS.slice(0, -1).join(', ')} or ${REASON_KINDS[REASON_KINDS.length - 1]} — because "not measured" alone reads the same for a quantity nobody has got round to and one a body has declined to keep`);
        }

        // A disputed stated reason has to carry its contradiction, not assert it.
        //
        // Two checks, and only the first is structural: if the stated reason is contradicted
        // because evidence indicates the data exists, then a route to that evidence exists by
        // definition, so wouldFill must name it. The second is a substance floor on `why` —
        // a claim AND its contradiction cannot be stated in the length of a bare claim. That
        // is a proxy for length, not a reading of meaning: it cannot confirm the contradiction
        // is really there, only that there is room for it. A reviewer still has to look.
        if (u.reasonDisputed === true) {
          // Warn, not error. This branch was added beyond what was asked for in phase 6b —
          // the requested rule was that the contradiction appear in `why`, which is the
          // length check below. A disputed absence with no route named is worth review, but
          // it is not malformed: the phase-9 drop authored two of them, correctly, with the
          // contradicting evidence set out in `why` and no separate source to name.
          if (typeof u.wouldFill !== 'string' || !u.wouldFill.trim()) {
            add('warn', 'absence-dispute', r.file, where, `unmeasured[${i}] ("${what}") sets reasonDisputed but names no wouldFill. The stated reason is contested because evidence indicates the data exists, so the route to that evidence is exactly what has to be named`);
          }
          const why = typeof u.why === 'string' ? u.why.trim() : '';
          if (why.length < DISPUTE_WHY_FLOOR) {
            add('error', 'absence-dispute', r.file, where, `unmeasured[${i}] ("${what}") sets reasonDisputed but "why" is ${why.length} characters, under the ${DISPUTE_WHY_FLOOR} needed to carry both a stated reason and the evidence contradicting it. The flag must not be asserted bare — state what was said, and what contradicts it`);
          }
        }
      });
    }
  }

  // --- provenance ----------------------------------------------------------
  for (const r of byLayer.provenance) {
    const p = r.record;
    if (!p || typeof p !== 'object') continue;
    const where = label(r);

    // `correctiveSeries` is the mirror of `affectsSeries`: the honest measure the record
    // points readers toward, or the instrument that measures the wedge it describes. A
    // series cannot be both distorted by a record and the correction for it.
    const affects = Array.isArray(p.affectsSeries) ? p.affectsSeries : [];
    const corrective = Array.isArray(p.correctiveSeries) ? p.correctiveSeries : [];
    for (const sid of affects) {
      if (typeof sid === 'string' && corrective.includes(sid)) {
        add('error', 'mirror-contradiction', r.file, where, `"${sid}" is in both affectsSeries and correctiveSeries. A series is either distorted by this record or the correction for it; being both says directionOfBias simultaneously does and does not apply to it`);
      }
    }

    // The backlink runs both ways for both lists. A corrective carries the ref for
    // navigation rather than because it is distorted, but it must still carry it: a reader
    // landing on the honest metric has to be able to reach the record saying why it is the
    // honest one, which is the whole reason the mirror exists.
    for (const [field, list] of [['affectsSeries', affects], ['correctiveSeries', corrective]]) {
      list.forEach((sid, i) => {
        if (typeof sid !== 'string') return;
        const series = seriesIds.get(sid);
        if (!series) {
          // Forward reference: research sessions name the series before it is ingested.
          add('warn', 'affects-series-pending', r.file, where, `${field}[${i}] = "${sid}" is not in /data yet — expected if the series has not been ingested`);
          return;
        }
        // A break's provenanceRef counts. A series whose only connection to a dispute is
        // the seam it caused is genuinely linked — the seam row renders the P-xx inline,
        // and provenanceForSeries surfaces it in the disputes list either way. Requiring a
        // duplicate top-level ref would push research toward recording the same link twice.
        const back = Array.isArray(series.record.provenanceRefs) ? series.record.provenanceRefs : [];
        const viaBreak = (Array.isArray(series.record.breaks) ? series.record.breaks : []).some(
          (b) => b && b.provenanceRef === p.id,
        );
        if (!back.includes(p.id) && !viaBreak) {
          add('error', 'back-link', series.file, sid, `${p.id} lists this series in ${field}, but the series carries "${p.id}" neither in provenanceRefs nor on a break. The link has to run both ways, or the record stops travelling with the number`);
        }
      });
    }

    if (p.bridgeExists === true && !p.bridgeNote) {
      add('warn', 'bridge-note', r.file, where, 'bridgeExists is true but no bridgeNote describes the reconciliation');
    }
  }

  const counts = {
    series: index.series.size,
    ledger: index.ledger.size,
    provenance: index.provenance.size,
    pairs: index.pairs.size,
    points: byLayer.series.reduce((n, r) => n + (Array.isArray(r.record?.points) ? r.record.points.length : 0), 0),
  };

  return { findings, counts };
}
