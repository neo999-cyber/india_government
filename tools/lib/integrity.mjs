/**
 * Cross-reference and instrument-rule checks that JSON Schema cannot express.
 * Every rule cites the CLAUDE.md clause it enforces.
 *
 * @typedef {{ layer: string, file: string, index: number|null, record: any, incoming: boolean }} LoadedRecord
 * @typedef {{ level: 'error'|'warn', rule: string, file: string, where: string, message: string }} Finding
 */
import { sweepRecord } from './charset.mjs';

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
 * Coverage/usage pairs (P-22), mirroring lib/rules.ts for the site. The two must stay in
 * step — this is the list the rendering rule is built on, and a pair that silently stops
 * resolving fails open, showing the unqualified coverage figure alone.
 *
 * The blocking-caveat list that used to sit beside this is gone: `caveat` became a schema
 * field in phase 4b, so which records carry one is data, not code.
 */
const COVERAGE_USAGE_PAIRS = [
  { scheme: 'Ujjwala (LPG)', coverage: 'ujjwala-connections', usage: 'ujjwala-refills', governing: 'P-22' },
  { scheme: 'Jal Jeevan Mission', coverage: 'jjm-tap-coverage', usage: 'jjm-functionality', governing: 'P-22' },
  { scheme: 'PM-JAY', coverage: 'pmjay-cards', usage: 'pmjay-admissions', governing: 'P-22' },
  { scheme: 'PMAY-G (rural housing)', coverage: 'pmay-g-houses', usage: 'pmay-g-completed', governing: 'P-22' },
  {
    scheme: 'Swachh Bharat (sanitation)',
    coverage: 'sanitation-basic',
    usage: null,
    usageFromProvenance: { record: 'P-24', holder: 'r.i.c.e. SQUAT panel 2018' },
    governing: 'P-22',
  },
];

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

  const byLayer = { series: [], ledger: [], provenance: [] };
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
  const index = { series: new Map(), ledger: new Map(), provenance: new Map() };
  for (const layer of ['series', 'ledger', 'provenance']) {
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
      if (!target.has(ref)) {
        add('error', 'ref-resolves', r.file, label(r), `${field}[${i}] = "${ref}" does not resolve to any ${kind} record`);
      }
    });
  };

  // --- series --------------------------------------------------------------
  for (const r of byLayer.series) {
    const s = r.record;
    if (!s || typeof s !== 'object') continue;
    const where = label(r);

    resolveRefs(r, s.provenanceRefs, provenanceIds, 'provenanceRefs', 'provenance');
    if (typeof s.domain === 'string') checkRelevance(r, s.provenanceRefs, [s.domain], 'provenanceRefs');

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
        if (typeof b.provenanceRef === 'string' && !provenanceIds.has(b.provenanceRef)) {
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

  // Rule 5b/P-22: a coverage figure never renders without the usage figure qualifying it.
  //
  // Mirrors COVERAGE_USAGE_PAIRS in lib/rules.ts; the two must stay in step. A half-present
  // pair is an error rather than a warning because the failure mode is silent and one-sided:
  // the site would render the coverage series alone, which reads as the scheme succeeding,
  // and that is the exact claim the pairing exists to qualify.
  // Fires only when part of a pair is present, exactly as the regime-group rule does: a
  // dataset that carries neither side simply does not have this pair (every fixture
  // directory is such a dataset), and erroring there would be noise, not a finding.
  for (const pair of COVERAGE_USAGE_PAIRS) {
    const coverage = seriesIds.get(pair.coverage);
    const usage = pair.usage ? seriesIds.get(pair.usage) : null;
    const host = coverage ?? usage;
    if (!host) continue;

    if (!coverage) {
      add('error', 'pair-incomplete', host.file, pair.usage, `carries the usage side of "${pair.scheme}", but its coverage counterpart "${pair.coverage}" is not in /data. Half a pair cannot state a gap`);
      continue;
    }
    if (pair.usage && !usage) {
      add('error', 'pair-incomplete', coverage.file, pair.coverage, `carries the coverage side of "${pair.scheme}", but its usage counterpart "${pair.usage}" is not in /data. P-22 forbids rendering the administrative figure alone: without the counterpart it reads as the outcome rather than as an upper bound on it`);
    }
    if (!pair.usage && !pair.usageFromProvenance) {
      add('error', 'pair-incomplete', coverage.file, pair.coverage, `coverage/usage pair "${pair.scheme}" declares neither a usage series nor a provenance counterpart, so the coverage figure would render alone`);
    }
    if (pair.usageFromProvenance && !provenanceIds.has(pair.usageFromProvenance.record)) {
      add('error', 'pair-incomplete', coverage.file, pair.coverage, `usage counterpart is held in "${pair.usageFromProvenance.record}", which is not in /data`);
    }
    if (!provenanceIds.has(pair.governing)) {
      add('error', 'pair-incomplete', coverage.file, pair.coverage, `governing record "${pair.governing}" is not in /data, so the pair cannot state why the gap runs one way`);
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
        if (typeof u.wouldFill !== 'string' || !u.wouldFill.trim()) {
          add('warn', 'unmeasured-route', r.file, where, `unmeasured[${i}] ("${String(u.what).slice(0, 60)}") names no wouldFill, so it states an absence without a route to closing it and does not reach the verification queue. Fine when no instrument for it exists — worth saying so if that is the case`);
        }
      });
    }
  }

  // --- provenance ----------------------------------------------------------
  for (const r of byLayer.provenance) {
    const p = r.record;
    if (!p || typeof p !== 'object') continue;
    const where = label(r);

    if (Array.isArray(p.affectsSeries)) {
      p.affectsSeries.forEach((sid, i) => {
        if (typeof sid !== 'string') return;
        const series = seriesIds.get(sid);
        if (!series) {
          // Forward reference: research sessions name the affected series before it is ingested.
          add('warn', 'affects-series-pending', r.file, where, `affectsSeries[${i}] = "${sid}" is not in /data yet — expected if the series has not been ingested`);
          return;
        }
        // Bidirectional: a series named by a dispute must link back, so the dispute
        // travels with every rendered number (rule 6).
        //
        // A break's provenanceRef counts. A series whose only connection to a dispute is
        // the seam it caused is genuinely linked — the seam row renders the P-xx inline,
        // and provenanceForSeries surfaces it in the disputes list either way. Requiring a
        // duplicate top-level ref would push research toward recording the same link twice.
        const back = Array.isArray(series.record.provenanceRefs) ? series.record.provenanceRefs : [];
        const viaBreak = (Array.isArray(series.record.breaks) ? series.record.breaks : []).some(
          (b) => b && b.provenanceRef === p.id,
        );
        if (!back.includes(p.id) && !viaBreak) {
          add('error', 'back-link', series.file, sid, `${p.id} lists this series in affectsSeries, but the series carries "${p.id}" neither in provenanceRefs nor on a break. The link has to run both ways, or the dispute stops travelling with the number`);
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
    points: byLayer.series.reduce((n, r) => n + (Array.isArray(r.record?.points) ? r.record.points.length : 0), 0),
  };

  return { findings, counts };
}
