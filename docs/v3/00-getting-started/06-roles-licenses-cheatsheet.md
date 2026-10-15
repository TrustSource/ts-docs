# Roles & Licenses Cheat Sheet

A one-page reference for the roles, license features and account types in ***TrustSource***. Pin this page if you are an admin setting up a new team.

## The 8 public roles

| Role | Shorthand | What this person does |
|---|---|---|
| **Developer** | `developer` | Works on modules: runs scans, reviews components, edits module settings such as allow/deny lists, thresholds and CIA. |
| **Compliance Manager** | `compliance_manager` | Owns the approval workflow: reviews modules, approves or rejects releases, manages compliance documents. |
| **Portfolio Manager** | `portfolio_manager` | Manages the project portfolio: sees all projects, assigns project and compliance managers, maintains module tags and capabilities. |
| **Manager** | `manager` | Leads projects: creates projects, starts approvals, assigns managers and members, manages issue-tracker settings of the projects they own. |
| **Account Admin** | `account_admin` | Company administrator: manages users, API keys, integrations, billing, policies and company settings. |
| **Enterprise Admin** | `enterprise_admin` | Multi-company administrator: account and integrations, and the list of member companies of the enterprise group with their account type and API usage. |
| **Company Component Manager** | `company_component_manager` | Maintains company-wide component allow/deny lists and manual vulnerabilities; opens the critical components report. |
| **Company Security Manager** | `company_security_manager` | Manages security configurations: CIA settings, capabilities, crypto-algorithm policies, vulnerability activity. |

> [!NOTE]
> Two additional **internal roles** exist (`component_manager`, `legal_manager`) that are not assignable through the standard UI. They unlock dedicated menu sections for component library and legal document management. A licence-bound role, `cvd_coordinator` (licence `cvdself`), is assignable only when the company holds the licence and has no permissions inside the app. See [Internal Roles](../10-roles-permissions/02-internal-roles.md).

## Role assignment rules

- Roles are **scoped per company**: a user can be a `developer` in Company A and an `account_admin` in Company B.
- Account admins assign roles in **Administration → User Management**.
- When you create a new company (self-registration), you receive all public roles except Enterprise admin.
- Roles use **OR-aggregation**: if any of your roles grants access, you have access.

## License features at a glance

| Feature | Menu / capability it unlocks | Menu shown to |
|---|---|---|
| `sarif` | SW Quality Scans (SARIF upload and results) | developer, compliance_manager, manager, account_admin |
| `products` | Products (CRA classification, contacts, documents) | developer, compliance_manager, manager |
| `risks` | Risk assessment, risk tasks, portfolio views | developer, compliance_manager, manager |
| `threat` | Threat modelling (AI-generated, STRIDE), BETA | developer, compliance_manager, manager |
| `csaf` | CSAF security advisory documents | compliance_manager, manager, account_admin |
| `psirt` | CVD Cases (Coordinated Vulnerability Disclosure), BETA | compliance_manager, manager, account_admin (company_security_manager by direct link) |
| `chat` | AI Chat Assistant (full-page and panel) | any role |
| `obom` | OBOM upload, Deployments tile, OBOM tab | users with project access |
| `cvdself` | Makes the role `cvd_coordinator` assignable | n/a (marker role) |
| `medical` | SOUP Lists and the SOUP and COTS reports | compliance_manager, manager, account_admin |

Account type and plan features are not license flags:

| Feature | Depends on |
|---|---|
| MDR/IVDR classification | Account type `medical` |
| SOUP reports | License flag `medical` or plan feature `soup_report` |

> [!TIP]
> License features are provisioned for your company and cannot be changed in the app. If a feature is missing from your menu, it is either not licensed or your role does not include it.

## Account types vs. features

| Capability | Free | Professional | Corporate | Enterprise | Medical |
|---|---|---|---|---|---|
| Projects | 1 | 10 | 40 | unlimited | unlimited |
| Modules | 5 | 200 | 400 | unlimited | unlimited |
| Components | 500 | 2,000 | unlimited | unlimited | unlimited |
| Users | 1 | 10 | 100 | unlimited | unlimited |
| SPDX export | - | - | ✓ | ✓ | ✓ |
| Full reporting | - | ✓ | ✓ | ✓ | ✓ |
| Jira / LeanIX | - | - | ✓ | ✓ | ✓ |
| Multi-company hierarchy | - | - | - | ✓ | ✓ |
| Cascading auth (Keycloak) | - | - | - | ✓ | ✓ |
| Private licenses / algorithms | - | - | - | ✓ | ✓ |
| SOUP / MDR/IVDR | - | - | - | - | ✓ |

## Quick reference: who can do what

| Action | developer | compliance_mgr | portfolio_mgr | manager | account_admin |
|---|---|---|---|---|---|
| Run scans | ✓ | ✓ | - | ✓ | - |
| Review components | ✓ | ✓ | - | ✓ | - |
| Start approvals | - | ✓ | - | ✓ | - |
| Approve / reject | - | ✓ | - | - | - |
| Create projects | - | ✓ | - | ✓ | - |
| Assign default managers | - | ✓ (own projects) | ✓ | ✓ (own projects) | - |
| Manage users | - | - | - | - | ✓ |
| Manage API keys | - | - | - | - | ✓ |
| Manage policies | - | ✓ | - | - | ✓ |
| View audit logs | - | - | - | - | ✓ |

"Own projects" means projects where you are the default manager, or that have none. Account admins see the Inbound menu, but not the Internal menu with projects and modules. Scans from CI/CD use an API key whose scope decides what it may do; see [API Scopes](../10-roles-permissions/09-api-scopes.md).

> [!NOTE]
> This is a simplified view. For the full permission matrix see [Functions by Area](../10-roles-permissions/04-functions-by-area.md) and [Functions by Role](../10-roles-permissions/05-functions-by-role.md).

## Related

- [Account Types & Editions](02-account-types.md): detailed edition comparison with pricing context
- [The 8 Public Roles](../10-roles-permissions/01-roles-overview.md): detailed role descriptions
- [Permission Model](../10-roles-permissions/03-permission-model.md): how OR-aggregation and owner-vacuum work
- [License Features](../10-roles-permissions/07-license-features.md): detailed feature-flag reference
