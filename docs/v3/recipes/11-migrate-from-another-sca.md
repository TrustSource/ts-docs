# Recipe: Migrate from Another SCA Tool

Import existing scan data or SBOMs from another software composition analysis tool.

## Steps

1. Export your data from the existing tool as **SPDX** or **CycloneDX** format.
2. Create the target project in ***TrustSource***. The modules are created by the import.
3. Upload the SBOM files under [Inbound (Scans) → Import Scans](../02-inbound/02-import-scans.md), or with the [import API](../09-rest-api/endpoints/imports.md). The project's [Imports](../03-internal/01-projects/settings/11-module-import.md) page shows the import history.
4. Review the imported components and adjust whitelists/policies.
5. Set up [CI/CD integration](../02-inbound/03-cicd-scan.md) for ongoing scanning.
