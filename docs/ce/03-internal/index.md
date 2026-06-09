# Internal — Day-to-Day Compliance Work

This is the largest chapter in the ***TrustSource*** documentation. It covers everything you do between bringing data in ([Inbound](../02-inbound/index.md)) and generating compliance documents ([Outbound](../04-outbound/index.md)).

## In this chapter

| Section | What it covers | Key roles |
|---|---|---|
| [Projects](01-projects/index.md) | Create, configure and manage projects — the organisational containers for your modules. 12 settings tabs. | manager, account_admin |
| [Modules](02-modules/index.md) | The unit of analysis — components, licenses, vulnerabilities, dependencies. 8 detail tabs, 18 settings tabs. | developer, compliance_manager |
| [Products](03-products/index.md) | CRA-classified products with contacts, photos, documents, misuse cases and solution links. | developer + (license: `products`) |
| [Analysis Reports](04-analysis-reports.md) | Hub page linking to all report types (SBOM, SOUP, Notice, CSAF). | compliance_manager + |
| [Risks](05-risks/index.md) | Risk register with financial metrics, portfolio views and task management. | developer + (license: `risks`) |
| [Approvals](06-approvals/index.md) | Formal release approvals with eight review tabs — the quality gate before shipping. | compliance_manager |
| [Releases](07-releases.md) | Published releases with frozen SBOMs and post-release vulnerability monitoring. | developer + |
| [Threat Models](08-threat-models/index.md) | STRIDE and LINDDUN threat modelling (BETA). | developer + (license: `threat`) |
| [Settings & Templates](09-settings-templates.md) | Cross-reference to Administration → Templates for company-wide configuration. | account_admin |
| [Vulnerabilities Activity](10-vulnerabilities-activity.md) | Company-wide vulnerability feed for security managers. | company_security_manager |
| [Critical Components](11-critical-components.md) | Components flagged as critical across the company portfolio. | company_component_manager |

> [!TIP]
> The typical workflow is: **create a project** → **add modules** → **scan** → **review findings** → **approve** → **release** → **generate documents**. Follow the sections in order for a natural progression through that flow.
