# Installation Troubleshooting

Problems when installing, starting or operating ***TrustSource CE*** with the reference Docker Compose setup. Run the commands in the directory of `docker-compose.yml`.

Start with the status and the app log:

```
docker compose ps
docker compose logs --tail 200 ts_core
```

## Quick reference

| Symptom | Likely cause | Fix |
|---|---|---|
| `docker compose up` stops with *required variable ... is missing a value* | One of the five required settings is empty. | Fill it in `.env`; see [the quickstart](../01-installation-setup/02-docker-compose.md#quickstart). |
| The app log ends with `Connecting to MongoDB ...` and nothing follows | The app cannot sign in to MongoDB. | See [The app cannot connect to MongoDB](#the-app-cannot-connect-to-mongodb). |
| `[SECURITY] refusing to start without an encryption key.` | `TS_ENCRYPTION_KEY` is not set. | Set it in `.env` and run `docker compose up -d`. |
| `=> Initial admin not created: <reason>` | An `INITIAL_ADMIN_*` setting is missing or invalid. | Fix the setting named in the reason; see [First Admin User](../01-installation-setup/06-first-admin-user.md). |
| No `=> Initial admin created` line, and the admin cannot sign in | The database already had users, so no administrator was created. | Sign in with an existing account, or use **I forgot my password**. |
| `ts_legalcheck` exits with *exec format error* | ARM host without amd64 emulation. | Install amd64 emulation for Docker; see [Prerequisites](../01-installation-setup/01-prerequisites.md#cpu-architecture). |
| All licenses show as warnings | The license check service is not reachable. | See [Scan Troubleshooting](03-scan-troubleshooting.md#all-licenses-show-as-warnings). |
| `http://localhost:3000` works on the server, but not from other machines | Port 3000 is published on `127.0.0.1` only. | Put a reverse proxy in front; see [HTTPS and Reverse Proxy](../01-installation-setup/05-https-reverse-proxy.md). |
| [The app loads, but shows no data](#the-app-loads-but-shows-no-data) | Live connection refused or not forwarded. | Check `ROOT_URL` and WebSocket forwarding. |
| [Too many redirects](#too-many-redirects) | `X-Forwarded-Proto` is wrong. | Send the real scheme from the proxy. |
| Links in emails point to `localhost` | `ROOT_URL` is not set to the public address. | Set `ROOT_URL` and run `docker compose up -d`. |
| `=> Version check was unsuccessful` | GitHub is not reachable from the server. | Nothing to do; the check is optional and has no other effect. |
| All data is gone after a restart | The stack was removed with `docker compose down -v`, which deletes the volumes. | Restore from a backup; see [Backups & Monitoring](../01-installation-setup/07-backups-monitoring.md#restore). |

## The build fails

The first `docker compose up -d --build` downloads the base images, Meteor, Node.js packages and npm dependencies. If it fails:

- Check outbound access to Docker Hub, `install.meteor.com`, the NodeSource repository and the npm registry; see [Prerequisites](../01-installation-setup/01-prerequisites.md#network).
- Check free disk space; the build needs room for the intermediate image.
- Run the build again: `docker compose build ts_core`. A temporary network error often goes away.

## The app cannot connect to MongoDB

The app's entrypoint logs `Connecting to MongoDB ...` and waits until it can connect. If it waits forever, check:

- **The passwords were changed after the first start.** The MongoDB users are created only when the `mongo-data` volume is first initialised. Changing `MONGO_APP_PASSWORD`, `MONGO_APP_USERNAME` or the root credentials later has no effect on the database, and the app then connects with a password MongoDB does not know. Set the original values again.
- **The password contains special characters.** `MONGO_APP_PASSWORD` is placed unescaped in the connection string. Use hex or other URL-safe values; to change it on an existing volume, change the user's password in MongoDB first.
- **MongoDB is not healthy.** Check `docker compose ps mongo` and `docker compose logs mongo`.

## The app loads, but shows no data

The app keeps a live connection to the browser on `/websocket` and `/sockjs`. If the page loads but data never appears, or it keeps reconnecting:

1. **Origin.** The app refuses live connections from any origin other than `ROOT_URL` (and `TS_ALLOWED_DDP_ORIGINS`). If users open `https://ts.example.org` while `ROOT_URL` is still `http://localhost:3000/`, the connection is refused with HTTP 403. Set `ROOT_URL` to the exact address users open, including `https`, and run `docker compose up -d`.
2. **WebSocket forwarding.** The reverse proxy must forward the `Upgrade` and `Connection` headers. See the [nginx example](../01-installation-setup/05-https-reverse-proxy.md#example-nginx).
3. **Invalid `ROOT_URL`.** If the log shows `[sockjs-origin-guard] could not derive own origin from ROOT_URL`, `ROOT_URL` is not a valid URL.

## Too many redirects

With an `https` `ROOT_URL`, the app redirects every request whose `X-Forwarded-Proto` header says `http` to the HTTPS address. If the proxy terminates HTTPS but sends `X-Forwarded-Proto: http` - or the proxy itself redirects HTTPS to HTTP - the browser loops. Set `X-Forwarded-Proto` to the scheme the client actually used (`$scheme` in nginx).

## Analyses are slow or time out

See [The analysis does not finish](03-scan-troubleshooting.md#the-analysis-does-not-finish). Each analysis may use up to 1 GB of memory; with too little memory on the host, analyses fail or the container is restarted.

## Stored credentials, API keys or signatures stopped working

After a restore or a move to another server, the installation must run with the same `TS_ENCRYPTION_KEY`. See [Stored credentials can no longer be read](04-integration-troubleshooting.md#stored-credentials-can-no-longer-be-read) and [The encryption key](../01-installation-setup/08-upgrade.md#the-encryption-key).

## Related

- [Installation & Setup](../01-installation-setup/index.md)
- [Backups & Monitoring](../01-installation-setup/07-backups-monitoring.md#logs) - log lines worth knowing
- [Reporting a Problem](06-contact-support.md)
