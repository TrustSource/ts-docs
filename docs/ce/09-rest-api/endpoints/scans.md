# Scans

> Submit dependency scans from build pipelines, list scans, read a scan's analysis status, reprocess a scan and manage its binary links.

## Use cases

- Push a new dependency scan from a build pipeline after every successful build (this is what `ts-scan upload` does).
- Wait for the analysis of a scan and break the build on its results.
- Reprocess an existing scan after a policy change without re-submitting the data.
- Record which binaries or images a scan belongs to.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/scans` | List scans | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/scans` | Submit scan | `developer`, `manager` |
| GET | `/core/scans/{scan_id}` | Get scan details and analysis status | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/scans/{scan_id}/reprocess` | Reprocess scan | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/scans/{scan_id}/binaryLinks` | Get scan binary links | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/scans/{scan_id}/binaryLinks` | Replace scan binary links | `developer`, `manager`, `compliance_manager` |

The full schemas are in the [OpenAPI specification](index.md#the-specification).

## Submitting a scan

`POST /core/scans` takes the dependency scan in the TrustSource format, as produced by `ts-scan scan`:

| Field | Required | Content |
|---|---|---|
| `project` | Yes | Name or id of an **existing** project |
| `module` | Yes | Module name; `moduleName` is accepted as an alias |
| `dependencies` | Yes | Dependency tree: each entry has a `name` and a `purl` (or a `key` with `versions`), nested `dependencies`, and optionally `licenses`, `checksum`, `homepageUrl`, `repositoryUrl`, `description`, `private` |
| `branch`, `tag`, `release` | No | SCM branch, tag and release identifier |
| `binaryLinks` | No | List of `{name, comment}` |

The request needs a `User-Agent` header (any value; curl and ts-scan send one). An empty header answers `400`.

| Status | Body |
|---|---|
| `201` | `{"scanId": "...", "moduleId": "..."}`, plus `warning`, `contentNotices` or `info` when something was dropped or noticed |
| `400` | Validation error, or the dependency tree is nested deeper than 80 levels |
| `404` | The project does not exist: `{"error": "Not Found", ...}` |

Notes:

- The module is created on the first scan and reused by later scans with the same name in the same project. Matching is exact; see [Module naming](modules.md#module-naming).
- The analysis runs in the background. Poll `GET /core/scans/{scan_id}` for the result.
- A `checksum` that does not match the documented format is dropped; the scan is still accepted and `warning` names the field.
- `info` reports an unknown or outdated client name in `User-Agent`. It is a notice, not an error.
- JSON bodies are limited to 5 MB. For larger SBOMs use the [file upload imports](imports.md).

## Reading a scan

`GET /core/scans/{scan_id}` returns `_id`, `projectId`, `project`, `moduleId`, `module`, `url` (link to the module in the app), `branch`, `tag`, `binaryLinks` and:

- `analysisStatus` - `In progress` until an analysis of this scan exists, then `Finished`;
- `analysisDate` and `statistics` - date and warning/violation counts of the latest analysis.

`GET /core/scans` returns up to 100 scans per page, newest first, with `_id`, `moduleId`, `project`, `module`, `branch`, `tag`, `binaryLinks`, `submitted`.

## Reprocessing

`POST /core/scans/{scan_id}/reprocess` starts a new analysis of the stored scan and answers `201` with `{"scanId": "..."}`. Use it after you changed allow and deny lists, legal settings or policies, or to fetch fresh vulnerability data.

## Binary links

`GET .../binaryLinks` returns `{"binaryLinks": [...]}`. `POST .../binaryLinks` takes `{"binaryLinks": [{"name": "...", "comment": "..."}]}`, replaces the stored list and answers `201` with `{"scanId": "..."}`. Each link records the key name as the user who added it.

## Related

- [Imports](imports.md) - CycloneDX and SPDX uploads, which create scans the same way
- [Tests (SARIF)](tests.md) - must use the same module name
- [CI/CD Scan](../../02-inbound/03-cicd-scan.md) - the scans in the app
- [Recipe: CI/CD integration](../../recipes/02-cicd-integration.md)
- [Endpoint groups](index.md)
