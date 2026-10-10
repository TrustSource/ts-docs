# Compliance Releases

> Fetch the downstream artefacts that ship with a release — SBOM, notice file, CSAF advisory, and CSAF change log.

## Use cases

- Pull the published SBOM for a release from a customer portal.
- Deliver the notice file to a customer-facing documentation site.
- Consume CSAF advisories via a standard feed.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/compliance/releases/{release_key}/sbom` | Get release SBOM | Release key in URL |
| GET | `/compliance/releases/{release_key}/notice` | Get release Notice | Release key in URL |
| GET | `/compliance/releases/{release_key}/csaf` | Get release CSAF/VEX | Release key in URL |
| GET | `/compliance/releases/{release_key}/csaf-changes` | Get release CSAF/VEX changes | Release key in URL |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Authentication

These operations take the release key in the URL and need no `x-api-key` header. The key's scope (`sbom`, `notice`, `csaf`) decides which documents it serves. See [Release keys](../../06-administration/04b-release-keys.md).

## Related

- [Release keys](../../06-administration/04b-release-keys.md)
- [Public routes](../05-public-routes.md)
- [Compliance approvals](compliance-approvals.md)
- [CSAF](../../04-outbound/04-csaf.md)
- [Endpoint groups](index.md)
