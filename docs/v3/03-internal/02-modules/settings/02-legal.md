# Legal (Module)

> [!NOTE]
> **Required role:** developers, compliance managers, portfolio managers and managers see the tab. Editing, **View history**, the wizard, import and propagate are for managers and compliance managers who are the module's default project manager or default compliance manager (or if none is set); everyone else sees the fields greyed out. See the [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md).

The module Legal tab captures the **module-level** answers of the Legal Questionnaire (Part 2): how this module is protected, licensed and distributed. These answers can differ from module to module within the same project. The commercial and IP framing of the whole project is set on the [project's Legal tab](../../01-projects/settings/02-legal.md); both together decide which obligations and violations ***TrustSource*** reports for the module's components.

## Project legal requirements

If the module belongs to a project, the panel **Legal requirements** at the top summarises the project's legal settings, with a cogs icon that opens them. If the project's legal settings are still empty, a red note says that they need completion to allow a complete analysis, even if the module settings are complete.

## Fields

| Section | Field | Options |
|---|---|---|
| **Trade Secret Aspects** | **Trade Secret Protection** | *Yes, trade secrets need to be protected* or *No, trade secrets may be released*. When protection is on, licenses that require you to release or publish your work are flagged as violations; when off, their obligations show as warnings until satisfied. |
| **Licensing Strategy** | **Sub-licensing alert** | *This module shall be licensed under a proprietary license* or *It is planned to release the module as open source software*. Some licenses do not allow sublicensing; if you release the module as open source or operate it as part of a service that is not licensed at all, you may skip these warnings. |
| **Distribution of the module** | Intended purpose or application of the module | On premise (separate installer, physical media or download); integral part of a shipped appliance, device or software; exchangeable add-on to such a product; client-side library in a web solution, provided by a web server; server-side library in a web solution (not distributed); or applied only locally, for example a private tool (not distributed at all). |

Click **Update** to save. A toast confirms *Legal settings changed!*.

## Actions

The buttons in the upper right:

- **View history** / **Close history**: show earlier versions of the settings with author and date.
- **Start wizard** / **View all**: switch between the **Legal settings wizard** (steps **Question 1** to **Question 3**: Trade Secret Protection, Sub-licensing alert, Distribution; **Next**, **Back**, **Finish**) and the full form. While the module's legal settings are incomplete, the tab opens in the wizard. See the [Fill in the Legal Questionnaire](../../../recipes/12-legal-questionnaire.md) recipe (Part 2).
- **Import settings from Template**: apply a company legal template. The button appears only if templates exist.
- **Import settings from Module**: copy the legal settings of another module (with a name search).
- **Propagate settings to...**: push the settings to one other module, **All my n modules** or **All my n project modules**. Portfolio managers also see **All n modules** and **All n project modules**. Not shown while the wizard is open.

![The Legal tab in the View all mode: the Legal requirements panel with the note that the project legal settings still need completion, the sections Trade Secret Aspects, Licensing Strategy and Distribution of the module, and the buttons View history, Start wizard, Import settings from Template, Import settings from Module and Propagate settings to in the upper right.](../../../../assets/images/v3/03-internal/02-modules/settings/02-legal-1.webp)

## How the answers feed the engine

Whatever you set here is passed, together with the project-level answers and the module's component licenses, to [**ts-legalcheck**](https://github.com/trustsource/ts-legalcheck), which deterministically computes the module's obligations and violations at the next analysis. The result shows per component in the [component details](../04-component-detail.md) and in the module's **Obligations** report (**Reports** menu of the module). Obligations you have already fulfilled are recorded on the [Resolved obligations](03-obligations.md) tab.

## Related

- [Legal (Project)](../../01-projects/settings/02-legal.md): Part 1 of the Questionnaire
- [Fill in the Legal Questionnaire](../../../recipes/12-legal-questionnaire.md): recipe covering both parts
- [Resolved obligations (Module)](03-obligations.md): the obligations already fulfilled in this module
