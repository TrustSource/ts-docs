# Module Settings

Module settings are organized in tabs (up to nineteen in the UI, depending on module type, account type and role). Open them with **Settings** in the module header or on the module card. Most settings inherit from the parent project and can be overridden at the module level.

The table lists the tabs in the order the app shows them. Infrastructure and COTS modules do not have the tabs Quality, Crypto management, AI / ML, Allow/Deny, Capabilities, MDR/IVDR Classification, Custom components, History and Export SPDX.

| Tab | What it configures |
|---|---|
| [General](01-general.md) | Name, description, project assignment, architecture type, version, tags, managers, confidence level. |
| [Legal](02-legal.md) | Trade secret protection, sub-licensing and distribution of the module; legal templates. |
| [Quality](12-quality.md) | Test and quality requirements. |
| [Crypto management](10-encryption.md) | Cryptographic inventory: detected and managed algorithms, certificates, protocols and key material; CBOM export. |
| [AI / ML](19-ai-ml.md) | Detected and managed AI artifacts; AIBOM export. |
| [Allow/Deny](14-whitelists-blacklists.md) | Allowed/denied licenses and components. |
| [Capabilities](09-capabilities.md) | Software capability declarations. |
| [End-of-life](11-end-of-life.md) | EOL analysis thresholds. |
| [CIA](08-cia.md) | Confidentiality, Integrity, Availability requirements; risk assessment scheme. |
| [Resolved obligations](03-obligations.md) | Obligations already fulfilled in this module. |
| [MDR/IVDR Classification](07-module-classification-mdr-ivdr.md) | Medical device classification (Medical accounts). |
| [OSSF](05-ossf.md) | OpenSSF Scorecard configuration and thresholds. |
| [Viability](04-viability.md) | Repository health monitoring, activity thresholds. |
| [Versioning](06-versioning.md) | Component version tracking, jump detection. |
| [Allowed vulnerability](15-cve-whitelist.md) | Muted vulnerabilities (accepted risks, false positives). |
| [Custom components](16-custom-components.md) | Manually added components not found by scans. |
| [History](13-releases.md) | Analyses and uploaded scans of the module. |
| [Export SPDX](17-spdx-export.md) | SPDX RDF document generation. |
| [Danger Operations](18-danger-zone.md) | Archive the module, delete its analysis history, or delete it. |

![The settings of the module scan_mAIfit_app.cdx.json with the General tab active: the tab bar General, Legal, Quality, Crypto management, AI / ML, Allow/Deny, Capabilities, End-of-life, CIA, Resolved obligations, OSSF, Viability and more, and the General form below.](../../../../assets/images/v3/03-internal/02-modules/settings/index-1.webp)
