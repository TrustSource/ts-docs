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
- **Portfolio views** — cross-project risk dashboards filtered by
  status, owner, severity or financial exposure.
- **Risk tasks** — turn a risk into actionable countermeasures and
  monitor their completion.
- Optional integration with the **Threat Models** subsystem so threats
  identified during a STRIDE/LINDDUN session feed straight into the
  risk register.

📸 *Screenshot: the risks overview dashboard with key metrics (new, unmitigated, financial exposure).*

📸 *Screenshot: the risks list with filters applied, showing a typical project portfolio.*

## Editions

- **SaaS:** available with the `risks` feature flag enabled.
- **Community Edition:** not included in the initial release; status to
  be announced.

## Related

- [Internal → Risks](../03-internal/05-risks/index.md) — risk register, list and tasks
- [Internal → Threat Models](../03-internal/08-threat-models/index.md) — threat modelling that can feed risks
