# Recipe: Crypto Inventory for Post-Quantum Readiness

Build an inventory of cryptographic algorithms used in your software.

## Steps

1. Enable **Crypto analysis** when scheduling a [deep scan](../02-inbound/05-repositories-deep-scan.md).
2. Review the crypto findings in the scan results.
3. Cross-reference with the [Algorithms database](../05-knowledge/06-algorithms.md) for FIPS status.
4. Configure [Encryption settings](../03-internal/01-projects/settings/05-encryption.md) at the project level.
5. Track PQC migration status over time.

See [Background: Post-Quantum Security](../../shared/background/07-post-quantum-security.md) for context.
