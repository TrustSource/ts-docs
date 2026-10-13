# Capabilities (Module)

> [!NOTE]
> **Required role:** everyone who can open the module settings reads the list. **Add capability**, edit and remove are for developers who are members (or of a module without members), Compliance manager, Portfolio manager, Manager and Company security manager. See the [Module Settings Permission Matrix](../../../10-roles-permissions/06a-module-settings-matrix.md).

A capability states what a module can do for its users, for example *Single sign-on* or *Export invoices as PDF*. Declare them once on the module; they then appear in the Capabilities tab of its [approvals](../../06-approvals/02-approval-detail-tabs.md) and in the [Solutions tab](../../03-products/03-tab-solutions.md) of products. The tab is not shown for infrastructure and COTS modules.

## Add a capability

1. Click **Add capability**.
2. Enter a **Name** (required), for example `Single sign-on`.
3. Optionally enter the version it was **Introduced at version**, for example `3.2.0`, and a **Description**.
4. Click **Add**.

## The list

The panel **Associate capabilities with this module** lists each capability with its name, description, the version that introduced it, and when and by whom it was added and last modified.

The pencil icon at the end of a row edits a capability, the trash icon removes it. Both are available only with write rights.

![The Add capability dialog over the Capabilities tab, filled in with the Name Single sign-on, Introduced at version 3.2.0 and a Description, with the Add button.](../../../../assets/images/ce/03-internal/02-modules/settings/09-capabilities-1.webp)
