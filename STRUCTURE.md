# TrustSource Online Help — Structure

> **Status:** Living document.
> **Last updated:** 2026-06-10.
> **Editions:** **v3 SaaS** (live, `app.trustsource.io`) and
> **Community Edition (CE)** (self-hosted, in preparation).
> **Current SaaS app version:** v3.1.20.

This document describes the directory layout, chapter structure and
naming conventions of the customer-facing online help.

## Editions Strategy

- **`docs/v3/`** — Help track for the live SaaS version
  (`app.trustsource.io`). Full documentation mirroring CE content with
  SaaS-specific adaptations. Does NOT include Installation & Setup
  (SaaS is hosted).
- **`docs/ce/`** — Help track for the Community Edition. Based on the
  original v2.16 documentation, renamed to CE. Includes Installation &
  Setup for self-hosted deployments.
- **`docs/shared/`** — Cross-edition content (glossary, background
  articles on CRA/NIS2/SBOM/etc., support).

Versioning within a track (e.g. v3.1, v3.2) is handled on individual
feature pages (e.g. "since v3.2 …") — not via additional folders.

---

## Repository Layout

```
ohelp/
├── README.md
├── STRUCTURE.md                      # this file
├── mkdocs.yml                        # Zensical/MkDocs config
├── docs/
│   ├── index.md                      # Landing page (edition selector)
│   ├── CNAME                         # Custom domain
│   ├── assets/                       # Logo, favicon, CSS, JS
│   ├── shared/                       # Cross-edition content
│   │   ├── glossary.md
│   │   ├── support.md
│   │   └── background/              # 11 background articles
│   ├── v3/                           # SaaS documentation (174 pages)
│   │   ├── index.md
│   │   ├── 00-getting-started/      # 7 pages
│   │   ├── 02-inbound/              # 8 pages
│   │   ├── 03-internal/             # 46 pages (projects, modules, products, risks, approvals, ...)
│   │   ├── 04-outbound/             # 6 pages
│   │   ├── 05-knowledge/            # 12 pages
│   │   ├── 06-administration/       # 12 pages
│   │   ├── 07-auth-sso/             # 7 pages
│   │   ├── 08-personal/             # 6 pages
│   │   ├── 09-rest-api/             # 6 pages
│   │   ├── 10-roles-permissions/    # 9 pages
│   │   ├── 11-troubleshooting-faq/  # 7 pages
│   │   ├── 12-release-notes/        # 2 pages
│   │   ├── 13-capabilities/         # 7 pages (OSCAR, Risk, Product, Medical, CVD, CSAF)
│   │   └── recipes/                 # 12 pages
│   └── ce/                           # Community Edition (183 pages)
│       ├── index.md
│       ├── 00-getting-started/      # 7 pages
│       ├── 01-installation-setup/   # 9 pages (CE only — self-hosted)
│       ├── 02-inbound/              # 8 pages
│       ├── 03-internal/             # 46 pages
│       ├── 04-outbound/             # 6 pages
│       ├── 05-knowledge/            # 12 pages
│       ├── 06-administration/       # 12 pages
│       ├── 07-account-admin-auth/   # 7 pages
│       ├── 08-personal/             # 6 pages
│       ├── 09-rest-api/             # 6 pages
│       ├── 10-roles-permissions/    # 9 pages
│       ├── 11-troubleshooting-faq/  # 7 pages
│       ├── 12-release-notes/        # 2 pages
│       ├── 14-capabilities/         # 7 pages
│       └── recipes/                 # 12 pages
```

## Key Differences: v3 SaaS vs CE

| Aspect | v3 (SaaS) | CE |
|---|---|---|
| Installation & Setup | Not needed (hosted) | Full self-hosted guide (9 pages) |
| Auth & SSO | `07-auth-sso/` | `07-account-admin-auth/` |
| Capabilities | All available with license | Subset (see per-capability page) |
| Version references | v3.x | v2.16 baseline |
| Release Notes | v3.1.20+ | v2.16.29 |

## Tooling

**Static site generator:** [Zensical](https://zensical.org) (MkDocs successor)
with Material theme. Config in `mkdocs.yml`.

**CI/CD:** GitHub Actions — push to `main` triggers build and deploy to
GitHub Pages.

## Style Guide

- **Language:** English
- **Address:** "you" (active voice, no passive constructions)
- **Product name:** ***TrustSource*** with `***bold-italic***` on first mention per page
- **Admonitions:** GitHub-style `> [!NOTE]`, `> [!TIP]`, `> [!CAUTION]`, `> [!WARNING]`
- **Screenshots:** PNG, max 1200px wide, with alt text. Marked with 📸 anchors for the screenshot agent.
- **Page length:** Short help page ~200 words, detail page max ~600. Split longer topics.
