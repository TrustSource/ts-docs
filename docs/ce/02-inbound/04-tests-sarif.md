# Code Tests (SARIF)

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`
> **Required license feature:** `sarif`

***TrustSource*** can ingest results from static analysis tools via the SARIF format (Static Analysis Results Interchange Format). This gives you a unified view of code quality and security findings alongside your dependency and license data.

## What it does

The Code Tests feature lets you:

- Upload SARIF files from tools like Semgrep, CodeQL, Snyk Code, ESLint, Bandit, or any SARIF-producing analyzer.
- View findings grouped by rule or by file.
- Create GitHub issues or risk entries directly from findings.
- Track which findings have been addressed over time.

## When to use it

- You run static analysis in your CI/CD pipeline and want the results visible in the same platform as your license and vulnerability data.
- Your compliance process requires evidence of security testing — Code Tests provide that paper trail.
- You want to create issues in your issue tracker (Jira, GitHub, TFS) directly from SARIF findings.

## How to use it

### Upload a SARIF file

1. Navigate to **Inbound → SW Quality Scans**.
2. Click **Upload SARIF**.
3. Select a `.sarif` or `.json` file from your local machine.
4. Choose the target **project** and **module**.
5. Click **Upload**.

📸 *Screenshot: the SARIF upload modal with file selector and project/module dropdowns.*

The file is validated against the SARIF schema before processing. Invalid files are rejected with an error message.

### View results

The **Tests list** shows all uploaded test results:

| Column | Meaning |
|---|---|
| **Submitted** | Upload date. |
| **Type** | Analysis type. |
| **Status** | Processing state. |
| **Tool** | The tool that produced the SARIF file (e.g. "semgrep", "codeql"). |
| **Project / Module** | Where the results are attached. |

📸 *Screenshot: the Tests list with several SARIF uploads from different tools.*

Click a row to open the **test detail view**, which provides:

- **Findings grouped by rule** — each rule shows its ID, severity, description and the number of occurrences.
- **Findings grouped by file** — see which source files have findings and at which lines.
- **Finding detail** — rule ID, message, file path, line number, and the tool's recommended fix (if provided).

📸 *Screenshot: a test detail page showing findings grouped by rule with severity indicators.*

### Create issues from findings

From any finding in the detail view, you can:

- **Create a GitHub/Jira/TFS issue** — click the issue icon to open the finding as a ticket in your configured issue tracker.
- **Create a risk entry** — link the finding to your project's risk register (requires `compliance_manager` or `manager` role, and the `risks` license feature).

## Automating SARIF uploads

You can upload SARIF files via the REST API to integrate Code Tests into your CI/CD pipeline:

```bash
curl -X POST https://app.trustsource.io/api/v1/tests \
  -H "x-apikey: YOUR_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@results.sarif" \
  -F "projectName=my-project" \
  -F "moduleName=api-service"
```

## Related

- [Working with Scans](02-scans.md) — dependency scans vs. code test uploads
- [CI/CD Integrations](03-cicd-integrations.md) — automate all inbound data
- [Risks](../03-internal/05-risks/index.md) — the risk register where findings can be tracked
- [Integrations](../06-administration/07-integrations.md) — configuring issue trackers (Jira, GitHub, TFS)
