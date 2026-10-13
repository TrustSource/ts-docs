# Recipe: CI/CD Integration

Upload a dependency scan, an SBOM or SARIF results to ***TrustSource CE*** on every build, and optionally break the build on policy violations.

> [!NOTE]
> **You'll need:**
>
> - An existing project in ***TrustSource CE***. Uploads do not create projects. Create it once in the app (**Internal → Projects → Create**) or with `POST /core/projects` (see below).
> - A published API key with the scope `developer`, created by an account admin under **Administration → API keys → API keys**. See [API keys](../06-administration/04-api-keys.md).
> - Your installation reachable from the build runners, over HTTPS. See [HTTPS and reverse proxy](../01-installation-setup/05-https-reverse-proxy.md).

## Steps

1. Store the API key as a secret in your CI system, for example `TS_API_KEY`.
2. Store the API base URL as a variable, for example `TS_BASE_URL=https://<your-host>/api`.
3. Add one of the upload steps below to the pipeline.
4. Run a build and check the scan under **Inbound (Scans) → CI/CD Scan** and on the module page.
5. Review the findings and adjust allow and deny lists in the [project settings](../03-internal/01-projects/settings/07-whitelists-blacklists.md) if needed.

## GitHub Actions with ts-scan

The workflow installs [ts-scan](https://github.com/TrustSource/ts-scan), scans the dependencies and uploads the result.

```yaml
name: TrustSource scan
on:
  push:
    branches: [main]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - name: Install ts-scan
        run: pip install ts-scan==1.10.0
      - name: Scan dependencies
        run: ts-scan scan -o scan.json .
      - name: Upload to TrustSource CE
        env:
          TS_UPLOAD_API_KEY: ${{ secrets.TS_API_KEY }}
          TS_BASE_URL: ${{ vars.TS_BASE_URL }}
        run: >
          ts-scan upload --base-url "$TS_BASE_URL"
          --project-name "My Project" scan.json
```

Replace `My Project` with the name of your project. `TS_BASE_URL` is your installation's address followed by `/api`; ts-scan appends `/v2/core/scans`. `ts-scan upload` reads the key from the environment variable `TS_UPLOAD_API_KEY`, so the key never appears on the command line.

> [!WARNING]
> Never write the key into the workflow file or the repository. Anyone who can read it can call the API with the scope of the key.

Pin what the pipeline runs. Install a fixed ts-scan version, as `pip install ts-scan==1.10.0` does above, and pin third-party actions to a full commit SHA instead of a tag such as `@v4`. Then a new release of a tool cannot change your build, or receive your API key, without a reviewed change to the workflow.

### Fail the build on findings

Add `--wait-for-analysis` to wait until the analysis is finished, and the exit options to break the build:

```yaml
        run: >
          ts-scan upload --base-url "$TS_BASE_URL"
          --project-name "My Project"
          --wait-for-analysis --wait-timeout 300 --exit-on-legal --exit-on-vulns scan.json
```

| Option | Effect |
|---|---|
| `--wait-for-analysis` | Polls the scan until its analysis is finished. `--wait-timeout <seconds>` sets how long (default 60). |
| `--exit-on-legal` | Exits with code 1 if the analysis reports legal violations. |
| `--exit-on-vulns` | Exits with code 1 if the analysis reports vulnerability violations. |
| `--Werror` | Treats warnings like violations for the two exit options. |

> [!NOTE]
> The link to the results that ts-scan prints after waiting is built for the hosted service and does not open on your installation. Open the module in the app instead. The options were checked with ts-scan 1.10.

## Upload an SBOM produced by another tool

If your build already produces a CycloneDX or SPDX file, upload it with curl:

```bash
curl -fsS -X POST \
  "$TS_BASE_URL/v2/core/imports/scan/cyclonedx/json?project=My%20Project&module=my-module" \
  -H "x-api-key: $TS_API_KEY" \
  -F "file=@bom.cdx.json"
```

For SPDX use `.../imports/scan/spdx/json` or `.../imports/scan/spdx/rdf`. For RDF, give the content type explicitly, `-F "file=@sbom.rdf;type=application/rdf+xml"`; without it curl sends the file as `application/octet-stream`, which is read as JSON and refused with `400`. See [Imports](../09-rest-api/endpoints/imports.md).

## Upload SARIF results

Static analysis results go to the SW Quality Scans of the same module:

```bash
curl -fsS -X POST \
  "$TS_BASE_URL/v2/core/tests/sarif/json?projectName=My%20Project&moduleName=my-module" \
  -H "x-api-key: $TS_API_KEY" \
  -F "file=@results.sarif"
```

> [!TIP]
> Use the same module name on every upload path. A scan and a SARIF upload that name the same module differently land on two modules. ts-scan names the module after the artefact it detected; check the name on the module page and reuse it for the SARIF upload.

## Create the project from the pipeline

`POST /core/projects` accepts keys with the scope `developer`, `manager` or `portfolio_manager`. It returns the existing project if the name is taken, so you can run it before every upload:

```bash
curl -fsS -X POST "$TS_BASE_URL/v2/core/projects" \
  -H "x-api-key: $TS_API_KEY" -H "Content-Type: application/json" \
  -d '{"name": "My Project"}'
```

## Related

- [CI/CD Scan](../02-inbound/03-cicd-scan.md)
- [SW Quality Scans](../02-inbound/04-sw-quality-scans.md)
- [REST API: Scans](../09-rest-api/endpoints/scans.md)
- [API keys](../06-administration/04-api-keys.md)
