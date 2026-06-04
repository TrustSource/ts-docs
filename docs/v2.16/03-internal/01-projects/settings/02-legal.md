# Legal (Project)

> [!NOTE]
> **Required role:** users with `project.legal.settings` write permission

The Legal tab defines how ***TrustSource*** evaluates license compatibility for this project.

## Fields

| Field | Description |
|---|---|
| **Commercial Aspects (CA)** | How the software is distributed — usage fee, deployment fee, per-copy fee, etc. |
| **Operating Model (OM)** | How components are integrated — standalone, linked, or embedded. |
| **IP Protection** | When enabled, licenses without explicit contributor grants are flagged as violations. |
| **IP Enforcement** | When enabled, licenses that terminate on legal defense are flagged. |

## Actions

- **Wizard mode** — guided setup that walks you through the legal configuration step by step.
- **View all requirements** — see the full obligation matrix for the current settings.
- **Import from template** — apply a pre-defined legal template.
- **Import from other project** — copy legal settings from another project.
- **Propagate** — push these settings to all modules in the project.
- **View history** — see when and by whom settings were changed.

📸 *Screenshot: the Legal tab with commercial aspects dropdown and IP protection toggle.*

## Related

- [Legal (Module)](../../02-modules/settings/02-legal.md) — module-level legal settings that can override project defaults
- [Obligations](08-obligations.md) — configuring which obligations are resolved
