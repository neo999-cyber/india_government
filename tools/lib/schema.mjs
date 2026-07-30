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
 * Compile the three layer schemas. The schemas are the contract (CLAUDE.md, Roles):
 * code may propose changes to them but never works around them.
 * @param {string} schemasDir
 * @returns {{ validators: Record<string, import('ajv').ValidateFunction> }}
 */
export function compileSchemas(schemasDir) {
  const ajv = new Ajv2020({ allErrors: true, strict: false, allowUnionTypes: true });
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
