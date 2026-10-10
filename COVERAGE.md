# Documentation Coverage Log

Tracks which release of each TrustSource platform service is currently
reflected in the customer-facing documentation, and how far that lags
behind the live DEV and PRD deployments.

Updated **whenever** documentation is refreshed for a service (bump the
row, append to the log). Sits at the repo root, deliberately outside
`docs/`, so it is not part of the public site build.

## Current coverage — v3 SaaS track

| Service | Repo | Docs cover | Live in DEV | Live in PRD | Gap (docs → PRD) |
|---|---|---|---|---|---|
| **Core (ts-app)** | [`eacg-gmbh/ts-app`](https://github.com/eacg-gmbh/ts-app) | Release notes up to **v3.3.22** (+ v3.2.40 hotfix line). Feature pages are partly stubs: 85 of 180 v3 pages were under 700 bytes at the 2026-10-10 gap check (80 after wave 1). | not verified this session | not verified this session | Target state is **v3.3.59** (`package.json` of ts-app). Gap report: `docs/ohelp-gap-2026-10-10/` in ts-app; wave 1 corrected outdated statements only. |
| **ts-scan** | [`trustsource/ts-scan`](https://github.com/trustsource/ts-scan) | — | — | — | not yet documented in v3 track |
| **ts-legalcheck** | Public CLI: [`trustsource/ts-legalcheck`](https://github.com/trustsource/ts-legalcheck) · SaaS service: `eacg-gmbh/ts-legalcheck` (private) · Rule-set: proprietary | **Service v2.0.0 + rule-set v4.4** | v2.0.0 + v4.4 | v2.0.0 + v4.4 | **at parity** — Legal tab + obligations documented; new Legal Questionnaire page in progress |
| **ts-deepscan** | [`trustsource/ts-deepscan`](https://github.com/trustsource/ts-deepscan) | — | — | — | not yet documented in v3 track |
| **Vulnerability Database** | [`eacg-gmbh/ts-vulndb-api`](https://github.com/eacg-gmbh/ts-vulndb-api), [`eacg-gmbh/ts-vlu`](https://github.com/eacg-gmbh/ts-vlu) | — | — | — | not yet documented in v3 track |
| **Threat Modeling Agent** | [`eacg-gmbh/ts-tm-agent`](https://github.com/eacg-gmbh/ts-tm-agent) | **v0.32.0** | v0.32.0 | v0.32.0 | **at parity** — new capability page + run-modes doc in progress |
| **Trusted CSAF Provider** | [`eacg-gmbh/ts-csaf`](https://github.com/eacg-gmbh/ts-csaf) | — | — | — | capability stub only ([v3/13-capabilities/06-csaf-trusted-provider.md](docs/v3/13-capabilities/06-csaf-trusted-provider.md)) |
| **CVD Service** | [`eacg-gmbh/ts-psirt`](https://github.com/eacg-gmbh/ts-psirt) | — | — | — | capability stub only ([v3/13-capabilities/05-cvd.md](docs/v3/13-capabilities/05-cvd.md)) |
| **Academy** | [`eacg-gmbh/ts-training`](https://github.com/eacg-gmbh/ts-training) | — | — | — | not yet documented in v3 track |

## API documentation

The REST API documentation was merged into this help on **2026-10-10**; `trustsource/api-docs` is deprecated. The endpoint reference is the interactive API documentation in the app and the OpenAPI v2 specification.

| Topic | Location in this help | Covers |
|---|---|---|
| API keys, release keys, usage | `docs/v3/06-administration/04-api-keys.md`, `04a-api-usage.md`, `04b-release-keys.md` | Key management, release keys, usage statistics. |
| REST API | `docs/v3/09-rest-api/` (index, `06-api-structure.md`, `endpoints/`) | API structure, v1 migration, 22 endpoint group pages. |
| API scopes | `docs/v3/10-roles-permissions/09-api-scopes.md` | Operation × scope matrix, generated from the spec and the handler scope checks (app 3.3.59). |
| Use case | `docs/v3/recipes/02-cicd-integration.md` | ts-scan in GitHub Actions. |

## Current coverage — CE track

The CE track is derived from the v2.16 baseline. Version reflected:
**v2.16.29** (see [`docs/ce/12-release-notes/2.16.29.md`](docs/ce/12-release-notes/2.16.29.md)).
The CE track is expected to lag the v3 track by design — it targets
the future Community Edition, not the live SaaS.

## How to update

1. When docs for a service are refreshed for a new release, bump the
   **Docs cover** cell in the corresponding row above.
2. Refresh the **Live in DEV / Live in PRD** cells opportunistically
   (from `git tag` of the service repo, from the CI/CD pipeline, or
   from a deployment channel notification).
3. Append an entry under **Update log** with the date, the service,
   and the new covered version.
4. Include the log change in the same commit as the docs refresh,
   e.g. `docs(<service>): refresh for v3.2.21 + coverage bump`.

## Update log

- **2026-10-10** — Wave 1 of the gap alignment for Core (ts-app) v3.3.59 (docs still cover
  release notes up to v3.3.22 / v3.2.40; nothing new was added). Corrected statements that
  contradicted the app: approval roles and tab names, project page and module header, project
  and module settings tab names, messages folders, Reports hub, risk states, SARIF module-name
  warning (3.2.47), CVD case roles, license flags, REST API landing pages. Source: ts-app
  `docs/ohelp-gap-2026-10-10/`. New feature chapters are planned for later waves.
- **2026-08-18** — Core (ts-app) docs refreshed from v3.1.20 to v3.3.22
  (+ the parallel v3.2.38–3.2.40 hotfix line), derived from
  `CHANGELOG.md` at repo HEAD. Release Notes chapter populated (was a
  TODO stub); new CVD Cases chapter added under Outbound (the old
  `13-capabilities/05-cvd.md` stub described a fictional public-intake
  workflow under the wrong license flag — corrected `cvd` → `psirt`);
  new Vulnerability Report page added (didn't exist); assorted admin
  notes added (account suspension, registration plausibility check,
  Keycloak realm-alias / missing-subject-claim diagnostics). Also
  merged with, and corrected terminology drift against the shipped UI
  in, the 2026-07-02 TMA docs (stage labels are "Run all / Build
  model / Generate risks / Develop countermeasures" in the app, not
  "Complete / Collect & Model / Refine & generate Threats / Derive
  Countermeasures"; the BETA badge is still shown in the nav as of
  this check, so it was restored rather than dropped; the "Create
  modal registers an empty model, then start a run separately" flow
  doesn't exist in the current code — Generate is a single step).
  DEV/PRD live versions were not re-verified against a deployment
  source this session. Core (ts-app) v3.1.20 baseline
  established via the v3-track population commit `ea0b650`
  (docs/v3/ populated from CE baseline, aligned to v3.1.20 menu
  structure). Delta to PRD (v3.2.21) is now visible in this log.
- **2026-07-02** — TMA docs coverage established at v0.32.0 (DEV+PRD
  at parity, so the covered version equals the live version). Covers
  the "no-risks reviewed" marker (v0.29.0), live run trace (v0.30.0),
  model-improvement summary (v0.31.0) and the `TMA Assessment` risk
  origin (v0.32.0). New capability page under
  `v3/13-capabilities/07-threat-model-agent.md` and a run-modes page
  under `v3/03-internal/08-threat-models/04-run-modes.md`.
- **2026-07-02** — ts-legalcheck docs coverage established at service
  **v2.0.0** with rule-set **v4.4**. Service CHANGELOG has not been
  bumped since 2022, so v2.0.0 is the baseline reference; rule-set
  v4.4 is the newest constraint file checked into the private
  service repo. Existing Legal (project) and Obligations pages
  already cover the settings surface — remaining gap is the Legal
  Questionnaire (Wizard) itself, which gets its own page in the
  follow-up commit.
- **2026-10-10** — API docs merged into the v3 track (branch `docs/api-merge`): key management, release keys, API usage, API structure and v1 migration, endpoint group pages, API scope matrix (generated against app v3.3.59) and the ts-scan GitHub Actions recipe. `trustsource/api-docs` is deprecated.
