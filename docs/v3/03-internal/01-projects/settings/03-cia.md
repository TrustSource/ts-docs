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

## Impact class proposals for risks

The CIA requirements of a module and its project (the stricter value counts) also weigh the impact class that ***TrustSource*** proposes for automatically created risks. A high requirement raises the proposal, a low one lowers it. See [Risks List](../../05-risks/02-risks-list.md#proposed-impact-class).

## Risk assessment scheme

Below the requirements, the panel **Risk assessment scheme** lets you override the company's [risk assessment scheme](../../05-risks/07-risk-assessment-scheme.md) for this project: impact classes, value scale, ARO scale and decision thresholds. It needs the `risks` feature and the role `account_admin`, `manager` or `compliance_manager`. Modules of the project inherit the override.
