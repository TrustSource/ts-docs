# Products

> [!NOTE]
> **Menu:** **Internal → Products** is shown to Developer, Compliance manager and Manager.
> **Editing a product:** Developer, Compliance manager, Company security manager or Account admin.

A **product** in ***TrustSource CE*** represents what you ship to the customer. Products are particularly important for **EU Cyber Resilience Act (CRA)** compliance: they carry the CRA classification, contacts, documentation and misuse cases.

## Products vs. Modules

- A **module** is what you *build* (code, dependencies, scans).
- A **product** is what you *ship* (packaging, classification, documentation, contacts).
- Products link to modules via **solutions**: approved releases that make up the product.

## The Products page

The page header reads **Products** (*Product structure of your company*) and offers **Stats**, **Add**, **Import** and **Export**. The left panel shows the **Tree of Products**; select a product to open its tabs on the right. See [Create & Import Products](01-create-import.md).

## Product detail tabs

| Tab | What it contains |
|---|---|
| [Information](02-tab-information.md) | Identifier, type, name, purpose and features; retire and revert. |
| [Solutions](03-tab-solutions.md) | Approved releases linked to this product; SBOM generation. |
| [Classification](04-tab-classification-cra.md) | CRA classification (STANDARD, IMPORTANT Class 1, IMPORTANT Class 2, CRITICAL). |
| [Photos](05-tab-photos.md) | Product photo gallery. |
| [Documents](06-tab-documents.md) | User manual, secure setup, product description, SBOM file, CE mark declaration. |
| [Contacts](07-tab-contacts.md) | Manufacturer data and product security contact. |
| [Support](08-tab-support.md) | Support contracts with end dates; end-of-life file. |
| [Misuse](09-tab-misuse.md) | Potential misuse cases required by the CRA. |

Photos and documents are stored on the server's own file storage (the `ts-files` volume of the reference setup), not in an external service. Include that volume in your backups; see [Backups & Monitoring](../../01-installation-setup/07-backups-monitoring.md).

📸 *Screenshot: the Products page with the product tree and a selected product.*

## Related

- [Link with Release](10-link-with-release.md) - how to connect an approved release to a product
- [Products API](../../09-rest-api/endpoints/products.md) - read and write products from your own tools
- [Background: Cyber Resilience Act](../../../shared/background/01-cra-cyber-resilience-act.md)
