# Resolved obligations (Project)

> [!NOTE]
> **Required role:** users with `project.obligationConfig` read permission to open the page; `project.obligationConfig.list` write permission to change it

The **Resolved obligations** page tracks which license obligations have been resolved at the project level. It is not a settings tab: open it from the **Reports** dropdown in the project page header.

## What it does

When your project uses open-source components, those components come with license obligations — attribution, source disclosure, copyleft compliance, etc. This page lets you record which obligations you have already fulfilled so that they show as resolved in compliance reports.

The list itself is not authored here — it is the deterministic output of
[**ts-legalcheck**](https://github.com/trustsource/ts-legalcheck) given
the project's [Legal](02-legal.md) settings, each module's
[Legal](../../02-modules/settings/02-legal.md) settings and the
component licences. If a new obligation appears without you doing
anything, the input picture changed — new module, new component, an
edit to the Legal Questionnaire answers, or a rule-set bump.

## Actions

The page header offers two actions (shown when you have the rights to use them):

- **Import settings from project...** — copy the resolved-obligation settings from another project.
- **Propagate settings to...** — push your settings to one project, to all your projects or to all projects.

Ticking and unticking an obligation saves immediately.

📸 *Screenshot: the Resolved obligations page with a list of resolved obligations.*

## Related

- [Obligations (Module)](../../02-modules/settings/03-obligations.md) — module-level obligation tracking
- [Legal (Project)](02-legal.md) — the legal framework that determines which obligations apply
- [Fill in the Legal Questionnaire](../../../recipes/12-legal-questionnaire.md) — end-to-end recipe covering both parts
