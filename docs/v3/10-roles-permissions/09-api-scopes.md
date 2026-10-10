# API scopes

> [!NOTE]
> Generated from the OpenAPI v2 specification (118 operations) and the scope checks of the REST API in ***TrustSource*** 3.3.59 on 2026-10-10. The Repository and Vulnerabilities rows come from the earlier API documentation. Operations whose scope is not documented anywhere are listed separately instead of guessed.

Every API key carries a scope: one or more role names. A key may call an operation only if at least one of its scopes is allowed to. A call outside the scope fails with `403`. The scope of a key is set when you [create the key](../06-administration/04-api-keys.md). A personal access key takes your own roles as its scope.

## Scope names

| Column | Scope (role) |
|---|---|
| Dev | `developer` (Developer) |
| Mgr | `manager` (Manager) |
| Compl | `compliance_manager` (Compliance Manager) |
| Port | `portfolio_manager` (Portfolio Manager) |
| Sec | `company_security_manager` (Company Security Manager) |
| Comp | `company_component_manager` (Company Component Manager) |
| Acct | `account_admin` (Account Admin) |
| Ent | `enterprise_admin` (Enterprise Admin) |

An `x` means the scope may call the operation. The column **Licence** names a licence feature that the account needs in addition; without it the call fails with `403`. See [License features](07-license-features.md).

> [!TIP]
> Give a key the smallest scope that does the job. A scanner that submits scans needs `developer`; it does not need `account_admin`.

## Matrix

### Account

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /account/authorization` | x | x | x | x | x | x | x | x |  |

### Projects

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/projects` |  | x | x | x | x |  |  |  |  |
| `POST /core/projects` | x | x |  | x |  |  |  |  |  |
| `GET /core/projects/{project_id}` |  | x | x | x | x |  |  |  |  |
| `POST /core/projects/{project_id}` | x | x |  | x |  |  |  |  |  |
| `DELETE /core/projects/{project_id}` |  | x |  | x |  |  | x | x |  |
| `GET /core/projects/{project_id}/partsList` |  | x | x | x | x |  |  |  |  |
| `GET /core/projects/{project_id}/sbom` |  | x | x | x | x |  |  |  |  |
| `GET /core/projects/{project_id}/aibom` |  | x | x | x | x |  |  |  |  |
| `GET /core/projects/{project_id}/cbom` |  | x | x | x | x |  |  |  |  |
| `GET /core/projects/{project_id}/environmental-context` |  | x | x | x | x |  |  |  |  |
| `GET /core/projects/{project_id}/architecture` |  | x | x | x | x |  |  |  |  |
| `POST /core/projects/{project_id}/architecture` | x | x |  | x |  |  |  |  |  |

### Modules

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/modules` |  | x | x | x | x |  |  |  |  |
| `GET /core/modules/{module_id}` |  | x | x | x | x |  |  |  |  |
| `POST /core/modules/{module_id}` | x | x |  |  |  |  |  |  |  |
| `DELETE /core/modules/{module_id}` |  | x |  | x |  |  | x | x |  |
| `GET /core/modules/{module_id}/partsList` |  | x | x | x | x |  |  |  |  |
| `GET /core/modules/{module_id}/sbom` |  | x | x | x | x |  |  |  |  |
| `GET /core/modules/{module_id}/aibom` |  | x | x | x | x |  |  |  |  |
| `GET /core/modules/{module_id}/cbom` |  | x | x | x | x |  |  |  |  |
| `GET /core/modules/{module_id}/environmental-context` |  | x | x | x | x |  |  |  |  |

### Products

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/products` | x | x | x | x | x |  | x |  |  |
| `POST /core/products` | x | x | x |  | x |  | x |  |  |
| `GET /core/products/{product_id}` | x | x | x | x | x |  | x |  |  |
| `POST /core/products/{product_id}` | x | x | x |  | x |  | x |  |  |
| `POST /core/products/{product_id}/retire` |  |  | x |  | x |  | x |  |  |
| `POST /core/products/{product_id}/misuse` | x | x | x |  | x |  | x |  |  |
| `POST /core/products/{product_id}/unretire` |  |  | x |  | x |  | x |  |  |
| `DELETE /core/products/{product_id}/misuse/{item_id}` | x | x | x |  | x |  | x |  |  |
| `POST /core/products/{product_id}/support` | x | x | x |  | x |  | x |  |  |
| `DELETE /core/products/{product_id}/support/{item_id}` | x | x | x |  | x |  | x |  |  |
| `POST /core/products/{product_id}/solution` | x | x | x |  | x |  | x |  |  |
| `DELETE /core/products/{product_id}/solution/{approval_id}` | x | x | x |  | x |  | x |  |  |
| `POST /core/products/{product_id}/photo` | x | x | x |  | x |  | x |  |  |
| `DELETE /core/products/{product_id}/photo` | x | x | x |  | x |  | x |  |  |
| `POST /core/products/{product_id}/document` | x | x | x |  | x |  | x |  |  |
| `DELETE /core/products/{product_id}/document` | x | x | x |  | x |  | x |  |  |

