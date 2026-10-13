# TrustSource Online Help — Structure

> **Status:** Living document.
> **Last updated:** 2026-10-10.
> **Editions:** **v3 SaaS** (live, `app.trustsource.io`) and
> **Community Edition (CE)** (self-hosted, in preparation).
> **Current SaaS app version:** see [COVERAGE.md](COVERAGE.md) (docs state vs. app version).

This document describes the directory layout, chapter structure and
naming conventions of the customer-facing online help.

## Editions Strategy

- **`docs/v3/`** — Help track for the live SaaS version
  (`app.trustsource.io`). Full documentation mirroring CE content with
  SaaS-specific adaptations. Does NOT include Installation & Setup
  (SaaS is hosted).
- **`docs/ce/`** - Help track for the Community Edition (TrustSource CE
  1.0, self-hosted, AGPL-3.0). Rebuilt in October 2026 from the v3 pages
  and verified against the `ts-core-ce` code; same chapter layout and file
  names as v3, minus SaaS-only features. Includes Installation & Setup.
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
│   ├── v3/                           # SaaS documentation (231 pages)
│   │   ├── index.md
│   │   ├── 00-getting-started/      # 8 pages
│   │   ├── 02-inbound/              # 8 pages
│   │   ├── 03-internal/             # 87 pages (projects, modules, products, risks, approvals, ...)
│   │   ├── 04-outbound/             # 7 pages
│   │   ├── 05-knowledge/            # 9 pages
│   │   ├── 06-administration/       # 17 pages
│   │   ├── 07-auth-sso/             # 7 pages
│   │   ├── 08-personal/             # 6 pages
│   │   ├── 09-rest-api/             # 30 pages (incl. endpoints/ with 22 group pages)
│   │   ├── 10-roles-permissions/    # 11 pages
│   │   ├── 11-troubleshooting-faq/  # 7 pages
│   │   ├── 12-release-notes/        # 4 pages
│   │   ├── 13-capabilities/         # 8 pages (OSCAR, Risk, Product, Medical, CVD, CSAF)
│   │   ├── 14-component-manager/    # 4 pages
│   │   ├── 15-legal-manager/        # 4 pages
│   │   └── recipes/                 # 13 pages
│   └── ce/                           # Community Edition (193 pages)
│       ├── index.md
│       ├── 00-getting-started/      # 8 pages (incl. guide, tour and demo project)
│       ├── 01-installation-setup/   # 9 pages (CE only - self-hosted)
│       ├── 02-inbound/              # 6 pages
│       ├── 03-internal/             # 76 pages (products, projects, modules, risks, approvals, reports)
│       ├── 04-outbound/             # 5 pages
│       ├── 05-knowledge/            # 7 pages
│       ├── 06-administration/       # 15 pages
│       ├── 08-personal/             # 6 pages
│       ├── 09-rest-api/             # 23 pages (API v2)
│       ├── 10-roles-permissions/    # 8 pages
│       ├── 11-troubleshooting-faq/  # 7 pages
│       ├── 12-release-notes/        # 2 pages
│       ├── 13-ce-vs-saas.md         # what CE includes and what is SaaS-only
│       ├── 14-component-manager/    # 4 pages
│       ├── 15-legal-manager/        # 3 pages ("Legal Reference Data")
│       └── recipes/                 # 12 pages
```

## Key Differences: v3 SaaS vs CE

| Aspect | v3 (SaaS) | CE |
|---|---|---|
| Installation & Setup | Not needed (hosted) | Full self-hosted guide (9 pages) |
| Auth & SSO | `07-auth-sso/` (Keycloak) | None: email and password with TOTP 2FA (`00-getting-started/03-first-login.md`) |
| Capabilities | `13-capabilities/`, license-gated | No license flags; SaaS-only features listed in `13-ce-vs-saas.md` |
| Roles | 8 public + 2 internal | 7 public roles |
| REST API | v3 endpoint groups | API v2 subset (`09-rest-api/endpoints/`, 15 groups) |
| Version references | v3.x | CE 1.0.0 |
| Release Notes | v3.1.20 - v3.3.x | 1.0 |

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
