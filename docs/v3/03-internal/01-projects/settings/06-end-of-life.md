# End-of-life (Project)

> [!NOTE]
> **Required role:** users with write permission on project EOL settings

The End of Life tab controls how ***TrustSource*** handles components approaching or past their end-of-life date.

## Fields

| Field | Description |
|---|---|
| **Enable end-of-life analysis for all modules** | Turns EOL checking on. The thresholds below appear only while it is on. |
| **Warning threshold** | Number of days before EOL that triggers a warning (yellow status). |
| **Violation threshold** | Number of days before EOL that triggers a violation (red status). |

> [!TIP]
> A typical configuration is: warn at 180 days, violate at 30 days. This gives your team six months to plan a migration away from the end-of-life component.

📸 *Screenshot: the End of Life tab with enable toggle and threshold fields.*

Click **Update** to save the thresholds.

## Related

- [End of Life (Module)](../../02-modules/settings/11-end-of-life.md) — module-level EOL overrides
