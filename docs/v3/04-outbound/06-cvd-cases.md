# CVD Cases

> [!NOTE]
> **Required role:** `compliance_manager`, `manager`, `account_admin` or `company_security_manager`
> **Required license feature:** `psirt`

***TrustSource*** connects to an external Coordinated Vulnerability
Disclosure (CVD) platform. **CVD Cases** (Outbound → CVD cases) gives you a
list and detail view of the cases your company holds there, and lets you
open a new case without leaving TrustSource. A case itself is **not**
stored in TrustSource — the list and detail pages read it live from the
connected CVD platform.

A CVD case tracks the coordinated disclosure of a vulnerability from first
report through to public advisory, following the shared vocabulary used by
CVD programs generally:

- **Status** — `Active`, `Closed` or `Published`.
- **CS State** — six independent coordination flags: Vendor aware, Fix
  ready, Fix deployed, Public aware, Exploit public, Attacks observed.
- **Embargo** — `None`, `Proposed`, `Active`, `Revise` or `Exited`, together
  with any proposed publication date and each vendor's response.

## The case list

The list shows every case (status, CS state, embargo, advisory ids, origin,
created/updated) with a text filter and "Load more" paging. Filtering
searches everything the list shows — case number, advisory id, status,
embargo, origin and dates.

📸 *Screenshot: the CVD cases list with the state and embargo columns.*

## Creating a case

**New CVD case** opens a full-page form. Required: Product, Vulnerability
type, Description (at least 50 characters), Impact. Optional: affected
version, CVE or other advisory id (any identifier from the OSV registry —
GHSA, RHSA, DSA, PYSEC and around fifty more, not only CVE), package URL,
proof of concept, an estimated CVSS v3.1/v3.0 vector (the score is computed
as you type), and the TrustSource projects and modules the issue affects.

📸 *Screenshot: the New CVD case form with the CVSS vector field.*

## Opening a case from a report

You rarely start from a blank form. Two entry points prefill it for you:

- **Vulnerability report → Treatments → Create CVD case** — prefills
  product, affected version, affected projects, advisory id, severity and a
  drafted description from the findings you selected. See the
  [Vulnerability Report](../03-internal/04a-vulnerability-report.md).
- **CSAF page → Create** — offers to link the advisory you're building to
  an open (or, on request, closed) CVD case. Linking is optional; "Do not
  link a case" is preselected. See [CSAF](04-csaf.md).

Every prefilled field stays editable, and nothing is submitted until you
confirm.

## Detail page

The case detail view shows the coordination state in full, the embargo
(with the proposed date and vendor responses), both the reported and
internal CVSS scores, and the TrustSource context — the linked projects and
modules, and the CSAF document the case belongs to, if any.

## Availability

CVD Cases requires the `psirt` license feature, enabled per company. A
company without it sees a short "not enabled" notice instead of the list.
There is no in-app configuration for the underlying CVD platform connection
— it's provisioned for your company by TrustSource operations.

## Related

- [Vulnerability Report](../03-internal/04a-vulnerability-report.md)
- [CSAF](04-csaf.md)
