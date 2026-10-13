# REST API v2

***TrustSource CE*** provides a REST API for programmatic access to projects, modules, scans, products, risks, reports and compliance data. Use it to automate your software supply chain work from CI/CD pipelines, release tooling and your own portals.

| Page | What it covers |
|---|---|
| [Authentication](01-authentication.md) | API keys, the `x-api-key` header, scopes. |
| [Errors & Responses](02-error-handling.md) | HTTP status codes, error bodies, limits. |
| [Endpoint Reference](03-endpoint-reference.md) | Where to find the specification, and the endpoint pages. |
| [Example: curl](04-examples-curl.md) | End-to-end workflow via curl. |
| [Public Routes](05-public-routes.md) | Release keys, CSAF feed keys and other routes without an API key. |
| [API Structure](06-api-structure.md) | How the API is organised, base URL, limits. |
| [Endpoint groups](endpoints/index.md) | One page per group of operations. |

## Base URL and header

The API is served by your own installation, under the address you set in `ROOT_URL`:

```
https://<your-host>/api/v2
```

The version belongs to the base URL only. Endpoint paths never contain it, for example `/core/projects`. Send your key in the `x-api-key` header:

```bash
curl -H "x-api-key: YOUR_KEY" https://<your-host>/api/v2/account/authorization
```

Requests and responses are JSON unless an endpoint says otherwise. CORS is enabled (`Access-Control-Allow-Origin: *`).

> [!NOTE]
> The app itself speaks plain HTTP on port 3000. Put a TLS reverse proxy in front of it before you call the API from other machines. See [HTTPS and reverse proxy](../01-installation-setup/05-https-reverse-proxy.md).

## Start here

1. [Create an API key](../06-administration/04-api-keys.md), choose its scopes and publish it.
2. Call `GET /account/authorization` to check that the key works.
3. Pick the operations you need on the [endpoint pages](endpoints/index.md) and try them in the [interactive API documentation](../08-personal/05-api-documentation.md).

## Further sources

- [API Structure](06-api-structure.md) - the building blocks of the API.
- [API keys](../06-administration/04-api-keys.md), [Release keys](../06-administration/04b-release-keys.md) and [CSAF feed keys](../06-administration/04c-csaf-feed-keys.md) - manage your keys.
- [API scopes](../10-roles-permissions/09-api-scopes.md) - which scope may call which operation.
- [Recipe: CI/CD integration](../recipes/02-cicd-integration.md) - scan from GitHub Actions.
