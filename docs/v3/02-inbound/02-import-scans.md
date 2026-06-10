# Import Scans

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

The **Import Scans** page lets you upload an existing SBOM or scan result file directly into ***TrustSource*** — without setting up a CI/CD pipeline or connecting a repository.

## When to use it

- You received an SBOM from a supplier and want to track its components.
- You ran a scanner locally and have a file to upload.
- You want to import a CycloneDX or SPDX document as a new scan.
- You are migrating data from another SCA tool.

## How to import

1. Navigate to **Inbound → Import Scans**.
2. Select the **target project** and **module** — or create a new module on the fly.
3. Choose the file format (auto-detected in most cases):
   - CycloneDX (JSON/XML)
   - SPDX (JSON/tag-value)
   - TrustSource native format
4. Upload the file.
5. Click **Import**.

***TrustSource*** processes the file, maps components to its knowledge base, and creates a new scan entry on the target module.

📸 *Screenshot: the Import Scans page with file upload area and project/module selectors.*

> [!TIP]
> If you need to import scans regularly, consider setting up a [CI/CD integration](03-cicd-scan.md) instead — it automates the process on every build.

## Related

- [CI/CD Scan](03-cicd-scan.md) — automated scan ingestion from build pipelines
- [Mental Model](../00-getting-started/05-mental-model.md) — how scans relate to modules and projects
