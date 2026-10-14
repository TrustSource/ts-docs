# License Details

> [!NOTE]
> **Required role:** any role with access to the project can read. **Edit** and the status label need `legal_manager`.

The license details page shows what a license says and how your policy rates it. You reach it from a module: open the **Legal** tab and click a license name. The page title shows the license name and its key, for example `Apache License 2.0 [Apache-2.0]`.

## What the page shows

- **License text**: the full text, with the **Search in license text...** box at the top right to highlight terms. Where ***TrustSource*** does not store the text, the page says so and links to the license's own URL if one is known.
- **Created / updated**: dates of the catalog entry, in the footer of the panel.
- **Status label** (`legal_manager` only): the license's rating under your company policy next to the title.
- **Edit** (`legal_manager` only): opens the license editor. See [Licenses](../../05-knowledge/06-licenses.md).

📸 *Screenshot: the license details page with the search box and the license text.*

## From the Legal tab

On the [Legal tab](02-module-detail-tabs.md#legal) a license row shows its status and expands to the components that use it. A component is listed under **License not detected** when the scan found no license; use [Manual license resolution](06-manual-license-resolution.md) to set one.

To decide how a license is treated, right-click it and choose **Always allow in Module / Project / Company** or **Always deny ...** (`manager`, `compliance_manager`). The decision is stored in the [Allow/Deny lists](settings/14-whitelists-blacklists.md) of the chosen level.

## Related

- [Component details](04-component-detail.md)
- [Licenses](../../05-knowledge/06-licenses.md)
- [Open source policy](../../05-knowledge/07-open-source-policy.md)
