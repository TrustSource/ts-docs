# What is TrustSource?

***TrustSource*** is a software supply chain compliance platform. It helps you keep track of **what is in your software**, **what risks come with it**, and **what you have to document about it** — for license compliance, vulnerability management, regulatory frameworks like CRA, NIS2 and MDR, and product security workflows in general.

It is built around one simple idea: every piece of software you ship has a known and complete bill of materials, and every release is documented in a way that holds up to an audit.

## What you do with TrustSource

- **Discover what's in your code.** Run scans against your repositories, CI/CD pipelines, container images, binaries or simply upload an existing SBOM. ***TrustSource*** consolidates everything into one bill of materials per module — components, versions, licenses, vulnerabilities, cryptographic algorithms, and more.
- **Know your risks.** Vulnerabilities, license conflicts, end-of-life components, weak crypto, export-control issues — all kept up to date as new information arrives from public feeds and your own scans.
- **Decide what's allowed.** Whitelists, blacklists, FOSS policies, crypto policies, EOL thresholds, MDR/IVDR or CRA classifications — configured once at company or project level, applied automatically.
- **Approve releases with a paper trail.** A built-in approval workflow with eight review tabs (vulnerabilities, licenses, versioning, viability, changes, export control, tests, capabilities) and an immutable snapshot per approval.
- **Generate the documents you need.** SBOM (SPDX, CycloneDX), SOUP files for medical devices, attribution / notice files, CSAF security advisories — and a verification tool to validate documents you receive from suppliers.
- **Manage products end-to-end.** Especially relevant for the EU Cyber Resilience Act: classify products (STANDARD, IMPORTANT_1, IMPORTANT_2, CRITICAL), document misuse cases, link the right contacts, attach data sheets and link the actual software releases.
- **Plug into your workflow.** Issues land in Jira, GitHub or Azure DevOps. Notifications go out via webhooks and email. Public links let you share an SBOM or notice file with a customer without giving them a login.

## What TrustSource is not

- It is **not a SAST or DAST engine** — it integrates SAST results via SARIF and works alongside dynamic testing tools, but does not run them itself.
- It is **not an issue tracker** — it creates issues in your existing Jira / GitHub / TFS, rather than replacing them.
- It is **not a quantitative risk model** (FAIR, ALE) — risk handling is status- and portfolio-based, not financial modeling.
- It is **not classical IT asset management** — the inventory is centered on software supply chain visibility, not procurement or hardware tracking.

## Editions and how they differ

| Edition | Notes |
|---|---|
| **Standard / Corporate / Enterprise / Medical** | The production line. Documented in this manual (v2.16). |
| **Community Edition** | An open-source self-hosted edition, shipping as v3.0. Subset of features, separate manual. *(Coming soon.)* |

Some features in v2.16 are gated by **license features** that your account admin enables (for example `chat`, `csaf`, `risks`, `threat`, `products`, `sarif`, `medical`). Pages that depend on a license feature will say so at the top.

## Where to next

- **[Mental Model](05-mental-model.md)** — understand how Projects, Modules, Components and Products fit together. This is the vocabulary the rest of the manual uses.
- *Account Types & Editions (coming soon)* — find out exactly what your edition includes.
- *A 5-Minute Tour (coming soon)* — see the app in action.
