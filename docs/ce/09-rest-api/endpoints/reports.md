# Reports

> Read the analysis reports of a project as JSON: vulnerabilities, versioning, viability, licenses, end-of-life and algorithms, the impact of one CVE across the company, and dashboard figures.

## Use cases

- Feed vulnerability and license status into your own dashboards or ticketing.
- Check after a new CVE which projects and modules are affected.
- Export the end-of-life or algorithm status of a project for an audit.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/reports/vulnerabilities` | Vulnerability report of a project | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| GET | `/core/reports/versioning` | Versioning report of a project | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| GET | `/core/reports/viability` | Viability report of a project | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| GET | `/core/reports/licenses` | Licenses report of a project | `developer`, `manager`, `compliance_manager`, `portfolio_manager` |
| GET | `/core/reports/endoflife` | End-of-life report | `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/reports/algorithms` | Algorithms report | `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/reports/cve` | Impact of one CVE across the company | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| GET | `/core/reports/dashboard` | Dashboard figures of the company | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |

## Parameters

| Report | Parameters |
|---|---|
| `vulnerabilities` | `projectId` (required), `minConfidence` (1 to 5, optional) |
| `versioning`, `viability`, `licenses` | `projectId` (required) |
| `endoflife` | `projectId` |
| `algorithms` | `projectId` (optional) |
| `cve` | `cveId` (required), for example `CVE-2021-44228` |
| `dashboard` | none |

A missing `projectId` or `cveId` answers `400`. An unknown project or a CVE that is not known to this installation answers `404`.

## Responses

The project reports share one shape: `title` (report type, name, description), `stats` (counts) and a list:

| Report | List | Per entry |
|---|---|---|
| `vulnerabilities` | `components` | `key`, `versions`, `paths` (module and dependency path), `vulnerabilities` with `key`, `description`, `status`, `extra` (`score`, `vector`, `link`) |
| `versioning` | `components` | `key`, `versions`, `latestVersion`, `paths` |
| `viability` | `components` | `key`, `versions`, `viability` (open issues, forks, stars, monthly commits, dates) |
| `licenses` | `licenses` | `name`, `status`, `usedInModules`, `usedInComponents`, `problems` |
| `endoflife` | `components` | `key`, `versions`, `status`, `information`, `paths` |
| `algorithms` | `projects` | `project`, `algorithms` |

`cve` returns `title` (CVE id, description, `score`, `vector`, `link`) and `projects`, each with the affected `modules` and their `components`. `dashboard` returns `activityLogs` (last 10 events), `componentsLicenses`, `moduleStats`, `moduleHistory` and `total`.

## Where the data comes from

Vulnerability data comes from OSV for the components this installation has analysed, and EPSS scores from FIRST when enabled. A CVE that no analysed component has ever matched is unknown to the `cve` report. After a new disclosure, reprocess the relevant scans first. See [External services](../../01-installation-setup/04-external-services.md).

## Related

- [Reports](../../03-internal/04-reports.md) - the same reports in the app
- [Recipe: React to a 0-day](../../recipes/04-react-to-0day.md)
- [Endpoint groups](index.md)
