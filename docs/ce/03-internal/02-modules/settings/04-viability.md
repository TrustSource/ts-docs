# Viability (Module)

> [!NOTE]
> **Required role:** everyone who can open the module settings reads the tab. Editing and **Import settings from Module** are for developers who are members (or of a module without members) and for managers and compliance managers who are the module's default project manager or default compliance manager (or any of them while none is set). See the [Module Settings Permission Matrix](../../../10-roles-permissions/06a-module-settings-matrix.md).

Viability asks: is a component still alive? ***TrustSource CE*** rates a component by repository activity indicators stored with the component (stars, forks and commits during the last year) and turns the rating into **OK**, **Warning** or **Violation**. On this tab you decide where the lines are drawn for this module.

> [!WARNING]
> TrustSource CE does not collect repository activity itself; it has no crawler and no connection to a component index. For most components no indicators are available, so the status you choose under **Status shown, if minimum confidence level not reached** applies. Set it to `OK` unless you want missing data to be flagged.

## Switch it on

1. Turn on **Enable viability analysis for module**.
2. Confirm *Are you sure you want to update Viability analysis settings?* with **Yes, update settings!** The module is analysed again so that status and statistics follow the new setting.

Turning it off works the same way. The thresholds appear only while the switch is on.

## Thresholds

Under **Viability thresholds**:

| Setting | Scale |
|---|---|
| **Warning threshold** | `no monitoring`, `very low activity`, `low activity`, `normal activity`, `very active` |
| **Violation threshold** | same scale |

The warning threshold must not be lower than the violation threshold, unless it is `no monitoring`; otherwise the form shows *'Warning threshold' must not be lower than 'Violation threshold'*.

## Confidence

Under **Confidence settings**:

- **Minimum confidence level**: `one indicator`, `two indicators` or `three indicators`. A component with fewer indicators is not rated.
- **Status shown, if minimum confidence level not reached**: `OK`, `Warning` or `Violation`.

Click **Update** to save and re-analyse the module. A toast confirms *Viability settings changed!*.

## Import from another module

**Import settings from Module** (upper right, with a search box) copies the viability settings of another module. A toast confirms *Viability settings copied from module: ...*.

> [!TIP]
> The result shows as the Viability badge in the module's List view and in the Viability tab of an [approval](../../06-approvals/02-approval-detail-tabs.md). There is no Viability report page in the app; the REST API offers it under `/api/v2/core/reports/viability`, see [Reports endpoints](../../../09-rest-api/endpoints/reports.md).

📸 *Screenshot: the Viability tab with the enable switch, two sliders and the confidence settings.*
