# Resolved obligations (Module)

> [!NOTE]
> **Required role:** everyone who can open the module settings reads the tab. Editing, **Import** and **Propagate** are for managers and compliance managers who are the module's default manager (or if none is set). See the [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md).

Use this tab to record which license obligations your team has already fulfilled in this module, for example the attribution notice for an Apache-2.0 library. Recorded obligations count as resolved. Which obligations exist at all follows from the [Legal](02-legal.md) settings and the licenses of the components.

## Project obligations

If the module belongs to a project, the panel **Project obligations** lists the obligations already completed on project level. It is read-only here. When the project has none yet, a red note links to the project, where you can complete them first.

## Record a completed obligation

The list **List of completed obligations of module** has three columns: **Obligation**, **Comment** and **Component**.

1. Select the **Obligation**.
2. Enter the **Component key** it was resolved for, for example `npm:left-pad`. The key is optional.
3. Enter a **Comment** of up to 200 characters, for example *Notice added to THIRD-PARTY.txt in release 4.2*.
4. Click **Add**.

Click a row to change it: the button becomes **Update**, and **Cancel** and **Remove** appear. An entry that duplicates an existing one is refused with *Entry already exists*.

## Import and propagate

Both buttons are in the upper right of the tab.

- **Import settings from Module**: choose a module (type to search by name) and copy its list into this module. A toast confirms *Obligations settings copied from: …*.
- **Propagate settings to...**: push this module's list to one other module, to **All my n modules** or to **All my n project modules**. Portfolio managers also see **All n modules** and **All n project modules**. "My" modules are those where you are default project manager or default compliance manager.

> [!CAUTION]
> Propagating replaces the obligation list of every target module. There is no confirmation dialog.

## Related

- [Resolved obligations (Project)](../../01-projects/settings/08-obligations.md)
- [Fill in the Legal Questionnaire](../../../recipes/12-legal-questionnaire.md)

![The Resolved obligations tab: the Project obligations panel with the note that the obligation settings of the project are empty, the form with Obligation, Key and Comment and the Add button, and the empty list, with Import settings from Module and Propagate settings to in the upper right.](../../../../assets/images/v3/03-internal/02-modules/settings/03-obligations-1.webp)