### Scans

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/scans` | x | x | x | x | x |  |  |  |  |
| `POST /core/scans` | x | x |  |  |  |  |  |  |  |
| `GET /core/scans/{scan_id}` | x | x | x | x | x |  |  |  |  |
| `POST /core/scans/{scan_id}/reprocess` | x | x | x | x | x |  |  |  |  |
| `GET /core/scans/{scan_id}/binaryLinks` | x | x | x | x | x |  |  |  |  |
| `POST /core/scans/{scan_id}/binaryLinks` | x | x | x |  |  |  |  |  |  |
| `POST /core/imports/scan/cyclonedx` | x | x | x | x | x | x |  |  |  |
| `POST /core/imports/scan/cyclonedx/json` | x | x | x | x | x | x |  |  |  |
| `POST /core/imports/scan/spdx` | x | x | x | x | x | x |  |  |  |
| `POST /core/imports/scan/spdx/json` | x | x | x | x | x | x |  |  |  |
| `POST /core/imports/scan/spdx/rdf` | x | x | x | x | x | x |  |  |  |

### OBOM

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `POST /core/imports/scan/obom` | x | x | x | x | x | x |  |  | `obom` |
| `POST /core/imports/scan/obom/json` | x | x | x | x | x | x |  |  | `obom` |
| `GET /core/obom` |  | x | x | x | x |  |  |  | `obom` |

### Tests

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/tests/sarif` |  | x | x | x | x |  |  |  | `sarif` |
| `POST /core/tests/sarif` | x | x | x | x | x | x |  |  | `sarif` |
| `POST /core/tests/sarif/json` | x | x | x | x | x | x |  |  | `sarif` |
| `GET /core/tests/sarif/{id}` |  | x | x | x | x |  |  |  | `sarif` |

### Reports

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/reports/algorithms` |  |  | x | x | x |  |  |  |  |
| `GET /core/reports/vulnerabilities` | x | x | x | x | x | x |  |  |  |
| `GET /core/reports/versioning` | x | x | x | x | x | x |  |  |  |
| `GET /core/reports/viability` | x | x | x | x | x | x |  |  |  |
| `GET /core/reports/licenses` | x | x | x | x |  |  |  |  |  |
| `GET /core/reports/cve` |  | x | x | x | x | x |  |  |  |
| `GET /core/reports/dashboard` |  | x | x | x | x | x |  |  |  |
| `GET /core/reports/endoflife` |  |  | x | x | x |  |  |  |  |

### Risks

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/risks` |  | x | x | x | x |  |  |  |  |
| `POST /core/risks` | x | x | x | x | x |  |  |  |  |
| `GET /core/risks/{risk_id}` |  | x | x | x | x |  |  |  |  |
| `POST /core/risks/{risk_id}` | x | x | x | x | x |  |  |  |  |
| `PATCH /core/risks/{risk_id}` | x | x | x | x | x |  |  |  |  |
| `DELETE /core/risks/{risk_id}` |  | x |  | x | x |  | x | x |  |
| `GET /core/risks/reports/inventory` |  | x | x | x | x |  |  |  |  |
| `GET /core/risks/scheme` | x | x | x | x | x |  |  |  |  |
| `GET /core/risks/reports/trend` |  | x | x | x | x |  |  |  |  |
| `GET /core/risks/{risk_id}/history` |  | x | x | x | x |  |  |  |  |
| `GET /core/risks/{risk_id}/tasks` |  | x | x | x | x |  |  |  |  |
| `POST /core/risks/{risk_id}/tasks` | x | x | x | x | x |  |  |  |  |
| `GET /core/risks/{risk_id}/tasks/{task_id}` |  | x | x | x | x |  |  |  |  |
| `POST /core/risks/{risk_id}/tasks/{task_id}` | x | x | x | x | x |  |  |  |  |
| `DELETE /core/risks/{risk_id}/tasks/{task_id}` |  | x |  | x | x |  | x | x |  |
| `GET /core/risks/{risk_id}/countermeasures` |  | x | x | x | x |  |  |  |  |
| `POST /core/risks/{risk_id}/countermeasures` | x | x | x | x | x |  |  |  |  |
| `GET /core/risks/{risk_id}/countermeasures/{cm_id}` |  | x | x | x | x |  |  |  |  |
| `POST /core/risks/{risk_id}/countermeasures/{cm_id}` | x | x | x | x | x |  |  |  |  |
| `DELETE /core/risks/{risk_id}/countermeasures/{cm_id}` |  | x |  | x | x |  | x | x |  |

