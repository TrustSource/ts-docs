# Modules & Infrastructure Modules

A **module** is the unit of analysis in ***TrustSource***. It represents one piece of software — a microservice, a library, a frontend, a firmware build — and its bill of materials.

## In this section

| Page | What it covers |
|---|---|
| [Create & List](01-create-and-list.md) | Creating modules, the module list within a project. |
| [Module Detail Tabs](02-module-detail-tabs.md) | The main module view — dependencies, legal, vulnerabilities, graphs. |
| [Infrastructure Modules](03-infrastructure-modules.md) | How infrastructure modules differ from regular modules. |
| [Module Settings](settings/index.md) | All 18 settings tabs. |

## Key concepts

- Each module belongs to exactly one project.
- A module's components come from **scans** — CI/CD, manual upload, SBOM import, or deep scan.
- Modules have a traffic-light status that rolls up from their components.
- Module settings can **override** project-level defaults.

📸 *Screenshot: a module detail page showing the dependency list with status indicators.*
