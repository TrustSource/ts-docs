# Reports

> Pull any of the eight analytical reports via REST — the same data that powers the in-product Analysis page.

## Use cases

- Embed TrustSource reports into an external BI or dashboard system.
- Feed a scheduled PDF export to an executive review.
- Drive a notification system that alerts on report-level changes (new EOL components, new critical vulnerabilities, new banned algorithms).

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/reports/algorithms` | Get algorithms report | `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/reports/vulnerabilities` | Get vulnerability report | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| GET | `/core/reports/versioning` | Get versioning report | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| GET | `/core/reports/viability` | Get viability report | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| GET | `/core/reports/licenses` | Get licenses report | `developer`, `manager`, `compliance_manager`, `portfolio_manager` |
| GET | `/core/reports/cve` | Get impact report | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| GET | `/core/reports/dashboard` | Get dashboard report | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| GET | `/core/reports/endoflife` | Get end-of-life report | `compliance_manager`, `portfolio_manager`, `company_security_manager` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Analysis](../../03-internal/04-reports.md)
- [Vulnerabilities](vulnerabilities.md) — raw CVE search API
- [Risks](risks.md) — track follow-up from report findings
- [Compliance Approvals](compliance-approvals.md) — approvals consume some report data
- [Endpoint groups](index.md)
