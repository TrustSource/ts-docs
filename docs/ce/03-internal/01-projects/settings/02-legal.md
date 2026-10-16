# Legal (Project)

> [!NOTE]
> **Required role:** everyone who can open the project settings reads the tab. Editing, the wizard, import and propagate are for managers and compliance managers who are the project's default project manager or default compliance manager (or any of them while none is set). See the [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md).

The Legal tab captures how the software of this project is commercialised and operated. These answers, together with the module's own [Legal](../../02-modules/settings/02-legal.md) answers and the licenses of its components, decide which license obligations and violations ***TrustSource CE*** reports.

## Fields

| Section | What you choose |
|---|---|
| **Commercial Aspects** | The intended commercial use: a usage fee, a license fee, only a support fee, another type of commercialisation (for example maintenance or warranty), or *No, the product is not commercial*. |
| **Operating Model** | The operational model: Software as a Service, a managed service at the customer's location, a traditional software distribution, or part of an appliance or device. |
| **Intellectual Property Aspects** | Two switches. **Inbound IP Protection** on flags licenses that come without explicit grants from all contributors as violations. **Outbound IP Protection** on flags licenses that terminate their grants when you defend your own rights in court. |

The tab gives a hint for the first two: if unsure, choose the **usage fee** and the **embedded model** (appliance or device), the most restrictive options. Click **Update** to save.

## Actions

The buttons in the upper right:

- **View history** / **Close history**: show earlier versions of the settings with author and date.
- **Start wizard** / **View all**: switch between a step-by-step wizard (Commercial Aspects, Operating Model, IP Aspects; **Next**, **Back**, **Finish**) and the full form.
- **Import settings from Template**: apply a company legal template. See [Legal Templates](../../../06-administration/02-settings.md#legal-templates).
- **Import settings from Project**: copy the legal settings of another project (with a name search).
- **Propagate settings to...**: push the settings to one other project or to **All my n projects**. Portfolio managers also see **All n projects**.

![The Legal tab of Webshop with Commercial Aspects set to license fee, Operating Model set to traditional software distribution, Inbound IP Protection on and Outbound IP Protection off, and the View history, Start wizard, Import settings from Project and Propagate settings to buttons.](../../../../assets/images/ce/03-internal/01-projects/settings/02-legal-1.webp)

## How this drives obligations

The legal evaluation runs in the bundled legalcheck service. It combines the project answers, the module answers and the licenses of the components and returns the obligations and violations shown in the module views and in the [Resolved obligations](08-obligations.md) tab. If the legalcheck service is not reachable, licenses stay unevaluated and show as warnings; see [External Services](../../../01-installation-setup/04-external-services.md).

## Related

- [Legal (Module)](../../02-modules/settings/02-legal.md)
- [Resolved obligations (Project)](08-obligations.md)
