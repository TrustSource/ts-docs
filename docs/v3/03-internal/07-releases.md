# Releases

> [!NOTE]
> **Required role:** `developer`, `compliance_manager` or `manager` (the **Internal** menu). Creating release keys needs `compliance_manager`, `manager` or `account_admin`.

A **release** is an approved approval: a frozen set of module analyses with its SBOM, notice file and compliance report. Once released, ***TrustSource*** keeps tracking new vulnerabilities in its components, even after your development team has moved on.

## Release lifecycle

1. A project or module goes through the [approval workflow](06-approvals/index.md).
2. A compliance manager **approves**; the approval is closed.
3. The approval appears in the **releases list**, and a [release key](06-approvals/05-public-approves.md) is published for it.
4. You can reuse the release in another project with **Link**, or connect it to a product on the product's Solutions tab. See [Link with Release](03-products/10-link-with-release.md).

## The releases list

Navigate to **Internal → Releases** to see all approved module releases, newest first. The selector in the header narrows the list to one project (**All modules of** *project*) or one module; **All company projects** shows everything.

| Column | What it shows |
|---|---|
| **Approved** | Date the approval was approved. |
| **Name** | Name of the approval. |
| **Version** | Version of the approval. |
| **Project/Module** | Source project or module; click to open it. |
| **Contact** | The person who approved it. |
| (last column) | **Link**: reuse the release in a project. |

Click a row to open the release.

A project has its own releases page as well: open it from the **Releases** tile on the project page. It lists only that project's releases (**All modules of** *project* or one module), shows how many approvals of the project are still pending with a link to **Open approvals**, and offers **Start approval** to `manager` and `compliance_manager`.

📸 *Screenshot: the releases list with approval dates and version numbers.*

### Link a release into a project

**Link** opens the dialog **Link release**. Choose the **Project, that contains selected release** and click **Update**. ***TrustSource*** creates a module in that project that stands for the release (name and version of the approval, with its modules and the dependencies from its SBOM). Use it when one product builds on a released component of another project.

## Release details

The header shows the name, **Packageurl** and description of the release, and the buttons:

- **SBOM** opens the SBOM file of the release.
- **Binary links** shows the binary links of the release, read-only. See [Binary Linking](06-approvals/04-binary-linking.md).
- **Published keys** lists the release keys, lets you copy, publish, unpublish or delete them, and creates new ones with **Create new key**. See [Public Approves](06-approvals/05-public-approves.md).
- **Approved** shows who approved the release and when.

| Tab | What it shows |
|---|---|
| **Overview** | **Modules**, **Components**, **Component status changes**, **Components outdated**, **Legal actions resolved**, **Vulnerabilities resolved**, **Notice file completed** and (with SoUP reports) **SOUP list completed**, followed by the modules table. |
| **New vulnerabilities** | Vulnerabilities found in the released components since the approval, with **Export as CSAF**. See [Post-Release Vulnerability Tracking](06-approvals/06-post-release-vulnerabilities.md). |
| **Vulnerabilities** | The vulnerabilities as known at approval. |
| **Export control** | The crypto algorithms detected in the release. |

## Related

- [Approvals](06-approvals/index.md): the workflow that creates releases
- [Post-Release Vulnerability Tracking](06-approvals/06-post-release-vulnerabilities.md): new CVEs in released versions
- [Products → Link with Release](03-products/10-link-with-release.md): connecting releases to products
