# Resolved obligations (Project)

> [!NOTE]
> **Required role:** everyone who can open the project settings reads the tab. Editing, **Import settings from Project** and **Propagate settings to...** are for managers and compliance managers who are the project's default project manager or default compliance manager (or any of them while none is set). See the [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md).

Use this tab to record which license obligations the project has already fulfilled, for example the attribution notice for Apache-2.0 libraries. Recorded obligations count as resolved in every module of the project. Which obligations exist at all follows from the [Legal](02-legal.md) settings, the module's own legal settings and the licenses of the components, evaluated by the bundled legalcheck service.

## Record a completed obligation

The list **List of completed constraints of project** has three columns: **Obligation**, **Comment** and **Component**.

1. Select the **Obligation**.
2. Optionally enter the **Component key** it was resolved for, for example `npm:left-pad`.
3. Enter a comment of up to 200 characters (required).
4. Click **Add**.

Click a row to change it: the button becomes **Update**, and **Cancel** and **Remove** appear. Rows labelled **in Company** come from the company and link to its [Legal Templates](../../../15-legal-manager/02-legal-templates.md).

## Import and propagate

- **Import settings from Project**: choose a project (with a name search) and copy its list into this project.
- **Propagate settings to...**: push this project's list to one other project or to **All my n projects**. Portfolio managers also see **All n projects**.

Each module shows the project list read-only in its own [Resolved obligations](../../02-modules/settings/03-obligations.md) tab under **Project obligations**.

📸 *Screenshot: the Resolved obligations tab with the form and the list of completed obligations.*

## Related

- [Resolved obligations (Module)](../../02-modules/settings/03-obligations.md)
- [Legal (Project)](02-legal.md)
- [Notice Files](../../../04-outbound/02-notice-files.md): obligations a notice file resolves
