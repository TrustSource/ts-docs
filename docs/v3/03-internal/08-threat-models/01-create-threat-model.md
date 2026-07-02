# Create a Threat Model

> [!NOTE]
> **Required license feature:** `threat`

Creating a threat model activates the
[Threat Modeling Agent (TMA)](../../13-capabilities/07-threat-model-agent.md)
for a project. It registers the model, links it to the project, and lets
you start the first Complete run from the same screen; the run produces
the initial system model, elicits threats and proposes countermeasures.

## Steps

1. Navigate to **Internal → Threat Models**.
2. Click **Create**.
3. Select the **project** this threat model applies to. Each project
   can have exactly one threat model.
4. Enter a **name** for the threat model.
5. Click **Save**. The model appears in the list, still empty.
6. Open the new model and start the first
   [Complete run](04-run-modes.md#complete-run). Depending on the
   project's size the run typically completes in a few minutes; you
   can follow its progress live in the run list.

📸 *Screenshot: the threat model creation modal with project selector and name field.*

## Related

- [Run Modes](04-run-modes.md) — Complete run vs. individual steps
- [Threat Detail (STRIDE / LINDDUN)](02-threat-detail-stride-linddun.md) — reviewing the threats the first run produced
