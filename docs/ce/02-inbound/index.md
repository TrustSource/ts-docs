# Inbound (Scans)

***TrustSource CE*** needs to know what is in your software before it can assess licenses, vulnerabilities and compliance. This chapter covers every way to get that data in.

> [!NOTE]
> **Required role:** the **Inbound (Scans)** menu is shown to Developer, Compliance manager, Manager and Account admin.

## The inbound paths

| Path | What it does | Best for |
|---|---|---|
| **[Check](01-check.md)** | Test a license or component version against the rules of one of your modules. | One-off questions ("Is MIT compatible with my project?"). |
| **[Import Scans](02-import-scans.md)** | Upload an existing CycloneDX or SPDX SBOM into a project. | Manual uploads, SBOMs from suppliers, migrations from another tool. |
| **[CI/CD Scan](03-cicd-scan.md)** | Scanners in your build pipeline push results through the REST API; the page lists every received scan. | Continuous monitoring of every build or release. |
| **[SW Quality Scans](04-sw-quality-scans.md)** | Upload SARIF files from static analysis tools (Semgrep, CodeQL and others). | Security and quality findings next to dependency data. |

> [!TIP]
> Most teams start with a scanner in the build pipeline ([CI/CD Scan](03-cicd-scan.md)) and use [Import Scans](02-import-scans.md) for SBOMs they receive from suppliers or export from another tool.

Repository scans (DeepScan) and mass scans are not part of TrustSource CE. See [CE and SaaS compared](../13-ce-vs-saas.md).

## How scans relate to modules

Every scan is attached to exactly one **module**. A module can have many scans over time; each scan is a snapshot of the module's bill of materials at one point in time. Each scan is analysed, and the module views show the analysis you select (by default the newest).

```
Project
  └── Module
        ├── Scan 1 (2026-01-15, CI/CD)
        ├── Scan 2 (2026-02-03, CI/CD)
        └── Scan 3 (2026-02-28, SBOM import)   ← newest
```

See the [Mental Model](../00-getting-started/05-mental-model.md) for how projects, modules and components fit together.
