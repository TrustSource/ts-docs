# End-of-life (Project)

> [!NOTE]
> **Required role:** everyone who can open the project settings reads the tab. Managers who are the project's default project manager or default compliance manager (or any manager while none is set) can change it. See the [Settings Permission Matrix](../../../10-roles-permissions/06-settings-permission-matrix.md).

The End-of-life tab (heading **Component end-of-life**) controls when ***TrustSource CE*** flags components of this project that are close to or past their end of life, for example a `debian:11` base image or a Node.js 16 runtime.

## Steps

1. Turn on **Enable end-of-life analysis for all modules**.
2. Confirm *Are you sure you want to update end-of-life policy?* with **Yes, update settings!**
3. Under **End-of-life thresholds**, set the **Warning threshold** and the **Violation threshold**. Both are sliders from `no monitoring` to `24m` (months before the end-of-life date).
4. Click **Update**. A toast confirms *Project end-of-life policy successfully changed*.

The warning threshold must not be lower than the violation threshold, unless it is `no monitoring`; otherwise the form shows *'Warning threshold' must not be lower than 'Violation threshold'*. The thresholds appear only while the switch is on.

> [!NOTE]
> End-of-life dates come from the component data stored in the installation; a component without end-of-life data is reported as OK. TrustSource CE has no external source of end-of-life data, so this check mostly reports OK. See [End-of-life (Module)](../../02-modules/settings/11-end-of-life.md).
>
> A typical configuration is a warning at 6 months and a violation at 1 month. This gives your team half a year to plan a migration away from the component.

📸 *Screenshot: the End-of-life tab with the enable switch and the two month sliders.*

## Related

- [End-of-life (Module)](../../02-modules/settings/11-end-of-life.md)
- [Policies](../../../06-administration/05-policies.md): the company end-of-life policy
