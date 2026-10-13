# Crypto management (Project)

> [!NOTE]
> **Required role:** everyone who can open the project settings reads the tab. Managers who are the project's default project manager or default compliance manager (or any manager while none is set) can change it. **Add algorithm** and **Export as CycloneDX** are shown to Manager and Compliance manager. See the [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md).

The Crypto management tab keeps the cryptographic inventory and the export-control rules of the project.

## Panels

| Panel | What it holds |
|---|---|
| **List of Algorithms as detected** | One label per algorithm found in the project's components, for example `AES [256]`. A red **B** marks an algorithm denied by company policy. Without findings the panel reads *No crypto algorithms or components containing crypto algorithms identified*. |
| **List of Algorithms as managed** | Crypto assets you maintain yourself. **Add algorithm** opens the **Algorithm evaluation** dialog (name, asset type and the fields of that type, comment, **In use**, origin). The table shows **Added**, **B**, **Name**, **Asset type**, **Details**, **Comment** and **In use**. |
| **Export controls management** | One row per algorithm and strength with the countries for which import and export are **Strict**, **Weak** or **Irrelevant**. Select the algorithm and countries and click **Create**; the trash icon removes a row. Selecting a row highlights the countries on a map. |

Entries inherited from the company carry the label **in Company** and link to the company settings. The project's entries appear in its modules with the label **in Project**.

**Export as CycloneDX** offers **CBOM** (the cryptographic assets only) and **Full BOM (components + crypto + AI)**.

The asset types and their fields are described under [Crypto management (Module)](../../02-modules/settings/10-encryption.md).

![The Crypto management tab of Webshop: the detected algorithms with DES and SHA-1 marked B as denied by company policy, the managed list with Add algorithm, Export as CycloneDX and DES, SHA-1 and RSA marked In use with comments, and the Export controls management panel.](../../../../assets/images/ce/03-internal/01-projects/settings/05-encryption-1.webp)

## Related

- [Crypto management (Module)](../../02-modules/settings/10-encryption.md)
- [Policies](../../../06-administration/05-policies.md): company crypto algorithm policy
- [Background: Crypto Agility](../../../../shared/background/06-crypto-agility.md) and [Export Controls](../../../../shared/background/08-export-controls.md)
