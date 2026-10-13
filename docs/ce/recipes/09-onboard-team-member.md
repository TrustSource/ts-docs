# Recipe: Onboard a Team Member

Invite a new user, give them the right roles and project access, and get them productive.

> [!NOTE]
> **You'll need:** the role **Account admin**, and working outgoing email. The default installation sends all email to the bundled Mailpit, which keeps it instead of delivering it. Set `MAIL_URL` to your SMTP server first. See [Environment variables](../01-installation-setup/03-environment-variables.md).

## Steps

### 1. Invite the user

Open **Administration → User Management**. Under **Invite your colleagues** enter **Name** and **E-Mail** and select **Invite**. The user receives an enrolment email with a link to set a password.

📸 *Screenshot: User management with the "Invite your colleagues" panel.*

For many users at once, use **Import users from CSV** on the same page.

> [!TIP]
> If the email does not arrive, use **Resend invitation** next to the user. While you test with Mailpit, you find the email in the Mailpit UI on the server (`http://127.0.0.1:8025`). Mailpit is for testing only: anyone who can open its UI can read every enrolment and password reset email.

### 2. Assign roles

A new user starts with the role **Developer**. Change the roles in the user's **Roles** field in the users table. Roles apply to the whole company:

| Role | Typical person |
|---|---|
| Developer | Uploads scans, works on module findings |
| Manager | Owns projects, requests approvals |
| Compliance manager | Reviews and approves, maintains allow and deny lists |
| Portfolio manager | Oversees many projects |
| Company security manager | Security settings, CSAF, crypto policy |
| Company component manager | Maintains the component, infrastructure and COTS catalogs |
| Account admin | Users, API keys, integrations |

See [Roles overview](../10-roles-permissions/01-roles-overview.md) and [Roles cheat sheet](../00-getting-started/06-roles-cheatsheet.md).

### 3. Give access to projects

A project whose **Members** list is empty is visible to everyone in the company. A project with members is visible only to its members and its default project and compliance managers. To add the new user, open the project, select **Settings** and on the **General** tab add them to **Members** (default project or compliance manager of the project, or Portfolio manager for the default managers). **Propagate to modules** copies the list to the project's modules.

### 4. First login

The user follows the link in the email, sets a password and signs in with their email address. Recommend that they switch on **Enable Two-Factor Authentication** in their **Profile**. See [First login](../00-getting-started/03-first-login.md).

### 5. Orientation

- The compass button in the right bar opens the **Guide** with **Start tour** for the current screen. The dashboard tour starts by itself on the first visit.
- Point them to the [Quick tour](../00-getting-started/04-quick-tour.md) and the [Mental model](../00-getting-started/05-mental-model.md).
- If they need the API, they can create a **Personal access key** in their **Profile**; it carries the roles they hold at that moment as scopes. See [Authentication](../09-rest-api/01-authentication.md).

## Did it work?

- [ ] The user appears in **User Management** with the right roles.
- [ ] After their first login, the user sees the projects they should see.

## When the team member leaves

Removing a user, or taking roles away from them, does not revoke their personal access keys. A key keeps the roles it was created with and keeps working. As **Account admin**, open **Administration → API keys → API keys**, find the user's keys (ticked in the **PAK** column), select **Unpublish** and then **Delete** for each. Do this before or together with removing the user under **Administration → User Management**. Also replace any company API key, release key, CSAF feed key or webhook secret the person knew; see [Offboard a user](../06-administration/03-user-management.md#offboard-a-user).

## Related

- [User management](../06-administration/03-user-management.md)
- [Login history](../06-administration/09-login-history.md)
- [Fill in the Legal Questionnaire](12-legal-questionnaire.md) - walk a new manager through it
