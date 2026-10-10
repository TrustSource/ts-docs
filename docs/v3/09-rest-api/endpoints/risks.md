# Risks

> Create, list, inspect, and delete risk records — the work-tracking layer for compliance and security findings — together with the tasks attached to them.

## Use cases

- Raise a risk programmatically from an external scanner or rule engine.
- Mirror the risk queue into an external work-tracking system, fetching only what changed since the last run (`editedSince`).
- Pull every risk from one source, e.g. all threat-model or all SARIF risks (`origin`).
- Show an auditor who changed a risk, when and how (`/history`).
- Record a documented decision - accept, transfer, a temporary exception until a date - with its rationale.
- Report the risk stock and how it develops, or export the register to a spreadsheet (`/reports/*`, `format=csv`).
- Progress tasks on a risk as engineering work lands.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/risks` | List risks | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/risks` | Create risk | `developer`, `manager`, `portfolio_manager`, `compliance_manager`, `company_security_manager` |
| GET | `/core/risks/{risk_id}` | Get risk details | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/risks/{risk_id}` | Update risk | `developer`, `manager`, `portfolio_manager`, `compliance_manager`, `company_security_manager` |
| PATCH | `/core/risks/{risk_id}` | Update risk (PATCH) | `developer`, `manager`, `portfolio_manager`, `compliance_manager`, `company_security_manager` |
| DELETE | `/core/risks/{risk_id}` | Delete risk | `manager`, `account_admin`, `enterprise_admin`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/risks/reports/inventory` | Risk inventory report | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/risks/scheme` | Resolved risk assessment scheme | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `developer` |
| GET | `/core/risks/reports/trend` | Risk development report | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/risks/{risk_id}/history` | Get risk history | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/risks/{risk_id}/tasks` | List tasks by risk | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/risks/{risk_id}/tasks` | Create task | `developer`, `manager`, `portfolio_manager`, `compliance_manager`, `company_security_manager` |
| GET | `/core/risks/{risk_id}/tasks/{task_id}` | Get task details | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/risks/{risk_id}/tasks/{task_id}` | Update task | `developer`, `manager`, `portfolio_manager`, `compliance_manager`, `company_security_manager` |
| DELETE | `/core/risks/{risk_id}/tasks/{task_id}` | Delete task | `manager`, `account_admin`, `enterprise_admin`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/risks/{risk_id}/countermeasures` | List countermeasures by risk | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/risks/{risk_id}/countermeasures` | Create countermeasure | `developer`, `manager`, `portfolio_manager`, `compliance_manager`, `company_security_manager` |
| GET | `/core/risks/{risk_id}/countermeasures/{cm_id}` | Get countermeasure details | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/risks/{risk_id}/countermeasures/{cm_id}` | Update countermeasure | `developer`, `manager`, `portfolio_manager`, `compliance_manager`, `company_security_manager` |
| DELETE | `/core/risks/{risk_id}/countermeasures/{cm_id}` | Delete countermeasure | `manager`, `account_admin`, `enterprise_admin`, `portfolio_manager`, `company_security_manager` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Listing and paging

`GET /core/risks` returns the whole company's risks unless `projectId` or `moduleId` narrows it. Filters combine:

