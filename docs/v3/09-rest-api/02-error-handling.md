# Errors & Responses

The API returns standard HTTP status codes:

| Code | Meaning |
|---|---|
| 200, 201, 204 | Success. `201` when something was created, `204` when something was deleted. |
| 400 | Bad request: invalid parameters or body. |
| 401 | The API key is missing. |
| 403 | The key is unknown or unpublished, its scope does not allow the operation, or the license feature is not enabled. |
| 404 | Not found. |
| 405 | Method not allowed: the path does not support this HTTP method. |
| 413 | The upload is too large. |
| 429 | Too many requests: the usage plan of your account is exceeded. |
| 500 | Internal server error. |

## Error body

The body of a failed call is JSON, but its shape depends on the endpoint:

- Most errors are a JSON string, for example `"API-key scope is limited"`, `"Invalid API-key"`, `"Resource not found: <id>"` or `"Method Not Allowed"`.
- Some endpoints answer with an object that carries the message in `error`, for example `{"error": "Project \"Webshop\" not found"}`. List filters add the name of the offending query parameter: `{"error": "...", "parameter": "state"}`.
- Validation errors on submitted documents (scans, imports, approvals) use this form:

```json
{
  "error": "Bad Request",
  "object": "...",
  "description": "Invalid properties",
  "messages": [
    {"message": "...", "details": {"name": "...", "type": "..."}}
  ]
}
```

- An unexpected server error answers `500` with `{"error": "Internal Server Error", "message": "..."}`.

Read the status code first, then show the body as text. Do not rely on one fixed error structure.

## Rate limits and quotas

Requests to `https://api.trustsource.io/v2` pass an API gateway that applies the usage plan of your account: a request rate with a short burst allowance, and a quota of requests per period. Calls above the rate or the quota fail with `429` before they reach ***TrustSource***. Retry with an increasing delay; build this into CI pipelines and bulk importers. Your consumption per key is shown under [API usage](../06-administration/04a-api-usage.md).

The gateway also answers `403` with `{"message": "Forbidden"}` when it does not accept the key in the `x-api-key` header, before ***TrustSource*** sees the request.

> [!NOTE]
> The specification and the application code do not define a `409` response for the public API, so there is none to handle.
