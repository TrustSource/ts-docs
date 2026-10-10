# Crypto management (Project)

> [!NOTE]
> **Required role:** users with write permission on project encryption settings

The Encryption tab manages cryptographic algorithm requirements and export control settings at the project level.

## What it does

The tab has two lists:

- **List of Algorithms as managed**: the cryptographic algorithms you allow or deny for this project. Algorithms found in the project's modules are offered for selection.
- **Export controls management**: export-control settings per algorithm, used when components with crypto capabilities are evaluated.

Violations of these lists appear in the Algorithm report and the module's crypto status.

📸 *Screenshot: the Encryption tab with algorithm settings list.*

## Related

- [Encryption (Module)](../../02-modules/settings/10-encryption.md) — module-level encryption settings
- [Algorithms](../../../05-knowledge/05-algorithms.md) — the global algorithm database
- [Background: Crypto Agility](../../../../shared/background/06-crypto-agility.md)
