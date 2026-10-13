# General (Project)

> [!NOTE]
> **Required role:** everyone who can open the project settings reads the tab. Name, Application goals, Tags, managers and Members can be changed by managers and compliance managers who are the project's default project manager or default compliance manager (or by any of them while none is set). Portfolio managers can also set the default managers. **Link with LeanIX** is changed by Account admin and by managers who are owner. See the [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md).

The General tab holds the identity of the project and its team.

## Fields

| Field | Description |
|---|---|
| **Name** | Project name, 3 to 200 characters, unique within the company. |
| **Application goals** | Free text about the purpose of the project, up to 100 KB. **Upload file** replaces the text with the content of a Markdown file (`.md` or `.markdown`, at most 100 KB) after you confirm *Update Application goals from file?* with **Yes, upload it!**. Upload is available to Account admin, Manager and Compliance manager. |
| **Tags** | Company tags for filtering and grouping. Without company tags, the field shows *No tags in company. View company tags.* and links to [Company Tags](../../../06-administration/02b-company-tags.md). |
| **Default project manager** | The manager responsible for the project. If the company has no manager, the field links to the user management. |
| **Default compliance manager** | The compliance manager who reviews and approves releases. |
| **Members** | Users who work on the project. Once members are set, only members and the two default managers (and portfolio managers) see the project. |
| **Link with LeanIX** | Select a LeanIX fact sheet. Without a LeanIX connection, the field shows **Update LeanIX settings**, which opens [LeanIX and SCANOSS](../../../06-administration/08b-leanix-scanoss.md). |
| **Default confidence level** | **High only**, **Medium +** or **All**. Vulnerability findings below this confidence are hidden. Modules without their own value inherit it. |

Click **Update** to save. A toast confirms *Project settings changed!*.

## Propagate to modules

Next to **Tags**, **Default project manager**, **Default compliance manager** and **Members**, the button **Propagate to modules** saves the form and copies that value to every module of the project. A toast reports how many modules were updated.

> [!TIP]
> Use **Propagate to modules** after changing managers or members so that existing modules follow the project.

📸 *Screenshot: the General settings tab with name, application goals, tags and manager fields.*

## Related

- [User Management](../../../06-administration/03-user-management.md): users and roles available for the manager fields
- [General (Module)](../../02-modules/settings/01-general.md)
