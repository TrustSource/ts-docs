# Issue Tracker (Project)

> [!NOTE]
> **Required role:** `manager` or `account_admin`

The Issue Tracker tab configures where ***TrustSource*** creates issues for this project — in Jira, GitHub or Azure DevOps (TFS).

## Supported integrations

| Integration | Configuration fields |
|---|---|
| **Jira** | Server URL, username, password/token, project key, issue type, notification email, active toggle. |
| **GitHub** | Personal access token, repository (owner/repo), active toggle. |
| **TFS / Azure DevOps** | Account URL, project name, access token, active toggle. |

Only one integration can be active at a time per project. Select the integration type and fill in the credentials.

📸 *Screenshot: the Issue Tracker tab with Jira configuration fields.*

> [!TIP]
> Store credentials as API tokens rather than passwords where possible. Jira Cloud requires an API token; GitHub requires a personal access token with `repo` scope.

## Related

- [Integrations](../../../06-administration/07-integrations.md) — company-wide integration configuration
- [Code Tests (SARIF)](../../../02-inbound/04-tests-sarif.md) — creating issues from test findings
