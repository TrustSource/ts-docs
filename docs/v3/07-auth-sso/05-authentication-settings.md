# Authentication Settings

> [!NOTE]
> **Required role:** `account_admin`
> **Required account type:** Enterprise or Medical

Authentication settings list the steps of the **browser login flow** of your identity store. Each step has a drop-down that decides whether the step is required.

📸 *Screenshot: the Authentication settings page with the flow steps.*

For every step the page shows its name, a short description and a drop-down with the requirement. The choices come from your identity store, for example **Required**, **Alternative** or **Disabled**.

Changes are saved the moment you pick a value: there is no **Update** button. A message confirms "Authentication settings updated". The change applies to the browser login flow of your company.

> [!WARNING]
> Changing a requirement affects how every user of your company signs in with the browser flow.

## Related

- [Login settings](04-login-settings.md)
- [Identity Integration](index.md)
