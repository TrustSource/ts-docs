# Quality (Project)

> [!NOTE]
> **Required role:** everyone who can open the project settings reads the tab. Managers who are the project's default project manager or default compliance manager (or any manager while none is set) can change it. The risk switches need write access to the tab and the role `account_admin`, `manager` or `compliance_manager`.

The Quality tab defines which test tools must deliver results for the modules of this project, and whether findings create risks.

## Define test requirements

The panel **Define test requirements** has one row per required tool, for example a SAST scanner. Test results are uploaded in SARIF format (see [SW Quality Scans](../../../02-inbound/04-sw-quality-scans.md)).

1. Select a **Tool**.
2. Click **Add**.
3. To drop a requirement, click the trash icon at the end of its row.

Rows that come from the company's quality list carry the label **in Company**. Every module of the project shows the project rows with the label **in Project**. The test results are reported on the **SW-Quality** tab of an approval.

📸 *Screenshot: the Quality tab with the Define test requirements panel and the Risk register panel.*

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

- [Quality (Module)](../../02-modules/settings/12-quality.md): module-level quality settings
- [SW Quality Scans](../../../02-inbound/04-sw-quality-scans.md): uploading test results
