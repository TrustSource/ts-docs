# TrustSource Online-Hilfe — Strukturvorschlag

> **Status:** Living document.
> **Stand:** 2026-06-10.
> **Editionen:** **v3 SaaS** (live, `app.trustsource.io`) und
> **Community Edition (CE)** (Self-Hosted, in Vorbereitung).
> **Aktuelle SaaS-App-Version:** v3.x.

Dieses Dokument hält das Verzeichnis-Layout, die Kapitel-Gliederung und
die Datei-Benennung der kunden-sichtbaren Online-Hilfe fest. Es deckt
den **aktuellen** Stand des Repos ab, nicht mehr nur einen Vorschlag.

## Editions-Strategie

- **`docs/v3/`** — Hilfe-Track der live laufenden SaaS-Version
  (`app.trustsource.io`). Wird Kapitel für Kapitel ausgeschrieben.
- **`docs/ce/`** — Hilfe-Track der Community Edition. Basis ist die
  ursprünglich für v2.16 verfasste Doku, die strukturell weitgehend
  weitertragen wird. Wo sich SaaS-Funktionalität von der CE
  unterscheidet, entstehen die Abweichungen im v3-Track.
- **`docs/shared/`** — Versions-übergreifender Inhalt (Glossar,
  Background-Artikel zu CRA/NIS2/SBOM/…, Support).

Versionierung **innerhalb** eines Tracks (z.B. v3.1, v3.2) erfolgt
inhaltlich auf der jeweiligen Feature-Seite (z.B. "since v3.2 …") —
nicht über zusätzliche Folder. Neue Major-Versionen (v4, v5) kommen
erst dazu, wenn sie tatsächlich relevant werden.

---

## 1. Versionierung & Repository-Layout

### 1.1 Empfehlung: Folder-pro-Version

```
ohelp/
├── README.md                         # Repo-Einstieg, kurze Erklärung
├── STRUCTURE.md                      # diese Datei (im Code-Repo bleiben, nicht auf GitHub Pages)
├── _config.yml                       # Jekyll-/GitHub-Pages-Konfig
├── index.md                          # Landing-Page (Versions-Auswahl)
├── assets/
│   ├── images/                       # Screenshots, Diagramme
│   ├── css/
│   └── js/
├── shared/                           # versions-übergreifend (nur wenn wirklich stabil)
│   ├── glossary.md
│   ├── background/                   # CRA/NIS2/SBOM-Themen — semantisch versions-unabhängig
│   │   └── …
│   └── support.md
├── ce/                            # aktuelle Production-Linie (Enterprise, Medical, Corporate, Standard, Trial)
│   ├── index.md
│   ├── 00-getting-started/
│   ├── 01-installation-setup/        # ← dein bereits vorbereiteter Text kommt hier rein
│   ├── 02-inbound/
│   ├── 03-internal/
│   ├── 04-outbound/
│   ├── 05-knowledge/
│   ├── 06-administration/
│   ├── 07-account-admin/             # SSO/Auth-Sub-Menü
│   ├── 08-personal/
│   ├── 09-rest-api/
│   ├── 10-roles-permissions/
│   ├── 11-troubleshooting-faq/
│   └── 12-release-notes/
└── v3.0/                             # Community Edition (kommt in Kürze)
    ├── index.md
    ├── README.md                     # erklärt Unterschiede zu v2.16
    ├── 00-getting-started/
    ├── 01-installation-setup/        # vermutlich Docker-Compose-fokussiert
    ├── …
    └── 12-release-notes/
```

**Begründung:**
- **Folder-pro-Version** statt Branch-pro-Version → ein einziger `gh-pages`-Build, beide Versionen parallel sichtbar, Cross-Linking zwischen Versionen möglich, einfacher für ein kleines Team zu pflegen.
- **`shared/`** nur für Inhalte, die wirklich versions-unabhängig sind. **Standardmäßig nichts in `shared/`** — Inhalte ziehen erst dann ins shared, wenn sie sich in v2.16 und v3.0 beweisbar 1:1 gleichen.
- **Hintergrund-Artikel (CRA/NIS2/SSCS/…)** würde ich versions-unabhängig in `shared/background/` halten — die regulatorische/fachliche Erklärung gilt für beide Editions.

### 1.2 Versions-Auswahl auf der Landing-Page

`ohelp/index.md` zeigt zwei Karten:
- **Standard / Enterprise / Medical (v2.16)** — Production
- **Community Edition (v3.0)** — *in Kürze verfügbar* (zunächst Stub-Seite)

