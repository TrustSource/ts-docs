# Tests (SARIF)

> Submit SARIF test-result documents from any SAST, IAST, or security-scanning tool so findings flow into the Tests workspace alongside your scans.

## Use cases

- Push SonarQube, CodeQL, Semgrep, or any other SARIF-emitting tool's findings into TrustSource from CI.
- Aggregate multiple tools' findings in one place for unified reporting and release gating.
- Feed the Tests report that compliance uses for release sign-off.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/tests/sarif` | List imported SARIF documents | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/tests/sarif` | Import SARIF test results (JSON body) | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| POST | `/core/tests/sarif/json` | Import SARIF test results (file upload) | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| GET | `/core/tests/sarif/{id}` | Get an imported SARIF document | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Module naming

Every upload path resolves a module name to a module by **exact string match** within the project. It is not normalised, case-folded or fuzzy-matched.

If a dependency scan or SBOM import names a module after its package manifest, for example `@my-org/billing-service`, and a separate SARIF upload sends the checkout folder name `billing-service`, the two uploads create two different modules. The upload succeeds, but neither module is complete.

Use the same module name on every upload path, copied from the module as ***TrustSource*** records it, or send `moduleId` instead. A `moduleId` always wins and skips name matching.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md). The account needs the licence feature `sarif`; without it the call fails with `403`. See [License features](../../10-roles-permissions/07-license-features.md).

## Related

- [Tests](../../02-inbound/04-sw-quality-scans.md)
- [Scans](scans.md) — component scans (parallel track)
- [Approvals](compliance-approvals.md) — release gates that consume test data
- [Endpoint groups](index.md)
