# TrustSource Documentation

Online help and user guide for the [TrustSource](https://www.trustsource.io) software supply chain compliance platform.

**Live site:** [trustsource.github.io/ts-docs](https://trustsource.github.io/ts-docs)

## Structure

```
docs/
  index.md                    # Landing page (version selector)
  shared/                     # Version-independent content
    background/               # CRA, NIS2, SBOM formats, ...
    glossary.md
    support.md
  v2.16/                      # Production line (Standard/Corporate/Enterprise/Medical)
    00-getting-started/
    01-installation-setup/
    02-inbound/
    03-internal/              # Projects, Modules, Products, Approvals, ...
    04-outbound/              # SBOM, SOUP, Notice, CSAF
    05-knowledge/             # Lakes, Licenses, Algorithms, Chat
    06-administration/
    07-account-admin-auth/    # SSO / Keycloak (Enterprise)
    08-personal/
    09-rest-api/
    10-roles-permissions/
    11-troubleshooting-faq/
    12-release-notes/
  v3.0/                       # Community Edition (coming soon)
```

## Local development

```bash
pip install zensical
zensical serve
```

Opens at `http://localhost:8000` with live reload.

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that builds with Zensical and deploys to GitHub Pages.

## Screenshot Agent

This repo is used as a submodule by the [screenshotGenAgent](https://github.com/eacg-gmbh/screenshotGenAgent) which automatically generates annotated screenshots for pages marked with `📸` anchors. See `.cfg4docGenAgent` for the agent's per-repo config.

## Contributing

- Follow the style guide in `STRUCTURE.md`
- English, active voice, "you"-address
- Product name: ***TrustSource*** (bold-italic on first mention per page)
- Admonitions: `> [!NOTE]`, `> [!TIP]`, `> [!CAUTION]`, `> [!WARNING]`
- Screenshots: PNG, max 1200px wide, with alt text
