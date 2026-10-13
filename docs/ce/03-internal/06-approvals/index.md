# Approvals

> [!NOTE]
> **Required role:** the **Approvals** menu is shown to Compliance manager and Manager. Only a Compliance manager sees the **Approve** and **Reject** buttons in the app.

An **approval** is a formal quality gate before shipping. It captures a frozen snapshot of selected module analyses and runs it through review tabs covering vulnerabilities, licenses, versioning, viability, status changes, export control, capabilities and SW quality. An approved request becomes a [release](../07-releases.md).

## Lifecycle

```
Dry run (draft) → Open request → Approved / Rejected (immutable)
```

1. A user starts the approval wizard for a project or a module, either as a **Dry run** or as a real request. See [Requesting an Approval](01-request-approval.md).
2. A real request is offered to the compliance managers; it is assigned to the project's default compliance manager if one is set.
3. A compliance manager reviews the tabs and **approves** or **rejects**.
4. Once decided, the approval cannot be changed.

## The approvals list

Open **Internal → Approvals**. The page **Your approvals** lists the requests, newest first, and opens an approval when you click a row. A Compliance manager sees every request of the company. A Manager sees the requests of the projects they manage (projects without assigned users, or where they are the default project manager) and their own dry runs.

The selector in the filter row narrows the list to **My requests** (assigned to you, the default), **Unassigned** or **All requests**.

| Column | Meaning |
|---|---|
| **Initiated** | When the request was created. |
| **Assigned to** | The compliance manager who owns the request. A compliance manager can click **assign to me**, or the name with the cross to hand it back. |
| **Project/Module** | What is being approved; click to open it. |
| **Modules**, **Name**, **Version** | Number of modules, name and version of the request. |
| **Initiated by** | Who created it. |
| **Notice** | How far the notice file of the request is completed, in percent. |
| (last column) | **Approve** and **Reject** for open requests (Compliance manager), **Remove DRAFT** for dry runs, or the result with approver and date. |

The status buttons above the list show or hide each state:

| Button | Status |
|---|---|
| **Open** | Waiting for a decision. |
| **Approved** | Approved. |
| **Rejected** | Rejected; hover over the badge to read the reason. |
| **Draft** | A dry run that was not sent to the compliance managers. |

A request is a draft whatever else is set on it; otherwise it counts as approved, then rejected, otherwise open.

**Create** in the header starts the [approval wizard](01-request-approval.md) for a project.

📸 *Screenshot: the approvals list with status filter and assignment column.*

## In this section

| Page | What it covers |
|---|---|
| [Requesting an Approval](01-request-approval.md) | The project and module wizards, dry runs and report generation. |
| [Approval Detail Tabs](02-approval-detail-tabs.md) | What each review tab contains (Overview plus eight tabs). |
| [Approve / Reject](03-approve-reject-workflow.md) | The decision workflow and what happens after. |
| [Binary Linking](04-binary-linking.md) | Links to the built artifacts on scans, approvals and notice files. |
| [Public Approves](05-public-approves.md) | Sharing release documents with release keys. |
| [Post-Release Vulnerabilities](06-post-release-vulnerabilities.md) | New vulnerabilities in released versions and alerts. |

SOUP lists and medical-device classification are not part of TrustSource CE. See [CE and SaaS compared](../../13-ce-vs-saas.md).
