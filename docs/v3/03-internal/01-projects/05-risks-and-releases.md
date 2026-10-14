# Risks and Releases of a Project

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`. **Risks** needs the `risks` license.

The **Risks** and **Releases** tiles on the [project page](02-project-overview.md) open pages that are limited to this project. They work like the company-wide pages, but you cannot leave the project.

## Risks

The tile shows the number of open risks, chips for the largest groups, the number of accepted risks, the threat model status (with the `threat` license) and the project's CIA rating. If the project has no risks, **Add risk** creates the first one (managers and compliance managers). With the `threat` license, managers and compliance managers also get a **Threat model** button on the tile that opens the options for generating a threat model.

The **Risks** page lists the risks of the project and its modules. Use the module list in the header to narrow it to one module. Above the list, the panel **Threat models** (with the `threat` license) shows the project's threat models; **Generate threat model** starts a new one (managers and compliance managers) and shows progress while it runs. The company-wide Overview and Tasks tabs are not shown here.

See [Risks](../05-risks/index.md) and [Threat Models](../08-threat-models/index.md).

## Releases

The tile shows the number of releases, pending approvals and the latest release with the number of modules it covers. **Start approval** (managers and compliance managers) opens the project approval wizard to create an [approval](../06-approvals/index.md) request or a dry run for the project.

The **Releases** page lists the approved releases of the project; the module list narrows it to one module. See [Releases](../07-releases.md).

## Related

- [Project overview](02-project-overview.md)
