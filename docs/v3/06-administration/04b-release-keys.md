# Release keys

> [!NOTE]
> **Required role:** `account_admin`, `manager` or `compliance_manager`

A **release key** lets someone fetch the documents of one approved release without a ***TrustSource*** login or API key. Use it to ship the key with your product, for example as a QR code on a device without a display.

Anyone who holds the key can read what it serves. Treat it like a password and see [Public routes](../09-rest-api/05-public-routes.md).

## Before you start

You need at least one **approved release**. Without one, **Create New** stays disabled and the page shows "No approved releases available to start publish". See [Approve / Reject](../03-internal/06-approvals/03-approve-reject-workflow.md).

## Which documents a key serves

A release key serves the documents of its release under `https://api.trustsource.io/v2/compliance/releases/{release_key}/...`:

| Scope | Route | Content |
|---|---|---|
| `sbom` | `/sbom` | The SBOM of the release. |
| `notice` | `/notice` | The notice file. |
| `csaf` | `/csaf`, `/csaf-changes` | The CSAF VEX document and its change log. |

The scope decides which of these routes answer. A key without a scope serves all of them.

## Create and publish a key

1. Open **Administration → API keys** and select the **Release keys** card. The **API keys** menu entry is also shown to `manager` and `compliance_manager`, who see the **Release keys** card.
2. Select **Create New**. The key starts unpublished and points at your latest approved release.
3. Choose the **release** in the first drop-down.
4. Choose the **scope**: any of `sbom`, `notice`, `csaf`.
5. Select **Publish**.

While a key is published, its release and scope are locked. To change them, unpublish the key first.

> [!NOTE]
> If your account requires scopes, **Publish** asks for at least one.

## Preview, URL and QR code

- The eye button opens a preview of the SBOM, the notice or the CSAF document.
- The QR button, available for a published key, shows the URL and a QR code for the SBOM, the notice or the CSAF document.
- The green badge **Requested: n** on a published key counts how often the key was used.

## Unpublish and delete

The red button depends on usage. A key that was requested at least once shows **Unpublish**; a key that was never requested shows **Delete**. A deleted key cannot be restored.

## Keys created by approvals

When a request is approved, in the app or through the API, ***TrustSource*** creates a published release key for it. Approving the same request again returns that key instead of adding another. `GET /compliance/approvals/{approval_id}` returns the key and the URLs it serves. See [Compliance approvals](../09-rest-api/endpoints/compliance-approvals.md).

## Related

- [Public routes](../09-rest-api/05-public-routes.md)
- [Public approves](../03-internal/06-approvals/05-public-approves.md)
- [Approve / Reject](../03-internal/06-approvals/03-approve-reject-workflow.md)
- [API keys](04-api-keys.md)
