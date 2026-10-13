# Notice Files

> [!NOTE]
> **Required role:** Compliance manager, Manager or Account admin to open the list. Editing, versioning, freezing and binary links need Compliance manager or Manager.

A **notice file** (also called attribution file) documents the open source components used in your software, their licenses and the license texts. It is the file you ship with your product to meet attribution obligations. Open **Outbound → Notice Files**.

## The notice files list

The page **Notice files** lists every notice file of your company, including the ones created by approvals. The columns are the same as for SBOM files: **Created**, **Frozen**, **Project/Module**, **Components**, **Version**, **Edited**, **By**, **Complete** and **Remove**.

If your company has not set up a written offer yet, a warning above the list says so. The written offer is maintained under **Administration → Settings → Written offer**. See [Settings](../06-administration/02-settings.md).

📸 *Screenshot: the Notice files list with completion percentage.*

## Create a notice file

1. Click **Create notice file**.
2. Choose the **Project or module**: **All module of ...** for a whole project, or one module.
3. Click **Create notice file**.

An [approval](../03-internal/06-approvals/01-request-approval.md) creates the notice file of its release automatically.

## Work on a notice file

Click a row to open the file. The left side groups the components by license. Open a license to see its **License text** and the components it applies to; components whose license could not be detected are grouped under *License not detected*. Each license and each component has a **cleared** checkbox; tick it when the attribution is complete.

The **TODOs Navigator** on the right counts components, obligations and remaining ToDos, shows the completion in percent and lists the actions still required per component. If your company has a written offer, it appears there as **Written Offer**: tick it to include it, and use the pencil to change its **Title** and **Description** for this file.

If licenses could not be matched for some components, a **Notice** button in the header lists them.

📸 *Screenshot: a notice file with an opened license and the TODOs Navigator.*

## Versions, freezing and binary links

- **Version** increments the version of the file.
- **Freeze** locks the file. A frozen file cannot be changed; a copy with an increased version is created for further work.
- **Binary links** shows and, while the file is not frozen, edits the links to the shipped artifacts. They are printed in the exports. See [Binary Linking](../03-internal/06-approvals/04-binary-linking.md).

## Download

| Button | Format |
|---|---|
| **PDF** | The notice file as PDF, with your company logo from **Administration → Settings → General info**. |
| **TXT** | The notice file as plain text. |

External parties read the notice file of a release, with an HMAC integrity check, from `/api/v2/compliance/releases/{release_key}/notice`. See [Public Approves](../03-internal/06-approvals/05-public-approves.md).

## Related

- [Approvals](../03-internal/06-approvals/index.md): notice files are created with every approval
- [Obligations (Project)](../03-internal/01-projects/settings/08-obligations.md): which obligations require attribution
- [SBOM + CBOM](01-sbom-cbom.md): the bill of materials of the same release
