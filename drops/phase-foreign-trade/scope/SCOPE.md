# Phase 14 — foreign policy and trade. Scope note.

## Domain enum: no gap, no amendment

`foreign` reads "trade, external balances and relations with other states." Every arc in the brief
falls inside it. **No new domain value.** The brief conditioned an amendment record on a gap
existing and there is none.

Procurement filing, per the brief's rule, against the existing enum:

| claim shape | domain | lens |
|---|---|---|
| acquisition cost, capital-budget share, payment schedule, cost escalation | `macro` | `defence-sector` |
| indigenisation share, offsets, export targets, DAP domestic content | `foreign` (import substitution and export promotion are trade) | `defence-sector` |
| a G2G deal read as a diplomatic instrument | `foreign` | `defence-sector` + counterparty |

`defence` keeps phase 11's scope: armed conflict and counter-insurgency. Agnipath is personnel
policy, not procurement, and is out of the phase.

## Lens vocabulary, declared up front

`defence` was checked against the schemas and is **not** a lens value, so the brief's second branch
applies: the lens is `defence-sector`.

| value | in batch | criterion |
|---|---|---|
| `defence-sector` | 1 | subject is the armed forces, the defence industry, or defence procurement, whatever domain it files |
| `united-states` | 1 | the US as counterparty |
| `russia` | 1 | Russia as counterparty |
| `china` | 2 | the PRC as counterparty — the conflict itself stays phase 11's |
| `neighbourhood` | 2 | the South Asian neighbourhood as ONE object; the region is the stated policy object |
| `europe` | 3 | EU, UK and EFTA — one negotiating arc |

**A lens is admitted when its records land, not when it is planned.** The last three are not in the
enum yet. `lens-empty` in `domain-coverage` enforces it.

**A counterparty lens is declared only where the instrument holds a FILE** — several records read
together because the counterparty is itself the policy object. UAE CEPA and Australia ECTA get none.

## Record-level collisions found before authoring

- **L-0021** "US tariffs on Indian goods" — seed phase, T4 sources, `confidence: low`, and its
  current-state claim is superseded. Batch 1 does not amend or duplicate it; the correction is owed
  in a following cycle and is logged.
- **L-0018** "RCEP withdrawal" — arc D's material, and it already carries EFTA/UK in passing. Batch 3.
- **L-0016**, **L-0068**, **L-0028**, **L-0008**, **L-0009**, **L-0053** — the other six `foreign`
  records. L-0009 gained the `defence-sector` lens (it carries the `defence` domain); none was
  otherwise touched.

## Out of scope, per the brief

Delimitation (→ the `representation` slot, recorded in the verification log because this repository
has no roadmap file); census; women's reservation; Agnipath; the Kashmir conflict arc; the 2025
conflict; the back-link candidates; the 313 bare roots; B-4; the Gazette task; L-0086, L-0092,
L-0183; busy.in and nrega.nic.in.
