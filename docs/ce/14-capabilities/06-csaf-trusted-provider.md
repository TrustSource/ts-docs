# CSAF Trusted Provider

> [!NOTE]
> **Required license feature:** `csaf`

The **CSAF Trusted Provider** capability lets your organisation publish
Common Security Advisory Framework (CSAF) advisories from
***TrustSource*** in a way that meets the requirements of the
[OASIS CSAF Trusted Provider](https://oasis-open.github.io/csaf-documentation/)
program — making your advisories machine-readable, discoverable through
the trusted-provider directory, and consumable by downstream automated
tooling.

## What this capability adds

- **CSAF document editor** with structured tabs for metadata, affected
  products, remediation steps and revision history.
- **Bulk advisory generation** from a module's SBOM, producing one CSAF
  document per known vulnerability in a single action.
- **Trusted-Provider publication pipeline** — signed JSON output,
  provider-metadata file, ROLIE feed, and TLP-aware distribution
  channels configurable per advisory.
- Integration with the [CVD capability](05-cvd.md) so external
  vulnerability reports can flow directly into a CSAF advisory.

📸 *Screenshot: the CSAF document editor with the Metadata tab active and an advisory under preparation.*

📸 *Screenshot: the provider-metadata / publication-channel configuration screen.*

## Editions

- **SaaS:** available with the `csaf` feature flag enabled.
- **Community Edition:** the CSAF document editor is included; the
  Trusted-Provider publication pipeline is **not** included in the
  initial release.

## Related

- [Outbound → CSAF Documents](../04-outbound/04-csaf.md) — full in-app reference for advisory authoring.
- [Background: VEX in CSAF](../../shared/background/11-vex-csaf-vex.md) — VEX use cases inside CSAF advisories.
- [CVD](05-cvd.md) — intake of vulnerability reports that may end up as CSAF advisories.
