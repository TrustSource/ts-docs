# Administration

Company-wide settings and management. Open them from **Administration** in the left navigation. Most pages need the `account_admin` role; the **Settings** and **Policies** pages are also shown to other roles for their own cards.

| Page | What it covers | Required role |
|---|---|---|
| [Account & Billing](01-account-billing.md) | Company details, account type, terms. | account_admin, enterprise_admin |
| [Identity Integration](../07-auth-sso/index.md) | SSO, identity providers, authentication flows (Enterprise/Medical). | account_admin |
| [Integrations](08-integrations.md) | Jira, GitHub, TFS, LeanIX, SCANOSS, webhooks and channels. | account_admin, enterprise_admin |
| [Settings](02-settings.md) | Company settings cards: general info, FOSS liaison, PSIRT, written offer, allow/deny lists, tags and more. | account_admin + (see card-level roles) |
| [User Management](03-user-management.md) | Invite, import, assign roles, remove members. | account_admin |
| [API Keys](04-api-keys.md) | Scanner and CSAF feed API keys, release keys. | account_admin |
| [Policies](05-policies.md) | Opensource policy, crypto algorithms, end-of-life, risk assessment. | account_admin, company_security_manager, compliance_manager |
| [Enterprise Companies](06-enterprise-companies.md) | Member companies and their API usage (Enterprise/Medical). | enterprise_admin |
| [Audit Logs](07-audit-logs.md) | Company-wide audit trail. | account_admin |
| [Login History](09-login-history.md) | Sign-in attempts, opened from the Audit logs page. | account_admin, manager, compliance_manager |

More detail pages:

- [Company details](02a-company-details.md) — General info, FOSS liaison, PSIRT contacts, Written offer
- [Company tags](02b-company-tags.md) — add, import and remove tags
- [API Usage](04a-api-usage.md) and [Release keys](04b-release-keys.md)
- [Issue trackers](08a-issue-trackers.md), [LeanIX and SCANOSS](08b-leanix-scanoss.md), [Webhooks and channels](08c-webhooks-channels.md)

📸 *Screenshot: the Administration section in the sidebar.*
