# General (Module)

> [!NOTE]
> **Required role:** everyone who can open the module sees the tab. Who may change a field is listed [below](#who-can-change-what); the full list is in the [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md).

The General tab holds the identity of a ***TrustSource*** module: what it is called, which project it belongs to, who looks after it and how reliable its vulnerability findings must be. The header shows the module name (with a LeanIX link, if the module is linked) and a **Follow** action.

## Fields

| Field | What you enter |
|---|---|
| **Name** | 1-200 characters, no `<` or `>`. Example: `payment-service`. |
| **Version** | Infrastructure modules only. Changing it also updates the linked infrastructure or COTS component and marks the module for a new analysis. |
| **Description** | Up to 2000 characters. |
| **Assigned Project** | The project the module belongs to. `-- unassigned --` detaches it. |
| **Type of architecture** | `Frontend-UI-Module`, `Frontend-Endpoint`, `Frontend-Service`, `Backend-Service`, `Backend-Endpoint`, `System component`, `Infrastructure Service` or `Distributable Component`. |
| **Tags** | Company tags. If the company has none, a link to the company tags opens instead. |
| **Default project manager** | The user responsible for the module. |
| **Default compliance manager** | The user who reviews and approves its releases. |
| **Members** | Users working on the module. |
| **Link with LeanIX** | Select a LeanIX fact sheet. Without a LeanIX connection, the field shows **Update LeanIX settings** instead. |
| **Privacy** | Infrastructure modules only: `Open source` or `Private`. |
| **Module Identifier** | Read-only. The key that scans and the API use to find the module. |
| **Default confidence level** | `High only`, `Medium +` or `All`. Findings below this level are ignored. |
| **Repository** | URL of the source repository. |

Click **Update** to save. A toast confirms *Module settings changed!*.

## Confidence level and inheritance

If you leave **Default confidence level** empty, the module inherits the value of its project, and the project in turn the company default. A hint under the field says where the value comes from, for example *Inheriting from project: Medium +*. Setting a value here overrides both for this module only.

## Run a repository scan

Next to **Update**, **View/execute repository scan** opens the [Repository Scans](../../../02-inbound/05-repository-scans.md) page with this module's **Repository** prefilled. Until you enter a repository URL, a disabled **View/execute deepScan** button shows instead. Both buttons appear only to users who may edit the tab.

## Who can change what

A manager or compliance manager can edit only if they are the module's default project manager or default compliance manager, or if none is set for the module. Everyone else with a different role reads only.

| Field | Who can edit |
|---|---|
| Name, Version, Description, Default confidence level, Repository, Link with LeanIX | Developers and managers. |
| Assigned Project, Tags | Developers, managers and compliance managers. Portfolio managers can also change Tags. |
| Type of architecture, Privacy, Members | Managers and compliance managers. |
| Default project manager, Default compliance manager | Managers, compliance managers and portfolio managers. |

> [!TIP]
> An infrastructure module hides the tabs for Quality, Crypto management, AI / ML, Allow/Deny, Capabilities, MDR/IVDR Classification, Custom components, History and Export SPDX. See [Infrastructure Modules](../03-infrastructure-modules.md).

![The General tab: Name, Description, Assigned Project mAIfit-app, Type of architecture, Tags with the link to the company tags, Default project manager, Default compliance manager, Members, Link with LeanIX, Module Identifier, Default confidence level and Repository, with the Update and View/execute deepScan buttons.](../../../../assets/images/v3/03-internal/02-modules/settings/01-general-1.webp)
