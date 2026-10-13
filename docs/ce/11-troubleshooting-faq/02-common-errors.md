# Common Error Messages

A reference of error messages you may meet in ***TrustSource CE*** and what they mean. Messages are quoted as the app shows them.

## Sign-in and accounts

| Message | Likely cause | Fix |
|---|---|---|
| *Username/password combination not valid. Please try again* | Wrong email or password. The same message also appears when the email address is **not verified** yet, and after **too many attempts** in a short time. | Check the credentials. A user who signed up themselves must first open the link in the confirmation email. After many attempts, wait a minute. Use **I forgot my password** if needed. |
| *Invalid authentication code. Please try again.* | The two-factor code is wrong or expired. | Enter the current code from your authenticator app. Check that the clock of your phone is correct. |
| *Your account has been suspended. Please contact support to restore access.* | The user record carries a suspended (or suspicious) account status. TrustSource CE has no screen that sets this status; it can only come from a change in the database. | The operator removes the `accountStatus` field from the user in MongoDB. |
| *Setting up your workspace* does not finish | Your account has no company yet, and creating one is taking long. | Reload the page. If it stays, report it to your operator (see [Reporting a Problem](06-contact-support.md)). |
| *User is already in company* | The invited email address already has roles in this company. | Change the roles of the existing user in **User Management** instead. |
| *Email address is invalid* | The address in the invitation is not a valid email address. | Correct the address. |
| *Invalid token* | The invitation or password reset link was already used or is no longer valid. | Request a new email: **Resend invitation** in User Management, or **I forgot my password**. |

## Permissions

| Message | Likely cause | Fix |
|---|---|---|
| *Access Denied* | Your roles do not include this action in the current company. | Ask your account admin for the required role. See the [Roles Cheat Sheet](../00-getting-started/06-roles-cheatsheet.md). |
| *Not authorized* | Loading or removing the demo project needs the Compliance manager or Manager role. | Ask for one of these roles. |
| *No widgets are available for your role* | Not an error: none of your roles has a dashboard widget. | Use the menu, or ask for an additional role. |

## Integrations and publishing

| Message | Likely cause | Fix |
|---|---|---|
| *Invalid integration URL* | A Jira, Azure DevOps (TFS) or webhook URL is not a valid `http`/`https` URL, or points to a private, loopback or link-local address. | Use a publicly reachable address. See [Integration Troubleshooting](04-integration-troubleshooting.md#internal-addresses-are-refused). |
| *CSAF provider is not configured: TS_CSAF_PROVIDER_URL is not set; ... Set these environment variables on the server and restart it.* | Publishing a CSAF advisory needs all three `TS_CSAF_PROVIDER_*` settings. The message lists the missing ones. | The operator sets them; see [External Services](../01-installation-setup/04-external-services.md#csaf-provider). |
| *... TS_CSAF_PROVIDER_URL must start with http:// or https://* | The provider URL has no scheme. | Correct `TS_CSAF_PROVIDER_URL`. |
| *Invalid file content. Please upload a CSAF (.json) file.* | The imported file is not JSON. | Import a CSAF JSON document. |
| *You may not remove PUBLISHED documents* | Published CSAF advisories cannot be deleted. | Publish a new version instead. |

## Demo project

| Message | Meaning |
|---|---|
| *The company already has a demo project. You can find it under Projects.* | Each company has at most one demo project. Open it under **Projects**, or remove it first. |
| *Error, too many requests. Please slow down. You must wait ... seconds before trying again.* | An action was repeated too often in a short time - for example loading and removing the demo repeatedly. Wait and try again. |

## REST API

| Response | Likely cause | Fix |
|---|---|---|
| `401` `"API-key missing"` | The request has no API key. | Send the key in the `x-api-key` header. |
| `403` `"Invalid API-key"` | The key is unknown, was deleted, or the installation's `TS_ENCRYPTION_KEY` changed since it was created. | Check the key under **Administration → API keys**, or create a new one. |
| `413` `File exceeds the upload limit of ... bytes` | The uploaded file is larger than `TS_UPLOAD_MAX_MB` (default 50 MB). | Upload a smaller file, or ask the operator to raise the limit (and the reverse proxy's limit). |
| `413` from the reverse proxy, or `502`/`503` during an upload | The reverse proxy's request size limit is lower than the app's. | Raise the proxy's limit, e.g. `client_max_body_size` in nginx. |

See also [Error Handling](../09-rest-api/02-error-handling.md) in the REST API chapter.

## Server start

Messages the operator finds in `docker compose up` or the app log are listed in [Installation Troubleshooting](05-installation-troubleshooting.md).
