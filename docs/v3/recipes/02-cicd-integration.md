# Recipe: CI/CD Integration

Set up automated scanning in your GitHub Actions, GitLab CI or Jenkins pipeline.

## Steps

1. [Create an API key](../06-administration/04-api-keys.md) in Administration. A key with the `developer` scope is enough to submit scans.
2. Store the key as a CI/CD secret.
3. Add the scanner to your pipeline — see [CI/CD Integrations](../02-inbound/03-cicd-scan.md) for examples, or use the GitHub Actions workflow below.
4. Run a build and verify the scan appears in ***TrustSource***.
5. Review the findings and adjust your [whitelists](../03-internal/01-projects/settings/07-whitelists-blacklists.md) if needed.

## GitHub Actions with ts-scan

[GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) runs a workflow on every push. The workflow below installs [ts-scan](https://github.com/TrustSource/ts-scan), scans your dependencies and uploads the result to ***TrustSource***.

### 1. Store the API key as a secret

In your GitHub repository open **Settings → Secrets and variables → Actions** and add a repository secret named `TS_API_KEY` with your ***TrustSource*** API key.

> [!WARNING]
> Never write the key into the workflow file or the repository. Anyone who can read it can call the API with the scope of the key.

### 2. Add the workflow

Create `.github/workflows/trustsource.yml`:

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
        run: pip install ts-scan
      - name: Scan dependencies
        run: ts-scan scan -o scan.json .
      - name: Upload to TrustSource
        env:
          TS_API_KEY: ${{ secrets.TS_API_KEY }}
        run: ts-scan upload --project-name "My Project" --api-key "$TS_API_KEY" scan.json
```

Replace `My Project` with the name of your ***TrustSource*** project. ts-scan needs Python 3.10 or newer.

### 3. Optional: fail the build on findings

Add `--wait-for-analysis` to wait until ***TrustSource*** has processed the scan. With it you can break the build on policy results:

```yaml
        run: >
          ts-scan upload --project-name "My Project" --api-key "$TS_API_KEY"
          --wait-for-analysis --exit-on-legal --exit-on-vulns scan.json
```

| Option | Effect |
|---|---|
| `--wait-for-analysis` | Waits until the analysis finishes. `--wait-timeout <seconds>` sets how long. |
| `--exit-on-legal` | Exits with code 1 if the analysis reports legal policy violations. |
| `--exit-on-vulns` | Exits with code 1 if the analysis reports vulnerability policy violations. |
| `--Werror` | Treats warnings like violations when you use the two exit options. |

The exit options work only together with `--wait-for-analysis`.

> [!IMPORTANT]
> Leave out `--format` on both `scan` and `upload`. The scan then writes the native ***TrustSource*** format, which is the only format `ts-scan upload` accepts. A CycloneDX or SPDX document goes through `ts-scan import`, not through `upload`.

To send a CycloneDX or SPDX file that another tool produced, use the import command instead of `upload`:

```yaml
        run: >
          ts-scan import -f cyclonedx -v <format version> --module "my-module"
          --project-name "My Project" --api-key "$TS_API_KEY" sbom.json
```

See `ts-scan import --help` for the supported formats and options.

> [!TIP]
> Keep the module name the same on every upload path. A scan and a [SARIF upload](../02-inbound/04-sw-quality-scans.md) that name the same module differently land on two modules.

## Related

- [CI/CD Scan](../02-inbound/03-cicd-scan.md)
- [API keys](../06-administration/04-api-keys.md)
- [REST API: Scans](../09-rest-api/endpoints/scans.md)
