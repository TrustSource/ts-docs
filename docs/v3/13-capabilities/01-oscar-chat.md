# OSCAR Chat

> [!NOTE]
> **Required license feature:** `chat`
> **Status:** Beta

***OSCAR*** is the conversational assistant inside ***TrustSource***. In the app it appears as the **AI Assistant**: the chat icon in the right bar opens it. It
answers questions about your projects, modules, components and license
findings in natural language, and helps users find their way around the
platform without having to know the underlying click-paths.

## What this capability adds

- A **chat panel** docked on the right side of any page, resizable
  between a slim companion and a wide reading column.
- A **full-page chat** mode at `/chat` for longer conversations (**Open full page** in the panel).
- **Session history**, message rating (**Like** / **Dislike**), **Copy**, **Reset session**, **Clear history** and **Leave a feedback**.
- **Context-aware answers** that pull from your account's projects and
  components, not from a generic knowledge base.

Before your first question, the assistant shows the **Chat usage policy**:
tick its three statements and select **Confirm**. In the full-page chat,
**View policy** shows the policy again.

![The mAIfit project page with its module list and the AI Assistant panel docked on the right, showing the question Which formats can I export it in? and the start of the answer, with the message box and Send button below.](../../assets/images/v3/13-capabilities/01-oscar-chat-1.webp)

![The full-page chat at /chat with the View policy, Leave a feedback, Clear history and Reset session buttons, the end of the answer to the first question and the follow-up question Which formats can I export it in? with its answer.](../../assets/images/v3/13-capabilities/01-oscar-chat-2.webp)

## Editions

- **SaaS:** available with the `chat` feature flag enabled.
- **Community Edition:** **not included**. OSCAR relies on hosted
  inference infrastructure that is not part of the CE deployment.

## Related

- [Capabilities](index.md): overview of all optional capabilities.
