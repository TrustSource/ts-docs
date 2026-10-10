# Company FOSS

> Read the FOSS liaison contact and compliance settings of your company.

## Use cases

- Show the FOSS liaison contact of your company on a portal.
- Read the company's FOSS compliance settings into an external tool.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/compliance/company/foss` | Get company FOSS liaison | Any scope |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Settings](../../06-administration/02-settings.md)
- [Compliance releases](compliance-releases.md)
- [Endpoint groups](index.md)
