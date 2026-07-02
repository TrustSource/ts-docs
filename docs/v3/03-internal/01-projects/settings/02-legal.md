# Legal (Project)

> [!NOTE]
> **Required role:** users with `project.legal.settings` write permission

The Legal tab captures the **project-level** answers of the Legal
Questionnaire (Part 1) — the commercial and IP-protection framing that
applies to the whole project. Most modules inherit these answers;
module-specific distribution details are captured on the module's own
[Legal tab](../../02-modules/settings/02-legal.md) (Part 2).

## Fields

| Field | Description |
|---|---|
| **Commercial Aspects (CA)** | How the software is distributed — usage fee, deployment fee, per-copy fee, etc. |
| **Operating Model (OM)** | Default integration mode for modules that don't override it — standalone, linked, or embedded. |
| **IP Protection** | When enabled, licences without explicit contributor grants are flagged as violations. |
| **IP Enforcement** | When enabled, licences that terminate on legal defence are flagged. |

## Actions

- **Wizard mode** — the guided way to fill the fields above. Walks
  you through the same questions the Legal Questionnaire covers, with
  contextual explanations. See the
  [Fill in the Legal Questionnaire](../../../../recipes/12-legal-questionnaire.md)
  recipe for the full flow across both parts.
- **View all requirements** — see the full obligation matrix for the
  current settings.
- **Import from template** — apply a pre-defined legal template.
- **Import from other project** — copy legal settings from another
  project.
- **Propagate** — push these settings to all modules in the project
  (useful after changing the project-level answers).
- **View history** — see when and by whom settings were changed.

📸 *Screenshot: the Legal tab with commercial aspects dropdown and IP protection toggle.*

## How this drives obligations

The answers on this tab, together with each module's Part 2 answers
and the licences of the module's components, are handed to
[**ts-legalcheck**](https://github.com/trustsource/ts-legalcheck) —
an SMT-solver-backed engine with a curated rule-set. The engine
deterministically computes which licence obligations apply and
surfaces them on the [Obligations tab](08-obligations.md). Same
inputs → same obligation set, every time.

## Related

- [Fill in the Legal Questionnaire](../../../../recipes/12-legal-questionnaire.md) — recipe covering both project and module parts
- [Legal (Module)](../../02-modules/settings/02-legal.md) — Part 2 of the Questionnaire
- [Obligations (Project)](08-obligations.md) — the resolved obligations that follow from these settings
