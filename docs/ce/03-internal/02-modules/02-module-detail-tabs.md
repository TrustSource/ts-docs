# Module Detail Tabs

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

When you open a module, you see the main detail view with several tabs. The exact tabs depend on the module's architecture type — infrastructure modules show a simplified view.

## Tabs for source-code modules

### List (Dependencies)

The default tab. Shows a flat list of all components (direct and transitive dependencies) with:

- Component name and version
- License(s) detected
- Vulnerability count and severity
- Status indicators (legal, security, viability)

Click a component row to open a **detail side panel** showing full component metadata.

📸 *Screenshot: the module List tab with component rows and status columns.*

### Tree

The same dependencies in a **hierarchical tree view** — parent → child relationships. You can expand/collapse individual nodes or the entire tree.

📸 *Screenshot: the Tree tab showing nested dependency hierarchy.*

### Graph

A **network visualization** of component relationships. Interactive force-directed graph using D3.js — drag nodes, zoom in/out, highlight paths.

📸 *Screenshot: the Graph tab showing the dependency network.*

### Legal

All licenses detected across components, grouped by license name. Shows:

- License approval status (allowed, restricted, forbidden)
- Obligation summary
- Components using each license

📸 *Screenshot: the Legal tab with licenses grouped by approval status.*

### Deep Scans

Results from [repository deep scans](../../02-inbound/05-repositories-deep-scan.md) — file-level license and copyright findings. Only populated if a deep scan has been run for this module's repository.

### Quality

Code quality and test results from [SARIF uploads](../../02-inbound/04-tests-sarif.md). Only visible when the `sarif` license feature is enabled.

## Actions from the module header

| Action | What it does |
|---|---|
| **Analyze** | Re-analyze this module against current policies and vulnerability data. |
| **Settings** | Open [Module Settings](settings/index.md). |
| **Approve** | Create an approval for this module. |
| **Tags** | Manage module tags. |

## Related

- [Module Settings](settings/index.md) — configure the module
- [Approvals](../06-approvals/index.md) — the approval workflow
- [Infrastructure Modules](03-infrastructure-modules.md) — simplified view for infrastructure
