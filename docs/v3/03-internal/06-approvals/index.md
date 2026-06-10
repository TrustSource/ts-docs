# Approvals

> [!NOTE]
> **Required role:** `compliance_manager` (to approve/reject), `manager` or `developer` (to request)

An **approval** is a formal quality gate before shipping. It captures a frozen snapshot of a module's bill of materials and runs it through eight review tabs covering vulnerabilities, licenses, versioning, viability, changes, export control, tests and capabilities.

## Lifecycle

```
Draft → Review → Approve / Reject → Finalized (immutable)
```

1. A **project manager** or **developer** creates a draft approval.
2. The draft is submitted for review → assigned to a **compliance manager**.
3. The compliance manager reviews all eight tabs and **approves** or **rejects**.
4. Once finalized, the approval is **frozen and immutable** — it cannot be changed.

## In this section

| Page | What it covers |
|---|---|
| [Requesting an Approval](01-request-approval.md) | How to create and submit an approval request. |
| [The Eight Approval Tabs](02-approval-detail-tabs.md) | What each review tab contains. |
| [Approve / Reject](03-approve-reject-workflow.md) | The decision workflow and what happens after. |
| [Binary Linking](04-binary-linking.md) | Attaching binary references to an approval. |
| [Public Approves](05-public-approves.md) | Sharing approved releases with external stakeholders. |
| [Post-Release Vulnerabilities](06-post-release-vulnerabilities.md) | Monitoring for new CVEs after a release. |

📸 *Screenshot: the approvals list with status filter and assignment column.*
