# Quality (Project)

> [!NOTE]
> **Required role:** users with write permission on project quality settings

The Quality tab lets you define test and quality requirements that apply to all modules in this project.

## What it does

You can define a list of **quality requirements** — for example, minimum test coverage, mandatory SAST scan, or specific security test requirements. These requirements are tracked in the approval workflow and reported in the Quality tab of approvals.

📸 *Screenshot: the Quality tab with a list of test requirements.*

## Risk register

With the `risks` license, the tab also has a **Risk register** panel with three switches. Each creates risks in the [risk register](../../05-risks/index.md) automatically; switching one off stops new risks, existing ones stay.

| Switch | Creates |
|---|---|
| **Enable risk creation from SARIF weaknesses (CWE)** | One risk per weakness and tool for each SARIF document imported afterwards. Earlier imports are not back-filled. |
| **Create risks from vulnerabilities (CVE)** | One risk per CVE and module, refreshed regularly. Findings at or above the confidence level (module, else project, else company setting) count. |
| **Create risks from OBOM findings** | One risk per OBOM finding and [deployment](../03-deployments.md). Needs the `obom` license. |

> [!NOTE]
> Without the `risks` license a stored switch is shown with a note and creates nothing.

## Related

- [Quality (Module)](../../02-modules/settings/12-quality.md) — module-level quality settings
- [Code Tests (SARIF)](../../../02-inbound/04-sw-quality-scans.md) — uploading test results
