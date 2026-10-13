# Module Settings

Open the module settings with **Settings** on the [module page](../02-module-detail-tabs.md) or on the module card. The page header shows the module name, the subtitle *Edit Module* and a **Follow** action. Many settings add to the project defaults; some inherit from the project when left empty.

The tabs appear in this order. A tab is shown only if your role may read it; infrastructure and COTS modules hide the tabs marked with *.

| Tab | What it configures |
|---|---|
| [General](01-general.md) | Name, description, project, architecture type, tags, managers, members, LeanIX link, confidence level, repository. |
| [Legal](02-legal.md) | Trade secret protection, sub-licensing, distribution. |
| [Quality](12-quality.md) * | Required test tools. |
| [Crypto management](10-encryption.md) * | Detected and managed crypto assets, CBOM export. |
| [AI / ML](19-ai-ml.md) * | Detected and managed AI artifacts, AIBOM export. |
| [Allow/Deny](14-whitelists-blacklists.md) * | Always allowed and always denied licenses and components. |
| [Capabilities](09-capabilities.md) * | What the module can do for its users. |
| [End-of-life](11-end-of-life.md) | End-of-life analysis switch and thresholds. |
| [CIA](08-cia.md) | Confidentiality, integrity and availability requirements. |
| [Resolved obligations](03-obligations.md) | Obligations already fulfilled in this module. |
| [Viability](04-viability.md) | Viability analysis switch, thresholds and confidence. |
| [Versioning](06-versioning.md) | Versioning analysis switch, jump detection and thresholds. |
| [Allowed vulnerability](15-cve-whitelist.md) | Muted vulnerabilities. |
| [Custom components](16-custom-components.md) * | Components added by hand. |
| [History](13-releases.md) * | Analyses and scans of the module. |
| [Export SPDX](17-spdx-export.md) * | SPDX RDF export. |
| [Danger Operations](18-danger-zone.md) | Archive the module, delete its analysis history, delete it. |

Who may change which setting is listed in the [Module Settings Permission Matrix](../../../10-roles-permissions/06a-module-settings-matrix.md). In short, "owner" below means the module's default project manager or default compliance manager; while the module has none, every manager and compliance manager counts as owner.

- A **Developer** who is a member of the module (or of a module without members) can change most technical tabs; a developer who is not a member reads only.
- **Manager** and **Compliance manager** who are owner can change almost every tab. Only managers delete the analysis history.
- **Company security manager** edits CIA and Capabilities; **Portfolio manager** edits Capabilities, tags and the default managers.

The OSSF tab and MDR/IVDR classification are not part of TrustSource CE; see [CE and SaaS compared](../../../13-ce-vs-saas.md).

![The settings of the module webshop-backend with the General tab active: the tab bar General, Legal, Quality, Crypto management, AI / ML, Allow/Deny, Capabilities, End-of-life, CIA, Resolved obligations, Viability, Versioning and more, and the General form below.](../../../../assets/images/ce/03-internal/02-modules/settings/index-1.webp)
