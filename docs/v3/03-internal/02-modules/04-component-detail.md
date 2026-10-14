# Component Details

> [!NOTE]
> **Required role:** any role with access to the project can read. Acting on a component needs `manager` or `compliance_manager`, as noted per action.

***TrustSource*** shows a component in two places: the **Component Details** side panel inside a module, which describes this component *as it appears in this module*, and a full **Component Details** page, which describes the component itself.

## The side panel

Click a row in the **List** or **Tree** tab of a [module](02-module-detail-tabs.md). The panel opens on the right. A row of icons at its edge jumps to a section; the head shows the component name and its status dot.

| Section | What it tells you |
|---|---|
| **Details** | Key and description. The external-link icon opens the full page. |
| **Set the license** / **License set manually** | Shown when the scan found no usable license. See [Manual license resolution](06-manual-license-resolution.md). |
| **Viability**, **OSSF**, **End-of-life**, **Versioning** | Health of the component: stars, forks, open issues and last update; the OpenSSF Scorecard result; lifecycle and version status. |
| **Crypto algorithms**, **AI / ML models**, **Export control** | Cryptographic algorithms and AI models found in the component (a **B** marks an algorithm denied by company policy), and its export-control status. |
| **Version** | Per version: **Vulnerabilities**, and for each dependency path the licenses with their status, obligations, the **Settings used for this analysis** and the path **Settings**: **Component was not modified** (with **Changes url** and **Modification notice** when unticked), **Loose coupling architecture** and **SOUP description / purpose**. Changing these path settings requires `manager`. |
| **Tasks** | A link to create an issue in Jira, TFS or GitHub when the component has a problem, plus **Copy details**, which copies the problem description to the clipboard. Without a problem it reads *No problems known, component is Ok*. |
| **DeepScans** | Deep scans that include this component. |
| **Comment** and **Comments** | Add a comment, or **Set status** to OK, Warning or Violation with a comment; **Reset component** removes the manual status. |
| **History** | The last 100 entries; **Load 30 days history** shows more. |

📸 *Screenshot: the Component Details side panel with Vulnerabilities and License sections.*

### Actions in the panel

- **Mute a vulnerability**: each CVE has a bell icon. Choose a reason (**False positive, not applicable to us**, **Vulnerable code not in use**, **Risk is tolerable, won't fix**, **Fix is about to be implemented**, **Fix has been provided**, or **Other**). The CVE is then muted for this module; click the crossed-out bell to unmute. Requires `manager`. Muted CVEs are listed under [Allowed vulnerability](settings/15-cve-whitelist.md).
- **Change selected license**: for a component that includes two or more licenses (**Multi - license**), choose exactly one. Run **Analyse** afterwards, because the views show analysis results. Requires `manager` or `compliance_manager`.
- **Accept risk of problem**, **Resolve this obligation** and their reopen buttons: record a justification for a legal rule or obligation. Requires `manager`.
- **Set component to OK** on End-of-life, Versioning and Export control: overrides the automatic status.
- **Commercial settings**: for COTS components.

## The full page

The external-link icon in **Details** opens **Component Details** in a new tab. It shows:

- **Information**: key, purl, private flag, homepage, repository, language, crypto algorithms, AI / ML models, last update, and the OpenSSF **Scorecard** score. Click the score to read how it is calculated; hover it for the individual checks.
- **Comment** and commercial terms, if any.
- **Versions**: filterable list. Each version shows release date, purl, licenses (linked to the license page), checksums, copyright and known vulnerabilities.

The **Edit** button appears for component managers and company component managers and opens the component editor (for an infrastructure component, company component managers see it disabled). See [Component lake](../../05-knowledge/01-component-lake.md) and the [Component manager](../../14-component-manager/index.md).

## Related

- [License details](05-license-detail.md)
- [Manual license resolution](06-manual-license-resolution.md)
- [Allowed vulnerability](settings/15-cve-whitelist.md)
