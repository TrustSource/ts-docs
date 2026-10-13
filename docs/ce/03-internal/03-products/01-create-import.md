# Create & Import Products

> [!NOTE]
> **Menu:** **Internal → Products** is shown to Developer, Compliance manager and Manager. Everyone who can open the page can add and import products. Editing an existing product needs Developer, Compliance manager, Company security manager or Account admin.

Use **Internal → Products** to build the structure of what you ship: a tree of classes, families, variants and versions. You can add products one by one or import a whole structure from a JSON file.

## Add a product

1. Open **Internal → Products** and click **Add**. The **Add product** dialog opens.
2. Optionally pick a **Parent** to place the product below an existing one. If a product is selected in the tree, it is pre-selected.
3. Enter the **Identifier** (required, for example `FR-100`) and choose the **Type**: Class, Family, Variant, Version or Position.
4. Enter the **Name** (required) and, if you like, the **Purpose**.
5. Click **Add**.

The identifier must be unique within your company; otherwise the app shows "Product with same identifier already exists". It also serves as the product's key: children refer to their parent by this identifier.

> [!TIP]
> Tick **Draft** ("Allows you to run a test. You will be able to remove all test data at once") to try things out. Draft products carry a *Draft* label, and a **Remove all draft products** panel with a **Remove drafts** button appears below the tree to delete all of them at once. Removing drafts is available to Manager, Compliance manager, Company security manager and Account admin.

New products start with the PSIRT contact data stored in your company settings; see [Contacts](07-tab-contacts.md).

## The product tree

The left panel shows **Tree of Products**. When you open the page, the first root product is selected. Click a product to open its tabs on the right.

- **Expand all** / **Collapse all** opens or closes every branch.
- **Show all** also lists retired products; **Hide retired** returns to the default view.
- **Stats** shows the number of products, root entries and retired entries.

📸 *Screenshot: the product tree with the Stats menu open and a product selected.*

## Import products

1. Click **Import** in the page header. The **Import product structure** dialog opens.
2. Optionally tick **Draft** to mark every imported product as a draft.
3. Optionally choose a **Parent**. Imported products that have no parent in the file are placed below it; otherwise they become root entries.
4. Select the **File** (`.json`) and click **Import**.

Click the **JSON** link in the dialog to open a sample file.

### File format

```json
{
  "format": "TrustSourceProducts",
  "version": 1,
  "products": [
    {"type": "class", "identifier": "FR", "name": "Fridges", "description": "Household cooling"},
    {"type": "family", "identifier": "FR-100", "name": "Dual-sided"}
  ],
  "relations": [
    {"identifier": "FR", "contains": ["FR-100"]}
  ]
}
```

- `version` must be `1`.
- Each product needs `identifier` and `name`; `type` and `description` are optional. Valid types are `class`, `family`, `variant`, `version` and `position`.
- `relations` describe the tree: the product in `identifier` contains the products listed in `contains`. If a product is listed in several relations, the first one counts.
- A relation may name a product that already exists in your company.

### How the import runs

Products are created one after the other, in the order of the file. If one of them fails, for example because its identifier is already used in your company, the import stops with that error. Products created before the failing row stay; fix the file, remove the rows that were already imported, and import the rest.

> [!WARNING]
> The import does not check that a parent named in `relations` exists. A product whose parent identifier is unknown is stored but does not appear in the tree. Check the identifiers in `relations` before you import.
>
> A file that is valid JSON but does not carry `"version": 1` is accepted without creating any product. If nothing appears after an import, check the `version` field.

## Export products

Click **Export** to download `products-export.json`. It contains all active (not retired) products with type, identifier, name and description, and their relations, in the format above. Use it for backups or to move a structure to another company or installation. Features, classification, photos, documents and the other tab data are not part of the export.

You can also create products through the [Products API](../../09-rest-api/endpoints/products.md). The API has no import endpoint for the JSON file.

## Related

- [Products overview](index.md) - the eight product tabs
- [Link with Release](10-link-with-release.md) - connecting releases to products
