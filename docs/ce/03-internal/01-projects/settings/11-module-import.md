# Imports (Project)

> [!NOTE]
> **Required role:** Developer, Compliance manager, Portfolio manager and Manager see the tab. **Import** is for managers and compliance managers who are the project's default project manager or default compliance manager (or any of them while none is set). See the [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md).

The Imports tab creates modules from SBOM files and shows the import history of the project.

## Import a module

1. Click **Import**. The **Import module** dialog opens; it is the same dialog as **Import** on the [project page](../02-project-overview.md).
2. Switch between **SPDX** and **CycloneDX**.
3. Choose the **File**: CycloneDX as `.json`, `.cdx` or `.xml`; SPDX as `.json`, `.spdx`, `.rdf` or `.xml`.
4. Check the **Module name**. It is prefilled from the file name; change it to the component's own name so that later scans or SARIF uploads for that name land on the same module.
5. Click **Import**.

See [Import Scans](../../../02-inbound/02-import-scans.md) for the formats in detail.

## Import history

Below the button, tables list earlier imports with **ID**, **Type**, **File**, **Scan**, **Status** and **Created**, newest first. **File** downloads the uploaded file, **Scan** opens the scan that the import produced. If an import failed, a warning icon shows the reason in the **Scan** or **Status** column.

📸 *Screenshot: the Imports tab with the Import button and the history table.*

## Related

- [Create & List Modules](../../02-modules/01-create-and-list.md)
- [Import Scans](../../../02-inbound/02-import-scans.md)
