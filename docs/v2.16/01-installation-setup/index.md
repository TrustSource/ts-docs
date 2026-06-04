# Installation & Setup

How to install ***TrustSource*** on your own infrastructure. Cloud customers can skip this chapter entirely.

## In this chapter

| Page | Status | Scope |
|---|---|---|
| [Prerequisites](01-prerequisites.md) | _Scaffold_ | Hardware, OS, MongoDB, AWS account (optional), domains, certificates. |
| [Docker-Compose Setup](02-docker-compose.md) | _Scaffold_ | Container-based installation, the recommended path for self-hosting. |
| [Environment Variables](03-environment-variables.md) | _Scaffold_ | Reference for the ~94 env vars defined in `imports/server/config.js`. |
| [External Services Setup](04-external-services.md) | _Scaffold_ | DeepScan, Component-Index, Vulnerability-API, Bedrock, S3, ... |
| [Keycloak / SSO Setup](05-sso-keycloak-setup.md) | _Scaffold_ | Step-by-step for multi-realm authentication. |
| [Creating the First Admin User](06-first-admin-user.md) | _Scaffold_ | Bootstrap user, first company, initial sign-in. |
| [Backups & Monitoring](07-backups-monitoring.md) | _Scaffold_ | MongoDB dumps, S3 lifecycle, Sentry telemetry. |
| [Upgrade Guide](08-upgrade.md) | _Scaffold_ | Upgrade paths between versions. |
