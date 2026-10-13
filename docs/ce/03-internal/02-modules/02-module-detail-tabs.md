# Module Detail Tabs

> [!NOTE]
> **Required role:** any role with access to the project can open a module. The header actions below are shown to Manager and Compliance manager.

Open a module from the [module list](01-create-and-list.md). The header shows the module name (with version, analysis name, LeanIX link and architecture type), the traffic-light state and the analysis selector. Below it, the tab bar switches the view. Infrastructure and COTS modules have no tab bar; see [Infrastructure Modules](03-infrastructure-modules.md).

## Views

| Tab | Shows |
|---|---|
| **List** | Direct and transitive dependencies, with the Component Details side panel. |
| **Tree** | The same dependencies as a hierarchy. |
| **Graph** | An interactive dependency graph. |
| **Legal** | Licenses with the components that use them. |
| **Quality** | Results of [SARIF imports](../../02-inbound/04-sw-quality-scans.md) for this module. |

### List

Each row shows the component name, version and detected licenses (**Multi-license** if you must choose one), plus small status badges for Licenses, Vulnerabilities, Viability, Versioning, Export control and, when enabled, End-of-life. Use the **Filter** box, the sort toggle and the status filters above the list. Click a row to open the **Component Details** side panel; see [Component details](04-component-detail.md).

The root of the module carries a folder icon. Managers and compliance managers also see a gavel icon there (**Set root component license**); see [Manual license resolution](06-manual-license-resolution.md#root-component).

📸 *Screenshot: the List view with the Component Details side panel open.*

### Tree and Graph

**Tree** expands and collapses the parent-child structure. **Graph** draws it as a network you can drag and zoom.

### Legal

Licenses with their status (OK, warning, violation, **Private license**) and, when expanded, the components using them (**Load 10 more** for long lists). **Expand all** and **Collapse all** open or close every license. Click a license name for the [license details](05-license-detail.md). A component without a license is listed under **License not detected**.

Right-click a license or a component to choose **Always allow in Module / Project / Company** or **Always deny in Module / Project / Company** (see [Allow/Deny](settings/14-whitelists-blacklists.md)). The project entries are disabled for modules without a project. On problem rows, a link creates an issue if Jira or TFS is connected, and **Copy details** copies the problem text.

### Quality

A status bar per test tool, then a table of the imported SARIF tests with their counts of violations, warnings and notes, the number of rules in the tool catalog and the weaknesses (CWE) found, each linking to the [Vulnerability Lake](../../05-knowledge/04-vulnerability-lake.md). **Import** uploads another SARIF file; a state filter narrows the table.

## Header actions

For Manager and Compliance manager:

| Action | What it does |
|---|---|
| **Settings** | Opens [Module Settings](settings/index.md). Highlighted while legal or architecture settings are incomplete. |
| **Env. settings** | Opens **Environmental settings**: the environmental CVSS vector of this module, with tabs **CVSS:4.0**, **CVSS:3.x** and **CVSS:2.0**. Affected scores show *Base score ... was modified by Environmental settings*. |
| **Add component** | Adds a component manually; see [Custom components](settings/16-custom-components.md). |
| **Analyse** | Re-analyses the module against current policies and vulnerability data. Reads **Analysis in progress** while it runs. |
| **Reports** | Opens **Vulnerability**, **Risks**, **Obligations** or **Credits** for this module in a new tab. |
| **Resolve via Notice file** | Opens **Resolve obligation via Notice file**, which lists the obligations a [notice file](../../04-outbound/02-notice-files.md) resolves automatically or can resolve, and creates it (**Create Notice file**). Becomes **View Notice file** once one exists. |
| **Initiate approval** | Starts an [approval](../06-approvals/01-request-approval.md) of this module (Settings, Select analysis, Confirm statuses, Finalization). Not shown for modules outside a project. |
| **Follow** | Follow the module for notifications. |
| **Stats** | Dropdown with the module's status bars: Components, Vulnerabilities, Legal, Versioning. |
| **Take tour** | Starts the guided tour of the module page; see [Guide and demo data](../../00-getting-started/08-guide-and-demo.md). |

On narrow screens some of these move into a **...** menu.

## Choosing an analysis

Under the title, **Analysis from <date>** is a dropdown of all analyses of the module. Pick one to view an older state.

- **Magnifier icon**: **Find by branch or tag**. It appears only if the scans carried branches or tags. The active filter shows as a badge; click it to remove the filter.
- **+ icon**: **Attach a name to the selected analysis** (Manager, Compliance manager). Enter a **Name** of up to 30 characters and click **Save**. The name appears in the dropdown and next to the module name.
- **External-link icon**: **View scan details** in a new tab.

> [!NOTE]
> Name, filter and scan details are not shown for infrastructure and COTS modules.

## Related

- [Component details](04-component-detail.md) · [License details](05-license-detail.md)
- [Manual license resolution](06-manual-license-resolution.md)
- [Module Settings](settings/index.md)
