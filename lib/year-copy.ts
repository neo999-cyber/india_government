/**
 * AUTHORED YEAR COPY — one standfirst per year, the part of a year page that cannot be generated.
 *
 * ============================ WHY THE PAGES EXIST AT ALL, WHICH WAS MEASURED FIRST ============
 *
 * The instruction was to measure before building and not build thirteen templates with different
 * numbers in them. Measured 2026-08-11 across 2014-2026, four counts per year:
 *
 *   records beginning   9 → 33   mean 15.8   cv 0.42
 *   observations        5 → 148  mean 107.0  cv 0.34
 *   seams declared      3 → 25   mean 12.5   cv 0.51
 *   records exposed     0 → 22   mean 5.7    cv 0.98
 *
 * **They vary, and — the decisive test — they vary INDEPENDENTLY.** Spearman ρ between every pair
 * is at most 0.61, and that one pair (`began` against `exposed`) shares a denominator by
 * construction, since a record declaring an exposure is a record. **A quadrant that restated
 * another quadrant would not be a second kind of fact**; none of them does.
 *
 * ============================ TWO EXPECTATIONS THE MEASUREMENT REFUSED ========================
 *
 * **2020 DOES NOT SHOW MEASUREMENT THINNING DURING THE SHOCK.** Of the series running through it,
 * 34 per cent published nothing that year — against 36 per cent in 2019 and 33 in 2021. Flat. What
 * 2020 shows is **change**, not absence: 23 seams and 23 records beginning, both near the top of
 * the range. The page says the true thing.
 *
 * **2014's WALL IS PARTLY A DATING CONVENTION.** 14 of its 33 records are dated exactly `2014-05`,
 * the start of the term, which is a boundary marker rather than fourteen things happening in May.
 * The year page says so, because a reader counting records per year is otherwise counting the
 * corpus's filing habit and being told it is history.
 *
 * ============================ WHAT A YEAR PAGE IS NOT =========================================
 *
 * **Records beginning in a year are not records ABOUT that year**, and no year carries a total.
 * A year is a cross-section of the record, and the four counts are four different kinds of fact —
 * what was announced, what was measured, what changed basis, what was happening — not four scores
 * that could be added. There is no ranking of years and no year is better than another.
 *
 * ============================ THE STANDFIRSTS =================================================
 *
 * Authored, one per year, from that year's records, each naming the ids it draws on — the same rule
 * as the domain periods and for the same reason: a generated summary makes thirteen identical
 * shells. **Where a year has no distinctive shape the standfirst says so** rather than manufacturing
 * one; 2015 being quiet on announcement while measurement continued is a real thing to notice.
 */
export type YearNote = {
  /** One paragraph. Rendered as plain text — no markdown, asserted by the period-verdict probe. */
  body: string;
  /** Ledger ids this standfirst draws on. Required: prose with no record behind it is opinion. */
  from: string[];
};

