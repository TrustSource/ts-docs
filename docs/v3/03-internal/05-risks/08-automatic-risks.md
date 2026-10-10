# Automatic Risks

> [!NOTE]
> **Required role:** `compliance_manager`, `manager` or `account_admin` to switch it on
> **Required license feature:** `risks`, plus `sarif` for SARIF weaknesses and `obom` for OBOM findings

***TrustSource*** can keep the risk register in step with your findings so nobody has to copy them over. Each source has a switch per project, off by default, and creates **one risk per finding group** instead of one per occurrence.

## The switches

Open the project settings, tab **Quality**, panel **Risk register**:

| Switch | Source | One risk per |
|---|---|---|
| **Enable risk creation from SARIF weaknesses (CWE)** | SARIF test imports | module, tool and weakness (CWE) |
| **Create risks from vulnerabilities (CVE)** | The regular vulnerability check | module and vulnerability |
| **Create risks from OBOM findings** | OBOM uploads | project deployment and check |

Switching a source on or off is written to [Company Logs](../../06-administration/07-audit-logs.md) with the old and new value. Switching off stops new risks; risks already created stay in the register. If your plan no longer covers the `risks` feature, the panel still shows a note naming the sources that are stored as on, so you can see them.

## SARIF weaknesses (CWE)

Each SARIF document imported for a module creates or updates one risk per tool and CWE, with the origin **CWE** and a name such as *[CWE-89] Weakness reported by semgrep*.

- Only future imports are processed. To see risks appear for an existing test, import it again on the module's **Quality** tab.
- Importing the same file again changes nothing.
- The **Occurrences** tab lists the rules, files and severity levels behind the risk, with the number of distinct files.
- When a later import no longer reports the weakness, the risk stays open. It shows *ready to close?* and **Review state**; nothing is changed for you. Set the state to `closed` if you agree.
- A hand-created risk is never adopted.
- If one import holds more weaknesses than the register accepts, the surplus is not tracked and is reported. Limits: 200 risks per tool, 8 tools, 400 risks per import. Company Logs, the upload dialog, the Tests list and the test page say how many were not tracked and which.

The impact class is proposed from the worst result level (error, warning, note) and the module's CIA requirements; see [Risks List](02-risks-list.md#proposed-impact-class).

## Vulnerabilities (CVE)

When on, ***TrustSource*** checks the project's modules regularly (by default hourly, in turn with other projects) and keeps one risk per vulnerability and module, with the origin **CVE**. The first check starts right after you switch it on.

- Only findings at or above the **confidence level** count: the module's, else the project's, else the company default, else Medium and above. Admins set the company default in the company settings. Muted findings are included.
- The **Affected components** tab lists components and versions. When no component reports the vulnerability any more, the risk shows *ready to close?*.
- **Analyzed by**: publishing a [VEX advisory](../../04-outbound/04-csaf.md) that analyzes the vulnerability for the module moves the risk to `assessed` and shows the advisory, version, status, justification and remediation. A later version that puts the module under investigation re-opens it.
- Removing a CSAF draft with the option **re-open risks from vulnerability assignment** reuses the existing risk per CVE and module.

## OBOM findings

When on, every finding in the project's OBOMs becomes a risk per deployment, with the origin **OBOM**, and new uploads keep it up to date. You can also click **Create risk** on a single finding in the OBOM view.

The **Affected resources** tab lists resource, type and identity, with **Open deployments**. If a finding disappears from the newest OBOM of its deployment, the risk stays open with *0 still present - ready to close?*.

## Unmatched licenses

Setting a component's license by hand files a risk with the origin **Unmatched License (LIC)**. A company without the `risks` feature keeps the license setting and gets no risk.

## Create a risk from a single SARIF finding

On a test page, **Create risk** next to a rule creates a risk with the rule's description. It needs the `compliance_manager` or `manager` role.

## What you can edit

Your changes to name, origin, state, impact class, strategy and every other field are kept on later updates. Imports refresh only the evidence (occurrences, components, resources) and the proposed impact class. While a risk's treatment is **Done**, even that pauses; see [Treatment and State](05-treatment-and-state.md#done-risks-and-automatic-updates).

## Related

- [SW Quality Scans](../../02-inbound/04-sw-quality-scans.md) — importing SARIF
- [Project Quality settings](../01-projects/settings/04-quality.md) — tools and test settings
- [Risk History](09-risk-history.md) — automatic changes are marked as automation
