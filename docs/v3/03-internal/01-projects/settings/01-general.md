# General (Project)

> [!NOTE]
> **Required role:** everyone who can open the project settings reads the tab. Name, Application goals, Tags, the default managers and Members can be changed by `manager` and `compliance_manager` users who are the project's default project manager or default compliance manager (or any of them while none is set). **Link with LeanIX** is changed by `account_admin` and by managers who are owner. **Upload file** is for `account_admin`, `manager` and `compliance_manager`.

The General tab is where you configure the project's identity and team assignments.

## Fields

| Field | Description |
|---|---|
| **Name** | Project name (3 to 200 characters, must be unique within the company). |
| **Application goals** | Optional free text about the project's purpose, up to 100 KB. The [Threat Modelling](../../08-threat-models/index.md) agent reads it as context when it generates a model. **Upload file** replaces the text with the content of a Markdown file (`.md` or `.markdown`, at most 100 KB, for example an `architecture.md`) after you confirm *Update Application goals from file?* with **Yes, upload it!** (also available via the REST API). The content is screened for prompt-injection attempts before it is stored; a refused file is reported in an **Upload rejected** dialog with the reason. |
| **Tags** | Labels for filtering and grouping. Select from company-defined tags. Without company tags, the field shows *No tags in company. View company tags.* |
| **Default project manager** | The manager responsible for this project. Can be propagated to all modules. |
| **Default compliance manager** | The compliance manager who reviews and approves releases. Can be propagated. |
| **Members** | Users who work on the project. Once members are set, only the members and the two default managers (and portfolio managers) see the project. Can be propagated. |
| **Link with LeanIX** | Optional link to a LeanIX fact sheet. Without a LeanIX connection, the field shows **Update LeanIX settings**, which opens the company integrations. |
| **Default confidence level** | **High only**, **Medium +** or **All**. Vulnerability findings below this confidence are hidden. Modules without their own value inherit it. |
| **Threat model layout** | **Keep manual layout** keeps the diagram positions you saved when the threat-modelling agent next runs; **Rebuild from scratch** discards the saved layout and generates a fresh automatic diagram on the next run. |

Click **Update** to save.

> [!TIP]
> Next to **Tags**, **Default project manager**, **Default compliance manager** and **Members**, use **Propagate to modules** after a change to apply the value to all existing modules of the project at once.

![The General tab of Example Project with Name, Application goals and Upload file, Tags, the default managers and Members with Propagate to modules, Link with LeanIX, Default confidence level Medium +, Threat model layout Keep manual layout and the Update button.](../../../../assets/images/v3/03-internal/01-projects/settings/01-general-1.webp)
