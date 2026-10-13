# Troubleshooting & FAQ

When something does not work as expected in ***TrustSource CE***, start here. This chapter collects frequently asked questions, the error messages the app shows, and solution guides for specific areas.

| Page | What it covers |
|---|---|
| [FAQ](01-faq.md) | Frequently asked questions about using and running TrustSource CE. |
| [Common Errors](02-common-errors.md) | Error messages in the app and the REST API, and what they mean. |
| [Scan Troubleshooting](03-scan-troubleshooting.md) | Imports, analyses, missing licenses or vulnerabilities. |
| [Integration Troubleshooting](04-integration-troubleshooting.md) | Jira, Azure DevOps (TFS), GitHub, webhooks, email, CSAF provider. |
| [Installation Troubleshooting](05-installation-troubleshooting.md) | Docker Compose, start-up, HTTPS and reverse proxy problems. |
| [Reporting a Problem](06-contact-support.md) | Where to report a problem and what to include. |

> [!TIP]
> Many problems are explained by a line in the app log. If you operate the installation, look at `docker compose logs ts_core` first; see [Backups & Monitoring](../01-installation-setup/07-backups-monitoring.md#logs) for the lines worth knowing.
