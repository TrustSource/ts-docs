# Project Overview

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

The project overview is the landing page when you click a project. It shows all modules with their compliance status.

## What you see

- **Header:** project name with approval status, description and tags, plus the actions listed below.
- **Tiles:** a row of four tiles — **Risks** (needs the `risks` license), **Deployments** (needs the `obom` license), **Releases** and **Analytics**. Each tile shows a headline number and opens its own page when you click it. These pages are described in later chapters.
- **Module list:** the project's modules as **cards** (grid) or **rows** (table), each with approval status badge, status ribbon (OK, Warnings, Violations), compliance bars and last analysis date. The list toolbar has **Import**, **Create module** and **Analyze all**.

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
