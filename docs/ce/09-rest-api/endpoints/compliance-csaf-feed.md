# CSAF feed

> Let partners and customers read your CSAF advisories through a key that is limited to selected TLP levels. No API key is needed.

## Use cases

- Give a customer automated access to the advisories for your products.
- Share `TLP:AMBER` advisories with selected partners while `TLP:WHITE` ones stay public.

## Operations

| Method | Path | What it does | Key |
|---|---|---|---|
| GET | `/compliance/csaf/{csaf_key}/documents` | List CSAF documents the key may read | CSAF feed key |
| GET | `/compliance/csaf/{csaf_key}/documents/{document_id}` | Get one CSAF document | CSAF feed key |

These routes take no `x-api-key` header.

## Getting a CSAF feed key

Open **Administration → API keys → CSAF feed keys** and select **Create key**. Give it a name and tick the TLP levels it may read: `WHITE`, `GREEN`, `AMBER`, `RED`. The key list is shown to Account admins. A new key is published at once. Keys can be unpublished, published again and, while unpublished, deleted. See [CSAF feed keys](../../06-administration/04c-csaf-feed-keys.md).

## Responses

The list returns, newest first, one entry per document:

| Field | Content |
|---|---|
| `id` | Document id for the detail route |
| `trackingId` | `document.tracking.id` of the CSAF document |
| `title` | Document title |
| `category` | CSAF category |
| `tlp` | TLP level |
| `published` | Publication date, if published |

The detail route returns the CSAF document as JSON.

The feed serves every CSAF document of the company that has not been deleted and whose TLP level the key allows. This includes documents that are not yet published. Keep drafts on a TLP level that no external key can read.

| Status | Meaning |
|---|---|
| `200` | List or document |
| `404` | Unknown or unpublished key, unknown document, or a document whose TLP level the key does not allow |

Every request is counted, and the count is shown next to the key. The key is part of the URL, so it appears in the app log and in reverse proxy access logs; protect these logs.

## Related

- [CSAF](../../04-outbound/04-csaf.md) - create and publish advisories
- [Public routes](../05-public-routes.md)
- [Endpoint groups](index.md)
