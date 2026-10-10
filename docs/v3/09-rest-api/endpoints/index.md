# Endpoint groups

The v2 API has 118 operations. These pages group them by topic. Each page lists the operations of its group with a short description and the key scopes that may call them, plus notes on behaviour that the specification does not spell out.

## The specification

The OpenAPI specification is the reference for request and response schemas. These pages explain what the operations are for; they do not repeat the schemas. You can read the specification as interactive documentation in the app: select the **API documentation** icon in the right-hand icon bar. See [API Documentation Browser](../../08-personal/05-api-documentation.md).

The base URL is `https://api.trustsource.io/v2`. Paths on these pages never contain the version. Send your key in the `x-api-key` header.

## Groups

| Group | Path prefix | Operations |
|---|---|---|
| [Authorization](authorization.md) | `/account` | 1 |
| [Projects](projects.md) | `/core` | 12 |
| [Modules](modules.md) | `/core` | 9 |
| [Products](products.md) | `/core` | 16 |
| [Scans](scans.md) | `/core` | 6 |
| [Imports (CycloneDX, SPDX)](imports.md) | `/core` | 5 |
| [OBOM](obom.md) | `/core` | 3 |
| [Tests (SARIF)](tests.md) | `/core` | 4 |
| [Reports](reports.md) | `/core` | 8 |
| [Risks](risks.md) | `/core` | 20 |
| [Threat models](threat-models.md) | `/core` | 5 |
| [Users](users.md) | `/core` | 2 |
| [Compliance check](compliance-check.md) | `/compliance` | 2 |
| [Compliance approvals](compliance-approvals.md) | `/compliance` | 5 |
| [Compliance releases](compliance-releases.md) | `/compliance` | 4 |
| [CSAF documents](compliance-csaf.md) | `/compliance` | 1 |
| [CSAF feed](compliance-csaf-feed.md) | `/compliance` | 2 |
| [Company FOSS](compliance-foss.md) | `/compliance` | 1 |
| [Repository (DeepScan)](repository.md) | `/repository` | 3 |
| [Vulnerabilities](vulnerabilities.md) | `/vulnerabilities` | 4 |
| [EUVD & EPSS](euvd-epss.md) | `/euvd, /epss` | 4 |
| [PSIRT](psirt.md) | `/psirt` | 1 |

## Related

- [API Structure](../06-api-structure.md)
- [Authentication](../01-authentication.md)
- [API scopes](../../10-roles-permissions/09-api-scopes.md)
