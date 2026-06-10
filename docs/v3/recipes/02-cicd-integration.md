# Recipe: CI/CD Integration

Set up automated scanning in your GitHub Actions, GitLab CI or Jenkins pipeline.

## Steps

1. [Create an API key](../06-administration/06-api-keys.md) in Administration.
2. Store the key as a CI/CD secret.
3. Add the scanner to your pipeline — see [CI/CD Integrations](../02-inbound/03-cicd-integrations.md) for examples.
4. Run a build and verify the scan appears in ***TrustSource***.
5. Review the findings and adjust your [whitelists](../03-internal/01-projects/settings/07-whitelists-blacklists.md) if needed.
