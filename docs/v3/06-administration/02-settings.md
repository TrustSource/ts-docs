# Settings

> [!NOTE]
> **Required role:** `account_admin`, `compliance_manager`, `company_security_manager`, `company_component_manager`, `portfolio_manager`, `manager` or `legal_manager`
>
> Each settings card is only visible to the roles that own it. Users without any matching role do not see this menu item.

The **Settings** page consolidates company-wide configuration into a single view with individual settings cards. What you see depends on your role — account admins see everything, while other roles see only the cards relevant to their responsibilities.

## Settings cards

| Card | What it configures | Visible to |
|---|---|---|
| **General** | Company name, logo, contact details, language. | account_admin |
| **FOSS Liaison** | Open-source program office contact details. | account_admin, compliance_manager |
| **PSIRT Contacts** | Product Security Incident Response Team contacts. | account_admin, company_security_manager |
| **Written Offer** | Written offer text for GPL/LGPL compliance in distributed binaries. | account_admin, compliance_manager |
| **Allow / Deny Lists** | Company-wide license and component allow/deny lists. | account_admin, compliance_manager |
| **Encryption** | Default encryption and crypto-algorithm settings. | account_admin, company_security_manager |
| **Quality** | Default quality and test requirements. | account_admin, compliance_manager |
| **Tags** | Company-wide tag taxonomy for projects and modules. | account_admin, manager |
| **Private Licenses** | Custom license definitions not in the public database. | account_admin, compliance_manager |
| **Legal Templates** | Obligation and notice file templates. | account_admin, legal_manager |
| **Private Algorithms** | Custom cryptographic algorithm definitions. | account_admin, company_security_manager |
| **Manual Vulnerabilities** | Manually tracked vulnerabilities not in public feeds. | account_admin, company_security_manager |

📸 *Screenshot: the Settings page showing the card grid with FOSS Liaison and PSIRT contacts visible.*

> [!TIP]
> Settings defined here act as company-wide defaults. Projects and modules can override most values in their own settings tabs.

## Related

- [Project Settings](../03-internal/01-projects/settings/index.md) — project-level overrides
- [Module Settings](../03-internal/02-modules/settings/index.md) — module-level overrides
- [Policies](05-policies.md) — EOL, FOSS and crypto policies
