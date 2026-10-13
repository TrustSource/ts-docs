# Risk Assessment Scheme

> [!NOTE]
> **Menu:** **Internal → Risks** is shown to Developer, Compliance manager and Manager. The company currency is set by the Account admin.

***TrustSource CE*** assesses all risks on one fixed scheme. The scales below are built in and the same for every company, project and module; they cannot be customised, and there are no thresholds that restrict how a risk may be decided.

## Impact classes

The **Impact class** of a risk, from lowest to highest:

`low`, `moderate`, `high`, `critical`, `existential`

The list sorts impact classes in this order. The [portfolio treemap](04-portfolio-views.md) shows `critical` and `existential` in red and `high` and `moderate` in amber.

## Simple impact view

| Field | Values |
|---|---|
| **Business value (BV)** | low, moderate, high |
| **Exposure factor (EF)** | low, moderate, high |
| **Annual rate of occurrence (ARO)** | likely (once a year), unlikely (< once a year), rare (every 2 years or less) |

## Detailed impact view

| Field | Unit |
|---|---|
| **Business value (BV)** | Amount in the company currency |
| **Exposure factor (EF)** | Percent |
| **Annual rate of occurrence (ARO)** | Occurrences per year, for example `2` |

TrustSource CE calculates:

- **Single loss expectancy (SLE = EF * BV)**
- **Annual loss expectancy (ALE = SLE * ARO)**

The ALE appears as *Value* in the [Risks List](02-risks-list.md).

## Currency

The currency of BV, SLE and ALE is the **Currency code** set in **Administration → Settings → General info** (General settings). Without a setting, EUR is used. See [Company Details](../../06-administration/02a-company-details.md).

> [!NOTE]
> Company, project and module specific risk assessment schemes with own scales and decision thresholds are a SaaS feature and not part of TrustSource CE. See [CE and SaaS compared](../../13-ce-vs-saas.md).

## Related

- [Risks List](02-risks-list.md) - where the scales are used
- [Treatment and State](05-treatment-and-state.md) - strategies and states
