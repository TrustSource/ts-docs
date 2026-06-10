# REST API v2

***TrustSource*** provides a REST API for programmatic access to scans, components, modules, projects and compliance data.

| Page | What it covers |
|---|---|
| [Authentication](01-authentication.md) | API key format, header usage, scopes. |
| [Errors & Responses](02-error-handling.md) | HTTP status codes, error body format. |
| [Endpoint Reference](03-endpoint-reference.md) | All 25 endpoint families. |
| [Example: curl](04-examples-curl.md) | End-to-end workflow via curl. |
| [Public Routes](05-public-routes.md) | Public SBOM/Notice sharing without auth. |

## Base URL

```
https://api.trustsource.io/v2/
```

All requests are JSON. CORS is enabled (`Access-Control-Allow-Origin: *`).

> [!TIP]
> For interactive API exploration, use the built-in [API Documentation Browser](../08-personal/05-api-documentation.md) inside ***TrustSource***.
