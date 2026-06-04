# Project Overview

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

The project overview is the landing page when you click a project. It shows all modules with their compliance status.

## What you see

Modules are displayed as **cards** (grid) or **rows** (table), each showing:

- Module name with approval status badge
- Status ribbon — OK, Warnings or Violations
- Compliance bars — legal, security and quality percentages
- Last analysis date

📸 *Screenshot: the project overview showing module cards with status ribbons and compliance bars.*

## Actions

| Action | What it does |
|---|---|
| **Create Module** | Add a new module to this project. |
| **Import Modules** | Import modules from a file or SPDX document. |
| **Analyze All** | Re-analyze all modules against current policies. |
| **Generate Reports** | Generate project-level reports (SBOM, Notice, SOUP). |
| **Approve Project** | Create a project-wide approval. |
| **Settings** | Open [Project Settings](settings/index.md). |
| **Pin / Follow** | Pin to your dashboard or follow for notifications. |

Click any module to open the [Module Detail](../02-modules/02-module-detail-tabs.md).

## Related

- [Project Settings](settings/index.md) — configuring this project
- [Module Detail Tabs](../02-modules/02-module-detail-tabs.md) — what you see inside a module
