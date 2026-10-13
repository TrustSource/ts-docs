# Projects

A **project** in ***TrustSource CE*** is a container that groups related modules. Think of it as one product line, one business unit or one team's scope. The Projects page describes it as "a means to group building artifacts (modules) together". Projects carry their own legal settings, resolved obligations, issue tracker credentials, webhooks and default managers.

## In this section

| Page | What it covers |
|---|---|
| [Create & List](01-create-and-list.md) | How to create a project and work with the project list. |
| [Project Overview](02-project-overview.md) | The project page: header actions, Reports menu and the module list. |
| [Project Settings](settings/index.md) | All 12 settings tabs: General, Legal, Quality, Crypto management, CIA, End-of-life, Allow/Deny, Resolved obligations, Issue Integration, Webhooks and Channels, Imports, Danger Operations. |

## Key concepts

- A module belongs to at most one project. Modules without a project are collected under **Unassigned Modules**.
- Project-level settings act as **defaults** and minimums for the modules of the project. Modules can add their own settings on top.
- A project has a **traffic-light status** (OK, Warnings, Violations) that rolls up from its modules.
- The **default project manager**, **default compliance manager** and **members** are set per project and can be propagated to all its modules.
- Who sees a project: projects without members are visible to all users with access to Projects. Once members are set, only the members, the default project manager and the default compliance manager see it. Portfolio managers see all projects of the company.

📸 *Screenshot: the project list in table view showing state, name, modules, legal and security bars.*
