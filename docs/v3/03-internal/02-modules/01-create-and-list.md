# Create & List Modules

> [!NOTE]
> **Required role:** `manager` or `compliance_manager` to create, import or analyze modules. Other roles with access to the project can browse the list.

## Creating a module

1. Open a project (**Internal → Projects**, then click the project).
2. In the module list toolbar, click **Add/link**.
3. In the **Add/link module** dialog, choose the **Module type** (see below).
4. Fill in the fields and click **Create module**.

| Module type | What you enter | Use case |
|---|---|---|
| **Create custom module** | **Module name** (required) | Your own software. Components arrive with scans. |
| **Link company project** | An approved version of another project in your company | Reuse an already approved project as a module. The module shows a link icon. |
| **COTS or Infrastructure component** | A pre-defined component from the [component lake](../../05-knowledge/01-component-lake.md), its version, the **Type of architecture** and whether it is open source | Third-party runtime or purchased software. See [Infrastructure Modules](03-infrastructure-modules.md). |

The architecture types offered for a COTS or infrastructure component are Frontend-UI-Module, Frontend-Endpoint, Frontend-Service, Backend-Service, Backend-Endpoint, System component, Infrastructure Service and Distributable Component.

> [!TIP]
> If the component you need is not in the list, click **Not finding what you are looking for?**, enter name and version, and click **Send request**. ***TrustSource*** support then makes the component available.

If your company has reached its module limit, the list shows a **Limit was reached** warning with a link to upgrade.

### Importing a module

**Import** in the toolbar opens **Import module**. Switch between **SPDX** and **CycloneDX**, choose the file and optionally set a **Module name**. See [Working with Scans](../../02-inbound/02-import-scans.md).

### Auto-creation

A scan submitted through the REST API creates its module on the fly if it does not exist yet. See [CI/CD scan](../../02-inbound/03-cicd-scan.md).

📸 *Screenshot: the Add/link module dialog with the Module type selector.*

## The module list

The module list is part of the [project page](../01-projects/02-project-overview.md). The toolbar offers:

- **Filter** — search by module name.
- **All states / OK / Warnings / Violations** — filter by traffic-light state.
- **Tags** — select one or more company tags.
- **Module states** — switch the rows to the analysis states of a past approval; **Current state** is the default.
- **Show archived / Hide archived** — include or hide archived modules.
- **Grid / Table** — switch the presentation. Grid also has a sort-order toggle.
- **Analyze all** — re-analyze every module of the project.

**Grid** cards show the status ribbon, the architecture type, **Settings** and **Analyse** buttons, and the counts of licenses and components with the dates of the last analysis and scan.

**Table** rows show State, Name, Tags, Releases, Components, Legal, Security, and a Settings button. The Releases column links to the releases list. Two columns depend on your license: **Quality** (feature `sarif`) and **OBOM** (feature `obom`).

Click a module to open the [Module Detail](02-module-detail-tabs.md). A module whose card or header is highlighted asks you to complete its settings (legal and architecture).

## Related

- [Module Detail Tabs](02-module-detail-tabs.md) — what you see inside a module
- [Module Settings](settings/index.md) — configuring a module
- [Working with Scans](../../02-inbound/02-import-scans.md) — how data gets into a module