export const YEAR_NOTES: Record<number, YearNote> = {
  2014: {
    body:
      'The largest intake of any year here, and part of it is a filing convention rather than an event: 14 of the 33 records beginning in 2014 are dated to May, the start of the term, because that is when the thing they describe begins rather than a day on which something happened. What is genuinely concentrated is announcement — Make in India with a number and a date, the highway programme, Swachh Bharat, Jan Dhan and the digital stack — and exposure, since 22 of these records go on to declare an exogenous event bearing on them, more than any other year. Measurement is unremarkable: 110 observations and three declared seams.',
    from: ['L-0016', 'L-0044', 'L-0035', 'L-0029'],
  },
  2015: {
    body:
      'The quietest year for announcement in the record and one of the loudest for basis change, which is exactly the combination a year page exists to show. Nine records begin — inflation targeting given statutory form, the Asset Quality Review, bank recapitalisation, the housing mission — against 17 declared seams, most of them in federal transfers as the Fourteenth Finance Commission award took effect and the divisible pool began to be reported differently. Nothing about the second fact is visible in the first, and neither is a measure of the other.',
    from: ['L-0014', 'L-0023', 'L-0026', 'L-0037'],
  },
  2016: {
    body:
      'Sixteen records begin and the year is dominated by one of them. The note withdrawal of November 2016 is scored failed on the limb its own announcement led with, since 99.3 per cent of the notes returned. Around it: the Insolvency and Bankruptcy Code, Ujjwala, the regional-connectivity scheme, and the commitment to double farmers’ income by 2022 — which is scored failed for a reason belonging to a later year, because the survey that would have measured its terminal year was never repeated. Eleven seams, most in the learning surveys.',
    from: ['L-0011', 'L-0024', 'L-0034', 'L-0054', 'L-0067'],
  },
  2017: {
    body:
      'The Goods and Services Tax began on 1 July and most of what else starts here is measurement changing under it. Thirteen seams, including the shift from the Employment-Unemployment Survey to the Periodic Labour Force Survey, which breaks eight employment series at exactly this point and is why figures either side of it are not the same measurement. The compensation guarantee written to make the tax acceptable to the states begins here too, and is contested. Electoral bonds were introduced through a Finance Act as a Money Bill.',
    from: ['L-0012', 'L-0058', 'L-0158', 'L-0077'],
  },
  2018: {
    body:
      'The year of the peak and of the fewest seams outside 2014 — five. Reported public-sector gross NPAs reached 14.58 per cent on a global-operations basis in March, the top of a rise the record attributes to recognition rather than deterioration, and IL&FS collapsed in September. Twelve records begin, several of them about what cannot be counted: AFSPA sanction requests from Jammu and Kashmir, fifty over three decades and none granted, and two J&K security quantities losing their only legislative route when the assembly was suspended.',
    from: ['L-0023', 'L-0027', 'L-0032', 'L-0122', 'L-0123'],
  },
  2019: {
    body:
      'Twenty-one records begin, and the cluster around 5 and 6 August is the densest single event in this corpus — the constitutional change, the communications blackout with four defensible durations, ten official figures across five different objects for the detentions, and seven commissions wound up by seven consecutive orders in October. Away from it: the corporate rate cut, scored failed on the investment response it was announced to produce; the four labour codes, still too-early; and the RTI amendment moving Information Commissioners’ tenure into rules.',
    from: ['L-0125', 'L-0136', 'L-0133', 'L-0149', 'L-0013', 'L-0061', 'L-0085'],
  },
  2020: {
    body:
      'The expectation is that measurement thinned in the pandemic year and it did not. Of the series running through 2020, 34 per cent published nothing for it — against 36 per cent in 2019 and 33 in 2021. What 2020 shows instead is change: 23 declared seams and 23 records beginning, both near the top of the range. The contraction is contested here rather than settled, on how much was the virus and how much the lockdown design. The three farm laws begin their passage, protest and repeal — the only record in this corpus scored reversed — and the migrant exodus is entered with no measurement at all, because none was maintained.',
    from: ['L-0020', 'L-0066', 'L-0064'],
  },
  2021: {
    body:
      'Eighteen records begin and the year has no single centre. The bank privatisation programme is announced and is scored failed on the five years since; the capital-expenditure push is contested, because spending and execution moved in opposite directions; and the Glasgow climate set arrives, five commitments that this instrument scores four different ways. Three records here are about a series ceasing to be usable rather than about a policy: AISHE ceasing to be timely, the Union keeping no shutdown count because police is a State subject, and five action verbs under Article 281 with no definitions.',
    from: ['L-0030', 'L-0057', 'L-0221', 'L-0223', 'L-0224', 'L-0225', 'L-0103', 'L-0138', 'L-0154'],
  },
  2022: {
    body:
      'The fewest records of any year but one, and the most declared seams of any year at all — ten against 25. Almost none of the seams belongs to a policy: the learning surveys re-based, and the corpus’s comparability broke in more places this year than in the year of the pandemic. It is also the only year alongside 2023 in which no record beginning declares an exposure to an exogenous event, which is a fact about what was entered rather than about the world. What did begin: the PMLA architecture upheld, sedition kept in abeyance and then replaced, UDISE+ moving to individual student records with 1.7 crore enrolments disappearing from the count, and the delimitation of Jammu and Kashmir producing one Commission table and three different readings of it.',
    from: ['L-0075', 'L-0082', 'L-0093', 'L-0141'],
  },
  2023: {
    body:
      'Nine records, the joint fewest, and three of them are about a published quantity ceasing to mean what it meant: MHA’s civilians-killed column changing basis, three numbers for one flow of centrally sponsored money with only one audited, and the India-China deficit having two official values. The measures that fell in this year fell in court — the IT Rules fact-check unit struck down, the Delhi services holding overturned by statute in eight days. The national accounts seams that dominate this year’s eight belong to the GDP regimes rather than to anything announced.',
    from: ['L-0112', 'L-0174', 'L-0080', 'L-0165'],
  },
  2024: {
    body:
      'The best-measured year in the record — 148 observations, more than any other — and a thin year for announcement at eleven records. Read those two together rather than separately: the publishing catches up with years already past, so a high observation count is not a statement that more happened. Electoral bonds were struck down seven years after introduction. The multidimensional poverty exit claim is contested on what an exit from that index means, and the Jammu and Kashmir election produced four official values for one turnout figure.',
    from: ['L-0043', 'L-0077', 'L-0142'],
  },
  2025: {
    body:
      'Observations fall to 90 from 148, and the fall is the publication frontier arriving rather than measurement stopping: most annual series have no 2025 figure yet because the figure does not exist yet. Fifteen records begin, weighted towards the external — the fifty per cent tariff wall, the Indus Waters Treaty in abeyance, trade suspended, and the debt-restructuring instrument named. MGNREGA is repealed in December, scored too-early, which is a statement about the clock and not about the repeal.',
    from: ['L-0184', 'L-0216', 'L-0217', 'L-0169', 'L-0212'],
  },
  2026: {
    body:
      'Five observations, and the year is unfinished rather than unmeasured — seventeen records begin in it, more than in 2022, 2023 or 2024. That divergence is the whole point of showing the four counts apart: a year can be dense in what happened and near-empty in what has been published about it, and a single figure would hide one behind the other. What begins here includes the third GDP base, the Expected Credit Loss transition, two trade agreements in force or concluded, and the certificate the Constitution makes final produced for the first time in seventy years.',
    from: ['L-0022', 'L-0033', 'L-0204', 'L-0155'],
  },
};
