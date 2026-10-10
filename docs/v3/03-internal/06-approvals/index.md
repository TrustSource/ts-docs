# Approvals

> [!NOTE]
> **Required role:** `manager` or `compliance_manager` (to start an approval, approve or reject). Any member can save a draft.

An **approval** is a formal quality gate before shipping. It captures a frozen snapshot of a module's bill of materials and runs it through review tabs covering vulnerabilities, licenses, versioning, viability, status changes, export control, capabilities and (with the `sarif` license) SW quality.

## Lifecycle

```
Draft → Review → Approve / Reject → Finalized (immutable)
```

1. Any member can save a draft approval. A **manager** or **compliance manager** starts the approval (or turns a draft into one); other members get a `403` and nothing is saved.
2. The approval is assigned to a **compliance manager**.
3. The compliance manager reviews the tabs and **approves** or **rejects**.
4. Once finalized, the approval is **frozen and immutable** — it cannot be changed.

## In this section

| Page | What it covers |
|---|---|
| [Requesting an Approval](01-request-approval.md) | How to create and submit an approval request. |
| [Approval Detail Tabs](02-approval-detail-tabs.md) | What each review tab contains (Overview plus eight tabs). |
| [Approve / Reject](03-approve-reject-workflow.md) | The decision workflow and what happens after. |
| [Binary Linking](04-binary-linking.md) | Attaching binary references to an approval. |
| [Public Approves](05-public-approves.md) | Sharing approved releases with external stakeholders. |
| [Post-Release Vulnerabilities](06-post-release-vulnerabilities.md) | Monitoring for new CVEs after a release. |

📸 *Screenshot: the approvals list with status filter and assignment column.*
