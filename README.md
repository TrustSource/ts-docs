# TrustSource Documentation

Online help and user guide for the [TrustSource](https://www.trustsource.io) software supply chain compliance platform.

**Live site:** [trustsource.github.io/ts-docs](https://trustsource.github.io/ts-docs)

## Structure

```
docs/
  index.md                    # Landing page
  shared/                     # Edition-independent content
    background/               # CRA, NIS2, SBOM formats, ...
    glossary.md
    support.md
  v3/                         # SaaS track (live; content being written)
    index.md
  ce/                         # Community Edition track (TrustSource CE 1.0, self-hosted)
    00-getting-started/
    01-installation-setup/    # CE only
    02-inbound/
    03-internal/              # Products, Projects, Modules, Risks, Approvals, Reports
    04-outbound/              # SBOM + CBOM, Notice, CSAF, Verify
    05-knowledge/             # Lakes, Licenses, Open source policy
    06-administration/
    08-personal/
    09-rest-api/              # API v2
    10-roles-permissions/
    11-troubleshooting-faq/
    12-release-notes/
    13-ce-vs-saas.md
    recipes/
```

See `STRUCTURE.md` for the edition strategy in detail.

## Local development

```bash
pip install zensical markdown-callouts
zensical serve
```

Opens at `http://localhost:8000` with live reload.

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that builds with Zensical and deploys to GitHub Pages.

## Reading tools

Every page has an **Aa** button (bottom right) with two tools, implemented in `docs/assets/a11y-tools.js` and `docs/assets/stylesheet.css`:

- **Text size** (A−, A, A+, 100–200 %), remembered in the browser.
- **Read aloud** with play/pause, stop, previous/next paragraph, speed and voice. The text is spoken by the browser's speech synthesis, so nothing is sent to an external service. Selected text is read on its own. Code blocks and screenshot placeholders are skipped.

No per-page work is needed. New pages get the tools automatically.

## Screenshot Agent

This repo is used as a submodule by the [screenshotGenAgent](https://github.com/eacg-gmbh/screenshotGenAgent) which automatically generates annotated screenshots for pages marked with `📸` anchors. See `.cfg4docGenAgent` for the agent's per-repo config.

## Contributing

- Follow the style guide in `STRUCTURE.md`
- English, active voice, "you"-address
- Product name: ***TrustSource*** (bold-italic on first mention per page)
- Admonitions: `> [!NOTE]`, `> [!TIP]`, `> [!CAUTION]`, `> [!WARNING]`
- Screenshots: PNG, max 1200px wide, with alt text
