# Project Overview

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

The project overview is the landing page when you click a project. It shows all modules with their compliance status.

## What you see

- **Header:** project name with approval status, description and tags, plus the actions listed below.
- **Tiles:** a row of four tiles, each with a headline number and a click-through to its own page:
    - [**Risks**](05-risks-and-releases.md) (needs the `risks` license): open risks, threat model status, CIA rating.
    - [**Deployments**](03-deployments.md) (needs the `obom` license and read access to the project's OBOM): deployments and the age of their newest OBOM.
    - [**Releases**](05-risks-and-releases.md): approved releases and pending approvals.
    - [**Analytics**](04-analytics.md): violations and warnings with the change against last month.

    A tile that cannot be loaded shows `?` and the reason on hover.
- **Module list:** the project's modules as **cards** (grid) or **rows** (table), each with approval status badge, status ribbon (OK, Warnings, Violations), compliance bars and last analysis date. The list toolbar has a filter, tag and **Module states** filters, **Import**, **Add/link module** and **Analyze all**. The grid or table choice is remembered separately for the project list and the module list.

📸 *Screenshot: the project page with the four tiles above the module list.*

## Header actions

| Action | What it does |
|---|---|
| **Reports** | Dropdown with the project-scoped reports: Licenses, Viability, OpenSSF, Versioning, Algorithms, Vulnerability, Obligations, Credits and Modifications. Below the divider: **Resolved obligations** and **Imports** (import history) — shown only if you have access. |
| **Follow** | Follow the project to get notifications. |
| **Settings** (cogs icon) | Open [Project Settings](settings/index.md). |

> [!NOTE]
> Approvals are started from a module (**Initiate approval** in the module header), not from the project page.

Click any module to open the [Module Detail](../02-modules/02-module-detail-tabs.md).

## Related

- [Project Settings](settings/index.md) — configuring this project
- [Module Detail Tabs](../02-modules/02-module-detail-tabs.md) — what you see inside a module
