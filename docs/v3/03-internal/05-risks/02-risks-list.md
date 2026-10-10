# Risks List

> [!NOTE]
> **Required license feature:** `risks`

The risk list shows all risks in your company, filterable by project, module and status.

## Creating a risk

Risks can be created in two ways:

1. **Manually** — click **Create Risk** and fill in the risk form.
2. **From findings** — create a risk directly from a CSAF advisory, vulnerability finding or SARIF test result.

## Risk fields

Risks are structured in three tabs:

### Impact tab

| Field | Description |
|---|---|
| **Name** | Short risk title. |
| **Origin** | Where the risk came from (manual, CSAF, CVE, SARIF). |
| **CIA impact** | Confidentiality, Integrity, Availability impact ratings. |
| **Impact class** | Overall impact severity. |
| **State** | Progress of the risk: identified, assessed, approved, planned, implementing, deferred, escalated, monitored, closed. |
| **Treatment strategy** | The decision on how to treat the risk: Avoid, Mitigate, Transfer or Accept. Set apart from the state. |
| **Business Value (BV)** | Estimated business value at risk. |
| **Exposure Factor (EF)** | Percentage of value lost if risk materializes. |
| **Annual Rate of Occurrence (ARO)** | Expected frequency per year. |

From these, ***TrustSource*** calculates **Single Loss Expectancy (SLE)** and **Annual Loss Expectancy (ALE)**.

### Management tab

- Treatment strategy (Avoid, Mitigate, Transfer, Accept)
- Countermeasures with status, comments and responsible parties

### Review tab

- Task assignments for countermeasures

> [!NOTE]
> Since 3.3.28 the state only tracks progress. The older states `accepted`, `transferred`, `eliminated`, `out-of-scope` and `expired` no longer exist; existing risks were migrated. The list, Overview and widgets group risks as **Untreated**, **In treatment** or **Done**. A fuller description of the treatment model follows in a later update.

📸 *Screenshot: the risk edit form showing the Impact tab with financial metrics.*

## Related

- [Risk Tasks](03-risks-tasks.md) — managing countermeasure tasks
- [Portfolio Views](04-portfolio-views.md) — cross-project visualization
