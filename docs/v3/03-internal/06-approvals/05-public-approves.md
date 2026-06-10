# Public Approves

> [!NOTE]
> **Required role:** `compliance_manager` or `manager`

Public approves let you share approved release documents with **external stakeholders** — customers, auditors, partners — without giving them a ***TrustSource*** login.

## How it works

1. After an approval is finalized, you can mark it as **public**.
2. External parties can search for the approval by **PURL** (Package URL).
3. Public documents (Notice file, SBOM, SOUP list) are accessible via a public URL.

This is useful for CRA compliance — you can provide customers with proof of your software composition without exposing your internal tooling.

📸 *Screenshot: the public approval search by PURL.*

## Related

- [Approve / Reject](03-approve-reject-workflow.md) — finalizing the approval
- [REST API → Public Routes](../../09-rest-api/05-public-routes.md) — the API behind public approves