### Threat Modeling

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/projects/{project_id}/threat-models` |  | x | x | x | x |  |  |  |  |
| `POST /core/projects/{project_id}/threat-models` | x | x | x | x | x |  |  |  |  |
| `GET /core/projects/{project_id}/threat-models/{id}` |  | x | x | x | x |  |  |  |  |
| `PUT /core/projects/{project_id}/threat-models/{id}` | x | x | x | x | x |  |  |  |  |
| `DELETE /core/projects/{project_id}/threat-models/{id}` |  | x |  | x | x |  | x | x |  |

### Approval

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /compliance/approvals` |  | x | x | x | x |  |  |  |  |
| `POST /compliance/approvals` |  | x |  |  |  |  |  |  |  |
| `GET /compliance/approvals/{approval_id}` |  | x | x | x | x |  |  |  |  |
| `POST /compliance/approvals/{approval_id}/approve` |  |  | x |  |  |  |  |  |  |
| `POST /compliance/approvals/{approval_id}/reject` |  |  | x |  |  |  |  |  |  |

### Check

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `POST /compliance/check/license` | x | x | x | x | x | x |  |  |  |
| `POST /compliance/check/component` | x | x | x | x | x | x |  |  |  |

### Company

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /compliance/company/foss` | x | x | x | x | x | x | x | x |  |

### CSAF

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `POST /compliance/csaf` |  | x | x |  | x |  | x |  | `csaf` |

### Repository (DeepScan)

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `POST /repository/scan` | x | x | x |  | x | x |  |  |  |
| `GET /repository/results` | x | x | x | x | x | x |  |  |  |
| `GET /repository/status` | x | x | x |  | x | x |  |  |  |

### Vulnerabilities

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `POST /vulnerabilities/cveDetails` | x | x | x | x | x | x | x | x |  |
| `POST /vulnerabilities/cveFind` | x | x | x | x | x | x | x | x |  |
| `GET /vulnerabilities/cwes/{cwe_id}` | x | x | x | x | x | x | x | x |  |

> [!NOTE]
> The scopes for the Repository and Vulnerabilities groups are taken from the earlier API documentation. These groups are answered by separate backends, so the application code cannot confirm them.

### Users

| Operation | Dev | Mgr | Compl | Port | Sec | Comp | Acct | Ent | Licence |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/users/nologin` |  |  |  |  |  |  | x | x |  |
| `GET /core/users/usage` |  |  |  |  |  |  | x |  |  |

Notes:

- Creating or updating a project with `POST /core/projects` is open to `developer`, `manager` and `portfolio_manager`. Setting the automatic-risk switches in the same call additionally needs `account_admin`, `manager` or `compliance_manager`.
- `GET /account/authorization` and `GET /compliance/company/foss` check no scope: any valid key may call them.

## Operations with a key in the URL

These operations need no `x-api-key` header and no scope. The key in the URL decides what you can read. See [Public routes](../09-rest-api/05-public-routes.md).

| Operation | Key |
|---|---|
| `GET /compliance/releases/{release_key}/sbom` | [Release key](../06-administration/04b-release-keys.md) |
| `GET /compliance/releases/{release_key}/notice` | [Release key](../06-administration/04b-release-keys.md) |
| `GET /compliance/releases/{release_key}/csaf` | [Release key](../06-administration/04b-release-keys.md) |
| `GET /compliance/releases/{release_key}/csaf-changes` | [Release key](../06-administration/04b-release-keys.md) |
| `GET /compliance/csaf/{csaf_key}/documents` | CSAF feed key |
| `GET /compliance/csaf/{csaf_key}/documents/{document_id}` | CSAF feed key |

## Operations without a verified scope

No scope mapping is documented for these operations: they are answered by separate services and are new since the earlier API documentation. They are listed so that nothing looks allowed or forbidden by omission.

| Operation | Why it is not in the matrix |
|---|---|
| `POST /vulnerabilities/cveFindByKey` | Served by a separate backend; no scope mapping in the application code |
| `GET /euvd/{id}` | Served by a separate backend; no scope mapping in the application code |
| `POST /euvd` | Served by a separate backend; no scope mapping in the application code |
| `POST /epss` | Served by a separate backend; no scope mapping in the application code |
| `GET /epss/{cve_id}/history` | Served by a separate backend; no scope mapping in the application code |
| `GET /psirt/csaf` | Handler checks no role scope; gateway needs a valid key |

## Keys without a scope

Keys created before scopes became mandatory may carry no scope. How such a key is treated depends on the deployment. Give every key a scope.

## Related

- [API keys](../06-administration/04-api-keys.md)
- [The 8 Public Roles](01-roles-overview.md)
- [Endpoint groups](../09-rest-api/endpoints/index.md)
- [License features](07-license-features.md)
