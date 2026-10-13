# Endpoint groups

The v2 API of ***TrustSource CE*** has 90 operations. These pages group them by topic. Each page lists the operations of its group with their parameters, the key scopes that may call them and notes on behaviour that the specification does not spell out.

## The specification

The OpenAPI specification is the reference for the full request and response schemas. You can read it as interactive documentation in the app: select the **API documentation** icon in the right-hand icon bar. See [API Documentation Browser](../../08-personal/05-api-documentation.md). The raw file is at `https://<your-host>/api-v2/openapi.yaml`.

The base URL is `https://<your-host>/api/v2`. Paths on these pages never contain the version. Send your key in the `x-api-key` header, except on the routes that take a key in the path.

## Groups

| Group | Path prefix | Operations |
|---|---|---|
| [Authorization](authorization.md) | `/account` | 1 |
| [Projects](projects.md) | `/core` | 12 |
| [Modules](modules.md) | `/core` | 9 |
| [Products](products.md) | `/core` | 16 |
| [Scans](scans.md) | `/core` | 6 |
| [Imports (CycloneDX, SPDX)](imports.md) | `/core` | 5 |
| [Tests (SARIF)](tests.md) | `/core` | 4 |
| [Reports](reports.md) | `/core` | 8 |
| [Risks](risks.md) | `/core` | 15 |
| [Users](users.md) | `/core` | 1 |
| [Compliance check](compliance-check.md) | `/compliance` | 2 |
| [Compliance approvals](compliance-approvals.md) | `/compliance` | 4 |
| [Compliance releases](compliance-releases.md) | `/compliance` | 4 |
| [CSAF feed](compliance-csaf-feed.md) | `/compliance` | 2 |
| [Company FOSS](compliance-foss.md) | `/compliance` | 1 |

## Reading the pages

- **Scopes** lists the key scopes that may call an operation. A key with none of them gets `403` `"API-key scope is limited"`. "Any valid key" means no scope check.
- **Company scope.** Every operation is restricted to the company of the key. An id from another company is treated as unknown and answers `404` (the SARIF upload answers `403` for a foreign `scanId` or `analysisId`).
- **Paging.** List operations take `page` (starting at 1) and return a plain array of up to 100 entries.

## Related

- [API Structure](../06-api-structure.md)
- [Authentication](../01-authentication.md)
- [Errors & Responses](../02-error-handling.md)
- [API scopes](../../10-roles-permissions/09-api-scopes.md)
