# Creating the First Admin User

A new ***TrustSource CE*** installation has no users. On the first start, the app creates the first administrator and their company from the installation settings.

## How it works

On every start, the app checks whether the database has any users. Only if it has **none**, it:

1. creates a company named after `INITIAL_COMPANY_NAME` (default `My company`),
2. creates a user with `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD`, with the email address already verified, so no confirmation email is needed,
3. gives this user **all seven roles** in the company: Developer, Compliance manager, Portfolio manager, Manager, Account admin, Company component manager and Company security manager,
4. logs `=> Initial admin created: <email> in company <company name>`.

| Setting | Rules |
|---|---|
| `INITIAL_ADMIN_EMAIL` | Required. Must be a valid email address; it is stored in lower case. |
| `INITIAL_ADMIN_PASSWORD` | Required. At least 8 characters. |
| `INITIAL_COMPANY_NAME` | Optional. Default `My company`. |

If a setting is missing or invalid, no user is created and the app logs the reason, for example:

```
=> Initial admin not created: INITIAL_ADMIN_PASSWORD must have at least 8 characters
```

The app keeps running. Fix the setting and run `docker compose up -d`; the next start creates the administrator.

> [!NOTE]
> As soon as one user exists, the `INITIAL_*` settings are ignored. Changing them later does not change the administrator's email, password or company name. Change those in the app instead: the password in the [Profile](../08-personal/03-profile.md), the company name in **Administration → Settings**.

## First steps after signing in

1. **Sign in** at your `ROOT_URL` (on the same machine, <http://localhost:3000>) with `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD`.
2. **Set a strong password.** The installation setting only requires 8 characters; passwords set in the app need at least 12 characters with a capital letter, a special character and a number. Change it under **Change your Password** in your [Profile](../08-personal/03-profile.md).
3. **Replace the password in `.env`.** `INITIAL_ADMIN_PASSWORD` stays there in plain text. Replace its value with a random one (for example from `openssl rand -hex 32`) and run `docker compose up -d`; the compose file requires the setting to be present, but the app ignores it once a user exists.
4. **Enable two-factor authentication** in your Profile.
5. **Check the company details** - name, email and logo - under **Administration → Settings**.
6. **Invite your colleagues** under **Administration → User Management** and give each only the roles they need. See [User Management](../06-administration/03-user-management.md).

> [!WARNING]
> The first administrator holds every role. The header shows *ATTENTION! You are using all roles. This is not intended for production use.* Use this account to set up the installation and invite the real users with fewer roles. Consider a second account admin, so that you are not locked out if this account's password is lost.

## If the password is lost

Use **I forgot my password** on the sign-in page. The reset email goes through `MAIL_URL` - in the reference setup to Mailpit at <http://localhost:8025>. Setting a new `INITIAL_ADMIN_PASSWORD` does not help once the user exists.

Mailpit is for testing only. Its UI has no authentication and shows every reset and enrolment email, so anyone who can open it can take over accounts. Once a real `MAIL_URL` is set, remove the Mailpit service; see [Docker Compose Setup](02-docker-compose.md#mailpit).

## Related

- [Your First Login](../00-getting-started/03-first-login.md)
- [Roles Cheat Sheet](../00-getting-started/06-roles-cheatsheet.md)
- [Settings Reference](03-environment-variables.md)
