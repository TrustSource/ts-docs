# Tests (SARIF)

> Upload SARIF results of static analysis and other test tools, and read the imported documents back.

## Use cases

- Upload the SARIF output of Semgrep, CodeQL or another analyser from the pipeline, next to the dependency scan.
- Let a project keep one risk per weakness (CWE) found by the analysers.
- Read imported findings from a security tool or dashboard.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/tests/sarif` | List imported SARIF documents | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/tests/sarif` | Import SARIF (JSON request body) | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| POST | `/core/tests/sarif/json` | Import SARIF (file upload) | `developer`, `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager`, `company_component_manager` |
| GET | `/core/tests/sarif/{id}` | Get one imported SARIF document with its run | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |

## Importing SARIF

Send the SARIF document as the JSON body of `POST /core/tests/sarif` (up to 5 MB), or as a file part named `file` to `POST /core/tests/sarif/json` (up to `TS_UPLOAD_MAX_MB`, default 50 MB). The body must contain `runs`.

The target module is resolved from the query parameters, in this order:

| Parameter | Effect |
|---|---|
| `moduleId` | The module with this id |
| `analysisId` | The module of this analysis |
| `scanId` | The module of this scan |
| `projectName` + `moduleName` | The module with this name in this project. The project must exist; the module is created if it does not. |
| `moduleName` alone | An existing module with this name anywhere in the company (the first match). No module is created. |

`project` and `module` are accepted as aliases for `projectName` and `moduleName`. `release`, `branch` and `tag` are stored with the test.

```bash
curl -X POST \
  "https://<your-host>/api/v2/core/tests/sarif/json?projectName=Webshop&moduleName=webshop-backend" \
  -H "x-api-key: $TS_API_KEY" \
  -F "file=@semgrep.sarif"
```

| Status | Body |
|---|---|
| `201` | `{"tests": ["<test id>", ...], "moduleId": "..."}`. If no module could be resolved, the test is stored unattached and `moduleId` holds a notice instead of an id. |
| `400` | Not a SARIF JSON object, or validation failed |
| `403` | `scanId` or `analysisId` belongs to another company or another module |
| `404` | `projectName` does not resolve to a project |

> [!WARNING]
> Module names are matched exactly. If your dependency scan names the module `@my-org/billing-service` and the SARIF upload sends `billing-service`, the findings land on a second module. Send the same name on every upload path, or resolve the id once and send `moduleId`.

When the project setting `autoCreateCweRisks` is on, each import also updates the project's risk register: one risk per weakness (CWE) and reporting tool, with the files and rules where it was found. See [SARIF weaknesses](../../02-inbound/04a-sarif-weaknesses.md).

## Reading imported documents

`GET /core/tests/sarif` lists documents newest first, 100 per page. Filters: `origin` (tool name, for example `semgrep`), `projectName`, `moduleName`, `moduleId`, `scanId`, `analysisId`, `page`.

Each entry has `_id`, `origin`, `submitted`, `status` (`PASSED`, `FAILED` or `UNFINISHED`), `projectName`, `moduleName`, `moduleId`, `scanId`, `analysisId` and:

- `rules` - distinct rules that fired, per severity, and `total`, the size of the rule catalog the tool declared;
- `findings` - number of findings per severity, and `cwes`, the findings per weakness and level (`violation`, `warning`, `note`).

`GET /core/tests/sarif/{id}` returns the same fields plus `sarif`, the stored run wrapped in a SARIF 2.1.0 envelope, so findings and suggested fixes can be read as-is.

## Related

- [SW Quality Scans](../../02-inbound/04-sw-quality-scans.md) - the same imports in the app
- [Risks](risks.md) - the risks created from weaknesses
- [Scans](scans.md)
- [Endpoint groups](index.md)
