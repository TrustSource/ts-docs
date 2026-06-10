# Repository Scans

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

***TrustSource*** can scan a Git repository at the source-file level to detect licenses, copyrights, cryptographic algorithms and code snippets — going deeper than package-manager-level dependency scans.

## What it does

A deep scan clones your repository and analyzes every file for:

- **License declarations** — `LICENSE` files, SPDX headers, inline license comments.
- **Copyright notices** — copyright statements in source files and headers.
- **Cryptographic algorithms** — references to crypto libraries and algorithm usage (optional).
- **OSSF Scorecard** — open-source security health score (optional).

This complements regular dependency scans by catching licenses and copyrights that package managers do not report — for example, vendored code, copy-pasted snippets, or files with non-standard license headers.

## When to use it

- You need **file-level license evidence** for compliance (e.g. CRA, NIS2, MDR due diligence).
- Your project includes **vendored dependencies** or code not managed by a package manager.
- You want to detect **copyright holders** across your codebase.
- You need a **crypto inventory** for post-quantum readiness or export control.

## How to use it

### Schedule a repository scan

1. Navigate to **Inbound → Repository Scans**.
2. Click **Schedule Scan**.
3. Enter the repository URL (HTTPS or SSH).
4. If the repository is private, provide credentials (username/password or API key).
5. Optionally select a **branch or tag** to scan.
6. Enable or disable analysis options:
   - **Scorecard** — compute OSSF Scorecard metrics
   - **Crypto analysis** — detect cryptographic algorithm usage
   - **Copyright analysis** — extract copyright notices
7. Optionally select a **deny list** (blacklisted licenses to flag).
8. Click **Schedule**.

📸 *Screenshot: the Schedule Scan form with repository URL, credentials and analysis toggles.*

The scan is queued and executed asynchronously. Depending on repository size, it may take a few minutes to complete.

### Review results

The scan result page shows a **file tree view** of the repository:

- Each file is annotated with detected **licenses** and **copyrights**.
- Files with findings are highlighted; clean files are shown in grey.
- Click a file to see the detailed findings — extracted license text, copyright lines, confidence scores.

📸 *Screenshot: the deep scan tree view with license annotations on individual files.*

### Filtering results

Use the filter bar to narrow results by:

- **License type** — show only files with a specific license.
- **File name** — search for specific files or patterns.
- **Feedback status** — show only unreviewed findings, or exclude rejected false positives.

### False-positive feedback

If the scanner misidentifies a license or copyright:

1. Open the file's finding detail.
2. Mark the finding as **false positive**.
3. The finding is excluded from future reports but remains visible under the "rejected" filter.

> [!TIP]
> False-positive feedback is preserved across re-scans of the same repository. You only need to reject a finding once.

### Scan history

Each repository keeps a history of scans. Use the **execution dropdown** at the top of the result page to switch between scan dates and compare how findings changed over time.

## Stats dashboard

The summary bar at the top of each scan result shows:

| Metric | Description |
|---|---|
| **Files processed** | Total files analyzed. |
| **Licenses found** | Number of distinct licenses detected. |
| **Copyrights found** | Number of copyright notices extracted. |
| **Compatibility issues** | Findings that conflict with your policy or deny list. |
| **Blacklisted** | Files with licenses on your deny list. |

## Related

- [Bulk Repositories](06-bulk-repositories.md) — scan many repositories in one pass
- [Algorithms](../05-knowledge/06-algorithms.md) — the crypto algorithm database used by crypto analysis
- [Licenses](../05-knowledge/05-licenses.md) — the license catalog that classifies findings
- [Working with Scans](02-scans.md) — package-level scans vs. file-level deep scans
