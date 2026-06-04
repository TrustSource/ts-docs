# CIA (Project)

> [!NOTE]
> **Required role:** users with `project.cia.settings` write permission

The CIA tab sets minimum Confidentiality, Integrity and Availability requirements at the project level. Modules inherit these values but can set **higher** requirements.

## Fields

| Field | Description |
|---|---|
| **CR (Confidentiality Requirement)** | Minimum confidentiality level for this project. |
| **IR (Integrity Requirement)** | Minimum integrity level. |
| **AR (Availability Requirement)** | Minimum availability level. |

## Actions

- **Import from other project** — copy CIA requirements from another project.

> [!NOTE]
> CIA values affect how CVSS vulnerability scores are adjusted for this project. Higher requirements increase the effective severity of vulnerabilities that impact the corresponding dimension.

📸 *Screenshot: the CIA tab with three dropdown fields for CR, IR and AR.*
