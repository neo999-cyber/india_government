/**
 * HOW A NON-PROSE VALUE REACHES A READER — the declaration table the render gates assert against.
 *
 * WHY THIS FILE EXISTS. A prose field is its own needle: the string in `/data` is the string on the
 * page. A non-prose field is not. `assessment: "no-objective"` renders as *"No stated objective"*;
 * `reasonKind: "not-published"` renders as *"collected, not published"*; `bridgeExists: false`
 * renders as *"no bridge"*; a value of `264500000` renders as *"26,45,00,000"*. An audit that looks
 * for the raw token therefore reports a field invisible when it renders perfectly — which already
 * happened once, when a sweep claimed 96 invisible `reasonKind` values that were all on the page
 * under the view's own labels.
 *
 * So the audit cannot be written without saying, per field, what its value looks like when rendered.
 * That statement is here, in one place, and it is the thing a reviewer can argue with.
 *
 * THE LABELS ARE PARSED OUT OF THE MODULES THAT RENDER THEM, NEVER RETYPED HERE. Retyping is how a
 * control comes to assert a page the code no longer produces: two deployed-page checks have already
 * failed against pages that were rendering correctly, because a needle was written from memory of
 * the record rather than from the record. If a map cannot be parsed, this file THROWS — an anchor
 * that aborts, never one that shrugs.
 *
 * FOUR RENDERING KINDS:
 *   identity  the value appears verbatim (ids, refs, periods, URLs in an href)
 *   labels    a token renders as a label; EITHER form counts, because both are the value reaching
 *             a reader and a view is free to print the token
 *   phrase    a boolean or small enum renders as words that contain neither `true` nor the token
 *   number    a number renders through the instrument's own formatter
 *
 * A field with no entry here and no exemption in its schema description FAILS
 * `no-unguarded-prose-field`. There is no third state, which is the same structure the prose side
 * has had since the 226 invisible marks.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const src = (p) => readFileSync(join(ROOT, p), 'utf8');

/**
 * Pull a `Record<K, string>` literal out of a TypeScript module.
 *
 * Deliberately strict and deliberately loud. A map that has moved, been renamed or switched to a
 * computed form must stop the gate, because the alternative is an audit quietly checking against
 * labels the site stopped using.
 */
function labelMap(file, name) {
  const text = src(file);
  const m = text.match(new RegExp(`export const ${name}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`));
  if (!m) throw new Error(`value-renderings: ${name} not found in ${file} — the label map moved, renamed or changed shape`);
  const out = {};
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^\s*'?([A-Za-z0-9_-]+)'?\s*:\s*'((?:[^'\\]|\\.)*)'/);
    if (mm) out[mm[1]] = mm[2].replace(/\\'/g, "'");
  }
  if (Object.keys(out).length === 0) throw new Error(`value-renderings: ${name} in ${file} parsed to an empty map`);
  return out;
}

const FORMAT = 'lib/format.ts';
const MARKS = 'components/marks.tsx';

const ASSESSMENT = labelMap(FORMAT, 'ASSESSMENT_LABELS');
const TIER = labelMap(FORMAT, 'TIER_LABELS');
const TERM = labelMap(FORMAT, 'TERM_LABELS');
const DOMAIN = labelMap(FORMAT, 'DOMAIN_LABELS');
const LENS = labelMap(FORMAT, 'LENS_LABELS');
const COUNTRY = labelMap(FORMAT, 'COUNTRY_LABELS');
const CONTESTED_GROUND = labelMap(FORMAT, 'CONTESTED_GROUND_LABELS');
const OBJ_MEASUREMENT = labelMap(FORMAT, 'OBJECTIVE_MEASUREMENT_LABELS');
const COMMITMENT_STATE = labelMap(FORMAT, 'COMMITMENT_STATE_LABELS');
const INDEPENDENCE = labelMap(FORMAT, 'INDEPENDENCE_LABELS');
const REASON_KIND = labelMap(MARKS, 'REASON_KIND_LABELS');
const DISPUTE_KIND = labelMap(MARKS, 'DISPUTE_KIND_LABELS');
const EXPOSURE_ROLE = labelMap(MARKS, 'EXPOSURE_ROLE_LABELS');
const EXPOSURE_ADJ = labelMap(MARKS, 'EXPOSURE_ADJUDICATION_LABELS');
// Added 2026-08-12 with the label maps themselves. Until then `directionOfBias` and the pair
// `kind` rendered as raw tokens on 128 and 12 pages, and this file declared the first as
// `identity()` — a true declaration of a defect. Giving them labels made that declaration false
// and `field-render-audit` failed 66 immediately, which is the mechanism working: a non-prose
// value cannot be looked for as itself once it has a label.
const DIRECTION_OF_BIAS = labelMap(FORMAT, 'DIRECTION_OF_BIAS_LABELS');
const PAIR_KIND = labelMap(FORMAT, 'PAIR_KIND_LABELS');
// Parsed rather than retyped even though every other `phrase` map in this file is an inline
// literal. The inline form is defensible where the phrase is one word invented at the call site;
// this one has a rendering component and a label map behind it, so the same argument the header
// makes for `labels` applies unchanged — and the null branch is exactly the kind of key a retyped
// copy loses. Deliberately NOT added to `LABEL_MAPS`: that export feeds `enum-parity`, and a
// boolean is not an enum.
const HIGHER_IS_BETTER = labelMap(FORMAT, 'HIGHER_IS_BETTER_LABELS');

