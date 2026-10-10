# Reports

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`

The Reports page (titled **Analyse [Reports]** in the app) is a hub of 21 tiles. Each tile opens a report in ***TrustSource***. The SBOM, Notice and SOUP tiles lead to the same lists as the [Outbound chapter](../04-outbound/index.md).

## Report tiles

| Tile | Shows |
|---|---|
| **Licenses overview** | All licenses used. |
| **[Vulnerability report](04a-vulnerability-report.md)** | Status of all vulnerabilities. |
| **Viability report** | Viability status of components. |
| **OpenSSF Scorecard report** | Scorecard status of components. |
| **Versioning report** | Component version problems. |
| **End-of-life report** | Component end-of-life problems. |
| **Algorithm report** | Algorithms used by components. |
| **All bad crypto** | Crypto policy violations. Roles: `company_security_manager`, `compliance_manager`, `portfolio_manager`. |
| **Vulnerability activity** | Track and mute vulnerabilities across the company. Role: `company_security_manager`. |
| **Obligation report** | Obligations of all projects. |
| **Software bill of materials** | List of SBOMs. |
| **Credits report** | Credits of projects. |
| **Modification state** | Modified components. |
| **Component impact** | Projects impacted by a component. Roles: `compliance_manager`, `manager`, `portfolio_manager`. |
| **CVE impact** | Projects impacted by a CVE. |
| **Algorithm impact** | Projects impacted by an algorithm. |
| **Notice files** | List of Notice files. |
| **SOUP files** | List of SOUP files. Shown with the `medical` license or when SOUP reports are possible for the account. |
| **COTS overview** | COTS components in projects. Same condition as SOUP files. |
| **Dependent projects** | Projects that depend on a selected project. |
| **Components** | Components with missing data. Role: `company_component_manager`. |

The tiles you see depend on your role and license. CSAF documents are not part of this hub; find them under [Outbound → CSAF](../04-outbound/04-csaf.md).

📸 *Screenshot: the Reports hub with the report tiles.*

## Related

- [Outbound chapter](../04-outbound/index.md) — detailed documentation for each report type
- [Approvals](06-approvals/index.md) — reports are often generated as part of the approval workflow
