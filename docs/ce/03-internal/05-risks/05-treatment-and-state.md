# Treatment and State

> [!NOTE]
> **Menu:** **Internal → Risks** is shown to Developer, Compliance manager and Manager.

Every risk in ***TrustSource CE*** carries two fields that describe how it is handled:

- **Mitigation strategy** (shown as *General approach* in the list) - *what is the plan?*
- **State** - *where does the risk stand?*

Both are set in the risk editor and are independent of each other. The app does not derive one from the other.

## Mitigation strategies

| Strategy | Typical use |
|---|---|
| `ignore` | No action is planned; the risk is carried as it is. |
| `transfer` | Hand the risk to someone else, for example by insurance or contract. |
| `mitigate` | Reduce the likelihood or the impact. |
| `resolve` | Remove the cause of the risk. |

A blank strategy means that nothing has been decided. A risk without countermeasures whose strategy is not `ignore` (including a blank strategy) is listed under **Unattended risks** on the [Overview](01-overview.md).

## States

`identified`, `assessed`, `approved`, `planned`, `implementing`, `monitored`, `accepted`, `closed`, `deferred`, `escalated`, `expired`, `transferred`, `eliminated` and `out-of-scope`. The state can also be left blank.

All states can be combined freely with any strategy. Risks created by automation start as `identified`.

## Resolved and in progress

The tiles and the **In progress** / **Resolved** filter buttons split the risks by state:

| Group | States |
|---|---|
| **resolved** | `accepted`, `closed`, `deferred`, `eliminated`, `expired` |
| **in progress** | every other state, and risks without a state |

> [!NOTE]
> `transferred` and `out-of-scope` count as *in progress*, and `deferred` counts as *resolved*. To take a transferred or out-of-scope risk out of the open count, set it to `closed` or `accepted`.

The [portfolio treemap](04-portfolio-views.md) uses its own colouring by state: red for `deferred` and `expired`, amber for the working states.

## States and automatic updates

[Automatic risks](08-automatic-risks.md) stop receiving updates from SARIF imports and license changes while their state is `accepted`, `transferred`, `out-of-scope` or `closed`. A risk created from SARIF findings then shows a note that its source references may be out of date. Change the state to resume updates.

## Related

- [Risks List](02-risks-list.md) - filter by group
- [Decisions](06-decisions.md) - document why a risk is accepted or transferred
- [Risk Overview](01-overview.md) - new and unattended risks
