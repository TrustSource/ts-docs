# Authentication (x-api-key)

Authenticate API requests by passing your API key in the `x-api-key` HTTP header. Never put the key in the URL or in the request body.

```bash
curl -H "x-api-key: YOUR_KEY" https://api.trustsource.io/v2/core/projects
```

API keys are created under [Administration → API keys](../06-administration/04-api-keys.md).

## Check a key

`GET /account/authorization` validates your key. Call it once when you set up a pipeline.

## Scopes

Each key carries a scope, a list of role names. A key may call an operation only if one of its scopes is allowed to. Otherwise the call fails with `403`. [API scopes](../10-roles-permissions/09-api-scopes.md) lists the operations per scope.

## Status codes

| Status | Meaning |
|---|---|
| `401` | The key is missing. |
| `403` | The key is unknown or unpublished, or its scope does not allow the operation. |

## Keys in the URL

Release documents and the CSAF feed use a key in the URL instead of the header. See [Public routes](05-public-routes.md).
