# Allow/Deny (Module)

> [!NOTE]
> **Required role:** Developer, Compliance manager, Portfolio manager and Manager see the tab. Adding, changing and removing entries is for developers who are members (or of a module without members) and for managers and compliance managers who are the module's default project manager or default compliance manager (or any of them while none is set). **Approve** is for Compliance manager. See the [Module Settings Permission Matrix](../../../10-roles-permissions/06a-module-settings-matrix.md).

Allow/Deny lists let you overrule the automatic evaluation for this module: a license you have cleared with legal, or a component you never want to ship. The tab is not shown for infrastructure and COTS modules.

## Licenses

Two panels, **Always allow license** and **Always deny license**.

1. Select the license and write a comment of up to 200 characters, for example *Cleared by legal, ticket LEG-212*. The comment is required.
2. Click **Add**.

A license cannot be on both lists.

## Components

Two panels, **Always allow component** and **Always deny component**.

| Field | Format |
|---|---|
| **Key** | Package type and name, for example `mvn:com.acme.billing:invoice-core`. |
| **Version** | For example `3.6.1`. |
| **Comment** | Required, up to 200 characters. |

- **Always allow**: the component is allowed, that is, left out of the result evaluation.
- **Always deny**: the component always fails the evaluation.

Use a wildcard `*` as the last character of a key part (parts are separated by `:`) and as the last character of the version. `mvn:com.acme.billing:*` covers all artifacts of the group, `*:acme:*` every package type with the group `acme`, and `1.*` every 1.x version. The question-mark icon next to the panel title shows these rules.

## Edit and remove

Click a row to load it into the form: **Add** becomes **Update**, and **Cancel** and **Remove** appear. Rows labelled **in Project**, **in User** or **in Company** come from higher levels; the label links to the place where you can change them.

You can also add entries from the module's Legal view: right-click a license or component and choose **Always allow in Module** or **Always deny in Module**.

## Approval of entries

If the company or the project enforces the allow list (**Enforce Allow list** on the project's [Allow/Deny](../../01-projects/settings/07-whitelists-blacklists.md) tab, or the company switch in [Settings](../../../06-administration/02-settings.md)), an entry added by anyone but a compliance manager is saved as **Not approved**. A compliance manager selects the row and clicks **Approve**, or **Reject** to delete it.

## Related

- [Allow/Deny (Project)](../../01-projects/settings/07-whitelists-blacklists.md)
- [Open Source Policy](../../../05-knowledge/07-open-source-policy.md)

📸 *Screenshot: the Allow/Deny tab with the license and component panels.*
