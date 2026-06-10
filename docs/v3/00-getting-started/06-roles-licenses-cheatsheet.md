# Roles & Licenses Cheat Sheet

A one-page reference for the roles, license features and account types in ***TrustSource***. Pin this page if you are an admin setting up a new team.

## The 8 public roles

| Role | Shorthand | What this person does |
|---|---|---|
| **Developer** | `developer` | Works on modules — runs scans, reviews components, adjusts whitelists and legal settings on assigned modules. |
| **Compliance Manager** | `compliance_manager` | Owns the approval workflow — reviews modules, approves or rejects releases, manages compliance documents. |
| **Portfolio Manager** | `portfolio_manager` | Manages the project portfolio — assigns project and compliance managers, oversees module tags and security capabilities. |
| **Manager** | `manager` | Account-level project management — creates projects, assigns managers and users, manages issue-tracker integrations. |
| **Account Admin** | `account_admin` | Company administrator — manages users, API keys, integrations, billing, policies and company settings. |
| **Enterprise Admin** | `enterprise_admin` | Multi-company administrator — manages sub-companies, quotas and feature toggles across the enterprise hierarchy. |
| **Company Component Manager** | `company_component_manager` | Manages the company-wide component catalogs (infrastructure, COTS, critical components). |
| **Company Security Manager** | `company_security_manager` | Manages security configurations — CIA settings, capabilities, crypto-algorithm policies, vulnerability activity. |

> [!NOTE]
> Two additional **internal roles** exist (`component_manager`, `legal_manager`) that are not assignable through the standard UI. They unlock dedicated menu sections for component library and legal document management. See [Internal Roles](../10-roles-permissions/02-internal-roles.md).

## Role assignment rules

- Roles are **scoped per company** — a user can be a `developer` in Company A and an `account_admin` in Company B.
- Only `account_admin` and `manager` roles can assign roles to other users.
- When you create a new company (self-registration), you receive all default roles automatically.
- Roles use **OR-aggregation** — if any of your roles grants access, you have access.

## License features at a glance

| Feature | Menu / capability it unlocks | Required role to use it |
|---|---|---|
| `sarif` | SW Quality Scans (SARIF upload and results) | developer + |
| `products` | Products module (CRA classification, contacts, documents) | developer + |
| `risks` | Risk assessment, risk tasks, portfolio views | developer + |
| `threat` | Threat modelling (STRIDE / LINDDUN), BETA | developer + |
| `csaf` | CSAF security advisory documents | compliance_manager + |
| `chat` | AI Chat Assistant (full-page and panel) | any role |
| `medical` | SOUP reports, MDR/IVDR module classification | compliance_manager + |
| `soup_report` | SOUP file generation (requires `medical`) | compliance_manager + |
| `deep_scan` | Repository deep-scan analysis | developer + |

> [!TIP]
> License features are managed by your account admin under **Settings → Account & Billing**. If a feature is missing from your menu, it is either not licensed or your role does not include it.

## Account types vs. features

| Capability | Free | Professional | Corporate | Enterprise | Medical |
|---|---|---|---|---|---|
| Projects | 1 | 3 | 20 | unlimited | unlimited |
| Modules | 5 | 20 | 200 | unlimited | unlimited |
| Components | 500 | 2,000 | unlimited | unlimited | unlimited |
| Users | 1 | 10 | 50 | unlimited | unlimited |
| SPDX export | — | — | ✓ | ✓ | ✓ |
| Full reporting | — | — | ✓ | ✓ | ✓ |
| Jira / LeanIX | — | — | ✓ | ✓ | ✓ |
| Multi-company hierarchy | — | — | — | ✓ | ✓ |
| Cascading auth (Keycloak) | — | — | — | ✓ | ✓ |
| Private licenses / algorithms | — | — | — | ✓ | ✓ |
| SOUP / MDR/IVDR | — | — | — | — | ✓ |

## Quick reference: who can do what

| Action | developer | compliance_mgr | portfolio_mgr | manager | account_admin |
|---|---|---|---|---|---|
| Run scans | ✓ | ✓ | — | ✓ | — |
| Review components | ✓ | ✓ | — | ✓ | — |
| Create approvals | — | ✓ | — | — | — |
| Approve / reject | — | ✓ | — | — | — |
| Create projects | — | — | — | ✓ | ✓ |
| Assign managers | — | — | ✓ | ✓ | — |
| Manage users | — | — | — | — | ✓ |
| Manage API keys | — | — | — | — | ✓ |
| Manage policies | — | ✓ | — | — | ✓ |
| View audit logs | — | — | — | — | ✓ |

> [!NOTE]
> This is a simplified view. For the full permission matrix see [Functions by Area](../10-roles-permissions/04-functions-by-area.md) and [Functions by Role](../10-roles-permissions/05-functions-by-role.md).

## Related

- [Account Types & Editions](02-account-types.md) — detailed edition comparison with pricing context
- [The 8 Public Roles](../10-roles-permissions/01-roles-overview.md) — detailed role descriptions
- [Permission Model](../10-roles-permissions/03-permission-model.md) — how OR-aggregation and owner-vacuum work
- [License Features](../10-roles-permissions/07-license-features.md) — detailed feature-flag reference
