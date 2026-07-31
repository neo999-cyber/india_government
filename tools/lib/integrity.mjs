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

/** Provenance record carrying the contested-index dispute (CLAUDE.md rule 6). */
const CONTESTED_INDEX_DISPUTE = 'P-08';

/**
 * A rebasing that restates the LEVEL of nominal GDP moves every ratio-to-GDP without any
 * change in underlying activity. Series on these units that are exposed to the revision
 * must say so; ones that look exposed but carry no such record get queried.
 */
const DENOMINATOR_REVISIONS = [{ provenance: 'P-10', date: '2026-02-27' }];
const RATIO_TO_GDP_UNITS = new Set(['% of GDP']);

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
    if (s.tier === 'T5') {
      const refs = Array.isArray(s.provenanceRefs) ? s.provenanceRefs : [];
      if (!refs.includes(CONTESTED_INDEX_DISPUTE)) {
        add('error', 't5-dispute-link', r.file, where, `tier T5 (contested index) must carry its dispute link ${CONTESTED_INDEX_DISPUTE} in provenanceRefs`);
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
        const back = Array.isArray(series.record.provenanceRefs) ? series.record.provenanceRefs : [];
        if (!back.includes(p.id)) {
          add('error', 'back-link', series.file, sid, `${p.id} lists this series in affectsSeries, but the series does not carry "${p.id}" in provenanceRefs`);
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
