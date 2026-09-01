import Link from 'next/link';
import { ledger, provenance, series, pairs, citations } from '@/lib/data';
import contract from '@/lib/data-contract.json';
import { CorpusLd } from '@/components/StructuredData';

/**
 * `/method/#data` — THE MACHINE-READABLE LAYER, AND THE CONTRACT THAT COMES WITH SERVING IT.
 *
 * WHY THIS PAGE EXISTS RATHER THAN JUST THE FILES. A JSON endpoint with no page is a trap: a
 * consumer downloads `series.json`, sees `value: null`, and fills it with a zero — and this corpus
 * spends more of its discipline on *what a blank means* than on any other single thing. **The
 * eight statements below are not a courtesy. They are the conditions under which the numbers are
 * true**, and they are published in the manifest too, so a script that never loads this page still
 * gets them.
 *
 * ONE COPY OF THE CONTRACT. Both this page and `tools/gen-public-data.mjs` read
 * `lib/data-contract.json`. A promise stated twice is two promises, and the one nobody remembers
 * to update is always the one somebody relies on.
 *
 * WHAT IS DELIBERATELY NOT HERE. No CSV. A CSV of the ledger would have to flatten `sources[]`,
 * `unmeasured[]` and `objectives[]` into columns, and every flattening is a decision about which
 * qualification survives — a caveat truncated into a spreadsheet cell is rule 3a's failure in
 * another file format. The JSON keeps the shape the schema guarantees; a consumer who wants a
 * table makes the flattening decisions themselves, where they can see them.
 */
export function DataSection() {
  const files = [
    { name: 'ledger.json', n: ledger.length, what: 'discrete reforms, events and episodes, each with its verdict, sources and declared absences' },
    { name: 'series.json', n: series.length, what: 'indicator time series for India and the peer panel, with breaks, statuses and per-point notes' },
    { name: 'provenance.json', n: provenance.length, what: 'measurement disputes, carried as records in their own right rather than as footnotes' },
    { name: 'pairs.json', n: pairs.length, what: 'paired measurements of one quantity that disagree, with both sides and the reason where known' },
  ];
  const total = ledger.length + series.length + provenance.length + pairs.length;

  return (
    <>
      <CorpusLd />
      <h2 id="data">The data</h2>
      <p className="lede">
        The whole corpus — {total} records — as schema-validated JSON, with its schemas beside it,
        at a versioned path. Everything on this site is rendered from these files and nothing is
        computed that is not shown.
      </p>

      <h2>Files</h2>
      <div className="table-wrap" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th scope="col">File</th>
              <th scope="col">Records</th>
              <th scope="col">What it holds</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f) => (
              <tr key={f.name}>
                <td className="mono">
                  <a href={`/data/v1/${f.name}`}>/data/v1/{f.name}</a>
                </td>
                <td className="mono t-note">{f.n}</td>
                <td className="t-note">{f.what}</td>
              </tr>
            ))}
            <tr>
              <td className="mono">
                <a href="/data/v1/manifest.json">/data/v1/manifest.json</a>
              </td>
              <td className="mono t-note">—</td>
              <td className="t-note">
                counts, the commit these files were built from, and the eight statements below
              </td>
            </tr>
            <tr>
              <td className="mono">
                <a href="/data/v1/schemas/ledger.schema.json">/data/v1/schemas/</a>
              </td>
              <td className="mono t-note">4</td>
              <td className="t-note">
                the JSON Schemas every record above is validated against, on every build
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Read this before you use it</h2>
      <p>
        These are not caveats about quality. They are the conditions under which the figures mean
        what they say, and most of them exist because getting them wrong is easy and silent.
      </p>
      <ol className="contract-list">
        {contract.readThisFirst.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ol>

      <h2>What the version means</h2>
      <p>{contract.contractRule}</p>
      <p className="prose-note">
        <span className="label">Why a version at all</span>{' '}Publishing the schemas makes them a
        contract. Until now an enum could gain a value in a single commit agreed in conversation;
        the moment somebody&rsquo;s script parses <span className="mono">assessment</span>, that
        same change can break them. The path carries the version so the corpus can keep changing
        without quietly breaking anyone, and so a citation of this data says which shape it had.
      </p>

      <h2>Citing it</h2>
      <p>
        Cite the commit. The manifest carries it, every build stamps it, and it is the only thing
        that makes a figure you quote re-findable after the record is corrected — which happens,
        deliberately and often. <Link href="/corrections/">What has been corrected, and when</Link>{' '}
        is published for the same reason.
      </p>
      <p className="prose-note">{contract.licence}</p>

      <h2>What is not published here</h2>
      <p>
        <strong>No CSV.</strong> Flattening the ledger into columns means deciding which
        qualification survives the flattening, and a caveat cut to fit a cell is the one thing this
        instrument refuses everywhere else. The JSON keeps the shape the schema guarantees.
      </p>
      <p>
        <strong>No derived quantities, roll-ups or joins.</strong> {citations().length} citations
        sit inside the records that carry them rather than in a table of their own, because a
        citation away from its claim loses the thing that makes it checkable.{' '}
        <Link href="/method/#derivations">Derivations</Link> publishes the few computed figures separately,
        with the rule printed beside each one.
      </p>
      <p>
        <strong>No composite score, in any file.</strong> There is no field to build one from and no
        ranking to read off. Constructing one from these records misrepresents them —{' '}
        <Link href="/method/">how records are scored, and what a verdict does not mean</Link>.
      </p>
    </>
  );
}
