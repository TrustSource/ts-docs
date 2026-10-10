# Imports (CycloneDX & SPDX)

> Submit existing SBOM documents — in CycloneDX or SPDX format — as scans, so that third-party data flows into the same pipeline as native TrustSource scans.

## Use cases

- Onboard a third-party SBOM delivered by a vendor.
- Migrate an older compliance programme whose output lives in CycloneDX or SPDX.
- Consume SBOMs produced by non-TrustSource scanners alongside your own.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| POST | `/core/imports/scan/cyclonedx` | Import CycloneDX SBOM (JSON body) | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| POST | `/core/imports/scan/cyclonedx/json` | Import CycloneDX SBOM (file upload) | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| POST | `/core/imports/scan/spdx` | Import SPDX SBOM (JSON body) | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| POST | `/core/imports/scan/spdx/json` | Import SPDX SBOM (JSON file) | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| POST | `/core/imports/scan/spdx/rdf` | Import SPDX SBOM (RDF file) | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Module naming

Every upload path resolves a module name to a module by **exact string match** within the project. It is not normalised, case-folded or fuzzy-matched.

If a dependency scan or SBOM import names a module after its package manifest, for example `@my-org/billing-service`, and a separate SARIF upload sends the checkout folder name `billing-service`, the two uploads create two different modules. The upload succeeds, but neither module is complete.

Use the same module name on every upload path, copied from the module as ***TrustSource*** records it, or send `moduleId` instead. A `moduleId` always wins and skips name matching.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Scans](scans.md)
- [Modules](modules.md)
- [Tests (SARIF)](tests.md)
- [OBOM](obom.md)
- [Verify](../../04-outbound/05-verify.md)
- [Endpoint groups](index.md)
