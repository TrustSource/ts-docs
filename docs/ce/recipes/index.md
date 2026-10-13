# Recipes

Step-by-step walkthroughs for common ***TrustSource CE*** workflows. Each recipe is self-contained and works on a fresh installation: you can follow it from start to finish with the demo project, an SBOM file or a scan of your own code.

| Recipe | What you learn |
|---|---|
| [Your first module: from scan to signed-off SBOM](01-first-module-to-sbom.md) | Create a project, scan or import a module, approve it, download the release SBOM. |
| [CI/CD Integration](02-cicd-integration.md) | Upload scans, SBOMs and SARIF results from your build pipeline. |
| [Handle a License Conflict](03-handle-license-conflict.md) | Resolve a license violation in your dependencies. |
| [React to a 0-Day](04-react-to-0day.md) | Find out whether a newly disclosed vulnerability affects you, and respond. |
| [CRA Classification](06-cra-classification.md) | Classify a product under the EU Cyber Resilience Act. |
| [Crypto Inventory for PQC](07-crypto-inventory-pqc.md) | Build a cryptography inventory and flag algorithms that are not quantum-safe. |
| [Share an SBOM Publicly](08-share-sbom-publicly.md) | Share the SBOM, notice file and VEX of a release through a release key. |
| [Onboard a Team Member](09-onboard-team-member.md) | Invite a user, assign roles, give access to projects. |
| [Add an Infrastructure Module](10-add-infrastructure-module.md) | Track a web server, database or message broker as part of a project. |
| [Migrate from Another SCA](11-migrate-from-another-sca.md) | Bring SBOMs from another tool into TrustSource CE. |
| [Fill in the Legal Questionnaire](12-legal-questionnaire.md) | Run the legal settings wizard that drives the obligation evaluation, for a project and for a module. |

> [!TIP]
> To try a recipe without your own data, load the demo project first: **Load demo project** on the dashboard, or **Generate** on the **Projects** page (Manager or Compliance manager). See [Guide and demo](../00-getting-started/08-guide-and-demo.md).
