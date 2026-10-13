# Users

> List the users of your company who have not logged in for 60 days.

## Use cases

- Find dormant accounts for a periodic access review.
- Feed an offboarding or license-cleanup script.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/users/nologin` | List users without a login in the last 60 days | `account_admin` |

## GET /core/users/nologin

No parameters besides the `x-api-key` header. Returns an array of users with `userEmail`, `userName` and `created`.

```bash
curl -H "x-api-key: $TS_API_KEY" https://<your-host>/api/v2/core/users/nologin
```

The same list is shown in the app under **Administration → Audit logs → Logins history → Users with no logins**. There is no API to invite, change or remove users; use **Administration → User Management**.

## Related

- [Login history](../../06-administration/09-login-history.md)
- [User management](../../06-administration/03-user-management.md)
- [Endpoint groups](index.md)
