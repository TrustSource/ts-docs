# Your first module: from scan to signed-off SBOM

This recipe takes you from a fresh ***TrustSource CE*** installation to an approved release with a downloadable SBOM.

> [!NOTE]
> **Goal:** A bill of materials for one piece of your software, signed off through an approval, kept as a release, and downloaded as CycloneDX, SPDX or PDF.
>
> **Time:** about 15 minutes, plus the analysis time of your scan.
>
> **You'll need:**
>
> - A user with the roles **Manager** and **Compliance manager**. The initial admin holds all roles, so on a fresh installation you can do every step yourself. In a team, a manager requests the approval and a compliance manager grants it.
> - Either an SBOM file (CycloneDX or SPDX JSON) of your software, or a repository to scan and **Python 3.10 or newer** for [ts-scan](https://github.com/TrustSource/ts-scan).
>
> **What you'll have at the end:**
>
> - One project with one analysed module.
> - An approved approval, which is a release.
> - An SBOM file of that release.

## Steps

### 1. Create a project

Open **Internal → Projects** and select **Create**. Enter a **Project name**, for example the name of the product the software belongs to, and select **Create project**.

📸 *Screenshot: Projects page with the "Create new project" dialog open.*

> [!TIP]
> If you only want to look around, select **Generate** instead. It creates a demo project with a sample module that runs through the real analysis. **Remove demo** deletes it again.

### 2. Bring in your dependencies

Choose one of the two ways.

**A. Import an SBOM file.** Open **Inbound (Scans) → Import Scans**. Pick your project under **Project**, set the toggle to **CycloneDX** or **SPDX**, choose the **File** and enter a **Module name**, for example `webshop-backend`. Select **Import**. The app opens the project's module list.

📸 *Screenshot: Import Scans page with project, format toggle, file and module name filled in.*

**B. Scan your repository with ts-scan.** First get an API key. On a fresh installation the initial admin is the account admin:

1. Open **Administration → API keys → API keys** and select **Create key**.
2. Enter a **Name**, pick the scope `developer` under **Scopes** and select **Create**.
3. Select **Publish** on the new key, then the copy button.

```bash
read -rs TS_UPLOAD_API_KEY && export TS_UPLOAD_API_KEY   # paste the key and press Enter; it is not echoed or kept in the shell history
pip install ts-scan
ts-scan scan -o myscan.json /path/to/your/project
ts-scan upload --base-url "https://<your-host>/api" \
  --project-name "<your project name>" myscan.json
```

`ts-scan upload` takes the key from `TS_UPLOAD_API_KEY`, so it does not show up in the process list. `--base-url` points ts-scan at your installation. Give it the address of your installation followed by `/api`; ts-scan adds the rest of the path. On a local test installation that is `http://localhost:3000/api`.

> [!NOTE]
> The project must exist before the upload; an unknown project name is refused with `404`. The module is created on the first upload, named after the artefact ts-scan detected, and reused on later uploads. ts-scan prints an `unknown user-agent` notice from the server; it is harmless. The options above were checked with ts-scan 1.10; run `ts-scan upload --help` if your version differs.

### 3. Review the results

Open your project and then the module. The analysis runs in the background and usually finishes within a minute. The **Analysis from** line under the module name shows the date of the analysis you are looking at.

📸 *Screenshot: module page with the List tab populated and status colours visible.*

- **List**, **Tree** and **Graph** show the components and their dependencies. Select a component for its versions, licenses and vulnerabilities.
- **Legal** shows the licenses, their obligations and violations.
- **Quality** shows imported SARIF results, if any.

The module carries a status: OK, warnings or violations. Work through the findings: upgrade components, allow or deny licenses and components in the settings, or accept a risk with a comment. Re-run the analysis with the analyse button in the module header.

> [!TIP]
> Licenses are evaluated against the legal settings of the project and module. Fill them in once with the wizard: see [Fill in the Legal Questionnaire](12-legal-questionnaire.md).

### 4. Request an approval

When the module's status is good enough to ship, select **Initiate approval** in the module header (Manager or Compliance manager). The wizard has four steps:

1. **Settings** - enter **Approve name or product name**, optionally **Semantic version**, **Packageurl** and **Approve description**. Leave **Dry run** unticked; a dry run is not sent to the compliance managers.
2. **Select analysis** - pick the analysis to approve, normally the latest.
3. **Confirm statuses** - check the module's statuses.
4. **Finalization** - the app generates the approval reports. Select **Jump to Compliance Report**.

📸 *Screenshot: approval wizard on step 1 Settings.*

### 5. Review and approve

A compliance manager opens the approval under **Internal → Approvals** and works through the tabs: **Overview**, **Vulnerabilities**, **Licenses**, **Versioning**, **Viability**, **Status changes**, **Export control**, **Capabilities** and **SW-Quality**.

When the review is done, the compliance manager selects **Approve** (or **Reject** with a reason). An approved approval cannot be changed; the next iteration is a new approval.

📸 *Screenshot: approval detail with the Approve and Reject buttons.*

### 6. Download the release SBOM

The approved approval is now a release. Open **Internal → Releases** and the release, then select **SBOM**. The SBOM page offers:

- **PDF** - a readable report;
- **CycloneDX** - **SBOM (components)**, **CBOM (cryptography)**, **AIBOM (AI / ML)** or **Full BOM (components + crypto + AI)**, as CycloneDX 1.7 JSON;
- **SPDX** - SPDX 2.3.

📸 *Screenshot: SBOM file page with the PDF, CycloneDX and SPDX buttons.*

The release's **New vulnerabilities** tab shows vulnerabilities found after the approval, so you see when a shipped version becomes affected.

## Did it work?

- [ ] Your project shows one module with components on the **List** tab.
- [ ] An approved approval is listed under **Internal → Approvals**.
- [ ] The release appears under **Internal → Releases**.
- [ ] The downloaded SBOM file lists your components.

## Variants

- **Everything from a script?** Create the project, import, request and grant the approval through the REST API. See [Example: curl](../09-rest-api/04-examples-curl.md).
- **Container image instead of source code?** `ts-scan scan --use-syft docker:<image> -o myscan.json` scans an image with Syft; then continue with the upload. Syft must be installed.
- **Already in CI/CD?** See [CI/CD Integration](02-cicd-integration.md).

## What's next

- [Share the release SBOM publicly](08-share-sbom-publicly.md) with a release key.
- [Add an infrastructure module](10-add-infrastructure-module.md) for the runtime your software needs.
- [Handle a license conflict](03-handle-license-conflict.md) that the analysis found.
