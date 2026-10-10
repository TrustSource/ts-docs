# Endpoint Reference

The endpoint reference is not duplicated in this help. Use these sources:

- **Interactive API documentation** — open **API docs** in the right-hand icon bar of ***TrustSource*** (see [API Documentation Browser](../08-personal/05-api-documentation.md)). It is generated from the OpenAPI specification and lets you try calls.
- **API documentation site** — <https://trustsource.github.io/api-docs/> covers key management, roles and scopes, API structure, analytics, use cases and release keys.

The base URL is `https://api.trustsource.io/v2`. The version belongs to the base URL only; endpoint paths never contain it (for example `/core/projects`).

## Endpoint groups

The v2 specification groups its operations under these tags:

Account, Releases, Risks, Check, Approval, Company, Projects, Modules, Products, Users, Scans, Tests, Reports, DeepScan, Vulnerabilities, EUVD, EPSS, PSIRT, CSAF, Threat Modeling, OBOM.

Some groups need a license feature: Tests (`sarif`), Risks (`risks`), Products (`products`), Threat Modeling (`threat`), CSAF (`csaf`), PSIRT (`psirt`) and OBOM (`obom`). See [License Features](../10-roles-permissions/07-license-features.md).

## Related

- [Authentication](01-authentication.md) — the `x-api-key` header
- [Errors & Responses](02-error-handling.md)
- [Example: curl](04-examples-curl.md)
