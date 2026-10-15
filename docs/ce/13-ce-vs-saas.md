# TrustSource CE and the TrustSource SaaS

***TrustSource CE*** (Community Edition) is the self-hosted, open source edition of TrustSource. The TrustSource SaaS is the hosted service operated by EACG. Both share the same core: most screens, labels and workflows are the same. This page lists what differs.

For the SaaS documentation see [TrustSource (SaaS)](../v3/index.md).

## What TrustSource CE includes

- **All core features**: inbound scans and imports (CycloneDX, SPDX, SARIF), projects and modules with their settings, products with CRA classification, risks, approvals and releases, reports, SBOM, CBOM and AIBOM, notice files, CSAF advisories and VEX, verification of signed documents, the knowledge areas (Component Lake, Infrastructure Elements, 3rd party (COTS), Vulnerability Lake, Licenses, Open source policy), integrations (Jira, Azure DevOps/TFS, GitHub issues, LeanIX, webhooks and channels) and the REST API v2.
- **Role-based access** with the seven roles Developer, Compliance manager, Portfolio manager, Manager, Account admin, Company component manager and Company security manager. See [Roles overview](10-roles-permissions/01-roles-overview.md).
- **No plans, quotas or license flags.** Every feature is available on every installation. What a user can do depends only on their roles.

## Only in the SaaS

| Feature | What it is |
|---|---|
| Account types, plans and billing | Subscriptions, quotas and the **Account & Billing** area |
| License features | Per-account switches that enable feature areas |
| Enterprise Companies | Several companies managed under one enterprise account |
| SSO and Identity Integration | Single sign-on through Keycloak, and login with GitHub or LinkedIn |
| OSCAR | AI chat assistant for compliance questions |
| Threat Model Agent and Threat Models | Generation and management of threat models (risks keep their threat-model fields in CE) |
| CVD cases | Coordinated vulnerability disclosure case handling (ts-psirt) |
| SOUP lists and MDR/IVDR classification | Medical device documentation |
| DeepScan, Repository Scans and Mass Scans | File-level scanning of repositories by the TrustSource cloud |
| OpenSSF Scorecard | Scorecard ratings of open source projects |
| Trainings | Training content inside the app |
| Zendesk support | Support tickets from the app |
| SPDX tag-value and spreadsheet import | Further SBOM import formats |
| License legal assessment | Curated obligations and classification per license, maintained by TrustSource |
| OBOM | Operations bill of materials |
| Risk decisions and history | **Decision** and **History** tabs of a risk (CE records decisions in the risk's own fields) |
| Configurable risk assessment schemes | Company-, project- and module-specific scales and thresholds (CE uses one fixed scheme) |
| Viability and Vulnerability activity reports | Report tiles in **Internal → Reports** (CE offers viability data via `GET /core/reports/viability`) |
| API usage statistics | Usage figures for API keys under **Administration → API keys** |

## What works differently

| Area | TrustSource CE |
|---|---|
| Operation | Self-hosted with Docker Compose. You run, update and back up the installation. See [Installation & Setup](01-installation-setup/index.md). |
| License | AGPL-3.0. The source code is on GitHub and linked from the sidebar footer. |
| Login | Email and password, with optional two-factor authentication (TOTP). Users are invited by an account admin; self sign-up is off unless you enable it. See [First login](00-getting-started/03-first-login.md). |
| Vulnerability data | Queried from OSV for the components your installation analyses; EPSS scores from FIRST. The Vulnerability Lake holds only what OSV reported for those components. Vulnerabilities are not looked up for infrastructure and COTS catalog components. Both lookups can be switched off. |
| End-of-life and viability data | CE has no data source for end-of-life dates or repository activity, so the end-of-life and viability checks mostly report no data or OK. |
| Legal evaluation | Done by the bundled ts-legalcheck service. Without it, licenses stay unevaluated. |
| License catalog | Holds license metadata and text, seeded with common licenses. Obligations and classification are not curated per license; the legal evaluation comes from ts-legalcheck. |
| Support | Help and support links lead to the project's GitHub page. |
| Language | The UI is English only. |

See [External services](01-installation-setup/04-external-services.md) for every outbound connection an installation makes.

## Related

- [What is TrustSource CE?](00-getting-started/01-what-is-trustsource.md)
- [REST API: API structure](09-rest-api/06-api-structure.md) - API groups not in CE
