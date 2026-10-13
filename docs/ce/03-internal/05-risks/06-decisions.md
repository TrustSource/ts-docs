# Decisions

> [!NOTE]
> **Menu:** **Internal → Risks** is shown to Developer, Compliance manager and Manager.

***TrustSource CE*** has no separate **Decision** tab, no temporary exceptions and no expiry dates on decisions. You document a decision with the fields every risk has.

## Record a decision

1. Open the risk in the [Risks List](02-risks-list.md).
2. Set the **Mitigation strategy**, for example `ignore` for a risk you carry or `transfer` for one covered by a contract or insurance.
3. Set the **State** that reflects the decision, for example `accepted`, `transferred` or `out-of-scope`.
4. Write the reasoning into the **Description of impact** on the **Impact** tab: who decided, when, why, and until when the decision should hold.
5. Click **Save**.

If the decision depends on measures, record them as countermeasures with their own status and comment, and plan the follow-up as tasks with a due date. See [Risk Tasks](03-risks-tasks.md).

> [!TIP]
> TrustSource CE does not reopen a risk when a decision runs out. If a decision is only valid for a while, add a task with the review date as due date, so it shows up under **upcoming** on the Tasks tab.

## What is recorded automatically

The risk stores the user who last saved it and the time of the change, but no history of earlier values. See [Risk History](09-risk-history.md).

> [!NOTE]
> The SaaS edition offers a dedicated Decision tab with decision types, validity dates and expiry handling. It is not part of TrustSource CE; see [CE and SaaS compared](../../13-ce-vs-saas.md).

## Related

- [Treatment and State](05-treatment-and-state.md) - strategies and states
- [Risk History](09-risk-history.md) - what the audit log records
