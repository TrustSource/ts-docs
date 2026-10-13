# Projects

> Create, list, read, update and delete projects. Fetch project-level artefacts such as the parts list, the SBOM, the AIBOM and the CBOM, and set a project's Application goals from an `architecture.md` file.

## Use cases

- Create the project from a pipeline before the first upload, without accumulating duplicates.
- Drive dashboards that need a list of every project in the company.
- Pull a project-wide parts list, CBOM or AIBOM into external tools.
- Read and change project settings (allow and deny lists, legal requirements, CIA requirements) as code.
- Populate a project's Application goals from an `architecture.md` file kept in the repository.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/projects` | List projects | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/projects` | Create project (or return the existing one) | `developer`, `manager`, `portfolio_manager` |
| GET | `/core/projects/{project_id}` | Get project details and settings | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/projects/{project_id}` | Update project | `developer`, `manager`, `portfolio_manager` |
| DELETE | `/core/projects/{project_id}` | Delete project | `manager`, `account_admin`, `portfolio_manager` |
| GET | `/core/projects/{project_id}/partsList` | Get project parts list | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/projects/{project_id}/sbom` | Get project SBOM (app JSON format) | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/projects/{project_id}/aibom` | Get project AIBOM (CycloneDX 1.7) | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/projects/{project_id}/cbom` | Get project CBOM (CycloneDX 1.7) | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/projects/{project_id}/environmental-context` | Get the CVSS environmental context of all modules | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/projects/{project_id}/architecture` | Get project Application goals | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/projects/{project_id}/architecture` | Set project Application goals from markdown | `developer`, `manager`, `portfolio_manager` |

The full schemas are in the [OpenAPI specification](index.md#the-specification).

## Listing projects

`GET /core/projects` returns up to 100 projects per page, sorted by name, each as `_id`, `name`, `description`.

| Query parameter | Meaning |
|---|---|
| `page` | Page number, starting at 1 |
| `tags` | Comma-separated tag names; only projects carrying one of them are returned |

## Creating a project

`POST /core/projects` takes a JSON body with `name` (required, 3 to 200 characters, no `<` or `>`) and any of the project settings listed below. It is idempotent on the project name inside the company, so a pipeline can call it on every run:

| Case | Status | Body |
|------|--------|------|
| The name is not in use in this company | `201` | `{"projectId": "<new id>"}` |
| The name is already in use | `200` | `{"projectId": "<existing id>", "existing": true}` |

A repeat is **not** an update. Every other field you send is dropped: nothing is written to the existing project. Follow up with `POST /core/projects/{project_id}` to apply settings.

Names are stored trimmed and compared exactly and case-sensitively, so `"  Storefront  "` and `"Storefront"` are the same project, while `"storefront"` is a different one. The check is not atomic: two callers creating the same new name at the same instant can both succeed. A pipeline that starts several jobs in parallel should create the project once, or address it by id.

## Project settings

`GET /core/projects/{project_id}` returns the project with these settings. `POST /core/projects/{project_id}` accepts the same fields.

| Field | Content |
|---|---|
| `name`, `description` | Name and description (the description is the project's Application goals) |
| `requireWhitelist` | Allow-list mode: components must be explicitly allowed |
| `tags` | Tag ids (not names) |
| `confidenceMinScore` | `"1"`, `"4"` or `"5"` - default confidence level for license findings |
| `licenseConfig` | `whitelist` and `blacklist` of licenses |
| `componentConfig` | `whitelist`, `blacklist`, `unchanged`, `looseCoupled` component lists |
| `cveConfig` | `whitelist` and `blacklist` of CVEs |
| `obligationConfig`, `legalRulesConfig` | Resolved obligations and legal rule exceptions |
| `requirements` | Legal requirements: `CA`, `OM`, `IP_protect`, `IP_enforce` |
| `ciaRequirements` | `CR`, `IR`, `AR`, each `X`, `L`, `M` or `H` |
| `endoflifePolicy` | `enabled`, `warningThreshold`, `violationThreshold` (months) |
| `autoCreateCweRisks` | Keep one risk per weakness (CWE) and tool from SARIF imports |
| `jira`, `tfs`, `github` | Issue tracker settings - write-only, never returned |

Update rules:

- Only the fields in the body are changed, but each top-level field replaces the stored value as a whole. Always send the complete object, for example the whole `licenseConfig` with both lists. Read the project first, change it, then post it back.
- `companyId` comes from the key and cannot be set. Unknown fields are dropped.
- Setting `autoCreateCweRisks` also needs `manager`, `compliance_manager` or `account_admin` in the key's scope.
- The response is the updated project with the same fields as the GET.

## Deleting a project

`DELETE /core/projects/{project_id}` answers `204`. If the project still has modules it answers `400`, unless you add `?force=true`; then all its modules are deleted as well.

## Parts list, SBOM, AIBOM and CBOM

- `partsList` returns `_id`, `name`, `description` and `components`: every component of the project's modules once, with its name, `status` (`os`, `commercial` or `unknown`), versions and licenses.
- `sbom` returns the project's bill of materials in the app's JSON format: `stats`, `tree`, `list` and `modules`. For a CycloneDX or SPDX file use **Outbound → SBOM + CBOM** in the app. See [SBOM + CBOM](../../04-outbound/01-sbom-cbom.md).
- `aibom` and `cbom` return CycloneDX 1.7 documents with the `machine-learning-model` or `cryptographic-asset` components of all modules.

## Environmental (iCVSS) context

`GET /core/projects/{project_id}/environmental-context` returns one entry per module of the project, in windows of 100 modules ordered by name (`?page=`, starting at 1). Each entry has the shape described under [Modules](modules.md#environmental-icvss-context).

## Application goals

`POST /core/projects/{project_id}/architecture` takes `{"content": "<markdown>"}` and stores it as the project description, shown as Application goals. The content must be a string of at most 100 KB; otherwise the call answers `400`. The response is `{"projectId": "...", "content": "..."}`. `GET` returns `{"content": "..."}`, an empty string if nothing was set.

## Addressing a project by name

Where a project is addressed by name instead of by id (the `project` field of `POST /core/scans`, `project` on the imports, `projectName` on SARIF uploads and checks), the name is trimmed and the oldest project with that exact name wins. An explicit id always takes precedence over a name. If your company has several projects with the same name, send the id.

## Related

- [Modules](modules.md) - the children of a project
- [Scans](scans.md) and [Imports](imports.md) - inputs that populate project data
- [Compliance releases](compliance-releases.md) - documents of approved releases
- [Projects](../../03-internal/01-projects/01-create-and-list.md) and [Project settings](../../03-internal/01-projects/settings/index.md) - the same data in the app
- [Endpoint groups](index.md)
