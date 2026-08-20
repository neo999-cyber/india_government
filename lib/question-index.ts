/**
 * Lightweight route copy for the six published question filters.
 *
 * This module deliberately imports no data. Client-side navigation can therefore name the real
 * question routes without bundling the corpus computations in `lib/questions.ts`.
 */
export type QuestionRoute = {
  slug: string;
  question: string;
  /** Printed under the heading on the route, and under the question on the index. */
  criterion: string;
  /** What a reader is looking at, in one sentence, before any row. */
  lede: string;
  /** Short directory copy; the complete qualification remains on the destination. */
  directory: string;
};

/** The brief's authored listing order, shared by the question pages and global directory. */
export const QUESTION_ROUTES: readonly QuestionRoute[] = [
  {
    slug: 'improved',
    question: 'What clearly improved?',
    criterion:
      'Series whose own record declares which direction is better, and whose first and last observations in the current window moved that way. The window starts at the later of the last methodology break and the May 2014 baseline. No size threshold is applied, because any threshold would be invented here rather than read from the data — so the span and the number of observations behind each comparison are printed on every row instead. Ordered by the number of observations, longest run first.',
    lede:
      'The corpus does not hold a direction of merit for most of what it measures, so this is not a list of everything that improved. It is everything the instrument is willing to call an improvement.',
    directory: 'Movements in a direction the record itself declares better.',
  },
  {
    slug: 'worsened',
    question: 'What clearly worsened?',
    criterion:
      'The same selection as the improved set, on the other side: series whose record declares which direction is better and whose first and last observations in the current window moved against it. Same window, same absence of a size threshold, same printed span and observation count. Ordered by the number of observations, longest run first.',
    lede:
      'These are not the worst things in the corpus. They are the movements the instrument can call a worsening without taking a side the record has not taken.',
    directory: 'Movements against a direction the record itself declares better.',
  },
  {
    slug: 'too-early',
    question: 'What is still too early?',
    criterion:
      'Ledger records whose assessment is too-early — an exact field test, no keyword search. Each carries its verdict note in full, which is where the reason it cannot yet be scored is written. Ordered by date, earliest first.',
    lede:
      'Too early is a finding, not a deferral. Each of these records describes something that has happened and states what has not yet happened that would let it be judged.',
    directory: 'Records that state what has not happened yet to permit judgment.',
  },
  {
    slug: 'publication-stopped',
    question: 'Where did official publication stop?',
    criterion:
      'Series whose last India observation falls before the publication frontier — the earliest year holding at least half as many series-ends as the busiest year, derived from the corpus rather than chosen. A series ending in the frontier year is an annual series whose next figure is not out yet; one ending before it has stopped. Ordered by the year of the last observation, earliest first.',
    lede:
      'Two different things end a run, and this page holds only the first. A publisher can stop, or a record can declare that a figure was collected and never released. The second is a declared absence and lives on the unmeasured page; this is the first, and it is derived from where the observations actually stop.',
    directory: 'Series ending before the archive’s derived publication frontier.',
  },
  {
    slug: 'sources-disagree',
    question: 'Where do official sources disagree?',
    criterion:
      'Pairs the corpus files as contested: two instruments measuring the same quantity, both retrieved for the same period and basis, disagreeing. The other 39 pairs are excluded and the exclusion is deliberate — they are coverage-and-usage pairs, which measure different quantities, where agreement would be as unsound as disagreement. Ordered by topic, then by pair id.',
    lede:
      'Neither side of any of these is the corrective. The corpus shows both and picks neither, and the sentence under each pair is its own statement of what the disagreement is about.',
    directory: 'Competing instruments for the same quantity, shown without picking a side.',
  },
  {
    slug: 'measured-well',
    question: 'What can India measure well?',
    criterion:
      'Series passing seven exact field tests at once: an official Indian or multilateral primary source; no methodology break; no blocking caveat; no declared absence; no measurement-dispute record bearing on it; no rival instrument recorded as disagreeing with it; and two or more India observations, because one figure is not a measurement over time. Ordered by the number of observations, longest run first.',
    lede:
      'Every test here is about the published statistics rather than about this instrument. One test that seemed obvious — that every observation has been pinned to its primary this cycle — was tried and removed: it measures how much of the retrieval work is finished, which is a fact about the corpus and not about India.',
    directory: 'Series passing all seven published measurement tests.',
  },
];
