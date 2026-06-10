# A 5-Minute Tour

This page takes you through the six main navigation groups in ***TrustSource***. By the end you will know where to find every major feature.

> [!NOTE]
> What you see in your sidebar depends on your **role** and **license features**. This tour shows the full menu as an `account_admin` on an Enterprise account. Your view may be smaller — that is by design.

## 1. Overview (Dashboard)

The dashboard is your landing page after login. It shows:

- **Activity log** — recent actions across your company.
- **Portfolio overview** — projects and modules with their traffic-light status (green / yellow / red).
- **Approval widgets** — pending and recent approvals.
- **Vulnerability charts** — open vulnerabilities by severity.
- **Pinned items** — your personal shortcuts.

📸 *Screenshot: the dashboard with portfolio overview and vulnerability charts.*

## 2. Inbound — bringing data in

Everything that feeds data into ***TrustSource*** lives here.

| Menu entry | What it does | Role required |
|---|---|---|
| **Check** | Ad-hoc license or component lookup — no scan needed. | developer + |
| **Import Scans** | Upload scan results manually (JSON, SPDX, CycloneDX). | developer + |
| **CI/CD Scan** | List of scans from your CI/CD pipelines. | developer + |
| **SW Quality Scans** | SARIF-based code quality results. | developer + (license: `sarif`) |
| **Repository Scans** | Connect a Git repository for deep analysis. | developer + |
| **Mass Scans** | Bulk-scan multiple repositories at once. | compliance_manager + (Enterprise only) |

📸 *Screenshot: the Inbound sub-menu expanded in the sidebar.*

## 3. Internal — managing your work

The largest group. This is where you manage the core objects.

| Menu entry | What it does | Role required |
|---|---|---|
| **Products** | CRA-classified products with contacts, photos, documents. | developer + (license: `products`) |
| **Projects** | Organisational containers for modules. | developer + |
| **Risks** | Risk register with portfolio views. | developer + (license: `risks`) |
| **Approvals** | Formal release approvals with eight review tabs. | compliance_manager + |
| **Releases** | Published releases linked to approved modules. | developer + |
| **Reports** | Hub for all analysis reports (SBOM, SOUP, Notice, CSAF). | compliance_manager + |
| **Threat Models** | STRIDE / LINDDUN threat models (BETA). | developer + (license: `threat`) |

📸 *Screenshot: the Internal sub-menu expanded.*

## 4. Outbound — compliance documents

Documents you generate or verify for external consumption.

| Menu entry | What it does | Role required |
|---|---|---|
| **SBOM + CBOM** | Generate and manage Software / Crypto Bills of Materials. | compliance_manager + |
| **Notice Files** | Attribution / notice file generation. | compliance_manager + |
| **SOUP Lists** | Software of Unknown Provenance lists (medical). | compliance_manager + (license: `medical`) |
| **CSAF** | CSAF security advisory documents. | compliance_manager + (license: `csaf`) |
| **Verify** | Validate an external SBOM, CSAF, CBOM or Notice file. | compliance_manager + |

📸 *Screenshot: the Outbound sub-menu expanded.*

## 5. Knowledge — reference data

Global databases and reference material shared across all projects.

| Menu entry | What it does |
|---|---|
| **Component Lake** | Global component library — search, inspect, see dependents. |
| **Infrastructure Elements** | Cloud/container runtime catalog (databases, base images, web servers). |
| **COTS** | Commercial off-the-shelf component catalog. |
| **Vulnerability Lake** | CVE/CWE/GHSA search with severity, affected versions, aliases. |
| **Algorithms** | Cryptographic algorithm database with FIPS status and deprecation info. |
| **Licenses** | License database with obligations, commercial terms, approval status. |
| **Open Source Policy** | View and manage your company's FOSS policy. |
| **Trainings** | Internal training links or external training portal. |

📸 *Screenshot: the Knowledge sub-menu expanded.*

## 6. Administration — company settings

Company-wide configuration. Most items require the `account_admin` role.

| Menu entry | What it does | Role required |
|---|---|---|
| **Account & Billing** | Subscription, usage, invoices. | account_admin |
| **Identity Integration** | Keycloak / SSO configuration. | account_admin (Enterprise/Medical) |
| **Settings** | Company info, integrations, policies, templates. | account_admin + |
| **User Management** | Invite users, assign roles, remove members. | account_admin |
| **API Keys** | Manage scanner API keys and their scopes. | account_admin |
| **Policies** | EOL, FOSS and crypto-algorithm policies. | account_admin |
| **Enterprise Companies** | Sub-company management (Enterprise/Medical only). | enterprise_admin |
| **Audit Logs** | Company-wide audit trail. | account_admin |

📸 *Screenshot: the Administration sub-menu expanded.*

## Special role menus

Two additional menu sections appear only for internal roles:

- **Component mngr.** (role: `component_manager`) — manage infrastructure and COTS catalogs, critical components.
- **Legal mngr.** (role: `legal_manager`) — manage legal documents, templates, copyright and trademarks.

## The right bar

The narrow icon strip on the right edge of the screen gives you quick access to:

| Icon | Action |
|---|---|
| 💬 AI Chat | Open the AI assistant panel (license: `chat`). |
| ❓ Help | Link to this online help. |
| 📄 API Docs | Open the built-in API documentation browser. |
| 🔔 Updates | System updates and notifications. |
| ✉️ Messages | Your inbox. |
| 👤 Contact Admin | Reach your account administrator. |
| 🚪 Logout | Sign out. |

📸 *Screenshot: the right bar with icons annotated.*

## Where to next

- [Mental Model](05-mental-model.md) — understand the data hierarchy before you start using the app.
- [Inbound chapter](../02-inbound/index.md) — start scanning your first project.
- [Roles & Licenses Cheat Sheet](06-roles-licenses-cheatsheet.md) — see all roles and features at a glance.
