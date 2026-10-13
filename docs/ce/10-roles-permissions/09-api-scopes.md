# API scopes

> [!NOTE]
> Generated from the scope checks of the REST API in ***TrustSource CE*** 1.0 (`imports/server/rest-api/`) and the OpenAPI specification shipped with the app (`public/api-v2/openapi.yaml`).

Every API key carries a scope: a list of role keys. A key may call an operation only if at least one of its scopes is allowed to. The scope of a company key is set when you [create the key](../06-administration/04-api-keys.md); a personal access key takes your own roles at creation time as its scope.

| Situation | Response |
|---|---|
| No `x-api-key` header | `401` "API-key missing" |
| Unknown or unpublished key | `403` "Invalid API-key" |
| Valid key, scope does not allow the operation | `403` "API-key scope is limited" |

## Keys without a scope

A key without any scope field (for example a key that predates scopes) passes **every** scope check: it can call every operation in the tables below. A key with an empty scope list passes none. The **Create key** dialog always creates keys with at least one scope. Check the **Scopes** column under **Administration → API keys** and replace any key without a scope.

## Scope names

| Column | Scope (role) |
|---|---|
| Dev | `developer` (Developer) |
| CM | `compliance_manager` (Compliance manager) |
| PM | `portfolio_manager` (Portfolio manager) |
| Mgr | `manager` (Manager) |
| AA | `account_admin` (Account admin) |
| CCM | `company_component_manager` (Company component manager) |
| CSM | `company_security_manager` (Company security manager) |

An `x` means the scope may call the operation. Paths are relative to `https://<your-host>/api/v2`.

> [!TIP]
> Give a key the smallest scope that does the job. A scanner that submits scans needs `developer`; it does not need `account_admin`.

## Matrix

### Account

| Operation | Dev | CM | PM | Mgr | AA | CCM | CSM |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /account/authorization` | x | x | x | x | x | x | x |

### Projects

| Operation | Dev | CM | PM | Mgr | AA | CCM | CSM |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/projects` |  | x | x | x |  |  | x |
| `POST /core/projects` | x |  | x | x |  |  |  |
| `GET /core/projects/{project_id}` |  | x | x | x |  |  | x |
| `POST /core/projects/{project_id}` | x |  | x | x |  |  |  |
| `DELETE /core/projects/{project_id}` |  |  | x | x | x |  |  |
| `GET /core/projects/{project_id}/partsList` |  | x | x | x |  |  | x |
| `GET /core/projects/{project_id}/sbom` |  | x | x | x |  |  | x |
| `GET /core/projects/{project_id}/aibom` |  | x | x | x |  |  | x |
| `GET /core/projects/{project_id}/cbom` |  | x | x | x |  |  | x |
| `GET /core/projects/{project_id}/environmental-context` |  | x | x | x |  |  | x |
| `GET /core/projects/{project_id}/architecture` |  | x | x | x |  |  | x |
| `POST /core/projects/{project_id}/architecture` | x |  | x | x |  |  |  |

Setting `autoCreateCweRisks` with `POST /core/projects` or `POST /core/projects/{project_id}` additionally needs `account_admin`, `manager` or `compliance_manager`.

### Modules

| Operation | Dev | CM | PM | Mgr | AA | CCM | CSM |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/modules` |  | x | x | x |  |  | x |
| `GET /core/modules/{module_id}` |  | x | x | x |  |  | x |
| `POST /core/modules/{module_id}` | x |  |  | x |  |  |  |
| `DELETE /core/modules/{module_id}` |  |  | x | x | x |  |  |
| `GET /core/modules/{module_id}/partsList` |  | x | x | x |  |  | x |
| `GET /core/modules/{module_id}/sbom` |  | x | x | x |  |  | x |
| `GET /core/modules/{module_id}/aibom` |  | x | x | x |  |  | x |
| `GET /core/modules/{module_id}/cbom` |  | x | x | x |  |  | x |
| `GET /core/modules/{module_id}/environmental-context` |  | x | x | x |  |  | x |

### Products

| Operation | Dev | CM | PM | Mgr | AA | CCM | CSM |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/products` | x | x | x | x | x |  | x |
| `POST /core/products` | x | x |  | x | x |  | x |
| `GET /core/products/{product_id}` | x | x | x | x | x |  | x |
| `POST /core/products/{product_id}` | x | x |  | x | x |  | x |
| `POST /core/products/{product_id}/retire` |  | x |  |  | x |  | x |
| `POST /core/products/{product_id}/unretire` |  | x |  |  | x |  | x |
| `POST /core/products/{product_id}/misuse` | x | x |  | x | x |  | x |
| `DELETE /core/products/{product_id}/misuse/{item_id}` | x | x |  | x | x |  | x |
| `POST /core/products/{product_id}/support` | x | x |  | x | x |  | x |
| `DELETE /core/products/{product_id}/support/{item_id}` | x | x |  | x | x |  | x |
| `POST /core/products/{product_id}/solution` | x | x |  | x | x |  | x |
| `DELETE /core/products/{product_id}/solution/{approval_id}` | x | x |  | x | x |  | x |
| `POST /core/products/{product_id}/photo` | x | x |  | x | x |  | x |
| `DELETE /core/products/{product_id}/photo` | x | x |  | x | x |  | x |
| `POST /core/products/{product_id}/document` | x | x |  | x | x |  | x |
| `DELETE /core/products/{product_id}/document` | x | x |  | x | x |  | x |

### Scans and imports

