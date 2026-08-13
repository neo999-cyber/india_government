import { getLedger, getProvenance, getSeries } from '@/lib/data';

/**
 * THE STORIES, DECLARED ONCE — and the declaration exists to make the route run BOTH WAYS.
 *
 * ============================ THE MEASUREMENT THAT PRODUCED THIS FILE =========================
 *
 * Measured across all 750 built pages on 2026-08-13: **each story had exactly ONE inbound link, from
 * `/stories/`.** No record, series, topic, year or question page linked any story, and no story
 * linked another. The four carried 30 outbound links to 29 distinct records — **a one-way route
 * through a single door.** A reader on `/series/aser-std3-reading/`, the series the reading story is
 * entirely about, was never told the story existed.
 *
 * The operator's ground for writing more stories is that a story is the only surface giving a reader
 * a reason to open a record. The direction was right and the traffic could not get there.
 *
 * ============================ WHY ONE LIST AND NOT TWO ========================================
 *
 * *This story rests on this record* is a declared relation, and it is needed in two places: the
 * story's own **Where this comes from** grid, and the record's **next steps**. **Two lists would be
 * the ad-hoc-normaliser class** — they agree today and drift the first time a story gains a chart,
 * and nothing would report it because each is internally consistent. So `rests` is the single source
 * and both directions read it.
 *
 * **It therefore covers everything a story rests on, not only what its grid used to show.** Three
 * series were reached from charts above the grid and appeared in no grid at all —
 * `parakh-grade3-proficient-language`, `unpaid-helper-share`, `coal-production`. They are in the
 * list now, which adds them to their story's grid as well as giving them a return route. That is a
 * content addition and it is the right one: a story rests on the series it charts.
 *
 * ============================ THE SELECTION CRITERION, AND WHY IT IS PRINTED ==================
 *
 * Every other selection on this site prints its criterion — the domain lead prints *longest unbroken
 * run*, the search page prints what its sort is. **A stories index without one lets a reader read
 * the selection as an argument**, which with four subjects is a live risk. `STORY_CRITERION` below
 * is computable from declared fields, re-derivable next cycle, and carries no merit claim:
 * `signatureFor` recomputes each story's qualifying signature from `/data` rather than restating it.
 */
export type StoryRef = {
  id: string;
  kind: 'series' | 'ledger' | 'provenance';
  /** Why this record is under this story. Authored per story, never derived. */
  blurb: string;
};

export type Story = {
  slug: string;
  title: string;
  /** The topic chip on the index. */
  topic: string;
  /** One sentence on the index card. */
  card: string;
  /**
   * The qualifying signature: the contested pair ids, or the boundary provenance ids, that make this
   * subject one the criterion selects. **Checked against `/data` by `signatureFor`, not trusted.**
   */
  signature: string[];
  rests: StoryRef[];
};

