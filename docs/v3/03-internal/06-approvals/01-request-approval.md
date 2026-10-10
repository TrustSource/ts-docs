# Requesting an Approval

> [!NOTE]
> **Required role:** `manager` or `compliance_manager` to start an approval. Any member can save a **dry run** (a draft); other roles get a `403` when they try to start one.

You request an approval for a project and choose which of its modules, in which analysis version, go into it. A five-step wizard guides you.

## Start the wizard

- **From the approvals list:** click **Create**, choose the **Project** and click **Create approval request**, or **Dry run** to try it out.
- **From a project or module:** use the approve action on its page. For a module, the wizard opens with that module preselected.

📸 *Screenshot: the Create approval request dialog on the approvals list.*

## The five steps

| Step | What you do |
|---|---|
| **1 Settings** | Enter the **Approval Name** (required), an optional **Semantic version** (only the version of the approval, not of your product), a **Packageurl** (a valid PURL, used by the public VEX lookup) and a **description** for the compliance manager. Tick **Dry run** to see the results without sending the request to the compliance managers. |
| **2 Pick modules** | Tick the modules of the project that belong to the release. The table shows each module's state, name, components, legal, security and quality figures. |
| **3 Select analysis** | Choose the analysis (scan version) of each module. You can search by branch or tag. |
| **4 Confirm statuses** | Check state, analysis and the figures once more, then confirm. |
| **5 Finalization** | The request is created at once and the documents are generated in the background. |

Only modules of the same project, which you can see and which have a scan, can be selected.

## Finalization

The last step shows one row per document, in this order: **Compliance Report**, **SoUP**, **Notice** and **SBOM**. Each row has its own progress bar and, as soon as the document is ready, a link to open it. SoUP is skipped when the approval has no SoUP file. The SBOM is built from the scan pinned in the approval.

- **Done:** *Great! You made it!* A normal request has been forwarded to the compliance managers of your organisation; the default compliance manager, if one is set, is notified. A dry run is only visible to you under **Internal → Approvals**.
- **Failed:** *Report generation did not finish* with the reason. The approval request itself still exists; open the reports that were generated, jump to the Compliance Report, or retry.

Use **Jump to Compliance Report** to open the approval, or **Return to project**.

## What the approval contains

When the request is created, ***TrustSource*** generates and attaches:

- the **compliance report**,
- the **Notice file** — attribution document for all components,
- the **SBOM** — a snapshot of the bill of materials,
- the **SoUP file** — list of Software of Unknown Provenance (relevant with the `medical` license).

These documents are frozen when the approval is finalized.

## Turn a dry run into a request

Open the draft from the approvals list. A `manager` or `compliance_manager` sees **Create approval request** in the header; **Remove draft** deletes the dry run.

## Related

- [Approval Detail Tabs](02-approval-detail-tabs.md) — what the reviewer sees
- [Approve / Reject](03-approve-reject-workflow.md) — the decision workflow
- [Binary Linking](04-binary-linking.md) — attaching binaries to the approval
