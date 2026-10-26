# Risks

> Create, read, update and delete risks of projects and modules, together with their tasks and countermeasures.

## Use cases

- Push risks found by threat-modelling or review tools into the risk register.
- Track countermeasures and tasks from your ticketing system.
- Export the risks of a project for a CRA or ISO 27001 audit.

## Operations

Read scopes: `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`.
Write scopes: `developer`, `manager`, `portfolio_manager`, `compliance_manager`, `company_security_manager`.
Delete scopes: `manager`, `account_admin`, `portfolio_manager`, `company_security_manager`.

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/risks` | List risks of a project or module | Read |
| POST | `/core/risks` | Create risk | Write |
| POST | `/core/risks/batch` | Create, update or upsert up to 100 risks | Write |
| GET | `/core/risks/{risk_id}` | Get risk details | Read |
| POST | `/core/risks/{risk_id}` | Update risk | Write |
| DELETE | `/core/risks/{risk_id}` | Delete risk | Delete |
| GET | `/core/risks/{risk_id}/tasks` | List tasks of a risk | Read |
| POST | `/core/risks/{risk_id}/tasks` | Create task | Write |
| GET | `/core/risks/{risk_id}/tasks/{task_id}` | Get task | Read |
| POST | `/core/risks/{risk_id}/tasks/{task_id}` | Update task | Write |
| DELETE | `/core/risks/{risk_id}/tasks/{task_id}` | Delete task | Delete |
| GET | `/core/risks/{risk_id}/countermeasures` | List countermeasures | Read |
| POST | `/core/risks/{risk_id}/countermeasures` | Create countermeasure | Write |
| GET | `/core/risks/{risk_id}/countermeasures/{cm_id}` | Get countermeasure | Read |
| POST | `/core/risks/{risk_id}/countermeasures/{cm_id}` | Update countermeasure | Write |
| DELETE | `/core/risks/{risk_id}/countermeasures/{cm_id}` | Delete countermeasure | Delete |

## Listing risks

`GET /core/risks` needs `projectId` or `moduleId`; without both it answers `400`. With `projectId` you get the project's own risks and the risks of its modules; with `moduleId` the risks of that module. Up to 100 per page (`page`), newest first.

## Creating and updating a risk

`POST /core/risks` takes `name` (required), `projectId` or `moduleId`, and `riskProperties`:

| Field | Content |
|---|---|
| `origin` | List of origin tags: `SDLC`, `SQ`, `SSC`, `CVE`, `YARA`, `CWE`, `TD`, `TMA Assessment`, `LIC`, `threat-model` |
| `state` | `identified`, `assessed`, `approved`, `planned`, `implementing`, `monitored`, `accepted`, `closed`, `deferred`, `escalated`, `expired`, `transferred`, `eliminated`, `out-of-scope` |
| `impactClass`, `impact`, `impactDescription` | Impact assessment |
| `confidentiality`, `integrity`, `availability` | CIA impact |
| `BV`, `EF`, `ARO` (and `*_enum`) | Business value, exposure factor, annual rate of occurrence for the quantitative assessment |
| `generalApproach` | Treatment approach (update only) |
| `countermeasures` | List of countermeasures, see below |
| `threatModelContext` | `strideCategories`, `enisaCategory`, `enisaThreat`, `cwes`, `affectedElementType`, `trustBoundaryCrossing`, `tmRunId`, `tmMethod`, `otmThreatId` |

Create answers `201` with `{"riskId": "..."}`. `POST /core/risks/{risk_id}` merges `riskProperties` one level deep, so fields you leave out (for example `countermeasures`) are kept. It answers `200` with the updated risk.

Risks that the SARIF import maintains carry `sourceRefs`, `autoKey`, `autoTool` and `autoCwe`. These fields are read-only.

`DELETE /core/risks/{risk_id}` answers `400` while the risk has tasks, unless you add `?force=true`; then the tasks are deleted too.

## Writing many risks at once

`POST /core/risks/batch` creates, updates or upserts up to 100 risks of one project in one request, together with their countermeasures. It is meant for tools that write many risks per run, e.g. the threat-model agent. Same scopes as `POST /core/risks`.

```json
{
  "projectId": "<project id>",
  "source": "tma",
  "runId": "<optional, stored in the risk history>",
  "items": [
    {"ref": "t-1", "op": "upsert", "externalKey": "t-1", "moduleId": "<module id>",
     "risk": {"name": "...", "riskProperties": {"...": "...", "countermeasures": [{"countermeasure": "...", "otmMitigationId": "m-1"}]}},
     "countermeasureMode": "merge"},
    {"ref": "t-2", "op": "update", "riskId": "<risk id>", "patch": {"riskProperties": {"state": "out-of-scope"}}}
  ]
}
```

| Field | Meaning |
|---|---|
| `source` | Namespace of `externalKey`: `tma` or `import`. |
| `op` | `create`, `update` or `upsert`. |
| `externalKey` | Your stable key for the risk. Required for `upsert`; an `upsert` with a key that already exists updates that risk, so repeating a request never creates a duplicate. |
| `riskId` | Identifies the risk for `update`; `externalKey` is the fallback. |
| `risk` / `patch` | The full risk for `create` and `upsert`; for `update` only the fields to change, merged one level deep into `riskProperties`. |
| `countermeasureMode` | `replace` sets the list as sent; `merge` matches by `otmMitigationId` (or the name), adds new measures and never changes measures that are `completed`, `verified` or `ok`. `merge` with an empty list keeps everything. |
| `moduleId` | Must be a module of the project. |

Each item is validated like a single write (schema, decision, risk assessment scheme) and is recorded in the risk's history. A risk in a state a person decided keeps its fields: only a countermeasure `merge` is applied (`protectedState: true`), otherwise the item fails with `protected_state`.

The answer is `200` with one result per item, in request order, whatever the outcome of the single items:

```json
{"summary": {"created": 1, "updated": 0, "unchanged": 0, "failed": 1},
 "results": [{"ref": "t-1", "index": 0, "status": "created", "riskId": "..."},
             {"ref": "t-2", "index": 1, "status": "failed", "error": {"code": "protected_state", "message": "..."}}]}
