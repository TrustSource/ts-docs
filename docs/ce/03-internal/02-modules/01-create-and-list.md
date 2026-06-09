# Create & List Modules

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

## Creating a module

1. Open a project (navigate to **Internal → Projects** and click the project).
2. Click **Create**.
3. Enter a **module name** (required).
4. Optionally set: module identifier, description, architecture type, tags.
5. Click **Save**.

### Architecture types

| Type | Use case |
|---|---|
| **Source Code** (default) | Your in-house code — scanned for dependencies. |
| **Infrastructure Module** | Third-party runtime (database, base image, web server). See [Infrastructure Modules](03-infrastructure-modules.md). |
| **COTS Module** | Commercial off-the-shelf software. |
| **Linked Project** | A module that links to another TrustSource project. |

### Auto-creation

Modules can be created automatically when you submit a scan via the REST API with auto-create enabled — the scanner specifies the module name, and if it does not exist yet, it is created on the fly.

📸 *Screenshot: the Create Module modal with name, identifier and architecture type fields.*

## The module list

Modules are listed within their project's overview page. The list supports **grid** and **table** views with:

- **Search** — filter by module name.
- **State filter** — OK, Warnings, Violations.
- **Tags filter** — select one or more tags.
- **Archived toggle** — show/hide archived modules.

Click any module to open the [Module Detail](02-module-detail-tabs.md).

## Related

- [Module Detail Tabs](02-module-detail-tabs.md) — what you see inside a module
- [Module Settings](settings/index.md) — configuring a module
- [Working with Scans](../../02-inbound/02-scans.md) — how data gets into a module
