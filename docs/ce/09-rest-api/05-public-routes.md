# Public Routes

Some routes need no `x-api-key` header. They serve data to people and tools outside your company: customers, partners, monitoring.

| Route | Key | What it serves |
|---|---|---|
| `GET /api/v2/compliance/releases/{release_key}/sbom` | Release key | SBOM of an approved release |
| `GET /api/v2/compliance/releases/{release_key}/notice` | Release key | Notice file of an approved release |
| `GET /api/v2/compliance/releases/{release_key}/csaf` | Release key | CSAF VEX document of an approved release |
| `GET /api/v2/compliance/releases/{release_key}/csaf-changes` | Release key | CSAF VEX document limited to the changes in the release's vulnerabilities |
| `GET /api/v2/compliance/csaf/{csaf_key}/documents` | CSAF feed key | List of CSAF documents the key may read |
| `GET /api/v2/compliance/csaf/{csaf_key}/documents/{document_id}` | CSAF feed key | One CSAF document |
| `GET /files/products/{companyId}/{name}` | None (unguessable file name) | Product photos and documents |
| `GET /spdx/{documentName}-{uuid}` | None (unguessable UUID) | SPDX RDF export of a module |
| `GET /healthcheck` | None | Liveness check, `200` with an empty body |

Treat release keys and CSAF feed keys like passwords: anyone who holds one can read what it serves. Because the key is part of the URL, it ends up in the app log and in the access logs of any reverse proxy in front of TrustSource CE; restrict who can read these logs. Every call through such a key is counted, and the count is shown next to the key. When a recipient relationship ends, rotate the key: create a new one for those who keep access, then unpublish the old one.

## Release keys

A release key gives read access to the documents of one approved release (an approved approval). Create it under **Administration → API keys → Release keys** with **Create New**, or from the release itself with **Published keys → Create new key**. Pick the release and the documents the key may serve: `sbom`, `notice` and `csaf`. A key with no document selected serves all three. Then select **Publish**. See [Release keys](../06-administration/04b-release-keys.md).

```bash
curl https://<your-host>/api/v2/compliance/releases/<release_key>/sbom
```

- The SBOM response holds the `components` list and a `signatures` array; the notice response holds the `licenses` with their components and a `signatures` array. The CSAF responses are CSAF 2.0 VEX documents (`document`, `product_tree`, `vulnerabilities`) with `signatures`.
- The signatures are HMAC integrity checks made with `TS_ENCRYPTION_KEY`, not public signatures. Only the issuing installation can check them, under **Outbound → Verify**, which needs a login; recipients cannot verify a document on their own. See [Verify](../04-outbound/05-verify.md).
- An unknown or unpublished key, or a key that does not include the requested document, answers `404`.
- The release key page shows the URL of each document and a QR code once the key is published.

## CSAF feed keys

A CSAF feed key gives read access to your company's CSAF documents, filtered by TLP level. Create it under **Administration → API keys → CSAF feed keys** (Account admin) and pick the TLP levels it may read: `WHITE`, `GREEN`, `AMBER`, `RED`. See [CSAF feed keys](../06-administration/04c-csaf-feed-keys.md).

```bash
curl https://<your-host>/api/v2/compliance/csaf/<csaf_key>/documents
curl https://<your-host>/api/v2/compliance/csaf/<csaf_key>/documents/<document_id>
```

- The list returns, newest first, one entry per document: `id`, `trackingId`, `title`, `category`, `tlp`, `published`.
- The feed serves every CSAF document of the company that has not been deleted and whose TLP level the key allows, including documents that are not yet published.
- An unknown or unpublished key, or a document whose TLP level the key does not allow, answers `404`.

## Product files and SPDX exports

Product photos and documents uploaded on the **Photos** and **Documents** tabs of a product are stored under a random file name and served to anyone who has the link. They are always sent as a download.

The **Export SPDX** tab of a module settings page produces an SPDX RDF document under `/spdx/<document name>-<uuid>`. The link works without login.

## Health check

`GET /healthcheck` answers `200` with an empty body as soon as the app is up. It is also answered over plain HTTP when `ROOT_URL` is an `https://` address, so load balancers can probe the container directly. See [Backups and monitoring](../01-installation-setup/07-backups-monitoring.md).

## Related

- [Compliance releases](endpoints/compliance-releases.md)
- [CSAF feed](endpoints/compliance-csaf-feed.md)
- [Recipe: Share an SBOM publicly](../recipes/08-share-sbom-publicly.md)
