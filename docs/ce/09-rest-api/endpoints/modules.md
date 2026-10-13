# Modules

> List, read, update and delete modules. Fetch a module's parts list, SBOM, AIBOM, CBOM and CVSS environmental context.

Modules are created by uploads (scans, SBOM imports, SARIF) and in the app. There is no operation that creates an empty module.

## Use cases

- Look up the module a pipeline uploads to, and read its latest analysis status.
- Manage module settings (allow and deny lists, legal requirements, viability and versioning thresholds) as code.
- Export a module's parts list, CBOM or AIBOM.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/modules` | List modules | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/modules/{module_id}` | Get module details, settings and latest analysis | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/modules/{module_id}` | Update module | `developer`, `manager` |
| DELETE | `/core/modules/{module_id}` | Delete module | `manager`, `account_admin`, `portfolio_manager` |
| GET | `/core/modules/{module_id}/partsList` | Get module parts list | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/modules/{module_id}/sbom` | Get module SBOM (app JSON format) | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/modules/{module_id}/aibom` | Get module AIBOM (CycloneDX 1.7) | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/modules/{module_id}/cbom` | Get module CBOM (CycloneDX 1.7) | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/modules/{module_id}/environmental-context` | Get module CVSS environmental context | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |

The full schemas are in the [OpenAPI specification](index.md#the-specification).

## Listing modules

`GET /core/modules` returns up to 100 modules per page, sorted by name, each as `_id`, `name`, `description`. Use the detail operation for status and settings.

| Query parameter | Meaning |
|---|---|
| `page` | Page number, starting at 1 |
| `projectId` | Only modules of this project |
| `tags` | Comma-separated tag names |

## Module details

`GET /core/modules/{module_id}` returns:

- `status` - `ok`, `warnings` or `violations`;
- `analysis` - the latest analysis: `_id`, `date`, `scanId` and `statistics` with warning and violation counts for `legal`, `vulnerability`, `viability`, `versioning` and `integrity`;
- the settings: `name`, `version`, `description`, `moduleIdentifier`, `projectId`, `tags`, `confidenceMinScore`, `licenseConfig`, `componentConfig`, `viabilityConfig`, `versioningConfig`, `cveConfig`, `obligationConfig`, `legalRulesConfig`, `requirements` (`TS`, `LS`, `D`), `ciaRequirements`, `properties` (`architectureType`, `architecture`, `privacy`), `environmentalConfig`, `endoflifePolicy`, `customComponents`.

## Updating a module

`POST /core/modules/{module_id}` accepts the settings fields. The rules are the same as for projects:

- Only the fields in the body change, but each top-level field replaces the stored value as a whole. Read the module, change it, post it back.
- `companyId` comes from the key. Unknown fields are dropped.
- The response is the full module document.

`componentConfig.licensesSelected` holds the effective license chosen for multi-licensed components and licenses set by hand. The audit fields of a hand-set license (`justification`, `resolvedBy`, `resolvedById`, `resolvedAt`) are read-only: values you send are discarded and the stored ones are kept. Setting a license by hand with a justification is done in the app. See [Manual license resolution](../../03-internal/02-modules/06-manual-license-resolution.md).

## Deleting a module

`DELETE /core/modules/{module_id}` removes the module and answers `204`.

## Parts list, SBOM, AIBOM and CBOM

- `partsList` returns `_id`, `name`, `status`, `lastAnalysis` and `components` with name, `status` (`os`, `commercial` or `unknown`), versions and licenses.
- `sbom` returns the module's bill of materials in the app's JSON format.
- `aibom` and `cbom` return CycloneDX 1.7 documents. They contain the module's AI artefacts and cryptographic assets, detected from imports or managed in the module settings (**AI / ML** and **Crypto management** tabs).

## Environmental (iCVSS) context

`GET /core/modules/{module_id}/environmental-context` returns:

| Field | Content |
|---|---|
| `moduleId`, `projectId`, `name` | The module |
| `ciaRequirements` | `CR`, `IR`, `AR` as stored, or `null` |
| `environmentalConfig` | `v2vectorString`, `v3vectorString`, `v4vectorString`, each `null` when not set |
| `mav` | Modified Attack Vector from the v4 (else v3) vector: `N`, `A`, `L`, `P`, or `null` |

The values are set in the app with **Env. settings** on the module page and on the **CIA** settings tab.

## Module naming

Uploads find their module by name within the project. Before the comparison, every character other than letters, digits, `-`, `_` and `/` is removed from the name; case is kept, and there is no fuzzy matching. `@my-org/billing-service` therefore becomes `my-org/billing-service`, and `Billing-Service` is a different module from `billing-service`. If a dependency scan names a module `my-org/billing-service` and a SARIF upload sends `billing-service`, you get two modules, neither complete. Use the same name on every upload path, or send `moduleId` where the operation accepts it.

## Related

- [Projects](projects.md)
- [Scans](scans.md), [Imports](imports.md), [Tests (SARIF)](tests.md)
- [Module settings](../../03-internal/02-modules/settings/index.md) - the same settings in the app
- [Endpoint groups](index.md)
