# Mitigations & Status

> [!NOTE]
> **Required license feature:** `threat`

Countermeasures for a threat are proposed by the
[Threat Modeling Agent](../../13-capabilities/07-threat-model-agent.md)
during its **Develop countermeasures** stage, typically one to three per
threat. They have no list page of their own; they show up in two places,
both driven by the same underlying data:

- **On each threat card**, in the [Data Flow Diagram side panel](02-threat-detail-stride-linddun.md):
  the countermeasures for that specific threat, each with an icon for its
  status.
- **On the model's Lifecycle dropdown**: the "Develop countermeasures"
  stage row shows how many countermeasures the model has and lets you
  run or re-run just that stage.

The agent also writes the countermeasures to the threat's risk, where you
find them on the risk's **Countermeasures** tab (see
[Risk Tasks](../05-risks/03-risks-tasks.md)). Once you set a countermeasure
to completed, verified or ok there, later agent runs leave it alone.

Each threat the agent generates is filed as a **risk**, with the origin
"Threat Model Assessment (TMA)". The risk carries its full threat-model
context (STRIDE/ENISA categories, CWEs, affected element, trust-boundary
crossing, run id and threat id) wherever the risk is viewed or edited.

![A threat card in the side panel: the threat title and description, STRIDE Denial of Service, the ENISA category Nefarious activity / Abuse, the CWEs CWE-770 and CWE-799, the state exposed, the risk rating, and three countermeasure rows with their status icon.](../../../assets/images/v3/03-internal/08-threat-models/03-mitigations-status-1.webp)

## Related

- [Data Flow Diagram & Threat Detail](02-threat-detail-stride-linddun.md) - the threat a countermeasure addresses
- [Run Modes](04-run-modes.md) - re-proposing countermeasures via Develop countermeasures
- [Risks](../05-risks/index.md) - risks the agent raises carry `origin: TMA Assessment`
