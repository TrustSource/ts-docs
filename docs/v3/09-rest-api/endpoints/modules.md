# Modules

> Create, list, inspect, and delete modules inside a project, and fetch module-level artefacts such as the parts list and the SBOM.

## Use cases

- Automate module creation during project onboarding.
- Pull a module's component inventory into an external review tool.
- Generate per-module SBOMs from a build pipeline.

## Operations

| Method | Path | What it does | Scopes |
|---|---|---|---|
| GET | `/core/modules` | List modules | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/modules/{module_id}` | Get module details | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| POST | `/core/modules/{module_id}` | Update module | `developer`, `manager` |
| DELETE | `/core/modules/{module_id}` | Delete module | `manager`, `account_admin`, `enterprise_admin`, `portfolio_manager` |
| GET | `/core/modules/{module_id}/partsList` | Get module parts list | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/modules/{module_id}/sbom` | Get module SBOM | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/modules/{module_id}/aibom` | Get module AIBOM | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/modules/{module_id}/cbom` | Get module CBOM | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |
| GET | `/core/modules/{module_id}/environmental-context` | Get module environmental (iCVSS) context | `manager`, `compliance_manager`, `portfolio_manager`, `company_security_manager` |

Request and response schemas are in the [OpenAPI specification](index.md#the-specification), which is also available as interactive documentation in the app.

## Updating componentConfig

`POST /core/modules/{module_id}` replaces every config object it receives as a whole, so a read-modify-write has to send the complete object back. Three points matter for `componentConfig.licensesSelected`, the array that also carries a licence a compliance manager set by hand on a component the scan could not match:

- **A manually set licence survives an unchanged round trip.** `GET` returns `justification`, `resolvedBy`, `resolvedById` and `resolvedAt` on such an entry, and a `POST` that sends the entry back with the same `key` and the same `license` keeps them.
- **These four fields are read-only over the API.** Values you supply are discarded and the stored ones are put back. They are written by the "set the licence manually" action in the interface, which requires a `compliance_manager` or `manager` role. Sending a *different* `license` for the same `key` is a genuine change of the pick: the audit fields are dropped and the entry becomes an ordinary licence selection.
- **`componentConfig` sent without `licensesSelected` still clears the array**, manually set licences included, exactly as it clears `whitelist`, `blacklist`, `unchanged` and `looseCoupled` when they are omitted. Read the current `componentConfig`, change what you need, and post all of it back.

> **`resolvedBy` is not an approval.** It records who determined *which licence applies* to a component and on what written grounds. Elsewhere in TrustSource "Resolved" means a manager accepted a risk, which is why the interface calls this "License set manually". Do not map these fields onto a sign-off or a risk acceptance.

## Environmental (iCVSS) context

`GET /core/modules/{module_id}/environmental-context` is a read-only projection of the module's CVSS environmental data, for consumers (e.g. a CVD/PSIRT service) that re-score vulnerabilities against a module's operating environment. It returns a single object:

- `moduleId`, `projectId` (nullable), `name` (nullable)
- `ciaRequirements` - the stored discrete `CR`/`IR`/`AR` letters (`X` = Not Defined, `L`, `M`, `H`), passed through verbatim; `null` when the module has none (never synthesized to `X`). These letters map 1:1 to the CVSS 3.1 environmental Confidentiality / Integrity / Availability Requirement metrics (CR/IR/AR), and are the **canonical** discrete requirement values.
- `environmentalConfig` - always all three keys `v2vectorString` / `v3vectorString` / `v4vectorString`, each `null` when absent. These raw vector strings and `ciaRequirements` are **independent, unreconciled** sources: a `CR:`/`IR:`/`AR:` token embedded in a vector string is not cross-checked against `ciaRequirements`, and vice versa. If the two ever disagree, treat `ciaRequirements` as canonical for the discrete CR/IR/AR values.
- `mav` - the Modified Attack Vector (`N`/`A`/`L`/`P`) parsed from the v4 vector, falling back to the v3 vector; `null` when neither carries a `MAV:` token (or the token is `MAV:X`). The v2 vector is never inspected for MAV because **CVSS v2 has no Modified Attack Vector metric**, so a module carrying only a v2 vector always reports `mav: null`. A `null` `mav` therefore means **"not specified"**, never "reachability lookup failed / unknown"; consumers must not treat it as an error signal.

Only `GET` and `OPTIONS` are supported (other verbs return `405`). The company is derived from the API key; a module id belonging to another company (or an unknown id) returns `404`. The key must carry a read scope tier (`manager`, `compliance_manager`, `portfolio_manager`, or `company_security_manager`); a key lacking it gets `403`.

## Authentication

Send your key in the `x-api-key` header. The **Scopes** column shows which key scopes may call each operation; a key with another scope gets `403`. See [API scopes](../../10-roles-permissions/09-api-scopes.md).

## Related

- [Projects](projects.md) — the parent container
- [Scans](scans.md) — the primary data source for a module
- [Imports](imports.md) — how CycloneDX / SPDX files land in a module
- [Create a Module](../../03-internal/02-modules/01-create-and-list.md) — UI-side documentation
- [Endpoint groups](index.md)
