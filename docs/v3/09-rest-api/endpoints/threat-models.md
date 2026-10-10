# Threat models

> Store and manage the threat-model documents of a project.

## Use cases

- Store a threat model that your own tooling or an agent generated.
- Read the latest threat model of a project into a review tool.
- Mark a stored document as draft, reviewed or approved.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/projects/{project_id}/threat-models` | List threat-model documents | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/projects/{project_id}/threat-models` | Store threat-model document | `developer`, `manager`, `portfolio_manager`, `compliance_manager`, `company_security_manager` |
| GET | `/core/projects/{project_id}/threat-models/{id}` | Get threat-model document | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| PUT | `/core/projects/{project_id}/threat-models/{id}` | Update document status | `developer`, `manager`, `portfolio_manager`, `compliance_manager`, `company_security_manager` |
| DELETE | `/core/projects/{project_id}/threat-models/{id}` | Delete threat-model document | `manager`, `account_admin`, `enterprise_admin`, `portfolio_manager`, `company_security_manager` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Notes

- A document is the complete OTM YAML or Threat Dragon JSON as a string, up to 5 MB. Pass `validate=true` to check it against the format schema.
- `GET` lists the documents newest first. `latest=true` returns only the most recent one.
- `PUT` changes the review status only.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Endpoint groups](index.md)
