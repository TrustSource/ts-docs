# Create & List Projects

> [!NOTE]
> **Required role:** Manager or Compliance manager to create a project. Developer, Compliance manager, Manager and Account admin see **Projects** in the sidebar.

## Creating a project

1. Navigate to **Internal → Projects**.
2. Click **Create**.
3. In the **Create new project** dialog, enter the **Project name** (3 to 200 characters, unique within your company). Leading and trailing spaces are removed.
4. Click **Create project**.

A toast confirms *Project successfully created!*. A name that is already taken is refused with *A project with this name already exists*. The new project has default settings. If you are a manager, you become its default project manager; if you are a compliance manager, its default compliance manager. A role you do not hold is filled with another user of the company who holds it. The member list starts empty. Configure description, tags, managers and legal settings in the [Project Settings](settings/index.md) afterwards.

📸 *Screenshot: the Create new project dialog with the Project name field.*

> [!TIP]
> Give projects clear, descriptive names that match your team's vocabulary, for example "Customer Portal", "Firmware v3" or "Mobile App iOS".

A project is also created on the fly when you import a scan into a new project (**+ Create new project** on [Import Scans](../../02-inbound/02-import-scans.md)), or through the REST API with `POST /core/projects`. Scans submitted through the REST API do not create projects: the target project must already exist.

## Demo project

Managers and compliance managers see two more buttons in the header: **Generate** adds a demo project with a sample module, and **Remove demo** removes all demo projects and modules again. Each company has at most one demo project. See [Guide and demo data](../../00-getting-started/08-guide-and-demo.md).

## The project list

The project list has two views, **Grid** (cards) and **Table** (columns). In grid view, the sort button toggles the order by name.

Each card shows the project name with its approval badge, the status ribbon, tags, the description, the status bars, the number of **Modules** and the date of the **Last analysis**, plus **Settings**, pin and follow buttons.

### Table columns

| Column | What it shows |
|---|---|
| **State** | Traffic light: OK, Warnings or Violations. |
| **Name** | Project name with approval badge. |
| **Tags** | Tags assigned to the project. |
| **Releases** | Number of releases; the link opens the releases list filtered to the project. |
| **Modules** | Number of modules in the project. |
| **Components** | Number of components across all modules. |
| **Legal** | Legal status bar: OK, warnings and violations. |
| **Security** | Vulnerability status bar. |
| **Quality** | Status bar of the SARIF test results. |

The last column holds **Settings**, pin and follow.

### Filtering

- **Filter**: search by project name as you type.
- **All states / OK / Warnings / Violations**: filter by traffic-light state.
- **Tags**: select one or more company tags. Without company tags, the field reads **No tags** and links to the company tags.

📸 *Screenshot: the project list with the state and tags filters active.*

If modules exist that belong to no project, the list also shows **Unassigned Modules**. Click any project to open the [Project Overview](02-project-overview.md).

## Related

- [Project Overview](02-project-overview.md): what you see after clicking a project
- [Project Settings](settings/index.md): configure the project after creation