| Parameter | Values |
|-----------|--------|
| `state` | One state or a comma-separated list, e.g. `identified,assessed`. The nine states: `identified`, `assessed`, `approved`, `planned`, `implementing`, `deferred`, `escalated`, `monitored`, `closed`. |
| `treatment` | `untreated`, `in-treatment`, `done`, or a comma-separated list, e.g. `untreated,in-treatment` for every open risk. See [Treatment strategy and state](#treatment-strategy-and-state). |
| `impactClass` | An impact class of the company's risk assessment scheme (by default `low`, `moderate`, `high`, `critical`, `existential`), or a list. |
| `origin` | `SDLC`, `SQ`, `SSC`, `CVE`, `YARA`, `CWE`, `TD`, `TMA Assessment`, `LIC`, `threat-model`, or a list. |
| `createdSince`, `editedSince` | ISO 8601 date or date-time, inclusive. |
| `projectId`, `moduleId` | Scope to a project (with its modules) or a module. |
| `page` | Page number from 1; 100 risks per page. |

`state`, `impactClass` and `origin` also accept `none`, which selects risks without that value - the "unset" bucket of the inventory report. `treatment` does not. An unknown value or a malformed date answers `400` with `{"error": ..., "parameter": ...}`, never an empty list; so does a deprecated state (`?state=accepted`), with the error listing the nine states plus `none`.

The body stays an array. Paging metadata is in headers: `X-Total-Count` (matches across all pages) and `X-Has-More` (`true` while another page exists). `GET /core/risks/{risk_id}/history` pages the same way.

## Treatment strategy and state

A risk answers two questions in two fields (since 3.3.28):

- `riskProperties.generalApproach` is the **treatment strategy** - what was decided: `avoid`, `mitigate`, `transfer` or `accept`, or empty while nobody has decided.
- `riskProperties.state` is the **progress**: `identified`, `assessed`, `approved`, `planned`, `implementing`, `deferred`, `escalated`, `monitored` or `closed`.

Every risk has one **treatment class**, derived from both and never stored:

| Class | When |
|-------|------|
| `untreated` | No strategy, or the state is empty, `identified`, `assessed` or not one of the nine. |
| `in-treatment` | `avoid` or `mitigate` with a state from `approved` to `monitored` (including `deferred` and `escalated`), or `accept` / `transfer` with `deferred` or `escalated`. |
| `done` | The state is `closed`, or `accept` / `transfer` with `approved`, `planned`, `implementing` or `monitored`. |

The API does not refuse a contradictory pair such as `accept` + `implementing`; it classifies by the rules above (done). The UI only offers `approved` and `closed` with `accept` and `transfer`. `riskProperties.resolvedAt` is set when a risk becomes done and cleared when it stops being done, a strategy-only change included; `stateChangedAt` moves only when the state changes.

**Deprecated values.** Writes (`POST` / `PATCH /core/risks`) still accept the pre-3.3.28 values and translate them: state `accepted` becomes `accept` + `approved`, `transferred` becomes `transfer` + `approved`, `eliminated` becomes `avoid` + `closed`, `out-of-scope` becomes `accept` + `closed`, `expired` becomes `closed`; strategy `resolve` becomes `avoid`, `ignore` becomes `accept` (and an undecided state becomes `approved`). A state value only fills the strategy when the request and the stored risk have none, so `{"state": "accepted", "generalApproach": "mitigate"}` stores `mitigate` + `approved`. These values will be removed in a future release. A value that is neither current nor deprecated answers `400` naming the field. List filters do not accept deprecated values.

A temporary exception whose `validUntil` has passed moves its risk back to `assessed` for a new decision; strategy and decision are kept.

## Decisions

`riskProperties.decision` records what was decided about a risk: `type` (`mitigate`, `transfer`, `accept`, `temporary-exception`, `out-of-scope`), a `rationale` of 10-2000 characters, and optional `validFrom` / `validUntil`. A new decision on a risk without a strategy sets it: `mitigate` to `mitigate`, `transfer` to `transfer`, and `accept`, `temporary-exception` and `out-of-scope` to `accept`. A temporary exception needs `validUntil`, which may not lie in the past when written. The server sets `decidedBy`, `decidedByName` and `decidedAt` whenever the decision's content changes; values sent for them are ignored. Send the stored decision back unchanged and it keeps its attribution; send `null` to remove it. An invalid decision answers `400` with `{"error": ..., "parameter": "riskProperties.decision.<field>"}`.

## Risk assessment scheme

Impact class, `BV_enum`, `EF_enum` and `ARO_enum` must be values of the risk assessment scheme that applies to the risk's module or project (configured under Settings - Policies - Risk assessment, and on a project's or module's CIA tab). Without a configured scheme the built-in values apply. A value that is written or changed and is not in the scheme answers `400` with `{"error": ..., "parameter": "riskProperties.<field>"}`; a stored value the request leaves unchanged is accepted even if the scheme no longer contains it.

The treatment strategy is not part of the scheme: it is always one of the four values above.

The scheme's thresholds are enforced on the same write: a risk at or above the "decision required" class cannot become done without a decision (`riskProperties.decision`); a risk at or above the "acceptance not permitted" class cannot get an `accept` or `temporary-exception` decision (`riskProperties.decision.type`) or the strategy `accept` (`riskProperties.generalApproach`); and a temporary exception cannot run past the maximum number of days. Each answers `400` naming the field. A change of the strategy alone is checked too.

### Reading the scheme

`GET /core/risks/scheme?projectId=...` or `?moduleId=...` returns the scheme that write enforcement applies to that project or module, so a client can check its values before it writes. Keys with `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` or `developer` may read it.

- **Precedence.** `moduleId` wins: the module's own project decides the project level, and a `projectId` sent with it is ignored. An empty parameter counts as absent.
- **`400`** with `{"error": ..., "parameter": ...}`: neither parameter given (`parameter: "projectId"`); a value that is not one id (a repeated parameter, bracket syntax, more than 64 characters); `format=csv`, since the scheme is JSON only.
- **`404`** `"Resource not found: <id>"`: a `moduleId` that is not a module of the company, even with a valid `projectId`, or a `projectId` alone that is not a project of the company. There is no fallback to the company scheme.

These rules are deliberately stricter than the list, which is company-wide without a scope: a client must not check its values against rules that are not the ones enforced.

The response:

| Field | Content |
|-------|---------|
| `scope` | `{projectId, moduleId}` the scheme was resolved for; with a module, `projectId` is the module's project, or `null` when that project is not in the company. |
| `scheme` | `impactClasses` (`value`, `label`, `rank`, ordered by rank), `valueScale` (for `BV_enum` and `EF_enum`), `aroScale`, `thresholds` (`decisionRequiredFrom`, `acceptanceForbiddenFrom`, `maxExceptionDays`, each `null` when switched off), and the fixed `treatmentStrategies` and `states` (`value`, `label`). |
| `sources` | Where each list and each threshold comes from: `module`, `project`, `company`, `default` (built in), or `fixed` for `treatmentStrategies` and `states`. |
| `fields` | Which list each risk field is checked against, e.g. `"ARO_enum": "aroScale"`, `"generalApproach": "treatmentStrategies"`. |

A threshold that names an impact class the scale no longer has does nothing: no risk is at or above it.

## Proposed assessment

Risks created by a SARIF import, the vulnerability check or a manual license resolution carry `riskProperties.assessmentInputs` (`source`, `findingId`, `severity: {value, rank}`, `exploitability: {epss}` when known, `context: {CR, IR, AR}`), `proposedImpactClass` and `assessmentOrigin` (`proposed` while the impact class is the machine's proposal, `human` once somebody changed it). All three are read-only: values sent in a request body are ignored. Changing `impactClass` sets `assessmentOrigin` to `human`, and later imports then leave the impact class alone.

## Risks from vulnerabilities

A project with `autoCreateCveRisks` (see [Projects](projects.md#automatic-risks)) keeps one risk per vulnerability and module. Such a risk has origin `CVE`, `riskProperties.autoKey` `cve|<moduleId>|<vulnerability id>` and `riskProperties.autoCve` (the vulnerability id: CVE, GHSA, OSV, ...). `riskProperties.sourceRefs` lists the affected components (`componentKey`, `versions`); when none reports the vulnerability any more it is empty and `sourceRefsPrevCount` holds the previous count. `riskProperties.vexEvidence` holds what the last published VEX advisory stated for the vulnerability and module: `csafId`, `trackingId`, `version`, `publishedAt`, `status` (`known_not_affected`, `known_affected`, `fixed`, `under_investigation`), `justification`, `remediationCategory`. All of these are server-owned: values sent in a request body are ignored. How and when the state moves is described in [Risks from vulnerabilities (CVE)](../../03-internal/05-risks/01-overview.md).

## Reports and CSV

Both reports take the same `projectId`, `moduleId`, `state`, `origin` and `treatment` filters as the list and are company-wide without them. The inventory counts `total`, `untreated`, `inTreatment`, `open` (`untreated + inTreatment`) and `resolved` (the `done` class), so `open + resolved = total`; each class count equals the length of `GET /core/risks?treatment=<class>` with the same filters. In the trend, `resolved` counts risks that became done. The trend needs `from`; `to` defaults to now, `granularity` to `month` (or `week`), and a range may span at most 60 months or 261 weeks. Buckets are UTC calendar months or ISO weeks, `[start, end)`. Risks resolved before 3.3.23, and risks that became done through the 3.3.28 migration without a recorded state change, have no resolution date; the trend counts them in `unknownResolutionDate` instead of guessing a bucket.

`format=csv` on either report, and on `GET /core/risks`, returns `text/csv` (RFC 4180, header row). On the list it exports the whole register - every matching risk, up to 50,000 - rather than one page; its `generalApproach` and `treatment` columns follow `state`. Cells that a spreadsheet would run as a formula are prefixed with `'`.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Risks](../../03-internal/05-risks/01-overview.md) — UI-side documentation
- [Compliance Approvals](compliance-approvals.md) — risks can block approvals
- [Reports](reports.md) — risk reports and dashboards
- [Endpoint groups](index.md)
