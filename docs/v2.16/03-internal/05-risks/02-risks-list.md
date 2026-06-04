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
| **State** | Current status: accepted, closed, deferred, expired. |
| **Business Value (BV)** | Estimated business value at risk. |
| **Exposure Factor (EF)** | Percentage of value lost if risk materializes. |
| **Annual Rate of Occurrence (ARO)** | Expected frequency per year. |

From these, ***TrustSource*** calculates **Single Loss Expectancy (SLE)** and **Annual Loss Expectancy (ALE)**.

### Management tab

- Mitigation strategy
- Countermeasures with status, comments and responsible parties

### Review tab

- Task assignments for countermeasures

📸 *Screenshot: the risk edit form showing the Impact tab with financial metrics.*

## Related

- [Risk Tasks](03-risks-tasks.md) — managing countermeasure tasks
- [Portfolio Views](04-portfolio-views.md) — cross-project visualization
