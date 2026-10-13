# Integration Troubleshooting

Problems with the integrations of ***TrustSource CE***: issue trackers (Jira, Azure DevOps / TFS, GitHub issues), webhooks and channels, email and the CSAF provider.

## Quick reference

| Problem | Likely cause | Fix |
|---|---|---|
| *Invalid integration URL* when saving | The URL is invalid or points to an internal address. | See [Internal addresses are refused](#internal-addresses-are-refused). |
| Issues are not created | Credentials wrong or expired, integration not active for the project, or the target is not reachable. | Re-enter the token or password and check the project's **Issue Integration** settings. |
| Integrations stopped working after a server change | `TS_ENCRYPTION_KEY` differs from the one the credentials were stored with. | See [Stored credentials can no longer be read](#stored-credentials-can-no-longer-be-read). |
| Webhook messages do not arrive | Target URL refused or not reachable, or no matching trigger. | See [Webhooks and channels](#webhooks-and-channels). |
| No invitation or password reset emails | Email goes to Mailpit, or SMTP settings are wrong. | See [Email](#email). |
| CSAF publishing fails | CSAF provider settings missing. | See [CSAF provider](#csaf-provider). |

## Internal addresses are refused

To protect the server, TrustSource CE refuses Jira, Azure DevOps (TFS), webhook and company logo URLs that point to:

- private networks (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `100.64.0.0/10`),
- loopback (`127.0.0.0/8`, `::1`), link-local (`169.254.0.0/16`, `fe80::/10`) or unique local IPv6 addresses (`fc00::/7`),
- any URL that is not `http` or `https`.

The check runs when you save the URL (*Invalid integration URL*) and again for every request, after resolving the host name. A host name that resolves to an internal address is refused too, and so are redirects to such an address.

As a result, a Jira or Azure DevOps server, or a webhook receiver, that is only reachable inside your internal network cannot be used. There is no setting to allow internal addresses. Use an address that resolves to a public IP, for example through a gateway that publishes the service.

## Stored credentials can no longer be read

Tokens and passwords of integrations are stored encrypted with `TS_ENCRYPTION_KEY`. If the installation now runs with a different key - for example after a restore with a new `.env` - they cannot be decrypted, and the app logs `Exception in decryption`.

Fix: run the installation with the original `TS_ENCRYPTION_KEY`. If it is lost, enter every integration credential again (company integrations under **Administration → Integrations**, and project issue integrations in the project settings), and create new API keys.

## Issue trackers

- Credentials are set company-wide under **Administration → Integrations** (Account admin), and per project in the project's **Issue Integration** settings. In the project settings, the integration must be active and the target project configured.
- Saving an integration with an empty password or token keeps the stored one. To replace a credential, enter the new value.
- Check that the user or token has the right to create issues in the target project.

See [Issue Trackers](../06-administration/08a-issue-trackers.md) and [Issue tracker project settings](../03-internal/01-projects/settings/10-issue-tracker.md).

## Webhooks and channels

- Webhooks fire only for the triggers selected on them (Analysis, Release, Vulnerability, Approval, Task and the other triggers). Check the triggers.
- Each delivery attempt gives the target 60 seconds to answer.
- Vulnerability triggers are also evaluated by a periodic check: the first pass runs 5 minutes after the server starts, then every 60 minutes by default. New vulnerabilities therefore arrive with a delay. The operator can change the interval with `TS_VULN_ALERT_INTERVAL_MIN` or switch the check off with `TS_VULN_ALERT_SWEEP=false`.
- **Microsoft Teams O365** connectors are deprecated; use **Microsoft Teams Workflow** instead.

See [Webhooks and Channels](../06-administration/08c-webhooks-channels.md).

## Email

- In the reference installation, `MAIL_URL` points to Mailpit, which catches all email. Open <http://localhost:8025> on the host to see it. Mailpit is for testing only; see [Docker Compose Setup](../01-installation-setup/02-docker-compose.md#mailpit).
- For real delivery, set `MAIL_URL` (for example `smtp://user:password@smtp.example.com:587`) and `MAIL_SENDER`. URL-encode special characters in the user name and password.
- If the app logs `=> MAIL_URL variable is missing`, no SMTP server is configured.
- Links in emails are built from `ROOT_URL`. If they point to `localhost`, set `ROOT_URL` to the public address.

See [External Services](../01-installation-setup/04-external-services.md#mail-smtp).

## CSAF provider

Publishing a CSAF advisory fails with *CSAF provider is not configured: ...* until `TS_CSAF_PROVIDER_URL`, `TS_CSAF_PROVIDER_PASSPHRASE` and `TS_CSAF_PROVIDER_PASSWORD` are all set and the server has been restarted. The message names the missing settings. See [External Services](../01-installation-setup/04-external-services.md#csaf-provider).

## SCANOSS

The SCANOSS token under **Administration → Integrations** is stored, but no scan in TrustSource CE uses it.

## Related

- [Integrations](../06-administration/08-integrations.md)
- [External Services](../01-installation-setup/04-external-services.md)
- [Common Errors](02-common-errors.md)
