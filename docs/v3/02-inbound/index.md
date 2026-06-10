# Inbound (Scans)

***TrustSource*** needs to know what is in your software before it can assess licenses, vulnerabilities and compliance. This chapter covers every way to get that data in.

## The inbound paths

| Path | What it does | Best for |
|---|---|---|
| **[Check](01-check.md)** | Look up a single license or component on the spot — no project or module needed. | One-off questions ("Is MIT compatible with my project?"). |
| **[Import Scans](02-import-scans.md)** | Upload an existing SBOM or scan result file directly. | Manual uploads, SBOM imports from suppliers, SCA migrations. |
| **[CI/CD Scan](03-cicd-scan.md)** | Scanners that run inside your build pipeline and push results automatically. | Continuous monitoring of every commit or release. |
| **[SW Quality Scans](04-sw-quality-scans.md)** | Upload SARIF files from static analysis tools (Semgrep, CodeQL, Snyk Code). | Security and quality findings alongside dependency data. |
| **[Repository Scans](05-repository-scans.md)** | Point ***TrustSource*** at a Git repository for deep file-level analysis. | License and copyright detection at the source-file level. |
| **[Mass Scans](06-mass-scans.md)** | Schedule deep scans across many repositories in one pass. | Enterprise-wide inventory sweeps. |

> [!TIP]
> Most teams start with **CI/CD Scan** (automated, continuous) and add **Repository Scans** later for deeper file-level coverage. Use **Import Scans** when you receive an SBOM from a supplier or need to migrate from another tool.

## How scans relate to modules

Every scan result is attached to exactly one **module**. A module can have many scans over time — each scan is a snapshot of the module's bill of materials at a point in time. The most recent scan determines the module's current component list, license status and vulnerability exposure.

```
Project
  └── Module
        ├── Scan 1 (2026-01-15, CI/CD)
        ├── Scan 2 (2026-02-03, CI/CD)
        └── Scan 3 (2026-02-28, manual import)   ← current
```

See the [Mental Model](../00-getting-started/05-mental-model.md) for how projects, modules and components fit together.
