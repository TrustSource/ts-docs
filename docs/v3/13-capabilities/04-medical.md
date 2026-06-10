# Medical

> [!NOTE]
> **Required license feature:** `medical` (the SOUP-report sub-feature
> additionally requires `soup_report`)

The **Medical** capability extends ***TrustSource*** with workflows
specific to medical-device software, supporting the documentation
obligations of the EU **MDR** (Medical Device Regulation, 2017/745) and
**IVDR** (In-Vitro Diagnostic Regulation, 2017/746).

## What this capability adds

- **MDR / IVDR classification** of modules — risk class (I/IIa/IIb/III
  or IVD A/B/C/D) and intended use captured per module.
- **SOUP reports** — generation of *Software of Unknown Provenance*
  documentation aligned with IEC 62304, listing third-party components,
  versions, license and known anomalies.
- Project-level **module-classification template** wiring so the
  medical view is enforced by default for medical-device projects.

📸 *Screenshot: a module's classification tab showing the MDR risk-class selector and intended-use field.*

📸 *Screenshot: the SOUP report export dialog from the outbound section.*

## Editions

- **SaaS:** available with the `medical` (and optionally `soup_report`)
  feature flag enabled.
- **Community Edition:** the underlying classification fields are
  present but the SOUP generation pipeline is not included.

## Related

- [Outbound → SOUP Files](../04-outbound/02-soup-files.md) — in-app reference for SOUP generation.
- [Internal → Projects → Settings → Module Classification](../03-internal/01-projects/settings/09-module-classification.md) — where the MDR/IVDR template is configured per project.
