# CVD — Coordinated Vulnerability Disclosure

> [!NOTE]
> **Required license feature:** `cvd`

The **Coordinated Vulnerability Disclosure** capability gives security
researchers, customers and partners a structured channel to report
vulnerabilities they have discovered in your products, and gives the
PSIRT team a workflow to triage and respond to those reports inside
***TrustSource***.

## What this capability adds

- A **public intake form** (or signed-in submission, depending on
  configuration) where external reporters file vulnerability findings.
- An internal **triage queue** with severity assessment, affected-product
  selection, communication history with the reporter and remediation
  tracking.
- **Tight linkage to the CSAF capability** — confirmed and remediated
  reports can be promoted to CSAF advisories with one click, preserving
  the chain of custody from intake to publication.
- Status notifications and SLA tracking aligned with ISO/IEC 29147 and
  30111.

📸 *Screenshot: the CVD triage list with open, in-progress and remediated reports.*

📸 *Screenshot: a CVD report detail page with the reporter conversation, affected products and remediation status.*

## Editions

- **SaaS:** available with the `cvd` feature flag enabled.
- **Community Edition:** not included in the initial release.

## Related

- [CSAF Trusted Provider](06-csaf-trusted-provider.md) — publish
  remediated reports as CSAF advisories.
