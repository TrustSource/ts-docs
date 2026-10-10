# Vulnerabilities

> Search and look up CVEs and CWEs across every ecosystem TrustSource tracks — the API behind the Vulnerability Lake.

## Use cases

- Build a CVE lookup tool that queries TrustSource instead of the public NVD directly.
- Search for every CVE affecting a specific vendor or product.
- Pull CWE details for a weakness-pattern report.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/vulnerabilities/cwes/{cwe_id}` | Get CWE details | See [API scopes](../../10-roles-permissions/09-api-scopes.md#operations-without-a-verified-scope) |
| POST | `/vulnerabilities/cveDetails` | Get CVE details | See [API scopes](../../10-roles-permissions/09-api-scopes.md#operations-without-a-verified-scope) |
| POST | `/vulnerabilities/cveFind` | Search vulnerabilities by keyword | See [API scopes](../../10-roles-permissions/09-api-scopes.md#operations-without-a-verified-scope) |
| POST | `/vulnerabilities/cveFindByKey` | Find vulnerabilities by component | See [API scopes](../../10-roles-permissions/09-api-scopes.md#operations-without-a-verified-scope) |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

EUVD id mapping and EPSS scores have their own endpoints, see [EUVD & EPSS](euvd-epss.md).

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Vulnerability Lake](../../05-knowledge/04-vulnerability-lake.md)
- [Vulnerabilities](../../03-internal/04a-vulnerability-report.md) — internal triage workspace
- [Reports](reports.md) — analytical CVE / vulnerability reports
- [EUVD & EPSS](euvd-epss.md) - CVE to EUVD id mapping and EPSS scores
- [PSIRT](psirt.md) - CSAF feed consumption
- [Endpoint groups](index.md)
