# Fill in the Legal Questionnaire

**Time:** ~15 minutes for Part 1; a few minutes per module for Part 2.
**Roles:** Project Manager or Compliance Manager (Part 1); the same
role or a Developer familiar with the module's distribution (Part 2).

The **Legal Questionnaire** is the guided way to fill the settings
that drive ***TrustSource***'s obligation engine. When you complete it,
the engine knows enough about your project's commercial framing and
each module's distribution to decide which licence obligations apply —
attribution, source disclosure, copyleft, and the rest.

The Questionnaire has **two parts**:

- **Part 1 — Project level.** Mostly commercial questions
  (distribution model, IP protection intent). The answers apply
  to every module in the project by default, so you only fill this
  part once per project.
- **Part 2 — Module level.** Distribution-specific questions per
  module (how it is integrated, whether it is modified, whether
  it is shipped standalone or embedded). You fill this per module,
  though most modules of a well-scoped project share the same
  answers and can inherit from a template.

You reach both parts through the same **Wizard** button on the Legal
tab of the respective settings screen.

## Part 1 — the project-level questions

1. Open the project.
2. Go to **Settings → [Legal](../03-internal/01-projects/settings/02-legal.md)**.
3. Click **Wizard**. The Wizard walks you through the same fields you
   would otherwise fill directly on the tab:
   - **Commercial Aspects (CA)** — how the software is distributed
     (usage fee, deployment fee, per-copy fee, or none of these).
   - **Operating Model (OM)** — the default integration mode for
     modules that don't override it.
   - **IP Protection** — whether licences without an explicit
     contributor grant should be flagged.
   - **IP Enforcement** — whether licences that terminate on legal
     defence should be flagged.
4. Click **Save**. Obligations are recomputed for every module that
   inherits from the project defaults.
5. Optional but recommended: click **Propagate** to push the new
   settings to modules that had older values.

## Part 2 — the module-level questions

For each module whose distribution differs from the project default
(e.g. a small internal library that is *not* shipped to customers,
inside a project whose default is "shipped"):

1. Open the module.
2. Go to **Settings → [Legal](../03-internal/02-modules/settings/02-legal.md)**.
3. Click **Wizard**. The module Wizard focuses on distribution-shape
   questions — is the module linked or embedded, modified, delivered
   as source or binary, and so on.
4. Click **Save**. Obligations for this module are recomputed against
   the module's own answers rather than the project default.

If in doubt, do not override — the project default is usually right
for the majority of modules.

## What happens under the hood

The Wizard's answers are stored on the Legal tab as structured
settings. When you save, ***TrustSource*** hands those settings, plus
the licences of the module's components, to
[**ts-legalcheck**](https://github.com/trustsource/ts-legalcheck)
— an SMT-solver-backed obligation engine that deterministically
computes which obligations apply. The result surfaces in the
[Obligations tab](../03-internal/01-projects/settings/08-obligations.md).

The engine is deterministic: given the same inputs it always returns
the same obligation set. Two projects with identical Legal answers
and identical component licences will yield identical obligations.

## Background reading

An **EACG Academy course** on the Legal Questionnaire is planned;
this recipe will link to it as soon as the course is live. Until
then, the printed **CGM Legal Questionnaire** guide (PDF) and the
three-part video walkthrough that were used to develop the course
are available on request from support.

## Related

- [Legal (Project)](../03-internal/01-projects/settings/02-legal.md) — Part 1 reference
- [Legal (Module)](../03-internal/02-modules/settings/02-legal.md) — Part 2 reference
- [Obligations (Project)](../03-internal/01-projects/settings/08-obligations.md) — the output
- [Onboard a Team Member](09-onboard-team-member.md) — you may want to walk a new PM through this recipe as part of onboarding
