# Post-Quantum Security (PQC)

Post-quantum cryptography prepares for the day when quantum computers can break current public-key algorithms.

## NIST PQC Standards

- **ML-KEM** (Kyber) — key encapsulation mechanism.
- **ML-DSA** (Dilithium) — digital signature algorithm.
- **SLH-DSA** (SPHINCS+) — stateless hash-based signatures.

## Migration path

1. **Inventory** — know which algorithms you use (***TrustSource*** [Algorithm database](../../ce/05-knowledge/06-algorithms.md)).
2. **Assess** — identify where PQC migration is needed.
3. **Migrate** — replace vulnerable algorithms with PQC-safe alternatives.
4. **Monitor** — track algorithm deprecation status continuously.
