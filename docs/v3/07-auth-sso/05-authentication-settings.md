# Authentication Settings

> [!NOTE]
> **Required role:** `account_admin`
> **Required account type:** Enterprise or Medical

Authentication settings list the steps of the **browser login flow** of your identity store. Each step has a drop-down that decides whether the step is required.

![The Authentication settings page with one drop-down per step of the browser flow: Cookie, Kerberos, Identity Provider Redirector and forms, with the indented sub-steps Username Password Form, Browser - Conditional OTP, Condition - user configured and OTP Form.](../../assets/images/v3/07-auth-sso/05-authentication-settings-1.webp)

For every step the page shows its name, for some steps a short description in brackets, and a drop-down with the requirement. Sub-steps are indented below their parent step. The choices come from your identity store and differ per step: **REQUIRED**, **ALTERNATIVE**, **DISABLED** and, for some steps, **CONDITIONAL**.

Changes are saved the moment you pick a value: there is no **Update** button. A message confirms "Authentication settings updated". The change applies to the browser login flow of your company.

> [!WARNING]
> Changing a requirement affects how every user of your company signs in with the browser flow.

## Related

- [Login settings](04-login-settings.md)
- [Identity Integration](index.md)
