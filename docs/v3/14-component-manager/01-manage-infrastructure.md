# Manage Infrastructure Components

> [!NOTE]
> **Required role:** `component_manager`

The infrastructure component management view lets you create, edit and maintain entries in the infrastructure catalog — cloud services, database servers, base images, web servers, message brokers and operating systems that are used alongside open-source components in your modules.

## What you can do

- **Create** new infrastructure component entries with name, version, vendor and classification.
- **Edit** existing entries — update versions, add documentation links, set lifecycle status.
- **Delete** entries that are no longer relevant.
- **Link** infrastructure components to [infrastructure modules](../03-internal/02-modules/03-infrastructure-modules.md) to track them alongside your software BOM.

📸 *Screenshot: the Manage IC list with create button and component entries.*

## Difference from the Knowledge view

The read-only [Knowledge → Infrastructure Elements](../05-knowledge/02-infrastructure-elements.md) page is available to all users and shows the full catalog. This management page adds create/edit/delete capabilities.

## Related

- [Knowledge → Infrastructure Elements](../05-knowledge/02-infrastructure-elements.md) — read-only catalog view
- [Infrastructure Modules](../03-internal/02-modules/03-infrastructure-modules.md) — how to link infrastructure components to modules
