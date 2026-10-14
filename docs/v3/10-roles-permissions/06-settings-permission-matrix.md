# Settings Permission Matrix

Field-level permissions for the **project** settings tabs. Which role may read, edit or run what in a tab depends on the role and, for some roles, on the relationship to the project. The module settings are on the [next page](06a-module-settings-matrix.md).

> [!NOTE]
> The tables are generated from the permission definitions of the app. A tab or button only appears when the matching right includes `r`; a field is editable only with `w`.

📸 *Screenshot: the project settings tabs with a read-only field and an editable field.*

## How to read the tables

Every setting carries a **rights code**: a combination of these letters.

| Code | Capability | Meaning |
|---|---|---|
| `r` | view | You can see the setting. |
| `w` | edit | You can change the value. |
| `x` | run | You can run an action on it, such as import, propagate, export or delete. |
| `d` | delete | You can delete entries. |

Codes combine: `rw` = view and edit, `rwd` = view, edit and delete, `rx` = view and run. `-` means the setting exists but the role has no access.

Column headings use these abbreviations:

| Abbreviation | Role |
|---|---|
| **Dev** | Developer |
| **CM** | Compliance manager |
| **PM** | Portfolio manager |
| **Mgr** | Manager |
| **AA** | Account admin |
| **EA** | Enterprise admin |
| **CCM** | Company component manager |
| **CSM** | Company security manager |

Roles are combined with **OR**: if any of your roles grants a right, you have it. See [Permission Model](03-permission-model.md).

> [!NOTE]
> The **MDR/IVDR Classification** tab is shown only for companies with the Medical account type, whatever the rights say. Setting names are the technical names used by the app.

## Project settings: base rights

Each heading is a tab in the project settings.

### General

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| name | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `r` |
| description | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `r` |
| tags | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `r` |
| leanix | `r` | `r` | `r` | `r` | `rw` | `r` | `r` | `r` |
| relatedUsers › defaultProjectManager | `r` | `r` | `rw` | `r` | `r` | `r` | `r` | `r` |
| relatedUsers › defaultComplianceManager | `r` | `r` | `rw` | `r` | `r` | `r` | `r` | `r` |
| relatedUsers › members | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `r` |

### Legal

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `r` |
| wizard | - | - | - | - | - | - | - | - |
| import_template | - | - | - | - | - | - | - | - |
| import | - | - | - | - | - | - | - | - |
| propagate | - | - | - | - | - | - | - | - |

### Obligations

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| list | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `r` |
| import | - | - | - | - | - | - | - | - |
| propagate | - | - | - | - | - | - | - | - |

### MDR/IVDR Classification

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `r` |
| import_template | - | - | - | - | - | - | - | - |
| import | - | - | - | - | - | - | - | - |
| propagate | - | - | - | - | - | - | - | - |

### CIA

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| import | - | - | - | - | - | - | - | `rx` |

### Capabilities

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| import | - | - | - | - | - | - | - | `rx` |

### Crypto management

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `r` |
| import | - | - | - | - | - | - | - | - |

### End-of-life

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `r` |
| import | - | - | - | - | - | - | - | - |

### Quality

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `r` |
| import | - | - | - | - | - | - | - | - |

### OBOM

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `r` | `r` |
| import | - | - | - | - | - | - | - | - |

### Allow/Deny

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| enforce | `r` | `rw` | `r` | `r` | `r` | `r` | `r` | `r` |
| whitelist_license_approve | - | `rx` | - | - | - | - | - | - |
| whitelist_license | `r` | `rw` | `r` | `r` | `r` | `r` | `r` | `r` |
| whitelist_component_approve | - | `rx` | - | - | - | - | - | - |
| whitelist_component | `r` | `rw` | `r` | `r` | `r` | `r` | `r` | `r` |
| blacklist_license | `r` | `rw` | `r` | `r` | `r` | `r` | `r` | `r` |
| blacklist_component | `r` | `rw` | `r` | `r` | `r` | `r` | `r` | `r` |

### Issue Integration

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| switch | `r` | `r` | `r` | `r` | `rw` | - | - | - |
| project | `r` | `r` | `r` | `r` | `rw` | - | - | - |
| jira › switch | `r` | `r` | `r` | `r` | `rw` | - | - | - |
| jira › settings | `r` | `r` | `r` | `r` | `rw` | - | - | - |
| jira › active | `r` | `r` | `r` | `r` | `rw` | - | - | - |
| tfs › settings | `r` | `r` | `r` | `r` | `rw` | - | - | - |
| tfs › active | `r` | `r` | `r` | `r` | `rw` | - | - | - |
| github › settings | `r` | `r` | `r` | `r` | `rw` | - | - | - |
| github › active | `r` | `r` | `r` | `r` | `rw` | - | - | - |

