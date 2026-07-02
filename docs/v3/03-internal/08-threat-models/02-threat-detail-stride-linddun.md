# Threat Detail (STRIDE / LINDDUN)

> [!NOTE]
> **Required license feature:** `threat`

The threat model detail view is where you review and edit an individual
threat that the
[Threat Modeling Agent](../../../13-capabilities/07-threat-model-agent.md)
elicited during its last *Refine & generate Threats* step, and where
you record your decision (accept, close, out-of-scope) on it. It
provides a two-column editor supporting two methodologies:

## Supported formats

| Format | Description |
|---|---|
| **Threat Dragon** | OWASP Threat Dragon model format — diagram-based threat identification. |
| **Open Threat Model (OTM)** | OpenThreatModel specification — structured JSON-based threat description. |

Both formats can be edited side by side. Changes are saved independently per methodology.

📸 *Screenshot: the threat model detail editor with Threat Dragon and OTM side by side.*

## Related

- [Mitigations & Status](03-mitigations-status.md) — tracking countermeasures
- [Run Modes](04-run-modes.md) — re-eliciting threats via *Refine & generate Threats*
- [Background: Product Security](../../../shared/background/05-product-security.md)
