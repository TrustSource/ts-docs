# API structure

The ***TrustSource CE*** API is more than a plain REST API for your data. You can drive a complete release, from the scan to the approval and the published documents, without logging in to the application.

The operations fall into two building blocks. The path prefix tells you which block you are calling.

| Block | Path prefix | What it gives you |
|---|---|---|
| **Core** | `/core` | Projects, modules, products, scans, SBOM imports, SARIF tests, reports, risks and users. |
| **Compliance** | `/compliance` | Compliance checks, approvals, release documents, the CSAF feed and the company FOSS liaison. |

The account check `GET /account/authorization` sits under `/account`.

Every operation, its method and its path are listed in the [endpoint groups](endpoints/index.md).

## Core

Core reaches everything inside the application: projects, modules, scans and the reports built on them. It also covers products, risks with their tasks and countermeasures, and the imports for CycloneDX, SPDX and SARIF.

## Compliance

Compliance is the part you use to prove your results to third parties. It covers:

- **Checks** of licenses and components against a project's and module's legal settings, for IDE and build plugins.
- **Approvals** that release a module.
- **Release documents**: SBOM, notice file and CSAF VEX of an approved release, served through [release keys](../06-administration/04b-release-keys.md).
- The key-scoped **CSAF feed**.
- The **FOSS liaison** details of your company.

## Not in TrustSource CE

The v2 API of the TrustSource SaaS has further groups that ***TrustSource CE*** does not include: DeepScan (`/repository`), vulnerability lookups (`/vulnerabilities`, `/euvd`, `/epss`), PSIRT (`/psirt`), CSAF document creation, OBOM, threat models and API usage statistics. Calls to these paths answer `404`. See [CE and SaaS compared](../13-ce-vs-saas.md).

## Limits

- **Upload size.** File uploads are limited by `TS_UPLOAD_MAX_MB` (default 50 MB). Larger uploads are refused with `413`. JSON request bodies are limited to 5 MB.
- **Rate limit.** There is none in the app. Limit requests at your reverse proxy if needed.

See [Errors & Responses](02-error-handling.md).

## Try the API

The application contains the interactive API documentation. Select the **API documentation** icon in the right-hand icon bar. See [API Documentation Browser](../08-personal/05-api-documentation.md).

## Related

- [Authentication](01-authentication.md)
- [Endpoint Reference](03-endpoint-reference.md)
- [API scopes](../10-roles-permissions/09-api-scopes.md)
