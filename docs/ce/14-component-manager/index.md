# Component Manager

> [!NOTE]
> **Required role:** Company component manager.

In ***TrustSource CE*** the **Company component manager** role maintains the catalogs of the [Knowledge](../05-knowledge/index.md) section: the components found by scans, the infrastructure components, the commercial (COTS) components and the license catalog. There is no separate menu group for the role; the extra buttons appear on the Knowledge pages and in the Reports hub.

| Where | What the role adds | See |
|---|---|---|
| **Knowledge → Component Lake** | **Add component**, **Edit** on a component, **Critical components** | [Critical Components](03-critical-components.md) |
| **Knowledge → Infrastructure Elements** | **Add infrastructure component**, **View used as Modules**, **Edit** | [Manage Infrastructure](01-manage-infrastructure.md) |
| **Knowledge → 3rd party (COTS)** | **Add COTS component**, **View used as Modules**, **Edit** | [Manage COTS](02-manage-cots.md) |
| **Knowledge → Licenses** | **Add license**, **Edit** on a license | [Licenses](../05-knowledge/06-licenses.md#edit-the-catalog) |
| **Reports → Components** | Components with missing data per project | [Critical Components](03-critical-components.md) |

The role also gives access to **Administration → Settings → Component allow/deny** and **Manual vulnerability**; see [Settings](../06-administration/02-settings.md).

> [!WARNING]
> The catalogs are shared by all companies of an installation. A change to a component or license takes effect for every later analysis of every company that uses it. Edit with care; component changes are recorded on the component's **Logs** tab.
>
> The first user of a company holds all seven roles, including Company component manager. That applies to the initial admin and, when self sign-up is enabled, to every user who signs up and creates a company. On an installation shared by several organisations, decide deliberately who keeps this role. See [Roles Overview](../10-roles-permissions/01-roles-overview.md).
