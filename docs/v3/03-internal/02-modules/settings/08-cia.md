# CIA (Module)

> [!NOTE]
> **Required role:** everyone who can open the module settings reads the tab. The requirements can be edited by developers, company security managers, and managers and compliance managers who are the module's default manager (or if none is set). **Import** is for developers, company security managers and default managers. Saving is also checked on the server, which accepts account admins, managers and compliance managers. The risk assessment scheme needs the `risks` license; account admins, managers and compliance managers edit it.

CIA stands for Confidentiality, Integrity and Availability. Here you state how much each of the three matters for this module. ***TrustSource*** uses the answers to put vulnerabilities in the context of your module, and to propose an impact class when you create a risk. The stricter value of module and project counts when it proposes an impact class for an automatically created risk; see [Risks List](../../05-risks/02-risks-list.md#proposed-impact-class).

## Requirements

| Field | Options |
|---|---|
| **Confidentiality requirement (CR)** | `not defined`, `low`, `medium`, `high` |
| **Integrity requirement (IR)** | same |
| **Availability requirement (AR)** | same |

Click **Update** to save. A toast confirms *CIA requirements changed!*. A payment service handling card data would typically get CR `high`, IR `high` and AR `medium`.

Above the form, the panel **Project CIA requirements** shows the values of the project, with a link to its settings. If the project has none, a red note reminds you that the project still has to be completed for a full analysis.

**Import CIA requirements from...** copies the values of another module that has valid CIA settings.

## Risk assessment scheme

With the `risks` license, the tab ends with the panel **Risk assessment scheme**. It lets this module deviate from the [risk assessment scheme](../../05-risks/07-risk-assessment-scheme.md) that risks are assessed on. Anything you do not override is inherited from the project or the company.

1. Switch **Override** on for a list: **Impact classes**, **Value scale (BV / EF)** or **Annual rate of occurrence (ARO)**. Each list takes at most 20 entries with a short value and a label. Impact classes also have a **Rank** that orders them from lowest to highest.
2. Under **Thresholds**, set each of **Decision required from**, **Acceptance not permitted from** and **Maximum temporary exception** to *Inherit*, *Off* or *Set*.
3. Click **Save scheme**. **Remove override** returns the module to the inherited scheme.

Without the right to edit, the panel shows who may change it.

## Related

- [CIA (Project)](../../01-projects/settings/03-cia.md)
- [Risks](../../05-risks/index.md)

📸 *Screenshot: the CIA tab with three requirement fields and the Risk assessment scheme panel.*
