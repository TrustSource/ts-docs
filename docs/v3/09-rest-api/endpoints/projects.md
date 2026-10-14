# Projects

> Create, list, inspect, and delete projects - fetch project-level artefacts such as the parts list and the SBOM, and import a project's Application goals from an architecture.md file.

## Use cases

- Automate project creation during onboarding of a new team or repository.
- Drive dashboards that need a list of every project in the company.
- Pull a project-wide parts list or SBOM into external compliance tools.
- Populate a project's Application goals from an `architecture.md` file already maintained in the team's repository, instead of retyping it.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/projects` | List projects | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/projects` | Create project (or return the existing one) | `developer`, `manager`, `portfolio_manager` |
| GET | `/core/projects/{project_id}` | Get project details | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/projects/{project_id}` | Update project | `developer`, `manager`, `portfolio_manager` |
| DELETE | `/core/projects/{project_id}` | Delete project | `manager`, `account_admin`, `enterprise_admin`, `portfolio_manager` |
| GET | `/core/projects/{project_id}/partsList` | Get project parts list | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/projects/{project_id}/sbom` | Get project SBOM | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/projects/{project_id}/aibom` | Get project AIBOM | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/projects/{project_id}/cbom` | Get project CBOM | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/projects/{project_id}/environmental-context` | Get project environmental (iCVSS) context | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/projects/{project_id}/architecture` | Get project Application goals | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/projects/{project_id}/architecture` | Set project Application goals from markdown content | `developer`, `manager`, `portfolio_manager` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Creating a project

`POST /core/projects` is idempotent on the project name inside the company, so a pipeline can call it on every run without accumulating duplicates:

| Case | Status | Body |
|------|--------|------|
| The name is not in use in this company | `201` | `{"projectId": "<new id>"}` |
| The name is already in use | `200` | `{"projectId": "<existing id>", "existing": true}` |

A repeat is **not** an update. Every other field you send - `description`, legal settings, integration settings - is silently dropped: the call succeeds with `200`, nothing is written to the existing project, and no error or warning says the values were ignored. The `existing: true` flag is the machine-readable signal that nothing was created and nothing was changed; a client that also needs to apply settings must follow up with `POST /core/projects/{project_id}`.

Project names are stored trimmed, on every path that writes one - this endpoint, the update endpoint, and the create and rename actions in the web UI - so a name never reaches the database with leading or trailing whitespace. Names are compared on that trimmed value, exactly and case-sensitively, so `"  Storefront  "` and `"Storefront"` are the same project, while `"storefront"` is a different one. Names are scoped to the company - two companies may each have a project called `Storefront`. The check is not atomic, so two callers creating the same new name at the same instant can still both succeed; a pipeline that starts several jobs in parallel should create the project once, or address it by id.

## Automatic risks

`autoCreateCweRisks` and `autoCreateCveRisks` (booleans, absent means off) switch on the automatic risk register for SARIF weaknesses and for vulnerabilities. Both are returned by `GET /core/projects/{project_id}` and can be set with `POST /core/projects/{project_id}` by keys with the `account_admin`, `manager` or `compliance_manager` role; the company needs the `risks` licence. Setting `autoCreateCveRisks` to `true` over the API does not start a check at once: the project is picked up by the next regular vulnerability check. See [Risks from vulnerabilities (CVE)](../../03-internal/05-risks/01-overview.md).

## Addressing a project by name

Where a project is addressed by name instead of by id, for example the `project` field of `POST /core/scans`, or `projectName` on the imports, SARIF and OBOM uploads, the oldest project with that exact name wins. The name is trimmed first. An explicit `projectId` always takes precedence over a name.

If your company has several projects with the same name, send `projectId` to remove the ambiguity.

## Application goals content check

Send the markdown as `{"content": "..."}`. The limit is 102,400 characters (100 KB); a larger text is rejected with `400` and an `error` that names its size and the limit.

Before it is stored, the content is screened for instructions aimed at AI tools (prompt injection): first against a set of content rules, then, where the AI content check is configured, by that check. Rejected content answers `400` with `{"error": ..., "details": ...}`:

- `error` explains why: each matched rule with its line and the matched text, or the verdict or failure code of the AI content check.
- `details.check` is `pattern` (with the `findings`: rule, description, line, excerpt) or `ai` (with a `code`).

If the AI content check is configured but does not answer, the upload is refused as well; the message says the content could not be screened. Try again later.

On success the call returns `{"projectId": ..., "content": ...}`.

## Environmental (iCVSS) context

`GET /core/projects/{project_id}/environmental-context` returns one entry per module of the project. Each entry has the shape described under [Modules](modules.md#environmental-icvss-context). Use `?page=` (starting at 1) to page through windows of 100 modules ordered by name.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Modules](modules.md) - the children of a project
- [Scans](scans.md) - inputs that populate project data
- [Compliance Releases](compliance-releases.md) - per-release artefacts that roll up project data
- [Threat Models](../../03-internal/08-threat-models/01-create-threat-model.md) - consumes a project's Application goals when generating a model
- [Projects](../../03-internal/01-projects/01-create-and-list.md) - product-side documentation
- [Endpoint groups](index.md)
