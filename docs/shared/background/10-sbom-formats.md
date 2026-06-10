# SBOM Formats (SPDX, CycloneDX)

Two major SBOM formats dominate the industry. Both are supported by ***TrustSource***.

## SPDX

- Maintained by the Linux Foundation.
- ISO/IEC 5962:2021 standard.
- Serializations: JSON, tag-value, RDF/XML.
- Strength: license and legal metadata.

## CycloneDX

- Maintained by OWASP.
- ECMA-424 standard.
- Serializations: JSON, XML.
- Strength: vulnerability and security metadata.

## When to use which

| Use case | Recommended format |
|---|---|
| License compliance | SPDX |
| Vulnerability tracking | CycloneDX |
| Regulatory (CRA, NIS2) | Both accepted |
| Customer exchange | Ask your customer |

## How TrustSource helps

- [SBOM Files](../../ce/04-outbound/01-sbom-files.md) — generate in both formats.
- [Verification](../../ce/04-outbound/05-verification.md) — validate incoming SBOMs.
