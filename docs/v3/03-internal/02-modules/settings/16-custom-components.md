# Custom components (Module)

> [!NOTE]
> **Required role:** everyone who can open the module settings reads the list. **Add component** is for developers and for managers and compliance managers who are the module's default manager (or if none is set); **Remove** only for those default managers. Saving is also checked on the server, which accepts account admins, managers and developers. See the [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md).

Scanners only find what a package manager declares. Use custom components for everything else that ships in your module: a vendored library, a binary blob or a component delivered by a supplier. They are added to the module's component list at the next analysis. The tab is not shown for infrastructure modules.

## Add a component

1. Click **Add component** (upper right of the panel **Module custom components**).
2. Search for the component and select it, then select its version. The dialog shows what you selected: name, package type and links to homepage and repository.
3. Click **Add component**. A toast confirms *Component successfully added!*

If the same component with the same version is already in the module, you see *Error: component with same version already exists in module*.

> [!NOTE]
> A manually added component does not appear in the component or legal views until you run a new analysis. The module is marked as requiring one. The views show an analysis result, not live data.

## The list

| Column | Content |
|---|---|
| **Name** | Component name. |
| **Version** | The selected version. |
| **License** | License of that version. |
| **Actions** | **Remove**. |

**Remove** takes the component out of the module at once, without a confirmation, and logs it. A toast confirms *Component … successfully removed!*. Run an analysis to refresh the views.

📸 *Screenshot: the Custom components tab with two manually added components.*
