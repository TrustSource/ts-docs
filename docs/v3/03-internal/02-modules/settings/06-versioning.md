# Versioning (Module)

> [!NOTE]
> **Required role:** everyone who can open the module settings reads the tab. Editing and **Import settings from Module** are for developers and for managers and compliance managers who are the module's default manager (or if none is set). Saving is also checked on the server, which accepts account admins, managers and compliance managers. See the [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md).

Versioning checks how far the component versions in your module lag behind the latest releases. A module that still uses `spring-core 5.2.1` while `6.1.x` is current lags several releases.

## Steps

1. Turn on **Enable versioning analysis for module**.
2. Confirm *Are you sure you want to update Versioning analysis settings?* with **Yes, update settings!** The module is analysed again.
3. Adjust the settings below and click **Update**. A toast confirms *Versioning settings changed!*.

## Fields

| Field | Meaning |
|---|---|
| **Versioning jump detection** | Switch that turns the detection of version jumps on or off. |
| **Warning threshold** | `no monitoring`, `more than 7 behind`, `4-6 behind` or `less than 3 behind`. |
| **Violation threshold** | Same scale. |

The warning threshold must not be lower than the violation threshold, unless it is `no monitoring`. A new module starts with jump detection on, warning `less than 3 behind` and violation `more than 7 behind`.

If you may only read the tab, the same fields appear greyed out.

## Import from another module

**Import settings from Module** copies the versioning settings of another module. A toast confirms *Versioning settings copied from module: …*.

> [!TIP]
> The result is listed in the Versioning report of the project. See [Analysis Reports](../../04b-analysis-reports.md#versioning-report).

📸 *Screenshot: the Versioning tab with jump detection and the two threshold sliders.*
