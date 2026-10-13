# Risks List

> [!NOTE]
> **Menu:** **Internal → Risks** is shown to Developer, Compliance manager and Manager. **Add risk** and the **In progress** / **Resolved** filter buttons are shown to Compliance manager and Manager. Every user who can open the list can open, edit and remove risks.

The **Risks** tab (*Risk management*, "List of all risks by project or module") is the register of ***TrustSource CE***: one row per risk, for the project or module you choose. Click a row to open the risk in the editor.

## Choose what the list shows

Use the selector at the upper right (**Select report target**):

- **All module of** *project* lists the risks recorded on the project itself and the risks of all its modules. Module risks show an **in Module** label instead of a delete button; click it to open the module's own list. Edit and remove them there.
- A single module lists only that module's risks.

Until you select a target, the page reads *Please select the project to run a report on the upper right*.

📸 *Screenshot: the Risks list with the target selector and the tiles above the table.*

## Tiles and filters

The tiles count the risks in scope: **total**, **added last 7 days**, **in progress** and **resolved**. See [Treatment and State](05-treatment-and-state.md#resolved-and-in-progress) for which states count as resolved.

- Switch the **In progress** and **Resolved** buttons off to hide that group.
- Use the search box above the table to filter by any text.

## Columns

*Added*, *Name*, *Origin*, *Impact class*, *C*, *I* and *A* (the confidentiality, integrity and availability boxes), *Impact description*, *Value* (the annual loss expectancy), *General approach* (the mitigation strategy), *Countermeasures* (their number) and *State*. The trash button at the end of a row removes the risk at once.

## Add a risk

1. Select a project or a module. A risk added while a project is selected belongs to the project; one added while a module is selected belongs to the module.
2. Click **Add risk**. The **Risk capture** form opens.
3. Enter a **Name** (3 to 200 characters), choose one or more **Origin** values and add a **Description** of the impact.
4. Tick the affected **Confidentiality**, **Integrity**, **Availability** boxes, pick an **Impact class** and a **State**.
5. Fill in the impact figures (see below) and, if you like, the **Threat model context**.
6. Click **Save**, or **Save and Create new one** to add the next risk.

The mitigation strategy is set later, in the editor.

### Origins

| Origin | Meaning |
|---|---|
| **Software Development Lifecycle (SDLC)** | Process risks in development. |
| **Software/Code Quality (SQ)** | Code quality findings. |
| **Software Supply Chain (SSC)** | Risks from third-party components and suppliers. |
| **Vulnerability (CVE)** | A known vulnerability. |
| **Malware (YARA)** | Malware findings. |
| **Assessment (CWE), weaknesses from risk or sec assessments** | Weaknesses; also the origin of [automatic SARIF risks](08-automatic-risks.md). |
| **Technical Debt (TD) , e.g. old versions** | Outdated or unmaintained parts. |
| **Threat Model Assessment (TMA)** | Results of a threat-model assessment. |
| **Unmatched License (LIC)** | A license set by hand for a component the scan could not match. |
| **Threat Model (legacy)** | Kept for older records. |

A risk can also start from a finding: **Create risk** on a SARIF finding, **Add risks** in the [Vulnerability report](../04a-vulnerability-report.md), or by setting a license by hand. See [Automatic Risks](08-automatic-risks.md).

## The risk editor

Click a row to open a risk. The header keeps **Save**, the previous/next arrows and **Back to list**. Links from other pages (for example the Overview lists) open a risk directly with `riskId` in the address.

The top row holds **Name**, **Origin**, **Impact class**, **Mitigation strategy** and **State**. The tabs below are:

| Tab | What it holds |
|---|---|
| **Impact** | The C/I/A boxes, the **Description of impact** and the financial figures. |
| **Countermeasures** | What you do about the risk. See [Risk Tasks](03-risks-tasks.md). |
| **Tasks** | Follow-up tasks per countermeasure. |
| **Threat model** | STRIDE categories, CWEs, ENISA category and threat, affected element type, TM method, trust boundary crossing, TM run ID and OTM threat ID. See [Threat Model Fields](10-threat-model-fields.md). |
| **Occurrences (n)** | Only on risks created from SARIF imports: the rules, files and levels behind the risk. See [Automatic Risks](08-automatic-risks.md). |

Click **Save** to store changes on the top row and on the Impact and Threat model tabs. Countermeasures and tasks are saved in their own dialogs.

### Impact figures

Switch between **Simple impact view** and **Detailed impact view**.

- **Simple**: choose **Business value (BV)**, **Exposure factor (EF)** (low, moderate, high) and **Annual rate of occurrence (ARO)** (likely, unlikely, rare).
- **Detailed**: enter BV in your company currency, EF in percent and ARO per year. TrustSource CE calculates **Single loss expectancy (SLE = EF * BV)** and **Annual loss expectancy (ALE = SLE * ARO)**. The ALE is shown as *Value* in the list.

The currency comes from the company settings (EUR if none is set). See [Risk Assessment Scheme](07-risk-assessment-scheme.md).

> [!NOTE]
> A module's risk opened from the project list is read-only and shows **This risk is managed in module level**. Open it from the module to edit it.

## Related

- [Treatment and State](05-treatment-and-state.md) - strategy, state and resolved
- [Risk Tasks](03-risks-tasks.md) - countermeasures and tasks
- [Threat Model Fields](10-threat-model-fields.md) - the Threat model tab
