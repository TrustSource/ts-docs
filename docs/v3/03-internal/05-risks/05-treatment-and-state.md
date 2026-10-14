# Treatment and State

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`
> **Required license feature:** `risks`

Every risk answers two separate questions, in two fields:

- **Treatment strategy**: *what was decided?* Avoid, Mitigate, Transfer or Accept. Blank means *Not decided yet*.
- **State**: *how far along is the work?* Progress only.

From both, ***TrustSource*** derives one **treatment group**: **Untreated**, **In treatment** or **Done**. The group is never stored; every tile, filter, chart and report calculates it the same way, so the Overview, the list and the portfolio always show the same numbers.

## Treatment strategies

| Strategy | Meaning |
|---|---|
| **Avoid** | Remove the cause of the risk. |
| **Mitigate** | Reduce the likelihood or the impact. |
| **Transfer** | Hand the risk to someone else, for example by insurance or contract. |
| **Accept** | Carry the risk knowingly. |

The four strategies are fixed. A [risk assessment scheme](07-risk-assessment-scheme.md) does not change them.

## States

`identified`, `assessed`, `approved`, `planned`, `implementing`, `deferred`, `escalated`, `monitored` and `closed`. A blank state shows as **Not set**.

With **Accept** or **Transfer** there is nothing to plan or implement, so the editor offers only **approved** and **closed**. When you pick one of these strategies, the state switches to `approved` unless it already fits.

## The three treatment groups

| Group | When a risk belongs to it |
|---|---|
| **Untreated** | No strategy yet, or the state is identified, assessed or not set. Somebody has to decide. |
| **In treatment** | Avoid or Mitigate with a state from approved to monitored; or Accept or Transfer while the state is `deferred` or `escalated`. |
| **Done** | State `closed`, whatever the strategy; or Accept or Transfer with state approved, planned, implementing or monitored. |

The editor shows the group beside the State field as **Treatment: ...** and updates it as you change the two fields. The Risks list has a **Treatment** column and filter buttons for the three groups.

> [!TIP]
> To finish a risk you accept, set the strategy to **Accept**, record the reason on the [Decision](06-decisions.md) tab and leave the state at `approved`. It counts as Done without anyone having to close it.

## Done risks and automatic updates

[Automatic risks](08-automatic-risks.md) stop receiving updates from imports and checks while their treatment is Done. The risk shows a note and the source references may be out of date. Change the state, or set the strategy to Avoid or Mitigate, to resume updates.

## Older risks

Before version 3.3.28 the state also carried the decision. At upgrade, risks were converted once:

| Old value | Now |
|---|---|
| state `accepted` | strategy Accept, state `approved` |
| state `transferred` | strategy Transfer, state `approved` |
| state `eliminated` | strategy Avoid, state `closed` |
| state `out-of-scope` | strategy Accept, state `closed` |
| state `expired` | state `closed` |
| strategy `resolve` | Avoid |
| strategy `ignore` | Accept |

Counts of open and done risks changed accordingly, and risks that were `deferred` count as open again. The old values are still accepted when you write risks over the API and are translated, but they no longer work as filters.

## Related

- [Risks List](02-risks-list.md) - filter by group
- [Decisions](06-decisions.md) - document why a risk is accepted or transferred
- [Risk Overview](01-overview.md) - the inventory by group
