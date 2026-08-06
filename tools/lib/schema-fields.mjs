/**
 * ONE enumeration of a schema's leaf fields, shared by `field-render-audit` and
 * `no-unguarded-prose-field`.
 *
 * WHY IT IS SHARED. The two gates had a copy each. They agreed, which is exactly what makes a
 * duplicated enumeration dangerous: a field type added to one walk and not the other would put a
 * field inside one gate's scope and outside the other's, and both would keep reporting clean. The
 * scope of a guard is the thing this instrument gets wrong most often, so the scope lives in one
 * place.
 *
 * PROSE IS DEFINED, NON-PROSE IS THE COMPLEMENT — and that direction is deliberate. Prose is
 * `type: "string"` with no `enum`, `format` or `pattern`. Everything else is non-prose. Defining
 * the smaller set positively and taking the remainder means a JSON Schema construct nobody
 * anticipated lands IN scope rather than falling silently out of it. The old filter did the
 * opposite — it tested for the shapes it knew about — and every enum, formatted and patterned
 * field in the corpus was unguarded by construction as a result, which is how `disputeKind`
 * reached no reader on any of its 19 entries.
 *
 * `oneOf` BRANCHES ARE WALKED. `competingAccounts` is an array whose items are either
 * `{holder, position}` or a bare string, and a walk that only looks at `items.properties` treats
 * the whole array as one opaque leaf — which is what it did, and the audit then compared a
 * JSON-stringified object against page text and reported 55 false invisibles.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/**
 * Prose = free text. A UNION type counts when its only non-string member is `null`: `denominator`
 * is `["string","null"]` because null is a real value there meaning "not yet established", and a
 * strict `type === "string"` test threw it out of the prose audit and into the non-prose one, where
 * it demanded a rendering declaration for a plain sentence.
 */
export const isProse = (def) => {
  const t = Array.isArray(def.type) ? def.type.filter((x) => x !== 'null') : [def.type];
  return t.length === 1 && t[0] === 'string' && !def.enum && !def.format && !def.pattern;
};

/** Every leaf field of a layer's schema, as `{ path, def }`, with array steps marked `[]`. */
export function leafFields(schemaName) {
  const s = JSON.parse(readFileSync(join(ROOT, 'schemas', `${schemaName}.schema.json`), 'utf8'));
  const props = s.items?.properties ?? s.properties;
  const out = [];
  const seen = new Set();
  const push = (path, def) => {
    if (seen.has(path)) return;
    seen.add(path);
    out.push({ path, def });
  };
  // ONLY `oneOf`/`anyOf` are alternative SHAPES. `allOf` is a conjunction of CONSTRAINTS on one
  // shape — `unmeasured.items` uses it to require `disputeKind` when `reasonDisputed` is true — and
  // reading it as a shape list invents a bare-array leaf that no record ever carries.
  const shapes = (v) => v.oneOf ?? v.anyOf ?? null;
  const walk = (p, prefix) => {
    for (const [k, v] of Object.entries(p || {})) {
      const path = prefix + k;
      const item = v.items;
      const itemShapes = item ? shapes(item) : null;
      let handled = false;
      if (item?.properties) {
        walk(item.properties, `${path}[].`);
        handled = true;
      }
      if (itemShapes) {
        for (const b of itemShapes) {
          if (b.properties) { walk(b.properties, `${path}[].`); handled = true; }
        }
        // A branch that is a bare scalar has no sub-path of its own; the array itself is the leaf.
        const scalar = itemShapes.find((b) => !b.properties);
        if (scalar) { push(`${path}[]`, scalar); handled = true; }
      }
      if (handled) continue;
      if (v.type === 'object' && v.properties) walk(v.properties, `${path}.`);
      else push(path, v);
    }
  };
  walk(props, '');
  return out;
}

/** The top-level field a (possibly nested) path belongs to. The guarded-marks list is keyed that way. */
export const topLevelOf = (path) => path.split('.')[0].replace(/\[\]$/, '');

/** Every value a record carries at a field path, arrays flattened, blanks dropped. */
export function valuesAt(record, path) {
  let cur = [record];
  for (const raw of path.split('.')) {
    const isArr = raw.endsWith('[]');
    const key = isArr ? raw.slice(0, -2) : raw;
    const next = [];
    for (const node of cur) {
      if (node == null || typeof node !== 'object') continue;
      const v = node[key];
      if (v == null) continue;
      if (isArr) {
        if (Array.isArray(v)) next.push(...v);
      } else next.push(v);
    }
    cur = next;
  }
  return cur
    .flatMap((v) => (Array.isArray(v) ? v : [v]))
    .filter((v) => v !== null && v !== undefined && v !== '' && typeof v !== 'object');
}
