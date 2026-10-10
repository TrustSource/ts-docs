# EUVD & EPSS

> Map CVE ids to ENISA EUVD ids and read FIRST's EPSS exploitation scores, for CRA reporting and risk ranking.

## Use cases

- Add the EUVD id of each CVE to a CRA vulnerability notification for ENISA.
- Rank open CVEs by how likely they are to be exploited, not only by CVSS severity.
- Watch whether the exploitation probability of a CVE is rising over time.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/euvd/{id}` | Map a CVE id to its EUVD id, or an EUVD id back to its CVE id | See [API scopes](../../10-roles-permissions/09-api-scopes.md#operations-without-a-verified-scope) |
| POST | `/euvd` | Map a list of CVE ids to EUVD ids | See [API scopes](../../10-roles-permissions/09-api-scopes.md#operations-without-a-verified-scope) |
| POST | `/epss` | Get EPSS scores for a list of CVE ids | See [API scopes](../../10-roles-permissions/09-api-scopes.md#operations-without-a-verified-scope) |
| GET | `/epss/{cve_id}/history` | Get the EPSS score history of a CVE | See [API scopes](../../10-roles-permissions/09-api-scopes.md#operations-without-a-verified-scope) |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

These routes sit outside `/vulnerabilities`: that prefix is served by the Vulnerability Lake API, a separate backend.

### EUVD ids (CRA reporting)

CRA vulnerability notifications to ENISA must carry EUVD ids, the identifiers of
ENISA's European Vulnerability Database. The two `euvd` endpoints resolve
between CVE and EUVD ids using ENISA's official `cve-euvd-mapping` catalogue,
which TrustSource refreshes daily at 07:15 UTC. An id assigned after the last
refresh is reported as unknown until the next refresh. ### EPSS scores

`epss` is FIRST's estimated probability (0 to 1) that a CVE is exploited in the
wild within the next 30 days, `percentile` its rank among all scored CVEs.
Scores come from FIRST's daily bulk feed; a CVE missing from the feed is looked
up at FIRST on the fly. 

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Vulnerabilities](vulnerabilities.md) - CVE search and CWE lookup
- [PSIRT](psirt.md) - CSAF feed consumption; CRA Art. 14 notifications need the EUVD id of each reported CVE
- [Reports](reports.md) - the vulnerability report uses the same EPSS scores
- [Endpoint groups](index.md)