/** The parsed maps, exported so nothing else re-parses or retypes them. */
export const LABEL_MAPS = {
  ASSESSMENT_LABELS: ASSESSMENT,
  TIER_LABELS: TIER,
  TERM_LABELS: TERM,
  DOMAIN_LABELS: DOMAIN,
  LENS_LABELS: LENS,
  COUNTRY_LABELS: COUNTRY,
  CONTESTED_GROUND_LABELS: CONTESTED_GROUND,
  OBJECTIVE_MEASUREMENT_LABELS: OBJ_MEASUREMENT,
  COMMITMENT_STATE_LABELS: COMMITMENT_STATE,
  INDEPENDENCE_LABELS: INDEPENDENCE,
  REASON_KIND_LABELS: REASON_KIND,
  DISPUTE_KIND_LABELS: DISPUTE_KIND,
  EXPOSURE_ROLE_LABELS: EXPOSURE_ROLE,
  EXPOSURE_ADJUDICATION_LABELS: EXPOSURE_ADJ,
};

const identity = () => ({ kind: 'identity' });
const labels = (map) => ({ kind: 'labels', map });
const phrase = (map) => ({ kind: 'phrase', map });
const number = () => ({ kind: 'number' });

/**
 * Keyed `<layer>.<schema path>`.
 *
 * Where a phrase is declared, it is the SHORTEST fragment the view always emits for that value —
 * not the whole sentence, because a sentence carries punctuation and interpolation that the
 * normaliser would have to chase. `differentFacts` is the instructive one: BOTH branches render,
 * true through `DifferentFactsMark` and false through `DifferentFactsNegativeMark`, and they say
 * opposite things, so a single phrase would pass on one branch by accident.
 */
