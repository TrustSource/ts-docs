# Repository (Deep Scan)

> Submit repositories for source-level deep scanning, fetch the results, and poll the scan status — the API behind the Repositories and Bulk Repositories features.

## Use cases

- Orchestrate a deep scan from an external scheduler rather than the UI.
- Drive a CI/CD step that triggers a deep scan on every new branch.
- Poll the status of a long-running bulk scan and consume the results when ready.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| POST | `/repository/scan` | Create deep scan | See [API scopes](../../10-roles-permissions/09-api-scopes.md#operations-without-a-verified-scope) |
| GET | `/repository/results` | Get deep scan results URL | See [API scopes](../../10-roles-permissions/09-api-scopes.md#operations-without-a-verified-scope) |
| GET | `/repository/status` | Get deep scan status | See [API scopes](../../10-roles-permissions/09-api-scopes.md#operations-without-a-verified-scope) |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Repository scans](../../02-inbound/05-repository-scans.md)
- [Mass scans](../../02-inbound/06-mass-scans.md)
- [Scans](scans.md)
- [Endpoint groups](index.md)
