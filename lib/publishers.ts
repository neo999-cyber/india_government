import { citations, type Citation } from '@/lib/data';

/**
 * WHO PUBLISHED IT — resolving the citation strings to the bodies behind them.
 *
 * ============================ THE DEFECT THIS ADDRESSES ========================================
 *
 * `sources[].name` is free text, and across 1,205 citations it holds **546 distinct leading
 * segments**. The same body appears under several of them:
 *
 *   · `Ministry of Human Resource Development` and `Ministry of Education` — one ministry, renamed
 *     in July 2020, sitting as two unlinked strings;
 *   · `MHA` and `Ministry of Home Affairs` — one body, two spellings, 50 citations between them;
 *   · `CAG` and `Comptroller and Auditor General of India`;
 *   · `Ministry of Commerce and Industry` and `Ministry of Commerce & Industry`, differing by one
 *     character.
 *
 * An external review read this as an entity-resolution gap and it is one. But browsing is the
 * smaller half of the argument.
 *
 * ============================ WHY IT IS A METHOD PROBLEM, NOT A NAVIGATION ONE =================
 *
 * **RULING 1a'S INDEPENDENCE TEST IS A TEST ON THE PUBLISHER**, and it turns on a distinction that
 * lives, today, only inside a free-text string a human has to read: the same figure computed by
 * the same regulator qualifies when it appears in that regulator's own statutory report and does
 * not when it appears in a release arguing the government's case. **84 citations across all three
 * layers are served by the Press Information Bureau** — the paradigm failing case — and the corpus
 * expresses that as the substring `PIB / `.
 *
 * *(Scope, because a count without one is wrong by an amount nobody can see: 84 is what
 * `publisherRollups()` resolves as PIB-carried by LEADING SEGMENT across ledger, provenance and
 * series. A looser scan for `PIB` anywhere in a ledger `sources[].name` returns 91. Both are true
 * of different questions and only the first is what this module acts on.)*
 *
 * So this module keeps the CARRIER and the BODY apart rather than merging them. `PIB / Ministry of
 * Power` resolves to *body: Ministry of Power, carried by: PIB*, and both are shown. Collapsing it
 * to "Ministry of Power" would erase exactly the distinction Ruling 1a is made of — the entity
 * resolution would have destroyed the thing it was supposed to serve.
 *
 * ============================ WHAT IT ASSERTS, AND WHAT IT REFUSES TO GUESS ====================
 *
 * **Every merge is authored and carries its reason.** Saying two strings are one body is a claim
 * about the world; a fuzzy matcher would make thousands of those claims silently and be right most
 * of the time, which is the worst available outcome — a partial match invites a theory, and the
 * theory then explains away the part that does not fit. So each entity lists the exact strings it
 * absorbs and says why they are the same body.
 *
 * **Nothing is merged on similarity.** The four Finance Commissions are the clearest case: the
 * Thirteenth, Fourteenth, Fifteenth and Sixteenth share almost all of their name and are
 * constitutionally SEPARATE bodies with different members, terms of reference and reports. Any
 * name-similarity rule merges them. They stay four.
 *
 * **What does not resolve is reported, not hidden.** Most of those 546 segments are document
 * titles rather than publishers — `The Constitution of India`, `Lok Sabha Unstarred Question No.
 * 5783`, `Union Receipt Budget 2026-2027`. The unresolved count is published beside the resolved
 * one, because a coverage figure with an unstated scope is wrong by an amount nobody can see.
 *
 * **This asserts nothing about independence per record.** Ruling 1a tests the PUBLICATION, and the
 * same body produces qualifying and non-qualifying documents in the same month. Knowing who
 * published a document is the input to that test, never the answer.
 */

export type Publisher = {
  id: string;
  /** Current name. Where a body was renamed, this is the name it holds now. */
  name: string;
  kind: 'union-ministry' | 'constitutional' | 'regulator' | 'statistical' | 'carrier' | 'court' | 'multilateral' | 'non-state';
  /**
   * Exact leading segments absorbed by this entity, as they appear in `sources[].name`. Matched
   * case-insensitively, either whole or followed by a non-word character — never as a loose
   * substring, so `CEA` cannot swallow `CETE`.
   */
  aka: string[];
  /** Why these strings are one body. Required: a merge is a claim and carries its ground. */
  why: string;
};

/**
 * THE TABLE. Every entry was built by enumerating the corpus's own strings, not from memory of
 * which ministries exist. An entity is here because two or more citation strings refer to it, or
 * because it is a carrier whose presence changes how a citation is read.
 */
