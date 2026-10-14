# Manage Legal

> [!NOTE]
> **Required role:** `legal_manager` (an [internal role](../10-roles-permissions/02-internal-roles.md))

**Manage Legal** is where license definitions are maintained. ***TrustSource*** evaluates the licenses of your components against the legal constraints stored here. Open **Legal mngr. → Manage Legal**; the page is titled **Licenses**. Everyone else reads the licenses, without these controls, under [Knowledge → Licenses](../05-knowledge/06-licenses.md).

## The license list

The table shows **Created**, **Key**, **Name**, **Url** (as a link) and **Status**. The status is *Analysed* when the legal constraints of the license have been assessed, and *Not analysed* otherwise. Filter and page through the list; select **Edit** on a row to open the license.

Two buttons sit in the header:

- **Add license**: opens a dialog with the **License key** and the **License text**; press **Add license** to save. Use it for a license that is missing from the catalogue.
- **TrustSource-Check reload**: reloads the service behind [Check](../02-inbound/01-check.md) after you changed license data, so that checks use the new values. It asks for confirmation.

📸 *Screenshot: the Licenses list with the Add license and TrustSource-Check reload buttons.*

## Edit a license

The edit page shows the license name and key and its *Analysed* status. **Back to List** returns to the table. You can change:

| Field | Meaning |
|---|---|
| **Analysed** | Marks the license as analysed. |
| **Url** | Link to the official text. |
| **Copyright remark**, **Disclaimer**, **Editorial remarks** | Free-text remarks. |
| **Aliases** | Other names under which the license appears in scans. |
| **text** | The license text. |
| **Constraints settings** | The legal assessment, below. |

### Constraints

Constraints are grouped in rights and obligations, for example *Right to use*, *Right to distribute*, *Retain copyright notice*, *Provide copy of license text*, *Provide source code (Object-form)*, *Copyleft effect*, *Specific SaaS trigger*, *Limited liability* and *Effect of license violation*. Each constraint takes:

- **Result**: *Yes* or *No*;
- **Confidence in result (high, medium, low)**: *High*, *Medium* or *Low*;
- **Notes / Assessment**, **Extract from license text** and **Reference (Section in license text)**.

**Import constraints from License** copies the constraints of another license as a starting point. Press **Update** to save.

> [!WARNING]
> Changes take effect for all later checks and analyses. Record your reasoning in the notes, so reviewers can follow the assessment.

## Related

- [Legal Templates](02-legal-templates.md)
- [Check](../02-inbound/01-check.md)
