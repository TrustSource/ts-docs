# Create & List Projects

> [!NOTE]
> **Required role:** `manager` or `account_admin`

## Creating a project

1. Navigate to **Internal → Projects**.
2. Click **Create**.
3. Enter a **project name** (3–200 characters, must be unique within your company).
4. Click **Save**.

The project is created with default settings. Configure everything else — description, tags, managers, legal settings — in the [Project Settings](settings/index.md) afterwards.

📸 *Screenshot: the Create Project modal with the name field.*

> [!TIP]
> Give projects clear, descriptive names that match your team's vocabulary — "Customer Portal", "Firmware v3", "Mobile App iOS".

## The project list

The project list supports two views: **Grid view** (cards) and **Table view** (sortable columns).

### Table columns

| Column | What it shows |
|---|---|
| **State** | Traffic-light: OK (green), Warnings (yellow), Violations (red). |
| **Name** | Project name with approved-status badge. |
| **Tags** | Tags assigned to the project. |
| **Releases** | Number of published releases. |
| **Modules** | Number of modules in this project. |
| **Components** | Total component count across all modules. |
| **Legal** | Compliance bar — percentage OK / warnings / violations. |
| **Security** | Vulnerability bar — same breakdown. |
| **Quality** | Test results bar (visible when `sarif` is licensed). |

### Filtering and sorting

- **Search** — filter by project name.
- **State filter** — All, OK, Warnings, or Violations.
- **Tags filter** — select one or more tags.
- **Sort** — ascending/descending by name.

📸 *Screenshot: the project list with state and tags filters active.*

Click any row to open the [Project Overview](02-project-overview.md).

## Related

- [Project Overview](02-project-overview.md) — what you see after clicking a project
- [Project Settings](settings/index.md) — configure the project after creation
