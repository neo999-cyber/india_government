# Security headers — what is set, and the two that cannot be tightened here

Set in `vercel.json`, applied to every response. Written 2026-08-13 after an external audit reported
CSP, `frame-ancestors`, `Permissions-Policy` and COOP all absent.

## What each one is doing

| header | value | why |
|---|---|---|
| `Content-Security-Policy` | see below | the resource policy |
| `X-Frame-Options` | `DENY` | belt to CSP's brace — `frame-ancestors` is authoritative in modern browsers, this covers the rest |
| `Cross-Origin-Opener-Policy` | `same-origin` | severs the opener relationship |
| `Permissions-Policy` | every feature `()` | this site uses no device API of any kind, so all are denied by name |
| `Referrer-Policy` | `no-referrer` | already present |
| `X-Content-Type-Options` | `nosniff` | already present |
| `Strict-Transport-Security` | Vercel's, 2 years, preload | not set here |

## The CSP, and the one directive that is weaker than it looks

```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self';
media-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none';
frame-ancestors 'none'; upgrade-insecure-requests
```

**`script-src` carries `'unsafe-inline'` and that is a real weakening, stated rather than buried.**
The landing page alone emits 22 inline `<script>` blocks — Next's RSC payload pushes — and 20 inline
`style` attributes from the chart components. **The fix for inline script is a per-response nonce,
and a static export has no response to put one in.** `'strict-dynamic'` does not help without a
nonce. So the honest position is: this CSP does not stop injected inline script, and the directives
that ARE load-bearing here are the others.

**What it does bind, and it is not nothing on a site of this shape:** no external origin may be
fetched for script, style, font, image, media or XHR; no plugin content; no `<base>` rewriting; **no
form may submit anywhere**, which matters because this site has no forms at all and a CSP is how you
say so; and it cannot be framed.

**Measured before it was written, not assumed.** The only external origins in the built HTML are
`cdnbbsr.s3waas.gov.in`, `cea.nic.in`, `coal.gov.in`, `data.worldbank.org` and `web.archive.org`,
and every one is a link destination in a citation rather than a resource load. Fonts are self-hosted
at build time. So `default-src 'self'` costs nothing.

## What is deliberately NOT changed

**`Access-Control-Allow-Origin: *`** is returned by the deployment and stays. `/data/v1/` is a
published contract with a stated version — it is meant to be fetched by other people, and removing
the header would break that on purpose. It exposes no private data because there is none.

**`X-Robots-Tag: noindex, nofollow`** stays until the distribution question is answered. It is a
product decision, not a security one.
