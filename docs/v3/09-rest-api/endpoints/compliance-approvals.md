# Compliance Approvals

> Drive the approval workflow programmatically - initiate requests, query their state, approve or reject from an external system.

## Use cases

- Mirror the approvals queue into a central ticketing system.
- Pull everything still waiting on one reviewer, or everything nobody owns yet.
- Automate approvals for low-risk cases that match a rule.
- Query approval status as part of a release-gate check in a CI pipeline.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/compliance/approvals` | List approval requests | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/compliance/approvals` | Create approval request | `manager` |
| GET | `/compliance/approvals/{approval_id}` | Get approval details | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/compliance/approvals/{approval_id}/approve` | Approve approval request | `compliance_manager` |
| POST | `/compliance/approvals/{approval_id}/reject` | Reject approval request | `compliance_manager` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

### Filtering the list

| Query parameter | Accepts |
|-----------------|---------|
| `status` | `open`, `draft`, `approved`, `rejected` - comma-separate to combine, e.g. `status=open,rejected`. Omit for every state. |
| `assignee` | A user id (the `assignment` the list returns), an e-mail address, or `unassigned` for the requests nobody owns yet. |
| `page` | Page number, starting at 1. |

A request counts as `draft` whatever else is set on it, otherwise `approved`, otherwise `rejected`,
otherwise `open` - the same rule the approvals screen applies. The same `status` is returned by
`GET /compliance/approvals/{approval_id}`.

An e-mail address is resolved inside your own company only; one that matches nobody there returns an
empty list rather than an error.

## Release keys

An approval approved through the API gets a published release key. `GET /compliance/approvals/{approval_id}` returns the key and the SBOM, notice and CSAF URLs it serves, once the approval is approved. Approving an approved request again returns the existing key.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Approve / Reject](../../03-internal/06-approvals/03-approve-reject-workflow.md)
- [Release keys](../../06-administration/04b-release-keys.md)
- [Compliance releases](compliance-releases.md)
- [Endpoint groups](index.md)