| Operation | Dev | CM | PM | Mgr | AA | CCM | CSM |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/scans` | x | x | x | x |  |  | x |
| `POST /core/scans` | x |  |  | x |  |  |  |
| `GET /core/scans/{scan_id}` | x | x | x | x |  |  | x |
| `POST /core/scans/{scan_id}/reprocess` | x | x | x | x |  |  | x |
| `GET /core/scans/{scan_id}/binaryLinks` | x | x | x | x |  |  | x |
| `POST /core/scans/{scan_id}/binaryLinks` | x | x |  | x |  |  |  |
| `POST /core/imports/scan/cyclonedx` | x |  |  | x |  |  |  |
| `POST /core/imports/scan/cyclonedx/json` | x |  |  | x |  |  |  |
| `POST /core/imports/scan/spdx` | x |  |  | x |  |  |  |
| `POST /core/imports/scan/spdx/json` | x |  |  | x |  |  |  |
| `POST /core/imports/scan/spdx/rdf` | x |  |  | x |  |  |  |

### Tests (SARIF)

| Operation | Dev | CM | PM | Mgr | AA | CCM | CSM |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/tests/sarif` |  | x | x | x |  |  | x |
| `POST /core/tests/sarif` | x | x | x | x |  | x | x |
| `POST /core/tests/sarif/json` | x | x | x | x |  | x | x |
| `GET /core/tests/sarif/{id}` |  | x | x | x |  |  | x |

### Reports

| Operation | Dev | CM | PM | Mgr | AA | CCM | CSM |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/reports/vulnerabilities` | x | x | x | x |  | x | x |
| `GET /core/reports/versioning` | x | x | x | x |  | x | x |
| `GET /core/reports/viability` | x | x | x | x |  | x | x |
| `GET /core/reports/licenses` | x | x | x | x |  |  |  |
| `GET /core/reports/cve` |  | x | x | x |  | x | x |
| `GET /core/reports/dashboard` |  | x | x | x |  | x | x |
| `GET /core/reports/algorithms` |  | x | x |  |  |  | x |
| `GET /core/reports/endoflife` |  | x | x |  |  |  | x |

### Risks

| Operation | Dev | CM | PM | Mgr | AA | CCM | CSM |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /core/risks` |  | x | x | x |  |  | x |
| `POST /core/risks` | x | x | x | x |  |  | x |
| `GET /core/risks/{risk_id}` |  | x | x | x |  |  | x |
| `POST /core/risks/{risk_id}` | x | x | x | x |  |  | x |
| `DELETE /core/risks/{risk_id}` |  |  | x | x | x |  | x |
| `GET /core/risks/{risk_id}/tasks` |  | x | x | x |  |  | x |
| `POST /core/risks/{risk_id}/tasks` | x | x | x | x |  |  | x |
| `GET /core/risks/{risk_id}/tasks/{task_id}` |  | x | x | x |  |  | x |
| `POST /core/risks/{risk_id}/tasks/{task_id}` | x | x | x | x |  |  | x |
| `DELETE /core/risks/{risk_id}/tasks/{task_id}` |  |  | x | x | x |  | x |
| `GET /core/risks/{risk_id}/countermeasures` |  | x | x | x |  |  | x |
| `POST /core/risks/{risk_id}/countermeasures` | x | x | x | x |  |  | x |
| `GET /core/risks/{risk_id}/countermeasures/{cm_id}` |  | x | x | x |  |  | x |
| `POST /core/risks/{risk_id}/countermeasures/{cm_id}` | x | x | x | x |  |  | x |
| `DELETE /core/risks/{risk_id}/countermeasures/{cm_id}` |  |  | x | x | x |  | x |

### Approvals

| Operation | Dev | CM | PM | Mgr | AA | CCM | CSM |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `POST /compliance/approvals` |  |  |  | x |  |  |  |
| `GET /compliance/approvals/{approval_id}` |  | x | x | x |  |  | x |
| `POST /compliance/approvals/{approval_id}/approve` |  | x |  |  |  |  |  |
| `POST /compliance/approvals/{approval_id}/reject` |  | x |  |  |  |  |  |

### Check

| Operation | Dev | CM | PM | Mgr | AA | CCM | CSM |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `POST /compliance/check/license` | x | x | x | x |  | x | x |
| `POST /compliance/check/component` | x | x | x | x |  | x | x |

### Company and users

| Operation | Dev | CM | PM | Mgr | AA | CCM | CSM |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `GET /compliance/company/foss` | x | x | x | x | x | x | x |
| `GET /core/users/nologin` |  |  |  |  | x |  |  |

`GET /account/authorization` and `GET /compliance/company/foss` check no scope: any valid key may call them.

## Operations with a key in the URL

These operations need no `x-api-key` header and no scope. The key in the URL decides what you can read. See [Public routes](../09-rest-api/05-public-routes.md).

| Operation | Key |
|---|---|
| `GET /compliance/releases/{release_key}/sbom` | [Release key](../06-administration/04b-release-keys.md) with scope `sbom` or no scope |
| `GET /compliance/releases/{release_key}/notice` | [Release key](../06-administration/04b-release-keys.md) with scope `notice` or no scope |
| `GET /compliance/releases/{release_key}/csaf` | [Release key](../06-administration/04b-release-keys.md) with scope `csaf` or no scope |
| `GET /compliance/releases/{release_key}/csaf-changes` | [Release key](../06-administration/04b-release-keys.md) with scope `csaf` or no scope |
| `GET /compliance/csaf/{csaf_key}/documents` | [CSAF feed key](../06-administration/04c-csaf-feed-keys.md) |
| `GET /compliance/csaf/{csaf_key}/documents/{document_id}` | [CSAF feed key](../06-administration/04c-csaf-feed-keys.md) |

## Related

- [API keys](../06-administration/04-api-keys.md)
- [The 7 Roles](01-roles-overview.md)
- [Endpoint groups](../09-rest-api/endpoints/index.md)
- [Authentication](../09-rest-api/01-authentication.md)
