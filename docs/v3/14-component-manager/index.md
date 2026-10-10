# Component Manager

> [!NOTE]
> **Required role:** `component_manager`

The **Component mngr.** menu group is visible to users with the `component_manager` role. It adds the maintenance side to the read-only catalogues of the [Knowledge](../05-knowledge/index.md) section: you create and edit infrastructure and COTS components, and you fix components with missing license data in the whole component database.

| Menu entry | What it covers |
|---|---|
| **Manage IC** | The infrastructure components catalogue with create, edit and delete. See [Manage Infrastructure](01-manage-infrastructure.md). |
| **Manage COTS** | The COTS catalogue with commercial terms. See [Manage COTS](02-manage-cots.md). |
| **Critical Components** | Components with versions that lack license data, one tab per package type. See [Critical Components](03-critical-components.md). |

Component managers also see **Component manager search** and **Add component** in the [Component Lake](../05-knowledge/01-component-lake.md).

> [!TIP]
> **Manage IC** and **Manage COTS** open the same lists as **Knowledge → Infrastructure Elements** and **Knowledge → COTS**. The extra buttons only appear for your role.

> [!WARNING]
> Changes to a component take effect for all later scans and analyses of every company that uses it. Edit with care; changes are logged.
