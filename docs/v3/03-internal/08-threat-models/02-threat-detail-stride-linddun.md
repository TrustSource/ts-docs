# Data Flow Diagram & Threat Detail

> [!NOTE]
> **Required license feature:** `threat`

A threat model's detail page renders it as an interactive **Data Flow
Diagram (DFD)**: components, trust zones and data flows, with a Graph / Raw
toggle to see the underlying document. This is the human review surface on
top of the [Threat Modeling Agent's](../../13-capabilities/07-threat-model-agent.md)
**Generate risks** stage: the threats it elicited are what you review and
act on here.

## Reading the diagram

- **Toolbar:** zoom in/out, fit, auto-layout, Save layout, **Labels**,
  Threats and Vulnerabilities overlay toggles, SVG/PNG export, fullscreen.
  Exports match what is on screen, including hidden labels.
- **Labels** shows the name of what each data flow carries. On a busy
  diagram the labels start hidden so they do not cover components; press
  **Labels** to show them all. A flow carrying several things names the main
  one and counts the rest.
- **Click a component to isolate it.** The rest fades back; the component,
  everything it exchanges data with and the flows between them stay lit and
  are labelled. Hovering previews the same. Press `Escape`, click the
  background or click **Clear focus** to return to the full diagram. The bar above the diagram names
  what is in focus and counts the components, data flows and trust zones.
- Each trust zone has a title bar with its trust rating. The legend explains
  the shapes (service / process, data store, external entity), the trust
  scale (0 untrusted to 100 trusted) and the threat colours; the threat
  colours are left out for a model without threats.
- Manually arranged node positions are **saved** and preserved across
  reloads and later agent runs; Auto Layout asks for confirmation before
  discarding a manual arrangement.
- Each node shows a **threat count badge**. Components with known
  vulnerabilities show one pill per vulnerability with its ID and
  severity, at most five; further ones are counted in a "+N more" pill
  that opens the side panel's vulnerability list.
- Trust zones can be resized by dragging a corner (when you have edit
  rights).
- **Datastores of self-hosted databases** are drawn behind their server:
  the application's flow ends at the database server component, which
  in turn writes to the datastore in the same trust zone. Managed
  services such as S3 are connected directly.
- Elements with open review items carry an amber **? N** badge (toggle
  **Review** in the Overlays toolbar); clicking it opens the
  [Model review](#model-review) panel at that item.

## Review status

Each model has a status, set from the **Status** menu in the header: *Draft*, *Reviewed* or *Approved*. The status is shown in the Threat Models list.

## Threat detail side panel

Clicking a component, data flow or trust zone opens a side panel with:

- Metadata for the selected element; for a component, the data flows it is
  connected to, the component at the other end and what travels over each.
- Threat cards classified by **STRIDE**, **ENISA** category and **CWE**,
  each coloured by the threat's state as stored in the model (open, in
  progress, resolved, accepted or deferred; see the legend).
- Countermeasure rows for that threat, with an icon for their status (see
  [Mitigations & Status](03-mitigations-status.md)).
- Matching vulnerabilities for that component.

The **Generate risks** stage files each threat as a risk in the project's
[risk register](../05-risks/index.md) with the origin *TMA Assessment*. Open
these risks in the [Risks list](../05-risks/02-risks-list.md); their **Threat model** tab holds
the threat-model context. Once you set a state on such a risk, that is a
**human decision the agent will not overwrite** on later runs.
See [Run Modes](04-run-modes.md#what-the-agent-will-not-touch).

![The Data Flow Diagram of a boostME threat model with the component auth-service selected: the rest of the diagram is faded, the two connected flows are labelled, and the side panel shows its type, trust zone, connections and the first of its 30 threats.](../../../assets/images/v3/03-internal/08-threat-models/02-threat-detail-stride-linddun-1.webp)

## Model review

Next to the diagram, the **Model review** panel lists what the
[Threat Modeling Agent](../../13-capabilities/07-threat-model-agent.md#model-review)
could not decide or would like to know, so you can correct the model
without editing the diagram. Toggle it with **Review (N)** in the
Diagram heading; N counts the unanswered questions, assumptions and
inferred datastores. The panel opens on its own when a model has review
items.

| Section | What you can do |
|---|---|
| **Open questions** | Answer each in a short text box. |
| **Assumptions** | **Confirm**, or **Correct** with a short text. |
| **Improvement hints** | Read-only, grouped by target (the project or a module). Module hints link to the element in the diagram and to the module's settings; architecture hints link to the project settings. |
| **Inferred datastores** | Datastores the agent added without dependency, server or document evidence. **Confirm**, **Remove** (with an optional reason) or **Correct**. |
| **Evidence sources** | What the model was built from; collapsed, read-only. |

**Answers go into the project's Application goals.** Each answer or
confirmation becomes one line in a section *Clarifications for the
threat model* at the end of the project's
[Application goals](../01-projects/settings/01-general.md); answering
the same item again replaces its line, and the rest of the text stays
unchanged. The text is checked like an `architecture.md` upload
(size limit, screening for prompt-injection content); a rejected
answer is shown in the panel and nothing is saved.

Answered items show "Answered - applied on the next run": the agent
reads the Application goals on its next run and rebuilds the model with
your answers. **Run model step now** rebuilds only the model, without
regenerating risks or countermeasures; it is disabled while a run is in
progress.

Only `manager` and `compliance_manager` can answer; everyone else sees
the panel read-only. A model without review items shows "The agent has
no open questions for this model." Review information is kept when a
model is exported to or imported from OTM or TM-BOM.

## Related

- [Mitigations & Status](03-mitigations-status.md) - tracking countermeasures
- [Run Modes](04-run-modes.md) - re-eliciting threats via Generate risks
- [Application goals](../01-projects/settings/01-general.md) - where your review answers are stored
- [Background: Product Security](../../../shared/background/05-product-security.md)
