# Post-Release Vulnerability Tracking

Once a module is approved and released, ***TrustSource CE*** keeps comparing the frozen components of the release with the vulnerabilities it knows. This matters for CRA and NIS2: you must respond to new vulnerabilities even after shipping.

## Where vulnerability data comes from

TrustSource CE looks up vulnerabilities in OSV while it analyses modules, and stores them in the [Vulnerability Lake](../../05-knowledge/04-vulnerability-lake.md). Manual vulnerabilities from **Administration → Settings → Manual vulnerability** are included too. A vulnerability that is published after your release becomes visible once an analysis has fetched it, for example the next analysis of a module that uses the same component.

If OSV lookups are switched off (`TS_OSV_ENABLED=false`), no new vulnerabilities arrive. See [External services](../../01-installation-setup/04-external-services.md).

## What you see on the release

Open the release under **Internal → Releases**.

- **New vulnerabilities**: the vulnerabilities that affect the released components and were not part of the approval, with the counters *new vulnerabilities*, *resolved vulnerabilities* and *vulnerable components*. **Export as CSAF** creates a CSAF VEX draft from this list under [Outbound → CSAF](../../04-outbound/04-csaf.md) and downloads it as JSON.
- **Vulnerabilities**: the vulnerabilities as they were known at approval.
- **Export control**: the crypto algorithms detected in the release.

![The New vulnerabilities tab of the release Webshop Frontend 2.4.0 with Export as CSAF, the counters 1 new vulnerabilities, 0 resolved vulnerabilities and 1 vulnerable components, and the finding EXCORP-2026-0001 with score 7.5 in npm:webshop-frontend 2.4.0.](../../../assets/images/ce/03-internal/06-approvals/06-post-release-vulnerabilities-1.webp)

External parties that hold a [release key](05-public-approves.md) can read the same changes as a CSAF VEX document from `/api/v2/compliance/releases/{release_key}/csaf-changes`.

## Alerts

TrustSource CE can tell you about new vulnerabilities without anyone opening the release. Alerts are delivered through **Webhooks and Channels**, either for the whole company ([Administration → Integrations](../../06-administration/08c-webhooks-channels.md)) or for one project ([project settings](../01-projects/settings/13-webhooks-channels.md)). Choose a vulnerability trigger:

| Trigger | One message per | Compared against |
|---|---|---|
| **Vulnerability** | component | the project's current components |
| **Vulnerabilities by module** | module | the project's current components |
| **Vulnerabilities by project** | project | the project's current components |
| **Vulnerabilities in releases** | release | the frozen components of each release |

For released versions, use **Vulnerabilities in releases**. A webhook may carry several triggers; you then receive the same finding at several granularities.

### How the sweep works

- A background job checks the projects that have a webhook with a vulnerability trigger. It runs 5 minutes after the server starts and then every 60 minutes, a batch of 25 projects per run, oldest-checked first.
- The first check after you add such a webhook records the current state as baseline and sends nothing. Later checks report only vulnerabilities that are new since then.
- Operators can tune the job with `TS_VULN_ALERT_SWEEP` (`false` switches it off), `TS_VULN_ALERT_INTERVAL_MIN`, `TS_VULN_ALERT_PROJECT_BATCH` and `TS_VULN_ALERT_RELEASE_BATCH`. These settings are read by the app but not passed through by the reference `docker-compose.yml`; set them with a compose override. See [Environment variables](../../01-installation-setup/03-environment-variables.md).

> [!TIP]
> Send release alerts to the channel of the team that maintains the released version, for example a Microsoft Teams Workflow or Slack channel.

## Related

- [Releases](../07-releases.md): managing released versions
- [Vulnerability Lake](../../05-knowledge/04-vulnerability-lake.md): the vulnerability data
- [Recipe: React to a 0-day](../../recipes/04-react-to-0day.md)
