# CSAF Documents

> Create CSAF 2.0 and VEX drafts in your company's advisory store from outside the UI.

## Use cases

- Let an MCP server, an agent or a scripted pipeline draft an advisory that a human then reviews and publishes.
- Import advisories produced by another tool into TrustSource without going through the upload dialog.
- Re-issue an advisory from a template on every release.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| POST | `/compliance/csaf` | Create CSAF/VEX draft | `manager`, `compliance_manager`, `company_security_manager`, `account_admin` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

The document is validated against the CSAF 2.0 schema before anything is stored, so an invalid
document is rejected (`400`) and leaves nothing behind. What is stored is a **draft**: it appears on
the CSAF screen with status `DRAFT`, and is published from there.

Send the document as the request body:

```json
{"document": {"category": "csaf_vex", "csaf_version": "2.0", "title": "...", "tracking": {"id": "TS-2026-0001", "...": "..."}}, "vulnerabilities": []}
```

The stored name defaults to `<document.tracking.id>.json`. To choose it, wrap the document instead -
the CSAF schema seals the top level, so a `name` sitting beside `document` would fail validation:

```json
{"name": "advisory-2026-0001.json", "file": {"document": {"...": "..."}}}
```

The response carries the new document's id:

```json
{"csafId": "aBcD1234...", "status": "DRAFT"}
```

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md). The account needs the licence feature `csaf`; without it the call fails with `403`. See [License features](../../10-roles-permissions/07-license-features.md).

## Related

- [CSAF Feed](compliance-csaf-feed.md) - serve published documents to downstream consumers
- [PSIRT](psirt.md) - fetch the advisory for a component by purl
- [Compliance Releases](compliance-releases.md) - per-release CSAF/VEX export
- [Endpoint groups](index.md)
