# OSCAR Chat

> [!NOTE]
> **Required license feature:** `chat`
> **Status:** Beta

***OSCAR*** is the conversational assistant inside ***TrustSource***. It
answers questions about your projects, modules, components and license
findings in natural language, and helps users find their way around the
platform without having to know the underlying click-paths.

## What this capability adds

- A **chat panel** docked on the right side of any page, resizable
  between a slim companion and a wide reading column.
- A **full-page chat** mode at `/chat` for longer conversations.
- **Session history**, message rating (thumbs up / down) and copy.
- **Context-aware answers** that pull from your account's projects and
  components, not from a generic knowledge base.

📸 *Screenshot: the OSCAR chat panel open alongside a project module list, with a question and answer visible.*

📸 *Screenshot: the full-page chat view at /chat with a multi-turn conversation.*

## Editions

- **SaaS:** available with the `chat` feature flag enabled.
- **Community Edition:** **not included** — OSCAR relies on hosted
  inference infrastructure that is not part of the CE deployment.

## Related

- [Knowledge → AI Chat Assistant](../05-knowledge/10-chat.md) — the
  in-app reference for the chat panel.
