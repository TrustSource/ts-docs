# SBOM Files (SPDX, CycloneDX)

> [!NOTE]
> **Required role:** `compliance_manager`, `manager` or `account_admin`

***TrustSource*** generates Software Bills of Materials in both **SPDX** and **CycloneDX** formats. SBOMs can be generated from a module, an approval, or a project.

## What you can do

- **Generate** an SBOM from any module with scan data.
- **Upload** an existing SBOM to create or update a module's component list.
- **Freeze** an SBOM version — lock it to a specific point in time (typically at approval).
- **Download** in SPDX (JSON, tag-value, RDF/XML) or CycloneDX (JSON, XML) format.
- **Version** SBOMs — track how the bill of materials changes over time.

📸 *Screenshot: the SBOM files list with version, format and freeze status.*

📸 *Screenshot: an SBOM detail page with component list and download options.*

## Related

- [Working with Scans](../02-inbound/02-scans.md) — how component data enters the SBOM
- [Approvals](../03-internal/06-approvals/index.md) — SBOMs are frozen at approval time
- [Background: SBOM Formats](../../shared/background/10-sbom-formats.md) — SPDX vs CycloneDX comparison
