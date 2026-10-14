# Recipe: Crypto Inventory for Post-Quantum Readiness

Build an inventory of cryptographic algorithms used in your software.

## Steps

1. Set **Crypto** to **Yes** when you start a [repository scan (DeepScan)](../02-inbound/05-repository-scans.md).
2. Review the crypto algorithms found per file in the scan results.
3. Look up each algorithm's **PQC Status** in the [Algorithms catalogue](../05-knowledge/05-algorithms.md).
4. Review the project's inventory on its [Crypto management](../03-internal/01-projects/settings/05-encryption.md) settings tab.
5. Deny algorithms you no longer accept under [Administration → Policies → Crypto algorithms](../06-administration/05-policies.md#crypto-algorithms); denied algorithms are marked with a red **B**.

See [Background: Post-Quantum Security](../../shared/background/07-post-quantum-security.md) for context.
