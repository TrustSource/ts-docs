# Products

> Create, read, update and retire products, and manage their misuse cases, support contracts, linked releases (solutions), photos and documents.

## Use cases

- Keep the product tree in sync with your product management or ERP system.
- Set the CRA classification and manufacturer contacts from a script.
- Link approved releases to the product they ship in, from the release pipeline.
- Upload user manuals, secure-setup guides and SBOMs to a product.

## Operations

Read scopes: `developer`, `manager`, `compliance_manager`, `company_security_manager`, `portfolio_manager`, `account_admin`.
Write scopes: `developer`, `manager`, `compliance_manager`, `company_security_manager`, `account_admin`.
Retire scopes: `compliance_manager`, `company_security_manager`, `account_admin`.

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/products` | List products | Read |
| POST | `/core/products` | Create product | Write |
| GET | `/core/products/{product_id}` | Get product details | Read |
| POST | `/core/products/{product_id}` | Update product | Write |
| POST | `/core/products/{product_id}/retire` | Retire product | Retire |
| POST | `/core/products/{product_id}/unretire` | Un-retire product | Retire |
| POST | `/core/products/{product_id}/misuse` | Add a misuse case | Write |
| DELETE | `/core/products/{product_id}/misuse/{item_id}` | Remove a misuse case | Write |
| POST | `/core/products/{product_id}/support` | Add a support contract | Write |
| DELETE | `/core/products/{product_id}/support/{item_id}` | Remove a support contract | Write |
| POST | `/core/products/{product_id}/solution` | Link an approved release (solution) | Write |
| DELETE | `/core/products/{product_id}/solution/{approval_id}` | Unlink a solution | Write |
| POST | `/core/products/{product_id}/photo` | Upload a photo (multipart) | Write |
| DELETE | `/core/products/{product_id}/photo` | Remove a photo | Write |
| POST | `/core/products/{product_id}/document` | Upload a document (multipart) | Write |
| DELETE | `/core/products/{product_id}/document` | Remove a document | Write |

Every write operation answers with the full, updated product. Create and add operations answer `201`, the others `200`.

## Listing and reading

`GET /core/products` returns up to 100 products per page, sorted by name, with `type`, `identifier`, `name`, `description`, `state`, `classification`, `submitted`, `released`, `retired` and `parentId`. Retired products are left out unless you add `includeRetired=true`. Use `parentId` to rebuild the product tree.

`GET /core/products/{product_id}` returns the full product, including `contacts`, `solutions`, `supportContracts`, `misuses` and `documents`. File URLs in the response are absolute.

## Creating a product

`POST /core/products` requires `type`, `identifier` and `name` as strings. Optional: `description`, `properties` (list of `name`/`value` pairs), `parentId` (the parent's identifier) and `draft`. The identifier must be unique within the company.

```bash
curl -X POST "https://<your-host>/api/v2/core/products" \
  -H "x-api-key: $TS_API_KEY" -H "Content-Type: application/json" \
  -d '{"type": "family", "identifier": "WS", "name": "Webshop"}'
```

The app offers the types `class`, `family`, `variant`, `version` and `position`.

## Updating a product

`POST /core/products/{product_id}` applies only these fields: `type`, `identifier`, `name`, `description`, `features`, `state`, `classification`, `properties`, `contacts`, `parentId`, `started`. Other fields are ignored; a body with none of them answers `400`. Changing `identifier` checks uniqueness.

- `classification` holds the CRA class: `STANDARD`, `IMPORTANT_1`, `IMPORTANT_2` or `CRITICAL` (the values of the **Classification** tab).
- `contacts` holds `registeredTradeName`, `manufacturerName`, `manufacturerAddress`, `manufacturerWebsite`, `productSecurityContact`, `productSecurityWeblink` (the **Contacts** tab).

## Retiring

`retire` sets the retired date and an optional `retiredReason`. `unretire` clears it. A product that is already retired answers `404` on `retire`.

## Misuse cases and support contracts

- `POST .../misuse` takes `name` (required) and `description`.
- `POST .../support` takes `name` (required), `description` and `endDate` (a date).
- The server assigns each entry an `_id`; use it in the `DELETE` path.

## Solutions

`POST .../solution` links an approved release to the product. It takes `approvalId` and `name` (both required), `version` and `closedByName`. Find the approval id with [Compliance approvals](compliance-approvals.md) or on the release page in the app. `DELETE .../solution/{approval_id}` removes the link.

## Photos and documents

Send files as `multipart/form-data` with one file part named `file`; the file name must have an extension. Uploads are limited by `TS_UPLOAD_MAX_MB` (default 50 MB).

```bash
curl -X POST "https://<your-host>/api/v2/core/products/$PRODUCT_ID/document" \
  -H "x-api-key: $TS_API_KEY" \
  -F "documentType=userManual" -F "file=@manual.pdf"
```

- Documents need a `documentType` field: `userManual`, `secureSetup`, `productDescription`, `sbom` or `cedoc`. An upload replaces the file in that slot.
- To remove a photo send `{"url": "..."}`; to remove a document send `{"documentType": "...", "url": "..."}`, with the URL from the product.

The stored files are served under `/files/products/...` to anyone who has the link. See [Public routes](../05-public-routes.md#product-files-and-spdx-exports).

## Related

- [Products](../../03-internal/03-products/index.md) - the same data in the app
- [Recipe: CRA classification](../../recipes/06-cra-classification.md)
- [Compliance approvals](compliance-approvals.md)
- [Endpoint groups](index.md)