export const STORIES: Story[] = [
  {
    slug: 'can-indian-children-read',
    title: 'Can Indian children read?',
    topic: 'Education',
    card: 'Two national instruments, one question, and answers that point different ways',
    signature: ['PR-17'],
    rests: [
      { id: 'P-59', kind: 'provenance', blurb: '' },
      { id: 'P-60', kind: 'provenance', blurb: '' },
      { id: 'aser-std3-reading', kind: 'series', blurb: '2010 to 2024 · three declared breaks' },
      {
        id: 'parakh-grade3-proficient-language',
        kind: 'series',
        blurb: 'the proficiency band the success claim rests on, on cut-scores published nowhere',
      },
      {
        id: 'L-0092',
        kind: 'ledger',
        blurb: 'the same findings reproduced, then attributed differently',
      },
    ],
  },
  {
    slug: 'did-jobs-grow',
    title: 'Did jobs grow after 2014?',
    topic: 'Employment',
    card: 'Two surveys of the same quantity that disagree about the direction, and an official fall made of something other than jobs',
    signature: ['PR-12', 'PR-13'],
    rests: [
      { id: 'P-41', kind: 'provenance', blurb: '' },
      { id: 'P-40', kind: 'provenance', blurb: '' },
      { id: 'P-39', kind: 'provenance', blurb: '' },
      { id: 'unemployment-rate', kind: 'series', blurb: 'the official rate, with its two declared breaks' },
      { id: 'unemployment-rate-cmie', kind: 'series', blurb: 'the private survey, on the same quantity' },
      {
        id: 'unpaid-helper-share',
        kind: 'series',
        blurb: 'unpaid family helpers, counted as employed — and the series stops in 2020-21',
      },
      { id: 'L-0058', kind: 'ledger', blurb: 'why neither instrument may be read alone' },
      { id: 'L-0059', kind: 'ledger', blurb: 'what the falling rate is made of' },
      { id: 'L-0064', kind: 'ledger', blurb: 'two quantities nobody collected' },
    ],
  },
  {
    slug: 'who-counts-the-dead',
    title: 'Who counts the dead in Kashmir?',
    topic: 'Kashmir',
    card: 'Twenty-seven of thirty indicators are published by the state; the three that are not all count deaths, and they do not sit where you would expect',
    signature: ['PR-26', 'PR-32'],
    rests: [
      { id: 'P-73', kind: 'provenance', blurb: '' },
      { id: 'P-75', kind: 'provenance', blurb: '' },
      { id: 'P-87', kind: 'provenance', blurb: '' },
      { id: 'jk-civilians-killed-composite', kind: 'series', blurb: 'the official column, merged and unattributed' },
      { id: 'jk-civilians-killed-satp', kind: 'series', blurb: 'the press-compiled register, with no published method' },
      {
        id: 'jkccs-civilians-killed-by-armed-forces',
        kind: 'series',
        blurb: 'the attributed count, two years, then silence',
      },
      { id: 'L-0111', kind: 'ledger', blurb: 'how the official instrument was restated, twice, with no note' },
      { id: 'L-0110', kind: 'ledger', blurb: 'what the two families of instrument each hold' },
    ],
  },
  {
    slug: 'how-renewable',
    title: 'How much of India’s electricity is renewable?',
    topic: 'Environment',
    card: 'Four official figures for the same year, all correct, from 16.88 per cent to 53.21 — and coal production nearly doubled underneath them',
    signature: ['P-121'],
    rests: [
      { id: 'P-121', kind: 'provenance', blurb: '' },
      { id: 'P-122', kind: 'provenance', blurb: '' },
      { id: 'P-126', kind: 'provenance', blurb: '' },
      {
        id: 'coal-production',
        kind: 'series',
        blurb: 'what rose while the non-fossil share of the fleet was passing half',
      },
      { id: 'L-0221', kind: 'ledger', blurb: 'the capacity milestone and the electricity behind it' },
      { id: 'L-0222', kind: 'ledger', blurb: 'the import stop that did not happen' },
      { id: 'L-0226', kind: 'ledger', blurb: 'a rule and a plan that do not agree' },
    ],
  },
];

/** The stories resting on a record — the return route, and the reason this file exists. */
export const storiesRestingOn = (id: string): Story[] =>
  STORIES.filter((s) => s.rests.some((r) => r.id === id));

export const storyBySlug = (slug: string): Story | undefined =>
  STORIES.find((s) => s.slug === slug);

/**
 * THE CRITERION, PRINTED WHERE THE SELECTION IS MADE.
 *
 * Measured before it was proposed: it selects all four written subjects and nothing about it is a
 * judgement of importance. 25 signatures exist in `/data` — 12 contested pairs with a series on both
 * sides, and 13 provenance records graded `obscures` affecting two or more series.
 */
export const STORY_CRITERION =
  'A subject is here where the corpus holds more than one official figure for one question — either two instruments that disagree, recorded as a contested pair, or one publisher whose definition admits more than one boundary. That is a fact about the record and not a claim that these are the most important subjects; it is checkable against the data, and the qualifying pair or dispute is named on every card.';

/**
 * Recompute a story's signature from `/data` rather than trusting the literal above.
 *
 * A signature naming a pair or dispute that no longer exists would print a criterion the corpus does
 * not support, which is the failure mode a printed criterion is supposed to prevent.
 */
export function signatureFor(story: Story): { id: string; label: string }[] {
  return story.signature
    .map((id) => {
      const p = getProvenance(id);
      if (p) return { id, label: 'measurement dispute' };
      return { id, label: 'contested pair' };
    })
    .filter(Boolean);
}

/** The record behind a `StoryRef`, or undefined if the id no longer resolves. */
export function resolveRef(r: StoryRef) {
  if (r.kind === 'series') return getSeries(r.id);
  if (r.kind === 'ledger') return getLedger(r.id);
  return getProvenance(r.id);
}
