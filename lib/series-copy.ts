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
 *
 * ============================ HOW MANY SERIES GET ONE — RULED 2026-08-12 ON A MEASUREMENT =====
 *
 * Three possibilities were put: all 251 remaining series need an authored sentence; a subset needs
 * one and the rest render without the line permanently; or some are DERIVABLE from what the record
 * already holds. **The measurement picks the second, and it refutes the third outright.**
 *
 * **DERIVATION IS CLOSED, AND NOT ON TASTE.** The only genuinely authored prose a series record
 * holds is `notes` and its `points[].note`. Measured over the 251: **246 hold such prose and 246
 * already render ALL of it on their own page**; the remaining 5 hold none at all. So harvesting
 * would duplicate a paragraph a few hundred pixels above its own copy, in the SAME role — unlike
 * the homepage's two copies of one caveat, which sit in two different roles four thousand
 * characters apart. And for the 5, there is nothing to harvest but the numbers, which is the
 * generated shell the top of this file forbids. **A narrow derivable class was looked for and does
 * not exist.**
 *
 * **REACHABILITY DOES NOT PARTITION ANYTHING, WHICH CORRECTS THE PREMISE THE QUESTION CARRIED.**
 * The subset was expected to fall out of who a reader can reach. Crawled over 738 built pages:
 * `/search/`, `/series/` and all thirteen year pages link every one of the 269, so they
 * discriminate nothing — and of the surfaces that DO discriminate, a domain surface reaches all
 * 269 and another series page reaches all 269. **Zero series are reachable only from an index.**
 * There is a gradient in PROMINENCE — 19 are drawn as a chart on a surface other than their own,
 * 222 sit on the overview board, 5 on the homepage — but prominence here is an editorial choice
 * made in the components, so selecting on it would be a merit claim computed from our own picks
 * rather than from the data. Rejected on the selection-is-not-ranking rule.
 *
 * **THE ONE BOUNDARY THAT SURVIVES IS WHAT A SERIES CAN SUPPORT.** A finding states what a series
 * SHOWS; a series with a single observation shows no trajectory, and the only honest sentence
 * available is that one figure was published — which is a fact, not a finding, and which the record
 * already states in its own point note. **Measured: 31 of the 251 carry one observation, and 31 of
 * 31 already render that note on their own page.** Those 31 render without the line PERMANENTLY,
 * and this paragraph is the printed criterion. Two observations is enough — `farm-household-income`
 * carries a finding on two points, because what it adds is that there is no third.
 *
 * **THAT LEAVES 220 TO AUTHOR**, at the domain-period standard, ordered by the number of distinct
 * discriminating surfaces that link the series — computed from the built site, so a later cycle
 * re-derives it, and not a claim that the earlier ones matter more.
 *
 * **AND THE RATE WILL NOT HOLD — MEASURED AT THE END OF TRANCHE 1, NOT ASSUMED.** Counting the
 * characters of `notes`, `caveat`, break notes and point notes a record carries — the material an
 * authored sentence is written FROM — this tranche's ten have a median of 1,786 and a minimum of
 * 943. **The remaining 210 have a median of 641, and 124 of them hold less than this tranche's
 * minimum. Three hold none at all.** The ordering by discriminating surfaces turns out to correlate
 * with how much a record has to say, so the first tranche was the easy end and the tail is thin.
 * **The three with nothing but numbers sit against the same boundary the single-observation rule
 * draws**, and whether a multi-observation series with no authored material can carry a finding is
 * a question for the tranche that reaches them, not one to pre-empt here — a trajectory is
 * something a single observation cannot have and these do.
 */
