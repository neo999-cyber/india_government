# data/incoming

Drop zone for research sessions. Mirror the canonical layer shape:

```
data/incoming/series/<topic>.json
data/incoming/ledger/<topic>.json
data/incoming/provenance/<topic>.json
```

Then:

```bash
npm run validate:incoming   # cross-references resolve against canonical + incoming together
```

Nothing here renders. The site reads only the canonical layers, so a drop must be merged
into `data/series/`, `data/ledger/` or `data/provenance.json` before it appears — and the
merge is logged in `docs/verification-log.md`.

`.json` files in this directory are ignored by the default `npm run validate` (the build
gate), so work in progress here never blocks a deploy of already-merged data.
