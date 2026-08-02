# 11 — RETRIEVAL ENVIRONMENT: what was retrieved, what was not, and what has gone

Recorded because tier attaches to the document retrieved, not to the institution. A source I could not reach is a different fact from a source that does not exist, and the two must not be conflated downstream.

## Hosts probed directly

| Host | Result | Consequence |
|---|---|---|
| `www.mha.gov.in` | **200 to curl with a browser user-agent; 403 to the standard fetcher** | All MHA Annual Reports and parliamentary-reply PDFs are retrievable. This is the single most consequential fact about this phase's evidence base and it is why parts 01 and 09 are T1 throughout. The fetcher's 403 is a user-agent block, not a takedown. |
| `nhrc.nic.in` | 200 to curl | Reachable. |
| `sansad.in` | 302, follows | Reachable with redirect-following. |
| `dataful.in` | 200 | Reachable; derivative compilation, not a primary source. |
| `www.data.gov.in` | 403 to fetcher | Dataset landing pages not retrieved. |
| **`satp.org`** | **connection failure (no HTTP response at all)** | The South Asia Terrorism Portal — the most-cited non-official instrument for this subject — **could not be reached from this environment by any method.** Any SATP figure entering this phase is RELAYED. See below. |
| **`ncrb.gov.in`** | **connection failure** | NCRB "Crime in India" volumes not directly retrievable. Custodial-death table structures and definitions therefore relayed unless recovered via archive. |
| `indiacode.nic.in` | DNS failure | The bare text of the J&K Reorganisation Act 2019 and the Protection of Human Rights Act 1993 not retrieved. Statutory quotations in part 10 are relayed and flagged as such. |
| `jkhighcourt.nic.in` | DNS failure | Same. |
| `indiankanoon.org` | 403 | Same. |
| `www.ohchr.org` | 403 to both fetcher and curl | OHCHR Kashmir reports not retrieved at the host; archive routes attempted separately. |
| `jkccs.net` | 301 redirect | See below. |

## A pattern in what is reachable and what is not

Probed in one pass, same method, same session:

| Reachable (HTTP 200) | Unreachable (no HTTP response) |
|---|---|
| `www.mha.gov.in` — Union home ministry | `jkpolice.gov.in` — J&K Police |
| `sansad.in` — Parliament | `jkhome.nic.in` — J&K Home Department |
| `nhrc.nic.in` — National Human Rights Commission | `jklegislativeassembly.nic.in` — J&K Legislative Assembly |
| `prsindia.org` | `ncrb.gov.in` |
| `acleddata.com`, `ucdp.uu.se`, `start.umd.edu/gtd` | `satp.org` |

**Every J&K territorial source failed; every Union source and every international source succeeded.** Note that `nhrc.nic.in` resolves while `jkhome.nic.in` and `jklegislativeassembly.nic.in` do not, so this is host-specific rather than a blanket `.nic.in` failure.

**I state the pattern and decline to explain it.** I cannot distinguish, from here, between these sites being down, geo-restricted, or unreachable for reasons local to this session. What follows is the operational consequence, and it is severe: **the J&K Police, the J&K Home Department and the J&K Legislative Assembly could not be examined as instruments at all in this phase.** Those are precisely the three bodies that (i) produce the figures MHA relays under "(Source: UT of J&K)", (ii) would hold any written burial order, and (iii) hold the pre-2018 assembly answers on pellets and recruitment. Every statement about them in these parts is relayed through press or through MHA. Stage 3 must not upgrade any of it.

## Two hosts whose unavailability is itself a finding

**SATP.** A complete connection failure, not a 403 or a 404. I cannot distinguish, from this environment, between the site being down, being geo-blocked, and being unreachable for network reasons local to this session. **I therefore assert nothing about SATP's availability in general** — only that this phase could not retrieve it. What follows is a hard consequence and stage 3 must honour it: SATP's counting definitions cannot be quoted verbatim in this phase, and every SATP number is T4. Reconstructing SATP's methodology from memory or from secondary description would be exactly the laundering the evidence rule forbids.

**JKCCS.** Redirects rather than resolving to its former reports. The organisation was raided by the National Investigation Agency in October 2020 and its coordinator Khurram Parvez was arrested in November 2021 — both relayed, not established here from primary documents. The relevant question for this instrument is narrower and answerable: **which specific JKCCS annual human-rights reviews are no longer retrievable at their original locations, and what did they contain.** That work sits in the rights-instruments part.

## Standing note for stage 3

Where a part below says "not retrieved", check it against this table before treating it as an absence in the world. Several items marked unretrievable here would be retrievable to a researcher with ordinary access, and an absence record built on this session's network conditions would be false. **`not-collected`, `not-published` and `withheld` are claims about a holder. Nothing in this table supports any of them.**
