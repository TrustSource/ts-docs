# Compliance Check

> Ad-hoc validation calls for licences and components — the "can we use this?" API that powers the in-product Check page.

## Use cases

- Drive an in-house self-service checker where developers paste package identifiers and get a verdict.
- Validate a proposed licence combination before pushing a change.
- Batch-check a list of components as part of a vendor evaluation.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| POST | `/compliance/check/license` | Check license compliance | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| POST | `/compliance/check/component` | Check component compliance | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Check](../../02-inbound/01-check.md) — UI-side documentation
- [Licences](../../05-knowledge/06-licenses.md) — catalogue behind the verdicts
- [Open-Source Policy](../../05-knowledge/07-open-source-policy.md) — the active policy consulted
- [Endpoint groups](index.md)
