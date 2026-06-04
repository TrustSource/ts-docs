# Releases

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

A **release** is a published, frozen version of an approved module. Once released, the SBOM is locked and ***TrustSource*** begins continuous monitoring for new vulnerabilities — even after your development team has moved on.

## Release lifecycle

1. A module goes through the [approval workflow](06-approvals/index.md).
2. The compliance manager **approves** — the snapshot is frozen.
3. The approved module appears in the **releases list** as a releasable version.
4. The release can be [linked to a product](03-products/10-link-with-release.md) as a solution.

## The releases list

Navigate to **Internal → Releases** to see all releases.

| Column | What it shows |
|---|---|
| **Approved** | Date the approval was finalized. |
| **Name** | Release name. |
| **Version** | Release version. |
| **Project / Module** | Source project and module. |
| **Contact** | The person who closed the approval. |
| **Link** | Link action to associate with a product. |

📸 *Screenshot: the releases list with approval dates and version numbers.*

## Post-release monitoring

Released modules are continuously monitored for:

- **New vulnerabilities** — CVEs published after the release date.
- **Component status changes** — licence or viability changes.
- **Export control updates** — changes to restricted classifications.

See [Post-Release Vulnerability Tracking](06-approvals/06-post-release-vulnerabilities.md) for details.

## Related

- [Approvals](06-approvals/index.md) — the workflow that creates releases
- [Products → Link with Release](03-products/10-link-with-release.md) — connecting releases to products
