# SW Quality Scans (SARIF)

> [!NOTE]
> **Required role:** `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` or `company_component_manager` to import
> **Required license feature:** `sarif`

***TrustSource*** reads results from static analysis tools in the SARIF format (Static Analysis Results Interchange Format). You see code quality and security findings next to the dependency and license data of the same module, and can turn findings into issues and risks.

Open **Inbound → SW Quality Scans**. The page is titled **Tests** and lists every imported SARIF document. The same list, filtered to one module, is on the module's **Quality** tab.

## Import a SARIF file

1. Open the module's **Quality** tab and click **Import**.
2. In the dialog **Import test**, click **Browse...** and select a `.sarif` or `.json` file.
3. Click **Import**.

The file is validated against the SARIF schema before it is stored; an invalid file is refused with an error message. From the UI the file may be up to 5 MB. A file that cannot be imported shows an error instead of loading forever, and a successful import shows *File successfully uploaded.*

> [!IMPORTANT]
> Import from the module's **Quality** tab to attach the results to that module. A file imported on the **SW Quality Scans** page itself is stored *without a module*: it shows in the list, but it is not part of any module and creates no risks. To import for a module without opening the UI, use the API with a project and module name.

📸 *Screenshot: the Import test dialog.*

### Import with the API

```bash
curl -X POST "https://api.trustsource.io/v2/core/tests/sarif/json?projectName=payment-platform&moduleName=billing-service" \
  -H "x-api-key: YOUR_API_KEY" \
  -F "file=@results.sarif"
```

Pass `projectName` and `moduleName` (or `moduleId`, `scanId`, `analysisId`) in the query string. Form fields next to the file are ignored, so a test sent with `-F "moduleName=..."` is stored without a module; the response's `moduleId` then holds a warning instead of an id.

The JSON variant `POST /core/tests/sarif` takes the document as the request body, up to 5 MB. A file upload above the server's upload limit (50 MB by default) is refused with `413`. See [Tests (SARIF) API](../09-rest-api/endpoints/tests.md). The response of a successful import includes `riskRegister`: how many risks were created, updated and left unchanged, and what was not tracked (see [SARIF weaknesses and risks](04a-sarif-weaknesses.md#risk-register-limits)).

> [!WARNING]
> **Use the same module name on every upload path.**
> A dependency scan, an SBOM import and a SARIF upload that carry the same module name land on the same module, whichever arrives first. ***TrustSource*** matches the name character for character within the project: if the SARIF upload uses a different spelling than your scan (say `billing-service` instead of `@my-org/billing-service`), you get two modules, one with dependency data and one with test findings, and the upload response does not warn you.
>
> Duplicate modules created earlier are not merged automatically; merge or remove them by hand. To be safe, pass the module's `moduleId` instead of a name. `moduleName` and `projectName` work on all upload paths; the older `module` and `project` still work.

## The Tests list

| Column | Meaning |
|---|---|
| **Submitted** | Upload date. |
| **Type** | Analysis type. |
| **Status** | **Passed**, **Failed** or **Unfinished**; see below. |
| **Tool** | The tool that produced the run, with its logo for known tools. |
| **Details** | The findings and their severity; see below. |
| **CWEs** | The weaknesses the findings carry. See [SARIF Weaknesses and Risks](04a-sarif-weaknesses.md). |
| **Project**, **Module** | Where the results are attached. Click to open them. |
| **Scan**, **Analysis** | Links to the dependency scan and analysis of the same module, if there are any. |

Click a row to open the test. Use the buttons **Passed**, **Unfinished** and **Failed/Findings** to show or hide each status, and the **Filter** box to search.

📸 *Screenshot: the Tests list with several imports from different tools.*

### How findings are counted

Only results that the tool reports as failures are counted. Results marked passed, informational, not applicable or similar are listed with the findings but shown in grey with the note that they are not counted.

| Level reported by the tool | Counted as |
|---|---|
| `error` | Violation |
| `warning` | Warning |
| `note` | Note |
| No level stated | Warning (the SARIF default for an unstated severity) |

The **Details** column reads, for example, *14 findings: 2 violations, 9 warnings, 3 notes*, followed by *(n rules in tool catalog)*. The catalog figure is the number of rules the tool declares, not the number it applied; SARIF does not report that.

### Passed, Failed, Unfinished

| Status | When |
|---|---|
| **Passed** | The run completed and reported no findings. A run that omits the execution details also counts as completed. |
| **Failed** | The tool reported an unsuccessful execution, or the run has findings. |
| **Unfinished** | The document holds no run to judge. |

A module's **Quality** bar shows one segment per test run, coloured by the worst finding in that run. Tests imported before version 3.2.50 keep the status they had; import them again to correct it.

## The test page

The test page shows the run's findings:

- **By Rule** or **By File** groups them. Each group header shows the rule, the number of findings, the CWEs and links to the rule description.
- A finding lists the file, line, message and code snippet. Findings without a location say **No file location reported**.
- At the top, a line names the extractor version that counted the document and whether the CWE assignments have changed since the import.
- Per rule group: **Create issue** opens a GitHub issue (title names the tool; the description starts with the rule text; the project's repository is used if one is set) and **Create risk** adds a single risk to the register (needs `compliance_manager` or `manager` and the `risks` feature).

## Required tests

Under **Quality** in the company, project or module settings you can list the tools whose results must exist before a release is requested. Adding, changing or removing such a setting is written to the [Audit Logs](../06-administration/07-audit-logs.md) under *Quality settings modified*.

## Related

- [SARIF Weaknesses and Risks](04a-sarif-weaknesses.md) - CWEs, manual assignments and automatic risks
- [Import Scans](02-import-scans.md) - dependency scans vs. code test uploads
- [CI/CD Scan](03-cicd-scan.md) - automate all inbound data
- [Risks](../03-internal/05-risks/index.md) - the risk register
- [Integrations](../06-administration/08-integrations.md) - issue trackers
