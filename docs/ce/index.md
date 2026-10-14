# TrustSource CE

This is the documentation for ***TrustSource CE***, the Community Edition of TrustSource. TrustSource CE is a self-hosted, open source application for open source compliance: component and license compliance, vulnerability tracking, SBOMs and release approvals. It is licensed under the AGPL-3.0 and its source code is on GitHub at [TrustSource/ts-core-ce](https://github.com/TrustSource/ts-core-ce).

This manual describes TrustSource CE **1.0.0**. The version of your installation is shown at the bottom of the left sidebar.

> [!NOTE]
> Looking for the hosted SaaS platform? See the [TrustSource v3 documentation](../v3/index.md). For what CE includes and what is only available in the SaaS edition, see [CE and SaaS compared](13-ce-vs-saas.md).

## Where to start

| If you want to ... | Go to |
|---|---|
| install and run TrustSource CE | [Installation & Setup](01-installation-setup/index.md) |
| get a first installation running in a few minutes | [Docker Compose quickstart](01-installation-setup/02-docker-compose.md) |
| understand what TrustSource CE is and isn't | [What is TrustSource CE?](00-getting-started/01-what-is-trustsource.md) |
| understand how data is organised in the app | [Mental Model](00-getting-started/05-mental-model.md) |
| try the app with sample data | [Guide, tour and demo project](00-getting-started/08-guide-and-demo.md) |
| go from "I just logged in" to "I have an SBOM" | [Your first module: from scan to signed-off SBOM](recipes/01-first-module-to-sbom.md) |
| look up which role is allowed to do what | [Roles & Permissions](10-roles-permissions/index.md) |
| fix a problem | [Troubleshooting & FAQ](11-troubleshooting-faq/index.md) |
| find help on a specific menu item | Browse the chapters below. They mirror the app navigation. |

## How this manual is organised

There are three ways to navigate:

- **By task of the operator.** [Installation & Setup](01-installation-setup/index.md) is for whoever runs the installation: Docker Compose, settings, HTTPS, backups and upgrades. Users of the app can skip it.
- **By menu.** The chapters from [Inbound (Scans)](02-inbound/index.md) to [Administration](06-administration/index.md) mirror the left navigation of the app. If you know where a feature lives, look it up in the matching chapter.
- **By goal.** [How-To Recipes](recipes/index.md) walk you through end-to-end tasks, for example "from scan to SBOM" or "react to a 0-day". Use them when you know **what** you want to achieve but not yet **where** to click.

If you are new to the app, start with [Getting Started](00-getting-started/index.md). It gives you the vocabulary that the rest of the manual uses.

## Conventions used in this manual

- ***TrustSource CE*** in *bold-italic* refers to the application itself.
- Labels in **bold** are the exact labels the app shows, for example **Import Scans**.
- Code in `monospace`, for example `developer` or `TS_ENCRYPTION_KEY`, refers to a role key, an API parameter or a setting.
- Coloured boxes mark extra information: **Tip** for practical hints, **Note** for background information, **Warning** for things that can cost you data or time.
- Screenshots show TrustSource CE 1.0.0 in the default light theme. The dark theme works the same way.
