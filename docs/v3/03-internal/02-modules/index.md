# Modules & Infrastructure Modules

A **module** is the unit of analysis in ***TrustSource***. It represents one piece of software (a microservice, a library, a frontend, a firmware build) and its bill of materials.

## In this section

| Page | What it covers |
|---|---|
| [Create & List](01-create-and-list.md) | Creating, linking and importing modules; the module list within a project. |
| [Module Detail Tabs](02-module-detail-tabs.md) | The main module view: tabs, header actions, choosing an analysis. |
| [Infrastructure Modules](03-infrastructure-modules.md) | How infrastructure and COTS modules differ from regular modules. |
| [Component details](04-component-detail.md) | The side panel in the List tab and the full component page. |
| [License details](05-license-detail.md) | License text and status from a module's Legal tab. |
| [Manual license resolution](06-manual-license-resolution.md) | Setting the license of a component the scan could not match. |
| [OBOM tab](07-obom-tab.md) | The operational BOM of a module. |
| [Module Settings](settings/index.md) | All settings tabs, including AI / ML. |

## Key concepts

- A module belongs to at most one project. A module without a project (**Assigned Project** set to `-- unassigned --` in its [General settings](settings/01-general.md)) is listed under **Unassigned Modules** in the project list. That row appears only while at least one such module exists.
- A module's components come from **scans**: CI/CD, manual upload, SBOM import, or deep scan. A module can also hold an operational BOM (OBOM).
- Modules have a traffic-light status that rolls up from their components.
- Module settings can **override** project-level defaults.

![The List tab of the module admin-service in the project boostME: each dependency with its version, its license and the status badges for licenses and vulnerabilities, the filters above the list, and the Component Details panel of the root component on the right.](../../../assets/images/v3/03-internal/02-modules/index-1.webp)
