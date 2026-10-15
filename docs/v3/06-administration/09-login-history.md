# Login History

> [!NOTE]
> **Required role:** `account_admin`, `manager` or `compliance_manager`

The **Logins history** page lists every sign-in attempt of your company. Use it for security audits and to investigate a login problem.

## How to open it

Click **Logins history** at the top right of the [Audit Logs](07-audit-logs.md) page (**Administration → Audit logs**). The page has no menu entry of its own, and the Audit Logs page needs `account_admin`; `manager` and `compliance_manager` reach the Logins history by its address, `/settings/company/loginsHistory`.

![The Logins history page with the Audit logs, Users with no logins for 60 days, Export as CSV and Copy to clipboard buttons, and the table with the columns Allowed, Created, Method, Type, Email and Name.](../../assets/images/v3/06-administration/09-login-history-1.webp)

## The table

| Column | Meaning |
|---|---|
| **Allowed** | *yes* if the login succeeded, *no* if it was refused. |
| **Created** | Date and time. |
| **Method** | The sign-in method used. |
| **Type** | The kind of login. |
| **Email** | The account's e-mail address. |
| **Name** | The user's name. |

Use the **Filter** box to search by method, type, e-mail and name. Newest entries come first.

## Buttons

- **Audit logs** - back to the audit trail.
- **Users with no logins for 60 days** - lists the users who have not signed in during the last 60 days, a quick way to find accounts you may want to remove. **All logins history** returns to the full table.
- **Export as CSV** and **Copy to clipboard** - take the table with you; semicolon-delimited.

## Related

- [User Management](03-user-management.md) - manage members and their roles
- [Audit Logs](07-audit-logs.md) - the broader company-wide activity trail
