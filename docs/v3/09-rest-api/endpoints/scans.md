# Scans

> Submit scan data from CI/CD pipelines, list historical scans, inspect individual scan results, and re-process scans when policy or component data changes.

## Use cases

- Push a new scan from a build pipeline after every successful build.
- Query the latest scans for a project to drive a dashboard.
- Re-process an existing scan after a policy change without re-submitting the data.
- Retrieve the list of binaries linked to a scan.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/scans` | List scans | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/scans` | Submit scan | `developer`, `manager` |
| GET | `/core/scans/{scan_id}` | Get scan details | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/scans/{scan_id}/reprocess` | Reprocess scan | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/scans/{scan_id}/binaryLinks` | Get scan binary links | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/scans/{scan_id}/binaryLinks` | Update scan binary links | `developer`, `manager`, `compliance_manager` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Module naming

Every upload path resolves a module name to a module by **exact string match** within the project. It is not normalised, case-folded or fuzzy-matched.

If a dependency scan or SBOM import names a module after its package manifest, for example `@my-org/billing-service`, and a separate SARIF upload sends the checkout folder name `billing-service`, the two uploads create two different modules. The upload succeeds, but neither module is complete.

Use the same module name on every upload path, copied from the module as ***TrustSource*** records it, or send `moduleId` instead. A `moduleId` always wins and skips name matching.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Imports](imports.md) — CycloneDX / SPDX import endpoints (structurally similar to scan submission)
- [Modules](modules.md) — the container scans attach to
- [Projects](projects.md) — higher-level aggregation
- [Tests (SARIF)](tests.md) — must use the same module name as this path
- [Scans](../../02-inbound/03-cicd-scan.md) — UI-side documentation
- [Endpoint groups](index.md)
