# Threat Models

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`
> **Required license feature:** `threat`
> **Status:** BETA

***TrustSource*** maintains a threat model per project. The model is
produced by the [Threat Modeling Agent (TMA)](../../13-capabilities/07-threat-model-agent.md) —
an automated service that reads your project inventory, elicits
STRIDE-classified threats, proposes countermeasures, and stores each run
as an interactive Data Flow Diagram (DFD) — or you can import an existing
OTM / OWASP Threat Dragon document instead. Reviewing findings and
tracking mitigations happens in the app; the agent handles the analysis.

📸 *Screenshot: the Threat Models list with project, run, format and threat count.*

## Two ways to run the agent

- **Run all** (the default) — runs the whole pipeline (build model →
  generate risks → develop countermeasures) in one pass.
- **Individual stages** — trigger **Build model**, **Generate risks** or
  **Develop countermeasures** separately, in any order, from the same
  dialog or later from a model's **Lifecycle** menu. Useful when you want
  to review one stage before committing to the next, or re-trigger a
  single stage after new findings.

Both paths are automated and **idempotent** — re-running with no new
material changes nothing. See [Run Modes](04-run-modes.md) for per-stage
use-cases and details.

## In this section

| Page | What it covers |
|---|---|
| [Generate or Import a Threat Model](01-create-threat-model.md) | Starting a run, choosing a stage, importing an existing document. |
| [Data Flow Diagram & Threat Detail](02-threat-detail-stride-linddun.md) | Reading the diagram and the threat side panel (STRIDE / ENISA / CWE). |
| [Mitigations & Status](03-mitigations-status.md) | Where countermeasures show up and how their status is tracked. |
| [Run Modes](04-run-modes.md) | Complete run vs. individual stages, and when to use each. |

## Background reading

New to STRIDE and threat modelling? The EACG
[Threat Modeling course](https://app.trustsource.io/trainings?id=threatmodeling)
in the Academy walks through the method and the vocabulary the agent uses
(trust zones, data flows, STRIDE categories) in about an hour.

## Related

- [Threat Modeling Agent](../../13-capabilities/07-threat-model-agent.md) — capability overview and guarantees
- [Application goals upload](../01-projects/settings/01-general.md) — the
  `architecture.md` upload the agent reads when building the model