export const PUBLISHERS: Publisher[] = [
  {
    id: 'pib',
    name: 'Press Information Bureau',
    kind: 'carrier',
    aka: ['PIB'],
    why:
      'The government\'s publicity arm. It is a CARRIER, not a source: a PIB release reproducing a ' +
      'regulator\'s figure is still a document written to make a case, which is why Ruling 1a fails ' +
      'it as independent evidence whoever computed the number. Citations of the form "PIB / X" are ' +
      'attributed to X as the body and to PIB as the carrier, and both are shown.',
  },
  {
    id: 'mha',
    name: 'Ministry of Home Affairs',
    kind: 'union-ministry',
    aka: ['Ministry of Home Affairs', 'MHA'],
    why: 'One ministry under an abbreviation and its full name. No rename is involved.',
  },
  {
    id: 'moe',
    name: 'Ministry of Education',
    kind: 'union-ministry',
    aka: ['Ministry of Education', 'Ministry of Human Resource Development', 'MHRD'],
    why:
      'The Ministry of Human Resource Development was renamed the Ministry of Education in July ' +
      '2020 under the National Education Policy. Same ministry, same functions, same allocations — ' +
      'so a series or a record citing the old name and one citing the new name cite one body. ' +
      'Without this the education record breaks in two at an administrative boundary that changed ' +
      'nothing about what was measured.',
  },
  {
    id: 'cag',
    name: 'Comptroller and Auditor General of India',
    kind: 'constitutional',
    aka: ['CAG', 'Comptroller and Auditor General of India'],
    why:
      'One constitutional auditor under an abbreviation and its full name. Its performance audits ' +
      'are the paradigm qualifying source under Ruling 1a — it reports to Parliament on its own ' +
      'initiative — which makes distinguishing it from a ministry that cites it worth doing.',
  },
  {
    id: 'rbi',
    name: 'Reserve Bank of India',
    kind: 'regulator',
    aka: ['RBI', 'Reserve Bank of India'],
    why:
      'One central bank under an abbreviation and its full name. Whether a given RBI document is ' +
      'independent evidence is a question about that DOCUMENT under Ruling 1a — the Financial ' +
      'Stability Report qualifies, a joint release with a ministry does not — and this resolution ' +
      'does not answer it.',
  },
  {
    id: 'mospi',
    name: 'Ministry of Statistics and Programme Implementation',
    kind: 'statistical',
    aka: ['MoSPI', 'Ministry of Statistics and Programme Implementation', 'NSO', 'National Statistical Office'],
    why:
      'The ministry and the National Statistical Office within it publish the national accounts and ' +
      'the Periodic Labour Force Survey under both names. The three GDP base regimes are all its ' +
      'publications.',
  },
  {
    id: 'ncrb',
    name: 'National Crime Records Bureau',
    kind: 'statistical',
    aka: ['NCRB', 'National Crime Records Bureau'],
    why: 'One bureau under an abbreviation and its full name; "Crime in India" is its annual title.',
  },
  {
    id: 'cea',
    name: 'Central Electricity Authority',
    kind: 'statistical',
    aka: ['CEA', 'Central Electricity Authority'],
    why:
      'One authority under an abbreviation and its full name. Matched whole or on a word boundary ' +
      'so it cannot absorb CETE (TISS), which is a different body entirely.',
  },
  {
    id: 'mod',
    name: 'Ministry of Defence',
    kind: 'union-ministry',
    aka: ['Ministry of Defence', 'MoD'],
    why: 'One ministry under an abbreviation and its full name.',
  },
  {
    id: 'mocommerce',
    name: 'Ministry of Commerce and Industry',
    kind: 'union-ministry',
    aka: ['Ministry of Commerce and Industry', 'Ministry of Commerce & Industry', 'DPIIT'],
    why:
      'Two spellings of one ministry, differing by a single character, plus the Department for ' +
      'Promotion of Industry and Internal Trade within it. A name that differs by an ampersand is ' +
      'the cheapest possible entity-resolution failure and it was live in the corpus.',
  },
  {
    id: 'mopower',
    name: 'Ministry of Power',
    kind: 'union-ministry',
    aka: ['Ministry of Power'],
    why:
      'Listed because its citations arrive by two routes — directly, and carried by PIB — and the ' +
      'two are not the same evidence under Ruling 1a even when the figure is identical.',
  },
  {
    id: 'morurald',
    name: 'Ministry of Rural Development',
    kind: 'union-ministry',
    aka: ['Ministry of Rural Development'],
    why: 'Listed for the same reason as the Ministry of Power: most of its citations are PIB-carried.',
  },
  {
    id: 'mof',
    name: 'Ministry of Finance',
    kind: 'union-ministry',
    aka: ['Ministry of Finance', 'Department of Economic Affairs', 'Department of Expenditure'],
    why:
      'The ministry and the two departments within it that publish the budget documents and the ' +
      'expenditure profiles cited here.',
  },
  {
    id: 'sci',
    name: 'Supreme Court of India',
    kind: 'court',
    aka: ['Supreme Court of India', 'Supreme Court'],
    why: 'One court. Judgments are cited by case name elsewhere; this groups them by the deciding body.',
  },
  {
    id: 'fc16',
    name: 'Sixteenth Finance Commission',
    kind: 'constitutional',
    aka: ['Sixteenth Finance Commission'],
    why:
      'A Finance Commission is constituted afresh under Article 280 with its own members, terms of ' +
      'reference and report. The Thirteenth, Fourteenth, Fifteenth and Sixteenth are therefore FOUR ' +
      'bodies, not one under four names, and they are listed separately for that reason. Any rule ' +
      'that merged strings by similarity would collapse them, which is the argument for authoring ' +
      'this table by hand rather than matching on it.',
  },
  {
    id: 'fc15',
    name: 'Fifteenth Finance Commission',
    kind: 'constitutional',
    aka: ['Fifteenth Finance Commission'],
    why: 'A separate constitutional body from the Sixteenth — see that entry.',
  },
  {
    id: 'fc14',
    name: 'Fourteenth Finance Commission',
    kind: 'constitutional',
    aka: ['Fourteenth Finance Commission'],
    why: 'A separate constitutional body from the Fifteenth — see the Sixteenth\'s entry.',
  },
  {
    id: 'fc13',
    name: 'Thirteenth Finance Commission',
    kind: 'constitutional',
    aka: ['Thirteenth Finance Commission'],
    why: 'A separate constitutional body from the Fourteenth — see the Sixteenth\'s entry.',
  },
  {
    id: 'gstc',
    name: 'GST Council',
    kind: 'constitutional',
    aka: ['GST Council'],
    why:
      'Constituted under Article 279A. It is neither a ministry nor a regulator: it is a joint ' +
      'body of the Union and the States, which is why L-0162 can score a duty imposed ON it.',
  },
  {
    id: 'eci',
    name: 'Election Commission of India',
    kind: 'constitutional',
    aka: ['Election Commission of India', 'ECI'],
    why: 'One constitutional commission under its full name and its abbreviation.',
  },
  {
    id: 'niti',
    name: 'NITI Aayog',
    kind: 'statistical',
    aka: ['NITI Aayog', 'Niti Aayog'],
    why: 'One body, cited under two capitalisations.',
  },
  {
    id: 'morth',
    name: 'Ministry of Road Transport and Highways',
    kind: 'union-ministry',
    aka: ['MoRTH', 'Ministry of Road Transport and Highways'],
    why: 'One ministry under an abbreviation and its full name.',
  },
  {
    id: 'ppac',
    name: 'Petroleum Planning and Analysis Cell',
    kind: 'statistical',
    aka: ['Petroleum Planning and Analysis Cell', 'PPAC'],
    why: 'One cell within the Ministry of Petroleum and Natural Gas, cited both ways.',
  },
  {
    id: 'comtrade',
    name: 'UN Comtrade',
    kind: 'multilateral',
    aka: ['UN Comtrade', 'UNCTAD'],
    why:
      'The United Nations trade statistics database. It is the non-Indian side of the India-China ' +
      'trade divergence in P-119, which is what makes attributing it correctly worth doing.',
  },
  {
    id: 'ohchr',
    name: 'UN Office of the High Commissioner for Human Rights',
    kind: 'multilateral',
    aka: ['UN OHCHR', 'OHCHR'],
    why: 'One office under two forms of its name.',
  },
  {
    id: 'aser',
    name: 'ASER Centre (Pratham)',
    kind: 'non-state',
    aka: ['ASER Centre', 'ASER'],
    why:
      'A non-state survey organisation. Under Ruling 1 it is independent of the Indian state in a ' +
      'way no intra-state source is, which is precisely why the ASER-against-NAS divergence is a ' +
      'measurement dispute rather than a discrepancy to be averaged away.',
  },
  {
    id: 'gojk',
    name: 'Government of Jammu and Kashmir',
    kind: 'union-ministry',
    aka: ['Government of Jammu and Kashmir', 'Government of J&K'],
    why:
      'The territorial administration, distinct from the Ministry of Home Affairs that administers ' +
      'the Union Territory. Filed as a government body rather than a Union ministry.',
  },
  {
    id: 'satp',
    name: 'South Asia Terrorism Portal',
    kind: 'non-state',
    aka: ['South Asia Terrorism Portal', 'SATP'],
    why:
      'A non-state compiler of conflict counts. Its four citations remain T4 because the figures ' +
      'still derive from an archive snapshot rather than the page now reachable — a property of the ' +
      'retrieval, recorded on the citations themselves.',
  },
  {
    id: 'worldbank',
    name: 'World Bank',
    kind: 'multilateral',
    aka: ['World Bank', 'World Bank WDI', 'WDI'],
    why:
      'The World Development Indicators are a World Bank publication. Peer-panel series are drawn ' +
      'from it and carry a vintage under P-09, which is a property of the extract rather than of ' +
      'the publisher.',
  },
];

