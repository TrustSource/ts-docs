# Account Types & Editions

***TrustSource*** is available in several editions that differ in capacity, features and price point. This page helps you understand which edition you are on, what it includes, and what you gain by upgrading.

## The five account types

| Edition | Projects | Modules | Components | Users | Typical use case |
|---|---|---|---|---|---|
| **Free** | 1 | 5 | 500 | 1 | Personal evaluation, single-project hobby use. |
| **Professional** | 3 | 20 | 2,000 | 10 | Small team or startup managing a handful of products. |
| **Corporate** | 20 | 200 | unlimited | 50 | Mid-size engineering org with SPDX export, full reporting, Jira and LeanIX integration. |
| **Enterprise** | unlimited | unlimited | unlimited | unlimited | Large organisation with multi-company hierarchy, cascading auth, private license/algorithm catalogs. |
| **Medical** | unlimited | unlimited | unlimited | unlimited | Same capacity as Enterprise, plus healthcare-specific compliance support (SOUP reports, MDR/IVDR classification). |

> [!NOTE]
> **Community Edition (v3.0)** is a free, self-hosted, open-source edition that is documented separately. See the [v3.0 landing page](../../v3.0/index.md).

📸 *Screenshot: the Account & Billing page showing the current account type and usage meters.*

## Where to see your account type

Your current edition is shown in two places:

1. **Sidebar** — the account type badge appears in the user info section at the top of the left navigation.
2. **Settings → Account & Billing** — a detail view with usage statistics (projects, modules, components, users) and the current plan name.

Only users with the `account_admin` or `enterprise_admin` role can view or change the account type.

## License features

On top of account-type limits, individual capabilities are controlled by **license features** — flags that your account administrator can enable. A feature that is not licensed is hidden from the menu and API.

| Feature flag | What it unlocks | Minimum edition |
|---|---|---|
| `sarif` | SW Quality Scans (SARIF upload) | Professional |
| `products` | Products module (CRA classification, contacts, photos) | Corporate |
| `risks` | Risk assessment and portfolio views | Corporate |
| `threat` | Threat modelling (STRIDE / LINDDUN) | Corporate |
| `csaf` | CSAF security advisory documents | Corporate |
| `chat` | AI Chat Assistant (Bedrock-backed) | Enterprise |
| `medical` | SOUP reports, MDR/IVDR module classification | Medical |
| `soup_report` | SOUP file generation (used with `medical`) | Medical |
| `deep_scan` | Repository deep-scan analysis | Professional |

> [!TIP]
> If a menu entry you expect is missing, check with your account admin whether the corresponding license feature is enabled. The feature list is managed under **Settings → Account & Billing**.

## Upgrading

Contact your account administrator or reach out to [support@trustsource.io](mailto:support@trustsource.io) to discuss an upgrade. Downgrades that would exceed the target plan's limits (e.g. more projects than allowed) are blocked until you reduce usage.

## Related

- [Roles & Licenses Cheat Sheet](06-roles-licenses-cheatsheet.md) — which role can do what, and which license feature unlocks which capability
- [Administration → Account & Billing](../06-administration/02-account-billing.md) — managing your subscription
- [Roles & Permissions → License Features](../10-roles-permissions/07-license-features.md) — detailed feature-flag reference
