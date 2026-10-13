# Manage COTS Components

> [!NOTE]
> **Required role:** Company component manager.

COTS (Commercial Off-The-Shelf) components are the commercial products you license rather than build. They are not found by scans, so you maintain them by hand in ***TrustSource CE***. Open **Knowledge → 3rd party (COTS)**; everyone else sees the list read-only (see [3rd party (COTS)](../05-knowledge/03-cots.md)).

## Add a component

1. Press **Add COTS component**.
2. Enter the **Name** (required) and optionally the **Key**, the **Versions** separated by commas, the **Homepage** and the **Repository**.
3. Press **Create component**.

## Edit a component

Select a component, then **Edit**. The tabs **Info** and **Logs** work as for [infrastructure components](01-manage-infrastructure.md#edit-a-component). In addition, **Info** has a **License model**: *Seat based*, *Install based*, *Flat* or *Other*.

Set the **commercial terms**, each as *unlimited*, *limited* or *no*:

- **Right to re-sell**
- **Right to distribute**
- **Right to host/operate as SaaS**
- **Right to modify**

These terms are shown on the component page and in the [COTS overview](../03-internal/04c-impact-and-portfolio-reports.md#cots-overview) report. **Soft-delete**, **Revert-delete** and **Delete** are available in the header.

📸 *Screenshot: the commercial terms on the COTS edit page.*

## Where it is used

**View used as Modules** lists the modules of type COTS (*Components used as Modules*). See [Create and List Modules](../03-internal/02-modules/01-create-and-list.md) for adding a COTS component to a project.

## Related

- [Knowledge → 3rd party (COTS)](../05-knowledge/03-cots.md)
- [Manage Infrastructure Components](01-manage-infrastructure.md)