/** Leading institution segment of a citation name, before the first comma or dash separator. */
export const leadingSegment = (name: string): string => name.split(/,| — | – | - /)[0].trim();

const boundaryMatch = (segment: string, alias: string): boolean => {
  const s = segment.toLowerCase();
  const a = alias.toLowerCase();
  if (s === a) return true;
  return s.startsWith(a) && /[^a-z0-9]/.test(s.charAt(a.length));
};

export type Resolved = {
  citation: Citation;
  /** The body whose document this is, where the table names one. */
  body?: Publisher;
  /** A carrier that served the document — PIB today. Never merged into the body. */
  carrier?: Publisher;
  /** The leading segment as authored, kept so an unresolved citation can still be read. */
  segment: string;
};

const CARRIER_SPLIT = /^\s*([^/]+?)\s*\/\s*(.+)$/;

export function resolveCitation(c: Citation): Resolved {
  const segment = leadingSegment(c.name);
  const find = (s: string) => PUBLISHERS.find((p) => p.aka.some((a) => boundaryMatch(s, a)));

  // "PIB / Ministry of Power" — a carrier and a body, kept apart on purpose.
  const split = segment.match(CARRIER_SPLIT);
  if (split) {
    const left = find(split[1]);
    const right = find(split[2]);
    if (left?.kind === 'carrier') return { citation: c, carrier: left, body: right, segment };
    if (right?.kind === 'carrier') return { citation: c, carrier: right, body: left, segment };
    if (left || right) return { citation: c, body: left ?? right, segment };
  }

  const direct = find(segment);
  if (direct?.kind === 'carrier') return { citation: c, carrier: direct, segment };
  return { citation: c, body: direct, segment };
}

