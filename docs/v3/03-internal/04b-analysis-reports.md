# Analysis Reports

> [!NOTE]
> **Required role:** `developer`, `compliance_manager` or `manager` (the roles that see the [Reports hub](04-reports.md)). Narrower roles are marked below.

These reports from the [Reports hub](04-reports.md) analyse one project or module at a time. Use them to check licenses, component health and obligations before a release. Reports across the whole portfolio are on the [next page](04c-impact-and-portfolio-reports.md); the [Vulnerability report](04a-vulnerability-report.md) has its own page.

## How all reports work

1. Open **Reports** in the sidebar and select a tile, or open a report from a project's **Reports** dropdown. The project is then preselected.
2. Pick the project at the upper right. If you see *Please select the project to run a report on the upper right*, no project is selected yet.
3. Read the summary counters at the top, then the list below. Rows are coloured by status (OK, warning, violation).
4. Click **Export as PDF** to download the report with your company logo.

> [!TIP]
> If the PDF export fails with a logo message, check the logo URL under **Settings → Account & Billing**.

## Licenses overview

Lists every license used in the project, with the number of modules and components using it. Each license shows its warnings, violations and open obligations, and links to the affected modules. Counters: **licenses**, **components**, **obligations**. A **Project Goals** panel shows the project description, followed by the project's legal requirements.

## Viability report

Shows the project health of each component: **Stars**, **Code forks**, **Open issues & pull requests**, **Last update** and **Last visit**, plus a sparkline of commits during the last year. Counters: **components**, **modules**, **components without information**. Configure thresholds in the [module viability settings](02-modules/settings/04-viability.md).

## OpenSSF Scorecard report

Lists the OpenSSF Scorecard of each component. Choose the whole project (**All module of** *project*) or a single module. Counters: **modules** (when the whole project is selected), **different components**, **scores**, **avg score**, plus a score distribution chart. With fewer than 50 % scored components the chart shows *Not enough data available.* A **Project Goals** panel with the project description follows. Settings: [OSSF](02-modules/settings/05-ossf.md).

### Score missing components

Roles: `manager`, `compliance_manager` or `company_component_manager`.

1. Choose a project or module.
2. Click **Score missing components (n)**. The number is the count of repositories that will be checked.
3. Read the summary and confirm with **Yes, start!**

The report requests a Scorecard for every component without a score. A progress line shows *Scorecard requested for x of y repositories*. Scores appear once the runs finish.

- Repositories requested within the last 7 days are skipped (*Scorecard requested, result pending*).
- Components without a repository show *No repository found* and cannot be scored.
- One run requests at most 100 repositories. Repeat the run for the rest.
- Only one run per company runs at a time.

You can also request a single Scorecard with the **Scorecard** button next to **DeepScan** on a component's edit page. It runs the Scorecard only. The result is mailed to you. A DeepScan shows its Scorecard (score and every check with reason) in the scan's top bar, see [Repository Scans](../02-inbound/05-repository-scans.md).

## Versioning report

Lists components with version problems, grouped by component. What counts as a problem comes from the [versioning settings](02-modules/settings/06-versioning.md). Counters: **components**, **modules**, **affected components**. Each entry shows the problem text and where the component appears (**appearance**), linking to the module.

## End-of-life report

Lists components with end-of-life problems, as defined in the [end-of-life settings](02-modules/settings/11-end-of-life.md). Select a project or **Whole portfolio**. Counters: **components**, **modules**, **violations**, **warnings**. Each entry shows **Analyzed modules** and **Impacted projects**.

- **Send alert to project manager** notifies the project manager.
- **Create issue** opens a GitHub issue form. Without a GitHub integration, **Copy details** copies the issue text to the clipboard.

## Algorithm report

Shows cryptographic algorithms detected in the project's components, with strength, for example `AES [256]`. Algorithms blacklisted by the company policy carry a red **B** label. Counters: **modules**, **components with algorithms**. For policy violations across the portfolio, see [All bad crypto](04c-impact-and-portfolio-reports.md#all-bad-crypto).

## Obligation report

Shows the obligations the licenses of a project or module impose. Choose the project or a single module. For a project, **Overview of modules** shows every module as a tile, coloured by approval status with the release name and comment; click a tile to switch to that module. Users with `compliance_manager` additionally get **Approve the release** with **Approve** and **Reject** when an approval is initiated. Details: [Approve / Reject](06-approvals/03-approve-reject-workflow.md).

## Credits report

Lists the copyright of every component (**Copyright not detected** if none is found). Choose a project or a module. Counters: **modules**, **different components**.

## Modification state

Lists components modified in the project. Counters: **different components**, **modules**, **modified appearances**, **undocumented changes**. Each entry links to the list of changes and the modification notice. If missing, it reads *Changes url has not been provided* or *Modification notice has not been provided*.

## Related

- [Reports hub](04-reports.md)
- [Portfolio and impact reports](04c-impact-and-portfolio-reports.md)
- [Module settings](02-modules/settings/index.md)
