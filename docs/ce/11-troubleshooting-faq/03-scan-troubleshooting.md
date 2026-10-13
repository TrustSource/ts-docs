# Scan Troubleshooting

Common problems with imports, scans and module analyses in ***TrustSource CE***, and how to solve them.

## Quick reference

| Problem | Likely cause | Fix |
|---|---|---|
| [All licenses show as warnings](#all-licenses-show-as-warnings) | The license check service did not evaluate the module. | Check the `ts_legalcheck` service. |
| [No vulnerabilities are found](#no-vulnerabilities-are-found) | OSV lookups are switched off or OSV is not reachable. | Check `TS_OSV_ENABLED` and outbound access. |
| [The analysis does not finish](#the-analysis-does-not-finish) | The analysis hit the 5-minute limit, or waits for a free slot. | Check the log; consider `TS_ANALYSIS_CONCURRENCY`. |
| An imported file is rejected | Unsupported format. | Import an SPDX (JSON, RDF) or CycloneDX file. SPDX tag-value and spreadsheet formats are not supported. |
| An upload through the REST API fails with `413` | The file is larger than the upload limit. | See [Uploads are too large](#uploads-are-too-large). |
| A scan created a second module | The scan carries a different module identifier than the existing module. | See [A scan lands in a new module](#a-scan-lands-in-a-new-module). |
| Missing licenses for some components | The package declares no license, or the component is unknown. | Check the component in the [Component Lake](../05-knowledge/01-component-lake.md) and [resolve the license manually](../03-internal/02-modules/06-manual-license-resolution.md) in the module. |
| An older scan is missing in **CI/CD Scan** | The list shows at most 200 scans. | Open the scan from its module with **View scan details**. |
| EPSS values all sit at the lowest value | EPSS lookups are switched off or FIRST is not reachable. | Check `TS_EPSS_ENABLED` and outbound access to `api.first.org`. |

## All licenses show as warnings

When every license of a module shows as a warning and no license is evaluated as OK or as a violation, the **license check service** did not answer for this analysis. The analysis itself completes; only the license evaluation is missing.

For the operator:

1. Check that the service runs: `docker compose ps ts_legalcheck`.
2. Look for these lines in the app log (`docker compose logs ts_core`):

    ```
    => CheckModule: TS_CHECK_SERVER is not set
    => CheckModule failed: status <status>, code <code>, <message>
    ```

    `ECONNREFUSED` means the service is not reachable; a timeout means it did not answer within two minutes. A `3xx` status means `TS_CHECK_SERVER` points to an address that redirects - set it to the final URL.

3. Check the service's own log: `docker compose logs ts_legalcheck`.
4. On ARM hosts the service runs under amd64 emulation, which is slower and must be installed on Linux; see [Prerequisites](../01-installation-setup/01-prerequisites.md#cpu-architecture).

When the service works again, run the analysis of the module again.

## No vulnerabilities are found

Vulnerabilities are looked up in OSV on every analysis. If none appear for components that obviously have known vulnerabilities:

- `TS_OSV_ENABLED` may be `false`. Analysis then uses only cached and manually entered vulnerabilities.
- The host may have no outbound access to `api.osv.dev`.
- The components may lack the identifiers (package URLs, versions) needed to match them. Check the imported SBOM.
- Infrastructure and COTS modules never show vulnerabilities: TrustSource CE does not look up vulnerabilities for catalog components.

See [External Services](../01-installation-setup/04-external-services.md#osv-vulnerability-lookups).

## The analysis does not finish

Each module analysis runs in its own worker with a limit of **5 minutes**. When it hits the limit, the app logs:

```
=> tsAnalyze:  analysis worker did not finish within 300000 ms
```

By default, two analyses run at the same time; further ones wait. Many simultaneous imports (for example from CI/CD) therefore queue up. The operator can raise `TS_ANALYSIS_CONCURRENCY`; every running analysis may use up to 1 GB of memory.

A slow license check service (for example under emulation on ARM) also makes analyses slower.

## Uploads are too large

The REST API accepts files up to **50 MB** by default and answers larger uploads with `413 File exceeds the upload limit of ... bytes`. The operator can raise the limit with `TS_UPLOAD_MAX_MB` in a compose override file; see [Settings Reference](../01-installation-setup/03-environment-variables.md#settings-not-passed-by-the-compose-file).

A reverse proxy has its own limit. If uploads fail with a `413` from the proxy, or with `502`/`503`, raise the proxy's limit too, e.g. `client_max_body_size` in nginx.

## A scan lands in a new module

A scan is assigned to a module by its project and its **module identifier**. If a CI/CD job sends a different module name or identifier than the module you expect, TrustSource CE creates a new module for it. Use the same identifier in every run of the pipeline. You find a module's identifier in its general settings.

## The demo project shows no results

The demo scan runs through the same analysis as a real scan. If the demo module stays empty, wait for the analysis to finish; if licenses show only warnings or no vulnerabilities appear, the causes above apply.

## Related

- [Import Scans](../02-inbound/02-import-scans.md)
- [CI/CD Scan](../02-inbound/03-cicd-scan.md)
- [External Services](../01-installation-setup/04-external-services.md)
