# Container & Binary Scanning

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

***TrustSource*** can scan container images and compiled binaries for dependencies, licenses and vulnerabilities using the open-source CLI tool **`ts-scan`**.

## What it does

`ts-scan` inspects a container image (Docker, OCI) or binary artifact, extracts its software bill of materials, and uploads the result to ***TrustSource*** as a regular [scan](02-scans.md). From that point on, the container's dependencies are monitored for license conflicts and new vulnerabilities just like any other module.

## When to use it

- You ship **Docker images** and need to know what is inside them — OS packages, language-level dependencies, embedded binaries.
- You receive **third-party container images** (base images, vendor software) and need to verify their contents before deployment.
- Your compliance process requires an **SBOM for the runtime environment**, not just the application code.

## How to use it

### Install ts-scan

`ts-scan` is a Python CLI tool available via pip:

```bash
pip install ts-scan
```

See the full [ts-scan documentation](https://trustsource.github.io/ts-scan) for detailed installation instructions and platform-specific notes.

### Scan a container image

```bash
ts-scan docker <image> \
  --apiKey YOUR_API_KEY \
  --project "my-project" \
  --module "runtime-image"
```

For example, to scan an Alpine-based Node.js image:

```bash
ts-scan docker node:22-alpine \
  --apiKey $TS_API_KEY \
  --project "customer-portal" \
  --module "api-container"
```

The scan result appears in ***TrustSource*** under **Inbound → CI/CD Scan** within a few minutes.

### Scan in CI/CD

Add `ts-scan` to your build pipeline to scan every published image automatically:

```yaml
# GitHub Actions example
- name: Scan container image
  run: |
    pip install ts-scan
    ts-scan docker ${{ env.IMAGE_TAG }} \
      --apiKey ${{ secrets.TS_API_KEY }} \
      --project my-project \
      --module runtime-image \
      --tag "${{ github.sha }}"
```

> [!TIP]
> Use the `--tag` parameter to track which build produced which container scan — e.g. the Git commit SHA or the image tag.

## What ts-scan detects

| Layer | What is extracted |
|---|---|
| **OS packages** | dpkg (Debian/Ubuntu), apk (Alpine), rpm (RHEL/CentOS) — package names, versions, licenses. |
| **Language dependencies** | npm, pip, Maven, Go modules, Cargo — if lock files or installed artifacts are present. |
| **Embedded binaries** | Statically linked libraries detected via binary analysis (where possible). |

## Infrastructure modules

For container images that are part of your **runtime infrastructure** (database servers, reverse proxies, base images), consider creating an [Infrastructure Module](../03-internal/02-modules/03-infrastructure-modules.md) instead of a regular module. This tracks the container as a distinct infrastructure dependency and includes it in your project's complete supply chain view.

## Related

- [Working with Scans](02-scans.md) — how scan results are processed and displayed
- [CI/CD Integrations](03-cicd-integrations.md) — other scanners for your pipeline
- [Infrastructure Components](../05-knowledge/03-infrastructure-components.md) — the global infrastructure catalog
- [ts-scan documentation](https://trustsource.github.io/ts-scan) — full CLI reference
