# REST API v2

***TrustSource*** provides a REST API for programmatic access to scans, components, modules, projects and compliance data. Use it to automate your software supply chain security from CI/CD pipelines, release tooling and your own portals.

| Page | What it covers |
|---|---|
| [Authentication](01-authentication.md) | API key format, header usage, scopes. |
| [Errors & Responses](02-error-handling.md) | HTTP status codes, error bodies, rate limits. |
| [Endpoint Reference](03-endpoint-reference.md) | Where to find the specification, and the endpoint pages. |
| [Example: curl](04-examples-curl.md) | End-to-end workflow via curl. |
| [Public Routes](05-public-routes.md) | Release keys and CSAF feed keys. |
| [API Structure](06-api-structure.md) | How the API is organised, base URL, limits. |
| [Endpoint groups](endpoints/index.md) | One page per group of operations. |

## Base URL and header

```
https://api.trustsource.io/v2
```

The version belongs to the base URL only. Endpoint paths never contain it, for example `/core/projects`. Send your key in the `x-api-key` header:

```bash
curl -H "x-api-key: YOUR_KEY" https://api.trustsource.io/v2/account/authorization
```

All requests and responses are JSON unless an endpoint says otherwise. CORS is enabled (`Access-Control-Allow-Origin: *`).

## Start here

1. [Create an API key](../06-administration/04-api-keys.md) and choose a scope.
2. Call `GET /account/authorization` to check that the key works.
3. Pick the operations you need on the [endpoint pages](endpoints/index.md) and try them in the [interactive API documentation](../08-personal/05-api-documentation.md).

## Further sources

- [API Structure](06-api-structure.md) - the five building blocks of the API.
- [API keys](../06-administration/04-api-keys.md) and [API usage](../06-administration/04a-api-usage.md) - manage and monitor your keys.
- [API scopes](../10-roles-permissions/09-api-scopes.md) - which scope may call which operation.
- [Recipe: CI/CD integration](../recipes/02-cicd-integration.md) - scan from GitHub Actions.
- [Support](../08-personal/04-support.md) - questions about the API.
