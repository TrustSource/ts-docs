# Threat Models

> [!NOTE]
> **Required role:** `developer`, `compliance_manager`, `manager` or `account_admin`
> **Required license feature:** `threat`
> **Status:** BETA

***TrustSource*** supports threat modelling per project. An AI agent builds
the system model, identifies STRIDE-classified threats and develops
countermeasures for you, and renders the result as an interactive Data Flow
Diagram (DFD) — or you can import an existing OTM / OWASP Threat Dragon
document.

## In this section

| Page | What it covers |
|---|---|
| [Generate or Import a Threat Model](01-create-threat-model.md) | Starting a run, choosing a stage, re-running a single stage later. |
| [Data Flow Diagram & Threat Detail](02-threat-detail-stride-linddun.md) | Reading the diagram and the threat side panel (STRIDE / ENISA / CWE). |
| [Mitigations & Status](03-mitigations-status.md) | Where countermeasures show up and how their status is tracked. |

📸 *Screenshot: the Threat Models list with project, run, format and threat count.*

## Related

- [Application goals upload](../01-projects/settings/01-general.md) — the
  `architecture.md` upload the agent reads when building the model
