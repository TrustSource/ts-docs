# Authentication (x-api-key)

Authenticate API requests by passing an API key in the `x-api-key` HTTP header. Do not put the key in the URL.

```bash
curl -H "x-api-key: YOUR_KEY" https://<your-host>/api/v2/core/projects
```

## Where keys come from

| Key | Created in | Scope |
|---|---|---|
| **API key** | **Administration → API keys → API keys** (Account admin) | The scopes you pick when you create the key. At least one is required. |
| **Personal access key** | Your **Profile → Personal access keys** (any user) | The roles you hold in the company at the moment you create the key. |

A new key is unpublished. It authenticates only after you select **Publish**. **Unpublish** stops it at once without deleting it. See [API keys](../06-administration/04-api-keys.md) and [Profile](../08-personal/03-profile.md).

> [!NOTE]
> Keys are stored encrypted and looked up by a hash that depends on `TS_ENCRYPTION_KEY`. If you change that setting, existing keys stop working. See [Environment variables](../01-installation-setup/03-environment-variables.md).

## Check a key

`GET /account/authorization` validates your key. It needs no particular scope. Call it once when you set up a pipeline.

```bash
curl -H "x-api-key: YOUR_KEY" https://<your-host>/api/v2/account/authorization
# 200  "Authorization is ok"
```

## Scopes

A key's scope is a list of role names: `developer`, `compliance_manager`, `portfolio_manager`, `manager`, `account_admin`, `company_component_manager`, `company_security_manager`. Each operation accepts a set of scopes. A key may call an operation if at least one of its scopes is in that set; otherwise the call fails with `403` and the body `"API-key scope is limited"`.

The scopes per operation are listed on every [endpoint page](endpoints/index.md) and collected in [API scopes](../10-roles-permissions/09-api-scopes.md).

> [!TIP]
> Give each pipeline its own key with the smallest scope that works. A CI job that only uploads scans needs `developer`.

A key without any scope (for example a key that predates scopes) passes every scope check. Keys created in the UI always carry at least one scope.

Every key acts for exactly one company: the company it was created in. All data an operation reads or writes is restricted to that company.

## Status codes

| Status | Body | Meaning |
|---|---|---|
| `401` | `"API-key missing"` | The `x-api-key` header is missing or empty. |
| `403` | `"Invalid API-key"` | The key is unknown or not published. |
| `403` | `"API-key scope is limited"` | The key is valid, but none of its scopes may call this operation. |

## Keys in the URL

Release documents and the CSAF feed use a separate key in the URL instead of the header. See [Public routes](05-public-routes.md).
