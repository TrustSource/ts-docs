# Settings Reference

***TrustSource CE*** is configured through environment variables. In the reference [Docker Compose setup](02-docker-compose.md) you put them in the `.env` file next to `docker-compose.yml`; Docker Compose reads it automatically. Variables from the shell environment work too.

After changing a setting, apply it with:

```
docker compose up -d
```

Compose recreates the containers whose configuration changed. Data in the volumes is kept.

> [!NOTE]
> `.env` only provides values for the variables `docker-compose.yml` refers to. A setting the compose file does not pass to the container has no effect in `.env` alone - set it with a [compose override file](#settings-not-passed-by-the-compose-file) instead.

## Required settings

The stack refuses to start without these five. They have no default.

| Setting | Purpose |
|---|---|
| `INITIAL_ADMIN_EMAIL` | Email of the first administrator, created on an empty database at first start. |
| `INITIAL_ADMIN_PASSWORD` | Their password, at least 8 characters. |
| `TS_ENCRYPTION_KEY` | Secret that encrypts stored integration credentials, signs release files and protects REST API keys. Set it once and keep it; see [the warning below](#the-encryption-key). |
| `MONGO_ROOT_PASSWORD` | Password of the MongoDB root user the compose file creates. |
| `MONGO_APP_PASSWORD` | Password of the MongoDB user the app connects with (read/write on its own database only). Must be URL-safe: it is placed in the connection string unescaped. |

The MongoDB passwords and the `INITIAL_*` settings only take effect on first start; see [First Admin User](06-first-admin-user.md).

## Optional settings in `.env`

These are passed by the compose file; set them in `.env` to change the default.

| Setting | Default | Purpose |
|---|---|---|
| `INITIAL_COMPANY_NAME` | `My company` | Name of the company created with the first administrator. |
| `ROOT_URL` | `http://localhost:3000/` | Public URL of the app: the address users open. Links in emails and documents are built from it, and live updates are refused from any other origin. See [HTTPS and Reverse Proxy](05-https-reverse-proxy.md). |
| `TS_BIND_ADDRESS` | `127.0.0.1` | Host address port 3000 is published on. Keep it local behind a reverse proxy on the same host; `0.0.0.0` publishes it on every interface. |
| `TS_ALLOWED_DDP_ORIGINS` | unset | Further origins (comma-separated, e.g. `https://ts.internal.example`) users may open the app from. |
| `TS_ANALYSIS_CONCURRENCY` | `2` | How many module analyses run at the same time. Each may use up to 1 GB of memory. |
| `MONGO_ROOT_USERNAME` | `admin` | MongoDB root user name. |
| `MONGO_APP_USERNAME` | `trustsource` | MongoDB user name the app connects with. |
| `REGISTRATION_ENABLED` | `false` | Self sign-up with email and password on the login page. Only the literal `true` enables it. |
| `TS_OSV_ENABLED` | `true` | Ask OSV (`api.osv.dev`) for vulnerabilities on every analysis. `false` for air-gapped installations. |
| `TS_EPSS_ENABLED` | `true` | Read EPSS exploit scores from FIRST (`api.first.org`) for the vulnerability report. `false` for air-gapped installations. |
| `MAIL_URL` | `smtp://mailpit:1025` | SMTP server for outgoing email, in the form `smtp://USER:PASSWORD@HOST:PORT`. The default, Mailpit, is for testing only; see [Docker Compose Setup](02-docker-compose.md#mailpit). |
| `MAIL_SENDER` | `noreply@localhost` | Sender address of outgoing email. |
| `TS_OPERATOR_NAME` | unset | Who runs the installation, shown in the footer of outgoing emails. |
| `TS_SUPPORT_EMAIL` | unset | Support address for the email footer. Account emails also tell an unexpected recipient to contact it. |
| `TS_IMPRINT_URL` | unset | Imprint page for the email footer. |
| `TS_CSAF_PROVIDER_URL` | unset | CSAF provider advisories are published to. Must start with `http://` or `https://`. |
| `TS_CSAF_PROVIDER_PASSPHRASE` | unset | Passphrase for the CSAF provider. |
| `TS_CSAF_PROVIDER_PASSWORD` | unset | Password for the CSAF provider. All three CSAF settings are needed to publish. |

> [!WARNING]
> With `REGISTRATION_ENABLED=true`, anyone who can reach the login page can create an account. Each sign-up gets its own company with all seven roles - including the right to edit the license and infrastructure catalogs that every company of the installation shares. Enable it only for installations where that is acceptable.

## Set by the compose file

The compose file sets these itself. You normally do not change them.

| Setting | Value in the compose file | Purpose |
|---|---|---|
| `MONGO_URI` | built from the MongoDB app user and password | Database connection. The entrypoint also exports it as `MONGO_URL`. |
| `PORT` | `3000` | Port the app listens on inside the container. |
| `METEOR_UPLOAD_FOLDER` | `/app.storage/files` | Where files are stored; the `ts-files` volume is mounted there. |
| `TS_CHECK_SERVER` | `http://ts_legalcheck:5000/` | URL of the license check service. Without it, licenses are not evaluated and show as warnings. |

## Settings not passed by the compose file

The app also reads the following settings, but `docker-compose.yml` does not pass them to the container. To set one, create a file `docker-compose.override.yml` next to `docker-compose.yml`. Docker Compose merges it automatically:

```yaml
services:
  ts_core:
    environment:
      - TS_UPLOAD_MAX_MB=100
      - TS_VULN_ALERT_INTERVAL_MIN=30
```

Then run `docker compose up -d`. Keep the override file when you update; `git pull` does not touch it.

| Setting | Default | Purpose |
|---|---|---|
| `TS_UPLOAD_MAX_MB` | `50` | Maximum size of a file uploaded through the REST API, in MB. Larger uploads are refused with HTTP 413. |
| `TS_VULN_ALERT_SWEEP` | `true` | Periodic check for new vulnerabilities, for projects with webhooks that have vulnerability triggers. Only the literal `false` disables it. |
| `TS_VULN_ALERT_INTERVAL_MIN` | `60` | Minutes between two vulnerability alert passes. The first pass runs 5 minutes after start. |
| `TS_VULN_ALERT_PROJECT_BATCH` | `25` | Projects evaluated per pass. Projects take turns, so all are covered over several passes. |
| `TS_VULN_ALERT_RELEASE_BATCH` | `10` | Approved releases evaluated per project and pass, taking turns in the same way. |
| `DEBUG_MODE_ENABLED` | `false` | Verbose logging, including request and response details of the license check. Only the literal `true` enables it. Do not leave it on: the log then contains module contents. |
| `TS_ENCRYPTION_KEY_LEGACY` | unset | Password of the older encryption format. Only needed to read credentials stored in that format; see [Upgrade Guide](08-upgrade.md#the-encryption-key). |
| `TS_REENCRYPT_SECRETS` | unset | One-time migration of credentials from the older format: `dry` reports what would change, `true` performs it. See [Upgrade Guide](08-upgrade.md#the-encryption-key). |
| `TS_REQUIRE_ENCRYPTION_KEY` | unset | With `true`, the app refuses to start when only `TS_ENCRYPTION_KEY_LEGACY` is set. |
| `HTTP_FORWARDED_COUNT` | unset | Number of reverse proxies in front of the app. Only when it is set does the app take the client address from `X-Forwarded-For`, which the per-address sign-in limits need. See [HTTPS and Reverse Proxy](05-https-reverse-proxy.md#client-addresses-behind-the-proxy). |
| `TS_DISABLE_SOCKJS_ORIGIN_GUARD` | unset | With `true`, switches off the check that refuses live connections from origins other than `ROOT_URL` and `TS_ALLOWED_DDP_ORIGINS`. Prefer setting `ROOT_URL` and `TS_ALLOWED_DDP_ORIGINS` correctly. |

## The encryption key

`TS_ENCRYPTION_KEY` protects:

- integration credentials stored by the app (Jira, TFS, GitHub, SCANOSS and LeanIX tokens and passwords),
- the lookup of REST API keys,
- the signatures of release files (SBOM, notice, VEX) checked by **Verify**,
- the product identifiers published in CSAF and VEX documents.

> [!WARNING]
> Never change `TS_ENCRYPTION_KEY` on an installation that has data. TrustSource CE has no way to move data from one key to another. After a change, stored credentials can no longer be read, existing API keys are no longer recognised, and signatures of existing release files no longer verify. Keep a copy of the key in a separate secret store, not in the same backup set as the database; see [Backups & Monitoring](07-backups-monitoring.md).

A production server without `TS_ENCRYPTION_KEY` (and without `TS_ENCRYPTION_KEY_LEGACY`) refuses to start and logs `[SECURITY] refusing to start without an encryption key.`

## Logged settings

At start, the app logs its settings after `=> Config:`. Values of secrets (keys, passwords, passphrases, `MAIL_URL`, `MONGO_URI`) are masked except for their last characters, and `INITIAL_ADMIN_PASSWORD` is only shown as `set` or `unset`. Still treat the log as confidential.

Release keys and CSAF feed keys are part of the URLs that recipients call. Those URLs, keys included, appear in the app log and in the access logs of your reverse proxy. Restrict who can read these logs, and rotate a key if a log has been exposed.

## Related

- [External Services](04-external-services.md) - what `TS_OSV_ENABLED`, `TS_EPSS_ENABLED`, `MAIL_URL` and the CSAF settings connect to
- [HTTPS and Reverse Proxy](05-https-reverse-proxy.md) - `ROOT_URL`, `TS_BIND_ADDRESS`, `TS_ALLOWED_DDP_ORIGINS`
- [Upgrade Guide](08-upgrade.md) - the encryption key during updates
