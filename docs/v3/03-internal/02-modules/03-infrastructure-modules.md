# Infrastructure Modules

> [!NOTE]
> **Required role:** `manager` or `compliance_manager` to create and analyze.

An **infrastructure module** represents third-party runtime components that your software depends on: database servers, base container images, message brokers, web servers, operating systems.

## Why infrastructure modules exist

Your software supply chain risk does not stop at your application code. A vulnerability in `mysql:8.0.36`, an end-of-life `debian:11` base image, or a known CVE in `nginx` is just as relevant as a CVE in an npm package. Infrastructure modules let you track these dependencies alongside your code modules.

## How they differ from regular modules

| Aspect | Source-code module | Infrastructure or COTS module |
|---|---|---|
| **Tab bar** | List, Tree, Graph, Legal, DeepScans, Quality, OBOM | None. The page shows the **Component Details** panel of the linked catalog entry. |
| **Component source** | Scans (CI/CD, upload, API) | Linked from the [Infrastructure catalog](../../05-knowledge/02-infrastructure-elements.md) or the [COTS catalog](../../05-knowledge/03-cots.md) |
| **Version field** | Derived from scans | Editable in [General settings](settings/01-general.md) |
| **Header actions** (`manager`, `compliance_manager`) | Full set, see [Module Detail Tabs](02-module-detail-tabs.md) | **Settings**, **Analyse** and **Follow** only |
| **Settings tabs** | All | Without Quality, Crypto management, AI / ML, Allow/Deny, Capabilities, MDR/IVDR Classification, Custom components, History and Export SPDX |
| **Card in the list** | Licenses, components, last analysis and scan | License and last visit of the catalog entry |

The header and the card carry a label, **Infrastructure Module** or **COTS Module** (on the card only for `manager` and `compliance_manager`). If no details of the catalog entry are available yet, the page says so instead of showing the panel.

## Creating an infrastructure module

1. Open a project and click **Add/link** in the module list toolbar.
2. Set **Module type** to **COTS or Infrastructure component**.
3. Under **Select pre-defined module**, search the catalog (for example `postgres`) and choose the entry, then choose its **Module version**.
4. Choose the **Type of architecture** and tick **Is open source module** if it applies.
5. Click **Create module**.

If the entry is missing, click **Not finding what you are looking for?**, enter name and version and click **Send request**; support adds it to the catalog.

Once created, vulnerabilities and license findings for that entry are surfaced in the project like for any other module. Click **Analyse** after changing settings to refresh the module's statistics.

![The page of the infrastructure module Redis (6.2.6) with the labels Infrastructure Service and Infrastructure Module, the Settings, Analyse and Follow buttons, and the Component Details panel of the catalog entry im:redis with Details, Select license, Viability, OSSF, End-of-life, Versioning, Export control and the vulnerabilities of version 6.2.6.](../../../assets/images/v3/03-internal/02-modules/03-infrastructure-modules-1.webp)

## When to use them

- You ship **Docker images** and want to track the base image as a dependency.
- Your compliance process requires documenting the **complete runtime surface** (CRA, NIS2, MDR).
- You want **vulnerability monitoring** for your database, web server or runtime.

## Related

- [Infrastructure Components](../../05-knowledge/02-infrastructure-elements.md): the global catalog
- [Mental Model](../../00-getting-started/05-mental-model.md): where infrastructure modules fit
