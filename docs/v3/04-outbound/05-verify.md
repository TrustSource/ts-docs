# Verify

> [!NOTE]
> **Required role:** `compliance_manager`, `manager` or `account_admin`

The Verification tool lets you validate documents you receive from suppliers — SBOMs, CSAF advisories, CBOMs (Crypto Bills of Materials) or Notice files.

## How to use it

1. Navigate to **Outbound → Verify**.
2. Paste the document content or upload a file.
3. Click **Verify**.
4. Review the validation results — schema compliance, completeness, format errors.

📸 *Screenshot: the verification form with paste area and result panel showing OK/errors.*

## Supported formats

- SPDX (JSON, tag-value, RDF/XML)
- CycloneDX (JSON, XML)
- CSAF (JSON)
- CBOM (JSON)
- Notice files (text)

## Related

- [SBOM Files](01-sbom-files.md) — generating your own SBOMs
- [CSAF Documents](04-csaf.md) — creating your own advisories
