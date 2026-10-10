# Project Settings

Project settings are organized in tabs (ten, plus MDR/IVDR Classification for Medical accounts). Tab visibility depends on your role. Settings defined here act as **defaults** for all modules in the project — modules can override most values.

| Tab | What it configures |
|---|---|
| [General](01-general.md) | Name, description, tags, default managers, members, confidence level. |
| [Legal](02-legal.md) | Commercial aspects, operating model, IP protection flags. |
| [Quality](04-quality.md) | Test and quality requirements. |
| [Crypto management](05-encryption.md) | Cryptographic algorithm and export control settings. |
| [CIA](03-cia.md) | Confidentiality, Integrity, Availability requirement levels. |
| [End-of-life](06-end-of-life.md) | EOL analysis toggle, warning and violation thresholds. |
| [Allow/Deny](07-whitelists-blacklists.md) | Allowed/denied licenses and components, enforce flag. |
| [MDR/IVDR Classification](09-module-classification.md) | MDR/IVDR classification (Medical accounts). |
| [Issue Integration](10-issue-tracker.md) | Jira, GitHub or TFS integration per project. |
| Webhooks and Channels | Notification channels for project events (page still to be written). |
| [Danger Operations](12-danger-zone.md) | Delete the project. |

> [!NOTE]
> **Resolved obligations** and **Imports** used to be settings tabs. They are now pages in the **Reports** dropdown of the project page: [Resolved obligations](08-obligations.md) and [Imports](11-module-import.md).

> [!TIP]
> Many tabs offer **propagate to modules** — push the current project-level value to all modules at once.

📸 *Screenshot: project settings with the General tab active showing name, tags and manager fields.*
