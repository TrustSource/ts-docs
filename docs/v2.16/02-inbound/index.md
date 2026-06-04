# Inbound — Bringing Data into TrustSource

Five ways to populate your modules with data: ad-hoc check, scans, CI/CD pipelines, repository deep scans, container scans, SARIF tests, and SBOM uploads.

## In this chapter

| Page | Status | Scope |
|---|---|---|
| [Quick Check (License / Component)](01-check.md) | _Scaffold_ | Ad-hoc check of a single license or component without a full scan. |
| [Working with Scans](02-scans.md) | _Scaffold_ | Scan list, status, detail view, re-scan, deletion semantics. |
| [CI/CD Integrations (Scanners)](03-cicd-integrations.md) | _Scaffold_ | Configure scanners and tokens for GitHub Actions, GitLab CI, Jenkins. |
| [Code Tests (SARIF)](04-tests-sarif.md) | _Scaffold_ | SARIF upload from SAST tools (Semgrep, CodeQL, Snyk Code, ...). |
| [Repositories (Deep Scan)](05-repositories-deep-scan.md) | _Scaffold_ | Connect a repo, run a deep scan, review the tree, give false-positive feedback. |
| [Bulk Repositories Scan](06-bulk-repositories.md) | _Scaffold_ | Mass-scan many repos in one pass (Enterprise account, BETA). |
| [Container & Binary Scanning](07-containers.md) | _Scaffold_ | Scanning container images and binaries with `ts-scan`; results land like any other scan upload. |
