# VEX in CSAF

VEX (Vulnerability Exploitability eXchange) is a companion to SBOMs that communicates whether known vulnerabilities actually affect a specific product.

## Why VEX matters

- An SBOM tells you *what components* are in your product.
- A vulnerability scan tells you *which CVEs affect those components*.
- VEX tells you *whether those CVEs are actually exploitable* in your specific usage.

## VEX statuses

| Status | Meaning |
|---|---|
| **Not Affected** | The vulnerability does not affect this product. |
| **Affected** | The vulnerability affects this product. |
| **Fixed** | The vulnerability has been fixed. |
| **Under Investigation** | Impact is being assessed. |

## How TrustSource helps

- [CSAF documents](../ce/04-outbound/04-csaf.md) support VEX statements.
- [Post-release monitoring](../ce/03-internal/06-approvals/06-post-release-vulnerabilities.md) tracks VEX-relevant changes.
