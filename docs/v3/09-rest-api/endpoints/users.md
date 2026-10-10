# Users

> List inactive users and read API usage statistics per key.

## Use cases

- List users who have not logged in for 60 days, for an access review.
- Monitor API usage per key for billing or capacity planning.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/users/nologin` | List inactive users | `account_admin`, `enterprise_admin` |
| GET | `/core/users/usage` | Get API key usage statistics | `account_admin` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [API usage](../../06-administration/04a-api-usage.md)
- [Login history](../../06-administration/09-login-history.md)
- [API keys](../../06-administration/04-api-keys.md)
- [Endpoint groups](index.md)
