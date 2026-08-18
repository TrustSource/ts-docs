# Generate or Import a Threat Model

> [!NOTE]
> **Required license feature:** `threat`

A threat model is produced one of two ways: **generated** by the
[Threat Modeling Agent (TMA)](../../13-capabilities/07-threat-model-agent.md),
or **imported** from an existing OTM / OWASP Threat Dragon document.

## Generating a model

1. Click **Generate** — from the Threat Models list (choose a project in
   the dialog) or from a project's module list (the project is
   pre-selected).
2. Pick a **stage**:

   | Stage | What it produces |
   |---|---|
   | **Run all** (default) | Builds the model, generates risks, then develops countermeasures. |
   | **Build model** | Inventory, system model and Data Flow Diagram only. |
   | **Generate risks** | STRIDE risks for an existing model. |
   | **Develop countermeasures** | Countermeasures for the existing risks. |

3. Confirm. The run starts in the background — it can take up to ten
   minutes — and a **live progress panel** shows the run status, elapsed
   time and, per phase, a status icon (running / completed / failed). A
   "View document" link appears once it's done, and you're notified if the
   run fails, times out, or the agent is already busy at its concurrency
   limit.

Every run is **idempotent** — running a stage again with nothing new to
act on produces no new risks and leaves the document unchanged. See
[Run Modes](04-run-modes.md) for when to use each stage.

The agent reads the project's **Application goals** text (see
[Project Settings → General](../01-projects/settings/01-general.md)) to seed
the model — populate that field, or upload an `architecture.md`, before
generating for the best result.

## Re-running a single stage

Open a model's detail page and use the **Lifecycle** dropdown: it lists
each stage, shows whether it already has data, and lets you run or re-run
just that stage without going back to the project.

## Importing a model

Import an existing **OTM** or **OWASP Threat Dragon** document from the
Threat Models list. It appears in the list alongside generated models, and
opens in the same Data Flow Diagram viewer.

📸 *Screenshot: the Generate dialog with the stage selector, and the live progress panel below it.*

## Related

- [Run Modes](04-run-modes.md) — Complete run vs. individual stages
- [Data Flow Diagram & Threat Detail](02-threat-detail-stride-linddun.md)
