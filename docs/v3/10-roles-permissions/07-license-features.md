# License Features

> [!NOTE]
> **Set by:** your ***TrustSource*** contact. License flags are provisioned for the company and cannot be changed in the app.

A **license feature** is a flag in your company's `allowedLicenses`. Without the flag, the related menu entry is hidden and the server refuses the matching calls.

## License flags

| Flag | What it unlocks | Notes |
|---|---|---|
| `sarif` | SW Quality Scans (SARIF upload and results), SW Quality tab in approvals | REST: `403` without the flag. |
| `products` | Products (CRA classification, contacts, documents) | |
| `risks` | Risks, risk tasks, portfolio views, risk assessment scheme | |
| `threat` | Threat Models (BETA) | |
| `csaf` | CSAF advisories and feed keys | REST: `403` without the flag. |
| `psirt` | CVD cases (BETA) | |
| `chat` | AI chat assistant | |
| `obom` | OBOM upload, Deployments tile and OBOM tab | REST: `403` without the flag. Importing OBOM findings as risks also needs `risks`. |
| `cvdself` | Makes the role `cvd_coordinator` assignable | The role carries no permissions in the app; see [Licence-bound role](01-roles-overview.md#licence-bound-role). |
| `medical` | **SOUP Lists** in the Outbound menu and the SOUP and COTS reports | The plan feature `soup_report` has the same effect. The MDR/IVDR tabs depend on the account type, not on this flag. |

Creating risks from SARIF findings needs both `sarif` and `risks`.

## Where a flag takes effect

- **Menu:** entries for unlicensed features are not shown.
- **App:** server methods answer `403` ("This feature is not enabled for your company").
- **REST API:** the `sarif`, `obom` and `csaf` endpoints answer `403`.

## Account type / plan features

These are not license flags. They depend on the company's account type or plan.

| Feature | Depends on | Notes |
|---|---|---|
| MDR/IVDR classification tabs | Account type `medical` | Project and module settings. |
| SOUP lists | License flag `medical` or plan feature `soup_report` | Either one is enough. |
| SPDX export, Jira/LeanIX and other integration limits | Plan | See [Account Types](08-account-types.md). |
