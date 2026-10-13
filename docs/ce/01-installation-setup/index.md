# Installation & Setup

> [!NOTE]
> **Audience:** whoever installs and operates ***TrustSource CE***. Users of an existing installation can skip this chapter and continue with [Getting Started](../00-getting-started/index.md).

TrustSource CE ships with a reference setup for **Docker Compose**: the app, MongoDB, the license check service and a local mail catcher. This chapter takes you from an empty host to a running installation behind HTTPS, and covers backups, monitoring and upgrades.

| Page | What it covers |
|---|---|
| [Prerequisites](01-prerequisites.md) | Host, Docker, CPU architecture, memory, network access. |
| [Docker Compose Setup](02-docker-compose.md) | Quickstart, the four services, volumes, day-to-day commands. |
| [Settings Reference](03-environment-variables.md) | Every setting, including those you set through a compose override file. |
| [External Services](04-external-services.md) | OSV, EPSS, license check, mail, CSAF provider, the version check, and how to switch them off. |
| [HTTPS and Reverse Proxy](05-https-reverse-proxy.md) | Serving users over HTTPS: `ROOT_URL`, WebSockets, `X-Forwarded-Proto`, nginx and Caddy examples. |
| [First Admin User](06-first-admin-user.md) | How the first administrator and company are created, and what to do next. |
| [Backups & Monitoring](07-backups-monitoring.md) | Database and file backups, restore, health check, logs. |
| [Upgrade Guide](08-upgrade.md) | Updating to a new version, and the encryption key. |

> [!TIP]
> For a first look on your own machine, the [quickstart](02-docker-compose.md#quickstart) is enough. Before other people use the installation, also work through [HTTPS and Reverse Proxy](05-https-reverse-proxy.md), [First Admin User](06-first-admin-user.md) and [Backups](07-backups-monitoring.md).

If something goes wrong during installation, see [Installation Troubleshooting](../11-troubleshooting-faq/05-installation-troubleshooting.md).
