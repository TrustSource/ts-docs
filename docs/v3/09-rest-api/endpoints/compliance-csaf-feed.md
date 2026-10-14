# CSAF Feed

> Consume your company's published CSAF documents through a key-scoped, TLP-filtered REST feed.

## Use cases

- Expose your CSAF advisories to a downstream consumer (customer portal, partner pipeline, security dashboard) without giving them a TrustSource login.
- Issue different feed keys for different audiences - e.g. a TLP:WHITE key for the public, a TLP:GREEN/AMBER key for partners - so each consumer sees only what their key entitles them to.
- Poll a stable URL to ingest new CSAF documents as they are published.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/compliance/csaf/{csaf_key}/documents` | List accessible CSAF documents | CSAF feed key in URL |
| GET | `/compliance/csaf/{csaf_key}/documents/{document_id}` | Get a CSAF document | CSAF feed key in URL |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

The detail URL for a given list item is built by appending `/<id>` to the list URL - the `id` field is the only identifier needed.

### Published versions (`?version=`)

Every publish of an advisory is kept as an immutable copy. With `?version=N` the feed answers **200** with the exact file released as version `N` (pretty-printed, so the bytes differ in formatting from the compact current-document response). Without `?version` the endpoint behaves as before and returns the current published document. To find which versions exist, read the document's `tracking.revision_history`.

A version is served only when both hold:

- The document itself is readable with this key right now: not removed, published, its current TLP is in the key's set, and, for an AMBER+STRICT advisory, the key is bound to a product it concerns.
- The key may read that version as it was released: the version's own TLP is in the key's set, and if that version was AMBER+STRICT, the key is bound to a product that version concerned.

Otherwise the answer is **404**, the same as for an unknown id. An unknown, empty or malformed version also answers **404**. A key with **Include drafts** gets only published versions through `?version`; drafts have none. Advisories published before versions were kept have a single stored version, their last published one; older versions of those advisories are not available.

## Authentication and access control

- The `csaf_key` path parameter authenticates the request - no `x-api-key` header is used.
- A document is returned only when its `tlp` level is in the key's allowed set. Documents at higher TLP levels respond with **404 Not Found** so that their existence is not leaked to lower-tier keys.
- Only published documents are served. A draft is absent from the list, and fetching it by id answers **404**, the same as an unknown id. Publishing a document makes it appear in both endpoints; removed documents are never returned.
- The feed serves each document as it was last published. Edits made afterwards, or a re-publish that failed, are not visible until the document is published again. The TLP filter applies to the published version.
- **Product-restricted advisories (AMBER+STRICT):** an advisory marked AMBER+STRICT is returned only to a key bound to a product it concerns (or to a parent of that product). Every other key gets **404** on both endpoints, the same as for an unknown id. Bind products to a key under **Administration → API keys → CSAF feed keys** with the **Products** button of the key. The document itself still carries TLP `AMBER`, because CSAF 2.0 has no AMBER+STRICT label.
- **Access log:** every list and document read is recorded per key (documents, answer, time, IP) and kept for 365 days. Open it from **Access log** in the key list.
- **Internal preview:** a key created with **Include drafts** (or switched on later in the key list) also lists drafts, without a `published` field, and serves the current working copy of every document. Use such a key internally only; never give it to a third party.
- Lost or compromised keys can be deleted in the UI at any time; deletion revokes the feed immediately.

## Errors

| Status | When |
|--------|------|
| 404 | Key not found, document not found or not published, document's TLP is not permitted by the key, the advisory is AMBER+STRICT and the key is not bound to a product it concerns, or the requested `version` does not exist or is not readable with this key. |
| 405 | A method other than `GET` or `OPTIONS` was used. |

The response body is a JSON-encoded short message string.

## Authentication

The `csaf_key` in the URL authenticates the request. Do not send an `x-api-key` header. Create feed keys under **Administration → API keys → CSAF feed keys**.

## Related

- [Compliance Releases](compliance-releases.md) - per-release CSAF advisory (different model: keyed by release, not by feed key)
- [PSIRT](psirt.md) - consume upstream CSAF feeds keyed by package URL
- [CSAF](../../04-outbound/04-csaf.md) - UI-side CSAF authoring and publishing workflow
- [Endpoint groups](index.md)
