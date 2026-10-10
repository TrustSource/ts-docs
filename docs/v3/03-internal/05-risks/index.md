# Risks

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`
> **Required license feature:** `risks`

The Risks module is ***TrustSource***'s **risk register**. It lets you document a risk, assess its impact, decide how to treat it, assign countermeasures and tasks, and see how the whole stock of risks develops over time. Risks can be entered by hand, taken from a finding (a SARIF weakness, a vulnerability, an OBOM finding, a manually set license) or created automatically while you keep working.

Open **Risks** in the menu. The page has three tabs: **Overview**, **Risks** and **Tasks**. Each project also has its own **Risks** page, reachable from the Risks tile on the project page.

## Where to start

| I want to... | Go to |
|---|---|
| See how many risks need attention and how the stock develops | [Overview](01-overview.md) |
| Find, filter, create or edit a risk | [Risks List](02-risks-list.md) |
| Understand Untreated, In treatment and Done | [Treatment and State](05-treatment-and-state.md) |
| Record why a risk is accepted, transferred or excepted | [Decisions](06-decisions.md) |
| Follow up on countermeasures and tasks | [Risk Tasks](03-risks-tasks.md) |
| Compare projects and modules at a glance | [Portfolio Views](04-portfolio-views.md) |
| Set my own impact classes, scales and limits | [Risk Assessment Scheme](07-risk-assessment-scheme.md) |
| Let ***TrustSource*** create risks from SARIF, CVE or OBOM findings | [Automatic Risks](08-automatic-risks.md) |
| See who changed what on a risk | [Risk History](09-risk-history.md) |

## In this section

| Page | What it covers |
|---|---|
| [Overview](01-overview.md) | Development chart, inventory cards, portfolio treemap, new and untreated risks. |
| [Risks List](02-risks-list.md) | The register: tiles, filters, export, the risk editor and its tabs. |
| [Risk Tasks](03-risks-tasks.md) | Countermeasures, tasks, due dates, overdue reminders. |
| [Portfolio Views](04-portfolio-views.md) | The treemap by treatment or impact, drill-down per project. |
| [Treatment and State](05-treatment-and-state.md) | Treatment strategy versus state, and the three treatment groups. |
| [Decisions](06-decisions.md) | The documented decision, temporary exceptions and their expiry. |
| [Risk Assessment Scheme](07-risk-assessment-scheme.md) | Company, project and module scales and thresholds. |
| [Automatic Risks](08-automatic-risks.md) | Risks from SARIF weaknesses, vulnerabilities, OBOM findings and licenses. |
| [Risk History](09-risk-history.md) | The change trail of a risk and the matching Company Logs entries. |

> [!NOTE]
> **Upgrade note, version 3.3.28.** Risks now record the treatment strategy apart from the state. Existing risks were converted once; the numbers of open and done risks changed, and risks that were `deferred` count as open again. Details are in [Treatment and State](05-treatment-and-state.md#older-risks).

📸 *Screenshot: the Risks module with the Overview, Risks and Tasks tabs.*

## Related

- [Risk capability](../../13-capabilities/02-risk.md) — what the license feature adds
- [Risks API](../../09-rest-api/endpoints/risks.md) — read and write risks from your own tools
- [Threat Models](../08-threat-models/index.md) — threat-model risks arrive with the origin `TMA Assessment`
