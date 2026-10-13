# Prerequisites

***TrustSource CE*** runs as a set of containers. This page lists what the host needs before you start the [Docker Compose setup](02-docker-compose.md).

## Software

| Requirement | Notes |
|---|---|
| **Docker with Compose v2** | The reference setup uses the `docker compose` command (Compose v2). Docker Desktop includes it; on Linux, install Docker Engine with the Compose plugin. |
| **git** | To clone the [ts-core-ce repository](https://github.com/TrustSource/ts-core-ce) and to update it later. |
| **openssl** (optional) | To generate random secrets for the settings file. Any other random generator works too. |

You do not need Node.js, Meteor or MongoDB on the host: the app image is built from the repository's `Dockerfile`, and MongoDB runs as a container.

## CPU architecture

The app, MongoDB and the mail catcher run natively on **amd64** and **arm64**.

The license check service (`trustsource/ts-legalcheck`) is published for **amd64 only**. On ARM hosts (Apple silicon, AWS Graviton and similar) the compose file runs it under emulation (`platform: linux/amd64`):

- Docker Desktop on Apple silicon provides the emulation out of the box.
- On a Linux ARM host, amd64 emulation must be installed for Docker (QEMU / binfmt) before you start the stack.

Under emulation the license check is slower. Without it, the app still runs, but licenses stay unevaluated and show as warnings; see [External Services](04-external-services.md#license-check-service).

## Memory and disk

There is no fixed sizing; plan for what the installation does:

- **Module analysis** runs in worker threads. Each running analysis may use up to 1 GB of memory, and by default two analyses run at the same time (`TS_ANALYSIS_CONCURRENCY`). Add memory for the app itself, MongoDB and the license check service.
- **Building the image** happens on the host the first time you start, and after each update. It downloads Meteor and the Node.js dependencies and takes several minutes.
- **Data** lives in two Docker volumes: `mongo-data` (the database) and `ts-files` (uploaded and generated files). Both grow with the number of scans, analyses and documents. Keep room for backups as well.

## Network

**Ports on the host.** The compose file publishes two ports, both on `127.0.0.1` only:

| Port | Service |
|---|---|
| `3000` | The app (plain HTTP). Change the address with `TS_BIND_ADDRESS`. |
| `8025` | The Mailpit web UI, which shows the emails the app sends. For testing only; see [Mailpit](02-docker-compose.md#mailpit). |

MongoDB and the license check service are only reachable inside the compose network.

**Outbound access while building** the image: Docker Hub, the Meteor installer (`install.meteor.com`), the NodeSource package repository and the npm registry.

**Outbound access at runtime**, all optional:

- `api.osv.dev` for vulnerability lookups and `api.first.org` for EPSS scores,
- `raw.githubusercontent.com` for the startup version check,
- your SMTP server, and the integrations your users configure (Jira, Azure DevOps, GitHub, LeanIX, webhook targets, a CSAF provider).

See [External Services](04-external-services.md) for what each one does and how to switch it off.

## A host name and a certificate

To serve other users, you need a DNS name for the installation and a TLS certificate, and a reverse proxy that terminates HTTPS in front of the app. See [HTTPS and Reverse Proxy](05-https-reverse-proxy.md). For a first try on your own machine, `http://localhost:3000` is enough.

## Next step

Continue with the [Docker Compose Setup](02-docker-compose.md).
