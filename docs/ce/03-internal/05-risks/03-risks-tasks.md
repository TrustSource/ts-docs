# Risk Tasks

> [!NOTE]
> **Menu:** **Internal → Risks** is shown to Developer, Compliance manager and Manager.

In ***TrustSource CE*** a risk is worked off through **countermeasures** (what you do about it) and **tasks** (the concrete steps, with an owner and a due date). The **Tasks** tab lists all tasks of the risks in one project or module.

## Countermeasures

Open a risk, then the **Countermeasures** tab, and click **Add countermeasure**.

| Field | Description |
|---|---|
| **Name** | Required, 3 to 200 characters, for example *Use parameterised queries for all DB access*. |
| **Status** | identified, planned, completed, ok, required, not-required or verified. |
| **Comment** | Free text. |
| **Responsible** | One or more users of your company. |
| **Risk reduction (%)** | 0 to 100. |
| **Standard reference** | For example *OWASP-ASVS V5.3.4*. |
| **Validation method** | How you prove it works. |
| **OTM mitigation ID** | Links the countermeasure to a mitigation in an Open Threat Model (OTM) file. |

**Save and Create new one** keeps the dialog open for the next entry. The list shows **Countermeasure**, **Status**, **Comment** and **Responsible**; click a row to edit it, and use the trash button to remove a countermeasure.

## Tasks

On the risk's **Tasks** tab, click **Add task**. The **Add a task** dialog opens:

| Field | Description |
|---|---|
| **Countermeasure** | Required. The task belongs to it. |
| **Name** | Required. What has to be done. |
| **Status** | backlog, planned, in_progress, in_review or completed. |
| **Due date** | A day. |
| **Frequency** | Free text such as *quarterly*. |
| **Comment** | For example *Re-check after each release*. |
| **Responsible** | One or more users of your company. |

Each task row also offers **Create issue**, which opens a GitHub issue from the task, and **View issue** once it exists. The link appears when a GitHub repository is known for the module or project, or the company's GitHub integration is active; otherwise the row offers **Copy details**, which copies the task text to the clipboard. See [Integrations](../../06-administration/08-integrations.md).

## The Tasks tab

1. Open **Risks → Tasks** (*Risk management tasks*).
2. Choose a project or module at the upper right. The page stays empty until you do.
3. Read the tiles: **total**, **upcoming** (due within the next 7 days and not completed), **opened** (planned, in progress or in review) and **resolved** (completed).
4. Use the buttons **Backlog**, **In progress** and **Completed** to show or hide groups, and the selector **My tasks**, **Unassigned** or **All tasks**.

The list shows **Countermeasure**, **Tasks**, **Due date**, **Frequency**, **Status**, **Comment** and **Responsible**, with the issue link and a delete button.

> [!NOTE]
> TrustSource CE does not mark overdue tasks and sends no due-date reminders. Use the **upcoming** tile and the due dates in the list to follow up.

📸 *Screenshot: the Tasks tab with the tiles and the group buttons.*

## Related

- [Risks List](02-risks-list.md) - the risk editor
- [Integrations](../../06-administration/08-integrations.md) - set up GitHub, Jira or TFS
