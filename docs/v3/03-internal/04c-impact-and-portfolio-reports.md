# Impact and Portfolio Reports

> [!NOTE]
> **Required role:** `developer`, `compliance_manager` or `manager` (the roles that see the [Reports hub](04-reports.md)). Tiles with narrower roles are marked below.

These reports from the [Reports hub](04-reports.md) look across your portfolio: which projects are hit by a component, a CVE or an algorithm, where your crypto policy is violated, and what your issue trackers hold. Single-project reports are on [Analysis Reports](04b-analysis-reports.md).

## Impact reports

Use an impact report when a new component problem, CVE or banned algorithm is announced and you need to know which projects are affected. All three work the same way:

1. Enter the value in the filter bar.
2. Click **Check**. Click the trash button to reset the filters.
3. Read the list of impacted projects. Each entry shows the project, its project manager and compliance manager (with e-mail), and the affected modules.
4. Click **Send alert** to notify the people responsible (component and CVE reports), or **Export as PDF**.

| Report | Filter | Role | Extra details |
|---|---|---|---|
| **Component impact** | **Select component** (type to search), then optionally **--Select version--** | `compliance_manager`, `manager`, `portfolio_manager` | Component description with a link to the component page. Versions list their licenses. |
| **CVE impact** | A CVE id, for example `CVE-2021-25322` | all report roles | CVE description with CISA exploit alert, bump hints, weakness (CWE), base, exploit and impact scores. |
| **Algorithm impact** | **Select algorithm** | all report roles | Algorithm and strength, with the **B** label if your policy blacklists it. |

> [!NOTE]
> The **Component impact** tile is only shown to the roles in the table. The other two tiles are shown to every report role.

## All bad crypto

Roles: `company_security_manager`, `compliance_manager`, `portfolio_manager`.

Lists projects that violate your company crypto policy. Select a project or **Whole portfolio**. Counters: **modules**, **components with algorithms**, **detected algorithms**, **managed algorithms**, **algorithms in use**, **coverage**. Each project lists its algorithms. Blacklisted ones carry a red **B**.

- **View components and modules** opens the project.
- **Send alert to project manager** notifies the responsible person.
- **Create issue** opens a GitHub issue form. Without a GitHub integration, **Copy details** copies the issue text.

Manage algorithms and the blacklist under [Algorithms](../05-knowledge/05-algorithms.md).

## COTS overview

Shown with the `medical` license or when SOUP reports are part of your plan. Lists the commercial off-the-shelf components of a project with their links (homepage, repository, issues, release notes, provider) and commercial terms: **Right to re-sell**, **Right to distribute**, **Right to host/operate as SaaS** and **Right to modify**. Each entry links to the module that uses it. Counter: **components**. Maintain COTS data under [COTS](../05-knowledge/03-cots.md).

## Dependent projects

Select a project to list all projects that depend on it, with their description, project manager and compliance manager. Use it to see who is affected before you change a shared project.

## Components

Role: `company_component_manager`. Lists components with missing data so you can complete them. See [Critical Components](../14-component-manager/03-critical-components.md).

## Issue report

Shows the tasks of a project from your issue tracker. Select the project at the upper right; the first project is preselected. The report uses the tracker configured for the project (and included in your plan), in this order: Jira, then TFS, then GitHub issues. Only if Jira, TFS and GitHub issues are all configured for the project does a second selector let you switch between **TFS**, **Jira** and **GitHub issues**.

Each tracker shows a status bar with the task count per status, then each task with its status, key or number, title, creator, creation date and description. Click the link icon to open the task in the tracker.

If no integration is configured for the project, the page says so and offers **Setup integration**. If the tracker cannot be reached, it offers **Change integration settings**. Configure trackers under [Integrations](../06-administration/08-integrations.md).

## Related

- [Reports hub](04-reports.md)
- [Analysis Reports](04b-analysis-reports.md)
- [Vulnerability Report](04a-vulnerability-report.md)
