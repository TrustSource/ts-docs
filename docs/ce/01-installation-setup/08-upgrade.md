# Upgrade Guide

***TrustSource CE*** is updated from its git repository: you pull the new version and rebuild the app image. Your data stays in the Docker volumes.

## Before you update

1. **Back up** the database and the files volume, and check that your separately stored copy of `.env` is current; see [Backups & Monitoring](07-backups-monitoring.md).
2. **Read the release notes** of the new version in [Release Notes](../12-release-notes/index.md).
3. **Keep `.env` and `TS_ENCRYPTION_KEY` unchanged.** The new version must run with the same encryption key; see [The encryption key](#the-encryption-key).

## Update

In the directory of `docker-compose.yml`:

```
git pull
docker compose up -d --build
```

The image is rebuilt, which takes several minutes, and the app container is recreated. Follow the start with `docker compose logs -f ts_core`. The app logs its version (`=> Version: ...`), and a new version inserts its release notes (`=> Release notes inserted: ...`), which users then find under **Updates** in the right bar.

`docker compose up -d --build` does not download newer versions of the other images (`mongo:7`, `axllent/mailpit`). The license check image is pinned in `docker-compose.yml` and changes with `git pull`. To fetch newer images of the unpinned services as well, run `docker compose pull` before `docker compose up -d --build`.

Local changes to `docker-compose.yml` can conflict with `git pull`. Keep your own changes in `.env` and in a `docker-compose.override.yml`, which the repository does not contain; see [Settings Reference](03-environment-variables.md#settings-not-passed-by-the-compose-file).

## After the update

1. Check `docker compose ps`: `ts_core` should become healthy.
2. Sign in and check the version at the bottom of the left sidebar.
3. Open a module and run an analysis to check that the license check and the vulnerability lookup work.

If the new version does not start, check the log, and if needed restore the backup together with the previous version (`git checkout` of the previous release, then `docker compose up -d --build`).

## The encryption key

`TS_ENCRYPTION_KEY` must stay the same for the whole life of an installation. It encrypts stored integration credentials, protects the lookup of REST API keys and signs release files. TrustSource CE has no procedure to move data from one `TS_ENCRYPTION_KEY` to another: after a change, stored credentials cannot be read, existing API keys are no longer recognised and existing release signatures no longer verify.

### Credentials in the older format

Two further settings concern credentials stored in an **older encryption format** (written without `TS_ENCRYPTION_KEY`, using a separate password). An installation set up with the reference compose file always has `TS_ENCRYPTION_KEY` and writes only the current format, so it does not need them.

| Setting | Purpose |
|---|---|
| `TS_ENCRYPTION_KEY_LEGACY` | The password of the older format. With it, the app can still read such credentials. |
| `TS_REENCRYPT_SECRETS` | One-time migration of such credentials to the current format under `TS_ENCRYPTION_KEY`. |

If your database holds credentials in the older format, migrate them once. Both settings are set through a compose override file:

1. Make sure `TS_ENCRYPTION_KEY` is set. Without it the migration does not run.
2. Set `TS_ENCRYPTION_KEY_LEGACY` to the old password and `TS_REENCRYPT_SECRETS=dry`, and restart with `docker compose up -d`. The app logs per collection what it **would** migrate (`[reencrypt] ... WOULD migrate=...`) and writes nothing.
3. Set `TS_REENCRYPT_SECRETS=true` and restart. The app migrates the credentials and logs `[reencrypt] done. You may now unset TS_REENCRYPT_SECRETS.`
4. Remove `TS_REENCRYPT_SECRETS` and restart.

The migration skips values that are already in the current format, so running it again is safe. It covers the Jira, TFS, GitHub, SCANOSS and LeanIX credentials of companies and projects, and REST API keys.

## Related

- [Backups & Monitoring](07-backups-monitoring.md)
- [Settings Reference](03-environment-variables.md)
- [Release Notes](../12-release-notes/index.md)
