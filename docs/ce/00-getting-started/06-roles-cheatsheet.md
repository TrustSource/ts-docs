# Roles Cheat Sheet

A one-page reference for the roles in ***TrustSource CE***. Pin this page if you are an account admin setting up a new team.

## The 7 roles

| Role | Key | What this person does |
|---|---|---|
| **Developer** | `developer` | Works on modules - brings in scans and SBOMs, reviews components, and maintains the settings and allow/deny lists of the modules they are a member of. |
| **Compliance manager** | `compliance_manager` | Owns compliance - reviews and approves or rejects approval requests, maintains the project allow/deny lists, generates outbound documents and manages policies. |
| **Portfolio manager** | `portfolio_manager` | Oversees the portfolio - sees the company portfolio view and assigns the default project and compliance managers of projects and modules. |
| **Manager** | `manager` | Runs projects - creates projects, requests and reviews approvals, and maintains the settings of the projects and modules they own. |
| **Account admin** | `account_admin` | Administers the company - users and roles, API keys, integrations, policies, audit logs and company settings. |
| **Company component manager** | `company_component_manager` | Maintains the shared catalogs - license catalog entries, infrastructure elements and critical components. |
| **Company security manager** | `company_security_manager` | Owns security settings - CIA requirements, capabilities and crypto-algorithm policies. |

For the full description of each role, see [Roles Overview](../10-roles-permissions/01-roles-overview.md).

## Role assignment rules

- Roles are **scoped per company**. A user can be a Developer in Company A and an Account admin in Company B.
- Account admins assign roles in **Administration → User Management**. An invited user starts with the Developer role.
- The first administrator and every user who signed up themselves hold **all seven roles** in their company. The header then shows *ATTENTION! You are using all roles. This is not intended for production use.* Give your colleagues only the roles they need.
- Roles add up: if any of your roles grants access, you have access.
- Some actions in the interface depend on your relation to a project or module, for example being its default project manager or a module member. These relations control what the interface offers you; the server checks only your role and company. See [Permission Model](../10-roles-permissions/03-permission-model.md).

TrustSource CE has no account types, plans or license features. Every feature is available; access is controlled by roles.

> [!WARNING]
> The license catalog and the infrastructure catalog are shared by **all companies** of an installation. A Company component manager in one company can change entries every other company sees. Be careful with this role when an installation hosts several companies or allows self sign-up.

## Quick reference: who can do what

| Action | Developer | Compliance mgr. | Portfolio mgr. | Manager | Account admin | Component mgr. | Security mgr. |
|---|---|---|---|---|---|---|---|
| Use Inbound (check, import, scans) | ✓ | ✓ | - | ✓ | ✓ | - | - |
| Use Internal (products, projects, risks, releases, reports) | ✓ | ✓ | - | ✓ | - | - | - |
| Create projects | - | ✓ | - | ✓ | - | - | - |
| Load or remove the demo project | - | ✓ | - | ✓ | - | - | - |
| Review, approve or reject approvals | - | ✓ | - | ✓ | - | - | - |
| Generate outbound documents (SBOM, notice, CSAF, verify) | - | ✓ | - | ✓ | ✓ | - | - |
| See the company portfolio view | - | - | ✓ | - | - | - | - |
| Open company settings | - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Manage policies | - | ✓ | - | - | ✓ | - | ✓ |
| Manage users, API keys, integrations | - | - | - | - | ✓ | - | - |
| View audit logs | - | - | - | - | ✓ | - | - |
| Edit the license catalog | - | - | - | - | - | ✓ | - |

> [!NOTE]
> This is a simplified view based on the menu and the main actions. The Internal menu group is shown to Developers, Compliance managers and Managers; an Account admin without one of these roles does not see it. For the full permission matrix see [Functions by Area](../10-roles-permissions/04-functions-by-area.md) and [Functions by Role](../10-roles-permissions/05-functions-by-role.md).

## Related

- [Roles Overview](../10-roles-permissions/01-roles-overview.md) - detailed role descriptions
- [Permission Model](../10-roles-permissions/03-permission-model.md) - how roles combine and when rights are elevated
- [User Management](../06-administration/03-user-management.md) - invite users and assign roles
