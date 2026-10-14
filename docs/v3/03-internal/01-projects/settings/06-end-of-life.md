# End-of-life (Project)

> [!NOTE]
> **Required role:** everyone who can open the project settings reads the tab. Managers who are the project's default project manager or default compliance manager (or any manager while none is set) can change it.

The End-of-life tab (heading **Component end-of-life**) controls how ***TrustSource*** handles components approaching or past their end-of-life date.

## Steps

1. Turn on **Enable end-of-life analysis for all modules**.
2. Confirm *Are you sure you want to update end-of-life policy?* with **Yes, update settings!**
3. Under **End-of-life thresholds**, set the **Warning threshold** and the **Violation threshold**. Both are sliders from `no monitoring` to `24m` (months before the end-of-life date).
4. Click **Update**. A toast confirms *Project end-of-life policy successfully changed*.

The warning threshold must not be lower than the violation threshold, unless it is `no monitoring`; otherwise the form shows *'Warning threshold' must not be lower than 'Violation threshold'*. The thresholds appear only while the switch is on.

> [!TIP]
> A typical configuration is a warning at 6 months and a violation at 1 month. This gives your team half a year to plan a migration away from the end-of-life component.

📸 *Screenshot: the End-of-life tab with Enable end-of-life analysis for all modules switched on and the Warning threshold and Violation threshold sliders.*

## Related

- [End of Life (Module)](../../02-modules/settings/11-end-of-life.md): module-level EOL overrides
