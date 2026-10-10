# Risk Assessment Scheme

> [!NOTE]
> **Required role:** `account_admin`, `compliance_manager` or `company_security_manager` for the company scheme; `account_admin`, `manager` or `compliance_manager` for project and module overrides
> **Required license feature:** `risks`

A **risk assessment scheme** defines the scales your risks are assessed on and the limits on how they may be decided. You set it once for the company; projects and modules can override parts of it.

Without any configuration the built-in default applies, so nothing changes until you customise it.

## What a scheme contains

| Part | Used for | Built-in default |
|---|---|---|
| **Impact classes** | The **Impact class** of a risk. Each class has a value, a label and a **rank** (low to high). | low, moderate, high, critical, existential |
| **Value scale (BV / EF)** | Business value and exposure factor in the simple impact view. | low, moderate, high |
| **Annual rate of occurrence (ARO)** | ARO in the simple impact view. | likely (once a year), unlikely (< once a year), rare (every 2 years or less) |
| **Thresholds** | Limits on decisions, see below. | all off |

The four treatment strategies (Avoid, Mitigate, Transfer, Accept) are fixed and not part of the scheme.

## Set the company scheme

1. Open **Settings → Company → Policies** and choose **Risk assessment**.
2. For each part, switch **Customise** on. The built-in or inherited entries become editable.
3. Edit the rows. Use **Add entry** and the trash button to change the list.
4. Set the thresholds (below).
5. Click **Save scheme**.

**Reset to default** removes the company scheme. The page shows who changed it last and when.

Rules for entries: 1 to 20 per list; a value of at most 40 characters made of letters, digits, spaces, dot, hyphen and underscore, unique within the list; a label of at most 60 characters; for impact classes a whole-number rank from 0 to 1000, unique within the list.

> [!CAUTION]
> Removing an impact class does not change risks that already use it. They keep the class and are marked **not in scheme** in the list. Choose a class from the scheme the next time you edit the risk.

## Thresholds

Each threshold is **Default (off)**, **Off** or **Set**.

| Threshold | Effect |
|---|---|
| **Decision required from** | From this impact class upward, a risk needs a documented [decision](06-decisions.md) before it can be closed, or approved with Accept or Transfer. |
| **Acceptance not permitted from** | From this impact class upward, a risk cannot be accepted: no Accept strategy and no Accept or Temporary exception decision. |
| **Maximum temporary exception** | The longest a temporary exception may run, from its valid-from date (or the day it is decided), 1 to 3,650 days. |

A violation is refused in the editor and over the API with `400`.

## Override for a project or module

Open the project's or module's settings, tab **CIA**, and scroll to **Risk assessment scheme**. Switch **Override** on for the part you want to change. Everything you leave alone is inherited: a module inherits from its project, a project from the company. A threshold can be **Inherit**, **Off** or **Set**. **Remove override** returns to the inherited values.

The text under each part says where its current values come from: built-in default, company, project or module scheme.

📸 *Screenshot: the Risk assessment page with the impact class table and the threshold selectors.*

## Which scheme applies

The scheme of a risk is the one of its module, or of its project when it has no module. Every list and every threshold is taken from the most specific level that sets it. The scheme belongs to the place, never to the source of a risk: a SARIF risk and a threat-model risk in one module are assessed on the same scale.

Read the resolved scheme over the API with `GET /core/risks/scheme`; see [Risks API](../../09-rest-api/endpoints/risks.md).

## Related

- [Decisions](06-decisions.md) — what the thresholds limit
- [Project CIA settings](../01-projects/settings/03-cia.md) — where the project override lives
- [Module CIA settings](../02-modules/settings/08-cia.md) — where the module override lives
- [Company Policies](../../06-administration/05-policies.md) — the other company policies
