# Docker Compose Setup

The repository of ***TrustSource CE*** contains a reference `docker-compose.yml`. It runs everything an installation needs on one host. This page walks you through the first start and explains what runs where.

Check the [Prerequisites](01-prerequisites.md) first.

## Quickstart

1. Clone the repository and change into it:

    ```
    git clone https://github.com/TrustSource/ts-core-ce.git
    cd ts-core-ce
    ```

2. Create your settings file from the template:

    ```
    cp .env.example .env
    ```

3. Fill in the five required settings in `.env`:

    | Setting | What to put there |
    |---|---|
    | `INITIAL_ADMIN_EMAIL` | Email of the first administrator. |
    | `INITIAL_ADMIN_PASSWORD` | Their password, at least 8 characters. |
    | `TS_ENCRYPTION_KEY` | Random secret that encrypts stored credentials and signs releases. Keep it: changing it later makes stored credentials unreadable. |
    | `MONGO_ROOT_PASSWORD` | Password for the bundled MongoDB's root user. |
    | `MONGO_APP_PASSWORD` | Password for the MongoDB user the app connects with (read/write on its own database only). |

    Generate the secrets with:

    ```
    openssl rand -hex 32
    ```

    Use hex or other URL-safe values for the MongoDB passwords; they are placed in a connection string unescaped. `INITIAL_COMPANY_NAME` is optional (default `My company`).

4. Build and start:

    ```
    docker compose up -d --build
    ```

    The first build takes several minutes. Follow the start-up with:

    ```
    docker compose logs -f ts_core
    ```

    On the first start, the app is ready once it logs `=> Initial admin created`.

5. On the same machine, open <http://localhost:3000> and sign in with `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD`.

Emails the app sends (invitations, password resets) are caught by Mailpit at <http://localhost:8025>. Mailpit is for testing only; see [Mailpit](#mailpit) below.

> [!WARNING]
> Keep a copy of `.env` - above all `TS_ENCRYPTION_KEY` - somewhere safe, outside the host, in a secret store rather than with your backups. Without the same key, a restored database cannot read its stored credentials, and existing API keys and signatures stop working. `.env` is excluded from git; `.env.example` is not, so never put a real credential into `.env.example`.
>
> `INITIAL_ADMIN_PASSWORD` stays in `.env` in plain text. After the first sign-in, change the administrator's password in the app, then replace the value in `.env` with a random one (for example from `openssl rand -hex 32`) and run `docker compose up -d` so the running container no longer holds the old value. The compose file requires the setting to be present, but the app ignores it once a user exists.

📸 *Screenshot: the terminal output of `docker compose logs -f ts_core` ending with "=> Initial admin created".*

## What runs where

The compose file defines four services:

| Service | Image | Purpose |
|---|---|---|
| `mongo` | `mongo:7` | The database. It creates the database `meteor` and, when its volume is first initialised, the app user with read/write rights on that database only. Not published on the host. |
| `ts_core` | built from the repository's `Dockerfile` | The TrustSource CE app (Meteor on Node.js 24, running as the unprivileged user `meteor`). Listens on port 3000, published on `${TS_BIND_ADDRESS:-127.0.0.1}:3000`. Its health check calls `/healthcheck`. |
| `ts_legalcheck` | `trustsource/ts-legalcheck:1.1.2` | The license check service that evaluates license compatibility during analysis. Reached by the app at `http://ts_legalcheck:5000/`. amd64 only; emulated on ARM hosts. |
| `mailpit` | `axllent/mailpit` | A mail catcher for testing. Its web UI is published on `127.0.0.1:8025`. Replace it with your SMTP server for real email; see [Mailpit](#mailpit) and [External Services](04-external-services.md#mail-smtp). |

`ts_core` starts once MongoDB reports healthy. Its entrypoint waits until it can connect to MongoDB, then starts the app.

## Mailpit

Mailpit is meant for testing. Its web UI has no authentication and shows every email the app sends, including password reset and enrolment links: anyone who can open it can take over accounts.

Once `MAIL_URL` points to your SMTP server, remove Mailpit. Stop and remove the container with `docker compose rm -sf mailpit`, and keep it from starting again with a `docker-compose.override.yml` next to `docker-compose.yml` that puts the service in a profile you never enable (if you already have an override file, add the entry to it):

```yaml
services:
  mailpit:
    profiles: ["testing"]
```

`git pull` does not touch the override file; see [Settings Reference](03-environment-variables.md#settings-not-passed-by-the-compose-file).

## Volumes

| Volume | Mounted at | Contents |
|---|---|---|
| `mongo-data` | `/data/db` in `mongo` | The database. |
| `ts-files` | `/app.storage/files` in `ts_core` | Uploaded and generated files: notice files, product documents, SPDX files, imports, policies. |

Both volumes hold your data. Back up both; see [Backups & Monitoring](07-backups-monitoring.md).

> [!NOTE]
> The MongoDB root and app users are created only when the `mongo-data` volume is created. Changing `MONGO_ROOT_PASSWORD`, `MONGO_APP_PASSWORD` or the user names later has no effect on an existing volume - the app would then fail to connect. Likewise, `INITIAL_ADMIN_*` and `INITIAL_COMPANY_NAME` only matter on the very first start with an empty database.

## Day-to-day commands

```
docker compose stop                    # stop, keep data
docker compose up -d --build           # start, or update after a git pull
docker compose logs -f ts_core         # follow the app log
docker compose ps                      # status and health of the services
docker compose down -v                 # remove everything, including all data
```

> [!WARNING]
> `docker compose down -v` deletes both volumes - the database and all files. Use `docker compose stop` or `docker compose down` (without `-v`) to keep your data.

## Running more app containers

Several `ts_core` containers can serve the same installation. They must all connect to the same MongoDB and mount the same files volume at the same path (`/app.storage/files`), writable by the image's `meteor` user. A named volume inherits that ownership; a bind mount needs matching ownership.

## Where to next

- [Settings Reference](03-environment-variables.md) - all settings, and how to set those the compose file does not pass on.
- [HTTPS and Reverse Proxy](05-https-reverse-proxy.md) - before other users connect.
- [First Admin User](06-first-admin-user.md) - what to do after the first sign-in.
