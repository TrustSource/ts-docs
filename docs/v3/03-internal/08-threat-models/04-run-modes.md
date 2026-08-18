# Run Modes

> [!NOTE]
> **Required license feature:** `threat`

The threat model for a project is produced by the
[Threat Modeling Agent (TMA)](../../13-capabilities/07-threat-model-agent.md).
You can either run the whole pipeline in a single pass or trigger the
three underlying actions independently — both paths are fully automated.

## Run all

**Run all** — the default option in the Generate dialog — executes every
stage end-to-end: system model → threat elicitation → countermeasure
proposal → write-back. This is the right choice when

- you are enabling threat modelling on a project for the first time,
- your modules changed in ways that could affect several stages
  (new modules, structural refactor, new external dependencies), or
- you have not run the model in a while and simply want it refreshed.

📸 *Screenshot: the Generate dialog's stage selector with "Run all" selected.*

## Individual stages

The same pipeline is also exposed as three stages you can pick in the
Generate dialog, or trigger — and re-trigger — separately from a model's
**Lifecycle** dropdown:

| Stage | What it does |
|---|---|
| **Build model** | Rebuilds the system model from the current project inventory: trust zones, components, data flows, assets. |
| **Generate risks** | Runs STRIDE analysis on new / changed components in the system model and records the threats it finds. |
| **Develop countermeasures** | For every new threat, proposes one to three countermeasures with a standards reference, an estimated risk reduction, and a validation method. |

Use the individual stages when you want to

- **review the system model before threats are elicited** — Build model
  produces the model; look it over in the DFD viewer, sharpen the
  classifications where needed, then trigger Generate risks;
- **re-elicit threats after new information** — you added a new
  external interface or corrected a component's trust zone and want
  the STRIDE analysis re-done without touching countermeasures;
- **regenerate countermeasures** — a threat already exists but your
  understanding of it has evolved, and you want fresh countermeasure
  proposals against the updated threat description.

📸 *Screenshot: the three stages in the Lifecycle dropdown — Build model, Generate risks, Develop countermeasures.*

## Idempotence — safe to re-run

Every stage — whether run via "Run all" or individually — is
**idempotent**. Running a stage a second time with no new material
produces zero new risks and a
structurally identical Open Threat Model (OTM) document. You do not
need to worry about generating duplicate risks or spurious noise by
re-triggering; the agent examines what has changed since the last run
and only acts on the delta.

This has two practical consequences:

- You can trigger a refresh **whenever** you are unsure whether the
  model still reflects reality — worst case, nothing happens.
- Clean components carry a "no risks reviewed on `<date>`" marker
  and are not re-analysed on every run. The marker expires after
  60 days by default, so quiet parts of the project are still
  periodically re-examined without wasting analysis on them in the
  meantime.

## What the agent will not touch

The agent respects **human decisions**. Once a person has

- accepted, closed, marked as out-of-scope or set any explicit state
  on a risk, or
- completed or verified a countermeasure,

subsequent runs will never overwrite those states. Threats whose
underlying module has been removed are marked `out-of-scope` — not
deleted — so the audit trail stays intact.

## Related

- [Threat Modeling Agent](../../13-capabilities/07-threat-model-agent.md) — capability overview and guarantees
- [Generate or Import a Threat Model](01-create-threat-model.md) — enabling threat modelling on a project for the first time
- [Data Flow Diagram & Threat Detail](02-threat-detail-stride-linddun.md) — reviewing an elicited threat
- [Mitigations & Status](03-mitigations-status.md) — tracking countermeasures across runs
