# Recipe: Migrate from Another SCA Tool

Import existing scan data or SBOMs from another software composition analysis tool.

## Steps

1. Export your data from the existing tool as **SPDX** or **CycloneDX** format.
2. Create the target project and modules in ***TrustSource***.
3. Upload the SBOM files via [Inbound → Scans](../02-inbound/02-scans.md) or [Module Import](../03-internal/01-projects/settings/11-module-import.md).
4. Review the imported components and adjust whitelists/policies.
5. Set up [CI/CD integration](../02-inbound/03-cicd-integrations.md) for ongoing scanning.
