# OBOM

> Upload and read the Operational BOM (OBOM) of a project or module, the inventory of what runs in a deployment.

## Use cases

- Publish the OBOM from the same CI job that publishes the SBOM.
- Let a security agent read what a deployment runs on.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| POST | `/core/imports/scan/obom` | Upload an OBOM (JSON body) | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| POST | `/core/imports/scan/obom/json` | Upload an OBOM (file upload) | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| GET | `/core/obom` | Read the OBOM of a project or module | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## How it works

- The document must be a CycloneDX BOM that carries the property `trustsource:bomType` with the value `obom` in `metadata.properties`. Documents without it are rejected with `400`.
- The scope of the OBOM follows from the query parameters. If you name a module (`moduleId`, `moduleName`, `moduleIdentifier`, `scanId` or `analysisId`), the OBOM belongs to that module; if you name only a project (`projectId` or `projectName`), it belongs to the project.
- `GET /core/obom` returns the most recent OBOM stored for one scope.

## Module naming

Every upload path resolves a module name to a module by **exact string match** within the project. It is not normalised, case-folded or fuzzy-matched.

If a dependency scan or SBOM import names a module after its package manifest, for example `@my-org/billing-service`, and a separate SARIF upload sends the checkout folder name `billing-service`, the two uploads create two different modules. The upload succeeds, but neither module is complete.

Use the same module name on every upload path, copied from the module as ***TrustSource*** records it, or send `moduleId` instead. A `moduleId` always wins and skips name matching.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md). The account needs the licence feature `obom`; without it the call fails with `403`. See [License features](../../10-roles-permissions/07-license-features.md).

## Related

- [Endpoint groups](index.md)
