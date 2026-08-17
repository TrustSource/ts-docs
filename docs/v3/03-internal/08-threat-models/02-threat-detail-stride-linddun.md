# Data Flow Diagram & Threat Detail

> [!NOTE]
> **Required license feature:** `threat`

A threat model's detail page renders it as an interactive **Data Flow
Diagram (DFD)**: components, trust zones and data flows, with a Graph / Raw
toggle to see the underlying document.

## Reading the diagram

- **Toolbar:** zoom in/out, fit, auto-layout, Save layout, Threats/
  Vulnerabilities overlay toggles, SVG/PNG export, fullscreen.
- Manually arranged node positions are **saved** and preserved across
  reloads and later agent runs — Auto Layout asks for confirmation before
  discarding a manual arrangement.
- Each node shows a **threat count badge**; components with many known
  vulnerabilities show up to five severity pills plus a "+N more" that
  expands the side panel's vulnerability list.
- Trust zones can be resized by dragging a corner (when you have edit
  rights).

## Threat detail side panel

Clicking a component, data flow or trust zone opens a side panel with:

- Metadata for the selected element.
- Threat cards classified by **STRIDE**, **ENISA** category and **CWE**,
  each with a status and a link through to its linked risk.
- Countermeasure rows for that threat (see
  [Mitigations & Status](03-mitigations-status.md)).
- Matching vulnerabilities for that component.

📸 *Screenshot: the DFD viewer with a component selected and the threat side panel open.*

## Related

- [Mitigations & Status](03-mitigations-status.md) — tracking countermeasures
- [Background: Product Security](../../../shared/background/05-product-security.md)
