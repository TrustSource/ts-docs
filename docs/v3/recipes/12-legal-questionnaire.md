# Fill in the Legal Questionnaire

**Time:** a few minutes per project, and a few minutes per module whose distribution differs.
**Roles:** `manager` or `compliance_manager`, as default project manager or default compliance manager of the project or module, or on a project or module without such an owner.

The **Legal Questionnaire** is the guided way to fill the settings
that drive ***TrustSource***'s obligation engine. When you complete it,
the engine knows enough about your project's commercial framing and
each module's distribution to decide which license obligations apply
and which licenses count as violations.

The Questionnaire has **two parts**:

- **Part 1 - Project level.** Commercial use, operating model and IP
  protection. Fill it once per project.
- **Part 2 - Module level.** Trade secrets, sub-licensing and
  distribution. Fill it per module.

You reach both parts through the same **Start wizard** button on the
Legal tab of the respective settings screen. The **Legal settings
wizard** asks one question at a time; move with **Next** and **Back**.

## Part 1 - the project-level questions

1. Open the project.
2. Go to **Settings → [Legal](../03-internal/01-projects/settings/02-legal.md)**.
3. Click **Start wizard** and answer:

   | Setting | Answers |
   |---|---|
   | **Commercial Aspects** | A usage fee, a license fee, only a support fee, another type of commercialisation, or not commercial. |
   | **Operating Model** | Software as a Service, a managed service at the customer's location, traditional software distribution, or part of an appliance or device. |
   | **Inbound IP Protection** and **Outbound IP Protection** | Whether to flag licenses without explicit contributor patent grants, and licenses that end when you enforce your own patents. |

4. Click **Finish**. The app confirms "Legal settings changed!".

If you are unsure, the form recommends the most restrictive answers:
**usage fee** for the commercial aspects and the **embedded model** for
the operating model.

**View all** shows the same settings as one form; **View history** lists
earlier values. **Propagate settings to...** copies the settings to other
projects, and **Import settings from Project** or **Import settings from
Template** takes them from another project or from a legal template.

## Part 2 - the module-level questions

For each module, and especially for a module whose distribution differs
from the rest of the project (for example a small internal library that
is *not* shipped to customers):

1. Open the module.
2. Go to **Settings → [Legal](../03-internal/02-modules/settings/02-legal.md)**.
3. Click **Start wizard** and answer:

   | Setting | Answers |
   |---|---|
   | **Trade Secret Protection** | Trade secrets need to be protected, or may be released. |
   | **Sub-licensing alert** | The module is licensed under a proprietary license, or released as open source. |
   | **Distribution** | How the module reaches its users, for example as an on-premise installer, as part of a shipped appliance, as a client-side library in a web solution, as a server-side library that is not distributed, or not at all. |

4. Click **Finish**.

**Propagate settings to...** copies the module's answers to other
modules of the project. **Import settings from Module** and **Import
settings from Template** work as on the project.

## What happens under the hood

The Wizard's answers are stored on the Legal tabs as structured
settings. On the next analysis, ***TrustSource*** hands those settings,
plus the licenses of the module's components, to
[**ts-legalcheck**](https://github.com/trustsource/ts-legalcheck),
an SMT-solver-backed obligation engine that deterministically computes
which obligations apply. The results appear on the module's **Legal**
tab as obligations and violations. Record how you meet obligations on the
[Resolved obligations](../03-internal/01-projects/settings/08-obligations.md)
settings tab.

The engine is deterministic: given the same inputs it always returns
the same obligation set. Two projects with identical Legal answers
and identical component licenses yield identical obligations.

> [!TIP]
> If many projects share the same answers, create a legal template once under **Administration → Settings → Legal templates** and import it into each project. See [Legal templates](../06-administration/02-settings.md#legal-templates).

## Background reading

An **EACG Academy course** on the Legal Questionnaire is planned;
this recipe will link to it as soon as the course is live. Until
then, the printed **CGM Legal Questionnaire** guide (PDF) and the
three-part video walkthrough that were used to develop the course
are available on request from support.

## Related

- [Legal (Project)](../03-internal/01-projects/settings/02-legal.md): Part 1 reference
- [Legal (Module)](../03-internal/02-modules/settings/02-legal.md): Part 2 reference
- [Resolved obligations (Project)](../03-internal/01-projects/settings/08-obligations.md)
- [Onboard a Team Member](09-onboard-team-member.md): you may want to walk a new manager through this recipe as part of onboarding
