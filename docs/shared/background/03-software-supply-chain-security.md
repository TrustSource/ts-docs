# Software Supply Chain Security (SSCS)

Software supply chain attacks exploit trust relationships between software producers, distributors and consumers. Recent high-profile incidents (SolarWinds, Log4Shell, xz-utils) have made supply chain security a regulatory priority.

## Defense strategies

- **SBOM** — know your ingredients. An SBOM lists every component in your software.
- **SLSA** (Supply-chain Levels for Software Artifacts) — a framework for build integrity.
- **in-toto** — cryptographic supply chain attestation.
- **Dependency scanning** — continuous monitoring for known vulnerabilities.

## How TrustSource helps

- Automated [scanning](../ce/02-inbound/index.md) of your dependencies.
- [SBOM generation](../ce/04-outbound/01-sbom-files.md) in industry-standard formats.
- Continuous [vulnerability monitoring](../ce/05-knowledge/02-vulnerability-lake.md).
