# Inbound — Bringing Data into TrustSource

***TrustSource*** needs to know what is in your software before it can assess licenses, vulnerabilities and compliance. This chapter covers every way to get that data in.

## The five inbound paths

| Path | What it does | Best for |
|---|---|---|
| **[Quick Check](01-check.md)** | Look up a single license or component on the spot — no project or module needed. | One-off questions ("Is MIT compatible with my project?"). |
| **[Scans](02-scans.md)** | Upload or receive a bill-of-materials snapshot for a module. | Manual uploads, SBOM imports, API-driven ingestion. |
| **[CI/CD Integrations](03-cicd-integrations.md)** | Scanners that run inside your build pipeline and push results automatically. | Continuous monitoring of every commit or release. |
| **[Code Tests (SARIF)](04-tests-sarif.md)** | Upload SARIF files from static analysis tools (Semgrep, CodeQL, Snyk Code). | Security and quality findings alongside dependency data. |
| **[Repository Scans](05-repositories-deep-scan.md)** | Point ***TrustSource*** at a Git repository for deep file-level analysis. | License and copyright detection at the source-file level. |
| **[Bulk Repositories](06-bulk-repositories.md)** | Schedule deep scans across many repositories in one pass. | Enterprise-wide inventory sweeps. |
| **[Container Scanning](07-containers.md)** | Scan container images and binaries with `ts-scan`. | Docker images, OCI artifacts, compiled binaries. |

> [!TIP]
> Most teams start with **CI/CD Integrations** (automated, continuous) and add **Repository Scans** later for deeper file-level coverage. Use **Quick Check** whenever you need a fast answer without touching a project.

## How scans relate to modules

Every scan result is attached to exactly one **module**. A module can have many scans over time — each scan is a snapshot of the module's bill of materials at a point in time. The most recent scan determines the module's current component list, license status and vulnerability exposure.

```
Project
  └── Module
        ├── Scan 1 (2026-01-15, CI/CD)
        ├── Scan 2 (2026-02-03, CI/CD)
        └── Scan 3 (2026-02-28, manual upload)   ← current
```

See the [Mental Model](../00-getting-started/05-mental-model.md) for how projects, modules and components fit together.
