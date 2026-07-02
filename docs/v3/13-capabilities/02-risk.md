# Risk

> [!NOTE]
> **Required license feature:** `risks`

The **Risk** capability turns ***TrustSource*** from a compliance system
into a risk-management system. It adds a risk register with financial
metrics, portfolio dashboards and task-based mitigation tracking on top
of the components and modules already managed by the core.

## What this capability adds

- **Risk register** — document, assess and track individual risks per
  project and across projects.

📸 *Screenshot: the risks overview dashboard with key metrics (new, unmitigated, financial exposure).*

- **Portfolio views** — cross-project risk dashboards filtered by
  status, owner, severity or financial exposure.

📸 *Screenshot: the risks list with filters applied, showing a typical project portfolio.*

- **Risk tasks** — turn a risk into actionable countermeasures and
  monitor their completion.
- **Integration with the Threat Modeling Agent** — risks raised by the
  [TMA](07-threat-model-agent.md) land in the same register with
  `origin: TMA Assessment` so they are distinguishable from risks
  entered manually. The agent never overwrites a state a person has
  set; see the [TMA capability page](07-threat-model-agent.md#key-guarantees)
  for the full guarantees.

## Editions

- **SaaS:** available with the `risks` feature flag enabled.
- **Community Edition:** not included in the initial release; status to
  be announced.

## Related

- [Internal → Risks](../03-internal/05-risks/index.md) — risk register, list and tasks
- [Internal → Threat Models](../03-internal/08-threat-models/index.md) — the threat-model workflow that feeds risks with `origin: TMA Assessment`
- [Threat Modeling Agent](07-threat-model-agent.md) — the automated engine behind those threat-model risks
