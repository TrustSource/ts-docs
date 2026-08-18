# Obligations (Project)

> [!NOTE]
> **Required role:** users with `project.obligationConfig.list` write permission

The Obligations tab tracks which license obligations have been resolved at the project level.

## What it does

When your project uses open-source components, those components come with license obligations — attribution, source disclosure, copyleft compliance, etc. This tab lets you record which obligations you have already fulfilled so that they show as resolved in compliance reports.

The list itself is not authored here — it is the deterministic output of
[**ts-legalcheck**](https://github.com/trustsource/ts-legalcheck) given
the project's [Legal](02-legal.md) settings, each module's
[Legal](../../02-modules/settings/02-legal.md) settings and the
component licences. If a new obligation appears without you doing
anything, the input picture changed — new module, new component, an
edit to the Legal Questionnaire answers, or a rule-set bump.

## Actions

- **Import from other project** — copy obligation configurations from another project.
- **Propagate to other projects** — push your obligation settings to other projects.

📸 *Screenshot: the Obligations tab with a list of resolved obligations.*

## Related

- [Obligations (Module)](../../02-modules/settings/03-obligations.md) — module-level obligation tracking
- [Legal (Project)](02-legal.md) — the legal framework that determines which obligations apply
- [Fill in the Legal Questionnaire](../../../recipes/12-legal-questionnaire.md) — end-to-end recipe covering both parts
