# Analysis (Reports Hub)

> [!NOTE]
> **Required role:** `compliance_manager`, `manager` or `account_admin`

The Reports page is a hub that links to all report types in ***TrustSource***. From here you can navigate to SBOM, SOUP, Notice and CSAF document generation.

## Available report types

| Report | Purpose | License required |
|---|---|---|
| **SBOM Files** | Software Bill of Materials (SPDX, CycloneDX). | — |
| **Notice Files** | Attribution / open-source notice files. | — |
| **SOUP Files** | Software of Unknown Provenance lists. | `medical` |
| **CSAF Documents** | Security advisory documents. | `csaf` |

Each report type has its own list and detail pages — see the [Outbound chapter](../04-outbound/index.md) for full documentation.

📸 *Screenshot: the Reports hub page with links to SBOM, Notice, SOUP and CSAF.*

## Related

- [Outbound chapter](../04-outbound/index.md) — detailed documentation for each report type
- [Approvals](06-approvals/index.md) — reports are often generated as part of the approval workflow
