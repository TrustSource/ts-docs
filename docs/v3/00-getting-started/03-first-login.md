# Your First Login

This page walks you through logging into ***TrustSource*** for the first time, choosing a company, and finding your way around the interface.

## Login methods

***TrustSource*** supports five ways to sign in:

| Method | When to use it |
|---|---|
| **Email & password** | The default. You register with an email address and set a password (12+ characters, complexity enforced). |
| **GitHub** | Click *Sign in with GitHub* on the login page. Your GitHub profile (name, email, avatar) is imported automatically. |
| **LinkedIn** | Click *Sign in with LinkedIn*. Works the same as GitHub. |
| **Corporate IDM (Keycloak)** | For Enterprise and Medical accounts with SSO. Enter your company name and you are redirected to your corporate identity provider. |
| **Enrollment link** | When an admin invites you to a company, you receive an email with a direct enrollment link. |

📸 *Screenshot: the login page with email/password fields and the social login buttons (GitHub, LinkedIn, Corporate IDM).*

> [!NOTE]
> Your admin can **enforce corporate IDM login** for all users in the company. When this is active, password and social login buttons are hidden and everyone must authenticate through the configured identity provider.

## Two-factor authentication

If your account has 2FA enabled, you will be asked for a six-digit code from your authenticator app after entering your password. 2FA is configured in your [Profile settings](../08-personal/03-profile.md).

## What happens on first login

1. **Account creation** — your user profile is populated from the login method you chose (email, GitHub profile, LinkedIn profile, or Keycloak claims).
2. **Company setup** — if you registered yourself (not via enrollment link), a new company is created for you automatically. You become its first `account_admin` with all default roles assigned.
3. **Workspace loading** — while your company is being set up, you see a brief *"Setting up your workspace…"* screen. This takes a few seconds.
4. **Dashboard** — once ready, you land on the dashboard.

📸 *Screenshot: the dashboard as seen by a first-time user — empty state with guidance pointers.*

## Switching companies

If you belong to more than one company (for example, your employer's account and a personal trial), you can switch between them:

1. Open the **left sidebar** (click the hamburger icon if collapsed).
2. At the top, your current company name is shown. Click it to open the company dropdown.
3. Select the company you want to switch to.

Your roles, projects and data change instantly — each company is a separate tenant.

## Finding your way around

The interface has four main areas:

| Area | Location | Purpose |
|---|---|---|
| **Header** | Top bar | Logo, breadcrumbs, superuser warning (if applicable). |
| **Left sidebar** | Left edge | Main navigation — six menu groups (Overview, Inbound, Internal, Outbound, Knowledge, Administration) plus role-specific sections. |
| **Content area** | Center | The current page, list or detail view. |
| **Right bar** | Right edge | Quick actions — AI chat, help, API docs, updates, messages, contact admin, logout. |

> [!TIP]
> The left sidebar is **role-aware**: you only see menu items your role has access to. If something seems missing, check the [Roles & Licenses Cheat Sheet](06-roles-licenses-cheatsheet.md).

📸 *Screenshot: the main layout with header, sidebar, content area and right bar annotated.*

## Next steps

- Take the [5-Minute Tour](04-quick-tour.md) to see each menu group in action.
- Read the [Mental Model](05-mental-model.md) to understand Projects, Modules, Components and Products.
- If you are an admin setting up a new company, head to [Administration](../06-administration/index.md).

## Related

- [Profile settings](../08-personal/03-profile.md) — change your password, enable 2FA, set preferences
- [User Management](../06-administration/04-user-management.md) — invite team members
- [Auth & SSO](../07-account-admin-auth/index.md) — configure Keycloak and identity providers