Innerhalb der Versionen kann ein Selector („Switch to Community Edition") in der Sidebar erscheinen.

### 1.3 Tooling: Zensical (mkdocs-Nachfolger)

**Entschieden:** Wir nutzen **Zensical** (Nachfolger von MkDocs) als statischen Site-Generator. Zensical ist stark abwärts-kompatibel zu `mkdocs.yml` und `mkdocs-material` — das [ts-scan-Repo](https://github.com/trustsource/ts-scan) ist bereits darauf umgestellt und dient als Vorlage für Konfiguration und Style.

#### Build & Deploy (GitHub Actions)

Übernommen aus [ts-scan/.github/workflows/ci.yml](https://github.com/trustsource/ts-scan/blob/main/.github/workflows/ci.yml):

```yaml
name: ci
on:
  push:
    branches:
      - main
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    permissions:
      actions: write
      contents: write
      attestations: read
      packages: write
      pages: write
      deployments: write
      id-token: write
    steps:
      - uses: actions/configure-pages@v5
      - uses: actions/checkout@v5
      - uses: actions/setup-python@v5
        with:
          python-version: 3.x
      - run: pip install zensical
      - run: zensical build --clean
      - uses: actions/upload-pages-artifact@v4
        with:
          path: site
      - uses: actions/deploy-pages@v4
        id: deployment
```

- **Config-Datei:** `mkdocs.yml` (Zensical liest es direkt — keine Umbenennung nötig).
- **Build-Output:** `site/` (Standard-mkdocs-Verhalten).
- **Trigger:** Push auf `main`.

#### TrustSource Doku-Conventions (aus ts-scan/`mkdocs.yml`)

**Theme-Palette** (light/dark Toggle):
- Light: `primary: white`, `accent: teal` (passt zum App-Teal `#2a94a2`)
- Dark: `primary: black`, `accent: teal`
- `font: false` (Datenschutz — keine Google Fonts)

**Branding-Assets:**
- Logo: `assets/TS_logo_lang.png` (vorhanden in ts-scan, kann übernommen werden)
- Favicon: `assets/favicon.png`
- Repo-Icon: `fontawesome/brands/github`

**Material-Features (zu übernehmen):**
- `navigation.indexes`, `navigation.sections`, `navigation.tabs`, `navigation.top`, `navigation.tracking`
- `content.code.annotate`, `content.code.copy`, `content.tooltips`
- `search.highlight`, `search.share`, `search.suggest`
- `toc.follow`, `header.autohide`, `announce.dismiss`
- `content.action.edit`, `content.action.view`

**Etablierte Add-ons (in ts-scan vorhanden):**
- **Cookie-Consent-Banner** (in DSGVO-konformer Form mit Analytics-Opt-in)
- **Google Analytics** (`G-ZSZXY48Y3G` — wir brauchen vermutlich eine separate Property für die App-Hilfe, oder nutzen die gleiche)
- **Feedback-Widget** pro Seite (Happy/Sad-Emoticon → bei „sad" Verweis aufs Kontaktformular)
- **Social-Links:** LinkedIn (`linkedin.com/company/trustsource`) + `mailto:support@trustsource.io`
- **Copyright:** `© 2024 EACG GmbH`
- **Custom Feedback-JS:** `extra_javascript: - assets/feedback.js`

**Style-Konventionen (aus ts-scan-Pages):**
- Produktnamen mit `***bold-italic***` ausgezeichnet (z.B. `***TrustSource***`, `***ts-scan***`)
- Admonitions im GitHub-Style: `> [!NOTE]`, `> [!CAUTION]`, `> [!TIP]`
- Code-Blöcke mit Sprache (` ```bash `, ` ```python `, ` ```yaml `)
- Cross-Refs als absolute Pfade `/ohelp/ce/<chapter>/<page>` (analog zu `/ts-scan/<page>` in ts-scan)
- **Kein Frontmatter pflicht** in mkdocs-material — Titel kommt aus erstem `# H1`. Falls Zensical Frontmatter unterstützt, gerne mit `title`/`description`/`hidden`/`status` ergänzen.

#### Versions-Switch in der Sidebar

In ts-scan auskommentiert:
```yaml
# version:
#   provider: mike
#   default: stable
```
Für unsere ce/v3.0-Trennung würde sich **`mike`** anbieten (mehrere Versionen parallel deploybar). Alternativ kann der Versions-Switch manuell als Top-Nav-Eintrag erscheinen.

#### Sprache

> **Offene Frage 1:** Sprache — **Englisch** (passend zur Produkt-UI, internationaler Markt, ts-scan-Doku ist auch EN) oder **Deutsch** (Heimmarkt, regulatorisches Vokabular)? Mein Vorschlag: **Englisch** als Primärsprache, konsistent mit ts-scan; deutsche Hintergrund-Artikel zu CRA/NIS2 ggf. zusätzlich.

---

## 2. Kapitel-Gliederung (für `ce/`)

Pro Kapitel: **Verzeichnis** + **`index.md`** als Übersichtsseite + Einzelseiten. Numerische Präfixe nur für die Sortierung (`nav_order` im Frontmatter regelt die Anzeige).

### 2.1 Übersicht aller Kapitel

| # | Kapitel | Verzeichnis | Zweck | Zielgruppe |
|---|---|---|---|---|
| 0 | Getting Started | `00-getting-started/` | Erster Login, Tour, Mentale Modelle | Alle neuen Nutzer |
| 1 | Installation & Setup | `01-installation-setup/` | Nur für On-Prem; Cloud-Nutzer überspringen | Admin / Ops |
| 2 | Inbound — Daten erfassen | `02-inbound/` | Scans, CI/CD, Tests, Repositories | Developer, Manager |
| 3 | Internal — Verwalten | `03-internal/` | Projekte, Module, Products, Risks, Approvals, Releases, Threat Models | Compliance, Manager, Developer |
| 4 | Outbound — Dokumente | `04-outbound/` | SBOM, SOUP, Notice, CSAF, Verification | Compliance, Manager |
| 5 | Knowledge — Lakes & Refs | `05-knowledge/` | Component/Vulnerability Lake, Licenses, Algorithms, Policies, Chat, Trainings | Alle |
| 6 | Administration | `06-administration/` | Company-Settings, Users, API, Integrations, Policies, Audit | Account-Admin |
| 7 | Account-Admin → Auth/SSO | `07-account-admin-auth/` | Identity Providers, Login/Auth/SMTP-Settings | Account-Admin (Enterprise/Medical) |
| 8 | Persönlicher Bereich | `08-personal/` | Updates, Inbox, Profile, Support, API-Doc | Alle |
| 9 | REST-API v1 | `09-rest-api/` | Auth, Endpunkte, Beispiele | Developer, Integratoren |
| 10 | Rollen & Berechtigungen | `10-roles-permissions/` | Welche Rolle darf was | Alle, besonders Admins |
| 11 | Troubleshooting & FAQ | `11-troubleshooting-faq/` | Häufige Fragen, Fehler, Lösungen | Alle |
| 12 | Release Notes | `12-release-notes/` | Was ist neu pro Patch-Version | Alle |

Plus versions-unabhängig in `shared/`:
- **Background / Concepts** (CRA, NIS2, SSCS, Continuous Software Testing, Product Security, Crypto Agility, PQC, Export Controls, Malware Identification)
- **Glossar**
- **Support & Contact**

---

### 2.2 Kapitel-Detail

Pro Datei: **Working Title** (in `[]`), **Scope** (1-2 Sätze, was diese Seite abdecken soll), **Screenshot-Hinweise** (📸 = Screenshot empfohlen).

#### Kapitel 0 — Getting Started

| Datei | Working Title | Scope | Screenshots |
|---|---|---|---|
| `index.md` | Welcome to TrustSource | Begrüßung, Versions-Hinweis, Wegweiser zu den Hauptkapiteln. | 📸 Dashboard-Übersicht |
| `01-what-is-trustsource.md` | What is TrustSource? | Plattform-Pitch in 200 Wörtern: Open Source Compliance + Vulnerability + Product Security. | — |
| `02-account-types.md` | Account Types & Editions | Trial / Standard / Corporate / Enterprise / Medical / Community. Was ist enthalten, was nicht. | 📸 Account-Type-Anzeige in Sidebar |
| `03-first-login.md` | Your First Login | Login-Methoden (Email, GitHub, LinkedIn, Keycloak); ggf. Company auswählen. | 📸 Login-Maske, Company-Switcher |
| `04-quick-tour.md` | A 5-Minute Tour | Klick durch die 6 Hauptmenü-Gruppen mit je 1 Satz pro Bereich. | 📸 für jede Menü-Gruppe |
| `05-mental-model.md` | Mental Model: Projects → Modules → Components | Datenhierarchie erklären: Project enthält Module; Module enthalten Komponenten (via Scans/SBOM); Komponenten haben Versionen, Lizenzen, Vulnerabilities. | 📸 Diagramm |
| `06-roles-licenses-cheatsheet.md` | Roles & Licenses Cheat Sheet | 1-Pager: 8 Rollen + 7 Lizenz-Features + 5 Account-Types als Tabelle. | — |

#### Kapitel 1 — Installation & Setup

> **Hinweis:** Du hast hier bereits Material vorbereitet — ich lege nur die Dateien als Container an. Anpassen nach deinem vorhandenen Text.

| Datei (Vorschlag) | Working Title | Scope |
|---|---|---|
| `index.md` | Installation Overview | Wann brauche ich diesen Bereich (nur On-Prem)? Cloud-Kunden überspringen. |
| `01-prerequisites.md` | Prerequisites | Hardware, OS, MongoDB, AWS-Account (optional), Domains, Zertifikate. |
| `02-docker-compose.md` | Docker-Compose Setup | Container-basierte Installation. |
| `03-environment-variables.md` | Environment Variables | Liste der ~94 Env-Vars aus `imports/server/config.js` mit Erklärung. |
| `04-external-services.md` | External Services Setup | DeepScan, Component-Index, Vulnerability-API, Bedrock, S3 etc. |
| `05-sso-keycloak-setup.md` | Keycloak / SSO Setup | Schritt-für-Schritt für Multi-Realm-Auth. |
| `06-first-admin-user.md` | Creating the First Admin User | Bootstrap-User anlegen, Company anlegen. |
| `07-backups-monitoring.md` | Backups & Monitoring | MongoDB-Dumps, S3-Lifecycle, Sentry. |
| `08-upgrade.md` | Upgrade Guide | Upgrade-Pfad zwischen Versionen. |

#### Kapitel 2 — Inbound

| Datei | Working Title | Scope | Screenshots |
|---|---|---|---|
| `index.md` | Bringing Data into TrustSource | Mentales Modell: 5 Wege, Daten zu erfassen (Check, Scan, CI/CD, Repos, Tests). | 📸 Inbound-Submenü |
| `01-check.md` | Quick Check (License/Component) | Ad-hoc-Prüfung einzelner Lizenzen oder Komponenten ohne Scan. | 📸 Check-Form, Resultat |
| `02-scans.md` | Working with Scans | Scan-Liste, Status-Bedeutung, Scan-Detail, Re-Scan, Lösch-Logik. | 📸 Scan-Liste, Detail |
| `03-cicd-integrations.md` | CI/CD Integrations (Scanners) | Scanner-Konfiguration anlegen, Token, Pipeline-Snippets (GitHub Actions, GitLab CI, Jenkins). | 📸 Scanner-Config; 💡 Code-Snippets |
| `04-tests-sarif.md` | Code-Tests (SARIF) | SARIF-Datei-Upload aus statischen Analysen; Lizenz-Hinweis. | 📸 Upload + Resultat |
| `05-repositories-deep-scan.md` | Repositories (Deep Scan) | Ein Repo verbinden/scannen; Tree-Sicht, Falsch-Positiv-Feedback, History. | 📸 Tree, Feedback-Dialog |
| `06-bulk-repositories.md` | Bulk Repositories Scan | Massen-Scan; Enterprise-Account-Hinweis; BETA-Marker. | 📸 Bulk-Liste |
| `07-containers.md` | Container Scanning (ts-docker) | Externer Verweis erklären; CLI-Tool kurz vorstellen. | 💡 CLI-Kommando |

#### Kapitel 3 — Internal

> **Größtes Kapitel.** Untergliedert in Sub-Verzeichnisse pro Hauptbereich, weil Projects/Modules/Products eigene Komplexität haben.

```
03-internal/
├── index.md
├── 01-projects/
│   ├── index.md
│   ├── 01-create-and-list.md
│   ├── 02-project-overview.md
│   └── settings/
│       ├── index.md
│       ├── 01-general.md
│       ├── 02-legal.md
│       ├── 03-cia.md
│       ├── 04-quality.md
│       ├── 05-encryption.md
│       ├── 06-end-of-life.md
│       ├── 07-whitelists-blacklists.md
│       ├── 08-obligations.md
│       ├── 09-module-classification.md
│       ├── 10-issue-tracker.md
│       ├── 11-module-import.md
│       └── 12-danger-zone.md
├── 02-modules/
│   ├── index.md
│   ├── 01-create-and-list.md
│   ├── 02-module-detail-tabs.md       # Settings, Legal, Viability, Vuln, Components, Deps, Graphs, Approve
│   └── settings/
│       ├── index.md
│       ├── 01-general.md
│       ├── 02-legal.md
│       ├── 03-obligations.md
│       ├── 04-viability.md
│       ├── 05-ossf.md
│       ├── 06-versioning.md
│       ├── 07-module-classification-mdr-ivdr.md
│       ├── 08-cia.md
│       ├── 09-capabilities.md
│       ├── 10-encryption.md
│       ├── 11-end-of-life.md
│       ├── 12-quality.md
│       ├── 13-releases.md
│       ├── 14-whitelists-blacklists.md
│       ├── 15-cve-whitelist.md
│       ├── 16-custom-components.md
│       ├── 17-spdx-export.md
│       └── 18-danger-zone.md
├── 03-products/
│   ├── index.md                       # CRA-Kontext, Mental Model „Products vs Modules"
│   ├── 01-create-import.md
│   ├── 02-tab-information.md
│   ├── 03-tab-solutions.md             # Modul-/Release-Verknüpfung
│   ├── 04-tab-classification-cra.md    # STANDARD/IMPORTANT_1/IMPORTANT_2/CRITICAL
│   ├── 05-tab-photos.md
│   ├── 06-tab-documents.md             # Datenblätter, Sicherheits-Doku
│   ├── 07-tab-contacts.md              # PSIRT, Hersteller
│   ├── 08-tab-support.md               # Supportzeiten, EOL
│   ├── 09-tab-misuse.md                # Misuse Cases (Threat-Anker)
│   └── 10-link-with-release.md         # Modal-Workflow erklären
├── 04-analysis-reports.md              # Eintritts-Hub zu allen Reports (Detail liegt in 04-outbound)
├── 05-risks/
│   ├── index.md
│   ├── 01-overview.md
│   ├── 02-risks-list.md
│   ├── 03-risks-tasks.md
│   └── 04-portfolio-views.md
├── 06-approvals/
│   ├── index.md                       # Approval-Lifecycle Draft→Review→Approve/Reject→Finalize
│   ├── 01-create-approval.md
│   ├── 02-approval-detail-tabs.md     # Vuln, Lic, Versioning, Viability, Changes, Export-Control, Tests, Capabilities
│   ├── 03-approve-reject-workflow.md
│   ├── 04-binary-linking.md
│   ├── 05-public-approves.md
│   └── 06-post-release-vulnerabilities.md
├── 07-releases.md
├── 08-threat-models/
│   ├── index.md                       # BETA, License `threat`
│   ├── 01-create-threat-model.md
│   ├── 02-threat-detail-stride-linddun.md
│   └── 03-mitigations-status.md
├── 09-settings-templates.md           # Internal-Kontext-Verweis auf Administration → Templates
├── 10-vulnerabilities-activity.md     # Rolle company_security_manager
└── 11-critical-components.md          # Rolle company_component_manager
```

> **Offene Frage 3:** Soll `Project Settings` und `Module Settings` jeweils als **eigene Detail-Seite pro Tab** dokumentiert werden (wie oben skizziert) oder als **eine lange Settings-Seite** mit Anker-Sprungmarken? Vorteil getrennter Seiten: tieferes Linking, bessere Suchergebnisse. Vorteil einer Seite: weniger Klick-Overhead. Mein Vorschlag: **getrennte Seiten** — die Settings sind funktional sehr unterschiedlich.

#### Kapitel 4 — Outbound

| Datei | Working Title | Scope | Screenshots |
|---|---|---|---|
| `index.md` | Outbound: Compliance Documents | Wann brauche ich SBOM vs SOUP vs Notice; CSAF-Use-Cases. | — |
| `01-sbom-files.md` | SBOM Files (SPDX/CycloneDX) | SBOM-Liste, Generierung aus Modul, Upload, Versionierung, Freeze, Download-Formate. | 📸 SBOM-Liste, Detail |
| `02-soup-files.md` | SOUP Files (Medical) | License `medical` + Feature `soup_report`; Software-of-Unknown-Provenance-Mapping. | 📸 SOUP-Liste, Detail |
| `03-notice-files.md` | Notice / Attribution Files | Generierung notice.txt, Pflege, Distribution. | 📸 Notice-Editor |
| `04-csaf.md` | CSAF Documents | License `csaf`; Tabs: Metadata, Affected, Remediation, History; JSON-Export, Bulk-aus-SBOM. | 📸 CSAF-Tabs |
| `05-verification.md` | Verification Tool | Externe SBOM/CSAF/CBOM/Notice prüfen — Paste-Form, Resultate. | 📸 Verify-Form, OK/Fehler |

#### Kapitel 5 — Knowledge

| Datei | Working Title | Scope | Screenshots |
|---|---|---|---|
| `index.md` | Knowledge: Lakes & References | Was sind die „Lakes"? Was unterscheidet sie? | — |
| `01-component-lake.md` | Component Lake | Globale Komponenten-Bibliothek; Suche, Detail, Dependents. | 📸 Suche, Detail |
| `02-vulnerability-lake.md` | Vulnerability Lake | CVE/CWE/GHSA-Suche; Severity, Affected-Versions, Aliases. | 📸 Suche, CVE-Detail |
| `03-infrastructure-components.md` | Infrastructure Components | Cloud/Container-Runtime-Katalog. | 📸 Liste |
| `04-cots-components.md` | COTS Components | Commercial-Off-The-Shelf-Katalog. | 📸 Liste |
| `05-licenses.md` | Licenses Database | Suche, Obligations, Commercial Terms, Approval-Status. | 📸 Lizenz-Detail |
| `06-algorithms.md` | Algorithms Database | Krypto-Algorithmen mit FIPS-Status, Deprecation, Schlüssellängen. | 📸 Algo-Detail |
| `07-open-source-policies.md` | Open Source Policies | Liste verfügbarer Policy-Templates. | 📸 Policy-Liste |
| `08-open-source-policy.md` | Your Open Source Policy | Eigene/aktive Policy ansehen. | 📸 Policy-Sicht |
| `09-copyright-trademarks.md` | Copyright & Trademarks | Trademark-Registry browsen. | 📸 Liste |
| `10-chat.md` | AI Chat Assistant | License `chat` BETA; Use-Cases, Limitierungen. | 📸 Chat-Panel + Full-Page |
| `11-trainings.md` | Trainings | Interne Liste oder externer Link (`company.trainings.url`). | 📸 Trainings-Liste |

#### Kapitel 6 — Administration

| Datei | Working Title | Scope | Erforderliche Rolle |
|---|---|---|---|
| `index.md` | Administration Overview | Welche Rolle darf was — Schnellverweis. | — |
| `01-general-info.md` | General Company Info | Name, Logo, Kontakt, Sprache. | `account_admin` |
| `02-account-billing.md` | Account & Billing | Subscription, Trial-Status, Invoice. | `account_admin`, `enterprise_admin` |
| `03-enterprise-companies.md` | Enterprise Companies | Sub-Companies, Quotas, Feature-Toggles. | `enterprise_admin` |
| `04-user-management.md` | User Management | Einladen, Rollen zuweisen, entfernen, Bulk-Import. | `account_admin` |
| `05-login-history.md` | Login History | Audit-Log Logins. | `account_admin` |
| `06-api-keys.md` | Scanners & API Keys | API-Key-Pflege, Scopes, Rotation. | `account_admin` |
| `07-integrations.md` | Integrations | GitHub, Jira, TFS, LeanIX, Scanoss, Webhooks, PSIRT. | `account_admin`, `enterprise_admin` |
| `08-policies.md` | Company Policies | EOL, FOSS, Crypto-Algorithms. | `account_admin`, `compliance_manager`, `company_security_manager` |
| `09-templates.md` | Templates | Private Licenses, Manual Vulns, Tags, Legal Templates, Private Algorithms. | `account_admin`, `manager`, `compliance_manager` |
| `10-audit-logs.md` | Audit Logs | Company-weite Audit-Trail-Sicht. | `account_admin` |
| `11-tc-privacy-documents.md` | T&C / Privacy | Anzeige der AGB/Datenschutz-Dokumente. | (alle) |

#### Kapitel 7 — Account-Admin → Auth/SSO

| Datei | Working Title | Scope |
|---|---|---|
| `index.md` | Auth & SSO Overview | Wann ist diese Sektion sichtbar (Account-Type Enterprise/Medical, Rolle account_admin). |
| `01-user-storage.md` | User Storage (LDAP/DB) | Custom User-Directory anbinden. |
| `02-identity-providers.md` | Identity Providers | Keycloak Multi-Realm; OIDC, SAML, LDAP, GitHub-OAuth, LinkedIn-OAuth. |
| `03-stored-users.md` | Stored Users | Lokale User direkt CRUD. |
| `04-login-settings.md` | Login Settings | Password-Policy, Session-Timeout, Brute-Force. |
| `05-authentication-settings.md` | Authentication Flows | MFA-Enforcement, Auth-Flows. |
| `06-smtp-settings.md` | SMTP Settings | Mail-Server für Reset & Notifications. |

#### Kapitel 8 — Persönlicher Bereich

| Datei | Working Title | Scope |
|---|---|---|
| `index.md` | Your Personal Area | Updates, Inbox, Profile in einer Übersicht. |
| `01-updates.md` | Updates Feed | System-Updates und Notifications. |
| `02-inbox-messages.md` | Inbox / Messages | Folders (Inbox, Archive, Drafts). |
| `03-profile.md` | Your Profile | Preferences, Password ändern, Avatar, eigene API-Keys. |
| `04-support.md` | Getting Support | Verweis auf Zendesk + Account-Admin-Mailto. |
| `05-api-documentation.md` | API Documentation Browser | OpenAPI-Browser im Produkt. |

#### Kapitel 9 — REST-API v1

| Datei | Working Title | Scope |
|---|---|---|
| `index.md` | REST API Overview | URL-Schema, JSON-First, Rate-Limits. |
| `01-authentication.md` | Authentication (x-apikey) | API-Key beschaffen, Header-Format, Scopes. |
| `02-error-handling.md` | Errors & Responses | HTTP-Codes, Fehler-Body-Format. |
| `03-endpoint-reference.md` | Endpoint Reference | 25 Endpoint-Familien als Tabelle mit Verweis auf interaktive OpenAPI. |
| `04-examples-curl.md` | Example: Importing a Scan via curl | E2E-Beispiel-Workflow. |
| `05-public-routes.md` | Public Routes | Public BoM/Notice-Sharing ohne Auth. |

> **Hinweis:** Detail-OpenAPI-Doku liegt in der App selbst (`/api/doc/latest`). In der Online-Hilfe nur Konzepte + Workflow-Beispiele.

#### Kapitel 10 — Rollen & Berechtigungen

| Datei | Working Title | Scope |
|---|---|---|
| `index.md` | Roles & Permissions Overview | Mentales Modell: Rollen vs Lizenz-Features vs Account-Type. |
| `01-roles-overview.md` | The 8 Public Roles | Pro Rolle: Persona, Hauptverantwortung, typische Aktionen. |
| `02-internal-roles.md` | Internal Roles (component_manager, legal_manager) | Hinweis: nicht im Standard-UI vergebbar. |
| `03-permission-model.md` | Permission Model (alanning:roles + Resource-Layer) | OR-Aggregation, Owner-Vakuum-Pattern, Member-Status. |
| `04-functions-by-area.md` | What Each Role Can Do — by Area | Aus `analyse/roles-and-permissions.md` Abschnitt C. |
| `05-functions-by-role.md` | What Each Role Can Do — by Role | Aus `analyse/roles-and-permissions.md` Abschnitt D. |
| `06-settings-permission-matrix.md` | Field-Level Permissions in Settings | Aus `analyse/role-permission-matrix.md` (vereinfacht). |
| `07-license-features.md` | License Features (`allowedLicenses`) | Was schaltet welches Feature frei. |
| `08-account-types.md` | Account Types | Trial, Standard, Corporate, Enterprise, Medical, Community. |

#### Kapitel 11 — Troubleshooting & FAQ

| Datei | Working Title | Scope |
|---|---|---|
| `index.md` | Troubleshooting Overview | Wo schauen wenn etwas nicht funktioniert. |
| `01-faq.md` | Frequently Asked Questions | 20-30 Top-Fragen. |
| `02-common-errors.md` | Common Error Messages | „Permission denied", „Scan failed", „Integration auth failed", … |
| `03-scan-troubleshooting.md` | Scan Troubleshooting | Scanner findet Komponenten nicht / falsche Lizenzen / Fehlanzeigen. |
| `04-integration-troubleshooting.md` | Integration Troubleshooting | Jira/GitHub/TFS Issue-Creation schlägt fehl. |
| `05-sso-troubleshooting.md` | SSO/Auth Troubleshooting | Keycloak-Login klappt nicht. |
| `06-contact-support.md` | Contact Support | Eskalations-Pfade, was im Ticket angeben. |

#### Kapitel 12 — Release Notes

| Datei | Working Title | Scope |
|---|---|---|
| `index.md` | Release Notes Index | Liste aller Versionen mit Zusammenfassung. |
| `2.16.29.md` | v2.16.29 — *(Datum)* | Detaillierte Release-Notes pro Patch. |
| `2.16.28.md` | v2.16.28 — *(Datum)* | … |
| … | | |

> **Offene Frage 4:** Wie weit zurück sollen Release-Notes online stehen? Mein Vorschlag: alle 2.16.x-Versionen, ältere als „Archive" linken.

---

## 3. Hintergrund-Kapitel (`shared/background/`)

> Versions-unabhängige fachliche Erklärungen. Verlinkt aus den entsprechenden Feature-Seiten („Why this matters: see CRA Background").

| Datei | Working Title | Scope | Verlinkt von |
|---|---|---|---|
| `index.md` | Background Concepts | Übersicht, Wegweiser. | — |
| `01-cra-cyber-resilience-act.md` | EU Cyber Resilience Act (CRA) | Was fordert CRA, Klassen STANDARD/IMPORTANT/CRITICAL, Verantwortlichkeiten. | Products → Classification, CSAF |
| `02-nis2-directive.md` | NIS2 Directive | Geltungsbereich, Pflichten, Bezug zu TrustSource. | Products, Risks, Vulnerability Mgmt |
| `03-software-supply-chain-security.md` | Software Supply Chain Security (SSCS) | Bedrohungen, SLSA, in-toto, SBOMs als Antwort. | Inbound (Scans), Outbound (SBOM), Knowledge (Lakes) |
| `04-continuous-software-testing.md` | Continuous Software Testing | Shift-Left, CI/CD-Integration, SARIF, Sicherheits-Tests. | CI/CD Integrations, Tests |
| `05-product-security.md` | Product Security | PSIRT, Security-by-Design, CSAF-Workflow, Misuse-Cases. | Products, CSAF, Threat Models |
| `06-crypto-agility.md` | Crypto Agility | Definition, Treiber (PQC), praktische Umsetzung. | Encryption-Tab, Algorithms, Crypto-Policies |
| `07-post-quantum-security.md` | Post-Quantum Security (PQC) | NIST-Standards (Kyber/Dilithium), Migrationspfade. | Algorithms, Encryption-Tab |
| `08-export-controls.md` | Export Controls (Dual-Use, EAR, ECCN) | Regulatorischer Kontext, Sanktionsländer, Klassifikationspflicht. | Approves → Export-Control, Reports |
| `09-malware-identification.md` | Malware Identification | YARA, ClamAV, Container-Image-Scanning, Lieferketten-Malware. | Inbound (Scans), Containers |
| `10-sbom-formats.md` | SBOM Formats (SPDX, CycloneDX) | Vergleich, Wann welches Format, TrustSource-Support. | Outbound → SBOM Files |
| `11-vex-csaf-vex.md` | VEX in CSAF | Vulnerability Exploitability eXchange, Use-Cases. | CSAF |

> **Offene Frage 5:** Sollen die Hintergrund-Artikel **kurz und app-zentrisch** sein („So nutzt TrustSource das CRA-Konzept") oder **fachlich-eigenständig** („Was ist das CRA, unabhängig vom Tool")? Mein Vorschlag: **fachlich-eigenständig mit Praxis-Brücke am Ende** — das macht die Artikel auch als Zitierquelle für Kunden brauchbar (z.B. für interne Schulungsmaterialien).

> **Offene Frage 6:** Wer pflegt diese Artikel? Sie veralten regulatorisch schnell (CRA-Texte ändern sich, NIS2-Umsetzung in DE/EU bewegt sich). Empfehlung: pro Artikel `Last reviewed: YYYY-MM-DD` Frontmatter und eine Quartals-Review-Routine.

---

## 4. Schreibstil & Seiten-Template

### 4.1 Standard-Template pro Hilfe-Seite

> **Hinweis:** mkdocs-material braucht **kein** Frontmatter — Navigation kommt aus `mkdocs.yml`, Titel aus erstem `# H1`. Falls Zensical Frontmatter erweitert (z.B. für `applies_to`/`required_role`-Filter), tragen wir das nach. Stand jetzt: Frontmatter optional.

```markdown
# <Page Title>

> [!NOTE]
> **Required role:** `manager` or `compliance_manager`
> **Required license feature:** `sarif`
> **Available in:** Standard, Corporate, Enterprise, Medical *(not in Community)*

***TrustSource*** lets you …  *(1-sentence lead)*

## What it does
<2-3 Sätze, was diese Funktion fachlich leistet.>

## When to use it
<Bullet-Liste typischer Use-Cases.>

## How to use it

1. Schritt 1
   ![Screenshot: …](../assets/images/ce/<chapter>/<slug>-01.png)
2. Schritt 2
3. …

## Tips & Gotchas

> [!TIP]
> Praktischer Hinweis hier.

> [!CAUTION]
> Stolperstein hier.

## Related
- [Background: …](/ohelp/ce/shared/background/…)
- [Settings reference: …](/ohelp/ce/03-internal/02-modules/settings/…)
- [Troubleshooting: …](/ohelp/ce/11-troubleshooting-faq/…)
```

### 4.2 Style-Guide Highlights

Konsistent mit ts-scan-Doku-Stil:

- **Anrede:** „you" (Englisch). Aktive Form, keine Passiv-Konstruktionen.
- **Produktname:** ***TrustSource*** mit `***bold-italic***` ausgezeichnet bei erster Erwähnung pro Seite.
- **Längen:** Kurze Hilfe-Seite = ~200 Wörter, Detail-Seite = max ~600. Längere Themen splitten.
- **Admonitions:** GitHub-Style `> [!NOTE]`, `> [!TIP]`, `> [!CAUTION]`, `> [!WARNING]`.
- **Code-Blöcke:** Nur dort, wo CLI/curl/JSON wirklich gebraucht wird. Sprache angeben (` ```bash `, ` ```python `, ` ```yaml `).
- **Screenshots:** PNG, max 1200px breit, mit Alt-Text. Annotationen (Pfeile/Markierungen) gerne via Excalidraw oder via Material's `image annotations`.
- **Versionierte Bildverweise:** `assets/images/ce/<chapter>/<slug>-<n>.png`.
- **Cross-Links:** Absolut mit `/ohelp/ce/...` (analog zu `/ts-scan/...` in der ts-scan-Doku).
- **Glossar-Links:** Erste Erwähnung eines Begriffs verlinkt zum Glossar.
- **Tonalität:** Persönlich, nicht steif („we strive to provide…", „you may want to…") — passt zur ts-scan-Lektüre.

---

## 5. Mapping zur Menüstruktur (Sanity Check)

Damit nichts vergessen wird — Mapping vom realen Menü auf Hilfe-Kapitel:

| Menü-Eintrag | Hilfe-Kapitel | Datei |
|---|---|---|
| Dashboard | 0 Getting Started | `00-getting-started/04-quick-tour.md` |
| Inbound → Check | 2 Inbound | `02-inbound/01-check.md` |
| Inbound → Scans | 2 Inbound | `02-inbound/02-scans.md` |
| Inbound → CI/CD Integrations | 2 Inbound | `02-inbound/03-cicd-integrations.md` |
| Inbound → Tests | 2 Inbound | `02-inbound/04-tests-sarif.md` |
| Inbound → Repositories | 2 Inbound | `02-inbound/05-repositories-deep-scan.md` |
| Inbound → Bulk Repositories | 2 Inbound | `02-inbound/06-bulk-repositories.md` |
| Inbound → Containers | 2 Inbound | `02-inbound/07-containers.md` |
| Internal → Projects | 3 Internal | `03-internal/01-projects/*` |
| Internal → Products | 3 Internal | `03-internal/03-products/*` |
| Internal → Analysis | 3 Internal | `03-internal/04-analysis-reports.md` |
| Internal → Risks | 3 Internal | `03-internal/05-risks/*` |
| Internal → Approvals | 3 Internal | `03-internal/06-approvals/*` |
| Internal → Releases | 3 Internal | `03-internal/07-releases.md` |
| Internal → Threat Models | 3 Internal | `03-internal/08-threat-models/*` |
| Internal → Settings & Templates | 3 Internal | `03-internal/09-settings-templates.md` |
| Internal → Vulnerabilities | 3 Internal | `03-internal/10-vulnerabilities-activity.md` |
| Internal → Components | 3 Internal | `03-internal/11-critical-components.md` |
| Outbound → SBOM Files | 4 Outbound | `04-outbound/01-sbom-files.md` |
| Outbound → SOUP Files | 4 Outbound | `04-outbound/02-soup-files.md` |
| Outbound → Notice Files | 4 Outbound | `04-outbound/03-notice-files.md` |
| Outbound → CSAF | 4 Outbound | `04-outbound/04-csaf.md` |
| Outbound → Verification | 4 Outbound | `04-outbound/05-verification.md` |
| Knowledge → * | 5 Knowledge | `05-knowledge/*` |
| Administration → * | 6 Administration | `06-administration/*` |
| Account Admin Sub-Menü → * | 7 Account-Admin Auth | `07-account-admin-auth/*` |
| Component Manager Sub-Menü | (intern, nur kurz erwähnt) | `10-roles-permissions/02-internal-roles.md` |
| Legal Manager Sub-Menü | (intern, nur kurz erwähnt) | `10-roles-permissions/02-internal-roles.md` |
| Updates / Inbox / Profile / Support / API Doc | 8 Persönlicher Bereich | `08-personal/*` |

---

## 6. Was du jetzt entscheiden musst

1. **Sprache** — DE oder EN als Primärsprache? *(Vorschlag: EN, konsistent mit ts-scan)*
2. **Versions-Switch** — `mike` für mehrere Versionen parallel, oder manueller Top-Nav-Eintrag?
3. **Settings-Tabs als eigene Seiten oder eine lange Seite mit Ankern?** *(Empfehlung: getrennt)*
4. **Release-Notes-Tiefe** — Wie weit zurück?
5. **Hintergrund-Artikel-Tiefe** — Kurz/app-zentrisch vs eigenständig?
6. **Welche Themen fehlen?** Bitte ergänzen — gerne als Kommentare in dieser Datei oder per separater Liste.
7. **Welche Inhalte willst du selbst formulieren** und welche soll ich entwerfen? (Mein Vorschlag: Installation & Setup machst du, weil du den Text schon hast; den Rest entwerfe ich nach Freigabe der Struktur.)
8. **Screenshot-Verfahren** — Schickst du mir Screenshots für die mit 📸 markierten Stellen, und ich baue sie ein? Oder lieferst du sie später separat als ZIP?
9. **Soll v3.0 schon jetzt als Stub-Verzeichnis angelegt werden** oder erst, wenn die Community Edition näher rückt?
10. **Google-Analytics-Property** — gleiche Property wie ts-scan (`G-ZSZXY48Y3G`) oder eigene für die App-Hilfe?

---

## 7. Nächste Schritte (mein Vorschlag)

1. Du gehst diese Struktur durch, ergänzt fehlende Themen / streichst überflüssige Seiten / beantwortest die offenen Fragen oben.
2. Ich passe die Struktur entsprechend an, lege das `_config.yml` und die leeren `index.md`-Dateien pro Kapitel an.
3. Wir wählen 1-2 Pilot-Seiten (z.B. Products-Classification + Approvals-Workflow), an denen wir Stil und Tonalität festziehen.
4. Danach Roll-out aller Seiten in Wellen entlang der Kapitel-Reihenfolge.
