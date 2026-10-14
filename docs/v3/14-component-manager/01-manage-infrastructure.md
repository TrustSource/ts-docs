# Manage Infrastructure Components

> [!NOTE]
> **Required role:** `component_manager` (an [internal role](../10-roles-permissions/02-internal-roles.md))

Infrastructure components describe the platform your software runs on: operating systems, base images, databases, web servers and message brokers. As component manager you maintain this catalogue. Open **Component mngr. → Manage IC**; everyone else sees the same list read-only under [Knowledge → Infrastructure Elements](../05-knowledge/02-infrastructure-elements.md).

## Add a component

1. Press **Add infrastructure component**.
2. Enter the **Name** (required) and optionally the **Key** (for example `im:mysql`), the **Versions** separated by commas, the **Homepage** and the **Repository**.
3. Press **Create component**.

📸 *Screenshot: the Add infrastructure component dialog.*

## Edit a component

Select a component in the list, then **Edit**. The page has four tabs:

| Tab | Content |
|---|---|
| **Info** | Key, purl, category, homepage, repository, issues and release-notes links, provider with URL and address, private flag, language, crypto algorithms, AI / ML models, declared, effective and concluded licenses, declared copyright, short description, description, comment, the commercial terms (as for [COTS](02-manage-cots.md#edit-a-component)) and the **Versions**. |
| **CPE** | CPE names assigned to the component, each with a comment; **Add CPE** and **Remove**. |
| **Crawlers** | What the crawlers collected (OSSF, GitHub, Maven Central, npm, PyPI, NuGet, end-of-life): last visit, status and information. |
| **Logs** | Who changed what, with date, version and message. |

In **Versions**, enter versions as a comma-separated list and press **Create versions**, filter them with **Filter versions**, and select several to set license, license URL and copyright for all selected at once with **Set to selected**. Selecting a filter clears earlier selections, so a bulk change reaches only visible versions.

Next to **Repository**, **DeepScan** starts a repository scan of the component and **Scorecard** requests an OpenSSF Scorecard only. After a scan, **View results** opens it read-only: the repository, its file tree, and the license and copyright findings per file. The link can be shared. See [Repository Scans](../02-inbound/05-repository-scans.md).

## Remove a component

The header offers **Soft-delete**, which marks the component as removed (find it again with the *Removed* status filter, and use **Revert-delete** to restore it), and **Delete**, which removes it for good after a confirmation.

## Where it is used

**View used as Modules** on the list shows the modules of type infrastructure that use these components. See [Infrastructure modules](../03-internal/02-modules/03-infrastructure-modules.md).

## Related

- [Knowledge → Infrastructure Elements](../05-knowledge/02-infrastructure-elements.md)
