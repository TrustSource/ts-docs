# Endpoint Reference

The reference for request and response schemas is the OpenAPI 3.0 specification of the v2 API, shipped with every installation. Use these sources:

- **Interactive API documentation** - select the **API documentation** icon in the right-hand icon bar of ***TrustSource CE***. It is generated from the specification and lets you try calls against your own installation. See [API Documentation Browser](../08-personal/05-api-documentation.md).
- **The specification file** - `https://<your-host>/api-v2/openapi.yaml`, for code generators and API clients.
- **Endpoint groups** - the pages under [Endpoint groups](endpoints/index.md) list every operation by topic, with its parameters, the key scopes that may call it and notes on behaviour.
- **API scopes** - [API scopes](../10-roles-permissions/09-api-scopes.md) shows which scope may call which operation.

The base URL is `https://<your-host>/api/v2`. The version belongs to the base URL only; endpoint paths never contain it (for example `/core/projects`).

## Endpoint groups

The specification groups its 90 operations under these tags:

Account, Releases, CSAF, Check, Approval, Company, Projects, Modules, Products, Users, Scans, Tests, Reports, Risks.

There are no license features or plan limits in ***TrustSource CE***. Every operation is available; access depends only on the key's scope.

## Naming conventions

- Path parameters use snake_case (`project_id`), query parameters use camelCase (`projectId`).
- List endpoints take `page` (starting at 1) and return a plain JSON array of up to 100 entries. There is no total count; request the next page until you get fewer than 100 entries.

## Related

- [Authentication](01-authentication.md) - the `x-api-key` header
- [Errors & Responses](02-error-handling.md)
- [Example: curl](04-examples-curl.md)
- [API Structure](06-api-structure.md)
