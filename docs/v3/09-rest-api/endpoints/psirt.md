# PSIRT

> Fetch the CSAF/VEX advisory of one of your components by its Package URL.

## Use cases

- Fetch the CSAF/VEX advisory of one of your components by its Package URL.
- Pass `changes` to choose between the full advisory and the change view.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/psirt/csaf` | Get CSAF advisory by component | See [API scopes](../../10-roles-permissions/09-api-scopes.md#euvd-epss-and-psirt) |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [CSAF](../../04-outbound/04-csaf.md)
- [CVD cases](../../04-outbound/06-cvd-cases.md)
- [Compliance CSAF feed](compliance-csaf-feed.md)
- [Endpoint groups](index.md)
