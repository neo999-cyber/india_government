import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * THE EDIT HISTORY OF A RECORD, READ FROM GIT — the corpus's changelog, which existed and was
 * invisible.
 *
 * WHAT WAS ALREADY TRUE. This instrument has one of the strictest correction disciplines it could
 * have: a correction quotes what it withdrew, in the same field; the verification log is
 * append-only; `withdrawn-wording` gates 29 corrections and 166 sibling-field comparisons; 120
 * commits touch `/data`. **And a reader could see none of it.** Corrections live as prose inside
 * fields, no component keyed off them, and `review/record-history.json` — which has held all of
 * this since it was written — fed an internal selection routine and no page. A record corrected
 * four times looked exactly like a record written once and never revisited.
 *
 * ============================ WHAT THE TWO COUNTS MEAN, WHICH IS NOT THE SAME =================
 *
 * **`editCount` IS A COUNT OF COMMITS THAT TOUCHED THE RECORD, AND IT IS LABELLED AS THAT
 * EVERYWHERE IT IS PRINTED — never as a count of corrections.** It counts a whitespace
 * reserialisation as an edit, and it counts a correction that rewrote four fields as one. Calling
 * it "corrections" would be a fabricated scope: a true-looking number nobody could re-derive.
 *
 * **`values` IS EXACT.** Every observed transition of `assessment` (ledger) or `directionOfBias`
 * (provenance), with the commit that made it. This is the one a reader should care about, because
 * it is the only place the corpus says out loud that it changed its mind about a verdict — 45
 * records have.
 *
 * ============================ WHY IT IS READ AND NOT RECOMPUTED ================================
 *
 * `git log` is not available to a Next page and would be wrong if it were: Vercel clones shallow,
 * so a history reconstructed at deploy time would be SILENTLY SHORT. The file is committed,
 * regenerated locally by `npm run record-history`, and refused by that script on a shallow
 * checkout. See its header for the argument.
 *
 * A MISSING FILE IS NOT AN EMPTY HISTORY. `historyFor` returns `undefined` when the record is
 * absent from the file, and every view distinguishes that from an edit count of zero — the
 * `record.get(field) or []` defect this corpus has already paid for once.
 */

export type HistoryEdit = { sha: string; date: string; subj: string; fields: string[] };
export type HistoryValue = { sha: string; date: string; subj: string; v: string | null; from?: string | null };
export type RecordHistory = {
  firstDate: string;
  firstSubj: string;
  editCount: number;
  edits: HistoryEdit[];
  values: HistoryValue[];
};

const FILE = join(process.cwd(), 'review', 'record-history.json');

function load(): Record<string, RecordHistory> {
  if (!existsSync(FILE)) return {};
  try {
    return JSON.parse(readFileSync(FILE, 'utf8')) as Record<string, RecordHistory>;
  } catch {
    return {};
  }
}

export const history: Record<string, RecordHistory> = load();

/** `undefined` means "this record is not in the history file", which is not "never edited". */
export const historyFor = (id: string): RecordHistory | undefined => history[id];

/** The commit date of the most recent edit, or the record's first appearance. */
export function lastTouched(id: string): string | undefined {
  const h = history[id];
  if (!h) return undefined;
  return h.edits.length ? h.edits[h.edits.length - 1].date : h.firstDate;
}

/**
 * Records whose verdict moved after they were first published.
 *
 * `values[0]` is the value at first appearance, so a record with more than one entry changed its
 * mind at least once. Sorted by the most recent change, because the question a reader has is "what
 * has this instrument recently decided it got wrong".
 */
export function verdictChanges(): { id: string; h: RecordHistory }[] {
  return Object.entries(history)
    .filter(([, h]) => h.values.length > 1)
    .map(([id, h]) => ({ id, h }))
    .sort((a, b) => {
      const av = a.h.values[a.h.values.length - 1].date;
      const bv = b.h.values[b.h.values.length - 1].date;
      return bv.localeCompare(av) || a.id.localeCompare(b.id);
    });
}
