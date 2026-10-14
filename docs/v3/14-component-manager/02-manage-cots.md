# Manage COTS Components

> [!NOTE]
> **Required role:** `component_manager` (an [internal role](../10-roles-permissions/02-internal-roles.md))

COTS (Commercial Off-The-Shelf) components are the commercial products you license rather than build. They are not found by scans, so you maintain them by hand. Open **Component mngr. → Manage COTS**; everyone else sees the list read-only under [Knowledge → COTS](../05-knowledge/03-cots.md).

## Add a component

1. Press **Add COTS component**.
2. Enter the **Name** (required) and optionally the **Key**, the **Versions** separated by commas, the **Homepage** and the **Repository**.
3. Press **Create component**.

## Edit a component

Select a component, then **Edit**. The tabs **Info**, **CPE**, **Crawlers** and **Logs** work as for [infrastructure components](01-manage-infrastructure.md#edit-a-component). On **Info** you also set the **License model** (*Seat based*, *Install based*, *Flat* or *Other*) and, in the panel **Commercial terms**, each term as *unlimited*, *limited* or *no*:

- **Right to re-sell**
- **Right to distribute**
- **Right to host/operate as SaaS**
- **Right to modify**

These terms are shown on the component page. **Soft-delete**, **Revert-delete** and **Delete** are available in the header.

📸 *Screenshot: the commercial terms on the COTS edit page.*

## Where it is used

**View used as Modules** lists the modules of type COTS. See [Modules](../03-internal/02-modules/01-create-and-list.md) for the COTS module type.

## Related

- [Knowledge → COTS](../05-knowledge/03-cots.md)
