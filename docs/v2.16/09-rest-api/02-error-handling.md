# Errors & Responses

The API returns standard HTTP status codes:

| Code | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad request — invalid parameters |
| 401 | Unauthorized — invalid or missing API key |
| 403 | Forbidden — insufficient permissions |
| 404 | Not found |
| 500 | Internal server error |

Error responses include a JSON body with a `message` field.
