# Threat Models

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`
> **Required license feature:** `threat`

***TrustSource*** maintains a **Lightweight Threat Model** per project.
The model is produced by the
[Threat Modeling Agent (TMA)](../../13-capabilities/07-threat-model-agent.md) —
an automated service that reads your project inventory, elicits threats via
STRIDE-per-Element, proposes countermeasures, and stores each run as an OTM
(Open Threat Model) document. Reviewing findings, approving or rejecting
threats and tracking mitigations happens in the app; the agent handles the
elicitation itself.

📸 *Screenshot: the threat model list with project assignments and the most recent run per project.*

## Two ways to run the agent

- **Complete** — run the whole pipeline (model → threats →
  countermeasures) in one pass. The default choice.
- **Individual steps** — trigger *Collect & Model*,
  *Refine & generate Threats* and *Derive Countermeasures* separately,
  in any order. Useful when you want to review one stage before
  committing to the next, or re-trigger a single stage after new
  findings.

Both paths are automated and **idempotent** — re-running with no new
material changes nothing. See [Run Modes](04-run-modes.md) for
per-mode use-cases and details.

## In this section

| Page | What it covers |
|---|---|
| [Create a Threat Model](01-create-threat-model.md) | Enabling threat modelling on a project for the first time. |
| [Threat Detail (STRIDE / LINDDUN)](02-threat-detail-stride-linddun.md) | Reviewing an elicited threat in the two-column editor. |
| [Mitigations & Status](03-mitigations-status.md) | Tracking countermeasures across runs. |
| [Run Modes](04-run-modes.md) | Complete run vs. individual steps, and when to use each. |

## Background reading

New to STRIDE and Lightweight Threat Modelling? The EACG
[Threat Modeling course](https://app.trustsource.io/trainings?id=threatmodeling)
in the Academy walks through the method and the vocabulary the agent
uses (trust zones, data flows, STRIDE categories) in about an hour.
