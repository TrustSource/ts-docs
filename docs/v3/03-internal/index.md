# Internal

This is the largest chapter in the ***TrustSource*** documentation. It covers everything you do between bringing data in ([Inbound](../02-inbound/index.md)) and generating compliance documents ([Outbound](../04-outbound/index.md)).

## In this chapter

| Section | What it covers | Key roles |
|---|---|---|
| [Products](03-products/index.md) | CRA-classified products with contacts, photos, documents, misuse cases and solution links. | developer + (license: `products`) |
| [Projects](01-projects/index.md) | Create, configure and manage projects, the organisational containers for your modules. 12 settings tabs. | manager, compliance_manager |
| [Modules](02-modules/index.md) | The unit of analysis: components, licenses, vulnerabilities, dependencies. 8 detail tabs, 18 settings tabs. | developer, compliance_manager |
| [Risks](05-risks/index.md) | Risk register with financial metrics, portfolio views and task management. | developer + (license: `risks`) |
| [Approvals](06-approvals/index.md) | Formal release approvals with up to eight review tabs, the quality gate before shipping. | manager, compliance_manager |
| [Releases](07-releases.md) | Approved releases with frozen SBOMs and post-release vulnerability tracking. | developer + |
| [Reports](04-reports.md) | Hub page with the analysis, impact and portfolio reports, plus the SBOM, Notice and SOUP lists. | developer + |
| [Threat Models](08-threat-models/index.md) | AI-generated STRIDE threat modelling with a Data Flow Diagram viewer (OTM / OWASP Threat Dragon import supported). | developer + (license: `threat`) |

> [!TIP]
> The typical workflow is: **create a project** → **add modules** → **scan** → **review findings** → **approve** → **release** → **generate documents**. Follow the sections in order for a natural progression through that flow.
