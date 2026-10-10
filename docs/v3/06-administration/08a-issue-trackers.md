# Issue trackers: Jira, GitHub and TFS

> [!NOTE]
> **Required role:** `account_admin` or `enterprise_admin`
> **Plan:** the integration must be part of your plan. Otherwise the page asks for a corporate account type and keeps the fields disabled.

Connect an issue tracker once for the whole company. Afterwards, users see a **Create issue** link next to findings in reports, risks and algorithms. It opens a dialog with a **Title** and a **Description** and files the issue in your tracker. Open the settings from **Administration → Integrations**.

📸 *Screenshot: the Create new Jira issue dialog.*

## Jira

Select the **Jira** tile. Use the switch at the top to choose how issues reach Jira: **API** or **Email**.

| Field | Mode | Description |
|---|---|---|
| **Project key** | both | The Jira project the issues belong to, for example `SEC`. |
| **Company url** | API | The address of your Jira, for example `https://acme.atlassian.net`. |
| **User** | API | The Jira account that creates the issues. |
| **Password** | API | The password or API token of that account. Leave empty to keep the stored value. |
| **Email address** | Email | The receiver address that turns incoming mail into Jira issues. |
| **Active** | both | Turns the integration on. |

Select **Update** to save. Switching between **API** and **Email** is saved immediately.

> [!NOTE]
> In **Email** mode ***TrustSource*** mails the issue to the receiver address. The issue then shows the status "CREATED" but has no link into Jira, because Jira creates the issue later.

> [!TIP]
> For Jira Cloud use an API token as password.

## GitHub

| Field | Description |
|---|---|
| **Access Token** | A personal access token that may create issues. Leave empty to keep the stored value. |
| **Repository** | Optional repository in the form `owner/repo`. |
| **Active** | Turns the integration on. |

## TFS and Azure DevOps

| Field | Description |
|---|---|
| **Account or URL** | Your account name or the full collection URL. A plain name such as `acme` becomes `https://acme.visualstudio.com/defaultcollection`; the page shows the resulting address next to the field. |
| **Project** | The project that receives the work items. |
| **Access Token** | A personal access token. Leave empty to keep the stored value. |
| **Active** | Turns the integration on. |

## Related

- [Integrations](08-integrations.md)
- [Issue Integration (Project)](../03-internal/01-projects/settings/10-issue-tracker.md) — override the settings for one project
- [Integration Troubleshooting](../11-troubleshooting-faq/04-integration-troubleshooting.md)
