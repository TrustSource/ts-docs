# Mass Scans

> [!NOTE]
> **Required role:** `compliance_manager`, `manager` or `account_admin`
> **Required account type:** Enterprise or Medical
> **Status:** BETA

***TrustSource*** lets you schedule deep scans across multiple repositories in a single pass — useful for enterprise-wide license and copyright inventory sweeps.

## What it does

Bulk Repositories extends the [Repository Deep Scan](05-repositories-deep-scan.md) feature to work at scale. Instead of scheduling scans one by one, you create a scan list that processes many repositories with the same analysis settings.

## When to use it

- You need a **company-wide license inventory** across dozens or hundreds of repositories.
- You want to run a **periodic compliance sweep** (e.g. quarterly crypto inventory for export control).
- A new policy was introduced and you need to **re-evaluate all repositories** against it.

## How to use it

### Create a bulk scan

1. Navigate to **Inbound → Mass Scans**.
2. Click **Schedule Bulk Scan**.
3. Select the target **module** from your projects.
4. Configure analysis options (same as single deep scans):
   - Scorecard analysis
   - Crypto analysis
   - Copyright analysis
5. Set the privacy flag (private or public results).
6. Click **Schedule**.

📸 *Screenshot: the bulk scan creation form with module selector and analysis toggles.*

### Monitor progress

The **Mass Scans list** shows all scheduled and completed bulk scans:

| Column | Meaning |
|---|---|
| **Name** | Scan list identifier. |
| **Created** | When the bulk scan was scheduled. |
| **Privacy** | Whether results are private or shared. |
| **Scorecard / Crypto / Copyright** | Which analysis types are enabled (toggle icons). |
| **Actions** | View details, toggle privacy, delete. |

📸 *Screenshot: the bulk scan list with status indicators for each scan.*

Click a row to see individual repository results. Each repository follows the same [deep scan result format](05-repositories-deep-scan.md) — file tree, license annotations, copyright notices, and false-positive feedback.

### Managing bulk scans

- **Toggle privacy** — switch a bulk scan between private and public visibility.
- **Delete** — remove a bulk scan and all its results.

> [!CAUTION]
> Deleting a bulk scan removes all associated repository scan results. This cannot be undone.

## Related

- [Repositories (Deep Scan)](05-repositories-deep-scan.md) — scanning a single repository in detail
- [Scans](02-scans.md) — package-level scans vs. file-level deep scans
