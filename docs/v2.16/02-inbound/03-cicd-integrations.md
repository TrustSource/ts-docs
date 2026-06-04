# CI/CD Integrations (Scanners)

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

***TrustSource*** integrates into your build pipeline so that every build automatically uploads its bill of materials. This page explains how to set up scanner integrations.

## What it does

A scanner integration runs inside your CI/CD pipeline (GitHub Actions, GitLab CI, Jenkins, Azure DevOps) and pushes dependency data to ***TrustSource*** after each build. The result appears as a [scan](02-scans.md) attached to the configured module.

## Available scanners

***TrustSource*** provides scanners for multiple ecosystems:

| Category | Scanners |
|---|---|
| **Package managers** | npm, Yarn, Maven, Gradle, Composer, Bower, Bundler |
| **Languages** | Java, JavaScript/TypeScript, Python, PHP, C/C++, Ruby |
| **CI/CD platforms** | Jenkins plugin, TFS/Azure DevOps |
| **Containers** | Docker (via `ts-scan`) |
| **IDE plugins** | Visual Studio |

Each scanner is an open-source tool hosted on GitHub under the [TrustSource organisation](https://github.com/trustsource).

📸 *Screenshot: the Scanners page showing scanner categories with links to their GitHub repositories.*

## How to set up a scanner

### Step 1: Create an API key

1. Go to **Administration → API Keys** (requires `account_admin` role).
2. Click **Create API Key**.
3. Give the key a name (e.g. "CI Pipeline") and select the appropriate scope.
4. Copy the generated key — you will not see it again.

### Step 2: Configure your pipeline

Add the scanner to your build configuration. Here are examples for the most common setups:

**GitHub Actions (npm/Yarn):**

```yaml
- name: TrustSource Scan
  run: |
    npm install -g ts-node-client
    ts-node-client --apiKey ${{ secrets.TS_API_KEY }} \
                   --project "my-project" \
                   --module "frontend"
```

**GitLab CI (Maven):**

```yaml
trustsource-scan:
  stage: test
  script:
    - mvn org.trustsource:ts-maven-plugin:scan
        -Dts.apiKey=${TS_API_KEY}
        -Dts.project=my-project
        -Dts.module=api-service
```

**Jenkins:**

Install the TrustSource Jenkins plugin from the Jenkins plugin registry. Configure the API key in Jenkins credentials and add a post-build step.

> [!TIP]
> Store your API key as a **secret** in your CI/CD platform — never commit it to your repository.

### Step 3: Verify the scan arrived

After your pipeline runs, navigate to **Inbound → CI/CD Scan** in ***TrustSource***. The new scan should appear in the list with status **Done** within a few minutes.

## Scan tags

Most scanners support a `--tag` parameter that lets you attach metadata to each scan (e.g. the branch name, commit SHA or build number). Tags appear in the scan list and help you identify which build produced which scan.

```bash
ts-node-client --apiKey $KEY --project my-project --module frontend \
               --tag "main@$(git rev-parse --short HEAD)"
```

## Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| Scan does not appear | API key invalid or expired | Regenerate the key in Administration → API Keys. |
| Scan shows 0 components | Scanner ran before dependencies were installed | Run the scanner **after** `npm install` / `mvn compile` / equivalent. |
| Wrong module | `--module` parameter does not match | Check the exact module name in ***TrustSource***. |
| Timeout on large projects | Upload payload too large | Split into smaller modules, or increase the scanner's timeout setting. |

## Related

- [Working with Scans](02-scans.md) — what happens after the scan arrives
- [API Keys](../06-administration/06-api-keys.md) — managing scanner API keys
- [REST API → Scans endpoint](../09-rest-api/03-endpoint-reference.md) — the API behind the scanners
- [Container Scanning](07-containers.md) — scanning Docker images with `ts-scan`
