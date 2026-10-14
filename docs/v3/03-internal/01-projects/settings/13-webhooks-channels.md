# Webhooks and Channels (Project)

> [!NOTE]
> **Required role:** `account_admin`, `manager` or `compliance_manager`. The tab is shown to everyone who opens the project settings, but the list stays empty for other roles, because webhook addresses and headers are credentials.

The **Webhooks and Channels** tab lists the webhooks and chat channels that receive notifications for this project, and lets you add more. Company-wide receivers are managed under [Integrations](../../../06-administration/08-integrations.md); a receiver created here belongs to this project only.

## Add a webhook or channel

1. Click **Add webhook/channel**.
2. Enter a **Name**.
3. Choose one or more **Trigger** values.
4. Choose the **Type** and enter the target address.
5. Click **Add webhook**.

| Type | You enter |
|---|---|
| **Webhook** | **Method** (POST, PUT, PATCH, DELETE, GET), **Url** and optional **Headers** (key and value separated by `:`, rows separated by `;`). |
| **Microsoft Teams Workflow** | The **"Workflow" url** of the workflow "Post to a channel when a webhook request is received". |
| **Slack** | The **"Incoming Webhook" url**. |
| **Microsoft Teams O365 (Deprecated - October 1st, 2024)** | The **"Incoming Webhook" url** of the old Office 365 connector. |

**Gitter (Under development)** is listed but cannot be selected.

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
