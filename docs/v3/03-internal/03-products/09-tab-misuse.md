# Tab: Misuse

> [!NOTE]
> **Required license feature:** `products`
> **Editing:** `developer`, `compliance_manager`, `company_security_manager` or `account_admin`

The CRA requires you to identify how a product could be misused. Collect these **potential misuse cases** per product on this tab, for example *Default admin password left unchanged* or *Device used as a relay in a botnet*.

## Add a misuse case

1. Click **Add potential misuse case**.
2. Enter the **Name** (required) and, optionally, a **Description**.
3. Click **Add**.

The table lists **Created**, **Case name** and **Description**; filter and sort as in other lists. Remove a case with the **x** button at the end of its row.

> [!NOTE]
> Misuse cases are plain records on the product. They are not linked to [Threat Models](../08-threat-models/index.md); use threat models for the technical analysis and this tab for the product-level statement.

You can read and write misuse cases through the [Products API](../../09-rest-api/endpoints/products.md) as well.

📸 *Screenshot: the Misuse tab with two cases.*

## Related

- [Products overview](index.md) - all eight product tabs
