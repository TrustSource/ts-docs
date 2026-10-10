# Risk Overview

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`
> **Required license feature:** `risks`

The **Overview** tab answers three questions for the whole company: how many risks are open, how that number develops, and which projects need attention. It opens when you choose **Risks** in the menu.

If the register is still empty, the page lists what it will show once you add the first risk.

## Risk development

A chart of the risk stock over time:

- **Opened** — risks created in the period.
- **Done** — risks that reached the Done group in the period.
- **Open at end** — the open stock at the end of each period.

Choose **Last 3 months**, **Last 6 months** or **Last 12 months**, and **By month** or **By week**.

> [!NOTE]
> Risks that were finished before version 3.3.23, or marked done by the upgrade to 3.3.28, have no recorded resolution date. They are not drawn in the chart; a note under the chart gives their number.

📸 *Screenshot: the Risk development chart with the period and granularity buttons.*

## Risk inventory

Four cards show what the register holds. Each row is a link: click it to open the [Risks List](02-risks-list.md) filtered to that value.

| Card | Rows |
|---|---|
| **Risks** | The total, split into **Untreated**, **In treatment** and **Done**. |
| **By state** | One row per [state](05-treatment-and-state.md#states) in use. |
| **By impact class** | One row per impact class in use. |
| **By origin** | One row per origin (SDLC, CVE, CWE, OBOM and so on). |

Risks without a state, impact class or origin appear in a row of their own so that the numbers add up.

## Portfolio overview

A treemap of projects and modules. See [Portfolio Views](04-portfolio-views.md).

## New risks and untreated risks

Two lists close the page:

- **New risks (added in last 14 days)** — with the tiles *total*, *added last 7 days*, *Untreated*, *In treatment* and *Done*.
- **Untreated risks** — risks nobody has decided on yet: no treatment strategy, or still identified or assessed.

Click a row in either list to open that risk in the editor.

## Charts in dark mode

All charts follow the theme you chose in your profile and redraw immediately when you switch it.

## Related

- [Risks List](02-risks-list.md) — the register behind these numbers
- [Treatment and State](05-treatment-and-state.md) — what Untreated, In treatment and Done mean
- [Risks API](../../09-rest-api/endpoints/risks.md) — the inventory and trend reports are also available over the API
