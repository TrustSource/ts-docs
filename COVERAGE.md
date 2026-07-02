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
| **Core (ts-app)** | [`eacg-gmbh/ts-app`](https://github.com/eacg-gmbh/ts-app) | **v3.1.20** | v3.2.29 | v3.2.21 | 1 minor / 21 patches behind PRD |
| **ts-scan** | [`trustsource/ts-scan`](https://github.com/trustsource/ts-scan) | — | — | — | not yet documented in v3 track |
| **ts-legalcheck** | Public CLI: [`trustsource/ts-legalcheck`](https://github.com/trustsource/ts-legalcheck) · SaaS service: `eacg-gmbh/ts-legalcheck` (private) · Rule-set: proprietary | **Service v2.0.0 + rule-set v4.4** | v2.0.0 + v4.4 | v2.0.0 + v4.4 | **at parity** — Legal tab + obligations documented; new Legal Questionnaire page in progress |
| **ts-deepscan** | [`trustsource/ts-deepscan`](https://github.com/trustsource/ts-deepscan) | — | — | — | not yet documented in v3 track |
| **Vulnerability Database** | [`eacg-gmbh/ts-vulndb-api`](https://github.com/eacg-gmbh/ts-vulndb-api), [`eacg-gmbh/ts-vlu`](https://github.com/eacg-gmbh/ts-vlu) | — | — | — | not yet documented in v3 track |
| **Threat Modeling Agent** | [`eacg-gmbh/ts-tm-agent`](https://github.com/eacg-gmbh/ts-tm-agent) | **v0.32.0** | v0.32.0 | v0.32.0 | **at parity** — new capability page + run-modes doc in progress |
| **Trusted CSAF Provider** | [`eacg-gmbh/ts-csaf`](https://github.com/eacg-gmbh/ts-csaf) | — | — | — | capability stub only ([v3/13-capabilities/06-csaf-trusted-provider.md](docs/v3/13-capabilities/06-csaf-trusted-provider.md)) |
| **CVD Service** | [`eacg-gmbh/ts-psirt`](https://github.com/eacg-gmbh/ts-psirt) | — | — | — | capability stub only ([v3/13-capabilities/05-cvd.md](docs/v3/13-capabilities/05-cvd.md)) |
| **Academy** | [`eacg-gmbh/ts-training`](https://github.com/eacg-gmbh/ts-training) | — | — | — | not yet documented in v3 track |

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

- **2026-06-10** — Log introduced. Core (ts-app) v3.1.20 baseline
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
