# Project Settings

Open the project settings with **Settings** on the [project page](../02-project-overview.md) or the cogs icon in the project list. The page header shows the project name, the subtitle *Edit Project* and a **Follow** action. Settings defined here act as **defaults** for the modules of the project; several of them can be pushed to the modules with **Propagate to modules**.

The tabs appear in this order. A tab is shown only if your role may read it.

| Tab | What it configures |
|---|---|
| [General](01-general.md) | Name, application goals, tags, default managers, members, LeanIX link, default confidence level. |
| [Legal](02-legal.md) | Commercial aspects, operating model, inbound and outbound IP protection. |
| [Quality](04-quality.md) | Required test tools and risk creation from SARIF weaknesses. |
| [Crypto management](05-encryption.md) | Managed algorithms and export controls. |
| [CIA](03-cia.md) | Confidentiality, integrity and availability requirements. |
| [End-of-life](06-end-of-life.md) | End-of-life analysis switch and thresholds. |
| [Allow/Deny](07-whitelists-blacklists.md) | Enforce allow list; always allowed and always denied licenses and components. |
| [Resolved obligations](08-obligations.md) | Obligations the project has already fulfilled. |
| [Issue Integration](10-issue-tracker.md) | TFS, Jira or GitHub issues for this project. |
| [Webhooks and Channels](13-webhooks-channels.md) | Webhooks and chat channels for project events and vulnerability alerts. |
| [Imports](11-module-import.md) | Module import and its history. |
| [Danger Operations](12-danger-zone.md) | Delete the project. |

Who may change which setting is listed in the [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md). In short, "owner" below means the project's default project manager or default compliance manager; while the project has none, every manager and compliance manager counts as owner.

- A **Manager** who is owner can change almost every tab and delete the project.
- A **Compliance manager** who is owner can change General, Legal and Resolved obligations and use Imports. Every compliance manager can change Allow/Deny.
- **Account admin** links LeanIX and configures Issue Integration. **Company security manager** edits CIA. **Portfolio manager** sets the default managers.
- Everyone else reads.

MDR/IVDR classification is not part of TrustSource CE; see [CE and SaaS compared](../../../13-ce-vs-saas.md).

📸 *Screenshot: project settings with the General tab active showing name, tags and manager fields.*
