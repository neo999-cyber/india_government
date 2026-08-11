/**
 * AUTHORED SERIES FINDINGS — one sentence per series, and the part of a series page that cannot be
 * generated.
 *
 * ============================ WHY AUTHORED, AND WHAT A SERIES WITHOUT ONE DOES ================
 *
 * Same rule as the domain periods and for the same reason: **a generated summary makes 269 identical
 * shells.** *"This series runs 2014 to 2024 and rose by 12 points"* is a restatement of the chart
 * directly beneath it, and a reader who has seen two of them stops reading the third.
 *
 * **A series with no entry here renders the same page without that line** — exactly as a domain
 * without periods renders without the block. Not a stub, not a placeholder, not a generated
 * fallback: the sentence is absent, which is honest, and the chart carries the page instead.
 *
 * ============================ WHICH SERIES HAVE ONE, BY A STATED CRITERION ====================
 *
 * **Selection is not ranking**, so the criterion is printed here and is computed from the data.
 * Two groups, and neither is a claim that these series matter more:
 *
 * 1. **Series that already carried an authored sentence somewhere else on the site** — the homepage
 *    opening and its supporting set, the deliberate stop, and the story lead. Those sentences were
 *    written under the same rules and are HARVESTED HERE rather than rewritten, so the series page
 *    and the homepage cannot drift into saying different things about one series.
 * 2. **Each area's lead series**, taken by the criterion the domain pages already print and derive:
 *    the longest unbroken run of India observations, consecutive periods with no declared break
 *    inside them. Thirteen distinct series across fourteen areas —
 *    `jk-security-forces-killed` leads both `defence` and `kashmir`.
 *
 * **Neither criterion is a merit claim.** Longest run describes the record; already-authored
 * describes this repository's own history. A reader meeting one of these sentences is not being told
 * the series is important.
 *
 * ============================ WHAT A FINDING SENTENCE MAY AND MAY NOT DO ======================
 *
 * It states what the series shows, in one or two sentences, **true without the caveat** — the same
 * standard the share cards are held to, and for the same reason: the caveat follows further down the
 * page, and a finding that needs it in order not to mislead is a finding that misleads until the
 * reader gets there.
 *
 * It does not score, rank or compare across series. It does not use an assessment value as ordinary
 * English — that class has now produced five collisions, four of which attributed a verdict a record
 * does not hold, and every one was found by a hand read rather than by a checker.
 */
export type SeriesFinding = {
  /** One or two sentences. Plain text; no markdown — the view prints it as text. */
  finding: string;
  /** Where the sentence came from, so a later cycle can tell harvest from fresh authorship. */
  origin: 'harvested' | 'domain-lead';
};

export const SERIES_FINDINGS: Record<string, SeriesFinding> = {
  // ---- 1. HARVESTED. Already authored elsewhere on the site, reused verbatim so the two surfaces
  //         cannot drift into saying different things about one series.
  'higher-ed-ger': {
    finding:
      'Thirty per cent of Indians aged 18 to 23 are enrolled in higher education, up from 21 per cent in 2011-12 — and roughly half of that rise is the 18-23 cohort shrinking rather than enrolment growing. The break at FY2020-21 is the same population being restated, not a jump.',
    origin: 'harvested',
  },
  'res-capacity-share': {
    finding:
      'Renewables excluding large hydro have gone from an eighth of installed electricity capacity to roughly a third. Fourteen years, every one of them verified, no break.',
    origin: 'harvested',
  },
  'coal-production': {
    finding:
      'Coal production rose by about two-thirds over the same period. The energy transition and the coal expansion are both true at once.',
    origin: 'harvested',
  },
  'sanitation-basic': {
    finding:
      'The share of Indians using at least a basic sanitation service rose steeply and then flattened. This one is measured by the World Bank, not by the programme that built the toilets.',
    origin: 'harvested',
  },
  'schools-above-rte-ptr-primary-dise': {
    finding:
      'Published every year by DISE through 2015-16, and by its successor system in no edition since — although that system holds the enrolment and teacher counts for every school in the country.',
    origin: 'harvested',
  },

  // ---- 2. DOMAIN LEADS. One per area, by the longest unbroken run of India observations — the
  //         criterion the domain pages already derive and print.
  'forex-reserves': {
    finding:
      'Foreign exchange reserves roughly doubled over the period and are among the few macro quantities here published on one basis throughout, with no declared break in fourteen years.',
    origin: 'domain-lead',
  },
  'agri-credit': {
    finding:
      'Agricultural credit disbursed rises in every year of the series. It counts money lent, not farmers reached or loans repaid, and none of those three is a proxy for the others.',
    origin: 'domain-lead',
  },
  'lfpr-female': {
    finding:
      'Female labour force participation rises steeply from 2017-18. The series carries a declared break at exactly that point, where the Employment-Unemployment Survey gave way to the Periodic Labour Force Survey, so the rise and the change of instrument begin in the same year.',
    origin: 'domain-lead',
  },
  'farm-household-income': {
    finding:
      'Two observations, six years apart, and there is no third: the Situation Assessment Survey has not been repeated since 2018-19. A line between two points is the whole of what this series can show.',
    origin: 'domain-lead',
  },
  'farmer-suicides': {
    finding:
      'Suicides in the farming sector are published annually and the series carries a declared break, because what the category counts changed. Figures either side of the seam are not the same measurement.',
    origin: 'domain-lead',
  },
  'nh-construction-pace': {
    finding:
      'The pace of national highway construction roughly tripled from its starting level before falling back. It measures kilometres built per day, which is a different quantity from the network total that is usually quoted alongside it.',
    origin: 'domain-lead',
  },
  'msp-paddy': {
    finding:
      'The minimum support price for common paddy rose in every year of the series, in nominal rupees. It is the price announced, not the price received, and not the share of farmers who sold at it.',
    origin: 'domain-lead',
  },
  'edu-union-be-shortfall-pct': {
    finding:
      'The Union education ministry has spent less than its own budget estimate in most years of this series. The gap is between two numbers the government publishes about itself, which is why it can be stated without an external source.',
    origin: 'domain-lead',
  },
  'jk-psa-detenus-transferred-out': {
    finding:
      'The count of Public Safety Act detenus moved out of Jammu and Kashmir comes from a single Home Department document, and the series exists because no recurring publication carries it.',
    origin: 'domain-lead',
  },
  'jk-security-forces-killed': {
    finding:
      'Security-force deaths in Jammu and Kashmir fall across the period on the Ministry of Home Affairs count. A press-compiled register covering the same years is carried separately and does not agree, and neither is presented as the answer.',
    origin: 'domain-lead',
  },
  'tn-direct-goi-transfers-to-sias': {
    finding:
      'Money sent by the Union directly to implementing agencies in Tamil Nadu, bypassing the state treasury. It is the part of central transfer that a state budget does not see, which is why it is counted apart from devolution.',
    origin: 'domain-lead',
  },
  'exports-gdp': {
    finding:
      'Exports of goods and services as a share of GDP. The denominator was restated in February 2026 and the ratio steps at that point with no change in trade — an arithmetic step, marked as one.',
    origin: 'domain-lead',
  },
  'non-fossil-capacity-share': {
    finding:
      'Non-fossil sources passed half of installed electricity capacity. Capacity is what is built; it is not generation, and roughly half the fleet produced under a third of the electricity.',
    origin: 'domain-lead',
  },
};
