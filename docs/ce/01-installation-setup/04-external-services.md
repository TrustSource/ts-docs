# External Services

***TrustSource CE*** runs on your own infrastructure, but a few features talk to services outside the app container. This page lists every one of them, what it is used for, and how to switch it off - for example for an air-gapped installation.

TrustSource CE uses no other TrustSource cloud service.

## Overview

| Service | Used for | Switch off |
|---|---|---|
| [OSV](#osv-vulnerability-lookups) (`api.osv.dev`) | Vulnerabilities of components during analysis; fills the Vulnerability Lake | `TS_OSV_ENABLED=false` |
| [FIRST EPSS](#epss-exploit-scores) (`api.first.org`) | Exploit prediction scores in the vulnerability report | `TS_EPSS_ENABLED=false` |
| [License check service](#license-check-service) (`ts_legalcheck` container) | License compatibility and obligations during analysis | Possible, but licenses then stay unevaluated |
| [Version check](#version-check-and-installation-id) (`raw.githubusercontent.com`) | Checking for a newer version at start | Not configurable |
| [SMTP server](#mail-smtp) | Invitations, password resets, notifications | Mailpit catches email by default |
| [CSAF provider](#csaf-provider) | Publishing CSAF advisories | Leave the `TS_CSAF_PROVIDER_*` settings unset |
| [Integrations](#integrations-configured-by-users) | Jira, Azure DevOps (TFS), GitHub, LeanIX, webhook targets, company logo | Configured by users; nothing is called until they are set up |

## OSV (vulnerability lookups)

On every module analysis, TrustSource CE asks [OSV](https://osv.dev) (`https://api.osv.dev/v1/`) which known vulnerabilities affect each component, and caches the answers. The cached data is also what the **Vulnerability Lake** shows.

With `TS_OSV_ENABLED=false`, analysis uses only cached data and manually entered vulnerabilities. New vulnerabilities are then no longer found.

## EPSS (exploit scores)

When a vulnerability report is generated, TrustSource CE reads EPSS (Exploit Prediction Scoring System) scores from FIRST (`https://api.first.org/data/v1/epss`) for the CVSS-vs-EPSS chart.

With `TS_EPSS_ENABLED=false`, no request is made and every finding is plotted at the report's lowest EPSS value (below 0.1%).

## License check service

The `ts_legalcheck` container (`trustsource/ts-legalcheck:1.1.2`) evaluates license compatibility and obligations for each analysed module. The compose file connects the app to it through `TS_CHECK_SERVER=http://ts_legalcheck:5000/`. It is only reachable inside the compose network.

If the service is not configured, not running or does not answer within two minutes, the analysis still completes, but licenses are **not evaluated** and show as warnings. The app logs one of:

```
=> CheckModule: TS_CHECK_SERVER is not set
=> CheckModule failed: status <status>, code <code>, <message>
```

The image is published for amd64 only and runs emulated on ARM hosts; see [Prerequisites](01-prerequisites.md#cpu-architecture).

## Version check and installation id

At every start, the app logs its version (`=> Version: 1.0`) and checks for a newer one by requesting the TrustSource CE README from GitHub (`raw.githubusercontent.com`). The request carries this installation's **installation id** as a query parameter.

- The installation id is a random UUID, generated once and stored in the database when the release notes are first inserted. It stays the same for the lifetime of the database.
- The check runs in the background with a 10-second timeout and does not delay the start. The app logs `=> Version check: <status>`, or `=> Version check was unsuccessful` when GitHub cannot be reached. A failed check has no other effect.
- The check **cannot be switched off by a setting**. If the host has no internet access, the check fails harmlessly. To block it, deny outbound access to `raw.githubusercontent.com` in your firewall or proxy.

## Mail (SMTP)

The app sends email for invitations, email verification, password resets and notifications. By default, `MAIL_URL` points to the bundled **Mailpit** container, which catches every email instead of delivering it. Read them at <http://localhost:8025> on the host. Mailpit is for testing only: its UI has no authentication and shows every reset and enrolment link. Remove it once real email works; see [Docker Compose Setup](02-docker-compose.md#mailpit).

For real email, set in `.env`:

```
MAIL_URL=smtp://user:password@smtp.example.com:587
MAIL_SENDER=noreply@example.com
```

Special characters in the user name or password must be URL-encoded. `MAIL_SENDER` must be an address your SMTP server accepts as sender. Optionally add `TS_OPERATOR_NAME`, `TS_SUPPORT_EMAIL` and `TS_IMPRINT_URL` for the email footer.

If no `MAIL_URL` reaches the app, it logs `=> MAIL_URL variable is missing`.

## CSAF provider

To publish CSAF advisories from **Outbound → CSAF**, the installation needs a CSAF provider. One installation publishes to one provider. Set all three settings:

```
TS_CSAF_PROVIDER_URL=https://csaf.example.com/
TS_CSAF_PROVIDER_PASSPHRASE=...
TS_CSAF_PROVIDER_PASSWORD=...
```

Until all three are set, publishing fails with a message naming the missing settings. Everything else in CSAF works without a provider.

## Integrations configured by users

Account admins and managers can connect TrustSource CE to further services. Nothing is called until a user configures it.

| Integration | Where it is configured |
|---|---|
| Jira, Azure DevOps (TFS), GitHub issues | **Administration → Integrations** and project settings |
| LeanIX | **Administration → Integrations** |
| Webhooks, Microsoft Teams, Slack | **Administration → Integrations** and project settings |
| SCANOSS | **Administration → Integrations** (the token is stored, but no scan uses it) |
| Company logo URL | **Administration → Settings**, company details. The server downloads the image. |

For security, the app refuses Jira, Azure DevOps (TFS), webhook and logo URLs that point to private, loopback or link-local addresses, also when a host name resolves to such an address. Services in your internal network therefore cannot be used as targets for these integrations. See [Integration Troubleshooting](../11-troubleshooting-faq/04-integration-troubleshooting.md).

## Air-gapped installations

For a host without internet access:

1. Build the image where internet access is available, or provide the build downloads through a mirror (see [Prerequisites](01-prerequisites.md#network)).
2. Set `TS_OSV_ENABLED=false` and `TS_EPSS_ENABLED=false`.
3. Point `MAIL_URL` to an internal SMTP server.

The license check service runs inside the compose network. The version check fails harmlessly.

## Related

- [Settings Reference](03-environment-variables.md)
- [Scan Troubleshooting](../11-troubleshooting-faq/03-scan-troubleshooting.md)
- [Integrations](../06-administration/08-integrations.md)
