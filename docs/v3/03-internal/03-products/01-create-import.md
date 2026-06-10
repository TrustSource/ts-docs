# Create & Import Products

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`
> **Required license feature:** `products`

## Creating a product

1. Navigate to **Internal → Products**.
2. Click **Add Product**.
3. Enter the product name and basic information.
4. Click **Save**.

The product is created in draft state. Fill in the remaining tabs — classification, contacts, documents — as needed.

## Importing products

You can bulk-import products from a **JSON file**:

1. Click **Import** in the product list header.
2. Select a JSON file with product definitions.
3. Review the import preview.
4. Confirm.

Exported products (via **Export**) use the same JSON format, enabling backup and cross-instance transfer.

## Product tree

Products are displayed in a **hierarchical tree** — parent products can contain child products. The tree view supports:

- Expand/collapse all
- Show/hide retired products
- Product count statistics

📸 *Screenshot: the product creation form.*

## Related

- [Products overview](index.md) — the eight product tabs
- [Link with Release](10-link-with-release.md) — connecting releases to products
