# Errors & Responses

The API returns standard HTTP status codes:

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created (also returned by some action endpoints, see the endpoint pages) |
| 204 | Deleted, no body |
| 400 | Bad request - invalid parameters or body |
| 401 | The API key is missing |
| 403 | The API key is invalid or unpublished, or its scope does not allow the operation |
| 404 | Not found - the resource does not exist in your company, or the path is unknown |
| 405 | Method not allowed - the path does not support this HTTP method |
| 413 | Upload too large |
| 500 | Internal server error |

## Error bodies

Error bodies are JSON, but not all have the same shape. Check the status code first, then read the body.

**A JSON string** for authentication, scope, not-found and method errors:

```json
"API-key missing"
"Invalid API-key"
"API-key scope is limited"
"Resource not found: 3fKx9..."
"Method Not Allowed"
```

**A validation object** when a body or parameter fails schema validation:

```json
{
  "error": "Bad Request",
  "object": "Project:",
  "description": "Invalid properties",
  "messages": [
    { "message": "Name is required", "details": { "name": "name", "type": "required" } }
  ]
}
```

`info` and `contentNotices` may be added, for example when a scan names an unknown client or contains license values that could not be matched.

**An object with `error`** for some other failures, for example `{"error": "Project \"Webshop\" not found"}` from the check endpoints, or `{"error": "File exceeds the upload limit of 52428800 bytes"}` from an upload.

A server fault answers `500` with `{"error": "Internal Server Error", "message": "..."}`. An unknown path below `/api/` answers `404` with the plain text `Page not found`.

> [!NOTE]
> A few endpoints answer with a different success code or body than the interactive API documentation shows. The endpoint pages describe what the server returns.

## Limits

| Limit | Value | Response when exceeded |
|---|---|---|
| File upload (multipart) | `TS_UPLOAD_MAX_MB`, default 50 MB per file | `413` |
| Files per upload request | 1 | `400` |
| JSON request body | 5 MB | The request is refused. Send larger documents as a file upload. |
| Application goals content | 100 KB | `400` `{"error": "Content too large"}` |
| Dependency nesting in a scan | 80 levels | `400` |

`TS_UPLOAD_MAX_MB` is read by the app but not wired in the default `docker-compose.yml`. Add it to the `ts_core` service environment to change it. See [Environment variables](../01-installation-setup/03-environment-variables.md).

An SBOM or SARIF file upload without an `x-api-key` header is refused with `401` before its body is read.

## Rate limits

The REST API has no request rate limit of its own. If you expose it to untrusted networks, limit requests at your reverse proxy. See [HTTPS and reverse proxy](../01-installation-setup/05-https-reverse-proxy.md).
