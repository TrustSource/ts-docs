# Backups & Monitoring

All data of a ***TrustSource CE*** installation lives in two Docker volumes and one secret. A complete backup covers all three.

| What | Where | How |
|---|---|---|
| Database | volume `mongo-data` | `mongodump` (below) |
| Uploaded and generated files | volume `ts-files` | archive of `/app.storage/files` (below) |
| Settings and encryption key | `.env` (and `docker-compose.override.yml`, if you use one) | copy to a separate secret store |

> [!WARNING]
> A database backup is only usable with the same `TS_ENCRYPTION_KEY`. Keep `.env` in a separate secret store, for example a password manager or a secrets vault, and not in the same backup set as the archives: whoever holds both the database archive and the key can read every credential stored in the app.

## What the backups contain

Treat both archives as confidential.

- The **database archive** holds personal data: user names and email addresses, password hashes, the login history, and the request logs of release and CSAF feed keys with the callers' IP addresses. It also holds live credentials in plain text: release keys, CSAF feed keys, webhook URLs and headers, and the LeanIX API token. The other integration credentials (Jira, Azure DevOps, GitHub, SCANOSS) are encrypted with `TS_ENCRYPTION_KEY`.
- The **files archive** holds your uploaded and generated files: SBOMs, scan results, notice files, policies and product documents.

Anyone who can read a backup can use the release and CSAF feed keys and the LeanIX token in it, call your webhook targets and read your users' data. Therefore:

- Write the archives outside the repository directory, with `umask 077`, as in the commands below. The repository does not exclude archive files from git.
- Encrypt the archives before you copy them off the host, for example with `gpg --symmetric` or `age`.
- Restrict who can read the backup location, on the host and off it.
- Keep a few generations and delete older ones you no longer need.

## Back up

Run the commands in the directory of `docker-compose.yml`. For a consistent pair of database and files, stop the app first and start it again afterwards; MongoDB must keep running. The example writes to `/var/backups/trustsource/<date>`; choose any directory outside the repository that only administrators can read. That path needs root; `umask 077` stays in effect for the rest of the shell session.

```
umask 077
BACKUP_DIR=/var/backups/trustsource/$(date +%F)
mkdir -p "$BACKUP_DIR"

docker compose stop ts_core

# Database
docker compose exec -T mongo sh -c 'mongodump -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --db meteor --archive' > "$BACKUP_DIR/backup.archive"

# Files
docker run --rm --volumes-from "$(docker compose ps -aq ts_core)" -v "$BACKUP_DIR":/backup alpine \
  sh -c 'umask 077 && tar czf /backup/ts-files.tar.gz -C /app.storage/files .'

docker compose start ts_core
```

The database command runs `mongodump` inside the `mongo` container with the root credentials the container already knows, and writes the archive to `backup.archive` in the backup directory. The files command archives the `ts-files` volume through the (stopped) app container.

## Restore

Restore into a fresh installation with the **same `.env`**, before the app has created any data. Decrypt the archives first and set `BACKUP_DIR` to the directory that holds them:

1. Make sure the volumes are empty. To replace an existing installation: `docker compose down -v` - this deletes all current data.
2. Start only MongoDB and wait until it is healthy:

    ```
    docker compose up -d mongo
    ```

3. Restore the database:

    ```
    docker compose exec -T mongo sh -c 'mongorestore -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --archive' < "$BACKUP_DIR/backup.archive"
    ```

4. Build the app image and restore the files into the `ts-files` volume. The command runs a one-off app container as root, unpacks the archive and gives the files to the image's `meteor` user, which must be able to write them:

    ```
    docker compose build ts_core
    docker compose run --rm --no-deps --user root --entrypoint sh -v "$BACKUP_DIR":/backup ts_core \
      -c 'tar xzf /backup/ts-files.tar.gz -C /app.storage/files && chown -R meteor:meteor /app.storage/files'
    ```

5. Start everything:

    ```
    docker compose up -d
    ```

Restore the database **before** the app starts for the first time: an app that finds an empty database creates the first administrator, and the restored users would then sit next to it.

> [!NOTE]
> The database backup contains the `meteor` database only, not the MongoDB users. The app user is created again from `MONGO_APP_USERNAME` and `MONGO_APP_PASSWORD` when the new volume is initialised.

## Health check

The app answers `GET /healthcheck` with HTTP 200 and an empty body as soon as it accepts requests. The path is never redirected to HTTPS, so a load balancer can call it over plain HTTP.

The compose file uses it for the `ts_core` health check (every 15 s, after a 60 s start period). See the state with:

```
docker compose ps
```

The health check shows that the app process answers. It does not check MongoDB, the license check service or outbound connections - watch the logs for those.

## Logs

```
docker compose logs -f ts_core          # the app
docker compose logs -f ts_legalcheck    # the license check service
docker compose logs -f mongo            # the database
```

Log lines worth watching for in the app log:

| Log line | Meaning |
|---|---|
| `=> Config:` followed by the settings | Start of the app. Secrets are masked. |
| `=> Version: 1.0` | The running release note version. |
| `=> Initial admin created: ...` | First start on an empty database succeeded. |
| `=> Initial admin not created: <reason>` | A required `INITIAL_ADMIN_*` setting is missing or invalid. See [First Admin User](06-first-admin-user.md). |
| `=> Version check: <status>` / `=> Version check was unsuccessful` | Result of the startup version check; a failure is harmless. |
| `=> MAIL_URL variable is missing` | No SMTP server configured; emails cannot be sent. |
| `[SECURITY] refusing to start without an encryption key.` | `TS_ENCRYPTION_KEY` is missing; the app stops. |
| `=> CheckModule: TS_CHECK_SERVER is not set` / `=> CheckModule failed: ...` | The license check service is not configured or not reachable; licenses stay unevaluated. |
| `=> tsAnalyze: <reason>` | A module analysis failed. `analysis worker did not finish within 300000 ms` means it hit the 5-minute limit. |
| `Exception in decryption` | A stored credential cannot be decrypted, usually because `TS_ENCRYPTION_KEY` changed. |
| `[sockjs-origin-guard] could not derive own origin from ROOT_URL` | `ROOT_URL` is not a valid URL. |
| `=> vulnerability alert sweep failed: ...` | The periodic vulnerability alert check failed for this pass. |

For more detail on the license check and analysis, you can temporarily set `DEBUG_MODE_ENABLED=true` through a compose override file. Switch it off again: the log then contains module contents.

## Related

- [Upgrade Guide](08-upgrade.md) - back up before every update
- [Installation Troubleshooting](../11-troubleshooting-faq/05-installation-troubleshooting.md)
