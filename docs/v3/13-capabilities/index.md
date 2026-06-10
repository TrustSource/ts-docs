# Capabilities

Beyond the platform **core** (projects, modules, scans, components,
SBOM/notice generation, basic reporting), ***TrustSource*** offers a
number of optional **capabilities** that target specific compliance
domains or workflows. Each capability is licensed independently and may
or may not be present in a given account.

> [!NOTE]
> **"Capability" vs. "Module".** In this help portal, a *capability* is
> an optional functional bundle of the platform — a license-gated
> feature area. Inside the application itself, the word *module* refers
> to a deployment artefact of a software product. The two concepts are
> unrelated despite the similar surface vocabulary.

## In this section

| Capability | What it adds | Required feature flag |
|---|---|---|
| [OSCAR Chat](01-oscar-chat.md) | AI assistant for compliance questions and platform usage | `chat` |
| [Risk](02-risk.md) | Risk register, portfolio views and risk-task management | `risks` |
| [Product](03-product.md) | Product-level classification incl. CRA scope, contacts, support data | `products` |
| [Medical](04-medical.md) | SOUP reports and MDR/IVDR module classification | `medical` |
| [CVD](05-cvd.md) | Coordinated Vulnerability Disclosure intake and triage | `cvd` |
| [CSAF Trusted Provider](06-csaf-trusted-provider.md) | Publish CSAF advisories as a registered trusted provider | `csaf` |

The exact set of capabilities available on your account depends on
which subscription you hold. Pages in this help portal that depend on a
capability say so at the top.

> [!TIP]
> All capabilities listed above are available in the SaaS edition. The
> [Community Edition](../../ce/index.md) includes a subset — each
> capability page states its CE availability.

## Training subscriptions

Independent of the functional capabilities above, accounts can subscribe
to a **training package** that bundles e-learning content for using
TrustSource. Three tiers are available:

- **All trainings included** — the full training catalogue is reachable
  from inside the app.
- **Specific trainings** — only the trainings matching the account's
  licensed capabilities are reachable.
- **No trainings** — the trainings area is hidden; learning happens
  through this help portal and direct support.

See the [Trainings page](../05-knowledge/11-trainings.md) for how the
training area looks in the app.

📸 *Screenshot: the capabilities / license-features panel in account settings, with a sample subscription's feature flags visible.*