export const RENDERINGS = {
  // ---- ledger ------------------------------------------------------------
  'ledger.id': identity(),
  'ledger.date': identity(),
  'ledger.dateEnd': identity(),
  'ledger.asOf': identity(),
  'ledger.term': labels(TERM),
  'ledger.type': identity(),
  'ledger.assessment': labels(ASSESSMENT),
  'ledger.contestedGround': labels(CONTESTED_GROUND),
  'ledger.independence': labels(INDEPENDENCE),
  'ledger.confidence': identity(),
  'ledger.domains': labels(DOMAIN),
  'ledger.lenses': labels(LENS),
  'ledger.seriesRefs': identity(),
  'ledger.provenanceRefs': identity(),
  'ledger.sources[].url': identity(),
  'ledger.sources[].tier': labels(TIER),
  'ledger.objectives[].text': identity(),
  'ledger.objectives[].quantified': phrase({ true: 'quantified', false: 'not quantified' }),
  'ledger.objectives[].measurement': labels(OBJ_MEASUREMENT),
  'ledger.objectives[].grounds': phrase({ true: 'the verdict rests on this', false: 'the verdict does not rest on this' }),
  'ledger.objectives[].commitmentState': labels(COMMITMENT_STATE),
  'ledger.objectives[].unmeasuredRef': number(),
  'ledger.shockExposure[].event': identity(),
  'ledger.shockExposure[].role': labels(EXPOSURE_ROLE),
  'ledger.shockExposure[].adjudication': labels(EXPOSURE_ADJ),
  'ledger.unmeasured[].reasonKind': labels(REASON_KIND),
  'ledger.unmeasured[].disputeKind': labels(DISPUTE_KIND),
  'ledger.unmeasured[].reasonDisputed': phrase({ true: 'stated reason disputed' }),
  'ledger.differentFacts': phrase({
    true: "These cases don't share a common measure",
    false: 'These cases were tested for different facts and recorded false',
  }),

  // ---- provenance --------------------------------------------------------
  'provenance.id': identity(),
  'provenance.affectsDomains': labels({ ...DOMAIN, all: 'all topics' }),
  'provenance.affectsSeries': identity(),
  'provenance.correctiveSeries': identity(),
  'provenance.directionOfBias': labels(DIRECTION_OF_BIAS),
  'provenance.sources[].url': identity(),
  'provenance.sources[].tier': labels(TIER),
  'provenance.bridgeExists': phrase({ true: 'bridge exists', false: 'no bridge' }),

  // ---- series ------------------------------------------------------------
  /**
   * PAIRS — the non-prose half, brought into scope 2026-08-11 when `leafFields` learned to resolve
   * `$ref` and could finally descend into `a` and `b`.
   *
   * ONE ENTRY, FIFTEEN EXEMPTIONS, and the ratio is the finding rather than an oversight. A pair is
   * a rendering of two RESOLVED sides: `series`, `absenceFrom`, `absenceIndex` and
   * `competingAccountsFrom` are inputs to `resolvePairSide` and what reaches a reader is the thing
   * they resolve TO — a series' chart, a host's declared absence, a provenance record's competing
   * accounts. `id`, `kind`, `domain` and `lenses` are routing and filing. Each says so in its own
   * schema description.
   *
   * `provenanceRefs` is the exception because both pair views print the `P-xx` themselves.
   */
  'pairs.kind': labels(PAIR_KIND),
  'pairs.provenanceRefs': identity(),

  'series.id': identity(),
  'series.domain': labels(DOMAIN),
  'series.lenses': labels(LENS),
  'series.tier': labels(TIER),
  'series.source.url': identity(),
  'series.source.vintage': identity(),
  'series.calendar': phrase({ FY: 'fiscal year', CY: 'calendar year' }),
  /**
   * DECLARED 2026-08-12, DISCHARGING THE DEBT ITS OWN SCHEMA DESCRIPTION LOGGED.
   *
   * The exemption this replaces did not say the field was deliberately unrendered — it said the
   * field was UNIMPLEMENTED and recorded that as an open item. The question routes select on it,
   * so it now renders on every series page that carries it. **All three keys are declared,
   * including `null`**: a series stating that there is no agreed direction is making a
   * declaration, not leaving a gap, and a phrase map missing that key would silently excuse 76
   * records from the audit.
   */
  'series.higherIsBetter': phrase(HIGHER_IS_BETTER),
  'series.breaks[].provenanceRef': identity(),
  'series.provenanceRefs': identity(),
  'series.points[].country': labels(COUNTRY),
  'series.points[].period': identity(),
  'series.points[].status': identity(),
  'series.points[].value': number(),
  'series.unmeasured[].reasonKind': labels(REASON_KIND),
  'series.unmeasured[].disputeKind': labels(DISPUTE_KIND),
  'series.unmeasured[].reasonDisputed': phrase({ true: 'stated reason disputed' }),
};

/**
 * The instrument's own number formatting, mirrored for the audit.
 *
 * This is the one place the audit re-implements a renderer instead of importing it, because
 * `lib/format.ts` is TypeScript and this is a plain-node gate. The duplication is a real hazard —
 * "normalise the page and the value with the SAME function, and never hand-roll a second one" is a
 * standing rule here, and 53 false invisibles were paid for breaking it. The mitigation is that
 * `numberForms` returns EVERY plausible form rather than one, so a divergence between this and
 * `formatValue` costs a false PASS on a value that is on the page in some other form, never a
 * false failure that sends someone hunting a rendering bug that does not exist.
 */
export function numberForms(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return [String(v)];
  const abs = Math.abs(n);
  const decimals = Number.isInteger(n) ? 0 : abs < 100 ? 2 : 1;
  const forms = new Set([
    String(v),
    n.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: decimals }),
    n.toLocaleString('en-IN'),
    n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: decimals }),
  ]);
  if (!Number.isInteger(n)) {
    forms.add(n.toFixed(1));
    forms.add(n.toFixed(2));
  }
  return [...forms];
}

/** Every string a value is allowed to appear as, given its declared rendering. */
export function acceptedForms(rendering, value) {
  switch (rendering.kind) {
    case 'identity':
      return [String(value)];
    case 'labels': {
      const label = rendering.map[String(value)];
      return label === undefined ? [String(value)] : [String(value), label];
    }
    case 'phrase': {
      const p = rendering.map[String(value)];
      // A boolean whose FALSE branch is not declared renders nothing, and that is a decision the
      // declaration makes explicitly: only the declared branches are asserted.
      return p === undefined ? null : [p];
    }
    case 'number':
      return numberForms(value);
    default:
      throw new Error(`value-renderings: unknown rendering kind ${rendering.kind}`);
  }
}

/** The token a schema description must carry to exempt a non-prose field, followed by a reason. */
export const EXEMPT_NON_PROSE = 'NOT A RENDERED VALUE:';
