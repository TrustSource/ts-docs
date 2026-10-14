# Common Error Messages

A reference of error messages you may encounter and what they mean.

| Error | Likely cause | Fix |
|---|---|---|
| **Access Denied** page ("You can't get here! Please sign in or change account.") | Your role does not include this page. | Ask your account admin for the required role. See [Functions by Area](../10-roles-permissions/04-functions-by-area.md). |
| "Access Denied" message after an action | Your role does not include this action. | Ask your account admin for the required role. |
| "This feature is not enabled for your company" | The license feature for this function is not provisioned for your company. | Ask your ***TrustSource*** contact. See [License Features](../10-roles-permissions/07-license-features.md). |
| "Username/password combination not valid. Please try again" | Wrong username or password. | Check both, or use **I forgot my password** on the sign-in page. |
| "Corporate login is required. Try to login here" | Your company enforces corporate login, so password, GitHub and LinkedIn sign-ins are refused. | Follow the link, or use **or use Corporate login** with your company name. |
| "Invalid authentication code. Please try again." | The 2FA code is wrong or expired. | Enter the current code from your authenticator app. |
| "Your account has been suspended. Please contact support to restore access." | The account is suspended. | [Contact support](06-contact-support.md). |
| "This role needs a licence your company does not hold" | You tried to assign a licence-bound role, such as CVD Coordinator, without the licence. | Ask your ***TrustSource*** contact for the licence. |
| `403` from the REST API | The API key's scope does not allow the operation, or a license feature is missing. | Check the key's scope in [API Scopes](../10-roles-permissions/09-api-scopes.md). |
