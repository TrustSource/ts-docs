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
> **Community Edition (CE)** is a free, self-hosted, open-source edition that is documented separately. See the [CE landing page](../../ce/index.md).

📸 *Screenshot: the Account & Billing page with the Account type selector (Free, Professional, Corporate, Enterprise, Medical) and the See pricing plan details button.*

## Where to see your account type

Your current account type appears in brackets after your company name at the top of the left navigation, for example "Acme GmbH (corporate)". While a trial runs, a **TRIAL** marker appears below it; hover it to see the expiry date. You can change the account type under **Administration → Account & Billing**; see [Account & Billing](../06-administration/01-account-billing.md).

Only users with the `account_admin` or `enterprise_admin` role can open that page.

## License features

On top of account-type limits, individual capabilities are controlled by **license features**: flags that ***TrustSource*** provisions for your company. A feature that is not licensed is hidden from the menu, and the server refuses the matching calls.

| Feature flag | What it unlocks |
|---|---|
| `sarif` | SW Quality Scans (SARIF upload) |
| `products` | Products (CRA classification, contacts, photos) |
| `risks` | Risk assessment and portfolio views |
| `threat` | Threat modelling (AI-generated, STRIDE) |
| `csaf` | CSAF security advisory documents |
| `chat` | AI Chat Assistant |
| `psirt` | CVD cases (BETA) |
| `obom` | OBOM upload, Deployments tile and OBOM tab |
| `cvdself` | Makes the role `cvd_coordinator` assignable |
| `medical` | SOUP Lists and the SOUP and COTS reports |

The MDR/IVDR classification tabs depend on the **Medical** account type, not on a flag. The Medical plan also includes the plan feature `soup_report`, which shows the SOUP Lists as well.

> [!TIP]
> If a menu entry you expect is missing, check whether your role includes it and whether the license feature is enabled. License features cannot be changed in the app: ask your ***TrustSource*** contact. See [License Features](../10-roles-permissions/07-license-features.md).

## Upgrading

Account admins and enterprise admins change the plan under **Administration → Account & Billing**. A paid plan needs billing information first. A request for Enterprise or Medical is forwarded to the sales team, who contact you; you can also reach out to [support@trustsource.io](mailto:support@trustsource.io). A downgrade takes effect with the next billing period.

## Related

- [Roles & Licenses Cheat Sheet](06-roles-licenses-cheatsheet.md): which role can do what, and which license feature unlocks which capability
- [Administration → Account & Billing](../06-administration/01-account-billing.md): managing your subscription
- [Roles & Permissions → License Features](../10-roles-permissions/07-license-features.md): detailed feature-flag reference
