# Your first module: from scan to signed-off SBOM in 15 minutes

This recipe takes you from "I just got a ***TrustSource*** login" to "I have an audit-ready SBOM for my software", without spending an afternoon reading the manual first.

> [!NOTE]
> **Goal:** A complete bill of materials for one piece of your software, signed off through an approval, kept as a release that ***TrustSource*** keeps watching for new vulnerabilities, and downloaded as an SBOM in CycloneDX or SPDX format.
>
> **Time:** about 15 minutes if you wear both the developer and the manager hat (typical first-time scenario in a small team), plus the analysis time of your scan. If a different person has to do the approval, the wall-clock time depends on their availability; the approval review itself takes only a few minutes.
>
> **You'll need:**
>
> - A ***TrustSource*** account with the `manager` or `compliance_manager` role to create the project and request the approval, and someone with the `compliance_manager` role to approve it. This may be you. See [Roles & Licenses](../00-getting-started/index.md).
> - An API key with the `developer` or `manager` scope. Only an `account_admin` can create company API keys; ask yours, or see step 2.
> - A small repository to scan. Any of Maven, npm, NuGet, PyPI and more works.
> - **Python 3.10 or newer** installed locally for running [`ts-scan`](https://github.com/TrustSource/ts-scan).
>
> **What you'll have at the end:**
>
> - One project with one module in your company.
> - A scan result populating the module's bill of materials.
> - An approved approval, which is your release.
> - A downloaded SBOM file of that release.

## Steps

### 1. Create your first project

In the left navigation, open **Internal → Projects** and click **Create**. Enter a **Project name** that makes sense to your team, for example the name of the product or service this software belongs to, and click **Create project**.

📸 *Screenshot: the Projects page with the Create new project dialog open.*

> [!TIP]
> Don't overthink the project name yet. You can rename it later.

### 2. Create an API key

An account admin opens **Administration → API keys → API keys** and selects **Create key**:

1. Enter a **Name**, for example `first-scan`, and pick the scope `developer` under **Scopes**. Select **Create**.
2. Select **Publish** in the new key's row. The key is unpublished until then.
3. Select the copy button in the row to copy the full key.

The list shows only part of the key, but the copy button copies the complete key at any time while the key is published. See [API keys](../06-administration/04-api-keys.md).

📸 *Screenshot: the Create key dialog with a name and the developer scope selected.*

Put the key into an environment variable without leaving it in your shell history:

```bash
read -rs TS_UPLOAD_API_KEY && export TS_UPLOAD_API_KEY   # paste the key and press Enter
```

### 3. Install ts-scan locally

In your terminal:

```bash
pip install ts-scan
```

Verify it works:

```bash
ts-scan --version
```

For details and troubleshooting, see the [`ts-scan` repository](https://github.com/TrustSource/ts-scan).

### 4. Scan your repository and upload the result

Run:

```bash
ts-scan scan -o myscan.json /path/to/your/project
```

This produces `myscan.json` in the ***TrustSource*** format. ***ts-scan*** detects the package management system (Maven, npm, NuGet, PyPI and more) and walks the dependency tree.

> [!TIP]
> If your project uses several ecosystems (for example a frontend in npm and a backend in Maven), `ts-scan` handles them in one pass.

Now upload the result to your project:

```bash
ts-scan upload --project-name "<your project name>" myscan.json
```

`ts-scan upload` takes the key from `TS_UPLOAD_API_KEY`; you can also pass it with `--api-key`. It sends the scan to `https://api.trustsource.io` unless you set another address with `--base-url`.

> [!TIP]
> **You don't have to create the module beforehand.** ***TrustSource*** creates it on the first upload, taking the module name from the artefact ***ts-scan*** detected (the package name, the directory name or the image name, depending on what you scanned). Later uploads of the same artefact update that module. The project, however, must exist: an unknown project name is refused with `404`.

> [!NOTE]
> Run `ts-scan upload --help` if the options above don't match your version of ts-scan.

### 5. Review the results and identify ToDos

Open your project in the app and click the new module. The analysis runs in the background and usually finishes within a minute.

📸 *Screenshot: the module page with the List tab populated after a scan, with the status markers visible.*

The module carries a **status** (see [Mental Model](../00-getting-started/05-mental-model.md#status-green-yellow-red)), almost certainly with warnings or violations, because any non-trivial scan surfaces something. Take a tour:

- **List**, **Tree** and **Graph**: the components and their dependencies. Click a component to see its versions, licenses and known vulnerabilities.
- **Legal**: the licenses, their obligations and violations.
- **Reports** in the module header: the **Vulnerability** report and more.

The day-to-day work in ***TrustSource*** is a loop: **look at the findings, decide what to do about each one, watch the status improve.** Some findings disappear by fixing the underlying problem (upgrade a component, swap a license), some by accepting a risk with a comment, some by adjusting your project's allow and deny lists. This back-and-forth between the developer and the manager is the normal mode.

> [!TIP]
> You don't need to be exhaustive on the first pass. The goal here is to understand the shape of the findings, not to fix everything before lunch.

### 6. Request an approval (manager step)

> [!NOTE]
> **Approvals are not done on every upload.** They are the **milestone** before a release. The day-to-day work in steps 4-5 is the loop: scan, look at the status, fix things, scan again. **Only when the module's status is good enough to ship** does the manager request an approval.

Approvals are a **project governance step**. They are **requested by a manager** (or a compliance manager) and reviewed by **a compliance manager**. When these are different people, this four-eyes principle makes the approval auditable.

The manager selects **Initiate approval** in the module header. The wizard has four steps:

1. **Settings**: enter **Approve name or product name**, optionally **Semantic version**, **Packageurl** and **Approve description**. Leave **Dry run** unticked; a dry run is not sent to the compliance managers.
2. **Select analysis**: pick the analysis to approve, normally the latest.
3. **Confirm statuses**: check the module's statuses.
4. **Finalization**: the app prepares the approval. Select **Jump to Compliance Report**.

📸 *Screenshot: step 1 Settings of the approval wizard with Dry run unticked and a name and version entered.*

### 7. Walk through the review tabs

The **compliance manager** opens the approval under **Internal → Approvals** and works through the tabs:

| Tab | What gets reviewed |
|---|---|
| **Overview** | The modules and analyses in the approval. |
| **Vulnerabilities** | Every vulnerability in the snapshot. |
| **Licenses** | Every license found and its obligations. Watch for forbidden licenses or conflicts. |
| **Versioning** | How far behind current each component is. |
| **Viability** | End-of-life, low maintainer activity, low community score. |
| **Status changes** | Changes in the components: different components, modified appearances and undocumented changes. |
| **Export control** | Cryptography and export classification. Skip if not relevant. |
| **Capabilities** | Capabilities recorded for this release. |
| **SW-Quality** | Linked SARIF test results; shown only with the `sarif` license feature. |

📸 *Screenshot: the open approval with the Approve and Reject buttons and the tab bar.*

For a first approval, the goal isn't an exhaustive review. It's to **see what's there** and catch any show-stopper (for example a GPL-3.0 in a module you ship as proprietary).

### 8. Approve

Once the review is done, the compliance manager selects **Approve** (or **Reject** with a reason). This is the formal sign-off: from here on, the approval is **frozen**, the immutable record that this state of the module was accepted, by whom, and at what moment.

> [!WARNING]
> An approved approval cannot be edited afterwards. If something needs to change, the next iteration goes into a **new** approval. That's how the audit trail stays intact.

> [!TIP]
> ***TrustSource*** logs changes across the platform: who changed a status, accepted a risk or changed a setting, and when. The approval is the formal milestone; the log behind it is what makes the whole story auditable. See the [Mental Model: Audit log](../00-getting-started/05-mental-model.md#audit-log).

### 9. The release

The approval says "we accept this state". An approved approval **is** the release: you don't create it separately. It appears under **Internal → Releases**, and ***TrustSource*** publishes a [release key](../06-administration/04b-release-keys.md) for it.

What a release gives you:

- **A frozen SBOM** of the approved analysis.
- **Ongoing monitoring**: the release's **New vulnerabilities** tab shows vulnerabilities found after the approval, so you see when a shipped version becomes affected.
- **The documents you ship**: SBOM, notice file and CSAF VEX, which you can also share through the release key.

You can also drive the approval from outside: your pipeline can create, approve or reject approvals through the [REST API](../09-rest-api/endpoints/compliance-approvals.md).

📸 *Screenshot: the release page with the SBOM button and the Overview, New vulnerabilities, Vulnerabilities and Export control tabs.*

> [!TIP]
> **Why this matters.** A release SBOM is what stays in the field: running on customer machines, baked into firmware, or shipped as a container. Your development team may be 256 commits ahead, but the release stands still. ***TrustSource*** keeps that frozen SBOM under watch, so the day a new CVE drops on a component you released six months ago, you see it on the release.

### 10. Download the release SBOM

Open the release under **Internal → Releases** and select **SBOM**. The SBOM page offers:

- **PDF**: a readable report.
- **CycloneDX**: **SBOM (components)**, **CBOM (cryptography)**, **AIBOM (AI / ML)** or **Full BOM (components + crypto + AI)** as JSON.
- **SPDX**: an SPDX document.

📸 *Screenshot: the SBOM page of a release with the PDF, CycloneDX and SPDX buttons.*

That's the file you ship.

## Did it work?

You're done if all of the following are true:

- [ ] Your project shows one module with components on the **List** tab.
- [ ] An **approved** approval is listed under **Internal → Approvals**.
- [ ] The release appears under **Internal → Releases**.
- [ ] The downloaded SBOM file opens in any text editor and lists your components.

## Variants

- **No `ts-scan` available?** Skip steps 2-4 and import an SBOM you already have under **Inbound (Scans) → Import Scans**: pick the **Project**, choose **CycloneDX** or **SPDX**, select the **File**, enter a **Module name** and select **Import**. The rest of the recipe is identical.
- **Container image instead of source code?** `ts-scan scan --use-syft -o myscan.json docker:<image>` scans an image with [Syft](https://github.com/anchore/syft), which must be installed. Then continue with the upload.
- **Already running in CI/CD?** Step 4 (scan and upload) runs in your build pipeline. See [CI/CD Integration](02-cicd-integration.md).
- **You're not the manager?** Steps 3-5 are yours; send the manager the module URL after step 5 so they can request the approval.

## What's next

- [Add an infrastructure module](10-add-infrastructure-module.md) to the same project, so your bill of materials covers your runtime surface, not just your code.
- [Handle a license conflict](03-handle-license-conflict.md) that the analysis found.
- [Share the release SBOM publicly](08-share-sbom-publicly.md) with a customer who doesn't have a ***TrustSource*** login.
- [React to a 0-day](04-react-to-0day.md) on a release that's already in the field.
