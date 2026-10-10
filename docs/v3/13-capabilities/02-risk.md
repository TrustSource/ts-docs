# Risk

> [!NOTE]
> **Required license feature:** `risks`

The **Risk** capability turns ***TrustSource*** from a compliance system into a risk-management system. It adds a risk register on top of the components, modules and findings the core already manages, with documented decisions, deadlines and a full audit trail.

## What this capability adds

- **Risk register** — document, assess and track risks per module, project or company-wide. Financial figures (SLE, ALE) are calculated from business value, exposure factor and rate of occurrence.
- **Treatment model** — the *strategy* (Avoid, Mitigate, Transfer, Accept) is recorded apart from the *state* (progress), and every risk falls into one of three groups: Untreated, In treatment or Done. All views use the same rules. See [Treatment and State](../03-internal/05-risks/05-treatment-and-state.md).
- **Decisions** — a documented decision with a mandatory rationale, who decided and when, including temporary exceptions that expire on their own and return the risk for a new decision. See [Decisions](../03-internal/05-risks/06-decisions.md).
- **Assessment schemes** — your own impact classes, scales and decision limits, set per company and overridable per project and module. See [Risk Assessment Scheme](../03-internal/05-risks/07-risk-assessment-scheme.md).
- **Automatic risks** — one risk per SARIF weakness (CWE), per vulnerability (CVE) or per OBOM finding, kept up to date by imports and checks, with a proposed impact class. See [Automatic Risks](../03-internal/05-risks/08-automatic-risks.md).
- **Overview and portfolio** — a development chart, an inventory by state, impact class and origin, and a project and module treemap. See [Risk Overview](../03-internal/05-risks/01-overview.md).
- **Countermeasures and tasks** — turn a risk into concrete work with owners, due dates and overdue reminders. See [Risk Tasks](../03-internal/05-risks/03-risks-tasks.md).
- **History** — every change with who, when, from where and old and new values, also in Company Logs. See [Risk History](../03-internal/05-risks/09-risk-history.md).
- **Integration with the Threat Modeling Agent** — risks raised by the [TMA](07-threat-model-agent.md) land in the same register with `origin: TMA Assessment` so they are distinguishable from risks entered manually. The agent never overwrites a state a person has set; see the [TMA capability page](07-threat-model-agent.md#key-guarantees) for the full guarantees.

📸 *Screenshot: the Risk Overview with the development chart and inventory cards.*

## Works together with

| Feature | What it adds to risks |
|---|---|
| `sarif` | Risks from SARIF weaknesses. Needs `risks` as well. |
| `obom` | Risks from OBOM findings. Needs `risks` as well. |
| `csaf` | A published VEX advisory moves the matching CVE risk to assessed. |
| `threat` | Threat-model risks and the project's threat model list on its Risks page. |

## Roles

Everybody who can open the Risks menu (`developer`, `compliance_manager`, `manager`, `account_admin`) can view and edit risks. Adding a risk by hand and creating risks from findings needs `compliance_manager` or `manager`. The company scheme can be changed by `account_admin`, `compliance_manager` and `company_security_manager`.

## Editions

- **SaaS:** available with the `risks` feature flag enabled.
- **Community Edition:** not included in the initial release; status to be announced.

## Related

- [Internal → Risks](../03-internal/05-risks/index.md) — risk register, list and tasks
- [Risks API](../09-rest-api/endpoints/risks.md) — read and write risks and reports
- [Internal → Threat Models](../03-internal/08-threat-models/index.md) — the threat-model workflow that feeds risks with `origin: TMA Assessment`
- [Threat Modeling Agent](07-threat-model-agent.md) — the automated engine behind those threat-model risks
