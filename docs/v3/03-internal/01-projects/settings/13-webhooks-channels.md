# Webhooks and Channels (Project)

> [!NOTE]
> **Required role:** `account_admin`, `manager` or `compliance_manager`

The **Webhooks and Channels** tab lists the webhooks and chat channels that receive notifications for this project, and lets you add more. Company-wide receivers are managed under [Integrations](../../../06-administration/08-integrations.md); a receiver created here belongs to this project only.

## Add a webhook or channel

1. Click **Add webhook/channel**.
2. Enter a **Name**.
3. Choose one or more **Triggers**.
4. Choose the **Type** and enter the target address.
5. Click **Add webhook**.

| Type | You enter |
|---|---|
| **Webhook** | **Method** (POST, PUT, PATCH, DELETE, GET), **Url** and optional **Headers** (`Key:value`, rows separated by `;`). |
| **Slack** | The "Incoming Webhook" URL. |
| **Microsoft Teams Workflow** | The URL of the workflow "Post to a channel when a webhook request is received". |
| **Microsoft Teams** | The old Office 365 connector URL (deprecated since October 1st, 2024). |

> [!CAUTION]
> URLs and header values are credentials. Addresses that point to private, loopback or cloud-metadata hosts are refused.

## Triggers

| Trigger | Sends |
|---|---|
| **Analysis**, **Release**, **Approval**, **Task** | A message when that event happens in the project. |
| **Vulnerability** | One message per affected component when a new CVE matches. |
| **Vulnerabilities by module** | One message per module. |
| **Vulnerabilities by project** | One message per project. |
| **Vulnerabilities in releases** | One message per release, measured against the release's frozen snapshot. |

Choosing a vulnerability trigger is the whole configuration of vulnerability alerts; there is no separate switch. Selecting two of them delivers the same findings at two levels of detail. Turning one on does not replay existing findings. Vulnerability messages name where each affected component is used and which versions it can be upgraded to.

> [!NOTE]
> Slack and Microsoft Teams cannot render **Vulnerabilities by module**; use the **Webhook** type for it.

The table shows **Created**, **Name**, **Type**, **Triggers**, **URL**, **Method** and **Headers**; **Remove** deletes an entry.

## Related

- [Integrations](../../../06-administration/08-integrations.md)
- [Post-release vulnerabilities](../../06-approvals/06-post-release-vulnerabilities.md)
