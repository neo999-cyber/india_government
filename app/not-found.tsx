import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / not found
      </p>
      <h1>No such record</h1>
      <p className="lede">
        This instrument only renders records that exist in <code>/data</code> and have passed
        validation. Nothing is generated to fill a gap.
      </p>
      <p className="tag-row">
        <Link className="tag" href="/search/?layer=series">
          series
        </Link>
        <Link className="tag" href="/search/?layer=ledger">
          ledger
        </Link>
        <Link className="tag" href="/search/?layer=provenance">
          provenance
        </Link>
      </p>
    </>
  );
}
