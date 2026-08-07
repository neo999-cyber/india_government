import { LABEL_MAPS } from './value-renderings.mjs';

/**
 * THE GUARDED-MARKS LIST — the single definition, imported by everything that needs it.
 *
 * It lived inside `tools/reachability.mjs` until phase 15 batch 2. It moved here for a structural
 * reason, not a tidiness one: `no-unguarded-prose-field` binds this list to the schemas, and a
 * binding gate that read its own COPY of the list would assert nothing. Both tools now read the
 * same object, so the two cannot drift apart silently — which is the whole failure this list is
 * implicated in.
 *
 * A mark here is a value that CAN BE SUPPRESSED BY A COMPETING VIEW, and `reachability` proves it
 * renders on the page of the record that declares it. Membership is not a judgement about how
 * important a field is; it is a judgement about whether a view could ever delegate it away.
 *
 * A field NOT on this list is unguarded by `reachability` BY CONSTRUCTION. That is legitimate only
 * where the field is the record's own body copy with no competing view to be delegated to — and
 * even then it is covered observationally by `tools/field-render-audit.mjs`, which reads built
 * output and asserts every prose field reaches its own record's page. The two are deliberately
 * different in kind: this list fires at authoring time and needs no build; the audit needs a build
 * and catches a field that is nominally guarded but suppressed anyway.
 *
 * The enum field added 2026-08-06 renders as a LABEL, not as their tokens, so the mark is the
 * label — looked up through the same parsed maps `value-renderings.mjs` uses, never retyped here.
 * A second copy of a label map is how a control comes to assert a page the code stopped producing.
 */
const { CONTESTED_GROUND_LABELS } = LABEL_MAPS;

const labelOf = (map, v) => (v == null ? [] : [map[v] ?? String(v)]);

export const MARKS = [
  { field: 'unmeasured', layers: ['series', 'ledger'], each: (r) => (r.unmeasured ?? []).map((u) => u.what) },
  // Added phase 16 when shockExposure became an array. `why` carries the judgement verbatim from
  // the prose the field held before 2026-08-06; a role and an adjudication with no ground is what a
  // dense view would leave behind, so it is guarded rather than exempted.
  // Added phase 17. `text` is the announcement's own words and is the mark; the flags beside it
  // are non-prose and are covered by field-render-audit through value-renderings.
  { field: 'objectives', layers: ['ledger'], each: (r) => (r.objectives ?? []).map((o) => o.text) },
  { field: 'shockExposure', layers: ['ledger'], each: (r) => (r.shockExposure ?? []).map((e) => e.why) },
  { field: 'caveat', layers: ['series', 'ledger'], each: (r) => (r.caveat ? [r.caveat] : []) },
  { field: 'notes', layers: ['series', 'provenance'], each: (r) => (r.notes ? [r.notes] : []) },
  { field: 'differentFactsNote', layers: ['ledger'], each: (r) => (r.differentFactsNote ? [r.differentFactsNote] : []) },
  // Added phase 15 batch 1. Both were written into /data and rendered NOWHERE — assessmentNote on
  // all 164 records carrying it, revisitTrigger on all 62 — with every gate green throughout,
  // because the data was correct and no rule read the page for them.
  { field: 'assessmentNote', layers: ['ledger'], each: (r) => (r.assessmentNote ? [r.assessmentNote] : []) },
  { field: 'revisitTrigger', layers: ['ledger'], each: (r) => (r.revisitTrigger ? [r.revisitTrigger] : []) },
  // Added phase 15 batch 2. Provenance prose was entirely unguarded until the layer was swept:
  // `bridgeNote` carries whether a break can be crossed at all, which is the most suppressible
  // thing in the record and the most dangerous to lose.
  { field: 'bridgeNote', layers: ['provenance'], each: (r) => (r.bridgeNote ? [r.bridgeNote] : []) },
  // Added 2026-08-06 with the field itself. It qualifies a verdict rather than being body copy,
  // which is exactly the shape a dense or summarising view drops first.
  {
    field: 'contestedGround',
    layers: ['ledger'],
    each: (r) => labelOf(CONTESTED_GROUND_LABELS, r.contestedGround),
  },
  // Added 2026-08-06, when the shared leaf enumeration first made this field visible to the gate at
  // all: `competingAccounts` items are a `oneOf` of {holder, position} or a bare string, and the old
  // walk only followed `items.properties`, so the whole field was outside both render gates without
  // anyone deciding it should be. GUARDED rather than exempted, because it is the most literally
  // delegatable thing in the corpus — it IS the competing view, on 81 records, and a summarising
  // view that dropped it would leave a dispute record asserting a dispute it never shows.
  {
    field: 'competingAccounts',
    layers: ['provenance'],
    each: (r) => (r.competingAccounts ?? []).map((a) => (typeof a === 'string' ? a : a.position)).filter(Boolean),
  },
];
