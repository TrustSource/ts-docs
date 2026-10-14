# Decisions

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`
> **Required license feature:** `risks`

The **Decision** tab of a risk keeps the evidence for what was decided and why. Auditors can read it; the [History](09-risk-history.md) tab keeps every change to it.

## Record a decision

1. Open the risk and click the **Decision** tab.
2. Choose the **Decision**: **Mitigate**, **Transfer**, **Accept**, **Temporary exception** or **Out of scope**. Choose *No decision* to clear it.
3. Enter **Valid from** and **Valid until** if the decision has a time frame. Valid until must not lie in the past, and Valid from must not be later than Valid until.
4. Write the **Rationale**: at least 10 and at most 2,000 characters. It is required whenever a decision is chosen.
5. Click **Save**.

***TrustSource*** adds who decided and when. You cannot enter or change those two values.

| Decision | Strategy set if the risk has none |
|---|---|
| Mitigate | Mitigate |
| Transfer | Transfer |
| Accept, Temporary exception, Out of scope | Accept |

## Temporary exceptions

A **Temporary exception** needs a **Valid until** date (marked with *) that is not in the past.

- If your scheme sets a maximum exception length, the form shows it (for example *At most 90 days*) and rejects longer ones.
- The decision maker and the responsible users are notified once, by message and e-mail, 14 days before the exception ends.
- The day after **Valid until**, the risk returns to `assessed` so that a new decision is taken. Strategy and decision stay on the risk. The change is written to the risk's history and to Company Logs.
- The reminder, the return to `assessed` and the counter apply while the exception is still carried: strategy Accept with a state other than identified, assessed, not set or closed, or the state `deferred`. A risk you closed in the meantime is left alone.
- The Risks and Tasks pages count exceptions ending within 30 days.

> [!NOTE]
> Saving a risk with an unchanged, already expired decision does not fail; only a new or edited decision is checked against today's date.

## Limits from the risk assessment scheme

Your [scheme](07-risk-assessment-scheme.md) can add two rules, enforced in the editor and over the API:

- **Decision required from**: from this impact class upward, a risk needs a documented decision before it can be closed, or approved with Accept or Transfer.
- **Acceptance not permitted from**: from this impact class upward, a risk cannot be accepted. Neither an Accept or Temporary exception decision nor the Accept strategy is allowed.

## Related

- [Treatment and State](05-treatment-and-state.md) - how strategy and state combine
- [Risk Assessment Scheme](07-risk-assessment-scheme.md) - thresholds
- [Risk History](09-risk-history.md) - who changed the decision
