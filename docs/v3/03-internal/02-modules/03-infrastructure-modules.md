# Infrastructure Modules

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

An **infrastructure module** represents third-party runtime components that your software depends on — database servers, base container images, message brokers, web servers, operating systems.

## Why infrastructure modules exist

Your software supply chain risk does not stop at your application code. A vulnerability in `mysql:8.0.36`, an end-of-life `debian:11` base image, or a known CVE in `nginx` is just as relevant as a CVE in an npm package. Infrastructure modules let you track these dependencies alongside your code modules.

## How they differ from regular modules

| Aspect | Source-code module | Infrastructure module |
|---|---|---|
| **Architecture type** | `sourceCode` | `infrastructureModule` |
| **Dependency tabs** | List, Tree, Graph, Deep Scans, Quality | Not shown — no dependency analysis |
| **Component source** | Scans (CI/CD, upload, API) | Linked from the [Infrastructure catalog](../../05-knowledge/03-infrastructure-components.md) |
| **Version field** | Not shown (derived from scans) | Editable in General settings |
| **Analysis** | Full dependency + vulnerability + legal | Stats update only |

## Creating an infrastructure module

1. Open a project and click **Create**.
2. Set the architecture type to **Infrastructure Module**.
3. Enter the name (e.g. `postgres:16.3`, `redis:7.2-alpine`).
4. Link it to an entry in the global infrastructure catalog.

Once linked, vulnerabilities and license findings for that infrastructure entry are surfaced in the project just like for any other module.

📸 *Screenshot: an infrastructure module in the module list with its catalog link and version.*

## When to use them

- You ship **Docker images** and want to track the base image as a dependency.
- Your compliance process requires documenting the **complete runtime surface** (CRA, NIS2, MDR).
- You want **vulnerability monitoring** for your database, web server or runtime.

## Related

- [Infrastructure Components](../../05-knowledge/03-infrastructure-components.md) — the global catalog
- [Container Scanning](../../02-inbound/07-containers.md) — scanning Docker images with ts-scan
- [Mental Model](../../00-getting-started/05-mental-model.md) — where infrastructure modules fit