export type SeriesFinding = {
  /** One or two sentences. Plain text; no markdown — the view prints it as text. */
  finding: string;
  /**
   * Where the sentence came from, so a later cycle can tell harvest from fresh authorship.
   * `authored` is the 2026-08-12 tranche: written from the record, neither harvested from another
   * surface nor selected as a domain lead. **Not rendered** — this is provenance for a later cycle,
   * which is why a third value is a widening here and not a label-map change anywhere.
   */
  origin: 'harvested' | 'domain-lead' | 'authored';
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

  // ---- 3. AUTHORED, tranche 1 of the 220, 2026-08-12. Ordered by the number of distinct
  //         discriminating surfaces linking the series, which is stated in the header and computed
  //         from the built site. Every figure and every title below was read from `/data` in the
  //         operation that wrote the sentence.
  'jk-civilians-killed-composite': {
    finding:
      'MHA\u2019s own footnote defines this column as civilians killed in terrorist-initiated incidents and civilians killed in encounter or counter-terrorism operations, counted together as one number. It begins at 55 for 2018 and reads 26 for 2024. Calendar 2025 is not held: the Annual Report 2025-26 was not located.',
    origin: 'authored',
  },
  'jk-terrorist-incidents-legacy': {
    finding:
      'The Incidents column as MHA published it at the time, 2011 to 2020. The Annual Report 2021-22 later restated 2017 from 342 to 279, 2018 from 614 to 417 and 2019 from 594 to 255 under the identical column heading, and dropped 2014 to 2016 from view rather than restating them. These are the figures as they stood before that.',
    origin: 'authored',
  },
  'jk-infiltration-attempts': {
    finding:
      'Infiltration attempts recorded by MHA read 419 for 2017 and 53 for 2022. MHA has never stated how an attempt is detected or counted, and the row carried an unlabelled \u2018Total\u2019, then \u2018Total Infiltration Attempts\u2019, then its present name. The series stops at 2022 because the Annual Reports for 2023-24 and 2024-25 do not carry the table.',
    origin: 'authored',
  },
  'jk-net-estimated-infiltration': {
    finding:
      'The row MHA labels an estimate \u2014 a different row of the same table from Infiltration attempts, and never the same quantity. It reads 136 for 2017 and 14 for 2022. The published label changed twice inside three report years, from \u2018Successful\u2019 to \u2018Net infiltration (Estimated)\u2019 to \u2018Net Estimated infiltration\u2019, and no report says the first means the same as the last.',
    origin: 'authored',
  },
  'divisible-pool-share-gtr': {
    finding:
      'The share of the Union\u2019s gross tax revenue that sits inside the pool the states\u2019 share is applied to: 89 per cent in FY2010-11, 81.3 per cent in FY2025-26, and a trough of 74.0 in FY2020-21. The largest single step is FY2017-18, 86.2 to 75.6, when GST and the compensation cess began. Between roughly a fifth and a quarter of gross tax revenue sits outside the pool \u2014 and the states\u2019 share of what is inside it rose over the same years, from 32 per cent to 41. Neither number means anything without the other.',
    origin: 'authored',
  },
  'jk-encounters-ct-ops': {
    finding:
      'The only column in MHA\u2019s J&K tables that counts what the state did rather than what was done to it: 731 operations across 2018 to 2024, from 189 in the first year to 57 in the last. Whether a higher count is better is left unset, because the same number reads as effort to one reader and as intensity of contact with the population to another.',
    origin: 'authored',
  },
  'jk-detenus-psi': {
    finding:
      'NCRB\u2019s count of people held in J&K prisons on 31 December under preventive-detention law, every such statute together in one cell. It reads 35 for 2014 and 546 for 2022, the highest figure the series carries, and it ends there because Prison Statistics India ended. 2012 was never published.',
    origin: 'authored',
  },
  'jk-terrorist-initiated-incidents': {
    finding:
      'The column MHA created in the Annual Report 2022-23, when the single Incidents column was split in two. It reads 228 for 2018 and 28 for 2024. For calendar 2018 alone, five separately published and separately labelled incident counts exist, and this is one of them.',
    origin: 'authored',
  },
  'fc-vertical-devolution-share': {
    finding:
      'A step function rather than a measurement: the share of the divisible pool the Finance Commission recommended and the Union accepted \u2014 32 per cent to FY2014-15, 42 from FY2015-16, 41 from FY2020-21 onward. The move from 42 to 41 was, in the Commission\u2019s own words, an adjustment for the newly carved out Union Territories, not a reduction. It is a rule about what should be shared, not a record of what was paid.',
    origin: 'authored',
  },
  'jk-civilians-killed-terror-basis': {
    finding:
      'Civilians killed by militants, 2014 to 2021 \u2014 the bounded basis, superseded from the Annual Report 2022-23 by a wider count published under the identical column name. Three different bounding formulas have been used for that name and none of them appears in a table label: a bare heading in every Annual Report to 2022-23, \u2018who died due to terrorist attacks\u2019 in one parliamentary reply, \u2018in these incidents\u2019 in another.',
    origin: 'authored',
  },
};