### Module import

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| import | `r` | `r` | `r` | `r` | - | - | - | - |

### Danger Operations

| Setting | Dev | CM | PM | Mgr | AA | EA | CCM | CSM |
|---|---|---|---|---|---|---|---|---|
| delete | - | - | - | - | - | - | - | - |

## Rights that depend on your relationship to the project

The tables above show the **base** rights. Three roles get different rights depending on how they relate to the project:

| Context | When it applies |
|---|---|
| **Default owner** | A **Manager** or **Compliance manager** is the default project manager or default compliance manager of the project, or the project has none assigned. |
| **Member** | A **Developer** is listed in the members of the project. |
| **Non-member** | A **Developer** is not a member while the project has members. |

The next tables list only settings where at least one of these contexts differs from the base. All other roles always have their base rights.

### Context rights: General

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| name | `r` | `r` | `r` | `r` | `rw` | `r` | `rw` |
| description | `r` | `r` | `r` | `r` | `rw` | `r` | `rw` |
| tags | `r` | `r` | `r` | `r` | `rw` | `r` | `rw` |
| leanix | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| relatedUsers › defaultProjectManager | `r` | `r` | `r` | `r` | `rw` | `r` | `rw` |
| relatedUsers › defaultComplianceManager | `r` | `r` | `r` | `r` | `rw` | `r` | `rw` |
| relatedUsers › members | `r` | `r` | `r` | `r` | `rw` | `r` | `rw` |

### Context rights: Legal

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `rw` | `r` | `rw` |
| wizard | - | - | - | - | `rx` | - | `rx` |
| import_template | - | - | - | - | `rx` | - | `rx` |
| import | - | - | - | - | `rx` | - | `rx` |
| propagate | - | - | - | - | `rx` | - | `rx` |

### Context rights: Obligations

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| list | `r` | `r` | `r` | `r` | `rw` | `r` | `rw` |
| import | - | - | - | - | `rx` | - | `rx` |
| propagate | - | - | - | - | `rx` | - | `rx` |

### Context rights: MDR/IVDR Classification

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `rw` | `r` | `rw` |
| import_template | - | - | - | - | `rx` | - | `rx` |
| import | - | - | - | - | `rx` | - | `rx` |
| propagate | - | - | - | - | `rx` | - | `rx` |

### Context rights: CIA

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| import | - | - | - | - | - | - | `rx` |

### Context rights: Capabilities

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| import | - | - | - | - | - | - | `rx` |

### Context rights: Crypto management

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| import | - | - | - | - | - | - | `rx` |

### Context rights: End-of-life

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| import | - | - | - | - | - | - | `rx` |

### Context rights: Quality

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| import | - | - | - | - | - | - | `rx` |

### Context rights: OBOM

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| settings | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| import | - | - | - | - | - | - | `rx` |

### Context rights: Allow/Deny

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| enforce | `r` | `r` | `r` | `rw` | `rw` | `r` | `rw` |
| whitelist_license_approve | - | - | - | `rx` | `rx` | - | `rx` |
| whitelist_license | `r` | `r` | `r` | `rw` | `rw` | `r` | `rw` |
| whitelist_component_approve | - | - | - | `rx` | `rx` | - | `rx` |
| whitelist_component | `r` | `r` | `r` | `rw` | `rw` | `r` | `rw` |
| blacklist_license | `r` | `r` | `r` | `rw` | `rw` | `r` | `rw` |
| blacklist_component | `r` | `r` | `r` | `rw` | `rw` | `r` | `rw` |

### Context rights: Issue Integration

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| switch | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| project | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| jira › switch | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| jira › settings | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| jira › active | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| tfs › settings | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| tfs › active | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| github › settings | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |
| github › active | `r` | `r` | `r` | `r` | `r` | `r` | `rw` |

### Context rights: Module import

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| import | `r` | `r` | `r` | `r` | `rx` | `r` | `rx` |

### Context rights: Danger Operations

| Setting | Dev base | Dev member | Dev non-member | CM base | CM default owner | Mgr base | Mgr default owner |
|---|---|---|---|---|---|---|---|
| delete | - | - | - | - | - | - | `rx` |

## Related

- [Module settings matrix](06a-module-settings-matrix.md)
- [Permission Model](03-permission-model.md)
- [Functions by Role](05-functions-by-role.md)
- [Project Settings](../03-internal/01-projects/settings/index.md)
