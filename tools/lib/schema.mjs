import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const SCHEMA_FILES = {
  series: 'series.schema.json',
  ledger: 'ledger.schema.json',
  provenance: 'provenance.schema.json',
};

/**
 * Ajv configuration, in draft 2020-12 (Ajv2020 is that dialect by construction, and the
 * schemas declare it in `$schema`).
 *
 * `strict: true` is load-bearing, and not for the reason it looks like. The if/then
 * conditionals in ledger.schema.json evaluate fine either way — applicator keywords are
 * not gated on strict mode. What strict mode buys is that a *misspelled* keyword is a
 * compile error instead of silence: under `strict: false`, an `allOf[].than` typo'd for
 * `then` is dropped without a word, and every record the conditional was meant to catch
 * passes. tools/selftest.mjs asserts that this now throws.
 *
 * `strictRequired` is the one check that has to stay off. It wants every name in a
 * `required` list declared in `properties` *at the same subschema level*, which a
 * conditional cannot satisfy: `allOf[1].then.required` names caseFor/caseAgainst, and they
 * are declared at the root where they belong. Leaving it on would force the schema to be
 * contorted to please the linter, and the schemas are the contract.
 */
export const AJV_OPTIONS = Object.freeze({
  allErrors: true,
  strict: true,
  strictRequired: false,
  allowUnionTypes: true,
});

/**
 * Compile the three layer schemas. The schemas are the contract (CLAUDE.md, Roles):
 * code may propose changes to them but never works around them.
 * @param {string} schemasDir
 * @returns {{ validators: Record<string, import('ajv').ValidateFunction> }}
 */
export function compileSchemas(schemasDir) {
  const ajv = new Ajv2020({ ...AJV_OPTIONS });
  addFormats(ajv);

  /** @type {Record<string, import('ajv').ValidateFunction>} */
  const validators = {};
  for (const [layer, file] of Object.entries(SCHEMA_FILES)) {
    const path = join(schemasDir, file);
    let schema;
    try {
      schema = JSON.parse(readFileSync(path, 'utf8'));
    } catch (err) {
      throw new Error(`cannot read schema ${file}: ${err.message}`);
    }
    validators[layer] = ajv.compile(schema);
  }
  return { validators };
}

/**
 * Render one Ajv error as a single readable line.
 * @param {import('ajv').ErrorObject} err
 */
export function formatAjvError(err) {
  const at = err.instancePath || '(root)';
  let detail = err.message ?? 'failed validation';
  if (err.keyword === 'additionalProperties') {
    detail = `unknown property "${err.params.additionalProperty}" — the schema is closed; add it to the schema in chat first`;
  } else if (err.keyword === 'enum') {
    detail = `${detail}: ${JSON.stringify(err.params.allowedValues)}`;
  } else if (err.keyword === 'pattern') {
    detail = `${detail} (${err.params.pattern})`;
  } else if (err.keyword === 'required') {
    detail = `missing required property "${err.params.missingProperty}"`;
  }
  return `${at} ${detail}`;
}
