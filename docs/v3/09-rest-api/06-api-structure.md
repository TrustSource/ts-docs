# API structure

The ***TrustSource*** API is more than a plain REST API for your data. It is also a business API: you can drive a complete release, from the scan to the approval and the published documents, without logging in to the application.

The operations fall into five building blocks. The path prefix tells you which block you are calling.

| Block | Path prefix | What it gives you |
|---|---|---|
| **Core** | `/core` | Projects, modules, products, scans, imports, OBOM, SARIF tests, reports, risks, threat models and users. |
| **DeepScan** | `/repository` | File-based assessment of repositories: start a scan, poll its status, read the results. |
| **Vulnerabilities** | `/vulnerabilities`, `/euvd`, `/epss` | CVE and CWE lookup, EUVD id mapping and EPSS scores. |
| **Compliance** | `/compliance` | Compliance checks, approvals, release documents, CSAF documents and feed, and the company FOSS summary. |
| **PSIRT** | `/psirt` | CSAF advisories for a package URL. |

The account check `GET /account/authorization` sits under `/account`.

Every operation, its method and its path are listed in the [endpoint groups](endpoints/index.md).

## Core

Core reaches everything inside the application: projects, modules, scans and the reports built on them. It also covers products, risks and threat models, and the imports for CycloneDX, SPDX, OBOM and SARIF.

## DeepScan

DeepScan runs the file-based assessments and returns their results. See [Repository (DeepScan)](endpoints/repository.md).

## Vulnerabilities

Vulnerability operations return analysis data about CVEs and CWEs. The EUVD and EPSS routes live outside `/vulnerabilities`, because a different service answers them. See [Vulnerabilities](endpoints/vulnerabilities.md) and [EUVD & EPSS](endpoints/euvd-epss.md).

## Compliance

Compliance is the part you use to prove your results to third parties. It covers:

- **Approvals** that release a module or project.
- **Release documents**: SBOM, notice file and CSAF VEX of an approved release, served through [release keys](../06-administration/04b-release-keys.md).
- **CSAF documents** and the key-scoped CSAF feed.
- The **FOSS liaison** details of your company.

## Limits

- **Upload size.** Larger uploads are refused with `413`. Ask support for the limit that applies to your account.
- **Rate limit and quota.** The API gateway applies the usage plan of your account, a request rate and a quota per period, and answers `429` when you exceed it. See [Errors & Responses](02-error-handling.md#rate-limits-and-quotas).

## Try the API

The application contains the interactive API documentation. Select the **API documentation** icon in the right-hand icon bar. See [API Documentation Browser](../08-personal/05-api-documentation.md).

## Related

- [Authentication](01-authentication.md)
- [Endpoint Reference](03-endpoint-reference.md)
- [API scopes](../10-roles-permissions/09-api-scopes.md)
