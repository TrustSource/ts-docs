# Threat Modeling Agent (TMA)

> [!NOTE]
> **Required license feature:** `threat`
> **Service version at time of writing:** v0.32.0 

The **Threat Modeling Agent** is the automated engine behind every
project's threat model. It reads the current project state —
modules, vulnerabilities, existing risks and countermeasures —
compares it against the last agent run, and produces:

- **New threats** identified via STRIDE-per-Element elicitation
  (only for new or changed components — unchanged parts are not
  re-analysed).
- **Proposed countermeasures** for every new threat.
- An updated **OTM (Open Threat Model) v0.2.0** document per run,
  stored as an audit trail.

📸 *Screenshot: an OTM run detail page with the improvement-summary hints and a link to the DFD viewer.*

Risks that the agent creates in the risk register carry
`origin: TMA Assessment` so they are distinguishable from manually
raised risks.

## Execution modes

The agent can be run in two shapes, both fully automated, chosen from the
**Stage** selector in the app's Generate dialog:

- **Run all** — runs every stage in a single pass. This is the
  default and the right choice for a fresh project or an incremental
  refresh after normal module churn.
- **Individual stages** — the same pipeline exposed as three
  separately triggerable stages:
  1. **Build model** — inventory + system-model build.
  2. **Generate risks** — STRIDE elicitation on new /
     changed components.
  3. **Develop countermeasures** — one to three countermeasure
     proposals per new threat.

Individual stages are the right choice when you want to review the
result of one stage before committing to the next, or when new
information (e.g. a corrected module classification, a fresh scan)
should trigger only a specific stage without re-running the whole
pipeline.

## Key guarantees

- **Idempotent** — re-running any step is safe. If nothing new is
  present, the run produces zero new risks and a structurally
  identical OTM. This means you can trigger a refresh without
  worrying about generating noise.
- **Human decisions are preserved** — risk states set by a person
  (`accepted`, `closed`, `out-of-scope`, `monitored`, …) are never
  overwritten. Completed or verified countermeasures are never
  modified. Threats whose module was removed are marked
  `out-of-scope`, not deleted.
- **Auditable** — every run stores an OTM document linked via
  `tmRunId` and `previousTmRunId`, so the model's full history is
  recoverable.
- **Incremental** — unchanged components produce zero LLM calls; a
  quiet project is a cheap project.

## Model-improvement summary

Beyond the threat list, each run also produces an
**improvement summary** — a deterministic set of hints on how to
sharpen the input to the next run: modules without a description,
modules without a scan, components that landed in the fallback trust
zone, assets without CIA classification, absent infrastructure
evidence, and open questions the model could not resolve. The
summary travels with the OTM (`project.attributes.improvementHints`)
and is surfaced in the UI, giving the security / compliance owner a
short checklist for the next iteration.

## Editions

- **SaaS:** available with the `threat` feature flag enabled. Contact sales for availability.
- **Community Edition:** the TMA service is not part of the CE
  deployment (it depends on hosted LLM inference and the runs
  DynamoDB store).

📸 *Screenshot: the Threat Models overview for a project with the "Run threat modeling" action visible and a recent run in the history list.*

## Related

- [Internal → Threat Models](../03-internal/08-threat-models/index.md) — the in-app views: run history, the Data Flow Diagram & threat detail, mitigations & status, and how the [run modes](../03-internal/08-threat-models/04-run-modes.md) work in practice.
- [Risk capability](02-risk.md) — how TMA-generated risks (`origin: TMA Assessment`) show up in the risk register.
- **Background:** the EACG [Threat Modeling course](https://app.trustsource.io/trainings?id=threatmodeling) in the Academy walks through the STRIDE method and the vocabulary the agent uses.
