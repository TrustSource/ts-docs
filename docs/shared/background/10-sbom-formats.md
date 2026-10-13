# SBOM Formats (SPDX, CycloneDX)

Two major SBOM formats dominate the industry. Both are supported by ***TrustSource***.

## SPDX

- Maintained by the Linux Foundation.
- ISO/IEC 5962:2021 standard.
- Serialisations: JSON, tag-value, RDF/XML.
- Strength: license and legal metadata.

## CycloneDX

- Maintained by OWASP.
- ECMA-424 standard.
- Serialisations: JSON, XML.
- Strength: vulnerability and security metadata.

## When to use which

| Use case | Recommended format |
|---|---|
| License compliance | SPDX |
| Vulnerability tracking | CycloneDX |
| Regulatory (CRA, NIS2) | Both accepted |
| Customer exchange | Ask your customer |

## How TrustSource helps

- [SBOM + CBOM](../../ce/04-outbound/01-sbom-cbom.md) - generate in both formats.
- [Verify](../../ce/04-outbound/05-verify.md) - check that a signed SBOM issued by your installation is unchanged.
