# Errors & Responses

The API returns standard HTTP status codes:

| Code | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad request — invalid parameters |
| 401 | Unauthorized — invalid or missing API key |
| 403 | Forbidden — insufficient permissions, or the license feature is not enabled |
| 404 | Not found |
| 405 | Method not allowed — the path does not support this HTTP method |
| 429 | Too many requests — the rate limit for your API key is exceeded |
| 500 | Internal server error |

## Error body

Failed calls return a JSON body of this form:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "A short, safe explanation of what went wrong."
}
```

Messages are deliberately safe: you never see raw database errors or stack traces. Validation errors on some endpoints carry additional detail in `description` and a `messages` list.

## Rate limits

The API is rate-limited per API key. A `429` response carries a `Retry-After` header; wait that long before you retry. Build retry with backoff into CI pipelines and bulk importers.

> [!NOTE]
> The specification and the application code do not define a `409` response for the public API, so there is none to handle.