export type PublisherRollup = {
  publisher: Publisher;
  /** Citations whose BODY is this publisher — the documents it produced. */
  asBody: Resolved[];
  /** Citations this publisher merely served — non-empty only for a carrier. */
  asCarrier: Resolved[];
};

export function publisherRollups(): {
  rows: PublisherRollup[];
  total: number;
  resolved: number;
  unresolvedSegments: { segment: string; n: number }[];
} {
  const all = citations().map(resolveCitation);
  const byId = new Map<string, PublisherRollup>(
    PUBLISHERS.map((p) => [p.id, { publisher: p, asBody: [], asCarrier: [] }]),
  );

  const unresolved = new Map<string, number>();
  for (const r of all) {
    if (r.body) byId.get(r.body.id)!.asBody.push(r);
    if (r.carrier) byId.get(r.carrier.id)!.asCarrier.push(r);
    if (!r.body && !r.carrier) unresolved.set(r.segment, (unresolved.get(r.segment) ?? 0) + 1);
  }

  const rows = [...byId.values()]
    .filter((r) => r.asBody.length + r.asCarrier.length > 0)
    .sort((a, b) => b.asBody.length + b.asCarrier.length - (a.asBody.length + a.asCarrier.length));

  return {
    rows,
    total: all.length,
    resolved: all.filter((r) => r.body || r.carrier).length,
    unresolvedSegments: [...unresolved]
      .map(([segment, n]) => ({ segment, n }))
      .sort((a, b) => b.n - a.n || a.segment.localeCompare(b.segment)),
  };
}
