# CI/CD Scan

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

A **scan** is a snapshot of a module's bill of materials at a point in time. It lists every component, version, license and vulnerability that was detected. Scans are the primary way data enters ***TrustSource***.

## What it does

The Scans section lets you:

- View all scans across your company in one list.
- Inspect scan details — components found, licenses detected, vulnerabilities matched.
- Re-process a scan against updated rules.
- Delete scans you no longer need.

## How scans are created

Scans can arrive through several paths:

| Source | How it works |
|---|---|
| **CI/CD scanner** | A scanner plugin in your build pipeline pushes results via the REST API after each build. |
| **Manual upload** | Upload a scan result file (JSON, SPDX, CycloneDX) through the web UI. |
| **REST API** | Push scan data programmatically using the `/api/v1/scans` endpoint with your API key. |
| **SBOM import** | Upload an existing SBOM (SPDX or CycloneDX format) and ***TrustSource*** creates a scan from it. |

Every scan is attached to exactly one module. If the target module does not exist yet, it is created automatically (when using the API with auto-create enabled).

## The scan list

Navigate to **Inbound → CI/CD Scan** to see all scans.

📸 *Screenshot: the scan list showing scan date, module, project, status and component count.*

The list shows:

| Column | Meaning |
|---|---|
| **Date** | When the scan was received. |
| **Module** | The module this scan belongs to. |
| **Project** | The parent project. |
| **Status** | Processing state — see below. |
| **Components** | Number of components found. |
| **Tag** | Optional label (e.g. branch name, build number). |

Click any row to open the scan detail page.

## Scan statuses

| Status | Meaning |
|---|---|
| **Pending** | Scan received, queued for processing. |
| **Processing** | License matching and vulnerability lookup in progress. |
| **Done** | Scan processed successfully — components, licenses and vulnerabilities are available. |
| **Failed** | Processing failed — check the scan detail for error messages. |

## Scan detail

The detail page shows everything found in a single scan:

- **Components** — full list with version, license(s), vulnerability count, status (green/yellow/red).
- **License summary** — licenses found across all components, grouped by approval status.
- **Vulnerability summary** — open CVEs with severity scores.
- **Metadata** — scan source, timestamp, scanner version, tag.

📸 *Screenshot: a scan detail page with the component list and license summary.*

## Re-scanning

If your company's license policies or vulnerability feeds have changed, you can re-process an existing scan without uploading new data:

1. Open the scan detail.
2. Click **Re-scan**.
3. ***TrustSource*** re-evaluates all components against current policies and vulnerability data.

This is useful after updating whitelists, blacklists or policies — the underlying component data stays the same, but the status assessment is refreshed.

## Deleting scans

Deleting a scan removes it from the list and from the module's scan history. If it was the most recent scan, the module reverts to the previous scan's data.

> [!CAUTION]
> Deleting a scan is permanent. If the scan was the basis for an approved release, the approval's frozen snapshot is not affected — but the scan itself is gone from the module's history.

## Supported formats

| Format | Extension | Notes |
|---|---|---|
| TrustSource JSON | `.json` | Native format from `ts-scan` and CI/CD scanners. |
| SPDX (JSON, RDF/XML, tag-value) | `.spdx`, `.spdx.json`, `.rdf` | SPDX 2.2 and 2.3 supported; auto-detected by content. |
| CycloneDX | `.json`, `.xml` | CycloneDX 1.4+ supported. |

> [!TIP]
> When uploading manually, ***TrustSource*** auto-detects the format from the file content — you do not need to specify it.

## Related

- [CI/CD Integrations](03-cicd-integrations.md) — automate scan uploads from your pipeline
- [REST API → Scans endpoint](../09-rest-api/03-endpoint-reference.md) — programmatic scan upload
- [Module Detail](../03-internal/02-modules/02-module-detail-tabs.md) — how scan data appears in the module view
