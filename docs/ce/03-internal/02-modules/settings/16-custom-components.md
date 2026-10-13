# Custom components (Module)

> [!NOTE]
> **Required role:** everyone who can open the module settings reads the list. **Add component** is for developers who are members (or of a module without members) and for managers and compliance managers who are the module's default project manager or default compliance manager (or any of them while none is set). **Remove** is for those managers and compliance managers only. See the [Module Settings Permission Matrix](../../../10-roles-permissions/06a-module-settings-matrix.md).

Scanners only find what a package manager declares. Use custom components for everything else that ships in your module: a vendored library, a binary blob or a component delivered by a supplier. They are added to the module's component list at the next analysis. The tab is not shown for infrastructure and COTS modules.

## Add a component

1. Click **Add component** (upper right of the panel **Module custom components**). The same dialog opens from **Add component** in the module header.
2. Search for the component and select it, then select its version. The dialog shows what you selected: name, package type and links to homepage and repository.
3. Click **Add component**. A toast confirms *Component successfully added!*

The component search covers the [Component Lake](../../../05-knowledge/01-component-lake.md) of your installation.

> [!NOTE]
> A manually added component does not appear in the component or legal views until you run a new analysis. The views show an analysis result, not live data.

## The list

| Column | Content |
|---|---|
| **Name** | Component name. |
| **Version** | The selected version. |
| **License** | License of that version. |
| **Actions** | **Remove**. |

**Remove** takes the component out of the module at once, without a confirmation. Run an analysis to refresh the views.

📸 *Screenshot: the Custom components tab with two manually added components.*
