# Approve / Reject Workflow

> [!NOTE]
> **Required role:** `compliance_manager`

## Approving

1. Review all eight tabs.
2. Click **Approve**.
3. The approval is frozen — the snapshot becomes immutable.

What happens on approval:

- The approval date and approver are recorded.
- All attached documents (Notice, SBOM, SOUP) are marked as released.
- Webhooks and notifications are triggered.
- The approved module can now be [linked to a product](../03-products/10-link-with-release.md) as a solution.

## Rejecting

1. Review the tabs and identify issues.
2. Click **Reject**.
3. Enter a **rejection reason** (required) — this feedback goes back to the project manager.
4. The approval is closed with "Rejected" status.

The project manager can address the issues and submit a new approval request.

> [!NOTE]
> Once finalized (approved or rejected), an approval **cannot be changed**. This immutability is by design — it ensures audit trail integrity.

📸 *Screenshot: the approve/reject buttons with the rejection reason dialog.*

## Related

- [The Eight Approval Tabs](02-approval-detail-tabs.md) — what to review
- [Releases](../07-releases.md) — what happens after approval
