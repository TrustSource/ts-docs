# Reporting a Problem

***TrustSource CE*** is an open source project. Help, bug reports and feature requests go through its public GitHub repository.

## Where to look first

- **This manual** - especially [Troubleshooting & FAQ](index.md).
- **The README** of the repository - the **Help** icon in the right bar and **Documentation and help** in the guide panel open it.
- **Your operator** - if someone else runs your installation, ask them first. Many problems (mail, HTTPS, integrations, missing license evaluation) can only be fixed on the server. **Contact Account Admin** in the right bar writes an email to your company's account admin.

## Report a problem

Open an issue at [github.com/TrustSource/ts-core-ce/issues](https://github.com/TrustSource/ts-core-ce/issues). Search the existing issues first; your problem may already be known.

Use the issue forms: choose the **Bug report** form for a problem and fill in every field. Feature requests and questions go through issues too.

Please include:

1. The **TrustSource CE version** - shown at the bottom of the left sidebar, e.g. *TrustSource CE 1.0.3*.
2. **How you run it** - the reference Docker Compose setup, your own Docker setup or from source, the host's CPU architecture (amd64 or ARM), and whether a reverse proxy is in front.
3. The **page or feature** where the problem occurs.
4. **Steps to reproduce** the problem.
5. The **expected and actual result**.
6. The **error message** as shown in the app (screenshot or text).
7. The relevant **log lines** from `docker compose logs ts_core` (and `ts_legalcheck` for license check problems).
8. Your **browser** and **OS**, for problems in the user interface.

> [!WARNING]
> GitHub issues are public. Before you post logs or screenshots, remove secrets and personal data: passwords, API keys, `TS_ENCRYPTION_KEY`, the contents of `.env`, email addresses, and the names of your projects and components if they are confidential. The app masks secrets in its `=> Config:` output, but other lines may still contain data you do not want to publish.

## Response times

CE is maintained by one person, and support is best effort with no SLA.

- **Security vulnerabilities and critical bugs** get a first response within 5 working days. Critical means that installation or start-up fails on a supported setup, data is lost or corrupted, or a core flow (login, import, analysis, reports) is broken for all users.
- **Other bugs, feature requests and questions** get a first response at the latest in the next quarterly sprint.
- Fixes are made as they come and shipped in a patch or sprint release. Only the latest release gets fixes, so upgrade first if you run an older version.

Commercial support is available through the TrustSource SaaS.

## Report a security vulnerability

Do **not** report security issues in public issues. Use GitHub's private vulnerability reporting for the repository: [github.com/TrustSource/ts-core-ce](https://github.com/TrustSource/ts-core-ce), **Security > Report a vulnerability**.

## Contribute

Pull requests are welcome in the same repository. The README describes the development setup; [CONTRIBUTING.md](https://github.com/TrustSource/ts-core-ce/blob/main/CONTRIBUTING.md) lists the checks to run before opening a pull request. Contributions are licensed under the AGPL-3.0.

## More documents

These documents are in the root of the repository:

- [SUPPORT.md](https://github.com/TrustSource/ts-core-ce/blob/main/SUPPORT.md) - how support works and what to expect.
- [CONTRIBUTING.md](https://github.com/TrustSource/ts-core-ce/blob/main/CONTRIBUTING.md) - how to contribute.
- [SECURITY.md](https://github.com/TrustSource/ts-core-ce/blob/main/SECURITY.md) - how to report a vulnerability.
- [ROADMAP.md](https://github.com/TrustSource/ts-core-ce/blob/main/ROADMAP.md) - the planned features.
