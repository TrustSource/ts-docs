# Legal (Module)

> [!NOTE]
> **Required role:** varies by field — see [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md)

The module Legal tab captures the **module-level** answers of the
Legal Questionnaire (Part 2) — mostly distribution-shape questions
that can differ from module to module even within the same project.
The project-level framing (commercial aspects, IP protection) is set
on the [project's Legal tab](../../01-projects/settings/02-legal.md).

By default a module inherits everything from the project defaults.
Override on this tab only when the module's distribution genuinely
differs — a small internal library that never leaves the company, a
side tool distributed as a plugin, an external SDK shipped to
customers, and so on.

## Fields

Module-level answers refine the project defaults for **how this
specific module is shipped**:

- **Operating Model** — how components in this module are integrated
  (standalone, linked, embedded). Overrides the project default when
  set explicitly here.
- **Modification** — whether components in this module have been
  modified by your team.
- **Distribution form** — source, binary, mixed. Some obligations
  attach only in one form.
- **Coupling** — whether third-party components are tightly coupled
  (in-process) or loosely coupled (separate process, network call);
  copyleft implications differ.

Additional module-level items on this tab: **legal templates** to
apply, **whitelist / blacklist** overrides for licences, and any
module-specific obligation notes.

## Actions

- **Wizard mode** — the same guided flow as on the project tab, but
  scoped to the module-level questions. See the
  [Fill in the Legal Questionnaire](../../../recipes/12-legal-questionnaire.md)
  recipe (Part 2).
- **Import from template** — apply a legal template curated by your
  Legal Manager.
- **Reset to project defaults** — clear the module-level overrides
  and inherit from the project again.
- **View history** — audit trail of who changed what and when.

📸 *Screenshot: the module Legal tab with distribution-form selector and template import action.*

## How the answers feed the engine

Whatever you set here is passed — together with the project-level
answers and the module's component licences — to
[**ts-legalcheck**](https://github.com/trustsource/ts-legalcheck),
which deterministically computes the module's obligation set. The
result surfaces on the
[Obligations tab](03-obligations.md) of the module and rolls up into
the [project obligations view](../../01-projects/settings/08-obligations.md).

## Related

- [Legal (Project)](../../01-projects/settings/02-legal.md) — Part 1 of the Questionnaire
- [Fill in the Legal Questionnaire](../../../recipes/12-legal-questionnaire.md) — recipe covering both parts
- [Obligations (Module)](03-obligations.md) — the resolved obligations for this module
