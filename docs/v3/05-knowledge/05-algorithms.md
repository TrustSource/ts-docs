# Algorithms

The Algorithms catalogue describes cryptographic algorithms and how well they hold up against quantum computers. ***TrustSource*** uses it to judge the algorithms found in your components. Open it from **Knowledge → Algorithms**.

## Find an algorithm

Filter the list by **name or key**, by **category**, or by **PQC Status**. The trash button resets the filters. The table shows:

| Column | Meaning |
|---|---|
| **PQC** | Post-quantum status, as a coloured label. |
| **Algorithm** | Key and name. A red **B** marks an algorithm your company has denied. |
| **Strength** | Strength of the algorithm. |
| **Invented** | Year of invention. |
| **Category** | Type of algorithm. |
| **Substitutes**, **References** | Counts of recommended replacements and sources. |

Select a row to open the algorithm.

### PQC status

The status is shown as a coloured label, ordered here from best to worst: **Quantum-Safe**, **Resistant**, **Not applicable**, **n.f.**, **Limited**, **Vulnerable**, **Broken**. For a broken algorithm the year is added in brackets.

## Algorithm details

The page shows **Information** (key, name, strength, category, year invented, authors, and whether and when it was broken), the **PQC Status** with score and notes, and, where available, tables of **Substitutes** (with their PQC status), **References** and **Standards**. A red **Denied in Company** label appears when your company has denied the algorithm in its [policies](../06-administration/05-policies.md).

📸 *Screenshot: the algorithm list filtered by PQC status.*

## Related

- [Background: Crypto Agility](../../shared/background/06-crypto-agility.md)
- [Background: Post-Quantum Security](../../shared/background/07-post-quantum-security.md)
