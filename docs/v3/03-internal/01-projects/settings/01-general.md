# General (Project)

> [!NOTE]
> **Required role:** `manager` or `account_admin`

The General tab is where you configure the project's identity and team assignments.

## Fields

| Field | Description |
|---|---|
| **Name** | Project name (3–200 characters, must be unique). |
| **Description** | Optional description of the project's purpose — also used as the "Application goals" context the [Threat Modelling](../../08-threat-models/index.md) agent reads when generating a model (max 100 KB). Instead of retyping it, you can click **Upload file** to populate this field from an `architecture.md` file (also available via the REST API); the uploaded content is automatically screened for prompt-injection attempts before it's stored. |
| **Tags** | Labels for filtering and grouping. Select from company-defined tags. |
| **Default Project Manager** | The user responsible for this project. Can be propagated to all modules. |
| **Default Compliance Manager** | The user who reviews and approves releases. Can be propagated. |
| **Members** | Users who have access to this project's modules. Can be propagated. |
| **LeanIX Link** | Optional link to a LeanIX fact sheet for portfolio management integration. |
| **Confidence Level** | Detection confidence threshold — High only, Medium+, or All. |

> [!TIP]
> Use **Propagate to modules** after changing managers or members to apply the change across all existing modules at once.

📸 *Screenshot: the General settings tab with name, tags and manager fields.*
