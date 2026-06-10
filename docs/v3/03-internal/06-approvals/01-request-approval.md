# Requesting an Approval

> [!NOTE]
> **Required role:** `developer`, `manager` or `compliance_manager`

## How to request an approval

1. Navigate to the module you want to approve (or use **Internal → Approvals → Create**).
2. Click **Approve** in the module header, or **Create** in the approvals list.
3. Fill in: name, version, description, select project and module(s).
4. Optionally add a PURL (Package URL) and binary links.
5. Choose **Save as Draft** or **Submit for Review**.

When submitted, the approval is assigned to the project's compliance manager and notifications are sent.

📸 *Screenshot: the approval creation form with name, version and module selection.*

## What happens on creation

***TrustSource*** automatically generates:

- **Notice file** — attribution document for all components
- **SBOM** — Software Bill of Materials snapshot
- **SOUP file** (if `medical` license is active) — Software of Unknown Provenance list

These documents are attached to the approval and frozen when the approval is finalized.

## Related

- [The Eight Approval Tabs](02-approval-detail-tabs.md) — what the reviewer sees
- [Approve / Reject](03-approve-reject-workflow.md) — the decision workflow
