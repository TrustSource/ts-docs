# Approval Detail Tabs

Each approval has an **Overview** tab plus eight review tabs. The compliance manager evaluates them before making a decision. All tabs show the frozen data of the analyses selected in the [wizard](01-request-approval.md), not the current state of the modules.

## Header

The header shows the approval name, its **Packageurl** and description, if set. Buttons:

- **Manage binary links**: see [Binary Linking](04-binary-linking.md).
- For a Compliance manager: **Approve** and **Reject** on an open request, **Create approval request** and **Remove DRAFT** on a dry run. See [Approve / Reject](03-approve-reject-workflow.md).
- Once decided: the **Approved** or **Rejected** badge; open it to see who decided when, and the reason of a rejection.

## Overview

When the reports are ready, the tab shows key figures: **Modules**, **Component status changes**, **SW-Tests passed**, **Vulnerabilities resolved**, **Legal actions taken**, **Components outdated**, **Notice file completed** (opens the notice file) and **Capabilities**. Below them, the **Modules** table lists the modules of the approval with the analysis that was selected.

📸 *Screenshot: the Overview tab of an approval.*

## Tabs

| Tab | What it shows |
|---|---|
| **Vulnerabilities** | Unique vulnerabilities, resolved vulnerabilities and vulnerable components, with the vulnerability list of the selected analyses. |
| **Licenses** | License distribution across components, unique obligations, and the licenses grouped into *Causing violations*, *Causing obligations* and *No further obligations*, each with the modules and components that use them. |
| **Versioning** | Components, modules and affected components that are not on a current version. |
| **Viability** | Components, modules and components without information, with the commit activity of the last year. |
| **Status changes** | Modified components: different components, modules, modified appearances and undocumented changes, with the modification notice or the link to the list of changes, if documented. |
| **Export control** | The *List of Algorithms as detected* in the components, with denied algorithms marked; or the note that no crypto algorithms were identified. |
| **Capabilities** | The capabilities of the modules (**Name**, **Description**, **Introduced at version**). See [Module settings: Capabilities](../02-modules/settings/09-capabilities.md). |
| **SW-Quality** | The SARIF test runs of the modules with status, tool and findings. See [SW Quality Scans](../../02-inbound/04-sw-quality-scans.md). |

📸 *Screenshot: the approval detail page with the Licenses tab active.*

> [!TIP]
> The **Status changes** tab lists components that were modified. Undocumented changes are the ones to clarify before you approve, because a modification can change the obligations of a license.

## Related

- [Approve / Reject](03-approve-reject-workflow.md): making the decision
- [Requesting an Approval](01-request-approval.md): how the approval was created
- [Releases](../07-releases.md): the tabs of an approved release
