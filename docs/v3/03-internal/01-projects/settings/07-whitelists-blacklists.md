# Whitelists & Blacklists (Project)

> [!NOTE]
> **Required role:** users with write permission on project allow/deny settings

The Allow/Deny tab lets you define which licenses and components are explicitly permitted or forbidden in this project.

## Sections

### Enforce allow list

When enabled, **every** license must be on the allow list to pass — anything not explicitly allowed is treated as a violation. When disabled, only items on the deny list are flagged.

### Licenses

| List | Effect |
|---|---|
| **Always Allow** | These licenses are always OK, regardless of other rules. |
| **Always Deny** | These licenses are always a violation. |

### Components

| List | Effect |
|---|---|
| **Always Allow** | These specific components (by name/version) are always permitted. |
| **Always Deny** | These components are always forbidden. |
| **Unchanged** | Components marked as unchanged — skip re-evaluation on scan. |
| **Loosely Coupled** | Components marked as loosely coupled (affects legal evaluation). |

📸 *Screenshot: the Whitelists tab with license allow and deny lists.*

## Related

- [Whitelists & Blacklists (Module)](../../02-modules/settings/14-whitelists-blacklists.md) — module-level overrides
- [Open Source Policy](../../../05-knowledge/07-open-source-policies.md) — company-wide policy rules
