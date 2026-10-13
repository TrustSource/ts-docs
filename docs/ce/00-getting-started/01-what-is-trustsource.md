# What is TrustSource CE?

***TrustSource CE*** is the Community Edition of TrustSource, a software supply chain compliance application. It helps you keep track of **what is in your software**, **what risks come with it**, and **what you have to document about it**: license compliance, vulnerability management, product security, and the documentation that regulations such as the EU Cyber Resilience Act (CRA) require.

It is built around one idea: every piece of software you ship has a known and complete bill of materials, and every release is documented in a way that holds up to an audit.

TrustSource CE is **self-hosted**. You run it on your own infrastructure with Docker Compose, and your data stays there. It is **open source** under the AGPL-3.0; the source code is at [github.com/TrustSource/ts-core-ce](https://github.com/TrustSource/ts-core-ce), and the **Source code (AGPL-3.0)** link at the bottom of the sidebar points to it.

## What you do with TrustSource CE

- **Discover what's in your code.** Upload an SPDX or CycloneDX SBOM, or send scan results from your CI/CD pipeline through the REST API. TrustSource CE consolidates everything into one bill of materials per module: components, versions, licenses, vulnerabilities, cryptographic algorithms and more.
- **Know your risks.** Vulnerabilities (from OSV, with EPSS exploit scores), license conflicts, end-of-life components, weak crypto and export-control issues are evaluated on every analysis. TrustSource CE has no data source for end-of-life dates or repository activity, so the end-of-life and viability checks mostly report no data or OK. A risk register with tasks, countermeasures and threat-model fields keeps track of what you decided.
- **Decide what's allowed.** Allow and deny lists for licenses and components, an open source policy, a crypto-algorithm policy and end-of-life thresholds, configured once at company or project level and applied automatically.
- **Approve releases with a paper trail.** An approval workflow with review tabs for vulnerabilities, licenses, versioning, viability, status changes, export control, capabilities and SW quality. Approved releases keep being monitored for new vulnerabilities.
- **Generate the documents you need.** SBOMs and CBOMs (CycloneDX 1.7, SPDX 2.3), notice files (PDF, TXT), CSAF security advisories and VEX documents. Release files carry an integrity check, and **Verify** confirms that a file issued by your installation is unchanged.
- **Manage products.** Describe what you ship to customers, classify it under the CRA, document misuse cases, contacts, support and documents, and link the software releases it consists of.
- **Plug into your workflow.** Create issues in Jira, Azure DevOps (TFS) or GitHub, send notifications through webhooks, Microsoft Teams or Slack, connect LeanIX, and automate everything else through the REST API. Release keys and CSAF feed keys give customers access to release documents and advisories without a login.

## What TrustSource CE is not

- It is **not a hosted service**. You install, update and back it up yourself (see [Installation & Setup](../01-installation-setup/index.md)).
- It is **not a SAST or DAST engine**. It imports SAST results as SARIF files, but does not run code analysis itself.
- It is **not an issue tracker**. It creates issues in your existing Jira, Azure DevOps or GitHub, rather than replacing them.
- It is **not a FAIR risk model**. The risk editor can calculate the single and annual loss expectancy (SLE, ALE) for a risk, but risk handling is status- and portfolio-based, not full financial modelling.
- It is **not classical IT asset management**. The inventory is centred on software supply chain visibility, not on procurement or hardware tracking.

## No plans, no feature flags

TrustSource CE has no account types, plans, quotas or license flags. Every feature described in this manual is available in every installation. What a user can see and do depends only on their **roles** in a company (see the [Roles Cheat Sheet](06-roles-cheatsheet.md)).

The user interface is available in English only.

## Editions

| Edition | Notes |
|---|---|
| **TrustSource CE** | Self-hosted, open source (AGPL-3.0). Documented in this manual. |
| **TrustSource SaaS (v3)** | The hosted platform, documented in the [v3 manual](../../v3/index.md). |

Some SaaS capabilities, such as single sign-on, the AI assistants (OSCAR chat, Threat Model Agent) and repository deep scans, are not part of CE. See [CE and SaaS compared](../13-ce-vs-saas.md).

## Where to next

- **[Your First Login](03-first-login.md)** - sign in and find your way around.
- **[Mental Model](05-mental-model.md)** - how Projects, Modules, Components and Products fit together. This is the vocabulary the rest of the manual uses.
- **[A 5-Minute Tour](04-quick-tour.md)** - see the app in action.
