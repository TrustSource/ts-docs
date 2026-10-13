# CSAF

> [!NOTE]
> **Who can do what:**
> - Create and import documents: Manager, Compliance manager, Company security manager, Account admin
> - Edit and delete drafts: Compliance manager, Company security manager, Account admin
> - Publish to the CSAF provider: Company security manager
> - Manage CSAF feed keys: Account admin
>
> The **Outbound** menu itself is shown to Compliance manager, Manager and Account admin. A user who is only Company security manager opens the page at `https://<your-host>/csaf`.

CSAF (Common Security Advisory Framework) documents are machine-readable security advisories. ***TrustSource CE*** creates, imports and edits CSAF 2.0 documents, including **VEX** documents that state for each vulnerability whether your product is affected. It checks them against the CSAF 2.0 schema, publishes them to a CSAF provider you operate, and serves them to selected recipients through feed keys.

## The CSAF list

Open **Outbound → CSAF**. The page lists the CSAF files of your company.

| Column | Meaning |
|---|---|
| **Created** | When the document was created or imported. |
| **Name** | The published file name, or the document name while it is a draft. |
| **Status upd.** | When the status last changed. |
| **Status** | `DRAFT`, `PUBLISHED` or `FAILED` (publishing failed). |
| **Reason** | Why publishing failed. |
| (actions) | Publish (Company security manager), the edit menu (**All fields**, **JSON**, **via "Create wizard"**) and delete (drafts only). |

The buttons **Published**, **Draft** and **Failed** show or hide each status. Click a row to open the document.

📸 *Screenshot: the CSAF list with status filter.*

## Create a document

**Create** opens the wizard *Create CSAF*. Move with **Previous** and **Next**; **Save** stores the draft at any step.

1. **Type**: Informational Advisory, Security Advisory, VEX or Security Incident.
2. **Meta**: title, CSAF version (2.0), category, language, and the sections Document acknowledgments, Aggregate severity, Rules for sharing document (including the **Label of TLP**), Document notes, Publisher, Document references and Tracking.
3. **Affected**: tick the affected **Products** or **Modules**.
4. **Vulnerabilities**: search a vulnerability (for example `CVE-2021-33044`) in the Vulnerability Lake and add it.
5. **Remediations**: per vulnerability, set the **Product status** (for example *Known affected*, *Known not affected*, *Fixed*) for the affected products and add remediations.

VEX documents are also created from vulnerability data:

- **Export as CSAF** on the **New vulnerabilities** tab of a [release](../03-internal/07-releases.md) creates a VEX draft for the new vulnerabilities and downloads it.
- The [vulnerability report](../03-internal/04a-vulnerability-report.md) can create a CSAF document from its findings.

📸 *Screenshot: step 1 Type of the Create CSAF wizard.*

## Import a document

**Import** opens *Import CSAF*. Select a CSAF file (`.json`) and click **Import**. The file is checked against the CSAF 2.0 schema; an invalid file is refused with the validation messages. The import is stored as a draft.

## Edit a document

The document page has the tabs **Meta information**, **Affected** (branches, full product names, product groups, relationships), **Remediation**, **History** and **JSON**. Each editing tab has **Save** and **Discard**. In **JSON** you edit the raw document. **History** lists the changes made to the document.

## Publish to your CSAF provider

Publishing uploads the document to a CSAF provider (trusted provider directory) that you run next to TrustSource CE. The operator configures it with three environment variables; all three are required:

| Setting | Purpose |
|---|---|
| `TS_CSAF_PROVIDER_URL` | Base URL of the provider, `http://` or `https://`. |
| `TS_CSAF_PROVIDER_PASSPHRASE` | Passphrase sent with each upload. |
| `TS_CSAF_PROVIDER_PASSWORD` | Password the provider authenticates the upload with. |

See [Environment variables](../01-installation-setup/03-environment-variables.md). Without them, **Publish** answers with *CSAF provider is not configured* and names every missing variable.

To publish:

1. Click **Publish** (in the list or the document header).
2. Enter a **Summary of the revision**; it is required.
3. Confirm with **Yes, publish it!**

TrustSource CE then:

- adds a revision to the tracking history, increases the version and sets the current release date;
- on the first publish, assigns the tracking id `<prefix>-<year>-<number>`, for example `tsvx-2026-00001` (prefixes: `tssa` security advisory, `tsvx` VEX, `tsia` informational advisory, `tssi` security incident);
- checks the document against the CSAF 2.0 schema;
- uploads it to `<TS_CSAF_PROVIDER_URL>cgi-bin/provider/api/upload` and sets the document's `self` reference to `<TS_CSAF_PROVIDER_URL>.well-known/csaf/white/<year>/<tracking id>.json`.

The status becomes `PUBLISHED`; if the provider refuses the upload, `FAILED` with the reason. A published document can be updated with **Publish updated version**.

> [!WARNING]
> TrustSource CE always uploads to the provider's `white` (public) directory, whatever TLP label the document carries. Do not publish advisories that must stay restricted; hand them to recipients through [feed keys](#share-documents-through-feed-keys) instead.
>
> A published document cannot be deleted. Publish a corrected version instead.

## Delete a draft

The delete button (list) or **Remove** (document header) asks for confirmation in *Remove CSAF*. For VEX documents you can also:

- **unmute the vulnerabilities covered in this document** in the affected modules, and
- **re-open risks from vulnerability assignment**.

## Share documents through feed keys

A **CSAF feed key** gives a recipient read access to your documents by TLP level, without a login. Create keys under **Administration → API keys → CSAF feed keys**: give each key a name and at least one **TLP level** (WHITE, GREEN, AMBER, RED). See [CSAF feed keys](../06-administration/04c-csaf-feed-keys.md).

| Request | Returns |
|---|---|
| `GET https://<your-host>/api/v2/compliance/csaf/{key}/documents` | The documents the key may read, newest published first: id, tracking id, title, category, TLP, publish date. |
| `GET https://<your-host>/api/v2/compliance/csaf/{key}/documents/{id}` | One document as CSAF JSON. |

What a recipient gets:

- Every document whose TLP label is one of the key's levels, **drafts included**, in its current state. A document without a TLP label is never served.
- A document the key may not read is answered with `404`, the same as one that does not exist. An unknown or unpublished key gets `404` too.
- Each read is counted on the key.

> [!WARNING]
> Because feed keys also serve drafts, keep unfinished advisories on a TLP level that no external key holds, or give recipients keys only for levels whose documents are ready.

## VEX for releases

Every [release](../03-internal/07-releases.md) has a CSAF VEX document that holders of its release key read from `/api/v2/compliance/releases/{release_key}/csaf` (all vulnerabilities) and `/csaf-changes` (changes since the release). These documents are generated on request, carry an HMAC integrity check that only your installation can verify, and are not stored in the CSAF list. See [Public Approves](../03-internal/06-approvals/05-public-approves.md).

## Related

- [Background: VEX in CSAF](../../shared/background/11-vex-csaf-vex.md)
- [Products](../03-internal/03-products/index.md): products referenced in CSAF documents
- [Vulnerability Lake](../05-knowledge/04-vulnerability-lake.md)
- [Verify](05-verify.md): check the signature of a release VEX
