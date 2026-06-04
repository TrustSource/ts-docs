# Post-Release Vulnerability Tracking

Once a module is approved and released, ***TrustSource*** continues monitoring its components for **newly discovered vulnerabilities**. This is critical for CRA and NIS2 compliance — you must respond to new CVEs even after shipping.

## What you see

The post-release view shows:

- **New vulnerabilities** — CVEs published after the approval date that affect components in the frozen snapshot.
- **Changed components** — components whose vulnerability status changed since the approval.
- **Export control updates** — changes to export restriction classifications.

📸 *Screenshot: the post-release vulnerability tab showing newly discovered CVEs.*

> [!TIP]
> Set up [webhooks](../../06-administration/07-integrations.md) to receive notifications when new vulnerabilities are found in released modules.

## Related

- [Releases](../07-releases.md) — managing released versions
- [Vulnerability Lake](../../05-knowledge/02-vulnerability-lake.md) — the CVE database
