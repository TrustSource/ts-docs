# Endpoint Reference

The reference for request and response schemas is the OpenAPI specification of the v2 API. Use these sources:

- **Interactive API documentation** — select the **API documentation** icon in the right-hand icon bar of ***TrustSource***. It is generated from the OpenAPI specification and lets you try calls. See [API Documentation Browser](../08-personal/05-api-documentation.md).
- **Endpoint groups** — the pages under [Endpoint groups](endpoints/index.md) list every operation by topic, with its purpose, the key scopes that may call it and notes on behaviour.
- **API scopes** — [API scopes](../10-roles-permissions/09-api-scopes.md) shows which scope may call which operation.

The base URL is `https://api.trustsource.io/v2`. The version belongs to the base URL only; endpoint paths never contain it (for example `/core/projects`).

## Endpoint groups

The v2 specification groups its operations under these tags:

Account, Releases, Risks, Check, Approval, Company, Projects, Modules, Products, Users, Scans, Tests, Reports, DeepScan, Vulnerabilities, EUVD, EPSS, PSIRT, CSAF, Threat Modeling, OBOM.

Some groups need a license feature: Tests (`sarif`) and OBOM (`obom`) are checked on every call, CSAF (`csaf`) when you create a document. See [License Features](../10-roles-permissions/07-license-features.md).

## Related

- [Authentication](01-authentication.md) — the `x-api-key` header
- [Errors & Responses](02-error-handling.md)
- [Example: curl](04-examples-curl.md)
- [API Structure](06-api-structure.md)
