# Approve / Reject Workflow

> [!NOTE]
> **Required role:** `compliance_manager` sees the **Approve** and **Reject** buttons. Over the API, `manager` can approve as well.

## Where you decide

You can decide in two places: on a row of the approvals list, or in the header of the approval after you have reviewed its tabs. Both show the same two buttons for requests that are not drafts and not yet closed.

### Take the request

The list column **Assigned to** shows who owns the request. A compliance manager clicks **assign to me** to take it, or the name with the cross to hand it back. Assignments are written to the [Audit Logs](../../06-administration/07-audit-logs.md).

## Approving

1. Review the tabs.
2. Click **Approve** and confirm *Yes, approve it!* The dialog warns that you cannot revert this.
3. The approval is frozen — the snapshot becomes immutable.

What happens on approval:

- The approval date and approver are recorded and shown on the **Approved** badge.
- The scans and analyses of the approved modules are marked as released.
- A **public release key** is created and published for the approval. If the request is approved a second time (for example through the API), the existing key is returned, so there is never more than one. The key serves the SBOM, notice and CSAF documents of the release; see [Release keys](../../06-administration/04b-release-keys.md).
- Managers who have approval events enabled in their notification settings receive a message and e-mail with the result, and the webhook triggers `approval` and `release` fire.
- The approved module can now be [linked to a product](../03-products/10-link-with-release.md) as a solution.

Over the API, `GET /compliance/approvals/{approval_id}` returns the status, who closed the approval and the release key with its URLs; see [Compliance approvals](../../09-rest-api/endpoints/compliance-approvals.md).

## Rejecting

1. Review the tabs and identify issues.
2. Click **Reject**.
3. Enter a **rejection reason** in the dialog. A reason is required: without one you get *You are not allowed to reject without reason!*
4. The approval is closed with the **Rejected** badge; hover over it to read the reason.

The project manager can address the issues and submit a new approval request.

> [!NOTE]
> Once finalized (approved or rejected), an approval **cannot be changed**. This immutability is by design — it ensures audit trail integrity.

📸 *Screenshot: the reject dialog with the reason field.*

## Related

- [Approval Detail Tabs](02-approval-detail-tabs.md) — what to review
- [Releases](../07-releases.md) — what happens after approval
- [Public Approves](05-public-approves.md) — sharing the release documents
