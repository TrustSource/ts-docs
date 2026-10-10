# Authorization

> Validate an API key and inspect the scope it carries before you start integrating.

## Use cases

- Verify that a newly issued API key works before wiring it into a pipeline.
- Confirm the company, projects, and modules a key is allowed to act on.
- Diagnose 401/403 errors by checking whether the key itself is the problem.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/account/authorization` | Get authorization status | Any scope |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Authentication

Send your key in the `x-api-key` header. Any valid key may call this operation, whatever its scope. A missing key returns `401`; an unknown or unpublished key returns `403`.

## Related

- [Authentication](../01-authentication.md)
- [API keys](../../06-administration/04-api-keys.md)
- [Projects](projects.md) and [Modules](modules.md)
- [Endpoint groups](index.md)
