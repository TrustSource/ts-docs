# Authorization

> Check that an API key is valid and published.

## Use cases

- Verify a key when you set up a CI/CD pipeline or an integration.
- Health-check an integration before it starts a long run.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/account/authorization` | Get authorization status | Any valid key |

## GET /account/authorization

No parameters besides the `x-api-key` header.

| Status | Body |
|---|---|
| `200` | `"Authorization is ok"` |
| `401` | `"API-key missing"` |
| `403` | `"Invalid API-key"` (unknown or unpublished key) |

```bash
curl -H "x-api-key: YOUR_KEY" https://<your-host>/api/v2/account/authorization
```

The call does not check scopes, so a `200` does not mean the key may call every operation. Each operation's scope is listed on its endpoint page.

## Related

- [Authentication](../01-authentication.md)
- [API keys](../../06-administration/04-api-keys.md)
- [Endpoint groups](index.md)
