# Compliance approvals

> Request an approval for a scanned module, read it, and approve or reject it. An approved approval is a release.

## Use cases

- Request an approval from the release pipeline as soon as the build is tagged.
- Approve or reject from an external review workflow.
- Read the approval's notice file and binary links for the release notes.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| POST | `/compliance/approvals` | Create approval request | `manager` |
| GET | `/compliance/approvals/{approval_id}` | Get approval details | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/compliance/approvals/{approval_id}/approve` | Approve | `compliance_manager` |
| POST | `/compliance/approvals/{approval_id}/reject` | Reject | `compliance_manager` |

## Creating an approval request

`POST /compliance/approvals` creates an approval for the module of one scan, using the latest analysis of that scan.

| Field | Required | Content |
|---|---|---|
| `scanId` | Yes | The scan to approve, from `POST /core/scans` or an import |
| `name` | Yes | Approval or product name |
| `version` | No | Version of the approval |
| `description` | No | Message to the compliance manager |
| `draft` | No | `true` creates a dry run that is not sent to the compliance managers |

It answers `201` with `{"approveId": "..."}`, or `404` if the scan or its module is unknown.

## Reading an approval

`GET /compliance/approvals/{approval_id}` returns `_id`, `name`, `created`, `initiatorName`, `draft`, `url` (link to the module in the app), `binaryLinks` and, once generated, `noticeFile` (`name`, `url`, `type`).

## Approving and rejecting

- `POST .../approve` needs no body. It answers `200` with `{"updated": ...}`. The approval becomes a release and appears under **Internal → Releases**.
- `POST .../reject` needs `{"reason": "..."}`. Without it the call answers `400` `"\"reason\" is required for /reject action"`.

Both operations act in the name of the key; the key name is recorded as the person who closed the approval. On approval, notifications are sent and webhooks with the **Approval** trigger fire.

## Related

- [Approvals](../../03-internal/06-approvals/index.md) - the approval workflow in the app
- [Compliance releases](compliance-releases.md) - documents of approved releases
- [Example: curl](../04-examples-curl.md)
- [Endpoint groups](index.md)
