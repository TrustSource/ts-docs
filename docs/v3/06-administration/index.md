# Administration

Company-wide settings and management. Most pages in this section require the `account_admin` role. The **Settings** page is also visible to other roles for their respective settings cards.

| Page | What it covers | Required role |
|---|---|---|
| [Account & Billing](01-account-billing.md) | Subscription, usage, invoices. | account_admin, enterprise_admin |
| [Identity Integration](../07-auth-sso/index.md) | SSO, identity providers, authentication flows (Enterprise/Medical). | account_admin |
| [Settings](02-settings.md) | Consolidated company settings — FOSS liaison, PSIRT contacts, templates, allow/deny lists, encryption, quality, tags and more. | account_admin + (see card-level roles) |
| [User Management](03-user-management.md) | Invite, assign roles, remove members. | account_admin |
| [API Keys](04-api-keys.md) | Scanner and CSAF feed API key management. | account_admin |
| [Policies](05-policies.md) | EOL, FOSS and crypto policies. | account_admin, company_security_manager, compliance_manager |
| [Enterprise Companies](06-enterprise-companies.md) | Sub-company management (Enterprise/Medical). | enterprise_admin |
| [Audit Logs](07-audit-logs.md) | Company-wide audit trail. | account_admin |

📸 *Screenshot: the Administration section in the sidebar.*
