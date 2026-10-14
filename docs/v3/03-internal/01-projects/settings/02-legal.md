# Legal (Project)

> [!NOTE]
> **Required role:** the form, the wizard, import and propagate are for `manager` and `compliance_manager` users who are the project's default project manager or default compliance manager (or any of them while none is set). Other roles see the tab without the form.

The Legal tab captures the **project-level** answers of the Legal
Questionnaire (Part 1): the commercial and IP-protection framing that
applies to the whole project. Module-specific details are captured on
the module's own [Legal tab](../../02-modules/settings/02-legal.md) (Part 2).

## Fields

| Section | What you choose |
|---|---|
| **Commercial Aspects** | The intended commercial use: a usage fee, a license fee, only a support fee, another type of commercialisation (for example maintenance or warranty), or *No, the product is not commercial*. |
| **Operating Model** | The operational model: Software as a Service, a managed service at the customer's location, a traditional software distribution, or part of an appliance or device. |
| **Intellectual Property Aspects** | Two switches. **Inbound IP Protection** on flags licenses that come without explicit grants from all contributors as violations. **Outbound IP Protection** on flags licenses that terminate their grants when you defend your own patent claims. |

The tab gives a hint for the first two: if unsure, choose the **usage fee** and the **embedded model** (appliance or device), the most restrictive options. Click **Update** to save.

## Actions

The buttons in the upper right:

- **View history** / **Close history**: see earlier versions of the settings with author and date.
- **Start wizard** / **View all**: switch between a step-by-step wizard (three questions; **Next**, **Back**, **Finish**) and the full form. See the
  [Fill in the Legal Questionnaire](../../../recipes/12-legal-questionnaire.md)
  recipe for the full flow across both parts.
- **Import settings from Template**: apply a company legal template (shown when templates exist).
- **Import settings from Project**: copy the legal settings of another project (with a name search).
- **Propagate settings to...**: push these settings to one other project or to **All my n projects**. Portfolio managers also see **All n projects**.

📸 *Screenshot: the Legal tab with the Commercial Aspects and Operating Model options, the Inbound and Outbound IP Protection switches and the buttons View history, Start wizard, Import settings from Project and Propagate settings to.*

## How this drives obligations

The answers on this tab, together with each module's Part 2 answers
and the licences of the module's components, are handed to
[**ts-legalcheck**](https://github.com/trustsource/ts-legalcheck),
an SMT-solver-backed engine with a curated rule-set. The engine
deterministically computes which licence obligations apply and
surfaces them on the [Resolved obligations](08-obligations.md) page. Same
inputs, same obligation set, every time.

## Related

- [Fill in the Legal Questionnaire](../../../recipes/12-legal-questionnaire.md): recipe covering both project and module parts
- [Legal (Module)](../../02-modules/settings/02-legal.md): Part 2 of the Questionnaire
- [Resolved obligations (Project)](08-obligations.md): the obligations you have recorded as fulfilled
