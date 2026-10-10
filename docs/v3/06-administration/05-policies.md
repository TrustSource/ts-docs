# Company Policies

> [!NOTE]
> **Required role:** `account_admin, compliance_manager, company_security_manager`

Manage company-wide policies. Policies define the rules that projects and modules are evaluated against. Open **Settings → Company → Policies** to see one card per policy.

| Card | What it defines |
|---|---|
| **Opensource policy** | The FOSS license policy that scans are evaluated against. |
| **Crypto algorithms** | The cryptographic algorithm policy. |
| **Component end-of-life** | The End-of-Life thresholds for components. |
| **Risk assessment** | The scales and decision limits your risks are assessed on. Shown with the `risks` feature. |

📸 *Screenshot: the Company Policies page with its four cards.*

## Risk assessment

The **Risk assessment** card opens the company's **risk assessment scheme**: your own impact classes, value scale (business value and exposure factor), annual-rate-of-occurrence scale and three decision thresholds (*Decision required from*, *Acceptance not permitted from*, *Maximum temporary exception*).

- Without a scheme of your own, the built-in default applies and nothing changes.
- Only `account_admin`, `compliance_manager` and `company_security_manager` can change it; other roles see it read-only.
- Without the `risks` feature the page only says that risk management is not part of the plan.
- Projects and modules can override parts of the scheme on their **CIA** tab.

Step by step instructions, the entry rules and the effect of each threshold are in [Risk Assessment Scheme](../03-internal/05-risks/07-risk-assessment-scheme.md).

## Related

- [Settings](02-settings.md) — the other company settings cards
- [Risks](../03-internal/05-risks/index.md) — where the scheme is applied
