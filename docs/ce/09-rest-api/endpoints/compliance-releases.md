# Compliance releases

> Fetch the SBOM, notice file and CSAF VEX documents of an approved release with a release key. No API key is needed.

## Use cases

- Give a customer or market-surveillance authority a stable URL for the SBOM of a shipped release.
- Publish the CSAF VEX status of a release, so recipients can see which vulnerabilities affect it.
- Print a QR code on a device or its documentation that leads to the release documents.

## Operations

| Method | Path | What it does | Key |
|---|---|---|---|
| GET | `/compliance/releases/{release_key}/sbom` | Release SBOM | Release key with `sbom` |
| GET | `/compliance/releases/{release_key}/notice` | Release notice file | Release key with `notice` |
| GET | `/compliance/releases/{release_key}/csaf` | Release CSAF VEX | Release key with `csaf` |
| GET | `/compliance/releases/{release_key}/csaf-changes` | CSAF VEX limited to the changes in the release's vulnerabilities | Release key with `csaf` |

These routes take no `x-api-key` header. The release key in the path decides what may be read. A key with no document type selected serves all of them.

## Getting a release key

1. Approve the module. The approved approval is the release.
2. Open **Administration → API keys → Release keys** and select **Create New**, or open the release under **Internal → Releases** and select **Published keys → Create new key**.
3. Pick the release and the document types (`sbom`, `notice`, `csaf`).
4. Select **Publish**. The key can then be copied, and the QR code button shows the URL of each document.

Creating and publishing release keys needs the role Account admin, Manager or Compliance manager. See [Release keys](../../06-administration/04b-release-keys.md).

## Responses

| Route | Body |
|---|---|
| `sbom` | `components` (`name`, `homepageUrl`, `license`, `licenseUrl`) and `signatures` |
| `notice` | `licenses`, each with `key`, `name`, `text`, `url` and its `components` (name, version, copyright, URLs), and `signatures` |
| `csaf`, `csaf-changes` | A CSAF 2.0 VEX document (`document`, `product_tree`, `vulnerabilities`) and `signatures` |

The signatures are HMAC integrity checks made with the installation's `TS_ENCRYPTION_KEY`, not public signatures. Only the issuing installation can check them, under **Outbound → Verify**, which needs a login; recipients cannot verify a document on their own. The release key is part of the URL, so it appears in the app log and in reverse proxy access logs; protect these logs. See [Verify](../../04-outbound/05-verify.md).

| Status | Meaning |
|---|---|
| `200` | The document |
| `404` | Unknown or unpublished key, or the key does not include this document type |
| `500` | The document could not be produced. The body is the fixed text `"The requested document could not be produced"`; the details are in the server log. |

Every request is counted, with the caller's IP address, and the count is shown next to the key.

## Related

- [Public routes](../05-public-routes.md)
- [Releases](../../03-internal/07-releases.md)
- [Recipe: Share an SBOM publicly](../../recipes/08-share-sbom-publicly.md)
- [Endpoint groups](index.md)