```

`status` is `created`, `updated`, `unchanged` or `failed`. Error codes: `validation_failed`, `scheme_violation`, `decision_rejected`, `not_found`, `protected_state`, `duplicate`, `write_failed`. The request as a whole answers `400` (malformed, unknown `source`, project not in your company), `403` (scope) or `413` (more than 100 items). Send larger sets in several requests.

## Tasks

`POST /core/risks/{risk_id}/tasks` takes `task` and `countermeasure` (both required), and `responsible` (user ids), `frequency`, `status`, `comment`, `due`. Send `riskId` in the body as well: the task is linked to the risk id in the body, not the one in the path.

Create answers `201` with the new task's id in a field named `riskId`. Update answers `200` with the task. Tasks are listed 100 per page, newest first.

## Countermeasures

A countermeasure has `countermeasure` (name, 3 to 200 characters, required), `status` (`identified`, `planned`, `completed`, `ok`, `required`, `not-required`, `verified`), `comment`, `responsible` (user ids), `riskReduction` (0 to 100 percent), `standardRef`, `validationMethod` and `otmMitigationId`.

- Create answers `201` with `{"countermeasureId": "..."}`. The id is generated by the server; an `_id` in the body is ignored.
- Update merges the fields you send into the stored countermeasure and answers `200` with it.
- Delete removes the countermeasure; tasks that name it are not changed.

## Related

- [Risks](../../03-internal/05-risks/index.md) - the risk register in the app
- [Tests (SARIF)](tests.md) - weaknesses that become risks
- [Endpoint groups](index.md)
