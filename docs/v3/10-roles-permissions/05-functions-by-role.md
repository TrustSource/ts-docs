# Functions by Role

What each role can do, one role at a time. Use it to decide which roles a person needs. Menu details are on [Functions by Area](04-functions-by-area.md); field-level rights in project and module settings are in the [Settings Permission Matrix](06-settings-permission-matrix.md).

📸 *Screenshot: the role drop-down in User Management with all roles ticked.*

Roles add up: a person with several roles can do everything any of them can do. License flags and account types can hide entries on top of that.

## Developer (`developer`)

- **Menu:** Overview, Inbound (Check, Import Scans, CI/CD Scan, Repository Scans, SW Quality Scans with `sarif`), Internal (Projects, Reports, Releases, Products with `products`, Risks with `risks`, Threat Models with `threat`), Knowledge.
- **Module settings:** edit General (name, version, description, project id, tags), Viability, OSSF, Versioning, MDR/IVDR classification, CIA, Capabilities, Crypto management, End-of-life, Quality, Allow/Deny lists, Allowed vulnerabilities and Custom components; export SPDX; delete a module and its history.
- **Project settings:** read only.
- **Context:** the member and non-member rights in the [module matrix](06a-module-settings-matrix.md) apply.

## Compliance manager (`compliance_manager`)

- **Menu:** everything a developer sees, plus Approvals, Outbound (SBOM + CBOM, Notice Files, Verify, SOUP Lists, CSAF, CVD cases with the matching license), Mass Scans.
- **Approvals:** start and approve or reject approvals. See [Approve / Reject](../03-internal/06-approvals/03-approve-reject-workflow.md).
- **Project settings:** edit Allow/Deny lists, enforce them and approve license and component allow-list entries.
- **Company settings:** Settings cards for FOSS liaison, Written offer, License allow/deny, Component allow/deny, Encryption, Quality, Company tags, Private licenses and Legal templates (the FOSS liaison and Written offer forms are shown to account admins only); Policies including the Opensource policy; the Login history page.
- **Context:** gets default-owner rights on projects and modules where they are the default compliance manager or none is set.

## Portfolio manager (`portfolio_manager`)

- **Menu:** Overview, Knowledge, Settings with Company tags.
- **Project and module settings:** assign the default project manager and default compliance manager; edit module tags and Capabilities; export SPDX.

## Manager (`manager`)

- **Menu:** Inbound, Internal with Approvals, Outbound, Knowledge, Settings with Company tags.
- **Approvals:** start and approve or reject approvals.
- **Company data:** the Login history page; add, remove and import company tags; create and read webhooks and channels; change roles and remove users on the server side, although the User Management page itself is for account admins.
- **Project and module settings:** read only, plus Capabilities and SPDX export on modules.
- **Context:** gets default-owner rights, which are broad, on projects and modules where they are the default project manager or none is set. These include editing nearly every tab, running imports and deleting the project or module. See the [project matrix](06-settings-permission-matrix.md#rights-that-depend-on-your-relationship-to-the-project).

## Account admin (`account_admin`)

- **Menu:** Inbound, Outbound and the whole Administration section: Account & Billing, Identity Integration (Enterprise or Medical), Integrations, Settings, User Management, API keys, Policies, Audit logs.
- **Company data:** invite users, change roles, import users, remove users; manage integrations, webhooks and API keys; all Settings cards.
- **Project settings:** Issue Integration (Jira, TFS, GitHub) and the LeanIX link; read access elsewhere.

## Enterprise admin (`enterprise_admin`)

- **Menu:** Overview, Knowledge, Account & Billing, Integrations, Enterprise Companies (Enterprise or Medical).
- **Project and module settings:** read only.

## Company component manager (`company_component_manager`)

- **Menu:** Overview, Knowledge, Settings with Component allow/deny and Manual vulnerability.
- **Pages:** the critical components report.

## Company security manager (`company_security_manager`)

- **Menu:** Overview, Knowledge, Settings with PSIRT contacts, Component allow/deny, Encryption, Quality, Company tags, Private algorithms and Manual vulnerability; Policies with Crypto algorithms, Component end-of-life and Risk assessment.
- **Project and module settings:** edit CIA and Capabilities and run their imports.
- **Pages:** vulnerability activity.

## Internal and licence-bound roles

| Role | Gives access to |
|---|---|
| `component_manager` | The Component mngr. section: Manage IC, Manage COTS, Critical Components. |
| `legal_manager` | The Legal mngr. section: Manage Legal, Legal templates, Copyright & Trademarks, and the Legal templates card in Settings. |
| `cvd_coordinator` | Nothing inside the app; it is passed on to the CVD service. Needs license `cvdself`. |

See [Internal Roles](02-internal-roles.md).

## Approvals

- **Start an approval** (or turn a draft into one): `manager`, `compliance_manager`. Other members get a `403` and nothing is saved.
- **Save a draft approval:** any member.
- **Approve / reject:** `manager`, `compliance_manager`.

## Related

- [The 8 Roles](01-roles-overview.md)
- [Roles & Licenses Cheat Sheet](../00-getting-started/06-roles-licenses-cheatsheet.md)
